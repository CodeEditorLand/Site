/**
 * Page - the motion register's copy: bands, facts, sequences, arms, refusals.
 *
 * ─── WHY THE COPY IS A MODULE ─────────────────────────────────────────────
 * The site's rule since the index: a page decides order, a data module decides
 * words. `/Motion` prints thirteen classes from `Register.ts` and nine adverse
 * arms, six specimen notes, six sequences and eight refusals from here - none of
 * it typed into the template, so a sentence that changes changes in one place.
 *
 * ─── THE VOICE ────────────────────────────────────────────────────────────
 * Fragments, `KEY:` labels, `↳` for a proposition about the line above it, and no
 * adjective doing the work of a fact. Every claim about a duration names the
 * class it belongs to; every claim about a state names the word from the
 * vocabulary. The one thing this page never does is describe a motion as
 * "smooth", "delightful" or "subtle" - those are feelings, and the register
 * prints figures.
 */
import type { Band, LedgerRow } from "../../Component/Record/Type.js";

/** U+2001 - the site's only separator. */
const Quad = "\u2001";

/** The head's facts: what this page is, in five rows. */
export const Facts: readonly LedgerRow[] = [
	{
		key: "CLASSES:",

		value: "13",

		strong: true,

		note: "Every occasion on which the interface moves. Counted from the register, not from memory.",
	},

	{
		key: "INTERVALS:",

		value: "3",

		note: "150ms, 200ms, 320ms. A class that needed a fourth would be a state change nobody has named.",
	},

	{
		key: "CURVES:",

		value: "3",

		note: "Arrive, line, return. Taken from Jelly's own engine so a record block and a button cannot drift apart.",
	},

	{
		key: "PROPERTIES:",

		value: "2",

		note: "Transform and opacity. Colour joins them in one class, because a resolution is an ink change.",
	},

	{
		key: "REDUCED MOTION:",

		value: "LOSES NOTHING",

		note: "Every rule declares its end state unconditionally and gates only its interval.",
	},

	{
		key: "SOURCE:",

		value: "SOURCE/STYLESHEET/SYSTEM/MOTION/",

		code: true,
	},
];

/** The bands, in reading order. */
export const Bands = {
	Specimens: {
		kicker: "/THE SPECIMENS",

		heading: "What each motion explains, and the artifact that shows it",

		standfirst:
			"A motion is a sentence about a change of state. If the change can be described without the motion, the motion is decoration - so every class below is shown on the thing it is for, and the register beside it prints what the class costs and what it refuses to do.",

		footnote: `EVERY SPECIMEN IS LIVE${Quad}A CLASS WHOSE ARTIFACT COULD NOT BE MOUNTED WOULD BE A CLAIM, NOT A SPECIMEN`,

		tone: "canvas",
	} satisfies Band,

	Sequences: {
		kicker: "/THE SEQUENCES",

		heading:
			"Four state changes this document performs, and one it cannot draw",

		standfirst:
			"A state machine is not a process: the nodes are conditions a record is in, and the edges are the motions that carry it between them with the interval each one costs. The last sequence on this page is the honest one - a transition whose state nothing in the markup sets, so its motion has no name and its interval has no figure.",

		footnote: `SOURCE: THE BLOCKS THAT SET THE STATE${Quad}AN EDGE WITH NO MEASUREMENT PRINTS UNAVAILABLE, NEVER 0 MS`,

		tone: "paper",
	} satisfies Band,

	Fold: {
		kicker: "/THE FOLD",

		heading: "One interaction, three sizes",

		standfirst:
			"The fold is the class this layer was built around, and it is the one that has to survive its own adverse states: a short fold, a fold longer than its frame, and a fold with nothing behind it. All three are the same band, the same leaves and the same grammar - what changes is what the world gave them.",

		footnote: `THE LONG FOLD PRINTS ITS WHOLE COUNT AND SCROLLS INSIDE ITS OWN FRAME${Quad}THE EMPTY FOLD SAYS WHAT WOULD BE HERE`,

		tone: "canvas",
	} satisfies Band,

	Arms: {
		kicker: "/THE ARMS",

		heading: "Which states move, and which must not",

		standfirst:
			"Half of a motion language is the list of things it refuses to animate. An absence is a fact, a stale reading is a fact, a refusal is a fact - and a page that animated any of them would be decorating the truth instead of stating it. Nine arms, and only two of them move.",

		footnote: `SOURCE: DESIGN-BRIEF.MD 7${Quad}A STATE THAT MOVED WITHOUT A CHANGE WOULD BE A CLAIM THE PAGE CANNOT SUPPORT`,

		tone: "paper",
	} satisfies Band,

	Refusals: {
		kicker: "/THE REFUSALS",

		heading: "What this layer will not do, and why",

		standfirst:
			"Eight prohibitions, each one a rule a later card would otherwise be free to break by accident. They are printed here rather than kept in a comment because a design system's refusals are as much a part of it as its values.",

		footnote: `EVERY REFUSAL NAMES THE RULE IT PROTECTS${Quad}NONE OF THEM IS A PREFERENCE`,

		tone: "canvas",
	} satisfies Band,

	Record: {
		kicker: "/THE RECORD",

		heading: "How this page is made",

		standfirst:
			"Three files and one stylesheet family: the register states the classes, the page composes them, the stylesheet carries the numbers, and the specimens are the blocks themselves rather than pictures of them.",

		tone: "canvas",
	} satisfies Band,
} as const;

/** The sequences band's caption, under the run set. */
export const SequenceCaption =
	"Each edge is one motion with one interval. The two-node sequences are the common case - a state and the state it becomes - and the sort is the only one that begins and ends in the same word, which is exactly what it explains: the set did not change, only its order.";

/** The adverse arms: which states move, which must not, and the reason. */
export const ArmsColumns = [
	{ label: "STATE" },

	{ label: "MOTION" },

	{ label: "WHY" },
] as const;

export const ArmsRows: readonly {
	label: string;

	cells: readonly string[];
}[] = [
	{
		label: "EMPTY",

		cells: [
			"NONE",

			"The band states what would be here and why it is not. A page that animated its own emptiness would be decorating an absence.",
		],
	},

	{
		label: "LOADING",

		cells: [
			"SKELETON, THEN RESOLVE 320MS",

			"The skeleton is printed, not pulsed. The one motion is the record that ends the wait, arriving on the resolve curve.",
		],
	},

	{
		label: "PARTIAL",

		cells: [
			"NONE",

			"UNAVAILABLE is a fact about a fact. There is no state change to explain, so nothing moves.",
		],
	},

	{
		label: "ERROR",

		cells: [
			"INTERRUPT 150MS",

			"One 2px offset, once, after the field loses focus - and never while the reader is correcting it.",
		],
	},

	{
		label: "STALE",

		cells: [
			"NONE",

			"The age is printed and the last known value stays visible. A stale figure that pulsed would be pretending to be live.",
		],
	},

	{
		label: "TOO MUCH",

		cells: [
			"FOLD 200MS, IF IT IS FOLDED",

			"The count is printed and the run scrolls in its own frame. The design does not animate the fact that there are two hundred.",
		],
	},

	{
		label: "TOO LONG",

		cells: [
			"NONE",

			"A value that does not fit wraps inside its own cell. Nothing is clipped, so nothing has to be revealed on hover.",
		],
	},

	{
		label: "MISSING",

		cells: [
			"NONE",

			"A tombstone is a printed row: the mark, the name, what it was. A record that faded out would read as a record that was never there.",
		],
	},

	{
		label: "DENIED",

		cells: [
			"NONE",

			"The surface states what it is and who may see it. A lock that shakes is a lock asking for attention it has not earned.",
		],
	},
];

/** The refusals, as ledger rows: the prohibition, then the rule it protects. */
export const Refusals: readonly LedgerRow[] = [
	{
		key: "A FOURTH INTERVAL:",

		value: "THREE INTERVALS, THREE CURVES",

		note: "A class that needs another duration is a class whose state change has not been named yet.",
	},

	{
		key: "A LOOP:",

		value: "NO PULSE, NO SHIMMER, NO BLINKING CARET",

		note: "A loop continues without a state change, which is the first line of the register law's prohibition list.",
	},

	{
		key: "AN ENTRANCE:",

		value: "NOTHING ANIMATES AT FIRST PAINT",

		note: "No `<details>` on the site carries `open` in its markup, so no rule here can fire before a reader asks for it.",
	},

	{
		key: "LAYOUT MOTION:",

		value: "TRANSFORM AND OPACITY",

		note: "The one reflow is the fold's space, claimed in a single frame at the moment of the request - because a box that grows is a layout animation.",
	},

	{
		key: "A SPINNER:",

		value: "A SKELETON IN THE RECORD GRAMMAR",

		note: "A spinner says something is happening. A skeleton says what, and leaves the reader a legible statement if the wait never ends.",
	},

	{
		key: "A SHADOW OR A SCALE:",

		value: "NOTHING LIFTS, GROWS OR BLURS",

		note: "A slip does not zoom, a card does not lift. The paper has no depth, so nothing may pretend to leave it.",
	},

	{
		key: "MOTION ON STATIC CONTENT:",

		value: "NAME THE STATE CHANGE OR DO NOT WRITE THE RULE",

		note: "A paragraph is not loading and a heading is not hovered. That is the whole test, and it is applied to every rule in the family.",
	},

	{
		key: "A REDUCED-MOTION FALLBACK THAT LOSES A STATE:",

		value: "THE END STATE, IN ONE FRAME",

		note: "A reader who asked for less motion is never shown less of the document. The handover is the one class switched off rather than shortened.",
	},
];

/** The fold specimen's own leaves: the fold explaining itself, in a fold. */
export const FoldRules = [
	{
		index: "01",

		label: "The leaves move and the box does not",

		note: "The space is claimed in one frame when `[open]` flips, and the leaves arrive into it 24ms apart. A box that grew would reflow every band under it.",

		meta: "200 MS",
	},

	{
		index: "02",

		label: "The stagger stops at six",

		note: "A forty-leaf fold arrives as six and a run. Forty steps would take a second, and the last leaf would land after the reader had started reading the first.",

		meta: "24 MS",
	},

	{
		index: "03",

		label: "The words crossfade instead of swapping",

		note: "OPEN and CLOSE sit in the same grid cell and one fades as the other arrives, so the summary cannot jump when the state changes.",

		meta: "320 MS",
	},

	{
		index: "04",

		label: "Nothing opens on load",

		note: "No details on the site carries `open` in its markup, so the arrival rule cannot match until a reader asks for it.",

		meta: "NEVER",
	},
] as const;

/** The fold gallery's three arms. */
export const Gallery = {
	Short: {
		name: "OPEN QUESTIONS",

		empty: "This fold has nothing behind it, which is the state it exists to make visible.",

		leaves: [
			{
				index: "01",

				label: "Why the seal does not move",

				note: "A settlement is the absence of an interval, not a slow one. The seal is where the change has arrived at.",

				meta: "SETTLED",
			},

			{
				index: "02",

				label: "Why the palette is not a search box",

				note: "Every row is a destination or an action. A snippet in the results would be a second answer to a question the palette was not asked.",

				meta: "INDEXED",
			},

			{
				index: "03",

				label: "Why a status never prints a zero",

				note: "Zero is a measurement. A fact nobody has measured prints UNAVAILABLE, and the difference is the whole vocabulary.",

				meta: "PRINTED",
			},
		],
	},

	Long: {
		name: "EVERY RULE IN THE FAMILY",

		empty: "The family has no rules, which would mean the stylesheet had not been written.",

		more: "14 leaves, four of them below this frame. The count in the summary is the whole set, not the part you can see.",

		leaves: [
			{
				index: "01",

				label: "Fold: the leaves move, the box does not",

				meta: "200 MS",
			},

			{
				index: "02",

				label: "Expand: the row's box is identical in both states",

				meta: "320 MS",
			},

			{
				index: "03",

				label: "Handover: the record name stays, the body steps",

				meta: "320 MS",
			},

			{
				index: "04",

				label: "Sort: rows travel, the table does not crossfade",

				meta: "320 MS",
			},

			{
				index: "05",

				label: "Origin: 8px from the side the control printed",

				meta: "200 MS",
			},

			{
				index: "06",

				label: "Skeleton: it does not move at all",

				meta: "PRINTED",
			},

			{
				index: "07",

				label: "Enter: 2px of pull and no more",

				meta: "200 MS",
			},

			{
				index: "08",

				label: "Press: 1px of travel under the pointer",

				meta: "150 MS",
			},

			{
				index: "09",

				label: "Trace: the line is at full width in both states",

				meta: "200 MS",
			},

			{
				index: "10",

				label: "Settle: the return is longer than the arrival",

				meta: "320 MS",
			},

			{
				index: "11",

				label: "Resolve: the only class allowed to move an ink",

				meta: "320 MS",
			},

			{
				index: "12",

				label: "Interrupt: 2px, once, and not while correcting",

				meta: "150 MS",
			},

			{
				index: "13",

				label: "Crop: 1.5% inside a frame that does not move",

				meta: "320 MS",
			},

			{
				index: "14",

				label: "Reduced motion: the end state, in one frame",

				note: "The root reset takes the intervals away, including the ones no mixin wrote.",

				meta: "ALWAYS",
			},
		],
	},

	Empty: {
		name: "A FOLD WITH NOTHING BEHIND IT",

		empty: "This fold was asked for and has no leaves: the page that mounted it had no questions left, which is the state a fold should be able to print without pretending to be broken.",

		leaves: [],
	},
} as const;

/** The sequences the site performs, and the one it cannot draw. */
export const Sequences = [
	{
		name: "THE COPY",

		nodes: [
			{
				index: "01",

				state: "READY",

				note: "The copy glyph, in ink, on a command block.",
			},

			{
				index: "02",

				state: "VERIFIED",

				note: "The check, in the accent, while the label lives.",
			},

			{
				index: "03",

				state: "READY",

				note: "The glyph returns; the label's 1800ms expires.",
			},
		],

		edges: [
			{
				motion: "PRESS",

				interval: "150 MS",

				explains: "The label is the state; the ink is the accent.",
			},

			{
				motion: "SETTLE",

				interval: "320 MS",

				explains: "The return to rest is longer than the press.",
			},
		],

		source: "SOURCE/FUNCTION/UTILITY/COPYCOMMAND.TS",

		empty: "A command with no copy affordance has no state to move through, so there is nothing to draw.",
	},

	{
		name: "THE FOLD",

		nodes: [
			{
				index: "01",

				state: "READY",

				note: "Closed: there is more behind this line.",
			},

			{
				index: "02",

				state: "ACTIVE",

				note: "Open: the leaves are being read.",
			},
		],

		edges: [
			{
				motion: "FOLD",

				interval: "200 MS",

				explains:
					"The leaves arrive; the box claimed its space in one frame.",
			},
		],

		source: "SOURCE/COMPONENT/MOTION/MOTIONFOLD.ASTRO",

		empty: "A disclosure with one leaf and no body is not a state change, so it has nothing to draw.",
	},

	{
		name: "THE HANDOVER",

		nodes: [
			{
				index: "01",

				state: "ACTIVE",

				note: "The page you are reading.",
			},

			{
				index: "02",

				state: "LOADING",

				note: "The page you asked for, while its snapshot is taken.",
			},

			{
				index: "03",

				state: "ACTIVE",

				note: "The same document, one part along.",
			},
		],

		edges: [
			{
				motion: "HANDOVER",

				interval: "320 MS",

				explains: "The body steps; the record name stays where it is.",
			},

			{
				motion: "SETTLE",

				interval: "320 MS",

				explains: "The arriving page lands on the settle curve.",
			},
		],

		source: "SOURCE/STYLESHEET/SYSTEM/MOTION/_HANDOVER.SCSS",

		empty: "A navigation with no view transition is a navigation: there is no state to draw between the two pages.",
	},

	{
		name: "THE SORT",

		nodes: [
			{
				index: "01",

				state: "READY",

				note: "The set, before the facet moved.",
			},

			{
				index: "02",

				state: "READY",

				note: "The set, after. Same rows, same words.",
			},
		],

		edges: [
			{
				motion: "SORT",

				interval: "320 MS",

				explains:
					"Rows travel to their new places; the table does not crossfade.",
			},
		],

		source: "SOURCE/COMPONENT/UI/MATRIX/MATRIXCONTROL.TSX",

		empty: "A matrix with no facet has no order to change, so there is no transition to draw.",
	},

	{
		name: "THE CHECKSUM",

		nodes: [
			{
				index: "01",

				state: "READY",

				note: "A digest field the page prints.",
			},

			{
				index: "02",

				state: "VERIFIED",

				note: "The digest, checked against the published one.",
			},
		],

		edges: [
			{
				motion: "◎ UNNAMED",

				interval: undefined,

				explains:
					"Nothing in the markup sets a checking state, so the transition has no name and no measured interval. It is drawn as an absence rather than simulated.",
			},
		],

		source: "SOURCE/COMPONENT/DYNAMIC/DOWNLOAD/VERIFY.ASTRO",

		empty: "A verification with no second state is a single printed figure, not a transition.",
	},
] as const;

/** The specimen notes: one line under each stage. */
export const SpecimenNotes = {
	Fold: "Open it. Four leaves, 24ms apart, and the count in the summary is the set's own length.",

	Expand: "Open the first record: the row does not move, the register arrives under it. The third record is a tombstone - its target is gone, so it is not a disclosure at all.",

	Handover:
		"This one cannot be shown in a column, because it is a change of document. Press the link: the running head's record name stays in place and the body steps under it. The direction is printed from the navigation, so going back reverses the two movements.",

	Sort: "Narrow the facet or type in the match field. The rows travel to their new places on the return curve; the table itself does not crossfade.",

	Origin: "Press the control. The slip leaves it by 8px on the side Radix printed - open it again from a different scroll position and the distance is the same, because it is the side's and not the pointer's.",

	Skeleton:
		"Two arms of one state: the keys with their values barred, and the record that replaces them. The bars never pulse; the motion is the resolve that ends the wait, 320ms.",
} as const;

/** The sort specimen's matrix: six classes, so the facet has something to narrow. */
export const SortColumns = [
	{ label: "MOTION" },

	{ label: "INTERVAL" },

	{ label: "CURVE" },
] as const;

export const SortRows: readonly {
	label: string;

	cells: readonly string[];
}[] = [
	{ label: "ENTER", cells: ["200 MS", "ARRIVE"] },

	{ label: "PRESS", cells: ["150 MS", "ARRIVE"] },

	{ label: "TRACE", cells: ["200 MS", "LINE"] },

	{ label: "FOLD", cells: ["200 MS", "ARRIVE"] },

	{ label: "EXPAND", cells: ["320 MS", "RETURN"] },

	{ label: "HANDOVER", cells: ["320 MS", "LINE"] },

	{ label: "SORT", cells: ["320 MS", "RETURN"] },

	{ label: "SKELETON", cells: ["320 MS", "ARRIVE"] },
];

/** The sort specimen's control: one facet, the matrix's first column. */
export const SortFacets = [{ Key: "0", Label: "MOTION" }] as const;

/** The expand specimen's records: one full, one partial, one gone. */
export const ExpandRecords = [
	{
		index: "RECORD_01",

		name: "The fold's leaves",

		fact: "04 FACTS",

		rows: [
			{
				key: "MOTION:",

				value: "FOLD",

				note: "The class the block is named for.",
			},

			{
				key: "INTERVAL:",

				value: "200 MS",

				note: "Speak, on the arrive curve.",
			},

			{
				key: "STAGGER:",

				value: "24 MS, CAPPED AT SIX",

				note: "A forty-leaf fold arrives as six and a run.",
			},

			{
				key: "AS OF:",

				value: "2026-11-18",
			},
		],

		source: "SOURCE/STYLESHEET/SYSTEM/MOTION/_FOLD.SCSS",
	},

	{
		index: "RECORD_02",

		name: "The handover's direction",

		fact: "02 KNOWN",

		rows: [
			{
				key: "MOTION:",

				value: "HANDOVER",
			},

			{
				key: "INTERVAL:",

				value: "320 MS",
			},

			{
				key: "MEASURED BACKWARD:",

				value: "UNAVAILABLE",

				note: "The navigation API reports the direction; the browser's own backward timing is not measurable from the page.",
			},
		],

		source: "SOURCE/SCRIPT/MOTION/HANDOVER.TS",
	},

	{
		index: "RECORD_03",

		name: "The palette's origin",

		missing:
			"the palette is a modal and has no anchor, so it leans by a capped 24px instead of leaving a control. The record that described its side was retired when that was decided.",

		rows: [],

		source: "SOURCE/STYLESHEET/SYSTEM/MOTION/_ORIGIN.SCSS",
	},
] as const;

/** The skeleton specimen's keys, and what has not arrived. */
export const SkeletonSpec = {
	marker: "# LOADING / 05",

	keys: ["MOTION:", "INTERVAL:", "CURVE:", "SOURCE:", "AS OF:"],

	waiting: "THE REGISTER'S OWN READ, WHICH RUNS AFTER THE PAGE IS PRINTED",

	age: "ONE FRAME",
} as const;

/** The skeleton's other arm: the same record, arrived. */
export const SkeletonArrived = [
	{ key: "MOTION:", value: "SKELETON" },

	{
		key: "INTERVAL:",

		value: "320 MS",

		note: "The resolve that ends the wait.",
	},

	{ key: "CURVE:", value: "ARRIVE" },

	{ key: "SOURCE:", value: "MOTION/_SKELETON.SCSS" },

	{ key: "AS OF:", value: "2026-11-18" },
] as const;

/** The handover specimen's register: what the two images are. */
export const HandoverRows = [
	{ key: "KEEPS:", value: "THE RECORD NAME, IN THE RUNNING HEAD" },

	{ key: "STEPS:", value: "THE BODY, 8PX IN THE DIRECTION OF TRAVEL" },

	{ key: "DIRECTION:", value: "PRINTED BY SCRIPT/MOTION/HANDOVER.TS" },

	{ key: "WITHOUT IT:", value: "A PLAIN NAVIGATION, AND NOTHING IS LOST" },
] as const;

/** The page's own closing ledger: the files this page is made of. */
export const RecordRows = [
	{
		key: "REGISTER:",

		value: "SOURCE/CONTENT/MOTION/REGISTER.TS",

		code: true,
	},

	{ key: "COPY:", value: "SOURCE/CONTENT/MOTION/PAGE.TS", code: true },

	{
		key: "STYLESHEET:",

		value: "SOURCE/STYLESHEET/SYSTEM/MOTION/",

		code: true,
	},

	{ key: "SCRIPT:", value: "SOURCE/SCRIPT/MOTION/", code: true },

	{
		key: "SPECIMENS:",

		value: "THE BLOCKS THEMSELVES, MOUNTED LIVE",

		note: "A specimen that was a picture would be a claim about a block rather than the block.",
	},
] as const;
