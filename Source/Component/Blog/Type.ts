/**
 * Blog - the shapes the blog surface renders.
 *
 * Two surfaces, two shapes, and neither is a content model. The articles
 * themselves stay markdown: their words, headings, tables and code lines are
 * the pipeline's to render, and moving them into data would make every future
 * edit a string edit inside a module. What lives here is only the apparatus
 * around them - the index rows and the in-page contents list.
 *
 * Every array is `readonly`, and so are its elements, because a surface renders
 * the data a page hands it and never sorts, splices or pushes it.
 */

/**
 * One article as the index lists it: the five things a reader needs to choose
 * without opening anything - when it was published, what it is called, what it
 * claims, how long it takes, and what it is about.
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

	/**
	 * The row's position in the archive, `01`-prefixed: `01`, `02`, ... `08`.
	 *
	 * The archive index is a filed list (`DesignSystem-Artifacts.md` §2 prints
	 * `01  MOUNTAIN  FOUNDATION / ACTIVE`), so the position is part of the row
	 * rather than a CSS counter: a number a screen reader cannot read is not a
	 * fact, and the order the index claims in its strip must be checkable
	 * against the numbers under it. Derived from the sorted list in `Data.ts`,
	 * never from the frontmatter.
	 */
	readonly ordinal: string;

	/** `publishedAt` verbatim, `YYYY-MM-DD`. */
	readonly date: string;

	/** The article's `title`, verbatim. */
	readonly title: string;

	/** The article's `summary`, verbatim. */
	readonly summary: string;

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
 * One crumb of the trail above a blog page. The last crumb is the current page
 * and carries no `href`.
 */
export interface BlogTrailItem {
	/** Printed verbatim; the `/LABEL` voice is the caller's to supply. */
	readonly label: string;

	/** Where the crumb leads. Absent on the current page. */
	readonly href?: string;
}

/**
 * One field of the archive's metadata strip: `LABEL:` and its value, printed
 * as one fragment and separated from the next field by U+2001 EM QUAD.
 *
 * The pair is data rather than a finished string because the state field
 * carries a tone: `STATUS: ACTIVE` is specimen green on its value while the
 * label stays ink (`DesignSystem-Grammar.md` §2 - "explicit words carry the
 * meaning and colour supports it"), and a single pre-joined string could not
 * colour half of itself.
 */
export interface BlogStripItem {
	/** The field label, with its colon, e.g. `STATUS:`, `RECORDS:`. */
	readonly label: string;

	/** The field's value, e.g. `ACTIVE`, `8`, `NEWEST FIRST`. */
	readonly value: string;

	/**
	 * Render the value in the specimen ink. Only a state field sets it, and at
	 * most one field per strip does - green authenticates, it does not decorate.
	 */
	readonly specimen?: boolean;
}
