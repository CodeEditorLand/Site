/**
 * Apparatus - the motion, specimen, social, provider, route and blog family's
 * state matrix, its specimens, and what the exploration changed.
 *
 * ─── WHY THIS FAMILY EXISTS, AND WHY IT IS ONE FAMILY ─────────────────────
 * Every other family on this sheet is content: a ledger is believed, a display is
 * read, an overlay is dismissed, a narrative is told, a frame is sat in, furniture
 * is found, a composition is scanned, a small surface is reached when the reader
 * is locked out. This family is the APPARATUS - the parts that make the document
 * work rather than say something.
 *
 *   motion      what moves, when, and what the movement explains
 *   specimen    the instrument that shows every other family - this sheet's own
 *               three blocks, plus the gallery index this card built
 *   social      the head: the one place a route's title, canonical and card are
 *               written, and the only part of the site read outside it
 *   provider    the runtime layer: analytics, identity, and the pageview that
 *               walks the router
 *   route       the trail, the site's one breadcrumb grammar
 *   blog        the one dated set on the site, and the surface it is read on
 *
 * They are one family because they fail in one way: silently. A ledger fails by
 * printing a blank cell, a frame by holding nothing, a small surface by being
 * abandoned - and apparatus fails by being ABSENT AND UNNOTICED. A motion that
 * does not fire, a specimen that shows a state that cannot exist, a head that
 * prints a card with no image, a provider that was never configured, a trail with
 * no crumbs, an archive with no entries: none of them throws, none of them looks
 * broken, and every one of them is a lie about the state of the world.
 *
 * So the family's own columns are the states apparatus is actually met in: the
 * reader who asked for less motion, the motion with no state change to explain,
 * the card with no image, the provider row with no logo, the head read outside the
 * page, the runtime that is not reachable, and the provider with no credentials.
 *
 * Seventeen components, twenty-four conditions, four hundred and eight cells.
 * Every cell that cannot exist carries a sentence saying why, because a blank cell
 * in a matrix of dispositions is the same defect as a blank cell in a ledger: an
 * excuse where a fact belongs.
 *
 * ─── WHAT THE FAMILY'S OWN BRIEF ASKED FOR ────────────────────────────────
 * "Explore: every motion at reduced-motion, a motion with no trigger, a specimen
 * with one entry and with forty, a social card with no image, a provider row with
 * no logo. The specimen surface is where the rest of this wave's work becomes
 * visible - make it a proper gallery (a nav of families, a state matrix per
 * component, the label and the 'when it is right' line)."
 *
 * Those are columns of the `composition` group; the behaviours they produced are
 * entries in `Improvements`, each with the cell behind it.
 *
 * ─── NOTHING HERE IS A TYPED FIGURE ───────────────────────────────────────
 * Every count on the sheet is derived from the tables below, so a row or a
 * condition added to the family changes the sheet's figures without a second edit.
 */

/* ─── THE COLUMNS ────────────────────────────────────────────────────────── */

/** A column of the matrix: the condition or combination, and what its cell asks. */
export interface Column {
	/** The cell's key in a row's override map. */
	readonly key: string;

	/** The column head, in the sheet's register: `REDUCED`, `NO TRIGGER`. */
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
 * six shapes, because they are what apparatus is asked to hold; then the seven
 * compositions this family's brief named by hand - the reduced-motion reader, the
 * motion with no state change, the card with no image, the row with no logo, the
 * head read outside the page, the runtime that is not reachable and the provider
 * with no credentials; then two contexts, because they are the two a designer
 * forgets: the action the block carries and the medium it is printed on.
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

	{ key: "many", label: "MANY", ask: "twenty-six or forty", group: "shape" },

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
		key: "reduced",

		label: "REDUCED",

		ask: "the reader asked for less motion",

		group: "composition",
	},

	{
		key: "notrigger",

		label: "NO TRIGGER",

		ask: "no state change to explain",

		group: "composition",
	},

	{
		key: "noimage",

		label: "NO IMAGE",

		ask: "a card with no image",

		group: "composition",
	},

	{
		key: "nologo",

		label: "NO LOGO",

		ask: "a row with no logo",

		group: "composition",
	},

	{
		key: "unfurled",

		label: "UNFURLED",

		ask: "read outside the page",

		group: "composition",
	},

	{
		key: "offline",

		label: "OFFLINE",

		ask: "the runtime is not reachable",

		group: "composition",
	},

	{
		key: "unconfigured",

		label: "UNCONFIGURED",

		ask: "no credentials",

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
	/** `MOTIONFOLD` - the row's name in the sheet's register. */
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

/* ─── THE REASONS, WRITTEN ONCE WHERE THEY ARE ONE FACT ──────────────────── */

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

/** The reason a printed block carries no media of its own. */
const NoMedia = (what: string, carries: string): Cell =>
	NotApplicable(
		`A ${what} prints ${carries}: it holds no image slot, so there is no no-image arm to build - the image a reader sees belongs to the surface around it.`,
	);

/** The reason a block has no identity to authenticate. */
const NoLogo = (what: string): Cell =>
	NotApplicable(
		`A ${what} prints no logo: a logo is a provider's mark, and this family's rows name a file, a condition or a route rather than an organisation, so there is no mark to be missing.`,
	);

/** The reason a block has no unfurled form. */
const NoUnfurl = (what: string, why: string): Cell =>
	NotApplicable(
		`A ${what} has no unfurled form: ${why} so there is nothing for a feed to read outside the page.`,
	);

/** The reason a block reads no network. */
const NoNetwork = (what: string, why: string): Cell =>
	NotApplicable(`A ${what} reads no network: ${why}.`);

/** The reason a block has no credentials to be configured with. */
const NoCredentials = (what: string): Cell =>
	NotApplicable(
		`A ${what} takes no credentials: there is no domain, no client identifier and no key in its contract, so "unconfigured" names no arm it could have.`,
	);

/** The reason a block prints no action. */
const NoAction = (what: string, why: string): Cell =>
	NotApplicable(`A ${what} prints no action: ${why}.`);

/** The reason a block has no printed form. */
const NoPaper = (what: string, why: string): Cell =>
	NotApplicable(`A ${what} has no printed form: ${why}.`);

/** The reason a block has no measure of its own. */
const NoMeasure = (what: string, why: string): Cell =>
	NotApplicable(`A ${what} has no measure of its own: ${why}.`);

/**
 * The seventeen components, in the order a reader meets them: the six motion
 * blocks, the four specimen blocks (three that were here and the gallery index
 * this card built), the head, the three runtime providers, the trail, and the two
 * blog surfaces.
 *
 * Every row's overrides are reasons. A row with no overrides would be a part that
 * survives every combination, and no part does.
 */
export const Rows: readonly Row[] = [
	{
		name: "MOTIONFOLD",

		file: "COMPONENT/MOTION/MOTIONFOLD.ASTRO",

		note: "A disclosure with content behind it: the summary is a register line (`# OPEN QUESTIONS / 03`), the body is a run of leaves - `[index] [label] [meta]` - and the state is the browser's `open` attribute.",

		cells: {
			error: NotApplicable(
				"A fold cannot fail on its own: its leaves are handed to it, so a read that failed is the page's state and the fold is not mounted. A leaf whose target is gone is the tombstone arm (`gone`), which is the closest thing to a failure this block has and is not the same fact.",
			),

			stale: NoAsOf("fold", "its leaves' own `meta` cells"),

			disabled: NotAControl("fold"),

			readonly: ReadOnly("fold"),

			dense: NoDense(
				"fold",

				"a leaf is already one row at the meta step, and the tightest honest step is the one it prints",
			),

			incard: Built(
				"a disclosure inside a card is a disclosure inside a surface - the card is the artifact's box, not a second fold",
			),

			reduced: Built(
				"`System/Motion/_Fold.scss` declares the end state unconditionally and gates only its interval, so a reader who asked for less motion gets the leaves in one frame rather than a shorter slide",
			),

			notrigger: NotApplicable(
				"A fold is a trigger by definition: `details` owns `[open]`, the state change is the reader's click, and a fold with no trigger is a fold that cannot be opened - which is the one motion this layer forbids rather than one it forgot.",
			),

			noimage: NoMedia(
				"fold",
				"leaves - an index, a label, a note and a meta cell",
			),

			nologo: NoLogo("fold"),

			unfurled: NoUnfurl(
				"fold",
				"it is an in-page disclosure over content the page already holds,",
			),

			offline: NoNetwork(
				"fold",

				"its leaves are composed with the page, and a fold whose content never arrived is the `loading` arm rather than an offline one",
			),

			unconfigured: NoCredentials("fold"),

			print: NotApplicable(
				"A closed disclosure prints its summary and not its body: on paper the fold is its register line. Forcing the body open in the print stylesheet would print a document the reader cannot close, so the limitation is recorded in `Observations` rather than papered over.",
			),
		},
	},

	{
		name: "MOTIONEXPAND",

		file: "COMPONENT/MOTION/MOTIONEXPAND.ASTRO",

		note: "A set of records that open in place: the row prints `[index] [name] [one fact]`, and opening it reveals the record's register - `KEY: value` rows and the source - directly underneath, without moving the eight rows around it.",

		cells: {
			loading: NotApplicable(
				"A record set prints the records it was given: the rows' names are the set, so there is no schema to print before the values arrive. The loading arm belongs to `MotionFold`, whose leaves are a run of unknown length.",
			),

			stale: Built(
				"`AS OF:` is a fact row like any other: an old measurement is the value's own date, and the block does not invent a second figure",
			),

			disabled: NotAControl("record set"),

			readonly: ReadOnly("record set"),

			dense: NoDense(
				"record set",

				"one row per record at the meta step, and a record's register is its own density",
			),

			incard: Built("a record set inside a card is the card's content"),

			reduced: Built(
				"`System/Motion/_Expand.scss` gates the interval and not the end state: the register arrives in one frame for a reader who asked for less motion",
			),

			notrigger: Built(
				"a record with `missing` is not a disclosure at all - it prints `◎`, its name and `WAS:`, because a `<details>` that opens onto nothing is a lie about the state of the world. That is the no-trigger arm, and it is the tombstone.",
			),

			noimage: NoMedia(
				"record set",
				"records - an index, a name, one fact and a register",
			),

			nologo: NoLogo("record set"),

			unfurled: NoUnfurl(
				"record set",

				"it is a set of disclosures over records the page already holds,",
			),

			offline: NoNetwork(
				"record set",

				"its records are composed with the page, and a record whose read failed is the tombstone rather than an offline state",
			),

			unconfigured: NoCredentials("record set"),

			print: NotApplicable(
				"Every record is a closed `<details>` on paper: the sheet prints eight rows and none of their registers. The disclosure is a screen affordance and the print stylesheet cannot open it, so the limitation is recorded rather than hidden.",
			),
		},
	},

	{
		name: "MOTIONSEQUENCE",

		file: "COMPONENT/MOTION/MOTIONSEQUENCE.ASTRO",

		note: "A state change drawn: an ordered run of state nodes with one edge between each pair, and each edge prints the motion's name above a hairline and its interval below it.",

		cells: {
			empty: Built(
				"fewer than two nodes, or an edge count that does not match the nodes, prints `◎ NO TRANSITION` and the composed sentence - the drawing refuses rather than drawing a broken run",
			),

			loading: NotApplicable(
				"A sequence is printed from its data: the nodes are the states, so a run whose states have not arrived is the empty arm rather than a skeleton of a diagram.",
			),

			partial: Built(
				"an edge with no interval prints `UNAVAILABLE` at muted ink - never `0 MS`, which would be a measurement",
			),

			error: NotApplicable(
				"A sequence has no failure arm: a run that cannot be drawn is the empty arm with its sentence, and an edge that is wrong is a defect in the data rather than a state the block can print.",
			),

			stale: NoAsOf("sequence", "the intervals it prints"),

			disabled: NotAControl("sequence"),

			readonly: ReadOnly("sequence"),

			dense: NoDense(
				"sequence",

				"the run is one row of nodes and edges, and compressing it would be the sentence it exists to replace",
			),

			one: Built(
				"a one-node run is not drawable and says so: the empty arm is the one-state sequence's honest form",
			),

			many: Built(
				"nine states and eight edges wrap at the band's measure",
			),

			reduced: Built(
				"the `reduced` prop prints what the sequence does for a reader who asked for less motion - the state change without the interval - under the run, in the same register",
			),

			notrigger: NotApplicable(
				"A sequence documents transitions; it performs none. There is no rule here to fire, so there is no trigger for it to be missing.",
			),

			noimage: NoMedia(
				"sequence",
				"nodes and edges - words on a hairline",
			),

			nologo: NoLogo("sequence"),

			unfurled: NoUnfurl(
				"sequence",

				"it is a drawing of one page's own transitions,",
			),

			offline: NoNetwork(
				"sequence",

				"it is composed with the page and describes transitions the stylesheet already carries",
			),

			unconfigured: NoCredentials("sequence"),

			withaction: NoAction(
				"sequence",

				"it is a drawing of a state machine, not a control over one - an action inside it would be a stepper, which is the thing this block was built instead of",
			),

			print: Built(
				"the nodes, the edges, the intervals and the source print",
			),
		},
	},

	{
		name: "MOTIONSKELETON",

		file: "COMPONENT/MOTION/MOTIONSKELETON.ASTRO",

		note: "The loading arm, printed in the record grammar: a register line, the keys the arriving record will print with their values barred, and `WAITING ON:` naming what has not arrived. No spinner.",

		cells: {
			empty: Built(
				"the `empty` arm this card added: no key prints the composed sentence instead of an empty register, which was a `LOADING` head over a `<dl>` with nothing in it",
			),

			partial: Built(
				"`age` is optional and prints `/ 318 DAYS` when the wait is measurable; the keys are the schema and print whether or not the age is known",
			),

			error: Built(
				"the block is what a failed read leaves on the page: the keys and `WAITING ON:` stay legible after the connection dies, which is the whole argument for a skeleton over a spinner",
			),

			stale: Built(
				"`age` is the as-of: a wait that has been running for a year says so, and the last known keys stay visible",
			),

			disabled: NotAControl("skeleton"),

			readonly: ReadOnly("skeleton"),

			dense: NoDense(
				"skeleton",

				"one row per key at the meta step, and the keys are the record's own field names",
			),

			incard: Built(
				"a skeleton inside a card is the card's own waiting state",
			),

			reduced: Built(
				"the skeleton does not animate at all - a pulse is a loop and a fade-in is an entrance - so reduced motion loses nothing because there was nothing to lose",
			),

			notrigger: NotApplicable(
				"A skeleton is the family's answer to the question rather than an instance of it: it never moves on its own, and its class (`resolve`) exists for the record that replaces it. There is no trigger-less motion here to build.",
			),

			noimage: NoMedia(
				"skeleton",
				"field names and bars, both drawn in the record grammar",
			),

			nologo: NoLogo("skeleton"),

			unfurled: NoUnfurl(
				"skeleton",
				"it is a waiting state for one page's record,",
			),

			offline: Built(
				"this is the block an offline page keeps: the keys are still printed, the bar is still barred, and `WAITING ON:` still names what did not arrive",
			),

			unconfigured: NoCredentials("skeleton"),

			withaction: NoAction(
				"skeleton",

				"a retry inside a waiting state is a button that promises a request the block does not own - the page owns the retry",
			),

			print: NotApplicable(
				"A skeleton is a waiting state and a printed sheet has already waited. The block prints if a page mounts it, and no page prints it.",
			),
		},
	},

	{
		name: "MOTIONSPECIMEN",

		file: "COMPONENT/MOTION/MOTIONSPECIMEN.ASTRO",

		note: "One motion, stated on one side of a hairline and shown on the other: a register column (`# NAME / 08`, the proposition, the interval as a bar, the curve, what moves, what it keeps) and a stage holding the live artifact.",

		cells: {
			empty: Built(
				"omitting `motion` is the plate arm - the stage and its note without the register - for a band whose motion has already been stated above it",
			),

			loading: BuildTime(
				"specimen",

				"its register is the interaction class's own record from `Content/Motion/Register.ts`",
			),

			partial: Built(
				"an interval nobody measured prints `UNAVAILABLE` at muted ink, and the bar drops to its floor rather than claiming a length",
			),

			error: NotApplicable(
				"A specimen has no failure arm: a class the register does not carry is a build that does not run, and the plate prints what the register states.",
			),

			stale: NoAsOf("specimen", "the interval it prints"),

			disabled: NotAControl("specimen"),

			readonly: ReadOnly("specimen"),

			dense: Built(
				"`pair` and `trio` put two or three arms of one artifact inside a single stage, divided by hairlines - the dense arm is a narrower stage, not a smaller type",
			),

			one: Built("one specimen is one register column and one stage"),

			many: Built(
				"nine specimens alternate `base` and `flip` so the sheet does not read as a table",
			),

			incard: Built(
				'the stage is a white insert by construction, so a specimen inside a card is the one composition that would be a box in a box - and the plate uses `stage="field"` for exactly that reason',
			),

			reduced: Built(
				"the specimen's bar does not animate: it is the measured interval printed, and the class it describes carries its own reduced-motion end state",
			),

			notrigger: NotApplicable(
				"A specimen prints a motion's facts; it performs none. Nothing here fires, so nothing here can fire without a trigger.",
			),

			noimage: Built(
				"the stage holds whatever the page slots in, including a block with no image",
			),

			nologo: Built(
				"the stage holds a row with no mark as readily as one with a mark - the register column is where identity is stated, and it names a class rather than an organisation",
			),

			unfurled: NoUnfurl(
				"specimen",
				"it is a sheet's own instrument, not a page's,",
			),

			offline: NoNetwork("specimen", "the register is build-time data"),

			unconfigured: NoCredentials("specimen"),

			withaction: Built(
				"the stage can hold an action - `/Motion` mounts `MotionSpecimen__Act` as the handover's live link",
			),

			print: Built(
				"the register, the bar, the interval and the stage's contents print",
			),
		},
	},

	{
		name: "MOTIONORIGIN",

		file: "COMPONENT/MOTION/MOTIONORIGIN.TSX",

		note: "The origin specimen: a real trigger, a real slip, and the arrival from the side the control printed - the one motion class whose subject is the relation between a trigger and the surface it opens.",

		cells: {
			empty: NotApplicable(
				"The slip's four rows are the class's own four sides - bottom, top, left, right. A slip with no row is a control that opens nothing, which is the one thing this specimen exists to disprove.",
			),

			loading: NotApplicable(
				"The slip is local: Radix owns open, closed and focus return, and there is no data behind the four rows to arrive.",
			),

			partial: NotApplicable(
				"Four sides are the geometry, not a set that can be short: a slip with three of them would be a claim about a class that does not exist.",
			),

			error: NotApplicable(
				"A slip has no failure arm: the popover is the browser's, and a trigger that cannot open is a script that did not load - which the register column's note states.",
			),

			stale: NoAsOf("slip", "the class it describes"),

			disabled: NotApplicable(
				"A disabled trigger is a control with no destination, and this specimen's whole claim is that the slip leaves the control. The arm would demonstrate the opposite of the class.",
			),

			readonly: ReadOnly("slip"),

			dense: NoDense("slip", "four rows at the slip's own inset"),

			one: NotASet("slip", "the four sides of one popover"),

			many: NotASet("slip", "the four sides of one popover"),

			incard: Built(
				"a popover opened from inside a card is the card's own control",
			),

			reduced: Built(
				"`System/Motion/_Origin.scss` gates the offset and the interval, not the arrival: at reduced motion the slip is simply there, in the same place",
			),

			notrigger: NotApplicable(
				'The origin class is a trigger by definition - the slip exists because the control was pressed, and `data-state="open"` on the content is the state change it explains. A motion with no trigger is the one thing this class cannot be.',
			),

			noimage: NoMedia(
				"slip",
				"four rows - a side, a label and where it comes from",
			),

			nologo: NoLogo("slip"),

			unfurled: NoUnfurl(
				"slip",
				"it is a surface opened by a control on the page,",
			),

			offline: NoNetwork(
				"slip",
				"the four rows are constants in the component",
			),

			unconfigured: NoCredentials("slip"),

			withaction: Built(
				"the trigger is the action, and it is a real `<button>` with a real popover",
			),

			print: NotApplicable(
				"A popover cannot print: the slip is a surface that exists only while it is open, and the trigger prints as a button. The register column's note is what survives on paper.",
			),
		},
	},

	{
		name: "SPECIMENSHEET",

		file: "COMPONENT/SPECIMEN/SPECIMENSHEET.ASTRO",

		note: "The contact sheet: every part as one cell - a mark, a name, a note, a kind and a disposition - four across, with a printed part linking to its plate and an absent one printing its reason in place of a link.",

		cells: {
			loading: BuildTime(
				"sheet",

				"its cells are `Content/Specimen/Parts.ts`, composed in the same pass as the page",
			),

			partial: Built(
				"a part with no plate prints its cell as a statement and no link; an absent part prints `◎ ABSENT` and keeps its cell",
			),

			error: NotApplicable(
				"A sheet has no failure arm: a part that cannot be printed is a disposition, and the sheet states it in the cell rather than failing the grid.",
			),

			stale: NoAsOf("sheet", "each part's own plate and source"),

			disabled: NotAControl("sheet"),

			readonly: ReadOnly("sheet"),

			dense: Built(
				"it is a contact sheet: the density is the cell's, and nothing in it is below the meta tier",
			),

			one: Built("a sheet of one part is one cell at the grid's floor"),

			many: Built(
				"forty cells print at four across and the grid holds - the sheet is the one block on the site whose shape is a count",
			),

			incard: NotACard("sheet", "index, not a record's surface"),

			reduced: Built(
				"a sheet does not move: it is a printed grid and there is no transition in it",
			),

			notrigger: NotApplicable(
				"A sheet is printed: it has no motion at all, so there is no rule that could fire without a state change.",
			),

			noimage: NoMedia(
				"sheet",
				"cells - a mark, a name, a note, a kind and a disposition",
			),

			nologo: NoLogo("sheet"),

			unfurled: NoUnfurl("sheet", "it is this document's own index,"),

			offline: NoNetwork(
				"sheet",
				"its rows are the parts table, read at build time",
			),

			unconfigured: NoCredentials("sheet"),

			withaction: Built(
				"a printed part's cell is one link to its plate, and this card made the link follow the disposition rather than the plate reference",
			),

			print: Built(
				"the cells, the marks and the dispositions print as a ruled grid",
			),
		},
	},

	{
		name: "SPECIMENPLATE",

		file: "COMPONENT/SPECIMEN/SPECIMENPLATE.ASTRO",

		note: "One part, printed at its own size beside its contract: the thing itself on a stage, the four facts that make it checkable in the column beside it, and the caption that says what to look at.",

		cells: {
			empty: NotApplicable(
				"`part` is required and a plate is anchored to it: a plate with no part is a picture frame, and the sheet's absent parts are stated in `/THE ABSENCES` rather than printed as an empty stage.",
			),

			loading: BuildTime(
				"plate",

				"the part, its contract and its source are the parts table's own record",
			),

			partial: Built(
				"`stageNote` and `stage` are optional, and a contract row whose value is unknown prints `UNAVAILABLE` like any other ledger value",
			),

			error: NotApplicable(
				"A plate has no failure arm: a part that cannot be printed is a part the sheet does not plate, and `/THE ABSENCES` is where that composition lives.",
			),

			stale: NoAsOf("plate", "the part's own source line"),

			disabled: NotAControl("plate"),

			readonly: ReadOnly("plate"),

			dense: NoDense(
				"plate",

				"a plate is the airiest object on the sheet, and the air is what makes the contract readable beside the part",
			),

			one: Built("a plate is one part by definition"),

			many: NotApplicable(
				"A plate holds one specimen: two parts on one stage is a screenshot, and the sheet prints a second plate instead.",
			),

			incard: NotApplicable(
				"A plate's stage is already the white insert; a plate inside a card would be a card inside a card, which is the one composition the identity forbids.",
			),

			reduced: Built(
				"a plate is static: the spec column's stickiness is not motion and the stage holds the part's own disclosures",
			),

			notrigger: NotApplicable(
				"A plate prints a part; it performs nothing. There is no rule here to fire.",
			),

			noimage: Built(
				"a plate whose part carries no image prints the part it was given - the stage is the surface, not a picture slot",
			),

			nologo: Built(
				"a part with no mark prints its contract and its stage: the mark column is the part's own register, not an organisation's logo",
			),

			unfurled: NoUnfurl(
				"plate",
				"it is a sheet's instrument for one part,",
			),

			offline: NoNetwork(
				"plate",
				"its contract is the parts table's record",
			),

			unconfigured: NoCredentials("plate"),

			withaction: NoAction(
				"plate",

				"the part inside it may carry one, and the plate itself is a figure - a control in the spec column would be a control in a caption",
			),

			print: Built(
				"the spec column, the stage's register and the caption print",
			),
		},
	},

	{
		name: "SPECIMENMATERIAL",

		file: "COMPONENT/SPECIMEN/SPECIMENMATERIAL.ASTRO",

		note: "The stock and the inks, printed as specimens: a fill as a swatch of the token itself, an ink as a word set in it at the L tier, a rule as the rule - six of them, and no seventh.",

		cells: {
			empty: Built(
				"the strip prints its composed sentence across the full track count, under the same register line, so an empty strip is the strip rather than a cell in it",
			),

			loading: BuildTime(
				"material strip",

				"the six specimens are `Content/Specimen/Page.ts`'s, composed in the same pass as the sheet",
			),

			partial: NotApplicable(
				"A strip's rows are the token sheet's own six. A specimen whose token the sheet does not carry is a build that lost the file - which the empty arm states - rather than a partial state a reader could be shown.",
			),

			error: NotApplicable(
				"A material strip has no failure arm: it prints the token sheet, and a sheet that could not be read is a build that does not run.",
			),

			stale: NoAsOf("material strip", "the token sheet it prints"),

			disabled: NotAControl("material strip"),

			readonly: ReadOnly("strip"),

			dense: Built(
				"it is the densest band on the page: material is scanned rather than read",
			),

			one: Built(
				"one specimen prints one cell of the three-column strip",
			),

			many: NotApplicable(
				"A seventh specimen would be a second identity. The block's own contract says six, and a strip that grew a row would be the sheet inventing a colour.",
			),

			incard: NotACard(
				"material strip",
				"band's artifact, not a record's surface",
			),

			reduced: Built(
				"material does not move: a swatch is a fill and an ink is a word",
			),

			notrigger: NotApplicable(
				"A material strip is printed; nothing in it transitions, so nothing can transition without a state change.",
			),

			noimage: NotApplicable(
				"A fill specimen is painted with the token itself rather than an image: there is no image to be missing, only a value the token sheet either carries or does not.",
			),

			nologo: NoLogo("material strip"),

			unfurled: NoUnfurl(
				"material strip",
				"it is this sheet's own stock,",
			),

			offline: NoNetwork(
				"material strip",
				"the values are the token sheet's",
			),

			unconfigured: NoCredentials("material strip"),

			withaction: NoAction(
				"material strip",

				"it is a specimen of the stock, and a swatch that did something would stop being a swatch",
			),

			print: Built(
				"material is what a sheet is printed with: the swatches, the inks and the rule all print",
			),
		},
	},

	{
		name: "SPECIMENFAMILIES",

		file: "COMPONENT/SPECIMEN/SPECIMENFAMILIES.ASTRO",

		note: "The gallery's index - the block this card built: one row per family band on the sheet, its register line, its figure, and the two sentences that say what the family argues and what it is read for.",

		cells: {
			empty: Built(
				"a gallery with no family prints the composed sentence: a contents list with no contents is a page that failed to load, not a page with nothing in it",
			),

			loading: BuildTime(
				"gallery index",

				"its rows and its figures are the family modules' own exports, counted in the same pass as the sheet",
			),

			partial: Built(
				"a family whose figure cannot be counted prints `UNAVAILABLE` rather than a zero, because zero is a measurement",
			),

			error: NotApplicable(
				"A gallery index has no failure arm: a family that is not on the sheet is not a row, and a row that cannot be counted is the partial arm.",
			),

			stale: NoAsOf("gallery index", "each family's own matrix"),

			disabled: NotAControl("gallery index"),

			readonly: ReadOnly("gallery index"),

			dense: Built(
				"one row per family at the meta step: fourteen rows and no prose between them",
			),

			one: Built(
				"a gallery of one family is one row and the register above it",
			),

			many: Built(
				"fourteen families, each with its kicker, its figure and its two lines",
			),

			long: Built(
				"a family's label wraps under its kicker; the figure stays at the row's right end",
			),

			narrow: Built(
				"the figure goes under the label below 48rem and keeps its rule",
			),

			wide: Built("the row is a three-track grid on the band's measure"),

			incard: NotACard("gallery index", "index, not a record's surface"),

			reduced: Built(
				"the index is a list of anchors: it has no motion at all",
			),

			notrigger: NotApplicable(
				"A gallery index is printed navigation; nothing in it transitions.",
			),

			noimage: NoMedia(
				"gallery index",
				"rows - a kicker, a label, a figure and two sentences",
			),

			nologo: NoLogo("gallery index"),

			unfurled: NoUnfurl(
				"gallery index",
				"it indexes one sheet's bands,",
			),

			offline: NoNetwork(
				"gallery index",
				"its figures are the family modules' exports",
			),

			unconfigured: NoCredentials("gallery index"),

			withaction: Built(
				"every row is an anchor to its family's band, and the anchor is the row",
			),

			print: Built("the index prints as the sheet's own contents page"),
		},
	},

	{
		name: "METATAGS",

		file: "COMPONENT/SOCIAL/METATAGS.TSX",

		note: "The document head - the one place a route's title, description, canonical and card are written, and the only part of the site that is read outside it.",

		cells: {
			empty: Built(
				"a page with no title prints the site name and a page with no description prints the frame's sentence, so the head always states something rather than printing an empty tag",
			),

			loading: BuildTime(
				"head",

				"its facts are the route's own props, resolved by the frame before the document is written",
			),

			partial: Built(
				"no `publishedTime` prints no `datePublished`, no `author` prints the three organisations, and - after this card - no image omits the whole `og:image` family rather than pointing at a default that may not exist",
			),

			error: NotApplicable(
				"A head has no failure arm: a route whose metadata could not be resolved is a build that does not run, and the frame's defaults are the fallback rather than an error state.",
			),

			stale: NoAsOf("head", "the article's own `publishedTime`"),

			disabled: Built(
				"`noIndex` is the head's denied arm: `noindex, nofollow` on the robots tag, and the page states that it is not for a reader",
			),

			readonly: ReadOnly("head"),

			dense: NoDense("head", "it writes tags, not rows"),

			one: NotASet("head", "one document's metadata"),

			many: NotASet("head", "one document's metadata"),

			long: Built(
				"a long title is normalised to the site's one pattern and a long description is printed verbatim - the card's own truncation belongs to the feed, which is the unfurled column",
			),

			narrow: NoMeasure(
				"head",

				"it writes tags and renders no box, so width is the feed's business rather than the block's",
			),

			wide: NoMeasure(
				"head",
				"it renders no box; the width a reader sees is the card's, not the head's",
			),

			incard: NotACard("head", "metadata, not a record's surface"),

			reduced: NotApplicable(
				"A head writes tags; it has no motion and no transition.",
			),

			notrigger: NotApplicable(
				"A head writes tags; nothing in it can fire.",
			),

			noimage: Built(
				"the arm this card added: `image={null}` omits `og:image`, its three sub-tags and `twitter:image`, because a card that points at an image the build does not have is worse than a card with no image",
			),

			nologo: NoLogo("head"),

			unfurled: Built(
				"this is the unfurled arm: the `og:` and `twitter:` families are exactly what a feed reads, and the sheet prints them as a register because the head cannot be mounted in a body",
			),

			offline: NoNetwork(
				"head",
				"it is written at build time into the document",
			),

			unconfigured: Built(
				"an empty `url` omits the canonical link and `og:url` rather than printing an empty `href` - the arm this card added, because a canonical that points nowhere is a claim the page cannot keep",
			),

			withaction: NoAction(
				"head",

				"a tag is not a control, and an action in the head is a link the reader cannot see",
			),

			print: NoPaper(
				"head",
				"the head is the document's metadata, and a printed sheet carries the page it describes",
			),
		},
	},

	{
		name: "ANALYTICSPROVIDER",

		file: "COMPONENT/PROVIDER/ANALYTICSPROVIDER.TSX",

		note: "The analytics context: one client, three calls (`track`, `trackPageView`, `identify`), and the silent catch that keeps a blocked request from breaking a page.",

		cells: {
			empty: Built(
				"a provider with no children renders the context and nothing in it",
			),

			loading: Built(
				'the client arrives in an effect, so every call before it is a no-op - and after this card the context says so: `available: false, reason: "PENDING"`',
			),

			partial: Built(
				"a client that never arrived leaves the three calls as no-ops; the context's `available` is the fact a consumer can print instead of guessing",
			),

			error: Built(
				'`GetWorkersClient()` throwing is caught and the context reports `available: false, reason: "BLOCKED"` - the arm an ad-blocker or a dead network produces',
			),

			stale: NoAsOf("analytics context", "the events it sends"),

			disabled: Built(
				"`available: false` is the disabled arm: the calls are present, they do nothing, and the context says why rather than pretending the event landed",
			),

			readonly: ReadOnly("context"),

			dense: NoDense(
				"analytics context",
				"it renders no rows and owns no rhythm",
			),

			one: NotASet("analytics context", "one client"),

			many: NotASet("analytics context", "one client"),

			long: Built(
				"an event name and its properties are passed through verbatim, so a deep route is one long path rather than a truncated one",
			),

			narrow: NoMeasure(
				"analytics context",
				"it wraps children and renders no box of its own",
			),

			wide: NoMeasure(
				"analytics context",
				"it wraps children and renders no box of its own",
			),

			incard: Built(
				"a provider can wrap a card: it is a context, not a surface",
			),

			reduced: NotApplicable(
				"An analytics context sends events; it has no motion.",
			),

			notrigger: NotApplicable(
				"An analytics context fires on calls the page makes; it owns no rule of its own.",
			),

			noimage: NoMedia(
				"analytics context",
				"no markup at all beyond its children",
			),

			nologo: NoLogo("analytics context"),

			unfurled: NoUnfurl(
				"analytics context",
				"it is a client-side context with no document output,",
			),

			offline: Built(
				"the throw arm is the offline arm: an ad-blocker or a dead network leaves the page intact and the context reporting that it is blocked",
			),

			unconfigured: Built(
				"no client means every call is a no-op - and the arm this card added is the context saying `available: false` with the reason, instead of a `return` that a consumer cannot distinguish from a delivered event",
			),

			withaction: NoAction("analytics context", "it renders no control"),

			print: NoPaper(
				"analytics context",
				"it is a runtime context with no document output",
			),
		},
	},

	{
		name: "AUTH0PROVIDER",

		file: "COMPONENT/PROVIDER/AUTH0PROVIDER.TSX",

		note: "The identity context: the Auth0 SPA provider, its redirect back to `/OAuth/Success`, and the organisation parameter the enterprise SSO routes need.",

		cells: {
			empty: NotApplicable(
				"`Children` is required: a provider with nothing inside it is a context no island reads, and the frame only mounts it around the surfaces that need a session.",
			),

			loading: NotApplicable(
				"The SDK owns its own loading state, and it is not this block's to print: the credential surfaces render `STATUS: LOADING` through `AuthReport` while the exchange runs.",
			),

			partial: Built(
				"`Organization` is optional and, when present, is set both on the provider and in the authorization params - the two places Auth0 requires it",
			),

			error: NotApplicable(
				"The SDK's errors surface through the auth routes' reports; this block is a context wrapper with no error arm of its own.",
			),

			stale: NoAsOf("identity context", "the session the SDK stores"),

			disabled: NotApplicable(
				"A disabled identity provider is a page with no sign-in, and the surface that needs one states that itself - the wrapper renders children or it renders the unconfigured arm.",
			),

			readonly: ReadOnly("context"),

			dense: NoDense("identity context", "it renders no rows"),

			one: NotASet("identity context", "one tenant"),

			many: NotASet("identity context", "one tenant"),

			long: Built(
				"a long domain or client identifier is passed through; the redirect is built from the window's origin, so a long origin is one long string rather than a truncated one",
			),

			narrow: NoMeasure(
				"identity context",
				"it wraps children and renders no box",
			),

			wide: NoMeasure(
				"identity context",
				"it wraps children and renders no box",
			),

			incard: Built("a provider can wrap a card"),

			reduced: NotApplicable("An identity context has no motion."),

			notrigger: NotApplicable(
				"An identity context has no rule to fire.",
			),

			noimage: NoMedia(
				"identity context",
				"no markup beyond its children",
			),

			nologo: NoLogo("identity context"),

			unfurled: NoUnfurl(
				"identity context",
				"it is a client-side context,",
			),

			offline: NotApplicable(
				"An offline provider is the SDK's own error, which the auth routes report. The wrapper cannot tell an offline browser from a refused exchange, and a state it cannot distinguish is a state it must not print.",
			),

			unconfigured: Built(
				"the arm this card added: with no domain or no client identifier the provider renders its children unwrapped, so the credential surface still prints and the page states that the provider is unconfigured instead of the SDK throwing on mount",
			),

			withaction: NoAction(
				"identity context",
				"the sign-in control belongs to the surface inside it",
			),

			print: NoPaper("identity context", "it is a runtime context"),
		},
	},

	{
		name: "PAGEVIEWTRACKER",

		file: "COMPONENT/PROVIDER/PAGEVIEWTRACKER.TSX",

		note: "The pageview walker: one event per route, fired on mount and on every `pushState`, `replaceState` and `popstate`, and restored on unmount.",

		cells: {
			empty: Built(
				"with no analytics context above it the tracker is inert: `UseAnalytics()` returns null and the effect returns early",
			),

			loading: Built(
				"it waits for mount before it tracks, so a server render sends nothing",
			),

			partial: NotApplicable(
				"A pageview is one event: there is no half-sent pageview a reader or a consumer could be shown, and the tracker's own state is a ref rather than a rendering.",
			),

			error: Built(
				"a failed track is caught and logged outside production: the page is not broken by its own telemetry",
			),

			stale: NoAsOf("tracker", "the timestamp each event carries"),

			disabled: Built(
				"no context, no client, no event: the tracker is disabled by the absence above it and renders `null`",
			),

			readonly: ReadOnly("tracker"),

			dense: NoDense("tracker", "it renders nothing"),

			one: NotASet("tracker", "one listener set"),

			many: NotASet("tracker", "one listener set"),

			long: Built(
				"a long path is sent verbatim, which is what makes a deep route legible in the event",
			),

			narrow: NoMeasure("tracker", "it renders nothing"),

			wide: NoMeasure("tracker", "it renders nothing"),

			incard: NotApplicable(
				"The tracker is mounted once by the frame, not inside a card: a tracker per card would fire a pageview per card.",
			),

			reduced: NotApplicable(
				"The tracker renders nothing and moves nothing.",
			),

			notrigger: NotApplicable(
				"The tracker fires on a route change, which is a state change the router makes. It has no rule of its own to fire.",
			),

			noimage: NoMedia("tracker", "nothing at all"),

			nologo: NoLogo("tracker"),

			unfurled: NoUnfurl("tracker", "it renders nothing,"),

			offline: Built(
				"an offline track fails into the same catch as any other: the event is dropped, the page continues, and no reader sees a pageview error",
			),

			unconfigured: Built(
				"no provider above it means no call to make, which is the arm this card made explicit",
			),

			withaction: NoAction("tracker", "it renders nothing"),

			print: NoPaper("tracker", "it renders nothing"),
		},
	},

	{
		name: "TRAIL",

		file: "COMPONENT/ROUTE/TRAIL.ASTRO",

		note: "The site's one breadcrumb grammar: an ordered list of locations, each printed as the caller wrote it, the last one being the page the reader is on.",

		cells: {
			empty: Built(
				'no crumb prints no landmark at all - this card\'s fix. A breadcrumb with nothing in it was a `<nav aria-label="Breadcrumb">` around an empty `<ol>`, which a screen reader announces and a reader cannot use',
			),

			loading: NotApplicable(
				"A trail is written with the page: there is no state in which the crumbs exist and their labels have not arrived.",
			),

			partial: Built(
				"a crumb with no `href` prints as the current page, and after this card the LAST crumb is the current page whether or not the caller gave it a target - a crumb that links to itself is not a route statement",
			),

			error: NotApplicable(
				"A trail cannot fail: a crumb whose target moved is a broken link the page prints, and the trail does not read the target so it cannot invent a tombstone for one.",
			),

			stale: NoAsOf("trail", "the page it is printed on"),

			disabled: NotAControl("trail"),

			readonly: ReadOnly("trail"),

			dense: NoDense("trail", "one row of crumbs at the meta step"),

			one: Built("one crumb: the page itself, as a statement"),

			many: Built(
				"five crumbs wrap between themselves and never inside the grammar",
			),

			long: Built(
				"a long label wraps inside its own crumb; the leading slash is never separated from it",
			),

			incard: NotACard(
				"trail",
				"route statement, not a record's surface",
			),

			reduced: Built("a trail is markup: it has no motion"),

			notrigger: NotApplicable(
				"A trail is printed navigation; nothing in it transitions.",
			),

			noimage: NoMedia("trail", "crumbs - a slash and a label"),

			nologo: NoLogo("trail"),

			unfurled: NoUnfurl(
				"trail",
				"it states where the reader is inside one document,",
			),

			offline: NoNetwork("trail", "its crumbs are the page's own"),

			unconfigured: NoCredentials("trail"),

			withaction: Built(
				'every crumb but the last is a link, and the last carries `aria-current="page"`',
			),

			print: Built(
				"the crumbs print; the underline is the print stylesheet's",
			),
		},
	},

	{
		name: "BLOGINDEX",

		file: "COMPONENT/BLOG/BLOGINDEX.ASTRO",

		note: "The archive page: a centred opening, a full-bleed plate of the archive's extent, and the articles as a lead and a capacity-ruled grid.",

		cells: {
			loading: BuildTime(
				"index",

				"its rows are the blog collection, sorted once in `Blog/Data.ts` in the same pass as the page",
			),

			partial: Built(
				"a row with no tags prints no tag list, and the lead is the first row of the sort rather than a flag - a collection of one prints one lead and no row",
			),

			error: NotApplicable(
				"An archive has no failure arm: a collection that could not be read is a build that does not run, and an empty collection is the composed empty arm.",
			),

			stale: Built(
				"the newest date is a row's `<time>` and the plate's own measure, so an old archive says how old it is rather than pretending to be current",
			),

			disabled: NotAControl("index"),

			readonly: ReadOnly("index"),

			dense: NoDense(
				"index",

				"its density is its capacity line - two tracks where two cards fit and one where they do not - and a tighter step is a narrower card",
			),

			one: Built(
				"a collection of one prints the lead at the full measure and no row under it",
			),

			many: Built(
				"eight cards print as a lead and a row; forty print the same way and the page grows, which is what an archive is for",
			),

			long: Built(
				"a long title wraps at the lead's L tier and a long summary at the card's measure; the foot's date and reading time never break apart",
			),

			narrow: Built(
				"one card per row below the grid's floor, at the card's own inset",
			),

			wide: Built("two tracks on the shell's capacity line, never three"),

			incard: NotACard("index", "page, not a record's surface"),

			reduced: Built(
				"the index is static: the seed scatter is placement, not motion",
			),

			notrigger: NotApplicable(
				"The index is printed; nothing in it transitions.",
			),

			noimage: Built(
				"the cards carry no image at all - the baseline's archive is text, tags, title, summary and foot - so the no-image arm is the resting arm",
			),

			nologo: NoLogo("index"),

			unfurled: NoUnfurl("index", "it is a page of the document,"),

			offline: NoNetwork(
				"index",
				"its rows are the collection, read at build time",
			),

			unconfigured: NoCredentials("index"),

			withaction: Built(
				"every card is one whole-card link, and the back-to-top label closes the page",
			),

			print: Built(
				"the opening, the plate, the cards and the foot print",
			),
		},
	},

	{
		name: "BLOGARTICLE",

		file: "COMPONENT/BLOG/BLOGARTICLE.ASTRO",

		note: "The reading surface an article is read on: the piece at 8, a 1px divider, and the margin at 4 carrying the summary, the section register, the figures, the notes and the folded aside.",

		cells: {
			empty: NotApplicable(
				"An article is its title and its summary, both required: a piece with neither is a route that does not exist, and the index is where an empty collection is stated.",
			),

			loading: BuildTime(
				"article",

				"the piece, its frontmatter and its rendered headings are the collection's own record",
			),

			partial: Built(
				"`toc: null` prints the register's composed sentence instead of an empty list, no `aside` prints no aside, and no `insets` prints no figures - each part is its own condition",
			),

			error: NotApplicable(
				"An article has no failure arm: a piece that could not be rendered is a build that does not run, and a missing target is the index's row, not the article's.",
			),

			stale: Built(
				"the date is the opening's `<time>` and the margin's `FILED:` row, printed from one source, so an old piece says how old it is twice and identically",
			),

			disabled: NotAControl("article"),

			readonly: ReadOnly("article"),

			dense: NoDense(
				"article",

				"the piece's rhythm is the prose flow's and the margin's, and a tighter article is a smaller measure",
			),

			one: Built(
				"an article with one section prints the register's composed sentence and no list",
			),

			many: Built(
				"ninety headings print a register that scrolls inside the pinned unit, bounded by the viewport it shares with the piece",
			),

			long: Built(
				"the title balances at the L tier, the summary caps at the opening's measure and a long word breaks anywhere rather than widening the piece",
			),

			narrow: Built(
				"below 1024 the margin re-composes under the piece - summary, register, figures, notes, aside, in that order, nothing hidden and nothing pinned",
			),

			wide: Built("the 8 / 1px / 4 workspace on the page's measure"),

			incard: NotACard("article", "page, not a record's surface"),

			reduced: Built(
				"the article is static; the pinned unit is position, not motion",
			),

			notrigger: NotApplicable(
				"The article is printed; nothing in it transitions.",
			),

			noimage: Built(
				"the piece carries no image: its evidence is the margin's figures",
			),

			nologo: NoLogo("article"),

			unfurled: NoUnfurl("article", "it is a page of the document,"),

			offline: NoNetwork(
				"article",
				"the piece and its margin are rendered at build time",
			),

			unconfigured: NoCredentials("article"),

			withaction: Built(
				"the register's anchors, the notes' destinations and the back link are the actions - and after this card they are the site's one trail above the title",
			),

			print: Built(
				"the piece, the margin and the foot print; nothing in the margin is pinned on paper",
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

		value: "CONTENT/SPECIMEN/APPARATUS.TS",

		note: "every figure above is counted from the three tables in this file",
	},
];

/* ─── THE IMPROVEMENTS ───────────────────────────────────────────────────── */

/** One behaviour the matrix revealed, and where it now lives. */
export interface Improvement {
	/** `TRAIL` - the component the behaviour is in. */
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
		component: "TRAIL",

		from: "EMPTY / PARTIAL",

		found: 'An empty trail rendered `<nav aria-label="Breadcrumb"><ol></ol></nav>` - a breadcrumb landmark a screen reader announces and a reader cannot use. The previous card found it and left it to this one, because the file belongs to the route family. And the current-page rule was `href`-shaped rather than positional: a page that passed a target on its last crumb printed a link to itself, which is a route statement that lies about where the reader is.',

		built: 'An empty trail now renders nothing at all: no landmark, no list. The last crumb is the current page by position, so it prints as a statement carrying `aria-current="page"` even when the caller gave it a target - and a `label` prop lets the landmark name the document it belongs to (`Breadcrumb: Documentation`), defaulting to the old word.',
	},

	{
		component: "METATAGS",

		from: "NO IMAGE / UNCONFIGURED",

		found: 'The head could not express the absence of an image. `image` defaulted to `/Favicon/og-image.png`, so a page that had no card passed `image=""` and the head printed `og:image` as the bare origin - a URL that resolves to nothing - plus three sub-tags describing it. The same shape held for `url`: an empty canonical printed `<link rel="canonical" href="">`, which tells a crawler the page canonically lives nowhere.',

		built: "`Social/Tags.ts` is now the one place the head's facts are decided, and `MetaTags.tsx` renders what it returns. `image={null}` omits `og:image`, `og:image:width`, `og:image:height`, `og:image:type` and `twitter:image` together, because they describe one image. An empty `url` omits the canonical and `og:url`. The specimen sheet prints the returned tags as a register, so the head's contract is inspectable without mounting a `<head>`.",
	},

	{
		component: "MOTIONSKELETON",

		from: "EMPTY",

		found: "A skeleton with no key printed a register head reading `# LOADING / 04`, an empty `<dl>`, and `WAITING ON:` - a count of four over a list of nothing. The block's whole argument is that a reader waiting learns the schema; with no keys there is no schema, and the page printed the frame of a fact instead of the fact.",

		built: "`empty` is now a prop, and a skeleton with no key prints the composed sentence under the same register head - the count reads `UNAVAILABLE` rather than a number nothing supports, and `WAITING ON:` still names what has not arrived.",
	},

	{
		component: "MOTIONSEQUENCE",

		from: "REDUCED",

		found: "The sequence was the one block in the family that could not state what happens to a motion at reduced motion. Every rule in `System/Motion/` declares its end state unconditionally and gates only its interval, and the block that draws transitions had no field for the promise - so the sheet could print an interval and not the condition under which it is skipped.",

		built: "`reduced` is a prop: one sentence printed under the run in the same register, saying what the state change does for a reader who asked for less motion. `/Specimen` prints it on the sequence's reduced row, and `/Motion` can pass the family's own line without a second block.",
	},

	{
		component: "MOTIONFOLD",

		from: "LOADING",

		found: '`state="loading"` with no `keys` printed `<ol aria-busy="true">` with nothing in it - a busy list announcing nothing - and a fold whose `waiting` sentence was also absent printed a summary over white space. The empty arm existed; the loading arm did not have one.',

		built: "The loading arm falls back to the block's own `empty` sentence when there is no key and no `waiting` line, inside the busy list rather than instead of it, so the state is still announced as busy and the sentence still says what would be here.",
	},

	{
		component: "MOTIONEXPAND",

		from: "PARTIAL",

		found: "A record whose register was empty printed an empty `<dl>` and its `SOURCE:` line - a provenance statement for facts that were not there. The row still opened, so the disclosure promised a register and delivered a source.",

		built: "An empty register prints `◎ NO FACT` and the source in the same grammar the block's empty arm uses, and the row stays a disclosure: the record exists, its register is what is absent, and the block says which.",
	},

	{
		component: "SPECIMENSHEET",

		from: "PARTIAL",

		found: "The cell's link was decided by `Row.plate === undefined` rather than by the disposition. A part whose disposition was `absent` but which carried a plate reference - the shape the parts table allows - printed a live link to a plate that does not exist: a dead link dressed as a live one, which is exactly what the block's own docstring forbids.",

		built: "The cell links when, and only when, the disposition is `printed`. An absent or folded part keeps its cell, its mark and its word, and prints no anchor.",
	},

	{
		component: "SPECIMENMATERIAL",

		from: "REST",

		found: "Both specimen strips composed their accessible name by appending a unit to a count string the caller had already written a unit into: the page passes `count=\"6 SPECIMENS\"`, and the section's `aria-label` read `MATERIAL: 6 SPECIMENS specimens`. A screen reader heard the unit twice on the one line that names the artifact, and the sheet's own `SHEET: 12 PARTS parts` had the same defect.",

		built: "The accessible name counts the rows the block is about to render (`MATERIAL: 6 specimens`, `SHEET: 12 parts`) while the visible register keeps the caller's own string. The name and the set now agree even when a caller's count carries a unit, a word or a measurement.",
	},

	{
		component: "ANALYTICSPROVIDER",

		from: "ERROR / OFFLINE / UNCONFIGURED",

		found: "`GetWorkersClient()` throwing left the context with a null client and a `track` that returned early. A consumer could not tell a delivered event from a dropped one - the failure was caught, logged in development, and invisible everywhere else. The provider that exists to make the runtime's state legible was the one part of the runtime with no state to read.",

		built: "The context carries `available` and `reason` (`PENDING`, `BLOCKED`, or absent when the client is live). `track` returns the same promise either way, so no call site changes, and a surface that wants to state its own telemetry status can now print the fact instead of guessing.",
	},

	{
		component: "AUTH0PROVIDER",

		from: "UNCONFIGURED",

		found: "With no domain or no client identifier the wrapper still mounted the SDK's provider with empty strings. The SDK throws on mount, which takes the whole island down - so the one surface a reader reaches when they cannot get in was the surface that failed hardest when the environment was incomplete.",

		built: "The wrapper renders its children unwrapped when either value is missing, so the credential surface still prints and the page can state that the provider is unconfigured. A configured environment renders exactly what it rendered before.",
	},

	{
		component: "PAGEVIEWTRACKER",

		from: "MANY / IN A CARD",

		found: "The tracker patched `history.pushState` and `history.replaceState` at module scope from inside an effect and restored them on cleanup. Two mounted trackers - a second island, a preview, a surface that mounts its own - captured each other's patched functions, and whichever unmounted first left the other's patch in place forever: a pageview per route change became a pageview per tracker.",

		built: "The listeners and the two history patches are now installed once, by a module-level subscriber set: the first tracker installs, the last one removes, and a second tracker joins the set. One route change is one event however many trackers are mounted.",
	},

	{
		component: "BLOGINDEX",

		from: "REST",

		found: "The archive's trail was `ContactBreadcrumb` - the bridge kept for compatibility after `Route/Trail` absorbed it. The blog was the last surface still reaching through a Contact-named adapter for the site's one breadcrumb grammar, which is how a bridge outlives the thing it bridged.",

		built: "`BlogIndex` and `BlogArticle` import `Route/Trail` directly and write their crumbs into the grammar through `Blog/Data.ts`'s `TrailOf` - the same one-leading-slash, upper-case rule the bridge used, so the rendered trail is byte-for-byte what it was. The bridge's markup and transform are untouched and it is still marked absorbed, so any caller that has not moved keeps rendering; its note now records that the blog has.",
	},

	{
		component: "SPECIMENFAMILIES",

		from: "REST / MANY",

		found: "The sheet had ten family bands and no way to see them. A reader arrived at `/THE SHEET`, read twelve parts, and then met nine family bands in a scroll with no index - so the one surface whose subject is *the design frame* was the one surface you could not survey. The brief asked for a gallery: a nav of families, a matrix per component, the label and the 'when it is right' line. The matrices and the labels were there; the nav was not.",

		built: "`SpecimenFamilies` is the gallery's index: one row per band, its register line, its figure counted from the family's own module, and the two sentences that say what the family argues and what it is read for. It stands above the bands, so a reader can see the frame before reading it - and a family added to the sheet is a row here with no second edit.",
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
		component: "MOTIONFOLD",

		found: "A closed `<details>` prints its summary and not its body, so a printed page loses every fold's content. The same is true of `MotionExpand`'s eight records. `details::details-content` can be forced visible in current browsers, but the rule is not portable and it would print a document with no way to close it.",

		owner: "The owner's reading of what a printed sheet should carry. The two candidate answers are a print rule that opens every disclosure, or a print-only register that lists the leaves - and the second is a second rendering of the same facts, which is the kind of decision this card does not take alone.",
	},

	{
		component: "METATAGS",

		found: "`og:locale:alternate` prints `bg` and `de` as literals. The site's locale directory is the source of what it publishes, and the head is the one place that list is typed by hand - so a third locale would be added to `Locale/` and not to the card.",

		owner: "A card on the i18n layer: `Social/Tags.ts` should read the published locale set rather than carry two codes. It is a small change with a wide blast radius - every page's head - so it wants the locale module's own contract first.",
	},

	{
		component: "PAGEVIEWTRACKER",

		found: "The tracker sends one pageview per `pushState`, which means an in-page anchor navigation (a doc heading, a legal clause) is not tracked, and a `replaceState` that only rewrites a query parameter is tracked as a new page. Neither is wrong for a route-level instrument, and both are visible in the events.",

		owner: "A card on analytics, with the owner's answer to what a 'page' is for this site. The tracker's contract says route change; a finer instrument would be a different contract, not a fixed bug.",
	},

	{
		component: "MOTIONORIGIN",

		found: "With JavaScript off the specimen prints a trigger button that opens nothing. The register column's note says what the slip would have shown, so the state is legible - but the control is a control that does nothing, which is the one thing the block's own docstring argues against.",

		owner: "The owner's call on whether a no-JS page should print a disabled-looking trigger or a static register of the four sides. The second is honest and it is a different composition, so it is not this card's to choose.",
	},

	{
		component: "SPECIMENPLATE",

		found: "The plate's spec column is `position: sticky` at the wide container, which is correct on the sheet and wrong the moment a plate is mounted inside a scrolling region - the specimen sheet's own matrix scroll frame is exactly such a region. No page mounts it there today.",

		owner: "A card on the specimen surface, if a plate is ever composed inside a scroll container. The fix is a container query rather than a media query, and it would change the plate's behaviour on the sheet, so it wants a composition that needs it first.",
	},
];

/* ─── THE SPECIMENS ──────────────────────────────────────────────────────── */

/** One group of rows on the plate: the family's own reading order. */
export type Group =
	"motion" | "surface" | "head" | "runtime" | "route" | "blog" | "adverse";

/** Which block a row mounts. The renderer switches on it and on nothing else. */
export type Kind =
	| "motionfold"
	| "motionexpand"
	| "motionsequence"
	| "motionskeleton"
	| "motionspecimen"
	| "motionorigin"
	| "sheet"
	| "plate"
	| "material"
	| "families"
	| "head"
	| "analytics"
	| "auth0"
	| "tracker"
	| "trail"
	| "blogindex"
	| "blogarticle"
	| "absent";

/** What every row states, whatever block it mounts. */
export interface Spec {
	/** `APPARATUS_01` - the row's own mark, printed at its head. */
	readonly mark: string;

	/** The state or combination, in the sheet's register: `REDUCED`. */
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
 * The rows, in reading order: the six motion blocks, the four specimen blocks,
 * the head, the three runtime providers, the trail, the two blog surfaces, and
 * the adverse compositions.
 *
 * Every row is a state the site either uses or could use, and the `when` line is
 * the one thing a picture of a component cannot carry: the sentence that says
 * which composition is right. A row printed here that the site never needs is
 * still a row: a component that survives its own worst combination is a
 * component whose design frame is real.
 */
export const Specimens: readonly Specimen[] = [
	/* ── MOTION ──────────────────────────────────────────────────────────── */
	{
		mark: "APPARATUS_01",

		state_name: "THE FOLD",

		component: "MOTIONFOLD",

		when: "A run of content the reader may want and the page does not owe them: the summary is a register line with its count, and the leaves are `[index] [label] [meta]`.",

		kind: "motionfold",
	},

	{
		mark: "APPARATUS_02",

		state_name: "A FOLD WITH NO LEAF",

		component: "MOTIONFOLD",

		when: "A set that holds nothing yet: `◎ NO LEAF`, the composed sentence, and the count still printed - the empty arm is required, because a fold onto nothing is indistinguishable from a fold that failed.",

		kind: "motionfold",

		variant: "empty",
	},

	{
		mark: "APPARATUS_03",

		state_name: "A FOLD LOADING",

		component: "MOTIONFOLD",

		when: "The schema has arrived and the values have not: the keys print with their values barred and `WAITING ON:` names the request, so a reader waiting learns what is coming.",

		kind: "motionfold",

		variant: "loading",
	},

	{
		mark: "APPARATUS_04",

		state_name: "A FOLD OF TWO HUNDRED",

		component: "MOTIONFOLD",

		when: "A run longer than its frame: the body caps at 60vh with its own scroll, the summary keeps printing the whole count, and the line under it says how many there are.",

		kind: "motionfold",

		variant: "long",
	},

	{
		mark: "APPARATUS_05",

		state_name: "A LEAF THAT IS GONE",

		component: "MOTIONFOLD",

		when: "A leaf whose target has been removed: the row keeps its place, takes `◎` and muted ink, drops its link, and its meta cell says what it was.",

		kind: "motionfold",

		variant: "gone",
	},

	{
		mark: "APPARATUS_06",

		state_name: "THE RECORD SET",

		component: "MOTIONEXPAND",

		when: "Eight records whose provenance a reader checks one at a time: the row prints one fact and the register opens underneath, without moving the seven around it.",

		kind: "motionexpand",
	},

	{
		mark: "APPARATUS_07",

		state_name: "A RECORD THAT IS GONE",

		component: "MOTIONEXPAND",

		when: "A record whose target has been removed is not a disclosure: `◎`, the name and `WAS:` - because a `<details>` that opens onto nothing is a lie about the state of the world.",

		kind: "motionexpand",

		variant: "gone",
	},

	{
		mark: "APPARATUS_08",

		state_name: "A REGISTER WITH NO FACT",

		component: "MOTIONEXPAND",

		when: "A record whose register is empty: `◎ NO FACT` and the source in the block's own empty grammar, so the disclosure never promises facts it does not carry.",

		kind: "motionexpand",

		variant: "nofact",
	},

	{
		mark: "APPARATUS_09",

		state_name: "A SEQUENCE",

		component: "MOTIONSEQUENCE",

		when: "A state machine whose edges are named motions with measured intervals: one sentence per edge - this state, by this motion, in this time, becomes that state.",

		kind: "motionsequence",
	},

	{
		mark: "APPARATUS_10",

		state_name: "A SEQUENCE AT REDUCED MOTION",

		component: "MOTIONSEQUENCE",

		when: "The same sequence for a reader who asked for less motion: the `reduced` prop prints what the state change does instead of the interval, under the run, in the same register.",

		kind: "motionsequence",

		variant: "reduced",
	},

	{
		mark: "APPARATUS_11",

		state_name: "A SEQUENCE THAT CANNOT BE DRAWN",

		component: "MOTIONSEQUENCE",

		when: "One state, or an edge count that does not match the nodes: the block refuses rather than drawing a broken run, and the sentence says what a sequence is.",

		kind: "motionsequence",

		variant: "one",
	},

	{
		mark: "APPARATUS_12",

		state_name: "AN UNMEASURED INTERVAL",

		component: "MOTIONSEQUENCE",

		when: "An edge nobody has timed: `UNAVAILABLE` at muted ink - never `0 MS`, which would be a measurement.",

		kind: "motionsequence",

		variant: "unmeasured",
	},

	{
		mark: "APPARATUS_13",

		state_name: "THE SKELETON",

		component: "MOTIONSKELETON",

		when: "A record that has not arrived: the keys are its own field names, the bars are barred, and `WAITING ON:` names the request. No spinner, and no pulse.",

		kind: "motionskeleton",
	},

	{
		mark: "APPARATUS_14",

		state_name: "A SKELETON WITH NO KEY",

		component: "MOTIONSKELETON",

		when: "The schema itself has not arrived: the composed sentence prints under the register head and the count reads `UNAVAILABLE` - the arm this card added.",

		kind: "motionskeleton",

		variant: "empty",
	},

	{
		mark: "APPARATUS_15",

		state_name: "THE SPECIMEN",

		component: "MOTIONSPECIMEN",

		when: "One motion stated beside the thing it moves: the register column, the interval as a bar on one shared scale, and the live artifact on the stage.",

		kind: "motionspecimen",

		width: "wide",
	},

	{
		mark: "APPARATUS_16",

		state_name: "THE SPECIMEN AS A PLATE",

		component: "MOTIONSPECIMEN",

		when: "A band whose motion has already been stated above it: omitting `motion` drops the register column and keeps the stage and its note.",

		kind: "motionspecimen",

		variant: "plate",

		width: "wide",
	},

	{
		mark: "APPARATUS_17",

		state_name: "A SPECIMEN AT 16REM",

		component: "MOTIONSPECIMEN",

		when: "The narrow column: the register goes above the stage, the bar keeps its scale and the interval stays beside it.",

		kind: "motionspecimen",

		width: "narrow",
	},

	{
		mark: "APPARATUS_18",

		state_name: "THE ORIGIN",

		component: "MOTIONORIGIN",

		when: "The relation between a trigger and the surface it opens, shown as the thing itself: open it, close it, open it from a different scroll position - the slip leaves by the same 8px every time.",

		kind: "motionorigin",
	},

	/* ── SURFACE ─────────────────────────────────────────────────────────── */
	{
		mark: "APPARATUS_19",

		state_name: "THE SHEET",

		component: "SPECIMENSHEET",

		when: "The parts of the document as one set: four equal cells across, each a mark, a name, a note, a kind and a disposition - and a printed part links to its plate.",

		kind: "sheet",
	},

	{
		mark: "APPARATUS_20",

		state_name: "A SHEET OF ONE",

		component: "SPECIMENSHEET",

		when: "A document with one part: one cell at the grid's floor, keeping its four lines and its disposition rather than becoming a row.",

		kind: "sheet",

		variant: "one",
	},

	{
		mark: "APPARATUS_21",

		state_name: "A SHEET OF FORTY",

		component: "SPECIMENSHEET",

		when: "A document of forty parts: ten rows of four, the grid holds, and nothing in a cell drops below the meta tier.",

		kind: "sheet",

		variant: "many",
	},

	{
		mark: "APPARATUS_22",

		state_name: "A SHEET WITH NO PART",

		component: "SPECIMENSHEET",

		when: "A sheet that has not been filled: the register prints its counted zero and the composed sentence says what a sheet with no parts is.",

		kind: "sheet",

		variant: "empty",
	},

	{
		mark: "APPARATUS_23",

		state_name: "A PLATE",

		component: "SPECIMENPLATE",

		when: "One part at its own size beside its contract: the spec column pinned at the wide container, the stage holding the part on the surface it will be printed on.",

		kind: "plate",
	},

	{
		mark: "APPARATUS_24",

		state_name: "A PLATE ON THE FIELD",

		component: "SPECIMENPLATE",

		when: 'A part that is itself a surface: `stage="field"` puts it on the creme field, because a white card on a white stage is a card inside a card.',

		kind: "plate",

		variant: "field",
	},

	{
		mark: "APPARATUS_25",

		state_name: "THE MATERIAL",

		component: "SPECIMENMATERIAL",

		when: "The six things the document is printed with, shown rather than described: a fill as a swatch of the token itself, an ink as a word set in it, a rule as the rule.",

		kind: "material",
	},

	{
		mark: "APPARATUS_26",

		state_name: "A MATERIAL STRIP WITH NOTHING IN IT",

		component: "SPECIMENMATERIAL",

		when: "A build that lost the token sheet: the sentence prints across the full track count under the same register line, so the absence is the strip rather than a cell in it.",

		kind: "material",

		variant: "empty",
	},

	{
		mark: "APPARATUS_27",

		state_name: "THE GALLERY'S INDEX",

		component: "SPECIMENFAMILIES",

		when: "The sheet's own contents page: one row per family band, its figure counted from the family's module, and the two sentences that say what it argues - the block this card built.",

		kind: "families",
	},

	{
		mark: "APPARATUS_28",

		state_name: "A GALLERY OF ONE",

		component: "SPECIMENFAMILIES",

		when: "A sheet with one family: one row, its register above it, and no prose between - the index does not become a paragraph because the set is small.",

		kind: "families",

		variant: "one",

		width: "narrow",
	},

	/* ── HEAD ────────────────────────────────────────────────────────────── */
	{
		mark: "APPARATUS_29",

		state_name: "THE HEAD",

		component: "METATAGS",

		when: "Every route's metadata, printed as the register the head writes: one canonical, one title in the site's one pattern, one description, and one `og:` pair per fact.",

		kind: "head",

		width: "wide",
	},

	{
		mark: "APPARATUS_30",

		state_name: "A CARD WITH NO IMAGE",

		component: "METATAGS",

		when: "A route that has no card image: `image={null}` omits the whole `og:image` family and `twitter:image`, because a card pointing at an image the build does not have is worse than a card with no image.",

		kind: "head",

		variant: "noimage",

		width: "wide",
	},

	{
		mark: "APPARATUS_31",

		state_name: "AN ARTICLE'S HEAD",

		component: "METATAGS",

		when: "A dated piece: `og:type` is `article`, `datePublished` joins the WebSite node, and the author is the piece's own rather than the three organisations.",

		kind: "head",

		variant: "article",

		width: "wide",
	},

	{
		mark: "APPARATUS_32",

		state_name: "A HEAD THAT IS NOT FOR A READER",

		component: "METATAGS",

		when: "A lab route or a page under construction: `noindex, nofollow` on the robots tag, and the page states that it is not for a reader rather than hiding it.",

		kind: "head",

		variant: "noindex",

		width: "wide",
	},

	/* ── RUNTIME ─────────────────────────────────────────────────────────── */
	{
		mark: "APPARATUS_33",

		state_name: "THE ANALYTICS CONTEXT",

		component: "ANALYTICSPROVIDER",

		when: "A live client: three calls, one client, and a context that reports `available: true` so a surface can state its own telemetry status.",

		kind: "analytics",
	},

	{
		mark: "APPARATUS_34",

		state_name: "A BLOCKED CLIENT",

		component: "ANALYTICSPROVIDER",

		when: "An ad-blocker or a dead network: the page is intact, every call is a no-op, and the context says `BLOCKED` instead of letting a consumer mistake silence for delivery.",

		kind: "analytics",

		variant: "blocked",
	},

	{
		mark: "APPARATUS_35",

		state_name: "THE IDENTITY CONTEXT",

		component: "AUTH0PROVIDER",

		when: "A configured tenant: the SPA provider, the redirect back to `/OAuth/Success`, and the organisation parameter the enterprise SSO routes need.",

		kind: "auth0",
	},

	{
		mark: "APPARATUS_36",

		state_name: "A PROVIDER WITH NO CREDENTIALS",

		component: "AUTH0PROVIDER",

		when: "An environment with no domain or client identifier: the children render unwrapped, the credential surface still prints, and the page states that the provider is unconfigured - the arm this card added.",

		kind: "auth0",

		variant: "unconfigured",
	},

	{
		mark: "APPARATUS_37",

		state_name: "THE PAGEVIEW WALKER",

		component: "PAGEVIEWTRACKER",

		when: "One event per route change, installed once by the first tracker and removed by the last - so a second island joins the set instead of patching the router twice.",

		kind: "tracker",
	},

	{
		mark: "APPARATUS_38",

		state_name: "A TRACKER WITH NO CONTEXT",

		component: "PAGEVIEWTRACKER",

		when: "A page with no analytics above it: the tracker is inert, sends nothing, and renders nothing - the absence is a state, not a crash.",

		kind: "tracker",

		variant: "inert",
	},

	/* ── ROUTE ───────────────────────────────────────────────────────────── */
	{
		mark: "APPARATUS_39",

		state_name: "THE TRAIL",

		component: "TRAIL",

		when: "Where the reader is: an ordered list of locations, each printed as the caller wrote it, the last one being the page they are on.",

		kind: "trail",
	},

	{
		mark: "APPARATUS_40",

		state_name: "A TRAIL OF ONE",

		component: "TRAIL",

		when: 'A page with no parent: one crumb, printed as a statement with `aria-current="page"` - not a link to itself.',

		kind: "trail",

		variant: "one",

		width: "narrow",
	},

	{
		mark: "APPARATUS_41",

		state_name: "A TRAIL WITH NO CRUMB",

		component: "TRAIL",

		when: "No crumbs at all: no landmark, no list, nothing announced - a breadcrumb landmark with nothing in it is a landmark a screen reader reads and a reader cannot use.",

		kind: "trail",

		variant: "empty",

		width: "narrow",
	},

	{
		mark: "APPARATUS_42",

		state_name: "A LONG CRUMB",

		component: "TRAIL",

		when: "A label past its column: the crumb wraps inside itself, the leading slash never separates from its label, and the row wraps between crumbs.",

		kind: "trail",

		variant: "long",

		width: "narrow",
	},

	/* ── BLOG ────────────────────────────────────────────────────────────── */
	{
		mark: "APPARATUS_43",

		state_name: "THE ARCHIVE",

		component: "BLOGINDEX",

		when: "The blog's index: a centred opening, a full-bleed plate of the archive's extent, then a lead at the full measure and a capacity-ruled row.",

		kind: "blogindex",

		width: "wide",
	},

	{
		mark: "APPARATUS_44",

		state_name: "AN ARCHIVE OF ONE",

		component: "BLOGINDEX",

		when: "One entry: the lead takes the full measure, no row prints under it, and the plate's four measures still count the collection.",

		kind: "blogindex",

		variant: "one",

		width: "wide",
	},

	{
		mark: "APPARATUS_45",

		state_name: "AN ARCHIVE WITH NO ENTRY",

		component: "BLOGINDEX",

		when: "A collection that answered with nothing: the plate prints `STATUS: UNAVAILABLE` instead of four zeroes, and the archive states what it would hold.",

		kind: "blogindex",

		variant: "empty",

		width: "wide",
	},

	{
		mark: "APPARATUS_46",

		state_name: "THE ARTICLE",

		component: "BLOGARTICLE",

		when: "The piece at 8, a 1px divider, and the margin at 4: the summary, the section register, the figures, the notes and the folded aside.",

		kind: "blogarticle",

		width: "wide",
	},

	{
		mark: "APPARATUS_47",

		state_name: "AN ARTICLE WITH NO REGISTER",

		component: "BLOGARTICLE",

		when: "A piece below the heading floor: `toc: null` prints the composed sentence in the margin instead of an empty list, and the summary still stands.",

		kind: "blogarticle",

		variant: "noregister",

		width: "wide",
	},

	{
		mark: "APPARATUS_48",

		state_name: "AN ARTICLE AT 640",

		component: "BLOGARTICLE",

		when: "The narrow composition: the piece takes the full measure and the margin re-composes under it in reading order - nothing hidden, nothing pinned.",

		kind: "blogarticle",

		variant: "narrow",

		width: "narrow",
	},

	/* ── ADVERSE ─────────────────────────────────────────────────────────── */
	{
		mark: "APPARATUS_49",

		state_name: "A DISCLOSURE ON PAPER",

		component: "MOTIONFOLD",

		when: "The one state in this family that cannot be printed: a closed fold prints its register line and not its leaves, so the sheet states the limitation rather than forcing the body open on paper - a document the reader cannot close is not a better document.",

		kind: "absent",

		variant: "print",
	},

	{
		mark: "APPARATUS_50",

		state_name: "A MOTION WITH NO TRIGGER",

		component: "MOTIONSEQUENCE",

		when: "The brief's own question, answered as a statement: the family has no such motion, because the register law is 'name the state change, or do not write the rule' - and the three classes that are a trigger by definition are printed here as reasons.",

		kind: "absent",

		variant: "notrigger",
	},
];

/** The row's group: the family's reading order, derived from the rows above. */
const GroupOf = (Row: Specimen): Group => {
	const Mark = Number(Row.mark.replace("APPARATUS_", ""));

	if (Mark <= 18) return "motion";

	if (Mark <= 28) return "surface";

	if (Mark <= 32) return "head";

	if (Mark <= 38) return "runtime";

	if (Mark <= 42) return "route";

	if (Mark <= 48) return "blog";

	return "adverse";
};

/** The rows of one group, in the order they are printed. */
export const InGroup = (Group: Group): readonly Specimen[] =>
	Specimens.filter((Row) => GroupOf(Row) === Group);

/** The groups, with the sentence that opens each one. */
export const Groups: readonly { key: Group; label: string; note: string }[] = [
	{
		key: "motion",

		label: "/THE MOTION",

		note: "The six blocks that answer what moves and why: a fold with leaves and a fold with none, a fold loading and a fold of two hundred, a record set and a record that is gone, a sequence and the same sequence at reduced motion, a skeleton and a skeleton with no key, a specimen as a register and as a plate, and the one class whose subject is the trigger itself.",
	},

	{
		key: "surface",

		label: "/THE SURFACE",

		note: "The instrument that shows every other family: the sheet at one part, at forty and at none, a plate on the insert and on the field, the material strip and its empty arm, and the gallery's index - the block this card built.",
	},

	{
		key: "head",

		label: "/THE HEAD",

		note: "The one part of the site read outside it. The head cannot be mounted in a body, so the rows print the register it writes: every route's card, a card with no image, an article's dated card, and the head of a page that is not for a reader.",
	},

	{
		key: "runtime",

		label: "/THE RUNTIME",

		note: "The layer with no markup: analytics with a client and with a blocked one, identity configured and unconfigured, and the pageview walker with a context and without one. Every row states a fact the surface around it can now print.",
	},

	{
		key: "route",

		label: "/THE ROUTE",

		note: "The site's one breadcrumb grammar at four widths: five crumbs, one crumb, no crumb at all, and a label longer than its column.",
	},

	{
		key: "blog",

		label: "/THE BLOG",

		note: "The one dated set on the site and the surface it is read on: the archive at rest, at one entry and at none, the article at 8/1px/4, an article below the heading floor, and the same article at 640.",
	},

	{
		key: "adverse",

		label: "/THE ADVERSE",

		note: "The two states this family cannot render and must state: a disclosure's leaves on paper - the fold prints its summary and not its body - and the motion the register forbids, a rule that fires without a state change.",
	},
];

/** How many rows the family prints. */
export const SpecimenCount = Specimens.length;
