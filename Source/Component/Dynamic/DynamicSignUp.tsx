import React, { useState } from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../UI/Card";
import { DynamicButton } from "./DynamicButton";
import { DynamicCheckbox } from "./DynamicCheckbox";
import { DynamicInput } from "./DynamicInput";
import type Property from "./Interface/Property/SignUp.js";

/**
 * Dynamic SignUp component that accepts registration form schema
 * Renders email, password, confirm password, terms checkbox, social OAuth
 */
export function DynamicSignUp({
	content,
	onSubmit,
	onOAuth,
	onNavigate,
	className,
	isLoading = false,
	errorMessage,
}: Property) {
	const {
		title,
		description,
		emailField,
		passwordField,
		confirmPasswordField,
		termsCheckbox,
		submitButton,
		oauthButtons = [],
		showDivider = true,
		footerLinks,
	} = content;

	const [Email, SetEmail] = useState("");
	const [Password, SetPassword] = useState("");
	const [ConfirmPassword, SetConfirmPassword] = useState("");
	const [TermsAccepted, SetTermsAccepted] = useState(false);
	const [Errors, SetErrors] = useState<{
		email?: string;
		password?: string;
		confirmPassword?: string;
		terms?: string;
	}>({});

	const Validate = () => {
		const NewErrors: typeof Errors = {};

		if (!Email) {
			NewErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(Email)) {
			NewErrors.email = "Please enter a valid email";
		}

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

		if (!TermsAccepted) {
			NewErrors.terms = "You must accept the terms and conditions";
		}

		SetErrors(NewErrors);
		return Object.keys(NewErrors).length === 0;
	};

	const HandleSubmit = (Event: React.FormEvent) => {
		Event.preventDefault();
		if (Validate()) {
			onSubmit?.(Email, Password, ConfirmPassword, TermsAccepted);
		}
	};

	const OAuthProviderList = [
		{ name: "GitHub", icon: "Github" },
		{ name: "Google", icon: "Chrome" },
		{ name: "GitLab", icon: "Gitlab" },
	];

	return (
		<section className="py-20" aria-label="Sign up">
			<div className="container mx-auto px-4">
				<div className={`mx-auto max-w-md ${className}`}>
					<Card>
						<CardHeader className="space-y-1 text-center">
							<CardTitle className="text-2xl">{title}</CardTitle>
							<CardDescription>{description}</CardDescription>
						</CardHeader>
						<CardContent>
							<form
								className="space-y-4"
								onSubmit={HandleSubmit}
								aria-label="Sign up form">
								<div aria-live="polite" aria-atomic="true">
									{errorMessage && (
										<div
											className="bg-destructive/10 rounded-none p-3 text-sm text-destructive"
											role="alert">
											{errorMessage}
										</div>
									)}
								</div>

								<DynamicInput
									content={{
										...emailField,
										onChange: SetEmail,
									}}
									id="email"
								/>

								<DynamicInput
									content={{
										...passwordField,
										type: "password",
										onChange: SetPassword,
									}}
									id="password"
								/>

								<DynamicInput
									content={{
										...confirmPasswordField,
										type: "password",
										onChange: SetConfirmPassword,
									}}
									id="confirmPassword"
								/>

								<DynamicCheckbox
									content={{
										...termsCheckbox,
										checked: TermsAccepted,
										onChange: SetTermsAccepted,
									}}
								/>

								<DynamicButton
									content={{
										...submitButton,
										type: "submit",
										fullWidth: true,
									}}
									isLoading={isLoading}
								/>
							</form>

							{showDivider && oauthButtons.length > 0 && (
								<div className="relative my-6">
									<div className="absolute inset-0 flex items-center">
										<span className="w-full border-t" />
									</div>
									<div className="relative flex justify-center text-xs uppercase">
										<span className="bg-background px-2 text-muted-foreground">
											{"Or"}
										</span>
									</div>
								</div>
							)}

							{oauthButtons.length > 0 && (
								<div className="space-y-3">
									{oauthButtons.map((Button, Index) => (
										<DynamicButton
											key={Index}
											content={{
												...Button,
												fullWidth: true,
											}}
											onAction={() =>
												onOAuth?.(Button.icon as string)
											}
										/>
									))}
								</div>
							)}
						</CardContent>
						<CardFooter className="flex flex-col gap-4 text-center text-sm">
							{footerLinks?.signIn && (
								<p>
									{"Already have an account?"}{" "}
									<button
										type="button"
										className="font-medium text-primary hover:underline"
										onClick={() =>
											footerLinks.signIn &&
											onNavigate?.(
												footerLinks.signIn.href,
											)
										}>
										{footerLinks.signIn.label}
									</button>
								</p>
							)}
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}
