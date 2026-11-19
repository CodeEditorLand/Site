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

/**
 * The lifecycle vocabulary - five words, one per surface.
 *
 * `StateTerms` says what a surface is DOING (`LOADING`, `INTERRUPTED`); this
 * table says how far along it is, which is a different question and had no
 * vocabulary at all. Every page answered it in its own adjectives - "Coming
 * Soon" on the portal, "Feature Gated" on the download masthead, "Disabled" in
 * the dashboard, "Beta" in a blog post - and five adjectives for one fact is the
 * same defect as five state marks: a reader cannot compare two pages, and a
 * page cannot be counted.
 *
 * The five are the whole life of a surface, in order:
 *
 *   LIVE          open to every reader, facts current       `specimen`
 *   BETA          open, and the behaviour may still change   `ink`
 *   PLANNED       named and specified, not built             `quiet`
 *   RETIRED       was live, is closed, kept for the record   `quiet`
 *   UNAVAILABLE   the build cannot state which of the four   `ink`
 *
 * The tone is the same three §1.5 tones, because a lifecycle is a state and the
 * site has one state ink. `UNAVAILABLE` appears in both tables on purpose: in
 * `StateTerms` it means the surface is not answering, and here it means the
 * BUILD does not know how far along the surface is - in both cases the honest
 * word is the same one, and never `0`.
 */
export const LifeTerms = [
	"LIVE",

	"BETA",

	"PLANNED",

	"RETIRED",

	"UNAVAILABLE",
] as const;

/** One of the five lifecycle values. */
export type LifeTerm = (typeof LifeTerms)[number];

/** One lifecycle word: the term, its tone, and the sentence that defines it. */
export interface LifeWord {
	/** The word, verbatim - never re-cased by the block that prints it. */
	readonly term: LifeTerm;

	/** The tone the marker and the word carry. */
	readonly tone: StatusTone;

	/** One line saying when this word is the right one. */
	readonly gloss: string;
}

/**
 * The five, with the sentence that decides between them.
 *
 * The glosses are part of the vocabulary, not documentation for it: the block
 * that prints the register prints them under each term, so a page that reaches
 * for "Coming Soon" can read what the word it wants actually means.
 */
export const Life: Readonly<Record<LifeTerm, LifeWord>> = {
	LIVE: {
		term: "LIVE",

		tone: "specimen",

		gloss: "Open to every reader, and every fact on it is current.",
	},

	BETA: {
		term: "BETA",

		tone: "ink",

		gloss: "Open to every reader, and the behaviour may still change under them.",
	},

	PLANNED: {
		term: "PLANNED",

		tone: "quiet",

		gloss: "Named and specified, not built: nothing on it can be used yet.",
	},

	RETIRED: {
		term: "RETIRED",

		tone: "quiet",

		gloss: "Was live, is closed: kept for the record, not for use.",
	},

	UNAVAILABLE: {
		term: "UNAVAILABLE",

		tone: "ink",

		gloss: "The build cannot state how far along the surface is, and does not guess.",
	},
};

/**
 * The lifecycle word a caller's string names, or `undefined` when it names none.
 *
 * Case-insensitive and trimmed, like `Tone`; a word outside the five is not a
 * lifecycle and the block that prints it prints `UNAVAILABLE` rather than
 * inventing a sixth - an adjective is not a vocabulary.
 */
export const LifeOf = (Word: string): LifeWord | undefined =>
	Life[Word.trim().toUpperCase() as LifeTerm];

/** Whether a value is one of the five lifecycle words. */
export const IsLife = (Word: string): boolean => LifeOf(Word) !== undefined;

/**
 * One lifecycle row, composed for a register: `LIFECYCLE: BETA` with the word's
 * tone looked up. A caller cannot tint a lifecycle word of its own choosing, for
 * the same reason `Row()` refuses to tint a state.
 */
export const LifeRow = (Term: string): SurfaceState => {
	const Word = LifeOf(Term);

	return {
		key: "LIFECYCLE",

		value: Word?.term ?? Term.trim().toUpperCase(),

		tone: Word?.tone ?? "ink",
	};
};
