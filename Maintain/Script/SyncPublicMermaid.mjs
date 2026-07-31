#!/usr/bin/env node
// SyncMermaidPublic.mjs
//
// The docs embed diagrams as <img src="/Mermaid/<hash>.svg">, which Astro
// serves from publicDir (./Public) at the site root. The render pipeline
// (.hermes/scripts/render-mermaid-svgs.py) writes the canonical SVGs into
// Source/Content/Mermaid/ (which IS tracked in git) and previously also
// mirrored them into Public/Mermaid/. To keep the deployed site correct
// WITHOUT having to commit a generated mirror, this script regenerates
// Public/Mermaid/ from Source/Content/Mermaid/ at build/dev time.
//
// Run automatically via the `prebuild` / `predev` npm hooks.

import {
	existsSync,
	readdirSync,
	copyFileSync,
	mkdirSync,
	statSync,
} from "node:fs";
import { resolve } from "node:path";

const WebSiteRoot = resolve(import.meta.dirname, "..", "..");
const SourceDir = resolve(WebSiteRoot, "Source/Content/Mermaid");
const PublicDir = resolve(WebSiteRoot, "Public/Mermaid");

if (!existsSync(SourceDir)) {
	console.error(
		`[SyncPublicMermaid] Source dir not found: ${SourceDir}. ` +
			`Run the mermaid render pipeline first.`,
	);
	process.exitCode = 1;
} else {

mkdirSync(PublicDir, { recursive: true });

let copied = 0;
let upToDate = 0;

for (const File of readdirSync(SourceDir)) {
	if (!File.endsWith(".svg")) continue;
	const From = resolve(SourceDir, File);
	const To = resolve(PublicDir, File);
	const NeedsCopy =
		!existsSync(To) ||
		statSync(From).mtimeMs > statSync(To).mtimeMs;
	if (NeedsCopy) {
		copyFileSync(From, To);
		copied++;
	} else {
		upToDate++;
	}
}

console.log(
	`[SyncPublicMermaid] Synced Public/Mermaid/ from Source/Content/Mermaid/ ` +
		`(copied: ${copied}, already current: ${upToDate}).`,
);
}
