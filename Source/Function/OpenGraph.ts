/**
 * OpenGraph SVG template generator - the Daylight Field Record artifact card.
 *
 * Produces a 1200×675 (16:9) SVG string for og:image / twitter:image social
 * sharing cards on every non-home page. Mirrors the field-record artifact card
 * used by the home endpoint (`Source/pages/OpenGraph.svg.ts`):
 *
 *   creme field (#f2ede3) → white card (#ffffff) carrying the record grammar:
 *   `# INDEX`, `〈stamp〉`, `/route`, `TITLE:`, `↳relation`,
 *   `STATUS: / LICENSE: / TARGET:`, the evidence field, one green seal.
 *
 * Every colour and type value comes from `./OpenGraph/Ink.js`, which mirrors
 * `Source/Stylesheet/System/_Token.scss`; the runs come from `./OpenGraph/Run.js`.
 * This file owns composition (where things sit), never ink.
 *
 * Call sites keep the legacy (Title, Description, Section) signature; the
 * optional Meta argument carries per-page overrides (Slug, Index, Stamp,
 * Route, Status, License, Target, Seal) resolved from PageMetadata.ts at
 * the endpoint. Per-page variation flows through Title/Description/Section
 * plus the Status/License/Target fields on each PageMetadata entry.
 */

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
} from "./OpenGraph/Ink.js";

import {
	EscapeXML,
	InfoRun,
	RelationRun,
	RouteRun,
	StampRun,
	WrapText,
} from "./OpenGraph/Run.js";

interface OpenGraphMeta {
	Slug?: string;

	Index?: string;

	Stamp?: string[];

	Route?: string[];

	Status?: string;

	License?: string;

	Target?: string;

	Seal?: string;
}

/**
 * Generates a field-record artifact SVG at 1200×675 (16:9).
 *
 * Structure:
 * - Creme field around the artifact
 * - White card: index, stamp, route, blank band, title, relation, info rows
 * - Evidence field (deeper creme, cross-hatch placeholder, no type on it)
 * - One green seal (bottom-right of the evidence field)
 */
const GenerateOpenGraphSvg = (
	Title: string,
	Description: string,
	Section?: string,
	Meta?: OpenGraphMeta,
): string => {
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

	const SectionName = Section ?? Meta?.Slug?.split("/")[0] ?? "Land";

	const SectionUpper = SectionName.toUpperCase();

	// `# SECTION_01`
	const IndexText = Meta?.Index ?? `# ${SectionUpper}_01`;

	// 〈STAMP〉 - per-keyword semantic ink, brackets stay muted
	const StampLine = StampRun(Meta?.Stamp ?? [SectionUpper]);

	// /ROUTE - slash muted, keyword in sky, value in ink
	const RouteLine = RouteRun(
		(Meta?.Route ?? [SectionName]).map((Route) =>
			Route.startsWith("/") ? Route : `/${Route}`,
		),
	);

	// Title: the record grammar prints the title as a label, so it ends in a
	// colon. One line fits 22 characters at the L tier; anything longer drops
	// to the tier's floor and takes a 28-character measure (the full column
	// width at that size), so a long page title loses fewer words to the
	// two-line clamp than it did at the narrow measure.
	const TitleText = `${Title}:`;

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

	// ↳relation - the description as the record's one-line proposition
	const RelationLines = WrapText(Description, 60).slice(0, 2);

	const RelationStartY = SeparatorY + 26;

	const RelationElement = RelationLines.map(
		(Line, Index) =>
			`\t<text x="${TextX}" y="${RelationStartY + Index * 20}" font-family="${FONT}" font-size="${TYPE_S}" font-weight="${WEIGHT_TEXT}" letter-spacing="0.02em">${RelationRun(Line)}</text>`,
	).join("\n");

	// STATUS / LICENSE / TARGET - label ink, value ink (STATUS may take the accent)
	const InfoRows = [
		{ Label: "STATUS", Value: Meta?.Status ?? "READY" },

		{ Label: "LICENSE", Value: Meta?.License ?? "CC0" },

		{ Label: "TARGET", Value: Meta?.Target ?? "OPEN SOURCE" },
	];

	const InfoStartY =
		RelationStartY +
		(RelationLines.length > 0 ? RelationLines.length * 20 + 12 : 0) +
		26;

	const InfoLineHeight = 30;

	const InfoElements = InfoRows.map(
		(Row, Index) =>
			`\t<text x="${TextX}" y="${InfoStartY + Index * InfoLineHeight}" font-family="${FONT}" font-size="${TYPE_S}" font-weight="${WEIGHT_TEXT}" letter-spacing="0.02em">${InfoRun(Row.Label, Row.Value, Row.Label === "STATUS" ? StatusInk(Row.Value) : INK)}</text>`,
	).join("\n");

	// Evidence field geometry
	const EvdX = EvidenceX + 16;
	const EvdY = CardY + 28;
	const EvdW = EvidenceW - 32;
	const EvdH = CardH - 100;

	// Seal position (bottom-right of the evidence field)
	const SealCx = EvidenceX + EvidenceW - 52;
	const SealCy = CardY + CardH - 52;

	const SealText = (Meta?.Seal ?? "Land").slice(0, 5).toUpperCase();

	return `<svg width="${Width}" height="${Height}" viewBox="0 0 ${Width} ${Height}" xmlns="http://www.w3.org/2000/svg">
	<!-- Creme field -->
	<rect width="${Width}" height="${Height}" fill="${FIELD}" />

	<!-- White card -->
	<rect x="${CardX}" y="${CardY}" width="${CardW}" height="${CardH}" fill="${PAPER}" />

	<!-- Index / catalogue number -->
	<text x="${TextX}" y="${CardY + 60}" font-family="${FONT}" font-size="${TYPE_INDEX}" font-weight="${WEIGHT_STRONG}" fill="${INK}" letter-spacing="0.1em">${EscapeXML(IndexText)}</text>

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

	<!-- STATUS / LICENSE / TARGET -->
${InfoElements}

	<!-- Evidence field: deeper creme, one hairline, no type on the artwork -->
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
	<text x="${SealCx}" y="${SealCy + 5}" font-family="${FONT}" font-size="${TYPE_S}" font-weight="${WEIGHT_STRONG}" fill="${ACCENT_FOREGROUND}" text-anchor="middle" letter-spacing="0.05em">${EscapeXML(SealText)}</text>

	<!-- Footer credits -->
	<text x="${TextX}" y="${CardY + CardH - 18}" font-family="${FONT}" font-size="${TYPE_S}" font-weight="${WEIGHT_TEXT}" fill="${MUTE}" fill-opacity="0.7">editor.land</text>
	<text x="${CardX + CardW - 28}" y="${CardY + CardH - 18}" font-family="${FONT}" font-size="${TYPE_S}" font-weight="${WEIGHT_TEXT}" fill="${MUTE}" fill-opacity="0.7" text-anchor="end">field record${"\u2001"}${EscapeXML(SectionName.toLowerCase())}</text>
</svg>`;
};

export default GenerateOpenGraphSvg;
