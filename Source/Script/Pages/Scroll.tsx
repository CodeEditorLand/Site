import { createEffect, createSignal, onMount } from "solid-js";

export default (props: { text: string }) => {
	const [offset, setOffset] = createSignal(0);

	const [ref, setRef] = createSignal<HTMLDivElement | undefined>();

	const [displayChars, setDisplayChars] = createSignal(10);

	const Width = 4;

	const text = () => props.text || "";

	const paddedText = () => text() + "   " + text() + "   ";

	const needsScroll = () => text().length > displayChars();

	onMount(() => {
		const calculateWidth = () => {
			if (ref()) {
				const containerWidth = ref()?.offsetWidth;

				const availableChars = Math.floor((containerWidth ?? 100) / 32);

				setDisplayChars(Math.max(1, availableChars));
			}
		};

		calculateWidth();

		window.addEventListener("resize", calculateWidth);

		return () => window.removeEventListener("resize", calculateWidth);
	});

	createEffect(() => {
		if (!needsScroll()) return;

		let animationId: number;
		let lastTimestamp = 0;

		const totalWidth = paddedText().length * Width;

		const animate = (timestamp: number) => {
			if (timestamp - lastTimestamp > 50) {
				setOffset((prev) => (prev + 1) % totalWidth);
				lastTimestamp = timestamp;
			}

			animationId = requestAnimationFrame(animate);
		};

		animationId = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(animationId);
	});

	const visibleText = () => {
		if (!needsScroll()) {
			return text().slice(0, displayChars());
		}

		const totalWidth = paddedText().length * Width;
		const currentOffset = (offset() / 2) % totalWidth; // Move by half a pixel each frame
		const startIndex = Math.floor(currentOffset / Width);

		return (
			paddedText().slice(startIndex, startIndex + displayChars()) +
			paddedText().slice(
				0,
				Math.max(0, startIndex + displayChars() - paddedText().length),
			)
		);
	};

	return (
		<div class="w-full overflow-hidden bg-black p-2" ref={setRef}>
			<p class="sr-only">{text()}</p>

			<div class="flex justify-center" aria-hidden="true">
				{visibleText()
					.split("")
					.map((Visible, _i) => (
						<div>
							{((char: string) => (
								<div class="mr-2 flex-shrink-0">
									{(
										Matrix[char.toUpperCase()] ||
										Matrix[" "]
									)?.map((row, _i) => (
										<div class="flex">
											{row.map((pixel, _j) => (
												<div>
													{((on: number) => (
														<div
															class={`h-2 w-2 ${on ? "bg-white" : "bg-black"}`}
														/>
													))(pixel)}
												</div>
											))}
										</div>
									))}
								</div>
							))(Visible)}
						</div>
					))}
			</div>
		</div>
	);
};

export const { default: Matrix } = await import(
	"@Script/Pages/Scroll/Matrix.js"
);
