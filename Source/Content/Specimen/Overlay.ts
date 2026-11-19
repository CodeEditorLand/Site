/**
 * Overlay - the overlay family's state matrix, and the specimens that print it.
 *
 * ─── WHY THIS FAMILY NEEDS A MATRIX MORE THAN ANY OTHER ───────────────────
 *
 * A field's states are visible in the field. An overlay's states are not: a
 * menu at rest is a button, a dialog at rest is a button, and the whole
 * behaviour - what happens on Escape, what happens when the rows have not
 * arrived, what happens when the trigger is removed while the slip is open -
 * exists only in the two seconds after a click. The tree carried ten components
 * and had never seen most of those two seconds: no empty menu, no loading body,
 * no error body, no submenu three deep, no dialog taller than the viewport, no
 * popover near the right edge.
 *
 * So the matrix is the argument. Ten rows, twenty columns, and every cell that
 * cannot exist carries its reason in full as a footnote rather than a truncated
 * one in the cell.
 *
 * ─── THE TWO DISPOSITIONS ARE THE SHEET'S, NOT THE VOCABULARY'S ───────────
 * `BUILT` and `N/A` are not members of §1.5's eight status words and must not
 * be: a status is what a surface is doing, and this is what the sheet did with
 * a cell. The same two words the input family's matrix uses, so the two matrices
 * on this page can be read one after the other.
 *
 * ─── NOTHING HERE IS A FIGURE ─────────────────────────────────────────────
 * Every count on the band - the cells, the built ones, the reasons, the
 * register's rows - is derived from the two tables below. A column added here
 * changes the figures without a second edit.
 *
 * ─── THE SPECIMENS ARE DATA, THE STAGE IS THE COMPONENT'S ──────────────────
 * A row states what it is (`state`), which part of the family it exercises
 * (`component`), when that state is right (`when`), and which arm of the
 * renderer mounts it (`kind`). The renderer mounts the overlay; it decides
 * nothing. That split is why the matrix and the live rows cannot drift.
 */

/* ─── THE COLUMNS ────────────────────────────────────────────────────────── */

/** A column of the matrix: the state or combination, and what its cell asks. */
export interface Column {
	/** The cell's key in a row's override map. */
	readonly key: string;

	/** The column head, in the sheet's register: `LOADING`, `SUBMENU ×3`. */
	readonly label: string;

	/** One line under the head: what the cell is asking. */
	readonly ask: string;

	/**
	 * The group the column belongs to. The matrix prints a rule between groups,
	 * because a state (`LOADING`) and a context (`INSIDE A CARD`) are two
	 * different questions and a reader scanning the head should see where one
	 * set ends.
	 */
	readonly group: "state" | "shape" | "context";
}

/**
 * The twenty columns, in reading order: what the overlay is doing, what it is
 * asked to hold, then where it is put. States first because they are the two
 * seconds a reader meets; contexts last because they are the ones a designer
 * forgets.
 */
export const Columns: readonly Column[] = [
	{
		key: "rest",

		label: "REST",

		ask: "closed, trigger readable",

		group: "state",
	},

	{
		key: "hover",

		label: "HOVER",

		ask: "the pointer is on the door",

		group: "state",
	},

	{
		key: "focus",

		label: "FOCUS",

		ask: "the keyboard is on the door",

		group: "state",
	},

	{
		key: "disabled",

		label: "DISABLED",

		ask: "the door cannot open",

		group: "state",
	},

	{
		key: "current",

		label: "CURRENT",

		ask: "a row is the value in force",

		group: "state",
	},

	{
		key: "loading",

		label: "LOADING",

		ask: "the rows have not arrived",

		group: "state",
	},

	{
		key: "empty",

		label: "EMPTY",

		ask: "there is nothing to hold",

		group: "state",
	},

	{
		key: "error",

		label: "ERROR",

		ask: "the action was cut off",

		group: "state",
	},

	{
		key: "partial",

		label: "PARTIAL",

		ask: "some rows, some unknown",

		group: "state",
	},

	{ key: "one", label: "ONE ITEM", ask: "a single row", group: "shape" },

	{
		key: "many",

		label: "MANY ITEMS",

		ask: "two hundred, not six",

		group: "shape",
	},

	{
		key: "long",

		label: "LONG TEXT",

		ask: "a label that will not fit",

		group: "shape",
	},

	{ key: "dense", label: "DENSE", ask: "the tight rhythm", group: "shape" },

	{
		key: "submenu",

		label: "SUBMENU ×3",

		ask: "three levels of relation",

		group: "shape",
	},

	{
		key: "tall",

		label: "TALLER THAN THE VIEWPORT",

		ask: "the panel outgrows the screen",

		group: "shape",
	},

	{
		key: "edge",

		label: "NEAR THE RIGHT EDGE",

		ask: "no room to open sideways",

		group: "context",
	},

	{
		key: "card",

		label: "INSIDE A CARD",

		ask: "anchored in a white insert",

		group: "context",
	},

	{
		key: "narrow",

		label: "NARROW COLUMN",

		ask: "a 16rem column",

		group: "context",
	},

	{
		key: "wide",

		label: "WIDE BAND",

		ask: "the band's own width",

		group: "context",
	},

	{
		key: "orphan",

		label: "TRIGGER REMOVED",

		ask: "the door leaves while open",

		group: "context",
	},
];

/* ─── THE REASONS ────────────────────────────────────────────────────────── */

/**
 * The reasons, written once each and reused where the same fact holds.
 *
 * A reason repeated verbatim in two rows is one fact about the family, not two;
 * writing it once is how a reader sees that `DRAWER / CURRENT` and
 * `SHEET / CURRENT` are the same absence for the same cause.
 */
const Reason = {
	noRow: "a modal panel has no persistent row to mark. `current` is the item grammar's state - the value in force in a set the reader is choosing from - and a dialog, a sheet, a drawer or a popover holds no set it chooses from.",

	noDensity:
		"a panel takes its density from the block inside it - `RecordLedger`, the `.Slip__Row` grammar, a `RecordWell`. A second density switch on the panel would be a second source of truth for one rhythm, and the first thing it would do is disagree with the block.",

	noSubmenu:
		"a panel holds content, not menu rows. A submenu three deep is a menu's problem - the slip's own `Trail` head states the path - and a panel that grew one would be a menu in a box.",

	noEdge: "a modal is centred by definition. It has no anchor to collide with, so there is no edge for it to be near.",

	noCard: "a modal portals to the body. It cannot sit inside a card - and a panel painted inside a card would be a card inside a card, which is the one composition the identity refuses.",

	noLoad: "a menu is composed with the region or the trigger that opens it: its rows exist before the gesture does. A menu whose rows had to arrive would be a menu opened before its subject existed, and the family's loading arm belongs to the slips that fetch - the palette, a dialog, a popover.",

	noError:
		"an action's failure belongs to the surface it acted on, not to the menu that closed on selection. The menu is gone before the request is sent, so an error body inside it would be a body nobody sees.",

	noPartial:
		"a menu is either composed or it is not. A row whose value has not arrived prints `◎ UNAVAILABLE` in its own meta cell - the honest per-row answer - rather than the whole slip declaring itself partial.",

	noCap: "a tooltip is a label the trigger already carries. There is nothing to arrive and nothing to fail: the announcement exists before the hover does.",

	noTipEmpty:
		"a tooltip with no label is not rendered at all - `IconTooltip` returns null, because an unlabelled icon is a decoration rather than a control. An empty arm here would be an arm for a state the component refuses to enter.",

	noTipWide:
		"a tooltip is a gloss on one control. At the band's width it would stop being a gloss; the detail arm caps at 22rem for exactly that reason.",

	noHoverLoad:
		"a hover card's content is the caller's children, rendered with the trigger. There is no register to arrive, so there is no loading arm - and inventing one would make a gloss wait.",

	noHoverError:
		"a hover card states what a thing is, not what an action did. It runs nothing, so it has nothing to fail at.",

	noHoverWide:
		"a hover card is a gloss. At the band's width it would be a popover that never admitted it, and the reader would lose the pointer path back to the trigger.",

	noHoverOrphan:
		"a hover card is dismissed by the pointer leaving the trigger. A trigger removed while the card is open has already been un-hovered, so the pointer's own exit is the rule - a second guard would close a card that is already closing.",

	noCmdError:
		"the palette's index is static and cannot fail. Its adverse state is `◎ NO RECORD` and the rail's handoff row, not an error body - and the `SlipError` arm belongs to the panels that run an action.",

	noCmdSubmenu:
		"a command list is flat by design: cmdk's model is one listbox with one selection, and the foot states `↑↓ MOVE` over that one list. A nested listbox inside it would break the arrow keys the foot promises.",

	noCmdEdge:
		"the palette is centred in the viewport at `12vh`. It has no anchor, so it has no edge to collide with.",
};

/* ─── THE ROWS ───────────────────────────────────────────────────────────── */

/** One component of the family, and every cell that cannot exist. */
export interface OverlayRow {
	/** The component's name, as the matrix prints it. */
	readonly name: string;

	/** The file that draws it. */
	readonly part: string;

	/** One line saying what it is, under the name. */
	readonly note: string;

	/**
	 * The cells that cannot exist, keyed by column. A missing key is `BUILT` -
	 * which is the honest default for this family, because the ten components
	 * were put on one surface before this matrix was written, so most cells
	 * really are built. Every string here is a reason, printed in full in the
	 * notes.
	 */
	readonly cells: Readonly<Record<string, string>>;
}

/**
 * The ten components, in the family's order: the four panels, the two cards,
 * the cap, then the four list surfaces. Panels first because they are the
 * largest object and the one a reader meets with a click rather than a hover.
 */
export const Rows: readonly OverlayRow[] = [
	{
		name: "DIALOG",

		part: "UI/Dialog.tsx",

		note: "the slip at modal scale: a head, a scrolling body, a foot",

		cells: {
			current: Reason.noRow,

			dense: Reason.noDensity,

			submenu: Reason.noSubmenu,

			edge: Reason.noEdge,

			card: Reason.noCard,
		},
	},

	{
		name: "DRAWER",

		part: "UI/Drawer.tsx",

		note: "the slip that can be thrown away, on vaul's drag",

		cells: {
			current: Reason.noRow,

			dense: Reason.noDensity,

			submenu: Reason.noSubmenu,

			edge: "a drawer is anchored to an edge, so *near the edge* is its resting position rather than a collision it has to survive.",

			card: Reason.noCard,
		},
	},

	{
		name: "SHEET",

		part: "UI/Sheet.tsx",

		note: "the slip that arrives from an edge, on four sides",

		cells: {
			current: Reason.noRow,

			dense: Reason.noDensity,

			submenu: Reason.noSubmenu,

			edge: "a sheet is anchored to an edge, so *near the edge* is its resting position rather than a collision it has to survive.",

			card: Reason.noCard,
		},
	},

	{
		name: "POPOVER",

		part: "UI/Popover.tsx",

		note: "a slip that holds content instead of rows",

		cells: {
			current: Reason.noRow,

			dense: Reason.noDensity,

			submenu: Reason.noSubmenu,

			tall: "a popover caps at 24rem and scrolls inside that cap. It is anchored to a trigger that is on screen, so it can never be taller than the viewport - the cap is what makes the question unaskable.",

			wide: "a popover is a gloss on one control. At the band's width it would be a sheet, and the arrival from a 2px side offset would be a lie about where it came from.",
		},
	},

	{
		name: "HOVERCARD",

		part: "UI/HoverCard.tsx",

		note: "a slip that arrives on a pause",

		cells: {
			disabled:
				"a hover card has no disabled state. Its trigger is a reference - a name, a glyph, a term - and a reference that cannot be hovered is text, not a control.",

			current: Reason.noRow,

			loading: Reason.noHoverLoad,

			empty: "a hover card's content is the caller's children. There is no register to be empty: a card with nothing in it is a caller bug, and the component does not invent an arm for it.",

			error: Reason.noHoverError,

			partial: Reason.noHoverLoad,

			dense: Reason.noDensity,

			submenu: Reason.noSubmenu,

			wide: Reason.noHoverWide,

			orphan: Reason.noHoverOrphan,
		},
	},

	{
		name: "ICONTOOLTIP",

		part: "UI/IconTooltip.tsx",

		note: "a cap for a mark, a slip for a document",

		cells: {
			disabled:
				"a tooltip's trigger is not a control, so it cannot be disabled. Its glyph can be *unavailable*, and that is a different statement - the `◎` the cap prints before the label.",

			current: Reason.noRow,

			loading: Reason.noCap,

			empty: Reason.noTipEmpty,

			error: Reason.noCap,

			partial: Reason.noCap,

			dense: Reason.noDensity,

			submenu: Reason.noSubmenu,

			wide: Reason.noTipWide,

			orphan: Reason.noHoverOrphan,
		},
	},

	{
		name: "CONTEXTMENU",

		part: "UI/ContextMenu.tsx",

		note: "the menu a right-click opens, and the same slip a left-click opens",

		cells: {
			loading: Reason.noLoad,

			error: Reason.noError,

			partial: Reason.noPartial,

			wide: "a context menu is sized by its longest row, at the pointer. At the band's width it would be a panel anchored to a click.",
		},
	},

	{
		name: "DROPDOWNMENU",

		part: "UI/DropdownMenu.tsx",

		note: "the menu primitive, wearing the slip",

		cells: {
			loading: Reason.noLoad,

			error: Reason.noError,

			partial: Reason.noPartial,

			wide: "a dropdown is sized by its longest row, under its trigger. At the band's width it would be a panel rather than a menu.",
		},
	},

	{
		name: "MENUBAR",

		part: "UI/Menubar.tsx",

		note: "the application's own bar, and the slips it opens",

		cells: {
			loading: Reason.noLoad,

			error: Reason.noError,

			partial: Reason.noPartial,
		},
	},

	{
		name: "COMMAND",

		part: "UI/Command.tsx",

		note: "cmdk's engine in the slip's clothes - the palette's body",

		cells: {
			error: Reason.noCmdError,

			partial: Reason.noCmdError,

			submenu: Reason.noCmdSubmenu,

			edge: Reason.noCmdEdge,

			card: Reason.noCard,
		},
	},
];

/* ─── THE CELL ───────────────────────────────────────────────────────────── */

/** One cell of the matrix: what the sheet did with it, and why. */
export interface Cell {
	readonly disposition: "built" | "na";

	/** The reason, in full, for a cell that cannot exist. */
	readonly reason?: string;
}

/**
 * The cell for one row and one column.
 *
 * A row states only its absences; everything else is `BUILT`. That is the
 * default because this matrix was written *after* the family was put on one
 * surface - so the absences are the interesting cells and the built ones are
 * the family.
 */
export const MatrixCell = (Row: OverlayRow, ColumnValue: Column): Cell => {
	const ReasonText = Row.cells[ColumnValue.key];

	return ReasonText === undefined
		? { disposition: "built" }
		: { disposition: "na", reason: ReasonText };
};

/** How many of one row's cells are built. */
export const BuiltOf = (Row: OverlayRow): number =>
	Columns.filter(
		(ColumnValue) => MatrixCell(Row, ColumnValue).disposition === "built",
	).length;

/** The matrix's own figures, derived from the two tables. */
export const CellCount = Rows.length * Columns.length;

/** How many cells are built. */
export const BuiltCount = Rows.reduce((Total, Row) => Total + BuiltOf(Row), 0);

/** How many cells are reasons. */
export const ReasonCount = CellCount - BuiltCount;

/** The register the matrix prints under itself. */
export const MatrixRegister = (): readonly {
	readonly key: string;

	readonly value: string;

	readonly note?: string;
}[] => [
	{ key: "COMPONENTS:", value: String(Rows.length) },

	{ key: "CONDITIONS:", value: String(Columns.length) },

	{ key: "CELLS:", value: String(CellCount) },

	{ key: "BUILT:", value: String(BuiltCount) },

	{ key: "REASONS:", value: String(ReasonCount) },

	{
		key: "SOURCE:",

		value: "CONTENT/SPECIMEN/OVERLAY.TS",

		note: "every figure above is counted from the two tables in this file",
	},
];

/* ─── THE LIVE ROWS ──────────────────────────────────────────────────────── */

/**
 * The arm the renderer mounts. One per row, and every one of them is a real
 * primitive - the sheet's own doctrine is that a part with states is shown with
 * its states, because a screenshot of a component cannot be composed with.
 */
export type OverlayKind =
	| "dialog"
	| "dialog-loading"
	| "dialog-error"
	| "dialog-empty"
	| "dialog-partial"
	| "dialog-tall"
	| "dialog-narrow"
	| "dialog-full"
	| "sheet"
	| "drawer"
	| "popover"
	| "popover-loading"
	| "popover-error"
	| "popover-edge"
	| "popover-card"
	| "hover"
	| "hover-long"
	| "tip"
	| "tip-lines"
	| "tip-detail"
	| "tip-unavailable"
	| "context"
	| "context-empty"
	| "menu"
	| "menu-sub"
	| "menu-empty"
	| "menu-many"
	| "menu-dense"
	| "menu-orphan"
	| "menubar"
	| "menubar-sub"
	| "command"
	| "command-loading"
	| "command-empty";

/** One labelled row of the specimen: the state, the part, when it is right. */
export interface Specimen {
	/** `01` - the row's own index, printed as `# 01`. */
	readonly mark: string;

	/** The state's name, in the sheet's register: `TRIGGER REMOVED`. */
	readonly state: string;

	/** The component under test. */
	readonly component: string;

	/** When this state is right - one line, in the document's voice. */
	readonly when: string;

	/** The arm the renderer mounts. */
	readonly kind: OverlayKind;

	/** The label on the door, when the row needs a specific one. */
	readonly door?: string;
}

/** The groups the live rows are printed in, in reading order. */
export const Groups: readonly { key: string; label: string; note: string }[] = [
	{
		key: "panel",

		label: "/THE PANELS",

		note: "The four surfaces that take the reader's whole attention: a dialog, a drawer, a sheet, a popover. Each one is a slip with a head, a body and a foot - and each one is printed here in the four states it was never printed in: loading, empty, failed, and outgrown.",
	},

	{
		key: "card",

		label: "/THE CARDS AND THE CAP",

		note: "The three small surfaces: a hover card, a tooltip's cap and a tooltip's detail arm. The rule they print is the family's size rule - a cap for a mark, a slip for a document - and the two arms are shown side by side so the difference is a size, not a mood.",
	},

	{
		key: "menu",

		label: "/THE MENUS",

		note: "The four list surfaces: a context menu, a dropdown, a menubar and the command palette. They are one instrument: the same register line, the same `[mark] [label] [meta]` row, the same five states, the same foot. A submenu states its depth as a path, and a menu with no rows says so rather than opening blank.",
	},
];

/**
 * The live rows.
 *
 * Ordered so that the family is read the way it is met: the panels first (each
 * in its ordinary state, then its adverse ones), then the small surfaces, then
 * the lists - which end on the palette, because the palette is the same
 * instrument as the menu above it and the sheet's argument is that a reader
 * should be able to see it.
 *
 * The marks are the row's index in reading order, not in the order the array
 * happens to be written, so a row added to the middle of a group is renumbered
 * rather than appended as a gap.
 */
export const Specimens: readonly Specimen[] = [
	{
		mark: "01",

		state: "READY",

		component: "DIALOG",

		when: "Right when the reader must decide before the page continues - a record with a head, a body and one action.",

		kind: "dialog",

		door: "OPEN: A RECORD",
	},

	{
		mark: "02",

		state: "LOADING",

		component: "DIALOG",

		when: "Right when the panel is open and its rows have not arrived: the head counts LOADING and the skeleton holds the row pitch.",

		kind: "dialog-loading",

		door: "OPEN: STILL READING",
	},

	{
		mark: "03",

		state: "ERROR",

		component: "DIALOG",

		when: "Right when the action the panel opened for was cut off - STATUS, cause, next step and the retry, in that order.",

		kind: "dialog-error",

		door: "OPEN: A REFUSAL",
	},

	{
		mark: "04",

		state: "EMPTY",

		component: "DIALOG",

		when: "Right when the set the panel opened on holds nothing: what would be here, why it is not, and the way out.",

		kind: "dialog-empty",

		door: "OPEN: NOTHING FILED",
	},

	{
		mark: "05",

		state: "PARTIAL",

		component: "DIALOG",

		when: "Right when some of the record has been read and some cannot be: the unknown rows say UNAVAILABLE in their own cell, never a zero and never a blank.",

		kind: "dialog-partial",

		door: "OPEN: HALF THE ROWS",
	},

	{
		mark: "06",

		state: "TALLER THAN THE VIEWPORT",

		component: "DIALOG",

		when: "Right when the record is sixty rows: the head and the foot pin and the body is the only thing that scrolls.",

		kind: "dialog-tall",

		door: "OPEN: SIXTY ROWS",
	},

	{
		mark: "07",

		state: "NARROW COLUMN",

		component: "DIALOG",

		when: "Right for a confirmation - one sentence and one action, at 24rem, which is the width a decision needs.",

		kind: "dialog-narrow",

		door: "OPEN: 24REM",
	},

	{
		mark: "08",

		state: "WIDE BAND",

		component: "DIALOG",

		when: "Right when the panel holds a matrix or a table: `full` is bounded by the viewport, never by a rem.",

		kind: "dialog-full",

		door: "OPEN: THE SHEET",
	},

	{
		mark: "09",

		state: "AN EDGE",

		component: "SHEET",

		when: "Right when the reader must keep the page in view while reading the panel - the sheet arrives from the edge and leaves by it.",

		kind: "sheet",

		door: "OPEN: FROM THE RIGHT",
	},

	{
		mark: "10",

		state: "THROWN AWAY",

		component: "DRAWER",

		when: "Right on a narrow viewport, where the panel is dismissed by a gesture: the grip is drawn, Escape is the stated door.",

		kind: "drawer",

		door: "OPEN: FROM BELOW",
	},

	{
		mark: "11",

		state: "READY",

		component: "POPOVER",

		when: "Right when a control needs a figure or a sentence beside it without taking the page away.",

		kind: "popover",

		door: "OPEN: A GLOSS",
	},

	{
		mark: "12",

		state: "LOADING",

		component: "POPOVER",

		when: "Right when the figure is being read: the head counts LOADING and the last known value stays visible under it.",

		kind: "popover-loading",

		door: "OPEN: READING",
	},

	{
		mark: "13",

		state: "ERROR",

		component: "POPOVER",

		when: "Right when the control's own action failed - the popover is the only place the reader is looking.",

		kind: "popover-error",

		door: "OPEN: A FAILURE",
	},

	{
		mark: "14",

		state: "NEAR THE RIGHT EDGE",

		component: "POPOVER",

		when: "Right for a control at the page's right edge: collision padding and `sticky` keep the slip inside the paper.",

		kind: "popover-edge",

		door: "OPEN: AT THE EDGE",
	},

	{
		mark: "15",

		state: "INSIDE A CARD",

		component: "POPOVER",

		when: "Right when the control lives on a white insert: the slip arrives over the card it belongs to and the card keeps its own frame.",

		kind: "popover-card",

		door: "OPEN: FROM THE INSERT",
	},

	{
		mark: "16",

		state: "READY",

		component: "HOVERCARD",

		when: "Right when a name in prose needs a definition and the reader has not asked for one yet.",

		kind: "hover",

		door: "HOVER: A TERM",
	},

	{
		mark: "17",

		state: "LONG TEXT",

		component: "HOVERCARD",

		when: "Right when the gloss is two paragraphs: the card caps at 24rem and 22rem tall, and scrolls rather than growing past the fold.",

		kind: "hover-long",

		door: "HOVER: A LONG GLOSS",
	},

	{
		mark: "18",

		state: "A CAP",

		component: "ICONTOOLTIP",

		when: "Right for a glyph that needs two words: the ink cap, no register, no frame - the smallest thing in the family.",

		kind: "tip",

		door: "HOVER: THE GLYPH",
	},

	{
		mark: "19",

		state: "A STACK OF CAPS",

		component: "ICONTOOLTIP",

		when: "Right when the label is two or three lines: the staccato caps keep the tilt, and each line is its own mark.",

		kind: "tip-lines",

		door: "HOVER: THREE LINES",
	},

	{
		mark: "20",

		state: "A SLIP",

		component: "ICONTOOLTIP",

		when: "Right when the glyph needs a record rather than a gloss: `Detail` switches the tooltip to the slip, head and all.",

		kind: "tip-detail",

		door: "HOVER: THE DETAIL",
	},

	{
		mark: "21",

		state: "UNAVAILABLE",

		component: "ICONTOOLTIP",

		when: "Right when the glyph exists and cannot be used: `◎` before the label, in the same mark the item grammar uses.",

		kind: "tip-unavailable",

		door: "HOVER: THE GAP",
	},

	{
		mark: "22",

		state: "READY",

		component: "CONTEXTMENU",

		when: "Right when the actions belong to the region the reader is pointing at, and the region has no room for a button.",

		kind: "context",

		door: "RIGHT-CLICK THIS ROW",
	},

	{
		mark: "23",

		state: "EMPTY",

		component: "CONTEXTMENU",

		when: "Right when the region has no actions: the menu says so in the grammar rather than opening as an empty frame.",

		kind: "context-empty",

		door: "RIGHT-CLICK: NO ACTIONS",
	},

	{
		mark: "24",

		state: "READY",

		component: "DROPDOWNMENU",

		when: "Right when a control opens a set of choices: the current row is marked, the unavailable one says why.",

		kind: "menu",

		door: "OPEN: A MENU",
	},

	{
		mark: "25",

		state: "SUBMENU ×3",

		component: "DROPDOWNMENU",

		when: "Right when the set has a hierarchy: each level prints its path, so depth three reads as a route rather than as a stack.",

		kind: "menu-sub",

		door: "OPEN: THREE DEEP",
	},

	{
		mark: "26",

		state: "EMPTY",

		component: "DROPDOWNMENU",

		when: "Right when the set is empty: the head counts 00 and the empty arm says what would be here.",

		kind: "menu-empty",

		door: "OPEN: NO ROWS",
	},

	{
		mark: "27",

		state: "MANY ITEMS",

		component: "DROPDOWNMENU",

		when: "Right when the set is two hundred: the slip caps at 24rem and scrolls, and the head stays stuck to the top.",

		kind: "menu-many",

		door: "OPEN: FORTY ROWS",
	},

	{
		mark: "28",

		state: "DENSE",

		component: "DROPDOWNMENU",

		when: "Right for a set the reader scans rather than picks: forty rows at a 1.5rem stride, the type and the mark column unmoved.",

		kind: "menu-dense",

		door: "OPEN: FORTY ROWS, TIGHT",
	},

	{
		mark: "29",

		state: "TRIGGER REMOVED",

		component: "DROPDOWNMENU",

		when: "Right when the door unmounts under an open menu: the guard closes the slip rather than leaving it floating over nothing.",

		kind: "menu-orphan",

		door: "OPEN: THEN REMOVE THE DOOR",
	},

	{
		mark: "30",

		state: "READY",

		component: "MENUBAR",

		when: "Right when the surface is an application rather than a page: the bar is a ruled shelf, and each menu is the same slip.",

		kind: "menubar",
	},

	{
		mark: "31",

		state: "SUBMENU",

		component: "MENUBAR",

		when: "Right when the bar's menu has a hierarchy: the submenu prints `# FILE ↳ NEW / 03` and travels from its own side.",

		kind: "menubar-sub",
	},

	{
		mark: "32",

		state: "READY",

		component: "COMMAND",

		when: "Right when the reader knows the name of what they want: a route index, one list, one selection.",

		kind: "command",

		door: "OPEN: THE INDEX",
	},

	{
		mark: "33",

		state: "LOADING",

		component: "COMMAND",

		when: "Right when the register is being read: `# FIND / LOADING`, and the skeleton holds the pitch the results will land on.",

		kind: "command-loading",

		door: "OPEN: READING THE INDEX",
	},

	{
		mark: "34",

		state: "EMPTY",

		component: "COMMAND",

		when: "Right when the query matches nothing: `◎ NO RECORD`, the words to try, and the scope that hid the answer.",

		kind: "command-empty",

		door: "OPEN: NO MATCH",
	},
];

/** The rows of one group, in order. */
export const InGroup = (Key: string): readonly Specimen[] =>
	Specimens.filter((Row) => GroupOf(Row.kind) === Key);

/** Which group a row belongs to, from its kind. */
export const GroupOf = (Kind: OverlayKind): string => {
	switch (Kind) {
		case "dialog":
		case "dialog-loading":
		case "dialog-error":
		case "dialog-empty":
		case "dialog-partial":
		case "dialog-tall":
		case "dialog-narrow":
		case "dialog-full":
		case "sheet":
		case "drawer":
		case "popover":
		case "popover-loading":
		case "popover-error":
		case "popover-edge":
		case "popover-card":
			return "panel";

		case "hover":
		case "hover-long":
		case "tip":
		case "tip-lines":
		case "tip-detail":
		case "tip-unavailable":
			return "card";

		default:
			return "menu";
	}
};
