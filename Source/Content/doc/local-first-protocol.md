---
title: "Local-First Protocol"
section: "Development"
order: 5
description:
    "Land's local-first design philosophy: how editor state, extension data, and
    file operations stay on-device without requiring cloud services."
---

Land is designed so that every core editor function works without a network
connection and without an account. All persistent state is stored on the local
device using platform-native mechanisms. Optional cloud services — update
delivery, authentication for specific extensions — are provided by the **Air**
daemon and the WebSite, but the editor starts, edits files, runs extensions, and
saves state entirely offline. The local-first design is
implemented as follows and has specific implications for extension developers.

## 💾 Editor State Storage

All editor state is persisted locally through Mountain's `storage:set` and
`storage:get` IPC handlers. The underlying store uses **SQLite** for structured
data and the platform keychain (via Tauri's secure storage API) for secrets.
There is no cloud sync layer in the storage IPC path.

The storage is namespaced by extension ID. An extension writing to
`context.workspaceState` or `context.globalState` calls Mountain's `storage:set`
handler, which writes to SQLite at:

```
~/.land/storage/<extension-id>.db         # macOS / Linux
%APPDATA%\Land\storage\<extension-id>.db  # Windows
```

No data leaves the device unless the extension itself initiates a network
request.

## 🧩 Extension State via Memento

The `vscode.Memento` interface (`context.workspaceState`, `context.globalState`)
is backed by Mountain's `Storage.Get` and `Storage.Set` IPC calls. Extension
developers can rely on Memento for persistent key-value storage with the same
semantics as VS Code: writes are durable across restarts, workspace state is
scoped to the current workspace root, and global state is shared across all
workspaces.

The Memento implementation does not batch writes or require a flush call. Each
`state.update(key, value)` call is an immediate round-trip to Mountain's storage
handler, which writes through to SQLite synchronously within the Tauri async
runtime.

## 🔒 Extension Secrets

`context.secrets` is backed by Mountain's `encryption:encrypt` and
`encryption:decrypt` handlers, which use **AES-256-GCM** with a machine-stable
key derived from a SHA-256 hash of the machine UUID. Encrypted values are stored
in the same SQLite database as other state. Secrets never leave the device.

> [!IMPORTANT]
> Because the encryption key is derived from the machine UUID,
> secrets are **not portable** across machines. An extension that stores a token
> on one machine cannot read it on another. This matches VS Code's behavior for
> `context.secrets` on desktop.

## 📁 File System Operations

File read, write, watch, and directory operations go directly through Mountain's
native filesystem handlers to the OS. There is no cloud sync layer, no conflict
resolution layer, and no virtual filesystem in the IPC path for local files. The
`TierFileSystem` variable selects between implementation layers (Layer2 through
Layer4) but all layers are direct local filesystem access.

Remote filesystem support (SSH, container filesystems) is handled by
extension-provided `FileSystemProvider` implementations registered via
`vscode.workspace.registerFileSystemProvider`. The core filesystem IPC path
remains local-only.

## ☁️ Air: Optional Services

The **Air** daemon provides optional services that the editor does not depend on
for core function:

- **Update delivery** — Air checks for new Land releases and downloads update
  packages. If Air is not running, the editor continues to work; no update
  prompt appears.
- **Authentication** — Air can broker OAuth tokens for extensions that integrate
  with Editor.Land accounts. Extensions requiring GitHub OAuth or other
  third-party OAuth (Copilot, GitHub Pull Requests) still require their own auth
  flows, which are not currently implemented in the core editor.

The editor starts correctly with Air absent. No startup path has a hard
dependency on Air being reachable.

## 📊 Telemetry: Opt-In Only

Telemetry is disabled in production builds by default (`Capture=false`,
`Report=false` in `.env.Land.Production`). The PostHog integration and OTLP
exporter are present in the codebase but inactive unless explicitly enabled by
setting `Capture=true` and `Report=true` in the local `.env.Land.PostHog` file.

Session recording (`Replay`) and surveys (`Ask`) are also off by default and
must be individually enabled. No telemetry data is collected from users who have
not opted in.

## 📜 CC0 License and Vendor Lock-In

Land is released under the **Creative Commons CC0 Universal** public domain
dedication. This means there is no license restriction on forking, modifying, or
redistributing the editor or any of its components. Combined with the
local-first storage design, there is no mechanism by which a vendor could lock
users into a proprietary data format or a mandatory cloud service.

## 📝 What Local-First Means for Extension Developers

- **Extension state is always local.** `context.workspaceState`,
  `context.globalState`, and `context.secrets` write to the local device. There
  is no cloud-sync API in the Cocoon shim.
- **Sync is the extension's responsibility.** If an extension needs to
  synchronize state across machines, it must implement that sync itself using
  whatever backend it chooses (its own API, GitHub Gist, etc.). Land provides no
  cross-device sync primitives.
- **Extensions work offline.** An extension that relies only on the `vscode.*`
  API and local file access will work without a network connection. Extensions
  that make outbound HTTP requests are responsible for handling offline
  conditions.
- **No account required.** Extensions must not assume the user has an
  Editor.Land account or has authenticated with any service. Account-gated
  features should be optional enhancements, not required for basic function.
