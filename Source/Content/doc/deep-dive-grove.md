---
title: Grove - Deep Dive
section: Deep Dive
order: 4
description:
    Wasmtime integration, WASM component model, ABI bridge design, planned VS
    Code API surface, capability-based security model, and current
    implementation status - marked as WIP.
---

> [!WARNING] Grove is work-in-progress. The architecture described here reflects
> the design as implemented in source; portions marked "planned" are not yet
> active. Grove is not enabled in the default build profile. Cocoon remains the
> active extension host for all existing VS Code extensions.

> [!NOTE] Grove is implemented and available but Cocoon (Node.js) remains the
> default extension host. WASM extensions targeting Grove can use the WASMtime
> sandbox today via `cargo build -p Mountain --features grove`. Full VS Code API
> surface coverage and the Component Model migration are planned future work.

Grove provides a Wasmtime-backed WebAssembly sandbox as an alternative extension
host alongside Cocoon. This page covers the Wasmtime integration approach, the
ABI bridge between Rust host code and WASM guest modules, the planned API
surface, and what remains to be implemented.

## Wasmtime integration approach

Grove uses Wasmtime v20 as its WASM engine. The integration is structured around
Wasmtime's `Engine`, `Store`, and `Linker` types:

- **`Engine`** - shared across all extensions in a single Grove process; holds
  the JIT compilation state and module cache.
- **`Store<T>`** - one per extension instance; owns all WASM state (memory,
  tables, globals) and the host-side data (`T`) accessible from host functions.
  Per-extension resource limits (memory ceiling, fuel for CPU throttling) are
  set on the store.
- **`Linker`** - pre-populated with all host functions that extensions are
  allowed to call. A module that references an import not present in the linker
  fails instantiation rather than running with an undefined capability.

```rust
// Grove WASM runtime initialization (simplified)
let engine = Engine::default();
let mut linker: Linker<GroveHostState> = Linker::new(&engine);

// Register host functions - only these are available to WASM modules
linker.func_wrap("vscode", "workspace_readFile", host_read_file)?;
linker.func_wrap("vscode", "window_showMessage", host_show_message)?;
// ... additional explicit grants

let mut store = Store::new(&engine, GroveHostState::new(transport));
store.set_fuel(10_000_000)?; // CPU fuel limit per activation

let module = Module::from_file(&engine, extension_wasm_path)?;
let instance = linker.instantiate(&mut store, &module)?;
```

Module compilation is performed once per `.wasm` file and the compiled artifact
is cached by Wasmtime's internal module cache. Subsequent instantiations of the
same module (e.g. across editor restarts) skip compilation and use the cached
native code.

## WASM component model

Extensions target the `wasm32-wasi` ABI. Grove does not yet use the WASM
Component Model (WIT/`wasm-bindgen`-style interfaces) - the current design uses
manually registered Wasmtime host functions. Migrating to the WASM Component
Model is a planned future step that would allow auto-generating the host/guest
binding layer from an interface definition file.

Current extension ABI:

- Extensions export a `activate()` function that Grove calls after
  instantiation.
- Extensions import host functions from the `vscode` namespace (e.g.
  `vscode::workspace_readFile`).
- All values crossing the WASM boundary are serialized to linear memory using a
  simple length-prefixed encoding; complex types use `serde_json` serialized to
  UTF-8 bytes.

## ABI bridge design - Rust to WASM

The ABI bridge lives in `Source/WASM/HostBridge/`. It handles the impedance
mismatch between Rust's rich type system and WASM's flat value types (`i32`,
`i64`, `f32`, `f64`, byte pointers).

For each host function exported to WASM:

1. The WASM module calls the function with a pointer and length into its linear
   memory.
2. `HostBridge` reads the byte slice from the WASM store's memory.
3. The bytes are deserialized into a typed Rust struct.
4. The struct is dispatched through `Transport` to Mountain.
5. Mountain's response is serialized back to bytes.
6. `HostBridge` writes the response into WASM linear memory at a location the
   extension provided.
7. Control returns to the WASM module.

This pattern is repeated for every VS Code API call. The serialization overhead
is intentional: it creates a clean boundary where all data is inspectable and
auditable before leaving or entering the sandbox.

## Planned VS Code API surface

The planned initial API subset covers the capabilities most commonly used by
language servers and formatters:

| Namespace           | Planned methods                                                                         |
| :------------------ | :-------------------------------------------------------------------------------------- |
| `vscode.workspace`  | `readFile`, `writeFile`, `readDirectory`, `getConfiguration`, `onDidChangeTextDocument` |
| `vscode.window`     | `showInformationMessage`, `showErrorMessage`, `showInputBox`, `createOutputChannel`     |
| `vscode.languages`  | `registerHoverProvider`, `registerCompletionItemProvider`, `registerDiagnostics`        |
| `vscode.commands`   | `registerCommand`, `executeCommand`                                                     |
| `vscode.extensions` | `getExtension` (read-only)                                                              |

Network access (`vscode.env.openExternal`, `fetch`) is not in the initial
surface. An extension that requires network access must declare it explicitly;
Grove will prompt the user before granting the capability.

The API surface is intentionally narrower than Cocoon's full `vscode.d.ts`
coverage. Extensions that need the full API continue to use Cocoon; Grove
targets extensions that can operate within the restricted set in exchange for
stronger security guarantees.

## Security model - capability-based sandboxing

Grove's security model differs fundamentally from Cocoon's process isolation:

| Property              | Cocoon (process isolation)         | Grove (capability-based)                   |
| :-------------------- | :--------------------------------- | :----------------------------------------- |
| File system access    | Full access within Node.js process | Only file handles explicitly granted       |
| Network access        | Restricted by Mist DNS allowlist   | Not available by default; must be declared |
| Other extension state | Shared process memory              | Isolated per-store linear memory           |
| CPU throttling        | None                               | Wasmtime fuel metering per activation      |
| Memory limit          | Node.js heap limit                 | Configurable per-store ceiling             |
| Sandbox enforcement   | OS process boundary                | Hardware-enforced WASM linear memory       |

The capability grant model means that an extension's permissions are visible
before it runs. When Mountain activates an extension in Grove, it reads the
extension manifest's `capabilities` field, constructs a `Linker` that exposes
only those capabilities, and passes the configured linker to `ModuleLoader`. An
extension that attempts to call an ungrant function gets a trap at
instantiation, not a runtime error after sensitive operations have already
executed.

## Transport options

Grove communicates with Mountain through a pluggable transport selected at build
time via Cargo features:

| Cargo feature    | Transport                                     | Notes                                         |
| :--------------- | :-------------------------------------------- | :-------------------------------------------- |
| `grpc` (default) | gRPC via Mountain's Vine server on port 50052 | Standard path; same protocol as Cocoon        |
| `wasm` (default) | Direct WASM host function calls               | Used when Grove runs in-process with Mountain |
| `ipc`            | Unix domain socket                            | Enabled only on Unix targets                  |
| `all`            | All transports compiled in                    | For testing                                   |

The `Strategy` trait in `Source/Transport/Strategy.rs` abstracts over all
transports so the `HostBridge` layer has no transport-specific code.

## Mountain integration

Mountain activates Grove extensions via the `GroveService` gRPC protocol defined
in `Proto/`. The activation flow:

1. Mountain's extension scanner identifies a `.wasm` extension manifest.
2. Mountain sends `ActivateExtension(extension_id, capabilities)` to Grove.
3. Grove's `ExtensionManager` constructs the capability-gated `Linker`.
4. `ModuleLoader` compiles or loads the cached WASM module.
5. A new `Store` is created with the extension's resource limits.
6. The module is instantiated and `activate()` is called.
7. Grove reports success or failure back to Mountain.

Grove shares the same activation event semantics as Cocoon (`activationEvents`
in `package.json`) so extension manifests do not need modification to run in
either host.

## Current implementation status

| Component                                | Status                                             |
| :--------------------------------------- | :------------------------------------------------- |
| `Source/Host/ExtensionHost.rs`           | Implemented - extension discovery and lifecycle    |
| `Source/Host/ExtensionManager.rs`        | Implemented - loading and activation dispatch      |
| `Source/WASM/Runtime/`                   | Implemented - Wasmtime engine and store management |
| `Source/WASM/ModuleLoader/`              | Implemented - compilation and caching              |
| `Source/WASM/HostBridge/`                | Implemented - ABI bridge, serialization            |
| `Source/Transport/gRPCTransport.rs`      | Implemented                                        |
| `Source/Transport/IPCTransport.rs`       | Implemented                                        |
| `Source/Host/APIBridge.rs`               | Partial - core workspace and window namespaces     |
| Mountain `GroveService` handler          | Not yet wired into the default build               |
| WASM Component Model migration           | Planned                                            |
| Full `vscode.d.ts` subset                | Planned                                            |
| Extension marketplace capability prompts | Planned                                            |

Grove is activated as an optional feature: `cargo build --features grove`. It is
not compiled into the default `debug-electron` or `release` profiles.

## Building Grove

```bash
# Build Grove as a standalone binary
cd Element/Grove
cargo build --release

# Build for WASM target (extensions themselves)
rustup target add wasm32-wasi
cargo build --target wasm32-wasi --release

# Build with all transport features
cargo build --release --features all

# Enable Grove in Mountain build
cargo build -p Mountain --features grove
```
