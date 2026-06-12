# Inter-Component Protocol

This document specifies the communication protocols used between **Land**
components. It covers the `gRPC` service definitions (`Vine` protocol), the
`Tauri` IPC mechanism, the `Spine` extension coordination protocol, and the
connection lifecycle management.

---

## Table of Contents

1. [Protocol Overview](#protocol-overview)
2. [Tauri IPC](#tauri-ipc)
3. [Vine gRPC Protocol](#vine-grpc-protocol)
4. [Spine Extension Protocol](#spine-extension-protocol)
5. [Connection Lifecycle](#connection-lifecycle)
6. [Health Monitoring](#health-monitoring)
7. [Protocol Buffer Definitions](#protocol-buffer-definitions)
8. [Security](#security)
9. [Related Documentation](#related-documentation)

---

## Protocol Overview 🔌

**Land** uses three communication protocols operating at different abstraction
levels:

| Protocol | Transport | Layer | Components | Purpose |
| -------- | --------- | ----- | ---------- | ------- |
| `Tauri` IPC | In-process IPC | Application | `Wind`/`Sky` <-> `Mountain` | UI-backend communication |
| `gRPC` (`Vine`) | TCP localhost | Service | `Cocoon` <-> `Mountain`, `Air` <-> `Mountain` | Inter-service RPC |
| `Spine` | `gRPC` + `ActionEffect` | Extension | `Cocoon` -> `Mountain` | Extension host coordination |

### Protocol Stack

```mermaid
graph BT
    subgraph Transport[Transport Layer]
        TCP[TCP localhost]
        IPC[IPC pipes]
    end

    subgraph TauriIPC[Tauri IPC]
        Commands[In-process command/event transport]
    end

    subgraph VinegRPC[Vine gRPC Protocol]
        Proto[Service contracts defined in .proto files]
    end

    subgraph SpineProto[Spine Protocol]
        ActionResp[Extension action/response pattern]
    end

    TCP --> Commands
    IPC --> Commands
    TCP --> Proto
    IPC --> Proto
    Commands --> ActionResp
    Proto --> ActionResp

    style Transport fill:#f0f0f0,stroke:#333
    style SpineProto fill:#e8f8e8,stroke:#363
```

---

## Tauri IPC 🎮

### TierIPC Runtime Routing

The `TierIPC` environment variable controls how `Wind` and `Output` route Tauri
IPC calls at runtime. No rebuild is required to switch tiers.

| Value | Behaviour |
| ----- | --------- |
| `Mountain` | All calls route to Mountain (default) |
| `NodeDeferred` | Mountain first; on miss or `undefined` result, falls back to Cocoon via `cocoon:request` bridge |
| `Node` | All calls bypass Mountain and route directly to Cocoon via `cocoon:request` |

Individual subsystems have their own tier constants (e.g. `TierTerminal`,
`TierStorage`, `TierSearch`) baked at compile time from `.env.Land`. A runtime
shell export (e.g. `export TierStorage=Node`) overrides the baked value without
a rebuild. The active tier for each subsystem is logged at boot by
`Mountain/Source/LandFixTier.rs`.

### Commands (Request-Response)

`Wind` invokes `Mountain` handlers through `@tauri-apps/api` `invoke()`. Each
command maps to a registered `Rust` handler in `Mountain`.

**Wind-side invocation:**

```typescript
import { invoke } from "@tauri-apps/api/core";

const content: Uint8Array = await invoke("read_file", {
	path: "/Users/user/Documents/example.ts",
});
```

**Mountain-side handler:**

```rust
use tauri;

#[tauri::command]
async fn read_file(
    path: String,
    state: State<'_, AppState>
) -> Result<Vec<u8>, String> {
    let fs = state.file_system();
    fs.read_file(std::path::Path::new(&path))
        .await
        .map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![read_file])
        .run(tauri::generate_context!());
}
```

### Command Catalog

All commands are dispatched through the single Tauri command `MountainIPCInvoke`
with `{ method: string, params: any[] }`. The method string corresponds to the
channel wire name defined in `Common/Source/IPC/Channel.rs`.

#### Encryption

| Command | Parameters | Returns | Purpose |
| ------- | ---------- | ------- | ------- |
| `encryption:encrypt` | `[plaintext: string]` | `string` | AES-256-GCM encryption; key is SHA-256 of machine UUID, cached per-process |
| `encryption:decrypt` | `[ciphertext: string]` | `string` | Symmetric decryption; used by extension context `secrets` API |

The encryption key is derived once per process in `Encryption/Key.rs` using
`SHA-256("Land-Encryption-v1" + machine_id)`. Returns an empty string on failure
rather than throwing, so callers treat a corrupt blob as "no stored secret".

#### File System

| Command | Parameters | Returns | Purpose |
| ------- | ---------- | ------- | ------- |
| `file:watch` | `[path: string, options?]` | `void` | Register a file watcher via `FileWatcherProvider` |
| `file:unwatch` | `[path: string]` | `void` | Deregister a file watcher |
| `file:open` | `[path: string, opts?]` | `number` | Open a file descriptor; fd is tracked in Mountain's fd table |
| `file:close` | `[fd: number]` | `void` | Close a tracked file descriptor |
| `file:stat` | `[path: string]` | `FileStat` | Stat a path |
| `file:readFile` | `[path: string]` | `Uint8Array` | Read file (VS Code native path) |
| `file:readdir` | `[path: string]` | `DirEntry[]` | List directory entries |
| `file:writeFile` | `[path: string, content: Uint8Array]` | `void` | Write file |
| `file:delete` | `[path: string, opts?]` | `void` | Delete file or directory; fires `$acceptDidDeleteFiles` |
| `file:rename` | `[from: string, to: string]` | `void` | Rename/move file; fires `$acceptDidRenameFiles` |
| `file:mkdir` | `[path: string]` | `void` | Create directory; fires `$acceptDidCreateFiles` |
| `file:copy` | `[from: string, to: string]` | `void` | Copy file |
| `file:cloneFile` | `[from: string, to: string]` | `void` | Clone file (reflink where supported); fires `$acceptDidCreateFiles` |
| `file:realpath` | `[path: string]` | `string` | Resolve symlinks |

---

## Vine gRPC Protocol 🏔️

`Vine` defines the `gRPC` service contracts for `Mountain`-`Cocoon` and
`Mountain`-`Air` communication. The canonical definition lives at
`Element/Vine/Proto/Vine.proto`. `Mountain` keeps a local sync'd copy at
`Element/Mountain/Proto/Vine.proto` which its `build.rs` compiles directly.

### Service Definitions

```protobuf
syntax = "proto3";

package Vine;

// Service running on the Mountain host, listening for requests from Cocoon.
service MountainService {
  // Generic request-response: Cocoon -> Mountain.
  rpc ProcessCocoonRequest(GenericRequest) returns (GenericResponse);
  // Fire-and-forget notification: Cocoon -> Mountain.
  rpc SendCocoonNotification(GenericNotification) returns (Empty);
  // Cancel a long-running operation.
  rpc CancelOperation(CancelOperationRequest) returns (Empty);
  // LAND-PATCH B7-S6 P2: bidirectional streaming channel.
  rpc OpenChannelFromCocoon(stream Envelope) returns (stream Envelope);
}

// Service running on the Cocoon sidecar, listening for requests from Mountain.
service CocoonService {
  // A generic request-response method for Mountain to call a function on Cocoon.
  rpc ProcessMountainRequest(GenericRequest) returns (GenericResponse);

  // A generic fire-and-forget method for Mountain to send a notification to Cocoon.
  rpc SendMountainNotification(GenericNotification) returns (Empty);

  // A method for Mountain to request that Cocoon cancel a long-running operation.
  rpc CancelOperation(CancelOperationRequest) returns (Empty);

  // LAND-PATCH B7-S6 P2: bidirectional streaming channel (mirror of
  // MountainService::OpenChannelFromCocoon). Mountain opens this
  // stream once per Cocoon connection; all subsequent traffic
  // multiplexes over it.
  rpc OpenChannelFromMountain(stream Envelope) returns (stream Envelope);

  // ==================== Initialization ====================

  // Handshake - Called by Cocoon to signal readiness
  rpc InitialHandshake(Empty) returns (Empty);

  // Initialize Extension Host - Mountain sends initialization data to Cocoon
  rpc InitExtensionHost(InitExtensionHostRequest) returns (Empty);

  // ==================== Commands ====================

  // Register Command - Cocoon registers an extension command
  rpc RegisterCommand(RegisterCommandRequest) returns (Empty);

  // Execute Contributed Command - Mountain executes an extension command
  rpc ExecuteContributedCommand(ExecuteCommandRequest) returns (ExecuteCommandResponse);

  // Unregister Command - Unregister a previously registered command
  rpc UnregisterCommand(UnregisterCommandRequest) returns (Empty);

  // ==================== Language Features ====================

  // Register Hover Provider - Register a hover provider
  rpc RegisterHoverProvider(RegisterProviderRequest) returns (Empty);

  // Provide Hover - Request hover information
  rpc ProvideHover(ProvideHoverRequest) returns (ProvideHoverResponse);

  // Register Completion Item Provider - Register a completion provider
  rpc RegisterCompletionItemProvider(RegisterProviderRequest) returns (Empty);

  // Provide Completion Items - Request completion items
  rpc ProvideCompletionItems(ProvideCompletionItemsRequest) returns (ProvideCompletionItemsResponse);

  // Register Definition Provider - Register a definition provider
  rpc RegisterDefinitionProvider(RegisterProviderRequest) returns (Empty);

  // Provide Definition - Request definition location
  rpc ProvideDefinition(ProvideDefinitionRequest) returns (ProvideDefinitionResponse);

  // Register Reference Provider - Register a reference provider
  rpc RegisterReferenceProvider(RegisterProviderRequest) returns (Empty);

  // Provide References - Request references
  rpc ProvideReferences(ProvideReferencesRequest) returns (ProvideReferencesResponse);

  // Register Code Actions Provider - Register code actions provider
  rpc RegisterCodeActionsProvider(RegisterProviderRequest) returns (Empty);

  // Provide Code Actions - Request code actions
  rpc ProvideCodeActions(ProvideCodeActionsRequest) returns (ProvideCodeActionsResponse);

  // ==================== Language Features (Extended) ====================

  // Register Document Highlight Provider
  rpc RegisterDocumentHighlightProvider(RegisterProviderRequest) returns (Empty);

  // Provide Document Highlights
  rpc ProvideDocumentHighlights(ProvideDocumentHighlightsRequest) returns (ProvideDocumentHighlightsResponse);
```

Common types used across messages:

```protobuf
message Position {
  uint32 Line = 1;
  uint32 Character = 2;
}

message Range {
  Position Start = 1;
  Position End = 2;
}

message Uri {
  string Value = 1;
}

message WorkspaceFolder {
  Uri Uri = 1;
  string Name = 2;
}

message CompletionItem { /* ... */ }
message Location { /* ... */ }
```

### Port Allocation

| Service | Element | Port | Transport |
| ------- | ------- | ---- | --------- |
| Mountain Vine | `Mountain` | `50051` | TCP |
| Cocoon Vine | `Cocoon` | `50052` | TCP |
| Air Vine | `Air` | `50053` | TCP |

All listeners bind to `[::1]` (not `0.0.0.0`). Environment overrides are
described in
[`Vine/Source/Library.rs`](../../../Element/Vine/Source/Library.rs).

---

## Spine Extension Protocol 🔄

The `Spine` protocol is the extension host coordination layer built on top of
`Vine` `gRPC`. It implements an action/response pattern for extension-to-backend
communication.

### Action/Response Pattern

```mermaid
sequenceDiagram
    participant Extension as Extension code in Cocoon
    participant Shim as Cocoon vscode shim
    participant Spine as Spine protocol
    participant Mountain as Mountain ActionHandler
    participant Trait as Common trait impl

    Extension->>Shim: Call vscode API (e.g., openTextDocument)
    Shim->>Shim: Create ActionEffect
    Shim->>Spine: gRPC PerformAction(ActionRequest)
    Spine->>Mountain: Route to ActionHandler
    Mountain->>Trait: Execute action via Common trait implementation
    Trait-->>Mountain: Action result
    Mountain-->>Spine: ActionResponse { result, error }
    Spine-->>Shim: gRPC response
    Shim-->>Extension: Return result to extension
```

### ActionEffect Types

The `Spine` protocol encodes all possible extension actions as a discriminated
union:

```
ActionEffect
    +-- ReadFile { path }
    +-- WriteFile { path, content }
    +-- DeleteFile { path }
    +-- ReadDirectory { path }
    +-- CreateDirectory { path }
    +-- Stat { path }
    +-- Rename { from, to }
    +-- Copy { from, to }
    +-- WatchFile { path }
    +-- OpenDialog { options }
    +-- SaveDialog { options }
    +-- ShowMessage { message, options }
    +-- ShowInputBox { options }
    +-- OpenExternal { url }
    +-- ExecuteProcess { command, args }
    +-- ExecuteCommand { command_id, args }
    +-- RegisterCommand { command_id, handler }
    +-- CreateTerminal { options }
    +-- WriteTerminal { id, data }
    +-- ReadClipboard { format }
    +-- WriteClipboard { text }
    +-- GetConfiguration { key }
    +-- SetConfiguration { key, value, target }
    +-- GetSecret { key }
    +-- SetSecret { key, value }
    +-- DeleteSecret { key }
    +-- CreateWebviewPanel { options }
    +-- SendWebviewMessage { id, message }
    // ... 80+ effect variants
```

### Routing

The `Cocoon` tier router (`Cocoon/Source/Services/Handler/VscodeAPI/ROUTING.md`)
decides per-call whether to:

1. **Track A (Stock Node):** Handle entirely in-process via unmodified
   `extHost*.ts` code
2. **Track B (Rust Native):** Package as `ActionEffect`, send via `Spine` `gRPC`
   to `Mountain`, await native execution
3. **Track C (Cocoon Bespoke):** Hand-rolled `TypeScript` implementation in
   `Cocoon` (last resort)

---

## Connection Lifecycle 🔄

### Mountain-Cocoon Connection

**Bootstrap order (critical):** Cocoon's gRPC server (port 50052) must bind
before Cocoon attempts to connect to Mountain's gRPC server (port 50051). The
bootstrap stage order is: `RPCServer` (Stage 5) bind → `MountainConnection`
(Stage 3) connect. Mountain allows a 30-second connection budget; reversing this
order causes Mountain to time out before Cocoon is ready to accept the
handshake.

```mermaid
sequenceDiagram
    participant Mountain as Mountain
    participant Server as gRPC Server
    participant Cocoon as Cocoon sidecar
    participant Init as Initialization

    Mountain->>Server: Start gRPC server on port 50051
    Mountain->>Cocoon: Spawn node bootstrap-fork.js
    Cocoon->>Server: Connect gRPC client to 127.0.0.1:50051
    Cocoon->>Server: Send $initialHandshake notification
    Server-->>Mountain: Handshake received
    Mountain->>Mountain: Gather InitData (workspace, extensions, config)
    Mountain->>Cocoon: Send Initialize(InitData)
    Cocoon->>Init: Create InitDataLayer
    Init->>Init: Run FullAppInitialization
    Init->>Init: Install RequireInterceptor
    Init->>Init: Activate startup extensions
    Cocoon->>Server: Send activity ping every 5 seconds
    Server-->>Mountain: Connection established, normal operation
```

### Disconnection and Reconnection

```
Network failure or Cocoon crash
    |
    v
Mountain detects stale connection (no activity within 30-second check window)
    |
    +---> Option 1: Restart Cocoon (default, up to 3 attempts)
    |       - Kill existing Cocoon process
    |       - Re-spawn from bootstrap-fork.js
    |       - Re-run initialization sequence
    |       - Restored state: configuration, open files
    |       - Lost state: extension-managed data, webview panels
    |
    +---> Option 2: Graceful degradation
            - Show reconnection notification in UI
            - Queue extension API calls
            - Reconnect when Cocoon restarts (user manually)
```

### Mountain-Air Connection

```
Mountain starts
    |
    v
Mountain spawns Air binary
    |
    v
Air connects gRPC to 127.0.0.1:50053
    |
    +---> Sends Connect { services: [updater, indexer, crypto] }
    |
    v
Mountain registers Air services in AppState
    |
    v
Normal operation:
    - Mountain dispatches background work via PerformAction
    - Air responds with action results
    - Both sides maintain activity tracking
    - Staleness check every 30 seconds
```

---

## Health Monitoring 💓

### Heartbeat Protocol

Both `gRPC` connections (`Mountain`-`Cocoon`, `Mountain`-`Air`) implement a
health monitoring protocol. Health is tracked via a per-connection
`ConnectionMetadata` struct in `Vine/Source/Client/Shared.rs`:

| Parameter | Value |
| --------- | ----- |
| Staleness check interval | 30 seconds (`HEALTH_CHECK_INTERVAL_MS`) |
| Max retry attempts | 10 (`MAX_RETRY_ATTEMPTS`) |
| Retry base delay | 200 ms (`RETRY_BASE_DELAY_MS`) |
| Connection timeout | 30 seconds (`CONNECTION_TIMEOUT`) |

Health is determined by three conditions in
`Vine/Source/Client/CheckSideCarHealth.rs`: the connection must be marked
`IsHealthy`, the `LastActivity` timestamp must not be older than
`HEALTH_CHECK_INTERVAL_MS` (30 seconds), and the `FailureCount` must not exceed
`MAX_RETRY_ATTEMPTS` (10). Failed connections are recorded via
`RecordSideCarFailure` which increments the counter and sets `IsHealthy` to
`false`; successful activity resets both via `UpdateSideCarActivity`.

### Diagnostic Logging

All connection state changes are logged via the `dev_log!` system at
`Mountain/Source/IPC/DevLog/`:

```
[DEV:Vine] gRPC server listening on [::1]:50051
[DEV:Vine] Cocoon connected, handshake received
[DEV:Vine] Heartbeat OK (seq=142, latency=3ms)
[DEV:Vine] Heartbeat TIMEOUT (last: seq=147, 18s ago)
[DEV:Vine] Cocoon disconnected, restarting (attempt 1/3)
```

---

## Protocol Buffer Definitions 📁

### Current Location

Protocol definitions currently reside in consuming components:

| File | Location | Purpose |
| ---- | -------- | ------- |
| `Vine.proto` | `Element/Vine/Proto/Vine.proto` | Core `Mountain`<->`Cocoon` `gRPC` services |
| `Grove.proto` | `Element/Grove/Proto/Grove.proto` | Grove-specific WASM hosting extensions |
| Server impl | `Element/Mountain/Source/Vine/` | Rust `gRPC` server (`tonic`, consumes Vine stubs) |
| Client impl | `Element/Cocoon/Source/Services/Mountain/gRPC/Client.ts` | TypeScript `gRPC` client |
| RouteManifest | `Element/Cocoon/Source/Generated/RouteManifest.ts` | Auto-generated routing tier enumeration |

### Code Generation

Rust types are generated from `.proto` files using `prost` and `tonic-build` at
compile time:

```rust
// Mountain/build.rs  (references Vine element's proto)
fn main() {
    tonic_build::configure()
        .compile(&["../Vine/Proto/Vine.proto"], &["../Vine/Proto"])
        .expect("Failed to compile protos");
}
```

TypeScript types are generated using `protoc-gen-ts` and checked into the
`Cocoon` source tree as generated artifacts.

---

## Security 🛡️

All `gRPC` connections are restricted to localhost only (`[::1]` / `127.0.0.1`).
No remote connections are accepted.

| Aspect | Implementation |
| ------ | -------------- |
| Transport | TCP loopback only |
| Auth | None required (localhost-only) |
| Encryption | None (localhost-only, no network exposure) |
| Port binding | `[::1]` only, not `0.0.0.0` |
| DNS isolation | All non-localhost traffic blocked by `Mist` |
| Timeout | 30-second staleness check |
| Backpressure | `gRPC` flow control + bounded channels |

---

## Related Documentation 📋

- [Architecture](Architecture.md) - System architecture
- [BuildPipeline](BuildPipeline.md) - Build pipeline
- [EditorCore](EditorCore.md) - Editor workbench
- [Polyfills](Polyfills.md) - Compatibility shims
- [RustInfrastructure](RustInfrastructure.md) - `Rust` backend components
- [Building](Building.md) - Build instructions
- [Workflow/ApplicationStartupAndHandshake](Workflow/ApplicationStartupAndHandshake.md)
- [Workflow/CreatingAndInteractingWithAWebviewPanel](Workflow/CreatingAndInteractingWithAWebviewPanel.md)

---

**Project Maintainers:** Source Open
([Source/Open@editor.land](mailto:Source/Open@editor.land)) |
[GitHub Repository](https://github.com/CodeEditorLand/Land) |
[Report an Issue](https://github.com/CodeEditorLand/Land/issues)
