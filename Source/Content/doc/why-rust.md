---
title: "Why Rust"
section: "Technology"
order: 26
description:
    "Memory safety without garbage collection, native speed, and fearless
    concurrency."
---

# Why Rust

Land is a code editor. It needs native services for files, terminals, search,
processes, and long-running background work. `Rust` gives those services memory
safety, strong concurrency tools, and predictable resource ownership without a
garbage collector.

---

## Memory Safety Without a Garbage Collector

C and C++ editors have historically shipped with entire classes of
vulnerabilities: buffer overflows, use-after-free, double-free, and dangling
pointers. Garbage-collected languages like Go or Java eliminate those bugs, but
they introduce unpredictable pauses. A GC pause of even 10 milliseconds is
visible to a user who is typing. `Rust` eliminates both problems. The ownership
system enforces memory safety at compile time. There is no garbage collector to
pause the editor, and there are no dangling pointers to crash it.

---

## Fearless Concurrency

A modern editor runs dozens of tasks in parallel: language servers, file
watchers, syntax highlighting, search indexing, terminal I/O, and extension
hosts. In C++, coordinating these tasks requires manual lock management, and a
single mistake produces a data race that may surface weeks later in production.
`Rust`'s ownership model prevents data races at compile time. If the code
compiles, the concurrency is sound. This is what the `Rust` community calls
"fearless concurrency," and it is not a slogan. It is a compiler guarantee.

---

## Performance Without Compromise

`Rust` compiles to native machine code with no runtime overhead. There is no
interpreter, no JIT warmup, and no virtual machine. The generated code is
competitive with hand-tuned C, and in many benchmarks it matches or exceeds it
due to aliasing guarantees that allow more aggressive optimization.

---

## The Cargo Ecosystem

`Rust`'s package manager, `Cargo`, provides deterministic builds, integrated
testing, documentation generation, and access to over 150,000 crates. Land uses
`Cargo` workspaces to manage its `Rust` elements as a single coordinated build.
Dependencies are pinned through `Cargo` manifests and the workspace lockfile.
Reproducibility is described per release profile once public artifacts are
published.

---

## Where Rust Appears in Land

`Rust` powers the majority of Land's backend:

- **`Mountain`** handles window management, file system access, process
  lifecycle, terminals, `IPC`, and `Cocoon` startup through `Tauri`.
- **`Air`** contains background services for updates, downloads, integrity
  checks, authentication, indexing, health, and network calls.
- **`Echo`** provides work-stealing task execution for CPU-bound operations.
- **`Common`** defines abstract traits and data transfer objects shared across
  elements.
- **`Vine`** implements `gRPC` protocol definitions for inter-process
  communication.
- **`Rest`** contains `OXC`-based `TypeScript` transform work for the output
  pipeline.
- **`SideCar`** downloads and organizes `Node.js` binaries per target triple at
  build time, enabling `Cocoon` to run with the correct `Node.js` version on
  macOS, Windows, and Linux without runtime detection.
- **`Grove`** contains a Wasmtime-backed `WebAssembly` host path with `gRPC`
  protocol, `API` surface, and transport code. Integration with the primary
  build is in progress.
- **`Mist`** provides local DNS, resolver, WebSocket, zone, and forward-security
  code for local service-boundary work.

Every element that touches the operating system, processes bytes, or coordinates
concurrent native work uses `Rust` where the repository has a `Rust` element for
that role. The language is a structural decision, not decoration.

---

## See Also

- [Architecture Overview](https://editor.land/Doc/architecture)
- [Why `Tauri`](https://editor.land/Doc/why-tauri)
- [Why `gRPC`](https://editor.land/Doc/why-grpc)
- [Why `WebAssembly`](https://editor.land/Doc/why-wasm)
