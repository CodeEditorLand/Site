---
title: "Output"
section: "Elements"
order: 8
description:
    "The compiled VS Code platform artifact package produced by the dual-compiler
    (esbuild primary, Rest OXC optional) build pipeline and consumed by Sky,
    Wind, and Cocoon at runtime, with a PreBake manifest step that runs from
    Tauri's beforeBundleCommand."
---

Output is the compiled JavaScript artifact layer for the Land editor. It takes
the upstream VS Code TypeScript source tree, compiles it through esbuild (with
an optional OXC-based Rest compiler pass), applies a pipeline of transform
plugins that adapt the result for Land's native Tauri stack, and publishes the
result as the `@codeeditorland/output` npm package. Sky loads workbench bundles
from this package, Cocoon bootstraps its extension host from the platform code
here, and Wind consumes output utilities through the same package.

## What Output Contains

After a successful build, `Target/` holds:

| Path                       | Contents                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `Target/Microsoft/VSCode/` | Compiled and transformed VS Code platform code - workbench, Monaco editor, extension host, worker bootstraps |
| `Target/CodeEditorLand/`   | Land-specific editor customizations compiled on top of the VS Code tree                                      |
| `Target/Rest/`             | Intermediate output from the Rest/OXC compiler pass (present only when `Compiler=Rest`)                      |

The VS Code platform code in `Target/Microsoft/VSCode/` is not vanilla VS Code
output. Every file has passed through Output's transform plugin pipeline, which
replaces Electron IPC with Mountain's gRPC channel, injects WebView polyfills,
rewrites worker URLs, and patches service registrations so the workbench
operates inside WKWebView or WebView2 without Electron.

## Why Output is Checked into the Repository

The compiled artifacts in `Target/` are committed to the repository as a binary
artifact layer. This is intentional for two reasons:

1. Rebuilding the VS Code platform source from scratch requires the full VS Code
   source tree, the esbuild/Rest toolchain, and significant CPU time. Consumers
   (Sky, Cocoon) can depend on a stable, pre-built artifact without reproducing
   the entire build environment.
2. Tauri's `beforeBundleCommand` and Sky's `astro:build:done` hook both need the
   transformed artifact tree to exist before they run. Committing the artifacts
   removes this ordering constraint from local development builds.

Never edit files under `Target/` directly. The target directory is generated
output and will be overwritten the next time the Output build runs.

## PreBake Manifest Step

`Maintain/Build/Manifest/PreBake.ts` runs from Tauri's `beforeBundleCommand`
in `tauri.conf.json`. It walks the extension roots before the Tauri bundle
assembles and writes an `extensions.manifest.json` file that Mountain reads at
startup.

Without this step, Mountain performs a live filesystem scan on every boot to
locate installed extensions, which takes approximately 1200 ms. With the
pre-baked manifest, `LoadFromCache.rs` reads the file in under 50 ms and falls
back to the live scan only if the cache file is absent or stale.

The step runs from `beforeBundleCommand` rather than from `Maintain/Debug/Build.sh`
so it fires in all build paths: direct `pnpm tauri build`, CI, and wrapper
scripts alike.

## When Output is Stale

Output becomes stale when the VS Code dependency version is updated, when a
transform plugin is added or modified, or when the compiler configuration
changes. Signs of a stale Output:

- Sky's Vite build fails with module resolution errors referencing files in
  `Target/Microsoft/VSCode/`.
- Cocoon fails to bootstrap with import errors for VS Code platform modules.
- The workbench loads but missing features or broken IPC indicate a plugin
  transform was not applied.

To rebuild Output:

```bash
cd Land/Element/Output
pnpm run prepublishOnly
```

To rebuild with the Rest/OXC compiler:

```bash
cd Land/Element/Output
Compiler=Rest pnpm run prepublishOnly
```

After rebuilding, commit the updated `Target/` contents.

## Dual-Compiler Pipeline

### Default: esbuild only

```
Dependency/Microsoft/VSCode/ → esbuild → Apply transform plugins → Target/Microsoft/VSCode/
```

### Optional: Rest (OXC) hybrid

Activated via `Compiler=Rest`:

```
Dependency/Microsoft/VSCode/ → Rest (OXC) → Target/Rest/ → esbuild (merge) → Apply transform plugins → Target/Microsoft/VSCode/
```

The Rest plugin (`Source/ESBuild/Rest/Plugin.ts`) intercepts `.ts` file
processing inside esbuild, invokes the Rest binary as a subprocess, and merges
the OXC-compiled output back into the esbuild bundle stream. The OXC pass is
2-3 times faster than esbuild's TypeScript handling and provides better
decorator and class field support. If the Rest binary is unavailable or produces
an error, the plugin falls back to esbuild's own TypeScript handling so builds
remain reproducible without the Rest binary installed.

## Transform Plugin Overview

`Source/Apply/Pipeline.ts` runs the active transform plugins against the
compiled VS Code tree. Key plugins:

| Plugin                      | Effect                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `ReplaceElectronIPCService` | Replaces `mainProcessService.js` with `TauriMainProcessService.js`, routing all VS Code IPC through Mountain |
| `InjectWebViewPolyfills`    | Injects polyfills for WKWebView/WebView2 gaps (APIs that Chromium provides natively in Electron)             |
| `RewriteWorkerURLs`         | Rewrites `new URL(...)` worker constructor paths to WebView-compatible absolute URLs                         |
| `RewriteWorkbenchBaseURL`   | Rewrites the workbench static base URL to Land's serving path                                                |
| `ExposeWorkbenchAccessor`   | Exposes the workbench instance accessor as `window.__CEL_SERVICES__` for SkyBridge                           |
| `ReplaceSearchService`      | Replaces VS Code's Electron search service with Mountain's ripgrep-based implementation                      |
| `PatchLocalTerminalBackend` | Patches the local terminal backend to route through Mountain's PTY layer                                     |
| `ExtensionScannerIPC`       | Patches extension scanner IPC to route through Mountain                                                      |
| `StripDanglingSourceMap`    | Removes `//# sourceMappingURL` references pointing to files absent from the output tree                      |
| `DisableUnusedServices`     | Disables Electron-specific services that have no WebView equivalent                                          |

The full plugin list is defined in `Source/Plugin/Index.ts`.

## TauriMainProcessService Lockstep Copy

`Source/Service/Tauri/Main/Process/Service.ts` is a lockstep copy of Wind's
`TauriMainProcessService.ts`. Output is loaded by Cocoon's bootstrap in a module
context that cannot import from Wind's npm package, so the file is duplicated.
Any routing change (TierIPC logic, per-subsystem tier defaults) applied to Wind's
copy must be applied to Output's copy in the same commit.

## Dual-Consumer Architecture

Output's `Target/Microsoft/VSCode/` tree is consumed by Sky in two distinct
ways, and the pipeline is designed to satisfy both simultaneously:

**Sky static copy.** Files are copied to Sky's `/Static/Application/` directory
and served by Mountain's HTTP layer to the webview at runtime. This path uses
dynamic imports and the Worker element's CSS loading protocol.

**Sky Vite bundler walk.** Vite follows the module graph from Output's Target
before `astro:build:done` fires. This path requires static imports so Rollup can
emit hashed chunks. CSS is extracted by Vite's native pipeline.

Plugins that convert static imports to dynamic forms (`StaticToDynamicImport`,
`StripCSSImport`) run only in Sky's `astro:build:done` hook for the static path,
not in Output's pipeline. The two output trees diverge here by design.

## Build Configuration

| Variable           | Default            | Description                                    |
| ------------------ | ------------------ | ---------------------------------------------- |
| `Compiler`         | `esbuild`          | Set to `Rest` to enable OXC compiler pass      |
| `REST_BINARY_PATH` | auto-detect        | Override Rest binary location                  |
| `REST_VERBOSE`     | `false`            | Enable verbose Rest compiler logging           |
| `REST_OPTIONS`     | empty              | Additional flags passed to the Rest binary     |
| `NODE_ENV`         | `production`       | `development` enables source map generation    |
| `Dependency`       | `Microsoft/VSCode` | Source dependency to process                   |

## Module Map

| Path                             | Purpose                                             |
| -------------------------------- | --------------------------------------------------- |
| `Source/ESBuild/Output.ts`       | Primary esbuild compilation pipeline                |
| `Source/ESBuild/Rest/`           | Rest OXC compiler plugin integration                |
| `Source/ESBuild/Microsoft/`      | VS Code source-specific compilation configuration   |
| `Source/ESBuild/CodeEditorLand/` | Land-specific compilation configuration             |
| `Source/Plugin/Apply.ts`         | esbuild plugin for applying transforms              |
| `Source/Plugin/Copy/`            | Asset copying plugin                                |
| `Source/Plugin/Transform/`       | Code transform plugins                              |
| `Source/Plugin/Polyfill/`        | Polyfill injection plugins                          |
| `Source/Plugin/Index.ts`         | Plugin registry                                     |
| `Source/Polyfill/Child/`         | Child process polyfills                             |
| `Source/Polyfill/File/`          | File system polyfills                               |
| `Source/Polyfill/IPC/`           | IPC polyfills                                       |
| `Source/Polyfill/Native/`        | Native module polyfills                             |
| `Source/Polyfill/Process/`       | Process polyfills                                   |
| `Source/Polyfill/Shared/`        | Shared polyfill utilities                           |
| `Source/Service/CEL/`            | Code Editor Land specific services                  |
| `Source/Service/Dev/`            | Development-time services                           |
| `Source/Service/Tauri/`          | Tauri-specific services (TauriMainProcessService)   |
| `Source/Apply/Pipeline.ts`       | Apply pipeline orchestration                        |

## Related Documentation

- [Sky UI layer](https://Editor.Land/Doc/sky)
- [Wind service layer](https://Editor.Land/Doc/wind)
- [Rest compiler](https://Editor.Land/Doc/rest)
- [Mountain Rust backend](https://Editor.Land/Doc/mountain)
- [Source Code](https://github.com/CodeEditorLand/Output/tree/Current)
