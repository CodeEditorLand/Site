import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { A as AuthAPI } from './Authentication_Crsx33Uj.mjs';
import { H as Header } from './Header_B14fNQtY.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, e as CardFooter } from './Card_CbRXt22j.mjs';
import { D as DynamicButton } from './DynamicButton_DfMoFOaO.mjs';
import { D as DynamicInput, L as Label } from './DynamicInput_BJKXhQNP.mjs';
import * as lucide from 'lucide-react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { a as cn } from './Base_DGQ8XLTY.mjs';

const DynamicForgotPassword = ({
  content,
  onSubmit,
  onResend,
  onNavigate,
  className,
  isLoading = false,
  errorMessage
}) => {
  const {
    title,
    description,
    emailField,
    submitButton,
    resendButton,
    successMessage
  } = content;
  const [Email, SetEmail] = useState("");
  const [IsSubmitted, SetIsSubmitted] = useState(false);
  const [InternalError, SetInternalError] = useState("");
  const HandleSubmit = (Event) => {
    Event.preventDefault();
    if (!Email) {
      SetInternalError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(Email)) {
      SetInternalError("Please enter a valid email");
      return;
    }
    onSubmit?.(Email);
    SetIsSubmitted(true);
    SetInternalError("");
  };
  return /* @__PURE__ */ jsx("section", { className: "py-20", "aria-label": "Forgot password", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx("div", { className: `mx-auto max-w-md ${className}`, children: /* @__PURE__ */ jsxs(Card, { className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "space-y-1 text-center", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl", children: title }),
      /* @__PURE__ */ jsx(CardDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: !IsSubmitted ? /* @__PURE__ */ jsxs(
      "form",
      {
        className: "space-y-4",
        onSubmit: HandleSubmit,
        "aria-label": "Password reset request form",
        children: [
          /* @__PURE__ */ jsx("div", { "aria-live": "polite", "aria-atomic": "true", children: (errorMessage || InternalError) && /* @__PURE__ */ jsx(
            "div",
            {
              className: "bg-destructive/10 rounded-none p-3 text-sm text-destructive",
              role: "alert",
              children: errorMessage || InternalError
            }
          ) }),
          /* @__PURE__ */ jsx(
            DynamicInput,
            {
              content: {
                ...emailField,
                onChange: SetEmail
              },
              id: "email"
            }
          ),
          /* @__PURE__ */ jsx(
            DynamicButton,
            {
              content: {
                ...submitButton,
                type: "submit",
                fullWidth: true
              },
              isLoading
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxs(
      "div",
      {
        className: "space-y-6 text-center",
        role: "status",
        "aria-live": "polite",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "mx-auto flex h-12 w-12 items-center justify-center rounded-none bg-green-100",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "h-6 w-6 text-green-600",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M5 13l4 4L19 7"
                      }
                    )
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Check your email" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: successMessage || "We've sent a password reset link to your email address." })
          ] }),
          resendButton && /* @__PURE__ */ jsxs("div", { className: "border-t border-border pt-4", children: [
            /* @__PURE__ */ jsx(
              DynamicButton,
              {
                content: {
                  ...resendButton,
                  variant: "outline",
                  fullWidth: true
                },
                onAction: () => onResend?.()
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Didn't receive the email?" })
          ] }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "font-medium text-primary hover:underline",
              onClick: () => onNavigate?.("/Account/SignIn"),
              children: "Back to Sign In"
            }
          ) })
        ]
      }
    ) })
  ] }) }) }) });
};

const DynamicResetPassword = ({
  content,
  token: PropToken,
  onReset,
  onNavigate,
  className,
  isLoading = false,
  errorMessage
}) => {
  const {
    title,
    description,
    passwordField,
    confirmPasswordField,
    submitButton,
    successMessage,
    invalidTokenMessage,
    checkingMessage
  } = content;
  const [State, SetState] = useState("checking");
  const [Token, SetToken] = useState(PropToken || "");
  const [Password, SetPassword] = useState("");
  const [ConfirmPassword, SetConfirmPassword] = useState("");
  const [Errors, SetErrors] = useState({});
  useEffect(() => {
    const TokenFromUrl = PropToken || new URLSearchParams(window.location.search).get("token");
    if (!TokenFromUrl) {
      SetState("invalid");
      return;
    }
    const ValidateToken = async () => {
      await new Promise((Resolve) => setTimeout(Resolve, 1e3));
      SetToken(TokenFromUrl);
      SetState("valid");
    };
    ValidateToken();
  }, [PropToken]);
  const Validate = () => {
    const NewErrors = {};
    if (!Password) {
      NewErrors.password = "Password is required";
    } else if (Password.length < 8) {
      NewErrors.password = "Password must be at least 8 characters";
    }
    if (!ConfirmPassword) {
      NewErrors.confirmPassword = "Please confirm your password";
    } else if (Password !== ConfirmPassword) {
      NewErrors.confirmPassword = "Passwords do not match";
    }
    SetErrors(NewErrors);
    return Object.keys(NewErrors).length === 0;
  };
  const HandleSubmit = (Event) => {
    Event.preventDefault();
    if (Validate() && Token) {
      onReset?.(Token, Password, ConfirmPassword);
      SetState("success");
    }
  };
  if (State === "checking") {
    return /* @__PURE__ */ jsx("section", { className: "py-20", "aria-label": "Reset password", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: `mx-auto max-w-md text-center ${className}`,
        children: /* @__PURE__ */ jsx(Card, { className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", "aria-live": "polite", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "text-muted-foreground",
              role: "status",
              children: checkingMessage || "Validating reset token..."
            }
          )
        ] }) }) })
      }
    ) }) });
  }
  if (State === "invalid") {
    return /* @__PURE__ */ jsx("section", { className: "py-20", "aria-label": "Reset password", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: `mx-auto max-w-md text-center ${className}`,
        children: /* @__PURE__ */ jsx(Card, { className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", role: "alert", children: [
          /* @__PURE__ */ jsx(
            DynamicButton,
            {
              content: {
                text: "Back to Sign In",
                variant: "default",
                fullWidth: true
              },
              onAction: () => onNavigate?.("/Account/SignIn")
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Invalid or Expired Token" }),
            " ",
            /* @__PURE__ */ jsx(
              lucide.AlertCircle,
              {
                className: "h-5 w-5 shrink-0 text-destructive",
                "aria-hidden": "true"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: invalidTokenMessage || "This password reset link is invalid or has expired. Please request a new one." })
        ] }) }) })
      }
    ) }) });
  }
  if (State === "success") {
    return /* @__PURE__ */ jsx("section", { className: "py-20", "aria-label": "Reset password", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: `mx-auto max-w-md text-center ${className}`,
        children: /* @__PURE__ */ jsx(Card, { className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "space-y-4",
            role: "status",
            "aria-live": "polite",
            children: [
              /* @__PURE__ */ jsx(
                DynamicButton,
                {
                  content: {
                    text: "Go to Sign In",
                    variant: "default",
                    fullWidth: true
                  },
                  onAction: () => onNavigate?.("/Account/SignIn")
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Password Reset Successful" }),
                " ",
                /* @__PURE__ */ jsx(
                  lucide.CheckCircle,
                  {
                    className: "h-5 w-5 shrink-0 text-green-600",
                    "aria-hidden": "true"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: successMessage || "Your password has been reset successfully. You can now sign in with your new password." })
            ]
          }
        ) }) })
      }
    ) }) });
  }
  return /* @__PURE__ */ jsx("section", { className: "py-20", "aria-label": "Reset password", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx("div", { className: `mx-auto max-w-md ${className}`, children: /* @__PURE__ */ jsxs(Card, { className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "space-y-1 text-center", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl", children: title }),
      /* @__PURE__ */ jsx(CardDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(
      "form",
      {
        className: "space-y-4",
        onSubmit: HandleSubmit,
        "aria-label": "Reset password form",
        children: [
          /* @__PURE__ */ jsx("div", { "aria-live": "polite", "aria-atomic": "true", children: errorMessage && /* @__PURE__ */ jsx(
            "div",
            {
              className: "bg-destructive/10 rounded-none p-3 text-sm text-destructive",
              role: "alert",
              children: errorMessage
            }
          ) }),
          /* @__PURE__ */ jsx(
            DynamicInput,
            {
              content: {
                ...passwordField,
                type: "password",
                onChange: SetPassword
              },
              id: "password"
            }
          ),
          /* @__PURE__ */ jsx(
            DynamicInput,
            {
              content: {
                ...confirmPasswordField,
                type: "password",
                onChange: SetConfirmPassword
              },
              id: "confirmPassword"
            }
          ),
          (Errors.password || Errors.confirmPassword) && /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            Errors.password && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: Errors.password }),
            Errors.confirmPassword && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: Errors.confirmPassword })
          ] }),
          /* @__PURE__ */ jsx(
            DynamicButton,
            {
              content: {
                ...submitButton,
                type: "submit",
                fullWidth: true
              },
              isLoading
            }
          )
        ]
      }
    ) })
  ] }) }) }) });
};

const DynamicSignIn = ({
  content,
  onSubmit,
  onOAuth,
  onNavigate,
  className,
  isLoading = false,
  errorMessage
}) => {
  const {
    title,
    description,
    emailField,
    passwordField,
    submitButton,
    oauthButton,
    showDivider = true,
    footerLinks
  } = content;
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [, SetErrors] = useState({});
  const Validate = () => {
    const NewErrors = {};
    if (!Email) {
      NewErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      NewErrors.email = "Please enter a valid email";
    }
    if (!Password) {
      NewErrors.password = "Password is required";
    }
    SetErrors(NewErrors);
    return Object.keys(NewErrors).length === 0;
  };
  const HandleSubmit = (Event) => {
    Event.preventDefault();
    if (!isLoading && Validate()) {
      onSubmit?.(Email, Password);
    }
  };
  return /* @__PURE__ */ jsx("section", { className: "py-20", "aria-label": "Sign in", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx("div", { className: `mx-auto max-w-md ${className}`, children: /* @__PURE__ */ jsxs(Card, { className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "space-y-1 text-center", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl", children: title }),
      /* @__PURE__ */ jsx(CardDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsxs(
        "form",
        {
          className: "space-y-4",
          onSubmit: HandleSubmit,
          "aria-label": "Sign in form",
          children: [
            /* @__PURE__ */ jsx("div", { "aria-live": "polite", "aria-atomic": "true", children: errorMessage && /* @__PURE__ */ jsx(
              "div",
              {
                className: "bg-destructive/10 rounded-none p-3 text-sm text-destructive",
                role: "alert",
                children: errorMessage
              }
            ) }),
            /* @__PURE__ */ jsx(
              DynamicInput,
              {
                content: {
                  ...emailField,
                  onChange: SetEmail
                },
                id: "email"
              }
            ),
            /* @__PURE__ */ jsx(
              DynamicInput,
              {
                content: {
                  ...passwordField,
                  type: "password",
                  onChange: SetPassword
                },
                id: "password"
              }
            ),
            /* @__PURE__ */ jsx(
              DynamicButton,
              {
                content: {
                  ...submitButton,
                  type: "submit",
                  fullWidth: true
                },
                isLoading
              }
            )
          ]
        }
      ),
      showDivider && /* @__PURE__ */ jsxs("div", { className: "relative my-6", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx("span", { className: "StaccatoSeparator w-full border-t" }) }),
        /* @__PURE__ */ jsx("div", { className: "relative flex justify-center text-xs uppercase", children: /* @__PURE__ */ jsx("span", { className: "bg-background px-2 text-muted-foreground", children: "Or" }) })
      ] }),
      oauthButton && /* @__PURE__ */ jsx(
        DynamicButton,
        {
          content: {
            ...oauthButton,
            fullWidth: true
          },
          ...onOAuth ? { onAction: onOAuth } : {}
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(CardFooter, { className: "flex flex-col gap-3 text-center text-sm", children: [
      footerLinks?.signUp && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "font-medium text-primary hover:underline",
            onClick: () => footerLinks.signUp && onNavigate?.(
              footerLinks.signUp.href
            ),
            children: footerLinks.signUp.label
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Don't have an account?" })
      ] }),
      footerLinks?.forgotPassword && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "font-medium text-primary hover:underline",
            onClick: () => footerLinks.forgotPassword && onNavigate?.(
              footerLinks.forgotPassword.href
            ),
            children: footerLinks.forgotPassword.label
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Forgot your password?" })
      ] })
    ] })
  ] }) }) }) });
};

function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CheckboxPrimitive.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        "focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive peer size-4 shrink-0 rounded-none border bg-background outline-none transition-shadow focus-visible:border-ring focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        CheckboxPrimitive.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsx(lucide.Check, { className: "size-3.5" })
        }
      )
    }
  );
}

const DynamicCheckbox = ({ content, name, onCheckedChange }) => {
  const {
    label,
    description,
    checked,
    defaultChecked,
    disabled = false,
    indeterminate = false,
    onChange,
    className,
    ...props
  } = content;
  const HandleCheckedChange = (NewChecked) => {
    if (onCheckedChange) {
      onCheckedChange(NewChecked);
    }
    if (onChange) {
      onChange(NewChecked);
    }
  };
  const CheckboxProperties = {
    disabled,
    onCheckedChange: HandleCheckedChange,
    className,
    ...props
  };
  if (checked !== void 0) {
    CheckboxProperties["checked"] = checked;
  }
  if (defaultChecked !== void 0) {
    CheckboxProperties["defaultChecked"] = defaultChecked;
    if (checked === void 0) {
      CheckboxProperties["checked"] = defaultChecked;
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
    /* @__PURE__ */ jsx(
      Checkbox,
      {
        name,
        ...CheckboxProperties,
        children: indeterminate && /* @__PURE__ */ jsx("span", { className: "animate-pulse", children: "?" })
      }
    ),
    (label || description) && /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
      label && /* @__PURE__ */ jsx(
        Label,
        {
          className: "cursor-pointer font-normal",
          onClick: (Event) => {
            Event.preventDefault();
            const CurrentChecked = (checked !== void 0 ? checked : defaultChecked) || false;
            HandleCheckedChange(!CurrentChecked);
          },
          children: label
        }
      ),
      description && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: description })
    ] })
  ] });
};

const DynamicSignUp = ({
  content,
  onSubmit,
  onOAuth,
  onNavigate,
  className,
  isLoading = false,
  errorMessage
}) => {
  const {
    title,
    description,
    emailField,
    passwordField,
    confirmPasswordField,
    termsCheckbox,
    submitButton,
    oauthButtons = [],
    showDivider = true,
    footerLinks
  } = content;
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [ConfirmPassword, SetConfirmPassword] = useState("");
  const [TermsAccepted, SetTermsAccepted] = useState(false);
  const [Errors, SetErrors] = useState({});
  const Validate = () => {
    const NewErrors = {};
    if (!Email) {
      NewErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      NewErrors.email = "Please enter a valid email";
    }
    if (!Password) {
      NewErrors.password = "Password is required";
    } else if (Password.length < 8) {
      NewErrors.password = "Password must be at least 8 characters";
    }
    if (!ConfirmPassword) {
      NewErrors.confirmPassword = "Please confirm your password";
    } else if (Password !== ConfirmPassword) {
      NewErrors.confirmPassword = "Passwords do not match";
    }
    if (!TermsAccepted) {
      NewErrors.terms = "You must accept the terms and conditions";
    }
    SetErrors(NewErrors);
    return Object.keys(NewErrors).length === 0;
  };
  const HandleSubmit = (Event) => {
    Event.preventDefault();
    if (Validate()) {
      onSubmit?.(Email, Password, ConfirmPassword, TermsAccepted);
    }
  };
  return /* @__PURE__ */ jsx("section", { className: "py-20", "aria-label": "Sign up", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx("div", { className: `mx-auto max-w-md ${className}`, children: /* @__PURE__ */ jsxs(Card, { className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "space-y-1 text-center", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl", children: title }),
      /* @__PURE__ */ jsx(CardDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsxs(
        "form",
        {
          className: "space-y-4",
          onSubmit: HandleSubmit,
          "aria-label": "Sign up form",
          children: [
            /* @__PURE__ */ jsx("div", { "aria-live": "polite", "aria-atomic": "true", children: errorMessage && /* @__PURE__ */ jsx(
              "div",
              {
                className: "bg-destructive/10 rounded-none p-3 text-sm text-destructive",
                role: "alert",
                children: errorMessage
              }
            ) }),
            /* @__PURE__ */ jsx(
              DynamicInput,
              {
                content: {
                  ...emailField,
                  onChange: SetEmail
                },
                id: "email"
              }
            ),
            /* @__PURE__ */ jsx(
              DynamicInput,
              {
                content: {
                  ...passwordField,
                  type: "password",
                  onChange: SetPassword
                },
                id: "password"
              }
            ),
            /* @__PURE__ */ jsx(
              DynamicInput,
              {
                content: {
                  ...confirmPasswordField,
                  type: "password",
                  onChange: SetConfirmPassword
                },
                id: "confirmPassword"
              }
            ),
            /* @__PURE__ */ jsx(
              DynamicCheckbox,
              {
                content: {
                  ...termsCheckbox,
                  checked: TermsAccepted,
                  onChange: SetTermsAccepted
                }
              }
            ),
            /* @__PURE__ */ jsx(
              DynamicButton,
              {
                content: {
                  ...submitButton,
                  type: "submit",
                  fullWidth: true
                },
                isLoading
              }
            )
          ]
        }
      ),
      showDivider && oauthButtons.length > 0 && /* @__PURE__ */ jsxs("div", { className: "relative my-6", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx("span", { className: "StaccatoSeparator w-full border-t" }) }),
        /* @__PURE__ */ jsx("div", { className: "relative flex justify-center text-xs uppercase", children: /* @__PURE__ */ jsx("span", { className: "bg-background px-2 text-muted-foreground", children: "Or" }) })
      ] }),
      oauthButtons.length > 0 && /* @__PURE__ */ jsx("div", { className: "space-y-3", children: oauthButtons.map((Button, Index) => /* @__PURE__ */ jsx(
        DynamicButton,
        {
          content: {
            ...Button,
            fullWidth: true
          },
          onAction: () => onOAuth?.(Button.icon)
        },
        Index
      )) })
    ] }),
    /* @__PURE__ */ jsx(CardFooter, { className: "flex flex-col gap-3 text-center text-sm", children: footerLinks?.signIn && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "font-medium text-primary hover:underline",
          onClick: () => footerLinks.signIn && onNavigate?.(
            footerLinks.signIn.href
          ),
          children: footerLinks.signIn.label
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Already have an account?" })
    ] }) })
  ] }) }) }) });
};

const Authentication = new AuthAPI();
const SetSessionToken = (Token) => {
  try {
    document.cookie = `session=${Token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`;
  } catch {
  }
  localStorage.setItem("session_token", Token);
};
const SetCurrentUser = (CurrentUser) => {
  try {
    localStorage.setItem("current_user", JSON.stringify(CurrentUser));
  } catch {
  }
};
const NavigateToPath = (Path) => {
  window.location.href = Path;
};
const AccountPage = ({
  content,
  route,
  resetToken,
  className,
  onSignIn,
  onSignUp,
  onForgotPassword,
  onResetPassword,
  onNavigate
}) => {
  const {
    signIn: SignIn,
    signUp: SignUp,
    forgotPassword: ForgotPassword,
    resetPassword: ResetPassword
  } = content;
  const Navigate = onNavigate || NavigateToPath;
  const [, SetIsSignInLoading] = useState(false);
  const [, SetIsSignUpLoading] = useState(false);
  const [, SetIsForgotPasswordLoading] = useState(false);
  const [, SetIsResetPasswordLoading] = useState(false);
  const [, SetIsOAuthLoading] = useState(false);
  const [, SetSignInErrorMessage] = useState("");
  const [, SetSignUpErrorMessage] = useState("");
  const [, SetForgotPasswordErrorMessage] = useState("");
  const [, SetResetPasswordErrorMessage] = useState("");
  const HandleSignIn = async (Email, Password) => {
    SetIsSignInLoading(true);
    SetSignInErrorMessage("");
    try {
      const ResponseData = await Authentication.Login(Email, Password);
      const { session: SessionData, user: UserData } = ResponseData;
      SetSessionToken(SessionData.token);
      SetCurrentUser(UserData);
      toast.success(`Welcome back, ${UserData.username}!`);
      onSignIn?.(Email, Password);
      setTimeout(() => {
        Navigate("/Dashboard");
      }, 1e3);
    } catch (ErrorInstance) {
      const ErrorMessage = ErrorInstance instanceof Error ? ErrorInstance.message : "An unexpected error occurred";
      SetSignInErrorMessage(ErrorMessage);
      toast.error(ErrorMessage);
    } finally {
      SetIsSignInLoading(false);
    }
  };
  const HandleSignUp = async (Email, Password, ConfirmPassword, TermsAccepted) => {
    SetIsSignUpLoading(true);
    SetSignUpErrorMessage("");
    try {
      const Username = Email.split("@")[0] || "user";
      const ResponseData = await Authentication.Register(
        Email,
        Password,
        Username,
        void 0
      );
      const { session: SessionData, user: UserData } = ResponseData;
      SetSessionToken(SessionData.token);
      SetCurrentUser(UserData);
      toast.success(
        "Account created successfully! Please verify your email."
      );
      onSignUp?.(Email, Password, ConfirmPassword, TermsAccepted);
      setTimeout(() => {
        Navigate("/Verify");
      }, 1e3);
    } catch (ErrorInstance) {
      const ErrorMessage = ErrorInstance instanceof Error ? ErrorInstance.message : "An unexpected error occurred";
      SetSignUpErrorMessage(ErrorMessage);
      toast.error(ErrorMessage);
    } finally {
      SetIsSignUpLoading(false);
    }
  };
  const HandleForgotPassword = async (Email) => {
    SetIsForgotPasswordLoading(true);
    SetForgotPasswordErrorMessage("");
    try {
      await Authentication.ForgotPassword(Email);
      toast.success(
        "Password reset email sent. Please check your inbox."
      );
      onForgotPassword?.(Email);
    } catch (ErrorInstance) {
      const ErrorMessage = ErrorInstance instanceof Error ? ErrorInstance.message : "An unexpected error occurred";
      SetForgotPasswordErrorMessage(ErrorMessage);
      toast.error(ErrorMessage);
    } finally {
      SetIsForgotPasswordLoading(false);
    }
  };
  const HandleResetPassword = async (Token, Password, ConfirmPassword) => {
    SetIsResetPasswordLoading(true);
    SetResetPasswordErrorMessage("");
    try {
      await Authentication.ResetPassword(Token, Password);
      toast.success(
        "Password reset successful! You can now sign in with your new password."
      );
      onResetPassword?.(Token, Password, ConfirmPassword);
      setTimeout(() => {
        Navigate("/Account/SignIn");
      }, 2e3);
    } catch (ErrorInstance) {
      const ErrorMessage = ErrorInstance instanceof Error ? ErrorInstance.message : "An unexpected error occurred";
      SetResetPasswordErrorMessage(ErrorMessage);
      toast.error(ErrorMessage);
    } finally {
      SetIsResetPasswordLoading(false);
    }
  };
  const HandleOAuth = async (Provider) => {
    SetIsOAuthLoading(true);
    try {
      const AuthProvider = Provider || "github";
      await Authentication.OAuth(AuthProvider);
    } catch (ErrorInstance) {
      const ErrorMessage = ErrorInstance instanceof Error ? ErrorInstance.message : "OAuth initialization failed";
      toast.error(ErrorMessage);
      SetIsOAuthLoading(false);
    }
  };
  useEffect(() => {
    const UrlParameters = new URLSearchParams(window.location.search);
    const OAuthToken = UrlParameters.get("token");
    if (OAuthToken && route === "signin") {
      SetSessionToken(OAuthToken);
      toast.success("OAuth authentication successful!");
      Authentication.GetSession().then((SessionResponse) => {
        SetCurrentUser(SessionResponse.user);
      }).catch(() => {
      });
      Navigate("/Dashboard");
    }
  }, [route, Navigate]);
  return /* @__PURE__ */ jsxs("div", { className: `flex min-h-screen flex-col ${className || ""}`, children: [
    /* @__PURE__ */ jsx(Header, { ...content.header ? { content: content.header } : {} }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      route === "signin" && /* @__PURE__ */ jsx(
        DynamicSignIn,
        {
          content: SignIn,
          onSubmit: HandleSignIn,
          onOAuth: HandleOAuth,
          onNavigate: Navigate
        }
      ),
      route === "signup" && /* @__PURE__ */ jsx(
        DynamicSignUp,
        {
          content: SignUp,
          onSubmit: HandleSignUp,
          onOAuth: HandleOAuth,
          onNavigate: Navigate
        }
      ),
      route === "forgot-password" && /* @__PURE__ */ jsx(
        DynamicForgotPassword,
        {
          content: ForgotPassword,
          onSubmit: HandleForgotPassword,
          onResend: () => HandleForgotPassword(""),
          onNavigate: Navigate
        }
      ),
      route === "reset-password" && /* @__PURE__ */ jsx(
        DynamicResetPassword,
        {
          content: ResetPassword,
          token: resetToken || "",
          onReset: HandleResetPassword,
          onNavigate: Navigate
        }
      )
    ] })
  ] });
};

export { AccountPage as A };
