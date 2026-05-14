import { c as createComponent } from './astro-component_DzJ15MYN.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from './prerender_CyJMqgoM.mjs';
import { getCollection } from './_astro_content_QVNE1-hI.mjs';
import { H as Header } from './Header_D9EGRaC3.mjs';
import { G as GetI18n, $ as $$Base } from './Base_DgX_hI0X.mjs';

const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const T = GetI18n();
  const MetaTitle = T("meta.title", {
    ns: "blog",
    defaultValue: "Blog | Code Editor Land"
  });
  const MetaDescription = T("meta.description", {
    ns: "blog",
    defaultValue: "Architecture deep-dives, release notes, and updates."
  });
  const PageTitle = T("page.title", { ns: "blog", defaultValue: "Blog" });
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
  const BlogEntries = (await getCollection("blog")).sort(
    (A, B) => B.data.publishedAt.localeCompare(A.data.publishedAt)
  );
  const Posts = BlogEntries.map((Entry) => ({
    Slug: Entry.id,
    Title: Entry.data.title,
    Summary: Entry.data.summary,
    PublishedAt: Entry.data.publishedAt,
    Tags: Entry.data.tags,
    Author: Entry.data.author,
    ReadTime: Entry.data.readTime
  }));
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription, "Url": "https://editor.land/Blog", "lang": "en" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header", "client:component-export": "Header" })} ${maybeRenderHead()}<div class="container mx-auto max-w-4xl px-4 py-16"> <!-- Breadcrumbs --> <nav aria-label="Breadcrumb" class="mb-8"> <ol class="flex flex-wrap items-center space-x-2 text-sm text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground">${T("common.breadcrumb.home", {
    defaultValue: "Home"
  })}</a> </li> <li class="mx-2">/</li> <li> <span class="font-medium text-foreground">${PageTitle}</span> </li> </ol> </nav> <!-- Page Header --> <header class="mb-12"> <h1 id="BlogPostsHeading" class="mb-4 text-4xl font-bold tracking-tight"> ${PageTitle} </h1> <p class="whitespace-pre-line text-lg text-muted-foreground"> ${PageSubtitle} </p> </header> <!-- Post Grid or Empty State --> <section aria-labelledby="BlogPostsHeading"> ${Posts.length === 0 ? renderTemplate`<div class="StaccatoCard border border-[var(--ColorBorder)] bg-[var(--ColorCard)] p-12 text-center"> <h2 class="mb-3 text-xl font-semibold">${EmptyTitle}</h2> <p class="whitespace-pre-line text-muted-foreground"> ${EmptySubtitle} </p> </div>` : renderTemplate`<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"> ${Posts.map((Post) => renderTemplate`<a${addAttribute(`/Blog/${Post.Slug}`, "href")} class="block transition-opacity hover:opacity-80 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--ColorPrimary)]"> <article class="StaccatoCard h-full border border-[var(--ColorBorder)] bg-[var(--ColorCard)] p-6"> ${Post.Tags.length > 0 && renderTemplate`<div class="mb-3 flex flex-wrap gap-2"> ${Post.Tags.map((Tag) => renderTemplate`<span class="border border-[var(--ColorBorder)] px-2 py-0.5 text-xs font-medium text-muted-foreground"> ${Tag} </span>`)} </div>`} <h3 class="mb-2 text-xl font-semibold"> ${Post.Title} </h3> <p class="mb-4 whitespace-pre-line text-sm text-muted-foreground"> ${Post.Summary} </p> <div class="flex items-center justify-between text-xs text-muted-foreground"> <span>${Post.Author}</span> <span>${Post.ReadTime} min read</span> </div> </article> </a>`)} </div>`} </section> <!-- Back to top --> <div class="mt-12 border-t pt-8"> <a href="#top" class="StaccatoButton text-sm text-primary hover:underline">${T("common.button.backToTop", {
    defaultValue: "Back to top"
  })}<span class="InlineSeparator">↑</span></a> </div> </div> ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Blog.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Blog.astro";
const $$url = "/Blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Blog,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
