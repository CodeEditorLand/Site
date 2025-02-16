import { createNoise2D } from "simplex-noise";
import {
	createSignal,
	onCleanup,
	onMount,
	type Accessor,
	type JSX,
} from "solid-js";

// Color spectrum generation
export const Spectrum = (Step: number): string[] => {
	const Spectrum: string[] = [];

	for (let Index = 0; Index < Step; Index++) {
		Spectrum.push(`hsl(${(Index / Step) * 360}, 100%, 50%)`);
	}

	return Spectrum;
};

export interface Mouse {
	X: number;

	Y: number;

	prevX: number;

	prevY: number;

	velocity: number;

	lastMoved: number;

	active: boolean;
}

interface MovementDimensional {
	x: number;

	y: number;

	rotation: number;

	scale: number;
}

// Color spectrum and constants remain the same
const All = Spectrum(360);

const RadiusEffect = 150;

const Dimension = 4;

const FadeDuration = 1000;

// biome-ignore lint/nursery/useComponentExportOnlyModules:
export default (
	...[Font, Character, Pixel, Show, Text, MouseState, Container]: [
		number,
		number,
		number,
		number,
		number,
		Accessor<Mouse>,
		Accessor<HTMLDivElement>,
	]
): JSX.Element => {
	const [Element, _Element] = createSignal<HTMLDivElement>();

	const Position = Character % Text;

	const Column = Pixel % 3;

	const Row = Math.floor(Pixel / 3);

	const Delay = Position * 0.1 + (Row * 3 + Column) * 0.05;

	if (Show) {
		const Seed = Position * 0.1 + Row * 0.05 + Column * 0.02;

		let Angle = 0;

		let Radius = 0;

		// Default animation parameters
		const AmplitudeB = 50;

		const AmplitudeV = 20;

		const SmoothingB = 0.05;

		const SmoothingV = 0.02;

		const MultiplierTimeB = 0.003;

		const MultiplierTimeV = 0.002;

		const TimeS = performance.now();

		onMount(() => {
			let ID: number;

			const Move = (): void => {
				if (!(Element() && Container)) {
					ID = requestAnimationFrame(Move);

					return;
				}

				const TimeC = performance.now();

				const timeSinceMouse = TimeC - MouseState().lastMoved;

				const mouseTransition = Math.max(
					0,
					1 - timeSinceMouse / FadeDuration,
				);

				// Calculate default simplex noise animation
				const NoiseTimeB = TimeC * 0.001 + Seed;

				const SmoothingD =
					SmoothingB + Noise(NoiseTimeB, 20) * SmoothingV;

				const TimeN =
					Position * 0.1 +
					TimeC *
						(MultiplierTimeB +
							Noise(NoiseTimeB, 30) * MultiplierTimeV);

				// Mouse influence calculations if active
				let InfluenceMouse = 0;

				let OffsetDimensional: MovementDimensional = {
					x: 0,
					y: 0,
					rotation: 0,
					scale: 1,
				};

				if (MouseState().active) {
					const pixelY =
						Container()?.getBoundingClientRect().top + Row * Font;

					const dx =
						MouseState().X -
						(Container()?.getBoundingClientRect().left +
							Column * Font);

					const dy = MouseState().Y - pixelY;

					const distance = Math.sqrt(dx * dx + dy * dy);

					InfluenceMouse =
						Math.max(0, 1 - distance / RadiusEffect) *
						mouseTransition;

					// Calculate dimensional offsets with mouse influence
					OffsetDimensional = new Array(Dimension)
						.fill(0)
						.map((_, i) => ({
							amplitude: 20 + i * 10,
							frequency: 0.002 + i * 0.001,
							phase: Seed + i * 1000,
						}))
						.reduce((MovementDimensional, _Noise, dim) => {
							const noiseValue = Noise(
								TimeC * 0.001 * _Noise.frequency + _Noise.phase,
								dim * 1000 + Seed,
							);

							const MouseFactor =
								InfluenceMouse *
								(Math.min(1, MouseState().velocity / 100) *
									mouseTransition);

							// biome-ignore lint/style/useDefaultSwitchClause:
							switch (dim) {
								case 0:
									MovementDimensional.x =
										noiseValue * _Noise.amplitude +
										dx * MouseFactor;

									break;

								case 1:
									MovementDimensional.y =
										noiseValue * _Noise.amplitude +
										dy * MouseFactor;

									break;

								case 2:
									MovementDimensional.rotation =
										noiseValue * 360 * MouseFactor;

									break;

								case 3:
									MovementDimensional.scale =
										1 + noiseValue * 0.5 * MouseFactor;

									break;
							}

							return MovementDimensional;
						}, OffsetDimensional);
				}

				Angle +=
					(Noise(TimeN + Seed, Column + Position) * Math.PI - Angle) *
						SmoothingD *
						(1 - InfluenceMouse) +
					OffsetDimensional.rotation * InfluenceMouse;

				Radius =
					((Noise(Row + Position, TimeN + Seed) + 1) / 2) *
						(AmplitudeB + Noise(NoiseTimeB, 10) * AmplitudeV) *
						Math.min((TimeC - TimeS) / 1000, 1) *
						(1 - InfluenceMouse) +
					Math.sqrt(
						OffsetDimensional.x * OffsetDimensional.x +
							OffsetDimensional.y * OffsetDimensional.y,
					) *
						InfluenceMouse;

				// Apply transformations
				if (Element()) {
					const __Element = Element() as HTMLDivElement;

					const Transform = `rotate(${Angle * (180 / Math.PI)}deg) translateX(${Radius}px)`;

					__Element.style.transform = MouseState().active
						? `${Transform} ${`translate(${OffsetDimensional.x}px, ${OffsetDimensional.y}px) scale(${OffsetDimensional.scale})`}`
						: Transform;

					// Color blending
					const Default = All[
						Math.floor(
							(Noise(TimeN + Seed, Column + Position) + 1) * 180,
						)
					] as string;

					const MouseColor = `hsl(${(MouseState().velocity * 2) % 360}, 100%, 50%)`;

					__Element.style.backgroundColor = MouseState().active
						? MouseColor
						: Default;

					__Element.style.boxShadow = `0 0 ${InfluenceMouse * 20}px ${
						MouseState().active ? MouseColor : Default
					}`;

					__Element.style.opacity = (
						0.7 +
						InfluenceMouse * 0.3
					).toString();

					__Element.style.transitionDuration = `${(
						((Noise(TimeN + Seed, Column + 100) + 1) / 2) * 10 +
						5
					).toFixed(2)}s`;
				}

				ID = requestAnimationFrame(Move);
			};

			Move();

			onCleanup(() => {
				cancelAnimationFrame(ID);
			});
		});
	}

	return (
		<div
			ref={_Element}
			class={`Pixel h-${Font} w-${Font} ${Show ? "Color" : "bg-transparent"}`}
			style={Show ? { "animation-delay": `${Delay}s` } : {}}
		/>
	);
};

export const Noise = createNoise2D();
