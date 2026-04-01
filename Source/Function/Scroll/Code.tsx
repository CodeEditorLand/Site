import type {
	MatrixType,
	Mouse,
	PixelComponent,
} from "@Function/Scroll/Type.js";
import React, { useEffect, useRef, useState } from "react";

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

const ScrollCode: React.FC<ScrollCodeProperty> = ({ Text = "", Font = 1 }) => {
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
	const [Count, SetCount] = useState(Text.length);
	const [CurrentTime, SetCurrentTime] = useState(performance.now());
	const [TextContent] = useState(Text);

	useEffect(() => {
		let Mounted = true;

		const Scroll = (Time: number): void => {
			if (!Mounted) return;
			SetCurrentTime(Time);
			requestAnimationFrame(Scroll);
		};

		const AnimationIdentifier = requestAnimationFrame(Scroll);

		return () => {
			Mounted = false;
			cancelAnimationFrame(AnimationIdentifier);
		};
	}, []);

	useEffect(() => {
		SetCount(TextContent.length);
	}, [TextContent]);

	const Display = (): string => {
		return TextContent.slice(0, Count);
	};

	const [DependencyLoaded, SetDependencyLoaded] = useState(false);

	useEffect(() => {
		LoadDependency().then(() => SetDependencyLoaded(true));
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
				{Display()
					.split("")
					.map((_Visible, Character) => (
						<div key={`char-${Character}`} className="mr-2">
							{(() => {
								const Position = Character % TextContent.length;
								if (!Matrix) return null;
								const MatrixRowArray: number[][] =
									Matrix[Visible.toUpperCase()] ??
									Matrix[" "];
								if (!MatrixRowArray) return null;

								return MatrixRowArray.map(
									(Row, RowIndex): React.ReactNode => (
										<div
											key={`row-${RowIndex}`}
											className="Row flex">
											{Row.map(
												(
													Show: number,
													Index: number,
												): React.ReactNode => {
													const Container =
														ElementReference.current?.getBoundingClientRect();
													if (!Pixel || !Container)
														return null;
													return (
														<Pixel
															Font={Font}
															Character={
																Character
															}
															Index={Index}
															Show={Show}
															Text={
																Display().length
															}
															Mouse={MouseState}
															Container={
																Container
															}
															CurrentTime={
																CurrentTime
															}
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
