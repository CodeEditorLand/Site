import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type Property from "./Interface/Property/Feature.js";

/**
 * Dynamic Features with simplex noise integration.
 * Cards get StaccatoCard + Attention scatter for organic layout.
 * Icons pulse with StaccatoIcon rhythm.
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

	const [IconMap, SetIconMap] = useState<Record<string, LucideIcon>>({});

	useEffect(() => {
		import("lucide-react")
			.then((Icon) => {
				SetIconMap(Icon as unknown as Record<string, LucideIcon>);
			})
			.catch((Error) => {
				console.error("Failed to load lucide-react icons:", Error);
			});
	}, []);

	// Apply attention scatter to feature cards on mount
	useEffect(() => {
		const Grid = GridReference.current;
		if (!Grid) return;

		const ReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (ReducedMotion) return;

		const ApplyScatter = async () => {
			const AttentionModule = await import(
				"../../Function/Noise/Attention.js"
			);
			const Attention = await AttentionModule.default;
			const Cards = Grid.querySelectorAll<HTMLElement>(".feature-card");
			Cards.forEach((Card, Index) => {
				Attention.ApplyToElement(Card, Index, 6, 4);
			});

			const StaccatoModule = await import(
				"../../Function/Noise/Staccato.js"
			);
			const Engine = await StaccatoModule.default;
			Engine.SeedSelector(".feature-card");
		};

		ApplyScatter();
	}, [features]);

	const GetIcon = (IconName: string): LucideIcon | null => {
		return IconMap[IconName] || null;
	};

	return (
		<section
			id="features"
			aria-label="Features"
			className={`py-20 ${className || ""}`}>
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
								className="feature-card StaccatoCard StaccatoBorderShimmer bg-white/92 flex flex-col items-start space-y-4 rounded-none border border-[var(--border)] p-6">
								<div
									className="w-fit rounded-none bg-secondary p-3"
									aria-hidden="true">
									{Icon && (
										<Icon
											className="StaccatoIcon h-6 w-6 text-primary"
											aria-hidden="true"
										/>
									)}
								</div>
								<h3 className="text-xl font-semibold">
									{Feature.title}
								</h3>
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
