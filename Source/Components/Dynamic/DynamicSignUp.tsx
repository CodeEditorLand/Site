import React, { useState } from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { DynamicButton } from "./DynamicButton";
import { DynamicCheckbox } from "./DynamicCheckbox";
import { DynamicInput } from "./DynamicInput";
import type { ButtonContent, CheckboxContent, InputContent } from "./types";

interface SignUpContent {
	title: string;
	description: string;
	emailField: InputContent;
	passwordField: InputContent;
	confirmPasswordField: InputContent;
	termsCheckbox: CheckboxContent;
	submitButton: ButtonContent;
	oauthButtons?: ButtonContent[];
	showDivider?: boolean;
	footerLinks?: {
		signIn?: { label: string; href: string };
	};
}

interface DynamicSignUpProps {
	content: SignUpContent;
	onSubmit?: (
		email: string,
		password: string,
		confirmPassword: string,
		termsAccepted: boolean,
	) => void;
	onOAuth?: (provider: string) => void;
	onNavigate?: (path: string) => void;
	className?: string;
	isLoading?: boolean;
	errorMessage?: string;
}

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
}: DynamicSignUpProps) {
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

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [errors, setErrors] = useState<{
		email?: string;
		password?: string;
		confirmPassword?: string;
		terms?: string;
	}>({});

	const validate = () => {
		const newErrors: typeof errors = {};

		if (!email) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = "Please enter a valid email";
		}

		if (!password) {
			newErrors.password = "Password is required";
		} else if (password.length < 8) {
			newErrors.password = "Password must be at least 8 characters";
		}

		if (!confirmPassword) {
			newErrors.confirmPassword = "Please confirm your password";
		} else if (password !== confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		if (!termsAccepted) {
			newErrors.terms = "You must accept the terms and conditions";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validate()) {
			onSubmit?.(email, password, confirmPassword, termsAccepted);
		}
	};

	const oauthProviders = [
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
								onSubmit={handleSubmit}
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
										onChange: setEmail,
									}}
									id="email"
								/>

								<DynamicInput
									content={{
										...passwordField,
										type: "password",
										onChange: setPassword,
									}}
									id="password"
								/>

								<DynamicInput
									content={{
										...confirmPasswordField,
										type: "password",
										onChange: setConfirmPassword,
									}}
									id="confirmPassword"
								/>

								<DynamicCheckbox
									content={{
										...termsCheckbox,
										checked: termsAccepted,
										onChange: setTermsAccepted,
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
									{oauthButtons.map((button, index) => (
										<DynamicButton
											key={index}
											content={{
												...button,
												fullWidth: true,
											}}
											onAction={() =>
												onOAuth?.(button.icon as string)
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

export type { SignUpContent };
