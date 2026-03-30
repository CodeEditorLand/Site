import type { createNoise2D } from "simplex-noise";

type Noise2D = ReturnType<typeof createNoise2D>;

export default (async () => {
	const { createNoise2D: CreateNoise2D } = await import("simplex-noise");

	const Noise: Noise2D = CreateNoise2D();

	const STEP = 8;
	const SPEED = 0.0005;
	const PROPERTY_STACCATO = "--Staccato";
	const PROPERTY_RAW = "--StaccatoRaw";
	const PROPERTY_PHASE = "--StaccatoPhase";

	let Active = false;
	let FrameIdentifier = 0;

	const Quantize = (Value: number, Step: number): number =>
		Math.floor(Value * Step) / Step;

	const Tick = (Time: number): void => {
		const Raw = Noise(Time * SPEED, 0);
		const Stepped = Quantize(Raw, STEP);
		const Phase = Quantize(Noise(Time * SPEED * 0.5, 100), 4);

		const Root = document.documentElement.style;
		Root.setProperty(PROPERTY_STACCATO, String(Stepped));
		Root.setProperty(PROPERTY_RAW, String(Raw));
		Root.setProperty(PROPERTY_PHASE, String(Phase));

		if (Active) {
			FrameIdentifier = requestAnimationFrame(Tick);
		}
	};

	const Start = (): void => {
		if (Active) return;
		Active = true;
		FrameIdentifier = requestAnimationFrame(Tick);
	};

	const Stop = (): void => {
		Active = false;
		cancelAnimationFrame(FrameIdentifier);
	};

	return { Start, Stop, Noise, Quantize };
})();
