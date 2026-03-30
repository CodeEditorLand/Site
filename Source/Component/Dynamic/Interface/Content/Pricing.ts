import type PricingTier from "../Tier/Pricing.js";
import type PricingLabels from "../Label/Pricing.js";

export default interface Interface {
	title?: string;
	subtitle?: string;
	tiers: PricingTier[];
	showMonthlyYearlyToggle?: boolean;
	defaultYearly?: boolean;
	labels?: PricingLabels;
}
