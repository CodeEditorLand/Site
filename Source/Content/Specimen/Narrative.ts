/**
 * Narrative - the record narrative family's state matrix, its specimens, and what
 * the exploration changed.
 *
 * ─── WHY THIS FAMILY NEEDS ITS OWN MATRIX ─────────────────────────────────
 * The ledger family is BELIEVED, the display family is READ, the overlay family
 * is DISMISSED. This family is what a reader is TOLD: a band opens a subject, a
 * stage explains an order, a figure shows evidence, a well hands over a command,
 * a transcript shows a session, a failure explains a dead end. Every one of those
 * is a sentence the document makes about itself, and the sentence fails in a
 * different way in each block - a band with no body, a stage with one step, a
 * figure with no image, a well with a line longer than its frame, a transcript
 * with a failed turn, a pair with one empty pod, an archive with one entry, a
 * failure with no recovery path.
 *
 * Fifteen components, nineteen conditions, two hundred and eighty-five cells.
 * Every cell that cannot exist carries a sentence saying why, because a blank
 * cell in a matrix of dispositions is the same defect as a blank cell in a
 * ledger: an excuse where a fact belongs.
 *
 * ─── WHAT THE FAMILY'S OWN BRIEF ASKED FOR ────────────────────────────────
 * "Explore the states that reveal their frame: a stage with one step, a stage
 * with nine, a figure with no image, a figure with a caption longer than the
 * image, a well with a command that overflows, a transcript with a failed turn, a
 * pair where one pod is empty, an archive with one entry, a failure with no
 * recovery path. Each one is a chance to give the block a behaviour it lacks - a
 * stage that can advance, a well that can wrap long lines, a figure that can
 * open."
 *
 * Every one of those is a column or a specimen row below, and the three named
 * behaviours are props of the block itself - `RecordStage.current`, `RecordWell.
 * wrap`, `RecordFigure.open` - never a wrapper around it: a behaviour in a
 * wrapper is a second artifact, and §4.2 forbids a leaf holding one.
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

	/** The column head, in the sheet's register: `LONG`, `IN A CARD`. */
	readonly label: string;

	/** One line under the head: what the cell is asking. */
	readonly ask: string;

	/**
	 * The group the column belongs to. The matrix prints a heavier rule where a
	 * condition becomes a shape and where a shape becomes a context, because
	 * those are three different questions and a reader scanning the head should
	 * see where one set ends.
	 */
	readonly group: "condition" | "shape" | "context";
}

/**
 * The nineteen columns, in reading order.
 *
 * Nine conditions first, because they are the states a reader meets; then seven
 * shapes, because they are what a narrative block is asked to hold - and this
 * family's brief named five of them by hand (one step, nine steps, no image, a
 * caption longer than the image, a line that overflows); then three contexts,
 * because they are the ones a designer forgets.
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

	{ key: "many", label: "MANY", ask: "nine or twenty", group: "shape" },

	{
		key: "longtext",

		label: "LONG",

		ask: "a line past its column",

		group: "shape",
	},

	{
		key: "nomedia",

		label: "NO MEDIA",

		ask: "no image at all",

		group: "shape",
	},

	{ key: "wide", label: "WIDE", ask: "a wide band", group: "shape" },

	{ key: "narrow", label: "NARROW", ask: "a narrow column", group: "shape" },

	{ key: "dense", label: "DENSE", ask: "the tight arm", group: "shape" },

	{
		key: "incard",

		label: "IN A CARD",

		ask: "inside a Jelly surface",

		group: "context",
	},

	{
		key: "inband",

		label: "IN A BAND",

		ask: "inside a chapter",

		group: "context",
	},

	{
		key: "withaction",

		label: "WITH ACTION",

		ask: "one thing to click",

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
	/** `BAND` - the row's name in the sheet's register. */
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

/** The reason a printed block is never a control. Reused, and never alone. */
const NotAControl = (what: string): string =>
	`A ${what} is not a control: it renders props, ships no script and holds no input, so there is no control state for \`disabled\` to be the absence of.`;

/** The reason a printed block is read-only by construction. */
const ReadOnly = (what: string): string =>
	`A ${what} is read-only by construction - it is markup and CSS with nothing to edit - so \`read-only\` names no arm this block could have.`;

/** The reason a block with no motion cannot be asked for less of it. */
const NoMotion = (what: string): string =>
	`A ${what} has no motion: its state changes are ink, rule and space, and the one fold it prints turns through the mark layer, which is already gated on \`prefers-reduced-motion\`.`;

/** The reason a leaf is one thing and cannot be a set of one. */
const NotASet = (what: string, set: string): string =>
	`A ${what} is one object by definition; a set of one is ${set}, and a block that answered both would be two blocks with one name.`;

/**
 * The fifteen components, in the order a page meets them: the frame, the record,
 * the opening, the comparison, the disclosure, then the three sequences, then the
 * three pieces of evidence, then the four pieces of apparatus.
 *
 * Every row's overrides are reasons. A row with no overrides would be a part that
 * survives every combination, and no part does.
 */
export const Rows: readonly Row[] = [
	{
		name: "BAND",

		file: "COMPONENT/RECORD/RECORDBAND.ASTRO",

		note: "One subject per band: a kicker, a heading, a standfirst, an index strip and a footnote.",

		cells: {
			partial: NotApplicable(
				"A band opens a subject; it holds no facts of its own, so there is nothing for `partial` to qualify. A fact that is missing is stated by the block inside the band that measured it.",
			),

			error: NotApplicable(
				"A failed action is `RecordFailure`'s three fields. A band that grew a cause and a next step would be a condition block wearing a chapter's grammar.",
			),

			stale: NotApplicable(
				"A band prints no figure and no date, so it has no as-of to be older than. A set that is stale says its age in the block that measured it, which is the block that knows the number.",
			),

			disabled: NotApplicable(NotAControl("band")),

			readonly: NotApplicable(ReadOnly("band")),

			reducedmotion: NotApplicable(NoMotion("band")),

			one: NotApplicable(
				"A band holds a subject, not a set. `ONE` is a count of items, and a band with one item is a band whose body happens to be short.",
			),

			nomedia: NotApplicable(
				"A band prints no media. Evidence belongs to a figure or a plate, and a band that framed a picture would be a plate with a heading over it.",
			),

			inband: Built(
				"The specimen sheet composes one band inside another to print the block at 1:1, and it renders - but a page never nests bands: §4.3 allows one sectioning level, and the sheet's outer band is the sheet's own device, not a page's chapter.",
			),

			rest: Built(
				"The chapter: kicker, heading, standfirst, body, footnote.",
			),

			many: Built(
				"The body grows; the head does not. Twenty blocks under one heading is a long chapter, and the band's interval is what keeps it one subject.",
			),

			incard: Built(
				'At `tone="bare"` the band is structure inside a Jelly surface: no fill, no frame, no chapter padding - the card owns the inset.',
			),

			withaction: Built(
				"Through the `foot` slot, which is where an onward link belongs: the band's body is the subject, its foot is what to do about it.",
			),
		},
	},

	{
		name: "ENTRY",

		file: "COMPONENT/RECORD/RECORDENTRY.ASTRO",

		note: "One record in a set: index marker, glyph, name, chips, one paragraph, optional link.",

		cells: {
			error: NotApplicable(
				"An entry is a record, not a condition. Its `state` arm carries a reading state (`LOADING`, `ARCHIVED`) and deliberately not a failure: a record that failed is a `RecordFailure` beside the set.",
			),

			stale: NotApplicable(
				"An entry carries no figure and no date of its own. The age of a record belongs to the archive that filed it or the ledger that measured it, and both print their own `AS OF:`.",
			),

			disabled: NotApplicable(NotAControl("entry")),

			readonly: NotApplicable(ReadOnly("entry")),

			reducedmotion: NotApplicable(NoMotion("entry")),

			one: NotApplicable(
				"An entry is one record. `ONE` describes a set, and a set of one is an archive with a single row, which is where the count is printed.",
			),

			many: NotApplicable(
				"Many entries are an archive or a grid of cards, and the block prints one. A set of many is `RecordArchive`'s shape, not this block's.",
			),

			nomedia: NotApplicable(
				"An entry holds no media: its anatomy is a marker, a name, chips and a claim. A record with a picture is an entry beside a figure, not an entry holding one.",
			),

			rest: Built(
				"Index, name, chips, one paragraph, and the name as the link.",
			),

			partial: Built(
				"Through `facts`: a fact that is unknown prints the vocabulary's word in its value column, exactly as a ledger row does.",
			),

			longtext: Built(
				"The name wraps and the body is measure-capped at 62ch, so a long record name never pushes the chips off the card.",
			),

			dense: Built(
				"`dense` is the register reading: marker and name on one line, chips beside them, the body under - never a smaller type.",
			),

			incard: Built(
				'At `surface="bare"` the entry is rows inside a Jelly card.',
			),

			inband: Built("The ordinary context: entries in a band's body."),

			withaction: Built(
				"`href` makes the name the link, and only the name.",
			),
		},
	},

	{
		name: "STAGE",

		file: "COMPONENT/RECORD/RECORDSTAGE.ASTRO",

		note: "An ordered process: a rail of numbered steps, or a field of numbered plates.",

		cells: {
			stale: NotApplicable(
				"A stage prints no as-of. A run's age is a fact about a particular run, and a particular run is a `RecordTranscript` - the stage is the process abstracted out of it.",
			),

			disabled: NotApplicable(NotAControl("stage")),

			readonly: NotApplicable(ReadOnly("stage")),

			nomedia: NotApplicable(
				"A stage is a list of steps: an index, a label and one line. A step with a picture is a plate, and a process drawn as pictures is a plate-set.",
			),

			dense: NotApplicable(
				"The stage's two axes are `orientation` and `variant`, and they already answer the two readings of the same data. A third density would be a third composition, which is a second block with one name.",
			),

			rest: Built("The rail, read left to right: then, then, then."),

			loading: Built(
				"The frame prints the absence and `STATUS: LOADING`.",
			),

			empty: Built(
				"A stage with no steps: the head's grammar, the word, the sentence.",
			),

			partial: Built(
				"Through a step's own `state`: a run that stopped at step three prints `INTERRUPTED` on that step and nothing on the ones after it.",
			),

			error: Built(
				"A failed run is a step with `state=\"INTERRUPTED\"` - the vocabulary's word in the step's register, not a second alarm colour.",
			),

			reducedmotion: Built(
				"A step's detail is a `<details>` whose fold mark turns; the turn is the mark layer's and it is already gated on the reader's preference.",
			),

			one: Built(
				"A stage of one step is legal and prints as a single item: a process that has one stage is still a process, and the rail does not pretend to be longer.",
			),

			many: Built(
				"Nine steps is the too-many arm: the rail wraps, the plates tile, and the numbering stays the caller's - `09` is not derived from a position.",
			),

			longtext: Built(
				"The label wraps and the line takes the step's own measure; the index column never moves, because the index is what makes a rail readable.",
			),

			incard: Built("A rail inside a Jelly card, at the card's inset."),

			inband: Built("The ordinary context: a stage in a band's body."),

			withaction: Built("A step's `href` makes its label the link."),
		},
	},

	{
		name: "FIGURE",

		file: "COMPONENT/RECORD/RECORDFIGURE.ASTRO",

		note: "Evidence: a framed figure, a caption at caption weight, and the provenance it came from.",

		cells: {
			stale: NotApplicable(
				"A figure's provenance is a file or a commit, not a date. A figure older than the page is a plate, which prints `AS OF:` on its head, or an instrument, which prints the age beside the figure.",
			),

			disabled: NotApplicable(NotAControl("figure")),

			readonly: NotApplicable(ReadOnly("figure")),

			one: NotApplicable(NotASet("figure", "`RecordPlateSet`")),

			many: NotApplicable(NotASet("figure", "`RecordPlateSet`")),

			dense: NotApplicable(
				"Evidence gets its size. A figure shrunk to fit a dense column is a thumbnail, and a thumbnail is a decoration - which is the one thing a figure is not.",
			),

			rest: Built(
				"The frame, the caption under it, the provenance line.",
			),

			loading: Built(
				"The tombstone prints `STATUS: LOADING` and the caption still explains what would be there.",
			),

			empty: Built(
				'`state="UNAVAILABLE"` is the evidence that is not in the build.',
			),

			partial: Built(
				"A caption with no provenance prints `SOURCE: UNAVAILABLE` in the channel placement: a figure whose source is unknown is a fact about the figure.",
			),

			error: Built('`state="INTERRUPTED"` is the capture that failed.'),

			reducedmotion: Built(
				"`open` folds the caption's apparatus, and the fold mark's turn is the mark layer's - gated on the reader's preference.",
			),

			longtext: Built(
				"A caption longer than the image wraps at 62ch below, or becomes the channel's rows beside it; with `open` it takes 88ch and folds its apparatus away.",
			),

			nomedia: Built(
				"With neither `src` nor children the block prints the caption alone - a figure whose evidence is its sentence. No frame is drawn around nothing.",
			),

			incard: Built(
				"A figure inside a card's body, at the card's measure.",
			),

			inband: Built(
				"The ordinary context: a figure under the paragraph it illustrates.",
			),

			withaction: Built(
				"`open` prints `→ OPEN THE SOURCE` in the folded apparatus: the one link a figure may carry, and it leads to the evidence itself.",
			),
		},
	},

	{
		name: "PLATE",

		file: "COMPONENT/RECORD/RECORDPLATE.ASTRO",

		note: "The evidence the record is of, at plate scale: a numbered frame and a channel of manifest facts.",

		cells: {
			disabled: NotApplicable(NotAControl("plate")),

			readonly: NotApplicable(ReadOnly("plate")),

			one: NotApplicable(NotASet("plate", "`RecordPlateSet`")),

			many: NotApplicable(NotASet("plate", "`RecordPlateSet`")),

			dense: NotApplicable(
				"A plate is the size it is. A plate shrunk to fit is a thumbnail, and the whole reason this block is not a figure is that the evidence gets the width.",
			),

			rest: Built(
				"The frame, the channel, the manifest's rows, the source.",
			),

			loading: Built(
				"The tombstone prints `STATUS: LOADING` inside the frame's ratio.",
			),

			empty: Built(
				"The tombstone is the default state of this site's evidence: `UNAVAILABLE` with a `NEXT:`.",
			),

			partial: Built(
				"A plate with a state and no `next` prints `NEXT: UNAVAILABLE` rather than nothing - a dead end is not an adverse state.",
			),

			error: Built(
				'`state="INTERRUPTED"` is the capture that failed, and the frame keeps its ratio.',
			),

			stale: Built(
				"`asOf` prints `AS OF:` on the channel's head, so an old capture is never silent about its age.",
			),

			reducedmotion: Built(
				"`open` folds the channel's apparatus; the fold mark's turn is gated on the reader's preference.",
			),

			longtext: Built(
				"The channel is a 20-26ch column that stacks under the plate when the container is narrow; a long reading wraps inside its own column.",
			),

			nomedia: Built(
				"The frame prints its tombstone; the channel still prints the claim, the facts and the source.",
			),

			incard: Built(
				'A plate at a card\'s measure: `span="measure"` keeps it on the column.',
			),

			inband: Built(
				"The ordinary context: a plate in a band's body, at the band's inner width.",
			),

			withaction: Built(
				"`open` prints `→ OPEN THE CAPTURE`, which is the only destination a plate needs.",
			),
		},
	},

	{
		name: "WELL",

		file: "COMPONENT/RECORD/RECORDWELL.ASTRO",

		note: "A command, a config block or an output: a recessed mono body under a title bar with the copy control.",

		cells: {
			partial: NotApplicable(
				"A well prints what it is given, line for line. A command with a line missing is a DIFFERENT command, and the block cannot know which line was meant - so there is no honest partial arm.",
			),

			error: NotApplicable(
				"A failed command is a transcript turn or a failure block. The well prints the command and its output; an outcome with a cause and a next step is `RecordTranscript`'s failed turn.",
			),

			stale: NotApplicable(
				"A command has no date. Where it came from is its `SOURCE:` line, and a command that is out of date is a command whose source changed - a fact the source line already carries.",
			),

			disabled: NotApplicable(
				"The copy control is ABSENT when there is no clipboard, never disabled: a Jelly control upgraded inside `display: none` has no box, and an inert control is a focus stop that answers nothing.",
			),

			readonly: NotApplicable(ReadOnly("well")),

			reducedmotion: NotApplicable(NoMotion("well")),

			nomedia: NotApplicable(
				"A well holds text. An image in a recess is a figure, and a figure in a well is a card inside a card's body.",
			),

			dense: NotApplicable(
				"A command must not compress: the one thing a well cannot do is reflow its lines. `wrap` is not a density, it is a declaration that the lines are read rather than typed.",
			),

			rest: Built(
				"The bar, the recess, the copy control, the source line.",
			),

			loading: Built(
				"The bar keeps its label and the recess prints `STATUS: LOADING`.",
			),

			empty: Built(
				"A well with no lines is empty whatever the caller says: the recess prints the absence, never a hole.",
			),

			one: Built("A well of one line is the ordinary command."),

			many: Built(
				"`window` prints the first N lines and `SHOWING: N OF M` on the foot; the copy payload stays the whole body, so the reader who copies gets the file.",
			),

			longtext: Built(
				"`wrap` is the arm the exploration found: `pre-wrap` with a hanging indent, so a 300-character value prints in full instead of scrolling the recess sideways.",
			),

			incard: Built("A well inside a card's body, at the card's inset."),

			inband: Built("The ordinary context: a command in a band's body."),

			withaction: Built(
				"The copy control, wired once by `WireWells` for every consumer.",
			),
		},
	},

	{
		name: "TRANSCRIPT",

		file: "COMPONENT/RECORD/RECORDTRANSCRIPT.ASTRO",

		note: "A session as it happened: mark, speaker, line and stamp, with the source under it.",

		cells: {
			disabled: NotApplicable(NotAControl("transcript")),

			readonly: NotApplicable(ReadOnly("transcript")),

			reducedmotion: NotApplicable(NoMotion("transcript")),

			nomedia: NotApplicable(
				"A transcript is verbatim speech and output. A picture of a session is a capture, and a capture is a plate.",
			),

			dense: NotApplicable(
				"A transcript is verbatim: a compressed session has dropped the line that mattered. The too-much arm is `window`, which drops nothing silently.",
			),

			rest: Built(
				"Four columns on wide, two rows on narrow; the mark column never moves.",
			),

			loading: Built(
				"Mark and speaker in ink, a hairline bar where the line would be.",
			),

			empty: Built("The frame's own body prints the caller's sentence."),

			partial: Built(
				"`window` prints the first N turns and `SHOWING: N OF M` on the foot.",
			),

			error: Built(
				"A failed turn prints its state word in the stamp column and its `CAUSE:` and `NEXT:` under the line, spanning the grid.",
			),

			stale: Built(
				"`asOf` prints `AS OF:` on the bar: a session read out of an old build says when it was recorded.",
			),

			one: Built(
				"A session of one turn is legal: the frame, the mark column and the source still print.",
			),

			many: Built(
				"Two hundred turns is the window's own case: twelve printed, the rest named.",
			),

			longtext: Built(
				"A long line wraps inside its column; the speaker column stays fixed, so a reader can still read one speaker down the page.",
			),

			incard: Built("A session inside a card's body."),

			inband: Built(
				"The ordinary context: a transcript in a band's body.",
			),

			withaction: Built(
				"The copy control on the bar, and `retry` on the foot when a turn failed.",
			),
		},
	},

	{
		name: "PAIR",

		file: "COMPONENT/RECORD/RECORDPAIR.ASTRO",

		note: "Two things read against each other: two pods, one hairline gutter, one caption.",

		cells: {
			stale: NotApplicable(
				"A pair prints two claims and one caption. A date belongs to a side's own note - which is where the side's provenance prints - because the caption is about both sides and cannot carry one side's age.",
			),

			disabled: NotApplicable(NotAControl("pair")),

			readonly: NotApplicable(ReadOnly("pair")),

			reducedmotion: NotApplicable(NoMotion("pair")),

			one: NotApplicable(
				"A pair is two pods by definition. One pod is `RecordAside`, which is the same frame folded - and the routing table sends it there.",
			),

			many: NotApplicable(
				"A third side is a set, and a set is an archive, a matrix or a stage. Three things read against each other is a comparison, not a pair.",
			),

			nomedia: NotApplicable(
				"A pod holds prose or one leaf block, never media. A pair of two pictures is a plate-set, which is the block for many figures of one subject.",
			),

			dense: NotApplicable(
				"Two things are the minimum a comparison can be; there is nothing left to compress.",
			),

			rest: Built(
				"Two columns, one hairline gutter, the caption on the frame's floor.",
			),

			loading: Built(
				"A pod's own `state` prints `LOADING` in its bar and the body still prints.",
			),

			empty: Built(
				"A pod with no body prints the composed absence and keeps its title bar - the reader has to see WHICH side is missing.",
			),

			partial: Built(
				"One side's state is the other's comparison: `UNAVAILABLE` on the right pod is the whole point of a pair.",
			),

			error: Built(
				"A pod marked `INTERRUPTED` prints the word in its own bar; the pair's frame does not change.",
			),

			longtext: Built(
				"Both pods' bodies wrap at their own measure, and the gutter keeps its 1px whatever the two sides' heights are.",
			),

			incard: Built(
				'At `surface="bare"` the pair is structure inside a surface that is already painted.',
			),

			inband: Built(
				"The ordinary context: a comparison in a band's body.",
			),

			withaction: Built(
				"A pod's slot can hold a block with a link; the pair itself never carries one, because a comparison is not an action.",
			),
		},
	},

	{
		name: "HERO",

		file: "COMPONENT/RECORD/RECORDHERO.ASTRO",

		note: "The record opening: the data card, the blank interval, the evidence panel, one seal.",

		cells: {
			stale: NotApplicable(
				"A hero prints the record's facts, and a fact's age is a property of the row (`LedgerRow.asOf`), which `RecordLedger` prints. The artifact itself has no as-of to be older than.",
			),

			disabled: NotApplicable(NotAControl("hero")),

			readonly: NotApplicable(ReadOnly("hero")),

			reducedmotion: NotApplicable(NoMotion("hero")),

			one: NotApplicable(
				"The hero is the page's one artifact. `ONE` describes a set, and a page has one hero because it has one opening, not because the set is short.",
			),

			many: NotApplicable(
				"Two heroes is two openings, and a page has one. A second record opening is a band.",
			),

			dense: NotApplicable(
				"The artifact gets the screen - that is what makes it the artifact. A dense hero is a band with a card in it.",
			),

			incard: NotApplicable(
				"The hero IS the Jelly card: `FieldRecordDataCard` is the surface. A hero inside a card would be two surfaces, which §1.3 forbids.",
			),

			inband: Built(
				"The specimen sheet mounts every row inside a band, and the hero renders there; no page composes it that way, because a page has one opening and it is the hero's.",
			),

			rest: Built(
				"`49fr / 1px / 51fr`: the record, the hairline gutter, the evidence.",
			),

			loading: Built(
				"`evidence.state` prints the tombstone in the evidence panel and the pair keeps its shape.",
			),

			empty: Built(
				"With neither `evidence` nor children the card stands alone at the full width - no gap where a picture would be.",
			),

			partial: Built(
				"A metadata row that is unknown prints the vocabulary's word in its value column.",
			),

			error: Built(
				"`status.state` is the vocabulary's word, and the primitive's tone carries it: `INTERRUPTED` is ink, not red.",
			),

			longtext: Built(
				"The claim is the `h1` at the display tier and wraps inside the card; the facts wrap at the card's measure.",
			),

			nomedia: Built(
				"The single-column arm: the record without its evidence.",
			),

			withaction: Built(
				"One `FieldRecordAction`, and it is the artifact's one expressive element.",
			),
		},
	},

	{
		name: "ARCHIVE",

		file: "COMPONENT/RECORD/RECORDARCHIVE.ASTRO",

		note: "Many records in one form: a marker, a heading, a count, and a list of ruled rows.",

		cells: {
			partial: NotApplicable(
				'An archive\'s rows are either filed or not. A row whose target is gone prints `state: "gone"` - a tombstone in the record grammar - which is the honest arm, and there is no third.',
			),

			error: NotApplicable(
				"An archive is a set, not an action: it cannot fail. The page that built it can, and that failure is `RecordFailure` in the band above the list.",
			),

			disabled: NotApplicable(NotAControl("archive")),

			readonly: NotApplicable(ReadOnly("archive")),

			dense: NotApplicable(
				"An archive is dense by construction: one row per record, one hairline between. A second density would be the same list with more air, and the air is the band's.",
			),

			rest: Built("The header's count and the rows, one per record."),

			loading: Built(
				"The header keeps its counted zero and the absence prints `STATUS: LOADING`.",
			),

			empty: Built(
				"No entries is the state this block used to print as a hole: the header's `0` now has a sentence under it.",
			),

			stale: Built(
				"The foot's `note` carries when the index was last filed; a windowed archive prints its extent on the same foot.",
			),

			reducedmotion: Built(
				"The row's hover trace is `inline-size` and its ink; both are turned off under `prefers-reduced-motion` and the row keeps its state.",
			),

			one: Built(
				"An archive with one entry is legal: the header's count prints `1`, the run prints its one row, and the block does not pretend to be a card.",
			),

			many: Built(
				"`window` prints the first N rows and `SHOWING: N OF M` on the foot.",
			),

			longtext: Built(
				"A long title wraps inside the row; the marker column stays fixed so the titles stay in one column.",
			),

			nomedia: NotApplicable(
				"An archive is an index: titles, notes and markers. A row with a picture is a card grid, which is a different artifact.",
			),

			incard: Built(
				"An archive inside a card's body, at the card's inset.",
			),

			inband: Built("The ordinary context: the index of a chapter."),

			withaction: Built(
				"The whole row is the anchor; a gone row is a tombstone instead.",
			),
		},
	},

	{
		name: "ASIDE",

		file: "COMPONENT/RECORD/RECORDASIDE.ASTRO",

		note: "A folded aside: what the record keeps and does not lead with, opened by the reader.",

		cells: {
			partial: NotApplicable(
				"An aside holds one claim - prose, rows or one block. A body with a part unknown is a ledger inside the aside, which is where the partial state prints.",
			),

			error: NotApplicable(
				"A disclosure cannot fail; it is a `<details>`. A failed action inside it is the block the aside holds, and that block carries the cause and the next step.",
			),

			stale: NotApplicable(
				"An aside is not dated. A date belongs to the claim it holds - the ledger's row or the note's `AS OF:` - because the aside is the frame, not the fact.",
			),

			disabled: NotApplicable(NotAControl("aside")),

			readonly: NotApplicable(ReadOnly("aside")),

			dense: NotApplicable(
				"An aside is already the compressed form of its subject; folding it further would make it unopenable.",
			),

			rest: Built(
				"The summary bar: marker, label, the count, the fold mark.",
			),

			loading: Built(
				'`state="loading"` prints the state word on the bar and three hairlines in the body.',
			),

			empty: Built(
				"`empty` prints the composed absence inside the opened frame, and no body means no frame at all.",
			),

			reducedmotion: Built(
				"The fold mark's quarter turn is the mark layer's, gated on the reader's preference.",
			),

			one: Built(
				"An aside with one fact is legal: the count prints `〈01〉` and the ledger inside prints one row.",
			),

			many: Built(
				"Nine facts fold under one summary and the count says so: that is what the summary's count is for.",
			),

			longtext: Built(
				"The label wraps and the body is measure-capped; a long summary still leaves the fold mark at the line's end.",
			),

			nomedia: NotApplicable(
				"An aside holds prose, rows or one block. A disclosure that holds a picture is a figure with `open`, and that is the block the routing table sends it to.",
			),

			incard: Built(
				"An aside inside a card's body, folded, at the card's inset.",
			),

			inband: Built(
				"The ordinary context: a disclosure under the band that raised it.",
			),

			withaction: NotApplicable(
				"The summary is the aside's only control, and it is the whole mechanism. An action inside a folded body is an action nobody sees until they have already opened it.",
			),
		},
	},

	{
		name: "MARGIN",

		file: "COMPONENT/RECORD/RECORDMARGIN.ASTRO",

		note: "One annotation in the margin: a marker, a claim, a destination and a source.",

		cells: {
			empty: NotApplicable(
				"A note with no claim is a blank in the margin, and a blank is worse than no note. `body` is required and the caller does not mount the block to say nothing.",
			),

			error: NotApplicable(
				"A note states a fact beside a record; it is not an action and cannot fail. A failure in the margin is a `RecordFailure` beside the paragraph it belongs to.",
			),

			disabled: NotApplicable(NotAControl("note")),

			readonly: NotApplicable(ReadOnly("note")),

			reducedmotion: NotApplicable(NoMotion("note")),

			one: NotApplicable(
				"A note is one annotation. `ONE` describes a set, and the margin has no set - a second note is a second margin note.",
			),

			many: NotApplicable(
				"Many notes are many marginalia, each its own block; the margin is not a list and does not print one.",
			),

			nomedia: NotApplicable(
				"A note is a claim and a source. A note that had to carry a figure is `RecordInset`, which is the block for exactly that.",
			),

			dense: NotApplicable(
				"A note is already the densest thing that can carry a source; compressing it would remove the source.",
			),

			rest: Built(
				"The marker, the claim with its `↳`, the destination, the source.",
			),

			loading: Built(
				"`state` prints `LOADING` in the note's own register and the claim still prints.",
			),

			partial: Built(
				"No source prints `SOURCE: UNAVAILABLE` - the one place in the layer where a missing field is printed rather than skipped.",
			),

			stale: Built(
				"`asOf` prints `AS OF:` beside the state, so a note whose figures were taken a month ago says so.",
			),

			longtext: Built(
				"The claim wraps at the margin's 26ch measure; the source row wraps rather than truncating.",
			),

			incard: Built(
				"A note inside a card's margin, at the card's measure.",
			),

			inband: Built(
				"The ordinary context: a note in a band's margin column.",
			),

			withaction: Built(
				"`link` prints `→ LABEL`, or the tombstone when the target is gone.",
			),
		},
	},

	{
		name: "INSET",

		file: "COMPONENT/RECORD/RECORDINSET.ASTRO",

		note: "A marginal note that can hold a figure: a capture, or a measure figure drawn in bars.",

		cells: {
			disabled: NotApplicable(NotAControl("inset")),

			readonly: NotApplicable(ReadOnly("inset")),

			reducedmotion: NotApplicable(NoMotion("inset")),

			dense: NotApplicable(
				"The figure is the reason the block exists; a compressed inset is a margin note with a squashed picture.",
			),

			rest: Built(
				"The figure, its caption, the marker, the claim, the destination, the source.",
			),

			loading: Built(
				"`figure.state` prints `STATUS: LOADING` in the frame and the claim still prints.",
			),

			empty: Built(
				"`empty` prints the composed absence instead of a claim with no figure.",
			),

			partial: Built(
				"No source prints `SOURCE: UNAVAILABLE`, and a figure with a state prints `NEXT: UNAVAILABLE` when it has none.",
			),

			error: Built(
				'`figure.state="INTERRUPTED"` is the capture that failed, in the frame\'s own grammar.',
			),

			stale: Built(
				"`figure.asOf` prints `AS OF:` under the caption, so a measure taken earlier says when.",
			),

			one: Built(
				"One bar is a legal measure figure: a single share of one, printed with its label and its value.",
			),

			many: Built(
				"Nine bars stack inside the margin's measure; each keeps its label, its value and its own rule.",
			),

			longtext: Built(
				"A bar's label and value share one line and wrap together; the caption wraps at the margin's measure.",
			),

			nomedia: Built(
				"The bars ARE the no-media arm: a figure drawn from three rules, with no picture at all.",
			),

			incard: Built("An inset inside a card's margin."),

			inband: Built(
				"The ordinary context: an annotation with its evidence, beside the paragraph it qualifies.",
			),

			withaction: Built(
				"`link` prints `→ LABEL`, or the tombstone when the target is gone.",
			),
		},
	},

	{
		name: "STAMP",

		file: "COMPONENT/RECORD/RECORDSTAMP.ASTRO",

		note: "The mark that says this record is what it claims: a mark, a route, its facts, its authority.",

		cells: {
			empty: NotApplicable(
				"A stamp with no mark is not a stamp: `mark` and `authority` are required, and an empty one would be a frame that looked like a guarantee and guaranteed nothing.",
			),

			disabled: NotApplicable(NotAControl("stamp")),

			readonly: NotApplicable(ReadOnly("stamp")),

			reducedmotion: NotApplicable(NoMotion("stamp")),

			one: NotApplicable(
				"A stamp's `rows` are the facts that bound the mark, and one fact is a legal stamp. `ONE` here would be a count of a set the stamp does not have - the mark is one.",
			),

			many: NotApplicable(
				"Six facts stack in the stamp's two columns; the count is not the stamp's subject, and the register's figure belongs to a ledger.",
			),

			nomedia: NotApplicable(
				"A stamp is a mark and a register: no picture, no figure. A seal is a glyph and belongs to the artifact, not to the stamp.",
			),

			dense: NotApplicable(
				"A stamp is four lines and a mark; there is nothing to compress, and a compressed stamp is a badge.",
			),

			rest: Built(
				"The mark at section size, the route, the facts in two columns, the authority.",
			),

			loading: Built(
				"`state` prints the vocabulary's word on the head and the rows still print - a mark being checked is still a mark.",
			),

			partial: Built(
				"A mark with a state and a `note` says what it does not cover, which is the honest partial arm.",
			),

			error: Built(
				'`state="INTERRUPTED"` is the verification that did not finish; the mark stays, its route stays, the word says why.',
			),

			stale: Built(
				"`expires` prints `EXPIRES:` with the facts that bound the mark, and a mark past its window prints `ARCHIVED`.",
			),

			longtext: Built(
				"The mark steps to the heading role on a narrow measure; the rows wrap and the authority wraps under them.",
			),

			incard: Built("A stamp inside a card's body, at the card's inset."),

			inband: Built(
				"The ordinary context: the mark under the record it authenticates.",
			),

			withaction: Built(
				"`verify` prints `→ LABEL` under the authority: the one destination a stamp needs, and never a button.",
			),
		},
	},

	{
		name: "FAILURE",

		file: "COMPONENT/RECORD/RECORDFAILURE.ASTRO",

		note: "One documented way the thing breaks: the state word, the symptom, the cause and the next step.",

		cells: {
			loading: NotApplicable(
				"A failure is a condition that has already happened. `LOADING` is a state of a reading, and a failure that has not happened is not one - the block has no arm for a failure in progress.",
			),

			empty: NotApplicable(
				"The three fields are required. A failure with no symptom is a blank in a condition block, and a blank condition is a lie about what the reader is looking at.",
			),

			stale: NotApplicable(
				"A failure is documented at a commit, not dated: its `SOURCE:` line says where it is written, and that is the only provenance a condition can have.",
			),

			disabled: NotApplicable(NotAControl("failure")),

			readonly: NotApplicable(ReadOnly("failure")),

			one: NotApplicable(
				"A failure is one condition. `ONE` describes a set, and a set of failures is a table of them - each its own block, side by side.",
			),

			many: NotApplicable(
				"Three failures side by side align on SYMPTOM, CAUSE and NEXT because each is its own block. The block prints one; the alignment is the composition's.",
			),

			nomedia: NotApplicable(
				"A failure is four fields. A screenshot of a failure is a figure beside it, not inside it - the block's own note says a stack trace is a well beside it.",
			),

			dense: NotApplicable(
				"The three fields ARE the density. A failure with a shorter cause is a failure that stopped explaining itself.",
			),

			rest: Built(
				"The marker, the state word, the three fields, the source.",
			),

			partial: Built(
				"No recovery path prints `NEXT: UNAVAILABLE` and marks the block `--dead-end`: a documented dead end is a fact, not a blank.",
			),

			error: Built(
				"A failure is the error state, and it prints its own subject in the fixed vocabulary.",
			),

			reducedmotion: Built(
				"`detail` folds under the fields, and the fold mark's turn is gated on the reader's preference.",
			),

			longtext: Built(
				"The fields' values wrap inside their own column; the key column stays fixed so three failures align.",
			),

			incard: Built(
				"A failure inside a card's body, at the card's inset.",
			),

			inband: Built(
				"The ordinary context: the conditions under the band that documents them.",
			),

			withaction: Built(
				"`recovery` prints `→ LABEL` under the next step: the destination the sentence names.",
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

		value: "CONTENT/SPECIMEN/NARRATIVE.TS",

		note: "every figure above is counted from the three tables in this file",
	},
];

/* ─── THE IMPROVEMENTS ───────────────────────────────────────────────────── */

/** One behaviour the matrix revealed, and where it now lives. */
export interface Improvement {
	/** `STAGE` - the component the behaviour is in. */
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
		component: "BAND",

		from: "EMPTY / LOADING",

		found: "A chapter whose subject was not written yet rendered nothing: the band printed its heading and stopped, so a reader saw a title with a hole under it and no way to tell a missing set from a short one.",

		built: "`Band.state` with `Band.empty`: the head, the standfirst, the index strip and the footnote all print, and the body becomes the composed absence - `◎`, `STATUS:`, the caller's sentence. The band's own footnote is still the last thing read, so the next step sits under the absence.",
	},

	{
		component: "BAND",

		from: "DENSE",

		found: "Every band spent the chapter interval and the chapter heading tier, so a band used as a section inside a hero or a card opened at the volume of a page movement.",

		built: "`Band.dense` prints the head at the heading tier and the body at the tight step, with the chapter interval dropped: a section of an artifact reads as a section, and the page's air stays the page's.",
	},

	{
		component: "ENTRY",

		from: "EMPTY / LOADING / ARCHIVED",

		found: "An entry's `body` was required, so a record that was being read, or one that had been retired, could not be printed at all - the set either omitted the slot or lied with a placeholder sentence.",

		built: "`Entry.state` keeps the index, the name and the chips and replaces only the claim: `empty` and `loading` print the composed absence, `archived` prints the claim with `STATUS: ARCHIVED` above it in the quiet tone. The record is still filed, and the list still knows where it sits.",
	},

	{
		component: "ENTRY",

		from: "FACTS",

		found: "An entry that carried three facts had to spell them into its paragraph, so a set of records that were comparable as facts could not be read as a register.",

		built: "`Entry.facts` prints the record's own `<dl>` under the claim - the entry's grammar, not a mounted `RecordLedger`, because a leaf may not hold a block (§4.2). `Entry.note` gives the record one `SOURCE:` line, which is the only place it had to say where it is filed.",
	},

	{
		component: "ENTRY",

		from: "DENSE",

		found: "`surface=\"bare\"` removed the frame but kept the entry's tall anatomy, so ten records inside one card still read as ten cards' worth of air.",

		built: "`Entry.dense` is the register reading: marker and name on one line, chips beside them, the claim under at the body tier - a hairline between rows instead of a frame around each. Never a smaller type.",
	},

	{
		component: "STAGE",

		from: "PARTIAL / ERROR",

		found: "A rail of steps said nothing about where the run was. A build that had stopped at stage three printed the same nine items as a build that had never started, so the block described a process and not a run.",

		built: "`RecordStage.current` names the step the run is at by the index the caller wrote; that step prints `aria-current=\"step\"`, the attested square and the divider's rule. A step's own `state` prints the vocabulary's word - `INTERRUPTED` on the step that stopped - so the rail carries a run's position without becoming a stepper.",
	},

	{
		component: "STAGE",

		from: "LONG",

		found: "A stage's line is one line, and every step that needed a paragraph either broke that rule or lost the paragraph. The block had no level between the line and the page.",

		built: "`Stage.detail` turns the step's line into a `<details>` summary with the paragraph one level in: closed, the rail keeps its reading rhythm; open, the step explains itself. No script - the browser owns the disclosure, and its own in-page search finds the text while it is closed.",
	},

	{
		component: "STAGE",

		from: "EMPTY / ONE / MANY",

		found: "A stage with no steps printed an empty `<ol>`; a stage with one step printed a rail that looked like a failure; a stage with nine wrapped into a shape nobody had composed.",

		built: "`stages.length === 0` is now the composed absence in the frame's own grammar, and one step and nine steps are both printed by the same two arms - the rail wraps, the plates tile two across, and the caller's numbering is never re-derived from a position.",
	},

	{
		component: "FIGURE",

		from: "NO MEDIA / LONG",

		found: "A figure with a caption longer than its image had no answer: the caption ran to the measure cap and the provenance sat under it, so the one case the brief names by hand read as a paragraph that happened to follow a picture.",

		built: "`Figure.open` folds the caption's apparatus: the summary is the caption itself, so shutting it loses nothing, and the open arm prints the `SOURCE:` row, the `〈FIGURE〉` folio and `→ OPEN THE SOURCE` - the full-size evidence, without a lightbox. With no `src` and no children the block still prints the caption alone and draws no frame around nothing.",
	},

	{
		component: "FIGURE",

		from: "PARTIAL / ERROR",

		found: "The tombstone printed its state word and stopped, so a reader told that the capture was interrupted had no next step - a dead end wearing an adverse state's grammar.",

		built: "`Figure.next` prints `NEXT:` inside the tombstone, the way a plate already did, and the channel placement's missing provenance prints `SOURCE: UNAVAILABLE` instead of omitting the row.",
	},

	{
		component: "PLATE",

		from: "PARTIAL / NO MEDIA",

		found: "A plate with a state and no `next` printed the state and stopped: the same dead end as a figure, in the block whose whole subject is the capture that is not in the build.",

		built: "`plate.next` now falls back to `NEXT: UNAVAILABLE` in the quiet tone, so the row always prints and always says whether a next step exists. `Plate.open` folds the channel's apparatus - the reading, the manifest's facts, the source and `→ OPEN THE CAPTURE` - under the `FIGURE:` claim.",
	},

	{
		component: "WELL",

		from: "LONG / MANY",

		found: "The body was `white-space: pre` and scrolled sideways, which is right for a command and wrong for the config and output a well also carries: a 300-character value forced a reader to scroll a recess to find the end of a line. A two-hundred-line log printed all two hundred.",

		built: "`Well.wrap` is the caller's declaration that the lines are read rather than typed: `pre-wrap` with a hanging indent, every character printed. `Well.window` prints the first N lines and `SHOWING: N OF M` on the foot while the copy payload stays whole - the reader who copies gets the file.",
	},

	{
		component: "WELL",

		from: "EMPTY / PARTIAL",

		found: "A well with no lines printed an empty recess under a title bar, and there was no way to say `this command is not documented yet` - the recess was indistinguishable from a well whose content failed to load.",

		built: "`Well.state` with `Well.empty`: the bar keeps its label so the reader knows WHICH command is missing, and the recess prints `STATUS:` and the sentence. `Well.note` gives the well one line for what the command assumes, printed in its own foot rather than as a paragraph beside it.",
	},

	{
		component: "TRANSCRIPT",

		from: "ERROR",

		found: "A failed turn printed `INTERRUPTED` in the stamp column and nothing else: a red word where the cause and the next step belong, and no way to say what the session could do about it.",

		built: "`Turn.cause` and `Turn.next` print under the failed turn's line in a row that spans the grid, and `Transcript.retry` prints the session's one way back on the foot - once, not repeated under every turn that stopped at the same place.",
	},

	{
		component: "PAIR",

		from: "EMPTY / PARTIAL",

		found: "A pod with no body rendered a title bar over nothing, so a comparison with one side missing read as a card with a gap - and the reader could not tell which side was missing.",

		built: "`PairPod.empty` prints the composed absence inside the pod and keeps its bar; `PairPod.state` prints the side's own word in that bar; `PairPod.note` gives the side its own provenance, which the shared caption cannot carry.",
	},

	{
		component: "PAIR",

		from: "REST",

		found: "The pair's caption made its statement at the foot, after both sides had been read - so the one thing that made two columns one artifact arrived last.",

		built: "`Pair.relation` prints the relation in the gutter the pair already draws: vertical on wide screens, a row between the stacked pods on narrow ones. The caption still closes the artifact; the relation now says how the two sides bear on each other where the eye is.",
	},

	{
		component: "HERO",

		from: "NO MEDIA / ERROR",

		found: "A hero whose capture was not in the build either lost its evidence panel - collapsing the artifact into one column - or framed a broken image, because `HeroEvidence` required `src` and `alt` and had no absent arm.",

		built: "`HeroEvidence.state` and `.next` print the tombstone in the evidence panel: the pair keeps its `49fr / 1px / 51fr`, the hairline gutter stays, and the panel says what is missing and what to do about it.",
	},

	{
		component: "ARCHIVE",

		from: "EMPTY / ONE / MANY",

		found: "An archive with no entries printed its header, its `0`, and nothing under them - the one state the brief calls `empty` was a hole. A two-hundred-entry index printed all two hundred, and a row whose target had gone printed a dead link.",

		built: '`Archive.state` with `Archive.empty` prints the counted zero and the composed absence; `Archive.window` prints the first N rows and `SHOWING: N OF M` on the foot; `ArchiveEntry.state = "gone"` prints a tombstone row with the route it used to have. One entry is printed by the same arms and the count says `1`.',
	},

	{
		component: "ASIDE",

		from: "ONE / MANY / LOADING",

		found: "A folded section gave the reader no way to decide whether to open it: the summary was a label, and the body's extent was invisible until it had already been read.",

		built: '`Aside.count` prints `〈04〉` on the summary, derived from the rows or paragraphs the aside holds unless the caller knows the real extent. `Aside.state = "loading"` prints the state word on the bar and three hairlines in the body - the shape of the disclosure before its content.',
	},

	{
		component: "MARGIN",

		from: "STALE",

		found: "A note could say `LOADING` or `UNAVAILABLE` but not WHEN its claim was true, so the one annotation whose job is provenance was the one that could not be dated.",

		built: "`MarginNote.asOf` prints `AS OF:` beside the state on one register row above the claim: the two facts that decide how much the note is worth arrive before the note itself.",
	},

	{
		component: "INSET",

		from: "MANY / PARTIAL",

		found: "A measure figure of three bars printed three claims and never their sum, so the one figure the inset exists to draw could not be read as a whole. An absent figure had no next step.",

		built: "`InsetFigure.total` prints the caller's sum under the bars on the divider's rule - the caller's arithmetic, never the block's - and `InsetFigure.next` prints `NEXT:` inside the absent frame, falling back to `UNAVAILABLE`.",
	},

	{
		component: "STAMP",

		from: "STALE / WITH ACTION",

		found: "A stamp said what made it true and never when it stopped being true, and it had no way to point at the route that checks it: the authority was a sentence the reader had to take on trust.",

		built: "`Stamp.expires` prints `EXPIRES:` with the facts that bound the mark, and `Stamp.verify` prints `→ LABEL` under the authority - the one destination a stamp needs, printed as a link and never as a button, and suppressed on a withdrawn mark because a withdrawn mark has nothing left to verify.",
	},

	{
		component: "FAILURE",

		from: "PARTIAL / ERROR",

		found: "The brief's own case - a failure with no recovery path - printed an empty `NEXT:` value or a sentence pointing nowhere. The block had no way to say that the dead end was the finding.",

		built: "`next` that is empty or `UNAVAILABLE` prints the vocabulary's word in the value's place and marks the block `--dead-end`, so the absence of a next step is visibly a fact. `Failure.recovery` prints the destination the sentence names as the block's one link, and `Failure.detail` folds the reproduction under the three fields.",
	},
];

/* ─── THE OBSERVATIONS ───────────────────────────────────────────────────── */

/** Something the exploration found and this card did not fix, and whose it is. */
export interface Observation {
	/** The component the observation is about. */
	readonly component: string;

	/** What was found, in the sheet's voice. */
	readonly found: string;

	/** Whose work it is: a card, a surface, the owner. */
	readonly owner: string;
}

/**
 * Four things this card saw and did not change.
 *
 * A card that fixed everything it noticed would be a card that changed surfaces
 * it was not given. These are recorded rather than acted on, so the next card
 * starts from the finding instead of rediscovering it.
 */
export const Observations: readonly Observation[] = [
	{
		component: "PLATE / PLATE-SET",

		found: "`RecordPlate` and `RecordPlateSet` both print a tombstone and both now print a `NEXT:` fallback, but the two tombstones are drawn by two partials with two sets of names. They should share one mark-and-word component before a third block grows a third copy.",

		owner: "a later card on the apparatus blocks",
	},

	{
		component: "WELL / TRANSCRIPT",

		found: "Both blocks mount `WireWells` from their own module script, so a page with three wells ships the wiring three times. It is idempotent and it works; it is not one script, and the duplication is invisible until a page mounts both blocks.",

		owner: "`Library/Document/WireWells`",
	},

	{
		component: "STAGE",

		found: "`RecordStage` prints a step's `state` as a `STATUS:` word, and `RecordTrace` prints a step's state as a mark. Two blocks, two registers, one vocabulary - defensible, but it is a decision nobody wrote down, and the next card should either record it or unify it.",

		owner: "the owner's reading",
	},

	{
		component: "PAIR / TRANSCRIPT / STAGE",

		found: "Every width switch in this family is a viewport media query (`@include bp(768px)`, `bp(1024px)`), not a container query. So the narrow arm only exists when the WINDOW is narrow: a block placed in a narrow column on a wide screen prints its wide composition, squeezed - which is why the plate's rows are all printed at the band width and the narrow cells of the matrix can only be seen by resizing. The fix is a `@container` on each block's own box, and it is a change to nine partials' breakpoints rather than to one block.",

		owner: "a card on the family's width contract",
	},
];

/* ─── THE SPECIMENS ──────────────────────────────────────────────────────── */

/** The four groups the rows are filed under. */
export type Group = "frames" | "sequences" | "evidence" | "apparatus";

/** What the stage mounts for a row. */
export type Kind =
	| "band"
	| "entry"
	| "stage"
	| "figure"
	| "plate"
	| "well"
	| "transcript"
	| "pair"
	| "hero"
	| "archive"
	| "aside"
	| "margin"
	| "inset"
	| "stamp"
	| "failure";

/** The props a specimen's stage needs. Every one is optional; the kind decides. */
export interface Spec {
	/** How many steps, entries, turns or rows the specimen builds. */
	readonly rows?: number;

	/** The state the block is put into - its own `state` prop. */
	readonly state?: string;

	/**
	 * The combination the row exercises, where the state prop is not enough:
	 * `open`, `wrap`, `window`, `current`, `detail`, `relation`, `gone`,
	 * `deadend`, `recovery`, `facts`, `dense`, `nofigure`, `total`, `bars`.
	 */
	readonly variant?: string;

	/** The block's own `/LABEL` or title-bar label. */
	readonly label?: string;

	/** The count the block prints, when it is not the array's length. */
	readonly count?: string;

	/** The unit beside a count: `STEPS`, `ENTRIES`, `TURNS`. */
	readonly unit?: string;

	/** The one sentence under the block, where the state needs one. */
	readonly caption?: string;

	/** The composed absence, where the row is about an absence. */
	readonly empty?: string;

	/** The stage's own width, and whether it stands in for a Jelly surface. */
	readonly width?: "narrow" | "wide" | "band" | "card";

	/** The block's own dense arm, where it has one. */
	readonly dense?: boolean;

	/** The band's tone, when the row is about a surface. */
	readonly tone?: string;

	/** The pair's surface, or the entry's: `card` or `bare`. */
	readonly surface?: string;

	/** The step the run is at, for the stage's `current`. */
	readonly current?: string;

	/** The one action's label, where the block prints one. */
	readonly action?: string;

	/** The one destination, where the block prints one. */
	readonly href?: string;
}

/** One labelled row on the sheet: the state, the part, and when it is right. */
export interface Specimen extends Spec {
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
 * Ordered as the matrix's groups: the frames, the sequences, the evidence, the
 * apparatus. Every one of the fifteen components appears at least once, the nine
 * combinations the brief named by hand each get a row of their own, and the rows
 * that carry a context are the same component in two different boxes - which is
 * the claim this family has to prove.
 */
export const Specimens: readonly Specimen[] = [
	/* ─── FRAMES ───────────────────────────────────────────────────────── */

	{
		mark: "01",

		group: "frames",

		state_name: "REST",

		component: "Band",

		when: "The ordinary chapter: a kicker, a heading, a standfirst, a body and a footnote.",

		kind: "band",

		label: "/THE SUBSTITUTION",
	},

	{
		mark: "02",

		group: "frames",

		state_name: "EMPTY",

		component: "Band",

		when: "A chapter whose subject is not written yet: the head prints and the body states what is missing.",

		kind: "band",

		state: "empty",

		label: "/THE LEDGER",

		empty: "No fact is filed under this chapter yet. The ledger is the block that holds them, and it has nothing to hold: a chapter with a heading and no rows is a subject someone has not written.",
	},

	{
		mark: "03",

		group: "frames",

		state_name: "LOADING",

		component: "Band",

		when: "A chapter being read: the head is here, the body is not, and the word says so.",

		kind: "band",

		state: "loading",

		label: "/THE TRACE",

		empty: "The trace is being read out of the build. The chapter's head is printed first because the heading is how the reader knows what has not arrived.",
	},

	{
		mark: "04",

		group: "frames",

		state_name: "DENSE",

		component: "Band",

		when: "A band used as a section inside an artifact: the heading steps down and the chapter's air stays the page's.",

		kind: "band",

		label: "/SECTION OF A CARD",

		dense: true,

		width: "card",
	},

	{
		mark: "05",

		group: "frames",

		state_name: "REST",

		component: "Entry",

		when: "One record in a set: the marker, the name, the chips and one paragraph.",

		kind: "entry",

		label: "LAND",
	},

	{
		mark: "06",

		group: "frames",

		state_name: "EMPTY",

		component: "Entry",

		when: "A record that is filed and not written: the name and the chips print, the claim is the absence.",

		kind: "entry",

		state: "empty",

		label: "MOUNTAIN",

		empty: "This record has a name and no claim yet. The index is printed because the record is filed, and the body is the absence because the claim is not.",
	},

	{
		mark: "07",

		group: "frames",

		state_name: "ARCHIVED",

		component: "Entry",

		when: "A retired record: it keeps its name and its claim and prints the word that says it is retired.",

		kind: "entry",

		state: "archived",

		label: "ECHO",
	},

	{
		mark: "08",

		group: "frames",

		state_name: "DENSE",

		component: "Entry",

		when: "Ten records read as a register: marker and name on one line, a hairline between, never a smaller type.",

		kind: "entry",

		label: "WIND",

		dense: true,

		surface: "bare",

		width: "card",
	},

	{
		mark: "09",

		group: "frames",

		state_name: "FACTS",

		component: "Entry",

		when: "A record whose facts are comparable: the claim first, then its own register under it.",

		kind: "entry",

		label: "SKY",

		variant: "facts",
	},

	{
		mark: "10",

		group: "frames",

		state_name: "REST",

		component: "Hero",

		when: "The page's one artifact: the record, the hairline gutter, the evidence.",

		kind: "hero",
	},

	{
		mark: "11",

		group: "frames",

		state_name: "NO EVIDENCE",

		component: "Hero",

		when: "A record whose evidence is not a picture: the card stands alone at the full width, with no gap.",

		kind: "hero",

		variant: "nofigure",
	},

	{
		mark: "12",

		group: "frames",

		state_name: "EVIDENCE ABSENT",

		component: "Hero",

		when: "The capture is not in the build: the panel keeps its place and prints the tombstone, never a broken image.",

		kind: "hero",

		state: "unavailable",

		empty: "The capture of the workbench is not in this build. The panel keeps the artifact's shape, and the plate's manifest is where the reading lives.",
	},

	{
		mark: "13",

		group: "frames",

		state_name: "REST",

		component: "Pair",

		when: "Two things read against each other: two pods, one hairline gutter, one caption.",

		kind: "pair",
	},

	{
		mark: "14",

		group: "frames",

		state_name: "ONE POD EMPTY",

		component: "Pair",

		when: "A comparison with one side missing: the pod keeps its bar, so the reader sees which side is absent.",

		kind: "pair",

		state: "empty",

		empty: "No reading is filed for this side. The pod keeps its title bar because a comparison has to say which of its two sides is missing.",
	},

	{
		mark: "15",

		group: "frames",

		state_name: "RELATION",

		component: "Pair",

		when: "A pair whose two sides declare how they bear on each other: the relation runs in the gutter.",

		kind: "pair",

		variant: "relation",
	},

	{
		mark: "16",

		group: "frames",

		state_name: "FOLDED",

		component: "Aside",

		when: "What the record keeps and does not lead with: closed by default, opened by the reader.",

		kind: "aside",
	},

	{
		mark: "17",

		group: "frames",

		state_name: "COUNTED",

		component: "Aside",

		when: "A disclosure whose summary says how much is behind it, so the reader can decide without opening.",

		kind: "aside",

		variant: "count",
	},

	{
		mark: "18",

		group: "frames",

		state_name: "LOADING",

		component: "Aside",

		when: "A folded section being read: the bar prints the word and the body prints its own shape.",

		kind: "aside",

		state: "loading",
	},

	{
		mark: "19",

		group: "frames",

		state_name: "OPEN",

		component: "Aside",

		when: "A disclosure printed open, for the page whose argument needs it read rather than found.",

		kind: "aside",

		variant: "open",
	},

	/* ─── SEQUENCES ────────────────────────────────────────────────────── */

	{
		mark: "20",

		group: "sequences",

		state_name: "RAIL",

		component: "Stage",

		when: "A process the reader follows: then, then, then, read left to right.",

		kind: "stage",

		rows: 4,
	},

	{
		mark: "21",

		group: "sequences",

		state_name: "ONE STEP",

		component: "Stage",

		when: "A process with one stage is still a process: the rail does not pretend to be longer.",

		kind: "stage",

		rows: 1,
	},

	{
		mark: "22",

		group: "sequences",

		state_name: "NINE STEPS",

		component: "Stage",

		when: "The too-many arm: nine steps wrap, and the caller's numbering stays the caller's.",

		kind: "stage",

		rows: 9,
	},

	{
		mark: "23",

		group: "sequences",

		state_name: "THE RUN'S POSITION",

		component: "Stage",

		when: "A run that is somewhere: the current step takes the square and `aria-current`, and the rest read around it.",

		kind: "stage",

		rows: 5,

		variant: "current",

		current: "03",
	},

	{
		mark: "24",

		group: "sequences",

		state_name: "STOPPED",

		component: "Stage",

		when: "A run that stopped: the step that failed prints the vocabulary's word in its own register.",

		kind: "stage",

		rows: 5,

		state: "interrupted",
	},

	{
		mark: "25",

		group: "sequences",

		state_name: "STEP DETAIL",

		component: "Stage",

		when: "A step that needs a paragraph: the line stays the summary and the paragraph folds one level in.",

		kind: "stage",

		rows: 3,

		variant: "detail",
	},

	{
		mark: "26",

		group: "sequences",

		state_name: "PLATES",

		component: "Stage",

		when: "A process the reader refers back to: the same steps as a field of numbered instruments.",

		kind: "stage",

		rows: 4,

		variant: "plates",
	},

	{
		mark: "27",

		group: "sequences",

		state_name: "NO STEPS",

		component: "Stage",

		when: "A process with nothing in it: the frame prints the absence rather than an empty list.",

		kind: "stage",

		rows: 0,

		empty: "No stage of this process is documented yet. The pipeline is described in prose on `/Doc/Build-Pipeline`, and a rail with no steps would be a promise the page cannot keep.",
	},

	{
		mark: "28",

		group: "sequences",

		state_name: "ARCHIVE",

		component: "Archive",

		when: "Many records in one form: the marker, the heading, the count, and a ruled row per record.",

		kind: "archive",

		rows: 6,
	},

	{
		mark: "29",

		group: "sequences",

		state_name: "ONE ENTRY",

		component: "Archive",

		when: "A set of one: the count says `1` and the block does not pretend to be a card.",

		kind: "archive",

		rows: 1,
	},

	{
		mark: "30",

		group: "sequences",

		state_name: "NO ENTRIES",

		component: "Archive",

		when: "An index with nothing filed: the counted zero and the sentence under it, not a hole.",

		kind: "archive",

		rows: 0,

		empty: "Nothing is filed under this index yet. The archive is built from the collection at build time, so an index with no rows is a collection that has not been written.",
	},

	{
		mark: "31",

		group: "sequences",

		state_name: "WINDOW",

		component: "Archive",

		when: "The too-many arm: the first twelve rows print and the foot names the two hundred and forty.",

		kind: "archive",

		rows: 12,

		variant: "window",
	},

	{
		mark: "32",

		group: "sequences",

		state_name: "A ROW GONE",

		component: "Archive",

		when: "A record whose target is gone: a tombstone row with the route it used to have, never a dead link.",

		kind: "archive",

		rows: 5,

		variant: "gone",
	},

	{
		mark: "33",

		group: "sequences",

		state_name: "REST",

		component: "Transcript",

		when: "A session as it happened: the mark column, the speaker, the line and the stamp.",

		kind: "transcript",

		rows: 6,
	},

	{
		mark: "34",

		group: "sequences",

		state_name: "FAILED TURN",

		component: "Transcript",

		when: "A turn that failed: the word in the stamp column and its cause and next step under the line.",

		kind: "transcript",

		rows: 6,

		state: "failed",
	},

	{
		mark: "35",

		group: "sequences",

		state_name: "WINDOW",

		component: "Transcript",

		when: "A session of two hundred turns: twelve print, and the foot says so.",

		kind: "transcript",

		rows: 12,

		variant: "window",
	},

	{
		mark: "36",

		group: "sequences",

		state_name: "LOADING",

		component: "Transcript",

		when: "A session being read: mark and speaker in ink, a hairline where the line will be.",

		kind: "transcript",

		rows: 4,

		state: "loading",
	},

	{
		mark: "37",

		group: "sequences",

		state_name: "NO TURNS",

		component: "Transcript",

		when: "A session with nothing in it: the frame's own body says why, and the source still prints.",

		kind: "transcript",

		rows: 0,

		empty: "The build was not run at the commit this page was built from, so there is no session to print. The transcript is a record of a run, and a run that did not happen leaves no record.",
	},

	/* ─── EVIDENCE ─────────────────────────────────────────────────────── */

	{
		mark: "38",

		group: "evidence",

		state_name: "REST",

		component: "Figure",

		when: "Evidence under the paragraph it illustrates: the frame, the caption, the provenance.",

		kind: "figure",
	},

	{
		mark: "39",

		group: "evidence",

		state_name: "NO IMAGE",

		component: "Figure",

		when: "A figure whose evidence is its sentence: the caption prints and no frame is drawn around nothing.",

		kind: "figure",

		variant: "nofigure",
	},

	{
		mark: "40",

		group: "evidence",

		state_name: "CAPTION LONGER THAN THE IMAGE",

		component: "Figure",

		when: "The one case the brief names: the caption is the whole reading, and it never truncates.",

		kind: "figure",

		variant: "long",
	},

	{
		mark: "41",

		group: "evidence",

		state_name: "OPENS",

		component: "Figure",

		when: "A figure that can open: the caption is the summary, the apparatus and the full-size source fold under it.",

		kind: "figure",

		variant: "open",
	},

	{
		mark: "42",

		group: "evidence",

		state_name: "ABSENT",

		component: "Figure",

		when: "Evidence that is not in the build: the tombstone, the word, and the next step under it.",

		kind: "figure",

		state: "unavailable",
	},

	{
		mark: "43",

		group: "evidence",

		state_name: "REST",

		component: "Plate",

		when: "The evidence the record is of, at plate scale: a numbered frame and a channel of manifest facts.",

		kind: "plate",
	},

	{
		mark: "44",

		group: "evidence",

		state_name: "NO CAPTURE",

		component: "Plate",

		when: "The default state of this site's evidence: the frame keeps its ratio and the channel keeps the facts.",

		kind: "plate",

		state: "unavailable",
	},

	{
		mark: "45",

		group: "evidence",

		state_name: "OPENS",

		component: "Plate",

		when: "A plate whose apparatus folds: the claim stays, the reading and the capture link open.",

		kind: "plate",

		variant: "open",
	},

	{
		mark: "46",

		group: "evidence",

		state_name: "BARS",

		component: "Inset",

		when: "A margin that holds a measure figure: three rules whose lengths are their shares, in one ink.",

		kind: "inset",

		variant: "bars",
	},

	{
		mark: "47",

		group: "evidence",

		state_name: "TOTAL",

		component: "Inset",

		when: "A measure figure whose bars add up: the sum prints under them on the divider's rule.",

		kind: "inset",

		variant: "total",
	},

	{
		mark: "48",

		group: "evidence",

		state_name: "NO FIGURE",

		component: "Inset",

		when: "An inset with no figure is a margin note in an inset's frame - the routing table says which block answers.",

		kind: "inset",

		variant: "nofigure",
	},

	{
		mark: "49",

		group: "evidence",

		state_name: "FIGURE ABSENT",

		component: "Inset",

		when: "A figure that is not there: the frame prints the word and the next step, and the claim still prints.",

		kind: "inset",

		variant: "absent",
	},

	/* ─── APPARATUS ────────────────────────────────────────────────────── */

	{
		mark: "50",

		group: "apparatus",

		state_name: "REST",

		component: "Well",

		when: "A command the reader copies: the bar, the recess, the control and the source.",

		kind: "well",
	},

	{
		mark: "51",

		group: "apparatus",

		state_name: "WRAPPED",

		component: "Well",

		when: "A config or an output whose long line is a value: `pre-wrap` with a hanging indent, every character printed.",

		kind: "well",

		variant: "wrap",
	},

	{
		mark: "52",

		group: "apparatus",

		state_name: "WINDOW",

		component: "Well",

		when: "A long command: the first four lines print, the foot names the two hundred and forty, and the copy keeps every line the block holds.",

		kind: "well",

		variant: "window",
	},

	{
		mark: "53",

		group: "apparatus",

		state_name: "NO COMMAND",

		component: "Well",

		when: "A command that is not documented yet: the bar keeps its label and the recess prints the absence.",

		kind: "well",

		state: "empty",

		empty: "This command is not documented yet. The bar prints its label so the reader knows which one is missing, and the recess says why it is empty rather than showing a hole.",
	},

	{
		mark: "54",

		group: "apparatus",

		state_name: "REST",

		component: "Stamp",

		when: "The mark that says the record is what it claims: a mark, a route, its facts, its authority.",

		kind: "stamp",
	},

	{
		mark: "55",

		group: "apparatus",

		state_name: "WITHDRAWN",

		component: "Stamp",

		when: "A mark that was true and is not: it keeps its facts, loses its route and prints the reason.",

		kind: "stamp",

		state: "revoked",
	},

	{
		mark: "56",

		group: "apparatus",

		state_name: "EXPIRING",

		component: "Stamp",

		when: "A mark with a window: `EXPIRES:` prints with its facts, and `→ VERIFY` is where the reader checks it.",

		kind: "stamp",

		variant: "expires",
	},

	{
		mark: "57",

		group: "apparatus",

		state_name: "REST",

		component: "Margin",

		when: "An annotation beside the record: a marker, a claim, a destination and a source.",

		kind: "margin",
	},

	{
		mark: "58",

		group: "apparatus",

		state_name: "NO SOURCE",

		component: "Margin",

		when: "A note whose claim cannot be checked: `SOURCE: UNAVAILABLE` prints - the one place a missing field is printed.",

		kind: "margin",

		variant: "nosource",
	},

	{
		mark: "59",

		group: "apparatus",

		state_name: "TARGET GONE",

		component: "Margin",

		when: "A note whose destination is not in the build: the tombstone with the route it used to have.",

		kind: "margin",

		variant: "gone",
	},

	{
		mark: "60",

		group: "apparatus",

		state_name: "REST",

		component: "Failure",

		when: "One documented way the thing breaks: the word, the symptom, the cause and the next step.",

		kind: "failure",
	},

	{
		mark: "61",

		group: "apparatus",

		state_name: "NO WAY OUT",

		component: "Failure",

		when: "The brief's own case: a failure with no recovery path says `NEXT: UNAVAILABLE` and marks the dead end.",

		kind: "failure",

		variant: "deadend",
	},

	{
		mark: "62",

		group: "apparatus",

		state_name: "WITH A WAY BACK",

		component: "Failure",

		when: "A failure that names its destination: `→` under the next step, and the reproduction folded under it.",

		kind: "failure",

		variant: "recovery",
	},
];

/** The rows of one group, in the order they were written. */
export const InGroup = (Group: Group): readonly Specimen[] =>
	Specimens.filter((Specimen) => Specimen.group === Group);

/** The four groups, with the one line each that says what it holds. */
export const Groups: readonly { key: Group; label: string; note: string }[] = [
	{
		key: "frames",

		label: "/THE FRAMES",

		note: "The blocks that hold a subject: the band, the entry, the opening, the comparison and the disclosure. A frame is read before it is looked at.",
	},

	{
		key: "sequences",

		label: "/THE SEQUENCES",

		note: "The blocks that hold an order: a process, an index and a session. Each one is read in the direction its data runs, and each one has a too-many arm.",
	},

	{
		key: "evidence",

		label: "/THE EVIDENCE",

		note: "The blocks that show something: a figure in a column, a plate at plate scale and an inset in a margin. All three answer what a picture proves, at three distances.",
	},

	{
		key: "apparatus",

		label: "/THE APPARATUS",

		note: "The blocks that let the document prove itself: the command, the mark, the note and the failure. None of them is prose, and none of them is decoration.",
	},
];

/** How many live rows the family prints. */
export const SpecimenCount = Specimens.length;
