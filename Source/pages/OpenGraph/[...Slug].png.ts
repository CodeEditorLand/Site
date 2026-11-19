/**
 * OpenGraph card image endpoint.
 *
 * Generates per-page social sharing images at /OpenGraph/{Slug}.png.
 * Static pages resolve from PageMetadata; Blog/Doc entries resolve
 * from Astro content collections at build time via getStaticPaths.
 *
 * The image is a PNG. `og:image` is read by a platform's scraper, not by a
 * browser, and no major platform renders SVG - so the drawing is composed as
 * SVG (the two generators, `Function/OpenGraph.ts` and
 * `pages/OpenGraph.png.ts`, both emit one) and `Rasterise` draws it with the
 * site's own faces. See `Function/OpenGraph/Raster.ts`.
 */

import type { APIRoute, GetStaticPaths } from "astro";

import { Rasterise } from "../../Function/OpenGraph/Raster.js";

/**
 * One card, drawn and delivered.
 *
 * `Slug` names the route the drawing belongs to and is used only to name a
 * failure: an uncovered character or a stale face stops the build and says
 * which card printed it.
 */
const Card = (Svg: string, Slug: string): Response =>
	new Response(Rasterise(Svg, `OpenGraph/${Slug}.png`), {
		status: 200,
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=86400",
		},
	});

export const GET: APIRoute = async ({ params }) => {
	const Slug = params.Slug ?? "";

	const GenerateOpenGraphSvg = (await import("../../Function/OpenGraph.js"))
		.default;

	const PageMetadata = (
		await import("../../Function/OpenGraph/PageMetadata.js")
	).default;

	// Try static page metadata first
	const StaticMeta = PageMetadata[Slug];

	if (StaticMeta) {
		const {
			Title: StaticTitle,

			Description: StaticDescription,

			Section: StaticSection,

			Status: StaticStatus,

			License: StaticLicense,

			Target: StaticTarget,
		} = StaticMeta;

		const Svg = GenerateOpenGraphSvg(
			StaticTitle,

			StaticDescription,

			StaticSection,

			{
				Slug,

				Status: StaticStatus,

				License: StaticLicense,

				Target: StaticTarget,
			},
		);

		return Card(Svg, Slug);
	}

	// Try Blog content collection
	if (Slug.startsWith("Blog/")) {
		const BlogSlug = Slug.replace("Blog/", "");

		try {
			const { getCollection } = await import("astro:content");

			const BlogEntry = (await getCollection("blog")).find(
				(Entry) => Entry.id === BlogSlug,
			);

			if (BlogEntry) {
				const Svg = GenerateOpenGraphSvg(
					BlogEntry.data.title,

					BlogEntry.data.summary ?? BlogEntry.data.title,

					"Blog",

					{
						Slug: BlogSlug,

						Target: "PUBLIC",
					},
				);

				return Card(Svg, Slug);
			}
		} catch {
			// Collection may not exist yet - fall through to fallback
		}
	}

	// Try Doc content collection
	if (Slug.startsWith("Doc/")) {
		const DocSlug = Slug.replace("Doc/", "");

		try {
			const { getCollection } = await import("astro:content");

			const DocEntry = (await getCollection("doc")).find(
				(Entry) => Entry.id === DocSlug,
			);

			if (DocEntry) {
				const Svg = GenerateOpenGraphSvg(
					DocEntry.data.title,

					DocEntry.data.description ?? DocEntry.data.title,

					"Doc",

					{
						Slug: DocSlug,

						Target: "GUIDES / API / REFERENCE",
					},
				);

				return Card(Svg, Slug);
			}
		} catch {
			// Collection may not exist yet - fall through to fallback
		}
	}

	// Fallback: generate a generic card from the slug
	const FallbackTitle = Slug.replace(/\//g, " | ") || "Code Editor Land";

	const Svg = GenerateOpenGraphSvg(
		FallbackTitle,

		"The next-generation code editor built with Rust and Tauri.",

		undefined,

		{ Slug },
	);

	return Card(Svg, Slug);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const PageMetadata = (
		await import("../../Function/OpenGraph/PageMetadata.js")
	).default;

	// The lab switch: a share card is a picture of a page, so a page the build
	// does not hold gets none. `/Specimen` is served by `dum Run` and absent from
	// production (`Function/Configuration/Lab.mjs`).
	const { Served } = await import("../../Function/Configuration/Lab.mjs");

	// Static pages - skip the home slug ("") which is served by /OpenGraph.png.ts
	const StaticPath = Object.keys(PageMetadata)
		.filter((Slug) => Slug !== "" && Served(`/${Slug}`))
		.map((Slug) => ({ params: { Slug } }));

	// Blog entries
	let BlogPath: { params: { Slug: string } }[] = [];

	try {
		const { getCollection } = await import("astro:content");

		const BlogEntry = await getCollection("blog");

		BlogPath = BlogEntry.map((Entry) => ({
			params: { Slug: `Blog/${Entry.id}` },
		}));
	} catch {
		// Blog collection may not exist yet
	}

	// Doc entries
	let DocPath: { params: { Slug: string } }[] = [];

	try {
		const { getCollection } = await import("astro:content");

		const DocEntry = await getCollection("doc");

		DocPath = DocEntry.map((Entry) => ({
			params: { Slug: `Doc/${Entry.id}` },
		}));
	} catch {
		// Doc collection may not exist yet
	}

	return [...StaticPath, ...BlogPath, ...DocPath];
};
