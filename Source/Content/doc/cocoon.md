---
title: "Cocoon"
section: "Element"
order: 12
description: "The Node.js extension host that runs VS Code extensions via an Effect-TS fiber runtime."
---

# Cocoon

Cocoon is the extension host for Editor.Land. It is a Node.js process that
loads and runs VS Code extensions by implementing the `vscode.*` API surface
on top of an [Effect-TS](https://effect.website) fiber runtime. Extensions call
`vscode.workspace.openTextDocument()`, `vscode.window.createTerminal()`, and
the rest of the documented API and receive the same `Thenable<T>` return types
they expect. Internally those calls are typed Effects running on a supervised
fiber scheduler.

Cocoon communicates with Mountain (the Rust kernel) over gRPC using the Vine
protocol. Every API call that requires native OS access — file reads, terminal
spawn, DAP bridge — crosses that gRPC boundary into Mountain.

---

## How Extension Activation Works

VS Code's original extension host activates extensions sequentially on a single
event loop. A slow activation handler (network fetch, large file parse, long
type-check) delays every extension behind it.

Cocoon uses a tiered activation model called `TierExtensionActivation`. When
the editor starts, Cocoon reads all installed extension manifests and groups
them by activation tier. It then dispatches activation using a pool of 8
concurrent workers (`Parallel8`). On a 47-extension workload on Apple Silicon
macOS, this brings total activation time to approximately 3 seconds from
launch — the same order of magnitude as VS Code on the same hardware.

Each extension runs inside its own fiber scope. If one extension's activation
hangs on an unresolved Promise, other extensions' fibers continue running
unaffected. A synchronous CPU-bound loop inside an extension will still occupy
its fiber thread for the duration of that loop — fiber isolation does not
preempt synchronous work. What it prevents is one extension's asynchronous
stall propagating to all others.

---

## API Coverage

Cocoon implements the core VS Code Extension API. The following namespaces are
verified working in the `debug-mountain` profile:

| Namespace | Status |
|---|---|
| `workspace.fs.*` | Working |
| `workspace.findFiles` | Working |
| `window.createTerminal` | Working |
| `languages.register*Provider` | Working |
| `commands.executeCommand` | Working |
| `debug.startDebugging` | Working (via Mountain DAP bridge) |
| `vscode.tasks.*` | Partial — task resolver not yet complete |
| `vscode.lm.*` | Not implemented |
| `vscode.chat.*` | Not implemented |
| `vscode.notebook.*` | Not implemented |
| `vscode.tests.*` | Not implemented |

Extensions that depend on unimplemented namespaces will activate successfully
but the relevant features will silently produce no results. There is no error
thrown at activation time.

---

## Effect-TS and the Fiber Runtime

Effect-TS provides the concurrency model inside Cocoon. Each extension's API
calls are modelled as typed Effects rather than raw Promises. This gives Cocoon
three capabilities that the original VS Code extension host does not have:

- **Interruption** — an in-flight Effect can be cancelled if its scope is
  closed (e.g. when an extension is deactivated or the editor window closes).
- **Supervision** — fiber scopes are supervised. If a child fiber fails
  unexpectedly, the parent scope can restart it or propagate the failure
  without taking down the entire process.
- **Tracing** — Effects carry structured trace spans, which makes it possible
  to profile which extension call is taking time without instrumenting each
  extension individually.

Extensions do not need to know any of this. They write standard `async/await`
and `Thenable`-based code. The Effect layer is internal to Cocoon.

---

## Current Limitations

- **`vscode.lm.*`, `vscode.chat.*`, `vscode.notebook.*`, `vscode.tests.*`**
  are not yet implemented. Extensions that use these APIs (GitHub Copilot,
  Jupyter, test runners) will activate but those specific features will not
  function.
- **`vscode.tasks.*`** is partially implemented. The workbench task resolver
  that connects task definitions to Mountain's process management is not yet
  complete.
- **macOS only.** Cocoon runs on any platform Node.js supports, but the
  Mountain process it depends on currently only runs on macOS. A Cocoon
  process without Mountain cannot fulfil file system, terminal, or debug
  API calls.
- **Language server crash recovery** is modelled in the Effect-TS supervisor
  architecture but has not been independently verified in agent run logs.
  Treat this as designed but unconfirmed in production.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Mountain: Native Kernel](/Doc/mountain)
- [Vine: Wire Protocol](/Doc/vine)
- [Extension Development](/Doc/extension-development)
- [Source Code](https://github.com/CodeEditorLand/Cocoon)
