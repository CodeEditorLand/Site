/**
 * Term - the Terms of Service page's own rows.
 *
 * Two things live here and nothing else: the ledger facts that date and scope
 * the document, and the clause index built from the document's own headings.
 *
 * Both are read off the page, never derived from it:
 *
 * - Every ledger value is a fragment that already exists in the page - the two
 *   dates from the page's frontmatter constants, the scope and the license from
 *   the Introduction and Intellectual Property clauses. A row whose value the
 *   page does not carry is absent, not invented.
 * - Every index row is one `h3` of the document, in document order, with the
 *   id that heading already carried. The slugs are the ones the page's own
 *   table of contents already linked, so an inbound `#governing-law` keeps
 *   working. The number is the clause's position and nothing else - the
 *   document is not renumbered, it is numbered.
 */
import type { ReadingIndexItem } from "../../../Component/Reading/Type.js";

import type { LedgerRow } from "../../../Component/Record/Type.js";

export const Ledger: readonly LedgerRow[] = [
	{ key: "Effective Date:", value: "March 26, 2026" },

	{ key: "Last Updated:", value: "May 29, 2026" },

	{
		key: "APPLIES TO:",

		value: "editor.land, the desktop application, APIs, Cloudflare Workers, documentation, downloads, account services, synchronization features, and any related services",

		note: "operated by PlayForm, based in Sofia, Bulgaria",
	},

	{
		key: "LICENSE:",

		value: "Creative Commons CC0 1.0 Universal",

		note: "the core editor codebase",
	},
];

export const Index: readonly ReadingIndexItem[] = [
	{ number: "01", label: "Introduction", href: "#introduction" },

	{ number: "02", label: "Communications", href: "#communications" },

	{ number: "03", label: "Purchases", href: "#purchases" },

	{
		number: "04",

		label: "Contests, Sweepstakes and Promotions",

		href: "#contests-sweepstakes-and-promotions",
	},

	{ number: "05", label: "Subscriptions", href: "#subscriptions" },

	{ number: "06", label: "Free Trial", href: "#free-trial" },

	{ number: "07", label: "Fee Changes", href: "#fee-changes" },

	{ number: "08", label: "Refunds", href: "#refunds" },

	{ number: "09", label: "Content", href: "#content" },

	{ number: "10", label: "Prohibited Uses", href: "#prohibited-uses" },

	{ number: "11", label: "No Use by Minors", href: "#no-use-by-minors" },

	{ number: "12", label: "Accounts", href: "#accounts" },

	{
		number: "13",

		label: "Intellectual Property",

		href: "#intellectual-property",
	},

	{ number: "14", label: "Copyright Policy", href: "#copyright-policy" },

	{
		number: "15",

		label: "DMCA Notice and Procedure for Copyright Infringement Claims",

		href: "#dmca-notice-and-procedure-for-copyright-infringement-claims",
	},

	{
		number: "16",

		label: "Error Reporting and Feedback",

		href: "#error-reporting-and-feedback",
	},

	{
		number: "17",

		label: "Links To Other Web Sites",

		href: "#links-to-other-web-sites",
	},

	{
		number: "18",

		label: "Disclaimer Of Warranty",

		href: "#disclaimer-of-warranty",
	},

	{
		number: "19",

		label: "Limitation Of Liability",

		href: "#limitation-of-liability",
	},

	{ number: "20", label: "Termination", href: "#termination" },

	{ number: "21", label: "Governing Law", href: "#governing-law" },

	{ number: "22", label: "Changes To Service", href: "#changes-to-service" },

	{
		number: "23",

		label: "Amendments To Terms",

		href: "#amendments-to-terms",
	},

	{
		number: "24",

		label: "Waiver And Severability",

		href: "#waiver-and-severability",
	},

	{ number: "25", label: "Acknowledgement", href: "#acknowledgement" },

	{ number: "26", label: "Contact Us", href: "#contact-us" },
];
