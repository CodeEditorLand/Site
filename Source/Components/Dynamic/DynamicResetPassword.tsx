import { AlertCircle, CheckCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { DynamicButton } from "./DynamicButton";
import { DynamicInput } from "./DynamicInput";
import type ButtonContent from "./Interface/Content/Button.js";
import type InputContent from "./Interface/Content/Input.js";

interface ResetPasswordContent {
	title: string;
	description: string;
	passwordField: InputContent;
	confirmPasswordField: InputContent;
	submitButton: ButtonContent;
	successMessage?: string;
	invalidTokenMessage?: string;
	checkingMessage?: string;
}

interface DynamicResetPasswordProps {
	content: ResetPasswordContent;
	token?: string;
	onReset?: (
		token: string,
		password: string,
		confirmPassword: string,
	) => void;
	onNavigate?: (path: string) => void;
	className?: string;
	isLoading?: boolean;
	errorMessage?: string;
}

type ResetState = "checking" | "valid" | "invalid" | "success";

/**
 * Dynamic ResetPassword component for setting new password with token validation
 * Supports 4 states: checking, valid (form), invalid (error), success
 */
export function DynamicResetPassword({
	content,
	token: propToken,
	onReset,
	onNavigate,
	className,
	isLoading = false,
	errorMessage,
}: DynamicResetPasswordProps) {
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

	const [state, setState] = useState<ResetState>("checking");
	const [token, setToken] = useState<string>(propToken || "");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState<{
		password?: string;
		confirmPassword?: string;
	}>({});

	// Simulate token validation (would be API call in real implementation)
	useEffect(() => {
		const tokenFromUrl =
			propToken ||
			new URLSearchParams(window.location.search).get("token");

		if (!tokenFromUrl) {
			setState("invalid");
			return;
		}

		// Simulate API call to validate token
		const validateToken = async () => {
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
			// In real implementation, call `/api/auth/verify-reset-token?token=${token}`
			setToken(tokenFromUrl);
			setState("valid"); // Assume valid for now
		};

		validateToken();
	}, [propToken]);

	const validate = () => {
		const newErrors: typeof errors = {};

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

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validate() && token) {
			onReset?.(token, password, confirmPassword);
			setState("success");
		}
	};

	if (state === "checking") {
		return (
			<section className="py-20" aria-label="Reset password">
				<div className="container mx-auto px-4">
					<div
						className={`mx-auto max-w-md text-center ${className}`}>
						<Card>
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

	if (state === "invalid") {
		return (
			<section className="py-20" aria-label="Reset password">
				<div className="container mx-auto px-4">
					<div
						className={`mx-auto max-w-md text-center ${className}`}>
						<Card>
							<CardContent className="pt-6">
								<div className="space-y-4" role="alert">
									<AlertCircle
										className="mx-auto h-12 w-12 text-destructive"
										aria-hidden="true"
									/>
									<h3 className="text-lg font-semibold">
										Invalid or Expired Token
									</h3>
									<p className="text-muted-foreground">
										{invalidTokenMessage ||
											"This password reset link is invalid or has expired. Please request a new one."}
									</p>
									<DynamicButton
										content={{
											text: "Back to Sign In",
											variant: "default",
											fullWidth: true,
										}}
										onAction={() =>
											onNavigate?.("/account/signin")
										}
									/>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		);
	}

	if (state === "success") {
		return (
			<section className="py-20" aria-label="Reset password">
				<div className="container mx-auto px-4">
					<div
						className={`mx-auto max-w-md text-center ${className}`}>
						<Card>
							<CardContent className="pt-6">
								<div
									className="space-y-4"
									role="status"
									aria-live="polite">
									<CheckCircle
										className="mx-auto h-12 w-12 text-green-600"
										aria-hidden="true"
									/>
									<h3 className="text-lg font-semibold">
										Password Reset Successful
									</h3>
									<p className="text-muted-foreground">
										{successMessage ||
											"Your password has been reset successfully. You can now sign in with your new password."}
									</p>
									<DynamicButton
										content={{
											text: "Go to Sign In",
											variant: "default",
											fullWidth: true,
										}}
										onAction={() =>
											onNavigate?.("/account/signin")
										}
									/>
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
					<Card>
						<CardHeader className="space-y-1 text-center">
							<CardTitle className="text-2xl">{title}</CardTitle>
							<CardDescription>{description}</CardDescription>
						</CardHeader>
						<CardContent>
							<form
								className="space-y-4"
								onSubmit={handleSubmit}
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

								{(errors.password ||
									errors.confirmPassword) && (
									<div className="space-y-1">
										{errors.password && (
											<p className="text-sm text-destructive">
												{errors.password}
											</p>
										)}
										{errors.confirmPassword && (
											<p className="text-sm text-destructive">
												{errors.confirmPassword}
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

export type { ResetPasswordContent };
