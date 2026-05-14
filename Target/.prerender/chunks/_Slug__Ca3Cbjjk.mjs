import { c as createComponent } from './astro-component_DzJ15MYN.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from './prerender_CyJMqgoM.mjs';
import { getCollection, render as renderEntry } from './_astro_content_QVNE1-hI.mjs';
import { H as Header } from './Header_D9EGRaC3.mjs';
import { G as GetI18n, $ as $$Base } from './Base_DgX_hI0X.mjs';

async function getStaticPaths() {
  const Entries = await getCollection("blog");
  return Entries.map((Entry) => ({
    params: { Slug: Entry.id },
    props: { Entry }
  }));
}
const $$Slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Slug;
  const { Entry } = Astro2.props;
  const { Content } = await renderEntry(Entry);
  const T = GetI18n();
  const MetaTitle = `${Entry.data.title} | Code Editor Land`;
  const MetaDescription = Entry.data.summary;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription, "Url": `https://editor.land/Blog/${Entry.id}`, "lang": "en" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header", "client:component-export": "Header" })} ${maybeRenderHead()}<div class="container mx-auto max-w-3xl px-4 py-16"> <!-- Breadcrumbs --> <nav aria-label="Breadcrumb" class="mb-8"> <ol class="flex flex-wrap items-center space-x-2 text-sm text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground">${T("common.breadcrumb.home", {
    defaultValue: "Home"
  })}</a> </li> <li class="mx-2">/</li> <li> <a href="/Blog" class="transition-colors hover:text-foreground">${T("page.title", {
    ns: "blog",
    defaultValue: "Blog"
  })}</a> </li> <li class="mx-2">/</li> <li> <span class="font-medium text-foreground">${Entry.data.title}</span> </li> </ol> </nav> <!-- Post Header --> <header class="mb-10"> ${Entry.data.tags.length > 0 && renderTemplate`<div class="mb-4 flex flex-wrap gap-2"> ${Entry.data.tags.map((Tag) => renderTemplate`<span class="border border-[var(--ColorBorder)] px-2 py-0.5 text-xs font-medium text-muted-foreground"> ${Tag} </span>`)} </div>`} <h1 id="main-content" class="mb-4 text-4xl font-bold tracking-tight"> ${Entry.data.title} </h1> <p class="mb-4 text-lg text-muted-foreground"> ${Entry.data.summary} </p> <div class="flex items-center gap-4 text-sm text-muted-foreground"> <span>${Entry.data.author}</span> <span>&#x2001;</span> <time${addAttribute(Entry.data.publishedAt, "datetime")}>${Entry.data.publishedAt}</time> <span>&#x2001;</span> <span>${Entry.data.readTime} min read</span> </div> </header> <!-- Post Content --> <main id="main-content" class="prose prose-neutral max-w-none border-t border-[var(--ColorBorder)] pt-8"> ${renderComponent($$result2, "Content", Content, {})} </main> <!-- Back to Blog --> <div class="mt-12 border-t pt-8"> <a href="/Blog" class="StaccatoButton text-sm text-primary hover:underline">${T("page.title", { ns: "blog", defaultValue: "Blog" })}<span class="InlineSeparator">←</span></a> </div> </div> ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Blog/[Slug].astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Blog/[Slug].astro";
const $$url = "/Blog/[Slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Slug,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
