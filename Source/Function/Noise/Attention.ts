import type { createNoise2D } from "simplex-noise";

type Noise2D = ReturnType<typeof createNoise2D>;

export default (async () => {
	const { createNoise2D: CreateNoise2D } = await import("simplex-noise");

	const LayoutNoise: Noise2D = CreateNoise2D();

	/**
	 * Scatter:returns noise-driven X/Y offsets for layout distribution.
	 * Each Index gets a deterministic but organic position.
	 */
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

	/**
	 * ScatterRotation:returns a noise-driven rotation angle.
	 * Useful for cards, badges, icons that need organic tilt.
	 */
	const ScatterRotation = (Index: number, MaxDegree: number = 3): number => {
		return LayoutNoise(Index * 0.37, Index * 0.91) * MaxDegree;
	};

	/**
	 * ScatterScale:returns a noise-driven scale factor.
	 * Centers around 1.0, deviates by Spread.
	 */
	const ScatterScale = (Index: number, Spread: number = 0.05): number => {
		return 1 + LayoutNoise(Index * 0.61, Index * 0.43) * Spread;
	};

	/**
	 * ScatterDelay:returns a noise-driven animation delay in ms.
	 * Creates organic staggering instead of linear index * N.
	 */
	const ScatterDelay = (Index: number, MaxDelay: number = 200): number => {
		const Raw = LayoutNoise(Index * 0.83, Index * 0.29);
		return Math.abs(Raw) * MaxDelay;
	};

	/**
	 * ScatterOpacity:returns noise-driven opacity between Min and Max.
	 */
	const ScatterOpacity = (
		Index: number,
		Min: number = 0.7,
		Max: number = 1.0,
	): number => {
		const Raw = LayoutNoise(Index * 0.47, Index * 0.67);
		const Normalized = (Raw + 1) / 2; // 0..1
		return Min + Normalized * (Max - Min);
	};

	/**
	 * ApplyToElement:sets all attention CSS vars on one element.
	 */
	const ApplyToElement = (
		Element: HTMLElement,
		Index: number,
		SpreadX: number,
		SpreadY: number = 0,
	): void => {
		const Offset = Scatter(Index, SpreadX, SpreadY);
		const Rotation = ScatterRotation(Index);
		const Scale = ScatterScale(Index);
		const Delay = ScatterDelay(Index);
		const Opacity = ScatterOpacity(Index);

		Element.style.setProperty("--AttentionOffsetX", `${Offset.X}px`);
		Element.style.setProperty("--AttentionOffsetY", `${Offset.Y}px`);
		Element.style.setProperty("--AttentionRotation", `${Rotation}deg`);
		Element.style.setProperty("--AttentionScale", String(Scale));
		Element.style.setProperty("--AttentionDelay", `${Delay}ms`);
		Element.style.setProperty("--AttentionOpacity", String(Opacity));
	};

	/**
	 * ApplyToSelector:batch-applies attention vars to all matching elements.
	 */
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

	/**
	 * ObserveAndApply: IntersectionObserver-gated scatter.
	 * Applies attention vars only when elements scroll into view.
	 * Adds `StaccatoVisible` class for CSS transition on entry.
	 */
	const ObserveAndApply = (
		Selector: string,
		SpreadX: number,
		SpreadY: number = 0,
		Threshold: number = 0.1,
	): IntersectionObserver => {
		const ElementList = document.querySelectorAll<HTMLElement>(Selector);

		const Observer = new IntersectionObserver(
			(EntryList) => {
				for (const Entry of EntryList) {
					if (Entry.isIntersecting) {
						const Element = Entry.target as HTMLElement;
						const Index = Array.from(ElementList).indexOf(Element);

						if (Index >= 0) {
							ApplyToElement(Element, Index, SpreadX, SpreadY);
						}

						Element.classList.add("StaccatoVisible");
						Observer.unobserve(Element);
					}
				}
			},
			{ threshold: Threshold },
		);

		ElementList.forEach((Element) => {
			Observer.observe(Element);
		});

		return Observer;
	};

	return {
		Scatter,
		ScatterRotation,
		ScatterScale,
		ScatterDelay,
		ScatterOpacity,
		ApplyToElement,
		ApplyToSelector,
		ObserveAndApply,
		LayoutNoise,
	};
})();
