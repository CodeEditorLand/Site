---
title: "Quickstart"
section: "Start"
order: 3
description: "Your first five minutes with Code Editor Land."
---

# Quickstart

This guide walks you through the first five minutes after installing Land: open
a project, install extensions, configure settings, and run a task.

## Open a Project

Launch Land and use **File > Open Folder** (or press `Cmd+O` on macOS,
`Ctrl+O` on Windows/Linux) to open your project directory. Land loads the
workspace and indexes files for search and navigation.

If you have an existing `.vscode/` directory with workspace settings, Land reads
it automatically.

## Install Extensions

Open the Extensions panel from the sidebar (or press `Cmd+Shift+X` /
`Ctrl+Shift+X`). Search for the extensions you need — Land uses the
[Open VSX Registry](https://open-vsx.org) by default.

If you already have VS Code extensions installed in `~/.vscode/extensions/`,
Land detects them automatically.

To install a `.vsix` file manually, open the command palette (`Cmd+Shift+P` /
`Ctrl+Shift+P`) and run **Extensions: Install from VSIX**.

## Configure Settings

Open settings with `Cmd+,` / `Ctrl+,`. Land stores configuration in
`~/.land/settings/Settings.json`. The format is identical to VS Code's
`settings.json`:

```json
{
	"Editor.FontSize": 14,
	"Editor.TabSize": 4,
	"Editor.FormatOnSave": true,
	"Workbench.ColorTheme": "Default Dark+"
}
```

Settings follow PascalCase naming. VS Code-style `camelCase` keys are accepted
and mapped automatically.

## Run a Task

Open the command palette and run **Tasks: Run Task**. Land reads task definitions
from `.vscode/tasks.json`:

```json
{
	"version": "2.0.0",
	"tasks": [
		{
			"label": "Build",
			"type": "shell",
			"command": "cargo build --release",
			"group": "build"
		}
	]
}
```

The task output appears in the integrated terminal panel at the bottom of the
window.

## Next Steps

- Read the [Configuration](/Doc/configuration) guide for detailed settings
  reference.
- Explore the [Extension Development](/Doc/extension-development) guide to build
  your own extensions.
- See the [Architecture Overview](/Doc/architecture) to understand how Land is
  structured internally.
