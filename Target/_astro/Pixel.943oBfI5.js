const __vite__mapDeps = (
	i,
	m = __vite__mapDeps,
	d = m.f ||
		(m.f = [
			"_astro/Dimensional.DqoyY2s0.js",
			"_astro/preload-helper.Cat91CNq.js",
			"_astro/Style.COKlYhqq.js",
			"_astro/solid.BM37VfZ_.js",
			"_astro/Animation.DHIlcHOd.js",
		]),
) => i.map((i) => d[i]);
import { _ as e } from "./preload-helper.Cat91CNq.js";
import { g as t, u as a, c as n, t as o } from "./web.DSF-svtj.js";
import { createSignal as r, onMount as s } from "./solid.BM37VfZ_.js";
var i = o("<div>");
const u = ({
		Font: e,
		Character: o,
		Index: u,
		Show: c,
		Text: f,
		Mouse: I,
		Container: w,
		CurrentTime: E,
		Row: T,
		Column: L,
	}) => {
		const [R, S] = r(),
			y = o % f,
			A = 0.1 * y + 0.05 * T + 0.02 * L;
		return (
			s(() => {
				c &&
					R() &&
					w &&
					new l(R(), {
						TimeNoise:
							0.1 * y +
							E() *
								(d.MULTIPLIER_TIME_BASE +
									m(0.001 * E() + A, 30) *
										d.MULTIPLIER_TIME_VARIATION),
						Seed: A,
						Column: L,
						Position: y,
						Influence: 0,
						Offset: new _(E(), A, I(), 1).Calculate(1, 1),
						Mouse: I,
						Spectrum: p,
					}).Roll();
			}),
			(C = t(i)),
			a(S, C),
			n(C, `h-${e} w-${e}`),
			C
		);
		var C;
	},
	{ default: _ } = await e(
		async () => {
			const { default: e } = await import("./Dimensional.DqoyY2s0.js");
			return { default: e };
		},
		__vite__mapDeps([0, 1]),
	),
	{ default: l } = await e(
		async () => {
			const { default: e } = await import("./Style.COKlYhqq.js");
			return { default: e };
		},
		__vite__mapDeps([2, 1, 3]),
	),
	{
		Influence: c,
		Layer: f,
		Noise: m,
		Spectrum: I,
	} = await e(
		async () => {
			const {
				Influence: e,
				Layer: t,
				Noise: a,
				Spectrum: n,
			} = await import("./Animation.DHIlcHOd.js");
			return { Influence: e, Layer: t, Noise: a, Spectrum: n };
		},
		__vite__mapDeps([4, 1]),
	),
	{ default: d } = await e(async () => {
		const { default: e } = await import("./Constant.Ds8dDfZx.js");
		return { default: e };
	}, []),
	p = I(d.COLOR_STEPS);
export {
	p as ALL_COLORS,
	d as Constant,
	_ as Dimensional,
	c as Influence,
	f as Layer,
	m as Noise,
	I as Spectrum,
	l as Style,
	u as default,
};
