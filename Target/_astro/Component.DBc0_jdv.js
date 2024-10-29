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
var u = o(
		'<div class="w-full overflow-hidden bg-black p-2"><p class=sr-only></p><div class="flex justify-center"aria-hidden=true>',
	),
	c = o("<div>"),
	d = o("<div class=mr-2>"),
	f = o("<div class=flex>");
const m = ({ Text: e } = { Text: "" }) => {
		const [o, m] = r(0),
			[h, p] = r(),
			[w, g] = r(10),
			[x] = r(e),
			b = () => x() + "   " + x() + "   ",
			_ = () => x().length > w(),
			[M, j] = r(0);
		t(() => {
			const e = () => {
				h() &&
					g(Math.max(1, Math.floor((h()?.offsetWidth ?? 100) / 32)));
			};
			return (
				e(),
				window.addEventListener("resize", e),
				() => window.removeEventListener("resize", e)
			);
		}),
			a(() => {
				if (!_()) return;
				let e;
				const r = 4 * b().length,
					t = (a) => {
						a - M() >= 50 && (m((e) => (e + 1) % r), j(a)),
							(e = requestAnimationFrame(t));
					};
				return (
					(e = requestAnimationFrame(t)),
					() => cancelAnimationFrame(e)
				);
			});
		return (
			(A = s(u)),
			(E = A.firstChild),
			(y = E.nextSibling),
			n(p, A),
			i(E, x),
			i(y, () =>
				(() => {
					if (!_()) return x().slice(0, w());
					const e = Math.floor((((o() / 2) % b().length) * 4) / 4);
					return (
						b().slice(e, e + w()) +
						b().slice(0, Math.max(0, e + w() - b().length))
					);
				})()
					.split("")
					.map((e, r) => {
						return (
							(t = s(c)),
							i(t, () => {
								return (
									(r = e),
									(t = s(d)),
									i(t, () =>
										(v[r.toUpperCase()] || v[" "])?.map(
											(e, r) => {
												return (
													(t = s(f)),
													i(t, () =>
														e.map((e, r) => {
															return (
																(t = s(c)),
																i(t, () => {
																	return (
																		(r = e),
																		(t =
																			s(
																				c,
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
			A
		);
		var A, E, y;
	},
	{ default: v } = await e(async () => {
		const { default: e } = await import("./Matrix.BYOAHmu9.js");
		return { default: e };
	}, []);
export { m as default };
