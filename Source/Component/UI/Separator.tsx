"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";

import * as React from "react";

import { cn } from "./Utility";

/**
 * Separator - one rule, and what it separates.
 *
 * ─── THE TWO FORMS THE KIT DID NOT HAVE ──────────────────────────────────
 * A bare hairline is a rule. The family needs the rule to be able to say what it
 * separates, because a page of unlabelled rules is a page of gaps:
 *
 *   labelled   `────── # WHAT CHANGES / 04 ──────` - the register printed in the
 *              rule, at the meta register. It is the same `#` a band prints,
 *              drawn at the scale of the seam it names.
 *   spaced     the chapter rhythm instead of the row rhythm, for a rule that ends
 *              a subject rather than a row.
 *
 * ─── WHY THE LABEL IS A SIBLING, NOT A CHILD ─────────────────────────────
 * The separator primitive is a `div` with `role="separator"`; text inside it would
 * be announced as part of the rule, which is not a thing a screen reader can read.
 * So the labelled form is a flex row: a rule, the label, a note, a rule - and each
 * piece keeps its own semantics. The two rules are decorative and carry no role;
 * the label is a paragraph and is read.
 */

interface SeparatorProps extends React.ComponentPropsWithoutRef<
	typeof SeparatorPrimitive.Root
> {
	/** `strong` draws the 20% rule - an edge, not a separator. */
	weight?: "hairline" | "strong";

	/** The chapter rhythm above and below, for a rule that ends a subject. */
	spaced?: boolean;
}

const Separator = React.forwardRef<
	React.ComponentRef<typeof SeparatorPrimitive.Root>,
	SeparatorProps
>(
	(
		{
			className,
			orientation = "horizontal",
			decorative = true,
			weight,
			spaced,
			...props
		},

		Ref,
	) => (
		<SeparatorPrimitive.Root
			ref={Ref}
			data-slot="separator-root"
			data-weight={weight}
			data-spaced={spaced ? "true" : undefined}
			decorative={decorative}
			orientation={orientation}
			className={cn(
				"shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px",
				className,
			)}
			{...props}
		/>
	),
);

Separator.displayName = "Separator";

interface SeparatorLabelProps {
	/** The register's label: `WHAT CHANGES`. */
	label: string;

	/** A figure, when the rule counts something: `04`. */
	count?: string | number;

	/** A note after the count, in the mute. */
	note?: string;

	/** Extra classes from the caller. */
	className?: string;
}

/**
 * SeparatorLabel - the rule that names what it separates.
 *
 * `# WHAT CHANGES / 04` is a register, so it prints the mark, the label, the
 * separator and the count in that order - the same order `RecordBand` and
 * `TableRegister` print. The two rules on either side are the seam itself, so the
 * label sits in the rule rather than above it.
 */
function SeparatorLabel({
	label,
	count,
	note,
	className,
}: SeparatorLabelProps) {
	return (
		<div className={cn("SeparatorLabel", className)}>
			<span className="SeparatorLabel__Rule" aria-hidden="true" />

			<p className="SeparatorLabel__Text">
				<span aria-hidden="true">#</span> {label}
				{count === undefined ? null : (
					<>
						<span aria-hidden="true"> / </span>
						<span className="SeparatorLabel__Note">{count}</span>
					</>
				)}
			</p>

			{note === undefined ? null : (
				<span className="SeparatorLabel__Note">{note}</span>
			)}

			<span className="SeparatorLabel__Rule" aria-hidden="true" />
		</div>
	);
}

export { Separator, SeparatorLabel };
