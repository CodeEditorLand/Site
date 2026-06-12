---
title: Why Tauri
section: "Why Land"
order: 1
description:
    Tauri gives Land a native desktop shell without bundling Chromium - the
    system WebView renders the UI while a Rust backend owns every OS
    interaction.
---

Electron ships its own Chromium and Node.js inside every app bundle. That is
why VS Code is ~300 MB to download and uses 500 MB-1.5 GB per window: three
renderer processes, a Node.js main process, and a copy of Chromium duplicating
what the OS already provides. Tauri uses the system WebView - WKWebView on
macOS, WebView2 on Windows, WebKitGTK on Linux - and replaces the Node.js main
process with a Rust backend.

## No bundled Chromium

| Attribute                     | Electron (VS Code)                 | Land (Tauri)          |
| ----------------------------- | ---------------------------------- | --------------------- |
| Bundled runtime               | Chromium + Node.js                 | None - system WebView |
| Main process language         | JavaScript (Node.js)               | Rust (Mountain)       |
| Renderer processes per window | 3 (main, renderer, extension host) | 1 WebView             |
| Binary size baseline          | ~300 MB download                   | Significantly smaller |

The size advantage is structural. There is nothing to strip - Chromium is
simply not included.

## Rust backend instead of Node.js main process

In Electron, every native OS operation - opening a dialog, spawning a terminal,
reading the keychain - calls through a Node.js native addon or IPC bridge. In
Tauri, Mountain calls OS APIs directly via the `tauri`, `portable-pty`,
`keyring`, and `notify` crates.

The practical result: dialog open ~2 ms vs ~200 ms. File reads go through
`tokio::fs::read` rather than a JSON IPC round-trip. Terminal resize sends
SIGWINCH directly rather than through a bridge serialization layer.

## Typed IPC via invoke

Wind calls Mountain handlers through `@tauri-apps/api`'s `invoke()`. Each call
maps to a `#[tauri::command]` Rust function. Tauri deserializes JSON into typed
Rust parameters at the boundary - wrong shape means the call fails before
Mountain's handler runs. No duck-typing at the IPC boundary.

## Security model: command allowlist

Every Rust function callable from the WebView must be explicitly registered.
There is no `nodeIntegration` mode. The set of callable commands is defined in
Rust code, not in a config flag that can be set to `true` and forgotten.
`Entitlements.plist` and `tauri.conf.json` together define what the FIDDEE
binary is permitted to do on macOS - hardened runtime, keychain, network
client - enforced by macOS itself.

## What Tauri cannot do yet

Tauri 2.x does not expose the full macOS NSWindowTabGroup API. The
`nativeHost:newWindowTab`, `showPreviousWindowTab`, and related handlers are
correct no-ops because the underlying API is not in Tauri's surface. Some
macOS-only APIs that Electron exposes through native addons also have no Tauri
equivalent and require platform-specific Rust code.

> **WARNING**: WebView2 (Windows) and WebKitGTK (Linux) differ from WKWebView
> (macOS). macOS is the primary development path; other platforms may have
> rendering differences.

## Cocoon is still Node.js

Tauri removes Node.js from the main process. It does not remove it from the
extension host. Cocoon - the VS Code extension host sidecar - is still a
Node.js process managed by Mountain. The architecture isolates Node.js to
extension execution rather than making it the main process that owns all OS
calls.

## Related Documentation

- [Why Rust](https://Editor.Land/Doc/why-rust)
- [Why WebAssembly](https://Editor.Land/Doc/why-wasm)
- [Deep Dive: Mountain](https://Editor.Land/Doc/deep-dive-mountain)
