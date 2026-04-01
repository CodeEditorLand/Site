/**
 * Astro integration that generates the route map, builds the custom service
 * worker with embedded routing, and writes Cloudflare _redirects.
 *
 * Hooks into `astro:build:done` so all pages are already rendered.
 */

import type { AstroIntegration } from "astro";

const RouteRedirectIntegration = (): AstroIntegration => ({
	name: "RouteRedirect",

	hooks: {
		"astro:build:done": async ({ dir, logger }) => {
			const { readFile: ReadFile, writeFile: WriteFile } = await import(
				"node:fs/promises"
			);
			const { join: Join, resolve: Resolve } = await import("node:path");
			const { fileURLToPath: FileURLToPath } = await import("node:url");

			const OutputDirectory = FileURLToPath(dir);

			logger.info("Generating route map...");

			// 1. Generate route map
			const GenerateRouteMap = (await import("./Map.js")).default;
			const RouteMap = await GenerateRouteMap(OutputDirectory);

			logger.info(
				`Found ${RouteMap.Canonical.length} canonical routes, ${Object.keys(RouteMap.Variant).length} variant mappings`,
			);

			// 2. Write route map JSON (for 404 page script to fetch)
			const RouteMapPath = Join(OutputDirectory, "RouteMap.json");

			await WriteFile(
				RouteMapPath,
				JSON.stringify(RouteMap, null, "\t"),
				"utf-8",
			);

			logger.info("Wrote RouteMap.json");

			// 3. Build custom service worker from template
			const TemplatePath = Resolve(
				FileURLToPath(import.meta.url),
				"..",
				"ServiceWorker.ts",
			);

			let ServiceWorkerSource: string;

			try {
				ServiceWorkerSource = await ReadFile(TemplatePath, "utf-8");
			} catch {
				// Fallback: try the compiled .js version
				const CompiledPath = TemplatePath.replace(/\.ts$/, ".js");

				ServiceWorkerSource = await ReadFile(CompiledPath, "utf-8");
			}

			// Strip TypeScript-only syntax for the raw JS output
			let ServiceWorkerCode = ServiceWorkerSource
				// Remove type imports and declarations
				.replace(
					/^declare const self: ServiceWorkerGlobalScope;$/m,
					"",
				)
				.replace(/: Set<string>/g, "")
				.replace(/: Record<string, string>/g, "")
				.replace(/: string \| null/g, "")
				.replace(/: string/g, "")
				.replace(/: FetchEvent/g, "")
				.replace(/: ExtendableEvent/g, "")
				// Remove block comments (the JSDoc headers)
				.replace(/\/\*\*[\s\S]*?\*\//g, "")
				// Remove single-line TS comments that reference types
				.replace(/\/\/.*@ts.*$/gm, "");

			// Inject route data
			ServiceWorkerCode = ServiceWorkerCode
				.replace(
					"__ROUTE_MAP_CANONICAL__",
					JSON.stringify(RouteMap.Canonical),
				)
				.replace(
					"__ROUTE_MAP_VARIANT__",
					JSON.stringify(RouteMap.Variant),
				);

			// Read existing Workbox service worker if present
			const ExistingServiceWorkerPath = Join(
				OutputDirectory,
				"service-worker.js",
			);

			let WorkboxCode = "";

			try {
				const ExistingCode = await ReadFile(
					ExistingServiceWorkerPath,
					"utf-8",
				);

				// Extract the Workbox precache+route call
				const PrecacheMatch = ExistingCode.match(
					/e\.precacheAndRoute\([^)]+\)/,
				);

				if (PrecacheMatch) {
					WorkboxCode = `\n// Workbox precache (preserved from astrojs-service-worker)\n// ${PrecacheMatch[0]}\n`;
				}
			} catch {
				// No existing service worker — that's fine
			}

			ServiceWorkerCode = ServiceWorkerCode.replace(
				"// __WORKBOX_PRECACHE_PLACEHOLDER__",
				WorkboxCode,
			);

			// Write the custom service worker
			await WriteFile(
				ExistingServiceWorkerPath,
				ServiceWorkerCode,
				"utf-8",
			);

			logger.info("Wrote custom service-worker.js with route redirect");

			// 4. Generate Cloudflare _redirects file
			const RedirectLine: string[] = [];

			for (const [VariantPath, CanonicalPath] of Object.entries(
				RouteMap.Variant,
			)) {
				// Only add if the variant looks like a real URL path
				if (
					VariantPath.startsWith("/") &&
					VariantPath !== CanonicalPath
				) {
					RedirectLine.push(`${VariantPath} ${CanonicalPath} 301`);
				}
			}

			// Add trailing-slash redirects for all canonical paths
			for (const CanonicalPath of RouteMap.Canonical) {
				if (CanonicalPath !== "/") {
					RedirectLine.push(
						`${CanonicalPath}/ ${CanonicalPath} 301`,
					);
				}
			}

			const RedirectContent = RedirectLine.join("\n") + "\n";
			const RedirectPath = Join(OutputDirectory, "_redirects");

			await WriteFile(RedirectPath, RedirectContent, "utf-8");

			logger.info(
				`Wrote _redirects with ${RedirectLine.length} redirect rules`,
			);
		},
	},
});

export default RouteRedirectIntegration;
