/**
 * Status - the status board's data: every record the site files with a state,
 * grouped by the state it states, and the facts the board is read against.
 *
 * ─── WHY THIS PAGE EXISTS ─────────────────────────────────────────────────
 * The site states a status on fifteen element records, two releases, three
 * platform records and one absent artifact - and a reader could only find them
 * by opening four different surfaces and holding the answers in their head. A
 * manual has a page that answers *what is live, what is coming, what is retired*
 * in one reading, and this site did not.
 *
 * ─── THE ROWS ARE DERIVED, NOT WRITTEN ────────────────────────────────────
 * Nothing below retypes a status. The fifteen rows come from
 * `Content/Record/*.ts`, the three platform rows from `Content/Home/Platform.ts`,
 * and the two release rows from `Content/Home/Roadmap.ts` - the same modules the
 * homepage and the Download page print. A row that disagreed with its record
 * would be a second place for the same fact, which is the one thing a status
 * board may not have: the page's whole claim is that the board *is* the records.
 *
 * ─── THE FOUR COLUMNS ARE THE FOUR ANSWERS ────────────────────────────────
 * The vocabulary is eight words, and a board of eight columns would be a
 * dictionary with four empty shelves. The four columns are the four questions a
 * reader arrives with, and each one holds the words that answer it:
 *
 *   IN FORCE       ACTIVE, VERIFIED      the thing exists and is being worked on
 *   ON THE WAY     PREPARING, LOADING    the thing is announced and not yet here
 *   RETIRED        ARCHIVED              the thing existed and does not now
 *   NOT MEASURED   UNAVAILABLE           the thing is claimed and not yet counted
 *
 * Every word is from §1.5's eight. The column is a grouping of the vocabulary,
 * never a ninth word: a board that invented `PLANNED` would be the drift the
 * vocabulary exists to prevent.
 *
 * ─── THE EMPTY COLUMN IS PART OF THE DESIGN ───────────────────────────────
 * `RETIRED` has no rows, and it prints a composed empty rather than disappearing:
 * what would be here, why it is not, and what to do. A board that hides its empty
 * column is a board that cannot be trusted about the columns it does show - the
 * reader has no way to tell "nothing is retired" from "retirement is not
 * recorded".
 *
 * The separator is U+2001, the site's only one. Nothing here is a literal colour:
 * a row's ink comes from the state word, through `Component/Surface/State.ts`.
 */
import { PlatformCards } from "../Home/Platform.js";

import { ReleaseCards } from "../Home/Roadmap.js";

import { Air } from "../Record/Air.js";

import { Cocoon } from "../Record/Cocoon.js";

import { Common } from "../Record/Common.js";

import { Echo } from "../Record/Echo.js";

import { Grove } from "../Record/Grove.js";

import { Maintain } from "../Record/Maintain.js";

import { Mist } from "../Record/Mist.js";

import { Mountain } from "../Record/Mountain.js";

import { Output } from "../Record/Output.js";

import { Rest } from "../Record/Rest.js";

import { SideCar } from "../Record/SideCar.js";

import { Sky } from "../Record/Sky.js";

import { Vine } from "../Record/Vine.js";

import { Wind } from "../Record/Wind.js";

import { Worker } from "../Record/Worker.js";

import type { FieldRecord } from "../Record/FieldRecord.js";

import type {
	Band,
	Comparison,
	LedgerRow,
	Measure,
	Stage,
	Trace,
} from "../../Component/Record/Type.js";

import type { ReleaseCard } from "../Home/Type.js";

/** The field-record separator: U+2001, never U+00B7. */
const Quad = "\u2001";

/** One row of the board: a record, the one line it is known by, and its state. */
export interface BoardRow {
	/** The record's marker, without the `#` the block prints itself. */
	readonly mark: string;

	/** The record's name, as its own module writes it. */
	readonly label: string;

	/** The one line under the name: what the record is, in its own words. */
	readonly meta: string;

	/** Where the record can be opened. */
	readonly href?: string;

	/** The vocabulary word this row states - the reason it is in this column. */
	readonly state: string;

	/** A qualification, when the row needs one. */
	readonly note?: string;
}

/** One column of the board: the words it holds, and the records under them. */
export interface BoardColumn {
	/** The column's key, used for its id and its jump link. */
	readonly key: string;

	/** The column's name, at the register head: `IN FORCE`. */
	readonly label: string;

	/** The vocabulary words the column groups. Printed beside the count. */
	readonly words: readonly string[];

	/** One line under the head: what the column answers. */
	readonly note: string;

	/** What the column says when it holds nothing. Required, never absent. */
	readonly empty: string;

	/** The rows, in the order they print. */
	readonly rows: readonly BoardRow[];
}

/** The fifteen element records, in the architecture band's own order. */
const Elements: readonly FieldRecord[] = [
	Air,

	Cocoon,

	Common,

	Echo,

	Grove,

	Maintain,

	Mist,

	Mountain,

	Output,

	Rest,

	SideCar,

	Sky,

	Vine,

	Wind,

	Worker,
];

/** The marker without the glyph the block draws. */
const Bare = (Index: string): string => Index.replace(/^#\s*/, "");

/**
 * One stamp line's value, as `Content/Home/Roadmap.ts` writes it.
 *
 * A release's status is not a field on the card - it is a span line in the
 * card's stamp, because the baseline printed a stamp's brackets, keyword and
 * value in three different inks and a string cannot carry that. Reading it back
 * out of the spans is the only way to state the release's own word rather than
 * a second copy of it, so the board and the homepage cannot disagree.
 */
const StampValue = (Card: ReleaseCard, Key: string): string => {
	for (const Line of Card.Stamp) {
		const Text = Line.map((Span) => Span.Text).join("");

		if (Text.startsWith(Key)) return Text.slice(Key.length).trim();
	}

	return "UNAVAILABLE";
};

/** The element rows: one per record, from the record's own fields. */
const ElementRows: readonly BoardRow[] = Elements.map((Record) => ({
	mark: Bare(Record.Index),
	label: Record.Title,
	meta: Record.Stamp?.[0] ?? "ELEMENT",
	href: `/Doc/${Record.Id}`,
	state: Record.Status.Value,
}));

/** The release rows: the two editions the roadmap files. */
const ReleaseRows: readonly BoardRow[] = ReleaseCards.map((Card) => ({
	mark: Bare(Card.Index),
	label: Card.Title,
	meta: StampValue(Card, "TARGET:"),
	href: Card.Action.Href,
	state: StampValue(Card, "STATUS:"),
	note: "SOURCE CHANNEL",
}));

/** The platform rows: three targets, one edition. */
const PlatformRows: readonly BoardRow[] = PlatformCards.map((Card) => ({
	mark: Bare(Card.Index),
	label: Card.Name,
	meta: `WEBVIEW:${Quad}${Card.Webview}`,
	href: "/Download",
	state: Card.Status.Value,
	note: Card.Minimum,
}));

/**
 * The one row with no record behind it.
 *
 * There is no `Content/` module for the public artifact because there is no
 * public artifact: the Download page prints `VERSION: UNAVAILABLE` and the
 * platform matrix prints `SIZE: UNAVAILABLE` for the same reason. The row is
 * declared here, with the source that states its absence, so the board's
 * `NOT MEASURED` column is not empty - an empty column would say the question is
 * not asked, and it is asked on every download page on the site.
 */
const ArtifactRow: BoardRow = {
	mark: "ARTIFACT_01",

	label: "PUBLIC BUILD",

	meta: `CHANNEL:${Quad}NONE PUBLISHED`,

	href: "/Download",

	state: "UNAVAILABLE",

	note: "SOURCE: SOURCE/COMPONENT/DYNAMIC/DOWNLOAD/DATA.TS",
};

/** Every row the board files, in the order the columns print them. */
const AllRows: readonly BoardRow[] = [
	...ElementRows,
	...ReleaseRows,
	...PlatformRows,

	ArtifactRow,
];

/** The rows that state one of a column's words, in their own order. */
const RowsOf = (Words: readonly string[]): readonly BoardRow[] =>
	AllRows.filter((Row) => Words.includes(Row.state));

/** The four columns, with their rows resolved from the vocabulary. */
export const Board: readonly BoardColumn[] = [
	{
		key: "in-force",

		label: "IN FORCE",

		words: ["ACTIVE", "VERIFIED"],

		note: "The record exists, and someone is working on it today.",

		empty: "No record is in force. Every record below is either announced or retired, which is a different site than this one.",

		rows: RowsOf(["ACTIVE", "VERIFIED"]),
	},

	{
		key: "on-the-way",

		label: "ON THE WAY",

		words: ["PREPARING", "LOADING"],

		note: "The record is announced, and the thing it names is not here yet.",

		empty: "Nothing is announced and unfinished. Every claim on this site is either in force or retired.",

		rows: RowsOf(["PREPARING", "LOADING"]),
	},

	{
		key: "retired",

		label: "RETIRED",

		words: ["ARCHIVED"],

		note: "The record existed and does not now. A retired record keeps its address.",

		empty: "No record has been retired. Nothing on this site has been withdrawn, and the column stays to say so - an empty column is a fact about the site, and hiding it would make the other three unreadable.",

		rows: RowsOf(["ARCHIVED"]),
	},

	{
		key: "not-measured",

		label: "NOT MEASURED",

		words: ["UNAVAILABLE"],

		note: "The record is claimed, and the fact it would print has not been produced.",

		empty: "Every claimed record carries its fact. Nothing on this site is waiting on a measurement.",

		rows: RowsOf(["UNAVAILABLE"]),
	},
];

/** Every row, for the instrument's total. */
export const TotalRows = AllRows.length;

/**
 * The publication axis.
 *
 * A status board says *what is live*; this rail says *how far the release has
 * travelled*, which is the question the word `PREPARING` raises and cannot
 * answer. The two ends are the site's own: source, and a signed artifact.
 *
 * Four of the five stops are `UNAVAILABLE` and that is the point of the rail: a
 * progression whose middle is missing is more honest than one drawn as complete.
 */
export const Publication: Comparison = {
	from: "SOURCE",

	to: "SIGNED ARTIFACT",

	stops: [
		{
			label: "SOURCE",

			value: "PUBLISHED",

			note: "CC0, in the open",

			href: "/Download",
		},

		{
			label: "SOURCE BUILD",

			value: "DOCUMENTED",

			note: "One config, two steps",

			href: "/Doc/installation",
		},

		{
			label: "UNSIGNED INSTALLER",

			value: "NOT BUILT",

			state: "UNAVAILABLE",

			note: "No artifact to sign",
		},

		{
			label: "SIGNED INSTALLER",

			value: "NOT BUILT",

			state: "UNAVAILABLE",

			note: "Signing planned",
		},

		{
			label: "STORE CHANNEL",

			value: "NOT OPEN",

			state: "UNAVAILABLE",

			note: "Marketplace under review",
		},
	],

	caption:
		"The release has travelled two of five stops. Every stop after the source build prints `UNAVAILABLE` rather than a date, because a date this site has not committed to is a promise, and the rail is a record.",
};

/**
 * The vocabulary, as the board reads it.
 *
 * Eight rows, one per word, and each row states the word, the tone it carries
 * and the sentence that tells a reader which of two near-synonyms to use. This
 * is the legend the board is read against: a reader who does not know why
 * `PREPARING` is not `LOADING` cannot read the column heads.
 */
export const Vocabulary: readonly LedgerRow[] = [
	{
		key: "READY",

		value: "The action can be taken now. Used of a surface, never of an element.",

		note: "INK",
	},

	{
		key: "ACTIVE",

		value: "The record exists and is being worked on. The site's ordinary live state.",

		note: "SPECIMEN",
	},

	{
		key: "LOADING",

		value: "The thing is arriving and has not arrived. Used of a release in flight.",

		note: "INK",
	},

	{
		key: "PREPARING",

		value: "The thing is announced and not yet started. Used of a target with no artifact.",

		note: "QUIET",
	},

	{
		key: "VERIFIED",

		value: "The claim was checked against something outside this site. Rare on purpose.",

		note: "SPECIMEN",
	},

	{
		key: "UNAVAILABLE",

		value: "The fact exists and is empty. Never a zero: a zero is a measurement.",

		note: "INK",
	},

	{
		key: "INTERRUPTED",

		value: "An action failed. Always printed with its cause and its next step.",

		note: "INK",
	},

	{
		key: "ARCHIVED",

		value: "The record existed and does not now. It keeps its address and its facts.",

		note: "QUIET",
	},
];

/**
 * The figures the board is read against.
 *
 * Every count is computed from the rows above, so a column that gains a record
 * gains its figure. The one figure that is not a count of rows is `WORDS USED`,
 * which is a count of the vocabulary's eight that this site actually states -
 * the difference between a closed vocabulary and a full one.
 */
export const Measures = (AsOf: string): readonly Measure[] => {
	const Used = new Set(AllRows.map((Row) => Row.state));

	return [
		{
			label: "RECORDS",

			value: String(AllRows.length),

			unit: "ON THE BOARD",

			provenance: "SOURCE/CONTENT/MORE/STATUS.TS",

			lead: true,
		},

		{
			label: "IN FORCE",

			value: String(RowsOf(["ACTIVE", "VERIFIED"]).length),

			unit: "ACTIVE OR VERIFIED",

			provenance: "SOURCE/CONTENT/RECORD/*.TS",
		},

		{
			label: "ON THE WAY",

			value: String(RowsOf(["PREPARING", "LOADING"]).length),

			unit: "PREPARING OR LOADING",

			provenance: "SOURCE/CONTENT/HOME/PLATFORM.TS",
		},

		{
			label: "RETIRED",

			value: String(RowsOf(["ARCHIVED"]).length),

			unit: "ARCHIVED",

			provenance: "SOURCE/CONTENT/RECORD/*.TS",
		},

		{
			label: "NOT MEASURED",

			value: String(RowsOf(["UNAVAILABLE"]).length),

			unit: "CLAIMED, NOT COUNTED",

			provenance: "SOURCE/COMPONENT/DYNAMIC/DOWNLOAD/DATA.TS",
		},

		{
			label: "WORDS USED",

			value: `${Used.size}`,

			unit: "OF EIGHT",

			provenance: "SOURCE/COMPONENT/SURFACE/STATE.TS",
		},

		{
			label: "AS OF",

			value: AsOf,

			unit: "THIS BUILD",

			provenance: "THE DAY THIS PAGE WAS RENDERED",
		},
	];
};

/**
 * Where every state on the board can be checked, in the order a reader would
 * check it: the record, then the edition, then the platform, then the absence.
 */
export const Reading: Trace = {
	source: "THIS PAGE DECIDES NO STATE; IT READS THE MODULES THAT DO",

	steps: [
		{
			index: "01",

			path: "Source/Content/Record/",

			note: "FIFTEEN ELEMENT RECORDS, ONE STATUS EACH",
		},

		{
			index: "02",

			path: "Source/Content/Home/Roadmap.ts",

			note: "TWO RELEASES, STATED IN THEIR STAMPS",
		},

		{
			index: "03",

			path: "Source/Content/Home/Platform.ts",

			note: "THREE TARGETS, ALL PREPARING",
		},

		{
			index: "04",

			path: "Source/Component/Dynamic/Download/Data.ts",

			note: "THE ABSENT ARTIFACT, AND WHY IT IS ABSENT",
		},
	],
};

/** The one command that re-reads the board, and the check that it stayed true. */
export const Check = {
	label: "RE-READ",

	language: "bash",

	lines: [
		"node Source/Script/Register.ts",

		"grep -rn 'Value:' Source/Content/Record/*.ts",
	],

	source: "SOURCE/SCRIPT/REGISTER.TS",
};

/**
 * How the board is made, in three steps.
 *
 * The third step is the one that matters: the page groups, and the modules
 * decide. A board that decided a state would be a second place to change one.
 */
export const Stages: readonly Stage[] = [
	{
		index: "01",

		label: "READ",

		line: "Every record module is imported, not copied: the board reads the same fifteen, two and three the rest of the site prints.",
	},

	{
		index: "02",

		label: "GROUP",

		line: "Each row is filed under the column that holds its word. The four columns are a grouping of the eight, never a ninth word.",
	},

	{
		index: "03",

		label: "PRINT",

		line: "The board prints the rows and the counts together, so a column cannot claim a figure its rows do not have.",
	},
];

/** The page's bands, in reading order. */
export const Bands = {
	Board: {
		kicker: "/THE BOARD",

		interval: "turn",

		heading: "Every record, under the word it states",

		standfirst:
			"Twenty-one records, four columns, one vocabulary. A record appears in exactly one column, and the column it is in is the word its own module states - this page has no opinion about any of them.",

		footnote: `SOURCE: SOURCE/CONTENT/RECORD/*.TS${Quad}SOURCE/CONTENT/HOME/ROADMAP.TS${Quad}SOURCE/CONTENT/HOME/PLATFORM.TS`,

		tone: "flush",
	} satisfies Band,

	Axis: {
		kicker: "/THE AXIS",

		interval: "rest",

		heading: "How far the release has travelled",

		standfirst:
			"`PREPARING` says a thing is not here. It does not say how far away it is. The axis does: five stops from source to a signed artifact, and two of them are reached.",

		footnote: `SOURCE: SOURCE/COMPONENT/DYNAMIC/DOWNLOAD/DATA.TS${Quad}A STOP THIS SITE CANNOT REACH PRINTS UNAVAILABLE, NEVER A DATE`,

		tone: "canvas",
	} satisfies Band,

	Vocabulary: {
		kicker: "/THE VOCABULARY",

		interval: "break",

		heading: "Eight words, and no others",

		standfirst:
			"The state vocabulary is closed at eight. A ninth word would be a state with no ink and no tone, which is how a status becomes a decoration.",

		footnote:
			"The tone column is the word's ink, not a second classification: `SPECIMEN` is the attested state - the record's own ink and the state square at half again the size - `QUIET` is the muted ink, `INK` is the foreground. A word outside the eight prints in ink and is not a state.",

		tone: "paper",
	} satisfies Band,

	Figures: {
		kicker: "/THE FIGURES",

		interval: "rest",

		heading: "What the board counts",

		standfirst:
			"Every figure is computed from the rows above it, and every figure names the file it was counted in. A number this page could not compute would print `UNAVAILABLE`, never a zero.",

		tone: "canvas",
	} satisfies Band,

	Reading: {
		kicker: "/THE READING",

		interval: "beat",

		heading: "Where each state comes from",

		standfirst:
			"Four modules, in the order a reader would check them. The board is a reading of these files, and the files are the record.",

		tone: "paper",
	} satisfies Band,

	Limits: {
		kicker: "/THE LIMITS",

		interval: "turn",

		heading: "What this board cannot tell you",

		standfirst:
			"A status board that only printed its successes would be a poster. These are the three things this page knows it does not know, each stated in the same band as the board itself.",

		tone: "canvas",
	} satisfies Band,
} as const;
