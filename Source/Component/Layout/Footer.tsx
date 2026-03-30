"use client";

import { useTranslation } from "react-i18next";

import { Separator } from "../UI/Separator";

import "./Footer/Stylesheet.css";

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
	const { t } = useTranslation("footer");

	const FooterData = content || {
		brand: {
			name: t("brand.name", "Land"),
			description: t(
				"brand.description",
				"The next-generation code editor. Open source and free forever.",
			),
		},
		columns: [
			{
				title: t("columns.product.title", "Product"),
				links: [
					{
						label: t("columns.product.features", "Features"),
						href: "/#features",
					},
					{
						label: t("columns.product.downloads", "Downloads"),
						href: "/downloads",
					},
					{
						label: t("columns.product.docs", "Docs"),
						href: "https://github.com/CodeEditorLand/Land#readme",
					},
				],
			},
			{
				title: t("columns.company.title", "Community"),
				links: [
					{
						label: t("columns.company.blog", "Discussions"),
						href: "https://github.com/CodeEditorLand/Land/discussions",
					},
					{
						label: t(
							"columns.company.contributing",
							"Contributing",
						),
						href: "https://github.com/CodeEditorLand/Land/blob/Current/CONTRIBUTING.md",
					},
					{
						label: t("columns.company.github", "GitHub"),
						href: "https://github.com/CodeEditorLand/Land",
					},
				],
			},
			{
				title: t("columns.legal.title", "Legal"),
				links: [
					{
						label: t("columns.legal.privacy", "Privacy"),
						href: "/legal/privacy",
					},
					{
						label: t("columns.legal.terms", "Terms"),
						href: "/legal/terms",
					},
					{
						label: t("columns.legal.license", "License"),
						href: "/license",
					},
				],
			},
		],
		bottomBar: { madeWith: true },
	};

	return (
		<footer className="footer" role="contentinfo" aria-label="Site footer">
			<div className="footer-content container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
					<div className="lg:col-span-2">
						<a
							href="/"
							className="mb-4 flex items-center space-x-2 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--primary)]"
							aria-label={`${FooterData.brand?.name || "Land"} - Go to homepage`}>
							<img
								src="/Asset/Logo/Glyph/LandDark.svg"
								alt=""
								className="h-8 w-8"
								aria-hidden="true"
							/>
							<span className="font-semibold">
								{FooterData.brand?.name || "Land"}
							</span>
						</a>
						{FooterData.brand?.description && (
							<p className="mb-6 max-w-md text-muted-foreground">
								{FooterData.brand.description}
							</p>
						)}
					</div>

					{FooterData.columns?.map((Column, ColumnIndex) => (
						<nav key={ColumnIndex} aria-label={Column.title}>
							<h4 className="mb-4 font-medium">{Column.title}</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								{Column.links.map((Link, LinkIndex) => (
									<li key={LinkIndex}>
										<a
											href={Link.href}
											className="transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--primary)]"
											{...(Link.href.startsWith("http")
												? {
														target: "_blank",
														rel: "noopener noreferrer",
													}
												: {})}>
											{Link.label}
										</a>
									</li>
								))}
							</ul>
						</nav>
					))}
				</div>

				<Separator className="my-8" />

				<div className="mb-6 border border-[var(--border)] bg-white p-4">
					<p className="text-xs leading-relaxed text-muted-foreground">
						{t(
							"funding.prefix",
							"This project has been funded through the ",
						)}
						<a
							href="https://nlnet.nl/commonsfund"
							target="_blank"
							rel="noopener noreferrer"
							className="text-[var(--primary)] hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--primary)]">
							{t("funding.ngiFund", "NGI0 Commons Fund")}
						</a>
						{t("funding.nlnetIntro", ", a fund established by ")}
						<a
							href="https://nlnet.nl"
							target="_blank"
							rel="noopener noreferrer"
							className="text-[var(--primary)] hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--primary)]">
							{t("funding.nlnet", "NLnet")}
						</a>
						{t(
							"funding.euSupport",
							" with financial support from the European Commission\u2019s Next Generation Internet programme, under grant agreement No.\u00a0101135429. ",
						)}
						<a
							href="https://nlnet.nl/project/Land/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-[var(--primary)] hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--primary)]">
							{t("funding.projectPage", "View project page")}
						</a>
						{"."}
					</p>
				</div>

				<div className="flex flex-col items-center justify-between md:flex-row">
					<div className="mb-4 flex items-center gap-4 md:mb-0">
						<a
							href="https://github.com/CodeEditorLand"
							target="_blank"
							rel="noopener noreferrer"
							className="transition-opacity hover:opacity-80 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--primary)]"
							aria-label="Code Editor Land on GitHub (opens in new tab)">
							<img
								src="/Image/GitHub.svg"
								alt=""
								aria-hidden="true"
								className="h-5 w-5"
							/>
						</a>
						<p className="text-sm text-muted-foreground">
							{t("bottomBar.copyright", {
								year: new Date().getFullYear(),
								defaultValue:
									"© {{year}} Code Editor Land. All rights reserved.",
							})}
						</p>
					</div>
					{FooterData.bottomBar?.madeWith && (
						<a
							href="https://tauri.app"
							target="_blank"
							rel="noopener noreferrer"
							className="transition-opacity hover:opacity-80 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--primary)]"
							aria-label="Made with Tauri (opens in new tab)">
							<img
								src="https://playform.cloud/Image/GitHub/Made/Tauri.svg"
								alt="Made with Tauri"
								className="h-8"
								loading="lazy"
							/>
						</a>
					)}
				</div>
			</div>
		</footer>
	);
}

