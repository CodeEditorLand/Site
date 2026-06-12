---
title: Maintain - Deep Dive
section: Deep Dive
order: 5
description:
    Debug/Build.sh step-by-step, SignBundle.sh codesign flow, turbo.json
    pipeline, beforeBundleCommand hook for PreBake.ts, GritQL patterns, and
    CI/CD matrix across platforms and profiles.
---

Maintain is the build orchestrator for Land. This page covers the internals of
each build script, the turbo.json pipeline, the Cargo build configuration, and
the automated refactoring tools.

## 🚀 Debug/Build.sh step-by-step

`Element/Maintain/Debug/Build.sh` is the primary command for a local debug
build. Its execution sequence:

1. **Environment setup** - exports all required PascalCase env vars with
   debug-appropriate values:

    ```bash
    export BundleLevel=debug
    export HotReload=false
    export Watch=false
    export TierIPC=Mountain
    ```

2. **TypeScript build** - invokes `pnpm run prepublishOnly` inside the workspace
   root, which runs the Turborepo task graph and compiles all TypeScript
   packages (Wind, Sky, Cocoon, Output) in dependency order.

3. **Tauri build** - runs `pnpm tauri build --profile debug-electron` (or
   `debug-electron-bundled` for the bundled variant). This invokes the Tauri
   CLI, which:
    - Runs `beforeBundleCommand` hooks (see PreBake.ts below)
    - Compiles Mountain with `cargo build --profile debug-electron`
    - Bundles frontend assets into the `.app`

4. **Re-sign** - calls `BundleLevel=debug sh Maintain/Script/SignBundle.sh` to
   apply an ad-hoc codesign over the freshly built bundle.

5. **Optional copy** - if `CopyToDesktop` is set, copies the signed `.app` to
   `~/Desktop`.

```bash
# Minimal invocation
sh Maintain/Debug/Build.sh --profile debug-electron
```

## 🔐 SignBundle.sh - xattr and codesign

`Maintain/Script/SignBundle.sh` performs the two-step re-sign that Tauri
requires on macOS:

```bash
# 1. Strip quarantine and extended attributes that break codesign
xattr -cr "$APP_PATH"

# 2. Ad-hoc sign with entitlements
codesign --force --deep --sign - \
	--entitlements Element/Mountain/Entitlements.plist \
	"$APP_PATH"
```

The `BundleLevel` environment variable controls which set of entitlements and
signing identity is used:

| `BundleLevel` | Signing identity         | Notes                                                 |
| :------------ | :----------------------- | :---------------------------------------------------- |
| `debug`       | `-` (ad-hoc)             | No Developer ID required; works without Apple account |
| `release`     | Developer ID Application | Requires valid Apple certificate in keychain          |

The `xattr -cr` step is required because Tauri's build process sometimes leaves
extended attributes (particularly `com.apple.quarantine`) on embedded
frameworks. These attributes cause `codesign --verify` to fail even when the
signature itself is valid.

`SignBundle.sh` is intentionally placed in `Maintain/Script/` rather than
`Maintain/Debug/` or `Maintain/Release/` because it is called from both build
paths. The `BundleLevel` variable is the only difference between the two
invocations.

## 🚀 Release/Build.sh

`Release/Build.sh` follows the same sequence as `Debug/Build.sh` with two
differences:

- `BundleLevel=release` - activates full LTO (`lto = "fat"`,
  `codegen-units = 1`, `strip = true`) and the Developer ID signing identity
- `--profile release` - passed to `pnpm tauri build`, which selects the
  optimized Cargo profile

Release builds take significantly longer due to fat LTO across all crates in the
Mountain binary. They are not used in normal development loops.

## 🗺️ turbo.json pipeline

The `turbo.json` at the workspace root defines the Turborepo task graph for all
TypeScript packages:

```json
{
	"globalEnv": [
		"BundleLevel",
		"HotReload",
		"Watch",
		"LiveReloadPort",
		"TierIPC",
		"MountainDir",
		"Compiler",
		"NodeVersion"
	],
	"tasks": {
		"prepublishOnly": {
			"dependsOn": ["^prepublishOnly"],
			"outputs": ["Target/**"]
		},
		"Run": {
			"dependsOn": ["^prepublishOnly"],
			"cache": false,
			"persistent": true
		}
	}
}
```

Key design decisions:

- **`globalEnv`** lists every PascalCase env var that affects build output.
  Turborepo includes these in the cache key, so changing `BundleLevel` from
  `debug` to `release` invalidates the cache for all downstream packages.
- **`^prepublishOnly`** means a package's build depends on all of its
  `package.json` `dependencies` having completed their own `prepublishOnly`
  first. This enforces correct ordering: Output builds before Cocoon, Wind
  builds before Sky.
- **`cache: false`** on `Run` prevents Turborepo from caching the dev server
  output.

## 🚀 beforeBundleCommand hook - PreBake.ts

`tauri.conf.json` registers a `beforeBundleCommand` hook:

```json
{
	"build": {
		"beforeBundleCommand": "node Maintain/Build/Manifest/PreBake.ts"
	}
}
```

`PreBake.ts` runs in every build path - direct `pnpm tauri build`, `Build.sh`,
and CI - because it is wired into `tauri.conf.json` rather than into the shell
scripts. Its job:

1. Walks all extension root directories in the workspace.
2. Reads each extension's `package.json` manifest.
3. Writes a consolidated `extensions.manifest.json` into the Mountain build
   directory.
4. Mountain's `ScanAndPopulateExtensions.rs` loads this file at startup instead
   of performing a live filesystem scan, reducing extension discovery time from
   ~1 200 ms to under 50 ms.

> [!IMPORTANT] PreBake.ts must run before Mountain is compiled because
> `LoadFromCache.rs` reads the manifest path as a compile-time string literal.
> Placing this step in `beforeBundleCommand` guarantees ordering without
> requiring developers to run a separate setup command.

## 📋 GritQL query patterns

Maintain ships GritQL pattern files under `Element/Maintain/Query/`. GritQL
operates on ASTs rather than text, making it safe for large-scale structural
transformations. Patterns used in the Land codebase:

**Import depth correction** - fixes generated files where `../../Codegen/`
should be `../../../Codegen/`:

```grit
`import $x from "../../Codegen/$path"` => `import $x from "../../../Codegen/$path"`
```

**PascalCase filename enforcement** - identifies files whose default export name
does not match their filename:

```grit
`export default $name` where { $name matches /^[a-z]/ }
```

**Console.\* removal** - strips console calls from production Cocoon source
(complementing OXC's `drop: ["console"]` for Sky):

```grit
`console.$method($args)` => ``
```

GritQL queries run with `grit apply <pattern> <path>` and are idempotent -
applying the same pattern twice produces the same result.

## 🚀 CI/CD matrix

The CI pipeline builds across platforms and profiles:

| Platform         | Profile          | Signing           | Artifact            |
| :--------------- | :--------------- | :---------------- | :------------------ |
| macOS (aarch64)  | `debug-electron` | Ad-hoc            | `.app` for testing  |
| macOS (aarch64)  | `release`        | Developer ID      | Notarized `.dmg`    |
| macOS (x86_64)   | `release`        | Developer ID      | Notarized `.dmg`    |
| Windows (x86_64) | `release`        | Code signing cert | `.msi`              |
| Linux (x86_64)   | `release`        | None              | `.deb`, `.AppImage` |

Each CI job:

1. Checks out the repository with submodules.
2. Runs the SideCar download tool to populate the binary cache for the target
   triple.
3. Runs `pnpm install` to restore the pnpm content-addressed store.
4. Runs `pnpm run prepublishOnly` to build all TypeScript packages.
5. Runs the appropriate `Build.sh` script for the platform.
6. Uploads the signed artifact.

## 🔌 Rhai scripting engine

The Maintain Rust binary embeds the Rhai scripting engine for build logic that
is too complex for shell scripts but does not warrant a compiled Rust function.
Rhai scripts have access to:

- `env(name)` - read environment variable with optional default
- `run(cmd, args)` - spawn a subprocess and return exit code
- `read_toml(path)` / `write_toml(path, value)` - non-lossy TOML manipulation
- `read_json5(path)` / `write_json5(path, value)` - JSON5 manipulation

Scripts are sandboxed: they cannot access the file system directly except
through the provided API functions. This prevents build scripts from
accidentally modifying source files outside their declared scope.

## 🗺️ Module reference

| File                                       | Purpose                                                        |
| :----------------------------------------- | :------------------------------------------------------------- |
| `Source/Library.rs`                        | Entry point, logging initialization, error propagation         |
| `Source/Build/CLI.rs`                      | `clap` CLI: `debug`, `release`, `profile`, `dev` subcommands   |
| `Source/Build/Definition.rs`               | Build group definitions: element ordering for each build mode  |
| `Source/Build/Fn.rs`                       | Build function dispatch: invokes Process, TomlEdit, JsonEdit   |
| `Source/Build/Process.rs`                  | Subprocess spawning, stdout/stderr capture, exit code handling |
| `Source/Build/TomlEdit.rs`                 | Non-lossy `Cargo.toml` editing via `toml_edit`                 |
| `Source/Build/JsonEdit.rs`                 | JSON5-aware `package.json` editing                             |
| `Source/Build/Pascalize.rs`                | PascalCase ↔ words conversion for naming convention checks     |
| `Source/Build/GetTauriTargetTriple.rs`     | Reads `CARGO_BUILD_TARGET` for SideCar binary selection        |
| `Source/Build/EnvironmentResolver.rs`      | Resolves PascalCase env vars with typed fallbacks              |
| `Source/Build/Rhai/ConfigLoader.rs`        | Loads `.rhai` build configuration files                        |
| `Source/Build/Rhai/ScriptRunner.rs`        | Executes Rhai scripts with Land API bindings                   |
| `Source/Build/Rhai/EnvironmentResolver.rs` | Exposes `env()` to Rhai scripts                                |

## 📖  Related Documentation

- [Maintain element overview](https://Editor.Land/Doc/maintain)
- [Mountain deep dive](https://Editor.Land/Doc/deep-dive-mountain)
- [Architecture overview](https://Editor.Land/Doc/architecture)
