/**
 * Edge copy - the words the two page edges print when the world is unkind.
 *
 * The leaf and the turn are the frame's, so their happy path is data
 * (`Edge/Register.ts`): a route, a part, a date, a source, a proposition. What
 * this module holds is everything that is NOT data - the sentence a leaf prints
 * when the page it is above is not a sheet at all, the age a stale sheet declares,
 * the door an unfiled page is given, and the keys a skeleton keeps while it
 * waits.
 *
 * ─── THE RULE ─────────────────────────────────────────────────────────────
 * Every string says what is true and what to do. None of them apologises, none
 * of them promises, and none of them names a state outside the eight-word
 * vocabulary. An absence is `UNAVAILABLE` or the grammar's `◎`; a zero is never
 * printed for a fact that was not measured.
 *
 * ─── THE BUILD'S DATE IS A FACT, NOT A GUESS ──────────────────────────────
 * `EdgeBuildDate` is the day this HTML was rendered. The site is prerendered, so
 * that is the only honest "as of" a page can carry for facts it does not date
 * itself - and a sheet that carries its own date (`/Compare`) prints that one
 * instead, with its age beside it.
 */
import type { TFunction } from "i18next";

/**
 * The day the build rendered this page, ISO. Module scope, so it is evaluated
 * once per build and every sheet in one build prints the same date.
 */
export const EdgeBuildDate = new Date().toISOString().slice(0, 10);

/**
 * How old a sheet's own date may be before its leaf says so.
 *
 * A quarter. Under it, the age is noise; over it, a reader deciding whether to
 * trust the figures deserves to be told, and the leaf is the only place that can
 * say it before they read a word of the page.
 */
export const EdgeStaleAfterDays = 90;

/** Whole days between two `YYYY-MM-DD` dates, later minus earlier. */
export const EdgeDaysBetween = (Earlier: string, Later: string): number => {
	const From = Date.parse(`${Earlier}T00:00:00Z`);

	const To = Date.parse(`${Later}T00:00:00Z`);

	if (Number.isNaN(From) || Number.isNaN(To)) return 0;

	return Math.max(0, Math.round((To - From) / 86_400_000));
};

/** The two edges' sentences and labels. */
export interface EdgeSurface {
	/** The leaf: the sheet's headnote. */
	readonly leaf: {
		/** The folio's word: `SHEET`. */
		readonly sheet: string;

		/** The extent's preposition: `OF`. */
		readonly of: string;

		/** The facts' keys, with the colon the grammar requires. */
		readonly part: string;

		readonly asOf: string;

		readonly circulation: string;

		readonly source: string;

		/** A page the build publishes and indexes. */
		readonly circulationPublic: string;

		/** A page the build publishes and asks not to be indexed: the denied arm. */
		readonly circulationDenied: string;

		/** The honest absence, for a fact this build cannot state. */
		readonly unavailable: string;

		/** An unfiled page's ordinal slot. */
		readonly unfiled: string;

		/** An unfiled page's part slot. */
		readonly noPart: string;

		/** Where an unfiled page's `SOURCE:` points. */
		readonly requestUrl: string;

		/** The unfiled leaf's `↳` line. */
		readonly unfiledProposition: string;

		/** The stale arm's marker and its age key. */
		readonly stale: string;

		readonly age: string;

		/** What a stale sheet says under its facts. */
		readonly staleNote: string;

		/** What a loading leaf waits on. */
		readonly waitingOn: string;

		/** What a leaf says when the route is printed in full and wraps. */
		readonly tooLongNote: string;

		/** What a leaf says when the document has outgrown two digits. */
		readonly tooMuchNote: string;
	};

	/** The turn: the catchword and the folio. */
	readonly turn: {
		/** `NEXT:` - the key the catchword hangs under. */
		readonly next: string;

		/** The last part's answer: the colophon, not a route. */
		readonly recordEnd: string;

		/** The marker an unfiled page's turn carries instead of an arrow. */
		readonly noNext: string;

		/** The door an unfiled page is given, in the grammar's route form. */
		readonly indexRoute: string;

		/** A destination that is no longer in the build. */
		readonly missing: string;

		/** What a missing destination was. */
		readonly was: string;

		/** The state word a failed progression states. */
		readonly interrupted: string;

		/** The key the retry hangs under. */
		readonly retry: string;

		/** The label on the retry. */
		readonly retryLabel: string;

		/** The folio's part slot on a page that has none. */
		readonly unfiledPart: string;

		/** What a turn says when it has nothing to hand over. */
		readonly emptyNote: string;
	};
}

/** Resolve the edges' copy through the page's translator. */
export const EdgePage = (T: TFunction): EdgeSurface => ({
	leaf: {
		sheet: T("edge.leaf.sheet", { defaultValue: "SHEET" }),
		of: T("edge.leaf.of", { defaultValue: "OF" }),

		part: T("edge.leaf.part", { defaultValue: "PART:" }),
		asOf: T("edge.leaf.asOf", { defaultValue: "AS OF:" }),
		circulation: T("edge.leaf.circulation", {
			defaultValue: "CIRCULATION:",
		}),
		source: T("edge.leaf.source", { defaultValue: "SOURCE:" }),

		circulationPublic: T("edge.leaf.circulationPublic", {
			defaultValue: "PUBLIC",
		}),
		circulationDenied: T("edge.leaf.circulationDenied", {
			defaultValue: "\u25ce NOT INDEXED",
		}),

		unavailable: T("edge.leaf.unavailable", {
			defaultValue: "UNAVAILABLE",
		}),

		unfiled: T("edge.leaf.unfiled", { defaultValue: "\u25ce NOT FILED" }),
		noPart: T("edge.leaf.noPart", { defaultValue: "\u25ce NONE" }),
		requestUrl: T("edge.leaf.requestUrl", { defaultValue: "REQUEST URL" }),

		unfiledProposition: T("edge.leaf.unfiledProposition", {
			defaultValue:
				"THIS ADDRESS IS NOT IN THE COLLATION: NO SHEET, NO PART, AND NO NEXT",
		}),

		stale: T("edge.leaf.stale", { defaultValue: "\u25ce STALE" }),
		age: T("edge.leaf.age", { defaultValue: "AGE:" }),
		staleNote: T("edge.leaf.staleNote", {
			defaultValue:
				"THE FIGURES ON THIS SHEET CARRY THEIR OWN DATE, AND IT IS OLDER THAN THIS BUILD",
		}),

		waitingOn: T("edge.leaf.waitingOn", { defaultValue: "BUILD" }),

		tooLongNote: T("edge.leaf.tooLongNote", {
			defaultValue: "THE ROUTE IS PRINTED IN FULL AND WRAPS",
		}),

		tooMuchNote: T("edge.leaf.tooMuchNote", {
			defaultValue: "THE DOCUMENT HAS OUTGROWN TWO DIGITS",
		}),
	},

	turn: {
		next: T("edge.turn.next", { defaultValue: "NEXT:" }),

		recordEnd: T("edge.turn.recordEnd", {
			defaultValue: "LAND\u2001/\u2001RECORD END",
		}),

		noNext: T("edge.turn.noNext", { defaultValue: "\u25ce NO NEXT SHEET" }),

		indexRoute: T("edge.turn.indexRoute", { defaultValue: "/CONTENTS" }),

		missing: T("edge.turn.missing", { defaultValue: "\u25ce TARGET GONE" }),
		was: T("edge.turn.was", { defaultValue: "WAS:" }),

		interrupted: T("edge.turn.interrupted", {
			defaultValue: "INTERRUPTED",
		}),
		retry: T("edge.turn.retry", { defaultValue: "RETRY:" }),
		retryLabel: T("edge.turn.retryLabel", {
			defaultValue: "THE INDEX AT /CONTENTS",
		}),

		unfiledPart: T("edge.turn.unfiledPart", { defaultValue: "/UNFILED" }),

		emptyNote: T("edge.turn.emptyNote", {
			defaultValue:
				"THIS IS THE LAST SHEET THE DOCUMENT FILES, AND THE COLOPHON CLOSES IT",
		}),
	},
});
