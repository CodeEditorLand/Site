/**
 * Data - every label, family and derivation the architecture record prints.
 *
 * The band has one job: name the sixteen records and say, in each record's own
 * words, what it does. Nothing here paraphrases a description - the body of
 * every entry is the string `home:architecture.*` already carries, and the only
 * text this module authors is the lead record's line, which is assembled from
 * the fields of `Source/Content/Record/Land.ts` (see `Lead`).
 *
 * Three tables live here rather than in the template:
 *
 * - `Families` - the grouping. Every name in it is one of the sixteen records,
 *   and every record appears exactly once, so the grid cannot lose a record to
 *   an off-by-one and cannot print one twice.
 * - `ElementDocPath` - the documentation route per element. The fallback is the
 *   site's own naming rule (`/Doc/<lowercase name>`), which is why the map only
 *   lists the elements whose page is spelled differently.
 * - `Glyphs` - the official emoji per element, from the element README header
 *   table (`Land/Element/<Name>/README.md` line 1, the Readme-Element
 *   standard's emoji cell), corroborated by the per-element doc pages in
 *   `Source/Content/doc/*.md`. `◎` (U+25CE) is the spec's neutral functional
 *   symbol for a name with no emoji of its own.
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

/** The band's own words. A kicker is structure, not copy: it names the section. */
export const Kicker = "/WHAT RUNS";

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
 * The lead record: the product itself.
 *
 * `Source/Content/Record/Land.ts` files Land under `Category: "Product"` rather
 * than `"Element"`, and it carries no `home:architecture.land.description` -
 * there is no `land` key in the content, and no `/Doc/land` page. So the body
 * below is assembled from the record's own fields and adds no claim of its own:
 * `Stamp` gives Rust + Tauri and no Electron, `Route` gives VS Code
 * compatibility with unmodified extensions, `Program` and `Metadata.TARGET`
 * give native and cross-platform, and `Metadata.LICENSE` gives CC0. The marker,
 * the chips and the repository link are read from the record verbatim.
 */
export const Lead: ElementEntry = {
	index: Land.Index,
	name: "Land",
	glyph: GlyphOf("Land"),
	chips: Land.Stamp ?? [],
	body:
		"The product the fifteen elements below compose: Rust and Tauri with no " +
		"Electron, VS Code compatibility with unmodified extensions, native across " +
		"macOS, Windows and Linux, under CC0.",
	source: Land.Href,
};

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
