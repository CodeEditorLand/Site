import { describe, expect, it } from "vitest";

import GenerateRouteMap, {
	PascalCaseCanonical,
} from "../../Function/Route/Map.js";

describe("Integration: Build output structure", () => {
	it("generates PascalCase HTML directories from built pages", async () => {
		const { mkdtemp, mkdir, writeFile, readFile, rm, stat } = await import(
			"node:fs/promises"
		);
		const { join } = await import("node:path");
		const { tmpdir } = await import("node:os");

		const TempDirectory = await mkdtemp(join(tmpdir(), "integration-"));

		try {
			// Simulate Astro build output
			const BuiltPage = [
				"downloads",
				"docs",
				"blog",
				"portal",
				"account/signin",
				"account/signup",
				"legal/terms",
				"legal/privacy",
			];

			for (const Page of BuiltPage) {
				await mkdir(join(TempDirectory, Page), { recursive: true });
				await writeFile(
					join(TempDirectory, Page, "index.html"),
					`<html><body>${Page}</body></html>`,
				);
			}

			await writeFile(
				join(TempDirectory, "index.html"),
				"<html><body>Home</body></html>",
			);

			// Generate route map
			const RouteMap = await GenerateRouteMap(TempDirectory);

			// Write RouteMap.json
			const RouteMapPath = join(TempDirectory, "RouteMap.json");
			await writeFile(
				RouteMapPath,
				JSON.stringify(RouteMap, null, "\t"),
			);

			// Verify RouteMap.json is valid
			const RouteMapContent = JSON.parse(
				await readFile(RouteMapPath, "utf-8"),
			);

			expect(RouteMapContent.Version).toBe(1);
			expect(RouteMapContent.Canonical).toContain("/Download");
			expect(RouteMapContent.Canonical).toContain("/Doc");
			expect(RouteMapContent.Canonical).toContain("/Blog");
			expect(RouteMapContent.Canonical).toContain("/Portal");
			expect(RouteMapContent.Canonical).toContain("/Account/SignIn");
			expect(RouteMapContent.Canonical).toContain("/Account/SignUp");
			expect(RouteMapContent.Canonical).toContain("/Legal/Term");
			expect(RouteMapContent.Canonical).toContain("/Legal/Privacy");

			// Simulate PascalCase directory copy (what Integration.ts does)
			for (const [BuiltPath, PascalPath] of Object.entries(
				RouteMap.Variant,
			)) {
				if (
					!BuiltPath.startsWith("/") ||
					!RouteMap.Canonical.includes(PascalPath) ||
					PascalPath === "/"
				) {
					continue;
				}

				const BuiltHTMLPath = join(
					TempDirectory,
					BuiltPath.slice(1),
					"index.html",
				);

				let BuiltHTML: string;

				try {
					BuiltHTML = await readFile(BuiltHTMLPath, "utf-8");
				} catch {
					continue;
				}

				const PascalDirectory = join(
					TempDirectory,
					PascalPath.slice(1),
				);

				await mkdir(PascalDirectory, { recursive: true });
				await writeFile(
					join(PascalDirectory, "index.html"),
					BuiltHTML,
				);
			}

			// Verify PascalCase directories were created with HTML
			for (const [BuiltPath, PascalPath] of Object.entries(
				PascalCaseCanonical,
			)) {
				if (PascalPath === "/") continue;

				const PascalHTMLPath = join(
					TempDirectory,
					PascalPath.slice(1),
					"index.html",
				);

				const Stat = await stat(PascalHTMLPath).catch(() => null);

				if (BuiltPage.includes(BuiltPath.slice(1))) {
					expect(
						Stat,
						`Expected ${PascalPath}/index.html to exist`,
					).not.toBeNull();

					const Content = await readFile(PascalHTMLPath, "utf-8");

					expect(Content).toContain(BuiltPath.slice(1));
				}
			}
		} finally {
			await rm(TempDirectory, { recursive: true, force: true });
		}
	});

	it("injects route data into service worker template", async () => {
		const { readFile } = await import("node:fs/promises");
		const { resolve } = await import("node:path");

		// Read the actual SW source
		const TemplatePath = resolve(
			import.meta.dirname,
			"../../Function/Route/ServiceWorker.ts",
		);

		const Template = await readFile(TemplatePath, "utf-8");

		// Verify it has the expected placeholders
		expect(Template).toContain("__ROUTE_MAP_CANONICAL__");
		expect(Template).toContain("__ROUTE_MAP_VARIANT__");
		expect(Template).toContain("__INCREMENT__");
		expect(Template).toContain("__DEV__");

		// Simulate the injection that Integration.ts does
		const TestCanonical = ["/", "/Download", "/Doc"];
		const TestVariant = { "/downloads": "/Download", "/docs": "/Doc" };

		let Injected = Template.replace(
			/^\/\/.*$/gm,
			"",
		)
			.replace(/^declare var self.*$/m, "")
			.replace(/^declare const __DEV__.*$/m, "")
			.replace(/^declare const __INCREMENT__.*$/m, "")
			.replace(/^declare const __ROUTE_MAP_CANONICAL__.*$/m, "")
			.replace(/^declare const __ROUTE_MAP_VARIANT__.*$/m, "");

		Injected = Injected.replace(
			"__ROUTE_MAP_CANONICAL__",
			JSON.stringify(TestCanonical),
		)
			.replace("__ROUTE_MAP_VARIANT__", JSON.stringify(TestVariant))
			.replace(/__INCREMENT__/g, JSON.stringify("Route-Test"))
			.replace(/__DEV__/g, "false");

		// Verify injection worked
		expect(Injected).toContain(JSON.stringify(TestCanonical));
		expect(Injected).toContain(JSON.stringify(TestVariant));
		expect(Injected).toContain('"Route-Test"');
		expect(Injected).not.toContain("__ROUTE_MAP_CANONICAL__");
		expect(Injected).not.toContain("__ROUTE_MAP_VARIANT__");
	});

	it("rewrites sitemap URLs to PascalCase", async () => {
		const { mkdtemp, writeFile, readFile, rm } = await import(
			"node:fs/promises"
		);
		const { join } = await import("node:path");
		const { tmpdir } = await import("node:os");

		const TempDirectory = await mkdtemp(join(tmpdir(), "sitemap-"));

		try {
			const SitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>https://editor.land/downloads</loc></url>
<url><loc>https://editor.land/docs</loc></url>
<url><loc>https://editor.land/blog</loc></url>
<url><loc>https://editor.land/portal</loc></url>
<url><loc>https://editor.land/account/signin</loc></url>
<url><loc>https://editor.land/legal/terms</loc></url>
</urlset>`;

			await writeFile(
				join(TempDirectory, "sitemap-0.xml"),
				SitemapContent,
			);

			// Simulate sitemap rewriting from Integration.ts
			let Rewritten = await readFile(
				join(TempDirectory, "sitemap-0.xml"),
				"utf-8",
			);

			for (const [BuiltPath, PascalPath] of Object.entries(
				PascalCaseCanonical,
			)) {
				const Pattern = new RegExp(
					`(<loc>[^<]*?)${BuiltPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(/?)(<\\/loc>)`,
					"g",
				);

				Rewritten = Rewritten.replace(Pattern, `$1${PascalPath}$3`);
			}

			await writeFile(
				join(TempDirectory, "sitemap-0.xml"),
				Rewritten,
			);

			const Final = await readFile(
				join(TempDirectory, "sitemap-0.xml"),
				"utf-8",
			);

			expect(Final).toContain(
				"<loc>https://editor.land/Download</loc>",
			);
			expect(Final).toContain("<loc>https://editor.land/Doc</loc>");
			expect(Final).toContain("<loc>https://editor.land/Blog</loc>");
			expect(Final).toContain("<loc>https://editor.land/Portal</loc>");
			expect(Final).toContain(
				"<loc>https://editor.land/Account/SignIn</loc>",
			);
			expect(Final).toContain(
				"<loc>https://editor.land/Legal/Term</loc>",
			);

			// Original lowercase should be gone
			expect(Final).not.toContain(
				"<loc>https://editor.land/downloads</loc>",
			);
			expect(Final).not.toContain(
				"<loc>https://editor.land/docs</loc>",
			);
		} finally {
			await rm(TempDirectory, { recursive: true, force: true });
		}
	});
});
