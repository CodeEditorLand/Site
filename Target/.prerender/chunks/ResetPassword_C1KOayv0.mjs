import { c as createComponent } from './astro-component_DyBPIfnY.mjs';
import 'piccolore';
import { w as renderComponent, B as renderTemplate } from './prerender_DG8BZEWD.mjs';
import { A as AccountPage } from './AccountPage_BaOknfi6.mjs';
import { G as GetI18n, $ as $$Base } from './Base_C_b_uBI-.mjs';

const $$ResetPassword = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ResetPassword;
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
        Label: T("common.label.email", { defaultValue: "Email Address" })
      },
      SubmitButton: {
        Text: T("account.forgotPassword.submit", {
          defaultValue: "Send Reset Link"
        })
      }
    },
    ResetPassword: {
      Title: T("account.resetPassword.title", {
        defaultValue: "Set a New Password"
      }),
      Description: T("account.resetPassword.subtitle", {
        defaultValue: "Enter your new password below"
      }),
      PasswordField: {
        Label: T("account.resetPassword.passwordLabel", {
          defaultValue: "New Password"
        }),
        Placeholder: T("account.resetPassword.passwordPlaceholder", {
          defaultValue: "Enter a strong new password"
        }),
        Type: "password",
        Required: true
      },
      ConfirmPasswordField: {
        Label: T("account.resetPassword.confirmLabel", {
          defaultValue: "Confirm New Password"
        }),
        Placeholder: T("account.resetPassword.confirmPlaceholder", {
          defaultValue: "Re-enter your new password exactly as above"
        }),
        Type: "password",
        Required: true
      },
      SubmitButton: {
        Text: T("account.resetPassword.submit", {
          defaultValue: "Set New Password"
        }),
        Variant: "default",
        FullWidth: true
      },
      CheckingMessage: T("account.resetPassword.checkingMessage", {
        defaultValue: "Validating your reset link, please wait..."
      }),
      InvalidTokenMessage: T(
        "account.resetPassword.invalidToken.description",
        {
          defaultValue: "This password reset link has expired or was already used."
        }
      ),
      SuccessMessage: T("account.resetPassword.success.description", {
        defaultValue: "Your password has been reset.\n\nYou can now sign in with your new credentials."
      })
    },
    Footer: {}
  };
  const Token = Astro2.url.searchParams.get("token");
  const MetaTitle = T("meta.account.resetPassword", {
    defaultValue: "Reset Password - Code Editor Land"
  });
  const MetaDescription = T("account.resetPassword.subtitle", {
    defaultValue: "Enter your new password below"
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AccountPage", AccountPage, { "Content": AccountContent, "Route": "reset-password", ...Token ? { ResetToken: Token } : {}, "MetaTitle": MetaTitle, "MetaDescription": MetaDescription })} ` })}`;
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
