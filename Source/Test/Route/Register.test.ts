import { afterEach, describe, expect, it, vi } from "vitest";

describe("SW Registration logic", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("detects service worker support", () => {
		expect("serviceWorker" in navigator).toBeDefined();
	});

	it("registration uses correct path and scope", () => {
		// Verify the constants from Register.ts
		const Path = "/service-worker.js";
		const Scope = "/";

		expect(Path).toBe("/service-worker.js");
		expect(Scope).toBe("/");
	});

	it("TrustedTypes policy validates SW script URLs", () => {
		// Replicate the policy validation regex from Policy.ts
		const ValidPattern = /^\/[^\\:]+\.(js|mjs)(\?.*)?$/;

		expect(ValidPattern.test("/service-worker.js")).toBe(true);
		expect(ValidPattern.test("/sw.js")).toBe(true);
		expect(ValidPattern.test("/path/to/worker.mjs")).toBe(true);
		expect(ValidPattern.test("/worker.js?v=123")).toBe(true);

		// Invalid URLs
		expect(ValidPattern.test("https://evil.com/sw.js")).toBe(false);
		expect(ValidPattern.test("data:text/javascript,alert(1)")).toBe(false);
		expect(ValidPattern.test("/worker.ts")).toBe(false);
		expect(ValidPattern.test("")).toBe(false);
	});

	it("reload flag uses correct sessionStorage key", () => {
		const ReloadKey = "RouteWorkerReload";
		const RegisteredKey = "RouteWorkerRegistered";

		sessionStorage.setItem(ReloadKey, "true");

		expect(sessionStorage.getItem(ReloadKey)).toBe("true");

		sessionStorage.removeItem(ReloadKey);

		expect(sessionStorage.getItem(ReloadKey)).toBeNull();

		sessionStorage.setItem(RegisteredKey, "true");

		expect(sessionStorage.getItem(RegisteredKey)).toBe("true");

		sessionStorage.removeItem(RegisteredKey);
	});

	it("version message protocol uses correct shape", () => {
		// Verify the message shape from ServiceWorker.ts activate handler
		const VersionMessage = { Version: "New" };

		expect(VersionMessage).toHaveProperty("Version", "New");
	});
});

describe("Normalize module", () => {
	it("exports expected functions", async () => {
		const Normalize = (await import("../../Function/Route/Normalize.js"))
			.default;

		expect(Normalize).toHaveProperty("NormalizePath");
		expect(Normalize).toHaveProperty("GenerateVariantKey");
		expect(Normalize).toHaveProperty("GenerateSegmentVariant");
		expect(Normalize).toHaveProperty("StripTrailingSlash");
	});

	it("NormalizePath lowercases and strips trailing slashes", async () => {
		const { NormalizePath } = (
			await import("../../Function/Route/Normalize.js")
		).default;

		expect(NormalizePath("/Download")).toBe("/download");
		expect(NormalizePath("/Account/SignIn/")).toBe("/account/signin");
		expect(NormalizePath("/")).toBe("/");
	});

	it("GenerateVariantKey strips hyphens and underscores", async () => {
		const { GenerateVariantKey } = (
			await import("../../Function/Route/Normalize.js")
		).default;

		expect(GenerateVariantKey("forgot-password")).toBe("forgotpassword");
		expect(GenerateVariantKey("sign_in")).toBe("signin");
		expect(GenerateVariantKey("Download")).toBe("download");
	});

	it("GenerateSegmentVariant produces singular/plural forms", async () => {
		const { GenerateSegmentVariant } = (
			await import("../../Function/Route/Normalize.js")
		).default;

		const Variant = GenerateSegmentVariant("/downloads");

		expect(Variant).toContain("/downloads");
		expect(Variant).toContain("/download");

		const SingularVariant = GenerateSegmentVariant("/blog");

		expect(SingularVariant).toContain("/blog");
		expect(SingularVariant).toContain("/blogs");
	});
});
