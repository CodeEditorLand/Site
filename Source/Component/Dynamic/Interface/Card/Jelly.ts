/**
 * Jelly surface mapping for the element card series (Under-the-Hood
 * masonry + Features grid).
 *
 * C17 semantic pass: the KNOWN elements get deterministic per-element fills
 * from the semantic map (Cocoon green, Echo yellow, service family white, ...),
 * never a hash. An id the map does not know takes the neutral insert - the
 * adverse state is printed, not painted (see "THE UNMAPPED ELEMENT" below).
 * Role-chip badge fills follow the keyword domain map (WORK-STEALING blue,
 * SCHEDULER orange, WASM purple, ...), and an unmatched domain claims none.
 */

import type { CSSProperties } from "react";

import { ElementFill } from "../../../../Function/Theme/SemanticColor";

/** Light card fills: --Card white, --Mute creme, the 18%-on-white *Mute tints. */
export const JELLY_CARD_FILLS: readonly string[] = [
	"var(--Card)", // white

	"var(--Mute)", // creme

	"var(--SpinegRPCMute)", // green tint

	"var(--SpineIPCMute)", // blue tint

	"var(--SpineTCPMute)", // orange tint

	"var(--SpineWASMMute)", // purple tint
];

/**
 * Chip fills: the same light vocabulary minus pure white - a white chip on
 * a white card shell would disappear, so the role chips run creme plus the
 * four *Mute tints. Dark ink labels on every fill either way.
 */
export const JELLY_BADGE_FILLS: readonly string[] = [
	"var(--Mute)", // creme

	"var(--SpinegRPCMute)", // green tint

	"var(--SpineIPCMute)", // blue tint

	"var(--SpineTCPMute)", // orange tint

	"var(--SpineWASMMute)", // purple tint
];

/**
 * Semantic badge fill rules - ordered, first match wins, uppercase.
 * Each keyword domain maps to the *Mute tint of its hue (collage method:
 * the chip fill follows what the keyword means, not a hash).
 */
const BADGE_FILL_RULES: ReadonlyArray<readonly [string, string]> = [
	["WASM", "var(--SpineWASMMute)"],

	["SANDBOX", "var(--SpineWASMMute)"],

	["RUNTIME", "var(--SpineWASMMute)"],

	["ISOLATION", "var(--SpineWASMMute)"],

	["CAPABILITY", "var(--SpineWASMMute)"],

	["ASTRO", "var(--ExtensionAstroMute)"],

	["VISUAL", "var(--ExtensionAstroMute)"],

	["GRPC", "var(--SpinegRPCMute)"],

	["PROTO", "var(--SpinegRPCMute)"],

	["CONTRACT", "var(--SpinegRPCMute)"],

	["WORK-STEALING", "var(--SpineIPCMute)"],

	["SCHEDUL", "var(--SpineTCPMute)"],

	["CROSSBEAM", "var(--SpineIPCMute)"],

	["DEQUE", "var(--SpineIPCMute)"],

	["EXTENSION", "var(--SpineIPCMute)"],

	["VS CODE", "var(--SpineIPCMute)"],

	["WORKBENCH", "var(--SpineIPCMute)"],

	["WORKER", "var(--SpineIPCMute)"],

	["TYPESCRIPT", "var(--SpineIPCMute)"],

	["WEBVIEW", "var(--SpineIPCMute)"],

	["WEB", "var(--SpineIPCMute)"],

	["DNS", "var(--SpineIPCMute)"],

	["NETWORK", "var(--SpineIPCMute)"],

	["RESOLUTION", "var(--SpineIPCMute)"],

	["EFFECT", "var(--ExtensionEffectTypeScriptMute)"],

	["LAYER", "var(--ExtensionEffectTypeScriptMute)"],

	["TAURI", "var(--ExtensionTauriMute)"],

	["RUST", "var(--ExtensionRustMute)"],

	["NATIVE", "var(--ExtensionRustMute)"],

	["ELECTRON", "var(--ExtensionElectronMute)"],

	["OXC", "var(--ToolOxcMute)"],

	["ORCHESTR", "var(--SpineTCPMute)"],

	["PIPELINE", "var(--SpineTCPMute)"],

	["COMPILE", "var(--SpineTCPMute)"],

	["TRANSFORM", "var(--SpineTCPMute)"],

	["BUILD", "var(--SpineTCPMute)"],

	["DOWNLOAD", "var(--ExtensionTauriMute)"],

	["INDEX", "var(--ExtensionTauriMute)"],

	["BACKGROUND", "var(--ExtensionTauriMute)"],

	["SERVICE", "var(--ExtensionTauriMute)"],

	["NODE", "var(--RuntimeNodeMute)"],

	["BINARY", "var(--RuntimeNodeMute)"],

	["OFFLINE", "var(--PlatformWebMute)"],

	["CACHE", "var(--PlatformWebMute)"],

	["CSS", "var(--PlatformWebMute)"],

	["PLUGIN", "var(--ToolEsBuildMute)"],

	["TARGET", "var(--OSMacOSMute)"],

	["TRIPLE", "var(--OSMacOSMute)"],

	["PROFILE", "var(--OSMacOSMute)"],

	["CONFIG", "var(--OSMacOSMute)"],

	["FOUNDATION", "var(--OSMacOSMute)"],

	["TRAIT", "var(--OSMacOSMute)"],

	["TYPE", "var(--OSMacOSMute)"],
];

/**
 * THE UNMAPPED ELEMENT - the ink surface's adverse state.
 *
 * A hue chosen by hashing the element's or the badge's name (FNV-1a) is an
 * invented colour: no reader can decode it, two names that hash alike get one
 * hue, and it collides with the spine palette where a hue MEANS a protocol. It
 * is the exact defect this palette exists to prevent: "when a shade drifts, it
 * looks approximate". A card whose element the system does not know takes the
 * neutral insert (`--Card`, the white information box), and a badge whose
 * domain the rules do not match takes `--Mute` (the creme recess). Both are
 * honest: the surface says "this is a record, and this badge claims no domain"
 * instead of claiming one at random.
 *
 * A caller that needs a stable ORDER rather than a stable colour sorts by name,
 * which is legible, and the two predicates below are how a caller prints the
 * absence instead of painting it.
 */
export const JellyCardFill = (Id: string): string =>
	ElementFill(Id) ?? "var(--Card)";

/** Keyword-domain fill first; an unmatched label claims no domain. */
export const JellyBadgeFill = (Label: string): string => {
	const Upper = Label.toUpperCase();

	for (const [Rule, Fill] of BADGE_FILL_RULES) {
		if (Upper.includes(Rule)) return Fill;
	}

	return "var(--Mute)";
};

/** Whether the palette knows this element at all - the fact a caller prints as
 *  `◎ UNMAPPED` when it wants to say so rather than only paint the fallback. */
export const JellyCardMapped = (Id: string): boolean =>
	ElementFill(Id) !== null;

/** Whether the badge rules claim this label's domain. */
export const JellyBadgeMapped = (Label: string): boolean => {
	const Upper = Label.toUpperCase();

	return BADGE_FILL_RULES.some(([Rule]) => Upper.includes(Rule));
};

/**
 * Shared jelly-card surface: per-card fill from the element id, flat
 * radius 0, the site hairline (--Border) via Jelly's canvas border, and
 * zero internal padding - the hosts keep their Tailwind `p-5` on the
 * element, and the canvas fill spans the whole card (the jelly box is the
 * host's full border-box).
 */
export const JellyCardStyle = (Id: string): CSSProperties =>
	({
		"--jelly-fill": JellyCardFill(Id),
		"--jelly-radius": "0",
		"--jelly-color-border-default": "var(--Border)",
		"--jelly-card-padding-block": "0",
		"--jelly-card-padding-inline": "0",
		"--jelly-card-font-size": "inherit",
	}) as CSSProperties;

/**
 * Role-chip badge surface: light fill from the chip label, dark ink label
 * (--CardForeground), square corners (radius 0), 14px mono text - Jelly's
 * `:host` defaults (sans display face, 640 weight) are overridden inline
 * to keep the ledger's IBM Plex Mono / JetBrains Mono typography.
 */
export const JellyBadgeStyle = (Label: string): CSSProperties =>
	({
		"--jelly-fill": JellyBadgeFill(Label),
		"--jelly-label": "var(--CardForeground)",
		"--jelly-badge-radius": "0",
		"--jelly-badge-font-size": "14px",
		"font-family": "var(--FontMono)",
		"font-weight": "400",
	}) as CSSProperties;
