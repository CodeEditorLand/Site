/**
 * Language - the four composition languages, and the register that files a route
 * under one of them.
 *
 * ─── WHY A LANGUAGE AND NOT A GRID ────────────────────────────────────────
 * One grid used everywhere reads as a template. The dossier has four kinds of
 * page and they are not four skins of one column:
 *
 *   READING    a document read top to bottom: one measure, a rail beside it,
 *              a margin for apparatus. The prose is the page.
 *   WORKSPACE  a place the reader operates: a rail of destinations, panes that
 *              hold the instrument, and a drawer when the pane is too wide.
 *   AUDIT      a claim being checked: a ledger column of the facts, the matrix
 *              they are read across, and wells for the things you can act on.
 *   PLATE      one artifact at full bleed with a caption channel beside it. The
 *              figure is the argument and the caption is its provenance.
 *
 * A language is a *contract*, not a class: it names the tracks a page gets, and
 * the things the page must hand the shell to get them. A page that hands in a
 * matrix and no ledger has not composed an audit - it has a table on a page.
 *
 * ─── HOW A PAGE DECLARES ONE ──────────────────────────────────────────────
 * A page declares its language by being filed here, and nowhere else. There is
 * no `layout:` frontmatter, no prop threaded through two files, and no page
 * that can disagree with the frame:
 *
 * - `Base.astro` reads this register and writes `data-layout` on `<html>`, so
 *   the running head can print the language beside the part (`# LAND /
 *   03␁DOCUMENTATION␁/␁READING`), at first paint, with JavaScript off.
 * - `PageShell.astro` reads the same register for its own `data-layout` and its
 *   grid, so the shell and the frame cannot drift.
 * - A page that composes a *second* language inside itself (a plate band in a
 *   reading page) passes `language` to the inner shell; the outer declaration is
 *   still the register's.
 *
 * The register is the one place to change a page's language, which is what makes
 * the answer to "what does a page have to declare" a single sentence: *its
 * route, filed under a language in this file*.
 *
 * ─── THE FIFTH ANSWER: ◎ RECORD ───────────────────────────────────────────
 * Not every page has a language, and pretending otherwise is the drift this file
 * exists to prevent. A credential card, the manual's index, the register wall,
 * the dispatch trampoline - these are one artifact, and a one-artifact page has
 * no tracks to distribute. They are filed as `record`, the declaration prints
 * `◎ RECORD` (U+25CE is the grammar's mark for a thing with no glyph), and the
 * page composes itself. An unfiled route also prints `◎ RECORD` rather than
 * guessing: a page that has not been filed is a page whose composition has not
 * been decided, and the frame says so.
 */

/** The four composition languages. `record` is the fifth answer - no language. */
export type LayoutLanguage = "reading" | "workspace" | "audit" | "plate";

/** What `LanguageOf` answers: a language, or `record` for a one-artifact page. */
export type LayoutAnswer = LayoutLanguage | "record";

/** One language, as the declaration strip and the shell both read it. */
export interface LayoutSpec {
	/** The key: `reading`, `workspace`, `audit`, `plate`. */
	readonly key: LayoutAnswer;

	/** The word the declaration strip prints, uppercase. */
	readonly name: string;

	/**
	 * The tracks the language gives a page, in reading order, separated by
	 * U+2001. This is what the declaration strip prints after `GIVES:` - the
	 * language's whole promise in three or four words.
	 */
	readonly gives: string;

	/** One sentence: what the language is for. Printed by `/Contents`. */
	readonly about: string;

	/**
	 * What the page must hand the shell. A page that hands in less than this is
	 * not composing the language - it is using the shell as a container.
	 */
	readonly declares: readonly string[];

	/**
	 * The measure the language reads at. `72ch` for reading, `none` for a
	 * workspace (a pane is as wide as the instrument in it), `matrix` for an
	 * audit, `plate + channel` for a plate.
	 */
	readonly measure: string;
}

/** The four languages and the fifth answer, keyed by their own word. */
export const Languages: Readonly<Record<LayoutAnswer, LayoutSpec>> = {
	reading: {
		key: "reading",

		name: "READING",

		gives: "RAIL\u2001MEASURE\u2001MARGIN",

		about: "A document read top to bottom: one measure, a rail beside it, and a margin for the apparatus that would otherwise interrupt the prose.",

		declares: [
			"a rail (the document's own contents, or the set it belongs to)",

			"a measure (72ch of prose, or `full` for a page that also carries grids)",

			"a margin (the notes, the facts, the aside) - or nothing, and then the measure takes the rail's side",
		],

		measure: "72CH",
	},

	workspace: {
		key: "workspace",

		name: "WORKSPACE",

		gives: "RAIL\u2001PANES\u2001DRAWER",

		about: "A place the reader operates: a rail of destinations, panes that hold the instrument, and a drawer when a pane is too wide for the container.",

		declares: [
			"a rail (the destinations this workspace holds)",

			"at least two panes, one of them the instrument the reader came to use",

			"a drawer for anything that does not fit the pane's own measure",
		],

		measure: "NONE",
	},

	audit: {
		key: "audit",

		name: "AUDIT",

		gives: "LEDGER\u2001MATRIX\u2001WELLS",

		about: "A claim being checked: a ledger column of the facts that scope it, the matrix those facts are read across, and wells for the commands that verify it.",

		declares: [
			"a ledger (what the audit is of, and where each fact comes from)",

			"a matrix (the comparison itself, one row per claim)",

			"a well (the command or token that makes the audit repeatable) - or the audit is a table, not a check",
		],

		measure: "MATRIX",
	},

	plate: {
		key: "plate",

		name: "PLATE",

		gives: "PLATE\u2001CHANNEL\u2001HEAD",

		about: "One artifact at full bleed with a caption channel beside it: the figure is the argument, the channel is its provenance, and the head is a record, not a poster.",

		declares: [
			"a plate (the one artifact the page is about)",

			"a caption channel (`FIGURE:`, `SOURCE:`, `STATE:`) - a plate without provenance is decoration",

			"a record head, so the page states what it is before it shows it",
		],

		measure: "PLATE + CHANNEL",
	},

	record: {
		key: "record",

		name: "RECORD",

		gives: "\u25ce",

		about: "One artifact and nothing else: a credential card, an index, a register wall, a dispatch trampoline. These pages have no tracks to distribute, and a language imposed on them would be a skin.",

		declares: ["nothing - the page composes itself"],

		measure: "NONE",
	},
};

/**
 * The register: which route is composed in which language.
 *
 * A prefix (ending in `*`) files every route under it. Order matters only in
 * that the first match wins, so the specific paths come before their prefixes -
 * `/Contact/Sale` before `/Contact/*`, `/Doc/Rust` before `/Doc/*`.
 *
 * Every entry is a claim about how the page is built, so the list is kept short
 * and true: a route is filed here when its composition has the language's
 * tracks, not when the language would suit it.
 */
export const RouteRegister: readonly (readonly [string, LayoutAnswer])[] = [
	// ─── PLATE ───────────────────────────────────────────────────────────
	// The opening spread is a plate: the keeper pair at full bleed, the trace
	// foot under both panels, and the legend as its channel. The two pages this
	// card puts on the language are the 404 and the OAuth callback - each is one
	// artifact, and each had no caption for it.
	["/", "plate"],

	["/404", "plate"],

	["/OAuth/Success", "plate"],

	// ─── READING ─────────────────────────────────────────────────────────
	// The back matter and the manual were the reading pages before this card.
	// The two pages that join them are the sale letter (prose that was printed
	// as a card split) and the article's margin channel, which is a reading
	// composition with its apparatus in the margin.
	["/License", "reading"],

	["/Contributing", "reading"],

	["/Legal/Term", "reading"],

	["/Legal/Privacy", "reading"],

	["/Contact/Sale", "reading"],

	["/Doc/Rust", "workspace"],

	["/Doc/*", "reading"],

	["/Blog/*", "reading"],

	// ─── THE THREE REFERENCE SURFACES ────────────────────────────────────
	// The glossary joins the reading pages: a lexicon is a document read top to
	// bottom, with the runs in its rail and the apparatus in its margin - the
	// only page on the site whose measure is a definition column rather than
	// prose. Filed here rather than under `record` because it does hand the
	// shell three tracks, and a page that gives up its rail would give up the
	// only navigation a forty-term reference has.
	["/Glossary", "reading"],

	// The motion register is the second reference page in this language, and it
	// is filed here for the same reason: a rail of the page's own registers, a
	// measure of specimens, and an apparatus column that carries the intervals
	// and the curves. It is not an audit - nothing on it is being checked - and
	// not a plate: there is no single artifact, there are thirteen.
	["/Motion", "reading"],

	// ─── WORKSPACE ───────────────────────────────────────────────────────
	// The dashboard was the workspace before this card. The account surface and
	// the request routes join it: both are places the reader operates, and both
	// had their destinations scattered instead of railed.
	["/Dashboard", "workspace"],

	["/Account", "workspace"],

	["/Contact/*", "workspace"],

	// The comparison is a workspace: a reader operates it. The rail is the
	// citations, the two panes are the substitution beside what carries over,
	// and the drawer is the check. It is not an audit - an audit is a claim
	// checked against a matrix, and this page's whole point is that the matrix
	// cannot check itself.
	["/Compare", "workspace"],

	// ─── AUDIT ───────────────────────────────────────────────────────────
	// The download record and the index were audits before this card. The
	// verification route and the portal join them: one checks a token against
	// four claims, the other checks four tiers against the same feature set.
	["/Download", "audit"],

	["/Contents", "audit"],

	["/Verify", "audit"],

	["/Portal", "audit"],

	// The status board is the audit the whole document needs: a ledger of the
	// facts that scope it, a matrix of every record's state, and the well that
	// re-reads it. It is the only route on the site whose matrix is partitioned
	// by column rather than read across one row set.
	["/Status", "audit"],

	// ─── ◎ RECORD ────────────────────────────────────────────────────────
	// One artifact, no tracks: the manual's index (a card grid), the blog index
	// (a card grid), the contact register wall, the dispatch trampoline, and the
	// four credential cards.
	["/Doc", "record"],

	["/Blog", "record"],

	["/Contact", "record"],

	["/Visit", "record"],

	// The specimen sheet is one artifact in the sense that matters: it has no
	// rail, no measure and no margin - the sheet at its head *is* its index, and
	// its bands are plates. Filing it under a language would impose the tracks
	// the page deliberately does not have.
	["/Specimen", "record"],

	["/Account/SignIn", "record"],

	["/Account/SignUp", "record"],

	["/Account/ForgotPassword", "record"],

	["/Account/ResetPassword", "record"],
];

/** The route as the register stores it: no trailing slash, `/` stays `/`. */
const Normalise = (Path: string): string =>
	Path === "/" ? "/" : Path.replace(/\/+$/, "");

/**
 * The language a route is composed in.
 *
 * An unfiled route answers `record` - not a guess and not an error. The
 * declaration strip then prints `◎ RECORD`, which is the grammar saying what is
 * true: this page has no tracks, or nobody has decided its composition yet.
 */
export const LanguageOf = (Path: string): LayoutSpec => {
	const Normal = Normalise(Path);

	for (const [Pattern, Key] of RouteRegister) {
		if (Pattern.endsWith("*")) {
			const Prefix = Pattern.slice(0, -1);

			if (
				Normal === Prefix.replace(/\/$/, "") ||
				Normal.startsWith(Prefix)
			) {
				return Languages[Key];
			}

			continue;
		}

		if (Normal === Pattern) return Languages[Key];
	}

	return Languages.record;
};

/** Whether a route is filed under a language rather than falling back. */
export const IsFiled = (Path: string): boolean => {
	const Normal = Normalise(Path);

	return RouteRegister.some(([Pattern, Key]) =>
		Key === "record"
			? false
			: Pattern.endsWith("*")
				? Normal.startsWith(Pattern.slice(0, -1))
				: Normal === Pattern,
	);
};

/** How many routes the register files under one language. */
export const CountOf = (Key: LayoutAnswer): number =>
	RouteRegister.filter(([, Entry]) => Entry === Key).length;

/**
 * The declaration strip's one string: `# LAYOUT / READING`.
 *
 * The `#` is the grammar's series marker and it is printed by the shell, so a
 * page that reads the strip can copy it into a note and it means the same thing
 * everywhere.
 */
export const Declaration = (Spec: LayoutSpec): string =>
	`# LAYOUT / ${Spec.name}`;

/**
 * What a page gets by declaring a language, as one printable line per track.
 * `/Contents` prints these under the language's row; a page prints the first
 * line in its declaration strip.
 */
export const Tracks = (Spec: LayoutSpec): readonly string[] =>
	Spec.gives.split("\u2001");
