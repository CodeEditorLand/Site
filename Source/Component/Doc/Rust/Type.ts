/**
 * Type - the shapes the Rust API surface renders.
 *
 * One crate, one row: the id the tab bar keys on, the label both the tab and the
 * row print, the rustdoc site the row and the iframe point at, and the one-line
 * description that says what the crate is.
 *
 * Field names are PascalCase, matching the documentation surface's other data
 * shapes (`Component/Doc/Type.ts`) - the legacy content layer and the Record
 * block layer are the two places that spell fields in lower camel case, and this
 * module belongs to neither.
 */
export interface RustCrate {
	/** The tab's key and the URL hash the page restores on load. */
	Id: string;

	/** The crate's name, printed in the row and on its tab. */
	Label: string;

	/** The generated rustdoc site. Opened in a new tab, or loaded in the frame. */
	Url: string;

	/** One line: what this crate is. */
	Description: string;
}
