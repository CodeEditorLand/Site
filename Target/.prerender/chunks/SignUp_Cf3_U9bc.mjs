import { c as createComponent } from './astro-component_Dsw0bl44.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate } from './prerender_O3JwF96W.mjs';
import { G as GetI18n, $ as $$Base } from './Base_IAktlLoN.mjs';

const $$SignUp = createComponent(async ($$result, $$props, $$slots) => {
  const T = GetI18n();
  const MetaTitle = T("meta.account.signUp", {
    defaultValue: "Registration Coming Soon - Code Editor Land"
  });
  const MetaDescription = T("account.signUp.subtitle", {
    defaultValue: "Account creation is not open yet while the portal flow is being finished."
  });
  const Auth0Domain = (await import('./Auth0Domain_BKddKNn2.mjs')).default;
  const Auth0ClientIdentifier = (await import('./Auth0ClientIdentifier_DCXeU6DG.mjs')).default;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Auth0Account", null, { "client:only": "react", "Route": "signup", "Domain": Auth0Domain, "ClientIdentifier": Auth0ClientIdentifier, "client:component-hydration": "only", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0Account", "client:component-export": "default" })} ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/SignUp.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/SignUp.astro";
const $$url = "/Account/SignUp";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$SignUp,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
