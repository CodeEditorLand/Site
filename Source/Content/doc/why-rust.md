---
title: "Why Rust"
section: "Technology"
order: 26
description:
    "Memory safety without garbage collection, native speed, and fearless
    concurrency."
---

# Why Rust

Land is a code editor. It must respond to every keystroke in under 16
milliseconds. It must parse, highlight, index, and autocomplete across files
that span millions of lines. It must do all of this without freezing, crashing,
or leaking memory over days of continuous use. Rust is the language that makes
these guarantees possible at compile time rather than at runtime.

## Memory Safety Without a Garbage Collector

C and C++ editors have historically shipped with entire classes of
vulnerabilities: buffer overflows, use-after-free, double-free, and dangling
pointers. Garbage-collected languages like Go or Java eliminate those bugs, but
they introduce unpredictable pauses. A GC pause of even 10 milliseconds is
visible to a user who is typing. Rust eliminates both problems. The ownership
system enforces memory safety at compile time. There is no garbage collector to
pause the editor, and there are no dangling pointers to crash it.

## Fearless Concurrency

A modern editor runs dozens of tasks in parallel: language servers, file
watchers, syntax highlighting, search indexing, terminal I/O, and extension
hosts. In C++, coordinating these tasks requires manual lock management, and a
single mistake produces a data race that may surface weeks later in production.
Rust's ownership model prevents data races at compile time. If the code
compiles, the concurrency is sound. This is what the Rust community calls
"fearless concurrency," and it is not a slogan. It is a compiler guarantee.

## Performance Without Compromise

Rust compiles to native machine code with no runtime overhead. There is no
interpreter, no JIT warmup, and no virtual machine. The generated code is
competitive with hand-tuned C, and in many benchmarks it matches or exceeds it
due to aliasing guarantees that allow more aggressive optimization.

## The Cargo Ecosystem

Rust's package manager, Cargo, provides deterministic builds, integrated
testing, documentation generation, and access to over 150,000 crates. Land uses
Cargo workspaces to manage its Rust elements as a single coordinated build.
Dependencies are pinned, audited, and reproducible across every platform.

## Where Rust Appears in Land

Rust powers the majority of Land's backend:

- **Mountain** handles window management, file system access, and process
  lifecycle through Tauri.
- **Air** runs the background daemon for updates, cryptographic signing, and
  peer-to-peer sync.
- **Echo** provides work-stealing task execution for CPU-bound operations.
- **Common** defines abstract traits and data transfer objects shared across
  elements.
- **Grove** hosts WASM and Rhai extensions in a sandboxed runtime.
- **Rest** bundles JavaScript using the OXC toolchain, written entirely in Rust.
- **Vine** implements gRPC protocol definitions for inter-process communication.
- **Mist** manages WebSocket connections between the frontend and backend.

Every element that touches the operating system, processes bytes, or coordinates
concurrent work is written in Rust. The language is not an implementation
detail. It is a structural decision that shapes the reliability and performance
of the entire editor.

## See Also

- [Architecture Overview](/Doc/architecture)
- [Why Tauri](/Doc/why-tauri)
- [Why gRPC](/Doc/why-grpc)
- [Why WebAssembly](/Doc/why-wasm)
