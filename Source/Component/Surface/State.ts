/**
 * State - the state register of every surface that states one.
 *
 * A state is not a fact. `ACTIVE`, `LOADING` and `UNAVAILABLE` are conditions
 * the reader acts on; `PROTOCOL: HTTPS / TLS 1.3` is a property of the thing.
 * `DESIGN-COMPLETE.md` §1.5 draws the consequence: a live state carries a
 * specimen marker beside the word, because a status that renders exactly like
 * an ordinary fact has lost its state.
 *
 * This module is the one table that decides two things per word: whether the
 * word is a state at all, and which of §1.5's three tones it carries. It is
 * deliberately small, because every renderer in the family reads it -
 * `SurfaceState.astro` (the register), `StateBadge` (the React islands' twin),
 * `SurfaceChips.astro` (a chip run), and through them every account, verify,
 * OAuth, portal and dashboard route.
 *
 * The eight values are §1.5's, and only those eight:
 *
 * - `ink` - true, and readable as news: READY, LOADING, UNAVAILABLE,
 *   INTERRUPTED. A failure is not a second red state; it is ink, and its
 *   urgency travels on `role="alert"` in the block that prints it.
 * - `specimen` - live and proven: ACTIVE, VERIFIED. The one green.
 * - `quiet` - absent, or not yet: PREPARING, ARCHIVED.
 *
 * A word outside the eight is not a state - `Tone` answers `undefined` rather
 * than guessing a tone for a fact that merely looks like a status. The words a
 * surface prints as *tints* (`Disabled`, `Feature Gated`, `Coming Soon`) are
 * the badge table's (`Badge.ts`), not this one: a tint is a property of a row,
 * a state is a field of the record.
 *
 * The tone type is `StatusTone` from the field-record layer, not a second
 * union: §1.5's vocabulary is one vocabulary, and a surface that spelled it
 * again would be the third place to change when it grows.
 */
import type { StatusTone } from "../../Content/Record/FieldRecord.js";

/** One state row: the key it is stated under, the word, and §1.5's tone. */
export interface SurfaceState {
	/** The mono key, e.g. `STATUS`, `TELEMETRY`, `EDITOR`. */
	readonly key: string;

	/** The state word, verbatim - never re-cased by the block that prints it. */
	readonly value: string;

	/** The tone the marker and the word carry. */
	readonly tone: StatusTone;
}

/**
 * The eight values, in the order §1.5 lists them.
 *
 * Exported as a value, not only as a type, because a page that needs to state
 * one of the eight (or a test that needs to prove no ninth exists) reads the
 * table rather than a copy of it.
 */
export const StateTerms = [
	"READY",
	"ACTIVE",
	"LOADING",
	"PREPARING",
	"VERIFIED",
	"UNAVAILABLE",
	"INTERRUPTED",
	"ARCHIVED",
] as const;

/** One of the eight state values. */
export type StateTerm = (typeof StateTerms)[number];

/** §1.5's tone per state word. The table is total over the eight, and closed. */
const ToneByWord: Readonly<Record<string, StatusTone>> = {
	READY: "ink",
	ACTIVE: "specimen",
	LOADING: "ink",
	PREPARING: "quiet",
	VERIFIED: "specimen",
	UNAVAILABLE: "ink",
	INTERRUPTED: "ink",
	ARCHIVED: "quiet",
};

/**
 * The word inside a label, or the label itself when it states no key.
 *
 * A label prints in the site's grammar as `KEY: WORD` (`STATUS: LOADING`,
 * `RECORD: EMPTY`). The tone belongs to the word, never to the key - so the one
 * split lives here and every renderer reads it, rather than each renderer
 * deciding for itself where a label stops being a key.
 */
export const Word = (Label: string): string => {
	const Colon = Label.indexOf(":");

	return (Colon === -1 ? Label : Label.slice(Colon + 1)).trim();
};

/**
 * The tone of a state word, or `undefined` when the word is not a state.
 * Matching is case-insensitive and whitespace-trimmed, so `Not Connected` and
 * `NOT CONNECTED` are the same word - and `STATUS: LOADING` is `LOADING`.
 */
export const Tone = (Label: string): StatusTone | undefined =>
	ToneByWord[Word(Label).toUpperCase()];

/** Whether a value is a state rather than a fact. */
export const IsState = (Label: string): boolean => Tone(Label) !== undefined;

/**
 * One row, composed from a key and a term, with the term's tone looked up - so
 * a page that states `STATUS: LOADING` cannot state it in a tone of its own
 * choosing. A term outside the eight prints in `ink` and is not a state: the
 * caller's word is never re-cased or re-worded, only tinted.
 *
 * `Term` may be the word alone (`LOADING`) or the whole label a locale file
 * carries (`STATUS: LOADING`); the key prefix is stripped, because the key is
 * the first argument and a row that printed it twice would read
 * `STATUS: STATUS: LOADING`.
 */
export const Row = (Key: string, Term: string): SurfaceState => ({
	key: Key,
	value: Word(Term),
	tone: Tone(Term) ?? "ink",
});

/**
 * One `KEY: value` declaration beside a surface's status word.
 *
 * A state says *what* the surface is doing; a declaration says *where the claim
 * comes from* - the route it is read at, the source that produced it, the date
 * the page was built. The instrument head prints the two in one row, so a
 * status is always auditable without a second block. `key` is printed with its
 * colon by the renderer, the same rule the register follows.
 */
export interface Declaration {
	/** `ROUTE`, `SOURCE`, `BUILT`, `ENV`. */
	readonly key: string;

	/** The value, verbatim. */
	readonly value: string;
}

/**
 * A set of facts, split into the states §1.5 asks for a marker on and the facts
 * that stay facts. Order is preserved on both sides, so a page never has to
 * re-sort what its content table wrote in reading order. Generic over the row
 * type, so a `LedgerRow[]` stays a `LedgerRow[]` and no optional field is lost
 * on the way through.
 */
export const Split = <
	Entry extends { readonly key: string; readonly value: string },
>(
	Rows: readonly Entry[],
): { states: SurfaceState[]; facts: readonly Entry[] } => ({
	states: Rows.flatMap((Row) => {
		const RowTone = Tone(Row.value);

		return RowTone === undefined
			? []
			: [{ key: Row.key, value: Row.value, tone: RowTone }];
	}),

	facts: Rows.filter((Row) => !IsState(Row.value)),
});
