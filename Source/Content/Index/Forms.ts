/**
 * Forms - the artifact set: one information type, one physical form.
 *
 * This is the table the index prints as `/THE FORMS`, and it is the answer to the
 * one question a design system cannot dodge: *what shape does this kind of
 * information take?* The site's routing table
 * (`Source/Stylesheet/System/Record/_Index.scss`) states the rule - one type, one
 * block, and when two blocks could answer, the narrower wins - and this file is
 * that rule as data, so the index can measure it against the tree instead of
 * asserting it.
 *
 * Three decisions are visible in the rows:
 *
 * - **A type that has no artifact of its own says so.** A *person* and a
 *   *licence* are rows in a ledger: `MAINTAINED BY: PLAYFORM`, `LICENSE: CC0`.
 *   Neither gets a card, because a card with one sentence in it is a card built
 *   to fill a grid. `◎` is the grammar's own word for "no form here", and it is
 *   what the route count prints for them.
 * - **Two types may share one form when the form is the same object.** A
 *   *comparison* and an *edition* are both read across columns - one state
 *   against N, or one release against the ones before it - so both take the
 *   matrix. Sharing is not the failure; inventing a second shape for the same
 *   object is. The first draft of this table gave the edition the archive, on the
 *   argument that a release is a filed record; the tree disagreed - the Download
 *   page prints a matrix - and the tree is the authority on what a form is for.
 * - **The claim's form has two renderings.** `RecordHero` prints it on the 404
 *   and on this page; the homepage's claim is the endorsed two-panel hero pair,
 *   which is a keeper and outranks the block. One form, two renderings, and the
 *   table names both rather than pretending the block is the only one.
 *
 * `block` is the name `Source/Script/Register.ts` counts. A row without one is a
 * type that rides another form, and its route count is `◎` - the index never
 * prints a zero, because a zero is a claim that the type is nothing.
 */

/** One information type and the one form it takes. */
export interface TypeForm {
	/** The information type, uppercase: `CLAIM`, `FACT`, `COMMAND`. */
	readonly type: string;

	/** The form's name, as the matrix prints it: `HERO`, `LEDGER`, `WELL`. */
	readonly form: string;

	/**
	 * The block the route count comes from, exactly as `Register.ts` names it.
	 * Absent, the type rides another form and the count is `◎`.
	 */
	readonly block?: string;

	/** The routing table's rank: `ARTIFACT`, `SECTION`, `FRAME`, `SET`, `LEAF`. */
	readonly rank: string;

	/** One line: what question this form answers. */
	readonly answers: string;
}

/**
 * The five forms this table gained with the apparatus wave: the plate, the
 * plate-set, the stamp, the transcript and the inset.
 *
 * Each one is a *different* information type from the block nearest to it, and
 * the `answers` line is what keeps them apart. A plate is not a figure (the
 * evidence the record is about, numbered, with a channel, versus the evidence a
 * paragraph illustrates); a plate-set is not a matrix (many figures of one
 * subject, versus values across columns); a stamp is not a ledger (one mark and
 * its authority, versus what is true of an object); a transcript is not a well
 * (a session with two sides, versus one command); an inset is not a margin note
 * (a claim that had to bring its figure, versus a claim alone).
 */
export const TypeForms: readonly TypeForm[] = [
	{
		type: "CLAIM",

		form: "HERO",

		block: "RecordHero",

		rank: "ARTIFACT",

		answers:
			"What this page asserts about itself, in one record beside its evidence.",
	},

	{
		type: "FACT",

		form: "LEDGER",

		block: "RecordLedger",

		rank: "LEAF",

		answers: "What is true of this one object, as `key: value` rows.",
	},

	{
		type: "COMMAND",

		form: "WELL",

		block: "RecordWell",

		rank: "LEAF",

		answers:
			"What you type: a command or transcript, framed, copyable, with its provenance.",
	},

	{
		type: "COMPARISON",

		form: "MATRIX",

		block: "RecordMatrix",

		rank: "SET",

		answers:
			"How one state compares across columns, with one ink per column.",
	},

	{
		type: "PROCESS",

		form: "STAGE",

		block: "RecordStage",

		rank: "SET",

		answers: "In what order this happens: numbered steps on one rail.",
	},

	{
		type: "EDITION",

		form: "MATRIX",

		block: "RecordMatrix",

		rank: "SET",

		answers:
			"Which releases came before this one, read across published, platform and change.",
	},

	{
		type: "RECORD",

		form: "ENTRY",

		block: "RecordEntry",

		rank: "LEAF",

		answers: "Which one record this is, out of the set it belongs to.",
	},

	{
		type: "MEASUREMENT",

		form: "INSTRUMENT",

		block: "RecordInstrument",

		rank: "SET",

		answers:
			"How much, and where the figure came from - a figure without a source is not printed.",
	},

	{
		type: "EVIDENCE",

		form: "FIGURE",

		block: "RecordFigure",

		rank: "LEAF",

		answers:
			"What the evidence shows, with the file it came from under it.",
	},

	{
		type: "PAIR",

		form: "PAIR",

		block: "RecordPair",

		rank: "FRAME",

		answers:
			"How two things read against each other, in one frame with one caption.",
	},

	{
		type: "ROUTE",

		form: "ARCHIVE",

		block: "RecordArchive",

		rank: "SET",

		answers:
			"Where a reader can go: the document's own addresses, filed by chapter.",
	},

	{
		type: "PERSON",

		form: "LEDGER ROW",

		rank: "LEAF",

		answers:
			"Who maintains it: one credit row, never a portrait and never a card.",
	},

	{
		type: "LICENCE",

		form: "LEDGER ROW",

		rank: "LEAF",

		answers:
			"What may be done with it: one row pointing at the document that says so in full.",
	},

	{
		type: "ANNOTATION",

		form: "MARGIN",

		block: "RecordMargin",

		rank: "LEAF",

		answers:
			"What is worth saying beside the record - and where that claim is sourced.",
	},

	{
		type: "DISCLOSURE",

		form: "ASIDE",

		block: "RecordAside",

		rank: "FRAME",

		answers:
			"What the record keeps and does not lead with: folded, one summary, one body.",
	},

	{
		type: "POSITION",

		form: "COMPARE",

		block: "RecordCompare",

		rank: "SET",

		answers:
			"Where these things sit on one axis, and which of those positions is reached.",
	},

	{
		type: "PROVENANCE",

		form: "TRACE",

		block: "RecordTrace",

		rank: "LEAF",

		answers:
			"Where a claim can be checked, in the order its own source names the places.",
	},

	{
		type: "CONDITION",

		form: "FAILURE",

		block: "RecordFailure",

		rank: "LEAF",

		answers:
			"What a reader sees when an action has failed, why, and the next step.",
	},

	{
		type: "EVIDENCE AT SCALE",

		form: "PLATE",

		block: "RecordPlate",

		rank: "LEAF",

		answers:
			"What the page has a picture of: a numbered capture at its container's width, with the manifest's facts in a channel.",
	},

	{
		type: "EVIDENCE AS A SET",

		form: "PLATE-SET",

		block: "RecordPlateSet",

		rank: "SET",

		answers:
			"Many figures of one subject, seen at one size: a field of plates, each with its own state.",
	},

	{
		type: "AUTHENTICATION",

		form: "STAMP",

		block: "RecordStamp",

		rank: "LEAF",

		answers:
			"What makes this record what it claims to be: one mark, the route it was issued under, and the authority that verifies it.",
	},

	{
		type: "SESSION",

		form: "TRANSCRIPT",

		block: "RecordTranscript",

		rank: "LEAF",

		answers:
			"What happened when it was typed: turns, speakers and the answers, in order, with the source it was read from.",
	},

	{
		type: "ANNOTATED FIGURE",

		form: "INSET",

		block: "RecordInset",

		rank: "LEAF",

		answers:
			"The claim the margin could not hold alone: a note with its figure - a capture, or bars drawn from the page's own numbers.",
	},
];

/**
 * The band's caption: the rule, stated once, above the table it governs.
 *
 * It names the two things the matrix would otherwise look like errors - a form
 * serving two types, and a type with no form - so a reader meets them as
 * decisions rather than as gaps.
 */
export const FormsCaption =
	"Where two blocks could answer, the narrower wins: a fact that fits a ledger row never gets a matrix, and a set that fits an archive never becomes a band of entries. `COMPARISON` and `EDITION` share the matrix because a release is read against the others rather than filed as a list - the Download page prints one header and one row per release, and prints the header alone while there are none. `PERSON` and `LICENCE` take no form of their own: they are ledger rows, and a card built for one sentence is a card built to fill a grid. `POSITION` is the form the matrix cannot answer - a matrix has no ends, and an axis does. `PROVENANCE` and `CONDITION` are the two newest: a trace is not a stage (a stage is an order in time, a trace is the order a claim is checked in) and a failure is not a record (it has three fixed fields and one state word, and prose loses the third). `FACT` now has two readings in one form - the ledger's list and its register - which is a variant of the form, not a second form. The count in the last column is the block's, not the type's: a shared block is mounted by every route that uses either type. The five apparatus forms are the newest: `PLATE` and `PLATE-SET` are the two ways the document shows a picture (one capture at plate scale with its manifest in a channel; many figures of one subject at one size), `STAMP` is the one mark that says a record is what it claims and the authority that verifies it, `TRANSCRIPT` is a session with two sides, and `INSET` is the margin note that had to bring its figure. None of them replaces a figure, a ledger, a well or a margin note: each answers an information type the site carried and had no shape for.";
