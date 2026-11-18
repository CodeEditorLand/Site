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

	/**
	 * TYPE, BUILD, FIELD, INK, EXTENT, EDITION - how this document was set.
	 * A colophon is the printer's note at the end of a book, and these are its
	 * rows: the face, the process, the stock, the ink, the length, the year. It
	 * is a `RecordLedger` like the facts above it, because a colophon is facts,
	 * not a second kind of widget.
	 */
	readonly Colophon: readonly LedgerRow[];

	/** /DOCS, /DOWNLOAD, /GITHUB, /CONTACT, /BLOG. */
	readonly Quick: readonly FooterLink[];

	/** Privacy, Terms, License, Contributing, Issues, Blog, Enterprise. */
	readonly Legal: readonly FooterLink[];

	/**
	 * /CONTENTS - the document's index, as its own field.
	 *
	 * The two rows above are categories of destination. The index is not another
	 * one: it is the page that lists all of them, so it gets the last field of
	 * the band to itself, the way a printed dossier's last line points back at
	 * its contents. One door, in the rows' own `/LABEL` grammar.
	 */
	readonly Index: readonly FooterLink[];
}

/** A translator that resolves one key with an English default. */
export type FooterTranslate = (
	Key: string,

	Options: { readonly defaultValue: string },
) => string;
