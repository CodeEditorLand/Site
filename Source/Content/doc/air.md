---
title: "Air"
section: "Element"
order: 15
description: "The background daemon that pre-stages updates and eliminates cold starts"
---

# Air

## The Problem Air Solves

VS Code cold-starts slowly because everything initializes fresh each launch: extension host, language servers, file index. Updates require a full restart that kills open terminals and in-progress work. There is no mechanism to pre-stage work between sessions.

## How Air Eliminates It

Air is a persistent background daemon (like macOS Spotlight or Windows Search Indexer) that keeps running after you close the editor. It pre-downloads and PGP-verifies the next update between sessions. It pre-indexes workspace changes that happened while the editor was closed. It keeps language server warm caches available for instant load.

When you launch Land, Air has already done the expensive work. The update was staged, verified, and ready.

## What You Experience

Cold start times under 200 ms. Updates apply between sessions with no interruption. You never see a workspace that "hasn't loaded yet." The next version is already downloaded and verified before you decide to update.

## Key Technologies

Air is written in Rust and communicates with Mountain through Vine's gRPC protocol. PGP signature verification ensures update integrity.

## See Also

- [Architecture Overview](/Doc/architecture)
- [Mountain: Native Backend](/Doc/mountain)
- [Local-First Protocol](/Doc/local-first-protocol)
- [Source Code](https://github.com/CodeEditorLand/Air)
