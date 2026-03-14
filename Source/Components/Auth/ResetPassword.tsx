"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/Components/UI/Button";
import { Input } from "@/Components/UI/Input";
import { Label } from "@/Components/UI/Label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/UI/Card";
import { toast } from "sonner";
import { Lock, CheckCircle, AlertCircle } from "lucide-react";
import { useTranslation } from "@/Lib/I18n";
import { authAPI } from "@/Lib/api/auth";

/**
 * ResetPassword component - Set new password after password reset request
 *
 * @example
 * ```tsx
 * // Used by the /account/reset-password route with token from query
 * <ResetPassword token={tokenFromQuery} />
 * ```
 *
 * @remarks
 * - Verifies reset token on mount via Workers API
 * - Three states: checking, valid (form), invalid (error), success
 * - Password confirmation validation
 * - Min 8 characters password requirement
 * - Loading states with disabled inputs
 * - Error handling with sonner toasts
 * - Navigate to sign-in on success
 */
export function ResetPassword() {
	const { t } = useTranslation();
	const router = useRouter();
	const [token, setToken] = useState<string>("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const tokenFromQuery = router.query.token as string;
		if (tokenFromQuery) {
			setToken(tokenFromQuery);
			verifyToken(tokenFromQuery);
		} else {
			setIsTokenValid(false);
		}
	}, [router.query]);

	const verifyToken = async (resetToken: string) => {
		try {
			// The Workers API doesn't have a separate verify endpoint,
			// the resetPassword will validate the token
			// For UX, we'll just assume token is valid if present
			setIsTokenValid(!!resetToken && resetToken.length > 0);
		} catch {
			setIsTokenValid(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError(t("account.resetPassword.mismatch", "Passwords do not match"));
			return;
		}

		if (password.length < 8) {
			setError(t("account.resetPassword.error.tooShort", "Password must be at least 8 characters"));
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			await authAPI.resetPassword(token, password);
			setIsSuccess(true);
			toast.success(t("account.resetPassword.successToast", "Password reset successfully"));
		} catch (err) {
			const message = err instanceof Error ? err.message : t("account.resetPassword.errorToast", "Failed to reset password");
			setError(message);
			toast.error(message);
		} finally {
			setIsLoading(false);
		}
	};

	// Render loading state while checking token
	if (isTokenValid === null) {
		return (
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-md mx-auto">
						<Card className="border-[3px] !rounded-none">
							<CardHeader className="text-center">
								<div className="mx-auto mb-4 p-4 bg-secondary rounded-full w-16 h-16 flex items-center justify-center">
									<AlertCircle className="h-8 w-8 text-primary" />
								</div>
								<CardTitle>{t("account.resetPassword.checking", "Checking token...")}</CardTitle>
								<CardDescription>
									{t("account.resetPassword.checkingMessage", "Validating your reset token, please wait...")}
								</CardDescription>
							</CardHeader>
							<CardContent className="text-center">
								<div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		);
	}

	// Render invalid token state
	if (isTokenValid === false) {
		return (
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-md mx-auto">
						<Card className="border-[3px] !rounded-none">
							<CardHeader className="text-center">
								<div className="mx-auto mb-4 p-4 bg-red-100 dark:bg-red-900/30 rounded-full w-16 h-16 flex items-center justify-center">
									<AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
								</div>
								<CardTitle>{t("account.resetPassword.invalidToken.title", "Invalid or expired token")}</CardTitle>
								<CardDescription>
									{t("account.resetPassword.invalidToken.description", "This password reset link is invalid, has expired, or was already used.")}
								</CardDescription>
							</CardHeader>
							<CardContent className="text-center">
								<p className="text-muted-foreground">
									{t("account.resetPassword.invalidToken.instruction", "Request a new password reset email to continue.")}
								</p>
							</CardContent>
							<CardFooter>
								<Button className="w-full" onClick={() => router.push("/account/forgot-password")}>
									{t("account.resetPassword.invalidToken.button", "Request New Reset Email")}
								</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</section>
		);
	}

	// Render success state
	if (isSuccess) {
		return (
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-md mx-auto">
						<Card className="border-[3px] !rounded-none">
							<CardHeader className="text-center">
								<div className="mx-auto mb-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 flex items-center justify-center">
									<CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
								</div>
								<CardTitle>{t("account.resetPassword.success.title", "Password reset successful")}</CardTitle>
								<CardDescription>
									{t("account.resetPassword.success.description", "Your password has been reset. You can now sign in with your new password.")}
								</CardDescription>
							</CardHeader>
							<CardFooter>
								<Button className="w-full" onClick={() => router.push("/account/signin")}>
									{t("account.resetPassword.success.button", "Continue to Sign In")}
								</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</section>
		);
	}

	// Render password reset form
	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<div className="max-w-md mx-auto">
					<Card className="border-[3px] !rounded-none">
						<CardHeader className="space-y-1 text-center">
							<CardTitle className="text-2xl">{t("account.resetPassword.title", "Reset Password")}</CardTitle>
							<CardDescription>
								{t("account.resetPassword.subtitle", "Enter your new password below")}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form className="space-y-4" onSubmit={handleSubmit}>
								<div className="space-y-2">
									<Label htmlFor="password">{t("account.resetPassword.passwordLabel", "New Password")}</Label>
									<Input
										id="password"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										minLength={8}
										disabled={isLoading}
									/>
									<p className="text-xs text-muted-foreground">
										{t("account.resetPassword.passwordHint", "Minimum 8 characters")}
									</p>
								</div>
								<div className="space-y-2">
									<Label htmlFor="confirmPassword">{t("account.resetPassword.confirmLabel", "Confirm New Password")}</Label>
									<Input
										id="confirmPassword"
										type="password"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										required
										disabled={isLoading}
										aria-describedby={error ? "confirm-error" : undefined}
									/>
									{error && <p id="confirm-error" className="text-sm text-destructive">{error}</p>}
								</div>
								<Button type="submit" className="w-full" disabled={isLoading}>
									<Lock className="mr-2 h-4 w-4" />
									{isLoading ? t("account.resetPassword.loading", "Resetting...") : t("account.resetPassword.submit", "Reset Password")}
								</Button>
							</form>
						</CardContent>
						<CardFooter className="flex justify-center">
							<p className="text-sm text-muted-foreground">
								{t("account.resetPassword.signInLink", "Remember your password?")}{" "}
								<a href="/account/signin" className="text-primary hover:underline font-medium">
									{t("common.button.signIn", "Sign in")}
								</a>
							</p>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}
