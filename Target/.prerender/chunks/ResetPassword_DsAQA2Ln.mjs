import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as $$AuthShell } from "./AuthShell_jEq8JTTy.mjs";
import { i as AccountContent } from "./DynamicInput_BJHPGyBw.mjs";
import { n as AuthFrameFor } from "./Data_DzJ24Zfb.mjs";
import { t as AccountPage } from "./AccountPage_Cx5KkeAx.mjs";
import { St as Header, Zt as createAstro, rt as GetI18n, t as $$Base } from "./Base_BVG1wSoZ.mjs";
// Source/pages/Account/ResetPassword.astro
var ResetPassword_exports = /* @__PURE__ */ __exportAll({
	default: () => $$ResetPassword,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://editor.land");
var $$ResetPassword = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ResetPassword;
	const T = GetI18n();
	const Account = AccountContent(T);
	const Token = Astro.url.searchParams.get("token");
	const MetaTitle = T("meta.account.resetPassword", { defaultValue: "Reset Password - Code Editor Land" });
	const MetaDescription = T("account.resetPassword.subtitle", { defaultValue: "Enter your new password below" });
	const { kicker, heading, action } = AuthFrameFor("resetPassword", T);
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
			"Label": "Reset password",
			"Center": true,
			"Frame": Frame
		}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "AccountPage", AccountPage, {
			"Content": Account,
			"Route": "reset-password",
			...Token ? { ResetToken: Token } : {},
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
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/ResetPassword.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/ResetPassword.astro";
var $$url = "/Account/ResetPassword";
// \0virtual:astro:page:Source/pages/Account/ResetPassword@_@astro
var page = () => ResetPassword_exports;
export { page };
