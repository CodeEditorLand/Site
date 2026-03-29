import React, { useEffect, useRef } from "react";

import { DynamicBadge } from "./DynamicBadge";
import { DynamicButton } from "./DynamicButton";
import type { BadgeContent, ButtonContent } from "./types";

interface FloatingCard {
	id: string;
	title: string;
	icon?: string;
	colors?: string[];
}

interface HeroContent {
	badge?: BadgeContent;
	title: string;
	titleHighlight?: string;
	subtitle: string;
	primaryCta: ButtonContent;
	secondaryCta?: ButtonContent;
	floatingCards?: FloatingCard[];
	showConnectingLines?: boolean;
	showParticles?: boolean;
	respectReducedMotion?: boolean;
}

interface DynamicHeroSectionProps {
	content: HeroContent;
	className?: string;
}

/**
 * Dynamic HeroSection with animated floating cards
 * Mobile: responsive grid layout
 * Desktop: orbital layout with subtle float animation
 */
export function DynamicHeroSection({
	content,
	className,
}: DynamicHeroSectionProps) {
	const sceneRef = useRef<HTMLDivElement>(null);
	const {
		title,
		titleHighlight,
		subtitle,
		primaryCta,
		secondaryCta,
		floatingCards = [],
		...heroConfig
	} = content;

	useEffect(() => {
		const scene = sceneRef.current;
		if (
			!scene ||
			(heroConfig.respectReducedMotion &&
				window.matchMedia("(prefers-reduced-motion: reduce)").matches)
		) {
			return;
		}

		const cardElements = scene.querySelectorAll(".floating-card");
		let frameId: number;

		const animateCards = () => {
			cardElements.forEach((card, index) => {
				const element = card as HTMLElement;
				const time = Date.now() * 0.001;
				const offset = index * 0.5;

				const x = Math.sin(time + offset) * 12;
				const y = Math.cos(time + offset * 1.2) * 8;

				element.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0)`;
			});

			frameId = requestAnimationFrame(animateCards);
		};

		animateCards();
		return () => cancelAnimationFrame(frameId);
	}, [heroConfig.respectReducedMotion]);

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
					{title}{" "}
					{titleHighlight && (
						<span className="text-primary">{titleHighlight}</span>
					)}
				</h1>

				{/* Subtitle */}
				<p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
					{subtitle}
				</p>

				{/* CTAs */}
				<div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<DynamicButton content={primaryCta} />
					{secondaryCta && <DynamicButton content={secondaryCta} />}
				</div>

				{/* Tech stack visualization */}
				<div className="relative mx-auto max-w-5xl" aria-hidden="true">
					{/* Mobile + Tablet: wrap grid */}
					<div className="flex flex-wrap items-center justify-center gap-3 lg:hidden">
						{floatingCards.map((card) => (
							<div
								key={card.id}
								className="border border-[var(--border)] bg-white p-3"
								style={{ minWidth: "120px" }}>
								<div className="mb-1.5 text-xs font-medium text-foreground">
									{card.title}
								</div>
								<div className="flex items-center gap-1.5">
									{card.colors?.map((color, colorIndex) => (
										<div
											key={colorIndex}
											className={`h-3 w-3 ${color} border border-[var(--border)]`}
										/>
									))}
								</div>
							</div>
						))}
					</div>

					{/* Desktop: orbital layout */}
					<div
						ref={sceneRef}
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
						{floatingCards.map((card, index) => {
							const total = floatingCards.length;
							const angle =
								(index / total) * 2 * Math.PI - Math.PI / 2;
							const radiusX = 38;
							const radiusY = 35;
							const cx = 50 + Math.cos(angle) * radiusX;
							const cy = 50 + Math.sin(angle) * radiusY;

							return (
								<div
									key={card.id}
									className="floating-card absolute transform-gpu border border-[var(--border)] bg-white/95 p-3"
									style={{
										top: `${cy}%`,
										left: `${cx}%`,
										transform: "translate(-50%, -50%)",
										width: "130px",
									}}>
									<div className="mb-1.5 text-xs font-medium text-foreground">
										{card.title}
									</div>
									<div className="flex items-center gap-1.5">
										{card.colors?.map(
											(color, colorIndex) => (
												<div
													key={colorIndex}
													className={`h-3 w-3 ${color} border border-[var(--border)]`}
												/>
											),
										)}
									</div>
								</div>
							);
						})}

						{/* Connecting Lines */}
						{heroConfig.showConnectingLines && (
							<svg
								className="pointer-events-none absolute inset-0 h-full w-full opacity-15"
								aria-hidden="true"
								role="presentation">
								{floatingCards.map((card, index) => {
									const total = floatingCards.length;
									const angle =
										(index / total) * 2 * Math.PI -
										Math.PI / 2;
									const radiusX = 38;
									const radiusY = 35;
									const cx = 50 + Math.cos(angle) * radiusX;
									const cy = 50 + Math.sin(angle) * radiusY;
									return (
										<line
											key={card.id}
											x1="50%"
											y1="50%"
											x2={`${cx}%`}
											y2={`${cy}%`}
											stroke="currentColor"
											strokeWidth="1"
											className="animate-pulse"
											style={{
												animationDelay: `${index * 0.3}s`,
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

export type { HeroContent, FloatingCard };
