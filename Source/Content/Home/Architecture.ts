/**
 * The architecture band: all fifteen elements, one record card each.
 *
 * The band prints every element the product is made of - not a selection - and
 * each card is the element's own `Content/Record/*.ts` entry plus the three
 * things a record cannot carry: its glyph, its role chips and its description.
 * The chips are the element's subtitle split at the em quad the locale files use
 * as their only separator; the description is the element's own paragraph,
 * printed whole.
 *
 * `Span` is the card's width in columns of the twelve-column masonry. The five
 * widths (4, 5, 6, 7, 8) are the baseline's own distribution in its own order,
 * which is what makes the band a staggered wall with ragged edges rather than an
 * even grid of equal tiles.
 */
import EnglishHome from "../../Library/I18n/Locale/En/Home.json";

import { Air } from "../Record/Air.js";

import { Cocoon } from "../Record/Cocoon.js";

import { Common } from "../Record/Common.js";

import { Echo } from "../Record/Echo.js";

import { Grove } from "../Record/Grove.js";

import { Maintain } from "../Record/Maintain.js";

import { Mist } from "../Record/Mist.js";

import { Mountain } from "../Record/Mountain.js";

import { Output } from "../Record/Output.js";

import { Rest } from "../Record/Rest.js";

import { SideCar } from "../Record/SideCar.js";

import { Sky } from "../Record/Sky.js";

import { Vine } from "../Record/Vine.js";

import { Wind } from "../Record/Wind.js";

import { Worker } from "../Record/Worker.js";

import type { FieldRecord } from "../Record/FieldRecord.js";

import { WorkingOf } from "../Element/Working.js";

import type {
	ElementCard,
	HomeTranslate,
	RegisterRow,
	RouteRow,
} from "./Type.js";

/**
 * The element's glyph, from the element README header table. `◎` is the
 * record set's neutral symbol and is used for the one element drawn as a symbol
 * instead of an engraved figure - which is why `Seal` is a decision per element
 * and not a fallback.
 */
const Glyphs: Readonly<Record<string, string>> = {
	air: "🪁",

	cocoon: "🦋",

	common: "🧑🏼‍🏭",

	echo: "📣",

	grove: "🌳",

	maintain: "💪🏼",

	mist: "🌫️",

	mountain: "⛰️",

	output: "⚫",

	rest: "⛱️",

	sidecar: "🚃",

	sky: "🌌",

	vine: "🌿",

	wind: "🍃",

	worker: "🍩",
};

/** The neutral symbol, for the element the record set draws as a symbol. */
const Symbol = "◎";

/** The elements drawn as a symbol rather than as an engraved seal. */
const Symbolic: ReadonlySet<string> = new Set(["Common"]);

/**
 * The four records the wall prints at full depth.
 *
 * They are the four a reader meets in the order they meet them: the native host,
 * the extension host, the service layer and the build. Each gets its three-step
 * trace under its register; the other eleven print the register alone. That is
 * the band's density rhythm - four annotated entries inside one tight wall of
 * fifteen - and it is a decision per element, not a fallback.
 */
const Plates: ReadonlySet<string> = new Set([
	"cocoon",

	"maintain",

	"mountain",

	"wind",
]);

/**
 * The register an element with no working prints.
 *
 * It is one row and it is the honest one: a record whose facts the tree does not
 * carry says so, in the same grammar as every other register, rather than
 * rendering an empty ledger. The empty state is composed, never a blank.
 */
const NoWorking: readonly RegisterRow[] = [
	{
		Label: "EVIDENCE",

		Value: "UNAVAILABLE",

		Note: "NO WORKING RECORDED FOR THIS ELEMENT",
	},
];

/**
 * The element's English copy, as the `defaultValue` the band resolves against.
 *
 * Every string this band adds is `T(key, { defaultValue })`, and the rule is that
 * the English copy lives in the `defaultValue` **and** in `Locale/En/Home.json`
 * (`DESIGN.md` §4.4). An empty default would make the copy depend entirely on the
 * resolver being live at the moment the band renders, and when it is not, the band
 * would print fifteen records with no chips and an empty body instead of failing
 * loudly. The locale module is the single source of truth and is imported here
 * rather than re-typed, so the two can never drift.
 */
const English = (
	Key: string,
): { readonly subtitle: string; readonly description: string } => {
	const Rows = EnglishHome.architecture as unknown as Readonly<
		Record<
			string,
			{ readonly subtitle: string; readonly description: string }
		>
	>;

	return Rows[Key] ?? { subtitle: "", description: "" };
};

/** One row of the table: the record, its width, and the order it prints in. */
const Order: readonly {
	readonly Record: FieldRecord;

	readonly Span: number;
}[] = [
	{ Record: Air, Span: 5 },

	{ Record: Cocoon, Span: 7 },

	{ Record: Common, Span: 7 },

	{ Record: Echo, Span: 5 },

	{ Record: Grove, Span: 8 },

	{ Record: Maintain, Span: 4 },

	{ Record: Mist, Span: 6 },

	{ Record: Mountain, Span: 6 },

	{ Record: Output, Span: 8 },

	{ Record: Rest, Span: 4 },

	{ Record: SideCar, Span: 7 },

	{ Record: Sky, Span: 5 },

	{ Record: Vine, Span: 4 },

	{ Record: Wind, Span: 8 },

	{ Record: Worker, Span: 8 },
];

/** `"/CHANNEL:AIR"` as its key and its value. */
const RouteOf = (Record: FieldRecord): RouteRow => {
	const Line = Record.Route?.[0] ?? "";

	const Body = Line.startsWith("/") ? Line.slice(1) : Line;

	const Split = Body.indexOf(":");

	if (Split < 0) {
		return { Key: Body, Value: "" };
	}

	return { Key: Body.slice(0, Split), Value: Body.slice(Split + 1) };
};

/** The role chips: the subtitle split at the em quad the locale files use. */
const ChipsOf = (Subtitle: string): readonly string[] =>
	Subtitle.split("\u2001")
		.map((Chip) => Chip.trim())
		.filter((Chip) => Chip.length > 0);

/** One table row as the card's data. */
const CardOf =
	(T: HomeTranslate) =>
	({
		Record,
		Span,
	}: {
		readonly Record: FieldRecord;

		readonly Span: number;
	}): ElementCard => {
		const Key = Record.Id;

		const Working = WorkingOf(Key);

		return {
			Index: Record.Index,

			Title: Record.Title,

			Href: Record.Href,

			SealName: Record.Seal,

			Stamp: Record.Stamp ?? [],

			Route: RouteOf(Record),

			Service: Record.Route?.[1] ?? "",

			Status: { Label: Record.Status.Label, Value: Record.Status.Value },

			Metadata: Record.Metadata,

			Glyph: Glyphs[Key] ?? Symbol,

			Seal: Symbolic.has(Record.Seal) ? "symbol" : "figure",

			Symbol,

			Chips: ChipsOf(
				T(`home:architecture.${Key}.subtitle`, {
					defaultValue: English(Key).subtitle,
				}),
			),

			Body: T(`home:architecture.${Key}.description`, {
				defaultValue: English(Key).description,
			}),

			Source: Record.Href,

			Span,

			Depth: Plates.has(Key) ? "plate" : "record",

			Register: Working?.Register ?? NoWorking,

			Trace: Working?.Trace ?? [],
		};
	};

/** The fifteen cards, in the baseline's order and at the baseline's widths. */
export const ElementCards = (T: HomeTranslate): readonly ElementCard[] =>
	Order.map(CardOf(T));
