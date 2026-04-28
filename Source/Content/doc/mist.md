---
title: "Mist"
section: "Element"
order: 20
description: "The planned DNS sandbox that will resolve *.editor.land locally."
---

# Mist

> **Status: Planned.** Mist is not active in the current build. The design
> below describes the intended architecture. See the
> [Architecture Overview](/Doc/architecture) for the full element status table.

Mist is the planned network boundary for Editor.Land. It is designed to create
a fully sandboxed DNS zone that resolves every `*.editor.land` domain to
`127.0.0.1`, so that editor-internal services communicate over loopback without
any packet leaving the network interface.

---

## The Problem Mist Is Designed to Solve

VS Code extensions, update checks, and telemetry endpoints all resolve against
public DNS. Even with telemetry disabled, DNS queries can leak metadata about
which extensions are installed and when the editor starts. There is no clean
technical boundary between editor traffic and internet traffic.

Developers working on airgapped machines or behind strict firewalls face a
different failure mode: DNS resolution hangs before timing out, and the editor
stutters while waiting.

---

## How Mist Is Designed to Eliminate It

Mist will intercept all DNS queries for the `*.editor.land` zone before they
reach the system resolver. Every query will resolve instantly to `127.0.0.1`.
The editor's internal services will communicate over loopback.

For domains outside the `*.editor.land` zone, Mist will pass queries through
to the system resolver unchanged. All other applications will behave exactly
as before.

---

## What Mist Will Enable

When Mist is implemented, the editor will start and operate without any public
DNS dependency. On airgapped machines, the editor will work at full speed
because it will never wait for a DNS response from outside. On corporate
networks, no outbound DNS traffic will be visible from the editor process.

---

## Key Technologies

Rust, DNS-over-Loopback, Sandboxed Zone Resolution.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Air](/Doc/air)
- [Source Code](https://github.com/CodeEditorLand/Mist)
