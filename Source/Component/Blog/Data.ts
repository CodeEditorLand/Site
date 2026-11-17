/**
 * Blog - the derivations the blog surface needs, in one module.
 *
 * Nothing here is copy: the labels arrive from the page's i18n call, and this
 * module never imports the i18n client. What it owns is the ordering, the
 * reading-time label, the contents list and the ledger rows, because those are
 * the page's decisions and a template is the wrong place to make them.
 *
 * The three functions are total: an empty collection yields an empty row list,
 * an article with fewer headings than the floor yields no contents list, and an
 * article with no tags yields a ledger without a tag row. None of them throws on
 * missing data, because a missing field is the schema's job to reject, not this
 * module's.
 */
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
 * exists: seven of eight articles have none, and loading a diagram engine for
 * them would be a page weight nothing on the page needs.
 */
export const HasDiagram = (Body: string | undefined): boolean =>
	Body?.includes("```mermaid") ?? false;
