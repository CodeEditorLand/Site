/**
 * States - the nine adverse states, as this sheet's own specimens.
 *
 * ─── A STATE IS NOT A PLACEHOLDER ─────────────────────────────────────────
 * `Design-Brief.md` §7 asks every surface for its second design, and this page
 * is the one page whose subject *is* that second design. So the band prints all
 * nine: empty, loading, partial, error, stale, too much, too long, missing and
 * denied - each composed in the same grammar as the rest of the document, each
 * with the word from the fixed eight that states it, and each naming the
 * surface where the condition actually happens. A specimen of a state that no
 * page reaches would be an illustration; this band is a register.
 *
 * ─── WHY THE COPY NAMES A ROUTE ───────────────────────────────────────────
 * `occursAt` is not decoration. An adverse state is a claim that the world can
 * be unkind in a particular way, and a claim with no instance is the kind of
 * sentence this document does not print. Every arm below is a condition some
 * page on this site is built to survive - the empty archive, the session being
 * read, the digest nobody has published, the failure register on the callback,
 * the one dated figure, the route archive, the longest title in the collection,
 * a note whose manual page is gone, and the profile island before sign-in.
 *
 * ─── THE FIGURES ARE PASSED IN ────────────────────────────────────────────
 * `States()` takes the few values that can only be read from the tree at build
 * time - the longest filed title, the one dated measurement, how many routes
 * the index files - so this module holds the copy and the page holds the
 * measurement. A number written here would be the one thing this document may
 * not contain: a figure with no source.
 */

/**
 * The nine conditions. This union mirrors `Component/Shell/ShellState.astro`'s
 * own `AdverseKind`; a type cannot be imported from an `.astro` file, so the two
 * are kept in step by hand and the band fails loudly at the type check if one
 * moves.
 */
export type StateKind =
	| "empty"
	| "loading"
	| "partial"
	| "error"
	| "stale"
	| "too-much"
	| "too-long"
	| "missing"
	| "denied";

/** One fact the arm prints under its rows. */
export interface StateFact {
	readonly key: string;

	readonly value: string;

	readonly code?: boolean;
}

/** One composed state, in the shape `ShellState` renders. */
export interface StateCell {
	/** Which condition this is. */
	readonly kind: StateKind;

	/** `# EMPTY / 01` - the register head. */
	readonly index: string;

	/** The one sentence the arm is about. */
	readonly statement: string;

	/** Why it is so. */
	readonly cause?: string;

	/** The way forward. A link, never a disabled control. */
	readonly next?: {
		readonly label: string;

		readonly href: string;
	};

	/** The facts the arm can state. */
	readonly rows?: readonly StateFact[];

	/** `too-much`: how many are shown, and how many exist. */
	readonly shown?: number;

	/** `too-much`: the size of the whole set. */
	readonly total?: number;

	/** `too-long`: the value as it stands. */
	readonly value?: string;

	/** `too-long`: the measure it cannot fit. */
	readonly limit?: string;

	/** `stale`: the date the reading was taken. */
	readonly asOf?: string;

	/** `stale`: how old that is, in words. */
	readonly age?: string;

	/** `loading`: the keys being read, in the order the record prints them. */
	readonly keys?: readonly string[];

	/** Where the condition happens, and what measured it. */
	readonly note: string;
}

/** The measurements only the page can take. */
export interface StateContext {
	/** The longest title filed in the blog collection, verbatim. */
	readonly LongestTitle: string;

	/** The one dated measurement on `/Compare`, as `YYYY-MM-DD`. */
	readonly AsOf: string;

	/** How old that reading is, in words: `182 DAYS`. */
	readonly Age: string;

	/** How many routes the index files. */
	readonly RouteCount: number;
}

/**
 * The nine arms, in the brief's own order.
 *
 * The order is the brief's and not the alphabet's: a reader meets the states in
 * the sequence the document describes them, so the band and `Design-Brief.md`
 * §7 can be read side by side.
 */
export const States = (Context: StateContext): readonly StateCell[] => [
	{
		kind: "empty",

		index: "EMPTY / 01",

		statement:
			"A set with nothing in it yet: the archive before its first entry, a rail with no rows, a release page with no artifact.",

		cause: "The arm says what would be here, why it is not, and where to read instead. It never prints a zero - a zero is a measurement, and nothing here has been measured.",

		next: { label: "READ THE ARCHIVE", href: "/Blog" },

		note: "OCCURS AT: /BLOG\u2001WHEN THE COLLECTION IS EMPTY",
	},

	{
		kind: "loading",

		index: "LOADING / 02",

		statement:
			"The keys are known before the values are: the record's own field names, printed at the label register with their values barred.",

		cause: "No spinner. A spinner says that something is happening; a skeleton says what - and the schema of a record is known the moment the record is asked for.",

		keys: ["SESSION:", "ROUTE:", "PROFILE:"],

		note: "OCCURS AT: /ACCOUNT\u2001WHILE THE SESSION IS READ",
	},

	{
		kind: "partial",

		index: "PARTIAL / 03",

		statement:
			"Some facts unknown. The figure that could not be counted prints UNAVAILABLE, and the ones that could print their values beside it.",

		cause: "UNAVAILABLE is the truth about not having a measurement. A zero would claim the number is nought, and a blank cell would claim the field does not exist.",

		next: { label: "READ THE RELEASE RECORD", href: "/Download" },

		rows: [
			{ key: "KNOWN:", value: "PLATFORMS\u20013" },

			{ key: "UNAVAILABLE:", value: "VERSION, SIZE, DIGEST" },
		],

		note: "OCCURS AT: /DOWNLOAD\u2001NO ARTIFACT IS PUBLISHED",
	},

	{
		kind: "error",

		index: "ERROR / 04",

		statement:
			"An action failed. The page states it in the vocabulary's word for an interruption, names the cause, and offers the one way to try again.",

		cause: "INTERRUPTED is ink, not quiet: a failure stated in a hushed tone is a failure the design is apologising for. The retry is a link, because a disabled button is not a way forward.",

		next: { label: "READ THE FAILURE REGISTER", href: "/OAuth/Success" },

		note: "OCCURS AT: /OAUTH/SUCCESS\u2001FOUR ARMS, FOUR CAUSES",
	},

	{
		kind: "stale",

		index: "STALE / 05",

		statement:
			"A reading older than its as-of. The last known value stays visible, and the age prints beside it.",

		cause: "A figure with no date is a figure from an unknown year. The date is part of the figure, and hiding an old number is worse than printing an old number.",

		next: { label: "READ THE MEASUREMENTS", href: "/Compare" },

		asOf: Context.AsOf,

		age: Context.Age,

		note: "OCCURS AT: /COMPARE\u2001THE ONE DATED ROW",
	},

	{
		kind: "too-much",

		index: "TOO MUCH / 06",

		statement:
			"A set that outgrew the shape it was drawn for. The register prints how many it holds, and the band still holds them.",

		cause: "A list of two hundred is not a layout problem to hide: it is a number to print. The count goes in the register line, and the band keeps its rhythm rather than its assumed length.",

		next: { label: "READ THE ROUTE ARCHIVE", href: "/Contents" },

		rows: [
			{ key: "SET:", value: `${Context.RouteCount} ROUTES` },

			{ key: "DRAWN FOR:", value: "12" },

			{ key: "CROP:", value: "NONE - THE BAND HOLDS" },
		],

		note: "OCCURS AT: /CONTENTS\u2001THE WHOLE TREE IN ONE ARCHIVE",
	},

	{
		kind: "too-long",

		index: "TOO LONG / 07",

		statement:
			"A value that will not fit the measure. It prints clipped, states how long it really is, and offers the whole of itself on hover and in the document.",

		cause: "The layout must not break for a title, and the title must not be silently shortened into a different title. Both facts print.",

		value: Context.LongestTitle,

		limit: "72CH",

		note: "OCCURS AT: /BLOG\u2001THE LONGEST TITLE IN THE COLLECTION",
	},

	{
		kind: "missing",

		index: "MISSING / 08",

		statement:
			"A record whose target is gone. The tombstone stands where the link was, and it says what the target was.",

		cause: "A dead link is a promise the document cannot keep. The tombstone is not an apology: it is the record of a destination that used to exist, printed where a reader would have clicked.",

		next: { label: "READ THE MANUAL", href: "/Doc" },

		note: "OCCURS AT: /BLOG/<SLUG>\u2001A NOTE WHOSE MANUAL PAGE IS GONE",
	},

	{
		kind: "denied",

		index: "DENIED / 09",

		statement:
			"A surface the reader may not see. It says what the surface is, not only that the session is not allowed to open it.",

		cause: "Denied is a condition of the reader's session, not of the record: the record exists, the session does not. A page that printed only the refusal would be describing the reader rather than the document.",

		next: { label: "SIGN IN", href: "/Account/SignIn" },

		note: "OCCURS AT: /ACCOUNT\u2001THE PROFILE ISLAND BEFORE SIGN-IN",
	},
];

/**
 * The vocabulary as the band's legend: one chip per word, in the register's
 * order.
 *
 * `SurfaceChips` reads a plain `string[]` and looks the tone up in
 * `Surface/State.ts`, so the legend cannot claim a tone the register does not
 * give the word. `PLANNED` is deliberately not here - it is a declaration, not
 * a state, and the register's eight are the whole of the vocabulary.
 */
export const Vocabulary: readonly string[] = [
	"READY",

	"ACTIVE",

	"LOADING",

	"PREPARING",

	"VERIFIED",

	"UNAVAILABLE",

	"INTERRUPTED",

	"ARCHIVED",
];
