---
title: "Running Extension Tests"
section: "Workflow"
order: 16
description:
    "Extension Development Host model: second isolated instance launches to run
    tests with test Cocoon remote-controlling main UI."
---

# Running Extension Tests

Explains the "Extension Development Host" model: a second, isolated instance of
the application launches to run tests, with the test Cocoon instance
remote-controlling the main UI.

Implementation details are in `Mountain/Source/Testing/` and
`Cocoon/Source/Services/Extension.ts`.

## Data Flow

```
Developer launches Mountain with --extensionDevelopmentPath
  -> Extension activated in development mode
  -> Developer runs "Run Tests" command (Ctrl+Shift+P)
  -> Test Runner Service constructs special arguments:
       --extensionDevelopmentPath
       --extensionTestsPath
       VSCODE_IPC_HOOK_CLI env var
  -> Spawn new Mountain instance (Extension Development Host)

Test Host:
  -> Detects --extension... flags, knows it is a test instance
  -> Launches Cocoon sidecar with special env vars
  -> Test Cocoon detects VSCODE_IPC_HOOK_CLI
  -> Enters CLI test runner mode (no normal gRPC server)
  -> Requires and executes script from --extensionTestsPath (e.g. mocha)
  -> Mocha loads extension test files

Test Execution:
  -> Tests call vscode.commands.executeCommand('my-extension.doSomething')
  -> Lightweight test vscode shim intercepts require('vscode')
  -> Shim connects to MAIN Mountain instance (not test instance)
  -> gRPC: executeCommand sent to main Mountain
  -> Main Mountain executes command, updates UI, returns result
  -> Test proceeds: vscode.workspace.textDocuments[0]
  -> Another gRPC call to main Mountain for document state
  -> assert checks if main application state matches expected

Test Completion:
  -> Mocha completes all tests, aggregates pass/fail counts
  -> Prints results to stdout, exits with code (0/1)
  -> Main Mountain's Test Runner Service monitored stdout
  -> Parses results, displays notification: "10 passed, 0 failed"
```

## Phase 1: Test Discovery and Command Registration

1. Extension under development includes a `test` script and contributes a
   command for its test runner.
2. Developer launches Mountain with
   `--extensionDevelopmentPath /path/to/my-extension`. Extension activates in
   development mode.

## Phase 2: Initiating the Test Run

3. Developer executes "Run Tests" from the Command Palette in the main Mountain
   window.
4. Test Runner Service prepares special arguments and environment variables for
   a new instance: `--extensionDevelopmentPath`, `--extensionTestsPath`, and
   `VSCODE_IPC_HOOK_CLI`.
5. Spawns a new Mountain process -- the "Extension Development Host".

## Phase 3: Test Execution in the Development Host

6. New Mountain instance starts, sees the `--extension...` flags, knows it is a
   test instance.
7. Launches its own Cocoon sidecar with special environment variables.
8. Test Cocoon detects `VSCODE_IPC_HOOK_CLI` and enters CLI test runner mode (no
   normal gRPC server, no `initExtensionHost` handshake).
9. Executes the test runner script from `--extensionTestsPath` (typically
   mocha).
10. Test files execute. The `require('vscode')` call is intercepted by a
    lightweight `RequireInterceptor` that connects back to the **main Mountain
    instance**.

## Phase 4: Remote Control and Result Reporting

11. Test code calls `vscode.commands.executeCommand(...)`. Lightweight shim
    sends gRPC request to the original Mountain instance.
12. Main Mountain executes the command, UI updates, files open. Result returned
    to test Cocoon.
13. Test proceeds to assertions (e.g. checking document state via another gRPC
    call to main Mountain).
14. Mocha completes, aggregates results, prints to stdout, exits with code.
15. Main Mountain's Test Runner Service parses the output and displays a
    notification.

## Key Source Files

- `Mountain/Source/Testing/` -- test runner service
- `Cocoon/Source/Services/Extension.ts` -- extension activation

---

## See Also

- [Extension Development](https://Editor.Land/Doc/extension-development)
- [Application Startup and Handshake](https://Editor.Land/Doc/workflow-startup)
