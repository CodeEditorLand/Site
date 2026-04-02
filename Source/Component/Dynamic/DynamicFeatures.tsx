import * as lucide from "lucide-react";
import { useEffect, useRef } from "react";

import { IconTooltip } from "../UI/IconTooltip.js";
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
 * Semantic color map per feature ID — maps each feature to its design token.
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
	Zap: "Performance",
	Box: "Compatibility",
	Cpu: "Architecture",
	Globe: "Cross-Platform",
	Wrench: "Tooling",
	Heart: "Open Source",
	Sparkles: "Features",
	Code: "Code",
	Layers: "Layers",
	Package: "Package",
	Puzzle: "Extensions",
	Server: "Server",
	Shield: "Security",
	Database: "Storage",
};

/**
 * Dynamic Features with simplex noise integration.
 * Cards get StaccatoCard + Attention scatter for organic layout.
 * Icons render immediately via direct imports (no dynamic import delay).
 * All icons are wrapped in IconTooltip — aria-label, title, and hover tooltip.
 */
const DynamicFeatures = ({ content, className }: Property) => {
	const { title, subtitle, features, columns = 3, gap = "lg" } = content;
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
	}, [features]);

	const GetIcon = (IconName: string): lucide.LucideIcon | null =>
		FeatureIconRegistry[IconName] || null;

	return (
		<section
			id="features"
			aria-label="Features"
			className={`flex min-h-[100dvh] w-full flex-col justify-center py-16 ${
				className || ""
			}`}>
			<div className="container mx-auto px-4">
				{(title || subtitle) && (
					<div className="StaccatoBreath mb-16 text-center">
						{title && (
							<h2 className="mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl">
								{title}
							</h2>
						)}
						{subtitle && (
							<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
								{subtitle}
							</p>
						)}
					</div>
				)}

				<div
					ref={GridReference}
					className={`StaccatoMorphGap grid ${
						ColumnClass[columns]
					} ${GapClass[gap]} mx-auto max-w-6xl`}>
					{features.map((Feature) => {
						const Icon = GetIcon(Feature.icon);
						const IconLabel =
							FeatureIconLabelMap[Feature.icon] ?? Feature.title;
						const FeatureColor =
							FeatureColorMap[Feature.id] ?? "var(--Primary)";
						return (
							<div
								key={Feature.id}
								className="FeatureCard StaccatoCard StaccatoBorderShimmer flex flex-col space-y-4 rounded-none border border-[var(--Border)] bg-white p-6">
								<div className="flex items-start justify-between">
									<h3 className="text-xl font-semibold">
										{Feature.title}
									</h3>
									{/* Card header icon — wrapped in IconTooltip so hover + screen reader both work */}
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
									{Feature.description}
									{Feature.icons &&
										Feature.icons.length > 0 && (
											<span
												className="inline-flex items-center align-middle"
												role="img"
												aria-label={`${
													Feature.title
												} technology stack`}>
												{Feature.icons.map(
													(IconName, IconIndex) => {
														const StackIcon =
															FeatureIconRegistry[
																IconName
															];
														const StackLabel =
															FeatureIconLabelMap[
																IconName
															] ?? IconName;
														if (!StackIcon)
															return null;
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
																		FeatureColor
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
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export { DynamicFeatures };
export default DynamicFeatures;
