import React from "react";

import { cn } from "./Utility";

/**
 * Input - one line of text.
 *
 * The kit's primitive with `data-slot="input"` published, which is the whole
 * difference between a kit input and this site's input.
 *
 * ─── WHY THE ATTRIBUTE MATTERS ────────────────────────────────────────────
 * `data-slot` is the kit's stable contract, and every primitive in this directory
 * publishes it. `System/State/_Field.scss` keys the input family's whole state
 * vocabulary on the attribute - rest, hover, the 2px accent ring at 4px offset, the
 * 2px destructive rule on the leading edge, the disabled wash, the read-only
 * exemption from the ring - so an `Input` that does not publish it takes none of
 * those rules and falls back to the kit's own shadow-ring vocabulary: a 3px glow
 * where the site draws an outline, and a 50 % label where the site keeps the value
 * readable.
 *
 * The attribute is additive - it names a part that was always this part - and it is
 * what lets a `<Field>` neutralise the primitive's own surface with one scoped rule
 * instead of ten.
 *
 * The Tailwind string below is the kit's surface and stays: outside a field the
 * primitive is a `--Mute` box on a white card, which is the account screens' design.
 * Inside a `.Field` the box is the field's, and `UI/_Input.scss` strips the primitive
 * back to its value.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type = "text", ...props }, ref) => {
		return (
			<input
				ref={ref}
				type={type}
				data-slot="input"
				className={cn(
					"bg-mute px-3 py-2 ring-offset-[var(--Background)] file:border-0 file:bg-transparent file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--Ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				{...props}
			/>
		);
	},
);

Input.displayName = "Input";
