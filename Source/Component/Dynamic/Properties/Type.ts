/**
 * Type - the shape the six properties render as.
 *
 * A property is one record in a set: the marker that places it in the set, the
 * claim in its own words, and the one paragraph that says what the claim means.
 * There is no third shape here because there is no third reading - the band
 * exists to print the six claims and their paragraphs, nothing else.
 *
 * Every array the set travels in is `readonly`, matching the Record layer's
 * contract (`../../Record/Type.js`): the band renders what it is handed.
 */

/** One property: its marker, its claim, and the paragraph under it. */
export interface PropertyEntry {
	/** The marker, printed verbatim - `# 01`, the property's place in the set. */
	readonly index: string;

	/** The claim. This is the content's own title for the property. */
	readonly name: string;

	/** One paragraph: what the claim means, in the content's own words. */
	readonly body: string;
}
