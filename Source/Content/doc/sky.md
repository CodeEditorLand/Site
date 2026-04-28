---
title: "Sky"
section: "Element"
order: 14
description: "The Astro + React workbench UI that renders the editor interface inside WKWebView."
---

# Sky

Sky is the workbench UI for Editor.Land. It is built with
[Astro](https://astro.build) and React, and it runs inside WKWebView on macOS
when the editor is launched in native mode. Sky consumes typed service
interfaces from Wind (the Effect-TS service layer) for all state that crosses
the UI boundary - open files, panel layout, extension contributions, language
server results.

Sky communicates with Mountain (the Rust kernel) exclusively through Tauri's
typed IPC. It does not call the file system, spawn terminals, or talk to the
Debug Adapter Protocol directly. Every native operation is a typed IPC call
that Mountain fulfils.

---

## Sky and Wind

Sky and Wind are two distinct layers that work together. Wind defines the
Effect-TS service interfaces - the typed contracts for workbench state. Sky
consumes those interfaces to render the actual UI components. The separation
means UI components do not hold raw state; they subscribe to Wind services and
re-render when those services emit changes.

This is the same model VS Code uses internally (a service container with
injected dependencies), implemented with Effect-TS's typed Layer system rather
than VS Code's untyped `createDecorator` approach.

---

## Build Profile Behaviour

Sky's runtime environment depends on which build profile is active:

- **`debug`** - Sky runs as a plain web app in the browser. No Tauri webview,
  no Mountain process. Tauri IPC calls are stubbed or unavailable. This mode
  is used for fast UI iteration - Astro's dev server with HMR is active, so
  component changes reflect without a full page reload. File system, terminal,
  and debug APIs do not work in this profile.
- **`debug-mountain`** - Sky runs inside WKWebView within the Tauri desktop
  application. Mountain is running. Tauri IPC calls resolve through the Rust
  kernel. This is the primary development target and the only profile where the
  full editor experience is available.
- **`debug-electron`** - Sky runs inside Electron's renderer. This profile
  exists for compatibility testing and is not actively maintained.

---

## Current Status

Sky is the active UI layer for the `debug-mountain` profile. The following
reflects what is verified versus what is in progress:

**Verified working in `debug-mountain`:**
- The editor window opens and renders the workbench UI via WKWebView.
- The VS Code-compatible editor surface (Monaco or equivalent) is active.
- Panel layout, command palette, and status bar render through Sky components.
- Wind service subscriptions drive UI state updates without full-page reloads.

**In progress:**
- The workbench module graph currently consists of 3,385 dynamically imported
  modules loaded sequentially at boot. Bundling this into a single output
  (via the Output/Rest pipeline) is a planned optimisation projected to save
  approximately 550 ms from cold-boot time.
- Notebook UI, chat panel, and language model UI panels are not yet
  implemented, consistent with the unimplemented `vscode.notebook.*`,
  `vscode.chat.*`, and `vscode.lm.*` APIs.

---

## VS Code UI Compatibility

Sky reimplements the VS Code workbench UI rather than forking it. The goal is
behavioural compatibility - panels, tabs, the command palette, the status bar,
and the activity bar should behave as a VS Code user expects - without
carrying Electron's renderer process or VS Code's original webpack bundle.

This is ongoing work. Some workbench surfaces are complete; others are
partially implemented. Where a surface is not yet complete, it will either be
absent or visually present but non-functional. The project does not ship
polished-looking stubs that silently do nothing.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Wind: Service Layer](/Doc/wind)
- [Mountain: Native Kernel](/Doc/mountain)
- [Source Code](https://github.com/CodeEditorLand/Sky)
