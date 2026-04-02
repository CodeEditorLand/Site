import type { AstroIntegration } from "astro";

// Pre-import at module evaluation time (Vite is alive here).
// The astro:build:done hook fires AFTER Vite shuts down, so dynamic
// imports of local modules would fail with "module runner has been closed".
const {
	default: GenerateRouteMap,
	CanonicalPath,
	PascalCaseCanonical,
	SemanticAlias,
	GeneratePathVariant,
} = await import("./Map.js");

const {
	mkdir: MakeDirectory,
	readFile: ReadFile,
	writeFile: WriteFile,
} = await import("node:fs/promises");

const { join: Join, resolve: Resolve } = await import("node:path");

const { fileURLToPath: FileURLToPath } = await import("node:url");

// Build a combined dev-time lookup from the static maps.
// In dev, Astro serves pages at their PascalCase filename path
// (e.g., /Download from Download.astro), so we redirect every variant
// (lowercase, plural, case permutations, semantic aliases) to the
// PascalCase canonical that Astro can actually serve.
const BuildDevVariantMap = (): Record<string, string> => {
	const DevMap: Record<string, string> = {};

	// Generate all variants (plural, case, compound, abbreviation) for
	// each canonical path — same logic the build-time route map uses.
	for (const PascalPath of CanonicalPath) {
		const BuiltPath = PascalPath.toLowerCase();

		// Lowercase built path → PascalCase canonical
		DevMap[BuiltPath] = PascalPath;

		// Full dynamic variants (plural, case permutations, compounds, etc.)
		for (const Variant of GeneratePathVariant(PascalPath, BuiltPath)) {
			if (!DevMap[Variant]) {
				DevMap[Variant] = PascalPath;
			}
		}
	}

	// Map semantic aliases → PascalCase canonical
	for (const [Alias, PascalPath] of Object.entries(SemanticAlias)) {
		DevMap[Alias] = PascalPath;
	}

	return DevMap;
};

const DevVariantMap = BuildDevVariantMap();

// PascalCase canonicals that have a real built page behind them
const CanonicalToBuilt: Record<string, string> = {};

for (const [BuiltPath, PascalPath] of Object.entries(PascalCaseCanonical)) {
	CanonicalToBuilt[PascalPath] = BuiltPath;
}

const RouteRedirectIntegration = (): AstroIntegration => ({
	name: "RouteRedirect",

	hooks: {
		// ── Dev server: Vite middleware for route redirects ──
		"astro:server:setup": ({ server, logger }) => {
			server.middlewares.use(
				(
					Request: import("http").IncomingMessage,
					Response: import("http").ServerResponse,
					Next: () => void,
				) => {
					const RawPath = Request.url ?? "/";

					// Strip query string for matching
					const PathOnly = RawPath.split("?")[0]!;

					const Cleaned =
						PathOnly === "/" ? "/" : PathOnly.replace(/\/+$/, "");

					// In dev, Astro serves pages at their PascalCase filename
					// path (e.g., /Download from Download.astro), so PascalCase
					// canonicals need no rewrite — just pass through.

					// Check if this is a variant that should redirect
					const Target = DevVariantMap[Cleaned];

					if (Target && Target !== Cleaned) {
						const Query = RawPath.includes("?")
							? "?" + RawPath.split("?")[1]
							: "";

						logger.info(`[dev] Redirecting ${Cleaned} → ${Target}`);

						Response.writeHead(302, {
							Location: Target + Query,
						});

						Response.end();

						return;
					}

					Next();
				},
			);
		},

		"astro:build:done": async ({ dir, logger }) => {
			const OutputDirectory = FileURLToPath(dir);

			logger.info("Generating route map...");

			// ── 1. Generate route map ──

			const RouteMap = await GenerateRouteMap(OutputDirectory);

			logger.info(
				`Found ${RouteMap.Canonical.length} canonical routes, ${Object.keys(RouteMap.Variant).length} variant mappings`,
			);

			// ── 2. Write route map JSON ──
			// Served statically for 404 page script to fetch

			const RouteMapPath = Join(OutputDirectory, "RouteMap.json");

			await WriteFile(
				RouteMapPath,
				JSON.stringify(RouteMap, null, "\t"),
				"utf-8",
			);

			logger.info("Wrote RouteMap.json");

			// ── 3. Create PascalCase URL directories ──
			// For each PascalCase canonical that differs from the built path,
			// copy the built HTML to the PascalCase path so static hosting
			// serves the page at both URLs. The SW/CF then redirects variants
			// to the PascalCase canonical.
			//
			// E.g., /downloads/index.html → also copied to /Download/index.html

			for (const [BuiltPath, PascalPath] of Object.entries(
				RouteMap.Variant,
			)) {
				// Only process actual built paths (lowercase) → PascalCase
				// Skip semantic aliases and other variants
				if (
					!BuiltPath.startsWith("/") ||
					!RouteMap.Canonical.includes(PascalPath) ||
					PascalPath === "/"
				) {
					continue;
				}

				// Check if the built path has an actual HTML file
				const BuiltHTMLPath = Join(
					OutputDirectory,
					BuiltPath.slice(1),
					"index.html",
				);

				let BuiltHTML: string;

				try {
					BuiltHTML = await ReadFile(BuiltHTMLPath, "utf-8");
				} catch {
					continue;
				}

				// Create PascalCase directory and copy HTML
				const PascalDirectory = Join(
					OutputDirectory,
					PascalPath.slice(1),
				);

				try {
					await MakeDirectory(PascalDirectory, { recursive: true });

					await WriteFile(
						Join(PascalDirectory, "index.html"),
						BuiltHTML,
						"utf-8",
					);

					logger.info(
						`Copied ${BuiltPath} → ${PascalPath}/index.html`,
					);
				} catch (_Error) {
					logger.warn(
						`Failed to copy ${BuiltPath} → ${PascalPath}: ${_Error}`,
					);
				}
			}

			// ── 4. Build service worker with esbuild ──
			// esbuild properly strips all TypeScript types (type annotations,
			// generics, declare statements, reference directives) and substitutes
			// build-time constants via `define`. The previous text-based regex
			// approach left stray `: TypeName` annotations causing SW parse errors.

			const ServiceWorkerSourcePath = Resolve(
				FileURLToPath(import.meta.url),
				"..",
				"ServiceWorker.ts",
			);

			let ServiceWorkerSource: string;

			try {
				ServiceWorkerSource = await ReadFile(
					ServiceWorkerSourcePath,
					"utf-8",
				);
			} catch (_Error) {
				logger.error(`Could not read ServiceWorker.ts: ${_Error}`);

				return;
			}

			const { transform: ESBuildTransform } = await import("esbuild");

			const ESBuildResult = await ESBuildTransform(ServiceWorkerSource, {
				loader: "ts",
				platform: "browser",
				target: ["chrome110", "safari16", "firefox115"],
				define: {
					__DEV__: "false",
					__INCREMENT__: JSON.stringify(String(Date.now())),
					__ROUTE_MAP_CANONICAL__: JSON.stringify(RouteMap.Canonical),
					__ROUTE_MAP_VARIANT__: JSON.stringify(RouteMap.Variant),
				},
				sourcemap: false,
				minify: false,
			});

			// Remove the `export default {}` stub — present only for TS module
			// compatibility, not valid in a classic service worker script context.
			const ServiceWorkerCode =
				ESBuildResult.code
					.replace(/^export\s+default\s+\{\s*\};\s*$/m, "")
					.trimEnd() + "\n";

			const ServiceWorkerPath = Join(
				OutputDirectory,
				"service-worker.js",
			);

			await WriteFile(ServiceWorkerPath, ServiceWorkerCode, "utf-8");

			logger.info("Wrote service-worker.js (compiled with esbuild)");

			// ── 5. Cloudflare _redirects ──
			// Public/_redirects uses 200 (rewrite) rules, NOT 301 redirects.
			// 200 rewrites serve directory content directly, preventing CF Pages'
			// internal trailing-slash 301 from firing before [[Path]].ts can strip
			// it — which was the source of the /Account/SignIn ↔ /Account/SignIn/
			// infinite redirect loop.
			// The [[Path]].ts edge function still handles all variant → canonical
			// redirects (case-insensitive, semantic aliases, etc.) with correct
			// case-sensitive logic before _redirects is consulted.

			// ── 6. Post-process sitemap for PascalCase URLs ──
			// @astrojs/sitemap generates URLs from built pages (lowercase).
			// Replace lowercase paths with PascalCase canonicals so Google
			// indexes the correct URL form.

			const SitemapFile = ["sitemap-0.xml", "sitemap-index.xml"];

			for (const FileName of SitemapFile) {
				const SitemapPath = Join(OutputDirectory, FileName);

				try {
					let SitemapContent = await ReadFile(SitemapPath, "utf-8");

					let ReplacementCount = 0;

					for (const [BuiltPath, PascalPath] of Object.entries(
						PascalCaseCanonical,
					)) {
						// Replace <loc>https://editor.land/downloads</loc>
						// with    <loc>https://editor.land/Download</loc>
						// Also handle trailing slashes and bare paths
						const Pattern = new RegExp(
							`(<loc>[^<]*?)${BuiltPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(/?)(<\\/loc>)`,
							"g",
						);

						const Before = SitemapContent;

						SitemapContent = SitemapContent.replace(
							Pattern,
							`$1${PascalPath}$3`,
						);

						if (SitemapContent !== Before) {
							ReplacementCount++;
						}
					}

					if (ReplacementCount > 0) {
						await WriteFile(SitemapPath, SitemapContent, "utf-8");

						logger.info(
							`Fixed ${ReplacementCount} URLs in ${FileName} to PascalCase`,
						);
					}
				} catch {
					// Sitemap file doesn't exist — @astrojs/sitemap might
					// not be installed or hasn't run yet
				}
			}
		},
	},
});

export default RouteRedirectIntegration;
