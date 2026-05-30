---
title: "VS Code Extension Compatibility in Land"
summary:
    "How Land runs unmodified VS Code extensions, and where coverage still needs
    validation."
publishedAt: "2026-04-03"
tags: ["Extensions", "VS Code", "Compatibility"]
author: "CodeEditorLand"
readTime: 6
---

# VS Code Extension Compatibility in Land

Land's active compatibility path is `Cocoon`. `Cocoon` loads existing `VS Code`
extension entry points and provides the `vscode` API object those extensions
expect. `Mountain` scans installed extensions, reads manifests, handles local
VSIX install and uninstall routes, and notifies `Cocoon` when the extension set
changes.

That means Land can make a strong, useful claim: installed `VS Code` extensions
run unmodified through `Cocoon` when the APIs they use are implemented.

Coverage is partial: extensions that rely on unimplemented API surface will not
activate correctly. No public validation matrix across extensions and versions
exists yet.

## How Cocoon Hosts Extensions

The compatibility architecture has three layers:

### 1. The Extension Host Process

`Cocoon` is a dedicated Node.js sidecar process spawned and managed by
`Mountain`. It receives initialization data over a gRPC channel (`Vine`
protocol) and bootstraps an Effect-TS runtime that mirrors the VS Code Extension
Host environment:

- `PatchProcess` hardens the environment immediately: patches `process.exit`,
  handles uncaught exceptions, pipes logs to `Mountain`, and terminates if the
  parent process exits.
- `Effect/Bootstrap.ts` coordinates initialization stages: environment
  detection, configuration loading, gRPC connection, module interceptor setup,
  extension registry, and health checks.
- The `AppLayer` (wired via `Service/Mapping.ts`) composes all Effect-TS service
  layers into a single runnable unit.

### 2. Module Interception

When a VS Code extension calls `require('vscode')`, `Cocoon` intercepts the
module request and returns a sandboxed `vscode` API instance specific to that
extension. This happens for both CJS `require()` and ESM `import` statements.

The interceptor works at the Node.js module resolution level, before the
extension code ever sees the module. Each extension gets its own API object
wired through Effect-TS services, so one extension's API calls do not interfere
with another's.

```typescript
// Services/API/Factory/Service.ts
// Constructs the vscode API object that extensions receive
// Wires API calls through the Mountain client service for backend execution
```

### 3. Service Shims

A comprehensive set of service shims replicates the behavior of the real
`vscode.workspace`, `vscode.window`, `vscode.commands`, and other VS Code
extension APIs. Each shim is built on Effect-TS services that route privileged
calls to `Mountain` via gRPC.

The gRPC client in `Cocoon` (`Services/Mountain/gRPC/Client.ts`) provides
Effect-wrapped methods for window, workspace, command, and secret storage
operations. The gRPC server (`Services/gRPC/Server/Service.ts`) implements the
Vine protocol with bidirectional streaming for real-time event communication.

## What Is Source-Backed Today

- `Cocoon` hosts existing extension code instead of asking authors to fork or
  rewrite their extension.
- `Mountain` contains extension scanning, manifest parsing, local VSIX install
  and uninstall routes, and extension-state updates.
- `Output` keeps the `VS Code` extension scanner and offline gallery channels
  wired for sideloaded extensions.
- Core surfaces such as commands, workspace, window, terminals, webviews,
  language providers, diagnostics, output channels, and document events have
  active source paths.

## In Progress

- Marketplace browsing and install flows beyond local or sideloaded extension
  sources.
- Chat, language-model, notebook, tests, and other long-tail `VS Code` APIs.
- A public extension validation matrix that names extensions, versions,
  platforms, and the APIs they exercised.
- `vscode.lm.*`, `vscode.chat.*`, `vscode.notebook.*`, and `vscode.tests.*` are
  not implemented. Extensions using these APIs activate but the specific
  features silently no-op.

## Marketplace Integration

Land does not need to connect to the Microsoft Visual Studio Marketplace to run
installed extension code. The current source is oriented around local extension
paths and sideloaded packages. Open registry and enterprise registry flows are
in development and not yet available in the editor.

## Code Generation Pipeline

`Cocoon` includes a code generation pipeline (`Codegen/`) that walks the VS Code
extension-host source subtree and emits `IExtHost*Upstream` schemas grounded in
real upstream definitions. This reuses `Wind`'s extractor and resolver
infrastructure. The schemas ensure that the API shims in `Cocoon` stay aligned
with the actual VS Code extension-host types, reducing drift.

## Type Conversion

Type definitions used by VS Code extensions (`Range`, `Position`, `URI`,
`Dialog`, `TreeView`, `Webview`, `Task`, `WorkspaceEdit`) are serialized through
pure conversion functions in `TypeConverter/` into plain DTOs suitable for gRPC
transport. This avoids serializing rich objects across process boundaries in an
unstructured way -- every type has a documented conversion path.

## Reporting Compatibility Issues

If an extension that works in `VS Code` fails in Land, open an issue with the
extension name, version, platform, activation event, and the API that failed.
That keeps compatibility work tied to real behavior instead of broad promises.
