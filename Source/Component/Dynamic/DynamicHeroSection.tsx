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

		// Calm/refined direction: the orbital cards stay static at their
		// anchors instead of drifting on noise (the drift read as dated
		// parallax). The scene keeps its layout; only the animation is off.
		if (
			!Scene ||
			true ||
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
		if (PrimaryCTA?.Href) {
			window.location.href = PrimaryCTA.Href;
		}
	};

	return (
		<section
			ref={SectionReference}
			id="hero"
			aria-label="Hero"
			className={`StaccatoHeroButton relative flex min-h-0 w-full items-start overflow-hidden pb-12 pt-20 lg:items-center lg:pb-24 lg:pt-32 ${ClassName || ""}`}
			onClick={HandleHeroClick}
			onKeyDown={(Event) => {
				if (Event.key === "Enter" || Event.key === " ") {
					Event.preventDefault();

					HandleHeroClick();
				}
			}}
			role="button"
			tabIndex={0}
		>
			{/* Cyberpunk HUD: hairline blueprint grid, dark theme only.
			 Faint --Border-colored lines, masked to fade at the edges. */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 hidden dark:block"
				style={{
					backgroundImage:
						"linear-gradient(var(--Border) 1px, transparent 1px), linear-gradient(90deg, var(--Border) 1px, transparent 1px)",
					backgroundSize: "48px 48px",
					maskImage:
						"radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 75%)",
					WebkitMaskImage:
						"radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 75%)",
				}}
			/>
			<div className="container relative mx-auto px-4 text-center">
				{/* Badge:breathing with rhythm pulse on dot */}
				{Content.Badge && (
					<DynamicBadge
						Content={Content.Badge}
						ClassName="StaccatoBadge mb-8"
					/>
				)}

				{/* Title: Instrument Serif display. 400 weight, near-zero
				 tracking and tight leading - the "fancy" high-contrast voice. */}
				<h1 className="StaccatoColorShift mx-auto max-w-4xl font-serif text-6xl font-normal leading-[0.95] tracking-[-0.01em] md:text-8xl lg:text-9xl">
					{Title}
					{Title && TitleHighlight ? " " : ""}
					{TitleHighlight && (
						<span className="italic text-ipc">
							{TitleHighlight}
						</span>
					)}
				</h1>

				{/* Subtitle: small grayed help text directly under the title */}
				<div className="StaccatoBreath mx-auto mt-3 max-w-2xl text-muted">
					<RichText Text={Subtitle} />
				</div>

				{/* Wide top padding before CTAs (body) */}
				<div className="mb-16 mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:[&>button]:w-auto">
					<DynamicButton Content={PrimaryCTA} />
					{SecondaryCTA && <DynamicButton Content={SecondaryCTA} />}
				</div>

				{/* Tech stack section label - mono HUD eyebrow */}
				<p className="mb-8 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
					<span className="text-grpc">//</span> Tech
					Stack
				</p>

				{/* Tech stack - modern HUD grid (static, grid-aligned, all breakpoints) */}
				<div
					className="mx-auto max-w-5xl px-6 py-10 lg:px-10"
					aria-hidden="true"
				>
					<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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

							// Map card titles to Spine protocol colors
							const GetIconColor = (): string => {
								const Title = Card.Title.toLowerCase();

								if (
									Title.includes("rust") ||
									Title.includes("core")
								)
									return "var(--SpineTCP)";

								if (
									Title.includes("tauri") ||
									Title.includes("ui")
								)
									return "var(--SpineIPC)";

								if (
									Title.includes("effect") ||
									Title.includes("service")
								)
									return "var(--SpineWASM)";

								if (
									Title.includes("grpc") ||
									Title.includes("ipc")
								)
									return "var(--SpinegRPC)";

								if (Title.includes("extension"))
									return "var(--SpineWASM)";

								if (
									Title.includes("cross") ||
									Title.includes("platform")
								)
									return "var(--SpineIPC)";

								if (
									Title.includes("vs code") ||
									Title.includes("api")
								)
									return "var(--SpinegRPC)";

								if (
									Title.includes("open") ||
									Title.includes("source")
								)
									return "var(--SpineTCP)";

								return "var(--SpineIPC)";
							};

							return (
								<jelly-card
									key={Card.Id}
									squish
									className="group relative p-4"
									style={{
										"--jelly-fill": "var(--Card)",
										"--jelly-radius": "0",
										"--jelly-card-font-size": "inherit",
										"--jelly-card-padding-block": "0",
										"--jelly-card-padding-inline": "0",
										"--jelly-color-border-default": GetIconColor(),
									} as React.CSSProperties}
								>
									<div className="flex items-center gap-3">
										<IconComponent
										className="h-5 w-5 shrink-0"
										strokeWidth={1.5}
										style={{ color: GetIconColor() }}
									/>
									<span className="truncate font-mono text-xs uppercase tracking-wider text-foreground">
										{Card.Title}
									</span>
									</div>
								</jelly-card>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};

export { DynamicHeroSection };

export default DynamicHeroSection;
