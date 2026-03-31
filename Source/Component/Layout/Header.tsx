"use client";

import {
	BookOpen,
	Download,
	ExternalLink,
	GitFork,
	HelpCircle,
	LayoutDashboard,
	LogIn,
	Menu,
	Monitor,
	Newspaper,
	Sparkles,
	Users,
	X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "../UI/Button";
import { LocaleSwitcher } from "./LocaleSwitcher";

import "../Layout/Header/Stylesheet.css";

/**
 * Icon registry:maps string keys to Lucide components.
 * Used by both sub-header and mobile menu.
 */
const IconRegistry: Record<string, LucideIcon> = {
	Sparkles,
	Download,
	BookOpen,
	GitFork,
	ExternalLink,
	Newspaper,
	Users,
	LayoutDashboard,
	HelpCircle,
	LogIn,
	Monitor,
};

interface NavigationLink {
	label: string;
	href: string;
	icon?: string;
}

interface HeaderContent {
	logo?: { text: string };
	navigation?: NavigationLink[];
	actions?: Array<{
		type?: string;
		text: string;
		variant?: string;
		size?: string;
		href?: string;
		icon?: string;
	}>;
}

interface HeaderProps {
	content?: HeaderContent;
}

export function Header({ content }: HeaderProps) {
	const { t: T } = useTranslation("header");
	const [MobileMenuOpen, SetMobileMenuOpen] = useState(false);

	const HeaderData: HeaderContent = content || {
		logo: { text: T("logo", "Land") },
		navigation: [
			{
				label: T("nav.features", "Features"),
				href: "/#features",
				icon: "Sparkles",
			},
			{
				label: T("nav.download", "Download"),
				href: "/downloads",
				icon: "Download",
			},
			{
				label: T("nav.docs", "Docs"),
				href: "/docs",
				icon: "BookOpen",
			},
			{
				label: T("nav.blog", "Blog"),
				href: "/blog",
				icon: "Newspaper",
			},
			{
				label: T("nav.contributing", "Contributing"),
				href: "/contributing",
				icon: "Users",
			},
			{
				label: T("nav.dashboard", "Dashboard"),
				href: "/dashboard",
				icon: "LayoutDashboard",
			},
			{
				label: T("nav.github", "GitHub"),
				href: "https://github.com/CodeEditorLand/Land",
				icon: "GitFork",
			},
		],
		actions: [
			{
				text: T("actions.signIn", "Sign In"),
				variant: "ghost",
				size: "default",
				href: "/account/signin",
				icon: "LogIn",
			},
			{
				text: T("actions.editorPortal", "Editor Portal"),
				variant: "outline",
				size: "default",
				href: "/portal",
				icon: "Monitor",
			},
			{
				text: T("actions.getStarted", "Get Land"),
				variant: "default",
				size: "default",
				href: "/downloads",
				icon: "Download",
			},
		],
	};

	const RenderIcon = (IconName?: string) => {
		if (!IconName) return null;
		const Icon = IconRegistry[IconName];
		if (!Icon) return null;
		return (
			<>
				{"\u2001"}
				<Icon className="StaccatoIcon h-3.5 w-3.5" aria-hidden="true" />
			</>
		);
	};

	const RenderActionIcon = (IconName?: string) => {
		if (!IconName) return null;
		const Icon = IconRegistry[IconName];
		if (!Icon) return null;
		return (
			<>
				{"\u2001"}
				<Icon className="h-4 w-4" aria-hidden="true" />
			</>
		);
	};

	return (
		<header className="Header sticky top-0 z-50 w-full" role="banner">
			{/* Primary bar:logo + actions */}
			<div className="container mx-auto flex h-14 items-center justify-between px-4">
				<a
					href="/"
					className="StaccatoLogo HeaderLogo flex items-center space-x-2 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"
					aria-label={`${HeaderData.logo?.text || "Land"} - Go to homepage`}>
					<div
						className="LogoBox relative flex h-8 w-8 items-center justify-center overflow-hidden"
						aria-hidden="true">
						<img
							src="/Asset/Logo/Glyph/LandDark.svg"
							alt=""
							className="absolute inset-0 h-full w-full"
						/>
					</div>
					<span className="font-semibold">
						{HeaderData.logo?.text || "Land"}
					</span>
				</a>

				<div className="flex items-center space-x-3">
					<div className="hidden items-center space-x-2 md:flex">
						<LocaleSwitcher />
						{HeaderData.actions?.map((Action, Index) => (
							<Button
								key={Index}
								variant={
									(Action.variant as
										| "ghost"
										| "default"
										| "outline") || "default"
								}
								size={
									(Action.size as "default" | "sm" | "lg") ||
									"default"
								}
								className="StaccatoButton"
								asChild>
								<a href={Action.href}>
									{Action.text}
									{RenderActionIcon(Action.icon)}
								</a>
							</Button>
						))}
					</div>
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden"
						onClick={() => SetMobileMenuOpen(!MobileMenuOpen)}
						aria-label="Toggle menu"
						aria-expanded={MobileMenuOpen}>
						{MobileMenuOpen ? (
							<X className="h-5 w-5" />
						) : (
							<Menu className="h-5 w-5" />
						)}
					</Button>
				</div>
			</div>

			{/* Sub-header:breadcrumb-style app bar with icons */}
			<div className="HeaderSub hidden md:block" style={{ marginTop: "2px" }}>
				<nav
					className="container mx-auto flex items-center px-4"
					aria-label="Main navigation">
					{HeaderData.navigation?.map((Link, Index) => (
						<span key={Index} className="flex items-center">
							{Index > 0 && (
								<span
									className="StaccatoBreath mx-0.5 select-none text-[10px] text-muted-foreground/40"
									aria-hidden="true">
									/
								</span>
							)}
							<a
								href={Link.href}
								className="StaccatoNavLink HeaderSubLink relative flex items-center px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"
								{...(Link.href.startsWith("http")
									? {
											target: "_blank",
											rel: "noopener noreferrer",
										}
									: {})}>
								{Link.label}
								{RenderIcon(Link.icon)}
							</a>
						</span>
					))}
				</nav>
			</div>

			{/* Mobile menu:full nav with icons */}
			{MobileMenuOpen && (
				<div
					className="border-t border-[var(--Border)] bg-white md:hidden"
					role="dialog"
					aria-label="Mobile navigation menu">
					<nav
						className="container mx-auto flex flex-col space-y-0.5 px-4 py-3"
						aria-label="Mobile navigation">
						{HeaderData.navigation?.map((Link, Index) => {
							const Icon = Link.icon
								? IconRegistry[Link.icon]
								: null;
							return (
								<a
									key={Index}
									href={Link.href}
									className="flex items-center rounded-none px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"
									onClick={() => SetMobileMenuOpen(false)}
									{...(Link.href.startsWith("http")
										? {
												target: "_blank",
												rel: "noopener noreferrer",
											}
										: {})}>
									{Link.label}
									{Icon && (
										<>
											{"\u2001"}
											<Icon
												className="h-4 w-4 text-muted-foreground/70"
												aria-hidden="true"
											/>
										</>
									)}
								</a>
							);
						})}
						<div className="my-1.5 border-t border-border" />
						<div className="px-3 py-1.5">
							<LocaleSwitcher />
						</div>
						<div className="my-1.5 border-t border-border" />
						{HeaderData.actions?.map((Action, Index) => (
							<Button
								key={Index}
								variant={
									(Action.variant as
										| "ghost"
										| "default"
										| "outline") || "default"
								}
								className="w-full justify-start"
								asChild>
								<a href={Action.href}>
									{Action.text}
									{RenderActionIcon(Action.icon)}
								</a>
							</Button>
						))}
					</nav>
				</div>
			)}
		</header>
	);
}
