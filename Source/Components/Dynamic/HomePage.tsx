import React from "react";

import { Header, type HeaderContent } from "../Layout/Header";
import { DynamicFeatures, type FeaturesContent } from "./DynamicFeatures";
import { DynamicHeroSection, type HeroContent } from "./DynamicHeroSection";
import {
	DynamicPlatformGrid,
	type PlatformGridContent,
} from "./DynamicPlatformGrid";
import { DynamicPricing, type PricingContent } from "./DynamicPricing";
import {
	DynamicTestimonials,
	type TestimonialsContent,
} from "./DynamicTestimonials";

interface HomePageContent {
	hero: HeroContent;
	features: FeaturesContent;
	pricing: PricingContent;
	testimonials: TestimonialsContent;
	download: PlatformGridContent;
	header?: HeaderContent;
	footer?: Record<string, unknown>;
}

interface HomePageProps {
	content: HomePageContent;
	metaTitle?: string;
	metaDescription?: string;
	className?: string;
}

/**
 * Dynamic HomePage composition
 * Assembles Header, Hero, Features, Pricing, Testimonials, Download, Footer
 * All content driven by schema props
 */
export function HomePage({ content, className }: HomePageProps) {
	const { hero, features, pricing, testimonials, download, header } = content;

	return (
		<div className={`flex min-h-screen flex-col ${className || ""}`}>
			<Header
				content={
					header || {
						logo: { text: "Land" },
						navigation: [
							{ label: "Features", href: "#features" },
							{ label: "Pricing", href: "#pricing" },
							{ label: "Testimonials", href: "#testimonials" },
							{
								label: "Docs",
								href: "https://github.com/CodeEditorLand/Land#readme",
							},
						],
						actions: [
							{ type: "mobile-menu" as const, text: "Menu" },
							{
								text: "Sign In",
								variant: "ghost",
								size: "default",
								href: "/account/signin",
							},
							{
								text: "Get Land",
								variant: "default",
								size: "default",
								href: "/downloads",
							},
						],
					}
				}
			/>

			<div className="flex-1" role="region" aria-label="Page content">
				<DynamicHeroSection content={hero} />
				<hr
					className="mx-auto max-w-5xl border-t border-[var(--border)]"
					aria-hidden="true"
				/>
				<DynamicFeatures content={features} />
				<hr
					className="mx-auto max-w-5xl border-t border-[var(--border)]"
					aria-hidden="true"
				/>
				<DynamicPricing content={pricing} />
				<hr
					className="mx-auto max-w-5xl border-t border-[var(--border)]"
					aria-hidden="true"
				/>
				<DynamicTestimonials content={testimonials} />
				<hr
					className="mx-auto max-w-5xl border-t border-[var(--border)]"
					aria-hidden="true"
				/>
				<DynamicPlatformGrid content={download} />
			</div>
		</div>
	);
}

export type { HomePageContent };
