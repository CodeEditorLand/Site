import { c as createComponent, G as GetI18n, $ as $$Base } from './Base_DGQ8XLTY.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate } from './prerender_intPnryP.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { A as AuthAPI } from './Authentication_Crsx33Uj.mjs';
import * as lucide from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './Card_CbRXt22j.mjs';
import { D as DynamicButton } from './DynamicButton_DfMoFOaO.mjs';
import { D as DynamicInput } from './DynamicInput_BJKXhQNP.mjs';
import { H as Header } from './Header_B14fNQtY.mjs';

const DynamicEmailVerification = ({
  content,
  token: PropToken,
  userEmail,
  onVerify,
  onResend,
  onNavigate,
  className
}) => {
  const { t: T } = useTranslation("verify");
  const [State, SetState] = useState("pending");
  const [, SetToken] = useState(PropToken || "");
  const [Email, SetEmail] = useState(userEmail || "");
  const [ErrorMessage, SetErrorMessage] = useState("");
  const [ResendSuccess, SetResendSuccess] = useState(false);
  const HandleVerify = useCallback(
    async (VerifyToken) => {
      try {
        const Success = onVerify ? await onVerify(VerifyToken) : true;
        if (Success) {
          SetState("success");
        } else {
          SetState("error");
          SetErrorMessage(content.error.description);
        }
      } catch {
        SetState("error");
        SetErrorMessage(
          T("errorGeneric", {
            defaultValue: "An error occurred during verification. Please try again."
          })
        );
      }
    },
    [onVerify, content.error.description]
  );
  useEffect(() => {
    const UrlToken = PropToken || new URLSearchParams(window.location.search).get("token");
    if (UrlToken) {
      SetToken(UrlToken);
      SetState("verifying");
      HandleVerify(UrlToken);
    }
  }, [PropToken, HandleVerify]);
  const HandleResend = async () => {
    if (!Email) return;
    try {
      await onResend?.(Email) || Promise.resolve(true);
      SetResendSuccess(true);
      setTimeout(() => SetResendSuccess(false), 5e3);
    } catch {
      SetErrorMessage(
        T("resendFailed", {
          defaultValue: "Failed to resend email. Please try again."
        })
      );
    }
  };
  const RenderPending = () => /* @__PURE__ */ jsxs(Card, { className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-none", children: /* @__PURE__ */ jsx(lucide.Mail, { className: "h-6 w-6 text-primary", "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl", children: content.pending.title }),
      /* @__PURE__ */ jsx(CardDescription, { children: content.pending.description })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(
        DynamicInput,
        {
          content: {
            label: T("emailLabel", { defaultValue: "Email" }),
            placeholder: T("emailPlaceholder", {
              defaultValue: "Enter your email to resend verification"
            }),
            type: "email",
            value: Email,
            onChange: SetEmail
          },
          id: "email"
        }
      ),
      /* @__PURE__ */ jsx(
        DynamicButton,
        {
          content: {
            ...content.pending.resendButton,
            fullWidth: true,
            disabled: !Email
          },
          onAction: HandleResend
        }
      ),
      ResendSuccess && /* @__PURE__ */ jsx(
        "p",
        {
          className: "text-center text-xs text-green-600",
          role: "status",
          children: content.pending.resendSuccessMessage || T("resendSuccess", {
            defaultValue: "Verification email resent!"
          })
        }
      ),
      content.pending.emailSentMessage && /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-muted-foreground", children: content.pending.emailSentMessage })
    ] }) })
  ] });
  const RenderVerifying = () => /* @__PURE__ */ jsx(Card, { className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift", children: /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-none",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" })
      }
    ),
    /* @__PURE__ */ jsx(CardTitle, { children: content.verifying?.title || T("verifying.title", {
      defaultValue: "Verifying your email"
    }) }),
    /* @__PURE__ */ jsx(CardDescription, { role: "status", children: content.verifying?.description || T("verifying.description", {
      defaultValue: "Please wait while we verify your email address..."
    }) })
  ] }) });
  const RenderSuccess = () => /* @__PURE__ */ jsx(Card, { className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift", children: /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
    /* @__PURE__ */ jsx(
      DynamicButton,
      {
        content: {
          ...content.success.continueButton,
          fullWidth: true
        },
        onAction: () => onNavigate?.("/")
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center pt-4", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl", children: content.success.title }),
      " ",
      /* @__PURE__ */ jsx(
        lucide.CheckCircle,
        {
          className: "h-5 w-5 shrink-0 text-green-600",
          "aria-hidden": "true"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(CardDescription, { className: "text-xs", children: content.success.description })
  ] }) });
  const RenderError = () => /* @__PURE__ */ jsx(Card, { className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift", children: /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
    /* @__PURE__ */ jsx(
      DynamicButton,
      {
        content: {
          ...content.error.backToSignInButton,
          fullWidth: true
        },
        onAction: () => onNavigate?.("/Account/SignIn")
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center pt-4", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl", children: content.error.title }),
      " ",
      /* @__PURE__ */ jsx(
        lucide.XCircle,
        {
          className: "h-5 w-5 shrink-0 text-red-600",
          "aria-hidden": "true"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(CardDescription, { className: "text-xs", children: ErrorMessage || content.error.description })
  ] }) });
  return /* @__PURE__ */ jsx("section", { className: "py-20", "aria-label": "Email verification", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: `mx-auto max-w-md ${className}`,
      "aria-live": "polite",
      children: [
        State === "pending" && RenderPending(),
        State === "verifying" && RenderVerifying(),
        State === "success" && RenderSuccess(),
        State === "error" && RenderError()
      ]
    }
  ) }) });
};

const Authentication = new AuthAPI();
const NavigateToPath = (Path) => {
  window.location.href = Path;
};
const VerifyPage = ({
  content,
  route,
  token,
  reason,
  className,
  onVerify,
  onResend,
  onNavigate
}) => {
  const { verification } = content;
  const Navigate = onNavigate || NavigateToPath;
  const [UserEmail, SetUserEmail] = useState("");
  useEffect(() => {
    try {
      const UserData = localStorage.getItem("current_user");
      if (UserData) {
        const ParsedUser = JSON.parse(UserData);
        SetUserEmail(ParsedUser.email || "");
      }
    } catch {
    }
  }, []);
  const HandleVerify = async (VerifyToken) => {
    try {
      await Authentication.VerifyEmail(VerifyToken);
      toast.success("Email verified successfully!");
      return true;
    } catch (ErrorInstance) {
      const ErrorMessage = ErrorInstance instanceof Error ? ErrorInstance.message : "Verification failed";
      toast.error(ErrorMessage);
      return false;
    }
  };
  const HandleResend = async (_Email) => {
    try {
      await Authentication.ResendVerification();
      toast.success("Verification email sent!");
      return true;
    } catch (ErrorInstance) {
      const ErrorMessage = ErrorInstance instanceof Error ? ErrorInstance.message : "Failed to resend email";
      toast.error(ErrorMessage);
      return false;
    }
  };
  return /* @__PURE__ */ jsx("div", { className: `flex min-h-screen flex-col ${className || ""}`, children: /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
    (route === "verify" || route === "pending") && /* @__PURE__ */ jsx(
      DynamicEmailVerification,
      {
        content: verification,
        ...token ? { token } : {},
        userEmail: UserEmail,
        onVerify: onVerify || HandleVerify,
        onResend: onResend || HandleResend,
        onNavigate: Navigate
      }
    ),
    route === "success" && /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-md text-center", children: /* @__PURE__ */ jsxs("div", { className: "rounded-none border border-green-500 p-8", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-none bg-green-100", children: /* @__PURE__ */ jsxs(
        "svg",
        {
          className: "h-10 w-10 text-green-600",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsx("title", { children: "Email verified" }),
            /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M5 13l4 4L19 7"
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("h1", { className: "mb-2 text-2xl font-bold", children: "Email Verified Successfully!" }),
      /* @__PURE__ */ jsx("p", { className: "mb-6 text-muted-foreground", children: "Your email address has been verified. You can now access all features." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "StaccatoButton inline-flex h-10 items-center justify-center gap-0 rounded-none border border-[var(--Border)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary disabled:pointer-events-none disabled:opacity-50",
          onClick: () => Navigate("/"),
          children: "Continue to Homepage"
        }
      )
    ] }) }) }) }),
    route === "failure" && /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-md text-center", children: /* @__PURE__ */ jsxs("div", { className: "rounded-none border border-destructive p-8", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-none bg-red-100", children: /* @__PURE__ */ jsxs(
        "svg",
        {
          className: "h-10 w-10 text-red-600",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsx("title", { children: "Verification failed" }),
            /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M6 18L18 6M6 6l12 12"
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("h1", { className: "mb-2 text-2xl font-bold", children: "Verification Failed" }),
      /* @__PURE__ */ jsx("p", { className: "mb-2 text-muted-foreground", children: reason ? `Error: ${reason}` : "This verification link is invalid or has expired." }),
      /* @__PURE__ */ jsx("p", { className: "mb-6 text-sm text-muted-foreground", children: "Please request a new verification email or contact support if the problem persists." }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "StaccatoButton inline-flex h-10 items-center justify-center gap-0 rounded-none border border-[var(--Border)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary",
            onClick: () => Navigate("/Verify"),
            children: "Send New Verification Email"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "StaccatoButton inline-flex h-10 items-center justify-center gap-0 rounded-none border border-[var(--Border)] bg-background px-4 py-2 text-sm font-medium transition-all hover:bg-accent",
            onClick: () => Navigate("/Account/SignIn"),
            children: "Sign In"
          }
        )
      ] })
    ] }) }) }) })
  ] }) });
};

const $$Verify = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Verify;
  const T = GetI18n();
  const VerifyContent = {
    verification: {
      pending: {
        title: T("verify.pending.title", {
          defaultValue: "Verify Your Email"
        }),
        description: T("verify.pending.description", {
          defaultValue: "We've sent a verification link to your email address."
        }),
        resendButton: {
          text: T("verify.pending.resendButton", {
            defaultValue: "Resend Verification Email"
          }),
          variant: "default",
          fullWidth: true
        }
      },
      success: {
        title: T("verify.success.title", {
          defaultValue: "Email Verified Successfully!"
        }),
        description: T("verify.success.description", {
          defaultValue: "Your email address has been verified."
        }),
        continueButton: {
          text: T("verify.success.continueButton", {
            defaultValue: "Continue to Dashboard"
          }),
          variant: "default",
          fullWidth: true
        }
      },
      error: {
        title: T("verify.error.title", {
          defaultValue: "Verification Failed"
        }),
        description: T("verify.error.description", {
          defaultValue: "An error occurred during verification."
        }),
        backToSignInButton: {
          text: T("verify.error.backToSignInButton", {
            defaultValue: "Back to Sign In"
          }),
          variant: "default",
          fullWidth: true
        }
      }
    }
  };
  const Token = Astro2.url.searchParams.get("token");
  const Reason = Astro2.url.searchParams.get("reason");
  const Route = Token ? "verify" : Reason ? "failure" : "pending";
  const MetaTitle = T("meta.verify.title", {
    defaultValue: "Verify Email - Land"
  });
  const MetaDescription = T("verify.pending.description", {
    defaultValue: "Verify your email address to activate your account."
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription, "noIndex": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header", "client:component-export": "Header" })} ${renderComponent($$result2, "VerifyPage", VerifyPage, { "content": VerifyContent, "route": Route, "token": Token || void 0, "reason": Reason || void 0, "metaTitle": MetaTitle, "metaDescription": MetaDescription })} ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Verify.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Verify.astro";
const $$url = "/Verify";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Verify,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
