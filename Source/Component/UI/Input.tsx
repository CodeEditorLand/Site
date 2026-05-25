import React from "react";

import { cn } from "./Utility";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type = "text", ...props }, ref) => {
		return (
			<input
				ref={ref}
				type={type}
				className={cn(
					"bg-[var(--Mute)] px-3 py-2 ring-offset-[var(--Background)] file:border-0 file:bg-transparent file:font-medium placeholder:text-[var(--MuteForeground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--Ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				{...props}
			/>
		);
	},
);

Input.displayName = "Input";
