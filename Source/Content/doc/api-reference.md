---
title: "API Reference"
section: "Development"
order: 1
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

## Further Reading

- [Extension Development](/Doc/extension-development) — scaffold, test, and
  publish an extension.
- [VS Code API Documentation](https://code.visualstudio.com/api/references/vscode-api)
  — the upstream reference that Land implements.
