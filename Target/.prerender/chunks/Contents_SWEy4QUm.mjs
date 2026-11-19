import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { St as Header, a as HrefOf, at as CountOf, c as Registry, ct as $$RecordLedger, d as Routes, f as Totals, ft as RegisterOf, g as Bands$1, i as DeclaredModules, l as RouteCountFor, o as MarkerOf, s as NoteOf, st as Languages, t as $$Base, u as RouteGroups } from "./Base_BVG1wSoZ.mjs";
import { t as $$BandFoot } from "./BandFoot_BGOxIJt3.mjs";
import { t as $$Leader } from "./Leader_DxfAy4P-.mjs";
import { t as $$RecordArchive } from "./RecordArchive_CZrMiIzl.mjs";
import { t as $$RecordBand } from "./RecordBand_-2ERi8bg.mjs";
import { t as $$RecordHero } from "./RecordHero_CG7tGgqQ.mjs";
import { t as $$RecordInstrument } from "./RecordInstrument_fvdZRdXs.mjs";
import { t as $$RecordMatrix } from "./RecordMatrix_Dd20c_be.mjs";
import { n as $$RecordPlateSet, t as $$RecordStamp } from "./RecordStamp_CsxbHwZe.mjs";
import { t as $$RecordStage } from "./RecordStage_Gz3AmIfZ.mjs";
import { t as $$Onward } from "./Onward_CHlXNaLt.mjs";
import { t as $$Trail } from "./Trail_Btt_p1Ie.mjs";
import { t as $$Fold } from "./Fold_fN1bmzGW.mjs";
import { t as $$MatrixControl } from "./MatrixControl_CcVOz1Wb.mjs";
import { n as ElementPlateSet } from "./Plate_29FE9-EQ.mjs";
import { t as DocumentStamp } from "./Stamp_CjQLUvWY.mjs";
import { i as Served, n as Lab } from "./Lab_C7Fe6NZ4.mjs";
import { r as Sequence } from "./Band__vm9e46K.mjs";
import { t as Bands$2 } from "./Compare_BdgkRQ4A.mjs";
import { t as Bands$3 } from "./Status_DmpaXQPk.mjs";
import { r as Bands$4 } from "./Page_C5C_LjVl.mjs";
import { t as Bands$5 } from "./Page_tkIW5-nu.mjs";
// Source/Content/Index/Forms.ts
/**
* The five apparatus forms - the plate, the plate-set, the stamp, the transcript
* and the inset - are each a *different* information type from the block nearest
* to it, and the `answers` line is what keeps them apart. A plate is not a figure
* (the evidence the record is about, numbered, with a channel, versus the evidence
* a paragraph illustrates); a plate-set is not a matrix (many figures of one
* subject, versus values across columns); a stamp is not a ledger (one mark and
* its authority, versus what is true of an object); a transcript is not a well
* (a session with two sides, versus one command); an inset is not a margin note
* (a claim that had to bring its figure, versus a claim alone).
*/
var TypeForms = [
	{
		type: "CLAIM",
		form: "HERO",
		block: "RecordHero",
		rank: "ARTIFACT",
		answers: "What this page asserts about itself, in one record beside its evidence."
	},
	{
		type: "FACT",
		form: "LEDGER",
		block: "RecordLedger",
		rank: "LEAF",
		answers: "What is true of this one object, as `key: value` rows."
	},
	{
		type: "COMMAND",
		form: "WELL",
		block: "RecordWell",
		rank: "LEAF",
		answers: "What you type: a command or transcript, framed, copyable, with its provenance."
	},
	{
		type: "COMPARISON",
		form: "MATRIX",
		block: "RecordMatrix",
		rank: "SET",
		answers: "How one state compares across columns, with one ink per column."
	},
	{
		type: "PROCESS",
		form: "STAGE",
		block: "RecordStage",
		rank: "SET",
		answers: "In what order this happens: numbered steps on one rail."
	},
	{
		type: "EDITION",
		form: "MATRIX",
		block: "RecordMatrix",
		rank: "SET",
		answers: "Which releases came before this one, read across published, platform and change."
	},
	{
		type: "RECORD",
		form: "ENTRY",
		block: "RecordEntry",
		rank: "LEAF",
		answers: "Which one record this is, out of the set it belongs to."
	},
	{
		type: "MEASUREMENT",
		form: "INSTRUMENT",
		block: "RecordInstrument",
		rank: "SET",
		answers: "How much, and where the figure came from - a figure without a source is not printed."
	},
	{
		type: "EVIDENCE",
		form: "FIGURE",
		block: "RecordFigure",
		rank: "LEAF",
		answers: "What the evidence shows, with the file it came from under it."
	},
	{
		type: "PAIR",
		form: "PAIR",
		block: "RecordPair",
		rank: "FRAME",
		answers: "How two things read against each other, in one frame with one caption."
	},
	{
		type: "ROUTE",
		form: "ARCHIVE",
		block: "RecordArchive",
		rank: "SET",
		answers: "Where a reader can go: the document's own addresses, filed by chapter."
	},
	{
		type: "PERSON",
		form: "LEDGER ROW",
		rank: "LEAF",
		answers: "Who maintains it: one credit row, never a portrait and never a card."
	},
	{
		type: "LICENCE",
		form: "LEDGER ROW",
		rank: "LEAF",
		answers: "What may be done with it: one row pointing at the document that says so in full."
	},
	{
		type: "ANNOTATION",
		form: "MARGIN",
		block: "RecordMargin",
		rank: "LEAF",
		answers: "What is worth saying beside the record - and where that claim is sourced."
	},
	{
		type: "DISCLOSURE",
		form: "ASIDE",
		block: "RecordAside",
		rank: "FRAME",
		answers: "What the record keeps and does not lead with: folded, one summary, one body."
	},
	{
		type: "POSITION",
		form: "COMPARE",
		block: "RecordCompare",
		rank: "SET",
		answers: "Where these things sit on one axis, and which of those positions is reached."
	},
	{
		type: "PROVENANCE",
		form: "TRACE",
		block: "RecordTrace",
		rank: "LEAF",
		answers: "Where a claim can be checked, in the order its own source names the places."
	},
	{
		type: "CONDITION",
		form: "FAILURE",
		block: "RecordFailure",
		rank: "LEAF",
		answers: "What a reader sees when an action has failed, why, and the next step."
	},
	{
		type: "EVIDENCE AT SCALE",
		form: "PLATE",
		block: "RecordPlate",
		rank: "LEAF",
		answers: "What the page has a picture of: a numbered capture at its container's width, with the manifest's facts in a channel."
	},
	{
		type: "EVIDENCE AS A SET",
		form: "PLATE-SET",
		block: "RecordPlateSet",
		rank: "SET",
		answers: "Many figures of one subject, seen at one size: a field of plates, each with its own state."
	},
	{
		type: "AUTHENTICATION",
		form: "STAMP",
		block: "RecordStamp",
		rank: "LEAF",
		answers: "What makes this record what it claims to be: one mark, the route it was issued under, and the authority that verifies it."
	},
	{
		type: "SESSION",
		form: "TRANSCRIPT",
		block: "RecordTranscript",
		rank: "LEAF",
		answers: "What happened when it was typed: turns, speakers and the answers, in order, with the source it was read from."
	},
	{
		type: "ANNOTATED FIGURE",
		form: "INSET",
		block: "RecordInset",
		rank: "LEAF",
		answers: "The claim the margin could not hold alone: a note with its figure - a capture, or bars drawn from the page's own numbers."
	}
];
/**
* The band's caption: the rule, stated once, above the table it governs.
*
* It names the two things the matrix would otherwise look like errors - a form
* serving two types, and a type with no form - so a reader meets them as
* decisions rather than as gaps.
*/
var FormsCaption = "Where two blocks could answer, the narrower wins: a fact that fits a ledger row never gets a matrix; a set that fits an archive never becomes a band of entries. `COMPARISON` and `EDITION` share the matrix because a release is read against the others rather than filed as a list: the Download page prints one header and one row per release, and the header alone while there are none. `PERSON` and `LICENCE` take no form of their own: ledger rows, and a card built for one sentence is a card built to fill a grid. `POSITION` is the form the matrix cannot answer: a matrix has no ends, an axis does. `PROVENANCE` and `CONDITION` are the two newest: a trace is not a stage (a stage is an order in time; a trace is the order a claim is checked in) and a failure is not a record (three fixed fields, one state word, and prose loses the third). `FACT` now has two readings in one form - the ledger's list and its register - a variant of the form, not a second form. The count in the last column is the block's, not the type's: a shared block is mounted by every route that uses either type. The five apparatus forms are the newest: `PLATE` and `PLATE-SET` are the two ways the document shows a picture (one capture at plate scale with its manifest in a channel; many figures of one subject at one size); `STAMP` is the one mark that says a record is what it claims and the authority that verifies it; `TRANSCRIPT` is a session with two sides; `INSET` is the margin note that had to bring its figure. None replaces a figure, a ledger, a well or a margin note: each answers an information type the site carried and had no shape for.";
// Source/Content/Index/Page.ts
/**
* The lab switch. One row below offers the specimen sheet, and a production build
* does not contain that page (`Function/Configuration/Lab.mjs`), so the register
* asks the build before it prints the door.
*/
/** The field-record separator: U+2001, never U+00B7. */
var Quad$1 = " ";
/**
* The distinct forms the artifact table names.
*
* Derived from the table rather than written beside it: two types may ride one
* form (`PERSON` and `LICENCE` are both ledger rows), so a hard count would be
* the one number on this page that could drift from the rows under it.
*/
var FormCount = new Set(TypeForms.map((Row) => Row.form)).size;
/**
* The record this page opens on.
*
* `VERIFIED` is the one state in the vocabulary that means "checked against
* something", and it is literally true here: the figures beside it were measured
* from the tree on the last run of the register. The specimen tone is the accent
* authenticating that claim, which is what the accent is for.
*
* There is no evidence panel. An index has no picture of itself, and a figure
* invented to fill the second panel would be the one thing this page argues
* against - so the artifact is its card alone, at the full measure, exactly as
* the 404's card would be without its plate.
*/
var IndexRecord = (Totals) => ({
	index: "CONTENTS_01",
	claim: "EVERYTHING ACCOUNTED FOR",
	route: "/SCOPE:THE WHOLE TREE",
	status: {
		state: "verified",
		tone: "specimen"
	},
	seal: "Land",
	metadata: [
		{
			key: "ROUTES:",
			value: String(Totals.Routes),
			note: "addresses the build emits"
		},
		{
			key: "DOCUMENTS:",
			value: String(Totals.Documents),
			note: "reference articles"
		},
		{
			key: "ENTRIES:",
			value: String(Totals.Entries),
			note: "filed blog entries"
		},
		{
			key: "ELEMENTS:",
			value: String(Totals.Elements),
			note: "one record each"
		},
		{
			key: "FORMS:",
			value: String(FormCount),
			note: `${Totals.Blocks} blocks, ${TypeForms.length} types`
		},
		{
			key: "MODULES:",
			value: String(Totals.Read),
			note: `read, of ${Totals.Modules} outside the bulk trees`
		},
		{
			key: "LICENSE:",
			value: "CC0",
			links: [{
				text: "CC0",
				href: "/License"
			}]
		}
	],
	relation: "LAND:",
	proposition: "START WITH THE FORMS"
});
/**
* The legend: the eight marks, and what each one relates.
*
* Two columns, because a legend is read as a table of eight short facts and a
* single column would put a page of air between `#` and its meaning. The key is
* the mark itself - the ledger prints it at the key role, which is the mono face,
* and a mark is a literal before it is a word.
*/
var Marks = [
	{
		key: "#",
		value: "A series marker: which record this is, and which set it belongs to."
	},
	{
		key: "〈 〉",
		value: "Containment: the runtime claim, or the stamp a record is filed under."
	},
	{
		key: "/",
		value: "A route, a command or a category - one slash, never a second."
	},
	{
		key: "→",
		value: "Direction: what a step leads to."
	},
	{
		key: "↳",
		value: "Relation: the one-line proposition a record hangs from its nameplate."
	},
	{
		key: ":",
		value: "A field label - `STATUS:`, `TARGET:`, `LICENSE:` - the colon is the label's."
	},
	{
		key: "◎",
		value: "The fallback: a value that is not there, printed rather than left blank."
	},
	{
		key: "U+2001",
		value: "The only separator. An em quad, never a middle dot."
	}
];
/** The bands, in the order the page reads them. */
var Bands = {
	/**
	* The page's own table of contents, as a band. It lives here rather than
	* inline in `pages/Contents.astro` because the interval register reads every
	* band's rung from one place: a sequence restated in a second file drifts
	* from the page it claims to describe, and a register that drifts is a
	* register of nothing.
	*/
	Chapters: {
		kicker: "/THE CHAPTERS",
		interval: "turn",
		heading: "Eight divisions, in reading order",
		standfirst: "Each chapter names the job a reader arrives with. The figure at the end of its line is the number of addresses the build answers in that chapter, counted from the same register the archive below files them from."
	},
	Marks: {
		kicker: "/THE GRAMMAR",
		interval: "rest",
		heading: "Eight marks, and no others",
		standfirst: "Every page of this document is printed in the same eight marks. They are not decoration: each one carries a relation a sentence would need a clause to say.",
		footnote: "The grammar is level one - no card, no page and no later decision overrules it. The marks are written as literals in the source, never as characters an editor could silently fold into a middle dot.",
		tone: "canvas"
	},
	/**
	* The four distances the document opens its bands at, and the rule a new band
	* follows. It is a band like any other because the rhythm is a fact about this
	* document, and a fact the document states about itself belongs in its index.
	*/
	Intervals: {
		kicker: "/THE INTERVALS",
		interval: "beat",
		heading: "Four distances, and no fifth",
		standfirst: "Every band in this document opens at one of four intervals. They are a ladder at about 1.4 times a rung - the smallest step the eye reads as a different distance - two wide, two tight, which is what lets a page say \"wide\" twice without saying it at the same volume.",
		footnote: `SOURCE: SOURCE/STYLESHEET/SYSTEM/LAYOUT/_INTERVAL.SCSS${Quad$1}EVERY SEQUENCE BELOW IS READ FROM THE BANDS ITS PAGE DECLARES, NEVER RESTATED`
	},
	Forms: {
		kicker: "/THE FORMS",
		interval: "break",
		heading: "One information type, one form",
		standfirst: `${TypeForms.length} kinds of information, ${FormCount} forms. The count in the last column is measured, not claimed: the number of routes whose import tree mounts the block.`,
		footnote: "`CLAIM` prints from `RecordHero` on the 404 and on this page; the homepage's claim is the endorsed two-panel hero pair, which is a keeper and outranks the block. One form, two renderings - and the pair is the one the site is recognised by.",
		tone: "paper"
	},
	Plates: {
		kicker: "/THE PLATES",
		interval: "rest",
		heading: "What the document has a picture of",
		standfirst: "Fifteen element records, fifteen manifest states and one verified capture. The mark beside the set is the one this index is issued under, and the set is the evidence the document does not have - stated cell by cell rather than left as a gallery of holes.",
		footnote: "SOURCE: PUBLIC/EVIDENCE/*/MANIFEST.YAML SOURCE/CONTENT/ELEMENT/WORKING.TS A CELL'S STATE IS ITS MANIFEST'S, NOT THIS PAGE'S",
		tone: "canvas"
	},
	/**
	* The four composition languages, here for the same reason the chapter index
	* is: the interval register needs every band in one place, and a band declared
	* twice is a band that can disagree with itself.
	*/
	Languages: {
		kicker: "/THE LANGUAGES",
		interval: "beat",
		heading: "Four ways to compose a page",
		standfirst: "A page is not a stack of bands. It is read, operated, audited or shown, and each of those is a different set of tracks: a reading page is given RAIL MEASURE MARGIN, a workspace page RAIL PANES DRAWER, an audit page LEDGER MATRIX WELLS, and a plate page PLATE CHANNEL HEAD.",
		footnote: `SOURCE: SOURCE/COMPONENT/SHELL/LANGUAGE.TS${Quad$1}ROUTES COUNTED FROM THE SAME REGISTER`
	},
	Routes: {
		kicker: "/THE ROUTES",
		interval: "break",
		heading: "Every address this document answers on",
		standfirst: "Filed by chapter, in the order a reader moves through them. The marker column names the forms the route mounts; `◎` means the route prints no block at all.",
		tone: "canvas"
	},
	Register: {
		kicker: "/THE REGISTER",
		interval: "rest",
		heading: "What carries the facts, and what reads it",
		standfirst: "The document's extent, in eight figures - each one printed with the file it was counted in, because a number without a source is an assertion, not a fact.",
		tone: "canvas"
	},
	Declared: {
		kicker: "/THE DECLARED",
		interval: "beat",
		heading: "Files that exist for a reason, and no page reads them",
		standfirst: "Nothing in this tree is unexplained. These are the modules with no reader - each one states what it carries, and what it is waiting for. Two libraries are measured as bulk and not listed: the vendored `Component/UI` kit and the `Component/Dynamic/Interface` schemas, because a catalogue is judged by what it offers rather than by what the site mounted.",
		tone: "paper"
	},
	Record: {
		kicker: "/THE RECORD",
		interval: "turn",
		heading: "How this page was made",
		standfirst: "The index is generated from the tree, so its numbers cannot drift from the files they describe. Re-running the register is the only way to change a figure on this page.",
		tone: "canvas"
	}
};
/** The forms matrix: type, form, rank, and the measured route count. */
var FormColumns = [
	{ label: "TYPE" },
	{
		label: "FORM",
		ink: "Accent"
	},
	{
		label: "RANK",
		ink: "MuteForeground"
	},
	{
		label: "ROUTES",
		ink: "MuteForeground",
		align: "center"
	}
];
/**
* The closing ledger: how the index itself is made.
*
* It closes on the colophon rather than reproducing one. The footer already
* prints the document's making - paper, type, build, extent - and a second
* colophon on this page would be two answers to one question.
*/
var RecordRows = (Totals, AsOf, JellyPin) => [
	{
		key: "ENTRIES:",
		value: `${Totals.Routes} ROUTES`,
		note: "every address the build emits, dynamic ones included"
	},
	{
		key: "GROUPED BY:",
		value: "CHAPTER",
		note: "eight divisions, in reading order"
	},
	{
		key: "MARKER:",
		value: "THE FORMS THE ROUTE MOUNTS",
		note: "`◎` where it mounts none"
	},
	{
		key: "FORMS:",
		value: `${TypeForms.length} TYPES, ${FormCount} FORMS`,
		note: `${Totals.Blocks} blocks, two types ride a ledger row`
	},
	{
		key: "GENERATED:",
		value: "Source/Script/Register.ts",
		code: true,
		note: "run by hand; its output is checked in"
	},
	{
		key: "JELLY:",
		value: JellyPin,
		code: true,
		note: "the surface family's pin"
	},
	{
		key: "AS OF:",
		value: AsOf,
		note: "the date of this reading"
	},
	{
		key: "COLOPHON:",
		value: "THE FOOTER",
		note: `the document's making${Quad$1}paper, type, build, extent`
	}
];
/**
* The routes band's footnote: the registry's own account of itself.
*
* The registry is hand-kept and the build is not, so the honest thing for an
* index to do with a disagreement is print it rather than repair it silently.
* `Missing` is what the build emits and the registry does not declare; the names
* are the argument, so they are named.
*
* Three figures, because the registry and the build answer three questions: how
* many routes it declares (`Declared`), how many of those take the full
* PascalCase variant set (`Canonical`), and how many the registry lists that this
* build does not serve (`Lab` - `/Specimen`, which `dum Run` serves and the
* production output does not). A footnote that compared `Declared` against
* `Built` without that third figure would say "the two agree" while printing 43
* and 42, which is the one thing it must never do: report a difference as an
* agreement.
*
* Every figure comes from `Registry` in the generator and the sentence says what
* each one counts: a route is canonical only when it takes the full variant set,
* and a declared figure read from a list that no longer holds it is how a
* footnote comes to print `0 declared` beside forty-one names.
*/
var RegistryFootnote = (Declared, Canonical, Built, Missing, Lab) => {
	if (Missing.length > 0) return `\`Function/Route/Registry.ts\` declares ${Declared} routes, ${Canonical} of them canonical; the build emits ${Built}. The ${Missing.length} it does not declare are ${Missing.join(", ")} - the redirect layer derives its variants from that set, so this page reports the drift rather than repairing it.`;
	const Head = `\`Function/Route/Registry.ts\` declares ${Declared} routes, ${Canonical} of them canonical - the hand-listed paths that take the full variant set.`;
	if (Lab === 0) return `${Head} The build emits ${Built}. The two agree, which is the only state this footnote has nothing to report.`;
	return `${Head} The build emits ${Built}: ${Lab === 1 ? "one of them is a lab surface" : `${Lab} of them are lab surfaces`}, served by \`dum Run\` and absent from the production output. Nothing the build emits is undeclared.`;
};
/**
* The doors this build serves.
*
* The sheet is a lab door: `/Specimen` is served by `dum Run` and absent from the
* production build (`Function/Configuration/Lab.mjs`), so a production reader is
* never offered a page the host does not hold. The head's figure is counted from
* this array rather than typed, so `ONWARD / 0N` cannot claim a door the list does
* not print.
*/
var ServedOnward = [
	{
		mark: "/",
		want: "THE PARTS THEMSELVES, PRINTED",
		where: "SPECIMEN",
		href: "/Specimen",
		note: "Eleven components at 1:1 with their contracts, three stated absences, and the nine adverse states."
	},
	{
		mark: "/",
		want: "WHAT IS LIVE TODAY",
		where: "STATUS",
		href: "/Status",
		note: "Twenty-one records under the four columns of the state vocabulary."
	},
	{
		mark: "/",
		want: "WHAT THE DOCUMENT'S WORDS MEAN",
		where: "GLOSSARY",
		href: "/Glossary",
		note: "Fifteen elements, twenty nouns and five retired words."
	},
	{
		mark: "/",
		want: "THE DOCUMENT ITSELF",
		where: "DOC",
		href: "/Doc",
		note: "Sixty articles: the reference, the deep dives, and the workflows."
	}
].filter((Row) => Served(Row.href));
var ContentsOnward = {
	rows: ServedOnward,
	copy: {
		index: `ONWARD / ${String(ServedOnward.length).padStart(2, "0")}`,
		label: "/THE INDEX'S OWN DOORS",
		statement: "An index that ended on its own extent would be a page about itself. These are where the parts it counted are printed, stated, defined and written.",
		note: Lab ? `SOURCE: SOURCE/CONTENT/INDEX/PAGE.TS${Quad$1}THE SHEET IS THIS PAGE'S APPENDIX` : "SOURCE: SOURCE/CONTENT/INDEX/PAGE.TS",
		empty: "Nothing to hand over. Every destination this register would list is the index you are reading, which cannot happen while the document has other registers."
	}
};
// Source/Content/Index/Rhythm.ts
/**
* The lab switch. One row below names `/SPECIMEN`, and a production build does
* not contain that page (`Function/Configuration/Lab.mjs`), so the register asks
* the build before it describes the page's setting.
*/
/** The field-record separator: U+2001, never U+00B7. */
var Quad = " ";
/** One band's rung, as the register prints it: upper case, or the absence mark. */
var Rung = (Interval) => Interval === void 0 ? "◎" : Interval.toUpperCase();
/**
* A page's sequence, read from its bands.
*
* `Order` is the page's reading order; `Bands` is the module that declares them.
* A key the module no longer carries prints `◎` rather than dropping the band -
* a sequence with a hole in it is the honest picture of a page whose data and
* whose composition have parted company.
*/
var SequenceOf = (Bands, Order) => Order.map((Key) => Rung(Bands[Key]?.interval)).join(Quad);
/**
* The same reading for a page whose sequence is declared as a rung map rather
* than as a set of bands: the homepage states its intervals by band id in
* `Content/Home/Band.ts`, because its five bands are five components and the
* sequence is the one thing they share.
*/
var RungsOf = (Rungs, Order) => Order.map((Key) => Rung(Rungs[Key])).join(Quad);
/** A page's sequence as one register row. */
var Page = (Route, Sequence, Count, Note) => ({
	key: `${Route}:`,
	value: Sequence,
	note: `${Count} BANDS${Quad}${Note}`
});
/** The four intervals: value, register, and the split the band pays. */
var IntervalRows = [
	{
		key: "REST:",
		value: "56PX",
		note: `TIGHT${Quad}the band continues the subject above it${Quad}24 ABOVE, 32 BELOW`
	},
	{
		key: "BEAT:",
		value: "80PX",
		note: `TIGHT${Quad}a sibling subject, and what a band that declares nothing gets${Quad}48 ABOVE, 32 BELOW`
	},
	{
		key: "BREAK:",
		value: "112PX",
		note: `WIDE${Quad}a new movement, and no rule${Quad}80 ABOVE, 32 BELOW`
	},
	{
		key: "TURN:",
		value: "168PX",
		note: `WIDE${Quad}a chapter, and the block prints its boundary rule${Quad}136 ABOVE, 32 BELOW`
	}
];
/**
* The law a new band follows.
*
* Five rows, because a rhythm is five rules and not one: what a band declares,
* what it may not repeat, what a chapter adds, how a page opens and closes, and
* what happens when the band is inside an artifact instead of on a page.
*/
var IntervalLaw = [
	{
		key: "A BAND DECLARES ITS INTERVAL:",
		value: "IN ITS DATA, ONCE",
		note: "`Band.interval`, printed as `data-interval` by the block. A band that declares nothing is a beat - the interval is an enhancement, never a requirement."
	},
	{
		key: "TWO ADJACENT BANDS:",
		value: "NEVER THE SAME RUNG",
		note: "They may share a register - wide, wide, tight, tight, wide is a shape - but the second rung inside a register is what keeps two wide bands at two volumes. The layer steps a repeat up the ladder, so a page that repeats itself accelerates into a break."
	},
	{
		key: "A CHAPTER IS A TURN:",
		value: "THE BLOCK PRINTS THE RULE",
		note: "`turn` adds `record-band--chapter`, so the boundary rule cannot appear on a band that is not a chapter, or be forgotten by one that is."
	},
	{
		key: "THE PAGE'S FIRST AND LAST BAND:",
		value: "NO RULE, THEN A SETTLING",
		note: "The header already ends the page, so the first band paints no boundary; the last closes at the rest interval, because a page decelerates rather than stopping."
	},
	{
		key: "INSIDE AN ARTIFACT:",
		value: "THE TIGHT REGISTER ONLY",
		note: "A part of a subject is never a chapter of it: a legal document's clauses alternate rest and beat at the atomic steps, 16 and 32."
	}
];
/**
* The nine adverse arms, as the rhythm meets them.
*
* A sequence is a design, so it has a second design: what a page does when the
* world is unkind. Seven of the nine do not touch the rhythm at all, and saying
* so is the point - a rhythm that reacted to a failure, a stale figure or a
* denial would be emphasising the wrong thing on the page. Two do: a page with
* one band has no sequence to speak of, and a page with thirty is a composition
* the guard accelerates rather than one this layer can rescue.
*
* Where an arm has no live mount on this document it is said here rather than
* implied: the site is prerendered, so no band receives its facts after paint
* and the loading arm is composed in the blocks without a page that shows it.
*/
var IntervalArms = [
	{
		key: "EMPTY:",
		value: "A PAGE WITH ONE BAND",
		note: "It is both the first and the last, so it paints no boundary and closes at the rest interval. A page with one subject is not a chapter of itself."
	},
	{
		key: "LOADING:",
		value: "THE SAME BODY SLOT",
		note: "A skeleton sits where the facts will sit, at the same interval, so the seam does not move when they arrive. No spinner: the block draws the schema."
	},
	{
		key: "PARTIAL:",
		value: "NO HOLE",
		note: "A band with no standfirst or no index strip leaves no gap, because every part of the head carries its own distance rather than the head carrying one gap for all of them."
	},
	{
		key: "ERROR:",
		value: "SPACED LIKE ANY BODY",
		note: "A failed action is a `RecordFailure` in the body and the band does not react to it. A rhythm that changed for a failure would be emphasising the failure."
	},
	{
		key: "STALE:",
		value: "UNCHANGED",
		note: "An as-of is a fact inside the block. The band is the same distance from its neighbour whether the figure under it is an hour old or a year."
	},
	{
		key: "TOO MUCH:",
		value: "THE GUARD STEPS THE REPEAT UP",
		note: "Two identical rungs in a row and the second becomes the next rung; a third becomes the one after. A run of four is a miscomposition and this register prints it rather than hiding it."
	},
	{
		key: "TOO LONG:",
		value: "THE SEAM DOES NOT MOVE",
		note: "The interval is padding on the box, so a heading that wraps four times takes more room inside its band and never changes the distance between two bands."
	},
	{
		key: "MISSING:",
		value: "NO STRIP, NO GAP",
		note: "A band whose index strip has no cells prints no strip - never an empty one - and its body's distance is unchanged."
	},
	{
		key: "DENIED:",
		value: "NOT A BAND",
		note: "A surface the reader may not see is a `ShellState` in the shell's own band. The page's sequence does not include a band that is not printed, and the page closes on its own last band."
	}
];
var HomeOrder = [
	"features",
	"pricing",
	"testimonials",
	"method",
	"download"
];
var IndexOrder = [
	"Chapters",
	"Marks",
	"Intervals",
	"Forms",
	"Plates",
	"Languages",
	"Routes",
	"Register",
	"Declared",
	"Record"
];
var GlossaryOrder = [
	"Words",
	"Retired",
	"Limits"
];
var StatusOrder = [
	"Board",
	"Axis",
	"Vocabulary",
	"Figures",
	"Reading",
	"Limits"
];
var CompareOrder = [
	"Rows",
	"Carries",
	"Measure"
];
var SpecimenOrder = [
	"Sheet",
	"Plates",
	"Absences",
	"States",
	"Field",
	"Overlay",
	"Display",
	"Record",
	"Narrative",
	"Frame",
	"Reading",
	"Composition",
	"Material",
	"Register"
];
var MotionOrder = [
	"Register",
	"Specimens",
	"Sequences",
	"Fold",
	"Arms",
	"Refusals",
	"Record"
];
/**
* The sequences this build can print.
*
* A page's row is kept only if the build serves the page it names: `/SPECIMEN` is
* a lab surface, served by `dum Run` and absent from production
* (`Function/Configuration/Lab.mjs`), and a register that described the setting of
* a page the host does not hold would be inventing a fact to fill a row - which is
* the one thing this file refuses to do. The row's key is the page's name with the
* grammar's `:` field mark, so the predicate reads the key without it.
*/
var SequenceRows = [
	Page("/", RungsOf(Sequence, HomeOrder), HomeOrder.length, "THE PAGE THAT TAUGHT THE LADDER"),
	Page("/CONTENTS", SequenceOf(Bands, IndexOrder), IndexOrder.length, "THE INDEX, INCLUDING THIS BAND"),
	Page("/GLOSSARY", SequenceOf(Bands$1, GlossaryOrder), GlossaryOrder.length, "THREE RUNS: THE ELEMENTS, THE GRAMMAR, THE RETIRED WORDS"),
	Page("/STATUS", SequenceOf(Bands$3, StatusOrder), StatusOrder.length, "THE AUDIT: THE BOARD FIRST, THE LIMITS LAST"),
	Page("/COMPARE", SequenceOf(Bands$2, CompareOrder), CompareOrder.length, "THE SUBSTITUTION, WHAT IT CARRIES, WHAT NOBODY MEASURED"),
	Page("/SPECIMEN", SequenceOf(Bands$5, SpecimenOrder), SpecimenOrder.length, "THE PRINTER'S SPECIMEN, ONE BAND PER KIND OF PART"),
	Page("/MOTION", SequenceOf(Bands$4, MotionOrder), MotionOrder.length, "THE REGISTER IS PRINTED FIRST ON THE PAGE, SO IT IS FIRST HERE"),
	{
		key: "/DOWNLOAD:",
		value: "◎ ONE ARTIFACT",
		note: `NO BAND SEQUENCE TO STATE${Quad}its rhythm is inside the release record, where the regions sit at the artifact step`
	}
].filter((Row) => Served(Row.key.replace(/:$/, "")));
// Source/Variable/JellyUIVersion.ts
var JellyUIVersion = "cfafb50b1d49f1ae550abae714037e4aa249bfaa";
// Source/pages/Contents.astro
var Contents_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Contents,
	file: () => $$file,
	url: () => $$url
});
var $$Contents = createComponent(($$result, $$props, $$slots) => {
	const AsOf = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const Record = IndexRecord(Totals);
	const MetaTitle = "Contents | Code Editor Land";
	const MetaDescription = "The index of this document: every information type and the form it takes, every address the build answers on, the extent of the tree, and the files that exist without a reader.";
	const FormRows = TypeForms.map((Type) => ({
		label: Type.type,
		cells: [
			Type.form,
			Type.rank,
			RouteCountFor(Type.block)
		]
	}));
	const ChapterEntries = RouteGroups.map(({ chapter, routes }) => ({
		label: chapter.label,
		meta: `${routes.length}\u2001${routes.length === 1 ? "ROUTE" : "ROUTES"}`,
		href: HrefOf(routes[0].Path),
		note: chapter.answers
	}));
	const ChaptersRegister = RegisterOf("CHAPTERS", ChapterEntries);
	const ChapterSee = [{
		route: "/ROUTES",
		href: "#routes",
		reason: "every address the build emits, filed by the chapter it belongs to"
	}, {
		route: "/FORMS",
		href: "#forms",
		reason: "each information type, the shape it takes, and the routes that mount it"
	}];
	const RouteEntries = RouteGroups.flatMap(({ chapter, routes }) => routes.map((Route) => ({
		title: Route.Path,
		href: HrefOf(Route.Path),
		note: NoteOf(Route),
		marker: MarkerOf(Route),
		group: chapter.label
	})));
	const Measures = [
		{
			label: "ROUTES",
			value: String(Totals.Routes),
			unit: "ADDRESSES",
			provenance: "Source/Generated/Facts/Routes.json",
			lead: true
		},
		{
			label: "DOCUMENTS",
			value: String(Totals.Documents),
			unit: "ARTICLES",
			provenance: "Source/Content/doc/**/*.md"
		},
		{
			label: "ENTRIES",
			value: String(Totals.Entries),
			unit: "FILED",
			provenance: "Source/Content/blog/*.md"
		},
		{
			label: "ELEMENTS",
			value: String(Totals.Elements),
			unit: "RECORDS",
			provenance: "Source/Content/Record/*.ts"
		},
		{
			label: "FORMS",
			value: String(Totals.Blocks),
			unit: "BLOCKS",
			provenance: "Source/Component/Record/*.astro"
		},
		{
			label: "MODULES",
			value: String(Totals.Modules),
			unit: "OUTSIDE BULK",
			provenance: "Source/Generated/Facts/Modules.json"
		},
		{
			label: "READ",
			value: String(Totals.Read),
			unit: "OF THOSE",
			provenance: "Source/Generated/Facts/Modules.json"
		},
		{
			label: "DECLARED",
			value: String(Totals.Declared),
			unit: "WITH NO READER",
			provenance: "Source/Generated/Facts/Modules.json"
		}
	];
	const LanguageColumns = [
		{ label: "GIVES" },
		{ label: "MEASURE" },
		{
			label: "ENTRIES",
			align: "center"
		}
	];
	const LanguageRows = [
		"reading",
		"workspace",
		"audit",
		"plate",
		"record"
	].map((Key) => {
		const Spec = Languages[Key];
		return {
			label: Spec.name,
			cells: [
				Spec.gives.replace(/\u2001/g, " / "),
				Spec.measure,
				String(CountOf(Key))
			]
		};
	});
	const LanguageContract = [
		"reading",
		"workspace",
		"audit",
		"plate"
	].map((Key) => ({
		key: `${Languages[Key].name}:`,
		value: Languages[Key].declares.join(" ")
	}));
	const LanguageCaption = "A page declares its language by being filed in `Source/Component/Shell/Language.ts`, and nowhere else: `Base.astro` writes the answer on `<html>` for the running head, `PageShell` reads the same answer for its grid, and the page prints the declaration strip above its first track. ENTRIES is counted from that register; a prefix entry covers every route under it.";
	const DeclaredRows = DeclaredModules.map((Module) => ({
		key: Module.Path,
		value: Module.Reason,
		note: Module.Carries,
		code: true
	}));
	const Stages = [
		{
			index: "01",
			label: "MEASURE",
			line: "`Source/Script/Register.ts` walks `Source/`, resolves every import and marks what the pages reach."
		},
		{
			index: "02",
			label: "WRITE",
			line: "It writes three fact files into `Source/Generated/Facts/`, each one naming the tree it read."
		},
		{
			index: "03",
			label: "READ",
			line: "This page reads them through `Library/Index/Register.ts` and prints them. It counts nothing itself."
		}
	];
	const TrailItems = [{
		label: "/HOME",
		href: "/"
	}, { label: "/CONTENTS" }];
	const Built = Routes.length;
	const Lab = Registry.Declared.filter((Path) => !Served(Path)).length;
	const BandIds = {
		Chapters: "chapters",
		Marks: "grammar",
		Intervals: "intervals",
		Forms: "forms",
		Plates: "plates",
		Languages: "languages",
		Routes: "routes",
		Register: "extent",
		Declared: "declared",
		Record: "record"
	};
	const MovementMeta = {
		Chapters: `${RouteGroups.length} CHAPTERS`,
		Languages: `${Languages.length} LANGUAGES`
	};
	const Movements = Object.entries(Bands).map(([Key, Entry], Index) => ({
		Index: String(Index + 1).padStart(2, "0"),
		Label: Entry.heading.toUpperCase(),
		Href: `#${BandIds[Key]}`,
		Meta: MovementMeta[Key]
	}));
	const FormFacets = FormColumns.map((Column, Index) => ({
		Key: String(Index),
		Label: Column.label
	}));
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription
	}, {
		"default": ($$result) => renderTemplate`  ${maybeRenderHead($$result)}<div class="mx-auto max-w-5xl"> <div class="px-4 pt-6"> ${renderComponent($$result, "Trail", $$Trail, { "trail": TrailItems })}  ${renderComponent($$result, "Fold", $$Fold, {
			"Items": Movements,
			"Name": "ON THIS PAGE",
			"Wide": true,
			"Empty": "This page prints one subject and no sections, so there is nothing to list. Read it top to bottom - it is ten movements."
		})} </div> ${renderComponent($$result, "RecordHero", $$RecordHero, { ...Record })} </div> ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Chapters,
			id: "chapters"
		} }, {
			"default": ($$result) => renderTemplate` ${renderComponent($$result, "Leader", $$Leader, {
				"items": ChapterEntries,
				"register": ChaptersRegister,
				"columns": 2
			})}  `,
			"foot": ($$result) => renderTemplate`${renderComponent($$result, "BandFoot", $$BandFoot, {
				"slot": "foot",
				"index": "08",
				"part": "/THE INDEX",
				"see": ChapterSee,
				"figure": {
					value: String(RouteGroups.length),
					unit: "CHAPTERS"
				},
				"asOf": AsOf,
				"source": "SOURCE/CONTENT/INDEX/CHAPTERS.TS"
			})}`
		})} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Intervals,
			id: "intervals"
		} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
			"rows": IntervalRows,
			"columns": 2,
			"register": RegisterOf("THE LADDER", IntervalRows)
		})} ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
			"rows": IntervalLaw,
			"register": RegisterOf("THE LAW", IntervalLaw)
		})} ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
			"rows": IntervalArms,
			"register": RegisterOf("THE ARMS", IntervalArms)
		})} ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
			"rows": SequenceRows,
			"columns": 2,
			"register": RegisterOf("THE SEQUENCES", SequenceRows)
		})} ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Marks,
			id: BandIds.Marks
		} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
			"rows": Marks,
			"columns": 2
		})} ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Forms,
			id: BandIds.Forms
		} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "MatrixControl", $$MatrixControl, {
			"Target": "forms-matrix",
			"Facets": FormFacets,
			"Name": "THE FORMS",
			"Total": FormRows.length
		})} ${renderComponent($$result, "RecordMatrix", $$RecordMatrix, {
			"id": "forms-matrix",
			"columns": FormColumns,
			"rows": FormRows,
			"caption": FormsCaption
		})} ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Plates,
			id: BandIds.Plates
		} }, { "default": ($$result) => renderTemplate` <div class="record-stamped"> <div class="record-stamped__stamp"> ${renderComponent($$result, "RecordStamp", $$RecordStamp, { "stamp": DocumentStamp(Totals, AsOf) })} </div> <div class="record-stamped__register"> ${renderComponent($$result, "RecordPlateSet", $$RecordPlateSet, { "set": ElementPlateSet })} </div> </div> ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Languages,
			id: "languages"
		} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "RecordMatrix", $$RecordMatrix, {
			"columns": LanguageColumns,
			"rows": LanguageRows,
			"caption": LanguageCaption
		})} ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
			"rows": LanguageContract,
			"columns": 1
		})} ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Routes,
			id: BandIds.Routes,
			footnote: RegistryFootnote(Registry.Count, Registry.Canonical, Built, Registry.Missing, Lab)
		} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "RecordArchive", $$RecordArchive, {
			"entries": RouteEntries,
			"index": "ROUTES_01"
		})} ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Register,
			id: BandIds.Register
		} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "RecordInstrument", $$RecordInstrument, {
			"measures": Measures,
			"label": "/THE EXTENT",
			"caption": "Every figure was taken from the file named under it on the last run of the register. A figure this page could not measure would print UNAVAILABLE, never a zero.",
			"empty": "The register has not been run against this tree, so there are no figures to print. Run `node Source/Script/Register.ts` and rebuild - this page will not invent a number to fill the panel."
		})} ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Declared,
			id: BandIds.Declared
		} }, { "default": ($$result) => renderTemplate`${DeclaredRows.length > 0 ? renderTemplate`${renderComponent($$result, "RecordLedger", $$RecordLedger, { "rows": DeclaredRows })}` : renderTemplate`${renderComponent($$result, "RecordLedger", $$RecordLedger, { "rows": [{
			key: "◎",
			value: "Every module outside the bulk trees is read by something. There is nothing on this page to explain, which is the state this band exists to reach."
		}] })}`}` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Record,
			id: BandIds.Record
		} }, {
			"default": ($$result) => renderTemplate` ${renderComponent($$result, "RecordStage", $$RecordStage, {
				"stages": Stages,
				"orientation": "row"
			})} ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
				"rows": RecordRows(Totals, AsOf, JellyUIVersion),
				"columns": 2
			})}  `,
			"foot": ($$result) => renderTemplate`${renderComponent($$result, "Onward", $$Onward, {
				"slot": "foot",
				"rows": ContentsOnward.rows,
				"copy": ContentsOnward.copy
			})}`
		})} `,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "Header", Header, {
			"client:load": true,
			"Mode": "functional",
			"slot": "Header",
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})}`
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contents.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contents.astro";
var $$url = "/Contents";
// \0virtual:astro:page:Source/pages/Contents@_@astro
var page = () => Contents_exports;
export { page };
