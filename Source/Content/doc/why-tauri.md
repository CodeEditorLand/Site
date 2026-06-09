---
title: Why Tauri
section: Why Land
order: 1
description:
    Tauri gives Land a native desktop shell without bundling Chromium - the
    system WebView renders the UI while a Rust backend owns every OS
    interaction.
---

Electron ships its own Chromium and Node.js runtime inside every app bundle.
That is where VS Code's ~300 MB download and 500 MB-1.5 GB per-window RAM
footprint come from: three renderer processes, a Node.js main process, and a
copy of Chromium that duplicates what the OS already provides. Tauri uses the
WebView the operating system already ships - WKWebView on macOS, WebView2 on
Windows, WebKitGTK on Linux - and replaces the Node.js main process with a Rust
backend.

## No bundled Chromium

The system WebView is already present on every supported platform. Tauri routes
the UI through it rather than shipping a private copy. For Land this means:

| Attribute                     | Electron (VS Code)                 | Land (Tauri)                        |
| ----------------------------- | ---------------------------------- | ----------------------------------- |
| Bundled runtime               | Chromium + Node.js                 | None - uses system WebView          |
| Main process language         | JavaScript (Node.js)               | Rust (Mountain)                     |
| Renderer processes per window | 3 (main, renderer, extension host) | 1 WebView per window                |
| Binary size baseline          | ~300 MB download                   | Significantly smaller (no Chromium) |

The binary size advantage is structural, not a result of stripping features.
There is nothing to strip - Chromium is simply not included.

## Rust backend instead of Node.js main process

In Electron, the main process is Node.js JavaScript. Every native OS operation -
opening a dialog, spawning a terminal, reading the keychain - calls through a
Node.js native addon or an IPC bridge. In Tauri, the main process is Mountain: a
Rust binary that calls OS APIs directly via the `tauri`, `portable-pty`,
`keyring`, and `notify` crates.

The practical result: dialog open is approximately 2 ms in Mountain vs
approximately 200 ms in Electron. File reads go through `tokio::fs::read` rather
than a JSON IPC round-trip. Terminal resize sends SIGWINCH directly to the PTY
rather than through a bridge serialization layer.

## Tauri invoke: typed IPC

Wind and Sky call Mountain handlers through `@tauri-apps/api`'s `invoke()`. Each
call maps to a `#[tauri::command]` Rust function. Tauri deserializes the JSON
payload into typed Rust parameters at the boundary - if the caller sends the
wrong shape, the call fails before Mountain's handler runs.

```typescript
// TypeScript caller (Wind)
const content: Uint8Array = await invoke("read_file", {
	path: "/Users/user/project/main.rs",
});
```

```rust
// Rust handler (Mountain)
#[tauri::command]
async fn read_file(
    path: String,
    state: State<'_, AppState>
) -> Result<Vec<u8>, String> {
    state.file_system()
        .read_file(std::path::Path::new(&path))
        .await
        .map_err(|e| e.to_string())
}
```

There is no duck-typing at the IPC boundary. The TypeScript side sees a typed
return value; the Rust side sees typed parameters.

## Security model: command allowlist

Tauri's security model requires that every Rust function callable from the
WebView be explicitly registered. There is no `nodeIntegration` mode that grants
the WebView ambient Node.js access. The set of callable commands is the
allowlist, and it is defined in Rust code - not in a config flag that can be set
to `true` and forgotten.

The `Entitlements.plist` and `tauri.conf.json` together define what the FIDDEE
binary is permitted to do on macOS: hardened runtime, keychain access, and
network client capability. These are macOS-enforced, not just Land policy.

## What Tauri cannot do yet

Tauri 2.x does not expose the full macOS NSWindowTabGroup API. The
`nativeHost:newWindowTab`, `showPreviousWindowTab`, `showNextWindowTab`,
`mergeAllWindowTabs`, and `toggleWindowTabsBar` handlers are no-ops in Mountain
because the underlying API is not in Tauri's surface. This is a correct no-op -
not a gap that can be filled with a polyfill.

Some macOS-only APIs that Electron exposes through Node.js native addons also
have no direct Tauri equivalent and require platform-specific Rust code. As
Tauri's API surface grows, these gaps shrink.

> [!WARNING] WebView2 on Windows and WebKitGTK on Linux have different feature
> sets from WKWebView on macOS. CSS and JS behavior can differ. macOS is the
> primary development path; other platforms are configured in the repository but
> may have rendering differences.

## Cocoon is still Node.js

Tauri removes Node.js from the main process (Mountain). It does not remove
Node.js from the extension host. Cocoon - the VS Code extension host sidecar -
is still a Node.js process managed by Mountain. VS Code extensions expect a
Node.js runtime, and Cocoon provides one. The Tauri architecture means that
Node.js is isolated to extension execution rather than being the main process
that owns all OS calls.
