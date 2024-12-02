import { _ as e } from "./preload-helper.D21cck6N.js";
import { g as t, u as r, i as a, c as n, t as i } from "./web.D_hp9GMo.js";
var s = i(
		'<div class="w-full overflow-hidden bg-black p-2"><p class=sr-only></p><div class="flex justify-center"aria-hidden=true>',
	),
	o = i("<div>"),
	l = i("<div class=mr-2>"),
	c = i("<div class=flex>");
const u = ({ Text: e, Font: i } = { Text: "", Font: 1 }) => {
		const [u, p] = m(0),
			[v, w] = m(),
			[g, _] = m(10),
			[x] = m(e),
			E = () => x() + "   " + x() + "   ",
			b = () => x().length > g(),
			[M, j] = m(0);
		h(() => {
			const e = () => {
				v() &&
					_(Math.max(1, Math.floor((v()?.offsetWidth ?? 100) / 32)));
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
				const t = 4 * E().length,
					r = (a) => {
						a - M() >= 50 && (p((e) => (e + 1) % t), j(a)),
							(e = requestAnimationFrame(r));
					};
				return (
					(e = requestAnimationFrame(r)),
					() => cancelAnimationFrame(e)
				);
			});
		return (
			(A = t(s)),
			(F = A.firstChild),
			(y = F.nextSibling),
			r(w, A),
			a(F, x),
			a(y, () =>
				(() => {
					if (!b()) return x().slice(0, g());
					const e = Math.floor((((u() / 2) % E().length) * 4) / 4);
					return (
						E().slice(e, e + g()) +
						E().slice(0, Math.max(0, e + g() - E().length))
					);
				})()
					.split("")
					.map((e) => {
						return (
							(r = t(o)),
							a(r, () => {
								return (
									(r = e),
									(s = t(l)),
									a(s, () =>
										(f[r.toUpperCase()] || f[" "])?.map(
											(e) => {
												return (
													(r = t(c)),
													a(r, () =>
														e.map((e) => {
															return (
																(r = t(o)),
																a(r, () => {
																	return (
																		(r = e),
																		(a =
																			t(
																				o,
																			)),
																		n(
																			a,
																			`Pixel h-${i} w-${i} ${r ? "bg-white" : "bg-black"}`,
																		),
																		a
																	);
																	var r, a;
																}),
																r
															);
															var r;
														}),
													),
													r
												);
												var r;
											},
										),
									),
									s
								);
								var r, s;
							}),
							r
						);
						var r;
					}),
			),
			A
		);
		var A, F, y;
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
			onMount: r,
		} = await import("./web.D_hp9GMo.js").then((e) => e.s);
		return { createEffect: e, createSignal: t, onMount: r };
	}, []);
export { u as default };
