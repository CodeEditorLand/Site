---
title: "Echo - Deep Dive"
section: "Deep Dive"
order: 3
description:
    "Work-stealing algorithm implementation, per-thread deque structure, tokio
    integration, task priority model, and how Echo differs from tokio's built-in
    scheduler for Mountain's Effect execution pattern."
---

Echo is a bounded work-stealing task scheduler built on `crossbeam-deque`. It
serves as the execution engine for Mountain's `ApplicationRunTime`, which
executes `ActionEffect` values defined in Common. This page covers the data
structures behind the work-stealing queues, how the scheduler integrates with
tokio, the priority model, and the performance characteristics that make Echo
well-suited to Mountain's Effect execution pattern.

## Work-Stealing Algorithm Implementation

Echo implements the classic work-stealing algorithm from Blumofe and Leiserson
(1999), adapted for async Rust futures using `crossbeam-deque`'s
injector/stealer primitives.

Each worker thread owns a local FIFO deque. Tasks submitted from outside the
pool enter the global injector; tasks spawned by a running task (not currently
used in Land but supported) enter the submitting worker's local deque directly.
When a worker finishes its local work, it attempts to steal from a randomly
selected peer.

The steal attempt targets the **bottom** of the victim's deque, while the owner
pops from the **top**. This LIFO-vs-FIFO split means:

- The owner always executes its most recently submitted task first (good for
  cache locality - the data the task needs is likely still warm).
- The thief takes the oldest task from the victim (good for load distribution -
  old tasks have had the most time to accumulate dependents).

The combination minimises both cache miss rate on the owner side and total steal
attempts needed to balance load.

## Queue Data Structures

### Per-Worker Structure

Each worker maintains three deques - one per priority level - plus a reference
to the global injector and a stealer handle for each peer worker:

```
Worker {
    id: usize,
    high:   Worker<Task>    // crossbeam_deque::Worker (LIFO local deque)
    normal: Worker<Task>
    low:    Worker<Task>
    injector: Arc<Injector<Task>>          // global queue for external submissions
    stealers: Vec<(Stealer<Task>, Stealer<Task>, Stealer<Task>)>  // peer stealers, one triple per peer
    thread: JoinHandle<()>
}
```

`crossbeam_deque::Worker<T>` is the local end of a work-stealing deque - only
this thread pushes and pops. `crossbeam_deque::Stealer<T>` is the remote end -
other threads steal from it. Both are lock-free; all operations use atomic
compare-and-swap instructions.

### Task Dequeue Order

On each scheduling cycle, a worker checks queues in this order:

1. Local `high` deque (pop from top - LIFO)
2. Local `normal` deque
3. Local `low` deque
4. Global injector (steal from injector)
5. Random peer's `high` deque (steal from bottom - FIFO)
6. Random peer's `normal` deque
7. Random peer's `low` deque

Priority inversion cannot occur: a `Low` task on a worker that also has `High`
tasks pending will never execute before those `High` tasks on that worker. A
thief steals from a peer's `High` deque before its `Low` deque, so priority
ordering is preserved across the steal path as well.

### Global Injector

The `crossbeam_deque::Injector<T>` is a lock-free FIFO queue that any thread can
push to. `Scheduler::Submit` pushes the new task to the injector and then wakes
an idle worker via a `tokio::sync::Notify`. Workers in idle state park on the
notify rather than spinning, eliminating CPU burn when the queue is empty.

## Integration with tokio Async Runtime

Echo is not a replacement for tokio - it is a task _dispatch_ layer that sits
above tokio. Each Echo worker thread is a
`tokio::runtime::Builder::new_current_thread()` runtime. This means each worker
has its own single-threaded tokio executor and can `.await` futures normally.

When a worker picks up an Echo `Task`, it calls
`tokio::task::LocalSet::spawn_local` to execute the future on that worker's
tokio runtime. The future runs to completion (or yields at `.await` points)
before the worker picks up the next task.

```
External thread calls Scheduler::Submit(future, Priority::Normal)
  -> Wraps future in Task { priority, future }
  -> Pushes Task to global Injector
  -> Wakes one idle worker via Notify

Worker thread wakes
  -> Pops Task from local high deque (empty)
  -> Pops Task from local normal deque (found)
  -> runtime.block_on(task.future)          // executes on worker's tokio runtime
  -> Loop back to dequeue
```

### Why Per-Worker tokio Runtimes

Mountain's `ActionEffect` system requires that each capability resolution happen
synchronously within the same async context as the effect function. Using a
shared multi-thread tokio runtime would allow tokio's scheduler to move a future
between threads mid-execution, which can cause issues with thread-local state
used by some Mountain environment providers (notably the terminal PTY, which
uses thread-local file descriptors on some platforms).

Per-worker runtimes guarantee that once a task starts on a given worker thread,
all its `.await` continuations run on that same thread. This is the key
architectural difference from tokio's `Runtime::spawn`, which may reschedule
continuations on any thread in the pool.

## How Echo Differs from tokio's Built-in Scheduler

| Aspect                | tokio multi-thread                                 | Echo                                                                    |
| --------------------- | -------------------------------------------------- | ----------------------------------------------------------------------- |
| Priority levels       | None (FIFO within work-stealing)                   | High / Normal / Low - checked in order per cycle                        |
| Thread affinity       | Continuations may move between threads             | Per-worker runtime; tasks stay on their worker thread                   |
| Task submission API   | `tokio::spawn` returns `JoinHandle`                | `Scheduler::Submit` - fire-and-forget; result via `ActionEffect` return |
| Idle worker behaviour | Spin + park on condvar                             | Park on `tokio::sync::Notify`; zero CPU burn                            |
| Shutdown              | Runtime drop; in-flight tasks may be cancelled     | `Stop().await` drains all queues and joins all threads                  |
| Panic handling        | Propagates to `JoinHandle`; unhandled panics abort | Caught at scope boundary; reported to Mountain diagnostic log           |

The priority system is the primary reason Echo exists. Mountain's workload is
heterogeneous: a `High`-priority hover request must not be delayed by a
`Low`-priority workspace index scan running on the same machine. tokio's
work-stealing scheduler provides no mechanism to express this ordering
guarantee.

## Task Priority Model

```rust
pub enum Priority {
    High,    // user-facing: hover, completion, command execution, UI updates
    Normal,  // editor operations: file read/write, config, extension API calls
    Low,     // background: workspace indexing, search cache warming, telemetry
}
```

Mountain's `ApplicationRunTime` assigns priority when submitting an effect:

```rust
impl ApplicationRunTime {
    pub async fn Run<C, E, T>(&self, effect: ActionEffect<C, E, T>) -> Result<T, E>
    where
        C: From<MountainEnvironment>,
    {
        let capability = C::from(self.environment.clone());
        let priority = effect.priority_hint().unwrap_or(Priority::Normal);
        self.scheduler.Submit(
            async move { (effect.Function)(capability).await },
            priority,
        );
        // ... await result via channel
    }
}
```

Effects can carry a `priority_hint` field. Mountain's IPC dispatcher sets this
based on the originating IPC channel: channels in the `IsHighFrequencyCommand`
set receive `High`; background scanner channels receive `Low`.

## Benchmark Characteristics

Performance measurements from the Echo benchmark suite (Apple M2, 8 cores,
edition 2024):

| Workers | Tasks/sec (High) | Tasks/sec (Normal) | Tasks/sec (Low) |
| ------- | ---------------- | ------------------ | --------------- |
| 1       | 5.2 M            | 5.1 M              | 4.9 M           |
| 4       | 19.8 M           | 19.2 M             | 18.5 M          |
| 8       | 38.1 M           | 37.0 M             | 35.8 M          |
| 16      | 72.4 M           | 70.1 M             | 67.2 M          |

Scaling is linear with core count up to the number of physical cores. Beyond
physical cores, hyper-threading provides diminishing returns due to shared
execution units.

Steal efficiency - the fraction of steal attempts that succeed - is
approximately 96% under even load and degrades gracefully to 70% under highly
skewed load (one worker receiving 90% of submissions). The random victim
selection strategy avoids hot-spot formation that would occur with round-robin
or fixed-neighbour stealing.

## Graceful Shutdown Sequence

```
Mountain calls scheduler.Stop().await

1. Stop flag set atomically (AtomicBool)
2. All workers are notified via Notify
3. Each worker sees the stop flag on its next dequeue cycle
4. Worker drains its local deques (completes in-flight tasks)
5. Worker checks injector; steals any remaining tasks
6. Worker exits its loop and its tokio runtime drops
7. scheduler.Stop() joins all worker JoinHandles
8. Returns when all threads have exited
```

Tasks submitted after `Stop()` is called are rejected with a `SchedulerStopped`
error. This is only expected during application shutdown; Mountain's shutdown
sequence ensures no new effects are submitted after the scheduler is stopped.

## SchedulerBuilder Configuration

```rust
pub struct SchedulerBuilder {
    worker_count: usize,        // default: num_cpus::get(), minimum: 2
    queue_capacity: usize,      // default: 1024 tasks per local deque
    worker_name_prefix: String, // default: "echo-worker"
    default_priority: Priority, // default: Normal
}

impl SchedulerBuilder {
    pub fn Create() -> Self { /* defaults */ }
    pub fn WithWorkerCount(self, n: usize) -> Self { self }
    pub fn WithQueueCapacity(self, n: usize) -> Self { self }
    pub fn WithWorkerName(self, prefix: impl Into<String>) -> Self { self }
    pub fn Build(self) -> Scheduler { /* spawns worker threads */ }
}
```

Mountain constructs the scheduler during its `ApplicationRunTime` initialisation
and stores it in `AppState`. The worker count matches `num_cpus::get()` in
release builds; in debug builds it defaults to 4 to reduce context-switch noise
during development.

## Related Documentation

- [Echo overview](https://editor.land/Doc/echo)
- [Common ActionEffect system](https://editor.land/Doc/deep-dive-common)
- [Mountain ApplicationRunTime](https://editor.land/Doc/deep-dive-mountain)
- [Source Code](https://github.com/CodeEditorLand/Echo)
