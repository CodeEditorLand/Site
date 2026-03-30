"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "../ui/button";
import { LocaleSwitcher } from "./LocaleSwitcher";

import "../Layout/Header/Stylesheet.css";

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
	const { t } = useTranslation("header");
	const [MobileMenuOpen, SetMobileMenuOpen] = useState(false);

	const HeaderData = content || {
		logo: { text: t("logo", "Land") },
		navigation: [
			{ label: t("nav.features", "Features"), href: "/#features" },
			{ label: t("nav.download", "Download"), href: "/downloads" },
			{
				label: t("nav.docs", "Docs"),
				href: "https://github.com/CodeEditorLand/Land#readme",
			},
			{
				label: t("nav.github", "GitHub"),
				href: "https://github.com/CodeEditorLand/Land",
			},
		],
		actions: [
			{
				text: t("actions.signIn", "Sign In"),
				variant: "ghost",
				size: "default",
				href: "/account/signin",
			},
			{
				text: t("actions.getStarted", "Get Land"),
				variant: "default",
				size: "default",
				href: "/downloads",
			},
		],
	};

	return (
		<header className="header sticky top-0 z-50 w-full" role="banner">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<div className="flex items-center space-x-8">
					<a
						href="/"
						className="header-logo flex items-center space-x-2 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--primary)]"
						aria-label={`${HeaderData.logo?.text || "Land"} - Go to homepage`}>
						<div
							className="logo-box relative flex h-8 w-8 items-center justify-center overflow-hidden"
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
					<nav
						className="hidden items-center space-x-6 md:flex"
						aria-label="Main navigation">
						{HeaderData.navigation?.map((Link, Index) => (
							<a
								key={Index}
								href={Link.href}
								className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--primary)]"
								{...(Link.href.startsWith("http")
									? {
											target: "_blank",
											rel: "noopener noreferrer",
										}
									: {})}>
								{Link.label}
							</a>
						))}
					</nav>
				</div>
				<div className="flex items-center space-x-3">
					<div className="hidden items-center space-x-3 md:flex">
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
								asChild>
								<a href={Action.href}>{Action.text}</a>
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

			{MobileMenuOpen && (
				<div
					className="border-t border-[var(--border)] bg-white md:hidden"
					role="dialog"
					aria-label="Mobile navigation menu">
					<nav
						className="container mx-auto flex flex-col space-y-1 px-4 py-4"
						aria-label="Mobile navigation">
						{HeaderData.navigation?.map((Link, Index) => (
							<a
								key={Index}
								href={Link.href}
								className="rounded-none px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--primary)]"
								onClick={() => SetMobileMenuOpen(false)}>
								{Link.label}
							</a>
						))}
						<div className="my-2 border-t border-border" />
						<div className="px-3 py-2">
							<LocaleSwitcher />
						</div>
						<div className="my-2 border-t border-border" />
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
								<a href={Action.href}>{Action.text}</a>
							</Button>
						))}
					</nav>
				</div>
			)}
		</header>
	);
}
