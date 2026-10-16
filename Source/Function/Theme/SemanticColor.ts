/**
 * C17 semantic color system (Daylight Field Record).
 *
 * One deterministic keyword->ink and element->fill map for the whole site.
 * Collage method: every stamp keyword, route keyword, platform keyword and
 * element card gets the color that fits what it MEANS and how it reads in
 * the page flow. Character-level granularity: bracket glyphs (〈 〉) and the
 * route slash (/) stay neutral gray; the semantic color sits on the text
 * inside. Light fills + dark -600/-700 ink shades only; radius stays 0.
 *
 * Existing tokens (Base.css) are used wherever they are already dark-ink
 * correct; the few hues whose *Fore token is a dark-theme light color get
 * new daylight ink tokens (--Semantic*) defined in Base.css.
 */

/* Neutral gray used for the stamp bracket glyphs and the route slash. */
export const GLYPH_INK = "var(--MuteForeground)";

/* Dark ink shades for light surfaces (Base.css --Semantic* block). */
export const INK = {
	Red: "var(--SemanticRed)", // rust / rpm ink

	Teal: "var(--SemanticTeal)", // electron ink

	Sky: "var(--SemanticSky)", // route keywords / webview / web

	BlueDeep: "var(--SemanticBlueDeep)", // 64-bit / x64 darker blue

	Yellow: "var(--SemanticYellow)", // linux / esbuild / echo ink

	GrayDeep: "var(--SemanticGrayDeep)", // apple silicon / appimage

	Gray: "var(--MuteForeground)", // workbench / neutral gray ink
} as const;

/* Existing dark-ink tokens reused directly (all >= 4.5:1 on white). */
export const SPINE_GREEN_INK = "var(--SpinegRPCFore)"; // #15803d

export const SPINE_BLUE_INK = "var(--SpineIPCFore)"; // #1d4ed8

export const SPINE_ORANGE_INK = "var(--SpineTCPFore)"; // #c2410c

export const SPINE_PURPLE_INK = "var(--SpineWASMFore)"; // #6d28d9

export const TAURI_AMBER_INK = "var(--ExtensionTauriFore)"; // #b45309

export const EFFECT_TS_CYAN_INK = "var(--ExtensionEffectTypeScriptFore)"; // #0e7490

export const ACCENT_GREEN = "var(--Accent)"; // #1e742a site green (STATUS values)

/* ── Keyword -> ink (stamp text inside 〈 〉) ─────────────────────── */
export const KEYWORD_INK: Record<string, string> = {
	/* VS Code / extension-host domain -> blue (user: EXTENSION HOST blue). */
	"EXTENSION HOST": SPINE_BLUE_INK,

	"CAPABILITY HOST": SPINE_BLUE_INK,

	/* User: DUAL-TRACK orange. */
	"DUAL-TRACK": SPINE_ORANGE_INK,

	/* User: WORKBENCH gray or wood -> neutral gray. */
	WORKBENCH: INK.Gray,

	/* effect-ts blue -> the site EffectTypeScript cyan token. */
	"EFFECT-TS": EFFECT_TS_CYAN_INK,

	"EFFECT-TS LAYERS": EFFECT_TS_CYAN_INK,

	/* User: WORK-STEALING blue, SCHEDULER orange. */
	"WORK-STEALING": SPINE_BLUE_INK,

	SCHEDULER: SPINE_ORANGE_INK,

	/* Rust / native -> rust red; Tauri -> amber. */
	RUST: INK.Red,

	TAURI: TAURI_AMBER_INK,

	/* User: NATIVE BACKEND blue (Mountain stamp keyword). */
	"NATIVE BACKEND": SPINE_BLUE_INK,

	"RUST-NATIVE": INK.Red,

	"OXC PIPELINE": SPINE_ORANGE_INK,

	"REST SELECTABLE": SPINE_ORANGE_INK,

	/* Electron (the thing Land rejects) -> teal. */
	"NO ELECTRON": INK.Teal,

	/* Sky UI / webview. */
	"ASTRO UI": SPINE_PURPLE_INK,

	"WEBVIEW BRIDGE": INK.Sky,

	/* WASM sandbox domain -> purple. */
	"WASM SANDBOX": SPINE_PURPLE_INK,

	/* Service / daemon family (white card + blue text). */
	"BACKGROUND SERVICES": SPINE_BLUE_INK,

	DAEMON: SPINE_BLUE_INK,

	"LOCAL AUTHORITY": SPINE_BLUE_INK,

	"DNS SANDBOX": SPINE_BLUE_INK,

	"SERVICE WORKER": SPINE_BLUE_INK,

	"OFFLINE SHELL": SPINE_BLUE_INK,

	/* Common - pure abstract, transport-agnostic -> neutral gray. */
	"PURE ABSTRACT": INK.Gray,

	"CONTRACT CRATE": INK.Gray,

	/* Maintain - deterministic reproducible builds -> green. */
	DETERMINISTIC: SPINE_GREEN_INK,

	"BUILD ORCHESTRATOR": SPINE_ORANGE_INK,

	/* Output - esbuild primary -> yellow ink. */
	"ESBUILD PRIMARY": INK.Yellow,

	/* Vine - gRPC / contract domain -> green. */
	"GRPC BACKBONE": SPINE_GREEN_INK,

	"CONTRACT-FIRST": SPINE_GREEN_INK,

	/* Portal hero stamps. */
	"AUTHENTICATION TIERS": SPINE_BLUE_INK,

	"FOUR MODES": SPINE_ORANGE_INK,

	/* 404. */
	"NOT FOUND": INK.Gray,

	/* Release manifest platform stamps. */
	MACOS: INK.Gray,

	WINDOWS: SPINE_BLUE_INK,

	LINUX: INK.Yellow,

	/* Release phases. */
	"ACTIVE SOURCE": SPINE_GREEN_INK,

	INTEGRATION: SPINE_BLUE_INK,

	"RELEASE PREPARATION": SPINE_ORANGE_INK,

	/* Portal tier stamps. */
	"CLOUD PLAN": SPINE_BLUE_INK,

	"PROVIDER PLAN": SPINE_PURPLE_INK,

	"LOCAL-FIRST PLAN": SPINE_ORANGE_INK,

	"ENTERPRISE PLAN": INK.Gray,
};

/** Exact-match lookup; unknown keywords stay ink (null). */
export const KeywordInk = (Keyword: string): string | null => {
	const Hit = KEYWORD_INK[Keyword.toUpperCase()];

	return Hit ?? null;
};

/**
 * Stamp WORD ink (user, SideCar): multi-word stamps color per word.
 * PREBUILT -> orange, BINARY -> blue, TRIPLE -> orange,
 * PER / TARGET -> gray (so "PER TARGET" reads gray, "TRIPLE" orange).
 */
export const STAMP_WORD_INK: Record<string, string> = {
	PREBUILT: SPINE_ORANGE_INK,

	BINARY: SPINE_BLUE_INK,

	TRIPLE: SPINE_ORANGE_INK,

	PER: INK.Gray,

	TARGET: INK.Gray,
};

export const StampWordInk = (Word: string): string | null => {
	const Hit = STAMP_WORD_INK[Word.toUpperCase()];

	return Hit ?? null;
};

/** The service/daemon family: pure white card + blue stamp text. */
export const SERVICE_ELEMENTS: ReadonlySet<string> = new Set([
	"air",

	"mist",

	"worker",

	"sidecar",
]);

/* ── Element -> ink (pricing rows, name accents) ─────────────────── */
export const ELEMENT_INK: Record<string, string> = {
	Land: INK.Gray,

	Mountain: INK.Red,

	Cocoon: ACCENT_GREEN,

	Wind: INK.Gray,

	Sky: SPINE_BLUE_INK,

	Air: SPINE_BLUE_INK,

	Echo: INK.Yellow,

	Grove: SPINE_PURPLE_INK,

	Common: INK.Gray,

	Maintain: SPINE_ORANGE_INK,

	Mist: SPINE_BLUE_INK,

	Output: INK.Yellow,

	Rest: SPINE_ORANGE_INK,

	SideCar: SPINE_BLUE_INK,

	Vine: SPINE_GREEN_INK,

	Worker: SPINE_BLUE_INK,
};

/* ── Element -> card fill (Jelly) ────────────────────────────────── */
export const ELEMENT_FILL: Record<string, string> = {
	Land: "var(--Mute)", // warm creme - the editor canvas

	Mountain: "var(--ExtensionRustMute)", // red tint - rust/tauri backend

	Cocoon: "var(--SpinegRPCMute)", // green tint (user: Cocoon green)

	Wind: "var(--OSMacOSMute)", // gray tint (user: workbench gray/wood)

	Sky: "var(--SpineIPCMute)", // sky-blue tint - UI layer

	Air: "var(--Card)", // pure white - daemon service family

	Echo: "var(--OSLinuxMute)", // trumpet yellow (user)

	Grove: "var(--SpineWASMMute)", // purple tint - wasm sandbox

	Common: "var(--Mute)", // creme - pure abstract foundation

	Maintain: "var(--SpineTCPMute)", // orange tint - build orchestrator

	Mist: "var(--Card)", // pure white - service family

	Output: "var(--ToolEsBuildMute)", // esbuild yellow tint

	Rest: "var(--ToolOxcMute)", // oxc orange tint

	SideCar: "var(--Card)", // pure white - service family

	Vine: "var(--SpinegRPCMute)", // green tint - gRPC backbone

	Worker: "var(--Card)", // pure white - service family
};

/** Case-insensitive element fill lookup; null keeps hash fallback. */
export const ElementFill = (Name: string): string | null => {
	const Key = Name.toLowerCase();

	const Direct = ELEMENT_FILL[Name];

	if (Direct) return Direct;

	const Hit = Object.keys(ELEMENT_FILL).find(
		(Element) => Element.toLowerCase() === Key,
	);

	return Hit ? ELEMENT_FILL[Hit] : null;
};

/** Element ink by any case; null keeps ink fallback. */
export const ElementInk = (Name: string): string | null => {
	const Key = Name.toLowerCase();

	const Direct = ELEMENT_INK[Name];

	if (Direct) return Direct;

	const Hit = Object.keys(ELEMENT_INK).find(
		(Element) => Element.toLowerCase() === Key,
	);

	return Hit ? ELEMENT_INK[Hit] : null;
};

/* ── Route keywords -> sky blue (user spec) ──────────────────────── */
export const ROUTE_KEYWORD_INK = INK.Sky;

/* ── Platform / architecture keywords -> ink (user spec) ─────────── */
export const PLATFORM_KEYWORD_INK: Record<string, string> = {
	"UNIVERSAL BINARY": INK.Gray, // normal gray (OSMacOS family)

	"APPLE SILICON": INK.GrayDeep, // darker gray

	INTEL: SPINE_BLUE_INK, // blue

	"64-BIT": INK.BlueDeep, // different, darker blue

	X64: INK.BlueDeep, // same darker blue

	LINUX: INK.Yellow, // yellow (OSLinux family)

	DEB: SPINE_ORANGE_INK, // orange (SpineTCP)

	RPM: INK.Red, // red (ExtensionRust family)

	APPIMAGE: INK.GrayDeep, // darker gray (default)

	MACOS: INK.Gray,

	WINDOWS: SPINE_BLUE_INK,
};

/**
 * Split a platform description into colored segments.
 * Known keywords get their semantic ink; separators stay ink.
 */
export const PlatformDescriptionParts = (
	Text: string,
): Array<{ Text: string; Ink: string | null }> => {
	const Upper = Text.toUpperCase();

	const Parts: Array<{ Text: string; Ink: string | null }> = [];

	let Index = 0;

	while (Index < Text.length) {
		let Matched: { Text: string; Ink: string } | null = null;

		for (const Keyword of Object.keys(PLATFORM_KEYWORD_INK)) {
			if (
				Upper.startsWith(Keyword, Index) &&
				(Index === 0 || !/[A-Z0-9]/.test(Upper[Index - 1] ?? ""))
			) {
				Matched = {
					Text: Text.slice(Index, Index + Keyword.length),

					Ink: PLATFORM_KEYWORD_INK[Keyword],
				};

				break;
			}
		}

		if (Matched) {
			Parts.push(Matched);

			Index += Matched.Text.length;
		} else {
			Parts.push({ Text: Text[Index], Ink: null });

			Index += 1;
		}
	}

	return Parts;
};
