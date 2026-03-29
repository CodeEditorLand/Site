import type {
	MatrixType,
	Mouse,
	PixelComponent,
} from "@Function/Scroll/Type.js";
import React, { useEffect, useRef, useState } from "react";

// Typed dynamic imports for dependencies
let Pixel: PixelComponent | null = null;
let Matrix: MatrixType | null = null;

const loadDependencies = async (): Promise<void> => {
	if (!Pixel) {
		const module = await import("@Function/Scroll/Code/Pixel.js");
		Pixel = module.default;
	}
	if (!Matrix) {
		const module = await import("@Variable/Scroll/Matrix.js");
		Matrix = module.default;
	}
};

interface ScrollCodeProps {
	Text?: string;
	Font?: number;
}

const ScrollCode: React.FC<ScrollCodeProps> = ({ Text = "", Font = 1 }) => {
	const [mouse, setMouse] = useState<Mouse>({
		X: 0,
		Y: 0,
		XPrevious: 0,
		YPrevious: 0,
		Velocity: 0,
		Last: 0,
		Active: false,
	});

	const elementRef = useRef<HTMLDivElement>(null);
	const [count, setCount] = useState(Text.length);
	const [currentTime, setCurrentTime] = useState(performance.now());
	const [text] = useState(Text);

	// Scroll animation loop
	useEffect(() => {
		let mounted = true;

		const scroll = (time: number): void => {
			if (!mounted) return;
			setCurrentTime(time);
			requestAnimationFrame(scroll);
		};

		const animationId = requestAnimationFrame(scroll);

		return () => {
			mounted = false;
			cancelAnimationFrame(animationId);
		};
	}, []);

	// Update text when prop changes
	useEffect(() => {
		setCount(text.length);
	}, [text]);

	const display = (): string => {
		return text.slice(0, count);
	};

	// Load dependencies and render
	const [dependenciesLoaded, setDependenciesLoaded] = useState(false);

	useEffect(() => {
		loadDependencies().then(() => setDependenciesLoaded(true));
	}, []);

	if (!dependenciesLoaded) {
		return (
			<div className="Scroll w-full p-2" ref={elementRef}>
				<p className="sr-only">{text}</p>
				<div>Loading...</div>
			</div>
		);
	}

	return (
		<div className="Scroll w-full p-2" ref={elementRef}>
			<p className="sr-only">{text}</p>
			<div className="flex justify-center" aria-hidden="true">
				{display()
					.split("")
					.map((Visible, Character) => (
						<div key={`char-${Character}`} className="mr-2">
							{(() => {
								const Position = Character % text.length;
								if (!Matrix) return null;
								const matrixRowArray: number[][] =
									Matrix[Position.toUpperCase()] ??
									Matrix[" "];
								if (!matrixRowArray) return null;

								return matrixRowArray.map(
									(Row, RowIndex): React.ReactNode => (
										<div
											key={`row-${RowIndex}`}
											className="Row flex">
											{Row.map(
												(
													Show: number,
													Index: number,
												): React.ReactNode => {
													const container =
														elementRef.current?.getBoundingClientRect();
													if (!Pixel || !container)
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
																display().length
															}
															Mouse={mouse}
															Container={
																container
															}
															CurrentTime={
																currentTime
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
