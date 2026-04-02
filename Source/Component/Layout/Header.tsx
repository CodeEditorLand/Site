"use client";

import * as lucide from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "../UI/Button";
import { IconTooltip } from "../UI/IconTooltip.js";
import { LocaleSwitcher } from "./LocaleSwitcher";

import "../Layout/Header/Stylesheet.css";

/**
 * Icon registry:maps string keys to Lucide components.
 * Used by both sub-header and mobile menu.
 */
const IconRegistry: Record<string, lucide.LucideIcon> = {
	Sparkles: lucide.Sparkles,
	Download: lucide.Download,
	BookOpen: lucide.BookOpen,
	GitFork: lucide.GitFork,
	ExternalLink: lucide.ExternalLink,
	Newspaper: lucide.Newspaper,
	Users: lucide.Users,
	LayoutDashboard: lucide.LayoutDashboard,
	HelpCircle: lucide.HelpCircle,
	LogIn: lucide.LogIn,
	Monitor: lucide.Monitor,
};

interface NavigationLink {
	Label: string;
	Href: string;
	Icon?: string;
}

export interface HeaderContent {
	Logo?: { Text: string };
	Navigation?: NavigationLink[];
	Actions?: Array<{
		Type?: string;
		Text: string;
		Variant?: string;
		Size?: string;
		Href?: string;
		Icon?: string;
	}>;
}

interface HeaderProps {
	Content?: HeaderContent;
	AuthSlot?: React.ReactNode;
}

const Header = ({ Content, AuthSlot }: HeaderProps) => {
	const { t: T } = useTranslation("header");
	const [MobileMenuOpen, SetMobileMenuOpen] = useState(false);

	const HeaderData: HeaderContent = Content || {
		Logo: { Text: T("logo", "Land") },
		Navigation: [
			{
				Label: T("nav.features", "Features"),
				Href: "/#features",
				Icon: "Sparkles",
			},
			{
				Label: T("nav.download", "Download"),
				Href: "/Download",
				Icon: "Download",
			},
			{
				Label: T("nav.docs", "Docs"),
				Href: "/Doc",
				Icon: "BookOpen",
			},
			{
				Label: T("nav.blog", "Blog"),
				Href: "/Blog",
				Icon: "Newspaper",
			},
			{
				Label: T("nav.contributing", "Contributing"),
				Href: "/Contributing",
				Icon: "Users",
			},
			{
				Label: T("nav.dashboard", "Dashboard"),
				Href: "/Dashboard",
				Icon: "LayoutDashboard",
			},
			{
				Label: T("nav.github", "GitHub"),
				Href: "https://github.com/CodeEditorLand/Land",
				Icon: "GitFork",
			},
		],
		Actions: [
			{
				Text: T("actions.signIn", "Sign In"),
				Variant: "ghost",
				Size: "default",
				Href: "/Account/SignIn",
				Icon: "LogIn",
			},
			{
				Text: T("actions.editorPortal", "Editor Portal"),
				Variant: "outline",
				Size: "default",
				Href: "/Portal",
				Icon: "Monitor",
			},
			{
				Text: T("actions.getStarted", "Get Land"),
				Variant: "default",
				Size: "default",
				Href: "/Download",
				Icon: "Download",
			},
		],
	};

	const RenderIcon = (IconName?: string, Label?: string) => {
		if (!IconName) return null;
		const Icon = IconRegistry[IconName];
		if (!Icon) return null;
		return (
			<>
				{"\u2001"}
				<IconTooltip
					Label={Label || IconName}
					Icon={Icon}
					SizeClass="h-3.5 w-3.5"
					ClassName="StaccatoIcon"
				/>
			</>
		);
	};

	const RenderActionIcon = (IconName?: string, Label?: string) => {
		if (!IconName) return null;
		const Icon = IconRegistry[IconName];
		if (!Icon) return null;
		return (
			<>
				{"\u2001"}
				<IconTooltip
					Label={Label || IconName}
					Icon={Icon}
					SizeClass="h-4 w-4"
				/>
			</>
		);
	};

	return (
		<header className="Header sticky top-0 z-50 w-full" role="banner">
			{/* Primary bar:logo + actions */}
			<div className="container mx-auto flex h-14 items-center justify-between px-4">
				<a
					href="/"
					className="StaccatoLogo HeaderLogo flex items-center space-x-3 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"
					aria-label={`${HeaderData.Logo?.Text || "Land"} - Go to homepage`}>
					<div
						className="LogoBox relative flex h-8 w-8 items-center justify-center overflow-hidden"
						aria-hidden="true">
						<img
							src="/Asset/Logo/Glyph/Land.svg"
							alt="Code Editor Land"
							title="Code Editor Land"
							width="32"
							height="32"
							className="absolute inset-0 h-full w-full"
						/>
					</div>
					<span className="font-semibold">
						{HeaderData.Logo?.Text || "Land"}
					</span>
				</a>

				{/* Sub-header:breadcrumb-style app bar with icons */}
				<div
					className="HeaderSub hidden md:block"
					style={{ marginTop: "2px" }}>
					<nav
						className="flex items-center"
						aria-label="Main navigation">
						{HeaderData.Navigation?.map((Link, Index) => (
							<span key={Index} className="flex items-center">
								{Index > 0 && (
									<span
										className="StaccatoBreath text-muted-foreground/40 mx-0.5 select-none text-[10px]"
										aria-hidden="true">
										/
									</span>
								)}
								<a
									href={Link.Href}
									className="StaccatoNavLink HeaderSubLink relative flex items-center px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"
									{...(Link.Href.startsWith("http")
										? {
												target: "_blank",
												rel: "noopener noreferrer",
											}
										: {})}>
									{Link.Label}
									{RenderIcon(Link.Icon, Link.Label)}
								</a>
							</span>
						))}
					</nav>
				</div>

				<div className="flex items-center space-x-3">
					<div className="hidden items-center space-x-2 md:flex">
						<LocaleSwitcher />
						{AuthSlot ? (
							<>
								{AuthSlot}
								{HeaderData.Actions
									?.filter(
										(Action) =>
											Action.Href !== "/Account/SignIn",
									)
									.map((Action, Index) => (
										<Button
											key={Index}
											variant={
												(Action.Variant as
													| "ghost"
													| "default"
													| "outline") || "default"
											}
											size={
												(Action.Size as
													| "default"
													| "sm"
													| "lg") || "default"
											}
											className="StaccatoButton"
											asChild>
											<a href={Action.Href}>
												{Action.Text}
												{RenderActionIcon(Action.Icon, Action.Text)}
											</a>
										</Button>
									))}
							</>
						) : (
							HeaderData.Actions?.map((Action, Index) => (
								<Button
									key={Index}
									variant={
										(Action.Variant as
											| "ghost"
											| "default"
											| "outline") || "default"
									}
									size={
										(Action.Size as
											| "default"
											| "sm"
											| "lg") || "default"
									}
									className="StaccatoButton"
									asChild>
									<a href={Action.Href}>
										{Action.Text}
										{RenderActionIcon(Action.Icon, Action.Text)}
									</a>
								</Button>
							))
						)}
					</div>
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden"
						onClick={() => SetMobileMenuOpen(!MobileMenuOpen)}
						aria-label="Toggle menu"
						aria-expanded={MobileMenuOpen}>
						{MobileMenuOpen ? (
							<lucide.X className="h-5 w-5" />
						) : (
							<lucide.Menu className="h-5 w-5" />
						)}
					</Button>
				</div>
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
						{HeaderData.Navigation?.map((Link, Index) => {
							const Icon = Link.Icon
								? IconRegistry[Link.Icon]
								: null;
							return (
								<a
									key={Index}
									href={Link.Href}
									className="flex items-center rounded-none px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"
									onClick={() => SetMobileMenuOpen(false)}
									{...(Link.Href.startsWith("http")
										? {
												target: "_blank",
												rel: "noopener noreferrer",
											}
										: {})}>
									{Link.Label}
									{Icon && (
										<>
											{"\u2001"}
											<IconTooltip
												Label={Link.Label}
												Icon={Icon}
												SizeClass="h-4 w-4"
												ClassName="text-muted-foreground/70"
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
						{HeaderData.Actions?.map((Action, Index) => (
							<Button
								key={Index}
								variant={
									(Action.Variant as
										| "ghost"
										| "default"
										| "outline") || "default"
								}
								className="w-full justify-start"
								asChild>
								<a href={Action.Href}>
									{Action.Text}
									{RenderActionIcon(Action.Icon, Action.Text)}
								</a>
							</Button>
						))}
					</nav>
				</div>
			)}
		</header>
	);
};

export { Header };

export default Header;
