---
title: "Getting Started"
section: "Start"
order: 1
description: "How to build and run Editor.Land from source on macOS today."
---

# Getting Started

Editor.Land is currently in active development and is source-only. There are no
pre-built installers, no package manager releases, and no public download page
yet. The only supported way to run the editor today is to build from source on
macOS.

This is not a caveat — it is the current state of the project, stated directly
so you can make an informed decision about whether to proceed.

---

## What Works Today

On Apple Silicon or Intel macOS (13.0 Ventura or later), a successful build
produces a working editor that:

- Opens a native WKWebView window with the workbench UI.
- Loads VS Code extensions from disk and activates them through Cocoon, the
  Node.js extension host.
- Provides file system, terminal, and debug adapter access through Mountain,
  the Rust kernel.
- Runs the full gRPC-based IPC stack between Mountain and Cocoon via Vine.

The following are **not yet working**: Windows, Linux, a Homebrew tap, a
winget package, an apt repository, or any automated update mechanism.

---

## Build Requirements

All of the following must be installed before building:

- **Rust** 1.95.0 or later (install via [rustup](https://rustup.rs))
- **Node.js** 20 or later
- **pnpm** 9 or later (`npm install -g pnpm`)
- **Xcode Command Line Tools** (`xcode-select --install`)
- **macOS 13.0 (Ventura) or later** — earlier macOS versions are not tested

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
activates extensions, and Sky renders the workbench UI in WKWebView.

The first build takes several minutes because it compiles Mountain's Rust
dependencies from scratch. Subsequent builds are faster due to Cargo's
incremental compilation.

---

## Extension Loading

Cocoon discovers extensions from the filesystem at startup. The exact
extension discovery path in the current build has not been independently
confirmed to match VS Code's `~/.vscode/extensions` directory exactly.
If an extension you expect to appear does not load, check the Cocoon
output channel in the editor's Output panel for activation errors.

---

## Known Limitations

- **macOS only.** Windows (WebView2) and Linux (WebKitGTK) are planned but
  not yet implemented.
- **No marketplace integration.** Extensions must be installed manually as
  `.vsix` files or sourced from disk. Marketplace API access is not
  yet implemented.
- **Cold-boot time.** On Apple Silicon macOS with 47 extensions, measured
  cold-boot is approximately 2,400 ms. A planned bundling optimisation
  (consolidating 3,385 dynamic module imports) is projected to save
  approximately 550 ms from this.
- **API gaps.** `vscode.lm.*`, `vscode.chat.*`, `vscode.notebook.*`, and
  `vscode.tests.*` are not implemented. Extensions using these APIs activate
  but the specific features silently no-op.

---

## See Also

- [Installation](/Doc/installation)
- [Architecture Overview](/Doc/architecture)
- [Cocoon: Extension Host](/Doc/cocoon)
- [Mountain: Native Kernel](/Doc/mountain)
