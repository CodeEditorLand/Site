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

/* ── Surfaces ────────────────────────────────────────────────────── */

/** `--Background` - the creme field the artifact floats in. */
export const FIELD = "#f2ede3";

/** `--Card` - the white information card. */
export const PAPER = "#ffffff";

/** `--Mute` - deeper creme; the evidence field, never a text colour. */
export const MUTE_FIELD = "#e9e2d4";

/* ── Ink ─────────────────────────────────────────────────────────── */

/** `--Foreground` - ink on every light surface. */
export const INK = "#1c1c1e";

/** `--MuteForeground` - warm gray for secondary runs and credits. */
export const MUTE = "#70685b";

/** `--Accent` - the sole accent. Seals and the STATUS value only. */
export const ACCENT = "#1e742a";

/** `--AccentForeground` - the label inside the seal. */
export const ACCENT_FOREGROUND = "#ffffff";

/** `--AccentDetail` - the one permitted second accent, inside the seal only. */
export const ACCENT_DETAIL = "#d6b947";

/** `--SemanticSky` - the route keyword's ink (`/KEYWORD:VALUE`). */
export const ROUTE_INK = "#0369a1";

/* ── Hairline ────────────────────────────────────────────────────── */

/**
 * `--Border` is `rgba(7, 7, 7, 0.08)` - one hairline value sitewide. SVG
 * cannot carry a CSS colour function through a standalone file, so it is
 * split into its rgb and alpha halves and recombined per stroke.
 */
export const RULE = "#070707";

/** The alpha half of `--Border`. */
export const RULE_OPACITY = 0.08;

/* ── Type ────────────────────────────────────────────────────────── */

/**
 * `--FontMono` as an SVG attribute value. The token spells its families in
 * double quotes; the SVG attribute is double-quoted, so each family is
 * re-quoted with single quotes here. Same list, same order.
 */
export const FONT =
	"'IBM Plex Mono', 'JetBrains Mono', 'Fira Code', ui-monospace, 'SFMono-Regular', 'SF Mono', Menlo, Consolas, monospace";

/** `--TypeScaleS` (0.875rem) - the minimum. Nothing renders below 13px. */
export const TYPE_S = 14;

/**
 * The index marker takes the top of the S range (13-18px) rather than the
 * token value: at poster scale a 14px `# LAND_01` would sit flush with the
 * stamp and route runs beside it and lose its rank. Still inside S.
 */
export const TYPE_INDEX = 18;

/** `--TypeScaleL` at its middle - the single-line title. */
export const TYPE_L = 38;

/** `--TypeScaleL` at its floor - a title that has to wrap to two lines. */
export const TYPE_L_TIGHT = 32;

/** `--font-weight` never exceeds `font-medium` (500) anywhere. */
export const WEIGHT_STRONG = 500;

/** Body weight. */
export const WEIGHT_TEXT = 400;

/* ── Stamp keyword ink ───────────────────────────────────────────── */

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
export const STAMP_HEX: Record<string, string> = {
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

	"ENTERPRISE PLAN": "#70685b",
};

/** Semantic ink for one stamp keyword; null keeps the neutral muted ink. */
export const StampInk = (Keyword: string): string | null =>
	STAMP_HEX[Keyword.toUpperCase()] ?? null;

/**
 * The STATUS value's ink: green when the record is live, ink otherwise.
 * Mirrors `FieldRecordStatus` / `StatusText` - the label stays ink, only the
 * value may take the accent.
 */
export const StatusInk = (Value: string): string =>
	/(^|\s)(ACTIVE|VERIFIED)(\s|$)/.test(Value.toUpperCase()) ? ACCENT : INK;
