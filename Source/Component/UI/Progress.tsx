"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";

import * as React from "react";

import { cn } from "./Utility";

/**
 * Progress - how far a known job has got, printed as a figure.
 *
 * ─── A BAR WITHOUT A FIGURE IS A GUESS ───────────────────────────────────
 * The kit's bar is a track and a fill, and a reader cannot read a length off it at
 * 13px. So the bar gains the thing every other measurement on this site carries: a
 * register line - `# PREPARING / 07 OF 12` - with the mark, the job's own name, and
 * the two figures the fill is a picture of. `label` and `showValue` are opt-in, so
 * a caller that wants only the bar still gets only the bar.
 *
 * ─── FIVE STATES, AND WHAT EACH ONE IS FOR ───────────────────────────────
 *
 *   loading      the length is not known: the fill is a third of the track, moving
 *                on the trace interval. It is the only honest indeterminate state,
 *                and reduced motion parks it at a third rather than hiding it.
 *   paused       the job stopped, and the fill stays where it stopped - a pause
 *                that emptied the bar would be a pause that deleted the work.
 *   failed       the job refused: the destructive ink, and the bar stops at the
 *                last known figure so the reader can see how far it got.
 *   complete     the accent. Completion is the one thing in this family that
 *                authenticates, and green never means "positive in general".
 *   partial      the figure is known and the total is not: `07 OF UNAVAILABLE`,
 *                never `07 OF 0` and never a full bar.
 *
 * ─── THE FIGURE IS TABULAR AND ZERO-PADDED BY THE CALLER ─────────────────
 * The component prints what it is given. It pads nothing, because the site pads in
 * one place (`Matrix/Data.ts`'s `Pad`) and a second pad would be a second width.
 */

/** The job's state, which is not the same thing as its value. */
type ProgressState = "loading" | "paused" | "failed" | "complete" | "partial";

interface ProgressProps extends React.ComponentPropsWithoutRef<
	typeof ProgressPrimitive.Root
> {
	/** The job's name, printed at the register line's end. */
	label?: string;

	/** Whether the register line prints the figure. Default `true` when labelled. */
	showValue?: boolean;

	/** The job's state. Omitted means a running job at its value. */
	state?: ProgressState;

	/** What the figure counts: `STEPS`, `BYTES`, `FILES`. */
	unit?: string;
}

const Progress = React.forwardRef<
	React.ComponentRef<typeof ProgressPrimitive.Root>,
	ProgressProps
>(
	(
		{
			className,
			value,
			label,
			showValue = true,
			state,
			unit = "STEPS",
			max = 100,
			...props
		},

		Ref,
	) => {
		const Root = (
			<ProgressPrimitive.Root
				ref={Ref}
				data-slot="progress"
				max={max}
				value={value}
				className={cn(
					"flat relative h-2 w-full overflow-hidden bg-[color-mix(in_srgb,var(--Primary)_20%,transparent)]",
					className,
				)}
				{...props}
			>
				<ProgressPrimitive.Indicator
					data-slot="progress-indicator"
					className="h-full w-full flex-1 bg-primary transition-all"
					// A job whose total is not known has no proportion to draw: `loading`
					// and `partial` leave the fill to the stylesheet, which draws it as a
					// third of the track. Every other state draws its own fraction.
					style={
						state === "loading" || state === "partial"
							? undefined
							: {
									transform: `translateX(-${100 - (value || 0)}%)`,
								}
					}
				/>
			</ProgressPrimitive.Root>
		);

		// The bare bar is the kit's bar. A caller that asked for no register gets
		// the exact element it had before this file grew a figure.
		if (label === undefined) return Root;

		// A total that is not known prints `UNAVAILABLE`, never `00`: an indeterminate
		// job has no denominator, and a partial one has a figure without one.
		const Total =
			state === "partial" || state === "loading"
				? "UNAVAILABLE"
				: String(max);

		const Shown = String(value ?? 0).padStart(2, "0");

		return (
			<div data-slot="progress-block" data-state={state}>
				<p className="DisplayRegister">
					<span className="DisplayRegister__Mark" aria-hidden="true">
						#
					</span>
					<span className="DisplayRegister__Label">{label}</span>
					<span className="DisplayRegister__Rule" aria-hidden="true">
						/
					</span>
					{showValue ? (
						<span className="DisplayRegister__Value">
							{Shown} OF {Total}
						</span>
					) : null}
					<span className="DisplayRegister__Note">{unit}</span>
				</p>

				{Root}
			</div>
		);
	},
);

Progress.displayName = "Progress";

export { type ProgressState, Progress };
