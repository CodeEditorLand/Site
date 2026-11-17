/**
 * Type - the shapes the documentation surfaces render.
 *
 * One exported type per concept, and no React: the doc pages compose from
 * these shapes, and a component declares its own props on top of them.
 *
 * Two decisions worth reading twice:
 *
 * - `DocBand` is the *one* shape both the ten section bands and the four
 *   appendix bands use. A section band and an appendix band differ only in
 *   where their rows come from, so a second shape would have forced a second
 *   component that renders the same list.
 * - `Groups` is always an array of runs, never a nested tree. A run is a
 *   consecutive stretch of rows sharing one sub-label (the sidebar's `group`,
 *   flattened), which is what a page can render as a heading followed by its
 *   rows. The tree lives in the sidebar, where it is collapsible; the index is
 *   flat because a reader scans it.
 * - `DocBand` carries no surface. The band's tone belongs to the artifact the
 *   band is a section of (DESIGN.md §5 A5, §9 Q1), so the page decides it once
 *   for the whole index instead of the data alternating per row.
 */

/** One page, crate or destination in a documentation list. */
export interface DocLink {
	/** The collection id for a page; a stable slug for anything else. */
	Id: string;

	/** `navTitle` when the page has one, otherwise its `title`. */
	Label: string;

	/** The page's `description`, printed as the row's note. */
	Note?: string;

	/** Where the row leads. */
	Href: string;

	/**
	 * The row opens in a new tab. The `↗` arrow and the `target`/`rel` pair
	 * follow from this one flag; an internal destination renders `→` instead.
	 */
	Blank?: boolean;
}

/**
 * A consecutive stretch of rows sharing one sub-label. `Label` is `null` for
 * an ungrouped run, and the page then renders no sub-heading at all.
 */
export interface DocGroupRun {
	readonly Label: string | null;

	readonly Rows: readonly DocLink[];
}

/**
 * One documentation band: the section name as the heading, the page count in
 * the kicker, the rows underneath. Shared by the index's sections and by its
 * appendix bands, so the page maps one component over one array.
 */
export interface DocBand {
	/** Anchor id, slugified from the heading, so `/Doc#elements` keeps working. */
	Id: string;

	/** `/ELEMENTS` U+2001 `16 PAGES` - the count is the kicker's job, not the heading's. */
	Kicker: string;

	/** The band's single `h2`. */
	Heading: string;

	/** One sentence under the heading. Absent for the section bands. */
	Standfirst?: string;

	/** The paragraph that opens the body, before the rows. */
	Lede?: string;

	/**
	 * A strip of short links above the body: the fifteen elements, and nothing
	 * else. Lower-case `label`/`href` on purpose - this array is handed straight
	 * to `RecordBand`, whose `Band.index` is that shape, so no mapping layer
	 * sits between the data and the block.
	 */
	Index?: readonly { readonly label: string; readonly href: string }[];

	readonly Groups: readonly DocGroupRun[];
}

/**
 * One field of a documentation page's metadata strip: `STATUS:` `PUBLISHED`,
 * `LAYER:` `ELEMENTS`, `COMPAT:` `UNAVAILABLE`.
 *
 * The label and the value are separate strings, and the shell renders them as
 * separate elements with U+2001 between the fields - the grammar `BlogIndex`
 * already renders, so a reader's assistive tech announces distinct fields
 * instead of one run-on line (`DesignSystem-Pages.md` §5).
 */
export interface DocStripItem {
	/** The field label with its colon, e.g. `STATUS:`, `COMPAT:`. */
	readonly Label: string;

	/** The field's value, e.g. `PUBLISHED`, `ELEMENTS`, `UNAVAILABLE`. */
	readonly Value: string;

	/**
	 * The value's ink. Absent means the surface's ink; `quiet` is a state that
	 * must not read as a positive claim (`UNAVAILABLE` - no false-positive
	 * green, DESIGN.md §1.5), `specimen` the one authenticated state. One tone
	 * per field, and at most one specimen in a strip.
	 */
	readonly Tone?: "quiet" | "specimen";
}

/** One heading, as the markdown pipeline that wrote its id reports it. */
export interface DocHeading {
	/** `1`-`6`: only `2` becomes a table-of-contents entry. */
	depth: number;

	/** The id the heading was given - the same string an anchor must use. */
	slug: string;

	/** The heading's text, markup stripped. */
	text: string;
}

/** One entry of the in-page table of contents. */
export interface DocTocItem {
	/** The heading's own text, as the markdown wrote it. */
	Label: string;

	/** `#slug` - the id the markdown pipeline gave that heading. */
	Href: string;
}

/** The in-page table of contents. Absent when the page needs none. */
export interface DocToc {
	/** The nav's own label, e.g. `On this page`. */
	Label: string;

	readonly Items: readonly DocTocItem[];
}

/**
 * The narrow slice of i18next's `TFunction` the doc builders take. A builder
 * receives `T` as an argument and never imports the i18n client, so the copy
 * stays at the call site and the module stays testable without a server.
 */
export type DocTranslate = (
	Key: string,
	Options: { readonly ns?: string; readonly defaultValue: string },
) => string;
