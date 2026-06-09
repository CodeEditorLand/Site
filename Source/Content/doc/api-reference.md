---
title: "API Reference"
section: "Reference"
order: 1
description:
    "Pointers to generated API documentation, key source files, and the gRPC
    contract for every API surface in Land."
---

Land's API surface spans four layers: the Rust Mountain backend, the TypeScript
Cocoon extension-host shims, the Sky Monaco bridge, and the Vine gRPC contract
that ties them together. This page is a pointer document - it links to source
files and explains where generated documentation lives and how to build it
locally. No API content is duplicated here; consult the linked sources for
authoritative details.

## Rust rustdoc (Mountain)

Mountain's public API is documented inline using standard `///` doc comments.
The rustdoc output is not currently published to a static site; build it locally
with:

```bash
cd Land/Element/Mountain
cargo doc --no-deps --open
```

The `--no-deps` flag keeps build time short by skipping documentation for the 51
patched crates. Output lands in `Land/Element/Mountain/Target/doc/`.

Key crates to browse in the generated docs:

| Crate / module                                    | Purpose                                                                  |
| ------------------------------------------------- | ------------------------------------------------------------------------ |
| `Mountain::IPC::WindServiceHandlers`              | All IPC handlers callable from Sky and Cocoon                            |
| `Mountain::Environment`                           | Provider trait implementations (filesystem, terminal, config, search, …) |
| `Mountain::RPC::CocoonService`                    | gRPC server handlers for Cocoon-to-Mountain calls                        |
| `Mountain::ApplicationState`                      | Shared runtime state and all DTOs                                        |
| `Mountain::ProcessManagement::InitializationData` | `ISandboxConfiguration` and `IExtensionHostInitData` builders            |
| `Common`                                          | Shared traits and error types used by all Rust elements                  |

Source root:
[https://github.com/CodeEditorLand/Mountain/tree/Current/Source](https://github.com/CodeEditorLand/Mountain/tree/Current/Source)

## TypeScript generated types (Wind Codegen)

Wind contains a code-generation layer that emits typed service interfaces from
the Vine proto schema and the IPC channel registry. Generated files live under:

```
Land/Element/Wind/Source/Effect/Generated/
```

Each file in that directory is a `*Upstream.ts` module exporting a typed request
function. These are **generated output** - do not edit them directly. To
regenerate after a proto or channel change:

```bash
cd Land/
pnpm run prepublishOnly
```

The generator source is at:
[https://github.com/CodeEditorLand/Wind/tree/Current/Source/Codegen/Emit/EmitServiceSchema.ts](https://github.com/CodeEditorLand/Wind/tree/Current/Source/Codegen/Emit/EmitServiceSchema.ts)

The IPC channel registry that drives generation:
[https://github.com/CodeEditorLand/Wind/tree/Current/Source/IPC/Channel.ts](https://github.com/CodeEditorLand/Wind/tree/Current/Source/IPC/Channel.ts)

The matching Rust enum (kept in lockstep):
[https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Common/Source/IPC/Channel.rs](https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Common/Source/IPC/Channel.rs)

> [!IMPORTANT] `Channel.ts` and `Channel.rs` must always be kept in lockstep.
> Adding an entry to one without adding it to the other will cause IPC dispatch
> failures at runtime with no compile-time error.

## Vine.proto - the gRPC API contract

`Vine.proto` is the single authoritative definition of every RPC method and
notification that crosses the Cocoon-Mountain boundary. It lives in the Vine
submodule:

[https://github.com/CodeEditorLand/Vine/tree/Current/Proto/Vine.proto](https://github.com/CodeEditorLand/Vine/tree/Current/Proto/Vine.proto)

The proto is compiled at build time by `prost` (Rust side) and
`@grpc/proto-loader` (TypeScript side). Neither compiled output is checked in -
both are regenerated on every build.

Key service sections in `Vine.proto`:

| Service                   | Direction         | Purpose                                                      |
| ------------------------- | ----------------- | ------------------------------------------------------------ |
| `CocoonService`           | Cocoon → Mountain | Extension host requests filesystem, terminal, config, search |
| `VineService`             | Mountain → Cocoon | Notifications: document changes, extension events, lifecycle |
| `MountainVineGRPCService` | Mountain → Cocoon | Notification router for gRPC push                            |

## Key source files by API surface

### Mountain IPC handlers

All Wind-callable IPC handlers live under one directory, one file per method:

[https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers](https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers)

The main dispatcher is `mod.rs` in that directory (~2 500 lines). Atomic handler
files are grouped by domain:

```
WindServiceHandlers/
├── mod.rs                  - dispatch table and inline fast-path handlers
├── NativeHost/             - quit, reload, clipboard, dialogs, shell command
├── FileSystem/Native/      - file open/close/watch/unwatch, mkdir, delete, rename, clone
├── Terminal/               - PTY create/resize/attach/detach/revive
├── Encryption/             - AES-256-GCM encrypt/decrypt, machine-stable key
├── ExtensionHost/          - starter and debug-service handlers
├── Cocoon/                 - request, notify, extensionHostMessage bridges
├── NativeHost/Clipboard.rs - read/write text, read image, trigger paste
└── Update/                 - update service stubs
```

### Cocoon vscode.\* shims

Cocoon's hand-authored `vscode.*` namespace implementations:

[https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI](https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI)

Each subdirectory corresponds to one `vscode.*` namespace:

| Directory         | Namespace               |
| ----------------- | ----------------------- |
| `Commands/`       | `vscode.commands`       |
| `Window/`         | `vscode.window`         |
| `Workspace/`      | `vscode.workspace`      |
| `Languages/`      | `vscode.languages`      |
| `Debug/`          | `vscode.debug`          |
| `Tasks/`          | `vscode.tasks`          |
| `Scm/`            | `vscode.scm`            |
| `Authentication/` | `vscode.authentication` |
| `Extensions/`     | `vscode.extensions`     |

The API factory that assembles the `vscode` namespace object given to each
extension:
[https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/APIFactory.ts](https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/APIFactory.ts)

### Wind service interfaces

Wind's typed service interfaces for Mountain IPC calls:

[https://github.com/CodeEditorLand/Wind/tree/Current/Source/Service/TauriMainProcessService.ts](https://github.com/CodeEditorLand/Wind/tree/Current/Source/Service/TauriMainProcessService.ts)

The Output element keeps a lockstep copy:
[https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/Tauri/Main/Process/Service.ts](https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/Tauri/Main/Process/Service.ts)

### Sky bridge

The Sky bridge translates Tauri custom events and `sky://` URLs into live
workbench service calls against Monaco and VS Code's `__CEL_SERVICES__`
accessors:

[https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge.ts](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge.ts)

Bridge modules are split by domain under `Bridge/`:

```
Bridge/
├── InstallEditorAndOutput.ts   - workspace.applyEdit, save, saveAll, saveAs
├── InstallEditorOperations.ts  - apply-text-edits, model content sync
├── InstallSimpleRelays.ts      - language configure, diagnostics, various relays
├── InstallUiRequests.ts        - showMessage, showQuickPick, showInputBox
├── InstallTreeView.ts          - tree view selection / collapse / expand events
├── InstallScm.ts               - SCM provider registration and input sync
├── InstallInlineCompletions.ts - inline completion provider registration
└── InstallDebug.ts             - breakpoint gutter sync
```

## Building all documentation locally

```bash
# Rust rustdoc for Mountain
cd Land/Element/Mountain && cargo doc --no-deps --open

# TypeScript types - regenerate Wind Codegen output
cd Land/ && pnpm run prepublishOnly

# Proto - compiled automatically during the above; inspect output at:
# Land/Element/Mountain/Target/debug/build/mountain-*/out/vine_ipc.rs
```
