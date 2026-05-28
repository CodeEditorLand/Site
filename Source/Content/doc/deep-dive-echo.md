---
title: "Echo - Deep Dive"
section: "Deep Dive"
order: 36
description:
    "Work-stealing scheduler architecture, priority queues, and Mountain
    integration"
---

# Echo - Deep Dive

Echo is a work-stealing scheduler providing high-performance task execution for
Mountain's ApplicationRunTime and other components requiring async task
management.

## Architecture 🏗️

Built on `crossbeam-deque` for lock-free work-stealing queues. Supports three
priority levels (High, Normal, Low) for latency-sensitive operations.

### Core Components

| Module             | Role                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| `Task`             | Unit of work with priority, generic future support, execution context       |
| `Queue`            | Lock-free work-stealing queue using `crossbeam_deque::Worker` and `Stealer` |
| `Scheduler`        | Master coordinator with fluent builder API and worker pool                  |
| `SchedulerBuilder` | Configures worker count and scheduler parameters                            |

### Design Principles

- **Work-stealing**: Idle workers steal from busy workers' queues for load
  balancing
- **Lock-free**: All queue operations use atomic instructions
- **Structured concurrency**: Supervised worker pool with graceful
  startup/shutdown
- **Priority-aware**: High/Normal/Low queues interleaved by worker threads
- **Failure resilient**: Task failure does not crash the worker pool

## Performance ⚡

| Metric                     | Value                        |
| -------------------------- | ---------------------------- |
| Task submission latency    | ~0.05ms                      |
| Queue operations           | ~0.02ms (lock-free push/pop) |
| Work-stealing transfer     | ~0.1ms                       |
| Total task latency         | ~0.18ms + execution time     |
| Single-threaded throughput | 1M tasks/second              |
| Memory per task            | < 64 bytes                   |
| Context switch cost        | ~100 nanoseconds             |

Scales linearly with available CPU cores.

## Integration with Mountain 🔗

Echo is integrated as Mountain's primary scheduler:

```
Mountain ApplicationRunTime
  -> submits ActionEffects as Tasks to Echo
  -> Echo distributes to worker threads
  -> Workers resolve capabilities and execute
  -> Results returned to ApplicationRunTime
```

Effect execution overhead when integrated: < 1 microsecond.

## Related Documentation 📖

- [Echo overview](https://Editor.Land/Doc/echo)
- [Mountain ApplicationRunTime](https://Editor.Land/Doc/deep-dive-mountain)
- [Common ActionEffect system](https://Editor.Land/Doc/deep-dive-common)
