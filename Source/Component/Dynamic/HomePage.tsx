"use client";

import { useTranslation } from "react-i18next";

import { ErrorBoundary } from "../ErrorBoundary.js";
import { Header } from "../Layout/Header";
import {
	SkeletonCard,
	SkeletonFeatureCard,
	SkeletonPricingTier,
} from "../UI/Skeleton.js";
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
const HomePage = ({ Content, ClassName }: Property) => {
	const { t: T } = useTranslation(["home", "common", "download", "footer"]);

	const ResolvedContent: Interface = Content || {
		Hero: {
			Badge: {
				Text: T("home:hero.badge", {
					defaultValue: "New: Effect-TS Architecture\u2001🎉",
				}),
				Variant: "secondary",
			},
			Title: T("home:hero.title", {
				defaultValue: "The Future of Code Editing",
			}),
			TitleHighlight: T("home:hero.titleHighlight", {
				defaultValue: "Land",
			}),
			Subtitle: T("home:hero.subtitle", {
				defaultValue:
					"A lightning-fast, type-safe editor built with Rust, Tauri, and Effect-TS.\nExperience the editor that reimagines VS Code for the modern era.",
			}),
			PrimaryCta: {
				Text: T("common:button.download", {
					defaultValue: "Download",
				}),
				Variant: "default",
				Size: "lg",
				Icon: "Download",
				Href: "/Download",
			},
			SecondaryCta: {
				Text: T("common:button.learnMore", {
					defaultValue: "Learn More",
				}),
				Variant: "outline",
				Size: "lg",
				Icon: "ExternalLink",
				Href: "https://github.com/CodeEditorLand/Land#readme",
			},
			FloatingCards: [
				{
					Id: "1",
					Title: "Rust Core",
					Colors: ["var(--ExtensionRust)", "var(--Mute)"],
				},
				{
					Id: "2",
					Title: "Tauri UI",
					Colors: [
						"var(--ExtensionTauri)",
						"var(--Primary)",
						"var(--Secondary)",
						"var(--Mute)",
					],
				},
				{
					Id: "3",
					Title: "Effect-TS Services",
					Colors: [
						"var(--ExtensionEffectTypeScript)",
						"var(--ExtensionEffectTypeScriptFore)",
						"var(--ExtensionEffectTypeScriptMute)",
					],
				},
				{
					Id: "4",
					Title: "gRPC IPC",
					Colors: ["var(--SpinegRPC)", "var(--SpineIPC)"],
				},
				{
					Id: "5",
					Title: "Extension Host",
					Colors: ["var(--TierProvider)"],
				},
				{
					Id: "6",
					Title: "Cross-Platform",
					Colors: [
						"var(--OSMacOS)",
						"var(--OSWindows)",
						"var(--OSLinux)",
					],
				},
				{
					Id: "7",
					Title: "VS Code API",
					Colors: ["var(--SpineIPC)"],
				},
				{
					Id: "8",
					Title: "Open Source CC0",
					Colors: ["var(--SpinegRPC)", "var(--ExtensionTauri)"],
				},
			],
			ShowConnectingLines: true,
			ShowParticles: true,
			RespectReducedMotion: true,
		},
		Features: {
			Title: T("home:features.title", {
				defaultValue: "Built for Performance, Designed for Developers",
			}),
			Subtitle: T("home:features.subtitle", {
				defaultValue:
					"Discover what makes Code Editor Land the most advanced code editor available.",
			}),
			Features: [
				{
					Id: "performance",
					Icon: "Zap",
					Icons: ["Zap", "Cpu", "Server"],
					Title: T("home:features.item.designTokens.title", {
						defaultValue: "Performance First",
					}),
					Description: T(
						"home:features.item.designTokens.description",
						{
							defaultValue:
								"Native Rust backend with gRPC IPC ensures every operation is fast, responsive, and reliable.\nNo Electron bloat.",
						},
					),
				},
				{
					Id: "compatibility",
					Icon: "Box",
					Icons: ["Box", "Puzzle", "Code"],
					Title: T("home:features.item.componentLibrary.title", {
						defaultValue: "VS Code Compatibility",
					}),
					Description: T(
						"home:features.item.componentLibrary.description",
						{
							defaultValue:
								"Run your existing VS Code extensions with high fidelity through the Cocoon extension host.\nNo changes needed.",
						},
					),
				},
				{
					Id: "architecture",
					Icon: "Cpu",
					Icons: ["Cpu", "Layers", "Shield"],
					Title: T("home:features.item.documentation.title", {
						defaultValue: "Effect-TS Architecture",
					}),
					Description: T(
						"home:features.item.documentation.description",
						{
							defaultValue:
								"Effect-TS native UI services provide type safety, structured concurrency, and excellent error handling.",
						},
					),
				},
				{
					Id: "cross-platform",
					Icon: "Globe",
					Icons: ["Globe", "Package", "Database"],
					Title: T("home:features.item.versionControl.title", {
						defaultValue: "Cross-Platform",
					}),
					Description: T(
						"home:features.item.versionControl.description",
						{
							defaultValue:
								"One codebase, native deployments for macOS, Windows, and Linux with Tauri.\nWrite once, run everywhere.",
						},
					),
				},
				{
					Id: "tooling",
					Icon: "Wrench",
					Icons: ["Wrench", "Cpu", "Globe"],
					Title: T("home:features.item.cicdIntegration.title", {
						defaultValue: "Modern Tooling",
					}),
					Description: T(
						"home:features.item.cicdIntegration.description",
						{
							defaultValue:
								"Built on proven open-source technologies: Rust, Tauri, Effect-TS, and the VS Code platform.\nFamiliar and powerful.",
						},
					),
				},
				{
					Id: "opensource",
					Icon: "Heart",
					Icons: ["Heart", "Globe", "Shield"],
					Title: T("home:features.item.collaboration.title", {
						defaultValue: "Open Source",
					}),
					Description: T(
						"home:features.item.collaboration.description",
						{
							defaultValue:
								"Licensed under Creative Commons CC0 - completely free to use, modify, and distribute.\nNo strings attached.",
						},
					),
				},
			],
			Columns: 3,
			Gap: "lg",
		},
		Pricing: {
			Title: T("home:roadmap.title", {
				defaultValue: "Roadmap & Expectancy",
			}),
			Subtitle: T("home:roadmap.subtitle", {
				defaultValue:
					"Funded by the NGI0 Commons Fund.\nOpen source, free forever, built in public.",
			}),
			Tiers: [
				{
					Id: "current",
					Name: T("home:roadmap.tiers.current.name", {
						defaultValue: "Current Phase",
					}),
					Description: T("home:roadmap.tiers.current.description", {
						defaultValue:
							"Foundation and core editor scaffold.\nActive development.",
					}),
					Price: { Monthly: 0, Yearly: 0 },
					Features: [
						T("home:roadmap.tiers.current.features.1", {
							defaultValue: "Mountain: Rust/Tauri native backend",
						}),
						T("home:roadmap.tiers.current.features.2", {
							defaultValue:
								"Cocoon: VS Code extension host via Effect-TS",
						}),
						T("home:roadmap.tiers.current.features.3", {
							defaultValue: "Wind: Workbench re-implementation",
						}),
						T("home:roadmap.tiers.current.features.4", {
							defaultValue: "Sky: Editor interface rendering",
						}),
						T("home:roadmap.tiers.current.features.5", {
							defaultValue:
								"Air: Update daemon and crypto signing",
						}),
						T("home:roadmap.tiers.current.features.6", {
							defaultValue: "Echo: Work-stealing task scheduler",
						}),
					],
					CTA: {
						Text: T("home:roadmap.tiers.current.button", {
							defaultValue: "View on GitHub",
						}),
						Variant: "default",
						Href: "https://github.com/CodeEditorLand/Land",
					},
					Popular: true,
				},
				{
					Id: "next",
					Name: T("home:roadmap.tiers.next.name", {
						defaultValue: "Next Milestone",
					}),
					Description: T("home:roadmap.tiers.next.description", {
						defaultValue:
							"Extension ecosystem and platform stability.",
					}),
					Price: { Monthly: 0, Yearly: 0 },
					Features: [
						T("home:roadmap.tiers.next.features.1", {
							defaultValue:
								"High-fidelity VS Code extension compatibility",
						}),
						T("home:roadmap.tiers.next.features.2", {
							defaultValue:
								"Cross-platform installer and auto-update",
						}),
						T("home:roadmap.tiers.next.features.3", {
							defaultValue: "gRPC IPC protocol finalization",
						}),
						T("home:roadmap.tiers.next.features.4", {
							defaultValue:
								"Settings sync and cloud-optional portal",
						}),
					],
					CTA: {
						Text: T("home:roadmap.tiers.next.button", {
							defaultValue: "Track Progress",
						}),
						Variant: "outline",
						Href: "https://github.com/CodeEditorLand/Land/milestones",
					},
					Popular: false,
				},
				{
					Id: "future",
					Name: T("home:roadmap.tiers.future.name", {
						defaultValue: "Long-Term Vision",
					}),
					Description: T("home:roadmap.tiers.future.description", {
						defaultValue:
							"Full-featured editor replacing Electron-based tools.",
					}),
					Price: { Monthly: 0, Yearly: 0 },
					Features: [
						T("home:roadmap.tiers.future.features.1", {
							defaultValue:
								"Native mobile editing (iOS, Android)",
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
					CTA: {
						Text: T("home:roadmap.tiers.future.button", {
							defaultValue: "Learn More",
						}),
						Variant: "outline",
						Href: "https://github.com/CodeEditorLand/Land#readme",
					},
					Popular: false,
				},
			],
		},
		Testimonials: {
			Title: T("home:architecture.title", {
				defaultValue: "Architecture",
			}),
			Subtitle: T("home:architecture.subtitle", {
				defaultValue:
					"Land replaces VS Code's Electron stack with a modular, high-performance architecture.\nEach element is a standalone repository.",
			}),
			Testimonials: [
				{
					Id: "mountain",
					Quote: T("home:architecture.mountain.description", {
						defaultValue:
							"Manages Window, File System, and Process lifecycle.\nThe native Rust/Tauri backend that replaces Electron's main process.",
					}),
					Author: "Mountain",
					Role: T("home:architecture.mountain.subtitle", {
						defaultValue: "Rust/Tauri native backend",
					}),
				},
				{
					Id: "cocoon",
					Quote: T("home:architecture.cocoon.description", {
						defaultValue:
							"Runs VS Code extensions via Effect-TS with high-fidelity API compatibility.\nNo changes needed to existing extensions.",
					}),
					Author: "Cocoon",
					Role: T("home:architecture.cocoon.subtitle", {
						defaultValue: "TypeScript extension host",
					}),
				},
				{
					Id: "wind",
					Quote: T("home:architecture.wind.description", {
						defaultValue:
							"Re-implementation of the VS Code Workbench.\nProvides the editor shell, panels, sidebars, and activity bar.",
					}),
					Author: "Wind",
					Role: T("home:architecture.wind.subtitle", {
						defaultValue: "TypeScript UI service",
					}),
				},
				{
					Id: "sky",
					Quote: T("home:architecture.sky.description", {
						defaultValue:
							"Renders the editor interface using Astro components.\nHandles themes, layouts, and the visual presentation layer.",
					}),
					Author: "Sky",
					Role: T("home:architecture.sky.subtitle", {
						defaultValue: "Astro UI component",
					}),
				},
				{
					Id: "air",
					Quote: T("home:architecture.air.description", {
						defaultValue:
							"Background daemon for automatic updates, downloads, and cryptographic signing.\nKeeps Land up to date silently.",
					}),
					Author: "Air",
					Role: T("home:architecture.air.subtitle", {
						defaultValue: "Rust background daemon",
					}),
				},
				{
					Id: "echo",
					Quote: T("home:architecture.echo.description", {
						defaultValue:
							"High-performance work-stealing executor.\nSchedules and distributes tasks across cores for maximum throughput.",
					}),
					Author: "Echo",
					Role: T("home:architecture.echo.subtitle", {
						defaultValue: "Rust task scheduler",
					}),
				},
			],
			Columns: 3,
		},
		Download: {
			Title: T("download:title", { defaultValue: "Download Land" }),
			Subtitle: T("download:subtitle", {
				defaultValue:
					"Available for macOS, Windows, and Linux.\nBuilt with Tauri, powered by Rust.",
			}),
			Platforms: [
				{
					Id: "macos",
					Name: T("download:card.platform.macos.title", {
						defaultValue: "macOS",
					}),
					Icon: "Apple" as const,
					Description: T(
						"download:card.platform.macos.universalBadge",
						{
							defaultValue: "Universal Binary",
						},
					),
					Version: "Pre-release",
					Size: "Coming Soon",
				},
				{
					Id: "windows",
					Name: T("download:card.platform.windows.title", {
						defaultValue: "Windows",
					}),
					Icon: "Monitor" as const,
					Description: T(
						"download:card.platform.windows.description",
						{
							defaultValue: "64-bit (x64)",
						},
					),
					Version: "Pre-release",
					Size: "Coming Soon",
				},
				{
					Id: "linux",
					Name: T("download:card.platform.linux.title", {
						defaultValue: "Linux",
					}),
					Icon: "Terminal" as const,
					Description: T("download:card.platform.linux.description", {
						defaultValue: "DEB, RPM, AppImage",
					}),
					Version: "Pre-release",
					Size: "Coming Soon",
				},
			],
			ShowVerification: true,
			OnDownload: async (Platform: { name: string; id?: string }) => {
				if (Platform.id) {
					try {
						const { default: DownloadAPI } =
							await import("../../Library/API/Download.js");
						const Information = await DownloadAPI.GetInfo(
							Platform.id,
						);
						window.open(Information.downloadUrl, "_blank");
						await DownloadAPI.TrackDownload(Platform.id);
					} catch (DownloadError) {
						console.error("Download failed:", DownloadError);
						alert(
							T("download:labels.downloadFailed", {
								defaultValue:
									"Download failed. Please try again.",
							}),
						);
					}
				}
			},
		},
		Footer: {
			Brand: {
				Name: T("common:brand.name", {
					defaultValue: "Land",
				}),
				Description: T("common:brand.tagline", {
					defaultValue:
						"The next-generation code editor.\nOpen source and free forever.",
				}),
			},
			Social: {
				GitHub: "https://github.com/CodeEditorLand/Land",
			},
			Columns: [
				{
					Title: T("footer:columns.product.title", {
						defaultValue: "Product",
					}),
					Links: [
						{
							Label: T("footer:columns.product.features", {
								defaultValue: "Features",
							}),
							Href: "/#features",
						},
						{
							Label: T("footer:columns.product.downloads", {
								defaultValue: "Download",
							}),
							Href: "/Download",
						},
						{
							Label: T("footer:columns.product.docs", {
								defaultValue: "Docs",
							}),
							Href: "https://github.com/CodeEditorLand/Land#readme",
						},
					],
				},
				{
					Title: T("footer:columns.company.title", {
						defaultValue: "Community",
					}),
					Links: [
						{
							Label: T("footer:columns.company.github", {
								defaultValue: "GitHub",
							}),
							Href: "https://github.com/CodeEditorLand/Land",
						},
						{
							Label: T("footer:columns.company.issues", {
								defaultValue: "Issues",
							}),
							Href: "https://github.com/CodeEditorLand/Land/issues",
						},
						{
							Label: T("footer:columns.company.contributing", {
								defaultValue: "Contributing",
							}),
							Href: "https://github.com/CodeEditorLand/Land/blob/Current/CONTRIBUTING.md",
						},
					],
				},
				{
					Title: T("footer:columns.legal.title", {
						defaultValue: "Legal",
					}),
					Links: [
						{
							Label: T("footer:columns.legal.privacy", {
								defaultValue: "Privacy",
							}),
							Href: "/Legal/Privacy",
						},
						{
							Label: T("footer:columns.legal.terms", {
								defaultValue: "Terms",
							}),
							Href: "/Legal/Term",
						},
						{
							Label: T("footer:columns.legal.license", {
								defaultValue: "License",
							}),
							Href: "/License",
						},
					],
				},
			],
			BottomBar: { MadeWith: true },
		},
	};

	const {
		Hero,
		Features,
		Pricing,
		Testimonials,
		Download,
		Header: HeaderContent,
	} = ResolvedContent;

	return (
		<div className={`flex min-h-screen flex-col ${ClassName || ""}`}>
			{HeaderContent !== undefined && <Header content={HeaderContent} />}

			<div className="flex-1" role="region" aria-label="Page content">
				<ErrorBoundary
					FallbackComponent={() => (
						<SkeletonFeatureCard className="min-h-[60dvh]" />
					)}>
					<DynamicHeroSection Content={Hero} />
				</ErrorBoundary>
				<div className="py-12" />
				<ErrorBoundary
					FallbackComponent={() => (
						<div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
							{[1, 2, 3, 4, 5, 6].map((Index) => (
								<SkeletonFeatureCard key={Index} />
							))}
						</div>
					)}>
					<DynamicFeatures Content={Features} />
				</ErrorBoundary>
				<div className="py-16" />
				<ErrorBoundary
					FallbackComponent={() => (
						<div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
							{[1, 2, 3].map((Index) => (
								<SkeletonPricingTier key={Index} />
							))}
						</div>
					)}>
					<DynamicPricing Content={Pricing} />
				</ErrorBoundary>
				<div className="py-16" />
				<ErrorBoundary
					FallbackComponent={() => (
						<div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
							{[1, 2, 3].map((Index) => (
								<SkeletonCard key={Index} />
							))}
						</div>
					)}>
					<DynamicTestimonials Content={Testimonials} />
				</ErrorBoundary>
				<div className="py-16" />
				<ErrorBoundary
					FallbackComponent={() => (
						<SkeletonCard className="min-h-[30dvh]" />
					)}>
					<DynamicPlatformGrid Content={Download} />
				</ErrorBoundary>
			</div>
		</div>
	);
};

export { HomePage };

export default HomePage;
