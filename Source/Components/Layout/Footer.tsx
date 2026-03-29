import { Separator } from "../ui/separator";

interface FooterColumn {
	title: string;
	links: Array<{ label: string; href: string }>;
}

interface FooterContent {
	brand?: { name: string; description?: string };
	columns?: FooterColumn[];
	bottomBar?: { madeWith?: boolean; copyright?: string };
}

interface FooterProps {
	content?: FooterContent;
}

export function Footer({ content }: FooterProps) {
	const footerContent = content || {
		brand: {
			name: "Code Editor Land",
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
				title: "Community",
				links: [
					{ label: "About", href: "/about" },
					{ label: "Blog", href: "/blog" },
					{ label: "Contributing", href: "/contributing" },
				],
			},
			{
				title: "Legal",
				links: [
					{ label: "Privacy", href: "/legal/privacy" },
					{ label: "Terms", href: "/legal/terms" },
					{ label: "License", href: "/license" },
				],
			},
		],
		bottomBar: { madeWith: true },
	};

	return (
		<footer className="bg-muted/50 border-t">
			<div className="container mx-auto px-4 py-16">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
					<div className="lg:col-span-2">
						<div className="mb-4 flex items-center space-x-2">
							<div className="bg-primary border-border h-8 w-8 !rounded-none border-[3px]"></div>
							<span className="font-semibold">
								{footerContent.brand?.name || "Land"}
							</span>
						</div>
						{footerContent.brand?.description && (
							<p className="text-muted-foreground mb-6 max-w-md">
								{footerContent.brand.description}
							</p>
						)}
					</div>

					{footerContent.columns?.map((column, colIndex) => (
						<div key={colIndex}>
							<h4 className="mb-4 font-medium">{column.title}</h4>
							<ul className="text-muted-foreground space-y-2 text-sm">
								{column.links.map((link, linkIndex) => (
									<li key={linkIndex}>
										<a
											href={link.href}
											className="hover:text-foreground transition-colors">
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<Separator className="my-8" />

				<div className="flex flex-col items-center justify-between md:flex-row">
					<p className="text-muted-foreground mb-4 text-sm md:mb-0">
						© 2025 {footerContent.brand?.name || "Land"}. All rights
						reserved.
					</p>
					{footerContent.bottomBar?.madeWith && (
						<p className="text-muted-foreground text-sm">
							Built by the Code Editor Land team
						</p>
					)}
				</div>
			</div>
		</footer>
	);
}

export type { FooterContent };
