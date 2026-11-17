/**
 * Type - the shape the platform matrix renders as.
 *
 * One row is one platform, and it carries two different kinds of thing: the
 * platform's own name and package format, and one mark per column for what is
 * actually published for it today. The note is the platform's own description
 * from the content (`Universal Binary: Apple Silicon and Intel`, `64-bit (x64)`,
 * `DEB, RPM, AppImage`), which is the fact that makes the three rows differ -
 * without it three platforms with the same three marks would say nothing.
 *
 * Arrays are `readonly`, matching the Record layer's contract
 * (`../../Record/Type.js`): the band renders the data it is handed.
 */

/** One platform row: its label, its package format, and one mark per column. */
export interface PlatformRow {
	/** The platform's name, as the content writes it. */
	readonly label: string;

	/** The platform's package format, printed under the name at caption weight. */
	readonly note?: string;

	/** One mark per column, in the order the columns are given. */
	readonly cells: readonly string[];
}
