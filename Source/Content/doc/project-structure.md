---
title: "Project Structure"
section: "Start"
order: 5
description:
    "The Element monorepo layout - each element's role, naming conventions, build
    system, and critical rules about what must never be edited."
---

Land is organized as a monorepo of named **elements** under `Element/`. Each
element is an independent Git repository (submodule) on its own `Current`
branch. The repository root holds build orchestration scripts, environment file
templates, and workspace configuration files for Cargo and pnpm.

---

## Top-Level Layout 📂

```
Land/
  Element/           # All submodule elements (never git add .)
  Maintain/          # Build scripts, CI workflows, signing
    Debug/
      Build.sh       # Main build entry point (--profile flag)
      Run.sh         # Launch helper
    Script/
      TierEnvironment.sh  # Environment file sourcing cascade
      SignBundle.sh       # Post-build ad-hoc re-signing
    CI/              # Pipeline workflow definitions
  Document/          # Project-level documentation
  .env.Land          # Core dev environment (local, gitignored)
  .env.Land.Sample   # Checked-in defaults template
  Cargo.toml         # Rust workspace root (51 patch.crates-io)
  Cargo.lock         # Rust dependency lockfile
  pnpm-workspace.yaml  # pnpm workspace configuration
  turbo.json         # Turborepo global environment declarations
  rust-toolchain.toml  # Pinned Rust version (1.95.0 / edition 2024)
  rustfmt.toml       # Workspace Rust formatting rules
  biome.json         # Biome linter and formatter config
  package.json       # Root npm workspace
```

---

## Element Map 🗺️

### Rust Elements - Native Backend

| Element      | Path               | Role                                                                                                                                                                             |
| ------------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Common**   | `Element/Common`   | Abstract core library. All service traits (`IFileService`, `IConfigurationService`), the `ActionEffect` system, DTOs. No concrete implementations.                               |
| **Echo**     | `Element/Echo`     | Bounded work-stealing task scheduler. Priority-based (`High`/`Normal`/`Low`) with lock-free deques. Core async execution engine for Mountain.                                    |
| **Vine**     | `Element/Vine`     | gRPC protocol definitions. Contains `Vine.proto` - the service contract between Mountain and Cocoon (port 50052), Mountain and Air (port 50053).                                 |
| **Mountain** | `Element/Mountain` | Primary Tauri application. Implements every trait from Common. Hosts the gRPC server, manages `AppState`, dispatches Tauri commands, owns OS-level capabilities.                 |
| **Mist**     | `Element/Mist`     | Local DNS server for `*.editor.land` resolution. Authoritative for the private zone. Resolves all subdomains to `127.0.0.1`. Used for network isolation.                         |
| **Air**      | `Element/Air`      | Background daemon. Update downloads, file indexing, cryptographic signing, health monitoring. Communicates via gRPC on port 50053.                                               |
| **Rest**     | `Element/Rest`     | High-performance TypeScript compiler built on OXC (Oxidation Compiler). Optional replacement for esbuild's TypeScript compilation at 2-3x speed.                                 |
| **Grove**    | `Element/Grove`    | Native Rust/WASM extension host (work in progress). Sandboxed environment via Wasmtime for WASM-compiled VS Code extensions. Uses edition 2021 for WASM toolchain compatibility. |
| **SideCar**  | `Element/SideCar`  | Vendored Node.js runtime binary management. Downloads, caches, and resolves exact Node.js binaries per target triple for bundling into the app.                                  |

### TypeScript Elements - UI and Extension Host

| Element      | Path               | Role                                                                                                                                                                      |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cocoon**   | `Element/Cocoon`   | Node.js extension host sidecar. Runs VS Code extensions. Provides a `vscode` API shim implemented with Effect-TS. Communicates with Mountain via gRPC.                    |
| **Wind**     | `Element/Wind`     | UI service layer. Effect-TS native re-implementation of ~40 VS Code workbench services. Runs inside the Tauri WebView. Communicates with Mountain via Tauri IPC commands. |
| **Sky**      | `Element/Sky`      | UI component layer (Astro). Renders the editor canvas, sidebar, activity bar, status bar, and panels. Bridges Tauri events through `SkyBridge` (~2900 lines).             |
| **Output**   | `Element/Output`   | Build artifact management. Compiles VS Code platform source into the `@codeeditorland/output` npm package consumed by Cocoon, Sky, and Wind.                              |
| **Worker**   | `Element/Worker`   | Service worker implementation. Asset caching, offline support, CSS module interception. Zero runtime dependencies.                                                        |
| **Maintain** | `Element/Maintain` | Build orchestration. CI/CD pipeline, GritQL refactoring queries, build scripts, signing helpers.                                                                          |

### Dependency Elements

| Element    | Path                                             | Role                                                                                                                       |
| ---------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| **Editor** | `Element/Dependency/Microsoft/Dependency/Editor` | VS Code source submodule. Compiled in Step 1 of the build. Consumed by Output and Sky. Never edit files under `src/vs/**`. |

---

## Submodule Repository Table 🔗

| Element  | GitHub repository                          |
| -------- | ------------------------------------------ |
| Common   | https://github.com/CodeEditorLand/Common   |
| Echo     | https://github.com/CodeEditorLand/Echo     |
| Vine     | https://github.com/CodeEditorLand/Vine     |
| Mountain | https://github.com/CodeEditorLand/Mountain |
| Mist     | https://github.com/CodeEditorLand/Mist     |
| Air      | https://github.com/CodeEditorLand/Air      |
| Rest     | https://github.com/CodeEditorLand/Rest     |
| Grove    | https://github.com/CodeEditorLand/Grove    |
| SideCar  | https://github.com/CodeEditorLand/SideCar  |
| Cocoon   | https://github.com/CodeEditorLand/Cocoon   |
| Wind     | https://github.com/CodeEditorLand/Wind     |
| Sky      | https://github.com/CodeEditorLand/Sky      |
| Output   | https://github.com/CodeEditorLand/Output   |
| Worker   | https://github.com/CodeEditorLand/Worker   |
| Maintain | https://github.com/CodeEditorLand/Maintain |
| Editor   | https://github.com/CodeEditorLand/Editor   |

---

## Build System Architecture 🔨

The build has two phases:

**Phase 1 - VS Code compilation.** `Element/Dependency/Microsoft/Dependency/Editor`
is compiled with npm and `NODE_ENV=development`. The output feeds `Output`, which
produces the `@codeeditorland/output` package consumed by Cocoon, Sky, and Wind.

**Phase 2 - Land assembly.** `Maintain/Debug/Build.sh` orchestrates all elements
based on the `--profile` flag. The profile selects one or more workbench variants
(Mountain-only, full Electron, headless Cocoon, kernel-only), sets tier flags
(`TierIPC`, `TierTerminal`, `TierSCM`), and decides whether assets are bundled
or left as dynamic imports.

Each element has its own `Target/` directory inside its element folder. Build
scripts never write outside `Element/<Name>/Target/`.

---

## Naming Conventions 📝

### TypeScript

- PascalCase filenames: `TauriMainProcessService.ts`, `ExtensionHost.ts`
- Single `export default` per file, anonymous
- `import type` for type-only imports; `await import()` for value imports
- Tabs for indentation, line width 80
- Em quad U+2001 (`　`) is the only separator character in display strings
- Arrow-async functions over `async function` declarations
- `satisfies` pattern for type narrowing

### Rust

- Edition 2024, MSRV 1.95.0 (Grove excluded: edition 2021 for WASM)
- `pub use` re-export pattern is not used anywhere in the workspace. Use type
  aliases, delegating functions, or fresh constants instead.
- PascalCase filenames
- `rustfmt` with workspace `rustfmt.toml` rules

### Environment Variables

- PascalCase for Land variables: `BundleLevel`, `HotReload`, `TierFileSystem`
- Upstream casing preserved for external tools: `TAURI_*`, `CARGO_*`, `NODE_*`

---

## What Never to Edit 🚫

> [!WARNING] Editing these paths will be overwritten by the next build or will
> corrupt the submodule state.

| Path                                                       | Reason                                                                                                      |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `Element/*/Target/`                                        | Build output directories. Source is in `Public/` or `Source/` within each element.                          |
| `Element/Dependency/Microsoft/Dependency/Editor/src/vs/**` | Upstream VS Code source. Changes here are not tracked and are wiped by `git clean -dfx`.                    |
| Any file committed with `git add .`                        | Adding `.` includes submodule gitlinks as trees, corrupting the index. Always stage specific files by name. |

---

## Related Documentation 🔗

- [Architecture](/Doc/architecture) - how elements
  communicate at runtime: IPC, gRPC, and event flow
- [Configuration](/Doc/configuration) - environment
  variable system and tier flags
- [Installation](/Doc/installation) - how to clone each
  submodule and build the project
- [CI/CD Pipeline](/Doc/ci-cd-pipeline) - pipeline stages
  and automation

## Funding 💎

Land's development is funded by the **NLnet NGI0 Commons Fund**, a European
initiative supporting open-source infrastructure. The project is maintained by
**PlayForm** (Sofia, Bulgaria) as a non-profit effort. All code is dedicated to
the public domain under CC0 - no CLA required, no copyright assignment, no
restrictions on use.
