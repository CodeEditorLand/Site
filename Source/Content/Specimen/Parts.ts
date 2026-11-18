/**
 * Parts - the document's own parts, filed as records.
 *
 * ─── WHY THIS TABLE EXISTS ────────────────────────────────────────────────
 * The tree grew a second layer under the design system: a family of
 * `Dynamic*` adapters that render a content schema, and the `Surface` blocks
 * that carry a state. By the time the surfaces were composed page by page, nine
 * of those files had no reader at all - they rendered, they were typed, and
 * nothing on the site asked them for anything. A part nothing reads is not a
 * part; it is a file.
 *
 * This table is the sheet's subject. One record per part, and each record says
 * four things a reader can check: what the part takes, what it prints, which
 * stylesheet draws it, and who asks for it. The `disposition` is the honest
 * answer for the parts this sheet cannot print - a header printed inside a page
 * is a second navigation landmark, not a specimen - and it is a field, not a
 * footnote, because "not printed, and here is why" is a designed state.
 *
 * ─── THE THREE DISPOSITIONS ───────────────────────────────────────────────
 *   printed   the part is on this sheet, live, at 1:1
 *   absent    the part cannot be printed here; the sheet states why, and
 *             what the surface that did take it is
 *   folded    the part's content is carried by a surface that should have had
 *             it, and the sheet names that surface
 *
 * Nothing in this table is a count of anything: the page counts the records it
 * renders, so a part added here changes every figure on the sheet without a
 * second edit.
 *
 * ─── THE CONTRACT IS NOT PROSE ────────────────────────────────────────────
 * `takes` and `prints` are the part's own API and behaviour, written in the
 * grammar's compact-label voice: upper case, no articles, no sentence. A
 * contract that read like a paragraph would be a description, and a description
 * of a component ages into a lie faster than any other sentence in a document.
 */

/** How a part is accounted for on the sheet. */
export type Disposition = "printed" | "absent" | "folded";

/** One contract row: the label, and the value under it. */
export interface ContractRow {
	/** `TAKES:` - the compact field label, colon included. */
	readonly key: string;

	/** The value, printed verbatim. */
	readonly value: string;

	/** Print the value in the code face: a prop list, a path, a file. */
	readonly code?: boolean;
}

/** The state a part is in when it cannot be printed here. */
export interface Absence {
	/** A word from §1.5's eight, never a free-text state. */
	readonly status: string;

	/** What the plate would hold, if the part could stand on it. */
	readonly wouldBe: string;

	/** Why it cannot - the cause, not an apology. */
	readonly whyNot: string;

	/** The one way forward. */
	readonly next: {
		readonly label: string;
		readonly href: string;
	};

	/** Provenance: the file, and who reads it. */
	readonly note: string;
}

/** One part of the document, as the sheet files it. */
export interface Part {
	/** `01` - the part's position on the sheet, zero-padded. */
	readonly mark: string;

	/** The part's name in the sheet's register: `BADGE`, `ARTICLE CARD`. */
	readonly name: string;

	/** The layer it belongs to: `SURFACE`, `FORM`, `CONTENT`, `BLOCK`. */
	readonly kind: string;

	/** The file the part is, relative to `Source/`, upper case. */
	readonly file: string;

	/** The sheet cell's one line: what the part is, in six words or fewer. */
	readonly note: string;

	/** The part's four contract rows, in the order they are read. */
	readonly contract: readonly ContractRow[];

	/** How the sheet accounts for it. */
	readonly disposition: Disposition;

	/**
	 * The plate this part is printed on, as an in-page anchor. A printed part
	 * has one; an absent or folded part has none, because a link to a plate that
	 * does not exist is a dead link in a live page.
	 */
	readonly plate?: string;

	/** Present exactly when `disposition` is `absent`. */
	readonly absence?: Absence;

	/** Present exactly when `disposition` is `folded`: the surface that carries it. */
	readonly foldedInto?: string;
}

/**
 * The twelve parts, in the order the sheet prints them: the seven that stand on
 * a plate first (a reader meets a specimen before a reason), then the two that
 * are printed somewhere else on the page, then the three that are not printed at
 * all.
 */
export const Parts: readonly Part[] = [
	{
		mark: "01",
		name: "BADGE",
		kind: "SURFACE",
		file: "COMPONENT/DYNAMIC/DYNAMICBADGE.TSX",
		note: "A word in a Jelly badge, with an optional dot.",
		contract: [
			{
				key: "TAKES:",
				value: "Text, Variant, ShowDot, DotColor",
				code: true,
			},
			{
				key: "PRINTS:",
				value: "One jelly-badge, and optionally a 6px square in the protocol ink the dot names.",
			},
			{
				key: "STYLESHEET:",
				value: "_Global.scss (the Jelly host pins) and _Shell.scss (.surface__chips)",
				code: true,
			},
			{ key: "CONSUMER:", value: "THIS SHEET, PLATE 01" },
		],
		disposition: "printed",
		plate: "#part-badge",
	},

	{
		mark: "02",
		name: "LABEL",
		kind: "FORM",
		file: "COMPONENT/DYNAMIC/DYNAMICLABEL.TSX",
		note: "A form label that states its own two conditions.",
		contract: [
			{
				key: "TAKES:",
				value: "Text, Required, Disabled, HTMLFor",
				code: true,
			},
			{
				key: "PRINTS:",
				value: "One label, with aria-required and aria-disabled stated on the label rather than left to the control.",
			},
			{
				key: "STYLESHEET:",
				value: "_Global.scss (the label role) and Contact/_Form.scss",
				code: true,
			},
			{ key: "CONSUMER:", value: "THIS SHEET, PLATE 02" },
		],
		disposition: "printed",
		plate: "#part-label",
	},

	{
		mark: "03",
		name: "CARD",
		kind: "SURFACE",
		file: "COMPONENT/DYNAMIC/DYNAMICCARD.TSX",
		note: "Three sections on one Jelly card.",
		contract: [
			{
				key: "TAKES:",
				value: "Sections: Header, Body, Footer, and an optional OnClick",
				code: true,
			},
			{
				key: "PRINTS:",
				value: "A jelly-card whose header carries a title, a description and free content; whose body carries a second title and its prose; and whose footer carries the action.",
			},
			{
				key: "STYLESHEET:",
				value: "_Global.scss (radius 0, --Card fill, no shadow)",
				code: true,
			},
			{ key: "CONSUMER:", value: "THIS SHEET, PLATE 03" },
		],
		disposition: "printed",
		plate: "#part-card",
	},

	{
		mark: "04",
		name: "TABLE",
		kind: "BLOCK",
		file: "COMPONENT/DYNAMIC/DYNAMICTABLE.TSX",
		note: "A head row and one row per record.",
		contract: [
			{
				key: "TAKES:",
				value: "Columns, Data, Striped, Hoverable, OnRowClick",
				code: true,
			},
			{
				key: "PRINTS:",
				value: "A head row, then one row per record. A column may render its own cell, so a row can carry a mark, a route or a state.",
			},
			{
				key: "STYLESHEET:",
				value: "Record/_Matrix.scss (the table's rule and seam)",
				code: true,
			},
			{
				key: "CONSUMER:",
				value: "THIS SHEET, PLATE 04, reading the four connection tiers",
			},
		],
		disposition: "printed",
		plate: "#part-table",
	},

	{
		mark: "05",
		name: "PROSE",
		kind: "BLOCK",
		file: "COMPONENT/DYNAMIC/DYNAMICRICHTEXT.TSX",
		note: "One string, parsed into paragraphs.",
		contract: [
			{ key: "TAKES:", value: "Text, ClassName", code: true },
			{
				key: "PRINTS:",
				value: "Paragraphs from one string, through the site's own RichText parser: a blank line is a paragraph, a backtick is code.",
			},
			{
				key: "STYLESHEET:",
				value: "_Global.scss (the prose measure and the code face)",
				code: true,
			},
			{
				key: "CONSUMER:",
				value: "THIS SHEET, PLATE 05, mounted as an island so the parser ships only where it is read",
			},
		],
		disposition: "printed",
		plate: "#part-prose",
	},

	{
		mark: "06",
		name: "ARTICLE CARD",
		kind: "CONTENT",
		file: "COMPONENT/DYNAMIC/DYNAMICBLOGCARD.TSX",
		note: "An entry, as a card.",
		contract: [
			{
				key: "TAKES:",
				value: "Post: Tags, Title, Summary, Author, ReadTime",
				code: true,
			},
			{
				key: "PRINTS:",
				value: "The tags as chips, the title, three lines of the summary, then the author and the reading time on one row.",
			},
			{
				key: "STYLESHEET:",
				value: "Blog/_Listing.scss (the card's face and its hover)",
				code: true,
			},
			{
				key: "CONSUMER:",
				value: "THIS SHEET, PLATE 06, fed by the newest entry in the collection",
			},
		],
		disposition: "printed",
		plate: "#part-article",
	},

	{
		mark: "07",
		name: "PROPERTIES",
		kind: "BLOCK",
		file: "COMPONENT/DYNAMIC/PROPERTIES/GRID.ASTRO",
		note: "Six claims as records: three kept, three filed.",
		contract: [
			{
				key: "TAKES:",
				value: "entries: PropertyEntry[] - marker, claim, paragraph, optional destination",
				code: true,
			},
			{
				key: "PRINTS:",
				value: "One jelly-card per claim, each carrying a RecordEntry in the property's own tint, then the three the layer files as one line of destinations. The split is DesignSystem-Grammar §8's three-claim budget, applied in Data.ts rather than in the markup.",
			},
			{
				key: "STYLESHEET:",
				value: "Dynamic/_Properties.scss (.properties-grid, .properties-entry, .properties-filed) and System/Record/_Entry.scss",
				code: true,
			},
			{
				key: "CONSUMER:",
				value: "THIS SHEET, PLATE 07 - and nothing else: the homepage's band prints the six elements as records rather than the six claims, so the claim grid is a part no page mounts",
			},
		],
		disposition: "printed",
		plate: "#part-properties",
	},

	{
		mark: "08",
		name: "CHIPS",
		kind: "SURFACE",
		file: "COMPONENT/SURFACE/SURFACECHIPS.ASTRO",
		note: "A record's states, as chips.",
		contract: [
			{ key: "TAKES:", value: "chips[]", code: true },
			{
				key: "PRINTS:",
				value: "One jelly-badge per state, each carrying the §1.5 marker and the tone's ink. The fill stays the neutral mute: a state chip is not a protocol chip and takes no spine ink.",
			},
			{
				key: "STYLESHEET:",
				value: "Surface/_Shell.scss (.surface__chips, .surface__mark)",
				code: true,
			},
			{
				key: "CONSUMER:",
				value: "THIS SHEET, THE STATES BAND, where it prints the vocabulary as a legend",
			},
		],
		disposition: "printed",
		plate: "#states",
	},

	{
		mark: "09",
		name: "TIER TABLE",
		kind: "CONTENT",
		file: "COMPONENT/DYNAMIC/INTERFACE/CONTENT/PAGE/PORTALDATA.TS",
		note: "Four tiers and their protocols.",
		contract: [
			{
				key: "TAKES:",
				value: "Cloud, Provider, LocalFirst, Enterprise",
				code: true,
			},
			{
				key: "PRINTS:",
				value: "Each tier's protocol spine, its badge and its feature set. It is the only file in the tree that carries the four protocol lines, and no page printed them until this sheet.",
			},
			{
				key: "STYLESHEET:",
				value: "Record/_Matrix.scss, through PLATE 04",
				code: true,
			},
			{
				key: "CONSUMER:",
				value: "THIS SHEET, PLATE 04 - the table reads this table",
			},
		],
		disposition: "printed",
		plate: "#part-table",
	},

	{
		mark: "10",
		name: "HEADER",
		kind: "SURFACE",
		file: "COMPONENT/DYNAMIC/DYNAMICHEADER.TSX",
		note: "The legacy schema-driven bar.",
		contract: [
			{ key: "TAKES:", value: "Navigation, Actions, Logo", code: true },
			{
				key: "PRINTS:",
				value: "`Layout/Header`, adapted from a legacy schema.",
			},
			{
				key: "STYLESHEET:",
				value: "Component/_Header.scss (the one bar's rules)",
				code: true,
			},
			{
				key: "CONSUMER:",
				value: "NONE, BY DESIGN - see the absence below",
			},
		],
		disposition: "absent",
		absence: {
			status: "UNAVAILABLE",
			wouldBe:
				"The schema-driven bar, printed at 1:1 on a plate, the way every other part on this sheet is.",
			whyNot: "It renders `Layout/Header`, and a second bar in one document is a second navigation landmark, a second mobile drawer and a second hydrated island. The frame prints the one bar, on every page; a copy of it here would be a picture of a page inside a page.",
			next: { label: "READ THE BAR ITSELF", href: "/" },
			note: "SOURCE: SOURCE/COMPONENT/DYNAMIC/DYNAMICHEADER.TSX\u2001CONSUMER: NONE, AND THAT IS THE DESIGN",
		},
	},

	{
		mark: "11",
		name: "FOOTER",
		kind: "SURFACE",
		file: "COMPONENT/DYNAMIC/DYNAMICFOOTER.TSX",
		note: "The four-column closing band.",
		contract: [
			{
				key: "TAKES:",
				value: "Brand, Social, Columns, BottomBar",
				code: true,
			},
			{
				key: "PRINTS:",
				value: "A `<footer>`: a brand column with its social row, then one column of links per register, then a bottom bar with the copyright.",
			},
			{
				key: "STYLESHEET:",
				value: "Tailwind utilities, and `text-muted-foreground` for every link",
				code: true,
			},
			{
				key: "CONSUMER:",
				value: "NONE - the Frame's colophon carries it",
			},
		],
		disposition: "absent",
		absence: {
			status: "UNAVAILABLE",
			wouldBe:
				"The closing band, printed at 1:1: the brand, the four link columns and the bottom bar.",
			whyNot: "A `<footer>` inside a page is a second contentinfo landmark, and the band it draws is the one the frame replaced - four columns of links in `text-muted-foreground`, where the document now closes on a colophon of two ledgers under a hairline. The five facts it carried are the footer's ledger today, and they are printed on every page rather than copied onto this one.",
			next: { label: "READ THE FIVE FACTS", href: "/Status" },
			note: "SOURCE: SOURCE/COMPONENT/DYNAMIC/DYNAMICFOOTER.TSX\u2001SUPERSEDED BY: COMPONENT/LAYOUT/FOOTER.ASTRO",
		},
	},

	{
		mark: "12",
		name: "VERIFICATION",
		kind: "BLOCK",
		file: "COMPONENT/DYNAMIC/DYNAMICVERIFICATIONINFO.TSX",
		note: "Checksums and signatures, with copy.",
		contract: [
			{
				key: "TAKES:",
				value: "Title, Description, DownloadVerification, IntegrityVerification",
				code: true,
			},
			{
				key: "PRINTS:",
				value: "Two blocks, each with a SHA-256 digest, a signature and a copy control on every value.",
			},
			{
				key: "STYLESHEET:",
				value: "Download/_Verify.scss (the region's wells)",
				code: true,
			},
			{
				key: "CONSUMER:",
				value: "NONE - /Download's /VERIFY region carries it",
			},
		],
		disposition: "absent",
		absence: {
			status: "UNAVAILABLE",
			wouldBe:
				"The checksum and signature block, printed at 1:1 with a live copy control.",
			whyNot: "It is superseded by the `/VERIFY` region of `/Download`, which prints the same two digests as `RecordWell` blocks with the site's one copy control - and this component copies through `alert()`, which is a browser dialog rather than a receipt in the record. Printing it would print the older of two answers to one question.",
			next: { label: "READ THE VERIFICATION RECORD", href: "/Download" },
			note: "SOURCE: SOURCE/COMPONENT/DYNAMIC/DYNAMICVERIFICATIONINFO.TSX\u2001SUPERSEDED BY: DOWNLOAD/VERIFY.ASTRO",
		},
	},
];

/**
 * A part the sheet prints live. `plate` is required: a printed part has an
 * anchor, and a link to an anchor that does not exist is a dead link in a live
 * page.
 */
export type PrintedPart = Part & { readonly plate: string };

/**
 * The printed parts, in the sheet's order, narrowed so a plate can take one
 * without a cast.
 *
 * The first seven are the seven plates. `CHIPS` prints in `/THE STATES` (its
 * anchor is the band) and `TIER TABLE` is printed by PLATE 04, so neither stands
 * on a plate of its own - which is why the sheet prints nine parts and seven
 * plates.
 */
export const PrintedParts = Parts.filter(
	(Part): Part is PrintedPart =>
		Part.disposition === "printed" && Part.plate !== undefined,
);

/** How many parts the sheet files. */
export const PartCount = Parts.length;

/** How many parts the sheet prints live. */
export const PrintedCount = Parts.filter(
	(Part) => Part.disposition === "printed",
).length;

/** How many parts the sheet states an absence for. */
export const AbsentCount = Parts.filter(
	(Part) => Part.disposition === "absent",
).length;

/** How many parts are carried by another surface. */
export const FoldedCount = Parts.filter(
	(Part) => Part.disposition === "folded",
).length;

/** The distinct layers the parts belong to, in the sheet's order. */
export const Kinds = [...new Set(Parts.map((Part) => Part.kind))];

/**
 * The sheet's cell for one part: what a reader scans before choosing a plate.
 *
 * Derived rather than stored, because a cell that restated its part's own fields
 * would be a second copy of them - and the second copy is the one that falls
 * behind.
 */
export const SheetRow = (Part: Part) => ({
	mark: Part.mark,
	name: Part.name,
	note: Part.note,
	kind: Part.kind,
	disposition: Part.disposition,
	...(Part.plate === undefined ? {} : { href: Part.plate }),
});

/**
 * The sheet's rows, in reading order.
 *
 * A printed part links to its plate; an absent one does not, because the sheet
 * prints the absence in place of the plate and a link to a plate that does not
 * exist is a dead link dressed as a live one.
 */
export const SheetRows = Parts.map(SheetRow);
