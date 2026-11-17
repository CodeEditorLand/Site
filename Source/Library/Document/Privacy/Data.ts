/**
 * Privacy - the Privacy Policy page's own rows.
 *
 * Same two lists as the terms page: the ledger facts and the clause index.
 * One difference is the point of this file - the page carries no license
 * statement, so there is no LICENSE row. A policy that does not say what it is
 * licensed under does not get a license row; the omission is the fact.
 */
import type { ReadingIndexItem } from "../../../Component/Reading/Type.js";
import type { LedgerRow } from "../../../Component/Record/Type.js";

export const Ledger: readonly LedgerRow[] = [
	{ key: "Effective Date:", value: "March 26, 2026" },
	{ key: "Last Updated:", value: "May 29, 2026" },
	{
		key: "APPLIES TO",
		value: "Code Editor Land, operated by PlayForm in Sofia, Bulgaria",
		note: "the Code Editor Land project",
	},
];

export const Index: readonly ReadingIndexItem[] = [
	{ number: "01", label: "Introduction", href: "#introduction" },
	{ number: "02", label: "Definitions", href: "#definitions" },
	{
		number: "03",
		label: "Information Collection and Use",
		href: "#information-collection-and-use",
	},
	{
		number: "04",
		label: "Types of Data Collected",
		href: "#types-of-data-collected",
	},
	{ number: "05", label: "Use of Data", href: "#use-of-data" },
	{ number: "06", label: "Retention of Data", href: "#retention-of-data" },
	{ number: "07", label: "Transfer of Data", href: "#transfer-of-data" },
	{ number: "08", label: "Disclosure of Data", href: "#disclosure-of-data" },
	{ number: "09", label: "Security of Data", href: "#security-of-data" },
	{
		number: "10",
		label: "Your Data Protection Rights Under General Data Protection Regulation (GDPR)",
		href: "#your-data-protection-rights-under-general-data-protection-regulation-gdpr",
	},
	{
		number: "11",
		label: "Your Data Protection Rights under the California Privacy Protection Act (CalOPPA)",
		href: "#your-data-protection-rights-under-the-california-privacy-protection-act-caloppa",
	},
	{
		number: "12",
		label: "Your Data Protection Rights under the California Consumer Privacy Act (CCPA)",
		href: "#your-data-protection-rights-under-the-california-consumer-privacy-act-ccpa",
	},
	{ number: "13", label: "Service Providers", href: "#service-providers" },
	{ number: "14", label: "Payments", href: "#payments" },
	{
		number: "15",
		label: "Links to Other Sites",
		href: "#links-to-other-sites",
	},
	{ number: "16", label: "Children's Privacy", href: "#childrens-privacy" },
	{
		number: "17",
		label: "Changes to This Privacy Policy",
		href: "#changes-to-this-privacy-policy",
	},
	{ number: "18", label: "Contact Us", href: "#contact-us" },
];
