/**
 * Type - the shape a property renders as, and the shape the proof band splits
 * it into.
 *
 * A property is one record in a set: the marker that places it in the set, the
 * claim in its own words, and the one paragraph that says what the claim means.
 * `href` is where the property is argued at length when the band files it
 * instead of claiming it - absent when no page makes that argument.
 *
 * Every array the set travels in is `readonly`, matching the Record layer's
 * contract (`../../Record/Type.js`): the band renders what it is handed.
 */

/** One property: its marker, its claim, and the paragraph under it. */
export interface PropertyEntry {
	/** The marker, printed verbatim - `# 01`, the property's place in the set. */
	readonly index: string;

	/** The content's own identifier for the property. Never printed. */
	readonly id: string;

	/** The claim. This is the content's own title for the property. */
	readonly name: string;

	/** One paragraph: what the claim means, in the content's own words. */
	readonly body: string;

	/** Where the property is argued at length, when the band files it. */
	readonly href?: string;
}
