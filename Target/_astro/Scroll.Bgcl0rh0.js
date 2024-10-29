import { _ as e } from "./preload-helper.D21cck6N.js";
import {
	c as r,
	o as t,
	a,
	g as s,
	u as n,
	i,
	b as l,
	t as o,
} from "./web.CGGjRl-f.js";
var c = o(
		'<div class="w-full overflow-hidden bg-black p-2"><p class=sr-only></p><div class="flex justify-center"aria-hidden=true>',
	),
	u = o("<div>"),
	d = o('<div class="mr-2 flex-shrink-0">'),
	f = o("<div class=flex>");
const m = (e) => {
		const [o, m] = r(0),
			[v, p] = r(),
			[w, g] = r(10),
			x = () => e.text || "",
			b = () => x() + "   " + x() + "   ",
			_ = () => x().length > w();
		t(() => {
			const e = () => {
				if (v()) {
					const e = v()?.offsetWidth,
						r = Math.floor((e ?? 100) / 32);
					g(Math.max(1, r));
				}
			};
			return (
				e(),
				window.addEventListener("resize", e),
				() => window.removeEventListener("resize", e)
			);
		}),
			a(() => {
				if (!_()) return;
				let e,
					r = 0;
				const t = 4 * b().length,
					a = (s) => {
						s - r > 50 && (m((e) => (e + 1) % t), (r = s)),
							(e = requestAnimationFrame(a));
					};
				return (
					(e = requestAnimationFrame(a)),
					() => cancelAnimationFrame(e)
				);
			});
		return (
			(M = s(c)),
			(j = M.firstChild),
			(A = j.nextSibling),
			n(p, M),
			i(j, x),
			i(A, () =>
				(() => {
					if (!_()) return x().slice(0, w());
					const e = 4 * b().length,
						r = (o() / 2) % e,
						t = Math.floor(r / 4);
					return (
						b().slice(t, t + w()) +
						b().slice(0, Math.max(0, t + w() - b().length))
					);
				})()
					.split("")
					.map((e, r) => {
						return (
							(t = s(u)),
							i(t, () => {
								return (
									(r = e),
									(t = s(d)),
									i(t, () =>
										(h[r.toUpperCase()] || h[" "])?.map(
											(e, r) => {
												return (
													(t = s(f)),
													i(t, () =>
														e.map((e, r) => {
															return (
																(t = s(u)),
																i(t, () => {
																	return (
																		(r = e),
																		(t =
																			s(
																				u,
																			)),
																		l(
																			t,
																			"h-2 w-2 " +
																				(r
																					? "bg-white"
																					: "bg-black"),
																		),
																		t
																	);
																	var r, t;
																}),
																t
															);
															var t;
														}),
													),
													t
												);
												var t;
											},
										),
									),
									t
								);
								var r, t;
							}),
							t
						);
						var t;
					}),
			),
			M
		);
		var M, j, A;
	},
	{ default: h } = await e(async () => {
		const { default: e } = await import("./Matrix.BYOAHmu9.js");
		return { default: e };
	}, []);
export { m as default };
