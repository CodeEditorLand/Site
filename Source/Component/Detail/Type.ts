/**
 * The Detail layer's data shapes.
 *
 * Three artifacts, three shapes, and each one is a row of something a printed
 * document already had: an index entry, a cross-reference, a folio. None of them
 * derives a fact - the page hands in the strings and the block prints them, which
 * is the record layer's rule and it holds one layer down.
 */

/**
 * One entry in a leader register.
 *
 * `label` is the name, `meta` is the figure at the row's right end (a count, a
 * page, a date), `note` is the one line hung under the name, and `href` makes the
 * name a destination. A row with no `meta` prints the grammar's fallback mark
 * rather than an empty cell - a leader that runs to nothing reads as a defect.
 */
export interface LeaderItem {
	/** The entry's name, printed as given. */
	readonly label: string;

	/** The figure at the row's right end: `26 ROUTES`, `§07`, `2026-11-18`. */
	readonly meta?: string;

	/** The destination. Absent, the name is a `<span>` and not a link. */
	readonly href?: string;

	/** One line under the name - the entry's proposition. */
	readonly note?: string;

	/**
	 * `unavailable` prints the STATUS vocabulary's word in place of the figure:
	 * the register knows the entry and does not know its figure, which is a
	 * different fact from a figure of zero.
	 */
	readonly state?: "unavailable";
}

/**
 * One cross-reference.
 *
 * The route is printed in the grammar's route form (`/PRIVACY`), so a caller
 * passes it already written that way and the block does not re-case it. The
 * reason is required: a reference without one is a related-links widget.
 */
export interface SeeItem {
	/** The route as the grammar prints it: `/PRIVACY`, `/DOC/RUST`. */
	readonly route: string;

	/** Where it goes. */
	readonly href: string;

	/** Why a reader would follow it, in one clause. */
	readonly reason: string;
}

/** A figure with its unit, as a folio or an instrument prints it. */
export interface DetailFigure {
	/** The number, as a string: `26`, `08`, `1.4`. */
	readonly value: string;

	/** What it counts: `CLAUSES`, `ROUTES`, `MB`. */
	readonly unit: string;
}
