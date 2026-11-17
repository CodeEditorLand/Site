// Footer - the shapes its data module publishes.
//
// The closing band is three things and nothing else: the record's facts as a
// ledger, the destinations those facts come from, and the links the footer has
// always carried. No markup here and no i18n client (BRIDGE 2.2) - the caller
// resolves the labels.

import type { LedgerRow } from "../../Record/Type.js";

/** Where a link sends the reader: the same tab, or a new one. */
export type FooterLinkTarget = "self" | "blank";

/** One destination in the footer. */
export interface FooterLink {
	readonly Label: string;

	readonly Href: string;

	readonly Target?: FooterLinkTarget;
}

/** The whole band as data, in reading order. */
export interface FooterContent {
	/** SOURCE, LICENSE, MAINTAINED BY, SUPPORT, STATUS - the record's facts. */
	readonly Ledger: readonly LedgerRow[];

	/** /DOCS, /DOWNLOAD, /GITHUB, /CONTACT, /BLOG. */
	readonly Quick: readonly FooterLink[];

	/** Privacy, Terms, License, Contributing, Issues, Blog, Enterprise. */
	readonly Legal: readonly FooterLink[];
}

/** A translator that resolves one key with an English default. */
export type FooterTranslate = (
	Key: string,
	Options: { readonly defaultValue: string },
) => string;
