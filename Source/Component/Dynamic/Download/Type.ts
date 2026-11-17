/**
 * Type - the shapes the Download page hands to its record and its sections.
 *
 * The page has one job: a reader can tell whether they can install Land today,
 * and if not, exactly what they can do instead. Every shape here serves that
 * question - the release manifest (what RELEASE_01 publishes, per platform),
 * the requirements (what a build needs) and the previous releases (what has
 * already shipped).
 *
 * The manifest is the page's opening artifact, so its field set is the
 * document's, not the tree's: `DesignSystem-Pages.md` §2 resolves the two
 * source variants into one canonical record - `# RELEASE_01`, the
 * `〈PLATFORM / ARCH〉` stamp, `/CHANNEL`, then VERSION, SIGNATURE, CHECKSUM,
 * SIZE and BUILD, then the action, then the status line. `Artifacts.md` §4 adds
 * LICENSE to the same block. Every field is declared here even where the value
 * is unavailable, because a field the record omits cannot be told apart from a
 * field nobody thought of.
 *
 * Field names are lower camel case and every array is `readonly`, matching the
 * Record layer's own contract (`../../Record/Type.js`): a component renders the
 * data it is handed and never sorts, splices or pushes it.
 */
import type { LedgerRow } from "../../Record/Type.js";

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

/**
 * The state arm `FieldRecordStatus` switches on, and the tone it paints.
 *
 * Both are declared here rather than imported from the status block so a page
 * module does not depend on a Brand component's file layout; the literals are
 * the block's own closed sets, so they still type-check against it.
 */
export type ManifestStatus = "active" | "preparing" | "unavailable";

export type ManifestTone = "ink" | "specimen" | "quiet";

/**
 * One status line: the words, the block's state arm, its tone, and the
 * plain-language explanation `DesignSystem-Components.md` §7 requires beside
 * every coded label.
 */
export interface ManifestState {
	/** The printed line, already in §7's vocabulary: `STATUS: SOURCE ACTIVE`. */
	readonly copy: string;

	/** The status block's state arm. */
	readonly status: ManifestStatus;

	/** The status block's tone: `specimen` for ACTIVE, `quiet` for PREPARING. */
	readonly tone: ManifestTone;

	/** What the state means in one sentence, for a reader who does not code. */
	readonly note: string;
}

/**
 * The record's own copy: its index, its claim, its state and its two closing
 * provenance lines.
 */
export interface ManifestRecord {
	/** The record's marker without its `#` - `FieldRecordIndex` prints that. */
	readonly index: string;

	/** The record's claim. The page's only `h2` inside the record. */
	readonly heading: string;

	/** The record's own state line. */
	readonly state: ManifestState;

	/** What the record carries and what it does not. */
	readonly footnote: string;

	/** Where every figure in the record comes from. */
	readonly source: string;
}

/** One platform as the release manifest records it. */
export interface ManifestPlatform {
	/** The platform name, printed verbatim - `macOS` keeps its case. */
	readonly name: string;

	/** The architectures the platform builds for, as the stamp prints them. */
	readonly arch: string;

	/** The release channel: `PUBLIC`. */
	readonly channel: string;

	/** The published version, or §7's word for one that does not exist. */
	readonly version: string;

	/** The signing state: `IN PREPARATION` until a key publishes. */
	readonly signature: string;

	/** The published checksum, or §7's word for one that does not exist. */
	readonly checksum: string;

	/** The artifact size, or §7's word for one that does not exist. */
	readonly size: string;

	/** The build date and commit, or §7's word for one that does not exist. */
	readonly build: string;

	/** The licence the artifact ships under. */
	readonly license: string;

	/** The installer's own state: `PREPARING` until one publishes. */
	readonly installer: string;

	/** The platform's state line, in §7's vocabulary. */
	readonly state: ManifestState;

	/** Where the platform's builds are found today, when anywhere. */
	readonly downloadUrl?: string;

	/** The link's own words, printed verbatim. */
	readonly downloadLabel?: string;
}

/** One platform's requirements: the platform name and its ledger rows. */
export interface PlatformRequirements {
	readonly platform: string;
	readonly rows: readonly LedgerRow[];
}

/** One published release. The list is empty today; this is what will fill it. */
export interface Release {
	readonly version: string;
	readonly published: string;
	readonly platform: string;
	readonly change: string;
}

/**
 * One region of the `# RELEASE_01` artifact, already resolved to copy.
 *
 * The page is one record, not a stack of chapters (DESIGN.md §7 DR-9). After the
 * manifest's own fields the artifact continues into the regions that answer the
 * rest of the page's question, and a region carries the artifact's internal
 * anatomy: a `/LABEL` kicker, its own `h3`, an optional standfirst and an
 * optional footnote. The regions paint no boundary and take no chapter
 * distance - they are parts of one subject, so they separate at `--space-group`
 * (DESIGN.md §2.3, §4.1).
 */
export interface Region {
	/** The region's anchor id, and the stem of its heading's id. */
	readonly id: string;

	/** The `/LABEL` opening the region, printed exactly as written. */
	readonly kicker: string;

	/** The region's own heading: the artifact's one `h3` per region. */
	readonly heading: string;

	/** One sentence under the heading, when the region needs one. */
	readonly standfirst?: string;

	/** Provenance, caveat or source line closing the region. */
	readonly footnote?: string;
}

/**
 * The three regions the `# RELEASE_01` artifact continues into, in page order.
 *
 * The record opens the page and owns its own head, so nothing here is a band:
 * each entry is a region inside the record, rendered by `Download/Region.astro`.
 */
export interface Regions {
	readonly Requirements: Region;
	readonly Previous: Region;
	readonly Transparency: Region;
}
