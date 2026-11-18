/**
 * Data - the corner-mark geometry, as values rather than as markup.
 *
 * CornerMarks draws a picture-frame crosshair out of eight ticks: two per
 * corner, one horizontal and one vertical. Every tick carries the same ink at
 * a different anchor, so the geometry lives here as one table and the
 * component renders the table in order - the eight spans a page sees are this
 * derivation, mapped.
 *
 * The defaults are the sitewide frame: a 14px inset off the panel edge, 24px
 * arms, a 2px horizontal tick over a 1px stem. A host that needs a different
 * frame passes different numbers; it never re-writes the spans.
 *
 * `style` is the serialized inline style the tick carries. It is a string and
 * not an object because a string is what the browser receives either way, and
 * it is the form the CSS inspector shows - an object here would be a second
 * serialization layer that only React needed.
 */

/** Which corner of the frame a tick belongs to. */
export type Corner = "tl" | "tr" | "bl" | "br";

/** Which arm of the L a tick is: horizontal (top/bottom) or vertical (side). */
export type Axis = "h" | "v";

/** The frame's geometry. Every number is px except `Opacity`. */
export interface Geometry {
	/** Distance of the ticks from the panel edge, px. */
	readonly Inset: number;

	/** Length of the horizontal (top/bottom) tick arm, px. */
	readonly Horizontal: number;

	/** Length of the vertical (side) tick arm, px. */
	readonly Vertical: number;

	/** Thickness of the horizontal (top/bottom) tick, px. */
	readonly Thickness: number;

	/** Width of the vertical (side) tick stem, px. */
	readonly StemWidth: number;

	/** Tick ink; default is the card's own foreground (subtle ink). */
	readonly Color: string;

	/** Opacity of the tick ink (reduced so the marks frame, not shout). */
	readonly Opacity: number;
}

/** One tick: its corner, its arm, and the inline style that places it. */
export interface Tick {
	readonly corner: Corner;

	readonly axis: Axis;

	readonly style: string;
}

/** Inset of the corner ticks from the panel edge (px) - the marks float
 * clearly INSIDE the panel, off the border. */
export const CORNER_INSET = 14;

/** Horizontal (top/bottom) tick arm length (px) - square L with the
 * vertical arm, ~24px each. */
export const CORNER_HORIZONTAL_TICK = 24;

/** Vertical (side) tick arm length (px) - same span as the horizontal arm. */
export const CORNER_VERTICAL_TICK = 24;

/** Horizontal tick height (px) - 2px for presence. */
export const CORNER_TICK_HEIGHT = 2;

/** Vertical tick stem width (px) - 1px. */
export const CORNER_STEM_WIDTH = 1;

/** The sitewide frame: what a host gets when it passes no geometry at all. */
export const CORNER_GEOMETRY: Geometry = {
	Inset: CORNER_INSET,

	Horizontal: CORNER_HORIZONTAL_TICK,

	Vertical: CORNER_VERTICAL_TICK,

	Thickness: CORNER_TICK_HEIGHT,

	StemWidth: CORNER_STEM_WIDTH,

	Color: "var(--CardForeground)",

	Opacity: 0.45,
};

/** The corners, in the order the markup prints them. */
const CORNERS: readonly Corner[] = ["tl", "tr", "bl", "br"];

/**
 * Where a corner anchors its two ticks: the edge the arm sits on, the edge it
 * starts from, and the origin each arm grows toward. The two origins are what
 * make the arms slide perpendicular to themselves on shell hover (see
 * `_CornerMarks.scss`) instead of scaling out of the corner point.
 */
interface Anchor {
	readonly primary: "top" | "bottom";

	readonly along: "left" | "right";

	readonly originH: string;

	readonly originV: string;
}

const ANCHORS: Record<Corner, Anchor> = {
	tl: { primary: "top", along: "left", originH: "0 50%", originV: "50% 0" },

	tr: {
		primary: "top",

		along: "right",

		originH: "100% 50%",

		originV: "50% 0",
	},

	bl: {
		primary: "bottom",

		along: "left",

		originH: "0 50%",

		originV: "50% 100%",
	},

	br: {
		primary: "bottom",

		along: "right",

		originH: "100% 50%",

		originV: "50% 100%",
	},
};

/** The ink every tick shares: absolute, one colour, one opacity. */
const Ink = (Geometry: Geometry): string =>
	`position:absolute;background-color:${Geometry.Color};opacity:${Geometry.Opacity}`;

/** The box of one arm: the two anchors, then the arm's own span. */
const Box = (Geometry: Geometry, Anchor: Anchor, Axis: Axis): string =>
	[
		`${Anchor.primary}:${Geometry.Inset}px`,

		`${Anchor.along}:${Geometry.Inset}px`,

		Axis === "h"
			? `width:${Geometry.Horizontal}px;height:${Geometry.Thickness}px`
			: `width:${Geometry.StemWidth}px;height:${Geometry.Vertical}px`,
	].join(";");

/** One tick, as the span's `style` attribute and the two data attributes the
 * stylesheet keys its hover direction on. */
const CornerTick = (Geometry: Geometry, Corner: Corner, Axis: Axis): Tick => ({
	corner: Corner,

	axis: Axis,

	style: [
		Ink(Geometry),
		Box(Geometry, ANCHORS[Corner], Axis),
		`transform-origin:${
			Axis === "h" ? ANCHORS[Corner].originH : ANCHORS[Corner].originV
		}`,
	].join(";"),
});

/**
 * The eight ticks, in markup order: per corner the horizontal arm first, then
 * the vertical one, so each L is emitted whole.
 */
export const CornerTicks = (Geometry: Geometry): readonly Tick[] =>
	CORNERS.flatMap((Corner) => [
		CornerTick(Geometry, Corner, "h"),

		CornerTick(Geometry, Corner, "v"),
	]);
