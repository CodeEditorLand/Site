/** The sitewide frame: what a host gets when it passes no geometry at all. */
var CORNER_GEOMETRY = {
	Inset: 14,
	Horizontal: 24,
	Vertical: 24,
	Thickness: 2,
	StemWidth: 1,
	Color: "var(--CardForeground)",
	Opacity: .45
};
/** The corners, in the order the markup prints them. */
var CORNERS = [
	"tl",
	"tr",
	"bl",
	"br"
];
var ANCHORS = {
	tl: {
		primary: "top",
		along: "left",
		originH: "0 50%",
		originV: "50% 0"
	},
	tr: {
		primary: "top",
		along: "right",
		originH: "100% 50%",
		originV: "50% 0"
	},
	bl: {
		primary: "bottom",
		along: "left",
		originH: "0 50%",
		originV: "50% 100%"
	},
	br: {
		primary: "bottom",
		along: "right",
		originH: "100% 50%",
		originV: "50% 100%"
	}
};
/** The ink every tick shares: absolute, one colour, one opacity. The opacity is
* the group's (`--mark-corner-ink`, `System/Mark/_Token.scss`), not each arm's:
* two arms at 45 % overlap into 70 % at the joint, so the arms carry none. */
var Ink = (Geometry) => `position:absolute;background-color:${Geometry.Color}`;
/** The box of one arm: the two anchors, then the arm's own span.
*
* THE NUMBERS ARE THE MARK LADDER'S. Each value is read as a token with the
* host's own number as its fallback, so the default frame is declared once in
* `System/Mark/_Token.scss` and a host that passes different geometry still
* gets it - and the two renderers (this component and the hero's React frame)
* cannot drift apart, because neither of them owns a number any more. */
var Box = (Geometry, Anchor, Axis) => {
	const Inset = `var(--mark-inset, ${Geometry.Inset}px)`;
	const Arm = `var(--mark-arm, ${Geometry.Horizontal}px)`;
	const Stem = `var(--mark-tick, ${Geometry.StemWidth}px)`;
	const Thick = `var(--mark-tick, ${Geometry.Thickness}px)`;
	return [
		`${Anchor.primary}:${Inset}`,
		`${Anchor.along}:${Inset}`,
		Axis === "h" ? `width:${Arm};height:${Thick}` : `width:${Stem};height:var(--mark-arm, ${Geometry.Vertical}px)`
	].join(";");
};
/** One tick, as the span's `style` attribute and the two data attributes the
* stylesheet keys its hover direction on. */
var CornerTick = (Geometry, Corner, Axis) => ({
	corner: Corner,
	axis: Axis,
	style: [
		Ink(Geometry),
		Box(Geometry, ANCHORS[Corner], Axis),
		`transform-origin:${Axis === "h" ? ANCHORS[Corner].originH : ANCHORS[Corner].originV}`
	].join(";")
});
/**
* The eight ticks, in markup order: per corner the horizontal arm first, then
* the vertical one, so each L is emitted whole.
*/
var CornerTicks = (Geometry) => CORNERS.flatMap((Corner) => [CornerTick(Geometry, Corner, "h"), CornerTick(Geometry, Corner, "v")]);
export { CornerTicks as n, CORNER_GEOMETRY as t };
