/**
 * Type - the Contact surface's own shapes.
 *
 * One shape lives here: the route record a Contact page prints above its body.
 * It is not `RequestConfig` - the registry carries the whole request (fields,
 * payload, endpoints, preambles) and a page needs four facts out of it - and it
 * is not a `LedgerRow`, because a record head is one line in the record grammar
 * (`# CODE`, `〈BASIS〉`, `/ROUTE`, `SLA: 30d`), not a key/value ledger.
 */

/**
 * One Contact route's record head.
 *
 * The four cells are the route's facts, and they are the page's rather than the
 * form's: the code and the statutory basis are the same on every visit, and the
 * window is the promise the route makes. What changes per visit - the pair
 * reference and the state word - stays in the form, so one screen never prints
 * the same fact twice.
 *
 * Every cell but `code` and `route` is optional, and an absent cell prints
 * nothing at all: a request with no statutory basis gets no `〈 〉` bracket,
 * because an empty bracket is a claim the page cannot back.
 */
export interface ContactRecord {
	/** The route's income code, printed as `# CODE`. */
	code: string;

	/** The statutory basis, printed inside `〈 〉`. Absent, no bracket. */
	article?: string;

	/** The route the record is filed under: `/CONTACT` on a request, `/INDEX` on the hub. */
	route: string;

	/** The response window in days, printed as `SLA: 30d`. Absent, no window. */
	window?: number;

	/**
	 * How many records the page registers, printed as `REGISTER: 14 ENTRIES`.
	 * The hub's count, and nothing else's - a request route registers one thing.
	 */
	count?: number;
}
