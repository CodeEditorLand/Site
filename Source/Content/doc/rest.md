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

The source-backed claim is that `Rest` contains `OXC` integration and transform
work. Public speed claims should wait for a benchmark that runs inside Land's
actual pipeline.

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

`Rest` is WIP build-tooling work. It should be labeled `WIP` anywhere the
website talks about replacing or outperforming other compilers. `Output`
compatibility, source maps, and measured pipeline speed need published
validation before they become product claims.

---

## Related Documentation 📖

- [Architecture Overview](https://Editor.Land/Doc/architecture)
- [`Output`](https://Editor.Land/Doc/output)
- [Source Code](https://github.com/CodeEditorLand/Rest)
