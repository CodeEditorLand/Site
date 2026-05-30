---
title: "Mist"
section: "Element"
order: 20
description:
    "Local DNS, resolver, WebSocket, zone, and forward-security code for
    Land.PlayForm.Cloud service boundaries."
---

# Mist

`Mist` is the local service-boundary element for `Land.PlayForm.Cloud`. The
source contains DNS server, resolver, zone, WebSocket, and forward-security
code. `Mountain` has a native `Mist` feature path, but not every internal editor
route flows through `Mist` yet.

---

## Source Structure 🗺️

Confirmed source areas include:

| Path                        | Role                                     |
| --------------------------- | ---------------------------------------- |
| `Source/Server.rs`          | DNS server                               |
| `Source/Resolver.rs`        | Zone lookup and response construction    |
| `Source/Zone.rs`            | `*.land.playform.cloud` zone definitions |
| `Source/WebSocket.rs`       | WebSocket service code                   |
| `Source/ForwardSecurity.rs` | Forward-security helpers                 |
| `tests/`                    | Integration tests                        |

---

## Status 🚀

`Mist` is source-backed and in active integration. It provides local DNS and
service-boundary infrastructure for `Land.PlayForm.Cloud`. Not all internal
editor routes flow through `Mist` yet.

---

## Related Documentation 📖

- [Architecture Overview](https://Land.PlayForm.Cloud/Doc/architecture)
- [`Air`](https://Land.PlayForm.Cloud/Doc/air)
- [Source Code](https://github.com/CodeEditorLand/Mist)
