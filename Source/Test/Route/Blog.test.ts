import { describe, expect, it } from "vitest";

import {
	CanonicalPath,
	PascalCaseCanonical,
} from "../../Function/Route/Map.js";
import EnBlog from "../../Library/I18n/Locale/En/Blog.json";

describe("Blog route", () => {
	it("/blog maps to /Blog in PascalCaseCanonical", () => {
		expect(PascalCaseCanonical["/blog"]).toBe("/Blog");
	});

	it("CanonicalPath contains /Blog", () => {
		expect(CanonicalPath.has("/Blog")).toBe(true);
	});

	it("canonical is /Blog not /blog (case guard)", () => {
		const Canonical = PascalCaseCanonical["/blog"];
		expect(Canonical).toMatch(/^\/[A-Z]/);
		expect(Canonical).toBe("/Blog");
	});

	it("En/Blog.json has meta.title key", () => {
		expect(EnBlog["meta.title"]).toBeDefined();
		expect(typeof EnBlog["meta.title"]).toBe("string");
		expect(EnBlog["meta.title"].length).toBeGreaterThan(0);
	});

	it("En/Blog.json has page.title key", () => {
		expect(EnBlog["page.title"]).toBe("Blog");
	});

	it("En/Blog.json has empty.title key", () => {
		expect(EnBlog["empty.title"]).toBeDefined();
	});
});
