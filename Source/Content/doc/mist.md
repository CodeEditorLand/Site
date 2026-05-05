---
title: "Mist"
section: "Element"
order: 20
description:
    "The DNS sandbox that resolves *.editor.land locally, eliminating public DNS
    dependency."
---

# Mist

Mist is the local DNS layer for Editor.Land. It resolves every `*.editor.land`
domain to `127.0.0.1` so that all editor-internal service communication happens
over loopback - no packet leaves the network interface for editor traffic.

Mist is implemented in Rust and in active development. The DNS server
(`Server.rs`), zone resolver (`Resolver.rs`), zone authority (`Zone.rs`),
forward security module (`ForwardSecurity.rs`), and integration tests are all
confirmed present in the
[Mist repository](https://github.com/CodeEditorLand/Mist).

---

## The Problem Mist Solves

VS Code extensions, update checks, and telemetry endpoints all resolve against
public DNS. Even with telemetry disabled, DNS queries can leak metadata about
which extensions are installed and when the editor starts. There is no clean
technical boundary between editor traffic and internet traffic.

Developers working on airgapped machines or behind strict firewalls face a
different failure mode: DNS resolution hangs before timing out, and the editor
stutters while waiting.

---

## How Mist Works

Mist intercepts all DNS queries for the `*.editor.land` zone before they reach
the system resolver. Every query resolves instantly to `127.0.0.1`. The editor's
internal services communicate over loopback.

For domains outside the `*.editor.land` zone, Mist passes queries through to the
system resolver unchanged. All other applications behave exactly as before.

---

## Source Structure

| Path                        | Role                                                                  |
| --------------------------- | --------------------------------------------------------------------- |
| `Source/Server.rs`          | DNS server - listens for queries and dispatches to resolver (~5.8 KB) |
| `Source/Resolver.rs`        | DNS resolver - zone lookup and response construction (~2 KB)          |
| `Source/Zone.rs`            | Zone authority - `*.editor.land` zone definitions (~3.5 KB)           |
| `Source/ForwardSecurity.rs` | Forward security for pass-through queries (~1.2 KB)                   |
| `Source/lib.rs`             | Crate root re-exports (~5.6 KB)                                       |
| `tests/`                    | Integration tests                                                     |

---

## What Mist Enables

With Mist active, the editor starts and operates without any public DNS
dependency. On airgapped machines, the editor works at full speed because it
never waits for a DNS response from outside. On corporate networks, no outbound
DNS traffic is visible from the editor process for editor-internal services.

---

## Key Technologies

Rust, DNS-over-Loopback, Sandboxed Zone Resolution, Forward Security.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Air](/Doc/air)
- [Source Code](https://github.com/CodeEditorLand/Mist)
