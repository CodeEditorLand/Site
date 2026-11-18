/**
 * The palette's register - what a reader can find, in the shape the control
 * prints it.
 *
 * Five kinds, and the distinction is the row's mark and meta cell:
 *
 *   route   `/`  a part of the document (the ten the frame indexes)
 *   page    `/`  a leaf of the manual, filed under its section
 *   record  `/`  a `# NAME_NN` head the tree prints, and the page that prints it
 *   term    `/`  a word from the lexicon, and the run it is filed under
 *   action  `→`  something the palette does rather than somewhere it goes
 *
 * A page carries its `Section` because the meta cell prints it: a row that says
 * only "Filesystem Footprint" makes the reader guess whether it is the page they
 * mean. The section is the disambiguator, and it is also what the filter matches
 * against - a reader who types "telemetry" finds the pages filed under Telemetry
 * without knowing their titles.
 *
 * ─── WHY RECORDS AND TERMS ARE ROWS AND NOT SEARCH ────────────────────────
 *
 * The site prints 39 record heads and ~40 defined words, and until this register
 * existed neither was reachable from the one control a reader opens to look
 * something up. Both are `/` destinations - a record is a page, a term is an
 * anchor - so both obey the palette's one law: every row goes somewhere, no row
 * is a snippet.
 */

export type PaletteKind = "route" | "page" | "record" | "term" | "action";

export interface PaletteEntry {
	/** Stable and unique. It is the row's cmdk value and its React key. */
	Id: string;

	/** The row's words, as the site prints them. */
	Label: string;

	/** Where the row goes. Absent on an action. */
	Href?: string;

	/** What the filter matches besides the label - a section, a run, a route. */
	Section?: string;

	/** The part's series index (`03`), for a route. */
	Part?: string;

	/** The meta cell, printed verbatim when the row needs more than one word. */
	Meta?: string;

	Kind: PaletteKind;
}

/** One register of the palette: a heading and the rows under it. */
export interface PaletteRegisterGroup {
	Id: string;
	Label: string;
	Pages: PaletteEntry[];
}

export interface PaletteRegister {
	/** The document's ten parts, plus the manual's one route that is not a leaf. */
	Routes: PaletteEntry[];

	/** The `# NAME_NN` heads the tree prints, each with the page that prints it. */
	Records: PaletteEntry[];

	/** The lexicon's words, each anchored where its definition is. */
	Terms: PaletteEntry[];

	/** The manual, one group per section - the same tree the rail renders. */
	Doc: PaletteRegisterGroup[];

	/** What the palette does. */
	Actions: PaletteEntry[];
}

/** The three scopes the segmented control offers. */
export type PaletteScope = "all" | "doc" | "site";
