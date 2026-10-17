/**
 * The AST-level code-mention pass for markdown content - the Aphrodite/Site
 * pattern wired as a remark plugin (alongside Callout.ts / Mermaid.ts in
 * this directory). astro.config.ts wires it into BOTH markdown.remarkPlugins
 * and the @astrojs/mdx remarkPlugins.
 *
 * Walks the mdast tree and links mapped terms at render time - the .md
 * source files stay clean (no footers, no inline links). It uses the shared
 * compiled cache (Source/Library/LinkMatcher.ts: MarkdownMatcher over the
 * full LinkIndex, built once at module load), never re-scanning the index.
 *
 * Rules (mirroring the prose pass, Source/Library/CodeMentions.ts):
 *  - TEXT nodes are scanned with the longest-first boundary regex; matched
 *    terms become link nodes [Term](url) with byte-identical labels.
 *  - INLINE CODE spans are linked when their text WHOLE-SPAN-matches a term
 *    (file paths, symbols, API names): the span becomes a link node whose
 *    label is the code span ([`Source/IPC/SkyEmit.rs`](url)) - markdown
 *    renders the link with code styling, no nesting violation. Multi-token
 *    spans (e.g. `let x = foo()`) never match.
 *  - SKIPPED subtrees: code blocks (fenced), existing link nodes (no nested
 *    anchors - the partial inline links become harmless), headings,
 *    frontmatter (yaml nodes; outside the AST naturally), raw html, image
 *    and reference nodes.
 *  - Protected compounds ("CodeEditorLand", "Code Editor Land") are part of
 *    the compiled matcher and re-emit unchanged - never linked.
 *
 * Phase 3c (per-page context overrides): the transformer now receives the
 * vfile and derives the page key from File.path (the .md basename, no
 * extension). When a term resolves through the matcher, the per-page
 * override map (LinkIndexOverrides, Source/Library/LinkIndex.ts) is
 * consulted first: `false` emits plain text (the mention is prose on this
 * page), a URL pins that exact URL (the context names a better target).
 * The index and the Scan/Lookup contract are otherwise unchanged.
 */

import { Lookup, MarkdownMatcher } from "../../Library/LinkMatcher";

import { LinkIndexOverrides } from "../../Library/LinkIndex";

interface CodeMentionsNode {
	type: string;

	value?: string;

	children?: CodeMentionsNode[];

	[key: string]: unknown;
}

/** The page key for the override map: the .md basename without extension. */
const PageKeyOf = (File: unknown): string | undefined => {
	const Path = (File as { path?: string } | undefined)?.path;

	if (!Path) return undefined;

	const Base = Path.split("/").pop() ?? "";

	return Base.replace(/\.(md|mdx)$/i, "");
};

/** The per-page override for one term: undefined = no override, false = never link, string = pin URL. */
const OverrideOf = (
	PageKey: string | undefined,

	Term: string,
): string | false | undefined =>
	PageKey ? LinkIndexOverrides[PageKey]?.[Term] : undefined;

export default function remarkCodeMentions() {
	return (Tree: CodeMentionsNode, File: unknown) => {
		Walk(Tree, PageKeyOf(File));
	};
}

/** Node types whose subtree is never linked. */
const Skip = new Set([
	"code",

	"html",

	"heading",

	"image",

	"imageReference",

	"link",

	"linkReference",

	"yaml",
]);

function Walk(Node: CodeMentionsNode, PageKey: string | undefined) {
	if (!Node.children) return;

	for (let I = 0; I < Node.children.length; I++) {
		const Child = Node.children[I];

		if (Skip.has(Child.type)) continue;

		if (Child.type === "inlineCode") {
			LinkInlineCode(Node, I, PageKey);

			continue;
		}

		if (Child.type === "text") {
			const Replaced = LinkText(Child, PageKey);

			if (Replaced) {
				Node.children.splice(I, 1, ...Replaced);

				I += Replaced.length - 1;
			}

			continue;
		}

		Walk(Child, PageKey);
	}
}

/** A code span whose text IS a term becomes a link whose label is the span. */
function LinkInlineCode(
	Node: CodeMentionsNode,

	Index: number,

	PageKey: string | undefined,
) {
	const Span = Node.children![Index];

	const Url = Lookup(Span.value ?? "");

	if (!Url) return;

	const Override = OverrideOf(PageKey, Span.value ?? "");

	if (Override === false) return;

	Node.children![Index] = {
		type: "link",

		url: Override === undefined ? Url : Override,

		children: [{ type: "inlineCode", value: Span.value }],
	};
}

/**
 * Split one text node into text/link children at every matched term.
 * Protected compounds and the index terms both come from MarkdownMatcher;
 * protected matches carry no Url and re-emit as plain text.
 */
function LinkText(
	Node: CodeMentionsNode,

	PageKey: string | undefined,
): CodeMentionsNode[] | null {
	const Value = Node.value ?? "";

	const Matches = MarkdownMatcher.Scan(Value);

	if (Matches.length === 0) return null;

	const Out: CodeMentionsNode[] = [];

	let Cursor = 0;

	for (const M of Matches) {
		if (M.Start > Cursor) {
			Out.push({ type: "text", value: Value.slice(Cursor, M.Start) });
		}

		const Override = M.Url ? OverrideOf(PageKey, M.Term) : undefined;

		if (M.Url && Override !== false) {
			Out.push({
				type: "link",

				url: Override === undefined ? M.Url : Override,

				children: [{ type: "text", value: M.Term }],
			});
		} else {
			Out.push({ type: "text", value: M.Term });
		}

		Cursor = M.End;
	}

	if (Cursor < Value.length) {
		Out.push({ type: "text", value: Value.slice(Cursor) });
	}

	return Out;
}
