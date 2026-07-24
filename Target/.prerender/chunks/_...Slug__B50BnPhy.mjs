import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region Source/pages/OpenGraph/[...Slug].svg.ts
var ____Slug__svg_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	getStaticPaths: () => getStaticPaths
});
var GET = async ({ params }) => {
	const Slug = params.Slug ?? "";
	const GenerateOpenGraphSvg = (await import("./OpenGraph_F2BapDZi.mjs")).default;
	const StaticMeta = (await import("./PageMetadata_D7x3NTV-.mjs")).default[Slug];
	if (StaticMeta) {
		const Svg = GenerateOpenGraphSvg(StaticMeta.Title, StaticMeta.Description, StaticMeta.Section);
		return new Response(Svg, {
			status: 200,
			headers: {
				"Content-Type": "image/svg+xml",
				"Cache-Control": "public, max-age=86400"
			}
		});
	}
	if (Slug.startsWith("Blog/")) {
		const BlogSlug = Slug.replace("Blog/", "");
		try {
			const { getCollection } = await import("./_astro_content_Dw24iOTP.mjs");
			const BlogEntry = (await getCollection("blog")).find((Entry) => Entry.id === BlogSlug);
			if (BlogEntry) {
				const Svg = GenerateOpenGraphSvg(BlogEntry.data.title, BlogEntry.data.summary ?? BlogEntry.data.title, "Blog");
				return new Response(Svg, {
					status: 200,
					headers: {
						"Content-Type": "image/svg+xml",
						"Cache-Control": "public, max-age=86400"
					}
				});
			}
		} catch {}
	}
	if (Slug.startsWith("Doc/")) {
		const DocSlug = Slug.replace("Doc/", "");
		try {
			const { getCollection } = await import("./_astro_content_Dw24iOTP.mjs");
			const DocEntry = (await getCollection("doc")).find((Entry) => Entry.id === DocSlug);
			if (DocEntry) {
				const Svg = GenerateOpenGraphSvg(DocEntry.data.title, DocEntry.data.description ?? DocEntry.data.title, "Doc");
				return new Response(Svg, {
					status: 200,
					headers: {
						"Content-Type": "image/svg+xml",
						"Cache-Control": "public, max-age=86400"
					}
				});
			}
		} catch {}
	}
	const Svg = GenerateOpenGraphSvg(Slug.replace(/\//g, " | ") || "Code Editor Land", "The next-generation code editor built with Rust and Tauri.");
	return new Response(Svg, {
		status: 200,
		headers: {
			"Content-Type": "image/svg+xml",
			"Cache-Control": "public, max-age=86400"
		}
	});
};
var getStaticPaths = async () => {
	const PageMetadata = (await import("./PageMetadata_D7x3NTV-.mjs")).default;
	const StaticPath = Object.keys(PageMetadata).filter((Slug) => Slug !== "").map((Slug) => ({ params: { Slug } }));
	let BlogPath = [];
	try {
		const { getCollection } = await import("./_astro_content_Dw24iOTP.mjs");
		BlogPath = (await getCollection("blog")).map((Entry) => ({ params: { Slug: `Blog/${Entry.id}` } }));
	} catch {}
	let DocPath = [];
	try {
		const { getCollection } = await import("./_astro_content_Dw24iOTP.mjs");
		DocPath = (await getCollection("doc")).map((Entry) => ({ params: { Slug: `Doc/${Entry.id}` } }));
	} catch {}
	return [
		...StaticPath,
		...BlogPath,
		...DocPath
	];
};
//#endregion
//#region \0virtual:astro:page:Source/pages/OpenGraph/[...Slug].svg@_@ts
var page = () => ____Slug__svg_exports;
//#endregion
export { page };
