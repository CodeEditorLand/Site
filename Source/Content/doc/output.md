---
title: "Output"
section: "Element"
order: 22
description:
    "The VS Code build transformation pipeline that adapts VS Code's compiled
    output for Editor.Land's native stack."
---

# Output

Output is the VS Code build transformation pipeline for Editor.Land. It takes
the upstream VS Code compiled tree (populated into `Target/Microsoft/VSCode/` by
the build step) and applies a set of TypeScript transform plugins that adapt it
for Land's native stack - replacing Electron IPC with the Mountain gRPC channel,
injecting WebView polyfills, rewriting worker URLs, and patching service
registrations.

Output is a TypeScript/Node.js package. Its source is in the
[Output repository](https://github.com/CodeEditorLand/Output).

---

## Why a Transformation Pipeline

VS Code's compiled output is written for Electron: it expects `ipcRenderer`,
shared process communication, Electron-specific node integration, and a browser
environment supplied by Chromium. Editor.Land replaces all of that with
Mountain's Rust kernel, WebView2 (Windows) or WKWebView (macOS), and the Vine
gRPC protocol.

Rather than maintaining a permanent fork of VS Code's TypeScript source, Output
applies targeted transforms to the compiled output. The upstream source remains
untouched; the adaptation is fully described by the plugin list and can be
updated as VS Code evolves.

---

## The Transform Plugins

Output's `ApplyPipeline.ts` runs 21 active transform plugins against the VS Code
compiled tree. Each plugin has a `Match` filter and rewrites only the specific
files it targets:

| Plugin                         | What it does                                                                                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ReplaceElectronIPCService`    | Replaces `vs/platform/ipc/electron-browser/mainProcessService.js` with `TauriMainProcessService.js`, routing all VS Code IPC through Mountain's gRPC channel |
| `InjectWebViewPolyfills`       | Injects polyfills required by WKWebView / WebView2 that Chromium provides natively in Electron                                                               |
| `InjectNameShim`               | Injects the `name` global shim expected by the VS Code workbench bootstrap                                                                                   |
| `InjectWorkerBootstrapShim`    | Injects the worker bootstrap shim for the WebView worker environment                                                                                         |
| `RewriteNestedWorkerBootstrap` | Rewrites nested worker bootstrap paths for the WebView runtime                                                                                               |
| `RewritePerfBaselineWorker`    | Rewrites the performance baseline worker URL for the WebView context                                                                                         |
| `RewriteNodeModulesPath`       | Rewrites `node_modules` path references to the correct resolved location                                                                                     |
| `RewriteWorkerURLs`            | Rewrites worker `new URL(...)` constructor paths to WebView-compatible URLs                                                                                  |
| `RewriteWorkbenchBaseURL`      | Rewrites the workbench static base URL to match Land's serving path                                                                                          |
| `RewriteStaticBlockSelfRef`    | Rewrites static block self-references that do not survive the WebView load context                                                                           |
| `HoistFunctionDeclarations`    | Hoists function declarations that VS Code relies on being in scope before module evaluation                                                                  |
| `ReplaceSharedProcess`         | Replaces the Electron shared process channel with the Mountain equivalent                                                                                    |
| `ExtensionScannerIPC`          | Patches extension scanner IPC to route through Mountain                                                                                                      |
| `StripDanglingSourceMap`       | Removes dangling `//# sourceMappingURL` references that point to files not present in the output tree                                                        |
| `CatchOutputFolderRejection`   | Catches unhandled promise rejections from output folder operations                                                                                           |
| `StripWebviewIframeSandbox`    | Removes Electron-specific `sandbox` attributes from WebView iframes                                                                                          |
| `ExposeWorkbenchAccessor`      | Exposes the workbench instance accessor for Mountain's integration surface                                                                                   |
| `InstrumentVscodeGit`          | Instruments the VS Code Git extension to use Mountain's file system layer                                                                                    |
| `DisableUnusedServices`        | Disables Electron-specific services that have no equivalent in the WebView stack                                                                             |
| `ReplaceSearchService`         | Replaces VS Code's Electron search service with Mountain's ripgrep-based implementation                                                                      |
| `PatchLocalTerminalBackend`    | Patches the local terminal backend to route through Mountain's pty layer                                                                                     |

---

## Dual-Consumer Architecture

Output's transformed `Target/Microsoft/VSCode/` tree is consumed by Sky in two
different ways:

- **Sky's `/Static/Application/` copy** - static files served directly by
  Mountain's HTTP layer to the WebView at runtime. These files use dynamic
  imports and runtime CSS loading.
- **Sky's Vite bundler walk** - Vite follows the module graph from Output's
  Target before `astro:build:done` fires. This path requires static imports so
  Rollup can emit hashed chunks; CSS is extracted by Vite's native pipeline.

Because Vite walks Output's Target before Sky's build hooks run, Output must
ship a pre-transformed tree. Transform plugins that convert static imports to
dynamic forms (`StaticToDynamicImport`, `StripCSSImport`) are intentionally
excluded from Output's pipeline and run only in Sky's `astro:build:done` hook
for the static path. The two output trees diverge here by design.

---

## Source Structure

| Path                      | Role                                                              |
| ------------------------- | ----------------------------------------------------------------- |
| `Source/ApplyPipeline.ts` | Pipeline runner - composes and executes the transform plugin list |
| `Source/ESBuild.ts`       | esbuild integration                                               |
| `Source/ESBuild/`         | esbuild configuration sub-modules                                 |
| `Source/Plugin/`          | Transform plugin definitions (one file per plugin)                |
| `Source/Polyfill/`        | WebView polyfill sources                                          |
| `Source/Service/`         | Service-layer utilities                                           |
| `Source/tsconfig/`        | TypeScript configuration variants                                 |

---

## Key Technologies

TypeScript, Node.js, esbuild, Plugin-Routed AST Transforms, WebView Polyfills,
Tauri/Mountain IPC Replacement.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Rest](/Doc/rest)
- [Mountain: Native Kernel](/Doc/mountain)
- [Sky: WebView UI](/Doc/sky)
- [Source Code](https://github.com/CodeEditorLand/Output)
