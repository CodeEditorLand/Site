import { c as createComponent } from './astro-component_DyBPIfnY.mjs';
import 'piccolore';
import { w as renderComponent, B as renderTemplate, v as maybeRenderHead } from './prerender_DG8BZEWD.mjs';
import { D as DynamicContactForm } from './DynamicContactForm_Dw_dEm5A.mjs';
import { H as Header } from './Header_CrTCyJxT.mjs';
import { G as GetI18n, $ as $$Base } from './Base_C_b_uBI-.mjs';
import { R as Requests } from './Request_D-_ytMwX.mjs';

const $$Claim = createComponent(async ($$result, $$props, $$slots) => {
  GetI18n();
  const Auth0Domain = (await import('./Auth0Domain_r85rfpF4.mjs').then(n => n.b)).default;
  const Auth0ClientIdentifier = (await import('./OpenGraph_m_taqD86.mjs').then(n => n.a)).default;
  const Config = Requests["CLAIM"];
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": "Copyright & DMCA | Code Editor Land", "Description": "Submit a copyright infringement claim or DMCA takedown notice.", "Url": "https://land.playform.cloud/Contact/Claim", "lang": "en" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header", "client:component-export": "Header" })} ${maybeRenderHead()}<div class="container mx-auto max-w-5xl px-4"> <nav aria-label="Breadcrumb" class="pt-6"> <ol class="flex flex-wrap items-center space-x-2 text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground">Home</a> </li> <li class="mx-2">/</li> <li> <a href="/Dashboard" class="transition-colors hover:text-foreground">Dashboard</a> </li> <li class="mx-2">/</li> <li> <span class="font-medium text-foreground">Copyright & DMCA</span> </li> </ol> </nav> </div> ${renderComponent($$result2, "DynamicContactForm", DynamicContactForm, { "client:load": true, "Config": { Config }, "Domain": { Auth0Domain }, "ClientIdentifier": { Auth0ClientIdentifier }, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm", "client:component-export": "default" })} ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Claim.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Claim.astro";
const $$url = "/Contact/Claim";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Claim,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
