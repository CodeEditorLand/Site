import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { M as createAstro, b as addAttribute, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_CE33w8TD.mjs";
import { t as createComponent } from "./astro-component_CRWsstEh.mjs";
import { n as GetI18n, t as $$Base } from "./Base_COJ4buS_.mjs";
import { r as renderEntry, t as getCollection } from "./_astro_content_Ckaya4Uj.mjs";
import "./Map_Bsl_SrZK.mjs";
import { t as Header } from "./Header_D8R5Cezc.mjs";
//#region Source/pages/Blog/[Slug].astro
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
	const { Content } = await renderEntry(Entry);
	const T = GetI18n();
	const MetaTitle = `${Entry.data.title} | Code Editor Land`;
	const MetaDescription = Entry.data.summary;
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription,
		"Url": Astro.url.href,
		"lang": "en"
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Header", Header, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
		"client:component-export": "Header"
	})} ${maybeRenderHead($$result)}<div class="mx-auto max-w-3xl px-4 py-8 sm:py-12 lg:py-16"> <!-- Breadcrumbs --> <nav aria-label="Breadcrumb" class="mb-8"> <ol class="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground">${T("common.breadcrumb.home", { defaultValue: "Home" })}</a> </li> <li aria-hidden="true">/</li> <li> <a href="/Blog" class="transition-colors hover:text-foreground">${T("page.title", {
		ns: "blog",
		defaultValue: "Blog"
	})}</a> </li> <li aria-hidden="true">/</li> <li class="font-medium text-foreground" aria-current="page"> ${Entry.data.title} </li> </ol> </nav> <!-- Post Header --> <header class="mb-10"> ${Entry.data.tags.length > 0 && renderTemplate`<div class="mb-4 flex flex-wrap gap-2"> ${Entry.data.tags.map((Tag) => renderTemplate`<span class="bg-muted px-2 py-0.5 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground"> ${Tag} </span>`)} </div>`} <h1 class="mb-3 text-2xl font-semibold tracking-tight sm:text-3xl"> ${Entry.data.title} </h1> <p class="mb-4 text-base text-muted-foreground"> ${Entry.data.summary} </p> <div class="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground"> <span>${Entry.data.author}</span> <span aria-hidden="true">&#x2001;·&#x2001;</span> <time${addAttribute(Entry.data.publishedAt, "datetime")}>${Entry.data.publishedAt}</time> <span aria-hidden="true">&#x2001;·&#x2001;</span> <span>${Entry.data.readTime} min read</span> </div> </header> <!-- Post Content --> <main id="main-content" class="prose prose-neutral max-w-none border-t border-border pt-8 dark:prose-invert prose-headings:tracking-tight prose-a:font-normal prose-code:text-sm prose-pre:overflow-x-auto prose-pre:text-sm prose-table:block prose-table:overflow-x-auto"> ${renderComponent($$result, "Content", Content, {})} </main> <!-- Back to Blog --> <div class="mt-12 border-t pt-8"> <a href="/Blog" class="StaccatoButton text-primary hover:underline">${T("page.title", {
		ns: "blog",
		defaultValue: "Blog"
	})}<span class="InlineSeparator">←</span></a> </div> </div> ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Blog/[Slug].astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Blog/[Slug].astro";
var $$url = "/Blog/[Slug]";
//#endregion
//#region \0virtual:astro:page:Source/pages/Blog/[Slug]@_@astro
var page = () => _Slug__exports;
//#endregion
export { page };
