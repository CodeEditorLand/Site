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
	compatibility: "var(--SpineWASM)",
	architecture: "var(--ExtensionEffectTypeScript)",
	"cross-platform": "var(--ExtensionTauri)",
	tooling: "var(--ToolBiome)",
	opensource: "var(--SpinegRPC)",
};

/**
 * Human-readable labels for every icon in the registry.
 * These flow into aria-label, title, and Radix tooltip text via IconTooltip.
 */
const FeatureIconLabelMap: Record<string, string> = {
	Zap: "Mountain runs native services through Tauri outside the WebView, dispatched via the ActionEffect system",
	Box: "Cocoon hosts VS Code extensions with Effect-TS across a dual-track architecture",
	Cpu: "Rust services run at native speed without Electron overhead",
	Globe: "One Tauri source tree compiles to macOS, Windows, and Linux",
	Wrench: "Rust, Tauri, Effect-TS, Biome, and OXC form the toolchain",
	Heart: "CC0 public domain - free to use, fork, and ship",
	Layers: "Effect-TS provides typed errors and dependency injection across Wind and Cocoon service layers",
	Puzzle: "Extensions run unmodified through Cocoon where their APIs are implemented",
	Server: "gRPC connects Mountain, Cocoon, Air, and Grove via typed protocol contracts",
	Shield: "Verified request path where implemented",
	Sparkles: "Active development across all element repos",
	Code: "Rust and TypeScript across native and service layers",
	Package: "Tauri bundles to native platform packages with no Chromium",
};

/**
 * Per-icon semantic color - each icon has its OWN color based on what it
 * represents in the technology stack, independent of which feature card
 * it appears in. This ensures visual delineation across the color matrix.
 *
 * Groups:
 * Rust/perf → ExtensionRust (red)
 * VS Code/ext → SpineIPC (blue)
 * Effect-TS → ExtensionEffectTypeScript (cyan)
 * Platform/OS → OSMacOS (gray)
 * Build tools → ToolBiome (emerald via SpinegRPC)
 * Open source → SpinegRPC (green)
 * Security → SpineWASM (purple)
 * Storage → SpineTCP (orange)
 */
const IconSemanticColorMap: Record<string, string> = {
	Zap: "var(--ExtensionRust)",
	Cpu: "var(--LanguageRust)",
	Server: "var(--SpinegRPC)",
	Box: "var(--SpineWASM)",
	Puzzle: "var(--ExtensionEffectTypeScript)",
	Code: "var(--LanguageTypeScript)",
	Layers: "var(--SpineTCP)",
	Shield: "var(--ExtensionTauri)",
	Globe: "var(--ExtensionTauri)",
	Package: "var(--ToolEsBuild)",
	Database: "var(--SpineTCP)",
	Wrench: "var(--ToolBiome)",
	Heart: "var(--ExtensionRust)",
	Sparkles: "var(--ToolOxc)",
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
			className={`flex min-h-[100dvh] w-full flex-col justify-center bg-[var(--Mute)] py-24 sm:py-32 ${
				ClassName || ""
			}`}>
			<div className="container mx-auto px-4">
				{(Title || Subtitle) && (
					<div className="StaccatoBreath mx-auto mb-24 max-w-2xl text-center">
						{Title && (
							<h2
								id="FeaturesHeading"
								className="text-2xl font-semibold tracking-tight sm:text-3xl">
								{Title}
							</h2>
						)}
						{Subtitle && (
							<div className="mt-3 text-[var(--MuteForeground)]">
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
										? "Mountain and Echo run native Rust services\nthrough Tauri outside the WebView,\ndispatched via ActionEffect."
										: Feature.Id === "compatibility"
											? "Cocoon extension host runs\nunmodified VS Code extensions\nvia Effect-TS across a dual-track architecture."
											: Feature.Id === "architecture"
												? "Effect-TS Layer stacks provide:\n• Typed errors\n• Structured concurrency\n• Compile-time dependency tracking"
												: Feature.Id ===
													 "cross-platform"
													? "Tauri compiles one codebase\nto native macOS, Windows, and Linux apps\nvia platform WebViews."
													: Feature.Id === "tooling"
														? "Built on:\n• Rust\n• Tauri\n• Effect-TS\n• Biome\n• OXC\n\nFor modern developer tooling."
														: Feature.Id ===
															 "opensource"
															? "CC0 1.0 Universal\npublic domain dedication.\n\nFunded by NLnet NGI0 Commons Fund."
															: undefined
								}
								className="FeatureCard StaccatoCard flex flex-col space-y-6 rounded-none bg-white p-8">
								<div className="flex items-start justify-between">
									<h3 className="text-xl font-semibold">
										{Feature.Title}
									</h3>
									{/* Card header icon - wrapped in IconTooltip so hover + screen reader both work */}
									<div className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-[var(--Mute)]">
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
														const IsBrandSvg =
															IconName.startsWith(
																"/",
															);

														const StackIcon =
															IsBrandSvg
																? null
																: FeatureIconRegistry[
																		IconName
																	];

														const StackLabel =
															FeatureIconLabelMap[
																IconName
															] ??
															IconName.replace(
																/^\/Image\/|\.svg$/g,
																"",
															);

														const StackColor =
															IconSemanticColorMap[
																IconName
															] ?? FeatureColor;

														if (
															!IsBrandSvg &&
															!StackIcon
														) {
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
																{IsBrandSvg ? (
																	<IconTooltip
																		Label={
																			StackLabel
																		}>
																		<img
																			src={
																				IconName
																			}
																			alt={
																				StackLabel
																			}
																			width="16"
																			height="16"
																			className="inline h-4 w-4"
																			aria-hidden="true"
																		/>
																	</IconTooltip>
																) : (
																	<IconTooltip
																		Label={
																			StackLabel
																		}
																		Icon={
																			StackIcon!
																		}
																		Color={
																			StackColor
																		}
																		SizeClass="h-4 w-4"
																	/>
																)}
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
