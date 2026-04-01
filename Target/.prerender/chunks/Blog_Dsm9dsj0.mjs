import { c as createComponent, G as GetI18n, $ as $$Base } from './Base_xEyzTpo4.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './prerender_B86tonbF.mjs';
import { H as Header } from './Header_CX6MMaW-.mjs';

const $$Blog = createComponent(($$result, $$props, $$slots) => {
  const T = GetI18n();
  const MetaTitle = T("meta.blog.title", {
    defaultValue: "Blog | Code Editor Land"
  });
  const MetaDescription = T("meta.blog.description", {
    defaultValue: "News, updates, and technical articles from the Code Editor Land team."
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription, "Url": "https://editor.land/Blog", "lang": "en" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header", "client:component-export": "Header" })} ${maybeRenderHead()}<div class="container mx-auto max-w-4xl px-4 py-16"> <!-- Breadcrumbs --> <nav aria-label="Breadcrumb" class="mb-8"> <ol class="flex flex-wrap items-center space-x-2 text-sm text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground">${T("common.breadcrumb.home", {
    defaultValue: "Home"
  })}</a> </li> <li class="mx-2">/</li> <li> <span class="font-medium text-foreground">${T("common.blog.pageTitle", { defaultValue: "Blog" })}</span> </li> </ol> </nav> <!-- Page Header --> <header class="mb-12"> <h1 class="mb-4 text-4xl font-bold tracking-tight"> ${T("common.blog.pageTitle", { defaultValue: "Blog" })} </h1> <p class="text-lg text-muted-foreground"> ${T("common.blog.pageSubtitle", {
    defaultValue: "News, updates, and technical articles from the team."
  })} </p> </header> <!-- Coming Soon --> <section class="StaccatoCard StaccatoBorderShimmer border border-[var(--Border)] bg-white p-12"> <div class="mx-auto max-w-2xl"> <div class="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"> <a href="https://github.com/CodeEditorLand/Land/issues" target="_blank" rel="noopener noreferrer" class="StaccatoButton inline-flex items-center border border-[var(--Border)] bg-[var(--Primary)] px-6 py-2 text-sm font-medium text-white transition-all hover:opacity-90 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]">${T("common.blog.reportIssue", {
    defaultValue: "Report an Issue"
  })}<span class="InlineSeparator">→</span></a> <a href="https://github.com/CodeEditorLand/Land" target="_blank" rel="noopener noreferrer" class="StaccatoButton inline-flex items-center border border-[var(--Border)] bg-white px-6 py-2 text-sm font-medium transition-all hover:bg-[var(--Secondary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]">${T("common.blog.followGitHub", {
    defaultValue: "Follow on GitHub"
  })}<span class="InlineSeparator">→</span></a> </div> <h2 class="mb-4 text-2xl font-semibold"> ${T("common.blog.comingSoonHeading", {
    defaultValue: "Coming Soon"
  })} </h2> <p class="mb-6 text-muted-foreground"> ${T("common.blog.comingSoonText", {
    defaultValue: "We are preparing articles about the architecture, development process, and roadmap for Code Editor Land. Check back soon for updates."
  })} </p> <h3 class="mb-3 text-lg font-semibold"> ${T("common.blog.upcomingTopicsHeading", {
    defaultValue: "Upcoming Topics"
  })} </h3> <ul class="mb-6 space-y-3 text-sm text-muted-foreground"> <li class="flex items-start gap-3"> <span class="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 border border-[var(--Border)] bg-[var(--Primary)]"></span> <span>${T("common.blog.topic.architecture", {
    defaultValue: "Deep dive into the Mountain/Cocoon/Wind/Sky/Air/Echo element architecture and how they replace Electron"
  })}</span> </li> <li class="flex items-start gap-3"> <span class="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 border border-[var(--Border)] bg-[var(--Primary)]"></span> <span>${T("common.blog.topic.effectTS", {
    defaultValue: "How Effect-TS powers type-safe UI services with structured concurrency and error handling"
  })}</span> </li> <li class="flex items-start gap-3"> <span class="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 border border-[var(--Border)] bg-[var(--Primary)]"></span> <span>${T("common.blog.topic.grpc", {
    defaultValue: "gRPC IPC protocol design: bridging Rust and TypeScript at native speed"
  })}</span> </li> <li class="flex items-start gap-3"> <span class="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 border border-[var(--Border)] bg-[var(--Primary)]"></span> <span>${T("common.blog.topic.extensions", {
    defaultValue: "VS Code extension compatibility: running existing extensions without modification via Cocoon"
  })}</span> </li> <li class="flex items-start gap-3"> <span class="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 border border-[var(--Border)] bg-[var(--Primary)]"></span> <span>${T("common.blog.topic.ngi", {
    defaultValue: "Building with NGI0 Commons Fund: open-source sustainability and the European open internet initiative"
  })}</span> </li> </ul> <p class="text-xs text-muted-foreground"> ${T("common.blog.followNote", {
    defaultValue: "Follow progress on GitHub or check back here for published articles."
  })} </p> </div> </section> <!-- Back to top --> <div class="mt-12 border-t pt-8"> <a href="#top" class="StaccatoButton text-sm text-primary hover:underline">${T("common.button.backToTop", {
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
