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
 * colours from the shell partial's tone modifier classes - the previous
 * version wrote `#16a34a`, `#ca8a04` and `#e5e7eb` into a `style` attribute,
 * which is a literal colour on the one surface that is supposed to have none.
 *
 * Behaviour is unchanged: the same fields, the same validation predicates and
 * messages, the same submit gate, the same OAuth hand-off, the same footer
 * destination. The email and terms errors are now rendered (they were computed
 * and then dropped), so every failing branch says what failed in a sentence.
 */
import * as lucide from "lucide-react";

import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import { DynamicButton } from "./DynamicButton";

import { DynamicCheckbox } from "./DynamicCheckbox";

import { DynamicInput } from "./DynamicInput";

import type Property from "./Interface/Property/SignUp.js";

import {
	StrengthFill,
	StrengthOf,
	StrengthSegments,
} from "./Password/Strength.js";

/** The one place this form's validation messages are written. */
const Messages = {
	emailRequired: "Email is required",

	emailInvalid: "Please enter a valid email",

	passwordRequired: "Password is required",

	passwordShort: "Password must be at least 8 characters",

	confirmRequired: "Please confirm your password",

	confirmMismatch: "Passwords do not match",

	termsRequired: "You must accept the terms and conditions",
} as const;

/**
 * Dynamic SignUp component that accepts registration form schema
 * Renders email, password, confirm password, terms checkbox, social OAuth
 */
const DynamicSignUp = ({
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

		ConfirmPasswordField,

		TermsCheckbox,

		SubmitButton,

		OauthButtons = [],

		ShowDivider = true,

		FooterLinks,
	} = Content;

	const [Email, SetEmail] = useState("");

	const [Password, SetPassword] = useState("");

	const [ConfirmPassword, SetConfirmPassword] = useState("");

	const [ShowPassword, SetShowPassword] = useState(false);

	const [TermsAccepted, SetTermsAccepted] = useState(false);

	const { t: T } = useTranslation("account");

	const [Errors, SetErrors] = useState<{
		email?: string;

		password?: string;

		confirmPassword?: string;

		terms?: string;
	}>({});

	const Validate = () => {
		const NewErrors: typeof Errors = {};

		if (!Email) {
			NewErrors.email = Messages.emailRequired;
		} else if (!/\S+@\S+\.\S+/.test(Email)) {
			NewErrors.email = Messages.emailInvalid;
		}

		if (!Password) {
			NewErrors.password = Messages.passwordRequired;
		} else if (Password.length < 8) {
			NewErrors.password = Messages.passwordShort;
		}

		if (!ConfirmPassword) {
			NewErrors.confirmPassword = Messages.confirmRequired;
		} else if (Password !== ConfirmPassword) {
			NewErrors.confirmPassword = Messages.confirmMismatch;
		}

		if (!TermsAccepted) {
			NewErrors.terms = Messages.termsRequired;
		}

		SetErrors(NewErrors);

		return Object.keys(NewErrors).length === 0;
	};

	const HandleSubmit = (Event: React.FormEvent) => {
		Event.preventDefault();

		if (Validate()) {
			OnSubmit?.(Email, Password, ConfirmPassword, TermsAccepted);
		}
	};

	const Tone = StrengthOf(Password);

	const Filled = StrengthFill[Tone];

	return (
		<form
			className={`auth-shell__form ${ClassName || ""}`}
			onSubmit={HandleSubmit}
			aria-label="Sign up form"
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
						AutoComplete: "new-password",
						...(Errors.password ? { Error: Errors.password } : {}),
					}}
					Id="password"
				/>

				<button
					type="button"
					className="auth-shell__reveal"
					aria-label={
						ShowPassword
							? T("signUp.hidePassword", {
									defaultValue: "Hide password",
								})
							: T("signUp.showPassword", {
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

				{Password && (
					<div
						className="auth-shell__strength"
						role="status"
						aria-label={
							Tone === "strong"
								? T("signUp.passwordStrength.strong", {
										defaultValue: "Strong password",
									})
								: T("signUp.passwordStrength.weak", {
										defaultValue: "Weak password",
									})
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
			</div>

			<div className="auth-shell__field">
				<DynamicInput
					Content={{
						...ConfirmPasswordField,
						Type: "password",
						OnChange: SetConfirmPassword,
						AutoComplete: "new-password",
						...(Errors.confirmPassword
							? { Error: Errors.confirmPassword }
							: {}),
					}}
					Id="confirmPassword"
				/>
			</div>

			<div className="auth-shell__terms">
				<DynamicCheckbox
					Content={{
						...TermsCheckbox,
						Checked: TermsAccepted,
						OnChange: SetTermsAccepted,
					}}
				/>

				{Errors.terms && (
					<p className="auth-shell__error" role="alert">
						{Errors.terms}
					</p>
				)}
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

			{ShowDivider && OauthButtons.length > 0 && (
				<p className="auth-shell__divider">{"Or"}</p>
			)}

			{OauthButtons.length > 0 && (
				<div className="auth-shell__oauth">
					{OauthButtons.map((ButtonItem, Index) => (
						<DynamicButton
							key={Index}
							Content={{
								...ButtonItem,
								FullWidth: true,
							}}
							OnAction={() =>
								OnOAuth?.(ButtonItem.Icon as string)
							}
						/>
					))}
				</div>
			)}

			{FooterLinks?.SignIn && (
				<div className="auth-shell__footer">
					<div className="auth-shell__footer-row">
						<button
							type="button"
							className="auth-shell__alternate"
							onClick={() =>
								FooterLinks.SignIn &&
								OnNavigate?.(FooterLinks.SignIn.Href)
							}
						>
							{FooterLinks.SignIn.Label}
						</button>

						<p className="auth-shell__note">
							Already have an account?
						</p>
					</div>
				</div>
			)}
		</form>
	);
};

export { DynamicSignUp };

export default DynamicSignUp;
