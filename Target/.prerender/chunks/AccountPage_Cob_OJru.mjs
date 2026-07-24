import { a as cn } from "./Base_CnqryvRS.mjs";
import { t as Header } from "./Header_B5QWyqEA.mjs";
import { t as AuthAPI } from "./Authentication_g8wRvs2Y.mjs";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./Card_XrHkPAma.mjs";
import { t as DynamicButton } from "./DynamicButton_DlmoL9cj.mjs";
import { n as Label, t as DynamicInput } from "./DynamicInput_DZksiV2l.mjs";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import * as lucide from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
//#region Source/Component/Dynamic/DynamicForgotPassword.tsx
/**
* Dynamic ForgotPassword component for password reset request
* Renders email form, success state, and resend functionality
*/
var DynamicForgotPassword = ({ Content, OnSubmit, OnResend, OnNavigate, ClassName, IsLoading = false, ErrorMessage }) => {
	const { Title, Description, EmailField, SubmitButton, ResendButton, SuccessMessage } = Content;
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
		OnSubmit?.(Email);
		SetIsSubmitted(true);
		SetInternalError("");
	};
	return /* @__PURE__ */ jsx("section", {
		className: "py-20",
		"aria-label": "Forgot password",
		children: /* @__PURE__ */ jsx("div", {
			className: "container mx-auto px-4",
			children: /* @__PURE__ */ jsx("div", {
				className: `mx-auto max-w-md ${ClassName}`,
				children: /* @__PURE__ */ jsxs(Card, {
					className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift",
					children: [/* @__PURE__ */ jsxs(CardHeader, {
						className: "space-y-1 text-center",
						children: [/* @__PURE__ */ jsx(CardTitle, {
							className: "text-2xl",
							children: Title
						}), /* @__PURE__ */ jsx(CardDescription, { children: Description })]
					}), /* @__PURE__ */ jsx(CardContent, { children: !IsSubmitted ? /* @__PURE__ */ jsxs("form", {
						className: "space-y-4",
						onSubmit: HandleSubmit,
						"aria-label": "Password reset request form",
						children: [
							/* @__PURE__ */ jsx("div", {
								"aria-live": "polite",
								"aria-atomic": "true",
								children: (ErrorMessage || InternalError) && /* @__PURE__ */ jsx("div", {
									className: "bg-destructive/10 flat p-3 text-destructive",
									role: "alert",
									children: ErrorMessage || InternalError
								})
							}),
							/* @__PURE__ */ jsx(DynamicInput, {
								Content: {
									...EmailField,
									OnChange: SetEmail
								},
								Id: "email"
							}),
							/* @__PURE__ */ jsx(DynamicButton, {
								Content: {
									...SubmitButton,
									Type: "submit",
									FullWidth: true
								},
								IsLoading
							})
						]
					}) : /* @__PURE__ */ jsxs("div", {
						className: "space-y-6 text-center",
						role: "status",
						"aria-live": "polite",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "mx-auto flex h-12 w-12 items-center justify-center flat bg-green-100 dark:bg-green-950",
										"aria-hidden": "true",
										children: /* @__PURE__ */ jsx("svg", {
											className: "h-6 w-6 text-green-600 dark:text-green-400",
											fill: "none",
											viewBox: "0 0 24 24",
											stroke: "currentColor",
											"aria-hidden": "true",
											children: /* @__PURE__ */ jsx("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeWidth: 2,
												d: "M5 13l4 4L19 7"
											})
										})
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "text-lg font-semibold",
										children: "Check your email"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-muted-foreground",
										children: SuccessMessage || "We've sent a password reset link to your email address."
									})
								]
							}),
							ResendButton && /* @__PURE__ */ jsxs("div", {
								className: "border-t border-border pt-4",
								children: [/* @__PURE__ */ jsx(DynamicButton, {
									Content: {
										...ResendButton,
										Variant: "outline",
										FullWidth: true
									},
									OnAction: () => OnResend?.()
								}), /* @__PURE__ */ jsx("p", {
									className: "mt-2 text-muted-foreground",
									children: "Didn't receive the email?"
								})]
							}),
							/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", {
								type: "button",
								className: "font-medium text-primary hover:underline",
								onClick: () => OnNavigate?.("/Account/SignIn"),
								children: "Back to Sign In"
							}) })
						]
					}) })]
				})
			})
		})
	});
};
//#endregion
//#region Source/Component/Dynamic/DynamicResetPassword.tsx
/**
* Dynamic ResetPassword component for setting new password with token validation
* Supports 4 states: checking, valid (form), invalid (error), success
*/
var DynamicResetPassword = ({ Content, Token: PropToken, OnReset, OnNavigate, ClassName, IsLoading = false, ErrorMessage }) => {
	const { Title, Description, PasswordField, ConfirmPasswordField, SubmitButton, SuccessMessage, InvalidTokenMessage, CheckingMessage } = Content;
	const [State, SetState] = useState("checking");
	const [Token, SetToken] = useState(PropToken || "");
	const [Password, SetPassword] = useState("");
	const [ConfirmPassword, SetConfirmPassword] = useState("");
	const [ShowPassword, SetShowPassword] = useState(false);
	const [ShowConfirmPassword, SetShowConfirmPassword] = useState(false);
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
		if (!Password) NewErrors.password = "Password is required";
		else if (Password.length < 8) NewErrors.password = "Password must be at least 8 characters";
		if (!ConfirmPassword) NewErrors.confirmPassword = "Please confirm your password";
		else if (Password !== ConfirmPassword) NewErrors.confirmPassword = "Passwords do not match";
		SetErrors(NewErrors);
		return Object.keys(NewErrors).length === 0;
	};
	const HandleSubmit = (Event) => {
		Event.preventDefault();
		if (Validate() && Token) {
			OnReset?.(Token, Password, ConfirmPassword);
			SetState("success");
		}
	};
	if (State === "checking") return /* @__PURE__ */ jsx("section", {
		className: "py-20",
		"aria-label": "Reset password",
		children: /* @__PURE__ */ jsx("div", {
			className: "container mx-auto px-4",
			children: /* @__PURE__ */ jsx("div", {
				className: `mx-auto max-w-md text-center ${ClassName}`,
				children: /* @__PURE__ */ jsx(Card, {
					className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift",
					children: /* @__PURE__ */ jsx(CardContent, {
						className: "pt-6",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							"aria-live": "polite",
							children: [/* @__PURE__ */ jsx("div", {
								className: "mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent",
								"aria-hidden": "true"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground",
								role: "status",
								children: CheckingMessage || "Validating reset token..."
							})]
						})
					})
				})
			})
		})
	});
	if (State === "invalid") return /* @__PURE__ */ jsx("section", {
		className: "py-20",
		"aria-label": "Reset password",
		children: /* @__PURE__ */ jsx("div", {
			className: "container mx-auto px-4",
			children: /* @__PURE__ */ jsx("div", {
				className: `mx-auto max-w-md text-center ${ClassName}`,
				children: /* @__PURE__ */ jsx(Card, {
					className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift",
					children: /* @__PURE__ */ jsx(CardContent, {
						className: "pt-6",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							role: "alert",
							children: [
								/* @__PURE__ */ jsx(DynamicButton, {
									Content: {
										Text: "Back to Sign In",
										Variant: "default",
										FullWidth: true
									},
									OnAction: () => OnNavigate?.("/Account/SignIn")
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-center",
									children: [
										/* @__PURE__ */ jsx("h3", {
											className: "text-lg font-semibold",
											children: "Invalid or Expired Token"
										}),
										" ",
										/* @__PURE__ */ jsx(lucide.AlertCircle, {
											className: "h-5 w-5 shrink-0 text-destructive",
											"aria-hidden": "true"
										})
									]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-muted-foreground",
									children: InvalidTokenMessage || "This password reset link is invalid or has expired. Please request a new one."
								})
							]
						})
					})
				})
			})
		})
	});
	if (State === "success") return /* @__PURE__ */ jsx("section", {
		className: "py-20",
		"aria-label": "Reset password",
		children: /* @__PURE__ */ jsx("div", {
			className: "container mx-auto px-4",
			children: /* @__PURE__ */ jsx("div", {
				className: `mx-auto max-w-md text-center ${ClassName}`,
				children: /* @__PURE__ */ jsx(Card, {
					className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift",
					children: /* @__PURE__ */ jsx(CardContent, {
						className: "pt-6",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							role: "status",
							"aria-live": "polite",
							children: [
								/* @__PURE__ */ jsx(DynamicButton, {
									Content: {
										Text: "Go to Sign In",
										Variant: "default",
										FullWidth: true
									},
									OnAction: () => OnNavigate?.("/Account/SignIn")
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-center",
									children: [
										/* @__PURE__ */ jsx("h3", {
											className: "text-lg font-semibold",
											children: "Password Reset Successful"
										}),
										" ",
										/* @__PURE__ */ jsx(lucide.CheckCircle, {
											className: "h-5 w-5 shrink-0 text-green-600 dark:text-green-400",
											"aria-hidden": "true"
										})
									]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-muted-foreground",
									children: SuccessMessage || "Your password has been reset successfully. You can now sign in with your new password."
								})
							]
						})
					})
				})
			})
		})
	});
	return /* @__PURE__ */ jsx("section", {
		className: "py-20",
		"aria-label": "Reset password",
		children: /* @__PURE__ */ jsx("div", {
			className: "container mx-auto px-4",
			children: /* @__PURE__ */ jsx("div", {
				className: `mx-auto max-w-md ${ClassName}`,
				children: /* @__PURE__ */ jsxs(Card, {
					className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift",
					children: [/* @__PURE__ */ jsxs(CardHeader, {
						className: "space-y-1 text-center",
						children: [/* @__PURE__ */ jsx(CardTitle, {
							className: "text-2xl",
							children: Title
						}), /* @__PURE__ */ jsx(CardDescription, { children: Description })]
					}), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
						className: "space-y-4",
						onSubmit: HandleSubmit,
						"aria-label": "Reset password form",
						children: [
							/* @__PURE__ */ jsx("div", {
								"aria-live": "polite",
								"aria-atomic": "true",
								children: ErrorMessage && /* @__PURE__ */ jsx("div", {
									className: "bg-destructive/10 flat p-3 text-destructive",
									role: "alert",
									children: ErrorMessage
								})
							}),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx(DynamicInput, {
									Content: {
										...PasswordField,
										Type: ShowPassword ? "text" : "password",
										OnChange: SetPassword,
										AutoComplete: "new-password",
										Error: Errors.password
									},
									Id: "password"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									className: "absolute right-3 top-2 text-muted-foreground hover:text-foreground",
									"aria-label": ShowPassword ? "Hide password" : "Show password",
									onClick: () => SetShowPassword(!ShowPassword),
									children: ShowPassword ? /* @__PURE__ */ jsx(lucide.EyeOff, {
										className: "h-4 w-4",
										"aria-hidden": "true"
									}) : /* @__PURE__ */ jsx(lucide.Eye, {
										className: "h-4 w-4",
										"aria-hidden": "true"
									})
								})]
							}), Password && /* @__PURE__ */ jsx("div", {
								className: "mt-1 flex gap-1",
								role: "status",
								"aria-label": Password.length >= 12 && /[^a-zA-Z0-9]/.test(Password) ? "Strong password" : "Weak password",
								children: [
									0,
									1,
									2
								].map((Segment) => /* @__PURE__ */ jsx("div", {
									className: "h-1 flex-1 flat transition-colors",
									style: { backgroundColor: Password.length >= 12 && /[^a-zA-Z0-9]/.test(Password) ? "#16a34a" : Password.length >= 8 && Segment < 2 ? "#ca8a04" : Password.length >= 6 && Segment < 1 ? "var(--Destruct)" : "var(--Border, #e5e7eb)" }
								}, Segment))
							})] }),
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx(DynamicInput, {
									Content: {
										...ConfirmPasswordField,
										Type: ShowConfirmPassword ? "text" : "password",
										OnChange: SetConfirmPassword,
										AutoComplete: "new-password",
										Error: Errors.confirmPassword
									},
									Id: "confirmPassword"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									className: "absolute right-3 top-2 text-muted-foreground hover:text-foreground",
									"aria-label": ShowConfirmPassword ? "Hide confirm password" : "Show confirm password",
									onClick: () => SetShowConfirmPassword(!ShowConfirmPassword),
									children: ShowConfirmPassword ? /* @__PURE__ */ jsx(lucide.EyeOff, {
										className: "h-4 w-4",
										"aria-hidden": "true"
									}) : /* @__PURE__ */ jsx(lucide.Eye, {
										className: "h-4 w-4",
										"aria-hidden": "true"
									})
								})]
							}),
							/* @__PURE__ */ jsx(DynamicButton, {
								Content: {
									...SubmitButton,
									Type: "submit",
									FullWidth: true
								},
								IsLoading
							})
						]
					}) })]
				})
			})
		})
	});
};
//#endregion
//#region Source/Component/Dynamic/DynamicSignIn.tsx
/**
* DynamicSignIn - email/password sign-in form for the Cloud tier.
*
* Handles form validation, password visibility toggle, error display,
* and "forgot password" link. Submits to Auth0 via Auth0AccountGate.
*/
/**
* Dynamic SignIn component that accepts form schema
* Renders email/password form with optional OAuth and footer links
*/
var DynamicSignIn = ({ Content, OnSubmit, OnOAuth, OnNavigate, ClassName, IsLoading = false, ErrorMessage }) => {
	const { Title, Description, EmailField, PasswordField, SubmitButton, OauthButton, ShowDivider = true, FooterLinks } = Content;
	const [Email, SetEmail] = useState("");
	const [Password, SetPassword] = useState("");
	const [ShowPassword, SetShowPassword] = useState(false);
	const [, SetErrors] = useState({});
	const { t: T } = useTranslation("account");
	const Validate = () => {
		const NewErrors = {};
		if (!Email) NewErrors.email = "Email is required";
		else if (!/\S+@\S+\.\S+/.test(Email)) NewErrors.email = "Please enter a valid email";
		if (!Password) NewErrors.password = "Password is required";
		SetErrors(NewErrors);
		return Object.keys(NewErrors).length === 0;
	};
	const HandleSubmit = (Event) => {
		Event.preventDefault();
		if (!IsLoading && Validate()) OnSubmit?.(Email, Password);
	};
	return /* @__PURE__ */ jsx("section", {
		className: "py-20",
		"aria-label": "Sign in",
		children: /* @__PURE__ */ jsx("div", {
			className: "container mx-auto px-4",
			children: /* @__PURE__ */ jsx("div", {
				className: `mx-auto max-w-md ${ClassName}`,
				children: /* @__PURE__ */ jsxs(Card, {
					className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift",
					children: [
						/* @__PURE__ */ jsxs(CardHeader, {
							className: "space-y-1 text-center",
							children: [/* @__PURE__ */ jsx(CardTitle, {
								className: "text-2xl",
								children: Title
							}), /* @__PURE__ */ jsx(CardDescription, { children: Description })]
						}),
						/* @__PURE__ */ jsxs(CardContent, { children: [
							/* @__PURE__ */ jsxs("form", {
								className: "space-y-4",
								onSubmit: HandleSubmit,
								"aria-label": "Sign in form",
								children: [
									/* @__PURE__ */ jsx("div", {
										"aria-live": "polite",
										"aria-atomic": "true",
										children: ErrorMessage && /* @__PURE__ */ jsx("div", {
											className: "bg-destructive/10 flat p-3 text-destructive",
											role: "alert",
											children: ErrorMessage
										})
									}),
									/* @__PURE__ */ jsx(DynamicInput, {
										Content: {
											...EmailField,
											OnChange: SetEmail
										},
										Id: "email"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "relative",
										children: [/* @__PURE__ */ jsx(DynamicInput, {
											Content: {
												...PasswordField,
												Type: ShowPassword ? "text" : "password",
												OnChange: SetPassword
											},
											Id: "password"
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											className: "absolute right-3 top-2 text-muted-foreground hover:text-foreground",
											"aria-label": ShowPassword ? T("signIn.hidePassword", { defaultValue: "Hide password" }) : T("signIn.showPassword", { defaultValue: "Show password" }),
											onClick: () => SetShowPassword(!ShowPassword),
											children: ShowPassword ? /* @__PURE__ */ jsx(lucide.EyeOff, {
												className: "h-4 w-4",
												"aria-hidden": "true"
											}) : /* @__PURE__ */ jsx(lucide.Eye, {
												className: "h-4 w-4",
												"aria-hidden": "true"
											})
										})]
									}),
									/* @__PURE__ */ jsx(DynamicButton, {
										Content: {
											...SubmitButton,
											Type: "submit",
											FullWidth: true
										},
										IsLoading
									})
								]
							}),
							ShowDivider && /* @__PURE__ */ jsxs("div", {
								className: "relative my-6",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-0 flex items-center",
									children: /* @__PURE__ */ jsx("span", { className: "StaccatoSeparator w-full border-t" })
								}), /* @__PURE__ */ jsx("div", {
									className: "relative flex justify-center uppercase",
									children: /* @__PURE__ */ jsx("span", {
										className: "bg-background px-2 text-muted-foreground",
										children: "Or"
									})
								})]
							}),
							OauthButton && /* @__PURE__ */ jsx(DynamicButton, {
								Content: {
									...OauthButton,
									FullWidth: true
								},
								...OnOAuth ? { OnAction: OnOAuth } : {}
							})
						] }),
						/* @__PURE__ */ jsxs(CardFooter, {
							className: "flex flex-col gap-3 text-center",
							children: [FooterLinks?.SignUp && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "font-medium text-primary hover:underline",
								onClick: () => FooterLinks.SignUp && OnNavigate?.(FooterLinks.SignUp.Href),
								children: FooterLinks.SignUp.Label
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-muted-foreground",
								children: "Don't have an account?"
							})] }), FooterLinks?.ForgotPassword && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "font-medium text-primary hover:underline",
								onClick: () => FooterLinks.ForgotPassword && OnNavigate?.(FooterLinks.ForgotPassword.Href),
								children: FooterLinks.ForgotPassword.Label
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-muted-foreground",
								children: "Forgot your password?"
							})] })]
						})
					]
				})
			})
		})
	});
};
//#endregion
//#region Source/Component/UI/Checkbox.tsx
function Checkbox({ className, ...props }) {
	return /* @__PURE__ */ jsx(CheckboxPrimitive.Root, {
		"data-slot": "checkbox",
		className: cn("focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive peer size-4 shrink-0 rounded-none border bg-background outline-none transition-shadow focus-visible:border-ring focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
		...props,
		children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, {
			"data-slot": "checkbox-indicator",
			className: "flex items-center justify-center text-current transition-none",
			children: /* @__PURE__ */ jsx(lucide.Check, { className: "size-3.5" })
		})
	});
}
//#endregion
//#region Source/Component/Dynamic/DynamicCheckbox.tsx
/**
* Dynamic Checkbox component that accepts content schema
* Composes Checkbox with Label and optional description
*/
var DynamicCheckbox = ({ Content, Name, OnCheckedChange }) => {
	const { Label: LabelText, Description, Checked, DefaultChecked, Disabled = false, Indeterminate = false, OnChange, ClassName, ...props } = Content;
	const HandleCheckedChange = (NewChecked) => {
		if (OnCheckedChange) OnCheckedChange(NewChecked);
		if (OnChange) OnChange(NewChecked);
	};
	const CheckboxProperties = {
		disabled: Disabled,
		onCheckedChange: HandleCheckedChange,
		className: ClassName,
		...props
	};
	if (Checked !== void 0) CheckboxProperties["checked"] = Checked;
	if (DefaultChecked !== void 0) {
		CheckboxProperties["defaultChecked"] = DefaultChecked;
		if (Checked === void 0) CheckboxProperties["checked"] = DefaultChecked;
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-start space-x-3",
		children: [/* @__PURE__ */ jsx(Checkbox, {
			name: Name,
			...CheckboxProperties,
			children: Indeterminate && /* @__PURE__ */ jsx("span", {
				className: "animate-pulse",
				children: "?"
			})
		}), (LabelText || Description) && /* @__PURE__ */ jsxs("div", {
			className: "space-y-1.5",
			children: [LabelText && /* @__PURE__ */ jsx(Label, {
				className: "cursor-pointer font-normal",
				onClick: (Event) => {
					Event.preventDefault();
					HandleCheckedChange(!((Checked !== void 0 ? Checked : DefaultChecked) || false));
				},
				children: LabelText
			}), Description && /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground",
				children: Description
			})]
		})]
	});
};
//#endregion
//#region Source/Component/Dynamic/DynamicSignUp.tsx
/**
* DynamicSignUp - account registration form for the Cloud tier.
*
* Collects email, password (with strength indicator and visibility toggle),
* and display name. Submits to Auth0 via Auth0AccountGate.
*/
/**
* Dynamic SignUp component that accepts registration form schema
* Renders email, password, confirm password, terms checkbox, social OAuth
*/
var DynamicSignUp = ({ Content, OnSubmit, OnOAuth, OnNavigate, ClassName, IsLoading = false, ErrorMessage }) => {
	const { Title, Description, EmailField, PasswordField, ConfirmPasswordField, TermsCheckbox, SubmitButton, OauthButtons = [], ShowDivider = true, FooterLinks } = Content;
	const [Email, SetEmail] = useState("");
	const [Password, SetPassword] = useState("");
	const [ConfirmPassword, SetConfirmPassword] = useState("");
	const [ShowPassword, SetShowPassword] = useState(false);
	const [TermsAccepted, SetTermsAccepted] = useState(false);
	const { t: T } = useTranslation("account");
	const [Errors, SetErrors] = useState({});
	const Validate = () => {
		const NewErrors = {};
		if (!Email) NewErrors.email = "Email is required";
		else if (!/\S+@\S+\.\S+/.test(Email)) NewErrors.email = "Please enter a valid email";
		if (!Password) NewErrors.password = "Password is required";
		else if (Password.length < 8) NewErrors.password = "Password must be at least 8 characters";
		if (!ConfirmPassword) NewErrors.confirmPassword = "Please confirm your password";
		else if (Password !== ConfirmPassword) NewErrors.confirmPassword = "Passwords do not match";
		if (!TermsAccepted) NewErrors.terms = "You must accept the terms and conditions";
		SetErrors(NewErrors);
		return Object.keys(NewErrors).length === 0;
	};
	const HandleSubmit = (Event) => {
		Event.preventDefault();
		if (Validate()) OnSubmit?.(Email, Password, ConfirmPassword, TermsAccepted);
	};
	return /* @__PURE__ */ jsx("section", {
		className: "py-20",
		"aria-label": "Sign up",
		children: /* @__PURE__ */ jsx("div", {
			className: "container mx-auto px-4",
			children: /* @__PURE__ */ jsx("div", {
				className: `mx-auto max-w-md ${ClassName}`,
				children: /* @__PURE__ */ jsxs(Card, {
					className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift",
					children: [
						/* @__PURE__ */ jsxs(CardHeader, {
							className: "space-y-1 text-center",
							children: [/* @__PURE__ */ jsx(CardTitle, {
								className: "text-2xl",
								children: Title
							}), /* @__PURE__ */ jsx(CardDescription, { children: Description })]
						}),
						/* @__PURE__ */ jsxs(CardContent, { children: [
							/* @__PURE__ */ jsxs("form", {
								className: "space-y-4",
								onSubmit: HandleSubmit,
								"aria-label": "Sign up form",
								children: [
									/* @__PURE__ */ jsx("div", {
										"aria-live": "polite",
										"aria-atomic": "true",
										children: ErrorMessage && /* @__PURE__ */ jsx("div", {
											className: "bg-destructive/10 flat p-3 text-destructive",
											role: "alert",
											children: ErrorMessage
										})
									}),
									/* @__PURE__ */ jsx(DynamicInput, {
										Content: {
											...EmailField,
											OnChange: SetEmail
										},
										Id: "email"
									}),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
										className: "relative",
										children: [/* @__PURE__ */ jsx(DynamicInput, {
											Content: {
												...PasswordField,
												Type: ShowPassword ? "text" : "password",
												OnChange: SetPassword,
												AutoComplete: "new-password",
												Error: Errors.password
											},
											Id: "password"
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											className: "absolute right-3 top-2 text-muted-foreground hover:text-foreground",
											"aria-label": ShowPassword ? T("signUp.hidePassword", { defaultValue: "Hide password" }) : T("signUp.showPassword", { defaultValue: "Show password" }),
											onClick: () => SetShowPassword(!ShowPassword),
											children: ShowPassword ? /* @__PURE__ */ jsx(lucide.EyeOff, {
												className: "h-4 w-4",
												"aria-hidden": "true"
											}) : /* @__PURE__ */ jsx(lucide.Eye, {
												className: "h-4 w-4",
												"aria-hidden": "true"
											})
										})]
									}), Password && /* @__PURE__ */ jsx("div", {
										className: "mt-1 flex gap-1",
										"aria-label": Password.length >= 12 && /[^a-zA-Z0-9]/.test(Password) ? T("signUp.passwordStrength.strong", { defaultValue: "Strong password" }) : Password.length >= 8 ? T("signUp.passwordStrength.weak", { defaultValue: "Weak password" }) : T("signUp.passwordStrength.weak", { defaultValue: "Weak password" }),
										role: "status",
										children: [
											0,
											1,
											2
										].map((Segment) => /* @__PURE__ */ jsx("div", {
											className: "h-1 flex-1 flat transition-colors",
											style: { backgroundColor: Password.length >= 12 && /[^a-zA-Z0-9]/.test(Password) ? "#16a34a" : Password.length >= 8 && Segment < 2 ? "#ca8a04" : Password.length >= 6 && Segment < 1 ? "var(--Destruct)" : "var(--Border, #e5e7eb)" }
										}, Segment))
									})] }),
									/* @__PURE__ */ jsx(DynamicInput, {
										Content: {
											...ConfirmPasswordField,
											Type: "password",
											OnChange: SetConfirmPassword,
											AutoComplete: "new-password",
											Error: Errors.confirmPassword
										},
										Id: "confirmPassword"
									}),
									/* @__PURE__ */ jsx(DynamicCheckbox, { Content: {
										...TermsCheckbox,
										Checked: TermsAccepted,
										OnChange: SetTermsAccepted
									} }),
									/* @__PURE__ */ jsx(DynamicButton, {
										Content: {
											...SubmitButton,
											Type: "submit",
											FullWidth: true
										},
										IsLoading
									})
								]
							}),
							ShowDivider && OauthButtons.length > 0 && /* @__PURE__ */ jsxs("div", {
								className: "relative my-6",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute inset-0 flex items-center",
									children: /* @__PURE__ */ jsx("span", { className: "StaccatoSeparator w-full border-t" })
								}), /* @__PURE__ */ jsx("div", {
									className: "relative flex justify-center uppercase",
									children: /* @__PURE__ */ jsx("span", {
										className: "bg-background px-2 text-muted-foreground",
										children: "Or"
									})
								})]
							}),
							OauthButtons.length > 0 && /* @__PURE__ */ jsx("div", {
								className: "space-y-3",
								children: OauthButtons.map((ButtonItem, Index) => /* @__PURE__ */ jsx(DynamicButton, {
									Content: {
										...ButtonItem,
										FullWidth: true
									},
									OnAction: () => OnOAuth?.(ButtonItem.Icon)
								}, Index))
							})
						] }),
						/* @__PURE__ */ jsx(CardFooter, {
							className: "flex flex-col gap-3 text-center",
							children: FooterLinks?.SignIn && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "font-medium text-primary hover:underline",
								onClick: () => FooterLinks.SignIn && OnNavigate?.(FooterLinks.SignIn.Href),
								children: FooterLinks.SignIn.Label
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-muted-foreground",
								children: "Already have an account?"
							})] })
						})
					]
				})
			})
		})
	});
};
//#endregion
//#region Source/Component/Dynamic/AccountPage.tsx
/**
* AccountPage - orchestrates sign-in, sign-up, forgot-password, and
* reset-password views as a single-page flow.
*
* Switches between views based on Route prop ("SignIn" | "SignUp" |
* "ForgotPassword" | "ResetPassword"). Handles Auth0 token exchange
* and error display via toast notifications.
*/
var Authentication = new AuthAPI();
var SetSessionToken = (Token) => {
	try {
		document.cookie = `session=${Token}; path=/; max-age=${10080 * 60}; SameSite=Strict`;
	} catch {}
	localStorage.setItem("session_token", Token);
};
var SetCurrentUser = (CurrentUser) => {
	try {
		localStorage.setItem("current_user", JSON.stringify(CurrentUser));
	} catch {}
};
var NavigateToPath = (Path) => {
	window.location.href = Path;
};
var AccountPage = ({ Content, Route, ResetToken, ClassName, OnSignIn, OnSignUp, OnForgotPassword, OnResetPassword, OnNavigate }) => {
	const { SignIn, SignUp, ForgotPassword, ResetPassword } = Content;
	const Navigate = OnNavigate || NavigateToPath;
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
			const { session: SessionData, user: UserData } = await Authentication.Login(Email, Password);
			SetSessionToken(SessionData.token);
			SetCurrentUser(UserData);
			toast.success(`Welcome back, ${UserData.username}!`);
			OnSignIn?.(Email, Password);
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
			const { session: SessionData, user: UserData } = await Authentication.Register(Email, Password, Username, void 0);
			SetSessionToken(SessionData.token);
			SetCurrentUser(UserData);
			toast.success("Account created successfully! Please verify your email.");
			OnSignUp?.(Email, Password, ConfirmPassword, TermsAccepted);
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
			toast.success("Password reset email sent. Please check your inbox.");
			OnForgotPassword?.(Email);
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
			toast.success("Password reset successful! You can now sign in with your new password.");
			OnResetPassword?.(Token, Password, ConfirmPassword);
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
		const OAuthToken = new URLSearchParams(window.location.search).get("token");
		if (OAuthToken && Route === "signin") {
			SetSessionToken(OAuthToken);
			toast.success("OAuth authentication successful!");
			Authentication.GetSession().then((SessionResponse) => {
				SetCurrentUser(SessionResponse.user);
			}).catch(() => {});
			Navigate("/Dashboard");
		}
	}, [Route, Navigate]);
	return /* @__PURE__ */ jsxs("div", {
		className: `flex min-h-screen flex-col ${ClassName || ""}`,
		children: [/* @__PURE__ */ jsx(Header, { ...Content.Header ? { content: Content.Header } : {} }), /* @__PURE__ */ jsxs("div", {
			className: "flex-1",
			children: [
				Route === "signin" && /* @__PURE__ */ jsx(DynamicSignIn, {
					Content: SignIn,
					OnSubmit: HandleSignIn,
					OnOAuth: HandleOAuth,
					OnNavigate: Navigate
				}),
				Route === "signup" && /* @__PURE__ */ jsx(DynamicSignUp, {
					Content: SignUp,
					OnSubmit: HandleSignUp,
					OnOAuth: HandleOAuth,
					OnNavigate: Navigate
				}),
				Route === "forgot-password" && /* @__PURE__ */ jsx(DynamicForgotPassword, {
					Content: ForgotPassword,
					OnSubmit: HandleForgotPassword,
					OnResend: () => HandleForgotPassword(""),
					OnNavigate: Navigate
				}),
				Route === "reset-password" && /* @__PURE__ */ jsx(DynamicResetPassword, {
					Content: ResetPassword,
					Token: ResetToken || "",
					OnReset: HandleResetPassword,
					OnNavigate: Navigate
				})
			]
		})]
	});
};
//#endregion
export { AccountPage as t };
