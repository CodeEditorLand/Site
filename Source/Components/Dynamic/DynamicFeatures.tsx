import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface FeatureItem {
	id: string;
	icon: string;
	title: string;
	description: string;
}

interface FeaturesContent {
	title?: string;
	subtitle?: string;
	features: FeatureItem[];
	columns?: 1 | 2 | 3 | 4 | 5 | 6;
	gap?: "sm" | "md" | "lg" | "xl";
}

interface DynamicFeaturesProps {
	content: FeaturesContent;
	className?: string;
}

/**
 * Dynamic Features component that displays a grid of feature cards
 * Accepts feature items with icons, titles, and descriptions
 */
export function DynamicFeatures({ content, className }: DynamicFeaturesProps) {
	const { title, subtitle, features, columns = 3, gap = "lg" } = content;

	const gapClasses = {
		sm: "gap-4",
		md: "gap-6",
		lg: "gap-8",
		xl: "gap-12",
	};

	const columnClasses: Record<number, string> = {
		1: "grid-cols-1",
		2: "grid-cols-1 md:grid-cols-2",
		3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
		4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
		5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
		6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
	};

	const [iconsMap, setIconsMap] = useState<Record<string, LucideIcon>>({});

	useEffect(() => {
		// Dynamically load all icons from lucide-react
		import("lucide-react")
			.then((icons) => {
				setIconsMap(icons as Record<string, LucideIcon>);
			})
			.catch((error) => {
				console.error("Failed to load lucide-react icons:", error);
			});
	}, []);

	const getIcon = (iconName: string): LucideIcon | null => {
		return iconsMap[iconName] || null;
	};

	return (
		<section
			id="features"
			aria-label="Features"
			className={`py-20 ${className || ""}`}>
			<div className="container mx-auto px-4">
				{(title || subtitle) && (
					<div className="mb-16 text-center">
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
					className={`grid ${columnClasses[columns]} ${gapClasses[gap]} mx-auto max-w-6xl`}>
					{features.map((feature) => {
						const Icon = getIcon(feature.icon);
						return (
							<div
								key={feature.id}
								className="bg-white/92 flex flex-col items-start space-y-4 rounded-none border border-[var(--border)] p-6">
								<div
									className="w-fit rounded-none bg-secondary p-3"
									aria-hidden="true">
									{Icon && (
										<Icon
											className="h-6 w-6 text-primary"
											aria-hidden="true"
										/>
									)}
								</div>
								<h3 className="text-xl font-semibold">
									{feature.title}
								</h3>
								<p className="text-muted-foreground">
									{feature.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export type { FeatureItem, FeaturesContent };
