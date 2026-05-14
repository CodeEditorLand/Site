---
title: "Extension Development"
section: "Development"
order: 7
description:
    "Build and test extensions for Editor.Land using the VS Code extension
    toolchain."
---

# Extension Development

`Editor.Land` runs `VS Code` extensions through `Cocoon`, the `Node.js`
extension host. If you have built a `VS Code` extension before, the scaffolding,
structure, `TypeScript` compilation, and packaging steps are identical. This
guide covers the workflow from scaffolding to distribution, with clear notes on
what is confirmed working in Land today versus what is planned.

---

## Scaffold a New Extension

Use the Yeoman generator to create the project structure:

```bash
npm install -g yo generator-code
yo code
```

Select **New Extension (`TypeScript`)** and fill in the prompts. The generator
creates a directory with `package.json`, `tsconfig.json`, and a `src/` folder
containing an `Extension.ts` entry point. This step is entirely independent of
Land - it uses the standard `VS Code` extension scaffolding toolchain.

---

## Project Structure

```
MyExtension/
  package.json          # Manifest: commands, configuration, keybindings
  tsconfig.json         # TypeScript configuration
  src/
    Extension.ts        # activate() and deactivate() entry points
  test/
    Extension.test.ts   # Integration tests
```

The `main` field in `package.json` points to the compiled JavaScript output
(typically `out/Extension.js`). `Cocoon` reads `package.json` at activation time
to discover contributed commands, configuration, and activation events.

---

## Loading an Extension in Development

To load your extension into a running Land instance from source:

```bash
cargo tauri dev -- --extensionDevelopmentPath=/path/to/MyExtension
```

The `--extensionDevelopmentPath` flag instructs `Cocoon` to load the extension
at the specified path in addition to any normally discovered extensions. Whether
this flag is fully wired through `Tauri`'s CLI argument passing to `Cocoon` has
not been independently confirmed. If the flag does not take effect, place the
extension directory in the location `Cocoon` discovers extensions from and
restart the editor.

For `TypeScript` changes to take effect, run `tsc --watch` in a separate
terminal alongside `cargo tauri dev`.

---

## Testing

**Unit tests** that do not require the editor runtime can use any test runner
directly:

```bash
pnpx vitest
# or
node --test
```

This is the recommended approach for testing pure extension logic (parsers,
formatters, data transformations).

**Integration tests** that require the editor runtime use
`@vscode/test-electron` in the `VS Code` ecosystem. Using this package with Land
requires configuring it to point at Land's binary rather than `VS Code`'s
`Electron` binary - this configuration is not yet documented for Land
specifically. Until it is, use unit tests for logic and manual testing in the
development build for editor integration.

---

## Package

Bundle your extension into a `.vsix` file for distribution:

```bash
npm install -g @vscode/vsce
vsce package
```

This produces `MyExtension-0.0.1.vsix`. The `.vsix` format is the same as VS
Code's. An extension packaged this way can be installed in Land manually via the
command palette (**Extensions: Install from VSIX**), subject to that command
being available in the current build.

---

## Distribution and Publishing

There is no marketplace or extension registry integration in Land today. The
extensions panel UI and Open VSX Registry browsing are not yet implemented.

Distribution options today:

- **Share the `.vsix` file directly** - users install it via the command palette
  or by placing it in the extensions directory.
- **Publish to Open VSX** - the Open VSX Registry
  ([open-vsx.org](https://open-vsx.org)) is the planned default registry for
  Land. Publishing there now means your extension is available when marketplace
  integration is implemented. The publish workflow:
    ```bash
    npx ovsx publish MyExtension-0.0.1.vsix -p YOUR_TOKEN
    ```
    Publishing to Open VSX does not make the extension available to Land users
    through any in-editor browser today - there is no in-editor extension
    browser in the current build.

---

## API Coverage

The following `API` surfaces are implemented in `Cocoon` and work reliably for
extension use today:

- `vscode.commands` - register, execute, command palette
- `vscode.workspace.fs` - file read/write via `Mountain`'s FS layer
- `vscode.window.createTerminal` - pty via `Mountain`
- `vscode.debug` - DAP bridge via `Mountain`
- `vscode.languages` - LSP client via `vscode-languageclient`
- `vscode.workspace.getConfiguration` - settings read

The following are **not implemented** - extensions using them compile but their
features silently no-op at runtime:

- `vscode.lm.*` - language model / Copilot
- `vscode.chat.*` - chat panel
- `vscode.notebook.*` - notebook documents and editors
- `vscode.tests.*` - test explorer and runner

See [`API` Reference](https://Editor.Land/Doc/api-reference) for the full
coverage table.

---

## See Also

- [`API` Reference](https://Editor.Land/Doc/api-reference)
- [`Cocoon`: Extension Host](https://Editor.Land/Doc/cocoon)
- [Contributing](https://Editor.Land/Doc/contributing)
