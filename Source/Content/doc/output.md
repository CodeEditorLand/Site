---
title: "Output"
section: "Element"
order: 22
description: "Deterministic build artifacts with checksum verification."
---

# Output

Output is the artifact store for Editor.Land. Every bundle produced by the
build pipeline lands here, and every bundle is intended to be deterministic:
the same commit should always produce the same bytes.

---

## The Problem

Build outputs that differ between machines make supply-chain verification
impossible. Timestamps, randomized identifiers, non-deterministic module
ordering, and platform-specific path separators all contribute to outputs that
vary even when the source is identical. When two developers build the same
commit and get different checksums, trust in the released binary breaks down.

---

## How Output Eliminates It

Output enforces determinism at every stage. The build pipeline (driven by Rest
and Maintain) strips timestamps, fixes module ordering, normalizes path
separators, and seeds any randomized identifiers with values derived from the
commit hash.

After each build, Output computes BLAKE3 checksums for every artifact and
records them in a manifest. The manifest enables downstream verification:
if any byte differs from a reference build, the discrepancy is visible
immediately.

---

## What You Experience

For day-to-day development, deterministic output means build caches work
reliably. If the checksum has not changed, the artifact has not changed, and
downstream steps can skip reprocessing.

For releases, the goal is full reproducibility: download the source, run the
build, compare checksums. Reproducible build verification across all platforms
is part of the roadmap. Editor.Land currently builds on **macOS 13+**; the
cross-platform build matrix is not yet active.

---

## Key Technologies

BLAKE3 Checksums, Deterministic Bundling, esbuild, Reproducible Builds,
Supply-Chain Verification.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Rest](/Doc/rest)
- [Maintain](/Doc/maintain)
- [Source Code](https://github.com/CodeEditorLand/Output)
