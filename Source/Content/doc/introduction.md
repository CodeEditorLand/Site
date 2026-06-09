---
title: Introduction
section: Start
order: 0
description:
    What Land is, what FIDDEE is, what is working today, and what is not yet
    complete.
---

Land is an open-source code editor built on Rust, Tauri, and TypeScript with
Effect-TS. The project implements a VS Code-compatible extension host inside a
native desktop shell, allowing existing VS Code extensions to run with high
fidelity while the underlying architecture is replaced with safer, more
composable primitives. FIDDEE is the product name for the compiled desktop
application; Land is the repository and project name.

## What Is Working Today

The current build is source-first. All core components are functional and the
weighted VS Code API coverage is approximately 88%.

| API Surface             | Coverage |
| ----------------------- | -------- |
| TextEditor object       | 95%      |
| Workspace API           | 96%      |
| SCM (source control)    | 95%      |
| Window API              | 95%      |
| LSP / Language features | 95%      |
| Overall weighted        | ~88%     |

The following capabilities are operational:

- Extension host bootstrap (Cocoon connects to Mountain via gRPC on port 50052)
- File system operations: read, write, watch, stat, mkdir, rename, delete, clone
- Terminal PTY: create, resize, attach, detach, revive, freePortKill
- Clipboard: read, write, readText, writeText, readImage, triggerPaste
- Native dialogs: open, save, message box
- Encryption: AES-256-GCM encrypt/decrypt with machine-stable key
- Shell command install/uninstall
- Extension manifest pre-bake: scan completes in under 50 ms (previously 1200
  ms)
- All polling loops replaced with `tokio::sync::Notify` - no sleep-based boot
  races
- 25+ IPC handlers wired: `nativeHost:*`, `file:*`, `localPty:*`, `encryption:*`
- TierIPC routing: Mountain (Tauri IPC), Node (Cocoon only), NodeDeferred
  (Mountain first, Cocoon fallback)

## What Is Not Yet Complete

> [!IMPORTANT] Public installers are not available. Building from source is the
> only supported path today. See [Quickstart](/doc/quickstart) for instructions.

> [!WARNING] Windows and Linux support is in progress. The primary development
> and test platform is macOS (Apple Silicon and Intel). Building on other
> platforms may require additional steps not yet documented.

The following items are still in progress:

- Public signed installer packages (macOS `.dmg`, Windows installer, Linux
  packages)
- Full Windows and Linux build validation
- Real OAuth authentication backend (no live OAuth flow; Copilot and GitHub PR
  extensions cannot authenticate)
- `registerWebviewPanelSerializer` - panel state is not restored across reloads
- Debug server/pipe adapters for all debug configuration types beyond
  `executable`
- S6 Mist WebSocket transport (Tauri IPC is the current path; WebSocket planned
  for performance)
- Grove native WASM extension host (Wasmtime host is work in progress)

## Project Identity

| Item            | Value                                     |
| --------------- | ----------------------------------------- |
| Repository      | github.com/CodeEditorLand/Land            |
| Product name    | FIDDEE                                    |
| License         | CC0 Universal (public domain)             |
| Organization    | CodeEditorLand, non-profit                |
| Lead maintainer | Nikola Hristov / PlayForm, Sofia Bulgaria |
| Funding         | NLnet NGI0 Commons Fund                   |

## Next Steps

- [Quickstart](/doc/quickstart) - build and run in two steps
- [Architecture](/doc/architecture) - how Mountain, Cocoon, Sky, and Wind fit
  together
- [Project Structure](/doc/project-structure) - the Element monorepo layout
