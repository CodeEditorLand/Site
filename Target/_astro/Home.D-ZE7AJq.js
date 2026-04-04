const e={badge:"Feature",item:{designTokens:{title:"No more frozen cursors.",description:`VS Code with a medium project uses 500 MB to 1.5 GB RAM across three Chromium processes. One extension event handler that never resolves freezes everything on that thread.

Mountain runs native Rust and Tauri. Echo runs every background task on a work-stealing thread pool. The editor thread never blocks.`},componentLibrary:{title:"Every extension runs unchanged.",description:`Porting your extension library to a new editor is weeks of work you should never have to do.

Cocoon mirrors the full VS Code API surface via Effect-TS fibers. Install an extension and it works. Not mostly works. Unchanged.`},documentation:{title:"Fibers, not Promises.",description:`VS Code Promises cannot be interrupted, raced, or run in parallel. A hung async operation in one extension stalls every other on that event loop.

Effect-TS fibers can be interrupted, raced, and run concurrently across CPU cores. Bugs that reach production in VS Code never compile in Land.`},versionControl:{title:"One codebase, every platform.",description:`Building native apps for three operating systems used to mean three rendering engines, three toolchains, and three deployment pipelines.

Tauri uses the OS's own WebView on each platform. One Rust codebase compiles to native macOS, Windows, and Linux. No bundled Chromium.`},cicdIntegration:{title:"No Restart to Update.",description:`VS Code's Restart to Update prompt kills every open terminal, unsaved diff, and in-progress language server.

Air pre-downloads and PGP-verifies the next version while you work. The update stages between sessions. The next launch opens on the new version with no prompt.`},collaboration:{title:"CC0. No restrictions.",description:`Most open source editors have license clauses that restrict commercial use, require attribution, or forbid forking the UI.

The entire Land codebase is CC0 public domain. Use it, fork it, ship it, build commercial products on top of it. No attribution required. No compliance headaches.`}},subtitle:"The extension ecosystem you already rely on, running on a stack designed for performance.",title:"VS Code. Without Electron."},t={badge:"No Electron   No Restart to Update   CC0",subtitle:`VS Code runs on Electron. That means Chromium, Node.js, and a gigabyte of RAM just to open a file.

Land replaces the entire Electron stack with Rust, Tauri, and Effect-TS. The difference is felt on first launch.`,title:"The Future of Code Editing",titleHighlight:"Land",atScale:"starts here",cta:{primary:"Download",secondary:"Learn More"},scene:{description:"Animated architecture visualization",hub:"Core Architecture",components:{button:"Rust Core",colors:"Tauri UI",typography:"Effect-TS Services",components:"gRPC IPC",spacing:"Extension Host",icons:"Cross-Platform",docs:"VS Code API",versions:"Open Source CC0"}}},n={docs:"Docs",downloads:"Download",features:"Features",github:"GitHub"},o={subtitle:`Code Editor Land is completely free.

No tiers, no subscriptions, no restrictions.`,labels:{monthly:"Monthly",yearly:"Yearly",savings:"(Save up to 20%)",popular:"Most Popular",perMonth:"/month",perYear:"/year",free:"Free"},toggle:{toMonthly:"Switch to {{label}} billing",toYearly:"Switch to {{label}} billing"},tiers:{free:{name:"Community",description:`For everyone.

Full editor features, completely free.`,features:{1:"Full VS Code compatibility",2:"All extensions supported",3:"Native Rust performance",4:"Cross-platform (macOS, Windows, Linux)",5:"Effect-TS type-safe UI",6:"gRPC-based architecture",7:"Open source (CC0 license)"},button:"Download Now"}},title:"Free Forever, Open Source",badge:"Pricing"},i={quote:{1:`A performance-focused, open alternative.

Land is exactly what VS Code needed.

It's incredibly fast.`,2:`The Effect-TS architecture is beautiful to work with.

The type safety catches bugs before they happen.`,3:`Running my existing extensions with no changes is a game-changer.

The compatibility is impressive.`,4:`Finally, an editor that respects my system resources.

No more Electron memory bloat.`,5:`The open-source commitment means I can contribute and customize.

This is the editor I've been waiting for.`,6:`The gRPC-based architecture is a masterclass in system design.

Land is the future of desktop editors.`},subtitle:"Community voices on the future of code editing.",title:"What developers are saying",badge:"Testimonial",attribution:"Community Feedback",attributionNote:"Representative community member"},r={title:"The Architecture Is Built. Here Is What Comes Next.",subtitle:`Funded by NLnet NGI0 Commons Fund.

Every milestone demonstrates the stack works, not a feature we are catching up on.`,tiers:{current:{name:"Active Now",description:"All fifteen elements are in active development and independently deployable. The runtime is faster than VS Code. The extension API is implemented. Each element is a standalone repository you can inspect and contribute to today.",features:{1:"Every extension runs unchanged no rewrites",2:"No Electron OS's own renderer 70% less RAM",3:"Fibers, not Promises interruptible concurrent",4:"Telemetry is a compile flag absent, not disabled",5:"CC0 public domain no restrictions",6:"macOS Windows Linux"},button:"View on GitHub",elements:{mountain:`Mountain ⛰️
Native Backend
Replaces Electron main process, no bundled Chromium`,cocoon:`Cocoon 🦋
Extension Host
Full VS Code API via Effect-TS, every extension unchanged`,wind:`Wind 🍃
Workbench Shell
Effect-TS layers, direct OS calls, no IPC proxy`,sky:`Sky 🌌
Astro UI Layer
Every panel a component, instant hot-reload`,air:`Air 🪁
Background Daemon
Pre-stages updates, no Restart to Update prompt`,echo:`Echo 📣
Work-Stealing Scheduler
All CPU cores, heavy tasks never block the editor`}},next:{name:"Extension Compatibility Complete",description:"The VS Code marketplace works end-to-end. Language servers initialize in parallel. IntelliSense is ready before you finish the first keystroke.",features:{1:"Full marketplace every extension installs and activates",2:"Language servers in parallel via Echo's thread pool",3:"Vine gRPC protocol stabilized typed IPC at every boundary",4:"Air daemon live silent updates staged between sessions"}},future:{name:"v1.0",description:"Active milestones across all fifteen elements. Each item is grounded in an open README or open source commit.",features:{1:"VS Code Marketplace every extension installs unchanged",2:"Grove hardware-enforced extension isolation",3:"Vine typed at the wire all IPC finalized",4:"Cross-platform native installer via Tauri",5:"Source map generation via OXC",6:"Cloudflare Workers download distribution live"},elements:{vine:`Vine 🌿
Protocol In Progress
Mountain and Grove channel completing`,cocoon:`Cocoon 🦋
Extension Compatibility Pass
High-fidelity VS Code API coverage`,grove:`Grove 🌳
WASM Sandbox Stabilizing
Capability-based extension isolation`,rest:`Rest ⛱️
Source Map Support
OXC transformer integration in progress`,echo:`Echo 📣
Scheduler Optimization
Faster steal, lower latency`,air:`Air 🪁
Signed CDN Delivery
Cloudflare Workers distribution`},button:"Track Progress"}}},s={title:"Under the Hood",subtitle:`Land replaces VS Code's Electron stack element by element.

Fifteen standalone open-source repositories, each one inspectable, forkable, and ready for contributions today.`,air:{subtitle:"Background Daemon Silent Update Crypto-Signed",description:`Runs in the background after you close the editor. Downloads updates, verifies cryptographic signatures, and indexes your workspace for instant search.

The next launch is already on the latest version. You never see a restart-to-update prompt.`},cocoon:{subtitle:"Extension Host Full VS Code API Effect-TS Shim",description:`A Node.js sidecar that intercepts require and import at the module level and routes them through a complete Effect-TS service layer mirroring the VS Code API.

Install any extension. It runs unchanged. No patches, no rewrites, no compatibility hacks.`},common:{subtitle:"Shared Foundation Abstract Trait Zero Implementation",description:`The pure abstract core of Land. Defines typed effects, composable building blocks, and abstract traits that every element builds on, with no concrete implementations.

Mock any trait and test any element without a running window, webview, or sidecar.`},echo:{subtitle:"Work-Stealing Scheduler Every CPU Core",description:`A lock-free concurrency runtime built on crossbeam-deque. Every task runs inside a supervised worker pool: no fire-and-forget spawns, graceful startup and shutdown guaranteed.

Heavy indexing and analysis run in the background without ever blocking the editor.`},grove:{subtitle:"Secure WASM Sandbox WASMtime Capability-Based Isolation",description:`Runs VS Code extensions compiled to WebAssembly inside WASMtime with configurable resource limits and capability-based security. Supports gRPC, IPC, and WASM transports.

The path to a true sandboxed extension model where an extension can only touch what you explicitly grant.`},maintain:{subtitle:"Build Orchestrator Rhai Scripting TOML/JSON5 Config",description:`Build pipelines for the entire Land ecosystem. Embedded Rhai scripting for flexible build logic, compile-time validated TOML and JSON5 configurations, and deterministic artifact generation.

Same commit always produces the same output. No environment surprises.`},mist:{subtitle:"DNS Sandbox Local *.editor.land Resolution",description:`Creates a fully sandboxed DNS zone that resolves every *.editor.land domain to 127.0.0.1. All Land services communicate through this local layer.

Nothing leaks to the public internet. A clean network boundary between the editor and the outside world.`},mountain:{subtitle:"Native Rust Backend Replaces Electron Main Process",description:`Handles windows, files, processes, and extension IPC via Rust and Tauri. Where Electron takes milliseconds, Mountain responds in microseconds.

Starts faster, uses less RAM, stays responsive with hundreds of files open. Authentication tokens live in the OS keychain, never on disk.`},output:{subtitle:"Compilation Pipeline Deterministic Bundle Checksum",description:`Processes TypeScript from VS Code, Land, and the Rest compiler into fully bundled artifacts. A plugin-routed architecture handles each source type on its own path.

Same commit, same output. Every bundle is deterministic and checksum-verified.`},rest:{subtitle:"TypeScript Compiler Rust + OXC 2-3x Faster",description:`OXC-powered TypeScript compiler implemented in Rust. Powered by OXC, the same parser VS Code uses internally, for 100% compatible output at 2-3x the speed of esbuild.

Rust-native, zero Node.js overhead.`},sidecar:{subtitle:"Binary Distributor Node.js Runtime Per Platform",description:`Packages and selects the exact Node.js sidecar binary at compile time based on the target triple: aarch64-apple-darwin, x86_64-pc-windows-msvc, and four others.

Cocoon always gets the binary that matches the host exactly. No runtime detection, no fallback chains.`},sky:{subtitle:"Visual UI Layer Astro Component Instant Hot-Reload",description:`Every panel, sidebar, tab bar, and status bar is an Astro component. Three workbench layouts for full desktop, embedded, and minimal deployments.

Tauri reloads Sky instantly on any component change. High-fidelity VS Code UI compatibility with a significantly smaller footprint.`},vine:{subtitle:"gRPC Backbone Contract-First .proto Definition",description:`Every inter-process service interface starts as a .proto file. The generated Rust and TypeScript stubs are the only way Land processes communicate.

Typed at the wire, typed at the call site, verified at compile time. Refactor a message field and every consumer breaks loudly instead of silently.`},wind:{subtitle:"VS Code Workbench Reimplemented Effect-TS Layer Native OS API",description:`A clean TypeScript re-implementation of the VS Code Workbench: panels, sidebars, activity bar. Every service is a composable Effect-TS Layer: file dialogs, clipboard, configuration, and output channels.

Native OS calls via Tauri. No Electron IPC proxy. No renderer-to-main roundtrip.`},worker:{subtitle:"Service Worker Offline Support AES-GCM Auth",description:`Manages caching, offline support, and dynamic CSS imports from JavaScript modules in the editor shell. Auth tokens are AES-GCM encrypted, requests are HMAC-signed, and tokens refresh automatically.

The shell stays functional and authenticated even when the network drops.`}},a={features:e,hero:t,nav:n,pricing:o,testimonials:i,roadmap:r,architecture:s};export{s as architecture,a as default,e as features,t as hero,n as nav,o as pricing,r as roadmap,i as testimonials};
