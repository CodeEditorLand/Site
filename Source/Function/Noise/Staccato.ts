import type { createNoise2D } from "simplex-noise";

type Noise2D = ReturnType<typeof createNoise2D>;

export default (async () => {
	const { createNoise2D: CreateNoise2D } = await import("simplex-noise");

	const Noise: Noise2D = CreateNoise2D();

	const STEP = 8;
	const SPEED = 0.0005;

	// Core properties (existing)
	const PROPERTY_STACCATO = "--Staccato";
	const PROPERTY_RAW = "--StaccatoRaw";
	const PROPERTY_PHASE = "--StaccatoPhase";

	// New channels
	const PROPERTY_COLOR = "--StaccatoColor";
	const PROPERTY_RHYTHM = "--StaccatoRhythm";
	const PROPERTY_MORPH = "--StaccatoMorph";
	const PROPERTY_BORDER = "--StaccatoBorder";
	const PROPERTY_GLOW = "--StaccatoGlow";

	let Active = false;
	let FrameIdentifier = 0;

	const Quantize = (Value: number, Step: number): number =>
		Math.floor(Value * Step) / Step;

	const Tick = (Time: number): void => {
		const Raw = Noise(Time * SPEED, 0);
		const Stepped = Quantize(Raw, STEP);
		const Phase = Quantize(Noise(Time * SPEED * 0.5, 100), 4);

		// Color channel:very slow drift, 3-step quantize for sharp palette shifts
		const Color = Quantize(Noise(Time * SPEED * 0.2, 200), 3);

		// Rhythm channel:faster pulse, 2-step for binary on/off staccato beat
		const Rhythm = Quantize(Noise(Time * SPEED * 2, 300), 2);

		// Morph channel:medium speed, 5-step for shape interpolation
		const Morph = Quantize(Noise(Time * SPEED * 0.7, 400), 5);

		// Border channel:slow crawl for border weight/color transitions
		const Border = Quantize(Noise(Time * SPEED * 0.3, 500), 4);

		// Glow channel:continuous for smooth glow radius breathing
		const Glow = Noise(Time * SPEED * 0.8, 600);

		const Root = document.documentElement.style;
		Root.setProperty(PROPERTY_STACCATO, String(Stepped));
		Root.setProperty(PROPERTY_RAW, String(Raw));
		Root.setProperty(PROPERTY_PHASE, String(Phase));
		Root.setProperty(PROPERTY_COLOR, String(Color));
		Root.setProperty(PROPERTY_RHYTHM, String(Rhythm));
		Root.setProperty(PROPERTY_MORPH, String(Morph));
		Root.setProperty(PROPERTY_BORDER, String(Border));
		Root.setProperty(PROPERTY_GLOW, String(Glow));

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

	/**
	 * Seed a specific element with per-instance noise offsets.
	 * Creates unique --StaccatoSeed, --StaccatoSeedPhase vars
	 * so identical classes produce different motion per element.
	 */
	const SeedElement = (Element: HTMLElement, Index: number): void => {
		const SeedValue = Noise(Index * 0.73, Index * 1.31);
		const SeedPhase = Noise(Index * 1.31, Index * 0.73);
		Element.style.setProperty("--StaccatoSeed", String(SeedValue));
		Element.style.setProperty("--StaccatoSeedPhase", String(SeedPhase));
	};

	/**
	 * Batch-seed all elements matching a selector.
	 */
	const SeedSelector = (Selector: string): void => {
		const ElementList = document.querySelectorAll<HTMLElement>(Selector);
		ElementList.forEach((Element, Index) => {
			SeedElement(Element, Index);
		});
	};

	return { Start, Stop, Noise, Quantize, SeedElement, SeedSelector };
})();
