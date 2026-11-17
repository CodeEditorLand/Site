/**
 * Data - the labels and derivations the six-property band prints.
 *
 * The six properties themselves are not authored here: they arrive from
 * `home:features.item.*` through `Content.Feature`, and this module only places
 * them in a set. The two strings it does author are the band's own words - the
 * kicker and the heading - and both are copy, so both live in
 * `Source/Library/I18n/Locale/En/Home.json` under `features` as well, at the
 * call site as the `defaultValue` (BRIDGE §8.6).
 *
 * Why the heading is a new key rather than `features.title`: the old title was
 * "VS CODE. WITHOUT ELECTRON.", which is the hero's claim said a second time,
 * and a band heading that repeats the page's h1 is a heading that does not say
 * what its own band is. `features.title` is left in the locale untouched -
 * nothing here reads it, and no key is ever deleted.
 */
import type FeatureItem from "../Interface/Item/Feature.js";

import type { PropertyEntry } from "./Type.js";

/** The band's marker. Structure, not copy: it names the section. */
export const Kicker = "/PROPERTIES";

/** The band's heading: what the six-item set is, not what it is called. */
export const Heading = "What the editor actually is.";

/**
 * The six properties as records.
 *
 * The marker is the property's place in the set, zero-padded the way the
 * field-record grammar pads a marker. It is derived from the position because
 * the position is the only identity the content gives a property: the six are a
 * set, not a list of named things, and `Id` (`performance`, `compatibility`, ...)
 * is a translation key rather than a name a reader should see.
 *
 * The claim and the paragraph are copied across unchanged - no truncation, no
 * summary - so the band cannot lose the copy it was rebuilt to show.
 */
export const EntriesOf = (
	Items: readonly FeatureItem[],
): readonly PropertyEntry[] =>
	Items.map((Item, Index) => ({
		index: `# ${String(Index + 1).padStart(2, "0")}`,
		name: Item.Title,
		body: Item.Description,
	}));
