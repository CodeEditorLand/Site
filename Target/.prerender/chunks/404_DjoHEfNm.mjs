import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_CE33w8TD.mjs";
import { t as createComponent } from "./astro-component_CRWsstEh.mjs";
import { n as GetI18n, s as renderScript, t as $$Base } from "./Base_DhBMo2T1.mjs";
import "./Map_Bsl_SrZK.mjs";
import { t as Header } from "./Header_wkpfoPSt.mjs";
//#region Source/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
var $$404 = createComponent(($$result, $$props, $$slots) => {
	const T = GetI18n();
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": T("common.error.404", { defaultValue: "404 - Page Not Found" }),
		"Description": T("common.error.pageNotFound", { defaultValue: "The page you're looking for doesn't exist or has been moved.\n\nCheck the URL for typos, or return to the home page and start fresh.\n\nIf you believe this is an error, open a GitHub issue and we'll help you find what you need." }),
		"noIndex": true
	}, { "default": async ($$result) => renderTemplate` ${renderComponent($$result, "Header", Header, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
		"client:component-export": "Header"
	})} ${maybeRenderHead($$result)}<section id="NotFoundContent" class="flex min-h-[80dvh] w-full flex-col items-center justify-center py-20" aria-label="Page not found"> <div class="container mx-auto px-4 text-center"> <p id="RouteRedirectNotice" class="mb-4 hidden text-muted-foreground">
Redirecting...
</p> <h1 class="StaccatoJitter mb-4 text-6xl font-bold">404</h1> <p class="StaccatoBreath mb-8 text-xl text-muted-foreground"> ${T("common.error.pageNotFound", { defaultValue: "The page you're looking for doesn't exist or has been moved.\n\nCheck the URL for typos, or return to the home page and start fresh.\n\nIf you believe this is an error, open a GitHub issue and we'll help you find what you need." })} </p> <a href="/" class="StaccatoButton inline-flex h-10 items-center justify-center bg-primary px-4 py-2 font-medium text-primary-fg transition-all hover:opacity-90 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"> ${T("common.button.backToHome", { defaultValue: "Return to Homepage" })}&#x2001;&rarr;
</a> </div> </section> ${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/404.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/404.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/404.astro";
var $$url = "/404";
//#endregion
//#region \0virtual:astro:page:Source/pages/404@_@astro
var page = () => _404_exports;
//#endregion
export { page };
