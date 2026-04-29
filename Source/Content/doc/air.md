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
with its own lifecycle. Mountain integrates with Air through the `AirIntegration`
feature flag, which is enabled by default in the standard build.

---

## Responsibilities

- **Update checks** — polling for new releases of Editor.Land.
- **Download management** — fetching release payloads in the background so
  they are available when the user chooses to update.
- **Release signing and verification** — verifying the integrity of downloaded
  releases before they are applied, using the signing infrastructure defined
  in the Air crate.

---

## Current Status

**Active:**
- Air exists as a Rust crate in the CodeEditorLand organisation
  ([source](https://github.com/CodeEditorLand/Air)) and is integrated with
  Mountain via the `AirIntegration` feature flag, which is on by default.
- Mountain's `Update` module coordinates in-process update checks and download
  scheduling with Air during an active session.
- Air runs as a separate process — update checks and downloads do not compete
  with the editor's main loop.

**In Progress:**
- The full end-to-end download-and-apply flow (check → download → verify →
  prompt → apply) is active in design; staged rollout and silent-install paths
  are being finalised.
- Documentation of the specific signing algorithm used for release
  verification is pending.

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
