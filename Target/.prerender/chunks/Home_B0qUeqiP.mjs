//#region Source/Library/I18n/Locale/Fr/Home.json
var features = {
	"badge": "Feature",
	"item": {
		"designTokens": {
			"title": "Native services where they count.",
			"description": "Heavy editor work runs natively - not trapped in a web view. Window management, file I/O, and terminal IPC go straight through a Rust + Tauri services layer."
		},
		"componentLibrary": {
			"title": "Unmodified extensions, no fork path.",
			"description": "Your VS Code extensions run unmodified - no forks, no rewrites. A compatibility host speaks the VS Code extension API directly."
		},
		"documentation": {
			"title": "Fibers, not Promises.",
			"description": "Failures are typed, traceable, and cancellable - so the editor fails loudly in development instead of silently in production."
		},
		"versionControl": {
			"title": "One source tree, configured targets.",
			"description": "Tauri uses the OS WebView on each platform - no bundled Chromium. One codebase compiles to native macOS, Windows, and Linux packages."
		},
		"cicdIntegration": {
			"title": "Background daemon, always running.",
			"description": "Updates, indexing, signing, and health checks run in a persistent daemon - survives when the main window closes."
		},
		"collaboration": {
			"title": "CC0. No restrictions.",
			"description": "Fork it, ship it, build commercial products on top of it. The entire codebase is CC0 public domain - no attribution required, no compliance headaches."
		}
	},
	"subtitle": "Native speed. VS Code compatibility. No Chromium, no compromises.",
	"title": "VS Code. Without Electron."
};
var pricing = { "labels": { "popular": "Most Popular" } };
var hero = {
	"badge": "No Electron No Chromium CC0",
	"subtitle": "A native code editor with the soul of VS Code - and none of the browser. Built on Rust and Tauri, compatible with the extensions you already use.",
	"title": "",
	"titleHighlight": "Land",
	"scene": { "cards": {
		"1": {
			"title": "Rust Core",
			"tooltip": [
				"Mountain implements Common traits in Rust via Tauri.",
				"Handles windows, files, terminals, process control, and gRPC IPC through the Vine protocol.",
				"The ActionEffect system treats every operation as declarative data dispatched across layers."
			]
		},
		"2": {
			"title": "Tauri UI",
			"tooltip": ["Sky renders the editor interface in the OS WebView via Astro and routes Tauri events through SkyBridge to VS Code workbench APIs.", "Multiple workbench layouts adapt the UI layer to different runtimes: browser proxy, Mountain-native, or Electron."]
		},
		"3": {
			"title": "Effect-TS Services",
			"tooltip": ["Cocoon and Wind use Effect-TS for typed errors, scoped resources, cancellation, and supervised concurrency.", "Wind composes workbench services into Layer stacks that make dependency paths traceable at compile time - one stack per runtime target."]
		},
		"4": {
			"title": "gRPC IPC",
			"tooltip": [
				"Vine defines the gRPC protocol layer between Mountain, Cocoon, Air, and Grove.",
				"Proto definitions currently live in Mountain and Cocoon while Vine consolidates.",
				"Every gRPC call is a typed contract - the wire format is the interface."
			]
		},
		"5": {
			"title": "Extension Host",
			"tooltip": [
				"Cocoon runs VS Code extensions via dual-track architecture:",
				"Track A loads unmodified extHost sources for maximum compatibility,",
				"Track B routes I/O-heavy operations to Mountain through gRPC.",
				"Effect-TS services implement the vscode API shim across both tracks."
			]
		},
		"6": {
			"title": "Cross-Platform",
			"tooltip": ["Tauri bundles to native macOS, Windows, and Linux packages using the OS WebView - no embedded Chromium.", "Per-platform build configuration and binary management keep cross-compilation paths explicit rather than hidden in installer scripts."]
		},
		"7": {
			"title": "VS Code API",
			"tooltip": ["Cocoon implements the VS Code API surface through Effect-TS services: commands, workspace, terminals, webviews, language providers, and diagnostics.", "The dual-track architecture preserves compatibility with published extension APIs while routing through native services."]
		},
		"8": {
			"title": "Open Source CC0",
			"tooltip": [
				"All 15 element repos are under CC0 1.0 Universal public domain.",
				"No attribution required, no compliance restrictions.",
				"Funded by NLnet NGI0 Commons Fund."
			]
		}
	} }
};
var nav = {
	"docs": "Documentation",
	"downloads": "Download",
	"features": "Features",
	"github": "GitHub"
};
var roadmap = {
	"title": "The Architecture Is Built. Here Is What Comes Next.",
	"subtitle": "Funded by NLnet NGI0 Commons Fund.\n\nEach milestone is labelled by what it represents: active source, integration work in progress, or release preparation.",
	"tiers": {
		"current": {
			"name": "Active Now",
			"description": "A native editor built on Rust and Tauri - no Chromium, no Electron. The active desktop path spans Mountain (backend), Cocoon (extensions), Sky (UI), and Wind (workbench), supported by Vine, Common, Echo, Air, Mist, Rest, Output, SideCar, and Maintain. Grove and Worker are present with integration scope that differs by build profile.",
			"features": {
				"1": "Installed extensions run unmodified through Cocoon",
				"2": "Tauri desktop path uses the operating system WebView",
				"3": "Effect fibers for cancellable service work",
				"4": "Telemetry features are compile-gated in Rust",
				"5": "CC0 public domain no restrictions",
				"6": "macOS, Windows, and Linux build targets in source"
			},
			"button": "View on GitHub",
			"elements": {
				"mountain": "Mountain\nNative Backend\nReplaces Electron main process, no bundled Chromium",
				"cocoon": "Cocoon\nExtension Host\nUnmodified VS Code extensions through Effect-TS routes",
				"wind": "Wind\nWorkbench Shell\nEffect-TS layers for native workbench services",
				"sky": "Sky\nAstro UI Layer\nWorkbench routes and WebView bridge",
				"air": "Air\nBackground Services\nUpdates, downloads, auth, indexing, and health",
				"echo": "Echo\nScheduler Primitives\nBounded background work for Rust services"
			}
		},
		"future": {
			"name": "v1.0",
			"description": "Signed installers, verified downloads, and broad extension compatibility are the v1.0 target. Vine consolidates cross-element protocols. Grove adds WASM sandboxing for extensions. Rest and Echo tighten the build pipeline and scheduler. Long-tail VS Code API coverage rounds out the Cocoon compatibility pass.",
			"features": {
				"1": "Marketplace installation path under review",
				"2": "Grove Wasmtime host integration",
				"3": "Vine typed IPC coverage expanding",
				"4": "Cross-platform public installers via Tauri",
				"5": "Source map generation via OXC",
				"6": "Download distribution and verification publishing"
			},
			"elements": {
				"vine": "Vine\nProtocol In Progress\nMountain, Cocoon, Air, and Grove contracts",
				"cocoon": "Cocoon\nExtension Compatibility Pass\nLong-tail VS Code API coverage",
				"grove": "Grove\nWASM Host Stabilizing\nCapability-based extension isolation path",
				"rest": "Rest\nSource Map Support\nOXC transformer integration in progress",
				"echo": "Echo\nScheduler Optimization\nFaster steal, lower latency",
				"air": "Air\nRelease Delivery\nSigning and distribution path"
			},
			"button": "Track Progress"
		}
	}
};
var architecture = {
	"title": "Under the Hood",
	"subtitle": "Each element replaces one piece of the Electron stack. All inspectable in source.",
	"air": {
		"subtitle": "Background Services Downloader Workspace Indexer",
		"description": "Background daemon that runs independently - updates, indexing, signing, and health checks, all outside the main window.\n• Update downloads with staged atomic rollback\n• File indexing and symbol extraction\n• Cryptographic signing and authentication\n• Health monitoring with multi-level checks\n\nPrometheus-compatible metrics and distributed tracing with sampling."
	},
	"cocoon": {
		"subtitle": "Extension Host Unmodified VS Code Extensions Effect-TS Services",
		"description": "Node.js sidecar that hosts and executes VS Code extensions.\n\nDual-track architecture:\n• Track A loads unmodified extHost sources for maximum compatibility\n• Track B routes I/O-heavy operations to Mountain through gRPC\n\nEffect-TS provides typed errors, scoped resources, and supervised concurrency across all services.\n\nCodegen pipeline walks VS Code extHost source to emit type schemas.\n\nCore API surfaces:\n• Commands\n• Workspace\n• Window\n• Terminal\n• Webview\n• Language providers\n• Diagnostics"
	},
	"common": {
		"subtitle": "Shared Foundation Traits Cross-Element Types",
		"description": "Pure abstract library - defines the contracts that all Rust components implement, not the implementations themselves.\n\nAsync traits for every service domain:\n• FileSystem\n• Terminal\n• Clipboard\n• Window\n• Configuration\n• Storage\n• Search\n• and more\n\nThe ActionEffect system treats every operation as declarative data - commands, events, and queries share a single type hierarchy across all layers.\n\nTransport-agnostic: supports gRPC, IPC, and WASM strategies.\n\nDual-pipe telemetry (PostHog + OTLP)."
	},
	"echo": {
		"subtitle": "Work-Stealing Scheduler crossbeam-deque Supervised Worker Pool",
		"description": "Work-stealing task scheduler with lock-free queues for bounded background execution.\n\nPriority tiers:\n• High\n• Normal\n• Low\n\nEnsures UI responsiveness stays predictable under I/O load.\n\nWorkers consume from local queues and steal from peers when idle.\n\nIntegrates with the ActionEffect system for cancelable, supervised tasks.\n\nGraceful shutdown paths keep resources from leaking when services terminate."
	},
	"grove": {
		"subtitle": "WASM Sandbox Wasmtime Runtime Capability-Based Isolation",
		"description": "WebAssembly sandbox for running extensions in capability-isolated environments.\n\nWASMtime provides:\n• Memory limits\n• Resource controls\n• Fine-grained capability gates\n\nExtensions cannot access host APIs unless explicitly granted.\n\nMultiple transport strategies:\n• gRPC\n• IPC\n• Direct WASM host function calls\n\nShares the same VS Code API surface as Cocoon.\n\nComplements Cocoon's Node.js path with a sandboxed execution alternative."
	},
	"maintain": {
		"subtitle": "Build Orchestrator Configuration Release Profiles",
		"description": "Build system using an embedded Rhai scripting engine for flexible cross-element orchestration.\n\nManages build profiles across the Land ecosystem:\n• Development\n• Debug\n• Release\n\nType-safe editing of Cargo.toml and project configuration through scriptable resolvers.\n\nRelease pipeline preparation - signing, artifact publication, and distribution - is in progress."
	},
	"mist": {
		"subtitle": "Local DNS Sandbox *.editor.land Resolution Network Boundary",
		"description": "Local DNS server authoritative for the editor.land zone - all subdomains resolve to loopback, keeping internal services off the network.\n\nForward allowlisting controls which external domains sidecar processes can reach; everything else is blocked at the DNS layer.\n\nSecurity model:\n• ECDSA DNSSEC signing verifies zone integrity\n• Loopback binding only - no external port exposure\n\nProvides network isolation for Cocoon and Air processes so they cannot leak data to arbitrary hosts."
	},
	"mountain": {
		"subtitle": "Native Rust Backend Tauri Replaces Electron Main Process",
		"description": "Primary native backend and Tauri application shell - replaces the Electron main process entirely.\n\nImplements all service traits from Common through the declarative ActionEffect system:\n• Windows\n• Files\n• Terminals\n• Clipboard\n• Dialogs\n• Process control\n• OS keychain\n\nHosts the gRPC server for cross-process communication with Cocoon, Air, and Grove.\n\nOrchestrates sidecar lifecycle and manages application state across all connected processes."
	},
	"output": {
		"subtitle": "Compilation Pipeline Plugin-Routed Deterministic Checksum",
		"description": "Build orchestration for VS Code platform source code.\n\nDual-compiler pipeline:\n• Primary ESBuild\n• Optional Rust-native compiler path for faster TypeScript compilation\n\nPlugin-routed transforms handle:\n• Module resolution remapping\n• Define substitution\n• CSS import interception\n• Dead code elimination\n\nEnvironment-variable-driven compiler selection.\n\nPlatform code markers separate platform-specific and cross-platform code at the source level.\n\nConsumed by Cocoon, Sky, and Wind as the shared compilation output."
	},
	"rest": {
		"subtitle": "TypeScript Transform Pipeline OXC Rust-Native",
		"description": "Rust-native TypeScript compilation pipeline built on the OXC toolchain - parser, transformer, and codegen in one process.\n\nHandles:\n• Decorator metadata emission\n• Legacy class field semantics\n• JSX\n• Parallel compilation\n\nSelectable as an alternative compiler to reduce reliance on Node-hosted compilation paths.\n\nSource map output and measured pipeline benchmarks are in active development."
	},
	"sidecar": {
		"subtitle": "Binary Distributor Compile-Time Target Triple Selection Per-Platform Node.js",
		"description": "Manages pre-compiled platform-specific Node.js binaries for each target platform.\n\nCompile-time binary selection ensures the right runtime is available without runtime detection or download delays.\n\nIntegrity verification and cache management keep sidecar deployments deterministic and reproducible across build environments."
	},
	"sky": {
		"subtitle": "Visual UI Layer Astro Components Three Workbench Layouts",
		"description": "Renders the editor interface in the OS WebView using Astro component islands for efficient rendering.\n\nSkyBridge routes Tauri events to VS Code workbench APIs, translating runtime channels into workbench calls.\n\nSupports multiple workbench layouts that adapt the UI layer to different runtimes:\n• Browser proxy\n• Mountain-native\n• Electron\n\nSmart variant selection with conditional imports and tree-shaking keeps the bundle size target-specific."
	},
	"vine": {
		"subtitle": "gRPC Backbone Contract-First .proto Definitions",
		"description": "Protocol definitions for gRPC communication between Mountain, Cocoon, Air, and Grove.\n\nCurrent proto contracts live in Mountain/Proto/ and Cocoon:\n• Vine.proto - editor-host IPC\n• Spine.proto - extension coordination\n• Grove.proto - WASM extension protocols\n\nCentralized consolidation into the Vine element is planned as the protocol surface stabilizes."
	},
	"wind": {
		"subtitle": "Workbench Services Effect-TS Layers Native Bridges",
		"description": "UI service layer that recreates the VS Code workbench environment inside the Tauri WebView.\n\nEffect-TS services cover:\n• IPC\n• Configuration\n• Editor\n• Terminal\n• Clipboard\n• Dialog\n• FileSystem\n• Window\n• Search\n\nEach with explicit typed error handling and compile-time dependency tracking.\n\nComposed into Layer stacks that target specific runtimes:\n• Tauri (native)\n• Electron (compatibility)\n• Test (isolated)\n\nPreload shim establishes the bridge between VS Code workbench expectations and the Tauri runtime environment."
	},
	"worker": {
		"subtitle": "Service Worker Offline Cache CSS Import Support",
		"description": "Service worker that provides offline caching and dynamic CSS import handling for the web shell.\n\nCaching strategy:\n• Network-first for navigation requests\n• Cache-first for static assets\n\nIntercepts JavaScript imports of CSS files and injects them as <link> tags - handles VS Code's pattern of importing stylesheets as JS modules.\n\nAutomatic update detection with client reload when a new version is available."
	}
};
var Home_default = {
	features,
	pricing,
	hero,
	nav,
	roadmap,
	architecture
};
//#endregion
export { nav as a, hero as i, architecture as n, pricing as o, features as r, roadmap as s, Home_default as t };
