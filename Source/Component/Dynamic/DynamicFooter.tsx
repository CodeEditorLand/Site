import { Github, Linkedin, MessageCircle, type LucideIcon } from "lucide-react";

import type Property from "./Interface/Property/Footer.js";

/**
 * X (Twitter) is not in lucide-react; render an inline SVG mark instead.
 * All other social icons use Lucide.
 * Em quad (U+2001) appears BEFORE each icon in the row, matching the
 * icon-right InlineSeparator convention used across the portal.
 */
const XIcon = ({ className }: { className?: string }) => (
	<svg
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
		className={className}>
		<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
	</svg>
);

type SocialKey = "github" | "twitter" | "discord" | "linkedin";

const SocialIconRegistry: Record<SocialKey, LucideIcon | typeof XIcon> = {
	github: Github,
	twitter: XIcon,
	discord: MessageCircle,
	linkedin: Linkedin,
};

const SocialLabelRegistry: Record<SocialKey, string> = {
	github: "GitHub",
	twitter: "X (Twitter)",
	discord: "Discord",
	linkedin: "LinkedIn",
};

/**
 * Dynamic Footer component that accepts brand, links, and social schemas.
 * Social icons use Lucide (or inline SVG for X) with em quad (U+2001)
 * separator BEFORE each icon. Renders multi-column footer with bottom bar.
 */
const DynamicFooter = ({ content, className }: Property) => {
	const { brand, social, columns, bottomBar } = content;
	const CurrentYear = new Date().getFullYear();

	const SocialLink: Record<SocialKey, string> = {
		github: social?.github || "#",
		twitter: social?.twitter || "#",
		discord: social?.discord || "#",
		linkedin: social?.linkedin || "#",
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
							<div className="flex items-center">
								{(Object.keys(SocialLink) as SocialKey[]).map(
									(Key) => {
										const Href = SocialLink[Key];
										if (Href === "#") return null;
										const Icon = SocialIconRegistry[Key];
										const Label = SocialLabelRegistry[Key];
										return (
											<a
												key={Key}
												href={Href}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center text-muted-foreground transition-colors hover:text-foreground"
												aria-label={Label}>
												{"\u2001"}
												<Icon
													className="h-5 w-5"
													aria-hidden="true"
												/>
											</a>
										);
									},
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
								{brand.name}
								{"\u2001"}
								<span aria-hidden="true">❤️</span>
							</div>
						)}
					</div>
				)}
			</div>
		</footer>
	);
};

export { DynamicFooter };

export default DynamicFooter;
