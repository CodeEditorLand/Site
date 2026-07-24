import { Slot } from "@radix-ui/react-slot";

import { cva, type VariantProps } from "class-variance-authority";

import React from "react";

import { cn } from "./Utility";

// Original look (radius, colors, sizing) is unchanged - only the physics/
// motion layer is Jelly's. The CSS-rendered paths below ("ghost"/"link" have
// no filled-blob equivalent in Jelly; asChild can't wrap an <a> in a custom
// element's shadow DOM; anything with a caller-supplied `style` needs plain
// background/border/color) keep our existing look exactly as it was.
const ButtonVariants = cva(
	"inline-flex items-center justify-center gap-0 whitespace-nowrap select-none touch-manipulation rounded-[var(--RadiusButton)] font-medium transition-[background-color,color,transform] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[var(--Ring)]/40 focus-visible:ring-[2px] aria-invalid:ring-[var(--Destruct)]/20",

	{
		variants: {
			variant: {
				default:
					"bg-foreground text-bg hover:bg-foreground/85",
				destructive:
					"bg-destruct text-destruct-fg hover:bg-destruct/85 focus-visible:ring-[var(--Destruct)]/20",
				outline:
					"bg-background text-fg hover:bg-mute",
				secondary:
					"bg-secondary text-secondary-fg hover:bg-surface3",
				ghost: "text-fg hover:bg-mute",
				link: "text-fg underline-offset-4 hover:underline",
			},
			size: {
				default: "h-10 px-[2.1rem] py-2 has-[>svg]:px-[1.8rem]",
				sm: "h-9 gap-0 px-3 has-[>svg]:px-2.5",
				lg: "h-11 px-[2.6rem] has-[>svg]:px-[2.2rem]",
				icon: "size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

// jelly-button/jelly-icon-button paint their fill on an internal canvas
// driven entirely by these CSS custom properties (confirmed against the
// real dist/jelly.js - not guessed) - overriding them per-button (rather
// than the shared <jelly-theme>) re-points Jelly's named color/radius/size
// slots at our own tokens with zero cross-button bleed, so real physics
// buttons render pixel-for-pixel in our palette and geometry, not Jelly's.
const JellyColorOverride: Partial<
	Record<NonNullable<ButtonProps["variant"]>, Record<string, string>>
> = {
	default: {
		"--jelly-color-background-accent": "var(--Foreground)",
		"--jelly-color-foreground-on-accent": "var(--Background)",
	},
	destructive: {
		"--jelly-color-background-rose": "var(--Destruct)",
		"--jelly-color-foreground-on-emphasis": "var(--DestructForeground)",
	},
	outline: {
		"--jelly-color-background-neutral": "var(--Background)",
		"--jelly-color-foreground-on-neutral": "var(--Foreground)",
	},
	secondary: {
		"--jelly-color-background-neutral-emphasis": "var(--Secondary)",
		"--jelly-color-foreground-on-emphasis": "var(--SecondaryForeground)",
	},
};

// Matches h-8/h-9/h-10 + their px-* paddings so the real jelly-button
// renders at our existing dimensions instead of Jelly's own 62px/168px
// medium preset.
const JellySizeOverride: Partial<
	Record<NonNullable<ButtonProps["size"]>, Record<string, string>>
> = {
	default: {
		"--jelly-button-height": "40px",
		"--jelly-button-padding-inline": "2.1rem",
		"--jelly-button-min-width": "0px",
	},
	sm: {
		"--jelly-button-height": "36px",
		"--jelly-button-padding-inline": "0.75rem",
		"--jelly-button-min-width": "0px",
	},
	lg: {
		"--jelly-button-height": "44px",
		"--jelly-button-padding-inline": "2.6rem",
		"--jelly-button-min-width": "0px",
	},
	icon: {
		"--jelly-icon-button-size": "40px",
	},
};

export interface ButtonProps
	extends
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof ButtonVariants> {
	asChild?: boolean;
}

// Our "default"/"destructive"/"outline"/"secondary" fills map onto Jelly's
// named variant tones; "default" is left unset so it resolves to Jelly's own
// accent token rather than a hardcoded color.
const JellyVariantAttribute: Partial<
	Record<
		NonNullable<ButtonProps["variant"]>,
		"rose" | "platinum" | "graphite"
	>
> = {
	destructive: "rose",
	outline: "platinum",
	secondary: "graphite",
};

const JellySizeAttribute: Partial<
	Record<NonNullable<ButtonProps["size"]>, "sm" | "md" | "lg">
> = {
	default: "md",
	sm: "sm",
	lg: "lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant = "default",
			size = "default",
			asChild = false,
			children,
			...props
		},
		ref,
	) => {
		if (asChild) {
			return (
				<Slot
					data-slot="button"
					ref={ref}
					className={cn(ButtonVariants({ variant, size, className }))}
					{...props}
					// asChild almost always wraps an <a> (nav/CTA links styled
					// as buttons) - browsers make anchors draggable by default,
					// which shows the native "drag a link" ghost cursor/touch
					// gesture instead of a button press. Force it off so these
					// feel touch/click-able like the real jelly-button
					// elements next to them, not like a plain link.
					draggable={false}
				>
					{children}
				</Slot>
			);
		}

		// "ghost"/"link" have no filled-blob equivalent in Jelly, and inline
		// `style` (per-tenant branding colors on Portal/SSO CTAs) targets a
		// plain element's background/border/color - a real jelly-button
		// paints its fill on an internal canvas from theme tokens and would
		// silently ignore those overrides. Both cases keep the CSS button.
		if (variant === "ghost" || variant === "link" || props.style) {
			return (
				<button
					data-slot="button"
					ref={ref}
					className={cn(ButtonVariants({ variant, size, className }))}
					{...props}
				>
					{children}
				</button>
			);
		}

		// jelly-button/jelly-icon-button are plain HTMLElements, not
		// HTMLButtonElements - forwardRef's generic stays HTMLButtonElement
		// (nothing forwards a ref through Button today) so callers keep the
		// same public type; this cast only satisfies the JSX ref prop below.
		const JellyRef = ref as unknown as React.Ref<HTMLElement>;

		if (size === "icon") {
			return (
				<jelly-icon-button
					data-slot="button"
					ref={JellyRef}
					variant={JellyVariantAttribute[variant]}
					label={props["aria-label"]}
					className={className}
					style={
						{
							"--jelly-icon-button-radius": "var(--RadiusButton)",
							...JellySizeOverride.icon,
							...JellyColorOverride[variant],
						} as React.CSSProperties
					}
					{...props}
				>
					{children}
				</jelly-icon-button>
			);
		}

		return (
			<jelly-button
				data-slot="button"
				ref={JellyRef}
				variant={JellyVariantAttribute[variant]}
				size={JellySizeAttribute[size ?? "default"]}
				block={className?.includes("w-full") || undefined}
				className={className}
				style={
					{
						"--jelly-button-radius": "var(--RadiusButton)",
						...JellySizeOverride[size ?? "default"],
						...JellyColorOverride[variant],
					} as React.CSSProperties
				}
				{...props}
			>
				{children}
			</jelly-button>
		);
	},
);

Button.displayName = "Button";

export { ButtonVariants };
