// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";

import reactRenderer from "@astrojs/react/server.js";

import { describe, expect, it, vi } from "vitest";

// `Palette.astro` reads the doc collection at render time, which is the one thing
// a container test cannot provide. The mock returns two entries so the register
// is built from a real `DocSection[]` shape rather than from a hand-written
// fixture - what is under test here is the mount, not the collection.
vi.mock("astro:content", () => ({
	getCollection: async () => [
		{
			id: "install",
			data: { title: "Install", section: "Start", order: 1 },
		},
		{
			id: "first-run",
			data: { title: "First Run", section: "Start", order: 2 },
		},
	],
}));

const Render = async () => {

	const Container = await AstroContainer.create({
		// The container takes the loader shape (`{ name, ssr }`), while the
		// integration exports the SSR value itself - so the value is named once here
		// instead of the test depending on either shape directly.
		renderers: [{ name: "@astrojs/react", ssr: reactRenderer }],
	});

	return Container.renderToString(
		(await import("../../Component/UI/Palette/Palette.astro")).default,
	);
};

describe("Palette mount", () => {
	it("is server-rendered, so the door exists before the island hydrates", async () => {
		const Html = await Render();

		// The trigger is in the HTML, not injected by the client: a keyboard reader
		// tabs to it before any JavaScript has run.
		expect(Html).toContain("data-palette-trigger");

		expect(Html).toContain("Find a record");

		expect(Html).toContain("Chord__Key");
	});

	it("hydrates on idle, so the door costs nothing until the page is quiet", async () => {
		const Html = await Render();

		// `client:idle` with server output: the button is in the HTML, and the
		// listener arrives when the browser is free. `client:load` on every page
		// would buy a few hundred milliseconds on a chord and cost the budget of
		// every page that never opens the palette.
		expect(Html).toContain('client="idle"');

		expect(Html).toContain(" ssr");
	});
});
