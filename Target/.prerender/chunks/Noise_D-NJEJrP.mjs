//#region Source/Function/Configuration/Noise.ts
var Noise_default = {
	Speed: typeof __NOISE_SPEED__ !== "undefined" ? __NOISE_SPEED__ : 1e-4,
	Step: typeof __NOISE_STEP__ !== "undefined" ? __NOISE_STEP__ : 20,
	ChannelSpeed: {
		Phase: .18,
		Color: .07,
		Rhythm: .6,
		Morph: .25,
		Border: .1,
		Glow: .28
	}
};
//#endregion
export { Noise_default as default };
