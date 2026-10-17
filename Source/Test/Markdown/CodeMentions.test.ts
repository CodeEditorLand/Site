/**
 * Unit test for the render-time link placement pipeline: the remark plugin
 * (Source/Function/Markdown/CodeMentions.ts) over the shared compiled cache
 * (Source/Library/LinkMatcher.ts + LinkIndex.ts).
 *
 * Runs the plugin through the real unified pipeline (remark-parse ->
 * remarkCodeMentions -> remark-stringify) over a sample document containing
 * every class the brief requires: prose mentions (element, symbol, file
 * path, extHost API), a code fence, a whole-span inline code term, a
 * multi-token code span, an existing link, a heading, frontmatter, and the
 * protected brand compounds.
 *
 * Phase 3b additions: the submodule class (Land/Element/<Name>/... and
 * Land/Dependency/<...>/... gitlink paths) composes to the element/dependency
 * repos instead of the Land URL, pure-lowercase noise terms ("shell") never
 * link while allowlisted brands ("esbuild", "pnpm") still do, a dotted API
 * term keeps its #L anchor, and an External spec renders verbatim.
 *
 * Phase 3c additions: the transformer derives the page key from the vfile
 * path (the .md basename) and applies the per-page override map - a pin
 * ("api-reference" -> ProcessCocoonRequest -> Vine.proto#L8) and a removal
 * ("workflow-tier-gated-implementation-selection" -> IPC -> false). The
 * globally-wrong noise class ("macOS", "Current", ...) is dropped from the
 * index entirely, so LinkCount shrinks.
 */

import { unified } from "unified";

import remarkParse from "remark-parse";

import remarkStringify from "remark-stringify";

import remarkCodeMentions from "../../Function/Markdown/CodeMentions";

import { LinkCount } from "../../Library/LinkMatcher";

import { VFile } from "vfile";

const LandUrl = "https://github.com/CodeEditorLand/Land";

const AirBinaryUrl =
	"https://github.com/CodeEditorLand/Air/tree/Current/Source/Binary/Binary.rs";

const RestPluginUrl =
	"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild/Output.ts#L6";

const ExtHostCommandsUrl =
	"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostCommands.ts#L132";

/** The submodule class: Element/Air/README.md lives in the Air repo, not Land. */
const ElementSubmoduleUrl =
	"https://github.com/CodeEditorLand/Air/tree/Current/README.md";

/** The submodule class: Dependency/Microsoft/Dependency/Editor/.nvmrc lives in the Editor repo. */
const DependencySubmoduleUrl =
	"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/.nvmrc";

const Frontmatter = "---\ntitle: Land frontmatter\n---";

const Sample = [
	"# Land heading",

	"",

	"Prose mentions: Land, RestPlugin, SkyBridge and commands.executeCommand.",

	"File path prose: Source/Binary/Binary.rs and the long form CodeEditorLand/Air/tree/Current/Source/Binary/Binary.rs.",

	"Submodule prose: Element/Air/README.md and Dependency/Microsoft/Dependency/Editor/.nvmrc.",

	"",

	"Inline code: `Source/Binary/Binary.rs` whole-span and `let x = foo()` multi-token.",

	"",

	"CodeEditorLand and Code Editor Land are protected compounds.",

	"",

	"Allowlisted brands esbuild and pnpm link; noise terms shell, window and run never do.",

	"",

	"[Land](https://example.com/land) is an existing link.",

	"",

	"```ts",

	"Land is code inside a fence",

	"```",

	"",
].join("\n");

const Render = (Markdown: string): string =>
	unified()
		.use(remarkParse)
		.use(remarkCodeMentions)
		.use(remarkStringify)
		.processSync(Markdown)
		.toString();

/** Render with an explicit vfile path so the plugin derives the page key. */
const RenderAs = (Path: string, Markdown: string): string =>
	unified()
		.use(remarkParse)
		.use(remarkCodeMentions)
		.use(remarkStringify)
		.processSync(new VFile({ path: Path, value: Markdown }))
		.toString();

describe("remarkCodeMentions (render-time placement)", () => {
	it("index cache holds every resolved entry (UNKNOWNs skipped, noise dropped)", () => {
		expect(LinkCount).toBe(1955);
	});

	it("links prose mentions of each class with byte-identical labels", () => {
		const Out = Render(Sample);

		expect(Out).toContain(`[Land](${LandUrl})`);

		expect(Out).toContain(`[RestPlugin](${RestPluginUrl})`);

		expect(Out).toContain(
			`[SkyBridge](https://github.com/CodeEditorLand/Land/tree/Current/)`,
		);

		expect(Out).toContain(
			`[commands.executeCommand](${ExtHostCommandsUrl})`,
		);

		expect(Out).toContain(`[Source/Binary/Binary.rs](${AirBinaryUrl})`);
	});

	it("links the longest term first over the protected compound", () => {
		const Out = Render(Sample);

		expect(Out).toContain(
			`[CodeEditorLand/Air/tree/Current/Source/Binary/Binary.rs](${AirBinaryUrl})`,
		);

		expect(Out).not.toContain("CodeEditorLand/[Air](");
	});

	it("links a whole-span inline code term, leaves multi-token spans plain", () => {
		const Out = Render(Sample);

		expect(Out).toContain(`[\`Source/Binary/Binary.rs\`](${AirBinaryUrl})`);

		expect(Out).toContain("`let x = foo()`");

		expect(Out).not.toContain("`[let x = foo()]");
	});

	it("composes the submodule class to the element/dependency repos", () => {
		const Out = Render(Sample);

		expect(Out).toContain(
			`[Element/Air/README.md](${ElementSubmoduleUrl})`,
		);

		expect(Out).toContain(
			`[Dependency/Microsoft/Dependency/Editor/.nvmrc](${DependencySubmoduleUrl})`,
		);

		expect(Out).not.toContain(
			"[Element/Air/README.md](https://github.com/CodeEditorLand/Land/",
		);

		expect(Out).not.toContain(
			"[Dependency/Microsoft/Dependency/Editor/.nvmrc](https://github.com/CodeEditorLand/Land/",
		);
	});

	it("never links pure-lowercase noise terms, still links allowlisted brands", () => {
		const Out = Render(Sample);

		expect(Out).toContain(`[esbuild](https://esbuild.github.io)`);

		expect(Out).toContain(`[pnpm](https://pnpm.io)`);

		expect(Out).not.toContain("[shell](");

		expect(Out).not.toContain("[window](");

		expect(Out).not.toContain("[run](");
	});

	it("links a dotted API term with its #L anchor intact", () => {
		const Out = Render(Sample);

		expect(Out).toContain(
			`[commands.executeCommand](${ExtHostCommandsUrl})`,
		);

		expect(Out).not.toContain(
			"commands.executeCommand](https://github.com/CodeEditorLand/",
		);
	});

	it("renders an External spec verbatim (no tree/Current composition)", () => {
		const Out = Render(Sample);

		expect(Out).toContain(`[esbuild](https://esbuild.github.io)`);

		expect(Out).toContain(`[pnpm](https://pnpm.io)`);
	});

	it("never links inside code fences", () => {
		const Out = Render(Sample);

		expect(Out).toContain("```ts\nLand is code inside a fence\n```");

		expect(Out).not.toContain("```ts\n[Land](");
	});

	it("never links inside headings", () => {
		const Out = Render(Sample);

		expect(Out).toContain("# Land heading");

		expect(Out).not.toContain("# [Land](");
	});

	it("skips existing links (no nested anchors) and links prose Land exactly once", () => {
		const Out = Render(Sample);

		expect(Out).toContain("[Land](https://example.com/land)");

		expect(Out.split(`[Land](${LandUrl})`).length - 1).toBe(1);
	});

	it("never links the protected brand compounds", () => {
		const Out = Render(Sample);

		expect(Out).toContain(
			"CodeEditorLand and Code Editor Land are protected compounds.",
		);

		expect(Out).not.toContain("[CodeEditorLand](");

		expect(Out).not.toContain("Code Editor [Land](");
	});

	it("frontmatter stays outside the AST (Astro strips it before remark)", () => {
		const Out = Render(Sample);

		expect(Out).not.toContain("Land frontmatter");

		expect(Out).not.toContain(Frontmatter);
	});

	it("defensively skips yaml nodes when present in the tree", () => {
		const Tree: any = {
			type: "root",

			children: [
				{ type: "yaml", value: "title: Land" },

				{
					type: "paragraph",
					children: [{ type: "text", value: "Land" }],
				},
			],
		};

		remarkCodeMentions()(Tree);

		expect(Tree.children[0]).toEqual({
			type: "yaml",
			value: "title: Land",
		});

		expect(Tree.children[1].children[0].type).toBe("link");

		expect(Tree.children[1].children[0].url).toBe(LandUrl);

		expect(Tree.children[1].children[0].children[0].value).toBe("Land");
	});

	it("derives the page key from the vfile path and pins an override URL", () => {
		const Out = RenderAs(
			"api-reference.md",

			"Prose mentions ProcessCocoonRequest for the RPC channel.",
		);

		expect(Out).toContain(
			"[ProcessCocoonRequest](https://github.com/CodeEditorLand/Vine/tree/Current/Proto/Vine.proto#L8)",
		);

		expect(Out).not.toContain(
			"[ProcessCocoonRequest](https://github.com/CodeEditorLand/Land/",
		);
	});

	it("a per-page override can remove a term that stays linked elsewhere", () => {
		const Out = RenderAs(
			"workflow-tier-gated-implementation-selection.md",

			"IPC is proxied through the tier gate.",
		);

		expect(Out).not.toContain("[IPC](");

		expect(Out).toContain("IPC is proxied through the tier gate.");

		// the same term on an unrelated page still links via the index
		const Plain = Render("IPC is the inter-process channel.");

		expect(Plain).toContain(
			"[IPC](https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/WebviewPanel/Webview/Implementation.ts#L23)",
		);
	});

	it("globally-dropped noise terms never link on any page", () => {
		const Out = Render("macOS and Current are English words here.");

		expect(Out).not.toContain("[macOS](");

		expect(Out).not.toContain("[Current](");

		expect(Out).toContain("macOS and Current are English words here.");
	});
});
