/**
 * The account and verify content tables, as data.
 *
 * Both tables used to be retyped inline in each page, and `ForgotPassword`
 * and `ResetPassword` each carried a near-copy of all four account blocks
 * (about 110 lines twice). They live here once, so a label change lands in
 * one place and the two pages cannot drift apart.
 *
 * The keys and their English defaults are carried over unchanged from the
 * pages and from `Source/Library/I18n/Locale/En/Account.json` /
 * `Verify.json`; nothing here renames a key or rewrites a sentence.
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
				"Enter your email and we'll send a secure reset link to your inbox.",
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
			defaultValue: "A password reset link has been sent to",
		}),
	},
	ResetPassword: {
		Title: T("account.resetPassword.title", {
			defaultValue: "Set a New Password",
		}),
		Description: T("account.resetPassword.subtitle", {
			defaultValue: "Enter your new password below",
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
			defaultValue: "Validating your reset link, please wait...",
		}),
		InvalidTokenMessage: T(
			"account.resetPassword.invalidToken.description",
			{
				defaultValue:
					"This password reset link has expired or was already used.",
			},
		),
		SuccessMessage: T("account.resetPassword.success.description", {
			defaultValue:
				"Your password has been reset.\n\nYou can now sign in with your new credentials.",
		}),
	},
	Footer: {},
});

/** The three verify states, shared by /Verify in both entry modes. */
export const VerifyContent = (T: Translate): VerifyContentShape => ({
	Verification: {
		Pending: {
			Title: T("verify.pending.title", {
				defaultValue: "Verify Your Email Address",
			}),
			Description: T("verify.pending.description", {
				defaultValue:
					"A verification link has been sent to your email address.\nPlease check your inbox and click the link to activate your account.\nThe link is valid for 24 hours.\nIf the email is not received within a few minutes, check the spam or promotions folder.\nFor security, do not share the verification link with anyone.",
			}),
			ResendButton: {
				Text: T("verify.pending.resendButton", {
					defaultValue: "Resend Verification Email",
				}),
				Variant: "default",
				FullWidth: true,
			},
		},
		Success: {
			Title: T("verify.success.title", {
				defaultValue: "Email verified!",
			}),
			Description: T("verify.success.description", {
				defaultValue: "Your email has been successfully verified.",
			}),
			ContinueButton: {
				Text: T("verify.success.continueButton", {
					defaultValue: "Continue to Homepage",
				}),
				Variant: "default",
				FullWidth: true,
			},
		},
		Error: {
			Title: T("verify.error.title", {
				defaultValue: "Verification failed",
			}),
			Description: T("verify.error.description", {
				defaultValue:
					"This verification link is invalid or has expired.",
			}),
			BackToSignInButton: {
				Text: T("verify.error.backToSignInButton", {
					defaultValue: "Back to Sign In",
				}),
				Variant: "default",
				FullWidth: true,
			},
		},
	},
});
