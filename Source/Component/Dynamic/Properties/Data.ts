/**
 * Data - the labels and derivations the proof band (`# OBSERVATION_01`) prints.
 *
 * The properties themselves are not authored here: they arrive from
 * `home:features.item.*` through `Content.Feature`, and this module only places
 * them in a set. The strings it does author are the band's own words - the
 * kicker, the heading and the four strip labels - and the kicker and heading
 * live in `Source/Library/I18n/Locale/En/Home.json` under `features` as well,
 * at the call site as the `defaultValue` (BRIDGE §8.6). A strip label is
 * structure, not copy: it names what the strip is, the way `/PROOF` names the
 * band.
 *
 * Why the heading is `features.heading` rather than `features.title`: the old
 * title was "VS CODE. WITHOUT ELECTRON.", which is the hero's claim said a
 * second time, and a band heading that repeats the page's h1 is a heading that
 * does not say what its own band is. `features.title` is left in the locale
 * untouched - nothing here reads it, and no key is ever deleted.
 *
 * **The three-claim budget.** `DesignSystem-Grammar.md` §8 gives this layer
 * three source-backed claims, one editor screenshot or architecture proof. The
 * content carries six properties, so the set is split: the first three, in the
 * content's own order, print as the claims; the rest print as a filed index -
 * their titles stay on the page and their paragraphs are the pages that argue
 * them at length (`DocOf`). The split is positional because position is the
 * only identity the content gives a property: the six are a set, not named
 * things, and `Id` is a translation key rather than a name a reader should see.
 */
import type FeatureItem from "../Interface/Item/Feature.js";

import type { PropertyEntry } from "./Type.js";

/** The band's series marker and route. Structure, not copy. */
export const Kicker = "# OBSERVATION_01\u2001/PROOF";

/** The band's heading: what the six-item set is, not what it is called. */
export const Heading = "What the editor actually is.";

/** How many properties the layer may claim: three (`DesignSystem-Grammar` §8). */
export const ClaimLimit = 3;

/** The strip that files the properties the layer does not claim. */
export const FiledLabel = "ALSO FILED";

/** The one architecture proof the layer is allowed: the runtime path. */
export const RailLabel = "RUNTIME PATH";

/** The specimen observation the record has always carried. */
export const ObservationLabel = "SPECIMEN";

/**
 * Where a property is argued at length when it is not one of the three claims.
 *
 * Every destination is an existing documentation page that makes exactly this
 * argument: `why-effect-ts.md` for fibers, `why-tauri.md` for the one source
 * tree over the OS WebView, `air.md` for the persistent background daemon. A
 * property with no entry has no page to point at, so the strip prints it
 * without a link rather than inventing a route.
 */
const DocOf: Record<string, string> = {
	architecture: "/Doc/why-effect-ts",

	"cross-platform": "/Doc/why-tauri",

	tooling: "/Doc/air",

	opensource: "/Doc/why-cc0",
};

/**
 * The six properties as records.
 *
 * The marker is the property's place in the set, zero-padded the way the
 * field-record grammar pads a marker. The claim and the paragraph are copied
 * across unchanged - no truncation, no summary - so the band cannot lose the
 * copy it was rebuilt to show.
 */
export const EntriesOf = (
	Items: readonly FeatureItem[],
): readonly PropertyEntry[] =>
	Items.map((Item, Index) => ({
		index: `# ${String(Index + 1).padStart(2, "0")}`,
		id: Item.Id,
		name: Item.Title,
		body: Item.Description,
		...(DocOf[Item.Id] ? { href: DocOf[Item.Id] } : {}),
	}));

/** The three the layer claims, in the content's own order. */
export const ClaimsOf = (
	Entries: readonly PropertyEntry[],
): readonly PropertyEntry[] => Entries.slice(0, ClaimLimit);

/** The rest, which the strip files against the pages that argue them. */
export const FiledOf = (
	Entries: readonly PropertyEntry[],
): readonly PropertyEntry[] => Entries.slice(ClaimLimit);
