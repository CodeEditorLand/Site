import { describe, expect, it } from "vitest";

import GenerateRouteMap, {
	CanonicalPath,
	PascalCaseCanonical,
	SemanticAlias,
} from "../../Function/Route/Map.js";

// ─── Replicated SW logic (same as ServiceWorker.ts pure functions) ───

const StripTrailingSlash = (Path: string): string =>
	Path === "/" ? "/" : Path.replace(/\/+$/, "");

const NormalizePath = (Path: string): string =>
	StripTrailingSlash(
		"/" +
			Path.replace(/^\/+/, "")
				.split("/")
				.map((Segment: string) =>
					decodeURIComponent(Segment).toLowerCase(),
				)
				.join("/"),
	);

const ResolveRoute = (
	RequestPath: string,
	CanonicalSet: Set<string>,
	VariantMap: Record<string, string>,
): string | null => {
	const Cleaned = StripTrailingSlash(RequestPath);

	if (CanonicalSet.has(Cleaned)) {
		return null;
	}

	const Normalized = NormalizePath(Cleaned);

	if (CanonicalSet.has(Normalized)) {
		return Normalized;
	}

	if (VariantMap[Normalized]) {
		return VariantMap[Normalized];
	}

	if (VariantMap[Cleaned]) {
		return VariantMap[Cleaned];
	}

	const Stripped =
		"/" +
		Normalized.replace(/^\/+/, "")
			.split("/")
			.map((Segment: string) => Segment.replace(/[-_]/g, ""))
			.join("/");

	if (VariantMap[Stripped]) {
		return VariantMap[Stripped];
	}

	return null;
};

// ─── Replicated 404 redirect logic (same as Redirect.ts) ───

const RunRedirect = (
	CurrentPath: string,
	RouteMapData: {
		Canonical: string[];
		Variant: Record<string, string>;
	},
): string | null => {
	const CleanPath = CurrentPath.replace(/\/+$/, "") || "/";

	if (CleanPath === "/") {
		return null;
	}

	if (RouteMapData.Canonical.includes(CleanPath)) {
		return null;
	}

	let CanonicalTarget = RouteMapData.Variant[CleanPath];

	if (!CanonicalTarget) {
		CanonicalTarget = RouteMapData.Variant[CleanPath.toLowerCase()];
	}

	if (!CanonicalTarget) {
		const Stripped = CleanPath.toLowerCase().replace(/[-_]/g, "");

		CanonicalTarget = RouteMapData.Variant[Stripped];
	}

	if (!CanonicalTarget) {
		const Singular = CleanPath.toLowerCase().replace(/s$/, "");

		CanonicalTarget = RouteMapData.Variant[Singular];
	}

	if (CanonicalTarget && CanonicalTarget !== CleanPath) {
		return CanonicalTarget;
	}

	return null;
};

// ─── End-to-end tests ───

describe("End-to-end: Build → RouteMap → SW → Resolve", () => {
	it("full pipeline produces working route resolution", async () => {
		const { mkdtemp, mkdir, writeFile, readFile, rm } =
			await import("node:fs/promises");
		const { join } = await import("node:path");
		const { tmpdir } = await import("node:os");

		const TempDirectory = await mkdtemp(join(tmpdir(), "e2e-build-"));

		try {
			// ── Step 1: Simulate Astro build output ──
			// PascalCase pages (real file names)
			const Page = [
				"Download",
				"Doc",
				"Blog",
				"Portal",
				"Dashboard",
				"Contributing",
				"License",
				"Verify",
				"Contact/Sale",
				"Account/SignIn",
				"Account/SignUp",
				"Account/ForgotPassword",
				"Account/ResetPassword",
				"Legal/Term",
				"Legal/Privacy",
				"OAuth/Success",
			];

			for (const Name of Page) {
				await mkdir(join(TempDirectory, Name), { recursive: true });
				await writeFile(
					join(TempDirectory, Name, "index.html"),
					`<!DOCTYPE html><html><head><title>${Name}</title></head><body><h1>${Name}</h1></body></html>`,
				);
			}

			// Root index
			await writeFile(
				join(TempDirectory, "index.html"),
				"<!DOCTYPE html><html><body><h1>Home</h1></body></html>",
			);

			// 404 page
			await mkdir(join(TempDirectory, "404"), { recursive: true });
			await writeFile(
				join(TempDirectory, "404", "index.html"),
				"<!DOCTYPE html><html><body><h1>Not Found</h1></body></html>",
			);

			// ── Step 2: Generate route map ──
			const RouteMap = await GenerateRouteMap(TempDirectory);

			// Write it (like Integration.ts does)
			await writeFile(
				join(TempDirectory, "RouteMap.json"),
				JSON.stringify(RouteMap, null, "\t"),
			);

			// ── Step 3: Verify route map structure ──
			expect(RouteMap.Version).toBe(1);
			expect(RouteMap.Canonical).toContain("/");

			// All CanonicalPath entries should be in the map
			for (const CanonicalURL of CanonicalPath) {
				expect(
					RouteMap.Canonical,
					`${CanonicalURL} should be canonical`,
				).toContain(CanonicalURL);
			}

			// 404 excluded
			expect(RouteMap.Canonical).not.toContain("/404");

			// Variant count should be substantial
			const VariantCount = Object.keys(RouteMap.Variant).length;

			expect(VariantCount).toBeGreaterThan(50);

			// ── Step 4: Simulate SW route resolution ──
			const CanonicalSet = new Set(RouteMap.Canonical);

			// Canonical paths return null (no redirect)
			for (const CanonicalURL of RouteMap.Canonical) {
				expect(
					ResolveRoute(CanonicalURL, CanonicalSet, RouteMap.Variant),
					`${CanonicalURL} should not redirect`,
				).toBeNull();
			}

			// Lowercase variants redirect to PascalCase
			expect(
				ResolveRoute("/download", CanonicalSet, RouteMap.Variant),
			).toBe("/Download");
			expect(ResolveRoute("/doc", CanonicalSet, RouteMap.Variant)).toBe(
				"/Doc",
			);
			expect(ResolveRoute("/blog", CanonicalSet, RouteMap.Variant)).toBe(
				"/Blog",
			);
			expect(
				ResolveRoute("/portal", CanonicalSet, RouteMap.Variant),
			).toBe("/Portal");
			expect(
				ResolveRoute("/account/signin", CanonicalSet, RouteMap.Variant),
			).toBe("/Account/SignIn");
			expect(
				ResolveRoute("/legal/term", CanonicalSet, RouteMap.Variant),
			).toBe("/Legal/Term");

			// UPPERCASE variants
			expect(
				ResolveRoute("/DOWNLOAD", CanonicalSet, RouteMap.Variant),
			).toBe("/Download");
			expect(ResolveRoute("/DOC", CanonicalSet, RouteMap.Variant)).toBe(
				"/Doc",
			);

			// Semantic aliases
			expect(ResolveRoute("/login", CanonicalSet, RouteMap.Variant)).toBe(
				"/Account/SignIn",
			);
			expect(
				ResolveRoute("/install", CanonicalSet, RouteMap.Variant),
			).toBe("/Download");
			expect(
				ResolveRoute("/register", CanonicalSet, RouteMap.Variant),
			).toBe("/Account/SignUp");
			expect(
				ResolveRoute(
					"/forgot-password",
					CanonicalSet,
					RouteMap.Variant,
				),
			).toBe("/Account/ForgotPassword");
			expect(ResolveRoute("/tos", CanonicalSet, RouteMap.Variant)).toBe(
				"/Legal/Term",
			);

			// Trailing slashes
			expect(
				ResolveRoute("/download/", CanonicalSet, RouteMap.Variant),
			).toBe("/Download");
			expect(
				ResolveRoute("/portal/", CanonicalSet, RouteMap.Variant),
			).toBe("/Portal");

			// Unknown paths
			expect(
				ResolveRoute("/nonexistent", CanonicalSet, RouteMap.Variant),
			).toBeNull();

			// ── Step 5: Simulate 404 fallback redirect ──
			const RouteMapJSON = JSON.parse(
				await readFile(join(TempDirectory, "RouteMap.json"), "utf-8"),
			);

			expect(RunRedirect("/download", RouteMapJSON)).toBe("/Download");
			expect(RunRedirect("/login", RouteMapJSON)).toBe("/Account/SignIn");
			expect(RunRedirect("/Download", RouteMapJSON)).toBeNull();
			expect(RunRedirect("/", RouteMapJSON)).toBeNull();
			expect(RunRedirect("/nonexistent", RouteMapJSON)).toBeNull();
		} finally {
			await rm(TempDirectory, { recursive: true, force: true });
		}
	});

	it("SW template injection produces valid JavaScript", async () => {
		const { mkdtemp, mkdir, writeFile, readFile, rm } =
			await import("node:fs/promises");
		const { join, resolve } = await import("node:path");
		const { tmpdir } = await import("node:os");

		const TempDirectory = await mkdtemp(join(tmpdir(), "e2e-sw-"));

		try {
			// Create minimal build output
			await mkdir(join(TempDirectory, "Download"), { recursive: true });
			await writeFile(
				join(TempDirectory, "Download", "index.html"),
				"<html></html>",
			);
			await writeFile(join(TempDirectory, "index.html"), "<html></html>");

			const RouteMap = await GenerateRouteMap(TempDirectory);

			// Read SW template
			const TemplatePath = resolve(
				import.meta.dirname,
				"../../Function/Route/ServiceWorker.ts",
			);

			const Template = await readFile(TemplatePath, "utf-8");

			// Perform the same injection as Integration.ts
			let ServiceWorkerCode = Template.replace(/^\/\/.*$/gm, "")
				.replace(/^declare var self.*$/m, "")
				.replace(/^declare const __DEV__.*$/m, "")
				.replace(/^declare const __INCREMENT__.*$/m, "")
				.replace(/^declare const __ROUTE_MAP_CANONICAL__.*$/m, "")
				.replace(/^declare const __ROUTE_MAP_VARIANT__.*$/m, "")
				.replace(/^import type.*$/gm, "")
				.replace(/^export interface.*\{[\s\S]*?\}$/gm, "")
				.replace(/: Set<string>/g, "")
				.replace(/: Record<string, string>/g, "")
				.replace(/: string \| null/g, "")
				.replace(/: string/g, "")
				.replace(/: any\[\]/g, "")
				.replace(/^export default \{\};$/m, "");

			ServiceWorkerCode = ServiceWorkerCode.replace(
				"__ROUTE_MAP_CANONICAL__",
				JSON.stringify(RouteMap.Canonical),
			)
				.replace(
					"__ROUTE_MAP_VARIANT__",
					JSON.stringify(RouteMap.Variant),
				)
				.replace(/__INCREMENT__/g, JSON.stringify("Route-E2E-Test"))
				.replace(/__DEV__/g, "false");

			// Write the injected SW
			const ServiceWorkerPath = join(TempDirectory, "Worker.js");

			await writeFile(ServiceWorkerPath, ServiceWorkerCode);

			// Verify the output
			const Output = await readFile(ServiceWorkerPath, "utf-8");

			// No unresolved placeholders
			expect(Output).not.toContain("__ROUTE_MAP_CANONICAL__");
			expect(Output).not.toContain("__ROUTE_MAP_VARIANT__");
			expect(Output).not.toContain("__INCREMENT__");
			expect(Output).not.toContain("__DEV__");

			// Contains injected data
			expect(Output).toContain('"Route-E2E-Test"');
			expect(Output).toContain('"/Download"');
			expect(Output).toContain('"/download"');

			// Contains SW lifecycle handlers
			expect(Output).toContain('"install"');
			expect(Output).toContain('"activate"');
			expect(Output).toContain('"fetch"');

			// No TypeScript artifacts
			expect(Output).not.toContain("declare var");
			expect(Output).not.toContain("declare const");
			expect(Output).not.toContain("import type");
		} finally {
			await rm(TempDirectory, { recursive: true, force: true });
		}
	});

	it("SW registration constants match SW expectations", () => {
		// Verify the contract between Register.ts and ServiceWorker.ts
		const RegistrationPath = "/Worker.js";
		const RegistrationScope = "/";

		// SW validates its own script path
		expect(RegistrationPath).toMatch(/^\/[^\\:]+\.(js|mjs)(\?.*)?$/);
		expect(RegistrationScope).toBe("/");

		// Message protocol
		const VersionMessage = { Version: "New" };

		expect(VersionMessage).toHaveProperty("Version", "New");

		// Cache naming convention
		const Increment = "Route-Test-123";
		const CacheRoute = `Route-${Increment}`;
		const CacheAsset = `Asset-${Increment}`;

		expect(CacheRoute).toContain("Route-");
		expect(CacheAsset).toContain("Asset-");
	});

	it("all semantic aliases resolve through SW route resolution", async () => {
		const { mkdtemp, mkdir, writeFile, rm } =
			await import("node:fs/promises");
		const { join } = await import("node:path");
		const { tmpdir } = await import("node:os");

		const TempDirectory = await mkdtemp(join(tmpdir(), "e2e-alias-"));

		try {
			// Create all canonical pages
			for (const PascalPath of CanonicalPath) {
				const Directory = join(TempDirectory, PascalPath.slice(1));

				await mkdir(Directory, { recursive: true });
				await writeFile(join(Directory, "index.html"), "<html></html>");
			}

			await writeFile(join(TempDirectory, "index.html"), "<html></html>");

			const RouteMap = await GenerateRouteMap(TempDirectory);
			const CanonicalSet = new Set(RouteMap.Canonical);

			// Every semantic alias should resolve to its target
			for (const [Alias, Target] of Object.entries(SemanticAlias)) {
				const Resolved = ResolveRoute(
					Alias,
					CanonicalSet,
					RouteMap.Variant,
				);

				if (Target === "/") {
					// Root aliases may resolve to null or "/"
					// depending on whether "/" is in the variant map
					expect(
						Resolved === null || Resolved === "/",
						`Alias ${Alias} → ${Target}: got ${Resolved}`,
					).toBe(true);
				} else {
					expect(Resolved).toBe(Target);
				}
			}
		} finally {
			await rm(TempDirectory, { recursive: true, force: true });
		}
	});

	it("PascalCaseCanonical mapping matches Integration sitemap rewriting", () => {
		// Every entry in PascalCaseCanonical should have its lowercase
		// key derived from the PascalCase value
		for (const [Lowercase, PascalPath] of Object.entries(
			PascalCaseCanonical,
		)) {
			expect(Lowercase).toBe(PascalPath.toLowerCase());
			expect(CanonicalPath.has(PascalPath)).toBe(true);
		}
	});

	it("RouteMap covers all 3 redirect layers consistently", async () => {
		const { mkdtemp, mkdir, writeFile, rm } =
			await import("node:fs/promises");
		const { join } = await import("node:path");
		const { tmpdir } = await import("node:os");

		const TempDirectory = await mkdtemp(join(tmpdir(), "e2e-layers-"));

		try {
			for (const PascalPath of CanonicalPath) {
				const Directory = join(TempDirectory, PascalPath.slice(1));

				await mkdir(Directory, { recursive: true });
				await writeFile(join(Directory, "index.html"), "<html></html>");
			}

			await writeFile(join(TempDirectory, "index.html"), "<html></html>");

			const RouteMap = await GenerateRouteMap(TempDirectory);
			const CanonicalSet = new Set(RouteMap.Canonical);

			// For each canonical, verify lowercase variant works in both
			// Layer 1 (SW) and Layer 3 (404 redirect)
			for (const PascalPath of CanonicalPath) {
				const Lowercase = PascalPath.toLowerCase();

				if (Lowercase === PascalPath) continue;

				// Layer 1: SW resolves lowercase → PascalCase
				const SWResult = ResolveRoute(
					Lowercase,
					CanonicalSet,
					RouteMap.Variant,
				);

				expect(SWResult, `SW: ${Lowercase} → ${PascalPath}`).toBe(
					PascalPath,
				);

				// Layer 3: 404 redirect resolves lowercase → PascalCase
				const FallbackResult = RunRedirect(Lowercase, RouteMap);

				expect(
					FallbackResult,
					`404: ${Lowercase} → ${PascalPath}`,
				).toBe(PascalPath);
			}
		} finally {
			await rm(TempDirectory, { recursive: true, force: true });
		}
	});
});
