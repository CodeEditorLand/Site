import { cleanup, render, screen } from "@testing-library/react";

import { afterEach, describe, expect, it } from "vitest";

import { DynamicBlogCard } from "../../Component/Dynamic/DynamicBlogCard";

afterEach(() => {
	cleanup();
});

const SamplePost = {
	Slug: "effect-ts-architecture",

	Title: "Effect-TS Architecture in the Land Editor",

	Summary: "How we use Effect-TS for typed error handling.",

	PublishedAt: "2026-04-01",

	Tags: ["Architecture", "TypeScript", "Effect-TS"],

	Author: "CodeEditorLand",

	ReadTime: 8,
};

describe("DynamicBlogCard", () => {
	it("renders the post title", () => {
		render(<DynamicBlogCard Post={SamplePost} />);

		expect(
			screen.getByText("Effect-TS Architecture in the Land Editor"),
		).toBeInTheDocument();
	});

	it("renders the post summary", () => {
		render(<DynamicBlogCard Post={SamplePost} />);

		expect(
			screen.getByText("How we use Effect-TS for typed error handling."),
		).toBeInTheDocument();
	});

	it("renders the author", () => {
		render(<DynamicBlogCard Post={SamplePost} />);

		expect(screen.getByText("CodeEditorLand")).toBeInTheDocument();
	});

	it("renders the read time", () => {
		render(<DynamicBlogCard Post={SamplePost} />);

		expect(screen.getByText("8 min read")).toBeInTheDocument();
	});

	it("renders all tags as pill badges", () => {
		render(<DynamicBlogCard Post={SamplePost} />);

		expect(screen.getByText("Architecture")).toBeInTheDocument();

		expect(screen.getByText("TypeScript")).toBeInTheDocument();

		expect(screen.getByText("Effect-TS")).toBeInTheDocument();
	});

	it("does not have border-left style (regression guard)", () => {
		const { container } = render(<DynamicBlogCard Post={SamplePost} />);

		const Article = container.querySelector("article");

		expect(Article).not.toBeNull();

		expect(Article!.style.borderLeft).toBe("");

		expect(Article!.className).not.toMatch(/border-l(-|\s|$)/);
	});
});
