import React from "react";

interface Testimonial {
	id: string;
	quote: string;
	author: string;
	role?: string;
	company?: string;
	avatar?: string; // URL or initials
	rating?: 1 | 2 | 3 | 4 | 5;
}

interface TestimonialsContent {
	title?: string;
	subtitle?: string;
	testimonials: Testimonial[];
	columns?: 1 | 2 | 3 | 4 | 5 | 6;
}

interface DynamicTestimonialsProps {
	content: TestimonialsContent;
	className?: string;
}

/**
 * Dynamic Testimonials component that displays customer quotes
 * Includes avatar, star rating, and quote formatting
 */
export function DynamicTestimonials({
	content,
	className,
}: DynamicTestimonialsProps) {
	const { title, subtitle, testimonials, columns = 3 } = content;

	const columnClasses: Record<number, string> = {
		1: "grid-cols-1 max-w-3xl",
		2: "grid-cols-1 md:grid-cols-2 max-w-5xl",
		3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl",
		4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl",
		5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-7xl",
		6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 max-w-7xl",
	};

	const renderStars = (rating: number = 5) => {
		return Array.from({ length: 5 }).map((_, i) => (
			<span key={i} className="text-yellow-400">
				{i < rating ? "★" : "☆"}
			</span>
		));
	};

	return (
		<section className={`py-20 ${className || ""}`}>
			<div className="container mx-auto px-4">
				{(title || subtitle) && (
					<div className="mb-16 text-center">
						{title && (
							<h2 className="mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl">
								{title}
							</h2>
						)}
						{subtitle && (
							<p className="text-muted-foreground mx-auto max-w-2xl text-lg">
								{subtitle}
							</p>
						)}
					</div>
				)}

				<div className={`grid ${columnClasses[columns]} mx-auto gap-8`}>
					{testimonials.map((testimonial) => (
						<div key={testimonial.id} className="flex flex-col">
							<div className="mb-4">
								{renderStars(testimonial.rating)}
							</div>
							<blockquote className="mb-6 flex-1">
								<p className="text-lg">"{testimonial.quote}"</p>
							</blockquote>
							<div className="flex items-center gap-4">
								{testimonial.avatar ? (
									<img
										src={testimonial.avatar}
										alt=""
										className="border-border size-12 rounded-none border-[3px] object-cover"
										loading="lazy"
									/>
								) : (
									<div className="border-border bg-secondary flex size-12 items-center justify-center rounded-none border-[3px]">
										<span className="text-lg font-semibold">
											{testimonial.author.charAt(0)}
										</span>
									</div>
								)}
								<div>
									<p className="font-semibold">
										{testimonial.author}
									</p>
									{(testimonial.role ||
										testimonial.company) && (
										<p className="text-muted-foreground text-sm">
											{testimonial.role}
											{testimonial.role &&
												testimonial.company &&
												", "}
											{testimonial.company}
										</p>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export type { Testimonial, TestimonialsContent };
