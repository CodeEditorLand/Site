// @vitest-environment node
/**
 * The 404 - the smallest complete record on the site, and the surface where the
 * block layer's artifact and its evidence block meet: `RecordHero` prints the
 * record, `RecordFigure` prints the plate inside its evidence column.
 *
 * The page is rendered as a page, not as a component, because the claim this
 * test makes is about the document: one `h1`, one `#` marker, one `/` route, a
 * STATUS word from the vocabulary, the relation and the proposition below the
 * blank interval, and the plate framed with its caption and its source.
 */
import Renderer from "@astrojs/react/server.js";

import { experimental_AstroContainer as AstroContainer } from "astro/container";

import { Window } from "happy-dom";

import { beforeAll, describe, expect, it } from "vitest";

import NotFound from "../../pages/404.astro";

let Html = "";

let Page: Window["document"];

beforeAll(async () => {
	const Container = await AstroContainer.create();

	Container.addServerRenderer({ renderer: Renderer, name: "@astrojs/react" });

	Html = await Container.renderToString(NotFound, {
		request: new Request("https://editor.land/No/Such/Route"),
	});

	const Parsed = new Window({ url: "https://editor.land/No/Such/Route" });

	Parsed.document.body.innerHTML = Html;

	Page = Parsed.document;
});

const Text = (Selector: string): string =>
	(Page.querySelector(Selector)?.textContent ?? "")
		.replace(/\s+/g, " ")
		.trim();

describe("the 404", () => {
	it("prints one record, opened by its marker and closed by its action", () => {
		expect(Page.querySelectorAll("h1")).toHaveLength(1);

		expect(Text("h1")).toContain("NOT FOUND");

		expect(Text(".record-hero__mark")).toContain("ROUTE_404");

		expect(Text(".record-hero__route")).toContain("/TRACE:/No/Such/Route");

		expect(Text(".record-hero__status")).toContain("INTERRUPTED");

		expect(Text(".record-hero__relation")).toBe("LAND:");

		expect(Text(".record-hero__proposition")).toContain("RETURN TO INDEX");

		expect(Text(".record-hero__facts")).toContain("SIGNAL:");

		expect(Text(".record-hero__facts")).toContain("ROUTE:");
	});

	it("keeps the interval between the facts and what the record asks", () => {
		expect(Html.indexOf("record-hero__facts")).toBeLessThan(
			Html.indexOf("record-hero__blank"),
		);

		expect(Html.indexOf("record-hero__blank")).toBeLessThan(
			Html.indexOf("record-hero__relation"),
		);
	});

	it("prints its plate as captioned, sourced evidence inside the hero", () => {
		expect(
			Page.querySelectorAll(".record-hero__evidence .record-figure"),
		).toHaveLength(1);

		expect(Page.querySelectorAll(".record-hero__gutter")).toHaveLength(1);

		expect(Text(".record-figure__caption-text")).toContain(
			"no evidence of its own",
		);

		expect(Text(".record-figure__provenance")).toBe(
			"/EVIDENCE/LAND/NIGHTGLASS-01.PNG",
		);
	});
});
