import type { HeaderContent } from "../../../../Layout/Header.js";

import type FeaturesContent from "../Feature.js";

import type PlatformGridContent from "../Grid/Platform.js";

import type HeroContent from "../Hero.js";

import type PricingContent from "../Pricing.js";

import type TestimonialsContent from "../Testimonial.js";

export default interface Interface {
	Hero: HeroContent;

	Features: FeaturesContent;

	Pricing: PricingContent;

	Testimonials: TestimonialsContent;

	Download: PlatformGridContent;

	Header?: HeaderContent;

	Footer?: Record<string, unknown>;
}
