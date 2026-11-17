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
 * **The markdown sometimes provides its own TOC.** Ten pages carry a
 * `## Table of Contents` heading followed by a numbered anchor list
 * (`air`, `api-reference`, `architecture`, `build-pipeline`, `common`,
 * `mountain`, `polyfills`, `rest`, `sky`, `wind`). For those the block returns
 * `null` rather than printing a second contents list above the first - a page
 * with two tables of contents is worse than a page with one.
 *
 * A page with fewer than two `##` headings gets no TOC either: one entry is not
 * a contents list, it is a heading that happens to be alone.
 */
import type { DocHeading, DocToc } from "../../Component/Doc/Type.js";

/** The headings a markdown file uses to announce its own contents list. */
const OwnToc = /^(table of contents|contents|on this page|in this page)$/i;

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

	if (!First || Second.length < 2 || OwnToc.test(First.text.trim())) return null;

	return {
		Label,
		Items: Second.map((Heading) => ({
			Label: Heading.text,
			Href: `#${Heading.slug}`,
		})),
	};
};

export default BuildDocToc;
