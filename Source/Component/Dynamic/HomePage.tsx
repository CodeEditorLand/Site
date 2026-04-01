"use client";

import { useTranslation } from "react-i18next";

import { Header } from "../Layout/Header";
import { DynamicFeatures } from "./DynamicFeatures";
import { DynamicHeroSection } from "./DynamicHeroSection";
import { DynamicPlatformGrid } from "./DynamicPlatformGrid";
import { DynamicPricing } from "./DynamicPricing";
import { DynamicTestimonials } from "./DynamicTestimonials";
import type Interface from "./Interface/Content/Page/Home.js";
import type Property from "./Interface/Property/Page/Home.js";

/**
 * Dynamic HomePage composition
 * Assembles Header, Hero, Features, Pricing, Testimonials, Download, Footer
 * Content driven by translations (useTranslation) or explicit props
 */
export function HomePage({ content, className }: Property) {
	const { t: T } = useTranslation(["home", "common", "download", "footer"]);

	const ResolvedContent: Interface = content || {
		hero: {
			badge: {
				text: T("home:hero.badge", {
					defaultValue: "New: Effect-TS Architecture\u2001🎉",
				}),
				variant: "secondary",
			},
			title: T("home:hero.title", {
				defaultValue: "The Future of Code Editing",
			}),
			titleHighlight: T("home:hero.titleHighlight", {
				defaultValue: "Land",
			}),
			subtitle: T("home:hero.subtitle", {
				defaultValue:
					"A lightning-fast, type-safe editor built with Rust, Tauri, and Effect-TS. Experience the editor that reimagines VS Code for the modern era.",
			}),
			primaryCta: {
				text: T("common:button.download", {
					defaultValue: "Download",
				}),
				variant: "default",
				size: "lg",
				icon: "Download",
				fullWidth: true,
			},
			secondaryCta: {
				text: T("common:button.learnMore", {
					defaultValue: "Learn More",
				}),
				variant: "outline",
				size: "lg",
				icon: "ExternalLink",
				fullWidth: true,
			},
			floatingCards: [
				{
					id: "1",
					title: "Rust Core",
					colors: ["bg-orange-600", "bg-muted"],
				},
				{
					id: "2",
					title: "Tauri UI",
					colors: [
						"bg-yellow-500",
						"bg-primary",
						"bg-secondary",
						"bg-muted",
					],
				},
				{
					id: "3",
					title: "Effect-TS Services",
					colors: ["bg-cyan-500", "bg-cyan-600", "bg-cyan-700"],
				},
				{
					id: "4",
					title: "gRPC IPC",
					colors: ["bg-green-500", "bg-blue-500"],
				},
				{
					id: "5",
					title: "Extension Host",
					colors: ["bg-purple-600"],
				},
				{
					id: "6",
					title: "Cross-Platform",
					colors: ["bg-gray-600", "bg-blue-600", "bg-orange-500"],
				},
				{ id: "7", title: "VS Code API", colors: ["bg-blue-500"] },
				{
					id: "8",
					title: "Open Source CC0",
					colors: ["bg-green-500", "bg-yellow-500"],
				},
			],
			showConnectingLines: true,
			showParticles: true,
			respectReducedMotion: true,
		},
		features: {
			title: T("home:features.title", {
				defaultValue:
					"Built for Performance, Designed for Developers",
			}),
			subtitle: T("home:features.subtitle", {
				defaultValue:
					"Discover what makes Code Editor Land the most advanced code editor available.",
			}),
			features: [
				{
					id: "performance",
					icon: "Zap",
					title: T("home:features.item.designTokens.title", {
						defaultValue: "Performance First",
					}),
					description: T(
						"home:features.item.designTokens.description",
						{
							defaultValue:
								"Native Rust backend with gRPC IPC ensures every operation is fast, responsive, and reliable. No Electron bloat.",
						},
					),
				},
				{
					id: "compatibility",
					icon: "Box",
					title: T(
						"home:features.item.componentLibrary.title",
						{
							defaultValue: "VS Code Compatibility",
						},
					),
					description: T(
						"home:features.item.componentLibrary.description",
						{
							defaultValue:
								"Run your existing VS Code extensions with high fidelity through the Cocoon extension host. No changes needed.",
						},
					),
				},
				{
					id: "architecture",
					icon: "Cpu",
					title: T(
						"home:features.item.documentation.title",
						{
							defaultValue: "Effect-TS Architecture",
						},
					),
					description: T(
						"home:features.item.documentation.description",
						{
							defaultValue:
								"Effect-TS native UI services provide type safety, structured concurrency, and excellent error handling.",
						},
					),
				},
				{
					id: "cross-platform",
					icon: "Globe",
					title: T(
						"home:features.item.versionControl.title",
						{
							defaultValue: "Cross-Platform",
						},
					),
					description: T(
						"home:features.item.versionControl.description",
						{
							defaultValue:
								"One codebase, native deployments for macOS, Windows, and Linux with Tauri. Write once, run everywhere.",
						},
					),
				},
				{
					id: "tooling",
					icon: "Wrench",
					title: T(
						"home:features.item.cicdIntegration.title",
						{
							defaultValue: "Modern Tooling",
						},
					),
					description: T(
						"home:features.item.cicdIntegration.description",
						{
							defaultValue:
								"Built on proven open-source technologies: Rust, Tauri, Effect-TS, and the VS Code platform. Familiar and powerful.",
						},
					),
				},
				{
					id: "opensource",
					icon: "Heart",
					title: T(
						"home:features.item.collaboration.title",
						{
							defaultValue: "Open Source",
						},
					),
					description: T(
						"home:features.item.collaboration.description",
						{
							defaultValue:
								"Licensed under Creative Commons CC0 - completely free to use, modify, and distribute. No strings attached.",
						},
					),
				},
			],
			columns: 3,
			gap: "lg",
		},
		pricing: {
			title: T("home:roadmap.title", {
				defaultValue: "Roadmap & Expectancy",
			}),
			subtitle: T("home:roadmap.subtitle", {
				defaultValue:
					"Funded by the NGI0 Commons Fund. Open source, free forever, built in public.",
			}),
			tiers: [
				{
					id: "current",
					name: T("home:roadmap.tiers.current.name", {
						defaultValue: "Current Phase",
					}),
					description: T(
						"home:roadmap.tiers.current.description",
						{
							defaultValue:
								"Foundation and core editor scaffold. Active development.",
						},
					),
					price: { monthly: 0, yearly: 0 },
					features: [
						T("home:roadmap.tiers.current.features.1", {
							defaultValue: "Mountain: Rust/Tauri native backend",
						}),
						T("home:roadmap.tiers.current.features.2", {
							defaultValue: "Cocoon: VS Code extension host via Effect-TS",
						}),
						T("home:roadmap.tiers.current.features.3", {
							defaultValue: "Wind: Workbench re-implementation",
						}),
						T("home:roadmap.tiers.current.features.4", {
							defaultValue: "Sky: Editor interface rendering",
						}),
						T("home:roadmap.tiers.current.features.5", {
							defaultValue: "Air: Update daemon and crypto signing",
						}),
						T("home:roadmap.tiers.current.features.6", {
							defaultValue: "Echo: Work-stealing task scheduler",
						}),
					],
					cta: {
						text: T("home:roadmap.tiers.current.button", {
							defaultValue: "View on GitHub",
						}),
						variant: "default",
						fullWidth: true,
					},
					popular: true,
				},
				{
					id: "next",
					name: T("home:roadmap.tiers.next.name", {
						defaultValue: "Next Milestone",
					}),
					description: T(
						"home:roadmap.tiers.next.description",
						{
							defaultValue:
								"Extension ecosystem and platform stability.",
						},
					),
					price: { monthly: 0, yearly: 0 },
					features: [
						T("home:roadmap.tiers.next.features.1", {
							defaultValue: "High-fidelity VS Code extension compatibility",
						}),
						T("home:roadmap.tiers.next.features.2", {
							defaultValue: "Cross-platform installer and auto-update",
						}),
						T("home:roadmap.tiers.next.features.3", {
							defaultValue: "gRPC IPC protocol finalization",
						}),
						T("home:roadmap.tiers.next.features.4", {
							defaultValue: "Settings sync and cloud-optional portal",
						}),
					],
					cta: {
						text: T("home:roadmap.tiers.next.button", {
							defaultValue: "Track Progress",
						}),
						variant: "outline",
						fullWidth: true,
					},
					popular: false,
				},
				{
					id: "future",
					name: T("home:roadmap.tiers.future.name", {
						defaultValue: "Long-Term Vision",
					}),
					description: T(
						"home:roadmap.tiers.future.description",
						{
							defaultValue:
								"Full-featured editor replacing Electron-based tools.",
						},
					),
					price: { monthly: 0, yearly: 0 },
					features: [
						T("home:roadmap.tiers.future.features.1", {
							defaultValue: "Native mobile editing (iOS, Android)",
						}),
						T("home:roadmap.tiers.future.features.2", {
							defaultValue: "Collaborative real-time editing",
						}),
						T("home:roadmap.tiers.future.features.3", {
							defaultValue: "AI-assisted development tooling",
						}),
						T("home:roadmap.tiers.future.features.4", {
							defaultValue: "Plugin marketplace and ecosystem",
						}),
					],
					cta: {
						text: T("home:roadmap.tiers.future.button", {
							defaultValue: "Learn More",
						}),
						variant: "outline",
						fullWidth: true,
					},
					popular: false,
				},
			],
		},
		testimonials: {
			title: T("home:architecture.title", {
				defaultValue: "Architecture",
			}),
			subtitle: T("home:architecture.subtitle", {
				defaultValue:
					"Land replaces VS Code's Electron stack with a modular, high-performance architecture. Each element is a standalone repository.",
			}),
			testimonials: [
				{
					id: "mountain",
					quote: T("home:architecture.mountain.description", {
						defaultValue:
							"Manages Window, File System, and Process lifecycle. The native Rust/Tauri backend that replaces Electron's main process.",
					}),
					author: "Mountain",
					role: T("home:architecture.mountain.subtitle", {
						defaultValue: "Rust/Tauri native backend",
					}),
					rating: 5,
				},
				{
					id: "cocoon",
					quote: T("home:architecture.cocoon.description", {
						defaultValue:
							"Runs VS Code extensions via Effect-TS with high-fidelity API compatibility. No changes needed to existing extensions.",
					}),
					author: "Cocoon",
					role: T("home:architecture.cocoon.subtitle", {
						defaultValue: "TypeScript extension host",
					}),
					rating: 5,
				},
				{
					id: "wind",
					quote: T("home:architecture.wind.description", {
						defaultValue:
							"Re-implementation of the VS Code Workbench. Provides the editor shell, panels, sidebars, and activity bar.",
					}),
					author: "Wind",
					role: T("home:architecture.wind.subtitle", {
						defaultValue: "TypeScript UI service",
					}),
					rating: 5,
				},
				{
					id: "sky",
					quote: T("home:architecture.sky.description", {
						defaultValue:
							"Renders the editor interface using Astro components. Handles themes, layouts, and the visual presentation layer.",
					}),
					author: "Sky",
					role: T("home:architecture.sky.subtitle", {
						defaultValue: "Astro UI component",
					}),
					rating: 5,
				},
				{
					id: "air",
					quote: T("home:architecture.air.description", {
						defaultValue:
							"Background daemon for automatic updates, downloads, and cryptographic signing. Keeps Land up to date silently.",
					}),
					author: "Air",
					role: T("home:architecture.air.subtitle", {
						defaultValue: "Rust background daemon",
					}),
					rating: 5,
				},
				{
					id: "echo",
					quote: T("home:architecture.echo.description", {
						defaultValue:
							"High-performance work-stealing executor. Schedules and distributes tasks across cores for maximum throughput.",
					}),
					author: "Echo",
					role: T("home:architecture.echo.subtitle", {
						defaultValue: "Rust task scheduler",
					}),
					rating: 5,
				},
			],
			columns: 3,
		},
		download: {
			title: T("download:title", { defaultValue: "Download Land" }),
			subtitle: T("download:subtitle", {
				defaultValue:
					"Available for macOS, Windows, and Linux. Built with Tauri, powered by Rust.",
			}),
			platforms: [
				{
					id: "macos",
					name: T("download:card.platform.macos.title", {
						defaultValue: "macOS",
					}),
					icon: "Apple" as const,
					description: T(
						"download:card.platform.macos.universalBadge",
						{
							defaultValue: "Universal Binary",
						},
					),
					version: "Pre-release",
					size: "Coming Soon",
				},
				{
					id: "windows",
					name: T("download:card.platform.windows.title", {
						defaultValue: "Windows",
					}),
					icon: "Monitor" as const,
					description: T(
						"download:card.platform.windows.description",
						{
							defaultValue: "64-bit (x64)",
						},
					),
					version: "Pre-release",
					size: "Coming Soon",
				},
				{
					id: "linux",
					name: T("download:card.platform.linux.title", {
						defaultValue: "Linux",
					}),
					icon: "Terminal" as const,
					description: T(
						"download:card.platform.linux.description",
						{
							defaultValue: "DEB, RPM, AppImage",
						},
					),
					version: "Pre-release",
					size: "Coming Soon",
				},
			],
			showVerification: true,
			onDownload: async (Platform: { name: string; id?: string }) => {
				if (Platform.id) {
					try {
						const { default: DownloadAPI } = await import(
							"../../Library/API/Download.js"
						);
						const Information = await DownloadAPI.GetInfo(
							Platform.id,
						);
						window.open(Information.downloadUrl, "_blank");
						await DownloadAPI.TrackDownload(Platform.id);
					} catch (DownloadError) {
						console.error("Download failed:", DownloadError);
						alert(T("download:labels.downloadFailed", { defaultValue: "Download failed. Please try again." }));
					}
				}
			},
		},
		header: undefined,
		footer: {
			brand: {
				name: T("common:brand.name", {
					defaultValue: "Land",
				}),
				description: T("common:brand.tagline", {
					defaultValue:
						"The next-generation code editor. Open source and free forever.",
				}),
			},
			social: {
				github: "https://github.com/CodeEditorLand/Land",
			},
			columns: [
				{
					title: T("footer:columns.product.title", {
						defaultValue: "Product",
					}),
					links: [
						{
							label: T("footer:columns.product.features", {
								defaultValue: "Features",
							}),
							href: "/#features",
						},
						{
							label: T("footer:columns.product.downloads", {
								defaultValue: "Download",
							}),
							href: "/downloads",
						},
						{
							label: T("footer:columns.product.docs", {
								defaultValue: "Docs",
							}),
							href: "https://github.com/CodeEditorLand/Land#readme",
						},
					],
				},
				{
					title: T("footer:columns.company.title", {
						defaultValue: "Community",
					}),
					links: [
						{
							label: T("footer:columns.company.github", {
								defaultValue: "GitHub",
							}),
							href: "https://github.com/CodeEditorLand/Land",
						},
						{
							label: T("footer:columns.company.issues", {
								defaultValue: "Issues",
							}),
							href: "https://github.com/CodeEditorLand/Land/issues",
						},
						{
							label: T("footer:columns.company.contributing", {
								defaultValue: "Contributing",
							}),
							href: "https://github.com/CodeEditorLand/Land/blob/Current/CONTRIBUTING.md",
						},
					],
				},
				{
					title: T("footer:columns.legal.title", {
						defaultValue: "Legal",
					}),
					links: [
						{
							label: T("footer:columns.legal.privacy", {
								defaultValue: "Privacy",
							}),
							href: "/legal/privacy",
						},
						{
							label: T("footer:columns.legal.terms", {
								defaultValue: "Terms",
							}),
							href: "/legal/terms",
						},
						{
							label: T("footer:columns.legal.license", {
								defaultValue: "License",
							}),
							href: "/license",
						},
					],
				},
			],
			bottomBar: { madeWith: true },
		},
	};

	const {
		hero: Hero,
		features: Features,
		pricing: Pricing,
		testimonials: Testimonials,
		download: Download,
		header: HeaderContent,
	} = ResolvedContent;

	return (
		<div className={`flex min-h-screen flex-col ${className || ""}`}>
			{HeaderContent !== undefined && <Header content={HeaderContent} />}

			<div className="flex-1" role="region" aria-label="Page content">
				<DynamicHeroSection content={Hero} />
				<hr
					className="StaccatoDivider mx-auto max-w-5xl border-t border-[var(--Border)]"
					aria-hidden="true"
				/>
				<DynamicFeatures content={Features} />
				<hr
					className="StaccatoDivider mx-auto max-w-5xl border-t border-[var(--Border)]"
					aria-hidden="true"
				/>
				<DynamicPricing content={Pricing} />
				<hr
					className="StaccatoDivider mx-auto max-w-5xl border-t border-[var(--Border)]"
					aria-hidden="true"
				/>
				<DynamicTestimonials content={Testimonials} />
				<hr
					className="StaccatoDivider mx-auto max-w-5xl border-t border-[var(--Border)]"
					aria-hidden="true"
				/>
				<DynamicPlatformGrid content={Download} />
			</div>
		</div>
	);
}
