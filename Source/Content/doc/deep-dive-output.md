---
title: "Output - Deep Dive"
section: "Deep Dive"
order: 8
description:
    "Output transform pipeline internals, ESBuild and OXC compiler integration,
    console removal, require shims, and Cocoon's bootstrap load sequence for
    Output modules."
---

Output is the compiled VS Code platform artifact layer for Land. This page
covers the full transform pipeline, what each compiler pass produces, the
polyfill and shim injection strategy, console removal, require shims, and how
Cocoon's bootstrap sequence loads Output modules at runtime. For an overview,
see the [Output element page](https://editor.land/Doc/output).

## Transform Pipeline Architecture

`Source/Apply/Pipeline.ts` composes the 21 transform plugins into an ordered
execution chain. Each plugin receives the full file path and content, applies a
targeted rewrite, and passes the result to the next plugin. Plugins declare a
`Match` filter (a glob or regex) so each plugin only processes the specific
files it targets - unrelated files pass through unchanged.

The pipeline runs after esbuild (or the Rest/OXC pass) produces initial
JavaScript output. The plugins operate on already-compiled JavaScript, not on
TypeScript AST. This means they use string replacement and lightweight regex
rather than a full AST parser, which keeps the pipeline fast but requires
careful pattern matching.

### Primary ESBuild Pass

esbuild compiles the TypeScript source tree at `Dependency/Microsoft/VSCode/`
with these settings:

- `format: 'esm'` - VS Code's workbench uses ES module syntax throughout
- `platform: 'node'` - preserves `require()` calls that the transform plugins
  later shim for the WebView context
- `target: 'esnext'` - no syntax downleveling; Tauri's embedded WebView engines
  support modern JavaScript
- `bundle: false` - each file is compiled individually, preserving the module
  graph that Sky's Vite bundler walks
- `sourcemap: 'external'` when `NODE_ENV=development`

### Optional OXC Pass

When `Compiler=Rest`, the Rest plugin (`Source/ESBuild/Rest/Plugin.ts`)
intercepts each `.ts` file before esbuild processes it:

1. The plugin spawns the Rest binary as a subprocess, passing the file path and
   content via stdin.
2. Rest's OXC-based compiler transpiles TypeScript to JavaScript using
   `oxc_parser` + `oxc_transformer`, producing output and an optional source
   map.
3. The plugin feeds the OXC output back into esbuild's virtual module system so
   esbuild performs bundling and module resolution on the already-transpiled
   JavaScript.
4. If the Rest binary is unavailable or exits with a non-zero code, the plugin
   falls back to esbuild's built-in TypeScript handling so the build succeeds
   without the Rest binary installed.

The OXC pass is faster than esbuild's TypeScript handling for large files
because OXC's parser is written in Rust and processes files in parallel. The
`Target/Rest/` directory holds OXC's intermediate output for inspection.

### console.\* Removal

esbuild's `drop: ['console']` option removes all `console.log`, `console.warn`,
`console.error`, and related calls from the compiled output when
`NODE_ENV=production`. This is critical for the Cocoon element: Cocoon loads
Output modules inside a Node.js process where `console.*` calls would produce
spurious output on the terminal. The removal happens at the esbuild level, not
in a transform plugin, so it applies to all compiled files uniformly.

In development builds (`NODE_ENV=development`), console calls are preserved.
Cocoon substitutes its own `CocoonDevLog` wrapper for production-survivable
logging.

### require() Shims

VS Code's platform code contains `require()` calls in several patterns:

- `require('electron')` - Electron module imports that must become no-ops or
  Tauri equivalents
- `require('fs')`, `require('path')` - Node.js built-ins that must be shimmed
  for the WebView context
- `require('vscode')` - extension host module interception point

The `Polyfill/` directory contains shim implementations for each category:

| Polyfill            | Replaces                               | Provides                                              |
| ------------------- | -------------------------------------- | ----------------------------------------------------- |
| `Polyfill/IPC/`     | `require('electron').ipcRenderer`      | Tauri IPC bridge shim                                 |
| `Polyfill/File/`    | `require('fs')` calls in platform code | Mountain-backed file operations                       |
| `Polyfill/Process/` | `require('process')`                   | `ISandboxNodeProcess`-compatible object               |
| `Polyfill/Child/`   | `require('child_process')`             | No-op shim (child processes not available in WebView) |
| `Polyfill/Native/`  | Native Node.js add-on require calls    | No-op shims for add-ons that have Tauri equivalents   |

The `InjectWebViewPolyfills` transform plugin injects the appropriate polyfill
import at the top of each file that contains a matching `require()` pattern.

## What is in Output/

```
Output/
├── Source/
│   ├── ESBuild.ts              # esbuild entry point
│   ├── ESBuild/
│   │   ├── Output.ts           # esbuild programmatic config
│   │   ├── Microsoft/          # VSCode platform build targets
│   │   ├── CodeEditorLand/     # Land editor build targets
│   │   └── Rest/Plugin.ts      # OXC compiler esbuild plugin
│   ├── Apply/Pipeline.ts       # Transform plugin executor
│   ├── Plugin/
│   │   ├── Index.ts            # Plugin registry (21 plugins)
│   │   ├── Copy/               # Asset copy plugin
│   │   ├── Polyfill/           # Polyfill injection plugin
│   │   └── Transform/          # 21 AST-level transform plugins
│   ├── Polyfill/               # Shim implementations (IPC, File, Process, etc.)
│   └── Service/
│       ├── CEL/                # CEL service helpers and __CEL_SERVICES__ accessor
│       └── Tauri/              # Tauri IPC helper wrappers
├── Configuration/ESBuild/      # esbuild configuration profiles
└── Target/                     # Generated artifacts (committed)
    ├── Microsoft/VSCode/       # Transformed VS Code platform code
    └── CodeEditorLand/         # Land editor customizations
```

## Cocoon Bootstrap Load Sequence for Output Modules

Cocoon is a Node.js process that hosts VS Code extensions. It loads Output
modules at startup to access the VS Code platform code needed for the extension
host. The bootstrap sequence in `Cocoon/Source/Effect/Bootstrap.ts`:

**Stage 1 - Process hardening.** Signal handlers (`SIGTERM`, `SIGINT`), parent
process monitor, and top-level error boundary are installed before any Output
modules are imported.

**Stage 2 - RPCServer.** The gRPC server binds port 50052 first. This is
critical: Mountain attempts to connect to Cocoon's gRPC port within a 30-second
budget. RPCServer must be listening before Mountain's connection attempt fires.

> [!WARNING] The previous bootstrap order ran `MountainConnection` (Stage 3, up
> to 45s timeout) before `RPCServer` (Stage 5). Mountain gave up after 20
> seconds because Cocoon's gRPC port was never bound. The reordering (RPCServer
> first) is the fix. Do not revert this order.

**Stage 3 - MountainConnection.** After RPCServer is bound, Cocoon connects to
Mountain's IPC endpoint. Retry budget: 3 probe attempts, 5 total attempts (down
from 10/15 after the stage reorder, since the port is already ready).

**Stage 4 - Output module imports.** With IPC established, Cocoon imports the VS
Code platform modules from Output's `Target/`:

```
require('@codeeditorland/output/Target/Microsoft/VSCode/vs/workbench/...')
require('@codeeditorland/output/Target/Microsoft/VSCode/vs/platform/...')
```

These imports resolve against the committed `Target/` artifacts. If Output is
stale (artifacts not rebuilt after a plugin change), these imports may succeed
but produce incorrect runtime behavior.

**Stage 5 - Extension host services.** The extension host service layer
(`Services/Extension/Host/Service.ts`) initializes using the platform code
loaded in Stage 4.

**Stage 6 - Extension scanning.** `ExtensionsGetInstalled` loads the pre-baked
extension manifest from `extensions.manifest.json` (written by
`Maintain/Build/Manifest/PreBake.ts` during `beforeBundleCommand`). Cache hit
produces the installed extension list in under 50ms. Cache miss falls back to
live filesystem scanning (~1200ms).

## OXC TypeScript Compiler Integration

The OXC stack used by the Rest compiler:

| OXC component     | Role in Output pipeline                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------- |
| `oxc_parser`      | Parses TypeScript source into an ESTree-compatible AST                                    |
| `oxc_transformer` | Strips TypeScript type annotations, transforms JSX, transpiles modern ECMAScript features |
| `oxc_codegen`     | Emits JavaScript from the transformed AST                                                 |
| `oxc_semantic`    | Builds symbol tables used by the transformer for accurate identifier resolution           |
| `oxc_minifier`    | Optional minification pass (not enabled in Output's default config)                       |

The Rest plugin passes `--target esnext` to OXC so no syntax downleveling
occurs. OXC's output is semantically equivalent to esbuild's TypeScript
transpilation but produced faster on large files due to OXC's parallel Rust
implementation.

Source maps from OXC are in the standard V8/Chrome format. When
`NODE_ENV=development`, the plugin merges OXC source maps with esbuild's output
source maps so the final `.js.map` file traces back to the original TypeScript
source.

## Platform Code Markers

Some VS Code platform files contain comment markers that transform plugins use
as injection points:

```javascript
// [LAND:inject-polyfills]
// [LAND:replace-ipc]
// [LAND:expose-workbench]
```

These markers are written by the upstream VS Code source patches maintained in
`Dependency/Microsoft/` and are not present in Microsoft's official VS Code
repository. When updating the VS Code dependency version, verify that the marker
positions are still correct relative to the surrounding code before committing
the new `Target/` artifacts.

## Related Documentation

- [Output overview](https://editor.land/Doc/output)
- [Rest compiler](https://editor.land/Doc/deep-dive-rest)
- [Sky UI layer](https://editor.land/Doc/deep-dive-sky)
- [Wind service layer](https://editor.land/Doc/deep-dive-wind)
- [Cocoon extension host](https://editor.land/Doc/deep-dive-cocoon)
