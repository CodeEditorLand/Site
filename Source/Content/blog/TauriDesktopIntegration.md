---
title: "Tauri Desktop Integration in Land"
summary:
    "How Mountain uses Tauri for a native editor shell without bundling
    Chromium."
publishedAt: "2026-04-02"
tags: ["Tauri", "Rust", "Desktop", "Architecture"]
author: "CodeEditorLand"
readTime: 5
---

# Tauri Desktop Integration in Land

Code Editor Land uses `Tauri` through the `Mountain` element. `Tauri` lets the
editor use the operating system WebView instead of bundling Chromium, while
`Mountain` keeps native services in `Rust`.

The source-backed claim is architectural: no bundled Chromium in the `Tauri`
desktop path, native `Rust` service code in `Mountain`, and configured targets
for multiple operating systems. Public size, memory, and startup comparisons
should come from a repeatable benchmark.

## The Electron Problem

VS Code with a medium project uses 500 MB to 1.5 GB of RAM. Three open windows
means three Chromium renderer processes, each carrying a full heap. Every OS
interaction crosses a serialized JSON IPC pipe. Where Electron takes 200 ms to
open a dialog, Mountain takes 2.

Tauri replaces the Electron shell with a native binary that delegates rendering
to the OS WebView: WKWebView on macOS, WebView2 on Windows, WebKitGTK on Linux.
The result is a smaller binary, less memory, and direct FFI access to native
operations.

## Mountain: The Tauri Application

`Mountain` implements the Tauri application lifecycle. Its startup path is
organized around build, registration, initialization, and services:

```text
main.rs -> Binary::Main -> Build -> Register -> Initialize -> Services
```

- **Build**: Configures the Tauri application with window settings, custom
  schemes (`land:`, `vscode-file:`, `vscode-webview:`), and security policies.
- **Register**: Wires Tauri commands and IPC handlers for filesystem, terminal,
  clipboard, search, configuration, and workbench events.
- **Initialize**: Prepares runtime state -- the thread-safe `ApplicationState`
  struct that serves as the single source of truth.
- **Services**: Starts the `Vine` gRPC server and spawns `Cocoon` before the
  Tauri event loop takes over the desktop session.

## ApplicationRunTime and Effects

`Mountain` implements the abstract service traits from `Common` through the
`ActionEffect` system. Business logic is described as declarative, composable
effects, executed by a central `ApplicationRunTime`. This replaces the typical
async/await sprawl with a structured execution model where error channels are
typed and resource cleanup is deterministic.

Key `Mountain` modules:

| Module                | Role                                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------- |
| `ApplicationRunTime`  | Effect execution engine (ApplicationRunTime, Execute, graceful Shutdown)                        |
| `ApplicationState`    | Thread-safe state machine with DTOs, persistence, recovery, feature state                       |
| `Environment/*`       | Concrete implementations of Common provider traits (filesystem, documents, terminal, etc.)      |
| `Track`               | Central request dispatcher routing frontend and sidecar commands into ActionEffects             |
| `Vine/*`              | gRPC IPC layer: server, client, multiplexer, generated protobuf bindings                        |
| `ExtensionManagement` | Extension discovery, manifest parsing, VSIX installation                                        |
| `ProcessManagement`   | Sidecar process lifecycle, Node.js binary resolution (nvm, fnm, asdf, volta, homebrew, shipped) |
| `Update`              | Application self-updating via Tauri bundled updater and optional Air gRPC delegation            |

## IPC: Two Layers, Two Jobs

The editor has two independent IPC paths:

**Sky and Wind to Mountain - Tauri IPC**

`Sky`'s UI and `Wind` service layer call `Mountain` through Tauri IPC. The
implementation lives in `Source/IPC/TauriIPCServer.rs`, including the
`mountain_ipc_receive_message` and `mountain_ipc_get_status` entry points. This
path handles native work: files, terminals, clipboard, search, configuration,
and workbench events.

**Mountain to Cocoon - Vine gRPC**

`Mountain` and `Cocoon` communicate over a bidirectional gRPC channel described
by `Vine` proto files. `Mountain` owns the Rust-side services and `Cocoon` owns
the TypeScript-side extension-host services. The protocol covers extension-host
startup, document notifications, language providers, tree views, command
execution, cancellation, and streaming routes.

`Mist` handles DNS isolation and secure service-boundary code. It is not a
universal transport for all editor traffic.

## Platform Targets

The repository contains Tauri configuration for macOS, Windows, Linux, iOS, and
Android. A configured target is not the same as a published installer or
verified release artifact. Today:

| Platform | Status                                                               |
| -------- | -------------------------------------------------------------------- |
| macOS    | Primary development target, Tauri bundle path active                 |
| Windows  | Tauri configuration exists, including WebView2 bootstrapper settings |
| Linux    | Tauri configuration exists, integration needs release validation     |
| iOS      | Tauri mobile configuration exists                                    |
| Android  | Tauri mobile configuration exists                                    |

## Build Commands

> **Updated 2026-05-29** - The build system has moved to the
> `Maintain/Debug/Build.sh` profile runner and Node 24. See the current
> [Installation guide](https://Editor.Land/Doc/installation) for up-to-date
> steps.

The development build:

```bash
./Maintain/Debug/Build.sh --profile debug-electron-bundled
```

For a lighter iteration build:

```bash
./Maintain/Debug/Build.sh --profile debug-mountain
```

For production:

```bash
./Maintain/Release/Build.sh --profile production-electron-bundled
```

## NLnet Funding

This work is funded through the
[NGI0 Commons Fund](https://nlnet.nl/commonsfund/) (grant No. 101135429),
operated by PlayForm under the NLnet Foundation.
