---
title: "Tauri Desktop Integration in Land"
summary:
    "How Mountain uses Tauri for a native editor shell without bundling
    Chromium."
publishedAt: "2026-04-02"
tags: ["Tauri", "Rust", "Desktop", "Architecture"]
author: "CodeEditorLand"
readTime: 5
---

# Tauri Desktop Integration in Land

Code Editor Land uses Tauri through the Mountain element. Tauri lets the editor
use the operating system WebView instead of bundling Chromium, while Mountain
keeps native services in Rust.

The source-backed claim is architectural: no bundled Chromium in the Tauri
desktop path, native Rust service code in Mountain, and configured targets for
multiple operating systems. Public size, memory, and startup comparisons should
come from a repeatable benchmark.

## Mountain's Role

Mountain manages the Tauri application, window lifecycle, native commands,
processes, files, terminals, clipboard, extension IPC, and Cocoon startup. Sky
renders inside the WebView. Cocoon runs the Node.js extension-host path.

## IPC

Sky and Wind use Tauri IPC for workbench calls into Mountain. Mountain and
Cocoon use Vine gRPC for extension-host routes. Mist is a local service-boundary
path, not a universal transport for all editor traffic today.

## Platform Targets

The repository contains Tauri configuration for macOS, Windows, Linux, iOS, and
Android. A configured target should be described separately from a published
installer or verified release artifact.

## NLnet Funding

This work is funded through the
[NGI0 Commons Fund](https://nlnet.nl/commonsfund/) (grant No. 101135429),
operated by PlayForm under the NLnet Foundation.
