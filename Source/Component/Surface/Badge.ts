/**
 * Badge - the ink table for the dashboard's state words.
 *
 * The dashboard states twelve words about itself - `Disabled`, `Feature
 * Gated`, `Optional`, `Active`, `Recommended`, `Online`, `OAuth`, `Local`,
 * `SSO`, `Not Connected`, `Coming Soon`, `Manage` - and each one sits on a
 * Jelly badge tinted from the semantic token of the thing it describes. The
 * words never change with the tint; the tint never changes with the word.
 *
 * The table is here rather than in the page because two files need the same
 * four values per tone: the badge component that prints them, and the content
 * table that names the tone. A tone that exists in one and not the other is
 * how a badge ends up flat grey.
 *
 * `variant` is Jelly's own palette name. The fill and the label are overridden
 * with our tokens anyway, so the palette name only decides the soft-body
 * shading - but it still has to be a name Jelly knows, or the element falls
 * back to its default and the badge stops looking like a badge.
 */

/** The tint a state word carries. */
export type BadgeTone = "grpc" | "mute" | "ipc" | "tauri" | "wasm" | "tcp";

/** The four values one tone resolves to. */
export interface BadgeInk {
	/** The badge's fill token, without the `var(--...)` wrapper. */
	readonly fill: string;

	/** The badge's label token, without the `var(--...)` wrapper. */
	readonly label: string;

	/** Jelly's palette name for the soft-body shading. */
	readonly variant: string;

	/** The status dot's token, without the `var(--...)` wrapper. */
	readonly dot: string;
}

/** Every tone the dashboard prints. */
export const BadgeInk: Record<BadgeTone, BadgeInk> = {
	grpc: {
		fill: "SpinegRPCMute",
		label: "SpinegRPCFore",
		variant: "mint",
		dot: "SpinegRPC",
	},
	mute: {
		fill: "Mute",
		label: "MuteForeground",
		variant: "platinum",
		dot: "MuteForeground",
	},
	ipc: {
		fill: "SpineIPCMute",
		label: "SpineIPCFore",
		variant: "azure",
		dot: "SpineIPC",
	},
	tauri: {
		fill: "ExtensionTauriMute",
		label: "ExtensionTauriFore",
		variant: "amber",
		dot: "ExtensionTauri",
	},
	wasm: {
		fill: "SpineWASMMute",
		label: "SpineWASMFore",
		variant: "platinum",
		dot: "SpineWASM",
	},
	tcp: {
		fill: "SpineTCPMute",
		label: "SpineTCPFore",
		variant: "platinum",
		dot: "SpineTCP",
	},
};
