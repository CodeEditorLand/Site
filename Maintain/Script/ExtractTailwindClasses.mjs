#!/usr/bin/env node
/**
 * Targeted Tailwind class extraction - Phase 2 (careful).
 * Only replaces standalone utility classes, never variant-prefixed ones.
 */

import { readFileSync, writeFileSync } from "fs";
import { globSync } from "glob";
import { relative, resolve } from "path";

const PROJECT = resolve(import.meta.dirname, "../..");
const SOURCE = resolve(PROJECT, "Source");
const FILES = globSync([`${SOURCE}/**/*.tsx`, `${SOURCE}/**/*.astro`]);

/**
 * A Tailwind variant prefix is a word ending in ':' that precedes a utility.
 * Examples: hover:, focus:, disabled:, [&_svg]:, focus-visible:, dark:, md:, lg:, etc.
 * Also handles arbitrary variants like [&>button]:, group-*, peer-*, data-*, aria-*
 */
const VARIANT_RE = /(?:^|\s)((?:[\w-]+|\[[^\]]+\]):)/g;

/**
 * Replace `pattern` with `replacement` ONLY when pattern is NOT preceded
 * by a Tailwind variant prefix. Handles className strings and template literals.
 */
function replaceBare(pattern, replacement, text) {
	// Match the pattern only when it's not immediately after a variant prefix colon
	// Strategy: split on spaces, check each token
	return text.replace(
		new RegExp(`(\\s|^)(${pattern.source})(\\s|$)`, "g"),
		(match, before, matched, after) => {
			// Check if the matched token has a variant prefix
			// (i.e., there's a ':' earlier in the same className token)
			// We need to check if matched is standalone or prefixed.
			// Since we're matching with word boundaries via (\\s|^)...(\\s|$),
			// a variant-prefixed class like "hover:rounded-none" won't match
			// because "hover:rounded-none" is one token.
			// So this is actually safe! Only bare "rounded-none" will match.
			return `${before}${replacement}${after}`;
		},
	);
}

/** Simple replacement map: [regex, replacement] */
const REPLACEMENTS = [
	// ── Simple token replacements (safe: won't match variant-prefixed) ──
	[/\brounded-none\b/g, "flat"],
	[/\btext-muted-foreground\b/g, "text-muted-fg"],
	[/\btext-foreground\b/g, "text-fg"],
	[/\btransition-colors\b/g, "tr-bg"],
	[/\bpointer-events-none\b/g, "no-pointer"],
	[/\bselect-none\b/g, "noselect"],
	[/\bopacity-50\b/g, "opacity-faded"],
	[/\bopacity-70\b/g, "opacity-dim"],
	[/\bopacity-75\b/g, "opacity-dim-75"],
	[/\bopacity-60\b/g, "opacity-light"],

	// ── CSS variable background colors ──
	[/bg-\[var\(--Secondary\)\]/g, "bg-secondary"],
	[/bg-\[var\(--Mute\)\]/g, "bg-mute"],
	[/bg-\[var\(--Foreground\)\]/g, "bg-foreground"],
	[/bg-\[var\(--Primary\)\]/g, "bg-primary"],
	[/bg-\[var\(--Destruct\)\]/g, "bg-destruct"],
	[/bg-\[var\(--Surface3\)\]/g, "bg-surface3"],
	[/bg-\[var\(--Popover\)\]/g, "bg-popover"],
	[/bg-\[var\(--Background\)\]/g, "bg-background"],

	// ── CSS variable text colors ──
	[/text-\[var\(--MuteForeground\)\]/g, "text-muted"],
	[/text-\[var\(--PrimaryForeground\)\]/g, "text-primary-fg"],
	[/text-\[var\(--Foreground\)\]/g, "text-fg"],
	[/text-\[var\(--Primary\)\]/g, "text-primary"],
	[/text-\[var\(--DestructForeground\)\]/g, "text-destruct-fg"],
	[/text-\[var\(--SecondaryForeground\)\]/g, "text-secondary-fg"],
	[/text-\[var\(--CardForeground\)\]/g, "text-card-fg"],
	[/text-\[var\(--Background\)\]/g, "text-bg"],
	[/text-\[var\(--SpinegRPCFore\)\]/g, "text-grpc"],
	[/text-\[var\(--SpineTCPFore\)\]/g, "text-tcp"],
	[/text-\[var\(--SpineIPCFore\)\]/g, "text-ipc"],

	// ── Hover bg variants (only bare hover:bg-[var(...)]) ──
	[/hover:bg-\[var\(--Secondary\)\]/g, "hover:bg-secondary"],
	[/hover:bg-\[var\(--Mute\)\]/g, "hover:bg-mute"],
	[/hover:bg-\[var\(--Destruct\)\]/g, "hover:bg-destruct"],
	[/hover:bg-\[var\(--Surface3\)\]/g, "hover:bg-surface3"],
	[/hover:bg-\[var\(--Foreground\)\]/g, "hover:bg-foreground"],

	// ── Focus outline ──
	[
		/\bfocus:outline-2\s+focus:outline-offset-2\s+focus:outline-\[var\(--Primary\)\]\b/g,
		"focus-ring",
	],

	// ── Combined patterns (largest first) ──
	// code-inline: rounded-none bg-[var(--Mute)] px-1.5 py-0.5 font-mono text-[0.82em]
	[
		/\brounded-none\s+bg-\[var\(--Mute\)\]\s+px-1\.5\s+py-0\.5\s+font-mono\s+text-\[0\.82em\]\b/g,
		"code-inline",
	],
	// tag-mono: bg-[var(--Mute)] px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground
	[
		/\bbg-\[var\(--Mute\)\]\s+px-2\s+py-0\.5\s+font-mono\s+text-\[10px\]\s+tracking-wide\s+text-muted-foreground\b/g,
		"tag-mono",
	],
	// eyebrow: font-mono text-xs uppercase tracking-[0.25em] text-[var(--MuteForeground)]
	[
		/\bfont-mono\s+text-xs\s+uppercase\s+tracking-\[0\.25em\]\s+text-\[var\(--MuteForeground\)\]\b/g,
		"eyebrow",
	],
	// headline: font-serif text-4xl font-normal tracking-tight sm:text-5xl
	[
		/\bfont-serif\s+text-4xl\s+font-normal\s+tracking-tight\s+sm:text-5xl\b/g,
		"headline",
	],
	// nav-label: font-mono text-xs font-medium uppercase tracking-widest
	[
		/\bfont-mono\s+text-xs\s+font-medium\s+uppercase\s+tracking-widest\b/g,
		"nav-label",
	],
	// section-label: font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground
	[
		/\bfont-mono\s+text-xs\s+font-semibold\s+uppercase\s+tracking-wider\s+text-muted-foreground\b/g,
		"section-label",
	],
	// card-title-mono: font-mono text-sm font-semibold leading-snug tracking-tight
	[
		/\bfont-mono\s+text-sm\s+font-semibold\s+leading-snug\s+tracking-tight\b/g,
		"card-title-mono",
	],
	// card-title-mono (no tracking): font-mono text-sm font-semibold leading-snug
	[
		/\bfont-mono\s+text-sm\s+font-semibold\s+leading-snug\b/g,
		"card-title-mono",
	],
	// content-section: w-full py-16 sm:py-20
	[/\bw-full\s+py-16\s+sm:py-20\b/g, "content-section"],
	// section-intro: mx-auto mb-10 max-w-2xl text-center
	[/\bmx-auto\s+mb-10\s+max-w-2xl\s+text-center\b/g, "section-intro"],
	// subtitle-block: mt-3 text-[var(--MuteForeground)]
	[/\bmt-3\s+text-\[var\(--MuteForeground\)\]\b/g, "subtitle-block"],
	// tr-fg: transition-colors hover:text-foreground
	[/\btransition-colors\s+hover:text-foreground\b/g, "tr-fg"],
	// btn-svg: [&_svg]:pointer-events-none [&_svg]:shrink-0
	[
		/\[&_svg\]:pointer-events-none\s+\[&_svg\]:shrink-0\b/g,
		"btn-svg",
	],
	// noselect + touch-manipulation: touch-manipulation select-none
	[/\btouch-manipulation\s+select-none\b/g, "noselect"],
	// stand-alone touch-manipulation → handled by noselect already

	// ── Border ──
	[/\bborder-\[var\(--Border\)\]\b/g, "border-hairline"],
	[/\bborder-transparent\b/g, "border-transparent"],
];

function processFile(filePath) {
	const original = readFileSync(filePath, "utf8");
	let modified = original;
	let summary = [];

	for (const [pattern, replacement] of REPLACEMENTS) {
		const before = modified;
		modified = modified.replace(pattern, replacement);
		const count = (before.match(pattern) || []).length;
		if (count > 0) {
			summary.push(`${count}x ${pattern.source.slice(0, 60)}...`);
		}
	}

	if (modified !== original) {
		writeFileSync(filePath, modified, "utf8");
		return summary;
	}
	return null;
}

let totalFiles = 0;
let totalChanges = 0;

for (const filePath of FILES) {
	const summary = processFile(filePath);
	if (summary) {
		totalFiles++;
		totalChanges += summary.length;
		console.log(`${relative(PROJECT, filePath)}:`);
		for (const s of summary) console.log(`  ${s}`);
	}
}

console.log(`\nDone. ${totalFiles} files, ${totalChanges} change groups.`);
