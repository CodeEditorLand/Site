import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { r as render, t as getCollection } from "./_astro_content_DQt8W2iZ.mjs";
import { t as $$BlogArticle } from "./BlogArticle_8VNmIhOz.mjs";
import { St as Header, Zt as createAstro, ft as RegisterOf, rt as GetI18n, t as $$Base } from "./Base_BVG1wSoZ.mjs";
import { a as BuildToc, c as ReadTimeLabel, i as BuildSummary, l as RegisterEmpty, n as BuildNotes, o as HasDiagram, s as ManualTargetFor, t as BuildAside } from "./Data_BOx5B_cB.mjs";
import { r as PieceInset, t as $$MermaidFallback } from "./MermaidFallback_CUaNdqp1.mjs";
// Source/pages/Blog/[Slug].astro
var _Slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://editor.land");
async function getStaticPaths() {
	return (await getCollection("blog")).map((Entry) => ({
		params: { Slug: Entry.id },
		props: { Entry }
	}));
}
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { Entry } = Astro.props;
	const { Content, headings } = await render(Entry);
	const T = GetI18n();
	const MetaTitle = `${Entry.data.title} | Code Editor Land`;
	const MetaDescription = Entry.data.summary;
	const TocLabel = T("article.toc", {
		ns: "blog",
		defaultValue: "On this page"
	});
	const MinRead = T("card.minRead", {
		ns: "blog",
		defaultValue: "min read"
	});
	const Home = T("common.breadcrumb.home", { defaultValue: "Home" });
	const PageTitle = T("page.title", {
		ns: "blog",
		defaultValue: "Blog"
	});
	const ReadTime = ReadTimeLabel(Entry.data.readTime, MinRead);
	const Toc = BuildToc(headings, TocLabel);
	const Diagram = HasDiagram(Entry.body);
	const DocIds = (await getCollection("doc")).map((Doc) => Doc.id);
	const Sections = headings.filter((Heading) => Heading.depth === 2).length;
	const Manual = ManualTargetFor(Entry.id, DocIds);
	const Summary = BuildSummary(Entry, Sections, ReadTime);
	const Notes = BuildNotes(Entry, Sections, Manual, Toc !== null);
	const Aside = BuildAside(Entry);
	const Extent = PieceInset({
		title: Entry.data.title,
		body: Entry.body,
		sections: Sections,
		minutes: Entry.data.readTime,
		readTime: ReadTime,
		file: `SOURCE/CONTENT/BLOG/${Entry.id}.MD`
	});
	const Trail = [
		{
			label: Home,
			href: "/"
		},
		{
			label: PageTitle,
			href: "/Blog"
		},
		{ label: Entry.data.title }
	];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription,
		"Url": Astro.url.href,
		"lang": "en"
	}, {
		"default": ($$result) => renderTemplate`  ${renderComponent($$result, "BlogArticle", $$BlogArticle, {
			"title": Entry.data.title,
			"summary": Entry.data.summary,
			"tags": Entry.data.tags,
			"author": Entry.data.author,
			"date": Entry.data.publishedAt,
			"readTime": ReadTime,
			"toc": Toc,
			"trail": Trail,
			"backLabel": PageTitle,
			"backHref": "/Blog",
			"summaryRows": Summary,
			"summaryRegister": RegisterOf("SUMMARY", Summary),
			"notes": Notes,
			"insets": [Extent],
			"aside": Aside,
			"registerEmpty": RegisterEmpty
		}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Content", Content, {})} ` })} ${Diagram ? renderTemplate`${renderComponent($$result, "MermaidFallback", $$MermaidFallback, {})}` : null}`,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "Header", Header, {
			"client:load": true,
			"slot": "Header",
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})}`
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Blog/[Slug].astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Blog/[Slug].astro";
var $$url = "/Blog/[Slug]";
// \0virtual:astro:page:Source/pages/Blog/[Slug]@_@astro
var page = () => _Slug__exports;
export { page };
