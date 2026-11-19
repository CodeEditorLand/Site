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
import * as lucide from "lucide-react";

import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import { DynamicButton } from "./DynamicButton";

import { DynamicInput } from "./DynamicInput";

import type Property from "./Interface/Property/SignIn.js";

/** The one place this form's validation messages are written. */
const Messages = {
	emailRequired: "Email is required",

	emailInvalid: "Please enter a valid email",

	passwordRequired: "Password is required",
} as const;

/**
 * Dynamic SignIn component that accepts form schema
 * Renders email/password form with optional OAuth and footer links
 */
const DynamicSignIn = ({
	Content,
	OnSubmit,
	OnOAuth,
	OnNavigate,
	ClassName,
	IsLoading = false,
	ErrorMessage,
}: Property) => {
	const {
		Title,

		Description,

		EmailField,

		PasswordField,

		SubmitButton,

		OauthButton,

		ShowDivider = true,

		FooterLinks,
	} = Content;

	const [Email, SetEmail] = useState("");

	const [Password, SetPassword] = useState("");

	const [ShowPassword, SetShowPassword] = useState(false);

	const [Errors, SetErrors] = useState<{ email?: string; password?: string }>(
		{},
	);

	const { t: T } = useTranslation("account");

	const Validate = () => {
		const NewErrors: { email?: string; password?: string } = {};

		if (!Email) {
			NewErrors.email = Messages.emailRequired;
		} else if (!/\S+@\S+\.\S+/.test(Email)) {
			NewErrors.email = Messages.emailInvalid;
		}

		if (!Password) {
			NewErrors.password = Messages.passwordRequired;
		}

		SetErrors(NewErrors);

		return Object.keys(NewErrors).length === 0;
	};

	const HandleSubmit = (Event: React.FormEvent) => {
		Event.preventDefault();

		if (!IsLoading && Validate()) {
			OnSubmit?.(Email, Password);
		}
	};

	return (
		<form
			className={`auth-shell__form ${ClassName || ""}`}
			onSubmit={HandleSubmit}
			aria-label="Sign in form"
		>
			{Title && <p className="auth-shell__note">{Title}</p>}

			{Description && (
				<p className="auth-shell__report-sentence">{Description}</p>
			)}

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
						...EmailField,
						OnChange: SetEmail,
						...(Errors.email ? { Error: Errors.email } : {}),
					}}
					Id="email"
				/>
			</div>

			<div className="auth-shell__field">
				<DynamicInput
					Content={{
						...PasswordField,
						Type: ShowPassword ? "text" : "password",
						OnChange: SetPassword,
						...(Errors.password ? { Error: Errors.password } : {}),
					}}
					Id="password"
				/>

				<button
					type="button"
					className="auth-shell__reveal"
					aria-label={
						ShowPassword
							? T("signIn.hidePassword", {
									defaultValue: "Hide password",
								})
							: T("signIn.showPassword", {
									defaultValue: "Show password",
								})
					}
					onClick={() => SetShowPassword(!ShowPassword)}
				>
					{ShowPassword ? (
						<lucide.EyeOff aria-hidden="true" />
					) : (
						<lucide.Eye aria-hidden="true" />
					)}
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

			{ShowDivider && <p className="auth-shell__divider">{"Or"}</p>}

			{OauthButton && (
				<DynamicButton
					Content={{
						...OauthButton,
						FullWidth: true,
					}}

					{...(OnOAuth ? { OnAction: OnOAuth } : {})}
				/>
			)}

			{(FooterLinks?.SignUp || FooterLinks?.ForgotPassword) && (
				<div className="auth-shell__footer">
					{FooterLinks?.SignUp && (
						<div className="auth-shell__footer-row">
							<button
								type="button"
								className="auth-shell__alternate"
								onClick={() =>
									FooterLinks.SignUp &&
									OnNavigate?.(FooterLinks.SignUp.Href)
								}
							>
								{FooterLinks.SignUp.Label}
							</button>

							<p className="auth-shell__note">
								Don't have an account?
							</p>
						</div>
					)}

					{FooterLinks?.ForgotPassword && (
						<div className="auth-shell__footer-row">
							<button
								type="button"
								className="auth-shell__alternate"
								onClick={() =>
									FooterLinks.ForgotPassword &&
									OnNavigate?.(
										FooterLinks.ForgotPassword.Href,
									)
								}
							>
								{FooterLinks.ForgotPassword.Label}
							</button>

							<p className="auth-shell__note">
								Forgot your password?
							</p>
						</div>
					)}
				</div>
			)}
		</form>
	);
};

export { DynamicSignIn };

export default DynamicSignIn;
