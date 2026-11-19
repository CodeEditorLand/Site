import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
// Source/pages/OpenGraph/[...Slug].svg.ts
var ____Slug__svg_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	getStaticPaths: () => getStaticPaths
});
var GET = async ({ params }) => {
	const Slug = params.Slug ?? "";
	const GenerateOpenGraphSvg = (await import("./OpenGraph_BRD-VHXm.mjs")).default;
	const StaticMeta = (await import("./PageMetadata_C9e4zetg.mjs")).default[Slug];
	if (StaticMeta) {
		const { Title: StaticTitle, Description: StaticDescription, Section: StaticSection, Status: StaticStatus, License: StaticLicense, Target: StaticTarget } = StaticMeta;
		const Svg = GenerateOpenGraphSvg(StaticTitle, StaticDescription, StaticSection, {
			Slug,
			Status: StaticStatus,
			License: StaticLicense,
			Target: StaticTarget
		});
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
			const { getCollection } = await import("./_astro_content_Di-E73B6.mjs");
			const BlogEntry = (await getCollection("blog")).find((Entry) => Entry.id === BlogSlug);
			if (BlogEntry) {
				const Svg = GenerateOpenGraphSvg(BlogEntry.data.title, BlogEntry.data.summary ?? BlogEntry.data.title, "Blog", {
					Slug: BlogSlug,
					Target: "PUBLIC"
				});
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
			const { getCollection } = await import("./_astro_content_Di-E73B6.mjs");
			const DocEntry = (await getCollection("doc")).find((Entry) => Entry.id === DocSlug);
			if (DocEntry) {
				const Svg = GenerateOpenGraphSvg(DocEntry.data.title, DocEntry.data.description ?? DocEntry.data.title, "Doc", {
					Slug: DocSlug,
					Target: "GUIDES / API / REFERENCE"
				});
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
	const Svg = GenerateOpenGraphSvg(Slug.replace(/\//g, " | ") || "Code Editor Land", "The next-generation code editor built with Rust and Tauri.", void 0, { Slug });
	return new Response(Svg, {
		status: 200,
		headers: {
			"Content-Type": "image/svg+xml",
			"Cache-Control": "public, max-age=86400"
		}
	});
};
var getStaticPaths = async () => {
	const PageMetadata = (await import("./PageMetadata_C9e4zetg.mjs")).default;
	const { Served } = await import("./Lab_DCtkI77o.mjs");
	const StaticPath = Object.keys(PageMetadata).filter((Slug) => Slug !== "" && Served(`/${Slug}`)).map((Slug) => ({ params: { Slug } }));
	let BlogPath = [];
	try {
		const { getCollection } = await import("./_astro_content_Di-E73B6.mjs");
		BlogPath = (await getCollection("blog")).map((Entry) => ({ params: { Slug: `Blog/${Entry.id}` } }));
	} catch {}
	let DocPath = [];
	try {
		const { getCollection } = await import("./_astro_content_Di-E73B6.mjs");
		DocPath = (await getCollection("doc")).map((Entry) => ({ params: { Slug: `Doc/${Entry.id}` } }));
	} catch {}
	return [
		...StaticPath,
		...BlogPath,
		...DocPath
	];
};
// \0virtual:astro:page:Source/pages/OpenGraph/[...Slug].svg@_@ts
var page = () => ____Slug__svg_exports;
export { page };
