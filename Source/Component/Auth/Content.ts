/**
 * The account and verify content tables, as data.
 *
 * Both tables live here once rather than in each page, so a label change lands
 * in one place and the pages cannot drift apart.
 *
 * ─── THE SENTENCES SAY WHAT HAPPENS, HOW LONG IT LASTS, WHAT TO DO NEXT ───
 * These are the four surfaces where a reader is most likely to be stuck, and
 * the site's voice is identify, direct, measure, classify, credit - not product
 * English. So each string states the fact and its limit rather than reassuring:
 *
 * - a reset link opens for one hour and works once (`Account.json`'s own window);
 * - a verification link opens for 24 hours and is a credential, so it is not
 *   forwarded;
 * - a password that changes makes the old one stop working, which is the fact a
 *   reader actually wants after the success screen.
 *
 * No fact is dropped and no label is renamed. The labels stay labels.
 */
import type AccountContentShape from "../Dynamic/Interface/Content/Page/Account.js";

import type VerifyContentShape from "../Dynamic/Interface/Content/Page/Verify.js";

import type { Translate } from "./Type.js";

/** The four account forms, shared by /Account/ForgotPassword and /Account/ResetPassword. */
export const AccountContent = (T: Translate): AccountContentShape => ({
	SignIn: {
		Title: T("common.button.signIn", {
			defaultValue: "Sign In to Your Account",
		}),
		Description: "",
		EmailField: {
			Label: T("common.label.email", { defaultValue: "Email Address" }),
		},
		PasswordField: {
			Label: T("common.label.password", { defaultValue: "Password" }),
		},
		SubmitButton: {
			Text: T("common.button.signIn", {
				defaultValue: "Sign In to Your Account",
			}),
		},
	},
	SignUp: {
		Title: T("account.signUp.title", { defaultValue: "Create Account" }),
		Description: "",
		EmailField: {
			Label: T("common.label.email", { defaultValue: "Email Address" }),
		},
		PasswordField: {
			Label: T("common.label.password", { defaultValue: "Password" }),
		},
		ConfirmPasswordField: {
			Label: T("account.signUp.confirmPasswordLabel", {
				defaultValue: "Confirm Password",
			}),
		},
		TermsCheckbox: {
			Label: T("account.signUp.termsLabel", {
				defaultValue:
					"I agree to the Terms of Service and Privacy Policy",
			}),
		},
		SubmitButton: {
			Text: T("common.button.signUp", {
				defaultValue: "Create Account",
			}),
		},
	},
	ForgotPassword: {
		Title: T("account.forgotPassword.title", {
			defaultValue: "Reset Your Password",
		}),
		Description: T("account.forgotPassword.subtitle", {
			defaultValue:
				"One address. The provider sends a reset link to it, and the link opens for one hour.",
		}),
		EmailField: {
			Label: T("common.label.email", { defaultValue: "Email Address" }),
			Placeholder: T("account.forgotPassword.emailPlaceholder", {
				defaultValue: "name@example.com",
			}),
			Type: "email",
			Required: true,
		},
		SubmitButton: {
			Text: T("account.forgotPassword.submit", {
				defaultValue: "Send Reset Link",
			}),
			Variant: "default",
			FullWidth: true,
		},
		SuccessMessage: T("account.forgotPassword.success.subtitle", {
			defaultValue: "A reset link was sent to",
		}),
	},
	ResetPassword: {
		Title: T("account.resetPassword.title", {
			defaultValue: "Set a New Password",
		}),
		Description: T("account.resetPassword.subtitle", {
			defaultValue:
				"The new password replaces the old one at the provider. Eight characters is the floor.",
		}),
		PasswordField: {
			Label: T("account.resetPassword.passwordLabel", {
				defaultValue: "New Password",
			}),
			Placeholder: T("account.resetPassword.passwordPlaceholder", {
				defaultValue: "Enter a strong new password",
			}),
			Type: "password",
			Required: true,
		},
		ConfirmPasswordField: {
			Label: T("account.resetPassword.confirmLabel", {
				defaultValue: "Confirm New Password",
			}),
			Placeholder: T("account.resetPassword.confirmPlaceholder", {
				defaultValue: "Re-enter your new password exactly as above",
			}),
			Type: "password",
			Required: true,
		},
		SubmitButton: {
			Text: T("account.resetPassword.submit", {
				defaultValue: "Set New Password",
			}),
			Variant: "default",
			FullWidth: true,
		},
		CheckingMessage: T("account.resetPassword.checkingMessage", {
			defaultValue: "Reading the reset token from the address.",
		}),
		InvalidTokenMessage: T(
			"account.resetPassword.invalidToken.description",

			{
				defaultValue:
					"The reset link has expired or was already used. A link works once and closes after one hour.",
			},
		),
		SuccessMessage: T("account.resetPassword.success.description", {
			defaultValue:
				"The password is changed.\n\nThe old one no longer opens the account; sign in with the new one.",
		}),
	},
	Footer: {},
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
export const VerifyContent = (T: Translate): VerifyContentShape => ({
	Verification: {
		Pending: {
			Title: T("verify:pending.title", {
				defaultValue: "Check The Inbox",
			}),
			Description: T("verify:pending.description", {
				defaultValue:
					"A link was sent to the address on the account. It opens for 24 hours and works once.\n\nIf nothing arrives in a few minutes, the spam folder is the next place to look.\n\nThe link is a credential: anyone who opens it verifies the address.",
			}),
			ResendButton: {
				Text: T("verify:pending.resendButton", {
					defaultValue: "Send A New Link",
				}),
				Variant: "default",
				FullWidth: true,
			},
		},
		Verifying: {
			Title: T("verify:verifying.title", {
				defaultValue: "Verifying your email",
			}),
			Description: T("verify:verifying.description", {
				defaultValue: "Checking the email address with the provider.",
			}),
		},
		Success: {
			Title: T("verify:success.title", {
				defaultValue: "Email Verified",
			}),
			Description: T("verify:success.description", {
				defaultValue:
					"The address on the account is verified. Signing in is the last step before the workspace opens.",
			}),
			ContinueButton: {
				Text: T("verify:success.continueButton", {
					defaultValue: "BACK TO LAND",
				}),
				Variant: "default",
				FullWidth: true,
			},
		},
		Error: {
			Title: T("verify:error.title", {
				defaultValue: "Verification Interrupted",
			}),
			Description: T("verify:error.description", {
				defaultValue:
					"The link carried no token the provider recognises, or the token's window has closed. A new link is the only way forward.",
			}),
			BackToSignInButton: {
				Text: T("verify:error.backToSignInButton", {
					defaultValue: "SIGN IN",
				}),
				Variant: "default",
				FullWidth: true,
			},
		},
	},
});
