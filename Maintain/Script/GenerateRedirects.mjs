#!/usr/bin/env node
// Regenerates Public/_redirects and Target/_redirects using the simplified
// variant strategy from Source/Function/Route/Map.ts.
// Run with:  node Maintain/Script/GenerateRedirects.mjs

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const Root = new URL("../../", import.meta.url);
const resolve = (rel) => fileURLToPath(new URL(rel, Root));

// ─── Canonical paths (mirror of Map.ts) ───────────────────────────────────

const CanonicalPath = new Set([
	"/Download",
	"/Doc",
	"/Blog",
	"/Portal",
	"/Dashboard",
	"/Contributing",
	"/License",
	"/Verify",
	"/Contact/Sale",
	"/Account",
	"/Account/SignIn",
	"/Account/SignUp",
	"/Account/ForgotPassword",
	"/Account/ResetPassword",
	"/Legal/Term",
	"/Legal/Privacy",
	"/OAuth/Success",
]);

const SemanticAlias = {
	"/downloads": "/Download",
	"/down": "/Download",
	"/get": "/Download",
	"/fetch": "/Download",
	"/install": "/Download",
	"/setup": "/Download",
	"/documentation": "/Doc",
	"/reference": "/Doc",
	"/help": "/Doc",
	"/guide": "/Doc",
	"/manual": "/Doc",
	"/api": "/Doc",
	"/login": "/Account/SignIn",
	"/log-in": "/Account/SignIn",
	"/sign-in": "/Account/SignIn",
	"/authenticate": "/Account/SignIn",
	"/auth": "/Account/SignIn",
	"/register": "/Account/SignUp",
	"/sign-up": "/Account/SignUp",
	"/join": "/Account/SignUp",
	"/create-account": "/Account/SignUp",
	"/forgot-password": "/Account/ForgotPassword",
	"/forgot": "/Account/ForgotPassword",
	"/password-reset": "/Account/ForgotPassword",
	"/recover": "/Account/ForgotPassword",
	"/recover-password": "/Account/ForgotPassword",
	"/reset-password": "/Account/ResetPassword",
	"/reset": "/Account/ResetPassword",
	"/new-password": "/Account/ResetPassword",
	"/change-password": "/Account/ResetPassword",
	"/tos": "/Legal/Term",
	"/terms-of-service": "/Legal/Term",
	"/eula": "/Legal/Term",
	"/conditions": "/Legal/Term",
	"/privacy-policy": "/Legal/Privacy",
	"/gdpr": "/Legal/Privacy",
	"/data-policy": "/Legal/Privacy",
	"/sale": "/Contact/Sale",
	"/sales-contact": "/Contact/Sale",
	"/contact-sales": "/Contact/Sale",
	"/pricing": "/Contact/Sale",
	"/enterprise": "/Contact/Sale",
	"/buy": "/Contact/Sale",
	"/contribute": "/Contributing",
	"/contributors": "/Contributing",
	"/dev": "/Contributing",
	"/develop": "/Contributing",
	"/opensource": "/Contributing",
	"/open-source": "/Contributing",
	"/home": "/",
	"/main": "/",
	"/index": "/",
	"/start": "/",
	"/welcome": "/",
	"/visit": "/",
	"/verify-email": "/Verify",
	"/email-verification": "/Verify",
	"/confirm": "/Verify",
	"/confirm-email": "/Verify",
	"/activate": "/Verify",
	"/app": "/Portal",
	"/launch": "/Portal",
	"/open": "/Portal",
	"/panel": "/Dashboard",
	"/admin": "/Dashboard",
	"/overview": "/Dashboard",
	"/mit": "/License",
	"/licensing": "/License",
	"/news": "/Blog",
	"/articles": "/Blog",
	"/posts": "/Blog",
	"/updates": "/Blog",
	"/changelog": "/Blog",
	"/callback": "/OAuth/Success",
	"/oauth-callback": "/OAuth/Success",
	"/auth-callback": "/OAuth/Success",
};

// ─── Variant generators (simplified - no progressive casing, no abbrev prefixes) ─

const segmentCases = (seg) => {
	const lower = seg.toLowerCase();
	const upper = seg.toUpperCase();
	const title = seg.charAt(0).toUpperCase() + seg.slice(1).toLowerCase();
	return [...new Set([lower, upper, seg, title])];
};

const segmentNumber = (lower) => {
	const r = new Set([lower]);
	if (lower.endsWith("ies") && lower.length > 4)
		r.add(lower.slice(0, -3) + "y");
	else if (/(?:ses|xes|zes|ches|shes)$/.test(lower))
		r.add(lower.slice(0, -2));
	else if (
		lower.endsWith("s") &&
		!/(?:ss|us|is)$/.test(lower) &&
		lower.length > 2
	)
		r.add(lower.slice(0, -1));
	if (!lower.endsWith("s")) r.add(lower + "s");
	return [...r];
};

const segmentCompound = (seg) => {
	const words = seg.match(/[A-Z][a-z]*/g);
	if (!words || words.length < 2) return [];
	const lower = words.map((w) => w.toLowerCase());
	return [lower.join("-"), lower.join("_"), lower.join(""), lower.join(".")];
};

const generateVariants = (canonical) => {
	if (canonical === "/") return [];
	const segs = canonical.slice(1).split("/");
	const result = new Set();

	if (segs.length === 1) {
		const seg = segs[0];
		const lower = seg.toLowerCase();
		for (const c of segmentCases(seg)) result.add("/" + c);
		for (const n of segmentNumber(lower)) {
			result.add("/" + n);
			result.add("/" + n.toUpperCase());
		}
		for (const v of segmentCompound(seg)) result.add("/" + v);
	} else {
		const lowerSegs = segs.map((s) => s.toLowerCase());
		result.add("/" + lowerSegs.join("/"));
		result.add("/" + segs.map((s) => s.toUpperCase()).join("/"));

		for (let i = 0; i < segs.length; i++) {
			const seg = segs[i];
			for (const c of segmentCases(seg)) {
				const parts = [...lowerSegs];
				parts[i] = c;
				result.add("/" + parts.join("/"));
			}
			for (const v of segmentCompound(seg)) {
				const parts = [...lowerSegs];
				parts[i] = v;
				result.add("/" + parts.join("/"));
			}
		}

		result.add("/" + lowerSegs.join(""));
		result.add("/" + lowerSegs.join("-"));
		result.add("/" + lowerSegs.join("_"));
	}

	for (const p of [...result]) {
		if (!p.endsWith("/")) result.add(p + "/");
	}

	result.delete(canonical);
	return [...result];
};

// ─── Build the variant map ────────────────────────────────────────────────

const BarePathDispatcher = [
	["/Legal", "/Legal/Term"],
	["/Contact", "/Contact/Sale"],
];

const AssetPrefix = [
	["/_astro/*", "/_astro/:splat"],
	["/Asset/*", "/Asset/:splat"],
	["/Dark/*", "/Dark/:splat"],
	["/Favicon/*", "/Favicon/:splat"],
	["/Image/*", "/Image/:splat"],
	["/OpenGraph/*", "/OpenGraph/:splat"],
];

const AssetFile = [
	"/OpenGraph.svg",
	"/RouteMap.json",
	"/Worker.js",
	"/sitemap-index.xml",
	"/sitemap-0.xml",
	"/robots.txt",
];

// Collect variant → canonical pairs
const variantMap = new Map();
const canonicalSet = new Set([...CanonicalPath, "/"]);
const barePathSources = new Set(
	BarePathDispatcher.flatMap(([s]) => [s, s + "/"]),
);

for (const canonical of CanonicalPath) {
	for (const variant of generateVariants(canonical)) {
		if (!variantMap.has(variant) && !canonicalSet.has(variant)) {
			variantMap.set(variant, canonical);
		}
	}
}

// Semantic aliases (as-is, plus trailing slash)
for (const [alias, target] of Object.entries(SemanticAlias)) {
	if (target === "/" || canonicalSet.has(target)) {
		if (!variantMap.has(alias) && !barePathSources.has(alias)) {
			variantMap.set(alias, target);
		}
		const withSlash = alias + "/";
		if (!variantMap.has(withSlash) && !barePathSources.has(withSlash)) {
			variantMap.set(withSlash, target);
		}
	}
}

// All-lowercase variants of every canonical (belt-and-suspenders for deep paths)
for (const canonical of CanonicalPath) {
	const lower = canonical.toLowerCase();
	if (lower !== canonical && !variantMap.has(lower)) {
		variantMap.set(lower, canonical);
	}
	const lowerSlash = lower + "/";
	if (!variantMap.has(lowerSlash)) {
		variantMap.set(lowerSlash, canonical);
	}
}

// Sort
const sorted = [...variantMap.entries()].sort(([a], [b]) => a.localeCompare(b));

// ─── Render ───────────────────────────────────────────────────────────────

const pad = (v, w) => v + " ".repeat(Math.max(1, w - v.length));

const lines = [];

lines.push("# Cloudflare Pages - full route map (auto-generated)");
lines.push("#");
lines.push("# All rules use 200 (rewrite) to serve content directly.");
lines.push(
	"# This prevents the service worker from breaking on redirect chains.",
);
lines.push("");

// Bare-path dispatchers
lines.push("# ── BARE-PATH DISPATCHERS (200) ──");
for (const [source, target] of BarePathDispatcher) {
	lines.push(`${pad(source, 26)}${pad(target + "/", 26)}200`);
	lines.push(`${pad(source + "/", 26)}${pad(target + "/", 26)}200`);
}
lines.push("");

// Variant rewrites
lines.push(
	`# ── VARIANT REWRITES (200) - ${sorted.length} rules ──`,
);
lines.push(
	"# kebab-case, lowerCase, UPPERCASE, TitleCase, plural/singular, flat forms → canonical.",
);
for (const [source, target] of sorted) {
	const dest = target === "/" ? "/" : target + "/";
	lines.push(`${pad(source, 38)}${pad(dest, 38)}200`);
}
lines.push("");

// Trailing-slash rewrites for canonicals
lines.push("# ── TRAILING-SLASH REWRITES (200) ──");
lines.push("# One rule per canonical page.");
const sortedCanonicals = [...CanonicalPath].sort();
for (const path of ["/", ...sortedCanonicals]) {
	const dest = path === "/" ? "/" : path + "/";
	if (!dest.endsWith("//")) {
		lines.push(`${pad(path, 38)}${pad(dest, 38)}200`);
	}
}
lines.push("");

// Asset pass-throughs
lines.push("# ── ASSET PASS-THROUGHS (200) ──");
for (const [from, to] of AssetPrefix) {
	lines.push(`${pad(from, 26)}${pad(to, 26)}200`);
}
for (const file of AssetFile) {
	lines.push(`${pad(file, 26)}${pad(file, 26)}200`);
}
lines.push("");

// Catch-all
lines.push("# ── CATCH-ALL → Visit ──");
lines.push(`${pad("/*", 26)}${pad("/Visit/", 26)}200`);
lines.push("");

const content = lines.join("\n");

// Write to both locations
const targets = [
	resolve("Public/_redirects"),
	resolve("Target/_redirects"),
];

for (const dest of targets) {
	try {
		mkdirSync(dirname(dest), { recursive: true });
		writeFileSync(dest, content, "utf8");
		console.log(
			`Written ${content.split("\n").length} lines → ${dest.replace(resolve(""), "")}`,
		);
	} catch (err) {
		console.error(`Failed to write ${dest}: ${err.message}`);
	}
}

console.log(
	`\nTotal rules: ${sorted.length} variants + ${BarePathDispatcher.length * 2} dispatchers + ${sortedCanonicals.length + 1} canonicals + ${AssetPrefix.length + AssetFile.length} assets + 1 catch-all`,
);
