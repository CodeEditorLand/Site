// @vitest-environment node
/**
 * `Dynamic/Properties/Grid` - the six properties as records.
 *
 * The component is the element `Dynamic/Properties/**` lost when the
 * record-shaped homepage was deleted: `Data.ts` and `Type.ts` survived, the grid
 * did not. It renders through `astro/container` under the `node` environment
 * (the docblock above) and is parsed with `happy-dom`, the pattern
 * `DynamicFeatures.test.tsx` established for `.astro` blocks.
 *
 * What it asserts is the contract the card states, not the shape of the markup:
 * three claims (never six), three filed, one `jelly-card` per claim, the record's
 * own anatomy inside it, a destination on every record, and the one sentence a
 * grid with no records prints instead of six blank columns.
 */
import { experimental_AstroContainer as AstroContainer } from "astro/container";

import { Window } from "happy-dom";

import type { Element as ParsedElement } from "happy-dom";

import { beforeAll, describe, expect, it } from "vitest";

import Grid from "../../Component/Dynamic/Properties/Grid.astro";

import {
	ClaimsOf,
	FiledOf,
	ItemsOf,
} from "../../Component/Dynamic/Properties/Data.js";

import type { PropertyEntry } from "../../Component/Dynamic/Properties/Type.js";

/** The six, as `ItemsOf` resolves them from the locale's own copy. */
const Copy: Record<string, string> = {

	"home:features.item.designTokens.title":
		"Native services where they count.",

	"home:features.item.designTokens.description":
		"Heavy editor work runs natively.",

	"home:features.item.componentLibrary.title":
		"Unmodified extensions, no fork path.",

	"home:features.item.componentLibrary.description":
		"Extensions run unmodified.",

	"home:features.item.documentation.title": "Fibers, not Promises.",

	"home:features.item.documentation.description": "Failures are typed.",

	"home:features.item.versionControl.title":
		"One source tree, configured targets.",

	"home:features.item.versionControl.description":
		"Tauri uses the OS WebView.",

	"home:features.item.cicdIntegration.title":
		"Background daemon, always running.",

	"home:features.item.cicdIntegration.description": "A persistent daemon.",

	"home:features.item.collaboration.title": "CC0. No restrictions.",

	"home:features.item.collaboration.description": "Fork it, ship it.",
};

const T = (Key: string, Options: { readonly defaultValue: string }): string =>
	Copy[Key] ?? Options.defaultValue;

const Entries = ItemsOf(T);

/** The six rendered once: the block is static and takes no other prop. */
let Html = "";

/** The same markup as a queryable document. */
let Page: Window["document"];

beforeAll(async () => {
	const Container = await AstroContainer.create();

	Html = await Container.renderToString(Grid, {
		props: { entries: Entries },
	});

	const Parsed = new Window({ url: "https://editor.land/Specimen" });

	Parsed.document.body.innerHTML = Html;

	Page = Parsed.document;
});

/** All elements matching a selector, as a real array. */
const All = (Selector: string): ParsedElement[] =>
	[...Page.querySelectorAll(Selector)] as ParsedElement[];

/** The first element matching a selector. Throws rather than returning null. */
const One = (Selector: string): ParsedElement => {

	const Found = Page.querySelector(Selector) ?? null;

	if (Found === null) throw new Error(`No element matches ${Selector}`);

	return Found as ParsedElement;
};

describe("the properties grid", () => {
	it("prints three claims and files the other three", () => {
		expect(Entries).toHaveLength(6);

		expect(ClaimsOf(Entries)).toHaveLength(3);

		expect(FiledOf(Entries)).toHaveLength(3);

		expect(All(".properties-grid > jelly-card")).toHaveLength(3);

		expect(All(".properties-filed__item")).toHaveLength(3);
	});

	it("puts one record on each Jelly card, in the record's own anatomy", () => {
		const Records = All(
			".properties-grid jelly-card > .record-entry.properties-entry",
		);

		expect(Records).toHaveLength(3);

		expect(
			All(".record-entry__index").map((Node) => Node.textContent),
		).toEqual(["# 01", "# 02", "# 03"]);

		// The claim is an `h3` - a record's name, never the page's `h1`/`h2`.
		expect(All(".record-entry__name").map((Node) => Node.tagName)).toEqual([
			"H3",

			"H3",

			"H3",
		]);
	});

	it("gives every claim a destination, which is what the arrow needs", () => {
		expect(All(".record-entry__link")).toHaveLength(3);

		expect(All(".record-entry__arrow")).toHaveLength(3);

		expect(
			All(".record-entry__link").map((Node) => Node.getAttribute("href")),
		).toEqual(["/Doc/why-rust", "/Doc/cocoon", "/Doc/why-effect-ts"]);
	});

	it("hands each card its own fill and no second surface", () => {
		const Fills = All(".properties-grid > jelly-card").map(
			(Node) => Node.getAttribute("style") ?? "",
		);

		expect(Fills).toHaveLength(3);

		for (const Fill of Fills) {
			expect(Fill).toContain("--jelly-fill:");

			expect(Fill).toContain("--jelly-card-padding-inline:0");
		}

		// Three fills, three inks: the identity is per element, not one tint.
		expect(new Set(Fills).size).toBe(3);
	});

	it("labels the filed strip and links every filed property", () => {
		expect(One(".properties-filed__label").textContent).toBe("ALSO FILED");

		expect(One(".properties-filed").getAttribute("aria-label")).toBe(
			"ALSO FILED",
		);

		expect(
			All(".properties-filed__link").map((Node) =>
				Node.getAttribute("href"),
			),
		).toEqual(["/Doc/why-tauri", "/Doc/air", "/Doc/why-cc0"]);
	});

	it("prints one sentence, not six blank columns, when there is nothing", async () => {
		const Container = await AstroContainer.create();

		const Empty = await Container.renderToString(Grid, {
			props: { entries: [] },
		});

		expect(Empty).toContain("properties-empty");

		expect(Empty).not.toContain("properties-grid");

		expect(Empty).not.toContain("properties-filed");
	});
});

describe("the records it is handed", () => {
	it("keeps a filed property without a destination as text, never an empty anchor", async () => {
		const Bare: readonly PropertyEntry[] = [
			{ index: "# 01", id: "a", name: "A", body: "First." },
			{ index: "# 02", id: "b", name: "B", body: "Second." },
			{ index: "# 03", id: "c", name: "C", body: "Third." },
			{ index: "# 04", id: "d", name: "D", body: "Filed, and unlinked." },
		];

		const Container = await AstroContainer.create();

		const Html = await Container.renderToString(Grid, {
			props: { entries: Bare },
		});

		expect(Html).toContain("properties-filed__name");

		expect(Html).not.toContain("properties-filed__link");
	});
});
