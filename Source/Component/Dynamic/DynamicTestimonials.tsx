import React, { useEffect, useRef } from "react";
import type Property from "./Interface/Property/Testimonial.js";

/**
 * Dynamic Testimonials with simplex noise integration.
 * Cards get StaccatoCard + Attention scatter for organic stagger.
 * Stars shimmer with StaccatoStar. Avatars bounce with StaccatoAvatar.
 * Quotes breathe with StaccatoBreath.
 */
export function DynamicTestimonials({
	content,
	className,
}: Property) {
	const { title, subtitle, testimonials, columns = 3 } = content;
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
			const AttentionModule = await import(
				"../../Function/Noise/Attention.js"
			);
			const Attention = await AttentionModule.default;
			const Cards =
				Grid.querySelectorAll<HTMLElement>(".testimonial-card");
			Cards.forEach((Card, Index) => {
				Attention.ApplyToElement(Card, Index, 5, 3);
			});

			const StaccatoModule = await import(
				"../../Function/Noise/Staccato.js"
			);
			const Engine = await StaccatoModule.default;
			Engine.SeedSelector(".testimonial-card");
		};

		ApplyScatter();
	}, [testimonials]);

	const RenderStars = (Rating: number = 5) => {
		return (
			<div role="img" aria-label={`Rating: ${Rating} out of 5 stars`}>
				{Array.from({ length: 5 }).map((_, Index) => (
					<span
						key={Index}
						className="StaccatoStar star-rating__symbol text-yellow-400"
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
			aria-label="Testimonials"
			className={`py-20 ${className || ""}`}>
			<div className="container mx-auto px-4">
				{(title || subtitle) && (
					<div className="StaccatoBreath mb-16 text-center">
						{title && (
							<h2 className="mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl">
								{title}
							</h2>
						)}
						{subtitle && (
							<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
								{subtitle}
							</p>
						)}
					</div>
				)}

				<div
					ref={GridReference}
					className={`StaccatoMorphGap grid ${ColumnClass[columns]} mx-auto gap-8`}>
					{testimonials.map((Testimonial) => (
						<article
							key={Testimonial.id}
							className="testimonial-card StaccatoCard StaccatoBorderShimmer bg-white/92 flex flex-col rounded-none border border-[var(--border)] p-6">
							<div className="mb-4">
								{RenderStars(Testimonial.rating)}
							</div>
							<blockquote className="StaccatoBreath mb-6 flex-1">
								<p className="text-lg">"{Testimonial.quote}"</p>
							</blockquote>
							<div className="flex items-center gap-4">
								{Testimonial.avatar ? (
									<img
										src={Testimonial.avatar}
										alt={`Photo of ${Testimonial.author}`}
										className="StaccatoAvatar size-12 rounded-none border border-[var(--border)] object-cover"
										loading="lazy"
									/>
								) : (
									<div
										className="StaccatoAvatar flex size-12 items-center justify-center rounded-none border border-[var(--border)] bg-secondary"
										aria-hidden="true">
										<span className="text-lg font-semibold">
											{(Testimonial.author || "?").charAt(
												0,
											)}
										</span>
									</div>
								)}
								<div>
									<cite className="font-semibold not-italic">
										{Testimonial.author}
									</cite>
									{(Testimonial.role ||
										Testimonial.company) && (
										<p className="StaccatoBreath text-sm text-muted-foreground">
											{Testimonial.role}
											{Testimonial.role &&
												Testimonial.company &&
												", "}
											{Testimonial.company}
										</p>
									)}
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
