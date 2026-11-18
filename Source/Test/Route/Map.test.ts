import { describe, expect, it } from "vitest";

import GenerateRouteMap, {
	CanonicalPath,
	PascalCaseCanonical,
	SemanticAlias,
} from "../../Function/Route/Map.js";

describe("PascalCaseCanonical", () => {
	it("maps every lowercase built path to a PascalCase canonical", () => {
		for (const [BuiltPath, PascalPath] of Object.entries(
			PascalCaseCanonical,
		)) {
			expect(BuiltPath).toBe(BuiltPath.toLowerCase());

			expect(PascalPath).toMatch(/^\/[A-Z/]/);
		}
	});

	it("contains expected core routes", () => {
		expect(PascalCaseCanonical["/download"]).toBe("/Download");

		expect(PascalCaseCanonical["/doc"]).toBe("/Doc");

		expect(PascalCaseCanonical["/blog"]).toBe("/Blog");

		expect(PascalCaseCanonical["/portal"]).toBe("/Portal");

		expect(PascalCaseCanonical["/account/signin"]).toBe("/Account/SignIn");

		expect(PascalCaseCanonical["/account/signup"]).toBe("/Account/SignUp");

		expect(PascalCaseCanonical["/legal/term"]).toBe("/Legal/Term");

		expect(PascalCaseCanonical["/legal/privacy"]).toBe("/Legal/Privacy");

		expect(PascalCaseCanonical["/oauth/success"]).toBe("/OAuth/Success");
	});

	it("has no duplicate PascalCase targets", () => {
		const Target = Object.values(PascalCaseCanonical);

		const UniqueTarget = new Set(Target);

		expect(UniqueTarget.size).toBe(Target.length);
	});

	it("is derived from CanonicalPath set", () => {
		for (const PascalPath of Object.values(PascalCaseCanonical)) {
			expect(CanonicalPath.has(PascalPath)).toBe(true);
		}

		expect(Object.keys(PascalCaseCanonical).length).toBe(
			CanonicalPath.size,
		);
	});
});

describe("SemanticAlias", () => {
	it("maps every alias to a known PascalCase canonical or root", () => {
		const ValidTarget = new Set([
			"/",
			...Object.values(PascalCaseCanonical),
		]);

		// A target can also be a sub-page of a canonical section (e.g.
		// "/Doc/why-wasm" under canonical "/Doc") - those aren't enumerated
		// in CanonicalPath since doc slugs are Content Collection entries,
		// not Astro page files.
		const IsValidTarget = (Target: string) =>
			ValidTarget.has(Target) ||
			[...ValidTarget].some(
				(Canonical) =>
					Canonical !== "/" && Target.startsWith(`${Canonical}/`),
			);

		for (const [Alias, Target] of Object.entries(SemanticAlias)) {
			expect(Alias).toMatch(/^\//);
			expect(IsValidTarget(Target)).toBe(true);
		}
	});

	it("includes auth shorthand aliases", () => {
		expect(SemanticAlias["/login"]).toBe("/Account/SignIn");

		expect(SemanticAlias["/register"]).toBe("/Account/SignUp");

		expect(SemanticAlias["/forgot-password"]).toBe(
			"/Account/ForgotPassword",
		);

		expect(SemanticAlias["/reset-password"]).toBe("/Account/ResetPassword");
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
	it("generates a valid route map from PascalCase output directory", async () => {
		const { mkdtemp, mkdir, writeFile, rm } =
			await import("node:fs/promises");

		const { join } = await import("node:path");

		const { tmpdir } = await import("node:os");

		const TempDirectory = await mkdtemp(join(tmpdir(), "routemap-"));

		try {
			// Create PascalCase built pages (matching real Astro output)
			const BuiltPage = [
				"Download",
				"Doc",
				"Blog",
				"Account/SignIn",
				"Account/SignUp",
				"Legal/Term",
				"Legal/Privacy",
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

			expect(RouteMap.Canonical).toContain("/Account/SignIn");

			expect(RouteMap.Canonical).toContain("/Legal/Term");

			// 404 should NOT be in canonical
			expect(RouteMap.Canonical).not.toContain("/404");

			// Variant map should contain lowercase → PascalCase
			expect(RouteMap.Variant["/download"]).toBe("/Download");

			expect(RouteMap.Variant["/doc"]).toBe("/Doc");

			expect(RouteMap.Variant["/blog"]).toBe("/Blog");

			// Variant map should contain semantic aliases
			expect(RouteMap.Variant["/install"]).toBe("/Download");

			expect(RouteMap.Variant["/login"]).toBe("/Account/SignIn");

			// Case variants should be generated
			expect(RouteMap.Variant["/DOWNLOAD"]).toBe("/Download");

			expect(RouteMap.Variant["/DOC"]).toBe("/Doc");
		} finally {
			await rm(TempDirectory, { recursive: true, force: true });
		}
	});

	it("includes trailing slash variants", async () => {
		const { mkdtemp, mkdir, writeFile, rm } =
			await import("node:fs/promises");

		const { join } = await import("node:path");

		const { tmpdir } = await import("node:os");

		const TempDirectory = await mkdtemp(join(tmpdir(), "routemap-slash-"));

		try {
			await mkdir(join(TempDirectory, "Download"), { recursive: true });

			await writeFile(
				join(TempDirectory, "Download", "index.html"),

				"<html></html>",
			);

			await writeFile(join(TempDirectory, "index.html"), "<html></html>");

			const RouteMap = await GenerateRouteMap(TempDirectory);

			// Should have trailing slash variants
			expect(RouteMap.Variant["/download/"]).toBe("/Download");
		} finally {
			await rm(TempDirectory, { recursive: true, force: true });
		}
	});
});
