/**
 * Tone - the STATUS vocabulary's three tones, resolved from the value.
 *
 * `DESIGN-COMPLETE.md` §1.5 fixes the vocabulary and the tones with it: `ink`
 * for READY / LOADING / UNAVAILABLE / INTERRUPTED, `specimen` for ACTIVE /
 * VERIFIED, `quiet` for PREPARING / ARCHIVED - and "green never means positive in
 * general". The homepage's cards printed every status value at the accent, which
 * is how `STATUS: PREPARING` came to wear the same green as `STATUS: ACTIVE`:
 * two different claims, one ink, and the ink stopped meaning anything.
 *
 * The mapping lives here, once, because four card families print a status on
 * this page and a tone re-derived in four places is a tone that drifts. An
 * unknown word gets `ink`: a status the vocabulary does not know is not allowed
 * to authenticate itself.
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
