---
title: "Creating and Interacting with an Integrated Terminal"
section: "Workflows"
order: 6
description:
    "How Mountain spawns a native PTY, streams output to Sky via Tauri events,
    and routes keystrokes back to the shell process."
---

The integrated terminal is a native PTY process managed entirely inside
[Mountain](https://github.com/CodeEditorLand/Mountain). [Sky](https://github.com/CodeEditorLand/Sky) renders the terminal via xterm.js, receiving output as Tauri
events. [Cocoon](https://github.com/CodeEditorLand/Cocoon) receives the same output as gRPC notifications so extensions can
observe terminal data. User keystrokes take the reverse path: [Sky](https://github.com/CodeEditorLand/Sky) → [Mountain](https://github.com/CodeEditorLand/Mountain) IPC
→ PTY master → shell stdin.

## Phase 1 - Creation request ([Cocoon](https://github.com/CodeEditorLand/Cocoon) or [Wind](https://github.com/CodeEditorLand/Wind) → [Mountain](https://github.com/CodeEditorLand/Mountain))

### 1. Request origin

The request originates from one of two places:

- **Extension**: `vscode.window.createTerminal(...)` in [Cocoon](https://github.com/CodeEditorLand/Cocoon) sends a
  `$createTerminal` gRPC request to [Mountain](https://github.com/CodeEditorLand/Mountain).
- **User command**: `workbench.action.terminal.new` from the Command Palette in
  [Wind](https://github.com/CodeEditorLand/Wind) reaches [Mountain](https://github.com/CodeEditorLand/Mountain) as a Tauri IPC call.

Both paths resolve to the same [`Common`](https://github.com/CodeEditorLand/Common)`::terminal::CreateTerminal` Effect
executed by [Mountain](https://github.com/CodeEditorLand/Mountain)'s `TerminalProvider`.

For the extension path, [Cocoon](https://github.com/CodeEditorLand/Cocoon) routes through its gRPC terminal service. For the
user path, [Wind](https://github.com/CodeEditorLand/Wind) dispatches the action through `track.rs` which creates and runs
the effect.

## Phase 2 - Native PTY spawning ([Mountain](https://github.com/CodeEditorLand/Mountain))

### 2. TerminalProvider.CreateTerminal

`TerminalProvider.CreateTerminal()` ([Mountain](https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/TerminalProvider.rs))
allocates a new `TerminalId` from `AppState` and determines the shell to launch
(from request options or the system default).

[Mountain](https://github.com/CodeEditorLand/Mountain) uses the `portable-pty` crate to open a pseudo-terminal pair:

```rust
PtySystem.openpty(size)   // returns master + slave handles
```

A `CommandBuilder` is constructed for the shell binary (e.g. `bash`) and the
shell process is spawned as a child of the PTY slave. The shell process believes
it is talking to a real terminal.

A `TerminalStateDto` is created holding the `TerminalId`, the OS-level `pid`,
and clones of the PTY master reader and writer handles. It is stored in
`AppState.ActiveTerminals`.

### 3. I/O task spawning

Three Tokio tasks are spawned for the terminal's lifetime:

- **Writer Task** - holds the receiver end of a `tokio::mpsc` channel; when a
  string arrives it writes the bytes to the PTY master writer, delivering input
  to the shell. The sender end of the channel is stored in the
  `TerminalStateDto`.
- **Reader Task** - loops reading from the PTY master reader; for each chunk of
  output it both sends a **`$acceptTerminalProcessData` gRPC notification** to
  [Cocoon](https://github.com/CodeEditorLand/Cocoon) (containing the `TerminalId` and data string) and emits a Tauri event
  to [Sky](https://github.com/CodeEditorLand/Sky): `sky://terminal/data { id, data }`.
- **Waiter Task** - awaits shell process exit; on termination it sends a
  **`$acceptTerminalClosed` gRPC notification** to [Cocoon](https://github.com/CodeEditorLand/Cocoon) and removes the entry
  from `AppState.ActiveTerminals`.

### 4. Initial notifications

[Mountain](https://github.com/CodeEditorLand/Mountain) sends `$acceptTerminalOpened` (with `TerminalId` and name) and
`$acceptTerminalProcessId` (with OS-level `pid`) gRPC notifications to [Cocoon](https://github.com/CodeEditorLand/Cocoon).
[Cocoon](https://github.com/CodeEditorLand/Cocoon)'s notification handler adds the terminal to the `__terminals` cache and
fires the `onDidOpenTerminal` event to any listening extensions.

[Mountain](https://github.com/CodeEditorLand/Mountain) also emits the same event to [Sky](https://github.com/CodeEditorLand/Sky) via `AppHandle.emit` so the workbench
UI can register the new terminal entry.

Finally, [Mountain](https://github.com/CodeEditorLand/Mountain) returns the creation result (ID, name, PID) to the caller.

## Phase 3 - UI rendering and state sync ([Mountain](https://github.com/CodeEditorLand/Mountain) → [Cocoon](https://github.com/CodeEditorLand/Cocoon) + [Sky](https://github.com/CodeEditorLand/Sky))

### 5. [Cocoon](https://github.com/CodeEditorLand/Cocoon) terminal service

[Cocoon](https://github.com/CodeEditorLand/Cocoon)'s terminal service ([Cocoon](https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/))
receives the `$acceptTerminalOpened`, `$acceptTerminalProcessId`, and
`$acceptTerminalProcessData` notifications from [Mountain](https://github.com/CodeEditorLand/Mountain).

It creates a local `Terminal` proxy object that represents the terminal to
extensions. When it receives data, it fires the `onDidWriteData` event for that
specific terminal instance, allowing extensions to "listen" to a terminal's
output.

### 6. [Mountain](https://github.com/CodeEditorLand/Mountain) → [Wind](https://github.com/CodeEditorLand/Wind)/[Sky](https://github.com/CodeEditorLand/Sky) bridge

In addition to notifying [Cocoon](https://github.com/CodeEditorLand/Cocoon), [Mountain](https://github.com/CodeEditorLand/Mountain)'s Reader Task (Phase 2, step 3)
notifies the frontend UI via Tauri events. It emits:

```
AppHandle.emit("sky://terminal/data", { Id: TerminalId, Data: ... })
```

### 7. Terminal UI component ([Wind](https://github.com/CodeEditorLand/Wind)/[Sky](https://github.com/CodeEditorLand/Sky))

[Sky](https://github.com/CodeEditorLand/Sky)'s terminal component listens for Tauri events. When it receives a
`sky://terminal/create` event (triggered at creation time), it instantiates a
new xterm.js instance for the `TerminalId`.

As the Reader Task emits `sky://terminal/data` events, [Sky](https://github.com/CodeEditorLand/Sky) finds the correct
xterm.js instance by `TerminalId` and calls `xterm.write(data)`. The shell
prompt appears in the panel.

## Phase 4 - User input loop ([Sky](https://github.com/CodeEditorLand/Sky) → [Mountain](https://github.com/CodeEditorLand/Mountain) → shell)

### 8. Terminal UI captures input

The user types `ls -la` in the terminal panel. xterm.js captures the keystrokes
via its `onData` handler and calls:

```ts
TauriInvoke("mountain://terminal/send-text", {
	id: terminalId,
	text: "ls -la\r",
});
```

### 9. track.rs and TerminalLogic handler ([Mountain](https://github.com/CodeEditorLand/Mountain))

The `mountain://terminal/send-text` command is dispatched to `track`, which
creates and runs the [`Common`](https://github.com/CodeEditorLand/Common)`::terminal::SendTextToTerminal` effect.

The `SendTextToTerminalLogic` handler is executed:

1. It looks up the `TerminalStateDto` for the given `TerminalId` in
   `AppState.ActiveTerminals`.
2. It sends the input string (`ls -la\r`) to the `mpsc` sender channel stored
   in the `TerminalStateDto`.

### 10. Writer Task delivers input to shell

The Writer Task (from Phase 2, step 3) was waiting on its receiver. It
immediately receives the string and writes its bytes to the PTY master writer.
The OS delivers the input to the waiting shell.

### 11. Shell execution and output loop

The shell (bash/powershell) receives the input, executes the `ls -la` command,
and writes the resulting directory listing to stdout. The PTY slave captures it
and makes it available on the PTY master.

The Reader Task reads the output and the loop from Phase 3 repeats - the listing
appears in xterm.js and is also forwarded to [Cocoon](https://github.com/CodeEditorLand/Cocoon) via
`$acceptTerminalProcessData`.

## Terminal lifecycle events

When a terminal closes (shell exits or the user explicitly closes it):

- The **Waiter Task** fires **`$acceptTerminalClosed`** to [Cocoon](https://github.com/CodeEditorLand/Cocoon), which removes
  the terminal from its `__terminals` cache and fires `onDidCloseTerminal`.
- [Mountain](https://github.com/CodeEditorLand/Mountain) emits the closure to [Sky](https://github.com/CodeEditorLand/Sky) via Tauri event so the workbench removes the
  terminal tab.

The full lifecycle event set available to extensions:

| Event                       | Trigger                                    |
| --------------------------- | ------------------------------------------ |
| `onDidOpenTerminal`         | `$acceptTerminalOpened` gRPC from Mountain |
| `onDidCloseTerminal`        | `$acceptTerminalClosed` gRPC from Mountain |
| `onDidChangeActiveTerminal` | Focus change notification from Wind/Sky    |

## Shell integration events (OSC 633)

Modern shells emit OSC 633 escape sequences to mark the boundaries of each
command. [Land](https://github.com/CodeEditorLand/Land) processes these sequences through the PTY Reader Task and routes
them as IPC calls:

| Sequence               | Meaning       | IPC routing                                                                                                                        |
| ---------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `OSC 633 ; A`          | Prompt start  | Decoration marker only (no IPC)                                                                                                    |
| `OSC 633 ; B`          | Prompt end    | Decoration marker only (no IPC)                                                                                                    |
| `OSC 633 ; C`          | Command start | `localPty:shellExecutionStart` IPC, stored in InflightExecution Map, `$acceptTerminalShellExecutionStart` gRPC → Cocoon            |
| `OSC 633 ; D[;<exit>]` | Command end   | `localPty:shellExecutionEnd` IPC, `$acceptTerminalShellExecutionEnd` gRPC → Cocoon, `$acceptExecutedTerminalCommand` gRPC → Cocoon |
| `OSC 633 ; E;<line>`   | Line capture  | Stored per-terminal in InflightExecution Map, associated with next `OSC 633 ; D` flush                                             |

### Extension event mapping

Extension subscribers receive these events via the following `window` API:

- `window.onDidStartTerminalShellExecution` - fires on `OSC 633 ; C`
- `window.onDidEndTerminalShellExecution` - fires on `OSC 633 ; D`
- `window.onDidExecuteTerminalCommand` - fires after `OSC 633 ; D` with the
  captured command line and exit code

### Detailed OSC 633 flow

When the Reader Task detects an OSC 633 sequence in the PTY output stream, it
does not forward the raw escape sequence to xterm.js. Instead:

1. **Prompt markers (A, B)**: Stripped from the output. They exist solely for
   shell integration decoration in the xterm.js renderer and are reconstructed
   by the frontend from IPC signals.
2. **Command start (C)**: [Mountain](https://github.com/CodeEditorLand/Mountain) stores an `InflightExecution` entry in a
   per-terminal map keyed by sequence number. A `localPty:shellExecutionStart`
   IPC event fires to [Sky](https://github.com/CodeEditorLand/Sky) (for UI decoration like the run icon in the gutter)
   and a `$acceptTerminalShellExecutionStart` gRPC notification fires to [Cocoon](https://github.com/CodeEditorLand/Cocoon).
3. **Line capture (E)**: The captured command line text is stored in the
   `InflightExecution` map, associated with the most recent `OSC 633 ; C`
   entry. Multiple `E` sequences may arrive before the corresponding `D` flush.
4. **Command end (D)**: [Mountain](https://github.com/CodeEditorLand/Mountain) looks up the `InflightExecution` entry, pairs
   it with any captured command lines, fires `$acceptTerminalShellExecutionEnd`
   and `$acceptExecutedTerminalCommand` gRPC notifications to [Cocoon](https://github.com/CodeEditorLand/Cocoon), and
   sends `localPty:shellExecutionEnd` to [Sky](https://github.com/CodeEditorLand/Sky). The exit code (after `;` in the
   `D` sequence) is included in the notification payload.

### PTY data flow model

The PTY reader operates on a raw byte stream that interleaves terminal
control sequences, OSC 633 markers, and actual shell output. The Reader Task
in [Mountain](https://github.com/CodeEditorLand/Mountain)'s `TerminalProvider` must:

1. Accumulate bytes from the PTY master reader until a complete OSC sequence
   boundary is identified.
2. Parse `ESC ] 633 ; ... ST` sequences (OSC 633) and route them to the shell
   integration handler.
3. Forward all non-OSC-633 output (standard terminal data, ANSI escape
   sequences, other XTerm escape codes) as-is to the `sky://terminal/data`
   Tauri event for xterm.js rendering.
4. Send the same forwarded data and OSC 633 IPC notifications to [Cocoon](https://github.com/CodeEditorLand/Cocoon) via
   gRPC so extensions receive both raw terminal data and structured command
   execution events.

This design ensures that xterm.js receives the same byte stream as a real
terminal (minus the stripped OSC 633 markers) while extensions get structured
execution boundaries through the `onDidStartTerminalShellExecution` and
`onDidEndTerminalShellExecution` APIs.
