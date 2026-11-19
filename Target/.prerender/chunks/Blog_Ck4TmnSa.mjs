import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as getCollection } from "./_astro_content_DQt8W2iZ.mjs";
import { t as $$BlogIndex } from "./BlogIndex_BVsGBoCl.mjs";
import { r as BuildRows } from "./Data_BOx5B_cB.mjs";
import { St as Header, Zt as createAstro, ft as RegisterOf, rt as GetI18n, t as $$Base } from "./Base_BVG1wSoZ.mjs";
// Source/pages/Blog.astro
var Blog_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Blog,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://editor.land");
var $$Blog = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Blog;
	const T = GetI18n();
	const MetaTitle = T("meta.title", {
		ns: "blog",
		defaultValue: "Blog | Code Editor Land"
	});
	const MetaDescription = T("meta.description", {
		ns: "blog",
		defaultValue: "Architecture deep-dives, release notes, and updates."
	});
	const PageTitle = T("page.title", {
		ns: "blog",
		defaultValue: "Blog"
	});
	const PageSubtitle = T("page.subtitle", {
		ns: "blog",
		defaultValue: "Entries on the architecture, the build and the licence, newest first. Each card prints its date, its tags and the time it takes to read."
	});
	const EmptyTitle = T("empty.title", {
		ns: "blog",
		defaultValue: "NO ENTRIES FILED"
	});
	const EmptySubtitle = T("empty.subtitle", {
		ns: "blog",
		defaultValue: "The collection is empty: no article has been published to Source/Content/blog, so the plate above prints a tombstone instead of four zeroes. Nothing failed and nothing is hidden - the archive has not started. /DOC carries the manual that is written."
	});
	const MinRead = T("card.minRead", {
		ns: "blog",
		defaultValue: "min read"
	});
	const Home = T("common.breadcrumb.home", { defaultValue: "Home" });
	const BackToTop = T("common.button.backToTop", { defaultValue: "Back to top" });
	const Entries = await getCollection("blog");
	const Rows = BuildRows(Entries, MinRead);
	const Topics = new Set(Rows.flatMap((Row) => Row.tags)).size;
	const Dates = Rows.map((Row) => Row.date).sort();
	const PlateMeasures = [
		{
			label: "ENTRIES",
			value: String(Rows.length),
			unit: "FILED"
		},
		{
			label: "TOPICS",
			value: String(Topics),
			unit: "TAGGED"
		},
		{
			label: "SPAN",
			value: `${Dates[0] ?? "UNAVAILABLE"} \u2192 ${Dates[Dates.length - 1] ?? "UNAVAILABLE"}`
		},
		{
			label: "READING",
			value: String(Entries.reduce((Sum, Entry) => Sum + Entry.data.readTime, 0)),
			unit: "MINUTES"
		}
	];
	const Trail = [{
		label: Home,
		href: "/"
	}, { label: PageTitle }];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription,
		"Url": Astro.url.href,
		"lang": "en"
	}, {
		"default": ($$result) => renderTemplate`  ${renderComponent($$result, "BlogIndex", $$BlogIndex, {
			"heading": PageTitle,
			"standfirst": PageSubtitle,
			"trail": Trail,
			"rows": Rows,
			"emptyTitle": EmptyTitle,
			"emptyNote": EmptySubtitle,
			"backLabel": BackToTop,
			"backHref": "#top",
			"register": RegisterOf("BLOG", Rows, { unit: "ENTRIES" }),
			"plateMeasures": PlateMeasures,
			"plateCaption": "The archive's extent, counted from the collection: the entries filed, the distinct topics they carry, the dates they span, and the reading time they add up to. A figure this page could not count would print UNAVAILABLE, never a zero.",
			"plateSource": "Source/Content/blog/*.md"
		})} `,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "Header", Header, {
			"client:load": true,
			"slot": "Header",
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})}`
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Blog.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Blog.astro";
var $$url = "/Blog";
// \0virtual:astro:page:Source/pages/Blog@_@astro
var page = () => Blog_exports;
export { page };
