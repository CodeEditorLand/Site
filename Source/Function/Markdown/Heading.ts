/**
 * remarkHeading - the page owns the level-one heading, and the markdown never
 * renders a second one.
 *
 * A documentation article's shell (`Component/Doc/DocArticle.astro`) prints the
 * page's `title` as its only `h1`. A markdown body that opens with `# Air:
 * Background Daemon` therefore put a second `h1` on the page the moment the
 * shell rendered it - two level-one headings in one document is the defect the
 * shell exists to prevent, and 39 of the 81 files under `Source/Content/doc`
 * open that way.
 *
 * The fix is here rather than in those 39 files: the markdown is the source of
 * the document, and a heading level is a rendering decision. Demoting the
 * document's own `# ` line to `##` gives the page one `h1` and makes the
 * document title the first `h2` of the prose, with its own `##` sections as its
 * siblings - the shape the blog's articles already render, because their
 * markdown opens at `##`.
 *
 * Two notes on the scope:
 *
 * - **Only `heading` nodes are touched.** A `# ` inside a fenced code block is a
 *   shell comment, not a heading, and it never reaches this plugin as a
 *   `heading` node - so a page full of `# install` snippets is unaffected.
 * - **No file is special-cased.** A markdown file that carries no `# ` line -
 *   every blog article, today - passes through unchanged; the rule is the
 *   site's, and the day a blog post opens with `# ` it gets the same treatment
 *   as a doc page.
 */
interface Node {
	readonly type: string;

	depth?: number;

	children?: Node[];
}

export default function remarkHeading() {
	return (Tree: Node) => {
		Demote(Tree);
	};
}

/**
 * Walk the tree and demote every level-one heading to level two.
 *
 * The walk is depth-first over `children`, which is the only property that
 * matters here: a heading is a leaf in markdown's AST, so a node that carries
 * no `children` ends a branch and nothing is skipped.
 */
function Demote(Node: Node) {
	if (!Node.children) return;

	for (const Child of Node.children) {
		if (Child.type === "heading" && Child.depth === 1) Child.depth = 2;

		Demote(Child);
	}
}
