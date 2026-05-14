---
title: "Creating and Interacting with an Integrated Terminal"
section: "Workflow"
order: 12
description:
    "Mountain spawns a PTY process and streams I/O to the Wind frontend and
    Cocoon extension host."
---

# Creating and Interacting with an Integrated Terminal

Deep dive into native process management: Mountain spawns a PTY process and
streams its I/O to both the Wind frontend and the Cocoon extension host.

## Data Flow

```
Extension calls vscode.window.createTerminal()
  OR user executes terminal:new command
  -> Request routed to Mountain TerminalProvider

Mountain:
  -> TerminalProvider.CreateTerminal()
  -> Generate unique TerminalId
  -> Determine shell (from options or system default)
  -> portable-pty: PtySystem.openpty() creates master/slave PTY pair
  -> Spawn shell process (e.g. bash) as PTY child
  -> Create TerminalStateDto (TerminalId, pid, reader/writer handles)
  -> Spawn I/O tasks:
       Writer Task: waits on mpsc channel, writes to PTY
       Reader Task: reads PTY output, sends notifications
       Waiter Task: monitors shell exit
  -> Send $acceptTerminalOpened gRPC to Cocoon
  -> Send $acceptTerminalProcessId gRPC to Cocoon

Cocoon:
  -> Creates Terminal proxy object for extensions
  -> Fires onDidWriteData events when data arrives

Mountain -> Wind/UI:
  -> Reader Task emits Tauri event: sky://terminal/data

User Input Loop:
  User types "ls -la" in terminal UI
  -> Xterm.js captures keystrokes
  -> TauriInvoke('mountain://terminal/send-text', { Id, Text })
  -> Mountain: SendTextToTerminalLogic
  -> Send text to mpsc sender channel
  -> Writer Task writes bytes to PTY master
  -> Shell executes command, writes to stdout
  -> Reader Task captures output
  -> Output sent to Cocoon and Wind/UI
  -> xterm.write(data) displays output
```

## Phase 1: Terminal Creation Request (Cocoon or Wind)

1. Extension calls `vscode.window.createTerminal(...)` or user runs
   `workbench.action.terminal.new`.
2. Request is routed to Mountain's `TerminalProvider` as
   `Common::terminal::CreateTerminal`.

## Phase 2: Native PTY Spawning (Mountain)

3. `TerminalProvider.CreateTerminal()` gets a unique `TerminalId`, determines
   the shell.
4. Uses `portable-pty` to spawn a pseudo-terminal (`PtySystem.openpty`),
   creating a master/slave PTY pair.
5. Spawns the shell process as a child of the PTY slave.
6. Creates `TerminalStateDto` with TerminalId, OS pid, and clones of the PTY
   master's reader/writer handles.
7. Spawns three tokio tasks:
    - **Writer Task**: waits on `mpsc` channel, writes received strings to PTY
      master.
    - **Reader Task**: reads PTY output, sends `$acceptTerminalProcessData` gRPC
      to Cocoon.
    - **Waiter Task**: awaits shell termination, sends `$acceptTerminalClosed`
      gRPC and cleans up.

## Phase 3: UI Rendering and State Sync (Cocoon -> Wind/Sky)

8. Terminal service in Cocoon creates a local `Terminal` proxy object for
   extensions.
9. Mountain's Reader Task emits `sky://terminal/data` Tauri event to Sky.
10. Terminal component (wrapping Xterm.js) receives the event and calls
    `xterm.write(data)`.

## Phase 4: User Input (Wind/Sky -> Mountain -> Shell)

11. User types in terminal UI. Xterm.js captures keystrokes.
12. `TauriInvoke('mountain://terminal/send-text', { Id, Text })` sends input to
    Mountain.
13. `SendTextToTerminalLogic` looks up `TerminalStateDto` and sends text to the
    mpsc channel.
14. Writer Task writes bytes to PTY master. Shell executes command and produces
    output.
15. Reader Task captures output, loop continues.

## Key Source Files

- `Mountain/Source/Environment/TerminalProvider.rs` -- terminal creation and PTY
  management
- `Mountain/Source/handlers/terminal/TerminalLogic.rs` -- send text handler

---

## See Also

- [Architecture Overview](https://Editor.Land/Doc/architecture)
