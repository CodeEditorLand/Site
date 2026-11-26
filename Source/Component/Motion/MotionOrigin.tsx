"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../UI/Popover.js";

/**
 * MotionOrigin - the origin specimen: a real slip, opened from a real control.
 *
 * ─── WHY THIS IS A CONTROL AND NOT A PICTURE ──────────────────────────────
 * The origin class is about the relation between a trigger and the surface it
 * opens, and a drawing of that relation would be a drawing of something the
 * reader can simply do. So the specimen is the thing itself: a button, a Radix
 * popover, the site's own slip (`PopoverContent` already carries `.Slip`), and
 * the arrival from the side Radix printed.
 *
 * ─── WHAT THE READER CAN SEE THAT A SCREENSHOT CANNOT ─────────────────────
 * Open it, close it, and open it again from a different scroll position: the
 * slip always leaves the button by the same 8px, because the distance is the
 * side's and not the pointer's. That is the whole claim, and it is checkable in
 * two clicks.
 *
 * ─── NO STATE OF ITS OWN ──────────────────────────────────────────────────
 * Radix owns open/closed, focus return and dismissal; this file owns four rows
 * and one sentence. A specimen that needed its own state machine would be
 * demonstrating the wrong thing.
 */

const Sides = [
	{ Mark: "↓", Label: "SIDE: BOTTOM", Meta: "FROM ABOVE" },

	{ Mark: "↑", Label: "SIDE: TOP", Meta: "FROM BELOW" },

	{ Mark: "→", Label: "SIDE: LEFT", Meta: "FROM THE RIGHT" },

	{ Mark: "←", Label: "SIDE: RIGHT", Meta: "FROM THE LEFT" },
] as const;

export const MotionOrigin = () => (
	<Popover>
		<PopoverTrigger asChild>
			<button type="button" className="MotionOrigin__Trigger">
				<span className="MotionOrigin__Label">OPEN:</span>
				<span className="MotionOrigin__Value">A SLIP</span>
				<span
					className="MotionOrigin__Mark MarkArrow"
					aria-hidden="true"
				/>
			</button>
		</PopoverTrigger>

		<PopoverContent
			head={{ Name: "ORIGIN", Count: Sides.length }}
			side="bottom"
			align="start"
			sideOffset={8}
		>
			<ul className="MotionOrigin__Rows">
				{Sides.map((Side) => (
					<li className="MotionOrigin__Row" key={Side.Label}>
						<span
							className="MotionOrigin__RowMark"
							aria-hidden="true"
						>
							{Side.Mark}
						</span>
						<span className="MotionOrigin__RowLabel">
							{Side.Label}
						</span>
						<span className="MotionOrigin__RowMeta">
							{Side.Meta}
						</span>
					</li>
				))}
			</ul>

			<p className="MotionOrigin__Note">
				<span className="MarkRelation" aria-hidden="true" />This slip left the button
				above by 8px, on the side the control printed. The distance is
				the side's, never the pointer's, so it is the same at every
				scroll position.
			</p>
		</PopoverContent>
	</Popover>
);
