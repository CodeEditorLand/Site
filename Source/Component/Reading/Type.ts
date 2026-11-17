/**
 * Reading - the shapes the reading surface renders.
 *
 * A reading surface is a page whose subject is a document: the terms, the
 * privacy policy, the license, the contributing guide. The document already
 * exists and is not the card's to rewrite - what it lacks is the apparatus a
 * reader needs around it: the facts that date and scope it, an index into it,
 * and one measure to read it on.
 *
 * Two shapes, and neither is a document model. The clauses themselves stay
 * page markup, because a clause is verbatim legal text: moving it into data
 * would make every future edit a string edit inside a module, and the point of
 * this layer is that the text is never touched. What lives here is only the
 * apparatus - the index rows and the surface's prop surface.
 */

/**
 * One row of the clause index: the document's own heading, numbered by its
 * position in the document and linked by the id that heading already carries.
 *
 * `number` is a string, not a number, for the same reason `Stage.index` is:
 * `07` and `7` are different printings and the document decides which one it
 * wants. Nothing here sorts, derives or renumbers.
 */
export interface ReadingIndexItem {
	/** The clause's ordinal as printed, e.g. `01`, `26`. */
	number: string;

	/** The heading's own words, verbatim - an index never paraphrases. */
	label: string;

	/** The in-page target, including the leading `#`. */
	href: string;
}
