import React, { useState } from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { DynamicButton } from "./DynamicButton";
import { DynamicInput } from "./DynamicInput";
import type Property from "./Interface/Property/Password/Forgot.js";

/**
 * Dynamic ForgotPassword component for password reset request
 * Renders email form, success state, and resend functionality
 */
export function DynamicForgotPassword({
	content,
	onSubmit,
	onResend,
	onNavigate,
	className,
	isLoading = false,
	errorMessage,
}: Property) {
	const {
		title,
		description,
		emailField,
		submitButton,
		resendButton,
		successMessage,
	} = content;
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [internalError, setInternalError] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) {
			setInternalError("Email is required");
			return;
		}
		if (!/\S+@\S+\.\S+/.test(email)) {
			setInternalError("Please enter a valid email");
			return;
		}

		onSubmit?.(email);
		setIsSubmitted(true);
		setInternalError("");
	};

	return (
		<section className="py-20" aria-label="Forgot password">
			<div className="container mx-auto px-4">
				<div className={`mx-auto max-w-md ${className}`}>
					<Card>
						<CardHeader className="space-y-1 text-center">
							<CardTitle className="text-2xl">{title}</CardTitle>
							<CardDescription>{description}</CardDescription>
						</CardHeader>
						<CardContent>
							{!isSubmitted ? (
								<form
									className="space-y-4"
									onSubmit={handleSubmit}
									aria-label="Password reset request form">
									<div aria-live="polite" aria-atomic="true">
										{(errorMessage || internalError) && (
											<div
												className="bg-destructive/10 rounded-none p-3 text-sm text-destructive"
												role="alert">
												{errorMessage || internalError}
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

									<DynamicButton
										content={{
											...submitButton,
											type: "submit",
											fullWidth: true,
										}}
										isLoading={isLoading}
									/>
								</form>
							) : (
								<div
									className="space-y-6 text-center"
									role="status"
									aria-live="polite">
									<div className="space-y-2">
										<div
											className="mx-auto flex h-12 w-12 items-center justify-center rounded-none bg-green-100"
											aria-hidden="true">
											<svg
												className="h-6 w-6 text-green-600"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												aria-hidden="true">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M5 13l4 4L19 7"
												/>
											</svg>
										</div>
										<h3 className="text-lg font-semibold">
											Check your email
										</h3>
										<p className="text-muted-foreground">
											{successMessage ||
												"We've sent a password reset link to your email address."}
										</p>
									</div>

									{resendButton && (
										<div className="border-t border-border pt-4">
											<p className="mb-2 text-sm text-muted-foreground">
												Didn't receive the email?
											</p>
											<DynamicButton
												content={{
													...resendButton,
													variant: "outline",
													fullWidth: true,
												}}
												onAction={() => onResend?.()}
											/>
										</div>
									)}

									<p className="text-sm">
										<button
											type="button"
											className="font-medium text-primary hover:underline"
											onClick={() =>
												onNavigate?.("/account/signin")
											}>
											Back to Sign In
										</button>
									</p>
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}

export type { Property as ForgotPasswordContent };
