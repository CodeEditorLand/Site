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
		"Eleven parts, printed at 1:1 where they can stand on a plate and stated where they cannot. Each one carries its contract, its stylesheet and the surface that asks for it.",
} as const;

/** The three bands' openings, in the order they are read. */
export const Bands = {
	Sheet: {
		kicker: "/THE SHEET",
		heading: "Every part, on one sheet",
		standfirst:
			"Twelve cells, one per part: its mark, its name, the layer it belongs to, and what the sheet did with it. A printed part links to its plate; an absent one prints its reason where the plate would be.",
		footnote:
			"A sheet is the one page where equal cells are right: the parts are genuinely equal, and the reader is choosing between them rather than reading them.",
	},
	Plates: {
		kicker: "/THE PLATES",
		heading: "The parts, printed",
		standfirst:
			"Seven plates. Each holds one part at its own size on a stage, and each stage is a white insert lying on the field - the same box a record uses, so a part is printed on the surface it will be printed on.",
		footnote:
			"A plate's stage is 1:1. Nothing on this sheet is scaled to fit: a part that could not be shown at its own size is stated in THE ABSENCES instead.",
	},
	Absences: {
		kicker: "/THE ABSENCES",
		heading: "The parts that are not printed",
		standfirst:
			"Three parts cannot stand on a plate, and each says why in the same three rows every absence on this site uses: what would be here, why it is not, and where to read the thing itself.",
		footnote:
			"An absence is a designed state, not a gap. The sheet is complete when every part is accounted for, not when every part is drawn.",
	},
	States: {
		kicker: "/THE STATES",
		heading: "What a part has to survive",
		standfirst:
			"Nine conditions, composed in the record grammar, each naming the surface where it actually happens. A part without its adverse states is half a part, and a page without them is half a page.",
		footnote:
			"The vocabulary is fixed at eight words, and the legend above prints all eight. A ninth word would be a state the ink register has no tone for.",
	},
	Material: {
		kicker: "/THE MATERIAL",
		heading: "What the sheet is printed with",
		standfirst:
			"Six specimens: the paper, the insert, two inks, the one accent and the one hairline. Every page of this document is made of these and of nothing else.",
		footnote:
			"Printed from `_Token.scss`. A seventh colour would be a second identity, and the sheet is where that would show.",
	},
	Register: {
		kicker: "/THE REGISTER",
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
