import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { St as Header, Xt as renderScript, Zt as createAstro, ct as $$RecordLedger, ft as RegisterOf, t as $$Base, ut as Padded, xt as $$Mark, yt as Row } from "./Base_BVG1wSoZ.mjs";
import { t as $$Onward } from "./Onward_CHlXNaLt.mjs";
import { t as $$RecordBand } from "./RecordBand_-2ERi8bg.mjs";
import { t as $$Trail } from "./Trail_Btt_p1Ie.mjs";
import { $ as Rows$1, Ct as MatrixCell$5, Dt as Rows$5, En as Improvements$6, F as Groups$6, Ft as MatrixCell, Gt as Groups$2, H as Rows$6, I as Improvements$3, J as Groups$1, Mn as Rows$9, Mt as Columns, Nt as Groups, O as Rows$3, On as MatrixCell$9, Ot as Specimens$5, P as Columns$6, Pn as Specimens$9, R as MatrixCell$6, Rt as Rows, S as Improvements, Tn as Groups$9, U as Specimens$6, Wt as Columns$2, X as MatrixCell$1, Xt as Rows$2, Zt as Specimens$2, _n as Specimens$7, an as Groups$7, at as Columns$4, b as Columns$3, bt as Groups$5, c as Improvements$5, et as Specimens$1, h as Specimens$8, hn as Rows$7, k as Specimens$3, lt as MatrixCell$4, m as Rows$8, mt as Specimens$4, o as Columns$8, on as Improvements$4, ot as Groups$4, pt as Rows$4, q as Columns$1, qt as MatrixCell$2, rn as Columns$7, s as Groups$8, st as Improvements$1, t as $$SurfaceShell, u as MatrixCell$8, un as MatrixCell$7, w as MatrixCell$3, wn as Columns$9, x as Groups$3, xt as Improvements$2, yt as Columns$5, zt as Specimens } from "./SurfaceShell_Bi62faMK.mjs";
import { o as ConditionCount, u as Families, x as Unasked$1 } from "./Gallery_BvfW2wuX.mjs";
import { t as Families$1 } from "./Families_CMuo95_o.mjs";
// Source/Content/Specimen/Reference.ts
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
var Sources = [
	{
		key: "field",
		rows: Rows,
		columns: Columns,
		cell: MatrixCell,
		specimens: Specimens,
		groups: Groups
	},
	{
		key: "overlay",
		rows: Rows$1,
		columns: Columns$1,
		cell: MatrixCell$1,
		specimens: Specimens$1,
		groups: Groups$1
	},
	{
		key: "display",
		rows: Rows$2,
		columns: Columns$2,
		cell: MatrixCell$2,
		specimens: Specimens$2,
		groups: Groups$2
	},
	{
		key: "record",
		rows: Rows$3,
		columns: Columns$3,
		cell: MatrixCell$3,
		specimens: Specimens$3,
		groups: Groups$3,
		changes: Improvements
	},
	{
		key: "narrative",
		rows: Rows$4,
		columns: Columns$4,
		cell: MatrixCell$4,
		specimens: Specimens$4,
		groups: Groups$4,
		changes: Improvements$1
	},
	{
		key: "frame",
		rows: Rows$5,
		columns: Columns$5,
		cell: MatrixCell$5,
		specimens: Specimens$5,
		groups: Groups$5,
		changes: Improvements$2
	},
	{
		key: "reading",
		rows: Rows$6,
		columns: Columns$6,
		cell: MatrixCell$6,
		specimens: Specimens$6,
		groups: Groups$6,
		changes: Improvements$3
	},
	{
		key: "composition",
		rows: Rows$7,
		columns: Columns$7,
		cell: MatrixCell$7,
		specimens: Specimens$7,
		groups: Groups$7,
		changes: Improvements$4
	},
	{
		key: "small",
		rows: Rows$8,
		columns: Columns$8,
		cell: MatrixCell$8,
		specimens: Specimens$8,
		groups: Groups$8,
		changes: Improvements$5
	},
	{
		key: "apparatus",
		rows: Rows$9,
		columns: Columns$9,
		cell: MatrixCell$9,
		specimens: Specimens$9,
		groups: Groups$9,
		changes: Improvements$6
	}
];
/**
* The specimen row that proves each family, by mark.
*
* A proof is not the family's prettiest row - it is the row that shows the
* family surviving the case its own subject says it is worst at. The mark is
* chosen here; the row's state, component and sentence are looked up in the
* family's `Specimens`, so the reference cannot print a proof that the family no
* longer prints.
*/
var ProofMark = {
	field: "28",
	overlay: "06",
	display: "39",
	record: "07",
	narrative: "12",
	frame: "FRAME_04",
	reading: "READ_06",
	composition: "CMP_22",
	small: "SMALL_05",
	apparatus: "APPARATUS_36"
};
/** Why that row is the proof. One sentence per family, in the sheet's voice. */
var ProofWhy = {
	field: "A field is a control in a container, and the container is the part a designer forgets: at 16rem the label wraps, the action stacks and the value still fits, because the query is on the field rather than on the page.",
	overlay: "A panel is judged by what it does when its content outgrows it: at sixty rows the head and the foot pin and only the body scrolls, so the reader never loses the way out.",
	display: "A display's worst state is a figure that lies about its own extent, and a set of one page is that state at its smallest: the control stays, prints `01 OF 01`, and disables both arrows rather than disappearing.",
	record: "A ledger is believed, and a fact older than its as-of is the one way a true fact becomes a false claim: the value stays visible and the age prints beside it.",
	narrative: "A block that tells a reader something fails by pointing at evidence that is not there, so the proof is the absent capture: the panel keeps its place and prints the tombstone instead of a broken image.",
	frame: "The frame decides whether content can be read at all, and the phone is where it is usually given up on: at 640 both rails become ruled registers above the paper, in reading order, and nothing is folded away.",
	reading: "Furniture fails by losing the reader, and ninety sections is the case that does it: the contents register folds itself and goes dense so the tree keeps the rail's scroll instead of a slit.",
	composition: "The marketing layer's honest worst case is a product with nothing to download: the plate keeps its surface and states `ARTIFACTS: UNAVAILABLE`, why, and `CHANNEL: SOURCE`, instead of an empty frame.",
	small: "A small surface fails by being abandoned, and a denied reader is the one it abandons most easily: the page says what the surface is, not only that the session may not have it.",
	apparatus: "Apparatus fails by being absent and unnoticed, and a provider with no credentials is the quietest way that happens: the children render unwrapped, the surface still prints, and the page states that the provider is unconfigured."
};
/** The state name of a specimen row, whichever field its family uses. */
var StateOf = (Row) => Row.state_name ?? Row.state ?? "UNAVAILABLE";
/** Whether a column is a state of the component or a shape it is composed at. */
var IsState = (Column) => Column.group === "condition" || Column.group === "state";
/** The sheet's index row for a band, by its kicker. */
var SheetRow = (Band) => Families$1.find((Row) => Row.label === Band);
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
var LawsOf = (Source) => {
	const Grouped = /* @__PURE__ */ new Map();
	for (const Row of Source.rows) for (const Column of Source.columns) {
		const Cell = Source.cell(Row, Column);
		if (Cell.disposition !== "na" || Cell.reason === void 0) continue;
		const Where = `${Row.name} / ${Column.label}`;
		const Existing = Grouped.get(Cell.reason);
		if (Existing === void 0) Grouped.set(Cell.reason, [Where]);
		else Existing.push(Where);
	}
	return [...Grouped.entries()].sort((A, B) => B[1].length - A[1].length).map(([Text, Cells]) => ({
		text: Text,
		cells: Cells,
		count: Cells.length
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
var LawIndex = (Laws, Reason) => {
	if (Reason === void 0) return void 0;
	const Position = Laws.findIndex((Law) => Law.text === Reason);
	return Position === -1 ? void 0 : Position + 1;
};
/** One family, as the reference states it. */
var Build = (Source, Position) => {
	const Family = Families.find((Read) => Read.key === Source.key);
	if (Family === void 0) throw new Error(`Reference: the gallery has no family \`${Source.key}\`, so its entry cannot be read.`);
	const Index = String(Position + 1).padStart(2, "0");
	const Band = SheetRow(Family.band);
	const Laws = LawsOf(Source);
	/** The family's own columns, each with the figure it is built by. */
	const ColumnLines = Source.columns.map((Column) => {
		const Built = Source.rows.filter((Row) => Source.cell(Row, Column).disposition === "built").length;
		return {
			key: Column.key,
			label: Column.label,
			ask: Column.ask ?? Column.label,
			group: Column.group ?? "condition",
			built: Built,
			of: Source.rows.length
		};
	});
	/** The family's matrix, read through its own `MatrixCell`. */
	const Rows = Source.rows.map((Row) => ({
		name: Row.name,
		cells: Source.columns.map((Column) => {
			const Cell = Source.cell(Row, Column);
			if (Cell.disposition === "built") return Cell.note === void 0 ? { disposition: "built" } : {
				disposition: "built",
				note: Cell.note
			};
			const Law = LawIndex(Laws, Cell.reason);
			return Law === void 0 ? { disposition: "na" } : {
				disposition: "na",
				law: Law
			};
		})
	}));
	/** The chosen proof, resolved against the family's own rows. */
	const Mark = ProofMark[Source.key];
	const Found = Source.specimens.find((Row) => Row.mark === Mark);
	const Proof2 = Found === void 0 ? void 0 : {
		mark: Found.mark,
		state: StateOf(Found),
		component: Found.component,
		when: Found.when,
		why: ProofWhy[Source.key]
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
			of: ConditionCount
		})),
		states: ColumnLines.filter(IsState),
		combinations: ColumnLines.filter((Column) => !IsState(Column)),
		laws: Laws,
		strongest: Laws.slice(0, 4),
		...Proof2 === void 0 ? { proofAbsent: Mark } : { proof: Proof2 },
		changes: (Source.changes ?? []).map((Change) => ({
			component: Change.component,
			from: Change.from,
			found: Change.found,
			built: Change.built
		})),
		groups: Source.groups.map((Group) => ({
			label: Group.label,
			note: Group.note
		})),
		matrix: {
			columns: ColumnLines,
			rows: Rows
		},
		figures: {
			components: Family.components.length,
			columns: Source.columns.length,
			cells: Source.rows.length * Source.columns.length,
			built: Rows.reduce((Total, Row) => Total + Row.cells.filter((Cell) => Cell.disposition === "built").length, 0),
			reasons: Rows.reduce((Total, Row) => Total + Row.cells.filter((Cell) => Cell.disposition === "na").length, 0),
			spine: {
				of: ConditionCount,
				built: Family.built,
				reasons: Family.reasons,
				unasked: Family.unasked
			},
			specimens: Source.specimens.length,
			groups: Source.groups.length,
			laws: Laws.length,
			changes: Source.changes?.length ?? 0
		}
	};
};
/** The ten entries, in `/Specimen`'s order. */
var Reference = Sources.map(Build);
/** How many families the reference states. */
var EntryCount = Reference.length;
/** How many parts it lists, counted from the slots themselves. */
var SlotCount = Reference.reduce((Total, Entry) => Total + Entry.slots.length, 0);
/** How many matrix cells it prints, counted from the families' own matrices. */
var MatrixCells = Reference.reduce((Total, Entry) => Total + Entry.figures.cells, 0);
/** How many of those are built. */
var MatrixBuilt = Reference.reduce((Total, Entry) => Total + Entry.figures.built, 0);
/** How many are impossible, and carry a written reason. */
var MatrixReasons = Reference.reduce((Total, Entry) => Total + Entry.figures.reasons, 0);
/** How many parts, read against the gallery's spine of twenty-two conditions. */
var SpineCells = SlotCount * ConditionCount;
/** How many of those the families build. */
var SpineBuilt = Reference.reduce((Total, Entry) => Total + Entry.figures.spine.built, 0);
/** How many are conditions a family's matrix never asks. */
var SpineUnasked = Reference.reduce((Total, Entry) => Total + Entry.figures.spine.unasked, 0);
/** How many distinct prohibitions the ten families state between them. */
var LawCount = Reference.reduce((Total, Entry) => Total + Entry.laws.length, 0);
/** How many behaviours the wave's exploration produced, as the families record them. */
var ChangeCount = Reference.reduce((Total, Entry) => Total + Entry.changes.length, 0);
/** How many families have a proof row that resolves. */
var ProofCount = Reference.filter((Entry) => Entry.proof !== void 0).length;
/**
* The conditions a family never asks, per family - the third disposition, kept
* on the reference so a contributor reading one entry can see the hole in that
* family's question set without opening `/THE UNASKED`.
*/
var Unasked = Unasked$1.map((Entry) => ({
	band: Entry.family.band,
	conditions: Entry.conditions.map((Condition) => Condition.label),
	cells: Entry.cells
}));
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
var Contract = [
	{
		law: "A BLOCK IS STRUCTURE, NOT A SURFACE",
		means: "It lives inside a Jelly surface and never replaces one. A `RecordEntry` that needs a card sits inside a `jelly-card`, never inside a `<div class=\"...-card\">` painted by a partial.",
		check: "Open the block's file: does it render a surface, or does it render structure on a surface the page supplies?",
		source: "§4.2"
	},
	{
		law: "A BLOCK RENDERS PROPS ONLY",
		means: "No script element, no `client:*`, no DOM access, no `any`. Interaction state is CSS, and the no-JavaScript fallback is the state itself.",
		check: "Search the file for `client:`, a script element, `document.` and `window.` - a block that has one is an island and belongs in `Component/` with a hydration directive the page chose.",
		source: "§4.2"
	},
	{
		law: "A BLOCK NEVER DERIVES DATA IT WAS NOT GIVEN",
		means: "No sorting, no renumbering, no re-casing, no invented slash, no computed count. A count is composed from the rows the block holds, by `RegisterLine.ts`, and from nothing else.",
		check: "Does the block call `.sort(`, `.map((x, i) => i + 1)` or a template literal around a number? A count that is not `rows.length` is a figure with no source.",
		source: "§4.2"
	},
	{
		law: "A BLOCK THAT NEEDS A SHAPE DECLARES IT AND REPORTS",
		means: "`Record/Type.ts` is the shared contract. A block that needs a shape it does not carry declares a local type and reports the mismatch, because an honest local shape beats a forced fit against a wrong shared one.",
		check: "Does the block cast a prop into a shared type, or declare what it actually takes?",
		source: "§4.2"
	},
	{
		law: "A CARD EXTENDS ADDITIVELY, AND NEVER CHANGES A SIGNATURE",
		means: "A card adds a prop; it never changes one another file uses. A borrowed class is not a block - the hero's facts ledger and the specimen strip both carried `record-ledger` classes without importing `RecordLedger`, and that is why the two drifted.",
		check: "`git diff` on the block's props: every line is an addition, or the change is reported before it lands.",
		source: "§4.2"
	},
	{
		law: "ONE COMPONENT, ONE PARTIAL, AND TOKENS ONLY",
		means: "`RecordBand.astro` owns `System/Record/_Band.scss`, wired once with `@use`. Colour, size and space come from `var(--...)`; a literal hex or px is a defect unless it is a hairline or `0`.",
		check: "Grep the partial for `#[0-9a-f]` and `[0-9]px`: two hits and the component has left the theme.",
		source: "§4.4"
	},
	{
		law: "NOTHING INSIDE A JELLY SURFACE IS A SECOND SURFACE",
		means: "A `Record*` block, a `bare` band, the page's `h1` in the opening artifact, a form, a ledger, a matrix, a well, a captioned figure - and never a second Jelly surface, a band that paints its own fill, or a Jelly element repainted by a lane class.",
		check: "Is there a card inside the card, a border inside the border, or a Jelly element with a lane class on it? A card inside a card is never right.",
		source: "§4.3"
	}
];
/** The reference's opening, in the sheet's own grammar. */
var Head = {
	index: "# SPECIMEN_03",
	title: "The component reference",
	proposition: `One entry per family, generated from the same tables the states gallery reads: what the family is for, the ${SlotCount} parts a page may mount, the states and combinations it is asked, the ${LawCount} prohibitions its own matrix states in its own words, and the one live row that proves it - across ${EntryCount} families and ${MatrixCells} cells.`
};
/** The reference's bands, in the order they are read. */
var Bands = {
	Contract: {
		kicker: "/THE CONTRACT",
		interval: "turn",
		heading: "What a block may be, and may never be",
		standfirst: `Seven laws that hold before any family's own matrix is read: a block is structure rather than a surface, it renders props only, it never derives data it was not given, it declares a shape it does not have, it extends additively, it owns one partial and tokens only, and nothing inside a Jelly surface is a second surface.`,
		footnote: "A family's laws are the sentences its own matrix uses to forbid a combination. These are the document's, and they hold for all ten."
	},
	Families: {
		kicker: "/THE FAMILIES",
		interval: "break",
		heading: `${EntryCount} families, one entry each`,
		standfirst: `Each entry states the same five things in the same order - what the family is for, its slots, what it is asked, what it may never be, and the row that proves it - so a reader comparing two families is comparing the same questions rather than two authors' habits.`,
		footnote: "Open an entry for its slots, its columns, its prohibitions and its matrix. Closed, it is the purpose, the figures and the proof row: enough to know whether this is the family you want."
	},
	Register: {
		kicker: "/THE REGISTER",
		interval: "break",
		heading: "What the reference counted",
		standfirst: "Every figure here is counted from the ten family modules, and the file each was counted from is named beside it. A number written into the reference would be the one figure in it that could disagree with it.",
		footnote: "The reference reads; it does not decide. Where a family's matrix says nothing, the entry says so, and the sentence that says so names the family rather than blaming the component."
	}
};
/** The register's rows, derived from the tables above. */
var Register = [
	{
		key: "FAMILIES:",
		value: String(EntryCount)
	},
	{
		key: "SLOTS:",
		value: String(SlotCount)
	},
	{
		key: "MATRIX CELLS:",
		value: String(MatrixCells)
	},
	{
		key: "BUILT:",
		value: String(MatrixBuilt)
	},
	{
		key: "NOT APPLICABLE:",
		value: String(MatrixReasons)
	},
	{
		key: "SPINE:",
		value: `${SpineCells} CELLS / ${SpineBuilt} BUILT / ${SpineUnasked} UNASKED`
	},
	{
		key: "PROHIBITIONS:",
		value: String(LawCount)
	},
	{
		key: "BEHAVIOURS:",
		value: String(ChangeCount)
	},
	{
		key: "PROOFS RESOLVED:",
		value: `${ProofCount} OF ${EntryCount}`
	},
	{
		key: "SOURCE:",
		value: "CONTENT/SPECIMEN/*.TS"
	}
];
/** The reference's four doors, for the page's foot. */
var Onward = {
	rows: [
		{
			mark: "/",
			want: "THE MATRIX THIS REFERENCE READS",
			where: "STATES",
			href: "/Specimen/States",
			note: "Every component against every condition, with the reason each impossible cell carries."
		},
		{
			mark: "/",
			want: "THE FAMILIES AT THEIR OWN SIZE",
			where: "SPECIMEN",
			href: "/Specimen",
			note: "The ten matrices, their plates, their absences and their own registers."
		},
		{
			mark: "/",
			want: "THE DOCUMENT THE COMPONENTS PRINT",
			where: "DOC",
			href: "/Doc",
			note: "The manual the reference's parts are for: its articles, its rail and its folio."
		},
		{
			mark: "/",
			want: "EVERY ADDRESS THIS SITE ANSWERS ON",
			where: "CONTENTS",
			href: "/Contents",
			note: "The index: every route, filed by chapter, with the forms each one mounts."
		}
	],
	copy: {
		index: "# ONWARD / 04",
		label: "/THE REST OF THE DOCUMENT",
		statement: "The reference is the last page of the wave and the first page a contributor reads: every entry resolves to a matrix, every matrix resolves to a file, and every proof row resolves to a live specimen.",
		note: "SOURCE: CONTENT/SPECIMEN/REFERENCE.TS",
		empty: "No door is filed, which is the one absence this register cannot state honestly - a register with no destination is a page that has decided the reader is finished."
	}
};
// Source/Component/Specimen/SpecimenReference.astro
createAstro("https://editor.land");
var $$SpecimenReference = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SpecimenReference;
	const { part } = Astro.props;
	const Index = (Entry) => Entry.index.replace(/^#\s*/, "");
	const Anchor = (Entry) => `entry-${Entry.band.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase()}`;
	const LawAnchor = (Entry, Position) => `${Anchor(Entry)}-law-${Position}`;
	const LiveRow = (Family, Component) => `/Specimen/States#row-${`${Family}/${Component}`.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
	const UnaskedOf = (Band) => Unasked.find((Entry) => Entry.band === Band) ?? {
		conditions: [],
		cells: 0
	};
	return renderTemplate`${part === "contract" ? renderTemplate`${maybeRenderHead($$result)}<figure class="reference-contract" id="contract"> <p class="reference-contract__head"> <span class="reference-contract__head-label">THE CONTRACT:</span> <span class="reference-contract__head-figure"> ${Contract.length} LAWS / §4.2 - §4.4 / ${EntryCount} FAMILIES BOUND
					BY THEM
</span> </p> <ol class="reference-contract__list"> ${Contract.map((Law, Position) => renderTemplate`<li class="reference-contract__law"> <p class="reference-contract__law-head"> <span class="reference-contract__law-index">
〈${Padded(Position + 1)}〉
</span> <span class="reference-contract__law-title">${Law.law}</span> <span class="reference-contract__law-source">
DESIGN-COMPLETE ${Law.source} </span> </p> <p class="reference-contract__law-means"> <span class="reference-contract__key">MEANS:</span> ${Law.means} </p> <p class="reference-contract__law-check"> <span class="reference-contract__key">CHECK:</span> ${Law.check} </p> </li>`)} </ol> </figure>` : renderTemplate`<div class="reference" id="families"> <p class="reference__head"> <span class="reference__head-label">THE REFERENCE:</span> <span class="reference__head-figure"> ${EntryCount} FAMILIES / ${SlotCount} SLOTS / ONE ENTRY EACH
</span> </p> ${Reference.map((Entry) => {
		const UnaskedRow = UnaskedOf(Entry.band);
		return renderTemplate`<section class="reference-entry"${addAttribute(Anchor(Entry), "id")}> <details class="reference-entry__fold"> <summary class="reference-entry__summary"> <span class="reference-entry__mark" aria-hidden="true">
#
</span> <span class="reference-entry__index">${Index(Entry)}</span> <span class="reference-entry__band"> ${renderComponent($$result, "Mark", $$Mark, { "kind": "square" })} ${Entry.band} </span> <span class="reference-entry__figure"> ${Entry.figures.components} COMPONENTS × ${Entry.figures.columns} ${" "}COLUMNS / ${Entry.figures.cells} CELLS /${" "} ${Entry.figures.built} BUILT
</span> <span class="reference-entry__proof-mark"> ${Entry.proof === void 0 ? "◎ PROOF: UNAVAILABLE" : `PROOF: ${Entry.proof.mark}`} </span> </summary> <div class="reference-entry__body">  <p class="reference-entry__for"> <span class="reference-entry__key">FOR:</span> ${Entry.for} </p> <p class="reference-entry__read"> <span class="reference-entry__key">READ FOR:</span> ${Entry.read} </p> <p class="reference-entry__gap"> <span class="reference-entry__key">ITS BOUNDARY:</span> ${Entry.gap} </p>  <p class="reference-entry__head-line"> <span class="reference-entry__head-label">FIGURES:</span> <span class="reference-entry__head-figure"> ${Entry.figures.components} SLOTS / ${Entry.states.length} ${" "}STATES / ${Entry.combinations.length} COMBINATIONS
</span> </p> <dl class="reference-entry__ledger"> <div class="reference-entry__line"> <dt>ITS OWN MATRIX:</dt> <dd> ${Entry.figures.cells} CELLS / ${Entry.figures.built} BUILT /${" "} ${Entry.figures.reasons} N/A
</dd> </div> <div class="reference-entry__line"> <dt>AGAINST THE SPINE:</dt> <dd> ${Entry.figures.spine.built} BUILT /${" "} ${Entry.figures.spine.reasons} N/A /${" "} ${Entry.figures.spine.unasked} UNASKED OF${" "} ${Entry.figures.spine.of} </dd> </div> <div class="reference-entry__line"> <dt>LIVE ROWS:</dt> <dd> ${Entry.figures.specimens} IN ${Entry.figures.groups} GROUPS
</dd> </div> <div class="reference-entry__line"> <dt>PROHIBITIONS:</dt> <dd> ${Entry.figures.laws} SENTENCES /${" "} ${Entry.figures.changes} BEHAVIOURS RECORDED
</dd> </div> </dl>  <p class="reference-entry__head-line"> <span class="reference-entry__head-label">ITS SLOTS:</span> <span class="reference-entry__head-figure"> ${Entry.figures.components} PARTS A PAGE MAY MOUNT / BUILT
										COUNTED AGAINST THE SPINE'S ${Entry.figures.spine.of} </span> </p> <div class="reference-entry__scroll"> <table class="reference-entry__table"> <thead> <tr> <th scope="col">PART</th> <th scope="col">FILE</th> <th scope="col">WHAT IT IS</th> <th scope="col">BUILT</th> </tr> </thead> <tbody> ${Entry.slots.map((Slot) => renderTemplate`<tr> <td class="reference-entry__cell-name">${Slot.name}</td> <td class="reference-entry__cell-code">${Slot.file}</td> <td class="reference-entry__cell-note">${Slot.note}</td> <td class="reference-entry__cell-figure"> ${Slot.built} OF ${Slot.of} </td> </tr>`)} </tbody> </table> </div>  <p class="reference-entry__head-line"> <span class="reference-entry__head-label">ITS STATES:</span> <span class="reference-entry__head-figure"> ${Entry.states.length} CONDITIONS IT IS ASKED
</span> </p> <ul class="reference-entry__asked"> ${Entry.states.map((Column) => renderTemplate`<li class="reference-entry__asked-row"> <span class="reference-entry__asked-label"> ${Column.label} </span> <span class="reference-entry__asked-ask">${Column.ask}</span> <span class="reference-entry__asked-figure"> ${Column.built} OF ${Column.of} </span> </li>`)} </ul> <p class="reference-entry__head-line"> <span class="reference-entry__head-label">
ITS COMBINATIONS:
</span> <span class="reference-entry__head-figure"> ${Entry.combinations.length} SHAPES AND CONTEXTS
</span> </p> <ul class="reference-entry__asked"> ${Entry.combinations.map((Column) => renderTemplate`<li class="reference-entry__asked-row"> <span class="reference-entry__asked-label"> ${Column.label} </span> <span class="reference-entry__asked-ask"> ${Column.group}: ${Column.ask} </span> <span class="reference-entry__asked-figure"> ${Column.built} OF ${Column.of} </span> </li>`)} </ul>  <p class="reference-entry__head-line"> <span class="reference-entry__head-label">
WHAT IT MAY NEVER BE:
</span> <span class="reference-entry__head-figure"> ${Entry.figures.laws} SENTENCES / THE FOUR THAT FORBID MOST
</span> </p> <ol class="reference-entry__laws"> ${Entry.strongest.map((Law) => {
			const Position = Entry.laws.indexOf(Law) + 1;
			return renderTemplate`<li class="reference-entry__law"${addAttribute(LawAnchor(Entry, Position), "id")}> <p class="reference-entry__law-head"> <span class="reference-entry__law-index">
〈${Padded(Position)}〉
</span> <span class="reference-entry__law-count"> ${Law.count} CELL${Law.count === 1 ? "" : "S"} </span> </p> <p class="reference-entry__law-text">${Law.text}</p> <p class="reference-entry__law-cells"> ${Law.cells.join(" / ")} </p> </li>`;
		})} </ol>  <p class="reference-entry__head-line"> <span class="reference-entry__head-label">ITS MATRIX:</span> <span class="reference-entry__head-figure"> ${Entry.figures.components} ROWS × ${Entry.figures.columns} COLUMNS /
										CELLS ARE BUILT OR N/A WITH THE SENTENCE BELOW
</span> </p> <p class="reference-entry__matrix-note-line">
A built cell's own note - how that combination was built - is on${" "} <a href="/Specimen/States">the states gallery</a>, where the row
									opens; this table is the scan, and the sentence under it is the
									evidence for every cell that cannot exist.
</p> <div class="reference-entry__scroll"> <table class="reference-entry__matrix"> <thead> <tr> <th class="reference-entry__matrix-corner" scope="col">
PART
</th> ${Entry.matrix.columns.map((Column) => renderTemplate`<th scope="col"${addAttribute(`${Column.label}: ${Column.ask}`, "title")}> <span class="reference-entry__matrix-head"> ${Column.label} </span> </th>`)} </tr> </thead> <tbody> ${Entry.matrix.rows.map((Row) => renderTemplate`<tr> <th class="reference-entry__matrix-name" scope="row"> ${Row.name} </th> ${Row.cells.map((Cell, Position) => renderTemplate`<td class="reference-entry__matrix-cell"${addAttribute(Cell.disposition, "data-disposition")}> ${Cell.disposition === "built" ? renderTemplate`<span aria-label="built">▪</span>` : Cell.law === void 0 ? renderTemplate`<span class="reference-entry__matrix-na">N/A</span>` : renderTemplate`<a class="reference-entry__matrix-na"${addAttribute(`#${LawAnchor(Entry, Cell.law)}`, "href")}>
N/A<sup>${Cell.law}</sup> </a>`} <span class="reference-entry__visually-hidden"> ${Entry.matrix.columns[Position]?.label}:${" "} ${Cell.disposition === "built" ? Cell.note ?? "built" : `not applicable, reason ${Cell.law ?? "UNAVAILABLE"}`} </span> </td>`)} </tr>`)} </tbody> </table> </div> <p class="reference-entry__head-line"> <span class="reference-entry__head-label">
EVERY SENTENCE THE MATRIX USES:
</span> <span class="reference-entry__head-figure"> ${Entry.figures.laws} PROHIBITIONS / NUMBERED AS THE CELLS
										REFERENCE THEM
</span> </p> <ol class="reference-entry__laws"> ${Entry.laws.map((Law, Position) => renderTemplate`<li class="reference-entry__law"${addAttribute(LawAnchor(Entry, Position + 1), "id")}> <p class="reference-entry__law-head"> <span class="reference-entry__law-index">
〈${Padded(Position + 1)}〉
</span> <span class="reference-entry__law-count"> ${Law.count} CELL${Law.count === 1 ? "" : "S"} </span> </p> <p class="reference-entry__law-text">${Law.text}</p> <p class="reference-entry__law-cells">${Law.cells.join(" / ")}</p> </li>`)} </ol>  <p class="reference-entry__head-line"> <span class="reference-entry__head-label">
THE ROW THAT PROVES IT:
</span> <span class="reference-entry__head-figure"> ${Entry.proof === void 0 ? "◎ UNAVAILABLE" : `${Entry.proof.mark} / ${Entry.proof.state}`} </span> </p> ${Entry.proof === void 0 ? renderTemplate`<p class="reference-entry__absent"> <span class="reference-entry__key">◎ PROOF: UNAVAILABLE</span>
The reference names the mark${" "} <code>${Entry.proofAbsent}</code> as this family's proof, and
										the family's <code>Specimens</code> no longer carries it - so
										the pointer is stated rather than resolved, because a proof
										that names a row nobody prints is a claim with no source.
</p>` : renderTemplate`<figure class="reference-entry__proof"> <p class="reference-entry__proof-head"> <span class="reference-entry__proof-mark-line"> ${Entry.proof.mark} </span> <span class="reference-entry__proof-state"> ${Entry.proof.state} </span> <span class="reference-entry__proof-component"> ${Entry.proof.component} </span> </p> <p class="reference-entry__proof-when">${Entry.proof.when}</p> <p class="reference-entry__proof-why"> <span class="reference-entry__key">WHY THIS ROW:</span> ${Entry.proof.why} </p> <p class="reference-entry__proof-links"> <a${addAttribute(LiveRow(Entry.key, Entry.proof.component), "href")}>
SEE THE ROW, LIVE
<span aria-hidden="true">→</span> </a> <a${addAttribute(Entry.href, "href")}>
THE FAMILY'S OWN MATRIX
<span aria-hidden="true">→</span> </a> </p> </figure>`}  <p class="reference-entry__head-line"> <span class="reference-entry__head-label">
WHAT THE EXPLORATION CHANGED:
</span> <span class="reference-entry__head-figure"> ${Entry.figures.changes} BEHAVIOUR
${Entry.figures.changes === 1 ? "" : "S"} / EACH INSIDE THE
										COMPONENT IT NAMES
</span> </p> ${Entry.changes.length === 0 ? renderTemplate`<p class="reference-entry__absent"> <span class="reference-entry__key">
◎ IMPROVEMENTS: UNAVAILABLE
</span> ${Entry.source} carries no <code>Improvements</code> export:
										its family was printed before the convention existed, so the
										behaviours its matrix produced are recorded as the notes on the
										cells it built - and those notes print in this entry's matrix
										and in the family's own band. The absence is stated rather
										than filled, because a behaviour with no cell behind it is a
										preference.
</p>` : renderTemplate`<ol class="reference-entry__changes"> ${Entry.changes.map((Change) => renderTemplate`<li class="reference-entry__change"> <p class="reference-entry__change-head"> <span class="reference-entry__change-component"> ${Change.component} </span> <span class="reference-entry__change-from">
FROM: ${Change.from} </span> </p> <p class="reference-entry__change-found"> <span class="reference-entry__key">FOUND:</span> ${Change.found} </p> <p class="reference-entry__change-built"> <span class="reference-entry__key">BUILT:</span> ${Change.built} </p> </li>`)} </ol>`}  <p class="reference-entry__head-line"> <span class="reference-entry__head-label">
WHAT ITS MATRIX DOES NOT ASK:
</span> <span class="reference-entry__head-figure"> ${UnaskedRow.conditions.length} CONDITIONS / ${UnaskedRow.cells} CELLS
										UNANSWERED
</span> </p> ${UnaskedRow.conditions.length === 0 ? renderTemplate`<p class="reference-entry__absent"> <span class="reference-entry__key">◎ NOTHING UNASKED</span>
This family's matrix puts a column against every condition the
										gallery's spine names - the only answer that needs no sentence
										under it.
</p>` : renderTemplate`<p class="reference-entry__unasked"> ${UnaskedRow.conditions.join(" / ")} ${" "} <span class="reference-entry__unasked-note">
- the family's matrix has no column for these, and${" "} <a href="/Specimen/States#unasked">
/THE UNASKED
<span aria-hidden="true">→</span> </a>${" "}
prints the sentence that says why.
</span> </p>`}  <p class="reference-entry__head-line"> <span class="reference-entry__head-label">ITS LIVE ROWS:</span> <span class="reference-entry__head-figure"> ${Entry.figures.specimens} ROWS IN ${Entry.figures.groups} GROUPS
</span> </p> <ol class="reference-entry__groups"> ${Entry.groups.map((Group) => renderTemplate`<li class="reference-entry__group"> <p class="reference-entry__group-label">${Group.label}</p> <p class="reference-entry__group-note">${Group.note}</p> </li>`)} </ol> <p class="reference-entry__source"> <span class="reference-entry__key">SOURCE:</span> ${Entry.source} <span class="reference-entry__key">LIVE:</span> <a${addAttribute(Entry.href, "href")}>${Entry.href}</a> </p> </div> </details> </section>`;
	})} </div>`}${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Specimen/SpecimenReference.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Specimen/SpecimenReference.astro", void 0);
// Source/pages/Specimen/Reference.astro
var Reference_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Reference,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://editor.land");
var $$Reference = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Reference;
	const MetaTitle = "Reference | Code Editor Land";
	const MetaDescription = `The component reference: ${EntryCount} families, one entry each - what the family is for, the ${SlotCount} parts a page may mount, the states and combinations it is asked, the ${LawCount} prohibitions its own matrix states in its own words, and the one live row that proves it, across ${MatrixCells} cells of the ten family matrices.`;
	const TrailItems = [
		{
			label: "/HOME",
			href: "/"
		},
		{
			label: "/SPECIMEN",
			href: "/Specimen"
		},
		{
			label: "/STATES",
			href: "/Specimen/States"
		},
		{ label: "/REFERENCE" }
	];
	const RegisterRows = Register();
	const CountedRegister = RegisterOf("REGISTER", RegisterRows);
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription,
		"Url": Astro.url.href,
		"lang": "en"
	}, {
		"default": ($$result) => renderTemplate`  ${renderComponent($$result, "Trail", $$Trail, {
			"trail": TrailItems,
			"class": "reference-page__trail"
		})} ${renderComponent($$result, "SurfaceShell", $$SurfaceShell, {
			"index": Head.index,
			"title": Head.title,
			"standfirst": Head.proposition,
			"states": [Row("REFERENCE", "VERIFIED")],
			"rows": [
				{
					key: "FAMILIES:",
					value: String(EntryCount)
				},
				{
					key: "SLOTS:",
					value: String(SlotCount)
				},
				{
					key: "PROHIBITIONS:",
					value: String(LawCount)
				},
				{
					key: "PROOFS:",
					value: `${ProofCount} OF ${EntryCount}`
				}
			]
		}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Contract,
			id: "contract"
		} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "SpecimenReference", $$SpecimenReference, { "part": "contract" })} ${maybeRenderHead($$result)}<p class="reference-page__note">
These seven hold before any family's own matrix is read, and they
				are the only sentences on this page that are not derived: they are
				the document's constitution, restated as a table because a
				contributor reads a table and skips a paragraph. Each names the
				section it comes from and the thing a reviewer looks at - a law
				with no check is a preference.
${` `}A family's own laws come after its slots, and they are the
				other way round: those are the sentences the family's matrix
				already uses to forbid a combination, collected rather than
				written.
</p> ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Families,
			id: "families"
		} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "SpecimenReference", $$SpecimenReference, { "part": "families" })} <p class="reference-page__note">
Ten entries in \`/Specimen\`'s order, so a reader who uses the two
				pages together finds the same family in the same place. Each entry
				answers five questions in the same sequence - what the family is
				for, its slots, what it is asked, what it may never be, and the row
				that proves it - so comparing two families is comparing the same
				questions rather than two authors' habits.
${` `}The matrix inside an entry is the family's OWN, not the
				gallery's spine: a cell that cannot exist prints \`N/A\` and a
				number, and the number is a link to the sentence that explains it.
				A sentence in a six-rem cell would be an excuse; a bare \`N/A\` with
				nothing to resolve it would be a hole. The number is the only
				arrangement that is both readable and complete.
${` `}The proof row is a claim with a destination: it prints the
				row's own mark, its state and the sentence that says when the state
				is right, then links to the live row on the states gallery and to
				the family's own matrix. A proof a reader cannot go and look at is
				not a proof.
</p> ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Register,
			id: "register"
		} }, {
			"default": ($$result) => renderTemplate` ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
				"rows": RegisterRows,
				"register": CountedRegister
			})} <p class="reference-page__note">
Every figure above is counted from the ten family modules, and the
				source row names the files it was counted from. The two
				denominators are printed apart on purpose: an entry's own matrix is
				its rows against its own columns, and the spine is the same rows
				against the gallery's twenty-two conditions - a page that added the
				two would be counting one component twice.
${` `}The proof row is the only thing on this page that was chosen
				rather than derived, and even it cannot drift: the mark is named in
				\`Reference.ts\` and resolved against the family's \`Specimens\`, so a
				row that moves out of a family leaves \`◎ PROOF: UNAVAILABLE\` behind
				instead of a pointer to a row nobody prints.
</p>  `,
			"foot": ($$result) => renderTemplate`${renderComponent($$result, "Onward", $$Onward, {
				"slot": "foot",
				"rows": Onward.rows,
				"copy": Onward.copy
			})}`
		})} ` })} `,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "Header", Header, {
			"client:load": true,
			"slot": "Header",
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})}`
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Specimen/Reference.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Specimen/Reference.astro";
var $$url = "/Specimen/Reference";
// \0virtual:astro:page:Source/pages/Specimen/Reference@_@astro
var page = () => Reference_exports;
export { page };
