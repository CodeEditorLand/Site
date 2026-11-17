/**
 * Type - the shapes the homepage hero band hands to its own anatomy.
 *
 * The hero is one band and it says four things in this order: the claim, the
 * status, the evidence and the entry. All four are data here, so the component
 * maps rows and writes no copy: `Data.ts` builds this object from the i18n
 * resolver the page passes in (BRIDGE §2.2), and `DynamicHeroSection` renders
 * it.
 *
 * Field names are lower camel case and every array is `readonly`, matching the
 * Record layer's contract (`../../Record/Type.js`): a band body renders the
 * data it is handed and never sorts, splices or pushes it.
 */

/**
 * The i18n resolver the band is handed.
 *
 * The data module may not import the i18n client (BRIDGE §2.2), so the resolver
 * travels as an argument: one call, one key, one `defaultValue`, always.
 *
 * `options` is required rather than optional on purpose. i18next's `TFunction`
 * accepts either `(key, defaultValue)` or `(key, options)` and never
 * `(key, undefined)`, so a resolver whose options are optional is not
 * assignable from the `t` a `useTranslation()` call returns - the page would
 * need an adapter at every call site to satisfy a type it already satisfies.
 * Every key this band reads has an English default, so requiring the options
 * object costs nothing and makes `HeroBandFor(T)` typecheck as written.
 */
export type Translate = (
	key: string,
	options: { readonly defaultValue: string },
) => string;

/** The claim: the record's marker and the runtime assertion under it. */
export interface Claim {
	/** The record's own marker, printed verbatim: `# LAND_01`. */
	readonly kicker: string;

	/** The runtime assertion - half of the band's one display line. */
	readonly runtime: string;

	/** What the runtime is not - the other half of the same line. */
	readonly engine: string;

	/** The compatibility route, in the site's `/KEY:VALUE` grammar. */
	readonly route: string;

	/** What that compatibility means in practice. */
	readonly compat: string;

	/**
	 * The project's own label, printed verbatim: `LAND:`. The record names
	 * itself twice - `# LAND_01` is its index in the set, `LAND:` is the
	 * subject the index points at.
	 */
	readonly project: string;

	/** The record's relation to the product, one label long. */
	readonly relation: string;

	/** The standfirst: one sentence, at most two lines. */
	readonly standfirst: string;
}

/** The status: what is true today, at meta weight, never shouted. */
export interface Status {
	/**
	 * The whole status line, e.g. `STATUS: SOURCE ACTIVE`. The component splits
	 * it so `STATUS:` and its value keep their own inks - the value is the one
	 * green thing in the row.
	 */
	readonly copy: string;

	/** The honest qualifiers beside it: installers, extension coverage. */
	readonly chips: readonly string[];
}

/** One step of the evidence rail. */
export interface Step {
	/** The rail number, as written: `01`-prefixed. */
	readonly index: string;

	/** The step's name - an element of the runtime. */
	readonly label: string;

	/** One line. A step that needs a paragraph is not a step. */
	readonly line: string;
}

/** One key/value fact of the record. */
export interface Fact {
	/** Mono key, e.g. `TARGET`, `LICENSE`, `SIGNAL`. */
	readonly key: string;

	/** Ink value, printed verbatim. */
	readonly value: string;
}

/** The evidence plate: what was observed, and the file it came out of. */
export interface Plate {
	readonly src: string;

	/** Required: an uncaptioned image is decoration, not evidence. */
	readonly alt: string;

	/** What the plate shows, at caption weight. */
	readonly caption: string;

	/** The file it came from, at meta weight. */
	readonly provenance: string;
}

/** One destination the band opens. */
export interface Entry {
	/** The `/LABEL` form the site's actions use. */
	readonly label: string;

	readonly href: string;

	/**
	 * This is the page's primary action, so a page that sets its own
	 * `Content.PrimaryCTA.Href` overrides this destination's href. Exactly one
	 * entry per band sets it.
	 */
	readonly primary?: boolean;
}

/** The hero band, in the order it is read. */
export interface HeroBand {
	readonly claim: Claim;

	readonly status: Status;

	readonly steps: readonly Step[];

	readonly facts: readonly Fact[];

	readonly plate: Plate;

	readonly entry: readonly Entry[];

	/** The program line closing the band: the verbs the product is for. */
	readonly program: string;
}
