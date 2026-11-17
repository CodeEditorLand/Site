import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { DynamicButton } from "./DynamicButton";

import { DynamicInput } from "./DynamicInput";

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
 * The page frame belongs to AuthShell; this component owns the token check,
 * the two fields, the validation and the four states inside that frame.
 */
const DynamicResetPassword = ({
	Content,
	Token: PropToken,
	OnReset,
	OnNavigate,
	ClassName,
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

	const CheckingStatus = T("auth.resetPassword.checkingStatus", {
		defaultValue: "CHECKING LINK",
	});

	const ExpiredStatus = T("auth.resetPassword.expiredStatus", {
		defaultValue: "LINK EXPIRED",
	});

	const UpdatedStatus = T("auth.resetPassword.updatedStatus", {
		defaultValue: "PASSWORD UPDATED",
	});

	const BackToSignIn = T("account.forgotPassword.backToSignIn", {
		defaultValue: "Back to Sign In",
	});

	const GoToSignIn = T("account.resetPassword.success.button", {
		defaultValue: "Sign In",
	});

	if (State === "checking") {
		return (
			<div
				className={`auth-shell__report ${ClassName || ""}`}
				aria-live="polite"
			>
				<p className="auth-shell__status">{CheckingStatus}</p>

				<p className="auth-shell__report-sentence">
					{CheckingMessage || "Validating reset token..."}
				</p>
			</div>
		);
	}

	if (State === "invalid") {
		return (
			<div
				className={`auth-shell__report ${ClassName || ""}`}
				role="alert"
			>
				<p className="auth-shell__status auth-shell__status--failure">
					{ExpiredStatus}
				</p>

				<p className="auth-shell__report-sentence">
					{InvalidTokenMessage ||
						"This password reset link is invalid or has expired. Please request a new one."}
				</p>

				<button
					type="button"
					className="auth-shell__primary emphasis-expressive"
					onClick={() => OnNavigate?.("/Account/SignIn")}
				>
					{BackToSignIn}
				</button>
			</div>
		);
	}

	if (State === "success") {
		return (
			<div
				className={`auth-shell__report ${ClassName || ""}`}
				role="status"
				aria-live="polite"
			>
				<p className="auth-shell__status auth-shell__status--success">
					{UpdatedStatus}
				</p>

				<p className="auth-shell__report-sentence">
					{SuccessMessage ||
						"Your password has been reset successfully. You can now sign in with your new password."}
				</p>

				<button
					type="button"
					className="auth-shell__primary emphasis-expressive"
					onClick={() => OnNavigate?.("/Account/SignIn")}
				>
					{GoToSignIn}
				</button>
			</div>
		);
	}

	// Valid state - show form
	return (
		<form
			className={`auth-shell__form ${ClassName || ""}`}
			onSubmit={HandleSubmit}
			aria-label="Reset password form"
		>
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
					FullWidth: true,
					ClassName: "auth-shell__primary emphasis-expressive",
				}}
				IsLoading={IsLoading}
			/>
		</form>
	);
};

export { DynamicResetPassword };

export default DynamicResetPassword;
