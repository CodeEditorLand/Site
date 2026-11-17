/**
 * BuildDocToc - the in-page table of contents, from the page's own `##`
 * headings.
 *
 * The entries are NOT re-slugified here. `render()` reports every heading with
 * the id the markdown pipeline actually wrote, so `Href` is `#` + that id and an
 * anchor can never drift from its heading. A hand-rolled slug function would
 * disagree with the pipeline on the first heading that carries punctuation or a
 * variation selector, and every such link would silently 404 on itself.
 *
 * **The markdown sometimes provides its own TOC.** Eleven pages carry a
 * `## Table of Contents` heading followed by a numbered anchor list (`air`,
 * `api-reference`, `architecture`, `build-pipeline`, `common`, `mountain`,
 * `polyfills`, `rest`, `sky`, `wind`, `workflow-overview`). For those the
 * builder returns `null` rather than printing a second contents list above the
 * first - a page with two tables of contents is worse than a page with one.
 *
 * The announcement is matched after normalising the heading, not against a
 * strict regex: `workflow-overview` writes `## Table of Contents 📑`, and a
 * trailing glyph is decoration on the same sentence. Normalising means
 * stripping everything after the last letter, so `Table of Contents 📑` and
 * `Table of Contents` are the same announcement, while `Contents of the Build`
 * is not (it is a subject, not a contents list).
 *
 * A page with fewer than two `##` headings gets no TOC either: one entry is not
 * a contents list, it is a heading that happens to be alone.
 */
import type { DocHeading, DocToc } from "../../Component/Doc/Type.js";

/** The headings a markdown file uses to announce its own contents list. */
const OwnToc = new Set([
	"table of contents",
	"contents",
	"on this page",
	"in this page",
]);

/**
 * A heading reduced to its words: lower-cased, with everything after the last
 * letter dropped. `Table of Contents 📑` and `Table of Contents` both normalise
 * to `table of contents`; a heading that merely starts with the phrase keeps its
 * remaining words and therefore does not match.
 */
const Normalise = (Text: string): string =>
	Text.trim()
		.replace(/[^\p{L}]+$/u, "")
		.toLowerCase();

/**
 * The `##` headings as TOC entries, or `null` when this page needs none.
 *
 * `Label` is the nav's own label (`On this page`), passed in by the page so
 * this module stays free of the i18n client.
 */
const BuildDocToc = (
	Headings: readonly DocHeading[],
	Label: string,
): DocToc | null => {
	const Second = Headings.filter((Heading) => Heading.depth === 2);

	const First = Second.at(0);

	if (!First || Second.length < 2 || OwnToc.has(Normalise(First.text)))
		return null;

	return {
		Label,
		Items: Second.map((Heading) => ({
			Label: Heading.text,
			Href: `#${Heading.slug}`,
		})),
	};
};

export default BuildDocToc;
