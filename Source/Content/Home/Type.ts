/**
 * The homepage bands, as data.
 *
 * The record anatomy the features and architecture bands print - a marker, a pair
 * of containment stamps, a route over its service line, a link, a status and four
 * key/value rows - is declared once here, and the other bands' cards declare only
 * the fields they carry.
 *
 * Nothing in this file is copy: the strings a band prints come from
 * `Locale/En/Home.json` through the translator, or from `Content/Record/*.ts`. A
 * field is optional exactly when the card does not print it.
 */

/** The server translator's shape: a key, a default, and the resolved string. */
export type HomeTranslate = (
	Key: string,

	Options: { readonly defaultValue: string },
) => string;

/**
 * One span of a stamp line: either a run of text in one ink, or a MARK.
 *
 * ─── WHY A MARK IS NOT TEXT ───────────────────────────────────────────────
 * A stamp used to spell its punctuation into the string - `"/"`, `": PUBLIC"`,
 * `" CHANNEL"` - and every space the line printed was therefore decided by
 * whoever typed the string. The site then printed the same colon on the key in
 * one card and on the value in another, and the same slash with a space in one
 * line and against the word in the next.
 *
 * So the punctuation is a segment of its own, named by its role. A mark prints
 * its glyph from the mark layer and takes its air from `--mark-gap`
 * (`Mark/_Punctuation.scss`) - a content author cannot pass a space, because
 * there is nowhere to put one. That is the whole point: the grammar's spacing
 * is not copy.
 *
 * `Ink` still applies: the colon takes its KEY's ink (it is the label's own
 * punctuation), so a caller that colours the key colours the colon with it.
 * `Tone` applies to the `square` only, and is the state vocabulary's tone.
 */
export type StampMarkKind =
	/** `:` - closes the key that precedes it. */
	| "colon"
	/** `/` - opens a route line. */
	| "slash"
	/** `/` - stands between two values in one field. */
	| "separator"
	/** `↳` - opens a proposition. */
	| "relation"
	/** The state square: the word it precedes is a state that was checked. */
	| "square";

/** A run of text in one ink. */
export interface StampTextSpan {
	readonly Text: string;

	readonly Ink?: string;
}

/** A mark, by role. It prints no text: the mark layer draws the glyph. */
export interface StampMarkSpan {
	readonly Mark: StampMarkKind;

	/** The ink the mark takes; the colon's is its key's. */
	readonly Ink?: string;

	/** A square's tone, from the state vocabulary. */
	readonly Tone?: "ink" | "specimen" | "quiet";
}

/** One span of a stamp line. */
export type StampSpan = StampTextSpan | StampMarkSpan;

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
 * One row of an element's working register.
 *
 * The same three fields a `RecordRow` carries, plus the two a register needs and
 * a card ledger does not: the qualifier printed under the value (the reason a
 * fact is `UNAVAILABLE`, the note under a manifest) and the destination the fact
 * names (the element's manual page). A register row is still one fact; it just
 * says where it came from.
 */
export interface RegisterRow extends RecordRow {
	readonly Note?: string;

	readonly Code?: boolean;

	readonly Href?: string;
}

/**
 * The record anatomy every card in the features and architecture bands prints.
 *
 * `Stamp` is the two containment lines (`〈NATIVE BACKEND〉`), `Route` is the
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

	/**
	 * How much of the element's working the card prints.
	 *
	 * `record` is the card as the wall prints it plus its six-fact
	 * register - the dense reading, which is right for eleven of the fifteen.
	 * `plate` adds the three-step trace, and it is reserved for the four
	 * elements a reader meets first (the host, the extension host, the service
	 * layer, the build). The wall is then a page with four annotated entries
	 * rather than fifteen equal cards, which is what a manual does with the
	 * entries that carry the argument.
	 */
	readonly Depth: "record" | "plate";

	/**
	 * The six facts the record's claim is checked against: form, language,
	 * boundary, dependencies, the manual page and the evidence the build holds.
	 * Same keys, same order, for every element - that is what makes them a
	 * register rather than six sentences.
	 */
	readonly Register: readonly RegisterRow[];

	/**
	 * The files the element's manual names, in the order it names them. Printed
	 * only by a `plate` card.
	 */
	readonly Trace: readonly TraceStep[];
}

/** One step of a record's trace: a path the manual names, and what it carries. */
export interface TraceStep {
	readonly Index: string;

	readonly Path: string;

	readonly Note: string;
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
 * with the technology it names lifted into a badge between them - which is why the
 * technology is a badge rather than part of either half, and why it is three
 * fields rather than one.
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

	/**
	 * Six `KEY: VALUE` rows, as segments - the same grammar the stamp lines
	 * print, so the colon and the `/` between two values take the mark layer's
	 * gap instead of a space typed into a string.
	 */
	readonly Manifest: readonly (readonly StampSpan[])[];
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

	/**
	 * The OS webview the platform's build runs in: `WKWEBVIEW`, `WEBVIEW2`,
	 * `WEBKITGTK`. It is the one runtime fact that differs between the three
	 * rows, and it is why the row is a manifest of a platform rather than a
	 * badge: the editor is the same binary in three different browsers.
	 */
	readonly Webview: string;

	/** The OS floor the site's own supported-OS strip prints for this platform. */
	readonly Minimum: string;

	/** The digest of the published artifact - `UNAVAILABLE` while none exists. */
	readonly Checksum: string;

	/** The toolchain a source build needs, from the Download page's own list. */
	readonly Toolchain: string;

	/**
	 * Why the version, size and checksum rows print `UNAVAILABLE`, stated once at
	 * the card's floor. A row that says `UNAVAILABLE` without a reason is a hole
	 * with a word in it; the note is the reason, and it is the same reason the
	 * Download page's release register gives for the same three fields.
	 */
	readonly Note: string;

	readonly Action: { readonly Label: string; readonly Href: string };

	readonly Status: RecordRow;
}
