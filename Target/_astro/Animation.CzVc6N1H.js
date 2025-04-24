import { _ as a } from "./preload-helper.Cat91CNq.js";
const t = (
		await a(async () => {
			const { createNoise2D: a } = await import(
				"./simplex-noise.DztDy58a.js"
			);
			return { createNoise2D: a };
		}, [])
	).createNoise2D(),
	e = (a, t, e) => a + (t - a) * e,
	r = (a, e, r = 1e-4) => t(a + e, 20) + r * t(2 * a + e, 30),
	s = (a) =>
		Array.from({ length: a }, (t, e) => `hsl(${(e / a) * 360}, 100%, 50%)`),
	o = (a, t, e, r) =>
		Math.max(0, 1 - Math.sqrt(a * a + t * t) / _.RADIUS_EFFECT) *
		Math.max(0, 1 - (e - r.Last) / _.FADE_DURATION),
	{ default: _ } = await a(async () => {
		const { default: a } = await import("./Constant.Ds8dDfZx.js");
		return { default: a };
	}, []);
export {
	_ as Constant,
	o as Influence,
	r as Layer,
	e as Lerp,
	t as Noise,
	s as Spectrum,
};
