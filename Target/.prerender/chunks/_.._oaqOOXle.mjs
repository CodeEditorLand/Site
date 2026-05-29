import { c as createComponent } from './astro-component_BZQgjcIA.mjs';
import 'piccolore';
import { w as renderComponent, B as renderTemplate, v as maybeRenderHead, n as addAttribute } from './prerender_tA-vfw3g.mjs';
import { getCollection, render as renderEntry } from './_astro_content_z7RQwGeJ.mjs';
import { D as DynamicDocSidebar } from './DynamicDocSidebar_BNJ18hBi.mjs';
import { H as Header } from './Header_Bnn3YZ4O.mjs';
import { G as GetI18n, $ as $$Base } from './Base_Bw3w2cEv.mjs';

async function getStaticPaths() {
  const Entries = await getCollection("doc");
  return Entries.map((Entry) => ({
    params: { Slug: Entry.id },
    props: { Entry }
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$;
  const { Entry } = Astro2.props;
  const { Content } = await renderEntry(Entry);
  const AllEntries = (await getCollection("doc")).sort(
    (A, B) => A.data.order - B.data.order
  );
  const SectionOrder = [
    "Start",
    "Architecture",
    "Usage",
    "Development",
    "Community",
    "Support",
    "Element",
    "Technology",
    "License"
  ];
  const GroupedBySection = /* @__PURE__ */ new Map();
  for (const E of AllEntries) {
    const Section = E.data.section ?? "Other";
    if (!GroupedBySection.has(Section)) {
      GroupedBySection.set(Section, []);
    }
    GroupedBySection.get(Section).push({
      Id: E.id,
      Label: E.data.title
    });
  }
  const SidebarSections = SectionOrder.filter(
    (Section) => GroupedBySection.has(Section)
  ).map((Section) => ({
    Id: Section.toLowerCase().replace(/\s+/g, "-"),
    Label: Section,
    Children: GroupedBySection.get(Section)
  }));
  const CurrentIndex = AllEntries.findIndex((E) => E.id === Entry.id);
  const PrevEntry = CurrentIndex > 0 ? AllEntries[CurrentIndex - 1] : null;
  const NextEntry = CurrentIndex < AllEntries.length - 1 ? AllEntries[CurrentIndex + 1] : null;
  const T = GetI18n();
  const MetaTitle = `${Entry.data.title} | Code Editor Land`;
  const MetaDescription = Entry.data.description;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription, "Url": `https://land.playform.cloud/Doc/${Entry.id}`, "lang": "en" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header", "client:component-export": "Header" })} ${maybeRenderHead()}<div class="container mx-auto max-w-6xl px-4 py-16"> <div class="flex gap-8"> <!-- Sidebar --> <aside class="hidden w-56 shrink-0 lg:block"> <div class="sticky top-8"> <p class="mb-3 font-semibold uppercase tracking-wider text-muted-foreground"> ${T("sidebar.title", {
    ns: "doc",
    defaultValue: "Documentation"
  })} </p> ${renderComponent($$result2, "DynamicDocSidebar", DynamicDocSidebar, { "Sections": SidebarSections, "ActiveId": Entry.id, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDocSidebar", "client:component-export": "DynamicDocSidebar" })} </div> </aside> <!-- Main content --> <main id="main-content" class="min-w-0 flex-1"> <!-- Breadcrumbs --> <nav aria-label="Breadcrumb" class="mb-8"> <ol class="flex flex-wrap items-center space-x-2 text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground">${T("common.breadcrumb.home", {
    defaultValue: "Home"
  })}</a> </li> <li class="mx-2">/</li> <li> <a href="/Doc" class="transition-colors hover:text-foreground">${T("sidebar.title", {
    ns: "doc",
    defaultValue: "Documentation"
  })}</a> </li> <li class="mx-2">/</li> <li> <span class="font-medium text-foreground">${Entry.data.title}</span> </li> </ol> </nav> <!-- Article header --> <header class="mb-8"> <p class="mb-2 font-semibold uppercase tracking-wider text-muted-foreground"> ${Entry.data.section} </p> <h1 class="mb-3 text-4xl font-bold tracking-tight"> ${Entry.data.title} </h1> <p class="text-[var(--MuteForeground)]"> ${Entry.data.description} </p> </header> <!-- Doc content --> <div class="prose prose-neutral max-w-none border-t border-[var(--ColorBorder)] pt-8"> ${renderComponent($$result2, "Content", Content, {})} </div> <!-- Prev / Next navigation --> ${(PrevEntry || NextEntry) && renderTemplate`<div class="mt-12 flex justify-between border-t border-[var(--ColorBorder)] pt-8"> ${PrevEntry ? renderTemplate`<a${addAttribute(`/Doc/${PrevEntry.id}`, "href")} class="StaccatoButton text-primary hover:underline"> ${PrevEntry.data.title} <span class="InlineSeparator">←</span> </a>` : renderTemplate`<span></span>`} ${NextEntry && renderTemplate`<a${addAttribute(`/Doc/${NextEntry.id}`, "href")} class="StaccatoButton text-primary hover:underline"> ${NextEntry.data.title} <span class="InlineSeparator">→</span> </a>`} </div>`} </main> </div> </div> ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc/[...Slug].astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc/[...Slug].astro";
const $$url = "/Doc/[...Slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
