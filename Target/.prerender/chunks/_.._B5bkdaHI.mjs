import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { M as createAstro, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_CE33w8TD.mjs";
import { t as createComponent } from "./astro-component_CRWsstEh.mjs";
import { n as GetI18n, s as renderScript, t as $$Base } from "./Base_Ch2j7K-P.mjs";
import { r as renderEntry, t as getCollection } from "./_astro_content_Ckaya4Uj.mjs";
import "./Map_Bsl_SrZK.mjs";
import { t as Header } from "./Header_DjWYNAAS.mjs";
import { r as DynamicDocSidebar, t as BuildDocSidebar } from "./BuildDocSidebar_CQgidn_r.mjs";
//#region Source/Component/Dynamic/MermaidFallback.astro
var $$MermaidFallback = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/MermaidFallback.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/MermaidFallback.astro", void 0);
//#endregion
//#region Source/pages/Doc/[...Slug].astro
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
	const { Content } = await renderEntry(Entry);
	const AllEntries = (await getCollection("doc")).sort((A, B) => A.data.order - B.data.order);
	const SidebarSections = BuildDocSidebar(AllEntries);
	const SectionEntries = AllEntries.filter((E) => E.data.section === Entry.data.section);
	const SectionIndex = SectionEntries.findIndex((E) => E.id === Entry.id);
	const PrevEntry = SectionIndex > 0 ? SectionEntries[SectionIndex - 1] : AllEntries[AllEntries.findIndex((E) => E.id === Entry.id) - 1] ?? null;
	const NextEntry = SectionIndex < SectionEntries.length - 1 ? SectionEntries[SectionIndex + 1] : AllEntries[AllEntries.findIndex((E) => E.id === Entry.id) + 1] ?? null;
	const T = GetI18n();
	const MetaTitle = `${Entry.data.title} | Code Editor Land`;
	const MetaDescription = Entry.data.description;
	const AbsoluteDocUrl = (Id) => new URL(`/Doc/${Id}`, Astro.url.origin).href;
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
	})} ${maybeRenderHead($$result)}<div class="mx-auto max-w-6xl px-4 py-8 sm:py-12 lg:py-16"> <div class="flex gap-8 lg:gap-10"> <!-- Desktop sidebar: sticky + independently scrollable --> <aside class="hidden w-52 shrink-0 lg:block xl:w-60" aria-label="Documentation navigation"> <div class="sticky top-6 max-h-[calc(100vh-3.5rem)] overflow-y-auto overscroll-contain pb-8 pr-1 [-webkit-overflow-scrolling:touch] [scrollbar-color:var(--Border)_transparent] [scrollbar-width:thin]"> <p class="mb-2 px-2 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground"> ${T("sidebar.title", {
		ns: "doc",
		defaultValue: "Documentation"
	})} </p> ${renderComponent($$result, "DynamicDocSidebar", DynamicDocSidebar, {
		"Sections": SidebarSections,
		"ActiveId": Entry.id,
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDocSidebar.tsx",
		"client:component-export": "DynamicDocSidebar"
	})} <div class="mt-4 border-t border-border pt-4"> <a href="/Doc/Rust" class="block flat px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]">
Rust API ↗
</a> </div> </div> </aside> <!-- Main content --> <main id="main-content" class="min-w-0 flex-1"> <!-- Mobile sidebar (collapsed by default, shows current page context) --> ${renderComponent($$result, "DynamicDocSidebar", DynamicDocSidebar, {
		"Sections": SidebarSections,
		"ActiveId": Entry.id,
		"Mobile": true,
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDocSidebar.tsx",
		"client:component-export": "DynamicDocSidebar"
	})} <!-- Breadcrumbs --> <nav aria-label="Breadcrumb" class="mb-6 mt-4 hidden sm:block lg:mt-0"> <ol class="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground">${T("common.breadcrumb.home", { defaultValue: "Home" })}</a> </li> <li aria-hidden="true">/</li> <li> <a href="/Doc" class="transition-colors hover:text-foreground">${T("sidebar.title", {
		ns: "doc",
		defaultValue: "Documentation"
	})}</a> </li> <li aria-hidden="true">/</li> <li class="font-medium text-foreground" aria-current="page"> ${Entry.data.title} </li> </ol> </nav> <!-- Article header --> <header class="mb-8 mt-4 lg:mt-0"> <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground"> ${Entry.data.section} </p> <h1 class="mb-3 text-3xl font-bold tracking-tight sm:text-4xl"> ${Entry.data.title} </h1> ${Entry.data.description && renderTemplate`<p class="text-base text-muted-foreground sm:text-lg"> ${Entry.data.description} </p>`} </header> <!-- Doc content - prose with table overflow fix --> <div class="prose prose-neutral max-w-none border-t border-border pt-8 dark:prose-invert prose-headings:tracking-tight prose-a:font-normal prose-code:text-sm prose-pre:overflow-x-auto prose-pre:text-sm prose-table:block prose-table:overflow-x-auto prose-img:rounded-none"> ${renderComponent($$result, "Content", Content, {})} </div> ${renderComponent($$result, "MermaidFallback", $$MermaidFallback, {})} <!-- Prev / Next navigation --> ${(PrevEntry || NextEntry) && renderTemplate`<nav aria-label="Page navigation" class="mt-12 border-t border-border pt-8"> <div class="flex flex-col gap-3 sm:flex-row sm:justify-between"> ${PrevEntry ? renderTemplate`${renderComponent($$result, "jelly-card", "jelly-card", {
		"squish": true,
		"class": "group flex min-w-0 flex-col gap-0.5 flat p-3 sm:max-w-[45%]",
		"style": "--jelly-fill:var(--Card);--jelly-radius:0;--jelly-card-font-size:inherit;--jelly-card-padding-block:0;--jelly-card-padding-inline:0",
		"onclick": `location.href='${AbsoluteDocUrl(PrevEntry.id)}'`
	}, { "default": ($$result) => renderTemplate` <span class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
← Previous
</span> <span class="truncate text-sm font-medium text-foreground"> ${PrevEntry.data.title} </span> ` })}` : renderTemplate`<span></span>`} ${NextEntry && renderTemplate`${renderComponent($$result, "jelly-card", "jelly-card", {
		"squish": true,
		"class": "group flex min-w-0 flex-col gap-0.5 flat p-3 text-right sm:ml-auto sm:max-w-[45%]",
		"style": "--jelly-fill:var(--Card);--jelly-radius:0;--jelly-card-font-size:inherit;--jelly-card-padding-block:0;--jelly-card-padding-inline:0",
		"onclick": `location.href='${AbsoluteDocUrl(NextEntry.id)}'`
	}, { "default": ($$result) => renderTemplate` <span class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
Next →
</span> <span class="truncate text-sm font-medium text-foreground"> ${NextEntry.data.title} </span> ` })}`} </div> </nav>`} </main> </div> </div> ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc/[...Slug].astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc/[...Slug].astro";
var $$url = "/Doc/[...Slug]";
//#endregion
//#region \0virtual:astro:page:Source/pages/Doc/[...Slug]@_@astro
var page = () => ____Slug__exports;
//#endregion
export { page };
