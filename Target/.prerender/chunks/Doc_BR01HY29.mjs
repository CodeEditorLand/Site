import { c as createComponent } from './astro-component_BZQgjcIA.mjs';
import 'piccolore';
import { w as renderComponent, B as renderTemplate, v as maybeRenderHead, n as addAttribute } from './prerender_tA-vfw3g.mjs';
import { getCollection } from './_astro_content_z7RQwGeJ.mjs';
import { D as DynamicDocSidebar } from './DynamicDocSidebar_BNJ18hBi.mjs';
import { H as Header } from './Header_Bnn3YZ4O.mjs';
import { G as GetI18n, $ as $$Base } from './Base_Bw3w2cEv.mjs';

const $$Doc = createComponent(async ($$result, $$props, $$slots) => {
  const DocEntries = (await getCollection("doc")).sort(
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
  for (const Entry of DocEntries) {
    const Section = Entry.data.section ?? "Other";
    if (!GroupedBySection.has(Section)) {
      GroupedBySection.set(Section, []);
    }
    GroupedBySection.get(Section).push({
      Id: Entry.id,
      Label: Entry.data.title
    });
  }
  const SidebarSections = SectionOrder.filter(
    (Section) => GroupedBySection.has(Section)
  ).map((Section) => ({
    Id: Section.toLowerCase().replace(/\s+/g, "-"),
    Label: Section,
    Children: GroupedBySection.get(Section)
  }));
  const T = GetI18n();
  const MetaTitle = T("meta.docs.title", {
    defaultValue: "Documentation | Code Editor Land"
  });
  const MetaDescription = T("meta.docs.description", {
    defaultValue: "Browse the Code Editor Land documentation, architecture guides, and developer resources."
  });
  const Element = [
    { Name: "Mountain" },
    { Name: "Cocoon" },
    { Name: "Wind" },
    { Name: "Sky" },
    { Name: "Air" },
    { Name: "Echo" },
    { Name: "Common" },
    { Name: "Vine" },
    { Name: "Mist" },
    { Name: "Rest" },
    { Name: "Output" },
    { Name: "Grove" },
    { Name: "Worker" },
    { Name: "SideCar" },
    { Name: "Maintain" }
  ];
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription, "Url": "https://land.playform.cloud/Doc", "lang": "en" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header", "client:component-export": "Header" })} ${maybeRenderHead()}<div class="container mx-auto max-w-6xl px-4 py-16"> <div class="flex gap-8"> <!-- Sidebar - sticky on desktop, hidden on mobile --> <aside class="hidden w-56 shrink-0 lg:block"> <div class="sticky top-8"> <p class="mb-3 font-semibold uppercase tracking-wider text-muted-foreground"> ${T("sidebar.title", {
    ns: "doc",
    defaultValue: "Documentation"
  })} </p> ${renderComponent($$result2, "DynamicDocSidebar", DynamicDocSidebar, { "Sections": SidebarSections, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDocSidebar", "client:component-export": "DynamicDocSidebar" })} <div class="mt-4 border-t border-[var(--Border)] pt-4"> <a href="/Doc/Rust" class="block px-3 py-2 text-muted-foreground transition-colors hover:bg-[var(--Secondary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]">
Rust API
</a> </div> </div> </aside> <!-- Main content --> <main id="main-content" class="min-w-0 flex-1"> <!-- Breadcrumbs --> <nav aria-label="Breadcrumb" class="mb-8"> <ol class="flex flex-wrap items-center space-x-2 text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground">${T("common.breadcrumb.home", {
    defaultValue: "Home"
  })}</a> </li> <li class="mx-2">/</li> <li> <span class="font-medium text-foreground">${T("common.docs.pageTitle", {
    defaultValue: "Documentation"
  })}</span> </li> </ol> </nav> <!-- Page Header --> <header class="mb-12"> <h1 class="text-2xl font-semibold tracking-tight sm:text-3xl"> ${T("common.docs.pageTitle", {
    defaultValue: "Documentation"
  })} </h1> <p class="text-[var(--MuteForeground)]"> ${T("common.docs.pageSubtitle", {
    defaultValue: "Everything you need to install, build, and contribute to Land."
  })} </p> </header> <!-- Quick Links: GitHub, Issues, Rust API --> <div class="grid grid-cols-1 gap-6 md:grid-cols-3"> <a href="https://github.com/CodeEditorLand/Land#readme" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer block bg-white p-6 transition-colors hover:bg-[var(--Secondary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"> <h2 class="mb-2 text-xl font-semibold"> ${T("common.docs.gettingStarted.title", {
    defaultValue: "Get Started in Minutes"
  })} </h2> <p class="text-muted-foreground"> ${T("common.docs.gettingStarted.description", {
    defaultValue: "The README walks you through installation, first build, and the fifteen-element architecture. No prior Rust or Tauri knowledge required."
  })} </p> </a> <a href="https://github.com/CodeEditorLand/Land/issues" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer block bg-white p-6 transition-colors hover:bg-[var(--Secondary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"> <h2 class="mb-2 text-xl font-semibold"> ${T("common.docs.issueTracker.title", {
    defaultValue: "Report a Bug or Request a Feature"
  })} </h2> <p class="text-muted-foreground"> ${T("common.docs.issueTracker.description", {
    defaultValue: "Open an issue on GitHub. The team monitors daily and labels good-first-issue tasks for new contributors."
  })} </p> </a> <a href="/Doc/Rust" class="StaccatoCard StaccatoBorderShimmer block bg-white p-6 transition-colors hover:bg-[var(--Secondary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"> <h2 class="mb-2 text-xl font-semibold"> ${T("common.docs.rustApi.title", {
    defaultValue: "Rust API Reference"
  })} </h2> <p class="text-muted-foreground"> ${T("common.docs.rustApi.description", {
    defaultValue: "Browse generated rustdoc output for Mountain, Echo, Air, and 11 more Rust crates."
  })} </p> </a> </div> <!-- Guides: grouped by section --> ${SectionOrder.filter(
    (Section) => GroupedBySection.has(Section)
  ).map((Section) => {
    const Entries = DocEntries.filter(
      (E) => E.data.section === Section
    );
    if (Entries.length === 0) return null;
    return renderTemplate`<section class="mt-12"${addAttribute(Section.toLowerCase().replace(/\s+/g, "-"), "id")}> <h2 class="mb-6 text-2xl font-semibold"> ${Section} </h2> <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"> ${Entries.map((Entry) => renderTemplate`<a${addAttribute(`/Doc/${Entry.id}`, "href")} class="StaccatoCard StaccatoBorderShimmer block bg-white p-4 transition-colors hover:bg-[var(--Secondary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"> <h3 class="font-medium"> ${Entry.data.title} </h3> ${Entry.data.description && renderTemplate`<p class="mt-1 text-muted-foreground"> ${Entry.data.description} </p>`} </a>`)} </div> </section>`;
  })} <!-- Architecture Summary --> <section class="mt-12"> <h2 class="mb-6 text-2xl font-semibold"> ${T("common.docs.architecture.heading", {
    defaultValue: "How Land Replaces VS Code's Electron Stack"
  })} </h2> <div class="StaccatoCard StaccatoBorderShimmer bg-white p-6"> <p class="mb-4 text-muted-foreground"> ${T("common.docs.architecture.intro", {
    defaultValue: "VS Code runs on Electron: a Chromium browser, a Node.js runtime, and an extension-host model. Land replaces those pieces with independent elements while preserving the VS Code extension API as the compatibility target. Browse individual elements in the Element section above, or explore the workspace on GitHub."
  })} </p> <div class="flex flex-wrap gap-3"> ${Element.map((E) => renderTemplate`<a${addAttribute(`/Doc/${E.Name.toLowerCase()}`, "href")} class="inline-flex items-center gap-1 bg-white px-3 py-1.5 transition-colors hover:bg-[var(--Secondary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"> ${E.Name} </a>`)} </div> <div class="mt-4 border-t border-[var(--Border)] pt-4"> <a href="https://github.com/CodeEditorLand" target="_blank" rel="noopener noreferrer" class="font-medium text-[var(--Primary)] hover:underline"> ${T("common.docs.repositories.viewAll", {
    defaultValue: "View all repositories"
  })} <span class="InlineSeparator">↗</span> </a> </div> </div> </section> <!-- Backend Services (Cloudflare Workers) --> <section class="mt-12"> <h2 class="mb-6 text-2xl font-semibold"> ${T("common.docs.workers.heading", {
    defaultValue: "Backend Services"
  })} </h2> <div class="StaccatoCard StaccatoBorderShimmer bg-white p-6"> <p class="mb-4 text-muted-foreground"> ${T("common.docs.workers.intro", {
    defaultValue: "Four Cloudflare Workers power the Land backend infrastructure:"
  })} </p> <ul class="space-y-3"> <li> <a href="https://codeeditorland-auth.playform.workers.dev" target="_blank" rel="noopener noreferrer" class="font-semibold text-[var(--Primary)] hover:underline">Auth<span class="InlineSeparator">↗</span></a> <span class="text-muted-foreground"> ${" - "} ${T("common.docs.workers.auth", {
    defaultValue: "OAuth 2.0, JWT session tokens, and Auth0 integration"
  })} </span> </li> <li> <a href="https://codeeditorland-download.playform.workers.dev" target="_blank" rel="noopener noreferrer" class="font-semibold text-[var(--Primary)] hover:underline">Download<span class="InlineSeparator">↗</span></a> <span class="text-muted-foreground"> ${" - "} ${T("common.docs.workers.download", {
    defaultValue: "Binary distribution, release metadata, and update checks"
  })} </span> </li> <li> <a href="https://codeeditorland-status.playform.workers.dev" target="_blank" rel="noopener noreferrer" class="font-semibold text-[var(--Primary)] hover:underline">Status<span class="InlineSeparator">↗</span></a> <span class="text-muted-foreground"> ${" - "} ${T("common.docs.workers.status", {
    defaultValue: "Health checks and uptime monitoring"
  })} </span> </li> <li> <a href="https://codeeditorland-analytics.playform.workers.dev" target="_blank" rel="noopener noreferrer" class="font-semibold text-[var(--Primary)] hover:underline">Analytics<span class="InlineSeparator">↗</span></a> <span class="text-muted-foreground"> ${" - "} ${T("common.docs.workers.analytics", {
    defaultValue: "Privacy-first usage telemetry routed through Cloudflare Analytics Engine"
  })} </span> </li> </ul> </div> </section> <!-- Live Deployments --> <section class="mt-12"> <h2 class="mb-6 text-2xl font-semibold"> ${T("common.docs.deployments.heading", {
    defaultValue: "Live Deployments"
  })} </h2> <div class="StaccatoCard StaccatoBorderShimmer bg-white p-6"> <p class="mb-4 text-muted-foreground"> ${T("common.docs.deployments.intro", {
    defaultValue: "Public website and documentation surfaces are deployed separately from the local editor runtime:"
  })} </p> <div class="grid grid-cols-1 gap-3 md:grid-cols-2"> <a href="https://land.playform.cloud" target="_blank" rel="noopener noreferrer" class="block bg-white px-4 py-3 transition-colors hover:bg-[var(--Secondary)]"> <span class="font-semibold">${T("common.docs.deployments.website", {
    defaultValue: "Land.PlayForm.Cloud"
  })}</span> <span class="InlineSeparator">↗</span> <p class="mt-1 text-muted-foreground"> ${T(
    "common.docs.deployments.website.description",
    {
      defaultValue: "Marketing website (Cloudflare Pages)"
    }
  )} </p> </a> <a href="https://Status.Land.PlayForm.Cloud" target="_blank" rel="noopener noreferrer" class="block bg-white px-4 py-3 transition-colors hover:bg-[var(--Secondary)]"> <span class="font-semibold">${T("common.docs.deployments.status", {
    defaultValue: "Status"
  })}</span> <span class="InlineSeparator">↗</span> <p class="mt-1 text-muted-foreground"> ${T(
    "common.docs.deployments.status.description",
    {
      defaultValue: "Uptime dashboard (Cloudflare Pages)"
    }
  )} </p> </a> <a href="https://Rust.Documentation.Mountain.Land.PlayForm.Cloud" target="_blank" rel="noopener noreferrer" class="block bg-white px-4 py-3 transition-colors hover:bg-[var(--Secondary)]"> <span class="font-semibold">${T(
    "common.docs.deployments.rustMountain",
    {
      defaultValue: "Rust API: Mountain"
    }
  )}</span> <span class="InlineSeparator">↗</span> <p class="mt-1 text-muted-foreground"> ${T(
    "common.docs.deployments.rustMountain.description",
    {
      defaultValue: "rustdoc for Mountain, Echo, Common, Air, SideCar"
    }
  )} </p> </a> <a href="https://Rust.Documentation.Rest.Land.PlayForm.Cloud" target="_blank" rel="noopener noreferrer" class="block bg-white px-4 py-3 transition-colors hover:bg-[var(--Secondary)]"> <span class="font-semibold">${T("common.docs.deployments.rustRest", {
    defaultValue: "Rust API: Rest"
  })}</span> <span class="InlineSeparator">↗</span> <p class="mt-1 text-muted-foreground"> ${T(
    "common.docs.deployments.rustRest.description",
    {
      defaultValue: "rustdoc for OXC-powered TypeScript compiler"
    }
  )} </p> </a> <a href="https://Rust.Documentation.Maintain.Land.PlayForm.Cloud" target="_blank" rel="noopener noreferrer" class="block bg-white px-4 py-3 transition-colors hover:bg-[var(--Secondary)]"> <span class="font-semibold">${T(
    "common.docs.deployments.rustMaintain",
    {
      defaultValue: "Rust API: Maintain"
    }
  )}</span> <span class="InlineSeparator">↗</span> <p class="mt-1 text-muted-foreground"> ${T(
    "common.docs.deployments.rustMaintain.description",
    {
      defaultValue: "rustdoc for build orchestrator"
    }
  )} </p> </a> <a href="https://Rust.Documentation.Common.Land.PlayForm.Cloud" target="_blank" rel="noopener noreferrer" class="block bg-white px-4 py-3 transition-colors hover:bg-[var(--Secondary)]"> <span class="font-semibold">${T(
    "common.docs.deployments.rustCommon",
    {
      defaultValue: "Rust API: Common"
    }
  )}</span> <span class="InlineSeparator">↗</span> <p class="mt-1 text-muted-foreground"> ${T(
    "common.docs.deployments.rustCommon.description",
    {
      defaultValue: "rustdoc for abstract traits and DTOs"
    }
  )} </p> </a> <a href="https://Rust.Documentation.Echo.Land.PlayForm.Cloud" target="_blank" rel="noopener noreferrer" class="block bg-white px-4 py-3 transition-colors hover:bg-[var(--Secondary)]"> <span class="font-semibold">${T("common.docs.deployments.rustEcho", {
    defaultValue: "Rust API: Echo"
  })}</span> <span class="InlineSeparator">↗</span> <p class="mt-1 text-muted-foreground"> ${T(
    "common.docs.deployments.rustEcho.description",
    {
      defaultValue: "rustdoc for work-stealing scheduler"
    }
  )} </p> </a> <a href="https://Rust.Documentation.Air.Land.PlayForm.Cloud" target="_blank" rel="noopener noreferrer" class="block bg-white px-4 py-3 transition-colors hover:bg-[var(--Secondary)]"> <span class="font-semibold">${T("common.docs.deployments.rustAir", {
    defaultValue: "Rust API: Air"
  })}</span> <span class="InlineSeparator">↗</span> <p class="mt-1 text-muted-foreground"> ${T(
    "common.docs.deployments.rustAir.description",
    {
      defaultValue: "rustdoc for background daemon"
    }
  )} </p> </a> <a href="https://Rust.Documentation.SideCar.Land.PlayForm.Cloud" target="_blank" rel="noopener noreferrer" class="block bg-white px-4 py-3 transition-colors hover:bg-[var(--Secondary)]"> <span class="font-semibold">${T(
    "common.docs.deployments.rustSideCar",
    {
      defaultValue: "Rust API: SideCar"
    }
  )}</span> <span class="InlineSeparator">↗</span> <p class="mt-1 text-muted-foreground"> ${T(
    "common.docs.deployments.rustSideCar.description",
    {
      defaultValue: "rustdoc for Node.js binary distribution"
    }
  )} </p> </a> <a href="https://Rust.Documentation.Land.Land.PlayForm.Cloud" target="_blank" rel="noopener noreferrer" class="block bg-white px-4 py-3 transition-colors hover:bg-[var(--Secondary)]"> <span class="font-semibold">${T("common.docs.deployments.rustLand", {
    defaultValue: "Rust API: Land (Workspace)"
  })}</span> <span class="InlineSeparator">↗</span> <p class="mt-1 text-muted-foreground"> ${T(
    "common.docs.deployments.rustLand.description",
    {
      defaultValue: "rustdoc for the top-level workspace"
    }
  )} </p> </a> <a href="https://Knowledge.Land.PlayForm.Cloud" target="_blank" rel="noopener noreferrer" class="block bg-white px-4 py-3 transition-colors hover:bg-[var(--Secondary)]"> <span class="font-semibold">${T("common.docs.deployments.knowledge", {
    defaultValue: "Knowledge Base"
  })}</span> <span class="InlineSeparator">↗</span> <p class="mt-1 text-muted-foreground"> ${T(
    "common.docs.deployments.knowledge.description",
    {
      defaultValue: "Architecture knowledge graph (Cloudflare Pages)"
    }
  )} </p> </a> <a href="/Doc/Rust" class="block bg-white px-4 py-3 transition-colors hover:bg-[var(--Secondary)]"> <span class="font-semibold">${T(
    "common.docs.deployments.rustInteractive",
    {
      defaultValue: "Rust API (Interactive)"
    }
  )}</span> <span class="InlineSeparator">→</span> <p class="mt-1 text-muted-foreground"> ${T(
    "common.docs.deployments.rustInteractive.description",
    {
      defaultValue: "Browse all rustdoc sites with embedded iframes"
    }
  )} </p> </a> </div> </div> </section> <!-- Back to top --> <div class="mt-12 border-t pt-8"> <a href="#top" class="StaccatoButton text-primary hover:underline">${T("common.button.backToTop", {
    defaultValue: "Back to top"
  })}<span class="InlineSeparator">↑</span></a> </div> </main> </div> </div> ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc.astro";
const $$url = "/Doc";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Doc,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
