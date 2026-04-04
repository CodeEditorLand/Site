---
title: "Echo"
section: "Element"
order: 16
description: "The work-stealing scheduler that runs indexing, search, and builds on every CPU core"
---

# Echo

## The Problem Echo Solves

VS Code's background tasks (file indexing, symbol scanning, git blame, search) run in a single-threaded Node.js process. Heavy indexing blocks all other activity on that thread. The only escape is spawning more processes, which adds memory overhead and inter-process communication costs.

## How Echo Eliminates It

Echo is a lock-free concurrency runtime built on Rust's crossbeam-deque work-stealing scheduler. Every task submitted to Echo runs inside a supervised worker pool that spans all CPU cores. Tasks are work-stolen (idle threads pick up tasks from busy threads), supervised (every task has a parent scope with controlled crash propagation), and gracefully shut down (no task can outlive its scope).

## What You Experience

A 20-file refactor, a workspace-wide symbol search, and a test run can all happen in true parallel on separate CPU cores. The editor stays responsive throughout. Indexing, search, and builds run on every core in parallel while the UI thread never blocks.

## Key Technologies

Echo is written in Rust using crossbeam-deque for lock-free work stealing and tokio for async I/O.

## See Also

- [Architecture Overview](/Doc/architecture)
- [Mountain: Native Backend](/Doc/mountain)
- [Source Code](https://github.com/CodeEditorLand/Echo)
