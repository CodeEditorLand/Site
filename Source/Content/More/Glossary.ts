/**
 * Glossary - the document's own words, in three runs.
 *
 * ─── WHY A LEXICON AND NOT A PAGE OF DEFINITIONS ──────────────────────────
 * This project names its parts after weather and landscape: Air, Mist, Vine,
 * Wind, Grove, Mountain. It also uses ordinary English words - record, form,
 * band, ledger, matrix - in senses that are not ordinary, because the site's
 * grammar gives each one a job. A reader arriving from the manual meets fifteen
 * capitalised nouns and twenty lower-case ones that look like English and are
 * not, and until this page there was nowhere to look either up.
 *
 * ─── THE THREE RUNS ARE THREE KINDS OF WORD ───────────────────────────────
 *   /THE ELEMENTS          the fifteen named parts, defined from the records
 *   /THE DOCUMENT'S WORDS  the grammar's own nouns, defined from its rules
 *   /THE RETIRED WORDS     words this site used and does not any more
 *
 * The third run is the one a glossary usually omits and the one a reader needs
 * most: a manual that quietly stops using a word leaves every document that
 * still quotes it unreadable. Each retired word states what it was, why it is
 * not one of the site's words, and what replaced it - so a reader who finds
 * `Coming Soon` in an old blog post can find out what it became.
 *
 * ─── EVERY DEFINITION HAS A SOURCE ────────────────────────────────────────
 * An element's definition is its own record's description, read out of
 * `Library/I18n/Locale/En/Home.json` - the same string the architecture wall
 * prints, not a paraphrase. A grammar word's definition is the rule as the
 * stylesheet or the block writes it, and its `WHERE:` row names the route where
 * a reader can see the thing itself. Nothing here is invented; where the tree
 * does not define a word, the entry prints `UNAVAILABLE` rather than a guess.
 *
 * The separator is U+2001, the site's only one.
 */
import EnglishHome from "../../Library/I18n/Locale/En/Home.json";

import { Air } from "../Record/Air.js";

import { Cocoon } from "../Record/Cocoon.js";

import { Common } from "../Record/Common.js";

import { Echo } from "../Record/Echo.js";

import { Grove } from "../Record/Grove.js";

import { Maintain } from "../Record/Maintain.js";

import { Mist } from "../Record/Mist.js";

import { Mountain } from "../Record/Mountain.js";

import { Output } from "../Record/Output.js";

import { Rest } from "../Record/Rest.js";

import { SideCar } from "../Record/SideCar.js";

import { Sky } from "../Record/Sky.js";

import { Vine } from "../Record/Vine.js";

import { Wind } from "../Record/Wind.js";

import { Worker } from "../Record/Worker.js";

import type { FieldRecord } from "../Record/FieldRecord.js";

import type { Band, LedgerRow } from "../../Component/Record/Type.js";

/** The field-record separator: U+2001, never U+00B7. */
const Quad = "\u2001";

/** One word of the lexicon. */
export interface Term {
	/** The word, as the document writes it: `AIR`, `RECORD`, `STABILIZING`. */
	readonly term: string;

	/**
	 * What the word is short for, when it is short for something: an element's
	 * role chips, or the old form of a retired word.
	 */
	readonly expansion?: string;

	/** The definition. One to three sentences; never a paragraph. */
	readonly definition: string;

	/** The record the word names, when it names one: `# AIR_01`. */
	readonly record?: string;

	/** Where the thing itself can be seen: a route, and its label. */
	readonly route?: { readonly label: string; readonly href: string };

	/** Where the definition comes from. Absent, the entry prints UNAVAILABLE. */
	readonly source?: string;

	/** The vocabulary word the term states, when it states one. */
	readonly state?: string;

	/** Extra facts the entry prints as a small ledger: `WAS:`, `WHY NOT:`, `NOW:`. */
	readonly rows?: readonly LedgerRow[];
}

/** One run of the lexicon: a kind of word, and its terms in alphabetical order. */
export interface LexiconRun {
	/** The run's key, for its id and its jump link. */
	readonly key: string;

	/** The run's `/LABEL`, printed as the run's head. */
	readonly label: string;

	/** One sentence: what kind of word this run holds. */
	readonly note: string;

	/** What the run says when it holds nothing. Required, never absent. */
	readonly empty: string;

	/** The terms, in the order they print. */
	readonly terms: readonly Term[];
}

/** The fifteen element records, in the architecture band's order. */
const Elements: readonly FieldRecord[] = [
	Air,

	Cocoon,

	Common,

	Echo,

	Grove,

	Maintain,

	Mist,

	Mountain,

	Output,

	Rest,

	SideCar,

	Sky,

	Vine,

	Wind,

	Worker,
];

/** The architecture copy, as the homepage's own module reads it. */
const ElementCopy = EnglishHome.architecture as unknown as Readonly<
	Record<string, { readonly subtitle: string; readonly description: string }>
>;

/**
 * A description as a definition.
 *
 * The wall's description is three lines separated by newlines, with U+2001
 * between a sentence and the clause that qualifies it. A definition is the same
 * copy set as one paragraph: the newlines become sentence breaks and the em quad
 * becomes the space it stands for. Nothing is dropped - the entry prints the
 * whole description, because a glossary that shortened the record's own words
 * would be a second, worse copy of the record.
 */
const Definition = (Text: string): string =>
	Text.split("\n")
		.map((Line) => Line.trim())
		.filter((Line) => Line.length > 0)
		.join(" ")
		.replace(/\u2001/g, " ");

/** The role chips, joined the way the index joins a language's tracks. */
const Expansion = (Subtitle: string): string =>
	Subtitle.split("\u2001")
		.map((Chip) => Chip.trim())
		.filter((Chip) => Chip.length > 0)
		.join(" / ");

/** The element run: fifteen words, each defined by its own record. */
const ElementTerms: readonly Term[] = Elements.map((Record) => {
	const Copy = ElementCopy[Record.Id] ?? { subtitle: "", description: "" };

	return {
		term: Record.Title,
		expansion: Expansion(Copy.subtitle),
		definition: Definition(Copy.description),
		record: Record.Index,
		route: {
			label: `/DOC/${Record.Id.toUpperCase()}`,
			href: `/Doc/${Record.Id}`,
		},
		source: `SOURCE/CONTENT/RECORD/${Record.Id.toUpperCase()}.TS`,
		state: Record.Status.Value,
	};
});

/**
 * The document's own words.
 *
 * Each definition is the rule as the layer writes it, and the `WHERE:` row is a
 * page where the word's thing is on the page rather than described - a glossary
 * that only defined its terms would be a dictionary of a language nobody speaks.
 *
 * These are the nouns a reader meets in the first two pages and cannot look up:
 * the site says "record", "form", "band" and "artifact" as if they were obvious,
 * and to a reader who has just arrived they are not.
 */
const GrammarTerms: readonly Term[] = [
	{
		term: "ARTIFACT",

		expansion: "THE UNIT A PAGE IS MADE OF",

		definition:
			"One physical form for one kind of information: a record, a matrix, a plate, a well. A page is a sequence of artifacts, not a stack of bands - and two artifacts on one page are two objects, never one object drawn twice.",

		route: { label: "/CONTENTS", href: "/Contents" },

		source: "SOURCE/COMPONENT/SHELL/LANGUAGE.TS",
	},

	{
		term: "BAND",

		expansion: "ONE SUBJECT, SEPARATED BY SPACE",

		definition:
			"A band opens a subject with a kicker, an `h2` and one sentence, and separates it from its neighbour with air rather than a border. A band that needs a rule to be a band is a box.",

		route: { label: "/STATUS", href: "/Status" },

		source: "SOURCE/COMPONENT/RECORD/RECORDBAND.ASTRO",
	},

	{
		term: "BLOCK",

		expansion: "THE SMALLEST THING THAT ANSWERS ONE KIND OF INFORMATION",

		definition:
			"A block is chosen by the information type first and the register second, and when two blocks could answer, the narrower one wins: a fact that fits a ledger row never gets a matrix, and a set that fits an archive never becomes a band of entries.",

		route: { label: "/CONTENTS", href: "/Contents" },

		source: "SOURCE/STYLESHEET/SYSTEM/RECORD/_INDEX.SCSS",
	},

	{
		term: "FIGURE",

		expansion: "A NUMBER, WITH ITS SOURCE",

		definition:
			"A figure is a claim, so it is printed with the file it was counted in. A figure this site could not measure prints `UNAVAILABLE`; a known absence prints `0`. The difference is the whole discipline: zero is a measurement, and unavailable is the truth about not having one.",

		route: { label: "/STATUS", href: "/Status" },

		source: "SOURCE/COMPONENT/RECORD/TYPE.TS",
	},

	{
		term: "FORM",

		expansion: "ONE INFORMATION TYPE'S SHAPE",

		definition:
			"Thirteen information types resolve to eleven forms, because two of them ride another form: a person is a credit row and a licence is a ledger row, never a card. The index counts the mapping rather than claiming it.",

		route: { label: "/CONTENTS", href: "/Contents" },

		source: "SOURCE/CONTENT/INDEX/FORMS.TS",
	},

	{
		term: "GRAMMAR",

		expansion: "THE EIGHT MARKS",

		definition:
			"`#` series, `〈 〉` containment, `/` route, `→` progression, `↳` proposition, `:` field label, `◎` fallback, and U+2001 as the only separator. The grammar is level one: no card, no page and no later decision overrules it, and a middle dot is a defect rather than a variant.",

		route: { label: "/CONTENTS", href: "/Contents" },

		source: "SOURCE/CONTENT/INDEX/PAGE.TS",
	},

	{
		term: "KEEPER",

		expansion: "A TREATMENT THE OWNER ENDORSED",

		definition:
			"A later card may add to a keeper, compose with it or extend it. It may not delete it, replace it, or reduce it to something invisible - and a card that touched one says what it did in its own report.",

		route: { label: "/", href: "/" },

		source: ".HERMES/TMP/STITCH/KEEPERS.MD",
	},

	{
		term: "LANGUAGE",

		expansion: "READING / WORKSPACE / AUDIT / PLATE",

		definition:
			"A composition contract, not a skin: reading gives a rail, a measure and a margin; workspace gives a rail, panes and a drawer; audit gives a ledger, a matrix and wells; plate gives a plate, a channel and a head. A page declares one by being filed in one register, and the frame prints the declaration.",

		route: { label: "/CONTENTS", href: "/Contents" },

		source: "SOURCE/COMPONENT/SHELL/LANGUAGE.TS",
	},

	{
		term: "LEDGER",

		expansion: "A SET OF FACTS ABOUT ONE OBJECT",

		definition:
			"Rows with `:`-labelled keys, one value each, and at most one emphasised figure. A set of facts is a ledger, never a grid of equal cards - and a ledger with two emphasised rows has none.",

		route: { label: "/STATUS", href: "/Status" },

		source: "SOURCE/COMPONENT/RECORD/RECORDLEDGER.ASTRO",
	},

	{
		term: "MATRIX",

		expansion: "ONE STATE, ACROSS N COLUMNS",

		definition:
			"A comparison read across columns: a header row carrying one ink per column, hairline rows, and a row label that pins on a narrow screen so a five-column comparison is read one row at a time with the row's name still attached.",

		route: { label: "/COMPARE", href: "/Compare" },

		source: "SOURCE/COMPONENT/RECORD/RECORDMATRIX.ASTRO",
	},

	{
		term: "MEASURE",

		expansion: "THE WIDTH A PAGE READS AT",

		definition:
			"Seventy-two characters for a document, `none` for a workspace (a pane is as wide as the instrument in it), `matrix` for an audit, and `plate + channel` for a plate. One measure per language, so one 72ch means one width everywhere.",

		route: { label: "/LICENSE", href: "/License" },

		source: "SOURCE/COMPONENT/SHELL/LANGUAGE.TS",
	},

	{
		term: "PROVENANCE",

		expansion: "WHERE A CLAIM CAN BE CHECKED",

		definition:
			"Every figure, every well and every plate carries the file, route or command it came from. A block whose provenance is missing prints `SOURCE: UNAVAILABLE` rather than omitting the row, because a missing source is itself a fact about the claim.",

		route: { label: "/STATUS", href: "/Status" },

		source: "SOURCE/COMPONENT/RECORD/TYPE.TS",
	},

	{
		term: "RECORD",

		expansion: "THE SITE'S UNIT OF CLAIM",

		definition:
			"One marker, one route, one seal, one status word and a ledger of facts. A record states what a thing is and what is true of it; it is not a card, and a record inside a record is a card inside a card.",

		route: { label: "/", href: "/" },

		source: "SOURCE/COMPONENT/RECORD/RECORDHERO.ASTRO",
	},

	{
		term: "REGISTER",

		expansion: "A LEDGER THAT NAMES ITSELF",

		definition:
			"The same facts as a ledger, with a register line above them: `# SUMMARY / 04`. A register is what a summary becomes when it sits in a page's margin and has to say what it is without a heading.",

		route: { label: "/CONTENTS", href: "/Contents" },

		source: "SOURCE/COMPONENT/RECORD/TYPE.TS",
	},

	{
		term: "SEAL",

		expansion: "THE ELEMENT A RECORD STANDS FOR",

		definition:
			"One per artifact, named by the element it stands for. It is a mark, not a logo: it authenticates the record the way a stamp authenticates a page, and an artifact with two seals has none.",

		route: { label: "/", href: "/" },

		source: "SOURCE/COMPONENT/BRAND/FIELDRECORDSEAL",
	},

	{
		term: "SPECIMEN",

		expansion: "THE ONE GREEN",

		definition:
			"`#1E742A`, used rarely, and only where it authenticates: a seal, a live state, a focus ring, the active route. A page with five green things has none, which is why the tone column of the state vocabulary has exactly two specimen words.",

		route: { label: "/STATUS", href: "/Status" },

		source: "SOURCE/STYLESHEET/SYSTEM/_TOKEN.SCSS",
	},

	{
		term: "STAGE",

		expansion: "AN ORDER A READER MUST HOLD",

		definition:
			"Numbered steps, each one line. A step that needs a paragraph is not a step, and a process written as prose is a process the reader has to reconstruct.",

		route: { label: "/STATUS", href: "/Status" },

		source: "SOURCE/COMPONENT/RECORD/RECORDSTAGE.ASTRO",
	},

	{
		term: "STAMP",

		expansion: "WHAT MAKES A RECORD WHAT IT CLAIMS",

		definition:
			"A mark, the route it is issued under, the facts that bound it, and the one line saying what makes it true. A stamp without its authority line is decoration, which is why the block requires the field.",

		route: { label: "/CONTENTS", href: "/Contents" },

		source: "SOURCE/COMPONENT/RECORD/RECORDSTAMP.ASTRO",
	},

	{
		term: "TONE",

		expansion: "INK / SPECIMEN / QUIET",

		definition:
			"The ink a state word carries, looked up from the word rather than chosen by the page. A page that picks a tone has started a second vocabulary, and the second one always falls behind.",

		route: { label: "/STATUS", href: "/Status" },

		source: "SOURCE/COMPONENT/SURFACE/STATE.TS",
	},

	{
		term: "TRACE",

		expansion: "THE PATH A CLAIM CAN BE CHECKED ALONG",

		definition:
			"Files, routes or commands a reader opens, in order, to see the claim for themselves. Not a build log and not a link list: a trace has a source line, and a list of links does not.",

		route: { label: "/STATUS", href: "/Status" },

		source: "SOURCE/COMPONENT/RECORD/RECORDTRACE.ASTRO",
	},

	{
		term: "WELL",

		expansion: "A COMMAND YOU ACT ON",

		definition:
			"A command, a config block or a transcript in a recessed mono body under a title bar, with the copy control and its provenance. A command printed as a paragraph is a command the reader retypes.",

		route: { label: "/DOWNLOAD", href: "/Download" },

		source: "SOURCE/COMPONENT/RECORD/RECORDWELL.ASTRO",
	},
];

/**
 * The words this site used and does not any more.
 *
 * Each one is documented in the tree as a correction: a word that was printed as
 * a status and was not one of the eight, or a phrase that stood where a
 * measurement belongs. The run exists because a reader who finds one of these
 * words in a blog post or a screenshot has no way to tell whether the site
 * changed or they misread it.
 *
 * The state is `ARCHIVED` for every entry: the word is retired, and retirement is
 * the one thing the vocabulary has a word for.
 */
const RetiredTerms: readonly Term[] = [
	{
		term: "STABILIZING",

		expansion: "WAS: AN ELEMENT STATUS",

		definition:
			"It was printed on the Grove record, where the other fourteen elements printed `ACTIVE`. It is not one of the eight words, so the state table could not read it and any block that asked for its tone fell back to ink - a state that renders as a fact.",

		state: "ARCHIVED",

		rows: [
			{ key: "WAS:", value: "GROVE / STATUS: STABILIZING", code: true },

			{
				key: "WHY NOT:",

				value: "Not one of the eight. A ninth word has no tone.",
			},

			{
				key: "NOW:",

				value: "ACTIVE",

				note: "the record's own word today",
			},
		],

		source: "SOURCE/CONTENT/RECORD/GROVE.TS",
	},

	{
		term: "vPRE-RELEASE",

		expansion: "WAS: A VERSION STRING",

		definition:
			"It stood in the platform card's `VERSION:` row. The record grammar uppercases a value, so it printed `VPRE-RELEASE` - a version that names no release, in a row whose job is to name one. The Download page's own register said `VERSION: UNAVAILABLE` for the same release, so the two surfaces contradicted each other about the same fact.",

		state: "ARCHIVED",

		rows: [
			{ key: "WAS:", value: "VERSION: vPre-release", code: true },

			{
				key: "WHY NOT:",

				value: "A version string for a version that does not exist.",
			},

			{
				key: "NOW:",

				value: "UNAVAILABLE",

				note: "nothing has been published to version",
			},
		],

		source: "SOURCE/CONTENT/HOME/PLATFORM.TS",
	},

	{
		term: "COMING SOON",

		expansion: "WAS: A SIZE",

		definition:
			"It stood in the `SIZE:` row, where a measurement belongs. A promise in a measurement's place is worse than an absence: it reads as a figure to a reader who is scanning and as a commitment to a reader who is deciding.",

		state: "ARCHIVED",

		rows: [
			{ key: "WAS:", value: "SIZE: Coming Soon", code: true },

			{
				key: "WHY NOT:",

				value: "A marketing phrase in a measured field.",
			},

			{
				key: "NOW:",

				value: "UNAVAILABLE",

				note: "no artifact, so nothing to measure",
			},
		],

		source: "SOURCE/CONTENT/HOME/PLATFORM.TS",
	},

	{
		term: "RELEASE PREPARATION",

		expansion: "WAS: A STATUS",

		definition:
			"Two words, no state among them, in the `STATUS:` row of every platform card. Because it was not a state, the state table could not read it, and the card's status printed in ink like an ordinary fact. `PREPARING` is the word that was always meant.",

		state: "ARCHIVED",

		rows: [
			{ key: "WAS:", value: "STATUS: Release Preparation", code: true },

			{
				key: "WHY NOT:",

				value: "Two words, and neither of them is a state.",
			},

			{
				key: "NOW:",

				value: "PREPARING",

				note: "quiet tone, the word for announced and not started",
			},
		],

		source: "SOURCE/CONTENT/HOME/PLATFORM.TS",
	},

	{
		term: "PLANNED",

		expansion: "WAS: A STATUS",

		definition:
			"It is not retired from the site, and it is retired from the status row. The portal's tiers print `STATUS: PREPARING` and then `PLAN: PLANNED` beside it: the state is the vocabulary's, and the plan is a declaration about the state. Keeping the word as a declaration is how a fact survives a vocabulary that has no room for it.",

		state: "ARCHIVED",

		rows: [
			{ key: "WAS:", value: "STATUS: PLANNED", code: true },

			{
				key: "WHY NOT:",

				value: "A plan is not a state. Nothing is planned *in*; it is planned *for*.",
			},

			{
				key: "NOW:",

				value: "PLAN: PLANNED",

				note: "a declaration beside STATUS: PREPARING",

				code: true,
			},
		],

		source: "SOURCE/CONTENT/SURFACE/PORTAL.TS",
	},
];

/** The three runs, in reading order: the names, the grammar, then the graves. */
export const Lexicon: readonly LexiconRun[] = [
	{
		key: "elements",

		label: "/THE ELEMENTS",

		note: "Fifteen named parts. Each definition is the record's own description, and each entry links to the record and to its manual.",

		empty: "No element record is filed. The architecture wall on the homepage would be empty too, which is a different site than this one.",

		terms: ElementTerms,
	},

	{
		key: "words",

		label: "/THE DOCUMENT'S WORDS",

		note: "The grammar's own nouns, defined as the layer defines them. Each `WHERE:` row is a page where the thing itself is printed, not described.",

		empty: "The document uses no word it does not define. That is the state this run exists to reach, and it has never been true.",

		terms: GrammarTerms,
	},

	{
		key: "retired",

		label: "/THE RETIRED WORDS",

		note: "Words this site used and does not any more. Each one states what it was, why it is not a word here, and what replaced it - so a quotation of an old page stays readable.",

		empty: "No word has been retired. Every word this site has ever printed is still in use, which would make this run a claim rather than a record.",

		terms: RetiredTerms,
	},
];

/** Every term, across every run - the figure the head prints. */
export const TermCount = Lexicon.reduce(
	(Total, Run) => Total + Run.terms.length,

	0,
);

/**
 * A term's anchor: the run, then the word, lower-cased and dashed.
 *
 * One function owns the string, so the entry's `id`, the rail's link and the
 * palette's row cannot disagree about where a word lives. A page or a control
 * that spelled the slug itself would be the second place the address exists -
 * and the first thing to drift when a word gains a hyphen.
 */
export const TermId = (Run: string, Term: string): string =>
	`term-${Run}-${Term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

/** The letters a run's terms begin with, in alphabetical order. */
export const LettersOf = (Run: LexiconRun): readonly string[] =>
	[
		...new Set(
			Run.terms.map((Entry) => Entry.term.charAt(0).toUpperCase()),
		),
	].sort();

/** Every letter used anywhere, for the head's count. */
export const LetterCount = new Set(
	Lexicon.flatMap((Run) =>
		Run.terms.map((Entry) => Entry.term.charAt(0).toUpperCase()),
	),
).size;

/**
 * The rail: the three runs, then the five retired words.
 *
 * A letter index is the navigation a glossary usually has, and this page keeps
 * one - but per run, inside the run, where the letters belong to the words they
 * file. The rail carries the two registers a reader actually navigates by: which
 * kind of word they are looking for, and the five words the document no longer
 * uses. A rail of forty letters across three runs would be a second, worse copy
 * of the run heads.
 *
 * The retired rows are statements rather than destinations - a retired word has
 * an entry, and the entry is where the row goes - so their mark is `◎`, the
 * grammar's mark for a thing that is gone.
 */
export interface RailRow {
	readonly mark?: string;

	readonly label: string;

	readonly meta?: string;

	readonly href?: string;

	readonly note?: string;
}

/** The rail's rows: three runs, then the five retired words. */
export const RailRows: readonly RailRow[] = [
	{
		mark: "/",

		label: "ELEMENTS",

		meta: String(ElementTerms.length),

		href: "#run-elements",
	},

	{
		mark: "/",

		label: "DOCUMENT'S WORDS",

		meta: String(GrammarTerms.length),

		href: "#run-words",
	},

	{
		mark: "/",

		label: "RETIRED WORDS",

		meta: String(RetiredTerms.length),

		href: "#run-retired",
	},
	...RetiredTerms.map((Entry) => ({
		mark: "◎",
		label: Entry.term,
		href: `#term-retired-${Entry.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
	})),
];

/**
 * The head's facts.
 *
 * A glossary has no state and no seal: it has an extent. The three rows are the
 * extent, and the fourth is the one fact a reader needs before trusting it -
 * where the definitions come from.
 */
export const Facts: readonly LedgerRow[] = [
	{
		key: "TERMS:",

		value: String(TermCount),

		note: `in ${Lexicon.length} runs`,
	},

	{
		key: "LETTERS:",

		value: String(LetterCount),

		note: "in use across the three runs",
	},

	{
		key: "RETIRED:",

		value: String(RetiredTerms.length),

		note: "words this site no longer prints",
	},

	{
		key: "SOURCE:",

		value: "THE RECORDS AND THE LAYER",

		note: "every definition cites its file",
	},
];

/** The page's bands: the two runs that are not the element list. */
export const Bands = {
	Words: {
		kicker: "/THE DOCUMENT'S WORDS",

		heading: "The nouns this document uses as if they were obvious",

		standfirst:
			"Record, form, band, artifact, register. They are ordinary English words doing a specific job here, and a reader who has just arrived has no way to tell which sense is meant.",

		footnote: `EACH DEFINITION IS THE RULE AS THE LAYER WRITES IT${Quad}A TERM WITH NO RULE PRINTS UNAVAILABLE, NEVER A PARAPHRASE`,

		tone: "canvas",
	} satisfies Band,

	Retired: {
		kicker: "/THE RETIRED WORDS",

		heading: "Five words this site used, and what replaced them",

		standfirst:
			"A manual that quietly stops using a word leaves every document that still quotes it unreadable. These are the corrections, stated as corrections rather than hidden.",

		footnote: `SOURCE: THE COMMENTS IN THE MODULES THAT PRINTED THEM${Quad}RETIRED IS NOT A STATE: EACH WORD'S ENTRY STATES ARCHIVED`,

		tone: "paper",
	} satisfies Band,

	Limits: {
		kicker: "/THE LIMITS",

		heading: "What this lexicon does not cover",

		standfirst:
			"A reference work that only listed what it had would be a list, not a reference. These are the two gaps this page knows about: one word that has left the build, and two words the document uses that the runs do not define.",

		tone: "canvas",
	} satisfies Band,
} as const;
