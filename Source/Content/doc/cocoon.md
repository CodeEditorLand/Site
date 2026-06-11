---
title: "Cocoon"
section: "Elements"
order: 1
description:
    "The Node.js + Effect-TS extension host that runs VS Code extensions
    unmodified inside Land via gRPC-backed vscode.* API shims."
---

Cocoon is the Node.js sidecar process that provides VS Code extension
compatibility for Land. It loads extension entry points unmodified, constructs a
per-extension `vscode` API object from Effect-TS service layers, and
communicates with Mountain over the Vine gRPC protocol on port 50052. Mountain
launches and supervises Cocoon; Cocoon never connects directly to the UI layer.

## Role in the Land Ecosystem

Cocoon exists because VS Code extensions expect a specific Node.js runtime with
a `vscode` module available at `require("vscode")`. Rather than shipping a full
Electron process, Land provides a lightweight Node.js sidecar that intercepts
that `require` call and returns an API surface backed by Mountain's native
services.

| Attribute            | Value                                                                       |
| -------------------- | --------------------------------------------------------------------------- |
| Language             | TypeScript (Effect-TS v3.21)                                                |
| Runtime              | Node.js v18+ (managed by Mountain's ProcessManagement)                      |
| IPC                  | Vine gRPC protocol, port 50052                                              |
| Managed by           | `Mountain/ProcessManagement/CocoonManagement.rs`                            |
| VS Code API coverage | ~88% weighted (TextEditor 95%, Workspace 96%, Window 95%, SCM 95%, LSP 95%) |

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

Cocoon initializes in five ordered stages. The ordering is critical: the gRPC
server (Stage 1) must be listening before Mountain attempts to connect (Stage
3). Reversing this order causes Mountain to exhaust its 30-second connection
budget.

```text
Stage 1 - RPCServer
  Binds the Vine gRPC server on port 50052.
  Mountain can now connect.

Stage 2 - Module interceptor
  Patches Node.js require() and import.
  All subsequent require("vscode") calls return Land's API shim.

Stage 3 - MountainConnection
  Connects to Mountain's Vine gRPC server.
  Sends $initialHandshake notification.
  Waits for initExtensionHost request with InitData payload.
  MountainProbeMaxAttempts=3, MaxAttempts=5.

Stage 4 - Extension registry
  Reads extension manifests from InitData.
  Prepares activation metadata and dependency graph.

Stage 5 - Health checks
  Starts heartbeat loop (5-second interval).
  Reports health to Mountain.
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
   ExtensionContext is built (workspaceState, globalState, secrets all
   backed by Mountain storage and AES-256-GCM encryption).
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
