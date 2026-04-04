---
title: "Extension Development"
section: "Development"
order: 7
description: "Build, test, and publish extensions for Code Editor Land."
---

# Extension Development

Land runs VS Code extensions natively. If you have built a VS Code extension
before, you already know how to build one for Land. This guide covers the
workflow from scaffolding to publishing.

## Scaffold a New Extension

Use the Yeoman generator to create the project structure:

```bash
npm install -g yo generator-code
yo code
```

Select **New Extension (TypeScript)** and fill in the prompts. The generator
creates a directory with `package.json`, `tsconfig.json`, and a `src/` folder
containing an `Extension.ts` entry point.

## Project Structure

```
MyExtension/
	package.json          # Manifest: commands, configuration, keybindings
	tsconfig.json         # TypeScript configuration
	src/
		Extension.ts      # activate() and deactivate() entry points
	test/
		Extension.test.ts # Integration tests
```

The `main` field in `package.json` points to the compiled JavaScript output
(typically `out/Extension.js`).

## Develop

Run Land in extension development mode:

```bash
cargo tauri dev -- --extensionDevelopmentPath=/path/to/MyExtension
```

This launches Land with your extension loaded from source. Changes to TypeScript
files recompile on save if you run `tsc --watch` in a separate terminal.

## Test

Land supports the same extension testing framework as VS Code. Install
`@vscode/test-electron` (which also works with Land) and run:

```bash
pnpm test
```

For unit tests that do not require the editor runtime, use any test runner
(Vitest, Jest, or Node's built-in test runner) directly.

## Package

Bundle your extension into a `.vsix` file:

```bash
npm install -g @vscode/vsce
vsce package
```

This produces a `MyExtension-0.0.1.vsix` file ready for distribution.

## Publish

Land uses the [Open VSX Registry](https://open-vsx.org) as its default
marketplace. Create an account, generate a namespace token, and publish:

```bash
npx ovsx publish MyExtension-0.0.1.vsix -p YOUR_TOKEN
```

Your extension becomes available to all Land users through the extensions panel.

## VS Code API Compatibility

Land implements the VS Code extension API through the Cocoon element. The
following API surfaces are fully supported:

- `vscode.commands`
- `vscode.window` (information messages, quick picks, tree views, webviews)
- `vscode.workspace` (configuration, file watchers, text documents)
- `vscode.languages` (diagnostics, completions, hover, code actions)
- `vscode.debug` (breakpoints, stepping, variable inspection)

If you encounter an API that behaves differently from VS Code, file an issue at
[CodeEditorLand/Cocoon](https://github.com/CodeEditorLand/Cocoon).

## See Also

- [API Reference](/Doc/api-reference)
- [Contributing](/Doc/contributing)
