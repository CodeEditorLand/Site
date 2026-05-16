const e={badge:"Feature",item:{designTokens:{title:"Native services where they count.",description:`Mountain handles window management, file I/O, child processes, terminal IPC, and extension communication through Tauri - using the ActionEffect system for declarative, dispatchable operations. Echo provides work-stealing scheduler primitives for bounded background work.

That gives Land a native path to move heavy editor work out of the WebView without claiming benchmark numbers before a reproducible suite exists.`},componentLibrary:{title:"Unmodified extensions, no fork path.",description:`Cocoon hosts existing VS Code extensions using Effect-TS through a dual-track architecture: Track A loads unmodified extHost sources for maximum compatibility, Track B routes I/O-heavy operations to Mountain through gRPC. The vscode API shim covers commands, workspace, terminals, webviews, language providers, and diagnostics.

Extensions run unmodified through the active compatibility path. Marketplace-wide coverage still depends on each extension API usage and on services still being filled in.`},documentation:{title:"Fibers, not Promises.",description:`Effect-TS gives Cocoon and Wind typed errors, scoped resources, explicit cancellability, and supervised concurrency for extension-host and workbench services. Wind composes services into Layer stacks that target specific runtimes - native, compatibility, or test - with compile-time dependency tracking.

That does not remove every runtime bug, but it does make failure paths explicit and traceable through the services Land controls.`},versionControl:{title:"One source tree, configured targets.",description:`Tauri uses the OS WebView on each platform instead of a bundled Chromium instance. Mountain's desktop path has no embedded browser engine. Per-platform binary management keeps cross-compilation paths explicit and reproducible.

The repository includes macOS, Windows, and Linux build configuration. macOS is the primary path, with Windows and Linux installer coverage still being completed.`},cicdIntegration:{title:"Update plumbing in progress.",description:`Air provides persistent background services for update downloads and verification, file indexing, cryptographic signing, and health monitoring. Runs as an independent daemon - persists when the main window closes.

Those services are real source today. The public updater flow, signing story, and release distribution path are still being finished.`},collaboration:{title:"CC0. No restrictions.",description:`Most open source editors have license clauses that restrict commercial use, require attribution, or forbid forking the UI.

The entire Land codebase is CC0 public domain. Use it, fork it, ship it, build commercial products on top of it. No attribution required. No compliance headaches.`}},subtitle:"The editor pieces are being rebuilt around native services, typed IPC, and a compatibility host that can be checked against real source.",title:"VS Code. Without Electron."},t={badge:"No Electron   No Chromium   CC0",subtitle:`VS Code runs on Electron. Land is rebuilding the editor stack around Rust, Tauri, and Effect-TS while keeping the VS Code extension API as the compatibility target.

The primary path is source-build first today, with public installers and long-tail extension coverage still in progress.`,title:"The Future of Code Editing",titleHighlight:"Land",atScale:"starts here",cta:{primary:"Download",secondary:"Learn More"},scene:{description:"Animated architecture visualization",hub:"Core Architecture",components:{button:"Rust Core",colors:"Tauri UI",typography:"Effect-TS Services",components:"gRPC IPC",spacing:"Extension Host",icons:"Cross-Platform",docs:"VS Code API",versions:"Open Source CC0"}}},i={docs:"Docs",downloads:"Download",features:"Features",github:"GitHub"},n={subtitle:`Code Editor Land is completely free.

No tiers, no subscriptions, no restrictions.`,labels:{monthly:"Monthly",yearly:"Yearly",savings:"(Save up to 20%)",popular:"Most Popular",perMonth:"/month",perYear:"/year",free:"Free"},toggle:{toMonthly:"Switch to {{label}} billing",toYearly:"Switch to {{label}} billing"},tiers:{free:{name:"Community",description:`For everyone.

Full editor features, completely free.`,features:{1:"Full VS Code compatibility",2:"All extensions supported",3:"Native Rust performance",4:"Cross-platform (macOS, Windows, Linux)",5:"Effect-TS type-safe UI",6:"gRPC-based architecture",7:"Open source (CC0 license)"},button:"Download Now"}},title:"Free Forever, Open Source",badge:"Pricing"},o={title:"The Architecture Is Built. Here Is What Comes Next.",subtitle:`Funded by NLnet NGI0 Commons Fund.

Every milestone is described as source status, integration status, or release work so the website does not outrun the code.`,tiers:{current:{name:"Active Now",description:"The fifteen element directories are present in the Land workspace. The active desktop path is Mountain, Cocoon, Sky, Wind, Vine, Common, Echo, Air, Mist, Rest, Output, SideCar, and Maintain. Grove and Worker are present with integration scope that differs by build profile.",features:{1:"Installed extensions run unmodified through Cocoon",2:"Tauri desktop path uses the operating system WebView",3:"Effect fibers for cancellable service work",4:"Telemetry features are compile-gated in Rust",5:"CC0 public domain no restrictions",6:"macOS primary path, Windows and Linux configured"},button:"View on GitHub",elements:{mountain:`Mountain   ⛰️
Native Backend
Replaces Electron main process, no bundled Chromium`,cocoon:`Cocoon   🦋
Extension Host
Unmodified VS Code extensions through Effect-TS routes`,wind:`Wind   🍃
Workbench Shell
Effect-TS layers for native workbench services`,sky:`Sky   🌌
Astro UI Layer
Workbench routes and WebView bridge`,air:`Air   🪁
Background Services
Updates, downloads, auth, indexing, and health`,echo:`Echo   📣
Scheduler Primitives
Bounded background work for Rust services`}},next:{name:"Extension Compatibility Complete",description:"The VS Code marketplace works end-to-end. Language servers initialize in parallel. IntelliSense is ready before you finish the first keystroke.",features:{1:"Full marketplace   every extension installs and activates",2:"Language servers in parallel via Echo thread pool",3:"Vine gRPC protocol stabilized   typed IPC at every boundary",4:"Air daemon live   silent updates staged between sessions"}},future:{name:"v1.0",description:"Active milestones across the element repos. These items are integration and release goals, not claims that the public build already ships them.",features:{1:"Marketplace installation path under review",2:"Grove Wasmtime host integration",3:"Vine typed IPC coverage expanding",4:"Cross-platform public installers via Tauri",5:"Source map generation via OXC",6:"Download distribution and verification publishing"},elements:{vine:`Vine   🌿
Protocol In Progress
Mountain, Cocoon, Air, and Grove contracts`,cocoon:`Cocoon   🦋
Extension Compatibility Pass
Long-tail VS Code API coverage`,grove:`Grove   🌳
WASM Host Stabilizing
Capability-based extension isolation path`,rest:`Rest   ⛱️
Source Map Support
OXC transformer integration in progress`,echo:`Echo   📣
Scheduler Optimization
Faster steal, lower latency`,air:`Air   🪁
Release Delivery
Signing and distribution path`},button:"Track Progress"}}},r={title:"Under the Hood",subtitle:`Land replaces VS Code's Electron stack element by element.

The element directories are inspectable in source, but each one is described here by what the current code supports or is actively wiring.`,air:{subtitle:"Background Services - Downloader - Workspace Indexer",description:`Persistent background daemon that offloads heavy operations from Mountain: update downloads with staged atomic rollback, file indexing and symbol extraction, cryptographic signing and authentication, health monitoring with multi-level checks.
Prometheus-compatible metrics and distributed tracing with sampling.
Runs independently - persists when the main window closes.
Release signing and public installer delivery are still being completed`},cocoon:{subtitle:"Extension Host - Unmodified VS Code Extensions - Effect-TS Services",description:`Node.js sidecar that hosts and executes VS Code extensions. Dual-track architecture: Track A loads unmodified extHost sources for maximum compatibility, Track B routes I/O-heavy operations to Mountain through gRPC.
Effect-TS provides typed errors, scoped resources, and supervised concurrency across all services.
Codegen pipeline walks VS Code extHost source to emit type schemas.
Core API surfaces: commands, workspace, window, terminal, webview, language providers, and diagnostics.`},common:{subtitle:"Shared Foundation - Traits - Cross-Element Types",description:`Pure abstract library - defines the contracts that all Rust components implement, not the implementations themselves.
Async traits for every service domain: FileSystem, Terminal, Clipboard, Window, Configuration, Storage, Search, and more.
The ActionEffect system treats every operation as declarative data - commands, events, and queries share a single type hierarchy across all layers.
Transport-agnostic: supports gRPC, IPC, and WASM strategies. Dual-pipe telemetry (PostHog + OTLP).`},echo:{subtitle:"Work-Stealing Scheduler - crossbeam-deque - Supervised Worker Pool",description:`Work-stealing task scheduler with lock-free queues for bounded background execution.
Priority tiers (High/Normal/Low) ensure UI responsiveness stays predictable under I/O load.
Workers consume from local queues and steal from peers when idle. Integrates with the ActionEffect system for cancelable, supervised tasks.
Graceful shutdown paths keep resources from leaking when services terminate.`},grove:{subtitle:"WASM Sandbox - Wasmtime Runtime - Capability-Based Isolation",description:`WebAssembly sandbox for running extensions in capability-isolated environments.
WASMtime provides memory limits, resource controls, and fine-grained capability gates - extensions cannot access host APIs unless explicitly granted.
Multiple transport strategies: gRPC, IPC, or direct WASM host function calls. Shares the same VS Code API surface as Cocoon.
Complements Cocoon's Node.js path with a sandboxed execution alternative.`},maintain:{subtitle:"Build Orchestrator - Configuration - Release Profiles",description:`Build system using an embedded Rhai scripting engine for flexible cross-element orchestration.
Manages development, debug, and release build profiles across the Land ecosystem.
Type-safe editing of Cargo.toml and project configuration through scriptable resolvers.
Deterministic release claims are held until the public release pipeline is fully published.`},mist:{subtitle:"Local DNS Sandbox - *.editor.land Resolution - Network Boundary",description:`Local DNS server authoritative for the editor.land zone - all subdomains resolve to loopback, keeping internal services off the network.
Forward allowlisting controls which external domains sidecar processes can reach; everything else is blocked at the DNS layer.
ECDSA DNSSEC signing verifies zone integrity. Loopback binding only - no external port exposure.
Provides network isolation for Cocoon and Air processes so they cannot leak data to arbitrary hosts.`},mountain:{subtitle:"Native Rust Backend - Tauri - Replaces Electron Main Process",description:`Primary native backend and Tauri application shell - replaces the Electron main process entirely.
Implements all service traits from Common through the declarative ActionEffect system: windows, files, terminals, clipboard, dialogs, process control, and OS keychain.
Hosts the gRPC server for cross-process communication with Cocoon, Air, and Grove.
Orchestrates sidecar lifecycle and manages application state across all connected processes.`},output:{subtitle:"Compilation Pipeline - Plugin-Routed - Deterministic Checksum",description:`Build orchestration for VS Code platform source code. Dual-compiler pipeline: primary ESBuild with an optional Rust-native compiler path for faster TypeScript compilation.
Plugin-routed transforms handle module resolution remapping, define substitution, CSS import interception, and dead code elimination.
Environment-variable-driven compiler selection. Platform code markers separate platform-specific and cross-platform code at the source level.
Consumed by Cocoon, Sky, and Wind as the shared compilation output.`},rest:{subtitle:"TypeScript Transform Pipeline - OXC - Rust-Native",description:`Rust-native TypeScript compilation pipeline built on the OXC toolchain - parser, transformer, and codegen in one process.
Handles decorator metadata emission, legacy class field semantics, JSX, and parallel compilation.
Selectable as an alternative compiler to reduce reliance on Node-hosted compilation paths.
Source maps and public benchmark claims remain integration work.`},sidecar:{subtitle:"Binary Distributor - Compile-Time Target Triple Selection - Per-Platform Node.js",description:`Manages pre-compiled platform-specific Node.js binaries for each target platform.
Compile-time binary selection ensures the right runtime is available without runtime detection or download delays.
Integrity verification and cache management keep sidecar deployments deterministic and reproducible across build environments.`},sky:{subtitle:"Visual UI Layer - Astro Components - Three Workbench Layouts",description:`Renders the editor interface in the OS WebView using Astro component islands for efficient rendering.
SkyBridge routes Tauri events to VS Code workbench APIs, translating runtime channels into workbench calls.
Supports multiple workbench layouts that adapt the UI layer to different runtimes: browser proxy, Mountain-native, or Electron.
Smart variant selection with conditional imports and tree-shaking keeps the bundle size target-specific.`},vine:{subtitle:"gRPC Backbone - Contract-First - .proto Definitions",description:`Protocol definitions for gRPC communication between Mountain, Cocoon, Air, and Grove.
Current proto contracts live in Mountain/Proto/ and Cocoon: Vine.proto for editor-host IPC, Spine.proto for extension coordination, and Grove.proto for WASM extension protocols.
Centralized consolidation into the Vine element is planned as the protocol surface stabilizes.`},wind:{subtitle:"Workbench Services - Effect-TS Layers - Native Bridges",description:`UI service layer that recreates the VS Code workbench environment inside the Tauri WebView.
Effect-TS services cover IPC, Configuration, Editor, Terminal, Clipboard, Dialog, FileSystem, Window, and Search - each with explicit typed error handling and compile-time dependency tracking.
Composed into Layer stacks that target specific runtimes: Tauri (native), Electron (compatibility), and Test (isolated).
Preload shim establishes the bridge between VS Code workbench expectations and the Tauri runtime environment.`},worker:{subtitle:"Service Worker - Offline Cache - CSS Import Support",description:`Service worker that provides offline caching and dynamic CSS import handling for the web shell.
Network-first strategy for navigation requests, cache-first for static assets.
Intercepts JavaScript imports of CSS files and injects them as <link> tags - handles VS Code's pattern of importing stylesheets as JS modules.
Automatic update detection with client reload when a new version is available.`}},s={features:e,hero:t,nav:i,pricing:n,roadmap:o,architecture:r};export{r as architecture,s as default,e as features,t as hero,i as nav,n as pricing,o as roadmap};
