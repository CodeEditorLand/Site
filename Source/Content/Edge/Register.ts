/**
 * The Edge register - every sheet this document files, in the order it is read.
 *
 * ─── WHY THIS FILE EXISTS ─────────────────────────────────────────────────
 * The site had a running head that said which PART of the document the reader
 * stood in, and nothing that said which SHEET. A part is ten pages of a dossier;
 * a sheet is one of them, and a reader who wants to know whether to stay needs
 * the sheet, not the part: what it is, where in the document it sits, when it
 * was last read, whether it is indexed, and what it was set from.
 *
 * So this is the document's collation: the sheets in reading order, each with the
 * one sentence that says what it is for and the file it was set from. It is the
 * table a printed book's binder would have kept, and it is the only place the
 * ordinal `SHEET 05 / 41` can come from - a page cannot number itself, because a
 * page does not know what is before it.
 *
 * ─── THE TWO RULES ────────────────────────────────────────────────────────
 * 1. **The extent is the list's own length.** `EdgeExtent` is
 *    `EdgeSheets.length`, never a typed figure. Adding a sheet renumbers the
 *    document and the footer's colophon in the same build, because both read
 *    this number.
 * 2. **A route that is not here is `◎ UNFILED`.** `/404` and `/Visit` are
 *    deliberately absent: neither is a sheet of the document, and the leaf of
 *    each says so in the grammar's fallback mark rather than inventing a place
 *    for a page that has none. A page added to `Source/pages` and forgotten here
 *    prints the same arm, which is the defect made visible instead of silent.
 *
 * ─── THE PROPOSITIONS ─────────────────────────────────────────────────────
 * The `↳` line is the sheet's purpose, not its argument: the page's own `h1` and
 * standfirst make the argument, and a second copy of it would be a poster. These
 * are written once, here, in the voice the grammar keeps - fragments, no full
 * stop, no adjective that is not a fact.
 *
 * On `/Contact` the sentence is NOT written here: it is `ContactPurposeAt`'s
 * `Purpose`, the subtitle the route's own page prints, so a link and a leaf
 * cannot describe one route two ways.
 *
 * ─── THE TURN ─────────────────────────────────────────────────────────────
 * `EdgeNextOf` answers what comes after a sheet, and it answers at the PART's
 * granularity: every sheet of `/DOCUMENTATION` closes by handing the reader
 * `/BLOG`, and the entry sheet of `/BLOG` opens on the same three facts. That is
 * the whole design - the closing gesture of one sheet and the opening gesture of
 * the next are one seam, and a reader can check it by turning the page.
 *
 * No DOM, no JSX, no i18n import: a register is data.
 */

import { ContactPurposeOf } from "../../Library/Contact/Purpose.js";

import {
	FrameClosing,
	FrameSections,
	type FrameSection,
} from "../../Component/Layout/Frame/Data.js";

// The document's one separator, U+2001, is never typed in this file: every string
// here is a proposition or a path. The leaf's facts are rows now, so the em quad
// that used to be drawn BETWEEN two facts is gone with the inline run - the
// separators that remain are inside a value (`05␁CONTACT`, `12␁DAYS`), where the
// quad joins two halves of one fact rather than two facts, and it is typed by the
// component that builds the value. A template's newline beside an em quad becomes
// a 200px gap, which is the defect the clause rail already paid for once.

/** One sheet of the document. */
export interface EdgeSheet {
	/** The canonical path the build emits, or a `:Slug` pattern for a collection. */
	readonly Path: string;

	/**
	 * The part of the document the sheet belongs to - a `FrameSection.Key`.
	 *
	 * A key rather than an index, because the part's number is the frame's
	 * (`Frame/Data.ts`) and a second copy here would be a second answer to the
	 * same question. `EdgePartOf` resolves it.
	 */
	readonly Part: string;

	/** The `↳` line: what this sheet is for, in one clause. */
	readonly Proposition: string;

	/**
	 * For a collection sheet: the prefix every built path shares (`/Doc`). A
	 * concrete path under it resolves to this sheet, so one row files 78 article
	 * pages without a second table.
	 */
	readonly Family?: string;

	/**
	 * The date the sheet's own facts were read, when the page carries one. Absent,
	 * the sheet is as fresh as the build and the leaf prints the build's date.
	 * A sheet that invented a date would be the one figure on the page with no
	 * source.
	 */
	readonly AsOf?: string;

	/** The page entry the sheet was set from, relative to `Source/pages`. */
	readonly Source: string;
}

/**
 * The document, sheet by sheet, in the order a dossier is read: the cover and
 * its substitution table, the offer and its audit, the manual, the notes, the
 * desk and its thirteen routes, the legal back matter, the two app surfaces, and
 * then the index of all of it.
 *
 * The order inside a part is the order of a reader's use, not the alphabet: a
 * part opens on its index, then its children, then the reference pages that
 * belong to the same subject.
 */
export const EdgeSheets: readonly EdgeSheet[] = [
	// ─── 01 HOME ──────────────────────────────────────────────────────────
	{
		Path: "/",

		Part: "home",

		Proposition: "THE EDITOR'S CLAIM, AND THE FOUR STAGES IT IS BUILT IN",

		Source: "pages/index.astro",
	},

	{
		Path: "/Compare",

		Part: "home",

		Proposition:
			"WHERE THIS EDITOR SUBSTITUTES ITS PARTS, AND WHERE IT CANNOT",

		AsOf: "2026-05-23",

		Source: "pages/Compare.astro",
	},

	// ─── 02 DOWNLOAD ──────────────────────────────────────────────────────
	{
		Path: "/Download",

		Part: "download",

		Proposition: "WHAT CAN BE INSTALLED TODAY, AND WHAT CANNOT",

		Source: "pages/Download.astro",
	},

	{
		Path: "/Status",

		Part: "download",

		Proposition: "EVERY RECORD THE DOCUMENT CARRIES, SORTED BY ITS STATE",

		Source: "pages/Status.astro",
	},

	// ─── 03 DOCUMENTATION ─────────────────────────────────────────────────
	{
		Path: "/Doc",

		Part: "doc",

		Proposition: "THE MANUAL: THE EDITOR, ITS ELEMENTS, ITS BOUNDARIES",

		Source: "pages/Doc.astro",
	},

	{
		Path: "/Doc/:Slug",

		Part: "doc",

		Proposition:
			"ONE CHAPTER OF THE MANUAL, WITH ITS FIGURES AND ITS SOURCES",

		Family: "/Doc",

		Source: "pages/Doc/[...Slug].astro",
	},

	{
		Path: "/Doc/Rust",

		Part: "doc",

		Proposition: "THE RUST CORE, ITS BOUNDARIES, AND WHAT IT DOES NOT OWN",

		Source: "pages/Doc/Rust.astro",
	},

	{
		Path: "/Glossary",

		Part: "doc",

		Proposition: "THE WORDS THIS DOCUMENT USES, AND THE ONES IT RETIRED",

		Source: "pages/Glossary.astro",
	},

	{
		Path: "/Motion",

		Part: "doc",

		Proposition: "HOW A CHANGE OF STATE IS DRAWN, AND WHEN IT IS NOT",

		Source: "pages/Motion.astro",
	},

	// ─── 04 BLOG ──────────────────────────────────────────────────────────
	{
		Path: "/Blog",

		Part: "blog",

		Proposition: "NOTES FROM THE BUILD, NEWEST FIRST",

		Source: "pages/Blog.astro",
	},

	{
		Path: "/Blog/:Slug",

		Part: "blog",

		Proposition: "ONE NOTE FROM THE BUILD, AND WHAT IT DOES NOT COVER",

		Family: "/Blog",

		Source: "pages/Blog/[Slug].astro",
	},

	// ─── 05 CONTACT ───────────────────────────────────────────────────────
	{
		Path: "/Contact",

		Part: "contact",

		Proposition: "THE DESK: THIRTEEN ROUTES, ONE FOR EACH THING YOU NEED",

		Source: "pages/Contact/index.astro",
	},

	{
		Path: "/Contact/Amend",

		Part: "contact",

		Proposition: "",

		Source: "pages/Contact/Amend.astro",
	},

	{
		Path: "/Contact/Claim",

		Part: "contact",

		Proposition: "",

		Source: "pages/Contact/Claim.astro",
	},

	{
		Path: "/Contact/Deals",

		Part: "contact",

		Proposition: "",

		Source: "pages/Contact/Deals.astro",
	},

	{
		Path: "/Contact/Erase",

		Part: "contact",

		Proposition: "",

		Source: "pages/Contact/Erase.astro",
	},

	{
		Path: "/Contact/Guard",

		Part: "contact",

		Proposition: "",

		Source: "pages/Contact/Guard.astro",
	},

	{
		Path: "/Contact/Hails",

		Part: "contact",

		Proposition: "",

		Source: "pages/Contact/Hails.astro",
	},

	{
		Path: "/Contact/Leave",

		Part: "contact",

		Proposition: "",

		Source: "pages/Contact/Leave.astro",
	},

	{
		Path: "/Contact/Legal",

		Part: "contact",

		Proposition: "",

		Source: "pages/Contact/Legal.astro",
	},

	{
		Path: "/Contact/Lodge",

		Part: "contact",

		Proposition: "",

		Source: "pages/Contact/Lodge.astro",
	},

	{
		Path: "/Contact/Pause",

		Part: "contact",

		Proposition: "",

		Source: "pages/Contact/Pause.astro",
	},

	{
		Path: "/Contact/Query",

		Part: "contact",

		Proposition: "",

		Source: "pages/Contact/Query.astro",
	},

	{
		Path: "/Contact/Reach",

		Part: "contact",

		Proposition: "",

		Source: "pages/Contact/Reach.astro",
	},

	{
		Path: "/Contact/Sale",

		Part: "contact",

		Proposition: "",

		Source: "pages/Contact/Sale.astro",
	},

	{
		Path: "/Contact/Scout",

		Part: "contact",

		Proposition: "",

		Source: "pages/Contact/Scout.astro",
	},

	// ─── 06 LICENSE ───────────────────────────────────────────────────────
	{
		Path: "/License",

		Part: "license",

		Proposition: "WHAT YOU MAY DO WITH THIS WORK, IN PLAIN CLAUSES",

		Source: "pages/License.astro",
	},

	// ─── 07 CONTRIBUTING ──────────────────────────────────────────────────
	{
		Path: "/Contributing",

		Part: "contributing",

		Proposition: "HOW A CHANGE REACHES THIS TREE, AND WHAT IT MUST PASS",

		Source: "pages/Contributing.astro",
	},

	// ─── 08 LEGAL ─────────────────────────────────────────────────────────
	{
		Path: "/Legal/Privacy",

		Part: "legal",

		Proposition: "WHAT THIS SITE COLLECTS, AND WHAT IT NEVER DOES",

		Source: "pages/Legal/Privacy.astro",
	},

	{
		Path: "/Legal/Term",

		Part: "legal",

		Proposition: "THE TERMS THIS SITE IS OFFERED UNDER",

		Source: "pages/Legal/Term.astro",
	},

	// ─── 09 PORTAL ────────────────────────────────────────────────────────
	{
		Path: "/Portal",

		Part: "portal",

		Proposition: "THE PROVIDER PORTAL, AND WHO HOLDS EACH ACCOUNT",

		Source: "pages/Portal.astro",
	},

	{
		Path: "/Dashboard",

		Part: "portal",

		Proposition: "THE OPERATOR'S PANEL: THE RECORD'S OWN LIVE VALUES",

		Source: "pages/Dashboard.astro",
	},

	// ─── 10 ACCOUNT ───────────────────────────────────────────────────────
	{
		Path: "/Account",

		Part: "account",

		Proposition: "YOUR RECORD: WHAT IT HOLDS, AND WHAT IT NEVER WILL",

		Source: "pages/Account/index.astro",
	},

	{
		Path: "/Account/SignIn",

		Part: "account",

		Proposition: "THE ONE DOOR INTO AN ACCOUNT",

		Source: "pages/Account/SignIn.astro",
	},

	{
		Path: "/Account/SignUp",

		Part: "account",

		Proposition: "WHY REGISTRATION IS CLOSED, AND WHAT OPENS IT",

		Source: "pages/Account/SignUp.astro",
	},

	{
		Path: "/Account/ForgotPassword",

		Part: "account",

		Proposition: "HOW A LOST PASSWORD IS REPLACED",

		Source: "pages/Account/ForgotPassword.astro",
	},

	{
		Path: "/Account/ResetPassword",

		Part: "account",

		Proposition: "HOW A REPLACEMENT PASSWORD IS SET",

		Source: "pages/Account/ResetPassword.astro",
	},

	{
		Path: "/Verify",

		Part: "account",

		Proposition: "THE THREE ANSWERS A VERIFICATION LINK CAN GIVE",

		Source: "pages/Verify.astro",
	},

	{
		Path: "/OAuth/Success",

		Part: "account",

		Proposition: "THE CALLBACK: WHAT IT WRITES, AND WHEN IT FAILS",

		Source: "pages/OAuth/Success.astro",
	},

	// ─── ↳ CONTENTS ───────────────────────────────────────────────────────
	{
		Path: "/Contents",

		Part: "contents",

		Proposition: "EVERY SHEET THIS DOCUMENT FILES, IN ONE INDEX",

		Source: "pages/Contents.astro",
	},

	{
		Path: "/Specimen",

		Part: "contents",

		Proposition: "THE DOCUMENT'S OWN PARTS, PRINTED AT ONE TO ONE",

		Source: "pages/Specimen.astro",
	},
];

/** The document's extent, as every edge prints it: `41`. Two digits, zero-padded. */
export const EdgeExtent = String(EdgeSheets.length).padStart(2, "0");

/** A path without its trailing slash, with `/` kept for the root, lowercased. */
const Normalize = (Path: string): string => {
	const Trimmed = Path.replace(/\/+$/, "");

	return (Trimmed === "" ? "/" : Trimmed).toLowerCase();
};

/** A sheet's own key for matching: its pattern, lowercased. */
const KeyOf = (Sheet: EdgeSheet): string => Normalize(Sheet.Path);

/**
 * The sheet a path is printed on, with its place in the document.
 *
 * Exact paths win over a family, always: `/Doc/Rust` is its own sheet and must
 * not be read as an article of `/Doc/:Slug`. The family arm is the collection's -
 * one row files 78 article pages, and the ordinal printed on each is the family's
 * place, which is the honest answer: a collection has one place in a collation.
 */
export interface EdgePlace {
	readonly Sheet: EdgeSheet;

	/** The sheet's ordinal, two digits: `05`. */
	readonly Ordinal: string;

	/** The document's extent, for `OF 41`. */
	readonly Of: string;

	/** The sheet's 1-based position, for arithmetic. */
	readonly Position: number;
}

/** The place a path holds in the document, or `undefined` when it is unfiled. */
export const EdgePlaceOf = (Path: string): EdgePlace | undefined => {
	const Current = Normalize(Path);

	const Position = EdgeSheets.findIndex((Sheet) => KeyOf(Sheet) === Current);

	if (Position !== -1) {
		return {
			Sheet: EdgeSheets[Position]!,

			Ordinal: String(Position + 1).padStart(2, "0"),

			Of: EdgeExtent,

			Position,
		};
	}

	const FamilyPosition = EdgeSheets.findIndex((Sheet) => {
		if (Sheet.Family === undefined) return false;

		const Prefix = Normalize(Sheet.Family);

		return (
			Current.startsWith(`${Prefix}/`) &&
			Current.length > Prefix.length + 1
		);
	});

	if (FamilyPosition === -1) return undefined;

	return {
		Sheet: EdgeSheets[FamilyPosition]!,

		Ordinal: String(FamilyPosition + 1).padStart(2, "0"),

		Of: EdgeExtent,

		Position: FamilyPosition,
	};
};

/**
 * The sheet's proposition.
 *
 * The `/Contact` routes carry no sentence in the table above because their
 * sentence already exists: `ContactPurposeAt` reads it out of `Request.ts`, which
 * is the same string the route's page and its share card print. A second copy
 * here would be the fourth place to change when a route is renamed.
 */
export const EdgePropositionOf = (Sheet: EdgeSheet): string => {
	if (Sheet.Proposition !== "") return Sheet.Proposition;

	const Purpose = ContactPurposeOf(Sheet.Path);

	return Purpose?.Purpose ?? "";
};

/** The part of the document a sheet belongs to, resolved through the frame. */
export const EdgePartOf = (Sheet: EdgeSheet): FrameSection =>
	[...FrameSections, FrameClosing].find(
		(Section) => Section.Key === Sheet.Part,
	) ?? FrameClosing;

/** What the page's closing edge hands the reader. */
export interface EdgeNext {
	/**
	 * `part` - the next part of the document, and its entry sheet.
	 * `index` - an unfiled page has no next sheet, only the index of all of them.
	 * `record-end` - the last part ends on the colophon below it.
	 */
	readonly Kind: "part" | "index" | "record-end";

	/** Where the turn sends the reader. */
	readonly Route: string;

	/** The part the destination opens. */
	readonly Part: FrameSection;

	/** The destination's own `↳` line - the line its leaf will print. */
	readonly Proposition: string;
}

/** The index, as the unfiled page's only exit and the colophon's door. */
const IndexNext: EdgeNext = {
	Kind: "index",

	Route: "/Contents",

	Part: FrameClosing,

	Proposition: "EVERY SHEET THIS DOCUMENT FILES, IN ONE INDEX",
};

/** The entry sheet of a part: its first sheet in reading order. */
const EntryOfPart = (Part: FrameSection): EdgePlace | undefined => {
	const Path = EdgeSheets.find((Sheet) => Sheet.Part === Part.Key)?.Path;

	// No sheet, no entry: a part with nothing filed under it hands over its own
	// route rather than resolving an empty string (which would match `/`).
	return Path === undefined ? undefined : EdgePlaceOf(Path);
};

/**
 * What comes after this sheet.
 *
 * The answer is the PART's, not the sheet's: a sheet's foot hands the reader the
 * next chapter, which is what a catchword does. Every sheet of `/DOCUMENTATION`
 * therefore closes on `/BLOG`, and `/BLOG`'s own leaf opens on the same route,
 * the same part and the same sentence - so the two edges of a navigation are one
 * printed seam.
 */
export const EdgeNextOf = (Path: string): EdgeNext => {
	const Place = EdgePlaceOf(Path);

	if (Place === undefined) return IndexNext;

	const Part = EdgePartOf(Place.Sheet);

	if (Part.Key === FrameClosing.Key) {
		return {
			Kind: "record-end",

			Route: "/Contents",

			Part: FrameClosing,

			Proposition:
				"THE COLOPHON BELOW, AND THE INDEX OF EVERY SHEET AT /CONTENTS",
		};
	}

	const Position = FrameSections.findIndex(
		(Section) => Section.Key === Part.Key,
	);

	const After = FrameSections[Position + 1];

	if (After === undefined) {
		return {
			Kind: "record-end",

			Route: "/Contents",

			Part: FrameClosing,

			Proposition:
				"THE COLOPHON BELOW, AND THE INDEX OF EVERY SHEET AT /CONTENTS",
		};
	}

	const Entry = EntryOfPart(After);

	return {
		Kind: "part",

		Route: Entry?.Sheet.Path ?? After.Href,

		Part: After,

		Proposition: Entry ? EdgePropositionOf(Entry.Sheet) : "",
	};
};
