import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import { DynamicButton } from "./DynamicButton";

import { DynamicInput } from "./DynamicInput";

import type Property from "./Interface/Property/Password/Forgot.js";

/**
 * Dynamic ForgotPassword component for password reset request.
 *
 * Renders the email form, then the sent state. The page frame - the /KICKER,
 * the h1 and the supporting sentence - belongs to AuthShell; this component
 * owns the fields, the validation and the two states inside that frame.
 */
const DynamicForgotPassword = ({
	Content,
	OnSubmit,
	OnResend,
	OnNavigate,
	ClassName,
	IsLoading = false,
	ErrorMessage,
}: Property) => {
	const { t: T } = useTranslation("account");

	const { EmailField, SubmitButton, ResendButton, SuccessMessage } = Content;

	const [Email, SetEmail] = useState("");

	const [IsSubmitted, SetIsSubmitted] = useState(false);

	const [InternalError, SetInternalError] = useState("");

	const HandleSubmit = (Event: React.FormEvent) => {
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

	const SentStatus = T("auth.forgotPassword.sentStatus", {
		defaultValue: "RESET LINK SENT",
	});

	const BackToSignIn = T("account.forgotPassword.backToSignIn", {
		defaultValue: "Back to Sign In",
	});

	return (
		<>
			{!IsSubmitted ? (
				<form
					className={`auth-shell__form ${ClassName || ""}`}
					onSubmit={HandleSubmit}
					aria-label="Password reset request form"
				>
					<div aria-live="polite" aria-atomic="true">
						{(ErrorMessage || InternalError) && (
							<p className="auth-shell__error" role="alert">
								{ErrorMessage || InternalError}
							</p>
						)}
					</div>

					<div className="auth-shell__field">
						<DynamicInput
							Content={{
								...EmailField,
								OnChange: SetEmail,
							}}

							Id="email"
						/>
					</div>

					<DynamicButton
						Content={{
							...SubmitButton,
							Type: "submit",
							FullWidth: true,
							ClassName:
								"auth-shell__primary emphasis-expressive",
						}}

						IsLoading={IsLoading}
					/>
				</form>
			) : (
				<div
					className="auth-shell__report"
					role="status"
					aria-live="polite"
				>
					<p className="auth-shell__status auth-shell__status--success">
						{SentStatus}
					</p>

					<p className="auth-shell__report-sentence">
						{SuccessMessage ||
							"We've sent a password reset link to your email address."}
					</p>

					{ResendButton && (
						<>
							<p className="auth-shell__note">
								Didn't receive the email?
							</p>

							<button
								type="button"
								className="auth-shell__primary emphasis-expressive"
								onClick={() => OnResend?.()}
							>
								{ResendButton.Text}
							</button>
						</>
					)}

					<button
						type="button"
						className="auth-shell__alternate"
						onClick={() => OnNavigate?.("/Account/SignIn")}
					>
						{BackToSignIn}
					</button>
				</div>
			)}
		</>
	);
};

export { DynamicForgotPassword };

export default DynamicForgotPassword;
