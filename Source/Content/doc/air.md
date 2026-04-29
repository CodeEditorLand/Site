---
title: "Air"
section: "Element"
order: 15
description: "The Rust background daemon responsible for updates, downloads, release signing, and platform-native service lifecycle management."
---

# Air

Air is a background daemon written in Rust. It runs as a separate process from
Mountain and handles all editor maintenance tasks that should run outside of an
active editing session: checking for new releases, downloading update payloads,
verifying their integrity before they are applied, and managing its own
lifecycle as a platform-native service on Linux, macOS, and Windows.

Air is listed in Layer 1 of the architecture alongside Mountain as part of the
native shell. It is not embedded in Mountain's binary — it is a peer process
with its own full lifecycle. Mountain integrates with Air through the
`AirIntegration` feature flag, which is enabled by default in the standard
build.

---

## Responsibilities

Air covers a wide surface area:

- **Update checks** — polling for new releases of Editor.Land and scheduling
  downloads in the background.
- **Download management** — fetching release payloads so they are available
  when the user chooses to update, without blocking the editor.
- **Release signing and verification** — verifying the integrity of downloaded
  releases using the signing infrastructure defined in the Air crate.
- **Daemon lifecycle management** — PID file creation, checksum-based integrity
  verification, stale PID detection, and atomic lock acquisition with rollback
  on failure. Race conditions are guarded by a Tokio `Mutex`; all file writes
  use atomic temp-file rename to avoid partial state.
- **Platform-native service integration** — Air generates and installs its own
  service descriptor on each supported platform:
  - **Linux** — systemd unit file with hardened sandbox options
    (`NoNewPrivileges`, `PrivateTmp`, `ProtectSystem=strict`).
  - **macOS** — launchd `.plist` with keep-alive, resource limits, and
    environment variables.
  - **Windows** — Windows Service Control Manager registration via the SCManager
    API; the `Air.pid` file is placed at `C:\ProgramData\Air\Air.pid`.
- **Health monitoring** — `HealthCheck` and `Metrics` modules report daemon
  status and expose runtime counters for observability.
- **Authentication and security** — dedicated `Authentication` and `Security`
  modules handle credential management and privilege isolation.
- **Resilience** — the `Resilience` module provides crash recovery and
  restart coordination. The daemon can request its own graceful shutdown and
  clear that request for restart scenarios without losing state.
- **Tracing and logging** — structured tracing via the `Tracing` and `Logging`
  modules; structured dev-log output is enabled in debug builds.
- **Plugin system** — a `Plugins` module allows extension of Air's background
  task surface without modifying the core daemon.
- **Indexing** — an `Indexing` module handles workspace metadata that needs to
  be computed outside of an active editing session.

---

## Daemon Lifecycle in Detail

Air's `DaemonManager` enforces a single-instance constraint through a PID file
whose path is platform-appropriate (`/var/run/Air.pid` on Linux,
`/tmp/Air.pid` on macOS, `C:\ProgramData\Air\Air.pid` on Windows). The PID
file contains both the process ID and a SHA-256 checksum of the PID and
timestamp, so stale files left by a previous crash are detected and cleaned up
automatically on the next start.

When the editor closes, Mountain signals Air's daemon to drain gracefully.
Air sets a `ShutdownRequested` flag, rejects new lock acquisition, and removes
its PID file atomically. No resources are left behind after a clean shutdown.

---

## What Air Is Not

Air is not responsible for cold-boot time. The editor's cold-boot sequence
(Mountain start, Cocoon activation, Sky render) runs independently of whether
Air is running. Air starts and daemonises after the editor is already open.
Its background work does not appear on the startup critical path.

---

## In Progress

- Full end-to-end staged rollout and silent-install paths are being finalised.
- `winsvc` integration for direct Windows Service registration via the SCM is
  in active development; the current path writes a compatible configuration
  file and documents the `sc create` / `sc start` steps.
- Daemon auto-update notifications and in-place hot-reload.
- Log rotation for daemon log files.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Mountain: Native Kernel](/Doc/mountain)
- [Local-First Protocol](/Doc/local-first-protocol)
- [Source Code](https://github.com/CodeEditorLand/Air)
