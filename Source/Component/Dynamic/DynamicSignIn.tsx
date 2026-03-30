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
import type Property from "./Interface/Property/SignIn.js";

/**
 * Dynamic SignIn component that accepts form schema
 * Renders email/password form with optional OAuth and footer links
 */
export function DynamicSignIn({
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
		submitButton,
		oauthButton,
		showDivider = true,
		footerLinks,
	} = content;
	const [Email, SetEmail] = useState("");
	const [Password, SetPassword] = useState("");
	const [Errors, SetErrors] = useState<{ email?: string; password?: string }>(
		{},
	);

	const Validate = () => {
		const NewErrors: { email?: string; password?: string } = {};

		if (!Email) {
			NewErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(Email)) {
			NewErrors.email = "Please enter a valid email";
		}

		if (!Password) {
			NewErrors.password = "Password is required";
		}

		SetErrors(NewErrors);
		return Object.keys(NewErrors).length === 0;
	};

	const HandleSubmit = (Event: React.FormEvent) => {
		Event.preventDefault();
		if (!isLoading && Validate()) {
			onSubmit?.(Email, Password);
		}
	};

	return (
		<section className="py-20" aria-label="Sign in">
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
								aria-label="Sign in form">
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

								<DynamicButton
									content={{
										...submitButton,
										type: "submit",
										fullWidth: true,
									}}
									isLoading={isLoading}
								/>
							</form>

							{showDivider && (
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

							{oauthButton && (
								<DynamicButton
									content={{
										...oauthButton,
										fullWidth: true,
									}}
									onAction={onOAuth}
								/>
							)}
						</CardContent>
						<CardFooter className="flex flex-col gap-4 text-center text-sm">
							{footerLinks?.signUp && (
								<p>
									Don't have an account?{" "}
									<button
										type="button"
										className="font-medium text-primary hover:underline"
										onClick={() =>
											footerLinks.signUp &&
											onNavigate?.(
												footerLinks.signUp.href,
											)
										}>
										{footerLinks.signUp.label}
									</button>
								</p>
							)}
							{footerLinks?.forgotPassword && (
								<p>
									Forgot your password?{" "}
									<button
										type="button"
										className="font-medium text-primary hover:underline"
										onClick={() =>
											footerLinks.forgotPassword &&
											onNavigate?.(
												footerLinks.forgotPassword.href,
											)
										}>
										{footerLinks.forgotPassword.label}
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
