---
title: SideCar
section: Elements
order: 10
description:
    SideCar manages the vendored Node.js runtime binaries that Land ships per
    platform, selecting the correct binary at compile time for each of six
    target triples so Cocoon always starts with the right runtime.
---

SideCar packages the exact Node.js binary for each supported target triple at
compile time and makes it available to Mountain's build system for bundling into
the application installer. The runtime code that launches Cocoon contains no
platform detection logic-the correct binary is already present, selected at
build time by matching the Rust target triple. This eliminates an entire
category of runtime failures that affect editors relying on dynamic Node.js
detection chains.

## The problem with runtime detection

VS Code ships a single Node.js binary and runs a detection chain at startup to
find the right one for the current platform. When the chain works it is
invisible. When it fails-on Alpine Linux (musl instead of glibc), on ARM
hardware under Rosetta translation, on custom glibc builds-the error messages
are cryptic: a segfault, a missing shared library, a silent hang. Debugging
requires reverse-engineering which fallback was selected and why it failed.

SideCar resolves the question at compile time. If the build for a given target
triple succeeded, the binary for that triple is present and verified.

## Supported platform triples

| Target triple               | Platform            |
| :-------------------------- | :------------------ |
| `aarch64-apple-darwin`      | macOS Apple Silicon |
| `x86_64-apple-darwin`       | macOS Intel         |
| `x86_64-pc-windows-msvc`    | Windows x64         |
| `aarch64-pc-windows-msvc`   | Windows ARM64       |
| `x86_64-unknown-linux-gnu`  | Linux x64 (glibc)   |
| `aarch64-unknown-linux-gnu` | Linux ARM64 (glibc) |

## Binary resolution order

When SideCar's download tool runs, it resolves the Node.js version through the
following priority order:

1. `NodeVersion` environment variable - explicit version override
2. `SideCar/Cache.json` - latest cached version for the current platform
3. Node.js LTS - fallback default

Once a version is resolved, the download tool fetches the official binary from
`nodejs.org/dist`, verifies the SHA-256 checksum against the published
`SHASUMS256.txt`, extracts the binary, and records the result in `Cache.json`.

## Binary cache directory

SideCar organizes vendored binaries by target triple:

```
SideCar/
    aarch64-apple-darwin/
        NODE/
            24/
                bin/
                    node
    x86_64-apple-darwin/
        NODE/
            24/
                bin/
                    node
    x86_64-pc-windows-msvc/
        NODE/
            24/
                node.exe
    ...
    Cache.json
```

`Cache.json` tracks the resolved version, file path, SHA-256 checksum, download
timestamp, and file size for each platform entry. A cache entry is invalidated
when a new version is requested, when SHA-256 verification fails on the cached
file, or when the cache is manually cleared.

> [!IMPORTANT] The populated SideCar directory contains large third-party
> binaries and should not be committed to version control directly. When binary
> tracking is required, binaries are managed via Git LFS; the `.gitattributes`
> in the SideCar element marks the known binary extensions for LFS tracking. Run
> the download tool once during initial project setup or as part of the CI
> release pipeline.

## How Mountain uses SideCar

Mountain's `build.rs` Cargo build script reads the SideCar directory at compile
time, selects the binary subdirectory matching the current Tauri target triple,
and copies the binary into Tauri's sidecar resource path for bundling into the
final installer. At runtime, Mountain's `ProcessManagement` layer calls
`Spawn.rs` to launch Cocoon using the bundled binary. No platform detection is
performed at runtime.

The Mist DNS server is started before Cocoon is spawned, so when Mountain passes
the `DnsPort` environment variable to the Node.js process the DNS server is
already accepting queries.

## Source files

| File                 | Role                                                                                   |
| :------------------- | :------------------------------------------------------------------------------------- |
| `Source/Download.rs` | Binary download, SHA-256 verification, archive extraction, `Cache.json` update         |
| `Source/Spawn.rs`    | Process spawning helper used by Mountain at runtime                                    |
| `Source/Library.rs`  | Crate root, shared utilities, version resolution helpers                               |
| `Source/main.rs`     | Entry point for the standalone download tool                                           |
| `build.rs`           | Cargo build script: selects correct triple directory, stages binary for Tauri bundling |
| `Cache.json`         | Download cache metadata keyed by `{version}-{platform}`                                |

## Running the download tool

```bash
cd Element/SideCar
cargo build --release
./Target/release/Download
```

The tool downloads binaries for all configured target triples concurrently using
Tokio. Progress is reported per platform. After completion, each triple
directory contains a verified Node.js binary and `Cache.json` is updated.
