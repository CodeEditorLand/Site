import { describe, expect, it } from "vitest";

import GenerateRouteMap, {
	PascalCaseCanonical,
	SemanticAlias,
} from "../../Function/Route/Map.js";

describe("PascalCaseCanonical", () => {
	it("maps every built path to a PascalCase canonical", () => {
		for (const [BuiltPath, PascalPath] of Object.entries(
			PascalCaseCanonical,
		)) {
			expect(BuiltPath).toMatch(/^\/[a-z]/);
			expect(PascalPath).toMatch(/^\/[A-Z/]/);
		}
	});

	it("contains expected core routes", () => {
		expect(PascalCaseCanonical["/downloads"]).toBe("/Download");
		expect(PascalCaseCanonical["/docs"]).toBe("/Doc");
		expect(PascalCaseCanonical["/blog"]).toBe("/Blog");
		expect(PascalCaseCanonical["/portal"]).toBe("/Portal");
		expect(PascalCaseCanonical["/account/signin"]).toBe("/Account/SignIn");
		expect(PascalCaseCanonical["/account/signup"]).toBe("/Account/SignUp");
		expect(PascalCaseCanonical["/legal/terms"]).toBe("/Legal/Term");
		expect(PascalCaseCanonical["/legal/privacy"]).toBe("/Legal/Privacy");
		expect(PascalCaseCanonical["/oauth/success"]).toBe("/OAuth/Success");
	});

	it("has no duplicate PascalCase targets", () => {
		const Target = Object.values(PascalCaseCanonical);
		const UniqueTarget = new Set(Target);

		expect(UniqueTarget.size).toBe(Target.length);
	});
});

describe("SemanticAlias", () => {
	it("maps every alias to a known PascalCase canonical or root", () => {
		const ValidTarget = new Set([
			"/",
			...Object.values(PascalCaseCanonical),
		]);

		for (const [Alias, Target] of Object.entries(SemanticAlias)) {
			expect(Alias).toMatch(/^\//);
			expect(ValidTarget.has(Target)).toBe(true);
		}
	});

	it("includes auth shorthand aliases", () => {
		expect(SemanticAlias["/login"]).toBe("/Account/SignIn");
		expect(SemanticAlias["/register"]).toBe("/Account/SignUp");
		expect(SemanticAlias["/forgot-password"]).toBe(
			"/Account/ForgotPassword",
		);
		expect(SemanticAlias["/reset-password"]).toBe(
			"/Account/ResetPassword",
		);
	});

	it("includes download shorthand aliases", () => {
		expect(SemanticAlias["/install"]).toBe("/Download");
		expect(SemanticAlias["/get"]).toBe("/Download");
		expect(SemanticAlias["/setup"]).toBe("/Download");
	});

	it("includes home aliases mapping to root", () => {
		expect(SemanticAlias["/home"]).toBe("/");
		expect(SemanticAlias["/index"]).toBe("/");
		expect(SemanticAlias["/welcome"]).toBe("/");
	});
});

describe("GenerateRouteMap", () => {
	it("generates a valid route map from an output directory", async () => {
		const { mkdtemp, mkdir, writeFile, rm } = await import(
			"node:fs/promises"
		);
		const { join } = await import("node:path");
		const { tmpdir } = await import("node:os");

		const TempDirectory = await mkdtemp(join(tmpdir(), "routemap-"));

		try {
			// Create fake built pages matching PascalCaseCanonical keys
			await mkdir(join(TempDirectory, "downloads"), { recursive: true });
			await writeFile(
				join(TempDirectory, "downloads", "index.html"),
				"<html><body>Downloads</body></html>",
			);

			await mkdir(join(TempDirectory, "docs"), { recursive: true });
			await writeFile(
				join(TempDirectory, "docs", "index.html"),
				"<html><body>Docs</body></html>",
			);

			await mkdir(join(TempDirectory, "blog"), { recursive: true });
			await writeFile(
				join(TempDirectory, "blog", "index.html"),
				"<html><body>Blog</body></html>",
			);

			// Root index
			await writeFile(
				join(TempDirectory, "index.html"),
				"<html><body>Home</body></html>",
			);

			// 404 (should be excluded)
			await mkdir(join(TempDirectory, "404"), { recursive: true });
			await writeFile(
				join(TempDirectory, "404", "index.html"),
				"<html><body>404</body></html>",
			);

			const RouteMap = await GenerateRouteMap(TempDirectory);

			expect(RouteMap.Version).toBe(1);
			expect(RouteMap.Generated).toBeTruthy();
			expect(RouteMap.Canonical).toContain("/");
			expect(RouteMap.Canonical).toContain("/Download");
			expect(RouteMap.Canonical).toContain("/Doc");
			expect(RouteMap.Canonical).toContain("/Blog");

			// 404 should NOT be in canonical
			expect(RouteMap.Canonical).not.toContain("/404");

			// Variant map should contain lowercase → PascalCase
			expect(RouteMap.Variant["/downloads"]).toBe("/Download");
			expect(RouteMap.Variant["/docs"]).toBe("/Doc");
			expect(RouteMap.Variant["/blog"]).toBe("/Blog");

			// Variant map should contain semantic aliases
			expect(RouteMap.Variant["/install"]).toBe("/Download");
			expect(RouteMap.Variant["/login"]).toBe("/Account/SignIn");

			// Case variants should be generated
			expect(RouteMap.Variant["/DOWNLOADS"]).toBe("/Download");
			expect(RouteMap.Variant["/DOCS"]).toBe("/Doc");
		} finally {
			await rm(TempDirectory, { recursive: true, force: true });
		}
	});

	it("includes trailing slash variants", async () => {
		const { mkdtemp, mkdir, writeFile, rm } = await import(
			"node:fs/promises"
		);
		const { join } = await import("node:path");
		const { tmpdir } = await import("node:os");

		const TempDirectory = await mkdtemp(join(tmpdir(), "routemap-slash-"));

		try {
			await mkdir(join(TempDirectory, "downloads"), { recursive: true });
			await writeFile(
				join(TempDirectory, "downloads", "index.html"),
				"<html></html>",
			);
			await writeFile(
				join(TempDirectory, "index.html"),
				"<html></html>",
			);

			const RouteMap = await GenerateRouteMap(TempDirectory);

			// Should have trailing slash variants
			expect(RouteMap.Variant["/downloads/"]).toBe("/Download");
		} finally {
			await rm(TempDirectory, { recursive: true, force: true });
		}
	});
});
