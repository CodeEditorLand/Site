---
title: "Echo"
section: "Element"
order: 16
description:
    "The work-stealing task scheduler embedded inside Mountain's Rust binary."
---

# Echo

`Echo` is a work-stealing task scheduler written in `Rust`. It is not a separate
process - it is embedded directly inside `Mountain`'s binary. When `Mountain`
needs to dispatch parallel work (file indexing, search, background jobs), it
submits tasks to `Echo`'s worker pool rather than spawning child processes.

`Echo` is built on [crossbeam-deque](https://github.com/crossbeam-rs/crossbeam)
for lock-free work stealing and [tokio](https://tokio.rs) for async I/O.

---

## What Work Stealing Means

A work-stealing scheduler maintains a queue of pending tasks per worker thread.
When a thread finishes its own queue, it steals tasks from the back of a busy
thread's queue rather than waiting idle. This keeps all available CPU cores busy
without a central dispatcher becoming a bottleneck.

The practical effect is that a batch of independent tasks - reading 200 files,
running ripgrep over a large workspace, computing symbol indexes - completes
faster than sequential dispatch and uses available cores without requiring the
caller to manage thread lifetimes manually.

---

## How Echo Relates to Mountain

`VS Code` dispatches background work (file indexing, symbol scanning, search)
through its shared process and extension host, both of which are `Node.js`.
Heavy batches compete with extension event handlers on the same event loop.

Because `Echo` runs inside `Mountain`'s `Rust` binary, background work
dispatched through `Echo` runs on native threads outside the `Node.js` event
loop entirely. `Cocoon`'s fiber scheduler and `Echo`'s worker pool are
independent - a saturated `Echo` pool does not delay `Cocoon`'s extension
fibers, and a slow extension activation does not delay `Echo`'s background
tasks.

---

## Source Structure 🗺️

`Echo`'s source tree (confirmed in the
[repository](https://github.com/CodeEditorLand/Echo)):

| Path                | Role                                                         |
| ------------------- | ------------------------------------------------------------ |
| `Source/Library.rs` | Crate root - re-exports the public API                       |
| `Source/Queue/`     | Lock-free deque implementation (work-stealing queues)        |
| `Source/Scheduler/` | Scheduler core - thread pool management and task dispatch    |
| `Source/Task/`      | Task wrapper types, supervision scopes, and panic boundaries |

---

## Current Status 🚀

`Echo` is active inside `Mountain`'s binary on both macOS and Windows. The
worker pool infrastructure runs in the `debug-mountain` build profile and is
part of the standard release build.

**Confirmed working:**

- `Echo`'s worker pool initialises and runs inside `Mountain` on macOS (Apple
  Silicon and Intel) and Windows 10/11.
- File system operations dispatched through `Mountain` route through `Echo`'s
  async runtime.
- In-process file search runs through `Mountain`'s `grep-regex` +
  `grep-searcher` integration - ripgrep-compatible search without spawning a
  child process - dispatched through the `Echo` task layer.
- Task supervision with panic-boundary scopes: a panicking task is caught at the
  scope boundary and reported without taking down the `Mountain` process.
- Graceful shutdown: `Mountain` signals `Echo`'s pool to drain before exit; no
  task outlives its scope.

**In Progress:**

- Workspace-wide symbol indexing dispatched through `Echo`'s work-stealing pool
  (infrastructure present; index computation routines being connected).
- Build pipeline jobs submitted to `Echo` for parallel execution.

---

## Supervision and Shutdown

`Echo` tasks run inside supervised scopes. Each task has a parent scope; if a
task panics, the panic is caught at the scope boundary and reported without
taking down the `Mountain` process. When the editor closes, `Mountain` signals
`Echo`'s pool to drain - no task outlives its scope, which prevents orphaned
threads from holding file handles or sockets after shutdown.

---

## Related Documentation 📖

- [Architecture Overview](https://Editor.Land/Doc/architecture)
- [`Mountain`: Native Kernel](https://Editor.Land/Doc/mountain)
- [Source Code](https://github.com/CodeEditorLand/Echo)
