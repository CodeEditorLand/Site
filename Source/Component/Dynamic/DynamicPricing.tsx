import { Check } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { DynamicButton } from "./DynamicButton";
import type Property from "./Interface/Property/Pricing.js";

/**
 * Dynamic Pricing component that displays pricing tiers in a grid
 * Supports monthly/yearly toggle and highlighted/plan populaire badges
 */
export function DynamicPricing({ content, className }: Property) {
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
		monthly: MonthlyLabel = t("pricing.labels.monthly", {
			defaultValue: "Monthly",
		}),
		yearly: YearlyLabel = t("pricing.labels.yearly", {
			defaultValue: "Yearly",
		}),
		savings: SavingsLabel = t("pricing.labels.savings", {
			defaultValue: "(Save up to 20%)",
		}),
		popular: PopularLabel = t("pricing.labels.popular", {
			defaultValue: "Most Popular",
		}),
		perMonth: PerMonthLabel = t("pricing.labels.perMonth", {
			defaultValue: "/month",
		}),
		perYear: PerYearLabel = t("pricing.labels.perYear", {
			defaultValue: "/year",
		}),
	} = labels;
	const [IsYearly, SetIsYearly] = useState(defaultYearly);

	const FormatPrice = (Price: number, Currency: string = "USD") => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: Currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(Price);
	};

	const DisplayTier = tiers.map((Tier) => ({
		...Tier,
		currentPrice: IsYearly ? Tier.price.yearly : Tier.price.monthly,
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
							{MonthlyLabel}
						</span>
						<button
							type="button"
							role="switch"
							aria-checked={IsYearly}
							aria-label={
								IsYearly
									? "Switch to monthly billing"
									: "Switch to yearly billing"
							}
							className={`relative inline-flex h-6 w-11 items-center rounded-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${IsYearly ? "bg-primary" : "bg-input"}`}
							onClick={() => SetIsYearly(!IsYearly)}>
							<span
								className={`inline-block h-4 w-4 transform rounded-none bg-white transition-transform ${IsYearly ? "translate-x-6" : "translate-x-1"}`}
							/>
						</button>
						<span className="text-sm font-medium">
							{YearlyLabel}
						</span>
						{IsYearly && (
							<span className="text-sm text-muted-foreground">
								{SavingsLabel}
							</span>
						)}
					</div>
				)}

				<div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					{DisplayTier.map((Tier) => (
						<div
							key={Tier.id}
							className={`bg-white/92 flex flex-col rounded-none border ${Tier.highlighted || Tier.popular ? "border-primary" : "border-[var(--border)]"} `}>
							<div className="border-b border-[var(--border)] p-6">
								{Tier.popular && (
									<div className="mb-2">
										<span className="text-xs font-semibold uppercase tracking-wider text-primary">
											{PopularLabel}
										</span>
									</div>
								)}
								<h3 className="mb-2 text-2xl font-bold">
									{Tier.name}
								</h3>
								{Tier.description && (
									<p className="mb-4 text-sm text-muted-foreground">
										{Tier.description}
									</p>
								)}
								<div className="flex items-baseline">
									<span className="text-4xl font-bold">
										{FormatPrice(
											Tier.currentPrice,
											Tier.currency,
										)}
									</span>
									{showMonthlyYearlyToggle && (
										<span className="ml-2 text-muted-foreground">
											{IsYearly
												? PerYearLabel
												: PerMonthLabel}
										</span>
									)}
								</div>
							</div>

							<div className="flex flex-1 flex-col p-6">
								<ul className="mb-8 flex-1 space-y-3">
									{Tier.features.map(
										(Feature, FeatureIndex) => (
											<li
												key={FeatureIndex}
												className="flex items-start gap-3">
												<Check
													className="mt-0.5 h-5 w-5 shrink-0 text-primary"
													aria-hidden="true"
												/>
												<span className="text-sm">
													{Feature}
												</span>
											</li>
										),
									)}
								</ul>
								<DynamicButton content={Tier.cta} fullWidth />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
