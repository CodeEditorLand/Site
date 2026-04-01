import type { PixelProps } from "@Function/Scroll/Type.js";
import { useEffect, useRef } from "react";

// Import dependencies
let Dimensional: any,
	Style: any,
	_Influence: any,
	_Layer: any,
	Noise: any,
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

const Pixel = ({
	Font,
	Character,
	Index: _,
	Show,
	Text,
	Mouse,
	Container,
	CurrentTime,
	Row,
	Column,
}: PixelProps) => {
	const ElementReference = useRef<HTMLDivElement>(null);
	const Position = Character % Text;
	const Seed = Position * 0.1 + Row * 0.05 + Column * 0.02;

	useEffect(() => {
		// Initialize dependencies if not yet loaded
		const InitializeAndApply = async () => {
			if (!Dimensional) {
				Dimensional = await InitDimensional();
				Style = await InitStyle();
				const Animation = await InitAnimation();
				_Influence = Animation.Influence;
				_Layer = Animation.Layer;
				Noise = Animation.Noise;
				Spectrum = Animation.Spectrum;
				Constant = await InitConstant();
				ALL_COLORS = Spectrum(Constant.COLOR_STEPS);
			}

			const Element = ElementReference.current;
			if (!(Show && Element && Container)) {
				return;
			}

			const MouseValue = Mouse(); // Get the current mouse value
			new Style(Element, {
				TimeNoise:
					Position * 0.1 +
					CurrentTime() *
						(Constant.MULTIPLIER_TIME_BASE +
							Noise(CurrentTime() * 0.001 + Seed, 30) *
								Constant.MULTIPLIER_TIME_VARIATION),
				Seed,
				Column,
				Position,
				Influence: 0,
				Offset: new Dimensional(
					CurrentTime(),
					Seed,
					MouseValue,
					1,
				).Calculate(1, 1),
				Mouse: MouseValue, // Pass the direct value, not the accessor
				Spectrum: ALL_COLORS,
			}).Roll();
		};

		InitializeAndApply();
	}, [
		Show,
		Container,
		CurrentTime,
		Mouse,
		Position,
		Seed,
		Character,
		Text,
		Font,
	]);

	return <div ref={ElementReference} className={`h-${Font} w-${Font}`} />;
};

export default Pixel;
