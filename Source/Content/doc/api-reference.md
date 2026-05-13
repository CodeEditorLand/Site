---
title: "API Reference"
section: "Development"
order: 8
description:
    "VS Code extension API coverage in Editor.Land: what works, what no-ops, and
    what is not yet implemented."
---

# API Reference

Editor.Land implements the VS Code extension API through Cocoon, the Node.js
extension host. Extensions written against `@types/vscode` compile against
Cocoon's stubs without modification. Whether they run correctly depends on which
API surfaces they use.

---

## Coverage Status

The API surface is divided into three categories:

**Implemented** - The API is active in the `debug-mountain` profile. Extensions
using it behave as expected.

**Partial** - The API is present and callable but not all methods or behaviours
are implemented. Some calls may silently no-op or return empty results.

**Not implemented** - The namespace exists in Cocoon's type stubs so extensions
compile, but the runtime calls do nothing. Extensions that depend on these APIs
activate but their features do not work.

| Namespace                           | Status          | Notes                                                                                                 |
| ----------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------- |
| `vscode.commands`                   | Implemented     | Register, execute, command palette                                                                    |
| `vscode.workspace.fs`               | Implemented     | Routes through Mountain's FS layer via Vine                                                           |
| `vscode.window.createTerminal`      | Implemented     | Routes through Mountain's pty layer via Vine                                                          |
| `vscode.debug`                      | Implemented     | DAP bridge in Mountain, routes via Vine                                                               |
| `vscode.languages`                  | Implemented     | LSP client via `vscode-languageclient`                                                                |
| `vscode.workspace.getConfiguration` | Implemented     | Reads workspace and user settings                                                                     |
| `vscode.window` (core)              | Partial         | showInformationMessage, createWebviewPanel, registerTreeDataProvider work; some view APIs unconfirmed |
| `vscode.window.createTreeView`      | Partial         | Tree data provider registration works; inline actions and welcome content unconfirmed                 |
| `vscode.tasks`                      | Partial         | Task definition reading works; full task runner execution unconfirmed                                 |
| `vscode.extensions`                 | Partial         | getExtension and activate work; some metadata fields unconfirmed                                      |
| `vscode.lm`                         | Not implemented | Language model / Copilot APIs - no-op                                                                 |
| `vscode.chat`                       | Not implemented | Chat panel APIs - no-op                                                                               |
| `vscode.notebook`                   | Not implemented | Notebook document and editor APIs - no-op                                                             |
| `vscode.tests`                      | Not implemented | Test explorer and runner APIs - no-op                                                                 |

---

## Commands

Register a command with `vscode.commands.registerCommand`:

```typescript
const Disposable = vscode.commands.registerCommand(
	"MyExtension.SayHello",
	() => {
		vscode.window.showInformationMessage("Hello from Land!");
	},
);
```

Commands declared in `package.json` under `contributes.commands` appear in the
command palette. This is one of the more reliably implemented API surfaces.

---

## Configuration

Extensions read settings through the `WorkspaceConfiguration` API:

```typescript
const Config = vscode.workspace.getConfiguration("MyExtension");
const FontSize = Config.get<number>("FontSize", 14);
```

Configuration keys are declared in `contributes.configuration` in your extension
manifest. Land validates configuration values against the JSON Schema you
provide. The specific user settings file path has not been independently
confirmed - see [Configuration](https://Editor.Land/Doc/configuration) for details.

---

## Keybindings

Declare keybindings in `contributes.keybindings`:

```json
{
	"command": "MyExtension.SayHello",
	"key": "ctrl+shift+h",
	"mac": "cmd+shift+h",
	"when": "editorTextFocus"
}
```

The `when` clause uses the same context key syntax as VS Code. Custom context
keys set via `vscode.commands.executeCommand('setContext', ...)` are supported.

---

## Tree Views

Register a tree view provider:

```typescript
vscode.window.registerTreeDataProvider(
	"MyExtension.TreeView",
	MyTreeDataProvider,
);
```

Declare the view container and view in `contributes.viewsContainers` and
`contributes.views`. Tree data provider registration routes through Cocoon's
fiber scheduler. Inline actions and welcome content are not confirmed.

---

## Webview Panels

Create HTML-based UI panels:

```typescript
const Panel = vscode.window.createWebviewPanel(
	"MyExtension.Preview",
	"Preview",
	vscode.ViewColumn.Beside,
	{ enableScripts: true },
);

Panel.webview.html = "<html><body><h1>Preview</h1></body></html>";
```

Webview panels run in a sandboxed context with a Content Security Policy. Use
`Panel.webview.postMessage()` and `Panel.webview.onDidReceiveMessage` for
bidirectional communication between the extension and the webview.

---

## Language Server Protocol

Land supports LSP servers through the `vscode-languageclient` package. Point
your extension at a language server binary and the LSP client handles
initialization, capabilities negotiation, and shutdown. This routes through
Cocoon's `vscode.languages` implementation, which is one of the more complete
API surfaces.

---

## Rust API Documentation

Generated `rustdoc` output is planned for the Rust crates listed below. The URLs
follow the pattern `https://Rust.Documentation.*.Editor.Land` - these may not
yet resolve to hosted documentation. Check the
[source repositories](https://github.com/CodeEditorLand) directly if the links
are unavailable.

| Crate           | Description                                                                                                                             | Element                           |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `Mountain`      | Tauri native kernel                                                                                                                     | [Mountain](https://Editor.Land/Doc/mountain)         |
| `Echo`          | Work-stealing task scheduler                                                                                                            | [Echo](https://Editor.Land/Doc/echo)                 |
| `Common`        | Shared IPC event type definitions                                                                                                       | [Architecture](https://Editor.Land/Doc/architecture) |
| `CommonLibrary` | Shared utility functions                                                                                                                | [Architecture](https://Editor.Land/Doc/architecture) |
| `Air`           | Background update daemon                                                                                                                | [Air](https://Editor.Land/Doc/air)                   |
| `AirLibrary`    | Air shared library                                                                                                                      | [Air](https://Editor.Land/Doc/air)                   |
| `Download`      | Binary download logic                                                                                                                   | [Air](https://Editor.Land/Doc/air)                   |
| `SideCar`       | Pre-built Node.js binaries                                                                                                              | [Architecture](https://Editor.Land/Doc/architecture) |
| `Maintain`      | Build orchestrator                                                                                                                      | [Contributing](https://Editor.Land/Doc/contributing) |
| `Grove`         | WASM extension host - WASMtime host, gRPC protocol, API surface, and transport layer implemented; primary build integration in progress | [Grove](https://Editor.Land/Doc/grove)               |

---

## See Also

- [Cocoon: Extension Host](https://Editor.Land/Doc/cocoon)
- [Extension Development](https://Editor.Land/Doc/extension-development)
- [Architecture Overview](https://Editor.Land/Doc/architecture)
- [VS Code API Documentation](https://code.visualstudio.com/api/references/vscode-api)
