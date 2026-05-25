import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "./Utility";

const BadgeVariants = cva(
	"inline-flex items-center rounded-none border px-4 py-1.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--Ring)] focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-[var(--Primary)] text-[var(--PrimaryForeground)] hover:opacity-80",
				secondary:
					"border-transparent bg-[var(--Secondary)] text-[var(--SecondaryForeground)] hover:opacity-80",
				destructive:
					"border-transparent bg-[var(--Destruct)] text-[var(--DestructForeground)] hover:opacity-80",
				outline: "text-[var(--Foreground)]",
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
		VariantProps<typeof BadgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
	({ className, variant, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={cn(BadgeVariants({ variant }), className)}
				{...props}
			/>
		);
	},
);

Badge.displayName = "Badge";

export { BadgeVariants };
