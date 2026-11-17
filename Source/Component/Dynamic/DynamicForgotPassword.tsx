import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import { DynamicButton } from "./DynamicButton";

import { DynamicInput } from "./DynamicInput";

import type Property from "./Interface/Property/Password/Forgot.js";

/**
 * Dynamic ForgotPassword component for password reset request.
 *
 * Renders the baseline's card: the `Reset Your Password` heading and its one
 * supporting sentence over the email form, then the sent state in the same
 * card. The card itself belongs to the route's `AuthShell`; this component
 * owns the interior - the fields, the validation and the two states.
 */
const DynamicForgotPassword = ({
	Content,
	OnSubmit,
	OnResend,
	OnNavigate,
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

	const BackToSignIn = T("account.forgotPassword.backToSignIn", {
		defaultValue: "Back to Sign In",
	});

	return (
		<>
			<div className="flex flex-col space-y-1 p-6 text-center">
				<h2 className="font-mono text-2xl font-medium tracking-tight">
					{Content.Title}
				</h2>

				<p className="text-card-foreground text-sm opacity-70">
					{Content.Description}
				</p>
			</div>

			{!IsSubmitted ? (
				<div className="p-6 pt-0">
					<form
						className="space-y-4"
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

						<DynamicInput
							Content={{
								...EmailField,
								OnChange: SetEmail,
							}}

							Id="email"
						/>

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
				</div>
			) : (
				<div
					className="space-y-4 p-6 pt-0"
					role="status"
					aria-live="polite"
				>
					<p className="auth-shell__report-sentence">
						{SuccessMessage ||
							"We've sent a password reset link to your email address."}
					</p>

					{ResendButton && (
						<>
							<p className="auth-shell__note">
								Didn't receive the email?
							</p>

							<DynamicButton
								Content={{
									Text: ResendButton.Text,
									Variant: "default",
									ClassName: "auth-shell__primary",
								}}
								OnAction={() => OnResend?.()}
							/>
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
