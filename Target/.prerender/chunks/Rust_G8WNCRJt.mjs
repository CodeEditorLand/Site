import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { M as createAstro, b as addAttribute, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_CE33w8TD.mjs";
import { t as createComponent } from "./astro-component_CRWsstEh.mjs";
import { n as GetI18n, s as renderScript, t as $$Base } from "./Base_CnqryvRS.mjs";
import "./Map_Bsl_SrZK.mjs";
import { t as Header } from "./Header_B5QWyqEA.mjs";
//#region Source/pages/Doc/Rust.astro
var Rust_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Rust,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://editor.land");
var $$Rust = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Rust;
	const T = GetI18n();
	const MetaTitle = T("meta.docs.rust.title", { defaultValue: "Rust API Documentation | Code Editor Land" });
	const MetaDescription = T("meta.docs.rust.description", { defaultValue: "Browse the generated Rust API documentation for Land's core crates." });
	const RustDocSite = [
		{
			Id: "Mountain",
			Label: "Mountain",
			Url: "https://Rust.Documentation.Mountain.editor.land",
			Description: "Native Rust/Tauri backend: window management, file system, process lifecycle, gRPC server"
		},
		{
			Id: "Common",
			Label: "Common",
			Url: "https://Rust.Documentation.Common.editor.land",
			Description: "Shared traits, DTOs, configuration helpers, and cross-element contracts"
		},
		{
			Id: "Echo",
			Label: "Echo",
			Url: "https://Rust.Documentation.Echo.editor.land",
			Description: "Lock-free work-stealing scheduler built on crossbeam-deque"
		},
		{
			Id: "Air",
			Label: "Air",
			Url: "https://Rust.Documentation.Air.editor.land",
			Description: "Background services for updates, downloads, integrity checks, authentication, and indexing"
		},
		{
			Id: "Grove",
			Label: "Grove",
			Url: "https://Rust.Documentation.Grove.editor.land",
			Description: "Rust/WASM Extension Host for VS Code extensions"
		},
		{
			Id: "SideCar",
			Label: "SideCar",
			Url: "https://Rust.Documentation.SideCar.editor.land",
			Description: "Node.js binary distribution compiled per target triple"
		},
		{
			Id: "Mist",
			Label: "Mist",
			Url: "https://Rust.Documentation.Mist.editor.land",
			Description: "Embedded DNS resolver for local-first hostname resolution"
		},
		{
			Id: "Rest",
			Label: "Rest",
			Url: "https://Rust.Documentation.Rest.editor.land",
			Description: "OXC-based TypeScript transform work for the output pipeline"
		},
		{
			Id: "Maintain",
			Label: "Maintain",
			Url: "https://Rust.Documentation.Maintain.editor.land",
			Description: "Build orchestrator, configuration, and release profile tooling"
		},
		{
			Id: "Land",
			Label: "Land",
			Url: "https://Rust.Documentation.Land.editor.land",
			Description: "Top-level workspace that ties the Rust element crates together"
		}
	];
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
	})} ${maybeRenderHead($$result)}<div class="container mx-auto max-w-6xl px-4 py-16"> <!-- Breadcrumbs --> <nav aria-label="Breadcrumb" class="mb-8"> <ol class="flex flex-wrap items-center space-x-2 text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground"> ${T("common.breadcrumb.home", { defaultValue: "Home" })} </a> </li> <li class="mx-2">/</li> <li> <a href="/Doc" class="transition-colors hover:text-foreground"> ${T("common.docs.pageTitle", { defaultValue: "Documentation" })} </a> </li> <li class="mx-2">/</li> <li> <span class="font-medium text-foreground">Rust API</span> </li> </ol> </nav> <!-- Page Header --> <header class="mb-8"> <h1 class="mb-3 text-4xl font-bold tracking-tight">
Rust API Documentation
</h1> <p class="text-muted">
Generated <code>rustdoc</code> output for Land's Rust crates. Select
				a crate below, or open directly in a new tab.
</p> </header> <!-- Crate selector cards --> <div class="mb-6 grid grid-cols-2 gap-3 md:grid-cols-5" role="group" aria-label="Rust crate documentation sets"> ${RustDocSite.map((Site) => renderTemplate`<a${addAttribute(Site.Url, "href")} target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer block bg-card p-4 transition-colors hover:border-[var(--Primary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"> <p class="font-medium text-primary"> ${Site.Label} <span class="InlineSeparator">↗</span> </p> <p class="mt-1 text-muted-foreground"> ${Site.Description} </p> </a>`)} </div> <!-- Iframe embed with switcher --> <div class="StaccatoCard StaccatoBorderShimmer overflow-hidden bg-card"> <!-- Tab bar --> <div class="flex flex-wrap items-center gap-1 border-b border-[var(--Border)] px-4 py-2" role="tablist" aria-label="Rust crate group"> ${RustDocSite.map((Site, Index) => renderTemplate`<button type="button" role="tab"${addAttribute(Index === 0 ? "true" : "false", "aria-selected")} aria-controls="RustDocFrame"${addAttribute(Site.Id, "data-id")}${addAttribute(Site.Url, "data-rustdoc-url")}${addAttribute(`RustDocTab border px-3 py-1 font-medium transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)] ${Index === 0 ? "border-[var(--Primary)] bg-primary text-primary-fg" : "border-[var(--Border)] bg-card text-muted-foreground hover:bg-secondary"}`, "class")}> ${Site.Label} </button>`)} </div> <iframe id="RustDocFrame"${addAttribute(RustDocSite[0].Url, "src")} title="Rust API Documentation" class="h-[70vh] w-full border-0" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"></iframe> </div> <!-- Back to docs --> <div class="mt-8 border-t pt-6"> <a href="/Doc" class="StaccatoButton text-primary hover:underline"> ${T("common.docs.pageTitle", { defaultValue: "Documentation" })} <span class="InlineSeparator">←</span> </a> </div> </div> ` })} ${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc/Rust.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc/Rust.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc/Rust.astro";
var $$url = "/Doc/Rust";
//#endregion
//#region \0virtual:astro:page:Source/pages/Doc/Rust@_@astro
var page = () => Rust_exports;
//#endregion
export { page };
