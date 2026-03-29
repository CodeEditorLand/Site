"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/Components/UI/Button";
import { Input } from "@/Components/UI/Input";
import { Label } from "@/Components/UI/Label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/UI/Card";
import { toast } from "sonner";
import { ArrowLeft, Mail } from "lucide-react";
import { useTranslation } from "@/Lib/I18n";
import { authAPI } from "@/Lib/api/auth";

/**
 * ForgotPassword component - Request password reset email
 *
 * @example
 * ```tsx
 * <ForgotPassword />
 * ```
 *
 * @remarks
 * - Integrates with Workers API via AuthAPI
 * - Two states: form (email input) and success (check inbox)
 * - Loading states with disabled inputs
 * - Error handling with sonner toasts
 * - Resend functionality
 * - Navigate back to sign-in
 */
export function ForgotPassword() {
	const { t } = useTranslation();
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		try {
			await authAPI.forgotPassword(email);
			setIsSubmitted(true);
			toast.success(t("account.forgotPassword.successToast", "Reset email sent"));
		} catch (err) {
			const message = err instanceof Error ? err.message : t("account.forgotPassword.errorToast", "Failed to send reset email");
			setError(message);
			toast.error(message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleResend = async () => {
		if (!email) {
			toast.error(t("account.forgotPassword.emailRequired", "Email is required"));
			return;
		}
		setIsLoading(true);
		try {
			await authAPI.forgotPassword(email);
			toast.success(t("account.forgotPassword.resendSuccess", "Reset email sent again"));
		} catch {
			toast.error(t("account.forgotPassword.resendError", "Failed to resend email"));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<div className="max-w-md mx-auto">
					<Card className="border-[3px] !rounded-none">
						<CardHeader className="space-y-1 text-center">
							<CardTitle className="text-2xl">
								{isSubmitted ? t("account.forgotPassword.success.title", "Check your email") : t("account.forgotPassword.title", "Reset Password")}
							</CardTitle>
							<CardDescription>
								{isSubmitted
									? t("account.forgotPassword.success.subtitle", "We've sent a password reset link to") + ` <strong>${email}</strong>`
									: t("account.forgotPassword.subtitle", "Enter your email address and we'll send you a reset link")}
							</CardDescription>
						</CardHeader>
						<CardContent>
							{!isSubmitted && (
								<form className="space-y-4" onSubmit={handleSubmit}>
									<div className="space-y-2">
										<Label htmlFor="email">{t("account.forgotPassword.emailLabel", "Email")}</Label>
										<Input
											id="email"
											type="email"
											placeholder={t("account.forgotPassword.emailPlaceholder", "name@example.com")}
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
											disabled={isLoading}
											aria-describedby={error ? "email-error" : undefined}
										/>
									</div>
									{error && <p id="email-error" className="text-sm text-destructive">{error}</p>}
									<Button type="submit" className="w-full" disabled={isLoading}>
										<Mail className="mr-2 h-4 w-4" />
										{isLoading ? t("account.forgotPassword.loading", "Sending...") : t("account.forgotPassword.submit", "Send Reset Link")}
									</Button>
								</form>
							)}
							{isSubmitted && (
								<div className="text-center py-4">
									<p className="text-muted-foreground mb-4">
										{t("account.forgotPassword.success.instruction", "Click the link in the email to reset your password. The link expires in 24 hours.")}
									</p>
									{error && <p className="text-sm text-destructive mb-4">{error}</p>}
								</div>
							)}
						</CardContent>
						<CardFooter className="flex flex-col gap-4">
							{isSubmitted && (
								<Button variant="outline" className="w-full" onClick={handleResend} disabled={isLoading}>
									{isLoading ? t("account.forgotPassword.loading", "Sending...") : t("account.forgotPassword.success.resend", "Resend Email")}
								</Button>
							)}
							<Button variant="ghost" className="w-full" onClick={() => router.push("/account/signin")}>
								<ArrowLeft className="mr-2 h-4 w-4" />
								{t("account.forgotPassword.backToSignIn", "Back to Sign In")}
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}
