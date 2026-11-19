import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as $$AuthShell } from "./AuthShell_jEq8JTTy.mjs";
import { i as AccountContent } from "./DynamicInput_BJHPGyBw.mjs";
import { n as AuthFrameFor } from "./Data_DzJ24Zfb.mjs";
import { t as AccountPage } from "./AccountPage_Cx5KkeAx.mjs";
import { St as Header, rt as GetI18n, t as $$Base } from "./Base_BVG1wSoZ.mjs";
// Source/pages/Account/ForgotPassword.astro
var ForgotPassword_exports = /* @__PURE__ */ __exportAll({
	default: () => $$ForgotPassword,
	file: () => $$file,
	url: () => $$url
});
var $$ForgotPassword = createComponent(($$result, $$props, $$slots) => {
	const T = GetI18n();
	const Account = AccountContent(T);
	const MetaTitle = T("meta.account.forgotPassword", { defaultValue: "Forgot Password - Code Editor Land" });
	const MetaDescription = T("account.forgotPassword.subtitle", { defaultValue: "Enter your email and we'll send a secure reset link to your inbox." });
	const { kicker, heading, action } = AuthFrameFor("forgotPassword", T);
	const Frame = {
		kicker,
		heading,
		...action ? { action } : {}
	};
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription
	}, {
		"default": ($$result) => renderTemplate`  ${renderComponent($$result, "AuthShell", $$AuthShell, {
			"Label": "Forgot password",
			"Frame": Frame
		}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "AccountPage", AccountPage, {
			"Content": Account,
			"Route": "forgot-password",
			"MetaTitle": MetaTitle,
			"MetaDescription": MetaDescription
		})} ` })} `,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "Header", Header, {
			"client:load": true,
			"Mode": "functional",
			"slot": "Header",
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})}`
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/ForgotPassword.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/ForgotPassword.astro";
var $$url = "/Account/ForgotPassword";
// \0virtual:astro:page:Source/pages/Account/ForgotPassword@_@astro
var page = () => ForgotPassword_exports;
export { page };
