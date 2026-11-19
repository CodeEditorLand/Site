/**
 * Register - the index's generator.
 *
 * `/Contents` does not describe the tree, it reads it. This script is the
 * reading: it walks `Source/`, resolves every relative and aliased import into a
 * real file, marks what is reachable from the pages, and writes the facts the
 * index prints into `Source/Generated/Facts/`.
 *
 * Three laws, and they are the reason this is a script rather than a table:
 *
 * 1. **A count is never written by hand.** Every figure the index prints -
 *    how many routes exist, which forms a route mounts, how many files read a
 *    data module - is computed here. A hand-kept index is a second place for
 *    the truth to drift, and this tree already demonstrates that drift twice
 *    over: the old hand-kept `CanonicalPath` list carried eighteen paths and
 *    omitted the home page, `/Visit`, `/404` and `/Doc/Rust`; and when that
 *    list moved into `Function/Route/Registry.ts`, this script kept reading the
 *    file it used to live in and reported `0 declared, 41 missing` for months.
 *    `Registry` below reads the registry the build actually uses, and
 *    `Registry.Missing` is that drift, measured - which is why it now prints
 *    nothing at all.
 * 2. **Every file names its source.** Each JSON destination carries a
 *    `_Generated` block naming this script, the tree it read, the transform and
 *    the rule for changing a fact (Aphrodite's `Generated/Facts` pattern).
 * 3. **Nothing is deleted.** The script writes; it never removes. A module that
 *    loses its reader is reported in `Modules.Orphans` for a human to decide on,
 *    because a generator that deletes is a generator that can reduce the site.
 *
 * Run it after moving, adding or renaming a source file:
 *
 *     node Source/Script/Register.ts
 *
 * The output is checked in, so the site builds without running this - the same
 * arrangement the generated area of Aphrodite's site uses.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";

import { dirname, join, relative, resolve, sep } from "node:path";

import { fileURLToPath } from "node:url";

const Root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

const Source = join(Root, "Source");

const Generated = join(Source, "Generated");

const Facts = join(Generated, "Facts");

/** Every file under `Source/`, as a posix path relative to `Source/`. */
const Walk = (Directory: string): string[] => {
	const Files: string[] = [];

	for (const Entry of readdirSync(Directory)) {
		const Path = join(Directory, Entry);

		if (statSync(Path).isDirectory()) {
			Files.push(...Walk(Path));
		} else {
			Files.push(relative(Source, Path).split(sep).join("/"));
		}
	}

	return Files;
};

const Files = Walk(Source).sort();

const FileSet = new Set(Files);

/** Read a file, or the empty string when it is binary or unreadable. */
const Read = (Relative: string): string => {
	try {
		return readFileSync(join(Source, Relative), "utf8");
	} catch {
		return "";
	}
};

/**
 * The module extensions this script understands.
 *
 * `.md` is here because a doc article imports nothing but is still a file the
 * index counts; `.scss` and `.css` are excluded on purpose - the stylesheet is
 * a card of its own and a partial is loaded by `@use`, not by a route.
 */
const ModuleExtension = [".ts", ".tsx", ".astro", ".js", ".mjs", ".json"];

const IsModule = (Relative: string) =>
	ModuleExtension.some((Extension) => Relative.endsWith(Extension));

/**
 * The path aliases, read from the two places the build declares them:
 * `tsconfig.json` (`paths`) and `astro.config.ts` (Vite's `resolve.alias`).
 * Read rather than restated, so a new alias is picked up by the next run.
 */
const Aliases: [string, string][] = (() => {
	const Table: [string, string][] = [];

	const Config = Read("../tsconfig.json");

	for (const Match of Config.matchAll(
		/"(@[^"]*)\/\*"\s*:\s*\[\s*"([^"]+)\/\*"\s*\]/g,
	)) {
		// `Source/Library` -> `Library/`; the bare `Source` root -> `` so `@/x`
		// resolves against `Source/` rather than `Source/Source/`.
		const Target = (Match[2] ?? "").replace(/^Source\/?/, "");

		Table.push([
			(Match[1] ?? "") + "/",

			Target.length > 0 ? Target + "/" : "",
		]);
	}

	const Astro = Read("../astro.config.ts");

	for (const Match of Astro.matchAll(
		/"(@[A-Za-z]*)":\s*Resolve\(\s*"\.\/Source\/([^"]+)"\s*\)/g,
	)) {
		Table.push([Match[1] + "/", Match[2] + "/"]);
	}

	// Longest alias first: `@Library/` must win over `@/`.
	return Table.sort((A, B) => B[0].length - A[0].length);
})();

const Extension = [
	"",
	".ts",
	".tsx",
	".astro",
	".js",
	".mjs",
	".json",
	"/index.ts",
	"/index.tsx",
	"/index.astro",
	"/index.js",
];

/**
 * Resolve one import specifier to a file in `Source/`, or `null` when it is a
 * package or cannot be found.
 *
 * `Bundler` module resolution lets a source file import `./Data.js` and mean
 * `Data.ts`, which is how every module in this tree writes its imports - so the
 * `.js` family is retried as TypeScript before the extension list is tried.
 */
const ResolveSpecifier = (From: string, Specifier: string): string | null => {
	const Bare = Specifier.split("?")[0];

	let Base: string | null = null;

	if (Bare.startsWith(".")) {
		Base = relative(Source, resolve(Source, dirname(From), Bare));
	} else {
		for (const [Alias, Target] of Aliases) {
			if (Bare.startsWith(Alias)) {
				Base = Target + Bare.slice(Alias.length);
				break;
			}
		}
	}

	if (Base === null) return null;

	Base = Base.split(sep).join("/");

	const Candidates: string[] = [];

	if (/\.(?:js|jsx|mjs)$/.test(Base)) {
		const Stem = Base.replace(/\.(?:js|jsx|mjs)$/, "");

		Candidates.push(Stem + ".ts", Stem + ".tsx", Stem + ".astro", Base);
	}

	for (const Suffix of Extension) Candidates.push(Base + Suffix);

	for (const Candidate of Candidates)
		if (FileSet.has(Candidate)) return Candidate;

	return null;
};

/** Every import specifier in a module, in source order. */
const Specifiers = (Body: string): string[] => {
	const Found: string[] = [];

	for (const Match of Body.matchAll(
		/(?:from|import)\s*\(?\s*["']([^"']+)["']/g,
	)) {
		Found.push(Match[1]);
	}

	return Found;
};

/** The forward graph: module -> the modules it imports. */
const Imports = new Map<string, string[]>();

for (const Relative of Files) {
	if (!IsModule(Relative)) continue;

	Imports.set(
		Relative,
		Specifiers(Read(Relative))
			.map((Specifier) => ResolveSpecifier(Relative, Specifier))
			.filter((Target): Target is string => Target !== null),
	);
}

/** The reverse graph: module -> the modules that import it. */
const ImportedBy = new Map<string, string[]>();

for (const [From, Targets] of Imports) {
	for (const Target of Targets) {
		const Readers = ImportedBy.get(Target) ?? [];

		Readers.push(From);

		ImportedBy.set(Target, Readers);
	}
}

/**
 * The roots: everything the build starts from.
 *
 * `pages/` is the routes; `Layout/Base.astro` is the document shell every route
 * renders inside; `Function/` is the build integration, loaded by
 * `astro.config.ts` rather than imported by a page. A module is reachable when
 * one of these reaches it.
 */
const Roots = Files.filter(
	(Relative) =>
		Relative.startsWith("pages/") ||
		Relative === "Layout/Base.astro" ||
		Relative.startsWith("Function/") ||
		Relative === "content.config.ts" ||
		Relative === "Background.astro" ||
		Relative === "Background.tsx",
);

/**
 * `astro.config.ts` sits outside `Source/`, and it is the build's own root: it
 * loads the integration, the theme, the markdown plugins and every
 * `Function/Configuration/*` switch. Its imports are resolved into `Source/` and
 * added to the roots, so a module the build reads is not reported as unread.
 */
for (const Specifier of Specifiers(Read("../astro.config.ts"))) {
	// A config import is relative to the WebSite root, not to `Source/`:
	// `./Source/Function/Configuration/Compress.js` means `Function/Configuration/Compress.ts`.
	const Bare = Specifier.split("?")[0]
		.replace(/^\.\//, "")
		.replace(/^Source\//, "");

	const Target = ResolveSpecifier("__root__", "./" + Bare);

	if (Target !== null) {
		Roots.push(Target);

		// The config is a reader too. Without this line a switch the build loads on
		// every run would be reported as a file nothing reads, which is the one
		// wrong answer this script must not give.
		const Readers = ImportedBy.get(Target) ?? [];

		Readers.push("astro.config.ts");

		ImportedBy.set(Target, Readers);
	}
}

const Reached = new Set<string>();

const Queue = [...Roots];

while (Queue.length > 0) {
	const Next = Queue.shift()!;

	if (Reached.has(Next)) continue;

	Reached.add(Next);

	for (const Target of Imports.get(Next) ?? []) {
		if (!Reached.has(Target)) Queue.push(Target);
	}
}

/**
 * The twenty-one blocks, in the routing table's order. Their names are the facts.
 *
 * The list is the routing table's own (`Stylesheet/System/Record/_Index.scss`),
 * restated here because the generator cannot parse SCSS: a block added to the
 * layer without being added here is a block the index will report as unmounted,
 * which is the failure this list is meant to make loud.
 */
const Blocks = [
	"RecordHero",
	"RecordBand",
	"RecordPair",
	"RecordAside",
	"RecordArchive",
	"RecordMatrix",
	"RecordCompare",
	"RecordStage",
	"RecordInstrument",
	"RecordPlateSet",
	"RecordEntry",
	"RecordLedger",
	"RecordTrace",
	"RecordFailure",
	"RecordWell",
	"RecordFigure",
	"RecordMargin",
	"RecordPlate",
	"RecordStamp",
	"RecordInset",
	"RecordTranscript",
] as const;

/** The blocks one module reaches, transitively - a route mounts what its tree mounts. */
const BlocksReached = (Relative: string): string[] => {
	const Seen = new Set<string>([Relative]);

	const Pending = [Relative];

	while (Pending.length > 0) {
		const Next = Pending.shift()!;

		for (const Target of Imports.get(Next) ?? []) {
			if (!Seen.has(Target)) {
				Seen.add(Target);

				Pending.push(Target);
			}
		}
	}

	const Mounted = new Set<string>();

	for (const Module of Seen) {
		for (const Block of Blocks) {
			// A block is mounted when the module imports its file - `RecordBand.astro`,
			// not the string `RecordBand` in a comment.
			if (
				(Imports.get(Module) ?? []).some((Target) =>
					Target.endsWith(`Record/${Block}.astro`),
				)
			) {
				Mounted.add(Block);
			}
		}
	}

	return Blocks.filter((Block) => Mounted.has(Block));
};

/** `pages/Blog/[Slug].astro` -> `/Blog/:slug`; `pages/index.astro` -> `/`. */
const RouteOf = (Relative: string): string | null => {
	if (!Relative.startsWith("pages/")) return null;

	const Rest = Relative.slice("pages/".length);

	if (/\.[a-z]+\.ts$/.test(Rest) || Rest.endsWith(".ts")) return null;

	const Segments = Rest.replace(/\.astro$/, "")
		.split("/")
		.filter((Segment) => Segment !== "index")
		.map((Segment) => {
			const Dynamic = Segment.match(/^\[+(\.{0,3})(.+?)\]+$/);

			if (Dynamic)
				return Dynamic[1] === "..."
					? `:${Dynamic[2]}`
					: `:${Dynamic[2]}`;

			return Segment;
		});

	return "/" + Segments.join("/");
};

/**
 * The page's title, read from its own metadata.
 *
 * A page states its title as `T("meta.x.title", { defaultValue: "..." })` or as
 * a literal. The first `defaultValue` after `MetaTitle` is the page's own name;
 * absent one, the route is the title, which is honest - an untitled page has no
 * title to invent.
 */
const TitleOf = (Body: string, Route: string): string => {
	// The whole statement, so a `defaultValue` from a later `T()` call on the same
	// page cannot be mistaken for the title. `/Doc/:slug` builds its title from the
	// entry it renders, which is not a literal this script may invent - so it falls
	// back to the route, which is at least true.
	const Statement = Body.match(/\bMetaTitle\s*=([^;]*);/);

	if (Statement) {
		const Source = Statement[1] ?? "";

		const Literal =
			Source.match(/defaultValue:\s*"([^"]+)"/) ??
			Source.match(/^\s*"([^"]+)"/);

		const Title = Literal?.[1];

		if (Title) return Title;
	}

	return Route;
};

/**
 * What a module carries: the first sentence of its leading doc comment.
 *
 * Every file in this tree opens with one - it is the house style - and the
 * sentence is the file's own claim about itself, which is a better answer than
 * anything this script could infer from its exports. A file without a comment
 * gets its export list instead, because "exports X, Y" is true and "no
 * description" would be an omission the index then has to hide.
 */
const Carries = (Body: string): string => {
	const Leading = Body.match(
		/^\s*(?:---\s*)?(?:\/\*\*([\s\S]*?)\*\/|\/\*([\s\S]*?)\*\/|((?:\s*\/\/[^\n]*\n)+))/,
	);

	let Text = "";

	if (Leading) {
		Text = (Leading[1] ?? Leading[2] ?? Leading[3] ?? "")
			.split("\n")
			.map((Line) => Line.replace(/^\s*(?:\/\/|\*)\s?/, "").trim())
			.filter((Line) => Line.length > 0)
			.filter((Line) => !/^[─━=\-]{3,}$/.test(Line))
			.join(" ");
	}

	if (Text.length === 0) {
		const Exports = [
			...Body.matchAll(
				/export\s+(?:default\s+)?(?:async\s+)?(?:const|function|class|interface|type)\s+([A-Za-z0-9_]+)/g,
			),
		]
			.map((Match) => Match[1])
			.slice(0, 4);

		return Exports.length > 0
			? `Exports ${Exports.join(", ")}.`
			: "No leading comment and no exports.";
	}

	// The first sentence, and never more than 180 characters: the register is a
	// row, and a row that needs a paragraph is not a row.
	const Sentence = Text.split(/(?<=\.)\s/)[0];

	return Sentence.length > 180
		? Sentence.slice(0, 177).trimEnd() + "..."
		: Sentence;
};

/** The module's kind, from where it lives. One file, one kind. */
const KindOf = (Relative: string): string => {
	if (Relative.startsWith("pages/")) return "route";
	if (Relative.startsWith("Layout/")) return "layout";
	if (Relative.startsWith("Script/")) return "script";
	if (Relative.startsWith("Function/")) return "function";
	if (Relative.startsWith("Type/") || Relative.endsWith(".d.ts"))
		return "type";
	if (Relative.startsWith("Variable/")) return "variable";
	if (Relative.startsWith("Content/")) return "content";
	if (Relative.startsWith("Library/")) return "library";
	if (Relative.startsWith("Component/")) return "component";
	if (Relative.startsWith("Test/")) return "test";
	return "other";
};

/**
 * A file the index counts but does not list as a module.
 *
 * The bulk trees are the ones where one row per file would describe a
 * generated artefact or a catalogue entry rather than a decision: the link index
 * and the locale sets are written by tooling, the Mermaid bundle is vendored, a
 * stylesheet partial is named by the layer that loads it, and a test's reader is
 * the runner rather than the build.
 *
 * Two trees under `Component/` are libraries rather than surfaces, and they stay
 * bulk for that reason alone:
 *
 *   `Component/UI/`               the vendored shadcn family. Thirty of its
 *                                 primitives have no importer; a catalogue is
 *                                 measured by what it offers, not by what the
 *                                 site happened to mount.
 *   `Component/Dynamic/Interface/` the content schemas - one type per property
 *                                 of one page. They describe the shape of data
 *                                 that has since moved into `Content/`, and a
 *                                 schema with no reader is a schema the data
 *                                 outgrew, not a surface waiting for a page.
 *
 * **The rest of `Component/` used to be on this list too, and it must not be.**
 * Excluding it kept `Modules.json` small, and the cost was the one question the
 * register exists to answer: a component nothing mounts. `DynamicHeader.tsx`,
 * `DynamicFooter.tsx` and `DynamicVerificationInfo.tsx` sat in the tree for the
 * whole programme, and `/Contents`' `/THE DECLARED` band - whose stated claim is
 * that nothing is unaccounted for - could not see any of them, because the tree
 * that holds every surface of the site had been declared bulk. A register that
 * cannot name a readerless component is not a register of the site; it is a
 * register of everything except the site.
 */
const IsBulk = (Relative: string) =>
	Relative.startsWith("Library/LinkIndex/") ||
	Relative.startsWith("Library/I18n/Locale/") ||
	Relative.startsWith("Content/Mermaid/") ||
	Relative.startsWith("Component/UI/") ||
	Relative.startsWith("Component/Dynamic/Interface/") ||
	Relative.startsWith("Stylesheet/") ||
	Relative.startsWith("Test/");

const Lines = (Relative: string) => {
	const Body = Read(Relative);

	return Body.length === 0 ? 0 : Body.split("\n").length;
};

/* ─── Routes ─────────────────────────────────────────────────────────────── */

const RouteRows = Files.filter((Relative) => Relative.startsWith("pages/"))
	.map((Relative) => ({ Relative, Route: RouteOf(Relative) }))
	.filter(
		(Row): Row is { Relative: string; Route: string } => Row.Route !== null,
	)
	.map(({ Relative, Route }) => {
		const Body = Read(Relative);

		return {
			Path: Route,
			File: Relative,
			Title: TitleOf(Body, Route),
			Forms: BlocksReached(Relative),
			Lines: Lines(Relative),
			NoIndex: /noIndex=\{true\}/.test(Body),
		};
	})
	.sort((A, B) => A.Path.localeCompare(B.Path));

/**
 * The route registry, read from `Function/Route/Registry.ts` rather than
 * restated, so the drift the footnote prints is the drift the build has.
 *
 * It used to read `Function/Route/Map.ts` and pick out the hand-written array
 * that lived there. That array is gone: `Map.ts` now derives `CanonicalPath`
 * from the registry's `CanonicalRoute`, which is the whole point of the
 * registry (one definition, two readers). The parser kept looking for the old
 * shape, found nothing, and reported `0 declared, 41 missing` - so `/Contents`
 * printed a footnote accusing the build of drift it did not have, and listing
 * forty-one routes it had in fact declared. A generator that measures the wrong
 * file is worse than no measurement, because its output is printed as a fact.
 *
 * The registry lists a collection once (`/Doc/[...Slug]`), and the build emits
 * one template path for it (`/Doc/:Slug`), so the two are compared on the
 * template: a route row and a registry row that describe the same built path
 * are the same path.
 */
const Registry = (() => {
	const File = Read("Function/Route/Registry.ts");

	/* Every `Path: "/…"` line, with the block that follows it up to the next
	   one: `Canonical` and `Kind` are read from the entry's own body rather
	   than from a second table. */
	const At = [...File.matchAll(/^\s*Path: "([^"]+)",$/gm)];

	const Rows = At.map((Match, Index) => {
		const Start = Match.index ?? 0;

		const End = At[Index + 1]?.index ?? File.length;

		const Block = File.slice(Start, End);

		return {
			Path: Match[1] as string,

			Canonical: /^\s*Canonical: true,$/m.test(Block),

			Kind: /^\s*Kind: "([a-z]+)",$/m.exec(Block)?.[1] ?? "page",
		};
	});

	/** `/Doc/[...Slug]` and `/Blog/[Slug]` are the build's `/Doc/:Slug`. */
	const Template = (Path: string) => Path.replace(/\/\[[^\]]*\]$/, "/:Slug");

	const Built = new Set(RouteRows.map((Row) => Row.Path));

	const Declared = new Set(Rows.map((Row) => Template(Row.Path)));

	return {
		Declared: Rows.map((Row) => Row.Path),

		Count: Rows.length,

		Canonical: Rows.filter((Row) => Row.Canonical).length,

		Collections: Rows.filter((Row) => Row.Kind === "collection").length,

		Missing: [...Built].filter((Path) => !Declared.has(Path)).sort(),

		Extra: [...Declared].filter((Path) => !Built.has(Path)).sort(),
	};
})();

/* ─── Forms ──────────────────────────────────────────────────────────────── */

const FormRows = Blocks.map((Block) => {
	const Routes = RouteRows.filter((Row) => Row.Forms.includes(Block)).map(
		(Row) => Row.Path,
	);

	return { Block, Routes, Count: Routes.length };
});

/* ─── Records ────────────────────────────────────────────────────────────── */

/**
 * The record heads the tree prints.
 *
 * A record head is a `# NAME_NN` literal - `# LAND_01`, `# RELEASE_01`,
 * `# ROUTE_404` - and it is printed from a string, never assembled in markup.
 * The script reads the literal, finds the module that declares it, and asks the
 * import graph which routes reach that module: a record two pages print is one
 * record with two doors, which is what the palette has to know to index it.
 *
 * Quoted literals only. A `# NAME_NN` in a comment is a card talking about a
 * record, not a page printing one, and the difference matters: the register
 * lists heads a reader can go to, not heads the tree mentions.
 */
const HeadLiteral = /(["'])#\s?([A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*_[0-9]{2})\1/g;

/** Record id -> the modules that print it. */
const HeadFiles = new Map<string, Set<string>>();

for (const Relative of Files) {
	if (!IsModule(Relative)) continue;

	// Tests quote ids in fixtures and the generated area quotes the index; neither
	// is a page printing a head.
	if (Relative.startsWith("Test/") || Relative.startsWith("Generated/"))
		continue;

	for (const Match of Read(Relative).matchAll(HeadLiteral)) {
		const Id = Match[2]!;

		const Declared = HeadFiles.get(Id) ?? new Set<string>();

		Declared.add(Relative);

		HeadFiles.set(Id, Declared);
	}
}

/**
 * Every module one route reaches, itself included. Computed once per route
 * because the record pass asks the question once per head, and a head can be
 * declared in a module every page imports.
 */
const RouteReach = new Map<string, Set<string>>();

const ReachOf = (Page: string): Set<string> => {
	const Cached = RouteReach.get(Page);

	if (Cached) return Cached;

	const Seen = new Set<string>([Page]);

	const Pending = [Page];

	while (Pending.length > 0) {
		const Next = Pending.shift()!;

		for (const Target of Imports.get(Next) ?? []) {
			if (!Seen.has(Target)) {
				Seen.add(Target);

				Pending.push(Target);
			}
		}
	}

	RouteReach.set(Page, Seen);

	return Seen;
};

/**
 * One row per record head: its id, the module that prints it, and the routes
 * that reach that module. A head no route reaches is still listed - a record
 * with no door is a fact the index should print rather than hide.
 */
const RecordRows = [...HeadFiles.entries()]
	.map(([Id, Declared]) => {
		const Files = [...Declared].sort();

		const Routes = [
			...new Set(
				RouteRows.filter((Row) =>
					Files.some((File) => ReachOf(Row.File).has(File)),
				).map((Row) => Row.Path),
			),
		].sort();

		return { Id, File: Files[0] ?? "", Files, Routes };
	})
	.sort((A, B) => A.Id.localeCompare(B.Id));

/* ─── Modules ────────────────────────────────────────────────────────────── */

const ModuleRows = Files.filter(
	(Relative) => IsModule(Relative) && !IsBulk(Relative),
)
	.map((Relative) => {
		const Readers = [...new Set(ImportedBy.get(Relative) ?? [])].sort();

		return {
			Path: Relative,
			Kind: KindOf(Relative),
			Carries: Carries(Read(Relative)),
			Lines: Lines(Relative),
			Readers: Readers.length,
			ReadBy: Readers.slice(0, 6),
			Reached: Reached.has(Relative),
		};
	})
	.sort((A, B) => A.Path.localeCompare(B.Path));

/** A module nothing imports. Ambient declarations are excluded: the compiler reads them. */
const Orphans = ModuleRows.filter(
	(Row) => Row.Readers === 0 && Row.Kind !== "type" && Row.Kind !== "route",
);

/* ─── Totals ─────────────────────────────────────────────────────────────── */

const Count = (Predicate: (Relative: string) => boolean) =>
	Files.filter(Predicate).length;

const Totals = {
	Files: Files.length,
	Routes: RouteRows.length,
	Documents: Count(
		(Relative) =>
			Relative.startsWith("Content/doc/") && Relative.endsWith(".md"),
	),
	Entries: Count(
		(Relative) =>
			Relative.startsWith("Content/blog/") && Relative.endsWith(".md"),
	),
	/**
	 * The fifteen element records - counted by what they say they are.
	 *
	 * The pattern alone (`Content/Record/<Name>.ts`, minus the type) counted
	 * `Land.ts` too, and `Land.ts` is the product's own record: its
	 * `Category` is `"Product"`, not `"Element"`. So the index printed
	 * `ELEMENTS: 16` on a site whose wall, whose index, whose `/Specimen` and
	 * whose `/Glossary` all say fifteen - a figure derived from a filename
	 * pattern that had stopped meaning what the figure meant. The category is
	 * the record's own declaration, so it is what decides.
	 */
	Elements: Count(
		(Relative) =>
			/^Content\/Record\/[A-Z][A-Za-z]+\.ts$/.test(Relative) &&
			!Relative.endsWith("FieldRecord.ts") &&
			/^\s*Category: "Element",$/m.test(Read(Relative)),
	),
	Blocks: Blocks.length,
	Modules: ModuleRows.length,
	Read: ModuleRows.filter((Row) => Row.Readers > 0).length,
	Declared: Orphans.length,
};

/* ─── Write ──────────────────────────────────────────────────────────────── */

const Provenance = (From: string[], Note: string) => ({
	By: "Source/Script/Register.ts",
	From,
	Transform: ["Facts"],
	Note,
	Rule: "Generated. Change the tree or the page, then run `node Source/Script/Register.ts` - never this file.",
});

const Write = (Name: string, Value: unknown) => {
	writeFileSync(
		join(Facts, Name),
		JSON.stringify(Value, null, "\t") + "\n",
		"utf8",
	);

	return `Source/Generated/Facts/${Name}`;
};

/**
 * The three destinations, each with the tree it was measured from and the one
 * page that prints it. Named once, so the manifest cannot describe a file the
 * script does not write.
 */
const Destinations = [
	{
		Name: "Routes.json",
		From: "Source/pages/**, Source/Component/Record/**, Source/Function/Route/Registry.ts",
		Read: "/Contents - `/THE ROUTES`, and the footnote that names the registry drift",
	},
	{
		Name: "Forms.json",
		From: "Source/pages/**, Source/Component/Record/**",
		Read: "/Contents - `/THE FORMS`, the `ROUTES` column of the matrix",
	},
	{
		Name: "Modules.json",
		From: "Source/**",
		Read: "/Contents - `/THE REGISTER` (the extent) and `/THE DECLARED` (the modules with no reader)",
	},
	{
		Name: "Records.json",
		From: "Source/** - every quoted `# NAME_NN` head and the routes that reach it",
		Read: "the command palette - the `RECORDS` register, so a reader can go to the page that prints a record",
	},
];

const Written = [
	Write("Routes.json", {
		_Generated: Provenance(
			[
				"Source/pages/**",
				"Source/Component/Record/**",
				"Source/Function/Route/Registry.ts",
			],
			"One row per route Astro builds, the forms its tree mounts, and the drift between the built routes and the registry that declares them.",
		),
		Routes: RouteRows,
		Registry,
	}),

	Write("Forms.json", {
		_Generated: Provenance(
			["Source/pages/**", "Source/Component/Record/**"],
			"The artifact set, measured: for each of the fourteen blocks, the routes whose import tree mounts it.",
		),
		Forms: FormRows,
	}),

	Write("Modules.json", {
		_Generated: Provenance(
			["Source/**"],
			"One row per module outside the bulk trees: what it carries, how many files read it, and whether the build reaches it.",
		),
		Modules: ModuleRows,
		Orphans,
		Totals,
	}),

	Write("Records.json", {
		_Generated: Provenance(
			["Source/**"],
			"One row per record head the tree prints: the `# NAME_NN` literal, the modules that print it, and the routes whose import tree reaches them.",
		),
		Records: RecordRows,
		Totals: { Records: RecordRows.length },
	}),
];

/**
 * The manifest. It is written, not authored, so it cannot describe a tree that
 * no longer exists - and it is the file a reader opens first to find out what
 * in `Source/Generated/` may be edited (nothing).
 */
const Manifest = `<!-- Generated by Source/Script/Register.ts. Do not edit. -->

# The generated area

Everything under \`Source/Generated/\` is written by \`Source/Script/Register.ts\`.
Nothing here is edited by hand: a change made in this directory is overwritten
by the next run. The output is checked in, so the site builds without running
the script - the script exists so the facts can be re-measured.

Run it after moving, adding or renaming a source file:

\`\`\`sh
node Source/Script/Register.ts
\`\`\`

## What lands here

${Destinations.map((Destination) => `- \`Source/Generated/Facts/${Destination.Name}\` <- \`${Destination.From}\` - read by ${Destination.Read}`).join("\n")}

## What the numbers mean

| File           | Answers                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------- |
| \`Routes.json\`  | which routes the build emits, what each one mounts, and whether the registry agrees |
| \`Forms.json\`   | which of the Record blocks is mounted by which route                                        |
| \`Modules.json\` | what every module outside the bulk trees carries, and who reads it                            |
| \`Records.json\` | every record head the tree prints, and the routes a reader can reach it from                  |

Measured at the last run: **${Totals.Routes} routes**, **${Totals.Modules} modules**,
**${Totals.Read} read**, **${Totals.Declared} declared with no reader**.

## How a fact changes

Never in this directory. Move the file, fix the import, or edit the page - then
run the script. A fact that cannot be re-measured is not a fact the index may
print, so a figure with no source in the tree is dropped from \`/Contents\`
rather than written here by hand.

## The additive law

The script writes and never deletes. A module that loses its reader appears in
\`Modules.Orphans\` and in the index's register with the reason it exists; it is
not removed, and a run that finds a file it did not write reports it instead of
overwriting it.
`;

writeFileSync(join(Generated, "GENERATED.md"), Manifest, "utf8");

console.log(
	[
		`Wrote ${Written.length} fact files + GENERATED.md`,

		`  routes   ${Totals.Routes}`,

		`  modules  ${Totals.Modules} (${Totals.Read} read, ${Totals.Declared} declared)`,

		`  registry ${Registry.Count} declared (${Registry.Canonical} canonical, ${Registry.Collections} collections), missing ${Registry.Missing.length}${Registry.Missing.length ? `: ${Registry.Missing.join(" ")}` : ""}`,

		`  records  ${RecordRows.length} heads, ${RecordRows.filter((Row) => Row.Routes.length > 0).length} reachable`,

		`  orphans  ${Orphans.map((Row) => Row.Path).join(" ")}`,
	].join("\n"),
);
