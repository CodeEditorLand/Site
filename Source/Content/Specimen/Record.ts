/**
 * Record - the record ledger family's state matrix, its specimens, and what the
 * exploration changed.
 *
 * ─── WHY THIS FAMILY NEEDS A MATRIX MORE THAN ANY OF THE OTHER THREE ──────
 * The input family is touched, the overlay family is dismissed, the display
 * family is read. This family is BELIEVED. A ledger is where a reader checks
 * whether the thing is real: its target, its licence, its signal, its figure and
 * the source that figure came from. A display component that loses its empty
 * state looks slightly wrong; a ledger that loses its partial state prints a
 * blank `<dd>` where a fact should be, and a blank cell in a ledger is read as
 * "none" - which is a lie the design told.
 *
 * Eight components, twenty-four conditions, one hundred and ninety-two cells.
 * Every cell that cannot exist carries a sentence saying why, because a blank
 * cell in a matrix of dispositions is the same defect as a blank cell in a
 * ledger: an excuse where a fact belongs.
 *
 * ─── WHAT THE FAMILY'S OWN BRIEF ASKED FOR ────────────────────────────────
 * "Build the combinations they never meet: one row, twenty rows, a key longer
 * than its value, a value that wraps to three lines, a matrix with one column, a
 * matrix with twelve, a compare where the two sides are equal, a trace with no
 * events, an instrument with a missing reading. Then make the row grammar do
 * more inside the block - a row that can open, a row that can be selected, a
 * total row."
 *
 * Every one of those is a column or a specimen row below. The three row shapes
 * are `LedgerRow.open`, `LedgerRow.selected` and `LedgerRow.total`, and they are
 * props of the row rather than wrappers around the block: a row that opened in a
 * wrapper would be a second artifact inside a leaf, which §4.2 forbids.
 *
 * ─── NOTHING HERE IS A TYPED FIGURE ───────────────────────────────────────
 * Every count on the sheet is derived from the two tables below, so a row or a
 * condition added to the family changes the sheet's figures without a second
 * edit. A number typed into this file would be the one figure on the sheet that
 * could disagree with the sheet.
 */

/* ─── THE COLUMNS ────────────────────────────────────────────────────────── */

/** A column of the matrix: the condition or combination, and what its cell asks. */
export interface Column {
	/** The cell's key in a row's override map. */
	readonly key: string;

	/** The column head, in the sheet's register: `LONG KEY`, `TOTAL ROW`. */
	readonly label: string;

	/** One line under the head: what the cell is asking. */
	readonly ask: string;

	/**
	 * The group the column belongs to. The matrix prints a heavier rule where a
	 * condition becomes a shape and where a shape becomes a context, because those
	 * are three different questions and a reader scanning the head should see
	 * where one set ends.
	 */
	readonly group: "condition" | "shape" | "context";
}

/**
 * The twenty-four columns, in reading order.
 *
 * Nine conditions first, because they are the states a reader meets; then nine
 * shapes, because they are what a ledger is asked to hold - and this family's
 * brief named four of them by hand (one row, twenty rows, a long key, a value of
 * three lines) plus the two new row shapes; then six contexts, because they are
 * the ones a designer forgets.
 */
export const Columns: readonly Column[] = [
	{ key: "rest", label: "REST", ask: "untouched", group: "condition" },

	{
		key: "loading",
		label: "LOADING",
		ask: "has not arrived",
		group: "condition",
	},

	{ key: "empty", label: "EMPTY", ask: "holds nothing", group: "condition" },

	{
		key: "partial",
		label: "PARTIAL",
		ask: "one fact unknown",
		group: "condition",
	},

	{
		key: "error",
		label: "ERROR",
		ask: "the action failed",
		group: "condition",
	},

	{
		key: "stale",
		label: "STALE",
		ask: "older than its as-of",
		group: "condition",
	},

	{
		key: "disabled",
		label: "DISABLED",
		ask: "cannot be used",
		group: "condition",
	},

	{
		key: "readonly",
		label: "READ-ONLY",
		ask: "cannot be changed",
		group: "condition",
	},

	{
		key: "selected",
		label: "SELECTED",
		ask: "the marked one",
		group: "condition",
	},

	{ key: "oneitem", label: "ONE ITEM", ask: "a set of one", group: "shape" },

	{
		key: "manyitems",
		label: "MANY ITEMS",
		ask: "a set of twenty",
		group: "shape",
	},

	{
		key: "longkey",
		label: "LONG KEY",
		ask: "a key longer than its value",
		group: "shape",
	},

	{
		key: "longvalue",
		label: "LONG VALUE",
		ask: "a value of three lines",
		group: "shape",
	},

	{ key: "dense", label: "DENSE", ask: "a tighter rhythm", group: "shape" },

	{ key: "narrow", label: "NARROW", ask: "a 16rem column", group: "shape" },

	{ key: "wide", label: "WIDE", ask: "the full band", group: "shape" },

	{
		key: "totalrow",
		label: "TOTAL ROW",
		ask: "the set's sum",
		group: "shape",
	},

	{
		key: "openrow",
		label: "ROW THAT OPENS",
		ask: "a row that discloses",
		group: "shape",
	},

	{
		key: "incard",

		label: "IN A CARD",

		ask: "inside a white insert",

		group: "context",
	},

	{
		key: "inband",

		label: "IN A BAND",

		ask: "on the creme field",

		group: "context",
	},

	{
		key: "withaction",

		label: "WITH ACTION",

		ask: "a control beside it",

		group: "context",
	},

	{
		key: "noaction",

		label: "NO ACTION",

		ask: "nothing to press",

		group: "context",
	},

	{ key: "print", label: "PRINT", ask: "the printed page", group: "context" },

	{
		key: "reducedmotion",

		label: "REDUCED MOTION",

		ask: "the reader asked for less",

		group: "context",
	},
];

/* ─── THE CELLS ──────────────────────────────────────────────────────────── */

export interface Cell {
	/** `built` - the combination renders. `na` - it cannot, and here is why. */
	readonly disposition: "built" | "na";

	/** Present exactly when `disposition` is `na`: why the cell cannot exist. */
	readonly reason?: string;

	/** Present on a built cell that needs to say which construction built it. */
	readonly note?: string;
}

/** A cell the family renders. `note` says how, where that is not obvious. */
const Built = (note?: string): Cell =>
	note === undefined
		? { disposition: "built" }
		: { disposition: "built", note };

/** A cell that cannot exist, with the reason. A reason is a fact, not an apology. */
const NotApplicable = (reason: string): Cell => ({ disposition: "na", reason });

/** One component's row: its name, its file, and the cells it overrides. */
export interface Row {
	/** `LEDGER` - the row's name in the sheet's register. */
	readonly name: string;

	/** The file the part is, relative to `Source/`, upper case. */
	readonly file: string;

	/** One line: what the part is, in the sheet's voice. */
	readonly note: string;

	/**
	 * The cells this row overrides. Everything not listed is `BUILT`, because a
	 * family that renders its own happy state everywhere should not have to say so
	 * a hundred and ninety times - and a default of `built` makes every exception
	 * a sentence someone had to write.
	 */
	readonly cells: Readonly<Record<string, Cell>>;
}

/**
 * The eight components, in the order a page meets them: the facts, the
 * comparison, the axis, the provenance, the measurement, the field, the counted
 * line and its constructor.
 *
 * Every row's overrides are reasons. A row with no overrides would be a part
 * that survives every combination, and no part does.
 */
export const Rows: readonly Row[] = [
	{
		name: "LEDGER",

		file: "COMPONENT/RECORD/RECORDLEDGER.ASTRO",

		note: "What is true of one object, as rows: a mono key, an ink value, one figure at display weight.",

		cells: {
			error: NotApplicable(
				"A ledger prints facts, and a failed action is not a fact about an object. Its cause, its next step and its retry are `RecordFailure`'s three fields; a ledger that grew them would be a condition block wearing a list's grammar.",
			),

			disabled: NotApplicable(
				"A ledger is not a control, so it cannot be disabled. A fact the reader may not see is a fact the page does not print, and that is a permission decision above the block - the block has nothing to withhold.",
			),

			readonly: NotApplicable(
				"A ledger is read-only by construction: it is a `<dl>`, it ships no script and it holds no input. There is no editable arm for read-only to be the absence of.",
			),

			withaction: NotApplicable(
				"A ledger has no action slot. The action belongs beside it in the artifact that holds it, which is where the tier's one `.emphasis-expressive` control goes - one action per artifact, never one per fact.",
			),

			reducedmotion: NotApplicable(
				"The ledger's only interval is the `<details>` a row opens with, and the browser opens that with no animation at all. There is nothing to remove for a reader who asked for less.",
			),

			rest: Built(
				"Four value arms: a state word, links, a literal, an emphasis.",
			),

			loading: Built(
				'`state="loading"` keeps the keys - they are the schema - and bars the values; handed no rows it prints six.',
			),

			empty: Built(
				'`state="empty"` prints the composed sentence and no frame, because a frame over nothing is a ruled void.',
			),

			partial: Built(
				"`LedgerRow.state` tints and marks a value that is a state word; the word itself stays the caller's.",
			),

			stale: Built("`LedgerRow.asOf` prints `AS OF:` under the value."),

			selected: Built(
				"`LedgerRow.selected`: `aria-current` plus the attested square and a leading rule.",
			),

			oneitem: Built(
				"One row is a ledger of one fact and prints without a top rule.",
			),

			manyitems: Built(
				"Twenty rows print as twenty ruled rows; the page scrolls and the ledger does not.",
			),

			longkey: Built(
				"The key column is `min(28ch, 40%)` and wraps; a key longer than its value pushes nothing off the line.",
			),

			longvalue: Built(
				"The value wraps inside its own column at every width; a path of three lines keeps the key beside it.",
			),

			dense: Built(
				'`density="register"` reads the same facts as a table: key above value, two columns at 1024px.',
			),

			totalrow: Built(
				"`LedgerRow.total`: the divider's rule above, the sub role in the value.",
			),

			openrow: Built(
				"`LedgerRow.open`: a `<details>` whose summary is the row's value. No script, and the closed row still states the fact.",
			),

			incard: Built(
				'The `surface="standard"` tier is the white insert, on the same shell.',
			),

			print: Built(
				"The `<details>` prints open on paper, because a printed page cannot be asked to click.",
			),
		},
	},

	{
		name: "MATRIX",

		file: "COMPONENT/RECORD/RECORDMATRIX.ASTRO",

		note: "One state compared across columns: a real table, one ink per column, the row label pinned.",

		cells: {
			error: NotApplicable(
				"A comparison states what each column is. A read that failed is a state word in the cell that failed - `UNAVAILABLE` in the vocabulary's tone - and a matrix-level error would be a second vocabulary for the same fact.",
			),

			stale: NotApplicable(
				"A matrix cell is a value without an age; the table's provenance is its caption, which is the block's one sentence about the whole comparison. An as-of per cell would be a fourth field in a three-field artifact.",
			),

			disabled: NotApplicable(
				"A matrix is not a control. There is no cell to disable, and a greyed-out comparison is a comparison nobody can read.",
			),

			readonly: NotApplicable(
				"A matrix is a printed table with no input and no script; read-only is not an absence it can have.",
			),

			selected: NotApplicable(
				"A matrix row is not selectable: a comparison marks a CELL, and a selection would need a script the block does not ship. A set that needs a chosen row is a ledger with `selected`.",
			),

			partial: Built(
				"A cell whose value is one of the eight state words takes the vocabulary's ink and the mark layer's square.",
			),

			oneitem: Built(
				"A comparison of one column is a value list with a head, and it is legal.",
			),

			manyitems: Built(
				"Twenty rows print as twenty ruled rows under a pinned head.",
			),

			longkey: Built(
				"The row label is `nowrap` and pinned; a long label widens the column rather than wrapping.",
			),

			longvalue: Built(
				"A cell refuses to wrap, so a long value grows the table and the shell scrolls under a pinned label - which is the block's whole narrow behaviour.",
			),

			dense: Built(
				'`density="dense"` halves the row rhythm and moves nothing else.',
			),

			totalrow: Built(
				"`MatrixRow.total`: the divider's rule above the row and the sub role in its cells.",
			),

			openrow: NotApplicable(
				"A matrix row that opened would put a second artifact inside a cell, which §4.2 forbids. The detail a row discloses belongs in a ledger under the matrix, where a row may open.",
			),

			incard: Built(
				"Inside a white insert the page sets `--MatrixFill: var(--Card)` so the pinned label is opaque.",
			),

			withaction: Built(
				"The `id` prop exists so `MatrixControl` can drive the table; the action lives beside it, not in a cell.",
			),

			print: Built(
				"The pin is released and the head repeats on every printed page.",
			),
		},
	},

	{
		name: "COMPARE",

		file: "COMPONENT/RECORD/RECORDCOMPARE.ASTRO",

		note: "One axis, its ends, and where each thing sits on it: a rail with a tick per position.",

		cells: {
			error: NotApplicable(
				"A rail is a reading of positions, not an action. What fails on an axis is the link a stop points at, and a dead link is the browser's own statement.",
			),

			stale: NotApplicable(
				"A stop's position is a fact about an order, not a measurement: it has no as-of. A rail whose positions are out of date is a rail whose caption says so.",
			),

			disabled: NotApplicable(
				"A rail has no control to disable. An unreachable position is the `state` arm - a hollow tick and the vocabulary's word - which is a fact about the position and not about the reader's permission.",
			),

			readonly: NotApplicable(
				"The rail is printed: no input, no script, nothing to withhold.",
			),

			selected: NotApplicable(
				"A rail marks which positions are reached with the stop's own state. A selection would be a choice among positions, and an axis is one order rather than a menu.",
			),

			partial: Built(
				"`CompareStop.state` prints `STATUS: UNAVAILABLE` above the value and hollows the tick: the position is still a position.",
			),

			oneitem: Built(
				"One stop takes the whole measure (`--single`) and the axis still prints, because the axis is what the position is a position on.",
			),

			manyitems: NotApplicable(
				"A rail with more than six stops is a matrix. The block refuses to compress - a compressed rail is a table with the ends filed off - so a set of twenty positions is `RecordMatrix`'s work.",
			),

			longkey: Built(
				"A stop's label wraps inside its column; the value under it keeps its own line.",
			),

			longvalue: Built(
				"A stop's value is `text-wrap: pretty` and `overflow-wrap: anywhere`, so a value of three lines stays in its column.",
			),

			dense: NotApplicable(
				"Documented refusal, not an omission: a rail has one rhythm at every length, and the block that needs tighter is the matrix.",
			),

			totalrow: NotApplicable(
				"A rail has no total: its two ends are the axis's own, and a sum of positions is not a position on an axis.",
			),

			openrow: NotApplicable(
				"A stop is a position with one value, not a row with more of itself. A stop that opened would be a stage - and a stage is a different artifact.",
			),

			narrow: Built(
				"The rail rotates: the line runs down the left edge and the stops stack along it, ends first.",
			),

			withaction: NotApplicable(
				"A stop's value IS the action when it is a link. A button beside the rail would be a second order on one line, which is the thing the axis exists to prevent.",
			),

			print: Built(
				"The rail prints flat, ticks and all; nothing about it depends on hover.",
			),
		},
	},

	{
		name: "TRACE",

		file: "COMPONENT/RECORD/RECORDTRACE.ASTRO",

		note: "Where a claim can be checked, in the order the source names it, closed by its source.",

		cells: {
			partial: NotApplicable(
				"A trace step is a path or it is not a step. A trace whose source names a file the tree does not carry prints the path and lets the link fail - which is the honest reading, and better than a step that says it is half there.",
			),

			error: NotApplicable(
				"A trace has no failed arm: what fails is the link, and a trace whose source could not be read has no steps at all - which is `empty`, with the source still printed under it.",
			),

			stale: NotApplicable(
				"A trace is a reading taken at build time and its `SOURCE:` is that reading's provenance. An as-of on a path would date a file, and the file dates itself.",
			),

			disabled: NotApplicable(
				"Nothing in a trace is a control: the index is a number, the arrow is a mark, and the path is a link or it is text.",
			),

			readonly: NotApplicable(
				"The trace is printed and ships no script; there is no editable arm.",
			),

			selected: NotApplicable(
				"A trace is an order, not a set with a chosen member. The reader's place in it is the browser's scroll position, which is not the block's state.",
			),

			loading: Built(
				"Three steps with the index in ink and a hairline bar where the path and the note will be; the marker reads `LOADING`.",
			),

			empty: Built(
				'`state="empty"` prints the composed sentence between the marker and the source - the marker and the source both survive, because a trace with nothing in it is still a claim about where the claim can be checked.',
			),

			oneitem: Built(
				"One step is a trace of one and prints its own count: `01 STEPS`.",
			),

			manyitems: Built(
				"Twenty steps print as twenty ruled steps; the index column is two characters and holds `20`.",
			),

			longkey: Built(
				"A path longer than its note wraps inside the path column (`overflow-wrap: anywhere`) and never pushes the note off the row.",
			),

			longvalue: Built(
				"A note of three lines sits in its own column at 768px and under the path below it.",
			),

			dense: NotApplicable(
				"Documented refusal: a trace compressed is a list of links, and a list of links is not evidence.",
			),

			totalrow: NotApplicable(
				"A trace has no total. Its count is in the marker (`06 STEPS`) and it is the steps' own length, so a total row would count the same set twice.",
			),

			openrow: NotApplicable(
				"A step is one path and the one thing it carries. A step that opened would hold a second note, and the trace's note column is already the place for the second line.",
			),

			withaction: NotApplicable(
				"The path is the action when it leads somewhere. A trace with a button beside it would be a command list, which is `RecordWell`'s job.",
			),

			print: Built(
				"The link's rule prints and the href resolves to its target, so a printed trace is still followable on paper.",
			),
		},
	},

	{
		name: "INSTRUMENT",

		file: "COMPONENT/RECORD/RECORDINSTRUMENT.ASTRO",

		note: "A measured panel: four fields per cell - `LABEL:`, figure, `SOURCE:`, `AS OF:`.",

		cells: {
			error: NotApplicable(
				"A figure that could not be measured prints `UNAVAILABLE` in its own cell, in the vocabulary's ink - the block's state arm. A second, panel-level error shape would be two ways to say one thing.",
			),

			disabled: NotApplicable(
				"A panel of printed figures has no control. A figure that is not being updated is a figure with an `AS OF:`.",
			),

			readonly: NotApplicable(
				"The panel is printed and ships no script; there is no editable arm.",
			),

			selected: NotApplicable(
				"A measure is a figure, not a choice. The panel's emphasis is `lead` - one figure set larger - and that is a rank, not a selection.",
			),

			loading: Built(
				'`state="loading"` keeps the keys and the `SOURCE:` lines and bars the figure; handed no measures it prints three unnamed cells.',
			),

			empty: Built(
				'`state="empty"` or no measures: the `◎` and the composed sentence, at the panel\'s own top rule.',
			),

			stale: Built(
				"`Measure.asOf` prints `AS OF:` after the provenance, at the caption weight.",
			),

			oneitem: Built(
				"A set of one is a set of one and still prints its own source.",
			),

			manyitems: Built(
				"Twelve measures reflow at `auto-fit`/13rem; the strip wraps rather than shrinking a figure.",
			),

			longkey: Built(
				"The key wraps above the figure; a long label never shrinks the number.",
			),

			longvalue: Built(
				"A provenance of three lines wraps under the figure at the caption weight; the figure keeps its size.",
			),

			dense: NotApplicable(
				"Documented refusal: an instrument is already the densest reading of a figure - four fields in one cell. A block that needs tighter needs fewer measures.",
			),

			totalrow: Built(
				"`Measure.total` spans the strip under the divider's rule, at the sub role: the sum the measures above add up to.",
			),

			openrow: NotApplicable(
				"A measure is four fields in one cell. A disclosure inside it would be a fifth field, and the block's contract says the panel holds nothing.",
			),

			withaction: NotApplicable(
				"A panel has no action slot. A figure that can be refreshed is a figure whose refresh belongs to the page, not to the number.",
			),

			print: Built(
				"The strip prints with its rules and its sources; a figure keeps its provenance on paper.",
			),
		},
	},

	{
		name: "PLATE SET",

		file: "COMPONENT/RECORD/RECORDPLATESET.ASTRO",

		note: "Many figures of one subject, read as a field: numbered cells at one size.",

		cells: {
			error: NotApplicable(
				"A plate-set's absent cell is a tombstone with a reason (`state` + `note`), which is the honest reading of a capture that is not there. An error arm would be a second word for the same absence.",
			),

			stale: NotApplicable(
				"A plate's age is its manifest's, and the set prints one `SOURCE:` for the field. An as-of per cell would put a date under fifteen pictures that share one capture date.",
			),

			disabled: NotApplicable(
				"Nothing in a plate-set is disabled. A cell that cannot be shown prints its state and its reason; a greyed-out frame would be a hole with a caption.",
			),

			readonly: NotApplicable(
				"The set is printed and ships no script; there is no editable arm.",
			),

			selected: NotApplicable(
				"A field of figures is scanned, not chosen. A selected cell would need a script, and the set's own selection is the reader's eye.",
			),

			partial: Built(
				"`PlateCell.state` + `note`: the frame keeps its 4:3 bed and prints `◎` with the reason, so the set reads as one register of attempts.",
			),

			oneitem: Built(
				"A set of one prints `01 PLATE` - the unit singular is derived from the set's own length.",
			),

			manyitems: Built(
				"`window` prints twelve of two hundred and names the rest on the foot, because a page of two hundred figures is a directory.",
			),

			longkey: Built(
				"A subject longer than its frame wraps under it after the `↳`; the frame never changes shape.",
			),

			longvalue: Built(
				"A note of three lines sits under the subject at the caption weight.",
			),

			dense: NotApplicable(
				"Documented refusal: a set of figures is scanned at one size, and a denser set is a smaller claim about each picture.",
			),

			totalrow: NotApplicable(
				"A set has no total row: its count is its register line (`PLATES␁15`), and a sum of pictures is not a picture.",
			),

			openrow: NotApplicable(
				"A cell does not disclose. Its frame is a door when the cell names a target (`href`) and a picture when it does not - a disclosure inside a figure would be a caption channel, which is `RecordPlate`'s job.",
			),

			withaction: Built(
				"`PlateCell.href` makes the whole 4:3 frame the anchor: the picture is the control, and it takes the focus ring.",
			),

			print: Built(
				"The frames print at 4:3 with their numbers and states; a printed field is still a field.",
			),
		},
	},

	{
		name: "REGISTER",

		file: "COMPONENT/RECORD/REGISTER.ASTRO",

		note: "The counted line - mark, name, separator, figure - printed by every block that has one.",

		cells: {
			error: NotApplicable(
				"A register states a count, and a count that did not arrive is `UNAVAILABLE` - the partial arm. There is no error arm because the line has no action that could fail.",
			),

			stale: NotApplicable(
				"A register has no age: it counts the rows under it, and if those rows are stale their own `AS OF:` says so. A register that dated itself would be a second provenance beside the block's.",
			),

			disabled: NotApplicable(
				"The line is not a control. It is the smallest complete statement the grammar has, and there is nothing on it to withhold.",
			),

			readonly: NotApplicable(
				"The register is printed and ships no script; there is no editable arm.",
			),

			selected: NotApplicable(
				"A register names a set and counts it. There is no member to select, and a selected register would be a tab.",
			),

			loading: Built(
				"`RegisterCountText` prints `LOADING` in the count slot, whole and unbroken.",
			),

			empty: Built(
				"`RegisterOf` on no rows prints `00` - an empty set is a KNOWN figure - and the line still names the set that turned out to be empty.",
			),

			partial: Built(
				"`RegisterUnavailable` prints `UNAVAILABLE` where the figure will be: a word, never a zero, because a zero claims the set is empty.",
			),

			oneitem: Built("A register of one prints `01`."),

			manyitems: Built(
				"`RegisterWindow` prints the too-much state as a count: `12 OF 240`, which is what the reader holds and what exists.",
			),

			longkey: Built(
				"A label longer than its margin wraps and `text-wrap: balance` keeps it to two even lines; the separator and the count stay whole.",
			),

			longvalue: NotApplicable(
				"A register's second half is a count: a figure or one word. There is no long-value arm, and a count that needed three lines would be a sentence, not a register.",
			),

			dense: NotApplicable(
				"A register line has one size. It is the smallest complete statement the grammar has, and there is no smaller step above the 13px floor.",
			),

			totalrow: NotApplicable(
				"A register IS the total: `# WHAT CHANGES / 08` is the count of the set. A total row under a total line would count the same thing twice.",
			),

			openrow: NotApplicable(
				"A register line opens nothing. It is the block's own name and extent, and what the block holds is printed under it.",
			),

			wide: Built(
				"The line sits at its own length at any width; a register stretched across a band would be a rule with a word on it.",
			),

			withaction: NotApplicable(
				"The line carries no action. A register that could be pressed would be a disclosure, and a disclosure has a fold.",
			),

			print: Built(
				"The line prints in full, unit and all; `RegisterText` is its one-string form.",
			),
		},
	},

	{
		name: "REGISTER LINE",

		file: "COMPONENT/RECORD/REGISTERLINE.TS",

		note: "The shape and its four constructors: the only way a counted line can be built.",

		cells: {
			rest: Built(
				"`RegisterOf`, `RegisterCount`, `RegisterUnavailable`, `RegisterWindow` - four questions, four answers.",
			),

			loading: Built(
				"`RegisterCountText` answers `LOADING` for the count slot.",
			),

			empty: Built(
				"`Padded(0)` is `00`, and an empty set is a known figure.",
			),

			partial: Built(
				"`RegisterUnavailable` is the arm, and it is a word rather than a figure.",
			),

			error: NotApplicable(
				"The module composes a line; it performs no action, so it has nothing that can fail. A failed read is a count the caller cannot know, which is `RegisterUnavailable`.",
			),

			stale: NotApplicable(
				"The shape carries a label and a count. An age is not part of a register - it is a fact about the rows, and the rows carry it.",
			),

			disabled: NotApplicable(
				"`RegisterLine` is a data module: it composes no markup and holds no control, so there is nothing to disable.",
			),

			readonly: NotApplicable(
				"Every register is read-only: the shape has no setter and the renderer prints it. There is no editable arm to be the absence of.",
			),

			selected: NotApplicable(
				"A register names one set. There is no second member for a selection to choose between.",
			),

			oneitem: Built(
				"`RegisterOf` on one row is `01`, and `Padded` is what makes it two characters.",
			),

			manyitems: Built(
				"`Padded(120)` is `120` - two digits is the floor, not the ceiling - and `RegisterWindow` states a window of a larger set.",
			),

			longkey: NotApplicable(
				"The module trims a label and never measures it. A long label is the RENDERER's arm, which is why REGISTER / LONG KEY is built and this row's is not.",
			),

			longvalue: NotApplicable(
				"A count is a figure or one word by construction: `Padded` pads, `RegisterUnavailable` prints `UNAVAILABLE`, and `RegisterWindow` joins two counts with `OF`.",
			),

			dense: NotApplicable(
				"A data module has no rhythm to tighten. Density is a rendering decision and belongs to the block that prints the line.",
			),

			narrow: NotApplicable(
				"The module has no width: it composes a string, and the string wraps or does not in the renderer's box.",
			),

			wide: NotApplicable(
				"The module has no width for the same reason. `RegisterText` composes one line for a title or an `aria-label`; how wide it prints is the renderer's.",
			),

			totalrow: NotApplicable(
				"The line is already the total. There is no second rank of count in the shape, and adding one would be a second register grammar.",
			),

			openrow: NotApplicable(
				"The shape has four fields and no body: there is nothing under a register to open.",
			),

			incard: NotApplicable(
				"A module composes no markup, so it cannot be inside a card. The line REGISTER prints is the part that sits in one.",
			),

			inband: NotApplicable(
				"A module composes no markup, so it cannot sit on a band either - the same answer as IN A CARD, and it is the answer for both because the question is about a surface and this row has none.",
			),

			withaction: NotApplicable("The shape has no slot for a control."),

			noaction: Built(
				"It is pure: a label, a count, a unit and a separator, and nothing to press.",
			),

			print: Built(
				"`RegisterText` composes the whole line as one string - for a document title, an `aria-label` or a generated page - which is exactly what a printed register needs.",
			),

			reducedmotion: NotApplicable(
				"The module has no interval. Motion is a rendering decision and this row renders nothing.",
			),
		},
	},
];

/* ─── THE CELL LOOKUP, AND THE COUNTS ────────────────────────────────────── */

/**
 * One cell of the matrix.
 *
 * A row lists only its exceptions, so a missing entry is `BUILT` - and that
 * default is what makes every `NOT APPLICABLE` in this file a sentence someone
 * had to write rather than a blank someone left.
 */
export const MatrixCell = (Row: Row, Column: Column): Cell =>
	Row.cells[Column.key] ?? { disposition: "built" };

/** Every cell, in row order then column order - the matrix as a flat list. */
export const MatrixCells = (): readonly {
	row: Row;

	column: Column;

	cell: Cell;
}[] =>
	Rows.flatMap((row) =>
		Columns.map((column) => ({
			row,
			column,
			cell: MatrixCell(row, column),
		})),
	);

/** How many cells the matrix holds. */
export const CellCount = Rows.length * Columns.length;

/** How many cells the family builds. */
export const BuiltCount = MatrixCells().filter(
	({ cell }) => cell.disposition === "built",
).length;

/** How many cells cannot exist, and therefore carry a reason. */
export const ReasonCount = CellCount - BuiltCount;

/** How many cells one row builds. */
export const BuiltOf = (Row: Row): number =>
	Columns.filter((Column) => MatrixCell(Row, Column).disposition === "built")
		.length;

/** How many cells one column builds. */
export const BuiltIn = (Column: Column): number =>
	Rows.filter((Row) => MatrixCell(Row, Column).disposition === "built")
		.length;

/** The matrix's own register rows, derived from the tables above. */
export const MatrixRegister = (): readonly {
	key: string;

	value: string;

	note?: string;
}[] => [
	{ key: "COMPONENTS:", value: String(Rows.length) },

	{ key: "CONDITIONS:", value: String(Columns.length) },

	{ key: "CELLS:", value: String(CellCount) },

	{ key: "BUILT:", value: String(BuiltCount) },

	{ key: "NOT APPLICABLE:", value: String(ReasonCount) },

	{ key: "SPECIMENS:", value: String(Specimens.length) },

	{
		key: "SOURCE:",

		value: "CONTENT/SPECIMEN/RECORD.TS",

		note: "every figure above is counted from the three tables in this file",
	},
];

/* ─── THE IMPROVEMENTS ───────────────────────────────────────────────────── */

/** One behaviour the matrix revealed, and where it now lives. */
export interface Improvement {
	/** `LEDGER` - the component the behaviour is in. */
	readonly component: string;

	/** The state or combination that revealed it, in the sheet's register. */
	readonly from: string;

	/** What the exploration found, in the sheet's voice. */
	readonly found: string;

	/** What the block does about it now, and where. */
	readonly built: string;
}

/**
 * The eleven behaviours that only became obvious once the matrix existed.
 *
 * This section is the deliverable the brief asks for by name - "the improvements
 * that came out of the exploration" - and each entry names the cell that
 * revealed it. An improvement with no cell behind it would be a preference.
 */
export const Improvements: readonly Improvement[] = [
	{
		component: "LEDGER",

		from: "ROW THAT OPENS",

		found: "A build's three flags were three rows of the same rank as its target and its licence, so a ledger of six facts read as a ledger of nine. The detail existed; it had no rank.",

		built: "`LedgerRow.open` prints the row as a `<details>` whose summary is the value, with the disclosed facts as the same row grammar one level in. No script: the browser's disclosure is the behaviour and the mark layer's fold is its sign.",
	},

	{
		component: "LEDGER",

		from: "SELECTED",

		found: "A ledger that stated a default (`DEFAULT:`, `ACTIVE:`) printed it in the same ink as the other rows, so the one fact a reader needed to find was the one fact the eye had to hunt for.",

		built: "`LedgerRow.selected` prints `aria-current` plus the attested square and a leading rule at the divider's ink. The accent stays out of it: a fact is not an action.",
	},

	{
		component: "LEDGER",

		from: "TOTAL ROW",

		found: "A set's sum was printed as one more row, so the reader could not tell a fact from the figure the facts add up to.",

		built: "`LedgerRow.total` prints under the divider's rule with its value at the sub role and spans the grid, so a total in a two-column register is the total of the whole register and not of one half.",
	},

	{
		component: "LEDGER",

		from: "PARTIAL / STALE",

		found: "An unknown fact and a fact older than the page were both written as prose in the value column (`not yet measured`, `as of 14 Nov`), so the vocabulary's own words were the one place they were not used.",

		built: "`LedgerRow.state` tints and marks a value that is a state word - the mark layer's hollow square, the vocabulary's ink - and `LedgerRow.asOf` prints `AS OF:` in the note channel. The word stays the caller's: the block tints, it never re-cases.",
	},

	{
		component: "MATRIX",

		from: "EMPTY",

		found: "A matrix with no rows printed its head over a blank body. It was the one block on the site that could print a comparison whose answer looked like nothing at all.",

		built: '`state="empty"` keeps the head - the schema is still true when the values are not - and prints one cell spanning the table with the composed sentence.',
	},

	{
		component: "MATRIX",

		from: "LOADING",

		found: "There was no loading arm at all: a comparison whose values had not arrived printed an empty table, which reads as a comparison of nothing.",

		built: '`state="loading"` prints three skeleton rows with a bar in every cell, and the head stays. The bar is the ledger\'s own, so the site has one way of drawing a value that has not arrived.',
	},

	{
		component: "MATRIX",

		from: "PARTIAL",

		found: "`UNAVAILABLE` in a cell read as a value that happened to be a word - the same ink and the same weight as `YES` - so the one honest answer in a compatibility table was the least visible.",

		built: "A cell whose value is one of the eight state words takes the vocabulary's ink and the mark layer's square. `yes` and `no` keep their verdict marks: an answer that was not given is not a third answer.",
	},

	{
		component: "TRACE",

		from: "LOADING",

		found: 'The type contract promised a skeleton and the block printed nothing: `state="loading"` changed the marker to `LOADING` and left the body empty, so a trace being read looked exactly like a trace that had failed.',

		built: "Three steps with the index in ink and a bar where the path and the note will be. The index prints because the steps' order is the schema.",
	},

	{
		component: "TRACE",

		from: "EMPTY",

		found: "The block checked a state its type could not express (`empty`), and a caller that passed no sentence got a marker over nothing - a hole where a provenance statement belongs.",

		built: "`Trace.state` now carries `empty`, and the block composes the sentence when the caller does not: the marker and the `SOURCE:` both survive, because a trace with nothing in it is still a claim about where the claim can be checked.",
	},

	{
		component: "COMPARE",

		from: "TWO SIDES EQUAL",

		found: "Two positions carrying the same value printed as two ordinary ticks, so a tie looked exactly like a gap. The caption had to say what the rail could have shown.",

		built: "`CompareStop.equal` draws the interval between the two ticks in the rail's own ink: two positions at the same place read as one plateau, and the caption then explains it rather than announcing it.",
	},

	{
		component: "INSTRUMENT",

		from: "MISSING READING / LOADING",

		found: "A panel whose figures had not arrived printed its caption and nothing else - the one block that could not say how many figures it was waiting for.",

		built: '`state="loading"` keeps every `LABEL:` and every `SOURCE:` line and bars only the figure, because the labels and the provenance are the schema. A missing reading still prints the vocabulary\'s word in its own cell.',
	},

	{
		component: "REGISTER",

		from: "PARTIAL / TOO MUCH",

		found: "The line's five parts were printed but never announced: the mark and the separator are `aria-hidden`, so a screen reader ran the label into the figure and read `WHAT CHANGES08`. And the too-much state - a set longer than the page - had no register at all: `RecordPlateSet` printed `SHOWING: 12 OF 240` in its own foot, outside the shape.",

		built: "`Register.astro` carries `aria-label={RegisterText(...)}`, so the announcement and the printed line are the same statement; and `RegisterWindow(label, showing, total)` is the too-much state as a register, in the grammar every other count uses.",
	},
];

/* ─── WHAT THE FAMILY OBSERVED, AND DID NOT FIX ──────────────────────────── */

/** One thing the exploration found that belongs to another card. */
export interface Observation {
	/** `THE COLON` - the observation's name. */
	readonly name: string;

	/** What was found, measured where it can be measured. */
	readonly found: string;

	/** Why this card did not fix it, and whose work it is. */
	readonly owner: string;
}

export const Observations: readonly Observation[] = [
	{
		name: "THE COLON IS THE CALLER'S",

		found: "`DESIGN-COMPLETE.md` §1.5 names the colon-less field label a live violation and points at the hero's facts ledger. The renderer cannot fix it: most of the tree's ledger keys already carry their `:` (`TARGET:`, `LICENSE:`), so a block that appended one would double it on every one of them. The keys that lack it are a content defect, and they are fixed where the data lives.",

		owner: "The content modules that own those rows - `Component/Dynamic/Hero/Data.ts` and its neighbours. This card prints the rule on the sheet so the defect is visible rather than inferred.",
	},

	{
		name: "THE REGISTER'S QUAD IS 0.6em",

		found: "U+2001 is the grammar's em quad and the site's only separator, and in IBM Plex Mono it advances 0.6em like every other glyph. `Type/_Register.scss` states the argument: re-cutting the quad here would make one character two widths on one page, and `Detail/_Folio.scss` computes a folio's length in em quads.",

		owner: "A renderer change in both artifacts at once - the quad printed as an empty span whose width the stylesheet owns. Named on the sheet, not faked in a partial.",
	},

	{
		name: "TWO BLOCKS HAVE NO IMPORTER",

		found: "`RecordCompare` and `RecordPlateSet` are imported by no page. They are not dead: `RecordCompare` is the only block that answers an axis with ends, and `RecordPlateSet` is the only one that answers many figures of one subject. The sheet mounts both, which is the argument for keeping them - and the first page that needs an axis finds it finished rather than finds a kit default.",

		owner: "Nobody's, yet. A block with a state matrix and a live specimen is a block waiting for its surface, not a file waiting for someone.",
	},
];

/* ─── THE SPECIMENS ──────────────────────────────────────────────────────── */

/**
 * The four groups the sheet prints the live rows in.
 *
 * Eight components in one flat list of thirty-six rows would read as one long
 * answer to none of four questions: what the document states as facts, how it
 * places things on an axis, how it measures, and how it counts.
 */
export type Group = "facts" | "axes" | "measures" | "lines";

/** What the stage mounts for a row. */
export type Kind =
	| "ledger"
	| "matrix"
	| "compare"
	| "trace"
	| "instrument"
	| "plateset"
	| "register"
	| "registerline";

/** The props a specimen's stage needs. Every one is optional; the kind decides. */
export interface RecordSpec {
	/** How many rows, steps, measures or plates the specimen builds. */
	readonly rows?: number;

	/** The state the block is put into - its own `state` prop. */
	readonly state?: string;

	/**
	 * The combination the row exercises, where the state prop is not enough:
	 * `total`, `selected`, `open`, `longkey`, `longvalue`, `equal`, `single`,
	 * `window`, `unavailable`.
	 */
	readonly variant?: string;

	/** The register's label, or the block's own `/LABEL`. */
	readonly label?: string;

	/** The register's count, when the row prints one the block does not hold. */
	readonly count?: string;

	/** The register's unit: `ENTRIES`, `STEPS`, `PLATES`. */
	readonly unit?: string;

	/** `slash` (the default) or `quad`, for the register line. */
	readonly separator?: string;

	/** The one sentence under the block, where the state needs one. */
	readonly caption?: string;

	/** The composed absence, where the row is about an absence. */
	readonly empty?: string;

	/** The matrix's columns, or the ledger's two-column reading. */
	readonly columns?: readonly string[];

	/** The stage's own width. */
	readonly width?: "narrow" | "wide" | "band";

	/** The block's own density arm. */
	readonly dense?: boolean;

	/** The ledger's surface: `quiet` (the field) or `standard` (a white insert). */
	readonly surface?: string;

	/** The label of the specimen's one action, when it has one. */
	readonly action?: string;
}

/** One labelled row on the sheet: the state, the part, and when it is right. */
export interface Specimen extends RecordSpec {
	/** `01` - the row's position, zero-padded. */
	readonly mark: string;

	/** The group the row is filed under. */
	readonly group: Group;

	/** The state or combination's name, in the sheet's register. */
	readonly state_name: string;

	/** The part of the family the row exercises. */
	readonly component: string;

	/** One line saying when the state is right. */
	readonly when: string;

	/** What the stage mounts. */
	readonly kind: Kind;
}

/**
 * The live rows.
 *
 * Ordered as the matrix's groups: the facts, the axes, the measures, the counted
 * lines. Every one of the eight components appears at least once, the four
 * combinations the brief named by hand each get a row of their own, and the
 * rows that carry a context are the same component in two different boxes -
 * which is the claim this family has to prove.
 */
export const Specimens: readonly Specimen[] = [
	/* ─── FACTS ────────────────────────────────────────────────────────── */

	{
		mark: "01",

		group: "facts",

		state_name: "REST",

		component: "Ledger",

		when: "The ordinary reading: a key, a value, one qualifier under it. Every record's facts are this.",

		kind: "ledger",

		rows: 5,
	},

	{
		mark: "02",

		group: "facts",

		state_name: "ONE ROW",

		component: "Ledger",

		when: "A ledger of one fact is legal and opens without a top rule: the band heading above it already ends the page.",

		kind: "ledger",

		rows: 1,
	},

	{
		mark: "03",

		group: "facts",

		state_name: "TWENTY ROWS",

		component: "Ledger",

		when: "The too-many state: twenty facts print as twenty ruled rows and the page scrolls, not the ledger.",

		kind: "ledger",

		rows: 20,
	},

	{
		mark: "04",

		group: "facts",

		state_name: "LONG KEY",

		component: "Ledger",

		when: "A key longer than its value: the key column is `min(28ch, 40%)` and wraps rather than pushing the value off the line.",

		kind: "ledger",

		rows: 4,

		variant: "longkey",
	},

	{
		mark: "05",

		group: "facts",

		state_name: "LONG VALUE",

		component: "Ledger",

		when: "A value that wraps to three lines: a path or a sentence keeps the key beside it at every width.",

		kind: "ledger",

		rows: 4,

		variant: "longvalue",
	},

	{
		mark: "06",

		group: "facts",

		state_name: "PARTIAL",

		component: "Ledger",

		when: "Some facts unknown: the row prints the vocabulary's word with the mark layer's hollow square - never a blank cell, never a zero.",

		kind: "ledger",

		rows: 4,

		variant: "unavailable",
	},

	{
		mark: "07",

		group: "facts",

		state_name: "STALE",

		component: "Ledger",

		when: "A fact older than the page: the value stays visible and `AS OF:` states its age beside it.",

		kind: "ledger",

		rows: 3,

		variant: "stale",
	},

	{
		mark: "08",

		group: "facts",

		state_name: "ROW THAT OPENS",

		component: "Ledger",

		when: "A fact whose detail is three more facts: the row discloses them in a `<details>` and still states its value when shut.",

		kind: "ledger",

		rows: 4,

		variant: "open",
	},

	{
		mark: "09",

		group: "facts",

		state_name: "SELECTED",

		component: "Ledger",

		when: "The marked row of its set: `aria-current`, the attested square and a leading rule - the two signals every selected thing on the site carries.",

		kind: "ledger",

		rows: 4,

		variant: "selected",
	},

	{
		mark: "10",

		group: "facts",

		state_name: "TOTAL ROW",

		component: "Ledger",

		when: "The set's sum: the divider's rule above it and the sub role in its value, so a total is never read as one more fact.",

		kind: "ledger",

		rows: 4,

		variant: "total",
	},

	{
		mark: "11",

		group: "facts",

		state_name: "LOADING",

		component: "Ledger",

		when: "The facts have not arrived: the keys stay because they are the schema, and each value is a hairline bar.",

		kind: "ledger",

		rows: 5,

		state: "loading",
	},

	{
		mark: "12",

		group: "facts",

		state_name: "EMPTY",

		component: "Ledger",

		when: "Nothing is recorded: one composed sentence says what would be here, why it is not, and where to read it. No frame over nothing.",

		kind: "ledger",

		rows: 0,

		state: "empty",

		empty: "No working is recorded for this element yet: its manual page names no source, so the record prints its own facts and names none. The absence is the fact.",
	},

	{
		mark: "13",

		group: "facts",

		state_name: "IN A CARD",

		component: "Ledger",

		when: "A white insert on the field: the `standard` tier is the published card, worn on the same shell with only the interior padding added.",

		kind: "ledger",

		rows: 4,

		surface: "standard",
	},

	{
		mark: "14",

		group: "facts",

		state_name: "DENSE",

		component: "Ledger",

		when: "The same facts read as a table: key above value, two columns at 1024px, a hairline between them, the count in the register line.",

		kind: "ledger",

		rows: 6,

		dense: true,

		label: "WORKING",
	},

	{
		mark: "15",

		group: "facts",

		state_name: "NARROW",

		component: "Ledger",

		when: "A 16rem column: the key moves above its value and a long path wraps inside the value column instead of pushing the key off.",

		kind: "ledger",

		rows: 4,

		width: "narrow",
	},

	{
		mark: "16",

		group: "facts",

		state_name: "REST",

		component: "Matrix",

		when: "A comparison across columns: the head names each column, the row label pins to the edge, one ink per column.",

		kind: "matrix",

		rows: 4,

		columns: ["TIER", "PROTOCOL", "FEATURES"],
	},

	{
		mark: "17",

		group: "facts",

		state_name: "ONE COLUMN",

		component: "Matrix",

		when: "A matrix of one column is a value list with a head, and it is legal - the comparison is of one state across one column.",

		kind: "matrix",

		rows: 3,

		columns: ["SIGNAL"],
	},

	{
		mark: "18",

		group: "facts",

		state_name: "TWELVE COLUMNS",

		component: "Matrix",

		when: "The too-wide state: twelve columns do not fit, so the shell scrolls sideways and the row label stays attached to its cells.",

		kind: "matrix",

		rows: 3,

		columns: [
			"GRPC",

			"IPC",

			"TCP",

			"WASM",

			"MCP",

			"LSP",

			"DAP",

			"OTEL",

			"FS",

			"HTTP",

			"CRDT",

			"SPINE",
		],
	},

	{
		mark: "19",

		group: "facts",

		state_name: "PARTIAL",

		component: "Matrix",

		when: "A cell that could not be measured: `UNAVAILABLE` takes the vocabulary's ink and the mark layer's square, so it never reads as a value.",

		kind: "matrix",

		rows: 3,

		variant: "unavailable",

		columns: ["TIER", "PROTOCOL", "FEATURES"],
	},

	{
		mark: "20",

		group: "facts",

		state_name: "TOTAL ROW",

		component: "Matrix",

		when: "A column's sum: the divider's rule above the row and the sub role in its cells - a total per column, because a comparison's total is per column.",

		kind: "matrix",

		rows: 3,

		variant: "total",

		columns: ["TIER", "FEATURES"],
	},

	{
		mark: "21",

		group: "facts",

		state_name: "LOADING",

		component: "Matrix",

		when: "The values have not arrived: the head stays - it is the schema - and every cell prints a bar.",

		kind: "matrix",

		rows: 3,

		state: "loading",

		columns: ["TIER", "PROTOCOL", "FEATURES"],
	},

	{
		mark: "22",

		group: "facts",

		state_name: "EMPTY",

		component: "Matrix",

		when: "No row is recorded: the head prints because the columns are still the schema, and one cell spanning the table states the absence.",

		kind: "matrix",

		rows: 0,

		state: "empty",

		columns: ["TIER", "PROTOCOL", "FEATURES"],

		empty: "No release is filed against these columns yet. The head prints because what is being compared is known before the values are; the body states the absence rather than leaving a blank.",
	},

	/* ─── AXES ─────────────────────────────────────────────────────────── */

	{
		mark: "23",

		group: "axes",

		state_name: "REST",

		component: "Compare",

		when: "One axis with two ends and a tick per position: the order is the claim, and the ends are what make it a claim.",

		kind: "compare",

		rows: 4,

		label: "/POSITION",
	},

	{
		mark: "24",

		group: "axes",

		state_name: "TWO SIDES EQUAL",

		component: "Compare",

		when: "Two positions carrying the same value: the interval between their ticks is drawn in the rail's ink, so the tie is a plateau before the caption is read.",

		kind: "compare",

		rows: 3,

		variant: "equal",

		label: "/PARITY",
	},

	{
		mark: "25",

		group: "axes",

		state_name: "ONE STOP",

		component: "Compare",

		when: "A rail of one: the stop takes the whole measure and the axis still prints, because the axis is what the position is a position on.",

		kind: "compare",

		rows: 1,

		label: "/POSITION",
	},

	{
		mark: "26",

		group: "axes",

		state_name: "UNREACHED",

		component: "Compare",

		when: "A position nothing has arrived at: the tick hollows and `STATUS: UNAVAILABLE` prints above the value - the partial state as a shape.",

		kind: "compare",

		rows: 4,

		variant: "unreached",
	},

	{
		mark: "27",

		group: "axes",

		state_name: "LOADING",

		component: "Compare",

		when: "The stops have not arrived: the axis prints because it is already known, and three hollow stops print bars where the labels and values will be.",

		kind: "compare",

		rows: 3,

		state: "loading",
	},

	{
		mark: "28",

		group: "axes",

		state_name: "EMPTY",

		component: "Compare",

		when: "No position is recorded: the ends still print, so a reader can see which order is being asked about.",

		kind: "compare",

		rows: 0,

		state: "empty",

		empty: "No position is recorded on this axis yet. The rail prints its two ends rather than a blank line, because the order being asked about is itself a fact.",
	},

	{
		mark: "29",

		group: "axes",

		state_name: "REST",

		component: "Trace",

		when: "Where a claim can be checked: numbered steps, each with the one thing it carries, closed by the source it was read out of.",

		kind: "trace",

		rows: 4,

		label: "BUILD",
	},

	{
		mark: "30",

		group: "axes",

		state_name: "TWENTY STEPS",

		component: "Trace",

		when: "The too-many state: twenty steps print as twenty ruled steps, the index column holding `20` without moving the paths.",

		kind: "trace",

		rows: 20,

		label: "CHECK",
	},

	{
		mark: "31",

		group: "axes",

		state_name: "NO EVENTS",

		component: "Trace",

		when: "A trace whose source names no step: the marker and the `SOURCE:` both survive, and one sentence says why there is nothing between them.",

		kind: "trace",

		rows: 0,

		state: "empty",

		label: "BUILD",
	},

	{
		mark: "32",

		group: "axes",

		state_name: "LONG PATH",

		component: "Trace",

		when: "A path longer than its note: it wraps inside the path column at every width and never pushes the note off the row.",

		kind: "trace",

		rows: 2,

		variant: "longpath",

		label: "CHECK",
	},

	{
		mark: "33",

		group: "axes",

		state_name: "LOADING",

		component: "Trace",

		when: "The trace is being read: the index prints in ink because the order is the schema, and a bar stands where each path and note will be.",

		kind: "trace",

		rows: 0,

		state: "loading",

		label: "BUILD",
	},

	/* ─── MEASURES ─────────────────────────────────────────────────────── */

	{
		mark: "34",

		group: "measures",

		state_name: "REST",

		component: "Instrument",

		when: "A measured panel: four fields in one cell - `LABEL:`, figure, unit, `SOURCE:` - because a figure without provenance is a picture.",

		kind: "instrument",

		rows: 3,

		label: "/THE EXTENT",
	},

	{
		mark: "35",

		group: "measures",

		state_name: "MISSING READING",

		component: "Instrument",

		when: "One figure that could not be measured: the state word prints in the figure's place and the unit is dropped, because `UNAVAILABLE ENTRIES` would read as a figure.",

		kind: "instrument",

		rows: 3,

		variant: "unavailable",

		label: "/THE EXTENT",
	},

	{
		mark: "36",

		group: "measures",

		state_name: "TWELVE MEASURES",

		component: "Instrument",

		when: "The too-many state: twelve measures reflow at `auto-fit`/13rem and wrap rather than shrinking a figure, because a shrunken number is a smaller claim.",

		kind: "instrument",

		rows: 12,
	},

	{
		mark: "37",

		group: "measures",

		state_name: "TOTAL",

		component: "Instrument",

		when: "The panel's sum: it spans the strip under the divider's rule at the sub role, so the total is a rank and not one more figure.",

		kind: "instrument",

		rows: 3,

		variant: "total",

		label: "/THE EXTENT",
	},

	{
		mark: "38",

		group: "measures",

		state_name: "STALE",

		component: "Instrument",

		when: "A figure older than the page: `AS OF:` prints after the provenance at the caption weight, so a stale number is never silent about being old.",

		kind: "instrument",

		rows: 2,

		variant: "stale",
	},

	{
		mark: "39",

		group: "measures",

		state_name: "LOADING",

		component: "Instrument",

		when: "The figures have not arrived: the keys and the `SOURCE:` lines print and only the figure is barred, because the schema is known.",

		kind: "instrument",

		rows: 3,

		state: "loading",

		label: "/THE EXTENT",
	},

	{
		mark: "40",

		group: "measures",

		state_name: "EMPTY",

		component: "Instrument",

		when: "Nothing has been measured: the `◎` and the composed sentence, at the panel's own top rule - never a box waiting to be filled.",

		kind: "instrument",

		rows: 0,

		state: "empty",

		empty: "The register has not been run against this tree, so there are no figures to print. Run the register and rebuild - this panel will not invent a number to fill itself.",
	},

	{
		mark: "41",

		group: "measures",

		state_name: "REST",

		component: "Plate set",

		when: "Many figures of one subject: numbered cells at one size, each with its state, its subject and its reason.",

		kind: "plateset",

		rows: 6,

		label: "ELEMENT EVIDENCE",
	},

	{
		mark: "42",

		group: "measures",

		state_name: "MISSING PLATES",

		component: "Plate set",

		when: "Most of the set is absent: each cell prints its own state and reason in the grammar the present ones use, so the field reads as one register of attempts.",

		kind: "plateset",

		rows: 6,

		variant: "absent",

		label: "ELEMENT EVIDENCE",
	},

	{
		mark: "43",

		group: "measures",

		state_name: "TOO MUCH",

		component: "Plate set",

		when: "A set of two hundred: twelve print and the foot names the rest - `SHOWING: 12 OF 240` - because a page of two hundred figures is a directory.",

		kind: "plateset",

		rows: 12,

		variant: "window",

		label: "ELEMENT EVIDENCE",
	},

	{
		mark: "44",

		group: "measures",

		state_name: "EMPTY",

		component: "Plate set",

		when: "No plate is filed: the head still prints its index and its count, and one sentence says what the set would hold.",

		kind: "plateset",

		rows: 0,

		state: "empty",

		label: "ELEMENT EVIDENCE",
	},

	/* ─── LINES ────────────────────────────────────────────────────────── */

	{
		mark: "45",

		group: "lines",

		state_name: "REST",

		component: "Register",

		when: "The counted line, in its five parts: the mark and the separator muted, the name and the figure in ink.",

		kind: "register",

		label: "WHAT CHANGES",

		count: "08",
	},

	{
		mark: "46",

		group: "lines",

		state_name: "UNIT",

		component: "Register",

		when: "A set whose count is of something: the unit is bound to the figure by one space and never separates from it.",

		kind: "register",

		label: "BLOG",

		count: "08",

		unit: "ENTRIES",
	},

	{
		mark: "47",

		group: "lines",

		state_name: "QUAD",

		component: "Register",

		when: "U+2001 as the separator: the form the rail and the specimen registers print, where the count is a column rather than a route.",

		kind: "register",

		label: "ON THIS PAGE",

		count: "07",

		separator: "quad",
	},

	{
		mark: "48",

		group: "lines",

		state_name: "UNAVAILABLE",

		component: "Register",

		when: "A count that cannot be known: the vocabulary's word where the figure will be - never a zero, because a zero claims the set is empty.",

		kind: "register",

		label: "CHECK",

		count: "UNAVAILABLE",
	},

	{
		mark: "49",

		group: "lines",

		state_name: "TOO MUCH",

		component: "Register",

		when: "A set longer than the page: `RegisterWindow` states what the reader holds and what exists, in the register's own grammar.",

		kind: "register",

		label: "PLATES",

		count: "12 OF 240",
	},

	{
		mark: "50",

		group: "lines",

		state_name: "LOADING",

		component: "Register",

		when: "The set has not been counted yet: `LOADING` prints where the figure will be, whole and unbroken, so the line does not reflow when it arrives.",

		kind: "register",

		label: "WHAT CHANGES",

		count: "08",

		state: "loading",
	},

	{
		mark: "51",

		group: "lines",

		state_name: "EMPTY",

		component: "Register",

		when: "A set with nothing in it: `00` is a figure, because an empty set is a known set - and the line still names what turned out to be empty.",

		kind: "register",

		label: "WHAT CHANGES",

		count: "00",
	},

	{
		mark: "52",

		group: "lines",

		state_name: "THE FOUR CONSTRUCTORS",

		component: "Register line",

		when: "The shape itself: four questions, four answers - a set the block holds, a count it does not, a count that cannot be known, and a window of a larger set.",

		kind: "registerline",
	},
];

/** The rows of one group, in order. */
export const InGroup = (Group: Group): readonly Specimen[] =>
	Specimens.filter((Specimen) => Specimen.group === Group);

/** The four groups, in reading order, with the question each one answers. */
export const Groups: readonly { key: Group; label: string; note: string }[] = [
	{
		key: "facts",

		label: "/FACTS",

		note: "What the document states as true, and what it states as compared. These are the two blocks a reader checks the project against.",
	},

	{
		key: "axes",

		label: "/AXES",

		note: "Where things sit on one line, and where a claim can be checked along one. The rail has ends and the trace has a source; both are orders.",
	},

	{
		key: "measures",

		label: "/MEASURES",

		note: "How much of something, and what a set of evidence looks like at one size. A figure carries its source; a picture carries its state.",
	},

	{
		key: "lines",

		label: "/LINES",

		note: "The counted line itself - the site's most-printed sentence - in every arm it has, including the two that had no shape before this card.",
	},
];

/** How many live rows the sheet prints. */
export const SpecimenCount = Specimens.length;
