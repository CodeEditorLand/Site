import { _ as e } from "./preload-helper.D21cck6N.js";
import { g as t, u as a, i as r, c as n, t as s } from "./web.D_hp9GMo.js";
var i = s(
		'<div class="w-full overflow-hidden bg-black p-2"><p class=sr-only></p><div class="flex justify-center"aria-hidden=true>',
	),
	o = s("<div>"),
	l = s("<div class=mr-2>"),
	c = s("<div class=flex>");
const u = ({ Text: e } = { Text: "" }) => {
		const [s, u] = m(!0),
			[p, v] = m(0),
			[w, g] = m(),
			[_, x] = m(10),
			[E] = m(e),
			M = () => E() + "   " + E() + "   ",
			b = () => E().length > _(),
			[T, j] = m(0);
		h(() => {
			const e = () => {
				w() &&
					x(Math.max(1, Math.floor((w()?.offsetWidth ?? 100) / 32)));
			};
			return (
				e(),
				window.addEventListener("resize", e),
				() => window.removeEventListener("resize", e)
			);
		}),
			d(() => {
				if (!b()) return;
				let e;
				u(!1);
				const t = 4 * M().length,
					a = (r) => {
						r - T() >= 50 && (v((e) => (e + 1) % t), j(r)),
							(e = requestAnimationFrame(a));
					};
				return (
					(e = requestAnimationFrame(a)),
					() => cancelAnimationFrame(e)
				);
			});
		const A = () => {
			if (!b()) return E().slice(0, _());
			const e = Math.floor((((p() / 2) % M().length) * 4) / 4);
			return (
				M().slice(e, e + _()) +
				M().slice(0, Math.max(0, e + _() - M().length))
			);
		};
		return (
			h(() => setTimeout(() => u(!1), 30 * A().length + 100 + 35)),
			(L = t(i)),
			(S = L.firstChild),
			(y = S.nextSibling),
			a(g, L),
			r(S, E),
			r(y, () =>
				A()
					.split("")
					.map((e, s) => {
						return (
							(i = t(o)),
							r(i, () => {
								return (
									(i = e),
									(u = t(l)),
									r(u, () =>
										(f[i.toUpperCase()] || f[" "])?.map(
											(e, i) => {
												return (
													(l = t(c)),
													r(l, () =>
														e.map((e, l) => {
															return (
																(c = t(o)),
																r(c, () =>
																	((e) => {
																		const [
																			r,
																			c,
																		] = m();
																		return (
																			h(
																				() => {
																					e &&
																						setTimeout(
																							() =>
																								r()?.classList.add(
																									"Shown",
																								),
																							30 *
																								s +
																								100 *
																									Math.random() +
																								5 *
																									(i +
																										l),
																						);
																				},
																			),
																			(u =
																				t(
																					o,
																				)),
																			a(
																				c,
																				u,
																			),
																			n(
																				u,
																				"Pixel h-2 w-2 " +
																					(e
																						? "bg-white"
																						: "bg-black"),
																			),
																			u
																		);
																		var u;
																	})(e),
																),
																c
															);
															var c;
														}),
													),
													l
												);
												var l;
											},
										),
									),
									u
								);
								var i, u;
							}),
							i
						);
						var i;
					}),
			),
			L
		);
		var L, S, y;
	},
	{ default: f } = await e(async () => {
		const { default: e } = await import("./Matrix.BYOAHmu9.js");
		return { default: e };
	}, []),
	{
		createEffect: d,
		createSignal: m,
		onMount: h,
	} = await e(async () => {
		const {
			createEffect: e,
			createSignal: t,
			onMount: a,
		} = await import("./web.D_hp9GMo.js").then((e) => e.s);
		return { createEffect: e, createSignal: t, onMount: a };
	}, []);
export { u as default };
