---
title: "Common"
section: "Element"
order: 19
description:
    "Shared Rust and TypeScript contracts used across Editor.Land elements."
---

# Common

`Common` is the shared contract layer for `Editor.Land`. It contains `Rust` and
`TypeScript` types, traits, configuration helpers, DTOs, testing helpers, and
service-boundary definitions that multiple elements depend on.

It is not a standalone runtime process. It should not be described as having no
concrete code at all, because the source includes helpers and dependencies that
support shared behavior. The accurate claim is narrower: `Common` centralizes
cross-element contracts so elements do not invent their own incompatible shapes.

---

## What Common Provides

- Shared data transfer objects.
- Trait and provider contracts for native services.
- Configuration inspection helpers.
- Testing support used by element-level code.
- `TypeScript` package contracts for frontend and service code.

---

## Why It Matters

When a service boundary changes in `Common`, dependent `Rust` code gets compiler
feedback. That keeps cross-element changes visible. It also gives tests a place
to depend on contracts instead of launching a full editor session for every
small unit.

---

## Status 🚀

`Common` is source-backed and active as a shared library layer. Claims about
"complete isolation" or "zero implementation" should be avoided unless they are
qualified to a specific trait or test harness.

---

## Related Documentation 📖

- [Architecture Overview](https://Editor.Land/Doc/architecture)
- [`Mountain`](https://Editor.Land/Doc/mountain)
- [Source Code](https://github.com/CodeEditorLand/Common)
