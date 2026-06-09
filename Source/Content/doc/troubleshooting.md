---
title: "Troubleshooting"
section: "Development"
order: 6
description:
    "Common build, startup, and runtime issues with Land and how to resolve
    them."
---

This page covers the most frequently encountered problems when building,
running, or developing against Land. Each entry describes the symptom, the root
cause, and the specific fix. For issues not listed here, check the FIDDEE.log in
`<app-data>/logs/` and open a GitHub issue with the log contents attached.

## Build Issues

### npm install stalls during VS Code source step

**Symptom**: Running `npm install` inside
`Dependency/Microsoft/Dependency/Editor` hangs indefinitely, typically after
resolving most packages.

**Cause**: The VS Code source tree includes `electron` (~200 MB) and
`@playwright/browser-chromium` (~300 MB) as devDependencies. Without skip flags,
`npm install` downloads these binaries on every fresh install.

**Fix**: Add the following to your shell profile (`~/.zshrc` or `~/.bashrc`) and
reload before running `npm install`:

```sh
export ELECTRON_SKIP_BINARY_DOWNLOAD=1
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
```

Neither binary is needed to compile Land. They are only required for running VS
Code's own integration tests.

### Playwright lockfile error

**Symptom**: `npm install` fails with:

```
Error: An active lockfile is found at: ~/Library/Caches/ms-playwright/__dirlock
```

**Cause**: A previous `npm install` run was interrupted, leaving a stale
lockfile that blocks subsequent installs.

**Fix**: Remove the stale lockfile and retry:

```sh
rm -rf ~/Library/Caches/ms-playwright/__dirlock
npm install
```

### `debug-electron-bundled` path error (path argument undefined)

**Symptom**: The bundled workbench crashes at startup with:

```
The "path" argument must be of type string. Received type undefined
```

The stack trace points into `open (workbench.desktop.main.*.js)`.

**Cause**: `ISandboxConfiguration.profiles` or one of its required URI fields
was missing or `undefined` in Mountain's `ConstructSandboxConfiguration`. VS
Code's `NativeWorkbenchEnvironmentService` accesses URI fields like
`languageModelsResource` without null-guards.

**Fix**: Rebuild Mountain after any change to `InitializationData.rs`:

```sh
cargo build -p Mountain
```

If the error persists after rebuilding, wipe the Vite cache and do a full
rebuild:

```sh
rm -rf Element/Sky/Target/
./Maintain/Debug/Build.sh --profile debug-electron-bundled
```

If still failing, open DevTools (`Inspect=1`) and set a breakpoint at
`get extensionsPath` in the bundled workbench to inspect what
`this.productService.dataFolderName` resolves to at runtime.

## Startup Issues

### Blank workbench - Cocoon not connecting

**Symptom**: The editor window opens but the workbench is blank or shows a
loading spinner indefinitely. The extension host never activates.

**Cause**: Cocoon failed to start or failed to connect to Mountain. The most
common sub-causes are: port 50052 already in use from a previous run, or
Cocoon's gRPC server failed to bind.

**Fix**:

1. Check whether port 50052 is in use:

    ```sh
    lsof -i :50052
    ```

    Kill any orphaned process found, or change `NetworkCocoonPort` in
    `.env.Land`.

2. Check the FIDDEE.log for the line `RPCServer bound on port 50052`. If it is
   absent, Cocoon failed to start. Look for earlier error lines in the log.

3. Set `Trace=cocoon,grpc` and `Record=1` in `.env.Land.Diagnostics`, relaunch,
   and inspect `<app-data>/logs/<timestamp>/Mountain.dev.log` for the Cocoon
   subprocess output.

### `dataFolderName` crash - path argument undefined at boot

See
[debug-electron-bundled path error](#debug-electron-bundled-path-error-path-argument-undefined)
above. The same `InitializationData.rs` fix applies to both the bundled and
non-bundled profiles.

## Extension Issues

### Extension not loading

**Symptom**: An extension does not appear in the Extensions sidebar, or appears
but never activates.

**Fix**:

1. Verify the extension directory path is correct. On macOS the user extension
   root is `~/.land/extensions/`. The directory must contain a `package.json`
   with a valid `"main"` field.
2. Check that `package.json` has an `"engines"` field with a `"vscode"` version
   range that the current Land version satisfies (`ProductVersion` in
   `.env.Land`, default `1.118.0`).
3. Set `Trace=extensions` and `Record=1`, relaunch, and check the dev log for
   activation errors. Common causes are a missing compiled entry point, a
   Node.js require error in the extension's code, or an `activationEvent` that
   is never fired.
4. Check the Cocoon log in DevTools Console for uncaught exceptions during
   `activate()`.

### Terminal not opening

**Symptom**: Opening a terminal pane shows a blank panel or an error about a
missing binary.

**Cause**: The `portable-pty` native binary is either missing for the current
platform or the `localPty:createProcess` IPC handler could not locate the
Node.js binary to spawn the shell.

**Fix**:

1. Verify the `SideCar` binary for your platform is present in the app bundle's
   resources directory.
2. Check `NetworkCocoonPort` is reachable - terminal creation goes through the
   Cocoon gRPC service.
3. Set `Trace=terminal` and relaunch. The dev log will show the exact command
   Mountain attempted to pass to `localPty:createProcess` and any error
   returned.

## Code Signing Issues

### codesign failures on macOS

**Symptom**: The application bundle fails to launch with a "damaged or
incomplete" error, or Gatekeeper blocks it. Alternatively, `codesign --verify`
reports `not signed` or `invalid signature`.

**Cause**: Tauri's build process does not automatically re-sign the bundle after
it copies the Cocoon Node.js binary and other resources into the `.app`. The
ad-hoc signature applied at Tauri bundle time becomes invalid once additional
files are written.

**Fix**: Re-run `SignBundle.sh` after the build:

```sh
BundleLevel=debug sh Maintain/Script/SignBundle.sh
```

The script runs `xattr -cr` to strip quarantine attributes, then applies a fresh
`codesign` with the entitlements from `Element/Mountain/Entitlements.plist`.

> [!WARNING] XML comments inside the `<dict>` block of `Entitlements.plist` will
> cause `codesign` to reject the file with a parse error. Comments must appear
> outside the `<dict>` element. If you edit `Entitlements.plist`, verify the XML
> is well-formed before signing.

### codesign succeeds but app still blocked

**Symptom**: `codesign --verify` passes but macOS still shows "cannot be opened"
at launch.

**Cause**: Quarantine extended attribute was not cleared before signing.

**Fix**: Clear the quarantine attribute explicitly before signing:

```sh
xattr -cr Element/Mountain/Target/debug/Mountain.app
BundleLevel=debug sh Maintain/Script/SignBundle.sh
```

`SignBundle.sh` already calls `xattr -cr` internally, so re-running the full
script is sufficient.
