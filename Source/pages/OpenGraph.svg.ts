/**
 * Home page OpenGraph SVG endpoint.
 *
 * Serves /OpenGraph.svg - the og:image for the root page.
 * All other pages use /OpenGraph/[Slug].svg via the [...Slug].svg.ts endpoint.
 */

import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
	const GenerateOpenGraphSvg = (await import("../Function/OpenGraph.js"))
		.default;

	const PageMetadata = (await import("../Function/OpenGraph/PageMetadata.js"))
		.default;

	const Meta = PageMetadata[""];

	const Svg = GenerateOpenGraphSvg(
		Meta.Title,

		Meta.Description,

		Meta.Section,
	);

	return new Response(Svg, {
		status: 200,
		headers: {
			"Content-Type": "image/svg+xml",
			"Cache-Control": "public, max-age=86400",
		},
	});
};
