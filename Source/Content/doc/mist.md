---
title: "Mist"
section: "Element"
order: 20
description:
    "The DNS sandbox that resolves *.editor.land locally."
---

# Mist

Mist is the network boundary between Code Editor Land and the outside
world. It creates a fully sandboxed DNS zone that resolves every
`*.editor.land` domain to `127.0.0.1`. Nothing leaves your machine unless
you explicitly allow it.

## The Problem

VS Code extensions, update checks, and telemetry endpoints all resolve
against public DNS. Even with telemetry disabled, DNS queries still leak
metadata about which extensions are installed, when the editor starts, and
how often it phones home. There is no clean boundary between editor traffic
and internet traffic.

Developers working on airgapped machines or behind strict firewalls face a
different failure mode: DNS resolution hangs for seconds before timing out,
and the editor stutters while it waits.

## How Mist Eliminates It

Mist intercepts all DNS queries for the `*.editor.land` zone before they
reach the system resolver. Every query resolves instantly to `127.0.0.1`.
The editor's internal services (authentication, extension marketplace,
update checks) communicate over loopback without any packet leaving the
network interface.

For domains outside the `*.editor.land` zone, Mist passes queries through
to the system resolver unchanged. Your browser, terminal, and every other
application behave exactly as before.

## What You Experience

The editor starts and operates without any public DNS dependency. No
metadata leaks. No firewall warnings. No timeout delays on restricted
networks.

On airgapped machines, the editor works at full speed because it never
waits for a DNS response that will never come. On corporate networks, IT
sees zero outbound traffic from the editor process.

## Key Technologies

Rust, DNS-over-Loopback, Sandboxed Zone Resolution, Zero-Leak Network
Boundary.

## See Also

- [Architecture Overview](/Doc/architecture)
- [Air](/Doc/air)
- [Source Code](https://github.com/CodeEditorLand/Mist)
