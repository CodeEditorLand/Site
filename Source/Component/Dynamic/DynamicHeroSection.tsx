import { useEffect, useRef } from "react";

import { DynamicBadge } from "./DynamicBadge";
import { DynamicButton } from "./DynamicButton";
import { Cpu, Globe, Layers, Server, Zap, Puzzle, Box, Network } from "lucide-react";
import type Property from "./Interface/Property/Hero.js";

/**
 * Dynamic HeroSection with simplex noise integration.
 * Desktop: orbital layout with staccato float animation.
 * The entire hero can act as a button (clickable CTA surface).
 * Floating cards are noise-seeded for organic staccato movement.
 */
const DynamicHeroSection = ({ content, className }: Property) => {
	const SceneReference = useRef<HTMLDivElement>(null);
	const SectionReference = useRef<HTMLElement>(null);
	const {
		title: Title,
		titleHighlight: TitleHighlight,
		subtitle: Subtitle,
		primaryCta: PrimaryCTA,
		secondaryCta: SecondaryCTA,
		floatingCards: FloatingCard = [],
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

		const CardElement =
			Scene.querySelectorAll<HTMLElement>(".FloatingCard");
		let FrameIdentifier: number;
		let NoiseFunction: ((X: number, Y: number) => number) | null = null;

		const STEP = 6;

		const Quantize = (Value: number, Step: number): number =>
			Math.floor(Value * Step) / Step;

		const LoadNoise = async () => {
			const { createNoise2D } = await import("simplex-noise");
			NoiseFunction = createNoise2D();

			// Seed each floating card with per-element noise offsets
			const StaccatoModule =
				await import("../../Function/Noise/Staccato.js");
			const Engine = await StaccatoModule.default;
			CardElement.forEach((Card, Index) => {
				Engine.SeedElement(Card, Index);
			});

			// Apply attention scatter to connecting lines container
			const AttentionModule =
				await import("../../Function/Noise/Attention.js");
			const Attention = await AttentionModule.default;
			Attention.ApplyToSelector(".FloatingCard", 8, 6);
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

	const HandleHeroClick = () => {
		if (PrimaryCTA?.href) {
			window.location.href = PrimaryCTA.href;
		}
	};

	return (
		<section
			ref={SectionReference}
			id="hero"
			aria-label="Hero"
			className={`StaccatoHeroButton relative flex min-h-[100dvh] w-full items-center overflow-hidden py-16 lg:py-24 ${className || ""}`}
			onClick={HandleHeroClick}
			onKeyDown={(Event) => {
				if (Event.key === "Enter" || Event.key === " ") {
					Event.preventDefault();
					HandleHeroClick();
				}
			}}
			role="button"
			tabIndex={0}>
			<div className="container mx-auto px-4 text-center">
				{/* Badge:breathing with rhythm pulse on dot */}
				{content.badge && (
					<DynamicBadge
						content={content.badge}
						className="StaccatoBadge mb-6"
					/>
				)}

				{/* Title:subtle color shift */}
				<h1 className="StaccatoColorShift mx-auto mb-6 max-w-4xl text-4xl tracking-tight md:text-6xl lg:text-7xl">
					{Title}{" "}
					{TitleHighlight && (
						<span className="text-primary">{TitleHighlight}</span>
					)}
				</h1>

				{/* CTAs:noise-driven button states */}
				<div className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:[&>button]:w-auto">
					<DynamicButton content={PrimaryCTA} />
					{SecondaryCTA && <DynamicButton content={SecondaryCTA} />}
				</div>

				{/* Subtitle:breathing opacity */}
				<p className="StaccatoBreath mx-auto mb-12 max-w-2xl text-lg text-muted-foreground">
					{Subtitle}
				</p>

				{/* Tech stack visualization */}
				<div className="relative mx-auto max-w-5xl" aria-hidden="true">
					{/* Mobile + Tablet: wrap grid */}
					<div className="flex flex-wrap items-center justify-center gap-3 lg:hidden">
						{FloatingCard.map((Card, Index) => {
							// Map card titles to appropriate icons
							const GetIcon = () => {
								const Title = Card.title.toLowerCase();
								if (Title.includes("rust") || Title.includes("core")) return Cpu;
								if (Title.includes("tauri") || Title.includes("ui")) return Box;
								if (Title.includes("effect") || Title.includes("service")) return Layers;
								if (Title.includes("grpc") || Title.includes("ipc")) return Network;
								if (Title.includes("extension")) return Puzzle;
								if (Title.includes("cross") || Title.includes("platform")) return Globe;
								if (Title.includes("vs code") || Title.includes("api")) return Server;
								if (Title.includes("open") || Title.includes("source")) return Zap;
								return Cpu; // default fallback
							};

							const IconComponent = GetIcon();

							return (
							<div
								key={Card.id}
								className="StaccatoCard border border-[var(--Border)] bg-white p-3"
								style={{
									transitionDelay: `${Index * 50}ms`,
								}}>
								<div className="mb-2 flex items-center justify-center">
									<IconComponent className="h-6 w-6 text-primary" />
								</div>
								<div className="text-center">
									<div className="text-xs font-medium text-foreground">
										{Card.title}
									</div>
								</div>
							</div>
							);
						})}
					</div>

					{/* Desktop: orbital layout */}
					<div
						ref={SceneReference}
						className="relative hidden min-h-[500px] lg:block"
						style={{ perspective: "1000px" }}>
						{/* Central Hub:logo with micro-movement */}
						<div className="StaccatoLogo absolute left-1/2 top-1/2 z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden border border-[var(--Border)] bg-white">
							<img
								src="/Asset/Logo/Glyph/Land.svg"
								alt="Code Editor Land"
								title="Code Editor Land"
								width="80"
								height="80"
								className="h-20 w-20"
							/>
						</div>

						{/* Floating Cards:noise-seeded staccato */}
						{FloatingCard.map((Card, Index) => {
							const Total = FloatingCard.length;
							const Angle =
								(Index / Total) * 2 * Math.PI - Math.PI / 2;
							const RadiusX = 38;
							const RadiusY = 35;
							const CenterX = 50 + Math.cos(Angle) * RadiusX;
							const CenterY = 50 + Math.sin(Angle) * RadiusY;

							// Map card titles to appropriate icons
							const GetIcon = () => {
								const Title = Card.title.toLowerCase();
								if (Title.includes("rust") || Title.includes("core")) return Cpu;
								if (Title.includes("tauri") || Title.includes("ui")) return Box;
								if (Title.includes("effect") || Title.includes("service")) return Layers;
								if (Title.includes("grpc") || Title.includes("ipc")) return Network;
								if (Title.includes("extension")) return Puzzle;
								if (Title.includes("cross") || Title.includes("platform")) return Globe;
								if (Title.includes("vs code") || Title.includes("api")) return Server;
								if (Title.includes("open") || Title.includes("source")) return Zap;
								return Cpu; // default fallback
							};

							const IconComponent = GetIcon();

							return (
							<div
								key={Card.id}
								className="FloatingCard StaccatoBorderShimmer StaccatoShadowLift absolute transform-gpu border border-[var(--Border)] bg-white p-3 w-36"
								style={{
									top: `${CenterY}%`,
									left: `${CenterX}%`,
									transform: "translate(-50%, -50%)",
								}}>
								<div className="mb-2 flex items-center justify-center">
									<IconComponent className="h-8 w-8 text-primary" />
								</div>
								<div className="text-center">
									<div className="text-xs font-medium text-foreground">
										{Card.title}
									</div>
								</div>
							</div>
							);
						})}

						{/* Connecting Lines:breathing opacity */}
						{HeroConfiguration.showConnectingLines && (
							<svg
								className="StaccatoBreath pointer-events-none absolute inset-0 h-full w-full opacity-15"
								aria-hidden="true"
								role="presentation">
								{FloatingCard.map((Card, Index) => {
									const Total = FloatingCard.length;
									const Angle =
										(Index / Total) * 2 * Math.PI -
										Math.PI / 2;
									const RadiusX = 38;
									const RadiusY = 35;
									const CenterX =
										50 + Math.cos(Angle) * RadiusX;
									const CenterY =
										50 + Math.sin(Angle) * RadiusY;
									return (
										<line
											key={Card.id}
											x1="50%"
											y1="50%"
											x2={`${CenterX}%`}
											y2={`${CenterY}%`}
											stroke="currentColor"
											strokeWidth="1"
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
};

export { DynamicHeroSection };

export default DynamicHeroSection;
