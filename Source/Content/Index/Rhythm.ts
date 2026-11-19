/**
 * Rhythm - the document's own vertical system, printed.
 *
 * `/Contents` states the four intervals, the law a new band follows and the
 * sequence of every page that declares one. None of the three is restated here:
 *
 * - the four values are the ladder's, and the arithmetic in each note is the
 *   payment law written out (`Layout/_Interval.scss`);
 * - every page's sequence is READ from the bands that page declares
 *   (`Band.interval`), in the order the page prints them, so a page that
 *   re-rhythms itself re-rhythms this register in the same commit. Only the
 *   ORDER is stated here, because order is a fact about a page and the bands do
 *   not carry their own position.
 *
 * A band with no declared rung prints `◎` in its page's sequence rather than a
 * guessed word: the register's job is to make an undeclared band visible, not to
 * fill it in. The block's own default is `beat` - the register prints what the
 * page SAID, and the stylesheet prints what a silent band gets.
 */
import type { Interval, LedgerRow } from "../../Component/Record/Type.js";

import { Sequence as HomeSequence } from "../Home/Band.js";

import { Bands as CompareBands } from "../More/Compare.js";

import { Bands as GlossaryBands } from "../More/Glossary.js";

import { Bands as StatusBands } from "../More/Status.js";

import { Bands as MotionBands } from "../Motion/Page.js";

import { Bands as SpecimenBands } from "../Specimen/Page.js";

import { Bands as IndexBands } from "./Page.js";

/**
 * The lab switch. One row below names `/SPECIMEN`, and a production build does
 * not contain that page (`Function/Configuration/Lab.mjs`), so the register asks
 * the build before it describes the page's setting.
 */
import { Served } from "../../Function/Configuration/Lab.mjs";

/** The field-record separator: U+2001, never U+00B7. */
const Quad = "\u2001";

/** One band's rung, as the register prints it: upper case, or the absence mark. */
const Rung = (Interval: Interval | undefined): string =>
	Interval === undefined ? "◎" : Interval.toUpperCase();

/**
 * A page's sequence, read from its bands.
 *
 * `Order` is the page's reading order; `Bands` is the module that declares them.
 * A key the module no longer carries prints `◎` rather than dropping the band -
 * a sequence with a hole in it is the honest picture of a page whose data and
 * whose composition have parted company.
 */
const SequenceOf = (
	Bands: Readonly<Record<string, { readonly interval?: Interval }>>,

	Order: readonly string[],
): string => Order.map((Key) => Rung(Bands[Key]?.interval)).join(Quad);

/**
 * The same reading for a page whose sequence is declared as a rung map rather
 * than as a set of bands: the homepage states its intervals by band id in
 * `Content/Home/Band.ts`, because its five bands are five components and the
 * sequence is the one thing they share.
 */
const RungsOf = (
	Rungs: Readonly<Record<string, Interval>>,

	Order: readonly string[],
): string => Order.map((Key) => Rung(Rungs[Key])).join(Quad);

/** A page's sequence as one register row. */
const Page = (
	Route: string,

	Sequence: string,

	Count: number,

	Note: string,
): LedgerRow => ({
	key: `${Route}:`,
	value: Sequence,
	note: `${Count} BANDS${Quad}${Note}`,
});

/** The four intervals: value, register, and the split the band pays. */
export const IntervalRows: readonly LedgerRow[] = [
	{
		key: "REST:",

		value: "56PX",

		note: `TIGHT${Quad}the band continues the subject above it${Quad}24 ABOVE, 32 BELOW`,
	},

	{
		key: "BEAT:",

		value: "80PX",

		note: `TIGHT${Quad}a sibling subject, and what a band that declares nothing gets${Quad}48 ABOVE, 32 BELOW`,
	},

	{
		key: "BREAK:",

		value: "112PX",

		note: `WIDE${Quad}a new movement, and no rule${Quad}80 ABOVE, 32 BELOW`,
	},

	{
		key: "TURN:",

		value: "168PX",

		note: `WIDE${Quad}a chapter, and the block prints its boundary rule${Quad}136 ABOVE, 32 BELOW`,
	},
];

/**
 * The law a new band follows.
 *
 * Five rows, because a rhythm is five rules and not one: what a band declares,
 * what it may not repeat, what a chapter adds, how a page opens and closes, and
 * what happens when the band is inside an artifact instead of on a page.
 */
export const IntervalLaw: readonly LedgerRow[] = [
	{
		key: "A BAND DECLARES ITS INTERVAL:",

		value: "IN ITS DATA, ONCE",

		note: "`Band.interval`, printed as `data-interval` by the block. A band that declares nothing is a beat - the interval is an enhancement, never a requirement.",
	},

	{
		key: "TWO ADJACENT BANDS:",

		value: "NEVER THE SAME RUNG",

		note: "They may share a register - wide, wide, tight, tight, wide is a shape - but the second rung inside a register is what keeps two wide bands at two volumes. The layer steps a repeat up the ladder, so a page that repeats itself accelerates into a break.",
	},

	{
		key: "A CHAPTER IS A TURN:",

		value: "THE BLOCK PRINTS THE RULE",

		note: "`turn` adds `record-band--chapter`, so the boundary rule cannot appear on a band that is not a chapter, or be forgotten by one that is.",
	},

	{
		key: "THE PAGE'S FIRST AND LAST BAND:",

		value: "NO RULE, THEN A SETTLING",

		note: "The header already ends the page, so the first band paints no boundary; the last closes at the rest interval, because a page decelerates rather than stopping.",
	},

	{
		key: "INSIDE AN ARTIFACT:",

		value: "THE TIGHT REGISTER ONLY",

		note: "A part of a subject is never a chapter of it: a legal document's clauses alternate rest and beat at the atomic steps, 16 and 32.",
	},
];

/**
 * The nine adverse arms, as the rhythm meets them.
 *
 * A sequence is a design, so it has a second design: what a page does when the
 * world is unkind. Seven of the nine do not touch the rhythm at all, and saying
 * so is the point - a rhythm that reacted to a failure, a stale figure or a
 * denial would be emphasising the wrong thing on the page. Two do: a page with
 * one band has no sequence to speak of, and a page with thirty is a composition
 * the guard accelerates rather than one this layer can rescue.
 *
 * Where an arm has no live mount on this document it is said here rather than
 * implied: the site is prerendered, so no band receives its facts after paint
 * and the loading arm is composed in the blocks without a page that shows it.
 */
export const IntervalArms: readonly LedgerRow[] = [
	{
		key: "EMPTY:",

		value: "A PAGE WITH ONE BAND",

		note: "It is both the first and the last, so it paints no boundary and closes at the rest interval. A page with one subject is not a chapter of itself.",
	},

	{
		key: "LOADING:",

		value: "THE SAME BODY SLOT",

		note: "A skeleton sits where the facts will sit, at the same interval, so the seam does not move when they arrive. No spinner: the block draws the schema.",
	},

	{
		key: "PARTIAL:",

		value: "NO HOLE",

		note: "A band with no standfirst or no index strip leaves no gap, because every part of the head carries its own distance rather than the head carrying one gap for all of them.",
	},

	{
		key: "ERROR:",

		value: "SPACED LIKE ANY BODY",

		note: "A failed action is a `RecordFailure` in the body and the band does not react to it. A rhythm that changed for a failure would be emphasising the failure.",
	},

	{
		key: "STALE:",

		value: "UNCHANGED",

		note: "An as-of is a fact inside the block. The band is the same distance from its neighbour whether the figure under it is an hour old or a year.",
	},

	{
		key: "TOO MUCH:",

		value: "THE GUARD STEPS THE REPEAT UP",

		note: "Two identical rungs in a row and the second becomes the next rung; a third becomes the one after. A run of four is a miscomposition and this register prints it rather than hiding it.",
	},

	{
		key: "TOO LONG:",

		value: "THE SEAM DOES NOT MOVE",

		note: "The interval is padding on the box, so a heading that wraps four times takes more room inside its band and never changes the distance between two bands.",
	},

	{
		key: "MISSING:",

		value: "NO STRIP, NO GAP",

		note: "A band whose index strip has no cells prints no strip - never an empty one - and its body's distance is unchanged.",
	},

	{
		key: "DENIED:",

		value: "NOT A BAND",

		note: "A surface the reader may not see is a `ShellState` in the shell's own band. The page's sequence does not include a band that is not printed, and the page closes on its own last band.",
	},
];

// ─── THE PAGES' READING ORDERS ────────────────────────────────────────────
// One array per page, in the order the page prints its bands. This is the only
// thing the register states rather than reads: a band carries its rung, not its
// position, and position is a fact about a page.

const HomeOrder = [
	"features",

	"pricing",

	"testimonials",

	"method",

	"download",
] as const;

const IndexOrder = [
	"Chapters",

	"Marks",

	"Intervals",

	"Forms",

	"Plates",

	"Languages",

	"Routes",

	"Register",

	"Declared",

	"Record",
] as const;

const GlossaryOrder = ["Words", "Retired", "Limits"] as const;

const StatusOrder = [
	"Board",

	"Axis",

	"Vocabulary",

	"Figures",

	"Reading",

	"Limits",
] as const;

const CompareOrder = ["Rows", "Carries", "Measure"] as const;

const SpecimenOrder = [
	"Sheet",

	"Plates",

	"Absences",

	"States",

	"Field",

	"Overlay",

	"Display",

	"Record",

	"Narrative",

	"Frame",

	"Reading",

	"Composition",

	"Material",

	"Register",
] as const;

const MotionOrder = [
	"Register",

	"Specimens",

	"Sequences",

	"Fold",

	"Arms",

	"Refusals",

	"Record",
] as const;

/**
 * The document's pages, in the order a reader meets them - before the build
 * decides which of them it serves.
 */
const Sequences: readonly LedgerRow[] = [
	Page(
		"/",

		RungsOf(HomeSequence, HomeOrder),

		HomeOrder.length,

		"THE PAGE THAT TAUGHT THE LADDER",
	),

	Page(
		"/CONTENTS",

		SequenceOf(IndexBands, IndexOrder),

		IndexOrder.length,

		"THE INDEX, INCLUDING THIS BAND",
	),

	Page(
		"/GLOSSARY",

		SequenceOf(GlossaryBands, GlossaryOrder),

		GlossaryOrder.length,

		"THREE RUNS: THE ELEMENTS, THE GRAMMAR, THE RETIRED WORDS",
	),

	Page(
		"/STATUS",

		SequenceOf(StatusBands, StatusOrder),

		StatusOrder.length,

		"THE AUDIT: THE BOARD FIRST, THE LIMITS LAST",
	),

	Page(
		"/COMPARE",

		SequenceOf(CompareBands, CompareOrder),

		CompareOrder.length,

		"THE SUBSTITUTION, WHAT IT CARRIES, WHAT NOBODY MEASURED",
	),

	Page(
		"/SPECIMEN",

		SequenceOf(SpecimenBands, SpecimenOrder),

		SpecimenOrder.length,

		"THE PRINTER'S SPECIMEN, ONE BAND PER KIND OF PART",
	),

	Page(
		"/MOTION",

		SequenceOf(MotionBands, MotionOrder),

		MotionOrder.length,

		"THE REGISTER IS PRINTED FIRST ON THE PAGE, SO IT IS FIRST HERE",
	),

	// The empty arm, composed: a page whose rhythm is real but is not a sequence
	// of bands. Printing nothing for it would read as a page this register forgot,
	// and printing a sequence it does not have would be the register inventing a
	// fact to fill a row.
	{
		key: "/DOWNLOAD:",

		value: "◎ ONE ARTIFACT",

		note: `NO BAND SEQUENCE TO STATE${Quad}its rhythm is inside the release record, where the regions sit at the artifact step`,
	},
];

/**
 * The sequences this build can print.
 *
 * A page's row is kept only if the build serves the page it names: `/SPECIMEN` is
 * a lab surface, served by `dum Run` and absent from production
 * (`Function/Configuration/Lab.mjs`), and a register that described the setting of
 * a page the host does not hold would be inventing a fact to fill a row - which is
 * the one thing this file refuses to do. The row's key is the page's name with the
 * grammar's `:` field mark, so the predicate reads the key without it.
 */
export const SequenceRows: readonly LedgerRow[] = Sequences.filter((Row) =>
	Served(Row.key.replace(/:$/, "")),
);
