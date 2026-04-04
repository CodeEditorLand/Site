const e={badge:"Features",item:{designTokens:{description:`Stop handing VS Code a gigabyte of RAM just to open a file.

Land's Rust core with gRPC IPC responds in microseconds. Even with hundreds of files open.`,title:"No Lag, Ever"},componentLibrary:{description:`Your entire VS Code extension library works out of the box.

The Cocoon host mirrors the full VS Code API surface. Nothing needs rewriting.`,title:"Your Extensions, Unchanged"},documentation:{description:`Effect-TS gives you typed services, structured concurrency, and traced errors.

Bugs are caught at compile time, not at 3 am.`,title:"Type-Safe End to End"},versionControl:{description:`One codebase compiles to fully native apps on macOS, Windows, and Linux via Tauri.

Publish to all three platforms with a single command.`,title:"One Build, Every Platform"},collaboration:{description:`CC0 public domain. Use it, fork it, ship it, even sell it.

NLnet-funded and built entirely in the open.`,title:"Free Forever, No Strings"},cicdIntegration:{description:`Rust, Tauri, Effect-TS, and Biome form a stack chosen for correctness and developer velocity.

Familiar tools, no compromises.`,title:"Best-in-Class Toolchain"}},subtitle:"Six features that explain why Land is faster, safer, and more open than every Electron-based editor.",title:"Built Different. Measurably Better."},t={badge:"Native Speed   No Electron   CC0",subtitle:`Stop handing VS Code a gigabyte of RAM.

Land is built on Rust, Tauri, and Effect-TS. Fast enough that you notice immediately.`,title:"The Future of Code Editing",titleHighlight:"Land",atScale:"starts here",cta:{primary:"Download",secondary:"Learn More"},scene:{description:"Animated architecture visualization",hub:"Core Architecture",components:{button:"Rust Core",colors:"Tauri UI",typography:"Effect-TS Services",components:"gRPC IPC",spacing:"Extension Host",icons:"Cross-Platform",docs:"VS Code API",versions:"Open Source CC0"}}},n={docs:"Docs",downloads:"Download",features:"Features",github:"GitHub"},o={subtitle:`Code Editor Land is completely free.

No tiers, no subscriptions, no restrictions.`,labels:{monthly:"Monthly",yearly:"Yearly",savings:"(Save up to 20%)",popular:"Most Popular",perMonth:"/month",perYear:"/year",free:"Free"},toggle:{toMonthly:"Switch to {{label}} billing",toYearly:"Switch to {{label}} billing"},tiers:{free:{name:"Community",description:`For everyone.

Full editor features, completely free.`,features:{1:"Full VS Code compatibility",2:"All extensions supported",3:"Native Rust performance",4:"Cross-platform (macOS, Windows, Linux)",5:"Effect-TS type-safe UI",6:"gRPC-based architecture",7:"Open source (CC0 license)"},button:"Download Now"}},title:"Free Forever, Open Source",badge:"Pricing"},i={quote:{1:`A performance-focused, open alternative.

Land is exactly what VS Code needed.

It's incredibly fast.`,2:`The Effect-TS architecture is beautiful to work with.

The type safety catches bugs before they happen.`,3:`Running my existing extensions with no changes is a game-changer.

The compatibility is impressive.`,4:`Finally, an editor that respects my system resources.

No more Electron memory bloat.`,5:`The open-source commitment means I can contribute and customize.

This is the editor I've been waiting for.`,6:`The gRPC-based architecture is a masterclass in system design.

Land is the future of desktop editors.`},subtitle:"Community voices on the future of code editing.",title:"What developers are saying",badge:"Testimonials",attribution:"Community Feedback",attributionNote:"Representative community member"},s={title:"Roadmap & What to Expect",subtitle:`Funded by NLnet NGI0 Commons Fund.

Built in public, free forever, no roadmap surprises.`,tiers:{current:{name:"Active Now",description:"The six core elements are in active development. Each is a standalone repository you can inspect and contribute to today.",features:{1:"Mountain: native process manager, replaces Electron",2:"Cocoon: extension host, your VS Code extensions work unchanged",3:"Wind: full workbench shell, panels and sidebars",4:"Sky: visual layer, themes and layouts",5:"Air: silent updates, cryptographically signed",6:"Echo: work-stealing scheduler, uses every CPU core"},button:"View on GitHub"},next:{name:"Coming Next",description:"Extension ecosystem polish and first stable release across all three platforms.",features:{1:"High-fidelity VS Code extension compatibility pass",2:"Cross-platform installer with silent auto-update",3:"gRPC IPC protocol finalized and documented",4:"Settings sync with cloud-optional portal"},button:"Track Progress"},future:{name:"Long-Term Vision",description:"A full-featured, Electron-free editor that handles every workflow a modern developer needs.",features:{1:"Native mobile editing: iOS and Android",2:"Collaborative real-time editing built in",3:"AI-assisted development, privacy-first",4:"Open plugin marketplace and extension ecosystem"},button:"Learn More"}}},a={title:"Under the Hood",subtitle:`Land replaces VS Code's Electron stack element by element.

Each component is a standalone open-source repository you can read, fork, or contribute to.`,mountain:{description:`Replaces Electron's main process with a native Rust/Tauri backend.

Window, file system, and process lifecycle run at native speed with no JavaScript overhead.`,subtitle:"Native speed without Electron overhead"},cocoon:{description:`Runs your existing VS Code extensions via Effect-TS with high-fidelity API compatibility.

Install them and they just work. No rewrites, no patches.`,subtitle:"Your extensions, completely unchanged"},wind:{description:`A clean re-implementation of the VS Code Workbench in TypeScript.

Panels, sidebars, and the activity bar. Familiar layout, no Electron dependency.`,subtitle:"Full workbench shell, rebuilt clean"},sky:{description:`Renders the editor UI using Astro components.

Themes, layouts, and the visual layer load fast and stay consistent across platforms.`,subtitle:"Themes and layouts, fast by default"},air:{description:`A background daemon that keeps Land current without interrupting you.

Every update is cryptographically signed before it is applied.`,subtitle:"Silent updates, always signed"},echo:{description:`A work-stealing task executor that saturates every CPU core.

Heavy indexing and analysis happen in the background. The editor stays responsive.`,subtitle:"Uses every CPU core you have"}},r={features:e,hero:t,nav:n,pricing:o,testimonials:i,roadmap:s,architecture:a};export{a as architecture,r as default,e as features,t as hero,n as nav,o as pricing,s as roadmap,i as testimonials};
