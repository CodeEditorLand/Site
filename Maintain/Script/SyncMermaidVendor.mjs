#!/usr/bin/env node
// Dev-only maintenance script - regenerates Source/Content/Mermaid/ from the
// monorepo's .hermes/mermaid/manifest.json (one level above this repo when
// checked out inside CodeEditorLand). NOT part of the build - the build
// (Source/Function/Markdown/Mermaid.ts) only ever reads the vendored copies
// inside this repo, never .hermes/. Run this after editing a ```mermaid
// block and re-running `.hermes/scripts/extract-mermaid.py` in the monorepo,
// then commit the result.
//
// Rewrites Source/Content/Mermaid/ to exactly match current doc content:
// copies every hash referenced by Source/Content/**/*.md, and deletes any
// vendored SVG that's no longer referenced by anything.

import { createHash } from "node:crypto";
import {
	existsSync,
	readFileSync,
	readdirSync,
	copyFileSync,
	unlinkSync,
	mkdirSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const WebSiteRoot = resolve(
	dirname(fileURLToPath(import.meta.url)),
	"../..",
);
const MonorepoRoot = resolve(WebSiteRoot, "..");
const ManifestPath = resolve(
	MonorepoRoot,
	".hermes/mermaid/manifest.json",
);
const SvgDir = resolve(WebSiteRoot, "Source/Content/Mermaid");
const ContentDir = resolve(WebSiteRoot, "Source/Content");

function FindMarkdownFiles(Dir, Out = []) {
	for (const Entry of readdirSync(Dir, { withFileTypes: true })) {
		const Full = resolve(Dir, Entry.name);
		if (Entry.isDirectory()) FindMarkdownFiles(Full, Out);
		else if (Entry.name.endsWith(".md") || Entry.name.endsWith(".mdx"))
			Out.push(Full);
	}
	return Out;
}

function ExtractMermaidHashes(Files) {
	const Hashes = new Set();
	const Pattern = /```mermaid\n([\s\S]*?)```/g;

	for (const File of Files) {
		const Text = readFileSync(File, "utf-8");
		let Match;
		while ((Match = Pattern.exec(Text))) {
			const Code = Match[1].trim();
			if (!Code) continue;
			Hashes.add(
				createHash("sha256").update(Code).digest("hex").slice(0, 16),
			);
		}
	}

	return Hashes;
}

function Main() {
	if (!existsSync(ManifestPath)) {
		console.error(
			`[SyncMermaidVendor] Manifest not found at ${ManifestPath}.\n` +
				"This script only works from inside the CodeEditorLand monorepo checkout " +
				"(WebSite as a sibling of .hermes/). Nothing to do.",
		);
		process.exitCode = 1;
		return;
	}

	const Manifest = JSON.parse(readFileSync(ManifestPath, "utf-8"));
	const HashToSvg = new Map();
	for (const Diagram of Object.values(Manifest.diagrams ?? {})) {
		if (Diagram.hash && Diagram.svg) {
			HashToSvg.set(Diagram.hash, resolve(MonorepoRoot, Diagram.svg));
		}
	}

	mkdirSync(SvgDir, { recursive: true });

	const ReferencedHashes = ExtractMermaidHashes(
		FindMarkdownFiles(ContentDir),
	);

	let Copied = 0;
	const Missing = [];

	for (const Hash of ReferencedHashes) {
		const Source = HashToSvg.get(Hash);
		const Dest = resolve(SvgDir, `${Hash}.svg`);

		if (!Source || !existsSync(Source)) {
			Missing.push(Hash);
			continue;
		}

		copyFileSync(Source, Dest);
		Copied++;
	}

	let Removed = 0;
	for (const File of readdirSync(SvgDir)) {
		if (!File.endsWith(".svg")) continue;
		const Hash = File.slice(0, -4);
		if (!ReferencedHashes.has(Hash)) {
			unlinkSync(resolve(SvgDir, File));
			Removed++;
		}
	}

	console.log(`[SyncMermaidVendor] Referenced diagrams: ${ReferencedHashes.size}`);
	console.log(`[SyncMermaidVendor] Copied/refreshed:    ${Copied}`);
	console.log(`[SyncMermaidVendor] Orphans removed:     ${Removed}`);
	console.log(`[SyncMermaidVendor] Missing from manifest: ${Missing.length}`);

	if (Missing.length) {
		console.log(
			"  Run `.hermes/scripts/extract-mermaid.py` in the monorepo first, then re-run this script:",
		);
		for (const Hash of Missing) console.log(`  - ${Hash}`);
		process.exitCode = 1;
	}
}

Main();
