import { cva, type VariantProps } from "class-variance-authority";

import React from "react";

import { cn } from "./Utility";

const BadgeVariants = cva(
	"inline-flex items-center rounded-none border px-4 py-1.5 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--Ring)] focus:ring-offset-2",

	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-fg hover:opacity-80",
				secondary:
					"border-transparent bg-secondary text-secondary-fg hover:opacity-80",
				destructive:
					"border-transparent bg-destruct text-destruct-fg hover:opacity-80",
				outline: "text-card-fg",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
	extends
		React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof BadgeVariants> {
	/** A named ink pair: the badge paints as a Jelly surface, not an outline. */
	tone?: BadgeTone;
}

// Jelly variant mapping: our semantic names → Jelly's palette names.
// Jelly's built-in palette is NOT used - we override --jelly-fill and
// --jelly-label with our design tokens via inline style so the soft-body
// canvas paints in our exact colours instead of Jelly's default palette.
const JellyBadgeVariant: Record<
	NonNullable<BadgeProps["variant"]>,
	{ variant: string; fill: string; label: string }
> = {
	default: {
		variant: "graphite",

		fill: "var(--Primary)",

		label: "var(--PrimaryForeground)",
	},

	secondary: {
		variant: "platinum",

		fill: "var(--Secondary)",

		label: "var(--SecondaryForeground)",
	},

	destructive: {
		variant: "rose",

		fill: "var(--Destruct)",

		label: "var(--DestructForeground)",
	},

	outline: {
		variant: "platinum",

		fill: "transparent",

		label: "var(--Foreground)",
	},
};

// Tone: a named ink pair from the palette (protocol spine / extension family).
// A toned badge is a Jelly surface with a real fill, not an outlined label -
// that is the difference between a mark and a piece of text.
export type BadgeTone =
	| "grpc"
	| "ipc"
	| "tcp"
	| "wasm"
	| "rust"
	| "tauri"
	| "effect"
	| "electron"
	| "quiet"
	| "accent";

const JellyBadgeTone: Record<
	BadgeTone,
	{ variant: string; base: string; fill: string; label: string }
> = {
	grpc: {
		variant: "mint",

		base: "--SpinegRPC",

		fill: "--SpinegRPCMute",

		label: "--SpinegRPCFore",
	},

	ipc: {
		variant: "azure",

		base: "--SpineIPC",

		fill: "--SpineIPCMute",

		label: "--SpineIPCFore",
	},

	tcp: {
		variant: "amber",

		base: "--SpineTCP",

		fill: "--SpineTCPMute",

		label: "--SpineTCPFore",
	},

	wasm: {
		variant: "violet",

		base: "--SpineWASM",

		fill: "--SpineWASMMute",

		label: "--SpineWASMFore",
	},

	rust: {
		variant: "azure",

		base: "--ExtensionRust",

		fill: "--ExtensionRustMute",

		label: "--ExtensionRustFore",
	},

	tauri: {
		variant: "amber",

		base: "--ExtensionTauri",

		fill: "--ExtensionTauriMute",

		label: "--ExtensionTauriFore",
	},

	effect: {
		variant: "platinum",

		base: "--ExtensionEffectTypeScript",

		fill: "--ExtensionEffectTypeScriptMute",

		label: "--ExtensionEffectTypeScriptFore",
	},

	electron: {
		variant: "violet",

		base: "--ExtensionElectron",

		fill: "--ExtensionElectronMute",

		label: "--ExtensionElectronFore",
	},

	quiet: {
		variant: "platinum",

		base: "--Border",

		fill: "--Mute",

		label: "--MuteForeground",
	},

	accent: {
		variant: "mint",

		base: "--Accent",

		fill: "--AccentDetail",

		label: "--AccentForeground",
	},
};

export const BadgeTones = Object.keys(JellyBadgeTone) as BadgeTone[];

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
	({ className, variant = "default", tone, children, ...props }, ref) => {
		const jelly = JellyBadgeVariant[variant];

		const ink = tone ? JellyBadgeTone[tone] : undefined;

		return (
			<jelly-badge
				ref={ref as unknown as React.Ref<HTMLElement>}
				variant={ink ? ink.variant : jelly.variant}
				shape="square"
				outline={!ink && variant === "outline" ? true : undefined}
				className={className}
				style={
					{
						"--jelly-fill": ink ? `var(${ink.fill})` : jelly.fill,
						"--jelly-label": ink
							? `var(${ink.label})`
							: jelly.label,
						"--jelly-badge-radius": "0",
						"--jelly-badge-font-size": ink ? "13px" : "inherit",
						"--jelly-color-border-default": ink
							? `var(${ink.base})`
							: variant === "outline"
								? "var(--Border)"
								: "transparent",
					} as React.CSSProperties
				}
				{...props}
			>
				{children}
			</jelly-badge>
		);
	},
);

Badge.displayName = "Badge";

export { BadgeVariants };
