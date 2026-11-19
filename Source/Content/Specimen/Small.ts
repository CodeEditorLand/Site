/**
 * Small - the auth, account, trust, contact and small-route family's state
 * matrix, its specimens, and what the exploration changed.
 *
 * ─── WHY THIS FAMILY NEEDS ITS OWN MATRIX ─────────────────────────────────
 * The ledger family is BELIEVED, the display family is READ, the overlay family
 * is DISMISSED, the narrative family is TOLD, the frame family is SAT IN, the
 * reading family is FOUND, and the composition family is SCANNED. This family is
 * the SMALL SURFACES: the eight credential routes a reader meets at their most
 * fragile, the account directory, the legal set's clause and its rail, the
 * fifteen contact routes, and the four reference blocks that carry the site's
 * own vocabulary.
 *
 * A small surface fails differently from every family above it. A ledger fails
 * by printing a blank cell where a fact should be; a frame fails by holding
 * nothing. A small surface fails by BEING ABANDONED: the one page a reader
 * reaches when they are locked out, or their session expired, or their request
 * did not send, or the licence's §07 is missing - and it is the page nobody
 * designed a second state for. So the family's own columns are the states a
 * small surface is actually met in: signed out, signing in, signed in, expired,
 * denied, a submit that failed, a clause that is missing. Those are not
 * hypothetical compositions; they are the seven ways these pages are read.
 *
 * Sixteen components, twenty-four conditions, three hundred and eighty-four
 * cells.
 * Every cell that cannot exist carries a sentence saying why, because a blank
 * cell in a matrix of dispositions is the same defect as a blank cell in a
 * ledger: an excuse where a fact belongs.
 *
 * ─── WHAT THE FAMILY'S OWN BRIEF ASKED FOR ────────────────────────────────
 * "Explore every state each one can be in - signed out, signing in, signed in,
 * expired session, denied, empty dashboard, a contact form after a failed
 * submit, a licence page with a missing clause - and make the state vocabulary
 * the same instrument as the rest of the site."
 *
 * Those seven are columns of the `composition` group; the behaviours they
 * produced are entries in `Improvements`, each with the cell behind it.
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

	/** The column head, in the sheet's register: `SIGNED OUT`, `AT 640`. */
	readonly label: string;

	/** One line under the head: what the cell is asking. */
	readonly ask: string;

	/**
	 * The group the column belongs to. The matrix prints a heavier rule where a
	 * condition becomes a shape, where a shape becomes a composition and where a
	 * composition becomes a context - four different questions, and a reader
	 * scanning the head should see where one set ends.
	 */
	readonly group: "condition" | "shape" | "composition" | "context";
}

/**
 * The twenty-four columns, in reading order.
 *
 * Nine conditions first, because they are the states any block is met in; then
 * six shapes, because they are what a small surface is asked to hold; then the
 * seven compositions this family's brief named by hand - the states a credential
 * route, a directory, a request and a licence are actually read in; then two
 * contexts, because they are the two a designer forgets: the action the block
 * carries and the medium it is printed on.
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

	{ key: "many", label: "MANY", ask: "twenty-six or ninety", group: "shape" },

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
		key: "signedout",

		label: "SIGNED OUT",

		ask: "no session yet",

		group: "composition",
	},

	{
		key: "signingin",

		label: "SIGNING IN",

		ask: "the exchange is running",

		group: "composition",
	},

	{
		key: "signedin",

		label: "SIGNED IN",

		ask: "the session is written",

		group: "composition",
	},

	{
		key: "expired",

		label: "EXPIRED",

		ask: "the link closed",

		group: "composition",
	},

	{
		key: "denied",

		label: "DENIED",

		ask: "the reader may not see it",

		group: "composition",
	},

	{
		key: "failedsubmit",

		label: "FAILED SUBMIT",

		ask: "the send did not land",

		group: "composition",
	},

	{
		key: "missingclause",

		label: "MISSING CLAUSE",

		ask: "the index names it, the text does not",

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
	/** `AUTHSHELL` - the row's name in the sheet's register. */
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

/** The reason a page-shaped thing cannot live inside a card. */
const NotACard = (what: string, inside: string): Cell =>
	NotApplicable(
		`A ${what} is a page's ${inside}: inside a card it would be a page inside a record, and a card inside a card is the one composition the identity forbids.`,
	);

/** The reason a block has no tight step. */
const NoDense = (what: string, why: string): Cell =>
	NotApplicable(`A ${what} has no tight step: ${why}.`);

/**
 * The reason a public surface has no session state.
 *
 * The legal set, the glossary and the status board are read by anyone; the five
 * session compositions name no arm they could have. The sentence is written once
 * because it is the same fact about each of them, and each call says WHICH
 * surface it is about - a reason is a fact about that component, not a rule
 * about the family.
 */
const Public = (what: string): Cell =>
	NotApplicable(
		`${what} is public: it renders the same for a reader with no session and one with a session, so the five session compositions name no arm it could have.`,
	);

/**
 * The sixteen components, in the order a reader meets them: the credential
 * frame and its report, the account directory, the three parts of the legal
 * set's clause apparatus, the five parts of a contact route (the shell, the
 * page, the opening, the workspace and the absorbed trail), and the five
 * reference blocks that carry the site's own vocabulary.
 *
 * Every row's overrides are reasons. A row with no overrides would be a part
 * that survives every combination, and no part does.
 */
export const Rows: readonly Row[] = [
	{
		name: "AUTHSHELL",

		file: "COMPONENT/AUTH/AUTHSHELL.ASTRO",

		note: "The one frame every account, OAuth and verify route renders: `/KICKER`, the page's single `h1`, one supporting sentence, the state register, the route's own card, and one alternate action.",

		cells: {
			stale: NoAsOf("auth frame", "the route's declarations (`BUILT:`)"),

			disabled: NotAControl("auth frame"),

			readonly: ReadOnly("frame"),

			dense: NoDense(
				"auth shell",

				"the opening distance is the chapter token and the card's inset belongs to the interior, so a tighter shell is a smaller chapter rather than a state",
			),

			one: NotASet("auth shell", "one route's frame"),

			many: NotASet("auth shell", "one route's frame"),

			incard: NotACard("auth shell", "container, not a record's surface"),

			empty: Built(
				"a frameless route: the register prints on its own and the card holds the interior - the state no longer disappears with the heading (see `AUTHSHELL / SIGNED OUT`)",
			),

			partial: Built(
				"`Frame.sentence` and `Frame.action` are optional: the password routes print the sentence in the card instead, and the OAuth route has no alternate action",
			),

			error: Built(
				"`States` prints `INTERRUPTED` through `SurfaceStatusLine` and the interior prints the report",
			),

			long: Built(
				"the heading balances at the L tier and the card fills the 28rem measure; a longer heading wraps rather than widening it",
			),

			narrow: Built(
				"the measure's padding is the only fixed value; the card, the register and the alternate link re-flow inside a 16rem column",
			),

			wide: Built('`Measure="wide"` is the account index\'s 64rem'),

			signedout: Built(
				"the resting credential route: the frame above the form, the alternate action under it",
			),

			signingin: Built(
				'`Align="center"` places the short loading interior in the viewport it is the only thing in; the frame and the action are unchanged',
			),

			signedin: Built("the frame above a `VERIFIED` or `ACTIVE` report"),

			expired: Built(
				"`STATUS: INTERRUPTED` above a card that says the link closed and offers the retry",
			),

			denied: Built(
				"`STATUS: UNAVAILABLE` above a card that says what the surface is - the frame never refuses silently",
			),

			failedsubmit: NotApplicable(
				"A submit failure is a state of the route's interior, and the shell prints it through `States` - the composition exists, under the name `ERROR`, and a second cell for it would be two names for one arm.",
			),

			missingclause: NotApplicable(
				"A missing clause is a legal document's composition: the credential shell frames a form, and a clause is not a form's subject.",
			),

			withaction: Built(
				"`Frame.action` is the one alternate destination",
			),

			print: Built(
				"the frame, the register and the card print; the card's frame is a hairline, not a shadow",
			),
		},
	},

	{
		name: "AUTHREPORT",

		file: "COMPONENT/AUTH/REPORT.TSX",

		note: "One state inside the auth card: the state's coded label, its title, one sentence, the facts the state is made of, and the one action the reader can take now.",

		cells: {
			empty: NotApplicable(
				"A report is a statement about a state: `Title` and `Sentence` are required, so a report with nothing to say is unrepresentable - the empty state of this surface is the form, not the report.",
			),

			disabled: NotAControl("report"),

			readonly: ReadOnly("report"),

			dense: NoDense(
				"report",

				"its rhythm is the card's (`p-6`, `space-y-1.5`), and a denser report is a smaller card",
			),

			one: NotASet("report", "one state"),

			many: NotASet("report", "one state"),

			incard: Built(
				"it is the card's interior; on a bare surface it keeps its own `p-6` inset",
			),

			loading: Built(
				'`Glyph="loading"` draws the busy arm - two bars in the record grammar - instead of a spinner',
			),

			partial: Built(
				"no glyph prints no tile, and no facts print no rows: the sentence and the action still stand",
			),

			error: Built(
				'`Glyph="alert"` with `Role="alert"`, and `Facts` carries `CAUSE:` and `RETRY:` in the record grammar',
			),

			stale: Built(
				"`Facts` is where an as-of and a window print: `WINDOW:` and `AS OF:` are rows, and the age is the sentence's",
			),

			long: Built(
				"the sentence wraps at the card's measure and a fact's value breaks anywhere, so a deep route or a long cause does not widen the card",
			),

			narrow: Built("the card's inset is the only fixed value"),

			wide: Built(
				"the sentence keeps the card's measure; `text-wrap: pretty` holds the last line",
			),

			signedout: NotApplicable(
				"A report is printed after an attempt. The signed-out state is the form's, and the report that follows it says `INTERRUPTED` or `VERIFIED` - it cannot say 'nobody tried'.",
			),

			signingin: Built("`STATUS: LOADING` with the busy arm"),

			signedin: Built(
				"`STATUS: VERIFIED` or `ACTIVE` with the check glyph",
			),

			expired: Built(
				"`STATUS: INTERRUPTED` with `WINDOW:` and `RETRY:` facts - the link's age and the way back",
			),

			denied: Built(
				"`STATUS: UNAVAILABLE` with the sentence that says what the surface is",
			),

			failedsubmit: Built(
				"`STATUS: INTERRUPTED` with `CAUSE:` and `NEXT:` facts - the state a form reports when its send did not land",
			),

			missingclause: NotApplicable(
				"A missing clause is a legal document's composition; the report states an outcome of a credential attempt.",
			),

			withaction: Built(
				"`Action` prints the one link-shaped action; `children` remains the form-shaped arm that carries handlers",
			),

			print: Built(
				"the badge, the title, the sentence and the facts print",
			),
		},
	},

	{
		name: "PRIVACYREQUESTS",

		file: "COMPONENT/DASHBOARD/PRIVACYREQUESTS.ASTRO",

		note: "The dashboard's data-rights directory: the six statutory rights, the five support channels, and the one erasure entry - three counted sets, each opening the form that files it.",

		cells: {
			loading: BuildTime(
				"privacy directory",

				"the rights, the channels and the addresses are the contact registry's, read in the same pass as the page",
			),

			error: NotApplicable(
				"A failed read is the empty arm: the grid prints its own sentence and `STATUS: UNAVAILABLE`, and a printed page has no retry - the retry is a rebuild.",
			),

			stale: NoAsOf("directory", "the registry entry it reads"),

			disabled: NotAControl("directory"),

			readonly: ReadOnly("directory"),

			dense: NoDense(
				"directory",

				"its density is its grid - three across at the band's width, one below it - and a tighter step is a narrower card",
			),

			incard: NotACard(
				"directory",

				"band's body, not a record's surface",
			),

			empty: Built(
				"each grid prints its own composed sentence from `Data.ts` under the same heading, and the register still prints its counted zero",
			),

			partial: Built(
				"one grid empty and one full: the empty one states its cause and the other is unchanged - the blocks are independent",
			),

			one: Built("a grid of one card, at the grid's floor"),

			many: Built("six rights and five channels, three and four across"),

			long: Built(
				"the card body takes the slack and wraps; the code and the article stay at the card's right edge",
			),

			narrow: Built("one card per row below the grid's floor"),

			wide: Built("three across for the rights, four for the channels"),

			signedout: Built(
				'`state="denied"` is the signed-out composition: what the directory is, why it is not listed, and the way in',
			),

			signingin: NotApplicable(
				"The directory is read after the session exists. While the session is being established the dashboard's own gate prints the loading state, and a rights grid behind a spinner would be a list the reader cannot act on.",
			),

			signedin: Built(
				"the resting directory, under the session that owns it",
			),

			expired: Built(
				"the denied arm with the expired sentence: the session is gone and the directory says which session it reads with",
			),

			denied: Built(
				'`state="denied"` prints `SurfaceAbsent`: `STATUS: UNAVAILABLE`, what would be here, why it is not, the way in and the retry',
			),

			failedsubmit: NotApplicable(
				"Every card is a destination; the submit happens on the form the card opens, and that form owns its own failure. A failed submit in the grid would be a form inside a list.",
			),

			missingclause: NotApplicable(
				"A missing clause is a legal document's composition; the directory files requests, not clauses.",
			),

			withaction: Built(
				"every card is one anchor, and the erasure card is one more",
			),

			print: Built(
				"the grids, the chips and the register print; the hover ink is the browser's",
			),
		},
	},

	{
		name: "TRUSTCLAUSE",

		file: "COMPONENT/TRUST/TRUSTCLAUSE.ASTRO",

		note: "One clause of a legal document: `§07` as the anchor, the clause's name as the heading's words, and - when the document's index names a clause the text does not carry - the tombstone that keeps the number resolvable.",

		cells: {
			empty: NotApplicable(
				"A clause is its name: the slot is the heading's words, and a clause with none is a number the index prints - the `MISSING CLAUSE` column is that arm.",
			),

			loading: NotApplicable(
				"A clause is printed with the document it belongs to: there is no state in which the heading exists and its number has not arrived.",
			),

			stale: NoAsOf("clause", "the document's `EFFECTIVE:` row"),

			disabled: NotAControl("clause heading"),

			readonly: ReadOnly("clause"),

			dense: NoDense("clause", "a heading has no tight step"),

			one: NotASet("clause", "one clause"),

			many: NotASet("clause", "one clause"),

			incard: Built(
				"the legal set prints its clauses inside the white card the document's body wears",
			),

			error: Built(
				"a failed read is the `missing` arm: the number, the anchor and the name stay, and `STATUS: UNAVAILABLE` says the text is not here",
			),

			partial: Built(
				'`state="missing"` with the caller\'s sentence - a clause whose text is absent is the partial state this block was built for',
			),

			long: Built(
				"the name balances at the clause role and wraps under its own number; the citation link is `fit-content`, so a long number does not stretch the heading",
			),

			narrow: Built("the number stacks above the name at any width"),

			wide: Built("the heading keeps the document's measure"),

			signedout: Public("A clause"),

			signingin: Public("A clause"),

			signedin: Public("A clause"),

			expired: Public("A clause"),

			denied: NotApplicable(
				"The legal set is public: there is no reader this clause refuses, and a clause that pretended to hide would be a lie about a document everyone may read.",
			),

			failedsubmit: NotApplicable(
				"A clause has no submit: the document is read, not filled in.",
			),

			missingclause: Built(
				'`state="missing"` prints the number, the anchor, the name and the tombstone - a citation to §NN lands on the statement rather than on the next clause',
			),

			withaction: Built(
				"the number is a self-link, so the clause can be cited and copied; the accessible name now prints the number as the document wrote it",
			),

			print: Built(
				"the number prints as a citation, unlinked and un-underlined, on the printed sheet",
			),
		},
	},

	{
		name: "TRUSTCONTENTS",

		file: "COMPONENT/TRUST/TRUSTCONTENTS.ASTRO",

		note: "The clause rail: the document's own index beside the text, in two registers - the sticky rail at >= 1024px and the CSS-only disclosure below it - with the count and the reader's position.",

		cells: {
			loading: BuildTime(
				"clause rail",

				"its rows are the document's index, composed in the same pass as the text",
			),

			error: NotApplicable(
				"A rail cannot fail on its own: its rows are the document's index, and a document whose index failed has no rail to print - the reading surface's empty arm is that composition.",
			),

			stale: NoAsOf("rail", "the document's `EFFECTIVE:` row"),

			disabled: NotAControl("clause rail"),

			readonly: ReadOnly("rail"),

			dense: NoDense(
				"rail",

				"the rail is bounded and scrolls itself, so a tighter row would be a row in the document it indexes",
			),

			incard: NotACard("rail", "navigation, not a record's surface"),

			empty: Built(
				"`empty` prints the composed sentence in both registers and the count prints `0` - a counted zero, never a blank",
			),

			partial: Built(
				"a clause the index filed without a number prints `UNAVAILABLE` in the number's cell rather than a bare `§`",
			),

			one: Built(
				"a rail of one row, with the count and the position cell",
			),

			many: Built(
				"a 26-clause rail scrolls in its own register with the marked row kept inside it",
			),

			long: Built(
				"the name wraps under its `§NN` marker; the marker column is its own track",
			),

			narrow: Built(
				"below 1024 the rail is not painted and the disclosure is the only register",
			),

			wide: Built("the rail is a 26ch column in the page margin"),

			signedout: Public("The clause rail"),

			signingin: Public("The clause rail"),

			signedin: Public("The clause rail"),

			expired: Public("The clause rail"),

			denied: NotApplicable(
				"The legal set is public: a rail that withheld its own document's index would be navigation that hides the page it belongs to.",
			),

			failedsubmit: NotApplicable(
				"The rail has no submit: it is a jump list over a printed document.",
			),

			missingclause: Built(
				"the row stays and points at the clause's tombstone: a missing clause keeps its place in the index",
			),

			withaction: Built(
				"every row is a jump link to an id the document wrote",
			),

			print: NotApplicable(
				"The rail is navigation, and the printed document carries its clauses' own numbers - `Trust/_Contents.scss` hides both registers on paper.",
			),
		},
	},

	{
		name: "TRUSTCONTENTSLIST",

		file: "COMPONENT/TRUST/TRUSTCONTENTSLIST.ASTRO",

		note: "The clause list itself: one row per clause, `§NN  name`, rendered by both registers from the same data.",

		cells: {
			loading: BuildTime(
				"clause list",

				"the rows are the document's index and the ids are the clauses' own, written in the same pass",
			),

			error: NotApplicable(
				"A list of anchors has no failure arm: a target that moved is a broken anchor the page prints, not a state the list can invent.",
			),

			stale: NoAsOf("clause list", "the document's `EFFECTIVE:` row"),

			disabled: NotAControl("clause list"),

			readonly: ReadOnly("list"),

			dense: NoDense(
				"clause list",

				"the two registers' rows are set by the rail's and the disclosure's own rhythm",
			),

			empty: Built(
				"no row and a caller's sentence prints the sentence; no row and none renders the empty `<ol>` the register above accounts for",
			),

			partial: Built(
				"a number the document did not write prints `UNAVAILABLE`, and a name it did not write prints the same word - neither cell is ever empty",
			),

			one: Built("one row"),

			many: Built("26 rows, numbered by the document, not by the list"),

			long: Built(
				"the name wraps under its marker, never under the marker's column",
			),

			narrow: Built("the row is a two-track grid at any width"),

			wide: Built(
				"the row keeps the marker's column whatever the band's width",
			),

			incard: NotACard(
				"clause list",

				"navigation, not a record's surface",
			),

			signedout: Public("The clause list"),

			signingin: Public("The clause list"),

			signedin: Public("The clause list"),

			expired: Public("The clause list"),

			denied: NotApplicable(
				"The legal set is public: a list that hid its document's clauses would be navigation over a document everyone may read.",
			),

			failedsubmit: NotApplicable("The list has no submit."),

			missingclause: Built(
				"the missing clause keeps its row and its number, so the list and the tombstone agree about where §NN is",
			),

			withaction: Built("every row is an anchor"),

			print: NotApplicable(
				"The list prints only inside a register, and both registers are hidden on paper - the clauses carry their own numbers.",
			),
		},
	},

	{
		name: "CONTACTSHELL",

		file: "COMPONENT/CONTACT/CONTACTSHELL.ASTRO",

		note: "The route shell: the trail, the route's metadata and the document chrome, composed around the opening and the workspace - the one place the fifteen request routes agree about what a route is.",

		cells: {
			loading: BuildTime(
				"route shell",

				"the trail, the metadata and the document chrome are composed at build time around the route's blocks",
			),

			error: Built(
				'`state="interrupted"` is passed to the workspace, so the route\'s condition is stated inside the composition the shell frames',
			),

			stale: NoAsOf("route shell", "the route's record head"),

			disabled: NotAControl("route shell"),

			readonly: ReadOnly("route shell"),

			dense: NoDense(
				"route shell",

				"its rhythm is the opening's and the workspace's",
			),

			one: NotASet("route shell", "one route"),

			many: NotASet("route shell", "one route"),

			incard: NotACard("route shell", "document, not a record's surface"),

			empty: NotApplicable(
				"The shell has no empty arm of its own: it composes an opening and a workspace, and a workspace with no instrument is the workspace's `empty` cell - a second arm here would be two names for one state.",
			),

			partial: Built(
				"a route with no statutory basis prints no `〈 〉` in its record head and `BASIS: UNAVAILABLE` in its workspace",
			),

			long: Built(
				"the trail wraps and the title keeps the document's measure",
			),

			narrow: Built(
				"the opening and the workspace re-compose below 1024px in reading order",
			),

			wide: Built("the route keeps the page's 64rem measure"),

			signedout: Built(
				"the route is public: the shell prints for any reader",
			),

			signingin: NotApplicable(
				"The shell has no session state: the session, when one is needed, belongs to the form inside the workspace.",
			),

			signedin: Built("the same route, unchanged by the session"),

			expired: Built(
				"the expired session is the workspace's `interrupted` state, framed by the shell",
			),

			denied: NotApplicable(
				"A request route is public by design: the desk answers anyone, so the shell has no denied arm.",
			),

			failedsubmit: Built(
				'`state="interrupted"` reaches the workspace through the shell',
			),

			missingclause: NotApplicable(
				"A missing clause is a legal document's composition; the shell frames a request.",
			),

			withaction: Built(
				"the workspace is the action, and the trail's crumbs are the way back",
			),

			print: Built("the trail, the record head and both columns print"),
		},
	},

	{
		name: "CONTACTWORKSPACE",

		file: "COMPONENT/CONTACT/CONTACTWORKSPACE.ASTRO",

		note: "One request route, composed as a record beside its form: the route's facts, its process, its margin note and its folded aside in the left column, the instrument in the right, divided by the site's 1px divider.",

		cells: {
			loading: NotApplicable(
				"The shell is server-rendered and the form is the island: the loading arm belongs to the form's own states, and a status line above it would print the same fact twice.",
			),

			stale: NoAsOf("request workspace", "the route's record"),

			disabled: NotAControl("request workspace"),

			readonly: ReadOnly("workspace"),

			dense: NoDense(
				"workspace",

				"the 4/1px/8 split is the composition, and density inside it belongs to the form and the record column",
			),

			one: NotASet("request workspace", "one route's workspace"),

			many: NotASet("request workspace", "one route's workspace"),

			incard: NotACard("workspace", "container, not a record's surface"),

			empty: Built(
				"the `form` slot mounted empty: the record column prints and the instrument's column is stated as absent by the caller - the seam is what makes the state printable",
			),

			partial: Built(
				"`BASIS:` prints `UNAVAILABLE` for a route with no statutory basis; the row stays and the value says so",
			),

			error: Built(
				'`state="interrupted"` prints `STATUS: INTERRUPTED` and the route\'s declarations above the record',
			),

			long: Built(
				"the record ledger's values wrap and the margin note caps at the measure; the form column takes the slack",
			),

			narrow: Built(
				"below 1024 the form comes first and the record follows under the divider, in reading order",
			),

			wide: Built("the 4/1px/8 split on the page's measure"),

			signedout: Built(
				"the record column prints for any reader; the form asks for a session when its send needs one",
			),

			signingin: NotApplicable(
				"The route is read, not signed in: the form asks for a session when it needs one, and the workspace has no state between 'the record is printed' and 'the form is ready'.",
			),

			signedin: Built(
				"the resting route, with the session the form carries",
			),

			expired: Built(
				'`state="interrupted"` states the record\'s condition; the form states what the expired session needs next',
			),

			denied: NotApplicable(
				"A request route is public by design - the desk answers anyone, including a reader with no account - so there is no reader this workspace refuses.",
			),

			failedsubmit: Built(
				'`state="interrupted"`: the record column states the failed send, with the route, the mailbox and the window it still owes',
			),

			missingclause: NotApplicable(
				"A missing clause is a legal document's composition; a request route files a request.",
			),

			withaction: Built(
				"the form is the action, and the `form` slot lets a caller mount a different instrument without a wrapper",
			),

			print: Built(
				"both columns print; the pinned plate stands still and the gutter keeps its rule",
			),
		},
	},

	{
		name: "CONTACTPAGE",

		file: "COMPONENT/CONTACT/CONTACTPAGE.ASTRO",

		note: "The document chrome every Contact route shares: the site header, the opening, and the route's body - and the empty arm a route whose form never mounted now has.",

		cells: {
			loading: BuildTime(
				"page chrome",

				"the layout is composed at build time around the route's opening",
			),

			disabled: NotAControl("page chrome"),

			readonly: ReadOnly("page chrome"),

			dense: NoDense(
				"page chrome",

				"a page's rhythm is its opening distance and its body's",
			),

			one: NotASet("page", "one route"),

			many: NotASet("page", "one route"),

			incard: NotACard("page chrome", "document, not a record's surface"),

			empty: Built(
				'`state="empty"` prints the absence under the record head: the route says what it is even when its instrument is not there',
			),

			partial: Built(
				"an opening with a record and no heading, or a heading and no record: each part is its own condition",
			),

			error: Built(
				"the empty arm is the failed-read arm, with the page's sentence",
			),

			stale: NoAsOf("page chrome", "the route's record head"),

			long: Built(
				"the record line wraps between its cells and the heading balances at the section tier",
			),

			narrow: Built(
				"one column below the grid's floor; the record cells wrap between themselves",
			),

			wide: Built("the opening and the body repeat the same measure"),

			signedout: Public("A Contact page"),

			signingin: Public("A Contact page"),

			signedin: Public("A Contact page"),

			expired: Public("A Contact page"),

			denied: NotApplicable(
				"A request route is public by design: the desk answers anyone, so the page has no denied arm to print.",
			),

			failedsubmit: Built(
				'`state="empty"` with the page\'s sentence: the route whose form never booted is a body that is absent, and it is stated',
			),

			missingclause: NotApplicable(
				"A missing clause is a legal document's composition; a Contact page files a request.",
			),

			withaction: NotApplicable(
				"The page prints no action of its own: the trail's crumbs are the only links in the chrome, and the route's instrument owns its actions.",
			),

			print: Built(
				"the chrome prints; the header's island is the browser's",
			),
		},
	},

	{
		name: "CONTACTHEAD",

		file: "COMPONENT/CONTACT/CONTACTHEAD.ASTRO",

		note: "The opening every Contact route shares: the trail, the route's record head - `# CODE  〈BASIS〉  /CONTACT  SLA: 30d` - and the page's heading when it has one.",

		cells: {
			loading: NotApplicable(
				"The opening is printed with the page: there is no state in which the trail exists and the record has not arrived.",
			),

			stale: NoAsOf("record head", "the route's registry entry"),

			disabled: NotAControl("record head"),

			readonly: ReadOnly("record head"),

			dense: NoDense(
				"opening",

				"its rhythm is the page's opening distance",
			),

			one: NotASet("opening", "one route's record"),

			many: NotASet("opening", "one route's record"),

			incard: NotACard("opening", "page opening, not a record's surface"),

			empty: Built(
				'`state="empty"` prints `◎`, the sentence and `STATUS: UNAVAILABLE` under the record head',
			),

			partial: Built(
				"no statutory basis prints no `〈 〉` bracket and no window prints no `SLA:` cell - an absent cell prints nothing rather than an empty bracket",
			),

			error: Built("the empty arm is the failed-read arm"),

			long: Built(
				"a long code, a long basis and a long route wrap between cells at the U+2001 separators; the article keeps its own case",
			),

			narrow: Built(
				"the record line wraps to two rows; the heading balances",
			),

			wide: Built("the opening keeps the page's 64rem measure"),

			signedout: Built(
				"the record head is the route's, not the visit's: it prints for any reader",
			),

			signingin: NotApplicable(
				"The opening has no signing-in state: the exchange happens in the route's instrument, below it.",
			),

			signedin: Built("the same record, unchanged by the session"),

			expired: Built(
				"the record prints; the expired session is the instrument's state, not the opening's",
			),

			denied: NotApplicable(
				"A request route is public by design: the desk answers anyone, so the opening has no denied arm.",
			),

			failedsubmit: Built(
				"the empty arm states the body's absence after a form that never mounted; a failed send below it is the instrument's own report",
			),

			missingclause: NotApplicable(
				"A missing clause is a legal document's composition; the opening files a request.",
			),

			withaction: Built(
				"the trail's crumbs are the opening's links, and the last crumb is the page",
			),

			print: Built("the trail, the record and the heading print"),
		},
	},

	{
		name: "CONTACTBREADCRUMB",

		file: "COMPONENT/CONTACT/CONTACTBREADCRUMB.ASTRO",

		note: "The absorbed trail, kept as the bridge the Blog still imports: it writes each label into the `/LABEL` grammar and renders the site's one trail.",

		cells: {
			loading: NotApplicable(
				"A trail is written with the page: there is no state in which the crumbs exist and their labels have not arrived.",
			),

			error: NotApplicable(
				"A breadcrumb has no failure arm: a crumb whose target moved is a broken link the page prints, not a state the bridge can invent.",
			),

			stale: NoAsOf("trail", "the page it is printed on"),

			disabled: NotAControl("trail"),

			readonly: ReadOnly("trail"),

			dense: NoDense("trail", "one row of crumbs at the meta step"),

			incard: NotACard(
				"trail",

				"route statement, not a record's surface",
			),

			empty: Built(
				"an empty trail renders the trail's own empty `<ol>`; a page with no crumbs does not mount the bridge, and `Trail`'s empty arm is recorded as an observation",
			),

			partial: Built(
				"a crumb with no `href` prints as the current page, so the last crumb is never a link to itself",
			),

			one: Built("one crumb: the page itself, as text"),

			many: Built("three crumbs: two links and the page"),

			long: Built(
				"a long label wraps inside its own crumb; the row wraps between crumbs, never inside the grammar",
			),

			narrow: Built("the row wraps at the page's measure"),

			wide: Built("the row is one line at the page's measure"),

			signedout: Public("A trail"),

			signingin: Public("A trail"),

			signedin: Public("A trail"),

			expired: Public("A trail"),

			denied: NotApplicable(
				"A trail states where the reader is; it cannot be a surface a reader may not see.",
			),

			failedsubmit: NotApplicable("A trail has no submit."),

			missingclause: NotApplicable("A trail names routes, not clauses."),

			withaction: Built("every crumb but the last is a link"),

			print: Built(
				"the crumbs print; the underline is the print stylesheet's",
			),
		},
	},

	{
		name: "STATUSBOARD",

		file: "COMPONENT/MORE/STATUSBOARD.ASTRO",

		note: "A set of records partitioned by the state each one states: four shelves, each with its register head, its count, its note and its rows - and the empty column kept as a fact.",

		cells: {
			loading: BuildTime(
				"status board",

				"its columns and rows are the record registry's, read in the same pass as the page",
			),

			error: NotApplicable(
				"A board has no failure arm: a set that could not be read is a board with no column, and the composed empty arm states it.",
			),

			stale: NoAsOf("status board", "each record's own page"),

			disabled: NotAControl("status board"),

			readonly: ReadOnly("board"),

			dense: NoDense(
				"board",

				"a board compresses by counting, not by shrinking - the count is in the head, so a reader who wants the number does not read the rows",
			),

			incard: NotACard(
				"status board",

				"band's artifact, not a record's surface",
			),

			empty: Built(
				"no columns and a caller's sentence prints the sentence; no columns and none now renders nothing at all, which is what the block always documented",
			),

			partial: Built(
				"a column with no row prints its own composed sentence and keeps its head, its count and its rule",
			),

			one: Built(
				"a board of one column is one shelf at the band's measure",
			),

			many: Built("four columns, one of them holding sixteen rows"),

			long: Built(
				"a row's name and meta wrap inside the row; the state word stays at the row's right end",
			),

			narrow: Built(
				"the shelves stack in reading order and keep their heads and counts",
			),

			wide: Built(
				"four shelves on the band's measure, each sized by its own content",
			),

			signedout: Public("A status board"),

			signingin: Public("A status board"),

			signedin: Public("A status board"),

			expired: Public("A status board"),

			denied: NotApplicable(
				"The board states what is live for anyone who reads it; a column the reader may not see would make the site's own state unreadable.",
			),

			failedsubmit: NotApplicable(
				"A board has no submit: it is a printed register.",
			),

			missingclause: NotApplicable(
				"A missing clause is a legal document's composition; the board files records.",
			),

			withaction: Built(
				"a row with an `href` is a link; a row without one is a statement in the same grammar",
			),

			print: Built("the shelves, the rules and the counts print"),
		},
	},

	{
		name: "LEXICON",

		file: "COMPONENT/MORE/LEXICON.ASTRO",

		note: "One run of the glossary: its marker, its heading, its count, its note, the letters it actually uses as links, and the words filed under each letter.",

		cells: {
			loading: BuildTime(
				"lexicon run",

				"its terms are the glossary's own data, composed in the same pass as the page",
			),

			error: NotApplicable(
				"A run has no failure arm: a glossary whose data could not be read is a build that does not run.",
			),

			stale: NoAsOf("lexicon run", "each entry's `SOURCE:` row"),

			disabled: NotAControl("lexicon run"),

			readonly: ReadOnly("run"),

			dense: NoDense(
				"run",

				"the density of a glossary is the number of words, and that is the content's business",
			),

			incard: NotACard(
				"lexicon run",

				"page's body, not a record's surface",
			),

			empty: Built(
				"a run with no term prints its own composed sentence and keeps its head, its marker and its note",
			),

			partial: Built(
				"a term with no source prints `SOURCE: UNAVAILABLE` in the quiet ink, so a paraphrase is distinguishable from a citation",
			),

			one: Built(
				"a run of one word prints one entry and no letter strip - a one-link navigation is a nav that says what the count already says",
			),

			many: Built(
				"a run of ninety prints ninety entries under as many letters as it uses",
			),

			long: Built(
				"the term column is 16rem and the definition takes the rest; a definition longer than three sentences is the data's defect, not the layout's",
			),

			narrow: Built(
				"the term moves above its definition and keeps its rule",
			),

			wide: Built("the term sits in the margin of its own definition"),

			signedout: Public("A lexicon run"),

			signingin: Public("A lexicon run"),

			signedin: Public("A lexicon run"),

			expired: Public("A lexicon run"),

			denied: NotApplicable(
				"A glossary is public: every word the document uses is a word any reader may look up.",
			),

			failedsubmit: NotApplicable("A run has no submit."),

			missingclause: NotApplicable(
				"A missing clause is a legal document's composition; a run files words.",
			),

			withaction: Built(
				"the letter strip and every `WHERE:` row are links",
			),

			print: Built("the letters, the terms and the definitions print"),
		},
	},

	{
		name: "LEXICONENTRY",

		file: "COMPONENT/MORE/LEXICONENTRY.ASTRO",

		note: "One word, defined: the term in the margin, the sense on the measure, the extra facts it carries, and the record, route and source under it.",

		cells: {
			empty: NotApplicable(
				"A definition is required: an entry with no sense is a word in a list, which is what the run's letter groups already are.",
			),

			loading: NotApplicable(
				"An entry is printed with the run: there is no state in which the word exists and its definition has not arrived.",
			),

			error: NotApplicable(
				"An entry has no failure arm: a definition the tree does not carry is a `SOURCE: UNAVAILABLE` row, which is the partial state.",
			),

			stale: NoAsOf("entry", "the file its `SOURCE:` row names"),

			disabled: NotAControl("entry"),

			readonly: ReadOnly("entry"),

			dense: NoDense(
				"entry",

				"a definition that is compressed is a definition that has stopped saying what the word means",
			),

			one: NotASet("entry", "one word"),

			many: NotASet("entry", "one word"),

			incard: Built(
				"a leaf inside a card is allowed: the card is a surface and the entry is its content",
			),

			partial: Built(
				"no source prints `SOURCE: UNAVAILABLE` in the quiet ink; no expansion prints no line; no rows print no ledger",
			),

			long: Built(
				"the definition wraps at the measure, the rows' values break anywhere, and the fact strip wraps between facts",
			),

			narrow: Built(
				"the term goes above its definition and keeps its rule",
			),

			wide: Built(
				"the term column is 16rem; the definition takes the rest",
			),

			signedout: Public("A lexicon entry"),

			signingin: Public("A lexicon entry"),

			signedin: Public("A lexicon entry"),

			expired: Public("A lexicon entry"),

			denied: NotApplicable(
				"A glossary is public: a word's definition is not a thing to withhold.",
			),

			failedsubmit: NotApplicable("An entry has no submit."),

			missingclause: NotApplicable(
				"An entry defines a word, not a clause.",
			),

			withaction: Built(
				"`WHERE:` is the one link an entry prints, and it is a route to the thing itself",
			),

			print: Built("the term, the definition and the facts print"),
		},
	},

	{
		name: "QUIETHEAD",

		file: "COMPONENT/MORE/QUIETHEAD.ASTRO",

		note: "The opening of a reference document: a marker, a bare `h1`, one proposition, and the extent as a white facts strip - and, now, the strip's composed empty arm.",

		cells: {
			loading: NotApplicable(
				"A head is printed with the page: there is no state in which the title exists and its facts have not arrived.",
			),

			error: NotApplicable(
				"A head has no failure arm: a strip that could not be read is the empty arm with its sentence.",
			),

			disabled: NotAControl("reference head"),

			readonly: ReadOnly("head"),

			dense: NoDense(
				"head",

				"one marker, one title, one proposition and one strip",
			),

			one: NotASet("head", "one document's opening"),

			many: NotASet("head", "one document's opening"),

			incard: NotACard(
				"reference head",

				"page opening, not a record's surface",
			),

			empty: Built(
				"no row prints the ledger's composed empty arm: `◎` and the caller's sentence instead of an empty frame, under the same head",
			),

			partial: Built(
				"a row whose value is unknown prints `UNAVAILABLE`; the row stays, the value says so",
			),

			stale: Built(
				"the strip's date row is where an age is printed: an old date is the row's value, and the head does not invent a second figure",
			),

			long: Built(
				"the title balances at the L tier and the proposition caps at the measure; a long fact value wraps inside its row",
			),

			narrow: Built("the strip folds to one column below 1024"),

			wide: Built("the strip is two columns at 1024 and up"),

			signedout: Public("A reference head"),

			signingin: Public("A reference head"),

			signedin: Public("A reference head"),

			expired: Public("A reference head"),

			denied: NotApplicable(
				"A reference document is public: its opening states what is inside for any reader.",
			),

			failedsubmit: NotApplicable("A head has no submit."),

			missingclause: NotApplicable(
				"A head opens a reference document, not a clause.",
			),

			withaction: NotApplicable(
				"The head prints no action: its proposition is a sentence and its strip is facts. A control inside a nameplate would be a control inside a nameplate.",
			),

			print: Built(
				"the marker, the title, the proposition and the strip print",
			),
		},
	},

	{
		name: "ONWARD",

		file: "COMPONENT/MORE/ONWARD.ASTRO",

		note: "The routing register: the intent the reader arrived with, and the destination that answers it - with the reader's own row stated rather than linked.",

		cells: {
			loading: BuildTime(
				"routing register",

				"its rows are the page's own copy, composed at build time",
			),

			error: NotApplicable(
				"A register has no failure arm: a destination that is gone is a tombstone the page prints, and a register that invented an error state would be inventing a fact about a link.",
			),

			stale: NoAsOf("routing register", "the page's folio"),

			disabled: NotAControl("routing register"),

			readonly: ReadOnly("register"),

			dense: NoDense(
				"register",

				"one row per intent, at the reading step",
			),

			incard: Built(
				"a leaf inside a card is allowed: the card is a surface and the register is its content",
			),

			empty: Built("no row prints the copy's required `empty` sentence"),

			partial: Built(
				"a row with no note prints the row and no note; a row whose destination is the current page prints as a statement",
			),

			one: Built("one intent, one destination"),

			many: Built("six intents wrap at the band's measure"),

			long: Built(
				"the intent takes the slack and wraps; the destination stays at the row's right end",
			),

			narrow: Built(
				"the destination goes under the intent and keeps its arrow",
			),

			wide: Built(
				"the intent column is the measure's own and the destination sits at the row's end",
			),

			signedout: Public("A routing register"),

			signingin: Public("A routing register"),

			signedin: Public("A routing register"),

			expired: Public("A routing register"),

			denied: NotApplicable(
				"A register is a way out: withholding a destination would be withholding the exit.",
			),

			failedsubmit: NotApplicable("A register has no submit."),

			missingclause: NotApplicable(
				"A register files intents, not clauses.",
			),

			withaction: Built(
				'every row is a link except the reader\'s own, which is a statement carrying `aria-current="page"`',
			),

			print: Built(
				"the register prints; the hover fill is the browser's",
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

		value: "CONTENT/SPECIMEN/SMALL.TS",

		note: "every figure above is counted from the three tables in this file",
	},
];

/* ─── THE IMPROVEMENTS ───────────────────────────────────────────────────── */

/** One behaviour the matrix revealed, and where it now lives. */
export interface Improvement {
	/** `AUTHSHELL` - the component the behaviour is in. */
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
		component: "AUTHSHELL",

		from: "SIGNED OUT / EMPTY",

		found: "The state register was nested inside `{Frame && …}`. A route that stated a state and opened with no frame - a bare callback landing, a route whose heading lives in its card - handed in `States` and `Declarations` and the shell printed neither. The one block that makes four app surfaces one instrument was the one block that could lose its state to a heading.",

		built: "`SurfaceStatusLine` renders outside the frame's condition, after the header and before the card. A framed route prints exactly what it printed before - header, then register, then card - and a frameless one prints the register instead of nothing.",
	},

	{
		component: "AUTHSHELL",

		from: "SIGNING IN",

		found: "A short interior - a loading arm, a signed-in ending, an expired link - sat at the top of a `100vh` column with half a screen of paper below it, because `Center` centred the card's text and nothing centred the card. The page a reader reaches when they are locked out was the page that looked unfinished.",

		built: '`Align="center"` makes the shell\'s `flex-1` track a centred column, so the card sits in the viewport it is the only thing in. `start` is the default and is the composition every route already renders.',
	},

	{
		component: "AUTHREPORT",

		from: "REST",

		found: "The block's own docstring said the title is an `h2` under the shell's `h1`; the markup printed an `h3`. Every report on every credential route skipped a heading level, and the file that documented the fix was the file that had not made it.",

		built: "`Heading` defaults to `2` and the title renders as an `h2`; `3` exists for the one nesting case. The level is a prop rather than a constant so a nested report can still go one deeper without a second block.",
	},

	{
		component: "AUTHREPORT",

		from: "ERROR / EXPIRED",

		found: "A report could say what happened and not what it was made of. `STATUS: INTERRUPTED` over one sentence left the reader with no window, no cause and no route - the three facts an error state owes - and the only way to print them was to hand in a second block under the report.",

		built: "`Facts` prints `KEY: value` rows under the sentence in the record grammar, at the meta step, centred as a block with the rows start-aligned. `WINDOW:`, `CAUSE:`, `RETRY:` and `AS OF:` are the four the family uses.",
	},

	{
		component: "AUTHREPORT",

		from: "WITH ACTION",

		found: "The one thing a reader can click was only expressible as React children. A report rendered outside an island - the specimen sheet, a link-shaped ending, any state whose action is a destination rather than a handler - printed no action at all, and the block's own comment says an action silently dropped is the defect it exists to prevent.",

		built: "`Action` prints the one action as a link wearing the primary tier's properties, with the U+2001 separator and the arrow the site's actions carry. `children` remains the form-shaped arm and wins when both are given: one action per report.",
	},

	{
		component: "PRIVACYREQUESTS",

		from: "DENIED / SIGNED OUT",

		found: "The directory had one rendering: the full list. A dashboard surface a signed-out reader reached printed six rights and five channels as though they could act on any of them, and the page never said which session it was reading with. There was no denied arm and no empty arm - a registry that returned nothing printed a heading, an intro about six rights, and a grid of nothing.",

		built: '`state="denied"` prints `SurfaceAbsent` - `STATUS: UNAVAILABLE`, what would be here, why it is not, the way in and the retry. Each grid prints its own composed `empty` sentence from `Data.ts` under the same heading when it holds no card, so a label is never printed over a hole.',
	},

	{
		component: "PRIVACYREQUESTS",

		from: "MANY / ONE",

		found: "Three sets, three headings, no figure anywhere. Every other counted line on the site prints `# LABEL / NN`; the directory was the one place a reader could not tell six rights from two, and the intro's own sentence ('the following rights') was the only count on the page.",

		built: "Each block prints its register through `Register.astro`, composed with `RegisterOf` from the rows it is about to render: `# THE RIGHTS / 06`, `# THE CHANNELS / 05`, `# THE ERASURE / 01`. The line cannot outlive its set, and `erase={null}` drops the section rather than printing an erasure card for a route that does not answer.",
	},

	{
		component: "TRUSTCLAUSE",

		from: "MISSING CLAUSE",

		found: "The legal set's worst state had no arm: a clause the document's index names and the text does not carry. A caller either omitted the heading - and the index's row pointed at nothing - or printed an empty one. And the accessible name read `Clause ${Number(number)}`, which prints 'Clause NaN' for any number the document writes as `07A` or `12.1`.",

		built: "`state=\"missing\"` keeps the number, the anchor and the name, and prints `STATUS: UNAVAILABLE` and the caller's sentence under them, indented to the clause's own rule - a citation to §NN lands on the statement rather than on the next clause. The accessible name prints the number as the document wrote it.",
	},

	{
		component: "TRUSTCONTENTS",

		from: "EMPTY",

		found: "A document whose index is empty printed `CLAUSES 0` over an empty `<ol>`: a count with nothing under it, which reads as a list that failed to render rather than as a document with no clauses. The count was right and the sentence was missing.",

		built: "`empty` prints the composed sentence in both registers, under the same head and the same count - the count stays, because `0` is a counted zero and it is the honest figure. The rows themselves now fall back to `UNAVAILABLE` for a number or a name the document did not write, so a row is never an empty anchor.",
	},

	{
		component: "CONTACTWORKSPACE",

		from: "FAILED SUBMIT",

		found: "A request route whose send failed reported it inside the form and nowhere else. The record column - the page's instrument, the column that carries the route's facts - said nothing: a reader looking at the facts could not tell a route at rest from a route whose last send was interrupted, and the page's own state vocabulary was absent from the one page that had just failed.",

		built: '`state="interrupted"` prints `SurfaceStatusLine` at the top of the record column: `STATUS: INTERRUPTED` plus the three declarations that make it auditable - `ROUTE:`, `MAILBOX:`, `SLA:` - so the failure is a state of the record, in the same instrument as the rest of the site.',
	},

	{
		component: "CONTACTWORKSPACE",

		from: "WITH ACTION / IN A CARD",

		found: "The shell mounted `DynamicContactForm` unconditionally, so the one island was also the one thing a caller could not replace: a specimen plate could not print the composition without hydrating a real Auth0 form, and a route with a different instrument had no seam.",

		built: "A `form` slot: absent, the island mounts exactly as before; present, the caller's instrument takes the form column and the record column is unchanged. The shell still owns the split, the gutter and the reading order.",
	},

	{
		component: "CONTACTPAGE",

		from: "EMPTY / FAILED SUBMIT",

		found: "A request route's `h1` lives inside its form island, so a route whose island never booted printed a trail, a record head and nothing else: no heading, no body, and no statement that anything was missing. The page chrome had no adverse state at all.",

		built: '`state="empty"` prints the absence under the record head - `◎`, the sentence and `STATUS: UNAVAILABLE` - so the route says what it is even when its instrument is not there. The opening itself is now `ContactHead`, which is what makes the state printable outside a document.',
	},

	{
		component: "CONTACTHEAD",

		from: "REST / WITH ACTION",

		found: "The opening was eleven lines inside `ContactPage`, between its `<Base>` and its slot. The one part of a Contact page that carries the record grammar could not be printed anywhere but inside a document: not on a specimen sheet, not by a route that composes its own chrome.",

		built: "`ContactHead` is the opening as a block - trail, record head, heading - and `ContactPage` composes it under `Base`. The composition is byte-for-byte the same: the same measures, the same `opening` and `width` arms, the same record cells.",
	},

	{
		component: "STATUSBOARD",

		from: "EMPTY / PARTIAL",

		found: "Two defects the combinations found in one block. A board with no columns printed `<p>{empty}</p>` whether or not the caller had a sentence - so the state the block documents as 'renders nothing at all' rendered a section with an empty line in it. And the row's state word was colour-only, while every other register on the site prints the square before the word, so the board was the one place a reader had to see the ink to know the state.",

		built: "The empty arm prints the sentence when there is one and nothing when there is not. The row's state now carries the mark its tone already implied, in the same 2px square the register uses, so the word survives greyscale and a row read out of its column still reads as a state.",
	},

	{
		component: "LEXICON",

		from: "ONE / MANY",

		found: "The run's head named the run and not its extent: `# RUN_01`, a heading and a note, with no figure anywhere, while the alphabet strip beneath it was the reader's only clue to how much was filed. And a run of one letter printed a one-link navigation - a nav that says 'there is only one'.",

		built: "The head prints the count, composed from `Run.terms.length` and a caller's `unit` (`26 WORDS`), so the figure cannot outlive the terms. The letter strip prints only when the run uses two or more letters; the group's own letter heading is untouched.",
	},

	{
		component: "LEXICONENTRY",

		from: "PARTIAL",

		found: "`SOURCE: UNAVAILABLE` printed in the same ink as `SOURCE: Content/More/Glossary.ts`. The block's own docstring exists to draw that difference - a citation versus a summary - and the difference was invisible at a glance, because the one value that is not a fact was set like the ones that are.",

		built: "The absent source takes the quiet ink and a `--unavailable` class, the same tone `SurfaceState` gives an `UNAVAILABLE` word; a cited source keeps full ink. The row was already there and nothing moved.",
	},

	{
		component: "QUIETHEAD",

		from: "EMPTY",

		found: "A reference document whose facts strip could not be read printed a heading, a proposition and an empty ledger frame: a page that states its extent and then shows a box with nothing in it.",

		built: '`empty` is forwarded to `RecordLedger` with `state="empty"`, so the strip prints the composed sentence instead of the frame - and the marker, the title and the proposition still print, because those are the document\'s and they are still true.',
	},

	{
		component: "ONWARD",

		from: "REST / WITH ACTION",

		found: "A register printed on the page it routes to listed that page as a destination: 'you are here, and here is the way here'. Every row was a link, so the one row that could not be followed was the one row the register was standing on.",

		built: '`current` names the destination the reader is at; that row prints as a statement carrying `aria-current="page"`, in the same grammar, with the arrow kept and `YOU ARE HERE` at its end. A register with no `current` renders exactly as it did.',
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
		component: "CONTACTBREADCRUMB",

		found: "An empty trail renders `Trail`'s empty `<ol>` inside a `nav` with an accessible name - an empty breadcrumb landmark. The bridge passes the empty array through, and no page mounts it with one, so the defect is latent rather than live.",

		owner: "The card that owns `Component/Route/Trail.astro`. The fix is one line (`trail.length ? … : null`) and it belongs to the trail's own family, not to the bridge that renders it.",
	},

	{
		component: "AUTHREPORT",

		found: "Two call sites still print a report with no `State`: `Dynamic/VerifyPage.tsx`'s success and failure arms pass a title, a sentence and a glyph, so `Email verified` and `Verification failed` print without the vocabulary's word. The block made the label required; the callers were not updated in the same pass because they belong to the `Dynamic/*` layer.",

		owner: "A card on the `Dynamic/*` credential adapters. It is a two-prop change per arm, and it wants the route's own reading first - `verify.success` and `verify.error` already carry the words in `Auth/Content.ts`.",
	},

	{
		component: "CONTACTPAGE",

		found: "A request route's `h1` lives inside the form island, so a route whose island never boots has no page heading even with the empty arm: the page states that its body is missing, but its accessible name is the trail's.",

		owner: "A card on the Contact routes and `DynamicContactForm`. The honest fix is an `h1` the route owns above the form (and the form's title demoted), which changes what the form prints - so it wants the owner's reading of the form's opening before it moves.",
	},

	{
		component: "PRIVACYREQUESTS",

		found: "The directory's cards are composed with utilities, while `Dashboard/_PrivacyRequests.scss` publishes a `.requests*` set that no component mounts. The two shapes describe the same directory and only one of them is live.",

		owner: "A card on the dashboard, if the owner wants the block's anatomy to live in its partial rather than in utility strings. The change is mechanical but it touches every card's markup.",
	},

	{
		component: "TRUSTCONTENTS",

		found: "The rail's marking is wired by `Trust/TrustContents.ts`, which looks for `.reading-document__body` before it marks anything. A rail mounted outside that surface - the specimen plate is the first - prints its rows and no position figure, because the module cannot find the body it measures.",

		owner: "A card on the reading surface, if the rail is ever mounted outside `ReadingDocument`. The module would have to take its body selector as a parameter; today the two surfaces that mount the rail are the two that carry the body.",
	},
];

/* ─── THE SPECIMENS ──────────────────────────────────────────────────────── */

/** One group of rows on the plate: the family's own reading order. */
export type Group =
	"credentials" | "account" | "licence" | "request" | "reference" | "adverse";

/** Which block a row mounts. The renderer switches on it and on nothing else. */
export type Kind =
	| "authshell"
	| "authreport"
	| "privacy"
	| "clause"
	| "contents"
	| "contentslist"
	| "contactshell"
	| "contactworkspace"
	| "contacthead"
	| "breadcrumb"
	| "board"
	| "lexicon"
	| "entry"
	| "quiethead"
	| "onward"
	| "absent";

/** What every row states, whatever block it mounts. */
export interface Spec {
	/** `SMALL_01` - the row's own mark, printed at its head. */
	readonly mark: string;

	/** The state or combination, in the sheet's register: `SIGNED OUT`. */
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
}

/**
 * The rows, in reading order: the credential frame and its report, the account
 * directory, the licence's clause apparatus, a request route, the reference
 * blocks, and the adverse compositions.
 *
 * Every row is a state the site either uses or could use, and the `when` line is
 * the one thing a picture of a component cannot carry: the sentence that says
 * which composition is right. A row printed here that the site never needs is
 * still a row: a component that survives its own worst combination is a
 * component whose design frame is real.
 */
export const Specimens: readonly Specimen[] = [
	/* ── CREDENTIALS ─────────────────────────────────────────────────────── */
	{
		mark: "SMALL_01",

		state_name: "THE SIGN-IN FRAME",

		component: "AUTHSHELL",

		when: "The resting credential route: `/SIGN IN`, the page's one `h1`, one sentence, the card, and one alternate action under it.",

		kind: "authshell",
	},

	{
		mark: "SMALL_02",

		state_name: "SIGNING IN",

		component: "AUTHSHELL",

		when: "A short interior while the exchange runs: the card sits in the middle of the viewport it is the only thing in, with `STATUS: LOADING` above it.",

		kind: "authshell",

		variant: "signingin",
	},

	{
		mark: "SMALL_03",

		state_name: "NO FRAME",

		component: "AUTHSHELL",

		when: "A route that states its condition without opening a heading: the register prints on its own, which it could not do before this card.",

		kind: "authshell",

		variant: "frameless",
	},

	{
		mark: "SMALL_04",

		state_name: "EXPIRED LINK",

		component: "AUTHSHELL",

		when: "The reset or verification link closed: `STATUS: INTERRUPTED` in the frame, and a card that says what the window was and where the retry goes.",

		kind: "authshell",

		variant: "expired",
	},

	{
		mark: "SMALL_05",

		state_name: "DENIED",

		component: "AUTHSHELL",

		when: "A route the reader may not reach: `STATUS: UNAVAILABLE` above a card that says what the surface is, not only that it cannot be had.",

		kind: "authshell",

		variant: "denied",
	},

	{
		mark: "SMALL_06",

		state_name: "VERIFIED",

		component: "AUTHREPORT",

		when: "A state that ends well: the check glyph, `STATUS: VERIFIED`, one sentence and the one action that follows it.",

		kind: "authreport",

		variant: "verified",
	},

	{
		mark: "SMALL_07",

		state_name: "LOADING REPORT",

		component: "AUTHREPORT",

		when: "A state that has not arrived: the busy arm draws the shape of the answer instead of a spinner, and the word is already printed above it.",

		kind: "authreport",

		variant: "loading",
	},

	{
		mark: "SMALL_08",

		state_name: "INTERRUPTED, WITH FACTS",

		component: "AUTHREPORT",

		when: "A send that failed: `STATUS: INTERRUPTED` with `WINDOW:`, `CAUSE:` and `RETRY:` under the sentence - the three facts an error state owes.",

		kind: "authreport",

		variant: "interrupted",
	},

	{
		mark: "SMALL_09",

		state_name: "LONG SENTENCE",

		component: "AUTHREPORT",

		when: "A provider's own error sentence, longer than the card: the prose wraps and a fact's value breaks anywhere rather than widening the card.",

		kind: "authreport",

		variant: "long",

		width: "narrow",
	},

	/* ── ACCOUNT ─────────────────────────────────────────────────────────── */
	{
		mark: "SMALL_10",

		state_name: "THE DIRECTORY",

		component: "PRIVACYREQUESTS",

		when: "The dashboard's data-rights directory at rest: three counted sets, eleven destinations, each opening the form that files it.",

		kind: "privacy",
	},

	{
		mark: "SMALL_11",

		state_name: "EMPTY GRIDS",

		component: "PRIVACYREQUESTS",

		when: "A registry that answered with no card: each grid prints its own composed sentence under the same heading, and the register still prints its counted zero.",

		kind: "privacy",

		variant: "empty",
	},

	{
		mark: "SMALL_12",

		state_name: "DENIED READER",

		component: "PRIVACYREQUESTS",

		when: "A signed-out reader at a dashboard surface: what the directory is, why it is not being listed, the way in and the retry - never a list the reader cannot act on.",

		kind: "privacy",

		variant: "denied",
	},

	{
		mark: "SMALL_13",

		state_name: "ONE RIGHT",

		component: "PRIVACYREQUESTS",

		when: "A registry with one right filed: one card at the grid's floor, and the register counts `01` - the set states its own size.",

		kind: "privacy",

		variant: "one",

		width: "narrow",
	},

	/* ── LICENCE ─────────────────────────────────────────────────────────── */
	{
		mark: "SMALL_14",

		state_name: "THE CLAUSE",

		component: "TRUSTCLAUSE",

		when: "A clause as the document prints it: the number as the anchor, the name as the heading's words, and the paragraph under it.",

		kind: "clause",
	},

	{
		mark: "SMALL_15",

		state_name: "MISSING CLAUSE",

		component: "TRUSTCLAUSE",

		when: "A clause the index names and the text does not carry: the number, the anchor and the name stay, and `STATUS: UNAVAILABLE` says why the paragraph is not here.",

		kind: "clause",

		variant: "missing",
	},

	{
		mark: "SMALL_16",

		state_name: "THE RAIL",

		component: "TRUSTCONTENTS",

		when: "The clause rail in the page margin: the count, the reader's position cell and every clause as a `§NN  name` row.",

		kind: "contents",

		variant: "rail",

		width: "narrow",
	},

	{
		mark: "SMALL_17",

		state_name: "THE DISCLOSURE",

		component: "TRUSTCONTENTS",

		when: "The same register below 1024px: a closed `<details>` above the document, one tap from the whole list.",

		kind: "contents",

		variant: "disclosure",
	},

	{
		mark: "SMALL_18",

		state_name: "EMPTY REGISTER",

		component: "TRUSTCONTENTS",

		when: "A document whose index holds no clause: the count prints `0` and the sentence says what would be here - never a count over an empty list.",

		kind: "contents",

		variant: "empty",

		width: "narrow",
	},

	{
		mark: "SMALL_19",

		state_name: "ROWS WITHOUT NUMBERS",

		component: "TRUSTCONTENTSLIST",

		when: "A clause the index filed without a number or a name: the row prints `UNAVAILABLE` in the empty cell instead of a bare `§` or an empty anchor.",

		kind: "contentslist",

		variant: "missing",

		width: "narrow",
	},

	{
		mark: "SMALL_20",

		state_name: "ONE ROW",

		component: "TRUSTCONTENTSLIST",

		when: "A document with one clause: one row, one number, and the list's own rhythm at the rail's width.",

		kind: "contentslist",

		variant: "one",

		width: "narrow",
	},

	{
		mark: "SMALL_20A",

		state_name: "THE DOCUMENT",

		component: "TRUSTCLAUSE",

		when: "Eight clauses in a row: the document the rail indexes, printed so every row above has somewhere to land.",

		kind: "clause",

		variant: "document",
	},

	/* ── REQUEST ─────────────────────────────────────────────────────────── */
	{
		mark: "SMALL_21",

		state_name: "THE REQUEST ROUTE",

		component: "CONTACTWORKSPACE",

		when: "A request route at rest: the record column - facts, process, margin note, folded aside - beside the form, divided by the site's 1px divider.",

		kind: "contactworkspace",

		variant: "rest",

		width: "wide",
	},

	{
		mark: "SMALL_22",

		state_name: "FAILED SUBMIT",

		component: "CONTACTWORKSPACE",

		when: "A send that did not land: `STATUS: INTERRUPTED` and the route's declarations at the top of the record column, beside the form that reports it.",

		kind: "contactworkspace",

		variant: "interrupted",

		width: "wide",
	},

	{
		mark: "SMALL_23",

		state_name: "NO STATUTORY BASIS",

		component: "CONTACTWORKSPACE",

		when: "A channel with no article behind it: `BASIS: UNAVAILABLE` in the record, and no `〈 〉` bracket anywhere on the page.",

		kind: "contactworkspace",

		variant: "partial",

		width: "wide",
	},

	{
		mark: "SMALL_24",

		state_name: "THE RECORD HEAD",

		component: "CONTACTHEAD",

		when: "A request's opening: the trail, `# REACH  〈GDPR Art. 15 + 20〉  /CONTACT  SLA: 30d`, and the heading when the route has one.",

		kind: "contacthead",

		variant: "rest",
	},

	{
		mark: "SMALL_25",

		state_name: "THE HUB'S HEAD",

		component: "CONTACTHEAD",

		when: "The index's opening: a record with no basis and no window, a heading and a standfirst, and `REGISTER: 14 ENTRIES` as the page's count.",

		kind: "contacthead",

		variant: "hub",
	},

	{
		mark: "SMALL_26",

		state_name: "NO BODY",

		component: "CONTACTHEAD",

		when: "A route whose form never mounted: `◎`, the sentence and `STATUS: UNAVAILABLE` under the record head - the page says what it is.",

		kind: "contacthead",

		variant: "empty",
	},

	{
		mark: "SMALL_27",

		state_name: "THE BRIDGE",

		component: "CONTACTBREADCRUMB",

		when: "The absorbed trail the Blog still imports: labels written into `/LABEL`, the last crumb as the page, every other field carried through.",

		kind: "breadcrumb",
	},

	{
		mark: "SMALL_28",

		state_name: "THE DOCUMENT",

		component: "CONTACTPAGE / CONTACTSHELL",

		when: "The two document wrappers every Contact route shares - the page chrome and the route shell. Neither can be printed here: both end in the document's `<Base>`, and a page inside a page is not a specimen. Their compositions are printed above, as `CONTACTHEAD` and `CONTACTWORKSPACE`.",

		kind: "absent",
	},

	/* ── REFERENCE ───────────────────────────────────────────────────────── */
	{
		mark: "SMALL_29",

		state_name: "THE BOARD",

		component: "STATUSBOARD",

		when: "The site's own state as four shelves: one tall, one short, one empty and one waiting - the shape of what is live, in the layout.",

		kind: "board",
	},

	{
		mark: "SMALL_30",

		state_name: "ONE COLUMN",

		component: "STATUSBOARD",

		when: "A board of one column: one shelf at the band's measure, with its register head, its count and its note.",

		kind: "board",

		variant: "one",
	},

	{
		mark: "SMALL_31",

		state_name: "EMPTY COLUMN",

		component: "STATUSBOARD",

		when: "A column that holds nothing: the head, the count `0` and the composed sentence - the column the board most needs to be trusted about.",

		kind: "board",

		variant: "columnempty",
	},

	{
		mark: "SMALL_32",

		state_name: "EMPTY BOARD",

		component: "STATUSBOARD",

		when: "A board with no column at all: the caller's sentence, and nothing else - the block documents that arm and now renders it.",

		kind: "board",

		variant: "empty",

		width: "narrow",
	},

	{
		mark: "SMALL_33",

		state_name: "THE RUN",

		component: "LEXICON",

		when: "A glossary run: the marker, the heading, the count, the note, the letters the run uses as links, and the words filed under each.",

		kind: "lexicon",
	},

	{
		mark: "SMALL_34",

		state_name: "ONE WORD",

		component: "LEXICON",

		when: "A run of one word: one entry, no letter strip - a one-link navigation says only what the count already says.",

		kind: "lexicon",

		variant: "one",
	},

	{
		mark: "SMALL_35",

		state_name: "EMPTY RUN",

		component: "LEXICON",

		when: "A run that files no word: its own composed sentence under its own head, never a heading over a hole.",

		kind: "lexicon",

		variant: "empty",
	},

	{
		mark: "SMALL_36",

		state_name: "NINETY WORDS",

		component: "LEXICON",

		when: "A run long enough that the alphabet matters: the count says ninety, the strip is the navigation, and the groups run on.",

		kind: "lexicon",

		variant: "many",
	},

	{
		mark: "SMALL_37",

		state_name: "A WORD, DEFINED",

		component: "LEXICONENTRY",

		when: "The resting entry: the term in the margin, the sense on the measure, and the record, the route and the source under it.",

		kind: "entry",
	},

	{
		mark: "SMALL_38",

		state_name: "NO SOURCE",

		component: "LEXICONENTRY",

		when: "A word the tree does not define: `SOURCE: UNAVAILABLE` in the quiet ink, so a paraphrase is not mistaken for a citation.",

		kind: "entry",

		variant: "partial",
	},

	{
		mark: "SMALL_39",

		state_name: "THE HEAD",

		component: "QUIETHEAD",

		when: "A reference document's opening: `# LEXICON_01`, the bare `h1`, the `↳` proposition, and the extent as a white facts strip.",

		kind: "quiethead",
	},

	/* ── ADVERSE ─────────────────────────────────────────────────────────── */
	{
		mark: "SMALL_40",

		state_name: "NO FACTS",

		component: "QUIETHEAD",

		when: "A facts strip the build could not fill: the composed sentence in the strip's own box, under the same marker, title and proposition.",

		kind: "quiethead",

		variant: "empty",
	},

	{
		mark: "SMALL_41",

		state_name: "THE REGISTER",

		component: "ONWARD",

		when: "The routing register at rest: the intent the reader arrived with, the arrow, and the destination that answers it.",

		kind: "onward",
	},

	{
		mark: "SMALL_42",

		state_name: "YOU ARE HERE",

		component: "ONWARD",

		when: 'A register printed on one of its own destinations: that row is a statement with `aria-current="page"`, not a link to the page the reader is on.',

		kind: "onward",

		variant: "current",
	},

	{
		mark: "SMALL_43",

		state_name: "NOTHING TO ROUTE TO",

		component: "ONWARD",

		when: "A register with no destination: the copy's required `empty` sentence - the state a one-page site reaches.",

		kind: "onward",

		variant: "empty",

		width: "narrow",
	},

	{
		mark: "SMALL_44",

		state_name: "AT 640",

		component: "CONTACTWORKSPACE",

		when: "A request route in a narrow column: the form first, the record under it below the divider, in the order a phone needs.",

		kind: "contactworkspace",

		variant: "rest",

		width: "narrow",
	},

	{
		mark: "SMALL_45",

		state_name: "AT 640, THE DIRECTORY",

		component: "PRIVACYREQUESTS",

		when: "The directory in a narrow column: one card per row, the code and the article still at the card's right edge.",

		kind: "privacy",

		variant: "rest",

		width: "narrow",
	},

	{
		mark: "SMALL_46",

		state_name: "AT 640, THE CLAUSE",

		component: "TRUSTCLAUSE",

		when: "A clause in a narrow column: the number above the name, the tombstone indented to the clause's own rule.",

		kind: "clause",

		variant: "missing",

		width: "narrow",
	},
];

/* ─── THE GROUPS ─────────────────────────────────────────────────────────── */

/** Which group a row belongs to, from its mark's range. */
const GroupOf = (Row: Specimen): Group => {
	const At = Specimens.indexOf(Row);

	if (At < 9) return "credentials";

	if (At < 13) return "account";

	if (At < 21) return "licence";

	if (At < 29) return "request";

	if (At < 40) return "reference";

	return "adverse";
};

/** The rows in one group, in reading order. */
export const InGroup = (Group: Group): readonly Specimen[] =>
	Specimens.filter((Row) => GroupOf(Row) === Group);

/** The groups, in the plate's order, with the line that says what each one asks. */
export const Groups: readonly { key: Group; label: string; note: string }[] = [
	{
		key: "credentials",

		label: "/THE CREDENTIAL",

		note: "The frame eight routes render and the report every ending prints: the sign-in route at rest, the same frame while the exchange runs and while a link has closed, a route with no frame at all, and the four reports a reader actually meets - verified, loading, interrupted with its facts, and a provider sentence longer than the card.",
	},

	{
		key: "account",

		label: "/THE ACCOUNT",

		note: "The dashboard's data-rights directory in four states: the full directory with its three counted sets, a registry that answered with nothing, a signed-out reader, and one right filed on its own.",
	},

	{
		key: "licence",

		label: "/THE LICENCE",

		note: "The legal set's clause apparatus: a clause and a clause the text does not carry, the rail and the disclosure, an index with no clause in it, and the two row-level partials - a clause filed without a number, and a document of one.",
	},

	{
		key: "request",

		label: "/THE REQUEST",

		note: "A contact route in four compositions and three states: the workspace at rest and at 640px, a send that failed, a channel with no statutory basis, the record head on a request and on the hub, a body that never mounted, the absorbed trail, and the one part that cannot be printed here.",
	},

	{
		key: "reference",

		label: "/THE REFERENCE",

		note: "The four blocks that carry the site's own vocabulary: the status board and its three arms, a glossary run at rest, at one word, at none and at ninety, an entry with and without a source, and the head of a reference document.",
	},

	{
		key: "adverse",

		label: "/THE ADVERSE",

		note: "The states a small surface is abandoned in: a facts strip with nothing in it, a routing register with nothing to route to and one that names the page it is on, and the two narrow compositions where the split and the clause have to re-form.",
	},
];

/** How many rows the plate prints. */
export const SpecimenCount = Specimens.length;
