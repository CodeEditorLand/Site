import React from "react";

import { Footer } from "../Layout/Footer";
import { Header } from "../Layout/Header";
import { DynamicFeatures } from "./DynamicFeatures";
import { DynamicHeroSection } from "./DynamicHeroSection";
import { DynamicPlatformGrid } from "./DynamicPlatformGrid";
import { DynamicPricing } from "./DynamicPricing";
import { DynamicTestimonials } from "./DynamicTestimonials";
import type { FeaturesContent } from "./DynamicFeatures";
import type { HeroContent } from "./DynamicHeroSection";
import type { PlatformGridContent } from "./DynamicPlatformGrid";
import type { PricingContent } from "./DynamicPricing";
import type { TestimonialsContent } from "./DynamicTestimonials";
import type { HeaderContent } from "../Layout/Header";
import type { FooterContent } from "../Layout/Footer";

interface HomePageContent {
	hero: HeroContent;
	features: FeaturesContent;
	pricing: PricingContent;
	testimonials: TestimonialsContent;
	download: PlatformGridContent;
	header?: HeaderContent;
	footer?: FooterContent;
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
	const { hero, features, pricing, testimonials, download, header, footer } =
		content;

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
							{ label: "Docs", href: "/docs" },
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
								href: "/download",
							},
						],
					}
				}
			/>

			<main className="flex-1">
				<DynamicHeroSection content={hero} />
				<DynamicFeatures content={features} />
				<DynamicPricing content={pricing} />
				<DynamicTestimonials content={testimonials} />
				<DynamicPlatformGrid content={download} />
			</main>

			<Footer
				content={
					footer || {
						brand: {
							name: "Land",
							description:
								"The next-generation code editor for modern developers.",
						},
						columns: [
							{
								title: "Product",
								links: [
									{ label: "Features", href: "#features" },
									{ label: "Pricing", href: "#pricing" },
									{ label: "Downloads", href: "/downloads" },
								],
							},
							{
								title: "Company",
								links: [
									{ label: "About", href: "/about" },
									{ label: "Blog", href: "/blog" },
									{ label: "Careers", href: "/careers" },
								],
							},
							{
								title: "Legal",
								links: [
									{
										label: "Privacy",
										href: "/legal/privacy",
									},
									{ label: "Terms", href: "/legal/terms" },
									{
										label: "Cookies",
										href: "/legal/cookies",
									},
								],
							},
						],
						bottomBar: { madeWith: true },
					}
				}
			/>
		</div>
	);
}

export type { HomePageContent };
