import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { M as createAstro, b as addAttribute, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_CE33w8TD.mjs";
import { t as createComponent } from "./astro-component_CRWsstEh.mjs";
import { n as GetI18n, t as $$Base } from "./Base_Ch2j7K-P.mjs";
import { t as getCollection } from "./_astro_content_Ckaya4Uj.mjs";
import "./Map_Bsl_SrZK.mjs";
import { t as Header } from "./Header_DjWYNAAS.mjs";
//#region Source/pages/Blog.astro
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
		defaultValue: "Architecture, releases, and the road ahead."
	});
	const EmptyTitle = T("empty.title", {
		ns: "blog",
		defaultValue: "No posts yet"
	});
	const EmptySubtitle = T("empty.subtitle", {
		ns: "blog",
		defaultValue: "Check back soon for updates."
	});
	const Posts = (await getCollection("blog")).sort((A, B) => B.data.publishedAt.localeCompare(A.data.publishedAt)).map((Entry) => ({
		Slug: Entry.id,
		Title: Entry.data.title,
		Summary: Entry.data.summary,
		PublishedAt: Entry.data.publishedAt,
		Tags: Entry.data.tags,
		Author: Entry.data.author,
		ReadTime: Entry.data.readTime
	}));
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
	})} ${maybeRenderHead($$result)}<div class="container mx-auto max-w-4xl px-4 py-16"> <!-- Breadcrumbs --> <nav aria-label="Breadcrumb" class="mb-8"> <ol class="flex flex-wrap items-center space-x-2 text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground">${T("common.breadcrumb.home", { defaultValue: "Home" })}</a> </li> <li class="mx-2">/</li> <li> <span class="font-medium text-foreground">${PageTitle}</span> </li> </ol> </nav> <!-- Page Header (3-part rhythm: heading + small grayed help + wide body padding) --> <header class="mx-auto mb-24 max-w-2xl text-center"> <h1 id="BlogPostsHeading" class="text-2xl font-semibold tracking-tight sm:text-3xl"> ${PageTitle} </h1> <p class="mt-3 whitespace-pre-line text-muted"> ${PageSubtitle} </p> </header> <!-- Post Grid or Empty State --> <section aria-labelledby="BlogPostsHeading"> ${Posts.length === 0 ? renderTemplate`<div class="StaccatoCard bg-card p-12 text-center"> <h2 class="mb-3 text-xl font-semibold">${EmptyTitle}</h2> <p class="whitespace-pre-line text-muted-foreground"> ${EmptySubtitle} </p> </div>` : renderTemplate`<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"> ${Posts.map((Post) => renderTemplate`<a${addAttribute(`/Blog/${Post.Slug}`, "href")} class="block transition-opacity hover:opacity-80 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"> <article class="StaccatoCard h-full bg-card p-6"> ${Post.Tags.length > 0 && renderTemplate`<div class="mb-3 flex flex-wrap gap-2"> ${Post.Tags.map((Tag) => renderTemplate`<span class="px-2 py-0.5 font-medium text-muted-foreground"> ${Tag} </span>`)} </div>`} <h3 class="mb-2 text-xl font-semibold"> ${Post.Title} </h3> <p class="mb-4 whitespace-pre-line text-muted-foreground"> ${Post.Summary} </p> <div class="flex items-center justify-between text-muted-foreground"> <span>${Post.Author}</span> <span>${Post.ReadTime} min read</span> </div> </article> </a>`)} </div>`} </section> <!-- Back to top --> <div class="mt-12 border-t pt-8"> <a href="#top" class="StaccatoButton text-primary hover:underline">${T("common.button.backToTop", { defaultValue: "Back to top" })}<span class="InlineSeparator">↑</span></a> </div> </div> ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Blog.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Blog.astro";
var $$url = "/Blog";
//#endregion
//#region \0virtual:astro:page:Source/pages/Blog@_@astro
var page = () => Blog_exports;
//#endregion
export { page };
