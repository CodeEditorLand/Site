/**
 * Page - the index's copy, and nothing else.
 *
 * Every sentence `/Contents` prints is here, so the page composes and decides
 * nothing about what it says. The figures are not here: they arrive from
 * `Library/Index/Register.ts`, which reads what `Source/Script/Register.ts`
 * measured, and the page hands them in. A number written in this file would be
 * the one thing the index must not contain - a figure with no source.
 *
 * The copy is English, and deliberately so. `GetI18n` is English-only by design
 * on every prerendered surface (the footer's own header records the same
 * decision), and an index of a document is the one page whose wording is
 * structural: `THE FORMS` names a band, not a sentence a translator would want
 * to re-flow. The grammar is not translated either.
 *
 * The eight marks below are the legend the front matter prints. Each row is a
 * `LedgerRow` - a fact about one object (the grammar) - because that is what a
 * legend is: not a comparison, and not a set.
 */
import type {
	Band,
	Hero,
	LedgerRow,
	MatrixColumn,
} from "../../Component/Record/Type.js";

import type { OnwardCopy, OnwardRow } from "../../Content/More/Page.js";

import { TypeForms } from "./Forms.js";

import type { TotalsFact } from "../../Library/Index/Register.js";

/**
 * The lab switch. One row below offers the specimen sheet, and a production build
 * does not contain that page (`Function/Configuration/Lab.mjs`), so the register
 * asks the build before it prints the door.
 */
import { Lab, Served } from "../../Function/Configuration/Lab.mjs";

/** The field-record separator: U+2001, never U+00B7. */
const Quad = "\u2001";

/**
 * The distinct forms the artifact table names.
 *
 * Derived from the table rather than written beside it: two types may ride one
 * form (`PERSON` and `LICENCE` are both ledger rows), so a hard count would be
 * the one number on this page that could drift from the rows under it.
 */
const FormCount = new Set(TypeForms.map((Row) => Row.form)).size;

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
export const IndexRecord = (Totals: TotalsFact): Hero => ({
	index: "CONTENTS_01",
	claim: "EVERYTHING ACCOUNTED FOR",
	route: "/SCOPE:THE WHOLE TREE",
	status: { state: "verified", tone: "specimen" },
	seal: "Land",
	metadata: [
		{
			key: "ROUTES:",
			value: String(Totals.Routes),
			note: "addresses the build emits",
		},
		{
			key: "DOCUMENTS:",
			value: String(Totals.Documents),
			note: "reference articles",
		},
		{
			key: "ENTRIES:",
			value: String(Totals.Entries),
			note: "filed blog entries",
		},
		{
			key: "ELEMENTS:",
			value: String(Totals.Elements),
			note: "one record each",
		},
		{
			key: "FORMS:",
			value: String(FormCount),
			note: `${Totals.Blocks} blocks, ${TypeForms.length} types`,
		},
		{
			key: "MODULES:",
			value: String(Totals.Read),
			note: `read, of ${Totals.Modules} outside the bulk trees`,
		},
		{
			key: "LICENSE:",
			value: "CC0",
			links: [{ text: "CC0", href: "/License" }],
		},
	] satisfies readonly LedgerRow[],
	relation: "LAND:",
	proposition: "START WITH THE FORMS",
});

/**
 * The legend: the eight marks, and what each one relates.
 *
 * Two columns, because a legend is read as a table of eight short facts and a
 * single column would put a page of air between `#` and its meaning. The key is
 * the mark itself - the ledger prints it at the key role, which is the mono face,
 * and a mark is a literal before it is a word.
 */
export const Marks: readonly LedgerRow[] = [
	{
		key: "#",

		value: "A series marker: which record this is, and which set it belongs to.",
	},

	{
		key: "〈 〉",

		value: "Containment: the runtime claim, or the stamp a record is filed under.",
	},

	{
		key: "/",

		value: "A route, a command or a category - one slash, never a second.",
	},

	{ key: "→", value: "Direction: what a step leads to." },

	{
		key: "↳",

		value: "Relation: the one-line proposition a record hangs from its nameplate.",
	},

	{
		key: ":",

		value: "A field label - `STATUS:`, `TARGET:`, `LICENSE:` - the colon is the label's.",
	},

	{
		key: "◎",

		value: "The fallback: a value that is not there, printed rather than left blank.",
	},

	{
		key: "U+2001",

		value: "The only separator. An em quad, never a middle dot.",
	},
];

/** The bands, in the order the page reads them. */
export const Bands = {
	/**
	 * The page's own table of contents, as a band. It was written inline in
	 * `pages/Contents.astro` until the interval register needed to read every
	 * band's rung from one place: a sequence that is restated in a second file
	 * drifts from the page it claims to describe, and a register that drifts is a
	 * register of nothing.
	 */
	Chapters: {
		kicker: "/THE CHAPTERS",

		interval: "turn",

		heading: "Eight divisions, in reading order",

		standfirst:
			"Each chapter names the job a reader arrives with. The figure at the end of its line is the number of addresses the build answers in that chapter, counted from the same register the archive below files them from.",
	} satisfies Band,

	Marks: {
		kicker: "/THE GRAMMAR",

		interval: "rest",

		heading: "Eight marks, and no others",

		standfirst:
			"Every page of this document is printed in the same eight marks. They are not decoration: each one carries a relation a sentence would need a clause to say.",

		footnote:
			"The grammar is level one - no card, no page and no later decision overrules it. The marks are written as literals in the source, never as characters an editor could silently fold into a middle dot.",

		tone: "canvas",
	} satisfies Band,

	/**
	 * The four distances the document opens its bands at, and the rule a new band
	 * follows. It is a band like any other because the rhythm is a fact about this
	 * document, and a fact the document states about itself belongs in its index.
	 */
	Intervals: {
		kicker: "/THE INTERVALS",

		interval: "beat",

		heading: "Four distances, and no fifth",

		standfirst:
			'Every band in this document opens at one of four intervals. They are a ladder at about 1.4 times a rung - the smallest step the eye reads as a different distance - two wide, two tight, which is what lets a page say "wide" twice without saying it at the same volume.',

		footnote: `SOURCE: SOURCE/STYLESHEET/SYSTEM/LAYOUT/_INTERVAL.SCSS${Quad}EVERY SEQUENCE BELOW IS READ FROM THE BANDS ITS PAGE DECLARES, NEVER RESTATED`,
	} satisfies Band,

	Forms: {
		kicker: "/THE FORMS",

		interval: "break",

		heading: "One information type, one form",

		standfirst: `${TypeForms.length} kinds of information, ${FormCount} forms. The count in the last column is measured, not claimed: the number of routes whose import tree mounts the block.`,

		footnote:
			"`CLAIM` prints from `RecordHero` on the 404 and on this page; the homepage's claim is the endorsed two-panel hero pair, which is a keeper and outranks the block. One form, two renderings - and the pair is the one the site is recognised by.",

		tone: "paper",
	} satisfies Band,

	Plates: {
		kicker: "/THE PLATES",

		interval: "rest",

		heading: "What the document has a picture of",

		standfirst:
			"Fifteen element records, fifteen manifest states and one verified capture. The mark beside the set is the one this index is issued under, and the set is the evidence the document does not have - stated cell by cell rather than left as a gallery of holes.",

		footnote:
			"SOURCE: PUBLIC/EVIDENCE/*/MANIFEST.YAML\u2001SOURCE/CONTENT/ELEMENT/WORKING.TS\u2001A CELL'S STATE IS ITS MANIFEST'S, NOT THIS PAGE'S",

		tone: "canvas",
	} satisfies Band,

	/**
	 * The four composition languages. Written inline on the page until the
	 * interval register needed every band in one place, for the same reason the
	 * chapter index moved here.
	 */
	Languages: {
		kicker: "/THE LANGUAGES",

		interval: "beat",

		heading: "Four ways to compose a page",

		standfirst:
			"A page is not a stack of bands. It is read, operated, audited or shown, and each of those is a different set of tracks: a reading page is given RAIL MEASURE MARGIN, a workspace page RAIL PANES DRAWER, an audit page LEDGER MATRIX WELLS, and a plate page PLATE CHANNEL HEAD.",

		footnote: `SOURCE: SOURCE/COMPONENT/SHELL/LANGUAGE.TS${Quad}ROUTES COUNTED FROM THE SAME REGISTER`,
	} satisfies Band,

	Routes: {
		kicker: "/THE ROUTES",

		interval: "break",

		heading: "Every address this document answers on",

		standfirst:
			"Filed by chapter, in the order a reader moves through them. The marker column names the forms the route mounts; `◎` means the route prints no block at all.",

		tone: "canvas",
	} satisfies Band,

	Register: {
		kicker: "/THE REGISTER",

		interval: "rest",

		heading: "What carries the facts, and what reads it",

		standfirst:
			"The document's extent, in eight figures - each one printed with the file it was counted in, because a number without a source is an assertion, not a fact.",

		tone: "canvas",
	} satisfies Band,

	Declared: {
		kicker: "/THE DECLARED",

		interval: "beat",

		heading: "Files that exist for a reason, and no page reads them",

		standfirst:
			"Nothing in this tree is unexplained. These are the modules with no reader - each one states what it carries, and what it is waiting for. Two libraries are measured as bulk and not listed: the vendored `Component/UI` kit and the `Component/Dynamic/Interface` schemas, because a catalogue is judged by what it offers rather than by what the site mounted.",

		tone: "paper",
	} satisfies Band,

	Record: {
		kicker: "/THE RECORD",

		interval: "turn",

		heading: "How this page was made",

		standfirst:
			"The index is generated from the tree, so its numbers cannot drift from the files they describe. Re-running the register is the only way to change a figure on this page.",

		tone: "canvas",
	} satisfies Band,
} as const;

/** The forms matrix: type, form, rank, and the measured route count. */
export const FormColumns: readonly MatrixColumn[] = [
	{ label: "TYPE" },

	{ label: "FORM", ink: "Accent" },

	{ label: "RANK", ink: "MuteForeground" },

	{ label: "ROUTES", ink: "MuteForeground", align: "center" },
];

/** The declared matrix: the module, what it carries, and why it exists. */
export const DeclaredColumns: readonly MatrixColumn[] = [
	{ label: "MODULE" },

	{ label: "CARRIES" },

	{ label: "WHY IT EXISTS", ink: "MuteForeground" },
];

/** The register's columns, when the fact modules are read as a matrix. */
export const RegisterColumns: readonly MatrixColumn[] = [
	{ label: "MODULE" },

	{ label: "CARRIES" },

	{ label: "READERS", ink: "MuteForeground", align: "center" },
];

/**
 * The closing ledger: how the index itself is made.
 *
 * It closes on the colophon rather than reproducing one. The footer already
 * prints the document's making - paper, type, build, extent - and a second
 * colophon on this page would be two answers to one question.
 */
export const RecordRows = (
	Totals: TotalsFact,

	AsOf: string,

	JellyPin: string,
): readonly LedgerRow[] => [
	{
		key: "ENTRIES:",

		value: `${Totals.Routes} ROUTES`,

		note: "every address the build emits, dynamic ones included",
	},

	{
		key: "GROUPED BY:",

		value: "CHAPTER",

		note: "eight divisions, in reading order",
	},

	{
		key: "MARKER:",

		value: "THE FORMS THE ROUTE MOUNTS",

		note: "`◎` where it mounts none",
	},

	{
		key: "FORMS:",

		value: `${TypeForms.length} TYPES, ${FormCount} FORMS`,

		note: `${Totals.Blocks} blocks, two types ride a ledger row`,
	},

	{
		key: "GENERATED:",

		value: "Source/Script/Register.ts",

		code: true,

		note: "run by hand; its output is checked in",
	},

	{
		key: "JELLY:",

		value: JellyPin,

		code: true,

		note: "the surface family's pin",
	},

	{ key: "AS OF:", value: AsOf, note: "the date of this reading" },

	{
		key: "COLOPHON:",

		value: "THE FOOTER",

		note: `the document's making${Quad}paper, type, build, extent`,
	},
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
 * The old sentence called every route canonical and read its figure from
 * `Map.ts`, which had stopped holding the list - so on a build where the two
 * agreed it printed `0 declared` and forty-one names. Both figures now come from
 * `Registry` in the generator, and the sentence says what each one counts.
 */
export const RegistryFootnote = (
	Declared: number,

	Canonical: number,

	Built: number,

	Missing: readonly string[],

	Lab: number,
): string => {
	if (Missing.length > 0)
		return `\`Function/Route/Registry.ts\` declares ${Declared} routes, ${Canonical} of them canonical; the build emits ${Built}. The ${Missing.length} it does not declare are ${Missing.join(", ")} - the redirect layer derives its variants from that set, so this page reports the drift rather than repairing it.`;

	const Head = `\`Function/Route/Registry.ts\` declares ${Declared} routes, ${Canonical} of them canonical - the hand-listed paths that take the full variant set.`;

	if (Lab === 0)
		return `${Head} The build emits ${Built}. The two agree, which is the only state this footnote has nothing to report.`;

	return `${Head} The build emits ${Built}: ${Lab === 1 ? "one of them is a lab surface" : `${Lab} of them are lab surfaces`}, served by \`dum Run\` and absent from the production output. Nothing the build emits is undeclared.`;
};

/**
 * The index's own doors, before the build decides which of them it serves.
 *
 * The index used to end on its own extent: the last figure, and then the footer.
 * A page that has just told a reader what the whole document is made of owes them
 * the registers that file its parts - and, in development, the specimen sheet,
 * which is this page's appendix and the only place the parts are printed rather
 * than counted. The sheet's row is first because it is the closest reading of
 * what the reader has just finished: the index counts the information types and
 * their forms, and the sheet shows them.
 */
const OnwardRows: readonly OnwardRow[] = [
	{
		mark: "/",

		want: "THE PARTS THEMSELVES, PRINTED",

		where: "SPECIMEN",

		href: "/Specimen",

		note: "Eleven components at 1:1 with their contracts, three stated absences, and the nine adverse states.",
	},

	{
		mark: "/",

		want: "WHAT IS LIVE TODAY",

		where: "STATUS",

		href: "/Status",

		note: "Twenty-one records under the four columns of the state vocabulary.",
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

		want: "THE DOCUMENT ITSELF",

		where: "DOC",

		href: "/Doc",

		note: "Sixty articles: the reference, the deep dives, and the workflows.",
	},
];

/**
 * The doors this build serves.
 *
 * The sheet is a lab door: `/Specimen` is served by `dum Run` and absent from the
 * production build (`Function/Configuration/Lab.mjs`), so a production reader is
 * never offered a page the host does not hold. The register's head is counted
 * from this array rather than written into the copy, so `# ONWARD / 0N` cannot
 * claim a door the list does not print.
 */
const ServedOnward = OnwardRows.filter((Row) => Served(Row.href));

export const ContentsOnward: {
	readonly rows: readonly OnwardRow[];

	readonly copy: OnwardCopy;
} = {
	rows: ServedOnward,

	copy: {
		index: `ONWARD / ${String(ServedOnward.length).padStart(2, "0")}`,

		label: "/THE INDEX'S OWN DOORS",

		statement:
			"An index that ended on its own extent would be a page about itself. These are where the parts it counted are printed, stated, defined and written.",

		note: Lab
			? `SOURCE: SOURCE/CONTENT/INDEX/PAGE.TS${Quad}THE SHEET IS THIS PAGE'S APPENDIX`
			: "SOURCE: SOURCE/CONTENT/INDEX/PAGE.TS",

		empty: "Nothing to hand over. Every destination this register would list is the index you are reading, which cannot happen while the document has other registers.",
	},
};
