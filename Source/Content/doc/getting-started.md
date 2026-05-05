---
title: "Getting Started"
section: "Start"
order: 1
description: "How to build and run Editor.Land from source on macOS or Windows."
---

# Getting Started

Editor.Land is in active development and is currently source-only. There are no
pre-built installers or package manager releases yet. The supported way to run
the editor today is to build from source on **macOS or Windows**.

---

## What Works Today

On Apple Silicon or Intel macOS (13.0 Ventura or later) and on Windows 10/11, a
successful build produces a working editor that:

- Opens a native window with the workbench UI (WKWebView on macOS, WebView2 on
  Windows).
- Loads VS Code extensions from disk and activates them through Cocoon, the
  Node.js extension host.
- Provides file system, terminal, and debug adapter access through Mountain, the
  Rust kernel.
- Runs the full gRPC-based IPC stack between Mountain and Cocoon via Vine.

The following are **in progress**: a Homebrew tap, a winget package, an apt
repository, and an automated update mechanism.

---

## Build Requirements

All of the following must be installed before building:

- **Rust** 1.95.0 or later (install via [rustup](https://rustup.rs))
- **Node.js** 20 or later
- **pnpm** 9 or later (`npm install -g pnpm`)
- **macOS:** Xcode Command Line Tools (`xcode-select --install`), macOS 13.0
  (Ventura) or later
- **Windows:** WebView2 Runtime (included with Windows 11; available separately
  for Windows 10), Visual Studio Build Tools with the C++ workload

---

## Building from Source

```bash
git clone --recurse-submodules https://github.com/CodeEditorLand/Land.git
cd Land
pnpm install
cargo tauri dev
```

`cargo tauri dev` starts the Tauri development server and opens the editor
window. This is the `debug-mountain` profile: Mountain is running, Cocoon
activates extensions, and Sky renders the workbench UI.

The first build takes several minutes because it compiles Mountain's Rust
dependencies from scratch. Subsequent builds are significantly faster due to
Cargo's incremental compilation.

---

## Extension Loading

Cocoon discovers extensions from the filesystem at startup. The exact extension
discovery path in the current build has not been independently confirmed to
match VS Code's `~/.vscode/extensions` directory exactly. If an extension you
expect to appear does not load, check the Cocoon output channel in the editor's
Output panel for activation errors.

---

## Known Limitations

- **Linux not yet supported.** Linux (WebKitGTK) is planned and in progress.
- **No marketplace integration.** Extensions must be installed manually as
  `.vsix` files or sourced from disk. Marketplace API access is not yet
  implemented.
- **API gaps.** `vscode.lm.*`, `vscode.chat.*`, `vscode.notebook.*`, and
  `vscode.tests.*` are not implemented. Extensions using these APIs activate but
  the specific features silently no-op.

---

## See Also

- [Installation](/Doc/installation)
- [Architecture Overview](/Doc/architecture)
- [Cocoon: Extension Host](/Doc/cocoon)
- [Mountain: Native Kernel](/Doc/mountain)
