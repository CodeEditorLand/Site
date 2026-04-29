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

- **Cocoon as client (port 50051)** — Cocoon dials Mountain to send
  notifications and fire events back into the kernel (file-open, diagnostics
  push, tree-view refresh).
- **Cocoon as server (port 50052)** — Mountain dials Cocoon to invoke extension
  host methods (`InitializeExtensionHost`, `$activateByEvent`, `$provideHover`,
  `$provideCompletionItems`, etc.) and to deliver workspace notifications
  (`$acceptModelChanged`, `didOpenTextDocument`).

The server surface is implemented in `GRPCServerService` using
`@grpc/grpc-js 1.14.3`. It supports unary RPC and bidirectional streaming.
A keepalive ping runs every 10 seconds on active streams.

---

## Request Routing

When Mountain calls into Cocoon, `GRPCServerService` routes the method through
five dedicated handler modules:

| Handler | Responsibility |
|---|---|
| `ExtensionHostHandler` | Extension host lifecycle: `InitializeExtensionHost`, `$deltaExtensions`, `$activateByEvent`, `$startExtensionHost` |
| `LanguageProviderHandler` | Language feature invocations: `$provideHover`, `$provideCompletionItems`, `$provideDefinition`, `$provideReferences`, and related |
| `DocumentContentHandler` | Document content mirror — receives `$acceptModelChanged` from Mountain and caches text per URI for language providers |
| `NotificationHandler` | Routes `SendMountainNotification` payloads and emits workspace events to the `vscode.workspace` shim |
| `RequestRoutingHandler` | Pattern-matched service dispatch: `extension.*`, `configuration.*`, `tree.*`, `webview.*`, `performance.*`, `security.*` |

The routing table in `RequestRoutingHandler` is regex-keyed so new service
prefixes can be added without modifying the main dispatcher. Tree-view
providers are keyed by stable `viewId` (from the extension manifest's
`contributes.views` entry) so Mountain and Cocoon share the same identifier
without negotiating handles.

---

## How Extension Activation Works

VS Code's original extension host activates extensions sequentially on a single
event loop. A slow activation handler — a network fetch, a large file parse,
a long type-check — delays every extension behind it.

Cocoon uses a tiered activation model called `TierExtensionActivation`. When
the editor starts, Cocoon reads all installed extension manifests and groups
them by activation tier. It then dispatches activation using a pool of 8
concurrent workers (`Parallel8`). On a 47-extension workload on Apple Silicon
macOS, total activation completes in approximately 3 seconds from launch —
the same order of magnitude as VS Code on the same hardware.

Each extension runs inside its own fiber scope. If one extension's activation
hangs on an unresolved Promise, other extensions' fibers continue running
unaffected. A synchronous CPU-bound loop inside an extension will still occupy
its fiber thread for the duration of that loop — fiber isolation does not
preempt synchronous work. What it prevents is one extension's asynchronous
stall propagating to all others.

---

## API Coverage

Cocoon implements the core VS Code Extension API. The following namespaces are
verified working:

| Namespace | Status |
|---|---|
| `workspace.fs.*` | Working |
| `workspace.findFiles` | Working |
| `window.createTerminal` | Working |
| `window.createTreeView` | Working — keyed by `viewId` |
| `window.createWebviewPanel` | Working |
| `window.registerWebviewViewProvider` | Working |
| `window.registerCustomEditorProvider` | Working |
| `languages.register*Provider` | Working |
| `commands.executeCommand` | Working |
| `commands.registerCommand` | Working |
| `debug.startDebugging` | Working (via Mountain DAP bridge) |
| `vscode.tasks.*` | Partial — task resolver active, advanced task types in progress |
| `vscode.lm.*` | Not implemented |
| `vscode.chat.*` | Not implemented |
| `vscode.notebook.*` | Not implemented |
| `vscode.tests.*` | Not implemented |

Extensions that depend on unimplemented namespaces activate successfully;
the relevant features produce no results without throwing an error at
activation time.

---

## Effect-TS and the Fiber Runtime

Effect-TS provides the concurrency model inside Cocoon. Each extension's API
calls are modelled as typed Effects rather than raw Promises. This gives Cocoon
three capabilities that the original VS Code extension host does not have:

- **Interruption** — an in-flight Effect can be cancelled when its scope is
  closed (e.g. when an extension is deactivated or the editor window closes).
- **Supervision** — fiber scopes are supervised. If a child fiber fails
  unexpectedly, the parent scope can restart it or propagate the failure
  without taking down the entire process. Language server crash recovery
  is modelled and enforced by this supervisor architecture.
- **Tracing** — Effects carry structured trace spans, making it possible to
  profile which extension call is consuming time without instrumenting each
  extension individually.

Extensions do not need to know any of this. They write standard `async/await`
and `Thenable`-based code. The Effect layer is internal to Cocoon.

---

## Current Limitations

- **`vscode.lm.*`, `vscode.chat.*`, `vscode.notebook.*`, `vscode.tests.*`**
  are not yet implemented. Extensions that use these APIs (GitHub Copilot,
  Jupyter, test runners) will activate but those specific features will not
  function.
- **`vscode.tasks.*`** is partially implemented. The standard task resolver
  is active; advanced task types and full provider integration are in progress.
- **Linux** is not yet supported. Cocoon runs on any platform Node.js supports,
  but the Mountain process it depends on does not yet run on Linux.
  macOS and Windows are both supported today.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Mountain: Native Kernel](/Doc/mountain)
- [Vine: Wire Protocol](/Doc/vine)
- [Extension Development](/Doc/extension-development)
- [Source Code](https://github.com/CodeEditorLand/Cocoon)
