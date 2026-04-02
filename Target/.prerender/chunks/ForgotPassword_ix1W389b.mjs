import { c as createComponent, G as GetI18n, $ as $$Base } from './Base_DMf2Ciav.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate } from './prerender_DmvbPVCR.mjs';
import { A as AccountPage } from './AccountPage_CLwnYhKD.mjs';

const $$ForgotPassword = createComponent(($$result, $$props, $$slots) => {
  const T = GetI18n();
  const AccountContent = {
    signIn: {
      title: T("common.button.signIn", { defaultValue: "Sign In" }),
      description: "",
      emailField: {
        label: T("common.label.email", { defaultValue: "Email" })
      },
      passwordField: {
        label: T("common.label.password", { defaultValue: "Password" })
      },
      submitButton: {
        text: T("common.button.signIn", { defaultValue: "Sign In" })
      }
    },
    signUp: {
      title: T("account.signUp.title", { defaultValue: "Create Account" }),
      description: "",
      emailField: {
        label: T("common.label.email", { defaultValue: "Email" })
      },
      passwordField: {
        label: T("common.label.password", { defaultValue: "Password" })
      },
      confirmPasswordField: {
        label: T("account.signUp.confirmPasswordLabel", {
          defaultValue: "Confirm"
        })
      },
      termsCheckbox: {
        label: T("account.signUp.termsLabel", {
          defaultValue: "Accept terms"
        })
      },
      submitButton: {
        text: T("common.button.signUp", { defaultValue: "Sign Up" })
      }
    },
    forgotPassword: {
      title: T("account.forgotPassword.title", {
        defaultValue: "Reset Password"
      }),
      description: T("account.forgotPassword.subtitle", {
        defaultValue: "Enter your email to receive a password reset link"
      }),
      emailField: {
        label: T("common.label.email", { defaultValue: "Email" }),
        placeholder: T("account.forgotPassword.emailPlaceholder", {
          defaultValue: "name@example.com"
        }),
        type: "email",
        required: true
      },
      submitButton: {
        text: T("account.forgotPassword.submit", {
          defaultValue: "Send Reset Link"
        }),
        variant: "default",
        fullWidth: true
      },
      successMessage: T("account.forgotPassword.success.subtitle", {
        defaultValue: "We've sent a password reset link to your email address."
      })
    },
    resetPassword: {
      title: T("account.resetPassword.title", {
        defaultValue: "Set New Password"
      }),
      description: "",
      passwordField: {
        label: T("account.resetPassword.passwordLabel", {
          defaultValue: "New Password"
        })
      },
      confirmPasswordField: {
        label: T("account.resetPassword.confirmLabel", {
          defaultValue: "Confirm New Password"
        })
      },
      submitButton: {
        text: T("account.resetPassword.submit", {
          defaultValue: "Reset Password"
        })
      }
    },
    footer: {}
  };
  const MetaTitle = T("meta.account.forgotPassword", {
    defaultValue: "Forgot Password - Land"
  });
  const MetaDescription = T("account.forgotPassword.subtitle", {
    defaultValue: "Request a password reset for your Land account."
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AccountPage", AccountPage, { "content": AccountContent, "route": "forgot-password", "metaTitle": MetaTitle, "metaDescription": MetaDescription })} ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/ForgotPassword.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/ForgotPassword.astro";
const $$url = "/Account/ForgotPassword";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$ForgotPassword,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
