---
title: "Mountain"
section: "Element"
order: 11
description:
    "The native Rust backend that replaces Electron's main process with Tauri"
---

# Mountain

## The Problem Mountain Solves

VS Code runs on Electron: a bundled Chromium instance plus Node.js. Every window
adds another renderer process heap. Three open windows means three Chromium
processes, each carrying a full heap. Every OS interaction (file dialog,
clipboard, window move) crosses a serialized JSON IPC pipe.

The memory tax is not optional. Open VS Code with a medium project: 500 MB to
1.5 GB of RAM. Switch to another app: the memory stays allocated. The garbage
collector fights a losing battle on a gigabyte heap.

## How Mountain Eliminates It

Mountain replaces Electron's main process entirely with a Rust binary using
Tauri. The operating system's own WebView renders the UI: WKWebView on macOS,
WebView2 on Windows, WebKitGTK on Linux. No bundled Chromium. No Node.js in the
host process.

Window management, file system access, process lifecycle, and authentication
tokens all happen in Rust with zero IPC overhead. Auth tokens live in the OS
keychain, not in a renderer process heap.

## What You Experience

Cold start in under 200 ms. RAM footprint 60-80% smaller per window. File
operations respond in microseconds, not milliseconds. Where Electron takes 200
ms to open a dialog, Mountain takes 2.

## Key Technologies

Mountain is built with Rust and Tauri 2.0. It communicates with Cocoon and other
sidecars through Vine's gRPC protocol. The Cargo workspace manages all native
dependencies.

## See Also

- [Architecture Overview](/Doc/architecture)
- [Cocoon: Extension Host](/Doc/cocoon)
- [Vine: gRPC Protocol](/Doc/vine)
- [Source Code](https://github.com/CodeEditorLand/Mountain)
