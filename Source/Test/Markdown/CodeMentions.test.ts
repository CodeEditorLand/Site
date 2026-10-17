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
 */

import { unified } from "unified";

import remarkParse from "remark-parse";

import remarkStringify from "remark-stringify";

import remarkCodeMentions from "../../Function/Markdown/CodeMentions";

import { LinkCount } from "../../Library/LinkMatcher";

const LandUrl = "https://github.com/CodeEditorLand/Land";

const AirBinaryUrl =
	"https://github.com/CodeEditorLand/Air/tree/Current/Source/Binary/Binary.rs";

const RestPluginUrl =
	"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild/Output.ts#L6";

const ExtHostCommandsUrl =
	"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostCommands.ts#L132";

const Frontmatter = "---\ntitle: Land frontmatter\n---";

const Sample = [
	"# Land heading",

	"",

	"Prose mentions: Land, RestPlugin, SkyBridge and commands.executeCommand.",

	"File path prose: Source/Binary/Binary.rs and the long form CodeEditorLand/Air/tree/Current/Source/Binary/Binary.rs.",

	"",

	"Inline code: `Source/Binary/Binary.rs` whole-span and `let x = foo()` multi-token.",

	"",

	"CodeEditorLand and Code Editor Land are protected compounds.",

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

describe("remarkCodeMentions (render-time placement)", () => {
	it("index cache holds every resolved entry (UNKNOWNs skipped, noise dropped)", () => {
		expect(LinkCount).toBe(2260);
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
});
