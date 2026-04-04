---
title: "Wind"
section: "Element"
order: 13
description: "The workbench service layer that eliminates Electron's IPC proxy"
---

# Wind

## The Problem Wind Solves

In VS Code, the workbench (panels, sidebars, status bar, command palette) lives in the Chromium renderer process. Every interaction that touches the file system, terminal, or extension state crosses the Electron IPC bridge twice: renderer to main, main to renderer. This is a serialized JSON pipe. On high-frequency events like typing, scrolling, and hover tooltips, this adds latency.

## How Wind Eliminates It

Wind re-implements the VS Code Workbench in TypeScript as composable Effect-TS Layers. Each workbench service (file dialogs, clipboard, configuration, output channels, status bar) is a typed Layer that can be provided, mocked, or replaced without touching other services. OS calls go directly through Mountain's Tauri bindings with no IPC proxy.

## What You Experience

File dialogs open natively. Clipboard reads are synchronous. Configuration changes propagate through the Effect runtime without JSON serialization. The workbench can be tested in isolation by providing mock layers instead of a running Tauri instance.

## Key Technologies

Wind is written in TypeScript with Effect-TS. It consumes Tauri's API bindings directly and implements the VS Code workbench service interfaces.

## See Also

- [Architecture Overview](/Doc/architecture)
- [Sky: UI Components](/Doc/sky)
- [Mountain: Native Backend](/Doc/mountain)
- [Source Code](https://github.com/CodeEditorLand/Wind)
