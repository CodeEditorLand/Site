/**
 * Tone - the STATUS vocabulary's three tones, resolved from the value.
 *
 * `DESIGN-COMPLETE.md` §1.5 fixes the vocabulary and the tones with it: `ink`
 * for READY / LOADING / UNAVAILABLE / INTERRUPTED, `specimen` for ACTIVE /
 * VERIFIED, `quiet` for PREPARING / ARCHIVED - and "green never means positive in
 * general". The tone is what keeps that true: PREPARING and ACTIVE are two
 * different claims and must not wear one ink.
 *
 * The mapping lives here, once, because three card families on this page print a
 * status through it - the feature record, the element record and the platform
 * row - and a tone re-derived in three places is a tone that drifts. An unknown
 * word gets `ink`: a status the vocabulary does not know is not allowed to
 * authenticate itself.
 */

export type Tone = "ink" | "specimen" | "quiet";

/** The values that carry the specimen tone. */
const Specimen: ReadonlySet<string> = new Set(["ACTIVE", "VERIFIED"]);

/** The values that are deliberately quiet. */
const Quiet: ReadonlySet<string> = new Set(["PREPARING", "ARCHIVED"]);

/** Resolve a status value's tone. Case and spacing are the caller's to fix. */
export const ToneOf = (Value: string): Tone => {
	const Word = Value.trim().toUpperCase();

	if (Specimen.has(Word)) return "specimen";

	if (Quiet.has(Word)) return "quiet";

	return "ink";
};
