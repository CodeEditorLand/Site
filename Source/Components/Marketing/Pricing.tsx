"use client";

import { Badge } from "@/Components/UI/Badge";
import { Button } from "@/Components/UI/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/UI/Card";
import { Check } from "lucide-react";
import { useTranslation } from "@/Lib/I18n";

/**
 * Pricing component - Pricing tiers comparison table
 *
 * @example
 * ```tsx
 * <Pricing />
 * ```
 *
 * @remarks
 * - 4 pricing tiers: Free (Community), Pro, Team, Enterprise
 * - Responsive grid: 1 col mobile, 2 col tablet, 4 col desktop
 * - "Pro" tier highlighted with border-primary, shadow-xl, scale-105
 * - "Most Popular" badge on recommended tier
 * - Feature lists with Check icons
 * - All text from translations
 * - Button variants: default for pro, outline for others
 */
export function Pricing() {
	const { t } = useTranslation(["pricing"]);

	const tiers = [
		{
			nameKey: "pricing.tiers.free.name",
			descriptionKey: "pricing.tiers.free.description",
			price: "$0",
			period: "month",
			features: [
				"pricing.tiers.free.features.1",
				"pricing.tiers.free.features.2",
				"pricing.tiers.free.features.3",
				"pricing.tiers.free.features.4",
				"pricing.tiers.free.features.5",
				"pricing.tiers.free.features.6",
				"pricing.tiers.free.features.7",
			],
			buttonTextKey: "pricing.tiers.free.button",
			buttonVariant: "outline" as const,
			recommended: false,
			buttonHref: "/account/signup?plan=free",
		},
		{
			nameKey: "pricing.tiers.pro.name",
			descriptionKey: "pricing.tiers.pro.description",
			price: "$19",
			period: "month",
			features: [
				"pricing.tiers.pro.features.1",
				"pricing.tiers.pro.features.2",
				"pricing.tiers.pro.features.3",
				"pricing.tiers.pro.features.4",
				"pricing.tiers.pro.features.5",
			],
			buttonTextKey: "pricing.tiers.pro.button",
			buttonVariant: "default" as const,
			recommended: true,
			buttonHref: "/account/signup?plan=pro",
		},
		{
			nameKey: "pricing.tiers.team.name",
			descriptionKey: "pricing.tiers.team.description",
			price: "$49",
			period: "month",
			features: [
				"pricing.tiers.team.features.1",
				"pricing.tiers.team.features.2",
				"pricing.tiers.team.features.3",
				"pricing.tiers.team.features.4",
			],
			buttonTextKey: "pricing.tiers.team.button",
			buttonVariant: "outline" as const,
			recommended: false,
			buttonHref: "/account/signup?plan=team",
		},
		{
			nameKey: "pricing.tiers.enterprise.name",
			descriptionKey: "pricing.tiers.enterprise.description",
			price: "Custom",
			period: "",
			features: [
				"pricing.tiers.enterprise.features.1",
				"pricing.tiers.enterprise.features.2",
				"pricing.tiers.enterprise.features.3",
				"pricing.tiers.enterprise.features.4",
			],
			buttonTextKey: "pricing.tiers.enterprise.button",
			buttonVariant: "outline" as const,
			recommended: false,
			buttonHref: "/contact/sales",
		},
	];

	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<Badge variant="secondary">{t("pricing.badge", "Pricing")}</Badge>
					<h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
						{t("pricing.title", "Simple, transparent pricing")}
					</h2>
					<p className="text-lg text-muted-foreground">
						{t("pricing.subtitle", "Choose the plan that fits your needs. All plans include a 14-day free trial.")}
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
					{tiers.map((tier, index) => (
						<Card
							key={index}
							className={`flex flex-col border-[3px] !rounded-none relative ${tier.recommended ? "border-primary shadow-xl scale-105" : ""}`}
						>
							{tier.recommended && (
								<Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
									{t("pricing.tiers.pro.badge", "Most Popular")}
								</Badge>
							)}
							<CardHeader className="text-center">
								<CardTitle className="text-xl">{t(tier.nameKey)}</CardTitle>
								<CardDescription>{t(tier.descriptionKey)}</CardDescription>
							</CardHeader>
							<CardContent className="flex-1 flex flex-col">
								<div className="text-center mb-6">
									<span className="text-4xl font-bold">{tier.price}</span>
									{tier.period && <span className="text-muted-foreground">/{tier.period}</span>}
								</div>
								<ul className="space-y-3 mb-6 flex-1">
									{tier.features.map((featureKey, i) => (
										<li key={i} className="flex items-start gap-2">
											<Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
											<span className="text-sm">{t(featureKey)}</span>
										</li>
									))}
								</ul>
							</CardContent>
							<CardFooter>
								<Button className="w-full" variant={tier.buttonVariant} asChild>
									<a href={tier.buttonHref}>{t(tier.buttonTextKey)}</a>
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
