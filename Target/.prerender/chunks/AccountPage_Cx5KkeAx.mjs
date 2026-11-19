import { n as DynamicButton, r as AuthAPI, t as DynamicInput } from "./DynamicInput_BJHPGyBw.mjs";
import { n as StateLabel, r as StateBadge } from "./DynamicStateReport_CppvWskY.mjs";
import { t as AuthReport } from "./Report_B4f34NRY.mjs";
import { t as Checkbox } from "./Checkbox_BOF5lhEd.mjs";
import { t as Label } from "./Label_DbP1qFU8.mjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import * as lucide from "lucide-react";
import { toast } from "sonner";
// Source/Component/Dynamic/DynamicForgotPassword.tsx
/**
* Dynamic ForgotPassword component for password reset request.
*
* Renders the baseline's card: the `Reset Your Password` heading and its one
* supporting sentence over the email form, then the sent state in the same
* card. The card itself belongs to the route's `AuthShell`; this component
* owns the interior - the fields, the validation and the two states.
*/
var DynamicForgotPassword = ({ Content, OnSubmit, OnResend, OnNavigate, IsLoading = false, ErrorMessage }) => {
	const { t: T } = useTranslation("account");
	const { EmailField, SubmitButton, ResendButton, SuccessMessage } = Content;
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
			SetInternalError("Please enter a valid email address");
			return;
		}
		OnSubmit?.(Email);
		SetIsSubmitted(true);
		SetInternalError("");
	};
	const BackToSignIn = T("account.forgotPassword.backToSignIn", { defaultValue: "Back to Sign In" });
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("div", {
		className: "flex flex-col space-y-1 p-6 text-center",
		children: [/* @__PURE__ */ jsx("h3", {
			className: "type-heading",
			children: Content.Title
		}), /* @__PURE__ */ jsx("p", {
			className: "text-sm text-card-foreground opacity-70",
			children: Content.Description
		})]
	}), !IsSubmitted ? /* @__PURE__ */ jsx("div", {
		className: "p-6 pt-0",
		children: /* @__PURE__ */ jsxs("form", {
			className: "space-y-4",
			onSubmit: HandleSubmit,
			"aria-label": "Password reset request form",
			children: [
				/* @__PURE__ */ jsx("div", {
					"aria-live": "polite",
					"aria-atomic": "true",
					children: (ErrorMessage || InternalError) && /* @__PURE__ */ jsx("p", {
						className: "auth-shell__error",
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
						Variant: "default",
						FullWidth: true,
						ClassName: "auth-shell__primary"
					},
					IsLoading
				})
			]
		})
	}) : /* @__PURE__ */ jsxs("div", {
		className: "space-y-4 p-6 pt-0",
		role: "status",
		"aria-live": "polite",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "auth-shell__status flex justify-center",
				children: /* @__PURE__ */ jsx(StateBadge, { Label: T("auth.forgotPassword.sentStatus", { defaultValue: StateLabel.Ready }) })
			}),
			/* @__PURE__ */ jsx("p", {
				className: "auth-shell__report-sentence",
				children: SuccessMessage || "We've sent a password reset link to your email address."
			}),
			ResendButton && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("p", {
				className: "auth-shell__note",
				children: "Didn't receive the email?"
			}), /* @__PURE__ */ jsx(DynamicButton, {
				Content: {
					Text: ResendButton.Text,
					Variant: "default",
					ClassName: "auth-shell__primary"
				},
				OnAction: () => OnResend?.()
			})] }),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "auth-shell__alternate",
				onClick: () => OnNavigate?.("/Account/SignIn"),
				children: BackToSignIn
			})
		]
	})] });
};
// Source/Component/Dynamic/Password/Strength.ts
/** How many of the three segments a tone fills. */
var StrengthFill = {
	none: 0,
	weak: 1,
	medium: 2,
	strong: 3
};
/** The three segments, in order. */
var StrengthSegments = [
	0,
	1,
	2
];
/**
* The one place the thresholds are written.
*
* Twelve characters with at least one non-alphanumeric character is strong,
* eight is medium, six is weak, and anything shorter is no level at all.
*/
var StrengthOf = (Password) => Password.length >= 12 && /[^a-zA-Z0-9]/.test(Password) ? "strong" : Password.length >= 8 ? "medium" : Password.length >= 6 ? "weak" : "none";
// Source/Component/Dynamic/DynamicResetPassword.tsx
/**
* Dynamic ResetPassword component for setting a new password with token
* validation. Supports 4 states: checking, valid (form), invalid (error),
* success.
*
* The card belongs to the route's `AuthShell`; this component owns the
* interior. The checking state is the baseline's - the spinner and the
* `Validating your reset link, please wait...` status line in the card's own
* padding - and the other three states land on the same card.
*/
var DynamicResetPassword = ({ Content, Token: PropToken, OnReset, OnNavigate, IsLoading = false, ErrorMessage }) => {
	const { t: T } = useTranslation("account");
	const { PasswordField, ConfirmPasswordField, SubmitButton, SuccessMessage, InvalidTokenMessage, CheckingMessage } = Content;
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
	const Tone = StrengthOf(Password);
	const Filled = StrengthFill[Tone];
	const BackToSignIn = T("account.forgotPassword.backToSignIn", { defaultValue: "Back to Sign In" });
	const GoToSignIn = T("account.resetPassword.success.button", { defaultValue: "Sign In" });
	if (State === "checking") return /* @__PURE__ */ jsx("div", {
		className: "p-6 pt-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-4",
			"aria-live": "polite",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "auth-shell__status flex justify-center",
					children: /* @__PURE__ */ jsx(StateBadge, { Label: T("auth.resetPassword.checkingStatus", { defaultValue: StateLabel.Loading }) })
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "StateBusy StateBusy--stack mx-auto w-40",
					"aria-busy": "true",
					"aria-hidden": "true",
					children: [/* @__PURE__ */ jsx("span", {
						className: "StateBusy__Bar",
						style: { "--bar": "100%" }
					}), /* @__PURE__ */ jsx("span", {
						className: "StateBusy__Bar",
						style: { "--bar": "64%" }
					})]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground",
					role: "status",
					children: CheckingMessage || "Validating your reset link, please wait..."
				})
			]
		})
	});
	if (State === "invalid") return /* @__PURE__ */ jsx(AuthReport, {
		State: T("auth.resetPassword.expiredStatus", { defaultValue: StateLabel.Unavailable }),
		Title: T("account.resetPassword.invalidToken.title", { defaultValue: "Link Expired or Invalid" }),
		Sentence: InvalidTokenMessage || "This password reset link is invalid or has expired. Please request a new one.",
		Glyph: "alert",
		Role: "alert",
		children: /* @__PURE__ */ jsx(DynamicButton, {
			Content: {
				Text: BackToSignIn,
				Variant: "default",
				ClassName: "auth-shell__primary"
			},
			OnAction: () => OnNavigate?.("/Account/SignIn")
		})
	});
	if (State === "success") return /* @__PURE__ */ jsx(AuthReport, {
		State: T("auth.resetPassword.updatedStatus", { defaultValue: StateLabel.Ready }),
		Title: T("account.resetPassword.success.title", { defaultValue: "Password updated" }),
		Sentence: SuccessMessage || "Your password has been reset successfully. You can now sign in with your new password.",
		Glyph: "check",
		Role: "status",
		children: /* @__PURE__ */ jsx(DynamicButton, {
			Content: {
				Text: GoToSignIn,
				Variant: "default",
				ClassName: "auth-shell__primary"
			},
			OnAction: () => OnNavigate?.("/Account/SignIn")
		})
	});
	return /* @__PURE__ */ jsxs("form", {
		className: "space-y-4 p-6",
		onSubmit: HandleSubmit,
		"aria-label": "Reset password form",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col space-y-1 text-center",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "type-heading",
					children: Content.Title
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-card-foreground opacity-70",
					children: Content.Description
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				"aria-live": "polite",
				"aria-atomic": "true",
				children: ErrorMessage && /* @__PURE__ */ jsx("p", {
					className: "auth-shell__error",
					role: "alert",
					children: ErrorMessage
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "auth-shell__field",
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
					className: "auth-shell__reveal",
					onClick: () => SetShowPassword(!ShowPassword),
					children: ShowPassword ? "Hide password" : "Show password"
				})]
			}),
			Password && /* @__PURE__ */ jsx("div", {
				className: "auth-shell__strength",
				role: "status",
				"aria-label": Tone === "strong" || Tone === "medium" ? "Strong password" : "Weak password",
				children: StrengthSegments.map((Segment) => /* @__PURE__ */ jsx("span", { className: ["auth-shell__strength-segment", Segment < Filled ? `auth-shell__strength-segment--${Tone}` : ""].filter(Boolean).join(" ") }, Segment))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "auth-shell__field",
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
					className: "auth-shell__reveal",
					onClick: () => SetShowConfirmPassword(!ShowConfirmPassword),
					children: ShowConfirmPassword ? "Hide confirm password" : "Show confirm password"
				})]
			}),
			/* @__PURE__ */ jsx(DynamicButton, {
				Content: {
					...SubmitButton,
					Type: "submit",
					Variant: "default",
					FullWidth: true,
					ClassName: "auth-shell__primary"
				},
				IsLoading
			})
		]
	});
};
// Source/Component/Dynamic/DynamicSignIn.tsx
/**
* DynamicSignIn - the credential form for the Cloud tier.
*
* Renders inside the route's `AuthShell`: the page frame (the /KICKER, the
* `h1`, the supporting sentence and the one page-level alternate action)
* belongs to the shell, and this island owns only what is inside it - the two
* fields, the reveal control, the validation, the provider button and the two
* footer alternates.
*
* The vocabulary is the shell's (`auth-shell__form`, `auth-shell__field`,
* `auth-shell__error`, `auth-shell__primary`, `auth-shell__alternate`), so
* sign-in, sign-up, forgot-password and reset-password are one form language
* rather than four centred cards.
*
* This submit stays a native `<button type="submit">`, so it carries the
* published `.emphasis-expressive` tier rather than the Jelly `--jelly-*`
* properties the other auth actions set (DESIGN.md §7 DR-16): it is the form's
* default button, and a form with two blocking fields and no native submit
* button does not submit on Enter - measured in Chromium 157 - so a Jelly
* submit here would cost the keyboard path.
*
* Behaviour: the same two fields, the same validation predicates and messages,
* the same submit gate, the same OAuth hand-off and the same footer
* destinations. The validation result is read, so every error prints as a full
* sentence in the shell's error style.
*/
/** The one place this form's validation messages are written. */
var Messages$1 = {
	emailRequired: "Email is required",
	emailInvalid: "Please enter a valid email",
	passwordRequired: "Password is required"
};
/**
* Dynamic SignIn component that accepts form schema
* Renders email/password form with optional OAuth and footer links
*/
var DynamicSignIn = ({ Content, OnSubmit, OnOAuth, OnNavigate, ClassName, IsLoading = false, ErrorMessage }) => {
	const { Title, Description, EmailField, PasswordField, SubmitButton, OauthButton, ShowDivider = true, FooterLinks } = Content;
	const [Email, SetEmail] = useState("");
	const [Password, SetPassword] = useState("");
	const [ShowPassword, SetShowPassword] = useState(false);
	const [Errors, SetErrors] = useState({});
	const { t: T } = useTranslation("account");
	const Validate = () => {
		const NewErrors = {};
		if (!Email) NewErrors.email = Messages$1.emailRequired;
		else if (!/\S+@\S+\.\S+/.test(Email)) NewErrors.email = Messages$1.emailInvalid;
		if (!Password) NewErrors.password = Messages$1.passwordRequired;
		SetErrors(NewErrors);
		return Object.keys(NewErrors).length === 0;
	};
	const HandleSubmit = (Event) => {
		Event.preventDefault();
		if (!IsLoading && Validate()) OnSubmit?.(Email, Password);
	};
	return /* @__PURE__ */ jsxs("form", {
		className: `auth-shell__form ${ClassName || ""}`,
		onSubmit: HandleSubmit,
		"aria-label": "Sign in form",
		children: [
			Title && /* @__PURE__ */ jsx("p", {
				className: "auth-shell__note",
				children: Title
			}),
			Description && /* @__PURE__ */ jsx("p", {
				className: "auth-shell__report-sentence",
				children: Description
			}),
			/* @__PURE__ */ jsx("div", {
				"aria-live": "polite",
				"aria-atomic": "true",
				children: ErrorMessage && /* @__PURE__ */ jsx("p", {
					className: "auth-shell__error",
					role: "alert",
					children: ErrorMessage
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "auth-shell__field",
				children: /* @__PURE__ */ jsx(DynamicInput, {
					Content: {
						...EmailField,
						OnChange: SetEmail,
						...Errors.email ? { Error: Errors.email } : {}
					},
					Id: "email"
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "auth-shell__field",
				children: [/* @__PURE__ */ jsx(DynamicInput, {
					Content: {
						...PasswordField,
						Type: ShowPassword ? "text" : "password",
						OnChange: SetPassword,
						...Errors.password ? { Error: Errors.password } : {}
					},
					Id: "password"
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "auth-shell__reveal",
					"aria-label": ShowPassword ? T("signIn.hidePassword", { defaultValue: "Hide password" }) : T("signIn.showPassword", { defaultValue: "Show password" }),
					onClick: () => SetShowPassword(!ShowPassword),
					children: ShowPassword ? /* @__PURE__ */ jsx(lucide.EyeOff, { "aria-hidden": "true" }) : /* @__PURE__ */ jsx(lucide.Eye, { "aria-hidden": "true" })
				})]
			}),
			/* @__PURE__ */ jsx(DynamicButton, {
				Content: {
					...SubmitButton,
					Type: "submit",
					FullWidth: true,
					ClassName: "auth-shell__primary emphasis-expressive"
				},
				IsLoading
			}),
			ShowDivider && /* @__PURE__ */ jsx("p", {
				className: "auth-shell__divider",
				children: "Or"
			}),
			OauthButton && /* @__PURE__ */ jsx(DynamicButton, {
				Content: {
					...OauthButton,
					FullWidth: true
				},
				...OnOAuth ? { OnAction: OnOAuth } : {}
			}),
			(FooterLinks?.SignUp || FooterLinks?.ForgotPassword) && /* @__PURE__ */ jsxs("div", {
				className: "auth-shell__footer",
				children: [FooterLinks?.SignUp && /* @__PURE__ */ jsxs("div", {
					className: "auth-shell__footer-row",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "auth-shell__alternate",
						onClick: () => FooterLinks.SignUp && OnNavigate?.(FooterLinks.SignUp.Href),
						children: FooterLinks.SignUp.Label
					}), /* @__PURE__ */ jsx("p", {
						className: "auth-shell__note",
						children: "Don't have an account?"
					})]
				}), FooterLinks?.ForgotPassword && /* @__PURE__ */ jsxs("div", {
					className: "auth-shell__footer-row",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "auth-shell__alternate",
						onClick: () => FooterLinks.ForgotPassword && OnNavigate?.(FooterLinks.ForgotPassword.Href),
						children: FooterLinks.ForgotPassword.Label
					}), /* @__PURE__ */ jsx("p", {
						className: "auth-shell__note",
						children: "Forgot your password?"
					})]
				})]
			})
		]
	});
};
// Source/Component/Dynamic/DynamicCheckbox.tsx
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
// Source/Component/Dynamic/DynamicSignUp.tsx
/**
* DynamicSignUp - the account registration form for the Cloud tier.
*
* Renders inside the route's `AuthShell`, so the page frame (the /KICKER, the
* `h1`, the supporting sentence and the one page-level alternate action) is
* the shell's and this island owns only what sits inside it: the four fields,
* the reveal control, the strength meter, the terms checkbox, the provider
* buttons and the footer alternate.
*
* The strength meter reads its thresholds from `Password/Strength.ts` and its
* colours from the shell partial's tone modifier classes - never a literal
* colour in a `style` attribute, on the one surface that is supposed to have
* none.
*
* Behaviour: the same fields, the same validation predicates and messages, the
* same submit gate, the same OAuth hand-off, the same footer destination. The
* email and terms errors are rendered, so every failing branch says what failed
* in a sentence.
*/
/** The one place this form's validation messages are written. */
var Messages = {
	emailRequired: "Email is required",
	emailInvalid: "Please enter a valid email",
	passwordRequired: "Password is required",
	passwordShort: "Password must be at least 8 characters",
	confirmRequired: "Please confirm your password",
	confirmMismatch: "Passwords do not match",
	termsRequired: "You must accept the terms and conditions"
};
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
		if (!Email) NewErrors.email = Messages.emailRequired;
		else if (!/\S+@\S+\.\S+/.test(Email)) NewErrors.email = Messages.emailInvalid;
		if (!Password) NewErrors.password = Messages.passwordRequired;
		else if (Password.length < 8) NewErrors.password = Messages.passwordShort;
		if (!ConfirmPassword) NewErrors.confirmPassword = Messages.confirmRequired;
		else if (Password !== ConfirmPassword) NewErrors.confirmPassword = Messages.confirmMismatch;
		if (!TermsAccepted) NewErrors.terms = Messages.termsRequired;
		SetErrors(NewErrors);
		return Object.keys(NewErrors).length === 0;
	};
	const HandleSubmit = (Event) => {
		Event.preventDefault();
		if (Validate()) OnSubmit?.(Email, Password, ConfirmPassword, TermsAccepted);
	};
	const Tone = StrengthOf(Password);
	const Filled = StrengthFill[Tone];
	return /* @__PURE__ */ jsxs("form", {
		className: `auth-shell__form ${ClassName || ""}`,
		onSubmit: HandleSubmit,
		"aria-label": "Sign up form",
		children: [
			Title && /* @__PURE__ */ jsx("p", {
				className: "auth-shell__note",
				children: Title
			}),
			Description && /* @__PURE__ */ jsx("p", {
				className: "auth-shell__report-sentence",
				children: Description
			}),
			/* @__PURE__ */ jsx("div", {
				"aria-live": "polite",
				"aria-atomic": "true",
				children: ErrorMessage && /* @__PURE__ */ jsx("p", {
					className: "auth-shell__error",
					role: "alert",
					children: ErrorMessage
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "auth-shell__field",
				children: /* @__PURE__ */ jsx(DynamicInput, {
					Content: {
						...EmailField,
						OnChange: SetEmail,
						...Errors.email ? { Error: Errors.email } : {}
					},
					Id: "email"
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "auth-shell__field",
				children: [
					/* @__PURE__ */ jsx(DynamicInput, {
						Content: {
							...PasswordField,
							Type: ShowPassword ? "text" : "password",
							OnChange: SetPassword,
							AutoComplete: "new-password",
							...Errors.password ? { Error: Errors.password } : {}
						},
						Id: "password"
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "auth-shell__reveal",
						"aria-label": ShowPassword ? T("signUp.hidePassword", { defaultValue: "Hide password" }) : T("signUp.showPassword", { defaultValue: "Show password" }),
						onClick: () => SetShowPassword(!ShowPassword),
						children: ShowPassword ? /* @__PURE__ */ jsx(lucide.EyeOff, { "aria-hidden": "true" }) : /* @__PURE__ */ jsx(lucide.Eye, { "aria-hidden": "true" })
					}),
					Password && /* @__PURE__ */ jsx("div", {
						className: "auth-shell__strength",
						role: "status",
						"aria-label": Tone === "strong" ? T("signUp.passwordStrength.strong", { defaultValue: "Strong password" }) : T("signUp.passwordStrength.weak", { defaultValue: "Weak password" }),
						children: StrengthSegments.map((Segment) => /* @__PURE__ */ jsx("span", { className: ["auth-shell__strength-segment", Segment < Filled ? `auth-shell__strength-segment--${Tone}` : ""].filter(Boolean).join(" ") }, Segment))
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "auth-shell__field",
				children: /* @__PURE__ */ jsx(DynamicInput, {
					Content: {
						...ConfirmPasswordField,
						Type: "password",
						OnChange: SetConfirmPassword,
						AutoComplete: "new-password",
						...Errors.confirmPassword ? { Error: Errors.confirmPassword } : {}
					},
					Id: "confirmPassword"
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "auth-shell__terms",
				children: [/* @__PURE__ */ jsx(DynamicCheckbox, { Content: {
					...TermsCheckbox,
					Checked: TermsAccepted,
					OnChange: SetTermsAccepted
				} }), Errors.terms && /* @__PURE__ */ jsx("p", {
					className: "auth-shell__error",
					role: "alert",
					children: Errors.terms
				})]
			}),
			/* @__PURE__ */ jsx(DynamicButton, {
				Content: {
					...SubmitButton,
					Type: "submit",
					FullWidth: true,
					ClassName: "auth-shell__primary emphasis-expressive"
				},
				IsLoading
			}),
			ShowDivider && OauthButtons.length > 0 && /* @__PURE__ */ jsx("p", {
				className: "auth-shell__divider",
				children: "Or"
			}),
			OauthButtons.length > 0 && /* @__PURE__ */ jsx("div", {
				className: "auth-shell__oauth",
				children: OauthButtons.map((ButtonItem, Index) => /* @__PURE__ */ jsx(DynamicButton, {
					Content: {
						...ButtonItem,
						FullWidth: true
					},
					OnAction: () => OnOAuth?.(ButtonItem.Icon)
				}, Index))
			}),
			FooterLinks?.SignIn && /* @__PURE__ */ jsx("div", {
				className: "auth-shell__footer",
				children: /* @__PURE__ */ jsxs("div", {
					className: "auth-shell__footer-row",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "auth-shell__alternate",
						onClick: () => FooterLinks.SignIn && OnNavigate?.(FooterLinks.SignIn.Href),
						children: FooterLinks.SignIn.Label
					}), /* @__PURE__ */ jsx("p", {
						className: "auth-shell__note",
						children: "Already have an account?"
					})]
				})
			})
		]
	});
};
// Source/Component/Dynamic/AccountPage.tsx
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
		document.cookie = `session=${Token}; path=/; max-age=604800; SameSite=Strict`;
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
			toast.success(UserData.username ? `Session written: ${UserData.username}` : "Session written");
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
		className: `auth-shell__form ${ClassName || ""}`,
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
	});
};
export { AccountPage as t };
