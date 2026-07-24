import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { M as createAstro, m as renderTemplate, o as renderComponent } from "./server_CE33w8TD.mjs";
import { t as createComponent } from "./astro-component_CRWsstEh.mjs";
import { n as GetI18n, t as $$Base } from "./Base_DSZ6CS4q.mjs";
import "./Map_Bsl_SrZK.mjs";
import { t as AccountPage } from "./AccountPage_PCxLnK5c.mjs";
//#region Source/pages/Account/ResetPassword.astro
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
	const AccountContent = {
		SignIn: {
			Title: T("common.button.signIn", { defaultValue: "Sign In to Your Account" }),
			Description: "",
			EmailField: { Label: T("common.label.email", { defaultValue: "Email Address" }) },
			PasswordField: { Label: T("common.label.password", { defaultValue: "Password" }) },
			SubmitButton: { Text: T("common.button.signIn", { defaultValue: "Sign In to Your Account" }) }
		},
		SignUp: {
			Title: T("account.signUp.title", { defaultValue: "Create Account" }),
			Description: "",
			EmailField: { Label: T("common.label.email", { defaultValue: "Email Address" }) },
			PasswordField: { Label: T("common.label.password", { defaultValue: "Password" }) },
			ConfirmPasswordField: { Label: T("account.signUp.confirmPasswordLabel", { defaultValue: "Confirm Password" }) },
			TermsCheckbox: { Label: T("account.signUp.termsLabel", { defaultValue: "I agree to the Terms of Service and Privacy Policy" }) },
			SubmitButton: { Text: T("common.button.signUp", { defaultValue: "Create Your Free Account" }) }
		},
		ForgotPassword: {
			Title: T("account.forgotPassword.title", { defaultValue: "Reset Your Password" }),
			Description: T("account.forgotPassword.subtitle", { defaultValue: "Enter your email and we'll send a secure reset link to your inbox." }),
			EmailField: { Label: T("common.label.email", { defaultValue: "Email Address" }) },
			SubmitButton: { Text: T("account.forgotPassword.submit", { defaultValue: "Send Reset Link" }) }
		},
		ResetPassword: {
			Title: T("account.resetPassword.title", { defaultValue: "Set a New Password" }),
			Description: T("account.resetPassword.subtitle", { defaultValue: "Enter your new password below" }),
			PasswordField: {
				Label: T("account.resetPassword.passwordLabel", { defaultValue: "New Password" }),
				Placeholder: T("account.resetPassword.passwordPlaceholder", { defaultValue: "Enter a strong new password" }),
				Type: "password",
				Required: true
			},
			ConfirmPasswordField: {
				Label: T("account.resetPassword.confirmLabel", { defaultValue: "Confirm New Password" }),
				Placeholder: T("account.resetPassword.confirmPlaceholder", { defaultValue: "Re-enter your new password exactly as above" }),
				Type: "password",
				Required: true
			},
			SubmitButton: {
				Text: T("account.resetPassword.submit", { defaultValue: "Set New Password" }),
				Variant: "default",
				FullWidth: true
			},
			CheckingMessage: T("account.resetPassword.checkingMessage", { defaultValue: "Validating your reset link, please wait..." }),
			InvalidTokenMessage: T("account.resetPassword.invalidToken.description", { defaultValue: "This password reset link has expired or was already used." }),
			SuccessMessage: T("account.resetPassword.success.description", { defaultValue: "Your password has been reset.\n\nYou can now sign in with your new credentials." })
		},
		Footer: {}
	};
	const Token = Astro.url.searchParams.get("token");
	const MetaTitle = T("meta.account.resetPassword", { defaultValue: "Reset Password - Code Editor Land" });
	const MetaDescription = T("account.resetPassword.subtitle", { defaultValue: "Enter your new password below" });
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "AccountPage", AccountPage, {
		"Content": AccountContent,
		"Route": "reset-password",
		...Token ? { ResetToken: Token } : {},
		"MetaTitle": MetaTitle,
		"MetaDescription": MetaDescription
	})} ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/ResetPassword.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/ResetPassword.astro";
var $$url = "/Account/ResetPassword";
//#endregion
//#region \0virtual:astro:page:Source/pages/Account/ResetPassword@_@astro
var page = () => ResetPassword_exports;
//#endregion
export { page };
