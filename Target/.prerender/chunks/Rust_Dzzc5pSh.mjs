import { c as createComponent } from './astro-component_DyBPIfnY.mjs';
import 'piccolore';
import { w as renderComponent, B as renderTemplate, v as maybeRenderHead, n as addAttribute } from './prerender_DG8BZEWD.mjs';
import { G as GetI18n, $ as $$Base, r as renderScript } from './Base_C_b_uBI-.mjs';
import { H as Header } from './Header_CrTCyJxT.mjs';

const $$Rust = createComponent(($$result, $$props, $$slots) => {
  const T = GetI18n();
  const MetaTitle = T("meta.docs.rust.title", {
    defaultValue: "Rust API Documentation | Code Editor Land"
  });
  const MetaDescription = T("meta.docs.rust.description", {
    defaultValue: "Browse the generated Rust API documentation for Land's core crates."
  });
  const RustDocSite = [
    {
      Id: "Mountain",
      Label: "Mountain ⛰️",
      Url: "https://Rust.Documentation.Mountain.Land.PlayForm.Cloud",
      Description: "Native Rust/Tauri backend: window management, file system, process lifecycle, gRPC server"
    },
    {
      Id: "Common",
      Label: "Common 👨🏻‍🏭",
      Url: "https://Rust.Documentation.Common.Land.PlayForm.Cloud",
      Description: "Shared traits, DTOs, configuration helpers, and cross-element contracts"
    },
    {
      Id: "Echo",
      Label: "Echo 📣",
      Url: "https://Rust.Documentation.Echo.Land.PlayForm.Cloud",
      Description: "Lock-free work-stealing scheduler built on crossbeam-deque"
    },
    {
      Id: "Air",
      Label: "Air 🪁",
      Url: "https://Rust.Documentation.Air.Land.PlayForm.Cloud",
      Description: "Background services for updates, downloads, integrity checks, authentication, and indexing"
    },
    {
      Id: "Grove",
      Label: "Grove 🌳",
      Url: "https://Rust.Documentation.Grove.Land.PlayForm.Cloud",
      Description: "Rust/WASM Extension Host for VS Code extensions"
    },
    {
      Id: "SideCar",
      Label: "SideCar 🚃",
      Url: "https://Rust.Documentation.SideCar.Land.PlayForm.Cloud",
      Description: "Node.js binary distribution compiled per target triple"
    },
    {
      Id: "Mist",
      Label: "Mist 🌫️",
      Url: "https://Rust.Documentation.Mist.Land.PlayForm.Cloud",
      Description: "Embedded DNS resolver for local-first hostname resolution"
    },
    {
      Id: "Rest",
      Label: "Rest ⛱️",
      Url: "https://Rust.Documentation.Rest.Land.PlayForm.Cloud",
      Description: "OXC-based TypeScript transform work for the output pipeline"
    },
    {
      Id: "Maintain",
      Label: "Maintain 💪🏻",
      Url: "https://Rust.Documentation.Maintain.Land.PlayForm.Cloud",
      Description: "Build orchestrator, configuration, and release profile tooling"
    },
    {
      Id: "Land",
      Label: "Land 🏞️",
      Url: "https://Rust.Documentation.Land.Land.PlayForm.Cloud",
      Description: "Top-level workspace that ties the Rust element crates together"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription, "Url": "https://land.playform.cloud/Doc/Rust", "lang": "en" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header", "client:component-export": "Header" })} ${maybeRenderHead()}<div class="container mx-auto max-w-6xl px-4 py-16"> <!-- Breadcrumbs --> <nav aria-label="Breadcrumb" class="mb-8"> <ol class="flex flex-wrap items-center space-x-2 text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground"> ${T("common.breadcrumb.home", { defaultValue: "Home" })} </a> </li> <li class="mx-2">/</li> <li> <a href="/Doc" class="transition-colors hover:text-foreground"> ${T("common.docs.pageTitle", {
    defaultValue: "Documentation"
  })} </a> </li> <li class="mx-2">/</li> <li> <span class="font-medium text-foreground">Rust API</span> </li> </ol> </nav> <!-- Page Header --> <header class="mb-8"> <h1 class="mb-3 text-4xl font-bold tracking-tight">
Rust API Documentation
</h1> <p class="text-[var(--MuteForeground)]">
Generated <code>rustdoc</code> output for Land's Rust crates. Select
				a crate below, or open directly in a new tab.
</p> </header> <!-- Crate selector cards --> <div class="mb-6 grid grid-cols-2 gap-3 md:grid-cols-5" role="group" aria-label="Rust crate documentation sets"> ${RustDocSite.map((Site) => renderTemplate`<a${addAttribute(Site.Url, "href")} target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer block bg-white p-4 transition-colors hover:border-[var(--Primary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"> <p class="font-medium text-[var(--Primary)]"> ${Site.Label} <span class="InlineSeparator">↗</span> </p> <p class="mt-1 text-muted-foreground"> ${Site.Description} </p> </a>`)} </div> <!-- Iframe embed with switcher --> <div class="StaccatoCard StaccatoBorderShimmer overflow-hidden bg-white"> <!-- Tab bar --> <div class="flex flex-wrap items-center gap-1 border-b border-[var(--Border)] px-4 py-2" role="tablist" aria-label="Rust crate group"> ${RustDocSite.map((Site, Index) => renderTemplate`<button type="button" role="tab"${addAttribute(Index === 0 ? "true" : "false", "aria-selected")} aria-controls="RustDocFrame"${addAttribute(Site.Id, "data-id")}${addAttribute(Site.Url, "data-rustdoc-url")}${addAttribute(`RustDocTab border px-3 py-1 font-medium transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)] ${Index === 0 ? "border-[var(--Primary)] bg-[var(--Primary)] text-white" : "border-[var(--Border)] bg-white text-muted-foreground hover:bg-[var(--Secondary)]"}`, "class")}> ${Site.Label} </button>`)} </div> <iframe id="RustDocFrame"${addAttribute(RustDocSite[0].Url, "src")} title="Rust API Documentation" class="h-[70vh] w-full border-0" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"></iframe> </div> <!-- Back to docs --> <div class="mt-8 border-t pt-6"> <a href="/Doc" class="StaccatoButton text-primary hover:underline"> ${T("common.docs.pageTitle", { defaultValue: "Documentation" })} <span class="InlineSeparator">←</span> </a> </div> </div> ` })} ${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc/Rust.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc/Rust.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc/Rust.astro";
const $$url = "/Doc/Rust";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Rust,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
