/**
 * Gallery - the states gallery: every component of the document, every condition
 * it is asked, and the answer it gives - on one page, generated from the ten
 * families' own tables.
 *
 * ─── WHY ONE PAGE, WHEN TEN ALREADY EXIST ─────────────────────────────────
 * `/Specimen` prints ten state matrices, one per family, and each is the right
 * instrument for its own subject: the frame's twenty-two columns are not the
 * ledger's twenty-four, and a matrix that answered both would be a matrix of
 * two questions. What no page could do until this one is answer the question a
 * reader actually arrives with - "is this component finished?" - because the
 * answer lives in ten tables, under ten heads, in ten different column orders,
 * with ten different question sets.
 *
 * So this module does not write a sixth opinion about the components. It
 * IMPORTS the ten families, normalises their column keys onto one spine of
 * twenty-two conditions, and reads every cell through the family's own
 * `MatrixCell`. A cell on this page and a cell on the family's matrix are the
 * same cell, read twice - which is why the two can never disagree, and why a
 * condition added to a family appears here with no second edit.
 *
 * ─── THREE ANSWERS, NOT TWO ───────────────────────────────────────────────
 * A matrix cell has two answers: `BUILT`, or `N/A` with the reason it cannot
 * exist. The gallery's grid needs a third, and pretending otherwise would be
 * the one dishonest thing this page could do:
 *
 *   BUILT      the family's matrix renders this combination.
 *   N/A        it cannot exist, and the family wrote the sentence saying why.
 *   UNASKED    the family's matrix has no column for this condition at all.
 *
 * `UNASKED` is not a defect and not a gap in the page: it is the finding. Ten
 * matrices ask ten different questions, and the conditions they leave out are
 * exactly the work a later card can pick up. `/THE UNASKED` prints that list
 * per family, so the term sheet ends in a work list rather than an opinion.
 *
 * ─── THE SPINE, AND WHY IT IS TWENTY-TWO ──────────────────────────────────
 * The ten families' columns fold into seventy-five distinct keys. Twenty-two of
 * them are the same condition asked in different words - `oneitem` is `one`,
 * `longtext` is `long`, `card` is `incard`, `reduced` is `reducedmotion` - and
 * the synonym table below is the whole of that fold, printed so a reader can
 * check it rather than trust it.
 *
 * The remaining fifty-three are a family's OWN conditions: the frame's two
 * rails, the reading family's ninety sections, the small surfaces' seven ways a
 * reader arrives locked out. They stay where they are - a condition only one
 * family asks is that family's subject, not a column of the document - and the
 * gallery counts them per family so the sheet states what it left out as well
 * as what it holds.
 *
 * ─── NO FIGURE IS TYPED HERE ──────────────────────────────────────────────
 * Every count on the page - components, cells, built, reasons, unasked,
 * distinct sentences - is derived from the tables below, which are derived from
 * the families. A component added to `Frame.ts` moves every figure on this page
 * in the same edit, and a condition added to the spine changes the cells and the
 * totals together. A number written into this file would be the one figure on
 * the sheet that could disagree with the sheet.
 */
import * as Apparatus from "./Apparatus.js";

import * as Composition from "./Composition.js";

import * as Display from "./Display.js";

import * as Field from "./Field.js";

import * as Frame from "./Frame.js";

import * as Narrative from "./Narrative.js";

import * as Overlay from "./Overlay.js";

import * as Reading from "./Reading.js";

import * as Record from "./Record.js";

import * as Small from "./Small.js";

import { Padded } from "../../Component/Record/RegisterLine.js";

import { StateTerms, Tone } from "../../Component/Surface/State.js";

import type { StatusTone } from "../Record/FieldRecord.js";

import type { LedgerRow } from "../../Component/Record/Type.js";

/* ─── THE SPINE ──────────────────────────────────────────────────────────── */

/**
 * The twenty-two conditions every component on this page is asked, in reading
 * order: the brief's ten arms, then the six shapes a block is composed at, then
 * the six contexts it is read in.
 *
 * The order is the gallery's argument. A reader who reads only the first ten
 * columns has read `Design-Brief.md` §7; a reader who reads all twenty-two has
 * read what the document's components are actually asked to survive.
 *
 * ─── DECLARED ONCE, AND THE KEY IS DERIVED FROM IT ────────────────────────
 * The table is a literal, and `ConditionKey` below is read out of it rather than
 * written beside it. That is the card's own requirement made structural: adding
 * a condition is ONE entry here, and it becomes a column of the spine, a key of
 * every component's row, a cell in every one of the ten family tables, and a
 * figure in every count on the page - with no second edit in this file and none
 * anywhere else. A hand-written union beside a hand-written array would be two
 * lists to keep in step, which is the defect the register line exists to end.
 *
 * A condition added here still needs a mount in `/THE WALL` if it is to be shown
 * live: a table can be data, but a live artifact has to be chosen.
 */
const Declared = [
	{
		key: "rest",

		label: "REST",

		ask: "untouched",

		group: "condition",

		status: "READY",

		when: "The state a component is in before anything has happened to it: the first frame of every page, and the one state that has to be right with no script at all.",
	},

	{
		key: "empty",

		label: "EMPTY",

		ask: "nothing exists yet",

		group: "condition",

		status: "PREPARING",

		when: "Right when the set is genuinely empty and the reader is owed what would be here, why it is not and where to go next - never a frame over nothing.",
	},

	{
		key: "loading",

		label: "LOADING",

		ask: "has not arrived",

		group: "condition",

		status: "LOADING",

		when: "Right while the shape of the record is known and its values are not: the skeleton prints the schema, which is the one thing a spinner cannot do.",
	},

	{
		key: "partial",

		label: "PARTIAL",

		ask: "one part unknown",

		group: "condition",

		status: "UNAVAILABLE",

		when: "Right when most facts are in hand and one is not: the known facts print, and the missing one prints `UNAVAILABLE` rather than a zero.",
	},

	{
		key: "error",

		label: "ERROR",

		ask: "a step failed",

		group: "condition",

		status: "INTERRUPTED",

		when: "Right after a failed action: the cause, the retry and the destination, in that order, because a reader who is told what broke can act on it.",
	},

	{
		key: "stale",

		label: "STALE",

		ask: "older than its as-of",

		group: "condition",

		status: "ARCHIVED",

		when: "Right when the reading is real and old: the value stays visible and the date prints beside it with its age, rather than the value being withdrawn.",
	},

	{
		key: "disabled",

		label: "DISABLED",

		ask: "cannot be used",

		group: "condition",

		status: "PREPARING",

		when: "Right when the control exists and is not armed yet: the label stays legible and the reason is stated, rather than implied by a grey box.",
	},

	{
		key: "readonly",

		label: "READ-ONLY",

		ask: "cannot be changed",

		group: "condition",

		status: "READY",

		when: "Right when the value is a fact the reader may check and may not edit: it prints at full ink, because read-only is a permission and not a weakness.",
	},

	{
		key: "missing",

		label: "MISSING",

		ask: "the target is gone",

		group: "condition",

		status: "UNAVAILABLE",

		when: "Right when the thing a row pointed at no longer exists: a tombstone in the record grammar that says what was there, never a dead link.",
	},

	{
		key: "denied",

		label: "DENIED",

		ask: "the reader may not see it",

		group: "condition",

		status: "UNAVAILABLE",

		when: 'Right when the surface exists and the reader may not have it: say what it is, because "you cannot see this" tells a reader nothing they can act on.',
	},

	{
		key: "one",

		label: "ONE",

		ask: "a set of one",

		group: "shape",

		when: "Right when the design was drawn for six and the data holds one: the row keeps its place and the band keeps its air, rather than collapsing to a stub.",
	},

	{
		key: "many",

		label: "MANY",

		ask: "a set of two hundred",

		group: "shape",

		when: "Right when the set outgrew the design: the block holds, and the window states its own figure instead of printing the first six as if they were all.",
	},

	{
		key: "long",

		label: "LONG",

		ask: "a line past its column",

		group: "shape",

		when: "Right when a title, a path or a hash will not fit: the layout must not break, and the value must stay recoverable in full.",
	},

	{
		key: "narrow",

		label: "NARROW",

		ask: "a narrow column",

		group: "shape",

		when: "Right in a rail, a margin or a 16rem card: the block re-composes rather than shrinking into a column of ellipses.",
	},

	{
		key: "wide",

		label: "WIDE",

		ask: "a wide band",

		group: "shape",

		when: "Right across a full measure: the block must not stretch a line past the point where the eye loses it.",
	},

	{
		key: "dense",

		label: "DENSE",

		ask: "the tight step",

		group: "shape",

		when: "Right inside a card or a pane: the step is padding and never type, and nothing is dropped to make it fit.",
	},

	{
		key: "incard",

		label: "IN A CARD",

		ask: "a record inside a card",

		group: "context",

		when: "Right when the artifact is the card's content: a record inside a Jelly surface, and never a card inside a card.",
	},

	{
		key: "inband",

		label: "IN A BAND",

		ask: "a record inside a band",

		group: "context",

		when: "Right when the artifact is one chapter of a page: the band supplies the interval and the block supplies the record.",
	},

	{
		key: "withaction",

		label: "WITH ACTION",

		ask: "one thing to click",

		group: "context",

		when: "Right when the block carries the one thing the reader clicks: one expressive action per artifact, and the ink-inverted surface is that action's.",
	},

	{
		key: "noaction",

		label: "NO ACTION",

		ask: "nothing to click",

		group: "context",

		when: "Right when the block is read and not acted on: a record with no door is complete, and a decorative button is a lie about what the page can do.",
	},

	{
		key: "print",

		label: "ON PAPER",

		ask: "the printed sheet",

		group: "context",

		when: "Right when the sheet is printed: the chrome drops, the link targets print, and no state may depend on a colour or a hover to be read.",
	},

	{
		key: "reduced",

		label: "REDUCED",

		ask: "no motion asked for",

		group: "context",

		when: "Right when the reader asked for less motion: the change of state still reads, because the motion was never carrying the meaning.",
	},
] as const;

/** The key of a condition: one of the table's own, never a second list. */
export type ConditionKey = (typeof Declared)[number]["key"];

/** One column of the spine: the condition, what it asks, and when it is right. */
export interface Condition {
	/** The cell's key in a component's row. */
	readonly key: ConditionKey;

	/** The column head, in the sheet's register: `EMPTY`, `IN A CARD`. */
	readonly label: string;

	/** One line under the head: what the condition asks of a component. */
	readonly ask: string;

	/**
	 * The group the condition belongs to. The gallery prints a heavier rule
	 * where the brief's adverse states give way to the shapes a block is
	 * composed at and where those give way to the contexts it is read in.
	 */
	readonly group: "condition" | "shape" | "context";

	/**
	 * The §1.5 status word the condition is stated in, where it has one.
	 *
	 * Eight of the ten adverse conditions answer to the vocabulary; the twelve
	 * shapes and contexts have none, because a column width is not a status and
	 * a block that invented a word for one would be a ninth word in a register
	 * that is closed at eight. `ACTIVE` and `VERIFIED` are not used by any
	 * condition: they are a lifecycle, and a condition is not a lifecycle.
	 */
	readonly status?: (typeof StateTerms)[number];

	/**
	 * One line saying when this state is right - the sentence a picture of a
	 * component cannot carry, and the one thing every row of `/THE WALL` needs.
	 */
	readonly when: string;
}

/**
 * The table, checked against the contract above.
 *
 * The annotation is the check, not a second declaration: every entry is measured
 * against `Condition`, so a misspelt group or a status word outside §1.5's eight
 * is a type error at this line rather than a page that prints it.
 */
export const Conditions: readonly Condition[] = Declared;

/** How many conditions the spine asks. */
export const ConditionCount = Conditions.length;

/** The conditions by key, for the lookups the builders do. */
const ConditionByKey: ReadonlyMap<string, Condition> = new Map(
	Conditions.map((Condition) => [Condition.key, Condition]),
);

/** Whether a family column key folds onto the spine. */
const OnSpine = (Key: string): Key is ConditionKey => ConditionByKey.has(Key);

/* ─── THE SYNONYM TABLE ──────────────────────────────────────────────────── */

/**
 * The fold, printed: a family's column key, and the spine's condition.
 *
 * Only keys whose meaning is the same condition of the component are here.
 * `oneitem` and `one` ask one question; `longkey` and `longvalue` are the ledger
 * family's two arms of `long`, and the ledger is the one family that asks a long
 * *key* and a long *value* separately, so both fold onto the one condition and
 * the cell is built when either arm is. Keys that are a family's own subject -
 * `signedout`, `norail`, `at640`, `longheading` - are absent on purpose: they do
 * not fold, they stay that family's, and the gallery counts them as such.
 */
export const Synonym: Readonly<Record<string, ConditionKey>> = {
	oneitem: "one",

	manyitems: "many",

	longtext: "long",

	longkey: "long",

	longvalue: "long",

	card: "incard",

	band: "inband",

	action: "withaction",

	reducedmotion: "reduced",

	reduced: "reduced",

	print: "print",
};

/** The spine key a family column answers, or `undefined` if it is its own. */
const Folded = (Key: string): ConditionKey | undefined => {
	const Key2 = Synonym[Key] ?? Key;

	return OnSpine(Key2) ? Key2 : undefined;
};

/* ─── THE FAMILIES ───────────────────────────────────────────────────────── */

/** The ten families, in the order `/Specimen` prints them. */
export type FamilyKey =
	| "field"
	| "overlay"
	| "display"
	| "record"
	| "narrative"
	| "frame"
	| "reading"
	| "composition"
	| "small"
	| "apparatus";

/** What the gallery states about a family, before its tables are read. */
interface FamilyMeta {
	readonly key: FamilyKey;

	/** The band's kicker, exactly as `/Specimen` prints it. */
	readonly band: string;

	/** Where the family's own matrix is printed, with its anchor. */
	readonly href: string;

	/** The file this family's matrix is written in. */
	readonly source: string;

	/** The family's subject, in one line - the sentence its band argues. */
	readonly subject: string;

	/**
	 * What the family's question set leaves out, and why. One sentence per
	 * family, true of every condition the family does not ask, because the
	 * `UNASKED` cells print the exact list from the tables beside it.
	 */
	readonly gap: string;
}

const Meta: readonly FamilyMeta[] = [
	{
		key: "field",

		band: "/THE FIELD",

		href: "/Specimen#field",

		source: "CONTENT/SPECIMEN/FIELD.TS",

		subject:
			"A control's states are the design: what it is when it is empty, refused, read-only, or not visible at all.",

		gap: "The input family asks what a control does when the world is unkind to the control itself - invalid, required, hint, counter, addon - and leaves the conditions that belong to the block holding it to that block. A field cannot fail a read it never makes, and its age is the record's as-of rather than the input's.",
	},

	{
		key: "overlay",

		band: "/THE OVERLAY",

		href: "/Specimen#overlay",

		source: "CONTENT/SPECIMEN/OVERLAY.TS",

		subject:
			"An overlay is judged in the two seconds after a click: what it covers, what it returns to, and the five ways out.",

		gap: "The overlay family asks what a panel does in the two seconds after a click - hover, focus, current, submenu, taller than the viewport, near the edge, trigger removed - and leaves the states of the content it covers to the block that renders it. A slip is dismissed; it is not edited, and it outlives no target.",
	},

	{
		key: "display",

		band: "/THE DISPLAY",

		href: "/Specimen#display",

		source: "CONTENT/SPECIMEN/DISPLAY.TS",

		subject:
			"A display is read rather than used: its worst state is not a failed action but a figure that lies about its own extent.",

		gap: "The display family asks the widest question set of the ten and still leaves one condition out: a display is read, so `read-only` names nothing it could be refused. It also never asks for a missing target or a denied reader, because a figure has no door and no owner.",
	},

	{
		key: "record",

		band: "/THE RECORD",

		href: "/Specimen#record",

		source: "CONTENT/SPECIMEN/RECORD.TS",

		subject:
			"A ledger is believed, not used. A fact that has lost its adverse state is a fact that lies.",

		gap: "The ledger family asks its long values as two arms - `LONG KEY` and `LONG VALUE` - which is the most precise answer on this page and the reason one cell here is read from two columns. It leaves the two arms no matrix asks, because a ledger is believed: it has no action to deny and no target to lose.",
	},

	{
		key: "narrative",

		band: "/THE NARRATIVE",

		href: "/Specimen#narrative",

		source: "CONTENT/SPECIMEN/NARRATIVE.TS",

		subject:
			"A narrative block is the thing a reader is told: a band opens a subject, a stage explains an order, a figure shows evidence.",

		gap: "The narrative family asks what a block says when the world is unkind to the sentence - no media, one step, ninety steps, a failed turn - and leaves the print medium and the action's absence to the page. A band that is read is not a band that is clicked, and a printed band is the page's fact rather than the block's.",
	},

	{
		key: "frame",

		band: "/THE FRAME",

		href: "/Specimen#frame",

		source: "CONTENT/SPECIMEN/FRAME.TS",

		subject:
			"The frame decides whether content can be read at all - and its one law is that nothing here is a card.",

		gap: "The frame family asks its own compositions - no rail, two rails, a shell inside a shell, a pane pair at 640px, a plate with no image - and leaves the states of a record to the record. A shell holds tracks: it states no fact, points at no target, and carries no action of its own.",
	},

	{
		key: "reading",

		band: "/THE READING",

		href: "/Specimen#reading",

		source: "CONTENT/SPECIMEN/READING.TS",

		subject:
			"Furniture fails by losing the reader: a rail that does not say where you are, a folio that does not say how far you have got.",

		gap: "The reading family asks where the reader is - one section, ninety sections, a heading wider than the rail, no summary, no cross-reference, a strip at 640px - and leaves the motion arm to the blocks that move. Furniture that is already in place does not animate into place, and a rail of destinations is not a set a band holds.",
	},

	{
		key: "composition",

		band: "/THE COMPOSITION",

		href: "/Specimen#composition",

		source: "CONTENT/SPECIMEN/COMPOSITION.TS",

		subject:
			"The marketing layer is a layer, not a block: thirty-five `Dynamic/*` parts built to be the schema between content and surface.",

		gap: "The composition family asks the marketing layer's own shapes - no plate, three, nine, at 16, at 240, lone, no action - and asks `NO ACTION` where the other families ask `WITH ACTION`. It leaves the motion arm and the positive action to the blocks it composes: a hero is a page's first sentence, and a first sentence does not animate.",
	},

	{
		key: "small",

		band: "/THE SMALL SURFACES",

		href: "/Specimen#small",

		source: "CONTENT/SPECIMEN/SMALL.TS",

		subject:
			"A small surface fails by being abandoned: the page a reader reaches when they are locked out, and the page nobody designed a second state for.",

		gap: "The small-surface family asks the seven ways a locked-out reader arrives - signed out, signing in, signed in, expired, denied, a failed submit, a missing clause - and leaves the motion arm and the band context to the shell. A credential route is a page, not a chapter, and its transitions are the browser's own navigation.",
	},

	{
		key: "apparatus",

		band: "/THE APPARATUS",

		href: "/Specimen#apparatus",

		source: "CONTENT/SPECIMEN/APPARATUS.TS",

		subject:
			"Apparatus fails by being absent and unnoticed: a motion that does not fire, a provider that was never configured, a trail with no crumbs.",

		gap: "The apparatus family asks what fails silently - reduced motion, no trigger, no image, no logo, unfurled, offline, unconfigured - and leaves the band context to the pages that band it. A provider renders no markup, and a head prints no chapter.",
	},
];

/* ─── THE CELL ───────────────────────────────────────────────────────────── */

/** What the gallery did with one component's one condition. */
export interface Cell {
	/** `built`, `na` (asked and impossible), or `unasked` (no column). */
	readonly disposition: "built" | "na" | "unasked";

	/** Present on `na` and `unasked`: the sentence that explains the cell. */
	readonly reason?: string;

	/** Present on a built cell that needed to say how it was built. */
	readonly note?: string;

	/**
	 * The family's own column(s) this cell was read from. A condition folded
	 * from two arms (`LONG KEY` and `LONG VALUE`) names both, so a reader can
	 * see which question the family actually asked.
	 */
	readonly column?: string;
}

/** A component: one row of one family's matrix, as the gallery reads it. */
export interface Component {
	/** `FRAME/SHELL` - the family's key and the row's name, unique on the page. */
	readonly id: string;

	/** The family the component belongs to. */
	readonly family: FamilyKey;

	/** `SHELL` - the row's name in the sheet's register. */
	readonly name: string;

	/** The file the part is, relative to `Source/`, upper case. */
	readonly file: string;

	/** One line: what the part is, in the sheet's voice. */
	readonly note: string;

	/** The twenty-two cells, by condition. */
	readonly cells: Readonly<Record<ConditionKey, Cell>>;

	/** How many of the twenty-two the component builds. */
	readonly built: number;

	/** How many the family's matrix marks impossible. */
	readonly reasons: number;

	/** How many the family's matrix does not ask. */
	readonly unasked: number;
}

/** A family, as the gallery prints it: its rows, its own columns, its figures. */
export interface Family {
	readonly key: FamilyKey;

	readonly band: string;

	readonly href: string;

	readonly source: string;

	readonly subject: string;

	readonly gap: string;

	/** The components, in the family's own order. */
	readonly components: readonly Component[];

	/** The family's own columns that fold onto the spine. */
	readonly folded: number;

	/** The family's own columns that do not fold - its own subjects. */
	readonly own: readonly { readonly key: string; readonly label: string }[];

	/** How many cells the family's own matrix holds, as it counts them. */
	readonly matrixCells: number;

	/** How many cells the gallery reads for this family (rows × 22). */
	readonly galleryCells: number;

	readonly built: number;

	readonly reasons: number;

	readonly unasked: number;
}

/** The least a family's row has to carry for the gallery to read it. */
interface RowShape {
	readonly name: string;

	readonly note?: string;

	readonly file?: string;

	/** The overlay family names the file `part`; every other family `file`. */
	readonly part?: string;
}

/** The least a family's column has to carry. */
interface ColumnShape {
	readonly key: string;

	readonly label: string;

	readonly ask?: string;

	readonly group?: string;
}

/** The least a family's cell has to carry. */
interface CellShape {
	readonly disposition: "built" | "na";

	readonly reason?: string;

	readonly note?: string;
}

/**
 * Read one family's tables into the gallery's shape.
 *
 * The function is generic over the family's own row, column and cell types, so
 * each of the ten calls is checked against the module it reads and no cast is
 * needed anywhere - which matters, because a cast here would let a family whose
 * `MatrixCell` had changed shape be read as if it had not.
 */
const ReadFamily = <R extends RowShape, C extends ColumnShape>(
	About: FamilyMeta,

	Rows: readonly R[],

	Columns: readonly C[],

	CellOf: (Row: R, Column: C) => CellShape,
): Family => {
	/** The family's columns, grouped by the spine condition each answers. */
	const Answered = new Map<ConditionKey, C[]>();

	/** The columns that are the family's own, in its own order. */
	const Own: { key: string; label: string }[] = [];

	for (const Column of Columns) {
		const Key = Folded(Column.key);

		if (Key === undefined) {
			Own.push({ key: Column.key, label: Column.label });

			continue;
		}

		const Existing = Answered.get(Key);

		if (Existing === undefined) Answered.set(Key, [Column]);
		else Existing.push(Column);
	}

	const Components: readonly Component[] = Rows.map((Row) => {
		const Cells = {} as Record<ConditionKey, Cell>;

		for (const Condition of Conditions) {
			const Answering = Answered.get(Condition.key);

			if (Answering === undefined || Answering.length === 0) {
				Cells[Condition.key] = {
					disposition: "unasked",
					reason: `${About.band} does not ask \`${Condition.label}\`: the family's matrix has no column for it, and /THE UNASKED prints why that family asks what it asks.`,
				};

				continue;
			}

			const Read = Answering.map((Column) => ({
				Column,
				Cell: CellOf(Row, Column),
			}));

			const Built = Read.find(({ Cell }) => Cell.disposition === "built");

			const ColumnLabel = Answering.map((Column) => Column.label).join(
				" / ",
			);

			if (Built !== undefined) {
				Cells[Condition.key] = {
					disposition: "built",
					column: ColumnLabel,
					...(Built.Cell.note === undefined
						? {}
						: { note: Built.Cell.note }),
				};

				continue;
			}

			/**
			 * A cell that cannot exist must carry a sentence. A family that
			 * marked one `na` without a reason has a defect in its matrix, and
			 * the gallery says so rather than printing a blank cell - which is
			 * the same rule the ledger follows for a fact it does not have.
			 */
			const Reason =
				Read.find(({ Cell }) => Cell.reason !== undefined)?.Cell
					.reason ??
				`\`${About.source}\` marks \`${Row.name} / ${ColumnLabel}\` as impossible without writing the reason, which is a defect in the family's matrix rather than a fact about the component.`;

			Cells[Condition.key] = {
				disposition: "na",
				reason: Reason,
				column: ColumnLabel,
			};
		}

		const Count = (Disposition: Cell["disposition"]): number =>
			Conditions.filter(
				(Condition) => Cells[Condition.key].disposition === Disposition,
			).length;

		return {
			id: `${About.key.toUpperCase()}/${Row.name}`,
			family: About.key,
			name: Row.name,
			file: Row.file ?? Row.part ?? "UNAVAILABLE",
			note: Row.note ?? "UNAVAILABLE",
			cells: Cells,
			built: Count("built"),
			reasons: Count("na"),
			unasked: Count("unasked"),
		};
	});

	const Sum = (Pick: (Component: Component) => number): number =>
		Components.reduce((Total, Component) => Total + Pick(Component), 0);

	return {
		key: About.key,

		band: About.band,

		href: About.href,

		source: About.source,

		subject: About.subject,

		gap: About.gap,

		components: Components,

		folded: Answered.size,

		own: Own,

		matrixCells: Rows.length * Columns.length,

		galleryCells: Rows.length * Conditions.length,

		built: Sum((Component) => Component.built),

		reasons: Sum((Component) => Component.reasons),

		unasked: Sum((Component) => Component.unasked),
	};
};

/**
 * The ten families, read from their own tables.
 *
 * The order is `/Specimen`'s, so a reader who uses the two pages together finds
 * the same family in the same place - and the gallery's figures for a family are
 * the family's own rows and columns, counted once more rather than trusted from
 * a sentence.
 */
export const Families: readonly Family[] = [
	ReadFamily(Meta[0]!, Field.Rows, Field.Columns, Field.MatrixCell),

	ReadFamily(Meta[1]!, Overlay.Rows, Overlay.Columns, Overlay.MatrixCell),

	ReadFamily(Meta[2]!, Display.Rows, Display.Columns, Display.MatrixCell),

	ReadFamily(Meta[3]!, Record.Rows, Record.Columns, Record.MatrixCell),

	ReadFamily(
		Meta[4]!,
		Narrative.Rows,
		Narrative.Columns,
		Narrative.MatrixCell,
	),

	ReadFamily(Meta[5]!, Frame.Rows, Frame.Columns, Frame.MatrixCell),

	ReadFamily(Meta[6]!, Reading.Rows, Reading.Columns, Reading.MatrixCell),

	ReadFamily(
		Meta[7]!,

		Composition.Rows,

		Composition.Columns,

		Composition.MatrixCell,
	),

	ReadFamily(Meta[8]!, Small.Rows, Small.Columns, Small.MatrixCell),

	ReadFamily(
		Meta[9]!,
		Apparatus.Rows,
		Apparatus.Columns,
		Apparatus.MatrixCell,
	),
];

/** Every component on the page, in family order then the family's own order. */
export const Components: readonly Component[] = Families.flatMap(
	(Family) => Family.components,
);

/** How many components the gallery reads. */
export const ComponentCount = Components.length;

/** How many families the gallery reads. */
export const FamilyCount = Families.length;

/** How many cells the gallery holds: every component against every condition. */
export const CellCount = ComponentCount * ConditionCount;

/** How many cells a family builds, in total. */
export const BuiltCount = Families.reduce(
	(Total, Family) => Total + Family.built,

	0,
);

/** How many cells are impossible, and carry a written reason. */
export const ReasonCount = Families.reduce(
	(Total, Family) => Total + Family.reasons,

	0,
);

/** How many cells the ten matrices never ask. */
export const UnaskedCount = Families.reduce(
	(Total, Family) => Total + Family.unasked,

	0,
);

/** How many cells the ten matrices print between them, as they count them. */
export const MatrixCellCount = Families.reduce(
	(Total, Family) => Total + Family.matrixCells,

	0,
);

/* ─── THE CONDITIONS, TRANSPOSED ─────────────────────────────────────────── */

/** One condition, counted across the whole document. */
export interface ConditionRow {
	readonly condition: Condition;

	/** How many components build it. */
	readonly built: number;

	/** How many cannot, and say why. */
	readonly reasons: number;

	/** How many are never asked. */
	readonly unasked: number;

	/** The families that build it at all, in family order. */
	readonly families: readonly string[];

	/** The status word's tone, from the site's one register. */
	readonly tone: StatusTone | undefined;
}

/**
 * The spine read down instead of across: one row per condition, with the figure
 * every family contributes.
 *
 * This is the view no family matrix can print - a family knows its own rows, not
 * the document's - and it is what makes a condition's health legible: `DENIED`
 * is asked by no family, `DISABLED` is impossible for more components than it is
 * built for, and `REST` is built by everything because it is the default.
 */
export const ConditionRows: readonly ConditionRow[] = Conditions.map(
	(Condition) => {
		const Read = Components.map(
			(Component) => Component.cells[Condition.key],
		);

		const FamiliesThatBuild = Families.filter((Family) =>
			Family.components.some(
				(Component) =>
					Component.cells[Condition.key].disposition === "built",
			),
		).map((Family) => Family.band);

		return {
			condition: Condition,
			built: Read.filter((Cell) => Cell.disposition === "built").length,
			reasons: Read.filter((Cell) => Cell.disposition === "na").length,
			unasked: Read.filter((Cell) => Cell.disposition === "unasked")
				.length,
			families: FamiliesThatBuild,
			tone:
				Condition.status === undefined
					? undefined
					: Tone(Condition.status),
		};
	},
);

/** The conditions no family matrix asks at all - the brief's one open arm. */
export const UnaskedEverywhere: readonly ConditionRow[] = ConditionRows.filter(
	(Row) => Row.built === 0 && Row.reasons === 0,
);

/* ─── THE REASONS ────────────────────────────────────────────────────────── */

/** One sentence the matrices use to explain a cell that cannot exist. */
export interface Reason {
	/** `01` - the register's mark, printed after `〈`. */
	readonly mark: string;

	/** The sentence, in full. */
	readonly text: string;

	/** The cells it explains, as `FAMILY/COMPONENT / CONDITION`. */
	readonly cells: readonly string[];

	/** How many cells it explains. */
	readonly count: number;
}

/**
 * The sentences that explain more than one cell, in descending order.
 *
 * A reason written once and reused is a fact about a CLASS of parts - "a printed
 * block is not a control" explains ninety-six cells across the document - and
 * those are the sentences worth printing on a term sheet. The reasons that
 * explain one cell each are printed in full inside the component's own row
 * below, and a page that repeated them here would be the same text twice.
 *
 * The grouping is exact: two reasons are one entry when their text is identical.
 * No template is inferred and no sentence is shortened to make a group, because
 * a shortened reason is an excuse rather than a fact.
 */
export const Reasons: readonly Reason[] = (() => {
	const Grouped = new Map<string, string[]>();

	for (const Component of Components) {
		for (const Condition of Conditions) {
			const Cell = Component.cells[Condition.key];

			if (Cell.disposition !== "na" || Cell.reason === undefined)
				continue;

			const Existing = Grouped.get(Cell.reason);

			const Where = `${Component.id} / ${Condition.label}`;

			if (Existing === undefined) Grouped.set(Cell.reason, [Where]);
			else Existing.push(Where);
		}
	}

	return [...Grouped.entries()]
		.filter(([, Cells]) => Cells.length > 1)
		.sort((A, B) => B[1].length - A[1].length)
		.map(([Text, Cells], Index) => ({
			mark: Padded(Index + 1),
			text: Text,
			cells: Cells,
			count: Cells.length,
		}));
})();

/** How many distinct sentences explain the document's impossible cells. */
export const DistinctReasonCount = (() => {
	const Seen = new Set<string>();

	for (const Component of Components) {
		for (const Condition of Conditions) {
			const Cell = Component.cells[Condition.key];

			if (Cell.disposition === "na" && Cell.reason !== undefined)
				Seen.add(Cell.reason);
		}
	}

	return Seen.size;
})();

/** How many distinct sentences explain exactly one cell. */
export const SingleReasonCount = DistinctReasonCount - Reasons.length;

/* ─── THE UNASKED ────────────────────────────────────────────────────────── */

/** One family's unanswered conditions: the work list, per family. */
export interface UnaskedFamily {
	readonly family: Family;

	/** The conditions the family's matrix has no column for. */
	readonly conditions: readonly Condition[];

	/** How many of the family's cells that is. */
	readonly cells: number;
}

/**
 * The work list: every condition a family never asks, with the number of its own
 * components the answer would cover.
 *
 * Sorted by the size of the hole rather than by family order, because a card
 * that picks this up should start where the most cells are unaccounted for.
 */
export const Unasked: readonly UnaskedFamily[] = Families.map((Family) => {
	const Conditions2 = Conditions.filter((Condition) =>
		Family.components.every(
			(Component) =>
				Component.cells[Condition.key].disposition === "unasked",
		),
	);

	return {
		family: Family,
		conditions: Conditions2,
		cells: Conditions2.length * Family.components.length,
	};
}).sort((A, B) => B.cells - A.cells);

/* ─── WHAT THE EXPLORATION CHANGED ───────────────────────────────────────── */

/** One behaviour the gallery's view of the document produced. */
export interface Improvement {
	/** The component the behaviour is in. */
	readonly component: string;

	/** The condition that revealed it, in the sheet's register. */
	readonly from: string;

	/** What the exploration found. */
	readonly found: string;

	/** What the component does about it now. */
	readonly now: string;
}

/**
 * The behaviours that only became visible once every component was on one page.
 *
 * Each one names the condition behind it, because an improvement with no cell
 * behind it is a preference - and each one lives INSIDE the component it names,
 * not in a wrapper around it.
 */
export const Improvements: readonly Improvement[] = [
	{
		component: "ShellState",

		from: "STALE",

		found: "The stale arm printed `AS OF:` and `AGE:` only when the caller had already worked the age out - and two callers did it before handing the date over (`Specimen.astro` with its own `AgeInDays`, `EdgeLeaf` through `EdgeDaysBetween`). A block that cannot derive its own figure is a block that asks every caller to.",

		now: "`asOf` alone now prints `AGE: n DAYS`, derived in the block from the date it was given; `age` still wins where a caller knows better, so no existing rendering changes.",
	},

	{
		component: "ShellState",

		from: "MANY",

		found: "The too-much arm printed `SHOWING: 6 OF 212` and then a `NEXT:` link, leaving the remainder as a subtraction the reader had to do before deciding whether to follow the door.",

		now: "The arm prints `ALL:` above the door with the figure it holds - `206 MORE` - computed from `total - shown`, so the set's size is stated once and the door says what it opens onto.",
	},

	{
		component: "SpecimenGallery",

		from: "ALL",

		found: `At ${ComponentCount} components and ${CellCount} cells the family matrices' footnote anatomy stops scaling: a numbered note per cell would be thousands of numbers to chase, and a table that prints every reason in its cell is a table with no cells.`,

		now: "Each component is a disclosure. Closed, the row prints its mark, its name, its file and its strip of cells. Open, it prints every condition with its note or its reason in full - so the reason is one keystroke away and never truncated.",
	},

	{
		component: "SpecimenGallery",

		from: "NARROW",

		found: `Twenty-two columns do not fit a narrow measure, and a grid that shrinks them below the type floor stops being readable - the failure the family matrices avoid by scrolling.`,

		now: "The strip is a fixed grid inside its own scroll frame with the component's name pinned to the leading edge, so the page never scrolls sideways and the strip always does.",
	},

	{
		component: "SpecimenGallery",

		from: "NO ACTION",

		found: "A strip of twenty-two glyphs is a wall to a screen reader, and a row whose only affordance is a mouse target is a row a keyboard reader cannot open.",

		now: "The row is a `<details>`/`<summary>` - the browser's own disclosure, reachable with Tab and Enter - and the glyph strip is `aria-hidden`, with the summary carrying `17 OF 22 BUILT` as its accessible figure.",
	},

	{
		component: "Content/Specimen/Gallery.ts",

		from: "DENIED",

		found: "Ten matrices wrote ten question sets, and the union is larger than any one of them: no family asks the brief's `MISSING` arm, one asks `DENIED`, and `READ-ONLY` is asked by most of them and impossible in six. The hole was invisible from inside any single file.",

		now: "The gallery asks all twenty-two of every component and records the unanswered ones as `UNASKED` with the family that owes the answer - so the hole is counted on the sheet instead of being invisible in ten separate files.",
	},
];

/** What the gallery found and did not fix, and whose decision it is. */
export interface Observation {
	readonly subject: string;

	readonly note: string;

	readonly owner: string;
}

/**
 * The observations this card did not act on.
 *
 * A card that fixes everything it notices is a card that has not said what it
 * noticed. These are the three things the unified view made obvious and this
 * card deliberately left alone.
 */
export const Observations: readonly Observation[] = [
	{
		subject: "THE TEN QUESTION SETS",

		note: "The families' matrices disagree about what to ask - `READ-ONLY` is asked by four of ten, `REDUCED` by six, `NO ACTION` by three. Converging them means editing ten tables that each print their own figures on `/Specimen`, and that is a card of its own rather than a side effect of this one.",

		owner: "a later card, with `/Specimen`'s ten matrices in scope",
	},

	{
		subject: "THE TWO OPEN ARMS",

		note: "`MISSING` is the brief's arm that no family matrix asks, and `DENIED` is asked by one - the small surfaces, for a reader who may not see a page. `ShellState` renders both, and `ShellRail` already prints `◎` for a row that is gone, so the capability exists and only the accounting does not.",

		owner: "the card that converges the question sets",
	},

	{
		subject: "THE DUPLICATED REASONS",

		note: "Seventy-five column keys fold into twenty-two conditions, but the reasons behind them do not fold at all: the same fact is written out per component (`A ${what} is not a control`), which is why the document needs its distinct sentences counted rather than its sentences shared. Extracting the parameterised bases would shrink the reason register and is a refactor of ten files.",

		owner: "a later card, after the question sets converge",
	},
];

/* ─── THE WALL ───────────────────────────────────────────────────────────── */

/** The nine arms `ShellState` renders, as the wall mounts them. */
export type Adverse =
	| "empty"
	| "loading"
	| "partial"
	| "error"
	| "stale"
	| "too-much"
	| "too-long"
	| "missing"
	| "denied";

/** One live row of the wall: the condition, the artifact, and when it is right. */
export interface WallRow {
	/** `WALL_01` - the row's own mark, printed at its head. */
	readonly mark: string;

	/** The condition the row demonstrates. */
	readonly condition: ConditionKey;

	/** The artifact that owns the condition, in the sheet's register. */
	readonly component: string;

	/** One line saying when this state is right. The row's whole justification. */
	readonly when: string;

	/** Which block the row mounts. The renderer switches on it and nothing else. */
	readonly kind: "state" | "field" | "ledger" | "print" | "skeleton";

	/** The stage the row is printed on: a real column, a band, or a card. */
	readonly stage?: "narrow" | "band" | "wide" | "card";

	/** The `ShellState` arm, where the row mounts one. */
	readonly state?: {
		readonly kind: Adverse;

		readonly index: string;

		readonly statement: string;

		readonly cause?: string;

		readonly next?: { readonly label: string; readonly href: string };

		readonly rows?: readonly LedgerRow[];

		readonly shown?: number;

		readonly total?: number;

		readonly value?: string;

		readonly limit?: string;

		readonly asOf?: string;

		readonly keys?: readonly string[];

		readonly surface?: "box" | "bare";

		readonly dense?: boolean;
	};

	/** The control, where the row mounts a field. */
	readonly field?: {
		readonly label: string;

		readonly value: string;

		readonly disabled?: boolean;

		readonly readonly?: boolean;

		readonly hint?: string;
	};

	/** The ledger, where the row mounts one. */
	readonly ledger?: {
		readonly rows: readonly LedgerRow[];

		readonly label: string;
	};
}

/**
 * The twenty-two live rows.
 *
 * Each condition is mounted on the artifact that OWNS it rather than on the
 * component that happens to be nearest: `EMPTY` is `ShellState`'s, `STALE` is
 * `ShellState`'s stale arm, `READ-ONLY` is a field's, `ON PAPER` is the print
 * layer's, `REDUCED` is the skeleton's. Two of the twenty-two - `ON PAPER` and
 * `REDUCED` - cannot be photographed on screen at all, and their rows print the
 * contract they expose instead of pretending a screenshot would show it.
 */
export const Wall: readonly WallRow[] = [
	{
		mark: "WALL_01",

		condition: "rest",

		component: "RECORDLEDGER",

		when: Conditions[0]!.when,

		kind: "ledger",

		stage: "band",

		ledger: {
			label: "THE RECORD",

			rows: [
				{ key: "TARGET:", value: "MACOS / AARCH64" },

				{ key: "LICENSE:", value: "CC0" },

				{ key: "STATUS:", value: "ACTIVE" },
			],
		},
	},

	{
		mark: "WALL_02",

		condition: "empty",

		component: "SHELLSTATE",

		when: Conditions[1]!.when,

		kind: "state",

		stage: "band",

		state: {
			kind: "empty",

			index: "RELEASES / 00",

			statement:
				"No build is published yet, so this record holds no release.",

			cause: "Every build so far has been made from source. The first published artifact will appear here with its checksum and its signing status.",

			next: { label: "READ THE SOURCE", href: "/Download" },

			rows: [
				{ key: "CHANNEL:", value: "PUBLIC" },

				{ key: "SIGNING:", value: "PLANNED" },
			],
		},
	},

	{
		mark: "WALL_03",

		condition: "loading",

		component: "SHELLSTATE",

		when: Conditions[2]!.when,

		kind: "state",

		stage: "band",

		state: {
			kind: "loading",

			index: "RELEASES / 04",

			statement: "The release register has not arrived yet.",

			cause: "Waiting on the build manifest.",

			keys: ["TARGET:", "LICENSE:", "SIGNING:", "CHECKSUM:"],
		},
	},

	{
		mark: "WALL_04",

		condition: "partial",

		component: "SHELLSTATE",

		when: Conditions[3]!.when,

		kind: "state",

		stage: "band",

		state: {
			kind: "partial",

			index: "RELEASES / 04",

			statement:
				"Three of the four facts are known and the fourth is not.",

			cause: "The signing identity has not been published, so the checksum cannot be verified against it.",

			next: { label: "READ THE CHANNEL", href: "/Download" },

			rows: [
				{ key: "TARGET:", value: "MACOS / AARCH64" },

				{ key: "LICENSE:", value: "CC0" },

				{ key: "CHECKSUM:", value: "UNAVAILABLE" },
			],
		},
	},

	{
		mark: "WALL_05",

		condition: "error",

		component: "SHELLSTATE",

		when: Conditions[4]!.when,

		kind: "state",

		stage: "band",

		state: {
			kind: "error",

			index: "VERIFY / 02",

			statement:
				"The checksum did not match the file that was downloaded.",

			cause: "The transfer completed but the digest differs from the published one, which means the bytes changed on the way.",

			next: { label: "DOWNLOAD AGAIN", href: "/Download" },
		},
	},

	{
		mark: "WALL_06",

		condition: "stale",

		component: "SHELLSTATE",

		when: Conditions[5]!.when,

		kind: "state",

		stage: "band",

		state: {
			kind: "stale",

			index: "COMPARE / 06",

			statement: "The last known compatibility reading, kept visible.",

			cause: "The measurement is older than this build.",

			asOf: "2026-01-06",

			rows: [
				{ key: "EXTENSIONS:", value: "UNMODIFIED" },

				{ key: "VS CODE API:", value: "1.94" },
			],
		},
	},

	{
		mark: "WALL_07",

		condition: "disabled",

		component: "DYNAMICINPUT",

		when: Conditions[6]!.when,

		kind: "field",

		stage: "narrow",

		field: {
			label: "HANDLE",

			value: "UNAVAILABLE",

			disabled: true,

			hint: "The account directory has not been read, so the handle is not known yet.",
		},
	},

	{
		mark: "WALL_08",

		condition: "readonly",

		component: "DYNAMICINPUT",

		when: Conditions[7]!.when,

		kind: "field",

		stage: "narrow",

		field: {
			label: "EMAIL",

			value: "reader@editor.land",

			readonly: true,

			hint: "A verified address is a fact the reader may check and may not edit here.",
		},
	},

	{
		mark: "WALL_09",

		condition: "missing",

		component: "SHELLSTATE",

		when: Conditions[8]!.when,

		kind: "state",

		stage: "band",

		state: {
			kind: "missing",

			index: "DOC / 41",

			statement:
				"The article this index row pointed at is no longer in the collection.",

			cause: "The slug was filed against a page that was later retired, and the address now resolves to nothing.",

			next: { label: "READ THE INDEX", href: "/Doc" },

			rows: [{ key: "WAS:", value: "/Doc/legacy-cli" }],
		},
	},

	{
		mark: "WALL_10",

		condition: "denied",

		component: "SHELLSTATE",

		when: Conditions[9]!.when,

		kind: "state",

		stage: "band",

		state: {
			kind: "denied",

			index: "DASHBOARD / 01",

			statement:
				"The dashboard is the account's own instrument: its build status, its channels and its quota.",

			cause: "This session is signed out, so the instrument exists and this reader may not read it.",

			next: { label: "SIGN IN", href: "/SignIn" },
		},
	},

	{
		mark: "WALL_11",

		condition: "one",

		component: "RECORDLEDGER",

		when: Conditions[10]!.when,

		kind: "ledger",

		stage: "narrow",

		ledger: {
			label: "THE FACTS",

			rows: [{ key: "TARGET:", value: "MACOS / AARCH64" }],
		},
	},

	{
		mark: "WALL_12",

		condition: "many",

		component: "SHELLSTATE",

		when: Conditions[11]!.when,

		kind: "state",

		stage: "band",

		state: {
			kind: "too-much",

			index: "REGISTER / 212",

			statement:
				"The register holds two hundred and twelve routes and this band was drawn for six.",

			cause: "Filed by prefix, so the first window is the alphabetical head of the set.",

			shown: 6,

			total: 212,

			next: { label: "READ THE WHOLE REGISTER", href: "/Contents" },
		},
	},

	{
		mark: "WALL_13",

		condition: "long",

		component: "SHELLSTATE",

		when: Conditions[12]!.when,

		kind: "state",

		stage: "band",

		state: {
			kind: "too-long",

			index: "PATHS / 07",

			statement:
				"One path in the tree is longer than the column that holds it.",

			value: "Source/Component/Dynamic/Interface/Content/Page/PortalData.ts",

			limit: "72CH",

			next: { label: "READ THE TREE", href: "/Doc" },
		},
	},

	{
		mark: "WALL_14",

		condition: "narrow",

		component: "SHELLSTATE",

		when: Conditions[13]!.when,

		kind: "state",

		stage: "narrow",

		state: {
			kind: "partial",

			index: "ASIDE / 01",

			statement:
				"Printed in a 16rem column, where the key cannot sit beside its value.",

			cause: "The state's own container is narrow, not the viewport.",

			rows: [
				{ key: "TARGET:", value: "MACOS / AARCH64" },

				{ key: "CHECKSUM:", value: "UNAVAILABLE" },
			],

			dense: true,
		},
	},

	{
		mark: "WALL_15",

		condition: "wide",

		component: "SHELLSTATE",

		when: Conditions[14]!.when,

		kind: "state",

		stage: "wide",

		state: {
			kind: "stale",

			index: "COMPARE / 06",

			statement:
				"Printed across a wide band, where the rows are read across.",

			cause: "The same state at the band's own measure.",

			asOf: "2026-01-06",

			rows: [
				{ key: "EXTENSIONS:", value: "UNMODIFIED" },

				{ key: "VS CODE API:", value: "1.94" },
			],
		},
	},

	{
		mark: "WALL_16",

		condition: "dense",

		component: "SHELLSTATE",

		when: Conditions[15]!.when,

		kind: "state",

		stage: "card",

		state: {
			kind: "empty",

			index: "CARD / 00",

			statement:
				"The tight step, inside a card: the same rows, one step less air.",

			cause: "Nothing is dropped to make it fit - the step is padding, not type.",

			dense: true,

			surface: "bare",
		},
	},

	{
		mark: "WALL_17",

		condition: "incard",

		component: "SHELLSTATE",

		when: Conditions[16]!.when,

		kind: "state",

		stage: "card",

		state: {
			kind: "denied",

			index: "CARD / 01",

			statement:
				"A state printed inside a Jelly card: no fill and no frame of its own, because a white box in a white card is a card in a card.",

			cause: "The card is the surface; the state is a section of it.",

			surface: "bare",
		},
	},

	{
		mark: "WALL_18",

		condition: "inband",

		component: "SHELLSTATE",

		when: Conditions[17]!.when,

		kind: "state",

		stage: "band",

		state: {
			kind: "empty",

			index: "BAND / 00",

			statement:
				"A state inside a band: the band supplies the interval, the state supplies the record.",

			cause: "The band's heading is above; the state is what its body holds.",

			surface: "bare",
		},
	},

	{
		mark: "WALL_19",

		condition: "withaction",

		component: "SHELLSTATE",

		when: Conditions[18]!.when,

		kind: "state",

		stage: "band",

		state: {
			kind: "error",

			index: "VERIFY / 03",

			statement: "The same failure, with the one door it can offer.",

			cause: "One action per artifact, and it is the thing the reader would do next.",

			next: { label: "RETRY THE CHECK", href: "/Verify" },
		},
	},

	{
		mark: "WALL_20",

		condition: "noaction",

		component: "SHELLSTATE",

		when: Conditions[19]!.when,

		kind: "state",

		stage: "band",

		state: {
			kind: "partial",

			index: "VERIFY / 04",

			statement:
				"The same partial state with no door at all: a record that is read rather than acted on.",

			cause: "Nothing on this surface can change the fact, so offering a link would be a door onto a wall.",

			rows: [{ key: "SIGNING:", value: "UNAVAILABLE" }],
		},
	},

	{
		mark: "WALL_21",

		condition: "print",

		component: "PRINTRECORD",

		when: Conditions[20]!.when,

		kind: "print",

		stage: "band",
	},

	{
		mark: "WALL_22",

		condition: "reduced",

		component: "MOTIONSKELETON",

		when: Conditions[21]!.when,

		kind: "skeleton",

		stage: "band",
	},
];

/** How many live rows the wall prints. */
export const WallCount = Wall.length;

/* ─── THE PAGE'S COPY ────────────────────────────────────────────────────── */

/** The gallery's opening, in the sheet's own grammar. */
export const Head = {
	index: "# SPECIMEN_02",

	title: "Every component, every state",

	proposition: `One page for the whole document: ${ComponentCount} components against the ${ConditionCount} conditions they are asked, read from the ten family matrices rather than written again - so a cell here and a cell there are the same cell, and the term sheet cannot drift from the evidence.`,
} as const;

/** The gallery's bands, in the order they are read. */
export const Bands = {
	Spine: {
		kicker: "/THE SPINE",

		interval: "turn",

		heading: `The ${ConditionCount} conditions`,

		standfirst: `Ten matrices ask seventy-five column keys between them, and those keys fold onto ${ConditionCount} conditions - \`oneitem\` is \`one\`, \`longtext\` is \`long\`, \`card\` is \`incard\`, \`reduced\` is \`reducedmotion\`. The spine is the fold, printed: what each condition asks, the status word it answers to where it has one, and the one line that says when the state is right.`,

		footnote:
			"A condition without a status word is not a gap in the register - it is a shape, and a shape has no tone. Eight words state a record's condition; a column width is not one.",
	},

	Sheet: {
		kicker: "/THE SHEET",

		interval: "rest",

		heading: `Ten families, ${ConditionCount} conditions`,

		standfirst:
			"The same grid at family scale: each cell is the number of that family's components that build the condition, over the number it holds. This is the term sheet's first page - a reader can see where a family is thin before reading a single component.",

		footnote:
			"A family's own conditions are not on this sheet, and that is the point of it: the spine is what the ten matrices have in common, and each family's own columns stay on its own matrix where they are the subject.",
	},

	Catalog: {
		kicker: "/THE CATALOG",

		interval: "break",

		heading: "Every component, one row",

		standfirst: `One disclosure per component, in family order. Closed, the row is a strip of ${ConditionCount} cells and a figure. Open, it is the component's whole ledger: what it is, the file it lives in, and every condition with its note or its reason in full.`,

		footnote:
			"Nothing is truncated to fit a cell. The strip is the scan and the open row is the evidence - which is the only arrangement that survives four thousand cells.",
	},

	Reasons: {
		kicker: "/THE REASONS",

		interval: "rest",

		heading: "The sentences that explain a class",

		standfirst:
			"A reason written once and reused is a fact about a class of parts, not about one part: a printed block is not a control, a mark has no text state, a leaf cannot be a set. Those sentences are printed here in full, with every cell each one explains.",

		footnote:
			"The grouping is exact - two reasons are one entry when their text is identical - so nothing is inferred and no sentence is shortened to make a group. A reason that explains a single cell is printed in full inside that component's own row above.",
	},

	Unasked: {
		kicker: "/THE UNASKED",

		interval: "rest",

		heading: "What no matrix asks",

		standfirst:
			"The third answer, and the honest one: a condition a family's matrix has no column for is not built and not impossible - it is unanswered. This band is the work list, per family, with the number of that family's components the answer would cover.",

		footnote:
			"A term sheet that printed only what it knew would be a shorter document and a worse one. The holes are counted on the sheet because a hole in ten separate files is invisible from all ten.",
	},

	Wall: {
		kicker: "/THE WALL",

		interval: "break",

		heading: "The conditions, mounted",

		standfirst:
			"Twenty-two rows, one per condition, each on the artifact that owns it rather than on the component nearest to hand: `EMPTY` is the state block's, `READ-ONLY` is a field's, `ON PAPER` is the print layer's, `REDUCED` is the skeleton's.",

		footnote:
			"Two of the twenty-two cannot be photographed on screen at all. Their rows print the contract they expose, because a picture of a print stylesheet is a picture of nothing.",
	},

	Improvements: {
		kicker: "/THE IMPROVEMENTS",

		interval: "rest",

		heading: "What the whole document revealed",

		standfirst:
			"Six behaviours that only became visible once every component was on one page. Each names the condition behind it, because an improvement with no cell behind it is a preference.",

		footnote:
			"Every one of them lives inside the component it names. A behaviour that needs a wrapper is a behaviour the component does not have.",
	},

	Register: {
		kicker: "/THE REGISTER",

		interval: "break",

		heading: "What the gallery counted",

		standfirst:
			"Every figure on this page, and the ten files it was counted from. A number written into the page would be the one figure on the sheet that could disagree with the sheet.",

		footnote:
			"The gallery reads; it does not decide. Where a family's matrix says nothing, the cell says so - and the sentence that says so names the family rather than blaming the component.",
	},
} as const;

/** The register's rows, derived from the tables above. */
export const Register = (): readonly LedgerRow[] => [
	{ key: "COMPONENTS:", value: String(ComponentCount) },

	{ key: "CONDITIONS:", value: String(ConditionCount) },

	{ key: "CELLS:", value: String(CellCount) },

	{ key: "BUILT:", value: String(BuiltCount) },

	{ key: "NOT APPLICABLE:", value: String(ReasonCount) },

	{ key: "UNASKED:", value: String(UnaskedCount) },

	{ key: "DISTINCT REASONS:", value: String(DistinctReasonCount) },

	{ key: "SHARED REASONS:", value: String(Reasons.length) },

	{ key: "FAMILY MATRICES:", value: `${MatrixCellCount} CELLS` },

	{ key: "SOURCE:", value: "CONTENT/SPECIMEN/*.TS", code: true },
];

/** The gallery's four doors, for the page's foot. */
export const Onward = {
	rows: [
		{
			mark: "/",

			want: "THE SHEET THIS PAGE INDEXES",

			where: "SPECIMEN",

			href: "/Specimen",

			note: "The ten family matrices, their plates, their absences and their own registers.",
		},

		{
			mark: "/",

			want: "THE MANUAL THE COMPONENTS PRINT",

			where: "DOC",

			href: "/Doc",

			note: "The document the states are about: its articles, its rail and its folio.",
		},

		{
			mark: "/",

			want: "THE RECORD THE STATES ARE ABOUT",

			where: "DOWNLOAD",

			href: "/Download",

			note: "The manifest, its checksums and the one sentence that says nothing is downloadable yet.",
		},

		{
			mark: "/",

			want: "EVERY ADDRESS THIS SITE ANSWERS ON",

			where: "CONTENTS",

			href: "/Contents",

			note: "The index: every route, filed by chapter, with the forms each one mounts.",
		},
	],

	copy: {
		index: "# ONWARD / 04",

		label: "/THE REST OF THE DOCUMENT",

		statement:
			"The gallery is the index of the sheet and the sheet is the index of the document. Every cell on this page resolves to a row, and every row resolves to a file.",

		note: "SOURCE: CONTENT/SPECIMEN/GALLERY.TS",

		empty: "No door is filed, which is the one absence this register cannot state honestly - a register with no destination is a page that has decided the reader is finished.",
	},
} as const;
