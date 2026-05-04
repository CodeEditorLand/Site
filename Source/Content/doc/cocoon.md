---
title: "Cocoon"
section: "Element"
order: 12
description: "The Node.js extension host that runs VS Code extensions via an Effect-TS fiber runtime, communicating with Mountain over a bidirectional gRPC channel."
---

# Cocoon

Cocoon is the extension host for Editor.Land. It is a Node.js process
(`@codeeditorland/cocoon`) that loads and runs VS Code extensions by
implementing the `vscode.*` API surface on top of an
[Effect-TS](https://effect.website) fiber runtime (Effect `3.21.2`,
`@effect/platform-node`). Extensions call `vscode.workspace.openTextDocument()`,
`vscode.window.createTerminal()`, and the rest of the documented API and
receive the same `Thenable<T>` return types they expect. Internally those
calls are typed Effects running on a supervised fiber scheduler.

Cocoon is bundled via ESBuild (`Source/ESBuild.ts`) and ships as a
pre-built binary for each platform via the SideCar element. It operates
on **macOS and Windows** and launches automatically from Mountain on
`cargo tauri dev` or from a release build.

---

## Source Layout

Cocoon’s source tree is organized into the following top-level directories
under `Source/`:

- **`Bootstrap/`** - process entry point, gRPC server startup, and service
  composition. Assembles the full service stack and starts the gRPC server.
- **`Configuration/`** - workspace and user configuration read/watch layer.
- **`Effect/`** - Effect-TS utilities and helpers shared across Cocoon services.
- **`Generated/`** - Protobuf-generated TypeScript stubs from the Vine `.proto`
  file. Used by both the gRPC server and the Mountain client.
- **`IPC/`** - typed IPC channel helpers and the `SkyEvent` registry mirror.
- **`Integration/`** - integration points with external systems.
- **`Interfaces/`** - shared TypeScript interface definitions used across services.
- **`Orchestration/`** - high-level orchestration logic coordinating the
  extension host lifecycle and cross-service workflows.
- **`PatchProcess/`** - patching utilities applied to VS Code platform modules
  at load time to adapt them for the Land runtime environment.
- **`Platform/`** - platform-specific adapters (macOS / Windows paths,
  environment detection).
- **`Scripts/`** - build and maintenance scripts.
- **`Services/`** - the core service layer (see Service Modules below).
- **`Telemetry/`** - usage telemetry routing.
- **`TypeConverter/`** - bidirectional converters between Vine protobuf types
  and the `vscode.*` TypeScript types that extensions consume.
- **`Utility/`** - general-purpose helpers with no service dependencies.
- **`WebviewPanel/`** - implementation of the `vscode.WebviewPanel` API,
  routing webview HTML and messages through Mountain’s WebView IPC.

---

## Service Modules

The `Source/Services/` directory contains the full working service layer.
Key files and subdirectories:

- **`GRPCServerService.ts`** (37 KB) - the main gRPC server. Implements the
  three Vine RPC operations (`ProcessMountainRequest`,
  `SendMountainNotification`, `CancelOperation`), routes all incoming
  requests through the handler chain, and manages bidirectional streaming
  connections with a 10-second keepalive loop.
- **`MountainClientService.ts`** (44 KB) - Cocoon’s typed client for calling
  Mountain over the Vine gRPC channel (port 50051). Every notification and
  event Cocoon sends into Mountain goes through this service.
- **`MountainGRPCClient.ts`** (31 KB) - the low-level gRPC stub wrapper that
  `MountainClientService` builds on.
- **`APIFactoryService.ts`** (23 KB) - builds the complete `vscode.*`
  namespace object that every extension receives as its API. Each
  `vscode.workspace.*`, `vscode.window.*`, and `vscode.languages.*` surface
  is constructed here as a typed façade over Cocoon’s Effect-TS services.
- **`ModuleInterceptor.ts`** (33 KB) + **`ModuleInterceptorService.ts`** (18 KB)
  + **`ModuleInterceptor/`** - Cocoon’s replacement for VS Code’s AMD loader.
  Intercepts `require()` calls from extensions and VS Code platform modules
  and redirects them to Land’s module graph without Electron’s sandboxed
  renderer or webpack’s runtime chunk loader.
- **`EchoActionClient.ts`** (12 KB) - Cocoon’s client for the Echo work-stealing
  task scheduler embedded in Mountain. Long-running extension tasks (language
  server warmup, background indexing) are dispatched through Echo rather than
  blocking the gRPC dispatch loop.
- **`Extension.ts`** (17 KB) - extension loading, manifest parsing, and the
  activation lifecycle (`activate()` / `deactivate()`).
- **`ExtensionContext.ts`** (17 KB) - implements the `vscode.ExtensionContext`
  object passed to each extension’s `activate()` function.
- **`ExtensionHostService.ts`** (5.7 KB) - top-level extension host coordinator.
- **`Workspace.ts`** (28 KB) - `vscode.workspace.*` implementation: text
  document management, workspace folder events, file system watchers.
- **`Command.ts`** (16 KB) - `vscode.commands.*` implementation: command
  registration, execution, and the contributed-command dispatch table.
- **`Configuration.ts`** (15 KB) - `vscode.workspace.getConfiguration()`
  implementation.
- **`DualTrack.ts`** (17 KB) - per-method and per-domain deferral knob (see
  DualTrack section below).
- **`LanguageProviderRegistry.ts`** (4.8 KB) - tracks registered hover,
  completion, definition, and reference providers by language ID.
- **`SecurityService.ts`** (18 KB) - validates extension permissions and
  enforces capability boundaries.
- **`Health.ts`** (17 KB) - health monitoring: tracks gRPC server state,
  service liveness, and surfaces diagnostics to Mountain on request.
- **`PerformanceMonitoringService.ts`** (16 KB) - in-process performance
  instrumentation for gRPC request latency and extension activation timing.
- **`Handler/`** - five domain handler modules (see Handler Modules below).

---

## gRPC Communication

Cocoon communicates with Mountain (the Rust kernel) over two gRPC channels
defined by the Vine protocol:

- **Cocoon as server (port 50052)** - Mountain dials Cocoon to invoke extension
  host lifecycle methods, language feature providers, and document notifications.
  The port is configurable via the `COCOON_GRPC_PORT` environment variable.
- **Cocoon as client (port 50051)** - Cocoon dials Mountain to send
  notifications and fire events back into the kernel (file-open, diagnostics
  push, tree-view refresh). The Mountain port is configurable via
  `MOUNTAIN_GRPC_PORT`.

The Vine `.proto` file is loaded from Mountain’s source directory at startup.
Cocoon walks a chain of relative paths to locate the proto file and falls back
to a bundled definition if Mountain’s source is not co-located. The gRPC
server is built with `@grpc/grpc-js` v1.12 or later and supports messages up
to 100 MB in each direction.

Cocoon’s gRPC server exposes three operations:

- `ProcessMountainRequest` - synchronous unary RPC that Mountain calls to
  invoke extension host methods and receive a typed response.
- `SendMountainNotification` - fire-and-forget unary RPC that Mountain uses
  to push document and workspace state changes into Cocoon without waiting
  for a return value.
- `CancelOperation` - unary RPC that Mountain uses to cancel a request by
  its `RequestIdentifier`. Cocoon tracks all in-flight requests and invokes
  the registered cancel handler when this arrives.

---

## Request Routing

All incoming requests are dispatched through a layered routing table in
`GRPCServerService`. The routing logic handles these method shapes:

- **`service.method`** (e.g., `extension.activate`, `configuration.get`) -
  routed through `RequestRoutingHandler` first.
- **`$provideHover`, `$provideCompletions`, `$provideDefinition`, and any
  `$provide[A-Z]*`** - delegated to `LanguageProviderHandler`. Mountain calls
  these when Sky’s editor surface requests language intelligence for the active
  document.
- **`$provideTreeChildren`** - dispatched explicitly through
  `RequestRoutingHandler` before the generic `$provide[A-Z]` regex fires.
- **`InitializeExtensionHost`** - Mountain’s handshake that delivers extension
  manifest data, workspace folders, and configuration.
- **`$deltaExtensions`** - incremental extension manifest updates.
- **`$activateByEvent`** - lazy activation for a specific event string
  (e.g., `onLanguage:typescript`).
- **`$startExtensionHost`** - Mountain signals that initialization is complete.
- **`$deltaWorkspaceFolders`** - incremental workspace folder updates.
- **`ExtHostCommands$ExecuteContributedCommand`** - contributed extension
  command dispatch.
- **`ExtHostAuthentication$*`** - authentication surface calls return `null`
  gracefully while a full provider registry is wired.
- **`$shutdown`** - clean shutdown acknowledgement.

---

## Handler Modules

Domain logic is separated from the gRPC transport layer into five handler
modules under `Source/Services/Handler/`:

- **`ExtensionHostHandler`** - extension host lifecycle: `InitializeExtensionHost`,
  `$deltaExtensions`, `$activateByEvent`, `$startExtensionHost`. Maintains the
  extension registry and activation-event index.
- **`LanguageProviderHandler`** - all `$provide[A-Z]*` language feature
  invocations. Reads document content from the live `documentContentCache`.
- **`DocumentContentHandler`** - `$acceptModelChanged`, `$acceptModelOpen`,
  `$acceptModelClose`, `$acceptModelSave`. Keeps the `documentContentCache`
  synchronized with Mountain’s document state.
- **`NotificationHandler`** - routes incoming Mountain notifications and emits
  `didOpenTextDocument`, `didChangeTextDocument`, `didCloseTextDocument`, and
  `didSaveTextDocument` events on the workspace event emitter.
- **`RequestRoutingHandler`** - handles `service.method` patterns and special
  cases. Returns `undefined` for any method it does not own.

Handlers receive a `HandlerContext` object built with live property descriptors
over the service’s private fields so they can read and mutate service state
without holding a direct reference to the service class.

---

## ModuleInterceptor

Cocoon’s `ModuleInterceptor` replaces the AMD loader that VS Code’s extension
host uses in Electron. When an extension or VS Code platform module calls
`require('vscode')`, `require('vs/platform/...')`, or any other Land-managed
module path, the interceptor intercepts the call and returns the correct
module from Land’s graph rather than from a webpack chunk or Electron’s
built-in module resolver.

This is what allows unmodified VS Code extensions to run inside Cocoon without
repackaging. The `PatchProcess/` directory applies targeted patches to a small
number of VS Code platform files at startup - those that hard-code Electron
or browser assumptions - so the rest of the platform code runs without
modification.

---

## Bidirectional Streaming

`GRPCServerService` supports bidirectional streaming connections. When a
stream opens, Cocoon registers it in a `streamingHandlers` set and begins a
keepalive loop (10-second interval). Streaming requests are routed through the
same `routeRequest` logic as unary calls. Cocoon can broadcast an event to all
active streaming connections via `BroadcastEvent` for push notifications that
do not correspond to a specific pending request.

---

## DualTrack

Cocoon’s `SendToMountain` method checks the `DualTrack` module before
forwarding any notification. `IsRustDeferralEnabled(method)` reads
environment variables (`Defer`, `Defer<DOMAIN>`, `Defer<METHOD>`) to decide
whether a given notification should cross the IPC boundary to Mountain or be
handled entirely in Node. When deferral is disabled for a method, the
notification is dropped on the Cocoon side and a `node-bypass` line is logged.
Call sites see the same `Promise<void>` resolution, so no extension code
changes are needed.

---

## Connection Reliability

Cocoon sets `setMaxListeners(0)` on both its own `EventEmitter` and the
workspace event emitter during construction. On a typical project the listener
count during boot easily exceeds Node’s default cap of 10 (one listener per
language client, webview panel, tree view, and file system provider).
Authentication is supported via the `MOUNTAIN_AUTH_TOKEN` environment
variable: when present, Cocoon validates each incoming request’s metadata
before dispatching it.

---

## Current Status

Cocoon builds and runs on macOS and Windows from a standard `cargo tauri dev`
invocation. The extension host is fully operational for everyday development
workloads.

**Confirmed working:**
- Extension host initialization handshake with Mountain (`InitializeExtensionHost`,
  `$deltaExtensions`, `$activateByEvent`, `$startExtensionHost`).
- Language feature provider routing (`$provideHover`, `$provideCompletions`,
  `$provideDefinition`, and the other `$provide[A-Z]*` shapes).
- Document content mirroring via `$acceptModel*` notifications.
- Tree-data provider calls via `$provideTreeChildren`.
- Contributed extension command dispatch via
  `ExtHostCommands$ExecuteContributedCommand`.
- Operation cancellation via `CancelOperation` RPC with per-request handler
  registration.
- Bidirectional streaming with 10-second keepalive.
- Authentication token support.
- DualTrack Rust-deferral knob for per-method and per-domain control.
- `vscode.workspace.*`, `vscode.window.*`, `vscode.commands.*`,
  `vscode.languages.*`, `vscode.extensions.*`, `vscode.env.*` and the
  majority of the documented `vscode.*` API surface.
- ModuleInterceptor: unmodified VS Code extensions load and activate
  without repackaging.
- WebviewPanel: extensions can open, update, and post messages to webview
  panels rendered in Mountain’s WebView.
- EchoActionClient: background extension tasks dispatch through the Echo
  work-stealing scheduler without blocking the gRPC loop.

**In progress (roadmap):**
- `vscode.notebook.*`, `vscode.chat.*`, and `vscode.lm.*` API surfaces.
- Bidirectional streaming event backpressure under high-frequency event
  streams.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Mountain: Native Kernel](/Doc/mountain)
- [Wind: Service Layer](/Doc/wind)
- [Vine: gRPC Protocol](/Doc/vine)
- [Source Code](https://github.com/CodeEditorLand/Cocoon)
