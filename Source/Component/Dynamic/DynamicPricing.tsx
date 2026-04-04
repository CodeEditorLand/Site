import * as lucide from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { IconTooltip } from "../UI/IconTooltip.js";
import { RichText } from "../UI/RichText.js";
import { DynamicButton } from "./DynamicButton.js";
import type Property from "./Interface/Property/Pricing.js";

/**
 * Dynamic Pricing with simplex noise integration.
 * Tier cards get StaccatoCard scatter. Toggle uses StaccatoToggle.
 * Popular badge pulses with StaccatoRhythm. Price text breathes.
 * Checkmarks use StaccatoCheckmark for organic emphasis.
 * All billing-period labels are i18n-resolved; no hardcoded strings.
 */
const DynamicPricing = ({ Content, ClassName }: Property) => {
	const { t: T } = useTranslation("home");
	const GridReference = useRef<HTMLDivElement>(null);
	const {
		Title,
		Subtitle,
		Tiers,
		ShowMonthlyYearlyToggle = false,
		DefaultYearly = false,
		Labels = {},
	} = Content;

	const MonthlyLabel =
		Labels.Monthly ??
		T("pricing.labels.monthly", { defaultValue: "Monthly" });
	const YearlyLabel =
		Labels.Yearly ?? T("pricing.labels.yearly", { defaultValue: "Yearly" });
	const SavingsLabel =
		Labels.Savings ??
		T("pricing.labels.savings", { defaultValue: "(Save up to 20%)" });
	const PopularLabel =
		Labels.Popular ??
		T("pricing.labels.popular", { defaultValue: "Most Popular" });
	const PerMonthLabel =
		Labels.PerMonth ??
		T("pricing.labels.perMonth", { defaultValue: "/month" });
	const PerYearLabel =
		Labels.PerYear ??
		T("pricing.labels.perYear", { defaultValue: "/year" });

	const [IsYearly, SetIsYearly] = useState(DefaultYearly);

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
	}, [Tiers]);

	const FormatPrice = (Price: number, Currency: string = "USD") => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: Currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(Price);
	};

	const DisplayTier = Tiers.map((Tier) => ({
		...Tier,
		currentPrice: IsYearly ? Tier.Price.Yearly : Tier.Price.Monthly,
	}));

	return (
		<section
			id="pricing"
			aria-labelledby="PricingHeading"
			className={`flex min-h-[100dvh] w-full flex-col justify-center py-16 ${
				ClassName || ""
			}`}>
			<div className="container mx-auto px-4">
				{(Title || Subtitle) && (
					<div className="StaccatoBreath mb-16 text-center">
						{Title && (
							<h2
								id="PricingHeading"
								className="mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl">
								{Title}
							</h2>
						)}
						{Subtitle && (
							<div className="mx-auto max-w-2xl text-lg text-muted-foreground">
								<RichText Text={Subtitle} />
							</div>
						)}
					</div>
				)}

				{ShowMonthlyYearlyToggle && (
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
							tabIndex={0}
							onKeyDown={(Event) => {
								if (
									Event.key === " " ||
									Event.key === "Enter"
								) {
									Event.preventDefault();
									SetIsYearly(!IsYearly);
								}
							}}
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
							key={Tier.Id}
							className={`PricingCard StaccatoCard StaccatoBorderShimmer flex flex-col rounded-none border bg-white ${
								Tier.Highlighted || Tier.Popular
									? "border-primary"
									: "border-[var(--Border)]"
							}`}>
							<div className="border-b border-[var(--Border)] p-6">
								{Tier.Popular && (
									<div className="mb-2">
										<span className="StaccatoBadge StaccatoRhythmBeat text-xs font-semibold uppercase tracking-wider text-primary">
											{PopularLabel}
										</span>
									</div>
								)}
								<div className="mb-4">
									<DynamicButton
										Content={{
											...Tier.CTA,
											FullWidth: true,
										}}
									/>
								</div>
								<h3 className="mb-2 text-2xl font-bold">
									{Tier.Name}
								</h3>
								{Tier.Description && (
									<div className="StaccatoBreath mb-4 text-sm text-muted-foreground">
										<RichText Text={Tier.Description} />
									</div>
								)}
								<div className="flex items-baseline">
									<span className="StaccatoPrice text-4xl font-bold">
										{Tier.currentPrice === 0
											? T("pricing.labels.free", {
													defaultValue: "Free",
												})
											: FormatPrice(
													Tier.currentPrice,
													Tier.Currency,
												)}
									</span>
									{ShowMonthlyYearlyToggle &&
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
								<ul
									className={`flex-1 ${
										Tier.Features.length > 8
											? "grid grid-cols-2 gap-x-4 gap-y-3"
											: "space-y-3"
									}`}>
									{Tier.Features.map(
										(Feature, FeatureIndex) => {
											const NewlineIndex =
												Feature.indexOf("\n");
											const HasSplit =
												NewlineIndex !== -1;
											const Name = HasSplit
												? Feature.slice(
														0,
														NewlineIndex,
													)
												: Feature;
											const Desc = HasSplit
												? Feature.slice(
														NewlineIndex + 1,
													)
												: null;

											return (
												<li
													key={FeatureIndex}
													className="flex items-start justify-between gap-2">
													<span className="min-w-0 flex-1">
														<span className="block text-sm font-medium">
															{Name}
														</span>
														{Desc && (
															<span className="block text-xs text-muted-foreground">
																{Desc}
															</span>
														)}
													</span>
													<IconTooltip
														Label="Included"
														Icon={lucide.Check}
														SizeClass="h-4 w-4 shrink-0"
														ClassName="StaccatoCheckmark mt-0.5 text-primary"
													/>
												</li>
											);
										},
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
