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
			value: T("footer:record.status.value", {
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
			key: T("footer:colophon.build.key", { defaultValue: "BUILD" }),
			value: T("footer:colophon.build.value", {
				defaultValue: "ASTRO\u2001STATIC",
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
			key: T("footer:colophon.extent.key", { defaultValue: "EXTENT" }),
			value: T("footer:colophon.extent.value", {
				defaultValue: `${FrameExtent}\u2001SECTIONS`,
			}),
		},

		{
			key: T("footer:colophon.edition.key", { defaultValue: "EDITION" }),
			value: T("footer:colophon.edition.value", {
				defaultValue: String(Year),
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
