import { Check } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { DynamicButton } from "./DynamicButton";
import type { ButtonContent } from "./types";

interface PricingTier {
	id: string;
	name: string;
	description?: string;
	price: {
		monthly: number;
		yearly: number;
	};
	currency?: string;
	features: string[];
	cta: ButtonContent;
	highlighted?: boolean;
	popular?: boolean;
}

interface PricingLabels {
	monthly?: string;
	yearly?: string;
	savings?: string;
	popular?: string;
	perMonth?: string;
	perYear?: string;
}

interface PricingContent {
	title?: string;
	subtitle?: string;
	tiers: PricingTier[];
	showMonthlyYearlyToggle?: boolean;
	defaultYearly?: boolean;
	labels?: PricingLabels;
}

interface DynamicPricingProps {
	content: PricingContent;
	className?: string;
}

/**
 * Dynamic Pricing component that displays pricing tiers in a grid
 * Supports monthly/yearly toggle and highlighted/plan populaire badges
 */
export function DynamicPricing({ content, className }: DynamicPricingProps) {
	const { t } = useTranslation("home");
	const {
		title,
		subtitle,
		tiers,
		showMonthlyYearlyToggle = false,
		defaultYearly = false,
		labels = {},
	} = content;
	const {
		monthly: monthlyLabel = t("pricing.labels.monthly", {
			defaultValue: "Monthly",
		}),
		yearly: yearlyLabel = t("pricing.labels.yearly", {
			defaultValue: "Yearly",
		}),
		savings: savingsLabel = t("pricing.labels.savings", {
			defaultValue: "(Save up to 20%)",
		}),
		popular: popularLabel = t("pricing.labels.popular", {
			defaultValue: "Most Popular",
		}),
		perMonth: perMonthLabel = t("pricing.labels.perMonth", {
			defaultValue: "/month",
		}),
		perYear: perYearLabel = t("pricing.labels.perYear", {
			defaultValue: "/year",
		}),
	} = labels;
	const [isYearly, setIsYearly] = useState(defaultYearly);

	const formatPrice = (price: number, currency: string = "USD") => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(price);
	};

	const displayTiers = tiers.map((tier) => ({
		...tier,
		currentPrice: isYearly ? tier.price.yearly : tier.price.monthly,
	}));

	return (
		<section
			id="pricing"
			aria-label="Pricing"
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

				{showMonthlyYearlyToggle && (
					<div className="mb-12 flex items-center justify-center gap-4">
						<span className="text-sm font-medium">
							{monthlyLabel}
						</span>
						<button
							type="button"
							role="switch"
							aria-checked={isYearly}
							aria-label={
								isYearly
									? "Switch to monthly billing"
									: "Switch to yearly billing"
							}
							className={`relative inline-flex h-6 w-11 items-center rounded-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${isYearly ? "bg-primary" : "bg-input"}`}
							onClick={() => setIsYearly(!isYearly)}>
							<span
								className={`inline-block h-4 w-4 transform rounded-none bg-white transition-transform ${isYearly ? "translate-x-6" : "translate-x-1"}`}
							/>
						</button>
						<span className="text-sm font-medium">
							{yearlyLabel}
						</span>
						{isYearly && (
							<span className="text-sm text-muted-foreground">
								{savingsLabel}
							</span>
						)}
					</div>
				)}

				<div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					{displayTiers.map((tier) => (
						<div
							key={tier.id}
							className={`bg-white/92 flex flex-col !rounded-none border ${tier.highlighted || tier.popular ? "border-primary" : "border-[var(--border)]"} `}>
							<div className="border-b border-[var(--border)] p-6">
								{tier.popular && (
									<div className="mb-2">
										<span className="text-xs font-semibold uppercase tracking-wider text-primary">
											{popularLabel}
										</span>
									</div>
								)}
								<h3 className="mb-2 text-2xl font-bold">
									{tier.name}
								</h3>
								{tier.description && (
									<p className="mb-4 text-sm text-muted-foreground">
										{tier.description}
									</p>
								)}
								<div className="flex items-baseline">
									<span className="text-4xl font-bold">
										{formatPrice(
											tier.currentPrice,
											tier.currency,
										)}
									</span>
									{showMonthlyYearlyToggle && (
										<span className="ml-2 text-muted-foreground">
											{isYearly
												? perYearLabel
												: perMonthLabel}
										</span>
									)}
								</div>
							</div>

							<div className="flex flex-1 flex-col p-6">
								<ul className="mb-8 flex-1 space-y-3">
									{tier.features.map(
										(feature, featureIndex) => (
											<li
												key={featureIndex}
												className="flex items-start gap-3">
												<Check
													className="mt-0.5 h-5 w-5 shrink-0 text-primary"
													aria-hidden="true"
												/>
												<span className="text-sm">
													{feature}
												</span>
											</li>
										),
									)}
								</ul>
								<DynamicButton content={tier.cta} fullWidth />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export type { PricingTier, PricingContent };
