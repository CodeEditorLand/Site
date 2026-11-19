// Source/Function/OpenGraph/Ink.ts
/**
* OpenGraph ink - the share image's copy of the design tokens.
*
* A share image is a file, not a page: no stylesheet reaches it, so
* `var(--Foreground)` cannot resolve and every colour has to be a literal hex.
* This module is the ONE place those literals live, which is what keeps the
* two OG endpoints - `Source/pages/OpenGraph.svg.ts` (homepage) and
* `Source/pages/OpenGraph/[...Slug].svg.ts` (every other page) - from drifting
* apart. Both import from here; neither writes a colour of its own.
*
* The values are copied from `Source/Stylesheet/System/_Token.scss`. That file
* is the source and this one is the mirror: change the token first, then this.
* A value that cannot be traced to a token does not belong in this file.
*
*   --Background     #f2ede3                 creme field around the artifact
*   --Card           #ffffff                 the white information card
*   --Foreground     #1c1c1e                 ink
*   --Mute           #e9e2d4                 deeper creme - the evidence field
*   --MuteForeground #70685b                 muted ink - stamp glyphs, credits
*   --Accent         #1e742a                 the one accent: seal, STATUS value
*   --AccentDetail   #d6b947                 the seal's detail ink, seal only
*   --Border         rgba(7, 7, 7, 0.08)     one hairline, sitewide
*   --SemanticSky    #0369a1                 route keyword ink
*   --FontMono       IBM Plex Mono first     mono is the sole typeface
*   --TypeScaleS     0.875rem = 14px         the effective minimum (no XS)
*   --TypeScaleL     2rem-3.25rem = 32-52px  titles
*/
/** `--Background` - the creme field the artifact floats in. */
var FIELD = "#f2ede3";
/** `--Card` - the white information card. */
var PAPER = "#ffffff";
/** `--Mute` - deeper creme; the evidence field, never a text colour. */
var MUTE_FIELD = "#e9e2d4";
/** `--Foreground` - ink on every light surface. */
var INK = "#1c1c1e";
/** `--MuteForeground` - warm gray for secondary runs and credits. */
var MUTE = "#70685b";
/** `--Accent` - the sole accent. Seals and the STATUS value only. */
var ACCENT = "#1e742a";
/** `--AccentForeground` - the label inside the seal. */
var ACCENT_FOREGROUND = "#ffffff";
/** `--AccentDetail` - the one permitted second accent, inside the seal only. */
var ACCENT_DETAIL = "#d6b947";
/** `--SemanticSky` - the route keyword's ink (`/KEYWORD:VALUE`). */
var ROUTE_INK = "#0369a1";
/**
* `--Border` is `rgba(7, 7, 7, 0.08)` - one hairline value sitewide. SVG
* cannot carry a CSS colour function through a standalone file, so it is
* split into its rgb and alpha halves and recombined per stroke.
*/
var RULE = "#070707";
/** The alpha half of `--Border`. */
var RULE_OPACITY = .08;
/**
* `--FontMono` as an SVG attribute value. The token spells its families in
* double quotes; the SVG attribute is double-quoted, so each family is
* re-quoted with single quotes here. Same list, same order, minus
* "Land Symbol" - the site's second face, which carries only U+25CE and
* U+3008/U+3009 - because an SVG served as an image loads no webfont at all.
* The card is set in the platform's mono, so naming a face the renderer
* cannot fetch would only pretend the stamp is drawn in the site's own
* brackets.
*/
var FONT = "'IBM Plex Mono', 'JetBrains Mono', 'Fira Code', ui-monospace, 'SFMono-Regular', 'SF Mono', Menlo, Consolas, monospace";
/**
* Semantic stamp inks for the SVG share images.
*
* Standalone SVGs cannot resolve `var()` strings, so the keyword -> ink map
* from `Source/Function/Theme/SemanticColor.ts` (`KEYWORD_INK`) is mirrored
* here with the SAME hex values `_Token.scss` defines for those tokens:
*
*   EXTENSION HOST / CAPABILITY HOST / WORK-STEALING / NATIVE BACKEND /
*   BACKGROUND SERVICES ...              -> --SpineIPCFore      #1d4ed8
*   RUST / RUST-NATIVE                    -> --SemanticRed       #b91c1c
*   TAURI                                 -> --ExtensionTauriFore #b45309
*   NO ELECTRON                           -> --SemanticTeal      #155e75
*   SCHEDULER / OXC PIPELINE / FOUR MODES -> --SpineTCPFore      #c2410c
*   ASTRO UI / WASM SANDBOX / PROVIDER PLAN -> --SpineWASMFore   #6d28d9
*   ACTIVE SOURCE / GRPC BACKBONE         -> --SpinegRPCFore     #15803d
*   LINUX / ESBUILD PRIMARY               -> --SemanticYellow    #854d0e
*   WEBVIEW BRIDGE                        -> --SemanticSky       #0369a1
*   WORKBENCH / NOT FOUND / MACOS         -> --MuteForeground (neutral)
*
* Unknown keywords stay muted (they frame, they do not shout).
*/
var STAMP_HEX = {
	"EXTENSION HOST": "#1d4ed8",
	"CAPABILITY HOST": "#1d4ed8",
	"DUAL-TRACK": "#c2410c",
	WORKBENCH: "#70685b",
	"EFFECT-TS": "#0e7490",
	"EFFECT-TS LAYERS": "#0e7490",
	"WORK-STEALING": "#1d4ed8",
	SCHEDULER: "#c2410c",
	RUST: "#b91c1c",
	TAURI: "#b45309",
	"NATIVE BACKEND": "#1d4ed8",
	"RUST-NATIVE": "#b91c1c",
	"OXC PIPELINE": "#c2410c",
	"REST SELECTABLE": "#c2410c",
	"NO ELECTRON": "#155e75",
	"ASTRO UI": "#6d28d9",
	"WEBVIEW BRIDGE": "#0369a1",
	"WASM SANDBOX": "#6d28d9",
	"BACKGROUND SERVICES": "#1d4ed8",
	DAEMON: "#1d4ed8",
	"LOCAL AUTHORITY": "#1d4ed8",
	"DNS SANDBOX": "#1d4ed8",
	"SERVICE WORKER": "#1d4ed8",
	"OFFLINE SHELL": "#1d4ed8",
	"PURE ABSTRACT": "#70685b",
	"CONTRACT CRATE": "#70685b",
	DETERMINISTIC: "#15803d",
	"BUILD ORCHESTRATOR": "#c2410c",
	"ESBUILD PRIMARY": "#854d0e",
	"GRPC BACKBONE": "#15803d",
	"CONTRACT-FIRST": "#15803d",
	"AUTHENTICATION TIERS": "#1d4ed8",
	"FOUR MODES": "#c2410c",
	"NOT FOUND": "#70685b",
	MACOS: "#70685b",
	WINDOWS: "#1d4ed8",
	LINUX: "#854d0e",
	"ACTIVE SOURCE": "#15803d",
	INTEGRATION: "#1d4ed8",
	"RELEASE PREPARATION": "#c2410c",
	"CLOUD PLAN": "#1d4ed8",
	"PROVIDER PLAN": "#6d28d9",
	"LOCAL-FIRST PLAN": "#c2410c",
	"ENTERPRISE PLAN": "#70685b"
};
/** Semantic ink for one stamp keyword; null keeps the neutral muted ink. */
var StampInk = (Keyword) => STAMP_HEX[Keyword.toUpperCase()] ?? null;
/**
* The STATUS value's ink: green when the record is live, ink otherwise.
* Mirrors `FieldRecordStatus` / `StatusText` - the label stays ink, only the
* value may take the accent.
*/
var StatusInk = (Value) => /(^|\s)(ACTIVE|VERIFIED)(\s|$)/.test(Value.toUpperCase()) ? ACCENT : INK;
// Source/Function/OpenGraph/Run.ts
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
/** XML-escape one text node. */
var EscapeXML = (Text) => Text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
/**
* Greedy word wrap for a mono measure: the character count is the width, so
* a line is simply a run of words that still fits.
*/
var WrapText = (Text, MaxCharacter) => {
	const Word = Text.split(" ");
	const Line = [];
	let Current = "";
	for (const W of Word) if (Current.length + W.length + 1 > MaxCharacter && Current.length > 0) {
		Line.push(Current);
		Current = W;
	} else Current = Current.length > 0 ? `${Current} ${W}` : W;
	if (Current.length > 0) Line.push(Current);
	return Line;
};
/** `〈A〉 〈B〉` - glyphs muted, each segment in its own semantic ink. */
var StampRun = (Stamps) => Stamps.map((Stamp) => {
	const Segment = Stamp.split(" + ").map((Word) => {
		return `<tspan fill="${StampInk(Word) ?? "#70685b"}">${EscapeXML(Word)}</tspan>`;
	});
	return [
		`<tspan fill="${MUTE}">\u3008</tspan>`,
		Segment.join(`<tspan fill="${MUTE}"> + </tspan>`),
		`<tspan fill="${MUTE}">\u3009</tspan>`
	].join("");
}).join(" ");
/**
* `/KEYWORD:VALUE` - slash muted, keyword in sky, the rest in ink. A route
* line that is not shaped like a route renders as one muted run, which is
* what `RouteText` does on the site.
*/
var ROUTE_SHAPE = /^\/[A-Z0-9-]+:/;
var RouteLine = (Line) => {
	if (!ROUTE_SHAPE.test(Line)) return `<tspan fill="${MUTE}">${EscapeXML(Line)}</tspan>`;
	const Colon = Line.indexOf(":");
	return [
		`<tspan fill="${MUTE}">/</tspan>`,
		`<tspan fill="${ROUTE_INK}">${EscapeXML(Line.slice(1, Colon))}</tspan>`,
		`<tspan fill="${INK}">${EscapeXML(Line.slice(Colon))}</tspan>`
	].join("");
};
/** One route line, or several joined by em-quad separators. */
var RouteRun = (Routes) => Routes.map(RouteLine).join(`<tspan fill="${MUTE}">\u2001</tspan>`);
/** `LABEL: VALUE` - label ink at 70%, value ink, or the accent when live. */
var InfoRun = (Label, Value, ValueInk = INK) => [`<tspan fill="${INK}" fill-opacity="0.7">${EscapeXML(Label)}:</tspan>`, `<tspan fill="${ValueInk}"> ${EscapeXML(Value)}</tspan>`].join("");
/** `↳proposition` - the one-line relation under the title block. */
var RelationRun = (Relation) => [`<tspan fill="${MUTE}">\u21b3</tspan>`, `<tspan fill="${INK}" fill-opacity="0.7">${EscapeXML(Relation)}</tspan>`].join("");
export { RULE_OPACITY as _, StampRun as a, ACCENT_DETAIL as c, FONT as d, INK as f, RULE as g, PAPER as h, RouteRun as i, ACCENT_FOREGROUND as l, MUTE_FIELD as m, InfoRun as n, WrapText as o, MUTE as p, RelationRun as r, ACCENT as s, EscapeXML as t, FIELD as u, StatusInk as v };
