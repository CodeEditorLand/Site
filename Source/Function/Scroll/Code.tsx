export default (
	{ Text }: { Text: string } = {
		Text: "",
	},
) => {
	const [Loaded, _Loaded] = createSignal(true);

	const [Offset, _Offset] = createSignal(0);

	const [Element, _Element] = createSignal<HTMLDivElement | undefined>();

	const [Count, _Count] = createSignal(10);

	const Width = 4;

	const [_Text] = createSignal(Text);

	const Padded = () => _Text() + "   " + _Text() + "   ";

	const Animate = () => _Text().length > Count();

	const [LastTimestamp, _LastTimestamp] = createSignal(0);

	const Time = 50;

	onMount(() => {
		const Factor = () => {
			if (Element()) {
				_Count(
					Math.max(
						1,
						Math.floor((Element()?.offsetWidth ?? 100) / 32),
					),
				);
			}
		};

		Factor();

		window.addEventListener("resize", Factor);

		return () => window.removeEventListener("resize", Factor);
	});

	createEffect(() => {
		if (!Animate()) return;

		_Loaded(false);

		let ID: number;

		const Size = Padded().length * Width;

		const Roll = (Current: number) => {
			const Past = Current - LastTimestamp();

			if (Past >= Time) {
				_Offset((prev) => (prev + 1) % Size);
				_LastTimestamp(Current);
			}

			ID = requestAnimationFrame(Roll);
		};

		ID = requestAnimationFrame(Roll);

		return () => cancelAnimationFrame(ID);
	});

	const Display = () => {
		if (!Animate()) {
			return _Text().slice(0, Count());
		}

		const Start = Math.floor(
			(((Offset() / 2) % Padded().length) * Width) / Width,
		);

		return (
			Padded().slice(Start, Start + Count()) +
			Padded().slice(0, Math.max(0, Start + Count() - Padded().length))
		);
	};

	onMount(() =>
		setTimeout(() => _Loaded(false), Text.length * 30 + 100 + 7 * 5),
	);

	return (
		<div
			class={`w-full overflow-hidden bg-black p-2 ${Loaded() ? "Loaded" : ""}`}
			ref={_Element}>
			<p class="sr-only">{_Text()}</p>

			<div class="flex justify-center" aria-hidden="true">
				{Display()
					.split("")
					.map((Visible, IndexLetter) => (
						<div>
							{((Position) => (
								<div class="mr-2">
									{(
										Matrix[Position.toUpperCase()] ||
										Matrix[" "]
									)?.map((Row, IndexRow) => (
										<div class="flex">
											{Row.map((Pixel, IndexPixel) => (
												<div>
													{((Show) => {
														const [Pixel, _Pixel] =
															createSignal<
																| HTMLDivElement
																| undefined
															>();

														onMount(() => {
															if (Show) {
																setTimeout(
																	() =>
																		Pixel()?.classList.add(
																			"Shown",
																		),
																	IndexLetter *
																		30 +
																		Math.random() *
																			100 +
																		(IndexRow +
																			IndexPixel) *
																			5,
																);
															}
														});

														return (
															<div
																ref={_Pixel}
																class={`Pixel h-2 w-2 ${Show ? "bg-white" : "bg-black"}`}
															/>
														);
													})(Pixel)}
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

export const { default: Matrix } = await import("@Variable/Scroll/Matrix.js");

export const { createEffect, createSignal, onMount } = await import("solid-js");
