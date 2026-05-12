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
					defaultValue: "No Electron   No Chromium   CC0",
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
					"VS Code runs on Electron. Land is rebuilding the editor stack around Rust, Tauri, and Effect-TS while keeping the VS Code extension API as the compatibility target.\n\nThe primary path is source-build first today, with public installers and long-tail extension coverage still in progress.",
			}),
			PrimaryCta: {
				Text: T("common:button.download", {
					defaultValue: "Download Land Free",
				}),
				Variant: "default",
				Size: "lg",
				Icon: "Download",
				Href: "/Download",
			},
			SecondaryCta: {
				Text: T("common:button.learnMore", {
					defaultValue: "See What Makes Land Different",
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
					Tooltip:
						"Native backend code for editor services, IPC, files, terminals, and process control.",
					Colors: ["var(--ExtensionRust)", "var(--Mute)"],
				},
				{
					Id: "2",
					Title: "Tauri UI",
					Tooltip:
						"Uses the operating system WebView instead of bundling Chromium.",
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
					Tooltip:
						"Typed services, scoped resources, cancellation, and supervised async work.",
					Colors: [
						"var(--ExtensionEffectTypeScript)",
						"var(--ExtensionEffectTypeScriptFore)",
						"var(--ExtensionEffectTypeScriptMute)",
					],
				},
				{
					Id: "4",
					Title: "gRPC IPC",
					Tooltip:
						"Typed protocol surfaces between Mountain, Cocoon, Air, and related services.",
					Colors: ["var(--SpinegRPC)", "var(--SpineIPC)"],
				},
				{
					Id: "5",
					Title: "Extension Host",
					Tooltip:
						"Unmodified VS Code extensions run through Cocoon when their API surface is implemented.",
					Colors: ["var(--TierProvider)"],
				},
				{
					Id: "6",
					Title: "Cross-Platform",
					Tooltip:
						"Source and Tauri bundle configuration target macOS, Windows, and Linux.",
					Colors: [
						"var(--OSMacOS)",
						"var(--OSWindows)",
						"var(--OSLinux)",
					],
				},
				{
					Id: "7",
					Title: "VS Code API",
					Tooltip:
						"Compatibility target for commands, workspace, windows, terminals, webviews, language features, and extension activation.",
					Colors: ["var(--SpineIPC)"],
				},
				{
					Id: "8",
					Title: "Open Source CC0",
					Tooltip:
						"Free to use, fork, and ship. No restrictions, ever.",
					Colors: ["var(--SpinegRPC)", "var(--ExtensionTauri)"],
				},
			],
			ShowConnectingLines: true,
			ShowParticles: true,
			RespectReducedMotion: true,
		},
		Features: {
			Title: T("home:features.title", {
				defaultValue: "VS Code. Without Electron.",
			}),
			Subtitle: T("home:features.subtitle", {
				defaultValue:
					"The editor pieces are being rebuilt around native services, typed IPC, and a compatibility host that can be checked against real source.",
			}),
			Features: [
				{
					Id: "performance",
					Icon: "Zap",
					Icons: ["/Image/Rust.svg", "/Image/Tauri.svg", "Zap"],
					Title: T("home:features.item.designTokens.title", {
						defaultValue: "Native services where they count.",
					}),
					Description: T(
						"home:features.item.designTokens.description",
						{
							defaultValue:
								"Mountain contains Rust services for windows, files, terminals, child processes, clipboard, and extension IPC. Echo provides scheduler primitives for bounded background work.\n\nThat gives Land a native path to move heavy editor work out of the WebView without claiming public benchmark numbers before a reproducible suite exists.",
						},
					),
				},
				{
					Id: "compatibility",
					Icon: "Box",
					Icons: ["/Image/EffectTS.svg", "Box", "Puzzle"],
					Title: T("home:features.item.componentLibrary.title", {
						defaultValue: "Unmodified extensions, no fork path.",
					}),
					Description: T(
						"home:features.item.componentLibrary.description",
						{
							defaultValue:
								"Cocoon hosts existing VS Code extension code and provides the `vscode` API shim. Mountain scans installed extensions, reads manifests, handles VSIX install and uninstall routes, and notifies Cocoon when extensions change.\n\nThat supports a strong claim: extensions run unmodified through the active compatibility path. Marketplace-wide coverage still depends on each extension's API usage and on services that are still being filled in.",
						},
					),
				},
				{
					Id: "architecture",
					Icon: "Cpu",
					Icons: [
						"/Image/EffectTS.svg",
						"/Image/TypeScript.svg",
						"Layers",
					],
					Title: T("home:features.item.documentation.title", {
						defaultValue: "Fibers, not Promises.",
					}),
					Description: T(
						"home:features.item.documentation.description",
						{
							defaultValue:
								"Effect-TS gives Cocoon typed errors, scoped resources, cancellation, and supervised concurrency for extension-host work.\n\nThat does not magically remove every runtime bug, but it does make failure paths explicit in the services Land controls.",
						},
					),
				},
				{
					Id: "cross-platform",
					Icon: "Globe",
					Icons: ["/Image/Tauri.svg", "Globe", "Package"],
					Title: T("home:features.item.versionControl.title", {
						defaultValue: "One source tree, configured targets.",
					}),
					Description: T(
						"home:features.item.versionControl.description",
						{
							defaultValue:
								"Tauri uses the operating system WebView on each platform, so the Mountain desktop path does not bundle Chromium.\n\nThe repository includes macOS, Windows, and Linux build configuration. Public installer coverage is still being completed.",
						},
					),
				},
				{
					Id: "tooling",
					Icon: "Wrench",
					Icons: [
						"/Image/Rust.svg",
						"/Image/Biome.svg",
						"/Image/EffectTS.svg",
					],
					Title: T("home:features.item.cicdIntegration.title", {
						defaultValue: "Update plumbing in progress.",
					}),
					Description: T(
						"home:features.item.cicdIntegration.description",
						{
							defaultValue:
								"Air contains Rust services for update checks, downloads, authentication, indexing, health, and a Vine gRPC server.\n\nThose services are real source today. The public updater flow, signing story, and release distribution path are still being finished.",
						},
					),
				},
				{
					Id: "opensource",
					Icon: "Heart",
					Icons: ["/Image/CC0.svg", "/Image/NLnet.svg", "Heart"],
					Title: T("home:features.item.collaboration.title", {
						defaultValue: "CC0. No restrictions.",
					}),
					Description: T(
						"home:features.item.collaboration.description",
						{
							defaultValue:
								"Most open source editors have license clauses that restrict commercial use, require attribution, or forbid forking the UI.\n\nThe entire Land codebase is CC0 public domain. Use it, fork it, ship it, build commercial products on top of it. No attribution required. No compliance headaches.",
						},
					),
				},
			],
			Columns: 3,
			Gap: "lg",
		},
		Pricing: {
			Title: T("home:roadmap.title", {
				defaultValue:
					"The Architecture Is Built. Here Is What Comes Next.",
			}),
			Subtitle: T("home:roadmap.subtitle", {
				defaultValue:
					"Funded by NLnet NGI0 Commons Fund.\n\nEvery milestone is described as source status, integration status, or release work so the website does not outrun the code.",
			}),
			Tiers: [
				{
					Id: "free",
					Name: T("home:roadmap.tiers.current.name", {
						defaultValue: "Active Now",
					}),
					Description: T("home:roadmap.tiers.current.description", {
						defaultValue:
							"The fifteen element directories are present in the Land workspace. The active desktop path is Mountain, Cocoon, Sky, Wind, Vine, Common, Echo, Air, Mist, Rest, Output, SideCar, and Maintain. Grove and Worker are present with integration scope that differs by build profile.",
					}),
					Price: { Monthly: 0, Yearly: 0 },
					Elements: [
						T("home:roadmap.tiers.current.elements.mountain", {
							defaultValue:
								"Mountain ⛰️\nNative Backend\nReplaces Electron main process, no bundled Chromium",
						}),
						T("home:roadmap.tiers.current.elements.cocoon", {
							defaultValue:
								"Cocoon 🦋\nExtension Host\nUnmodified VS Code extensions through Effect-TS routes",
						}),
						T("home:roadmap.tiers.current.elements.wind", {
							defaultValue:
								"Wind 🍃\nWorkbench Shell\nEffect-TS layers for native workbench services",
						}),
						T("home:roadmap.tiers.current.elements.sky", {
							defaultValue:
								"Sky 🌌\nAstro UI Layer\nWorkbench routes and WebView bridge",
						}),
						T("home:roadmap.tiers.current.elements.air", {
							defaultValue:
								"Air 🪁\nBackground Services\nUpdates, downloads, auth, indexing, and health",
						}),
						T("home:roadmap.tiers.current.elements.echo", {
							defaultValue:
								"Echo 📣\nScheduler Primitives\nBounded background work for Rust services",
						}),
					],
					Features: [
						T("home:roadmap.tiers.current.features.1", {
							defaultValue:
								"Installed extensions run unmodified through Cocoon",
						}),
						T("home:roadmap.tiers.current.features.2", {
							defaultValue:
								"Tauri desktop path uses the operating system WebView",
						}),
						T("home:roadmap.tiers.current.features.3", {
							defaultValue:
								"Effect fibers for cancellable service work",
						}),
						T("home:roadmap.tiers.current.features.4", {
							defaultValue:
								"Telemetry features are compile-gated in Rust",
						}),
						T("home:roadmap.tiers.current.features.5", {
							defaultValue: "CC0 public domain no restrictions",
						}),
						T("home:roadmap.tiers.current.features.6", {
							defaultValue:
								"macOS primary path, Windows and Linux configured",
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
					Id: "progress",
					Name: T("home:roadmap.tiers.future.name", {
						defaultValue: "v1.0",
					}),
					Status: "WIP",
					Description: T("home:roadmap.tiers.future.description", {
						defaultValue:
							"Active milestones across the element repos. These items are integration and release goals, not claims that the public build already ships them.",
					}),
					Price: { Monthly: 0, Yearly: 0 },
					Elements: [
						T("home:roadmap.tiers.future.elements.vine", {
							defaultValue:
								"Vine 🌿\nProtocol In Progress\nMountain, Cocoon, Air, and Grove contracts",
						}),
						T("home:roadmap.tiers.future.elements.cocoon", {
							defaultValue:
								"Cocoon 🦋\nExtension Compatibility Pass\nLong-tail VS Code API coverage",
						}),
						T("home:roadmap.tiers.future.elements.grove", {
							defaultValue:
								"Grove 🌳\nWASM Host Stabilizing\nCapability-based extension isolation path",
						}),
						T("home:roadmap.tiers.future.elements.rest", {
							defaultValue:
								"Rest ⛱️\nSource Map Support\nOXC transformer integration in progress",
						}),
						T("home:roadmap.tiers.future.elements.echo", {
							defaultValue:
								"Echo 📣\nScheduler Optimization\nFaster steal, lower latency",
						}),
						T("home:roadmap.tiers.future.elements.air", {
							defaultValue:
								"Air 🪁\nRelease Delivery\nSigning and distribution path",
						}),
					],
					Features: [
						T("home:roadmap.tiers.future.features.1", {
							defaultValue:
								"Marketplace installation path under review",
						}),
						T("home:roadmap.tiers.future.features.2", {
							defaultValue: "Grove Wasmtime host integration",
						}),
						T("home:roadmap.tiers.future.features.3", {
							defaultValue: "Vine typed IPC coverage expanding",
						}),
						T("home:roadmap.tiers.future.features.4", {
							defaultValue:
								"Cross-platform public installers via Tauri",
						}),
						T("home:roadmap.tiers.future.features.5", {
							defaultValue: "Source map generation via OXC",
						}),
						T("home:roadmap.tiers.future.features.6", {
							defaultValue:
								"Download distribution and verification publishing",
						}),
					],
					CTA: {
						Text: T("home:roadmap.tiers.future.button", {
							defaultValue: "Track Progress",
						}),
						Variant: "outline",
						Href: "https://github.com/CodeEditorLand/Land/milestones",
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
					"Land replaces VS Code's Electron stack element by element.\n\nThe element directories are inspectable in source, but each one is described here by what the current code supports or is actively wiring.",
			}),
			Testimonials: [
				{
					Id: "Air",
					Emoji: "\uD83E\uDE81",
					Href: "https://github.com/CodeEditorLand/Air",
					Author: "Air",
					Role: T("home:architecture.air.subtitle", {
						defaultValue:
							"Background Services - Downloader - Workspace Indexer",
					}),
					Quote: T("home:architecture.air.description", {
						defaultValue:
							"Rust services for downloads, updates, authentication, indexing, resilience, health, and Vine IPC\nRelease signing and public installer delivery are still being completed\nDesigned to keep update and indexing work outside the main editor surface",
					}),
				},
				{
					Id: "Cocoon",
					Emoji: "\uD83E\uDD8B",
					Href: "https://github.com/CodeEditorLand/Cocoon",
					Author: "Cocoon",
					Role: T("home:architecture.cocoon.subtitle", {
						defaultValue:
							"Extension Host - Unmodified VS Code Extensions - Effect-TS Services",
					}),
					Quote: T("home:architecture.cocoon.description", {
						defaultValue:
							"Node.js sidecar for VS Code extension-host compatibility\nRuns existing extension entry points without rewriting their source\nRoutes implemented API calls through Effect-TS services and the Mountain bridge\nCore commands, workspace, window, terminal, webview, and language-provider surfaces exist in source",
					}),
				},
				{
					Id: "Common",
					Emoji: "\uD83D\uDC68\uD83C\uDFFB\u200D\uD83C\uDFED",
					Href: "https://github.com/CodeEditorLand/Common",
					Author: "Common",
					Role: T("home:architecture.common.subtitle", {
						defaultValue:
							"Shared Foundation - Traits - Cross-Element Types",
					}),
					Quote: T("home:architecture.common.description", {
						defaultValue:
							"Shared Rust crate and TypeScript package for cross-element contracts\nDefines reusable traits, DTOs, utility types, and service boundaries\nNot a standalone runtime process\nKeeps shared interfaces visible instead of scattering them through elements",
					}),
				},
				{
					Id: "Echo",
					Emoji: "\uD83D\uDCE3",
					Href: "https://github.com/CodeEditorLand/Echo",
					Author: "Echo",
					Role: T("home:architecture.echo.subtitle", {
						defaultValue:
							"Work-Stealing Scheduler - crossbeam-deque - Supervised Worker Pool",
					}),
					Quote: T("home:architecture.echo.description", {
						defaultValue:
							"Scheduler primitives built around supervised Rust worker pools\nUsed by native services that need bounded background execution\nThe source supports cancellation and shutdown paths without promising that every workload already routes through Echo",
					}),
				},
				{
					Id: "Grove",
					Emoji: "\uD83C\uDF33",
					Href: "https://github.com/CodeEditorLand/Grove",
					Author: "Grove",
					Role: T("home:architecture.grove.subtitle", {
						defaultValue:
							"WASM Sandbox - Wasmtime Runtime - Capability-Based Isolation",
					}),
					Quote: T("home:architecture.grove.description", {
						defaultValue:
							"Contains a Wasmtime-backed WebAssembly host path and Grove gRPC protocol definitions\nIncludes transport and capability-oriented modules for extension isolation work\nPrimary VS Code compatibility still runs through Cocoon while Grove integration matures",
					}),
				},
				{
					Id: "Maintain",
					Emoji: "\uD83D\uDCAA\uD83C\uDFFB",
					Href: "https://github.com/CodeEditorLand/Maintain",
					Author: "Maintain",
					Role: T("home:architecture.maintain.subtitle", {
						defaultValue:
							"Build Orchestrator - Configuration - Release Profiles",
					}),
					Quote: T("home:architecture.maintain.description", {
						defaultValue:
							"Coordinates development, debug, and release build profiles across Land elements\nKeeps profile names and build scripts visible for contributors\nDeterministic release claims are held until the public release pipeline is fully published",
					}),
				},
				{
					Id: "Mist",
					Emoji: "\uD83C\uDF2B\uFE0F",
					Href: "https://github.com/CodeEditorLand/Mist",
					Author: "Mist",
					Role: T("home:architecture.mist.subtitle", {
						defaultValue:
							"Local DNS Sandbox - *.editor.land Resolution - Network Boundary",
					}),
					Quote: T("home:architecture.mist.description", {
						defaultValue:
							"Provides local DNS, resolver, WebSocket, zone, and forward-security code\nMountain has a native Mist feature path, but not every internal route flows through Mist yet\nThe goal is a clean local service boundary without exposing private service names publicly",
					}),
				},
				{
					Id: "Mountain",
					Emoji: "\u26F0\uFE0F",
					Href: "https://github.com/CodeEditorLand/Mountain",
					Author: "Mountain",
					Role: T("home:architecture.mountain.subtitle", {
						defaultValue:
							"Native Rust Backend - Tauri - Replaces Electron Main Process",
					}),
					Quote: T("home:architecture.mountain.description", {
						defaultValue:
							"Handles windows, file I/O, child processes, terminals, clipboard, and extension IPC through Rust and Tauri\nIncludes Vine and Cocoon bridge code for the primary desktop path\nUses native integrations such as keyring where the feature path requires them",
					}),
				},
				{
					Id: "Output",
					Emoji: "\u26AB",
					Href: "https://github.com/CodeEditorLand/Output",
					Author: "Output",
					Role: T("home:architecture.output.subtitle", {
						defaultValue:
							"Compilation Pipeline - Plugin-Routed - Deterministic Checksum",
					}),
					Quote: T("home:architecture.output.description", {
						defaultValue:
							"Processes TypeScript and platform code through plugin-routed transforms\nContains the dynamic import rewrite and bundling support used by the output pipeline\nChecksum and release guarantees should come from the published pipeline, not from marketing copy",
					}),
				},
				{
					Id: "Rest",
					Emoji: "\u26F1\uFE0F",
					Href: "https://github.com/CodeEditorLand/Rest",
					Author: "Rest",
					Role: T("home:architecture.rest.subtitle", {
						defaultValue:
							"TypeScript Transform Pipeline - OXC - Rust-Native",
					}),
					Quote: T("home:architecture.rest.description", {
						defaultValue:
							"OXC-based transform work for TypeScript and VS Code platform code\nMeant to reduce reliance on Node-hosted compilation paths over time\nSource maps and public benchmark claims remain integration work",
					}),
				},
				{
					Id: "SideCar",
					Emoji: "\uD83D\uDE83",
					Href: "https://github.com/CodeEditorLand/SideCar",
					Author: "SideCar",
					Role: T("home:architecture.sidecar.subtitle", {
						defaultValue:
							"Binary Distributor - Compile-Time Target Triple Selection - Per-Platform Node.js",
					}),
					Quote: T("home:architecture.sidecar.description", {
						defaultValue:
							"Packages host-specific sidecar binaries for the Cocoon path\nKeeps target triples and selection logic in source rather than hidden installer scripts\nAdditional platform packaging remains tied to the release pipeline",
					}),
				},
				{
					Id: "Sky",
					Emoji: "\uD83C\uDF0C",
					Href: "https://github.com/CodeEditorLand/Sky",
					Author: "Sky",
					Role: T("home:architecture.sky.subtitle", {
						defaultValue:
							"Visual UI Layer - Astro Components - Three Workbench Layouts",
					}),
					Quote: T("home:architecture.sky.description", {
						defaultValue:
							"Astro workbench routes and WebView bridge code for the editor UI\nSupports the visual shell that Mountain loads through Tauri\nPanel and layout coverage should be checked against the current Sky routes",
					}),
				},
				{
					Id: "Vine",
					Emoji: "\uD83C\uDF3F",
					Href: "https://github.com/CodeEditorLand/Vine",
					Author: "Vine",
					Role: T("home:architecture.vine.subtitle", {
						defaultValue:
							"gRPC Backbone - Contract-First - .proto Definitions",
					}),
					Quote: T("home:architecture.vine.description", {
						defaultValue:
							"Protocol contracts live in .proto files for Mountain, Cocoon, Air, Grove, and related services\nGenerated stubs give Rust and TypeScript a shared wire shape where the route is implemented\nCoverage is expanding across the IPC surface",
					}),
				},
				{
					Id: "Wind",
					Emoji: "\uD83C\uDF43",
					Href: "https://github.com/CodeEditorLand/Wind",
					Author: "Wind",
					Role: T("home:architecture.wind.subtitle", {
						defaultValue:
							"Workbench Services - Effect-TS Layers - Native Bridges",
					}),
					Quote: T("home:architecture.wind.description", {
						defaultValue:
							"TypeScript workbench services for panels, sidebars, activity bar, configuration, and output channels\nEffect-TS layers keep service dependencies explicit\nNative OS calls use the Tauri bridge where the Mountain path implements them",
					}),
				},
				{
					Id: "Worker",
					Emoji: "\uD83C\uDF69",
					Href: "https://github.com/CodeEditorLand/Worker",
					Author: "Worker",
					Role: T("home:architecture.worker.subtitle", {
						defaultValue:
							"Service Worker - Offline Cache - CSS Import Support",
					}),
					Quote: T("home:architecture.worker.description", {
						defaultValue:
							"Manages browser-worker support for caching and dynamic CSS imports where the web shell needs it\nSecurity-sensitive auth claims are kept out until the active Worker code and release profile prove them end to end",
					}),
				},
			],
			Columns: 3,
		},
		Download: {
			Title: T("download:title", { defaultValue: "Download Land" }),
			Subtitle: T("download:subtitle", {
				defaultValue:
					"Source builds are active today. Public installers, signing, and verification artifacts are still being prepared.",
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
							defaultValue:
								"Universal Binary: Apple Silicon and Intel",
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
					defaultValue: "Code Editor Land",
				}),
				Description: T("common:brand.tagline", {
					defaultValue:
						"Rust and Tauri editor stack. VS Code API compatibility in progress. Free forever.",
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
								defaultValue: "Downloads",
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
				<div className="py-20" />
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
				<div className="py-24" />
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
				<div className="py-24" />
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
				<div className="py-24" />
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
