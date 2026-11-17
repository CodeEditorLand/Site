/**
 * Type - the shapes the architecture record renders.
 *
 * The band's subject is the element set, and the set is read three ways: as
 * families (what part of the stack an element belongs to), as records (what the
 * element is, in one line) and as one lead record (the product the rest
 * compose). Each shape below carries exactly one of those readings.
 *
 * Field names are lower camel case and every array is `readonly`, matching the
 * Record layer's own contract (`../../Record/Type.js`): the band renders the
 * data it is handed and never sorts, splices or pushes it.
 */

/**
 * One family of elements: a label and the element names that belong to it, in
 * the order the band prints them. A family with no names is a heading with no
 * records under it, so the data never carries one.
 */
export interface Family {
	/** The family marker, printed verbatim - the `/RUNTIME` voice is the caller's. */
	readonly label: string;

	/** The element names in this family, in print order. */
	readonly names: readonly string[];
}

/**
 * One element as a record: the marker that identifies it, the glyph that marks
 * it, the role chips, and the one line that says what it does.
 *
 * `body` is the element's own description, quoted from `home:architecture.*` -
 * it is never summarised here, because the band's whole claim is that the
 * descriptions are the documentation, not an endorsement of it.
 */
export interface ElementEntry {
	/** `"# MOUNTAIN_01"`, taken from the element's record and printed verbatim. */
	readonly index: string;

	/** The element's name, as the content writes it. */
	readonly name: string;

	/** The element's own glyph - decorative, so the name stays the label. */
	readonly glyph: string;

	/** The role chips: what the element is, in the record's own words. */
	readonly chips: readonly string[];

	/** One line: what the element does. Quoted, never paraphrased. */
	readonly body: string;

	/** The element's documentation route, when the site publishes one. */
	readonly href?: string;

	/** The element's repository, when the record names one. */
	readonly source?: string;
}
