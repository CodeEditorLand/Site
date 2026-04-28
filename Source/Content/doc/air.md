---
title: "Air"
section: "Element"
order: 15
description: "The Rust background daemon responsible for updates, downloads, and release signing."
---

# Air

Air is a background daemon written in Rust. It runs as a separate process from
Mountain and is responsible for the parts of editor maintenance that should
happen outside of an active editing session: checking for new releases,
downloading update payloads, and verifying their integrity before they are
applied.

Air is listed in Layer 1 of the architecture alongside Mountain as part of the
native shell. It is not embedded in Mountain's binary — it is a peer process
with its own lifecycle.

---

## Stated Responsibilities

Based on the architecture definition, Air's responsibilities are:

- **Update checks** — polling for new releases of Editor.Land.
- **Download management** — fetching release payloads in the background so
  they are available when the user chooses to update.
- **Crypto signing / verification** — verifying the integrity of downloaded
  releases before they are applied. The specific signing algorithm (PGP,
  Sigstore, or another mechanism) is not yet documented.

These are the design responsibilities for Air. The sections below are honest
about what is confirmed working versus what is planned.

---

## Current Status

**Confirmed:**
- Air exists as a Rust crate in the CodeEditorLand organisation
  ([source](https://github.com/CodeEditorLand/Air)).
- It is defined as a separate process in the architecture, not embedded in
  Mountain.

**Not yet verified in agent run logs or profiler output:**
- End-to-end update check, download, and apply flow working in the
  `debug-mountain` profile.
- The specific signing mechanism used for release verification.
- Communication protocol between Air and Mountain (whether via Vine gRPC,
  a separate IPC channel, or direct OS signals).
- Pre-indexing of workspace changes between sessions.
- Language server cache warm-up between sessions.

The last two items — pre-indexing and warm-cache — are not confirmed as
features of Air's current implementation. They may be planned capabilities;
they are not documented as working today.

---

## What Air Is Not

Air is not responsible for cold-boot time. The editor's cold-boot sequence
(Mountain start, Cocoon activation, Sky render) runs independently of whether
Air is running. Verified cold-boot time on Apple Silicon macOS with 47
extensions is approximately 2,400 ms — this is a Mountain + Cocoon + Sky
number, not an Air number.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Mountain: Native Kernel](/Doc/mountain)
- [Local-First Protocol](/Doc/local-first-protocol)
- [Source Code](https://github.com/CodeEditorLand/Air)
