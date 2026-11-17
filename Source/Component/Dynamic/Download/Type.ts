/**
 * Type - the shapes the Download page hands to its bands.
 *
 * The page answers one question: can I install Land today, and if not, exactly
 * what can I do instead. Two shapes serve it - the masthead's eight marks and
 * the release manifest's three platform entries - and a third carries the
 * disclosure island's own content.
 *
 * The platform entry is the baseline render's field set, not the design
 * document's: `ARCH:`, `SIGNING:`, `SIZE:` and `CHECKSUM:`, under a
 * `〈 PLATFORM 〉` stamp and a `/ CHANNEL :PUBLIC` route line, closed by the
 * status line and - where the platform has one - the single action. A field the
 * tree cannot supply prints the baseline's own `-` rather than a word this page
 * would have to invent.
 *
 * Field names are lower camel case and every array is `readonly`, matching the
 * Record layer's own contract (`../../Record/Type.js`): a component renders the
 * data it is handed and never sorts, splices or pushes it.
 */

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
 * The release manifest band's opening block: the eyebrow, the heading and the
 * one sentence that states the release's condition.
 *
 * The eyebrow and the heading carry the same words on purpose. The baseline
 * rendered `Release Manifest` twice - once as a mono label, once as the band's
 * `h2` - and the repetition is the band's identity, not an oversight.
 */
export interface ManifestCopy {
	/** The mono eyebrow above the heading. */
	readonly eyebrow: string;

	/** The band's `h2`, printed verbatim. */
	readonly heading: string;

	/** The one sentence under the heading. */
	readonly sentence: string;
}

/**
 * One platform entry: its four provenance fields, its route line, its status
 * line and the one action a platform can carry today.
 *
 * `action` is absent on the two platforms with nowhere to send the reader yet.
 * The baseline closed those two on their status line instead, so an absent
 * action is a fact about the platform rather than a row somebody dropped.
 */
export interface ManifestPlatform {
	/** The platform name, printed inside the containment stamp. */
	readonly name: string;

	/** `ARCH:` - the architectures the platform builds for. */
	readonly arch: string;

	/** `SIGNING:` - the state of the signing material. */
	readonly signing: string;

	/** `SIZE:` - the artifact size, or the baseline's own `-`. */
	readonly size: string;

	/** `CHECKSUM:` - the artifact checksum, or the baseline's own `-`. */
	readonly checksum: string;

	/** The channel the build publishes on, printed as `/CHANNEL:PUBLIC`. */
	readonly channel: string;

	/** The status line, its state arm and the tone it is printed in. */
	readonly state: {
		/** The printed line, e.g. `STATUS: ACTIVE`. */
		readonly copy: string;

		/** The status block's state arm. */
		readonly status: PlatformStatus;

		/** The status block's tone: `specimen` for ACTIVE, `ink` otherwise. */
		readonly tone: PlatformTone;
	};

	/**
	 * The closing note under the status line, where a platform prints one.
	 *
	 * The baseline closed its two preparing platforms on two lines: the record's
	 * own `STATUS: PREPARING`, and under it the plain sentence `STATUS: RELEASE
	 * PREPARATION`. The note is that second line. The platform with a published
	 * build path carries none, because its card closes on its action instead -
	 * which is why the note is a branch beside the action and not a slot.
	 */
	readonly note?: string;

	/** The one action, where the platform has one. */
	readonly action?: { readonly label: string; readonly href: string };
}
