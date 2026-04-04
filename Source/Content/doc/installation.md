---
title: "Installation"
section: "Start"
order: 2
description:
    "Download and install Code Editor Land on macOS, Windows, and Linux."
---

# Installation

Code Editor Land provides pre-built binaries for all major platforms. You can
also install via package managers or build from source.

## System Requirements

| Platform | Minimum Version                 | Architecture    |
| -------- | ------------------------------- | --------------- |
| macOS    | 13.0 (Ventura)                  | aarch64, x86_64 |
| Windows  | 11 (22H2)                       | x86_64          |
| Linux    | Ubuntu 22.04 / Fedora 38 / Arch | x86_64, aarch64 |

All platforms require at least 4 GB of RAM and 500 MB of disk space. Linux
requires WebKitGTK 4.1 and GStreamer for the webview runtime.

## Download

Download the latest release from the [Download](/Download) page. Binaries are
signed and can be verified against the published checksums.

## Package Managers

### macOS (Homebrew)

```bash
brew tap CodeEditorLand/Land
brew install land
```

### Linux (apt)

```bash
curl -fsSL https://apt.codeeditorland.com/key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/land.gpg
echo "deb [signed-by=/usr/share/keyrings/land.gpg] https://apt.codeeditorland.com stable main" | sudo tee /etc/apt/sources.list.d/land.list
sudo apt update && sudo apt install land
```

### Windows (winget)

```powershell
winget install CodeEditorLand.Land
```

## Build from Source

If you prefer to compile from source, ensure you have Rust 1.95.0+, Node.js 20+,
and pnpm 9+ installed.

```bash
git clone --recurse-submodules https://github.com/CodeEditorLand/Land.git
cd Land
pnpm install
cargo tauri build
```

The compiled binary appears in `target/release/`. On macOS, a `.app` bundle is
generated in `target/release/bundle/macos/`.

## Updating

Land checks for updates automatically through the Air daemon. When a new version
is available, a notification appears in the editor. You can also update manually
through your package manager or by downloading a new release.

## See Also

- [Getting Started](/Doc/getting-started)
- [Configuration](/Doc/configuration)
- [Troubleshooting](/Doc/troubleshooting)
