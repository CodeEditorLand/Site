import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { DynamicButton } from "./DynamicButton.js";
import type Property from "./Interface/Property/Pricing.js";

/**
 * Dynamic Pricing with simplex noise integration.
 * Tier cards get StaccatoCard scatter. Toggle uses StaccatoToggle.
 * Popular badge pulses with StaccatoRhythm. Price text breathes.
 * Checkmarks use StaccatoCheckmark for organic emphasis.
 * All billing-period labels are i18n-resolved; no hardcoded strings.
 */
const DynamicPricing = ({ content, className }: Property) => {
	const { t: T } = useTranslation("home");
	const GridReference = useRef<HTMLDivElement>(null);
	const {
		title,
		subtitle,
		tiers,
		showMonthlyYearlyToggle = false,
		defaultYearly = false,
		labels = {},
	} = content;

	const MonthlyLabel =
		labels.monthly ??
		T("pricing.labels.monthly", { defaultValue: "Monthly" });
	const YearlyLabel =
		labels.yearly ??
		T("pricing.labels.yearly", { defaultValue: "Yearly" });
	const SavingsLabel =
		labels.savings ??
		T("pricing.labels.savings", { defaultValue: "(Save up to 20%)" });
	const PopularLabel =
		labels.popular ??
		T("pricing.labels.popular", { defaultValue: "Most Popular" });
	const PerMonthLabel =
		labels.perMonth ??
		T("pricing.labels.perMonth", { defaultValue: "/month" });
	const PerYearLabel =
		labels.perYear ??
		T("pricing.labels.perYear", { defaultValue: "/year" });

	const [IsYearly, SetIsYearly] = useState(defaultYearly);

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
			const Cards = Grid.querySelectorAll<HTMLElement>(".PricingCard");
			Cards.forEach((Card, Index) => {
				Attention.ApplyToElement(Card, Index, 4, 3);
			});
		};

		ApplyScatter();
	}, [tiers]);

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
			aria-label="Roadmap"
			className={`flex min-h-[100dvh] w-full flex-col justify-center py-20 ${
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
									? T("pricing.toggle.toMonthly", {
											defaultValue:
												"Switch to {{label}} billing",
											label: MonthlyLabel,
										})
									: T("pricing.toggle.toYearly", {
											defaultValue:
												"Switch to {{label}} billing",
											label: YearlyLabel,
										})
							}
							className={`StaccatoToggle relative inline-flex h-6 w-11 items-center rounded-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
								IsYearly ? "bg-primary" : "bg-input"
							}`}
							onClick={() => SetIsYearly(!IsYearly)}>
							<span
								className={`inline-block h-4 w-4 transform rounded-none bg-white transition-transform ${
									IsYearly ? "translate-x-6" : "translate-x-1"
								}`}
							/>
						</button>
						<span className="text-sm font-medium">
							{YearlyLabel}
						</span>
						{IsYearly && (
							<span className="StaccatoBadge text-sm text-muted-foreground">
								{SavingsLabel}
							</span>
						)}
					</div>
				)}

				<div
					ref={GridReference}
					className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{DisplayTier.map((Tier) => (
						<div
							key={Tier.id}
							className={`PricingCard StaccatoCard StaccatoBorderShimmer flex flex-col rounded-none border bg-white ${
								Tier.highlighted || Tier.popular
									? "border-primary"
									: "border-[var(--Border)]"
							}`}>
							<div className="border-b border-[var(--Border)] p-6">
								{Tier.popular && (
									<div className="mb-2">
										<span className="StaccatoBadge StaccatoRhythmBeat text-xs font-semibold uppercase tracking-wider text-primary">
											{PopularLabel}
										</span>
									</div>
								)}
								<div className="mb-4">
									<DynamicButton
										content={{
											...Tier.cta,
											fullWidth: true,
										}}
									/>
								</div>
								<h3 className="mb-2 text-2xl font-bold">
									{Tier.name}
								</h3>
								{Tier.description && (
									<p className="StaccatoBreath mb-4 text-sm text-muted-foreground">
										{Tier.description}
									</p>
								)}
								<div className="flex items-baseline">
									<span className="StaccatoPrice text-4xl font-bold">
										{Tier.currentPrice === 0
											? T("pricing.labels.free", {
													defaultValue: "Free",
												})
											: FormatPrice(
													Tier.currentPrice,
													Tier.currency,
												)}
									</span>
									{showMonthlyYearlyToggle &&
										Tier.currentPrice > 0 && (
											<span className="ml-2 text-muted-foreground">
												{IsYearly
													? PerYearLabel
													: PerMonthLabel}
											</span>
										)}
								</div>
							</div>

							<div className="flex flex-1 flex-col p-6">
								<ul className="flex-1 space-y-3">
									{Tier.features.map(
										(Feature, FeatureIndex) => (
											<li
												key={FeatureIndex}
												className="flex items-start justify-between gap-2">
												<span className="text-sm">
													{Feature}
												</span>
												<Check
													className="StaccatoCheckmark mt-0.5 h-4 w-4 shrink-0 text-primary"
													aria-hidden="true"
												/>
											</li>
										),
									)}
								</ul>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export { DynamicPricing };

export default DynamicPricing;
