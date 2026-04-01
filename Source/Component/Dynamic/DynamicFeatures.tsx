import {
	Box,
	Code,
	Cpu,
	Database,
	Globe,
	Heart,
	Layers,
	Package,
	Puzzle,
	Server,
	Shield,
	Sparkles,
	Wrench,
	Zap,
	type LucideIcon,
} from "lucide-react";
import { useEffect, useRef } from "react";

import type Property from "./Interface/Property/Feature.js";

/**
 * Icon registry:direct imports so icons render in initial HTML,
 * not after a dynamic import resolves on the client.
 */
const FeatureIconRegistry: Record<string, LucideIcon> = {
	Zap,
	Box,
	Cpu,
	Globe,
	Wrench,
	Heart,
	Sparkles,
	Code,
	Layers,
	Package,
	Puzzle,
	Server,
	Shield,
	Database,
};

/**
 * Dynamic Features with simplex noise integration.
 * Cards get StaccatoCard + Attention scatter for organic layout.
 * Icons render immediately via direct imports (no dynamic import delay).
 */
export function DynamicFeatures({ content, className }: Property) {
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

	// Apply attention scatter to feature cards on mount
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

	const GetIcon = (IconName: string): LucideIcon | null => {
		return FeatureIconRegistry[IconName] || null;
	};

	return (
		<section
			id="features"
			aria-label="Features"
			className={`flex min-h-[100dvh] w-full flex-col justify-center py-20 ${className || ""}`}>
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
					className={`StaccatoMorphGap grid ${ColumnClass[columns]} ${GapClass[gap]} mx-auto max-w-6xl`}>
					{features.map((Feature) => {
						const Icon = GetIcon(Feature.icon);
						return (
							<div
								key={Feature.id}
								className="FeatureCard StaccatoCard StaccatoBorderShimmer flex flex-col space-y-4 rounded-none border border-[var(--Border)] bg-white p-6">
								<div className="flex items-start justify-between">
									<h3 className="text-xl font-semibold">
										{Feature.title}
									</h3>
									<div
										className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-[var(--Border)] bg-secondary"
										aria-hidden="true">
										{Icon ? (
											<Icon
												className="StaccatoIcon h-5 w-5 text-primary"
												aria-hidden="true"
											/>
										) : (
											<Sparkles
												className="StaccatoIcon h-5 w-5 text-primary"
												aria-hidden="true"
											/>
										)}
									</div>
								</div>
								<p className="StaccatoBreath text-muted-foreground">
									{Feature.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
