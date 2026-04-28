---
title: "SideCar"
section: "Element"
order: 23
description: "Cross-platform Node.js binary distribution compiled per target triple."
---

# SideCar

> **Status: In Progress.** SideCar's compile-time binary selection is
> partially implemented. The design below describes the full intended
> architecture. See the [Architecture Overview](/Doc/architecture) for the
> full element status table.

SideCar is designed to package the exact Node.js binary for each target
platform at compile time — no runtime detection, no fallback chains. The
binary that ships is the binary that runs.

---

## The Problem

VS Code ships a single Node.js binary and detects the platform at runtime.
A chain of fallback logic handles architecture mismatches, Rosetta translation
on Apple Silicon, musl versus glibc on Linux, and missing shared libraries on
minimal containers.

When the detection works, it works silently. When it fails, the error messages
are cryptic: a segfault on ARM, a missing `.so` on Alpine, a silent hang.
Debugging requires reverse-engineering the detection chain to find which
fallback was selected and why it broke.

---

## How SideCar Is Designed to Eliminate It

SideCar resolves the platform question at compile time, not runtime. The build
matrix defines supported target triples explicitly. For each triple, SideCar
downloads the corresponding Node.js binary from the official release, verifies
its checksum, and embeds it into the application bundle. The runtime code
contains no platform detection logic.

The target triples in the planned build matrix include:
- `aarch64-apple-darwin` (Apple Silicon macOS) — current primary target
- `x86_64-apple-darwin` (Intel macOS)
- `x86_64-unknown-linux-gnu` (Linux glibc)
- `x86_64-unknown-linux-musl` (Alpine/musl Linux)
- `x86_64-pc-windows-msvc` (Windows)

Linux and Windows targets are planned. The current build runs on
**macOS 13+ (Apple Silicon and Intel)**.

---

## What SideCar Will Enable

When SideCar is fully implemented and the build matrix is active, the editor
will start with the correct Node.js binary already in place for the target
platform — no detection step, no fallback chain. If the build succeeded for
your target triple, the binary is already there.

---

## Key Technologies

Rust, Target Triple Resolution, Compile-Time Binary Selection, Checksum
Verification, Cross-Platform Distribution.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Cocoon](/Doc/cocoon)
- [Source Code](https://github.com/CodeEditorLand/SideCar)
