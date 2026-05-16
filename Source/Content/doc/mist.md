---
title: "Mist"
section: "Element"
order: 20
description:
    "Local DNS, resolver, WebSocket, zone, and forward-security code for
    Editor.Land service boundaries."
---

# Mist

`Mist` is the local service-boundary element for `Editor.Land`. The source
contains DNS server, resolver, zone, WebSocket, and forward-security code.
`Mountain` has a native `Mist` feature path, but not every internal editor route
flows through `Mist` yet.

---

## Source Structure 🗺️

Confirmed source areas include:

| Path                        | Role                                  |
| --------------------------- | ------------------------------------- |
| `Source/Server.rs`          | DNS server                            |
| `Source/Resolver.rs`        | Zone lookup and response construction |
| `Source/Zone.rs`            | `*.editor.land` zone definitions      |
| `Source/WebSocket.rs`       | WebSocket service code                |
| `Source/ForwardSecurity.rs` | Forward-security helpers              |
| `tests/`                    | Integration tests                     |

---

## Status 🚀

`Mist` is source-backed and WIP for full integration. Public copy should
describe the local DNS and service-boundary direction without promising that all
editor traffic already flows through `Mist`.

---

## Related Documentation 📖

- [Architecture Overview](https://Editor.Land/Doc/architecture)
- [`Air`](https://Editor.Land/Doc/air)
- [Source Code](https://github.com/CodeEditorLand/Mist)
