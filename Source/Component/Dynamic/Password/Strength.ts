/**
 * Password strength, as data.
 *
 * Two auth surfaces draw the same three-segment meter under a password field
 * (sign-up and reset-password), and both used to carry their own copy of the
 * thresholds and their own literal colours. The thresholds live here once, so
 * the two meters cannot disagree about what "strong" means, and the colours
 * live in `System/Component/Auth/_Shell.scss` as the tone modifier classes
 * (`--weak`, `--medium`, `--strong`) instead of a hex string in a `style`
 * attribute.
 */

/** What a typed password currently is. */
export type StrengthTone = "none" | "weak" | "medium" | "strong";

/** How many of the three segments a tone fills. */
export const StrengthFill: Readonly<Record<StrengthTone, number>> = {
	none: 0,

	weak: 1,

	medium: 2,

	strong: 3,
};

/** The three segments, in order. */
export const StrengthSegments = [0, 1, 2] as const;

/**
 * The one place the thresholds are written.
 *
 * Unchanged from the two components this module replaces: twelve characters
 * with at least one non-alphanumeric character is strong, eight is medium,
 * six is weak, and anything shorter is no level at all.
 */
export const StrengthOf = (Password: string): StrengthTone =>
	Password.length >= 12 && /[^a-zA-Z0-9]/.test(Password)
		? "strong"
		: Password.length >= 8
			? "medium"
			: Password.length >= 6
				? "weak"
				: "none";
