---
title: "VS Code Extension Compatibility in Land"
summary:
    "How Land runs unmodified VS Code extensions, and where coverage still needs
    validation."
publishedAt: "2026-04-03"
tags: ["Extensions", "VS Code", "Compatibility"]
author: "CodeEditorLand"
readTime: 6
---

# VS Code Extension Compatibility in Land

Land's active compatibility path is Cocoon. Cocoon loads existing VS Code
extension entry points and provides the `vscode` API object those extensions
expect. Mountain scans installed extensions, reads manifests, handles local VSIX
install and uninstall routes, and notifies Cocoon when the extension set
changes.

That means Land can make a strong, useful claim: installed VS Code extensions
run unmodified through Cocoon when the APIs they use are implemented.

It should not claim that every marketplace extension works until a public
validation matrix proves that statement across real extensions and versions.

## What Is Source-Backed Today

- Cocoon hosts existing extension code instead of asking authors to fork or
  rewrite their extension.
- Mountain contains extension scanning, manifest parsing, local VSIX install and
  uninstall routes, and extension-state updates.
- Output keeps the VS Code extension scanner and offline gallery channels wired
  for sideloaded extensions.
- Core surfaces such as commands, workspace, window, terminals, webviews,
  language providers, diagnostics, output channels, and document events have
  active source paths.

## In Progress

- Marketplace browsing and install flows beyond local or sideloaded extension
  sources.
- Chat, language-model, notebook, tests, and other long-tail VS Code APIs.
- A public extension validation matrix that names extensions, versions,
  platforms, and the APIs they exercised.

## Marketplace Integration

Land does not need to connect to the Microsoft Visual Studio Marketplace to run
installed extension code. The current source is oriented around local extension
paths and sideloaded packages. Open registry and enterprise registry flows
should be described as coming soon until the in-editor path is complete.

## Reporting Compatibility Issues

If an extension that works in VS Code fails in Land, open an issue with the
extension name, version, platform, activation event, and the API that failed.
That keeps compatibility work tied to real behavior instead of broad promises.
