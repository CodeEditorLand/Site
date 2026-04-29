---
title: "Wind"
section: "Element"
order: 13
description: "The Effect-TS service layer that provides typed workbench interfaces to Sky."
---

# Wind

Wind is the workbench service layer for Editor.Land. It is written in
TypeScript using [Effect-TS](https://effect.website) and provides typed Layer
interfaces for workbench concerns — file dialogs, clipboard, configuration,
output channels, status bar, command registry — that Sky's UI components
consume. Wind sits between Sky (the UI) and Mountain (the Rust kernel), so that
UI components never call Tauri IPC directly.

---

## The Effect-TS Layer Model

VS Code's workbench uses an untyped service container (`createDecorator`) where
services are retrieved by string key at runtime. Wind replaces this with
Effect-TS Layers: each service is a typed interface with a concrete
implementation that can be provided, swapped, or mocked at the Layer level.

This has one concrete practical benefit beyond type safety: workbench logic can
be tested by providing mock Layer implementations without a running Tauri
instance or Mountain process. A test that exercises the command registry or
status bar service does not need a desktop window to run.

---

## Wind and the Tauri IPC Boundary

Wind routes all native calls — file reads, clipboard access, terminal spawn,
configuration persistence — through Tauri's typed IPC to Mountain. This is
still an IPC mechanism: calls cross a process boundary and the arguments are
serialized. The difference from Electron's IPC is that Tauri's bindings are
typed at the call site (no raw `ipcRenderer.send('event-name', payload)`) and
the receiving end in Mountain is a Rust function with a matching type signature
rather than an untyped event handler.

In-process state — UI panel layout, command palette state, active editor
tabs — propagates through the Effect runtime without crossing the IPC boundary
at all. Only calls that require native OS access (disk, clipboard, process
spawn) go to Mountain.

---

## Current Status

Wind is an active part of the `debug-mountain` profile on macOS and Windows.
The re-implementation of VS Code's full workbench service surface is ongoing
work.

**Confirmed working:**
- The Effect-TS Layer infrastructure is in place and consumed by Sky.
- Core workbench services (file dialogs, output channels, status bar,
  configuration read) are implemented and route through Tauri IPC to Mountain.
- Clipboard read/write is confirmed working on macOS and Windows via Mountain's
  `arboard` integration. Tauri's clipboard API is async; Wind wraps it as an
  Effect so callers receive a typed `Fiber` rather than a raw Promise.
- The Layer model allows mock substitution for testing without a running
  desktop instance.

**In progress:**
- Complete coverage of the VS Code workbench service surface. Not all
  `vscode.*` workbench APIs have a corresponding Wind Layer implementation
  yet.
- Notebook, chat, and language model panel services are not implemented,
  consistent with the unimplemented `vscode.notebook.*`, `vscode.chat.*`,
  and `vscode.lm.*` APIs in Cocoon.

---

## Relationship to Sky

Sky renders UI components. Wind provides the services those components depend
on. A Sky component that shows the active file path does not read the file
system — it subscribes to a Wind Layer that holds that state and re-renders
when the Layer emits a change. Sky components are kept free of direct IPC calls
so that the same component can render correctly in the `debug` browser profile
(where Mountain is absent) using a mock Wind Layer.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Sky: Workbench UI](/Doc/sky)
- [Mountain: Native Kernel](/Doc/mountain)
- [Source Code](https://github.com/CodeEditorLand/Wind)
