// Source/Function/Noise/Staccato.ts
var Staccato_default = (async () => {
	const { createNoise2D: CreateNoise2D } = await import("simplex-noise");
	const Config = (await import("./Noise_uQv3mQjA.mjs")).default;
	const Turbulence = (await import("./Turbulence_rveuIv4c.mjs")).default;
	const Noise = CreateNoise2D();
	const STEP = Config.Step;
	const SPEED = Config.Speed;
	const Channel = Config.ChannelSpeed;
	const PROPERTY_STACCATO = "--Staccato";
	const PROPERTY_RAW = "--StaccatoRaw";
	const PROPERTY_PHASE = "--StaccatoPhase";
	const PROPERTY_COLOR = "--StaccatoColor";
	const PROPERTY_RHYTHM = "--StaccatoRhythm";
	const PROPERTY_MORPH = "--StaccatoMorph";
	const PROPERTY_BORDER = "--StaccatoBorder";
	const PROPERTY_GLOW = "--StaccatoGlow";
	let Active = false;
	let Timer = null;
	/**
	* The commit cadence.
	*
	* The noise is sampled and committed twice a second and the stylesheet bridges
	* each commit with a 1.6s transition, so the page is always mid-transition
	* between two states and never jumps. That is a 500 ms job.
	*
	* It used to be a `requestAnimationFrame` loop: sixty wake-ups a second to do
	* work twice a second, on every page that mounts the noise layer, forever.
	* `setInterval` at the cadence is the same commits with 2 wake-ups instead of
	* 60, and the `document.hidden` guard means a background tab costs nothing -
	* which is the one thing the old rAF loop got for free and this must not lose.
	*/
	const COMMIT_INTERVAL = 500;
	const Quantize = (Value, Step) => Math.floor(Value * Step) / Step;
	const Tick = () => {
		if (!Active || typeof document !== "undefined" && document.hidden) return;
		const Time = performance.now();
		const Raw = Noise(Time * SPEED, 0);
		const Stepped = Quantize(Raw, STEP);
		const Phase = Quantize(Noise(Time * SPEED * Channel.Phase, 100), 4);
		const Color = Quantize(Noise(Time * SPEED * Channel.Color, 200), 3);
		const Rhythm = Quantize(Noise(Time * SPEED * Channel.Rhythm, 300), 2);
		const Morph = Quantize(Noise(Time * SPEED * Channel.Morph, 400), 5);
		const Border = Quantize(Noise(Time * SPEED * Channel.Border, 500), 4);
		const Glow = Noise(Time * SPEED * Channel.Glow, 600);
		const Root = document.documentElement.style;
		Root.setProperty(PROPERTY_STACCATO, String(Stepped));
		Root.setProperty(PROPERTY_RAW, String(Raw));
		Root.setProperty(PROPERTY_PHASE, String(Phase));
		Root.setProperty(PROPERTY_COLOR, String(Color));
		Root.setProperty(PROPERTY_RHYTHM, String(Rhythm));
		Root.setProperty(PROPERTY_MORPH, String(Morph));
		Root.setProperty(PROPERTY_BORDER, String(Border));
		Root.setProperty(PROPERTY_GLOW, String(Glow));
		Turbulence.AnimateFilter(Raw);
	};
	const Start = () => {
		if (Active) return;
		Active = true;
		Turbulence.InjectFilter();
		Tick();
		Timer = setInterval(Tick, COMMIT_INTERVAL);
	};
	const Stop = () => {
		Active = false;
		if (Timer !== null) {
			clearInterval(Timer);
			Timer = null;
		}
	};
	/**
	* Seed a specific element with per-instance noise offsets.
	* Creates unique --StaccatoSeed, --StaccatoSeedPhase vars
	* so identical classes produce different motion per element.
	*/
	const SeedElement = (Element, Index) => {
		const SeedValue = Noise(Index * .73, Index * 1.31);
		const SeedPhase = Noise(Index * 1.31, Index * .73);
		Element.style.setProperty("--StaccatoSeed", String(SeedValue));
		Element.style.setProperty("--StaccatoSeedPhase", String(SeedPhase));
	};
	/**
	* Batch-seed all elements matching a selector.
	*/
	const SeedSelector = (Selector) => {
		document.querySelectorAll(Selector).forEach((Element, Index) => {
			SeedElement(Element, Index);
		});
	};
	return {
		Start,
		Stop,
		Noise,
		Quantize,
		SeedElement,
		SeedSelector
	};
})();
export { Staccato_default as default };
