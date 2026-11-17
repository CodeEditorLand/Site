/**
 * OpenGraph runs - the record grammar as SVG text runs.
 *
 * A share card is built from the same character-level runs the site's card
 * uses (`Source/Component/Brand/SemanticLedger.tsx`): bracket glyphs and the
 * route slash stay muted, a stamp keyword carries its semantic ink, a route
 * keyword carries sky, a STATUS value may carry the accent. Both OG endpoints
 * build their lines through these helpers so one surface cannot colour a line
 * differently from the other.
 *
 * Everything here returns SVG markup, not React nodes: the endpoints write a
 * standalone file, so each run is a string of `<tspan>` elements meant to sit
 * inside one `<text>`.
 */

import { INK, MUTE, ROUTE_INK, StampInk } from "./Ink.js";

/** XML-escape one text node. */
export const EscapeXML = (Text: string): string =>
	Text.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");

/**
 * Greedy word wrap for a mono measure: the character count is the width, so
 * a line is simply a run of words that still fits.
 */
export const WrapText = (Text: string, MaxCharacter: number): string[] => {
	const Word = Text.split(" ");

	const Line: string[] = [];

	let Current = "";

	for (const W of Word) {
		if (
			Current.length + W.length + 1 > MaxCharacter &&
			Current.length > 0
		) {
			Line.push(Current);

			Current = W;
		} else {
			Current = Current.length > 0 ? `${Current} ${W}` : W;
		}
	}

	if (Current.length > 0) Line.push(Current);

	return Line;
};

/** `〈A〉 〈B〉` - glyphs muted, each segment in its own semantic ink. */
export const StampRun = (Stamps: readonly string[]): string =>
	Stamps.map((Stamp) => {
		const Segment = Stamp.split(" + ").map((Word) => {
			const Ink = StampInk(Word) ?? MUTE;

			return `<tspan fill="${Ink}">${EscapeXML(Word)}</tspan>`;
		});

		return [
			`<tspan fill="${MUTE}">\u3008</tspan>`,
			Segment.join(`<tspan fill="${MUTE}"> + </tspan>`),
			`<tspan fill="${MUTE}">\u3009</tspan>`,
		].join("");
	}).join(" ");

/**
 * `/KEYWORD:VALUE` - slash muted, keyword in sky, the rest in ink. A route
 * line that is not shaped like a route renders as one muted run, which is
 * what `RouteText` does on the site.
 */
const ROUTE_SHAPE = /^\/[A-Z0-9-]+:/;

const RouteLine = (Line: string): string => {
	if (!ROUTE_SHAPE.test(Line)) {
		return `<tspan fill="${MUTE}">${EscapeXML(Line)}</tspan>`;
	}

	const Colon = Line.indexOf(":");

	return [
		`<tspan fill="${MUTE}">/</tspan>`,
		`<tspan fill="${ROUTE_INK}">${EscapeXML(Line.slice(1, Colon))}</tspan>`,
		`<tspan fill="${INK}">${EscapeXML(Line.slice(Colon))}</tspan>`,
	].join("");
};

/** One route line, or several joined by em-quad separators. */
export const RouteRun = (Routes: readonly string[]): string =>
	Routes.map(RouteLine).join(`<tspan fill="${MUTE}">\u2001</tspan>`);

/** `LABEL: VALUE` - label ink at 70%, value ink, or the accent when live. */
export const InfoRun = (
	Label: string,
	Value: string,
	ValueInk: string = INK,
): string =>
	[
		`<tspan fill="${INK}" fill-opacity="0.7">${EscapeXML(Label)}:</tspan>`,
		`<tspan fill="${ValueInk}"> ${EscapeXML(Value)}</tspan>`,
	].join("");

/** `↳proposition` - the one-line relation under the title block. */
export const RelationRun = (Relation: string): string =>
	[
		`<tspan fill="${MUTE}">\u21b3</tspan>`,
		`<tspan fill="${INK}" fill-opacity="0.7">${EscapeXML(Relation)}</tspan>`,
	].join("");
