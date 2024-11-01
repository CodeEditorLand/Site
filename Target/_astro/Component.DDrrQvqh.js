import { _ as e } from "./preload-helper.D21cck6N.js";
import { g as t, u as r, i as a, c as n, t as i } from "./web.D_hp9GMo.js";
var s = i(
		'<div class="w-full overflow-hidden bg-black p-2"><p class=sr-only></p><div class="flex justify-center"aria-hidden=true>',
	),
	l = i("<div>"),
	o = i("<div class=mr-2>"),
	c = i("<div class=flex>");
const u = ({ Text: e } = { Text: "" }) => {
		const [i, u] = m(0),
			[p, v] = m(),
			[w, g] = m(10),
			[_] = m(e),
			x = () => _() + "   " + _() + "   ",
			E = () => _().length > w(),
			[b, M] = m(0);
		h(() => {
			const e = () => {
				p() &&
					g(Math.max(1, Math.floor((p()?.offsetWidth ?? 100) / 32)));
			};
			return (
				e(),
				window.addEventListener("resize", e),
				() => window.removeEventListener("resize", e)
			);
		}),
			d(() => {
				if (!E()) return;
				let e;
				const t = 4 * x().length,
					r = (a) => {
						a - b() >= 50 && (u((e) => (e + 1) % t), M(a)),
							(e = requestAnimationFrame(r));
					};
				return (
					(e = requestAnimationFrame(r)),
					() => cancelAnimationFrame(e)
				);
			});
		return (
			(j = t(s)),
			(A = j.firstChild),
			(y = A.nextSibling),
			r(v, j),
			a(A, _),
			a(y, () =>
				(() => {
					if (!E()) return _().slice(0, w());
					const e = Math.floor((((i() / 2) % x().length) * 4) / 4);
					return (
						x().slice(e, e + w()) +
						x().slice(0, Math.max(0, e + w() - x().length))
					);
				})()
					.split("")
					.map((e, r) => {
						return (
							(i = t(l)),
							a(i, () => {
								return (
									(r = e),
									(i = t(o)),
									a(i, () =>
										(f[r.toUpperCase()] || f[" "])?.map(
											(e, r) => {
												return (
													(i = t(c)),
													a(i, () =>
														e.map((e, r) => {
															return (
																(i = t(l)),
																a(i, () => {
																	return (
																		(r = e),
																		(a =
																			t(
																				l,
																			)),
																		n(
																			a,
																			"h-2 w-2 " +
																				(r
																					? "bg-white"
																					: "bg-black"),
																		),
																		a
																	);
																	var r, a;
																}),
																i
															);
															var i;
														}),
													),
													i
												);
												var i;
											},
										),
									),
									i
								);
								var r, i;
							}),
							i
						);
						var i;
					}),
			),
			j
		);
		var j, A, y;
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
