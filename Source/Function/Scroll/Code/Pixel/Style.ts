import type { Mouse, MovementDimensional } from "@Function/Scroll/Type.js";

/**
 * Style - one cell's painter.
 *
 * An instance owns one element and the three dust particles that fall off it.
 * `Roll(Time)` paints it for that frame; `Destroy()` takes it off the page.
 *
 * The version this replaces did its dust work inside `Roll`, which meant the
 * three particles were destroyed and re-created on every frame - three
 * `createElement`s, three `remove`s, three `cancelAnimationFrame`s and three
 * `requestAnimationFrame`s per cell per frame, each new particle starting at
 * `performance.now()` so its eighty-three minute drift never got past its
 * first millisecond. The particles are now built once, when the cell is built,
 * and only their colour is pushed per frame.
 *
 * The time is a parameter rather than a constructor value for the same reason:
 * the cell used to be thrown away and rebuilt whenever the clock ticked. It is
 * built once now and told the time.
 */
export default class {
	private readonly Element: HTMLDivElement;

	private TimeNoise: number;

	private readonly Seed: number;

	private readonly Column: number;

	private readonly Position: number;

	private readonly Influence: number;

	private readonly Offset: MovementDimensional;

	private readonly Mouse: Mouse; // Not an Accessor anymore, direct value

	private readonly Spectrum: string[];

	private readonly Dust: HTMLDivElement[] = [];

	private ParticleSeed: number[] = [];

	/** The colour last written to a particle, so a frame with no change is free. */
	private Ink = "";

	private StateParticle: Array<{
		Start: number;

		Duration: number;

		ID?: number | undefined;
	}> = [];

	constructor(
		Element: HTMLDivElement,

		Parameter: {
			TimeNoise: number;

			Seed: number;

			Column: number;

			Position: number;

			Influence: number;

			Offset: MovementDimensional;

			Mouse: Mouse; // Direct value, not Accessor

			Spectrum: string[];
		},
	) {
		this.Element = Element;

		this.TimeNoise = Parameter.TimeNoise;

		this.Seed = Parameter.Seed;

		this.Column = Parameter.Column;

		this.Position = Parameter.Position;

		this.Influence = Parameter.Influence;

		this.Offset = Parameter.Offset;

		this.Mouse = Parameter.Mouse;

		this.Spectrum = Parameter.Spectrum;

		/* The cell is built with a real clock reading, not zero: its dust
		   starts drifting in the same frame the cell appears. */
		this.UpdateTime(performance.now());

		this.MountParticles();
	}

	/** Paint the cell for one frame. `Time` is the clock's timestamp. */
	Roll(Time?: number): void {
		if (Time !== undefined) this.UpdateTime(Time);

		this.Transform();

		this.ZIndex();

		this.Color();

		this.Shadow();

		this.Opacity();

		this.Transition();
	}

	/** Stop the cell: no frame survives it, and its dust leaves the page. */
	Destroy(): void {
		for (const State of this.StateParticle) {
			if (State.ID) cancelAnimationFrame(State.ID);

			State.ID = undefined;
		}

		for (const Particle of this.Dust) Particle.remove();

		this.Dust.length = 0;

		this.StateParticle.length = 0;
	}

	/**
	 * The clock, folded into the noise the cell paints.
	 *
	 * This is the expression `Pixel.tsx` used to evaluate and pass in as a
	 * prop; it belongs here because it is a function of the cell's own seed and
	 * the time, and both are already fields.
	 */
	private UpdateTime(Time: number): void {
		this.TimeNoise =
			this.Position * 0.1 +
			Time *
				(Constant.MULTIPLIER_TIME_BASE +
					Noise(Time * 0.001 + this.Seed, 30) *
						Constant.MULTIPLIER_TIME_VARIATION);
	}

	private Transform(): void {
		const Transform = `rotate(${
			(Layer(this.TimeNoise + this.Seed, this.Column + this.Position) *
				Math.PI +
				this.Offset.Rotation * this.Influence) *
			(180 / Math.PI)
		}deg) translateX(${this.Radius()}px)`;

		// Direct style assignment instead of createEffect
		this.Element.style.transform = this.Mouse.Active
			? `${Transform} translate(${this.Offset.X}px, ${this.Offset.Y}px) scale(${this.Offset.Scale})`
			: Transform;
	}

	private Radius(): number {
		return (
			((Layer(this.TimeNoise + this.Seed, this.Column + this.Position) +
				1) /
				2) *
				(Constant.AMPLITUDE_BASE +
					Layer(this.TimeNoise, 10) * Constant.AMPLITUDE_VARIATION) *
				(1 - this.Influence) +
			Math.sqrt(
				this.Offset.X * this.Offset.X + this.Offset.Y * this.Offset.Y,
			) *
				this.Influence
		);
	}

	private ZIndex(): void {
		this.Element.style.zIndex = Math.floor(
			Lerp(
				Math.floor(
					((Layer(
						this.TimeNoise + this.Seed,

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

	private Color(): void {
		// Direct style assignment instead of createEffect
		this.Element.style.backgroundColor = this.Mouse.Active
			? `hsl(${Lerp(
					((Layer(
						this.TimeNoise + this.Seed,
						this.Column + this.Position,
					) +
						1) /
						2) *
						360,
					(this.Mouse.Velocity * 2) % 360,
					this.Influence,
				)}, 100%, 50%)`
			: (this.Spectrum[
					Math.floor(
						(Layer(
							this.TimeNoise + this.Seed,

							this.Column + this.Position,
						) +
							1) *
							180,
					)
				] ?? "");
	}

	private Shadow(): void {
		// Direct style assignment instead of createEffect
		/* The element's own colour, kept rather than read back off the DOM:
		   reading `style.backgroundColor` after `Color()` wrote it is a
		   string round-trip through the CSSOM for a value we already hold. */
		const Color: string = this.Mouse.Active
			? this.Element.style.backgroundColor
			: (this.Spectrum[
					Math.floor(
						(Layer(
							this.TimeNoise + this.Seed,

							this.Column + this.Position,
						) +
							1) *
							180,
					)
				] ?? "");

		this.Element.style.boxShadow = `0 0 ${Lerp(
			((Layer(this.TimeNoise + this.Seed, this.Column + 50) + 1) / 2) *
				10,
			this.Influence * 20,
			this.Influence,
		)}px ${Color}`;

		if (Color === this.Ink) return;

		this.Ink = Color;

		for (const Particle of this.Dust) Particle.style.backgroundColor = Color;
	}

	private Opacity(): void {
		this.Element.style.opacity = Lerp(
			((Layer(this.TimeNoise + this.Seed, this.Column + 150) + 1) / 2) *
				0.3 +
				0.7,

			1,

			this.Influence,
		).toString();
	}

	private Transition(): void {
		this.Element.style.transitionDuration = `${(
			((Layer(this.TimeNoise + this.Seed, this.Column + 100) + 1) / 2) *
				10 +
			5
		).toFixed(2)}s`;
	}

	/**
	 * The dust: three particles, built once.
	 *
	 * Each one carries its own frame chain for the whole life of the cell -
	 * `Jiggle` reschedules itself - because its drift is eighty-three minutes
	 * long and restarting it per frame would restart the drift too.
	 */
	private MountParticles(): void {
		this.ParticleSeed = Array.from(
			{ length: Constant.DUST_PARTICLE_COUNT },

			() => Math.random() * 1000,
		);

		for (let Index = 0; Index < Constant.DUST_PARTICLE_COUNT; Index++) {
			const Particle = document.createElement("div");

			Particle.className = "Dust";

			Object.assign(Particle.style, {
				position: "absolute",
				pointerEvents: "none",
				width: "2px",
				height: "2px",
				borderRadius: "50%",
				left: "50%",
				top: "100%",
				willChange: "transform, opacity",
			});

			this.Element.appendChild(Particle);

			this.Dust.push(Particle);

			this.StateParticle.push({
				Start: performance.now(),

				Duration: 5000000 + Math.random() * 1000,
			});

			this.Jiggle(Index, performance.now());
		}
	}

	private Jiggle(Index: number, CurrentTime: number): void {
		const State = this.StateParticle[Index];

		if (!State) return;

		const Elapsed = CurrentTime - State.Start;

		const Progress = Math.min(Elapsed / State.Duration, 1);

		const Seed = this.ParticleSeed[Index] ?? 0;

		const TimeNoise = this.TimeNoise + Progress * Seed;

		// Calculate base properties using noise
		const Scale = Lerp(
			0.8,

			0.2,

			(Layer(TimeNoise, this.Column + 300) + 1) / 2,
		);

		const Opacity = Lerp(
			0.8,

			0,

			(Layer(TimeNoise, this.Column + 400) + 1) / 2,
		);

		// 3D rotations using noise
		const XRotate = Lerp(
			0,

			360,

			(Layer(TimeNoise, this.Column + 500) + 1) / 2,
		);

		const YRotate = Lerp(
			0,

			360,

			(Layer(TimeNoise, this.Column + 600) + 1) / 2,
		);

		const ZRotate = Lerp(
			0,

			360,

			(Layer(TimeNoise, this.Column + 700) + 1) / 2,
		);

		let Transform: string;

		if (this.Mouse.Active && this.Influence > 0) {
			const ProgressSpiral =
				(Progress + Index / Constant.DUST_PARTICLE_COUNT) % 1;

			const HeightSpiral =
				Constant.SPIRAL_HEIGHT * this.Influence * (1 - ProgressSpiral);

			const RadiusSpiral = Constant.SPIRAL_RADIUS * this.Influence;

			const Angle =
				ProgressSpiral * Math.PI * 2 * Constant.SPIRAL_ROTATIONS;

			const XSpiral = Math.cos(Angle) * RadiusSpiral * ProgressSpiral;

			const ZSpiral = Math.sin(Angle) * RadiusSpiral * ProgressSpiral;

			const XOffsetVelocity = this.Mouse.Velocity * 20 * this.Influence;

			const YOffsetVelocity = -this.Mouse.Velocity * 15 * this.Influence;

			Transform = `
				translate3d(
					calc(-50% + ${XSpiral + XOffsetVelocity}px),
					${-HeightSpiral + YOffsetVelocity}px,
					${ZSpiral}px
				)
				rotateX(${XRotate + this.Mouse.Velocity * 720 * this.Influence}deg)
				rotateY(${YRotate + this.Mouse.Velocity * 720 * this.Influence}deg)
				rotateZ(${ZRotate + Angle * (180 / Math.PI)}deg)
				scale3d(${Scale}, ${Scale}, ${Scale})
			`;
		} else {
			Transform = `
				translate3d(
					calc(-50% + ${Lerp(-20, 20, (Layer(TimeNoise, this.Column + 100) + 1) / 2)}px),
					${Lerp(0, 50, (Layer(TimeNoise, this.Column + 200) + 1) / 2)}px,
					0
				)
				rotateX(${XRotate}deg)
				rotateY(${YRotate}deg)
				rotateZ(${ZRotate}deg)
				scale3d(${Scale}, ${Scale}, ${Scale})
			`;
		}

		Object.assign(this.Dust[Index]!.style, {
			opacity: Opacity.toString(),
			transform: Transform,
		});

		if (Progress >= 1) {
			State.Start = CurrentTime;

			this.ParticleSeed[Index] = Math.random() * 1000;
		}

		State.ID = requestAnimationFrame((Time) => this.Jiggle(Index, Time));
	}
}

// Import these lazily as they're external dependencies
export const { default: Constant } =
	await import("@Function/Scroll/Code/Pixel/Animation/Constant.js");

export const { Layer, Lerp, Noise } =
	await import("@Function/Scroll/Code/Pixel/Animation.js");
