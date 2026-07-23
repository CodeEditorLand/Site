---
title: Maintain
section: "Elements"
order: 5
description:
    Maintain is the build orchestrator for Land, providing shell scripts for
    debug and release builds, GritQL queries for automated refactoring, and a
    turbo.json task graph - it does not need to be recompiled when changed.
---

Maintain is the build orchestrator for the Land project. It coordinates shell
scripts, a Rust CLI with embedded Rhai scripting, and a Turborepo task graph to
produce deterministic builds across all Land elements. Unlike Mountain, Cocoon,
or Rest, Maintain does not need to be recompiled when its source changes - it is
a build wrapper, not a compiled artifact that runs inside the editor.

## What Maintain provides

| Capability                | Description                                                                                                   |
| :------------------------ | :------------------------------------------------------------------------------------------------------------ |
| Shell script entry points | `Debug/Build.sh`, `Release/Build.sh`, `SignBundle.sh` - the commands developers and CI run                    |
| Rhai scripting engine     | Embedded `rhai` interpreter for flexible build logic and custom automation without shell portability concerns |
| TOML / JSON5 editing      | Type-safe, non-lossy editing of `Cargo.toml` and `package.json` files via `toml_edit` and `json5`             |
| turbo.json task graph     | Defines `globalEnv`, task dependencies, and parallel execution across all Land packages                       |
| GritQL queries            | Automated refactoring patterns for bulk code transformations across the codebase                              |
| CI/CD configuration       | Pipeline definitions for building and signing on each supported platform                                      |

## Architecture

Maintain is a Rust binary and library. The CLI layer accepts subcommands and
delegates to the Rhai scripting engine or direct build functions. Configuration
editing is performed through `toml_edit` and `json5` for structured, non-lossy
modifications to project configuration files.

<img src="/Mermaid/8bc86b64cbb3c6d9.svg" alt="Mermaid diagram" />
## Key Modules

| Path                                       | Description                                                                  |
| :----------------------------------------- | :--------------------------------------------------------------------------- |
| `Source/Library.rs`                        | Binary entry point; wires together CLI, logging, and error handling          |
| `Source/Build/CLI.rs`                      | `clap`-based CLI with subcommands: debug, release, profile, dev              |
| `Source/Build/Definition.rs`               | Build group definitions: which elements to build, in what order              |
| `Source/Build/Fn.rs`                       | Core build function dispatch: clean, compile, link, post-process             |
| `Source/Build/Process.rs`                  | Child process spawning with stdout/stderr capture and exit code handling     |
| `Source/Build/TomlEdit.rs`                 | Non-lossy TOML editing for `Cargo.toml` version bumps and dependency changes |
| `Source/Build/JsonEdit.rs`                 | JSON5-aware configuration editing for `package.json` and `.json5` files      |
| `Source/Build/Pascalize.rs`                | PascalCase ↔ words conversion utilities for naming convention enforcement    |
| `Source/Build/GetTauriTargetTriple.rs`     | Detects current Rust target triple for SideCar binary selection              |
| `Source/Build/EnvironmentResolver.rs`      | Resolves environment variables with fallbacks for build-time configuration   |
| `Source/Build/Logger.rs`                   | Colored terminal output using the `colored` crate                            |
| `Source/Build/Error.rs`                    | Unified error type for build failures                                        |
| `Source/Build/Rhai/ConfigLoader.rs`        | Loads and parses Rhai build configuration scripts                            |
| `Source/Build/Rhai/ScriptRunner.rs`        | Executes Rhai scripts within the build context with Land API bindings        |
| `Source/Build/Rhai/EnvironmentResolver.rs` | Exposes environment variable resolution to Rhai scripts                      |

## Data Flow

<img src="/Mermaid/5becfbd1ececd232.svg" alt="Mermaid diagram" />
## Integration Points

| Connecting Element | Direction     | Mechanism                            | Description                                                         |
| :----------------- | :------------ | :----------------------------------- | :------------------------------------------------------------------ |
| **Mountain**       | Build target  | `cargo build` subprocess             | Maintain compiles Mountain as part of the debug/release build group |
| **Air**            | Build target  | `cargo build` subprocess             | Air daemon compiled alongside Mountain                              |
| **Echo**           | Build target  | `cargo build` subprocess             | Echo scheduler compiled as a dependency of Mountain                 |
| **Rest**           | Build target  | `cargo build` subprocess             | Rest compiler binary built for use by Output                        |
| **SideCar**        | Build target  | `cargo build` subprocess             | SideCar Download tool compiled and run as part of setup             |
| **Output**         | Build trigger | `pnpm run prepublishOnly` subprocess | Maintain triggers TypeScript builds via pnpm                        |
| **Wind / Sky**     | Build trigger | `pnpm run prepublishOnly` subprocess | Frontend packages built through Turborepo via Maintain              |

## Configuration

| Option         | CLI Flag                       | Description                                              |
| :------------- | :----------------------------- | :------------------------------------------------------- |
| Build mode     | `debug` / `release` subcommand | Controls `--release` flag and optimization level         |
| Target triple  | `--target`                     | Rust target triple for cross-compilation                 |
| Element filter | `--element`                    | Build only a specific element rather than the full group |
| Script path    | `--script`                     | Override the default Rhai build configuration script     |
| Verbosity      | `--verbose`                    | Enable detailed subprocess output logging                |

## Shell scripts

The primary entry points are shell scripts in `Element/Maintain/`:

| Script                 | Purpose                                                                                                |
| :--------------------- | :----------------------------------------------------------------------------------------------------- |
| `Debug.sh`             | Full debug build of all elements                                                                       |
| `Debug/Build.sh`       | Debug build: sets up env vars, runs `tauri build --profile debug-electron`, then calls `SignBundle.sh` |
| `Debug/Run.sh`         | Launches the built debug binary with `Trace`, `Record`, and other dev env vars                         |
| `Debug/Wind.sh`        | Builds and watches only the Wind TypeScript service layer                                              |
| `Debug/All.sh`         | Debug all components including frontend                                                                |
| `Release.sh`           | Optimized release build with all elements                                                              |
| `Script/SignBundle.sh` | Ad-hoc re-sign of the `.app` bundle using `xattr -cr` and `codesign`                                   |
| `Dev-Mountain.sh`      | Hot-reload development mode for Mountain only                                                          |
| `Profile.sh`           | Release build with profiling instrumentation enabled                                                   |

## Why Maintain does not need rebuild

Maintain's shell scripts are plain `sh` - they run directly on any POSIX system
without compilation. The Rust Maintain binary is a build helper CLI that is
compiled once and cached; it does not run inside the editor at runtime. Changes
to the shell scripts take effect immediately on the next invocation. Changes to
`turbo.json` take effect on the next `pnpm` command. Only changes to the Rust
source under `Source/Build/` require `cargo build -p Maintain`.

> [!IMPORTANT] Never run `cargo build -p Maintain` as part of a normal
> development loop. The shell scripts invoke the pre-built binary. Maintain is
> rebuilt only when its own Rust source is intentionally modified.

## GritQL queries

Maintain ships a set of GritQL pattern files for automated refactoring. GritQL
is a structural search-and-replace language for code that operates on ASTs
rather than text. Land uses these queries for:

- Bulk renames of TypeScript identifiers across all packages
- Migration of import paths when element structure changes
- Enforcement of naming conventions (PascalCase filenames, single default export)
- Updating generated code when templates change

GritQL queries are stored under `Element/Maintain/Query/` and can be run against
any element in the workspace.

## turbo.json task graph

The `turbo.json` at the workspace root defines:

- **`globalEnv`** - all PascalCase env vars (`BundleLevel`, `HotReload`,
  `Watch`, `TierIPC`, etc.) that Turborepo passes through to child tasks
- **Task dependencies** - which packages must build before others (e.g. Output
  must build before Sky)
- **Parallel execution** - tasks with no declared dependencies run concurrently
  across CPU cores
- **Cache keys** - inputs that, when changed, invalidate the Turborepo cache for
  a task

## pnpm workspace management

Maintain works within the pnpm workspace defined at `Land/package.json`. All
TypeScript packages use the `workspace:` protocol for cross-package
dependencies. Maintain's `Source/Build/JsonEdit.rs` handles non-lossy edits to
`package.json` files when version bumps are required - it uses the `json5` crate
to preserve comments and formatting that `JSON.parse` / `JSON.stringify` would
destroy.

## Rust CLI

The Maintain Rust binary provides subcommands for cases where shell scripts are
insufficient:

```bash
# Debug build of a specific element
Maintain debug --element Mountain

# Release build for a specific target triple
Maintain release --target aarch64-apple-darwin

# Override the Rhai build script
Maintain debug --script Custom/Build.rhai

# Verbose subprocess output
Maintain release --verbose
```

The CLI is built on `clap` and delegates to either the Rhai scripting engine or
direct build functions depending on the subcommand.

## Source files

| File                                   | Role                                                                         |
| :------------------------------------- | :--------------------------------------------------------------------------- |
| `Source/Library.rs`                    | Entry point, wires CLI, logging, and error handling                          |
| `Source/Build/CLI.rs`                  | `clap`-based CLI with `debug`, `release`, `profile`, `dev` subcommands       |
| `Source/Build/Fn.rs`                   | Core build function dispatch: clean, compile, link, post-process             |
| `Source/Build/Process.rs`              | Child process spawning with stdout/stderr capture and exit code handling     |
| `Source/Build/TomlEdit.rs`             | Non-lossy TOML editing for `Cargo.toml` version bumps and dependency changes |
| `Source/Build/JsonEdit.rs`             | JSON5-aware editing for `package.json` files                                 |
| `Source/Build/Rhai/ScriptRunner.rs`    | Rhai script execution with Land API bindings                                 |
| `Source/Build/Rhai/ConfigLoader.rs`    | Rhai build configuration script loading                                      |
| `Source/Build/GetTauriTargetTriple.rs` | Platform detection for SideCar binary selection                              |
