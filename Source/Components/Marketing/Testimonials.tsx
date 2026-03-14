"use client";

import { Badge } from "@/Components/UI/Badge";
import { Card, CardContent } from "@/Components/UI/Card";
import { Star } from "lucide-react";
import { useTranslation } from "@/Lib/I18n";

/**
 * Testimonials component - Customer quotes and social proof
 *
 * @example
 * ```tsx
 * <Testimonials />
 * ```
 *
 * @remarks
 * - Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop
 * - 6 testimonial cards with avatar, quote, name, role, company
 * - Star ratings (1-5) with filled/empty states
 * - Quote icon (large, decorative)
 * - Avatar fallback to initials
 * - All text from translations
 * - Card border: border-[3px] !rounded-none
 * - Avatar: size-12 rounded-full border-[3px]
 */
export function Testimonials() {
	const { t } = useTranslation(["home"]);

	const testimonials = [
		{
			quoteKey: "home.testimonials.quote.1",
			name: "Sarah Chen",
			role: "Lead Designer",
			company: "TechCorp Inc.",
			rating: 5,
		},
		{
			quoteKey: "home.testimonials.quote.2",
			name: "Marcus Johnson",
			role: "Frontend Developer",
			company: "StartupXYZ",
			rating: 5,
		},
		{
			quoteKey: "home.testimonials.quote.3",
			name: "Elena Rodriguez",
			role: "Product Manager",
			company: "InnovateLab",
			rating: 5,
		},
		{
			quoteKey: "home.testimonials.quote.4",
			name: "David Kim",
			role: "Engineering Lead",
			company: "CloudScale",
			rating: 5,
		},
		{
			quoteKey: "home.testimonials.quote.5",
			name: "Amanda Foster",
			role: "UX Designer",
			company: "DesignStudio",
			rating: 4,
		},
		{
			quoteKey: "home.testimonials.quote.6",
			name: "James Miller",
			role: "CTO",
			company: "TechStart",
			rating: 5,
		},
	];

	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<Badge variant="secondary">{t("home.testimonials.badge", "Testimonials")}</Badge>
					<h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
						{t("home.testimonials.title", "Loved by teams worldwide")}
					</h2>
					<p className="text-lg text-muted-foreground">
						{t("home.testimonials.subtitle", "See what our customers have to say about Code Editor Land.")}
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{testimonials.map((testimonial, index) => (
						<Card key={index} className="border-[3px] !rounded-none">
							<CardContent className="pt-6">
								<div className="text-6xl text-primary/20 font-serif mb-4">
									"
								</div>
								<p className="text-muted-foreground mb-6 italic">
									"{t(testimonial.quoteKey)}"
								</p>
								<div className="flex items-center gap-4">
									<div className="size-12 bg-secondary border-[3px] border-border flex items-center justify-center">
										<span className="text-lg font-semibold">
											{testimonial.name.charAt(0)}
										</span>
									</div>
									<div className="flex-1">
										<p className="font-semibold">{testimonial.name}</p>
										<p className="text-sm text-muted-foreground">
											{testimonial.role}, {testimonial.company}
										</p>
									</div>
									{testimonial.rating && (
										<div className="flex gap-1" aria-hidden="true">
											{Array.from({ length: 5 }).map((_, i) => (
												<Star
													key={i}
													className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-muted-foreground"}`}
												/>
											))}
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
