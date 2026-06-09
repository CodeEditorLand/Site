---
title: "Configuration"
section: "Usage"
order: 6
description:
    "Settings, keybindings, themes, and language configuration in
    editor.land."
---

# Configuration

`editor.land` stores configuration locally in `JSON` files that support
comments (`//` and `/* */`). The exact file paths depend on the platform and
build profile. To locate the active settings file on your system, open the
command palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Windows) and search
for **Preferences: Open Settings (`JSON`)**.

---

## Settings Precedence

Land merges settings from three levels in order of increasing precedence:

1. **Default** - built-in defaults shipped with Land.
2. **User** - the user-level settings file (locate via command palette).
3. **Workspace** - a settings file in the workspace root. Land reads
   `.vscode/settings.json` for compatibility with existing `VS Code` workspaces.

---

## Setting Keys

Land uses PascalCase for setting keys (`Editor.FontSize`,
`Workbench.ColorTheme`) rather than `VS Code`'s `camelCase` (`editor.fontSize`).
Whether `VS Code`-style `camelCase` keys are automatically mapped to their
PascalCase equivalents is not confirmed in the current build. Use PascalCase
keys to be safe.

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

---

## Keybindings

Open the keybindings file via **Preferences: Open Keyboard Shortcuts (`JSON`)**
from the command palette. Each entry is a `JSON` object with `key`, `command`,
and an optional `when` clause:

```json
[
	{
		"key": "ctrl+shift+f",
		"command": "Workbench.Action.FindInFiles"
	},
	{
		"key": "ctrl+b",
		"command": "Workbench.Action.ToggleSidebarVisibility"
	},
	{
		"key": "ctrl+`",
		"command": "Workbench.Action.Terminal.ToggleTerminal"
	}
]
```

Use `cmd` instead of `ctrl` on macOS. The `when` clause uses the same context
key syntax as `VS Code` (e.g. `"when": "editorTextFocus"`).

---

## Themes

Land supports `VS Code` color themes without modification. Install a theme by
placing its `.vsix` file in the extensions directory and installing it via the
command palette (**Extensions: Install from VSIX**). The extensions panel UI for
browsing and installing themes is not yet implemented.

To create a custom theme, follow the
[`VS Code` color theme reference](https://code.visualstudio.com/api/references/theme-color)

- the token format is identical. Use the command palette to locate the themes
  directory on your system, as exact paths vary by platform and build profile.

---

## Language-Specific Settings

Language-specific overrides use a language identifier key:

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

This syntax is the same as `VS Code`'s language-specific settings.

---

## Current Limitations

- **File paths are not yet publicly documented.** The user data directory,
  extensions directory, and themes directory paths depend on the build profile
  and platform. Use the command palette to locate them rather than hardcoding
  paths.
- **`JSON` Schema validation** of unrecognised keys (producing warnings) is a
  planned feature of the `Wind` configuration service and is not confirmed as
  active in the current build.
- **Linux** is not yet a supported platform. Configuration on Linux has not been
  tested.

---

## See Also

- [Getting Started](https://editor.land/Doc/getting-started)
- [Installation](https://editor.land/Doc/installation)
- [`Wind`: Service Layer](https://editor.land/Doc/wind)
