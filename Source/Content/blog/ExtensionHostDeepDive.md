---
title:
    "Extension Host Architecture: Cocoon's Design for Module Interception, API
    Shims, and Fiber Supervision"
summary: "How Cocoon runs VS Code extensions in supervised Effect-TS fibers with
    module interception and gRPC-backed API shims."
publishedAt: "2026-05-23"
tags: ["Extensions", "Cocoon", "Effect-TS", "Architecture", "Modules"]
author: "CodeEditorLand"
readTime: 10
---

# Extension Host Deep Dive: Cocoon Architecture

VS Code's extension host runs on a single Node.js event loop. One hung Promise
blocks every other extension. There is no way to cancel an in-flight operation,
no back-pressure, and no preemption. Cocoon solves this by running each
extension in its own supervised Effect-TS fiber.

## What Cocoon Is

Cocoon is a Node.js sidecar process spawned and managed by Mountain. It provides
a comprehensive VS Code Extension Host API surface so existing extensions run
unmodified. All communication with Mountain happens over gRPC through the Vine
protocol.

The key distinction: Cocoon does not ask extension authors to change their code.
Extensions written for VS Code call `require('vscode')` and get back an API
object. Cocoon builds that object from Effect-TS services.

## Bootstrap Sequence

The entry point is `Bootstrap/Implementation/Cocoon/Main.ts`. It composes all
Effect-TS layers into the master `AppLayer`:

```
PatchProcess -> Effect/Bootstrap -> IpcProvider -> AppLayer -> ExtensionHost
```

`PatchProcess` runs first and is non-negotiable. Before any other code executes,
it:

- Patches `process.exit` so extensions cannot kill the host
- Captures `SIGTERM`, `SIGINT` for graceful shutdown
- Redirects `stdout` and `stderr` to Mountain via the established channel
- Sets up uncaught exception and unhandled rejection handlers
- Monitors the parent Mountain process PID; if it exits, Cocoon terminates
  automatically

After hardening, `Effect/Bootstrap.ts` coordinates the initialization stages in
order:

1. Environment detection (OS, Node version, platform data)
2. Configuration loading
3. RPCServer startup - Cocoon binds its gRPC port (Phase 2, fixed 2026-05-22)
4. MountainConnection - connects outbound to Mountain's Vine server (Phase 3)
5. Module interceptor installation
6. Extension registry population
7. Health check setup

The ordering of steps 3 and 4 matters. Previously these were reversed: Cocoon
attempted the outbound Mountain connection before its own gRPC port was bound.
Mountain's 30-second gRPC connection budget expired waiting for a port that
was not yet listening. The fix ensures `RPCServer` is up before
`MountainConnection` fires.

When the gRPC connection to Mountain's Vine server succeeds, Cocoon sends the
`$initialHandshake` notification and waits for `initExtensionHost` to return
with the initialization payload. That payload contains workspace info, extension
lists, configuration, and feature flags.

## Module Interception System

When an extension calls `require('vscode')`, Cocoon intercepts the module
request before the extension code ever sees the module. This is the core
compatibility mechanism.

The `RequireInterceptor.ts` module patches both CommonJS `require()` and ESM
`import` at Node.js module resolution level. The interception flow:

1. Extension calls `require('vscode')` or `import 'vscode'`.
2. The interceptor detects the vscode module pattern.
3. It requests an API instance from `ApiFactory` for the calling extension.
4. `ApiFactory` creates an isolated vscode API object wired through Effect-TS
   services.
5. The interceptor returns this instance to the extension.

Each extension gets its own API object. One extension's API calls do not
interfere with another's state. This instance isolation prevents the global
state pollution that plagues shared extension hosts.

The VS Code upstream uses a similar pattern in
`src/vs/workbench/api/common/extHostRequireInterceptor.ts`. Cocoon's
implementation extends it with ESM interception, which VS Code does not support.

## API Factory and Service Shims

`Services/API/Factory/Service.ts` constructs the vscode API object that
extensions receive. Every method is wired through the Effect-TS service stack,
not through raw callbacks.

The service layer implements VS Code extension host interfaces as Effect-TS
`Layer`s:

| VS Code Service     | Cocoon Implementation | VS Code Upstream Reference |
| ------------------- | --------------------- | -------------------------- |
| `vscode.commands`   | `CommandsProvider`    | `IExtHostCommands`         |
| `vscode.workspace`  | `WorkspaceProvider`   | `IExtHostWorkspace`        |
| `vscode.window`     | `WindowProvider`      | `IExtHostWindow`           |
| `vscode.extensions` | `ExtensionProvider`   | `IExtHostExtensions`       |
| `vscode.languages`  | `LanguageProvider`    | `IExtHostLanguages`        |

Each provider is an Effect-TS service. This means every API call carries typed
error information, resource cleanup guarantees, and dependency declarations in
its function signature. An API method cannot silently swallow an error or forget
a dependency.

## Walking an API Call

When an extension calls `vscode.window.showInformationMessage("Hello")`:

1. The extension's `vscode` object is the instance created by `ApiFactory`.
2. `showInformationMessage` is implemented by `WindowProvider`.
3. `WindowProvider` creates an Effect that serializes the message into a
   gRPC-compatible format and sends a `ShowMessageRequest` to Mountain via
   `Services/Mountain/gRPC/Client.ts`.
4. The request flows through the bidirectional gRPC channel to Mountain's Vine
   server.
5. Mountain's `Track` dispatcher routes the request to the native dialog
   handler.
6. Mountain displays a native OS information dialog and waits for user
   interaction.
7. The user's choice flows back: Mountain -> gRPC -> Cocoon -> WindowProvider ->
   extension promise resolution.

Total latency for this flow breaks down as approximately 0.42ms of processing
overhead plus network latency and Mountain processing time.

## Extension Host Service and Fiber Supervision

`Services/Extension/Host/Service.ts` manages extension activation and lifecycle.
The key design decision: each extension runs in its own supervised fiber.

Effect-TS fibers are lightweight, preemptible execution units managed by the
runtime scheduler. When an extension is activated:

1. A new `Scope` is created for that extension.
2. The extension's `activate()` function runs inside this scope as a supervised
   Effect.
3. All resources acquired during activation (file handles, network connections,
   spawned processes) are registered with the scope.

If an extension crashes:

1. The fiber is interrupted.
2. The `Scope` runs deterministic cleanup: every registered resource is
   released.
3. The supervisor logs the error and reports it to Mountain.
4. Other extensions continue running unaffected.

This is fundamentally different from the VS Code model where unhandled
exceptions in one extension can cause cascading failures.

## gRPC Communication: Client and Server

Cocoon maintains a dual gRPC presence:

**`Services/Mountain/gRPC/Client.ts`** provides Effect-wrapped methods for
calling Mountain back. The interface groups operations into logical categories:

- `window` operations (dialogs, notifications, status bar)
- `workspace` operations (file system, configuration, workspace folders)
- `commands` operations (registration, execution, keybindings)
- `secrets` operations (secure credential storage)

**`Services/gRPC/Server/Service.ts`** implements Cocoon's side of the Vine
protocol. It handles incoming requests from Mountain with bidirectional
streaming for real-time event communication. Incoming requests are delegated to
domain-specific handler modules: `ExtensionHostHandler`,
`LanguageProviderHandler`, `NotificationHandler`, and `RequestRoutingHandler`.

The protocol supports request batching (aggregating small requests into batched
operations), connection resiliency (automatic reconnection with exponential
backoff), and request queuing during connection outages.

## Type Conversion

VS Code types like `Range`, `Position`, `URI`, `Dialog`, `TreeView`, `Webview`,
`Task`, and `WorkspaceEdit` cannot be serialized naively across a process
boundary. The `TypeConverter/` module provides pure conversion functions that
transform each rich type into a plain DTO suitable for gRPC transport.

Each conversion path is documented and tested. The converter organizes itself by
feature domain: `Main` (URI, Range), `Dialog`, `TreeView`, `Webview`, `Task`,
and `WorkspaceEdit`.

## Code Generation Pipeline

Cocoon includes a `Codegen/` pipeline that walks the VS Code extension-host
source subtree and emits `IExtHost*Upstream` schemas grounded in real upstream
definitions. This reuses Wind's extractor and resolver infrastructure. The
generated schemas ensure that Cocoon's API shims stay aligned with actual VS
Code extension-host types, reducing drift as VS Code evolves.

This is a practical response to a real problem: VS Code's extension host API
changes between versions. Without automated schema generation, manual shim
updates would lag behind and introduce compatibility gaps.

## What Works and What Does Not

Weighted coverage across the actively measured `vscode.*` namespaces is
approximately 88%:

| Namespace                    | Coverage |
| ---------------------------- | -------- |
| `vscode.window` (TextEditor) | ~95%     |
| `vscode.workspace`           | ~96%     |
| `vscode.scm`                 | ~95%     |
| `vscode.window` (overall)    | ~95%     |
| `vscode.languages` / LSP     | ~95%     |

Source-backed compatibility today:

- Core extension activation and lifecycle
- Commands, workspace, window, terminals, webviews, language providers,
  diagnostics, output channels, and document events
- ESM module interception (beyond what VS Code's own extension host supports)
- Typed error handling and resource cleanup through Effect-TS fibers
- File system event notifications: `$acceptDidCreateFiles`,
  `$acceptDidDeleteFiles`, and `$acceptDidRenameFiles` fired to Cocoon on
  underlying operation completion
- Encrypted secret storage (`encryption:encrypt` / `encryption:decrypt`) using
  AES-256-GCM with a machine-stable key derived from the hardware UUID
- File descriptor table (`file:open`, `file:close`) and file watcher
  registration (`file:watch`, `file:unwatch`)
- Expanded PTY handlers: `localPty:attachToProcess`,
  `localPty:detachFromProcess`, `localPty:reviveTerminalProcesses`,
  `localPty:freePortKillProcess`
- Terminal shell integration: OSC 633 sequence handling end-to-end
- Fifteen-plus `nativeHost:*` handlers covering clipboard, dialog, environment
  paths, process management, shell command installation, and window control

Partial (implemented but not fully exercised in all code paths):

- `activeDebugSession` and `breakpoints` live getters
- `executeTask` with task lifecycle events
- Inline completion provider registration (Copilot inline completions path)

Not yet implemented:

- `vscode.lm.*` (language model API)
- `vscode.chat.*` (chat API)
- `vscode.notebook.*` (notebook API)
- `vscode.tests.*` (testing API)

Extensions using these APIs activate but the specific features silently no-op. A
public extension validation matrix naming specific extensions, versions,
platforms, and exercised APIs is pending.

## The Architecture Decision: Effect-TS Over Traditional OOP

VS Code's extension host uses traditional object-oriented service instantiation.
Cocoon uses Effect-TS Layer composition. The difference is not cosmetic:

| Aspect               | VS Code Approach   | Cocoon Approach    | Result                     |
| -------------------- | ------------------ | ------------------ | -------------------------- |
| Dependency injection | Service collection | Effect-TS Layers   | Compile-time guarantees    |
| Error handling       | try/catch          | Effect error types | No swallowed errors        |
| Async operations     | Promises           | Effect pipelines   | Cancellable, preemptible   |
| Service composition  | Instantiation      | Layer composition  | Deterministic availability |

The Effect-TS approach shifts correctness from runtime testing to compile-time
verification. When a service tag is renamed or an interface changes, the
compiler fails at every consuming site. This is expensive to adopt but pays for
itself in refactoring safety.
