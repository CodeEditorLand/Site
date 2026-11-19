/**
 * RegisterLine - the one shape a register takes, and the one place its line is
 * composed.
 *
 * A register is a counted line: a mark (`#`), a set's name, a separator and the
 * count of the thing the name names.
 *
 *     # WHAT CHANGES / 08
 *     # ON THIS PAGE␁07
 *     # BLOG / 08 ENTRIES
 *
 * ─── WHY THIS MODULE EXISTS ───────────────────────────────────────────────
 * A register used to travel as a bare string. That is the defect the wave kept
 * re-fixing at the call site: a caller could hand in `WHAT CHANGES` and the line
 * arrived without its count, or hand in `# WHAT CHANGES / 99` and the number
 * outlived the eight rows under it. A string can express a register without a
 * count, so no amount of care at the call site makes the grammar safe.
 *
 * `Register` is an object whose `count` is required: a register without a count
 * cannot be written down. The four constructors are the only sanctioned ways to
 * build one, and each answers a different question:
 *
 *     RegisterOf("WHAT CHANGES", Rows)     the count is the rows' own length
 *     RegisterCount("BLOG", 8, { unit: "ENTRIES" })
 *                                          a count the block cannot hold itself
 *     RegisterUnavailable("CHECK")         the count cannot be known, and says so
 *     RegisterWindow("PLATES", 12, 240)    the too-much state: `12 OF 240`
 *
 * ─── THE SENTENCE A FUTURE CARD SHOULD READ ───────────────────────────────
 * **A register is a `Register`, never a string.** If a block prints a register,
 * its prop is this shape; if the block holds the rows the register counts, build
 * it with `RegisterOf(label, rows)` and let the block recompose the count from
 * those rows, so the figure on the line is always the rows' own. `UNAVAILABLE`
 * is the count when it cannot be known - never `0`, never a guess - and a count
 * that is a word (`07`, `UNAVAILABLE`) is printed exactly as given.
 *
 * ─── WHAT IS NOT A REGISTER ───────────────────────────────────────────────
 * A band's kicker is the `/LABEL` voice (`/THE SUBSTITUTION`) and a record's
 * index is a marker (`# LAND_01`): neither counts a set, so neither is this
 * shape. `ShellState`, `QuietHead`, `Lexicon` and `ShellPlate` print markers, and
 * the mark is theirs to print. The counted line is the register, and this module
 * is its only constructor.
 */
import type { RegisterState } from "./Type.js";

/**
 * How the label and the count are separated.
 *
 * `slash` is the register's own separator (`# WHAT CHANGES / 08`) and the
 * default. `quad` is U+2001, the site's one separator, and it is the form the
 * rail and the specimen registers print (`# ON THIS PAGE␁07`) - the count is a
 * column there, not a route. Neither is ever a middot or a hyphen.
 */
export type RegisterSeparator = "slash" | "quad";

/**
 * A register line: the set's name and the count of what it names.
 *
 * `count` is required, and that is the whole point of the shape: there is no
 * way to express a register here without the figure that makes it a register.
 */
export interface Register {
	/**
	 * The set's name, without the mark and without the count: `WHAT CHANGES`,
	 * `ON THIS PAGE`, `BLOG`. Printed verbatim - the block never re-cases it and
	 * never invents a mark or a slash.
	 */
	readonly label: string;

	/**
	 * The count, printed after the separator: `07`, `26`, `UNAVAILABLE`. A string
	 * rather than a number because the site prints a word where a figure cannot
	 * be known, and because a caller may already hold the figure as text.
	 */
	readonly count: string;

	/**
	 * The noun the count is of, when the set has one: `ENTRIES`, `PARTS`,
	 * `STEPS`. Printed after the count at the same weight (`# BLOG / 08
	 * ENTRIES`). Absent, the count stands alone - never an empty space.
	 */
	readonly unit?: string;

	/** `slash` (the default) or U+2001. See `RegisterSeparator`. */
	readonly separator?: RegisterSeparator;
}

/** The options a constructor may set besides the label and the count. */
export interface RegisterOptions {
	readonly unit?: string;

	readonly separator?: RegisterSeparator;
}

/**
 * Zero-pad a count the way the site pads: `7` -> `07`, `26` -> `26`, `120` ->
 * `120`. Two digits is the register's floor, not its ceiling - a set of a
 * hundred is printed honestly rather than truncated to its last two digits.
 */
export const Padded = (Count: number): string => String(Count).padStart(2, "0");

/**
 * The register of a set the block holds: the count is `rows.length`, so the line
 * and the rows under it cannot disagree. This is the constructor a page uses for
 * a ledger, a leader, an archive - any register whose rows the block prints.
 */
export const RegisterOf = (
	label: string,

	rows: readonly unknown[],

	options: RegisterOptions = {},
): Register => ({
	label: label.trim(),
	count: Padded(rows.length),
	...options,
});

/**
 * The register of a set whose count the block does not hold: a figure read from
 * a generated fact file, a total the page already measured, a count that is a
 * word. A number is zero-padded; a string is printed exactly as given, so
 * `UNAVAILABLE` stays `UNAVAILABLE`.
 */
export const RegisterCount = (
	label: string,

	count: string | number,

	options: RegisterOptions = {},
): Register => ({
	label: label.trim(),
	count: typeof count === "number" ? Padded(count) : count.trim(),
	...options,
});

/**
 * The register of a set whose count cannot be known. The word is the STATUS
 * vocabulary's own, and it is never `0`: a zero claims the set is empty, and an
 * unknown set is not an empty one.
 */
export const RegisterUnavailable = (
	label: string,

	options: RegisterOptions = {},
): Register => ({
	label: label.trim(),
	count: "UNAVAILABLE",
	...options,
});

/**
 * The register of a set that is too large to print: the count is the window and
 * the set it was cut from - `12 OF 240`.
 *
 * This is the too-much state as a line rather than as a note, and it exists
 * because the alternative was a second vocabulary: `RecordPlateSet` printed
 * `SHOWING: 12 OF 240` in its own foot while every other block printed a
 * register, so the one state that most needs its figure (a set longer than the
 * page) was the one state whose figure did not travel in the register's shape.
 * A window is still a count - it is the count of what the reader is holding plus
 * the count of what exists - and it is stated in the register's own grammar.
 *
 * `total` is a string for the same reason `Register.count` is: a figure the
 * block does not hold may arrive as text, and a total that cannot be known is
 * `UNAVAILABLE` rather than a guess. Neither part is padded, because `12 OF
 * 240` is a proportion and zero-padding the first half of a proportion invents
 * a leading figure.
 */
export const RegisterWindow = (
	label: string,

	showing: number,

	total: string | number,

	options: RegisterOptions = {},
): Register => ({
	label: label.trim(),
	count: `${showing} OF ${typeof total === "number" ? String(total) : total.trim()}`,
	...options,
});

/** The separator's printed form, spaces included. */
export const RegisterSeparatorText = (register: Register): string =>
	register.separator === "quad" ? "\u2001" : " / ";

/**
 * The count a register prints in a given state. A loading register prints
 * `LOADING` where the figure will be - the vocabulary's word, never a spinner
 * and never a zero - and every other state prints the count it was built with.
 */
export const RegisterCountText = (
	register: Register,

	state: RegisterState = "rest",
): string => (state === "loading" ? "LOADING" : register.count);

/**
 * The whole line as one string: mark, label, separator, count, unit. For a place
 * that prints text rather than markup - a document title, an `aria-label`, a
 * generated page. Markup goes through `Register.astro`, which prints the same
 * four parts as separate spans so the line can be read character by character.
 */
export const RegisterText = (
	register: Register,

	state: RegisterState = "rest",
): string =>
	`# ${register.label}${RegisterSeparatorText(register)}${RegisterCountText(register, state)}${
		register.unit === undefined ? "" : ` ${register.unit}`
	}`;

/**
 * The whole line as it is SPOKEN: the same statement, punctuated for the ear.
 *
 * The printed line is `# WHAT CHANGES / 08`, and both the `#` and the `/` are
 * punctuation - the mark says "this is an index entry" and the separator says
 * "the figure follows". A screen reader does not read punctuation as structure;
 * it reads the characters, so handing it `RegisterText` produces "number sign
 * what changes slash zero eight", which is neither the printed line nor a
 * sentence. The spoken form states the same two facts in the order a person
 * would say them - the name, then the figure - with a comma where the eye gets
 * a mark and a slash.
 *
 * It is the announcement `Register.astro` prints into its visually hidden run,
 * and it is here rather than in the renderer because composing the line is this
 * module's whole job: two renderers that each spelled the line out could
 * disagree, and one of them would be the one a reader who cannot see the page
 * gets.
 */
export const RegisterSpokenText = (
	register: Register,

	state: RegisterState = "rest",
): string =>
	`${register.label}, ${RegisterCountText(register, state)}${
		register.unit === undefined ? "" : ` ${register.unit}`
	}`;
