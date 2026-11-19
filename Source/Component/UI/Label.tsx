import React from "react";

import { cn } from "./Utility";

/**
 * Label - the word that names a control.
 *
 * The kit's primitive, with `data-slot="label"` published so the family's rules
 * can address it and so every part of the input family carries the kit's one
 * stable contract.
 *
 * ─── THE TWO CONDITIONS IT CAN CARRY ──────────────────────────────────────
 * `aria-required` and `aria-disabled` are the label's own facts, not only the
 * control's: a reader who lands on the name before the box needs to know the
 * field is required, and a label on a disabled control has to say so in the same
 * breath as the name. `DynamicLabel` already passes both; this file states that
 * it may, and why - a label is a fact about the control, and it does not borrow
 * the control's attributes to be one.
 *
 * A `<Field>` composes its own name (`Field__Label`) so it can print the field's
 * register beside it; this primitive stays what it is, for the surfaces that
 * want a bare name.
 */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
	({ className, ...props }, ref) => {
		return (
			<label
				ref={ref}
				data-slot="label"
				className={cn(
					"font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
					className,
				)}
				{...props}
			/>
		);
	},
);

Label.displayName = "Label";
