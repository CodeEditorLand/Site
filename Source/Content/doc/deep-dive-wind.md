---
title: "Wind - Deep Dive"
section: "Deep Dive"
order: 13
description:
    "TauriLiveLayer construction, TauriMainProcessService routing tiers,
    Preload.ts global shimming, Generated Upstream import depth, and the Wind
    Codegen pipeline."
---

Wind is the Effect-TS frontend service layer for Land. This page covers the
internal mechanics of `TauriLiveLayer` construction, `TauriMainProcessService`
tier routing, `Preload.ts` shimming strategy, the `Generated/*Upstream.ts`
codegen pipeline, and how Wind maintains lockstep state with Output's service
copy. For an overview, see the
[Wind element page](https://Editor.Land/Doc/wind).

## TauriLiveLayer Construction and Service Dependency Graph

`TauriLiveLayer` is assembled in `Source/Effect/Layers/Tauri.ts` using
`Layer.mergeAll()`. Effect-TS resolves dependencies at layer construction time,
so all required Tags must have a provider in the merged set. The construction
order follows a dependency graph:

```
Sandbox (no deps)
  └── IPC (requires Sandbox)
        └── Mountain (requires IPC)
              ├── MountainSync (requires Mountain)
              ├── Configuration (requires Mountain)
              ├── Files (requires Mountain + Configuration)
              │     └── WorkingCopy (requires Files)
              │           └── TextFile (requires Files + WorkingCopy)
              ├── Terminal (requires Mountain)
              ├── Storage (requires Mountain)
              └── Extensions (requires Mountain + Storage)

Environment (no deps)
Telemetry (requires IPC)
Health (requires Mountain + IPC)
Bootstrap (requires all core services)

Editor (requires Mountain + Configuration)
Model (requires Editor)
TextModelResolver (requires Model)
Decorations (requires Editor)

ActivityBar, Sidebar, StatusBar, Panel (require Mountain)
Notification, Progress, QuickInput (require Mountain)
Commands (requires Mountain)
Clipboard (requires Mountain)
Search (requires Mountain)
Language, Themes, Keybinding (require Mountain + Configuration)
Vine (requires Mountain)
```

`Layer.mergeAll()` takes the flat list of Layer values and Effect-TS
automatically threads the required Tags through the dependency graph. If a Tag
is missing from the merged set, the build fails at compile time with a typed
error naming the unsatisfied requirement - there are no runtime "service not
found" failures.

## TauriMainProcessService Routing

`Source/Service/TauriMainProcessService.ts` implements the VS Code
`IMainProcessService` interface. Every workbench IPC call arrives here as a
`{ channel, args }` pair and is dispatched based on the `TierIPC` environment
variable.

### Mountain Tier (default)

All calls invoke `@tauri-apps/api`'s `invoke()` directly:

```typescript
invoke("MountainIPCInvoke", { method: channel, args });
```

Mountain's `WindServiceHandlers/mod.rs` receives the call, pattern-matches on
`channel`, and dispatches to the appropriate atomic handler file.

### NodeDeferred Tier

Mountain is tried first. If Mountain returns `undefined` or throws a "command
not found" error, the call is forwarded to Cocoon via the `cocoon:request` Tauri
event bridge:

```typescript
const result = await invoke("MountainIPCInvoke", { method: channel, args });
if (result === undefined) {
	return emit("cocoon:request", { channel, args });
}
return result;
```

This tier allows gradual migration: Mountain handlers that are not yet
implemented fall through to Cocoon's Node.js implementations without any
call-site changes.

### Node Tier

All calls bypass Mountain entirely and go directly to Cocoon:

```typescript
emit("cocoon:request", { channel, args });
```

Used when developing Cocoon-side handlers in isolation before the Mountain
counterpart is ready.

### Output Lockstep Copy

`Output/Source/Service/Tauri/Main/Process/Service.ts` is an exact copy of Wind's
`TauriMainProcessService.ts`. Output is loaded by Cocoon's bootstrap in a module
context that cannot import from Wind's npm package, so the file is duplicated.
Any routing change applied to Wind must be applied to Output in the same commit.
The lockstep requirement is enforced by code review convention, not a build
check.

## Preload.ts Global Shimming Strategy

`Source/Preload.ts` executes synchronously in the Tauri webview before any
module from `@codeeditorland/output` is parsed. It patches the globals that VS
Code's workbench bundle accesses at module evaluation time.

### What Gets Patched and Why

| Global                             | Patched value                                                                | Why required                                                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `window.vscode.ipcRenderer`        | Object with `send`, `invoke`, `on`, `once` backed by Tauri `invoke`/`listen` | VS Code workbench calls `ipcRenderer.invoke("vscode:mainProcessService", ...)` at bootstrap                   |
| `window.vscode.ipcRenderer.invoke` | `async (channel, args) => invoke("MountainIPCInvoke", ...)`                  | Routes workbench IPC to Mountain                                                                              |
| `window.process`                   | `ISandboxNodeProcess`-shaped object with `platform`, `arch`, `env`, `cwd()`  | Multiple VS Code modules read `process.platform` at module load time                                          |
| `window.MonacoEnvironment`         | `{ getWorkerUrl(moduleId, label) }`                                          | Monaco editor resolves web worker URLs through this global before spawning workers                            |
| `window.__CEL_LAND__.polyfills`    | Object with `requestIdleCallback`, `queryLocalFonts`, `__name`               | WKWebView does not implement these browser APIs that the workbench bundle expects                             |
| `window.ISandboxConfiguration`     | Parsed from meta tags injected by Mountain                                   | VS Code's `NativeWorkbenchEnvironmentService` reads this at startup to locate extensions, logs, and user data |

### Timing Guarantee

The Astro `Layout.astro` for each workbench variant loads Preload as an inline
`<script>` tag with `is:inline` before the workbench bundle `<script>` tag. This
guarantees synchronous execution order because browsers execute inline scripts
before deferred module scripts. The Preload script dispatches
`land-preload-ready` as a `CustomEvent` on `window` so any async code that needs
to wait for the shims can do so without polling.

## Generated \*Upstream.ts Files

The `Source/Effect/Generated/` directory contains approximately 492
auto-generated files, one per VS Code workbench service. Each file exports a
bridge shape object that Wind's service implementations use to route calls to
the correct Mountain IPC channel.

### Import Depth Issue and Fix

All 492 files previously contained an incorrect import depth:

```typescript
// Wrong - was in every generated file
import { CodegenBase } from "../../Codegen/Base";
```

The correct depth from `Generated/SomeService/SomeUpstream.ts` to
`Codegen/Base.ts` is three levels up, not two:

```typescript
// Correct
import { CodegenBase } from "../../../Codegen/Base";
```

This was a generator template bug in `Source/Codegen/Emit/EmitServiceSchema.ts`.
The fix was applied to the template, not to the 492 output files. Re-running the
codegen step regenerates all files with the correct depth.

> [!WARNING] If you see module resolution errors mentioning `Codegen/Base` or
> `Codegen/Type` after a Wind rebuild, the generator has regressed. Fix
> `EmitServiceSchema.ts`, not the generated files.

## Wind Codegen Pipeline

`Source/Codegen/` extracts VS Code service bridge shapes from the compiled VS
Code source tree. The pipeline runs as `pnpm run codegen` and writes results to
`Source/Effect/Generated/`.

### Steps

1. **Walk** - The codegen walker reads `Dependency/Microsoft/VSCode/` (the
   compiled VS Code source) and locates all `createDecorator<IServiceName>()`
   calls. Each decorator call defines one service identifier.

2. **Extract** - For each service identifier, the extractor finds the
   corresponding TypeScript interface definition and enumerates its method
   signatures: parameter names, types, and return types.

3. **Emit** - `EmitServiceSchema.ts` writes one `*Upstream.ts` file per service
   to `Source/Effect/Generated/`. Each file exports a `ServiceUpstream` object
   mapping method names to their IPC channel strings.

4. **Validate** - The generated files are compiled as part of
   `pnpm prepublishOnly`. Any type mismatch between the generated bridge shape
   and Wind's service implementation surfaces as a compile error.

### When to Re-Run

Re-run codegen after updating the VS Code dependency version in Output. New
service methods added in VS Code will otherwise be missing from Wind's bridge
shapes, causing those calls to silently route to the wrong Mountain handler.

## Effect-TS Service Pattern

Every Wind service follows the Define/Implement/Problem structure:

```typescript
// Effect/Clipboard/Define.ts - service Tag
export class Clipboard extends Context.Tag("Clipboard")<
	Clipboard,
	{ readonly readText: Effect.Effect<string, ClipboardProblem> }
>() {}

// Effect/Clipboard/Implement.ts - Tauri-backed Layer
export const ClipboardLive = Layer.succeed(
	Clipboard,
	Clipboard.of({
		readText: Effect.tryPromise({
			try: () => invoke("get_clipboard", { format: "text" }),
			catch: (e) => new ClipboardProblem({ message: String(e) }),
		}),
	}),
);

// Effect/Clipboard/Problem.ts - typed errors
export class ClipboardProblem extends Data.TaggedError("ClipboardProblem")<{
	message: string;
}> {}
```

Callers depend on `Clipboard` Tag, not on the concrete implementation. Swapping
`ClipboardLive` for `MockClipboardLayer` in `TestLayer` requires no changes to
consuming code.

## Related Documentation

- [Wind overview](https://Editor.Land/Doc/wind)
- [Sky Deep Dive](https://Editor.Land/Doc/deep-dive-sky)
- [Mountain Deep Dive](https://Editor.Land/Doc/deep-dive-mountain)
- [Output pipeline](https://Editor.Land/Doc/deep-dive-output)
