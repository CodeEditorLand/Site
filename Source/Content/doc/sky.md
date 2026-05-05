---
title: "Sky"
section: "Element"
order: 14
description:
    "The Astro workbench UI that renders the editor interface inside WKWebView
    (macOS) or WebView2 (Windows)."
---

# Sky

Sky is the workbench UI for Editor.Land. It is built with
[Astro](https://astro.build) and runs inside the OS WebView when the editor is
launched in native mode: WKWebView on macOS, WebView2 on Windows. Sky consumes
typed service interfaces from Wind (the Effect-TS service layer) for all state
that crosses the UI boundary, including open files, panel layout, extension
contributions, and language server results.

Sky communicates with Mountain (the Rust kernel) exclusively through Tauri’s
typed IPC. It does not call the file system, spawn terminals, or talk to the
Debug Adapter Protocol directly. Every native operation is a typed IPC call that
Mountain fulfils. This strict boundary means the same Sky component tree can run
in a browser during development (with Wind stubs) and in the real desktop
application without any code change.

---

## Source Layout

Sky’s source tree is compact and purpose-built:

```
Source/
├── Workbench/
│   ├── Mountain.astro       ← primary desktop entry-point (Tauri / native)
│   ├── Browser.astro        ← browser dev-mode entry-point
│   ├── BrowserTest.astro    ← browser test harness
│   ├── Default.astro        ← shared workbench shell (layout, panels)
│   ├── NLS.astro            ← National Language Support injection
│   ├── TelemetryBridge.astro← telemetry bridge to Mountain
│   ├── BrowserProxy/        ← dev proxy for browser debug profile
│   ├── Bundled/             ← bundled workbench module output
│   └── Electron/            ← Electron compatibility profile
├── Function/            ← pure functional utilities
├── pages/               ← Astro page routing
└── env.d.ts             ← Astro environment type declarations
```

`Mountain.astro` is the file that matters most for the native desktop
experience. It bootstraps the Tauri WebView context, loads Wind’s Layer stack,
and hands control to `Default.astro` which renders the workbench shell. All Wind
service subscriptions, IPC channel initialization, and the SkyEvent listener
registry are wired in `Mountain.astro` before the first frame paints.

`NLS.astro` injects the National Language Support data bundle into the workbench
so that VS Code’s UI string catalog is available to extensions and platform
modules that call `vscode.l10n.*`.

`TelemetryBridge.astro` connects Sky’s in-page telemetry events to Mountain’s
PostHog reporter (behind the `Telemetry` feature flag).

`Bundled/` holds the output of the Rest/Output build pipeline - the bundled VS
Code workbench module graph that Sky loads inside the WebView.

---

## Sky and Wind

Sky and Wind are two distinct layers that work together. Wind defines the
Effect-TS service interfaces: the typed contracts for workbench state. Sky
consumes those interfaces to render the actual UI components. The separation
means UI components do not hold raw state. They subscribe to Wind services and
re-render when those services emit changes.

This is the same model VS Code uses internally (a service container with
injected dependencies), implemented with Effect-TS’s typed Layer system rather
than VS Code’s untyped `createDecorator` approach. The practical result is that
every Sky component is testable without a running desktop window.

---

## The SkyEvent Registry

Mountain and Sky coordinate through a typed event URI registry called
`SkyEvent`. The registry is maintained in two places that must stay in sync:
`Source/IPC/SkyEvent.ts` in Wind (the TypeScript side) and
`Source/IPC/SkyEvent.rs` in Mountain (the Rust side). When Mountain emits an
event it uses the Rust enum variant; when Wind subscribes it uses the TypeScript
constant. Drift between the two sides would cause listeners to never fire, so
both files are updated together whenever a new event is added.

The registry currently defines 95 event URIs across the following domains:

- **Editor**: `sky://editor/applyEdits`, `sky://editor/openDocument`,
  `sky://editor/saveAll`
- **Terminal**: `sky://terminal/create`, `sky://terminal/data`,
  `sky://terminal/resize`, `sky://terminal/processId`, `sky://terminal/show`,
  `sky://terminal/hide`, `sky://terminal/closed`, `sky://terminal/opened`,
  `sky://terminal/exit`
- **Tree view**: `sky://tree-view/create`, `sky://tree-view/refresh`,
  `sky://tree-view/node-expanded`, `sky://tree-view/selection-changed`,
  `sky://tree-view/reveal`, `sky://tree-view/restore-state`,
  `sky://tree-view/set-badge`, `sky://tree-view/set-message`,
  `sky://tree-view/set-title`, `sky://tree-view/dispose`
- **Status bar**: `sky://statusbar/create`, `sky://statusbar/set-entry`,
  `sky://statusbar/set-message`, `sky://statusbar/update`,
  `sky://statusbar/dispose`, `sky://statusbar/dispose-entry`,
  `sky://statusbar/dispose-message`
- **Output**: `sky://output/create`, `sky://output/append`,
  `sky://output/replace`, `sky://output/clear`, `sky://output/show`,
  `sky://output/reveal`, `sky://output/dispose`
- **Webview**: `sky://webview/create`, `sky://webview/created`,
  `sky://webview/set-html`, `sky://webview/post-message`,
  `sky://webview/message`, `sky://webview/options-changed`,
  `sky://webview/dispose`, `sky://webview/disposed`, `sky://webview/revealed`
- **Notifications**: `sky://notification/show`,
  `sky://notification/progress-begin`, `sky://notification/progress-update`,
  `sky://notification/progress-end`
- **SCM**: `sky://scm/register`, `sky://scm/provider/added`,
  `sky://scm/provider/changed`, `sky://scm/provider/removed`,
  `sky://scm/group/changed`, `sky://scm/updateGroup`
- **Debug**: `sky://debug/register`, `sky://debug/start`, `sky://debug/stop`
- **Test**: `sky://test/registered`, `sky://test/run-started`,
  `sky://test/run-status-changed`
- **Documents**, **Diagnostics**, **Configuration**, **Language**,
  **Lifecycle**, **Progress**, **Task**, **Theme**, **UI**, **VFS**, **Window**,
  **Workspace**: each with dedicated typed channels.

All URI strings follow a canonical kebab-case pattern (`sky://domain/action`).
Older camelCase variants have been migrated to the canonical form so Sky only
ever sees a single consistent shape per event.

---

## Build Profile Behaviour

Sky’s runtime environment depends on which build profile is active:

- **`debug`** - Sky runs as a plain web app in the browser. `Browser.astro` is
  the entry point; no Tauri WebView, no Mountain process. Astro’s dev server
  with HMR is active so component changes reflect without a full page reload.
  File system, terminal, and debug APIs are unavailable. Used for rapid UI
  iteration.
- **`debug-mountain`** - Sky runs inside WKWebView (macOS) or WebView2 (Windows)
  via `Mountain.astro`. Mountain is running; all Tauri IPC calls resolve through
  the Rust kernel. This is the primary development target for both platforms and
  the only profile where the full editor experience is available.
- **`debug-electron`** - `Workbench/Electron/` provides compatibility shims for
  running Sky inside Electron’s renderer. This profile exists for compatibility
  testing and is not actively maintained.

---

## Current Status

Sky is the active UI layer for the `debug-mountain` profile on macOS and
Windows. The workbench builds, installs, and runs correctly on both platforms.

**Verified working in `debug-mountain`:**

- The editor window opens and renders the full workbench UI via WKWebView
  (macOS) or WebView2 (Windows).
- The VS Code-compatible editor surface (Monaco or equivalent) is active.
- Panel layout, command palette, and status bar render through Sky components
  driven by Wind service subscriptions.
- Terminal panels open, receive data on `sky://terminal/data`, and resize
  correctly via `sky://terminal/resize`.
- Tree-view panels populate via `$provideTreeChildren` through Cocoon and
  refresh via `sky://tree-view/refresh`.
- Output channels create, append, and clear correctly.
- Status bar entries create and update without flicker.
- Webview panels open and receive HTML via `sky://webview/set-html`.
- Wind service subscriptions drive UI state updates without full-page reloads.
- NLS data bundle loads correctly, making VS Code UI strings and extension
  localisation available via `vscode.l10n.*`.
- TelemetryBridge connects in-page events to Mountain’s reporter.

**Optimisation roadmap:**

- The workbench module graph currently consists of 3,385 dynamically imported
  modules loaded sequentially at cold boot. The application is fully functional
  today. The Rest/Output pipeline is being extended to bundle this graph into a
  single pre-linked module, which is projected to cut cold-boot time by ~550 ms.
  This is a well-scoped, in-progress optimisation - not a blocker.
- Notebook UI, chat panel, and language model UI panels are on the roadmap,
  consistent with the planned `vscode.notebook.*`, `vscode.chat.*`, and
  `vscode.lm.*` API work in Cocoon.

---

## VS Code UI Compatibility

Sky reimplements the VS Code workbench UI rather than forking it. The goal is
behavioural compatibility: panels, tabs, the command palette, the status bar,
and the activity bar behave as a VS Code user expects, without carrying
Electron’s renderer process or VS Code’s original webpack bundle. The surfaces
that are complete work correctly today. Incomplete surfaces are absent rather
than silently broken.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Wind: Service Layer](/Doc/wind)
- [Mountain: Native Kernel](/Doc/mountain)
- [Source Code](https://github.com/CodeEditorLand/Sky)
