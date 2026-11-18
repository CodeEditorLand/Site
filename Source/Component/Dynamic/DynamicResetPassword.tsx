import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { AuthReport } from "../Auth/Report";

import { StateBadge } from "../Surface/StateBadge";

import { DynamicButton } from "./DynamicButton";

import { DynamicInput } from "./DynamicInput";

import { StateLabel } from "./DynamicStateReport";

import type Property from "./Interface/Property/Password/Reset.js";

import type { default as ResetState } from "./Type/State/Reset.js";

import {
	StrengthFill,
	StrengthOf,
	StrengthSegments,
} from "./Password/Strength.js";

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
const DynamicResetPassword = ({
	Content,
	Token: PropToken,
	OnReset,
	OnNavigate,
	IsLoading = false,
	ErrorMessage,
}: Property) => {
	const { t: T } = useTranslation("account");

	const {
		PasswordField,

		ConfirmPasswordField,

		SubmitButton,

		SuccessMessage,

		InvalidTokenMessage,

		CheckingMessage,
	} = Content;

	const [State, SetState] = useState<ResetState>("checking");

	const [Token, SetToken] = useState<string>(PropToken || "");

	const [Password, SetPassword] = useState("");

	const [ConfirmPassword, SetConfirmPassword] = useState("");

	const [ShowPassword, SetShowPassword] = useState(false);

	const [ShowConfirmPassword, SetShowConfirmPassword] = useState(false);

	const [Errors, SetErrors] = useState<{
		password?: string;

		confirmPassword?: string;
	}>({});

	// Simulate token validation (would be API call in real implementation)
	useEffect(() => {
		const TokenFromUrl =
			PropToken ||
			new URLSearchParams(window.location.search).get("token");

		if (!TokenFromUrl) {
			SetState("invalid");

			return;
		}

		// Simulate API call to validate token
		const ValidateToken = async () => {
			await new Promise((Resolve) => setTimeout(Resolve, 1000)); // Simulate delay

			// In real implementation, call `/api/auth/verify-reset-token?token=${token}`
			SetToken(TokenFromUrl);

			SetState("valid"); // Assume valid for now
		};

		ValidateToken();
	}, [PropToken]);

	const Validate = () => {
		const NewErrors: typeof Errors = {};

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

	const HandleSubmit = (Event: React.FormEvent) => {
		Event.preventDefault();

		if (Validate() && Token) {
			OnReset?.(Token, Password, ConfirmPassword);

			SetState("success");
		}
	};

	const Tone = StrengthOf(Password);

	const Filled = StrengthFill[Tone];

	const BackToSignIn = T("account.forgotPassword.backToSignIn", {
		defaultValue: "Back to Sign In",
	});

	const GoToSignIn = T("account.resetPassword.success.button", {
		defaultValue: "Sign In",
	});

	if (State === "checking") {
		return (
			<div className="p-6 pt-6">
				<div className="space-y-4" aria-live="polite">
					<div className="auth-shell__status flex justify-center">
						<StateBadge
							Label={T("auth.resetPassword.checkingStatus", {
								defaultValue: StateLabel.Loading,
							})}
						/>
					</div>

					<div
						className="mx-auto h-8 w-8 animate-spin rounded-none border-4 border-primary border-t-transparent"
						aria-hidden="true"
					></div>

					<p className="text-muted-foreground" role="status">
						{CheckingMessage ||
							"Validating your reset link, please wait..."}
					</p>
				</div>
			</div>
		);
	}

	if (State === "invalid") {
		return (
			<AuthReport
				State={T("auth.resetPassword.expiredStatus", {
					defaultValue: StateLabel.Unavailable,
				})}
				Title={T("account.resetPassword.invalidToken.title", {
					defaultValue: "Link Expired or Invalid",
				})}
				Sentence={
					InvalidTokenMessage ||
					"This password reset link is invalid or has expired. Please request a new one."
				}
				Glyph="alert"
				Role="alert"
			>
				<DynamicButton
					Content={{
						Text: BackToSignIn,
						Variant: "default",
						ClassName: "auth-shell__primary",
					}}
					OnAction={() => OnNavigate?.("/Account/SignIn")}
				/>
			</AuthReport>
		);
	}

	if (State === "success") {
		return (
			<AuthReport
				State={T("auth.resetPassword.updatedStatus", {
					defaultValue: StateLabel.Ready,
				})}
				Title={T("account.resetPassword.success.title", {
					defaultValue: "Password updated",
				})}
				Sentence={
					SuccessMessage ||
					"Your password has been reset successfully. You can now sign in with your new password."
				}
				Glyph="check"
				Role="status"
			>
				<DynamicButton
					Content={{
						Text: GoToSignIn,
						Variant: "default",
						ClassName: "auth-shell__primary",
					}}
					OnAction={() => OnNavigate?.("/Account/SignIn")}
				/>
			</AuthReport>
		);
	}

	// Valid state - show form
	return (
		<form
			className="space-y-4 p-6"
			onSubmit={HandleSubmit}
			aria-label="Reset password form"
		>
			<div className="flex flex-col space-y-1 text-center">
				<h3 className="type-heading">{Content.Title}</h3>

				<p className="text-sm text-card-foreground opacity-70">
					{Content.Description}
				</p>
			</div>

			<div aria-live="polite" aria-atomic="true">
				{ErrorMessage && (
					<p className="auth-shell__error" role="alert">
						{ErrorMessage}
					</p>
				)}
			</div>

			<div className="auth-shell__field">
				<DynamicInput
					Content={{
						...PasswordField,
						Type: ShowPassword ? "text" : "password",
						OnChange: SetPassword,
						AutoComplete: "new-password",
						Error: Errors.password,
					}}
					Id="password"
				/>

				<button
					type="button"
					className="auth-shell__reveal"
					onClick={() => SetShowPassword(!ShowPassword)}
				>
					{ShowPassword ? "Hide password" : "Show password"}
				</button>
			</div>

			{Password && (
				<div
					className="auth-shell__strength"
					role="status"
					aria-label={
						Tone === "strong" || Tone === "medium"
							? "Strong password"
							: "Weak password"
					}
				>
					{StrengthSegments.map((Segment) => (
						<span
							key={Segment}

							className={[
								"auth-shell__strength-segment",
								Segment < Filled
									? `auth-shell__strength-segment--${Tone}`
									: "",
							]
								.filter(Boolean)
								.join(" ")}
						/>
					))}
				</div>
			)}

			<div className="auth-shell__field">
				<DynamicInput
					Content={{
						...ConfirmPasswordField,
						Type: ShowConfirmPassword ? "text" : "password",
						OnChange: SetConfirmPassword,
						AutoComplete: "new-password",
						Error: Errors.confirmPassword,
					}}
					Id="confirmPassword"
				/>

				<button
					type="button"
					className="auth-shell__reveal"
					onClick={() => SetShowConfirmPassword(!ShowConfirmPassword)}
				>
					{ShowConfirmPassword
						? "Hide confirm password"
						: "Show confirm password"}
				</button>
			</div>

			<DynamicButton
				Content={{
					...SubmitButton,
					Type: "submit",
					Variant: "default",
					FullWidth: true,
					ClassName: "auth-shell__primary",
				}}
				IsLoading={IsLoading}
			/>
		</form>
	);
};

export { DynamicResetPassword };

export default DynamicResetPassword;
