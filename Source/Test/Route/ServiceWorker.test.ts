import { describe, expect, it } from "vitest";

// The SW file uses `declare var self: ServiceWorkerGlobalScope` and global
// constants injected at build time. We test the pure functions by extracting
// the logic manually (same algorithms, no SW globals needed).

// ─── Replicated from ServiceWorker.ts (pure functions) ───

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

// ─── Test fixtures ───

const TestCanonical = new Set([
	"/",

	"/Download",

	"/Doc",

	"/Blog",

	"/Account/SignIn",

	"/Account/SignUp",

	"/Legal/Term",

	"/Legal/Privacy",

	"/Portal",
]);

const TestVariant: Record<string, string> = {
	"/downloads": "/Download",

	"/download": "/Download",

	"/docs": "/Doc",

	"/doc": "/Doc",

	"/blog": "/Blog",

	"/account/signin": "/Account/SignIn",

	"/account/signup": "/Account/SignUp",

	"/account/sign-in": "/Account/SignIn",

	"/account/sign-up": "/Account/SignUp",

	"/login": "/Account/SignIn",

	"/register": "/Account/SignUp",

	"/legal/terms": "/Legal/Term",

	"/legal/privacy": "/Legal/Privacy",

	"/portal": "/Portal",

	"/install": "/Download",

	"/get": "/Download",
};

describe("StripTrailingSlash", () => {
	it("preserves root path", () => {
		expect(StripTrailingSlash("/")).toBe("/");
	});

	it("strips single trailing slash", () => {
		expect(StripTrailingSlash("/Download/")).toBe("/Download");
	});

	it("strips multiple trailing slashes", () => {
		expect(StripTrailingSlash("/Download///")).toBe("/Download");
	});

	it("leaves clean paths unchanged", () => {
		expect(StripTrailingSlash("/Download")).toBe("/Download");
	});
});

describe("NormalizePath", () => {
	it("lowercases all segments", () => {
		expect(NormalizePath("/Download")).toBe("/download");
	});

	it("lowercases multi-segment paths", () => {
		expect(NormalizePath("/Account/SignIn")).toBe("/account/signin");
	});

	it("strips trailing slashes after normalizing", () => {
		expect(NormalizePath("/Download/")).toBe("/download");
	});

	it("decodes percent-encoded segments", () => {
		expect(NormalizePath("/%44ownload")).toBe("/download");
	});

	it("handles root path", () => {
		expect(NormalizePath("/")).toBe("/");
	});
});

describe("ResolveRoute", () => {
	it("returns null for canonical paths (no redirect needed)", () => {
		expect(
			ResolveRoute("/Download", TestCanonical, TestVariant),
		).toBeNull();

		expect(ResolveRoute("/Doc", TestCanonical, TestVariant)).toBeNull();

		expect(ResolveRoute("/", TestCanonical, TestVariant)).toBeNull();

		expect(
			ResolveRoute("/Account/SignIn", TestCanonical, TestVariant),
		).toBeNull();
	});

	it("resolves lowercase built paths to PascalCase", () => {
		expect(ResolveRoute("/downloads", TestCanonical, TestVariant)).toBe(
			"/Download",
		);

		expect(ResolveRoute("/docs", TestCanonical, TestVariant)).toBe("/Doc");

		expect(ResolveRoute("/blog", TestCanonical, TestVariant)).toBe("/Blog");
	});

	it("resolves semantic aliases", () => {
		expect(ResolveRoute("/install", TestCanonical, TestVariant)).toBe(
			"/Download",
		);

		expect(ResolveRoute("/login", TestCanonical, TestVariant)).toBe(
			"/Account/SignIn",
		);

		expect(ResolveRoute("/register", TestCanonical, TestVariant)).toBe(
			"/Account/SignUp",
		);
	});

	it("resolves paths with trailing slashes", () => {
		expect(ResolveRoute("/downloads/", TestCanonical, TestVariant)).toBe(
			"/Download",
		);

		expect(ResolveRoute("/portal/", TestCanonical, TestVariant)).toBe(
			"/Portal",
		);
	});

	it("resolves hyphenated compound paths", () => {
		expect(
			ResolveRoute("/account/sign-in", TestCanonical, TestVariant),
		).toBe("/Account/SignIn");
	});

	it("resolves UPPERCASE paths via normalization", () => {
		// NormalizePath will lowercase to /download, which is in VariantMap
		expect(ResolveRoute("/DOWNLOADS", TestCanonical, TestVariant)).toBe(
			"/Download",
		);
	});

	it("returns null for unknown paths", () => {
		expect(
			ResolveRoute("/nonexistent", TestCanonical, TestVariant),
		).toBeNull();

		expect(
			ResolveRoute("/some/random/path", TestCanonical, TestVariant),
		).toBeNull();
	});

	it("resolves multi-segment lowercase paths", () => {
		expect(
			ResolveRoute("/account/signin", TestCanonical, TestVariant),
		).toBe("/Account/SignIn");

		expect(ResolveRoute("/legal/terms", TestCanonical, TestVariant)).toBe(
			"/Legal/Term",
		);

		expect(ResolveRoute("/legal/privacy", TestCanonical, TestVariant)).toBe(
			"/Legal/Privacy",
		);
	});
});
