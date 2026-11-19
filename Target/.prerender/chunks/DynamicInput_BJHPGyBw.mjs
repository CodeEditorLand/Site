import { qt as Button, r as GetWorkersClient } from "./Base_BVG1wSoZ.mjs";
import { n as Input } from "./Report_B4f34NRY.mjs";
import { t as Label } from "./Label_DbP1qFU8.mjs";
import { useId } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import * as lucide from "lucide-react";
// Source/Component/Auth/Content.ts
/** The four account forms, shared by /Account/ForgotPassword and /Account/ResetPassword. */
var AccountContent = (T) => ({
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
		SubmitButton: { Text: T("common.button.signUp", { defaultValue: "Create Account" }) }
	},
	ForgotPassword: {
		Title: T("account.forgotPassword.title", { defaultValue: "Reset Your Password" }),
		Description: T("account.forgotPassword.subtitle", { defaultValue: "One address. The provider sends a reset link to it, and the link opens for one hour." }),
		EmailField: {
			Label: T("common.label.email", { defaultValue: "Email Address" }),
			Placeholder: T("account.forgotPassword.emailPlaceholder", { defaultValue: "name@example.com" }),
			Type: "email",
			Required: true
		},
		SubmitButton: {
			Text: T("account.forgotPassword.submit", { defaultValue: "Send Reset Link" }),
			Variant: "default",
			FullWidth: true
		},
		SuccessMessage: T("account.forgotPassword.success.subtitle", { defaultValue: "A reset link was sent to" })
	},
	ResetPassword: {
		Title: T("account.resetPassword.title", { defaultValue: "Set a New Password" }),
		Description: T("account.resetPassword.subtitle", { defaultValue: "The new password replaces the old one at the provider. Eight characters is the floor." }),
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
		CheckingMessage: T("account.resetPassword.checkingMessage", { defaultValue: "Reading the reset token from the address." }),
		InvalidTokenMessage: T("account.resetPassword.invalidToken.description", { defaultValue: "The reset link has expired or was already used. A link works once and closes after one hour." }),
		SuccessMessage: T("account.resetPassword.success.description", { defaultValue: "The password is changed.\n\nThe old one no longer opens the account; sign in with the new one." })
	},
	Footer: {}
});
/**
* The verify card's four states, shared by /Verify in both entry modes.
*
* The keys carry the `verify:` prefix because `GetI18n()` resolves against
* `defaultNS: "common"`: an unprefixed `verify.pending.title` is looked up as
* `Common.verify.pending.title`, which does not exist, so the call fell
* through to its `defaultValue` and `Verify.json` was never read. The prefix
* makes the file the copy and the default the missing-key arm.
*/
var VerifyContent = (T) => ({ Verification: {
	Pending: {
		Title: T("verify:pending.title", { defaultValue: "Check The Inbox" }),
		Description: T("verify:pending.description", { defaultValue: "A link was sent to the address on the account. It opens for 24 hours and works once.\n\nIf nothing arrives in a few minutes, the spam folder is the next place to look.\n\nThe link is a credential: anyone who opens it verifies the address." }),
		ResendButton: {
			Text: T("verify:pending.resendButton", { defaultValue: "Send A New Link" }),
			Variant: "default",
			FullWidth: true
		}
	},
	Verifying: {
		Title: T("verify:verifying.title", { defaultValue: "Verifying your email" }),
		Description: T("verify:verifying.description", { defaultValue: "Checking the email address with the provider." })
	},
	Success: {
		Title: T("verify:success.title", { defaultValue: "Email Verified" }),
		Description: T("verify:success.description", { defaultValue: "The address on the account is verified. Signing in is the last step before the workspace opens." }),
		ContinueButton: {
			Text: T("verify:success.continueButton", { defaultValue: "BACK TO LAND" }),
			Variant: "default",
			FullWidth: true
		}
	},
	Error: {
		Title: T("verify:error.title", { defaultValue: "Verification Interrupted" }),
		Description: T("verify:error.description", { defaultValue: "The link carried no token the provider recognises, or the token's window has closed. A new link is the only way forward." }),
		BackToSignInButton: {
			Text: T("verify:error.backToSignInButton", { defaultValue: "SIGN IN" }),
			Variant: "default",
			FullWidth: true
		}
	}
} });
// Source/Library/API/Authentication.ts
/**
* Authentication API adapter - one method per account and session operation,
* each returning the unwrapped payload or throwing the worker's error message.
*/
var AuthAPI = class {
	Workers = GetWorkersClient();
	async Login(Email, Password) {
		const Response = await this.Workers.Authentication.Login(Email, Password);
		if (!Response.success || !Response.data) throw new Error(Response.error || "Login failed");
		return Response.data;
	}
	async Register(Email, Password, Username, DisplayName) {
		const Response = await this.Workers.Authentication.Register(Email, Password, Username, DisplayName);
		if (!Response.success || !Response.data) throw new Error(Response.error || "Registration failed");
		return Response.data;
	}
	async Logout() {
		const Response = await this.Workers.Authentication.Logout();
		if (!Response.success) throw new Error(Response.error || "Logout failed");
	}
	async Refresh(Token) {
		const Response = await this.Workers.Authentication.Refresh(Token);
		if (!Response.success || !Response.data) throw new Error(Response.error || "Token refresh failed");
		return Response.data;
	}
	async VerifyEmail(Token) {
		const Response = await this.Workers.Authentication.VerifyEmail(Token);
		if (!Response.success) throw new Error(Response.error || "Email verification failed");
	}
	async ResendVerification() {
		const Response = await this.Workers.Authentication.ResendVerification();
		if (!Response.success) throw new Error(Response.error || "Failed to resend verification email");
	}
	async ForgotPassword(Email) {
		const Response = await this.Workers.Authentication.ForgotPassword(Email);
		if (!Response.success || !Response.data) throw new Error(Response.error || "Password reset request failed");
		return Response.data;
	}
	async ResetPassword(Token, Password) {
		const Response = await this.Workers.Authentication.ResetPassword(Token, Password);
		if (!Response.success) throw new Error(Response.error || "Password reset failed");
	}
	async GetSession() {
		const Response = await this.Workers.Authentication.GetSession();
		if (!Response.success || !Response.data) throw new Error(Response.error || "Failed to get session");
		return Response.data;
	}
	async OAuth(Provider) {
		return await this.Workers.Authentication.OAuth(Provider);
	}
};
new AuthAPI();
// Source/Component/Dynamic/DynamicButton.tsx
/**
* Icon registry:direct imports for instant render.
* Covers all icons used in CTA buttons across the site.
*/
var ButtonIconRegistry = {
	ArrowRight: lucide.ArrowRight,
	ChevronRight: lucide.ChevronRight,
	Download: lucide.Download,
	ExternalLink: lucide.ExternalLink,
	GitFork: lucide.GitFork,
	Globe: lucide.Globe,
	Heart: lucide.Heart,
	LogIn: lucide.LogIn,
	Mail: lucide.Mail,
	Search: lucide.Search,
	Send: lucide.Send,
	Sparkles: lucide.Sparkles
};
/**
* Dynamic Button - one action, in a Jelly button.
*
* The element is Jelly's, so the surface, the padding and the press belong to it
* (`--jelly-button-padding-inline`, the host's own spring); the site states the
* one thing Jelly cannot know - the focus ring - in its own `:focus-visible` rule
* (`_Base.scss`: 2px `--Accent` at 4px). This adapter adds the label, the icon
* and the busy state, and nothing else.
*
* The three `Staccato*` hooks belong to the noise system in `_Noise.scss`, and
* this adapter does not carry them: they resolve to static values here (a 1.4s
* opacity transition with nothing to transition between), `StaccatoButton` sets
* `padding-inline: 1rem` on the host - a second padding outside Jelly's own -
* and its 0.5s `ease` hover lift is not one of the motion layer's named
* intervals. A Jelly button keeps its surface, its padding and its press.
*
* ─── THE BUSY STATE HAS NO SPINNER ────────────────────────────────────────
* The spinner argument - that a spinner may stay circular because a square
* cannot spin - is about the shape, and the shape is not the problem: a spinner
* is a LOOP, it says "something is happening" for as long as it turns and
* nothing else, and a state that never resolves is not a state. The busy arm is
* the record grammar's own - a bar whose value is not known yet, and the word
* `LOADING` beside it - drawn from the skeleton layer's two tokens so a busy
* button and a loading record are the same object at two scales. See
* `Stylesheet/System/State/_Busy.scss`.
*/
var DynamicButton = ({ Content, OnAction, IsLoading = false }) => {
	const { Text, Icon, Variant = "ghost", Size = "default", Type = "button", Disabled = false, FullWidth = false, ClassName, Href, OnClick, ...props } = Content;
	const IconComponent = Icon ? ButtonIconRegistry[Icon] || null : null;
	return /* @__PURE__ */ jsxs(Button, {
		variant: Variant,
		size: Size,
		type: Type,
		className: `${FullWidth ? "w-full" : ""} ${ClassName || ""}`,
		onClick: () => {
			if (IsLoading) return;
			if (OnAction) OnAction();
			if (OnClick) OnClick();
			if (Href) window.location.href = Href;
		},
		...props,
		disabled: Disabled,
		"aria-busy": IsLoading || void 0,
		...IsLoading ? { "aria-label": Text } : {},
		children: [
			Text,
			IsLoading ? /* @__PURE__ */ jsxs(Fragment$1, { children: [" ", /* @__PURE__ */ jsxs("span", {
				className: "StateBusy",
				children: [/* @__PURE__ */ jsx("span", {
					className: "StateBusy__Bar",
					"aria-hidden": "true"
				}), /* @__PURE__ */ jsx("span", {
					className: "StateBusy__Word",
					children: "Loading"
				})]
			})] }) : null,
			!IsLoading && IconComponent ? /* @__PURE__ */ jsxs(Fragment$1, { children: [" ", /* @__PURE__ */ jsx(IconComponent, {
				className: "h-5 w-5",
				"aria-hidden": "true"
			})] }) : null
		]
	});
};
// Source/Component/Dynamic/DynamicInput.tsx
/**
* Dynamic Input component that accepts content schema
* Composes Label + Input with proper error/helper text states
*/
var DynamicInput = ({ Content, Id: PropertyIdentifier }) => {
	const { Label: LabelText, Placeholder, Type = "text", Value, DefaultValue, Error, Disabled = false, Required = false, HelperText, ClassName, OnChange, AutoComplete, ...props } = Content;
	const AutoId = useId();
	const Identifier = PropertyIdentifier || AutoId;
	const ErrorIdentifier = `${Identifier}-error`;
	const HelperIdentifier = `${Identifier}-helper`;
	return /* @__PURE__ */ jsxs("div", {
		className: "StaccatoInput flex flex-col gap-2",
		children: [
			/* @__PURE__ */ jsx(Input, {
				id: Identifier,
				type: Type,
				placeholder: Placeholder,
				value: Value,
				defaultValue: DefaultValue,
				disabled: Disabled,
				required: Required,
				"aria-invalid": !!Error,
				"aria-describedby": Error ? ErrorIdentifier : HelperText ? HelperIdentifier : void 0,
				className: Error ? "border-destructive" : ClassName,
				...AutoComplete ? { autoComplete: AutoComplete } : {},
				onChange: (Event) => {
					if (OnChange) OnChange(Event.target.value);
					if (Content.OnChange) Content.OnChange(Event.target.value);
				},
				...props
			}),
			LabelText && /* @__PURE__ */ jsx(Label, {
				htmlFor: Identifier,
				className: "block text-muted-foreground",
				children: LabelText
			}),
			Error && /* @__PURE__ */ jsx("p", {
				id: ErrorIdentifier,
				className: "text-destructive",
				role: "alert",
				children: Error
			}),
			!Error && HelperText && /* @__PURE__ */ jsx("p", {
				id: HelperIdentifier,
				className: "text-muted-foreground",
				children: HelperText
			})
		]
	});
};
export { VerifyContent as a, AccountContent as i, DynamicButton as n, AuthAPI as r, DynamicInput as t };
