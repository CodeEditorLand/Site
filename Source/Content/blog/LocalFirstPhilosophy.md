---
title: "Local-First Philosophy: Why Your Code Never Leaves Your Machine"
summary:
    "Land's local-first architecture keeps all data on your device by default."
publishedAt: "2026-04-02"
tags: ["Local-First", "Architecture", "Privacy"]
author: "CodeEditorLand"
readTime: 7
---

# Local-First Philosophy: Why Your Code Never Leaves Your Machine

Code Editor Land is built on a local-first principle: every file, setting,
extension, and snippet lives on your machine by default. The cloud is opt-in,
never opt-out.

## The Problem with Cloud-First Editors

VS Code's ecosystem increasingly assumes cloud connectivity. Settings Sync
requires a GitHub or Microsoft account. Remote Development tunnels your
workspace through Microsoft servers. Copilot streams code to external APIs. Each
feature trades convenience for control.

For developers working under NDAs, in air-gapped environments, or simply
exercising their right to privacy, this trade-off is unacceptable. A code editor
should function at full capacity with zero network access.

## How Land Stays Local

### Settings and State

Land stores all configuration in a local JSON file hierarchy. There is no cloud
sync enabled by default. Your keybindings, themes, and workspace state never
leave the machine unless you explicitly configure synchronization. See
[Configuration](/Doc/configuration) for the exact settings file locations on
each platform.

### Extensions

Extensions are installed to a local extensions directory (or the existing
`~/.vscode/extensions/` directory for compatibility with existing VS Code
installs). The extension marketplace can be self-hosted. Land does not phone home
to verify extension licenses or collect telemetry on extension usage.

### Telemetry

Land ships with telemetry **disabled** by default. When the user opts in, data
flows to a self-hosted PostHog instance operated by the CodeEditorLand
Foundation. No data is shared with third parties.

## Air Daemon: Sync When You Want It

The **Air** element provides optional peer-to-peer synchronization through the
Air Daemon. Air uses mDNS discovery on the local network to find other Land
instances without requiring a central server. When two machines connect:

1. **Delta sync** - only changed files transfer, using content-addressed
   hashing (BLAKE3).
2. **Conflict resolution** - last-write-wins by default, with a merge UI for
   manual resolution.
3. **Encryption** - all sync traffic is encrypted with NaCl (libsodium)
   `crypto_box` (X25519 + XSalsa20 + Poly1305). Keys stay on your devices.

Air never routes through a central server. If you want cloud backup, you point
Air at your own S3-compatible bucket or WebDAV endpoint.

## No Cloud Lock-In

Because Land is CC0 1.0 Universal (public domain), there is no vendor lock-in at
any level:

- **Source code** - fork and modify without restriction.
- **Data format** - standard JSON, SQLite, and plain-text files.
- **Extensions** - compatible with the VS Code extension API.
- **Sync protocol** - documented and self-hostable.

You can switch away from Land tomorrow and take everything with you. That is the
point.

## Comparison

| Concern          | VS Code                            | Land                      |
| ---------------- | ---------------------------------- | ------------------------- |
| Settings storage | Cloud Sync (Microsoft)             | Local files               |
| Telemetry        | Opt-out                            | Opt-in                    |
| Sync protocol    | Proprietary                        | Open (Air Daemon, mDNS)   |
| Extension source | Microsoft Marketplace              | Self-hostable marketplace |
| License          | MIT (source), proprietary (binary) | CC0 1.0 Universal         |

Local-first is not a feature. It is the foundation everything else is built on.
