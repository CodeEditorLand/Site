---
title: "Troubleshooting"
section: "Support"
order: 10
description: "Common issues and their solutions when running Editor.Land on macOS."
---

# Troubleshooting

This page covers the most common issues encountered when running Editor.Land
on macOS, along with diagnosis steps and fixes. Editor.Land currently runs on
**macOS 13+** only. If you are on an older macOS version, upgrade first.

---

## Blank Screen on Launch

**Symptoms:** The window opens but shows a white or black screen with no UI.

**Diagnosis:**

Launch Land from the terminal via `cargo tauri dev` and watch the console
output for errors. WebKit or renderer errors will appear there. If you are
running a pre-built binary, open **Console.app**, filter by the Land process
name, and look for errors at or around the launch timestamp.

**Fixes:**

- Confirm you are running **macOS 13.0 or later**. Older WebKit versions do
  not support all CSS features Land's UI requires.
- If the console shows GPU-related errors, try quitting other GPU-intensive
  applications and relaunching.
- If you built from source, ensure the build completed without errors:
  ```bash
  cargo tauri build
  ```
  A partially-failed build can produce a binary that launches but renders
  nothing.

---

## Extension Not Loading

**Symptoms:** An extension appears to be installed but does not activate, or
commands it contributes do not appear in the command palette.

**Diagnosis:**

1. Check the Output panel. Select **Extension Host** from the channel dropdown
   to see activation errors and log output from Cocoon.
2. Look for activation event mismatches - if the extension declares
   `activationEvents` that Land does not fire, it will never activate.

**Fixes:**

- Check the `engines.vscode` field in the extension's `package.json`. If it
  requires a VS Code version whose API surface is not yet implemented in
  Cocoon, the extension may silently fail. See [API Reference](/Doc/api-reference)
  for the current coverage table.
- If the extension uses an API namespace listed as **Not Implemented** in the
  API Reference (`vscode.lm`, `vscode.chat`, `vscode.notebook`,
  `vscode.tests`), those calls will no-op at runtime.
- Try reinstalling the extension: remove it, restart Land, then install again.

---

## High CPU Usage

**Symptoms:** Land consumes excessive CPU even when idle.

**Diagnosis:**

Open **Activity Monitor** (macOS), filter by process name, and identify
which process is consuming CPU - the main Land process, a language server
child process, or Node.js (the Cocoon extension host).

**Fixes:**

- **Language server runaway:** Some language servers index the entire file
  system on first open. Add large directories to `Files.Exclude` in your
  settings:
  ```json
  {
    "Files.Exclude": {
      "**/node_modules": true,
      "**/target": true,
      "**/.git": true
    }
  }
  ```
- **Extension host:** Disable extensions one by one via the command palette
  to identify the offending extension. Then file an issue with the extension
  author.
- **File watcher overload:** Reduce the number of watched files by adding
  paths to `Files.WatcherExclude` in your settings.

---

## Permission Errors on macOS

**Symptoms:** Land cannot access files outside your home directory, or shows
"operation not permitted" errors when opening a project.

**Diagnosis:** macOS requires explicit user consent for file access outside
standard directories. This is enforced by the TCC (Transparency, Consent, and
Control) system regardless of file ownership.

**Fixes:**

1. Open **System Settings → Privacy & Security → Files and Folders**.
2. Find Land in the list and grant access to the directories it needs.
3. If Land does not appear in the list, try opening a folder from within Land
   using **File → Open Folder** so macOS can prompt for consent.
4. If permissions appear stuck, you can reset the TCC entry for Land. The
   bundle identifier used by Land follows the pattern `com.codeeditorland.*`
   - check the exact identifier in the built `.app` bundle's `Info.plist`
   before running any `tccutil reset` command, as using the wrong identifier
   has no effect.

---

## Getting Further Help

If none of the above resolves your issue:

1. Collect as much diagnostic information as possible: your macOS version,
   Land build date or commit SHA, and the exact steps to reproduce.
2. If you built from source, run `cargo tauri dev` and copy any error output
   from the terminal.
3. Open an issue at
   [CodeEditorLand/Land](https://github.com/CodeEditorLand/Land/issues)
   with the collected information. Clear reproduction steps are the single
   most useful thing you can include.

---

## See Also

- [Installation](/Doc/installation)
- [Configuration](/Doc/configuration)
- [API Reference](/Doc/api-reference)
