/**
 * Page - the copy the three "more" surfaces share: the onward register, and the
 * one sentence each register opens on.
 *
 * ─── WHY THE ONWARD REGISTER IS ONE OBJECT ────────────────────────────────
 * Every one of these pages ends by pointing somewhere, and the 404 begins by
 * doing it. That is one information type - *you are here, and here is where you
 * probably meant to be* - so it is one register and one block, not four link
 * lists: the 404's sentences, the manual's pager, the footer's routes row and a
 * page that had just told a reader their address was wrong.
 *
 * A routing register is not an archive. An archive files records by their own
 * names; a register of destinations files them by the *intent* the reader
 * arrived with - "I wanted the address list", "I wanted to know if it is real",
 * "I wanted the word for that thing". So the row's key is the intent, and the
 * value is the destination. That is the difference, and it is why this is its
 * own block rather than a fourth use of `RecordArchive`.
 *
 * ─── EVERY ROW IS TRUE ────────────────────────────────────────────────────
 * No row points at a page that does not answer the intent beside it: each one is
 * a page a reader who has just been told "no record at this address" actually
 * needs. A routing register that listed everything would be a sitemap, and the
 * site already has one.
 *
 * The separator is U+2001, the site's only one.
 */

/** The field-record separator: U+2001, never U+00B7. */
const Quad = "\u2001";

/** One row of the onward register: the intent, and where it is answered. */
export interface OnwardRow {
	/** The mark column: `/` for a destination, `→` for an action. */
	readonly mark: string;

	/** The intent, as the reader would say it: `EVERY ADDRESS THIS SITE ANSWERS ON`. */
	readonly want: string;

	/** The destination's own name. */
	readonly where: string;

	/** Where it is. */
	readonly href: string;

	/** What the destination is, in one line. */
	readonly note?: string;
}

/** The register's copy, per page. */
export interface OnwardCopy {
	/** The register head, `ONWARD / 06`: the word, and the row count the page supplies. */
	readonly index: string;

	/** The `/LABEL` after the index: `/THE REST OF THE DOCUMENT`. */
	readonly label: string;

	/** One sentence above the rows: why this register is here. */
	readonly statement: string;

	/** The provenance line under the rows. */
	readonly note?: string;

	/** What the register says when it has no rows. Required. */
	readonly empty: string;
}

/**
 * The 404's register.
 *
 * Six intents, ordered by how likely a reader who typed a wrong address is to
 * have meant them. The first is the index, because the site's own error copy says
 * `/Contents` lists every route the build emits - and a page that says so must
 * link it.
 */
export const NotFoundOnward: readonly OnwardRow[] = [
	{
		mark: "/",

		want: "EVERY ADDRESS THIS SITE ANSWERS ON",

		where: "CONTENTS",

		href: "/Contents",

		note: "The index: every route, filed by chapter, with the forms each one mounts.",
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

		want: "THE WORD FOR THAT THING",

		where: "GLOSSARY",

		href: "/Glossary",

		note: "The fifteen elements, the grammar's own nouns, and five retired words.",
	},

	{
		mark: "/",

		want: "WHAT IT IS COMPARED TO",

		where: "COMPARE",

		href: "/Compare",

		note: "Eight aspects of the substitution, and the five figures nobody has measured.",
	},

	{
		mark: "/",

		want: "WHAT CAN BE DOWNLOADED",

		where: "DOWNLOAD",

		href: "/Download",

		note: "The edition, the three targets, and what a build from source takes.",
	},

	{
		mark: "/",

		want: "TO REPORT A LINK THAT SHOULD WORK",

		where: "CONTACT",

		href: "/Contact",

		note: "The front desk takes the path you came from.",
	},
];

/** The 404's register copy. */
export const NotFoundOnwardCopy: OnwardCopy = {
	index: "ONWARD / 06",

	label: "/THE NEXT RECORD",

	statement:
		"This address holds nothing, so the page hands over the six places a reader who typed it usually meant. The first is the index, listing every address the build emits.",

	note: `SOURCE: SOURCE/CONTENT/MORE/PAGE.TS${Quad}EVERY ROW POINTS AT A ROUTE THE BUILD EMITS`,

	empty: "Nowhere to send the reader: that would mean the site has one page, and this register exists because it does not.",
};

/** The register on the three new surfaces' feet, one set per page. */
const Foot = (
	Rows: readonly OnwardRow[],
): { readonly rows: readonly OnwardRow[]; readonly copy: OnwardCopy } => ({
	rows: Rows,
	copy: {
		index: `ONWARD / 0${Rows.length}`,
		label: "/THE REST OF THE DOCUMENT",
		statement:
			"These three surfaces were built together and nothing on the site linked to them yet, so each ends by handing over the other two and the pages a reader is most likely to want next.",
		note: `SOURCE: SOURCE/CONTENT/MORE/PAGE.TS${Quad}THE SET IS THREE PAGES, NOT A SECTION`,
		empty: "Nothing to hand over. Every destination this register would list is the page you are on, which cannot happen while the set has three pages.",
	},
});

/** The status board's onward register. */
export const StatusOnward = Foot([
	{
		mark: "/",
		want: "WHAT THE WORD FOR A STATE MEANS",
		where: "GLOSSARY",
		href: "/Glossary",
		note: "The grammar's own nouns, and the five words this site retired.",
	},

	{
		mark: "/",
		want: "WHAT THE SUBSTRATE IS COMPARED TO",
		where: "COMPARE",
		href: "/Compare",
		note: "Eight aspects of the substitution, and the figures nobody has measured.",
	},

	{
		mark: "/",
		want: "WHAT IS PUBLISHED TODAY",
		where: "DOWNLOAD",
		href: "/Download",
		note: "The edition: source, three targets, and the absent artifact.",
	},

	{
		mark: "/",
		want: "EVERY ADDRESS THIS SITE ANSWERS ON",
		where: "CONTENTS",
		href: "/Contents",
		note: "The index, derived from the tree.",
	},
]);

/** The glossary's onward register. */
export const GlossaryOnward = Foot([
	{
		mark: "/",
		want: "WHAT IS LIVE TODAY",
		where: "STATUS",
		href: "/Status",
		note: "Twenty-one records under the four columns of the state vocabulary.",
	},

	{
		mark: "/",
		want: "WHAT IT IS COMPARED TO",
		where: "COMPARE",
		href: "/Compare",
		note: "Eight aspects of the substitution, and the five figures nobody has measured.",
	},

	{
		mark: "/",
		want: "THE MANUAL ITSELF",
		where: "DOC",
		href: "/Doc",
		note: "Sixty articles: the reference, the deep dives, and the workflows.",
	},

	{
		mark: "/",
		want: "EVERY ADDRESS THIS SITE ANSWERS ON",
		where: "CONTENTS",
		href: "/Contents",
		note: "The index, derived from the tree.",
	},
]);

/** The comparison's onward register. */
export const CompareOnward = Foot([
	{
		mark: "/",
		want: "WHAT IS LIVE TODAY",
		where: "STATUS",
		href: "/Status",
		note: "Twenty-one records under the four columns of the state vocabulary.",
	},

	{
		mark: "/",
		want: "THE WORD FOR THAT THING",
		where: "GLOSSARY",
		href: "/Glossary",
		note: "The fifteen elements, the grammar's own nouns, and five retired words.",
	},

	{
		mark: "/",
		want: "WHAT A BUILD FROM SOURCE TAKES",
		where: "DOWNLOAD",
		href: "/Download",
		note: "The install region, with one run entry per platform.",
	},

	{
		mark: "/",
		want: "EVERY ADDRESS THIS SITE ANSWERS ON",
		where: "CONTENTS",
		href: "/Contents",
		note: "The index, derived from the tree.",
	},
]);
