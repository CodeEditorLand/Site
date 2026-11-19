/**
 * Blog - the derivations the blog surface needs, in one module.
 *
 * Nothing here is copy: the labels arrive from the page's i18n call, and this
 * module never imports the i18n client. What it owns is the ordering, the
 * reading-time label, the contents list, the ledger rows, the margin's notes and
 * the trail's crumbs, because those are the page's decisions and a template is
 * the wrong place to make them.
 *
 * Every derivation is total: an empty collection yields an empty row list, an
 * article with fewer headings than the floor yields no contents list, and an
 * article whose tags list is empty joins to an empty `TAGS:` value. None of them
 * throws on missing data, because a missing field is the schema's job to reject,
 * not this module's.
 */
import type { Aside, LedgerRow, MarginNote } from "../Record/Type.js";

import type { BlogRow, BlogToc, BlogTocItem } from "./Type.js";

/**
 * One collection entry, structurally.
 *
 * The shapes are declared here rather than imported from `astro:content` so
 * this module stays a plain `.ts`: the page passes its entries, which satisfy
 * this interface without a cast, and nothing in the file depends on the content
 * layer being available.
 */
export interface BlogEntry {
	/** The entry id, which the collection's loader preserves as the file name. */
	readonly id: string;

	/** The frontmatter, as `content.config.ts` validates it. */
	readonly data: {
		readonly title: string;

		readonly summary: string;

		readonly publishedAt: string;

		readonly tags: readonly string[];

		readonly author: string;

		readonly readTime: number;
	};

	/** The markdown source, used only to answer "does this carry a diagram?". */
	readonly body?: string;
}

/** One heading as `render()` reports it: the pipeline's own slug, not a guess. */
export interface BlogHeading {
	readonly depth: number;

	readonly slug: string;

	readonly text: string;
}

/**
 * How many `##` headings an article needs before it is worth a contents list.
 *
 * The card sets the floor at five. Two or three headings read as a document
 * that happens to have sections; five read as a document you navigate.
 */
export const TocFloor = 5;

/**
 * The reading-time label: the schema's number plus the site's unit.
 *
 * The number is printed as given - never rounded, never recomputed from a word
 * count - so a frontmatter `readTime: 5` and the label `5 min read` are the
 * same fact.
 */
export const ReadTimeLabel = (Minutes: number, Unit: string): string =>
	`${Minutes} ${Unit}`;

/**
 * The index rows: every entry, newest first.
 *
 * `publishedAt` is `YYYY-MM-DD`, so a plain string comparison is a date
 * comparison and no `Date` object is constructed - a date is never re-parsed
 * into a timezone. Two articles published on the same day are ordered by title
 * so the list is stable between builds rather than dependent on readdir order.
 */
export const BuildRows = (
	Entries: readonly BlogEntry[],

	MinRead: string,
): readonly BlogRow[] =>
	[...Entries]
		.sort(
			(A, B) =>
				B.data.publishedAt.localeCompare(A.data.publishedAt) ||
				A.data.title.localeCompare(B.data.title),
		)
		.map((Entry) => ({
			href: `/Blog/${Entry.id}`,
			date: Entry.data.publishedAt,
			title: Entry.data.title,
			summary: Entry.data.summary,
			author: Entry.data.author,
			readTime: ReadTimeLabel(Entry.data.readTime, MinRead),
			tags: Entry.data.tags,
		}));

/**
 * The in-page contents list from the article's own `##` headings, or `null`
 * when the article has fewer than `Minimum` of them.
 *
 * Only depth 2: an article's `###` headings are its sections' own divisions,
 * and a contents list that mirrors every level is a second table of contents
 * rather than an index into the piece.
 */
export const BuildToc = (
	Headings: readonly BlogHeading[],

	Label: string,

	Minimum: number = TocFloor,
): BlogToc | null => {
	const Second: readonly BlogTocItem[] = Headings.filter(
		(Heading) => Heading.depth === 2,
	).map((Heading) => ({
		label: Heading.text,
		href: `#${Heading.slug}`,
	}));

	return Second.length >= Minimum ? { label: Label, items: Second } : null;
};

/**
 * Does this article carry a Mermaid fence?
 *
 * The page asks so it can mount the client-side renderer only where a diagram
 * exists: five of the eight articles carry a fence and three carry none, and
 * loading a diagram engine for the three would be a page weight nothing on the
 * page needs.
 */
export const HasDiagram = (Body: string | undefined): boolean =>
	Body?.includes("```mermaid") ?? false;

// ─── THE MARGIN ───────────────────────────────────────────────────────────
//
// The article's apparatus, derived from the article itself. Nothing here is a
// second copy of a fact the opening already prints: the summary is built from
// the same frontmatter the opening renders, and the notes are built from the
// article's own id, date and section count. That is why the margin can repeat
// the opening's facts without the two ever disagreeing.

/**
 * The manual page that keeps each article's subject current.
 *
 * A blog piece is dated; the manual is not. Every article on this site describes
 * something the documentation also describes, and the margin's third note points
 * at that page - so a reader who needs the current version knows where it is.
 *
 * The map is by article id rather than by tag because two articles can share a
 * tag and need different pages. An article with no entry prints no manual note
 * at all: a note that guessed a destination would be a claim the site cannot
 * back.
 */
const ManualFor: Readonly<Record<string, string>> = {
	ApplicationStartupHandshake: "architecture",

	BuildSystemDesign: "build-pipeline",

	CC0OpenSource: "why-cc0",

	EffectTypeScriptArchitecture: "why-effect-ts",

	ExtensionHostDeepDive: "cocoon",

	LocalFirstPhilosophy: "local-first-protocol",

	TauriDesktopIntegration: "why-tauri",

	VSCodeCompatibility: "vscode-api-coverage",
};

/** The note's destination: its printed label, its route and whether it resolves. */
export interface ManualTarget {
	readonly label: string;

	readonly href: string;

	readonly state: "ok" | "gone";
}

/**
 * The manual note's destination, resolved against the doc collection the page
 * already loaded.
 *
 * `state` is the point: a note that names a page the build does not contain
 * prints the tombstone (`◎ TARGET GONE` with the route struck through) rather
 * than an anchor that leads to the 404. The page resolves it at build time, so
 * the note can never claim a destination the manual has dropped.
 */
export const ManualTargetFor = (
	ArticleId: string,

	DocIds: readonly string[],
): ManualTarget | undefined => {
	const Doc = ManualFor[ArticleId];

	if (Doc === undefined) return undefined;

	return {
		label: `/DOC/${Doc.toUpperCase()}`,

		href: `/Doc/${Doc}`,

		state: DocIds.includes(Doc) ? "ok" : "gone",
	};
};

/**
 * The margin's summary: the article's own facts, as ledger rows.
 *
 * Five rows, and every one of them is printed somewhere in the opening above -
 * the author, the date, the reading time and the tags. The fifth, `SECTIONS`, is
 * the one fact the opening does not carry, and it is the one a reader deciding
 * whether to start needs: a nine-section piece and a two-section piece are
 * different commitments.
 */
export const BuildSummary = (
	Entry: BlogEntry,

	Sections: number,

	ReadTime: string,
): readonly LedgerRow[] => [
	{ key: "AUTHOR:", value: Entry.data.author },

	{ key: "FILED:", value: Entry.data.publishedAt },

	{ key: "READ:", value: ReadTime },

	{ key: "TAGS:", value: Entry.data.tags.join("\u2001") },

	{ key: "SECTIONS:", value: String(Sections) },
];

/**
 * The margin's notes: three annotations, in the order they hang.
 *
 * A note is a claim with a source, and all three are true of every article by
 * construction - which is the only kind of copy a shared surface may carry. The
 * shape note changes with the article (a piece with no sections has no
 * register, and says so); the date note carries the article's own date; the
 * manual note is omitted when the article names no manual page.
 */
export const BuildNotes = (
	Entry: BlogEntry,

	Sections: number,

	Manual: ManualTarget | undefined,

	HasRegister: boolean,
): readonly MarginNote[] => {
	const Notes: MarginNote[] = [
		{
			index: "NOTE_01",

			label: "THE DATE",

			body: `Every figure quoted in this piece is as of ${Entry.data.publishedAt}. The piece is not revised after publication; the manual is.`,

			source: `Source/Content/blog/${Entry.id}.md`,
		},

		{
			index: "NOTE_02",

			label: "THE SHAPE",

			body: HasRegister
				? `The piece opens at \`##\`: its title is the page's only \`h1\`, and the ${Sections} sections under it are what the register in this margin lists.`
				: Sections > 0
					? `The piece has ${Sections} sections, below the five-section floor, so this margin prints no register: it is short enough to read in one run.`
					: "The piece opens at `##` and runs without sections, which is why this margin prints no register: there is nothing to list, and an empty list would be a lie about the piece's shape.",

			source: "Source/Component/Blog/BlogArticle.astro",
		},
	];

	if (Manual !== undefined) {
		Notes.push({
			index: "NOTE_03",
			label: "THE MANUAL",
			body:
				Manual.state === "ok"
					? "The subject has a page in the manual, which is the version kept current. Read that page before relying on this one."
					: "The manual page this piece names is not in this build. The note keeps the route so the gap stays visible instead of becoming a link that lands on the 404.",
			link: Manual,
			source: "/DOC",
		});
	}

	return Notes;
};

/**
 * The margin's folded aside: what the piece does not cover.
 *
 * Three rows, and the third is an honest `UNAVAILABLE`: the site publishes one
 * language, so there are no translations to point at, and a blank cell would
 * read as "translations exist and are being prepared".
 */
export const BuildAside = (Entry: BlogEntry): Aside => ({
	index: "ASIDE_01",
	label: "WHAT THIS PIECE DOES NOT COVER",
	line: "This is an article, not a specification.",
	rows: [
		{
			key: "ERRATA:",
			value: "Filed through the amendment route. The piece is not edited in place.",
		},
		{
			key: "VERSIONS:",
			value: `The piece describes the tree as it stood on ${Entry.data.publishedAt}.`,
		},
		{
			key: "TRANSLATIONS:",
			value: "UNAVAILABLE - the site publishes one language.",
		},
	],
	source: `Source/Content/blog/${Entry.id}.md`,
});

/**
 * The register's empty sentence: what the margin says when the article has too
 * few sections to list.
 */
export const RegisterEmpty =
	"No register: this piece has fewer than five sections, so it is read in one run rather than navigated. The heading floor is five because two or three headings read as a document that happens to have sections.";

/**
 * The trail's crumbs, written into the site's one grammar.
 *
 * A trail prints its label EXACTLY as the caller wrote it - that is the
 * component's contract, and it is what stops a route statement from being
 * re-cased by whichever surface happens to render it. The blog's pages hand in
 * their labels from i18n (`Home`, `Blog`), so the grammar has to be written
 * somewhere between the page and the trail.
 *
 * It is written here rather than by `Contact/ContactBreadcrumb.astro`, the
 * absorbed bridge: a Contact-named adapter is the last thing the blog should
 * reach through for the site's breadcrumb, since a bridge outlives the thing it
 * bridged. Both blog surfaces import `Route/Trail` directly and write their own
 * crumbs.
 *
 * One leading slash, upper case, nothing else - the trail's one grammar, so the
 * rendered trail is the same string on every page that hands in a label.
 */
export const TrailOf = (
	Crumbs: readonly { readonly label: string; readonly href?: string }[],
): readonly { readonly label: string; readonly href?: string }[] =>
	Crumbs.map((Crumb) => ({
		...Crumb,
		label: `/${Crumb.label.replace(/^\/+/, "").toUpperCase()}`,
	}));
