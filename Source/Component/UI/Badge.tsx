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

/**
 * Badge - one word, one ink pair, at the scale of a label.
 *
 * ─── WHAT THE FAMILY ADDED ───────────────────────────────────────────────
 * The badge is a Jelly surface with a real ink pair (the tone map below) and that
 * is a keeper. What it could not do was carry a SET:
 *
 *   count    `PROTOCOL: gRPC ␁03` - the badge's own figure, printed after U+2001
 *            at the same register. A count inside a badge is a fact, not decoration:
 *            it says how many things that ink is the ink of, and the caller derives
 *            it from the array it counts.
 *   mark     a dot, when the claim has no glyph of its own - the same mark
 *            `DownloadMasthead` prints beside a claim without an icon.
 *   size     `meta` (the register's 24px) or `standard` (30px). Two sizes, because
 *            the site has two: a mark beside a field and a mark in a masthead.
 *   group    `BadgeGroup` - a row of badges and the one that says how many are not
 *            shown. The `+N` is derived, never passed.
 *
 * ─── THE INK IS THE IDENTITY ─────────────────────────────────────────────
 * `grpc` is green because it IS gRPC, `tauri` is amber because it is Tauri. The
 * colour is the claim's own, and the accent is not spent here - the accent
 * authenticates a route, a link, a focus and a seal, and a badge is none of those.
 */

export interface BadgeProps
	extends
		React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof BadgeVariants> {
	/** A named ink pair: the badge paints as a Jelly surface, not an outline. */
	tone?: BadgeTone;

	/** The mark's size. `meta` is the register's 24px; `standard` is 30px. */
	size?: "meta" | "standard";

	/**
	 * A leading mark, when the claim has no glyph: `dot` prints the site's 6px
	 * square in the badge's own ink. A React node is printed verbatim (a glyph).
	 */
	mark?: "dot" | React.ReactNode;

	/** The badge's own figure, printed after U+2001 at the same register. */
	count?: string | number;
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
	(
		{
			className,
			variant = "default",
			tone,
			size,
			mark,
			count,
			children,
			...props
		},

		ref,
	) => {
		const jelly = JellyBadgeVariant[variant];

		const ink = tone ? JellyBadgeTone[tone] : undefined;

		return (
			<jelly-badge
				ref={ref as unknown as React.Ref<HTMLElement>}
				variant={ink ? ink.variant : jelly.variant}
				shape="square"
				size={size === "standard" ? "large" : undefined}
				outline={!ink && variant === "outline" ? true : undefined}
				className={className}
				style={
					{
						"--jelly-fill": ink ? `var(${ink.fill})` : jelly.fill,
						"--jelly-label": ink
							? `var(${ink.label})`
							: jelly.label,
						"--jelly-badge-radius": "0",
						"--jelly-badge-font-size":
							ink || size === "meta" ? "13px" : "inherit",
						"--jelly-color-border-default": ink
							? `var(${ink.base})`
							: variant === "outline"
								? "var(--Border)"
								: "transparent",
					} as React.CSSProperties
				}
				{...props}
			>
				{mark === undefined ? null : (
					<span
						className="Badge__Mark"
						data-kind={mark === "dot" ? "dot" : "glyph"}

						aria-hidden={mark === "dot" ? "true" : undefined}
					>
						{mark === "dot" ? null : mark}
					</span>
				)}

				{children}

				{count === undefined ? null : (
					<span className="Badge__Count">{count}</span>
				)}
			</jelly-badge>
		);
	},
);

Badge.displayName = "Badge";

interface BadgeGroupProps {
	/** The badges, in the order they are read. */
	items: readonly React.ReactNode[];

	/** How many are shown before the `+N`. Default 4. */
	max?: number;

	/** Extra classes from the caller. */
	className?: string;
}

/**
 * BadgeGroup - a row of marks, and how many are not shown.
 *
 * The `+N` is the array's own arithmetic: `items.length - shown`. A caller that
 * passed the figure would be a caller that could disagree with the set.
 */
function BadgeGroup({ items, max = 4, className }: BadgeGroupProps) {
	const Shown = items.slice(0, max);

	const Rest = items.length - Shown.length;

	return (
		<span className={cn("BadgeGroup", className)}>
			{Shown.map((Item, Index) => (
				<React.Fragment key={Index}>{Item}</React.Fragment>
			))}

			{Rest > 0 ? (
				<span className="BadgeGroup__More">{`+${Rest}`}</span>
			) : null}
		</span>
	);
}

export { BadgeVariants, BadgeGroup };
