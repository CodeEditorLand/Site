---
title: "Output"
section: "Element"
order: 22
description:
    "Deterministic build artifacts with checksum verification."
---

# Output

Output is the artifact store for Code Editor Land. Every bundle produced
by the build pipeline lands here, and every bundle is deterministic:
the same commit always produces the same bytes.

## The Problem

VS Code builds differ between machines. Timestamps, randomized identifiers,
non-deterministic module ordering, and platform-specific path separators all
contribute to outputs that vary even when the source is identical. This
makes it impossible to verify that a released binary matches the audited
source.

When two developers build the same commit and get different checksums,
trust in the supply chain breaks down. You cannot distinguish a legitimate
build variation from a compromised artifact.

## How Output Eliminates It

Output enforces determinism at every stage. The build pipeline (driven by
Rest and Maintain) strips timestamps, fixes module ordering, normalizes
path separators, and seeds any randomized identifiers with values derived
from the commit hash.

After each build, Output computes BLAKE3 checksums for every artifact and
records them in a manifest. CI verifies that the manifest matches a
reproducible build. If any byte differs, the pipeline fails.

## What You Experience

You can verify any release. Download the source, run the build, compare
checksums. If they match, the binary is exactly what the source says it is.
No trust required beyond the code you can read.

For day-to-day development, deterministic output means that build caches
work reliably. If the checksum has not changed, the artifact has not
changed, and downstream steps can be skipped entirely.

## Key Technologies

BLAKE3 Checksums, Deterministic Bundling, esbuild, Reproducible Builds,
Supply-Chain Verification.

## See Also

- [Architecture Overview](/Doc/architecture)
- [Rest](/Doc/rest)
- [Source Code](https://github.com/CodeEditorLand/Output)
