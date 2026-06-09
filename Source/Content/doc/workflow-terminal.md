---
title: "Creating and Interacting with an Integrated Terminal"
section: "Workflows"
order: 6
description:
    "How Mountain spawns a native PTY, streams output to Sky via Tauri events,
    and routes keystrokes back to the shell process."
---

The integrated terminal is a native PTY process managed entirely inside
Mountain. Sky renders the terminal via xterm.js, receiving output as Tauri
events. Cocoon receives the same output as gRPC notifications so extensions can
observe terminal data. User keystrokes take the reverse path: Sky → Mountain IPC
→ PTY master → shell stdin.

## Phase 1 - Creation request (Cocoon or Wind → Mountain)

1. The request originates from one of two places:
    - **Extension**: `vscode.window.createTerminal(...)` in Cocoon sends a
      `$createTerminal` gRPC request to Mountain.
    - **User command**: `workbench.action.terminal.new` from the Command Palette
      in Wind reaches Mountain as a Tauri IPC call.

    Both paths resolve to the same `Common::terminal::CreateTerminal` Effect
    executed by Mountain's `TerminalProvider`.

## Phase 2 - Native PTY spawning (Mountain)

2. `TerminalProvider.CreateTerminal()` allocates a new `TerminalId` from
   `AppState` and determines the shell to launch (from request options or the
   system default).

3. Mountain uses the `portable-pty` crate to open a pseudo-terminal pair:

    ```rust
    PtySystem.openpty(size)   // returns master + slave handles
    ```

4. A `CommandBuilder` is constructed for the shell binary (e.g. `bash`) and the
   shell process is spawned as a child of the PTY slave. The shell process
   believes it is talking to a real terminal.

5. A `TerminalStateDto` is created holding the `TerminalId`, the OS-level `pid`,
   and clones of the PTY master reader and writer handles. It is stored in
   `AppState.ActiveTerminals`.

6. Three Tokio tasks are spawned for the terminal's lifetime:
    - **Writer Task** - holds the receiver end of a `tokio::mpsc` channel; when
      a string arrives it writes the bytes to the PTY master writer, delivering
      input to the shell.
    - **Reader Task** - loops reading from the PTY master reader; for each chunk
      of output it both sends a **`$acceptTerminalProcessData` gRPC
      notification** to Cocoon and emits a Tauri event to Sky:
      `sky://terminal/data { id, data }`.
    - **Waiter Task** - awaits shell process exit; on termination it sends a
      **`$acceptTerminalClosed` gRPC notification** to Cocoon and removes the
      entry from `AppState.ActiveTerminals`.

7. Mountain sends **`$acceptTerminalOpened`** and **`$acceptTerminalProcessId`**
   gRPC notifications to Cocoon, then returns the creation result (ID, name,
   PID) to the caller.

## Phase 3 - UI rendering and state sync (Mountain → Cocoon + Sky)

8. Cocoon's terminal service receives the `$acceptTerminalOpened` and
   `$acceptTerminalProcessId` notifications and creates a local `Terminal` proxy
   object. Extensions that subscribe to `onDidWriteData` on this proxy receive
   output as it streams from the Reader Task.

9. Sky's terminal component listens for the `sky://terminal/create` Tauri event
   (emitted at creation time) and instantiates a new xterm.js instance for the
   `TerminalId`.

10. As the Reader Task emits `sky://terminal/data` events, Sky calls
    `xterm.write(data)` on the matching instance. The shell prompt appears in
    the panel.

## Phase 4 - User input loop (Sky → Mountain → shell)

11. The user types `ls -la` in the terminal panel. xterm.js captures the
    keystrokes via its `onData` handler and calls:

    ```ts
    TauriInvoke("mountain://terminal/send-text", {
    	id: terminalId,
    	text: "ls -la\r",
    });
    ```

12. Mountain's `SendTextToTerminalLogic` handler looks up the `TerminalStateDto`
    for `terminalId` in `AppState.ActiveTerminals` and sends the string to the
    `mpsc` sender stored in the DTO.

13. The Writer Task receives the string from the channel and writes its bytes to
    the PTY master writer. The OS delivers the input to the waiting shell.

14. The shell executes `ls -la`, writes the directory listing to stdout. The PTY
    slave captures it and makes it available on the PTY master.

15. The Reader Task reads the output and the loop from step 10 repeats - the
    listing appears in xterm.js and is also forwarded to Cocoon via
    `$acceptTerminalProcessData`.
