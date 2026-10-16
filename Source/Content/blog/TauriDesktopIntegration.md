---
title: "Tauri Desktop Integration in Land"
summary: "How Mountain uses Tauri for a native editor shell without bundling
    Chromium."
publishedAt: "2026-04-02"
tags: ["Tauri", "Rust", "Desktop", "Architecture"]
author: "CodeEditorLand"
readTime: 4
---

# Tauri Desktop Integration in [Land](https://github.com/CodeEditorLand/Land)

Code Editor Land uses `Tauri` through the [`Mountain`](https://github.com/CodeEditorLand/Mountain) element. `Tauri` lets the
editor use the operating system WebView instead of bundling Chromium, while
[`Mountain`](https://github.com/CodeEditorLand/Mountain) keeps native services in `Rust`.

The source-backed claim is architectural: no bundled Chromium in the `Tauri`
desktop path, native `Rust` service code in [`Mountain`](https://github.com/CodeEditorLand/Mountain), and configured targets
for multiple operating systems. Published size, memory, and startup numbers
require a repeatable benchmark run against a defined project and machine
configuration.

## The Electron Problem

VS Code with a medium project uses hundreds of megabytes of RAM, and each open
window carries its own Chromium renderer process with a full heap. Every OS
interaction crosses a serialized JSON IPC pipe. Exact memory and latency
figures depend on the machine and project state; they are not published
benchmark numbers.

Tauri replaces the Electron shell with a native binary that delegates rendering
to the OS WebView: WKWebView on macOS, WebView2 on Windows, WebKitGTK on Linux.
The result is a smaller binary, less memory, and direct FFI access to native
operations.

## [Mountain](https://github.com/CodeEditorLand/Mountain): The Tauri Application

[`Mountain`](https://github.com/CodeEditorLand/Mountain) implements the Tauri application lifecycle. Its startup path is
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
- **Services**: Starts the [`Vine`](https://github.com/CodeEditorLand/Vine) gRPC server and spawns [`Cocoon`](https://github.com/CodeEditorLand/Cocoon) before the
  Tauri event loop takes over the desktop session.

## ApplicationRunTime and Effects

[`Mountain`](https://github.com/CodeEditorLand/Mountain) implements the abstract service traits from [`Common`](https://github.com/CodeEditorLand/Common) through the
`ActionEffect` system. Business logic is described as declarative, composable
effects, executed by a central `ApplicationRunTime`. This replaces the typical
async/await sprawl with a structured execution model where error channels are
typed and resource cleanup is deterministic.

Key [`Mountain`](https://github.com/CodeEditorLand/Mountain) modules:

| Module                | Role                                                                                                                          |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `ApplicationRunTime`  | Effect execution engine (ApplicationRunTime, Execute, graceful Shutdown)                                                      |
| `ApplicationState`    | Thread-safe state machine with DTOs, persistence, recovery, feature state                                                     |
| `Environment/*`       | Concrete implementations of Common provider traits (filesystem, documents, terminal, etc.)                                    |
| `Track`               | Central request dispatcher routing frontend and sidecar commands into ActionEffects                                           |
| `Vine/*`              | gRPC IPC layer: server, client, multiplexer, generated protobuf bindings                                                      |
| `ExtensionManagement` | Extension discovery, manifest parsing, VSIX installation                                                                      |
| `ProcessManagement`   | Sidecar process lifecycle, Node.js binary resolution (nvm, fnm, asdf, volta, homebrew, shipped)                               |
| `Update`              | Application self-updating via Tauri bundled updater and optional [Air](https://github.com/CodeEditorLand/Air) gRPC delegation |

## IPC: Two Layers, Two Jobs

The editor has two independent IPC paths:

**[Sky](https://github.com/CodeEditorLand/Sky) and [Wind](https://github.com/CodeEditorLand/Wind) to [Mountain](https://github.com/CodeEditorLand/Mountain) - Tauri IPC**

[`Sky`](https://github.com/CodeEditorLand/Sky)'s UI and [`Wind`](https://github.com/CodeEditorLand/Wind) service layer call [`Mountain`](https://github.com/CodeEditorLand/Mountain) through Tauri IPC. The
implementation lives in [`Source/IPC/TauriIPCServer.rs`](https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/TauriIPCServer.rs), including the
`mountain_ipc_receive_message` and `mountain_ipc_get_status` entry points. This
path handles native work: files, terminals, clipboard, search, configuration,
and workbench events.

**[Mountain](https://github.com/CodeEditorLand/Mountain) to [Cocoon](https://github.com/CodeEditorLand/Cocoon) - [Vine](https://github.com/CodeEditorLand/Vine) gRPC**

[`Mountain`](https://github.com/CodeEditorLand/Mountain) and [`Cocoon`](https://github.com/CodeEditorLand/Cocoon) communicate over a bidirectional gRPC channel described
by [`Vine`](https://github.com/CodeEditorLand/Vine) proto files. [`Mountain`](https://github.com/CodeEditorLand/Mountain)'s gRPC server listens on port 50051; [`Cocoon`](https://github.com/CodeEditorLand/Cocoon)'s
gRPC server listens on port 50052. [`Mountain`](https://github.com/CodeEditorLand/Mountain) owns the Rust-side services and
[`Cocoon`](https://github.com/CodeEditorLand/Cocoon) owns the TypeScript-side extension-host services. The protocol covers
extension-host startup, document notifications, language providers, tree views,
command execution, cancellation, and streaming routes.

[`Mist`](https://github.com/CodeEditorLand/Mist) handles DNS isolation and secure service-boundary code. It is not a
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
> [`Maintain/Debug/Build.sh`](https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Debug/Build.sh) profile runner and Node 24. See the current
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
./Maintain/Release/Build.sh --profile release-electron-bundled
```

## NLnet Funding

This work is funded through the
[NGI0 Commons Fund](https://nlnet.nl/commonsfund/), established by
[NLnet](https://nlnet.nl) with financial support from the European Commission's
Next Generation Internet program, and is developed by [PlayForm](https://PlayForm.Cloud).
