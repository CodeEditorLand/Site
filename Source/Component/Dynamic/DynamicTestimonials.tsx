import { useEffect, useRef } from "react";

import type Property from "./Interface/Property/Testimonial.js";

/**
 * Semantic color map per architecture element ID — maps each element to its design token.
 * Mountain/Air/Echo: ExtensionRust (Rust backend), Cocoon: ExtensionEffectTypeScript,
 * Wind: LanguageTypeScript (TS workbench), Sky: ExtensionTauri (UI rendering).
 */
const TestimonialColorMap: Record<string, string> = {
	mountain: "var(--ExtensionRust)",
	cocoon: "var(--ExtensionEffectTypeScript)",
	wind: "var(--LanguageTypeScript)",
	sky: "var(--ExtensionTauri)",
	air: "var(--ExtensionRust)",
	echo: "var(--ExtensionRust)",
};

/**
 * Dynamic Testimonials with simplex noise integration.
 * Cards get StaccatoCard + Attention scatter for organic stagger.
 * Stars shimmer with StaccatoStar. Avatars bounce with StaccatoAvatar.
 * Quotes breathe with StaccatoBreath.
 */
const DynamicTestimonials = ({ Content, ClassName }: Property) => {
	const { Title, Subtitle, Testimonials, Columns = 3 } = Content;
	const GridReference = useRef<HTMLDivElement>(null);

	const ColumnClass: Record<number, string> = {
		1: "grid-cols-1 max-w-3xl",
		2: "grid-cols-1 md:grid-cols-2 max-w-5xl",
		3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl",
		4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl",
		5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-7xl",
		6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 max-w-7xl",
	};

	// Apply attention scatter to testimonial cards
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
						{Index < Rating ? "\u2605" : "\u2606"}
					</span>
				))}
			</div>
		);
	};

	return (
		<section
			id="testimonials"
			aria-label="Architecture"
			className={`flex min-h-[100dvh] w-full flex-col justify-center py-16 ${ClassName || ""}`}>
			<div className="container mx-auto px-4">
				{(Title || Subtitle) && (
					<div className="StaccatoBreath mb-16 text-center">
						{Title && (
							<h2 className="mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl">
								{Title}
							</h2>
						)}
						{Subtitle && (
							<p className="mx-auto max-w-2xl whitespace-pre-line text-lg text-muted-foreground">
								{Subtitle}
							</p>
						)}
					</div>
				)}

				<div
					ref={GridReference}
					className={`StaccatoMorphGap grid ${ColumnClass[Columns]} mx-auto gap-8`}>
					{Testimonials.map((Testimonial) => {
						const AccentColor =
							TestimonialColorMap[Testimonial.Id] ??
							"var(--Primary)";
						return (
							<article
								key={Testimonial.Id}
								className="TestimonialCard StaccatoCard StaccatoBorderShimmer flex flex-col rounded-none border border-[var(--Border)] bg-white p-6"
								style={{
									borderLeftColor: AccentColor,
									borderLeftWidth: "2px",
								}}>
								<div className="mb-4">
									{RenderStars(Testimonial.Rating)}
								</div>
								<blockquote className="StaccatoBreath mb-6 flex-1">
									<p className="text-lg">
										{(Testimonial.Rating ?? 0) > 0
											? `\u201C${Testimonial.Quote}\u201D`
											: Testimonial.Quote}
									</p>
								</blockquote>
								<div className="flex items-center gap-4">
									{Testimonial.Avatar ? (
										<img
											src={Testimonial.Avatar}
											alt={`Photo of ${Testimonial.Author}`}
											width="48"
											height="48"
											className="StaccatoAvatar size-12 rounded-none border border-[var(--Border)] object-cover"
											loading="lazy"
										/>
									) : (
										<div
											className="StaccatoAvatar flex size-12 items-center justify-center rounded-none border border-[var(--Border)] bg-secondary"
											aria-hidden="true">
											<span className="text-lg font-semibold">
												{(
													Testimonial.Author || "?"
												).charAt(0)}
											</span>
										</div>
									)}
									<div>
										<cite className="font-semibold not-italic">
											{Testimonial.Author}
										</cite>
										{(Testimonial.Role ||
											Testimonial.Company) && (
											<p className="StaccatoBreath whitespace-pre-line text-sm text-muted-foreground">
												{Testimonial.Role}
												{Testimonial.Role &&
													Testimonial.Company &&
													", "}
												{Testimonial.Company}
											</p>
										)}
									</div>
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
