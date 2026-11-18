/**
 * Home page OpenGraph SVG endpoint.
 *
 * Serves /OpenGraph.svg - the og:image for the root page.
 * Renders a field-record artifact card using the Land record.
 * All other pages use /OpenGraph/[Slug].svg via the [...Slug].svg.ts endpoint.
 *
 * The card is the same artifact the site prints: creme field, white card, the
 * record grammar (`# INDEX`, `〈stamp〉`, `/route`, `TITLE:`, `↳relation`,
 * `STATUS: ...`, the metadata rows, the program line, one green seal). Ink and
 * type come from `../Function/OpenGraph/Ink.js` - the mirror of
 * `Source/Stylesheet/System/_Token.scss` - and the runs from
 * `../Function/OpenGraph/Run.js`, so this endpoint and the per-page one cannot
 * render the same card in two different palettes.
 */

import type { APIRoute } from "astro";

import type { FieldRecord } from "../Content/Record/FieldRecord";

import {
	ACCENT,
	ACCENT_DETAIL,
	ACCENT_FOREGROUND,
	FIELD,
	FONT,
	INK,
	MUTE,
	MUTE_FIELD,
	PAPER,
	RULE,
	RULE_OPACITY,
	StatusInk,
	TYPE_INDEX,
	TYPE_L,
	TYPE_L_TIGHT,
	TYPE_S,
	WEIGHT_STRONG,
	WEIGHT_TEXT,
} from "../Function/OpenGraph/Ink.js";

import {
	EscapeXML,
	InfoRun,
	RelationRun,
	RouteRun,
	StampRun,
	WrapText,
} from "../Function/OpenGraph/Run.js";

/**
 * Generates a field-record artifact SVG at 1200×675 (16:9).
 *
 * Structure:
 * - Creme field around the artifact
 * - White card: index, stamp, route, blank band, title, relation, info rows
 * - Evidence field (deeper creme, cross-hatch placeholder, no type on it)
 * - One green seal (bottom-right of the evidence field)
 *
 * Varies by record: Product/Element/Release/Document each carry their own
 * Index, Stamp, Route, Title, Status, Metadata, Program, and Seal.
 */
export const GenerateFieldRecordSvg = (Record: FieldRecord): string => {

	const Width = 1200;

	const Height = 675;

	const FrameWidth = 16;

	const CardInset = 24;

	const CardX = FrameWidth + CardInset;

	const CardY = FrameWidth + CardInset;

	const CardW = Width - 2 * (FrameWidth + CardInset);

	const CardH = Height - 2 * (FrameWidth + CardInset);

	// Split: text left (~52%), evidence right (~48%)
	const SplitX = CardX + Math.round(CardW * 0.52);

	const TextX = CardX + 28;

	const TextW = SplitX - CardX - 44;

	const EvidenceX = SplitX + 12;

	const EvidenceW = CardX + CardW - EvidenceX - 28;

	// 〈STAMP〉 - per-keyword semantic ink, brackets stay muted
	const StampLine = StampRun(Record.Stamp ?? []);

	// /ROUTE - slash muted, keyword in sky, value in ink
	const RouteLine = RouteRun(Record.Route ?? []);

	// Title: the record grammar prints the title as a label, so it ends in a
	// colon. One line fits 22 characters at the L tier; anything longer drops
	// to the tier's floor and takes a 28-character measure (the full column
	// width at that size), so a long page title loses fewer words to the
	// two-line clamp than it did at the narrow measure.
	const TitleText = `${Record.Title}:`;

	const TitleFontSize = TitleText.length <= 22 ? TYPE_L : TYPE_L_TIGHT;

	const TitleLines = WrapText(TitleText, 28).slice(0, 2);

	const TitleLineHeight = Math.round(TitleFontSize * 1.06);

	const TitleStartY = TitleLines.length > 1 ? CardY + 168 : CardY + 192;

	const TitleLastY = TitleStartY + (TitleLines.length - 1) * TitleLineHeight;

	const TitleElement = TitleLines.map(
		(Line, Index) =>
			`\t<text x="${TextX}" y="${TitleStartY + Index * TitleLineHeight}" font-family="${FONT}" font-size="${TitleFontSize}" font-weight="${WEIGHT_STRONG}" fill="${INK}" letter-spacing="-0.02em">${EscapeXML(Line)}</text>`,
	).join("\n");

	// Hairline under the title - the one --Border value
	const SeparatorY = TitleLastY + 18;

	// ↳relation - the record's one-line proposition, when it carries one
	const RelationLines = Record.Relation
		? WrapText(Record.Relation, 60).slice(0, 2)

		: [];

	const RelationStartY = SeparatorY + 26;

	const RelationElement = RelationLines.map(
		(Line, Index) =>
			`\t<text x="${TextX}" y="${RelationStartY + Index * 20}" font-family="${FONT}" font-size="${TYPE_S}" font-weight="${WEIGHT_TEXT}" letter-spacing="0.02em">${RelationRun(Line)}</text>`,
	).join("\n");

	// STATUS then the record's metadata rows - label ink, value ink
	// (a specimen-tone or live STATUS takes the accent)
	const InfoRows = [
		{
			Label: Record.Status.Label,

			Value: Record.Status.Value,

			Ink:
				Record.Status.Tone === "specimen"
					? ACCENT
					: StatusInk(Record.Status.Value),
		},

		...Record.Metadata.map((Meta) => ({
			Label: Meta.Label,

			Value: Meta.Value,

			Ink: INK,
		})),
	];

	const InfoStartY =
		RelationStartY +
		(RelationLines.length > 0 ? RelationLines.length * 20 + 12 : 0) +
		26;

	const InfoLineHeight = 30;

	const InfoElements = InfoRows.map(
		(Row, Index) =>
			`\t<text x="${TextX}" y="${InfoStartY + Index * InfoLineHeight}" font-family="${FONT}" font-size="${TYPE_S}" font-weight="${WEIGHT_TEXT}" letter-spacing="0.02em">${InfoRun(Row.Label, Row.Value, Row.Ink)}</text>`,
	).join("\n");

	// Program line - the record's own words, uppercase and widely tracked
	const ProgramText = (Record.Program ?? []).join("\u2001").toUpperCase();

	const ProgramElement = ProgramText
		? `\t<text x="${TextX}" y="${CardY + CardH - 52}" font-family="${FONT}" font-size="${TYPE_S}" font-weight="${WEIGHT_TEXT}" fill="${INK}" fill-opacity="0.6" letter-spacing="0.25em">${EscapeXML(ProgramText)}</text>\n`

		: "";

	// Evidence field geometry
	const EvdX = EvidenceX + 16;

	const EvdY = CardY + 28;

	const EvdW = EvidenceW - 32;

	const EvdH = CardH - 100;

	// Seal position (bottom-right of the evidence field)
	const SealCx = EvidenceX + EvidenceW - 52;

	const SealCy = CardY + CardH - 52;

	return `<svg width="${Width}" height="${Height}" viewBox="0 0 ${Width} ${Height}" xmlns="http://www.w3.org/2000/svg">
	<!-- Creme field -->
	<rect width="${Width}" height="${Height}" fill="${FIELD}" />

	<!-- White card -->
	<rect x="${CardX}" y="${CardY}" width="${CardW}" height="${CardH}" fill="${PAPER}" />

	<!-- Index / catalogue number -->
	<text x="${TextX}" y="${CardY + 60}" font-family="${FONT}" font-size="${TYPE_INDEX}" font-weight="${WEIGHT_STRONG}" fill="${INK}" letter-spacing="0.1em">${EscapeXML(Record.Index)}</text>

	<!-- Stamp -->
	<text x="${TextX}" y="${CardY + 96}" font-family="${FONT}" font-size="${TYPE_S}" font-weight="${WEIGHT_TEXT}" letter-spacing="0.02em">${StampLine}</text>

	<!-- Route -->
	<text x="${TextX}" y="${CardY + 124}" font-family="${FONT}" font-size="${TYPE_S}" font-weight="${WEIGHT_TEXT}" letter-spacing="0.02em">${RouteLine}</text>

	<!-- Title -->
${TitleElement}

	<!-- Hairline -->
	<line x1="${TextX}" y1="${SeparatorY}" x2="${TextX + TextW}" y2="${SeparatorY}" stroke="${RULE}" stroke-opacity="${RULE_OPACITY}" stroke-width="1" />

	<!-- Relation -->
${RelationLines.length > 0 ? RelationElement : "	<!-- (no relation in this record) -->"}

	<!-- STATUS / metadata rows -->
${InfoElements}

${ProgramElement}	<!-- Evidence field: deeper creme, one hairline, no type on the artwork -->
	<rect x="${EvidenceX}" y="${CardY + 16}" width="${EvidenceW}" height="${CardH - 32}" fill="${MUTE_FIELD}" />
	<rect x="${EvidenceX}" y="${CardY + 16}" width="${EvidenceW}" height="${CardH - 32}" fill="none" stroke="${RULE}" stroke-opacity="${RULE_OPACITY}" stroke-width="1" />

	<!-- Evidence placeholder (the image arrives in a later edition) -->
	<rect x="${EvdX}" y="${EvdY}" width="${EvdW}" height="${EvdH}" fill="${INK}" fill-opacity="0.04" />
	<line x1="${EvdX}" y1="${EvdY}" x2="${EvdX + EvdW}" y2="${EvdY + EvdH}" stroke="${INK}" stroke-opacity="0.1" stroke-width="1" />
	<line x1="${EvdX + EvdW}" y1="${EvdY}" x2="${EvdX}" y2="${EvdY + EvdH}" stroke="${INK}" stroke-opacity="0.1" stroke-width="1" />
	<line x1="${EvdX + EvdW / 2}" y1="${EvdY}" x2="${EvdX + EvdW / 2}" y2="${EvdY + EvdH}" stroke="${INK}" stroke-opacity="0.06" stroke-width="1" />
	<line x1="${EvdX}" y1="${EvdY + EvdH / 2}" x2="${EvdX + EvdW}" y2="${EvdY + EvdH / 2}" stroke="${INK}" stroke-opacity="0.06" stroke-width="1" />

	<!-- One green seal: accent ring, accent-detail inner ring -->
	<circle cx="${SealCx}" cy="${SealCy}" r="34" fill="${ACCENT}" />
	<circle cx="${SealCx}" cy="${SealCy}" r="30" fill="none" stroke="${ACCENT_DETAIL}" stroke-width="1.5" />
	<text x="${SealCx}" y="${SealCy + 5}" font-family="${FONT}" font-size="${TYPE_S}" font-weight="${WEIGHT_STRONG}" fill="${ACCENT_FOREGROUND}" text-anchor="middle" letter-spacing="0.05em">${EscapeXML(Record.Seal).slice(0, 5).toUpperCase()}</text>

	<!-- Footer credits -->
	<text x="${TextX}" y="${CardY + CardH - 18}" font-family="${FONT}" font-size="${TYPE_S}" font-weight="${WEIGHT_TEXT}" fill="${MUTE}" fill-opacity="0.7">editor.land</text>
	<text x="${CardX + CardW - 28}" y="${CardY + CardH - 18}" font-family="${FONT}" font-size="${TYPE_S}" font-weight="${WEIGHT_TEXT}" fill="${MUTE}" fill-opacity="0.7" text-anchor="end">field record${"\u2001"}${EscapeXML(Record.Category.toLowerCase())}</text>
</svg>`;
};

export const GET: APIRoute = async () => {

	const { Land } = await import("../Content/Record/Land");

	const Svg = GenerateFieldRecordSvg(Land);

	return new Response(Svg, {
		status: 200,
		headers: {
			"Content-Type": "image/svg+xml",
			"Cache-Control": "public, max-age=86400",
		},
	});
};
