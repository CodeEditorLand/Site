---
title: "Running Extension Tests"
section: "Workflows"
order: 9
description: "How the Extension Development Host model spawns a second isolated
    Mountain+Cocoon pair and lets the test runner remote-control the main editor
    window."
---

Extension tests in Land use the same Extension Development Host model as VS
Code: a second, fully isolated Mountain+Cocoon pair is spawned specifically to
run the test suite. The test Cocoon instance does not start a normal extension
host - instead it executes the test runner script directly. The key
architectural detail is that `require('vscode')` inside the test files connects
back to the **original Mountain instance**, so tests drive the real editor UI
rather than a headless stub.

## Phase 1 - Development mode launch

1. The developer launches Mountain with the extension under development:

    ```bash
    mountain --extensionDevelopmentPath /path/to/my-extension
    ```

2. Cocoon activates the extension in development mode. The extension's
   `activate()` function runs and registers its commands, providers, and test
   runner entry point in the main window.

## Phase 2 - Initiating the test run (Wind → Mountain)

3. The developer opens the Command Palette (`Ctrl+Shift+P`) and executes "Run
   Tests". Mountain's Test Runner Service receives the command.

4. The service constructs a specialised argument set for a second Mountain
   process:
    - `--extensionDevelopmentPath` - path to the extension under test.
    - `--extensionTestsPath` - path to the test runner entry script (e.g.
      `out/test/suite/index.js`).
    - `VSCODE_IPC_HOOK_CLI` - environment variable that signals CLI test runner
      mode to Cocoon.

5. The Test Runner Service spawns a new Mountain process with these arguments.
   This second instance is the **Extension Development Host**.

## Phase 3 - Test host startup (Mountain test instance → Cocoon test instance)

6. The new Mountain instance starts, detects the `--extension...` flags, and
   knows it is a test host. It launches its own Cocoon sidecar, forwarding the
   special environment variables including `VSCODE_IPC_HOOK_CLI`.

7. Test Cocoon starts and its bootstrap logic detects `VSCODE_IPC_HOOK_CLI`. It
   does **not** bind the normal gRPC RPCServer, does not wait for an
   `initExtensionHost` handshake, and does not activate extensions in the
   standard way.

8. Instead, test Cocoon `require`s and executes the script specified by
   `--extensionTestsPath`. This is typically a Mocha runner entry point that
   discovers and loads the extension's test files.

## Phase 4 - Remote control of the main window (Cocoon test → Mountain main)

9. Each test file imports the `vscode` module:

    ```ts
    import * as vscode from "vscode";
    ```

    A lightweight `RequireInterceptor` intercepts this call. Instead of
    returning the normal Cocoon shim, it returns a thin client that connects
    back to the **original Mountain instance's gRPC server** - the one the
    developer is looking at.

10. When a test calls `vscode.commands.executeCommand(...)`, the thin client
    sends a gRPC request to the main Mountain instance. Main Mountain executes
    the command exactly as if it had come from its own Cocoon sidecar: files
    open, the UI updates, and the result is returned to the test process.

11. Subsequent assertions read state from the main instance the same way:

    ```ts
    const doc = vscode.workspace.textDocuments[0];
    assert.strictEqual(doc.getText(), "Expected Result");
    ```

    Each property access is a gRPC call to main Mountain. The assert checks the
    live state of the editor window.

## Phase 5 - Result reporting (Cocoon test → Mountain main → Wind)

12. Mocha completes all tests, aggregates pass and failure counts, prints a
    summary to stdout, and exits with code `0` (all pass) or `1` (any failure).

13. Main Mountain's Test Runner Service was monitoring the test process's stdout
    and exit code throughout. It parses the results and displays a notification
    in the main window:

    ```
    Tests finished: 10 passed, 0 failed
    ```

14. The Extension Development Host process exits. All resources allocated in
    `AppState` of the test Mountain instance are released automatically when the
    process terminates.

> [!IMPORTANT] Because tests drive the **main** Mountain instance, they execute
> in the same process space as the live editor. A test that opens a file or
> modifies editor state will visibly change the developer's window. Tests must
> clean up after themselves - close documents, revert changes - or subsequent
> test runs may start with unexpected editor state.
