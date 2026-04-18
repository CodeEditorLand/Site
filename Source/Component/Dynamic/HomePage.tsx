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
					defaultValue: "No Electron   No Restart to Update   CC0",
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
					"VS Code runs on Electron. That means Chromium, Node.js, and a gigabyte of RAM just to open a file.\n\nLand replaces the entire Electron stack with Rust, Tauri, and Effect-TS. The difference is felt on first launch.",
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
						"Runs at native CPU speed. Zero Electron overhead.",
					Colors: ["var(--ExtensionRust)", "var(--Mute)"],
				},
				{
					Id: "2",
					Title: "Tauri UI",
					Tooltip:
						"30\u00d7 lighter than Electron, native look on every OS",
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
						"Type errors caught at compile time, not in production",
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
					Tooltip:
						"One codebase, native on macOS, Windows, and Linux",
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
						"Full VS Code API surface. No extension rewrites needed.",
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
					"The extension ecosystem you already rely on, running on a stack designed for performance.",
			}),
			Features: [
				{
					Id: "performance",
					Icon: "Zap",
					Icons: ["/Image/Rust.svg", "/Image/Tauri.svg", "Zap"],
					Title: T("home:features.item.designTokens.title", {
						defaultValue: "No more frozen cursors.",
					}),
					Description: T(
						"home:features.item.designTokens.description",
						{
							defaultValue:
								"VS Code with a medium project uses 500 MB to 1.5 GB RAM across three Chromium processes. One extension event handler that never resolves freezes everything on that thread.\n\nMountain runs native Rust and Tauri. Echo runs every background task on a work-stealing thread pool. The editor thread never blocks.",
						},
					),
				},
				{
					Id: "compatibility",
					Icon: "Box",
					Icons: ["/Image/EffectTS.svg", "Box", "Puzzle"],
					Title: T("home:features.item.componentLibrary.title", {
						defaultValue: "Every extension runs unchanged.",
					}),
					Description: T(
						"home:features.item.componentLibrary.description",
						{
							defaultValue:
								"Porting your extension library to a new editor is weeks of work you should never have to do.\n\nCocoon mirrors the full VS Code API surface via Effect-TS fibers. Install an extension and it works. Not mostly works. Unchanged.",
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
								"VS Code Promises cannot be interrupted, raced, or run in parallel. A hung async operation in one extension stalls every other on that event loop.\n\nEffect-TS fibers can be interrupted, raced, and run concurrently across CPU cores. Bugs that reach production in VS Code never compile in Land.",
						},
					),
				},
				{
					Id: "cross-platform",
					Icon: "Globe",
					Icons: ["/Image/Tauri.svg", "Globe", "Package"],
					Title: T("home:features.item.versionControl.title", {
						defaultValue: "One codebase, every platform.",
					}),
					Description: T(
						"home:features.item.versionControl.description",
						{
							defaultValue:
								"Building native apps for three operating systems used to mean three rendering engines, three toolchains, and three deployment pipelines.\n\nTauri uses the OS's own WebView on each platform. One Rust codebase compiles to native macOS, Windows, and Linux. No bundled Chromium.",
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
						defaultValue: "No Restart to Update.",
					}),
					Description: T(
						"home:features.item.cicdIntegration.description",
						{
							defaultValue:
								"VS Code's Restart to Update prompt kills every open terminal, unsaved diff, and in-progress language server.\n\nAir pre-downloads and PGP-verifies the next version while you work. The update stages between sessions. The next launch opens on the new version with no prompt.",
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
					"Funded by NLnet NGI0 Commons Fund.\n\nEvery milestone demonstrates the stack works, not a feature we are catching up on.",
			}),
			Tiers: [
				{
					Id: "free",
					Name: T("home:roadmap.tiers.current.name", {
						defaultValue: "Active Now",
					}),
					Description: T("home:roadmap.tiers.current.description", {
						defaultValue:
							"All fifteen elements are in active development and independently deployable. The runtime is faster than VS Code. The extension API is implemented. Each element is a standalone repository you can inspect and contribute to today.",
					}),
					Price: { Monthly: 0, Yearly: 0 },
					Elements: [
						T("home:roadmap.tiers.current.elements.mountain", {
							defaultValue:
								"Mountain ⛰️\nNative Backend\nReplaces Electron main process, no bundled Chromium",
						}),
						T("home:roadmap.tiers.current.elements.cocoon", {
							defaultValue:
								"Cocoon 🦋\nExtension Host\nFull VS Code API via Effect-TS, every extension unchanged",
						}),
						T("home:roadmap.tiers.current.elements.wind", {
							defaultValue:
								"Wind 🍃\nWorkbench Shell\nEffect-TS layers, direct OS calls, no IPC proxy",
						}),
						T("home:roadmap.tiers.current.elements.sky", {
							defaultValue:
								"Sky 🌌\nAstro UI Layer\nEvery panel a component, instant hot-reload",
						}),
						T("home:roadmap.tiers.current.elements.air", {
							defaultValue:
								"Air 🪁\nBackground Daemon\nPre-stages updates, no Restart to Update prompt",
						}),
						T("home:roadmap.tiers.current.elements.echo", {
							defaultValue:
								"Echo 📣\nWork-Stealing Scheduler\nAll CPU cores, heavy tasks never block the editor",
						}),
					],
					Features: [
						T("home:roadmap.tiers.current.features.1", {
							defaultValue:
								"Every extension runs unchanged no rewrites",
						}),
						T("home:roadmap.tiers.current.features.2", {
							defaultValue:
								"No Electron OS's own renderer 70% less RAM",
						}),
						T("home:roadmap.tiers.current.features.3", {
							defaultValue:
								"Fibers, not Promises interruptible concurrent",
						}),
						T("home:roadmap.tiers.current.features.4", {
							defaultValue:
								"Telemetry is a compile flag absent, not disabled",
						}),
						T("home:roadmap.tiers.current.features.5", {
							defaultValue: "CC0 public domain no restrictions",
						}),
						T("home:roadmap.tiers.current.features.6", {
							defaultValue: "macOS Windows Linux",
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
					Description: T("home:roadmap.tiers.future.description", {
						defaultValue:
							"Active milestones across all fifteen elements. Each item is grounded in an open README or open source commit.",
					}),
					Price: { Monthly: 0, Yearly: 0 },
					Elements: [
						T("home:roadmap.tiers.future.elements.vine", {
							defaultValue:
								"Vine 🌿\nProtocol In Progress\nMountain and Grove channel completing",
						}),
						T("home:roadmap.tiers.future.elements.cocoon", {
							defaultValue:
								"Cocoon 🦋\nExtension Compatibility Pass\nHigh-fidelity VS Code API coverage",
						}),
						T("home:roadmap.tiers.future.elements.grove", {
							defaultValue:
								"Grove 🌳\nWASM Sandbox Stabilizing\nCapability-based extension isolation",
						}),
						T("home:roadmap.tiers.future.elements.rest", {
							defaultValue:
								"Rest ⛱️\nSource Map Support\nOXC transformer integration in progress",
						}),
						T("home:roadmap.tiers.future.elements.echo", {
							defaultValue:
								"Echo 📣\nScheduler Optimization\nFaster steal, lower latency",
						}),
						T("home:roadmap.tiers.future.elements.air", {
							defaultValue:
								"Air 🪁\nSigned CDN Delivery\nCloudflare Workers distribution",
						}),
					],
					Features: [
						T("home:roadmap.tiers.future.features.1", {
							defaultValue:
								"VS Code Marketplace every extension installs unchanged",
						}),
						T("home:roadmap.tiers.future.features.2", {
							defaultValue:
								"Grove hardware-enforced extension isolation",
						}),
						T("home:roadmap.tiers.future.features.3", {
							defaultValue:
								"Vine typed at the wire all IPC finalized",
						}),
						T("home:roadmap.tiers.future.features.4", {
							defaultValue:
								"Cross-platform native installer via Tauri",
						}),
						T("home:roadmap.tiers.future.features.5", {
							defaultValue: "Source map generation via OXC",
						}),
						T("home:roadmap.tiers.future.features.6", {
							defaultValue:
								"Cloudflare Workers download distribution live",
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
					"Land replaces VS Code's Electron stack element by element.\n\nFifteen standalone open-source repositories, each one inspectable, forkable, and ready for contributions today.",
			}),
			Testimonials: [
				{
					Id: "Air",
					Emoji: "\uD83E\uDE81",
					Href: "https://github.com/CodeEditorLand/Air",
					Author: "Air",
					Role: T("home:architecture.air.subtitle", {
						defaultValue:
							"Background Daemon Silent Update Crypto-Signed",
					}),
					Quote: T("home:architecture.air.description", {
						defaultValue:
							"Runs in the background after you close the editor. Downloads updates, verifies cryptographic signatures, and indexes your workspace for instant search.\n\nThe next launch is already on the latest version. You never see a restart-to-update prompt.",
					}),
				},
				{
					Id: "Cocoon",
					Emoji: "\uD83E\uDD8B",
					Href: "https://github.com/CodeEditorLand/Cocoon",
					Author: "Cocoon",
					Role: T("home:architecture.cocoon.subtitle", {
						defaultValue:
							"Extension Host Full VS Code API Effect-TS Shim",
					}),
					Quote: T("home:architecture.cocoon.description", {
						defaultValue:
							"A Node.js sidecar that intercepts require and import at the module level and routes them through a complete Effect-TS service layer mirroring the VS Code API.\n\nInstall any extension. It runs unchanged. No patches, no rewrites, no compatibility hacks.",
					}),
				},
				{
					Id: "Common",
					Emoji: "\uD83D\uDC68\uD83C\uDFFB\u200D\uD83C\uDFED",
					Href: "https://github.com/CodeEditorLand/Common",
					Author: "Common",
					Role: T("home:architecture.common.subtitle", {
						defaultValue:
							"Shared Foundation Abstract Trait Zero Implementation",
					}),
					Quote: T("home:architecture.common.description", {
						defaultValue:
							"The pure abstract core of Land. Defines typed effects, composable building blocks, and abstract traits that every element builds on, with no concrete implementations.\n\nMock any trait and test any element without a running window, webview, or sidecar.",
					}),
				},
				{
					Id: "Echo",
					Emoji: "\uD83D\uDCE3",
					Href: "https://github.com/CodeEditorLand/Echo",
					Author: "Echo",
					Role: T("home:architecture.echo.subtitle", {
						defaultValue: "Work-Stealing Scheduler Every CPU Core",
					}),
					Quote: T("home:architecture.echo.description", {
						defaultValue:
							"A lock-free concurrency runtime built on crossbeam-deque. Every task runs inside a supervised worker pool: no fire-and-forget spawns, graceful startup and shutdown guaranteed.\n\nHeavy indexing and analysis run in the background without ever blocking the editor.",
					}),
				},
				{
					Id: "Grove",
					Emoji: "\uD83C\uDF33",
					Href: "https://github.com/CodeEditorLand/Grove",
					Author: "Grove",
					Role: T("home:architecture.grove.subtitle", {
						defaultValue:
							"Secure WASM Sandbox WASMtime Capability-Based Isolation",
					}),
					Quote: T("home:architecture.grove.description", {
						defaultValue:
							"Runs VS Code extensions compiled to WebAssembly inside WASMtime with configurable resource limits and capability-based security. Supports gRPC, IPC, and WASM transports.\n\nThe path to a true sandboxed extension model where an extension can only touch what you explicitly grant.",
					}),
				},
				{
					Id: "Maintain",
					Emoji: "\uD83D\uDCAA\uD83C\uDFFB",
					Href: "https://github.com/CodeEditorLand/Maintain",
					Author: "Maintain",
					Role: T("home:architecture.maintain.subtitle", {
						defaultValue:
							"Build Orchestrator Rhai Scripting TOML/JSON5 Config",
					}),
					Quote: T("home:architecture.maintain.description", {
						defaultValue:
							"Build pipelines for the entire Land ecosystem. Embedded Rhai scripting for flexible build logic, compile-time validated TOML and JSON5 configurations, and deterministic artifact generation.\n\nSame commit always produces the same output. No environment surprises.",
					}),
				},
				{
					Id: "Mist",
					Emoji: "\uD83C\uDF2B\uFE0F",
					Href: "https://github.com/CodeEditorLand/Mist",
					Author: "Mist",
					Role: T("home:architecture.mist.subtitle", {
						defaultValue:
							"DNS Sandbox Local *.editor.land Resolution",
					}),
					Quote: T("home:architecture.mist.description", {
						defaultValue:
							"Creates a fully sandboxed DNS zone that resolves every *.editor.land domain to 127.0.0.1. All Land services communicate through this local layer.\n\nNothing leaks to the public internet. A clean network boundary between the editor and the outside world.",
					}),
				},
				{
					Id: "Mountain",
					Emoji: "\u26F0\uFE0F",
					Href: "https://github.com/CodeEditorLand/Mountain",
					Author: "Mountain",
					Role: T("home:architecture.mountain.subtitle", {
						defaultValue:
							"Native Rust Backend Replaces Electron Main Process",
					}),
					Quote: T("home:architecture.mountain.description", {
						defaultValue:
							"Handles windows, files, processes, and extension IPC via Rust and Tauri. Where Electron takes milliseconds, Mountain responds in microseconds.\n\nStarts faster, uses less RAM, stays responsive with hundreds of files open. Authentication tokens live in the OS keychain, never on disk.",
					}),
				},
				{
					Id: "Output",
					Emoji: "\u26AB",
					Href: "https://github.com/CodeEditorLand/Output",
					Author: "Output",
					Role: T("home:architecture.output.subtitle", {
						defaultValue:
							"Compilation Pipeline Deterministic Bundle Checksum",
					}),
					Quote: T("home:architecture.output.description", {
						defaultValue:
							"Processes TypeScript from VS Code, Land, and the Rest compiler into fully bundled artifacts. A plugin-routed architecture handles each source type on its own path.\n\nSame commit, same output. Every bundle is deterministic and checksum-verified.",
					}),
				},
				{
					Id: "Rest",
					Emoji: "\u26F1\uFE0F",
					Href: "https://github.com/CodeEditorLand/Rest",
					Author: "Rest",
					Role: T("home:architecture.rest.subtitle", {
						defaultValue:
							"TypeScript Compiler Rust + OXC 2-3x Faster",
					}),
					Quote: T("home:architecture.rest.description", {
						defaultValue:
							"OXC-powered TypeScript compiler implemented in Rust. 100% compatible output at 2-3x the speed of esbuild.\n\nRust-native, zero Node.js overhead.",
					}),
				},
				{
					Id: "SideCar",
					Emoji: "\uD83D\uDE83",
					Href: "https://github.com/CodeEditorLand/SideCar",
					Author: "SideCar",
					Role: T("home:architecture.sidecar.subtitle", {
						defaultValue:
							"Binary Distributor Node.js Runtime Per Platform",
					}),
					Quote: T("home:architecture.sidecar.description", {
						defaultValue:
							"Packages and selects the exact Node.js sidecar binary at compile time based on the target triple: aarch64-apple-darwin, x86_64-pc-windows-msvc, and four others.\n\nCocoon always gets the binary that matches the host exactly. No runtime detection, no fallback chains.",
					}),
				},
				{
					Id: "Sky",
					Emoji: "\uD83C\uDF0C",
					Href: "https://github.com/CodeEditorLand/Sky",
					Author: "Sky",
					Role: T("home:architecture.sky.subtitle", {
						defaultValue:
							"Visual UI Layer Astro Component Instant Hot-Reload",
					}),
					Quote: T("home:architecture.sky.description", {
						defaultValue:
							"Every panel, sidebar, tab bar, and status bar is an Astro component. Three workbench layouts for full desktop, embedded, and minimal deployments.\n\nTauri reloads Sky instantly on any component change. High-fidelity VS Code UI compatibility with a significantly smaller footprint.",
					}),
				},
				{
					Id: "Vine",
					Emoji: "\uD83C\uDF3F",
					Href: "https://github.com/CodeEditorLand/Vine",
					Author: "Vine",
					Role: T("home:architecture.vine.subtitle", {
						defaultValue:
							"gRPC Backbone Contract-First .proto Definition",
					}),
					Quote: T("home:architecture.vine.description", {
						defaultValue:
							"Every inter-process service interface starts as a .proto file. The generated Rust and TypeScript stubs are the only way Land processes communicate.\n\nTyped at the wire, typed at the call site, verified at compile time. Refactor a message field and every consumer breaks loudly instead of silently.",
					}),
				},
				{
					Id: "Wind",
					Emoji: "\uD83C\uDF43",
					Href: "https://github.com/CodeEditorLand/Wind",
					Author: "Wind",
					Role: T("home:architecture.wind.subtitle", {
						defaultValue:
							"VS Code Workbench Reimplemented Effect-TS Layer Native OS API",
					}),
					Quote: T("home:architecture.wind.description", {
						defaultValue:
							"A clean TypeScript re-implementation of the VS Code Workbench: panels, sidebars, activity bar. Every service is a composable Effect-TS Layer: file dialogs, clipboard, configuration, and output channels.\n\nNative OS calls via Tauri. No Electron IPC proxy. No renderer-to-main roundtrip.",
					}),
				},
				{
					Id: "Worker",
					Emoji: "\uD83C\uDF69",
					Href: "https://github.com/CodeEditorLand/Worker",
					Author: "Worker",
					Role: T("home:architecture.worker.subtitle", {
						defaultValue:
							"Service Worker Offline Support AES-GCM Auth",
					}),
					Quote: T("home:architecture.worker.description", {
						defaultValue:
							"Manages caching, offline support, and dynamic CSS imports from JavaScript modules in the editor shell. Auth tokens are AES-GCM encrypted, requests are HMAC-signed, and tokens refresh automatically.\n\nThe shell stays functional and authenticated even when the network drops.",
					}),
				},
			],
			Columns: 3,
		},
		Download: {
			Title: T("download:title", { defaultValue: "Download Land" }),
			Subtitle: T("download:subtitle", {
				defaultValue:
					"Native on macOS, Windows, and Linux.\n\nBuilt with Tauri. Powered by Rust. Verified with PGP.",
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
						"Faster than VS Code. Lighter than Electron. Free forever.",
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
