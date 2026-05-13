---
title: "Mountain"
section: "Element"
order: 11
description:
    "The Rust + Tauri native shell for Editor.Land, with native services, IPC,
    and the Cocoon extension-host bridge."
---

# Mountain

Mountain is the Rust + Tauri shell for Editor.Land. It owns the desktop window,
native services, Tauri IPC, Vine gRPC, and the bridge to Cocoon. Sky renders in
the operating system WebView, while extension-host work runs in Cocoon.

The source supports a clear architectural claim: Mountain gives Land a native
desktop path without bundling Chromium. It should not be described with public
speed or memory numbers until those numbers are published with a repeatable
benchmark.

---

## Platform Configuration

| Platform | WebView        | Source status                                               |
| -------- | -------------- | ----------------------------------------------------------- |
| macOS    | WKWebView      | Primary development and bundle path                         |
| Windows  | WebView2       | Tauri configuration exists, including bootstrapper settings |
| Linux    | WebKitGTK      | Tauri configuration exists, release validation in progress  |
| iOS      | WKWebView      | Tauri mobile configuration exists                           |
| Android  | System WebView | Tauri mobile configuration exists                           |

`tauri.conf.json` and production Tauri config files define the desktop bundle
settings. A configured target is not the same as a published installer, so
public release pages should keep installer claims separate from source support.

---

## Startup Pipeline

Mountain's binary is organized around build, registration, initialization, and
services:

```text
main.rs -> Binary::Main -> Build -> Register -> Initialize -> Services
```

`Build` configures the Tauri application. `Register` wires commands, IPC, and
service entry points. `Initialize` prepares runtime state. `Services` starts the
Vine and Cocoon path before handing control to the Tauri event loop.

---

## Source Areas

- **`ApplicationState`** - shared state for workspace, extensions, features,
  diagnostics, tree views, webviews, and lifecycle state.
- **`Environment`** - provider interfaces for files, processes, terminals,
  search, configuration, language features, debug, and related native concerns.
- **`IPC`** - Tauri IPC server and secure message-channel code, including
  `mountain_ipc_receive_message` and `mountain_ipc_get_status`.
- **`RPC`** - Vine gRPC services for Cocoon and extension-host interaction.
- **`ProcessManagement`** - sidecar process lifecycle for Cocoon and other
  helper processes.
- **`ExtensionManagement`** - installed extension scanning, manifests, VSIX
  install and uninstall routes, and extension state.
- **`Binary`** - Tauri app setup, service startup, local TLS certificate
  helpers, command registration, and runtime entry points.
- **`Telemetry`** - optional tracing and telemetry paths behind feature gates.

---

## Native Responsibilities

Mountain owns the native work that should not live inside a browser runtime:

- File reads, writes, search, and workspace watchers through Rust services.
- Terminal creation and process handling through native process and pty code.
- Clipboard access through a cross-platform native dependency.
- Keychain and secret-provider paths where enabled.
- Debug adapter, source control, diagnostic, tree-view, webview, and language
  feature provider state.
- Tauri IPC between the WebView workbench and Rust.
- Vine gRPC between Mountain and Cocoon.
- Extension scanning and manifest delivery into Cocoon.

These are source-backed responsibilities. Exact latency, memory, and startup
claims should point to a public benchmark before they appear on the website.

---

## Extension Integration

Mountain does not rewrite extension source. It scans installed extensions, reads
`package.json` manifests, handles local VSIX install and uninstall paths,
updates extension state, and sends extension changes to Cocoon. Cocoon then runs
the extension entry points and handles the `vscode` API shim.

The accurate public claim is: installed VS Code extensions run unmodified
through the Cocoon path when their API usage is implemented. A claim that every
marketplace extension works needs a validation matrix.

---

## Feature Flags

Mountain uses Cargo feature flags for capability gates and experimental tiers.
The default feature set includes paths such as `ExtensionHostCocoon`,
`MistNative`, and `AirIntegration`. Other tier flags control file-system,
search, watcher, clipboard, extension-scan, configuration, shared-memory, HTTP
proxy, and diagnostic experiments.

Feature flags are useful public documentation because they show which behavior
is compiled into a build. They should not be used as shorthand for behavior that
has not been exercised by the selected profile.

---

## Build Profiles

- **`debug`** - browser-oriented UI development without the full Mountain
  desktop shell.
- **`debug-mountain`** - the primary Tauri desktop development profile with
  Mountain and Cocoon.
- **`debug-electron`** - compatibility path for the legacy Electron workbench.

Release profiles may enable different pieces. Public docs should name the
profile when making behavior claims.

---

## Planned Improvements

- Public benchmark suite for startup, memory, file operations, and extension
  activation.
- Broader installer validation across macOS, Windows, and Linux.
- Continued expansion of extension API coverage through Cocoon and Mountain.
- Further separation of background services where sidecars give a clearer
  lifecycle boundary.

---

## See Also

- [Architecture Overview](https://Editor.Land/Doc/architecture)
- [Cocoon](https://Editor.Land/Doc/cocoon)
- [Vine](https://Editor.Land/Doc/vine)
- [Air](https://Editor.Land/Doc/air)
