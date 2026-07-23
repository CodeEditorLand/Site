---
title: "SideCar - Deep Dive"
navTitle: "SideCar"
section: "Deep Dive"
order: 10
description:
    "Platform triple detection, binary resolution cascade, download integrity
    verification, cache directory structure, Mountain ProcessManagement
    integration, and version mismatch handling."
---

SideCar provides the technical foundation binary
distribution layer within the Land project. **SideCar** manages pre-compiled,
platform-specific runtime binaries (primarily Node.js) so that the Land editor
can bundle vendored runtimes without requiring users to install them separately.

---

## Architecture

SideCar is a Rust workspace containing a download tool and a spawn helper. The
download tool fetches official runtime distributions and organizes them under a
target-triple directory convention. The spawn helper is used by Mountain to
launch sidecars from the vendored binary store.

<img src="/Mermaid/2d1ca0004138ea30.svg" alt="Mermaid diagram" />
---

## Key Modules

| Path                 | Description                                                                                        |
| :------------------- | :------------------------------------------------------------------------------------------------- |
| `Source/Download.rs` | Main download binary: fetches runtime distributions, resolves versions, organizes by target triple |
| `Source/Spawn.rs`    | Spawn helper: invoked by Mountain to launch a sidecar binary from the vendored store               |
| `Source/Library.rs`  | Shared library code: version resolution utilities, path helpers, cache types                       |
| `Source/Source/`     | Internal module source files for the library                                                       |
| `Cache.json`         | Tracks which versions have been downloaded per target triple to avoid redundant fetches            |
| `.gitattributes`     | Configured by the download tool to register large binary files with Git LFS                        |

---

## Data Flow

<img src="/Mermaid/437ef5e8ea10ac60.svg" alt="Mermaid diagram" />
**Build-time selection:**

Mountain's `build.rs` reads the SideCar directory, selects the binary matching
the current Tauri build target triple, and copies it into the Tauri `sidecar`
resource path for bundling into the application installer.

---

## Integration Points

| Connecting Element | Direction          | Mechanism                 | Description                                                                       |
| :----------------- | :----------------- | :------------------------ | :-------------------------------------------------------------------------------- |
| **Mountain**       | Consumer           | `build.rs` file copy      | Mountain's build script selects the correct Node.js binary by target triple       |
| **Tauri**          | Consumer           | Sidecar resource bundling | Tauri bundles the selected binary into the platform installer                     |
| **Cocoon**         | Runtime dependency | Spawned process           | Mountain spawns Cocoon using the vendored Node.js binary from the SideCar store   |
| **Air**            | Potential consumer | Same convention           | Additional daemon binaries may be vendored using the same target-triple structure |

---

## Configuration

| Parameter             | Convention / Value                                                                 | Description                                                           |
| :-------------------- | :--------------------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| Directory structure   | `[target-triple]/[NAME]/[version]/bin/`                                            | Standard layout for deterministic build-time binary selection         |
| Target triples        | `x86_64-pc-windows-msvc`, `aarch64-apple-darwin`, `x86_64-unknown-linux-gnu`, etc. | All Tauri-supported platform identifiers                              |
| Node.js major version | `22` (current default)                                                             | Controlled by the `--node-version` build flag                         |
| Cache file            | `Cache.json`                                                                       | JSON map of `{ \"[triple]/[name]/[major]\": \"[resolved-version]\" }` |
| Git LFS               | `.gitattributes` auto-updated                                                      | All `*.node`, `node`, `node.exe` binaries tracked via LFS             |

The SideCar directory is not committed to version control in its populated form.
Developers run the Download tool once during initial project setup, and CI
environments run it as part of the release pipeline.

---

## Platform triple detection

Target triple detection happens at two points in time.

**At download time**, the download tool reads the `NodePlatform` environment
variable or derives the platform string from the current machine's architecture.
The mapping from Rust target triple to Node.js platform string is:

| Rust target triple          | Node.js platform string | Archive format |
| --------------------------- | ----------------------- | -------------- |
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

```text
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

Downloads for all platforms run concurrently using Tokio's async I/O, so the full
matrix of six binaries downloads in parallel rather than sequentially.

## Download integrity verification

Integrity is verified against the SHA-256 checksums published by the Node.js
project at `https://nodejs.org/dist/v{version}/SHASUMS256.txt`. The checksum is
computed incrementally during the streaming download -- the download tool does
not write the full archive to disk before verifying. If the computed hash does
not match the published value, the temporary file is deleted and the tool exits
with an error. No partial binary is ever recorded in the cache.

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

```text
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
    .gitattributes     <- auto-updated by download tool for Git LFS
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

Because the binary was selected and verified at build time, no runtime detection,
version negotiation, or fallback logic is needed.

## Handling version mismatches

A version mismatch occurs when the `NodeVersion` environment variable requests a
version that differs from what is in `Cache.json`. The resolution is
straightforward: the download tool fetches and verifies the new version, places
it alongside the existing cached version (different `{major}` subdirectory), and
updates `Cache.json`. Old versions are not automatically deleted; they remain
until the cache is manually cleared or a full re-download is triggered.

> Mountain's `build.rs` selects a binary by major version number. If
> `Cache.json` contains entries for multiple major versions of the same platform,
> `build.rs` takes the highest available major version. To pin a specific
> version, set `NodeVersion` explicitly and run the download tool before
> building.

## Git LFS management

The download tool reads the existing `.gitattributes` at the root of the SideCar
directory and appends LFS tracking rules for any new binary paths it creates.
The pattern used is:

```text
SideCar/aarch64-apple-darwin/**/* filter=lfs diff=lfs merge=lfs -text
```

One rule is added per target triple directory. Existing rules are not duplicated.
Running the download tool multiple times is idempotent with respect to
`.gitattributes`.

## Module reference

| File                 | Purpose                                                                                                                                |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `Source/Download.rs` | Version resolution, parallel HTTP download, SHA-256 verification, archive extraction, `Cache.json` update, `.gitattributes` management |
| `Source/Spawn.rs`    | Runtime spawn helper: resolves binary path from cache, returns to Mountain's `ProcessManagement`                                       |
| `Source/Library.rs`  | Shared types: `CacheEntry`, version resolution helpers, path construction                                                              |
| `Source/main.rs`     | Entry point for the standalone `Download` binary                                                                                       |
| `build.rs`           | Cargo build script: reads current target triple, copies binary to Tauri sidecar resource path                                          |
| `Cache.json`         | JSON manifest tracking downloaded versions per platform                                                                                |

## Related Documentation

- [SideCar element overview](/Doc/sidecar)
- [Mountain deep dive](/Doc/deep-dive-mountain)
- [Process management internals](/Doc/mountain)
- [Architecture overview](/Doc/architecture)
