---
title: "Sky - Deep Dive"
section: "Deep Dive"
order: 33
description:
    "Technical architecture of the Sky UI component layer: Astro-based page
    routes, workbench variants, and integration with Wind and Mountain through
    Tauri."
---

# Sky - Deep Dive

Sky renders the complete editor interface inside the Tauri webview using Astro.
It consumes state and services from the Wind service layer and communicates with
the Mountain Rust backend through Tauri IPC.

## Architecture 🏗️

Sky is organized into three tiers:

```text
Pages (Tauri webview entry points)
  |
  +-- Workbench Components (VSCode-compatible editor layout)
        |
        +-- Workbench Implementations (Browser/Mountain/Electron variants)
        +-- Function utilities (Debug, Shared, Meta, Markup)
```

## Key Modules 📁

| Path                                             | Description                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------------ |
| `Source/pages/index.astro`                       | Default entry point; selects workbench variant via environment variables |
| `Source/pages/Mountain.astro`                    | A2 workbench page - recommended production entry point                   |
| `Source/pages/Browser.astro`                     | A1 browser-only workbench                                                |
| `Source/pages/BrowserProxy.astro`                | A1 workbench with service proxy                                          |
| `Source/pages/Electron.astro`                    | A3 workbench with Electron polyfills                                     |
| `Source/pages/Isolation.astro`                   | Isolated mode for extension sandboxing                                   |
| `Source/Workbench/Mountain.astro`                | A2 workbench - loads VSCode UI with Mountain providers                   |
| `Source/Workbench/Browser.astro`                 | A1 pure browser workbench                                                |
| `Source/Workbench/BrowserProxy/Bootstrap.ts`     | Effect-TS runtime and services initialization                            |
| `Source/Workbench/BrowserProxy/ServicesProxy.ts` | Service proxy implementation                                             |
| `Source/Workbench/Electron/Polyfills.ts`         | Electron compatibility shims                                             |
| `Source/Workbench/NLS.astro`                     | Natural language support                                                 |
| `Source/Function/Debug.ts`                       | Build-time debug utilities                                               |
| `Source/Function/Shared.ts`                      | Shared runtime utilities                                                 |
| `astro.config.ts`                                | Astro build config, Vite aliases, output to `Target/`                    |

## Startup Sequence 🚀

1. Tauri loads the webview pointing at Sky's built output.
2. The page route reads environment variables and selects a workbench variant.
3. Wind's `Preload.ts` shims `window.vscode` globals before VSCode code runs.
4. Wind bootstraps the Effect-TS service layer and establishes Tauri IPC.
5. Sky components subscribe to Wind services for live state updates.
6. Sky listens for Tauri events from Mountain (`sky://terminal/data`,
   `sky://scm/update-group`, `sky://configuration/changed`).

## Data Flow 🔄

User interaction triggers a Sky component, which calls a Wind service method.
Wind invokes a Tauri command, Mountain's Rust handler processes it and returns.
The result resolves through Wind back to Sky, which re-renders.

## Workbench Variants 🖥️

| Variant         | Description                          | Status      |
| --------------- | ------------------------------------ | ----------- |
| A1 Browser      | Pure browser workbench               | Available   |
| A1 BrowserProxy | Browser workbench with service proxy | Available   |
| A2 Mountain     | VSCode UI with Mountain providers    | Recommended |
| A3 Electron     | Workbench with Electron polyfills    | Available   |
| Isolation       | Extension sandboxing mode            | Available   |

When no variant flag is set, `index.astro` loads `Workbench/Default.astro`. The
recommended deployment sets `Mountain=true`.

## Integration Points 🔗

| Connecting Element | Direction     | Mechanism          | Description                                         |
| ------------------ | ------------- | ------------------ | --------------------------------------------------- |
| Wind               | Inbound       | Direct import      | Consumes Wind Effect-TS services for business logic |
| Mountain           | Bidirectional | Tauri IPC + Events | Commands via Tauri invoke; updates as Tauri events  |
| Output             | Inbound       | Static bundle      | VSCode core UI from `@codeeditorland/output`        |
| Worker             | Inbound       | Web Worker API     | Background processing from `@codeeditorland/worker` |

## Related Documentation 📖

- [Sky overview](https://Editor.Land/Doc/sky)
- [Architecture overview](https://Editor.Land/Doc/architecture)
- [Mountain Rust backend](https://Editor.Land/Doc/deep-dive-mountain)
