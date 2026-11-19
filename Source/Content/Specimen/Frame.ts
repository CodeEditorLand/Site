/**
 * Frame - the surface, shell and layout family's state matrix, its specimens, and
 * what the exploration changed.
 *
 * ─── WHY THIS FAMILY NEEDS ITS OWN MATRIX ─────────────────────────────────
 * The ledger family is BELIEVED, the display family is READ, the overlay family
 * is DISMISSED, the narrative family is TOLD. This family is the FRAME: the page
 * shell, the rail, the panes, the drawer, the plate, the edge and the vocabulary
 * a surface states itself in. Nothing here is content. Everything here decides
 * whether content can be read at all - and a frame fails differently from a
 * block: it fails by holding nothing (a shell with no rail), by holding too much
 * (two rails and a plate at 640px), by holding itself (a card that contains a
 * page), or by holding a hole where an artifact should be (a plate with no
 * image).
 *
 * Twenty components, twenty-two conditions, four hundred and forty cells. Every
 * cell that cannot exist carries a sentence saying why, because a blank cell in a
 * matrix of dispositions is the same defect as a blank cell in a ledger: an
 * excuse where a fact belongs.
 *
 * ─── WHAT THE FAMILY'S OWN BRIEF ASKED FOR ────────────────────────────────
 * "Explore the compositions the frame must survive - a page with no rail, a page
 * with two rails, a shell inside a shell (a card that contains a page), a plate
 * with no image, a pane pair at 640px - and give the surface its full state set
 * (live, beta, planned, retired, unavailable) as one vocabulary rather than
 * per-page adjectives."
 *
 * The five compositions are columns of the `composition` group, and the
 * vocabulary is `Surface/State.ts`'s `Life` table with `SurfaceLife` as its one
 * renderer. Both are printed below, and both are improvements with a cell behind
 * them rather than a preference.
 *
 * ─── NOTHING HERE IS A TYPED FIGURE ───────────────────────────────────────
 * Every count on the sheet is derived from the tables below, so a row or a
 * condition added to the family changes the sheet's figures without a second
 * edit. A number typed into this file would be the one figure on the sheet that
 * could disagree with the sheet.
 */

/* ─── THE COLUMNS ────────────────────────────────────────────────────────── */

/** A column of the matrix: the condition or combination, and what its cell asks. */
export interface Column {
	/** The cell's key in a row's override map. */
	readonly key: string;

	/** The column head, in the sheet's register: `NO RAIL`, `AT 640`. */
	readonly label: string;

	/** One line under the head: what the cell is asking. */
	readonly ask: string;

	/**
	 * The group the column belongs to. The matrix prints a heavier rule where a
	 * condition becomes a shape, where a shape becomes a composition and where a
	 * composition becomes a context, because those are four different questions
	 * and a reader scanning the head should see where one set ends.
	 */
	readonly group: "condition" | "shape" | "composition" | "context";
}

/**
 * The twenty-two columns, in reading order.
 *
 * Nine conditions first, because they are the states a reader meets; then six
 * shapes, because they are what a frame is asked to hold; then five
 * compositions, because they are the ones this family's brief named by hand; then
 * two contexts, because they are the ones a designer forgets - the action a frame
 * carries and the medium it is printed on.
 */
export const Columns: readonly Column[] = [
	{ key: "rest", label: "REST", ask: "untouched", group: "condition" },

	{
		key: "empty",

		label: "EMPTY",

		ask: "holds nothing",

		group: "condition",
	},

	{
		key: "loading",

		label: "LOADING",

		ask: "has not arrived",

		group: "condition",
	},

	{
		key: "partial",

		label: "PARTIAL",

		ask: "one part unknown",

		group: "condition",
	},

	{ key: "error", label: "ERROR", ask: "a step failed", group: "condition" },

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
		key: "reducedmotion",

		label: "REDUCED",

		ask: "no motion asked for",

		group: "condition",
	},

	{ key: "one", label: "ONE", ask: "a set of one", group: "shape" },

	{ key: "many", label: "MANY", ask: "nine or twenty-six", group: "shape" },

	{
		key: "longtext",

		label: "LONG",

		ask: "a line past its column",

		group: "shape",
	},

	{ key: "wide", label: "WIDE", ask: "a wide band", group: "shape" },

	{ key: "narrow", label: "NARROW", ask: "a narrow column", group: "shape" },

	{ key: "dense", label: "DENSE", ask: "the tight arm", group: "shape" },

	{
		key: "norail",

		label: "NO RAIL",

		ask: "a page with no rail",

		group: "composition",
	},

	{
		key: "tworails",

		label: "TWO RAILS",

		ask: "rail and register",

		group: "composition",
	},

	{
		key: "incard",

		label: "IN A CARD",

		ask: "a shell inside a shell",

		group: "composition",
	},

	{
		key: "at640",

		label: "AT 640",

		ask: "a pane pair at 640px",

		group: "composition",
	},

	{
		key: "noimage",

		label: "NO IMAGE",

		ask: "a plate with no plate",

		group: "composition",
	},

	{
		key: "withaction",

		label: "WITH ACTION",

		ask: "one thing to click",

		group: "context",
	},

	{
		key: "print",
		label: "ON PAPER",
		ask: "the printed sheet",
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
	/** `SHELL` - the row's name in the sheet's register. */
	readonly name: string;

	/** The file the part is, relative to `Source/`, upper case. */
	readonly file: string;

	/** One line: what the part is, in the sheet's voice. */
	readonly note: string;

	/**
	 * The cells this row overrides. Everything not listed is `BUILT`, because a
	 * family that renders its own happy state everywhere should not have to say
	 * so four hundred times - and a default of `built` makes every exception a
	 * sentence someone had to write.
	 */
	readonly cells: Readonly<Record<string, Cell>>;
}

/** The reason a printed block is never a control. Reused, and never alone. */
const NotAControl = (what: string): Cell =>
	NotApplicable(
		`A ${what} is not a control: it renders props, ships no script and holds no input, so there is no control state for \`disabled\` to be the absence of.`,
	);

/** The reason a printed block is read-only by construction. */
const ReadOnly = (what: string): Cell =>
	NotApplicable(
		`A ${what} is read-only by construction - it is markup and CSS with nothing to edit - so \`read-only\` names no arm this block could have.`,
	);

/** The reason a block with no motion cannot be asked for less of it. */
const NoMotion = (what: string): Cell =>
	NotApplicable(
		`A ${what} has no motion of its own: its state changes are ink, rule and space, and the two folds it prints turn through the mark layer, which is already gated on \`prefers-reduced-motion\`.`,
	);

/** The reason a leaf is one thing and cannot be a set of one. */
const NotASet = (what: string, set: string): Cell =>
	NotApplicable(
		`A ${what} is one object by definition; a set of one is ${set}, and a block that answered both would be two blocks with one name.`,
	);

/** The reason a part holds no image. */
const NoImage = (what: string): Cell =>
	NotApplicable(
		`A ${what} prints no image and takes no media prop: the site's one image arm is \`ShellPlate\`'s, and a second block with a picture in it would be a second plate.`,
	);

/** The reason the page's tracks are not a small part's context. */
const NotAPage = (what: string): Cell =>
	NotApplicable(
		`A ${what} is a word or a row on a line, not a page composition: the rail count of the page it sits on is the shell's fact, and a badge that re-composed because the page had two rails would be a badge with an opinion about layout.`,
	);

/** The reason a part is fixed to the viewport rather than placed in a card. */
const NotInCard = (what: string, why: string): Cell =>
	NotApplicable(
		`A ${what} is ${why}, so a card is not a slot it has: the card's width is a container query the block would re-compose inside, and the composition it re-composed into would be a second design nobody asked for.`,
	);

/**
 * The twenty components, in the order a page meets them: the surface's opening,
 * its regions and its state vocabulary; then the shell's four languages and its
 * five primitives; then the frame's three layout units.
 *
 * Every row's overrides are reasons. A row with no overrides would be a part that
 * survives every combination, and no part does.
 */
export const Rows: readonly Row[] = [
	{
		name: "SHELL",

		file: "COMPONENT/SURFACE/SURFACESHELL.ASTRO",

		note: "The app surface's shell: the instrument head, then the page's own bands.",

		cells: {
			disabled: NotAControl("surface shell"),

			readonly: ReadOnly("shell"),

			reducedmotion: NoMotion("shell"),

			one: NotASet("surface shell", "one page's frame"),

			many: NotASet("surface shell", "one page's frame"),

			noimage: NoImage("surface shell"),

			withaction: NotApplicable(
				"A surface shell prints no action of its own: the actions belong to its bands (`surface-button`, a rail's foot, an absence's `NEXT:`), and a shell that carried one would put a control in the frame itself.",
			),

			incard: NotApplicable(
				"A surface shell is the page's frame, and a card is a record's surface: the two are the same question at two ranks, and a shell inside a card would print a page's nameplate inside a record. The composition the brief asks for - a card that contains a page - is `PageShell`'s `IN A CARD` cell, because a page's grid re-composes and a page's shell does not.",
			),

			at640: Built(
				"the head is one column at every width and the bands below it own their own queries",
			),

			partial: Built(
				"`SurfaceStatusLine` prints the states it has and `RecordLedger` the facts it has; an unknown fact is the ledger row's `UNAVAILABLE`, not the shell's",
			),

			stale: Built(
				"the age is the leaf's `AGE:` row and the status line's `BUILT:` declaration; the shell prints both without owning either",
			),

			norail: Built(
				"a surface shell has no rail at all - the rail is `PageShell`'s track - so the composition is its normal one",
			),

			tworails: Built(
				"the shell is the main column of whatever frame it is placed in, so a two-rail page narrows it and the head re-composes at the track's width",
			),
		},
	},

	{
		name: "HEAD",

		file: "COMPONENT/SURFACE/SURFACEHEAD.ASTRO",

		note: "The instrument's nameplate: `# ID`, the `h1` at L, the `↳` proposition, the status line, the lifecycle and the facts.",

		cells: {
			disabled: NotAControl("nameplate"),

			readonly: ReadOnly("nameplate"),

			reducedmotion: NoMotion("nameplate"),

			one: NotASet("nameplate", "one page's opening"),

			many: NotASet("nameplate", "one page's opening"),

			noimage: NoImage("nameplate"),

			withaction: NotApplicable(
				"The head's `slot` is where a page puts its own opening content - a programme run, a protocol line, a badge strip - and an action in it would be a control inside a nameplate. The surface's one expressive action is `surface-button`, in a band.",
			),

			incard: NotApplicable(
				"A head is the page's `h1` and its nameplate; a card that contained one would be a page inside a record, which is the reverse of the composition the family allows (a record inside a surface).",
			),

			at640: Built(
				"the plate row is a flex line and the title is `text-wrap: balance`, so the head stacks without a query of its own",
			),

			longtext: Built(
				"the title is `balance` and the proposition is capped at `--MeasureOpening` with `pretty`; a `FOR:` value wraps inside the strip rather than widening it",
			),

			narrow: Built(
				"at the narrowest width the head is one column: plate, title, proposition, status, life, facts",
			),

			dense: Built(
				"`SurfaceHead` has no dense arm - the tight step belongs to the blocks inside it (`SurfaceState.dense`, `ShellState.dense`), because a nameplate is the one thing on a surface that may not shrink",
			),
		},
	},

	{
		name: "REGION",

		file: "COMPONENT/SURFACE/SURFACEREGION.ASTRO",

		note: "One region of an app surface's main column: `# 04`, an `h2`, a standfirst and its records.",

		cells: {
			disabled: NotAControl("region"),

			readonly: ReadOnly("region"),

			reducedmotion: NoMotion("region"),

			one: Built("a region holds one record as readily as nine"),

			many: Built(
				"the region's body is the page's slot and owns no row rhythm",
			),

			noimage: NoImage("region"),

			withaction: Built(
				"a region's action is a `surface__action` row or a `NEXT:` link inside it",
			),

			incard: Built("`dense` is the region inside a card or a pane"),

			at640: Built("the region is one column below the rail breakpoint"),

			empty: Built(
				'`state="empty"` prints the composed absence under the same head',
			),

			loading: Built(
				'`state="loading"` prints the keys and barred values',
			),

			partial: Built(
				"a fact the region does not have is printed by the record inside it as `UNAVAILABLE`",
			),
		},
	},

	{
		name: "REGISTER",

		file: "COMPONENT/SURFACE/SURFACESTATE.ASTRO",

		note: "The state register: `KEY:` rows with the state square at each word's tone.",

		cells: {
			disabled: NotAControl("register"),

			readonly: ReadOnly("register"),

			reducedmotion: NoMotion("register"),

			one: Built("a head's register is usually one or two rows"),

			many: Built("`columns={2}` reads a legend of eight as a set"),

			noimage: NoImage("register"),

			withaction: NotApplicable(
				"A register states what a surface is doing; the action that changes it is the surface's, not the register's. A register row with a link in it would be a rail row.",
			),

			incard: Built("`dense` is the register inside a card"),

			at640: Built(
				"the key column folds above its value at 640px, on the row's own geometry",
			),
		},
	},

	{
		name: "STATUSLINE",

		file: "COMPONENT/SURFACE/SURFACESTATUSLINE.ASTRO",

		note: "The one row every app surface states its state in: `STATUS:` and the declarations that audit it.",

		cells: {
			disabled: NotAControl("status line"),

			readonly: ReadOnly("status line"),

			reducedmotion: NoMotion("status line"),

			one: Built("one state and no declarations prints one register row"),

			many: Built("eight declarations wrap at the group rhythm"),

			noimage: NoImage("status line"),

			withaction: NotApplicable(
				"The status line's job is to be auditable, not actionable: the `NEXT:` a reader needs is the absence's or the failure's, and a link in the readout would make the audit trail a control strip.",
			),

			empty: Built(
				"with no states and no declarations the block renders nothing at all - an empty readout is not a readout",
			),

			partial: Built(
				"a declaration the build cannot state prints `UNAVAILABLE` as its value, because the block invents none of its facts",
			),

			longtext: Built(
				"a long route or source wraps inside the declaration, never widening the row",
			),

			incard: Built("the row wraps to two lines and its rules hold"),

			norail: Built(
				"a status line is inside a head, so the page's tracks are not its context",
			),
		},
	},

	{
		name: "BADGE",

		file: "COMPONENT/SURFACE/SURFACEBADGE.ASTRO",

		note: "One state word on a Jelly badge, tinted from the semantic token of the thing it describes.",

		cells: {
			disabled: NotApplicable(
				"A badge reports a word; there is nothing to disable. The word `Disabled` is a badge's LABEL (the dashboard's table), not the badge's state.",
			),

			readonly: ReadOnly("badge"),

			reducedmotion: NoMotion("badge"),

			one: NotASet("badge", "`SurfaceChips`, which is the set"),

			many: NotASet("badge", "`SurfaceChips`, which is the set"),

			noimage: NoImage("badge"),

			withaction: NotApplicable(
				"A badge is a label on a surface, never a control: the Jelly button beside it is the action, and a badge that took a click would be an unlabelled button.",
			),

			incard: NotAPage("badge"),

			norail: NotAPage("badge"),

			tworails: NotAPage("badge"),

			at640: NotAPage("badge"),

			print: Built(
				"the tint is a light fill and a `-700` ink, so it survives the print palette",
			),
		},
	},

	{
		name: "CHIPS",

		file: "COMPONENT/SURFACE/SURFACECHIPS.ASTRO",

		note: "A record's state chips as Jelly badges, each carrying the state square and the tone's ink.",

		cells: {
			disabled: NotAControl("chip run"),

			readonly: ReadOnly("chip run"),

			reducedmotion: NoMotion("chip run"),

			one: Built(
				"one chip is a chip run of one - the legend of a single-state record",
			),

			many: Built("eight chips wrap at the tight step"),

			noimage: NoImage("chip run"),

			withaction: NotApplicable(
				"A chip is a state, not a filter: the site has no chip that toggles anything, and a chip run with a click in it would be a tag input's control row.",
			),

			incard: NotAPage("chip run"),

			norail: NotAPage("chip run"),

			tworails: NotAPage("chip run"),

			at640: Built(
				"the run wraps; a chip never compresses inside its shadow tree",
			),

			empty: NotApplicable(
				"An empty chip run prints no list at all, and a caller with no states has nothing to say: the block renders an empty `<ul>`, which is the honest zero and not an absence. `SurfaceAbsent` is the composed version.",
			),
		},
	},

	{
		name: "ABSENT",

		file: "COMPONENT/SURFACE/SURFACEABSENT.ASTRO",

		note: "The honest empty state: what would be here, why it is not, and the way forward.",

		cells: {
			disabled: NotAControl("absence"),

			readonly: ReadOnly("absence"),

			reducedmotion: NoMotion("absence"),

			one: NotASet("absence", "one region's missing record"),

			many: NotASet("absence", "one region's missing record"),

			noimage: NoImage("absence"),

			incard: Built("`dense` is the absence inside a card or a pane"),

			norail: Built(
				"an absence is placed where a record would be, so the page's tracks are not its context",
			),

			at640: Built("the key column folds above its value at 640px"),

			error: Built(
				"`retry` adds the `RETRY:` row, so a failed request states both the command and the alternative",
			),

			partial: Built(
				"`whyNot` is where a partial cause is stated; the three rows are the composition, not three fixed strings",
			),
		},
	},

	{
		name: "STATEBADGE",

		file: "COMPONENT/SURFACE/STATEBADGE.TSX",

		note: "One state word as a Jelly badge inside a React island - the twin of `SurfaceBadge`, with the tone read from `State.ts`.",

		cells: {
			disabled: NotApplicable(
				"A state badge reports a word inside an island; the island owns the control states. A badge that could be disabled would be a badge whose state was the app's, not the record's.",
			),

			readonly: ReadOnly("state badge"),

			reducedmotion: NoMotion("state badge"),

			one: NotASet("state badge", "the island's own run of them"),

			many: NotASet("state badge", "the island's own run of them"),

			noimage: NoImage("state badge"),

			withaction: NotApplicable(
				"A badge is not a control; the island's `jelly-button` beside it is.",
			),

			incard: NotAPage("state badge"),

			norail: NotAPage("state badge"),

			tworails: NotAPage("state badge"),

			at640: NotAPage("state badge"),

			loading: Built(
				"`STATUS: LOADING` is a word from the eight, and the badge prints it in ink without a spinner",
			),
		},
	},

	{
		name: "LIFE",

		file: "COMPONENT/SURFACE/SURFACELIFE.ASTRO",

		note: "One surface's maturity in the site's one vocabulary of five: LIVE, BETA, PLANNED, RETIRED, UNAVAILABLE.",

		cells: {
			disabled: NotAControl("lifecycle register"),

			readonly: ReadOnly("lifecycle register"),

			reducedmotion: NoMotion("lifecycle register"),

			one: Built(
				"the register is five steps by definition; `term` selects one and the other four stay printed as the scale",
			),

			many: Built(
				"all five print at every state - that is what makes it a vocabulary",
			),

			noimage: NoImage("lifecycle register"),

			withaction: NotApplicable(
				"A lifecycle is a fact about a surface, not an action on it: a reader cannot promote a page from BETA by clicking, and a control that implied it could would be a lie with a border.",
			),

			incard: Built("`dense` drops the gloss and keeps the scale"),

			norail: NotAPage("lifecycle register"),

			tworails: NotAPage("lifecycle register"),

			at640: Built("the five steps wrap at the reading step"),

			empty: NotApplicable(
				"A surface always has a lifecycle, even when it is `UNAVAILABLE`: the fifth word IS the empty arm, and a register that rendered nothing would be the one state the vocabulary exists to prevent.",
			),

			partial: Built(
				"a word outside the five prints `UNAVAILABLE` and the block says so in its `NOTE:` row - an adjective is not a word from the table",
			),
		},
	},

	{
		name: "PAGESHELL",

		file: "COMPONENT/SHELL/PAGESHELL.ASTRO",

		note: "The shell every composed page wears, in one of five languages: the declaration strip, the tracks, the foot.",

		cells: {
			disabled: NotAControl("page shell"),

			readonly: ReadOnly("page shell"),

			reducedmotion: Built(
				"the margin's `register-to-bar` transition is gated on `prefers-reduced-motion`, and the bar is the same element either way",
			),

			one: NotASet("page shell", "one page's composition"),

			many: NotASet("page shell", "one page's composition"),

			noimage: NoImage("page shell"),

			withaction: NotApplicable(
				"A page shell holds tracks; the actions are the bands' inside them. The one exception is the plate language, whose action is the page's own - and it is the page's, not the shell's.",
			),

			norail: Built(
				"`:has()` drops the track: a reading page with no rail prints `desk | paper | desk | margin` and the paper centres in what is left",
			),

			tworails: Built(
				"the reading language's rail and margin are the two rails: 13rem | desk | paper | desk | 16rem, with the margin converting to a sticky bar between 58rem and 84rem",
			),

			incard: Built(
				"the shell is a query container (`container: shell / inline-size`), so a shell in a card re-composes at the card's width instead of overflowing - the composition the brief asks for by name",
			),

			at640: Built(
				"below 58rem every language prints its rail as a ruled register above the main track; the panes' own seam rotates at 44rem",
			),

			empty: Built(
				'`language="record"` prints `DECLARES: NOTHING` and no tracks, which is the one-artifact page\'s honest empty arm',
			),

			dense: NotApplicable(
				"A page shell's rhythm is the page's: the chapter interval is what makes a document breathe, and a dense page shell would be a page that had decided its own chapters were sections. `RecordBand.dense` is the tight arm, inside the track.",
			),

			print: Built(
				"the print layer turns every track into the page's one column and resolves the rails to their targets",
			),
		},
	},

	{
		name: "PANES",

		file: "COMPONENT/SHELL/SHELLPANES.ASTRO",

		note: "The workspace's two instruments: `5fr 1px 7fr`, the seam, and the drawer for what neither holds.",

		cells: {
			disabled: NotAControl("pane pair"),

			readonly: ReadOnly("pane pair"),

			reducedmotion: NoMotion("pane pair"),

			one: NotApplicable(
				"A pane pair is two panes by definition - the seam is the instrument. One pane is `PageShell`'s workspace track with no pair, and the block would have to drop its own reason for existing to print it.",
			),

			many: NotApplicable(
				"Two panes is the whole composition: a third instrument goes in the drawer, which is the block's answer to `many` and not a third column.",
			),

			noimage: NoImage("pane pair"),

			withaction: Built(
				"a pane's body is the page's slot, so the action inside it is the instrument's",
			),

			empty: Built(
				"each pane carries its own `state`/`empty`: a pair with one absent half keeps its seam and its heads",
			),

			loading: Built(
				'`state="loading"` prints the pane\'s keys and barred values, under its own head',
			),

			norail: Built(
				"the pair is placed in the workspace's main track, with or without the rail",
			),

			tworails: Built(
				"a pair inside a two-rail shell narrows and its seam rotates at 44rem of the pair's own width",
			),

			incard: Built("`dense` is the pair inside a card"),

			at640: Built(
				"`@container panes (max-width: 43.99rem)` rotates the seam: the panes stack and the 1px vertical track becomes a 1px horizontal rule at the same ink",
			),
		},
	},

	{
		name: "PLATE",

		file: "COMPONENT/SHELL/SHELLPLATE.ASTRO",

		note: "The plate language's one artifact: a full-bleed figure with a caption channel beside it.",

		cells: {
			disabled: NotAControl("plate"),

			readonly: ReadOnly("plate"),

			reducedmotion: NoMotion("plate"),

			one: NotASet("plate", "one figure"),

			many: NotASet(
				"plate",
				"one figure - a set of plates is a page of plates",
			),

			withaction: NotApplicable(
				"A plate's `proposition` is a sentence, not a control: the action a plate leads to is the page's `NEXT:`, printed by the block that owns the claim.",
			),

			noimage: Built(
				"`absence` prints the composed absence inside the plate's own frame at the plate's own height - the improvement this matrix produced, and the cell the brief named",
			),

			norail: Built(
				"a plate bleeds to the container's gutters, so the rails outside it are the page's",
			),

			tworails: Built(
				"the plate's channel sits in its own 20rem track at 48rem of the plate's width, whatever the page's rails do",
			),

			incard: NotApplicable(
				"A plate inside a Jelly card is a card in a card: the plate is the page's artifact and the card is a record's surface. A figure inside a card is `RecordFigure`'s, which is the same evidence at a record's scale.",
			),

			at640: Built(
				"the channel goes under the plate: `@container plate (min-width: 48rem)` is the only switch, so the caption never floats on the image",
			),

			empty: Built(
				"with no media, no trace, no slot and no `absence`, the field is the empty frame - and that is the defect the `absence` arm removes",
			),

			partial: Built(
				"`state` prints one of the eight words in its tone, and a word outside the eight prints in ink",
			),

			print: Built(
				"the plate is the one artifact the print layer keeps at full width, with its channel resolved to the page's column",
			),
		},
	},

	{
		name: "RAIL",

		file: "COMPONENT/SHELL/SHELLRAIL.ASTRO",

		note: "The rail primitive: a register line with its count, and rows of `[mark] [label] [meta]`.",

		cells: {
			disabled: NotAControl("rail"),

			readonly: ReadOnly("rail"),

			reducedmotion: NoMotion("rail"),

			one: Built(
				"a rail of one row prints one row - the register line's count says `01`",
			),

			many: Built(
				"twenty-six rows print: a rail is short enough to print and a disclosure would hide the only navigation",
			),

			noimage: NoImage("rail"),

			withaction: Built(
				"`foot` is the rail's closing destination, and a row's `href` is its action",
			),

			empty: Built(
				'`state="empty"` prints the composed absence inside the rail, under the same register line',
			),

			loading: Built(
				'`state="loading"` prints the keys and barred values',
			),

			partial: Built(
				"a row's `meta` prints `UNAVAILABLE` when the figure is not known, and the row stays",
			),

			longtext: Built(
				"a label wraps with `pretty` and the note under it at the caption tier; the meta is `nowrap` and the row is a grid, so a long label narrows the body and never the value",
			),

			norail: NotApplicable(
				"A rail is the rail: `NO RAIL` is the shell's composition (the track is dropped), not a state the rail can be in. The rail's own empty arm is `state=\"empty\"`, and it is a different fact - a rail that is present and has nothing to list.",
			),

			tworails: Built(
				"a rail in a two-rail page is one of the two, at 13rem",
			),

			incard: Built(
				"`dense` is the rail inside a card, a pane or a drawer",
			),

			at640: Built(
				"below the shell's rail breakpoint the rail becomes a ruled register above the main track - its rows still in reading order, nothing folded away",
			),

			print: Built(
				"the print layer resolves each row's href and prints the rail as a list",
			),
		},
	},

	{
		name: "STATE",

		file: "COMPONENT/SHELL/SHELLSTATE.ASTRO",

		note: "The nine adverse states, composed in the record grammar: one box, one register head, one STATUS row.",

		cells: {
			disabled: NotAControl("adverse state"),

			readonly: ReadOnly("adverse state"),

			reducedmotion: NoMotion("adverse state"),

			one: Built("a state prints one condition and its rows"),

			many: Built(
				"a state's `rows` are a set: the last-known values, or the facts a partial reading does have",
			),

			noimage: NoImage("adverse state"),

			withaction: Built(
				"`next` prints the one action, and `error` prints it as `RETRY:`",
			),

			incard: Built(
				'`surface="bare"` and `dense` are the state inside a card',
			),

			at640: Built(
				"`@container state (max-width: 26rem)` folds the key column above its value",
			),

			norail: Built(
				"a state is placed where a record would be, in whatever track the page has",
			),

			tworails: Built("the state queries its own width, not the page's"),

			empty: Built(
				'`kind="empty"` is one of the nine, and its three rows are what would be here, why not, and the way forward',
			),

			partial: Built(
				'`kind="partial"` prints `UNAVAILABLE` for the fact it does not have, never a zero',
			),
		},
	},

	{
		name: "EDGE LEAF",

		file: "COMPONENT/LAYOUT/EDGE/EDGELEAF.ASTRO",

		note: "The frame's first band: the sheet's number, route, part, circulation, source and as-of, with its `↳` proposition.",

		cells: {
			disabled: NotAControl("headnote"),

			readonly: ReadOnly("headnote"),

			reducedmotion: NoMotion("headnote"),

			one: NotASet("headnote", "one sheet's opening"),

			many: NotASet("headnote", "one sheet's opening"),

			noimage: NoImage("headnote"),

			withaction: NotApplicable(
				"A leaf states where the sheet sits; the way forward is the turn's (`→ NEXT:`), because a page's opening that also carried the next page's destination would print the seam twice.",
			),

			incard: NotInCard(
				"headnote",
				"the frame's edge, mounted once by `Base.astro` above every page's slot",
			),

			norail: Built(
				"the leaf is above the shell, so a page with no rail prints it unchanged",
			),

			tworails: Built(
				"the leaf is at the frame's width, outside the shell's tracks",
			),

			at640: Built(
				"the fact rows fold to key-over-value and the `↳` proposition hangs under them",
			),

			empty: Built(
				"the `unfiled` arm prints `◎ NOT FILED` and `PART: ◎ NONE`",
			),

			loading: Built(
				"the `loading` arm keeps the keys and bars the values",
			),

			partial: Built(
				"a fact this build cannot state prints `UNAVAILABLE`, never `0`",
			),

			stale: Built(
				"`◎ STALE` plus `AGE: n DAYS`, from the sheet's own date",
			),

			longtext: Built("a route that will not fit wraps in full"),

			print: Built(
				"the leaf is the printed sheet's own running head - it is already the paper's composition",
			),
		},
	},

	{
		name: "EDGE TURN",

		file: "COMPONENT/LAYOUT/EDGE/EDGETURN.ASTRO",

		note: "The frame's last band: the catchword for the next part, and the sheet's folio.",

		cells: {
			disabled: NotAControl("catchword"),

			readonly: ReadOnly("catchword"),

			reducedmotion: NoMotion("catchword"),

			one: NotASet("catchword", "one hand-over"),

			many: NotASet("catchword", "one hand-over"),

			noimage: NoImage("catchword"),

			withaction: Built(
				"the catchword IS the action: `→ NEXT:` is a link to the next part",
			),

			incard: NotInCard(
				"catchword",
				"the frame's edge, the last thing on the page",
			),

			norail: Built(
				"the turn is below the shell, so the page's tracks are not its context",
			),

			tworails: Built(
				"the turn is at the frame's width, outside the tracks",
			),

			at640: Built(
				"the destination and the folio stack, and the folio keeps its own order",
			),

			empty: Built("`◎ NO NEXT SHEET` plus the reason"),

			error: Built("`STATUS: INTERRUPTED` plus `RETRY:`"),

			missing: Built("`◎ TARGET GONE` plus `WAS:`"),

			loading: Built("the keys stay and the values bar"),

			partial: Built(
				"a destination part whose count cannot be known prints `UNAVAILABLE`",
			),
		},
	},

	{
		name: "FRAME RAIL",

		file: "COMPONENT/LAYOUT/FRAME/RAIL.TSX",

		note: "The dossier's thumb index: ten parts as cut tabs, the pulled-out tab in ink, and the index closing the rail.",

		cells: {
			disabled: NotAControl("thumb index"),

			readonly: ReadOnly("thumb index"),

			reducedmotion: Built(
				"the tab's colour transition is the motion layer's `quick` interval, and the mark layer gates every transition on `prefers-reduced-motion`",
			),

			one: Built(
				"a document with one part prints one tab and `INDEX:␁01`",
			),

			many: Built(
				"the ten parts print, and the rail's figure is `FrameSections.length`",
			),

			noimage: NoImage("thumb index"),

			withaction: Built(
				"every tab is a link, and the closing row is the index's own",
			),

			incard: NotInCard(
				"thumb index",
				"fixed to the window's left edge above 1280px",
			),

			norail: NotApplicable(
				"The frame's rail is the rail the page has whether or not the page's own shell does: `NO RAIL` is a shell's composition and this rail lives outside it, in the frame's margin.",
			),

			tworails: Built(
				"the frame's rail is the page's third rail when a reading shell prints two, and the three are at three different ranks: margin tabs, destinations, apparatus",
			),

			at640: Built(
				"below 1024px the tabs become the rows of the header's drawer, under `# INDEX:␁10`",
			),

			narrow: Built(
				"at 1280px the column is 2.25rem and prints digits only, with the name in the `title` and `aria-label`",
			),

			longtext: Built(
				"a part's name is the label's, and the drawer's row wraps it",
			),
		},
	},

	{
		name: "RUNNING HEAD",

		file: "COMPONENT/LAYOUT/FRAME/RUNNINGHEAD.TSX",

		note: "The header's strip: the record's `#`, the part in force, the composition language, and the position figure.",

		cells: {
			disabled: NotAControl("running head"),

			readonly: ReadOnly("running head"),

			reducedmotion: NoMotion("running head"),

			one: NotASet("running head", "one page's position"),

			many: NotASet("running head", "one page's position"),

			noimage: NoImage("running head"),

			withaction: Built("the record name is a link home"),

			incard: NotInCard(
				"running head",
				"the header's own strip, fixed to the viewport",
			),

			norail: Built(
				"the head prints the part and the position whatever the page's shell does",
			),

			tworails: Built("the head is above the frame, outside every track"),

			at640: Built(
				"the strip keeps the part, the language and the position, and drops only what the width cannot hold",
			),

			longtext: Built(
				"the five composition words are all rendered and one is inked; the part's label is the frame's own, at its own measure",
			),

			print: Built(
				"the print layer drops the head and prints the leaf's running head instead - the frame's paper composition",
			),
		},
	},

	{
		name: "PRINT",

		file: "COMPONENT/LAYOUT/PRINT/PRINTRECORD.ASTRO",

		note: "The sheet's print action as a colophon row: `# PRINT_01`, the command, its contract and its fallback.",

		cells: {
			disabled: Built(
				"with no JavaScript the button is not in the layout and not in the tab order, and the `<noscript>` line names the browser's own command - the disabled arm without a disabled control",
			),

			readonly: ReadOnly("print row"),

			reducedmotion: NoMotion("print row"),

			one: NotASet("print row", "one command"),

			many: NotASet("print row", "one command"),

			noimage: NoImage("print row"),

			withaction: Built(
				"the whole row is the action, and its `↳` line is the contract",
			),

			incard: NotInCard(
				"print row",
				"a footer colophon fact, at the frame's foot",
			),

			norail: Built(
				"the footer is below the shell, so the page's tracks are not its context",
			),

			tworails: Built(
				"the footer is at the frame's width, outside the tracks",
			),

			at640: Built(
				"the row stacks: the command, then its contract, then the fallback",
			),

			error: Built(
				"`◎ PRINT UNAVAILABLE` plus `NEXT:`, printed by the inline line when `window.print` is missing",
			),

			print: Built(
				"on paper the control goes and `PRINTED: ______` arrives, with a rule for the copy's own date",
			),
		},
	},
];

/* ─── THE MATRIX ─────────────────────────────────────────────────────────── */

/** The cell at a row and a column: the row's override, or the built default. */
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

		value: "CONTENT/SPECIMEN/FRAME.TS",

		note: "every figure above is counted from the three tables in this file",
	},
];

/* ─── THE IMPROVEMENTS ───────────────────────────────────────────────────── */

/** One behaviour the matrix revealed, and where it now lives. */
export interface Improvement {
	/** `RAIL` - the component the behaviour is in. */
	readonly component: string;

	/** The state or combination that revealed it, in the sheet's register. */
	readonly from: string;

	/** What the exploration found, in the sheet's voice. */
	readonly found: string;

	/** What the block does about it now, and where. */
	readonly built: string;
}

/**
 * The behaviours that only became obvious once the matrix existed.
 *
 * This section is the deliverable the brief asks for by name - "the improvements
 * that came out of the exploration" - and each entry names the cell that revealed
 * it. An improvement with no cell behind it would be a preference.
 */
export const Improvements: readonly Improvement[] = [
	{
		component: "LIFE",

		from: "PARTIAL / the whole family's vocabulary",

		found: 'Four pages answered the same question in four adjectives - "Coming Soon" on the portal, "Feature Gated" on the download masthead, "Disabled" in the dashboard, "Beta" in an article - and none of them could be counted, compared or audited. The state vocabulary said what a surface was DOING and had no word for how far along it was.',

		built: "`Surface/State.ts` carries `Life`: five words (`LIVE`, `BETA`, `PLANNED`, `RETIRED`, `UNAVAILABLE`), each with its tone and the sentence that decides between them, and `SurfaceLife.astro` is its one renderer - the register head, the word in force, all five steps with the one in force marked, and the gloss. `SurfaceHead` and `SurfaceShell` take `life` + `lifeNote`, so a surface declares its maturity in the same place it declares its status. A word outside the five prints `UNAVAILABLE` and the block says so, because an adjective is not a word from the table.",
	},

	{
		component: "PLATE",

		from: "NO IMAGE",

		found: "A plate with no `media`, no `trace` and no slot printed its frame as an empty white field at the plate's full height - a figure that was a hole, which reads as a page that failed rather than a plate with a fact to state. The brief named this composition by hand.",

		built: "`ShellPlate.absence` - `{ status, wouldBe, whyNot, next }` - prints the composed absence INSIDE the plate's own frame, at the plate's own height, in the record's `KEY:` grammar. The frame stays a plate: a figure does not become a card because its evidence is missing, and the three rows are the same three every absence on the site prints.",
	},

	{
		component: "RAIL",

		from: "MANY / ONE",

		found: "Every page with a rail of sections built a second rail beside `ShellRail` - the manual's tree, the legal clause list, the contact record column - because the primitive could hold one flat list and no groups. Five rails became seven.",

		built: "`ShellRail.groups` - a rail of sections, each with its own sub-register line and its own count counted from its own rows, in one `<ol>` per group. The rows keep the reserved mark column across every group, which is the only reason to group a register instead of stacking two rails. `items` stays the flat form and is still what most callers pass.",
	},

	{
		component: "RAIL",

		from: "EMPTY / LOADING",

		found: "A rail whose destinations had not been read printed its register line and then an empty `<ol>` - a count over nothing, which is the exact defect the register line exists to prevent.",

		built: "`ShellRail.state` (`rest` | `empty` | `loading`) with `empty` and `keys`: `empty` prints `◎ UNAVAILABLE` and the caller's sentence inside the rail; `loading` prints the keys with their values barred, `aria-hidden`, static. The register line stays either way, because the head is what names the thing that is not there.",
	},

	{
		component: "RAIL",

		from: "DENSE / IN A CARD",

		found: "A rail in a drawer, a pane or a card spent the same air as a rail at the page's edge, so ten rows of a rail inside a card were taller than the card's own content.",

		built: "`ShellRail.dense` - the same rows at the tight step. The mark column, the notes and the meta all stay: a dense rail is a rail in less air, never a rail with less in it.",
	},

	{
		component: "PANES",

		from: "EMPTY / LOADING",

		found: 'A pane whose instrument had not arrived printed its head and then an empty body - a pane that read as failed rather than as a pane with a fact to state. The pair had no way to say "one half is not here yet" without dropping the half.',

		built: "Each pane takes `state`, `empty` and `keys`; a pane with no slot is `empty` by construction. The absent arm prints `STATUS:` and the pane's own sentence (or the keys and barred values), under the same head, with the seam still drawn - so a pair with one absent half is still one instrument divided.",
	},

	{
		component: "REGION",

		from: "EMPTY / LOADING",

		found: "A region whose record had not arrived rendered its index, its `h2` and its standfirst and then nothing: a heading with a hole under it, which reads as a page that failed to load rather than a region with a fact to state.",

		built: "`SurfaceRegion.state` (`rest` | `empty` | `loading`) with `empty` and `keys`: the two arms every other block in the family has, printed under the same head, in the record grammar - `◎ UNAVAILABLE` and a sentence, or the keys with their values barred. `dense` is the region inside a card or a pane.",
	},

	{
		component: "PAGESHELL",

		from: "NO RAIL / TWO RAILS",

		found: "The declaration strip printed what the LANGUAGE gives (`GIVES: RAIL␁MEASURE␁MARGIN`) over pages that had taken one, two or none of those tracks, so the strip could describe a page that did not exist - and the two-rail and no-rail compositions were invisible on the page itself.",

		built: "`PageShell` now prints a second fact, `TRACKS:`, counted from the slots that are actually present (`RAIL␁PAPER␁MARGIN`, `PAPER␁MARGIN`, `RAIL␁PAPER`). The language's offer and the page's take are two different facts and the strip states both. Printed only when a side track is present, because `PAPER` alone is not news.",
	},

	{
		component: "FRAME RAIL",

		from: "MANY / the register's own rule",

		found: "The dossier's thumb index printed `# INDEX:` over ten tabs and no figure - a register line without its count, which is the one defect `RegisterLine.ts` exists to remove, in the frame itself.",

		built: "`FrameRailCount` prints `FrameExtent` (`FrameSections.length`) after the label, separated by U+2001. In the 2.25rem column the tabs ARE the figure, so the count is hidden there and printed in the drawer, where the list needs its extent stated.",
	},

	{
		component: "REGISTER",

		from: "MANY",

		found: "A legend of eight states printed as eight stacked rows: a set read as a list, at the height of a page section, when the reader's job was to compare the words.",

		built: "`SurfaceState.columns={2}` reads the register across at 640px and above, and `dense` is its tight step. The rows keep their order - the columns fill left to right - so the array's reading order is the register's.",
	},

	{
		component: "ABSENT",

		from: "ERROR",

		found: "The absence's `NEXT:` row was its only action, so a failed request could state the way forward and not the retry - and `ShellState`'s error arm has had both since it was written.",

		built: "`SurfaceAbsent.retry` prints a `RETRY:` row under `NEXT:`, so a reader whose action failed is owed the command and the alternative in the same composition. `dense` is the absence inside a card or a pane.",
	},
];

/* ─── THE OBSERVATIONS ───────────────────────────────────────────────────── */

/** Something the exploration found that this card did not change, and whose it is. */
export interface Observation {
	/** The component the observation is about. */
	readonly component: string;

	/** What was found, in the sheet's voice. */
	readonly found: string;

	/** Whose decision it is, and what would settle it. */
	readonly owner: string;
}

export const Observations: readonly Observation[] = [
	{
		component: "PAGESHELL",

		found: "The reading language's `margin` slot is a `<div>` with an `aria-label` and no role. A register of apparatus is a landmark a reader navigates by, and an `aria-label` on a `div` announces nothing - but making it a `<complementary>` changes the landmark map of every reading page, and this card did not want to change a document's outline in the same edit as its grid.",

		owner: "A later card on the frame, with the owner's reading of the landmark map. The fix is one element and one prop (`marginRole`), and the `TRACKS:` fact now prints the slot's presence, so the page itself would show the change.",
	},

	{
		component: "SHELL",

		found: "The four app surfaces still print their maturity in their own words: the portal's `Coming Soon`, the download masthead's `Feature Gated`, the dashboard's `Disabled`. `Life` and `SurfaceLife` exist and are mounted on this sheet, but no live page declares `life` yet - the vocabulary has one renderer and no callers.",

		owner: "The four surface cards (portal, dashboard, verify, account). Each page passes `life={...}` to `SurfaceShell` and drops its adjective; the vocabulary is already there and `State.ts` is its one table.",
	},

	{
		component: "PANES",

		found: "`ShellPanes` takes two panes and a drawer, and the site's three-pane case (a tree, a document and an inspector) still composes as a pair plus a drawer - which is the block's answer, but not the only defensible one. A `layout=\"triple\"` would be a second composition with its own narrow behaviour.",

		owner: "The next workspace card. The exploration found no page that needs it today: the drawer holds the third instrument, and a third column at 640px would be three stacked panes.",
	},

	{
		component: "PLATE",

		found: "`ShellPlate` prints `FIGURE:` and `SOURCE:` as required props, and no page has ever mounted the `trace` arm outside `/Specimen`. The arm exists, is typed and is printed here - but a plate whose evidence is a value rather than a picture is still a composition the document has not used.",

		owner: "The 404's card and the verify surface, both of which print a value where a plate would go. The arm is ready; mounting it is a page decision.",
	},
];

/* ─── THE SPECIMENS ──────────────────────────────────────────────────────── */

/** One group of rows on the plate: the frame's own reading order. */
export type Group =
	"frames" | "panes" | "rails" | "plates" | "surfaces" | "states" | "edges";

/** Which block a row mounts. The renderer switches on it and on nothing else. */
export type Kind =
	| "pageshell"
	| "panes"
	| "rail"
	| "plate"
	| "shell"
	| "head"
	| "region"
	| "register"
	| "statusline"
	| "badges"
	| "chips"
	| "absent"
	| "life"
	| "state"
	| "edgeleaf"
	| "edgeturn"
	| "print";

/** What every row states, whatever block it mounts. */
export interface Spec {
	/** `FRAME_01` - the row's own mark, printed at its head. */
	readonly mark: string;

	/** The state or combination, in the sheet's register: `NO RAIL`, `AT 640`. */
	readonly state_name: string;

	/** The part's name in the sheet's register. */
	readonly component: string;

	/** One line saying when this state is right. The row's whole justification. */
	readonly when: string;

	/** Which block the row mounts. */
	readonly kind: Kind;
}

/** One specimen row: what it states, and what the renderer needs to mount it. */
export interface Specimen extends Spec {
	/**
	 * The stage's width: `narrow` is a real column (16rem), `wide` a wide band
	 * (60rem), `band` the plate's own measure (44rem), `card` a white box that
	 * stands in for a Jelly surface. The stage is the sheet's, not the block's -
	 * a block that is narrow because its container is narrow is the composition
	 * the row exists to print.
	 */
	readonly width?: "narrow" | "band" | "wide" | "card";

	/** The block's own dense arm. */
	readonly dense?: boolean;

	/** The arm or ratio the block should print, where the block has one. */
	readonly variant?: string;

	/** The sentence an empty or absent arm states. */
	readonly empty?: string;
}

/**
 * The rows, in reading order: the frame's compositions, then the panes, the
 * rails, the plates, the surface's own parts, the adverse states and the frame's
 * two edges.
 *
 * Every row is a state the site either uses or could use, and the `when` line is
 * the one thing a picture of a component cannot carry: the sentence that says
 * which composition is right. A row printed here that the site never needs is
 * still a row: a component that survives its own worst combination is a
 * component whose design frame is real.
 */
export const Specimens: readonly Specimen[] = [
	/* ── FRAMES ──────────────────────────────────────────────────────────── */
	{
		mark: "FRAME_01",

		state_name: "NO RAIL",

		component: "PAGESHELL",

		when: "A page whose only navigation is its header: the rail's track is dropped by `:has()` and the paper centres in the desk it is given, rather than sitting off-centre beside a column of nothing.",

		kind: "pageshell",

		variant: "norail",
	},

	{
		mark: "FRAME_02",

		state_name: "TWO RAILS",

		component: "PAGESHELL",

		when: "A document read with its contents on the left and its apparatus on the right: 13rem rail, desk, paper, desk, 16rem margin, with the margin converting to a sticky bar between 58 and 84rem rather than disappearing.",

		kind: "pageshell",

		variant: "tworails",

		width: "wide",
	},

	{
		mark: "FRAME_03",

		state_name: "IN A CARD",

		component: "PAGESHELL",

		when: "A shell inside a shell - a card that contains a page. The shell is a query container, so it re-composes at the card's width instead of overflowing: the composition the brief asked the frame to survive.",

		kind: "pageshell",

		variant: "incard",

		width: "card",
	},

	{
		mark: "FRAME_04",

		state_name: "AT 640",

		component: "PAGESHELL",

		when: "The same two-rail reading page at a phone's width: both rails become ruled registers above the paper, in reading order, and nothing is folded away.",

		kind: "pageshell",

		variant: "narrow",

		width: "narrow",
	},

	{
		mark: "FRAME_05",

		state_name: "ONE ARTIFACT",

		component: "PAGESHELL",

		when: "A page that is a single record: the declaration prints `DECLARES: NOTHING` and no tracks, because that is what is true.",

		kind: "pageshell",

		variant: "record",
	},

	{
		mark: "FRAME_06",

		state_name: "WORKSPACE",

		component: "PAGESHELL",

		when: "A place the reader operates: a 14rem rail and the panes beside it, read at no measure because a pane is as wide as the instrument inside it.",

		kind: "pageshell",

		variant: "workspace",

		width: "wide",
	},

	{
		mark: "FRAME_07",

		state_name: "AUDIT",

		component: "PAGESHELL",

		when: "A claim being checked: a 19rem ledger scoping the audit, the matrix taking every pixel the ledger does not, and the wells at the foot.",

		kind: "pageshell",

		variant: "audit",

		width: "wide",
	},

	{
		mark: "FRAME_08",

		state_name: "PLATE",

		component: "PAGESHELL",

		when: "One artifact and its provenance: a record head, then a full-bleed plate with its caption channel, and the bleed clipped at the window rather than widening the document.",

		kind: "pageshell",

		variant: "plate",

		width: "wide",
	},

	{
		mark: "FRAME_09",

		state_name: "INSET",

		component: "PAGESHELL",

		when: "A page whose opening caps at 64rem (the contact surface): the shell matches the page's own opening so the declaration strip and the `h1` share one left edge.",

		kind: "pageshell",

		variant: "inset",
	},

	/* ── PANES ───────────────────────────────────────────────────────────── */
	{
		mark: "PANE_01",

		state_name: "5/7",

		component: "SHELLPANES",

		when: "Two comparable readings, unequal: the instrument the reader came to operate takes the wider pane and the context takes the narrower, with one 1px seam between them.",

		kind: "panes",

		variant: "5-7",

		width: "wide",
	},

	{
		mark: "PANE_02",

		state_name: "7/5",

		component: "SHELLPANES",

		when: "The mirror: a workspace whose instrument IS the record - the tree, the ledger, the long list - and the thing beside it is the note.",

		kind: "panes",

		variant: "7-5",

		width: "wide",
	},

	{
		mark: "PANE_03",

		state_name: "1/1",

		component: "SHELLPANES",

		when: "Two panes that are genuinely equal - the only case where equal columns are right, and the only ratio a designer should have to justify.",

		kind: "panes",

		variant: "1-1",

		width: "wide",
	},

	{
		mark: "PANE_04",

		state_name: "STACKED BY CHOICE",

		component: "SHELLPANES",

		when: "An index above a surface: a list of N whose rows carry a note, over an embedded application that needs the column. The seam rotates at every width because the halves are not two comparable readings.",

		kind: "panes",

		variant: "stack",

		width: "wide",
	},

	{
		mark: "PANE_05",

		state_name: "AT 640",

		component: "SHELLPANES",

		when: "The pair at a phone's width: the seam rotates to a 1px horizontal rule at the same ink, the panes stack, and the primary pane stays first because it is the instrument the reader came for.",

		kind: "panes",

		variant: "narrow",

		width: "narrow",
	},

	{
		mark: "PANE_06",

		state_name: "ONE HALF ABSENT",

		component: "SHELLPANES",

		when: "A pair whose second instrument has not arrived: the pane states `STATUS: UNAVAILABLE` and why, and the seam stays drawn - a pair with one absent half is still one instrument divided.",

		kind: "panes",

		variant: "absent",

		width: "wide",
	},

	{
		mark: "PANE_07",

		state_name: "LOADING",

		component: "SHELLPANES",

		when: "A pane whose instrument is still being read: the keys are known before the values are, so the pane prints the schema and bars the values - no spinner, because a spinner says something is happening and a skeleton says what.",

		kind: "panes",

		variant: "loading",

		width: "wide",
	},

	{
		mark: "PANE_08",

		state_name: "DRAWER OPEN",

		component: "SHELLPANES",

		when: "The third instrument the reader consults rather than reads: a `<details>` spanning both panes at the foot, open when the page knows the reader came for the transcript.",

		kind: "panes",

		variant: "drawer",

		width: "wide",
	},

	/* ── RAILS ───────────────────────────────────────────────────────────── */
	{
		mark: "RAIL_01",

		state_name: "REST",

		component: "SHELLRAIL",

		when: "A register of destinations with its count: the mark column is reserved on every row, so fourteen labels line up whether or not a row carries a mark.",

		kind: "rail",

		width: "band",
	},

	{
		mark: "RAIL_02",

		state_name: "IN FORCE",

		component: "SHELLRAIL",

		when: "The reader's position: `aria-current`, ink at 500 and a 2px accent rule on the leading edge - three signals, one of them a colour, so the position survives greyscale.",

		kind: "rail",

		variant: "current",

		width: "band",
	},

	{
		mark: "RAIL_03",

		state_name: "STATEMENTS",

		component: "SHELLRAIL",

		when: "A rail whose rows are facts rather than destinations - a clause list's `§07`, a position's `03`: same grid, same mark column, no hover.",

		kind: "rail",

		variant: "statement",

		width: "band",
	},

	{
		mark: "RAIL_04",

		state_name: "ONE",

		component: "SHELLRAIL",

		when: "A rail of one: the register line's count says `01`, and the rail is still a rail rather than a link with a heading over it.",

		kind: "rail",

		variant: "one",

		width: "band",
	},

	{
		mark: "RAIL_05",

		state_name: "MANY",

		component: "SHELLRAIL",

		when: "Twenty-six rows: a rail is short enough to print, and a disclosure that hides the only navigation on a phone is a worse answer than a list.",

		kind: "rail",

		variant: "many",

		width: "narrow",
	},

	{
		mark: "RAIL_06",

		state_name: "GROUPS",

		component: "SHELLRAIL",

		when: "A rail of sections: each group carries its own sub-register line and its own count, and the labels still line up across every group - which is the only reason to group a register instead of stacking two rails.",

		kind: "rail",

		variant: "groups",

		width: "band",
	},

	{
		mark: "RAIL_07",

		state_name: "EMPTY",

		component: "SHELLRAIL",

		when: "A rail whose destinations have not been read: `STATUS: UNAVAILABLE` and the reason, inside the rail, under the register line that says how many there would be.",

		kind: "rail",

		variant: "empty",

		width: "band",
	},

	{
		mark: "RAIL_08",

		state_name: "LOADING",

		component: "SHELLRAIL",

		when: "A rail still being read: the keys with their values barred, static and `aria-hidden`, and the STATUS row carrying the announcement.",

		kind: "rail",

		variant: "loading",

		width: "band",
	},

	{
		mark: "RAIL_09",

		state_name: "DENSE",

		component: "SHELLRAIL",

		when: "A rail inside a drawer, a pane or a card: the same rows at the tight step, with the marks, the notes and the meta all still printed.",

		kind: "rail",

		variant: "dense",

		width: "narrow",

		dense: true,
	},

	{
		mark: "RAIL_10",

		state_name: "LONG",

		component: "SHELLRAIL",

		when: "A label that will not fit its column: the label wraps with `pretty` and the note under it, the meta stays `nowrap`, and the row's grid narrows the body rather than the value.",

		kind: "rail",

		variant: "long",

		width: "narrow",
	},

	{
		mark: "RAIL_11",

		state_name: "FOOT",

		component: "SHELLRAIL",

		when: "The rail's closing destination: a page the rail itself does not list, at the rail's foot, on the 2px/20% rule that moves to the ink on hover.",

		kind: "rail",

		variant: "foot",

		width: "band",
	},

	/* ── PLATES ──────────────────────────────────────────────────────────── */
	{
		mark: "PLATE_01",

		state_name: "IMAGE",

		component: "SHELLPLATE",

		when: "A plate whose evidence is a photograph: the frame is the same frame it is for a trace, because a plate does not change its shape because its evidence is a picture.",

		kind: "plate",

		variant: "image",

		width: "wide",
	},

	{
		mark: "PLATE_02",

		state_name: "TRACE",

		component: "SHELLPLATE",

		when: "A plate whose evidence is a printed value - the path that was asked for, the digest that was computed: the mark above, the value at the L tier, one line under it saying what the reader is looking at.",

		kind: "plate",

		variant: "trace",

		width: "wide",
	},

	{
		mark: "PLATE_03",

		state_name: "COMPOSED",

		component: "SHELLPLATE",

		when: "A plate whose evidence is a rendered element - a diagram, a receipt, a printed trace: the page passes it through the slot and the block frames it.",

		kind: "plate",

		variant: "slot",

		width: "wide",
	},

	{
		mark: "PLATE_04",

		state_name: "NO IMAGE",

		component: "SHELLPLATE",

		when: "A plate with no evidence at all: the absence is printed INSIDE the plate's frame at the plate's height - what would be here, why it is not, and the way forward - because an empty white field is the one thing a plate may never be.",

		kind: "plate",

		variant: "absence",

		width: "wide",
	},

	{
		mark: "PLATE_05",

		state_name: "BLEED: WINDOW",

		component: "SHELLPLATE",

		when: "A plate that IS the page: the `viewport` bleed runs past both gutters to the window's edges and is clipped by the shell, used once on the 404 where there is no measure to hold.",

		kind: "plate",

		variant: "bleed",

		width: "wide",
	},

	{
		mark: "PLATE_06",

		state_name: "TALL",

		component: "SHELLPLATE",

		when: "A plate with a height of its own: a figure that is as tall as its content disappears when its content is short, so the page states the height and the evidence centres in the field.",

		kind: "plate",

		variant: "tall",

		width: "band",
	},

	/* ── THE SURFACE'S OWN PARTS ─────────────────────────────────────────── */
	{
		mark: "SURFACE_01",

		state_name: "LIVE",

		component: "SURFACESHELL",

		when: "A surface that is open to every reader with its facts current: `STATUS: VERIFIED` for what it is doing, `LIFECYCLE: LIVE` for how far along it is - two questions, two registers, one page.",

		kind: "shell",

		variant: "live",

		width: "wide",
	},

	{
		mark: "SURFACE_02",

		state_name: "BETA",

		component: "SURFACESHELL",

		when: "A surface that is open and may still change under the reader: the word is `BETA`, the scale shows it one step in, and the gloss says what the reader is agreeing to.",

		kind: "shell",

		variant: "beta",

		width: "wide",
	},

	{
		mark: "SURFACE_03",

		state_name: "PLANNED",

		component: "SURFACEHEAD",

		when: 'A surface that is named and specified and not built: `PLANNED` is the word "Coming Soon" was reaching for, and the gloss says nothing on it can be used yet.',

		kind: "head",

		variant: "planned",

		width: "wide",
	},

	{
		mark: "SURFACE_04",

		state_name: "RETIRED",

		component: "SURFACEHEAD",

		when: 'A surface that was live and is closed: `RETIRED` is the word "Disabled" was reaching for, and the register keeps the page\'s facts readable because a retired surface is still a record.',

		kind: "head",

		variant: "retired",

		width: "wide",
	},

	{
		mark: "SURFACE_05",

		state_name: "LIFECYCLE: UNAVAILABLE",

		component: "SURFACELIFE",

		when: "A surface whose maturity the build cannot state - and a caller that handed in an adjective instead of a word: the fifth word is the honest answer, and the block says which words the adjective was reaching for.",

		kind: "life",

		variant: "adjective",

		width: "band",
	},

	{
		mark: "SURFACE_06",

		state_name: "REGION: EMPTY",

		component: "SURFACEREGION",

		when: "A region whose record has not been filed: the index, the `h2` and the standfirst stay, and the body states `STATUS: UNAVAILABLE` with what would be there - a heading with a hole under it reads as a page that failed.",

		kind: "region",

		variant: "empty",

		width: "band",
	},

	{
		mark: "SURFACE_07",

		state_name: "REGION: LOADING",

		component: "SURFACEREGION",

		when: "A region whose record is still being read: the keys the region will print, their values barred, under the same head.",

		kind: "region",

		variant: "loading",

		width: "band",
	},

	{
		mark: "SURFACE_08",

		state_name: "REGISTER: TWO COLUMNS",

		component: "SURFACESTATE",

		when: "A legend of the eight state words: a set read across, in two columns above 640px, with the rows keeping their array order.",

		kind: "register",

		variant: "two",

		width: "wide",
	},

	{
		mark: "SURFACE_09",

		state_name: "STATUS LINE",

		component: "SURFACESTATUSLINE",

		when: "The readout every app surface shares: the state word, then the declarations that make it auditable - the route it is read at, the source that produced it, the date the page was built.",

		kind: "statusline",

		width: "wide",
	},

	{
		mark: "SURFACE_10",

		state_name: "BADGES",

		component: "SURFACEBADGE",

		when: "One word on a Jelly badge, tinted from the semantic token of the thing it describes: a live claim carries its dot after U+2001, and a plan or a licence carries none because nothing is running yet.",

		kind: "badges",

		width: "band",
	},

	{
		mark: "SURFACE_11",

		state_name: "CHIPS",

		component: "SURFACECHIPS",

		when: "A record's states as one run: every chip carries the state square and the tone's ink on the neutral mute fill, so five states never look like five copies of one fact.",

		kind: "chips",

		width: "band",
	},

	{
		mark: "SURFACE_12",

		state_name: "ABSENT: RETRY",

		component: "SURFACEABSENT",

		when: "A record whose read failed: `NEXT:` is the way forward and `RETRY:` is the same action tried again - a reader whose request failed is owed both, in the same composition.",

		kind: "absent",

		variant: "retry",

		width: "band",
	},

	{
		mark: "SURFACE_13",

		state_name: "ABSENT: DENSE",

		component: "SURFACEABSENT",

		when: "The same absence inside a card or a pane: the three rows at the tight step, so an absence inside an artifact does not become the artifact's largest object.",

		kind: "absent",

		variant: "dense",

		width: "card",

		dense: true,
	},

	/* ── THE ADVERSE STATES ──────────────────────────────────────────────── */
	{
		mark: "STATE_01",

		state_name: "DENSE",

		component: "SHELLSTATE",

		when: "An adverse state inside a card or a pane: the same rows and the same key column at a narrower measure, one step less air, and nothing dropped.",

		kind: "state",

		variant: "dense",

		width: "card",

		dense: true,
	},

	{
		mark: "STATE_02",

		state_name: "BARE, IN A CARD",

		component: "SHELLSTATE",

		when: "A state printed on a card's own surface: no fill, no frame, no padding - a white box inside a white card is a card in a card.",

		kind: "state",

		variant: "bare",

		width: "card",
	},

	{
		mark: "STATE_03",

		state_name: "PARTIAL, WITH FACTS",

		component: "SHELLSTATE",

		when: "A reading that has some of its facts: the ones it has are printed as a compact ledger, the one it does not is `UNAVAILABLE` - never a zero, because zero is a measurement.",

		kind: "state",

		variant: "partial",

		width: "band",
	},

	/* ── THE FRAME'S EDGES ───────────────────────────────────────────────── */
	{
		mark: "EDGE_01",

		state_name: "UNFILED",

		component: "EDGELEAF",

		when: "A page that is not a sheet of the document: `◎ NOT FILED`, `PART: ◎ NONE`, and the route printed in full so the reader knows what they asked for.",

		kind: "edgeleaf",

		variant: "unfiled",

		width: "wide",
	},

	{
		mark: "EDGE_02",

		state_name: "STALE",

		component: "EDGELEAF",

		when: "A sheet whose facts are older than the build: `◎ STALE` and `AGE: n DAYS` under the date that is being dated - a date belongs at the end of what it dates.",

		kind: "edgeleaf",

		variant: "stale",

		width: "wide",
	},

	{
		mark: "EDGE_03",

		state_name: "NO NEXT SHEET",

		component: "EDGETURN",

		when: "The last part of the document: the catchword names the colophon, because the colophon is what actually comes next, and the folio states the extent.",

		kind: "edgeturn",

		variant: "index",

		width: "wide",
	},

	{
		mark: "EDGE_04",

		state_name: "RECORD END",

		component: "EDGETURN",

		when: "A turn whose destination has left the build: `◎ TARGET GONE` plus `WAS:` - a tombstone in the record grammar, not a dead link.",

		kind: "edgeturn",

		variant: "missing",

		width: "wide",
	},

	{
		mark: "EDGE_05",

		state_name: "PRINT",

		component: "PRINTRECORD",

		when: "The colophon's print row: the command, its `↳` contract, the no-JavaScript fallback and the paper arm - a dossier is the kind of document that gets printed.",

		kind: "print",

		width: "band",
	},
];

/**
 * The group a row belongs to, read from its mark's series.
 *
 * The mark IS the filing: `FRAME_03` is a frame, `RAIL_07` a rail. Deriving the
 * group from it means a row cannot be filed in one group and printed in another -
 * the same rule the register follows, where a count cannot outlive the rows it
 * counts. A mark outside the seven series is a row that has not been filed, and
 * the plate would print it nowhere, which is the defect the series removes.
 */
const GroupOf = (Row: Specimen): Group | undefined => {
	const Series = Row.mark.slice(0, Row.mark.indexOf("_"));

	switch (Series) {
		case "FRAME":
			return "frames";

		case "PANE":
			return "panes";

		case "RAIL":
			return "rails";

		case "PLATE":
			return "plates";

		case "SURFACE":
			return "surfaces";

		case "STATE":
			return "states";

		case "EDGE":
			return "edges";

		default:
			return undefined;
	}
};

/** The rows in one group, in reading order. */
export const InGroup = (Group: Group): readonly Specimen[] =>
	Specimens.filter((Row) => GroupOf(Row) === Group);

/** The groups, in the plate's order, with the line that says what each one asks. */
export const Groups: readonly { key: Group; label: string; note: string }[] = [
	{
		key: "frames",

		label: "/THE FRAMES",

		note: "The five languages and the three compositions the brief named: no rail, two rails, a shell inside a shell, the same page at 640px, and the one-artifact page that declares nothing.",
	},

	{
		key: "panes",

		label: "/THE PANES",

		note: "Two instruments with one seam: the three ratios, the stack that is a choice rather than a fallback, the pair at 640px, and the arms a pair needs when one half has not arrived.",
	},

	{
		key: "rails",

		label: "/THE RAILS",

		note: "One register of destinations in every state it has: rest, in force, statements, one row, twenty-six, groups, empty, loading, dense, long and the closing foot.",
	},

	{
		key: "plates",

		label: "/THE PLATES",

		note: "The plate's five arms and its two bleeds - including the one the brief named by hand: a plate with no image, which is now a composition rather than an empty frame.",
	},

	{
		key: "surfaces",

		label: "/THE SURFACES",

		note: "The app surface's own parts: the lifecycle vocabulary at work, a region's two adverse arms, the register read across, the shared readout, the badge and chip runs and the absence's retry.",
	},

	{
		key: "states",

		label: "/THE STATE ARMS",

		note: "The three readings of the nine adverse states the sheet's own band does not print: the dense step, the bare arm inside a card, and a partial reading that keeps the facts it has.",
	},

	{
		key: "edges",

		label: "/THE EDGES",

		note: "The frame's first band and its last: the leaf's unfiled and stale arms, the turn's two dead ends, and the colophon's print row.",
	},
];

/** How many rows the plate prints. */
export const SpecimenCount = Specimens.length;
