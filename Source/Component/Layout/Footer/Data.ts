// Footer data - the record's closing facts, the destinations behind the linked
// ones, and the two link rows the footer has always carried.
//
// Keys are addressed with the `footer:` namespace prefix because the server
// translator (`GetI18n`) resolves against the `common` namespace by default;
// without the prefix the JSON would never be read and every string would come
// from the call-site default. With it, `Footer.json` is the source of truth and
// the default is the fallback (BRIDGE 8.6).
//
// No JSX, no DOM access, no i18n import (BRIDGE 2.2).

import type {
	FooterContent,
	FooterLink,
	FooterLinkTarget,
	FooterTranslate,
} from "./Type.js";

import { FrameExtent } from "../Frame/Data.js";

import { EdgeBuildDate } from "../../../Content/Edge/Copy.js";

import { EdgeExtent } from "../../../Content/Edge/Register.js";

/**
 * The document's one separator, U+2001. A compact label joins its fields with
 * it and nothing else - not a middot, not a slash, not a space.
 */
const Quad = "\u2001";

/** An off-site destination: the reader leaves this site in a second tab. */
const Offsite = (Label: string, Href: string): FooterLink => ({
	Label,
	Href,
	Target: "blank",
});

/**
 * The band as data. Every fact, every label and every destination here existed in
 * the hand-written footer this replaces - nothing is added and nothing is
 * dropped.
 *
 * The colophon is the one addition: the record's *making* rather than its facts.
 * Every row is verifiable in this repository and nowhere else - `IBM PLEX MONO` is
 * the face `Base.astro` loads, `ASTRO STATIC` is the build `astro.config.ts`
 * declares (no `output` key), `F2EDE3` and `1C1C1E` are `--Background` and
 * `--Foreground` in `_Token.scss`, and the extent is the length of
 * `Frame/Data.ts`'s table. A colophon that guessed would be decoration.
 */
export const FooterData = (
	T: FooterTranslate,

	Year: number = new Date().getFullYear(),
): FooterContent => ({
	Ledger: [
		{
			key: T("footer:record.source.key", { defaultValue: "SOURCE" }),
			value: T("footer:record.source.value", {
				defaultValue: "CODEEDITORLAND",
			}),
		},

		{
			key: T("footer:record.license.key", { defaultValue: "LICENSE" }),
			value: T("footer:record.license.value", { defaultValue: "CC0" }),
			links: [
				{
					text: T("footer:record.license.value", {
						defaultValue: "CC0",
					}),
					href: "/License",
				},
			],
		},

		{
			key: T("footer:record.maintained.key", {
				defaultValue: "MAINTAINED BY",
			}),
			value: T("footer:record.maintained.value", {
				defaultValue: "PLAYFORM",
			}),
			links: [
				{
					text: T("footer:record.maintained.value", {
						defaultValue: "PLAYFORM",
					}),
					href: "https://PlayForm.Cloud",
					target: "blank",
				},
			],
		},

		{
			key: T("footer:record.support.key", { defaultValue: "SUPPORT" }),
			// Two funders under one key: the row's value is the pair as it is
			// read, and the two destinations are the two links the baseline
			// printed either side of the separator.
			value: `${T("footer:record.support.nlnet", {
				defaultValue: "NLNET",
			})} / ${T("footer:record.support.ngi", { defaultValue: "NGI0" })}`,
			links: [
				{
					text: T("footer:record.support.nlnet", {
						defaultValue: "NLNET",
					}),
					href: "https://nlnet.nl",
					target: "blank",
				},
				{
					text: T("footer:record.support.ngi", {
						defaultValue: "NGI0",
					}),
					href: "https://nlnet.nl/commonsfund",
					target: "blank",
				},
			],
		},

		{
			key: T("footer:record.status.key", { defaultValue: "STATUS" }),
			// The vocabulary's word, not a description of the licence: the header's
			// ribbon already reads `STATUS: ACTIVE`, and a footer that answered the
			// same key with `PUBLIC SOURCE` was answering a different question under
			// the same label. The licence fact is kept, as the row's note.
			value: T("footer:record.status.value", {
				defaultValue: "ACTIVE",
			}),
			note: T("footer:record.status.note", {
				defaultValue: "PUBLIC SOURCE",
			}),
		},
	],

	Colophon: [
		{
			key: T("footer:colophon.type.key", { defaultValue: "TYPE" }),
			value: T("footer:colophon.type.value", {
				defaultValue: "IBM PLEX MONO",
			}),
		},

		{
			key: T("footer:colophon.setin.key", { defaultValue: "SET IN" }),
			value: T("footer:colophon.setin.value", {
				defaultValue: `13-72PX${Quad}WEIGHT 400-500`,
			}),
		},

		{
			key: T("footer:colophon.build.key", { defaultValue: "BUILD" }),
			value: T("footer:colophon.build.value", {
				defaultValue: `ASTRO${Quad}STATIC`,
			}),
		},

		{
			// The day this HTML was rendered - the same date the page edges print,
			// read from one module, so the headnote and the colophon cannot disagree
			// about when the document was set.
			key: T("footer:colophon.impression.key", {
				defaultValue: "IMPRESSION",
			}),
			value: T("footer:colophon.impression.value", {
				defaultValue: EdgeBuildDate,
			}),
		},

		{
			key: T("footer:colophon.field.key", { defaultValue: "FIELD" }),
			value: T("footer:colophon.field.value", {
				defaultValue: "F2EDE3",
			}),
		},

		{
			key: T("footer:colophon.ink.key", { defaultValue: "INK" }),
			value: T("footer:colophon.ink.value", {
				defaultValue: "1C1C1E",
			}),
		},

		{
			// The two rule inks the sheet is drawn with: the hairline that divides
			// (`--Border`, 8 %) and the boundary that closes a chapter (`--Divider`,
			// 20 %). A colophon states its stock and its ink; a rule is an ink.
			key: T("footer:colophon.rule.key", { defaultValue: "RULE" }),
			value: T("footer:colophon.rule.value", {
				defaultValue: `8%${Quad}DIVIDER 20%`,
			}),
		},

		{
			key: T("footer:colophon.extent.key", { defaultValue: "EXTENT" }),
			value: T("footer:colophon.extent.value", {
				defaultValue: `${FrameExtent}${Quad}SECTIONS`,
			}),
		},

		{
			// The collation: how many sheets the document files, counted from the
			// edge register's own list. The number at the top of every page
			// (`# SHEET 05 / 41`) and the number here are the same list - and an
			// empty register says so in the grammar's fallback rather than printing
			// `00`, because a document with no sheets is a document that has not
			// been collated, not one that was measured at zero.
			key: T("footer:colophon.sheets.key", { defaultValue: "SHEETS" }),
			value: T("footer:colophon.sheets.value", {
				defaultValue:
					EdgeExtent === "00"
						? "\u25ce NO SHEETS FILED"
						: `${EdgeExtent}${Quad}FILED`,
			}),
		},

		{
			key: T("footer:colophon.edition.key", { defaultValue: "EDITION" }),
			value: T("footer:colophon.edition.value", {
				defaultValue: String(Year),
			}),
		},

		{
			// A colophon's errata names what is wrong with the impression. This one
			// does not restate the list - it points at the page that keeps it, so the
			// two cannot drift.
			key: T("footer:colophon.errata.key", { defaultValue: "ERRATA" }),
			value: T("footer:colophon.errata.value", {
				defaultValue: `/STATUS${Quad}EVERY UNFINISHED RECORD`,
			}),
			links: [
				{
					text: T("footer:colophon.errata.value", {
						defaultValue: `/STATUS${Quad}EVERY UNFINISHED RECORD`,
					}),
					href: "/Status",
				},
			],
		},

		{
			// The signature line: how a reader cites the document they are holding.
			key: T("footer:colophon.cite.key", { defaultValue: "CITE AS" }),
			value: T("footer:colophon.cite.value", {
				defaultValue: `CODEEDITORLAND${Quad}FIELD MANUAL${Quad}${Year}`,
			}),
		},
	],

	Quick: [
		{
			Label: T("footer:record.docs", { defaultValue: "/DOCS" }),
			Href: "/Doc",
		},

		{
			Label: T("footer:record.download", { defaultValue: "/DOWNLOAD" }),
			Href: "/Download",
		},

		Offsite(
			T("footer:record.github", { defaultValue: "/GITHUB" }),

			"https://github.com/CodeEditorLand/Land",
		),

		{
			Label: T("footer:record.contact", { defaultValue: "/CONTACT" }),
			Href: "/Contact",
		},

		{
			Label: T("footer:record.blog", { defaultValue: "/BLOG" }),
			Href: "/Blog",
		},
	],

	Legal: [
		{
			Label: T("footer:columns.legal.privacy", {
				defaultValue: "Privacy",
			}),
			Href: "/Legal/Privacy",
		},

		{
			Label: T("footer:columns.legal.terms", { defaultValue: "Terms" }),
			Href: "/Legal/Term",
		},

		{
			Label: T("footer:columns.legal.license", {
				defaultValue: "License",
			}),
			Href: "/License",
		},

		{
			Label: T("footer:columns.company.contributing", {
				defaultValue: "Contributing",
			}),
			Href: "/Contributing",
		},

		Offsite(
			T("footer:columns.company.issues", { defaultValue: "Issues" }),

			"https://github.com/CodeEditorLand/Land/issues",
		),

		{
			Label: T("footer:columns.product.blog", { defaultValue: "Blog" }),
			Href: "/Blog",
		},

		{
			Label: T("footer:columns.company.enterprise", {
				defaultValue: "Enterprise",
			}),
			Href: "/Contact/Sale",
		},
	],

	/**
	 * The index, as the band's closing field.
	 *
	 * ROUTES and LEGAL name categories of destination; `/Contents` is not another
	 * category - it is the page that lists every one of them, and the only page a
	 * reader can arrive at to see the whole document. A printed dossier's last
	 * line points back at its contents, so this one gets its own `INDEX:` label
	 * and one door, printed in the rows' own `/LABEL` grammar. It is also the
	 * placement that makes the index reachable at every width: the rail is
	 * `display: none` between 1024px and 1280px, the footer never is.
	 */
	Index: [
		{
			Label: T("footer:record.contents", { defaultValue: "/CONTENTS" }),
			Href: "/Contents",
		},
	],
});

/** The attributes an off-site link needs; a same-tab link needs none. */
export const FooterLinkAttributes = (
	Target: FooterLinkTarget | undefined,
): Record<string, string> =>
	Target === "blank" ? { target: "_blank", rel: "noopener noreferrer" } : {};
