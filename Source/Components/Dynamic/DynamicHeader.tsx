import { Menu } from "lucide-react";
import React from "react";

import { Button } from "../ui/button";
import type { DynamicButtonProps } from "./DynamicButton";

interface NavLink {
	label: string;
	href: string;
	isActive?: boolean;
}

interface HeaderContent {
	logo: {
		text: string;
		icon?: string;
	};
	navigation: NavLink[];
	actions: (DynamicButtonProps | { type: "mobile-menu" })[];
	sticky?: boolean;
	showMobileMenu?: boolean;
}

interface DynamicHeaderProps {
	content: HeaderContent;
	className?: string;
}

/**
 * Dynamic Header component that accepts navigation and action schemas
 * Renders sticky header with logo, nav links, and CTA buttons
 */
export function DynamicHeader({ content, className }: DynamicHeaderProps) {
	const {
		logo,
		navigation,
		actions,
		sticky = true,
		showMobileMenu = true,
	} = content;
	const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

	return (
		<header
			className={` ${sticky ? "sticky top-0 z-50" : ""} bg-background/95 supports-[backdrop-filter]:bg-background/60 w-full border-b backdrop-blur ${className || ""} `}>
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				{/* Logo */}
				<div className="flex items-center space-x-2">
					{logo.icon && (
						<div className="bg-primary border-border h-8 w-8 !rounded-none border-[3px]"></div>
					)}
					<span className="font-semibold">{logo.text}</span>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden items-center space-x-6 md:flex">
					{navigation.map((link, index) => (
						<a
							key={index}
							href={link.href}
							className={`transition-colors ${
								link.isActive
									? "text-foreground font-medium"
									: "text-muted-foreground hover:text-foreground"
							}`}>
							{link.label}
						</a>
					))}
				</nav>

				{/* Actions */}
				<div className="flex items-center space-x-4">
					{actions.map((action, index) => {
						if (action.type === "mobile-menu" && showMobileMenu) {
							return (
								<Button
									key={index}
									variant="ghost"
									size="icon"
									className="md:hidden"
									onClick={() =>
										setMobileMenuOpen(!mobileMenuOpen)
									}>
									<Menu className="h-4 w-4" />
								</Button>
							);
						}

						// Action is a button config
						const buttonProps = action as DynamicButtonProps;
						return (
							<React.Fragment key={index}>
								{mobileMenuOpen && showMobileMenu && (
									<div className="bg-background absolute left-0 right-0 top-16 z-50 flex flex-col space-y-2 border-b p-4 md:hidden">
										{navigation.map((link, navIndex) => (
											<a
												key={navIndex}
												href={link.href}
												className="hover:bg-accent rounded-none px-4 py-2"
												onClick={() =>
													setMobileMenuOpen(false)
												}>
												{link.label}
											</a>
										))}
									</div>
								)}
							</React.Fragment>
						);
					})}
				</div>
			</div>
		</header>
	);
}

export type { HeaderContent, NavLink };
