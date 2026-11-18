/**
 * Data - the six properties as records, and the band's own words.
 *
 * The properties are copy, not a table: they arrive from
 * `home:features.item.*` in `Source/Library/I18n/Locale/En/Home.json`, and
 * `ItemsOf` is the one place that resolves them into the records the grid
 * prints. `EntriesOf` is the other door - it adapts a `FeatureItem[]` some
 * other module assembled - and both return the same `PropertyEntry`, so the
 * component takes whichever it is handed.
 *
 * The strings this module authors are the band's own words - the kicker, the
 * heading and the four strip labels - and the kicker and heading live in
 * `Home.json` under `features` as well, at the call site as the `defaultValue`
 * (BRIDGE §8.6). A strip label is structure, not copy: it names what the strip
 * is, the way `/PROOF` names the band.
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
 *
 * `Kicker` and `Heading` are the *band's* opening, and the band that prints them
 * is `Home/FeatureBand` (another card's): it heads the section with the
 * baseline's own `VS CODE. WITHOUT ELECTRON.`, so the two exports here stay
 * unread and are kept rather than deleted - a key or a string is never removed
 * to tidy a module.
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

/**
 * The six elements' tints, in the baseline's positional order.
 *
 * `DELETED.md` #12 records the call the deleted band made for its six claim
 * cards: `--jelly-fill: JellyCardFill(ElementOrder[Index % 6])`, "so each claim
 * carried the semantic tint of its element (Mountain, Cocoon, Wind, Sky, Air,
 * Echo, in that positional order)". The order is recovered here rather than
 * re-invented: a claim is not an element, but the six claims are the six
 * elements' arguments in the same positional sequence, and the tint is what makes
 * a grid of records read as six filed claims rather than six white boxes.
 *
 * Position is the identity the content gives a property (`Id` is a translation
 * key, not a name), so a tint resolved from the id would be a hash and two of the
 * three claims can land on one colour. Resolving from position cannot: the six
 * tints are distinct by construction, and a reordered set keeps its order's
 * colours rather than shuffling them.
 */
export const ElementOrder = [
	"Mountain",

	"Cocoon",

	"Wind",

	"Sky",

	"Air",

	"Echo",
] as const;

/** The specimen observation the record has always carried. */
export const ObservationLabel = "SPECIMEN";

/**
 * Where a property is argued at length when it is not one of the three claims.
 *
 * Every destination is an existing documentation page that makes exactly this
 * argument: `why-effect-ts.md` for fibers, `why-tauri.md` for the one source
 * tree over the OS WebView, `air.md` for the persistent background daemon,
 * `why-cc0.md` for the licence, `why-rust.md` for the native services and
 * `cocoon.md` for the unmodified-extension host. A property with no entry has
 * no page to point at, so the strip prints it without a link rather than
 * inventing a route.
 *
 * The keys are the ids the content actually carries (`home:features.item.*`).
 * The map this replaces was keyed on `architecture` / `cross-platform` /
 * `tooling` / `opensource` - four ids no locale file has - so `DocOf[Item.Id]`
 * never matched, every record rendered without an `href`, and the arrow the
 * motion layer moves for a linked record name was never printed. Measured
 * before the fix: 0 of 6 entries carried a destination.
 */
const DocOf: Record<string, string> = {
	designTokens: "/Doc/why-rust",

	componentLibrary: "/Doc/cocoon",

	documentation: "/Doc/why-effect-ts",

	versionControl: "/Doc/why-tauri",

	cicdIntegration: "/Doc/air",

	collaboration: "/Doc/why-cc0",
};

/**
 * The six properties' ids, in the content's own order.
 *
 * Structure, not copy: an id is a key into `home:features.item.*`, never a word
 * a reader sees, and the order is the order the content declares them in. It
 * lives here rather than in the component because the component renders the set
 * it is handed, and a set the component authored would be a second content
 * table.
 */
const PropertyIds = [
	"designTokens",

	"componentLibrary",

	"documentation",

	"versionControl",

	"cicdIntegration",

	"collaboration",
] as const;

/**
 * The English copy, verbatim from `Locale/En/Home.json`.
 *
 * It is the `defaultValue` of every key below, which is the pattern the tree
 * states in `DESIGN-COMPLETE.md` §4.5: English lives in the `defaultValue` and
 * in the locale file, and a key is never deleted. It is duplicated rather than
 * read because a module that imported the JSON would be a module that ships the
 * whole locale file to resolve six sentences.
 */
const PropertyCopy: Record<
	string,
	{ readonly title: string; readonly description: string }
> = {
	designTokens: {
		title: "Native services where they count.",

		description:
			"Heavy editor work runs natively, not trapped in a web view. Window management, file I/O, and terminals are native Rust services - no serialized JSON IPC bridge.",
	},

	componentLibrary: {
		title: "Unmodified extensions, no fork path.",

		description:
			"Your VS Code extensions run unmodified - no forks, no rewrites. A compatibility host implements the VS Code extension API surface.",
	},

	documentation: {
		title: "Fibers, not Promises.",

		description:
			"Failures are typed, traceable, and cancellable - one supervised fiber never takes down the rest of the editor.",
	},

	versionControl: {
		title: "One source tree, configured targets.",

		description:
			"Tauri uses the OS WebView on each platform - no bundled Chromium. One codebase compiles to native macOS, Windows, and Linux packages.",
	},

	cicdIntegration: {
		title: "Background daemon, always running.",

		description:
			"Updates, indexing, signing, and health checks run in a persistent daemon that keeps working after the main window closes.",
	},

	collaboration: {
		title: "CC0. No restrictions.",

		description:
			"Fork it, ship it, build commercial products on top of it. The entire codebase is CC0 public domain - no attribution required, no compliance headaches.",
	},
};

/** The server translator's shape, as `Content/Home/Type.ts` declares it. */
export type Translate = (
	Key: string,

	Options: { readonly defaultValue: string },
) => string;

/**
 * The six properties as records, resolved from the copy.
 *
 * `EntriesOf` adapts a `FeatureItem[]` that some other module assembled; this
 * one is the path the tree actually has, because the six properties are copy and
 * nothing else - there is no `Content/Feature` table between the locale file and
 * the grid. Both return the same shape, so the grid takes either.
 *
 * The marker is the property's place in the set, zero-padded the way the
 * field-record grammar pads a marker. The claim and the paragraph are the
 * content's own sentences - no truncation, no summary - so the band cannot lose
 * the copy it was rebuilt to show.
 */
export const ItemsOf = (T: Translate): readonly PropertyEntry[] =>
	PropertyIds.map((Id, Index) => ({
		index: `# ${String(Index + 1).padStart(2, "0")}`,
		id: Id,
		name: T(`home:features.item.${Id}.title`, {
			defaultValue: PropertyCopy[Id]?.title ?? Id,
		}),
		body: T(`home:features.item.${Id}.description`, {
			defaultValue: PropertyCopy[Id]?.description ?? "",
		}),
		...(DocOf[Id] ? { href: DocOf[Id] } : {}),
	}));

/** What the grid prints when the copy resolved to nothing at all. */
export const Empty =
	"No property is filed, so the grid prints nothing. The six are read from the home features copy, and a grid with no records is a locale file that lost six keys, not a page that failed to load.";

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
