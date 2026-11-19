/**
 * Blog - the shapes the blog surface renders.
 *
 * Four shapes over two surfaces, and none of them is a content model. The
 * articles themselves stay markdown: their words, headings, tables and code lines
 * are the pipeline's to render, and moving them into data would make every future
 * edit a string edit inside a module. What lives here is only the apparatus
 * around them - the index rows, the in-page contents list and the trail's crumbs.
 *
 * Every array is `readonly`, and so are its elements, because a surface renders
 * the data a page hands it and never sorts, splices or pushes it.
 */

/**
 * One article as the index lists it: what a reader needs to choose without
 * opening anything - what it is called, what it claims, what it is about, who
 * wrote it, when it was published, and how long it takes.
 *
 * `date` is the schema's `publishedAt` verbatim (`YYYY-MM-DD`), not a formatted
 * date: it is printed inside a `<time datetime>` and it sorts lexicographically,
 * so the order the index shows and the order the data carries are the same
 * order. `readTime` is the finished label (`"5 min read"`), derived once in
 * `Data.ts` so no template has to know the unit.
 */
export interface BlogRow {
	/** The article's route, e.g. `/Blog/BuildSystemDesign`. */
	readonly href: string;

	/** `publishedAt` verbatim, `YYYY-MM-DD`. */
	readonly date: string;

	/** The article's `title`, verbatim. */
	readonly title: string;

	/** The article's `summary`, verbatim. */
	readonly summary: string;

	/** The article's `author`, verbatim. */
	readonly author: string;

	/** The finished reading-time label, e.g. `5 min read`. */
	readonly readTime: string;

	/** The article's `tags`, in the order the frontmatter gives them. */
	readonly tags: readonly string[];
}

/**
 * One row of the in-page contents list: a `##` heading's own words, linked by
 * the id the markdown pipeline actually wrote.
 *
 * `href` is `#` + the slug `render()` reported, never a slug re-derived here. A
 * hand-rolled slug function would disagree with the pipeline on the first
 * heading that carries punctuation or a link, and every such anchor would
 * silently land nowhere.
 */
export interface BlogTocItem {
	/** The heading's own words, verbatim - a contents list never paraphrases. */
	readonly label: string;

	/** The in-page target, including the leading `#`. */
	readonly href: string;
}

/** The contents list, or nothing: `BuildToc` returns `null` below the floor. */
export interface BlogToc {
	/** The nav's visible label and its accessible name. */
	readonly label: string;

	/** The article's `##` headings, in document order. */
	readonly items: readonly BlogTocItem[];
}

/**
 * One crumb of the trail above a blog page. The last crumb is the current page:
 * the trail prints it as a statement whatever `href` it carries.
 */
export interface BlogTrailItem {
	/** Printed verbatim; the `/LABEL` voice is the caller's to supply. */
	readonly label: string;

	/** Where the crumb leads. Absent on the current page. */
	readonly href?: string;
}
