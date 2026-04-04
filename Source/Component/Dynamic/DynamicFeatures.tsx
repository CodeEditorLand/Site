import * as lucide from "lucide-react";
import { useEffect, useRef } from "react";

import { IconTooltip } from "../UI/IconTooltip.js";
import { RichText } from "../UI/RichText.js";
import type Property from "./Interface/Property/Feature.js";

/**
 * Icon registry: direct imports so icons render in initial HTML,
 * not after a dynamic import resolves on the client.
 */
const FeatureIconRegistry: Record<string, lucide.LucideIcon> = {
	Zap: lucide.Zap,
	Box: lucide.Box,
	Cpu: lucide.Cpu,
	Globe: lucide.Globe,
	Wrench: lucide.Wrench,
	Heart: lucide.Heart,
	Sparkles: lucide.Sparkles,
	Code: lucide.Code,
	Layers: lucide.Layers,
	Package: lucide.Package,
	Puzzle: lucide.Puzzle,
	Server: lucide.Server,
	Shield: lucide.Shield,
	Database: lucide.Database,
};

/**
 * Semantic color map per feature ID - maps each feature to its design token.
 * Used for the card header icon color and the icon stack in the description.
 */
const FeatureColorMap: Record<string, string> = {
	performance: "var(--ExtensionRust)",
	compatibility: "var(--SpineIPC)",
	architecture: "var(--ExtensionEffectTypeScript)",
	"cross-platform": "var(--OSMacOS)",
	tooling: "var(--ToolBiome)",
	opensource: "var(--SpinegRPC)",
};

/**
 * Human-readable labels for every icon in the registry.
 * These flow into aria-label, title, and Radix tooltip text via IconTooltip.
 */
const FeatureIconLabelMap: Record<string, string> = {
	Zap: "Responds in microseconds, every time",
	Box: "Your VS Code extensions run unchanged",
	Cpu: "Runs at native CPU speed",
	Globe: "Ships to every OS from one codebase",
	Wrench: "Best-in-class developer toolchain",
	Heart: "CC0 - free to use, fork, and ship",
	Sparkles: "Packed with capabilities",
	Code: "Write and ship faster",
	Layers: "Type errors caught at compile time",
	Package: "Deploys as one native bundle",
	Puzzle: "Extensions install and run unchanged",
	Server: "Always-on relay, zero downtime",
	Shield: "Every request verified, zero trust",
	Database: "Your data stays on your machine",
};

/**
 * Per-icon semantic color - each icon has its OWN color based on what it
 * represents in the technology stack, independent of which feature card
 * it appears in. This ensures visual delineation across the color matrix.
 *
 * Groups:
 *   Rust/perf    → ExtensionRust (red)
 *   VS Code/ext  → SpineIPC (blue)
 *   Effect-TS    → ExtensionEffectTypeScript (cyan)
 *   Platform/OS  → OSMacOS (gray)
 *   Build tools  → ToolBiome (emerald via SpinegRPC)
 *   Open source  → SpinegRPC (green)
 *   Security     → SpineWASM (purple)
 *   Storage      → SpineTCP (orange)
 */
const IconSemanticColorMap: Record<string, string> = {
	Zap: "var(--ExtensionRust)",
	Cpu: "var(--ExtensionEffectTypeScript)",
	Server: "var(--PlatformDesktop)",
	Box: "var(--SpineIPC)",
	Puzzle: "var(--SpineWASM)",
	Code: "var(--SpineIPC)",
	Layers: "var(--ExtensionEffectTypeScript)",
	Shield: "var(--SpineWASMFore)",
	Globe: "var(--OSMacOS)",
	Package: "var(--ExtensionTauri)",
	Database: "var(--SpineTCP)",
	Wrench: "var(--SpinegRPC)",
	Heart: "var(--ExtensionRust)",
	Sparkles: "var(--ExtensionTauri)",
};

/**
 * Dynamic Features with simplex noise integration.
 * Cards get StaccatoCard + Attention scatter for organic layout.
 * Icons render immediately via direct imports (no dynamic import delay).
 * All icons are wrapped in IconTooltip - aria-label, title, and hover tooltip.
 */
const DynamicFeatures = ({ Content, ClassName }: Property) => {
	const { Title, Subtitle, Features, Columns = 3, Gap = "lg" } = Content;

	const GridReference = useRef<HTMLDivElement>(null);

	const GapClass = {
		sm: "gap-4",
		md: "gap-6",
		lg: "gap-8",
		xl: "gap-12",
	};

	const ColumnClass: Record<number, string> = {
		1: "grid-cols-1",
		2: "grid-cols-1 md:grid-cols-2",
		3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
		4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
		5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
		6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
	};

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

			const Cards = Grid.querySelectorAll<HTMLElement>(".FeatureCard");

			Cards.forEach((Card, Index) => {
				Attention.ApplyToElement(Card, Index, 6, 4);
			});

			const StaccatoModule =
				await import("../../Function/Noise/Staccato.js");

			const Engine = await StaccatoModule.default;

			Engine.SeedSelector(".FeatureCard");
		};

		ApplyScatter();
	}, [Features]);

	const GetIcon = (IconName: string): lucide.LucideIcon | null =>
		FeatureIconRegistry[IconName] || null;

	return (
		<section
			id="features"
			aria-labelledby="FeaturesHeading"
			className={`flex min-h-[100dvh] w-full flex-col justify-center py-16 ${
				ClassName || ""
			}`}>
			<div className="container mx-auto px-4">
				{(Title || Subtitle) && (
					<div className="StaccatoBreath mb-16 text-center">
						{Title && (
							<h2
								id="FeaturesHeading"
								className="mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl">
								{Title}
							</h2>
						)}
						{Subtitle && (
							<div className="mx-auto max-w-2xl text-lg text-muted-foreground">
								<RichText Text={Subtitle} />
							</div>
						)}
					</div>
				)}

				<div
					ref={GridReference}
					className={`StaccatoMorphGap grid ${
						ColumnClass[Columns]
					} ${GapClass[Gap]} mx-auto max-w-6xl`}>
					{Features.map((Feature) => {
						const Icon = GetIcon(Feature.Icon);

						const IconLabel =
							FeatureIconLabelMap[Feature.Icon] ?? Feature.Title;

						const FeatureColor =
							FeatureColorMap[Feature.Id] ?? "var(--Primary)";

						return (
							<article
								key={Feature.Id}
								title={
									Feature.Id === "performance"
										? "Rust backend via Tauri 2.0 with gRPC IPC for native speed without Electron overhead."
										: Feature.Id === "compatibility"
											? "Cocoon extension host runs VS Code extensions via Effect-TS with high-fidelity API compatibility."
											: Feature.Id === "architecture"
												? "Effect-TS provides type-safe services, structured concurrency, and dependency injection in the UI layer."
												: Feature.Id ===
													  "cross-platform"
													? "Tauri 2.0 compiles one codebase to native macOS, Windows, and Linux apps via platform WebViews."
													: Feature.Id === "tooling"
														? "Built on Rust, Tauri, Effect-TS, Biome formatter, and the VS Code platform for modern DX."
														: Feature.Id ===
															  "opensource"
															? "CC0 1.0 Universal public domain dedication. Funded by NLnet NGI0 Commons Fund."
															: undefined
								}
								className="FeatureCard StaccatoCard StaccatoBorderShimmer flex flex-col space-y-4 rounded-none border border-[var(--Border)] bg-white p-6">
								<div className="flex items-start justify-between">
									<h3 className="text-xl font-semibold">
										{Feature.Title}
									</h3>
									{/* Card header icon - wrapped in IconTooltip so hover + screen reader both work */}
									<div className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-[var(--Border)] bg-secondary">
										<IconTooltip
											Label={IconLabel}
											Icon={Icon ?? lucide.Sparkles}
											Color={FeatureColor}
											SizeClass="h-5 w-5"
											ClassName="StaccatoIcon"
										/>
									</div>
								</div>
								<p className="StaccatoBreath text-muted-foreground">
									<RichText Text={Feature.Description} />
									<br />
									{Feature.Icons &&
										Feature.Icons.length > 0 && (
											<span
												className="inline-flex items-center align-middle"
												role="img"
												aria-label={`${
													Feature.Title
												} technology stack`}>
												{Feature.Icons.map(
													(IconName, IconIndex) => {
														const StackIcon =
															FeatureIconRegistry[
																IconName
															];

														const StackLabel =
															FeatureIconLabelMap[
																IconName
															] ?? IconName;

														const StackColor =
															IconSemanticColorMap[
																IconName
															] ?? FeatureColor;

														if (!StackIcon) {
															return null;
														}

														return (
															<span
																key={IconIndex}
																className="inline-flex items-center">
																{IconIndex ===
																0 ? (
																	"\u2001"
																) : (
																	<>
																		{
																			"\u2001"
																		}
																		{
																			"\u2001"
																		}
																	</>
																)}
																<IconTooltip
																	Label={
																		StackLabel
																	}
																	Icon={
																		StackIcon
																	}
																	Color={
																		StackColor
																	}
																	SizeClass="h-4 w-4"
																/>
															</span>
														);
													},
												)}
											</span>
										)}
								</p>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export { DynamicFeatures };

export default DynamicFeatures;
