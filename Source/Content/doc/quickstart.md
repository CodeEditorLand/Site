---
title: "Quickstart"
section: "Start"
order: 3
description:
    "What you can do after a successful source build on macOS or Windows."
---

# Quickstart

This guide describes what is available after a successful `cargo tauri dev`
build. It covers macOS and Windows, both of which produce a working editor from
source today.

---

## After the Editor Opens

A successful build opens a native window with the `workbench` UI - `WKWebView`
on macOS, `WebView2` on Windows. You should see:

- The editor surface (Monaco) in the main area.
- A status bar at the bottom of the window.
- An activity bar on the left with sidebar icons.
- A command palette accessible via `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P`
  (Windows).

If the window opens but is blank or shows an error, the most common cause is a
missing or failed submodule. Run `git submodule update --init --recursive` from
the Land root and rebuild.

---

## Opening a Project

**File > Open Folder** or `Cmd+O` / `Ctrl+O` opens a directory as a workspace.
This routes through `Mountain`'s file system layer via `Tauri` `IPC`.

If you have an existing `.vscode/` directory with workspace settings, Land reads
it. See [Configuration](https://editor.land/Doc/configuration) for
details on supported configuration keys.

---

## Extensions

`Cocoon` activates extensions at startup. The following is confirmed working:

- Extensions present on disk activate through `Cocoon`'s fiber scheduler.
- Extensions using standard `vscode.*` file system, terminal, language server,
  and debug adapter `APIs` work for those `APIs` implemented in `Cocoon`.
- A `.vsix` file can be installed manually. Open the command palette
  (`Cmd+Shift+P` / `Ctrl+Shift+P`) and run **Extensions: Install from VSIX**.

The following is **in progress**:

- An Extensions panel with browsing and search UI.
- Marketplace or Open VSX Registry integration.

If an extension activates but its features do not respond, check the
**`Output`** panel (command palette → **View: Toggle `Output`**) and select the
extension's output channel. Activation errors appear there.

---

## Settings

Land has a fully implemented configuration system backed by `Mountain`'s
`ConfigurationState` - a thread-safe, merged store covering both global and
workspace scopes. It supports dotted-path key access (e.g. `Editor.FontSize`,
`Workbench.ColorTheme`) with nested object writes handled by
`MergedConfigurationStateDTO`. Memento storage for crash recovery is also active
for both global and workspace contexts.

Open the command palette and search for **Preferences: Open Settings** to locate
and edit the active settings file. The settings format is `JSON`, compatible
with `VS Code`'s `settings.json` structure.

---

## Terminal

The integrated terminal is backed by `Mountain`'s pty layer. Open it with
`` Cmd+` `` (macOS) or `` Ctrl+` `` (Windows). This routes a spawn call through
`Vine` `gRPC` to `Mountain`, which creates a native pty. The terminal is one of
the most reliable features in the current build, mapping directly to verified
`Vine` service definitions.

---

## Tasks

Land reads task definitions from `.vscode/tasks.json`. Use **Tasks: Run Task**
from the command palette to run configured tasks. The standard
`.vscode/tasks.json` format is supported:

```json
{
	"version": "2.0.0",
	"tasks": [
		{
			"label": "Build",
			"type": "shell",
			"command": "cargo build",
			"group": "build"
		}
	]
}
```

---

## Extension API Notes

The vast majority of `vscode.*` `APIs` covering file system, terminal, language
server protocol, diagnostics, status bar, tree views, custom editors, and
webview panels are routed and active. The following `APIs` have stub
implementations - they allow extensions that declare them to activate without
crashing, but the underlying features are not yet wired to a backend:

- `vscode.lm.*` - language model / Copilot
- `vscode.chat.*` - chat panel
- `vscode.notebook.*` - notebook UI
- `vscode.tests.*` - test explorer

See [`Cocoon`](https://editor.land/Doc/cocoon) for the full `API`
coverage table.

---

## See Also

- [Getting Started](https://editor.land/Doc/getting-started)
- [Installation](https://editor.land/Doc/installation)
- [Configuration](https://editor.land/Doc/configuration)
- [`Cocoon`: Extension Host](https://editor.land/Doc/cocoon)
- [Architecture Overview](https://editor.land/Doc/architecture)
