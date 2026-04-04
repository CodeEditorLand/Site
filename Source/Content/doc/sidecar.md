---
title: "SideCar"
section: "Element"
order: 23
description:
    "Cross-platform Node.js binary distribution compiled per target triple."
---

# SideCar

SideCar packages the exact Node.js binary for each platform at compile time. No
runtime detection. No fallback chains. The binary that ships is the binary that
runs.

## The Problem

VS Code ships a single Node.js binary and detects the platform at runtime. A
chain of fallback logic handles architecture mismatches, Rosetta translation on
Apple Silicon, musl versus glibc on Linux, and missing shared libraries on
minimal containers.

When the detection works, it works silently. When it fails, the error messages
are cryptic: a segfault on ARM, a missing `.so` on Alpine, a silent hang on
FreeBSD. Debugging requires reverse-engineering the detection chain to find
which fallback was selected and why it broke.

## How SideCar Eliminates It

SideCar resolves the platform question at compile time, not runtime. The build
matrix defines every supported target triple explicitly: `aarch64-apple-darwin`,
`x86_64-unknown-linux-gnu`, `x86_64-unknown-linux-musl`,
`x86_64-pc-windows-msvc`, and others.

For each triple, SideCar downloads the corresponding Node.js binary from the
official release, verifies its checksum, and embeds it into the application
bundle. The runtime code contains zero platform detection logic. It loads the
binary that was placed there at build time.

## What You Experience

The editor starts and the extension host runs. There is no detection step, no
fallback chain, no "unsupported platform" error. If the build succeeded for your
target triple, the correct Node.js binary is already in place.

On Alpine Linux, on Apple Silicon, on Windows ARM, the behavior is identical:
the pre-selected binary runs without translation layers or compatibility shims.

## Key Technologies

Rust, Target Triple Resolution, Compile-Time Binary Selection, Checksum
Verification, Cross-Platform Distribution.

## See Also

- [Architecture Overview](/Doc/architecture)
- [Cocoon](/Doc/cocoon)
- [Source Code](https://github.com/CodeEditorLand/SideCar)
