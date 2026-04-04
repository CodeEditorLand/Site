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
					defaultValue: "Native Speed \u2001 No Electron \u2001 CC0",
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
					Icons: ["/Image/Rust.svg", "/Image/Tauri.svg", "Zap"],
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
					Icons: ["/Image/EffectTS.svg", "Box", "Puzzle"],
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
					Icons: ["/Image/EffectTS.svg", "/Image/TypeScript.svg", "Layers"],
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
					Icons: ["/Image/Tauri.svg", "Globe", "Package"],
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
					Icons: ["/Image/Rust.svg", "/Image/Biome.svg", "/Image/EffectTS.svg"],
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
					Icons: ["/Image/CC0.svg", "/Image/NLnet.svg", "Heart"],
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
					Id: "free",
					Name: T("home:roadmap.tiers.current.name", {
						defaultValue: "Free",
					}),
					Description: T("home:roadmap.tiers.current.description", {
						defaultValue:
							"Six open-source elements building the editor core. Read, run, and contribute to each today.",
					}),
					Price: { Monthly: 0, Yearly: 0 },
					Elements: [
						T("home:roadmap.tiers.current.elements.mountain", {
							defaultValue: "Mountain ⛰️\nNative Process Manager\nReplaces Electron Main Process",
						}),
						T("home:roadmap.tiers.current.elements.cocoon", {
							defaultValue: "Cocoon 🦋\nExtension Host\nVS Code Extensions Run Unchanged",
						}),
						T("home:roadmap.tiers.current.elements.wind", {
							defaultValue: "Wind 🍃\nWorkbench Shell\nPanels, Sidebars, Activity Bar",
						}),
						T("home:roadmap.tiers.current.elements.sky", {
							defaultValue: "Sky 🌌\nAstro UI Layer\nEvery Panel Is a Component",
						}),
						T("home:roadmap.tiers.current.elements.air", {
							defaultValue: "Air 🪁\nBackground Daemon\nSilent Update Crypto-Signed",
						}),
						T("home:roadmap.tiers.current.elements.echo", {
							defaultValue: "Echo 📣\nWork-Stealing Scheduler\nEvery CPU Core Saturated",
						}),
					],
					Features: [
						T("home:roadmap.tiers.current.features.1", {
							defaultValue: "Every Extension Runs Unchanged Zero Rewrites",
						}),
						T("home:roadmap.tiers.current.features.2", {
							defaultValue: "No Electron Overhead The OS’s Own Renderer",
						}),
						T("home:roadmap.tiers.current.features.3", {
							defaultValue: "Fibers, Not Promises Interruptible and Supervised",
						}),
						T("home:roadmap.tiers.current.features.4", {
							defaultValue: "Telemetry Is a Compile Flag Not a Config Option",
						}),
						T("home:roadmap.tiers.current.features.5", {
							defaultValue: "CC0 No Restrictions, No Compliance, No Attribution",
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
							defaultValue: "Vine 🌿\nProtocol In Progress\nMountain ↔ Grove Channel Completing",
						}),
						T("home:roadmap.tiers.future.elements.cocoon", {
							defaultValue: "Cocoon 🦋\nExtension Compatibility Pass\nHigh-Fidelity VS Code API Coverage",
						}),
						T("home:roadmap.tiers.future.elements.grove", {
							defaultValue: "Grove 🌳\nWASM Sandbox Stabilizing\nCapability-Based Extension Isolation",
						}),
						T("home:roadmap.tiers.future.elements.rest", {
							defaultValue: "Rest ⛱️\nSource Map Support\nOXC Transformer Integration In Progress",
						}),
						T("home:roadmap.tiers.future.elements.echo", {
							defaultValue: "Echo 📣\nScheduler Optimization\nFaster Steal Lower Latency",
						}),
						T("home:roadmap.tiers.future.elements.air", {
							defaultValue: "Air 🪁\nSigned CDN Delivery\nCloudflare Workers Distribution",
						}),
					],
					Features: [
						T("home:roadmap.tiers.future.features.1", {
							defaultValue: "VS Code Marketplace Every Extension Installs Unchanged",
						}),
						T("home:roadmap.tiers.future.features.2", {
							defaultValue: "Grove Hardware-Enforced Extension Isolation",
						}),
						T("home:roadmap.tiers.future.features.3", {
							defaultValue: "Vine Typed at the Wire All IPC Finalized",
						}),
						T("home:roadmap.tiers.future.features.4", {
							defaultValue: "Cross-Platform Native Installer Tauri",
						}),
						T("home:roadmap.tiers.future.features.5", {
							defaultValue: "Source Map Generation OXC",
						}),
						T("home:roadmap.tiers.future.features.6", {
							defaultValue: "Cloudflare CDN Download Worker Live",
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
					"Land replaces VS Code\u2019s Electron stack element by element.\n\nFifteen standalone open-source repositories, each one inspectable, forkable, and ready for contributions today.",
			}),
			Testimonials: [
				{
					Id: "air",
					Emoji: "\uD83E\uDE81",
					Href: "https://github.com/CodeEditorLand/Air",
					Author: "Air",
					Role: T("home:architecture.air.subtitle", {
						defaultValue: "Background Daemon Silent Update Crypto-Signed",
					}),
					Quote: T("home:architecture.air.description", {
						defaultValue:
							"VS Code cold-starts slowly because every session initializes from scratch: extension host, language servers, file indexing. Updates present a Restart to Update prompt that kills open terminals, unsaved diffs, and in-progress language servers.

Air is a persistent background daemon that keeps running after you close the editor. It pre-downloads and PGP-verifies the next update before you decide to apply it. It pre-indexes workspace changes that happened while the editor was closed.

The next version is already downloaded and verified before you decide to update. No restart prompt ever.",
					}),
				},
				{
					Id: "cocoon",
					Emoji: "\uD83E\uDD8B",
					Href: "https://github.com/CodeEditorLand/Cocoon",
					Author: "Cocoon",
					Role: T("home:architecture.cocoon.subtitle", {
						defaultValue: "Extension Host Full VS Code API Effect-TS Shim",
					}),
					Quote: T("home:architecture.cocoon.description", {
						defaultValue:
							"VS Code's extension host is a single Node.js event loop. One extension's hung Promise blocks every other handler. One language server crash freezes the cursor for two seconds. There is no way to interrupt an in-flight extension call.

Cocoon routes every VS Code API call through Effect-TS fibers. Each extension runs in its own supervised scope. A hung operation is interrupted. A crashed scope restarts. Nothing bleeds across.

Every extension runs in its own supervised fiber. One crash does not take down the rest.",
					}),
				},
				{
					Id: "common",
					Emoji: "\uD83D\uDC68\uD83C\uDFFB\u200D\uD83C\uDFED",
					Href: "https://github.com/CodeEditorLand/Common",
					Author: "Common",
					Role: T("home:architecture.common.subtitle", {
						defaultValue: "Shared Foundation Abstract Trait Zero Implementation",
					}),
					Quote: T("home:architecture.common.description", {
						defaultValue:
							"In VS Code's codebase, interfaces are often implicitly implemented and concretely imported. Testing requires mocking entire modules. There is no dependency injection.

Common defines pure abstract traits with zero concrete implementations. Every element builds on Common's typed effects and composable building blocks. You can swap any implementation, mock any trait, and test any element without launching a window.

Mock any service and test any element in isolation, no running editor required.",
					}),
				},
				{
					Id: "echo",
					Emoji: "\uD83D\uDCE3",
					Href: "https://github.com/CodeEditorLand/Echo",
					Author: "Echo",
					Role: T("home:architecture.echo.subtitle", {
						defaultValue: "Work-Stealing Scheduler Every CPU Core",
					}),
					Quote: T("home:architecture.echo.description", {
						defaultValue:
							"VS Code's background tasks (file indexing, symbol scanning, git blame, search) run in single-threaded Node.js event loops. Heavy indexing blocks everything else on that thread.

Echo is a lock-free work-stealing scheduler built on Rust's crossbeam-deque. Every task runs in a supervised worker pool across all CPU cores. Tasks are work-stolen, supervised, and gracefully shut down. No task outlives its scope.

Indexing, search, and builds run on every CPU core in parallel. The editor stays responsive.",
					}),
				},
				{
					Id: "grove",
					Emoji: "\uD83C\uDF33",
					Href: "https://github.com/CodeEditorLand/Grove",
					Author: "Grove",
					Role: T("home:architecture.grove.subtitle", {
						defaultValue: "Secure WASM Sandbox WASMtime Capability-Based Isolation",
					}),
					Quote: T("home:architecture.grove.description", {
						defaultValue:
							"VS Code extensions run with full Node.js capabilities in a shared process. A malicious extension can read the file system, access other extensions' secrets, and interfere with event handlers. The VS Code extension sandbox is a policy document, not a technical boundary.

Grove runs extensions compiled to WebAssembly inside WASMtime with capability-based security. An extension can only touch resources explicitly granted to it. No implicit ambient authority. The sandbox is enforced by the hardware.

An extension can only touch what you explicitly grant. The sandbox is enforced by the hardware, not a policy.",
					}),
				},
				{
					Id: "maintain",
					Emoji: "\uD83D\uDCAA\uD83C\uDFFB",
					Href: "https://github.com/CodeEditorLand/Maintain",
					Author: "Maintain",
					Role: T("home:architecture.maintain.subtitle", {
						defaultValue: "Build Orchestrator Rhai Scripting TOML/JSON5 Config",
					}),
					Quote: T("home:architecture.maintain.description", {
						defaultValue:
							"Build toolchains that span Rust, TypeScript, and multiple target platforms require complex orchestration that breaks silently when any one step drifts.

Maintain provides build orchestration for the entire Land ecosystem via embedded Rhai scripting, compile-time validated TOML and JSON5 configuration, and deterministic artifact generation.

Same commit always produces the same output. No environment surprises.",
					}),
				},
				{
					Id: "mist",
					Emoji: "\uD83C\uDF2B\uFE0F",
					Href: "https://github.com/CodeEditorLand/Mist",
					Author: "Mist",
					Role: T("home:architecture.mist.subtitle", {
						defaultValue: "DNS Sandbox Local *.editor.land Resolution",
					}),
					Quote: T("home:architecture.mist.description", {
						defaultValue:
							"Network requests from editor components have no isolation boundary. A buggy extension or tool can make requests to arbitrary hosts while appearing to run locally.

Mist creates a fully sandboxed DNS zone that resolves every *.editor.land domain to 127.0.0.1. All Land services communicate through this local layer. Nothing leaks to the public internet.

Every service call stays local. The network boundary is enforced at the DNS layer.",
					}),
				},
				{
					Id: "mountain",
					Emoji: "\u26F0\uFE0F",
					Href: "https://github.com/CodeEditorLand/Mountain",
					Author: "Mountain",
					Role: T("home:architecture.mountain.subtitle", {
						defaultValue: "Native Rust Backend Replaces Electron Main Process",
					}),
					Quote: T("home:architecture.mountain.description", {
						defaultValue:
							"VS Code with a medium project open uses 500MB to 1.5GB RAM across three Chromium renderer processes. Every file dialog, clipboard read, and window move crosses Electron's serialized IPC bridge.

Mountain replaces Electron's main process entirely with a Rust binary using Tauri. The OS's own WebView renders the UI. No bundled Chromium. No Node.js in the host process.

Where Electron takes 200ms to open a dialog, Mountain takes 2.",
					}),
				},
				{
					Id: "output",
					Emoji: "\u26AB",
					Href: "https://github.com/CodeEditorLand/Output",
					Author: "Output",
					Role: T("home:architecture.output.subtitle", {
						defaultValue: "Compilation pipeline Deterministic Bundle Checksum",
					}),
					Quote: T("home:architecture.output.description", {
						defaultValue:
							"VS Code's build pipeline produces JavaScript artifacts through a mix of esbuild and Webpack passes. The output format changes between VS Code versions. Incremental migration between compilers is not supported.

Output handles compilation from VS Code, Land, and the Rest compiler into a single deterministic pipeline. Both esbuild and Rest produce artifacts through the same build system, allowing incremental migration.

Same commit, same output. Every bundle is deterministic and checksum-verified.",
					}),
				},
				{
					Id: "rest",
					Emoji: "\u26F1\uFE0F",
					Href: "https://github.com/CodeEditorLand/Rest",
					Author: "Rest",
					Role: T("home:architecture.rest.subtitle", {
						defaultValue: "TypeScript Compiler Rust + OXC 2-3x Faster",
					}),
					Quote: T("home:architecture.rest.description", {
						defaultValue:
							"VS Code's TypeScript compiler pipeline runs through esbuild's TypeScript loader, which strips types without a full parse. Source maps require a separate pass. The build is fast but produces output that drifts from tsc.

Rest is a TypeScript compiler built on OXC, the same parser VS Code uses internally. It produces 100% tsc-compatible output at 2-3x the speed of esbuild. Source map generation is built in, not bolted on.

Same output as tsc. Faster than esbuild. Source maps included.",
					}),
				},
				{
					Id: "sidecar",
					Emoji: "\u2699\uFE0F",
					Href: "https://github.com/CodeEditorLand/SideCar",
					Author: "SideCar",
					Role: T("home:architecture.sidecar.subtitle", {
						defaultValue: "Binary Distributor Node.js Runtime Per Platform",
					}),
					Quote: T("home:architecture.sidecar.description", {
						defaultValue:
							"Every Land element that spawns a Node.js process needs the exact right Node.js binary for the host platform. Getting this wrong at runtime is a hard-to-debug failure.

SideCar selects and bundles the correct Node.js sidecar binary at compile time based on the target triple: aarch64-apple-darwin, x86_64-pc-windows-msvc, and four others. No runtime detection. No fallback chains.

Land ships the exact right Node.js binary for your platform. No prerequisites. No version conflicts.",
					}),
				},
				{
					Id: "sky",
					Emoji: "\uD83C\uDF0C",
					Href: "https://github.com/CodeEditorLand/Sky",
					Author: "Sky",
					Role: T("home:architecture.sky.subtitle", {
						defaultValue: "Visual UI Layer Astro Component Instant Hot-Reload",
					}),
					Quote: T("home:architecture.sky.description", {
						defaultValue:
							"VS Code's UI is a Chromium renderer process carrying a full browser heap. Every panel, sidebar, and tab bar re-renders on the same JavaScript thread as the extension host.

Sky renders the editor interface entirely with Astro components inside Tauri's native WebView. Three workbench layouts: full desktop, embedded, and minimal. Tauri hot-reloads any component change instantly with no browser process overhead.

Every panel is a component. Change one and Tauri reloads it in under a frame.",
					}),
				},
				{
					Id: "vine",
					Emoji: "\uD83C\uDF3F",
					Href: "https://github.com/CodeEditorLand/Vine",
					Author: "Vine",
					Role: T("home:architecture.vine.subtitle", {
						defaultValue: "gRPC Backbone Contract-First .proto Definition",
					}),
					Quote: T("home:architecture.vine.description", {
						defaultValue:
							"Electron's IPC is untyped. You call ipcRenderer.send and hope the main process handles it correctly. Refactoring IPC messages is dangerous because nothing tells you what broke.

Every inter-process service interface in Land starts as a .proto file. The generated Rust and TypeScript stubs are the only way processes communicate. gRPC over a Unix domain socket runs at native memory-copy speed.

Change a message field and every consumer breaks loudly at compile time, not silently at runtime.",
					}),
				},
				{
					Id: "wind",
					Emoji: "\uD83C\uDF43",
					Href: "https://github.com/CodeEditorLand/Wind",
					Author: "Wind",
					Role: T("home:architecture.wind.subtitle", {
						defaultValue: "VS Code Workbench Reimplemented Effect-TS Layer Native OS API",
					}),
					Quote: T("home:architecture.wind.description", {
						defaultValue:
							"In VS Code, every workbench interaction that touches the file system crosses Electron's IPC bridge twice: serialized to JSON, piped, deserialized. On high-frequency events like typing and hover tooltips, this adds measurable latency.

Wind re-implements the VS Code Workbench as composable Effect-TS Layers. OS calls go directly through Mountain's Tauri bindings. No IPC proxy. No JSON serialization.

No Electron IPC proxy. Workbench actions hit the OS directly.",
					}),
				},
				{
					Id: "worker",
					Emoji: "\uD83C\uDF69",
					Href: "https://github.com/CodeEditorLand/Worker",
					Author: "Worker",
					Role: T("home:architecture.worker.subtitle", {
						defaultValue: "Service Worker Offline Support AES-GCM Auth",
					}),
					Quote: T("home:architecture.worker.description", {
						defaultValue:
							"The editor shell makes repeated network requests for static assets on every launch. Auth tokens stored in memory are lost on page reload and require a new sign-in flow.

Worker manages caching, offline support, and AES-GCM encrypted auth token storage in the service worker layer. HMAC-signed requests. Automatic token refresh. Dynamic CSS imports from JavaScript modules handled without a build step.

The shell loads from cache. Tokens survive refresh. The editor works offline.",
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
