/**
 * The matrix control's shapes.
 *
 * ─── WHAT A FACET IS ───────────────────────────────────────────────────────
 *
 * A facet is one column of a matrix, named the way its header names it. The
 * control does not invent a taxonomy: the columns the block already prints are
 * the only axes a reader can narrow by, because a filter that offered a
 * grouping the table does not have would be a second, invisible table.
 *
 * `Key` is the column's index as a string, and it is what the island reads out
 * of the DOM - a column has no id in a printed table, and inventing one would
 * mean touching every matrix on the site to serve one control.
 *
 * ─── WHY DENSITY IS TWO VALUES AND NOT THREE ───────────────────────────────
 *
 * `compact` and `comfortable` are the two rhythms the Record layer already
 * names: `rest` (the reading rhythm) and `dense` (halved row padding, same
 * type, same rules). A third step would be a size, and size is not a density -
 * the identity has one type ladder and the reader does not get to change it.
 */

export interface MatrixFacet {
	/** The column's index, as a string: `"0"`, `"1"`, `"2"`. */
	Key: string;

	/** The column's header label, as the matrix prints it. */
	Label: string;
}

export type MatrixDensity = "compact" | "comfortable";

/** One row of the matrix, read out of the printed table on mount. */
export interface MatrixRow {
	/** The `<tr>`, so the control can hide it without re-rendering the table. */
	Element: HTMLTableRowElement;

	/** The row's label cell - the `th[scope=row]` in the first column. */
	Label: string;

	/** One value per column, in the matrix's own order. */
	Cells: string[];
}

/** What the control's note line is currently saying, if anything. */
export type MatrixNoteKind = "none" | "empty" | "void" | "more" | "storage";

export interface MatrixNote {
	Kind: MatrixNoteKind;

	/** The line's own sentence. Empty when there is nothing to say. */
	Line: string;
}
