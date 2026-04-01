import { AlertCircle, CheckCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../UI/Card";
import { DynamicButton } from "./DynamicButton";
import { DynamicInput } from "./DynamicInput";
import type Property from "./Interface/Property/Password/Reset.js";
import type { default as ResetState } from "./Type/State/Reset.js";

/**
 * Dynamic ResetPassword component for setting new password with token validation
 * Supports 4 states: checking, valid (form), invalid (error), success
 */
export function DynamicResetPassword({
	content,
	token: PropToken,
	onReset,
	onNavigate,
	className,
	isLoading = false,
	errorMessage,
}: Property) {
	const {
		title,
		description,
		passwordField,
		confirmPasswordField,
		submitButton,
		successMessage,
		invalidTokenMessage,
		checkingMessage,
	} = content;

	const [State, SetState] = useState<ResetState>("checking");
	const [Token, SetToken] = useState<string>(PropToken || "");
	const [Password, SetPassword] = useState("");
	const [ConfirmPassword, SetConfirmPassword] = useState("");
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
			onReset?.(Token, Password, ConfirmPassword);
			SetState("success");
		}
	};

	if (State === "checking") {
		return (
			<section className="py-20" aria-label="Reset password">
				<div className="container mx-auto px-4">
					<div
						className={`mx-auto max-w-md text-center ${className}`}>
						<Card className="StaccatoCard StaccatoBorderShimmer StaccatoShadowLift">
							<CardContent className="pt-6">
								<div className="space-y-4" aria-live="polite">
									<div
										className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"
										aria-hidden="true"></div>
									<p
										className="text-muted-foreground"
										role="status">
										{checkingMessage ||
											"Validating reset token..."}
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		);
	}

	if (State === "invalid") {
		return (
			<section className="py-20" aria-label="Reset password">
				<div className="container mx-auto px-4">
					<div
						className={`mx-auto max-w-md text-center ${className}`}>
						<Card className="StaccatoCard StaccatoBorderShimmer StaccatoShadowLift">
							<CardContent className="pt-6">
								<div className="space-y-4" role="alert">
									<DynamicButton
										content={{
											text: "Back to Sign In",
											variant: "default",
											fullWidth: true,
										}}
										onAction={() =>
											onNavigate?.("/Account/SignIn")
										}
									/>
									<div className="flex items-center justify-center">
										<h3 className="text-lg font-semibold">
											Invalid or Expired Token
										</h3>
										{" "}
										<AlertCircle
											className="h-5 w-5 shrink-0 text-destructive"
											aria-hidden="true"
										/>
									</div>
									<p className="text-xs text-muted-foreground">
										{invalidTokenMessage ||
											"This password reset link is invalid or has expired. Please request a new one."}
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		);
	}

	if (State === "success") {
		return (
			<section className="py-20" aria-label="Reset password">
				<div className="container mx-auto px-4">
					<div
						className={`mx-auto max-w-md text-center ${className}`}>
						<Card className="StaccatoCard StaccatoBorderShimmer StaccatoShadowLift">
							<CardContent className="pt-6">
								<div
									className="space-y-4"
									role="status"
									aria-live="polite">
									<DynamicButton
										content={{
											text: "Go to Sign In",
											variant: "default",
											fullWidth: true,
										}}
										onAction={() =>
											onNavigate?.("/Account/SignIn")
										}
									/>
									<div className="flex items-center justify-center">
										<h3 className="text-lg font-semibold">
											Password Reset Successful
										</h3>
										{" "}
										<CheckCircle
											className="h-5 w-5 shrink-0 text-green-600"
											aria-hidden="true"
										/>
									</div>
									<p className="text-xs text-muted-foreground">
										{successMessage ||
											"Your password has been reset successfully. You can now sign in with your new password."}
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		);
	}

	// Valid state - show form
	return (
		<section className="py-20" aria-label="Reset password">
			<div className="container mx-auto px-4">
				<div className={`mx-auto max-w-md ${className}`}>
					<Card className="StaccatoCard StaccatoBorderShimmer StaccatoShadowLift">
						<CardHeader className="space-y-1 text-center">
							<CardTitle className="text-2xl">{title}</CardTitle>
							<CardDescription>{description}</CardDescription>
						</CardHeader>
						<CardContent>
							<form
								className="space-y-4"
								onSubmit={HandleSubmit}
								aria-label="Reset password form">
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

								{(Errors.password ||
									Errors.confirmPassword) && (
									<div className="space-y-1">
										{Errors.password && (
											<p className="text-sm text-destructive">
												{Errors.password}
											</p>
										)}
										{Errors.confirmPassword && (
											<p className="text-sm text-destructive">
												{Errors.confirmPassword}
											</p>
										)}
									</div>
								)}

								<DynamicButton
									content={{
										...submitButton,
										type: "submit",
										fullWidth: true,
									}}
									isLoading={isLoading}
								/>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
