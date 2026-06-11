---
title: "Cocoon - Deep Dive"
section: "Deep Dive"
order: 1
description: "Internals of the Cocoon extension host: 7-stage bootstrap
    ordering, RequireInterceptor rules, gRPC server implementation, extension
    activation lifecycle with topological ordering and cycle guard, TierIPC
    routing, and the showInformationMessage call path end-to-end."
---

Cocoon is the Node.js extension host sidecar for Land. This page covers its
internal mechanics in depth: why bootstrap stage ordering matters, how the
module interceptor works, how the Vine gRPC server is implemented, how
extensions are activated in topological order with a circular-dependency
guard, and how a full extension API call flows from the extension's code to a
native OS dialog and back.

## Bootstrap Stage Ordering

Cocoon's bootstrap is plain `async`/`await` - there is no Effect-TS runtime
overhead in the startup path, saving the ~45ms `NodeRuntime.runMain` startup
cost. `Effect/Bootstrap.ts` runs seven ordered stages. The ordering is not
arbitrary: Mountain starts attempting to connect to Cocoon's gRPC server
immediately after spawning the process, within a 30-second budget
(`GRPC_CONNECT_BUDGET_MS = 30_000` in `CocoonManagement.rs`; 3 TCP probe
attempts, then 5 connection retries). If Cocoon starts its gRPC server after
Mountain's budget expires, the connection fails and Mountain logs a fatal error.

The correct order:

```text
Stage 1: Environment
  Reads process.version, platform, arch; logs Node details.

Stage 2: Configuration
  Parses env vars (MOUNTAIN_GRPC_PORT, COCOON_GRPC_PORT, Trace, …)
  into globalThis.__cocoonBootstrapConfig.

Stage 3: RPCServer
  Binds Cocoon's own Vine gRPC server on COCOON_GRPC_PORT (default 50052).
  Mountain's probe loop will now succeed.

Stage 4: ModuleInterceptor
  Installs the require('vscode') / ESM import interceptor.
  Safe to do before any VS Code code is loaded.

Stage 5: MountainConnection
  TCP-probes Mountain's gRPC port (default 50051), then connects.
  Sends $initialHandshake notification.
  Awaits initExtensionHost with InitData payload.

Stage 6: Extensions
  Activates all enabled extensions (concurrency 8, topological order).

Stage 7: HealthCheck
  Optional; skipped when skipHealthCheck: true.
  Starts heartbeat loop and reports ready state to Mountain.
```

> [!IMPORTANT] Stage 3 (RPCServer) must bind before Stage 5
> (MountainConnection). Mountain's gRPC budget is 30 seconds. If the server
> stage ran after the connection stage, Mountain would time out waiting for
> Cocoon's port before Cocoon ever started listening.

## Effect-TS Usage Pattern

Cocoon uses Effect-TS selectively - not as a process-level runtime but as a
service composition tool:

- **`Layer.succeed`** - used when a service implementation needs to be wrapped
  in a Layer but carries no async initialization side-effects. This is the
  common case for most service shims.
- **`Layer.effect`** - used only where the Layer build itself is async (e.g.
  services that open a connection during construction).
- **`ManagedRuntime`** - initialized eagerly at module load time so the first
  Effect dispatch does not pay a startup penalty. The runtime is stored in a
  module-level singleton to avoid repeated construction.
- **Bootstrap entry point** - `async/await` directly; no `Effect.runPromise`
  wrapper at the top level. This avoids the unhandled-rejection behavior of
  `NodeRuntime.runMain` in production Node.js environments where `console.*` is
  stripped by esbuild's `drop:["console"]` pass.

### Bootstrap tuning constants

| Constant                     | Value  | Description                                         |
| :--------------------------- | :----- | :-------------------------------------------------- |
| `MountainProbeMaxAttempts`   | 3      | TCP probes before giving up waiting for Mountain    |
| `MountainProbeTimeoutMs`     | 300 ms | Per-probe connect timeout                           |
| `MountainConnectMaxAttempts` | 5      | gRPC connect retries (exponential backoff, max 5 s) |

## vscode API Coverage

The current weighted coverage across all `vscode.*` namespaces is approximately
**88%**. Key namespace breakdowns:

| Namespace        | Coverage | Notes                                       |
| :--------------- | :------- | :------------------------------------------ |
| `vscode.window`  | ~95%     | TextEditor, QuickPick, StatusBar, WebviewPanel |
| `vscode.workspace` | ~96%   | File events, TextDocument, WorkspaceEdit    |
| `vscode.scm`     | ~95%     | Input box, commit template, provider events |
| `vscode.languages` | ~95%  | Full `$provide*` / `$resolve*` coverage     |
| `vscode.debug`   | ~80%     | Config resolution; pipe/server adapters partial |
| `vscode.authentication` | ~40% | No real OAuth backend yet             |

## RequireInterceptor Rules

`Effect/Module/Interceptor.ts` patches Node.js's internal `require()` resolver
before any VS Code source is loaded. It operates on module name patterns, not
file paths, and is installed once per process.

### vscode module sandboxing

When any code calls `require("vscode")`, the interceptor calls
`ApiFactory.create(extensionId)` to build a fresh, isolated API object for that
extension. The key properties of this isolation:

- Each extension gets its own `EventEmitter` instances for all `onDid*` events.
- `context.subscriptions` is per-extension; disposal does not affect other
  extensions.
- `workspaceState` and `globalState` are backed by Mountain's `storage:get` /
  `storage:set` IPC, namespaced by extension ID.
- `secrets` uses Mountain's `encryption:encrypt` / `encryption:decrypt` IPC
  (AES-256-GCM, machine UUID key).

### External module passthrough

Modules not matched by any rule pass through to Node.js's standard resolver.
This means `require("path")`, `require("fs")`, and all npm packages load
normally. The interceptor only intercepts patterns that require substitution.

### Full interception table

| Module pattern            | Replacement                      | Reason                              |
| ------------------------- | -------------------------------- | ----------------------------------- |
| `vscode`                  | `ApiFactory.create(extensionId)` | Per-extension isolated API surface  |
| `electron`                | Empty stub with expected methods | No Electron in Land                 |
| `original-fs`             | Node.js `fs`                     | Electron-specific alias             |
| `keytar`                  | Mountain gRPC stub               | OS keychain via Mountain encryption |
| `spdlog`                  | No-op stub                       | Native logger not present           |
| `vscode-windows-registry` | No-op stub                       | macOS is primary target             |
| `./extHost*.js`           | `@codeeditorland/output`         | VS Code stock extension host code   |
| `./mainThread*.js`        | `@codeeditorland/output`         | VS Code stock main thread code      |

## gRPC Server Implementation

Cocoon runs its own gRPC server (`Services/gRPC/Server/Service.ts`) that
Mountain calls into. This is the reverse direction: Mountain → Cocoon. The
server implements the Vine protocol and receives:

- Language provider requests: `$provideHover`, `$provideCompletion`,
  `$provideDefinition`, `$resolveCodeAction`, `$provideInlineCompletionItems`,
  `$provideFileDecoration`, and all other `$provide*` / `$resolve*` methods.
- Extension lifecycle calls: `ActivateByEvent`, `DeactivateExtension`.
- Push notifications: `$acceptModelChanged`, `$acceptDidCreateFiles`,
  `$acceptDidDeleteFiles`, `$acceptDidRenameFiles`, `$acceptTerminalOpened`,
  `$acceptTerminalClosed`.
- Task and debug calls: `ExtHostTaskService$fetchTasks`,
  `ExtHostDebug$resolveDebugConfiguration`.

The server delegates domain logic to four handler modules:

| Handler module            | Handles                                        |
| ------------------------- | ---------------------------------------------- |
| `ExtensionHostHandler`    | Extension activation and lifecycle             |
| `LanguageProviderHandler` | All `$provide*` and `$resolve*` language calls |
| `NotificationHandler`     | Push notifications from Mountain               |
| `RequestRoutingHandler`   | All other request routing via `RoutePatterns`  |

`RequestRoutingHandler` uses a `RoutePatterns` map to dispatch by method name
prefix. Route groups added at runtime:

```typescript
Object.assign(RoutePatterns, {
	"languages:": handleLanguages,
	"scm:": handleScm,
	"debug:": handleDebug,
	"tasks:": handleTasks,
	"auth:": handleAuth,
});
```

This map-based dispatch means adding a new route group does not require
modifying the core server file.

## Extension Activation Lifecycle

### Topological ordering

Before activating any extension, Cocoon reads its `extensionDependencies` array
from the manifest and recursively activates each dependency first. This ensures
language server host extensions (e.g. a language grammar pack required by a
formatter) are ready before their consumers run. Extensions with no dependencies
activate first; dependents activate after all their dependencies have resolved.

### Circular dependency guard

An `InProgress: Set<string>` tracks every extension ID whose activation has
started but not yet completed. If a dependency's ID is already in `InProgress`,
the recursive activation is skipped - preventing infinite loops from circular
dependency declarations.

```text
activate(ExtId):
  if ActivatedExtensions.has(ExtId) || InProgress.has(ExtId) → return
  InProgress.add(ExtId)
  for each DepId in extensionDependencies:
    if not activated and not InProgress → activate(DepId)
  … load & call activate() …
  ActivatedExtensions.add(ExtId)
  InProgress.delete(ExtId)
```

### Activation sequence per extension

```text
1. Module load
   RequireInterceptor loads the extension's main file.
   The module's top-level code runs (but activate() has not been called yet).

2. Context construction
   ExtensionContext is built with:
   - workspaceState  → Mountain storage:get/set (key prefix <extId>:workspace:)
   - globalState     → Mountain storage:get/set (key prefix <extId>:global:)
   - secrets         → Mountain encryption:encrypt/decrypt (AES-256-GCM)
   - subscriptions   → per-extension disposal list
   - extensionPath   → from InitData manifest
   - extension.exports → populated after activate() resolves

   Storage is primed synchronously before activate() is called: PrimeStorageCaches
   bulk-loads every persisted key so that the first synchronous workspaceState.get()
   call during activate() sees the real persisted value rather than the default.

3. activate(context) call
   The extension's activate function is called with the context.
   Any vscode.* calls inside activate() route through the API shim.

4. Exports capture
   context.extension.exports is set to the return value of activate().
   Other extensions that listed this extension as a dependency can now
   call vscode.extensions.getExtension(id).exports.
```

### Extension context storage backing

Every activated extension receives an `ExtensionContext` whose storage
properties are backed by Mountain:

| Property         | Backing mechanism                                                        |
| :--------------- | :----------------------------------------------------------------------- |
| `workspaceState` | Mountain `Storage.Get` / `Storage.Set` (key prefix `<extId>:workspace:`) |
| `globalState`    | Mountain `Storage.Get` / `Storage.Set` (key prefix `<extId>:global:`)    |
| `secrets.get`    | Mountain `secrets.get` → `encryption:decrypt` (AES-256-GCM)              |
| `secrets.store`  | Mountain `secrets.store` → `encryption:encrypt` (AES-256-GCM)            |
| `secrets.delete` | Mountain `secrets.delete`                                                |

The AES-256-GCM key is machine-stable: Mountain derives it from
`SHA-256("Land-Encryption-v1" + hardware UUID)` and caches it in a process-wide
`OnceLock`. This key backs secure credential storage for extensions such as
GitHub Copilot and authentication providers.

### Event firing during activation

During activation, several lifecycle events are emitted to Mountain:

- `$acceptActivateExtension` - sent to Mountain before `activate()` runs.
- `$acceptDidActivateExtension` - sent after `activate()` resolves.
- Language provider registrations are forwarded to Mountain immediately so Sky
  can start routing Monaco requests without waiting for the full registry.

## vscode.window.showInformationMessage - End-to-End Call Path

This is the canonical example of how a synchronous-looking extension API call
travels through the full stack.

```text
1. Extension code
   const result = await vscode.window.showInformationMessage(
       "File saved", "Open", "Dismiss"
   );

2. RequireInterceptor
   require("vscode") was intercepted at extension load time.
   The vscode.window object is the WindowProvider instance for this extension.

3. WindowProvider (Services/Window/Namespace.ts)
   showInformationMessage creates an Effect that:
   - Serializes the message and button labels via TypeConverter.
   - Calls MountainClient.ShowMessage(request) as a gRPC unary call.
   - Awaits the ShowMessageResponse.

4. gRPC transport
   TypeConverter converts the VS Code MessageOptions type to a Vine proto
   ShowMessageRequest DTO (flat object, no class instances).
   @grpc/grpc-js sends the request to Mountain on port 50051.

5. Mountain - Vine gRPC server
   MountainVineGRPCService receives ShowMessageRequest.
   Track dispatcher routes it to UserInterfaceProvider.ShowMessage().

6. Mountain - UserInterfaceProvider
   tauri-plugin-dialog displays a native OS modal dialog.
   Execution blocks until the user clicks a button.

7. Response path
   The clicked button label is serialized into ShowMessageResponse.
   gRPC sends it back to Cocoon.

8. WindowProvider resolves
   The Effect resolves with the button label string (or undefined on dismiss).
   The Promise returned to the extension resolves with the same value.

9. Extension code resumes
   result === "Open" or result === "Dismiss" or result === undefined.
```

Total round-trip time is dominated by the user interaction wait. The mechanical
overhead (module interception, gRPC serialization, Mountain dispatch) is under
1ms on localhost.

## Dual-Track Routing and TierIPC

Not all API calls go to Mountain. Cocoon routes calls through two tracks:

| Track   | Path                              | Latency | Used for                                  |
| ------- | --------------------------------- | ------- | ----------------------------------------- |
| Track A | In-process via extHost\*.ts stubs | <0.1ms  | Command registry, workspace state, config |
| Track B | gRPC ActionEffect to Mountain     | ~1ms    | File I/O, terminal, clipboard, UI dialogs |

The routing decision is made per method in each service layer. The track is
determined at layer construction time based on `TierIPC` (read from
`globalThis.__LandTiers`, substituted from environment variables by esbuild at
build time).

| TierIPC value  | Effect                                                                       |
| -------------- | ---------------------------------------------------------------------------- |
| `Mountain`     | Default. Track B for I/O methods.                                            |
| `Node`         | All calls go through Track A (Cocoon in-process).                            |
| `NodeDeferred` | Mountain first (Track B); falls back to Cocoon `cocoon:request` bridge on    |
|                | miss or `undefined` return. Cocoon's `RequestRoutingHandler` receives these  |
|                | forwarded calls and dispatches to the appropriate in-process handler.        |

### Track distribution by API method

| Method                          | Default track | Reason                          |
| ------------------------------- | ------------- | ------------------------------- |
| `commands.registerCommand`      | A             | In-process bookkeeping          |
| `commands.executeCommand`       | A             | In-process dispatch             |
| `window.showInformationMessage` | B             | Native UI dialog                |
| `workspace.openTextDocument`    | A             | Content held in Cocoon memory   |
| `workspace.fs.readFile`         | B             | Native tokio::fs (faster)       |
| `workspace.findFiles`           | B             | Native ripgrep                  |
| `window.createWebviewPanel`     | B             | Mountain owns webview lifecycle |
| `env.clipboard`                 | B             | Native clipboard access         |

## RouteManifest Code Generation

`Generated/RouteManifest.ts` is produced by `Codegen/` on every build. The
generator walks two sources:

1. `Vine.proto` - extracts all RPC method names defined on the Mountain gRPC
   server. These become the "Mountain-side RPC methods" section.
2. `@codeeditorland/output` - extracts all exported `IExtHost*` interface
   members from the VS Code stock extension host code. These become the "stock
   lift exports" section.

Any method present in the VS Code stock interfaces but absent from the Vine
proto is recorded as a "bespoke Node.js fallback" - meaning it runs through
Track A until a Mountain implementation is added.

The Wind element has a parallel generated set:
`Wind/Source/Effect/Generated/ **/*Upstream.ts`. Both are produced by the same
Codegen infrastructure so they stay in sync when the Vine proto changes.

> [!WARNING] Never edit files in `Generated/` by hand. They are overwritten on
> every build. If a generated route is wrong, fix the generator in `Codegen/` or
> the proto definition in `Proto/Vine.proto`.

## NotificationHandler and \_\_textDocuments

`Services/Handler/Notification/Handler.ts` is the main entry point for all push
notifications from Mountain. When Mountain emits `$acceptModelChanged`, this
handler:

1. Updates `__textDocuments` (the in-process document cache).
2. Computes full `positionAt`, `offsetAt`, `lineAt`, `getText`, and
   `getWordRangeAtPosition` implementations from the new content.
3. Derives `languageId` from the URI extension map if the language is not
   explicitly set.
4. Fires `onDidChangeTextDocument` on all registered listeners.

This document cache is what makes synchronous-looking calls like
`document.getText()` and `document.lineAt(n)` work without a round-trip to
Mountain. The cache is invalidated and rebuilt on every `$acceptModelChanged`
notification.

## Process Hardening Details

`PatchProcess/` runs as the very first code in `Main.ts`, before AppLayer is
constructed:

```typescript
// PatchProcess must run before any other import side-effects
await PatchProcess.install({
	parentPid: process.env.VSCODE_PARENT_PID,
	logForward: (level, msg) => MountainLog.forward(level, msg),
});
```

`process.exit` is replaced with a function that runs graceful shutdown (dispose
all subscriptions, drain gRPC, log final state) before actually exiting. This
means `process.exit(0)` inside an extension triggers a clean shutdown rather
than an abrupt kill.

The parent PID monitor polls `process.kill(parentPid, 0)` every 5 seconds. If
Mountain is gone, `process.kill` throws `ESRCH` and Cocoon exits immediately.
This prevents orphaned Cocoon processes if Mountain crashes without sending
`SIGTERM`.

## Related Documentation

- [Cocoon element overview](https://Editor.Land/Doc/cocoon)
- [Mountain deep dive](https://Editor.Land/Doc/deep-dive-mountain)
- [Architecture overview](https://Editor.Land/Doc/architecture)
- [Vine protocol](https://Editor.Land/Doc/vine)
