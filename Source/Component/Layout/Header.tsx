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
	Tooltip?: string | string[];
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
		Tooltip?: string | string[];
	}>;
}

interface HeaderProps {
	Content?: HeaderContent;
	AuthSlot?: React.ReactNode;
}

const Header = ({ Content, AuthSlot }: HeaderProps) => {
	const { t: T } = useTranslation("header");
	const [NavMenuOpen, SetNavMenuOpen] = useState(false);
	const [MobileMenuOpen, SetMobileMenuOpen] = useState(false);

	const HeaderData: HeaderContent = Content || {
		Logo: { Text: T("logo", "Land") },
		Navigation: [
			{
				Label: T("nav.features", "Features"),
				Href: "/#features",
				Icon: "Sparkles",
				Tooltip: ["/#features", "Editor feature overview"],
			},
			{
				Label: T("nav.download", "Download"),
				Href: "/Download",
				Icon: "Download",
				Tooltip: ["/Download", "Builds for macOS, Windows, Linux"],
			},
			{
				Label: T("nav.docs", "Documentation"),
				Href: "/Doc",
				Icon: "BookOpen",
				Tooltip: ["/Doc", "Developer documentation"],
			},
			{
				Label: T("nav.blog", "Blog"),
				Href: "/Blog",
				Icon: "Newspaper",
				Tooltip: ["/Blog", "Technical articles and project updates"],
			},
			{
				Label: T("nav.contributing", "Contributing"),
				Href: "/Contributing",
				Icon: "Users",
				Tooltip: ["/Contributing", "Contribution guide and open issues"],
			},
			{
				Label: T("nav.dashboard", "Dashboard"),
				Href: "/Dashboard",
				Icon: "LayoutDashboard",
				Tooltip: [
					"/Dashboard",
					"Account, downloads, editor connection",
				],
			},
			{
				Label: T("nav.github", "GitHub"),
				Href: "https://github.com/CodeEditorLand/Land",
				Icon: "GitFork",
				Tooltip: [
					"github.com/CodeEditorLand/Land",
					"Source repository - opens in new tab",
				],
			},
		],
		Actions: [
			{
				Text: T("actions.signIn", "Sign In"),
				Variant: "ghost",
				Size: "default",
				Href: "/Account/SignIn",
				Icon: "LogIn",
				Tooltip: ["/Account/SignIn", "Sign in to your Land account"],
			},
			{
				Text: T("actions.editorPortal", "Portal"),
				Variant: "ghost",
				Size: "default",
				Href: "/Portal",
				Icon: "Monitor",
				Tooltip: ["/Portal", "Cloud, Provider, Local-First tiers"],
			},
			{
				Text: T("actions.getStarted", "Get Land"),
				Variant: "default",
				Size: "default",
				Href: "/Download",
				Icon: "Download",
				Tooltip: ["/Download", "Download the latest Land build"],
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

	const RenderActionIcon = (
		IconName?: string,
		Label?: string,
		Tooltip?: string | string[],
	) => {
		if (!IconName) return null;
		const Icon = IconRegistry[IconName];
		if (!Icon) return null;
		return (
			<>
				{"\u2001"}
				<IconTooltip
					Label={Tooltip || Label || IconName}
					Icon={Icon}
					SizeClass="h-4 w-4"
				/>
			</>
		);
	};

	const NavLinks = ({ OnClick }: { OnClick?: () => void }) => (
		<>
			{HeaderData.Navigation?.map((Link, Index) => {
				const Icon = Link.Icon ? IconRegistry[Link.Icon] : null;
				return (
					<a
						key={Index}
						href={Link.Href}
						className="StaccatoNavLink HeaderSubLink relative flex items-center px-4 py-3 font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"
						onClick={OnClick}
						{...(Link.Href.startsWith("http")
							? { target: "_blank", rel: "noopener noreferrer" }
							: {})}>
						<span className="HeaderLinkLabel">{Link.Label}</span>
						{Icon && (
							<span
								aria-hidden="true"
								className="inline-flex items-center">
								{"\u2001"}
								<IconTooltip
									Label={Link.Tooltip || Link.Label}
									Icon={Icon}
									SizeClass="h-4 w-4"
									ClassName="StaccatoIcon"
								/>
							</span>
						)}
					</a>
				);
			})}
		</>
	);

	const ActionButtons = ({
		OnClick,
		FullWidth,
	}: {
		OnClick?: () => void;
		FullWidth?: boolean;
	}) => (
		<>
			{AuthSlot ? (
				<>
					{AuthSlot}
					{HeaderData.Actions?.filter(
						(Action) => Action.Href !== "/Account/SignIn",
					).map((Action, Index) => (
						<Button
							key={Index}
							variant={
								(Action.Variant as
									| "ghost"
									| "default"
									| "outline") || "default"
							}
							size={
								(Action.Size as "default" | "sm" | "lg") ||
								"default"
							}
							className={
								FullWidth
									? "StaccatoButton w-full justify-start"
									: "StaccatoButton"
							}
							asChild>
							<a href={Action.Href} onClick={OnClick}>
								{Action.Text}
								{RenderActionIcon(Action.Icon, Action.Text, Action.Tooltip)}
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
							(Action.Size as "default" | "sm" | "lg") ||
							"default"
						}
						className={
							FullWidth
								? "StaccatoButton w-full justify-start"
								: "StaccatoButton"
						}
						asChild>
						<a href={Action.Href} onClick={OnClick}>
							{Action.Text}
							{RenderActionIcon(Action.Icon, Action.Text, Action.Tooltip)}
						</a>
					</Button>
				))
			)}
		</>
	);

	return (
		<header className="Header sticky top-0 z-50 w-full" role="banner">
			{/* Primary bar */}
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				{/* Left: logo always + inline nav on lg+, hamburger on md only */}
				<div className="flex items-center gap-3">
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

					{/* Inline nav - desktop only (lg+) */}
					<nav
						className="ml-2 hidden items-center lg:flex"
						aria-label="Main navigation">
						{HeaderData.Navigation?.map((Link, Index) => {
							const Icon = Link.Icon
								? IconRegistry[Link.Icon]
								: null;
							return (
								<a
									key={Index}
									href={Link.Href}
									className="StaccatoNavLink HeaderSubLink relative flex items-center px-4 py-2 font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"
									{...(Link.Href.startsWith("http")
										? {
												target: "_blank",
												rel: "noopener noreferrer",
											}
										: {})}>
									<span className="HeaderLinkLabel">
										{Link.Label}
									</span>
									{Icon && (
										<span
											aria-hidden="true"
											className="inline-flex items-center">
											{"\u2001"}
											<IconTooltip
												Label={
													Link.Tooltip || Link.Label
												}
												Icon={Icon}
												SizeClass="h-3.5 w-3.5"
												ClassName="StaccatoIcon"
											/>
										</span>
									)}
								</a>
							);
						})}
					</nav>

					{/* Nav hamburger - tablet only (md, hidden on lg+) */}
					<Button
						variant="ghost"
						size="icon"
						className="hidden md:flex lg:hidden"
						onClick={() => SetNavMenuOpen(!NavMenuOpen)}
						aria-label="Toggle navigation"
						aria-expanded={NavMenuOpen}>
						{NavMenuOpen ? (
							<lucide.X className="h-5 w-5" />
						) : (
							<lucide.Menu className="h-5 w-5" />
						)}
					</Button>
				</div>

				{/* Right: actions (md+) + mobile hamburger */}
				<div className="flex items-center gap-3">
					<div className="hidden items-center gap-3 md:flex">
						<LocaleSwitcher />
						<ActionButtons />
					</div>

					{/* Mobile hamburger - merges nav + actions */}
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

			{/* Tablet nav dropdown (md only, hidden on lg+) */}
			{NavMenuOpen && (
				<div
					className="NavDropdown hidden bg-white md:block lg:hidden"
					role="dialog"
					aria-label="Navigation menu">
					<nav
						className="container mx-auto flex flex-col gap-1 px-4 py-4"
						aria-label="Site navigation">
						<NavLinks OnClick={() => SetNavMenuOpen(false)} />
					</nav>
				</div>
			)}

			{/* Mobile full menu: nav + locale + actions */}
			{MobileMenuOpen && (
				<div
					className="bg-white md:hidden"
					role="dialog"
					aria-label="Mobile navigation menu">
					<nav
						className="container mx-auto flex flex-col gap-1 px-4 py-4"
						aria-label="Mobile navigation">
						<NavLinks OnClick={() => SetMobileMenuOpen(false)} />
						<div className="my-1.5 border-t border-border" />
						<div className="px-4 py-3">
							<LocaleSwitcher />
						</div>
						<div className="my-1.5 border-t border-border" />
						<ActionButtons
							OnClick={() => SetMobileMenuOpen(false)}
							FullWidth
						/>
					</nav>
				</div>
			)}
		</header>
	);
};

export { Header };

export default Header;
