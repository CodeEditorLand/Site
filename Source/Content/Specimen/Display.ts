/**
 * Display - the display family's state matrix, its verdicts, and the specimens.
 *
 * ─── WHY THE DISPLAY FAMILY NEEDS A MATRIX MORE THAN THE OTHERS ───────────
 * The input family is touched with the hands and the overlay family is judged in
 * the two seconds after a click. The display family is the one a reader only ever
 * READS - and a component that is only read is a component whose adverse states
 * nobody notices are missing. A table with no empty state, a tab strip that cannot
 * overflow, a skeleton that is a grey box, a progress bar with no figure: none of
 * them look broken, and all of them are.
 *
 * Nineteen components, twenty-one conditions, three hundred and ninety-nine cells.
 * Every cell that cannot exist carries a sentence saying why, because a blank cell
 * is an excuse and a reason is a fact.
 *
 * ─── THE DISPOSITION IS THE SHEET'S OWN VOCABULARY ────────────────────────
 * `BUILT` and `N/A` are not members of §1.5's eight status words, and
 * they must not be: a status is what a surface is doing, and this is what the sheet
 * did with a cell. It is the same three dispositions `Parts.ts` uses, stated as two.
 *
 * ─── NOTHING HERE IS A FIGURE ─────────────────────────────────────────────
 * Every count on the sheet is derived from the two tables below, so a row or a
 * condition added to the family changes the sheet's figures without a second edit.
 * A number typed into this file would be the one figure on the sheet that could
 * disagree with the sheet.
 *
 * ─── THE SPECIMENS ARE DATA, THE STAGE IS THE COMPONENT'S ─────────────────
 * A row states what it is (`state`), which part it exercises (`component`), when
 * that state is right (`when`), and the props its specimen needs - carried on
 * the row itself through `DisplaySpec`. The renderer mounts the component; it
 * decides nothing. That split is why the matrix and the live rows cannot drift:
 * both read this file.
 */

/* ─── THE COLUMNS ────────────────────────────────────────────────────────── */

/** A column of the matrix: the condition or combination, and what its cell asks. */
export interface Column {
	/** The cell's key in a row's override map. */
	readonly key: string;

	/** The column head, in the sheet's register: `LONG TEXT`, `IN A CARD`. */
	readonly label: string;

	/** One line under the head: what the cell is asking. */
	readonly ask: string;

	/**
	 * The group the column belongs to. The matrix prints a heavier rule where a
	 * condition becomes a shape and where a shape becomes a context, because those
	 * are three different questions and a reader scanning the head should see where
	 * one set ends.
	 */
	readonly group: "condition" | "shape" | "context";
}

/**
 * The twenty-one columns, in reading order.
 *
 * Nine conditions first, because they are the states a reader meets; then seven
 * shapes, because they are what a component is asked to hold; then five contexts,
 * because they are the ones a designer forgets.
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
		key: "active",

		label: "ACTIVE",

		ask: "the chosen one",

		group: "condition",
	},

	{
		key: "disabled",

		label: "DISABLED",

		ask: "cannot be used",

		group: "condition",
	},

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

		ask: "some facts unknown",

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

	{ key: "dense", label: "DENSE", ask: "a tighter rhythm", group: "shape" },

	{
		key: "longtext",

		label: "LONG TEXT",

		ask: "will not fit",

		group: "shape",
	},

	{ key: "oneitem", label: "ONE ITEM", ask: "a set of one", group: "shape" },

	{
		key: "manyitems",

		label: "MANY ITEMS",

		ask: "a set of two hundred",

		group: "shape",
	},

	{ key: "narrow", label: "NARROW", ask: "a 16rem column", group: "shape" },

	{ key: "wide", label: "WIDE", ask: "the full band", group: "shape" },

	{ key: "print", label: "PRINT", ask: "the printed page", group: "shape" },

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
	/** `TABLE` - the row's name in the sheet's register. */
	readonly name: string;

	/** The file the part is, relative to `Source/`, upper case. */
	readonly file: string;

	/** One line: what the part is, in the sheet's voice. */
	readonly note: string;

	/**
	 * The cells this row overrides. Everything not listed is `BUILT`, because a
	 * family that renders its own happy state everywhere should not have to say so
	 * three hundred times - and a default of `built` makes every exception a
	 * sentence someone had to write.
	 */
	readonly cells: Readonly<Record<string, Cell>>;
}

/**
 * The nineteen components, in the order a page meets them: the mark, the surface,
 * the reading instrument, the two disclosures, the measurement, the quiet ones.
 *
 * Every row's overrides are reasons. A row with no overrides would be a part that
 * survives every combination, and no part does.
 */
export const Rows: readonly Row[] = [
	{
		name: "BADGE",

		file: "COMPONENT/UI/BADGE.TSX",

		note: "One word, one ink pair, at the scale of a label.",

		cells: {
			disabled: NotApplicable(
				"A badge is not a control, so it cannot be disabled. A claim that is no longer current prints in the quiet ink, which is a state of the claim and not of the reader's permission.",
			),

			empty: NotApplicable(
				"A badge with no text is a coloured rectangle. An empty badge states nothing, so it is not printed at all - the set that would have held it prints its own absence instead.",
			),

			error: NotApplicable(
				"A badge carries no action, so it cannot fail. The refusal belongs to the control beside it, and that control is where the STATUS word goes.",
			),

			wide: NotApplicable(
				"A badge takes its content's width. A badge at full band width would be a status bar, and the site has one of those in the header.",
			),

			reducedmotion: NotApplicable(
				"A badge's only interval is a colour wash on hover, and colour is not motion. There is nothing to remove.",
			),

			rest: Built(
				"Four variants and ten ink pairs, at the kit's own size.",
			),

			oneitem: Built("A group of one is legal and prints its own count."),

			manyitems: Built("`BadgeGroup` prints four and `+N` for the rest."),
		},
	},

	{
		name: "CARD",

		file: "COMPONENT/UI/CARD.TSX",

		note: "A white insert on the field: the surface an artifact is printed on.",

		cells: {
			incard: NotApplicable(
				"A card inside a card is the one composition the identity forbids (§1.3). The card is the artifact's surface - one artifact, one card - so there is no second card to nest.",
			),

			oneitem: Built(
				"A card holding a single ledger row is legal: the card is the artifact, and an artifact may hold one fact.",
			),

			manyitems: Built(
				"Two hundred rows inside one card scroll inside the card; the frame does not grow past the band.",
			),

			reducedmotion: Built(
				"The card carries no interval at all - its states are ink and edge - so reduced motion changes nothing, which is the correct answer.",
			),
		},
	},

	{
		name: "TABLE",

		file: "COMPONENT/UI/TABLE.TSX",

		note: "Rows against columns, with a head that names each column.",

		cells: {
			empty: Built(
				"`TableEmpty` keeps the head - the schema is still true when there are no rows - and states the absence in the body.",
			),

			oneitem: Built(
				"A table of one row prints the head, the row, and the register that says the set is a set of one.",
			),

			narrow: Built(
				"`pinFirst` keeps the row's name attached to its cells while the frame scrolls sideways.",
			),

			print: Built(
				"The pin is released, the frame opens, and the head repeats on every printed page.",
			),

			reducedmotion: NotApplicable(
				"The table's only interval is the row's hover wash and the head's pin, and neither is motion. A disclosure inside a cell owns its own reduced-motion path.",
			),
		},
	},

	{
		name: "TABS",

		file: "COMPONENT/UI/TABS.TSX",

		note: "Sibling views of one subject, one visible at a time.",

		cells: {
			oneitem: NotApplicable(
				"One tab is not a choice. A single view prints its title, not a tab strip - a strip of one is a control that answers only itself.",
			),

			wide: NotApplicable(
				"A tab strip takes the width of its labels. Stretched across a band it would read as a nav, and the header already is one.",
			),

			empty: Built(
				"`TabsEmpty` prints `◎ NO VIEW` where the strip would be.",
			),

			manyitems: Built(
				"The strip scrolls and the readout counts the tabs past its trailing edge; zero hides the readout.",
			),

			print: Built(
				"The list is hidden and every panel prints under its own name - printing one panel of four would be printing a quarter of the document.",
			),

			reducedmotion: NotApplicable(
				"A tab strip has no interval: the panel swap is a state change, and the reveal on focus is `nearest`, which does not animate.",
			),
		},
	},

	{
		name: "ACCORDION",

		file: "COMPONENT/UI/ACCORDION.TSX",

		note: "A stack of disclosures, each closed until asked.",

		cells: {
			active: NotApplicable(
				"An accordion has no selected item. Open is not selected: `aria-expanded` is the state, and a stack that also carried a selection would have two states for one region.",
			),

			empty: Built(
				"`AccordionEmpty` prints `◎ NO SECTION` instead of a ruled void.",
			),

			manyitems: Built(
				"A stack of twelve keeps its rules and its one open panel; the page scrolls and the stack does not.",
			),

			print: Built(
				"Every panel prints open, because a printed page cannot be asked to click.",
			),

			reducedmotion: Built(
				"The height animation is removed and the panel is simply there: the state survives, the interval does not.",
			),
		},
	},

	{
		name: "COLLAPSIBLE",

		file: "COMPONENT/UI/COLLAPSIBLE.TSX",

		note: "One region, one trigger, no stack.",

		cells: {
			active: NotApplicable(
				"A collapsible has no selected item: the region is open or closed, and `aria-expanded` is the whole of its state.",
			),

			manyitems: NotApplicable(
				"A collapsible holds one region. Many regions are an accordion, and the family keeps the two apart on purpose - a component that did both would be one component pretending to be two.",
			),

			empty: Built("`CollapsibleEmpty` prints `◎ NO REGION`."),

			print: Built("The region prints open."),

			reducedmotion: Built(
				"The height animation is removed and the region is simply there.",
			),
		},
	},

	{
		name: "PROGRESS",

		file: "COMPONENT/UI/PROGRESS.TSX",

		note: "How far a known job has got, printed as a figure.",

		cells: {
			focus: NotApplicable(
				"A progress bar is not focusable. The job it reports owns the focus, and the bar is a figure.",
			),

			disabled: NotApplicable(
				"A job cannot be disabled; it can be paused, which is a state of the job rather than of the reader's permission.",
			),

			empty: NotApplicable(
				"An empty progress is a track at zero, which is the rest cell. There is no third thing between nothing and a figure.",
			),

			oneitem: NotApplicable(
				"One step is a completion, not a measurement: it prints `COMPLETE`, not a bar of one.",
			),

			partial: Built(
				"`07 OF UNAVAILABLE` and a stripe, because a proportion needs a denominator and a denominator that is not known is not zero.",
			),

			manyitems: Built(
				"Two hundred steps still print one figure and one bar.",
			),

			reducedmotion: Built(
				"The stripe parks at a third of the track and the fill snaps to its value.",
			),
		},
	},

	{
		name: "SKELETON",

		file: "COMPONENT/UI/SKELETON.TSX",

		note: "The shape of a record before its data arrives.",

		cells: {
			rest: NotApplicable(
				"A skeleton has one state - waiting. At rest it would be an empty shape, which is a decorative box.",
			),

			focus: NotApplicable(
				"A skeleton is not focusable. The thing it stands in for will be.",
			),

			active: NotApplicable(
				"A skeleton has no chosen state: it is replaced, not selected.",
			),

			disabled: NotApplicable(
				"Nothing can be disabled before it exists.",
			),

			empty: NotApplicable(
				"A skeleton for an empty set is a lie. If the answer is nothing, the empty state prints, not a placeholder.",
			),

			error: NotApplicable(
				"A failed load stops being a skeleton: the error state takes its place and the skeleton is unmounted.",
			),

			stale: NotApplicable(
				"A skeleton has no as-of. It is the absence of a value, not an old one.",
			),

			print: NotApplicable(
				"A skeleton is never printed. Paper has no waiting.",
			),

			withaction: Built(
				"The action's box is drawn at its measure, so the row does not jump when it arrives.",
			),

			reducedmotion: Built(
				"The bars are static by design; the only interval is the resolve that replaces them, and that belongs to the arriving record.",
			),
		},
	},

	{
		name: "SEPARATOR",

		file: "COMPONENT/UI/SEPARATOR.TSX",

		note: "One rule, and the label it can carry.",

		cells: {
			focus: NotApplicable("A rule is not focusable."),

			active: NotApplicable("A rule separates; it is not chosen."),

			disabled: NotApplicable(
				"A rule cannot be disabled. A rule that is not wanted is not printed.",
			),

			loading: NotApplicable("A rule has nothing to wait for."),

			empty: NotApplicable(
				"A separator with nothing on either side separates nothing; the space is the separator there.",
			),

			partial: NotApplicable(
				"A rule states no facts, so it cannot state an unknown one.",
			),

			error: NotApplicable("A rule cannot fail."),

			stale: NotApplicable("A rule has no as-of."),

			oneitem: NotApplicable(
				"A rule between one thing and itself is a box.",
			),

			withaction: NotApplicable(
				"A rule carries no action. The control that clears a filter is a button, not a separator.",
			),

			reducedmotion: NotApplicable("A rule has no interval."),
		},
	},

	{
		name: "AVATAR",

		file: "COMPONENT/UI/AVATAR.TSX",

		note: "One identity at the size of a seal.",

		cells: {
			active: NotApplicable(
				"An avatar is not chosen; the record it names is.",
			),

			disabled: NotApplicable(
				"An identity cannot be disabled. A record can be archived, and the avatar prints the tombstone: the mark stays and the ink goes.",
			),

			empty: NotApplicable(
				"An avatar with no identity is a blank square. The `◎` fallback is the honest form, and it is the partial cell.",
			),

			oneitem: NotApplicable(
				"An avatar is one identity by definition. A set of identities is `AvatarGroup`.",
			),

			manyitems: Built(
				"`AvatarGroup` overlaps by a quarter and prints `+N` for the identities it does not show.",
			),

			reducedmotion: NotApplicable("An avatar has no interval."),
		},
	},

	{
		name: "ALERT",

		file: "COMPONENT/UI/ALERT.TSX",

		note: "A state the reader must read before acting.",

		cells: {
			active: NotApplicable(
				"An alert has no chosen state. It is read, and dismissed.",
			),

			disabled: NotApplicable(
				"An alert cannot be disabled. A reader who may not act sees the `denied` composition, which is a state of the surface and not of the alert.",
			),

			empty: NotApplicable(
				"An alert with nothing in it is a rule. An empty alert states nothing, so it is not printed.",
			),

			oneitem: Built("One alert is the normal case."),

			manyitems: Built(
				"A stack of alerts is ruled, and each keeps its own word and its own leading edge.",
			),

			print: Built("Alerts print with their words and their edges."),

			reducedmotion: Built(
				"The entrance is removed; the state is printed, not animated.",
			),
		},
	},

	{
		name: "BREADCRUMB",

		file: "COMPONENT/UI/BREADCRUMB.TSX",

		note: "Where this page sits in the document.",

		cells: {
			disabled: NotApplicable(
				"A crumb is a place, not a control. A place that cannot be reached is a tombstone, which the missing state prints.",
			),

			empty: NotApplicable(
				"A trail of no crumbs is not a trail. A page with no parent prints its index instead.",
			),

			stale: NotApplicable(
				"A trail is structural: it is where the page is, not what it knows, so it has no as-of.",
			),

			longtext: Built(
				"`BreadcrumbCollapse` folds the middle into `⋯`, whose title names the places it folded.",
			),

			manyitems: Built("Nine places print as first, ellipsis, last two."),

			reducedmotion: NotApplicable("The trail does not move."),
		},
	},

	{
		name: "PAGINATION",

		file: "COMPONENT/UI/PAGINATION.TSX",

		note: "Which slice of a long set is printed.",

		cells: {
			stale: NotApplicable("A page number is not a fact that ages."),

			empty: Built(
				"`PAGE / 00 OF 00` and the strip states that there is no page, which is the empty set's honest figure.",
			),

			partial: Built(
				"`PAGE / 03 OF UNAVAILABLE` and the arrows still work: the next page is knowable even when the last one is not.",
			),

			oneitem: Built("`PAGE / 01 OF 01` with both arrows disabled."),

			manyitems: Built(
				"`PaginationRange` prints seven cells for two hundred pages, with an ellipsis at each open end.",
			),

			print: NotApplicable(
				"A pagination control prints links to pages that are not printed. The printed sheet prints all its rows.",
			),

			reducedmotion: NotApplicable(
				"A page change is a navigation, not an interval.",
			),
		},
	},

	{
		name: "SCROLLAREA",

		file: "COMPONENT/UI/SCROLLAREA.TSX",

		note: "A window onto content taller than its frame.",

		cells: {
			active: NotApplicable("A viewport is not chosen."),

			disabled: NotApplicable(
				"A viewport cannot be disabled. A frame that must not scroll is not a scroll area - it is a frame.",
			),

			empty: Built(
				"With nothing to scroll the thumb is not drawn, and the frame's register says the set is empty rather than showing a bar that can never move.",
			),

			manyitems: Built(
				"`ScrollAreaFrame` prints the count above the fold, where it cannot scroll away.",
			),

			focus: Built(
				"The viewport takes the inset ring, because the frame clips an outside ring in half.",
			),

			print: Built("The viewport opens and every row prints."),

			oneitem: NotApplicable(
				"One row does not scroll. A scroll area around one row is a box with a bar that can never move.",
			),

			reducedmotion: NotApplicable(
				"A scroll is the reader's own gesture; there is no interval to remove.",
			),
		},
	},

	{
		name: "RESIZABLE",

		file: "COMPONENT/UI/RESIZABLE.TSX",

		note: "Two panes and the seam a reader sets.",

		cells: {
			loading: NotApplicable(
				"Panes are frames; they do not wait. What waits is the content inside one, and that is the skeleton's cell.",
			),

			oneitem: NotApplicable(
				"One pane is not a seam. A single pane is a frame.",
			),

			disabled: Built(
				"A fixed seam keeps its rule and prints its ratio; it refuses the drag and says so with its cursor.",
			),

			manyitems: Built("Four panes, three seams, one ratio line."),

			print: Built("The seam prints as a hairline at its set ratio."),

			reducedmotion: Built(
				"The drag is the reader's hand; the seam's own transition is removed.",
			),
		},
	},

	{
		name: "CAROUSEL",

		file: "COMPONENT/UI/CAROUSEL.TSX",

		note: "One of a set, one at a time, by choice.",

		cells: {
			empty: Built(
				"`CarouselEmpty` prints `◎ SLIDE / 00` instead of a frame with two dead arrows.",
			),

			oneitem: Built(
				"One slide: both arrows disabled and `SLIDE / 01 OF 01`.",
			),

			manyitems: Built(
				"The dots are marks and the status prints the position, announced once.",
			),

			print: NotApplicable(
				"A carousel on paper hides every slide but one. The sheet prints the set as a matrix or a plate instead.",
			),

			reducedmotion: Built(
				"The library re-initialises with a zero duration, so the slides snap; the position still changes.",
			),
		},
	},

	{
		name: "CHART",

		file: "COMPONENT/UI/CHART.TSX",

		note: "A figure that argues with numbers.",

		cells: {
			disabled: NotApplicable(
				"A figure is not a control. There is nothing to disable; a series that cannot be read prints `UNAVAILABLE`.",
			),

			oneitem: NotApplicable(
				"One bar is a number, not a figure. The ledger prints it, at the register, without an axis.",
			),

			empty: Built(
				"`ChartEmpty` says what would be plotted and why it is not, instead of drawing a set of axes that claims a scale it does not have.",
			),

			loading: Built(
				"The axes print and the bars do not: the shape is known before the values are.",
			),

			partial: Built(
				"A gap in the series is a gap, never a zero - a zero is a measurement.",
			),

			stale: Built(
				"The frame prints the as-of and the values stay visible.",
			),

			reducedmotion: Built(
				"The bars are drawn at their final height; there is no draw-in to remove.",
			),
		},
	},

	{
		name: "CALENDAR",

		file: "COMPONENT/UI/CALENDAR.TSX",

		note: "A month, printed or picked.",

		cells: {
			empty: Built(
				"`◎ NO MARK` on the plate, and the days still print: an empty month is a fact about the period.",
			),

			partial: Built(
				"The month prints and the period's facts say `UNAVAILABLE`.",
			),

			longtext: NotApplicable(
				"A day cell holds a number and a mark. A long label belongs beside the month, not inside a day.",
			),

			oneitem: NotApplicable(
				"A calendar is a month. A set of one day is a date, and a date prints as a register line.",
			),

			print: Built("The plate prints with its register."),

			reducedmotion: NotApplicable(
				"A month does not move; a month change is a new plate.",
			),
		},
	},

	{
		name: "SONNER",

		file: "COMPONENT/UI/SONNER.TSX",

		note: "A receipt for an action that has already happened.",

		cells: {
			active: NotApplicable(
				"A receipt is not chosen; it is read or dismissed.",
			),

			disabled: NotApplicable(
				"A receipt cannot be disabled. The action it reports can be, and the receipt says so.",
			),

			empty: NotApplicable(
				"An empty receipt is a frame with no sentence. A receipt states an action or it is not printed.",
			),

			manyitems: Built(
				"Three receipts stack; each keeps its own edge and its own undo.",
			),

			stale: Built(
				"A receipt older than its action prints the age, and a route change dismisses it.",
			),

			wide: NotApplicable(
				"A receipt is a slip at the corner. Stretched across a band it would be an alert, and the alert is the component for that.",
			),

			print: NotApplicable(
				"A receipt is the four seconds after an action. Paper has no four seconds.",
			),
		},
	},
];

/* ─── THE CELL LOOKUP, AND THE COUNTS ────────────────────────────────────── */

/**
 * One cell of the matrix.
 *
 * A row lists only its exceptions, so a missing entry is `BUILT` - and that default
 * is what makes every `N/A` in this file a sentence someone had to write rather
 * than a blank someone left.
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

		value: "CONTENT/SPECIMEN/DISPLAY.TS",

		note: "every figure above is counted from the three tables in this file",
	},
];

/* ─── THE VERDICTS ───────────────────────────────────────────────────────── */

/** A verdict on a component the document does not mount yet. */
export interface Verdict {
	/** The component the verdict is about. */
	readonly component: string;

	/** `yes` - it should exist. `no` - it should not. */
	readonly keep: boolean;

	/** The question it answers, in the sheet's voice. */
	readonly question: string;

	/** The argument, and what would have to be true for it to change. */
	readonly answer: string;

	/** Where it is printed today, or `UNAVAILABLE` when nothing mounts it. */
	readonly mounted: string;
}

/**
 * The two components the document does not mount, and the verdict on each.
 *
 * The task's own instruction: "Chart and Calendar may be unused - if so, say whether
 * they should exist at all rather than deleting them." Deleting either would be a
 * deletion without instruction; keeping either without an argument would be a file
 * waiting for someone. So both are argued, and both are printed on the sheet.
 */
export const Verdicts: readonly Verdict[] = [
	{
		component: "CHART",

		keep: true,

		question:
			"Does the document make a claim that a length argues better than a ledger?",

		answer: "Yes, in one place and one only: the register counts and the four connection tiers are a comparison where the SHAPE is the claim. A ledger states `04`, `04`, `04`; a figure states that the four are equal at a glance, which is the sentence the page is making. So the chart stays - and it stays as a plate with a register, a caption and an as-of, because a figure without provenance is a picture. It is not mounted yet because no page has needed it since the matrices were built; the first page that does will find it finished rather than find a kit default.",

		mounted: "UNAVAILABLE",
	},

	{
		component: "CALENDAR",

		keep: true,

		question:
			"Is anything in the document a date the reader picks, or a period the reader reads?",

		answer: "Nothing is picked, and that is the argument against a date-picker. But three things are read: the release manifest's dates, the `as of` on every measurement, and the age of a stale record. A date's meaning is its neighbours - `14 NOV` is a fact, and a month with the 14th marked is that fact's context - so the month stays as a PLATE (`CalendarPlate`), not as an input. If the document ever asks a reader to choose a day, that is a new decision and it is not this one.",

		mounted: "UNAVAILABLE",
	},
];

/* ─── THE SPECIMENS ──────────────────────────────────────────────────────── */

/**
 * The four groups the sheet prints the live rows in.
 *
 * A family of nineteen components in one flat list of forty-four rows would read as
 * one long answer to none of four questions: what the document reads WITH, how it
 * discloses, how it measures, and what it says quietly.
 */
export type Group = "read" | "disclosure" | "measure" | "quiet";

/** What the stage mounts for a row. */
export type Kind =
	| "badge"
	| "badgegroup"
	| "card"
	| "table"
	| "tabs"
	| "accordion"
	| "collapsible"
	| "progress"
	| "skeleton"
	| "separator"
	| "avatar"
	| "avatargroup"
	| "alert"
	| "breadcrumb"
	| "pagination"
	| "scrollarea"
	| "resizable"
	| "carousel"
	| "chart"
	| "calendar"
	| "sonner";

/** The props a specimen's stage needs. Every one is optional; the kind decides. */
export interface DisplaySpec {
	/** The register line the component prints, when it prints one. */
	readonly register?: string;

	/** The title a card or a panel prints. */
	readonly title?: string;

	/** The one sentence under the specimen, when the state needs one. */
	readonly note?: string;

	/** How many rows, items or slides the specimen builds. */
	readonly rows?: number;

	/** The state the component is put into - its own `data-state`. */
	readonly variant?: string;

	/** The label a field, a register or a control prints. */
	readonly label?: string;

	/** The figure a progress bar or a pagination control reports. */
	readonly value?: number;

	/** The figure's denominator. */
	readonly max?: number;

	/** The columns of a table or a skeleton matrix. */
	readonly columns?: readonly string[];

	/** The stage's own width. */
	readonly width?: "narrow" | "wide" | "band";

	/** The table's row rhythm. */
	readonly dense?: boolean;

	/** Whether the table's head pins. */
	readonly sticky?: boolean;

	/** The label of the specimen's one action, when it has one. */
	readonly action?: string;
}

/** One labelled row on the sheet: the state, the part, and when it is right. */
export interface Specimen extends DisplaySpec {
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
 * Ordered as the matrix's groups: what the document reads with, then how it
 * discloses, then how it measures, then what it says quietly. Every one of the
 * nineteen components appears at least once, and the rows that carry a context are
 * the same component in two different boxes - which is the claim this family has to
 * prove.
 */
export const Specimens: readonly Specimen[] = [
	/* ─── READ ─────────────────────────────────────────────────────────── */

	{
		mark: "01",

		group: "read",

		state: "REST",

		component: "Table",

		when: "A set read across: the head names the columns, the rows are ruled above, and the caption carries the figure.",

		kind: "table",

		register: "TIERS",

		rows: 4,

		columns: ["TIER", "PROTOCOL", "FEATURES"],
	},

	{
		mark: "02",

		group: "read",

		state: "DENSE",

		component: "Table",

		when: "A long comparison scanned rather than read: half the row rhythm, the same type, the same rules.",

		kind: "table",

		register: "RELEASES",

		rows: 7,

		dense: true,

		columns: ["RELEASE", "DATE", "CHANNEL", "STATUS"],
	},

	{
		mark: "03",

		group: "read",

		state: "STICKY HEAD",

		component: "Table",

		when: "More rows than the frame holds: the head stays at the top and the first column stays at the edge.",

		kind: "table",

		register: "ROUTES",

		rows: 14,

		sticky: true,

		columns: ["ROUTE", "LAYER", "STATUS"],
	},

	{
		mark: "04",

		group: "read",

		state: "EMPTY",

		component: "Table",

		when: "No rows yet: the head is the schema and it stays; the row says what would be here, why it is not, and where to read it.",

		kind: "table",

		register: "TIERS",

		rows: 0,

		columns: ["TIER", "PROTOCOL", "FEATURES"],
	},

	{
		mark: "05",

		group: "read",

		state: "ONE ROW",

		component: "Table",

		when: "A set of one: the head and the register are what make the state legible, because a bare row cannot say it is a set.",

		kind: "table",

		register: "TIERS",

		rows: 1,

		columns: ["TIER", "PROTOCOL", "FEATURES"],
	},

	{
		mark: "06",

		group: "read",

		state: "PARTIAL",

		component: "Table",

		when: "Some facts unknown: an honest UNAVAILABLE in the cell, never a zero and never a blank.",

		kind: "table",

		register: "TIERS",

		rows: 3,

		variant: "partial",

		columns: ["TIER", "PROTOCOL", "FEATURES"],
	},

	{
		mark: "07",

		group: "read",

		state: "NARROW",

		component: "Table",

		when: "A five-column table in a 360px band: the frame scrolls sideways and the row's name stays attached to its cells.",

		kind: "table",

		register: "ROUTES",

		rows: 4,

		width: "narrow",

		columns: ["ROUTE", "LAYER", "STATUS"],
	},

	{
		mark: "08",

		group: "read",

		state: "REST",

		component: "Card",

		when: "One artifact on one white insert: the register names the record, the title says what it is about, the foot states the status.",

		kind: "card",

		register: "RELEASE_01",

		title: "WHAT IT CARRIES",

		note: "A header with a register and a title, a body with its sentence, and a foot that prints the state.",
	},

	{
		mark: "09",

		group: "read",

		state: "EMPTY",

		component: "Card",

		when: "The body arrived and holds nothing: the insert keeps its frame and states the absence at its foot.",

		kind: "card",

		register: "RELEASE_01",

		title: "WHAT IT CARRIES",

		variant: "empty",

		note: "No row is filed against this release yet.",
	},

	{
		mark: "10",

		group: "read",

		state: "STALE",

		component: "Card",

		when: "The values are older than their as-of: the card says the age and keeps the last known value visible.",

		kind: "card",

		register: "RELEASE_01",

		title: "WHAT IT CARRIES",

		variant: "stale",

		note: "The figures are as of 14 NOV 2026 - 318 days old.",
	},

	{
		mark: "11",

		group: "read",

		state: "TONES",

		component: "Badge",

		when: "A claim carries its own ink: gRPC is green because it is gRPC, Tauri is amber because it is Tauri.",

		kind: "badgegroup",

		rows: 6,
	},

	{
		mark: "12",

		group: "read",

		state: "MANY ITEMS",

		component: "Badge",

		when: "A set of nine claims in a narrow column: four print and the fifth cell is the count of the rest.",

		kind: "badgegroup",

		rows: 9,

		width: "narrow",
	},

	/* ─── DISCLOSURE ───────────────────────────────────────────────────── */

	{
		mark: "13",

		group: "disclosure",

		state: "REST",

		component: "Tabs",

		when: "Three sibling views of one subject: the chosen tab is the pulled-out sheet on the track.",

		kind: "tabs",

		rows: 3,
	},

	{
		mark: "14",

		group: "disclosure",

		state: "NO TABS FIT",

		component: "Tabs",

		when: "The labels are wider than the band: the strip scrolls and the readout counts what is past its edge.",

		kind: "tabs",

		rows: 9,

		width: "narrow",
	},

	{
		mark: "15",

		group: "disclosure",

		state: "EMPTY",

		component: "Tabs",

		when: "No view is filed: the strip prints `◎ NO VIEW` rather than a track with nothing on it.",

		kind: "tabs",

		rows: 0,
	},

	{
		mark: "16",

		group: "disclosure",

		state: "REST",

		component: "Accordion",

		when: "A stack of three sections, one open: the open trigger is a head - 500 weight, ink, and the rule under it.",

		kind: "accordion",

		rows: 3,
	},

	{
		mark: "17",

		group: "disclosure",

		state: "EMPTY",

		component: "Accordion",

		when: "A stack with no sections: `◎ NO SECTION`, because a ruled void is not a disclosure.",

		kind: "accordion",

		rows: 0,
	},

	{
		mark: "18",

		group: "disclosure",

		state: "REST",

		component: "Collapsible",

		when: "One region, closed: the trigger prints `→`, which is the grammar's mark for more behind it.",

		kind: "collapsible",

		rows: 1,
	},

	{
		mark: "19",

		group: "disclosure",

		state: "OPEN",

		component: "Collapsible",

		when: "One region, open: the mark turns to `↳` and the label goes to 500, so the line reads as a head.",

		kind: "collapsible",

		rows: 1,

		variant: "open",
	},

	{
		mark: "20",

		group: "disclosure",

		state: "REDUCED MOTION",

		component: "Accordion",

		when: "The reader asked for less: the panel is simply there, with no height interval - the state survives and the time does not.",

		kind: "accordion",

		rows: 2,

		variant: "reduce",
	},

	/* ─── MEASURE ──────────────────────────────────────────────────────── */

	{
		mark: "21",

		group: "measure",

		state: "RUNNING",

		component: "Progress",

		when: "A job whose length is known: the bar is the picture and the register line is the figure.",

		kind: "progress",

		label: "PREPARING",

		value: 7,

		max: 12,
	},

	{
		mark: "22",

		group: "measure",

		state: "INDETERMINATE",

		component: "Progress",

		when: "The length is not known: a stripe at a third of the track, and `UNAVAILABLE` for the total rather than a guess.",

		kind: "progress",

		label: "LOADING",

		value: 0,

		max: 0,

		variant: "loading",
	},

	{
		mark: "23",

		group: "measure",

		state: "FAILED",

		component: "Progress",

		when: "The job refused: the destructive ink, and the bar stops where it stopped so the work done is still visible.",

		kind: "progress",

		label: "INTERRUPTED",

		value: 4,

		max: 12,

		variant: "failed",
	},

	{
		mark: "24",

		group: "measure",

		state: "COMPLETE",

		component: "Progress",

		when: "The one thing in this family that authenticates: completion takes the accent, and nothing else does.",

		kind: "progress",

		label: "VERIFIED",

		value: 12,

		max: 12,

		variant: "complete",
	},

	{
		mark: "25",

		group: "measure",

		state: "RECORD",

		component: "Skeleton",

		when: "A record that has not arrived: the register line, the keys it will print, their values barred, and what is waited on.",

		kind: "skeleton",

		register: "# LOADING / 04",

		rows: 4,

		variant: "record",
	},

	{
		mark: "26",

		group: "measure",

		state: "MATRIX",

		component: "Skeleton",

		when: "A table that has not arrived: the head prints because the schema is already true, and the cells are bars.",

		kind: "skeleton",

		register: "# LOADING / 03",

		rows: 3,

		variant: "matrix",

		columns: ["TIER", "PROTOCOL", "FEATURES"],
	},

	{
		mark: "27",

		group: "measure",

		state: "FIGURE",

		component: "Chart",

		when: "A claim where the shape is the sentence: four tiers, four equal lengths, at a glance.",

		kind: "chart",

		register: "TIERS",

		rows: 4,
	},

	{
		mark: "28",

		group: "measure",

		state: "EMPTY",

		component: "Chart",

		when: "No series: the figure says what would be plotted and why it is not, instead of drawing axes that claim a scale.",

		kind: "chart",

		register: "TIERS",

		rows: 0,
	},

	{
		mark: "29",

		group: "measure",

		state: "PLATE",

		component: "Calendar",

		when: "A month read rather than picked: a date's meaning is its neighbours, and the plate prints them.",

		kind: "calendar",

		register: "RELEASES",

		rows: 1,
	},

	{
		mark: "30",

		group: "measure",

		state: "EMPTY",

		component: "Calendar",

		when: "A month with no mark: the days still print and the plate says the period is empty, which is a fact about the month.",

		kind: "calendar",

		register: "RELEASES",

		rows: 1,

		variant: "empty",
	},

	/* ─── QUIET ────────────────────────────────────────────────────────── */

	{
		mark: "31",

		group: "quiet",

		state: "LABELLED",

		component: "Separator",

		when: "A rule that names what it separates: the register printed in the seam, at the meta register.",

		kind: "separator",

		label: "WHAT CHANGES",

		value: 4,
	},

	{
		mark: "32",

		group: "quiet",

		state: "SET",

		component: "Avatar",

		when: "A set of identities: four marks overlap by a quarter and the fifth cell is the count of the rest.",

		kind: "avatargroup",

		rows: 7,
	},

	{
		mark: "33",

		group: "quiet",

		state: "UNKNOWN",

		component: "Avatar",

		when: "An identity that is not known: `◎`, which says which fallback it is, instead of a blank square.",

		kind: "avatar",

		variant: "unknown",
	},

	{
		mark: "34",

		group: "quiet",

		state: "ERROR",

		component: "Alert",

		when: "A failed action: the state word, the cause, the next step and the retry - and a rule at the edge, not a red box.",

		kind: "alert",

		label: "STATUS: UNAVAILABLE",

		variant: "error",

		note: "The verification could not reach the release record. Nothing was changed.",

		action: "RETRY",
	},

	{
		mark: "35",

		group: "quiet",

		state: "STALE",

		component: "Alert",

		when: "A figure older than its as-of: the alert keeps the value visible and states the age.",

		kind: "alert",

		label: "STATUS: ARCHIVED",

		variant: "stale",

		note: "The last known figure is as of 14 NOV 2026 - 318 days old.",
	},

	{
		mark: "36",

		group: "quiet",

		state: "REST",

		component: "Breadcrumb",

		when: "Where the page sits: `/` before every place, `→` between them, and the current place marked at its foot.",

		kind: "breadcrumb",

		rows: 4,
	},

	{
		mark: "37",

		group: "quiet",

		state: "COLLAPSED",

		component: "Breadcrumb",

		when: "A trail of nine places in a narrow band: first, `⋯`, last two - and the ellipsis names what it folded.",

		kind: "breadcrumb",

		rows: 9,

		width: "narrow",
	},

	{
		mark: "38",

		group: "quiet",

		state: "MANY PAGES",

		component: "Pagination",

		when: "Two hundred pages: the register prints the position and the range prints seven cells with an ellipsis at each open end.",

		kind: "pagination",

		rows: 200,

		value: 3,
	},

	{
		mark: "39",

		group: "quiet",

		state: "ONE PAGE",

		component: "Pagination",

		when: "A set of one page: the control stays and states `01 OF 01`, with both arrows disabled.",

		kind: "pagination",

		rows: 1,

		value: 1,
	},

	{
		mark: "40",

		group: "quiet",

		state: "FRAME",

		component: "ScrollArea",

		when: "Content taller than its frame: the register prints the count above the fold, where it cannot scroll away.",

		kind: "scrollarea",

		register: "LEDGER",

		rows: 24,
	},

	{
		mark: "41",

		group: "quiet",

		state: "SEAM",

		component: "Resizable",

		when: "Two panes and a seam a reader sets: the register prints the ratio the seam is holding.",

		kind: "resizable",

		register: "PANES",

		rows: 2,
	},

	{
		mark: "42",

		group: "quiet",

		state: "STATUS",

		component: "Carousel",

		when: "One of a set, one at a time: the position is printed and announced once, and the dots are marks.",

		kind: "carousel",

		register: "PLATES",

		rows: 4,
	},

	{
		mark: "43",

		group: "quiet",

		state: "RECEIPT",

		component: "Sonner",

		when: "The four seconds after an action: the state word, the sentence, and the undo - printed inline, and fired for real.",

		kind: "sonner",

		label: "VERIFIED",

		note: "The release record was written.",

		action: "UNDO",
	},

	{
		mark: "44",

		group: "quiet",

		state: "FAILED",

		component: "Sonner",

		when: "A receipt for a refused action: the destructive ink on its leading edge, and no undo, because there is nothing to take back.",

		kind: "sonner",

		label: "UNAVAILABLE",

		variant: "error",

		note: "The copy control could not reach the clipboard.",
	},
];

/** The rows of one group, in the sheet's order. */
export const InGroup = (Group: Group): readonly Specimen[] =>
	Specimens.filter((Specimen) => Specimen.group === Group);

/** The four groups, in the order they are read. */
export const Groups: readonly { key: Group; label: string; note: string }[] = [
	{
		key: "read",

		label: "/WHAT THE DOCUMENT READS WITH",

		note: "The instruments the page carries its facts in: a table read across, a card that is one artifact, and the marks that name a claim. Every row here is a state of the same three parts, because the reading instruments are the ones whose adverse states nobody notices are missing.",
	},

	{
		key: "disclosure",

		label: "/HOW IT DISCLOSES",

		note: "Four parts, two grammars: a strip of sibling views and a stack of closed sections. The states are the ones that only appear when the labels are too long, the set is empty, or the reader asked for less motion - and all three are printed here rather than assumed.",
	},

	{
		key: "measure",

		label: "/HOW IT MEASURES",

		note: "A job's progress, a record that has not arrived, a figure that argues, and a month. The two components the document does not mount are here, with the verdict on whether they should exist at all - printed rather than filed away.",
	},

	{
		key: "quiet",

		label: "/WHAT IT SAYS QUIETLY",

		note: "The parts that carry a page without being read: the rule that names its seam, the seal that stands for a person, the alert that states a failure, the trail, the page control, the frame, the seam, the position, and the receipt. A family is judged by these, because they are the ones a reader never notices working.",
	},
];

/** How many live rows the sheet prints. */
export const SpecimenCount = Specimens.length;
