/**
 * Type - the shapes the documentation surfaces render.
 *
 * One exported type per concept, and no React: the doc pages compose from
 * these shapes, and a component declares its own props on top of them.
 *
 * Three decisions worth reading twice:
 *
 * - `DocLink` is the one card shape. A page in a section grid, a way in above
 *   it, a worker in the backend panel and a rustdoc tile are all "a label, a
 *   note and somewhere to go", so a second shape would have forced a second
 *   card that renders the same three fields.
 * - `DocSection` is flat. The index the baseline rendered filed every page as
 *   its own card - the seven `Filesystem Footprint` pages are seven cards, not
 *   one card with seven rows - so a section carries a list of cards and no
 *   nested runs. The tree lives in the sidebar, where it is collapsible; the
 *   index is a wall of cards because a reader scans it.
 * - No shape carries a surface. The card's fill belongs to the card component
 *   (`System/Component/Doc/_Index.scss`), so the data can never alternate one
 *   section against the next.
 *
 * The index's closing archive borrows the Record layer's own `Archive` shape
 * rather than declaring a second one: `RecordArchive` is the block that renders
 * it, and a page hands a block the shape the block publishes (`DESIGN.md` §4.2).
 */
import type { Archive } from "../Record/Type.js";

/** One page, crate or destination in a documentation list. */
export interface DocLink {
	/** The collection id for a page; a stable slug for anything else. */
	Id: string;

	/** `navTitle` when the page has one, otherwise its `title`. */
	Label: string;

	/** The page's `description`, printed under the label. */
	Note?: string;

	/** Where the card leads. */
	Href: string;

	/**
	 * The card opens in a new tab. The `↗` arrow and the `target`/`rel` pair
	 * follow from this one flag; an internal destination renders `→` instead.
	 */
	Blank?: boolean;
}

/** One section of the index: a heading, then the cards filed under it. */
export interface DocSection {
	/** Anchor id, slugified from the heading, so `/Doc#elements` keeps working. */
	Id: string;

	/** The section's single `h2`. */
	Heading: string;

	/** The cards, in the collection's `order`. */
	Rows: readonly DocLink[];
}

/**
 * One of the three ways in, above the sections. Its `Label` is the card's
 * `h2`: the baseline gave these three cards a level-two heading of their own
 * because they are not filed under a section.
 */
export type DocFeature = DocLink;

/**
 * How an appendix renders its body. The three appendices are three different
 * artifacts - a badge strip, a bulleted list, a two-column tile grid - and the
 * component switches on this rather than on the heading, so a heading is free
 * to change without changing the body.
 */
export type DocAppendixKind = "architecture" | "backend" | "deployments";

/** One closing artifact of the index, after the sections. */
export interface DocAppendix {
	/** Anchor id, slugified from the heading. */
	Id: string;

	/** The artifact's `h2`. */
	Heading: string;

	/** The sentence that opens the panel. */
	Lede: string;

	/** Which body this appendix renders. */
	Kind: DocAppendixKind;

	/** The artifact's rows, in the order they print. */
	Rows: readonly DocLink[];

	/**
	 * A strip of short links inside the panel: the fifteen elements, and
	 * nothing else. Lower-case `label`/`href` on purpose - this array is handed
	 * straight to the badge list, so no mapping layer sits between the data and
	 * the markup.
	 */
	Index?: readonly { readonly label: string; readonly href: string }[];
}

/** The whole index, as the page receives it: ways in, sections, appendices. */
export interface DocIndexData {
	/** The three cards above the sections, in print order. */
	Features: readonly DocFeature[];

	/** The ten sections, in `SectionOrder`, empty sections dropped. */
	Sections: readonly DocSection[];

	/** The three closing artifacts, in print order. */
	Appendices: readonly DocAppendix[];

	/**
	 * The index's closing archive: one row per section, its size in the marker
	 * column, its anchor as the destination. It is the page's table of contents
	 * in the record grammar - a reader who has scrolled the wall can see the
	 * whole map and how it is distributed in one screen, and each row jumps to
	 * the section it names.
	 */
	Archive: Archive;
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
