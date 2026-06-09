---
title: "SideCar - Deep Dive"
section: "Deep Dive"
order: 43
description:
    "Binary distribution layer for vendored runtimes and target-triple
    management"
---

# SideCar - Deep Dive

SideCar manages pre-compiled, platform-specific runtime binaries (primarily
Node.js) so the Land editor can bundle vendored runtimes without requiring users
to install them separately.

## Architecture 🏗️

Two binaries: a download tool that fetches official distributions and organizes
them by target triple, and a spawn helper used by Mountain to launch sidecars
from the vendored store.

### Modules

| Path                                                                                                         |
| ------------------------------------------------------------------------------------------------------------ |
| `Source/Download.rs` - Download binary: fetches distributions, resolves versions, organizes by target triple |
| `Source/Spawn.rs` - Spawn helper: launches a sidecar binary from the vendored store                          |
| `Source/Library.rs` - Shared utilities: version resolution, path helpers, cache types                        |
| `Cache.json` - Tracks downloaded versions per target triple                                                  |
| `.gitattributes` - Auto-updated by download tool for Git LFS tracking                                        |

## Directory Structure 📂

```
[target-triple]/
  [SIDECAR_NAME]/
    [version]/
      bin/
        node
```

Example: `aarch64-apple-darwin/NODE/22/bin/node`

## Download Flow ⬇️

1. Developer runs `./Target/release/Download`
2. Tool reads `Cache.json` for existing versions
3. Fetches version manifest from nodejs.org
4. Downloads binary archive for latest patch version
5. Extracts to target-triple directory
6. Updates `Cache.json` and `.gitattributes` for Git LFS

## Build-Time Selection 🎯

Mountain's `build.rs` reads the SideCar directory, selects the binary matching
the current Tauri target triple, and copies it into the Tauri sidecar resource
path for bundling.

## Configuration ⚙️

| Parameter        | Convention                                                 |
| ---------------- | ---------------------------------------------------------- |
| Directory layout | `[target-triple]/[NAME]/[version]/bin/`                    |
| Target triples   | All Tauri-supported platform identifiers                   |
| Node.js version  | `24` (default, controlled by `--node-version`)             |
| Cache file       | `Cache.json` mapping triple/name/major to resolved version |
| Git LFS          | Auto-updated `.gitattributes` for all binary files         |

The SideCar directory is not committed in its populated form. Run Download
during initial setup or CI release pipeline.

## Integration 🔗

| Element  | Direction          | Mechanism                                     |
| -------- | ------------------ | --------------------------------------------- |
| Mountain | Consumer           | `build.rs` file copy by target triple         |
| Tauri    | Consumer           | Sidecar resource bundling in installer        |
| Cocoon   | Runtime dependency | Mountain spawns Cocoon using vendored Node.js |
| Air      | Potential consumer | Same target-triple convention                 |

## Related Documentation 📖

- [SideCar overview](https://editor.land/Doc/sidecar)
