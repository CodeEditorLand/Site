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
 */
export const FooterData = (T: FooterTranslate): FooterContent => ({
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
		},

		{
			key: T("footer:record.maintained.key", {
				defaultValue: "MAINTAINED BY",
			}),
			value: T("footer:record.maintained.value", {
				defaultValue: "PLAYFORM",
			}),
		},

		{
			key: T("footer:record.support.key", { defaultValue: "SUPPORT" }),
			value: `${T("footer:record.support.nlnet", {
				defaultValue: "NLNET",
			})} · ${T("footer:record.support.ngi", { defaultValue: "NGI0" })}`,
		},

		{
			key: T("footer:record.status.key", { defaultValue: "STATUS" }),
			value: T("footer:record.status.value", {
				defaultValue: "PUBLIC SOURCE",
			}),
		},
	],

	// The ledger prints the linked facts as text (`LedgerRow.value` is a string),
	// so the destinations the reader had before are kept here, in the /LABEL form
	// the footer already uses for its quick links.
	Sources: [
		{
			Label: T("footer:record.license.key", { defaultValue: "LICENSE" }),
			Href: "/License",
		},

		Offsite(
			T("footer:record.maintained.value", { defaultValue: "PLAYFORM" }),
			"https://PlayForm.Cloud",
		),

		Offsite(
			T("footer:record.support.nlnet", { defaultValue: "NLNET" }),
			"https://nlnet.nl",
		),

		Offsite(
			T("footer:record.support.ngi", { defaultValue: "NGI0" }),
			"https://nlnet.nl/commonsfund",
		),
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
});

/** The attributes an off-site link needs; a same-tab link needs none. */
export const FooterLinkAttributes = (
	Target: FooterLinkTarget | undefined,
): Record<string, string> =>
	Target === "blank" ? { target: "_blank", rel: "noopener noreferrer" } : {};
