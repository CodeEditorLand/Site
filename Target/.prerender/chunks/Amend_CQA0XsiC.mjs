import { c as createComponent } from './astro-component_e9mGl8K_.mjs';
import 'piccolore';
import { w as renderComponent, B as renderTemplate, v as maybeRenderHead } from './prerender_DFdx8cgm.mjs';
import { D as DynamicContactForm } from './DynamicContactForm_Dw_dEm5A.mjs';
import { H as Header } from './Header_C1zvvbym.mjs';
import { G as GetI18n, $ as $$Base } from './Base_BbbN-lWJ.mjs';
import { R as Requests } from './Request_D-_ytMwX.mjs';

const $$Amend = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Amend;
  GetI18n();
  const Auth0Domain = (await import('./Auth0Domain_r85rfpF4.mjs').then(n => n.b)).default;
  const Auth0ClientIdentifier = (await import('./OpenGraph_BCmYe4V8.mjs').then(n => n.a)).default;
  const Config = Requests["AMEND"];
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": "Correct Your Data | Code Editor Land", "Description": "Request rectification of inaccurate or incomplete personal data (GDPR Art. 16).", "Url": Astro2.url.href, "lang": "en" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header", "client:component-export": "Header" })} ${maybeRenderHead()}<div class="container mx-auto max-w-5xl px-4"> <nav aria-label="Breadcrumb" class="pt-6"> <ol class="flex flex-wrap items-center space-x-2 text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground">Home</a> </li> <li class="mx-2">/</li> <li> <a href="/Dashboard" class="transition-colors hover:text-foreground">Dashboard</a> </li> <li class="mx-2">/</li> <li> <span class="font-medium text-foreground">Correct Your Data</span> </li> </ol> </nav> </div> ${renderComponent($$result2, "DynamicContactForm", DynamicContactForm, { "client:load": true, "Config": { Config }, "Domain": { Auth0Domain }, "ClientIdentifier": { Auth0ClientIdentifier }, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm", "client:component-export": "default" })} ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Amend.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Amend.astro";
const $$url = "/Contact/Amend";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Amend,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
