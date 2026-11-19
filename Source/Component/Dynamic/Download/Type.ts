/**
 * Type - the shapes the Download page hands to its record.
 *
 * The page answers one question: can I install Land today, and if not, exactly
 * what can I do instead. The shapes below serve that as one artifact:
 *
 * - `ManifestRecord` is the record's own head - its index, its claim, its state
 *   and its two provenance lines. It is the only `h2` on the page.
 * - `PlatformTarget` is one platform's field set: the target, its architecture,
 *   the four artifact fields, the status line, and either the run command that
 *   platform documents or the sentence that says it documents none.
 * - `Region` is one part of the artifact after its head: a `/LABEL`, an `h3`
 *   and a body. The page is one record with six parts, not six chapters.
 *
 * Field names are lower camel case and every array is `readonly`, matching the
 * Record layer's own contract (`../../Record/Type.js`): a component renders the
 * data it is handed and never sorts, splices or pushes it.
 */

import type { LedgerRow, MatrixColumn, Well } from "../../Record/Type.js";

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
export type PlatformStatus = "active" | "preparing" | "unavailable";

export type PlatformTone = "ink" | "specimen" | "quiet";

/**
 * The record's head: the index, the band's own name, the claim, the channel and
 * the state, plus the two lines that close the artifact.
 *
 * `heading` is the page's one `h2` and it is a claim, not a label: the eyebrow
 * carries the band's name (`Release Manifest`) and the heading says what the
 * record actually found. `channel` prints as the record's route line,
 * `/CHANNEL:PUBLIC`, once - the channel belongs to the release, not to each of
 * its three targets.
 */
export interface ManifestRecord {
	/** The record's marker without its `#` - `RELEASE_01`. */
	readonly index: string;

	/** The mono label above the claim: the band's own name. */
	readonly eyebrow: string;

	/** The record's claim, printed as the page's only `h2`. */
	readonly heading: string;

	/** The channel the release publishes on, printed as `/CHANNEL:<channel>`. */
	readonly channel: string;

	/** The record's status line, its state arm and the tone it prints in. */
	readonly state: {
		/** The printed line, e.g. `STATUS: NO PUBLIC ARTIFACTS`. */
		readonly copy: string;

		/** The status block's state arm. */
		readonly status: PlatformStatus;

		/** The status block's tone: `specimen` is the one green. */
		readonly tone: PlatformTone;
	};

	/** The plain-language reading of the state: what it means for a reader. */
	readonly note: string;

	/** What the record does not carry, printed as the artifact's colophon. */
	readonly footnote: string;

	/** Where every figure in the record comes from. */
	readonly source: string;
}

/**
 * One platform's entry in the record: its target, its three artifact states,
 * its status line, and the run path it documents - or the sentence that says it
 * documents none.
 *
 * `run` is a `Well`, not a string: a command is an object the reader copies, and
 * the well carries the copy control and the prompt-free payload. `absence` is
 * the other arm - the `↳` line a platform prints when no run command is
 * documented for it yet. Exactly one of the two is set.
 */
export interface PlatformTarget {
	/** The platform name, printed inside the containment stamp. */
	readonly name: string;

	/** The architectures the platform builds for. */
	readonly arch: string;

	/** `INSTALLER` - the state of the installer artifact. */
	readonly installer: string;

	/** `SIGNATURE` - the state of the signing material. */
	readonly signature: string;

	/** `CHECKSUM` - the state of the published digest. */
	readonly checksum: string;

	/** `SIZE` - the artifact's byte count, once an artifact exists. */
	readonly size: string;

	/** The status line, its state arm and the tone it is printed in. */
	readonly state: {
		/** The printed line, e.g. `STATUS: SOURCE ACTIVE`. */
		readonly copy: string;

		/** The status block's state arm. */
		readonly status: PlatformStatus;

		/** The status block's tone. */
		readonly tone: PlatformTone;
	};

	/** The run command this platform documents, as a well. */
	readonly run?: Well;

	/** The `↳` line a platform with no documented run command prints. */
	readonly absence?: string;
}

/**
 * One region of the `# RELEASE_01` artifact, already resolved to copy.
 *
 * The page is one record, not a stack of chapters (DESIGN.md §7 DR-9). After the
 * record's own head the artifact continues into the regions that answer the rest
 * of the page's question, and a region carries the artifact's internal anatomy:
 * a `/LABEL` kicker, its own `h3`, an optional standfirst and an optional
 * footnote. The regions paint no boundary and take no chapter distance - they
 * are parts of one subject, so they separate at `--space-group`.
 *
 * Recovered from `3480853ac^` with `Download/Region.astro`, which renders it.
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
 * The regions the `# RELEASE_01` artifact continues into, in page order.
 *
 * The order is the sceptic's, not the baseline's: what the platforms are, what a
 * build needs, how it is built and run, how it is verified, what the build
 * discloses, and what shipped before it.
 */
export interface Regions {
	readonly Ladder: Region;

	readonly Platforms: Region;

	readonly Evidence: Region;

	readonly Requirements: Region;

	readonly Install: Region;

	readonly Verify: Region;

	readonly Transparency: Region;

	readonly Previous: Region;
}

/**
 * One requirements panel: the heading it prints and the rows under it.
 *
 * Two panels, and the second one is the recommendation - `recommended` is what
 * puts the ink border on it, so the mark travels as data rather than as a class
 * the page decides.
 */
export interface RequirementsPanel {
	/** The panel's own heading, printed in the case it was written in. */
	readonly label: string;

	/** The panel's ledger rows, in the order they are read. */
	readonly rows: readonly LedgerRow[];

	/** Whether this is the panel the site recommends. */
	readonly recommended: boolean;
}

/**
 * One platform in the supported-OS strip.
 *
 * `note` is the line under the name: the architectures the platform builds for
 * and the installer formats it ships. It is one string because it is one
 * sentence on the page.
 */
export interface SupportedOS {
	/** The platform and the OS floor it needs, e.g. `macOS 10.15+`. */
	readonly name: string;

	/** The architectures and the installer formats, under the name. */
	readonly note: string;
}

/** One published release. The list is empty today; this is what will fill it. */
export interface Release {
	readonly version: string;

	readonly published: string;

	readonly platform: string;

	readonly change: string;
}

/**
 * The matrix a region renders, already resolved: its columns, its rows and the
 * caption that names where the cells come from.
 *
 * A row's `label` is the first cell - the platform's containment stamp, printed
 * as text because a table cell cannot carry the per-glyph inks. The stamp itself
 * is not lost: every platform's run entry in `/INSTALL` prints it with its inks.
 */
export interface PlatformMatrix {
	readonly columns: readonly MatrixColumn[];

	readonly rows: readonly {
		readonly label: string;

		readonly cells: readonly string[];
	}[];

	/** The provenance line under the table. */
	readonly caption: string;
}
