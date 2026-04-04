import { describe, expect, it } from "vitest";

// ─── RedirectFromRouteMap logic (extracted for testability) ───
// The actual module relies on `window.location` and `fetch`. We replicate
// the logic and test it with mocks.

const RunRedirect = async (
	CurrentPath: string,
	RouteMapData: {
		Canonical: string[];
		Variant: Record<string, string>;
	} | null,
): Promise<string | null> => {
	const CleanPath = CurrentPath.replace(/\/+$/, "") || "/";

	if (CleanPath === "/") {
		return null;
	}

	if (!RouteMapData) {
		return null;
	}

	if (RouteMapData.Canonical.includes(CleanPath)) {
		return null;
	}

	let CanonicalPath = RouteMapData.Variant[CleanPath];

	if (!CanonicalPath) {
		CanonicalPath = RouteMapData.Variant[CleanPath.toLowerCase()];
	}

	if (!CanonicalPath) {
		const Stripped = CleanPath.toLowerCase().replace(/[-_]/g, "");

		CanonicalPath = RouteMapData.Variant[Stripped];
	}

	if (!CanonicalPath) {
		const Singular = CleanPath.toLowerCase().replace(/s$/, "");

		CanonicalPath = RouteMapData.Variant[Singular];
	}

	if (CanonicalPath && CanonicalPath !== CleanPath) {
		return CanonicalPath;
	}

	return null;
};

const TestRouteMap = {
	Canonical: [
		"/",
		"/Download",
		"/Doc",
		"/Blog",
		"/Account/SignIn",
		"/Portal",
		"/Legal/Term",
	],
	Variant: {
		"/downloads": "/Download",
		"/download": "/Download",
		"/docs": "/Doc",
		"/blog": "/Blog",
		"/account/signin": "/Account/SignIn",
		"/login": "/Account/SignIn",
		"/portal": "/Portal",
		"/install": "/Download",
		"/legal/terms": "/Legal/Term",
		"/DOWNLOADS": "/Download",
		"/accountsignin": "/Account/SignIn",
	} as Record<string, string>,
};

describe("RedirectFromRouteMap logic", () => {
	it("does not redirect from root", async () => {
		expect(await RunRedirect("/", TestRouteMap)).toBeNull();
	});

	it("does not redirect canonical PascalCase paths", async () => {
		expect(await RunRedirect("/Download", TestRouteMap)).toBeNull();
		expect(await RunRedirect("/Doc", TestRouteMap)).toBeNull();
		expect(await RunRedirect("/Blog", TestRouteMap)).toBeNull();
		expect(await RunRedirect("/Account/SignIn", TestRouteMap)).toBeNull();
	});

	it("redirects lowercase built paths to PascalCase", async () => {
		expect(await RunRedirect("/downloads", TestRouteMap)).toBe("/Download");
		expect(await RunRedirect("/docs", TestRouteMap)).toBe("/Doc");
		expect(await RunRedirect("/blog", TestRouteMap)).toBe("/Blog");
	});

	it("redirects semantic aliases", async () => {
		expect(await RunRedirect("/login", TestRouteMap)).toBe(
			"/Account/SignIn",
		);
		expect(await RunRedirect("/install", TestRouteMap)).toBe("/Download");
	});

	it("redirects uppercase variants via lowercase fallback", async () => {
		expect(await RunRedirect("/DOWNLOADS", TestRouteMap)).toBe("/Download");
	});

	it("redirects stripped hyphen variants", async () => {
		expect(await RunRedirect("/account-signin", TestRouteMap)).toBe(
			"/Account/SignIn",
		);
	});

	it("returns null when RouteMap is unavailable", async () => {
		expect(await RunRedirect("/downloads", null)).toBeNull();
	});

	it("returns null for unknown paths", async () => {
		expect(await RunRedirect("/nonexistent", TestRouteMap)).toBeNull();
		expect(await RunRedirect("/some/random/path", TestRouteMap)).toBeNull();
	});

	it("handles trailing slash paths", async () => {
		expect(await RunRedirect("/downloads/", TestRouteMap)).toBe(
			"/Download",
		);
	});
});
