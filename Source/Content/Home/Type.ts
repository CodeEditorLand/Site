/**
 * The homepage bands, as data.
 *
 * Every card in the five bands prints the same record anatomy - a marker, a
 * pair of containment stamps, a route over its service line, a link, a status
 * and four key/value rows - so the shape is declared once here and the bands
 * differ only in which fields they carry.
 *
 * Nothing in this file is copy that was authored here: the strings come from
 * `Locale/En/Home.json` through the translator, or from `Content/Record/*.ts`,
 * or from the pre-programme render the bands are being restored to. A field is
 * optional exactly when the baseline card did not print it.
 */

/** The server translator's shape: a key, a default, and the resolved string. */
export type HomeTranslate = (
	Key: string,
	Options: { readonly defaultValue: string },
) => string;

/**
 * One span of a stamp line. `Ink` is a CSS colour; absent means the line's own
 * muted ink. The baseline coloured a stamp's brackets, its keyword and its
 * value separately, so a line is a list of spans rather than a string.
 */
export interface StampSpan {
	readonly Text: string;
	readonly Ink?: string;
}

/** One line of a band's mono stamp under its heading. */
export interface StampLine {
	/** `FUNDING`, `PHASE`; absent for a bare line. */
	readonly Label?: string;
	/** The whole line when it carries no terms. */
	readonly Text?: string;
	/** The terms after the label, separated by ` / `. */
	readonly Terms?: readonly StampSpan[];
}

/** One band's opening block: its kicker, its heading, its line under it. */
export interface BandHead {
	/** The section id the baseline used, so an in-page anchor still lands. */
	readonly ID: string;
	readonly Kicker: string;
	readonly Heading: string;
	readonly Standfirst?: string;
	readonly Stamp?: readonly StampLine[];
}

/** The route row: `/ HOST :MOUNTAIN` - a key and the value it addresses. */
export interface RouteRow {
	readonly Key: string;
	readonly Value: string;
}

/** One key/value row of a card's ledger. */
export interface RecordRow {
	readonly Label: string;
	readonly Value: string;
}

/**
 * The record anatomy every card in the features and architecture bands prints.
 *
 * `Stamp` is the two containment lines (`〈 NATIVE BACKEND 〉`), `Route` is the
 * `/ KEY :VALUE` line above `Service`, and `Metadata` is the four-row ledger
 * that closes the card before its prose.
 */
export interface CardRecord {
	readonly Index: string;
	readonly Title: string;
	readonly Href?: string;
	/** The engraved seal's name, as `Content/Record/*.ts` files it. */
	readonly SealName: string;
	readonly Stamp: readonly string[];
	readonly Route: RouteRow;
	readonly Service: string;
	readonly Status: RecordRow;
	readonly Metadata: readonly RecordRow[];
}

/**
 * One element card of the architecture band.
 *
 * `Seal` says how the card's 36px mark is drawn: `figure` is the element's own
 * engraved seal, `symbol` is the single neutral character the record set uses
 * for the one element it draws as a symbol instead of a figure. `Span` is the
 * card's width in columns of the twelve-column masonry, which is what makes the
 * band a staggered wall rather than an even grid.
 */
export interface ElementCard extends CardRecord {
	readonly Glyph: string;
	readonly Seal: "figure" | "symbol";
	readonly Symbol: string;
	readonly Chips: readonly string[];
	readonly Body: string;
	readonly Source?: string;
	readonly Span: number;
}

/** One tile of the hero's tech-stack strip. */
export interface StackTile {
	readonly Name: string;
	/** The `lucide-react` glyph's name; the component resolves it. */
	readonly Icon: string;
	readonly Ink: string;
}

/**
 * One element row of a release card.
 *
 * `Before` and `After` are the two halves of the row's "replaces / uses" line,
 * with the technology it names lifted into a badge between them - which is how
 * the baseline printed that line, and why it is three fields rather than one.
 */
export interface ReleaseElement {
	readonly Name: string;
	readonly Role: string;
	readonly Before: string;
	readonly Badge?: string;
	readonly After: string;
	readonly Href: string;
	readonly Ink: string;
}

/** One release card of the roadmap band. */
export interface ReleaseCard {
	readonly Index: string;
	/** The mono stamp under the index, one entry per printed line. */
	readonly Stamp: readonly (readonly StampSpan[])[];
	readonly Action: { readonly Label: string; readonly Href: string };
	readonly Title: string;
	readonly Elements: readonly ReleaseElement[];
	readonly Manifest: readonly string[];
}

/** One platform card of the download band. */
export interface PlatformCard {
	readonly Index: string;
	readonly Name: string;
	readonly Ink: string;
	/** The `lucide-react` glyph's name; the card resolves it. */
	readonly Icon: string;
	readonly Architecture: string;
	readonly Channel: string;
	readonly Version: string;
	readonly Size: string;
	readonly Signing: string;
	readonly Action: { readonly Label: string; readonly Href: string };
	readonly Status: RecordRow;
}
