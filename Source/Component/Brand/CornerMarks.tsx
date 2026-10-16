import React from "react";

import { cn } from "../UI/Utility";

/**
 * CornerMarks - picture-frame corner crosshairs for white card surfaces (C19).
 *
 * Renders 4 L-shaped corner marks (top-left / top-right / bottom-left /
 * bottom-right), each made of two tiny rectangles:
 *   - a horizontal tick spanning RIGHT, 2px tall (presence over 1px),
 *   - a vertical tick spanning BOTTOM, 1px wide,
 * forming the L crosshair of the old-school game-UI frame.
 *
 * Geometry is centralized in the CORNER_* constants below so every host
 * shares the same inset / tick sizes (the sitewide frame look). The marks
 * are INSET a few px off the panel edge and anchored to the shell corners
 * (absolute against the host, which must be position:relative) - the top
 * marks stay at the top even as the panel grows taller.
 *
 * Color: subtle ink - var(--CardForeground) at reduced opacity by default;
 * they frame, they do not shout.
 *
 * FUTURE (C19 intent, not implemented): hover animation where the
 * cross-hairs expand/appear on mouse hover while always present - old-school
 * game UI. The CSS-only hook classes .CornerMarks / .CornerMarkTick are
 * already in place so a later pass can add
 *   .CornerMarkTick { transition: transform 180ms ease, opacity 180ms ease; }
 *   .CornerMarks:hover .CornerMarkTick { transform: scale(1.35); opacity: 0.8; }
 * without touching any host component.
 *
 * Pure presentational: aria-hidden, pointer-events-none, no JS state.
 */

export interface CornerMarksProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Distance of the ticks from the panel edge, px. */
	Inset?: number;

	/** Length of the horizontal (top/bottom) tick arm, px. */
	Horizontal?: number;

	/** Length of the vertical (side) tick arm, px. */
	Vertical?: number;

	/** Thickness of the horizontal (top/bottom) tick, px. */
	Thickness?: number;

	/** Width of the vertical (side) tick stem, px. */
	StemWidth?: number;

	/** Tick ink; default is the card's own foreground (subtle ink). */
	Color?: string;

	/** Opacity of the tick ink (reduced so the marks frame, not shout). */
	Opacity?: number;
}

/** Inset of the corner ticks from the panel edge (px) - the marks float
 * clearly INSIDE the panel, off the border. */
const CORNER_INSET = 14;

/** Horizontal (top/bottom) tick arm length (px) - square L with the
 * vertical arm, ~24px each. */
const CORNER_HORIZONTAL_TICK = 24;

/** Vertical (side) tick arm length (px) - same span as the horizontal arm. */
const CORNER_VERTICAL_TICK = 24;

/** Horizontal tick height (px) - 2px for presence. */
const CORNER_TICK_HEIGHT = 2;

/** Vertical tick stem width (px) - 1px. */
const CORNER_STEM_WIDTH = 1;

const CornerMarks = ({
	Inset = CORNER_INSET,
	Horizontal = CORNER_HORIZONTAL_TICK,
	Vertical = CORNER_VERTICAL_TICK,
	Thickness = CORNER_TICK_HEIGHT,
	StemWidth = CORNER_STEM_WIDTH,
	Color = "var(--CardForeground)",
	Opacity = 0.45,
	className,
	...props
}: CornerMarksProps) => {
	const Ink: React.CSSProperties = {
		position: "absolute",

		backgroundColor: Color,

		opacity: Opacity,
	};

	const TopLeftHorizontal: React.CSSProperties = {
		...Ink,

		top: Inset,

		left: Inset,

		width: Horizontal,

		height: Thickness,
	};

	const TopLeftVertical: React.CSSProperties = {
		...Ink,

		top: Inset,

		left: Inset,

		width: StemWidth,

		height: Vertical,
	};

	const TopRightHorizontal: React.CSSProperties = {
		...Ink,

		top: Inset,

		right: Inset,

		width: Horizontal,

		height: Thickness,
	};

	const TopRightVertical: React.CSSProperties = {
		...Ink,

		top: Inset,

		right: Inset,

		width: StemWidth,

		height: Vertical,
	};

	const BottomLeftHorizontal: React.CSSProperties = {
		...Ink,

		bottom: Inset,

		left: Inset,

		width: Horizontal,

		height: Thickness,
	};

	const BottomLeftVertical: React.CSSProperties = {
		...Ink,

		bottom: Inset,

		left: Inset,

		width: StemWidth,

		height: Vertical,
	};

	const BottomRightHorizontal: React.CSSProperties = {
		...Ink,

		bottom: Inset,

		right: Inset,

		width: Horizontal,

		height: Thickness,
	};

	const BottomRightVertical: React.CSSProperties = {
		...Ink,

		bottom: Inset,

		right: Inset,

		width: StemWidth,

		height: Vertical,
	};

	return (
		<div
			aria-hidden="true"
			className={cn(
				"CornerMarks pointer-events-none absolute inset-0",
				className,
			)}
			{...props}
		>
			{/* Top-left L */}
			<span className="CornerMarkTick" style={TopLeftHorizontal} />
			<span className="CornerMarkTick" style={TopLeftVertical} />

			{/* Top-right L */}
			<span className="CornerMarkTick" style={TopRightHorizontal} />
			<span className="CornerMarkTick" style={TopRightVertical} />

			{/* Bottom-left L */}
			<span className="CornerMarkTick" style={BottomLeftHorizontal} />
			<span className="CornerMarkTick" style={BottomLeftVertical} />

			{/* Bottom-right L */}
			<span className="CornerMarkTick" style={BottomRightHorizontal} />
			<span className="CornerMarkTick" style={BottomRightVertical} />
		</div>
	);
};

export { CornerMarks };

export default CornerMarks;
