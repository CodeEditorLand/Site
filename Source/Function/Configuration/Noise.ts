export default {
	Speed: (typeof __NOISE_SPEED__ !== "undefined"
		? __NOISE_SPEED__
		: 0.0005) as number,

	Step: (typeof __NOISE_STEP__ !== "undefined"
		? __NOISE_STEP__
		: 8) as number,

	ChannelSpeed: {
		Phase: 0.5,
		Color: 0.2,
		Rhythm: 2,
		Morph: 0.7,
		Border: 0.3,
		Glow: 0.8,
	},
} as const;

declare const __NOISE_SPEED__: number | undefined;
declare const __NOISE_STEP__: number | undefined;
