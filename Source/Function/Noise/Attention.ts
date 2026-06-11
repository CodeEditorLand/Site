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

		Min: number = 0.85,

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

	/**
	 * Lerp helper for smooth transitions
	 */
	const Lerp = (Start: number, End: number, Factor: number): number =>
		Start + (End - Start) * Factor;

	/**
	 * State for hover/focus animation
	 */
	interface HoverState {
		Element: HTMLElement;

		OriginalTransform: string;

		TargetOpacity: number;

		TargetScale: number;

		TargetRotation: number;

		CurrentOpacity: number;

		CurrentScale: number;

		CurrentRotation: number;

		IsHovered: boolean;

		IsFocused: boolean;

		FrameId: number;
	}

	/**
	 * Hover/Focus animation configuration
	 */
	interface HoverConfig {
		LerpFactor: number;

		ResetOpacity: number;

		ResetScale: number;

		ResetRotation: number;

		HoverOpacity: number;

		HoverScale: number;

		HoverRotation: number;
	}

	const DefaultConfig: HoverConfig = {
		LerpFactor: 0.08,
		ResetOpacity: 1.0,
		ResetScale: 1.0,
		ResetRotation: 0,
		HoverOpacity: 1.0,
		HoverScale: 1.02,
		HoverRotation: 0,
	};

	const HoverStateMap = new Map<HTMLElement, HoverState>();

	let AnimationFrameId = 0;

	/**
	 * Initialize hover state for an element
	 */
	const InitHoverState = (
		Element: HTMLElement,

		Config: Partial<HoverConfig> = {},
	): HoverState => {
		const FinalConfig = { ...DefaultConfig, ...Config };

		// Get current computed style for original transform
		const ComputedStyle = window.getComputedStyle(Element);

		const OriginalTransform = ComputedStyle.transform || "none";

		const State: HoverState = {
			Element,
			OriginalTransform,
			TargetOpacity: FinalConfig.ResetOpacity,
			CurrentOpacity: parseFloat(ComputedStyle.opacity) || 1,
			TargetScale: FinalConfig.ResetScale,
			CurrentScale: 1,
			TargetRotation: FinalConfig.ResetRotation,
			CurrentRotation: 0,
			IsHovered: false,
			IsFocused: false,
			FrameId: 0,
		};

		HoverStateMap.set(Element, State);

		return State;
	};

	/**
	 * Animation loop for all hovered/focused elements
	 */
	const AnimateHoverStates = (): void => {
		let HasActiveAnimations = false;

		HoverStateMap.forEach((State) => {
			if (State.IsHovered || State.IsFocused) {
				HasActiveAnimations = true;

				// Lerp towards hover/target values
				State.CurrentOpacity = Lerp(
					State.CurrentOpacity,

					State.TargetOpacity,

					DefaultConfig.LerpFactor,
				);

				State.CurrentScale = Lerp(
					State.CurrentScale,

					State.TargetScale,

					DefaultConfig.LerpFactor,
				);

				State.CurrentRotation = Lerp(
					State.CurrentRotation,

					State.TargetRotation,

					DefaultConfig.LerpFactor,
				);

				// Apply transforms with lerped values
				const Transform = `scale(${State.CurrentScale.toFixed(4)}) rotate(${State.CurrentRotation.toFixed(2)}deg)`;

				State.Element.style.transform = Transform;

				State.Element.style.opacity = String(State.CurrentOpacity);
			}
		});

		if (HasActiveAnimations) {
			AnimationFrameId = requestAnimationFrame(AnimateHoverStates);
		}
	};

	/**
	 * Handle mouse enter - start lerping to hover state
	 */
	const OnMouseEnter = (Event: Event): void => {
		const Element = Event.target as HTMLElement;

		if (!Element) return;

		let State = HoverStateMap.get(Element);

		if (!State) {
			State = InitHoverState(Element);
		}

		State.IsHovered = true;

		State.TargetOpacity = DefaultConfig.HoverOpacity;

		State.TargetScale = DefaultConfig.HoverScale;

		State.TargetRotation = DefaultConfig.HoverRotation;

		// Add visual indicator class
		Element.classList.add("StaccatoHover");

		// Start animation loop if not running
		if (!AnimationFrameId) {
			AnimationFrameId = requestAnimationFrame(AnimateHoverStates);
		}
	};

	/**
	 * Handle mouse leave - lerp back to reset state
	 */
	const OnMouseLeave = (Event: Event): void => {
		const Element = Event.target as HTMLElement;

		if (!Element) return;

		const State = HoverStateMap.get(Element);

		if (!State) return;

		State.IsHovered = false;

		State.TargetOpacity = DefaultConfig.ResetOpacity;

		State.TargetScale = DefaultConfig.ResetScale;

		State.TargetRotation = DefaultConfig.ResetRotation;

		// Remove hover class
		Element.classList.remove("StaccatoHover");
	};

	/**
	 * Handle focus - start lerping to focus state
	 */
	const OnFocus = (Event: Event): void => {
		const Element = Event.target as HTMLElement;

		if (!Element) return;

		let State = HoverStateMap.get(Element);

		if (!State) {
			State = InitHoverState(Element);
		}

		State.IsFocused = true;

		State.TargetOpacity = DefaultConfig.HoverOpacity;

		State.TargetScale = DefaultConfig.HoverScale;

		State.TargetRotation = DefaultConfig.HoverRotation;

		Element.classList.add("StaccatoFocus");

		if (!AnimationFrameId) {
			AnimationFrameId = requestAnimationFrame(AnimateHoverStates);
		}
	};

	/**
	 * Handle blur - lerp back to reset state
	 */
	const OnBlur = (Event: Event): void => {
		const Element = Event.target as HTMLElement;

		if (!Element) return;

		const State = HoverStateMap.get(Element);

		if (!State) return;

		State.IsFocused = false;

		State.TargetOpacity = DefaultConfig.ResetOpacity;

		State.TargetScale = DefaultConfig.ResetScale;

		State.TargetRotation = DefaultConfig.ResetRotation;

		Element.classList.remove("StaccatoFocus");
	};

	/**
	 * Apply hover/focus handlers to a selector
	 */
	const ApplyHoverEffects = (
		Selector: string,

		Config: Partial<HoverConfig> = {},
	): void => {
		const ElementList = document.querySelectorAll<HTMLElement>(Selector);

		ElementList.forEach((Element) => {
			const State = InitHoverState(Element, Config);

			// Store config on element for retrieval
			(
				Element as unknown as { StaccatoHoverConfig: HoverConfig }
			).StaccatoHoverConfig = {
				...DefaultConfig,
				...Config,
			};

			// Add event listeners
			Element.addEventListener("mouseenter", OnMouseEnter);

			Element.addEventListener("mouseleave", OnMouseLeave);

			Element.addEventListener("focus", OnFocus, true);

			Element.addEventListener("blur", OnBlur, true);

			// Make focusable if not already
			if (Element.getAttribute("tabindex") === null) {
				Element.setAttribute("tabindex", "0");
			}
		});
	};

	/**
	 * Remove hover/focus handlers from a selector
	 */
	const RemoveHoverEffects = (Selector: string): void => {
		const ElementList = document.querySelectorAll<HTMLElement>(Selector);

		ElementList.forEach((Element) => {
			Element.removeEventListener("mouseenter", OnMouseEnter);

			Element.removeEventListener("mouseleave", OnMouseLeave);

			Element.removeEventListener("focus", OnFocus, true);

			Element.removeEventListener("blur", OnBlur, true);

			HoverStateMap.delete(Element);

			Element.classList.remove("StaccatoHover", "StaccatoFocus");
		});
	};

	/**
	 * Order elements on hover - brings hovered element to front with z-index
	 */
	const OrderOnHover = (Selector: string, ZIndexBase: number = 10): void => {
		const ElementList = document.querySelectorAll<HTMLElement>(Selector);

		ElementList.forEach((Element, Index) => {
			Element.style.setProperty("--StaccatoOrderIndex", String(Index));

			Element.addEventListener("mouseenter", () => {
				Element.style.zIndex = String(ZIndexBase + ElementList.length);

				Element.style.setProperty("--StaccatoIsOrdered", "1");
			});

			Element.addEventListener("mouseleave", () => {
				setTimeout(() => {
					Element.style.zIndex = String(ZIndexBase);

					Element.style.setProperty("--StaccatoIsOrdered", "0");
				}, 300); // Delay to allow other elements to animate
			});
		});
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
		ApplyHoverEffects,
		RemoveHoverEffects,
		OrderOnHover,
		Lerp,
		LayoutNoise,
	};
})();
