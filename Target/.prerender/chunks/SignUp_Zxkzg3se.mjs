import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { m as renderTemplate, o as renderComponent } from "./server_CE33w8TD.mjs";
import { t as createComponent } from "./astro-component_CRWsstEh.mjs";
import { n as GetI18n, t as $$Base } from "./Base_CnqryvRS.mjs";
import "./Map_Bsl_SrZK.mjs";
//#region Source/pages/Account/SignUp.astro
var SignUp_exports = /* @__PURE__ */ __exportAll({
	default: () => $$SignUp,
	file: () => $$file,
	url: () => $$url
});
var $$SignUp = createComponent(async ($$result, $$props, $$slots) => {
	const T = GetI18n();
	const MetaTitle = T("meta.account.signUp", { defaultValue: "Registration Coming Soon - Code Editor Land" });
	const MetaDescription = T("account.signUp.subtitle", { defaultValue: "Account creation is not open yet while the portal flow is being finished." });
	const { Auth0Domain, Auth0ClientIdentifier } = await import("./Auth_CyM7bDBq.mjs");
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Auth0Account", null, {
		"client:only": "react",
		"Route": "signup",
		"Domain": Auth0Domain,
		"ClientIdentifier": Auth0ClientIdentifier,
		"client:component-hydration": "only",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0Account.tsx",
		"client:component-export": "default"
	})} ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/SignUp.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/SignUp.astro";
var $$url = "/Account/SignUp";
//#endregion
//#region \0virtual:astro:page:Source/pages/Account/SignUp@_@astro
var page = () => SignUp_exports;
//#endregion
export { page };
