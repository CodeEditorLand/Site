import type { createNoise2D } from "simplex-noise";

type Noise2D = ReturnType<typeof createNoise2D>;

export default (async () => {
	const { createNoise2D: CreateNoise2D } = await import("simplex-noise");

	const LayoutNoise: Noise2D = CreateNoise2D();

	const Scatter = (
		Index: number,
		SpreadX: number,
		SpreadY: number = 0,
	): { X: number; Y: number } => {
		const NoiseX = LayoutNoise(Index * 0.5, 0);
		const NoiseY = LayoutNoise(0, Index * 0.5);

		return {
			X: NoiseX * SpreadX,
			Y: NoiseY * SpreadY,
		};
	};

	const ApplyToElement = (
		Element: HTMLElement,
		Index: number,
		SpreadX: number,
		SpreadY: number = 0,
	): void => {
		const Offset = Scatter(Index, SpreadX, SpreadY);
		Element.style.setProperty("--AttentionOffsetX", `${Offset.X}px`);
		Element.style.setProperty("--AttentionOffsetY", `${Offset.Y}px`);
	};

	const ApplyToSelector = (
		Selector: string,
		SpreadX: number,
		SpreadY: number = 0,
	): void => {
		const ElementList = document.querySelectorAll<HTMLElement>(Selector);
		ElementList.forEach((Element, Index) => {
			ApplyToElement(Element, Index, SpreadX, SpreadY);
		});
	};

	return { Scatter, ApplyToElement, ApplyToSelector, LayoutNoise };
})();
