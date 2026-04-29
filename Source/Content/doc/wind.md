---
title: "Wind"
section: "Element"
order: 13
description: "The Effect-TS service layer that provides typed workbench interfaces to Sky."
---

# Wind

Wind is the workbench service layer for Editor.Land. It is written in
TypeScript using [Effect-TS](https://effect.website) and provides typed Layer
interfaces for workbench concerns: file dialogs, clipboard, configuration,
output channels, status bar, command registry, terminal management, SCM,
tree views, webviews, debug, and more. Sky’s UI components consume these
interfaces. Wind sits between Sky (the UI) and Mountain (the Rust kernel)
so that UI components never call Tauri IPC directly.

Wind’s service surface is active and growing with every release. The
Effect-TS Layer infrastructure is in place, consumed by Sky in the
`debug-mountain` profile on macOS and Windows, and all core workbench
services are confirmed working on both platforms.

---

## Source Layout

Wind’s source tree (`Source/`) is organized by concern:

- **`Bootstrap/`** — process startup and Layer composition. The bootstrap
  module assembles the full Layer stack and provides it to Sky’s entry point.
- **`Configuration/`** — workspace and user configuration reading, watching,
  and typed access. Routes through Tauri IPC to Mountain’s configuration
  store.
- **`Effect/`** — Effect-TS utilities and helpers shared across Wind layers.
- **`FileSystem/`** — virtual file system abstractions. Routes file reads,
  writes, and watches through Mountain.
- **`Function/`** — pure functional utilities with no service dependencies.
- **`IPC/`** — the typed Tauri IPC channel implementation and the `SkyEvent`
  registry (see below).
- **`Service/`** — concrete service implementations, including
  `TauriMainProcessService` which wraps all Tauri `invoke` calls used by
  workbench services.
- **`Telemetry/`** — usage telemetry routing.
- **`Types/`** — shared TypeScript type definitions.
- **`Utility/`** — general-purpose helpers.
- **`Workbench/`** — workbench-specific service implementations for panels,
  layout, tabs, and the activity bar.
- **`Preload.ts`** (16 KB) — the preload script injected into the Tauri
  WebView context. It exposes the typed IPC bridge that Sky components use
  at runtime before the full Layer stack is initialized.

---

## The Effect-TS Layer Model

VS Code’s workbench uses an untyped service container (`createDecorator`)
where services are retrieved by string key at runtime. Wind replaces this
with Effect-TS Layers: each service is a typed interface with a concrete
implementation that can be provided, swapped, or mocked at the Layer level.

This has one concrete practical benefit beyond type safety: workbench logic
can be tested by providing mock Layer implementations without a running Tauri
instance or Mountain process. A test that exercises the command registry or
status bar service does not need a desktop window to run.

---

## The SkyEvent Registry

Mountain pushes workbench state changes to Wind by emitting Tauri events on
`sky://` URIs. Wind subscribes to these events via `IPCService.events()`.
The `Source/IPC/SkyEvent.ts` file is the single source of truth for all 95
event URI strings that Mountain currently emits. It is a TypeScript mirror of
the Rust enum defined in `Element/Common/Source/IPC/SkyEvent.rs` in Mountain.

When a new event is added, both files are updated together. This prevents
drift between Mountain’s emit site and Wind’s listen site, which would
otherwise be silent at compile time and invisible until runtime.

Event domains include: Configuration, Debug, Diagnostics, Dialog, Documents,
Editor, Extensions, ExtHost, Input, Language, Lifecycle, Native,
Notifications, Output, Progress, QuickPick, SCM, Status bar, Task, Terminal,
Test, Theme, Tree view, UI, Virtual File System, Webview, Window, and
Workspace. URI strings follow a canonical kebab-case convention
(`sky://domain/action`).

---

## Wind and the Tauri IPC Boundary

Wind routes all native calls: file reads, clipboard access, terminal spawn,
configuration persistence. These go through Tauri’s typed IPC to Mountain.
Calls cross a process boundary and arguments are serialized — but the
difference from Electron’s IPC is that Tauri’s bindings are typed at the
call site (no raw `ipcRenderer.send('event-name', payload)`) and the
receiving end in Mountain is a Rust function with a matching type signature
rather than an untyped event handler.

In-process state (UI panel layout, command palette state, active editor
tabs) propagates through the Effect runtime without crossing the IPC
boundary at all. Only calls that require native OS access (disk, clipboard,
process spawn) go to Mountain.

---

## TauriMainProcessService

`Source/Service/TauriMainProcessService.ts` (27 KB) is Wind’s central wrapper
around all `invoke` calls to Mountain. Each named Tauri command that Mountain
exposes has a corresponding typed method in this service. Sky components and
Wind layers call methods on this service rather than calling `invoke` with
raw strings, giving the compiler full visibility into the parameter and return
types for every IPC call.

---

## IPC Channel

`Source/IPC/Channel.ts` implements the typed IPC channel abstraction that
both request/response calls (via `invoke`) and push event subscriptions (via
the `SkyEvent` registry) go through. A single `Channel` instance coordinates
both directions so that Wind layers do not need to manage Tauri event
listener lifecycles directly.

---

## Current Status

Wind is an active part of the `debug-mountain` profile on macOS and Windows.

**Confirmed working:**
- The Effect-TS Layer infrastructure is in place and consumed by Sky.
- Core workbench services (file dialogs, output channels, status bar,
  configuration read) are implemented and route through Tauri IPC to Mountain.
- Clipboard read and write are confirmed working on macOS and Windows via
  Mountain’s `arboard` integration. Tauri’s clipboard API is async; Wind
  wraps it as an Effect so callers receive a typed `Fiber` rather than a
  raw Promise.
- The SkyEvent registry (95 event URIs) is aligned with Mountain’s Rust
  enum, eliminating the class of runtime-silent drift bugs.
- Terminal events (`sky://terminal/data`, `sky://terminal/resize`, etc.)
  are subscribed and routed to Sky’s terminal panel components.
- Tree view events (`sky://tree-view/refresh`, `sky://tree-view/create`,
  etc.) are subscribed and routed to Sky’s activity bar and panel tree
  components.
- Status bar events create, update, and dispose entries without flicker.
- The Layer model allows mock substitution for testing without a running
  desktop instance.

**Growing with each release:**
- Additional workbench service coverage is added continuously as new
  extension API surfaces are implemented in Cocoon and Mountain.
- See [Cocoon](/Doc/cocoon) for the current API roadmap.

---

## Relationship to Sky

Sky renders UI components. Wind provides the services those components depend
on. A Sky component that shows the active file path does not read the file
system. It subscribes to a Wind Layer that holds that state and re-renders
when the Layer emits a change. Sky components are kept free of direct IPC
calls so that the same component can render correctly in the `debug` browser
profile (where Mountain is absent) using a mock Wind Layer.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Sky: Workbench UI](/Doc/sky)
- [Mountain: Native Kernel](/Doc/mountain)
- [Source Code](https://github.com/CodeEditorLand/Wind)
