import type Property from "./Interface/Property/Footer.js";

/**
 * Dynamic Footer component that accepts brand, links, and social schemas
 * Renders multi-column footer with bottom bar
 */
export function DynamicFooter({ content, className }: Property) {
	const { brand, social, columns, bottomBar } = content;
	const CurrentYear = new Date().getFullYear();

	const SocialIcon: Record<string, { icon: string; href: string }> = {
		github: { icon: "GitFork", href: social?.github || "#" },
		twitter: { icon: "Send", href: social?.twitter || "#" },
		discord: { icon: "MessageCircle", href: social?.discord || "#" },
		linkedin: { icon: "ExternalLink", href: social?.linkedin || "#" },
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
							<p className="mb-4 text-sm text-muted-foreground">
								{brand.description}
							</p>
						)}
						{social && (
							<div className="flex space-x-4">
								{Object.entries(SocialIcon).map(
									([Key, { href: Href }]) =>
										Href !== "#" && (
											<a
												key={Key}
												href={Href}
												target="_blank"
												rel="noopener noreferrer"
												className="text-muted-foreground transition-colors hover:text-foreground"
												aria-label={`Follow us on ${Key}`}>
												{/* Icon placeholder - would render actual Lucide icon in implementation */}
												<span className="sr-only">
													{Key}
												</span>
											</a>
										),
								)}
							</div>
						)}
					</div>

					{/* Dynamic Columns */}
					{columns.map((Column, ColumnIndex) => (
						<div key={ColumnIndex}>
							<h4 className="mb-4 font-semibold">
								{Column.title}
							</h4>
							<ul className="space-y-2">
								{Column.links.map((Link, LinkIndex) => (
									<li key={LinkIndex}>
										<a
											href={Link.href}
											className="text-sm text-muted-foreground transition-colors hover:text-foreground">
											{Link.label}
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
						<div className="text-sm text-muted-foreground">
							{bottomBar.copyright || (
								<>
									© {CurrentYear} {brand.name}. All rights
									reserved.
								</>
							)}
						</div>
						{bottomBar.madeWith && (
							<div className="text-sm text-muted-foreground">
								Made by {brand.name} Team{"\u2001"}❤️
							</div>
						)}
					</div>
				)}
			</div>
		</footer>
	);
}
