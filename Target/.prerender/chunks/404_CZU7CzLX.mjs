import { c as createComponent } from './astro-component_CPDgz1jV.mjs';
import 'piccolore';
import { w as renderComponent, B as renderTemplate, v as maybeRenderHead } from './prerender_D05fJrym.mjs';
import { G as GetI18n, $ as $$Base, r as renderScript } from './Base_DNiQtfI8.mjs';
import { H as Header } from './Header_DYl-L_jZ.mjs';

const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const T = GetI18n();
  const MetaTitle = T("common.error.404", {
    defaultValue: "404 - Page Not Found"
  });
  const MetaDescription = T("common.error.pageNotFound", {
    defaultValue: "The page you're looking for doesn't exist or has been moved.\n\nCheck the URL for typos, or return to the home page and start fresh.\n\nIf you believe this is an error, open a GitHub issue and we'll help you find what you need."
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription, "noIndex": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header", "client:component-export": "Header" })} ${maybeRenderHead()}<section id="NotFoundContent" class="flex min-h-[80dvh] w-full flex-col items-center justify-center py-20" aria-label="Page not found"> <div class="container mx-auto px-4 text-center"> <p id="RouteRedirectNotice" class="mb-4 hidden text-muted-foreground">
Redirecting...
</p> <h1 class="StaccatoJitter mb-4 text-6xl font-bold">404</h1> <p class="StaccatoBreath mb-8 text-xl text-muted-foreground"> ${T("common.error.pageNotFound", {
    defaultValue: "The page you're looking for doesn't exist or has been moved.\n\nCheck the URL for typos, or return to the home page and start fresh.\n\nIf you believe this is an error, open a GitHub issue and we'll help you find what you need."
  })} </p> <a href="/" class="StaccatoButton inline-flex h-10 items-center justify-center bg-[var(--Primary)] px-4 py-2 font-medium text-white transition-all hover:opacity-90 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"> ${T("common.button.backToHome", {
    defaultValue: "Return to Homepage"
  })}&#x2001;&rarr;
</a> </div> </section> ${renderScript($$result2, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/404.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/404.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
