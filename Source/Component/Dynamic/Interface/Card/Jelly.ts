/**
 * Jelly surface mapping for the element card series (Under-the-Hood
 * masonry + Features grid).
 *
 * C17 semantic pass: the KNOWN elements get deterministic per-element
 * fills from the semantic map (Cocoon green, Echo yellow, service family
 * white, ...) instead of the old FNV-1a random distribution. Unknown ids
 * still fall back to the FNV-1a hash over the light palette - deterministic,
 * stable across renders and hydration, no flicker, no layout shift.
 * Role-chip badge fills follow the keyword domain map (WORK-STEALING blue,
 * SCHEDULER orange, WASM purple, ...), hash as fallback.
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

/** FNV-1a 32-bit hash - deterministic fallback for unknown ids/labels. */
const Hash = (Input: string): number => {
	let Value = 2166136261;

	for (let i = 0; i < Input.length; i++) {
		Value ^= Input.charCodeAt(i);

		Value = Math.imul(Value, 16777619);
	}

	return Value >>> 0;
};

const Pick = (Input: string, Palette: readonly string[]): string =>
	Palette[Hash(Input) % Palette.length];

/** Semantic element fill first, FNV-1a hash fallback for unknown ids. */
export const JellyCardFill = (Id: string): string =>
	ElementFill(Id) ?? Pick(Id, JELLY_CARD_FILLS);

/** Keyword-domain fill first, FNV-1a hash fallback for unknown labels. */
export const JellyBadgeFill = (Label: string): string => {
	const Upper = Label.toUpperCase();

	for (const [Rule, Fill] of BADGE_FILL_RULES) {
		if (Upper.includes(Rule)) return Fill;
	}

	return Pick(Label, JELLY_BADGE_FILLS);
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
