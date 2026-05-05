---
title: "Installation"
section: "Start"
order: 2
description:
    "Build requirements and source installation steps for macOS and Windows."
---

# Installation

Editor.Land is currently source-only. There are no pre-built binaries, Homebrew
tap, winget package, or apt repository yet. The instructions below cover
building from source on **macOS and Windows**, both of which are supported
today.

---

## Supported Platforms

| Platform                | Status      | Notes                                      |
| ----------------------- | ----------- | ------------------------------------------ |
| **macOS 13+ (aarch64)** | Supported   | Apple Silicon - primary development target |
| **macOS 13+ (x86_64)**  | Supported   | Intel Mac - tested                         |
| **Windows 10 / 11**     | Supported   | WebView2 rendering active                  |
| **Linux**               | In progress | WebKitGTK integration in development       |

---

## Build Requirements

### macOS

| Dependency | Minimum Version | Install                          |
| ---------- | --------------- | -------------------------------- |
| Rust       | 1.95.0          | [rustup.rs](https://rustup.rs)   |
| Node.js    | 20              | [nodejs.org](https://nodejs.org) |
| pnpm       | 9               | `npm install -g pnpm`            |
| Xcode CLI  | Latest          | `xcode-select --install`         |
| macOS      | 13.0 (Ventura)  | -                                |

### Windows

| Dependency                | Minimum Version | Install                                                                                                             |
| ------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------- |
| Rust                      | 1.95.0          | [rustup.rs](https://rustup.rs)                                                                                      |
| Node.js                   | 20              | [nodejs.org](https://nodejs.org)                                                                                    |
| pnpm                      | 9               | `npm install -g pnpm`                                                                                               |
| Visual Studio Build Tools | 2019+           | C++ workload required                                                                                               |
| WebView2 Runtime          | Latest          | Included with Windows 11; [download for Windows 10](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) |

---

## Steps

**1. Clone the repository with submodules**

```bash
git clone --recurse-submodules https://github.com/CodeEditorLand/Land.git
cd Land
```

The `--recurse-submodules` flag is required. The Land repository uses Git
submodules to reference each element (Mountain, Cocoon, Sky, Wind, Vine, and
others) as a pinned commit. Cloning without this flag produces an incomplete
source tree.

**2. Install Node.js dependencies**

```bash
pnpm install
```

This installs the TypeScript dependencies for Cocoon, Sky, Wind, and the build
toolchain. It does not build the Rust components.

**3. Start the development build**

```bash
cargo tauri dev
```

This compiles Mountain and its dependencies, starts the Tauri application, and
opens the editor window. The first run compiles all Rust dependencies from
scratch, which takes a few minutes on a fresh checkout. Subsequent runs rely on
Cargo's incremental compilation cache and are noticeably fast - comparable to
any well-structured Rust workspace.

---

## Release Build

To produce a release bundle:

**macOS** - outputs a `.app` bundle:

```bash
cargo tauri build
```

The `.app` bundle is written to `src-tauri/target/release/bundle/macos/`.

**Windows** - outputs an `.msi` installer:

```bash
cargo tauri build
```

The installer is written to `src-tauri/target/release/bundle/msi/`.

---

## Updating

Mountain includes an `Update` module that manages update check state at the
backend level. Automatic update delivery to the UI is not yet surfaced through a
user-facing prompt. To update manually, pull the latest commits and rebuild:

```bash
git pull --recurse-submodules
pnpm install
cargo tauri dev
```

The Air module - active in the compiled binary today - manages daemon-level
lifecycle and is the foundation for surfacing update notifications in the UI.

---

## See Also

- [Getting Started](/Doc/getting-started)
- [Architecture Overview](/Doc/architecture)
- [Air: Update Daemon](/Doc/air)
- [Contributing](/Doc/contributing)
