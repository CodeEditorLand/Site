---
title:
    "Build System Design: Rhai Scripting, TOML/JSON5, and Deterministic Builds"
summary:
    "How Maintain orchestrates cross-element builds with embedded scripting and
    type-safe configuration editing."
publishedAt: "2026-05-15"
tags: ["Build System", "Rhai", "CI/CD", "Maintain"]
author: "CodeEditorLand"
readTime: 7
---

# Build System Design

Deterministic builds are hard. The same commit should produce identical output
on every machine, regardless of installed tool versions, environment variables,
or implicit toolchain state. Maintain, Land's build system, is a Rust binary
designed to eliminate that class of failures entirely.

## Architecture

Maintain is both a library and a CLI. The entry point at `Source/Library.rs`
wires together three subsystems:

1. **CLI layer** (`Source/Build/CLI.rs`) -- a `clap`-based interface accepting
   subcommands for debug, release, profile, and dev operations.
2. **Rhai scripting engine** (`Source/Build/Rhai/`) -- an embedded interpreter
   that executes build configuration scripts with full environment access.
3. **Configuration editing** (`Source/Build/TomlEdit.rs`,
   `Source/Build/JsonEdit.rs`) -- non-lossy TOML and JSON5 editing for
   `Cargo.toml` and `package.json`.

Build dispatch flows through `Source/Build/Fn.rs`, which coordinates clean,
compile, link, and post-process stages. Child process management
(`Source/Build/Process.rs`) handles stdout/stderr capture and exit code
propagation.

## The Shell Entry Points

Every build starts from a shell script in `Maintain/`:

| Script            | Purpose                                      |
| ----------------- | -------------------------------------------- |
| `Debug.sh`        | Full debug build of all elements             |
| `Dev-Mountain.sh` | Hot-reload development mode for Mountain     |
| `Release.sh`      | Optimized release build with all elements    |
| `Profile.sh`      | Release build with profiling instrumentation |

These scripts call the Maintain CLI with appropriate flags. For example, the
debug path invokes:

```
Maintain debug --target aarch64-apple-darwin
```

The CLI loads the Rhai build configuration, resolves environment variables,
reads `Cargo.toml` for version and dependency information, and then iterates
through the build group defined in `Source/Build/Definition.rs`. Each element is
compiled in order via subprocess:

```
cargo build -p Mountain
cargo build -p Air
cargo build -p Echo
```

TypeScript elements (Cocoon, Wind, Sky) are built through
`pnpm run prepublishOnly` subprocesses, coordinated via Turborepo.

## Tier Gating via Environment Overlay

The most complex part of the build system is tier-gating. The file
`Maintain/Script/TierEnvironment.sh` acts as the master configuration fan-out.
It reads `.env.Land` (or `.env.Land.Sample`) and exports every `Tier*`,
`Product*`, and `Network*` variable so all elements see the same configuration.

The overlay cascade resolves in order:

1. Root `.env.Land` values
2. Domain-specific overlays: `.env.Land.Node`, `.env.Land.Extensions`,
   `.env.Land.PostHog`, `.env.Land.Diagnostics`, `.env.Land.Bundled`
3. Production overlays when `NODE_ENV=production` or the profile contains
   `release`

From these values, the script derives two outputs:

- **`CargoFeatures`** -- a comma-separated list of Rust feature flags. For
  example, `TierRemoteProcedureCall=SharedMemory` becomes
  `TierRemoteProcedureCallSharedMemory`, which Mountain's `Cargo.toml` gates on.
- **`CocoonEsbuildDefine`** -- a JSON object of `__LandTier_*__`,
  `__LandProduct_*__`, and `__LandNetwork_*__` replacement tokens that Cocoon's
  `TargetConfig.ts` merges into esbuild options.

This means every capability with multiple implementations (gRPC vs shared
memory, native glob vs `globset`, JS file watcher vs `notify`) lives in the
codebase simultaneously and gets selected at build time. No duplicated call
sites, no preprocessor macros in source files.

## Configuration Editing

Maintain provides two configuration editors:

**TomlEdit** (`Source/Build/TomlEdit.rs`) uses the `toml_edit` crate for
non-lossy TOML modifications. This means version bumps and dependency changes
preserve formatting, comments, and structure. Critical for CI that modifies
`Cargo.toml` without destroying developer-added documentation.

**JsonEdit** (`Source/Build/JsonEdit.rs`) provides JSON5-aware editing for
`package.json` and `.json5` files. JSON5 allows comments and trailing commas,
both common in Land's configuration files.

## Route Manifest Generation

`Maintain/Script/GenerateRouteManifest.sh` is a code generation step hooked into
`pnpm run prepublishOnly`. It scans three routing tiers and emits a TypeScript
manifest at `Element/Cocoon/Source/Generated/RouteManifest.ts`:

- **Tier 1**: Mountain Rust handlers extracted from
  `Element/Mountain/Source/Track/Effect/CreateEffectForRequest/*.rs` via regex
  matching of `"Name" =>` arms.
- **Tier 2**: Stock VS Code lifted functions from
  `Element/Cocoon/Source/Services/Handler/VscodeAPI/StockLift.ts`.
- **Tier 3**: Cocoon bespoke Node fallbacks discovered in `*Fallback.ts` files.

The manifest produces three `ReadonlySet<string>` values consumed by
`Services/DualTrack.ts` at runtime. The dual-track dispatcher skips Mountain's
gRPC round-trip for methods Mountain does not handle, and raises a typed error
for methods no tier covers. A coverage report is emitted at
`RouteManifest.Report.md`.

## Rhai Scripting Engine

For build logic that cannot be expressed in TOML or shell, Maintain embeds Rhai.
The scripting engine lives in three modules:

| Module                                     | Role                                    |
| ------------------------------------------ | --------------------------------------- |
| `Source/Build/Rhai/ConfigLoader.rs`        | Loads and parses `.rhai` build scripts  |
| `Source/Build/Rhai/ScriptRunner.rs`        | Executes scripts with Land API bindings |
| `Source/Build/Rhai/EnvironmentResolver.rs` | Exposes env vars to scripts             |

Rhai scripts have access to the full build context: environment variables,
element paths, and build phase information. This allows custom build steps
without modifying the Rust binary or adding new shell scripts.

## Key Dependencies

| Rust Crate         | Purpose                            |
| ------------------ | ---------------------------------- |
| `rhai`             | Embedded scripting engine          |
| `clap`             | CLI argument parsing               |
| `toml_edit`        | Non-lossy TOML parsing and editing |
| `json5`            | JSON5 configuration support        |
| `colored`          | Colored terminal output            |
| `log`/`env_logger` | Logging framework                  |

## Why Rust for a Build System?

Speed and type safety are the surface reasons. The deeper reason is that the
build system shares a language with Mountain, Air, and Echo. Type definitions,
DTOs, and error types flow naturally between the build pipeline and the elements
it compiles. There is no impedance mismatch between build-time configuration and
runtime behavior.
