---
title: "Troubleshooting"
section: "Support"
order: 10
description:
    "Common issues and their solutions: blank screen, extension failures, high
    CPU."
---

# Troubleshooting

This page covers the most common issues encountered when running Code Editor
Land, along with diagnosis steps and fixes.

## Blank Screen on Launch

**Symptoms:** The window opens but shows a white or black screen with no UI.

**Diagnosis:**

1. Launch Land from the terminal to see error output:
    ```bash
    land --verbose
    ```
2. Check for GPU driver errors in the output.

**Fixes:**

- **macOS:** Ensure you are running macOS 13.0 or later. Older WebKit versions
  may not support required CSS features.
- **Linux:** Install WebKitGTK 4.1: `sudo apt install libwebkit2gtk-4.1-dev`.
- **All platforms:** Try disabling GPU acceleration:
    ```bash
    land --disable-gpu
    ```

## Extension Not Loading

**Symptoms:** An extension appears in the extensions panel but does not
activate.

**Diagnosis:**

1. Open the command palette and run **Developer: Show Running Extensions**.
2. Check the Output panel (select **Extension Host** from the dropdown).

**Fixes:**

- Ensure the extension is compatible with your Land version. Check the
  `engines.vscode` field in the extension's `package.json`.
- If the extension depends on Node.js APIs, verify that the SideCar Node.js
  binary is installed: `land --check-sidecar`.
- Reinstall the extension: uninstall, restart Land, then install again.

## High CPU Usage

**Symptoms:** Land consumes excessive CPU even when idle.

**Diagnosis:**

1. Open **Developer: Open Process Explorer** from the command palette.
2. Identify which process (extension host, language server, or renderer)
   consumes the most CPU.

**Fixes:**

- **Language server runaway:** Some language servers index the entire file
  system. Add large directories to `Files.Exclude`:
    ```json
    {
    	"Files.Exclude": {
    		"**/node_modules": true,
    		"**/target": true,
    		"**/.git": true
    	}
    }
    ```
- **Extension host:** Disable extensions one by one to identify the offender.
  Then file an issue with the extension author.
- **File watcher overload:** Reduce the number of watched files by configuring
  `Files.WatcherExclude`.

## Permission Errors on macOS

**Symptoms:** Land cannot access files or shows "operation not permitted"
errors.

**Diagnosis:** macOS requires explicit user consent for file access outside
standard directories.

**Fixes:**

1. Open **System Settings > Privacy & Security > Files and Folders**.
2. Grant Land access to the directories it needs.
3. If Land does not appear in the list, drag the `Land.app` bundle onto the
   Privacy pane, or reset permissions:
    ```bash
    tccutil reset All com.codeeditorland.land
    ```

## Extensions Missing After Update

**Symptoms:** Extensions disappear after updating Land.

**Fixes:**

- Verify the extensions directory has not changed. Check `LAND_EXTENSIONS`
  environment variable and the `Extensions.Directory` setting.
- If you were using `~/.vscode/extensions/`, ensure that path still exists and
  contains your extensions.

## Getting Further Help

If none of the above resolves your issue:

1. Collect logs: `land --verbose 2>&1 | tee land-debug.log`.
2. Open an issue at
   [CodeEditorLand/Land](https://github.com/CodeEditorLand/Land/issues) with the
   log file, your OS version, and steps to reproduce.

## See Also

- [Installation](/Doc/installation)
- [Configuration](/Doc/configuration)
