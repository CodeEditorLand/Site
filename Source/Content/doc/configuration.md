---
title: "Configuration"
section: "Usage"
order: 1
description: "Settings, keybindings, themes, and language configuration reference."
---

# Configuration

Land stores all configuration locally in `~/.land/settings/`. Configuration
files use JSON format and support comments (`//` and `/* */`).

## Settings

Open settings with `Cmd+,` (macOS) or `Ctrl+,` (Windows/Linux). Land reads
settings from three levels, merged in order of precedence:

1. **Default** — built-in defaults shipped with Land.
2. **User** — `~/.land/settings/Settings.json`.
3. **Workspace** — `.land/settings.json` in the workspace root (or
   `.vscode/settings.json` for compatibility).

### Common Settings

```json
{
	"Editor.FontFamily": "'JetBrains Mono', monospace",
	"Editor.FontSize": 14,
	"Editor.TabSize": 4,
	"Editor.InsertSpaces": false,
	"Editor.FormatOnSave": true,
	"Editor.WordWrap": "on",
	"Editor.Minimap.Enabled": false,
	"Files.AutoSave": "afterDelay",
	"Files.AutoSaveDelay": 1000,
	"Terminal.Integrated.FontSize": 13,
	"Workbench.ColorTheme": "Default Dark+",
	"Workbench.IconTheme": "Default File Icons"
}
```

Land uses PascalCase for setting keys. VS Code-style `camelCase` keys are
accepted and mapped to their PascalCase equivalents automatically.

## Keybindings

Edit keybindings with **Preferences: Open Keyboard Shortcuts (JSON)** from the
command palette. The file is located at `~/.land/settings/Keybindings.json`:

```json
[
	{
		"key": "cmd+shift+f",
		"command": "Workbench.Action.FindInFiles"
	},
	{
		"key": "cmd+b",
		"command": "Workbench.Action.ToggleSidebarVisibility"
	},
	{
		"key": "ctrl+`",
		"command": "Workbench.Action.Terminal.ToggleTerminal"
	}
]
```

Each entry supports a `when` clause for context-dependent bindings (e.g.,
`"when": "editorTextFocus"`).

## Themes

Land supports VS Code color themes without modification. Install themes from the
extensions panel or place a `.vsix` theme file in `~/.land/extensions/`.

To create a custom theme, add a JSON file to `~/.land/themes/` following the
[VS Code color theme reference](https://code.visualstudio.com/api/references/theme-color).

## Language Configuration

Language-specific settings are nested under a language identifier:

```json
{
	"[rust]": {
		"Editor.TabSize": 4,
		"Editor.FormatOnSave": true,
		"Editor.DefaultFormatter": "rust-lang.rust-analyzer"
	},
	"[typescript]": {
		"Editor.TabSize": 4,
		"Editor.DefaultFormatter": "biomejs.biome"
	}
}
```

## JSON Schema Validation

Land validates settings files against a built-in JSON Schema. Unrecognized keys
produce a warning. Extensions can contribute additional schema entries through
`contributes.configuration` in their manifest.

## Environment Variables

Land respects the following environment variables:

| Variable          | Purpose                                     |
| ----------------- | ------------------------------------------- |
| `LAND_USER_DATA`  | Override the user data directory             |
| `LAND_EXTENSIONS` | Override the extensions directory            |
| `LAND_LOG_LEVEL`  | Set log verbosity (`error`, `warn`, `info`, `debug`) |
