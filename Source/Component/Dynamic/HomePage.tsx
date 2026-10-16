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
 * Dynamic HomePage composition - Daylight Field Record.
 * Creme canvas, white cards, mono type, green accent.
 */
const HomePage = ({ Content, ClassName }: Property) => {
	const { t: T } = useTranslation(["home", "common", "download", "footer"]);

	const TArr = (Key: string, Fallback: string[]) =>
		T(Key, {
			returnObjects: true,
			defaultValue: Fallback,
		}) as unknown as string[];

	const ResolvedContent: Interface = Content || {
		Hero: {
			Badge: {
				Text: T("home:hero.badge", {
					defaultValue: "NO ELECTRON NO CHROMIUM CC0",
				}),

				Variant: "secondary",
			},

			Title: T("home:hero.title", {
				defaultValue: "",
			}),

			TitleHighlight: T("home:hero.titleHighlight", {
				defaultValue: "LAND",
			}),

			Subtitle: T("home:hero.subtitle", {
				defaultValue:
					"A native code editor with the soul of VS Code - and none of the browser. Built on Rust and Tauri, compatible with the extensions you already use.",
			}),

			PrimaryCTA: {
				Text: T("common:button.download", {
					defaultValue: "ENTER",
				}),

				Variant: "default",

				Size: "lg",

				Icon: "Download",

				Href: "/Download",
			},

			SecondaryCTA: {
				Text: T("common:button.learnMore", {
					defaultValue: "TRACE",
				}),

				Variant: "ghost",

				Size: "lg",

				Icon: "ExternalLink",

				Href: "https://github.com/CodeEditorLand/Land#readme",
			},

			FloatingCard: [
				{
					Id: "1",

					Title: T("home:hero.scene.cards.1.title", {
						defaultValue: "RUST CORE",
					}),

					Tooltip: TArr("home:hero.scene.cards.1.tooltip", [
						"Mountain implements Common traits in Rust via Tauri.",

						"Handles windows, files, terminals, process control, and gRPC IPC through the Vine protocol.",

						"The ActionEffect system treats every operation as declarative data dispatched across layers.",
					]),

					Color: ["var(--ExtensionRust)", "var(--Mute)"],
				},

				{
					Id: "2",

					Title: T("home:hero.scene.cards.2.title", {
						defaultValue: "TAURI UI",
					}),

					Tooltip: TArr("home:hero.scene.cards.2.tooltip", [
						"Sky renders the editor interface in the OS WebView via Astro and routes Tauri events through SkyBridge to VS Code workbench APIs.",

						"Multiple workbench layouts adapt the UI layer to different runtimes: browser proxy, Mountain-native, or Electron.",
					]),

					Color: [
						"var(--ExtensionTauri)",

						"var(--Primary)",

						"var(--Secondary)",

						"var(--Mute)",
					],
				},

				{
					Id: "3",

					Title: T("home:hero.scene.cards.3.title", {
						defaultValue: "EFFECT-TS SERVICES",
					}),

					Tooltip: TArr("home:hero.scene.cards.3.tooltip", [
						"Cocoon and Wind use Effect-TS for typed errors, scoped resources, cancellation, and supervised concurrency.",

						"Wind composes workbench services into Layer stacks that make dependency paths traceable at compile time - one stack per runtime target.",
					]),

					Color: [
						"var(--ExtensionEffectTypeScript)",

						"var(--ExtensionEffectTypeScriptFore)",

						"var(--ExtensionEffectTypeScriptMute)",
					],
				},

				{
					Id: "4",

					Title: T("home:hero.scene.cards.4.title", {
						defaultValue: "GRPC IPC",
					}),

					Tooltip: TArr("home:hero.scene.cards.4.tooltip", [
						"Vine defines the gRPC protocol layer between Mountain, Cocoon, Air, and Grove.",

						"Vine.proto is the canonical contract; Air, Grove, and Mountain carry their own proto files.",

						"Every gRPC call is a typed contract - the wire format is the interface.",
					]),

					Color: ["var(--SpinegRPC)", "var(--SpineIPC)"],
				},

				{
					Id: "5",

					Title: T("home:hero.scene.cards.5.title", {
						defaultValue: "EXTENSION HOST",
					}),

					Tooltip: TArr("home:hero.scene.cards.5.tooltip", [
						"Cocoon runs VS Code extensions via dual-track architecture:",

						"Track A loads unmodified extHost sources for maximum compatibility,",

						"Track B routes I/O-heavy operations to Mountain through gRPC.",
					]),

					Color: ["var(--TierProvider)"],
				},

				{
					Id: "6",

					Title: T("home:hero.scene.cards.6.title", {
						defaultValue: "CROSS-PLATFORM",
					}),

					Tooltip: TArr("home:hero.scene.cards.6.tooltip", [
						"Tauri bundles to native macOS, Windows, and Linux packages using the OS WebView - no embedded Chromium.",

						"Per-platform build configuration and binary management keep cross-compilation paths explicit rather than hidden in installer scripts.",
					]),

					Color: [
						"var(--OSMacOS)",

						"var(--OSWindows)",

						"var(--OSLinux)",
					],
				},

				{
					Id: "7",

					Title: T("home:hero.scene.cards.7.title", {
						defaultValue: "VS CODE API",
					}),

					Tooltip: TArr("home:hero.scene.cards.7.tooltip", [
						"Cocoon implements the VS Code API surface through Effect-TS services: commands, workspace, terminals, webviews, language providers, and diagnostics.",

						"The dual-track architecture preserves compatibility with published extension APIs while routing through native services.",
					]),

					Color: ["var(--SpineIPC)"],
				},

				{
					Id: "8",

					Title: T("home:hero.scene.cards.8.title", {
						defaultValue: "OPEN SOURCE CC0",
					}),

					Tooltip: TArr("home:hero.scene.cards.8.tooltip", [
						"All 16 element repos are under CC0 1.0 Universal public domain.",

						"No attribution required, no compliance restrictions.",

						"Funded by NLnet NGI0 Commons Fund.",
					]),

					Color: ["var(--SpinegRPC)", "var(--ExtensionTauri)"],
				},
			],

			ShowConnectingLines: true,

			ShowParticles: true,

			RespectReducedMotion: true,
		},

		Feature: {
			Title: T("home:features.title", {
				defaultValue: "VS CODE. WITHOUT ELECTRON.",
			}),

			Subtitle: T("home:features.subtitle", {
				defaultValue:
					"Native speed. VS Code compatibility. No Chromium, no compromises.",
			}),

			Feature: [
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
								"Heavy editor work runs natively, not trapped in a web view. Window management, file I/O, and terminals are native Rust services - no serialized JSON IPC bridge.",
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
								"Your VS Code extensions run unmodified - no forks, no rewrites. A compatibility host implements the VS Code extension API surface.",
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
								"Failures are typed, traceable, and cancellable - one supervised fiber never takes down the rest of the editor.",
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
								"Tauri uses the OS WebView on each platform - no bundled Chromium. One codebase compiles to native macOS, Windows, and Linux packages.",
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
						defaultValue: "Background daemon, always running.",
					}),

					Description: T(
						"home:features.item.cicdIntegration.description",

						{
							defaultValue:
								"Updates, indexing, signing, and health checks run in a persistent daemon that keeps working after the main window closes.",
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
								"Fork it, ship it, build commercial products on top of it. The entire codebase is CC0 public domain - no attribution required, no compliance headaches.",
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
					"Funded by NLnet NGI0 Commons Fund.\n\nEach milestone is labelled by what it represents: active source, integration work in progress, or release preparation.",
			}),

			Tier: [
				{
					Identifier: "free",

					Name: T("home:roadmap.tiers.current.name", {
						defaultValue: "ACTIVE NOW",
					}),

					Description: T("home:roadmap.tiers.current.description", {
						defaultValue:
							"A native editor built on Rust and Tauri - no Chromium, no Electron. The active desktop path spans Mountain (backend), Cocoon (extensions), Sky (UI), and Wind (workbench), supported by Vine, Common, Echo, Air, Mist, Rest, Output, SideCar, Maintain, and Cache. Grove hosts Rust and WASM extensions in a Wasmtime sandbox, and Worker serves the web shell.",
					}),

					Price: { Monthly: 0, Yearly: 0 },

					Element: [
						T("home:roadmap.tiers.current.elements.mountain", {
							defaultValue:
								"Mountain\nNative Backend\nReplaces Electron main process, no bundled Chromium",
						}),

						T("home:roadmap.tiers.current.elements.cocoon", {
							defaultValue:
								"Cocoon\nExtension Host\nUnmodified VS Code extensions through Effect-TS routes",
						}),

						T("home:roadmap.tiers.current.elements.wind", {
							defaultValue:
								"Wind\nWorkbench Shell\nEffect-TS layers for native workbench services",
						}),

						T("home:roadmap.tiers.current.elements.sky", {
							defaultValue:
								"Sky\nAstro UI Layer\nWorkbench routes and WebView bridge",
						}),

						T("home:roadmap.tiers.current.elements.air", {
							defaultValue:
								"Air\nBackground Services\nUpdates, downloads, auth, indexing, and health",
						}),

						T("home:roadmap.tiers.current.elements.echo", {
							defaultValue:
								"Echo\nScheduler Primitives\nPriority-aware work stealing for Rust services",
						}),
					],

					Feature: [
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
								"macOS, Windows, and Linux build targets in source",
						}),
					],

					CTA: {
						Text: T("home:roadmap.tiers.current.button", {
							defaultValue: "VIEW ON GITHUB",
						}),

						Variant: "default",

						Href: "https://github.com/CodeEditorLand/Land",
					},

					Popular: true,
				},

				{
					Identifier: "progress",

					Name: T("home:roadmap.tiers.future.name", {
						defaultValue: "V1.0",
					}),

					Status: "WIP",

					Description: T("home:roadmap.tiers.future.description", {
						defaultValue:
							"Signed installers, verified downloads, and broad extension compatibility are the v1.0 target. Vine and Grove are already active: the canonical proto contract is in place, and the WASM sandbox runs on Wasmtime. Cocoon rounds out the compatibility pass with long-tail VS Code API coverage, Echo tunes the work-stealing scheduler, Rest tightens the build pipeline, and Air carries the signing and distribution path.",
					}),

					Price: { Monthly: 0, Yearly: 0 },

					Element: [
						T("home:roadmap.tiers.future.elements.vine", {
							defaultValue:
								"Vine\nProtocol Backbone\nCanonical contract; streaming multiplexer expanding",
						}),

						T("home:roadmap.tiers.future.elements.cocoon", {
							defaultValue:
								"Cocoon\nExtension Compatibility Pass\nLong-tail VS Code API coverage",
						}),

						T("home:roadmap.tiers.future.elements.grove", {
							defaultValue:
								"Grove\nWASM Sandbox\nWasmtime capability-based isolation, active",
						}),

						T("home:roadmap.tiers.future.elements.rest", {
							defaultValue:
								"Rest\nCompilation Pipeline\nOXC compile, bundling coverage expanding",
						}),

						T("home:roadmap.tiers.future.elements.echo", {
							defaultValue:
								"Echo\nScheduler Optimization\nPriority-aware work stealing, tuning in progress",
						}),

						T("home:roadmap.tiers.future.elements.air", {
							defaultValue:
								"Air\nRelease Delivery\nSigning and distribution path",
						}),
					],

					Feature: [
						T("home:roadmap.tiers.future.features.1", {
							defaultValue:
								"Marketplace installation path under review",
						}),

						T("home:roadmap.tiers.future.features.2", {
							defaultValue: "Long-tail VS Code API coverage through Cocoon",
						}),

						T("home:roadmap.tiers.future.features.3", {
							defaultValue: "Vine typed IPC coverage expanding",
						}),

						T("home:roadmap.tiers.future.features.4", {
							defaultValue:
								"Cross-platform public installers via Tauri",
						}),

						T("home:roadmap.tiers.future.features.5", {
							defaultValue: "Echo work-stealing scheduler tuning",
						}),

						T("home:roadmap.tiers.future.features.6", {
							defaultValue:
								"Download distribution and verification publishing",
						}),
					],

					CTA: {
						Text: T("home:roadmap.tiers.future.button", {
							defaultValue: "TRACK PROGRESS",
						}),

						Variant: "outline",

						Href: "https://github.com/CodeEditorLand/Land/milestones",
					},

					Popular: false,
				},
			],
		},

		Testimonial: {
			Title: T("home:architecture.title", {
				defaultValue: "Under the Hood",
			}),

			Subtitle: T("home:architecture.subtitle", {
				defaultValue:
					"Each element replaces one piece of the Electron stack. All inspectable in source.",
			}),

			Testimonial: [
				{
					Id: "Air",

					Emoji: "",

					Href: "https://github.com/CodeEditorLand/Air",

					Author: "Air",

					Role: T("home:architecture.air.subtitle", {
						defaultValue:
							"Background Services Downloader Workspace Indexer",
					}),

					Quote: T("home:architecture.air.description", {
						defaultValue: "Persistent Rust daemon.\u2001Updates, downloads, signing, and health checks outside the main window.\nStaged updates with automatic rollback.\u2001Warm file index across sessions.\nReplaces restart-to-update and cold-start indexing.\u2001Active.",
					}),
				},

				{
					Id: "Cocoon",

					Emoji: "",

					Href: "https://github.com/CodeEditorLand/Cocoon",

					Author: "Cocoon",

					Role: T("home:architecture.cocoon.subtitle", {
						defaultValue:
							"Extension Host Unmodified VS Code Extensions Effect-TS Services",
					}),

					Quote: T("home:architecture.cocoon.description", {
						defaultValue: "Node.js extension host.\u2001Runs existing VS Code extensions unmodified on the full VS Code API surface.\nEvery extension runs in its own supervised Effect fiber.\u2001Crashes are trapped at the supervision boundary.\nReplaces the single-threaded extension host.\u2001Platform-native sandboxing planned.",
					}),
				},

				{
					Id: "Common",

					Emoji: "",

					Href: "https://github.com/CodeEditorLand/Common",

					Author: "Common",

					Role: T("home:architecture.common.subtitle", {
						defaultValue:
							"Shared Foundation Traits Cross-Element Types",
					}),

					Quote: T("home:architecture.common.description", {
						defaultValue: "Pure abstract Rust crate.\u2001No working code, only abstract definitions.\nAsync service traits for every capability.\u2001ActionEffect treats every operation as declarative data.\nTransport-agnostic.\u2001Same handler code over gRPC, IPC, WASM, or Mist.\u2001Active.",
					}),
				},

				{
					Id: "Echo",

					Emoji: "",

					Href: "https://github.com/CodeEditorLand/Echo",

					Author: "Echo",

					Role: T("home:architecture.echo.subtitle", {
						defaultValue:
							"Work-Stealing Scheduler crossbeam-deque Supervised Worker Pool",
					}),

					Quote: T("home:architecture.echo.description", {
						defaultValue: "Priority-aware work-stealing scheduler on crossbeam-deque.\u2001Lock-free queues: no mutex, no contention.\nHigh, Normal, and Low priority tiers.\u2001Workers steal from peers, then fall back to the global queue.\nKeeps UI work responsive under I/O load.\u2001Active.",
					}),
				},

				{
					Id: "Grove",

					Emoji: "",

					Href: "https://github.com/CodeEditorLand/Grove",

					Author: "Grove",

					Role: T("home:architecture.grove.subtitle", {
						defaultValue:
							"WASM Sandbox Wasmtime Runtime Capability-Based Isolation",
					}),

					Quote: T("home:architecture.grove.description", {
						defaultValue: "Rust and WASM extension host.\u2001Wasmtime sandbox: an extension can only touch what is explicitly granted.\nSame VS Code API surface as Cocoon.\u2001gRPC, IPC, direct WASM calls, or Mist transports.\nComplements Cocoon's Node.js path.\u2001Active.",
					}),
				},

				{
					Id: "Maintain",

					Emoji: "",

					Href: "https://github.com/CodeEditorLand/Maintain",

					Author: "Maintain",

					Role: T("home:architecture.maintain.subtitle", {
						defaultValue:
							"Build Orchestrator Configuration Release Profiles",
					}),

					Quote: T("home:architecture.maintain.description", {
						defaultValue: "Deterministic build orchestrator for the Land ecosystem.\u2001One config file loaded through an embedded Rhai engine.\nType-safe editing of Cargo.toml, JSON5, and Info.plist.\u2001Dead-code elimination.\u2001Debug and release profiles.\nSame commit, same output.\u2001Active.",
					}),
				},

				{
					Id: "Mist",

					Emoji: "",

					Href: "https://github.com/CodeEditorLand/Mist",

					Author: "Mist",

					Role: T("home:architecture.mist.subtitle", {
						defaultValue:
							"Local DNS Sandbox *.editor.land Resolution Network Boundary",
					}),

					Quote: T("home:architecture.mist.description", {
						defaultValue: "Local authoritative DNS server for the editor.land zone.\u2001Every subdomain resolves to loopback; nothing escapes the machine.\nAllowlist-based forwarding: only trusted external domains resolve.\u2001Binds to loopback only.\nNetwork isolation for Cocoon and Air.\u2001DNSSEC signing planned.",
					}),
				},

				{
					Id: "Mountain",

					Emoji: "⛰️",

					Href: "https://github.com/CodeEditorLand/Mountain",

					Author: "Mountain",

					Role: T("home:architecture.mountain.subtitle", {
						defaultValue:
							"Native Rust Backend Tauri Replaces Electron Main Process",
					}),

					Quote: T("home:architecture.mountain.description", {
						defaultValue: "Native Rust and Tauri backend.\u2001Implements the Common service traits: files, terminals, dialogs, processes, keychain.\nHosts the gRPC server for the extension host and sidecars.\u2001Manages application state and sidecar lifecycle.\nReplaces the Electron main process.\u2001Active.",
					}),
				},

				{
					Id: "Output",

					Emoji: "⚫",

					Href: "https://github.com/CodeEditorLand/Output",

					Author: "Output",

					Role: T("home:architecture.output.subtitle", {
						defaultValue:
							"Compilation Pipeline Plugin-Routed Deterministic Build",
					}),

					Quote: T("home:architecture.output.description", {
						defaultValue: "Build orchestration for VS Code platform source.\u2001esbuild primary, Rust-native Rest selectable via environment.\nPlugin-routed pipeline.\u2001Node.js API polyfills for the Tauri WebView.\nDeterministic builds.\u2001Shared output for Cocoon, Sky, and Wind.\u2001Active.",
					}),
				},

				{
					Id: "Rest",

					Emoji: "⛱️",

					Href: "https://github.com/CodeEditorLand/Rest",

					Author: "Rest",

					Role: T("home:architecture.rest.subtitle", {
						defaultValue:
							"TypeScript Transform Pipeline OXC Rust-Native",
					}),

					Quote: T("home:architecture.rest.description", {
						defaultValue: "Rust-native TypeScript compilation on the OXC toolchain.\u2001Parser, transformer, and codegen in one process.\nNo Node.js in the hot path.\u2001Decorators, class fields, and JSX.\u2001Parallel compilation across cores.\nBundles the VS Code platform code for the extension host.\u2001Active.",
					}),
				},

				{
					Id: "SideCar",

					Emoji: "",

					Href: "https://github.com/CodeEditorLand/SideCar",

					Author: "SideCar",

					Role: T("home:architecture.sidecar.subtitle", {
						defaultValue:
							"Binary Distributor Compile-Time Target Triple Selection Per-Platform Node.js",
					}),

					Quote: T("home:architecture.sidecar.description", {
						defaultValue: "Prebuilt Node.js binaries per target platform.\u2001Mountain selects the exact binary at compile time. No runtime detection.\nOfficial nodejs.org downloads with checksum verification.\u2001Incremental cache across builds.\nReplaces runtime detection and fallback chains.\u2001Active.",
					}),
				},

				{
					Id: "Sky",

					Emoji: "",

					Href: "https://github.com/CodeEditorLand/Sky",

					Author: "Sky",

					Role: T("home:architecture.sky.subtitle", {
						defaultValue:
							"Visual UI Layer Astro Components Three Workbench Layouts",
					}),

					Quote: T("home:architecture.sky.description", {
						defaultValue: "Declarative UI layer built on Astro.\u2001Renders the editor interface in the OS WebView.\nSkyBridge routes Tauri events to VS Code workbench APIs.\u2001Conditional dynamic imports keep the bundle target-specific.\nWorkbench layouts for Browser, Mountain-native, and Electron.\u2001Active.",
					}),
				},

				{
					Id: "Vine",

					Emoji: "",

					Href: "https://github.com/CodeEditorLand/Vine",

					Author: "Vine",

					Role: T("home:architecture.vine.subtitle", {
						defaultValue:
							"gRPC Backbone Contract-First .proto Definitions",
					}),

					Quote: T("home:architecture.vine.description", {
						defaultValue: "The gRPC backbone of Land.\u2001Proto/Vine.proto is the canonical contract between elements.\nGenerates type-safe Rust clients and servers, plus a TypeScript mirror for the extension host.\nConnects Mountain, Cocoon, Air, and Grove.\u2001Active.",
					}),
				},

				{
					Id: "Wind",

					Emoji: "",

					Href: "https://github.com/CodeEditorLand/Wind",

					Author: "Wind",

					Role: T("home:architecture.wind.subtitle", {
						defaultValue:
							"Workbench Services Effect-TS Layers Native Bridges",
					}),

					Quote: T("home:architecture.wind.description", {
						defaultValue: "Effect-TS service layer.\u2001Recreates the VS Code workbench environment inside the Tauri WebView.\nTyped Tauri commands replace Electron's untyped JSON IPC bridge.\nLayer stacks for Tauri, Electron compatibility, and isolated tests.\u2001Active.",
					}),
				},

				{
					Id: "Worker",

					Emoji: "",

					Href: "https://github.com/CodeEditorLand/Worker",

					Author: "Worker",

					Role: T("home:architecture.worker.subtitle", {
						defaultValue:
							"Service Worker Offline Cache CSS Import Support",
					}),

					Quote: T("home:architecture.worker.description", {
						defaultValue: "Service worker for the web shell.\u2001Offline caching: network-first for navigation, cache-first for static assets.\nIntercepts CSS imports and injects link tags for VS Code's stylesheet-as-module pattern.\nNew-version detection with client reload.\u2001Active.",
					}),
				},
			],

			Column: "masonry",
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

			OnDownload: async (Platform: { Name: string; id?: string }) => {
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
					defaultValue: "CODE EDITOR LAND",
				}),

				Description: T("footer:brand.description", {
					defaultValue:
						"No Electron. No Chromium. Every extension runs unchanged.\n\nOpen source and free forever.",
				}),
			},

			Social: {
				GitHub: "https://github.com/CodeEditorLand/Land",
			},

			Columns: [
				{
					Title: T("footer:columns.product.title", {
						defaultValue: "PRODUCT",
					}),

					Links: [
						{
							Label: T("footer:columns.product.features", {
								defaultValue: "FEATURE",
							}),

							Href: "/#features",
						},

						{
							Label: T("footer:columns.product.downloads", {
								defaultValue: "DOWNLOAD",
							}),

							Href: "/Download",
						},

						{
							Label: T("footer:columns.product.docs", {
								defaultValue: "DOCUMENTATION",
							}),

							Href: "https://github.com/CodeEditorLand/Land#readme",
						},
					],
				},

				{
					Title: T("footer:columns.company.title", {
						defaultValue: "COMMUNITY",
					}),

					Links: [
						{
							Label: T("footer:columns.company.github", {
								defaultValue: "GITHUB",
							}),

							Href: "https://github.com/CodeEditorLand/Land",
						},

						{
							Label: T("footer:columns.company.issues", {
								defaultValue: "ISSUES",
							}),

							Href: "https://github.com/CodeEditorLand/Land/issues",
						},

						{
							Label: T("footer:columns.company.contributing", {
								defaultValue: "CONTRIBUTING",
							}),

							Href: "https://github.com/CodeEditorLand/Land/tree/Current/CONTRIBUTING.md",
						},
					],
				},

				{
					Title: T("footer:columns.legal.title", {
						defaultValue: "LEGAL",
					}),

					Links: [
						{
							Label: T("footer:columns.legal.privacy", {
								defaultValue: "PRIVACY",
							}),

							Href: "/Legal/Privacy",
						},

						{
							Label: T("footer:columns.legal.terms", {
								defaultValue: "TERMS",
							}),

							Href: "/Legal/Term",
						},

						{
							Label: T("footer:columns.legal.license", {
								defaultValue: "LICENSE",
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

		Feature,

		Pricing,

		Testimonial: Testimonials,

		Download,

		Header: HeaderContent,
	} = ResolvedContent;

	return (
		<div className={`flex min-h-screen flex-col ${ClassName || ""}`}>
			{HeaderContent !== undefined && (
				<Header Content={HeaderContent} Mode="minimal" />
			)}

			<div className="flex-1" role="region" aria-label="Page content">
				<ErrorBoundary
					FallbackComponent={() => (
						<SkeletonFeatureCard className="min-h-[60dvh]" />
					)}
				>
					<DynamicHeroSection Content={Hero} />
				</ErrorBoundary>
				<ErrorBoundary
					FallbackComponent={() => (
						<div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
							{[1, 2, 3, 4, 5, 6].map((Index) => (
								<SkeletonFeatureCard key={Index} />
							))}
						</div>
					)}
				>
					<DynamicFeatures Content={Feature} />
				</ErrorBoundary>
				<ErrorBoundary
					FallbackComponent={() => (
						<div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
							{[1, 2, 3].map((Index) => (
								<SkeletonPricingTier key={Index} />
							))}
						</div>
					)}
				>
					<DynamicPricing Content={Pricing} />
				</ErrorBoundary>
				<ErrorBoundary
					FallbackComponent={() => (
						<div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
							{[1, 2, 3].map((Index) => (
								<SkeletonCard key={Index} />
							))}
						</div>
					)}
				>
					<DynamicTestimonials Content={Testimonials} />
				</ErrorBoundary>
				<ErrorBoundary
					FallbackComponent={() => (
						<SkeletonCard className="min-h-[30dvh]" />
					)}
				>
					<DynamicPlatformGrid Content={Download} />
				</ErrorBoundary>
			</div>
		</div>
	);
};

export { HomePage };

export default HomePage;
