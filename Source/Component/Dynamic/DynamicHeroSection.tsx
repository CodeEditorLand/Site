import * as lucide from "lucide-react";
import { useEffect, useRef } from "react";

import { IconTooltip } from "../UI/IconTooltip.js";
import { RichText } from "../UI/RichText.js";
import { DynamicBadge } from "./DynamicBadge";
import { DynamicButton } from "./DynamicButton";
import type Property from "./Interface/Property/Hero.js";

/**
 * Dynamic HeroSection with simplex noise integration.
 * Desktop: orbital layout with staccato float animation.
 * The entire hero can act as a button (clickable CTA surface).
 * Floating cards are noise-seeded for organic staccato movement.
 */
const DynamicHeroSection = ({ Content, ClassName }: Property) => {
	const SceneReference = useRef<HTMLDivElement>(null);
	const SectionReference = useRef<HTMLElement>(null);
	const {
		Title,
		TitleHighlight,
		Subtitle,
		PrimaryCta: PrimaryCTA,
		SecondaryCta: SecondaryCTA,
		FloatingCards: FloatingCard = [],
		...HeroConfiguration
	} = Content;

	useEffect(() => {
		const Scene = SceneReference.current;
		if (
			!Scene ||
			(HeroConfiguration.RespectReducedMotion &&
				window.matchMedia("(prefers-reduced-motion: reduce)").matches)
		) {
			return;
		}

		const CardElement =
			Scene.querySelectorAll<HTMLElement>(".FloatingCard");
		let FrameIdentifier: number;
		let NoiseFunction: ((X: number, Y: number) => number) | null = null;

		// Per-card lerp state - tracks current rendered position and hover
		interface CardState {
			CurrentX: number;
			CurrentY: number;
			IsHovered: boolean;
		}
		const CardStates = new Map<HTMLElement, CardState>();

		const LoadNoise = async () => {
			const { createNoise2D } = await import("simplex-noise");
			// Each page load gets a new noise function → unique orbital drift
			NoiseFunction = createNoise2D();

			const StaccatoModule =
				await import("../../Function/Noise/Staccato.js");
			const Engine = await StaccatoModule.default;

			CardElement.forEach((Card, Index) => {
				Engine.SeedElement(Card, Index);
				const State: CardState = {
					CurrentX: 0,
					CurrentY: 0,
					IsHovered: false,
				};
				CardStates.set(Card, State);
				// Hover: target lerps to (0,0) - card settles at orbital anchor
				Card.addEventListener("mouseenter", () => {
					State.IsHovered = true;
				});
				Card.addEventListener("mouseleave", () => {
					State.IsHovered = false;
				});
			});

			const AttentionModule =
				await import("../../Function/Noise/Attention.js");
			const Attention = await AttentionModule.default;
			Attention.ApplyToSelector(".FloatingCard", 6, 4);
		};

		const AnimateCards = (Time: number) => {
			if (!NoiseFunction) {
				FrameIdentifier = requestAnimationFrame(AnimateCards);
				return;
			}

			// Very slow advance - 0.00007 per ms = ~0.07 per second
			// No quantization: pure smooth simplex output
			const TimeFactor = Time * 0.00007;

			CardElement.forEach((Card, Index) => {
				const State = CardStates.get(Card);
				if (!State) return;

				// Each card uses a different noise coordinate offset (Seed)
				const Seed = Index * 1.3;

				// Target: noise → small amplitude (±5px / ±3.5px)
				// On hover target is (0,0) → smooth lerp back to orbital rest
				const TargetX = State.IsHovered
					? 0
					: NoiseFunction!(TimeFactor + Seed, Seed * 0.4) * 5;
				const TargetY = State.IsHovered
					? 0
					: NoiseFunction!(Seed * 0.4, TimeFactor + Seed) * 3.5;

				// Lerp factor 0.04 → silky smooth, no visible stepping
				State.CurrentX += (TargetX - State.CurrentX) * 0.04;
				State.CurrentY += (TargetY - State.CurrentY) * 0.04;

				Card.style.transform = `translate(-50%, -50%) translate3d(${State.CurrentX.toFixed(2)}px, ${State.CurrentY.toFixed(2)}px, 0)`;
			});

			FrameIdentifier = requestAnimationFrame(AnimateCards);
		};

		LoadNoise();
		FrameIdentifier = requestAnimationFrame(AnimateCards);
		return () => {
			cancelAnimationFrame(FrameIdentifier);
			// Remove event listeners on cleanup
			CardElement.forEach((Card) => {
				const Fresh: CardState = {
					CurrentX: 0,
					CurrentY: 0,
					IsHovered: false,
				};
				CardStates.set(Card, Fresh);
			});
		};
	}, [HeroConfiguration.RespectReducedMotion]);

	const HandleHeroClick = () => {
		if (PrimaryCTA?.href) {
			window.location.href = PrimaryCTA.Href;
		}
	};

	return (
		<section
			ref={SectionReference}
			id="hero"
			aria-label="Hero"
			className={`StaccatoHeroButton relative flex min-h-[200dvh] w-full items-center overflow-hidden py-16 lg:py-24 ${ClassName || ""}`}
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
				{Content.Badge && (
					<DynamicBadge
						Content={Content.Badge}
						ClassName="StaccatoBadge mb-6"
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
					<DynamicButton Content={PrimaryCTA} />
					{SecondaryCTA && <DynamicButton Content={SecondaryCTA} />}
				</div>

				{/* Subtitle:breathing opacity */}
				<div className="StaccatoBreath mx-auto mb-12 max-w-2xl text-lg text-muted-foreground">
					<RichText Text={Subtitle} />
				</div>

				{/* Tech stack visualization */}
				<div className="relative mx-auto max-w-5xl" aria-hidden="true">
					{/* Mobile + Tablet: wrap grid */}
					<div className="flex flex-wrap items-center justify-center gap-3 lg:hidden">
						{FloatingCard.map((Card, Index) => {
							// Map card titles to appropriate icons
							const GetIcon = () => {
								const Title = Card.Title.toLowerCase();
								if (
									Title.includes("rust") ||
									Title.includes("core")
								)
									return lucide.Cpu;
								if (
									Title.includes("tauri") ||
									Title.includes("ui")
								)
									return lucide.Box;
								if (
									Title.includes("effect") ||
									Title.includes("service")
								)
									return lucide.Layers;
								if (
									Title.includes("grpc") ||
									Title.includes("ipc")
								)
									return lucide.Network;
								if (Title.includes("extension"))
									return lucide.Puzzle;
								if (
									Title.includes("cross") ||
									Title.includes("platform")
								)
									return lucide.Globe;
								if (
									Title.includes("vs code") ||
									Title.includes("api")
								)
									return lucide.Server;
								if (
									Title.includes("open") ||
									Title.includes("source")
								)
									return lucide.Zap;
								return lucide.Cpu; // default fallback
							};

							const IconComponent = GetIcon();

							return (
								<div
									key={Card.Id}
									className="StaccatoCard border border-[var(--Border)] bg-white p-3"
									style={{
										transitionDelay: `${Index * 50}ms`,
									}}>
									<div className="mb-2 flex items-center justify-center">
										<IconTooltip
											Label={Card.Title}
											Icon={IconComponent}
											SizeClass="h-6 w-6"
											ClassName="text-primary"
										/>
									</div>
									<div className="text-center">
										<div className="text-xs font-medium text-foreground">
											{Card.Title}
										</div>
										{Card.Colors &&
											Card.Colors.length > 0 && (
												<div className="mt-1.5 flex items-center justify-center gap-1.5">
													{Card.Colors.map(
														(Color, ColorIndex) => (
															<div
																key={ColorIndex}
																className="StaccatoRhythmDot h-3 w-3 border border-[var(--Border)]"
																style={{
																	backgroundColor:
																		Color,
																}}
															/>
														),
													)}
												</div>
											)}
									</div>
								</div>
							);
						})}
					</div>

					{/* Desktop: orbital layout */}
					<div
						ref={SceneReference}
						className="relative hidden min-h-[80vh] lg:block"
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
								const Title = Card.Title.toLowerCase();
								if (
									Title.includes("rust") ||
									Title.includes("core")
								)
									return lucide.Cpu;
								if (
									Title.includes("tauri") ||
									Title.includes("ui")
								)
									return lucide.Box;
								if (
									Title.includes("effect") ||
									Title.includes("service")
								)
									return lucide.Layers;
								if (
									Title.includes("grpc") ||
									Title.includes("ipc")
								)
									return lucide.Network;
								if (Title.includes("extension"))
									return lucide.Puzzle;
								if (
									Title.includes("cross") ||
									Title.includes("platform")
								)
									return lucide.Globe;
								if (
									Title.includes("vs code") ||
									Title.includes("api")
								)
									return lucide.Server;
								if (
									Title.includes("open") ||
									Title.includes("source")
								)
									return lucide.Zap;
								return lucide.Cpu; // default fallicon
							};

							const IconComponent = GetIcon();

							return (
								<div
									key={Card.Id}
									className="FloatingCard StaccatoBorderShimmer StaccatoShadowLift absolute z-50 w-36 transform-gpu border border-[var(--Border)] bg-white p-3"
									style={{
										top: `${CenterY}%`,
										left: `${CenterX}%`,
										transform: "translate(-50%, -50%)",
									}}>
									<div className="mb-2 flex items-center justify-center">
										<IconTooltip
											Label={Card.Title}
											Icon={IconComponent}
											SizeClass="h-8 w-8"
											ClassName="text-primary"
										/>
									</div>
									<div className="text-center">
										<div className="text-xs font-medium text-foreground">
											{Card.Title}
										</div>
										{Card.Colors &&
											Card.Colors.length > 0 && (
												<div className="mt-1.5 flex items-center justify-center gap-1.5">
													{Card.Colors.map(
														(Color, ColorIndex) => (
															<div
																key={ColorIndex}
																className="StaccatoRhythmDot h-3 w-3 border border-[var(--Border)]"
																style={{
																	backgroundColor:
																		Color,
																}}
															/>
														),
													)}
												</div>
											)}
									</div>
								</div>
							);
						})}

						{/* Connecting Lines:breathing opacity */}
						{HeroConfiguration.ShowConnectingLines && (
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
											key={Card.Id}
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
