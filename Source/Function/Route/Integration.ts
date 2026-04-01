import type { AstroIntegration } from "astro";

// Pre-import at module evaluation time (Vite is alive here).
// The astro:build:done hook fires AFTER Vite shuts down, so dynamic
// imports of local modules would fail with "module runner has been closed".
const {
	default: GenerateRouteMap,
	PascalCaseCanonical,
	SemanticAlias,
} = await import("./Map.js");

const {
	mkdir: MakeDirectory,
	readFile: ReadFile,
	writeFile: WriteFile,
} = await import("node:fs/promises");

const { join: Join, resolve: Resolve } = await import("node:path");

const { fileURLToPath: FileURLToPath } = await import("node:url");

// Build a combined dev-time lookup from the static maps.
// In dev, Astro serves pages at their built paths (e.g., /downloads),
// so we redirect variants to the built path that Astro can serve,
// AND we redirect built paths to PascalCase canonical URLs.
const BuildDevVariantMap = (): Record<string, string> => {
	const DevMap: Record<string, string> = {};

	// Reverse lookup: PascalCase canonical → built path (for serving)
	const CanonicalToBuilt: Record<string, string> = {};

	for (const [BuiltPath, PascalPath] of Object.entries(
		PascalCaseCanonical,
	)) {
		CanonicalToBuilt[PascalPath] = BuiltPath;
	}

	// Map built paths → PascalCase canonical (redirect /downloads → /Download)
	for (const [BuiltPath, PascalPath] of Object.entries(
		PascalCaseCanonical,
	)) {
		if (BuiltPath !== PascalPath.toLowerCase()) {
			DevMap[BuiltPath] = PascalPath;
		}

		DevMap[BuiltPath] = PascalPath;
	}

	// Map semantic aliases → PascalCase canonical
	for (const [Alias, PascalPath] of Object.entries(SemanticAlias)) {
		DevMap[Alias] = PascalPath;
	}

	// Map UPPERCASE variants → PascalCase canonical
	for (const [BuiltPath, PascalPath] of Object.entries(
		PascalCaseCanonical,
	)) {
		DevMap[BuiltPath.toUpperCase()] = PascalPath;
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
						PathOnly === "/"
							? "/"
							: PathOnly.replace(/\/+$/, "");

					// Check if this path is a PascalCase canonical that
					// needs to be rewritten to the actual built page
					if (CanonicalToBuilt[Cleaned]) {
						logger.info(
							`[dev] Rewriting ${Cleaned} → ${CanonicalToBuilt[Cleaned]}`,
						);

						Request.url = RawPath.replace(
							PathOnly,
							CanonicalToBuilt[Cleaned],
						);

						Next();

						return;
					}

					// Check if this is a variant that should redirect
					const Target = DevVariantMap[Cleaned];

					if (Target && Target !== Cleaned) {
						const Query = RawPath.includes("?")
							? "?" + RawPath.split("?")[1]
							: "";

						logger.info(
							`[dev] Redirecting ${Cleaned} → ${Target}`,
						);

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

			// ── 4. Build service worker ──
			// Read the compiled ServiceWorker.js template and inject route data

			const TemplateDirectory = Resolve(
				FileURLToPath(import.meta.url),
				"..",
			);

			let ServiceWorkerSource: string;

			try {
				ServiceWorkerSource = await ReadFile(
					Join(TemplateDirectory, "ServiceWorker.js"),
					"utf-8",
				);
			} catch {
				try {
					ServiceWorkerSource = await ReadFile(
						Join(TemplateDirectory, "ServiceWorker.ts"),
						"utf-8",
					);
				} catch (_Error) {
					logger.error(
						`Could not read ServiceWorker template: ${_Error}`,
					);

					return;
				}
			}

			// Strip TypeScript declarations for raw JS output
			let ServiceWorkerCode = ServiceWorkerSource
				.replace(/^declare var self.*$/m, "")
				.replace(/^declare const __DEV__.*$/m, "")
				.replace(/^declare const __INCREMENT__.*$/m, "")
				.replace(/^declare const __ROUTE_MAP_CANONICAL__.*$/m, "")
				.replace(/^declare const __ROUTE_MAP_VARIANT__.*$/m, "")
				.replace(
					/^import type.*$/gm,
					"",
				)
				.replace(/^export interface.*\{[\s\S]*?\}$/gm, "")
				.replace(/: Set<string>/g, "")
				.replace(/: Record<string, string>/g, "")
				.replace(/: string \| null/g, "")
				.replace(/: string/g, "")
				.replace(/: any\[\]/g, "")
				.replace(/^export default \{\};$/m, "");

			// Inject route data + build constants
			ServiceWorkerCode = ServiceWorkerCode
				.replace(
					"__ROUTE_MAP_CANONICAL__",
					JSON.stringify(RouteMap.Canonical),
				)
				.replace(
					"__ROUTE_MAP_VARIANT__",
					JSON.stringify(RouteMap.Variant),
				)
				.replace(
					/__INCREMENT__/g,
					JSON.stringify(`Route-${Date.now()}`),
				)
				.replace(/__DEV__/g, "false");

			const ServiceWorkerPath = Join(
				OutputDirectory,
				"service-worker.js",
			);

			await WriteFile(ServiceWorkerPath, ServiceWorkerCode, "utf-8");

			logger.info(
				"Wrote service-worker.js with route redirect + cache",
			);

			// ── 5. Generate Cloudflare _redirects ──

			const RedirectLine: string[] = [];

			for (const [VariantPath, CanonicalPath] of Object.entries(
				RouteMap.Variant,
			)) {
				if (
					VariantPath.startsWith("/") &&
					VariantPath !== CanonicalPath
				) {
					RedirectLine.push(`${VariantPath} ${CanonicalPath} 301`);
				}
			}

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
				`Wrote _redirects with ${RedirectLine.length} rules`,
			);
		},
	},
});

export default RouteRedirectIntegration;
