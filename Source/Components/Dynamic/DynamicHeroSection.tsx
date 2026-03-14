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
						<span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
							{titleHighlight}
						</span>
					)}
				</h1>

				{/* Subtitle */}
				<p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
					{subtitle}
				</p>

				{/* CTAs */}
				<div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<DynamicButton content={primaryCta} />
					{secondaryCta && <DynamicButton content={secondaryCta} />}
				</div>

				{/* 3D Scene */}
				<div className="relative mx-auto h-96 max-w-5xl lg:h-[500px]">
					<div
						ref={sceneRef}
						className="perspective-1000 relative h-full w-full"
						style={{ perspective: "1000px" }}>
						{/* Central Hub */}
						<div className="from-primary to-primary/70 border-border absolute left-1/2 top-1/2 z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center !rounded-none border-[3px] bg-gradient-to-br shadow-2xl">
							<div className="border-border flex h-16 w-16 items-center justify-center !rounded-none border-[3px] bg-white">
								<div className="bg-primary border-border h-8 w-8 !rounded-none border"></div>
							</div>
						</div>

						{/* Floating Cards */}
						{floatingCards.map((card, index) => (
							<div
								key={card.id}
								className="floating-card bg-card absolute transform-gpu !rounded-none border-[3px] p-4 shadow-lg"
								style={{
									top: `${20 + index * 10}%`,
									left: `${15 + index * 15}%`,
									width: "140px",
									height: "100px",
								}}>
								<div className="text-muted-foreground mb-2 text-xs">
									{card.title}
								</div>
								<div className="flex items-center space-x-2">
									{card.colors &&
										card.colors.map((color, colorIndex) => (
											<div
												key={colorIndex}
												className={`h-4 w-4 ${color} border-border !rounded-none border`}
											/>
										))}
								</div>
							</div>
						))}

						{/* Connecting Lines */}
						{heroConfig.showConnectingLines && (
							<svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20">
								<defs>
									<linearGradient
										id="lineGradient"
										x1="0%"
										y1="0%"
										x2="100%"
										y2="100%">
										<stop
											offset="0%"
											stopColor="currentColor"
											stopOpacity="0.1"
										/>
										<stop
											offset="50%"
											stopColor="currentColor"
											stopOpacity="0.3"
										/>
										<stop
											offset="100%"
											stopColor="currentColor"
											stopOpacity="0.1"
										/>
									</linearGradient>
								</defs>
								<line
									x1="50%"
									y1="50%"
									x2="20%"
									y2="20%"
									stroke="url(#lineGradient)"
									strokeWidth="2"
									className="animate-pulse"
								/>
								<line
									x1="50%"
									y1="50%"
									x2="80%"
									y2="30%"
									stroke="url(#lineGradient)"
									strokeWidth="2"
									className="animate-pulse"
									style={{ animationDelay: "0.5s" }}
								/>
								<line
									x1="50%"
									y1="50%"
									x2="25%"
									y2="75%"
									stroke="url(#lineGradient)"
									strokeWidth="2"
									className="animate-pulse"
									style={{ animationDelay: "1s" }}
								/>
								<line
									x1="50%"
									y1="50%"
									x2="75%"
									y2="80%"
									stroke="url(#lineGradient)"
									strokeWidth="2"
									className="animate-pulse"
									style={{ animationDelay: "1.5s" }}
								/>
							</svg>
						)}

						{/* Background Particles */}
						{heroConfig.showParticles && (
							<div className="pointer-events-none absolute inset-0 overflow-hidden">
								{Array.from({ length: 20 }).map((_, i) => (
									<div
										key={i}
										className="bg-primary/20 border-border absolute h-1 w-1 animate-pulse !rounded-none border"
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
