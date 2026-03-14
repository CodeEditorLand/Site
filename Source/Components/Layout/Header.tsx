import { Menu } from "lucide-react";

import { Button } from "../ui/button";

interface HeaderContent {
	logo?: { text: string };
	navigation?: Array<{ label: string; href: string }>;
	actions?: Array<{
		type?: string;
		text: string;
		variant?: string;
		size?: string;
		href?: string;
	}>;
}

interface HeaderProps {
	content?: HeaderContent;
}

export function Header({ content }: HeaderProps) {
	const headerContent = content || {
		logo: { text: "Code Editor Land" },
		navigation: [
			{ label: "Features", href: "#features" },
			{ label: "Download", href: "/download" },
			{ label: "Docs", href: "/docs" },
			{ label: "GitHub", href: "https://github.com/CodeEditorLand/Land" },
		],
		actions: [
			{ type: "mobile-menu", text: "Menu" },
			{
				text: "Sign In",
				variant: "ghost",
				size: "default",
				href: "/account/signin",
			},
			{
				text: "Get Started",
				variant: "default",
				size: "default",
				href: "/download",
			},
		],
	};

	return (
		<header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<div className="flex items-center space-x-8">
					<div className="flex items-center space-x-2">
						<div className="bg-primary border-border h-8 w-8 !rounded-none border-[3px]"></div>
						<span className="font-semibold">
							{headerContent.logo?.text || "Land"}
						</span>
					</div>
					<nav className="hidden items-center space-x-6 md:flex">
						{headerContent.navigation?.map((link, index) => (
							<a
								key={index}
								href={link.href}
								className="text-muted-foreground hover:text-foreground transition-colors">
								{link.label}
							</a>
						))}
					</nav>
				</div>
				<div className="flex items-center space-x-4">
					{headerContent.actions?.map((action, index) =>
						action.type === "mobile-menu" ? (
							<Button
								key={index}
								variant="ghost"
								size="icon"
								className="md:hidden">
								<Menu className="h-4 w-4" />
							</Button>
						) : (
							<Button
								key={index}
								variant={(action.variant as any) || "default"}
								size={(action.size as any) || "default"}>
								{action.text}
							</Button>
						),
					)}
				</div>
			</div>
		</header>
	);
}

export type { HeaderContent };
