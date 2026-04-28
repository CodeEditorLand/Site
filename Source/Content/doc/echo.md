---
title: "Echo"
section: "Element"
order: 16
description: "The work-stealing task scheduler embedded inside Mountain's Rust binary."
---

# Echo

Echo is a work-stealing task scheduler written in Rust. It is not a separate
process - it is embedded directly inside Mountain's binary. When Mountain
needs to dispatch parallel work (file indexing, search, background jobs), it
submits tasks to Echo's worker pool rather than spawning child processes.

Echo is built on [crossbeam-deque](https://github.com/crossbeam-rs/crossbeam)
for lock-free work stealing and [tokio](https://tokio.rs) for async I/O.

---

## What Work Stealing Means

A work-stealing scheduler maintains a queue of pending tasks per worker thread.
When a thread finishes its own queue, it steals tasks from the back of a busy
thread's queue rather than waiting idle. This keeps all available CPU cores
busy without a central dispatcher becoming a bottleneck.

The practical effect is that a batch of independent tasks - reading 200 files,
running ripgrep over a large workspace, computing symbol indexes - completes
faster than sequential dispatch and uses available cores without requiring the
caller to manage thread lifetimes manually.

---

## How Echo Relates to Mountain

VS Code dispatches background work (file indexing, symbol scanning, search)
through its shared process and extension host, both of which are Node.js. Heavy
batches compete with extension event handlers on the same event loop.

Because Echo runs inside Mountain's Rust binary, background work dispatched
through Echo runs on native threads outside the Node.js event loop entirely.
Cocoon's fiber scheduler and Echo's worker pool are independent - a saturated
Echo pool does not delay Cocoon's extension fibers, and a slow extension
activation does not delay Echo's background tasks.

---

## Current Status

Echo is part of Mountain's binary and the worker pool infrastructure is in
place. The following reflects what is verified versus what is planned:

**Verified:**
- Echo's worker pool is active inside Mountain when running in the
  `debug-mountain` profile.
- File system operations dispatched through Mountain route through Echo's
  async runtime.

**Planned but not yet verified in production:**
- Workspace-wide symbol indexing dispatched through Echo's work-stealing pool.
- Search (ripgrep dispatch) running as Echo tasks rather than blocking the
  Mountain main loop.
- Build pipeline jobs submitted to Echo for parallel execution.

The distinction matters: the scheduler exists and runs, but the full set of
workloads described in the design are not all confirmed to be using it yet.

---

## Supervision and Shutdown

Echo tasks run inside supervised scopes. Each task has a parent scope; if a
task panics, the panic is caught at the scope boundary and reported without
taking down the Mountain process. When the editor closes, Mountain signals
Echo's pool to drain - no task outlives its scope, which prevents orphaned
threads from holding file handles or sockets after shutdown.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Mountain: Native Kernel](/Doc/mountain)
- [Source Code](https://github.com/CodeEditorLand/Echo)
