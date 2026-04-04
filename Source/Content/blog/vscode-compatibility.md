---
title: "VS Code Extension Compatibility in Land"
summary: "How Land runs VS Code extensions and what works out of the box."
publishedAt: "2026-04-03"
tags: ["Extensions", "VS Code", "Compatibility"]
author: "CodeEditorLand"
readTime: 7
---

# VS Code Extension Compatibility in Land

One of Land's core promises is that existing VS Code extensions work without
modification. This is not a partial compatibility shim — it is a full
re-implementation of the VS Code extension API backed by the **Cocoon** element.

## The Cocoon Extension Host

Cocoon is Land's extension host runtime. It loads `.vsix` packages, resolves
their `package.json` contribution points, and executes extension code inside an
isolated JavaScript context. The runtime is managed by
[Effect-TS](https://effect.website), which provides typed error handling and
structured concurrency for extension lifecycle management.

When an extension calls `vscode.window.showInformationMessage()`, that call
crosses IPC through the Vine gRPC layer, reaches the Wind workbench UI, and
renders a native notification. From the extension author's perspective, it is
indistinguishable from VS Code.

## What Works Out of the Box

The following extension categories are fully supported:

- **Language servers** — Any extension using the Language Server Protocol (LSP)
  works natively. TypeScript, Rust Analyzer, Pyright, and Go's `gopls` have been
  validated.
- **Themes and icon themes** — Color themes and file icon themes load from the
  same `contributes.themes` and `contributes.iconThemes` manifest entries.
- **Snippets** — TextMate and VS Code snippet formats are parsed identically.
- **Keybinding extensions** — Extensions that remap keys via
  `contributes.keybindings` work without changes.
- **Tree view providers** — Custom sidebar panels registered through
  `vscode.window.createTreeView` render in the Wind workbench.
- **Webview panels** — Extensions that create webview-based UIs using
  `vscode.window.createWebviewPanel` are supported with the same CSP sandbox
  model.

## Known Limitations

Some VS Code APIs depend on Electron internals that do not exist in Tauri:

- **Debug Adapter Protocol (DAP)** — Partially supported. Breakpoints, stepping,
  and variable inspection work. Integrated terminal debugging requires the
  SideCar Node.js binary.
- **Custom editors** — Extensions using the `CustomEditor` API are supported for
  text-based formats. Binary custom editors (e.g., hex viewers) are in progress.
- **Terminal profiles** — Land uses its own terminal emulator backed by the
  Mountain element. Extensions that create custom terminal profiles may need
  minor adjustments.
- **Notebook API** — The Jupyter notebook renderer is partially implemented.
  Extensions using `NotebookSerializer` work; custom notebook renderers are
  under development.

## Marketplace Integration

Land can consume extensions from multiple sources:

1. **Open VSX Registry** — The default marketplace, fully open source.
2. **Self-hosted registry** — Organizations can run a private registry for
   internal extensions.
3. **Local `.vsix` files** — Drag and drop into the extensions panel or install
   via the command palette.

Land does not connect to the Microsoft Visual Studio Marketplace directly,
because its terms of service restrict access to non-Microsoft products.

## Extension Directory Compatibility

By default, Land reads extensions from `~/.vscode/extensions/`. If you already
have VS Code installed, your extensions appear automatically in Land without
reinstallation. You can configure a separate directory in settings if you prefer
isolation.

## Reporting Compatibility Issues

If an extension that works in VS Code fails in Land, open an issue on the
[CodeEditorLand/Cocoon](https://github.com/CodeEditorLand/Cocoon) repository
with the extension name, version, and a reproduction. The Cocoon team triages
compatibility reports weekly.
