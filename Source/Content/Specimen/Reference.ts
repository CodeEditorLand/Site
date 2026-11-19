/**
 * Reference - the component reference: one entry per family, generated from the
 * same tables the states gallery reads.
 *
 * ─── WHY THIS MODULE EXISTS, AND WHY IT IS NOT A SECOND OPINION ───────────
 * `/Specimen` prints ten matrices, `/Specimen/States` folds them onto one spine,
 * and neither answers the question a contributor actually arrives with before
 * touching a component: *what is this family for, what may I put in it, what is
 * it already asked to survive, and what may it never be?* The matrices answer
 * the third question cell by cell and the fourth by accident - a cell marked
 * impossible is a family saying what its parts may never be, and nobody had
 * collected those sentences in one place.
 *
 * So this module writes the reference the exploration earned, and it derives
 * every figure, every condition, every slot, every prohibition and every proof
 * row from the family modules themselves. The rule the gallery set for itself
 * is the rule here: a cell on this page and a cell on the family's matrix are
 * the same cell, read twice. A number typed into this file would be the one
 * figure in the reference that could disagree with the reference.
 *
 * ─── WHAT IS DERIVED, AND WHAT IS CHOSEN ──────────────────────────────────
 * Derived:
 *   - the family's purpose and its "what it is read for" line, from
 *     `Families.ts`, which is the sheet's own index - the full sentence the band
 *     argues, never the gallery's condensed `subject`, because a shortened
 *     sentence is the one thing a reference may not print;
 *   - its slots - the parts a page may mount - from the rows of its matrix,
 *     through the gallery's `Component` (name, file, note, cells);
 *   - its states and its combinations, from its own `Columns`, with the figure
 *     each column is built by;
 *   - what it may never be, from its own `N/A` cells grouped by the
 *     sentence that explains them - the family's own words, never a paraphrase;
 *   - its figures, its unasked conditions, its improvements;
 *   - the proof row's state, component and sentence, resolved from the family's
 *     own `Specimens` by mark.
 *
 * Chosen, and only chosen: which specimen row proves a family (`Proof`) and the
 * one line saying why it proves it (`ProofWhy`). That is a judgement, and it is
 * the reference's contribution - but the row it names is looked up, so a mark
 * that moves out of the family leaves `◎ PROOF: UNAVAILABLE` behind rather than
 * a pointer to a row that no longer exists.
 *
 * ─── THE FIVE QUESTIONS, IN THE ORDER A CONTRIBUTOR ASKS THEM ─────────────
 *   FOR            what the family is for, in the sheet's own voice
 *   SLOTS          the parts, each with the file it lives in
 *   ASKED          the states it is asked, and the combinations it is composed at
 *   NEVER          the sentences its own matrix uses to forbid a combination
 *   PROOF          the one live row that shows the family surviving its worst case
 *
 * ─── NO FIGURE IS TYPED HERE ──────────────────────────────────────────────
 * Every count is a `.length` or a `.filter(...).length` over the tables above.
 * A component added to `Frame.ts` moves this reference's figures, its slot list,
 * its matrix, its laws and its proof lookup in the same edit, and a condition
 * added to a family's `Columns` appears here with no second edit.
 */
import type { LedgerRow } from "../../Component/Record/Type.js";

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

import * as Gallery from "./Gallery.js";

import { Families as Sheet } from "./Families.js";

/* ─── THE SHAPES ─────────────────────────────────────────────────────────── */

/** One part a page may mount: the family's slot list. */
export interface Slot {
	/** `LEDGER` - the row's name in the sheet's register. */
	readonly name: string;

	/** The file the part is, relative to `Source/`, upper case. */
	readonly file: string;

	/** One line: what the part is, in the sheet's voice. */
	readonly note: string;

	/** How many of the spine's conditions it builds. */
	readonly built: number;

	/** How many it cannot, and says why. */
	readonly reasons: number;

	/** How many its family's matrix never asks. */
	readonly unasked: number;

	/** The spine's condition count, so a slot can state `9 OF 22`. */
	readonly of: number;
}

/** One column of a family's own matrix, with the figure it is built by. */
export interface Asked {
	/** The column's key, as the family wrote it. */
	readonly key: string;

	/** `READ-ONLY` - the head, as the family prints it. */
	readonly label: string;

	/** One line under the head: what the cell asks. */
	readonly ask: string;

	/** Which set the column belongs to: `condition`, `shape`, `context`, ... */
	readonly group: string;

	/** How many of the family's components build it. */
	readonly built: number;

	/** How many the family holds. */
	readonly of: number;
}

/** One sentence a family uses to mark a combination impossible. */
export interface Law {
	/** The sentence, in full. Never shortened, never paraphrased. */
	readonly text: string;

	/** The cells it explains, as `COMPONENT / CONDITION`. */
	readonly cells: readonly string[];

	/** How many cells it explains. */
	readonly count: number;
}

/** The specimen row that proves a family. */
export interface Proof {
	/** `READ_06` - the row's own mark. */
	readonly mark: string;

	/** The state or combination, in the sheet's register. */
	readonly state: string;

	/** The part the row mounts. */
	readonly component: string;

	/** One line saying when the state is right - the row's own justification. */
	readonly when: string;

	/** Why this row is the family's proof, in one sentence. */
	readonly why: string;
}

/** One behaviour the family's own matrix revealed, as the family records it. */
export interface Change {
	readonly component: string;

	readonly from: string;

	readonly found: string;

	readonly built: string;
}

/** One cell of the family's own matrix, as the reference prints it. */
export interface Cell {
	/** `built`, `na`, or `unasked` for a condition the family never asks. */
	readonly disposition: "built" | "na" | "unasked";

	/** On `na`: the index of the law that explains it, in this family's list. */
	readonly law?: number;

	/** On `built`: the family's own note, where it wrote one. */
	readonly note?: string;
}

/** One row of the family's own matrix. */
export interface MatrixRow {
	readonly name: string;

	readonly cells: readonly Cell[];
}

/** A family, as the reference states it. */
export interface Entry {
	/** `field` - the family's key, as the gallery and the family module name it. */
	readonly key: Gallery.FamilyKey;

	/** `# 05` - the family's mark, counted from the sheet's own index. */
	readonly index: string;

	/** `/THE FIELD` - the band's kicker, exactly as `/Specimen` prints it. */
	readonly band: string;

	/** Where the family's own matrix is printed. */
	readonly href: string;

	/** The file the family's matrix is written in. */
	readonly source: string;

	/** What the family is for: the full sentence its band argues. */
	readonly for: string;

	/** What it is read for: the sheet's own second line. */
	readonly read: string;

	/** The boundary of what the family asks, and why. */
	readonly gap: string;

	/** The parts a page may mount, in the family's own order. */
	readonly slots: readonly Slot[];

	/** The states the family is asked: its `condition` columns. */
	readonly states: readonly Asked[];

	/** The combinations it is composed at: every other column. */
	readonly combinations: readonly Asked[];

	/** What it may never be, in its own words: every sentence its matrix uses. */
	readonly laws: readonly Law[];

	/**
	 * The strongest of those laws - the four that explain the most cells.
	 *
	 * The entry prints these; the matrix resolves every cell against `laws`, so
	 * a prohibition that explains one cell is still printed and still numbered,
	 * it just does not lead the section.
	 */
	readonly strongest: readonly Law[];

	/** The row that proves it, or `undefined` when the mark has moved. */
	readonly proof?: Proof;

	/** Present exactly when `proof` is absent: which mark could not be found. */
	readonly proofAbsent?: string;

	/** The behaviours the family's own exploration produced. */
	readonly changes: readonly Change[];

	/** The groups the family prints its live rows in, and what each asks. */
	readonly groups: readonly {
		readonly label: string;

		readonly note: string;
	}[];

	/** The family's matrix, as rows of its own columns. */
	readonly matrix: {
		readonly columns: readonly Asked[];

		readonly rows: readonly MatrixRow[];
	};

	/** Every figure the entry prints, counted from the tables above. */
	readonly figures: {
		readonly components: number;

		/** The family's own columns: states and combinations together. */
		readonly columns: number;

		/** The family's own matrix: rows × its own columns. */
		readonly cells: number;

		readonly built: number;

		readonly reasons: number;

		/**
		 * The same components read against the gallery's spine of twenty-two.
		 *
		 * A different denominator from the figures above, and printed as a
		 * different line: the family asks its own questions, the spine asks the
		 * document's, and a page that added the two would be counting one
		 * component twice.
		 */
		readonly spine: {
			readonly of: number;

			readonly built: number;

			readonly reasons: number;

			readonly unasked: number;
		};

		readonly specimens: number;

		readonly groups: number;

		readonly laws: number;

		readonly changes: number;
	};
}

/* ─── WHAT A FAMILY MODULE HAS TO CARRY ──────────────────────────────────── */

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

/** The least a family's row has to carry. */
interface RowShape {
	readonly name: string;
}

/** The least a family's specimen has to carry. */
interface SpecShape {
	readonly mark: string;

	readonly component: string;

	readonly when: string;

	readonly group?: string;

	/** The families that name it `state_name`, and the three that name it `state`. */
	readonly state_name?: string;

	readonly state?: string;
}

/** The least an improvement has to carry. */
interface ChangeShape {
	readonly component: string;

	readonly from: string;

	readonly found: string;

	readonly built: string;
}

/** The least a group has to carry. */
interface GroupShape {
	readonly label: string;

	readonly note: string;
}

/** One family module, read through the shapes above. */
interface Source {
	readonly key: Gallery.FamilyKey;

	readonly rows: readonly RowShape[];

	readonly columns: readonly ColumnShape[];

	readonly cell: (Row: never, Column: never) => CellShape;

	readonly specimens: readonly SpecShape[];

	readonly groups: readonly GroupShape[];

	readonly changes?: readonly ChangeShape[];
}

/**
 * The ten families, in `/Specimen`'s order.
 *
 * Each entry names the module and hands its tables over as the shapes above, so
 * the reference reads a family's own `Columns`, `Rows`, `MatrixCell` and
 * `Specimens` rather than a copy of them. `cell` is typed loosely on purpose:
 * each family's `MatrixCell` takes its own row and column types, and a cast at
 * the call would let a family whose signature changed be read as if it had not.
 * The functions are invoked with the family's own row and column objects, which
 * is the only contract that matters at runtime.
 */
const Sources: readonly Source[] = [
	{
		key: "field",

		rows: Field.Rows,

		columns: Field.Columns,

		cell: Field.MatrixCell as unknown as Source["cell"],

		specimens: Field.Specimens,

		groups: Field.Groups,
	},

	{
		key: "overlay",

		rows: Overlay.Rows,

		columns: Overlay.Columns,

		cell: Overlay.MatrixCell as unknown as Source["cell"],

		specimens: Overlay.Specimens,

		groups: Overlay.Groups,
	},

	{
		key: "display",

		rows: Display.Rows,

		columns: Display.Columns,

		cell: Display.MatrixCell as unknown as Source["cell"],

		specimens: Display.Specimens,

		groups: Display.Groups,
	},

	{
		key: "record",

		rows: Record.Rows,

		columns: Record.Columns,

		cell: Record.MatrixCell as unknown as Source["cell"],

		specimens: Record.Specimens,

		groups: Record.Groups,

		changes: Record.Improvements,
	},

	{
		key: "narrative",

		rows: Narrative.Rows,

		columns: Narrative.Columns,

		cell: Narrative.MatrixCell as unknown as Source["cell"],

		specimens: Narrative.Specimens,

		groups: Narrative.Groups,

		changes: Narrative.Improvements,
	},

	{
		key: "frame",

		rows: Frame.Rows,

		columns: Frame.Columns,

		cell: Frame.MatrixCell as unknown as Source["cell"],

		specimens: Frame.Specimens,

		groups: Frame.Groups,

		changes: Frame.Improvements,
	},

	{
		key: "reading",

		rows: Reading.Rows,

		columns: Reading.Columns,

		cell: Reading.MatrixCell as unknown as Source["cell"],

		specimens: Reading.Specimens,

		groups: Reading.Groups,

		changes: Reading.Improvements,
	},

	{
		key: "composition",

		rows: Composition.Rows,

		columns: Composition.Columns,

		cell: Composition.MatrixCell as unknown as Source["cell"],

		specimens: Composition.Specimens,

		groups: Composition.Groups,

		changes: Composition.Improvements,
	},

	{
		key: "small",

		rows: Small.Rows,

		columns: Small.Columns,

		cell: Small.MatrixCell as unknown as Source["cell"],

		specimens: Small.Specimens,

		groups: Small.Groups,

		changes: Small.Improvements,
	},

	{
		key: "apparatus",

		rows: Apparatus.Rows,

		columns: Apparatus.Columns,

		cell: Apparatus.MatrixCell as unknown as Source["cell"],

		specimens: Apparatus.Specimens,

		groups: Apparatus.Groups,

		changes: Apparatus.Improvements,
	},
];

/* ─── THE CHOSEN HALF: ONE ROW AND ONE SENTENCE PER FAMILY ───────────────── */

/**
 * The specimen row that proves each family, by mark.
 *
 * A proof is not the family's prettiest row - it is the row that shows the
 * family surviving the case its own subject says it is worst at. The mark is
 * chosen here; the row's state, component and sentence are looked up in the
 * family's `Specimens`, so the reference cannot print a proof that the family no
 * longer prints.
 */
const ProofMark: Readonly<Record<Gallery.FamilyKey, string>> = {
	field: "28",

	overlay: "06",

	display: "39",

	record: "07",

	narrative: "12",

	frame: "FRAME_04",

	reading: "READ_06",

	composition: "CMP_22",

	small: "SMALL_05",

	apparatus: "APPARATUS_36",
};

/** Why that row is the proof. One sentence per family, in the sheet's voice. */
const ProofWhy: Readonly<Record<Gallery.FamilyKey, string>> = {
	field: "A field is a control in a container, and the container is the part a designer forgets: at 16rem the label wraps, the action stacks and the value still fits, because the query is on the field rather than on the page.",

	overlay:
		"A panel is judged by what it does when its content outgrows it: at sixty rows the head and the foot pin and only the body scrolls, so the reader never loses the way out.",

	display:
		"A display's worst state is a figure that lies about its own extent, and a set of one page is that state at its smallest: the control stays, prints `01 OF 01`, and disables both arrows rather than disappearing.",

	record: "A ledger is believed, and a fact older than its as-of is the one way a true fact becomes a false claim: the value stays visible and the age prints beside it.",

	narrative:
		"A block that tells a reader something fails by pointing at evidence that is not there, so the proof is the absent capture: the panel keeps its place and prints the tombstone instead of a broken image.",

	frame: "The frame decides whether content can be read at all, and the phone is where it is usually given up on: at 640 both rails become ruled registers above the paper, in reading order, and nothing is folded away.",

	reading:
		"Furniture fails by losing the reader, and ninety sections is the case that does it: the contents register folds itself and goes dense so the tree keeps the rail's scroll instead of a slit.",

	composition:
		"The marketing layer's honest worst case is a product with nothing to download: the plate keeps its surface and states `ARTIFACTS: UNAVAILABLE`, why, and `CHANNEL: SOURCE`, instead of an empty frame.",

	small: "A small surface fails by being abandoned, and a denied reader is the one it abandons most easily: the page says what the surface is, not only that the session may not have it.",

	apparatus:
		"Apparatus fails by being absent and unnoticed, and a provider with no credentials is the quietest way that happens: the children render unwrapped, the surface still prints, and the page states that the provider is unconfigured.",
};

/* ─── THE BUILDERS ───────────────────────────────────────────────────────── */

/** The state name of a specimen row, whichever field its family uses. */
const StateOf = (Row: SpecShape): string =>
	Row.state_name ?? Row.state ?? "UNAVAILABLE";

/** Whether a column is a state of the component or a shape it is composed at. */
const IsState = (Column: ColumnShape): boolean =>
	Column.group === "condition" || Column.group === "state";

/** The sheet's index row for a band, by its kicker. */
const SheetRow = (Band: string) => Sheet.find((Row) => Row.label === Band);

/**
 * One family's laws: its impossible cells, grouped by the sentence that explains
 * them, heaviest first.
 *
 * This is the derivation the reference exists for. A cell marked `N/A` is a
 * family saying what one of its parts may never be, and the sentence beside it
 * is that family's own wording - so the section is not a critic's opinion of the
 * family, it is the family's prohibitions collected.
 * The order is by the number of cells a sentence explains, because the sentence
 * that forbids the most is the family's strongest law.
 *
 * ─── READ FROM THE FAMILY'S OWN MATRIX, NOT THE GALLERY'S FOLD ────────────
 * The gallery reads a family's columns onto one spine of twenty-two, and a
 * condition folded from two arms is answered by whichever arm is built first -
 * so its `N/A` reason can belong to a different column than the one this
 * reference's matrix prints. Reading the laws from the family's own rows and
 * columns instead is what makes the numbering exact: every `N/A` cell in the
 * matrix below is one of these sentences, and no cell prints `N/A` with nothing
 * to resolve it to.
 */
const LawsOf = (Source: Source): readonly Law[] => {
	const Grouped = new Map<string, string[]>();

	for (const Row of Source.rows) {
		for (const Column of Source.columns) {
			const Cell = Source.cell(Row as never, Column as never);

			if (Cell.disposition !== "na" || Cell.reason === undefined)
				continue;

			const Where = `${Row.name} / ${Column.label}`;

			const Existing = Grouped.get(Cell.reason);

			if (Existing === undefined) Grouped.set(Cell.reason, [Where]);
			else Existing.push(Where);
		}
	}

	return [...Grouped.entries()]
		.sort((A, B) => B[1].length - A[1].length)
		.map(([Text, Cells]) => ({
			text: Text,
			cells: Cells,
			count: Cells.length,
		}));
};

/**
 * The law index for one family's matrix: the position of a sentence in the
 * family's `laws` list, or `undefined` when the sentence is not there.
 *
 * The matrix prints `N/A` with a number rather than the sentence, because a
 * sentence in a six-rem cell is an excuse; the number resolves to the law
 * printed under the table. `undefined` is the honest answer for a cell whose
 * reason is missing or unlisted - the cell then prints a bare `N/A` instead of
 * a pointer to a sentence that is not on the page.
 */
const LawIndex = (
	Laws: readonly Law[],

	Reason: string | undefined,
): number | undefined => {
	if (Reason === undefined) return undefined;

	const Position = Laws.findIndex((Law) => Law.text === Reason);

	return Position === -1 ? undefined : Position + 1;
};

/** One family, as the reference states it. */
const Build = (Source: Source, Position: number): Entry => {
	const Family = Gallery.Families.find((Read) => Read.key === Source.key);

	if (Family === undefined)
		throw new Error(
			`Reference: the gallery has no family \`${Source.key}\`, so its entry cannot be read.`,
		);

	const Index = String(Position + 1).padStart(2, "0");

	const Band = SheetRow(Family.band);

	const Laws = LawsOf(Source);

	/** The family's own columns, each with the figure it is built by. */
	const ColumnLines: readonly Asked[] = Source.columns.map((Column) => {
		const Built = Source.rows.filter(
			(Row) =>
				Source.cell(Row as never, Column as never).disposition ===
				"built",
		).length;

		return {
			key: Column.key,
			label: Column.label,
			ask: Column.ask ?? Column.label,
			group: Column.group ?? "condition",
			built: Built,
			of: Source.rows.length,
		} satisfies Asked;
	});

	/** The family's matrix, read through its own `MatrixCell`. */
	const Rows: readonly MatrixRow[] = Source.rows.map((Row) => ({
		name: Row.name,
		cells: Source.columns.map((Column) => {
			const Cell = Source.cell(Row as never, Column as never);

			if (Cell.disposition === "built")
				return Cell.note === undefined
					? { disposition: "built" as const }
					: { disposition: "built" as const, note: Cell.note };

			const Law = LawIndex(Laws, Cell.reason);

			return Law === undefined
				? { disposition: "na" as const }
				: { disposition: "na" as const, law: Law };
		}),
	}));

	/** The chosen proof, resolved against the family's own rows. */
	const Mark = ProofMark[Source.key];

	const Found = Source.specimens.find((Row) => Row.mark === Mark);

	const Proof2: Proof | undefined =
		Found === undefined
			? undefined
			: {
					mark: Found.mark,

					state: StateOf(Found),

					component: Found.component,

					when: Found.when,

					why: ProofWhy[Source.key],
				};

	return {
		key: Family.key,

		index: `# ${Index}`,

		band: Family.band,

		href: Family.href,

		source: Family.source,

		for: Band?.argues ?? Family.subject,

		read: Band?.read ?? "UNAVAILABLE",

		gap: Family.gap,

		slots: Family.components.map((Component) => ({
			name: Component.name,
			file: Component.file,
			note: Component.note,
			built: Component.built,
			reasons: Component.reasons,
			unasked: Component.unasked,
			of: Gallery.ConditionCount,
		})),

		states: ColumnLines.filter(IsState),

		combinations: ColumnLines.filter((Column) => !IsState(Column)),

		laws: Laws,

		strongest: Laws.slice(0, 4),

		...(Proof2 === undefined ? { proofAbsent: Mark } : { proof: Proof2 }),

		changes: (Source.changes ?? []).map((Change) => ({
			component: Change.component,
			from: Change.from,
			found: Change.found,
			built: Change.built,
		})),

		groups: Source.groups.map((Group) => ({
			label: Group.label,
			note: Group.note,
		})),

		matrix: { columns: ColumnLines, rows: Rows },

		figures: {
			components: Family.components.length,

			columns: Source.columns.length,

			cells: Source.rows.length * Source.columns.length,

			built: Rows.reduce(
				(Total, Row) =>
					Total +
					Row.cells.filter((Cell) => Cell.disposition === "built")
						.length,

				0,
			),

			reasons: Rows.reduce(
				(Total, Row) =>
					Total +
					Row.cells.filter((Cell) => Cell.disposition === "na")
						.length,

				0,
			),

			spine: {
				of: Gallery.ConditionCount,

				built: Family.built,

				reasons: Family.reasons,

				unasked: Family.unasked,
			},

			specimens: Source.specimens.length,

			groups: Source.groups.length,

			laws: Laws.length,

			changes: Source.changes?.length ?? 0,
		},
	};
};

/* ─── THE REFERENCE ──────────────────────────────────────────────────────── */

/** The ten entries, in `/Specimen`'s order. */
export const Reference: readonly Entry[] = Sources.map(Build);

/** How many families the reference states. */
export const EntryCount = Reference.length;

/** How many parts it lists, counted from the slots themselves. */
export const SlotCount = Reference.reduce(
	(Total, Entry) => Total + Entry.slots.length,

	0,
);

/** How many matrix cells it prints, counted from the families' own matrices. */
export const MatrixCells = Reference.reduce(
	(Total, Entry) => Total + Entry.figures.cells,

	0,
);

/** How many of those are built. */
export const MatrixBuilt = Reference.reduce(
	(Total, Entry) => Total + Entry.figures.built,

	0,
);

/** How many are impossible, and carry a written reason. */
export const MatrixReasons = Reference.reduce(
	(Total, Entry) => Total + Entry.figures.reasons,

	0,
);

/** How many parts, read against the gallery's spine of twenty-two conditions. */
export const SpineCells = SlotCount * Gallery.ConditionCount;

/** How many of those the families build. */
export const SpineBuilt = Reference.reduce(
	(Total, Entry) => Total + Entry.figures.spine.built,

	0,
);

/** How many are conditions a family's matrix never asks. */
export const SpineUnasked = Reference.reduce(
	(Total, Entry) => Total + Entry.figures.spine.unasked,

	0,
);

/** How many distinct prohibitions the ten families state between them. */
export const LawCount = Reference.reduce(
	(Total, Entry) => Total + Entry.laws.length,

	0,
);

/** How many behaviours the wave's exploration produced, as the families record them. */
export const ChangeCount = Reference.reduce(
	(Total, Entry) => Total + Entry.changes.length,

	0,
);

/** How many families have a proof row that resolves. */
export const ProofCount = Reference.filter(
	(Entry) => Entry.proof !== undefined,
).length;

/**
 * The conditions a family never asks, per family - the third disposition, kept
 * on the reference so a contributor reading one entry can see the hole in that
 * family's question set without opening `/THE UNASKED`.
 */
export const Unasked = Gallery.Unasked.map((Entry) => ({
	band: Entry.family.band,

	conditions: Entry.conditions.map((Condition) => Condition.label),

	cells: Entry.cells,
}));

/* ─── THE CONTRACT, AS THE REFERENCE STATES IT ───────────────────────────── */

/**
 * One law of the component contract: what a block may be, what it may never be,
 * and how a contributor checks it before shipping.
 *
 * These seven are `DESIGN-COMPLETE.md` §4.2 and §4.3, restated as a table
 * because a contributor reads a table and skips a paragraph. They are not
 * derived - they are the document's own constitution - so each one names the
 * section it comes from, and the `check` line says what a reviewer looks at
 * rather than what they should believe.
 */
export const Contract: readonly {
	readonly law: string;

	readonly means: string;

	readonly check: string;

	readonly source: string;
}[] = [
	{
		law: "A BLOCK IS STRUCTURE, NOT A SURFACE",

		means: 'It lives inside a Jelly surface and never replaces one. A `RecordEntry` that needs a card sits inside a `jelly-card`, never inside a `<div class="...-card">` painted by a partial.',

		check: "Open the block's file: does it render a surface, or does it render structure on a surface the page supplies?",

		source: "§4.2",
	},

	{
		law: "A BLOCK RENDERS PROPS ONLY",

		means: "No script element, no `client:*`, no DOM access, no `any`. Interaction state is CSS, and the no-JavaScript fallback is the state itself.",

		check: "Search the file for `client:`, a script element, `document.` and `window.` - a block that has one is an island and belongs in `Component/` with a hydration directive the page chose.",

		source: "§4.2",
	},

	{
		law: "A BLOCK NEVER DERIVES DATA IT WAS NOT GIVEN",

		means: "No sorting, no renumbering, no re-casing, no invented slash, no computed count. A count is composed from the rows the block holds, by `RegisterLine.ts`, and from nothing else.",

		check: "Does the block call `.sort(`, `.map((x, i) => i + 1)` or a template literal around a number? A count that is not `rows.length` is a figure with no source.",

		source: "§4.2",
	},

	{
		law: "A BLOCK THAT NEEDS A SHAPE DECLARES IT AND REPORTS",

		means: "`Record/Type.ts` is the shared contract. A block that needs a shape it does not carry declares a local type and reports the mismatch, because an honest local shape beats a forced fit against a wrong shared one.",

		check: "Does the block cast a prop into a shared type, or declare what it actually takes?",

		source: "§4.2",
	},

	{
		law: "A CARD EXTENDS ADDITIVELY, AND NEVER CHANGES A SIGNATURE",

		means: "A card adds a prop; it never changes one another file uses. A borrowed class is not a block - the hero's facts ledger and the specimen strip both carried `record-ledger` classes without importing `RecordLedger`, and that is why the two drifted.",

		check: "`git diff` on the block's props: every line is an addition, or the change is reported before it lands.",

		source: "§4.2",
	},

	{
		law: "ONE COMPONENT, ONE PARTIAL, AND TOKENS ONLY",

		means: "`RecordBand.astro` owns `System/Record/_Band.scss`, wired once with `@use`. Colour, size and space come from `var(--...)`; a literal hex or px is a defect unless it is a hairline or `0`.",

		check: "Grep the partial for `#[0-9a-f]` and `[0-9]px`: two hits and the component has left the theme.",

		source: "§4.4",
	},

	{
		law: "NOTHING INSIDE A JELLY SURFACE IS A SECOND SURFACE",

		means: "A `Record*` block, a `bare` band, the page's `h1` in the opening artifact, a form, a ledger, a matrix, a well, a captioned figure - and never a second Jelly surface, a band that paints its own fill, or a Jelly element repainted by a lane class.",

		check: "Is there a card inside the card, a border inside the border, or a Jelly element with a lane class on it? A card inside a card is never right.",

		source: "§4.3",
	},
];

/* ─── THE PAGE'S COPY ────────────────────────────────────────────────────── */

/** The reference's opening, in the sheet's own grammar. */
export const Head = {
	index: "# SPECIMEN_03",

	title: "The component reference",

	proposition: `One entry per family, generated from the same tables the states gallery reads: what the family is for, the ${SlotCount} parts a page may mount, the states and combinations it is asked, the ${LawCount} prohibitions its own matrix states in its own words, and the one live row that proves it - across ${EntryCount} families and ${MatrixCells} cells.`,
} as const;

/** The reference's bands, in the order they are read. */
export const Bands = {
	Contract: {
		kicker: "/THE CONTRACT",

		interval: "turn",

		heading: "What a block may be, and may never be",

		standfirst: `Seven laws that hold before any family's own matrix is read: a block is structure rather than a surface, it renders props only, it never derives data it was not given, it declares a shape it does not have, it extends additively, it owns one partial and tokens only, and nothing inside a Jelly surface is a second surface.`,

		footnote:
			"A family's laws are the sentences its own matrix uses to forbid a combination. These are the document's, and they hold for all ten.",
	},

	Families: {
		kicker: "/THE FAMILIES",

		interval: "break",

		heading: `${EntryCount} families, one entry each`,

		standfirst: `Each entry states the same five things in the same order - what the family is for, its slots, what it is asked, what it may never be, and the row that proves it - so a reader comparing two families is comparing the same questions rather than two authors' habits.`,

		footnote:
			"Open an entry for its slots, its columns, its prohibitions and its matrix. Closed, it is the purpose, the figures and the proof row: enough to know whether this is the family you want.",
	},

	Register: {
		kicker: "/THE REGISTER",

		interval: "break",

		heading: "What the reference counted",

		standfirst:
			"Every figure here is counted from the ten family modules, and the file each was counted from is named beside it. A number written into the reference would be the one figure in it that could disagree with it.",

		footnote:
			"The reference reads; it does not decide. Where a family's matrix says nothing, the entry says so, and the sentence that says so names the family rather than blaming the component.",
	},
} as const;

/**
 * The register's rows, derived from the tables above.
 *
 * Rows, not a builder: every figure is already counted at module load, so a
 * call would have nothing to decide. The page hands this array to
 * `RegisterOf("REGISTER", Register)` and the ledger recomposes the count from
 * the same array it prints - the figure cannot outlive the rows.
 *
 * Typed as the ledger's own `LedgerRow` rather than as an inline shape, so the
 * rows this module exports are the rows `RecordLedger` can print: a key, a
 * value, and `code` where the value is a literal (the source path) rather than
 * prose.
 */
export const Register: readonly LedgerRow[] = [
	{ key: "FAMILIES:", value: String(EntryCount) },

	{ key: "SLOTS:", value: String(SlotCount) },

	{ key: "MATRIX CELLS:", value: String(MatrixCells) },

	{ key: "BUILT:", value: String(MatrixBuilt) },

	{ key: "NOT APPLICABLE:", value: String(MatrixReasons) },

	{
		key: "SPINE:",

		value: `${SpineCells} CELLS / ${SpineBuilt} BUILT / ${SpineUnasked} UNASKED`,
	},

	{ key: "PROHIBITIONS:", value: String(LawCount) },

	{ key: "BEHAVIOURS:", value: String(ChangeCount) },

	{ key: "PROOFS RESOLVED:", value: `${ProofCount} OF ${EntryCount}` },

	{ key: "SOURCE:", value: "CONTENT/SPECIMEN/*.TS", code: true },
];

/** The reference's four doors, for the page's foot. */
export const Onward = {
	rows: [
		{
			mark: "/",

			want: "THE MATRIX THIS REFERENCE READS",

			where: "STATES",

			href: "/Specimen/States",

			note: "Every component against every condition, with the reason each impossible cell carries.",
		},

		{
			mark: "/",

			want: "THE FAMILIES AT THEIR OWN SIZE",

			where: "SPECIMEN",

			href: "/Specimen",

			note: "The ten matrices, their plates, their absences and their own registers.",
		},

		{
			mark: "/",

			want: "THE DOCUMENT THE COMPONENTS PRINT",

			where: "DOC",

			href: "/Doc",

			note: "The manual the reference's parts are for: its articles, its rail and its folio.",
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
			"The reference is the last page of the wave and the first page a contributor reads: every entry resolves to a matrix, every matrix resolves to a file, and every proof row resolves to a live specimen.",

		note: "SOURCE: CONTENT/SPECIMEN/REFERENCE.TS",

		empty: "No door is filed, which is the one absence this register cannot state honestly - a register with no destination is a page that has decided the reader is finished.",
	},
} as const;
