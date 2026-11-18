/**
 * The features band: six element records, one card each.
 *
 * The band prints records, not claims. Each card is the element's own
 * `Content/Record/*.ts` entry - its marker, its two containment stamps, its
 * route over the service line, its repository, its status and its four-row
 * ledger - so the six cards are uniform by construction and no sentence is
 * authored here.
 *
 * The six are the six the baseline printed, in the baseline's order. The other
 * nine elements are not lost: they are the architecture band, one section down,
 * where all fifteen print.
 */
import { Air } from "../Record/Air.js";

import { Cocoon } from "../Record/Cocoon.js";

import { Echo } from "../Record/Echo.js";

import { Mountain } from "../Record/Mountain.js";

import { Sky } from "../Record/Sky.js";

import { Wind } from "../Record/Wind.js";

import type { FieldRecord } from "../Record/FieldRecord.js";

import type { CardRecord, RouteRow } from "./Type.js";

/**
 * `"/HOST:MOUNTAIN"` as its key and its value.
 *
 * A record's route is written as one compact string because that is how the
 * grammar prints it; the card needs the two halves in two inks, so the split
 * happens here rather than in the template.
 */
const RouteOf = (Record: FieldRecord): RouteRow => {
	const Line = Record.Route?.[0] ?? "";

	const Body = Line.startsWith("/") ? Line.slice(1) : Line;

	const Split = Body.indexOf(":");

	if (Split < 0) {
		return { Key: Body, Value: "" };
	}

	return {
		Key: Body.slice(0, Split),

		Value: Body.slice(Split + 1),
	};
};

/** One record entry as the card's data. */
const CardOf = (Record: FieldRecord): CardRecord => ({
	Index: Record.Index,
	Title: Record.Title,
	Href: Record.Href,
	SealName: Record.Seal,
	Stamp: Record.Stamp ?? [],
	Route: RouteOf(Record),
	Service: Record.Route?.[1] ?? "",
	Status: { Label: Record.Status.Label, Value: Record.Status.Value },
	Metadata: Record.Metadata,
});

/** The six cards, in the baseline's order. */
export const FeatureCards: readonly CardRecord[] = [
	Mountain,

	Cocoon,

	Wind,

	Sky,

	Air,

	Echo,
].map(CardOf);
