---
title: "Worker"
section: "Element"
order: 24
description:
    "Browser-worker support for cached assets and CSS import handling where the
    web shell needs it."
---

# Worker

`Worker` is the browser-worker layer for `Editor.Land` surfaces that need cached
assets, versioned application files, or dynamic CSS import handling. It belongs
to the web shell and WebView side of the system.

`Worker` should be shown as source-backed, with release scope depending on the
active build profile.

---

## Source Areas 🗺️

- `Source/Worker.ts`
- `Source/Worker/`
- `Source/Configuration/`
- `Source/Run.sh`
- `Source/prepublishOnly.sh`

---

## Status 🚀

`Worker` is useful infrastructure, but public copy should avoid claiming that it
intercepts all editor requests or guarantees offline behavior for every asset.
Use `WIP` where the active release profile has not been verified.

---

## Related Documentation 📖

- [Architecture Overview](https://Editor.Land/Doc/architecture)
- [`Output`](https://Editor.Land/Doc/output)
- [`Mountain`](https://Editor.Land/Doc/mountain)
- [Source Code](https://github.com/CodeEditorLand/Worker)
