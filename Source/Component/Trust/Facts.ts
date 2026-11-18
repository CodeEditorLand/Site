/**
 * Facts - the three facts a legal document must answer before its first clause,
 * and that no single document's own data carries: who maintains it, where to
 * ask for help, and where the source is.
 *
 * The legal pages already print the facts that date and scope *themselves*
 * (`EFFECTIVE`, `LAST UPDATED`, `APPLIES TO`, `LICENSE`) in their own data
 * modules. Those stay where they are. What none of them prints is the
 * institution behind the document - and the card's reading test is that a
 * reader finds the license, the maintainer and the support route in one screen.
 *
 * So this module carries the institutional rows once, and `ComposeFacts` folds
 * them under a document's own rows. Three rules:
 *
 * - **Nothing is invented.** `PlayForm, based in Sofia, Bulgaria, as steward of
 *   the Code Editor Land open-source project` is the sentence the Terms' own
 *   §01 prints; the repository URL is the one the License page links; the two
 *   support routes are routes the site already serves (`/Contact/Reach` is
 *   "Technical Support", `/Contact/Query` is "General Inquiry", `/Contact/Legal`
 *   is "Legal & Compliance" in the registry).
 * - **No document is contradicted.** A row whose key the document already
 *   carries is not added again - the document's own value wins, so the Terms'
 *   `LICENSE` row stays exactly as it was written. Privacy, which carries no
 *   license row of its own, gains the project's one license: the site is CC0,
 *   and a facts strip that answers a different question on each document is not
 *   a strip, it is four strips.
 * - **Order is reading order.** A document's own rows come first, because they
 *   are about the document; the institution follows, because it is about who
 *   stands behind it.
 */
import type { LedgerRow } from "../Record/Type.js";

/** The one license the project is under. */
const License: LedgerRow = {
	key: "LICENSE:",
	value: "Creative Commons CC0 1.0 Universal",
	note: "the core editor codebase",
};

/** Who stands behind the document, and where a reader goes next. */
export const TrustInstitution: readonly LedgerRow[] = [
	License,
	{
		key: "MAINTAINER:",
		value: "PlayForm",
		note: "Sofia, Bulgaria - steward of the Code Editor Land open-source project",
	},
	{
		key: "SUPPORT:",
		value: "/Contact/Reach, /Contact/Query",
		links: [
			{ text: "/CONTACT/REACH", href: "/Contact/Reach" },
			{ text: "/CONTACT/QUERY", href: "/Contact/Query" },
		],
	},
	{
		key: "LEGAL:",
		value: "/Contact/Legal",
		links: [{ text: "/CONTACT/LEGAL", href: "/Contact/Legal" }],
	},
	{
		key: "SOURCE:",
		value: "github.com/CodeEditorLand/Land",
		links: [
			{
				text: "github.com/CodeEditorLand/Land",
				href: "https://github.com/CodeEditorLand/Land",
				target: "blank",
			},
		],
	},
];

/**
 * A document's own rows, then the institutional rows it does not already carry.
 *
 * Deduplication is by key, case-insensitively: the data modules write their
 * keys in two registers (`Effective Date:` in the Terms, `APPLIES TO:` in
 * Privacy) and the stylesheet uppercases both, so the comparison has to be the
 * one the reader sees.
 */
export const ComposeFacts = (
	rows: readonly LedgerRow[],
): readonly LedgerRow[] => {
	const Present = new Set(rows.map((Row) => Row.key.trim().toUpperCase()));

	return [
		...rows,
		...TrustInstitution.filter(
			(Row) => !Present.has(Row.key.trim().toUpperCase()),
		),
	];
};

export default ComposeFacts;
