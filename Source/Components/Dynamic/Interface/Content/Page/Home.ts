import type HeroContent from "../Hero.js";
import type FeaturesContent from "../Feature.js";
import type PricingContent from "../Pricing.js";
import type TestimonialsContent from "../Testimonial.js";
import type PlatformGridContent from "../Grid/Platform.js";
import type { HeaderContent } from "../../../../Layout/Header.js";

export default interface Interface {
	hero: HeroContent;
	features: FeaturesContent;
	pricing: PricingContent;
	testimonials: TestimonialsContent;
	download: PlatformGridContent;
	header?: HeaderContent;
	footer?: Record<string, unknown>;
}
