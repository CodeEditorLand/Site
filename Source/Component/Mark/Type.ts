/**
 * Type - the mark set's vocabulary, as values.
 *
 * Eight marks, one form each. This module is the list, so a block that prints a
 * mark picks a kind from here rather than inventing a span; `Mark.astro` is the
 * only renderer, and `Stylesheet/System/Mark` is the only place a form is drawn.
 *
 * ─── WHY THE LADDER IS EXPORTED ───────────────────────────────────────────
 * A block sometimes needs the mark's SIZE as a number - a box that has to be
 * reserved, a figure in a contract column, a specimen sheet printing the steps
 * side by side. It reads `MarkStep`, which is the same ladder the stylesheet
 * declares (`Mark/_Token.scss`), so the two cannot disagree about what the
 * fourth step is.
 */

/** The eight marks. One form each. */
export type MarkKind =
	/** The state square: filled = known, hollow = not. */
	| "square"
	/** A station on a rail: the same square, seen from the side. */
	| "tick"
	/** `→` - the destination at the end of a line. */
	| "arrow"
	/** `›` - the disclosure that is shut, and the only mark that turns. */
	| "fold"
	/** A 6px x 1px rule: one item of a list. */
	| "bullet"
	/** A device inside a badge, in the element's own ink. */
	| "glyph"
	/** `◎` - the grammar's fallback: the thing is not here. */
	| "fallback";

/** The ladder. Nothing in the mark set is a size that is not one of these. */
export type MarkSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

/** The ladder as px, in order. The stylesheet's `--mark-size-N` is this list. */
export const MarkStep: Readonly<Record<MarkSize, number>> = {
	"1": 2,

	"2": 4,

	"3": 6,

	"4": 14,

	"5": 20,

	"6": 24,

	"7": 32,

	"8": 48,
};

/**
 * A square's fill. `known` is the vocabulary's normal arm; `unknown` is the
 * adverse one and it is the SAME square with a rule and no fill, so an unknown
 * fact can never be read as a zero.
 */
export type MarkFill = "known" | "unknown" | "loading" | "stale";

/** A square's tone: the ink of the word it precedes. Never chosen by a page. */
export type MarkTone = "ink" | "specimen" | "quiet" | "unknown";

/** A seal's three sizes, named by role rather than by px. */
export type SealSize = "s" | "m" | "l";

/** The class each kind prints. One renderer, one class per form. */
export const MarkClass: Readonly<Record<MarkKind, string>> = {
	square: "MarkSquare",

	tick: "MarkTick",

	arrow: "MarkArrow",

	fold: "MarkFold",

	bullet: "MarkBullet",

	glyph: "MarkGlyph",

	fallback: "MarkFallback",
};

/** What a square's `data-mark-size` says for each named size. */
export const SquareSize: Readonly<Record<string, string>> = {
	rest: "rest",

	attested: "attested",

	badge: "badge",
};

/** The seal's `data-mark-size` values, in the ladder's order. */
export const SealSizes: readonly SealSize[] = ["s", "m", "l"];
