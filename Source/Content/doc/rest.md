---
title: "Rest"
section: "Element"
order: 21
description:
    "OXC-based TypeScript transform work for Editor.Land's output pipeline."
---

# Rest

`Rest` is the `Rust` element for `OXC`-based `TypeScript` transform work in
`Editor.Land`'s build pipeline. It is part of the path that reduces reliance on
Node-hosted `TypeScript` compilation over time.

`Rest` contains `OXC` integration and transform work. Speed claims require a
benchmark that runs inside Land's actual pipeline before they appear in product
copy.

---

## Source Structure 🗺️

Confirmed source areas include:

| Path                | Role                       |
| ------------------- | -------------------------- |
| `Source/Binary.rs`  | Binary entry point         |
| `Source/Main.rs`    | Main function              |
| `Source/Library.rs` | Crate root                 |
| `Source/Fn/`        | Function modules           |
| `Source/Struct/`    | Data structure definitions |

---

## Status 🚀

`Rest` is build-tooling work in active development. Claims about replacing or
outperforming other compilers require published validation of `Output`
compatibility, source maps, and measured pipeline speed before they appear in
product copy.

---

## Related Documentation 📖

- [Architecture Overview](https://Editor.Land/Doc/architecture)
- [`Output`](https://Editor.Land/Doc/output)
- [Source Code](https://github.com/CodeEditorLand/Rest)
