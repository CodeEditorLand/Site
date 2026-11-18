import type {
	MatrixType,
	Mouse,
	PixelComponent,
} from "@Function/Scroll/Type.js";

import React, { useEffect, useRef, useState } from "react";

import { SetOnScreen } from "@Function/Scroll/Code/Ticker.js";

let Pixel: PixelComponent | null = null;

let Matrix: MatrixType | null = null;

const LoadDependency = async (): Promise<void> => {
	if (!Pixel) {
		const Module = await import("@Function/Scroll/Code/Pixel.js");

		Pixel = Module.default;
	}

	if (!Matrix) {
		const Module = await import("@Variable/Scroll/Matrix.js");

		Matrix = Module.default;
	}
};

interface ScrollCodeProperty {
	Text?: string;

	Font?: number;
}

/**
 * ScrollCode - the pixel field.
 *
 * The field is a grid of cells (`Matrix.ts` gives every glyph five rows of
 * three) and each cell is a `<Pixel>` that rolls its own element once per
 * frame. That is the treatment, and it is unchanged.
 *
 * What changed is where the frame's work comes from, because the version this
 * replaces paid for the grid twice over:
 *
 * - **The rectangle was measured per cell, per frame.** `getBoundingClientRect`
 *   sat inside the render body, so a twenty-character field forced three
 *   hundred synchronous layouts every frame - to answer a question - "does the
 *   field have a box yet?" - whose answer cannot change between frames. It is
 *   now measured once on mount and once per resize, and the grid reads the
 *   cached rectangle.
 *
 * - **The clock went through React.** `SetCurrentTime` ran every frame, so the
 *   whole field reconciled sixty times a second forever, mounted or not,
 *   visible or not. The clock is `Code/Ticker.ts` now: one loop, no state, no
 *   render, and it stops when the field leaves the viewport or the tab is
 *   hidden.
 *
 * Everything the field paints is still painted: same glyphs, same noise, same
 * dust. The only thing that changed is what it costs to paint them.
 */
const ScrollCode: React.FC<ScrollCodeProperty> = ({ Text = "", Font = 1 }) => {
	/**
	 * The pointer register.
	 *
	 * Declared once and mutated in place: the per-frame pass reads it, so it
	 * must not be a value that changes identity (that would re-render the grid).
	 *
	 * Nothing writes `Active`, `Velocity` or `Last` yet - the field's own
	 * `Influence` is authored at 0 in `Pixel.tsx`, so the branches that read
	 * them resolve to the noise path either way. Recorded rather than wired:
	 * making that system live is a visual decision, not a cost one, and this
	 * card does not change a treatment to make a budget.
	 */
	const [MouseState] = useState<Mouse>({
		X: 0,

		Y: 0,

		XPrevious: 0,

		YPrevious: 0,

		Velocity: 0,

		Last: 0,

		Active: false,
	});

	const ElementReference = useRef<HTMLDivElement>(null);

	const [TextContent] = useState(Text);

	/** The field's box, measured on mount and on resize - never per frame. */
	const [Box, SetBox] = useState<DOMRect | null>(null);

	const [DependencyLoaded, SetDependencyLoaded] = useState(false);

	useEffect(() => {
		LoadDependency().then(() => SetDependencyLoaded(true));
	}, []);

	/**
	 * Measure, coalesced.
	 *
	 * One read for the whole grid, taken outside any frame callback, and only
	 * when the element actually changed size. The grid renders from `Box`, so
	 * the first measure is also what fills it.
	 */
	useEffect(() => {
		const Element = ElementReference.current;

		if (!Element) return;

		let Pending: number | null = null;

		const Measure = (): void => {
			Pending = null;

			const Rectangle = Element.getBoundingClientRect();

			SetBox(
				new DOMRect(
					Rectangle.x,

					Rectangle.y,

					Rectangle.width,

					Rectangle.height,
				),
			);
		};

		const Schedule = (): void => {
			if (Pending !== null) return;

			Pending = requestAnimationFrame(Measure);
		};

		Measure();

		if (typeof ResizeObserver === "undefined") {
			window.addEventListener("resize", Schedule, { passive: true });

			return () => {
				window.removeEventListener("resize", Schedule);

				if (Pending !== null) cancelAnimationFrame(Pending);
			};
		}

		const Observer = new ResizeObserver(Schedule);

		Observer.observe(Element);

		return () => {
			Observer.disconnect();

			if (Pending !== null) cancelAnimationFrame(Pending);
		};
	}, []);

	/**
	 * Park the clock while nobody can see the field. An `IntersectionObserver`
	 * reports the crossing; the ticker cancels its pending frame on the way out
	 * and starts a fresh one on the way back in.
	 */
	useEffect(() => {
		const Element = ElementReference.current;

		if (!Element || typeof IntersectionObserver === "undefined") return;

		const Observer = new IntersectionObserver((Entries) => {
			for (const Entry of Entries) SetOnScreen(Entry.isIntersecting);
		});

		Observer.observe(Element);

		return () => {
			Observer.disconnect();

			SetOnScreen(false);
		};
	}, []);

	if (!DependencyLoaded) {
		return (
			<div className="Scroll w-full p-2" ref={ElementReference}>
				<p className="sr-only">{TextContent}</p>
				<div>Loading...</div>
			</div>
		);
	}

	return (
		<div className="Scroll w-full p-2" ref={ElementReference}>
			<p className="sr-only">{TextContent}</p>
			<div className="flex justify-center" aria-hidden="true">
				{TextContent.split("").map((Visible, Character) => (
					<div key={`char-${Character}`} className="mr-2">
						{(() => {
							if (!Matrix) return null;

							const MatrixRowArray =
								Matrix[Visible.toUpperCase()] ?? Matrix[" "];

							if (!MatrixRowArray) return null;

							return MatrixRowArray.map(
								(Row, RowIndex): React.ReactNode => (
									<div
										key={`row-${RowIndex}`}
										className="Row flex"
									>
										{Row.map(
											(
												Show: number,

												Index: number,
											): React.ReactNode => {
												if (!Pixel || !Box) return null;

												return (
													<Pixel
														Font={Font}
														Character={Character}
														Index={Index}
														Show={Show}
														Text={
															TextContent.length
														}
														Mouse={MouseState}
														Container={Box}
														Row={RowIndex}
														Column={Index % 3}
													/>
												);
											},
										)}
									</div>
								),
							);
						})()}
					</div>
				))}
			</div>
		</div>
	);
};

export default ScrollCode;
