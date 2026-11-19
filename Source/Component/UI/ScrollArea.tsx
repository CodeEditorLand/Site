"use client";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import * as React from "react";

import { cn } from "./Utility";

/**
 * ScrollArea - a window onto content taller than its frame.
 *
 * ─── THREE THINGS THE KIT DID NOT HAVE ───────────────────────────────────
 *
 *   A FRAME     the frame div's one hairline, so a scroll area is an inset on the
 *               field rather than a region of the page that happens to be shorter
 *               than its content. The hairline is on `.ScrollAreaFrame`, not on the
 *               viewport, because the head above the viewport is inside the frame.
 *   A FIGURE    `# LEDGER / 24 ROWS` above the frame. A reader cannot see how much
 *               is behind the fold, and a scrollbar's length is a proportion, not a
 *               count. `ScrollAreaFrame` prints the count and the "more" mark.
 *   A PRINT RULE  paper has no scroll. The viewport opens in print and every row
 *               prints - a scroll that hides rows on paper is a document with
 *               missing rows, which is the one thing a dossier may not have.
 *
 * ─── THE THUMB IS A RULE ─────────────────────────────────────────────────
 * No pill, no radius, no fade: the thumb is the `--Divider` rule (`--state-rule-strong`,
 * 20 % ink) in the 10px track less its 1px padding, so it reads 8px wide - a rule, not
 * a lozenge. The scroll area is an instrument, and an instrument's parts are rules.
 */

function ScrollArea({
	className,
	children,
	...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
	return (
		<ScrollAreaPrimitive.Root
			data-slot="scroll-area"
			className={cn("relative", className)}
			{...props}
		>
			<ScrollAreaPrimitive.Viewport
				data-slot="scroll-area-viewport"
				className="size-full rounded-none outline-none transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-[color-mix(in_srgb,var(--Ring)_50%,transparent)]"
			>
				{children}
			</ScrollAreaPrimitive.Viewport>
			<ScrollBar />
			<ScrollAreaPrimitive.Corner />
		</ScrollAreaPrimitive.Root>
	);
}

function ScrollBar({
	className,
	orientation = "vertical",
	...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
	return (
		<ScrollAreaPrimitive.ScrollAreaScrollbar
			data-slot="scroll-area-scrollbar"
			orientation={orientation}
			className={cn(
				"flex touch-none select-none p-px transition-colors",
				orientation === "vertical" &&
					"h-full w-2.5 border-l border-l-transparent",
				orientation === "horizontal" &&
					"h-2.5 flex-col border-t border-t-transparent",
				className,
			)}
			{...props}
		>
			<ScrollAreaPrimitive.ScrollAreaThumb
				data-slot="scroll-area-thumb"
				className="flat relative flex-1 bg-border"
			/>
		</ScrollAreaPrimitive.ScrollAreaScrollbar>
	);
}

interface ScrollAreaFrameProps {
	/** The set's name: `LEDGER` prints as `# LEDGER / 24 ROWS`. */
	label: string;

	/** How many rows are behind the fold. The caller's figure, never derived. */
	count: string | number;

	/** What the count counts: `ROWS`, `ENTRIES`, `LINES`. */
	unit?: string;

	/** The frame's height. A scroll area with no height is not one. */
	height?: string;

	/** The content. */
	children: React.ReactNode;

	/** Extra classes from the caller. */
	className?: string;
}

/**
 * ScrollAreaFrame - the framed scroll area, with its register.
 *
 * The register is above the frame and outside the viewport, so it does not scroll
 * away with the rows it counts. That is the whole reason this wrapper exists: a
 * count inside the scroll would be a count the reader loses at the first wheel
 * turn.
 */
function ScrollAreaFrame({
	label,
	count,
	unit = "ROWS",
	height = "18rem",
	children,
	className,
}: ScrollAreaFrameProps) {
	return (
		<div className={cn("ScrollAreaFrame", className)}>
			<div className="ScrollAreaFrame__Head">
				<p className="DisplayRegister">
					<span className="DisplayRegister__Mark" aria-hidden="true">
						#
					</span>
					<span className="DisplayRegister__Label">{label}</span>
					<span className="DisplayRegister__Rule" aria-hidden="true">
						/
					</span>
					<span className="DisplayRegister__Value">{count}</span>
					<span className="DisplayRegister__Note">{unit}</span>
				</p>

				<span className="ScrollAreaFrame__More">
					<span aria-hidden="true">→</span> SCROLL
				</span>
			</div>

			<div className="ScrollAreaFrame__Body">
				<ScrollArea style={{ height }}>{children}</ScrollArea>
			</div>
		</div>
	);
}

export { ScrollArea, ScrollBar, ScrollAreaFrame };
