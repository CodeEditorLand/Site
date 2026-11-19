import { $ as Rows$1, Ct as MatrixCell$5, Dt as Rows$5, Ft as MatrixCell, H as Rows$6, Mn as Rows$9, Mt as Columns, O as Rows$3, On as MatrixCell$9, P as Columns$6, R as MatrixCell$6, Rt as Rows, Wt as Columns$2, X as MatrixCell$1, Xt as Rows$2, at as Columns$4, b as Columns$3, hn as Rows$7, lt as MatrixCell$4, m as Rows$8, o as Columns$8, pt as Rows$4, q as Columns$1, qt as MatrixCell$2, rn as Columns$7, u as MatrixCell$8, un as MatrixCell$7, w as MatrixCell$3, wn as Columns$9, yt as Columns$5 } from "./SurfaceShell_Bi62faMK.mjs";
import { bt as Tone, ut as Padded } from "./Base_BVG1wSoZ.mjs";
/**
* The table, checked against the contract above.
*
* The annotation is the check, not a second declaration: every entry is measured
* against `Condition`, so a misspelt group or a status word outside §1.5's eight
* is a type error at this line rather than a page that prints it.
*/
var Conditions = [
	{
		key: "rest",
		label: "REST",
		ask: "untouched",
		group: "condition",
		status: "READY",
		when: "The state a component is in before anything has happened to it: the first frame of every page, and the one state that has to be right with no script at all."
	},
	{
		key: "empty",
		label: "EMPTY",
		ask: "nothing exists yet",
		group: "condition",
		status: "PREPARING",
		when: "Right when the set is genuinely empty and the reader is owed what would be here, why it is not and where to go next - never a frame over nothing."
	},
	{
		key: "loading",
		label: "LOADING",
		ask: "has not arrived",
		group: "condition",
		status: "LOADING",
		when: "Right while the shape of the record is known and its values are not: the skeleton prints the schema, which is the one thing a spinner cannot do."
	},
	{
		key: "partial",
		label: "PARTIAL",
		ask: "one part unknown",
		group: "condition",
		status: "UNAVAILABLE",
		when: "Right when most facts are in hand and one is not: the known facts print, and the missing one prints `UNAVAILABLE` rather than a zero."
	},
	{
		key: "error",
		label: "ERROR",
		ask: "a step failed",
		group: "condition",
		status: "INTERRUPTED",
		when: "Right after a failed action: the cause, the retry and the destination, in that order, because a reader who is told what broke can act on it."
	},
	{
		key: "stale",
		label: "STALE",
		ask: "older than its as-of",
		group: "condition",
		status: "ARCHIVED",
		when: "Right when the reading is real and old: the value stays visible and the date prints beside it with its age, rather than the value being withdrawn."
	},
	{
		key: "disabled",
		label: "DISABLED",
		ask: "cannot be used",
		group: "condition",
		status: "PREPARING",
		when: "Right when the control exists and is not armed yet: the label stays legible and the reason is stated, rather than implied by a grey box."
	},
	{
		key: "readonly",
		label: "READ-ONLY",
		ask: "cannot be changed",
		group: "condition",
		status: "READY",
		when: "Right when the value is a fact the reader may check and may not edit: it prints at full ink, because read-only is a permission and not a weakness."
	},
	{
		key: "missing",
		label: "MISSING",
		ask: "the target is gone",
		group: "condition",
		status: "UNAVAILABLE",
		when: "Right when the thing a row pointed at no longer exists: a tombstone in the record grammar that says what was there, never a dead link."
	},
	{
		key: "denied",
		label: "DENIED",
		ask: "the reader may not see it",
		group: "condition",
		status: "UNAVAILABLE",
		when: "Right when the surface exists and the reader may not have it: say what it is, because \"you cannot see this\" tells a reader nothing they can act on."
	},
	{
		key: "one",
		label: "ONE",
		ask: "a set of one",
		group: "shape",
		when: "Right when the design was drawn for six and the data holds one: the row keeps its place and the band keeps its air, rather than collapsing to a stub."
	},
	{
		key: "many",
		label: "MANY",
		ask: "a set of two hundred",
		group: "shape",
		when: "Right when the set outgrew the design: the block holds, and the window states its own figure instead of printing the first six as if they were all."
	},
	{
		key: "long",
		label: "LONG",
		ask: "a line past its column",
		group: "shape",
		when: "Right when a title, a path or a hash will not fit: the layout must not break, and the value must stay recoverable in full."
	},
	{
		key: "narrow",
		label: "NARROW",
		ask: "a narrow column",
		group: "shape",
		when: "Right in a rail, a margin or a 16rem card: the block re-composes rather than shrinking into a column of ellipses."
	},
	{
		key: "wide",
		label: "WIDE",
		ask: "a wide band",
		group: "shape",
		when: "Right across a full measure: the block must not stretch a line past the point where the eye loses it."
	},
	{
		key: "dense",
		label: "DENSE",
		ask: "the tight step",
		group: "shape",
		when: "Right inside a card or a pane: the step is padding and never type, and nothing is dropped to make it fit."
	},
	{
		key: "incard",
		label: "IN A CARD",
		ask: "a record inside a card",
		group: "context",
		when: "Right when the artifact is the card's content: a record inside a Jelly surface, and never a card inside a card."
	},
	{
		key: "inband",
		label: "IN A BAND",
		ask: "a record inside a band",
		group: "context",
		when: "Right when the artifact is one chapter of a page: the band supplies the interval and the block supplies the record."
	},
	{
		key: "withaction",
		label: "WITH ACTION",
		ask: "one thing to click",
		group: "context",
		when: "Right when the block carries the one thing the reader clicks: one expressive action per artifact, and the ink-inverted surface is that action's."
	},
	{
		key: "noaction",
		label: "NO ACTION",
		ask: "nothing to click",
		group: "context",
		when: "Right when the block is read and not acted on: a record with no door is complete, and a decorative button is a lie about what the page can do."
	},
	{
		key: "print",
		label: "ON PAPER",
		ask: "the printed sheet",
		group: "context",
		when: "Right when the sheet is printed: the chrome drops, the link targets print, and no state may depend on a colour or a hover to be read."
	},
	{
		key: "reduced",
		label: "REDUCED",
		ask: "no motion asked for",
		group: "context",
		when: "Right when the reader asked for less motion: the change of state still reads, because the motion was never carrying the meaning."
	}
];
/** How many conditions the spine asks. */
var ConditionCount = Conditions.length;
/** The conditions by key, for the lookups the builders do. */
var ConditionByKey = new Map(Conditions.map((Condition) => [Condition.key, Condition]));
/** Whether a family column key folds onto the spine. */
var OnSpine = (Key) => ConditionByKey.has(Key);
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
var Synonym = {
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
	print: "print"
};
/** The spine key a family column answers, or `undefined` if it is its own. */
var Folded = (Key) => {
	const Key2 = Synonym[Key] ?? Key;
	return OnSpine(Key2) ? Key2 : void 0;
};
var Meta = [
	{
		key: "field",
		band: "/THE FIELD",
		href: "/Specimen#field",
		source: "CONTENT/SPECIMEN/FIELD.TS",
		subject: "A control's states are the design: what it is when it is empty, refused, read-only, or not visible at all.",
		gap: "The input family asks what a control does when the world is unkind to the control itself - invalid, required, hint, counter, addon - and leaves the conditions that belong to the block holding it to that block. A field cannot fail a read it never makes, and its age is the record's as-of rather than the input's."
	},
	{
		key: "overlay",
		band: "/THE OVERLAY",
		href: "/Specimen#overlay",
		source: "CONTENT/SPECIMEN/OVERLAY.TS",
		subject: "An overlay is judged in the two seconds after a click: what it covers, what it returns to, and the five ways out.",
		gap: "The overlay family asks what a panel does in the two seconds after a click - hover, focus, current, submenu, taller than the viewport, near the edge, trigger removed - and leaves the states of the content it covers to the block that renders it. A slip is dismissed; it is not edited, and it outlives no target."
	},
	{
		key: "display",
		band: "/THE DISPLAY",
		href: "/Specimen#display",
		source: "CONTENT/SPECIMEN/DISPLAY.TS",
		subject: "A display is read rather than used: its worst state is not a failed action but a figure that lies about its own extent.",
		gap: "The display family asks the widest question set of the ten and still leaves one condition out: a display is read, so `read-only` names nothing it could be refused. It also never asks for a missing target or a denied reader, because a figure has no door and no owner."
	},
	{
		key: "record",
		band: "/THE RECORD",
		href: "/Specimen#record",
		source: "CONTENT/SPECIMEN/RECORD.TS",
		subject: "A ledger is believed, not used. A fact that has lost its adverse state is a fact that lies.",
		gap: "The ledger family asks its long values as two arms - `LONG KEY` and `LONG VALUE` - which is the most precise answer on this page and the reason one cell here is read from two columns. It leaves the two arms no matrix asks, because a ledger is believed: it has no action to deny and no target to lose."
	},
	{
		key: "narrative",
		band: "/THE NARRATIVE",
		href: "/Specimen#narrative",
		source: "CONTENT/SPECIMEN/NARRATIVE.TS",
		subject: "A narrative block is the thing a reader is told: a band opens a subject, a stage explains an order, a figure shows evidence.",
		gap: "The narrative family asks what a block says when the world is unkind to the sentence - no media, one step, ninety steps, a failed turn - and leaves the print medium and the action's absence to the page. A band that is read is not a band that is clicked, and a printed band is the page's fact rather than the block's."
	},
	{
		key: "frame",
		band: "/THE FRAME",
		href: "/Specimen#frame",
		source: "CONTENT/SPECIMEN/FRAME.TS",
		subject: "The frame decides whether content can be read at all - and its one law is that nothing here is a card.",
		gap: "The frame family asks its own compositions - no rail, two rails, a shell inside a shell, a pane pair at 640px, a plate with no image - and leaves the states of a record to the record. A shell holds tracks: it states no fact, points at no target, and carries no action of its own."
	},
	{
		key: "reading",
		band: "/THE READING",
		href: "/Specimen#reading",
		source: "CONTENT/SPECIMEN/READING.TS",
		subject: "Furniture fails by losing the reader: a rail that does not say where you are, a folio that does not say how far you have got.",
		gap: "The reading family asks where the reader is - one section, ninety sections, a heading wider than the rail, no summary, no cross-reference, a strip at 640px - and leaves the motion arm to the blocks that move. Furniture that is already in place does not animate into place, and a rail of destinations is not a set a band holds."
	},
	{
		key: "composition",
		band: "/THE COMPOSITION",
		href: "/Specimen#composition",
		source: "CONTENT/SPECIMEN/COMPOSITION.TS",
		subject: "The marketing layer is a layer, not a block: thirty-five `Dynamic/*` parts built to be the schema between content and surface.",
		gap: "The composition family asks the marketing layer's own shapes - no plate, three, nine, at 16, at 240, lone, no action - and asks `NO ACTION` where the other families ask `WITH ACTION`. It leaves the motion arm and the positive action to the blocks it composes: a hero is a page's first sentence, and a first sentence does not animate."
	},
	{
		key: "small",
		band: "/THE SMALL SURFACES",
		href: "/Specimen#small",
		source: "CONTENT/SPECIMEN/SMALL.TS",
		subject: "A small surface fails by being abandoned: the page a reader reaches when they are locked out, and the page nobody designed a second state for.",
		gap: "The small-surface family asks the seven ways a locked-out reader arrives - signed out, signing in, signed in, expired, denied, a failed submit, a missing clause - and leaves the motion arm and the band context to the shell. A credential route is a page, not a chapter, and its transitions are the browser's own navigation."
	},
	{
		key: "apparatus",
		band: "/THE APPARATUS",
		href: "/Specimen#apparatus",
		source: "CONTENT/SPECIMEN/APPARATUS.TS",
		subject: "Apparatus fails by being absent and unnoticed: a motion that does not fire, a provider that was never configured, a trail with no crumbs.",
		gap: "The apparatus family asks what fails silently - reduced motion, no trigger, no image, no logo, unfurled, offline, unconfigured - and leaves the band context to the pages that band it. A provider renders no markup, and a head prints no chapter."
	}
];
/**
* Read one family's tables into the gallery's shape.
*
* The function is generic over the family's own row, column and cell types, so
* each of the ten calls is checked against the module it reads and no cast is
* needed anywhere - which matters, because a cast here would let a family whose
* `MatrixCell` had changed shape be read as if it had not.
*/
var ReadFamily = (About, Rows, Columns, CellOf) => {
	/** The family's columns, grouped by the spine condition each answers. */
	const Answered = /* @__PURE__ */ new Map();
	/** The columns that are the family's own, in its own order. */
	const Own = [];
	for (const Column of Columns) {
		const Key = Folded(Column.key);
		if (Key === void 0) {
			Own.push({
				key: Column.key,
				label: Column.label
			});
			continue;
		}
		const Existing = Answered.get(Key);
		if (Existing === void 0) Answered.set(Key, [Column]);
		else Existing.push(Column);
	}
	const Components = Rows.map((Row) => {
		const Cells = {};
		for (const Condition of Conditions) {
			const Answering = Answered.get(Condition.key);
			if (Answering === void 0 || Answering.length === 0) {
				Cells[Condition.key] = {
					disposition: "unasked",
					reason: `${About.band} does not ask \`${Condition.label}\`: the family's matrix has no column for it, and /THE UNASKED prints why that family asks what it asks.`
				};
				continue;
			}
			const Read = Answering.map((Column) => ({
				Column,
				Cell: CellOf(Row, Column)
			}));
			const Built = Read.find(({ Cell }) => Cell.disposition === "built");
			const ColumnLabel = Answering.map((Column) => Column.label).join(" / ");
			if (Built !== void 0) {
				Cells[Condition.key] = {
					disposition: "built",
					column: ColumnLabel,
					...Built.Cell.note === void 0 ? {} : { note: Built.Cell.note }
				};
				continue;
			}
			/**
			* A cell that cannot exist must carry a sentence. A family that
			* marked one `na` without a reason has a defect in its matrix, and
			* the gallery says so rather than printing a blank cell - which is
			* the same rule the ledger follows for a fact it does not have.
			*/
			const Reason = Read.find(({ Cell }) => Cell.reason !== void 0)?.Cell.reason ?? `\`${About.source}\` marks \`${Row.name} / ${ColumnLabel}\` as impossible without writing the reason, which is a defect in the family's matrix rather than a fact about the component.`;
			Cells[Condition.key] = {
				disposition: "na",
				reason: Reason,
				column: ColumnLabel
			};
		}
		const Count = (Disposition) => Conditions.filter((Condition) => Cells[Condition.key].disposition === Disposition).length;
		return {
			id: `${About.key.toUpperCase()}/${Row.name}`,
			family: About.key,
			name: Row.name,
			file: Row.file ?? Row.part ?? "UNAVAILABLE",
			note: Row.note ?? "UNAVAILABLE",
			cells: Cells,
			built: Count("built"),
			reasons: Count("na"),
			unasked: Count("unasked")
		};
	});
	const Sum = (Pick) => Components.reduce((Total, Component) => Total + Pick(Component), 0);
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
		unasked: Sum((Component) => Component.unasked)
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
var Families = [
	ReadFamily(Meta[0], Rows, Columns, MatrixCell),
	ReadFamily(Meta[1], Rows$1, Columns$1, MatrixCell$1),
	ReadFamily(Meta[2], Rows$2, Columns$2, MatrixCell$2),
	ReadFamily(Meta[3], Rows$3, Columns$3, MatrixCell$3),
	ReadFamily(Meta[4], Rows$4, Columns$4, MatrixCell$4),
	ReadFamily(Meta[5], Rows$5, Columns$5, MatrixCell$5),
	ReadFamily(Meta[6], Rows$6, Columns$6, MatrixCell$6),
	ReadFamily(Meta[7], Rows$7, Columns$7, MatrixCell$7),
	ReadFamily(Meta[8], Rows$8, Columns$8, MatrixCell$8),
	ReadFamily(Meta[9], Rows$9, Columns$9, MatrixCell$9)
];
/** Every component on the page, in family order then the family's own order. */
var Components = Families.flatMap((Family) => Family.components);
/** How many components the gallery reads. */
var ComponentCount = Components.length;
/** How many families the gallery reads. */
var FamilyCount = Families.length;
/** How many cells the gallery holds: every component against every condition. */
var CellCount = ComponentCount * ConditionCount;
/** How many cells a family builds, in total. */
var BuiltCount = Families.reduce((Total, Family) => Total + Family.built, 0);
/** How many cells are impossible, and carry a written reason. */
var ReasonCount = Families.reduce((Total, Family) => Total + Family.reasons, 0);
/** How many cells the ten matrices never ask. */
var UnaskedCount = Families.reduce((Total, Family) => Total + Family.unasked, 0);
/** How many cells the ten matrices print between them, as they count them. */
var MatrixCellCount = Families.reduce((Total, Family) => Total + Family.matrixCells, 0);
/**
* The spine read down instead of across: one row per condition, with the figure
* every family contributes.
*
* This is the view no family matrix can print - a family knows its own rows, not
* the document's - and it is what makes a condition's health legible: `MISSING`
* is asked by no family, `DISABLED` is impossible for more components than it is
* built for, and `REST` is built by everything because it is the default.
*/
var ConditionRows = Conditions.map((Condition) => {
	const Read = Components.map((Component) => Component.cells[Condition.key]);
	const FamiliesThatBuild = Families.filter((Family) => Family.components.some((Component) => Component.cells[Condition.key].disposition === "built")).map((Family) => Family.band);
	return {
		condition: Condition,
		built: Read.filter((Cell) => Cell.disposition === "built").length,
		reasons: Read.filter((Cell) => Cell.disposition === "na").length,
		unasked: Read.filter((Cell) => Cell.disposition === "unasked").length,
		families: FamiliesThatBuild,
		tone: Condition.status === void 0 ? void 0 : Tone(Condition.status)
	};
});
ConditionRows.filter((Row) => Row.built === 0 && Row.reasons === 0);
/**
* The sentences that explain more than one cell, in descending order.
*
* A reason written once and reused is a fact about a CLASS of parts - the
* overlay family's `Reason` table is written once and taken by every row that
* shares the absence - and those are the sentences worth printing on a term
* sheet. The reasons that explain one cell each are printed in full inside the
* component's own row below, and a page that repeated them here would be the
* same text twice.
*
* The grouping is exact: two reasons are one entry when their text is identical.
* No template is inferred and no sentence is shortened to make a group, because
* a shortened reason is an excuse rather than a fact.
*/
var Reasons = (() => {
	const Grouped = /* @__PURE__ */ new Map();
	for (const Component of Components) for (const Condition of Conditions) {
		const Cell = Component.cells[Condition.key];
		if (Cell.disposition !== "na" || Cell.reason === void 0) continue;
		const Existing = Grouped.get(Cell.reason);
		const Where = `${Component.id} / ${Condition.label}`;
		if (Existing === void 0) Grouped.set(Cell.reason, [Where]);
		else Existing.push(Where);
	}
	return [...Grouped.entries()].filter(([, Cells]) => Cells.length > 1).sort((A, B) => B[1].length - A[1].length).map(([Text, Cells], Index) => ({
		mark: Padded(Index + 1),
		text: Text,
		cells: Cells,
		count: Cells.length
	}));
})();
/** How many distinct sentences explain the document's impossible cells. */
var DistinctReasonCount = (() => {
	const Seen = /* @__PURE__ */ new Set();
	for (const Component of Components) for (const Condition of Conditions) {
		const Cell = Component.cells[Condition.key];
		if (Cell.disposition === "na" && Cell.reason !== void 0) Seen.add(Cell.reason);
	}
	return Seen.size;
})();
/** How many distinct sentences explain exactly one cell. */
var SingleReasonCount = DistinctReasonCount - Reasons.length;
/**
* The work list: every condition a family never asks, with the number of its own
* components the answer would cover.
*
* Sorted by the size of the hole rather than by family order, because a card
* that picks this up should start where the most cells are unaccounted for.
*/
var Unasked = Families.map((Family) => {
	const Conditions2 = Conditions.filter((Condition) => Family.components.every((Component) => Component.cells[Condition.key].disposition === "unasked"));
	return {
		family: Family,
		conditions: Conditions2,
		cells: Conditions2.length * Family.components.length
	};
}).sort((A, B) => B.cells - A.cells);
/**
* The behaviours that only became visible once every component was on one page.
*
* Each one names the condition behind it, because an improvement with no cell
* behind it is a preference - and each one lives INSIDE the component it names,
* not in a wrapper around it.
*/
var Improvements = [
	{
		component: "ShellState",
		from: "STALE",
		found: "The stale arm printed `AS OF:` and `AGE:` only when the caller had already worked the age out - and two callers did it before handing the date over (`Specimen.astro` with its own `AgeInDays`, `EdgeLeaf` through `EdgeDaysBetween`). A block that cannot derive its own figure is a block that asks every caller to.",
		now: "`asOf` alone now prints `AGE: n DAYS`, derived in the block from the date it was given; `age` still wins where a caller knows better, so no existing rendering changes."
	},
	{
		component: "ShellState",
		from: "MANY",
		found: "The too-much arm printed `SHOWING: 6 OF 212` and then a `NEXT:` link, leaving the remainder as a subtraction the reader had to do before deciding whether to follow the door.",
		now: "The arm prints `ALL:` above the door with the figure it holds - `206 MORE` - computed from `total - shown`, so the set's size is stated once and the door says what it opens onto."
	},
	{
		component: "SpecimenGallery",
		from: "ALL",
		found: `At ${ComponentCount} components and ${CellCount} cells the family matrices' footnote anatomy stops scaling: a numbered note per cell would be thousands of numbers to chase, and a table that prints every reason in its cell is a table with no cells.`,
		now: "Each component is a disclosure. Closed, the row prints its mark, its name, its file and its strip of cells. Open, it prints every condition with its note or its reason in full - so the reason is one keystroke away and never truncated."
	},
	{
		component: "SpecimenGallery",
		from: "NARROW",
		found: `Twenty-two columns do not fit a narrow measure, and a grid that shrinks them below the type floor stops being readable - the failure the family matrices avoid by scrolling.`,
		now: "The strip is a fixed grid inside its own scroll frame with the component's name pinned to the leading edge, so the page never scrolls sideways and the strip always does."
	},
	{
		component: "SpecimenGallery",
		from: "NO ACTION",
		found: "A strip of twenty-two glyphs is a wall to a screen reader, and a row whose only affordance is a mouse target is a row a keyboard reader cannot open.",
		now: "The row is a `<details>`/`<summary>` - the browser's own disclosure, reachable with Tab and Enter - and the glyph strip is `aria-hidden`, with the summary carrying `17 OF 22 BUILT` as its accessible figure."
	},
	{
		component: "Content/Specimen/Gallery.ts",
		from: "DENIED",
		found: "Ten matrices wrote ten question sets, and the union is larger than any one of them: no family asks the brief's `MISSING` arm, one asks `DENIED`, and `READ-ONLY` is asked by most of them and impossible in six. The hole was invisible from inside any single file.",
		now: "The gallery asks all twenty-two of every component and records the unanswered ones as `UNASKED` with the family that owes the answer - so the hole is counted on the sheet instead of being invisible in ten separate files."
	}
];
/**
* The observations this card did not act on.
*
* A card that fixes everything it notices is a card that has not said what it
* noticed. These are the three things the unified view made obvious and this
* card deliberately left alone.
*/
var Observations = [
	{
		subject: "THE TEN QUESTION SETS",
		note: "The families' matrices disagree about what to ask - `READ-ONLY` is asked by four of ten, `REDUCED` by six, `NO ACTION` by three. Converging them means editing ten tables that each print their own figures on `/Specimen`, and that is a card of its own rather than a side effect of this one.",
		owner: "a later card, with `/Specimen`'s ten matrices in scope"
	},
	{
		subject: "THE TWO OPEN ARMS",
		note: "`MISSING` is the brief's arm that no family matrix asks, and `DENIED` is asked by one - the small surfaces, for a reader who may not see a page. `ShellState` renders both, and `ShellRail` already prints `◎` for a row that is gone, so the capability exists and only the accounting does not.",
		owner: "the card that converges the question sets"
	},
	{
		subject: "THE DUPLICATED REASONS",
		note: "Seventy-five column keys fold into twenty-two conditions, but the reasons behind them do not fold at all: the same fact is written out per component (`A ${what} is not a control`), which is why the document needs its distinct sentences counted rather than its sentences shared. Extracting the parameterised bases would shrink the reason register and is a refactor of ten files.",
		owner: "a later card, after the question sets converge"
	}
];
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
var Wall = [
	{
		mark: "WALL_01",
		condition: "rest",
		component: "RECORDLEDGER",
		when: Conditions[0].when,
		kind: "ledger",
		stage: "band",
		ledger: {
			label: "THE RECORD",
			rows: [
				{
					key: "TARGET:",
					value: "MACOS / AARCH64"
				},
				{
					key: "LICENSE:",
					value: "CC0"
				},
				{
					key: "STATUS:",
					value: "ACTIVE"
				}
			]
		}
	},
	{
		mark: "WALL_02",
		condition: "empty",
		component: "SHELLSTATE",
		when: Conditions[1].when,
		kind: "state",
		stage: "band",
		state: {
			kind: "empty",
			index: "RELEASES / 00",
			statement: "No build is published yet, so this record holds no release.",
			cause: "Every build so far has been made from source. The first published artifact will appear here with its checksum and its signing status.",
			next: {
				label: "READ THE SOURCE",
				href: "/Download"
			},
			rows: [{
				key: "CHANNEL:",
				value: "PUBLIC"
			}, {
				key: "SIGNING:",
				value: "PLANNED"
			}]
		}
	},
	{
		mark: "WALL_03",
		condition: "loading",
		component: "SHELLSTATE",
		when: Conditions[2].when,
		kind: "state",
		stage: "band",
		state: {
			kind: "loading",
			index: "RELEASES / 04",
			statement: "The release register has not arrived yet.",
			cause: "Waiting on the build manifest.",
			keys: [
				"TARGET:",
				"LICENSE:",
				"SIGNING:",
				"CHECKSUM:"
			]
		}
	},
	{
		mark: "WALL_04",
		condition: "partial",
		component: "SHELLSTATE",
		when: Conditions[3].when,
		kind: "state",
		stage: "band",
		state: {
			kind: "partial",
			index: "RELEASES / 04",
			statement: "Three of the four facts are known and the fourth is not.",
			cause: "The signing identity has not been published, so the checksum cannot be verified against it.",
			next: {
				label: "READ THE CHANNEL",
				href: "/Download"
			},
			rows: [
				{
					key: "TARGET:",
					value: "MACOS / AARCH64"
				},
				{
					key: "LICENSE:",
					value: "CC0"
				},
				{
					key: "CHECKSUM:",
					value: "UNAVAILABLE"
				}
			]
		}
	},
	{
		mark: "WALL_05",
		condition: "error",
		component: "SHELLSTATE",
		when: Conditions[4].when,
		kind: "state",
		stage: "band",
		state: {
			kind: "error",
			index: "VERIFY / 02",
			statement: "The checksum did not match the file that was downloaded.",
			cause: "The transfer completed but the digest differs from the published one, which means the bytes changed on the way.",
			next: {
				label: "DOWNLOAD AGAIN",
				href: "/Download"
			}
		}
	},
	{
		mark: "WALL_06",
		condition: "stale",
		component: "SHELLSTATE",
		when: Conditions[5].when,
		kind: "state",
		stage: "band",
		state: {
			kind: "stale",
			index: "COMPARE / 06",
			statement: "The last known compatibility reading, kept visible.",
			cause: "The measurement is older than this build.",
			asOf: "2026-01-06",
			rows: [{
				key: "EXTENSIONS:",
				value: "UNMODIFIED"
			}, {
				key: "VS CODE API:",
				value: "1.94"
			}]
		}
	},
	{
		mark: "WALL_07",
		condition: "disabled",
		component: "DYNAMICINPUT",
		when: Conditions[6].when,
		kind: "field",
		stage: "narrow",
		field: {
			label: "HANDLE",
			value: "UNAVAILABLE",
			disabled: true,
			hint: "The account directory has not been read, so the handle is not known yet."
		}
	},
	{
		mark: "WALL_08",
		condition: "readonly",
		component: "DYNAMICINPUT",
		when: Conditions[7].when,
		kind: "field",
		stage: "narrow",
		field: {
			label: "EMAIL",
			value: "reader@editor.land",
			readonly: true,
			hint: "A verified address is a fact the reader may check and may not edit here."
		}
	},
	{
		mark: "WALL_09",
		condition: "missing",
		component: "SHELLSTATE",
		when: Conditions[8].when,
		kind: "state",
		stage: "band",
		state: {
			kind: "missing",
			index: "DOC / 41",
			statement: "The article this index row pointed at is no longer in the collection.",
			cause: "The slug was filed against a page that was later retired, and the address now resolves to nothing.",
			next: {
				label: "READ THE INDEX",
				href: "/Doc"
			},
			rows: [{
				key: "WAS:",
				value: "/Doc/legacy-cli"
			}]
		}
	},
	{
		mark: "WALL_10",
		condition: "denied",
		component: "SHELLSTATE",
		when: Conditions[9].when,
		kind: "state",
		stage: "band",
		state: {
			kind: "denied",
			index: "DASHBOARD / 01",
			statement: "The dashboard is the account's own instrument: its build status, its channels and its quota.",
			cause: "This session is signed out, so the instrument exists and this reader may not read it.",
			next: {
				label: "SIGN IN",
				href: "/SignIn"
			}
		}
	},
	{
		mark: "WALL_11",
		condition: "one",
		component: "RECORDLEDGER",
		when: Conditions[10].when,
		kind: "ledger",
		stage: "narrow",
		ledger: {
			label: "THE FACTS",
			rows: [{
				key: "TARGET:",
				value: "MACOS / AARCH64"
			}]
		}
	},
	{
		mark: "WALL_12",
		condition: "many",
		component: "SHELLSTATE",
		when: Conditions[11].when,
		kind: "state",
		stage: "band",
		state: {
			kind: "too-much",
			index: "REGISTER / 212",
			statement: "The register holds two hundred and twelve routes and this band was drawn for six.",
			cause: "Filed by prefix, so the first window is the alphabetical head of the set.",
			shown: 6,
			total: 212,
			next: {
				label: "READ THE WHOLE REGISTER",
				href: "/Contents"
			}
		}
	},
	{
		mark: "WALL_13",
		condition: "long",
		component: "SHELLSTATE",
		when: Conditions[12].when,
		kind: "state",
		stage: "band",
		state: {
			kind: "too-long",
			index: "PATHS / 07",
			statement: "One path in the tree is longer than the column that holds it.",
			value: "Source/Component/Dynamic/Interface/Content/Page/PortalData.ts",
			limit: "72CH",
			next: {
				label: "READ THE TREE",
				href: "/Doc"
			}
		}
	},
	{
		mark: "WALL_14",
		condition: "narrow",
		component: "SHELLSTATE",
		when: Conditions[13].when,
		kind: "state",
		stage: "narrow",
		state: {
			kind: "partial",
			index: "ASIDE / 01",
			statement: "Printed in a 16rem column, where the key cannot sit beside its value.",
			cause: "The state's own container is narrow, not the viewport.",
			rows: [{
				key: "TARGET:",
				value: "MACOS / AARCH64"
			}, {
				key: "CHECKSUM:",
				value: "UNAVAILABLE"
			}],
			dense: true
		}
	},
	{
		mark: "WALL_15",
		condition: "wide",
		component: "SHELLSTATE",
		when: Conditions[14].when,
		kind: "state",
		stage: "wide",
		state: {
			kind: "stale",
			index: "COMPARE / 06",
			statement: "Printed across a wide band, where the rows are read across.",
			cause: "The same state at the band's own measure.",
			asOf: "2026-01-06",
			rows: [{
				key: "EXTENSIONS:",
				value: "UNMODIFIED"
			}, {
				key: "VS CODE API:",
				value: "1.94"
			}]
		}
	},
	{
		mark: "WALL_16",
		condition: "dense",
		component: "SHELLSTATE",
		when: Conditions[15].when,
		kind: "state",
		stage: "card",
		state: {
			kind: "empty",
			index: "CARD / 00",
			statement: "The tight step, inside a card: the same rows, one step less air.",
			cause: "Nothing is dropped to make it fit - the step is padding, not type.",
			dense: true,
			surface: "bare"
		}
	},
	{
		mark: "WALL_17",
		condition: "incard",
		component: "SHELLSTATE",
		when: Conditions[16].when,
		kind: "state",
		stage: "card",
		state: {
			kind: "denied",
			index: "CARD / 01",
			statement: "A state printed inside a Jelly card: no fill and no frame of its own, because a white box in a white card is a card in a card.",
			cause: "The card is the surface; the state is a section of it.",
			surface: "bare"
		}
	},
	{
		mark: "WALL_18",
		condition: "inband",
		component: "SHELLSTATE",
		when: Conditions[17].when,
		kind: "state",
		stage: "band",
		state: {
			kind: "empty",
			index: "BAND / 00",
			statement: "A state inside a band: the band supplies the interval, the state supplies the record.",
			cause: "The band's heading is above; the state is what its body holds.",
			surface: "bare"
		}
	},
	{
		mark: "WALL_19",
		condition: "withaction",
		component: "SHELLSTATE",
		when: Conditions[18].when,
		kind: "state",
		stage: "band",
		state: {
			kind: "error",
			index: "VERIFY / 03",
			statement: "The same failure, with the one door it can offer.",
			cause: "One action per artifact, and it is the thing the reader would do next.",
			next: {
				label: "RETRY THE CHECK",
				href: "/Verify"
			}
		}
	},
	{
		mark: "WALL_20",
		condition: "noaction",
		component: "SHELLSTATE",
		when: Conditions[19].when,
		kind: "state",
		stage: "band",
		state: {
			kind: "partial",
			index: "VERIFY / 04",
			statement: "The same partial state with no door at all: a record that is read rather than acted on.",
			cause: "Nothing on this surface can change the fact, so offering a link would be a door onto a wall.",
			rows: [{
				key: "SIGNING:",
				value: "UNAVAILABLE"
			}]
		}
	},
	{
		mark: "WALL_21",
		condition: "print",
		component: "PRINTRECORD",
		when: Conditions[20].when,
		kind: "print",
		stage: "band"
	},
	{
		mark: "WALL_22",
		condition: "reduced",
		component: "MOTIONSKELETON",
		when: Conditions[21].when,
		kind: "skeleton",
		stage: "band"
	}
];
/** How many live rows the wall prints. */
var WallCount = Wall.length;
/** The gallery's opening, in the sheet's own grammar. */
var Head = {
	index: "# SPECIMEN_02",
	title: "Every component, every state",
	proposition: `One page for the whole document: ${ComponentCount} components against the ${ConditionCount} conditions they are asked, read from the ten family matrices rather than written again - so a cell here and a cell there are the same cell, and the term sheet cannot drift from the evidence.`
};
/** The gallery's bands, in the order they are read. */
var Bands = {
	Spine: {
		kicker: "/THE SPINE",
		interval: "turn",
		heading: `The ${ConditionCount} conditions`,
		standfirst: `Ten matrices ask seventy-five column keys between them, and those keys fold onto ${ConditionCount} conditions - \`oneitem\` is \`one\`, \`longtext\` is \`long\`, \`card\` is \`incard\`, \`reduced\` is \`reducedmotion\`. The spine is the fold, printed: what each condition asks, the status word it answers to where it has one, and the one line that says when the state is right.`,
		footnote: "A condition without a status word is not a gap in the register - it is a shape, and a shape has no tone. Eight words state a record's condition; a column width is not one."
	},
	Sheet: {
		kicker: "/THE SHEET",
		interval: "rest",
		heading: `Ten families, ${ConditionCount} conditions`,
		standfirst: "The same grid at family scale: each cell is the number of that family's components that build the condition, over the number it holds. This is the term sheet's first page - a reader can see where a family is thin before reading a single component.",
		footnote: "A family's own conditions are not on this sheet, and that is the point of it: the spine is what the ten matrices have in common, and each family's own columns stay on its own matrix where they are the subject."
	},
	Catalog: {
		kicker: "/THE CATALOG",
		interval: "break",
		heading: "Every component, one row",
		standfirst: `One disclosure per component, in family order. Closed, the row is a strip of ${ConditionCount} cells and a figure. Open, it is the component's whole ledger: what it is, the file it lives in, and every condition with its note or its reason in full.`,
		footnote: "Nothing is truncated to fit a cell. The strip is the scan and the open row is the evidence - which is the only arrangement that survives four thousand cells."
	},
	Reasons: {
		kicker: "/THE REASONS",
		interval: "rest",
		heading: "The sentences that explain a class",
		standfirst: "A reason written once and reused is a fact about a class of parts, not about one part: a printed block is not a control, a mark has no text state, a leaf cannot be a set. Those sentences are printed here in full, with every cell each one explains.",
		footnote: "The grouping is exact - two reasons are one entry when their text is identical - so nothing is inferred and no sentence is shortened to make a group. A reason that explains a single cell is printed in full inside that component's own row above."
	},
	Unasked: {
		kicker: "/THE UNASKED",
		interval: "rest",
		heading: "What no matrix asks",
		standfirst: "The third answer, and the honest one: a condition a family's matrix has no column for is not built and not impossible - it is unanswered. This band is the work list, per family, with the number of that family's components the answer would cover.",
		footnote: "A term sheet that printed only what it knew would be a shorter document and a worse one. The holes are counted on the sheet because a hole in ten separate files is invisible from all ten."
	},
	Wall: {
		kicker: "/THE WALL",
		interval: "break",
		heading: "The conditions, mounted",
		standfirst: "Twenty-two rows, one per condition, each on the artifact that owns it rather than on the component nearest to hand: `EMPTY` is the state block's, `READ-ONLY` is a field's, `ON PAPER` is the print layer's, `REDUCED` is the skeleton's.",
		footnote: "Two of the twenty-two cannot be photographed on screen at all. Their rows print the contract they expose, because a picture of a print stylesheet is a picture of nothing."
	},
	Improvements: {
		kicker: "/THE IMPROVEMENTS",
		interval: "rest",
		heading: "What the whole document revealed",
		standfirst: "Six behaviours that only became visible once every component was on one page. Each names the condition behind it, because an improvement with no cell behind it is a preference.",
		footnote: "Every one of them lives inside the component it names. A behaviour that needs a wrapper is a behaviour the component does not have."
	},
	Register: {
		kicker: "/THE REGISTER",
		interval: "break",
		heading: "What the gallery counted",
		standfirst: "Every figure on this page, and the ten files it was counted from. A number written into the page would be the one figure on the sheet that could disagree with the sheet.",
		footnote: "The gallery reads; it does not decide. Where a family's matrix says nothing, the cell says so - and the sentence that says so names the family rather than blaming the component."
	}
};
/** The register's rows, derived from the tables above. */
var Register = () => [
	{
		key: "COMPONENTS:",
		value: String(ComponentCount)
	},
	{
		key: "CONDITIONS:",
		value: String(ConditionCount)
	},
	{
		key: "CELLS:",
		value: String(CellCount)
	},
	{
		key: "BUILT:",
		value: String(BuiltCount)
	},
	{
		key: "NOT APPLICABLE:",
		value: String(ReasonCount)
	},
	{
		key: "UNASKED:",
		value: String(UnaskedCount)
	},
	{
		key: "DISTINCT REASONS:",
		value: String(DistinctReasonCount)
	},
	{
		key: "SHARED REASONS:",
		value: String(Reasons.length)
	},
	{
		key: "FAMILY MATRICES:",
		value: `${MatrixCellCount} CELLS`
	},
	{
		key: "SOURCE:",
		value: "CONTENT/SPECIMEN/*.TS",
		code: true
	}
];
/** The gallery's four doors, for the page's foot. */
var Onward = {
	rows: [
		{
			mark: "/",
			want: "THE SHEET THIS PAGE INDEXES",
			where: "SPECIMEN",
			href: "/Specimen",
			note: "The ten family matrices, their plates, their absences and their own registers."
		},
		{
			mark: "/",
			want: "THE MANUAL THE COMPONENTS PRINT",
			where: "DOC",
			href: "/Doc",
			note: "The document the states are about: its articles, its rail and its folio."
		},
		{
			mark: "/",
			want: "THE RECORD THE STATES ARE ABOUT",
			where: "DOWNLOAD",
			href: "/Download",
			note: "The manifest, its checksums and the one sentence that says nothing is downloadable yet."
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
		statement: "The gallery is the index of the sheet and the sheet is the index of the document. Every cell on this page resolves to a row, and every row resolves to a file.",
		note: "SOURCE: CONTENT/SPECIMEN/GALLERY.TS",
		empty: "No door is filed, which is the one absence this register cannot state honestly - a register with no destination is a page that has decided the reader is finished."
	}
};
export { Wall as C, UnaskedCount as S, ReasonCount as _, Components as a, SingleReasonCount as b, Conditions as c, FamilyCount as d, Head as f, Onward as g, Observations as h, ComponentCount as i, DistinctReasonCount as l, MatrixCellCount as m, BuiltCount as n, ConditionCount as o, Improvements as p, CellCount as r, ConditionRows as s, Bands as t, Families as u, Reasons as v, WallCount as w, Unasked as x, Register as y };
