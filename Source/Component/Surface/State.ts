/**
 * State - the state register of the two functional surfaces.
 *
 * A state is not a fact. `ACTIVE`, `PLANNED` and `NOT CONNECTED` are conditions
 * the reader acts on; `PROTOCOL: HTTPS / TLS 1.3` is a property of the thing.
 * `DesignSystem-Components.md` §7 draws the consequence: ACTIVE and VERIFIED
 * carry a specimen marker beside the word, because a status that renders
 * exactly like an ordinary fact has lost its state.
 *
 * This module is the one table that decides two things per word: whether the
 * word is a state at all, and which of §7's three tones it carries.
 *
 * - `specimen` - live and proven: ACTIVE, VERIFIED. The green rule.
 * - `ink` - true, but not an achievement: FEATURE GATED, OPTIONAL.
 * - `quiet` - absent, or not yet: DISABLED, COMING SOON, NOT CONNECTED, PLANNED.
 *
 * Every word here is a word the pages already print. The table invents none,
 * and a word it does not know is not a state - `Tone` answers `undefined`
 * rather than guessing a tone for a fact that merely looks like a status.
 *
 * The tone type is `StatusTone` from the field-record layer, not a second
 * union: §7's vocabulary is one vocabulary, and a surface that spelled it
 * again would be the third place to change when it grows.
 */
import type { StatusTone } from "../../Content/Record/FieldRecord.js";

/** One state row: the key it is stated under, the word, and §7's tone. */
export interface SurfaceState {
	/** The mono key, e.g. `STATUS`, `TELEMETRY`, `EDITOR`. */
	readonly key: string;

	/** The state word, verbatim - never re-cased by the block that prints it. */
	readonly value: string;

	/** The tone the marker and the word carry. */
	readonly tone: StatusTone;
}

/** §7's tone per state word. Each word is one the pages already print. */
const ToneByWord: Readonly<Record<string, StatusTone>> = {
	ACTIVE: "specimen",
	VERIFIED: "specimen",
	"FEATURE GATED": "ink",
	OPTIONAL: "ink",
	DISABLED: "quiet",
	"COMING SOON": "quiet",
	"NOT CONNECTED": "quiet",
	PLANNED: "quiet",
};

/**
 * The tone of a state word, or `undefined` when the word is not a state.
 * Matching is case-insensitive and whitespace-trimmed, so `Not Connected` and
 * `NOT CONNECTED` are the same state - which they are, on the same page.
 */
export const Tone = (Word: string): StatusTone | undefined =>
	ToneByWord[Word.trim().toUpperCase()];

/** Whether a value is a state rather than a fact. */
export const IsState = (Word: string): boolean => Tone(Word) !== undefined;

/**
 * A set of facts, split into the states §7 asks for a marker on and the facts
 * that stay facts. Order is preserved on both sides, so a page never has to
 * re-sort what its content table wrote in reading order. Generic over the row
 * type, so a `LedgerRow[]` stays a `LedgerRow[]` and no optional field is lost
 * on the way through.
 */
export const Split = <
	Row extends { readonly key: string; readonly value: string },
>(
	Rows: readonly Row[],
): { states: SurfaceState[]; facts: readonly Row[] } => ({
	states: Rows.flatMap((Row) => {
		const RowTone = Tone(Row.value);

		return RowTone === undefined
			? []
			: [{ key: Row.key, value: Row.value, tone: RowTone }];
	}),

	facts: Rows.filter((Row) => !IsState(Row.value)),
});
