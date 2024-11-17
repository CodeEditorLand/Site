import { _ as e } from "./preload-helper.D21cck6N.js";
import {
	g as t,
	u as a,
	i as r,
	c as n,
	a as s,
	t as i,
} from "./web.CjQ3rXGK.js";
var o = i(
		'<div><p class=sr-only></p><div class="flex justify-center"aria-hidden=true>',
	),
	l = i("<div>"),
	c = i("<div class=mr-2>"),
	u = i("<div class=flex>");
const d = ({ Text: e } = { Text: "" }) => {
		const [i, d] = h(!0),
			[v, w] = h(0),
			[g, _] = h(),
			[x, E] = h(10),
			[M] = h(e),
			b = () => M() + "   " + M() + "   ",
			L = () => M().length > x(),
			[j, A] = h(0);
		p(() => {
			const e = () => {
				g() &&
					E(Math.max(1, Math.floor((g()?.offsetWidth ?? 100) / 32)));
			};
			return (
				e(),
				window.addEventListener("resize", e),
				() => window.removeEventListener("resize", e)
			);
		}),
			m(() => {
				if (!L()) return;
				let e;
				const t = 4 * b().length,
					a = (r) => {
						r - j() >= 50 && (w((e) => (e + 1) % t), A(r)),
							(e = requestAnimationFrame(a));
					};
				return (
					(e = requestAnimationFrame(a)),
					() => cancelAnimationFrame(e)
				);
			});
		return (
			(S = t(o)),
			(T = S.firstChild),
			(y = T.nextSibling),
			a(_, S),
			r(T, M),
			r(y, () =>
				(() => {
					if (!L()) return M().slice(0, x());
					const e = Math.floor((((v() / 2) % b().length) * 4) / 4);
					return (
						b().slice(e, e + x()) +
						b().slice(0, Math.max(0, e + x() - b().length))
					);
				})()
					.split("")
					.map((e, n) => {
						return (
							(i = t(l)),
							r(i, () => {
								return (
									(i = e),
									(o = t(c)),
									r(o, () =>
										(f[i.toUpperCase()] || f[" "])?.map(
											(e, i) => {
												return (
													(o = t(u)),
													r(o, () =>
														e.map((e, o) => {
															return (
																(c = t(l)),
																r(c, () =>
																	((e) => {
																		const [
																			r,
																			c,
																		] = h();
																		return (
																			p(
																				() => {
																					e &&
																						setTimeout(
																							() =>
																								r()?.classList.add(
																									"Shown",
																								),
																							30 *
																								n +
																								100 *
																									Math.random() +
																								5 *
																									(i +
																										o),
																						);
																				},
																			),
																			(u =
																				t(
																					l,
																				)),
																			a(
																				c,
																				u,
																			),
																			s(
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
													o
												);
												var o;
											},
										),
									),
									o
								);
								var i, o;
							}),
							i
						);
						var i;
					}),
			),
			n(() =>
				s(
					S,
					"w-full overflow-hidden bg-black p-2 " +
						(i() ? "Loaded" : ""),
				),
			),
			S
		);
		var S, T, y;
	},
	{ default: f } = await e(async () => {
		const { default: e } = await import("./Matrix.BYOAHmu9.js");
		return { default: e };
	}, []),
	{
		createEffect: m,
		createSignal: h,
		onMount: p,
	} = await e(async () => {
		const {
			createEffect: e,
			createSignal: t,
			onMount: a,
		} = await import("./web.CjQ3rXGK.js").then((e) => e.s);
		return { createEffect: e, createSignal: t, onMount: a };
	}, []);
export { d as default };
