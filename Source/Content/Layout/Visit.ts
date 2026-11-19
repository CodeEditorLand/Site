/**
 * Visit - the tombstone the catch-all route prints when it cannot send the
 * reader on.
 *
 * `/Visit` is not a page. It is the address Cloudflare's `_redirects` serves for
 * every path the build emits no file for, and its job is to resolve the reader's
 * original path and replace it in one frame. That job is why the route carries no
 * stylesheet, no Base layout and no React island: every byte is latency.
 *
 * So the route prints one thing when its script does not run. A reader whose
 * browser blocks it, or whose path resolves to nothing at all, would otherwise
 * meet a blank creme field and a three-second meta refresh to the homepage - a
 * dead end dressed as a redirect. This module is the record that arm prints: the
 * missing-state composition, in the grammar, inside `<noscript>` so it costs
 * nothing when the script runs and states the truth when it does not.
 *
 * ─── WHY PLAIN DATA, NOT A TRANSLATOR ─────────────────────────────────────
 * The route is deliberately outside `Library/I18n`: importing the server
 * translator there would pull i18next and five locale sets into the one page on
 * the site that exists to be as small as possible. The strings are therefore
 * resolved at build time and exported as data, which is also why they are
 * English - the same as every other string this route emits (`<title>`,
 * the meta description, the redirect targets).
 *
 * ─── THE RULES THE COPY KEEPS ─────────────────────────────────────────────
 * - It states the state (`UNAVAILABLE`), never an apology.
 * - It prints the three facts the route actually holds: the path asked for, that
 *   it resolves to nothing, and that the build emits no signal for it. A 404 that
 *   says "oops" has told the reader how to feel instead of what is true.
 * - It offers one way forward - the index, which is the only page that can name
 *   every address the build does emit - and one way back.
 */

/** The tombstone's copy and its two destinations. */
export interface VisitTombstone {
	/** `# VISIT / 00` - the register head. */
	readonly index: string;

	/** The route the record is filed under, printed after the `/`. */
	readonly route: string;

	/** The state word, from the fixed eight-word vocabulary. */
	readonly state: string;

	/** `WOULD BE HERE:` - what this address would have printed. */
	readonly statement: string;

	/** `WHY NOT:` - why it is not here. */
	readonly cause: string;

	/** `NEXT:` - the index, which names every address the build emits. */
	readonly next: { readonly label: string; readonly href: string };

	/** `BACK:` - the field itself. */
	readonly back: { readonly label: string; readonly href: string };

	/** The provenance line under the rows. */
	readonly note: string;

	/** The three rows the route can answer. */
	readonly rows: readonly { readonly key: string; readonly value: string }[];
}

/** The field-record separator: U+2001, never U+00B7. */
const Quad = "\u2001";

/** The tombstone, as data. */
export const VisitTombstone: VisitTombstone = {
	index: "# VISIT / 00",

	route: "/UNRESOLVED",

	state: "UNAVAILABLE",

	statement:
		"No record is filed at this address. The site answers every unresolved path here and sends the reader on.",

	cause: "The address is well formed; the build emits no route for it and the redirect table carries no entry. A moved page would have left a redirect, and a renamed one a tombstone.",

	next: { label: "OPEN THE INDEX", href: "/Contents" },

	back: { label: "BACK TO LAND", href: "/" },

	note: `SOURCE: _REDIRECTS${Quad}EVERY PATH WITHOUT A STATIC FILE IS SERVED THIS PAGE`,

	rows: [
		{ key: "WAS:", value: "THE PATH IN THE ADDRESS BAR" },

		{ key: "TARGET:", value: "UNRESOLVED" },

		{ key: "SIGNAL:", value: "ABSENT" },
	],
};
