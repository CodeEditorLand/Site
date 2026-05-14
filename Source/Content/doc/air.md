---
title: "Air"
section: "Element"
order: 15
description:
    "Rust background services for updates, downloads, integrity checks,
    authentication, indexing, health, and Vine IPC."
---

# Air

`Air` is the `Rust` background-services element for `Editor.Land`. The source
contains modules for updates, downloads, authentication, indexing, security,
health, resilience, configuration, logging, metrics, and `Vine` `IPC`.

`Air` should be described as source-backed service plumbing. The public updater,
release signing story, and installer distribution path are still being prepared.

---

## Source Structure

Confirmed source areas include:

| Path                                    | Role                                       |
| --------------------------------------- | ------------------------------------------ |
| `Source/Binary.rs` and `Source/Binary/` | Daemon entry points and runtime wiring     |
| `Source/Authentication/`                | Authentication and credential-related work |
| `Source/Downloader/`                    | Download management                        |
| `Source/HTTP/`                          | HTTP client code                           |
| `Source/HealthCheck/`                   | Status and health reporting                |
| `Source/Indexing/`                      | Workspace metadata work                    |
| `Source/Resilience/`                    | Recovery and restart coordination          |
| `Source/Security/`                      | Integrity checks and security helpers      |
| `Source/Updates/`                       | Update-check and rollout logic             |
| `Source/Vine/`                          | Vine gRPC client stubs                     |

---

## Responsibilities

- Checking update metadata where a build profile enables that route.
- Downloading files or release payloads through `Air`'s downloader and HTTP
  code.
- Verifying file integrity through checksum-oriented security helpers.
- Reporting daemon health and runtime status.
- Running indexing work outside the active editor surface.
- Coordinating with `Mountain` through `Air` integration and `Vine` `IPC`.

---

## Coming Soon

- Public release artifacts with published checksums and signatures.
- End-to-end staged update flow in a public installer.
- Release-channel documentation that names which `Air` services are enabled.
- Platform service setup that is validated per operating system.

---

## See Also

- [Architecture Overview](https://Editor.Land/Doc/architecture)
- [`Mountain`](https://Editor.Land/Doc/mountain)
- [Local-First Protocol](https://Editor.Land/Doc/local-first-protocol)
- [Source Code](https://github.com/CodeEditorLand/Air)
