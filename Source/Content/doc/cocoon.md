---
title: "Cocoon"
section: "Elements"
order: 1
description:
    "The Node.js extension host that runs VS Code extensions unmodified inside
    Land. Uses a lean async bootstrap (no Effect-TS runtime overhead), a
    7-stage ordered startup, topological extension activation with cycle guard,
    and gRPC-backed vscode.* API shims with ~88% weighted coverage."
---

Cocoon is the Node.js sidecar process that provides VS Code extension
compatibility for Land. It loads extension entry points unmodified, constructs a
per-extension `vscode` API object from Effect-TS service layers, and
communicates with Mountain over the Vine gRPC protocol. Cocoon binds its own
gRPC server on port **50052**; Mountain's Vine gRPC server listens on port
**50051**. Mountain launches and supervises Cocoon; Cocoon never connects
directly to the UI layer.

## Role in the Land Ecosystem

Cocoon exists because VS Code extensions expect a specific Node.js runtime with
a `vscode` module available at `require("vscode")`. Rather than shipping a full
Electron process, Land provides a lightweight Node.js sidecar that intercepts
that `require` call and returns an API surface backed by Mountain's native
services.

| Attribute            | Value                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------- |
| Language             | TypeScript (Effect-TS v3.21 for service composition)                                  |
| Runtime              | Node.js v18+ (managed by Mountain's ProcessManagement)                                |
| Own gRPC server      | Vine protocol, port **50052** (Mountain connects to this)                             |
| Mountain gRPC client | Vine protocol, port **50051** (Cocoon connects to Mountain's server)                  |
| Bootstrap            | Plain `async`/`await`; no Effect-TS runtime on startup path                          |
| Managed by           | `Mountain/ProcessManagement/CocoonManagement.rs`                                      |
| VS Code API coverage | ~88% weighted (TextEditor 95%, Workspace 96%, Window 95%, SCM 95%, LSP 95%)           |

## Key Dependencies

| Package                            | Purpose                                               |
| ---------------------------------- | ----------------------------------------------------- |
| `effect` (v3.21.2)                 | Core Effect-TS library for all service composition    |
| `@effect/platform` (v0.96.1)       | Effect-TS platform abstractions                       |
| `@effect/platform-node` (v0.106.0) | Node.js-specific Effect-TS platform                   |
| `@grpc/grpc-js` (v1.14.3)          | gRPC client and server                                |
| `@grpc/proto-loader` (v0.8.1)      | `.proto` file loading for gRPC                        |
| `@codeeditorland/output` (v0.0.1)  | Compiled VS Code platform code from `Land/Dependency` |
| `google-protobuf` / `protobufjs`   | Protocol Buffers for gRPC                             |

## Bootstrap Stages

Cocoon initializes in seven ordered stages using plain `async`/`await` - there
is no Effect-TS runtime on the startup path, saving the ~45ms
`NodeRuntime.runMain` startup cost. The ordering is critical: RPCServer
(Stage 3) must bind before MountainConnection (Stage 5). Mountain's gRPC
connection budget is 30 seconds (`GRPC_CONNECT_BUDGET_MS = 30_000`). If the
stages were reversed, Mountain would time out waiting for Cocoon's port before
Cocoon ever started its server.

```text
Stage 1 - Environment
  Reads process.version, platform, arch; logs Node details.

Stage 2 - Configuration
  Parses env vars (MOUNTAIN_GRPC_PORT, COCOON_GRPC_PORT, Trace, …)
  into globalThis.__cocoonBootstrapConfig.

Stage 3 - RPCServer
  Binds Cocoon's own Vine gRPC server on port 50052.
  Mountain's probe loop will now succeed.

Stage 4 - ModuleInterceptor
  Patches Node.js require() and import.
  All subsequent require("vscode") calls return Land's API shim.

Stage 5 - MountainConnection
  TCP-probes Mountain's Vine gRPC server on port 50051, then connects.
  Sends $initialHandshake notification.
  Waits for initExtensionHost request with InitData payload.
  MountainProbeMaxAttempts=3, MountainConnectMaxAttempts=5.

Stage 6 - Extensions
  Activates all enabled extensions (concurrency 8, topological order).

Stage 7 - HealthCheck
  Optional; skipped when skipHealthCheck: true.
  Starts heartbeat loop and reports ready state to Mountain.
```

## Source Layout

| Path                                      | Purpose                                               |
| ----------------------------------------- | ----------------------------------------------------- |
| `Bootstrap/Implementation/Cocoon/Main.ts` | Entry point; builds AppLayer, runs bootstrap stages   |
| `Effect/Bootstrap.ts`                     | Ordered stage orchestration                           |
| `Service/Mapping.ts`                      | Dependency injection container (AppLayer composition) |
| `PatchProcess/`                           | Process hardening, signal handling, log piping        |
| `Effect/Module/Interceptor.ts`            | require/import patching                               |
| `Services/API/Factory/Service.ts`         | Constructs per-extension vscode API object            |
| `Services/Extension/Host/Service.ts`      | Extension activation and lifecycle management         |
| `Services/gRPC/Server/Service.ts`         | Vine gRPC server implementation (Cocoon side)         |
| `Services/Mountain/gRPC/Client.ts`        | Effect-TS wrapper for outbound Mountain gRPC calls    |
| `IPC/Channel.ts`                          | Multi-channel RPC routing                             |
| `TypeConverter/`                          | Pure DTO serialization for gRPC transport             |
| `WebviewPanel/`                           | Webview panel lifecycle and message passing           |
| `Telemetry/`                              | PostHog event collection and OTLP trace export        |
| `Generated/RouteManifest.ts`              | Auto-generated route manifest (regenerated per build) |
| `Platform/`                               | OS detection, env vars, process info as Effect layer  |

## vscode.\* API Shim Namespaces

`Services/API/Factory/Service.ts` constructs the `vscode` object that each
extension receives. Every namespace method is wired to a corresponding Effect-TS
service layer.

| Namespace               | Provider              | Primary track           |
| ----------------------- | --------------------- | ----------------------- |
| `vscode.commands`       | `CommandsProvider`    | In-process + gRPC       |
| `vscode.window`         | `WindowProvider`      | gRPC to Mountain        |
| `vscode.workspace`      | `WorkspaceProvider`   | In-process + gRPC       |
| `vscode.workspace.fs`   | `FileSystemProvider`  | gRPC (native tokio::fs) |
| `vscode.languages`      | `LanguagesProvider`   | gRPC to Mountain        |
| `vscode.env`            | `EnvironmentProvider` | In-process              |
| `vscode.extensions`     | `ExtensionsProvider`  | In-process              |
| `vscode.tasks`          | `TasksProvider`       | gRPC to Mountain        |
| `vscode.debug`          | `DebugProvider`       | In-process + gRPC       |
| `vscode.scm`            | `ScmProvider`         | gRPC to Mountain        |
| `vscode.authentication` | `AuthProvider`        | gRPC stub               |
| `vscode.WebviewPanel`   | `WebviewProvider`     | Mountain-backed         |

## Effect-TS Service Layer

Every service in Cocoon is implemented as an Effect-TS `Layer`. Layer
composition ensures all dependencies are resolved at compile time. The master
`AppLayer` in `Service/Mapping.ts` is the union of all individual service
layers:

```
AppLayer
  = ApiFactoryLayer
  + ExtensionHostLayer
  + CommandsLayer
  + WindowLayer
  + WorkspaceLayer
  + LanguagesLayer
  + FileSystemLayer
  + ConfigurationLayer
  + TerminalLayer
  + SCMLayer
  + DebugLayer
  + TasksLayer
  + AuthLayer
  + IpcLayer
  + PlatformLayer
  + TelemetryLayer
```

A missing layer is a compile error, not a runtime failure. This makes accidental
service omissions impossible to ship.

## Module Interception

`Effect/Module/Interceptor.ts` patches Node.js's `require()` before any VS Code
source is loaded. The interceptor intercepts by module name pattern:

| Module pattern            | Replacement              | Reason                             |
| ------------------------- | ------------------------ | ---------------------------------- |
| `vscode`                  | `ApiFactory` construct   | Per-extension isolated API surface |
| `electron`                | Empty stub               | No Electron in Land                |
| `original-fs`             | Node.js `fs`             | Electron-specific alias            |
| `keytar`                  | Mountain gRPC stub       | OS keychain via Mountain           |
| `spdlog`                  | No-op stub               | Native logger not present          |
| `vscode-windows-registry` | No-op stub               | macOS primary target               |
| `./extHost*.js`           | `@codeeditorland/output` | VS Code stock extension host code  |
| `./mainThread*.js`        | `@codeeditorland/output` | VS Code stock main thread code     |

Each `require("vscode")` call returns a new API object constructed by
`ApiFactory` for that specific extension, with isolated state and subscriptions.

## Extension Lifecycle

```text
1. Discovery
   Mountain scans extension directories and sends manifests in InitData.

2. Topological sort
   Extension dependencies are resolved; activation order is computed.
   An InProgress set guards against circular dependency cycles.

3. Activation
   RequireInterceptor loads the extension main module.
   ApiFactory constructs the vscode object for this extension.
   ExtensionContext is built:
     - workspaceState → Mountain storage:get/set (prefix <extId>:workspace:)
     - globalState    → Mountain storage:get/set (prefix <extId>:global:)
     - secrets        → Mountain encryption:encrypt/decrypt (AES-256-GCM,
                        machine-stable key from SHA-256 of hardware UUID)
   Storage is primed before activate() is called so the first synchronous
   workspaceState.get() sees the real persisted value.
   extension.activate(context) is called.
   context.extension.exports is updated after activate() resolves.

4. Registration
   Extension calls register*() methods; providers are stored in-process.
   Language providers are registered with Mountain via gRPC so Sky can
   route Monaco requests through the Vine protocol.

5. Normal operation
   API calls dispatch to the appropriate service layer.
   I/O-heavy calls (file system, terminal, clipboard) go to Mountain via gRPC.
   In-process calls (command registry, workspace state) resolve locally.

6. Deactivation
   Mountain sends DeactivateExtension via gRPC.
   extension.deactivate() is called if present.
   All subscriptions in context.subscriptions are disposed.
```

## TierIPC Routing

The `TierIPC` environment variable controls how Wind routes IPC calls at
runtime - no rebuild required:

| Value          | Behavior                                                                    |
| :------------- | :-------------------------------------------------------------------------- |
| `Mountain`     | Default. All calls handled by Mountain's Tauri IPC.                         |
| `Node`         | All calls forwarded to Cocoon via `cocoon:request` bridge.                  |
| `NodeDeferred` | Mountain first; if Mountain returns `undefined` or has no handler, the call |
|                | falls through to Cocoon via the `cocoon:request` gRPC bridge.               |

When `TierIPC=NodeDeferred`, Cocoon's `RequestRoutingHandler` receives
forwarded calls and dispatches by method name prefix to the appropriate
in-process handler (`languages:*`, `scm:*`, `debug:*`, `tasks:*`, `auth:*`).
This allows gradual migration of handlers from Mountain to Cocoon without a
code rebuild.

## gRPC Communication

Cocoon operates as both gRPC client and gRPC server simultaneously:

- **Client** (`Services/Mountain/gRPC/Client.ts`): sends requests to Mountain's
  Vine server. Used for UI operations (show message, open dialog), file
  operations, terminal management, and secret storage.
- **Server** (`Services/gRPC/Server/Service.ts`): receives calls from Mountain.
  Used for language provider requests (`$provideHover`, `$provideCompletion`,
  `$resolveCodeAction`, etc.), extension activation, and push notifications.

The bidirectional channel enables real-time flows: Mountain can push a
`$acceptModelChanged` notification to Cocoon when the active editor changes, and
Cocoon can push a `languageFeature:hover` response back without a new
connection.

## Process Hardening

`PatchProcess/` runs before any other module:

- Patches `process.exit` so extensions cannot terminate the host.
- Installs handlers for `SIGTERM` and `SIGINT` to trigger graceful shutdown.
- Monitors `VSCODE_PARENT_PID`: if Mountain exits, Cocoon exits automatically.
- Redirects `console.*` calls to Mountain's log sink. All `console.*` calls in
  Cocoon production source have been replaced with `CocoonDevLog` or
  `process.stdout.write` so esbuild's `drop:["console"]` does not silently
  discard them in release builds.
- Wraps the entire application in an uncaught-exception boundary that logs stack
  traces before exiting cleanly.

## TypeConverter

`TypeConverter/` contains pure functions that serialize TypeScript types into
flat DTOs for gRPC transport. No class instances cross the gRPC boundary;
everything is converted to plain objects matching the Vine proto schema.

| Sub-module      | Types converted                                   |
| --------------- | ------------------------------------------------- |
| `Main`          | URI, Range, Position, Selection                   |
| `Dialog`        | OpenDialogOptions, SaveDialogOptions              |
| `TreeView`      | TreeItem, TreeItemLabel, TreeItemCollapsibleState |
| `Webview`       | WebviewOptions, WebviewPanelOptions               |
| `Task`          | Task, TaskDefinition, ProcessExecution            |
| `WorkspaceEdit` | WorkspaceEdit, TextEdit, file operations          |

## Generated RouteManifest

`Generated/RouteManifest.ts` is regenerated on every build by `Codegen/`. It
enumerates three categories of routes:

- Mountain-side RPC methods available via gRPC (lifted from Vine.proto).
- Stock lift exports from `@codeeditorland/output` (VS Code extHost stubs).
- Bespoke Node.js fallback handlers for methods not yet in Mountain.

`Wind/Source/Effect/Generated/` contains a parallel set of `*Upstream.ts` files
generated by the same pipeline for the Wind element.

## Related Documentation

- [Deep Dive: Cocoon](https://Editor.Land/Doc/deep-dive-cocoon)
- [Mountain](https://Editor.Land/Doc/mountain)
- [Architecture Overview](https://Editor.Land/Doc/architecture)
- [Vine protocol](https://Editor.Land/Doc/vine)
