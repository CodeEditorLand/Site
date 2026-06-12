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

VS Code with a medium project consumes 500 MB to 1.5 GB of RAM. Three open
windows means three Chromium renderer processes, each carrying a full heap.
Every OS call - opening a dialog, reading a file, resizing a terminal - crosses
a serialized JSON IPC pipe. Mountain, Land's native backend, eliminates each of
those costs by doing the work in Rust directly.

## 💾　Memory without a garbage collector

Rust's ownership model eliminates the garbage collector entirely. This matters
most when the operations that cause GC pressure are also the ones that need to
be fast: file reads, directory scans, terminal output streaming, and
render-cycle state updates. A GC pause at the moment a user opens a large file
or triggers a search produces a visible stall. Rust has no GC and therefore no
GC pauses - heap allocation follows explicit lifetime rules enforced at compile
time, not at runtime.

The tradeoff is that more invariants must be stated explicitly, but the type
system enforces them before the binary is built rather than discovering them as
heap corruption or undefined behavior at runtime.

## ⚡　Zero-cost abstractions for async I/O

Mountain uses Tokio as its async runtime. File reads, terminal PTY writes, and
directory watches are all `async fn` calls that yield to the Tokio executor
while waiting on the OS. No threads are blocked, and no polling loops burn CPU.
The Echo crate - Land's bounded work-stealing scheduler - layers priority tiers
on top: user-facing operations (High) are dispatched before file indexing (Low)
without special-casing the thread pool.

```rust
// High-priority: user-facing operations
scheduler.spawn_high(handle_user_input()).await;

// Normal: file operations
scheduler.spawn(read_file(path)).await;

// Low: background indexing
scheduler.spawn_low(index_workspace(workspace)).await;
```

Zero-cost here means the abstraction compiles to the same machine instructions
as handwritten async state machines. There is no interpreter, no JIT warmup, and
no virtual machine indirection for using it.

## 📊　Concrete operation comparisons

The performance gap is not abstract. These are operations Land performs on every
user interaction:

| Operation        | Electron/Node.js path                           | Mountain (Rust) path                                    |
| ---------------- | ----------------------------------------------- | ------------------------------------------------------- |
| Open file dialog | JSON IPC → Node.js main process → native bridge | `tauri::dialog` direct call, ~2 ms                      |
| Read 1 MB file   | JSON IPC round-trip, UTF-8 re-encode in JS heap | `tokio::fs::read`, zero-copy into Tauri response        |
| Terminal resize  | Bridge serialization → PTY shim → SIGWINCH      | `portable-pty` SIGWINCH direct, no intermediate process |
| Keychain read    | `keytar` native addon loaded into Node.js       | `keyring` crate, OS keychain API direct                 |
| File watcher     | `chokidar` polling + inotify wrapper            | `notify` crate, OS-level FSEvents/inotify directly      |

The dialog comparison - approximately 2 ms for Mountain vs approximately 200 ms
for Electron - reflects the difference between a direct Tauri API call and a
round-trip through a Node.js main process that then calls the native bridge.

## 🔌　Native OS integration without adapters

Several editor operations require capabilities that JavaScript runtimes expose
only through native addons or IPC bridges. Mountain implements them natively:

**PTY management.** Mountain uses the `portable-pty` crate to spawn and manage
native pseudo-terminals. Terminal resize sends SIGWINCH directly. There is no
intermediate process and no polling loop between the terminal and the PTY.

**Keychain access.** The `keyring` crate calls the OS keychain API - Security
framework on macOS, libsecret on Linux, Windows Credential Manager on Windows.
Land's `encryption:encrypt` / `encryption:decrypt` handlers use AES-256-GCM with
a machine-stable key derived from the system UUID. No Node.js native addon is
needed.

**File watchers.** The `notify` crate registers OS-level watchers: FSEvents on
macOS, inotify on Linux, ReadDirectoryChangesW on Windows. These are push-based,
not polling-based.

**Codesign entitlements.** Tauri's `tauri.conf.json` and the
`Entitlements.plist` file are the single sources of truth for what the FIDDEE
binary is permitted to do on macOS - hardened runtime, keychain access, and
network client capability - without a separate Xcode project.

## 🎯　Tauri command dispatch

Mountain registers Rust functions that the WebView can call via `invoke()`. The
Tauri `#[tauri::command]` macro wires the JSON deserialization automatically,
and the type system enforces the contract at compile time.

```rust
#[tauri::command]
async fn read_file(
    path: String,
    state: State<'_, AppState>
) -> Result<Vec<u8>, String> {
    let fs = state.file_system();
    fs.read_file(std::path::Path::new(&path))
        .await
        .map_err(|e| e.to_string())
}
```

If the TypeScript caller sends the wrong shape, JSON deserialization fails
before Mountain's handler runs. There is no runtime duck-typing at the IPC
boundary.

## 🔢　Edition 2024 and MSRV 1.95

Mountain and all Land Rust crates except Grove use Rust edition 2024. Edition
2024 tightens lifetime elision rules and promotes several patterns from warnings
to errors. The minimum supported Rust version is 1.95.0, which includes
stabilized `AsyncFn` traits used in the scheduler integration. Grove targets
WASM and stays on edition 2021 for WASM toolchain compatibility.

> [!IMPORTANT] The Rust toolchain is pinned in `Land/rust-toolchain.toml`. The
> workspace carries 51 `[patch.crates-io]` redirects in `Cargo.toml` that are
> version-sensitive. Do not upgrade the toolchain without auditing those
> patches.

## ❌　What Rust does not solve

Rust does not make the extension host faster in isolation. Cocoon - the Node.js
sidecar that runs VS Code extensions - is still a single Node.js event loop. One
hung Promise in an extension still blocks other extensions in that process. That
problem is addressed by Effect-TS structured concurrency in Cocoon, not by Rust.
Mountain's role is the native layer: OS calls, IPC dispatch, PTY management, and
keychain access - the operations where a GC runtime pays the highest per-call
cost.
