import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region Source/pages/OpenGraph.svg.ts
var OpenGraph_svg_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async () => {
	const GenerateOpenGraphSvg = (await import("./OpenGraph_F2BapDZi.mjs")).default;
	const Meta = (await import("./PageMetadata_D7x3NTV-.mjs")).default[""];
	const Svg = GenerateOpenGraphSvg(Meta.Title, Meta.Description, Meta.Section);
	return new Response(Svg, {
		status: 200,
		headers: {
			"Content-Type": "image/svg+xml",
			"Cache-Control": "public, max-age=86400"
		}
	});
};
//#endregion
//#region \0virtual:astro:page:Source/pages/OpenGraph.svg@_@ts
var page = () => OpenGraph_svg_exports;
//#endregion
export { page };
