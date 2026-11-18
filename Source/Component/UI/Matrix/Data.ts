/**
 * The matrix control's words.
 *
 * Every string the control prints lives here, for the same reason the site's
 * page copy lives in `Content/`: a control whose sentences are scattered through
 * its markup cannot be read as one voice, and this control has more sentences
 * than most because most of it is a state.
 *
 * ─── THE VOICE ─────────────────────────────────────────────────────────────
 *
 * Fragments. A label is a compact field label with its colon (`FACET:`,
 * `MATCH:`, `ROWS:`); a state is the STATUS vocabulary plus the next step; a
 * count is two digits in the grammar's own figure. Nothing here apologises and
 * nothing exclaims - a filter that found nothing says so and offers the way out.
 *
 * ─── U+2001 IS THE SEPARATOR ───────────────────────────────────────────────
 *
 * `NO ROW␁NO VALUE MATCHES` and never a middot. The separator is a constant so
 * no call site retypes it and no editor can quietly replace it.
 */

import type { MatrixDensity } from "./Type";

/** The field-record separator: U+2001, never U+00B7. */
export const Quad = "\u2001";

/** The two rhythms, in the order the switch prints them. */
export const DensityItems: readonly {
	Value: MatrixDensity;
	Label: string;
}[] = [
	{ Value: "comfortable", Label: "COMFORTABLE" },
	{ Value: "compact", Label: "COMPACT" },
];

/** The storage key. One key, one preference, every matrix on the site. */
export const DensityKey = "land:density";

export const MatrixCopy = {
	/** The register line's `/` name. */
	Register: "FILTER",

	FacetLabel: "FACET:",

	/** The value the facet field prints before anything is narrowed. */
	FacetAll: "ALL COLUMNS",

	MatchLabel: "MATCH:",

	MatchPlaceholder: "a value, a label",

	DensityLabel: "ROWS:",

	CopyLabel: "COPY ROWS",

	/** The step control's label, printed with the remaining count. */
	MoreLabel: "SHOW MORE",

	/** The count's unit, printed after the figure: `13 OF 13`. */
	CountOf: "OF",

	/**
	 * The empty state: a matrix with no rows at all. It is not the same fact as
	 * "no match" - one is a table that has nothing in it yet, the other is a
	 * table the reader has narrowed to nothing - and the two say different
	 * things about what to do next.
	 */
	EmptyMark: "NO ROW",

	EmptyLine: "This matrix has no rows yet, so there is nothing to narrow.",

	EmptyNext: "READ THE BAND ABOVE IT FOR WHAT WOULD BE HERE",

	/** The void state: rows exist, the reader's own filter matched none. */
	VoidMark: "NO ROW MATCHES",

	/** The cell the void row prints inside the table itself. */
	VoidCell: "THE FILTER ABOVE MATCHED NOTHING",

	VoidLine: "No row in this matrix carries that value or that label.",

	ClearLabel: "CLEAR THE FILTER",

	/** The handoff: the local filter finding nothing opens the global index. */
	HandoffLabel: "FIND ALL RECORDS",

	/**
	 * The partial state: a row whose facet cell is empty. The matrix prints an
	 * empty cell; the facet names it rather than dropping it, because a value
	 * the table does not have is a fact and not an absence to hide.
	 */
	Unavailable: "UNAVAILABLE",

	/** The denied state: the preference cannot be remembered past this visit. */
	StorageMark: "NOT REMEMBERED",

	StorageLine:
		"This browser refuses local storage, so the density holds for this visit only.",

	/** The foot: the one keyboard fact this control has. */
	FootHint: "ESC CLOSES THE LIST",
} as const;

/** The count as the grammar prints a figure: two digits, zero-padded. */
export const Pad = (Value: number) => String(Value).padStart(2, "0");
