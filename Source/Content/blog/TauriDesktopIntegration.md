---
title: "Tauri 2.0 Desktop Integration in Land"
summary:
    "How Land leverages Tauri 2.0 for a native cross-platform editor without
    Electron."
publishedAt: "2026-04-02"
tags: ["Tauri", "Rust", "Desktop", "Architecture"]
author: "CodeEditorLand"
readTime: 6
---

# Tauri 2.0 Desktop Integration in Land

Code Editor Land replaces Electron with [Tauri 2.0](https://v2.tauri.app), a
Rust-based framework that uses the platform's native webview instead of shipping
a bundled Chromium. This architectural decision cuts the binary size by roughly
an order of magnitude and gives the editor direct access to operating system
APIs through Rust.

## Why Tauri Over Electron?

VS Code ships an entire Chromium browser alongside Node.js. Every running window
carries hundreds of megabytes of memory overhead before a single extension
loads. Tauri sidesteps this by rendering the UI through macOS WebKit, Windows
WebView2, or Linux WebKitGTK - the same rendering engines the OS already
maintains and patches.

The result is a smaller download, faster startup, and tighter OS integration.
Land can call into native file-system watchers, Keychain, and system
notifications without a JavaScript bridge layer.

## Rust Backend: The Mountain Element

The Tauri Rust backend lives in the **Mountain** element. Mountain manages
window lifecycle, file-system operations, process spawning, and native menus.
Because it is ordinary Rust, it benefits from Cargo's package ecosystem and
`unsafe`-free memory safety.

```rust
#[tauri::command]
async fn ReadFileContent(Path: &str) -> Result<String, MountainError> {
	let Content = tokio::fs::read_to_string(Path).await?;
	Ok(Content)
}
```

Every Tauri command is an `async fn` invoked from the TypeScript frontend over
IPC. Errors are explicit in the return type - no silent swallowing.

## IPC: Vine and Mist

Communication between the webview and the Rust backend flows through two IPC
layers:

- **Vine** - gRPC-style protocol definitions compiled with `tonic`. Used for
  structured, high-throughput messages like language server traffic.
- **Mist** - WebSocket transport for real-time events such as terminal output
  and file-watcher notifications.

Both layers are strongly typed end-to-end: a Protobuf schema generates Rust
server code and TypeScript client stubs simultaneously.

## Plugin System

Tauri 2.0 introduces a formal plugin architecture. Land ships several built-in
plugins:

| Plugin                 | Purpose                                   |
| ---------------------- | ----------------------------------------- |
| `tauri-plugin-fs`      | Sandboxed file-system access              |
| `tauri-plugin-shell`   | Process spawning with allow-list          |
| `tauri-plugin-store`   | Persistent key-value storage for settings |
| `tauri-plugin-updater` | Delta updates via the Air daemon          |

Third-party Tauri plugins written in Rust can be loaded at build time, extending
the editor with native capabilities that JavaScript alone cannot provide.

## Cross-Platform Builds

Land compiles for macOS (aarch64, x86_64), Windows (x86_64), and Linux (x86_64,
aarch64) from a single codebase. The **SideCar** element bundles pre-built
Node.js binaries so that extensions requiring a Node runtime work without asking
the user to install one.

## NLnet Funding

This work is funded through the
[NGI0 Commons Fund](https://nlnet.nl/commonsfund/) (grant No. 101135429),
operated by PlayForm (Sofia, Bulgaria) under the NLnet Foundation. The grant
specifically supports the elimination of Electron dependencies in open-source
developer tooling - making Tauri integration a core deliverable.
