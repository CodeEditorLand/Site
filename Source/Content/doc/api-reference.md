---
title: "API Reference"
section: "Development"
order: 8
description:
    "Overview of the Land extension API: commands, configuration, views, and
    webviews."
---

# API Reference

Land implements the VS Code extension API with full type compatibility.
Extensions written against `@types/vscode` compile and run without modification.
This page provides an overview of the major API surfaces.

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
command palette automatically.

## Configuration

Extensions read and write settings through the `WorkspaceConfiguration` API:

```typescript
const Config = vscode.workspace.getConfiguration("MyExtension");
const FontSize = Config.get<number>("FontSize", 14);
```

Configuration keys are declared in `contributes.configuration` in your extension
manifest. Land validates configuration values against the JSON Schema you
provide.

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

The `when` clause supports the same context keys as VS Code, including
`editorLangId`, `resourceScheme`, and custom context keys set by your extension.

## Tree Views

Register a tree view provider to add a custom panel in the sidebar:

```typescript
vscode.window.registerTreeDataProvider(
	"MyExtension.TreeView",
	MyTreeDataProvider,
);
```

Declare the view container and view in `contributes.viewsContainers` and
`contributes.views`.

## Webview Panels

Create rich HTML-based UI panels:

```typescript
const Panel = vscode.window.createWebviewPanel(
	"MyExtension.Preview",
	"Preview",
	vscode.ViewColumn.Beside,
	{ enableScripts: true },
);

Panel.webview.html = "<html><body><h1>Preview</h1></body></html>";
```

Webview panels run in a sandboxed iframe with a Content Security Policy. Use
`Panel.webview.postMessage()` and `Panel.webview.onDidReceiveMessage` for
bidirectional communication.

## Language Server Protocol

Land supports LSP servers out of the box through the `vscode-languageclient`
package. Point your extension at a language server binary and the LSP client
handles initialization, capabilities negotiation, and shutdown automatically.

## Rust API Documentation

Generated `rustdoc` output for the Rust crates is hosted on Cloudflare Pages:

- [Mountain Crates](https://rust-documentation-mountain-land.pages.dev) —
  Mountain, Echo, Common, CommonLibrary, Air, AirLibrary, SideCar, Download
- [Rest Crates](https://rust-documentation-rest-land.pages.dev) —
  Rest bundler documentation
- [Maintain Crates](https://rust-documentation-maintain-land.pages.dev) —
  CI/CD and maintenance tooling

### Crate Index

| Crate | Description | Element |
|---|---|---|
| `Mountain` | Tauri native backend | [Architecture](/Doc/architecture) |
| `Echo` | Work-stealing task executor | [Architecture](/Doc/architecture) |
| `Common` | Abstract traits and DTOs | [Architecture](/Doc/architecture) |
| `CommonLibrary` | Shared utility functions | [Architecture](/Doc/architecture) |
| `Air` | Background daemon | [Local-First Protocol](/Doc/local-first-protocol) |
| `AirLibrary` | Air shared library | [Local-First Protocol](/Doc/local-first-protocol) |
| `Download` | Binary download logic | [Local-First Protocol](/Doc/local-first-protocol) |
| `SideCar` | Node.js binary management | [Architecture](/Doc/architecture) |
| `Maintain` | CI/CD scripts | [Contributing](/Doc/contributing) |
| `grove` | WASM extension host | [Extension Development](/Doc/extension-development) |

## See Also

- [Architecture Overview](/Doc/architecture)
- [Extension Development](/Doc/extension-development)

## Further Reading

- [VS Code API Documentation](https://code.visualstudio.com/api/references/vscode-api)
  — the upstream reference that Land implements.
