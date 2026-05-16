---
title: "Maintain - Deep Dive"
section: "Deep Dive"
order: 44
description:
    "Build system, Rhai scripting engine, and type-safe configuration editing"
---

# Maintain - Deep Dive

Maintain is the build system and CI/CD toolkit for the Land project. It
orchestrates builds across all elements, embeds a Rhai scripting engine for
flexible automation, and performs type-safe TOML/JSON5 configuration editing.

## Architecture 🚀

Maintain is a Rust binary and library. The CLI layer delegates to the Rhai
engine or direct build functions. Configuration editing uses `toml_edit` and
`json5` for structured, non-lossy modifications.

### Modules

|| Path | ||
---------------------------------------------------------------------------------------
| | `Source/Library.rs` - Entry point, wires CLI, logging, error handling | |
`Source/Build/CLI.rs` - `clap`-based CLI: debug, release, profile, dev | |
`Source/Build/Definition.rs` - Build group definitions with ordering | |
`Source/Build/Fn.rs` - Core build function dispatch: clean, compile, link,
post-process | | `Source/Build/Process.rs` - Child process spawning with
stdout/stderr capture | | `Source/Build/TomlEdit.rs` - Non-lossy TOML editing
for Cargo.toml | | `Source/Build/JsonEdit.rs` - JSON5-aware editing for
package.json | | `Source/Build/Pascalize.rs` - PascalCase naming utilities | |
`Source/Build/GetTauriTargetTriple.rs` - Platform detection | |
`Source/Build/EnvironmentResolver.rs` - Environment variable resolution | |
`Source/Build/Rhai/ConfigLoader.rs` - Rhai build script loading | |
`Source/Build/Rhai/ScriptRunner.rs` - Script execution with Land API |

## Data Flow 🔄

Developer runs a shell script (e.g. `Release.sh`) which calls Maintain CLI. The
CLI:

1. Loads the Rhai build configuration script
2. Reads current Cargo.toml/package.json versions
3. Iterates build group elements, spawning `cargo build` subprocesses
4. Updates Cargo.toml if version bump needed
5. Reports build summary with timing

## Build Script Entry Points 📜

|| Script | Purpose | || ----------------- | -----------------------------------
| | `Debug.sh` | Full debug build of all elements | | `Dev-Mountain.sh` |
Hot-reload development mode | | `Release.sh` | Optimized release build | |
`Profile.sh` | Release build with profiling | | `Debug/All.sh` | Debug all
including frontend | | `Debug/Wind.sh` | Debug Wind TypeScript services only |

## Integration Points 🔗

Maintain builds all Rust elements (Mountain, Air, Echo, Rest, SideCar) as
subprocess targets, and triggers TypeScript builds (Output, Wind, Sky) via
pnpm/Turborepo.

## Configuration ⚙️

|| CLI Flag | Description | || ------------------- |
---------------------------------------- | | `debug` / `release` | Build mode
and optimization level | | `--target` | Rust target triple for cross-compilation
| | `--element` | Build specific element only | | `--script` | Override default
Rhai build script | | `--verbose` | Detailed subprocess logging |

## Related Documentation 📖

- [Architecture overview](https://Editor.Land/Doc/architecture)
- [Maintain GitHub repository](https://github.com/CodeEditorLand/Maintain)
