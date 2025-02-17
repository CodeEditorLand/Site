import type { Mouse, MovementDimensional } from "@Function/Scroll/Type.js";

export default class {
	private readonly Element: HTMLDivElement | undefined;

	private readonly TimeNow: number;

	private readonly Seed: number;

	private readonly Column: number;

	private readonly Position: number;

	private readonly Influence: number;

	private readonly Offset: MovementDimensional;

	private readonly Mouse: Mouse;

	private readonly Spectrum: string[];

	constructor(
		Element: HTMLDivElement | undefined,

		Parameter: {
			TimeNow: number;

			Seed: number;

			Column: number;

			Position: number;

			Influence: number;

			Offset: MovementDimensional;

			Mouse: Mouse;

			Spectrum: string[];
		},
	) {
		this.Element = Element;

		this.TimeNow = Parameter.TimeNow;

		this.Seed = Parameter.Seed;

		this.Column = Parameter.Column;

		this.Position = Parameter.Position;

		this.Influence = Parameter.Influence;

		this.Offset = Parameter.Offset;

		this.Mouse = Parameter.Mouse;

		this.Spectrum = Parameter.Spectrum;
	}

	Roll(): void {
		this.Transform();

		this.ZIndex();

		this.Color();

		this.Shadow();

		this.Opacity();

		this.Transition();
	}

	private Transform(): void {
		const Transform = `rotate(${
			(Layer(this.TimeNow + this.Seed, this.Column + this.Position) *
				Math.PI +
				this.Offset.Rotation * this.Influence) *
			(180 / Math.PI)
		}deg) translateX(${this.Radius()}px)`;

		if (this.Element) {
			this.Element.style.transform = this.Mouse.Active
				? `${Transform} translate(${this.Offset.X}px, ${this.Offset.Y}px) scale(${this.Offset.Scale})`
				: Transform;
		}
	}

	private Radius(): number {
		return (
			((Layer(this.TimeNow + this.Seed, this.Column + this.Position) +
				1) /
				2) *
				(Constant.AMPLITUDE_BASE +
					Layer(this.TimeNow, 10) * Constant.AMPLITUDE_VARIATION) *
				(1 - this.Influence) +
			Math.sqrt(
				this.Offset.X * this.Offset.X + this.Offset.Y * this.Offset.Y,
			) *
				this.Influence
		);
	}

	private ZIndex(): void {
		if (this.Element) {
			this.Element.style.zIndex = Math.floor(
				Lerp(
					Math.floor(
						((Layer(
							this.TimeNow + this.Seed,

							this.Column + this.Position,
						) +
							1) /
							2) *
							10,
					),

					100,

					this.Influence,
				),
			).toString();
		}
	}

	private Color(): void {
		// @ts-expect-error
		this.Element.style.backgroundColor = this.Mouse.Active
			? `hsl(${Lerp(
					((Layer(
						this.TimeNow + this.Seed,

						this.Column + this.Position,
					) +
						1) /
						2) *
						360,

					(this.Mouse.Velocity * 2) % 360,

					this.Influence,
				)}, 100%, 50%)`
			: this.Spectrum[
					Math.floor(
						(Layer(
							this.TimeNow + this.Seed,

							this.Column + this.Position,
						) +
							1) *
							180,
					)
				];
	}

	private Shadow(): void {
		if (this.Element) {
			this.Element.style.boxShadow = `0 0 ${Lerp(
				((Layer(this.TimeNow + this.Seed, this.Column + 50) + 1) / 2) *
					10,

				this.Influence * 20,

				this.Influence,
			)}px ${
				this.Mouse.Active
					? this.Element.style.backgroundColor
					: this.Spectrum[
							Math.floor(
								(Layer(
									this.TimeNow + this.Seed,

									this.Column + this.Position,
								) +
									1) *
									180,
							)
						]
			}`;
		}
	}

	private Opacity(): void {
		if (this.Element) {
			this.Element.style.opacity = Lerp(
				((Layer(this.TimeNow + this.Seed, this.Column + 150) + 1) / 2) *
					0.3 +
					0.7,

				1,

				this.Influence,
			).toString();
		}
	}

	private Transition(): void {
		if (this.Element) {
			this.Element.style.transitionDuration = `${(
				((Layer(this.TimeNow + this.Seed, this.Column + 100) + 1) / 2) *
					10 +
				5
			).toFixed(2)}s`;
		}
	}
}

export const { default: Constant } = await import(
	"@Function/Scroll/Code/Pixel/Animation/Constant.js"
);

export const { Layer, Lerp } = await import(
	"@Function/Scroll/Code/Pixel/Animation.js"
);
