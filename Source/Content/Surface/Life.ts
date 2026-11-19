/**
 * Life - how far along each app surface is, in the site's one vocabulary.
 *
 * `Component/Surface/State.ts` owns the five words and the sentence that decides
 * between them; `Component/Surface/SurfaceLife.astro` is their one renderer.
 * Neither file can say *which* word a given route is, because that is a fact
 * about this site rather than a rule about the vocabulary - and facts live in
 * `Content/`. This is that table: the app surfaces, the word each one is, and
 * the sentence that decided it.
 *
 * ─── WHY ONE TABLE AND NOT FIVE PROPS ─────────────────────────────────────
 * A page could pass `life="PLANNED"` and be done. Five pages doing that is five
 * places to change when one of them ships, and five chances for two of them to
 * disagree about the same word - which is exactly the failure the vocabulary
 * was introduced to end. The word a surface is, is one fact per surface, so it
 * is stated once here and read by the surface's head and by the status board.
 * The page still chooses its own `lifeNote`; it cannot choose its own word.
 *
 * ─── THE SENTENCE IS THE EVIDENCE, NOT A SECOND GLOSS ─────────────────────
 * `State.ts` says what a word *means* (`PLANNED`: "Named and specified, not
 * built"). `decides` says what this page *does* that makes that the word - the
 * state its rows print, the figure its ledger carries, the thing it does not
 * have. A word without that sentence is a mood; with it, it is auditable.
 *
 * ─── THE SOURCE IS THE BOARD ──────────────────────────────────────────────
 * `SOURCE: /STATUS` is not decoration: `/Status` reads this same table and
 * prints every surface under its word, so a reader who wants to know why the
 * portal says `PLANNED` can open the page that states it beside the four it is
 * compared with. The board derives its rows from here, exactly as it derives
 * its record rows from `Content/Record/*.ts` - nothing is retyped, so nothing
 * can drift.
 *
 * The terms are typed `LifeTerm`, so a sixth word cannot be written here: the
 * table is closed by the type, not by a comment.
 */
import type { LifeTerm } from "../../Component/Surface/State.js";

/** The five routes whose lifecycle this table states. */
export type SurfaceName =
	"PORTAL" | "DOWNLOAD" | "DASHBOARD" | "VERIFY" | "ACCOUNT";

/** One app surface, as the site states it. */
export interface SurfaceLifeRecord {
	/** The surface's name, as the board and the head print it. */
	readonly surface: SurfaceName;

	/** The route the surface is read at, printed `/PORTAL`. */
	readonly route: string;

	/** One of the five words. Typed, so a sixth cannot be written. */
	readonly term: LifeTerm;

	/**
	 * What the page does that makes this the word - one sentence, the evidence
	 * rather than a restatement of the vocabulary's gloss.
	 */
	readonly decides: string;

	/** Where the word is read from: the board that prints this table. */
	readonly source: string;
}

/** The one provenance line every surface passes as its `lifeNote`. */
export const LifeSource = "SOURCE: /STATUS";

/**
 * The app surfaces, in the order the status board reads them: the two that are
 * not built, the one that is open and still moving, then the two that answer.
 *
 * Every word here is decided by the page's own content table, not by this one -
 * the sentence in `decides` names the row, the figure or the absence it was read
 * from.
 */
export const SurfaceLives: Readonly<Record<SurfaceName, SurfaceLifeRecord>> = {
	PORTAL: {
		surface: "PORTAL",

		route: "/PORTAL",

		term: "PLANNED",

		decides:
			"Every tier states `STATUS: PREPARING` and every feature row that is not built ends `planned`: the four modes are named and specified, and none of them can be entered yet.",

		source: LifeSource,
	},

	DOWNLOAD: {
		surface: "DOWNLOAD",

		route: "/DOWNLOAD",

		term: "PLANNED",

		decides:
			"Nothing on it is downloadable: the release states `STATUS: NO PUBLIC ARTIFACTS`, every platform's `VERSION` and `SIZE` print `UNAVAILABLE`, and the edition's artifact figure is `0`.",

		source: LifeSource,
	},

	DASHBOARD: {
		surface: "DASHBOARD",

		route: "/DASHBOARD",

		term: "BETA",

		decides:
			"The surface answers for every reader, but the behaviour under them is still moving: the settings rows print `Coming Soon`, the editor connection is `Not Connected`, and the production telemetry is `Disabled`.",

		source: LifeSource,
	},

	VERIFY: {
		surface: "VERIFY",

		route: "/VERIFY",

		term: "LIVE",

		decides:
			"The card exchanges the link's token in the browser and prints the pending, verifying and verified arms; the audit around it - the scope, the five states, the check - is built.",

		source: LifeSource,
	},

	ACCOUNT: {
		surface: "ACCOUNT",

		route: "/ACCOUNT",

		term: "LIVE",

		decides:
			"The profile island answers from Auth0 and the access ledger beside it is built; the surface states only what it can see, and every route in its rail exists.",

		source: LifeSource,
	},
};

/**
 * The surfaces, in reading order, for a block that prints the whole set.
 *
 * Exported as an array rather than left to `Object.keys`, because the order is
 * the board's and an object's key order is not a design decision.
 */
export const SurfaceNames: readonly SurfaceName[] = [
	"PORTAL",
	"DOWNLOAD",
	"DASHBOARD",
	"VERIFY",
	"ACCOUNT",
];
