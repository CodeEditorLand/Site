import type { Mouse, MovementDimensional } from "@Function/Scroll/Type.js";

export default class {
	private readonly TimeCurrent: number;

	private readonly Seed: number;

	private readonly StateMouse: Mouse;

	private readonly InfluenceMouse: number;

	constructor(
		TimeCurrent: number,

		Seed: number,

		StateMouse: Mouse,

		mouseInfluence: number,
	) {
		this.TimeCurrent = TimeCurrent;

		this.Seed = Seed;

		this.StateMouse = StateMouse;

		this.InfluenceMouse = mouseInfluence;
	}

	Calculate(dx: number, dy: number): MovementDimensional {
		const { DIMENSION } = Constant;

		const FactorMouse =
			this.InfluenceMouse * Math.min(1, this.StateMouse.Velocity / 100);

		return Array.from({ length: DIMENSION }).reduce(
			(acc, _, i) => {
				const noiseParams = {
					amplitude: 20 + i * 10,

					frequency: 0.002 + i * 0.001,

					phase: this.Seed + i * 1000,
				};

				const value = Noise(
					this.TimeCurrent * 0.001 * noiseParams.frequency +
						noiseParams.phase,

					i * 1000 + this.Seed,
				);

				this.Apply(
					acc as MovementDimensional,

					i,

					value,

					noiseParams.amplitude,

					dx,

					dy,

					FactorMouse,
				);

				return acc;
			},

			{ X: 0, Y: 0, Rotation: 0, Scale: 1 },
		) as MovementDimensional;
	}

	private Apply(
		acc: MovementDimensional,

		dimension: number,

		value: number,

		amplitude: number,

		dx: number,

		dy: number,

		mouseFactor: number,
	): void {
		// biome-ignore lint/style/useDefaultSwitchClause:
		switch (dimension) {
			case 0:
				acc.X = value * amplitude + dx * mouseFactor;

				break;

			case 1:
				acc.Y = value * amplitude + dy * mouseFactor;

				break;

			case 2:
				acc.Rotation = value * 360 * mouseFactor;

				break;

			case 3:
				acc.Scale = 1 + value * 0.5 * mouseFactor;

				break;
		}
	}
}

export const { default: Constant } = await import(
	"@Function/Scroll/Code/Pixel/Animation/Constant.js"
);

export const { Noise } = await import(
	"@Function/Scroll/Code/Pixel/Animation.js"
);
