/**
 * Jelly surface mapping for the element card series (Under-the-Hood
 * masonry + Features grid).
 *
 * Deterministic color-coded fills: FNV-1a hash of the element id indexes
 * into a light-only palette so every card keeps the dark-ink ledger text
 * readable (Daylight Field Record rule: light fills + dark ink, radius 0).
 * A pure function of the id string - stable across renders and hydration,
 * no flicker, no layout shift.
 */

import type { CSSProperties } from "react";

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

/** FNV-1a 32-bit hash - deterministic and well distributed across ids. */
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

export const JellyCardFill = (Id: string): string => Pick(Id, JELLY_CARD_FILLS);

export const JellyBadgeFill = (Label: string): string =>
	Pick(Label, JELLY_BADGE_FILLS);

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
	} as CSSProperties);

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
	} as CSSProperties);