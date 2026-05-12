---
title: "Cocoon"
section: "Element"
order: 12
description:
    "The Node.js extension host that runs unmodified VS Code extension entry
    points through Effect-TS services and Vine IPC."
---

# Cocoon

Cocoon is the active VS Code extension-host compatibility path for Editor.Land.
It is a Node.js process that loads existing extension entry points, provides a
`vscode` API object, and routes implemented API calls through Effect-TS services
and Mountain.

The source supports this claim: installed VS Code extensions can run unmodified
through Cocoon when the APIs they use are implemented. Marketplace-wide coverage
still needs a public validation matrix.

---

## Source Layout

Key Cocoon source areas:

- **`Bootstrap/`** - process entry point, service composition, and gRPC startup.
- **`Generated/`** - TypeScript stubs generated from Vine protocol definitions.
- **`IPC/`** - typed IPC helpers and Sky event registry support.
- **`PatchProcess/`** - targeted adaptation for VS Code platform assumptions
  that do not fit the Land runtime.
- **`Services/`** - the extension-host service layer.
- **`TypeConverter/`** - conversion between Vine DTOs and VS Code-facing types.
- **`WebviewPanel/`** - `vscode.WebviewPanel` support through Mountain and the
  WebView bridge.

---

## Extension-Host Services

Cocoon contains source paths for:

- Module interception so `require("vscode")` returns Land's API shim.
- Extension loading, manifest handling, activation, and deactivation.
- `ExtensionContext` construction for extension `activate()` calls.
- Commands, workspace, configuration, windows, terminals, diagnostics, output,
  webviews, tree views, and language-provider registration.
- Health and performance instrumentation for local diagnostics.
- gRPC request handling through `ProcessMountainRequest`,
  `SendMountainNotification`, and `CancelOperation`.

Some namespaces exist as stubs or partial routes. Chat, language-model,
notebook, and tests APIs should stay marked WIP until their runtime behavior is
verified.

---

## Mountain Communication

Cocoon talks to Mountain through Vine gRPC. Mountain sends extension-host
requests to Cocoon, and Cocoon sends events and results back to Mountain. The
wire shape is generated from protocol definitions rather than handwritten JSON.

The route is real source, but public docs should name the route being discussed
instead of saying all editor communication flows through Cocoon.

---

## Module Interception

Cocoon's module interception path is what lets existing extension code import or
require VS Code APIs without being repackaged for Land. The host supplies the
Land `vscode` API shim and maps implemented calls onto services.

This is a strong compatibility point, but not a promise that every API in every
extension has runtime parity yet.

---

## Status

Cocoon should be shown as active for unmodified extension execution and WIP for
long-tail API coverage. Claims about specific extension categories should link
to tests or a validation matrix.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Mountain](/Doc/mountain)
- [Vine](/Doc/vine)
- [VS Code Compatibility](/Blog/VSCodeCompatibility)
