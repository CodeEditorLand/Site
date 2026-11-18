// Frame data - the dossier's ten parts, and the route-to-part lookup the frame
// is composed from.
//
// The frame is a document, so it needs a table of contents that exists in one
// place. This is it: every part of the record, in reading order, with its series
// index (`#` grammar), its `/` route, and the prefixes that put a page inside it.
// The header renders the table, the footer prints it, and `Base.astro` resolves
// the current page to one part so the *paper* - the `<html>` element - can carry
// the position as an attribute.
//
// The document's own index (`/Contents`) is not one of the ten: it is the table
// of contents *of* them, so it closes the table (`FrameClosing`) instead of
// joining it, and the extent stays ten.
//
// Why an attribute and not React state: the header is a client island and does
// not know its route at server render (`useState("/")` is the honest default),
// so a running head driven by state prints `/` and then flips on hydration. That
// is a jump between pages, which is the one thing a running head may never do.
// `Base.astro` knows the route server-side, so it writes `data-record` and
// `data-section` on `<html>`, the header prints all ten parts, and one SCSS loop
// inks the matching one. Correct at first paint, correct with JS off, and no
// hydration mismatch.
//
// No JSX, no DOM access, no i18n import (BRIDGE 2.2).

import type { HeaderTranslate } from "../Header/Type.js";

/** One part of the record: a numbered section of the dossier. */
export interface FrameSection {
	/**
	 * The series index, two digits, as the `#` grammar prints it - or, for the
	 * closing row that prints the index itself, the grammar's relation mark
	 * (`↳`), because the index has no place in the series it indexes.
	 */
	Index: string;

	/** Stable key. It is the `data-section` value and the rail's identity. */
	Key: string;

	/** The English label. A locale file may override it under `index.<Key>`. */
	Label: string;

	/** The section's own record: where a reader lands when they pick this part. */
	Href: string;

	/**
	 * Route prefixes that place a page inside this part. `/` is matched exactly
	 * (it would otherwise prefix every route); every other prefix matches the
	 * route itself and everything under it.
	 */
	Prefixes: readonly string[];
}

/**
 * The ten parts, in the order a dossier is read: the cover, the offer, the
 * manual, the notes, the way in, then the legal back matter, then the two app
 * surfaces. Nothing here is a new destination - each `Href` is a route the site
 * already serves.
 */
export const FrameSections: readonly FrameSection[] = [
	{
		Index: "01",
		Key: "home",
		Label: "HOME",
		Href: "/",
		Prefixes: ["/", "/Compare"],
	},

	{
		Index: "02",
		Key: "download",
		Label: "DOWNLOAD",
		Href: "/Download",
		Prefixes: ["/Download", "/Status"],
	},

	{
		Index: "03",
		Key: "doc",
		Label: "DOCUMENTATION",
		Href: "/Doc",
		Prefixes: ["/Doc", "/Glossary", "/Motion"],
	},

	{
		Index: "04",
		Key: "blog",
		Label: "BLOG",
		Href: "/Blog",
		Prefixes: ["/Blog"],
	},

	{
		Index: "05",
		Key: "contact",
		Label: "CONTACT",
		Href: "/Contact",
		Prefixes: ["/Contact"],
	},

	{
		Index: "06",
		Key: "license",
		Label: "LICENSE",
		Href: "/License",
		Prefixes: ["/License"],
	},

	{
		Index: "07",
		Key: "contributing",
		Label: "CONTRIBUTING",
		Href: "/Contributing",
		Prefixes: ["/Contributing"],
	},

	{
		Index: "08",
		Key: "legal",
		Label: "LEGAL",
		Href: "/Legal/Privacy",
		Prefixes: ["/Legal"],
	},

	{
		Index: "09",
		Key: "portal",
		Label: "PORTAL",
		Href: "/Portal",
		Prefixes: ["/Portal", "/Dashboard"],
	},

	{
		Index: "10",
		Key: "account",
		Label: "ACCOUNT",
		Href: "/Account",
		Prefixes: ["/Account", "/Verify", "/OAuth"],
	},
];

/**
 * The index itself, printed after the ten.
 *
 * `/Contents` is the document's table of contents, and a table of contents is not
 * an eleventh part: it is the index *of* the ten. So it is deliberately not in
 * `FrameSections` - the extent stays `10`, the rail keeps its ten numbered tabs,
 * and the top-level nav keeps its ten parts - and it is printed as a closing row
 * instead, carrying the grammar's relation mark (`↳`) where a part carries a
 * series index.
 *
 * The frame still has to place a page that is open at the index, or the running
 * head would print `◎ UNFILED` on the one page that files everything: `Index`
 * therefore holds the mark, and `FrameSectionOf` resolves `/Contents` to this
 * record. It is the only entry the extent does not count.
 */
export const FrameClosing: FrameSection = {
	Index: "↳",
	Key: "contents",
	Label: "CONTENTS",
	Href: "/Contents",
	Prefixes: ["/Contents"],
};

/**
 * The fallback part. `◎` is the grammar's mark for a thing with no glyph, and it
 * is the right mark here: a 404 or a visit record is genuinely unfiled, and
 * printing `◎␁UNFILED` says so instead of pretending the page is part of a
 * section it is not.
 */
export const FrameUnfiled: FrameSection = {
	Index: "◎",
	Key: "unfiled",
	Label: "UNFILED",
	Href: "/",
	Prefixes: [],
};

/** The extent of the document, as the running head prints it (`03␁/␁10`). */
export const FrameExtent = String(FrameSections.length).padStart(2, "0");

/** A path without its trailing slash, with `/` kept for the root, lowercased. */
const Normalize = (Path: string): string => {
	const Trimmed = Path.replace(/\/+$/, "");

	return (Trimmed === "" ? "/" : Trimmed).toLowerCase();
};

/** Does the reader stand on this prefix, or under it? `/` matches exactly. */
const OnPrefix = (Prefix: string, Current: string): boolean => {
	const Normalized = Normalize(Prefix);

	return Normalized === "/"
		? Current === "/"
		: Current === Normalized || Current.startsWith(`${Normalized}/`);
};

/**
 * The part a path belongs to, the closing index record, or the unfiled record.
 * First match wins, so the table's order is the resolution order and no two
 * entries may claim one prefix. The extent (`FrameExtent`) is still
 * `FrameSections.length`: the closing record is a position in the frame, not a
 * part of the count.
 */
export const FrameSectionOf = (Path: string): FrameSection => {
	const Current = Normalize(Path);

	return (
		[...FrameSections, FrameClosing].find((Section) =>
			Section.Prefixes.some((Prefix) => OnPrefix(Prefix, Current)),
		) ?? FrameUnfiled
	);
};

/** The label a section prints, with the locale file able to override it. */
export const FrameLabel = (Section: FrameSection, T: HeaderTranslate): string =>
	T(`index.${Section.Key}`, { defaultValue: Section.Label });
