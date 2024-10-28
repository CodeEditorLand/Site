import { createEffect, createSignal, onMount } from "solid-js";

export default (props: { text: string }) => {
	const [offset, setOffset] = createSignal(0);

	const [ref, setRef] = createSignal<HTMLDivElement | undefined>();

	const [displayChars, setDisplayChars] = createSignal(10);

	const charWidth = 4;

	const text = () => props.text || "HELLO 123";

	const needsScroll = () => text().length > displayChars();

	onMount(() => {
		const calculateWidth = () => {
			if (ref()) {
				const containerWidth = ref()?.offsetWidth;

				const availableChars = Math.floor((containerWidth ?? 100) / 20);

				setDisplayChars(Math.max(1, availableChars));
			}
		};

		calculateWidth();

		window.addEventListener("resize", calculateWidth);

		return () => window.removeEventListener("resize", calculateWidth);
	});

	createEffect(() => {
		if (!needsScroll()) return;

		const timer = setInterval(() => {
			setOffset((prev) => (prev + 1) % (text.length * charWidth));
		}, 200);

		return () => clearInterval(timer);
	});

	return (
		<div class="w-full bg-black" ref={setRef}>
			<div class="flex flex-wrap justify-center">
				{(() =>
					needsScroll()
						? (text() + "   " + text()).slice(
								Math.floor(offset() / charWidth),
								Math.floor(offset() / charWidth) +
									displayChars(),
							)
						: text().slice(0, displayChars()))()
					.split("")
					.map((Visible, _i) => (
						<div>
							{((char: string) => {
								const pattern =
									Matrix[char.toUpperCase()] || Matrix[" "];

								return (
									<div class="mr-2">
										{pattern?.map((row, i) => (
											<div class="flex">
												{row.map((pixel, j) => (
													<div>
														{((on: number) => (
															<div class="p-px">
																<div
																	class={`"h-2 w-2 ${on ? "bg-white" : "bg-black"}`}
																/>
															</div>
														))(pixel)}
													</div>
												))}
											</div>
										))}
									</div>
								);
							})(Visible)}
						</div>
					))}
			</div>
		</div>
	);
};

export const { default: Matrix } = await import(
	"@Script/Pages/Scroll/Matrix.js"
);
