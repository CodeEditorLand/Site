---
title: "SideCar"
section: "Element"
order: 23
description:
    "Cross-platform Node.js binary distribution compiled per target triple."
---

# SideCar

SideCar packages the correct Node.js binary for each target platform at compile
time - no runtime detection, no fallback chains. The binary that ships is the
binary that runs.

---

## The Problem

VS Code ships a single Node.js binary and detects the platform at runtime. A
chain of fallback logic handles architecture mismatches, Rosetta translation on
Apple Silicon, musl versus glibc on Linux, and missing shared libraries on
minimal containers.

When the detection works, it works silently. When it fails, the error messages
are cryptic: a segfault on ARM, a missing `.so` on Alpine, a silent hang.
Debugging requires reverse-engineering the detection chain to find which
fallback was selected and why it broke.

---

## How SideCar Eliminates It

SideCar resolves the platform question at compile time, not runtime. The build
matrix defines supported target triples explicitly. For each triple, SideCar
downloads the corresponding Node.js binary from the official release, verifies
its checksum, and makes it available as the canonical binary for that target.
The runtime code contains no platform detection logic.

---

## Supported Target Triples

All four target triple directories are confirmed present in the
[SideCar repository](https://github.com/CodeEditorLand/SideCar):

| Triple                      | Platform             |
| --------------------------- | -------------------- |
| `aarch64-apple-darwin`      | Apple Silicon macOS  |
| `x86_64-apple-darwin`       | Intel macOS          |
| `aarch64-unknown-linux-gnu` | ARM64 Linux (glibc)  |
| `x86_64-unknown-linux-gnu`  | x86-64 Linux (glibc) |
| `x86_64-pc-windows-msvc`    | Windows 10/11 (MSVC) |

---

## Source Structure

| Path                 | Role                                                          |
| -------------------- | ------------------------------------------------------------- |
| `Source/Download.rs` | Node.js binary download, checksum verification (~25 KB)       |
| `Source/Spawn.rs`    | Binary spawn and process management                           |
| `Source/Library.rs`  | Crate root re-exports                                         |
| `Source/main.rs`     | Entry point                                                   |
| `Source/Source/`     | Sub-modules                                                   |
| `Cache.json`         | Cached binary metadata per target triple                      |
| `build.rs`           | Cargo build script - target triple resolution at compile time |
| `Resource/`          | Bundled resources                                             |

---

## What SideCar Enables

The editor starts with the correct Node.js binary already in place for the
target platform - no detection step, no fallback chain. If the build succeeded
for your target triple, the binary is already there. This removes an entire
category of platform-specific runtime failures that exist in Electron-based
editors.

---

## In Progress

- `x86_64-unknown-linux-musl` (Alpine/musl Linux) triple is not yet in the build
  matrix.
- Full integration test coverage across all five current triples.

---

## Key Technologies

Rust, Target Triple Resolution, Compile-Time Binary Selection, Checksum
Verification, Cross-Platform Distribution.

---

## See Also

- [Architecture Overview](https://Editor.Land/Doc/architecture)
- [Cocoon](https://Editor.Land/Doc/cocoon)
- [Source Code](https://github.com/CodeEditorLand/SideCar)
