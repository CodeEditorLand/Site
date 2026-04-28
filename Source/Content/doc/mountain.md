---
title: "Mountain"
section: "Element"
order: 11
description: "The Rust + Tauri native kernel that replaces Electron's main process in Editor.Land."
---

# Mountain

Mountain is the native Rust kernel of Editor.Land. It is a
[Tauri](https://tauri.app) desktop application that replaces Electron's main
process entirely. The operating system's own WebView renders the editor UI:
WKWebView on macOS. Mountain handles everything that requires native OS access
so that the extension host (Cocoon) and the workbench UI (Sky) do not.

---

## Responsibilities

Mountain owns the following concerns:

- **File system** - all `vscode.workspace.fs.*` calls route through Mountain's
  Rust file system layer via Tauri IPC. Cached reads return at approximately
  8 ms p99 latency; cold reads at approximately 60 ms p99 on Apple Silicon.
- **gRPC server** - Mountain runs the server side of the Vine protocol,
  accepting connections from Cocoon (the extension host) over a local gRPC
  socket.
- **Terminal (pty)** - Mountain spawns and manages pseudo-terminals for
  `window.createTerminal`. Each pty runs as a child process under Mountain's
  supervision.
- **DAP bridge** - `debug.startDebugging` is routed through Mountain, which
  acts as a Debug Adapter Protocol proxy between Sky and the language-specific
  debug adapter.
- **IPC broker** - Mountain is the single point through which Sky (the
  WKWebView UI) and Cocoon (the Node extension host) exchange typed events.
  All Sky↔Mountain communication uses Tauri's typed IPC. All
  Mountain↔Cocoon communication uses gRPC over Vine.
- **Echo host** - The work-stealing task scheduler (Echo) is embedded inside
  Mountain's Rust binary. Echo dispatches parallel jobs such as file indexing
  and search within the Mountain process.

---

## Why Tauri Instead of Electron

Electron ships a bundled Chromium alongside every application. Each open window
creates a new renderer process with its own heap. On a typical macOS session
with a medium project, VS Code uses between 500 MB and 1.5 GB of RAM across
its six concurrent processes: main, renderer, extension host, pty host, file
watcher, and shared process.

Tauri uses the WebView the operating system already provides. No Chromium is
bundled. Mountain currently runs as two processes - Mountain (Rust) and Cocoon
(Node) - instead of six. On the same 47-extension workload measured on Apple
Silicon macOS, the total RSS is approximately **600 MB** (Mountain ~280 MB,
Cocoon ~320 MB), compared to approximately **810 MB** for VS Code. That is
around a 25% reduction, not a wholesale elimination of overhead. The remaining
cost is Cocoon: running the VS Code extension host requires a Node.js process
regardless of what the native kernel does.

---

## Verified Performance Numbers

All figures below are from profiler and build log output on Apple Silicon macOS
with 47 extensions loaded. Numbers will differ on other hardware.

| Metric | Mountain + Cocoon | VS Code | Notes |
|---|---|---|---|
| Cold-boot time | ~2,400 ms | ~2,500 ms | Measured from launch to first editor frame |
| Total RSS | ~600 MB | ~810 MB | 47 extensions, same workspace |
| Cached file read (p99) | ~8 ms | - | Tauri IPC + Rust FS cache |
| Cold file read (p99) | ~60 ms | - | No cache, first access |
| Extension activation | 47 manifests parallel | sequential | Cocoon `Parallel8` worker pool |

The largest remaining boot cost in Land is a sequential dynamic-import loop
that loads 3,385 workbench modules one at a time. Switching to a single bundled
module graph is projected to save ~550 ms. Lazy-spawning Cocoon after first
paint is projected to save a further ~200 ms, bringing projected cold-boot time
to approximately **1,650 ms**.

---

## Current Limitations

- **macOS only.** WKWebView integration is complete. WebView2 (Windows) and
  WebKitGTK (Linux) are planned but not yet implemented. Windows and Linux
  builds do not currently exist.
- **Monolithic process.** All of Mountain's responsibilities run in a single
  Rust binary today. Planned sidecar splits include a PtyHost sidecar (so
  terminal sessions survive editor restarts), a Watcher sidecar (to isolate
  FSEvents fan-out from the main loop), and a Search sidecar (to offload
  ripgrep). None of these splits have landed yet.
- **Tasks resolver missing.** `vscode.tasks.*` is partially implemented;
  the workbench task resolver that routes task definitions through Mountain
  is not yet complete.

---

## Build Profiles

Mountain is only active in two of the three build profiles:

- **`debug`** - Mountain does not run. The workbench opens as a plain web app.
  File system, pty, and DAP APIs are unavailable. Used for fast UI iteration
  without a Rust build step.
- **`debug-mountain`** - Mountain runs as a Tauri desktop application.
  Cocoon spawns as the extension host. The full supported API surface is
  active. This is the primary development target.
- **`debug-electron`** - Mountain does not run. The editor runs inside
  Electron for compatibility testing. Not actively maintained.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Cocoon: Extension Host](/Doc/cocoon)
- [Vine: Wire Protocol](/Doc/vine)
- [Echo: Task Scheduler](/Doc/echo)
- [Source Code](https://github.com/CodeEditorLand/Mountain)
