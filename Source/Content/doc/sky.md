---
title: "Sky"
section: "Element"
order: 14
description: "The declarative UI component layer with instant hot-reload inside Tauri"
---

# Sky

## The Problem Sky Solves

VS Code's UI is tightly coupled to Electron's renderer process. Customizing layouts requires modifying deeply nested class hierarchies. Hot-reload for UI changes is slow because it requires rebuilding the Electron bundle.

## How Sky Eliminates It

Sky renders the editor UI as Astro components inside the Tauri webview. Three workbench layouts (full desktop, embedded, minimal) are built from composable components with instant hot-reload. Change a component and Tauri reloads it immediately.

Sky consumes Wind's Effect-TS services for state management. UI state is always typed and traceable. Navigation between panels happens inside the webview with no full-page reloads.

## What You Experience

Every panel is a component. Edit a panel component and see the change in under a second. High-fidelity VS Code UI compatibility with a significantly smaller footprint.

## Key Technologies

Sky uses Astro for component rendering and consumes Effect-TS services from Wind. It runs inside the Tauri webview alongside Wind.

## See Also

- [Architecture Overview](/Doc/architecture)
- [Wind: Workbench Services](/Doc/wind)
- [Source Code](https://github.com/CodeEditorLand/Sky)
