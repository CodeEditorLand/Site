/**
 * The eight frames, as data.
 *
 * A page composes `AuthFrameFor(Surface, T)` and hands the result to
 * `AuthShell.astro`; no page retypes a kicker, a heading or an alternate
 * action inline. English copy lives both here (the `defaultValue`) and in
 * `Source/Library/I18n/Locale/En/Account.json` under `auth.*` - change both
 * or the JSON silently overrides the call site (BRIDGE 8.6).
 *
 * The kicker grammar is the site's own `/SECTION LABEL` form; the heading is
 * the surface name as a sentence, because a reader under stress reads a
 * sentence faster than a noun.
 */
import type { AuthFrame, AuthSurface, Translate } from "./Type.js";

const Frames: Record<AuthSurface, (T: Translate) => AuthFrame> = {
	account: (T) => ({
		kicker: T("auth.account.kicker", { defaultValue: "/ACCOUNT" }),
		heading: T("auth.account.heading", { defaultValue: "Your account" }),
		sentence: T("auth.account.sentence", {
			defaultValue:
				"Profile fields, session controls and the editor connection for this workspace.",
		}),
		action: {
			label: T("auth.account.action", { defaultValue: "Back to the editor" }),
			href: "/",
		},
	}),

	signIn: (T) => ({
		kicker: T("auth.signIn.kicker", { defaultValue: "/SIGN IN" }),
		heading: T("auth.signIn.heading", { defaultValue: "Sign in" }),
		sentence: T("auth.signIn.sentence", {
			defaultValue: "Sign in to your Land workspace.",
		}),
		action: {
			label: T("auth.signIn.action", {
				defaultValue: "Create an account",
			}),
			href: "/Account/SignUp",
		},
	}),

	signUp: (T) => ({
		kicker: T("auth.signUp.kicker", { defaultValue: "/CREATE ACCOUNT" }),
		heading: T("auth.signUp.heading", {
			defaultValue: "Create an account",
		}),
		sentence: T("auth.signUp.sentence", {
			defaultValue:
				"Account creation is not open yet while the portal flow is being finished.",
		}),
		action: {
			label: T("auth.signUp.action", { defaultValue: "Sign in" }),
			href: "/Account/SignIn",
		},
	}),

	forgotPassword: (T) => ({
		kicker: T("auth.forgotPassword.kicker", {
			defaultValue: "/FORGOT PASSWORD",
		}),
		heading: T("auth.forgotPassword.heading", {
			defaultValue: "Reset your password",
		}),
		sentence: T("auth.forgotPassword.sentence", {
			defaultValue:
				"Enter your email and we'll send a secure reset link to your inbox.",
		}),
		action: {
			label: T("auth.forgotPassword.action", {
				defaultValue: "Back to sign in",
			}),
			href: "/Account/SignIn",
		},
	}),

	resetPassword: (T) => ({
		kicker: T("auth.resetPassword.kicker", {
			defaultValue: "/RESET PASSWORD",
		}),
		heading: T("auth.resetPassword.heading", {
			defaultValue: "Set a new password",
		}),
		sentence: T("auth.resetPassword.sentence", {
			defaultValue: "Enter your new password below.",
		}),
		action: {
			label: T("auth.resetPassword.action", {
				defaultValue: "Back to sign in",
			}),
			href: "/Account/SignIn",
		},
	}),

	oauthSuccess: (T) => ({
		kicker: T("auth.oauthSuccess.kicker", { defaultValue: "/OAUTH CALLBACK" }),
		heading: T("auth.oauthSuccess.heading", {
			defaultValue: "Sign-in result",
		}),
		sentence: T("auth.oauthSuccess.sentence", {
			defaultValue:
				"This page reports what the identity provider returned for your sign-in attempt.",
		}),
	}),

	verify: (T) => ({
		kicker: T("auth.verify.kicker", { defaultValue: "/VERIFY" }),
		heading: T("auth.verify.heading", {
			defaultValue: "Verify your email",
		}),
		sentence: T("auth.verify.sentence", {
			defaultValue:
				"Email verification protects the account and the workspace it can reach.",
		}),
		action: {
			label: T("auth.verify.action", { defaultValue: "Back to sign in" }),
			href: "/Account/SignIn",
		},
	}),
};

/** The frame for one surface. Total over `AuthSurface`, so no page branches. */
export const AuthFrameFor = (Surface: AuthSurface, T: Translate): AuthFrame =>
	Frames[Surface](T);
