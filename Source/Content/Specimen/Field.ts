/**
 * Field - the input family's state matrix, and the specimens that print it.
 *
 * ─── WHY A MATRIX IS THE SUBJECT ──────────────────────────────────────────
 * A field is the one component a reader touches with their hands, so its states
 * are the product. Every other part on this sheet can be judged by looking at
 * it; a field has to be judged by what it does when the reader is in it, when
 * the value is wrong, when the value has not arrived, when the label is longer
 * than the box, and when the same instrument is asked to sit in a card, a band
 * and a sixteen-rem column.
 *
 * The tree carried the five states the state layer names - rest, hover, focus,
 * invalid, disabled, read-only - on six kit primitives, and nothing that named
 * the rest. There was no valid state, no counter, no addon, no action row, no
 * dense variant, no loading field, no partial field, and no place where a
 * field's label could say `REQUIRED` or `READ-ONLY` in its own register. The
 * matrix is how those absences became visible: ten rows, twenty-three columns,
 * and every empty cell either built or given a reason.
 *
 * ─── THE CELL IS A DISPOSITION, NOT A STATUS WORD ─────────────────────────
 * `BUILT` and `NOT APPLICABLE` are not members of §1.5's eight status words,
 * and they must not be: a status is what a surface is doing, and this is what a
 * sheet did with a cell. The vocabulary here is the sheet's own - the same three
 * dispositions `Parts.ts` uses (`printed`, `absent`, `folded`), stated as two.
 * A cell that is `NOT APPLICABLE` prints its reason; a cell that is `BUILT` may
 * print a note saying which part of the family built it, because "built" in the
 * `INPUT` row and "built" in the `FORM` row are not the same construction.
 *
 * ─── NOTHING HERE IS A FIGURE ─────────────────────────────────────────────
 * The counts are derived from the tables below, so a row added to the family
 * changes the sheet's figures without a second edit. A number typed into this
 * file would be the one figure on the sheet that could disagree with the sheet.
 *
 * ─── THE SPECIMENS ARE DATA, THE STAGE IS THE COMPONENT'S ──────────────────
 * A row states what it is (`state`), which part of the family it exercises
 * (`component`), when that state is right (`when`), and the props its specimen
 * needs (`specimen`). The renderer mounts the control; it decides nothing. That
 * split is why the matrix and the live rows cannot drift: both read this file.
 */

/* ─── THE COLUMNS ────────────────────────────────────────────────────────── */

/** A column of the matrix: the state or combination, and what its cell asks. */
export interface Column {
	/** The cell's key in a row's override map. */
	readonly key: string;

	/** The column head, in the sheet's register: `READ-ONLY`, `LONG TEXT`. */
	readonly label: string;

	/** One line under the head: what the cell is asking. */
	readonly ask: string;

	/**
	 * The group the column belongs to. The matrix prints a rule between groups,
	 * because a condition (`FOCUS`) and a context (`IN A CARD`) are two
	 * different questions and a reader scanning the head should see where one
	 * set ends.
	 */
	readonly group: "condition" | "shape" | "context";
}

/**
 * The twenty-three columns, in reading order: what the field is doing, what it
 * is asked to hold, then where it is put. Conditions first because they are the
 * states a reader meets; contexts last because they are the ones a designer
 * forgets.
 */
export const Columns: readonly Column[] = [
	{ key: "rest", label: "REST", ask: "untouched", group: "condition" },

	{
		key: "focus",

		label: "FOCUS",

		ask: "the cursor is in it",

		group: "condition",
	},

	{
		key: "filled",

		label: "FILLED",

		ask: "holds a value",

		group: "condition",
	},

	{ key: "empty", label: "EMPTY", ask: "holds nothing", group: "condition" },

	{
		key: "invalid",

		label: "INVALID",

		ask: "the value was refused",

		group: "condition",
	},

	{
		key: "valid",

		label: "VALID",

		ask: "the value passed",

		group: "condition",
	},

	{
		key: "disabled",

		label: "DISABLED",

		ask: "cannot be edited",

		group: "condition",
	},

	{
		key: "readonly",

		label: "READ-ONLY",

		ask: "may be quoted, not changed",

		group: "condition",
	},

	{
		key: "required",

		label: "REQUIRED",

		ask: "the form needs it",

		group: "condition",
	},

	{
		key: "hint",

		label: "HINT",

		ask: "a sentence under it",

		group: "condition",
	},

	{
		key: "counter",

		label: "COUNTER",

		ask: "a limit it can see",

		group: "condition",
	},

	{
		key: "addon",

		label: "ADDON",

		ask: "a prefix or a suffix",

		group: "condition",
	},

	{
		key: "action",

		label: "ACTION",

		ask: "one thing to do with it",

		group: "condition",
	},

	{ key: "dense", label: "DENSE", ask: "a settings list", group: "shape" },

	{
		key: "longtext",

		label: "LONG TEXT",

		ask: "a label that will not fit",

		group: "shape",
	},

	{ key: "oneitem", label: "ONE ITEM", ask: "a set of one", group: "shape" },

	{
		key: "manyitems",

		label: "MANY ITEMS",

		ask: "a set of forty",

		group: "shape",
	},

	{
		key: "loading",

		label: "LOADING",

		ask: "the value has not arrived",

		group: "shape",
	},

	{
		key: "partial",

		label: "PARTIAL",

		ask: "some of it is known",

		group: "shape",
	},

	{ key: "narrow", label: "NARROW", ask: "a 16rem column", group: "context" },

	{ key: "wide", label: "WIDE", ask: "a 60rem band", group: "context" },

	{ key: "card", label: "CARD", ask: "on a white insert", group: "context" },

	{ key: "band", label: "BAND", ask: "on the creme field", group: "context" },
];

/* ─── THE CELLS ──────────────────────────────────────────────────────────── */

/** What the sheet did with one cell. */
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
	/** `INPUT` - the row's name in the sheet's register. */
	readonly name: string;

	/** The file the part is, relative to `Source/`, upper case. */
	readonly file: string;

	/** One line: what the part is, in the sheet's voice. */
	readonly note: string;

	/**
	 * The cells this row overrides. Everything not listed is `BUILT`, because a
	 * family that renders its own happy state everywhere should not have to say
	 * so two hundred times - and a default of `built` makes every exception a
	 * sentence someone had to write.
	 */
	readonly cells: Readonly<Record<string, Cell>>;
}

/**
 * The ten components, in the family's own order: the control, the multi-line
 * control, the label that names both, then the four choice controls, then the
 * two composite ones, then the form that holds them all.
 *
 * Every row's overrides are reasons. A row with no overrides would be a part
 * that survives every combination, and no part does.
 */
export const Rows: readonly Row[] = [
	{
		name: "INPUT",

		file: "COMPONENT/UI/INPUT.TSX",

		note: "One line of text, in the site's field frame.",

		cells: {
			oneitem: NotApplicable(
				"An input holds one value. A set of one is a Select's or a radio group's subject, not an input's.",
			),

			manyitems: NotApplicable(
				"An input has no members. The set it belongs to is the form's, and the form's row owns that column.",
			),

			partial: Built(
				"The foot prints `↳VERIFIED BY: UNAVAILABLE` - the value arrived, the fact that would confirm it did not.",
			),

			loading: Built(
				"The skeleton in the record grammar: a `LOADING` marker and one barred rule, never a spinner.",
			),

			action: Built(
				"`Field--row`: the control and its action share a line at wide and stack at narrow, on a container query.",
			),

			counter: Built(
				"The count is derived from the control's own value, and turns over-limit at the limit rather than after it.",
			),
		},
	},

	{
		name: "TEXTAREA",

		file: "COMPONENT/UI/TEXTAREA.TSX",

		note: "A paragraph, in the same frame as one line.",

		cells: {
			oneitem: NotApplicable(
				"A textarea holds one value, however many lines it takes.",
			),

			manyitems: NotApplicable(
				"Its members are lines, and lines are not items a control selects between.",
			),

			addon: NotApplicable(
				"A prefix hangs in a first-line gutter, and a multi-line box has none: the prefix would sit beside the box, not inside it. The suffix is built - it is the counter.",
			),

			counter: Built(
				"The canonical use: `180 / 240` in the foot, and the last ten characters turn the count to the error's ink.",
			),

			partial: Built(
				"The foot names the fact that did not arrive, under the value that did.",
			),
		},
	},

	{
		name: "LABEL",

		file: "COMPONENT/UI/LABEL.TSX",

		note: "The word that names a control, and its own register.",

		cells: {
			focus: NotApplicable(
				"A label is not focusable. It carries the field's focus through `for`, and a ring of its own would be a second target for one field.",
			),

			filled: NotApplicable("A label has no value to fill."),

			empty: NotApplicable(
				"A label is a word: it is present or it is absent. An empty label is a control with no name, which is a defect rather than a state.",
			),

			valid: NotApplicable(
				"A passed value is the control's fact. The label states what the field wants, never whether it got it.",
			),

			readonly: Built(
				"The label's meta slot prints `READ-ONLY` - the field's own register, in the label's row rather than in a note beside the box.",
			),

			required: Built(
				"The asterisk and `aria-required` travel together: the glyph is what a reader scans for, the attribute is what a screen reader is told.",
			),

			counter: Built(
				"The counter lives in the label's meta slot at wide, so the foot holds only sentences.",
			),

			addon: NotApplicable(
				"An addon belongs to the control's box. A label has no box.",
			),

			action: Built(
				"`Field__Head` takes an action: the one link that belongs to the field's name, not to its value.",
			),

			longtext: Built(
				"A label wraps at `overflow-wrap: anywhere`, so a path or an address that will not fit breaks instead of overflowing.",
			),

			oneitem: NotApplicable("A label names one control; it has no set."),

			manyitems: NotApplicable(
				"A label names one control; it has no set.",
			),

			loading: NotApplicable(
				"A label is printed with the skeleton, not loaded by it - the schema is the one thing a loading field already knows.",
			),

			partial: NotApplicable(
				"A label states what the field wants. What arrived is the control's sentence.",
			),
		},
	},

	{
		name: "CHECKBOX",

		file: "COMPONENT/UI/CHECKBOX.TSX",

		note: "One mark, one sentence, and a group of both.",

		cells: {
			readonly: NotApplicable(
				"HTML has no read-only checkbox. A value that must not change is `disabled` with the value printed beside it - a checkbox that looks pressable and is not is worse than one that says it cannot be pressed.",
			),

			counter: NotApplicable(
				"Nothing to count. The selection count belongs to the group, and the group's row is `MANY ITEMS`.",
			),

			addon: NotApplicable(
				"A checkbox has no box for an addon to sit in.",
			),

			manyitems: Built(
				"A group of twelve with a selection count in its head: `3 OF 12 SELECTED`, derived from the group's own state.",
			),

			partial: NotApplicable(
				"A checkbox is a boolean: it is known or it is not, and not-known is the skeleton.",
			),

			action: Built(
				"A consent row with `SELECT ALL` in the group's head.",
			),
		},
	},

	{
		name: "RADIO GROUP",

		file: "COMPONENT/UI/RADIOGROUP.TSX",

		note: "One of a set, with the set stated.",

		cells: {
			readonly: NotApplicable(
				"A radio group that cannot change is `disabled`; a read-only radio is a mark that lies about being pressable.",
			),

			counter: NotApplicable(
				"A radio group selects one, so there is no selection to count. Its size is the option count, which is `MANY ITEMS`.",
			),

			addon: NotApplicable(
				"A group has no box; its frame is its legend.",
			),

			oneitem: Built(
				"A group of one is degenerate and still a group: the legend, the one option, and the required mark.",
			),

			manyitems: Built("Twelve options, ruled at the tight interval."),

			partial: NotApplicable(
				"One of a set is either chosen or not. There is no half-chosen radio.",
			),
		},
	},

	{
		name: "SWITCH",

		file: "COMPONENT/UI/SWITCH.TSX",

		note: "A boolean that takes effect at once.",

		cells: {
			readonly: NotApplicable(
				"A switch that cannot be flipped is disabled. A read-only switch would be a control that looks like it will answer and will not.",
			),

			required: NotApplicable(
				"A switch has a default, so it is never empty and never missing. A gate that must be on is a required checkbox, where the mark is the consent.",
			),

			counter: NotApplicable("A boolean has nothing to count."),

			addon: NotApplicable("A switch has no box for an addon to sit in."),

			oneitem: NotApplicable("A switch is one boolean; it has no set."),

			manyitems: NotApplicable(
				"A row of switches is a settings list - a `FieldSet` of switches, not one switch with members.",
			),

			partial: NotApplicable(
				"A switch reports a state it holds; a state it does not know yet is the skeleton.",
			),

			filled: Built(
				"On: the thumb at the far end and the state word in the row.",
			),

			empty: Built(
				"Off: the same row, the same word, no fill - the off state is a state, not a hole.",
			),
		},
	},

	{
		name: "SLIDER",

		file: "COMPONENT/UI/SLIDER.TSX",

		note: "A value chosen from a range, printed.",

		cells: {
			empty: NotApplicable(
				"A slider cannot be empty: it starts at its minimum, and a range with no value is not a range.",
			),

			invalid: NotApplicable(
				"The track enforces its own bounds, so a value outside them is impossible. A slider that must be above a floor states the floor in its hint, not in an error.",
			),

			valid: NotApplicable(
				"There is no invalid to be the opposite of, so a valid slider would be a green mark with nothing behind it.",
			),

			readonly: NotApplicable(
				"A slider is a control; one that cannot move is disabled. A value the reader may only read is printed, not slid.",
			),

			required: NotApplicable(
				"A slider always has a value, so it is never the thing a form is missing.",
			),

			counter: Built(
				"The readout: `N / MAX` in the register beside the track, derived from the thumb's own position.",
			),

			addon: Built(
				"A unit suffix - `%`, `MB`, `PT` - printed at the track's end, in the readout.",
			),

			oneitem: NotApplicable("A slider is one value; it has no members."),

			manyitems: NotApplicable(
				"A range is continuous. A set of ranges is a matrix, not a slider.",
			),

			partial: NotApplicable(
				"A slider's value is always a number the reader chose; there is no half-known position.",
			),
		},
	},

	{
		name: "SELECT",

		file: "COMPONENT/UI/SELECT.TSX",

		note: "One of a list, opened in a slip.",

		cells: {
			readonly: NotApplicable(
				"A select has no read-only state. A value that must not change is printed as a value, not offered as a choice.",
			),

			counter: Built(
				"The option count in the foot - `40 OPTIONS` - not a character count: a select's limit is its list, not its text.",
			),

			addon: NotApplicable(
				"The trigger is already a frame with a `:` label and its disclosure mark. An addon would be a second frame inside the first.",
			),

			dense: Built(
				"The trigger's default height is the dense form of a field - 32px, at the meta register - so the select is the one control whose rest state is already a settings list.",
			),

			longtext: Built(
				"The value ellipses in the trigger and prints in full in the slip.",
			),

			oneitem: Built(
				"A list of one still opens, and the slip states that it holds one option.",
			),

			manyitems: Built(
				"Forty options scroll inside the slip, and the foot states the count.",
			),

			partial: Built(
				"`UNAVAILABLE` as the trigger's value: a field whose stored value is not in the list it is being offered.",
			),
		},
	},

	{
		name: "INPUT OTP",

		file: "COMPONENT/UI/INPUTOTP.TSX",

		note: "A code, one slot at a time.",

		cells: {
			readonly: NotApplicable(
				"A code that must not change is disabled once accepted, and the acceptance is a sentence under it.",
			),

			addon: NotApplicable(
				"The slots are the box. A prefix would be a seventh cell that is not part of the code.",
			),

			longtext: NotApplicable(
				"A code's length is fixed by its slots, so there is no long text - an eight-character code is `MANY ITEMS`, not a long one.",
			),

			oneitem: NotApplicable(
				"One slot is not a code; a code is a fixed set of slots.",
			),

			manyitems: Built("Eight slots, grouped four and four."),

			counter: Built(
				"The progress: `3 / 6`, derived from the code's own length.",
			),

			partial: Built(
				"The partial state's best example: three of six slots filled, and the count says which three of six.",
			),

			action: Built(
				"`RESEND` beside the code, in the field's action slot.",
			),
		},
	},

	{
		name: "FORM",

		file: "COMPONENT/UI/FORM.TSX",

		note: "The fields, and the receipt of what they refused.",

		cells: {
			readonly: NotApplicable(
				"A form is open or it is closed. A form the reader may not change is a receipt, and the receipt is its own block.",
			),

			addon: NotApplicable(
				"A form has no addon. The prefix of a form is its route, and the route is the page's, not the block's.",
			),

			disabled: Built(
				"Not a disabled form: an unarmed action. The primary is `aria-disabled` until every required field carries a value, and pressing it explains rather than refuses.",
			),

			counter: Built(
				"The summary's head: `3 FIELDS`, counted from the rows it prints.",
			),

			invalid: Built(
				"`INTERRUPTED`, the count, and one focusable line per refused field.",
			),

			valid: Built("`READY`, and the primary action armed."),

			empty: Built(
				"No field filed: the block states that it holds nothing rather than printing an empty box.",
			),

			oneitem: Built(
				"One field is a form with one field, and the summary has one row.",
			),

			manyitems: Built(
				"Twelve fields: the stack holds, and the summary counts twelve.",
			),

			loading: Built(
				"The prefill has not arrived: the fields print their skeleton, the state stays `PREPARING`.",
			),

			partial: Built(
				"One fact unknown: the field prints `UNAVAILABLE`, and the state stays `PREPARING` rather than guessing.",
			),

			longtext: Built(
				"Twenty-four fields on a narrow page: the stack scrolls and the summary stays above the first one.",
			),

			dense: Built(
				"Every field in the dense variant, on the settings interval.",
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

	{
		key: "SOURCE:",

		value: "CONTENT/SPECIMEN/FIELD.TS",

		note: "every figure above is counted from the two tables above it",
	},
];

/* ─── THE SPECIMENS ──────────────────────────────────────────────────────── */

/**
 * The three groups the sheet prints the live rows in.
 *
 * A state, a control and a context are three different questions, and a flat
 * list of thirty rows would read as one long answer to none of them.
 */
export type Group = "states" | "controls" | "skins";

/** What the stage mounts for a row. */
export type Kind =
	| "input"
	| "textarea"
	| "select"
	| "checkbox"
	| "radiogroup"
	| "switch"
	| "slider"
	| "otp"
	| "label"
	| "summary";

/** The field's own props, shared by every control kind. */
export interface FieldSpec {
	/** The label, as printed. Never shortened by the renderer. */
	readonly label: string;

	/** The sentence under the control, when the field is at rest. */
	readonly hint?: string;

	/** The refusal. Its presence is what makes the field invalid. */
	readonly error?: string;

	/** The confirmation. Its presence is what makes the field valid. */
	readonly valid?: string;

	/** The fact that did not arrive, printed under the value that did. */
	readonly partial?: string;

	/** The limit, and the value the counter counts. */
	readonly limit?: number;

	/** The value the control holds - and therefore what the counter counts. */
	readonly value?: string;

	/** The placeholder, which is the only muted thing an empty field prints. */
	readonly placeholder?: string;

	/** The addon before the value. */
	readonly prefix?: string;

	/** The addon after the value. */
	readonly suffix?: string;

	/** The one action that belongs to the field. */
	readonly action?: string;

	/** The required marker and `aria-required`. */
	readonly required?: boolean;

	/** The field cannot be edited. */
	readonly disabled?: boolean;

	/** The value may be quoted and may not be changed. */
	readonly readonly?: boolean;

	/** The dense interval. */
	readonly dense?: boolean;

	/** The declared state, for the one state a printed sheet cannot produce. */
	readonly state?: "focus";

	/** The loading skeleton replaces the control. */
	readonly loading?: boolean;

	/** The input's type. */
	readonly type?: string;

	/** The options a set control offers. */
	readonly options?: readonly string[];

	/** The checked state of a checkbox or switch. */
	readonly checked?: boolean;

	/** The chosen option of a group, or the value of a slider. */
	readonly chosen?: string;

	/** A slider's bounds. */
	readonly min?: number;

	/** A slider's upper bound. */
	readonly max?: number;

	/** The unit a slider's readout carries. */
	readonly unit?: string;

	/** A code's slot count, and how many are filled. */
	readonly slots?: number;

	/** The rows a summary prints. */
	readonly summary?: readonly {
		readonly field: string;

		readonly message: string;
	}[];

	/** The skin the row is printed on. */
	readonly skin?: "card" | "band" | "narrow" | "wide";
}

/** One labelled row on the sheet: the state, the part, and when it is right. */
export interface Specimen extends FieldSpec {
	/** `01` - the row's position, zero-padded. */
	readonly mark: string;

	/** The group the row is filed under. */
	readonly group: Group;

	/** The state or combination's name, in the sheet's register. */
	readonly state: string;

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
 * Ordered as the matrix's columns: the field's conditions first, then the other
 * nine controls, then the four contexts the same field is printed in. Every one
 * of the ten components appears at least once, and the four rows that carry the
 * contexts are the same control in four different boxes - which is the claim
 * this family has to prove.
 */
export const Specimens: readonly Specimen[] = [
	{
		mark: "01",

		group: "states",

		state: "REST",

		component: "Input",

		when: "A field nobody has touched: the frame, the label, and the value if there is one.",

		kind: "input",

		label: "PAIR REFERENCE",

		value: "CODE-4F21A",

		hint: "The reference this request is filed under.",
	},

	{
		mark: "02",

		group: "states",

		state: "FOCUS",

		component: "Input",

		when: "The reader is in the field; the ring is drawn outside the box so the frame it is in stays.",

		kind: "input",

		label: "EMAIL",

		value: "reader@editor.land",

		state: "focus",

		hint: 'Printed with `data-state="focus"`, because a sheet cannot hold a cursor.',
	},

	{
		mark: "03",

		group: "states",

		state: "EMPTY",

		component: "Input",

		when: "Nothing typed yet: the placeholder is the only muted thing an empty field may print.",

		kind: "input",

		label: "HANDLE",

		placeholder: "your-handle",

		hint: "Lower case, no spaces.",
	},

	{
		mark: "04",

		group: "states",

		state: "INVALID",

		component: "Input",

		when: "A value the form refused: the sentence names what is wrong, and the field's edge carries the ink.",

		kind: "input",

		label: "EMAIL",

		value: "reader@",

		error: "This field is required.",
	},

	{
		mark: "05",

		group: "states",

		state: "VALID",

		component: "Input",

		when: "A value that passed: a mark and a sentence in ink - green never means positive in general.",

		kind: "input",

		label: "CHECKSUM",

		value: "9f2c1b7a",

		valid: "Matches the digest published with the release.",
	},

	{
		mark: "06",

		group: "states",

		state: "DISABLED",

		component: "Input",

		when: "A field that cannot be edited now; the value stays readable, because a disabled field's value is still a fact.",

		kind: "input",

		label: "SIGNATURE",

		value: "UNAVAILABLE",

		disabled: true,

		hint: "Signing is planned and not yet published.",
	},

	{
		mark: "07",

		group: "states",

		state: "READ-ONLY",

		component: "Input",

		when: "A value the reader may quote and copy, and may not change; the label says so in its own register.",

		kind: "input",

		label: "SUBMITTED",

		value: "2026-11-19",

		readonly: true,
	},

	{
		mark: "08",

		group: "states",

		state: "REQUIRED",

		component: "Input",

		when: "A field the form will not file without; the asterisk and `aria-required` travel together.",

		kind: "input",

		label: "SUBJECT",

		placeholder: "One line, in your own words",

		required: true,
	},

	{
		mark: "09",

		group: "states",

		state: "HINT",

		component: "Input",

		when: "A sentence that explains the format before the reader gets it wrong - a hint is cheaper than an error.",

		kind: "input",

		label: "ORDER",

		value: "LAND-0042",

		hint: "The order reference from your receipt, six characters after the prefix.",
	},

	{
		mark: "10",

		group: "states",

		state: "COUNTER",

		component: "Textarea",

		when: "A limit the reader can see coming: the count derives from the value in the box, not from a prop beside it.",

		kind: "textarea",

		label: "WHAT CHANGED",

		value: "The print layer now resolves every link to its target before the page is handed to the printer, so a printed page cites an address a reader can follow.",

		limit: 240,

		hint: "One sentence is enough. The limit is the receipt's field, not the reader's patience.",
	},

	{
		mark: "11",

		group: "states",

		state: "OVER LIMIT",

		component: "Textarea",

		when: "The count has passed its limit: the number turns to the error's ink before the form has to say anything.",

		kind: "textarea",

		label: "AMENDMENT",

		value: "Every field in the request is editable until the request is filed, and the receipt names the reference it will be filed under, which is the pair reference printed at the head of the form, and that reference is the one to quote in a reply.",

		limit: 120,
	},

	{
		mark: "12",

		group: "states",

		state: "ADDON",

		component: "Input",

		when: "A prefix or a suffix that belongs to the value: a currency, a unit, a domain - the instrument is one box, not a box beside a box.",

		kind: "input",

		label: "BUDGET",

		value: "2500",

		prefix: "$",

		suffix: "USD",

		hint: "Whole units. The quote is fixed for the quarter it is issued in.",
	},

	{
		mark: "13",

		group: "states",

		state: "ACTION ROW",

		component: "Input",

		when: "A field and the one thing to do with it, on one line at wide and stacked at narrow - a container query on the field, not the page.",

		kind: "input",

		label: "VERIFICATION CODE",

		value: "482913",

		action: "VERIFY",

		hint: "Six digits, from the message the registry sent.",
	},

	{
		mark: "14",

		group: "states",

		state: "LOADING",

		component: "Input",

		when: "The value has not arrived: the schema is printed and the answer is barred, so the reader learns what the field is while they wait.",

		kind: "input",

		label: "PREFILLED FROM SESSION",

		loading: true,

		hint: "The skeleton does not move. What moves is the moment it ends.",
	},

	{
		mark: "15",

		group: "states",

		state: "PARTIAL",

		component: "Input",

		when: "Some of the value is known: the value prints, and the fact that would confirm it prints `UNAVAILABLE` rather than a zero.",

		kind: "input",

		label: "RELEASE",

		value: "0.4.0",

		partial: "VERIFIED BY: UNAVAILABLE",

		hint: "The version is filed; the digest that would attest it has not been published.",
	},

	{
		mark: "16",

		group: "controls",

		state: "LABEL",

		component: "Label",

		when: "The word that names a control, with its own register in the meta slot: `READ-ONLY`, or the counter.",

		kind: "label",

		label: "EMAIL ADDRESS",

		value: "reader@editor.land",

		required: true,

		readonly: true,

		hint: "The meta slot is the field's register, so the label can say what the box cannot.",
	},

	{
		mark: "17",

		group: "controls",

		state: "CHECKBOX",

		component: "Checkbox",

		when: "One consent, checked or not - and the unchecked state is a state, not a hole.",

		kind: "checkbox",

		label: "I have read the privacy term and I agree to it.",

		checked: true,

		hint: "The sentence is the label. A consent is read, so it keeps body weight.",
	},

	{
		mark: "18",

		group: "controls",

		state: "CHECKBOX GROUP",

		component: "Checkbox",

		when: "Twelve options with a selection count in the head: the set states how much of itself is chosen.",

		kind: "checkbox",

		label: "WHICH SURFACES",

		options: [
			"/Download",

			"/Verify",

			"/License",

			"/Privacy",

			"/Status",

			"/Contents",

			"/Glossary",

			"/Motion",

			"/Blog",

			"/Contact",

			"/Portal",

			"/Specimen",
		],

		hint: "Select every surface the request touches.",
	},

	{
		mark: "19",

		group: "controls",

		state: "RADIO GROUP",

		component: "RadioGroup",

		when: "One of a set: the legend names the question and the group prints how many answers it holds.",

		kind: "radiogroup",

		label: "CHANNEL",

		options: ["PUBLIC", "PRE-RELEASE", "INTERNAL"],

		chosen: "PRE-RELEASE",

		required: true,
	},

	{
		mark: "20",

		group: "controls",

		state: "SWITCH",

		component: "Switch",

		when: "A boolean that takes effect at once, with its state word printed beside it - the word is what survives greyscale.",

		kind: "switch",

		label: "TELEMETRY",

		checked: true,

		hint: "Feature-gated. Off by default, and the switch says which it is.",
	},

	{
		mark: "21",

		group: "controls",

		state: "SLIDER",

		component: "Slider",

		when: "A value chosen from a range, with the readout beside the track: the number is the value, the track is the gesture.",

		kind: "slider",

		label: "READING SIZE",

		min: 0,

		max: 24,

		value: "18",

		unit: "PT",

		hint: "The site's floor is 13px. A slider below it would be a slider that cannot be obeyed.",
	},

	{
		mark: "22",

		group: "controls",

		state: "SELECT",

		component: "Select",

		when: "One of a list, opened in a slip; the trigger is already the dense form of a field.",

		kind: "select",

		label: "SCOPE",

		options: [
			"COMPAT:VS CODE",

			"COMPAT:JETBRAINS",

			"COMPAT:ZED",

			"COMPAT:VIM",
		],

		chosen: "COMPAT:VS CODE",

		hint: "The editor the request is about.",
	},

	{
		mark: "23",

		group: "controls",

		state: "MANY ITEMS",

		component: "Select",

		when: "Forty options: the slip scrolls and the foot states the count, so the list says how big it is before it opens.",

		kind: "select",

		label: "ROUTE",

		options: Array.from(
			{ length: 40 },

			(_, Index) => `/ROUTE_${String(Index + 1).padStart(2, "0")}`,
		),

		chosen: "/ROUTE_01",
	},

	{
		mark: "24",

		group: "controls",

		state: "INPUT OTP",

		component: "InputOTP",

		when: "A code, one slot at a time, with the progress printed - the partial state's own best example.",

		kind: "otp",

		label: "SIX-DIGIT CODE",

		value: "482",

		slots: 6,

		limit: 6,

		hint: "Three of six, and the count says so.",

		action: "RESEND",
	},

	{
		mark: "25",

		group: "controls",

		state: "SUMMARY",

		component: "FormSummary",

		when: "The form's refusal as an artifact: the state word, the count, and one line per field. On the form each line is a control that moves the cursor; on this sheet the lines are printed, because there is no form here to move a cursor in.",

		kind: "summary",

		label: "INTERRUPTED",

		summary: [
			{ field: "YOUR NAME", message: "This field is required." },

			{ field: "EMAIL", message: "This field is required." },

			{ field: "CONSENT", message: "This confirmation is required." },
		],
	},

	{
		mark: "26",

		group: "skins",

		state: "IN A CARD",

		component: "Input",

		when: "On a white insert: the field keeps its frame and takes the card's inset - a card is where a form lies on a page.",

		kind: "input",

		label: "EMAIL",

		value: "reader@editor.land",

		hint: "One instrument, on the surface a request is filed on.",

		skin: "card",
	},

	{
		mark: "27",

		group: "skins",

		state: "IN A BAND",

		component: "Input",

		when: "On the creme field with no box around it: the same instrument, and no second frame to separate it from the page.",

		kind: "input",

		label: "EMAIL",

		value: "reader@editor.land",

		hint: "The field does not know it is on a page; it knows what a field is.",

		skin: "band",
	},

	{
		mark: "28",

		group: "skins",

		state: "NARROW COLUMN",

		component: "Input",

		when: "A 16rem column: the label wraps, the action stacks under the control, and the value still fits - the query is on the field.",

		kind: "input",

		label: "PAIR REFERENCE",

		value: "CODE-4F21A",

		action: "COPY",

		hint: "A drawer's width, and the same field.",

		skin: "narrow",
	},

	{
		mark: "29",

		group: "skins",

		state: "WIDE BAND",

		component: "Input",

		when: "A 60rem band: the field keeps its measure instead of stretching, because a field wider than its value is a field that lost its scale.",

		kind: "input",

		label: "EMAIL",

		value: "reader@editor.land",

		hint: "The instrument has a measure; the band does not give it one.",

		skin: "wide",
	},
];

/** The rows one group prints. */
export const InGroup = (Group: Group): readonly Specimen[] =>
	Specimens.filter((Row) => Row.group === Group);

/** The three group heads, in reading order. */
export const Groups: readonly { key: Group; label: string; note: string }[] = [
	{
		key: "states",

		label: "/THE CONDITIONS",

		note: "The fifteen conditions a field has to hold, in the order the state layer names them.",
	},

	{
		key: "controls",

		label: "/THE CONTROLS",

		note: "The other nine parts of the family, each printed once at the state it is best known by.",
	},

	{
		key: "skins",

		label: "/THE SKINS",

		note: "The same field in four boxes. A field that reads differently in a card is two components wearing one name.",
	},
];

/** How many rows the sheet prints. */
export const SpecimenCount = Specimens.length;
