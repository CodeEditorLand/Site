import { c as createComponent } from './astro-component_DzJ15MYN.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate } from './prerender_CyJMqgoM.mjs';
import { A as AccountPage } from './AccountPage_iphZsQWX.mjs';
import { G as GetI18n, $ as $$Base } from './Base_DgX_hI0X.mjs';

const $$ForgotPassword = createComponent(($$result, $$props, $$slots) => {
  const T = GetI18n();
  const AccountContent = {
    SignIn: {
      Title: T("common.button.signIn", {
        defaultValue: "Sign In to Your Account"
      }),
      Description: "",
      EmailField: {
        Label: T("common.label.email", { defaultValue: "Email Address" })
      },
      PasswordField: {
        Label: T("common.label.password", { defaultValue: "Password" })
      },
      SubmitButton: {
        Text: T("common.button.signIn", {
          defaultValue: "Sign In to Your Account"
        })
      }
    },
    SignUp: {
      Title: T("account.signUp.title", { defaultValue: "Create Account" }),
      Description: "",
      EmailField: {
        Label: T("common.label.email", { defaultValue: "Email Address" })
      },
      PasswordField: {
        Label: T("common.label.password", { defaultValue: "Password" })
      },
      ConfirmPasswordField: {
        Label: T("account.signUp.confirmPasswordLabel", {
          defaultValue: "Confirm Password"
        })
      },
      TermsCheckbox: {
        Label: T("account.signUp.termsLabel", {
          defaultValue: "I agree to the Terms of Service and Privacy Policy"
        })
      },
      SubmitButton: {
        Text: T("common.button.signUp", {
          defaultValue: "Create Your Free Account"
        })
      }
    },
    ForgotPassword: {
      Title: T("account.forgotPassword.title", {
        defaultValue: "Reset Your Password"
      }),
      Description: T("account.forgotPassword.subtitle", {
        defaultValue: "Enter your email and we'll send a secure reset link to your inbox."
      }),
      EmailField: {
        Label: T("common.label.email", { defaultValue: "Email Address" }),
        Placeholder: T("account.forgotPassword.emailPlaceholder", {
          defaultValue: "name@example.com"
        }),
        Type: "email",
        Required: true
      },
      SubmitButton: {
        Text: T("account.forgotPassword.submit", {
          defaultValue: "Send Reset Link"
        }),
        Variant: "default",
        FullWidth: true
      },
      SuccessMessage: T("account.forgotPassword.success.subtitle", {
        defaultValue: "A password reset link has been sent to"
      })
    },
    ResetPassword: {
      Title: T("account.resetPassword.title", {
        defaultValue: "Set a New Password"
      }),
      Description: "",
      PasswordField: {
        Label: T("account.resetPassword.passwordLabel", {
          defaultValue: "New Password"
        })
      },
      ConfirmPasswordField: {
        Label: T("account.resetPassword.confirmLabel", {
          defaultValue: "Confirm New Password"
        })
      },
      SubmitButton: {
        Text: T("account.resetPassword.submit", {
          defaultValue: "Set New Password"
        })
      }
    },
    Footer: {}
  };
  const MetaTitle = T("meta.account.forgotPassword", {
    defaultValue: "Forgot Password - Code Editor Land"
  });
  const MetaDescription = T("account.forgotPassword.subtitle", {
    defaultValue: "Enter your email and we'll send a secure reset link to your inbox."
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AccountPage", AccountPage, { "Content": AccountContent, "Route": "forgot-password", "MetaTitle": MetaTitle, "MetaDescription": MetaDescription })} ` })}`;
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
