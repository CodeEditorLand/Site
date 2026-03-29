"use client";

import { Badge } from "@/Components/UI/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/UI/Card";
import {
	Palette,
	Boxes,
	BookOpen,
	GitBranch,
	Users,
	Cpu,
} from "lucide-react";
import { useTranslation } from "@/Lib/I18n";

/**
 * Features component - Grid showcasing key product capabilities
 *
 * @example
 * ```tsx
 * <Features />
 * ```
 *
 * @remarks
 * - Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop
 * - 6 feature cards with icons and descriptions
 * - Card border: border-[3px] !rounded-none
 * - Icon containers with secondary background
 * - All text from translations
 */
export function Features() {
	const { t } = useTranslation(["home"]);

	const features = [
		{
			icon: Palette,
			titleKey: "home.features.item.designTokens.title",
			descriptionKey: "home.features.item.designTokens.description",
		},
		{
			icon: Boxes,
			titleKey: "home.features.item.componentLibrary.title",
			descriptionKey: "home.features.item.componentLibrary.description",
		},
		{
			icon: BookOpen,
			titleKey: "home.features.item.documentation.title",
			descriptionKey: "home.features.item.documentation.description",
		},
		{
			icon: GitBranch,
			titleKey: "home.features.item.versionControl.title",
			descriptionKey: "home.features.item.versionControl.description",
		},
		{
			icon: Users,
			titleKey: "home.features.item.collaboration.title",
			descriptionKey: "home.features.item.collaboration.description",
		},
		{
			icon: Cpu,
			titleKey: "home.features.item.cicdIntegration.title",
			descriptionKey: "home.features.item.cicdIntegration.description",
		},
	];

	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<Badge variant="secondary">{t("home.features.badge", "Features")}</Badge>
					<h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
						{t("home.features.title", "Everything you need to scale")}
					</h2>
					<p className="text-lg text-muted-foreground">
						{t("home.features.subtitle", "A comprehensive platform for building, managing, and scaling design systems.")}
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{features.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<Card key={index} className="border-[3px] !rounded-none">
								<CardHeader>
									<div className="mb-4 p-3 bg-secondary w-fit rounded-none">
										<Icon className="h-6 w-6 text-primary" />
									</div>
									<CardTitle className="text-xl">{t(feature.titleKey)}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">{t(feature.descriptionKey)}</p>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
