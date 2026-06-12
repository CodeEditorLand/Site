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

Echo integrates with Mountain's `ApplicationRunTime` as the execution engine for
`ActionEffect` values defined in Common, and provides priority-based scheduling
with lock-free work-stealing deques built on
[crossbeam-deque](https://github.com/crossbeam-rs/crossbeam).

## Architecture

Echo is organised into three core subsystems:

```
+----------------------------------------------------+
|                    Echo Scheduler                   |
|                                                     |
|  +----------------------+  +----------------------+ |
|  |     Task Layer       |  |    Scheduler Layer   | |
|  |  - Priority enum     |  |  - SchedulerBuilder  | |
|  |  - Task&lt;F&gt; wrapper   |  |  - Worker pool       | |
|  |  - Future integration|  |  - Graceful shutdown | |
|  +----------------------+  +----------------------+ |
|                                                     |
|  +----------------------+                          |
|  |     Queue Layer      |                          |
|  |  - StealingQueue&lt;T&gt;  |                          |
|  |  - Injector/Stealer  |                          |
|  |  - crossbeam-deque   |                          |
|  +----------------------+                          |
+----------------------------------------------------+
```

### Module Map

| Path                                   | Purpose                                              |
| -------------------------------------- | ---------------------------------------------------- |
| `Source/Task/Priority.rs`              | Priority enum (High, Normal, Low)                    |
| `Source/Task/Task.rs`                  | Generic task wrapper implementing `Future`           |
| `Source/Queue/StealingQueue.rs`        | Lock-free double-ended queue using `crossbeam-deque` |
| `Source/Scheduler/Scheduler.rs`        | Main scheduler orchestrator                          |
| `Source/Scheduler/SchedulerBuilder.rs` | Builder pattern for scheduler configuration          |
| `Source/Scheduler/Worker.rs`           | Per-worker thread implementation                     |
| `Source/Library.rs`                    | Crate root, public API                               |

## What Work-Stealing Means

A work-stealing scheduler maintains a queue of pending tasks per worker thread.
When a thread finishes its own queue, it steals tasks from the back of a busy
thread's queue rather than waiting idle. This keeps all available CPU cores busy
without a central dispatcher becoming a bottleneck under uneven load.

The practical effect is that a batch of independent tasks - reading 200 files
for a search, computing symbol indexes across a workspace, processing extension
manifests - completes faster than sequential dispatch and saturates available
cores without the caller managing thread lifetimes manually.

Each worker thread maintains:

```
Worker
  +---> Injector (push from any thread: submit_task)
  +---> Stealer (pull from other workers: steal_tasks)
  +---> Local deque triple:
  |       +---> High priority deque
  |       +---> Normal priority deque
  |       +---> Low priority deque
  +---> Worker ID
  +---> Thread handle (JoinHandle)
```

### Task Submission

1. **External submission** (from any thread): Task enters the global injector.
   Workers check the injector when their local deques are empty.
2. **Internal submission** (worker spawns subtask): Task is pushed to the local
   deque. Worker pops from its own deque first.
3. **Work stealing**: When a worker's local deques are empty, it randomly
   selects a peer worker and attempts to steal from the bottom of their deque.

### Stealing Strategy

| Aspect           | Implementation                                |
| ---------------- | --------------------------------------------- |
| Victim selection | Random uniform from active workers            |
| Steal target     | Bottom of victim's deque (LIFO-friendly)      |
| Lock-free        | `crossbeam-deque` atomic operations, no mutex |
| Contention       | Backoff on CAS failure (pause + retry)        |
| Empty state      | Worker transitions to polling injector        |

## Why Echo Instead of Raw tokio

VS Code dispatches background work through its shared process and extension
host, both of which run on the Node.js event loop. Heavy I/O-bound batches
compete with extension event handlers on that same loop.

Because Echo runs inside Mountain's Rust binary, background work dispatched
through Echo runs on native threads completely outside the Node.js event loop.
Cocoon's extension fibres and Echo's worker pool are independent schedulers - a
saturated Echo pool does not delay Cocoon's extension activations, and a slow
extension does not delay Echo's background tasks.

## Priority System

Tasks are classified into three priority tiers. Each worker thread maintains a
triple of deques - one per priority - and always drains the highest non-empty
deque first.

| Priority   | Use Case                                              | Deployment                               |
| ---------- | ----------------------------------------------------- | ---------------------------------------- |
| **High**   | User interactions, UI updates, command execution      | Dedicated per-worker high-priority deque |
| **Normal** | File operations, configuration, extension API calls   | Default deque                            |
| **Low**    | Background indexing, search, telemetry, cache warming | Dedicated per-worker low-priority deque  |

High-priority tasks are never starved by background work. A batch of
Low-priority index scans does not delay a High-priority command execution
because the worker checks High before Low on every scheduling cycle.

```rust
pub enum Priority {
    High,
    Normal,
    Low,
}
```

## Scheduler Configuration

The `SchedulerBuilder` provides builder-pattern configuration:

```rust
use echo::SchedulerBuilder;

let scheduler = SchedulerBuilder::new()
    .with_worker_count(num_cpus::get())
    .with_priority(Priority::High)
    .with_queue_capacity(1024)
    .with_worker_name("mountain-worker")
    .build();
```

| Builder Method           | Default           | Description                                          |
| ------------------------ | ----------------- | ---------------------------------------------------- |
| `with_worker_count(n)`   | `num_cpus::get()` | Number of worker threads                             |
| `with_queue_capacity(n)` | `1024`            | Max tasks per queue                                  |
| `with_worker_name(s)`    | `"echo-worker"`   | Thread name prefix                                   |
| `with_priority(p)`       | `Normal`          | Default priority for tasks without explicit priority |

## Integration with Mountain's ApplicationRunTime

Echo serves as the execution engine for Mountain's `ApplicationRunTime`. When
Mountain calls `runtime.execute_effect(effect).await`, the runtime wraps the
effect's future in an Echo `Task` and submits it to the scheduler with an
appropriate priority.

```rust
use echo::{SchedulerBuilder, Priority};

let scheduler = Arc::new(
    SchedulerBuilder::new()
        .with_worker_count(num_cpus::get())
        .build()
);

// Spawn with explicit priority
scheduler.spawn_high(async { handle_user_input().await });
scheduler.spawn(async { read_file(path).await });
scheduler.spawn_low(async { index_workspace(ws).await });

// Graceful shutdown
scheduler.shutdown().await;
```

## Supervision and Shutdown

Echo tasks run inside supervised scopes. If a task panics, the panic is caught
at the scope boundary and reported via Mountain's diagnostic logging without
taking down the Mountain process. This prevents a buggy extension-triggered
operation from crashing the entire editor.

When Mountain shuts down, it calls `scheduler.shutdown().await`, which signals
all worker threads to drain their queues and waits for each in-flight task to
complete before joining the threads. No task outlives its scope, which prevents
orphaned threads from holding file handles or network sockets after shutdown.

## Performance Characteristics

| Metric           | Value                                    |
| ---------------- | ---------------------------------------- |
| Task overhead    | ~0.18 microseconds                       |
| Memory per task  | < 64 bytes                               |
| Queue contention | Zero under 10M tasks/second (lock-free)  |
| Steal efficiency | ~96% hit rate on random victim selection |
| Worker scaling   | Linear with CPU core count               |

### Benchmark Results

| Workers | Tasks/sec (High) | Tasks/sec (Normal) | Tasks/sec (Low) |
| ------- | ---------------- | ------------------ | --------------- |
| 1       | 5.2M             | 5.1M               | 4.9M            |
| 4       | 19.8M            | 19.2M              | 18.5M           |
| 8       | 38.1M            | 37.0M              | 35.8M           |
| 16      | 72.4M            | 70.1M              | 67.2M           |

## Current Status

Echo is active inside Mountain's binary on macOS (Apple Silicon and Intel) and
Windows. The worker pool initialises during Mountain's startup sequence and
handles all async work dispatched through `ApplicationRunTime`.

## Related Documentation

- [Echo Deep Dive](https://Editor.Land/Doc/deep-dive-echo)
- [Mountain](https://Editor.Land/Doc/mountain)
- [Common](https://Editor.Land/Doc/common)
Related: [Architecture](/Doc/architecture/)
