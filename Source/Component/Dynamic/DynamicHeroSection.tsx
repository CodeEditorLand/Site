import React, { useEffect, useRef } from "react";

import { DynamicBadge } from "./DynamicBadge";
import { DynamicButton } from "./DynamicButton";
import type Property from "./Interface/Property/Hero.js";

/**
 * Dynamic HeroSection with animated floating cards
 * Mobile: responsive grid layout
 * Desktop: orbital layout with subtle float animation
 */
export function DynamicHeroSection({
	content,
	className,
}: Property) {
	const SceneReference = useRef<HTMLDivElement>(null);
	const {
		title: Title,
		titleHighlight: TitleHighlight,
		subtitle: Subtitle,
		primaryCta: PrimaryCTA,
		secondaryCta: SecondaryCTA,
		FloatingCard: FloatingCard = [],
		...HeroConfiguration
	} = content;

	useEffect(() => {
		const Scene = SceneReference.current;
		if (
			!Scene ||
			(HeroConfiguration.respectReducedMotion &&
				window.matchMedia("(prefers-reduced-motion: reduce)").matches)
		) {
			return;
		}

		const CardElement = Scene.querySelectorAll(".floating-card");
		let FrameIdentifier: number;
		let NoiseFunction: ((X: number, Y: number) => number) | null = null;

		const STEP = 6;

		const Quantize = (Value: number, Step: number): number =>
			Math.floor(Value * Step) / Step;

		const LoadNoise = async () => {
			const { createNoise2D } = await import("simplex-noise");
			NoiseFunction = createNoise2D();
		};

		const AnimateCards = (Time: number) => {
			if (!NoiseFunction) {
				FrameIdentifier = requestAnimationFrame(AnimateCards);
				return;
			}

			CardElement.forEach((Card, Index) => {
				const Element = Card as HTMLElement;
				const Seed = Index * 0.7;
				const TimeFactor = Time * 0.0003;

				const RawX = NoiseFunction!(TimeFactor + Seed, 0);
				const RawY = NoiseFunction!(0, TimeFactor + Seed);

				const X = Quantize(RawX, STEP) * 18;
				const Y = Quantize(RawY, STEP) * 12;

				Element.style.transform = `translate(-50%, -50%) translate3d(${X}px, ${Y}px, 0)`;
			});

			FrameIdentifier = requestAnimationFrame(AnimateCards);
		};

		LoadNoise();
		FrameIdentifier = requestAnimationFrame(AnimateCards);
		return () => cancelAnimationFrame(FrameIdentifier);
	}, [HeroConfiguration.respectReducedMotion]);

	return (
		<section
			id="hero"
			aria-label="Hero"
			className={`relative overflow-hidden py-20 lg:py-32 ${className || ""}`}>
			<div className="container mx-auto px-4 text-center">
				{/* Badge */}
				{content.badge && (
					<DynamicBadge content={content.badge} className="mb-6" />
				)}

				{/* Title */}
				<h1 className="mx-auto mb-6 max-w-4xl text-4xl tracking-tight md:text-6xl lg:text-7xl">
					{Title}{" "}
					{TitleHighlight && (
						<span className="text-primary">{TitleHighlight}</span>
					)}
				</h1>

				{/* Subtitle */}
				<p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
					{Subtitle}
				</p>

				{/* CTAs */}
				<div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<DynamicButton content={PrimaryCTA} />
					{SecondaryCTA && <DynamicButton content={SecondaryCTA} />}
				</div>

				{/* Tech stack visualization */}
				<div className="relative mx-auto max-w-5xl" aria-hidden="true">
					{/* Mobile + Tablet: wrap grid */}
					<div className="flex flex-wrap items-center justify-center gap-3 lg:hidden">
						{FloatingCard.map((Card) => (
							<div
								key={Card.id}
								className="border border-[var(--border)] bg-white p-3"
								style={{ minWidth: "120px" }}>
								<div className="mb-1.5 text-xs font-medium text-foreground">
									{Card.title}
								</div>
								<div className="flex items-center gap-1.5">
									{Card.colors?.map((Color, ColorIndex) => (
										<div
											key={ColorIndex}
											className={`h-3 w-3 ${Color} border border-[var(--border)]`}
										/>
									))}
								</div>
							</div>
						))}
					</div>

					{/* Desktop: orbital layout */}
					<div
						ref={SceneReference}
						className="relative hidden h-[500px] lg:block"
						style={{ perspective: "1000px" }}>
						{/* Central Hub */}
						<div className="absolute left-1/2 top-1/2 z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden border border-[var(--border)] bg-white">
							<img
								src="/Asset/Logo/Glyph/LandDark.svg"
								alt=""
								className="h-20 w-20"
							/>
						</div>

						{/* Floating Cards */}
						{FloatingCard.map((Card, Index) => {
							const Total = FloatingCard.length;
							const Angle =
								(Index / Total) * 2 * Math.PI - Math.PI / 2;
							const RadiusX = 38;
							const RadiusY = 35;
							const CenterX = 50 + Math.cos(Angle) * RadiusX;
							const CenterY = 50 + Math.sin(Angle) * RadiusY;

							return (
								<div
									key={Card.id}
									className="floating-card absolute transform-gpu border border-[var(--border)] bg-white/95 p-3"
									style={{
										top: `${CenterY}%`,
										left: `${CenterX}%`,
										transform: "translate(-50%, -50%)",
										width: "130px",
									}}>
									<div className="mb-1.5 text-xs font-medium text-foreground">
										{Card.title}
									</div>
									<div className="flex items-center gap-1.5">
										{Card.colors?.map(
											(Color, ColorIndex) => (
												<div
													key={ColorIndex}
													className={`h-3 w-3 ${Color} border border-[var(--border)]`}
												/>
											),
										)}
									</div>
								</div>
							);
						})}

						{/* Connecting Lines */}
						{HeroConfiguration.showConnectingLines && (
							<svg
								className="pointer-events-none absolute inset-0 h-full w-full opacity-15"
								aria-hidden="true"
								role="presentation">
								{FloatingCard.map((Card, Index) => {
									const Total = FloatingCard.length;
									const Angle =
										(Index / Total) * 2 * Math.PI -
										Math.PI / 2;
									const RadiusX = 38;
									const RadiusY = 35;
									const CenterX = 50 + Math.cos(Angle) * RadiusX;
									const CenterY = 50 + Math.sin(Angle) * RadiusY;
									return (
										<line
											key={Card.id}
											x1="50%"
											y1="50%"
											x2={`${CenterX}%`}
											y2={`${CenterY}%`}
											stroke="currentColor"
											strokeWidth="1"
											className="animate-pulse"
											style={{
												animationDelay: `${Index * 0.3}s`,
											}}
										/>
									);
								})}
							</svg>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
