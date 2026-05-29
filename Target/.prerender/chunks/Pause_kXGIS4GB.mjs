import { c as createComponent } from './astro-component_X770d8M8.mjs';
import 'piccolore';
import { w as renderComponent, B as renderTemplate, v as maybeRenderHead } from './prerender_AmZqEYF9.mjs';
import { D as DynamicContactForm } from './DynamicContactForm_BWRXGw6N.mjs';
import { H as Header } from './Header_BboC7_kl.mjs';
import { $ as $$Base } from './Base_BgDg_fIU.mjs';
import { R as Requests } from './Request_D-_ytMwX.mjs';

const $$Pause = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Pause;
  const { Auth0Domain, Auth0ClientIdentifier } = await import('./PageMetadata_DYW59jf6.mjs').then(n => n.A);
  const Config = Requests["PAUSE"];
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": `${Config.Title} | Code Editor Land`, "Description": Config.Subtitle, "Url": Astro2.url.href, "lang": "en" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header", "client:component-export": "Header" })} ${maybeRenderHead()}<div class="container mx-auto max-w-5xl px-4"> <nav aria-label="Breadcrumb" class="pt-6"> <ol class="flex flex-wrap items-center space-x-2 text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground">Home</a> </li> <li class="mx-2">/</li> <li> <a href="/Dashboard" class="transition-colors hover:text-foreground">Dashboard</a> </li> <li class="mx-2">/</li> <li> <span class="font-medium text-foreground">Restrict Processing</span> </li> </ol> </nav> </div> ${renderComponent($$result2, "DynamicContactForm", DynamicContactForm, { "client:load": true, "Config": Config, "Domain": Auth0Domain, "ClientIdentifier": Auth0ClientIdentifier, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm", "client:component-export": "default" })} ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Pause.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Pause.astro";
const $$url = "/Contact/Pause";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Pause,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
