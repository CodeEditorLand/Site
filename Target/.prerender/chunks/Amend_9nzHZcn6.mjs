import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { M as createAstro, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_CE33w8TD.mjs";
import { t as createComponent } from "./astro-component_CRWsstEh.mjs";
import { t as $$Base } from "./Base_Ch2j7K-P.mjs";
import "./Map_Bsl_SrZK.mjs";
import { t as Header } from "./Header_DjWYNAAS.mjs";
import { i as Requests } from "./Request_TjP0ZRRO.mjs";
import { t as DynamicContactForm_default } from "./DynamicContactForm_CbAgMhSo.mjs";
//#region Source/pages/Contact/Amend.astro
var Amend_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Amend,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://editor.land");
var $$Amend = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Amend;
	const { Auth0Domain, Auth0ClientIdentifier } = await import("./Auth_CyM7bDBq.mjs");
	const Config = Requests["AMEND"];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": `${Config.Title} | Code Editor Land`,
		"Description": Config.Subtitle,
		"Url": Astro.url.href,
		"lang": "en"
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Header", Header, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
		"client:component-export": "Header"
	})} ${maybeRenderHead($$result)}<div class="container mx-auto max-w-5xl px-4"> <nav aria-label="Breadcrumb" class="pt-6"> <ol class="flex flex-wrap items-center space-x-2 text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground">Home</a> </li> <li class="mx-2">/</li> <li> <a href="/Dashboard" class="transition-colors hover:text-foreground">Dashboard</a> </li> <li class="mx-2">/</li> <li> <span class="font-medium text-foreground">Correct Your Data</span> </li> </ol> </nav> </div> ${renderComponent($$result, "DynamicContactForm", DynamicContactForm_default, {
		"client:load": true,
		"Config": Config,
		"Domain": Auth0Domain,
		"ClientIdentifier": Auth0ClientIdentifier,
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
		"client:component-export": "default"
	})} ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Amend.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Amend.astro";
var $$url = "/Contact/Amend";
//#endregion
//#region \0virtual:astro:page:Source/pages/Contact/Amend@_@astro
var page = () => Amend_exports;
//#endregion
export { page };
