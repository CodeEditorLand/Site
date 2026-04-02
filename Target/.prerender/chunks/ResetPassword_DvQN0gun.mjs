import { c as createComponent, G as GetI18n, $ as $$Base } from './Base_Czy5kkbA.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate } from './prerender_SnvtGgzS.mjs';
import { A as AccountPage } from './AccountPage_2A9nJ0Y5.mjs';

const $$ResetPassword = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ResetPassword;
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
        label: T("common.label.email", { defaultValue: "Email" })
      },
      submitButton: {
        text: T("account.forgotPassword.submit", {
          defaultValue: "Send Reset Link"
        })
      }
    },
    resetPassword: {
      title: T("account.resetPassword.title", {
        defaultValue: "Set New Password"
      }),
      description: T("account.resetPassword.subtitle", {
        defaultValue: "Choose a new password for your account"
      }),
      passwordField: {
        label: T("account.resetPassword.passwordLabel", {
          defaultValue: "New Password"
        }),
        placeholder: T("account.resetPassword.passwordPlaceholder", {
          defaultValue: "Enter new password"
        }),
        type: "password",
        required: true
      },
      confirmPasswordField: {
        label: T("account.resetPassword.confirmLabel", {
          defaultValue: "Confirm New Password"
        }),
        placeholder: T("account.resetPassword.confirmPlaceholder", {
          defaultValue: "Confirm new password"
        }),
        type: "password",
        required: true
      },
      submitButton: {
        text: T("account.resetPassword.submit", {
          defaultValue: "Reset Password"
        }),
        variant: "default",
        fullWidth: true
      },
      checkingMessage: T("account.resetPassword.checkingMessage", {
        defaultValue: "Validating reset token..."
      }),
      invalidTokenMessage: T(
        "account.resetPassword.invalidToken.description",
        {
          defaultValue: "This password reset link is invalid or has expired. Please request a new one."
        }
      ),
      successMessage: T("account.resetPassword.success.description", {
        defaultValue: "Your password has been reset successfully. You can now sign in with your new password."
      })
    },
    footer: {}
  };
  const Token = Astro2.url.searchParams.get("token");
  const MetaTitle = T("meta.account.resetPassword", {
    defaultValue: "Reset Password - Land"
  });
  const MetaDescription = T("account.resetPassword.subtitle", {
    defaultValue: "Set a new password for your Land account."
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AccountPage", AccountPage, { "content": AccountContent, "route": "reset-password", ...Token ? { resetToken: Token } : {}, "metaTitle": MetaTitle, "metaDescription": MetaDescription })} ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/ResetPassword.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/ResetPassword.astro";
const $$url = "/Account/ResetPassword";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$ResetPassword,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
