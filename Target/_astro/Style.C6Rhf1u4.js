const __vite__mapDeps = (
	i,
	m = __vite__mapDeps,
	d = m.f ||
		(m.f = [
			"_astro/Animation.cnKiTHGE.js",
			"_astro/preload-helper.D21cck6N.js",
		]),
) => i.map((i) => d[i]);
import { _ as t } from "./preload-helper.D21cck6N.js";
import { j as e } from "./web.CCnzT9kG.js";
class i {
	Element;
	TimeNoise;
	Seed;
	Column;
	Position;
	Influence;
	Offset;
	Mouse;
	Spectrum;
	Dust = [];
	ParticleSeed = [];
	StateParticle = [];
	constructor(t, e) {
		(this.Element = t),
			(this.TimeNoise = e.TimeNoise),
			(this.Seed = e.Seed),
			(this.Column = e.Column),
			(this.Position = e.Position),
			(this.Influence = e.Influence),
			(this.Offset = e.Offset),
			(this.Mouse = e.Mouse),
			(this.Spectrum = e.Spectrum);
	}
	Roll() {
		this.Transform(),
			this.ZIndex(),
			this.Color(),
			this.Particle(),
			this.Shadow(),
			this.Opacity(),
			this.Transition();
	}
	Transform() {
		const t = `rotate(${(n(this.TimeNoise + this.Seed, this.Column + this.Position) * Math.PI + this.Offset.Rotation * this.Influence) * (180 / Math.PI)}deg) translateX(${this.Radius()}px)`;
		e(() => {
			this.Element.style.transform = this.Mouse().Active
				? `${t} translate(${this.Offset.X}px, ${this.Offset.Y}px) scale(${this.Offset.Scale})`
				: t;
		});
	}
	Radius() {
		return (
			((n(this.TimeNoise + this.Seed, this.Column + this.Position) + 1) /
				2) *
				(s.AMPLITUDE_BASE +
					n(this.TimeNoise, 10) * s.AMPLITUDE_VARIATION) *
				(1 - this.Influence) +
			Math.sqrt(
				this.Offset.X * this.Offset.X + this.Offset.Y * this.Offset.Y,
			) *
				this.Influence
		);
	}
	ZIndex() {
		this.Element.style.zIndex = Math.floor(
			o(
				Math.floor(
					((n(
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
	Color() {
		e(() => {
			this.Element.style.backgroundColor = this.Mouse().Active
				? `hsl(${o(((n(this.TimeNoise + this.Seed, this.Column + this.Position) + 1) / 2) * 360, (2 * this.Mouse().Velocity) % 360, this.Influence)}, 100%, 50%)`
				: this.Spectrum[
						Math.floor(
							180 *
								(n(
									this.TimeNoise + this.Seed,
									this.Column + this.Position,
								) +
									1),
						)
					];
		});
	}
	Shadow() {
		e(() => {
			const t = this.Mouse().Active
				? this.Element.style.backgroundColor
				: this.Spectrum[
						Math.floor(
							180 *
								(n(
									this.TimeNoise + this.Seed,
									this.Column + this.Position,
								) +
									1),
						)
					];
			(this.Element.style.boxShadow = `0 0 ${o(((n(this.TimeNoise + this.Seed, this.Column + 50) + 1) / 2) * 10, 20 * this.Influence, this.Influence)}px ${t}`),
				this.Dust.forEach((e, i) => this.ParticleUpdate(e, i, t));
		});
	}
	Opacity() {
		this.Element.style.opacity = o(
			((n(this.TimeNoise + this.Seed, this.Column + 150) + 1) / 2) * 0.3 +
				0.7,
			1,
			this.Influence,
		).toString();
	}
	Transition() {
		this.Element.style.transitionDuration = `${(((n(this.TimeNoise + this.Seed, this.Column + 100) + 1) / 2) * 10 + 5).toFixed(2)}s`;
	}
	ParticleUpdate(t, e, i) {
		const h = this.StateParticle[e],
			a = this.ParticleSeed[e] ?? 0,
			l = (r) => {
				const c = r - h.Start,
					u = Math.min(c / h.Duration, 1),
					m = this.TimeNoise + u * a,
					f = o(0.8, 0.2, (n(m, this.Column + 300) + 1) / 2),
					d = o(0.8, 0, (n(m, this.Column + 400) + 1) / 2),
					I = o(0, 360, (n(m, this.Column + 500) + 1) / 2),
					S = o(0, 360, (n(m, this.Column + 600) + 1) / 2),
					p = o(0, 360, (n(m, this.Column + 700) + 1) / 2);
				let P;
				if (this.Mouse().Active && this.Influence > 0) {
					const t = (u + e / s.DUST_PARTICLE_COUNT) % 1,
						i = s.SPIRAL_HEIGHT * this.Influence * (1 - t),
						n = s.SPIRAL_RADIUS * this.Influence,
						o = t * Math.PI * 2 * s.SPIRAL_ROTATIONS,
						h = Math.cos(o) * n * t,
						a = Math.sin(o) * n * t;
					P = `\n                    translate3d(\n                        calc(-50% + ${h + 20 * this.Mouse().Velocity * this.Influence}px),\n                        ${-i + 15 * -this.Mouse().Velocity * this.Influence}px,\n                        ${a}px\n                    )\n                    rotateX(${I + 720 * this.Mouse().Velocity * this.Influence}deg)\n                    rotateY(${S + 720 * this.Mouse().Velocity * this.Influence}deg)\n                    rotateZ(${p + o * (180 / Math.PI)}deg)\n                    scale3d(${f}, ${f}, ${f})\n                `;
				} else
					P = `\n                    translate3d(\n                        calc(-50% + ${o(-20, 20, (n(m, this.Column + 100) + 1) / 2)}px),\n                        ${o(0, 50, (n(m, this.Column + 200) + 1) / 2)}px,\n                        0\n                    )\n                    rotateX(${I}deg)\n                    rotateY(${S}deg)\n                    rotateZ(${p}deg)\n                    scale3d(${f}, ${f}, ${f})\n                `;
				Object.assign(t.style, {
					backgroundColor: i,
					opacity: d.toString(),
					transform: P,
				}),
					u >= 1 &&
						((h.Start = r),
						(this.ParticleSeed[e] = 1e3 * Math.random())),
					(h.ID = requestAnimationFrame(l));
			};
		h.ID && cancelAnimationFrame(h.ID), (h.ID = requestAnimationFrame(l));
	}
	Particle() {
		this.Dust.forEach((t, e) => {
			this.StateParticle[e]?.ID &&
				cancelAnimationFrame(this.StateParticle[e].ID),
				t.remove();
		}),
			(this.Dust.length = 0),
			(this.StateParticle.length = 0),
			(this.ParticleSeed = Array.from(
				{ length: s.DUST_PARTICLE_COUNT },
				() => 1e3 * Math.random(),
			));
		for (let t = 0; t < s.DUST_PARTICLE_COUNT; t++) {
			const t = document.createElement("div");
			(t.className = "Dust"),
				Object.assign(t.style, {
					position: "absolute",
					pointerEvents: "none",
					width: "2px",
					height: "2px",
					borderRadius: "50%",
					left: "50%",
					top: "100%",
					willChange: "transform, opacity",
				}),
				this.Element.appendChild(t),
				this.Dust.push(t),
				this.StateParticle.push({
					Start: performance.now(),
					Duration: 5e6 + 1e3 * Math.random(),
				});
		}
	}
}
const { default: s } = await t(async () => {
		const { default: t } = await import("./Constant.Ds8dDfZx.js");
		return { default: t };
	}, []),
	{ Layer: n, Lerp: o } = await t(
		async () => {
			const { Layer: t, Lerp: e } = await import(
				"./Animation.cnKiTHGE.js"
			);
			return { Layer: t, Lerp: e };
		},
		__vite__mapDeps([0, 1]),
	);
export { s as Constant, n as Layer, o as Lerp, i as default };
