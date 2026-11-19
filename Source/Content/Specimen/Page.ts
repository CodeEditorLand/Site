/**
 * Page - the sheet's copy, and nothing else.
 *
 * Every sentence `/Specimen` prints that is not a part's own contract is here:
 * the head, the three bands' openings, the material's six specimens, the
 * register's rows and the sheet's four doors. The page composes; it decides
 * nothing about what it says.
 *
 * ─── WHY THE MATERIAL IS A BAND OF ITS OWN ────────────────────────────────
 * A printer's specimen sheet shows the type, and it also shows the ink and the
 * stock - the two things every page of the book will be printed with. This
 * document's ink and stock are its identity: one creme field, one white insert,
 * one ink, one mute, one accent, one hairline. Printing them as specimens is not
 * a palette display: it is the sheet proving that the page it is printed on is
 * made of the same six things as every other page, and that none of them is a
 * seventh.
 *
 * ─── THE REGISTER'S FIGURES ARE PASSED IN ─────────────────────────────────
 * `Register()` takes the counts the page derived from `Parts.ts` and returns the
 * ledger rows. A figure written in this file would be the one number on the
 * sheet that could disagree with the sheet.
 */
import type { LedgerRow } from "../../Component/Record/Type.js";

/** The field-record separator: U+2001, never U+00B7. */
const Quad = "\u2001";

/** One material specimen: a token, its value, and what it is for. */
export interface MaterialSpecimen {
	/** `FIELD` - the specimen's name in the register. */
	readonly name: string;

	/** `--Background` - the custom property the site reads. */
	readonly token: string;

	/** The value, verbatim, as the token sheet states it. */
	readonly value: string;

	/** What it is for, in one line. */
	readonly use: string;

	/**
	 * How the specimen is drawn. `fill` is a swatch of the colour under a
	 * hairline; `ink` is a line of the face set in that ink; `rule` is the
	 * hairline itself, drawn at the width it is used.
	 */
	readonly kind: "fill" | "ink" | "rule";

	/**
	 * The size an ink specimen is set at. `display` is the page's one XL and it
	 * belongs to the primary ink - the largest type on a specimen sheet is the
	 * material showing itself. Everything else is `section`.
	 */
	readonly scale?: "display" | "section";
}

/**
 * The six things the document is made of.
 *
 * Ordered as a sheet is: the stock, then the insert, then the two inks, then the
 * one accent, then the rule. The values are `_Token.scss`'s and are printed
 * rather than referenced, because a specimen that printed `var(--Background)`
 * would be showing the reader the name of the ink instead of the ink.
 */
export const Material: readonly MaterialSpecimen[] = [
	{
		name: "FIELD",

		token: "--Background",

		value: "#F2EDE3",

		use: "The paper. Every page is this colour, and nothing is painted over it except a white insert.",

		kind: "fill",
	},

	{
		name: "INSERT",

		token: "--Card",

		value: "#FFFFFF",

		use: "An information box lying on the field. Never a page background, and never a card inside a card.",

		kind: "fill",
	},

	{
		name: "INK",

		token: "--Foreground",

		value: "#1C1C1E",

		use: "Every word that is not a label. The same value on creme and on white, so one ink means one ink.",

		kind: "ink",

		scale: "display",
	},

	{
		name: "MUTE",

		token: "--MuteForeground",

		value: "#70685B",

		use: "Labels, markers, provenance. Never primary copy - a fact stated in the mute is a fact the page is whispering.",

		kind: "ink",
	},

	{
		name: "ACCENT",

		token: "--Accent",

		value: "#1E742A",

		use: "The one green. It authenticates: a seal, a link, a focus ring, the active route. Rare on purpose.",

		kind: "ink",
	},

	{
		name: "RULE",

		token: "--Divider",

		value: "20% INK",

		use: "The one hairline. A track in the hero pair, a seam in a matrix, a rule under a register line.",

		kind: "rule",
	},
];

/** The head's own copy. */
export const Head = {
	index: "# SPECIMEN_01",

	title: "The document's own parts",

	proposition:
		"Twelve parts, printed at 1:1 where they can stand on a plate and stated where they cannot. Each one carries its contract, its stylesheet and the surface that asks for it.",
} as const;

/** The three bands' openings, in the order they are read. */
export const Bands = {
	Sheet: {
		kicker: "/THE SHEET",

		interval: "turn",

		heading: "Every part, on one sheet",

		standfirst:
			"Twelve cells, one per part: its mark, its name, the layer it belongs to, and what the sheet did with it. A printed part links to its plate; an absent one prints its reason where the plate would be.",

		footnote:
			"A sheet is the one page where equal cells are right: the parts are genuinely equal, and the reader is choosing between them rather than reading them.",
	},

	Plates: {
		kicker: "/THE PLATES",

		interval: "rest",

		heading: "The parts, printed",

		standfirst:
			"Seven plates. Each holds one part at its own size on a stage, and each stage is a white insert lying on the field - the same box a record uses, so a part is printed on the surface it will be printed on.",

		footnote:
			"A plate's stage is 1:1. Nothing on this sheet is scaled to fit: a part that could not be shown at its own size is stated in THE ABSENCES instead.",
	},

	Absences: {
		kicker: "/THE ABSENCES",

		interval: "break",

		heading: "The parts that are not printed",

		standfirst:
			"Three parts cannot stand on a plate, and each says why in the same three rows every absence on this site uses: what would be here, why it is not, and where to read the thing itself.",

		footnote:
			"An absence is a designed state, not a gap. The sheet is complete when every part is accounted for, not when every part is drawn.",
	},

	States: {
		kicker: "/THE STATES",

		interval: "rest",

		heading: "What a part has to survive",

		standfirst:
			"Nine conditions, composed in the record grammar, each naming the surface where it actually happens. A part without its adverse states is half a part, and a page without them is half a page.",

		footnote:
			"The vocabulary is fixed at eight words, and the legend above prints all eight. A ninth word would be a state the ink register has no tone for.",
	},

	/**
	 * The input family's band.
	 *
	 * The one band on this sheet that is about a family rather than a part, and
	 * the only one whose subject is a *set of states*: ten components against
	 * twenty-three conditions, printed as a matrix with footnotes, and then the
	 * same family printed live - twenty-nine rows, each naming a state and the
	 * one line that says when it is right.
	 *
	 * It follows `/THE STATES` deliberately. That band says what a part has to
	 * survive; this one takes the part a reader touches with their hands and
	 * shows the survival, condition by condition. A field's states are the
	 * product, and a sheet that printed the components without them would be
	 * printing the happy one.
	 */
	Field: {
		kicker: "/THE FIELD",

		interval: "turn",

		heading: "The field, and every state it has",

		standfirst:
			"Every condition the family has to hold, against every component that has to hold it: the matrix, with a reason printed in full for every cell that cannot exist, then the family mounted live at the state it is best known by. A field is the one part a reader touches with their hands, so its states are the product.",

		footnote:
			"A cell that cannot exist carries its reason in the notes rather than a truncated one in the cell, and a state that a printed sheet cannot produce - focus - is declared on the block, so it prints.",
	},

	/**
	 * The overlay family's band.
	 *
	 * The second band about a family rather than a part, and the second whose
	 * subject is a *set of states*. It follows `/THE FIELD` for the same reason
	 * that one follows `/THE STATES`: a family's states are the product, and the
	 * one thing a printed sheet cannot show is the two seconds after a click -
	 * which is why the rows here are live and every one of them is a real
	 * primitive.
	 *
	 * The band's own argument is in three artifacts: a matrix of two hundred
	 * cells with a reason for every one that cannot exist, the five-rule
	 * dismissal contract every slip in the family holds, and the live rows -
	 * one per state, and every one of them a real primitive. A reader who opens
	 * them all has seen every state the site never showed before this card.
	 */
	Overlay: {
		kicker: "/THE OVERLAY",

		interval: "rest",

		heading: "The overlay, and every way out of it",

		standfirst:
			"Ten components on one surface, one item grammar and one dismissal contract. The matrix prints every condition against every component with a reason for each cell that cannot exist; the contract prints the five ways a slip is left; and the rows print the states the site had never shown - an empty menu, a disabled row that says why, a submenu three deep, a dialog taller than the viewport, a popover at the right edge, a record with rows it cannot read, a list at a shorter stride, and a slip opened over the card it belongs to.",

		footnote:
			"One surface is not one component. The ten are ten behaviours - a drag, a hover, a right-click, a chord - and the claim this band makes is narrower and harder: that a reader cannot tell which primitive they are in by looking at the frame, only by what it does.",
	},

	/**
	 * The display family's band.
	 *
	 * The third band about a family rather than a part, and the one whose subject is
	 * the document's reading weight: nineteen primitives that carry the page's facts
	 * and are, for exactly that reason, the ones whose adverse states nobody notices
	 * are missing. A table with no empty state does not look broken. A tab strip that
	 * cannot overflow does not look broken. A skeleton that is a grey box does not
	 * look broken - and all three are.
	 *
	 * It follows `/THE OVERLAY` for the reason that one follows `/THE FIELD`: a
	 * family's states are the product, and this family's states are the ones a reader
	 * meets while reading rather than while clicking. The band's argument is in four
	 * artifacts: the matrix with a reason for every cell that cannot exist, the two
	 * verdicts on the components the document does not mount, the conditions' own
	 * figures, and the forty-four live rows.
	 */
	Display: {
		kicker: "/THE DISPLAY",

		interval: "break",

		heading: "The display, and everything it is asked to hold",

		standfirst:
			"Nineteen components against twenty-one conditions: the matrix with a reason printed in full for every cell that cannot exist, the verdict on the two components no page mounts, the figure each condition earns, and then the family mounted live at every state it is best known by - a dense table, a strip with more tabs than fit, a disclosure with its panel open, a progress bar with a figure, a skeleton in the record grammar, and a month.",

		footnote:
			"Two cells cannot exist for the same reason in three different rows, and each one still carries its own sentence: a reason is a fact about that component, not a rule about the family. A cell that cannot exist is not a gap in the design - it is the design saying what it is not.",
	},

	/**
	 * The record ledger family's band.
	 *
	 * The fourth band about a family rather than a part, and the first whose subject
	 * is what the document is BELIEVED for: a ledger is where a reader checks
	 * whether the thing is real - its target, its licence, its figure and the source
	 * that figure came from. The other three families are touched, dismissed and
	 * read; this one is trusted, and a ledger that loses its partial state prints a
	 * blank cell where a fact should be, which a reader reads as "none".
	 *
	 * It follows `/THE DISPLAY` for the reason that one follows `/THE OVERLAY`: a
	 * family's states are the product. The band's argument is in four artifacts: the
	 * matrix with a reason for every cell that cannot exist, the improvements the
	 * exploration produced (each naming the condition that revealed it), the
	 * observations this card did not fix and whose work they are, and the fifty-two
	 * live rows.
	 */
	Record: {
		kicker: "/THE RECORD",

		interval: "turn",

		heading: "The record, and the combinations it never met",

		standfirst:
			"Eight components against twenty-four conditions: the matrix with a reason printed in full for every cell that cannot exist, the twelve behaviours the exploration produced with the cell that produced each, the three things this card found and did not fix, and then the family mounted live - one row, twenty rows, a key longer than its value, a value of three lines, a matrix of one column, a matrix of twelve, a rail where the two sides are equal, a trace with no events, an instrument with a missing reading, and the row grammar doing three things it could not do before: opening, marking and totalling.",

		footnote:
			"Not one of these blocks ships a line of JavaScript. The ledger's disclosure is a `<details>`, the matrix is a `<table>`, the rail is an `<ol>` and the register is a `<p>` - so the band that prints every state they have costs the page nothing to mount, which is itself the claim.",
	},

	Narrative: {
		kicker: "/THE NARRATIVE",

		interval: "break",

		heading: "The narrative, and the states that reveal its frame",

		standfirst:
			"Fifteen components against nineteen conditions: the matrix with a reason printed in full for every cell that cannot exist, the twenty-three behaviours the exploration produced with the cell that produced each, the four things this card found and did not fix, and then the family mounted live - a band with a head and no body, an entry with a name and no claim, a stage with one step and a stage with nine, a run that stopped at its third step, a figure with no image and a figure whose caption is longer than its image, a well whose command overflows and a well of two hundred lines, a transcript with a failed turn, a pair with one empty pod, an archive with one entry and an archive with none, and a failure with no recovery path.",

		footnote:
			"Three of the behaviours the brief named by hand are props of the block itself and not wrappers around it: `RecordStage.current` is the run's position, `RecordWell.wrap` is the declaration that a well's lines are read rather than typed, and `RecordFigure.open` is the caption's own disclosure. A behaviour in a wrapper would be a second artifact, and the containment law does not allow a leaf to hold one.",
	},

	/**
	 * The frame family's band.
	 *
	 * The sixth band about a family rather than a part, and the first whose subject
	 * is not what the document SAYS but what it sits in: the page shell, the rail,
	 * the panes, the drawer, the plate, the edge and the vocabulary a surface
	 * states itself in. Nothing here is content, and everything here decides whether
	 * content can be read at all - which is why its matrix carries the compositions
	 * the brief named by hand (no rail, two rails, a shell inside a shell, a plate
	 * with no image, a pane pair at 640px) as COLUMNS rather than as prose.
	 *
	 * It follows `/THE NARRATIVE` for the reason that one follows `/THE RECORD`:
	 * a family's states are the product. This family's states are the ones a reader
	 * never notices when they work - the rail that stays put, the seam that
	 * rotates, the paper that centres in what the rail leaves - and notices at once
	 * when they do not.
	 */
	Frame: {
		kicker: "/THE FRAME",

		interval: "turn",

		heading: "The frame, and every composition it has to survive",

		standfirst:
			"Twenty components against twenty-two conditions: the matrix with a reason printed in full for every cell that cannot exist, the eleven behaviours the exploration produced, the four things this card found and did not fix, and then the frame mounted live - a page with no rail and a page with two, a shell inside a card, a pane pair at 640px, a plate with no image, a rail of one row and a rail of twenty-six, a rail of sections, a pane whose half has not arrived, the lifecycle vocabulary at work, and a region that states what is missing instead of printing a heading over a hole.",

		footnote:
			"The frame's one law is that nothing here is a card: a shell holds tracks, a track holds bands, a band holds records, and a card is a record's surface. The composition the brief asked for by name - a card that contains a page - is the one place that law is inverted, and it is printed here as `FRAME_03`, re-composing at the card's own width because the shell is a query container and not a viewport rule.",
	},

	/**
	 * The reading family's band.
	 *
	 * The seventh band about a family rather than a part, and the one whose
	 * subject is the READER's furniture: the rail that says where you are in the
	 * manual, the contents that say where you are in the page, the card that
	 * files a page, the article that prints it, the appendix that closes the
	 * index, the folio that says where you have got to and the cross-reference
	 * that says where else the subject is said. Nothing here is content; all of
	 * it decides whether a reader can find their place - which is why its matrix
	 * carries the compositions the brief named by hand (one section, ninety, a
	 * heading wider than the rail, an article with no summary, a foot with no
	 * cross-references, a strip at 640px) as COLUMNS rather than as prose.
	 *
	 * It follows `/THE FRAME` for the reason that one follows `/THE NARRATIVE`:
	 * the frame decides whether content can be read at all, and this family
	 * decides whether the reader can find it once it is readable.
	 */
	Reading: {
		kicker: "/THE READING",

		interval: "break",

		heading: "The reader's furniture, and every document it has to hold",

		standfirst:
			"Fourteen components against twenty-four conditions: the matrix with a reason printed in full for every cell that cannot exist, the eleven behaviours the exploration produced with the cell that produced each, the four things this card found and did not fix, and then the family mounted live - a document with one section and a document with ninety, a heading wider than the rail, an article with no summary, an index card with no description, a foot with no cross-references, a layer of one page, a viewer with no crate, a detail strip at 640px, and the seven adverse compositions a reader meets when the world is unkind.",

		footnote:
			"Three of the behaviours are the ones the brief named by hand, and each is a prop of the block itself: `DocContents.collapsible` is the fold, `DocLayout.contentsFold` decides it from the list's own length, and the folio's part breaks at its own separators. A behaviour in a wrapper would be a second artifact, and the containment law does not allow a leaf to hold one.",
	},

	Material: {
		kicker: "/THE MATERIAL",

		interval: "beat",

		heading: "What the sheet is printed with",

		standfirst:
			"Six specimens: the paper, the insert, two inks, the one accent and the one hairline. Every page of this document is made of these and of nothing else.",

		footnote:
			"Printed from `_Token.scss`. A seventh colour would be a second identity, and the sheet is where that would show.",
	},

	Register: {
		kicker: "/THE REGISTER",

		interval: "turn",

		heading: "What this sheet counted",

		standfirst:
			"Four figures and two sources. The counts are read from the parts table the sheet renders, so a part added to the document changes every figure here without a second edit.",

		footnote:
			"A sheet that could disagree with itself would be two claims about one document.",
	},
} as const;

/** The figures the sheet's register prints, derived from the parts table. */
export const Register = (Counts: {
	readonly Parts: number;

	readonly Printed: number;

	readonly Absent: number;

	readonly Folded: number;

	readonly Kinds: number;
}): readonly LedgerRow[] => [
	{ key: "PARTS:", value: String(Counts.Parts) },

	{ key: "PRINTED:", value: String(Counts.Printed) },

	{ key: "ABSENT:", value: String(Counts.Absent) },

	{ key: "FOLDED:", value: String(Counts.Folded) },

	{ key: "LAYERS:", value: String(Counts.Kinds) },

	{
		key: "SHELL:",

		value: "SurfaceShell",

		note: "the shell this sheet wears, and the one part of itself it does not print",
	},

	{
		key: "SOURCE:",

		value: "CONTENT/SPECIMEN/PARTS.TS",

		code: true,

		note: "every row above is counted from this table",
	},
];

/**
 * The sheet's doors.
 *
 * The register is written as four intents rather than four links, because the
 * reader who reaches the bottom of a specimen sheet has just learned what the
 * document is made of - and the useful next question is which of its parts to
 * read next, not which page is alphabetically adjacent.
 */
export const Onward = {
	rows: [
		{
			mark: "/",

			want: "EVERY ADDRESS THIS SITE ANSWERS ON",

			where: "CONTENTS",

			href: "/Contents",

			note: "The index: every information type, every route, and the modules nothing reads.",
		},

		{
			mark: "/",

			want: "WHAT THE DOCUMENT'S MOTION IS MADE OF",

			where: "MOTION",

			href: "/Motion",

			note: "Thirteen interaction classes on three intervals and three curves.",
		},

		{
			mark: "/",

			want: "WHAT THE DOCUMENT'S WORDS MEAN",

			where: "GLOSSARY",

			href: "/Glossary",

			note: "Fifteen elements, twenty nouns and five retired words.",
		},

		{
			mark: "/",

			want: "WHAT IS LIVE TODAY",

			where: "STATUS",

			href: "/Status",

			note: "Twenty-one records under the four columns of the state vocabulary.",
		},
	],

	copy: {
		index: "ONWARD / 04",

		label: "/THE SHEET'S OWN DOORS",

		statement:
			"A specimen sheet ends on the parts it did not print. These four are the documents that file them: the index, the motion register, the lexicon and the state board.",

		note: `SOURCE: SOURCE/CONTENT/SPECIMEN/PAGE.TS${Quad}THE SHEET IS AN APPENDIX, NOT A CHAPTER`,

		empty: "Nothing to hand over. Every destination this register would list is the sheet you are reading, which cannot happen while the document has four other registers.",
	},
} as const;
