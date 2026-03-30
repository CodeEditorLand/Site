import { Menu } from "lucide-react";
import React from "react";

import { Button } from "../UI/button";
import type DynamicButtonProps from "./Interface/Property/Button.js";
import type Property from "./Interface/Property/Header.js";

/**
 * Dynamic Header component that accepts navigation and action schemas
 * Renders sticky header with logo, nav links, and CTA buttons
 */
export function DynamicHeader({ content, className }: Property) {
	const {
		logo,
		navigation,
		actions,
		sticky = true,
		showMobileMenu = true,
	} = content;
	const [MobileMenuOpen, SetMobileMenuOpen] = React.useState(false);

	return (
		<header
			className={` ${sticky ? "sticky top-0 z-50" : ""} w-full border-b bg-white/95 ${className || ""} `}>
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				{/* Logo */}
				<div className="flex items-center space-x-2">
					<div
						className="relative flex h-8 w-8 items-center justify-center overflow-hidden"
						aria-hidden="true">
						<img
							src="/Asset/Logo/Glyph/LandDark.svg"
							alt=""
							className="h-full w-full"
						/>
					</div>
					<span className="font-semibold">{logo.text}</span>
				</div>

				{/* Desktop Navigation */}
				<nav
					className="hidden items-center space-x-6 md:flex"
					aria-label="Main navigation">
					{navigation.map((Link, Index) => (
						<a
							key={Index}
							href={Link.href}
							className={`transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-[var(--primary)] ${
								Link.isActive
									? "font-medium text-foreground"
									: "text-muted-foreground hover:text-foreground"
							}`}
							{...(Link.isActive
								? { "aria-current": "page" as const }
								: {})}>
							{Link.label}
						</a>
					))}
				</nav>

				{/* Actions */}
				<div className="flex items-center space-x-4">
					{actions.map((Action, Index) => {
						if (Action.type === "mobile-menu" && showMobileMenu) {
							return (
								<Button
									key={Index}
									variant="ghost"
									size="icon"
									className="md:hidden"
									onClick={() =>
										SetMobileMenuOpen(!MobileMenuOpen)
									}
									aria-label="Toggle menu"
									aria-expanded={MobileMenuOpen}>
									<Menu className="h-4 w-4" />
								</Button>
							);
						}

						// Action is a button config
						const ButtonProperties = Action as DynamicButtonProps;
						return (
							<React.Fragment key={Index}>
								{MobileMenuOpen && showMobileMenu && (
									<div className="absolute left-0 right-0 top-16 z-50 flex flex-col space-y-2 border-b bg-background p-4 md:hidden">
										{navigation.map((Link, NavigationIndex) => (
											<a
												key={NavigationIndex}
												href={Link.href}
												className="rounded-none px-4 py-2 hover:bg-accent"
												onClick={() =>
													SetMobileMenuOpen(false)
												}>
												{Link.label}
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
