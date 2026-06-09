---
title: "Installation"
section: "Start"
order: 2
description:
    "Build requirements and source installation steps for macOS and Windows."
---

# Installation

> **Updated 2026-05-29** - Requirements updated to Rust nightly and Node 24.
> Build commands updated to the `Maintain/Debug/Build.sh` profile system.
> Canonical source:
> [Documentation/GitHub/Building.md](https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Building.md)

`editor.land` is currently source-only. There are no pre-built binaries,
Homebrew tap, winget package, or apt repository yet. The instructions below
cover building from source on **macOS and Windows**, both of which are supported
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

| Dependency | Minimum Version | Install                                                   |
| ---------- | --------------- | --------------------------------------------------------- |
| Rust       | nightly         | [rustup.rs](https://rustup.rs) → `rustup default nightly` |
| Node.js    | 24              | [nodejs.org](https://nodejs.org) or `nvm install 24`      |
| nvm        | latest          | [nvm-sh/nvm](https://github.com/nvm-sh/nvm)               |
| pnpm       | 9               | `npm install -g pnpm`                                     |
| Xcode CLI  | latest          | `xcode-select --install`                                  |
| macOS      | 13.0 (Ventura)  | -                                                         |

### Windows

| Dependency                | Minimum Version | Install                                                                                                             |
| ------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------- |
| Rust                      | nightly         | [rustup.rs](https://rustup.rs) → `rustup default nightly`                                                           |
| Node.js                   | 24              | [nodejs.org](https://nodejs.org)                                                                                    |
| pnpm                      | 9               | `npm install -g pnpm`                                                                                               |
| Visual Studio Build Tools | 2019+           | C++ workload required                                                                                               |
| WebView2 Runtime          | latest          | Included with Windows 11; [download for Windows 10](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) |

---

## Steps

The build is a **two-step linear flow.** Do not pull submodules recursively -
each submodule is managed independently on its own branch.

**1. Clone the repository**

```bash
git clone --recurse-submodules https://github.com/CodeEditorLand/Land.git
cd Land
```

The `--recurse-submodules` flag is required. The Land repository uses Git
submodules to reference each element (`Mountain`, `Cocoon`, `Sky`, `Wind`,
`Vine`, and others) as a pinned commit. Cloning without this flag produces an
incomplete source tree.

**2. Compile the VS Code Editor submodule** _(mandatory)_

`Cocoon` and `Output` both depend on this compiled output. Node 24 is required
here - the exact version is pinned in
`Dependency/Microsoft/Dependency/Editor/.nvmrc`.

```bash
cd Dependency/Microsoft/Dependency/Editor

# Switch to Node 24 (reads .nvmrc automatically)
nvm use 24

git fetch --all
git reset --hard Parent/main
git clean -dfx

pnpm install
pnpm run compile
pnpm run compile-extensions-build
```

**3. Install `Node.js` dependencies**

```bash
cd Land # back to repository root
pnpm install
```

This installs the `TypeScript` dependencies for `Cocoon`, `Sky`, `Wind`, and the
build toolchain. It does not build the `Rust` components.

**4. Run the development build**

```bash
./Maintain/Debug/Build.sh --profile debug-electron-bundled
```

This compiles `Mountain` and its dependencies, then opens the editor window. The
first run compiles all `Rust` dependencies from scratch - a few minutes on a
fresh checkout. Subsequent runs rely on `Cargo`'s incremental compilation cache.

For a lighter iteration build that skips the full Vite/Astro bundling pass:

```bash
./Maintain/Debug/Build.sh --profile debug-mountain
```

---

## Release Build

```bash
./Maintain/Release/Build.sh --profile production-electron-bundled
```

---

## Updating

To update to the latest commits and rebuild:

```bash
git pull --recurse-submodules
cd Dependency/Microsoft/Dependency/Editor
nvm use 24
git fetch --all
git reset --hard Parent/main
git clean -dfx
pnpm install
pnpm run compile
pnpm run compile-extensions-build
cd Land
pnpm install
./Maintain/Debug/Build.sh --profile debug-electron-bundled
```

The `Air` module - active in the compiled binary today - manages daemon-level
lifecycle and is the foundation for surfacing update notifications in the UI.

---

## See Also

- [Getting Started](https://editor.land/Doc/getting-started)
- [Architecture Overview](https://editor.land/Doc/architecture)
- [`Air`: Update Daemon](https://editor.land/Doc/air)
- [Contributing](https://editor.land/Doc/contributing)
