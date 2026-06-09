---
title: "Echo"
section: "Elements"
order: 3
description:
    "Echo is the work-stealing task scheduler embedded in Mountain, providing
    priority-aware concurrent execution for background work without competing
    with the Node.js extension host."
---

Echo is a bounded work-stealing task scheduler written in Rust. It is not a
separate process - it is a library embedded directly inside Mountain's binary.
When Mountain needs to dispatch parallel work, it submits tasks to Echo's worker
pool rather than spawning child processes or relying on tokio's default
scheduler alone.

Echo is built on [crossbeam-deque](https://github.com/crossbeam-rs/crossbeam)
for lock-free work-stealing deques and integrates with Mountain's
`ApplicationRunTime` as the execution engine for `ActionEffect` values defined
in Common.

## What Work-Stealing Means

A work-stealing scheduler maintains a queue of pending tasks per worker thread.
When a thread finishes its own queue, it steals tasks from the back of a busy
thread's queue rather than waiting idle. This keeps all available CPU cores busy
without a central dispatcher becoming a bottleneck under uneven load.

The practical effect is that a batch of independent tasks - reading 200 files
for a search, computing symbol indexes across a workspace, processing extension
manifests - completes faster than sequential dispatch and saturates available
cores without the caller managing thread lifetimes manually.

## Why Echo Instead of Raw tokio

VS Code dispatches background work through its shared process and extension
host, both of which run on the Node.js event loop. Heavy I/O-bound batches
compete with extension event handlers on that same loop.

Because Echo runs inside Mountain's Rust binary, background work dispatched
through Echo runs on native threads completely outside the Node.js event loop.
Cocoon's extension fibers and Echo's worker pool are independent schedulers - a
saturated Echo pool does not delay Cocoon's extension activations, and a slow
extension does not delay Echo's background tasks.

## Priority System

Echo supports three priority levels. Each worker thread maintains a triple of
deques - one per priority - and always drains the highest non-empty deque first.

| Priority | Use Case                                                  | Deque                                    |
| -------- | --------------------------------------------------------- | ---------------------------------------- |
| `High`   | User interactions, UI updates, command execution          | Dedicated per-worker high-priority deque |
| `Normal` | File operations, configuration reads, extension API calls | Default deque                            |
| `Low`    | Background indexing, search, telemetry, cache warming     | Dedicated per-worker low-priority deque  |

High-priority tasks are never starved by background work. A batch of
Low-priority index scans does not delay a High-priority command execution
because the worker checks High before Low on every scheduling cycle.

## Integration with Mountain's ApplicationRunTime

Echo serves as the execution engine for Mountain's `ApplicationRunTime`. When
Mountain calls `Runtime.Run(effect).await`, the runtime wraps the effect's
future in an Echo `Task` and submits it to the scheduler with an appropriate
priority. The worker thread that picks up the task resolves the required
capability from Mountain's environment and executes the future.

```rust
// Mountain's ApplicationRunTime submits effects to Echo
let effect = FileSystem::ReadFile(PathBuf::from("/workspace/src/main.rs"));
let content: Vec<u8> = runtime.Run(effect).await?;
```

Effect execution overhead when integrated with Echo is under 1 microsecond. The
task submission latency is approximately 0.05 ms; queue operations (lock-free
push/pop) are approximately 0.02 ms.

## Worker Pool

The `SchedulerBuilder` configures the pool at startup. It defaults to the number
of logical CPU cores with a minimum of two workers (work-stealing is not useful
with a single worker).

```rust
use Echo::Scheduler::SchedulerBuilder;
use Echo::Task::Priority;

let scheduler = Arc::new(
    SchedulerBuilder::Create()
        .WithWorkerCount(num_cpus::get())
        .Build()
);

// Submit work with explicit priority
scheduler.Submit(async { handle_user_input().await }, Priority::High);
scheduler.Submit(async { read_file(path).await }, Priority::Normal);
scheduler.Submit(async { index_workspace(ws).await }, Priority::Low);
```

## Supervision and Shutdown

Echo tasks run inside supervised scopes. If a task panics, the panic is caught
at the scope boundary and reported via Mountain's diagnostic logging without
taking down the Mountain process. This prevents a buggy extension-triggered
operation from crashing the entire editor.

When Mountain shuts down, it calls `scheduler.Stop().await`, which signals all
worker threads to drain their queues and waits for each in-flight task to
complete before joining the threads. No task outlives its scope, which prevents
orphaned threads from holding file handles or network sockets after shutdown.

## Source Structure

```
Echo/Source/
    Library.rs               # Crate root; re-exports the public API
    Queue/
        StealingQueue.rs     # Lock-free double-ended queue (crossbeam-deque)
    Scheduler/
        Scheduler.rs         # Main scheduler: Submit API and graceful Stop
        SchedulerBuilder.rs  # Fluent builder: worker count, queue capacity, thread names
        Worker.rs            # Per-worker thread: local deque triple, steal-on-idle loop
    Task/
        Task.rs              # Generic Future wrapper
        Priority.rs          # Priority enum: High, Normal, Low
```

## Performance Characteristics

| Metric                               | Value                      |
| ------------------------------------ | -------------------------- |
| Task submission latency              | ~0.05 ms                   |
| Queue operation (lock-free push/pop) | ~0.02 ms                   |
| Work-stealing transfer               | ~0.1 ms                    |
| Memory per task                      | < 64 bytes                 |
| Effect execution overhead            | < 1 µs                     |
| Scaling                              | Linear with CPU core count |

## Current Status

Echo is active inside Mountain's binary on macOS (Apple Silicon and Intel) and
Windows. The worker pool initialises during Mountain's startup sequence and
handles all async work dispatched through `ApplicationRunTime`. In-process file
search using `grep-regex` and `grep-searcher` (ripgrep-compatible, no child
process) is dispatched through the Echo task layer. Workspace-wide symbol
indexing infrastructure is present; index computation routines are being
connected.

## Related Documentation

- [Echo Deep Dive](https://editor.land/Doc/deep-dive-echo)
- [Mountain](https://editor.land/Doc/mountain)
- [Common](https://editor.land/Doc/common)
- [Source Code](https://github.com/CodeEditorLand/Echo)
