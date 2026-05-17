---
title: "Development History"
section: "Reference"
order: 45
description:
    "Consolidated changelog across all 15 Land elements, organized by element
    with dates and scope."
---

# Development History

Consolidated version history across all 15 Land elements. Each element maintains
its own changelog; this page aggregates them for reference.

---

## Element (Umbrella)

The umbrella repository for the Land submodule fleet at `Land/Element/`.

### v2.2 - Bundled-Electron Profile: Correctness Pass (April 2026)

- Output and Sky submodules synced as a pair alongside CHANGELOG rewrites.

### v2.1 - Full Workbench Lift (April 2026)

- CHANGELOG revisions for Common, Air, Wind, Cocoon, Output, and Sky.
- Submodule pin updates for each element following their individual rewrites.

### v0.0 - Project Inception

- Initial empty umbrella scaffold. Substance lives in per-element changelogs.

---

## Air

Background daemon sidecar for updates, downloads, cryptographic signing, and
indexing.

### v2.1 - Full Workbench Lift (April 2026)

- Tag-filtered DevLog system in `Source/DevLog.rs` (~295 lines), threaded
  through 44 files.
- PascalCase identifier sweep across `Binary/Monitor`, `Binary/Shutdown`, and
  all source files.
- Obsolete TODOs cleared (12 changes); consistent formatting across 14 files.

### v2.0 - Editor Launch (Q1 2026)

- 73 Rust modules landed: DNS resolver (~160 lines with 367 lines of tests),
  updater, downloader, indexer, authentication, HTTP, gRPC service (281 lines in
  `AirVinegRPCService.rs`), health monitoring, graceful shutdown, config
  hot-reload, observability trio.
- TODO closure: 35 subsystems implemented in a single commit (529 insertions).
- Field-naming standardisation: 192 field renames.
- `Cargo.toml` gained 12 new dependencies.

### v1.2 - Full-Stack Integration (2025-2026)

- Initial architecture planning and placeholder maintenance.

---

## Cocoon

Extension-host sidecar running VS Code extensions through an Effect-TS-driven
`vscode` API shim.

### v2.2 - Bundled-Electron Profile: Correctness Pass (April 2026)

- Parent-PID watchdog polling `process.kill(ppid, 0)` every 2s.
- `-32004` benign-404 classification in RPC-error and catch paths.
- `FileWatcher.Register` benign classifier for absent paths.
- `BuildOpenTextDocument` decodes Mountain's `Vec<u8>` body to UTF-8 with full
  `TextDocument` API.

### v2.1 - Full Workbench Lift, Effect-TS Namespace Split (April 2026)

- `GRPCServerService` split into 7 focused handlers under `Services/Handler/`.
- `vscode` API split into 10 namespaces with Effect-TS heuristic Proxy for gap
  detection.
- Workspace events, document content handler, extension storage, secrets, and
  window messaging.
- Bidirectional language-provider sync with Mountain.
- Platform abstraction layer under `Source/Platform/`.

### v2.0 - Editor Launch (Q1 2026: Effect-TS Rewrite)

- 7 Effect-TS service layers (~2,325 lines): Bootstrap, Extension, Health,
  MountainClient, RPCServer, Telemetry, index.
- `MountainGRPCClient` with typed wrappers for 70+ RPCs.
- 13 service interfaces, `ModuleInterceptor` security sandbox,
  `EchoActionClient`.
- Effect 3.19.13 to 3.21.0, `@effect/platform` 0.94.0 to 0.96.0.

### v1.3 - Dependency Maintenance (2025)

- Effect 3.18.1 to 3.19.14, `@effect/platform` 0.92.1 to 0.94.1.

### v1.2 - Full-Stack Integration (2025)

- `Source/IPC/` with `Generated.ts` and `ProtoConverter` pair. 177-file
  structural reorganisation.

### v1.1 - Architecture Buildout (2025)

- ~400 commits, ~33k lines: core services, Tauri integration, TypeConverter,
  Mountain handshake.

### v0.0 - Project Inception

- Initial scaffold with Effect 3.16.10.

---

## Common

Abstract core Rust crate with trait definitions, `ActionEffect` system, and
shared DTOs.

### v2.1 - Full Workbench Lift (April 2026)

- PascalCase enforcement across 34 Rust files (514 insertions, 705 deletions).
- `EvaluatableExpression` + `InlineValues` provider types.
- 19 `LanguageFeature` provider methods standardised.
- Transport-layer refactor: `CircuitBreaker.rs`, `IPC.rs`, `gRPC.rs`.
- 36 new TypeScript declaration files for Workers API surface.

### v1.3 - Dependency Maintenance (2025)

- `@cloudflare/workers-types` rolled forward. No source changes.

### v1.2 - Full-Stack Integration (2025)

- `@cloudflare/workers-types` 4.20240721 to 4.20240925. Doc styling refreshed
  (98 CSS lines).

### v1.1 - Architecture Buildout (2025)

- Cloudflare Workers library with crypto-operations focus. 8 generated
  TypeScript declaration files.

### v1.0 - Integration Phase (2025)

- Maintenance-heavy cycle, `@cloudflare/workers-types` rolls.

### v0.2 - Architecture Solidification (2024)

- License expansion (42 to 131 lines). 172 insertions across 18 TypeScript
  declaration files.

### v0.0 - Project Inception (2024)

- Initial crypto-operation surface, Cloudflare Workers types, TypeDoc pipeline.

---

## Echo

High-performance work-stealing task scheduler (Rust crate consumed by Mountain).

### v2.1 - Full Workbench Lift (April 2026)

- Comprehensive CHANGELOG rebuilt from commit record.
- Crate-level rustdoc rewritten benefit-first. README expansion with
  getting-started guide.
- `build.rs` cleanup for warning-free `cargo build`.

### v2.0 - Editor Launch (Q1 2026)

- Workbench fixes stabilized Echo's call sites against new bundled-electron boot
  order.

### v1.3 - Dependency Maintenance (Q4 2025)

- Dependency rolls with no source changes.

### v1.2 - Full-Stack Integration (Q3 2025)

- `tsconfig` updated for declaration generation. Example formatting fixed.

### v1.1 - Architecture Buildout (June 2025)

- Scheduler/Queue/Task module split with real Rust source.
- PascalCase module conversion. Deep Dive document, README rewrite, performance
  roadmap.

### v1.0 - Integration Phase (May 2025)

- License transitions (CC0 to Land Public License v1.0). URL normalisation.

### v0.0 - Project Inception (July 2024)

- Cloudflare Workers scaffold, GitHub Actions workflows, Dependabot config.

---

## Grove

Rust/WASM extension-host sidecar for sandboxed WebAssembly extensions.

### v2.1 - Full Workbench Lift (April 2026)

- Language-provider registration system with forwarding to Mountain via
  transport.
- Custom DevLog tag-filtered logging replaces `tracing`. PascalCase rename.
- `Grove.proto` field names migrated to PascalCase. Transport-layer migration.

### v2.0 - Editor Launch (Q1 2026)

- Full scaffold: Rust/WASM host, VS Code API facade, gRPC transport, integration
  tests.
- Wasmtime 20 integration, host function execution, Spine action client.
- Common Transport Adapter to bridge through Common's vocabulary.

### v0.0 - Project Inception (April 2025)

- Placeholder repository. 14-commit buildout on 2026-02-08 was first real work.

---

## Maintain

Build/CI/GritQL surface for compiling Mountain, sidecars, and bundled VS Code
tree.

### v2.1 - Full Workbench Lift (April 2026)

- Multi-profile build support for Mountain, Electron, and compiler variants.
- Wildcard re-exports removed; explicit module paths enforced.
- Consistent Rust formatting for Rhai config tests.

### v2.0 - Editor Launch (Q1 2026)

- Guard disarm mechanism in `Maintain/Build` for transactional config rewrites.
- Binary entry point restructured with dedicated `main.rs`.

### v1.3 - Dependency Maintenance (Q4 2025)

- Continuous Dependabot rolls.

### v1.2 - Full-Stack Integration (Q3 2025)

- Node.js sidecar version bundling support. Compiled executables refreshed.

### v1.1 - Architecture Buildout (May 2025)

- Structured build system replacing ad-hoc shell scripts. Binary build
  configurability.

### v0.0 - Project Inception (2024)

- Catch-all build/CI repository. 200+ commits of `squash!` consolidation and
  Dependabot rolls.

---

## Mist

DNS isolation element - Hickory-DNS authoritative server resolving
`*.land.playform.cloud` to loopback.

### v2.1 - Full Workbench Lift (April 2026)

- Hickory-server upgraded to 0.26 API.
- Library renamed `mist` to `Mist` for PascalCase compliance. Integration-test
  imports refactored.

### v2.0 - Editor Launch (Q1 2026: DNS Isolation Introduced, 2026-02-27)

- Complete DNS server: `Server.rs` (UDP/TCP loopback listeners), `Zone.rs`
  (authoritative zone), `Resolver.rs` (HTTP-client integration with IP
  validation), `ForwardSecurity.rs` (forward allowlist).
- Integration: Mountain starts server, Air uses it for secure HTTP, SideCar
  spawns Node with DNS override, Cocoon resolves `land.playform.cloud`.

### v0.0 - Project Inception (April 2025)

- Placeholder for nine months before DNS implementation landed.

---

## Mountain

Native Rust Tauri backend with gRPC server, workbench service runtime, and all
IPC routing.

### v2.2 - Bundled-Electron Profile: Correctness Pass (April 2026)

- Dropped Cocoon-facing circuit-breaker cascade from 17,134 rejections to zero.
- JSON-RPC code `-32004` for benign 404s with `LooksLike404` predicate.
- Three-shape `GetURLFromURIComponentsDTO`. Deferred-no-op file watching.
- 64 KB per-terminal ring buffer. `sky:replay-events` IPC handler.
- Canonical-path comparison for `/Volumes/...` workspace mounts.
- `tree:getChildren` timeout 5000ms to 1500ms.

### v2.1 - Full Workbench Lift (April 2026)

- 24-module split of `WindServiceHandlers`, 15-submodule split of
  `CocoonService`.
- `dev_log!` macro across 170 files with 38 granular tags and `Trace=short`
  mode.
- 18 CocoonService handlers, 14 language-feature RPC methods.
- PostHog plugin, OTLP proxy, NodeResolver (8-step ladder), VsixInstaller.
- Navigation history, label resolution, text model registry, DualTrack env
  knobs.
- macOS window dragging, pre-boot zombie sweep, atomic shutdown guard.
- Vine protocol PascalCase, DTO serialization fixes, Cocoon health monitor
  improvements.

### v2.0 - Editor Launch (Q1 2026)

- Modular startup: Tray, Shutdown, Service, Register, Initialize.
- 20+ Tauri commands, TreeView foundation, Hover feature, Debug state.
- 351 Rust files, 70+ gRPC RPCs, 24 IPC domain modules.
- Thread safety: `static mut` to `RwLock` across 3828 lines.

### v1.3 - Dependency Maintenance (2025)

- `gen/schemas/macOS-schema.json` for tray/menu bar/dock. CI action updates.

### v1.2 - Full-Stack Integration (2025)

- Error handling standardised. Sidecar naming consolidated. Windows installer
  naming standardised.

### v1.1 - Architecture Buildout (2025)

- 185 commits: `Command/`, `Environment/` (14 providers), `ProcessManagement/`,
  `RunTime/`, `Track/`, `Vine/server/`.
- Auto-generated `vine_ipc.rs` (1,714 lines from `Vine.proto`).

### v1.0 - Integration Phase (2025)

- `ApplicationState/` reorganisation with DTOs and feature-organized state.
- `.github/workflows/Auto.yml` for automated update/push CI.

### v0.0 - Project Inception

- Relocated from `Editor/editor/src-tauri/` to monorepo root. Tauri build system
  integrated. CI landed.

---

## Output

Bundled JS artifact tree - compiled VS Code platform code loaded by Cocoon and
Sky at runtime.

### v2.2 - Bundled-Electron Profile: Correctness Pass (April 2026)

- `ExposeWorkbenchAccessor` transform for service-accessor capture.
- Service-IIFE wrapping for singleton registration survival through esbuild
  tree-shake.
- `__CEL_SERVICES__.invokeFunction(IFooService)` documented pattern.
- JSDoc nested `/* */` fix for esbuild compatibility.

### v2.1 - Full Workbench Lift, Polyfill Hardening (April 2026)

- `Source/Polyfill/` (~5,200 lines): 6 Electron-to-Tauri shims (Process,
  FileSystem, FileProtocol, ChildProcess, IPCRenderer, NativeModule).
- `TauriMainProcessService` IPC adapter, `DevLog` tag-filtered logging, `Trace`
  tracer surface.
- ESBuild framework rebuilt around dedicated config modules with 12
  exclusion-pattern modules.

### v2.0 - Editor Launch (Q1 2026)

- Migrated from prebuilt VS Code `out/` to source compilation. 4,287 JS files /
  169 MB per build.

### v1.1 - Architecture Buildout (2025)

- 35,000+ JS files, 14,000 source maps per build.

---

## Rest

Rust JS bundler using OXC (migrated from SWC in March 2026) for VS Code source
compilation.

### v2.1 - Full Workbench Lift (April 2026)

- OXC 0.127 API migration. Binary entry point switched to `Main.rs`.
- PascalCase rename. Unused imports cleared. Shell scripts POSIX-compliant.

### v2.0 - Editor Launch (OXC Migration, March 2026)

- SWC replaced with OXC compiler ecosystem. Compile subcommand. Phase 3 advanced
  build features.
- Static class-property transformation, comprehensive test suite.

### v1.0 - Integration Phase (Q1 2025)

- 152 commits, mostly Dependabot rolls.

### v0.0 - Project Inception (September 2024)

- First commit. Started as standalone `BinaryRest` before Land monorepo
  absorption.

---

## SideCar

Node.js sidecar runtime for platform-specific Node binary download and spawn
with DNS isolation.

### v2.1 - Full Workbench Lift (April 2026)

- CHANGELOG and README expansion. Crate-level rustdoc rewritten.
- `LAND_DNS_SERVER` renamed to `Resolve`. `tauri-plugin-shell` updated to 2.3.
- Mist import-path casing corrected.

### v2.0 - Editor Launch (Q1 2026: SideCar Born, 2026-03-24)

- Extracted from Mountain: `Download.rs` and `SideCar` binary with DNS override
  for Mist isolation.
- Cargo manifest with tokio, reqwest, tar, flate2, zip for platform binary
  unpacking.

### v0.0 - Project Inception (March 2026)

- Node.js download/spawn logic previously lived inline in Mountain.

---

## Sky

Astro-driven UI component layer hosting the workbench inside Tauri webview.

### v2.2 - Bundled-Electron Profile: Correctness Pass (April 2026)

- `sky:replay-events` invoke at end of `InstallSkyBridge` for event-drain during
  Cocoon activation.
- Channel-event bridge translating `<channel>.<event>` subscriptions to Tauri
  event listeners.
- Promise-protocol short-circuit for workbench wake-cycle cleanup.
- Search-result mapper updated to current `ITextSearchMatch` shape.

### v2.1 - Full Workbench Lift, Telemetry Bridges, Bundle Profiles (April 2026)

- OTELBridge (~153 lines) and PostHogBridge (~159 lines).
- `enableWorkspaceTrust: false` across 5 workbench profiles. Astro 6.1.1 to
  6.1.7.
- 327 lines of obsolete bootstrap code removed.

### v2.0 - Editor Launch (Q1 2026)

- Astro 5.16.6 to 6.1.1. TypeScript 6.0.2. Vite 8.0.3.
- Deleted 80 HTML files from ephemeral `Target/` (414 deletions).

### v1.3 - Dependency Maintenance (2025)

- Astro 5.14.1 to 5.16.6. Vite 7.1.6 to 7.3.0.

### v1.2 - Full-Stack Integration (2025)

- `jsconfig.json` for JS module surface. `sky-ipc-router` and `sky-host-bridge`
  added.

### v1.1 - Architecture Buildout (2025)

- Tauri workbench bootstrap: `WorkBench.ts` (~200 lines), keyboard layouts (37
  files). Vite 6.3.5 to 7.0.0.

### v0.0 - Project Inception (2024)

- Astro 4.x setup, SWUP page transitions, Tailwind CSS.

---

## Vine

gRPC protocol definition contract spoken between Mountain and Cocoon/Air
sidecars.

### v2.1 - Full Workbench Lift (April 2026)

- CHANGELOG and comprehensive architecture documentation. See Also section
  added.

### v2.0 - Editor Launch (Q1 2026)

- Protocol stable through editor-launch window. Proto-doc edits alongside
  Mountain's gRPC handler split.

### v0.0 - Project Inception (April 2025)

- Placeholder repository. `Vine.proto` lived in Mountain throughout.

---

## Wind

UI service layer - Effect-TS re-implementation of VS Code workbench services
bridging renderer to Mountain through Tauri IPC.

### v2.1 - Full Workbench Lift, Tauri IPC Bridge (April 2026)

- 5 streaming `listen()` subscriptions: vfs/fileChange, configuration/changed,
  terminal/data, lifecycle/willShutdown, lifecycle/phaseChanged.
- `TauriMainProcessService` with 24 routed channels and 14 stub channels.
- MessageChannel for extension-host IPC. `ResolveConfiguration` for
  `INativeWindowConfiguration`.
- `DevLog` (~72 lines) with short-mode formatting.
- 1,076 lines of legacy polyfills deleted.

### v2.0 - Editor Launch (Q1 2026)

- `Preload.ts` (99 lines) as Tauri/Electron bridge. 30+ VS Code type mirror
  files. TypeScript 5.9.3 to 6.0.2.

### v1.3 - Dependency Maintenance (2025)

- Effect 3.18.0 to 3.19.14. Module count stable.

### v1.2 - Full-Stack Integration (2025)

- 100+ application service modules with Define/Implement/Problem pattern. 300+
  file infrastructure commit.
- Effect-TS 3.17.x to 3.18.x.

### v1.1 - Architecture Buildout (2025)

- Effect-TS adoption. `Source/Effect/` and `Source/Application/` directories.
  SolidJS evaluation concluded.

### v0.0 - Project Inception (2024)

- SolidJS-era bones: Context, Element, Library, Function, Stylesheet, Variable.

---

## Worker

Service-worker/web-worker layer for renderer background processing and shim
caching.

### v2.1 - Full Workbench Lift (April 2026)

- Service-worker registration wrapped in IIFE with early return. ESBuild config
  with source maps.
- Obsolete precache paths removed. Build scripts switched to POSIX-compliant
  `sh`.

### v2.0 - Editor Launch (Q1 2026)

- Service-worker refresh loop prevention with version tracking. Production
  minification with development-readable source maps.

### v1.0 - Integration Phase (May 2025)

- Initial web-worker implementation. Service-worker security and version
  tracking. ESBuild configuration consolidated.

### v0.0 - Project Inception (April 2025)

- 67-commit setup push. No worker implementation yet.
