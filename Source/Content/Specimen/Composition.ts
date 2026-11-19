/**
 * Composition - the home, brand and dynamic composition family's state matrix,
 * its inventory verdicts, its specimens, and what the exploration changed.
 *
 * ─── WHY THIS FAMILY NEEDS ITS OWN MATRIX ─────────────────────────────────
 * The ledger family is BELIEVED, the display family is READ, the overlay family
 * is DISMISSED, the narrative family is TOLD, the frame family is SAT IN, the
 * reading family is NAVIGATED. This family is COMPOSED: the hero that opens the
 * page, the bands that follow it, the cards that file a record, the manifest that
 * compares artefacts, the marks that authenticate, and the thirty-five
 * `Dynamic/*` adapters that were built to be the schema layer between content and
 * surface.
 *
 * A composition fails differently from a block. A ledger lies, a rail loses the
 * reader, a shell holds too much. A COMPOSITION fails by being asked for a shape
 * it was not drawn for: a hero whose evidence has not been photographed, a proof
 * band that can stand behind three claims instead of six, a legend of nine tiles
 * in a narrow card, a seal asked to hold at sixteen pixels and at two hundred and
 * forty. Every one of those is a column below, and every one of them found a
 * defect that no page had yet revealed - because no page had yet asked.
 *
 * ─── THE UNCOMFORTABLE INVENTORY ─────────────────────────────────────────
 * The brief asked for it by name: "Inventory the `Dynamic/*` components first and
 * say which are live, which are orphaned, and which are duplicates of a
 * `Record/*` block (the answer will be uncomfortable; report it rather than
 * hiding it)."
 *
 * It is uncomfortable. Of thirty-five `Dynamic/*` parts:
 *
 *   25  are LIVE   - a page or a live block mounts them;
 *    6  are LAB    - the only thing that mounts them is this specimen sheet;
 *    4  are ORPHANED - nothing in the tree imports them at all;
 *   12  duplicate a block that already exists, in whole or in part.
 *
 * `Verdicts` below states each one with the importers it has, and asks for a
 * decision rather than proposing a deletion. Nothing in this card removed a file:
 * a file with no importer is a decision the owner has not made yet, and the
 * additive law does not authorise a worker to make it.
 *
 * ─── WHAT THE FAMILY'S OWN BRIEF ASKED FOR ───────────────────────────────
 * "Explore the compositions: a hero with no evidence image, a proof band with
 * three records, a stack of nine tiles in a narrow card, a brand mark at 16px and
 * at 240px. Improve the survivors; report the orphans for a decision instead of
 * deleting them."
 *
 * The seven compositions are columns: the five the brief named by hand -
 * `NO PLATE`, `THREE`, `NINE`, `AT 16` and `AT 240`, the mark at two sizes
 * because each found a different defect - plus a band with one card and a
 * record with no action. The improvements are entries in `Improvements`, each
 * with the cell behind it; the orphans are `Verdicts`.
 *
 * ─── NOTHING HERE IS A TYPED FIGURE ──────────────────────────────────────
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

	/** The column head, in the sheet's register: `NO PLATE`, `AT 16`. */
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
 * shapes, because they are what a composition is asked to hold; then seven
 * compositions, because five of them are the ones this family's brief named by
 * hand and the other two - a band with one card, a record with no action - are
 * the ones a composition must survive without; then two contexts, because they
 * are the ones a designer forgets - the band the block is composed inside and
 * the medium it is printed on.
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

	{ key: "many", label: "MANY", ask: "twelve or ninety", group: "shape" },

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
		key: "noplate",

		label: "NO PLATE",

		ask: "a hero with no evidence",

		group: "composition",
	},

	{
		key: "three",

		label: "THREE",

		ask: "a proof band of three",

		group: "composition",
	},

	{
		key: "nine",

		label: "NINE",

		ask: "nine tiles, narrow",

		group: "composition",
	},

	{ key: "xs", label: "AT 16", ask: "a mark at 16px", group: "composition" },

	{
		key: "xl",

		label: "AT 240",

		ask: "a mark at 240px",

		group: "composition",
	},

	{
		key: "lone",

		label: "LONE",

		ask: "a band with one card",

		group: "composition",
	},

	{
		key: "noaction",

		label: "NO ACTION",

		ask: "without its action",

		group: "composition",
	},

	{
		key: "inband",

		label: "IN A BAND",

		ask: "inside a chapter",

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
const B = (note?: string): Cell =>
	note === undefined
		? { disposition: "built" }
		: { disposition: "built", note };

/** A cell that cannot exist, with the reason. A reason is a fact, not an apology. */
const X = (reason: string): Cell => ({ disposition: "na", reason });

/** One component's row: its name, its file, and the cells it overrides. */
export interface Row {
	/** `FEATUREBAND` - the row's name in the sheet's register. */
	readonly name: string;

	/** The file the part is, relative to `Source/`, upper case. */
	readonly file: string;

	/** One line: what the part is, in the sheet's voice. */
	readonly note: string;

	/**
	 * The cells this row overrides. Everything not listed is `BUILT`, because a
	 * family that renders its own happy state everywhere should not have to say
	 * so fourteen hundred times - and a default of `built` makes every exception a
	 * sentence someone had to write.
	 *
	 * The overrides are usually a BASE plus the row's own differences: a base is
	 * the written reason a CLASS of parts shares (a printed block is not a
	 * control, a mark has no text state), and spreading it is not a shortcut -
	 * it is the same sentence in one place instead of fifty-eight. The matrix
	 * prints each base's reason in full for every cell that takes it, so a
	 * reader never meets an abbreviation.
	 */
	readonly cells: Readonly<Record<string, Cell>>;
}

/** One row's overrides, as a mutable map a base can be spread into. */
type Cells = Record<string, Cell>;

/* ─── THE BASES ──────────────────────────────────────────────────────────── */

/**
 * A server-rendered block of markup: it ships no JavaScript, holds no input, and
 * prints what it was given.
 *
 * The five reasons a base writes are the five states a printed block cannot have,
 * and each says WHY rather than "not applicable": a build-time block has no
 * loading state because its content was resolved before the page existed; a
 * block with no read has no error state because there was nothing to fail.
 */
const Printed = (what: string, why: string): Cells => ({
	loading: X(
		`A ${what} is printed at build time - ${why} - so there is no state in which the block exists and its content has not arrived.`,
	),

	error: X(
		`A ${what} reads nothing at render time: there is no read to fail, and a failed route is stated by the shell that owns it (\`ShellState\`), not by a block that was never asked for data.`,
	),

	stale: X(
		`A ${what} carries no as-of of its own: an age belongs to the fact it prints, and a block that invented one would be the one figure on the page with no source.`,
	),

	disabled: X(
		`A ${what} is not a control: it ships no script and holds no input, so there is no control state for \`disabled\` to be the absence of.`,
	),

	readonly: X(
		`A ${what} is read-only by construction - it is markup and CSS with nothing to edit - so \`read-only\` names no arm this block could have.`,
	),
});

/**
 * A printed block that is ONE object rather than a set: it cannot be asked for a
 * set of one or a set of ninety, because it is not a set at all.
 */
const Leaf = (what: string, set: string): Cells => ({
	...Printed(
		what,

		"it renders the props it is handed and nothing is resolved at render time",
	),

	one: X(
		`A ${what} is one object by definition; a set of one is ${set}, and a block that answered both would be two blocks with one name.`,
	),

	many: X(
		`A ${what} is one object by definition; a set of ninety is ${set}, and the composition that holds many is the band, not the part.`,
	),
});

/**
 * A mark: a seal, a crosshair, an arrow, a glyph. It has no text state, no empty
 * state and no set - it is one drawn form - so almost every condition is a
 * reason, and the three that are not are the three a mark is actually asked.
 */
const Mark = (what: string): Cells => ({
	...Leaf(what, "the strip or the row that repeats it"),

	empty: X(
		`A ${what} is a drawn form: it has no content to be empty of, and the grammar's fallback for a thing that is not here is the seal's own \`◎\` field, not an empty mark.`,
	),

	partial: X(
		`A ${what} has no facts to be partial about: it is one form in one ink, and a half-drawn mark is a mark that failed to load, which is the \`absent\` arm of the plate that would hold it.`,
	),

	dense: X(
		`A ${what} has no density: it is drawn at a ladder step, and the tight arm of a mark is a smaller step, which is the \`AT 16\` column rather than a second layout.`,
	),

	long: X(
		`A ${what} carries no text, so there is no line to run past a column - the longest thing it can hold is its own device.`,
	),

	incard: X(
		`A ${what} is not composed inside a white insert: a mark on a card is the card's, printed at the card's own step, and a mark that re-composed itself for the surface would be a second mark.`,
	),

	noplate: X(
		`A ${what} is not a composition: it has no evidence panel to be missing, so the column asks a question this row cannot answer.`,
	),

	three: X(
		`A ${what} is not a set: three of them is the row or the strip that repeats it, and the count belongs there.`,
	),

	nine: X(
		`A ${what} is not a tile: nine tiles is the strip's composition, and a mark inside a tile is printed at \`xs\`, which is the \`AT 16\` column.`,
	),

	lone: X(
		`A ${what} is not a card: a band with one card is the band's composition, and a mark in it is the same mark.`,
	),

	noaction: X(
		`A ${what} is not a control and never carries an action, so there is none to remove.`,
	),

	inband: B(
		"a mark is printed inside whatever holds it; the band adds no rule of its own",
	),
});

/**
 * A hydrated island: it has a loading state, an error state and a set, because
 * its content arrives at run time rather than at build time.
 */
const Island = (what: string, why: string): Cells => ({
	stale: X(
		`A ${what} carries no as-of: ${why}, and an age it invented would be the one figure on the page with no source.`,
	),

	dense: X(
		`A ${what} has no tight arm of its own: its density is the page's spacing ladder, and a component with a private density scale is a second system.`,
	),

	incard: X(
		`A ${what} is a surface rather than a record: it is composed on the field, and a card inside a card is the one composition the identity forbids.`,
	),
});

/**
 * A form control: an input, a checkbox, a button, a form. Every control state is
 * real, and the shapes are the ones it cannot be.
 */
const Control = (what: string): Cells => ({
	empty: B(
		"the control renders with an empty value, its label above it and its placeholder in it",
	),

	loading: B(
		"the control is disabled and its label states the work in progress; there is no spinner inside a field",
	),

	partial: B(
		"a field whose value the caller could not resolve prints `UNAVAILABLE` as its value, not a blank",
	),

	error: B(
		"`Error` prints under the field, in the vocabulary, with the control's own `aria-invalid` and `aria-describedby`",
	),

	stale: X(
		`A ${what} is a control, not a fact: an age belongs to the value a reader is looking at, and a control that printed one would be printing a record inside a field.`,
	),

	dense: B(
		"the dense arm tightens the row's air and keeps the field's height",
	),

	one: X(
		`A ${what} is one control: a set of one is a form, and the form is the block that holds it.`,
	),

	many: X(
		`A ${what} is one control: a set of ninety is a form or a register, and a control repeated ninety times with no form around it is not a composition.`,
	),

	long: B(
		"the value scrolls inside the field and the label wraps above it; neither widens the column",
	),

	narrow: B(
		"the field takes its column's width and its label wraps; the control has no minimum of its own",
	),

	wide: B(
		"the field takes its band's width up to its own measure, so a wide band does not make a 1200px input",
	),

	noplate: X(
		`A ${what} is not a composition: it has no evidence panel and no pair, so the column asks a question this row cannot answer.`,
	),

	three: X(
		`A ${what} is not a set: three controls are a form's rows, and the count belongs to the form.`,
	),

	nine: X(
		`A ${what} is not a tile: nine tiles is the strip's composition, not a control's.`,
	),

	lone: X(
		`A ${what} is not a card: a band with one card is the band's composition.`,
	),

	inband: B(
		"the control sits in its form, the form in the band; neither re-draws the other",
	),
});

/* ─── THE ROWS ───────────────────────────────────────────────────────────── */

/**
 * The fifty-eight components, in the order a page meets them: the twelve
 * homepage parts, the eleven brand parts, and the thirty-five `Dynamic/*`
 * adapters in the order their surfaces appear.
 *
 * Every row's overrides are reasons or notes. A row with no overrides would be a
 * part that survives every combination, and no part does.
 */
export const Rows: readonly Row[] = [
	/* ── THE HOMEPAGE'S TWELVE ───────────────────────────────────────────── */

	{
		name: "BAND",

		file: "COMPONENT/HOME/BAND.ASTRO",

		note: "One page band's shell: the record head (`# SERIES_INDEX` / kicker / heading / standfirst / stamp) and the body below it.",

		cells: {
			...Printed(
				"band shell",

				"the head and the body are server-rendered and the band holds no island of its own",
			),

			empty: B(
				"a band handed no body prints its head and an empty body - which is a head with nothing under it, and the reason every band in this family supplies a body",
			),

			partial: B(
				"a band with a heading and no standfirst prints the head without the sentence; the stamp slot is independent of both",
			),

			dense: B(
				"the interval ladder's `beat` is the tight rung, and `rest`/`break`/`turn` are the three that open",
			),

			one: B("a band is one chapter; its body is what holds a set"),

			many: B(
				"a band's body scrolls the page, not itself: ninety rows make a longer band, which is the correct answer for a chapter",
			),

			long: B(
				"the heading is set at the L tier with `text-wrap: balance`; a long kicker wraps under its marker rather than widening it",
			),

			narrow: B(
				"below `md` the 5/7 head collapses to one column, the claim above its qualifier",
			),

			wide: B(
				"the body takes the page's measure; the head's marker rules to the right margin at every width",
			),

			incard: X(
				"A band is never a card: the identity's card rule is one artifact one card, and a band is the space between artifacts. A band inside a card would print a chapter inside a record.",
			),

			noplate: X(
				"A band has no evidence panel: the pair belongs to the hero, and the band is the chapter after it.",
			),

			three: B(
				"the body is a slot; three records is the slot's composition, which is `FEATUREBAND`'s cell",
			),

			nine: B(
				"the body is a slot; nine tiles is the slot's composition, which is the stack's cell",
			),

			xs: X(
				"A band prints no mark at a step: the seal is the card's, and the band's own marker is type.",
			),

			xl: X(
				"A band prints no seal at all: the 240px arm belongs to the sheet's own study of the mark.",
			),

			lone: B(
				"a band with one card is a band whose body holds one artifact - the composition the roadmap prints with one release state",
			),

			noaction: B("a band carries no action of its own; its cards do"),

			inband: X(
				"A band IS the band: a band inside a band is a chapter inside a chapter, and the interval ladder has no rung for it.",
			),

			print: B(
				"the band's head prints; its interval becomes a page break (`Print/_Index.scss`)",
			),
		},
	},

	{
		name: "ARROW",

		file: "COMPONENT/HOME/ARROW.ASTRO",

		note: "The external-link mark that follows a record's own name: `aria-hidden`, because the link's accessible name already says where it goes.",

		cells: {
			...Mark("link mark"),

			rest: B(
				"drawn at the link's own ink, `currentColor`, so it takes the ink of the name it follows",
			),

			xs: B(
				"the arrow is set at the text's own size and inherits it; at a chip's 16px step it is a glyph in a sentence, which is what it is",
			),

			xl: X(
				"A link mark is never the largest object on a surface: it is a suffix to a name, and a 240px arrow would be a signpost.",
			),

			print: B(
				"the arrow prints; the underline the global rule draws beside it is the medium's own",
			),
		},
	},

	{
		name: "RECORDANATOMY",

		file: "COMPONENT/HOME/RECORDANATOMY.ASTRO",

		note: "The middle of every homepage record: the two containment stamps, the route over its service line, the status and the four-row ledger, with two slots for the two families' differences.",

		cells: {
			...Printed(
				"record middle",

				"every field it prints is resolved from the card's own data at build time",
			),

			empty: B(
				"a card with no stamps prints no stamp block at all - the block is conditional, so an empty set is an absent block rather than an empty box",
			),

			partial: B(
				"a card with no route prints the service line without it; a card with no status prints the ledger alone",
			),

			dense: B(
				"the card's density is the band's: the six-record matrix is the tight arm and the element wall is the loose one",
			),

			one: X(
				"A record middle is one record's middle: it is not a set, and the set is the band that repeats it.",
			),

			many: X(
				"A record middle is one record's middle: ninety of them is the wall, which is `ARCHITECTUREBAND`'s cell.",
			),

			long: B(
				"a long value wraps under its key in the ledger; the key column is a `ch` measure, not a guess",
			),

			narrow: B(
				"in a narrow column the ledger's two columns collapse to key-over-value, which is the block's own responsive arm",
			),

			wide: B(
				"a wide band gives the ledger one line per fact; the block has no measure of its own",
			),

			incard: B(
				"the middle is printed inside the card its host owns, which is the only surface a record middle has",
			),

			noplate: X(
				"A record middle has no evidence panel: the plate is the pair's other half, not the card's.",
			),

			three: X(
				"A record middle is one record: three of them is the band's count, not this block's.",
			),

			nine: X(
				"A record middle is one record: nine tiles is the stack's composition.",
			),

			xs: B(
				"the card's seal is printed at `s`; the middle prints no mark of its own beyond the stamps' brackets",
			),

			xl: X(
				"A record middle prints no seal: the seal is the card's head, and the 240px arm is the sheet's study.",
			),

			lone: B(
				"a lone card is a card with one record middle in it - the composition the 404 and the portal print",
			),

			noaction: B(
				"the middle prints no action: the action is the host card's, and a record with no action is the card without its slot filled",
			),

			inband: B(
				"the middle is always inside a card inside a band; it names neither",
			),
		},
	},

	{
		name: "FEATUREBAND",

		file: "COMPONENT/HOME/FEATUREBAND.ASTRO",

		note: "`# OBSERVATION_01`: the element records that carry the claim, as one seam matrix, with the specimen observation filed under it.",

		cells: {
			...Printed(
				"proof band",

				"the six records, their tints and their ledgers are all resolved at build time",
			),

			empty: B(
				"`cards` of none prints `RECORDS: UNAVAILABLE` and one sentence where the matrix would be - added with this family, because an empty grid is a layout that failed quietly",
			),

			partial: B(
				"a record whose own fact is unknown prints `UNAVAILABLE` in its ledger row and keeps the cell",
			),

			dense: B(
				"the matrix's seam IS the tight arm: six cells at 1px, two across from 801px",
			),

			one: B(
				"a set of one prints one cell across the full seam - the ceiling is one, so a one-track row is the row's whole width",
			),

			many: B(
				"a set of twelve prints six rows of two; the band has no cap, the seam holds at any count, and the ceiling stays three",
			),

			long: B(
				"a card's title wraps inside its cell; the cell's width is the row's, and the card's minimum is the 23rem one record needs",
			),

			narrow: B(
				"below 801px the cells stack, take a real gap and their border back - a single column of tinted cells 1px apart is one tinted block, not a matrix",
			),

			wide: B(
				"the matrix takes the band's measure - 67rem inside the 72rem inner - so it is exactly as wide as the head above it, and a wider band would widen both",
			),

			incard: X(
				"A band is never a card: the matrix is the artifact and each cell is one of its records, so a card around the matrix would be a card around six cards.",
			),

			noplate: X(
				"A proof band has no evidence panel: its evidence is the six records themselves.",
			),

			three: B(
				"`cards` of three prints 2 + 1 with the lone record across the whole seam, and the subset's figure `# RECORDS / 03` under the grid - the short last row is answered by the row's own growth, not by a span rule",
			),

			nine: X(
				"A proof band files records, not tiles: nine tiles is the stack's composition.",
			),

			xs: B(
				"a cell's seal is printed at `s`, which is the card-head step; the 16px arm is a chip's",
			),

			xl: X(
				"A proof band prints no 240px seal: the plate's largest object is the matrix itself.",
			),

			lone: B(
				"a set of one is a band with one card - the arm the roadmap prints when a project has one release state",
			),

			noaction: B(
				"the band's cards carry their own links; the band itself has no action to remove",
			),

			inband: B(
				"the band IS a chapter: it wears `Band` and the page's interval ladder",
			),

			print: B(
				"the seam prints as a 1px rule; the tints are dropped to paper ink by the print layer",
			),
		},
	},

	{
		name: "FEATURECARD",

		file: "COMPONENT/HOME/FEATURECARD.ASTRO",

		note: "One record of the proof matrix: its marker, its engraved seal, its stamps, its route, its name as the link out, its status and its four-row ledger, on the element's own tint.",

		cells: {
			...Leaf("record card", "the matrix that holds it (`FEATUREBAND`)"),

			empty: B(
				"a card whose record carries no stamps prints the anatomy without them; the card is never an empty box",
			),

			partial: B(
				"a card with an unknown fact prints `UNAVAILABLE` in that row and keeps the row",
			),

			dense: B(
				"the card takes the matrix's seam, which is the tight arm; there is no second density inside a cell",
			),

			long: B(
				"the name wraps and the seal stays in its marker row; the link's arrow is a suffix and never breaks to its own line",
			),

			narrow: B(
				"in a narrow column the card is one column wide and its ledger collapses to key-over-value",
			),

			wide: B(
				"a wide cell does not stretch the card's type: the measure is the card's, and the fill takes the width",
			),

			incard: B(
				"the card IS a Jelly surface; its content is a record inside it, which is the one composition the identity allows",
			),

			noplate: X(
				"A card has no evidence panel: the plate is the hero's other half.",
			),

			three: B(
				"three of them is the proof band's cell, and the card's own layout is unchanged by the count",
			),

			nine: X(
				"Nine tiles is the stack's composition; a record card is not a tile.",
			),

			xs: B(
				"the card's seal is `s` (32px); a card at a chip's step is the ledger's `xs` arm, not this card's",
			),

			xl: X(
				"A card prints no 240px seal: at that size the seal is the artifact, and a card is already one.",
			),

			lone: B(
				"a lone card prints exactly as a cell of six: the card has no knowledge of its siblings",
			),

			noaction: B(
				"the card's only action is its name's link; without it the name prints as plain text and the card still reads",
			),

			inband: B(
				"the card is composed by the band; it names no band of its own",
			),

			print: B(
				"the tint drops to paper, the seal prints, the link resolves to its target",
			),
		},
	},

	{
		name: "ELEMENTCARD",

		file: "COMPONENT/HOME/ELEMENTCARD.ASTRO",

		note: "One of the fifteen element records in the wall: the feature card plus its name row, its role chips, its body and its working register.",

		cells: {
			...Leaf(
				"element card",

				"the wall that holds it (`ARCHITECTUREBAND`)",
			),

			empty: B(
				"a card with no chips prints no chip row and a card with no register prints `NO WORKING IS RECORDED` - the two conditional blocks the card already carries",
			),

			partial: B(
				"a register row whose value is unknown prints `UNAVAILABLE` with its `quiet` tone",
			),

			dense: B(
				"`data-depth` carries the card's two arms: `plate` prints the trace under the register, `record` does not - the wall is a page with four annotated entries rather than fifteen equal cards",
			),

			long: B(
				"a long element name wraps under its glyph; the source arrow is `aria-label`ed and stays in the row",
			),

			narrow: B(
				"below `lg` the twelve-column masonry collapses to two columns and the spans are ignored, which is the wall's own responsive arm",
			),

			wide: B(
				"a wide band gives the masonry its twelve columns and each card takes its `--masonry-col` span",
			),

			incard: B("the card IS a Jelly surface"),

			noplate: X("A card has no evidence panel."),

			three: B(
				"three of them is a wall of three, and the masonry's spans make it a ragged row rather than a grid",
			),

			nine: B(
				"nine tiles in a narrow card is the STACK's composition, not this card's; nine element cards is a wall of nine, which the masonry already prints",
			),

			xs: B(
				"the card's seal is `s`, and the one element whose record carries no device prints the neutral roundel at the same step",
			),

			xl: X("A card prints no 240px seal."),

			lone: B(
				"a wall of one prints one card at its own span, and the ragged edge is the same edge",
			),

			noaction: B(
				"the name's link and the source arrow are the card's actions; without a source the name prints as text and the arrow is absent",
			),

			inband: B("the wall is the band's body"),

			print: B(
				"the tint drops to paper; the trace prints as a numbered list",
			),
		},
	},

	{
		name: "ARCHITECTUREBAND",

		file: "COMPONENT/HOME/ARCHITECTUREBAND.ASTRO",

		note: "`# CLASSIFICATION_01`: all fifteen element records as one ragged wall - twelve columns from `lg`, two below it, one below `md`.",

		cells: {
			...Printed(
				"element wall",

				"the fifteen records and their spans are resolved at build time",
			),

			empty: B(
				"an empty set prints the band's head and no wall; the wall has no empty arm of its own because the fifteen are the content module's own array",
			),

			partial: B(
				"a card with an unknown fact keeps its cell and prints `UNAVAILABLE` in it",
			),

			dense: B(
				"the wall IS the tight arm of the page: fifteen cells with the seam between them",
			),

			one: B(
				"a wall of one prints one card; the masonry's spans make the ragged edge a single edge",
			),

			many: B(
				"the fifteen are the set; a sixteenth joins the wall without a layout change",
			),

			long: B(
				"the spans are values (`--masonry-col`), so a long name changes the card's height, not the wall's columns",
			),

			narrow: B(
				"below `lg` the wall is two columns and the spans are ignored",
			),

			wide: B(
				"twelve columns at `lg` and up; the ragged edge is the point of the artifact",
			),

			incard: X("A band is never a card."),

			noplate: X("The wall has no evidence panel."),

			three: B(
				"three cards make a ragged row of three - the wall does not require fifteen",
			),

			nine: X(
				"Nine tiles is the stack's composition; the wall is cards, not tiles.",
			),

			xs: B("each card prints its seal at `s`"),

			xl: X("The wall prints no 240px seal."),

			lone: B("a wall of one is a band with one card"),

			noaction: B("the wall's cards carry their own links"),

			inband: B("the wall IS a chapter"),

			print: B(
				"the wall prints as a column of cards; the masonry collapses to one column on paper",
			),
		},
	},

	{
		name: "ROADMAPBAND",

		file: "COMPONENT/HOME/ROADMAPBAND.ASTRO",

		note: "`# CONDITIONS_01`: the release states as ONE plate divided by the hero's hairline gutter, not two cards side by side.",

		cells: {
			...Printed(
				"release manifest",

				"the two states and their facts are resolved at build time",
			),

			empty: B(
				"no release state prints the plate's head and an empty plate - the band has no empty arm because the content module always carries two states",
			),

			partial: B(
				"a state with an unknown fact prints `UNAVAILABLE` in its row",
			),

			dense: B(
				"the plate's two columns are the tight arm: one plate, two states, one hairline",
			),

			one: B(
				"a plate of one prints one state across the whole measure; the gutter is drawn only between states (`Index > 0`)",
			),

			many: B(
				"a third state joins the plate as a third column; the gutter is drawn between each pair",
			),

			long: B(
				"a long element name wraps inside its list row; the badge keeps its `nowrap` and the row wraps",
			),

			narrow: B(
				"below `md` the plate's columns stack and the gutter becomes a horizontal rule",
			),

			wide: B("the plate caps at its own measure and centres"),

			incard: X(
				"A band is never a card: the plate IS the card, and a card around it would be two.",
			),

			noplate: X("The release manifest has no evidence panel."),

			three: B(
				"three release states print three columns; the manifest is the artifact that holds a set of states",
			),

			nine: X("Nine tiles is the stack's composition."),

			xs: B(
				"the element badges inside the release rows are the chip-scale arm, and their seal-less names are the grammar's `jelly-badge`",
			),

			xl: X("The manifest prints no 240px seal."),

			lone: B(
				"a manifest of one state is the arm the roadmap prints on a project with one release - and it is why the plate's gutter is conditional",
			),

			noaction: B(
				"`# RELEASE_02` carries its destination as a route line rather than a button, which is the no-action arm already in the band",
			),

			inband: B("the manifest IS a chapter"),

			print: B(
				"the two columns print side by side on paper; the gutter prints as a rule",
			),
		},
	},

	{
		name: "RELEASECARD",

		file: "COMPONENT/HOME/RELEASECARD.ASTRO",

		note: "One release state, as a column of the manifest plate: a stamped head, one action, its name, its elements and its six manifest rows.",

		cells: {
			...Leaf(
				"release state",

				"the manifest that holds it (`ROADMAPBAND`)",
			),

			empty: B(
				"a state with no elements prints its `Elements` label and no list; a state with no manifest rows prints no list - both blocks are conditional",
			),

			partial: B(
				"an element whose replacement is unknown prints its `Before` line with no badge and no `After`",
			),

			dense: B(
				"the state's own density is the plate's: two columns, one hairline, no inner cards",
			),

			long: B(
				"the state's name wraps at the L tier; the stamp lines wrap under their marker",
			),

			narrow: B(
				"in a narrow column the state's two lists read one under the other and the action takes the full width",
			),

			wide: B(
				"a wide column does not widen the state's type; the lists take the column's measure",
			),

			incard: X(
				"A release state is a COLUMN of the manifest plate, not a card of its own: the band owns the white surface, and a card inside it would be the one composition the identity forbids.",
			),

			noplate: X("A release state has no evidence panel."),

			three: B("three states are three columns of the plate"),

			nine: X("Nine tiles is the stack's composition."),

			xs: B(
				"the element names inside a state are `jelly-badge`s at the chip scale, which is the family's 16px arm",
			),

			xl: X("A release state prints no 240px seal."),

			lone: B(
				"a lone state takes the whole plate and its action stays one action",
			),

			noaction: B(
				"`# RELEASE_02` is the no-action arm already in the band: a route line at the accent instead of a filled button, which is the `emphasis-expressive` budget's one action per artifact",
			),

			inband: B("the state is inside the band's plate"),

			print: B("the state prints; its badges print as bracketed words"),
		},
	},

	{
		name: "PLATFORMBAND",

		file: "COMPONENT/HOME/PLATFORMBAND.ASTRO",

		note: "`# ACTION_01`: the platform artefacts as one white manifest - one row per platform, a hairline between rows, one action per row.",

		cells: {
			...Printed(
				"download manifest",

				"the three rows and their facts are resolved at build time",
			),

			empty: B(
				"`cards` of none prints `ARTIFACTS: UNAVAILABLE` and the sentence that says builds are from source - added with this family, because an empty plate on a white surface reads as lost data rather than as nothing to ship",
			),

			partial: B(
				"a row whose checksum is unknown prints `UNAVAILABLE` and its `NOTE:` row says why - the three absent rows the band already carries",
			),

			dense: B(
				"the row is two lines, not eight columns: the identity on the first, the facts across the second",
			),

			one: B(
				"one artefact prints one row and no divider (`+ .home-platform` draws the rule only between rows)",
			),

			many: B(
				"a fourth platform joins the plate as a fourth row; the divider repeats",
			),

			long: B(
				"a long platform name wraps in its identity column; the facts wrap across the second line",
			),

			narrow: B(
				"below `md` the row is one column: identity, then facts, then status and action",
			),

			wide: B("the plate caps at 72rem and centres"),

			incard: X("A band is never a card: the plate IS the card."),

			noplate: X("The download manifest has no evidence panel."),

			three: B(
				"three artefacts are the plate's own count, and the rows are comparable at a glance because the identity takes its own column from `md`",
			),

			nine: X(
				"Nine tiles is the stack's composition; the manifest's unit is a row, not a tile.",
			),

			xs: B(
				"the row's platform glyph is printed at the glyph step (18px), which is the ladder's `5`",
			),

			xl: X("The manifest prints no 240px seal."),

			lone: B(
				"a manifest of one is a plate of one row - the arm the family's brief named, and the shape every first release has",
			),

			noaction: B(
				"a row whose artefact is not published prints its status without a button, and the row still reads as a fact",
			),

			inband: B("the manifest IS a chapter"),

			print: B("the rows print; the actions resolve to their targets"),
		},
	},

	{
		name: "PLATFORMCARD",

		file: "COMPONENT/HOME/PLATFORMCARD.ASTRO",

		note: "One artefact row of the download manifest: its marker, its name in the platform's own ink, its architecture, seven facts, a note, a status and one action.",

		cells: {
			...Leaf(
				"artefact row",

				"the manifest that holds it (`PLATFORMBAND`)",
			),

			empty: B(
				"a row with no note prints no note; the seven facts are the content module's own and a row is never drawn with fewer",
			),

			partial: B(
				"an unknown fact prints `UNAVAILABLE` and the row's `NOTE:` says why",
			),

			dense: B(
				"the row's density is the plate's: seven facts on one wrapping line",
			),

			long: B(
				"a long checksum wraps under its key; the ledger's keys are `nowrap` and its values wrap",
			),

			narrow: B(
				"below `md` the row is one column and the facts wrap into as many lines as they need",
			),

			wide: B(
				"a wide row gives the facts one line; the identity column is 23rem and does not grow",
			),

			incard: X(
				"An artefact row is a row of the manifest plate; a card around it would be a card inside a card.",
			),

			noplate: X("An artefact row has no evidence panel."),

			three: B("three rows are the plate's count"),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the row's glyph is 18px, the ladder's glyph step"),

			xl: X("An artefact row prints no seal."),

			lone: B("a lone row is a plate of one"),

			noaction: B(
				"the action is a Jelly button inside its own anchor; without an href the row prints its status alone and still reads",
			),

			inband: B("the row is inside the plate inside the band"),

			print: B("the row prints; the action resolves to its target"),
		},
	},

	{
		name: "WORKINGBAND",

		file: "COMPONENT/HOME/WORKINGBAND.ASTRO",

		note: "`# METHOD_01`: the build's six-stage trace at 7 beside the release register at 5, with the three documented failures ruled under both.",

		cells: {
			...Printed(
				"method band",

				"the trace, the register and the three failures are content-module arrays resolved at build time",
			),

			empty: B(
				"an empty register prints `THE RELEASE RECORD IS NOT WRITTEN YET` - the ledger's own empty arm, which the band already wires",
			),

			partial: B(
				"a register row whose value is unknown prints `UNAVAILABLE` and keeps its row",
			),

			dense: B(
				"the band's two densities ARE the composition: a spacious trace at 7 and a tight register at 5, which is the page's first split read at two densities on purpose",
			),

			one: B(
				"a trace of one step prints one line and the register takes the rest of the measure",
			),

			many: B(
				"a trace of twelve steps grows the band; the register beside it does not stretch",
			),

			long: B(
				"a step's note wraps under its path; the trace's two columns are `ch` measures",
			),

			narrow: B(
				"below `lg` the 7/5 split stacks and the failures become one column",
			),

			wide: B(
				"the band's measure is the page's; the split keeps its 7/5 ratio",
			),

			incard: X("A band is never a card."),

			noplate: X("The method band has no evidence panel."),

			three: B(
				"three failures are the band's own count, ruled across the whole measure under both columns",
			),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the trace's station marks are the ladder's tick steps"),

			xl: X("The method band prints no 240px seal."),

			lone: B(
				"one failure prints one failure; the strip is a wrapping row and does not require three",
			),

			noaction: B(
				"the band has no action: its trace's `MANUAL` row is a route, and the band is read rather than used",
			),

			inband: B("the band IS a chapter"),

			print: B(
				"the trace and the register print side by side; the failures print as a list",
			),
		},
	},

	/* ── THE BRAND'S ELEVEN ──────────────────────────────────────────────── */

	{
		name: "FIELDRECORD",

		file: "COMPONENT/BRAND/FIELDRECORD.ASTRO",

		note: "The canonical single-card record template: index, seal, stamps, route, program, the blank interval, the title, the status, the metadata and one action.",

		cells: {
			...Leaf("record template", "the grid or band that repeats it"),

			empty: B(
				"a record with no stamp, no route, no program, no relation, no metadata and no action prints its index, its seal, its title and its status - every block is conditional, so an empty record is a short record, not a broken one",
			),

			partial: B(
				"a record whose status is `unavailable` prints the vocabulary's word and the tone's quiet ink",
			),

			dense: B(
				"the card's inset is two custom properties; a host that needs a tighter card sets them, and the record's anatomy does not change",
			),

			long: B(
				"the title is the L tier and wraps; the blank interval above it absorbs the difference, which is what the interval is for",
			),

			narrow: B(
				"in a narrow column the card is one column and the metadata reads key-over-value",
			),

			wide: B(
				"a wide host gives the card more inset, not a wider measure; the record's type is the card's",
			),

			incard: B(
				"the template IS a card: `FieldRecordDataCard` is its frame, and the record is the content inside it",
			),

			noplate: X(
				"A single record card has no evidence panel: the pair is the hero's composition, and this template is the card alone.",
			),

			three: B(
				"three of them is a row of three cards; the template has no knowledge of its siblings",
			),

			nine: X(
				"Nine tiles is the stack's composition; a record card is not a tile.",
			),

			xs: B(
				"the card's seal is the template's own step (`l` by default, `s` at a card head)",
			),

			xl: B(
				"the seal can be printed at 240px by a host that wants the mark as the artifact - which is the sheet's study, and the reason the ladder gained the step",
			),

			lone: B(
				"a lone record card is the 404's and the portal's composition",
			),

			noaction: B(
				"`record.Action` is optional: a record with no action prints no action block and the card closes on its metadata",
			),

			inband: B("the template is composed by whatever holds it"),

			print: B("the card prints as a white insert with its corner marks"),
		},
	},

	{
		name: "FIELDRECORDDATACARD",

		file: "COMPONENT/BRAND/FIELDRECORDDATACARD.ASTRO",

		note: "The frame every field record is printed in: a white card, picture-frame corner marks, and one padded body that takes a slot.",

		cells: {
			...Printed(
				"card frame",

				"it renders a slot and two custom properties, and resolves nothing",
			),

			empty: B(
				"an empty slot prints an empty frame - a white card with its corner marks and nothing in it, which is the frame doing exactly what a frame does",
			),

			partial: X(
				"A card frame prints no facts, so there is no fact for it to be partial about: the slot's content is the host's, and a frame that stated an absence would be stating something it does not know.",
			),

			dense: B(
				"`--card-padding-block` and `--card-padding-inline` are the frame's two published numbers; a tighter host sets them and the frame does not change",
			),

			one: X(
				"A card frame is one frame: a set of one is the host's row, not the frame's.",
			),

			many: X(
				"A card frame is one frame: ninety of them is a grid, which is the host's composition.",
			),

			long: B(
				"the body grows; the corner marks are anchored to the frame's corners and stay at the top as it grows",
			),

			narrow: B(
				"the frame takes its column's width and its padding is unchanged",
			),

			wide: B(
				"the frame takes its host's width; it has no maximum of its own",
			),

			incard: X(
				"A card frame inside a card is the one composition the identity forbids.",
			),

			noplate: X("A card frame has no evidence panel."),

			three: X(
				"A card frame is one frame: three of them is the row that holds them.",
			),

			nine: X("Nine tiles is the stack's composition."),

			xs: X(
				"A card frame prints no mark: the corner marks are the frame's, and they are not the seal's ladder.",
			),

			xl: X("A card frame prints no seal."),

			lone: B("a lone frame is a card of one"),

			noaction: B(
				"the frame has no action: the record inside it owns one",
			),

			inband: B("the frame is composed by its host"),
		},
	},

	{
		name: "FIELDRECORDINDEX",

		file: "COMPONENT/BRAND/FIELDRECORDINDEX.ASTRO",

		note: "The record's own marker, printed as `# MARKER` at field weight: mono, uppercase, wide-tracked.",

		cells: {
			...Mark("record marker"),

			rest: B(
				"printed as `# LAND_01` - the `#` is the marker's own mark and the caller passes the index already stripped of it",
			),

			empty: B(
				"an empty index prints the bare `#` and a space, which is the grammar's mark with no figure - the honest form of a record that has no index",
			),

			xs: B(
				"the marker is set at the `s` type step; at a chip's scale it is the same string in the same register",
			),

			xl: X(
				"A record marker is never the largest object on a surface: it is a label about the record, not the record.",
			),

			print: B("the marker prints"),
		},
	},

	{
		name: "FIELDRECORDMETADATA",

		file: "COMPONENT/BRAND/FIELDRECORDMETADATA.ASTRO",

		note: "The key/value run under a record's title block: `TARGET: Linux`, `LICENSE: CC0`, `SIGNAL: ABSENT`, as a description list.",

		cells: {
			...Printed(
				"metadata run",

				"the pairs are the record's own and are resolved before the page exists",
			),

			empty: B(
				"no rows prints an empty `<dl>` - the block renders nothing visible rather than saying there is nothing, which is its one defect and is recorded in `Observations`; the behaviour is kept because two hosts depend on the signature",
			),

			partial: B(
				"an unknown value prints `UNAVAILABLE` in the value column; the key stays",
			),

			dense: B(
				"the rows are `space-y-1`; the block has no tighter arm because a metadata run is already the tightest thing in a card",
			),

			one: B(
				"one pair prints one row - a metadata run of one is a single fact, which is what `TARGET:` alone is",
			),

			many: B(
				"twelve pairs print twelve rows; the block has no cap and the card's blank interval absorbs the growth",
			),

			long: B(
				"a long value wraps under its value column; the key column is fixed and `nowrap`",
			),

			narrow: B(
				"in a narrow column the value wraps in place; the key does not move",
			),

			wide: B(
				"a wide column gives the value more room; the row stays one line while it fits",
			),

			incard: B("the run is printed inside the card its host owns"),

			noplate: X("A metadata run has no evidence panel."),

			three: X(
				"A metadata run is one record's facts: three of them is three records.",
			),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the run's type is the `s` step, the site's floor"),

			xl: X("A metadata run prints no seal."),

			lone: B("a lone card's metadata run prints exactly as a cell's"),

			noaction: B(
				"the run never carries an action; the record's action is the template's",
			),

			inband: B("the run is inside a card inside a band"),
		},
	},

	{
		name: "FIELDRECORDACTION",

		file: "COMPONENT/BRAND/FIELDRECORDACTION.ASTRO",

		note: "The one action a record offers, in the two arms a field record uses: a mono route line (`/LABEL`) or a squish Jelly button.",

		cells: {
			...Control("record action"),

			empty: B(
				"a label of nothing prints an empty anchor - which is why the record template only mounts this block when `record.Action` exists",
			),

			loading: B(
				"a record action that is working is the button arm with its label in the vocabulary; the route arm has no loading state, because a route is a destination and a destination does not load",
			),

			partial: B(
				"a destination the record could not resolve prints `UNAVAILABLE` as its label and keeps its ink",
			),

			error: B(
				"a failed action prints under the anchor in the record's own voice; the block owns no message of its own",
			),

			stale: X(
				"An action is not a fact: it has no as-of, and a destination's age is the record's business.",
			),

			dense: B(
				"the two arms ARE the two densities: the route line is the tight arm and the button is the expressive one",
			),

			one: B(
				"one action is the arm's own count: `.emphasis-expressive` allows one per artifact",
			),

			many: B(
				"a second action is the second arm - the record's routes beside its button, which is how the hero prints its secondary destinations",
			),

			long: B(
				"a long label wraps in the button and does not in the route line; the route line is one word by construction",
			),

			narrow: B(
				"the button takes the column's width when its host asks (`block`), and its label wraps",
			),

			wide: B(
				"the button keeps its own width; a wide band does not make a 900px button",
			),

			noplate: X("An action has no evidence panel."),

			three: X(
				"An action is one control: three of them is the record's route row.",
			),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the button's label is the `s` step, the site's floor"),

			xl: X("An action prints no seal."),

			lone: B("a lone card's action prints exactly as a cell's"),

			noaction: B(
				"this block IS the action: the no-action arm is the record template not mounting it",
			),

			inband: B("the action is inside a card inside a band"),
		},
	},

	{
		name: "FIELDRECORDSTATUS",

		file: "COMPONENT/BRAND/FIELDRECORDSTATUS.TSX",

		note: "The STATUS ledger row: `STATUS:` in ink, the value in the record's ink, and the attested tone drawn as a square rather than a hue.",

		cells: {
			...Leaf("status row", "the record that prints it"),

			empty: B(
				"an empty status prints `STATUS:` with no value - the caller's defect, and the block does not invent a word",
			),

			partial: B(
				"`unavailable` and `interrupted` are two of the eight words: the block prints them at the ink tone, which is the vocabulary's own answer for a fact that is not what it should be",
			),

			dense: B(
				"the row is one line at the `s` step; it has no tighter arm",
			),

			long: B(
				"a long status value wraps under `STATUS:`; the copy prop's split is on `:` so a value with a colon keeps its second half",
			),

			narrow: B("the row wraps in place"),

			wide: B("the row stays one line"),

			incard: B("the row is printed inside a card"),

			noplate: X("A status row has no evidence panel."),

			three: X("A status row is one fact."),

			nine: X("Nine tiles is the stack's composition."),

			xs: B(
				"the row's mark is the state square at the badge step; at 16px the square is the ladder's `3`, which is the mark's own floor",
			),

			xl: X("A status row prints no seal."),

			lone: B("a lone card's status prints exactly as a cell's"),

			noaction: B("the row carries no action"),

			inband: B("the row is inside a card inside a band"),

			print: B(
				"the row prints; the attested square prints as a filled mark and survives greyscale",
			),
		},
	},

	{
		name: "FIELDRECORDEVIDENCE",

		file: "COMPONENT/BRAND/FIELDRECORDEVIDENCE.TSX",

		note: "The evidence plate: one photograph, `object-fit: cover`, no text on it - and, since this family, the two arms it has when there is no photograph.",

		cells: {
			...Leaf("evidence plate", "the figure or panel that holds it"),

			empty: B(
				"`src` of nothing prints the absent arm: the plate's frame, the grammar's `◎`, `PLATE: UNAVAILABLE` and the description that would have been the alt - the composition this family's brief named, and the one that found the broken-image glyph",
			),

			loading: B(
				'`state="loading"` prints the same frame with three barred rules where the drawing will be - a skeleton in the record grammar, not a spinner in a 51% panel',
			),

			partial: B(
				"a plate whose provenance the build could not resolve prints its caption with `UNAVAILABLE` in the provenance slot; the plate itself is unaffected",
			),

			error: B(
				"a plate that failed to fetch is the absent arm: there is no difference a reader can act on between an image that is not there and one that did not arrive",
			),

			dense: B(
				"the plate's density is its crop (`object-position`), not its box",
			),

			long: B(
				"the plate has no text, so there is no line to run past its column - the caption below it wraps",
			),

			narrow: B(
				"below `md` the plate keeps a `40dvh` floor so the caption describes an image that is there",
			),

			wide: B(
				"a wide panel gives the plate more height; `object-fit: cover` crops rather than distorts",
			),

			incard: X(
				"A plate inside a card is a photograph printed on a record: the plate is the pair's other half, and the figure that holds it is never a card.",
			),

			noplate: B(
				"this block IS the no-plate arm: the column and the block's own state are the same question, which is why the row is built here and not merely stated",
			),

			three: X("A plate is one image."),

			nine: X("Nine tiles is the stack's composition."),

			xs: X(
				"A plate is never a mark: its smallest size is the panel it fills.",
			),

			xl: X(
				"A plate is not a seal: the 240px arm belongs to the mark, not the evidence.",
			),

			lone: B("a lone plate is a figure of one"),

			noaction: B(
				"the plate carries no action: the figure's caption is a fact, not a link",
			),

			inband: B("the plate is inside the pair or the figure"),

			print: B(
				"the plate prints; the print layer caps its height so a photograph cannot take a page",
			),
		},
	},

	{
		name: "FIELDRECORDSEAL",

		file: "COMPONENT/BRAND/FIELDRECORDSEAL.TSX",

		note: "The site's one engraved mark: concentric rings, four cardinal ticks and the element's device, struck in the accent - at five ladder steps since this family.",

		cells: {
			...Mark("seal"),

			rest: B(
				"the authored drawing at `m` and up: two stroke weights, 1 and 0.5 user units, which is the engraving",
			),

			xs: B(
				"the 16px arm, and the finding: at a quarter of a pixel per unit the authored drawing was a green smudge with a ring-shaped rumour - `Mark/_Seal.scss` draws `xs` at ONE weight (4 units = 1px), so the form survives and the device is still legible",
			),

			xl: B(
				"the 240px arm: the authored drawing scaled, where a unit is 3.75px and the two weights are the engraving again - the seal as the artifact rather than an anchor on one",
			),

			s: B(
				"the 32px arm: drawn at one weight (2 units = 1px) for the same reason `xs` is - at the card-head step the authored pair is 0.5px and 0.25px",
			),

			one: B(
				"one seal per record is the grammar's rule; the block has no count of its own",
			),

			partial: X(
				"A seal is one drawing: its device is the element's, and there is no half-drawn state - an element whose record carries no device prints the NEUTRAL roundel, which is a different drawing rather than a partial one.",
			),

			print: B(
				"the seal prints in the accent; at 32px and below the print layer inherits the one-weight correction",
			),
		},
	},

	{
		name: "CORNERMARKS",

		file: "COMPONENT/BRAND/CORNERMARKS.ASTRO",

		note: "Picture-frame corner crosshairs for white card surfaces: eight ticks, four corners, one geometry module, one hover that separates the arms.",

		cells: {
			...Mark("corner frame"),

			rest: B(
				"eight ticks inset from the panel's corners, at the mark ladder's inset and arm",
			),

			xs: B(
				"the frame's inset and arm are the ladder's `6` and `1`; a 16px card would carry a frame wider than its corner, so the block has no xs arm and the host picks a bigger card",
			),

			xl: B(
				"the frame takes whatever box its host has: on a 240px plate the arms are the same length, which is correct - a crosshair does not scale with its panel",
			),

			inband: B(
				"the frame is inside the card, at the card's corners, and names no band",
			),

			print: B(
				"the frame prints; the hover is dropped, because a printed sheet has no pointer",
			),
		},
	},

	{
		name: "SEMANTICLEDGER",

		file: "COMPONENT/BRAND/SEMANTICLEDGER.TSX",

		note: "The character-level ink renderers for the record grammar: `StampText`, `RouteText`, `StatusText`, `PlatformDescriptionText`.",

		cells: {
			...Printed(
				"ink renderer",

				"it is a pure function of a string and a lookup table",
			),

			empty: B(
				"an empty line prints its brackets and nothing between them - `〈 〉`, which is the grammar's containment with no term",
			),

			partial: B(
				"a term the ink table does not know prints in the record's ink: an unknown word is not allowed to authenticate itself",
			),

			dense: B(
				"the renderers set no density: the ink is the caller's, the type is the caller's",
			),

			one: B("one term prints one span"),

			many: B(
				"a line of twelve terms prints twelve spans and one pair of brackets",
			),

			long: B(
				"a long line wraps in its host; the renderers are inline spans and have no measure",
			),

			narrow: B("the spans wrap in place"),

			wide: B("the spans stay on one line while they fit"),

			incard: B("the renderers are used inside cards"),

			noplate: X("An ink renderer has no evidence panel."),

			three: X(
				"An ink renderer is one line: three of them is three rows.",
			),

			nine: X("Nine tiles is the stack's composition."),

			xs: B(
				"the renderers inherit the host's type, so at a chip's scale they print at the chip's",
			),

			xl: X("An ink renderer prints no seal."),

			lone: B("a lone card's stamp prints exactly as a cell's"),

			noaction: B("the renderers carry no action"),

			inband: B("the renderers are used inside a card inside a band"),

			print: B(
				"the inks print; the print layer maps the accent and the per-protocol inks to paper values",
			),
		},
	},

	{
		name: "SPECIMENLABEL",

		file: "COMPONENT/BRAND/SPECIMENLABEL.TSX",

		note: "The element-series ledger artifact: ink directly on the creme canvas, hairline row rules, a small seal as the specimen anchor, no white box.",

		cells: {
			...Leaf("specimen label", "the index or wall that repeats it"),

			empty: B(
				"`showHeader` and `showTitle` are the two blocks a host can suppress when it prints its own; with both off the label is its status and its metadata, which is a label of facts only",
			),

			partial: B(
				"an unknown metadata value prints as given; the label never re-cases or invents one",
			),

			dense: B(
				"the label IS the dense arm of the record family: `text-sm` stamps, hairline rules, no card inset",
			),

			long: B(
				"the title is `text-lg` and wraps; the metadata key column is a `w-28` `nowrap` measure",
			),

			narrow: B(
				"in a narrow column the metadata's key column holds and the value wraps",
			),

			wide: B(
				"a wide host gives the label more measure; its rows stay one line while they fit",
			),

			incard: X(
				"A specimen label is ink on the creme canvas by definition - it exists because the element series must NOT be the generic white FieldRecord box. A label inside a card would be the box it was built to replace.",
			),

			noplate: X("A specimen label has no evidence panel."),

			three: B("three labels are three ledger rows of an index"),

			nine: B(
				"nine labels are an index of nine; the artifact is the column, and nine is what the architecture band's own index prints",
			),

			xs: B(
				"the label's seal is `s` by default and takes `xs` where a host prints it inside a row",
			),

			xl: X(
				"A specimen label prints no 240px seal: the seal is the label's anchor, not its subject.",
			),

			lone: B("a lone label is an index of one"),

			noaction: B(
				"`action` is an optional node: a label with no action closes on its metadata",
			),

			inband: B("the label is composed by its host"),

			print: B("the label prints; its hairlines print as rules"),
		},
	},

	/* ── THE DYNAMIC LAYER'S THIRTY-FIVE ─────────────────────────────────── */

	{
		name: "DYNAMICHEROSECTION",

		file: "COMPONENT/DYNAMIC/DYNAMICHEROSECTION.TSX",

		note: "The homepage hero: the canonical two-panel artifact - the field record at 49 beside the evidence at 51, one hairline gutter, the runtime trace and the stack as its foot.",

		cells: {
			...Leaf("hero", "the page it opens"),

			empty: B(
				"a hero handed no entries prints no action and no routes; a hero with no facts prints an empty ledger slot - both arms are conditional and the pair still holds",
			),

			loading: X(
				"A hero is the page's first artifact and its claim is static copy: there is no state in which the pair exists and its record has not arrived, and a hero skeleton would be a page apologising before it said anything.",
			),

			partial: B(
				"a record whose plate has no provenance prints its caption with `UNAVAILABLE` beside it; the pair is unaffected",
			),

			error: B(
				"a hero whose evidence failed to fetch prints the plate's absent arm - the frame, `◎`, `PLATE: UNAVAILABLE` and the description - rather than a broken glyph",
			),

			stale: X(
				"A hero carries no as-of: its status line is the release state, which is the record's fact and not an age.",
			),

			disabled: X("A hero is not a control."),

			readonly: X("A hero is read-only by construction."),

			dense: B(
				"the pair's density is its ratio: 49fr 1px 51fr, with the blank interval held at 15-25% of the card",
			),

			one: B(
				"one destination is one action; one fact is one ledger row - the hero has no set that cannot be one",
			),

			many: B(
				"eight stack tiles and four trace steps are the foot's sets; both grow without changing the pair",
			),

			long: B(
				"the claim is the page's one XL and its value is the tier's low end because the card is 49% of the pair - a claim that broke after `RUST +` would be a two-line poster",
			),

			narrow: B(
				"below `md` the pair stacks card first, evidence second, and the plate keeps a `40dvh` floor",
			),

			wide: B(
				"the pair caps its block size at `54rem` so the blank interval cannot pass 25%",
			),

			incard: X(
				"The hero IS the artifact: its record panel is already a Jelly card, and a card around the pair would be a card around a card.",
			),

			noplate: B(
				"`plate.src` is optional since this family: with no source the evidence panel keeps its 51% of the pair, its height and its caption, and prints `◎` / `PLATE: UNAVAILABLE` / the description - the composition this family's brief named, and the one that found the broken-image glyph in a 40dvh panel",
			),

			three: X(
				"The hero's evidence is one plate, not a set: three records is the proof band's column.",
			),

			nine: B(
				"the stack is the hero's legend and its count is derived (`StackTracks`): eight tiles print four across, nine print three, and a narrow card falls to two - the composition this family's brief named, and the one that found the hole in the last row",
			),

			xs: B(
				"the seal at the hero's head is `m` (48px); the record's marker is type, not a mark",
			),

			xl: X(
				"The hero prints no 240px seal: its largest object is the claim.",
			),

			lone: B(
				"a hero with one destination prints one action and no route line - `Routes` is empty and the action row holds its button",
			),

			noaction: B(
				"a hero handed no entries prints no action at all; the record closes on its facts and the pair still reads",
			),

			inband: X(
				"The hero is not a band: it opens the page and owns its own inset, and a hero inside a chapter would be a second opening.",
			),

			print: B(
				"the pair prints as two columns on paper; the blank interval collapses and the plate is capped",
			),
		},
	},

	{
		name: "DOWNLOADMASTHEAD",

		file: "COMPONENT/DYNAMIC/DOWNLOADMASTHEAD.ASTRO",

		note: "The Download page's opening, endorsed on sight: glyph, `h1`, one sentence, then a row of marks - a record header, not a hero.",

		cells: {
			...Leaf("masthead", "the page it opens"),

			empty: B(
				"a masthead with no marks prints the glyph, the `h1` and the sentence - the marks are the claim row and the header still opens",
			),

			loading: X(
				"A masthead is static copy: its sentence is the page's own and there is nothing to wait for.",
			),

			partial: B(
				"a claim with no glyph prints its dot instead of its image - the block already chooses between the two",
			),

			error: X("A masthead reads nothing at render time."),

			stale: X("A masthead carries no as-of."),

			dense: B(
				"the marks are `jelly-badge`s at 13px with their own protocol inks; the row wraps rather than compressing",
			),

			one: B("one mark prints one badge"),

			many: B(
				"eight marks wrap onto a second row; the row is a wrapping line, not a grid",
			),

			long: B(
				"a long claim wraps in its badge and the row takes another line - a squished chip row is really a row that should have wrapped",
			),

			narrow: B(
				"below `md` the marks wrap and the sentence takes the full measure",
			),

			wide: B(
				"the header caps at its measure and the marks stay left-aligned",
			),

			incard: X(
				"The masthead is a page header, not a record: a card around it would be a card around a page.",
			),

			noplate: X("The masthead has no evidence panel."),

			three: B("three marks print three badges"),

			nine: X(
				"Nine tiles is the stack's composition; the masthead's unit is a badge.",
			),

			xs: B(
				"the marks' dots are the state square at the badge step, which is the family's smallest mark",
			),

			xl: X("The masthead prints no 240px seal."),

			lone: B("a masthead with one mark prints one badge"),

			noaction: B(
				"the masthead's marks are claims, not actions; the page's action is further down",
			),

			inband: X("The masthead is the page's opening, not a chapter."),

			print: B(
				"the marks print with their protocol inks mapped to paper",
			),
		},
	},

	{
		name: "DYNAMICHEADER",

		file: "COMPONENT/DYNAMIC/DYNAMICHEADER.TSX",

		note: "The legacy schema-driven header, reduced to an adapter: it renders `Layout/Header` and adapts the old schema. ORPHANED - nothing imports it.",

		cells: {
			...Island(
				"header adapter",

				"the bar it adapts is server-rendered and the auth status inside it is the island",
			),

			empty: B(
				"an empty schema prints the bar with no nav and no action - the bar's own empty arm",
			),

			loading: B(
				"the bar's auth status is a skeleton matching the avatar's size, so the bar does not shift",
			),

			partial: B(
				"a nav item with no href prints as text; the bar's own conditional",
			),

			error: B(
				"an auth read that failed prints the bar's signed-out arm; the bar never shows a failed session as a signed-in one",
			),

			disabled: B(
				"a nav item can be disabled: it keeps its label and loses its target",
			),

			readonly: X(
				"A header is not editable: there is nothing to change, so `read-only` names no arm.",
			),

			dense: B(
				"the bar has two modes - minimal and functional - which are the page's own density choice, not a control state",
			),

			one: B("one nav item prints one item"),

			many: B(
				"the nav's count is the palette register's; a long nav folds into the palette below 1024px",
			),

			long: B(
				"a long nav label wraps in the palette and ellipsizes in the bar",
			),

			narrow: B(
				"below 1024px the nav folds into the palette and the bar keeps the mark and the toggle",
			),

			wide: B(
				"the bar takes the page's full width; its measure is the shell's",
			),

			incard: X("A header is a page's chrome, never a record's surface."),

			noplate: X("A header has no evidence panel."),

			three: X("A header is one bar."),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the bar's mark is the glyph at the ladder's `5`"),

			xl: X("The bar prints no seal."),

			lone: X("A bar with one nav item is a bar, not a lone card."),

			noaction: B("a bar with no action prints no sign-in link"),

			inband: X("The header is the frame's, not a chapter's."),

			print: B("the bar's nav resolves to a printed contents list"),
		},
	},

	{
		name: "DYNAMICFOOTER",

		file: "COMPONENT/DYNAMIC/DYNAMICFOOTER.TSX",

		note: "A schema-driven footer with its own social glyphs. ORPHANED - nothing imports it, and `Layout/Footer` plus `Footer/Data.ts` is the footer every page wears.",

		cells: {
			...Printed(
				"footer adapter",

				"its content is a schema object resolved before the page exists",
			),

			empty: B(
				"an empty schema prints the record's head and no rows - the footer's own empty arm",
			),

			partial: B("a footer fact with no value prints `UNAVAILABLE`"),

			dense: B("the footer's ledger is the register density"),

			one: B("one row prints one row"),

			many: B("the footer's five facts are a ledger; a sixth joins it"),

			long: B("a long fact wraps under its key"),

			narrow: B("below `md` the footer's columns stack"),

			wide: B("the footer caps at the page's measure"),

			incard: X("A footer is the page's closing record, never a card."),

			noplate: X("A footer has no evidence panel."),

			three: X("A footer is one record."),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the social glyphs are 20px, the ladder's glyph step"),

			xl: X("The footer prints no seal."),

			lone: X("A footer is one record, not a lone card."),

			noaction: B(
				"the footer's links are the record's rows; there is no action to remove",
			),

			inband: X("The footer is the frame's closing, not a chapter."),

			print: B("the footer's record prints as the document's colophon"),
		},
	},

	{
		name: "DYNAMICDOCSIDEBAR",

		file: "COMPONENT/DYNAMIC/DYNAMICDOCSIDEBAR.TSX",

		note: "The documentation tree as a panel: the same sections `Doc/DocContents` prints in the rail, mounted by `DocLayout` below 1024px.",

		cells: {
			...Island(
				"doc tree",

				"the tree is server-rendered and the disclosure that opens it is the browser's",
			),

			empty: B(
				"a tree of no sections prints the grammar's `◎` and the sentence where the tree would be",
			),

			loading: B(
				"the tree arrives with the page; its disclosure is closed by default, so a late tree is a closed panel rather than an empty one",
			),

			partial: B("a section with no children prints as a leaf"),

			error: B(
				"a tree that could not be read prints the panel's absence in the record grammar",
			),

			stale: X(
				"A doc tree carries no as-of: it is the manual's structure, not a fact with an age.",
			),

			disabled: X(
				"A doc tree is navigation: a disabled section is an absent section, and the tree prints one or the other.",
			),

			readonly: X("A doc tree is read-only by construction."),

			dense: B(
				"the panel's rows tighten below `md`; the rail's register is the dense arm and this is its panel form",
			),

			one: B(
				"a manual with one section prints one row and the disclosure still opens",
			),

			many: B(
				"an 81-row tree scrolls inside its own register with `overscroll-behavior: contain`",
			),

			long: B(
				"a long section label wraps under its marker; the panel is sized in `ch`",
			),

			narrow: B(
				"the panel IS the narrow arm: it exists only below 1024px, where the rail is not painted",
			),

			wide: X(
				"Above 1024px the rail prints the tree and this panel is not mounted: a wide panel would be the same tree twice.",
			),

			incard: X(
				"A doc tree is a panel inside the page shell, never inside a record's card.",
			),

			noplate: X("A doc tree has no evidence panel."),

			three: B("three sections print three rows"),

			nine: X(
				"Nine tiles is the stack's composition; the tree's unit is a row.",
			),

			xs: B(
				"the tree's disclosure marks are the ladder's folds, not seals",
			),

			xl: X("The tree prints no seal."),

			lone: X("A tree of one is a tree, not a lone card."),

			noaction: B(
				"the tree's rows are links; there is no action to remove",
			),

			inband: X(
				"The tree is inside the documentation shell, not a chapter.",
			),

			print: B("the panel prints as a contents list above the article"),
		},
	},

	{
		name: "DYNAMICPORTAL",

		file: "COMPONENT/DYNAMIC/DYNAMICPORTAL.TSX",

		note: "The four connection tiers as a pricing surface, 1,556 lines. ORPHANED - no page imports it; `pages/Portal.astro` composes the tiers itself from `Content/Surface/Portal.ts`.",

		cells: {
			...Island(
				"tier surface",

				"the tiers are static content and the auth state inside it is the island",
			),

			empty: B("a tier with no features prints its head and no list"),

			loading: B(
				"a tier's price that has not resolved prints the barred arm; the surface has a skeleton per card",
			),

			partial: B(
				"a tier with no protocol prints `UNAVAILABLE` in its badge slot",
			),

			error: B("a failed auth read prints the surface's signed-out arm"),

			disabled: B(
				"a tier's action can be disabled: it keeps its label and loses its target",
			),

			readonly: X("A pricing surface is not editable."),

			dense: B(
				"the tiers print one per band on the page and one card per row in the surface's own narrow arm",
			),

			one: B("one tier prints one card across the measure"),

			many: B("four tiers are the set; a fifth joins the row"),

			long: B("a long feature wraps under its mark"),

			narrow: B("below `lg` the tiers stack"),

			wide: B("the tiers cap at the page's measure"),

			incard: X(
				"The surface composes its own cards; a card around the surface would be a card around four cards.",
			),

			noplate: X("The tier surface has no evidence panel."),

			three: B("three tiers print three cards"),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("each tier's seal is `s`"),

			xl: X("The tier surface prints no 240px seal."),

			lone: B("a surface of one tier is a page with one offer"),

			noaction: B("a tier with no action prints its facts alone"),

			inband: B("the tiers are printed one per band on the page"),

			print: B("the tiers print as a comparison table"),
		},
	},

	{
		name: "DYNAMICTRANSPARENCY",

		file: "COMPONENT/DYNAMIC/DYNAMICTRANSPARENCY.TSX",

		note: "The telemetry-transparency panel on `/Download`: what is measured, what is not, and the switch. Live.",

		cells: {
			...Island(
				"transparency panel",

				"its copy is static and its switch is the island",
			),

			empty: B(
				"a panel with no items prints its head and the sentence that says nothing is measured",
			),

			loading: B(
				"the panel's switch is disabled while the state resolves, with its label stating the work",
			),

			partial: B("an item with no value prints `UNAVAILABLE`"),

			error: B(
				"a failed state read prints the panel's error arm in the vocabulary",
			),

			disabled: B(
				"the switch can be disabled: it keeps its label and loses its target",
			),

			readonly: B(
				"a read-only panel prints its items with the switch replaced by the state's word",
			),

			dense: B("the items are a ledger at the register density"),

			one: B("one item prints one row"),

			many: B(
				"twelve items print twelve rows; the panel scrolls the page",
			),

			long: B("a long item wraps under its key"),

			narrow: B("below `md` the panel's two columns stack"),

			wide: B("the panel caps at the page's measure"),

			incard: X("The panel is a band's body, not a card."),

			noplate: X("The panel has no evidence panel."),

			three: B("three items print three rows"),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the panel's state marks are the ladder's squares"),

			xl: X("The panel prints no seal."),

			lone: B("a panel of one item is a panel"),

			noaction: B(
				"a panel whose switch is not offered prints its items alone",
			),

			inband: B("the panel is a band's body"),

			print: B("the panel prints; the switch prints as its state's word"),
		},
	},

	{
		name: "DYNAMICVERIFICATIONINFO",

		file: "COMPONENT/DYNAMIC/DYNAMICVERIFICATIONINFO.TSX",

		note: "Checksums and signatures with a copy button, driven by `react-i18next`. ORPHANED - no page imports it, and `/Download` prints its checksums through `Download/Verify.astro`, which is live.",

		cells: {
			...Island(
				"verification panel",

				"its checksums are content and its copy button is the island",
			),

			empty: B(
				"a panel with no checksum prints `UNAVAILABLE` and the sentence that says nothing is published yet",
			),

			loading: B(
				"the copy button is disabled while the clipboard is unavailable",
			),

			partial: B(
				"a signature that is not published prints `UNAVAILABLE` beside the checksum that is",
			),

			error: B(
				"a copy that failed prints the panel's error line - the block's `alert()` is the arm this family's matrix flags in `Observations`",
			),

			disabled: B("the copy button can be disabled"),

			readonly: B(
				"a read-only panel prints the checksum as selectable text with no button",
			),

			dense: B("the two blocks are ledgers at the register density"),

			one: B("one checksum prints one row"),

			many: B(
				"a release's checksums print as a list; twelve are twelve rows",
			),

			long: B(
				"a 64-character checksum wraps in its own register - the one place a wrap is the correct answer",
			),

			narrow: B(
				"below `md` the checksum takes its own line under its key",
			),

			wide: B("the panel caps at the page's measure"),

			incard: X("The panel is a band's body, not a card."),

			noplate: X("The panel has no evidence panel."),

			three: B("three checksums print three rows"),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the panel's copy marks are the ladder's glyphs"),

			xl: X("The panel prints no seal."),

			lone: B("a panel of one checksum is a panel"),

			noaction: B(
				"a panel with no copy control prints its checksum as text",
			),

			inband: B("the panel is a band's body"),

			print: B("the checksums print in full; the copy button is dropped"),
		},
	},

	{
		name: "ACCOUNTPAGE",

		file: "COMPONENT/DYNAMIC/ACCOUNTPAGE.TSX",

		note: "The account surface's shell: one of the four password screens chosen by route, with the same head and the same state grammar.",

		cells: {
			...Island(
				"account shell",

				"the route decides which screen and the auth state is the island",
			),

			empty: B(
				"a route with no screen prints the shell's head and the state report's empty arm",
			),

			loading: B(
				"the shell prints its skeleton while the session resolves",
			),

			partial: B(
				"a screen whose copy has no translation prints the English default; the shell never prints a key",
			),

			error: B(
				"a failed auth read prints `STATUS: INTERRUPTED` with the cause and the retry",
			),

			disabled: B(
				"a screen's submit is disabled while the form is invalid",
			),

			readonly: B(
				"a signed-in reader's account screen prints its facts with the fields replaced by values",
			),

			dense: B(
				"the shell's density is the auth surface's: one card, one measure",
			),

			one: B("one screen is one route"),

			many: B("the four screens are four routes, not four cards"),

			long: B("a long sentence wraps in the shell's measure"),

			narrow: B("below `md` the shell's card takes the full width"),

			wide: B("the shell caps at its measure and centres"),

			incard: X(
				"The shell composes its own card; a card around it would be two.",
			),

			noplate: X("The account shell has no evidence panel."),

			three: X("The shell is one surface."),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the shell's status marks are the ladder's squares"),

			xl: X("The shell prints no seal."),

			lone: X("The shell is one surface, not a lone card."),

			noaction: B(
				"a screen with no action prints its state and its sentence",
			),

			inband: X("The account shell is the page, not a chapter."),

			print: B("the shell prints as a form on paper"),
		},
	},

	{
		name: "AUTH0ACCOUNT",

		file: "COMPONENT/DYNAMIC/AUTH0ACCOUNT.TSX",

		note: "The Auth0 provider boundary for the two credential screens: it wraps `AccountPage` in the provider the sign-in and sign-up routes need.",

		cells: {
			...Island(
				"auth boundary",

				"the provider resolves the session at run time",
			),

			empty: B(
				"a boundary with no domain prints its children with the provider's own unconfigured arm",
			),

			loading: B(
				"the boundary prints the shell's skeleton until the provider is ready",
			),

			partial: B(
				"a boundary with a domain and no client identifier prints the provider's partial arm",
			),

			error: B(
				"a provider that failed to initialise prints `STATUS: INTERRUPTED` and the cause",
			),

			disabled: B(
				"the boundary can be mounted with its children disabled while the session resolves",
			),

			readonly: X("A provider boundary is not editable."),

			dense: X("A boundary has no density: it renders one child."),

			one: B("one child is the boundary's own count"),

			many: X(
				"A provider boundary wraps one screen; two would be two providers.",
			),

			long: X("A boundary renders no text of its own."),

			narrow: B(
				"the boundary's child takes the width; the boundary has no box",
			),

			wide: B("the boundary's child caps at its own measure"),

			incard: X("A boundary is not a surface."),

			noplate: X("A boundary has no evidence panel."),

			three: X("A boundary is one provider."),

			nine: X("Nine tiles is the stack's composition."),

			xs: X("A boundary prints no mark."),

			xl: X("A boundary prints no seal."),

			lone: X("A boundary is not a card."),

			noaction: X("A boundary carries no action."),

			inband: X("A boundary is the page's, not a chapter's."),

			print: X(
				"A provider boundary prints nothing: it has no markup of its own.",
			),
		},
	},

	{
		name: "AUTH0ACCOUNTGATE",

		file: "COMPONENT/DYNAMIC/AUTH0ACCOUNTGATE.TSX",

		note: "The gate in front of the account surfaces: it decides between the sign-in prompt, the loading state and the screen, and it is where `DynamicStateReport` earns its keep.",

		cells: {
			...Island(
				"account gate",

				"the session is the island's whole subject",
			),

			empty: B(
				"a gate with no child prints the state report's empty arm",
			),

			loading: B(
				"the gate prints the state report's loading arm - the one place on the site a restrained linear indicator is allowed",
			),

			partial: B(
				"a session with an email and no profile prints the screen with `UNAVAILABLE` in the profile's rows",
			),

			error: B(
				"a failed session prints `STATUS: INTERRUPTED` with the cause and the sign-in retry",
			),

			disabled: B(
				"a gate can be mounted closed: the screen is not rendered and the prompt states why",
			),

			readonly: B(
				"a gate in read-only mode prints the screen with its writes removed",
			),

			dense: B(
				"the gate's density is the state report's: one card, one sentence, one action",
			),

			one: B("one child is the gate's count"),

			many: X("A gate guards one screen."),

			long: B("a long cause wraps in the state report's measure"),

			narrow: B("the gate's card takes the full width below `md`"),

			wide: B("the gate's card caps at its measure"),

			incard: X("The gate's state report is already a card."),

			noplate: X("The gate has no evidence panel."),

			three: X("A gate guards one screen."),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the gate's status marks are the ladder's squares"),

			xl: X("The gate prints no seal."),

			lone: X("A gate is not a lone card."),

			noaction: B(
				"a gate with no retry prints its state and its sentence",
			),

			inband: X("The gate is the page's, not a chapter's."),

			print: B("the gate prints its state; the retry is dropped"),
		},
	},

	{
		name: "AUTH0CALLBACKHANDLER",

		file: "COMPONENT/DYNAMIC/AUTH0CALLBACKHANDLER.TSX",

		note: "The OAuth callback: it reads the code, exchanges it, and states the outcome - the one component on the site whose resting state is a redirect.",

		cells: {
			...Island(
				"callback handler",

				"it runs on mount and has nothing to print until it has run",
			),

			empty: B(
				"a callback with no code prints the state report's denied arm - a callback without a code is a link that was not authorised",
			),

			loading: B(
				"the handler's resting state IS the loading arm: `STATUS: LOADING`, one sentence, no spinner in a page",
			),

			partial: B(
				"a callback with a code and no state parameter prints the handler's partial arm and the reason",
			),

			error: B(
				"a failed exchange prints `STATUS: INTERRUPTED` with the provider's cause and the sign-in retry",
			),

			disabled: X(
				"A callback is not a control: it runs on mount and has no disabled state.",
			),

			readonly: X("A callback is read-only by construction."),

			dense: X("A callback has no density: it prints one state report."),

			one: B("one code is the handler's count"),

			many: X("A callback handles one exchange."),

			long: B(
				"a long provider error wraps in the state report's measure",
			),

			narrow: B("the report takes the full width below `md`"),

			wide: B("the report caps at its measure"),

			incard: X("The report is already a card."),

			noplate: X("A callback has no evidence panel."),

			three: X("A callback handles one exchange."),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the report's status marks are the ladder's squares"),

			xl: X("A callback prints no seal."),

			lone: X("A callback is not a lone card."),

			noaction: B(
				"a failed callback with no retry prints its cause alone",
			),

			inband: X("A callback is the page's, not a chapter's."),

			print: B(
				"the callback's state prints; a printed sheet cannot complete an exchange, and the state says so",
			),
		},
	},

	{
		name: "VERIFYPAGE",

		file: "COMPONENT/DYNAMIC/VERIFYPAGE.TSX",

		note: "The `/Verify` surface: the email-verification screen and its five outcomes, on the account shell's grammar.",

		cells: {
			...Island(
				"verify surface",

				"the verification token is the island's subject",
			),

			empty: B(
				"a verify route with no token prints the state report's denied arm",
			),

			loading: B(
				"the surface's resting state is the loading arm while the token is checked",
			),

			partial: B(
				"a token that verified an account with no profile prints the success arm with `UNAVAILABLE` in the profile's rows",
			),

			error: B(
				"a failed verification prints `STATUS: INTERRUPTED` with the cause and the resend",
			),

			disabled: B("the resend is disabled while a send is in flight"),

			readonly: B(
				"a verified account prints its facts with the fields replaced by values",
			),

			dense: B("the surface's density is the account shell's"),

			one: B("one token is the surface's count"),

			many: X("A verification is one token."),

			long: B("a long provider message wraps in the state report"),

			narrow: B("the card takes the full width below `md`"),

			wide: B("the card caps at its measure"),

			incard: X("The surface's report is already a card."),

			noplate: X("The verify surface has no evidence panel."),

			three: X("A verification is one token."),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the surface's status marks are the ladder's squares"),

			xl: X("The surface prints no seal."),

			lone: X("The surface is not a lone card."),

			noaction: B(
				"a verified account with no next step prints its state and its facts",
			),

			inband: X("The surface is the page, not a chapter."),

			print: B("the surface prints its state"),
		},
	},

	{
		name: "DYNAMICACCOUNTPROFILE",

		file: "COMPONENT/DYNAMIC/DYNAMICACCOUNTPROFILE.TSX",

		note: "The account profile: the reader's own facts, their provider, their sessions and the two writes the surface allows.",

		cells: {
			...Island("profile surface", "the profile is fetched on mount"),

			empty: B(
				"a profile with no facts prints the state report's empty arm",
			),

			loading: B(
				"the profile prints its skeleton: the rows are barred, the labels are not",
			),

			partial: B(
				"a profile with an email and no name prints `UNAVAILABLE` in the name row",
			),

			error: B(
				"a failed profile read prints `STATUS: INTERRUPTED` with the cause and the retry",
			),

			disabled: B(
				"a field the provider owns is disabled with the provider named beside it",
			),

			readonly: B(
				"a profile with no writes prints its facts and no controls - the arm a reader with a provider-managed account gets",
			),

			dense: B(
				"the profile's facts are a ledger at the register density",
			),

			one: B("one session prints one row"),

			many: B("twelve sessions print twelve rows and the list scrolls"),

			long: B(
				"a long email wraps under its key; the row never widens the card",
			),

			narrow: B("below `md` the profile's two columns stack"),

			wide: B("the profile caps at its measure"),

			incard: X(
				"The profile's sections are already cards; a card around them would be two.",
			),

			noplate: X("The profile has no evidence panel."),

			three: B("three facts print three rows"),

			nine: X("Nine tiles is the stack's composition."),

			xs: B(
				"the profile's provider mark is the glyph at the ladder's `5`",
			),

			xl: X("The profile prints no seal."),

			lone: B("a profile of one fact is a profile"),

			noaction: B("a read-only profile prints no action"),

			inband: X("The profile is the page, not a chapter."),

			print: B("the profile prints as a record of the reader"),
		},
	},

	{
		name: "DYNAMICDASHBOARDUSER",

		file: "COMPONENT/DYNAMIC/DYNAMICDASHBOARDUSER.TSX",

		note: "The dashboard's own record: the reader's identity, their scan's state and the one thing the dashboard is for.",

		cells: {
			...Island(
				"dashboard record",

				"the session and the scan are both run-time",
			),

			empty: B(
				"a dashboard with no scan prints the state report's empty arm and the sentence that says what would be here",
			),

			loading: B(
				"the record prints its skeleton while the scan resolves",
			),

			partial: B(
				"a scan with no result prints `UNAVAILABLE` in its figure",
			),

			error: B(
				"a failed scan prints `STATUS: INTERRUPTED` with the cause and the rerun",
			),

			disabled: B("the rerun is disabled while a scan is in flight"),

			readonly: B(
				"a dashboard for a reader who may not scan prints the record and no control",
			),

			dense: B("the record's facts are a ledger at the register density"),

			one: B("one scan is one figure"),

			many: B(
				"the record's sets are small by construction; a list of many scrolls",
			),

			long: B("a long path wraps under its key"),

			narrow: B("below `md` the record's columns stack"),

			wide: B("the record caps at its measure"),

			incard: X("The dashboard's record is already a card."),

			noplate: X("The dashboard has no evidence panel."),

			three: B("three facts print three rows"),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the record's state marks are the ladder's squares"),

			xl: X("The record prints no seal."),

			lone: B("a dashboard of one figure is a dashboard"),

			noaction: B("a dashboard with no rerun prints its record alone"),

			inband: X("The dashboard is the page, not a chapter."),

			print: B("the record prints"),
		},
	},

	{
		name: "DYNAMICLOCALFIRSTSCAN",

		file: "COMPONENT/DYNAMIC/DYNAMICLOCALFIRSTSCAN.TSX",

		note: "The local-first scan: what the editor found on this machine, read as a ledger of probes with a state per probe.",

		cells: {
			...Island(
				"scan surface",

				"the scan runs in the browser and every row's state arrives from it",
			),

			empty: B(
				"a scan that found nothing prints `◎` and the sentence that says the machine carries none of the probes",
			),

			loading: B(
				"each probe prints its own loading state - the scan is the one surface where a per-row skeleton is the design",
			),

			partial: B(
				"a probe the browser cannot answer prints `UNAVAILABLE` and keeps its row - the honest arm for a capability the platform hides",
			),

			error: B(
				"a probe that threw prints `STATUS: INTERRUPTED` on its own row and does not stop the scan",
			),

			disabled: B("the scan's rerun is disabled while it runs"),

			readonly: B(
				"a scan whose result is cached prints its rows with no rerun",
			),

			dense: B("the probes are a ledger at the register density"),

			one: B("one probe prints one row"),

			many: B("twelve probes print twelve rows and the list scrolls"),

			long: B("a long probe name wraps under its mark"),

			narrow: B("below `md` each probe's state moves under its name"),

			wide: B("the scan caps at its measure"),

			incard: X("The scan is a band's body, not a card."),

			noplate: X("The scan has no evidence panel."),

			three: B("three probes print three rows"),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("each probe's state mark is the ladder's square"),

			xl: X("The scan prints no seal."),

			lone: B("a scan of one probe is a scan"),

			noaction: B("a cached scan prints its rows and no rerun"),

			inband: B("the scan is a band's body"),

			print: B(
				"the scan prints as a table of probes; a printed sheet cannot run one, and the state says so",
			),
		},
	},

	{
		name: "DYNAMICAUTHHEADER",

		file: "COMPONENT/DYNAMIC/DYNAMICAUTHHEADER.TSX",

		note: "The header with the auth status inside it: `Layout/Header` wrapped in the provider, with `DynamicAuthStatus` as its action.",

		cells: {
			...Island("auth header", "the session is the island's subject"),

			empty: B("a header with no content prints the bar and no nav"),

			loading: B(
				"the header's action is a skeleton matching the avatar's size, so the bar does not shift",
			),

			partial: B(
				"a session with no picture prints the avatar's initials fallback",
			),

			error: B(
				"a failed session prints the signed-out arm; the bar never shows a failed session as signed in",
			),

			disabled: B(
				"a nav item can be disabled: it keeps its label and loses its target",
			),

			readonly: X("A header is not editable."),

			dense: B(
				"the bar has its two modes; the auth status takes the bar's action slot",
			),

			one: B("one nav item prints one item"),

			many: B("a long nav folds into the palette below 1024px"),

			long: B(
				"a long name ellipsizes in the bar and prints in full in the dropdown",
			),

			narrow: B("below 1024px the nav folds and the action stays"),

			wide: B("the bar takes the page's width"),

			incard: X("A header is chrome, never a record's surface."),

			noplate: X("A header has no evidence panel."),

			three: X("A header is one bar."),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the bar's mark is the glyph at the ladder's `5`"),

			xl: X("The bar prints no seal."),

			lone: X("A bar is not a lone card."),

			noaction: B("a header with no action prints no action slot"),

			inband: X("The header is the frame's."),

			print: B("the bar's nav resolves to a contents list"),
		},
	},

	{
		name: "DYNAMICAUTHSTATUS",

		file: "COMPONENT/DYNAMIC/DYNAMICAUTHSTATUS.TSX",

		note: "The header's action: avatar and dropdown when signed in, a sign-in link when not, a skeleton while the session resolves.",

		cells: {
			...Control("auth status"),

			empty: B(
				"a session with no user prints the sign-in link - the block's own unauthenticated arm",
			),

			loading: B(
				"the skeleton matches the avatar's size, which is the block's stated rule: no layout shift",
			),

			partial: B(
				"a session with an email and no picture prints the initials fallback",
			),

			error: B(
				"a failed session prints the sign-in link; a failed read is not a signed-in state",
			),

			stale: X("An auth status is a state, not a fact with an age."),

			dense: B(
				"the status takes the bar's action slot; its density is the bar's",
			),

			one: B("one session is the block's subject"),

			many: X("A reader has one session per surface."),

			long: B(
				"a long name ellipsizes in the trigger and prints in full in the dropdown",
			),

			narrow: B("below `md` the trigger prints the avatar alone"),

			wide: B("the trigger keeps its own width"),

			noplate: X("An auth status has no evidence panel."),

			three: X("An auth status is one control."),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the avatar is the ladder's `6` (24px)"),

			xl: X("An auth status prints no seal."),

			lone: X("An auth status is not a card."),

			noaction: B(
				"a signed-out status with no link prints the avatar's absence - the bar's own arm",
			),

			inband: X("The status is the bar's."),

			print: B("the status prints as the reader's name or as `SIGN IN`"),
		},
	},

	{
		name: "DYNAMICSTATEPORT",

		file: "COMPONENT/DYNAMIC/DYNAMICSTATEREPORT.TSX",

		note: "The one shape every account, verify and dashboard state branch renders: a coded label, one plain sentence and the one action that is actually available.",

		cells: {
			...Leaf("state report", "the surface that branches on its state"),

			empty: B(
				"`kind=\"empty\"` prints `STATUS: UNAVAILABLE`, the caller's sentence and the caller's next step - the block's whole subject is the adverse state",
			),

			loading: B(
				'`kind="loading"` prints `STATUS: LOADING` with the restrained linear indicator the design system permits in exactly this place',
			),

			partial: B(
				'`kind="partial"` prints the vocabulary\'s word and keeps the last known value visible',
			),

			error: B(
				'`kind="error"` prints `STATUS: INTERRUPTED`, the cause and the retry - and it sets `role="alert"`, which is where a failure\'s urgency belongs rather than in a second colour',
			),

			stale: B(
				'`kind="stale"` prints the age and the last known value beside it',
			),

			disabled: B(
				"the report's action can be disabled: it keeps its label and loses its target",
			),

			readonly: B(
				"a report with no action prints its label and its sentence alone",
			),

			dense: B(
				"the report's density is its own: one card, one sentence, one action",
			),

			one: B("one state is the report's subject"),

			many: B(
				"a surface with many branches prints one report at a time; the block has no set",
			),

			long: B(
				"a long cause wraps in the report's measure; the label never wraps",
			),

			narrow: B("the report's card takes the full width below `md`"),

			wide: B("the report's card caps at its measure"),

			incard: X("The report IS the card: a card around it would be two."),

			noplate: X("A state report has no evidence panel."),

			three: X("A state report is one state."),

			nine: X("Nine tiles is the stack's composition."),

			xs: B(
				"the report's label is a `jelly-badge` at 13px, with the state square at the badge step",
			),

			xl: X("A state report prints no seal."),

			lone: X("A state report is not a lone card."),

			noaction: B(
				"a report whose next step does not exist prints its sentence alone - the arm every failed route uses",
			),

			inband: X("The report is the page's, not a chapter's."),

			print: B(
				"the report prints; its action is dropped and its state stays",
			),
		},
	},

	{
		name: "DYNAMICSIGNIN",

		file: "COMPONENT/DYNAMIC/DYNAMICSIGNIN.TSX",

		note: "The sign-in form: email, password, the provider's third-party buttons and the state report's arms.",

		cells: {
			...Control("sign-in form"),

			one: X(
				"A sign-in form is one form: a set of one is the form itself.",
			),

			many: X(
				"A sign-in form is one form: ninety of them is a page of forms.",
			),

			incard: X("The form is already inside the account shell's card."),

			noplate: X("A form has no evidence panel."),

			three: X("A form is one form."),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the form's labels are the `s` step, the site's floor"),

			xl: X("A form prints no seal."),

			lone: X("A form is not a lone card."),

			noaction: B(
				"a form with no submit prints its fields and its sentence - the arm a provider-managed account gets",
			),

			inband: X("The form is inside the account shell."),

			print: B("the form prints as fields; the submit is dropped"),
		},
	},

	{
		name: "DYNAMICSIGNUP",

		file: "COMPONENT/DYNAMIC/DYNAMICSIGNUP.TSX",

		note: "The sign-up form: email, password, the strength meter, the terms checkbox and the provider's buttons.",

		cells: {
			...Control("sign-up form"),

			one: X("A sign-up form is one form."),

			many: X("A sign-up form is one form."),

			incard: X("The form is already inside the account shell's card."),

			noplate: X("A form has no evidence panel."),

			three: X("A form is one form."),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the strength meter's marks are the ladder's squares"),

			xl: X("A form prints no seal."),

			lone: X("A form is not a lone card."),

			noaction: B("a form with no submit prints its fields"),

			inband: X("The form is inside the account shell."),

			print: B("the form prints as fields; the meter prints as its word"),
		},
	},

	{
		name: "DYNAMICFORGOTPASSWORD",

		file: "COMPONENT/DYNAMIC/DYNAMICFORGOTPASSWORD.TSX",

		note: "The forgot-password screen: one field, one submit, and the state report's sent arm.",

		cells: {
			...Control("recovery form"),

			one: X("A recovery form is one form."),

			many: X("A recovery form is one form."),

			incard: X("The form is already inside the account shell's card."),

			noplate: X("A form has no evidence panel."),

			three: X("A form is one form."),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the form's label is the `s` step"),

			xl: X("A form prints no seal."),

			lone: X("A form is not a lone card."),

			noaction: B("a form with no submit prints its field"),

			inband: X("The form is inside the account shell."),

			print: B("the form prints as a field"),
		},
	},

	{
		name: "DYNAMICRESETPASSWORD",

		file: "COMPONENT/DYNAMIC/DYNAMICRESETPASSWORD.TSX",

		note: "The reset screen: two password fields, the strength meter and the token's three outcomes.",

		cells: {
			...Control("reset form"),

			one: X("A reset form is one form."),

			many: X("A reset form is one form."),

			incard: X("The form is already inside the account shell's card."),

			noplate: X("A form has no evidence panel."),

			three: X("A form is one form."),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the meter's marks are the ladder's squares"),

			xl: X("A form prints no seal."),

			lone: X("A form is not a lone card."),

			noaction: B("a form with no submit prints its fields"),

			inband: X("The form is inside the account shell."),

			print: B("the form prints as fields"),
		},
	},

	{
		name: "DYNAMICEMAILVERIFICATION",

		file: "COMPONENT/DYNAMIC/DYNAMICEMAILVERIFICATION.TSX",

		note: "The verification screen: the six-digit code, the resend's cooldown and the five outcomes.",

		cells: {
			...Control("verification form"),

			one: X("A verification form is one form."),

			many: X("A verification form is one form."),

			incard: X("The form is already inside the account shell's card."),

			noplate: X("A form has no evidence panel."),

			three: X("A form is one form."),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the code's six fields are the `s` step"),

			xl: X("A form prints no seal."),

			lone: X("A form is not a lone card."),

			noaction: B(
				"a form with no submit prints its fields and the resend",
			),

			inband: X("The form is inside the account shell."),

			print: B("the form prints as fields; the code prints in full"),
		},
	},

	{
		name: "DYNAMICCONTACTFORM",

		file: "COMPONENT/DYNAMIC/DYNAMICCONTACTFORM.TSX",

		note: "The contact hub's form: the thirteen request routes, the field set and the delivery state. 836 lines, live on `/Contact`.",

		cells: {
			...Control("contact form"),

			empty: B(
				"a form with no route selected prints the field set and the route chooser's empty arm",
			),

			loading: B(
				"the submit is disabled while the send is in flight, with its label stating the work",
			),

			partial: B(
				"a field the reader has not reached prints its placeholder; a route whose recipient is unknown prints `UNAVAILABLE`",
			),

			error: B(
				"a failed send prints `STATUS: INTERRUPTED`, the cause and the retry - and it keeps every field's value",
			),

			one: B("one route prints one choice"),

			many: B(
				"thirteen routes print thirteen choices and the chooser scrolls",
			),

			long: B(
				"a long message scrolls inside its field; the form's measure does not change",
			),

			narrow: B("below `md` the field set is one column"),

			wide: B(
				"the form caps at its measure; a wide band does not make a 1200px textarea",
			),

			incard: X("The form is already inside the contact hub's card."),

			noplate: X("A form has no evidence panel."),

			three: B("three routes print three choices"),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the form's labels are the `s` step"),

			xl: X("A form prints no seal."),

			lone: X("A form is not a lone card."),

			noaction: B(
				"a form with no submit prints its fields - the arm a static deployment gets",
			),

			inband: B("the form is a band's body"),

			print: B("the form prints as fields; the submit is dropped"),
		},
	},

	{
		name: "DYNAMICINPUT",

		file: "COMPONENT/DYNAMIC/DYNAMICINPUT.TSX",

		note: "The field: label, input, helper text and error, composed with the two ARIA relations the error needs.",

		cells: {
			...Control("field"),

			empty: B(
				"an empty value prints the placeholder and the label above it",
			),

			loading: B("the field is disabled with its label stating the work"),

			partial: B(
				"a value the caller could not resolve prints `UNAVAILABLE` in the field",
			),

			error: B(
				"`Error` prints under the field and wires `aria-invalid` and `aria-describedby` - the one thing this block exists to get right",
			),

			disabled: B(
				"the field is disabled: its label keeps its ink and the input loses its fill",
			),

			readonly: B(
				"the field prints its value with no caret and no border change",
			),

			dense: B(
				"the dense arm tightens the row's air and keeps the field's height",
			),

			one: X("A field is one control."),

			many: X("A field is one control."),

			long: B(
				"a long value scrolls inside the field; the label wraps above it",
			),

			narrow: B("the field takes its column's width"),

			wide: B("the field takes its band's width up to its own measure"),

			incard: X("A field is inside its form's card."),

			noplate: X("A field has no evidence panel."),

			three: X("A field is one control."),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the label is the `s` step, the site's floor"),

			xl: X("A field prints no seal."),

			lone: X("A field is not a lone card."),

			noaction: B(
				"a field with no submit is a field - the arm the specimen sheet prints",
			),

			inband: B("the field is inside its form"),

			print: B("the field prints as a ruled box with its value"),
		},
	},

	{
		name: "DYNAMICLABEL",

		file: "COMPONENT/DYNAMIC/DYNAMICLABEL.TSX",

		note: "The label, with its two conditions stated on itself: `aria-required` and `aria-disabled` travel with the label, not only with the control.",

		cells: {
			...Mark("label"),

			rest: B(
				"the label's text at the `s` step, wired to its control by `htmlFor`",
			),

			empty: B(
				"an empty label prints the required mark alone - the caller's defect, and the block prints what it was given",
			),

			partial: B(
				"`Required` and `Disabled` are the label's two states: both are printed on the label's own attributes, which is the block's whole argument",
			),

			xs: B("the label is the `s` step at every size"),

			xl: X("A label is never the largest object on a surface."),

			print: B("the label prints above its field"),
		},
	},

	{
		name: "DYNAMICCHECKBOX",

		file: "COMPONENT/DYNAMIC/DYNAMICCHECKBOX.TSX",

		note: "The checkbox with its label and optional description, including the indeterminate state.",

		cells: {
			...Control("checkbox"),

			one: X("A checkbox is one control."),

			many: X(
				"A checkbox is one control; a set of them is a field group.",
			),

			long: B(
				"a long label wraps beside the box; the box stays on the first line",
			),

			narrow: B("the label wraps under the box below `md`"),

			wide: B("the row keeps its measure"),

			incard: X("The checkbox is inside its form's card."),

			noplate: X("A checkbox has no evidence panel."),

			three: X("A checkbox is one control."),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the box is the ladder's `2` and its label the `s` step"),

			xl: X("A checkbox prints no seal."),

			lone: X("A checkbox is not a lone card."),

			noaction: B(
				"a checkbox with no submit is a control - the arm the specimen sheet prints",
			),

			inband: B("the checkbox is inside its form"),

			print: B("the box prints as a ruled square with its mark"),
		},
	},

	{
		name: "DYNAMICBUTTON",

		file: "COMPONENT/DYNAMIC/DYNAMICBUTTON.TSX",

		note: "The button: four variants, three sizes, an icon registry and the loading state that keeps its width.",

		cells: {
			...Control("button"),

			empty: B(
				"a button with no label prints its icon alone and carries an `aria-label` - the arm the icon registry exists for",
			),

			loading: B(
				"the loading arm keeps the button's width and replaces its label with the vocabulary's word; the button is disabled while it runs",
			),

			disabled: B(
				"the disabled arm keeps the label's ink at the muted step and drops the fill",
			),

			readonly: X(
				"A button is not editable: it is a control, and `read-only` is a field's state.",
			),

			dense: B(
				"the three sizes ARE the density ladder: `sm`, `md`, `lg`",
			),

			one: X("A button is one control."),

			many: X(
				"A button is one control; a row of them is the artifact's action row.",
			),

			long: B(
				"a long label wraps and the button grows; it never truncates a verb",
			),

			narrow: B(
				"the button takes the column's width when its host asks (`block`)",
			),

			wide: B("the button keeps its own width"),

			incard: X("The button is inside the artifact's card."),

			noplate: X("A button has no evidence panel."),

			three: X("A button is one control."),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the label is the `s` step at every size"),

			xl: X("A button prints no seal."),

			lone: X("A button is not a lone card."),

			noaction: X(
				"A button IS an action: the no-action arm is the artifact not mounting one.",
			),

			inband: B("the button is inside the artifact"),

			print: B("the button prints as its label and its destination"),
		},
	},

	{
		name: "DYNAMICBADGE",

		file: "COMPONENT/DYNAMIC/DYNAMICBADGE.TSX",

		note: "One word in a Jelly badge with an optional protocol dot. LAB ONLY - the specimen sheet is its only importer.",

		cells: {
			...Mark("badge"),

			rest: B(
				"the word at 13px with the site's light fill and dark -700 ink; the dot is the state square at the badge step in the protocol's own ink",
			),

			empty: B(
				"an empty label prints the badge's fill and the dot alone - a chip with no word is the caller's defect and the block prints what it was given",
			),

			partial: B(
				"a dot whose protocol the map does not know prints no dot: an unknown protocol is not allowed to claim an ink",
			),

			xs: B(
				"the badge IS the family's 16px arm: its type is 13px and its dot the ladder's `3`",
			),

			xl: X("A badge is never the largest object on a surface."),

			print: B(
				"the badge prints as a bracketed word with its fill dropped",
			),
		},
	},

	{
		name: "DYNAMICCARD",

		file: "COMPONENT/DYNAMIC/DYNAMICCARD.TSX",

		note: "A Jelly card with three optional sections. LAB ONLY - the specimen sheet is its only importer, and it is a parallel card vocabulary to the homepage's record cards.",

		cells: {
			...Printed(
				"generic card",

				"its three sections are props resolved before the page exists",
			),

			empty: B(
				"a card with no sections prints its Jelly surface and nothing in it - a white box on the field, which is the arm the specimen sheet prints as its own warning",
			),

			partial: B(
				"a card with a header and no body prints the header and the footer; each section is conditional",
			),

			dense: B(
				"the card has no density of its own: Jelly's `--jelly-card-padding-*` are the host's",
			),

			one: X("A card is one surface."),

			many: X(
				"A card is one surface; a set of them is the grid that holds them.",
			),

			long: B(
				"the body wraps in the card's measure; the title is the `s` step and wraps",
			),

			narrow: B("the card takes its column's width"),

			wide: B(
				"the card takes its host's width; it has no maximum of its own",
			),

			incard: X(
				"A card inside a card is the one composition the identity forbids.",
			),

			noplate: X("A card has no evidence panel."),

			three: X("A card is one surface."),

			nine: X("Nine tiles is the stack's composition."),

			xs: X("A card prints no mark."),

			xl: X("A card prints no seal."),

			lone: B("a lone card is a card"),

			noaction: B(
				"a card with no footer prints two sections and closes on its body",
			),

			inband: B("the card is composed on the field by its host"),

			print: B("the card prints as a white insert"),
		},
	},

	{
		name: "DYNAMICBLOGCARD",

		file: "COMPONENT/DYNAMIC/DYNAMICBLOGCARD.TSX",

		note: "One blog entry as a card: tags, title, three-line summary, author and read time. LAB ONLY - `/Blog` prints `BlogIndex`'s own card, which carries the same five facts and the record grammar this one lacks.",

		cells: {
			...Leaf("article card", "the index that repeats it"),

			empty: B(
				"an entry with no tags prints no tag row; an entry with no summary prints an empty paragraph - the block does not state the absence, which is one of the reasons the live index does not use it",
			),

			partial: B(
				"an entry with no read time prints `0 min read` - the block's own defect, recorded in `Observations`",
			),

			dense: B(
				"the card's `line-clamp-3` on the summary IS its dense arm: the card has a fixed height at any summary length",
			),

			long: B(
				"a long title wraps at the `s` step and the summary clamps; a title longer than three lines is cut by the card's own height, which is the defect the live index's card was written to avoid",
			),

			narrow: B(
				"the card takes its column's width; the author and read time wrap under each other",
			),

			wide: B(
				"the card takes its host's width; it has no maximum of its own",
			),

			incard: X("The card IS a surface; a card around it would be two."),

			noplate: X("An article card has no evidence panel."),

			three: B("three cards are a row of three"),

			nine: B(
				"nine cards are the blog index's own grid, which is eight - a ninth joins it",
			),

			xs: B("the tags are the `s` step"),

			xl: X("An article card prints no seal."),

			lone: B("a lone card is an index of one"),

			noaction: B(
				"the card's title is not a link: the live index's card is the anchor, and this block's lack of one is recorded in `Observations`",
			),

			inband: B("the card is composed by the index"),

			print: B("the card prints; the clamp is released on paper"),
		},
	},

	{
		name: "DYNAMICTABLE",

		file: "COMPONENT/DYNAMIC/DYNAMICTABLE.TSX",

		note: "A table from a column list and a row list. LAB ONLY - the specimen sheet is its only importer, and `RecordMatrix` is the layer's own matrix.",

		cells: {
			...Printed(
				"table",

				"its columns and rows are props resolved before the page exists",
			),

			empty: B(
				"a table with no rows prints its head and no body - the honest arm for a set of none, and the one a `RecordMatrix` improves on with a stated absence",
			),

			partial: B(
				"a cell whose value is unknown prints `UNAVAILABLE`; the block prints what the row carries",
			),

			dense: B(
				"`Compact` is the block's own tight arm, and `Striped` is its second reading",
			),

			one: B("one row prints one row under the head"),

			many: B(
				"twelve rows print twelve; the table has no cap and the page scrolls",
			),

			long: B(
				"a long cell wraps; the table's `overflow-x-auto` keeps a wide set scrollable rather than squashed",
			),

			narrow: B(
				"the table scrolls horizontally inside its own frame - the arm the specimen sheet prints",
			),

			wide: B("the table takes its host's width"),

			incard: X("A table is a band's body, not a card."),

			noplate: X("A table has no evidence panel."),

			three: B("three rows print three rows"),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the head's labels are the `s` step"),

			xl: X("A table prints no seal."),

			lone: B("a table of one row is a table"),

			noaction: B(
				"`OnRowClick` is optional: a table with no handler prints its rows as facts",
			),

			inband: B("the table is a band's body"),

			print: B("the table prints; its scroll frame becomes page breaks"),
		},
	},

	{
		name: "DYNAMICRICHTEXT",

		file: "COMPONENT/DYNAMIC/DYNAMICRICHTEXT.TSX",

		note: "One string parsed: a blank line is a paragraph and a backtick is code. LAB ONLY - a one-line island around `UI/RichText`.",

		cells: {
			...Printed(
				"rich text",

				"the string is a prop and the parser is pure",
			),

			empty: B(
				"an empty string prints an empty block - the caller's defect, and the block prints nothing rather than a placeholder",
			),

			partial: B(
				"an unclosed backtick prints as literal text; the parser never invents a close",
			),

			dense: B(
				"the prose's density is its host's: the block sets no type of its own beyond the parser's roles",
			),

			one: B("one paragraph prints one paragraph"),

			many: B("twelve paragraphs print twelve; the block has no cap"),

			long: B("a long paragraph wraps at its host's measure"),

			narrow: B("the prose takes its column's width"),

			wide: B("the prose caps at its host's measure"),

			incard: B(
				"the prose is printed inside whatever card its host owns",
			),

			noplate: X("Rich text has no evidence panel."),

			three: B("three paragraphs print three"),

			nine: X("Nine tiles is the stack's composition."),

			xs: B("the code spans are the `s` step"),

			xl: X("Rich text prints no seal."),

			lone: B("one paragraph is the lone arm"),

			noaction: B("rich text carries no action"),

			inband: B("the prose is a band's body"),

			print: B("the prose prints"),
		},
	},

	{
		name: "MERMAIDFALLBACK",

		file: "COMPONENT/DYNAMIC/MERMAIDFALLBACK.ASTRO",

		note: "The client-side Mermaid fallback: it catches diagram blocks the build-time plugin could not resolve and draws them in the browser. Live on the two markdown routes.",

		cells: {
			...Island(
				"diagram fallback",

				"the diagrams it draws arrive as `<pre>` blocks and are rendered on the client",
			),

			empty: B(
				"no unresolved block prints nothing at all - the fallback's script finds none and the page is unchanged, which is the arm 102 of the last measurement took",
			),

			loading: B(
				"the block prints its own frame while the library draws; the frame is the diagram's box, so the page does not shift",
			),

			partial: B(
				"a diagram whose source the library cannot parse prints the error arm with the source and the reason",
			),

			error: B(
				"a failed draw prints `mermaid-fb-error` with the message - the one place in this family with a hand-typed colour (`#d1242f`), recorded in `Observations`",
			),

			stale: X("A diagram is a drawing, not a fact with an age."),

			disabled: X("A diagram is not a control."),

			readonly: X("A diagram is read-only by construction."),

			dense: B(
				"the diagram's density is its own scale; the frame's padding is the block's",
			),

			one: B("one diagram prints one frame"),

			many: B("twelve diagrams print twelve frames"),

			long: B(
				"a long diagram scrolls horizontally inside its frame (`overflow-x: auto`)",
			),

			narrow: B(
				"the diagram scales to its frame's width (`max-width: 100%`)",
			),

			wide: B("the diagram caps at its frame's measure"),

			incard: B("the diagram is printed inside the prose's column"),

			noplate: X("A diagram has no evidence panel."),

			three: B("three diagrams print three frames"),

			nine: X("Nine tiles is the stack's composition."),

			xs: B(
				"the error's type is `0.85em` of the prose's, which is the one place in this family below the `s` floor - recorded in `Observations`",
			),

			xl: X("A diagram prints no seal."),

			lone: B("one diagram is the lone arm"),

			noaction: B("a diagram carries no action"),

			inband: B("the diagram is inside the article's prose"),

			print: B(
				"the fallback's frame prints; a diagram the build resolved prints as its own SVG",
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

		value: "CONTENT/SPECIMEN/COMPOSITION.TS",

		note: "every figure above is counted from the three tables in this file",
	},
];

/* ─── THE IMPROVEMENTS ───────────────────────────────────────────────────── */

/** One behaviour the matrix revealed, and where it now lives. */
export interface Improvement {
	/** `FEATUREBAND` - the component the behaviour is in. */
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
		component: "FIELDRECORDEVIDENCE",

		from: "NO PLATE",

		found: 'A hero with no evidence image rendered a browser error inside a 51% panel. `Plate.src` was a required string, so the only way to say "this evidence has not been photographed" was to pass `src=""`, and an `<img>` with an empty source draws the browser\'s broken-image glyph - a torn icon in a 40dvh box - while the caption underneath went on describing a photograph that was not there. The panel is half the artifact: an absence it cannot draw is an absence it cannot survive.',

		built: "`src` is optional and the block has three arms. `rest` is the photograph, unchanged. `absent` keeps the frame, the measure and the place in the pair, and prints the grammar's `◎`, the row `PLATE: UNAVAILABLE` and - under it - the description that would have been the image's alt: the sentence a reader needs is the sentence the alt already carried, so nothing is invented and nothing is lost. `loading` prints the same frame with three barred rules, drawn in the record grammar rather than as a spinner. The absence is announced with `role=\"img\"` and the description as its accessible name, so a reader who cannot see the panel gets the same sentence either way.",
	},

	{
		component: "DYNAMICHEROSECTION",

		from: "NO PLATE",

		found: "The pair is the keeper: 49fr 1px 51fr with the hairline in the middle track. A missing plate collapsed the evidence panel's height to its caption and the pair became a card with a caption beside it - the ratio still declared, the artifact gone. The keeper's geometry had no adverse state because the geometry assumed a photograph.",

		built: 'The pair publishes `data-plate="rest|absent"` and the evidence panel keeps its 51%, its height and its caption in both arms; what changes is what the panel contains, not what it measures. The caption and the provenance are still printed under the frame, because they are the claim of what the evidence is *of*, and that claim outlives the evidence itself.',
	},

	{
		component: "FEATUREBAND",

		from: "THREE",

		found: "The proof band's matrix was `repeat(3)` from `lg` and `repeat(2)` from `md` - a distribution that divides six and nothing else. Printed with three records it answered 2 + 1 at every width below `lg`: a hole in the seam where the fourth cell would have been, which reads as a plate that lost a record rather than one that files three. And a plate of three looked exactly like a plate of six to a reader who had not counted.",

		built: "`cards` is a prop and the band publishes its ceiling (`Ceiling`, as `--row-tracks` and `data-tracks`): a set that divides three is composed for three, one that divides two is composed for two. The count it actually PRINTS is the record's capacity - the grid is the shell's capacity row, and one record measures 23rem - so six records print two tracks at every desktop width and one below 801px. The grid still publishes `data-count`, `data-tracks` and `data-remainder`, but a short last line needs no rule: the row shares its free space with `flex-grow`, so a lone record closes the seam at full width and a remainder of two prints as a pair at half each. A subset also prints its figure under the grid - `# RECORDS / 03` and `SELECTION: 03 OF 06` - built from the two arrays, so the number cannot outlive the set.",
	},

	{
		component: "FEATUREBAND",

		from: "EMPTY",

		found: "A set of none printed an empty grid: the band's head, then nothing, then the observation strip. A page whose content module failed to resolve looked like a page whose band had been switched off - the layout had no way to say \"there is nothing here\", which is the brief's empty rule stated exactly backwards.",

		built: "`RECORDS: UNAVAILABLE` and one sentence where the matrix would be, at the matrix's own measure and on the record layer's hairline. The band's head still prints, so the chapter is still announced; only the plate is stated rather than drawn.",
	},

	{
		component: "DYNAMICHEROSECTION",

		from: "NINE",

		found: "The stack's grid was two columns below a container query and four above it, with the arithmetic in the partial's head measuring exactly the eight tiles the strip was built for. Nine tiles in four columns leaves a row of one; nine in two leaves a row of one; and nine in a narrow card left a row of one that also ellipsized five of its names. A legend with a gap in it reads as a legend that lost a tile.",

		built: "The column count is derived from the set (`Content/Home/Stack.ts:StackTracks`): four divides eight, three divides nine, one tile is one row. The partial reads that number as a CEILING rather than an assertion - `flex: 1 1 var(--stack-floor)` with `max-inline-size: var(--stack-ceil)` - so the set's own count is the most a row can hold and the width decides only whether it still fits. A short last row keeps its tiles track-wide instead of stretching an orphan across the strip. The label gained the set's figure (`TECH STACK␁08 TILES`), because a legend is a set and a set has a count.",
	},

	{
		component: "FIELDRECORDSEAL",

		from: "AT 16",

		found: "The seal is drawn in a 64-unit viewBox with two stroke weights, 1 and 0.5 - user units, which scale with the box. At 64px they are a pixel and half a pixel and the mark is an engraving; at 32px they are 0.5px and 0.25px; at 16px they are 0.25px and 0.125px. The 16px arm rendered a green smudge with a ring-shaped rumour around it, and the two elements whose devices are a LINE rather than a disc - `Grove`'s trunk, `Mountain`'s peaks - disappeared entirely. The ladder's smallest step was 32px and it was already at the edge of legibility.",

		built: "The ladder gained `xs` (16px) and the two small steps are drawn at ONE weight: `Mark/_Seal.scss` sets `stroke-width: 4` at `xs` and `2` at `s` on every stroked shape inside the mark, which is 1px at both steps. The two-ring engraving becomes the form's single outline, and the seal still reads as a seal because a seal is a roundel with a device in it, not a roundel with two hairlines in it. The correction is CSS rather than a second drawing: eight elements times two weight-sets would be sixteen drawings to keep in step.",
	},

	{
		component: "FIELDRECORDSEAL",

		from: "AT 240",

		found: 'The ladder stopped at 64px - "a seal at the head of a page" - and had no step for the mark as the artifact itself. A host that wanted the roundel at display size had to pass a number, and `Step()` mapped every number above 56 to `l`, so 240px quietly became 64px. The mark could be an anchor on a page and nothing else.',

		built: "The ladder gained `xl` (240px, `--mark-size-10`) with its meaning stated: the seal AS the plate. At that size a unit is 3.75px and the authored pair of weights is the engraving again, so the step needs no correction - which is the finding: the drawing is right at every size at or above its authored one, and wrong at every size below it. The block keeps `pointer-events: none` and `aria-hidden` at `xl`: a plate-sized seal authenticates the artifact it stands in; it is not a link.",
	},

	{
		component: "PLATFORMBAND",

		from: "EMPTY",

		found: 'A manifest with no artefact printed an empty white plate. On the creme field a white insert with nothing on it does not read as "nothing to ship" - it reads as a build that lost its data, which is the opposite of what the page\'s own masthead says in words. The plate had no adverse state because the page always had three platforms.',

		built: "`cards` is a prop and a set of none keeps the plate - the white surface is the artifact's - and states three facts in the vocabulary at the row's own inset: `ARTIFACTS: UNAVAILABLE`, the sentence that says every build is made from source, and `CHANNEL: SOURCE`. A plate of none and a plate of three are now the same object with different contents.",
	},

	{
		component: "BAND",

		from: "MANY",

		found: "The band's series index was written into the template as `_01`. Every band on the page is the first of its series, so nothing had ever gone wrong - but the grammar is `# OBSERVATION_01`, and a page that filed its observations in two movements would have printed `# OBSERVATION_01` twice: two records claiming one index, which is the register defect the brief names in §4.1.",

		built: "`index` is a prop, defaulting to `01`. The number is the caller's because a band's position in a series is a fact about the page and not about the shell; the mark and the separator stay the block's.",
	},

	{
		component: "FIELDRECORDMETADATA",

		from: "EMPTY",

		found: "Given neither `pairs` nor `rows` the block renders an empty `<dl>`: no mark, no word, no sentence. It is the only block in this family whose empty arm is silence, and it is silent because two hosts pass a mapped array that may be empty and neither has ever been asked what the absence means.",

		built: "Nothing - and that is the entry's honest content. The block is read by `FieldRecord` (which only mounts it when `record.Metadata` has rows) and by the hero's card (which passes three facts), so the silent arm is unreachable from the site and reachable only from a new caller. It is recorded in `Observations` with the argument for leaving it: a block that grew an absence sentence it never prints would be a block with a third arm nothing tests.",
	},
];

/* ─── THE OBSERVATIONS ───────────────────────────────────────────────────── */

/** Something the exploration found and this card did not change, with whose it is. */
export interface Observation {
	/** The component the observation is about. */
	readonly component: string;

	/** What was found, in the sheet's voice. */
	readonly found: string;

	/** Whose decision it is, and what the decision is. */
	readonly owner: string;
}

/**
 * The five things this card did not fix.
 *
 * An observation is not a defect list - it is the part of the exploration that
 * belongs to someone else. Three of the five are in blocks this card does not own
 * (the blog card, the Mermaid fallback, the verification panel); one is a
 * decision about ten files; one is a signature another host depends on.
 */
export const Observations: readonly Observation[] = [
	{
		component: "DYNAMICBLOGCARD",

		found: "The block prints `${ReadTime} min read` and an entry with no read time therefore prints `0 min read` - a zero where the vocabulary has `UNAVAILABLE`. Its title is also not a link: the card is a `<article>` and the anchor that makes it a card is `BlogIndex`'s, which is why the live index does not use it.",

		owner: "`/Blog`'s surface owner. The fix is two lines and it belongs with the block's disposition: if the card is adopted, the read time becomes `RegisterUnavailable` and the title becomes the anchor; if it is retired, neither is worth doing.",
	},

	{
		component: "MERMAIDFALLBACK",

		found: "The block carries a hand-typed colour (`#d1242f`) for its error arm and a `0.85em` type size for the same line - the one place in this family below the 13px floor and the one place a colour is typed by hand. Both are inside an Astro `<style>` block that no token reaches.",

		owner: "The block's owner, and it is a small, contained edit: `--Destruct` for the ink and `--type-meta` for the size. This card did not make it because the fallback's style block is scoped to the component and the token names are the Type and Token layers' API, which is a different card's surface.",
	},

	{
		component: "DYNAMICVERIFICATIONINFO",

		found: "The copy confirmation is a `window.alert()` - a browser modal on a page that has spent four layers of design on not being a browser. It is the only `alert()` in the component tree.",

		owner: "Whoever decides the block's disposition. A copy confirmation is a state on the button (`COPIED` for two seconds, in the vocabulary) and that state is worth building only if the block is kept.",
	},

	{
		component: "THE DYNAMIC LAYER",

		found: "Ten of the thirty-five `Dynamic/*` parts have no production importer: six are mounted only by this specimen sheet and four by nothing at all. Eleven duplicate a block that already exists. That is not a defect any single card can fix - it is a decision about the layer, and it is stated in `Verdicts` with each part's importers.",

		owner: "The owner. The three decisions are named in `Verdicts`: adopt (and give the part a page), fold (and give its capability to the block that already has it), or retire (and record the deletion). This card removed nothing.",
	},

	{
		component: "FIELDRECORDMETADATA",

		found: "Given neither `pairs` nor `rows` the block renders an empty `<dl>`: no mark, no word, no sentence. Its own `Type.ts` says the opposite - \"a caller that writes neither gets no list at all rather than an empty `dl`\" - so the block's doc and the block's behaviour have disagreed for as long as the file has existed, and nobody noticed because both hosts always pass rows.",

		owner: "The Brand family's owner, if a caller ever passes nothing. The arm is unreachable from the site (both hosts pass a mapped array that is never empty) and reachable from any new caller, and the two honest fixes are a prop (`empty`) or a `length === 0` guard. This card did neither: the signature is another host's and the behaviour is documented in the matrix's `EMPTY` cell, so the decision stays visible without a worker changing a contract two pages depend on.",
	},
];

/* ─── THE VERDICTS ───────────────────────────────────────────────────────── */

/**
 * What a `Dynamic/*` part is, measured rather than assumed.
 *
 *   live       a page or a live block imports it
 *   lab        only this specimen sheet imports it
 *   orphaned   nothing in the tree imports it
 *   duplicate  it re-implements a block that already exists (a flag, not a
 *              fourth state - a part can be live AND duplicate)
 */
export type Disposition = "live" | "lab" | "orphaned";

/** One part's verdict: what it is, who mounts it, and what is asked of the owner. */
export interface Verdict {
	/** `DYNAMICFOOTER` - the part's name in the sheet's register. */
	readonly name: string;

	/** The file, relative to `Source/`, upper case. */
	readonly file: string;

	/** Whether a production surface mounts it. */
	readonly state: Disposition;

	/** Every importer, as the tree has them at this commit. */
	readonly mounted_by: readonly string[];

	/** The block it duplicates, where it duplicates one. */
	readonly duplicate?: string;

	/** What the part is, in one line. */
	readonly note: string;

	/** What the owner is being asked to decide. */
	readonly decision: string;
}

/**
 * The thirty-five `Dynamic/*` parts, in the order the matrix lists them.
 *
 * The uncomfortable answer, stated: twenty-five are live, six are mounted only by
 * this sheet, four by nothing, and twelve duplicate a block that already exists.
 * The `decision` line is an ASK, not a proposal - this card deleted nothing, and
 * a file with no importer is a decision the owner has not made yet.
 */
export const Verdicts: readonly Verdict[] = [
	{
		name: "DYNAMICHEROSECTION",

		file: "COMPONENT/DYNAMIC/DYNAMICHEROSECTION.TSX",

		state: "live",

		mounted_by: ["PAGES/INDEX.ASTRO"],

		note: "The homepage hero: the keeper pair, the trace and the stack.",

		decision:
			"None. It is the page's opening and the programme's endorsed artifact; this card strengthened it and changed nothing a page prints.",
	},

	{
		name: "DOWNLOADMASTHEAD",

		file: "COMPONENT/DYNAMIC/DOWNLOADMASTHEAD.ASTRO",

		state: "live",

		mounted_by: ["PAGES/DOWNLOAD.ASTRO"],

		note: "The Download page's opening: glyph, h1, one sentence, a row of claim marks.",

		decision:
			"None. It is a keeper, named in `KEEPERS.md`; this card read it and did not touch it.",
	},

	{
		name: "DYNAMICHEADER",

		file: "COMPONENT/DYNAMIC/DYNAMICHEADER.TSX",

		state: "orphaned",

		mounted_by: [],

		duplicate: "LAYOUT/HEADER",

		note: "The legacy schema-driven header, reduced to an adapter that renders `Layout/Header` and nothing else.",

		decision:
			"Retire or adopt. It has no importer and its whole body is now a translation layer between an old schema and the bar; if no page carries the old schema, the file is a translator for a language nothing speaks.",
	},

	{
		name: "DYNAMICFOOTER",

		file: "COMPONENT/DYNAMIC/DYNAMICFOOTER.TSX",

		state: "orphaned",

		mounted_by: [],

		duplicate: "LAYOUT/FOOTER + FOOTER/DATA.TS",

		note: "A schema-driven footer with its own social glyphs, 190 lines.",

		decision:
			"Retire. Every page wears `Layout/Footer`, whose five facts are a `RecordLedger` and whose closing is the `/Contents` part; a second footer with its own glyph set is a second closing record, and two closing records is the one thing the record grammar cannot have.",
	},

	{
		name: "DYNAMICDOCSIDEBAR",

		file: "COMPONENT/DYNAMIC/DYNAMICDOCSIDEBAR.TSX",

		state: "live",

		mounted_by: ["COMPONENT/DOC/DOCLAYOUT.ASTRO"],

		duplicate: "DOC/DOCCONTENTS (the rail's register)",

		note: "The documentation tree as a panel, mounted below 1024px where the rail is not painted.",

		decision:
			"Keep, and read the duplication as deliberate: the panel is the rail's own tree in a second register, which is the responsive arm rather than a copy. It is 630 lines for a tree, which is the part worth a second look.",
	},

	{
		name: "DYNAMICPORTAL",

		file: "COMPONENT/DYNAMIC/DYNAMICPORTAL.TSX",

		state: "orphaned",

		mounted_by: [],

		duplicate: "PAGES/PORTAL.ASTRO + CONTENT/SURFACE/PORTAL.TS",

		note: "The four connection tiers as a pricing surface. 1,556 lines - the largest file in the family.",

		decision:
			"Retire, with the capability preserved: `/Portal` composes the tiers itself from `Content/Surface/Portal.ts` and prints the four protocols as a table. This is the single largest piece of dead code on the site and the one the owner should rule on first.",
	},

	{
		name: "DYNAMICTRANSPARENCY",

		file: "COMPONENT/DYNAMIC/DYNAMICTRANSPARENCY.TSX",

		state: "live",

		mounted_by: ["PAGES/DOWNLOAD.ASTRO"],

		duplicate: "RECORDLEDGER (its items are a ledger)",

		note: "The telemetry-transparency panel: what is measured, what is not, and the switch.",

		decision:
			"Keep. The duplication is a ledger's, which is the Record layer being used rather than copied.",
	},

	{
		name: "DYNAMICVERIFICATIONINFO",

		file: "COMPONENT/DYNAMIC/DYNAMICVERIFICATIONINFO.TSX",

		state: "orphaned",

		mounted_by: [],

		duplicate: "COMPONENT/DYNAMIC/DOWNLOAD/VERIFY.ASTRO",

		note: "Checksums and signatures with a copy button, driven by `react-i18next`.",

		decision:
			"Retire or fold. `/Download` prints its checksums through `Download/Verify.astro`, which is live and which already carries the copy control; this file's one distinctive fact is its `alert()` confirmation, which is the wrong shape for the site.",
	},

	{
		name: "ACCOUNTPAGE",

		file: "COMPONENT/DYNAMIC/ACCOUNTPAGE.TSX",

		state: "live",

		mounted_by: [
			"PAGES/ACCOUNT/FORGOTPASSWORD.ASTRO",

			"PAGES/ACCOUNT/RESETPASSWORD.ASTRO",
		],

		note: "The account surface's shell, choosing one of four password screens by route.",

		decision:
			"Keep. It is the shell the two password routes share and the reason they print one head.",
	},

	{
		name: "AUTH0ACCOUNT",

		file: "COMPONENT/DYNAMIC/AUTH0ACCOUNT.TSX",

		state: "live",

		mounted_by: [
			"PAGES/ACCOUNT/SIGNIN.ASTRO",

			"PAGES/ACCOUNT/SIGNUP.ASTRO",
		],

		note: "The Auth0 provider boundary for the two credential screens.",

		decision:
			"Keep. A provider boundary is not a duplicate of anything: it is the seam where a third-party session enters the page.",
	},

	{
		name: "AUTH0ACCOUNTGATE",

		file: "COMPONENT/DYNAMIC/AUTH0ACCOUNTGATE.TSX",

		state: "live",

		mounted_by: ["COMPONENT/DYNAMIC/AUTH0ACCOUNT.TSX"],

		note: "The gate in front of the account surfaces: prompt, loading or screen.",

		decision: "Keep. It is where `DynamicStateReport` earns its keep.",
	},

	{
		name: "AUTH0CALLBACKHANDLER",

		file: "COMPONENT/DYNAMIC/AUTH0CALLBACKHANDLER.TSX",

		state: "live",

		mounted_by: ["PAGES/OAUTH/SUCCESS.ASTRO"],

		note: "The OAuth callback: reads the code, exchanges it, states the outcome.",

		decision: "Keep. It is one route's whole body.",
	},

	{
		name: "VERIFYPAGE",

		file: "COMPONENT/DYNAMIC/VERIFYPAGE.TSX",

		state: "live",

		mounted_by: ["PAGES/VERIFY.ASTRO"],

		note: "The `/Verify` surface: the email-verification screen and its five outcomes.",

		decision: "Keep.",
	},

	{
		name: "DYNAMICACCOUNTPROFILE",

		file: "COMPONENT/DYNAMIC/DYNAMICACCOUNTPROFILE.TSX",

		state: "live",

		mounted_by: ["PAGES/ACCOUNT/INDEX.ASTRO"],

		note: "The reader's own facts, their provider and their sessions. 1,098 lines.",

		decision:
			"Keep, and note the size: it is the second-largest file in the family and the one most likely to be hiding a second surface.",
	},

	{
		name: "DYNAMICDASHBOARDUSER",

		file: "COMPONENT/DYNAMIC/DYNAMICDASHBOARDUSER.TSX",

		state: "live",

		mounted_by: ["PAGES/DASHBOARD.ASTRO"],

		note: "The dashboard's record: identity, the scan's state and the one thing the page is for.",

		decision: "Keep.",
	},

	{
		name: "DYNAMICLOCALFIRSTSCAN",

		file: "COMPONENT/DYNAMIC/DYNAMICLOCALFIRSTSCAN.TSX",

		state: "live",

		mounted_by: ["PAGES/DASHBOARD.ASTRO"],

		note: "The local-first scan: what the editor found on this machine, one state per probe.",

		decision:
			"Keep. It is the only surface on the site whose per-row loading state is the design rather than a fallback.",
	},

	{
		name: "DYNAMICAUTHHEADER",

		file: "COMPONENT/DYNAMIC/DYNAMICAUTHHEADER.TSX",

		state: "live",

		mounted_by: ["PAGES/ACCOUNT/INDEX.ASTRO", "PAGES/DASHBOARD.ASTRO"],

		note: "The header with the auth status inside it.",

		decision:
			"Keep. It is the bar plus the provider, which is one seam rather than a second bar.",
	},

	{
		name: "DYNAMICAUTHSTATUS",

		file: "COMPONENT/DYNAMIC/DYNAMICAUTHSTATUS.TSX",

		state: "live",

		mounted_by: ["COMPONENT/DYNAMIC/DYNAMICAUTHHEADER.TSX"],

		note: "The header's action: avatar and dropdown, a sign-in link, or a skeleton.",

		decision: "Keep.",
	},

	{
		name: "DYNAMICSTATEPORT",

		file: "COMPONENT/DYNAMIC/DYNAMICSTATEREPORT.TSX",

		state: "live",

		mounted_by: [
			"COMPONENT/DYNAMIC/AUTH0ACCOUNTGATE.TSX",

			"COMPONENT/DYNAMIC/DYNAMICACCOUNTPROFILE.TSX",

			"COMPONENT/DYNAMIC/DYNAMICDASHBOARDUSER.TSX",

			"COMPONENT/DYNAMIC/DYNAMICEMAILVERIFICATION.TSX",

			"COMPONENT/DYNAMIC/DYNAMICFORGOTPASSWORD.TSX",

			"COMPONENT/DYNAMIC/DYNAMICRESETPASSWORD.TSX",
		],

		duplicate: "SHELL/STATE (the nine adverse states)",

		note: "The one shape every account, verify and dashboard state branch renders. Six importers.",

		decision:
			"Keep, and read the duplication as a boundary: `ShellState` is the page's adverse state and `DynamicStateReport` is a control's. The two share a vocabulary and a tone table; they do not share a card.",
	},

	{
		name: "DYNAMICSIGNIN",

		file: "COMPONENT/DYNAMIC/DYNAMICSIGNIN.TSX",

		state: "live",

		mounted_by: ["COMPONENT/DYNAMIC/ACCOUNTPAGE.TSX"],

		note: "The sign-in form: email, password, the provider's buttons and the report's arms.",

		decision: "Keep.",
	},

	{
		name: "DYNAMICSIGNUP",

		file: "COMPONENT/DYNAMIC/DYNAMICSIGNUP.TSX",

		state: "live",

		mounted_by: ["COMPONENT/DYNAMIC/ACCOUNTPAGE.TSX"],

		note: "The sign-up form with the strength meter and the terms checkbox.",

		decision: "Keep.",
	},

	{
		name: "DYNAMICFORGOTPASSWORD",

		file: "COMPONENT/DYNAMIC/DYNAMICFORGOTPASSWORD.TSX",

		state: "live",

		mounted_by: ["COMPONENT/DYNAMIC/ACCOUNTPAGE.TSX"],

		note: "The recovery screen: one field, one submit, the sent arm.",

		decision: "Keep.",
	},

	{
		name: "DYNAMICRESETPASSWORD",

		file: "COMPONENT/DYNAMIC/DYNAMICRESETPASSWORD.TSX",

		state: "live",

		mounted_by: ["COMPONENT/DYNAMIC/ACCOUNTPAGE.TSX"],

		note: "The reset screen: two password fields, the meter, the token's three outcomes.",

		decision: "Keep.",
	},

	{
		name: "DYNAMICEMAILVERIFICATION",

		file: "COMPONENT/DYNAMIC/DYNAMICEMAILVERIFICATION.TSX",

		state: "live",

		mounted_by: ["COMPONENT/DYNAMIC/VERIFYPAGE.TSX"],

		note: "The verification screen: the six-digit code, the resend's cooldown, five outcomes.",

		decision: "Keep.",
	},

	{
		name: "DYNAMICCONTACTFORM",

		file: "COMPONENT/DYNAMIC/DYNAMICCONTACTFORM.TSX",

		state: "live",

		mounted_by: ["COMPONENT/CONTACT/CONTACTSHELL.ASTRO"],

		note: "The contact hub's form: thirteen request routes, the field set, the delivery state. 836 lines.",

		decision:
			"Keep. It is the site's one form with a route chooser, and the chooser is the reason the file is long.",
	},

	{
		name: "DYNAMICINPUT",

		file: "COMPONENT/DYNAMIC/DYNAMICINPUT.TSX",

		state: "live",

		mounted_by: [
			"COMPONENT/DYNAMIC/DYNAMICEMAILVERIFICATION.TSX",

			"COMPONENT/DYNAMIC/DYNAMICFORGOTPASSWORD.TSX",

			"COMPONENT/DYNAMIC/DYNAMICPORTAL.TSX",

			"COMPONENT/DYNAMIC/DYNAMICRESETPASSWORD.TSX",

			"COMPONENT/DYNAMIC/DYNAMICSIGNIN.TSX",

			"COMPONENT/DYNAMIC/DYNAMICSIGNUP.TSX",
		],

		note: "The field: label, input, helper text and error, with the two ARIA relations the error needs.",

		decision:
			"Keep. Six importers and the only block in the tree that wires `aria-invalid` to `aria-describedby`.",
	},

	{
		name: "DYNAMICLABEL",

		file: "COMPONENT/DYNAMIC/DYNAMICLABEL.TSX",

		state: "lab",

		mounted_by: ["PAGES/SPECIMEN.ASTRO"],

		note: "The label, with `aria-required` and `aria-disabled` stated on the label itself.",

		decision:
			"Adopt or fold. Its argument - that a label carries its control's conditions - is right and is printed nowhere in production: `DynamicInput` renders its own label inline. Folding it into `DynamicInput` is the one-line fix that would make the argument true.",
	},

	{
		name: "DYNAMICCHECKBOX",

		file: "COMPONENT/DYNAMIC/DYNAMICCHECKBOX.TSX",

		state: "live",

		mounted_by: ["COMPONENT/DYNAMIC/DYNAMICSIGNUP.TSX"],

		note: "The checkbox with its label, its description and the indeterminate state.",

		decision: "Keep.",
	},

	{
		name: "DYNAMICBUTTON",

		file: "COMPONENT/DYNAMIC/DYNAMICBUTTON.TSX",

		state: "live",

		mounted_by: [
			"COMPONENT/DYNAMIC/AUTH0ACCOUNTGATE.TSX",

			"COMPONENT/DYNAMIC/DYNAMICEMAILVERIFICATION.TSX",

			"COMPONENT/DYNAMIC/DYNAMICFORGOTPASSWORD.TSX",

			"COMPONENT/DYNAMIC/DYNAMICRESETPASSWORD.TSX",

			"COMPONENT/DYNAMIC/DYNAMICSIGNIN.TSX",

			"COMPONENT/DYNAMIC/DYNAMICSIGNUP.TSX",

			"COMPONENT/DYNAMIC/DYNAMICVERIFICATIONINFO.TSX",

			"COMPONENT/DYNAMIC/VERIFYPAGE.TSX",
		],

		note: "The button: four variants, three sizes, an icon registry, a loading state that keeps its width.",

		decision: "Keep. Eight importers.",
	},

	{
		name: "DYNAMICBADGE",

		file: "COMPONENT/DYNAMIC/DYNAMICBADGE.TSX",

		state: "lab",

		mounted_by: ["PAGES/SPECIMEN.ASTRO"],

		duplicate: "UI/BADGE -> JELLY-BADGE",

		note: "One word in a Jelly badge with an optional protocol dot.",

		decision:
			"Fold. It is a fifteen-line adapter around `UI/Badge` that adds a dot and a four-entry colour map; the site prints its badges as `<jelly-badge>` with inline properties everywhere else, so this adapter's only unique fact is its dot, which is the mark layer's square.",
	},

	{
		name: "DYNAMICCARD",

		file: "COMPONENT/DYNAMIC/DYNAMICCARD.TSX",

		state: "lab",

		mounted_by: ["PAGES/SPECIMEN.ASTRO"],

		duplicate:
			"THE RECORD LAYER'S CARD ANATOMY (FIELDRECORDDATACARD, FEATURECARD)",

		note: "A Jelly card with three optional sections.",

		decision:
			"Retire or adopt. It is a second card vocabulary: the homepage's records are `FeatureCard` and `ElementCard`, the brand's is `FieldRecordDataCard`, and none of them is this. A page that adopted it would print cards with no grammar in them.",
	},

	{
		name: "DYNAMICBLOGCARD",

		file: "COMPONENT/DYNAMIC/DYNAMICBLOGCARD.TSX",

		state: "lab",

		mounted_by: ["PAGES/SPECIMEN.ASTRO"],

		duplicate: "BLOG/BLOGINDEX'S OWN CARD",

		note: "One blog entry as a card: tags, title, summary, author, read time.",

		decision:
			"Retire. `/Blog` prints `BlogIndex`'s card, which carries the same five facts plus the record grammar and the anchor; this one prints `0 min read` for an entry with no read time and its title is not a link.",
	},

	{
		name: "DYNAMICTABLE",

		file: "COMPONENT/DYNAMIC/DYNAMICTABLE.TSX",

		state: "lab",

		mounted_by: ["PAGES/SPECIMEN.ASTRO"],

		duplicate: "RECORD/RECORDMATRIX",

		note: "A table from a column list and a row list.",

		decision:
			"Fold. `RecordMatrix` is the layer's matrix and prints the record grammar in its head; this block is a generic table with no mark, no register and an empty arm that renders a head with no body.",
	},

	{
		name: "DYNAMICRICHTEXT",

		file: "COMPONENT/DYNAMIC/DYNAMICRICHTEXT.TSX",

		state: "lab",

		mounted_by: ["PAGES/SPECIMEN.ASTRO"],

		duplicate: "UI/RICHTEXT",

		note: "A one-line client island around `UI/RichText`.",

		decision:
			"Keep. It is the documented bridge for a translated string with `\\n\\n` and backticks, and a one-line adapter that exists because a page needs `client:visible` is a seam rather than a duplicate.",
	},

	{
		name: "MERMAIDFALLBACK",

		file: "COMPONENT/DYNAMIC/MERMAIDFALLBACK.ASTRO",

		state: "live",

		mounted_by: ["PAGES/BLOG/[SLUG].ASTRO", "PAGES/DOC/[...SLUG].ASTRO"],

		duplicate: "THE BUILD-TIME REMARK MERMAID PLUGIN",

		note: "The client-side diagram fallback for blocks the build-time plugin could not resolve.",

		decision:
			"Keep. It is the second half of a two-stage mechanism rather than a copy of the first: 102 SVGs are vendored and none of the sixteen diagrams resolved to one at the last measurement, which is the fallback earning its place.",
	},
];

/** How many parts are live. */
export const LiveCount = Verdicts.filter(
	(Verdict) => Verdict.state === "live",
).length;

/** How many are mounted only by this sheet. */
export const LabCount = Verdicts.filter(
	(Verdict) => Verdict.state === "lab",
).length;

/** How many nothing imports. */
export const OrphanCount = Verdicts.filter(
	(Verdict) => Verdict.state === "orphaned",
).length;

/** How many re-implement a block that already exists. */
export const DuplicateCount = Verdicts.filter(
	(Verdict) => Verdict.duplicate !== undefined,
).length;

/** The verdicts' own register rows, derived from the list above. */
export const VerdictRegister = (): readonly {
	key: string;

	value: string;
}[] => [
	{ key: "PARTS:", value: String(Verdicts.length) },

	{ key: "LIVE:", value: String(LiveCount) },

	{ key: "LAB ONLY:", value: String(LabCount) },

	{ key: "ORPHANED:", value: String(OrphanCount) },

	{ key: "DUPLICATING:", value: String(DuplicateCount) },
];

/* ─── THE SPECIMENS ──────────────────────────────────────────────────────── */

/** One group of rows on the plate: the family's own reading order. */
export type Group =
	| "opening"
	| "bands"
	| "manifest"
	| "cards"
	| "marks"
	| "record"
	| "lab"
	| "adverse";

/** Which block a row mounts. The renderer switches on it and on nothing else. */
export type Kind =
	| "hero"
	| "masthead"
	| "band"
	| "featureband"
	| "architecture"
	| "roadmap"
	| "platform"
	| "working"
	| "featurecard"
	| "elementcard"
	| "releasecard"
	| "platformcard"
	| "anatomy"
	| "seal"
	| "corners"
	| "status"
	| "arrow"
	| "ledger"
	| "specimenlabel"
	| "fieldrecord"
	| "datacard"
	| "index"
	| "metadata"
	| "action"
	| "evidence"
	| "badge"
	| "card"
	| "blogcard"
	| "table"
	| "richtext"
	| "state"
	| "absent";

/** What every row states, whatever block it mounts. */
export interface Spec {
	/** `CMP_01` - the row's own mark, printed at its head. */
	readonly mark: string;

	/** The state or combination, in the sheet's register: `NO PLATE`, `AT 16`. */
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
 * The rows, in reading order: the opening, the bands, the manifest, the cards,
 * the marks, the filed record, the lab, and the adverse states.
 *
 * Every row is a state the site either uses or could use, and the `when` line is
 * the one thing a picture of a component cannot carry: the sentence that says
 * which composition is right. A row printed here that the site never needs is
 * still a row: a component that survives its own worst combination is a
 * component whose design frame is real.
 */
export const Specimens: readonly Specimen[] = [
	/* ── THE OPENING ─────────────────────────────────────────────────────── */
	{
		mark: "CMP_01",

		state_name: "THE PAIR",

		component: "DYNAMICHEROSECTION",

		when: "The homepage's opening: the record at 49, the hairline, the evidence at 51, the trace under both and the stack as its legend.",

		kind: "hero",

		width: "wide",
	},

	{
		mark: "CMP_02",

		state_name: "NO PLATE",

		component: "DYNAMICHEROSECTION",

		when: "A hero whose evidence has not been photographed: the panel keeps its 51%, its height and its caption, and states `PLATE: UNAVAILABLE` with the description under it.",

		kind: "hero",

		width: "wide",

		variant: "noplate",
	},

	{
		mark: "CMP_03",

		state_name: "PLATE LOADING",

		component: "DYNAMICHEROSECTION",

		when: "A hero whose plate has not arrived: the same frame, three barred rules, no spinner - a skeleton drawn in the record grammar.",

		kind: "hero",

		width: "wide",

		variant: "loading",
	},

	{
		mark: "CMP_04",

		state_name: "ONE DESTINATION",

		component: "DYNAMICHEROSECTION",

		when: "A page with one destination: one button and no route line, which is the arm every page but the homepage prints.",

		kind: "hero",

		width: "wide",

		variant: "lone",
	},

	{
		mark: "CMP_05",

		state_name: "NO ACTION",

		component: "DYNAMICHEROSECTION",

		when: "A record handed no entries: no button and no routes, and the card closes on its facts - the arm a page under construction gets.",

		kind: "hero",

		width: "wide",

		variant: "noaction",
	},

	{
		mark: "CMP_06",

		state_name: "THE MASTHEAD",

		component: "DOWNLOADMASTHEAD",

		when: "The Download page's opening at rest: glyph, `h1`, one sentence, then the row of claim marks with their protocol inks.",

		kind: "masthead",

		width: "wide",
	},

	{
		mark: "CMP_07",

		state_name: "LONG CLAIM",

		component: "DOWNLOADMASTHEAD",

		when: "A claim wider than its badge: the row wraps to a second line rather than compressing a chip, which is the only correct answer - a squished chip row is a row that should have wrapped.",

		kind: "masthead",

		width: "wide",

		variant: "long",
	},

	{
		mark: "CMP_08",

		state_name: "NO MARKS",

		component: "DOWNLOADMASTHEAD",

		when: "A masthead with no claims filed: the glyph, the `h1` and the sentence still open the page, because the marks are a row rather than the header's subject.",

		kind: "masthead",

		width: "band",

		variant: "empty",
	},

	/* ── THE BANDS ───────────────────────────────────────────────────────── */
	{
		mark: "CMP_09",

		state_name: "SIX RECORDS",

		component: "FEATUREBAND",

		when: "The homepage's proof plate: six records, three across from `lg`, one 1px seam, the observation strip filed under it.",

		kind: "featureband",

		width: "wide",
	},

	{
		mark: "CMP_10",

		state_name: "THREE RECORDS",

		component: "FEATUREBAND",

		when: "A proof band that can only stand behind three claims: one row of three at `lg`, two-plus-a-lead below it, and the subset's figure `# RECORDS / 03` under the grid.",

		kind: "featureband",

		width: "wide",

		variant: "three",
	},

	{
		mark: "CMP_11",

		state_name: "ONE RECORD",

		component: "FEATUREBAND",

		when: "A plate of one: the record takes the full seam and the band prints `# RECORDS / 01` - the shape a project with one claim has.",

		kind: "featureband",

		width: "band",

		variant: "one",
	},

	{
		mark: "CMP_12",

		state_name: "NO RECORDS",

		component: "FEATUREBAND",

		when: "A plate handed an empty set: `RECORDS: UNAVAILABLE` and one sentence where the matrix would be, on the record layer's hairline.",

		kind: "featureband",

		width: "band",

		variant: "empty",
	},

	{
		mark: "CMP_13",

		state_name: "TWO STATES",

		component: "ROADMAPBAND",

		when: "The release manifest at rest: one plate, two states, the hero's hairline gutter between them, one ink action in the whole artifact.",

		kind: "roadmap",

		width: "wide",
	},

	{
		mark: "CMP_14",

		state_name: "ONE STATE",

		component: "ROADMAPBAND",

		when: "A project with one release state: the state takes the whole plate and the gutter is not drawn, because the rule is conditional on there being a second column.",

		kind: "roadmap",

		width: "band",

		variant: "one",
	},

	{
		mark: "CMP_15",

		state_name: "THE WALL",

		component: "ARCHITECTUREBAND",

		when: "All fifteen element records as one ragged wall: twelve columns from `lg`, two below it, the spans making the ragged edge that is the artifact's whole point.",

		kind: "architecture",

		width: "wide",
	},

	{
		mark: "CMP_16",

		state_name: "A WALL OF THREE",

		component: "ARCHITECTUREBAND",

		when: "Three element records: the masonry still works, the ragged edge is three spans instead of fifteen, and the band does not require the full set.",

		kind: "architecture",

		width: "wide",

		variant: "three",
	},

	{
		mark: "CMP_17",

		state_name: "THE METHOD",

		component: "WORKINGBAND",

		when: "The page's first 7/1px/5 split: a spacious trace beside a tight register, with the three documented failures ruled under both.",

		kind: "working",

		width: "wide",
	},

	{
		mark: "CMP_18",

		state_name: "A BAND HEAD",

		component: "BAND",

		when: "The shell on its own: `# SERIES_INDEX` ruling to the margin, the kicker, the heading and its qualifier as a 5/7 pair, and the stamp slot where a band carries one.",

		kind: "band",

		width: "wide",

		variant: "stamp",
	},

	{
		mark: "CMP_19",

		state_name: "A SECOND INDEX",

		component: "BAND",

		when: "The same series filed twice on one page: `index` is a prop since this family, so the second band prints `_02` instead of claiming the first band's mark.",

		kind: "band",

		width: "wide",

		variant: "second",
	},

	/* ── THE MANIFEST ────────────────────────────────────────────────────── */
	{
		mark: "CMP_20",

		state_name: "THREE ARTEFACTS",

		component: "PLATFORMBAND",

		when: "The download manifest at rest: three rows, a 20% rule between them, the identity in its own column so the three names line up.",

		kind: "platform",

		width: "wide",
	},

	{
		mark: "CMP_21",

		state_name: "ONE ARTEFACT",

		component: "PLATFORMBAND",

		when: "The day a build exists for one platform: one row and no divider, which is the shape every first release has.",

		kind: "platform",

		width: "band",

		variant: "one",
	},

	{
		mark: "CMP_22",

		state_name: "NO ARTEFACT",

		component: "PLATFORMBAND",

		when: "The day nothing is downloadable: the plate keeps its surface and states `ARTIFACTS: UNAVAILABLE`, why, and `CHANNEL: SOURCE`.",

		kind: "platform",

		width: "band",

		variant: "empty",
	},

	{
		mark: "CMP_23",

		state_name: "A ROW",

		component: "PLATFORMCARD",

		when: "One artefact row alone: seven facts on one wrapping line, the `NOTE:` that explains the three absent ones, the status and the one action.",

		kind: "platformcard",

		width: "band",
	},

	{
		mark: "CMP_24",

		state_name: "THE INK ACTION",

		component: "RELEASECARD",

		when: "`# RELEASE_01`: the state a reader can act on today, and the only filled button in the manifest.",

		kind: "releasecard",

		width: "narrow",
	},

	{
		mark: "CMP_25",

		state_name: "THE ROUTE",

		component: "RELEASECARD",

		when: "`# RELEASE_02`: the state a reader can only watch, so it carries its destination as a `/LABEL` route line - two filled buttons in one plate was two primary actions.",

		kind: "releasecard",

		width: "narrow",

		variant: "route",
	},

	/* ── THE CARDS ───────────────────────────────────────────────────────── */
	{
		mark: "CMP_26",

		state_name: "A FEATURE RECORD",

		component: "FEATURECARD",

		when: "One cell of the proof matrix: marker, seal, stamps, route, the name as the link out, the status and the four-row ledger, on the element's own tint.",

		kind: "featurecard",

		width: "narrow",
	},

	{
		mark: "CMP_27",

		state_name: "LONG NAME",

		component: "FEATURECARD",

		when: "A name wider than its cell: the title wraps, the seal stays in the marker row, and the arrow never breaks to a line of its own.",

		kind: "featurecard",

		width: "narrow",

		variant: "long",
	},

	{
		mark: "CMP_28",

		state_name: "AN ELEMENT PLATE",

		component: "ELEMENTCARD",

		when: "The `plate` depth: the name row, the role chips, the body, the working register and the trace under it - the card that carries a manual page.",

		kind: "elementcard",

		width: "band",
	},

	{
		mark: "CMP_29",

		state_name: "A RECORD DEPTH",

		component: "ELEMENTCARD",

		when: "The `record` depth: the same card without the trace, which is the reading twelve of the fifteen elements get - the four the reader meets first are the `plate` cards.",

		kind: "elementcard",

		width: "narrow",

		variant: "record",
	},

	{
		mark: "CMP_30",

		state_name: "NO CHIPS",

		component: "ELEMENTCARD",

		when: "An element with no role chips: the chip row is absent rather than empty, and the card closes on its body and its register.",

		kind: "elementcard",

		width: "narrow",

		variant: "nochips",
	},

	{
		mark: "CMP_31",

		state_name: "THE ANATOMY",

		component: "RECORDANATOMY",

		when: "The record middle on its own: two containment stamps, the route over its service line, the status and the ledger - the block both card families share.",

		kind: "anatomy",

		width: "narrow",
	},

	{
		mark: "CMP_32",

		state_name: "AN EMPTY FRAME",

		component: "FIELDRECORDDATACARD",

		when: "The card frame with an empty slot: a white insert with its corner marks and nothing in it - which is a frame doing what a frame does, and the reason every host supplies a record.",

		kind: "datacard",

		width: "narrow",
	},

	/* ── THE MARKS ───────────────────────────────────────────────────────── */
	{
		mark: "CMP_33",

		state_name: "AT 16",

		component: "FIELDRECORDSEAL",

		when: "The seal inside a chip or a row: drawn at one weight so the form survives - the arm that found the drawing was a smudge below 32px.",

		kind: "seal",

		variant: "xs",
	},

	{
		mark: "CMP_34",

		state_name: "AT 32",

		component: "FIELDRECORDSEAL",

		when: "The seal at the head of a card: one weight, 1px, the site's most common step.",

		kind: "seal",

		variant: "s",
	},

	{
		mark: "CMP_35",

		state_name: "AT 48",

		component: "FIELDRECORDSEAL",

		when: "The seal at the head of a record: the authored pair of weights, 1 and 0.5, which is the engraving.",

		kind: "seal",

		variant: "m",
	},

	{
		mark: "CMP_36",

		state_name: "AT 64",

		component: "FIELDRECORDSEAL",

		when: "The seal at the head of a page: a unit is a pixel and the drawing is exactly what it was drawn to be.",

		kind: "seal",

		variant: "l",
	},

	{
		mark: "CMP_37",

		state_name: "AT 240",

		component: "FIELDRECORDSEAL",

		when: "The seal as the artifact: the roundel at display size, where a unit is 3.75px and the two weights are the engraving again - still `aria-hidden`, still not a control.",

		kind: "seal",

		variant: "xl",
	},

	{
		mark: "CMP_38",

		state_name: "THE NEUTRAL SEAL",

		component: "FIELDRECORDSEAL",

		when: "The one element whose record carries no device: the roundel's own form with the grammar's `◎` in its field - the honest seal for \"no device\", and the reason the wall carries one seal form.",

		kind: "seal",

		variant: "neutral",
	},

	{
		mark: "CMP_39",

		state_name: "THE FRAME",

		component: "CORNERMARKS",

		when: "The picture-frame crosshairs on a white insert: eight ticks, four corners, one geometry module - they frame, they do not shout.",

		kind: "corners",

		width: "narrow",
	},

	{
		mark: "CMP_40",

		state_name: "ATTESTED",

		component: "FIELDRECORDSTATUS",

		when: "`ACTIVE` and `VERIFIED`: the value in the record's ink with the mark layer's square beside it - a shape, not a hue, so the state survives greyscale.",

		kind: "status",

		variant: "attested",
	},

	{
		mark: "CMP_41",

		state_name: "QUIET",

		component: "FIELDRECORDSTATUS",

		when: "`PREPARING` and `ARCHIVED`: the same row at the muted ink, with no square - a state that is deliberately not attested.",

		kind: "status",

		variant: "quiet",
	},

	{
		mark: "CMP_42",

		state_name: "THE ARROW",

		component: "ARROW",

		when: "The external-link mark after a record's own name: `currentColor`, `aria-hidden`, a suffix to a link whose name already says where it goes.",

		kind: "arrow",
	},

	{
		mark: "CMP_43",

		state_name: "THE GRAMMAR'S INKS",

		component: "SEMANTICLEDGER",

		when: "`〈RUST + TAURI〉` and `/COMPAT: VS CODE` at character level: grey brackets, the keyword in its own ink, the value in the record's ink.",

		kind: "ledger",

		width: "narrow",
	},

	{
		mark: "CMP_44",

		state_name: "THE SPECIMEN LABEL",

		component: "SPECIMENLABEL",

		when: "The element-series ledger artifact: ink on the creme canvas, hairline row rules, a 32px seal as the anchor - deliberately not the white FieldRecord box.",

		kind: "specimenlabel",

		width: "narrow",
	},

	/* ── THE FILED RECORD ────────────────────────────────────────────────── */
	{
		mark: "CMP_45",

		state_name: "THE RECORD",

		component: "FIELDRECORD",

		when: "The canonical single-card template at rest: index, seal, stamps, route, program, the blank interval, the title, the status, the metadata and one action.",

		kind: "fieldrecord",

		width: "narrow",
	},

	{
		mark: "CMP_46",

		state_name: "NO ACTION",

		component: "FIELDRECORD",

		when: "A record with no action: the block is not mounted and the card closes on its metadata, which is the arm the 404's record takes.",

		kind: "fieldrecord",

		width: "narrow",

		variant: "noaction",
	},

	{
		mark: "CMP_47",

		state_name: "PARTIAL",

		component: "FIELDRECORD",

		when: "A record whose status could not be resolved: `UNAVAILABLE` at the quiet tone, with the metadata still printed - the vocabulary's word rather than a blank.",

		kind: "fieldrecord",

		width: "narrow",

		variant: "partial",
	},

	{
		mark: "CMP_48",

		state_name: "A BARE MARKER",

		component: "FIELDRECORDINDEX",

		when: "A record with no index: the bare `#` and the space after it - the grammar's mark with no figure, which is the honest form of a record that has none.",

		kind: "index",

		variant: "bare",
	},

	{
		mark: "CMP_49",

		state_name: "SIX PAIRS",

		component: "FIELDRECORDMETADATA",

		when: "A metadata run of six: the key column fixed and `nowrap`, the values wrapping in place - the run has no cap and the card's interval absorbs the growth.",

		kind: "metadata",

		width: "narrow",
	},

	{
		mark: "CMP_50",

		state_name: "THE RECORD ARM",

		component: "FIELDRECORDACTION",

		when: "The route arm: `/LABEL` at the accent, inside a ledger, reading as a route rather than as a control - the secondary destination's voice.",

		kind: "action",

		variant: "record",
	},

	{
		mark: "CMP_51",

		state_name: "THE BUTTON ARM",

		component: "FIELDRECORDACTION",

		when: "The button arm: the card's single control, one per artifact, in the ink fill with the creme label.",

		kind: "action",

		variant: "button",
	},

	{
		mark: "CMP_52",

		state_name: "A PLATE",

		component: "FIELDRECORDEVIDENCE",

		when: "The evidence at rest: one photograph, `object-fit: cover`, no text on it, the caption below where the `RecordFigure` contract puts it.",

		kind: "evidence",

		width: "band",
	},

	{
		mark: "CMP_53",

		state_name: "NO PLATE",

		component: "FIELDRECORDEVIDENCE",

		when: "The plate's absent arm on its own: the frame, `◎`, `PLATE: UNAVAILABLE`, and the description that would have been the alt.",

		kind: "evidence",

		width: "band",

		variant: "absent",
	},

	{
		mark: "CMP_54",

		state_name: "PLATE LOADING",

		component: "FIELDRECORDEVIDENCE",

		when: "The plate's loading arm: the same frame, three barred rules - a skeleton in the record grammar rather than a spinner in a 51% panel.",

		kind: "evidence",

		width: "band",

		variant: "loading",
	},

	/* ── THE LAB ─────────────────────────────────────────────────────────── */
	{
		mark: "CMP_55",

		state_name: "A PROTOCOL CHIP",

		component: "DYNAMICBADGE",

		when: "A badge with its protocol dot: the word at 13px on the site's light fill with the dot in the spine's own ink - the family's 16px arm. LAB ONLY.",

		kind: "badge",
	},

	{
		mark: "CMP_56",

		state_name: "AN EMPTY CARD",

		component: "DYNAMICCARD",

		when: "A Jelly card with no sections: a white box on the field with nothing in it - printed here because it is the clearest argument for the block's verdict. LAB ONLY.",

		kind: "card",

		width: "narrow",

		variant: "empty",
	},

	{
		mark: "CMP_57",

		state_name: "AN ARTICLE CARD",

		component: "DYNAMICBLOGCARD",

		when: "One blog entry as a card: tags, title, a three-line summary, the author and the read time - and no anchor on the title. LAB ONLY.",

		kind: "blogcard",

		width: "narrow",
	},

	{
		mark: "CMP_58",

		state_name: "A TABLE WITH NO ROWS",

		component: "DYNAMICTABLE",

		when: "A table handed no rows: its head prints and its body does not - the empty arm `RecordMatrix` improves on with a stated absence. LAB ONLY.",

		kind: "table",

		width: "band",

		variant: "empty",
	},

	{
		mark: "CMP_59",

		state_name: "ONE STRING",

		component: "DYNAMICRICHTEXT",

		when: "A translated string parsed: a blank line is a paragraph and a backtick is code - the one-line island that exists so a page can mount the parser lazily. LAB ONLY.",

		kind: "richtext",

		width: "band",
	},

	/* ── THE ADVERSE ─────────────────────────────────────────────────────── */
	{
		mark: "CMP_60",

		state_name: "LOADING",

		component: "DYNAMICSTATEPORT",

		when: "The one state that may show a linear indicator: `STATUS: LOADING`, one sentence, no spinner - the account surfaces' resting state.",

		kind: "state",

		width: "band",

		variant: "loading",
	},

	{
		mark: "CMP_61",

		state_name: "INTERRUPTED",

		component: "DYNAMICSTATEPORT",

		when: 'A failed read: `STATUS: INTERRUPTED`, the cause, the retry - and `role="alert"`, which is where a failure\'s urgency belongs rather than in a second colour.',

		kind: "state",

		width: "band",

		variant: "error",
	},

	{
		mark: "CMP_62",

		state_name: "EMPTY",

		component: "DYNAMICSTATEPORT",

		when: "Nothing filed: `STATUS: UNAVAILABLE`, what would be here and why it is not - the block whose whole subject is the adverse state.",

		kind: "state",

		width: "band",

		variant: "empty",
	},

	{
		mark: "CMP_63",

		state_name: "THE SECOND FOOTER",

		component: "DYNAMICFOOTER",

		when: "Not mounted: nothing imports it, and `Layout/Footer` is the footer every page wears. The row states the absence rather than printing a block no page can reach.",

		kind: "absent",

		width: "band",

		variant: "footer",
	},

	{
		mark: "CMP_64",

		state_name: "THE SECOND BAR",

		component: "DYNAMICHEADER",

		when: "Not mounted: nothing imports it, and its whole body is a translation layer between an old schema and `Layout/Header`.",

		kind: "absent",

		width: "band",

		variant: "header",
	},

	{
		mark: "CMP_65",

		state_name: "THE PRICING SURFACE",

		component: "DYNAMICPORTAL",

		when: "Not mounted: nothing imports it, and `/Portal` composes its four tiers from `Content/Surface/Portal.ts`. 1,556 lines - the largest piece of dead code in the family.",

		kind: "absent",

		width: "band",

		variant: "portal",
	},

	{
		mark: "CMP_66",

		state_name: "THE COPY PANEL",

		component: "DYNAMICVERIFICATIONINFO",

		when: "Not mounted: nothing imports it, and `/Download` prints its checksums through `Download/Verify.astro`, which is live.",

		kind: "absent",

		width: "band",

		variant: "verification",
	},
];

/* ─── THE GROUPS ─────────────────────────────────────────────────────────── */

/** Which group a row belongs to, from its place in the list. */
const GroupOf = (Row: Specimen): Group => {
	const At = Specimens.indexOf(Row);

	if (At < 8) return "opening";

	if (At < 19) return "bands";

	if (At < 25) return "manifest";

	if (At < 32) return "cards";

	if (At < 44) return "marks";

	if (At < 54) return "record";

	if (At < 59) return "lab";

	return "adverse";
};

/** The rows in one group, in reading order. */
export const InGroup = (Group: Group): readonly Specimen[] =>
	Specimens.filter((Row) => GroupOf(Row) === Group);

/** The groups, in the plate's order, with the line that says what each one asks. */
export const Groups: readonly { key: Group; label: string; note: string }[] = [
	{
		key: "opening",

		label: "/THE OPENING",

		note: "The page's first artifact in its five arms: the resting pair, a hero with no evidence image, a plate that has not arrived, one destination and none - then the Download masthead at rest, with a claim wider than its badge, and with no claims filed at all.",
	},

	{
		key: "bands",

		label: "/THE BANDS",

		note: "The chapters after the opening: the proof plate with six records, with three, with one and with none; the release manifest with two states and with one; the element wall with fifteen and with three; the method band's two densities; and the band head alone - at rest, as a second index of its series, and with its stamp.",
	},

	{
		key: "manifest",

		label: "/THE MANIFEST",

		note: "The artifacts that compare facts: the download plate with three rows, with one and with none; a single artefact row; and the two release states, one carrying the ink action and one carrying its destination as a route.",
	},

	{
		key: "cards",

		label: "/THE CARDS",

		note: "The record surfaces: a feature cell at rest and with a name wider than its column, an element card at both depths and with no chips, the shared record middle on its own, and the card frame with an empty slot.",
	},

	{
		key: "marks",

		label: "/THE MARKS",

		note: "The mark layer, at every step it now has: the seal at 16, 32, 48, 64 and 240 pixels and the neutral roundel for the element with no device; the corner frame; the status row attested and quiet; the arrow; the grammar's character-level inks; and the specimen label. The 16px and 240px rows are the two the family's brief named by hand.",
	},

	{
		key: "record",

		label: "/THE FILED RECORD",

		note: "The brand's canonical record: the template at rest, with no action and with a partial status; a bare marker; a six-pair metadata run; the action in both its arms; and the evidence plate in all three of its states - a photograph, an absence and a skeleton.",
	},

	{
		key: "lab",

		label: "/THE LAB",

		note: "The parts only this sheet mounts, printed at 1:1 rather than described: a protocol chip, a Jelly card with no sections, an article card, a table with no rows and a parsed string. Five rows for six parts, because `DynamicLabel` is printed by the input family's own plate above.",
	},

	{
		key: "adverse",

		label: "/THE ADVERSE",

		note: "The state report's three arms, and the four parts that cannot be printed at all: a second footer, a second bar, a pricing surface and a copy panel, each with the reason and the decision the owner is being asked for.",
	},
];

/** How many rows the plate prints. */
export const SpecimenCount = Specimens.length;
