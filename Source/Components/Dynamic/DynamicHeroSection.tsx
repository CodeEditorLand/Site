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
 * Dynamic HeroSection with 3D animated floating cards
 * Accepts content schema matching plan specification
 * Uses GPU-accelerated animations with requestAnimationFrame
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

		const animateCards = () => {
			cardElements.forEach((card, index) => {
				const element = card as HTMLElement;
				const time = Date.now() * 0.001;
				const offset = index * 0.5;

				const x = Math.sin(time + offset) * 30;
				const y = Math.cos(time + offset * 1.2) * 20;
				const rotateX = Math.sin(time + offset) * 10;
				const rotateY = Math.cos(time + offset * 0.8) * 15;

				element.style.transform = `
          translate3d(${x}px, ${y}px, 0)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
        `;
			});

			requestAnimationFrame(animateCards);
		};

		animateCards();
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

				{/* 3D Scene - decorative */}
				<div
					className="relative mx-auto h-96 max-w-5xl lg:h-[500px]"
					aria-hidden="true">
					<div
						ref={sceneRef}
						className="perspective-1000 relative h-full w-full"
						style={{ perspective: "1000px" }}>
						{/* Central Hub */}
						<div className="absolute left-1/2 top-1/2 z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center overflow-hidden !rounded-none border border-[var(--border)] bg-primary">
							<img
								src="/Asset/Logo/Glyph/Land.svg"
								alt=""
								className="h-20 w-20 brightness-0 invert"
							/>
						</div>

						{/* Floating Cards — orbital layout around center */}
						{floatingCards.map((card, index) => {
							const total = floatingCards.length;
							const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
							const radiusX = 38;
							const radiusY = 35;
							const cx = 50 + Math.cos(angle) * radiusX;
							const cy = 50 + Math.sin(angle) * radiusY;

							return (
								<div
									key={card.id}
									className="floating-card absolute transform-gpu !rounded-none border border-[var(--border)] bg-white/95 p-3"
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
										{card.colors &&
											card.colors.map((color, colorIndex) => (
												<div
													key={colorIndex}
													className={`h-3 w-3 ${color} !rounded-none border border-[var(--border)]`}
												/>
											))}
									</div>
								</div>
							);
						})}

						{/* Connecting Lines — radiate from center to each card */}
						{heroConfig.showConnectingLines && (
							<svg
								className="pointer-events-none absolute inset-0 h-full w-full opacity-15"
								aria-hidden="true"
								role="presentation">
								{floatingCards.map((card, index) => {
									const total = floatingCards.length;
									const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
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
											style={{ animationDelay: `${index * 0.3}s` }}
										/>
									);
								})}
							</svg>
						)}

						{/* Background Particles */}
						{heroConfig.showParticles && (
							<div className="pointer-events-none absolute inset-0 overflow-hidden">
								{Array.from({ length: 20 }).map((_, i) => (
									<div
										key={i}
										className="bg-primary/20 absolute h-1 w-1 animate-pulse !rounded-none border border-[var(--border)]"
										style={{
											left: `${Math.random() * 100}%`,
											top: `${Math.random() * 100}%`,
											animationDelay: `${Math.random() * 3}s`,
											animationDuration: `${2 + Math.random() * 3}s`,
										}}
										aria-hidden="true"
									/>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

export type { HeroContent, FloatingCard };
