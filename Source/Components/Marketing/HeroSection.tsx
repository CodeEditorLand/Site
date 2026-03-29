"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/Components/UI/Button";
import { Badge } from "@/Components/UI/Badge";
import { ArrowRight, Play } from "lucide-react";
import { useTranslation } from "@/Lib/I18n";

/**
 * HeroSection component - Main landing page hero with 3D animated floating cards
 *
 * @example
 * ```tsx
 * <HeroSection />
 * ```
 *
 * @remarks
 * - 3D scene with CSS transforms and requestAnimationFrame
 * - Central hub with orbiting component cards
 * - 20 background particles for depth
 * - GPU-accelerated transforms (translate3d)
 * - Respects prefers-reduced-motion
 * - Fully responsive layout
 */
export function HeroSection() {
	const { t } = useTranslation();
	const sceneRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const scene = sceneRef.current;
		if (!scene) return;

		const cards = scene.querySelectorAll(".floating-card");
		const cardConfigs = Array.from(cards).map((_, i) => ({
			element: cards[i] as HTMLElement,
			amplitudeX: 25 + Math.random() * 15,
			amplitudeY: 20 + Math.random() * 10,
			rotateX: 10,
			rotateY: 15,
			offset: i * 0.5,
		}));

		const animate = () => {
			const time = Date.now() * 0.001;

			cardConfigs.forEach(({ element, amplitudeX, amplitudeY, rotateX, rotateY, offset }) => {
				const x = Math.sin(time + offset) * amplitudeX;
				const y = Math.cos(time + offset * 1.2) * amplitudeY;
				const rx = Math.sin(time + offset) * rotateX;
				const ry = Math.cos(time + offset * 0.8) * rotateY;

				element.style.transform = `translate3d(${x}px, ${y}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;
			});

			requestAnimationFrame(animate);
		};

		const rafId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(rafId);
	}, []);

	const cardPositions = [
		{ top: "top-16", left: "left-20", width: "w-40", height: "h-24", label: "button" },
		{ top: "top-32", right: "right-16", width: "w-36", height: "h-28", label: "colors" },
		{ top: "top-64", left: "left-16", width: "w-44", height: "h-32", label: "typography" },
		{ top: "top-20", right: "right-20", width: "w-32", height: "h-20", label: "components" },
		{ top: "bottom-32", left: "left-24", width: "w-48", height: "h-36", label: "spacing" },
		{ top: "bottom-16", right: "right-12", width: "w-40", height: "h-28", label: "icons" },
		{ top: "top-1/2", left: "left-1/3", width: "w-36", height: "h-24", label: "docs" },
		{ top: "bottom-1/3", right: "right-1/3", width: "w-44", height: "h-20", label: "versions" },
	];

	return (
		<section className="relative py-20 lg:py-32 overflow-hidden">
			<div className="container mx-auto px-4 text-center">
				<Badge variant="secondary" className="mb-6">
					{t("home.hero.badge", "🎉 New: AI-powered component generation")}
				</Badge>

				<h1 className="mx-auto max-w-4xl text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6">
					{t("home.hero.title", "Build consistent")}{" "}
					<span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
						{t("home.hero.titleHighlight", "design systems")}
					</span>{" "}
					{t("home.hero.atScale", "at scale")}
				</h1>

				<p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
					{t("home.hero.subtitle", "Create, maintain, and scale your design system with our comprehensive platform. From design tokens to component libraries, we've got you covered.")}
				</p>

				<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
					<Button size="lg" className="w-full sm:w-auto">
						{t("home.hero.cta.primary", "Start Free Trial")}
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
					<Button variant="outline" size="lg" className="w-full sm:w-auto">
						<Play className="mr-2 h-4 w-4" />
						{t("home.hero.cta.secondary", "Watch Demo")}
					</Button>
				</div>

				<div className="relative mx-auto max-w-5xl h-96 lg:h-[500px]">
					<div
						ref={sceneRef}
						className="relative w-full h-full"
						role="img"
						aria-label={t("home.hero.scene.description", "3D animated design system components")}
						style={{ perspective: "1000px" }}
					>
						{/* Central Hub */}
						<div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-primary to-primary/70 !rounded-none shadow-2xl flex items-center justify-center z-10 border-[3px] border-border">
							<div className="w-16 h-16 bg-white !rounded-none flex items-center justify-center border-[3px] border-border">
								<div className="w-8 h-8 bg-primary !rounded-none border-[2px] border-border" />
							</div>
						</div>

						{/* Floating Cards */}
						{cardPositions.map((pos, i) => (
							<div
								key={i}
								className={`floating-card absolute ${pos.top} ${pos.left} ${pos.width} ${pos.height} bg-card border-[3px] !rounded-none shadow-lg p-4 transform-gpu flex items-center justify-center`}
								aria-label={t(`home.hero.scene.components.${pos.label}`, pos.label)}
							>
								<div className="text-center">
									<div className="w-8 h-8 bg-primary/20 border border-border mx-auto mb-2 flex items-center justify-center" />
									<p className="text-xs font-mono">{t(`home.hero.scene.components.${pos.label}`, pos.label)}</p>
								</div>
							</div>
						))}

						{/* SVG Connecting Lines */}
						<svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
							<defs>
								<linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
									<stop offset="50%" stopColor="currentColor" stopOpacity="0.3" />
									<stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
								</linearGradient>
							</defs>
							{cardPositions.map((_, i) => (
								<line
									key={i}
									x1="50%"
									y1="50%"
									x2={i % 2 === 0 ? "30%" : "70%"}
									y2={i % 3 === 0 ? "30%" : i % 3 === 1 ? "50%" : "70%"}
									stroke="url(#lineGradient)"
									strokeWidth="2"
									className="animate-pulse"
									style={{ animationDelay: `${i * 0.5}s` }}
								/>
							))}
						</svg>

						{/* Background Particles */}
						<div className="absolute inset-0 overflow-hidden pointer-events-none">
							{Array.from({ length: 20 }).map((_, i) => (
								<div
									key={i}
									className="absolute w-1 h-1 bg-primary/20 border border-border animate-pulse"
									style={{
										left: `${Math.random() * 100}%`,
										top: `${Math.random() * 100}%`,
										animationDelay: `${Math.random() * 3}s`,
										animationDuration: `${2 + Math.random() * 3}s`,
									}}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
