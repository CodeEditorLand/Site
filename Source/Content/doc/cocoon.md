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

Cocoon operates on **macOS and Windows**. On macOS the host window uses
WKWebView; on Windows it uses WebView2. Both targets build and run from a
standard `cargo tauri dev` invocation in the Land monorepo.

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

The Vine.proto file is loaded from Mountain's source directory at startup.
Cocoon walks a chain of relative paths to locate the proto file and falls back
to a bundled definition if Mountain's source is not co-located. The gRPC
server is built with `@grpc/grpc-js` v1.12 or later and supports messages up
to 100 MB in each direction.

Cocoon's gRPC server exposes three operations:

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
  these when Sky's editor surface requests language intelligence for the active
  document. Parameters carry a handle, a URI object, a position, and optional
  context.
- **`$provideTreeChildren`** - dispatched explicitly through
  `RequestRoutingHandler` before the generic `$provide[A-Z]` regex fires.
  Tree-data provider calls are keyed on a `viewId`, not on a language feature
  handle, so they require a separate code path.
- **`InitializeExtensionHost`** - Mountain's handshake that delivers extension
  manifest data, workspace folders, and configuration. Cocoon builds an
  extension registry and an activation-event index from this payload.
- **`$deltaExtensions`** - Mountain pushes incremental extension manifest
  changes. Cocoon updates its registry without reinitializing the host.
- **`$activateByEvent`** - Mountain requests lazy activation for a specific
  event string (e.g., `onLanguage:typescript`). Cocoon activates all
  registered extensions that declare that event without double-activating
  extensions already running.
- **`$startExtensionHost`** - Mountain signals that all initialization
  is complete and extensions may begin their `activate()` calls.
- **`$deltaWorkspaceFolders`** - incremental workspace folder updates.
- **`ExtHostCommands$ExecuteContributedCommand`** - VS Code-style proxied RPC
  that Mountain's CommandProvider uses to dispatch contributed extension
  commands. Parameters carry the command ID and its arguments array.
- **`ExtHostAuthentication$*`** - authentication surface calls return `null`
  gracefully. This keeps extensions that call
  `authentication.getSession()` during activation from throwing while a
  full provider registry is wired through Mountain.
- **`$shutdown`** - Mountain fires this on process teardown. Cocoon
  acknowledges the request and exits cleanly once the gRPC server closes.

Extension-provided handler errors (`$provide*`, `$resolve*`, `$get*`) are
downgraded from `stderr` to `stdout` so that Mountain's process classifier
does not elevate them to `warn:` lines. The error payload is still returned
to the caller over the wire; Mountain's renderer-side handlers (such as the
tree-view `getChildren` path) convert rejections into safe empty payloads.

---

## Handler Modules

Domain logic is separated from the gRPC transport layer into five handler
modules under `Source/Services/Handler/`:

- **`ExtensionHostHandler`** - handles the extension host lifecycle:
  `InitializeExtensionHost`, `$deltaExtensions`, `$activateByEvent`, and
  `$startExtensionHost`. Maintains the extension registry, the
  activation-event index, and the set of already-activated extensions to
  prevent double-activation.
- **`LanguageProviderHandler`** - handles all `$provide[A-Z]*` language
  feature invocations. Reads document content from the live
  `documentContentCache` so that language providers see the current text
  without a round-trip to Mountain.
- **`DocumentContentHandler`** - handles `$acceptModelChanged`,
  `$acceptModelOpen`, `$acceptModelClose`, and `$acceptModelSave`
  notifications. Keeps the `documentContentCache` synchronized with
  Mountain's document state so language providers always operate on
  current content.
- **`NotificationHandler`** - routes incoming Mountain notifications to the
  appropriate handler and emits `didOpenTextDocument`, `didChangeTextDocument`,
  `didCloseTextDocument`, and `didSaveTextDocument` events on the workspace
  event emitter so `vscode.workspace` API listeners receive them.
- **`RequestRoutingHandler`** - handles `service.method` patterns and
  special cases like `$provideTreeChildren`. Returns `undefined` for any
  method it does not own, which signals the router to continue to the next
  handler.

Handlers receive a `HandlerContext` object built with live property
descriptors over the service's private fields. This means handlers can read
and mutate service state (extension registry, document cache, mountain client
reference) without holding a direct reference to the service class.

---

## Bidirectional Streaming

In addition to the three unary RPC methods, `GRPCServerService` supports
bidirectional streaming connections. When a stream opens, Cocoon registers
it in a `streamingHandlers` set and begins a keepalive loop that sends a
`keepalive.ping` response every 10 seconds. The keepalive timer is cleared
automatically when the stream closes. Streaming requests are routed through
the same `routeRequest` logic as unary calls and responses are written back
onto the same stream.

Cocoon can broadcast an event to all active streaming connections via
`BroadcastEvent`. This is the mechanism Mountain uses for push notifications
that do not correspond to a specific pending request.

---

## Connection Reliability

Cocoon sets `setMaxListeners(0)` on both its own `EventEmitter` and the
workspace event emitter during construction. Extensions register one listener
per language client, webview panel, tree view, and file system provider. On
a typical project the listener count during boot easily exceeds Node's
default cap of 10, producing `MaxListenersExceededWarning` noise on stderr.
The unlimited cap removes this noise without masking genuine listener leaks.

Authentication is supported via the `MOUNTAIN_AUTH_TOKEN` environment
variable. When the variable is present Cocoon validates each incoming
request's metadata before dispatching it.

---

## DualTrack

Cocoon's `SendToMountain` method checks the `DualTrack` module before
forwarding any notification. `IsRustDeferralEnabled(method)` reads
environment variables (`Defer`, `Defer<DOMAIN>`, `Defer<METHOD>`) to decide
whether a given notification should cross the IPC boundary to Mountain or be
handled entirely in Node. When deferral is disabled for a method the
notification is dropped on the Cocoon side and a `node-bypass` line is
logged via `LogDualTrack`. Call sites see the same `Promise<void>` resolution
they always saw, so no extension or shim code changes are needed.

---

## Current Status

Cocoon builds and runs on macOS and Windows from a standard `cargo tauri dev`
invocation. The following reflects what is confirmed working versus what is
being extended.

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

**In progress:**
- Full `vscode.*` API surface coverage. The most commonly used APIs are
  implemented. Less common surfaces (notebooks, chat, language models) are not
  yet implemented, consistent with the `vscode.notebook.*`, `vscode.chat.*`,
  and `vscode.lm.*` sections of Cocoon's API shim.
- Bidirectional streaming event backpressure and high-frequency event stream
  validation.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Mountain: Native Kernel](/Doc/mountain)
- [Wind: Service Layer](/Doc/wind)
- [Vine: gRPC Protocol](/Doc/vine)
- [Source Code](https://github.com/CodeEditorLand/Cocoon)
