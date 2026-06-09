---
title: "Troubleshooting"
section: "Support"
order: 10
description:
    "Common issues and their solutions when running editor.land on macOS
    or Windows."
---

# Troubleshooting

This page covers the most common issues encountered when running
`editor.land` on **macOS 13+** and **Windows 10/11**, along with
diagnosis steps and fixes.

---

## Blank Screen on Launch

**Symptoms:** The window opens but shows a white or black screen with no UI.

**Diagnosis on macOS:**

Launch Land from the terminal via `cargo tauri dev` and watch the console output
for errors. WebKit or renderer errors will appear there. If you are running a
pre-built binary, open **Console.app**, filter by the Land process name, and
look for errors at or around the launch timestamp.

**Diagnosis on Windows:**

Launch via `cargo tauri dev` in a terminal window. `WebView2` errors are written
to standard output. If you are running a pre-built binary, open **Event
Viewer**, navigate to **Windows Logs → Application**, and filter for the Land
process name.

**Fixes:**

- **macOS:** Confirm you are running **macOS 13.0 or later**. Older WebKit
  versions do not support all CSS features Land's UI requires.
- **Windows:** Confirm the **`WebView2` Runtime** is installed. Download it from
  [microsoft.com/edge/webview2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)
  if missing. The Evergreen Bootstrapper is the simplest install option.
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

1. Check the `Output` panel. Select **Extension Host** from the channel dropdown
   to see activation errors and log output from `Cocoon`.
2. Look for activation event mismatches - if the extension declares
   `activationEvents` that Land does not fire, it will never activate.

**Fixes:**

- Check the `engines.vscode` field in the extension's `package.json`. If it
  requires a `VS Code` version whose `API` surface is not yet implemented in
  `Cocoon`, the extension may silently fail. See
  [`API` Reference](https://editor.land/Doc/api-reference) for the
  current coverage table.
- If the extension uses an `API` namespace listed as **Not Implemented** in the
  `API` Reference (`vscode.lm`, `vscode.chat`, `vscode.notebook`,
  `vscode.tests`), those calls will no-op at runtime.
- Try reinstalling the extension: remove it, restart Land, then install again.

---

## High CPU Usage

**Symptoms:** Land consumes excessive CPU even when idle.

**Diagnosis:**

Open **Activity Monitor** on macOS or **Task Manager** on Windows, filter by
process name, and identify which process is consuming CPU - the main Land
process, a language server child process, or `Node.js` (the `Cocoon` extension
host).

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
- **Extension host:** Disable extensions one by one via the command palette to
  identify the offending extension. Then file an issue with the extension
  author.
- **File watcher overload:** Reduce the number of watched files by adding paths
  to `Files.WatcherExclude` in your settings.

---

## Permission Errors

**Symptoms:** Land cannot access files, or shows "operation not permitted" /
"access denied" errors when opening a project.

### macOS

macOS requires explicit user consent for file access outside standard
directories, enforced by the TCC (Transparency, Consent, and Control) system
regardless of file ownership.

1. Open **System Settings → Privacy & Security → Files and Folders**.
2. Find Land in the list and grant access to the directories it needs.
3. If Land does not appear, try opening a folder from within Land using **File →
   Open Folder** so macOS can prompt for consent.
4. If permissions appear stuck, you can reset the TCC entry. The bundle
   identifier follows the pattern `com.codeeditorland.*` - check the exact
   identifier in the built `.app` bundle's `Info.plist` before running any
   `tccutil reset` command.

### Windows

- Ensure the directory you are opening is not under a path blocked by **Windows
  Defender Controlled Folder Access**. If it is, add Land as an allowed
  application in **Windows Security → Virus & threat protection → Ransomware
  protection**.
- Verify NTFS permissions on the target directory. Right-click the folder,
  select **Properties → Security**, and confirm your user account has Read and
  Write permissions.
- If running a dev build, ensure you launched the terminal as your normal user
  (not as Administrator), as some paths behave differently under elevated
  contexts.

---

## Getting Further Help

If none of the above resolves your issue:

1. Collect diagnostic information: your OS version (macOS version or Windows
   version and build number), Land build date or commit SHA, and the exact steps
   to reproduce.
2. If you built from source, run `cargo tauri dev` and copy any error output
   from the terminal.
3. Open an issue at
   [CodeEditorLand/Land](https://github.com/CodeEditorLand/Land/issues) with the
   collected information. Clear reproduction steps are the single most useful
   thing you can include.

---

## See Also

- [Installation](https://editor.land/Doc/installation)
- [Getting Started](https://editor.land/Doc/getting-started)
- [Configuration](https://editor.land/Doc/configuration)
- [`API` Reference](https://editor.land/Doc/api-reference)
