import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "./Utility";

const ButtonVariants = cva(
	"inline-flex items-center justify-center gap-0 whitespace-nowrap rounded-[var(--RadiusButton)] font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[var(--Ring)]/40 focus-visible:ring-[2px] aria-invalid:ring-[var(--Destruct)]/20",
	{
		variants: {
			variant: {
				default:
					"bg-[var(--Foreground)] text-[var(--Background)] hover:bg-[var(--Foreground)]/85",
				destructive:
					"bg-[var(--Destruct)] text-white hover:bg-[var(--Destruct)]/85 focus-visible:ring-[var(--Destruct)]/20",
				outline:
					"bg-[var(--Background)] text-[var(--Foreground)] hover:bg-[var(--Mute)]",
				secondary:
					"bg-[var(--Secondary)] text-[var(--SecondaryForeground)] hover:bg-[var(--Surface3)]",
				ghost: "text-[var(--Foreground)] hover:bg-[var(--Mute)]",
				link: "text-[var(--Foreground)] underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-[2.1rem] py-2 has-[>svg]:px-[1.8rem]",
				sm: "h-8 gap-0 px-3 has-[>svg]:px-2.5",
				lg: "h-10 px-[2.6rem] has-[>svg]:px-[2.2rem]",
				icon: "size-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof ButtonVariants> {
	asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				data-slot="button"
				ref={ref}
				className={cn(ButtonVariants({ variant, size, className }))}
				{...props}
			/>
		);
	},
);

Button.displayName = "Button";

export { ButtonVariants };
