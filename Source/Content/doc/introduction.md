---
title: "Introduction"
section: "Start"
order: 0
description:
    "What Land is, what FIDDEE is, what is working today, what is not yet
    complete, and the architectural philosophy behind replacing the VS Code
    backend with Rust, Tauri, and Effect-TS."
---

Land is an open-source code editor that replaces the Electron/Node.js backend of
VS Code with a native Rust implementation running on Tauri, while keeping the
VS Code extension API intact through a TypeScript sidecar built with Effect-TS.
The product name for the compiled desktop application is **FIDDEE**; Land is the
repository and project name.

The core insight is that VS Code's platform independence was achieved by
implementing every OS operation - file I/O, terminal PTY management, native
dialogs, keychain access, clipboard - in a Node.js main process bridged through
JSON IPC. That architecture works, but it imposes a serialization round-trip on
every interaction and ties the editor's performance to the V8 garbage collector.
Land replaces the Node.js main process with Mountain (Rust/Tauri) and runs the
extension host through Cocoon (Node.js sidecar), keeping the API surface
identical while replacing the substrate underneath.

---

## What Land Is 🗺️

| Aspect          | Detail                                    |
| --------------- | ----------------------------------------- |
| Repository      | https://github.com/CodeEditorLand/Land    |
| Product name    | FIDDEE                                    |
| License         | CC0 Universal (public domain dedication)  |
| Organization    | CodeEditorLand, non-profit                |
| Lead maintainer | Nikola Hristov / PlayForm, Sofia Bulgaria |
| Funding         | NLnet NGI0 Commons Fund                   |

Land is not a fork of VS Code. It does not maintain a modified copy of the
`src/vs` codebase. The upstream VS Code repository is a Git submodule at
`Element/Dependency/Microsoft/Dependency/Editor` and is consumed as a
dependency: compiled, not edited. All custom code lives in the Land elements
themselves.

---

## Architectural Philosophy 🏛️

Three principles guide every design decision in Land.

**Replace the substrate, keep the API.** VS Code extensions represent millions
of lines of tested, working code. Throwing them away is not practical. Land
reimplements the `vscode` API in Cocoon using Effect-TS and routes OS-level
operations to Mountain through gRPC. Extensions that talk to the `vscode` API
continue to work; the host that dispatches their calls is fundamentally
different underneath.

**Move OS operations to native code.** File reads, terminal PTY writes, native
dialogs, clipboard access, and keychain operations all cross a process boundary
in VS Code. In Land they call `#[tauri::command]` Rust functions directly.
The round-trip is a Tauri IPC call over a local socket - no JSON serialization
through a Node.js event loop. The performance difference is measurable on every
interaction: reading a 1 MB file takes ~2 ms in Mountain versus ~200 ms through
the Electron/Node.js bridge.

**Composable abstractions over monolithic services.** Cocoon reimplements the
~40 VS Code workbench services as individual Effect-TS layers. Each service has
a defined lifecycle, explicit dependencies, and a testable interface. Wind
mirrors this for the UI service layer. The `ActionEffect` system in Common
allows effects to be composed, routed, and traced without coupling to any
specific runtime.

---

## What Is Working Today ✅

The current build is source-first. Core components are functional and the
weighted VS Code API coverage is approximately 88%.

| API Surface             | Coverage |
| ----------------------- | -------- |
| `TextEditor` object     | 95%      |
| `Workspace` API         | 96%      |
| SCM (source control)    | 95%      |
| `Window` API            | 95%      |
| LSP / Language features | 95%      |
| Overall weighted        | ~88%     |

The following capabilities are operational in the current build:

- Extension host bootstrap - Cocoon connects to Mountain via gRPC on port 50052
- File system operations - read, write, watch, stat, mkdir, rename, delete, clone
- Terminal PTY - create, resize, attach, detach, revive, freePortKill
- Clipboard - read, write, readText, writeText, readImage, triggerPaste
- Native dialogs - open, save, message box
- Encryption - AES-256-GCM encrypt/decrypt with a machine-stable key
- Shell command install/uninstall
- Extension manifest pre-bake - scan completes in under 50 ms (previously 1200 ms)
- All polling loops replaced with `tokio::sync::Notify` - no sleep-based boot races
- 25+ IPC handlers wired across `nativeHost:*`, `file:*`, `localPty:*`, `encryption:*`
- `TierIPC` routing - Mountain (Tauri IPC), `Node` (Cocoon only),
  `NodeDeferred` (Mountain first, Cocoon fallback), and per-subsystem overrides
  (`TierTerminal`, `TierSCM`, `TierAuth`)

---

## What Is Not Yet Complete ❌

> [!IMPORTANT] Public installers are not available. Building from source is the
> only supported path. See [Quickstart](https://Editor.Land/Doc/quickstart).

> [!WARNING] Windows and Linux support is in progress. The primary development
> and test platform is macOS (Apple Silicon and Intel). Building on other
> platforms may require additional steps not yet documented.

The following items remain in progress:

- Public signed installer packages - macOS `.dmg`, Windows installer, Linux packages
- Full Windows and Linux build validation across all profiles
- Real OAuth authentication backend - no live OAuth flow; Copilot and GitHub PR
  extensions cannot authenticate
- `registerWebviewPanelSerializer` - panel state is not restored across reloads
- Debug server/pipe adapters - only `executable` debug configuration type is
  supported beyond basic `type`
- S6 Mist WebSocket transport - Tauri IPC is the current path; WebSocket is
  planned for reduced latency on bulk operations
- Grove native WASM extension host - Wasmtime sandbox is work in progress for
  running WASM-compiled extensions without the Node.js sidecar

---

## Process Model Overview 📐

Land runs as a multi-process application with three concurrent processes plus an
optional daemon:

| Process           | Element        | Language             | Purpose                                                                  |
| ----------------- | -------------- | -------------------- | ------------------------------------------------------------------------ |
| Native Backend    | `Mountain`     | Rust (Tauri)         | Application lifecycle, OS operations, gRPC server, sidecar orchestration |
| Extension Host    | `Cocoon`       | TypeScript (Node.js) | VS Code extension execution, `vscode` API shim with Effect-TS            |
| UI Renderer       | `Wind` + `Sky` | TypeScript (WebView) | Editor UI rendering, ~40 workbench services, Astro page composition      |
| Background Daemon | `Air`          | Rust                 | Persistent sidecar for update downloads, indexing, cryptographic signing |

Mountain starts first, reads environment files, launches Cocoon as a child
process over gRPC, opens the WebView (Wind + Sky), and optionally spawns Air.
All IPC between processes uses the Vine protocol - gRPC with protobuf
serialization defined in `Element/Vine/Vine.proto`.

---

## Related Documentation 🔗

- [Architecture](https://Editor.Land/Doc/architecture) - full process model,
  component responsibilities, data flow
- [Why Rust](https://Editor.Land/Doc/why-rust) - justification for the native
  backend language
- [Why Tauri](https://Editor.Land/Doc/why-tauri) - why Electron was replaced
  as the desktop shell
- [Why Effect-TS](https://Editor.Land/Doc/why-effect-ts) - why Cocoon and Wind
  use Effect-TS for the TypeScript layer
- [Quickstart](https://Editor.Land/Doc/quickstart) - build and run in two steps

## Funding 💎

Land's development is funded by the **NLnet NGI0 Commons Fund**, a European
initiative supporting open-source infrastructure. The project is maintained by
**PlayForm** (Sofia, Bulgaria) as a non-profit effort. All code is dedicated to
the public domain under CC0 - no CLA required, no copyright assignment, no
restrictions on use.
