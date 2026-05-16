---
title: "Grove - Deep Dive"
section: "Deep Dive"
order: 37
description:
    "Rust/WASM extension host, WebAssembly runtime, and sandboxed extension
    execution"
---

# Grove - Deep Dive

Grove is a native, sandboxed Rust/WASM extension host that runs VS Code
extensions compiled to WebAssembly, complementing the Node.js-based Cocoon host.

## Architecture 🏗️

Five-layer design: extension host controller, WASM runtime, VS Code API bridge,
transport layer, and shared utilities.

### Layer Breakdown

| Layer                     | Key Modules                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| Extension Host Controller | `ExtensionHost.rs`, `ExtensionManager.rs`, `Activation.rs`, `Lifecycle.rs`, `APIBridge.rs`   |
| WASM Runtime              | `Runtime.rs` (WASMtime engine), `ModuleLoader.rs`, `MemoryManager.rs`, `HostBridge.rs`       |
| Transport                 | `gRPCTransport.rs`, `IPCTransport.rs`, `WASMTransport.rs` with pluggable `Strategy.rs` trait |
| API                       | `vscode.rs`, `types.rs` matching VS Code TypeScript types                                    |
| Protocol/Services         | `SpineConnection.rs`, host services, shared utilities                                        |

## Data Flow 🔄

1. Mountain sends `ActivateExtension` via Grove.proto
2. Grove loads extension manifest and compiles WASM module
3. WASM runtime instantiates the module with host functions
4. Extension calls host functions (e.g. `vscode.workspace.readFile`)
5. HostBridge dispatches, Grove forwards service call to Mountain via Transport
6. Mountain returns result, passed back through WASM to extension

## WASM Runtime ⚡

- **Engine**: WASMtime with per-extension memory limits
- **Module loading**: Compilation and caching of WASM files
- **Memory management**: Linear memory allocation and bounds enforcement
- **Host bridge**: Registered functions available to extension WASM code

## Transport Options 🚚

Selectable via Cargo features:

| Feature | Description                            |
| ------- | -------------------------------------- |
| `grpc`  | gRPC via Mountain (default)            |
| `wasm`  | WASMtime runtime (default)             |
| `ipc`   | Unix/Windows IPC transport (Unix only) |
| `all`   | All features enabled                   |

## Configuration ⚙️

| Option          | Default          | Description                                       |
| --------------- | ---------------- | ------------------------------------------------- |
| Standalone mode | off              | Run without Mountain for testing (`--standalone`) |
| Extension path  | unset            | Load specific extension directly (`--extension`)  |
| Memory limit    | platform default | Per-extension WASM memory ceiling                 |
| WASM target     | `wasm32-wasi`    | Extensions must target this ABI                   |

## Integration 🔗

| Element  | Direction     | Mechanism            | Description                                  |
| :------- | :------------ | :------------------- | :------------------------------------------- |
| Mountain | Bidirectional | gRPC via Grove.proto | Extension activation and API call forwarding |
| Vine     | Inbound       | Protocol definition  | Grove.proto extends Vine service definitions |
| Cocoon   | Sibling       | Shared API surface   | Same VS Code API surface for portability     |

## Related

- [Grove overview](/doc/grove)
- [Cocoon Node.js extension host](/doc/deep-dive-cocoon)
- [Vine protocol reference](/doc/deep-dive-vine)
