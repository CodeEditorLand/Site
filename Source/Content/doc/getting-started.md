---
title: "Getting Started"
section: "Start"
order: 1
description: "Install and run Code Editor Land on your machine."
---

# Getting Started

Code Editor Land is a native code editor built with Rust (Tauri) and TypeScript.
It is a drop-in replacement for VS Code with a modern, high-performance
architecture that eliminates the Electron dependency.

## Requirements

- **Rust** 1.95.0 or later
- **Node.js** 20 or later
- **pnpm** 9 or later
- macOS 13+, Windows 11, or Ubuntu 22.04+

## Installation

Download the latest release from the [Download](/Download) page, or build from
source:

```bash
git clone --recurse-submodules https://github.com/CodeEditorLand/Land.git
cd Land
pnpm install
cargo build --release
```

## Running the Editor

```bash
cargo tauri dev
```

The editor window opens automatically. Extensions are loaded from the same
directory as VS Code (`~/.vscode/extensions`) and work without modification.

## See Also

- [Installation](/Doc/installation)
- [Quickstart](/Doc/quickstart)
- [Architecture Overview](/Doc/architecture)
