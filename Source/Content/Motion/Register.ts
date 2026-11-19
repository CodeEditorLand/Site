/**
 * Register - the site's interaction classes, as data.
 *
 * ─── WHY THIS IS DATA AND NOT PROSE ───────────────────────────────────────
 * The motion layer makes thirteen claims - one per class - and a claim printed in
 * two places drifts. This module is the single statement of each class: what
 * occasion it belongs to, which relationship from `System/_Motion.scss` it
 * composes, what interval and curve it costs, what it explains and the one rule
 * it keeps. `/Motion` renders this table; the specimen sheet reads the same
 * records; a future block that needs to name a motion reads it here rather than
 * writing a fourteenth sentence about it.
 *
 * ─── THE THREE INTERVALS AND THREE CURVES ARE NOT MINE TO CHANGE ──────────
 * `quick 150`, `speak 200`, `settle 320`; `arrive`, `line`, `return`. They are
 * `System/_Motion.scss`'s, derived from Jelly's own engine, and this module
 * restates them only so a page can print them. A class that needed a fourth
 * interval would be a class whose state change has not been named.
 *
 * ─── THE REGISTER IS CLOSED ───────────────────────────────────────────────
 * Thirteen is not a round number; it is what the interface actually does. Adding
 * a class means finding a state change nothing here acknowledges - and the
 * register law's test is one question: name the state change, or do not write the
 * rule.
 */

/** The three intervals, in milliseconds, and what each one is for. */
export const Intervals = [
	{
		key: "QUICK:",

		value: "150 MS",

		note: "Input registration, and refusal. Nothing the reader did with their hand waits longer than this.",
	},

	{
		key: "SPEAK:",

		value: "200 MS",

		note: "An affordance arriving, a disclosure opening, a rule drawn. The interval of something being said.",
	},

	{
		key: "SETTLE:",

		value: "320 MS",

		note: "A change finishing, a state resolving, a page handing over. The longest interval the site has.",
	},
] as const;

/** The three curves, as printed, with the literal each one is. */
export const Curves = [
	{
		key: "ARRIVE:",

		value: "CUBIC-BEZIER(0.16, 0.82, 0.28, 1)",

		note: "Fast start, soft stop. A thing that is arriving must be seen arriving.",
	},

	{
		key: "LINE:",

		value: "CUBIC-BEZIER(0.2, 0.7, 0.2, 1)",

		note: "Nearly linear. A rule drawn at speed reads as a glitch.",
	},

	{
		key: "RETURN:",

		value: "CUBIC-BEZIER(0.4, 0, 0.5, 1)",

		note: "Spread evenly. A thing going back to rest is not in a hurry.",
	},
] as const;

/** One interaction class. */
export interface InteractionClass {
	/** `08` - the class's position in the register, in reading order. */
	readonly index: string;

	/** The class's name, as a block would name it: `FOLD`. */
	readonly name: string;

	/** The occasion: the moment in the interface this class is for. */
	readonly occasion: string;

	/** The relationship it composes, from `System/_Motion.scss`. */
	readonly relationship: string;

	/** The interval, in milliseconds. */
	readonly interval: number;

	/** The interval as printed. */
	readonly intervalText: string;

	/** The curve's name. */
	readonly curve: "ARRIVE" | "LINE" | "RETURN";

	/** The curve's literal, as printed. */
	readonly curveValue: string;

	/** The properties it may move. */
	readonly moves: string;

	/** What it explains, in one sentence. */
	readonly explains: string;

	/** The one rule the class keeps, and the reason it keeps it. */
	readonly keeps: string;

	/** Where it is live: the block or surface that answers the rule. */
	readonly surface: string;
}

const Arrive = "CUBIC-BEZIER(0.16, 0.82, 0.28, 1)";

const Line = "CUBIC-BEZIER(0.2, 0.7, 0.2, 1)";

const Return = "CUBIC-BEZIER(0.4, 0, 0.5, 1)";

/**
 * The thirteen classes, in the order a reader meets them: the five the paper's
 * grammar names (enter, press, trace, settle, resolve), the two that acknowledge a
 * refusal or an inspection, then the six the interaction layer adds.
 */
export const Classes: readonly InteractionClass[] = [
	{
		index: "01",

		name: "ENTER",

		occasion: "A thing can be touched",

		relationship: "ENTER",

		interval: 200,

		intervalText: "200 MS",

		curve: "ARRIVE",

		curveValue: Arrive,

		moves: "TRANSFORM",

		explains: "That this thing can be touched, and which way it leads.",

		keeps: "2px of pull and no more. A row that moved further would be a thing that ran away.",

		surface: "EVERY LINKED RECORD NAME, EVERY LEDGER VALUE THAT LEADS",
	},

	{
		index: "02",

		name: "PRESS",

		occasion: "The input landed",

		relationship: "PRESS",

		interval: 150,

		intervalText: "150 MS",

		curve: "ARRIVE",

		curveValue: Arrive,

		moves: "TRANSFORM",

		explains: "That the input registered, not that it succeeded.",

		keeps: "1px of travel under the pointer. A mono fact has no shape to compress, only a position to register.",

		surface: "THE LEDGER VALUE, THE ACTION, EVERY FORM CONTROL",
	},

	{
		index: "03",

		name: "TRACE",

		occasion: "A row is pointed at",

		relationship: "TRACE",

		interval: 200,

		intervalText: "200 MS",

		curve: "LINE",

		curveValue: Line,

		moves: "TRANSFORM",

		explains: "Which name the rule under it belongs to.",

		keeps: "The line is at full width in both states and only its scale changes, so the row cannot reflow.",

		surface: "THE LEDGER KEY, ON EVERY ROW WHOSE VALUE IS A LINK",
	},

	{
		index: "04",

		name: "SETTLE",

		occasion: "The change finished",

		relationship: "SETTLE",

		interval: 320,

		intervalText: "320 MS",

		curve: "RETURN",

		curveValue: Return,

		moves: "TRANSFORM, OPACITY",

		explains: "That the thing has arrived and is not still going.",

		keeps: "The return is longer than the arrival. A thing going back to rest is not in a hurry.",

		surface: "THE SECOND LEG OF EVERY TWO-LEG MOTION",
	},

	{
		index: "05",

		name: "RESOLVE",

		occasion: "One printed state gives way",

		relationship: "RESOLVE",

		interval: 320,

		intervalText: "320 MS",

		curve: "RETURN",

		curveValue: Return,

		moves: "OPACITY, TRANSFORM, COLOUR",

		explains: "That a word was replaced, not that a second word arrived.",

		keeps: "The only class allowed to move an ink, and only because a resolution that snaps is a flicker.",

		surface: "THE COPY AFFORDANCE, EVERY DISCLOSURE'S OPEN/CLOSE WORD",
	},

	{
		index: "06",

		name: "INTERRUPT",

		occasion: "The action was refused",

		relationship: "INTERRUPT",

		interval: 150,

		intervalText: "150 MS",

		curve: "ARRIVE",

		curveValue: Arrive,

		moves: "TRANSFORM",

		explains: "That the action was refused, and where.",

		keeps: "2px, once, and only after the field loses focus. Never a shake, never a loop, never while the reader is correcting.",

		surface:
			"EVERY CONTROL CARRYING aria-invalid, AND THE CONTACT FORM'S RECEIPT",
	},

	{
		index: "07",

		name: "CROP",

		occasion: "Evidence is inspected",

		relationship: "CROP",

		interval: 320,

		intervalText: "320 MS",

		curve: "RETURN",

		curveValue: Return,

		moves: "TRANSFORM",

		explains: "That you are looking closer, not that the picture changed.",

		keeps: "1.5% of scale inside a frame that does not move, so the page does not move either.",

		surface: "THE PORTAL'S EVIDENCE PLATE",
	},

	{
		index: "08",

		name: "FOLD",

		occasion: "A disclosure opens",

		relationship: "REVEAL",

		interval: 200,

		intervalText: "200 MS",

		curve: "ARRIVE",

		curveValue: Arrive,

		moves: "OPACITY, TRANSFORM",

		explains:
			"That there is more behind this line, and that it was there all along.",

		keeps: "The leaves move; the box does not. A fold that grew would reflow the page under the reader's eye.",

		surface: "MotionFold, ON EVERY BAND THAT KEEPS SOMETHING CLOSED",
	},

	{
		index: "09",

		name: "EXPAND",

		occasion: "A record opens in place",

		relationship: "REVEAL, THEN SETTLE",

		interval: 320,

		intervalText: "320 MS",

		curve: "RETURN",

		curveValue: Return,

		moves: "OPACITY, TRANSFORM",

		explains: "That the record did not move, it got deeper.",

		keeps: "The row's box is identical in both states. Only the facts underneath it arrive, 4px and 20ms apart.",

		surface: "MotionExpand, WHEREVER A SET OF RECORDS CARRIES PROVENANCE",
	},

	{
		index: "10",

		name: "HANDOVER",

		occasion: "A page gives way to another",

		relationship: "RESOLVE",

		interval: 320,

		intervalText: "320 MS",

		curve: "LINE",

		curveValue: Line,

		moves: "OPACITY, TRANSFORM",

		explains: "That you are in the same document, one part along.",

		keeps: "The record's name stays in place and the body steps. Direction is printed from the navigation, not guessed.",

		surface: "EVERY ROUTE, THROUGH THE BROWSER'S OWN VIEW TRANSITION",
	},

	{
		index: "11",

		name: "SORT",

		occasion: "A set re-orders",

		relationship: "SETTLE",

		interval: 320,

		intervalText: "320 MS",

		curve: "RETURN",

		curveValue: Return,

		moves: "TRANSFORM",

		explains: "That the set did not change, only its order.",

		keeps: "Rows travel; the table does not crossfade. A re-sort is a settlement, not an arrival.",

		surface: "EVERY MATRIX THE CONTROL RE-ORDERS",
	},

	{
		index: "12",

		name: "ORIGIN",

		occasion: "A control's surface arrives",

		relationship: "ENTER",

		interval: 200,

		intervalText: "200 MS",

		curve: "ARRIVE",

		curveValue: Arrive,

		moves: "OPACITY, TRANSFORM",

		explains: "Which control this surface came from.",

		keeps: "8px from the side the control already printed. A slip that flew would be a thing arriving, not a thing opening where it was asked for.",

		surface: "EVERY SLIP THE KIT OPENS, AND THE PALETTE'S OWN LEAN",
	},

	{
		index: "13",

		name: "SKELETON",

		occasion: "Data has not arrived",

		relationship: "REVEAL, ON WHAT REPLACES IT",

		interval: 320,

		intervalText: "320 MS",

		curve: "ARRIVE",

		curveValue: Arrive,

		moves: "OPACITY, ON THE BLOCK THAT REPLACES IT",

		explains: "That the shape is known and the values are not.",

		keeps: "It does not move at all. A pulse is a loop and a fade is an entrance; the motion belongs to the record that ends the wait.",

		surface:
			"MotionSkeleton, AND THE .MotionResolve CLASS IT HANDS OVER TO",
	},
] as const;

/** One class, by name. Throws rather than answering `undefined` - a page that
 *  asks for a class the register does not carry has a bug, not a gap. */
export const ClassOf = (Name: string): InteractionClass => {
	const Found = Classes.find((Entry) => Entry.name === Name);

	if (!Found) throw new Error(`No interaction class named ${Name}.`);

	return Found;
};

/** The count a page prints. Derived, so it cannot drift from the register. */
export const ClassCount = Classes.length;
