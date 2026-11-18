import type { PixelProps } from "@Function/Scroll/Type.js";

import { useEffect, useRef } from "react";

import { Subscribe } from "@Function/Scroll/Code/Ticker.js";

/** The one thing this component needs from the style module. */
interface Roller {
	Roll: (Time?: number) => void;

	Destroy: () => void;
}

// Import dependencies
let Dimensional: any,
	Style: any,
	Spectrum: any,
	Constant: any,
	ALL_COLORS: any;

// biome-ignore lint/nursery/useComponentExportOnlyModules:
const InitDimensional = async () => {
	// @ts-ignore
	const Module = await import("@Function/Scroll/Code/Pixel/Dimensional.js");

	return Module.default;
};

// biome-ignore lint/nursery/useComponentExportOnlyModules:
const InitStyle = async () => {
	// @ts-ignore
	const Module = await import("@Function/Scroll/Code/Pixel/Style.js");

	return Module.default;
};

// biome-ignore lint/nursery/useComponentExportOnlyModules:
const InitAnimation = async () => {
	// @ts-ignore
	const Module = await import("@Function/Scroll/Code/Pixel/Animation.js");

	return Module;
};

// biome-ignore lint/nursery/useComponentExportOnlyModules:
const InitConstant = async () => {
	// @ts-ignore
	const Module =
		await import("@Function/Scroll/Code/Pixel/Animation/Constant.js");

	return Module.default;
};

/**
 * Pixel - one cell of the field.
 *
 * The cell used to be re-rolled by React: `CurrentTime` arrived as a prop, the
 * effect below listed it as a dependency, and so every frame tore down the
 * cell's style instance and built a new one - which recreated its dust
 * particles, cancelled their frames and started new ones. For a twenty
 * character field that was nine hundred element creations and nine hundred
 * frame requests per second, to animate nine hundred cells that were already
 * animating.
 *
 * The cell now builds its style instance once and puts it on the field's clock
 * (`Code/Ticker.ts`); the clock calls `Roll(Time)`. React runs once, on mount.
 */
const Pixel = ({
	Font,
	Character,
	Index: _,
	Show,
	Text,
	Mouse,
	Container,
	Row,
	Column,
}: PixelProps) => {
	const ElementReference = useRef<HTMLDivElement>(null);

	const Roller = useRef<Roller | null>(null);

	const Position = Character % Math.max(Text, 1);

	const Seed = Position * 0.1 + Row * 0.05 + Column * 0.02;

	useEffect(() => {
		let Cancelled = false;

		let Unsubscribe: (() => void) | null = null;

		const InitializeAndApply = async (): Promise<void> => {
			if (!Dimensional) {
				Dimensional = await InitDimensional();

				Style = await InitStyle();

				const Animation = await InitAnimation();

				Spectrum = Animation.Spectrum;

				Constant = await InitConstant();

				ALL_COLORS = Spectrum(Constant.COLOR_STEPS);
			}

			const Element = ElementReference.current;

			if (Cancelled || !(Show && Element && Container)) return;

			const MouseValue = Mouse;

			const Instance: Roller = new Style(Element, {
				TimeNoise: 0,

				Seed,

				Column,

				Position,

				Influence: 0,

				Offset: new Dimensional(
					performance.now(),

					Seed,

					MouseValue,

					1,
				).Calculate(1, 1),

				Mouse: MouseValue,

				Spectrum: ALL_COLORS,
			});

			Roller.current = Instance;

			Unsubscribe = Subscribe((Time) => Instance.Roll(Time));
		};

		InitializeAndApply();

		return () => {
			Cancelled = true;

			Unsubscribe?.();

			Roller.current?.Destroy();

			Roller.current = null;
		};
	}, [Show, Container, Mouse, Position, Seed, Character, Text, Font, Row, Column]);

	return <div ref={ElementReference} className={`h-${Font} w-${Font}`} />;
};

export default Pixel;
