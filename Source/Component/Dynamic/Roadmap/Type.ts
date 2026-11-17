/**
 * Type - the shapes a release phase renders as.
 *
 * The band describes one offer in two states, so a phase is a record with a
 * marker, a name, a paragraph and a ledger of facts. There is no price field
 * here, and that absence is the decision this band makes: Land is CC0 and there
 * is nothing to buy, so a tier's `Price` is a grammar with no referent. What a
 * phase actually contains is a fact and travels as rows.
 *
 * Arrays are `readonly`, matching the Record layer's contract
 * (`../../Record/Type.js`): the band renders the data it is handed.
 */

/**
 * One ledger row of a phase.
 *
 * `href` is the one addition the published `LedgerRow` does not carry: an
 * element row's key is a link to that element's documentation page, and the
 * routes in `ElementDocPath` are real pages. The row renders with the ledger's
 * own classes; the link is inside the key cell.
 */
export interface PhaseRow {
	/** The mono key: an element name, or the capability's own label. */
	readonly key: string;

	/** The ink value: what the phase says about that key. */
	readonly value: string;

	/** A qualifier printed under the value at caption weight. */
	readonly note?: string;

	/** Where the key leads, when it leads to a page the site publishes. */
	readonly href?: string;
}

/** One phase of the offer: what it is called and what it contains. */
export interface Phase {
	/** `"# RELEASE_01"` - the phase's marker, printed verbatim. */
	readonly marker: string;

	/** The phase's name, as the content writes it: `ACTIVE NOW`, `V1.0`. */
	readonly name: string;

	/** The phase's own paragraph: what this state of the offer is. */
	readonly body?: string;

	/** The phase's standing, as short labelled facts: `PHASE: ACTIVE SOURCE`. */
	readonly facts: readonly string[];

	/** What the phase contains: element rows, then capability rows. */
	readonly rows: readonly PhaseRow[];

	/** Where the phase leads, when it leads anywhere. */
	readonly cta?: { readonly label: string; readonly href: string };
}
