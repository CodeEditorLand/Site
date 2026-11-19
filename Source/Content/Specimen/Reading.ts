/**
 * Reading - the doc, reading and detail family's state matrix, its specimens,
 * and what the exploration changed.
 *
 * ─── WHY THIS FAMILY NEEDS ITS OWN MATRIX ─────────────────────────────────
 * The ledger family is BELIEVED, the display family is READ, the overlay family
 * is DISMISSED, the narrative family is TOLD, the frame family is SAT IN. This
 * family is the FURNITURE of a reader: the rail that says where you are in the
 * manual, the contents that say where you are in the page, the card that files
 * a page, the article that prints it, the appendix that closes the index, the
 * folio that says where you have got to, and the cross-reference that says where
 * else the subject is said.
 *
 * A frame fails by holding nothing or too much. Furniture fails by LOSING THE
 * READER: a contents rail that is a wall of ninety rows, a marked row scrolled
 * out of its register, a folio that runs past the band it closes, a card whose
 * page has no description and which therefore closes up, a layer of one that
 * prints nothing at all. Every one of those is a cell below.
 *
 * Fourteen components, twenty-four conditions, three hundred and thirty-six
 * cells. Every cell that cannot exist carries a sentence saying why, because a
 * blank cell in a matrix of dispositions is the same defect as a blank cell in
 * a ledger: an excuse where a fact belongs.
 *
 * ─── WHAT THE FAMILY'S OWN BRIEF ASKED FOR ────────────────────────────────
 * "Explore a document with one section, a document with ninety, a heading
 * longer than the rail, an article with no summary, a foot with no
 * cross-references, a detail strip at 640px. Then improve what the exploration
 * shows: a contents rail that can collapse, a folio that survives a long source
 * path, an index card with a missing description."
 *
 * The six compositions are columns of the `composition` group; the three named
 * improvements are entries in `Improvements`, each with the cell behind it.
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

	/** The column head, in the sheet's register: `NO SUMMARY`, `AT 640`. */
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
 * The twenty-four columns, in reading order.
 *
 * Nine conditions first, because they are the states a reader meets; then six
 * shapes, because they are what a piece of furniture is asked to hold; then
 * seven compositions, because six of them are the ones this family's brief
 * named by hand and the seventh - a page with no rail - is the one the family
 * must survive without; then two contexts, because they are the ones a designer
 * forgets - the action the block carries and the medium it is printed on.
 */
export const Columns: readonly Column[] = [
	{ key: "rest", label: "REST", ask: "untouched", group: "condition" },

	{ key: "empty", label: "EMPTY", ask: "holds nothing", group: "condition" },

	{
		key: "loading",
		label: "LOADING",
		ask: "has not arrived",
		group: "condition",
	},

	{
		key: "partial",
		label: "PARTIAL",
		ask: "one fact unknown",
		group: "condition",
	},

	{ key: "error", label: "ERROR", ask: "a read failed", group: "condition" },

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

	{ key: "dense", label: "DENSE", ask: "the tight arm", group: "condition" },

	{ key: "one", label: "ONE", ask: "a set of one", group: "shape" },

	{ key: "many", label: "MANY", ask: "ninety or twenty-six", group: "shape" },

	{
		key: "long",
		label: "LONG",
		ask: "a line past its column",
		group: "shape",
	},

	{ key: "narrow", label: "NARROW", ask: "a narrow column", group: "shape" },

	{ key: "wide", label: "WIDE", ask: "a wide band", group: "shape" },

	{
		key: "incard",
		label: "IN A CARD",
		ask: "inside a white insert",
		group: "shape",
	},

	{
		key: "onesection",
		label: "ONE SECTION",
		ask: "a document with one",
		group: "composition",
	},

	{
		key: "ninety",
		label: "NINETY",
		ask: "a document with ninety",
		group: "composition",
	},

	{
		key: "longheading",
		label: "LONG HEADING",
		ask: "wider than the rail",
		group: "composition",
	},

	{
		key: "nosummary",
		label: "NO SUMMARY",
		ask: "an article with none",
		group: "composition",
	},

	{
		key: "noxref",
		label: "NO X-REF",
		ask: "a foot with no see-also",
		group: "composition",
	},

	{
		key: "at640",
		label: "AT 640",
		ask: "a detail strip at 640px",
		group: "composition",
	},

	{
		key: "norail",
		label: "NO RAIL",
		ask: "a page with no rail",
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
	/** `DOCCONTENTS` - the row's name in the sheet's register. */
	readonly name: string;

	/** The file the part is, relative to `Source/`, upper case. */
	readonly file: string;

	/** One line: what the part is, in the sheet's voice. */
	readonly note: string;

	/**
	 * The cells this row overrides. Everything not listed is `BUILT`, because a
	 * family that renders its own happy state everywhere should not have to say
	 * so three hundred times - and a default of `built` makes every exception a
	 * sentence someone had to write.
	 */
	readonly cells: Readonly<Record<string, Cell>>;
}

/** The reason a printed block is never a control. */
const NotAControl = (what: string): Cell =>
	NotApplicable(
		`A ${what} is not a control: it renders props, ships no script and holds no input, so there is no control state for \`disabled\` to be the absence of.`,
	);

/** The reason a printed block is read-only by construction. */
const ReadOnly = (what: string): Cell =>
	NotApplicable(
		`A ${what} is read-only by construction - it is markup and CSS with nothing to edit - so \`read-only\` names no arm this block could have.`,
	);

/** The reason a leaf is one thing and cannot be a set. */
const NotASet = (what: string, set: string): Cell =>
	NotApplicable(
		`A ${what} is one object by definition; a set is ${set}, and a block that answered both would be two blocks with one name.`,
	);

/** The reason a build-time block has no loading state. */
const BuildTime = (what: string, why: string): Cell =>
	NotApplicable(
		`A ${what} is read at build time: ${why} so there is no state in which the block exists and its content has not arrived.`,
	);

/** The reason a printed register carries no as-of of its own. */
const NoAsOf = (what: string, whose: string): Cell =>
	NotApplicable(
		`A ${what} carries no as-of of its own: an age belongs to ${whose}, and a block that invented one would be the one figure on the page with no source.`,
	);

/** The reason a summary is not this block's fact. */
const NotASummary = (whose: string): Cell =>
	NotApplicable(
		`A summary is ${whose}: this block never prints one, so its absence changes nothing here - which is the cell's answer, not an evasion.`,
	);

/** The reason a cross-reference is not this block's fact. */
const NotAXref = (whose: string): Cell =>
	NotApplicable(
		`A cross-reference is ${whose}: the register that prints one is \`See\`, and a second block with a see-also would be a second voice saying the same sentence.`,
	);

/**
 * The fourteen components, in the order a page meets them: the shell that holds
 * the reading column, the contents that say where you are in it, the index that
 * files the manual, the appendices that close it, the viewer at the tree's edge,
 * the reading surface the legal set wears, and the four pieces of apparatus that
 * close a band.
 *
 * Every row's overrides are reasons. A row with no overrides would be a part that
 * survives every combination, and no part does.
 */
export const Rows: readonly Row[] = [
	{
		name: "DOCLAYOUT",

		file: "COMPONENT/DOC/DOCLAYOUT.ASTRO",

		note: "The documentation column: the rail's two registers beside the paper, the apparatus at the page's right edge, and the same tree as a panel below 1024.",

		cells: {
			disabled: NotAControl("documentation shell"),

			readonly: ReadOnly("shell"),

			loading: BuildTime(
				"documentation shell",
				"the rail, the paper and the margin are server-rendered and the one island inside it (the mobile tree) hydrates over rows the server already printed",
			),

			stale: NoAsOf("shell", "the page's apparatus - a folio, a ledger row"),

			empty: Built(
				"`sections` empty prints `◎` and the sentence where the tree would be, in both the rail and the panel; the head prints no contents at all",
			),

			partial: Built(
				"a page with contents and no apparatus: the margin track is added by `:has()` and never reserved, so the paper centres in the desk it has",
			),

			error: Built(
				"the failure belongs to the paper inside it (`DocArticle.state`), and the rail is unaffected - which is the point of the shell owning no content",
			),

			dense: Built(
				"`contentsDense` halves the contents register's air; the shell's five tracks are unchanged",
			),

			one: Built("a rail of one section: the head and the tree each hold one row"),

			many: Built(
				"an 81-row tree scrolls in its own register with `overscroll-behavior: contain`; the page never grows",
			),

			long: Built(
				"the rail is sized in `ch` (26ch), so a label wraps under its own marker instead of widening the track",
			),

			narrow: Built(
				"below 1024 the rail is not painted; the tree is the panel above the paper",
			),

			wide: Built(
				"at 84rem of desk the apparatus leaves the bar and becomes a third column at the page's right edge",
			),

			incard: NotApplicable(
				"A documentation shell is a page's container, not a record's surface: inside a card it would print a page's rail inside a record. The composition the frame family prints as `IN A CARD` is `PageShell`'s, and this shell is not one.",
			),

			onesection: Built(
				"the head prints one row, the disclosure prints one row, and the tree takes the rest of the rail",
			),

			ninety: Built(
				"the contents register folds itself (`contentsFold: auto` above 24 rows) and goes dense, so the tree keeps the rail's scroll",
			),

			longheading: Built(
				"a heading longer than the rail wraps under its marker in both registers; the rail's width is a `ch` floor, not a guess",
			),

			nosummary: NotASummary("`DocArticle`'s"),

			noxref: NotAXref("`BandFoot`'s"),

			at640: Built(
				"both registers become ruled sections above the paper, in reading order, and nothing is folded away",
			),

			norail: NotApplicable(
				"This block IS the rail: a rail's own rail count is not a composition it has. The page that has no rail is the Rust surface, and it wears `DocArticle` without this shell.",
			),

			withaction: Built(
				"the foot's `/Doc/Rust` link is the rail's one action, and the rows are the reader's",
			),

			print: Built(
				"the rail prints; the sticky behaviour and the two scroll registers are the browser's",
			),
		},
	},

	{
		name: "DOCARTICLE",

		file: "COMPONENT/DOC/DOCARTICLE.ASTRO",

		note: "The reading shell every documentation surface shares: breadcrumb, kicker, the page's one h1, standfirst, the metadata strip, the plate, the contents and the paper.",

		cells: {
			disabled: NotAControl("article shell"),

			readonly: ReadOnly("shell"),

			empty: Built(
				'`state="empty"` prints the paper\'s absence under the same head, strip and measure: `◎`, the page\'s sentence and `STATUS: UNAVAILABLE`',
			),

			loading: Built(
				'`state="loading"` prints the keys with their values barred, under the same head - the schema arrives before the prose',
			),

			partial: Built(
				"a strip field the build cannot fill prints `UNAVAILABLE` with the `quiet` tone; the field stays, the value says so",
			),

			error: Built(
				"a failed read is the empty arm with the page's own sentence; the strip's `STATUS:` is where the vocabulary is printed",
			),

			stale: Built(
				"`UPDATED:` is a strip field: an old date is the field's value, not a second design",
			),

			dense: NotApplicable(
				"A reading shell has no tight step: the measure and the prose rhythm are the article's, and a denser article is a shorter article - which is an edit, not a state.",
			),

			one: NotASet("article shell", "one page's paper"),

			many: NotASet("article shell", "one page's paper"),

			long: Built(
				"the title balances at the L tier and the standfirst is capped at `--Measure`; the strip wraps between fields, never inside one",
			),

			narrow: Built(
				"one column below the rail's breakpoint; the contents become the disclosure between the strip and the paper",
			),

			wide: Built(
				"`measure={false}` drops the body cap for the index's card grid and the Rust viewer, and nothing else",
			),

			incard: NotApplicable(
				"An article shell is a page's column: inside a card it would print a page inside a record. The paper it prints is already the white insert the card would be.",
			),

			onesection: Built(
				"`BuildDocToc` returns null and the shell renders no contents at all - never an empty nav",
			),

			ninety: Built(
				"the contents list scrolls in the rail's head; the disclosure stays one row",
			),

			longheading: Built(
				"the `h1` balances; a heading longer than the rail wraps in the contents row instead of widening it",
			),

			nosummary: Built(
				"with no standfirst the header prints the kicker, the title and then the strip, which becomes the opening fact - the one case where the page's first sentence is a `KEY:` row",
			),

			noxref: NotAXref("`BandFoot`'s"),

			at640: Built(
				"one column, the disclosure above the paper, the strip wrapping between fields",
			),

			norail: Built(
				"the Rust page's composition: the shell without `DocLayout`, owning its own container",
			),

			withaction: NotApplicable(
				"The shell prints no action: the pager at the foot is the page's, and the shell's slot is prose. A control inside the header would be a control inside a nameplate.",
			),

			print: Built(
				"the header, the strip and the prose print; the wells keep their frames because their frame is a border, not a shadow",
			),
		},
	},

	{
		name: "DOCCONTENTS",

		file: "COMPONENT/DOC/DOCCONTENTS.ASTRO",

		note: "The page's own contents, in two registers: the pinned head of the rail, and the CSS-only disclosure in the flow below the rail's breakpoint.",

		cells: {
			disabled: NotAControl("contents register"),

			readonly: ReadOnly("register"),

			empty: Built(
				"no toc, or an empty one, renders nothing at all - an empty nav is worse than none",
			),

			loading: BuildTime(
				"contents register",
				"the rows are the headings `render()` reported, so the list and the document are written in the same pass",
			),

			partial: Built(
				"a heading the pipeline gave no id cannot enter the list: `BuildDocToc` files only headings it has slugs for, so a row cannot point at nothing",
			),

			error: NotApplicable(
				"A contents list cannot fail on its own: its rows are the document's headings, and a page whose headings failed has no list to print - the paper's absence is `DocArticle`'s arm.",
			),

			stale: NoAsOf("contents register", "the page's folio or its strip"),

			dense: Built(
				"`dense` halves the row's air: 90 rows at the reading step are 4,000px of rail, at the dense step 2,600px. The marker column and the reserved 2px rule are untouched",
			),

			one: Built(
				"a one-section document prints one row and the register counts `01`",
			),

			many: Built(
				"ninety rows: the register counts `90`, goes dense, folds, and the marked row is scrolled into the register when it crosses out of it",
			),

			long: Built(
				"the name wraps under its marker; the marker column is `3ch` so the names hang on one edge whatever the numbers are",
			),

			narrow: Built(
				"below 1024 the disclosure register is the only one painted, collapsed by default",
			),

			wide: Built(
				"the rail register is a 26ch column; the disclosure caps at `--Measure` because it sits on the paper's edge",
			),

			incard: NotApplicable(
				"A contents register is a rail's head or a page's disclosure: inside a card it would be a second navigation inside a record, and the card is already the way in.",
			),

			onesection: Built("one row in the rail, one row in the disclosure"),

			ninety: Built(
				"the register folds itself above 24 rows and goes dense; `Contents.ts` keeps the marked row inside the register's box",
			),

			longheading: Built(
				"the row wraps to two lines and the marker stays on the first, because the marker column is its own grid track",
			),

			nosummary: NotASummary("`DocArticle`'s"),

			noxref: NotAXref("`BandFoot`'s"),

			at640: Built("the disclosure, collapsed, one row at the paper's measure"),

			norail: Built(
				"the disclosure IS the no-rail register: it is what an article prints when there is no rail to pin a list to",
			),

			withaction: Built("every row is a jump link to an id the pipeline wrote"),

			print: Built("the disclosure prints open; the rail's register prints as the list it is"),
		},
	},

	{
		name: "DOCCONTENTSLIST",

		file: "COMPONENT/DOC/DOCCONTENTSLIST.ASTRO",

		note: "The rows of the page's own contents: a two-digit marker, the heading's own words, and the id the markdown pipeline wrote.",

		cells: {
			disabled: NotAControl("contents list"),

			readonly: ReadOnly("list"),

			empty: Built(
				"`items` empty prints an empty `<ol>`; the block above refuses to mount it with none, so the arm exists and is never reached by a page",
			),

			loading: BuildTime(
				"contents list",
				"the rows are the document's headings and the ids are the pipeline's, written in the same pass",
			),

			partial: NotApplicable(
				"A row is a heading: the pipeline that writes the id writes the text, so a row with a name and no target cannot be built - and a row with a target and no name would be an anchor a screen reader announces as empty.",
			),

			error: NotApplicable(
				"A list of anchors has no failure arm: a target that moved is a broken anchor the page prints, not a state the list can invent.",
			),

			stale: NoAsOf("contents list", "the page's folio or its strip"),

			dense: Built(
				"the tight step is the parent's class (`.doc-contents--dense .doc-contents__link`); the list's own anatomy does not change, which is why the two registers cannot drift",
			),

			one: Built("one row"),

			many: Built(
				"ninety rows: the marker column holds two digits and grows to three without moving the names",
			),

			long: Built("the name wraps under its marker, never under the marker's own column"),

			narrow: Built("the row is a two-track grid at any width"),

			wide: Built("the row keeps the marker's 3ch column whatever the band's width"),

			incard: NotApplicable(
				"A list of in-page anchors is a register of a document: inside a card it would be navigation inside a record.",
			),

			onesection: Built("one row"),

			ninety: Built("ninety rows, numbered `01`..`90`, with the third digit reserved by `ch`"),

			longheading: Built("the row wraps to two lines"),

			nosummary: NotASummary("`DocArticle`'s"),

			noxref: NotAXref("`BandFoot`'s"),

			at640: Built("the same two-track row inside the disclosure"),

			norail: Built("the disclosure's list"),

			withaction: Built("every row is an anchor"),

			print: Built("the list prints as an ordered list"),
		},
	},

	{
		name: "DOCLAYER",

		file: "COMPONENT/DOC/DOCLAYER.ASTRO",

		note: "The layer a page belongs to, as a closed disclosure at the foot of the article: `LAYER:`, the section's name, its size and the way in.",

		cells: {
			disabled: NotAControl("layer map"),

			readonly: ReadOnly("map"),

			empty: Built(
				"`entries` empty renders nothing at all: a layer with no pages is not a layer, and a disclosure over nothing is the one thing this block may not print",
			),

			loading: BuildTime(
				"layer map",
				"the entries are the section's pages in collection order, passed by the page",
			),

			partial: Built(
				"a layer whose entries the page could not read prints the count it has; the missing page is the page's own tombstone, not a row this block invents",
			),

			error: NotApplicable(
				"A map has no failure arm: the pages either exist in the collection or they do not, and a disclosure that could not read them is the empty arm.",
			),

			stale: NoAsOf("layer map", "the page's folio"),

			dense: NotApplicable(
				"A disclosure row has no tight step: closed it is one line at chapter distance, and a denser row would be a row in the prose above it.",
			),

			one: Built(
				"a layer of one prints the row without the disclosure: `LAYER:`, the section and `1 PAGE`, and no glyph, because there is nothing to open",
			),

			many: Built(
				"fifteen rows open into two columns at 1024 and up; the closed row is still one line",
			),

			long: Built("the name wraps inside its row; the count stays at the row's end"),

			narrow: Built("one column, and the summary wraps between its fields"),

			wide: Built("the opened list is two columns"),

			incard: NotApplicable(
				"A layer map closes an article: inside a card it would be a map inside a record, and the article above it is the surface.",
			),

			onesection: Built("the solo arm: one page, stated, with nothing to open"),

			ninety: Built(
				"the opened list holds ninety rows; closed it is still one line, which is the composition decision this block exists for",
			),

			longheading: Built("the row's name wraps; the summary's fields wrap between themselves"),

			nosummary: NotASummary("`DocArticle`'s"),

			noxref: NotAXref("`BandFoot`'s"),

			at640: Built("one column, closed by default"),

			norail: Built("the layer is the article's foot, printed with or without a rail"),

			withaction: Built("the summary is the action; every opened row is a link"),

			print: Built("the disclosure prints open, so a printed article ends on its map"),
		},
	},

	{
		name: "DOCINDEX",

		file: "COMPONENT/DOC/DOCINDEX.ASTRO",

		note: "One chapter of the documentation index: a bare band with its kicker and count, then the chapter's card grid.",

		cells: {
			disabled: NotAControl("chapter"),

			readonly: ReadOnly("chapter"),

			empty: NotApplicable(
				"An index section with no rows is dropped by `BuildDocIndex` before it reaches this block: an empty chapter is not a chapter, and a band with a count of zero would be a chapter that apologises for itself.",
			),

			loading: BuildTime(
				"chapter",
				"the rows are the collection's pages, read at build time and ordered by `SectionOrder`",
			),

			partial: Built(
				"a card whose page has no `description` prints `◎ DESCRIPTION: UNAVAILABLE` in the card's body slot, so the grid's rows stay the same height and the missing fact is stated",
			),

			error: NotApplicable(
				"A chapter has no failure arm: the pages it files are the collection's, and a collection that could not be read is a build that does not run.",
			),

			stale: NoAsOf("chapter", "each card's page - its strip, its folio"),

			dense: NotApplicable(
				"The chapter is a band and a grid: its density is the grid's capacity line (`--row-floor`), not a tight step, and a denser grid is a narrower card.",
			),

			one: Built("a chapter of one card is a grid of one, at the same card floor"),

			many: Built(
				"a chapter of sixteen wraps by the capacity line; the kicker's count is the chapter's own `Rows.length`",
			),

			long: Built(
				"the card's title balances and its note wraps at 62ch; the kicker wraps between its fields",
			),

			narrow: Built("one card per row below the grid's floor"),

			wide: Built("three across at the desk's width; the card floor is the title's measure plus the inset"),

			incard: NotApplicable(
				"A chapter is a band wrapping a grid: inside a card it would be a page's chapter inside a record, and a card inside a card is the one composition the identity forbids.",
			),

			onesection: Built("the index's smallest chapter: one card under one `h2`"),

			ninety: Built(
				"ten chapters holding eighty-one cards; each chapter counts itself in its kicker and the closing archive counts the sections",
			),

			longheading: Built(
				"the chapter's `h2` balances and the kicker wraps; the count stays with its label",
			),

			nosummary: Built(
				"the card is where a missing description is stated, so a chapter of pages without summaries prints a grid of honest cards rather than a grid of holes",
			),

			noxref: NotAXref("`BandFoot`'s"),

			at640: Built("one card per row, the chapter's kicker above it"),

			norail: Built(
				"the index renders without the rail on the baseline composition: `mobile={false}`, because the card grid IS the navigation",
			),

			withaction: Built("the whole card is the anchor, so the grid is the way in"),

			print: Built("the grid prints; the card's hover ink is the browser's"),
		},
	},

	{
		name: "DOCCARD",

		file: "COMPONENT/DOC/DOCCARD.ASTRO",

		note: "One card of the index: a title, the page's description under it, and the whole card as the way in.",

		cells: {
			disabled: NotAControl("card"),

			readonly: ReadOnly("card"),

			empty: Built(
				"no `Note` prints `◎ DESCRIPTION: UNAVAILABLE` in the note's own slot, at the note's own size - the card keeps the set's row height",
			),

			loading: BuildTime(
				"card",
				"the card renders one page's record, and the record is the collection's",
			),

			partial: Built("the same arm as `empty`: the title is a fact, the description is not, and the card states which is which"),

			error: NotApplicable(
				"A card has no failure arm: it renders one page's label, note and href, and a page whose record failed is a page that is not in the collection.",
			),

			stale: NoAsOf("card", "the page it leads to - its strip, its folio"),

			dense: NotApplicable(
				"A card's density is the grid's: the capacity line decides how many fit, and a card with less air inside is a card whose note is closer to its title for no reason.",
			),

			one: NotASet("card", "a chapter's grid, which is `DocIndex`'s"),

			many: Built("a set of sixteen is sixteen of these, at the grid's floor"),

			long: Built("the title balances; the note wraps at 62ch"),

			narrow: Built("the card is one column and its inset is the group's"),

			wide: Built("the feature card (`level={2}`) takes the group inset and the L title"),

			incard: NotApplicable(
				"A card IS a record's surface: a card inside a card is the one composition the identity forbids, and the card's `jelly-card` is already the surface it sits on.",
			),

			onesection: Built("a chapter of one is one card"),

			ninety: Built("the index's eighty-one cards are eighty-one of these"),

			longheading: Built("the title balances and wraps inside the card's inset"),

			nosummary: Built(
				"a page with no description is the card's own missing-fact arm: `◎ DESCRIPTION: UNAVAILABLE`, in the note's slot, in the meta voice",
			),

			noxref: NotAXref("`BandFoot`'s"),

			at640: Built("one card per row, the note under the title"),

			norail: Built("a card is inside the paper, not beside the rail"),

			withaction: Built("the card's anchor fills the surface, so the whole card is the target"),

			print: Built("the card prints; the hover ink is the browser's"),
		},
	},

	{
		name: "DOCAPPENDIX",

		file: "COMPONENT/DOC/DOCAPPENDIX.ASTRO",

		note: "One of the three artifacts that close the index: a heading, a lede, and a panel of destinations that print as badges, a list or a tile grid.",

		cells: {
			disabled: NotAControl("appendix panel"),

			readonly: ReadOnly("panel"),

			empty: Built(
				'`state="empty"` prints the panel\'s absence under the same heading and lede: `◎` and the sentence, in the panel\'s own grammar',
			),

			loading: Built('`state="loading"` prints the keys with their values barred, under the same heading'),

			partial: Built(
				"the architecture strip with no `Index` prints `◎ STATUS: UNAVAILABLE` instead of an empty badge run - a strip that read the panel and not its elements says so",
			),

			error: NotApplicable(
				"A failed read is the empty arm: the panel states what would be here, and there is no retry a printed page can offer - the retry is a rebuild.",
			),

			stale: NoAsOf("appendix panel", "the page's folio or the record it reads"),

			dense: NotApplicable(
				"The panel is one artifact at the band's rhythm; a denser panel is a table, and the site has one of those where it means a comparison.",
			),

			one: Built("the backend panel with one worker: one row, its link and its sentence"),

			many: Built("fifteen badges wrap; twelve tiles take two columns; four workers take one row each"),

			long: Built("the lede caps at 62ch; a tile's note wraps under its label"),

			narrow: Built("the tiles stack and the workers print one per line"),

			wide: Built("the tiles are two columns at the desk's width"),

			incard: NotApplicable(
				"The panel IS the surface: a card inside the panel would be a card inside a card, and the appendix's `h2` above it already opens the subject.",
			),

			onesection: Built("an appendix of one destination"),

			ninety: Built("a strip of ninety badges wraps; the tile grid takes as many rows as it needs"),

			longheading: Built("the `h2` balances and wraps; the panel's lede keeps its measure"),

			nosummary: NotASummary("`DocArticle`'s - the appendix's own sentence is its `Lede`, which is required"),

			noxref: NotAXref("`BandFoot`'s"),

			at640: Built("one column: the lede, then the panel's rows"),

			norail: Built("the appendices close the index, which renders without a rail panel"),

			withaction: Built("every badge, worker and tile is a link"),

			print: Built("the panel prints; the badges keep their hairlines"),
		},
	},

	{
		name: "RUSTVIEWER",

		file: "COMPONENT/DOC/RUSTVIEWER.ASTRO",

		note: "The crate switcher and the rustdoc frame: one tab per crate, one frame, and the state the frame is in.",

		cells: {
			disabled: NotApplicable(
				"The viewer's tabs are never disabled: a crate that cannot be shown is not a tab, and a disabled tab is a control saying \"not for you\" about a document the reader came to read.",
			),

			readonly: NotApplicable(
				"The viewer is read-only in the sense that matters - it shows a rustdoc site and edits nothing - so `read-only` names no arm it could have. The frame's sandbox is the same fact stated in markup.",
			),

			empty: Built(
				"no crate prints the frame's own absence inside the frame: `◎`, the sentence and the line that says why - not an empty bar over an iframe with no `src`",
			),

			loading: Built(
				"`STATUS: LOADING` prints above the frame until the frame has loaded and the script removes it; with JavaScript off it stays, because the viewer cannot know and says so",
			),

			partial: Built(
				"a crate with no `Url` leaves the frame on the previous crate: the tab does not become active, so the bar never claims a document the frame is not showing",
			),

			error: NotApplicable(
				"A rustdoc site that fails to load fails INSIDE the frame: the viewer cannot read it (sandboxed, cross-origin), and the browser's own error page is the only honest report. Inventing an error arm would be inventing a fact.",
			),

			stale: NotApplicable(
				"The rustdoc output tracks the Current branch; its age is the crate's, and the page states the branch in its own copy above the viewer - a second as-of in the tab bar would be a second source.",
			),

			dense: NotApplicable(
				"A tab bar and a frame have no tight step: the bar is one row of labels and the frame is as tall as the viewport it is read in.",
			),

			one: Built("one crate: one tab, and the frame opens on it"),

			many: Built("nine crates: the bar scrolls horizontally and the keyboard walks it"),

			long: Built("a crate name wraps inside its tab; the bar's scroll is the backstop"),

			narrow: Built("the bar scrolls; the frame keeps the column's width and rustdoc's own 701px breakpoint takes over inside it"),

			wide: Built("the frame is the column's width, bled to the page's spine"),

			incard: NotApplicable(
				"The viewer is a surface with a frame in it: inside a card it would be a frame inside a frame, and the frame's own border would be the second.",
			),

			onesection: NotApplicable(
				"A crate group with one crate is the `ONE` cell; a section is not a thing the viewer holds - the register of crates is `DocIndex`'s.",
			),

			ninety: Built("ninety crates: the bar scrolls and the arrow keys walk it one tab at a time"),

			longheading: NotApplicable(
				"The viewer prints crate names, not headings: a heading is the page's, above it.",
			),

			nosummary: NotASummary("`DocArticle`'s, above the viewer"),

			noxref: NotAXref("`BandFoot`'s"),

			at640: Built("the bar scrolls, the frame keeps its height and its own breakpoint"),

			norail: Built("the Rust surface has no rail: the viewer is the page's column"),

			withaction: Built("the tabs are the action, and the arrow keys, Home and End are the path through them"),

			print: NotApplicable(
				"An `<iframe>` does not print: the viewer's frame is a live surface, and a printed page would show the tab bar over a blank rectangle. The crates are listed as links above it, which is what prints.",
			),
		},
	},

	{
		name: "READINGDOCUMENT",

		file: "COMPONENT/READING/READINGDOCUMENT.ASTRO",

		note: "The reading surface: the facts that date and scope a document, an index into it, and one measure to read it on.",

		cells: {
			disabled: NotAControl("reading surface"),

			readonly: ReadOnly("surface"),

			empty: Built(
				'`state="empty"` prints the document\'s absence inside the same paper: the facts and the index above it are still true, and the card says why the clauses are not there',
			),

			loading: Built('`state="loading"` prints the keys with their values barred, under the same head'),

			partial: Built(
				"a ledger row the record cannot fill prints `UNAVAILABLE` as its value; the row stays, the value says so",
			),

			error: Built(
				"a failed read is the empty arm with the page's sentence and `STATUS: UNAVAILABLE` - the vocabulary's word, not a new one",
			),

			stale: Built(
				"`EFFECTIVE:` and `UPDATED:` are ledger rows: an old date is the row's value, and the surface prints it without inventing an age",
			),

			dense: NotApplicable(
				"A document read at prose rhythm has no tight step: the measure is the surface's and the clauses are the document's. A denser document is an edit.",
			),

			one: Built("a document with one clause prints an index of one row"),

			many: Built(
				"twenty-six clauses: the index is two columns and the rail layout scrolls its own register",
			),

			long: Built(
				"the heading balances, the standfirst caps at `--Measure`, and the index's names wrap under their `§NN` markers",
			),

			narrow: Built(
				"the rail layout prints the index as a disclosure above the text, and the ledger folds to one column",
			),

			wide: Built(
				'`measure="full"` leaves the body uncapped for a document that also carries grids and cards',
			),

			incard: NotApplicable(
				"The reading surface is the page's paper: inside a card it would be a document inside a record. The legal pages' white card is the body's own class, not a wrapper around the surface.",
			),

			onesection: Built("one clause: the index is one row and the rail is not painted"),

			ninety: Built("ninety clauses: the rail scrolls, the disclosure is one row, and the index's two columns take as many rows as they need"),

			longheading: Built("the `h1` balances; a clause heading wraps in the index's name column"),

			nosummary: Built(
				"with no standfirst the head prints the kicker, the title and the ledger, so the facts become the opening - the legal set's own composition",
			),

			noxref: NotAXref("`BandFoot`'s"),

			at640: Built(
				"the rail becomes the disclosure, the ledger one column, and the index one column of `§NN` rows",
			),

			norail: Built(
				'`layout="stack"` is the composition with no rail at all: the index prints between the facts and the document',
			),

			withaction: Built("the index is the action; the print control is the page's, outside the surface"),

			print: Built("the clauses print; the rail's stickiness and the disclosure are the browser's"),
		},
	},

	{
		name: "BANDFOOT",

		file: "COMPONENT/DETAIL/BANDFOOT.ASTRO",

		note: "The band's colophon: one rule, the cross-references at its left end and the folio at its right.",

		cells: {
			disabled: NotAControl("band foot"),

			readonly: ReadOnly("foot"),

			empty: Built(
				"a foot with no facts prints its place alone: the ordinal and the part are required, and the facts row is absent rather than empty",
			),

			loading: Built(
				'`seeState="loading"` prints the register and its keys with the values barred - a foot whose references have not been read says so instead of printing a folio alone',
			),

			partial: Built(
				"a foot with a count and no as-of prints the count: each fact is its own span, and a fact the caller did not pass is not printed at all",
			),

			error: NotApplicable(
				"A foot is two printed registers; there is no action for an error to belong to, and the failure's composition is `ShellState`'s.",
			),

			stale: Built(
				"`AS OF:` is the foot's own fact: an old date is the value, and the age is printed where a page states one",
			),

			dense: NotApplicable(
				"The foot is the smallest composition on the site - one rule, two registers. A denser one is a folio, which is a different block.",
			),

			one: Built("one reference beside the folio"),

			many: Built("five references wrap; the folio keeps the row's right end"),

			long: Built(
				"a long source wraps at its `/`s and a long part now wraps at its own; the strip's container query stacks the two registers at 640px",
			),

			narrow: Built("the row stacks: references above the folio, on the strip's own container query"),

			wide: Built("references at the left end, folio at the right, on one baseline"),

			incard: Built(
				'`surface="card"` keeps the rule inside the card\'s inset instead of bleeding it to the edge, because the card\'s frame is already the boundary',
			),

			onesection: NotApplicable(
				"A foot closes one band: a document's section count is the page's figure, printed by a folio or a register, not by a foot's rows.",
			),

			ninety: NotApplicable(
				"A band's foot prints a handful of references and a folio; ninety is a document's count and it is a figure, not rows. The block that lists ninety is `Leader` or `DocContents`.",
			),

			longheading: NotApplicable(
				"A foot prints a part, a count, an as-of and references - not a heading. The band's heading is the band's.",
			),

			nosummary: NotASummary("`DocArticle`'s, and the band's own standfirst"),

			noxref: Built(
				"no `see` and the foot is a folio alone - the composition the brief named, and the one every band on the site that has nothing to cross-reference wears",
			),

			at640: Built("the strip's container query turns the row into a stack at 22rem of strip"),

			norail: Built("a foot closes a band, not a page: the rail is not its context"),

			withaction: Built("the references are links; the folio is printed"),

			print: Built("the rule and both registers print"),
		},
	},

	{
		name: "FOLIO",

		file: "COMPONENT/DETAIL/FOLIO.ASTRO",

		note: "Where in the document the reader has got to: the contained ordinal, the part, and the count, the as-of and the source that go with it.",

		cells: {
			disabled: NotAControl("folio"),

			readonly: ReadOnly("folio"),

			empty: NotApplicable(
				"A folio's place is required - an ordinal and a part. A folio with neither is not a folio; it is a line of nothing at the foot of a band, which is the defect the block exists to remove.",
			),

			loading: NotApplicable(
				"A folio prints what the page read. It has no state of its own, and a barred ordinal would be a place the reader cannot be told.",
			),

			partial: Built(
				"the as-of and the source print only when the caller has them: a folio never invents a date, and a fact it does not have is absent rather than `UNAVAILABLE` - because a folio states where you are, and that is never unknown",
			),

			error: NotApplicable(
				"A folio is a printed line: there is no action for an error to belong to.",
			),

			stale: Built(
				"`AS OF:` is the folio's own fact. The date is the value; the age is the page's to state, because the folio cannot know what the reader considers old",
			),

			dense: NotApplicable(
				"The folio is one line at the meta tier; there is nothing under it to tighten.",
			),

			one: NotASet("folio", "one band's foot"),

			many: NotASet("folio", "one band's foot"),

			long: Built(
				"the source breaks at its `/`s and the part breaks at its own - `overflow-wrap: anywhere` is the backstop for one segment longer than the band. Before this, a part was `nowrap` and a deep route ran past the band's edge",
			),

			narrow: Built(
				"the two ends wrap between facts, never inside one: a count, a figure and an as-of are unbreakable groups",
			),

			wide: Built("the two ends sit on one baseline, justified to the band's edges"),

			incard: Built(
				"inside a white card the same line prints at the card's inset; the foot's `surface=\"card\"` keeps the rule inside it",
			),

			onesection: NotApplicable(
				"A folio prints a document's part and its figures; a section is a row in `DocContents`.",
			),

			ninety: NotApplicable(
				"A folio counts; it does not list. Ninety is a figure it prints (`90 SECTIONS`), not ninety rows - the block that lists ninety is `DocContents` or `Leader`.",
			),

			longheading: NotApplicable("A folio prints a part, not a heading."),

			nosummary: NotASummary("`DocArticle`'s"),

			noxref: Built("a folio is what a foot with no cross-references is: the right end of a rule with nothing at its left"),

			at640: Built("the ends stack and the facts wrap between themselves; the ordinal and the part never part company"),

			norail: Built("a folio is printed by bands, the footer and the page edge - none of which is a rail"),

			withaction: NotApplicable(
				"A folio is printed, not clicked: the ordinal and the part are text. A folio that linked would be a pager.",
			),

			print: Built("a folio is the one thing on the site designed for the printed sheet"),
		},
	},

	{
		name: "SEE",

		file: "COMPONENT/DETAIL/SEE.ASTRO",

		note: "The cross-reference: `↳ SEE`, then a route and the reason it is worth following.",

		cells: {
			disabled: NotAControl("cross-reference register"),

			readonly: ReadOnly("register"),

			empty: Built(
				"no references renders nothing at all - not an empty frame, not a \"no related pages\" sentence. A see-also with nothing to see is noise",
			),

			loading: Built(
				'`state="loading"` prints the register and its keys with the values barred: a foot whose references were asked for and not read is a different fact from a foot with none',
			),

			partial: Built(
				"a reference with no reason is dropped rather than printed as a bare link - a reference without a reason is a related-links widget",
			),

			error: NotApplicable(
				"A reference list has no failure arm: a route that is gone is a tombstone the page prints, and a register that invented an error state would be inventing a fact about a link.",
			),

			stale: NoAsOf("cross-reference register", "the page's folio"),

			dense: NotApplicable(
				"Two rows at the foot of a band; a tight step would be a list with no air in the smallest composition on the site.",
			),

			one: Built("one reference: the register and one row"),

			many: Built("five references wrap, each keeping its route column's floor"),

			long: Built(
				"the route's column is a floor at 19ch and the reason caps at 52ch; a longer route grows and its own reason follows it",
			),

			narrow: Built("the row stacks at the strip's own container query, not at a viewport breakpoint"),

			wide: Built("route and reason share a baseline, the route's column holding every reason on one edge"),

			incard: Built("the strip is printed inside a white card on the legal pages, at the card's inset"),

			onesection: NotApplicable("A see-also is not a document's section: the sections are `DocContents`'."),

			ninety: NotApplicable(
				"A see-also is a handful of references. Ninety is an index, and the site has `Leader` and `DocContents` for that.",
			),

			longheading: NotApplicable("A register prints routes, not headings."),

			nosummary: NotASummary("`DocArticle`'s"),

			noxref: Built("that is the block rendering nothing: its resting arm on a band with nothing to cross-reference"),

			at640: Built("the row stacks; the route keeps its own line and the reason follows it"),

			norail: Built("the register is printed at a band's foot, with or without a rail"),

			withaction: Built("every route is an anchor"),

			print: Built("the register prints; the hover ink is the browser's"),
		},
	},

	{
		name: "LEADER",

		file: "COMPONENT/DETAIL/LEADER.ASTRO",

		note: "The printed index entry: name, leader, figure, hanging note - and the register line that counts the set.",

		cells: {
			disabled: NotAControl("leader register"),

			readonly: ReadOnly("register"),

			empty: Built(
				'`state="empty"` prints the caller\'s composed sentence instead of the frame: what would be here, why it is not, what to do',
			),

			loading: Built(
				'`state="loading"` prints the entries\' two cells with their values barred: the names are the schema and arrive before the figures',
			),

			partial: Built(
				"a row whose figure is unknown prints `UNAVAILABLE` - the vocabulary's word, never a zero and never a blank cell",
			),

			error: NotApplicable(
				"A register has no failure arm: a set that could not be read is the empty state with its sentence, which is the same composition with a truer cause.",
			),

			stale: NotApplicable(
				"A leader prints figures, not dates: an entry's date is its `meta`, and the register's age is the page's - the block derives none of it.",
			),

			dense: NotApplicable(
				"The leader's rhythm IS the leader: the dots run from the name to its figure and they are the row's rule. A tight step would close them.",
			),

			one: Built("one entry: the register line prints `01` and the row keeps its dots"),

			many: Built(
				"thirty-eight entries with `limit`: the first n print and a foot line states the real size and the route to all of it",
			),

			long: Built(
				"the name wraps inside its own cell and the figure stays on the last line of the entry rather than being pushed off it",
			),

			narrow: Built("one column below 1024, with the dots floored at 1.5rem so they never close to nothing"),

			wide: Built("two columns at 1024 and up, filling left to right so the array's order is the register's"),

			incard: NotApplicable(
				"A leader is a register on the paper: inside a card its dots would be the card's rule, and the card is a record's surface.",
			),

			onesection: Built("a set of one: the register line counts it and the row prints"),

			ninety: Built("`limit` prints the first n and `SHOWING: 6 OF 38` states the rest, with the route to all of it"),

			longheading: Built("the name wraps under itself, on the name's own edge"),

			nosummary: NotASummary("`DocArticle`'s"),

			noxref: NotAXref("`BandFoot`'s"),

			at640: Built("one column; the dots keep their floor"),

			norail: Built("a register is printed on the paper, with or without a rail"),

			withaction: Built("an entry with an `href` is a link and one without is text, in the same row"),

			print: Built("the leader is a printed artifact: the dots are a border, not a background"),
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

		value: "CONTENT/SPECIMEN/READING.TS",

		note: "every figure above is counted from the three tables in this file",
	},
];

/* ─── THE IMPROVEMENTS ───────────────────────────────────────────────────── */

/** One behaviour the matrix revealed, and where it now lives. */
export interface Improvement {
	/** `DOCCONTENTS` - the component the behaviour is in. */
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
		component: "DOCCONTENTS",

		from: "NINETY / DENSE",

		found: "A document with ninety sections spent the rail's whole head on its contents. `Doc/_Layout.scss` caps that head at 50% of the rail, so the register was a scroll box the reader had to scroll to find the section they were already in - and the tree, which is the rail's other half, was left a slit. The block could be dense or not; it could not be folded, and a page could not choose either.",

		built: "`DocContents.collapsible` prints the rail register as a `<details open>` - one row carrying the label, the count and the way back in - and `DocLayout.contentsFold: \"auto\"` folds it above 24 rows, so the ninety-section document folds itself and the twelve-section one does not. Open by default: the fold exists so a reader can give the rail's scroll to the tree, not so a page can withhold its own contents. `dense` is the second half of the same answer - the same rows in less air.",
	},

	{
		component: "DOCCONTENTS",

		from: "NINETY / the marking itself",

		found: "The register marked the section the reader was in and the mark could be forty rows below the register's edge: present in the DOM, invisible on the screen. A marking that is not on screen is the one failure a marking can have, and it was the failure the ninety-section case produced.",

		built: "`Doc/Contents.ts` gains `Reveal` - when the marked row is outside the scroll register it sits in, the register is scrolled to it, once, instantly. The register is found by walking up to the first ancestor that actually scrolls, so the rail's head and the clause rail are served by the same code and neither names the other's class. Instant, not smooth: the mark is a position, and the reader caused the change.",
	},

	{
		component: "FOLIO",

		from: "LONG",

		found: "The source already broke at its `/`s, with `<wbr>` and `overflow-wrap: anywhere` behind them - and the PART did not: it was `white-space: nowrap`. A folio on a deep page prints `/DOC/DEEP-DIVE-FILESYSTEM-FOOTPRINT`, which at 13px tracked is wider than the card it closes, and a folio that runs past the band's right edge is the one thing a folio may never do: it is the mark that says the band has ended.",

		built: "`Folio` splits the part at its own `/` separators and puts a `<wbr>` after each - the same break points the source carries, for the same reason - and `Detail/_Folio.scss` sets the part to `white-space: normal` with `overflow-wrap: anywhere` as the backstop for one segment longer than the band. A short part takes no break; the ordinal and the part still never part company, because the place group stays `nowrap` between them.",
	},

	{
		component: "DOCCARD",

		from: "NO SUMMARY / PARTIAL",

		found: "A page with no `description` printed a card with a title and nothing under it, in a grid where every other card had two lines. The card did not say the description was missing; it closed up, and a card two lines shorter than its neighbours reads as a card that failed to load - the exact adverse state the brief says must be designed rather than left to chance.",

		built: "`DocCard.absent` prints `◎ DESCRIPTION: UNAVAILABLE` in the note's own slot, at the note's own size, in the meta voice - so the grid's rows keep their height and the missing fact is stated in the vocabulary's word rather than as a blank. `DocIndex` passes the same sentence into the card body's `RecordEntry`, so the index grid and the feature cards answer the same way.",
	},

	{
		component: "DOCCONTENTS",

		from: "REST / the grammar",

		found: "The register named itself and not its extent: `ON THIS PAGE` over twelve rows, `ON THIS PAGE` over ninety, with no figure anywhere - while every other counted line on the site prints `# LABEL / NN`. The one register a reader consults for orientation was the one register with no count.",

		built: "`DocContents` derives the count from `Items.length` (never from a prop, so it cannot outlive the rows) and prints it one U+2001 after the label in both registers - the rail's head and the disclosure's summary. The separator is drawn by the stylesheet and belongs to the figure, so a wrapped label never opens a line with an em quad.",
	},

	{
		component: "DOCLAYER",

		from: "ONE SECTION / ONE",

		found: "A layer with one page printed nothing at all - `entries.length > 1` was the only arm - so the one fact this block exists to give, how big the thing the reader just finished is, was the one fact a one-page layer could not give. The reader finished a section and was told nothing about it.",

		built: "`DocLayer` renders at `entries.length >= 1`: above one it is the disclosure it always was, at exactly one it is the same row with the same label, value and count and no glyph - because there is nothing to open. `unitOne` lets the count read `01 PAGE` without the block pluralising a word it was handed.",
	},

	{
		component: "RUSTVIEWER",

		from: "EMPTY / WITH ACTION",

		found: "With no crates the viewer printed an empty tab bar and an `<iframe>` with no `src`: a frame around nothing, which is the composition a reader reads as broken rather than as absent. And the bar was a `role=\"tablist\"` whose only keyboard path was Tab - the ARIA pattern it claimed was not implemented, so the arrows did nothing and a keyboard reader could not walk the crates.",

		built: "`RustViewer.empty` prints the absence inside the frame's own box - `◎`, the sentence and the line that says why - and the frame is not rendered at all. The tab bar gains the pattern it promised: roving `tabindex`, ArrowLeft/Right/Up/Down, Home and End, focus following the selection. `STATUS: LOADING` prints above the frame until it loads and the script removes it.",
	},

	{
		component: "DOCARTICLE",

		from: "EMPTY / LOADING / ERROR",

		found: "An article whose prose did not render printed its breadcrumb, its kicker, its `h1`, its strip and then a white card with nothing in it. Every other block in the family had its two adverse arms; the shell that holds all of them had none, so the one page that is nothing but paper was the one page that could be blank paper.",

		built: '`DocArticle.state` (`rest` | `empty` | `loading`) with `empty` and `keys`: `empty` prints `◎`, the page\'s sentence and `STATUS: UNAVAILABLE` inside the paper; `loading` prints the keys with their values barred. `ReadingDocument` gains the same two arms, so the legal set cannot print a blank clause card either.',
	},

	{
		component: "DOCAPPENDIX",

		from: "EMPTY / PARTIAL / LOADING",

		found: "The three closing artifacts printed their `h2`, their lede and then whatever the build had: an appendix whose rows were not read was a heading and a sentence over a hole, and the architecture panel with no `Index` printed an empty `<ul>` under a lede about the fifteen elements.",

		built: '`DocAppendix.state` with `empty`/`loading` arms under the same heading and lede, and a partial arm for the strip: an architecture panel with no `Index` prints `◎ STATUS: UNAVAILABLE` rather than an empty badge run. The panel\'s sentence is never dropped, because the subject is still stated when its destinations are not.',
	},

	{
		component: "DOCLAYOUT",

		from: "EMPTY",

		found: "A rail with no sections printed its title and then nothing - a label over a hole, in both the rail and the narrow-viewport panel. The one navigation a documentation page has said `Documentation` and stopped.",

		built: "`DocLayout` prints `◎` and `sidebar.empty`'s sentence where the tree would be, in the rail and in the panel, at the panel's own inset. The head, the tree's slot and the foot keep their places, so the rail still reads as a rail.",
	},

	{
		component: "SEE",

		from: "LOADING / NO X-REF",

		found: "The block refused the empty frame - correctly - and therefore had no way to say the other thing: that the references were asked for and not read. A foot in that state printed its folio alone, and a reader could not tell a band with no cross-references from a build that never read them.",

		built: '`See.state="loading"` prints the register and its keys with the values barred; `BandFoot.seeState` forwards it, so the foot keeps its two ends and its rule. The resting arm is unchanged: no references still renders nothing at all.',
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
		component: "DOCCONTENTS",

		found: "The fold threshold is 24 rows, and 24 is a measurement rather than a law: it is what a half-rail head holds at the reading step on the reference viewport. On a taller window the head holds more, and on a shorter one fewer, so a document with 22 sections folds on one screen and not on another.",

		owner: "A later card on the reading family, if the owner's reading finds the threshold wrong. The honest fix is a container query on the rail's head height, which CSS cannot ask; the next best is the threshold the owner picks after reading two documents at two window sizes.",
	},

	{
		component: "DOCINDEX",

		found: "The index's cards are built twice: `DocCard` for the three ways in, and the same anatomy written inline in `DocIndex` for the chapter grids, because a chapter card carries a `RecordEntry` with an index marker and a glyph that `DocCard` has no slot for. The two answer the missing-description question with two mechanisms - a note slot and a body string - and only the string is the block's own grammar.",

		owner: "A later card on the documentation index. The fix is one card with a `RecordEntry` and an optional `level`, which would let `DocCard` and `DocIndex` share the anatomy; it changes the feature cards' markup, so it wants the owner's reading of the three ways in before it moves.",
	},

	{
		component: "LEADER",

		found: "`Leader`'s `columns={2}` is a viewport step at 1024px, not a capacity line, so a leader printed inside a wide band on a narrow window prints one column although two would fit - and the same register inside a narrow pane at 1440px prints two although one would fit.",

		owner: "The next card on the detail layer, with a composition that prints a leader in a pane. The mechanism exists (`Layout/_Shell.scss`'s `.PageShell__row` capacity line); the work is proving it against the dots' 1.5rem floor.",
	},

	{
		component: "FOLIO",

		found: "The folio prints `AS OF:` and never an age, deliberately - a folio cannot know what a reader considers old. But three surfaces print a date with no age at all (the footer's colophon, the page edge, and the legal set's `EFFECTIVE:` row), and the brief's stale state asks for the age beside the value.",

		owner: "The surfaces that own those dates. `ShellState`'s stale arm prints `AGE:`; the folio's row is the right place for it, and the prop would be `age` beside `asOf`.",
	},
];

/* ─── THE SPECIMENS ──────────────────────────────────────────────────────── */

/** One group of rows on the plate: the family's own reading order. */
export type Group =
	| "documents" | "contents" | "index" | "detail" | "reading" | "adverse";

/** Which block a row mounts. The renderer switches on it and on nothing else. */
export type Kind =
	| "layout"
	| "article"
	| "contents"
	| "contentslist"
	| "layer"
	| "index"
	| "card"
	| "appendix"
	| "rust"
	| "reading"
	| "foot"
	| "folio"
	| "see"
	| "leader";

/** What every row states, whatever block it mounts. */
export interface Spec {
	/** `READ_01` - the row's own mark, printed at its head. */
	readonly mark: string;

	/** The state or combination, in the sheet's register: `NINETY`, `NO SUMMARY`. */
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

	/** The arm or ratio the block should print, where the block has one. */
	readonly variant?: string;

	/** The block's own dense arm. */
	readonly dense?: boolean;
}

/**
 * The rows, in reading order: the documents, the contents, the index, the
 * detail apparatus, the reading surface and the adverse states.
 *
 * Every row is a state the site either uses or could use, and the `when` line is
 * the one thing a picture of a component cannot carry: the sentence that says
 * which composition is right. A row printed here that the site never needs is
 * still a row: a component that survives its own worst combination is a
 * component whose design frame is real.
 */
export const Specimens: readonly Specimen[] = [
	/* ── DOCUMENTS ───────────────────────────────────────────────────────── */
	{
		mark: "READ_01",
		state_name: "THE ARTICLE",
		component: "DOCARTICLE",
		when: "The resting documentation page: breadcrumb, kicker, the page's one h1, the standfirst, the strip, and the paper at one measure.",
		kind: "article",
	},

	{
		mark: "READ_02",
		state_name: "NO SUMMARY",
		component: "DOCARTICLE",
		when: "A page with no `description`: the header prints the kicker, the title and then the strip, so the metadata becomes the opening fact instead of a gap where a sentence was.",
		kind: "article",
		variant: "nosummary",
	},

	{
		mark: "READ_03",
		state_name: "LONG HEADING",
		component: "DOCARTICLE",
		when: "A title wider than the rail: the `h1` balances at the L tier and the standfirst still ends on the prose's right edge.",
		kind: "article",
		variant: "longheading",
	},

	{
		mark: "READ_04",
		state_name: "NO RAIL",
		component: "DOCARTICLE",
		when: "The Rust page's composition: the article shell owns its own container, the contents are the disclosure, and there is no rail to pin anything to.",
		kind: "article",
		variant: "norail",
	},

	{
		mark: "READ_05",
		state_name: "ONE SECTION",
		component: "DOCLAYOUT",
		when: "A document with one section: the rail's head prints one row, the tree keeps the scroll, and nothing renders a contents list of one item twice.",
		kind: "layout",
		variant: "onesection",
		width: "wide",
	},

	{
		mark: "READ_06",
		state_name: "NINETY",
		component: "DOCLAYOUT",
		when: "A document with ninety sections: the contents register folds itself and goes dense, so the tree keeps the rail's scroll instead of a slit.",
		kind: "layout",
		variant: "ninety",
		width: "wide",
	},

	{
		mark: "READ_07",
		state_name: "NO TREE",
		component: "DOCLAYOUT",
		when: "A rail whose sections were not read: the head and the foot keep their places and the tree's slot states the absence instead of printing a label over a hole.",
		kind: "layout",
		variant: "notree",
		width: "wide",
	},

	/* ── CONTENTS ────────────────────────────────────────────────────────── */
	{
		mark: "READ_08",
		state_name: "RAIL",
		component: "DOCCONTENTS",
		when: "The pinned register at the top of the sticky rail: the page's own sections, with the count the register line now carries.",
		kind: "contents",
		width: "narrow",
	},

	{
		mark: "READ_09",
		state_name: "FOLDED",
		component: "DOCCONTENTS",
		when: "The same register folded: one row with the label, the count and the way back in, open by default so the fold is the reader's choice.",
		kind: "contents",
		variant: "fold",
		width: "narrow",
	},

	{
		mark: "READ_10",
		state_name: "DENSE",
		component: "DOCCONTENTS",
		when: "Ninety rows at the tight step: the same marker column, the same reserved 2px rule, a third less air - the register a long document folds AND tightens.",
		kind: "contents",
		variant: "many",
		dense: true,
		width: "narrow",
	},

	{
		mark: "READ_11",
		state_name: "ONE SECTION",
		component: "DOCCONTENTS",
		when: "A one-section document: one row, and the register counts `01` rather than saying nothing about its extent.",
		kind: "contents",
		variant: "one",
		width: "narrow",
	},

	{
		mark: "READ_12",
		state_name: "LONG HEADING",
		component: "DOCCONTENTS",
		when: "A heading wider than the rail: the name wraps under its own marker, because the marker is a grid track and not an inline prefix.",
		kind: "contents",
		variant: "long",
		width: "narrow",
	},

	{
		mark: "READ_13",
		state_name: "DISCLOSURE",
		component: "DOCCONTENTS",
		when: "Below the rail's breakpoint: the same list as a CSS-only `<details>`, collapsed, one row at the paper's measure.",
		kind: "contents",
		variant: "disclosure",
	},

	{
		mark: "READ_14",
		state_name: "THE ROWS",
		component: "DOCCONTENTSLIST",
		when: "The list on its own: a two-digit marker, the heading's own words, and the id the pipeline wrote - nothing re-slugified, nothing re-cased.",
		kind: "contentslist",
		width: "narrow",
	},

	{
		mark: "READ_15",
		state_name: "NINETY",
		component: "DOCCONTENTSLIST",
		when: "Ninety rows: the marker column holds `01`..`90` without moving a name, because its width is a `ch` track and not a character count.",
		kind: "contentslist",
		variant: "many",
		width: "narrow",
	},

	{
		mark: "READ_16",
		state_name: "LAYER",
		component: "DOCLAYER",
		when: "The section the reader just finished: one closed row stating the layer, its size and the way in - fifteen rows only if they open it.",
		kind: "layer",
	},

	{
		mark: "READ_17",
		state_name: "ONE PAGE",
		component: "DOCLAYER",
		when: "A layer of one: the same row with the same label, value and count and no glyph, because there is nothing to open - and the size is still stated.",
		kind: "layer",
		variant: "one",
	},

	{
		mark: "READ_18",
		state_name: "LONG",
		component: "DOCLAYER",
		when: "A page name wider than the row: the name wraps and the count stays at the row's end, so the register line is still readable at a glance.",
		kind: "layer",
		variant: "long",
		width: "narrow",
	},

	/* ── THE INDEX ───────────────────────────────────────────────────────── */
	{
		mark: "READ_19",
		state_name: "CHAPTER",
		component: "DOCINDEX",
		when: "One chapter of the index: a bare band with its `/NAME NN PAGES` kicker and the chapter's card grid, three across when the desk allows.",
		kind: "index",
	},

	{
		mark: "READ_20",
		state_name: "MISSING DESCRIPTION",
		component: "DOCINDEX",
		when: "A chapter holding a page with no `description`: the card states `◎ DESCRIPTION: UNAVAILABLE` in the body slot, so the grid keeps its row height and the missing fact is named.",
		kind: "index",
		variant: "absent",
	},

	{
		mark: "READ_21",
		state_name: "MANY",
		component: "DOCINDEX",
		when: "A chapter of sixteen: the grid wraps by the capacity line, so the count in the kicker and the cards on the page are the same number.",
		kind: "index",
		variant: "many",
		width: "wide",
	},

	{
		mark: "READ_22",
		state_name: "CARD",
		component: "DOCCARD",
		when: "The one card on its own: a title, the page's description, and the whole card as the way in - an anchor, not a click handler.",
		kind: "card",
		width: "narrow",
	},

	{
		mark: "READ_23",
		state_name: "NO DESCRIPTION",
		component: "DOCCARD",
		when: "A card whose page has no description: the note's slot prints `◎ DESCRIPTION: UNAVAILABLE` at the note's size, so the set's rows stay the same height.",
		kind: "card",
		variant: "absent",
		width: "narrow",
	},

	{
		mark: "READ_24",
		state_name: "FEATURE",
		component: "DOCCARD",
		when: "One of the three ways in: the card's title is its `h2`, so it takes the L tier and the group inset - a level above the chapter cards, not a bigger card.",
		kind: "card",
		variant: "feature",
	},

	{
		mark: "READ_25",
		state_name: "APPENDIX",
		component: "DOCAPPENDIX",
		when: "The architecture panel: the fifteen elements as a badge strip, then the one link out - every badge an anchor, so the element a reader taps is the element that opens.",
		kind: "appendix",
		variant: "architecture",
	},

	{
		mark: "READ_26",
		state_name: "PARTIAL STRIP",
		component: "DOCAPPENDIX",
		when: "The same panel with no `Index`: the lede stays and the strip prints `◎ STATUS: UNAVAILABLE` instead of an empty badge run.",
		kind: "appendix",
		variant: "stripabsent",
	},

	{
		mark: "READ_27",
		state_name: "WORKERS",
		component: "DOCAPPENDIX",
		when: "The backend panel: four workers, each a link and its own sentence after the baseline's `-`, because the dash is part of the row.",
		kind: "appendix",
		variant: "backend",
	},

	{
		mark: "READ_28",
		state_name: "TILES",
		component: "DOCAPPENDIX",
		when: "The deployments panel: twelve destinations as a two-column tile grid, each a name, its arrow and one line of context.",
		kind: "appendix",
		variant: "deployments",
	},

	{
		mark: "READ_29",
		state_name: "NOT READ",
		component: "DOCAPPENDIX",
		when: "A panel whose destinations were not read: the heading and the lede stand, and the body states the absence instead of leaving a hole at the foot of the index.",
		kind: "appendix",
		variant: "empty",
	},

	{
		mark: "READ_30",
		state_name: "CRATES",
		component: "RUSTVIEWER",
		when: "The crate switcher: one tab per crate, the frame opening on the first, and `STATUS: LOADING` above the frame until rustdoc arrives.",
		kind: "rust",
		width: "wide",
	},

	{
		mark: "READ_31",
		state_name: "ONE CRATE",
		component: "RUSTVIEWER",
		when: "A group with one crate: one tab, and the keyboard path still holds - arrows wrap to the same tab, Home and End go to it.",
		kind: "rust",
		variant: "one",
	},

	{
		mark: "READ_32",
		state_name: "NO CRATE",
		component: "RUSTVIEWER",
		when: "A group with no crates: the viewer keeps its frame and states the absence inside it, rather than printing a bar over an iframe with no `src`.",
		kind: "rust",
		variant: "empty",
	},

	/* ── THE DETAIL LAYER ────────────────────────────────────────────────── */
	{
		mark: "READ_33",
		state_name: "THE FOOT",
		component: "BANDFOOT",
		when: "A band's colophon at its resting shape: one rule, the cross-references at the left end, the folio at the right.",
		kind: "foot",
	},

	{
		mark: "READ_34",
		state_name: "NO X-REF",
		component: "BANDFOOT",
		when: "A band with nothing to cross-reference: the foot is a folio alone. No empty frame, no \"no related pages\" sentence.",
		kind: "foot",
		variant: "noxref",
	},

	{
		mark: "READ_35",
		state_name: "NOT READ",
		component: "BANDFOOT",
		when: "A foot whose references were asked for and not read: the register prints and its values are barred, so the two states are distinguishable.",
		kind: "foot",
		variant: "loading",
	},

	{
		mark: "READ_36",
		state_name: "IN A CARD",
		component: "BANDFOOT",
		when: "The foot inside a white insert: the rule stays inside the card's own inset, because the card's frame is already the boundary.",
		kind: "foot",
		variant: "card",
		width: "card",
	},

	{
		mark: "READ_37",
		state_name: "LONG SOURCE",
		component: "FOLIO",
		when: "A source path wider than the band: the path breaks at its own `/`s, so the folio ends where the band ends instead of running past it.",
		kind: "folio",
		variant: "source",
	},

	{
		mark: "READ_38",
		state_name: "LONG PART",
		component: "FOLIO",
		when: "A part wider than the band - a deep page's `/DOC/DEEP-DIVE-FILESYSTEM-FOOTPRINT`: the part now breaks at its own separators, and the ordinal never leaves it.",
		kind: "folio",
		variant: "part",
		width: "narrow",
	},

	{
		mark: "READ_39",
		state_name: "TWO FACTS",
		component: "FOLIO",
		when: "A folio with a count and an as-of and no source: each fact is its own span, and a fact the caller did not pass is absent rather than `UNAVAILABLE`.",
		kind: "folio",
		variant: "partial",
	},

	{
		mark: "READ_40",
		state_name: "AT 640",
		component: "BANDFOOT",
		when: "The detail strip at 640px: the strip's own container query stacks the references above the folio, and nothing is truncated to fit.",
		kind: "foot",
		variant: "narrow",
		width: "narrow",
	},

	{
		mark: "READ_41",
		state_name: "REFERENCES",
		component: "SEE",
		when: "The register at rest: `↳ SEE`, a route, and the reason it is worth following - a reference without a reason is dropped, not printed bare.",
		kind: "see",
	},

	{
		mark: "READ_42",
		state_name: "NOT READ",
		component: "SEE",
		when: "The references were asked for and not read: the register prints with its keys and barred values, which is a different fact from having none.",
		kind: "see",
		variant: "loading",
	},

	{
		mark: "READ_43",
		state_name: "NO REASON",
		component: "SEE",
		when: "Every row passed without a reason: the block renders nothing at all. That is the arm, and it is the reason the block refuses bare links.",
		kind: "see",
		variant: "bare",
	},

	{
		mark: "READ_44",
		state_name: "THE LEADER",
		component: "LEADER",
		when: "The printed index entry: name, leader, figure, and the register line that counts the set - no rules, because the dots are the rule.",
		kind: "leader",
	},

	{
		mark: "READ_45",
		state_name: "ONE",
		component: "LEADER",
		when: "A set of one: the register prints `01` and the row keeps its dots, so the shape holds at the smallest set.",
		kind: "leader",
		variant: "one",
	},

	{
		mark: "READ_46",
		state_name: "TOO MUCH",
		component: "LEADER",
		when: "Thirty-eight entries where the register prints six: `SHOWING: 6 OF 38` and the route to all of it, so the figure is never a lie about the set.",
		kind: "leader",
		variant: "many",
		width: "wide",
	},

	{
		mark: "READ_47",
		state_name: "UNAVAILABLE",
		component: "LEADER",
		when: "A row whose figure is unknown: `UNAVAILABLE` in the figure column - the vocabulary's word, never a zero and never a blank cell.",
		kind: "leader",
		variant: "unavailable",
	},

	{
		mark: "READ_48",
		state_name: "THE READING",
		component: "READINGDOCUMENT",
		when: "A legal document read with its contents beside it: the facts date and scope it, the clause rail is sticky, and the text is on one measure.",
		kind: "reading",
		variant: "rail",
		width: "wide",
	},

	{
		mark: "READ_49",
		state_name: "STACKED",
		component: "READINGDOCUMENT",
		when: "The same document with no rail: the index prints between the facts and the text, which is the composition for a page that is read straight through.",
		kind: "reading",
		variant: "stack",
	},

	{
		mark: "READ_50",
		state_name: "NO SUMMARY",
		component: "READINGDOCUMENT",
		when: "A document with no standfirst: the head prints the kicker, the title and the ledger, so the facts become the opening and the measure still holds.",
		kind: "reading",
		variant: "nosummary",
	},

	/* ── THE ADVERSE STATES ──────────────────────────────────────────────── */
	{
		mark: "READ_51",
		state_name: "EMPTY PAPER",
		component: "DOCARTICLE",
		when: "An article whose prose is not in the build: the paper keeps its shape and states the absence, in the record grammar, instead of printing white.",
		kind: "article",
		variant: "empty",
	},

	{
		mark: "READ_52",
		state_name: "LOADING PAPER",
		component: "DOCARTICLE",
		when: "A paper whose prose has not arrived: the keys print with their values barred, because the schema is what a reader can already be told.",
		kind: "article",
		variant: "loading",
	},

	{
		mark: "READ_53",
		state_name: "EMPTY DOCUMENT",
		component: "READINGDOCUMENT",
		when: "A legal document whose clauses are not set: the facts and the index above it are still true, and the card says why the text is not there.",
		kind: "reading",
		variant: "empty",
	},

	{
		mark: "READ_54",
		state_name: "LOADING DOCUMENT",
		component: "READINGDOCUMENT",
		when: "A document being read: the clause keys print with barred values, under the same head - never a spinner on a page that is a document.",
		kind: "reading",
		variant: "loading",
	},

	{
		mark: "READ_55",
		state_name: "EMPTY REGISTER",
		component: "LEADER",
		when: "A register with nothing in it: the caller's composed sentence says what would be here, why it is not, and what to do - the frame is not printed at all.",
		kind: "leader",
		variant: "empty",
	},

	{
		mark: "READ_56",
		state_name: "LOADING REGISTER",
		component: "LEADER",
		when: "A register whose figures have not arrived: the entries' two cells print with their values barred, so the names arrive first, as they do in the data.",
		kind: "leader",
		variant: "loading",
	},

	{
		mark: "READ_57",
		state_name: "AT 640",
		component: "LEADER",
		when: "The leader in a narrow column: one column, the dots floored at 1.5rem, and a name that still will not fit wraps inside its own cell.",
		kind: "leader",
		width: "narrow",
	},
];

/* ─── THE GROUPS ─────────────────────────────────────────────────────────── */

/** Which group a row belongs to, from its mark's range. */
const GroupOf = (Row: Specimen): Group => {
	const At = Specimens.indexOf(Row);

	if (At < 7) return "documents";
	if (At < 18) return "contents";
	if (At < 32) return "index";
	if (At < 47) return "detail";
	if (At < 50) return "reading";
	return "adverse";
};

/** The rows in one group, in reading order. */
export const InGroup = (Group: Group): readonly Specimen[] =>
	Specimens.filter((Row) => GroupOf(Row) === Group);

/** The groups, in the plate's order, with the line that says what each one asks. */
export const Groups: readonly { key: Group; label: string; note: string }[] = [
	{
		key: "documents",
		label: "/THE DOCUMENTS",

		note: "The shell that holds a reading column, in the four shapes the brief named: a resting article, an article with no summary, a title wider than the rail, and the same shell with no rail at all - plus the rail with one section, with ninety, and with no tree.",
	},

	{
		key: "contents",
		label: "/THE CONTENTS",

		note: "The page's own contents in every register it has: the pinned rail, the fold, the dense step, one section, a heading wider than the rail, the disclosure, and the rows on their own at ninety.",
	},

	{
		key: "index",
		label: "/THE INDEX",

		note: "The manual's filing: a chapter and its count, a chapter holding a page with no description, a chapter of sixteen, the card alone in its three arms, the three appendices and the crate viewer - including the one the brief asked for by name, an index card with a missing description.",
	},

	{
		key: "detail",
		label: "/THE DETAIL",

		note: "The apparatus that closes a band: the foot at rest, with no cross-references, with its references unread, inside a card and at 640px; the folio under a long source and a long part; the see-also in its three arms; and the leader at one entry, at thirty-eight and in a narrow column.",
	},

	{
		key: "reading",
		label: "/THE READING",

		note: "The surface the legal set wears: read with its clause rail, read straight through with no rail, and read with no standfirst, where the facts become the opening.",
	},

	{
		key: "adverse",
		label: "/THE ADVERSE",

		note: "The seven compositions a reader meets when the world is unkind: an empty paper and a loading one, an empty document and a loading one, an empty register and a loading one, and the leader at 640px where the dots are the only rule it has.",
	},
];

/** How many rows the plate prints. */
export const SpecimenCount = Specimens.length;
