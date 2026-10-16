---
title: "Build System Design: Two-Stage Pipeline, Tier Gating, and Deterministic
    Builds"
summary: "How Land's build system coordinates VS Code compilation, Rust backend
    assembly, and TypeScript bundling through a tier-gated, profile-driven
    pipeline."
publishedAt: "2026-05-15"
tags: ["Build System", "CI/CD", "Maintain", "Tier Gating"]
author: "CodeEditorLand"
readTime: 9
---

# Build System Design

Deterministic builds require more than pinning dependency versions. They require
that every tool, every feature flag, and every environment variable resolves
identically on every machine, in CI, and across build profiles. [Land](https://github.com/CodeEditorLand/Land)'s build
system achieves this through a two-stage pipeline, an 18-file environment
cascade, and compile-time tier gating that touches Rust, TypeScript, and the
shell simultaneously.

## The Two-Stage Model

Every [Land](https://github.com/CodeEditorLand/Land) build is a two-stage linear flow. The stages are strictly ordered:
Stage 1 output is required before Stage 2 can proceed.

**Stage 1: VS Code Platform Compilation**

The VS Code source is vendored as a Git submodule at
[`Dependency/Microsoft/Dependency/Editor`](https://github.com/CodeEditorLand/Land/tree/Current/Dependency/Microsoft/Dependency/Editor). This step produces the compiled
JavaScript platform code that [`Cocoon`](https://github.com/CodeEditorLand/Cocoon) (the extension host) and [`Output`](https://github.com/CodeEditorLand/Output) (the
platform bundle) consume.

```sh
cd Dependency/Microsoft/Dependency/Editor
nvm use 24           # .nvmrc pins Node 24
export NODE_ENV=development
npm install
npm run compile
npm run compile-extensions-build
```

Node 24 is a hard requirement. The submodule uses npm, not pnpm; the two package
managers use incompatible lockfile formats and the submodule's `.npmrc` carries
upstream VS Code build keys read by `node-gyp` and native module compilers.

The `compile-extensions-build` step produces `out-<platform>` directories
containing compiled extension JavaScript. Without it, [Cocoon](https://github.com/CodeEditorLand/Cocoon) cannot locate the
VS Code platform code at runtime.

**Stage 2: Land Application Assembly**

With Stage 1 complete, the [Land](https://github.com/CodeEditorLand/Land) application itself compiles:

```sh
cd Land
./Maintain/Debug/Build.sh --profile debug-electron-bundled
```

The build script drives, in sequence: Rust workspace compilation for [`Common`](https://github.com/CodeEditorLand/Common),
[`Echo`](https://github.com/CodeEditorLand/Echo), [`Mist`](https://github.com/CodeEditorLand/Mist), [`Mountain`](https://github.com/CodeEditorLand/Mountain), [`Rest`](https://github.com/CodeEditorLand/Rest), [`SideCar`](https://github.com/CodeEditorLand/SideCar), [`Vine`](https://github.com/CodeEditorLand/Vine), and [`Grove`](https://github.com/CodeEditorLand/Grove) (the [`Air`](https://github.com/CodeEditorLand/Air)
daemon is a separate crate with its own target directory); [Output](https://github.com/CodeEditorLand/Output) artifact
bundling (esbuild primary, Rest OXC selectable); [Cocoon](https://github.com/CodeEditorLand/Cocoon) compilation via
ESBuild; [Worker](https://github.com/CodeEditorLand/Worker) compilation; [Wind](https://github.com/CodeEditorLand/Wind) and [Sky](https://github.com/CodeEditorLand/Sky) compilation via Vite and Astro; and
finally Tauri bundling for the `.app` bundle.

## [Maintain](https://github.com/CodeEditorLand/Maintain): Build Orchestrator

[Maintain](https://github.com/CodeEditorLand/Maintain) is a Rust binary at [`Element/Maintain/`](https://github.com/CodeEditorLand/Land/tree/Current/Element/Maintain) that provides build
orchestration, dead-code elimination, and a development runner. Its build
side resolves named profiles from [`.vscode/land-config.json`](https://github.com/CodeEditorLand/Land/tree/Current/.vscode/land-config.json) (JSON5, comments
and trailing commas allowed) and drives the compile:

- **CLI layer** ([`Source/Build/CLI/Cli.rs`](https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/CLI/Cli.rs)) -- a `clap`-based interface with
  `build`, `eliminate`, and `run` subcommands; each resolves a named profile
  from [`land-config.json`](https://github.com/CodeEditorLand/Land/tree/Current/.vscode/land-config.json).
- **Embedded Rhai engine** ([`Source/Build/Rhai/`](https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/Rhai)) -- an in-process interpreter
  used by the config loader and environment resolver. There are no standalone
  `.rhai` scripts to author or invoke.
- **Configuration editing** ([`Source/Build/TomlEdit.rs`](https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/TomlEdit.rs),
  [`Source/Build/JsonEdit.rs`](https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/JsonEdit.rs), [`Source/Build/PlistEdit.rs`](https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/PlistEdit.rs)) -- non-lossy
  `Cargo.toml`, JSON5, and `Info.plist` editing that preserves formatting,
  comments, and structure through version bumps and CI modifications.
- **Dead-code elimination** ([`Source/Eliminate/`](https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Eliminate)) -- AST-level inlining of
  single-use `let` bindings (non-mutated, no closure captures), with a dry-run
  mode for preview.

The shell entry points are:

| Script                                                                                                               | Purpose                                    |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| [`Maintain/Debug/Build.sh`](https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Debug/Build.sh)             | Debug build; auto-signs `.app` after tauri |
| [`Maintain/Release/Build.sh`](https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Release/Build.sh)         | Release build with the same signing step   |
| [`Maintain/Script/SignBundle.sh`](https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Script/SignBundle.sh) | Ad-hoc re-sign with xattr clear + codesign |
| [`Maintain/Debug/Run.sh`](https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Debug/Run.sh)                 | Launch the built binary without rebuilding |

## Build Profiles

The `Build.sh` script accepts a `--profile` flag that selects the workbench
variant and feature coverage. Debug profiles:

| Profile                   | Workbench                                              | Notes                                                                                                                  |
| ------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `debug`                   | Browser                                                | Default; 70-80% feature coverage                                                                                       |
| `debug-mountain`          | [Mountain](https://github.com/CodeEditorLand/Mountain) | 80-90% coverage; recommended                                                                                           |
| `debug-electron`          | Electron                                               | 95%+ coverage; full workbench                                                                                          |
| `debug-electron-rest`     | Electron                                               | 95%+ class; [Rest](https://github.com/CodeEditorLand/Rest) OXC compiler path                                           |
| `debug-electron-minimal`  | Electron                                               | No bundled built-in extensions                                                                                         |
| `debug-mountain-only`     | [Mountain](https://github.com/CodeEditorLand/Mountain) | No [Cocoon](https://github.com/CodeEditorLand/Cocoon) subprocess                                                       |
| `debug-electron-bundled`  | Electron                                               | Workbench bundled via Vite/Astro                                                                                       |
| `debug-electron-compiled` | Electron                                               | Single-binary embedded resources                                                                                       |
| `debug-kernel`            | Electron                                               | No built-ins, no [Cocoon](https://github.com/CodeEditorLand/Cocoon), no [Wind](https://github.com/CodeEditorLand/Wind) |

Release profiles ([`Maintain/Release/Build.sh`](https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Release/Build.sh)) are `production` (default,
[Mountain](https://github.com/CodeEditorLand/Mountain) workbench), `release`, `release-electron` (Electron + [Rest](https://github.com/CodeEditorLand/Rest) OXC),
`release-electron-bundled`, and `web-browser` (no Tauri). The full profile list
is defined in [`.vscode/land-config.json`](https://github.com/CodeEditorLand/Land/tree/Current/.vscode/land-config.json) and printed by
[`Maintain/Debug/Build.sh --help`](https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Debug/Build.sh).

To launch the built application without rebuilding, use [`Maintain/Debug/Run.sh`](https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Debug/Run.sh)
(or `Maintain run --profile <name>`).

## Environment Variable System

[Land](https://github.com/CodeEditorLand/Land) uses 18 `.env` files across 6 domains, resolved in a fixed priority order:

1. `$Land_Env_File` (if explicitly exported)
2. `.env.Land` (local gitignored overrides)
3. `../.env.Land` (one level up)
4. `.env.Land.Sample` (checked-in defaults)
5. `../.env.Land.Sample`

The resolved file is sourced via `set -a; . "$EnvFile"; set +a`, exporting
every key-value pair into the shell environment so every child tool inherits the
same variable set.

The six env domains and their per-profile file combinations:

| Domain      | Dev File                | Production File                    |
| ----------- | ----------------------- | ---------------------------------- |
| Core        | `.env.Land`             | `.env.Land.Production`             |
| Node        | `.env.Land.Node`        | `.env.Land.Production.Node`        |
| Extensions  | `.env.Land.Extensions`  | `.env.Land.Production.Extensions`  |
| PostHog     | `.env.Land.PostHog`     | `.env.Land.Production.PostHog`     |
| Diagnostics | `.env.Land.Diagnostics` | `.env.Land.Production.Diagnostics` |
| Bundled     | `.env.Land.Bundled`     | `.env.Land.Production.Bundled`     |

All environment variable names are PascalCase (`BundleLevel`, `HotReload`,
`Watch`, `TierFileSystem`). External tool conventions (`TAURI_*`, `CARGO__`,
`NODE_*`) stay uppercase.

Common variables:

| Variable                  | Default    | Description                                                                  |
| ------------------------- | ---------- | ---------------------------------------------------------------------------- |
| `ProductVersion`          | `1.118.0`  | [Land](https://github.com/CodeEditorLand/Land) version and feature tier gate |
| `TierFileSystem`          | `Layer2`   | Filesystem implementation tier                                               |
| `TierFileWatcher`         | `Layer4`   | File watching implementation tier                                            |
| `TierRemoteProcedureCall` | `gRPC`     | IPC transport mechanism                                                      |
| `NetworkMountainPort`     | `50051`    | gRPC port for Mountain backend                                               |
| `NetworkCocoonPort`       | `50052`    | gRPC port for Cocoon extension host                                          |
| `BundleLevel`             | `debug`    | Passed to `SignBundle.sh`                                                    |
| `HotReload`               | `false`    | File watch in dev mode                                                       |
| `TierIPC`                 | `Mountain` | IPC routing: Mountain / NodeDeferred / Node                                  |

## Tier Gating

Tier gating is the mechanism by which every capability with multiple
implementations -- gRPC vs shared memory, native glob vs `globset`, JS file
watcher vs `notify` -- lives in the codebase simultaneously and is selected at
build time. No duplicated call sites, no preprocessor macros in source files.

The cascade from env var to compiled binary works differently for each language:

**Rust ([Mountain](https://github.com/CodeEditorLand/Mountain), [Common](https://github.com/CodeEditorLand/Common), [Echo](https://github.com/CodeEditorLand/Echo), [Mist](https://github.com/CodeEditorLand/Mist), [Rest](https://github.com/CodeEditorLand/Rest), [SideCar](https://github.com/CodeEditorLand/SideCar), [Air](https://github.com/CodeEditorLand/Air), [Grove](https://github.com/CodeEditorLand/Grove), [Vine](https://github.com/CodeEditorLand/Vine))**

Each Rust element with tier-gated features has a `build.rs` that calls
`PropagateTierGating()`. This function scans the resolved env file and emits:

- `cargo:rustc-env=Tier<Capability>=<Value>` for every row (defaults and
  overrides), making values available as compile-time `env!()` constants.
- `cargo:rustc-cfg=feature="Tier<Capability><Value>"` for non-default values,
  activating `Cargo.toml` feature gates.
- `cargo:rerun-if-changed=<envfile>` for correct incremental invalidation.
- `cargo:warning=` for any unrecognized `(Key, Value)` pair.

Default values do not activate features, keeping the baseline compilation lean.
Non-default values activate named Cargo features:

```toml
[features]
default = []
TierFileSystemLayer4 = []
TierGlobNative = []
```

**TypeScript ([Cocoon](https://github.com/CodeEditorLand/Cocoon))**

The build script serializes every `Tier*` variable into a `CocoonEsbuildDefine`
JSON blob. [Cocoon](https://github.com/CodeEditorLand/Cocoon)'s [`TargetConfig.ts`](https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Configuration/ESBuild/Cocoon.ts) merges this blob into esbuild's define map.
At bundle time, `__LandTier_FileSystem__` and similar tokens are substituted
with their resolved string values. At runtime, [`Cocoon/Source/Utility/Tier.ts`](https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Utility/Tier.ts)
reads the substituted globals, falls through to `process.env.Tier<Capability>`,
and then to hard-coded defaults.

**TypeScript ([Sky](https://github.com/CodeEditorLand/Sky), [Wind](https://github.com/CodeEditorLand/Wind))**

[Sky](https://github.com/CodeEditorLand/Sky)'s `astro.config.ts` forwards every `Tier*` env var into Vite's define map.
At build time, `import.meta.env.TierFileSystem` and similar references are
substituted. [`Wind/Source/Utility/Tier.ts`](https://github.com/CodeEditorLand/Wind/tree/Current/Source/Utility/Tier.ts) reads these values and emits a boot
banner.

**Cross-element agreement check**

All three runtime banners must report identical tier values:

| Element                                                | Banner mechanism         |
| ------------------------------------------------------ | ------------------------ |
| [Mountain](https://github.com/CodeEditorLand/Mountain) | Rust `env!()` banner     |
| [Cocoon](https://github.com/CodeEditorLand/Cocoon)     | `LandFixLog.Info` banner |
| [Wind](https://github.com/CodeEditorLand/Wind)         | `console.info` banner    |

A mismatch means one build tool read a different env file.

## turbo.json Task Graph

Turborepo orchestrates the JavaScript build graph. [`turbo.json`](https://github.com/CodeEditorLand/Land/tree/Current/turbo.json) declares:

- The `prepublishOnly` task for all TypeScript elements, with dependency
  ordering so [Wind](https://github.com/CodeEditorLand/Wind) and [Sky](https://github.com/CodeEditorLand/Sky) compile after their upstream elements.
- The `build` task that drives Vite and Astro compilation.
- A `globalEnv` array containing every `Tier*`, `Product*`, `Network*`, and
  `BundleLevel` variable. Any variable listed in `globalEnv` is hashed into
  Turborepo's cache key, so a change to `TierFileSystem=Layer4` correctly
  invalidates downstream element caches.

## Extension Manifest Pre-Bake

The extension list is pre-baked during the [Sky](https://github.com/CodeEditorLand/Sky) build. The [`BakeExtensionManifest`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Build/BakeExtensionManifest.ts)
Astro integration ([`Sky/Source/Function/Build/BakeExtensionManifest.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Build/BakeExtensionManifest.ts)) runs on
`astro:build:done`, scans the bundled and user extension roots, and writes
`extensions.manifest.json` next to the dev binary and into the bundle path that
[`tauri.conf.json`](https://github.com/CodeEditorLand/Mountain/tree/Current/tauri.conf.json) ships inside the `.app`.

At runtime, [`LoadFromCache.rs`](https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/Internal/ExtensionScanner/LoadFromCache.rs)
([`Mountain/Source/ApplicationState/Internal/ExtensionScanner/`](https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/Internal/ExtensionScanner)) reads this
pre-baked manifest in under 50 ms, compared to the 1200 ms required for a live
directory scan of the same extensions. [`ScanAndPopulateExtensions.rs`](https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/Internal/ExtensionScanner/ScanAndPopulateExtensions.rs) tries the
cache first and falls back to the live scan when the manifest is missing, stale
(older than 24 hours for dev builds), or unreadable.

## Code Signing

[`Maintain/Script/SignBundle.sh`](https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Script/SignBundle.sh) runs after every build. It performs two
operations in order:

```sh
xattr -cr "$AppBundle"
codesign --force --deep --sign "$Identity" --entitlements Entitlements.plist "$AppBundle"
```

The `xattr -cr` step removes all extended attributes from the bundle tree.
macOS Gatekeeper rejects bundles with quarantine attributes, and the build
process routinely stamps them. The `codesign` step then applies either an ad-hoc
signature (`-`) for debug builds or a named Developer ID certificate for release
builds.

[`Entitlements.plist`](https://github.com/CodeEditorLand/Mountain/tree/Current/Entitlements.plist) carries the entitlements required for terminal access,
file-system access, network connections, and the hardened runtime. XML comments
in the plist must appear outside `<dict>` elements; comments inside `<dict>` are
silently dropped by `codesign` and can cause entitlement mismatches in debug
scenarios.

Both [`Maintain/Debug/Build.sh`](https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Debug/Build.sh) and [`Maintain/Release/Build.sh`](https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Release/Build.sh) invoke
`SignBundle.sh` automatically after the Tauri build completes, with
`BundleLevel=debug` or `BundleLevel=release` respectively.

## Route Manifest Generation

[`Maintain/Script/GenerateRouteManifest.sh`](https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Script/GenerateRouteManifest.sh) runs on every build (wired into
[`Maintain/Debug/Build.sh`](https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Debug/Build.sh) and each element's `prepublishOnly`) and scans three
routing tiers:

- **Tier 1**: [Mountain](https://github.com/CodeEditorLand/Mountain) Rust handlers, extracted from
  [`Element/Mountain/Source/Track/Effect/CreateEffectForRequest/*.rs`](https://github.com/CodeEditorLand/Land/tree/Current/Element/Mountain/Source/Track/Effect/CreateEffectForRequest) by matching
  `"Name" =>` arms.
- **Tier 2**: Stock VS Code lifted functions from
  `Element/Cocoon/Source/Services/Handler/VscodeAPI/StockLift.ts`.
- **Tier 3**: [Cocoon](https://github.com/CodeEditorLand/Cocoon) bespoke Node fallbacks discovered in `*Fallback.ts` files.

The generated `RouteManifest.ts` exposes three `ReadonlySet<string>` values
consumed by `Services/DualTrack.ts` at runtime. DualTrack is the progressive
Rust-migration backstop: it tries [Mountain](https://github.com/CodeEditorLand/Mountain)'s gRPC handler first, and when
[Mountain](https://github.com/CodeEditorLand/Mountain) does not know the method yet it falls back to a Node implementation
in [Cocoon](https://github.com/CodeEditorLand/Cocoon), skipping the round-trip for methods no Rust handler exists for and
raising a typed error for methods no tier covers. A human-readable coverage
report is written alongside the manifest.

## Artifact Layout

After a successful build:

```
Land/
├── Element/
│   ├── Mountain/Target/debug/
│   │   ├── Mountain              # Native binary
│   │   └── Mountain.app/         # Tauri application bundle
│   ├── Air/Target/               # Background daemon binary
│   ├── Cocoon/Compiled/
│   │   └── cocoon-bootstrap.js   # Built extension host
│   ├── Output/Target/
│   │   └── @codeeditorland/output/  # Bundled VS Code platform
│   └── Sky/Target/Static/
│       └── Bundled/Electron/     # Compiled UI assets
└── Maintain/Debug/Build.sh       # Build orchestration entry point
```

## Key Dependencies

| Crate / Tool      | Role                                                                                                                                                                   |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tauri` 2.x       | Native window, IPC, and app bundle management                                                                                                                          |
| `cargo` workspace | Rust element compilation with `[patch.crates-io]` redirects                                                                                                            |
| `pnpm` workspace  | JS element dependency management and workspace protocol                                                                                                                |
| `turborepo`       | TypeScript build graph and cache invalidation                                                                                                                          |
| ESBuild           | [Cocoon](https://github.com/CodeEditorLand/Cocoon), [Output](https://github.com/CodeEditorLand/Output), [Worker](https://github.com/CodeEditorLand/Worker) compilation |
| Vite + Astro      | [Sky](https://github.com/CodeEditorLand/Sky) and [Wind](https://github.com/CodeEditorLand/Wind) UI compilation                                                         |
| `rhai`            | Embedded scripting in [Maintain](https://github.com/CodeEditorLand/Maintain)                                                                                           |
| `toml_edit`       | Non-lossy TOML modification for `Cargo.toml`                                                                                                                           |
| `json5`           | JSON5 configuration support                                                                                                                                            |
| `clap`            | CLI argument parsing in Maintain                                                                                                                                       |

## Why This Structure

The two-stage model exists because the VS Code platform source is a separate
compilation unit with its own Node version requirement, its own package manager,
and its own output format. Folding it into the [Land](https://github.com/CodeEditorLand/Land) build graph would require
either duplicating its build system or adding a Node version dependency into
every Land build. Keeping it as an explicit prerequisite preserves the isolation
and makes the boundary obvious.

The tier gating system exists because [Land](https://github.com/CodeEditorLand/Land) targets a wide matrix of capability
tiers -- different filesystem implementations, different IPC transports,
different extension scanning strategies -- and the correctness of each tier
combination must be verifiable without runtime feature detection. Compile-time
selection via Cargo features and esbuild define tokens means a wrong tier
configuration produces a build error, not a runtime behavior difference.
