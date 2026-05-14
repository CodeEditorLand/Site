const e={badge:"Feature",item:{designTokens:{title:"Native services where they count.",description:`Mountain contains Rust services for windows, files, terminals, child processes, clipboard, and extension IPC. Echo provides scheduler primitives for bounded background work.

That gives Land a native path to move heavy editor work out of the WebView without claiming public benchmark numbers before a reproducible suite exists.`},componentLibrary:{title:"Unmodified extensions, no fork path.",description:`Cocoon hosts existing VS Code extension code and provides the vscode API shim. Mountain scans installed extensions, reads manifests, handles VSIX install and uninstall routes, and notifies Cocoon when extensions change.

That supports a strong claim: extensions run unmodified through the active compatibility path. Marketplace-wide coverage still depends on each extension API usage and on services still being filled in.`},documentation:{title:"Fibers, not Promises.",description:`Effect-TS gives Cocoon typed errors, scoped resources, cancellation, and supervised concurrency for extension-host work.

That does not magically remove every runtime bug, but it does make failure paths explicit in the services Land controls.`},versionControl:{title:"One source tree, configured targets.",description:`Tauri uses the operating system WebView on each platform, so the Mountain desktop path does not bundle Chromium.

The repository includes macOS, Windows, and Linux build configuration. Public installer coverage is still being completed.`},cicdIntegration:{title:"Update plumbing in progress.",description:`Air contains Rust services for update checks, downloads, authentication, indexing, health, and a Vine gRPC server.

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

The element directories are inspectable in source, but each one is described here by what the current code supports or is actively wiring.`,air:{subtitle:"Background Services - Downloader - Workspace Indexer",description:`Rust services for downloads, updates, authentication, indexing, resilience, health, and Vine IPC
Release signing and public installer delivery are still being completed
Designed to keep update and indexing work outside the main editor surface`},cocoon:{subtitle:"Extension Host - Unmodified VS Code Extensions - Effect-TS Services",description:`Node.js sidecar for VS Code extension-host compatibility
Runs existing extension entry points without rewriting their source
Routes implemented API calls through Effect-TS services and the Mountain bridge
Core commands, workspace, window, terminal, webview, and language-provider surfaces exist in source`},common:{subtitle:"Shared Foundation - Traits - Cross-Element Types",description:`Shared Rust crate and TypeScript package for cross-element contracts
Defines reusable traits, DTOs, utility types, and service boundaries
Not a standalone runtime process
Keeps shared interfaces visible instead of scattering them through elements`},echo:{subtitle:"Work-Stealing Scheduler - crossbeam-deque - Supervised Worker Pool",description:`Scheduler primitives built around supervised Rust worker pools
Used by native services that need bounded background execution
The source supports cancellation and shutdown paths without promising that every workload already routes through Echo`},grove:{subtitle:"WASM Sandbox - Wasmtime Runtime - Capability-Based Isolation",description:`Contains a Wasmtime-backed WebAssembly host path and Grove gRPC protocol definitions
Includes transport and capability-oriented modules for extension isolation work
Primary VS Code compatibility still runs through Cocoon while Grove integration matures`},maintain:{subtitle:"Build Orchestrator - Configuration - Release Profiles",description:`Coordinates development, debug, and release build profiles across Land elements
Keeps profile names and build scripts visible for contributors
Deterministic release claims are held until the public release pipeline is fully published`},mist:{subtitle:"Local DNS Sandbox - *.editor.land Resolution - Network Boundary",description:`Provides local DNS, resolver, WebSocket, zone, and forward-security code
Mountain has a native Mist feature path, but not every internal route flows through Mist yet
The goal is a clean local service boundary without exposing private service names publicly`},mountain:{subtitle:"Native Rust Backend - Tauri - Replaces Electron Main Process",description:`Handles windows, file I/O, child processes, terminals, clipboard, and extension IPC through Rust and Tauri
Includes Vine and Cocoon bridge code for the primary desktop path
Uses native integrations such as keyring where the feature path requires them`},output:{subtitle:"Compilation Pipeline - Plugin-Routed - Deterministic Checksum",description:`Processes TypeScript and platform code through plugin-routed transforms
Contains the dynamic import rewrite and bundling support used by the output pipeline
Checksum and release guarantees should come from the published pipeline, not from marketing copy`},rest:{subtitle:"TypeScript Transform Pipeline - OXC - Rust-Native",description:`OXC-based transform work for TypeScript and VS Code platform code
Meant to reduce reliance on Node-hosted compilation paths over time
Source maps and public benchmark claims remain integration work`},sidecar:{subtitle:"Binary Distributor - Compile-Time Target Triple Selection - Per-Platform Node.js",description:`Packages host-specific sidecar binaries for the Cocoon path
Keeps target triples and selection logic in source rather than hidden installer scripts
Additional platform packaging remains tied to the release pipeline`},sky:{subtitle:"Visual UI Layer - Astro Components - Three Workbench Layouts",description:`Astro workbench routes and WebView bridge code for the editor UI
Supports the visual shell that Mountain loads through Tauri
Panel and layout coverage should be checked against the current Sky routes`},vine:{subtitle:"gRPC Backbone - Contract-First - .proto Definitions",description:`Protocol contracts live in .proto files for Mountain, Cocoon, Air, Grove, and related services
Generated stubs give Rust and TypeScript a shared wire shape where the route is implemented
Coverage is expanding across the IPC surface`},wind:{subtitle:"Workbench Services - Effect-TS Layers - Native Bridges",description:`TypeScript workbench services for panels, sidebars, activity bar, configuration, and output channels
Effect-TS layers keep service dependencies explicit
Native OS calls use the Tauri bridge where the Mountain path implements them`},worker:{subtitle:"Service Worker - Offline Cache - CSS Import Support",description:`Manages browser-worker support for caching and dynamic CSS imports where the web shell needs it
Security-sensitive auth claims are kept out until the active Worker code and release profile prove them end to end`}},s={features:e,hero:t,nav:i,pricing:n,roadmap:o,architecture:r};export{r as architecture,s as default,e as features,t as hero,i as nav,n as pricing,o as roadmap};
