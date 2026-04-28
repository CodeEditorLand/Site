---
title: "Quickstart"
section: "Start"
order: 3
description: "What you can do after a successful source build on macOS today."
---

# Quickstart

This guide describes what is available after a successful `cargo tauri dev`
build on macOS. It separates what is confirmed working from what is designed
but not yet confirmed, so you know what to expect rather than what to hope for.

---

## After the Editor Opens

A successful build opens a native macOS window with the workbench UI rendered
in WKWebView. You should see:

- The editor surface (Monaco or equivalent) in the main area.
- A status bar at the bottom of the window.
- An activity bar on the left with sidebar icons.
- A command palette accessible via `Cmd+Shift+P`.

If the window opens but is blank or shows an error, the most common cause is
a missing or failed submodule. Run `git submodule update --init --recursive`
from the Land root and rebuild.

---

## Opening a Project

**File > Open Folder** or `Cmd+O` opens a directory as a workspace. This
routes through Mountain's file system layer via Tauri IPC.

If you have an existing `.vscode/` directory with workspace settings, Land
is designed to read it. Whether all settings keys are correctly mapped to
Land's configuration system is not fully confirmed — see
[Configuration](/Doc/configuration) for what is verified.

---

## Extensions

Cocoon activates extensions at startup. The following is confirmed:

- Extensions present on disk activate through Cocoon's fiber scheduler.
- Extensions using standard `vscode.*` file system, terminal, language server,
  and debug adapter APIs work if those APIs are implemented in Cocoon.
- A `.vsix` file can be installed manually. Open the command palette
  (`Cmd+Shift+P`) and run **Extensions: Install from VSIX** if that command
  is available in the current build.

The following is **not yet available**:

- An Extensions panel with browsing and search UI.
- Marketplace or Open VSX Registry integration. There is no network
  extension browser in the current build.
- Automatic detection of extensions from `~/.vscode/extensions/` has not
  been independently confirmed as matching VS Code's discovery path exactly.

If an extension activates but its features do not work, check the
**Output** panel (command palette → **View: Toggle Output**) and select
the extension's output channel. Activation errors and API no-ops appear there.

---

## Settings

Land has a configuration system with PascalCase key naming
(e.g. `Editor.FontSize`, `Workbench.ColorTheme`). The specific file path where
settings are stored (`~/.land/settings/Settings.json` or elsewhere) has not
been independently verified in the current build. Open the command palette and
search for **Preferences: Open Settings** to locate the active settings file.

The settings format is JSON, compatible with VS Code's `settings.json`
structure. Whether VS Code-style `camelCase` keys are automatically mapped to
Land's PascalCase equivalents is not confirmed.

---

## Terminal

The integrated terminal is backed by Mountain's pty layer. `Cmd+`` opens a
new terminal panel. This routes a spawn call through Vine gRPC to Mountain,
which creates a native pty. The terminal is one of the more reliably working
features because it maps directly to verified Vine service definitions.

---

## Tasks

Land is designed to read task definitions from `.vscode/tasks.json`. The
`vscode.tasks.*` API in Cocoon is partially implemented. Whether
**Tasks: Run Task** from the command palette works end-to-end in the current
build is not confirmed. The `.vscode/tasks.json` format itself is standard
and will be compatible when task execution is complete:

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

## Known API Gaps

Extensions that use the following APIs activate but their specific features
silently no-op:

- `vscode.lm.*` — language model / Copilot
- `vscode.chat.*` — chat panel
- `vscode.notebook.*` — notebook UI
- `vscode.tests.*` — test explorer

See [Cocoon](/Doc/cocoon) for the full API coverage table.

---

## See Also

- [Getting Started](/Doc/getting-started)
- [Installation](/Doc/installation)
- [Configuration](/Doc/configuration)
- [Cocoon: Extension Host](/Doc/cocoon)
- [Architecture Overview](/Doc/architecture)
