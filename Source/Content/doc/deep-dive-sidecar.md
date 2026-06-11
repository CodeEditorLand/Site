---
title: SideCar - Deep Dive
section: Deep Dive
order: 10
description:
    Platform triple detection, binary resolution cascade, download and integrity
    verification, cache directory structure, Mountain ProcessManagement
    integration, and version mismatch handling.
---

SideCar consists of two Rust binaries-a download tool that populates a
per-triple directory tree of verified Node.js binaries, and a spawn helper used
by Mountain's ProcessManagement layer to launch Cocoon from the vendored store.
This page covers the internals of both.

## Platform triple detection

Target triple detection happens at two points in time.

**At download time**, the download tool reads the `NodePlatform` environment
variable or derives the platform string from the current machine's architecture.
The mapping from Rust target triple to Node.js platform string is:

| Rust target triple          | Node.js platform string | Archive format |
| :-------------------------- | :---------------------- | :------------- |
| `aarch64-apple-darwin`      | `darwin-arm64`          | `.tar.gz`      |
| `x86_64-apple-darwin`       | `darwin-x64`            | `.tar.gz`      |
| `aarch64-unknown-linux-gnu` | `linux-arm64`           | `.tar.gz`      |
| `x86_64-unknown-linux-gnu`  | `linux-x64`             | `.tar.gz`      |
| `aarch64-pc-windows-msvc`   | `win-arm64`             | `.zip`         |
| `x86_64-pc-windows-msvc`    | `win-x64`               | `.zip`         |

**At build time**, Mountain's `build.rs` calls `GetTauriTargetTriple.rs` (from
Maintain) to read the `CARGO_BUILD_TARGET` environment variable, which Cargo
sets to the current compilation target. The result is used to select the correct
subdirectory under `SideCar/`.

## Binary resolution cascade

The full resolution sequence when the download tool runs:

```
1. Read NodeVersion env var
       FOUND: use as requested version
       NOT FOUND: continue

2. Read Cache.json for current platform
       ENTRY EXISTS and version matches: return cached path, stop
       NOT FOUND or version mismatch: continue

3. Fetch https://nodejs.org/dist/v{version}/SHASUMS256.txt
       Parse to find checksum for target platform archive

4. HTTP GET https://nodejs.org/dist/v{version}/node-v{version}-{platform}.{ext}
       Stream to temporary file, compute SHA-256 during download

5. Verify SHA-256 against SHASUMS256.txt value
       MISMATCH: abort with error, delete temp file

6. Extract binary from archive
       .tar.gz: decompress with flate2, extract with tar, locate node binary
       .zip: extract with zip crate, locate node.exe

7. Move binary to SideCar/{triple}/NODE/{major}/bin/node[.exe]

8. Update Cache.json entry for this platform
```

Downloads for all platforms run concurrently using Tokio's async I/O, so the
full matrix of six binaries downloads in parallel rather than sequentially.

## Download integrity verification

Integrity is verified against the SHA-256 checksums published by the Node.js
project at `https://nodejs.org/dist/v{version}/SHASUMS256.txt`. The checksum is
computed incrementally during the streaming download-the download tool does not
write the full archive to disk before verifying. If the computed hash does not
match the published value, the temporary file is deleted and the tool exits with
an error. No partial binary is ever recorded in the cache.

```json
// Cache.json entry format
{
	"version": "1",
	"entries": {
		"24.0.0-darwin-arm64": {
			"path": "aarch64-apple-darwin/NODE/24/bin/node",
			"sha256": "e3b0c44298fc1c149afbf4c8996fb924...",
			"downloaded_at": "2026-01-15T10:30:00Z",
			"size": 68700000
		}
	}
}
```

Cache entries are keyed by `{version}-{platform}`. An entry is invalidated and
re-downloaded when:

- A different version is explicitly requested via `NodeVersion`
- SHA-256 verification of the cached file fails (file corrupted or truncated)
- The cache file is deleted manually

## Cache directory structure

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
    aarch64-unknown-linux-gnu/
        NODE/
            24/
                bin/
                    node
    x86_64-unknown-linux-gnu/
        NODE/
            24/
                bin/
                    node
    Cache.json
    .gitattributes     ← auto-updated by download tool for Git LFS
```

The download tool automatically updates `.gitattributes` to add Git LFS tracking
patterns for every binary it writes. This ensures that if the SideCar directory
is committed to a repository, the large binaries are stored in LFS rather than
the Git object database.

## Mountain ProcessManagement integration

**At build time**, Mountain's `build.rs` performs the following steps:

1. Reads `CARGO_BUILD_TARGET` to determine the current target triple.
2. Constructs the expected path `SideCar/{triple}/NODE/{major}/bin/node[.exe]`.
3. If the path exists, copies the binary into Tauri's sidecar resource directory
   under the name `node-{triple}[.exe]`.
4. If the path does not exist, the build fails with an actionable error message
   indicating which platform is missing.

**At runtime**, Mountain's `ProcessManagement/CocoonManagement.rs` calls
`SideCar::Spawn` to get the path to the bundled Node.js binary. The Tauri
`sidecar()` API resolves the platform-specific binary name from the bundle.
Mountain then spawns Cocoon using that binary, passing:

- The `DnsPort` environment variable pointing to the Mist DNS server
- `VSCODE_PARENT_PID` for heartbeat monitoring
- `TierIPC` routing configuration
- The path to Cocoon's `bootstrap-fork.js` entry point

Because the binary was selected and verified at build time, no runtime
detection, version negotiation, or fallback logic is needed.

## Handling version mismatches

A version mismatch occurs when the `NodeVersion` environment variable requests a
version that differs from what is in `Cache.json`. The resolution is
straightforward: the download tool fetches and verifies the new version, places
it alongside the existing cached version (different `{major}` subdirectory), and
updates `Cache.json`. Old versions are not automatically deleted; they remain
until the cache is manually cleared or a full re-download is triggered.

> [!WARNING] Mountain's `build.rs` selects a binary by major version number. If
> `Cache.json` contains entries for multiple major versions of the same
> platform, `build.rs` takes the highest available major version. To pin a
> specific version, set `NodeVersion` explicitly and run the download tool
> before building.

## Git LFS management

The download tool reads the existing `.gitattributes` at the root of the SideCar
directory and appends LFS tracking rules for any new binary paths it creates.
The pattern used is:

```
SideCar/aarch64-apple-darwin/**/* filter=lfs diff=lfs merge=lfs -text
```

One rule is added per target triple directory. Existing rules are not
duplicated. This means running the download tool multiple times is idempotent
with respect to `.gitattributes`.

## Module reference

| File                 | Purpose                                                                                                                                |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `Source/Download.rs` | Version resolution, parallel HTTP download, SHA-256 verification, archive extraction, `Cache.json` update, `.gitattributes` management |
| `Source/Spawn.rs`    | Runtime spawn helper: resolves binary path from cache, returns to Mountain's `ProcessManagement`                                       |
| `Source/Library.rs`  | Shared types: `CacheEntry`, version resolution helpers, path construction                                                              |
| `Source/main.rs`     | Entry point for the standalone `Download` binary                                                                                       |
| `build.rs`           | Cargo build script: reads current target triple, copies binary to Tauri sidecar resource path                                          |
| `Cache.json`         | JSON manifest tracking downloaded versions per platform                                                                                |
