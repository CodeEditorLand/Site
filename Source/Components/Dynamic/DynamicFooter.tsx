import React from "react";

interface FooterColumn {
	title: string;
	links: { label: string; href: string }[];
}

interface FooterContent {
	brand: {
		name: string;
		description?: string;
	};
	social?: {
		github?: string;
		twitter?: string;
		discord?: string;
		linkedin?: string;
	};
	columns: FooterColumn[];
	bottomBar?: {
		copyright?: string;
		madeWith?: boolean;
	};
}

interface DynamicFooterProps {
	content: FooterContent;
	className?: string;
}

/**
 * Dynamic Footer component that accepts brand, links, and social schemas
 * Renders multi-column footer with bottom bar
 */
export function DynamicFooter({ content, className }: DynamicFooterProps) {
	const { brand, social, columns, bottomBar } = content;
	const currentYear = new Date().getFullYear();

	const socialIcons: Record<string, { icon: string; href: string }> = {
		github: { icon: "Github", href: social?.github || "#" },
		twitter: { icon: "Twitter", href: social?.twitter || "#" },
		discord: { icon: "MessageCircle", href: social?.discord || "#" },
		linkedin: { icon: "Linkedin", href: social?.linkedin || "#" },
	};

	return (
		<footer className={`bg-muted/50 border-t py-12 ${className || ""}`}>
			<div className="container mx-auto px-4">
				<div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-4">
					{/* Brand Column */}
					<div className="col-span-2 md:col-span-4 lg:col-span-1">
						<h3 className="mb-2 text-lg font-semibold">
							{brand.name}
						</h3>
						{brand.description && (
							<p className="text-muted-foreground mb-4 text-sm">
								{brand.description}
							</p>
						)}
						{social && (
							<div className="flex space-x-4">
								{Object.entries(socialIcons).map(
									([key, { icon, href }]) =>
										href !== "#" && (
											<a
												key={key}
												href={href}
												target="_blank"
												rel="noopener noreferrer"
												className="text-muted-foreground hover:text-foreground transition-colors"
												aria-label={`Follow us on ${key}`}>
												{/* Icon placeholder - would render actual Lucide icon in implementation */}
												<span className="sr-only">
													{key}
												</span>
											</a>
										),
								)}
							</div>
						)}
					</div>

					{/* Dynamic Columns */}
					{columns.map((column, colIndex) => (
						<div key={colIndex}>
							<h4 className="mb-4 font-semibold">
								{column.title}
							</h4>
							<ul className="space-y-2">
								{column.links.map((link, linkIndex) => (
									<li key={linkIndex}>
										<a
											href={link.href}
											className="text-muted-foreground hover:text-foreground text-sm transition-colors">
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom Bar */}
				{bottomBar && (
					<div className="flex flex-col items-center justify-between space-y-4 border-t pt-8 md:flex-row md:space-y-0">
						<div className="text-muted-foreground text-sm">
							{bottomBar.copyright || (
								<>
									© {currentYear} {brand.name}. All rights
									reserved.
								</>
							)}
						</div>
						{bottomBar.madeWith && (
							<div className="text-muted-foreground text-sm">
								Made with ❤️ by {brand.name} Team
							</div>
						)}
					</div>
				)}
			</div>
		</footer>
	);
}

export type { FooterContent, FooterColumn };
