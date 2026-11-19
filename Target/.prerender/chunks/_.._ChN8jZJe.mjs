import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { r as render, t as getCollection } from "./_astro_content_DQt8W2iZ.mjs";
import { t as $$DocArticle } from "./DocArticle_C120auSM.mjs";
import { t as $$DocLayer } from "./DocLayer_CGmCnGPU.mjs";
import { t as $$DocLayout } from "./DocLayout_C6NlBbeh.mjs";
import { n as PageInset, t as $$MermaidFallback } from "./MermaidFallback_CUaNdqp1.mjs";
import { St as Header, X as BuildDocSidebar, Zt as createAstro, rt as GetI18n, t as $$Base } from "./Base_BVG1wSoZ.mjs";
import { t as $$RecordInset } from "./RecordInset_BKsvqiTM.mjs";
import { t as $$RecordMargin } from "./RecordMargin_DhcIZIHx.mjs";
import { t as $$RecordTranscript } from "./RecordTranscript_DS6MtuSE.mjs";
import { t as ElementPlateForSlug } from "./Plate_29FE9-EQ.mjs";
import { n as SetupSession } from "./Session_DEaFV_ie.mjs";
import { t as BuildDocStrip } from "./BuildDocStrip_CxvQ5LLQ.mjs";
// Source/Function/Doc/BuildDocToc.ts
/** The headings a markdown file uses to announce its own contents list. */
var OwnToc = /* @__PURE__ */ new Set([
	"table of contents",
	"contents",
	"on this page",
	"in this page"
]);
/**
* A heading reduced to its words: lower-cased, with everything after the last
* letter dropped. `Table of Contents 📑` and `Table of Contents` both normalise
* to `table of contents`; a heading that merely starts with the phrase keeps its
* remaining words and therefore does not match.
*/
var Normalise = (Text) => Text.trim().replace(/[^\p{L}]+$/u, "").toLowerCase();
/**
* A heading's text as the nav's label: trailing decoration dropped.
*
* Eight of the documents in the collection end a heading with a pictograph
* (`## Process Model 🏗️`). In the prose that glyph is the author's; in a
* thirteen-pixel mono rail it is a coloured emoji in a page that has one accent
* and prints ink, and it pushes the words off the row. So the label is the
* heading's words, and the heading keeps its own text - a nav label is a name for
* the destination, not a copy of it. Nothing else is touched: the label is not
* re-cased, truncated or re-worded, and a heading with no trailing glyph comes
* through byte-identical.
*/
var Nav = (Text) => Text.trim().replace(/\s*[\p{Extended_Pictographic}\uFE0F\u200D]+\s*$/gu, "").trim();
/**
* The `##` headings as TOC entries, or `null` when this page needs none.
*
* `Label` is the nav's own label (`On this page`), passed in by the page so
* this module stays free of the i18n client.
*/
var BuildDocToc = (Headings, Label) => {
	const Second = Headings.filter((Heading) => Heading.depth === 2);
	const First = Second.at(0);
	if (!First || Second.length < 2 || OwnToc.has(Normalise(First.text))) return null;
	return {
		Label,
		Items: Second.map((Heading) => ({
			Label: Nav(Heading.text),
			Href: `#${Heading.slug}`
		}))
	};
};
// Source/pages/Doc/[...Slug].astro
var ____Slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Component,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://editor.land");
async function getStaticPaths() {
	return (await getCollection("doc")).map((Entry) => ({
		params: { Slug: Entry.id },
		props: { Entry }
	}));
}
var $$Component = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Component;
	const { Entry } = Astro.props;
	const { Content, headings } = await render(Entry);
	const AllEntries = (await getCollection("doc")).sort((A, B) => A.data.order - B.data.order);
	const SidebarSections = BuildDocSidebar(AllEntries);
	const SectionEntries = AllEntries.filter((E) => E.data.section === Entry.data.section);
	const SectionIndex = SectionEntries.findIndex((E) => E.id === Entry.id);
	const PrevEntry = SectionIndex > 0 ? SectionEntries[SectionIndex - 1] : AllEntries[AllEntries.findIndex((E) => E.id === Entry.id) - 1] ?? null;
	const NextEntry = SectionIndex < SectionEntries.length - 1 ? SectionEntries[SectionIndex + 1] : AllEntries[AllEntries.findIndex((E) => E.id === Entry.id) + 1] ?? null;
	const T = GetI18n();
	const PageSource = `Source/Content/doc/${Entry.id}.md`;
	const PageStrip = BuildDocStrip({
		Layer: Entry.data.section,
		Source: PageSource,
		Extras: [{
			Label: T("strip.order", {
				ns: "doc",
				defaultValue: "ORDER:"
			}),
			Value: String(Entry.data.order)
		}, ...Entry.data.group ? [{
			Label: T("strip.group", {
				ns: "doc",
				defaultValue: "GROUP:"
			}),
			Value: Entry.data.group
		}] : []]
	}, T);
	const Contents = BuildDocToc(/^\s*#\s/.test(Entry.body ?? "") ? headings.slice(1) : headings, T("article.toc", {
		ns: "doc",
		defaultValue: "On this page"
	}));
	const Layer = SectionEntries.map((Page) => ({
		Id: Page.id,
		Label: Page.data.navTitle ?? Page.data.title,
		Href: `/Doc/${Page.id}`
	}));
	const MetaTitle = `${Entry.data.title} | Code Editor Land`;
	const MetaDescription = Entry.data.description;
	const Home = T("common.breadcrumb.home", { defaultValue: "Home" });
	const Documentation = T("sidebar.title", {
		ns: "doc",
		defaultValue: "Documentation"
	});
	const Notes = [
		{
			index: "NOTE_01",
			label: "FILED",
			body: `This page is filed under ${Entry.data.section}, at position ${Entry.data.order} in that section.`,
			source: `SOURCE: SOURCE/CONTENT/DOC/${Entry.id.toUpperCase()}.MD`
		},
		...Entry.data.group ? [{
			index: "NOTE_02",
			label: "GROUP",
			body: `It nests under ${Entry.data.group}, with every page that shares the group.`,
			source: "SOURCE: FRONTMATTER `GROUP`"
		}] : [],
		{
			index: Entry.data.group ? "NOTE_03" : "NOTE_02",
			label: "CORRECTIONS",
			body: "The prose is a markdown file in the repository. A correction is a pull request against it, not a comment on the page.",
			source: "SOURCE: THE REPOSITORY",
			link: {
				label: "OPEN THE SOURCE TREE",
				href: "https://github.com/CodeEditorLand/WebSite"
			}
		}
	];
	const PagePlate = ElementPlateForSlug(Entry.id);
	const PageExtent = PageInset({
		body: Entry.body ?? "",
		sections: Contents?.Items.length ?? 0,
		order: Entry.data.order,
		inSection: SectionEntries.length,
		section: Entry.data.section,
		file: `SOURCE/CONTENT/DOC/${Entry.id.toUpperCase()}.MD`
	});
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription,
		"Url": Astro.url.href,
		"lang": "en"
	}, {
		"default": ($$result) => renderTemplate`  ${renderComponent($$result, "DocLayout", $$DocLayout, {
			"sections": SidebarSections,
			"activeId": Entry.id,
			"contents": Contents
		}, {
			"default": ($$result) => renderTemplate` ${renderComponent($$result, "DocArticle", $$DocArticle, {
				"kicker": `/${Entry.data.section}`,
				"title": Entry.data.title,
				"standfirst": Entry.data.description,
				"strip": PageStrip,
				"contents": Contents,
				"crumbs": [
					{
						label: Home,
						href: "/"
					},
					{
						label: Documentation,
						href: "/Doc"
					},
					{ label: Entry.data.title }
				],
				"measure": false,
				"plate": PagePlate,
				"source": PageSource
			}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "jelly-card", "jelly-card", {
				"class": "doc-prose",
				"style": "--jelly-fill:var(--Card);--jelly-radius:0;--jelly-card-font-size:inherit;--jelly-card-padding-block:0;--jelly-card-padding-inline:0"
			}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="doc-article__body doc-prose__body"> ${renderComponent($$result, "Content", Content, {})} </div> ` })} ${Entry.id === "getting-started" ? renderTemplate`<div class="doc-article__session"> ${renderComponent($$result, "RecordTranscript", $$RecordTranscript, { "transcript": SetupSession })} </div>` : null}` })} ${renderComponent($$result, "MermaidFallback", $$MermaidFallback, {})} ${renderComponent($$result, "DocLayer", $$DocLayer, {
				"label": T("strip.layer", {
					ns: "doc",
					defaultValue: "LAYER:"
				}),
				"heading": Entry.data.section,
				"unit": T("archive.pages", {
					ns: "doc",
					defaultValue: "PAGES"
				}),
				"unitOne": T("index.page", {
					ns: "doc",
					defaultValue: "PAGE"
				}),
				"entries": Layer,
				"activeId": Entry.id
			})} ${(PrevEntry || NextEntry) && renderTemplate`<nav class="doc-pager" aria-label="Page navigation"> ${PrevEntry ? renderTemplate`${renderComponent($$result, "jelly-card", "jelly-card", {
				"class": "doc-pager__card",
				"style": "--jelly-fill:var(--Card);--jelly-radius:0;--jelly-card-font-size:inherit;--jelly-card-padding-block:0;--jelly-card-padding-inline:0"
			}, { "default": ($$result) => renderTemplate` <a class="doc-pager__link doc-pager__link--prev"${addAttribute(`/Doc/${PrevEntry.id}`, "href")}> <span class="doc-pager__label"> <span aria-hidden="true">←</span> ${" "}Previous
</span> <span class="doc-pager__title"> ${PrevEntry.data.title} </span> </a> ` })}` : null} ${NextEntry ? renderTemplate`${renderComponent($$result, "jelly-card", "jelly-card", {
				"class": "doc-pager__card doc-pager__card--next",
				"style": "--jelly-fill:var(--Card);--jelly-radius:0;--jelly-card-font-size:inherit;--jelly-card-padding-block:0;--jelly-card-padding-inline:0"
			}, { "default": ($$result) => renderTemplate` <a class="doc-pager__link doc-pager__link--next"${addAttribute(`/Doc/${NextEntry.id}`, "href")}> <span class="doc-pager__label">
Next${" "} <span aria-hidden="true">→</span> </span> <span class="doc-pager__title"> ${NextEntry.data.title} </span> </a> ` })}` : null} </nav>`}`,
			"margin": ($$result) => renderTemplate`${renderTemplate`<div> ${renderComponent($$result, "RecordInset", $$RecordInset, { "inset": PageExtent })} </div>`}${Notes.map((Note) => renderTemplate`<div> ${renderComponent($$result, "RecordMargin", $$RecordMargin, { "note": Note })} </div>`)}`
		})} `,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "Header", Header, {
			"client:idle": { timeout: 2e3 },
			"Mode": "functional",
			"slot": "Header",
			"client:component-hydration": "idle",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})}`
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc/[...Slug].astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc/[...Slug].astro";
var $$url = "/Doc/[...Slug]";
// \0virtual:astro:page:Source/pages/Doc/[...Slug]@_@astro
var page = () => ____Slug__exports;
export { page };
