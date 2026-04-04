const e={badge:"Features",item:{designTokens:{description:`Stop handing VS Code a gigabyte of RAM just to open a file.

Land's Rust core with gRPC IPC responds in microseconds. Even with hundreds of files open.`,title:"No Lag, Ever"},componentLibrary:{description:`Your entire VS Code extension library works out of the box.

The Cocoon host mirrors the full VS Code API surface. Nothing needs rewriting.`,title:"Your Extensions, Unchanged"},documentation:{description:`Effect-TS gives you typed services, structured concurrency, and traced errors.

Bugs are caught at compile time, not at 3 am.`,title:"Type-Safe End to End"},versionControl:{description:`One codebase compiles to fully native apps on macOS, Windows, and Linux via Tauri.

Publish to all three platforms with a single command.`,title:"One Build, Every Platform"},collaboration:{description:`CC0 public domain. Use it, fork it, ship it, even sell it.

NLnet-funded and built entirely in the open.`,title:"Free Forever, No Strings"},cicdIntegration:{description:`Rust, Tauri, Effect-TS, and Biome form a stack chosen for correctness and developer velocity.

Familiar tools, no compromises.`,title:"Best-in-Class Toolchain"}},subtitle:"Six features that explain why Land is faster, safer, and more open than every Electron-based editor.",title:"Built Different. Measurably Better."},t={badge:"Native Speed   No Electron   CC0",subtitle:`Stop handing VS Code a gigabyte of RAM.

Land is built on Rust, Tauri, and Effect-TS. Fast enough that you notice immediately.`,title:"The Future of Code Editing",titleHighlight:"Land",atScale:"starts here",cta:{primary:"Download",secondary:"Learn More"},scene:{description:"Animated architecture visualization",hub:"Core Architecture",components:{button:"Rust Core",colors:"Tauri UI",typography:"Effect-TS Services",components:"gRPC IPC",spacing:"Extension Host",icons:"Cross-Platform",docs:"VS Code API",versions:"Open Source CC0"}}},n={docs:"Docs",downloads:"Download",features:"Features",github:"GitHub"},i={subtitle:`Code Editor Land is completely free.

No tiers, no subscriptions, no restrictions.`,labels:{monthly:"Monthly",yearly:"Yearly",savings:"(Save up to 20%)",popular:"Most Popular",perMonth:"/month",perYear:"/year",free:"Free"},toggle:{toMonthly:"Switch to {{label}} billing",toYearly:"Switch to {{label}} billing"},tiers:{free:{name:"Community",description:`For everyone.

Full editor features, completely free.`,features:{1:"Full VS Code compatibility",2:"All extensions supported",3:"Native Rust performance",4:"Cross-platform (macOS, Windows, Linux)",5:"Effect-TS type-safe UI",6:"gRPC-based architecture",7:"Open source (CC0 license)"},button:"Download Now"}},title:"Free Forever, Open Source",badge:"Pricing"},o={quote:{1:`A performance-focused, open alternative.

Land is exactly what VS Code needed.

It's incredibly fast.`,2:`The Effect-TS architecture is beautiful to work with.

The type safety catches bugs before they happen.`,3:`Running my existing extensions with no changes is a game-changer.

The compatibility is impressive.`,4:`Finally, an editor that respects my system resources.

No more Electron memory bloat.`,5:`The open-source commitment means I can contribute and customize.

This is the editor I've been waiting for.`,6:`The gRPC-based architecture is a masterclass in system design.

Land is the future of desktop editors.`},subtitle:"Community voices on the future of code editing.",title:"What developers are saying",badge:"Testimonials",attribution:"Community Feedback",attributionNote:"Representative community member"},s={title:"Roadmap & What to Expect",subtitle:`Funded by NLnet NGI0 Commons Fund.

Built in public, free forever, no roadmap surprises.`,tiers:{current:{name:"Active Now",description:"All fifteen elements are in active development. Each is a standalone repository you can inspect and contribute to today.",features:{air:`Air 🪁
Background daemon, silent auto-updates, crypto-signed`,cocoon:`Cocoon 🦋
Extension host - full VS Code API via Effect-TS shims`,common:`Common 👨🏻‍🏭
Abstract Rust foundation, typed effects, zero concrete implementations`,echo:`Echo 📣
Lock-free work-stealing scheduler, saturates every CPU core`,grove:`Grove 🌳
WASMtime sandbox, capability-based extension isolation`,maintain:`Maintain 💪🏻
Build orchestrator, Rhai scripting, TOML/JSON5 config`,mist:`Mist 🌫️
DNS sandbox, all *.editor.land traffic resolves locally`,mountain:`Mountain ⛰️
Native Rust/Tauri backend, replaces Electron’s main process`,output:`Output ⚫
Compilation pipeline, deterministic checksummed bundles`,rest:`Rest ⛱️
TypeScript compiler in Rust + OXC, 2–3× faster than esbuild`,sidecar:`SideCar ⚙️
Cross-platform Node.js binary distributor per target triple`,sky:`Sky 🌌
Astro UI layer - every panel is a component, instant hot-reload`,vine:`Vine 🌿
gRPC backbone, contract-first .proto definitions`,wind:`Wind 🍃
VS Code Workbench reimplemented in TypeScript + Effect-TS`,worker:`Worker 🍩
Service Worker, offline support, AES-GCM encrypted auth`},button:"View on GitHub"},next:{name:"Coming Next",description:"Extension ecosystem polish and first stable release across all three platforms.",features:{1:"High-fidelity VS Code extension compatibility pass",2:"Cross-platform installer with silent auto-update",3:"gRPC IPC protocol finalized and documented",4:"Settings sync with cloud-optional portal"},button:"Track Progress"},future:{name:"Long-Term Vision",description:"A full-featured, Electron-free editor that handles every workflow a modern developer needs.",features:{1:"Native mobile editing: iOS and Android",2:"Collaborative real-time editing built in",3:"AI-assisted development, privacy-first",4:"Open plugin marketplace and extension ecosystem"},button:"Learn More"}}},r={title:"Under the Hood",subtitle:`Land replaces VS Code's Electron stack element by element.

Fifteen standalone open-source repositories, each one inspectable, forkable, and ready for contributions today.`,air:{description:`Runs in the background after you close the editor. Downloads updates, verifies cryptographic signatures, and indexes your workspace for instant search.

The next launch is already on the latest version. You never see a restart-to-update prompt.`,subtitle:"Background daemon silent updates crypto-signed"},cocoon:{description:`A Node.js sidecar that intercepts require and import at the module level and routes them through a complete Effect-TS service layer mirroring the VS Code API.

Install any extension. It runs unchanged. No patches, no rewrites, no compatibility hacks.`,subtitle:"Extension host full VS Code API Effect-TS shims"},common:{description:`The pure abstract core of Land. Defines typed effects, composable building blocks, and abstract traits that every element builds on, with no concrete implementations.

Mock any trait and test any element without a running window, webview, or sidecar.`,subtitle:"Shared foundation abstract traits zero implementations"},echo:{description:`A lock-free concurrency runtime built on crossbeam-deque. Every task runs inside a supervised worker pool: no fire-and-forget spawns, graceful startup and shutdown guaranteed.

Heavy indexing and analysis run in the background without ever blocking the editor.`,subtitle:"Work-stealing scheduler saturates every CPU core"},grove:{description:`Runs VS Code extensions compiled to WebAssembly inside WASMtime with configurable resource limits and capability-based security. Supports gRPC, IPC, and WASM transports.

The path to a true sandboxed extension model where an extension can only touch what you explicitly grant.`,subtitle:"Secure WASM sandbox WASMtime capability-based isolation"},maintain:{description:`Build pipelines for the entire Land ecosystem. Embedded Rhai scripting for flexible build logic, compile-time validated TOML and JSON5 configurations, and deterministic artifact generation.

Same commit always produces the same output. No environment surprises.`,subtitle:"Build orchestrator Rhai scripting TOML/JSON5 config"},mist:{description:`Creates a fully sandboxed DNS zone that resolves every *.editor.land domain to 127.0.0.1. All Land services communicate through this local layer.

Nothing leaks to the public internet. A clean network boundary between the editor and the outside world.`,subtitle:"DNS sandbox *.editor.land resolves to 127.0.0.1"},mountain:{description:`Handles windows, files, processes, and extension IPC via Rust and Tauri. Where Electron takes milliseconds, Mountain responds in microseconds.

Starts faster, uses less RAM, stays responsive with hundreds of files open. Authentication tokens live in the OS keychain, never on disk.`,subtitle:"Native Rust backend replaces Electrons main process"},output:{description:`Processes TypeScript from VS Code, Land, and the Rest compiler into fully bundled artifacts. A plugin-routed architecture handles each source type on its own path.

Same commit, same output. Every bundle is deterministic and checksum-verified.`,subtitle:"Compilation pipeline deterministic bundles checksums"},rest:{description:`A drop-in replacement for VS Code TypeScript build step. Powered by OXC, the same parser VS Code uses internally, for 100% compatible output at 2-3x the speed of esbuild.

Rust-native, zero Node.js overhead.`,subtitle:"TypeScript compiler Rust + OXC 2-3x faster than esbuild"},sidecar:{description:`Packages and selects the exact Node.js sidecar binary at compile time based on the target triple: aarch64-apple-darwin, x86_64-pc-windows-msvc, and four others.

Cocoon always gets the binary that matches the host exactly. No runtime detection, no fallback chains.`,subtitle:"Binary distributor correct Node.js runtime per platform"},sky:{description:`Every panel, sidebar, tab bar, and status bar is an Astro component. Three workbench layouts for full desktop, embedded, and minimal deployments.

Tauri reloads Sky instantly on any component change. High-fidelity VS Code UI compatibility with a significantly smaller footprint.`,subtitle:"Visual UI layer Astro components instant Tauri hot-reload"},vine:{description:`Every inter-process service interface starts as a .proto file. The generated Rust and TypeScript stubs are the only way Land processes communicate.

Typed at the wire, typed at the call site, verified at compile time. Refactor a message field and every consumer breaks loudly instead of silently.`,subtitle:"gRPC backbone contract-first .proto definitions"},wind:{description:`A clean TypeScript re-implementation of the VS Code Workbench: panels, sidebars, activity bar. Every service is a composable Effect-TS Layer: file dialogs, clipboard, configuration, and output channels.

Native OS calls via Tauri. No Electron IPC proxy. No renderer-to-main roundtrip.`,subtitle:"VS Code Workbench reimplemented Effect-TS layers native OS APIs"},worker:{description:`Manages caching, offline support, and dynamic CSS imports from JavaScript modules in the editor shell. Auth tokens are AES-GCM encrypted, requests are HMAC-signed, and tokens refresh automatically.

The shell stays functional and authenticated even when the network drops.`,subtitle:"Service Worker offline support AES-GCM encrypted auth"}},a={features:e,hero:t,nav:n,pricing:i,testimonials:o,roadmap:s,architecture:r};export{r as architecture,a as default,e as features,t as hero,n as nav,i as pricing,s as roadmap,o as testimonials};
