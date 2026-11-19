/**
 * The Route surface's contract.
 *
 * A trail is the site's one breadcrumb grammar (`DESIGN.md` §9 Q3): an ordered
 * list of locations, each printed as `/LABEL`, the last one being the page the
 * reader is on. It is a Route Strip artifact (§1.8), not a Contact detail, so
 * the shape lives with the component rather than with any one surface.
 *
 * The label is carried exactly as it prints. The component never re-cases it,
 * never adds a slash and never derives one from the `href`: the leading slash is
 * the only separator in the grammar, so a second one drawn between two crumbs
 * would print the grammar twice.
 */

/** One crumb: a label as it prints, and where it leads. */
export interface TrailItem {
	/** The crumb as written, `/`-prefixed - `/HOME`, `/ACCOUNT`. */
	readonly label: string;

	/** Where the crumb leads. Ignored on the last crumb: that one is the page. */
	readonly href?: string;
}
