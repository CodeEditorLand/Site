import { createEffect, createSignal, onMount } from "solid-js";

export default ({ Text }: { Text: () => string } = { Text: () => "" }) => {
	const [offset, setOffset] = createSignal(0);

	const [ref, setRef] = createSignal<HTMLDivElement | undefined>();

	const [Count, setDisplayChars] = createSignal(10);

	const Width = 4;

	const Padded = () => Text() + "   " + Text() + "   ";

	const Animate = () => Text().length > Count();

	onMount(() => {
		const calculateWidth = () => {
			if (ref()) {
				setDisplayChars(
					Math.max(1, Math.floor((ref()?.offsetWidth ?? 100) / 32)),
				);
			}
		};

		calculateWidth();

		window.addEventListener("resize", calculateWidth);

		return () => window.removeEventListener("resize", calculateWidth);
	});

	createEffect(() => {
		if (!Animate()) return;

		let Animation: number;
		let Index = 0;

		const totalWidth = Padded().length * Width;

		const Roll = (timestamp: number) => {
			if (timestamp - Index > 50) {
				setOffset((prev) => (prev + 1) % totalWidth);
				Index = timestamp;
			}

			Animation = requestAnimationFrame(Roll);
		};

		Animation = requestAnimationFrame(Roll);

		return () => cancelAnimationFrame(Animation);
	});

	const Display = () => {
		if (!Animate()) {
			return Text().slice(0, Count());
		}

		const Start = Math.floor(
			(((offset() / 2) % Padded().length) * Width) / Width,
		);

		return (
			Padded().slice(Start, Start + Count()) +
			Padded().slice(0, Math.max(0, Start + Count() - Padded().length))
		);
	};

	return (
		<div class="w-full overflow-hidden bg-black p-2" ref={setRef}>
			<p class="sr-only">{Text()}</p>

			<div class="flex justify-center" aria-hidden="true">
				{Display()
					.split("")
					.map((Visible, _i) => (
						<div>
							{((Position) => (
								<div class="mr-2">
									{(
										Matrix[Position.toUpperCase()] ||
										Matrix[" "]
									)?.map((Row, _i) => (
										<div class="flex">
											{Row.map((Pixel, _j) => (
												<div>
													{((Show) => (
														<div
															class={`h-2 w-2 ${Show ? "bg-white" : "bg-black"}`}
														/>
													))(Pixel)}
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
