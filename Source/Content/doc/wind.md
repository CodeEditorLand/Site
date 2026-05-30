---
title: "Wind"
section: "Element"
order: 13
description:
    "The Effect-TS service layer that provides typed workbench interfaces to
    Sky."
---

# Wind

`Wind` is the `TypeScript` and `Effect-TS` `workbench` service layer. It sits
between `Sky` and `Mountain` so UI components can depend on typed services
instead of raw `Tauri` calls.

---

## Source Layout 🗺️

`Wind` source areas include:

- **`Bootstrap/`** - process startup and layer composition.
- **`Configuration/`** - configuration reading, watching, and typed access.
- **`Effect/`** - `Effect-TS` utilities shared across `Wind` layers.
- **`FileSystem/`** - virtual file-system service abstractions.
- **`IPC/`** - typed `Tauri` `IPC` helpers and the `SkyEvent` registry.
- **`Service/`** - `workbench` service implementations and `Tauri` wrappers.
- **`Workbench/`** - panels, layout, tabs, activity bar, and related services.
- **`Preload.ts`** - WebView preload support for the typed bridge.

---

## Status 🚀

`Wind` is active source for the `Mountain` `workbench` path. Core service
surfaces are present, and more coverage is added as `Mountain` and `Cocoon`
expose additional routes. Platform parity and complete `workbench` coverage
claims name the specific route being verified.

---

## Relationship To Sky

`Sky` renders UI components. `Wind` provides the services those components
depend on. A component can use a `Wind` layer for state or native work without
embedding `Tauri` `IPC` details directly into the component.

---

## Related Documentation 📖

- [Architecture Overview](https://Editor.Land/Doc/architecture)
- [`Sky`](https://Editor.Land/Doc/sky)
- [`Mountain`](https://Editor.Land/Doc/mountain)
- [Source Code](https://github.com/CodeEditorLand/Wind)
