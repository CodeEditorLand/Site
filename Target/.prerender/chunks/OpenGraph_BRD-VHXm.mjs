import { _ as RULE_OPACITY, a as StampRun, c as ACCENT_DETAIL, d as FONT, f as INK, g as RULE, h as PAPER, i as RouteRun, l as ACCENT_FOREGROUND, m as MUTE_FIELD, n as InfoRun, o as WrapText, p as MUTE, r as RelationRun, s as ACCENT, t as EscapeXML, u as FIELD, v as StatusInk } from "./Run_BvF91rfA.mjs";
// Source/Function/OpenGraph.ts
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
/**
* Generates a field-record artifact SVG at 1200×675 (16:9).
*
* Structure:
* - Creme field around the artifact
* - White card: index, stamp, route, blank band, title, relation, info rows
* - Evidence field (deeper creme, cross-hatch placeholder, no type on it)
* - One green seal (bottom-right of the evidence field)
*/
var GenerateOpenGraphSvg = (Title, Description, Section, Meta) => {
	const Width = 1200;
	const Height = 675;
	const CardX = 40;
	const CardY = 40;
	const CardW = 1120;
	const CardH = 595;
	CardX + Math.round(CardW * .52);
	const TextX = 68;
	const EvidenceX = 634;
	const EvidenceW = 498;
	const SectionName = Section ?? Meta?.Slug?.split("/")[0] ?? "Land";
	const SectionUpper = SectionName.toUpperCase();
	const IndexText = Meta?.Index ?? `# ${SectionUpper}_01`;
	const StampLine = StampRun(Meta?.Stamp ?? [SectionUpper]);
	const RouteLine = RouteRun((Meta?.Route ?? [SectionName]).map((Route) => Route.startsWith("/") ? Route : `/${Route}`));
	const TitleText = `${Title}:`;
	const TitleFontSize = TitleText.length <= 22 ? 38 : 32;
	const TitleLines = WrapText(TitleText, 28).slice(0, 2);
	const TitleLineHeight = Math.round(TitleFontSize * 1.06);
	const TitleStartY = TitleLines.length > 1 ? 208 : 232;
	const TitleLastY = TitleStartY + (TitleLines.length - 1) * TitleLineHeight;
	const TitleElement = TitleLines.map((Line, Index) => `\t<text x="${TextX}" y="${TitleStartY + Index * TitleLineHeight}" font-family="${FONT}" font-size="${TitleFontSize}" font-weight="500" fill="${INK}" letter-spacing="-0.02em">${EscapeXML(Line)}</text>`).join("\n");
	const SeparatorY = TitleLastY + 18;
	const RelationLines = WrapText(Description, 60).slice(0, 2);
	const RelationStartY = SeparatorY + 26;
	const RelationElement = RelationLines.map((Line, Index) => `\t<text x="${TextX}" y="${RelationStartY + Index * 20}" font-family="${FONT}" font-size="14" font-weight="400" letter-spacing="0.02em">${RelationRun(Line)}</text>`).join("\n");
	const InfoRows = [
		{
			Label: "STATUS",
			Value: Meta?.Status ?? "READY"
		},
		{
			Label: "LICENSE",
			Value: Meta?.License ?? "CC0"
		},
		{
			Label: "TARGET",
			Value: Meta?.Target ?? "OPEN SOURCE"
		}
	];
	const InfoStartY = RelationStartY + (RelationLines.length > 0 ? RelationLines.length * 20 + 12 : 0) + 26;
	const InfoLineHeight = 30;
	const InfoElements = InfoRows.map((Row, Index) => `\t<text x="${TextX}" y="${InfoStartY + Index * InfoLineHeight}" font-family="${FONT}" font-size="14" font-weight="400" letter-spacing="0.02em">${InfoRun(Row.Label, Row.Value, Row.Label === "STATUS" ? StatusInk(Row.Value) : INK)}</text>`).join("\n");
	const EvdX = 650;
	const EvdY = 68;
	const EvdW = 466;
	const EvdH = 495;
	const SealCx = 1080;
	const SealCy = 583;
	const SealText = (Meta?.Seal ?? "Land").slice(0, 5).toUpperCase();
	return `<svg width="${Width}" height="${Height}" viewBox="0 0 ${Width} ${Height}" xmlns="http://www.w3.org/2000/svg">
	<!-- Creme field -->
	<rect width="${Width}" height="${Height}" fill="${FIELD}" />

	<!-- White card -->
	<rect x="${CardX}" y="${CardY}" width="${CardW}" height="${CardH}" fill="${PAPER}" />

	<!-- Index / catalogue number -->
	<text x="${TextX}" y="100" font-family="${FONT}" font-size="18" font-weight="500" fill="${INK}" letter-spacing="0.1em">${EscapeXML(IndexText)}</text>

	<!-- Stamp -->
	<text x="${TextX}" y="136" font-family="${FONT}" font-size="14" font-weight="400" letter-spacing="0.02em">${StampLine}</text>

	<!-- Route -->
	<text x="${TextX}" y="164" font-family="${FONT}" font-size="14" font-weight="400" letter-spacing="0.02em">${RouteLine}</text>

	<!-- Title -->
${TitleElement}

	<!-- Hairline -->
	<line x1="${TextX}" y1="${SeparatorY}" x2="606" y2="${SeparatorY}" stroke="${RULE}" stroke-opacity="${RULE_OPACITY}" stroke-width="1" />

	<!-- Relation -->
${RelationLines.length > 0 ? RelationElement : "	<!-- (no relation in this record) -->"}

	<!-- STATUS / LICENSE / TARGET -->
${InfoElements}

	<!-- Evidence field: deeper creme, one hairline, no type on the artwork -->
	<rect x="${EvidenceX}" y="56" width="${EvidenceW}" height="563" fill="${MUTE_FIELD}" />
	<rect x="${EvidenceX}" y="56" width="${EvidenceW}" height="563" fill="none" stroke="${RULE}" stroke-opacity="${RULE_OPACITY}" stroke-width="1" />

	<!-- Evidence placeholder (the image arrives in a later edition) -->
	<rect x="${EvdX}" y="${EvdY}" width="${EvdW}" height="${EvdH}" fill="${INK}" fill-opacity="0.04" />
	<line x1="${EvdX}" y1="${EvdY}" x2="1116" y2="563" stroke="${INK}" stroke-opacity="0.1" stroke-width="1" />
	<line x1="1116" y1="${EvdY}" x2="${EvdX}" y2="563" stroke="${INK}" stroke-opacity="0.1" stroke-width="1" />
	<line x1="883" y1="${EvdY}" x2="883" y2="563" stroke="${INK}" stroke-opacity="0.06" stroke-width="1" />
	<line x1="${EvdX}" y1="315.5" x2="1116" y2="315.5" stroke="${INK}" stroke-opacity="0.06" stroke-width="1" />

	<!-- One green seal: accent ring, accent-detail inner ring -->
	<circle cx="${SealCx}" cy="${SealCy}" r="34" fill="${ACCENT}" />
	<circle cx="${SealCx}" cy="${SealCy}" r="30" fill="none" stroke="${ACCENT_DETAIL}" stroke-width="1.5" />
	<text x="${SealCx}" y="588" font-family="${FONT}" font-size="14" font-weight="500" fill="${ACCENT_FOREGROUND}" text-anchor="middle" letter-spacing="0.05em">${EscapeXML(SealText)}</text>

	<!-- Footer credits -->
	<text x="${TextX}" y="617" font-family="${FONT}" font-size="14" font-weight="400" fill="${MUTE}" fill-opacity="0.7">editor.land</text>
	<text x="1132" y="617" font-family="${FONT}" font-size="14" font-weight="400" fill="${MUTE}" fill-opacity="0.7" text-anchor="end">field record ${EscapeXML(SectionName.toLowerCase())}</text>
</svg>`;
};
export { GenerateOpenGraphSvg as default };
