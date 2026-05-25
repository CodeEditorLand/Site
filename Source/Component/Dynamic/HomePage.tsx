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
					defaultValue: "No Electron No Chromium CC0",
				}),
				Variant: "secondary",
			},
			Title: T("home:hero.title", {
				defaultValue: "",
			}),
			TitleHighlight: T("home:hero.titleHighlight", {
				defaultValue: "Land",
			}),
			Subtitle: T("home:hero.subtitle", {
				defaultValue:
					"A code editor rebuilt on Rust, Tauri, and Effect-TS. VS Code extension API compatibility is the target. Source-build today; installers in progress.",
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
					defaultValue: "Source",
				}),
				Variant: "ghost",
				Size: "lg",
				Icon: "ExternalLink",
				Href: "https://github.com/CodeEditorLand/Land#readme",
			},
			FloatingCards: [
				{
					Id: "1",
					Title: "Rust Core",
					Tooltip:
						"Mountain implements Common traits in Rust via Tauri. Handles windows, files, terminals, process control, and gRPC IPC through the Vine protocol. The ActionEffect system treats every operation as declarative data dispatched across layers.",
					Colors: ["var(--ExtensionRust)", "var(--Mute)"],
				},
				{
					Id: "2",
					Title: "Tauri UI",
					Tooltip:
						"Sky renders the editor interface in the OS WebView via Astro and routes Tauri events through SkyBridge to VS Code workbench APIs. Multiple workbench layouts adapt the UI layer to different runtimes: browser proxy, Mountain-native, or Electron.",
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
						"Cocoon and Wind use Effect-TS for typed errors, scoped resources, cancellation, and supervised concurrency. Wind composes workbench services into Layer stacks that make dependency paths traceable at compile time - one stack per runtime target.",
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
						"Vine defines the gRPC protocol layer between Mountain, Cocoon, Air, and Grove. Proto definitions currently live in Mountain and Cocoon while Vine consolidates. Every gRPC call is a typed contract - the wire format is the interface.",
					Colors: ["var(--SpinegRPC)", "var(--SpineIPC)"],
				},
				{
					Id: "5",
					Title: "Extension Host",
					Tooltip:
						"Cocoon runs VS Code extensions via dual-track architecture: Track A loads unmodified extHost sources for maximum compatibility, Track B routes I/O-heavy operations to Mountain through gRPC. Effect-TS services implement the vscode API shim across both tracks.",
					Colors: ["var(--TierProvider)"],
				},
				{
					Id: "6",
					Title: "Cross-Platform",
					Tooltip:
						"Tauri bundles to native macOS, Windows, and Linux packages using the OS WebView - no embedded Chromium. Per-platform build configuration and binary management keep cross-compilation paths explicit rather than hidden in installer scripts.",
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
						"Cocoon implements the VS Code API surface through Effect-TS services: commands, workspace, terminals, webviews, language providers, and diagnostics. The dual-track architecture preserves compatibility with published extension APIs while routing through native services.",
					Colors: ["var(--SpineIPC)"],
				},
				{
					Id: "8",
					Title: "Open Source CC0",
					Tooltip:
						"All 15 element repos are under CC0 1.0 Universal public domain. No attribution required, no compliance restrictions. Funded by NLnet NGI0 Commons Fund.",
					Colors: ["var(--SpinegRPC)", "var(--ExtensionTauri)"],
				},
			],
			ShowConnectingLines: true,
			ShowParticles: true,
			RespectReducedMotion: true,
		},
		Features: {
			Title: T("home:features.title", {
				defaultValue: "Built differently",
			}),
			Subtitle: T("home:features.subtitle", {
				defaultValue:
					"Native services, typed IPC, and a compatibility host you can read in source.",
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
								"Mountain handles window management, file I/O, child processes, terminal IPC, and extension communication through Tauri - using the ActionEffect system for declarative, dispatchable operations. Echo provides work-stealing scheduler primitives for bounded background work.\n\nThat gives Land a native path to move heavy editor work out of the WebView without claiming benchmark numbers before a reproducible suite exists.",
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
								"Cocoon hosts existing VS Code extensions using Effect-TS through a dual-track architecture: Track A loads unmodified extHost sources for maximum compatibility, Track B routes I/O-heavy operations to Mountain through gRPC. The vscode API shim covers commands, workspace, terminals, webviews, language providers, and diagnostics.\n\nExtensions run unmodified through the active compatibility path. Marketplace-wide coverage still depends on each extension API usage and on services still being filled in.",
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
								"Effect-TS gives Cocoon and Wind typed errors, scoped resources, explicit cancellability, and supervised concurrency for extension-host and workbench services. Wind composes services into Layer stacks that target specific runtimes - native, compatibility, or test - with compile-time dependency tracking.\n\nThat does not remove every runtime bug, but it does make failure paths explicit and traceable through the services Land controls.",
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
								"Tauri uses the OS WebView on each platform instead of a bundled Chromium instance. Mountain's desktop path has no embedded browser engine. Per-platform binary management keeps cross-compilation paths explicit and reproducible.\n\nThe repository includes macOS, Windows, and Linux build configuration. macOS is the primary path, with Windows and Linux installer coverage still being completed.",
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
								"Air provides persistent background services for update downloads and verification, file indexing, cryptographic signing, and health monitoring. Runs as an independent daemon - persists when the main window closes.\n\nThose services are real source today. The public updater flow, signing story, and release distribution path are still being finished.",
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
				defaultValue: "What's shipping",
			}),
			Subtitle: T("home:roadmap.subtitle", {
				defaultValue:
					"Milestones are described as source, integration, or release status. Funded by NLnet NGI0 Commons Fund.",
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
				defaultValue: "Under the hood",
			}),
			Subtitle: T("home:architecture.subtitle", {
				defaultValue:
					"Fifteen elements replace VS Code's Electron stack piece by piece. Each one is described here by what its current source supports.",
			}),
			Testimonials: [
				{
					Id: "Air",
					Emoji: "🪁",
					Href: "https://github.com/CodeEditorLand/Air",
					Author: "Air",
					Role: T("home:architecture.air.subtitle", {
						defaultValue:
							"Background Services - Downloader - Workspace Indexer",
					}),
					Quote: T("home:architecture.air.description", {
						defaultValue:
							"Persistent background daemon that offloads heavy operations from Mountain:\n• Update downloads with staged atomic rollback\n• File indexing and symbol extraction\n• Cryptographic signing and authentication\n• Health monitoring with multi-level checks\n\nPrometheus-compatible metrics and distributed tracing with sampling.\n\nRuns independently - persists when the main window closes.\n\nRelease signing and public installer delivery are still being completed",
					}),
				},
				{
					Id: "Cocoon",
					Emoji: "🦋",
					Href: "https://github.com/CodeEditorLand/Cocoon",
					Author: "Cocoon",
					Role: T("home:architecture.cocoon.subtitle", {
						defaultValue:
							"Extension Host - Unmodified VS Code Extensions - Effect-TS Services",
					}),
					Quote: T("home:architecture.cocoon.description", {
						defaultValue:
							"Node.js sidecar that hosts and executes VS Code extensions.\n\nDual-track architecture:\n• Track A loads unmodified extHost sources for maximum compatibility\n• Track B routes I/O-heavy operations to Mountain through gRPC\n\nEffect-TS provides typed errors, scoped resources, and supervised concurrency across all services.\n\nCodegen pipeline walks VS Code extHost source to emit type schemas.\n\nCore API surfaces:\n• Commands\n• Workspace\n• Window\n• Terminal\n• Webview\n• Language providers\n• Diagnostics",
					}),
				},
				{
					Id: "Common",
					Emoji: "👨🏻‍🏭",
					Href: "https://github.com/CodeEditorLand/Common",
					Author: "Common",
					Role: T("home:architecture.common.subtitle", {
						defaultValue:
							"Shared Foundation - Traits - Cross-Element Types",
					}),
					Quote: T("home:architecture.common.description", {
						defaultValue:
							"Pure abstract library - defines the contracts that all Rust components implement, not the implementations themselves.\n\nAsync traits for every service domain:\n• FileSystem\n• Terminal\n• Clipboard\n• Window\n• Configuration\n• Storage\n• Search\n• and more\n\nThe ActionEffect system treats every operation as declarative data - commands, events, and queries share a single type hierarchy across all layers.\n\nTransport-agnostic: supports gRPC, IPC, and WASM strategies.\n\nDual-pipe telemetry (PostHog + OTLP).",
					}),
				},
				{
					Id: "Echo",
					Emoji: "📣",
					Href: "https://github.com/CodeEditorLand/Echo",
					Author: "Echo",
					Role: T("home:architecture.echo.subtitle", {
						defaultValue:
							"Work-Stealing Scheduler - crossbeam-deque - Supervised Worker Pool",
					}),
					Quote: T("home:architecture.echo.description", {
						defaultValue:
							"Work-stealing task scheduler with lock-free queues for bounded background execution.\n\nPriority tiers:\n• High\n• Normal\n• Low\n\nEnsures UI responsiveness stays predictable under I/O load.\n\nWorkers consume from local queues and steal from peers when idle.\n\nIntegrates with the ActionEffect system for cancelable, supervised tasks.\n\nGraceful shutdown paths keep resources from leaking when services terminate.",
					}),
				},
				{
					Id: "Grove",
					Emoji: "🌳",
					Href: "https://github.com/CodeEditorLand/Grove",
					Author: "Grove",
					Role: T("home:architecture.grove.subtitle", {
						defaultValue:
							"WASM Sandbox - Wasmtime Runtime - Capability-Based Isolation",
					}),
					Quote: T("home:architecture.grove.description", {
						defaultValue:
							"WebAssembly sandbox for running extensions in capability-isolated environments.\n\nWASMtime provides:\n• Memory limits\n• Resource controls\n• Fine-grained capability gates\n\nExtensions cannot access host APIs unless explicitly granted.\n\nMultiple transport strategies:\n• gRPC\n• IPC\n• Direct WASM host function calls\n\nShares the same VS Code API surface as Cocoon.\n\nComplements Cocoon's Node.js path with a sandboxed execution alternative.",
					}),
				},
				{
					Id: "Maintain",
					Emoji: "💪🏻",
					Href: "https://github.com/CodeEditorLand/Maintain",
					Author: "Maintain",
					Role: T("home:architecture.maintain.subtitle", {
						defaultValue:
							"Build Orchestrator - Configuration - Release Profiles",
					}),
					Quote: T("home:architecture.maintain.description", {
						defaultValue:
							"Build system using an embedded Rhai scripting engine for flexible cross-element orchestration.\n\nManages build profiles across the Land ecosystem:\n• Development\n• Debug\n• Release\n\nType-safe editing of Cargo.toml and project configuration through scriptable resolvers.\n\nDeterministic release claims are held until the public release pipeline is fully published.",
					}),
				},
				{
					Id: "Mist",
					Emoji: "🌫️",
					Href: "https://github.com/CodeEditorLand/Mist",
					Author: "Mist",
					Role: T("home:architecture.mist.subtitle", {
						defaultValue:
							"Local DNS Sandbox - *.land.playform.cloud Resolution - Network Boundary",
					}),
					Quote: T("home:architecture.mist.description", {
						defaultValue:
							"Local DNS server authoritative for the land.playform.cloud zone - all subdomains resolve to loopback, keeping internal services off the network.\n\nForward allowlisting controls which external domains sidecar processes can reach; everything else is blocked at the DNS layer.\n\nSecurity model:\n• ECDSA DNSSEC signing verifies zone integrity\n• Loopback binding only - no external port exposure\n\nProvides network isolation for Cocoon and Air processes so they cannot leak data to arbitrary hosts.",
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
							"Primary native backend and Tauri application shell - replaces the Electron main process entirely.\n\nImplements all service traits from Common through the declarative ActionEffect system:\n• Windows\n• Files\n• Terminals\n• Clipboard\n• Dialogs\n• Process control\n• OS keychain\n\nHosts the gRPC server for cross-process communication with Cocoon, Air, and Grove.\n\nOrchestrates sidecar lifecycle and manages application state across all connected processes.",
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
							"Build orchestration for VS Code platform source code.\n\nDual-compiler pipeline:\n• Primary ESBuild\n• Optional Rust-native compiler path for faster TypeScript compilation\n\nPlugin-routed transforms handle:\n• Module resolution remapping\n• Define substitution\n• CSS import interception\n• Dead code elimination\n\nEnvironment-variable-driven compiler selection.\n\nPlatform code markers separate platform-specific and cross-platform code at the source level.\n\nConsumed by Cocoon, Sky, and Wind as the shared compilation output.",
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
							"Rust-native TypeScript compilation pipeline built on the OXC toolchain - parser, transformer, and codegen in one process.\n\nHandles:\n• Decorator metadata emission\n• Legacy class field semantics\n• JSX\n• Parallel compilation\n\nSelectable as an alternative compiler to reduce reliance on Node-hosted compilation paths.\n\nSource maps and public benchmark claims remain integration work.",
					}),
				},
				{
					Id: "SideCar",
					Emoji: "🚃",
					Href: "https://github.com/CodeEditorLand/SideCar",
					Author: "SideCar",
					Role: T("home:architecture.sidecar.subtitle", {
						defaultValue:
							"Binary Distributor - Compile-Time Target Triple Selection - Per-Platform Node.js",
					}),
					Quote: T("home:architecture.sidecar.description", {
						defaultValue:
							"Manages pre-compiled platform-specific Node.js binaries for each target platform.\n\nCompile-time binary selection ensures the right runtime is available without runtime detection or download delays.\n\nIntegrity verification and cache management keep sidecar deployments deterministic and reproducible across build environments.",
					}),
				},
				{
					Id: "Sky",
					Emoji: "🌌",
					Href: "https://github.com/CodeEditorLand/Sky",
					Author: "Sky",
					Role: T("home:architecture.sky.subtitle", {
						defaultValue:
							"Visual UI Layer - Astro Components - Three Workbench Layouts",
					}),
					Quote: T("home:architecture.sky.description", {
						defaultValue:
							"Renders the editor interface in the OS WebView using Astro component islands for efficient rendering.\n\nSkyBridge routes Tauri events to VS Code workbench APIs, translating runtime channels into workbench calls.\n\nSupports multiple workbench layouts that adapt the UI layer to different runtimes:\n• Browser proxy\n• Mountain-native\n• Electron\n\nSmart variant selection with conditional imports and tree-shaking keeps the bundle size target-specific.",
					}),
				},
				{
					Id: "Vine",
					Emoji: "🌿",
					Href: "https://github.com/CodeEditorLand/Vine",
					Author: "Vine",
					Role: T("home:architecture.vine.subtitle", {
						defaultValue:
							"gRPC Backbone - Contract-First - .proto Definitions",
					}),
					Quote: T("home:architecture.vine.description", {
						defaultValue:
							"Protocol definitions for gRPC communication between Mountain, Cocoon, Air, and Grove.\n\nCurrent proto contracts live in Mountain/Proto/ and Cocoon:\n• Vine.proto - editor-host IPC\n• Spine.proto - extension coordination\n• Grove.proto - WASM extension protocols\n\nCentralized consolidation into the Vine element is planned as the protocol surface stabilizes.",
					}),
				},
				{
					Id: "Wind",
					Emoji: "🍃",
					Href: "https://github.com/CodeEditorLand/Wind",
					Author: "Wind",
					Role: T("home:architecture.wind.subtitle", {
						defaultValue:
							"Workbench Services - Effect-TS Layers - Native Bridges",
					}),
					Quote: T("home:architecture.wind.description", {
						defaultValue:
							"UI service layer that recreates the VS Code workbench environment inside the Tauri WebView.\n\nEffect-TS services cover:\n• IPC\n• Configuration\n• Editor\n• Terminal\n• Clipboard\n• Dialog\n• FileSystem\n• Window\n• Search\n\nEach with explicit typed error handling and compile-time dependency tracking.\n\nComposed into Layer stacks that target specific runtimes:\n• Tauri (native)\n• Electron (compatibility)\n• Test (isolated)\n\nPreload shim establishes the bridge between VS Code workbench expectations and the Tauri runtime environment.",
					}),
				},
				{
					Id: "Worker",
					Emoji: "🍩",
					Href: "https://github.com/CodeEditorLand/Worker",
					Author: "Worker",
					Role: T("home:architecture.worker.subtitle", {
						defaultValue:
							"Service Worker - Offline Cache - CSS Import Support",
					}),
					Quote: T("home:architecture.worker.description", {
						defaultValue:
							"Service worker that provides offline caching and dynamic CSS import handling for the web shell.\n\nCaching strategy:\n• Network-first for navigation requests\n• Cache-first for static assets\n\nIntercepts JavaScript imports of CSS files and injects them as <link> tags - handles VS Code's pattern of importing stylesheets as JS modules.\n\nAutomatic update detection with client reload when a new version is available.",
					}),
				},
			],
			Columns: 3,
		},
		Download: {
			Title: T("download:title", { defaultValue: "Download" }),
			Subtitle: T("download:subtitle", {
				defaultValue:
					"Source builds today. Public installers, signing, and verification artifacts are being prepared.",
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
					defaultValue: "Rust and Tauri editor stack. CC0.",
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
							Href: "https://github.com/CodeEditorLand/Land/tree/Current/CONTRIBUTING.md",
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
