---
title: "Cocoon"
section: "Elements"
order: 1
description:
    "The Node.js extension host sidecar for Land. Runs VS Code extensions
    unmodified in a supervised Node.js process, constructs a per-extension
    vscode API shim via Effect-TS layers, and communicates with Mountain over
    the Vine gRPC protocol for native operations."
---

Cocoon is the `Node.js` extension host sidecar for `Land`. We run VS Code
extensions in a supervised `Node.js` process and provide a `vscode` API shim
via `Effect-TS`. That shim translates extension API calls into declarative
`Effect`s. `Effect`s are either handled in-process or dispatched to `Mountain`
via `gRPC` for native execution.

## Overview 📋

`Cocoon` is a `TypeScript` application built with `Effect-TS`.

- We replicate the VS Code Extension Host API.
- We communicate with `Mountain` via `gRPC` (`Vine` protocol) on port 50052.
- We are spawned and supervised by `Mountain`'s `ProcessManagement` module.

| Attribute    | Value                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| Language     | `TypeScript` (`Effect-TS` v3.21)                                                                                    |
| Runtime      | `Node.js` (managed by `SideCar`)                                                                                    |
| IPC          | `gRPC` (`Vine` protocol)                                                                                            |
| Dependencies | `effect`, `@effect/platform`, `@effect/platform-node`, `@grpc/grpc-js`, `@codeeditorland/output`, `google-protobuf` |
| Managed by   | `Mountain` `ProcessManagement/CocoonManagement.rs`                                                                  |

## Architecture 🏗️

### Module Map 🗺️

| Path                                            | Purpose                                        |
| ----------------------------------------------- | ---------------------------------------------- |
| `Source/Bootstrap/Implementation/CocoonMain.ts` | Entry point; initialization prelude            |
| `Source/PatchProcess/`                          | Process hardening, signal handling, log piping |
| `Source/Core/ExtensionHost.ts`                  | Extension activation and lifecycle             |
| `Source/Core/RequireInterceptor.ts`             | Require() patching for VS Code module loading  |
| `Source/Core/ApiFactory.ts`                     | Constructs vscode.\* API objects per extension |
| `Source/Services/Commands.ts`                   | Command registration and execution             |
| `Source/Services/Window.ts`                     | Window and editor management                   |
| `Source/Services/Workspace.ts`                  | Workspace and file system operations           |
| `Source/Services/Configuration.ts`              | Configuration read/write                       |
| `Source/Services/gRPC/Client.ts`                | gRPC client for Mountain communication         |
| `Source/ModuleInterceptor/`                     | ESM and CommonJS module interception           |
| `Source/TypeConverter/`                         | Type conversion between extensions and gRPC    |
| `Source/Telemetry/`                             | PostHog + OTLP telemetry                       |
| `Source/IPC/`                                   | Internal message channel system                |
| `Source/WebviewPanel/`                          | Webview panel lifecycle management             |
| `Source/Generated/`                             | Proto-generated TypeScript types               |

## Startup Sequence 🚀

```
1. Node.js process starts (bootstrap-fork.js)
2. PatchProcess/index.ts pipes logs, handles SIGTERM/SIGINT,
   monitors parent process
3. IpcProvider starts gRPC client, connects to Mountain on
   port 50052, sends $initialHandshake, waits for init request
4. globalThis.__LandTiers populated from esbuild identifiers,
   environment variables, or hard-coded defaults
5. RequireInterceptor patches require() for VS Code bundle
   loading, maps electron-less requires to Tauri equivalents
6. Mountain sends Initialize gRPC request with InitData
   (workspace, manifests, configuration snapshot)
7. InitDataLayer created from payload
8. FullAppInitialization Effect resolves ExtensionHostProvider
   and activates startup extensions
```

## VS Code API Shim 📦

We construct VS Code API objects for each extension via `ApiFactory.ts`.

### API Namespace Providers 📋

| Namespace             | Provider            | Track                       |
| --------------------- | ------------------- | --------------------------- |
| `vscode.commands`     | CommandsProvider    | A + S (Stock + Sky-direct)  |
| `vscode.window`       | WindowProvider      | A (Stock Node)              |
| `vscode.workspace`    | WorkspaceProvider   | A + B (Stock + Rust-native) |
| `vscode.languages`    | LanguagesProvider   | A (Stock Node)              |
| `vscode.env`          | EnvironmentProvider | A (Stock Node)              |
| `vscode.extensions`   | ExtensionsProvider  | A (Stock Node)              |
| `vscode.workspace.fs` | FileSystemProvider  | B (Rust-native via gRPC)    |
| `vscode.tasks`        | TasksProvider       | A (Stock Node)              |
| `vscode.debug`        | DebugProvider       | A + B                       |
| `vscode.tests`        | TestsProvider       | A (Stock Node)              |
| `vscode.Notebook*`    | NotebookProvider    | A (Stock Node)              |
| `vscode.WebviewPanel` | WebviewProvider     | B (Mountain-backed)         |

## Service Providers 🔌

Each service is an `Effect-TS` `Layer`:

| Service               | Module                      | Key Methods                                                                             |
| --------------------- | --------------------------- | --------------------------------------------------------------------------------------- |
| CommandsProvider      | `Services/Commands.ts`      | `registerCommand`, `executeCommand`, `getCommands`                                      |
| WindowProvider        | `Services/Window.ts`        | `createWebviewPanel`, `showTextDocument`, `activeTextEditor`, `showInformationMessage`  |
| WorkspaceProvider     | `Services/Workspace.ts`     | `workspaceFolders`, `openTextDocument`, `findFiles`, `applyEdit`, `getConfiguration`    |
| LanguagesProvider     | `Services/Language/`        | `registerHoverProvider`, `registerCompletionProvider`, `registerDefinitionProvider`     |
| ConfigurationProvider | `Services/Configuration.ts` | `get`, `has`, `inspect`, `update`, `onDidChange`                                        |
| WebviewProvider       | `Services/WebviewPanel/`    | `createWebviewPanel`, `postMessage`, `onDidReceiveMessage`                              |
| FileSystemProvider    | `Services/File/`            | `readFile`, `writeFile`, `stat`, `readDirectory`, `createDirectory`, `delete`, `rename` |

## gRPC Communication 🌐

We communicate with `Mountain` via the `Vine` `gRPC` protocol.

| Feature      | Implementation                                |
| ------------ | --------------------------------------------- |
| Connection   | Unary gRPC calls + bidirectional streaming    |
| Heartbeat    | 5-second interval via `Heartbeat` RPC         |
| Reconnection | Automatic on disconnect (exponential backoff) |
| Timeout      | 30-second request timeout                     |
| Backpressure | gRPC flow control                             |

## RequireInterceptor 🪝

The `RequireInterceptor` patches `Node.js`'s `require()` to enable VS Code
module loading.

### Interception Rules 📋

| Module Pattern            | Replacement                        | Behavior                                |
| ------------------------- | ---------------------------------- | --------------------------------------- |
| `electron`                | (empty stub)                       | No-op module with expected method stubs |
| `original-fs`             | `fs`                               | Redirect to Node.js standard library    |
| `keytar`                  | Custom stub                        | OS keychain via Mountain gRPC           |
| `spdlog`                  | Custom stub                        | No-op logging                           |
| `vscode-windows-registry` | Custom stub                        | No-op (macOS-only)                      |
| `./extHost*.js`           | Load from `@codeeditorland/output` | VS Code stock source                    |
| `./mainThread*.js`        | Load from `@codeeditorland/output` | VS Code stock source                    |
| `vscode`                  | `ApiFactory` construct             | Extension-specific API surface          |

## Extension Lifecycle 🔄

```
1. Mountain scans extension directories, sends manifests in InitData
2. RequireInterceptor loads extension's main module, calls activate()
3. Extension registers commands, providers via vscode.* API calls
4. API calls dispatch through providers -- in-process (Track A)
   or via gRPC to Mountain (Track B)
5. Mountain sends DeactivateExtension request, subscriptions
   disposed, module unloaded
```

## Dual-Track Routing 🛤️

| Track               | Implementation                   | Latency    | When Used                                  |
| ------------------- | -------------------------------- | ---------- | ------------------------------------------ |
| **A - Stock Node**  | Unmodified VS Code `extHost*.ts` | In-process | Default for all APIs                       |
| **B - Rust Native** | gRPC `ActionEffect` to Mountain  | ~1ms       | I/O-heavy APIs (fs, terminal, search, git) |

### Track Distribution by API 📊

| API                             | Default Track | Rationale                       |
| ------------------------------- | ------------- | ------------------------------- |
| `commands.registerCommand`      | A             | In-process bookkeeping          |
| `commands.executeCommand`       | A             | In-process dispatch             |
| `window.showInformationMessage` | A             | In-process dialog               |
| `workspace.openTextDocument`    | A             | Content in memory               |
| `workspace.fs.readFile`         | B             | Native file I/O (faster)        |
| `workspace.findFiles`           | B             | Native search (ripgrep)         |
| `window.createWebviewPanel`     | B             | Mountain owns webview lifecycle |
| `env.clipboard`                 | B             | Native clipboard access         |

## Related Documentation 📖

- [Mountain](https://Editor.Land/Doc/mountain) - `gRPC` server and `ProcessManagement`
- [Wind](https://Editor.Land/Doc/wind) - Frontend service layer (parallel API surface)
- [Output](https://Editor.Land/Doc/output) - Compiled platform code consumer
- [Vine](https://Editor.Land/Doc/vine) - `gRPC` protocol definitions
- [Polyfills](https://Editor.Land/Doc/polyfills) - Initialization prelude
- [EditorCore](https://Editor.Land/Doc/editor-core) - VS Code API coverage strategy

## Funding 💎

**Project Maintainers:** Source Open
([Source/Open@Editor.Land](mailto:Source/Open@Editor.Land)) |
[GitHub Repository](https://github.com/CodeEditorLand/Cocoon) |
[Report an Issue](https://github.com/CodeEditorLand/Cocoon/issues)
