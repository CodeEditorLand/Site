---
title: "Cocoon"
section: "Element"
order: 12
description: "The extension host that runs every VS Code extension unchanged on Effect-TS fibers"
---

# Cocoon

## The Problem Cocoon Solves

VS Code's extension host is a single Node.js process. One extension's activation event fires, takes 400 ms, and the entire editor freezes. One extension's `onDidChangeTextDocument` handler never resolves: every other handler in the process waits. One language server crashes and the extension host tries to restart it, blocking the event loop. Your cursor stops moving.

Everything competes on one thread. There is no way to cancel an in-flight extension operation. There is no back-pressure. Extensions cannot be preempted.

## How Cocoon Eliminates It

Cocoon intercepts `require` and `import` at the Node.js module level and routes all VS Code API calls through a complete Effect-TS service layer. Extensions call `vscode.workspace.openTextDocument()` and get back a `Thenable<TextDocument>` exactly as documented. Internally, that call is a typed Effect running on a fiber scheduler that can be interrupted, raced with a timeout, run concurrently with other operations, and traced for performance diagnostics.

Extensions are isolated into separate fiber scopes. One extension's hung Promise does not block another's fiber.

## What You Experience

50+ extensions activate concurrently. Language server crashes are handled in supervised scopes with automatic restart. No extension can freeze the editor. The full VS Code marketplace works without modification.

## Key Technologies

Cocoon runs on Node.js with Effect-TS providing the fiber runtime. It communicates with Mountain through Vine's gRPC protocol. TypeScript types are enforced end-to-end.

## See Also

- [Architecture Overview](/Doc/architecture)
- [Extension Development](/Doc/extension-development)
- [Mountain: Native Backend](/Doc/mountain)
- [Source Code](https://github.com/CodeEditorLand/Cocoon)
