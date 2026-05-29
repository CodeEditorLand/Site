import { useEffect, useRef } from "react";

import { RichText } from "../UI/RichText.js";
import type Property from "./Interface/Property/Testimonial.js";

/**
 * Semantic color map per architecture element ID.
 * Rust backends: ExtensionRust. Effect-TS layer: ExtensionEffectTypeScript.
 * TypeScript workbench: LanguageTypeScript/LanguageJavaScript.
 * Astro UI: ExtensionAstro. WASM sandbox: SpineWASM.
 * gRPC contracts: SpinegRPC. Network: SpineIPC.
 * Toolchain: ToolOxc/ToolEsBuild/ToolBiome. Node runtime: RuntimeNode.
 */
const TestimonialColorMap: Record<string, string> = {
	Mountain: "var(--ExtensionRust)",
	Cocoon: "var(--ExtensionEffectTypeScript)",
	Wind: "var(--LanguageTypeScript)",
	Sky: "var(--ExtensionAstro)",
	Air: "var(--ExtensionTauri)",
	Echo: "var(--SpineTCP)",
	Common: "var(--LanguageRust)",
	Vine: "var(--SpinegRPC)",
	Grove: "var(--SpineWASM)",
	Mist: "var(--SpineIPC)",
	Rest: "var(--ToolOxc)",
	Output: "var(--ToolEsBuild)",
	SideCar: "var(--RuntimeNode)",
	Worker: "var(--LanguageJavaScript)",
	Maintain: "var(--ToolBiome)",
};

// ── Quasi-random row ratios ────────────────────────────────────────────────

/**
 * Halton base-2 low-discrepancy sequence.
 * Deterministic, covers [0,1) evenly, never truly repeats a value.
 * Used instead of simplex noise here because it guarantees all ratio
 * buckets are visited across a small number of rows.
 */
const Halton = (Index: number): number => {
	let F = 1;
	let R = 0;
	let I = Index;
	while (I > 0) {
		F /= 2;
		R += F * (I % 2);
		I = Math.floor(I / 2);
	}
	return R;
};

/**
 * Fixed width ratios expressed as column spans in a 12-column grid.
 * The Halton sequence distributes row indices across all five buckets
 * without any two identical ratios appearing on consecutive rows.
 *
 *  50/50  → [6, 6]
 *  58/42  → [7, 5]   ≈ 3:2
 *  42/58  → [5, 7]   ≈ 2:3
 *  67/33  → [8, 4]   = 2:1
 *  33/67  → [4, 8]   = 1:2
 */
const ROW_RATIOS: readonly [number, number][] = [
	[5, 7], // 42/58 (Halton 0.5  → bucket 2)
	[7, 5], // 58/42 (Halton 0.25 → bucket 1)
	[8, 4], // 67/33 (Halton 0.75 → bucket 3)
	[6, 6], // 50/50 (Halton 0.125→ bucket 0)
	[8, 4], // 67/33 (Halton 0.625→ bucket 3)
	[7, 5], // 58/42 (Halton 0.375→ bucket 1)
	[4, 8], // 33/67 (Halton 0.875→ bucket 4)
	[6, 6], // 50/50 (Halton 0.062→ bucket 0)
] as const;

/**
 * Returns the [left, right] column-span pair for a given row.
 * Indexing pre-computed via Halton to guarantee unique-ratio spread.
 */
const GetRowRatio = (RowIndex: number): [number, number] => {
	const Noise = Halton(RowIndex + 1); // skip 0 → starts at 0.5
	const BucketIndex = Math.min(Math.floor(Noise * 5), 4);
	const BUCKETS: readonly [number, number][] = [
		[6, 6],
		[7, 5],
		[5, 7],
		[8, 4],
		[4, 8],
	];
	return BUCKETS[BucketIndex];
};

// ── Component ──────────────────────────────────────────────────────────────

const DynamicTestimonials = ({ Content, ClassName }: Property) => {
	const { Title, Subtitle, Testimonials, Columns = 3 } = Content;
	const GridReference = useRef<HTMLDivElement>(null);

	const IsMasonry = Columns === "masonry";

	const ColumnClass: Record<number, string> = {
		1: "grid-cols-1 max-w-3xl",
		2: "grid-cols-1 md:grid-cols-2 max-w-5xl",
		3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl",
		4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl",
		5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-7xl",
		6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 max-w-7xl",
	};

	useEffect(() => {
		const Grid = GridReference.current;
		if (!Grid) return;

		const ReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (ReducedMotion) return;

		const ApplyScatter = async () => {
			const AttentionModule =
				await import("../../Function/Noise/Attention.js");
			const Attention = await AttentionModule.default;
			const Cards =
				Grid.querySelectorAll<HTMLElement>(".TestimonialCard");
			Cards.forEach((Card, Index) => {
				Attention.ApplyToElement(Card, Index, 5, 3);
			});

			const StaccatoModule =
				await import("../../Function/Noise/Staccato.js");
			const Engine = await StaccatoModule.default;
			Engine.SeedSelector(".TestimonialCard");
		};

		ApplyScatter();
	}, [Testimonials]);

	const RenderStars = (Rating: number = 0) => {
		if (Rating <= 0) return null;
		return (
			<div role="img" aria-label={`Rating: ${Rating} out of 5 stars`}>
				{Array.from({ length: 5 }).map((_, Index) => (
					<span
						key={Index}
						className="StaccatoStar StarRatingSymbol text-yellow-400"
						aria-hidden="true">
						{Index < Rating ? "★" : "☆"}
					</span>
				))}
			</div>
		);
	};

	if (IsMasonry) {
		return (
			<section
				id="testimonials"
				aria-label="Architecture"
				className={`flex min-h-[100dvh] w-full flex-col justify-center bg-[var(--Mute)] py-24 sm:py-32 ${ClassName || ""}`}>
				<div className="container mx-auto px-4">
					{(Title || Subtitle) && (
						<div className="StaccatoBreath mx-auto mb-24 max-w-2xl text-center">
							{Title && (
								<h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
									{Title}
								</h2>
							)}
							{Subtitle && (
								<div className="mt-3 text-[var(--MuteForeground)]">
									<RichText Text={Subtitle} />
								</div>
							)}
						</div>
					)}

					<div
						ref={GridReference}
						className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
						{Testimonials.map((Testimonial, Index) => {
							const Row = Math.floor(Index / 2);
							const IsLeft = Index % 2 === 0;
							const IsLastOdd =
								Index === Testimonials.length - 1 &&
								Testimonials.length % 2 === 1;

							const [ColA, ColB] = GetRowRatio(Row);
							const ColSpan = IsLastOdd
								? 12
								: IsLeft
									? ColA
									: ColB;

							const AccentColor =
								TestimonialColorMap[Testimonial.Id] ??
								"var(--Primary)";

							return (
								<article
									key={Testimonial.Id}
									className="MasonryCard TestimonialCard StaccatoCard flex flex-col rounded-none bg-white p-6 lg:p-8"
									style={
										{
											borderLeftColor: AccentColor,
											borderLeftWidth: "2px",
											"--masonry-col": ColSpan,
										} as React.CSSProperties
									}>
									<div className="mb-4">
										{RenderStars(Testimonial.Rating)}
									</div>
									<blockquote className="StaccatoBreath mb-6 flex-1">
										<div className="text-base leading-relaxed lg:text-lg">
											{(Testimonial.Rating ?? 0) > 0 && (
												<span
													className="text-muted-foreground/50"
													aria-hidden="true">
													"
												</span>
											)}
											<RichText
												Text={Testimonial.Quote}
											/>
											{(Testimonial.Rating ?? 0) > 0 && (
												<span
													className="text-muted-foreground/50"
													aria-hidden="true">
													"
												</span>
											)}
										</div>
									</blockquote>
									<div>
										<cite className="font-semibold not-italic">
											{Testimonial.Href ? (
												<a
													href={Testimonial.Href}
													target="_blank"
													rel="noopener noreferrer"
													className="hover:underline">
													{Testimonial.Author}
												</a>
											) : (
												Testimonial.Author
											)}
											{Testimonial.Emoji && (
												<span aria-hidden="true">
													{" "}
													{Testimonial.Emoji}
												</span>
											)}
										</cite>
										{(Testimonial.Role ||
											Testimonial.Company) && (
											<p className="StaccatoBreath text-muted-foreground">
												{Testimonial.Role}
												{Testimonial.Role &&
													Testimonial.Company &&
													", "}
												{Testimonial.Company}
											</p>
										)}
									</div>
								</article>
							);
						})}
					</div>
				</div>
			</section>
		);
	}

	return (
		<section
			id="testimonials"
			aria-label="Architecture"
			className={`flex min-h-[100dvh] w-full flex-col justify-center bg-[var(--Mute)] py-24 sm:py-32 ${ClassName || ""}`}>
			<div className="container mx-auto px-4">
				{(Title || Subtitle) && (
					<div className="StaccatoBreath mx-auto mb-24 max-w-2xl text-center">
						{Title && (
							<h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
								{Title}
							</h2>
						)}
						{Subtitle && (
							<div className="mt-3 text-[var(--MuteForeground)]">
								<RichText Text={Subtitle} />
							</div>
						)}
					</div>
				)}

				<div
					ref={GridReference}
					className={`StaccatoMorphGap grid ${ColumnClass[Columns as number] ?? ColumnClass[3]} mx-auto gap-12`}>
					{Testimonials.map((Testimonial) => {
						const AccentColor =
							TestimonialColorMap[Testimonial.Id] ??
							"var(--Primary)";
						return (
							<article
								key={Testimonial.Id}
								className="TestimonialCard StaccatoCard flex flex-col rounded-none bg-white p-8"
								style={{
									borderLeftColor: AccentColor,
									borderLeftWidth: "2px",
								}}>
								<div className="mb-4">
									{RenderStars(Testimonial.Rating)}
								</div>
								<blockquote className="StaccatoBreath mb-6 flex-1">
									<div className="text-lg">
										{(Testimonial.Rating ?? 0) > 0 && (
											<span
												className="text-muted-foreground/50"
												aria-hidden="true">
												"
											</span>
										)}
										<RichText Text={Testimonial.Quote} />
										{(Testimonial.Rating ?? 0) > 0 && (
											<span
												className="text-muted-foreground/50"
												aria-hidden="true">
												"
											</span>
										)}
									</div>
								</blockquote>
								<div>
									<cite className="font-semibold not-italic">
										{Testimonial.Href ? (
											<a
												href={Testimonial.Href}
												target="_blank"
												rel="noopener noreferrer"
												className="hover:underline">
												{Testimonial.Author}
											</a>
										) : (
											Testimonial.Author
										)}
										{Testimonial.Emoji && (
											<span aria-hidden="true">
												{" "}
												{Testimonial.Emoji}
											</span>
										)}
									</cite>
									{(Testimonial.Role ||
										Testimonial.Company) && (
										<p className="StaccatoBreath text-muted-foreground">
											{Testimonial.Role}
											{Testimonial.Role &&
												Testimonial.Company &&
												", "}
											{Testimonial.Company}
										</p>
									)}
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export { DynamicTestimonials };

export default DynamicTestimonials;
