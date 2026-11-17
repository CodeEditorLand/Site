/**
 * Type - the shapes the Download page hands to its band bodies.
 *
 * The page has one job: a reader can tell whether they can install Land today,
 * and if not, exactly what they can do instead. Every shape here serves one of
 * those two questions - what is published (the manifest), what a build needs
 * (the requirements) and what is already released (the previous releases).
 *
 * Field names are lower camel case and every array is `readonly`, matching the
 * Record layer's own contract (`../../Record/Type.js`): a band body renders the
 * data it is handed and never sorts, splices or pushes it.
 */
import type { Band, LedgerRow } from "../../Record/Type.js";

/**
 * The i18n resolver the page hands to `Data.ts`.
 *
 * The data module may not import the i18n client (BRIDGE §2.2), so the resolver
 * travels as an argument. `GetI18n()` returns exactly this shape: one call, one
 * key, one `defaultValue`.
 */
export type Translate = (
	key: string,
	options?: { readonly defaultValue?: string },
) => string;

/** One status mark in the masthead strip, rendered as a `jelly-badge`. */
export interface Mark {
	/** The words inside the badge, printed verbatim. */
	readonly label: string;

	/** The `jelly-badge` variant attribute. */
	readonly variant: string;

	/** Fill token name, resolved to `var(--<fill>)` on the badge. */
	readonly fill: string;

	/** Label-ink token name, resolved to `var(--<ink>)` on the badge. */
	readonly ink: string;

	/** Dot-ink token name: a trailing status dot, when the mark carries one. */
	readonly dot?: string;

	/** A trailing logo, when the mark carries one instead of a dot. */
	readonly glyph?: { readonly src: string; readonly alt: string };
}

/** One row of the availability matrix: the platform, then one cell per column. */
export interface AvailabilityRow {
	readonly label: string;
	readonly cells: readonly string[];
}

/** One platform's requirements: the platform name and its ledger rows. */
export interface PlatformRequirements {
	readonly platform: string;
	readonly rows: readonly LedgerRow[];
}

/** One platform as the release manifest records it. */
export interface ManifestPlatform {
	readonly name: string;
	readonly channel: string;
	readonly arch: string;
	readonly signing: string;
	readonly size: string;
	readonly checksum: string;
	readonly status: string;

	/** Where the platform's builds are found today, when anywhere. */
	readonly downloadUrl?: string;

	/** The link's own words, printed verbatim. */
	readonly downloadLabel?: string;
}

/** One published release. The list is empty today; this is what will fill it. */
export interface Release {
	readonly version: string;
	readonly published: string;
	readonly platform: string;
	readonly change: string;
}

/** The page's five bands, already resolved to copy. */
export interface Bands {
	readonly Status: Band;
	readonly Requirements: Band;
	readonly Manifest: Band;
	readonly Previous: Band;
	readonly Transparency: Band;
}
