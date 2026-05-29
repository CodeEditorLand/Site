import { c as createComponent } from './astro-component_X770d8M8.mjs';
import 'piccolore';
import { w as renderComponent, B as renderTemplate } from './prerender_AmZqEYF9.mjs';
import { G as GetI18n, $ as $$Base } from './Base_BgDg_fIU.mjs';

const $$SignIn = createComponent(async ($$result, $$props, $$slots) => {
  const T = GetI18n();
  const MetaTitle = T("meta.account.signIn", {
    defaultValue: "Sign In - Code Editor Land"
  });
  const MetaDescription = T("account.signIn.subtitle", {
    defaultValue: "Sign in to your Land workspace."
  });
  const { Auth0Domain, Auth0ClientIdentifier } = await import('./PageMetadata_DYW59jf6.mjs').then(n => n.A);
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Auth0Account", null, { "client:only": "react", "Route": "signin", "Domain": Auth0Domain, "ClientIdentifier": Auth0ClientIdentifier, "client:component-hydration": "only", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0Account", "client:component-export": "default" })} ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/SignIn.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/SignIn.astro";
const $$url = "/Account/SignIn";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$SignIn,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
