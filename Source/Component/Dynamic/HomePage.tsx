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
					defaultValue: "Native Speed \u00b7 No Electron \u00b7 CC0",
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
					"Stop handing VS Code a gigabyte of RAM.\n\nLand is built on Rust, Tauri, and Effect-TS. Fast enough that you notice immediately.",
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
					Tooltip: "Runs at native CPU speed. Zero Electron overhead.",
					Colors: ["var(--ExtensionRust)", "var(--Mute)"],
				},
				{
					Id: "2",
					Title: "Tauri UI",
					Tooltip: "30\u00d7 lighter than Electron, native look on every OS",
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
					Tooltip: "Type errors caught at compile time, not in production",
					Colors: [
						"var(--ExtensionEffectTypeScript)",
						"var(--ExtensionEffectTypeScriptFore)",
						"var(--ExtensionEffectTypeScriptMute)",
					],
				},
				{
					Id: "4",
					Title: "gRPC IPC",
					Tooltip: "Sub-millisecond communication between processes",
					Colors: ["var(--SpinegRPC)", "var(--SpineIPC)"],
				},
				{
					Id: "5",
					Title: "Extension Host",
					Tooltip: "Your VS Code extensions run completely unchanged",
					Colors: ["var(--TierProvider)"],
				},
				{
					Id: "6",
					Title: "Cross-Platform",
					Tooltip: "One codebase, native on macOS, Windows, and Linux",
					Colors: [
						"var(--OSMacOS)",
						"var(--OSWindows)",
						"var(--OSLinux)",
					],
				},
				{
					Id: "7",
					Title: "VS Code API",
					Tooltip: "Full VS Code API surface. No extension rewrites needed.",
					Colors: ["var(--SpineIPC)"],
				},
				{
					Id: "8",
					Title: "Open Source CC0",
					Tooltip: "Free to use, fork, and ship. No restrictions, ever.",
					Colors: ["var(--SpinegRPC)", "var(--ExtensionTauri)"],
				},
			],
			ShowConnectingLines: true,
			ShowParticles: true,
			RespectReducedMotion: true,
		},
		Features: {
			Title: T("home:features.title", {
				defaultValue: "Built Different. Measurably Better.",
			}),
			Subtitle: T("home:features.subtitle", {
				defaultValue:
					"Six features that explain why Land is faster, safer, and more open than every Electron-based editor.",
			}),
			Features: [
				{
					Id: "performance",
					Icon: "Zap",
					Icons: ["Zap", "Cpu", "Server"],
					Title: T("home:features.item.designTokens.title", {
						defaultValue: "No Lag, Ever",
					}),
					Description: T(
						"home:features.item.designTokens.description",
						{
							defaultValue:
								"Stop handing VS Code a gigabyte of RAM just to open a file.\n\nLand's Rust core with gRPC IPC responds in microseconds. Even with hundreds of files open.",
						},
					),
				},
				{
					Id: "compatibility",
					Icon: "Box",
					Icons: ["Box", "Puzzle", "Code"],
					Title: T("home:features.item.componentLibrary.title", {
						defaultValue: "Your Extensions, Unchanged",
					}),
					Description: T(
						"home:features.item.componentLibrary.description",
						{
							defaultValue:
								"Your entire VS Code extension library works out of the box.\n\nThe Cocoon host mirrors the full VS Code API surface. Nothing needs rewriting.",
						},
					),
				},
				{
					Id: "architecture",
					Icon: "Cpu",
					Icons: ["Cpu", "Layers", "Shield"],
					Title: T("home:features.item.documentation.title", {
						defaultValue: "Type-Safe End to End",
					}),
					Description: T(
						"home:features.item.documentation.description",
						{
							defaultValue:
								"Effect-TS gives you typed services, structured concurrency, and traced errors.\n\nBugs are caught at compile time, not at 3 am.",
						},
					),
				},
				{
					Id: "cross-platform",
					Icon: "Globe",
					Icons: ["Globe", "Package", "Database"],
					Title: T("home:features.item.versionControl.title", {
						defaultValue: "One Build, Every Platform",
					}),
					Description: T(
						"home:features.item.versionControl.description",
						{
							defaultValue:
								"One codebase compiles to fully native apps on macOS, Windows, and Linux via Tauri.\n\nPublish to all three platforms with a single command.",
						},
					),
				},
				{
					Id: "tooling",
					Icon: "Wrench",
					Icons: ["Wrench", "Cpu", "Globe"],
					Title: T("home:features.item.cicdIntegration.title", {
						defaultValue: "Best-in-Class Toolchain",
					}),
					Description: T(
						"home:features.item.cicdIntegration.description",
						{
							defaultValue:
								"Rust, Tauri, Effect-TS, and Biome form a stack chosen for correctness and developer velocity.\n\nFamiliar tools, no compromises.",
						},
					),
				},
				{
					Id: "opensource",
					Icon: "Heart",
					Icons: ["Heart", "Globe", "Shield"],
					Title: T("home:features.item.collaboration.title", {
						defaultValue: "Free Forever, No Strings",
					}),
					Description: T(
						"home:features.item.collaboration.description",
						{
							defaultValue:
								"CC0 public domain. Use it, fork it, ship it, even sell it.\n\nNLnet-funded and built entirely in the open.",
						},
					),
				},
			],
			Columns: 3,
			Gap: "lg",
		},
		Pricing: {
			Title: T("home:roadmap.title", {
				defaultValue: "Roadmap & What to Expect",
			}),
			Subtitle: T("home:roadmap.subtitle", {
				defaultValue:
					"Funded by NLnet NGI0 Commons Fund.\n\nBuilt in public, free forever, no roadmap surprises.",
			}),
			Tiers: [
				{
					Id: "current",
					Name: T("home:roadmap.tiers.current.name", {
						defaultValue: "Active Now",
					}),
					Description: T("home:roadmap.tiers.current.description", {
						defaultValue:
							"The six core elements are in active development. Each is a standalone repository you can inspect and contribute to today.",
					}),
					Price: { Monthly: 0, Yearly: 0 },
					Features: [
						T("home:roadmap.tiers.current.features.1", {
							defaultValue: "Mountain: native process manager, replaces Electron",
						}),
						T("home:roadmap.tiers.current.features.2", {
							defaultValue:
								"Cocoon: extension host, your VS Code extensions work unchanged",
						}),
						T("home:roadmap.tiers.current.features.3", {
							defaultValue: "Wind: full workbench shell, panels and sidebars",
						}),
						T("home:roadmap.tiers.current.features.4", {
							defaultValue: "Sky: visual layer, themes and layouts",
						}),
						T("home:roadmap.tiers.current.features.5", {
							defaultValue:
								"Air: silent updates, cryptographically signed",
						}),
						T("home:roadmap.tiers.current.features.6", {
							defaultValue: "Echo: work-stealing scheduler, uses every CPU core",
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
						defaultValue: "Coming Next",
					}),
					Description: T("home:roadmap.tiers.next.description", {
						defaultValue:
							"Extension ecosystem polish and first stable release across all three platforms.",
					}),
					Price: { Monthly: 0, Yearly: 0 },
					Features: [
						T("home:roadmap.tiers.next.features.1", {
							defaultValue:
								"High-fidelity VS Code extension compatibility pass",
						}),
						T("home:roadmap.tiers.next.features.2", {
							defaultValue:
								"Cross-platform installer with silent auto-update",
						}),
						T("home:roadmap.tiers.next.features.3", {
							defaultValue: "gRPC IPC protocol finalized and documented",
						}),
						T("home:roadmap.tiers.next.features.4", {
							defaultValue:
								"Settings sync with cloud-optional portal",
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
							"A full-featured, Electron-free editor that handles every workflow a modern developer needs.",
					}),
					Price: { Monthly: 0, Yearly: 0 },
					Features: [
						T("home:roadmap.tiers.future.features.1", {
							defaultValue:
								"Native mobile editing: iOS and Android",
						}),
						T("home:roadmap.tiers.future.features.2", {
							defaultValue: "Collaborative real-time editing built in",
						}),
						T("home:roadmap.tiers.future.features.3", {
							defaultValue: "AI-assisted development, privacy-first",
						}),
						T("home:roadmap.tiers.future.features.4", {
							defaultValue: "Open plugin marketplace and extension ecosystem",
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
				defaultValue: "Under the Hood",
			}),
			Subtitle: T("home:architecture.subtitle", {
				defaultValue:
					"Land replaces VS Code's Electron stack element by element.\n\nEach component is a standalone open-source repository you can read, fork, or contribute to.",
			}),
			Testimonials: [
				{
					Id: "mountain",
					Quote: T("home:architecture.mountain.description", {
						defaultValue:
							"Replaces Electron's main process with a native Rust/Tauri backend.\n\nWindow, file system, and process lifecycle run at native speed with no JavaScript overhead.",
					}),
					Author: "Mountain",
					Role: T("home:architecture.mountain.subtitle", {
						defaultValue: "Native speed without Electron overhead",
					}),
				},
				{
					Id: "cocoon",
					Quote: T("home:architecture.cocoon.description", {
						defaultValue:
							"Runs your existing VS Code extensions via Effect-TS with high-fidelity API compatibility.\n\nInstall them and they just work. No rewrites, no patches.",
					}),
					Author: "Cocoon",
					Role: T("home:architecture.cocoon.subtitle", {
						defaultValue: "Your extensions, completely unchanged",
					}),
				},
				{
					Id: "wind",
					Quote: T("home:architecture.wind.description", {
						defaultValue:
							"A clean re-implementation of the VS Code Workbench in TypeScript.\n\nPanels, sidebars, and the activity bar. Familiar layout, no Electron dependency.",
					}),
					Author: "Wind",
					Role: T("home:architecture.wind.subtitle", {
						defaultValue: "Full workbench shell, rebuilt clean",
					}),
				},
				{
					Id: "sky",
					Quote: T("home:architecture.sky.description", {
						defaultValue:
							"Renders the editor UI using Astro components.\n\nThemes, layouts, and the visual layer load fast and stay consistent across platforms.",
					}),
					Author: "Sky",
					Role: T("home:architecture.sky.subtitle", {
						defaultValue: "Themes and layouts, fast by default",
					}),
				},
				{
					Id: "air",
					Quote: T("home:architecture.air.description", {
						defaultValue:
							"A background daemon that keeps Land current without interrupting you.\n\nEvery update is cryptographically signed before it is applied.",
					}),
					Author: "Air",
					Role: T("home:architecture.air.subtitle", {
						defaultValue: "Silent updates, always signed",
					}),
				},
				{
					Id: "echo",
					Quote: T("home:architecture.echo.description", {
						defaultValue:
							"A work-stealing task executor that saturates every CPU core.\n\nHeavy indexing and analysis happen in the background. The editor stays responsive.",
					}),
					Author: "Echo",
					Role: T("home:architecture.echo.subtitle", {
						defaultValue: "Uses every CPU core you have",
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
