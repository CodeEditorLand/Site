import { c as createComponent } from './astro-component_CPDgz1jV.mjs';
import 'piccolore';
import { w as renderComponent, B as renderTemplate, v as maybeRenderHead } from './prerender_D05fJrym.mjs';
import { G as GetI18n, $ as $$Base, r as renderScript } from './Base_DNiQtfI8.mjs';
import { a as Auth0ClientIdentifier, b as Auth0Domain } from './PageMetadata_DCR0Ql3-.mjs';

const $$Success = createComponent(($$result, $$props, $$slots) => {
  const T = GetI18n();
  const MetaTitle = T("meta.oauth.success", {
    defaultValue: "Authentication Successful - Code Editor Land"
  });
  const MetaDescription = T("meta.oauth.successDescription", {
    defaultValue: "You have been authenticated successfully."
  });
  const CompletingText = T("common.oauth.completing", {
    defaultValue: "Completing sign-in..."
  });
  const SuccessTitle = T("common.oauth.success.title", {
    defaultValue: "You're signed in"
  });
  const SuccessRedirect = T("common.oauth.success.redirect", {
    defaultValue: "Redirecting to your dashboard..."
  });
  const FailedText = T("common.oauth.failed", {
    defaultValue: "Sign-In Failed"
  });
  const ErrorGenericText = T("common.oauth.errorGeneric", {
    defaultValue: "Something went wrong during sign-in. Please try again."
  });
  const BackToSignInText = T("common.oauth.backToSignIn", {
    defaultValue: "Back to Sign In"
  });
  const GoToDashboardText = T("common.oauth.goToDashboard", {
    defaultValue: "Go to Dashboard"
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription, "noIndex": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header", "client:component-export": "Header" })} ${renderComponent($$result2, "Auth0CallbackHandler", null, { "client:only": "react", "Domain": Auth0Domain, "ClientIdentifier": Auth0ClientIdentifier, "client:component-hydration": "only", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0CallbackHandler", "client:component-export": "default" })} ${maybeRenderHead()}<section class="flex min-h-screen items-center justify-center py-20"> <div class="container mx-auto px-4"> <div class="mx-auto max-w-md text-center"> <div class="StaccatoCard StaccatoBorderShimmer rounded-none p-8"> <div id="LoadingState" class="flex flex-col items-center gap-4"> <div class="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent"></div> <p class="text-muted-foreground"> ${CompletingText} </p> </div> <div id="SuccessState" class="hidden flex-col items-center gap-4"> <div class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-green-500 text-green-500"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"> <polyline points="20 6 9 17 4 12"></polyline> </svg> </div> <h1 class="text-2xl font-bold"> ${SuccessTitle} </h1> <p class="text-muted-foreground"> ${SuccessRedirect} </p> <a href="/Dashboard" id="DashboardFallback" class="StaccatoButton mt-2 inline-flex h-10 items-center justify-center bg-[var(--Primary)] px-4 py-2 font-medium text-white transition-all hover:opacity-90 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"> ${GoToDashboardText}&#x2001;&rarr;
</a> </div> <div id="ErrorState" class="hidden"> <h1 class="mb-2 text-2xl font-bold"> ${FailedText} </h1> <p id="ErrorMessage" class="mb-6 text-muted-foreground"> ${ErrorGenericText} </p> <a href="/Account/SignIn" class="StaccatoButton inline-flex h-10 items-center justify-center rounded-none bg-[var(--Primary)] px-4 py-2 font-medium text-white transition-all hover:opacity-90 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"> ${BackToSignInText}&#x2001;&rarr;
</a> </div> </div> </div> </div> </section> ` })} ${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/OAuth/Success.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/OAuth/Success.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/OAuth/Success.astro";
const $$url = "/OAuth/Success";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Success,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
