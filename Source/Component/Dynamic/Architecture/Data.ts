/**
 * Data - every label, family and derivation the architecture record prints.
 *
 * The band has one job: name the elements and say, in each one's own words,
 * what it does. Nothing here paraphrases a description - the body of every
 * printed entry is the string `home:architecture.*` already carries, and the
 * only text this module authors is the lead line, which is assembled from the
 * fields of `Source/Content/Record/Land.ts` (see `LeadLine`).
 *
 * **The seven-element budget.** `DesignSystem-Grammar.md` §8 gives this layer
 * "seven elements max, one short record each". The set is sixteen - Land plus
 * fifteen elements - so the layer prints seven records and files the other
 * eight: `Featured` names the seven, `FiledOf` returns the rest as an index
 * strip of documentation and repository links (`DesignSystem-Pages.md` §1:
 * "one Archive Index of element records, not a card wall"). Land is not one of
 * the seven: it is the product, its record is the hero (`# LAND_01`), and its
 * one-line statement is the band's lead line.
 *
 * Five tables live here rather than in the template:
 *
 * - `Featured` - the seven records the layer prints, in the order it prints
 *   them: the runtime path the hero's claim asserts, then the three services
 *   that make that claim true.
 * - `Families` - the stack grouping. Every name in it is one of the fifteen
 *   records, and every record appears exactly once, so the grouping cannot lose
 *   a record to an off-by-one and cannot print one twice.
 * - `ElementDocPath` - the documentation route per element. The fallback is the
 *   site's own naming rule (`/Doc/<lowercase name>`), which is why the map only
 *   lists the elements whose page is spelled differently.
 * - `Glyphs` - the official emoji per element, from the element README header
 *   table (`Land/Element/<Name>/README.md` line 1, the Readme-Element
 *   standard's emoji cell), corroborated by the per-element doc pages in
 *   `Source/Content/doc/*.md`. `◎` (U+25CE) is the spec's neutral functional
 *   symbol for a name with no emoji of its own.
 * - `DocOf`/`SourceOf` - the two destinations a filed record keeps: its
 *   documentation page and its repository (`EntryOf`'s `href` and `source`).
 *   Both survive the move out of the printed set, so no element loses a link
 *   when it stops being a record.
 */
import { Air } from "../../../Content/Record/Air.js";

import { Cocoon } from "../../../Content/Record/Cocoon.js";

import { Common } from "../../../Content/Record/Common.js";

import { Echo } from "../../../Content/Record/Echo.js";

import { Grove } from "../../../Content/Record/Grove.js";

import { Land } from "../../../Content/Record/Land.js";

import { Maintain } from "../../../Content/Record/Maintain.js";

import { Mist } from "../../../Content/Record/Mist.js";

import { Mountain } from "../../../Content/Record/Mountain.js";

import { Output } from "../../../Content/Record/Output.js";

import { Rest } from "../../../Content/Record/Rest.js";

import { SideCar } from "../../../Content/Record/SideCar.js";

import { Sky } from "../../../Content/Record/Sky.js";

import { Vine } from "../../../Content/Record/Vine.js";

import { Wind } from "../../../Content/Record/Wind.js";

import { Worker } from "../../../Content/Record/Worker.js";

import type { FieldRecord } from "../../../Content/Record/FieldRecord.js";

import type Item from "../Interface/Item/Testimonial.js";

import type { ElementEntry, Family } from "./Type.js";

/** The band's series marker and route. Structure, not copy. */
export const Kicker = "# CLASSIFICATION_01\u2001/WHAT RUNS";

/** The strip that files the elements the layer does not print. */
export const FiledLabel = "ALSO FILED";

/**
 * The sixteen records, keyed by the name the content uses for them. The record
 * supplies the marker (`# AIR_01`) and the repository; the description comes
 * from the content, so the two can never disagree about what an element is.
 */
const Records: Record<string, FieldRecord> = {
	Air,

	Cocoon,

	Common,

	Echo,

	Grove,

	Land,

	Maintain,

	Mist,

	Mountain,

	Output,

	Rest,

	SideCar,

	Sky,

	Vine,

	Wind,

	Worker,
};

/**
 * The documentation route per element. Only the elements whose page is not the
 * lowercase of their name need an entry; `DocPathOf` supplies the rest.
 */
export const ElementDocPath: Record<string, string> = {
	Mountain: "/Doc/mountain",

	Cocoon: "/Doc/cocoon",

	Wind: "/Doc/wind",

	Sky: "/Doc/sky",

	Air: "/Doc/air",

	Echo: "/Doc/echo",

	Vine: "/Doc/vine",

	Common: "/Doc/common",

	Grove: "/Doc/grove",

	Mist: "/Doc/mist",

	Rest: "/Doc/rest",

	Output: "/Doc/output",

	SideCar: "/Doc/sidecar",

	Maintain: "/Doc/maintain",

	Worker: "/Doc/worker",
};

/** The element's documentation route: the map's entry, else the site's own rule. */
export const DocPathOf = (Name: string): string =>
	ElementDocPath[Name] ?? `/Doc/${Name.toLowerCase()}`;

/**
 * The element's glyph. Every name in the set has one; `◎` is the documented
 * fallback rather than an invented symbol.
 */
const Glyphs: Record<string, string> = {
	mountain: "⛰️",

	cocoon: "🦋",

	wind: "🍃",

	sky: "🌌",

	air: "🪁",

	echo: "📣",

	grove: "🌳",

	vine: "🌿",

	rest: "⛱️",

	worker: "🍩",

	common: "🧑🏼‍🏭",

	maintain: "💪🏼",

	mist: "🌫️",

	output: "⚫",

	sidecar: "🚃",
};

const GlyphOf = (Name: string): string => Glyphs[Name.toLowerCase()] ?? "◎";

/**
 * The families, in the order the band prints them.
 *
 * The grouping is a reading of the descriptions, not a new taxonomy: each
 * family collects the elements whose own description names that part of the
 * stack - the two extension hosts, the three that build and compile, the three
 * that render and serve the interface, the five the native runtime is made of,
 * and the two that carry traffic between them.
 *
 * Land is deliberately absent: it is the product the fifteen compose, so the
 * band prints it as a lead record above the families instead of burying it in
 * one of them.
 */
export const Families: readonly Family[] = [
	{
		label: "/RUNTIME",

		names: ["Mountain", "Common", "Echo", "Air", "SideCar"],
	},

	{ label: "/EXTENSIONS", names: ["Cocoon", "Grove"] },

	{ label: "/INTERFACE", names: ["Sky", "Wind", "Worker"] },

	{ label: "/BUILD", names: ["Output", "Rest", "Maintain"] },

	{ label: "/TRANSPORT", names: ["Vine", "Mist"] },
];

/**
 * The lead line: the product's own one-sentence statement.
 *
 * `Source/Content/Record/Land.ts` files Land under `Category: "Product"` rather
 * than `"Element"`, and it carries no `home:architecture.land.description` -
 * there is no `land` key in the content, and no `/Doc/land` page. So the line
 * below is assembled from the record's own fields and adds no claim of its own:
 * `Stamp` gives Rust + Tauri and no Electron, `Route` gives VS Code
 * compatibility with unmodified extensions, `Program` and `Metadata.TARGET`
 * give native and cross-platform, and `Metadata.LICENSE` gives CC0.
 *
 * It is a line and not a record because Land is not one of the seven elements
 * the layer prints: the product's record is the hero (`# LAND_01`), one layer
 * up, and printing it again here would be the second record of the same
 * subject on one page.
 */
export const LeadLine =
	"The product the elements compose: Rust and Tauri with no Electron, " +
	"VS Code compatibility with unmodified extensions, native across macOS, " +
	"Windows and Linux, under CC0.";

/**
 * The seven records the layer prints, in the order it prints them.
 *
 * The first four are the runtime path the hero's claim asserts - Mountain →
 * Cocoon → Sky → Wind, the same four the proof band's rail names - and the last
 * three are the services that make that claim true across the stack: Vine
 * carries the typed contract between elements, Grove hosts Rust and WASM
 * extensions in a Wasmtime sandbox, and Air runs the background work outside
 * the main window. They are the seven the page's own release manifest calls the
 * active path.
 */
export const Featured: readonly string[] = [
	"Mountain",

	"Cocoon",

	"Sky",

	"Wind",

	"Vine",

	"Grove",

	"Air",
];

/**
 * The seven records, in `Featured`'s order.
 *
 * A name the content does not carry is skipped rather than printed empty: the
 * band renders what it is handed.
 */
export const FeaturedOf = (Items: readonly Item[]): readonly ElementEntry[] => {
	const ByName = new Map(Items.map((Item) => [Item.Author, Item]));

	return Featured.map((Name) => ByName.get(Name))
		.filter((Found): Found is Item => Found !== undefined)
		.map(EntryOf);
};

/**
 * The elements the layer files instead of printing, grouped by stack family and
 * in the content's own order inside each family.
 *
 * They are not dropped: the strip prints each one's name against its
 * documentation page, and its `SOURCE` against its repository, so the eight
 * keep both links they had as records. The grouping is the same reading of the
 * descriptions `Families` already carries, and a family whose records are all
 * printed is not returned at all - an empty heading is not an index.
 */
export const FiledGroupsOf = (
	Items: readonly Item[],
): readonly {
	readonly label: string;

	readonly records: readonly ElementEntry[];
}[] =>
	Families.map((Group) => ({
		label: Group.label,

		records: FamilyEntriesOf(Group, Items).filter(
			(Record) => !Featured.includes(Record.name),
		),
	})).filter((Group) => Group.records.length > 0);

/**
 * One content item as a record.
 *
 * `Role` is the element's subtitle, written as one string separated by em
 * quads (U+2001); it becomes the chip row, split at the separator and at the
 * legacy `" - "` form the older entries used. The description becomes the body
 * whole - line breaks and all - because its three lines are three claims and
 * the entry is not allowed to keep only one of them.
 */
export const EntryOf = (Item: Item): ElementEntry => {
	const Record = Records[Item.Author];

	return {
		index: Record?.Index ?? `# ${Item.Author.toUpperCase()}_01`,

		name: Item.Author,

		glyph: GlyphOf(Item.Author),

		chips: (Item.Role ?? "")
			.split(/\u2001| - /)
			.map((Chip) => Chip.trim())
			.filter((Chip) => Chip.length > 0),

		body: Item.Quote,

		href: DocPathOf(Item.Author),

		source: Item.Href ?? Record?.Href,
	};
};

/** The fifteen element records, in the order the content lists them. */
export const EntriesOf = (Items: readonly Item[]): readonly ElementEntry[] =>
	Items.map(EntryOf);

/** One family's records, in the family's own order. */
export const FamilyEntriesOf = (
	Group: Family,

	Items: readonly Item[],
): readonly ElementEntry[] => {
	const ByName = new Map(Items.map((Item) => [Item.Author, Item]));

	return Group.names
		.map((Name) => ByName.get(Name))
		.filter((Found): Found is Item => Found !== undefined)
		.map(EntryOf);
};
