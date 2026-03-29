import type { PixelProps } from "@Function/Scroll/Type.js";
import React, { useEffect, useRef, useState } from "react";

// Import dependencies
let Dimensional: any,
	Style: any,
	Influence: any,
	Layer: any,
	Noise: any,
	Spectrum: any,
	Constant: any,
	ALL_COLORS: any;

// biome-ignore lint/nursery/useComponentExportOnlyModules:
const initDimensional = async () => {
	// @ts-ignore
	const mod = await import("@Function/Scroll/Code/Pixel/Dimensional.ts");
	return mod.default;
};

// biome-ignore lint/nursery/useComponentExportOnlyModules:
const initStyle = async () => {
	// @ts-ignore
	const mod = await import("@Function/Scroll/Code/Pixel/Style.ts");
	return mod.default;
};

// biome-ignore lint/nursery/useComponentExportOnlyModules:
const initAnimation = async () => {
	// @ts-ignore
	const mod = await import("@Function/Scroll/Code/Pixel/Animation.ts");
	return mod;
};

// biome-ignore lint/nursery/useComponentExportOnlyModules:
const initConstant = async () => {
	// @ts-ignore
	const mod =
		await import("@Function/Scroll/Code/Pixel/Animation/Constant.ts");
	return mod.default;
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
	const elementRef = useRef<HTMLDivElement>(null);
	const Position = Character % Text;
	const Seed = Position * 0.1 + Row * 0.05 + Column * 0.02;

	useEffect(() => {
		// Initialize dependencies if not yet loaded
		const initializeAndApply = async () => {
			if (!Dimensional) {
				Dimensional = await initDimensional();
				Style = await initStyle();
				const Animation = await initAnimation();
				Influence = Animation.Influence;
				Layer = Animation.Layer;
				Noise = Animation.Noise;
				Spectrum = Animation.Spectrum;
				Constant = await initConstant();
				ALL_COLORS = Spectrum(Constant.COLOR_STEPS);
			}

			const element = elementRef.current;
			if (!(Show && element && Container)) {
				return;
			}

			const mouseValue = Mouse(); // Get the current mouse value
			new Style(element, {
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
					mouseValue,
					1,
				).Calculate(1, 1),
				Mouse: mouseValue, // Pass the direct value, not the accessor
				Spectrum: ALL_COLORS,
			}).Roll();
		};

		initializeAndApply();
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

	return <div ref={elementRef} className={`h-${Font} w-${Font}`} />;
};

export default Pixel;
