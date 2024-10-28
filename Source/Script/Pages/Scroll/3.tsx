import { createEffect, createSignal, onMount, useRef } from "solid-js";

export default (props) => {
	const [offset, setOffset] = createSignal(0);
	const containerRef = useRef(null);
	const [displayChars, setDisplayChars] = createSignal(10);
	const charWidth = 4;
	const text = () => props.text || "HELLO 123";
	const needsScroll = () => text().length > displayChars();

	onMount(() => {
		const calculateWidth = () => {
			if (containerRef.current) {
				const containerWidth = containerRef.current.offsetWidth;
				const availableChars = Math.floor(containerWidth / 20);
				setDisplayChars(Math.max(1, availableChars));
			}
		};

		calculateWidth();
		window.addEventListener("resize", calculateWidth);
		return () => window.removeEventListener("resize", calculateWidth);
	});

	createEffect(() => {
		if (!needsScroll) return;

		const timer = setInterval(() => {
			setOffset((prev) => (prev + 1) % (text.length * charWidth));
		}, 200);

		return () => clearInterval(timer);
	});

	const renderPixel = (on) => (
		<div class="p-px">
			<div class={on ? "h-2 w-2 bg-yellow-100" : "h-2 w-2 bg-black"} />
		</div>
	);

	const renderChar = (char) => {
		const pattern = Matrix[char.toUpperCase()] || Matrix[" "];
		return (
			<div class="mr-2">
				{pattern.map((row, i) => (
					<div class="flex" key={i}>
						{row.map((pixel, j) => (
							<div key={j}>{renderPixel(pixel)}</div>
						))}
					</div>
				))}
			</div>
		);
	};

	const visibleText = needsScroll
		? (text + "   " + text).slice(
				Math.floor(offset / charWidth),
				Math.floor(offset / charWidth) + displayChars,
			)
		: text.slice(0, displayChars);

	return (
		<div className="w-full rounded-lg bg-black p-4" ref={containerRef}>
			<div className="rounded bg-black p-3">
				<div className="flex flex-wrap justify-center">
					{visibleText.split("").map((char, i) => (
						<div key={i}>{renderChar(char)}</div>
					))}
				</div>
			</div>
		</div>
	);
};

export const { default: Matrix } = await import(
	"@Script/Pages/Scroll/Matrix.js"
);
