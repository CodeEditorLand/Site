import { _ as r } from "./preload-helper.D21cck6N.js";
import {
	c as t,
	o as a,
	a as e,
	g as s,
	u as i,
	i as l,
	b as n,
	t as o,
} from "./web.CGGjRl-f.js";
var f = o(
		'<div class="w-full bg-black"><div class="flex flex-wrap justify-center">',
	),
	c = o("<div>"),
	d = o("<div class=mr-2>"),
	v = o("<div class=flex>"),
	u = o("<div class=p-px><div>");
const p = (r) => {
		const [o, p] = t(0),
			[m, w] = t(),
			[b, x] = t(10),
			g = () => r.text || "HELLO 123",
			_ = () => g().length > b();
		return (
			a(() => {
				const r = () => {
					if (m()) {
						const r = m()?.offsetWidth,
							t = Math.floor((r ?? 100) / 20);
						x(Math.max(1, t));
					}
				};
				return (
					r(),
					window.addEventListener("resize", r),
					() => window.removeEventListener("resize", r)
				);
			}),
			e(() => {
				if (!_()) return;
				const r = setInterval(() => {
					p((r) => (r + 1) % (4 * g.length));
				}, 200);
				return () => clearInterval(r);
			}),
			(E = s(f)),
			(L = E.firstChild),
			i(w, E),
			l(L, () =>
				(_()
					? (g() + "   " + g()).slice(
							Math.floor(o() / 4),
							Math.floor(o() / 4) + b(),
						)
					: g().slice(0, b())
				)
					.split("")
					.map((r, t) => {
						return (
							(a = s(c)),
							l(a, () => {
								return (
									(t = r),
									(a = s(d)),
									l(a, () =>
										(h[t.toUpperCase()] || h[" "])?.map(
											(r, t) => {
												return (
													(a = s(v)),
													l(a, () =>
														r.map((r, t) => {
															return (
																(a = s(c)),
																l(a, () => {
																	return (
																		(t = r),
																		(a =
																			s(
																				u,
																			)),
																		(e =
																			a.firstChild),
																		n(
																			e,
																			'"h-2 w-2 ' +
																				(t
																					? "bg-white"
																					: "bg-black"),
																		),
																		a
																	);
																	var t, a, e;
																}),
																a
															);
															var a;
														}),
													),
													a
												);
												var a;
											},
										),
									),
									a
								);
								var t, a;
							}),
							a
						);
						var a;
					}),
			),
			E
		);
		var E, L;
	},
	{ default: h } = await r(async () => {
		const { default: r } = await import("./Matrix.BYOAHmu9.js");
		return { default: r };
	}, []);
export { p as default };
