import { Header } from "../Layout/Header";
import { DynamicFeatures } from "./DynamicFeatures";
import { DynamicHeroSection } from "./DynamicHeroSection";
import { DynamicPlatformGrid } from "./DynamicPlatformGrid";
import { DynamicPricing } from "./DynamicPricing";
import { DynamicTestimonials } from "./DynamicTestimonials";
import type Interface from "./Interface/Content/Page/Home.js";
import type Property from "./Interface/Property/Page/Home.js";

/**
 * Dynamic HomePage composition
 * Assembles Header, Hero, Features, Pricing, Testimonials, Download, Footer
 * All content driven by schema props
 */
export function HomePage({ content, className }: Property) {
	const {
		hero: Hero,
		features: Features,
		pricing: Pricing,
		testimonials: Testimonials,
		download: Download,
		header: HeaderContent,
	} = content;

	return (
		<div className={`flex min-h-screen flex-col ${className || ""}`}>
			<Header content={HeaderContent} />

			<div className="flex-1" role="region" aria-label="Page content">
				<DynamicHeroSection content={Hero} />
				<hr
					className="StaccatoDivider mx-auto max-w-5xl border-t border-[var(--Border)]"
					aria-hidden="true"
				/>
				<DynamicFeatures content={Features} />
				<hr
					className="StaccatoDivider mx-auto max-w-5xl border-t border-[var(--Border)]"
					aria-hidden="true"
				/>
				<DynamicPricing content={Pricing} />
				<hr
					className="StaccatoDivider mx-auto max-w-5xl border-t border-[var(--Border)]"
					aria-hidden="true"
				/>
				<DynamicTestimonials content={Testimonials} />
				<hr
					className="StaccatoDivider mx-auto max-w-5xl border-t border-[var(--Border)]"
					aria-hidden="true"
				/>
				<DynamicPlatformGrid content={Download} />
			</div>
		</div>
	);
}
