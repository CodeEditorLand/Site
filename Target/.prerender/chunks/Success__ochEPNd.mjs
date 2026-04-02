import { c as createComponent, G as GetI18n, $ as $$Base, r as renderScript } from './Base_Czy5kkbA.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './prerender_SnvtGgzS.mjs';

const $$Success = createComponent(($$result, $$props, $$slots) => {
  const T = GetI18n();
  const MetaTitle = T("meta.oauth.success", {
    defaultValue: "Authentication Successful - Land"
  });
  const MetaDescription = T("meta.oauth.successDescription", {
    defaultValue: "You have been authenticated successfully."
  });
  const CompletingText = T("common.oauth.completing", {
    defaultValue: "Completing authentication..."
  });
  const FailedText = T("common.oauth.failed", {
    defaultValue: "Authentication Failed"
  });
  const ErrorGenericText = T("common.oauth.errorGeneric", {
    defaultValue: "An error occurred during authentication."
  });
  const BackToSignInText = T("common.oauth.backToSignIn", {
    defaultValue: "Back to Sign In"
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription, "noIndex": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="flex min-h-screen items-center justify-center py-20"> <div class="container mx-auto px-4"> <div class="mx-auto max-w-md text-center"> <div class="StaccatoCard StaccatoBorderShimmer rounded-none border border-[var(--Border)] p-8"> <div id="LoadingState" class="flex flex-col items-center gap-4"> <div class="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent"></div> <p class="text-muted-foreground"> ${CompletingText} </p> </div> <div id="ErrorState" class="hidden"> <h1 class="mb-2 text-2xl font-bold"> ${FailedText} </h1> <p id="ErrorMessage" class="mb-6 text-muted-foreground"> ${ErrorGenericText} </p> <a href="/Account/SignIn" class="StaccatoButton inline-flex h-10 items-center justify-center rounded-none border border-[var(--Border)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary"> ${BackToSignInText}&#x2001;&rarr;
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
