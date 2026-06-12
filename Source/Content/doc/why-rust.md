---
title: Why Rust
section: Why Land
order: 0
description:
    Mountain, Land's native backend, is written in Rust because the operations
    an editor performs most frequently - file I/O, terminal management, OS
    dialogs, and keychain access - are exactly where a GC-pausing runtime pays
    the highest penalty.
---

VS Code with a medium project consumes 500 MB to 1.5 GB of RAM. Three windows
means three Chromium renderer processes, each carrying a full heap. Every OS
call crosses a serialized JSON IPC pipe. Mountain eliminates each of those
costs by doing the work in Rust directly.

## Memory without a garbage collector

Rust's ownership model eliminates the GC entirely. A GC pause at the moment a
user opens a large file or triggers a search produces a visible stall. Rust has
no GC — heap allocation follows explicit lifetime rules enforced at compile
time, not discovered at runtime. More invariants must be stated upfront, but
the type system enforces them before the binary is built.

## Zero-cost abstractions for async I/O

Mountain uses Tokio for async I/O. File reads, PTY writes, and directory
watches are `async fn` calls that yield to the Tokio executor while waiting on
the OS. No threads are blocked, no polling loops burn CPU. The Echo crate
layers priority tiers on top: user-facing operations (High) dispatch before
file indexing (Low) without special-casing the thread pool.

Zero-cost here means the abstraction compiles to the same machine instructions
as handwritten state machines. No interpreter, JIT warmup, or VM indirection.

## Concrete operation comparisons

| Operation | Electron/Node.js | Mountain (Rust) |
|---|---|---|
| Open file dialog | JSON IPC → main process → native bridge (~200 ms) | `tauri::dialog` direct (~2 ms) |
| Read 1 MB file | JSON IPC round-trip, re-encode in JS heap | `tokio::fs::read`, zero-copy |
| Terminal resize | Bridge serialization → PTY shim → SIGWINCH | `portable-pty` direct SIGWINCH |
| Keychain read | `keytar` native addon in Node.js | `keyring` crate, OS API direct |
| File watcher | `chokidar` polling + inotify wrapper | `notify` crate, OS-level push |

## Native OS integration without adapters

Mountain implements operations that JavaScript exposes only through native
addons or IPC bridges:

- **PTY management** via `portable-pty` — resize sends SIGWINCH directly
- **Keychain access** via `keyring` — Security framework (macOS), libsecret
  (Linux), Credential Manager (Windows). AES-256-GCM with machine-stable key.
- **File watchers** via `notify` — FSEvents, inotify, ReadDirectoryChangesW.
  Push-based, not polling.
- **Codesign** via Tauri's `tauri.conf.json` + `Entitlements.plist` — hardened
  runtime, keychain, network client entitlements without an Xcode project.

## Tauri command dispatch

Rust functions registered with `#[tauri::command]` are callable from the
WebView via `invoke()`. If the TypeScript caller sends the wrong shape, JSON
deserialization fails before Mountain's handler runs. No runtime duck-typing at
the IPC boundary.

## Edition 2024 and MSRV 1.95

Mountain uses Rust edition 2024, which tightens lifetime elision rules. MSRV is
1.95.0, which includes stabilized `AsyncFn` traits. Pinned in
`rust-toolchain.toml`. The workspace carries 51 `[patch.crates-io]` redirects
that are version-sensitive — do not upgrade the toolchain without auditing
those patches.

## What Rust does not solve

Rust does not make the extension host faster. Cocoon (Node.js) is still a
single event loop. That problem is addressed by Effect-TS structured
concurrency. Mountain's role is the native layer — OS calls, IPC dispatch, PTY
management — the operations where a GC runtime pays the highest per-call cost.

## Related Documentation

- [Why Tauri](https://Editor.Land/Doc/why-tauri)
- [Why Effect-TS](https://Editor.Land/Doc/why-effect-ts)
- [Why gRPC](https://Editor.Land/Doc/why-grpc)
