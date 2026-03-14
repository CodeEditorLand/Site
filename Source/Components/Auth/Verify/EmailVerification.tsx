"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Button } from "@/Components/UI/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/UI/Card";
import { toast } from "sonner";
import { Mail, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { useTranslation } from "@/Lib/I18n";
import { authAPI } from "@/Lib/api/auth";

/**
 * EmailVerification component - Verify user's email address after sign-up
 *
 * @example
 * ```tsx
 * // Route: /account/verify?email=user@example.com&token=xxx
 * <EmailVerification email={queryEmail} token={queryToken} />
 * ```
 *
 * @remarks
 * - Auto-verifies if token present in URL
 * - Three states: pending (check email), success (verified), error (invalid/expired)
 * - Resend verification email functionality
 * - Loading states with disabled inputs
 * - Error handling with sonner toasts
 * - Navigate to sign-in on success
 */
export function EmailVerification() {
	const { t } = useTranslation();
	const router = useRouter();
	const emailFromQuery = router.query.email as string;
	const tokenFromQuery = router.query.token as string;

	const [state, setState] = useState<"pending" | "success" | "error" | "resending">("pending");
	const [message, setMessage] = useState<string | null>(null);

	// Auto-verify if token present in URL
	useEffect(() => {
		if (tokenFromQuery) {
			handleVerify(tokenFromQuery);
		}
	}, [tokenFromQuery]);

	const handleVerify = async (verifyToken: string) => {
		setState("pending");
		try {
			await authAPI.verifyEmail(verifyToken);
			setState("success");
			toast.success(t("verify.email.successToast", "Email verified successfully"));
		} catch (err) {
			setState("error");
			setMessage(err instanceof Error ? err.message : t("verify.email.error.description", "Verification failed"));
			toast.error(t("verify.email.errorToast", "Email verification failed"));
		}
	};

	const handleResend = useCallback(async () => {
		if (!emailFromQuery) {
			toast.error(t("verify.email.error.noEmail", "Email is required"));
			return;
		}
		setState("resending");
		try {
			await authAPI.resendVerification();
			setMessage(t("verify.email.resent", "Verification email sent!"));
			toast.success(t("verify.email.resendSuccessToast", "Verification email resent"));
			setTimeout(() => setMessage(null), 5000);
			setState("pending");
		} catch (err) {
			setMessage(err instanceof Error ? err.message : t("verify.email.resendError", "Failed to resend verification"));
			toast.error(t("verify.email.resendErrorToast", "Failed to resend verification email"));
			setState("pending");
		}
	}, [emailFromQuery, t]);

	const renderPending = () => (
		<>
			<CardHeader className="text-center">
				<div className="mx-auto mb-4 p-4 bg-secondary rounded-full w-20 h-20 flex items-center justify-center">
					<Mail className="h-10 w-10 text-primary" />
				</div>
				<CardTitle>{t("verify.email.title", "Verify your email")}</CardTitle>
				<CardDescription>
					{t("verify.email.description", "We sent a verification link to")} <strong>{emailFromQuery}</strong>
				</CardDescription>
			</CardHeader>
			<CardContent className="text-center">
				<p>{t("verify.email.instruction", "Click the link in the email to verify your account and start using Code Editor Land.")}</p>
				<p className="text-sm text-muted-foreground mt-4">
					{t("verify.email.checkSpam", "Didn't receive the email? Check your spam folder or")}{" "}
					<Button variant="link" className="p-0 h-auto font-normal" onClick={handleResend}>
						{t("verify.email.resendLink", "resend verification email")}
					</Button>
				</p>
				{message && <p className="text-sm text-primary mt-2">{message}</p>}
			</CardContent>
			<CardFooter className="flex flex-col gap-4">
				<Button variant="outline" className="w-full" onClick={handleResend} disabled={state === "resending"}>
					{state === "resending" ? t("verify.email.resending", "Sending...") : t("verify.email.resendButton", "Resend Verification Email")}
				</Button>
				<Button variant="ghost" className="w-full" onClick={() => router.push("/account/signin")}>
					{t("verify.email.backToSignIn", "Back to Sign In")}
				</Button>
			</CardFooter>
		</>
	);

	const renderSuccess = () => (
		<>
			<CardHeader className="text-center">
				<div className="mx-auto mb-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-full w-20 h-20 flex items-center justify-center">
					<CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
				</div>
				<CardTitle>{t("verify.email.success.title", "Email verified!")}</CardTitle>
				<CardDescription>
					{t("verify.email.success.description", "Your email has been successfully verified.")} <strong>{emailFromQuery}</strong>
				</CardDescription>
			</CardHeader>
			<CardContent className="text-center">
				<p>{t("verify.email.success.instruction", "You can now sign in to your account and start building amazing design systems.")}</p>
			</CardContent>
			<CardFooter>
				<Button className="w-full" onClick={() => router.push("/account/signin")}>
					{t("verify.email.success.continue", "Continue to Sign In")}
					<ArrowRight className="ml-2 h-4 w-4" />
				</Button>
			</CardFooter>
		</>
	);

	const renderError = () => (
		<>
			<CardHeader className="text-center">
				<div className="mx-auto mb-4 p-4 bg-red-100 dark:bg-red-900/30 rounded-full w-20 h-20 flex items-center justify-center">
					<XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
				</div>
				<CardTitle>{t("verify.email.error.title", "Verification failed")}</CardTitle>
				<CardDescription>
					{t("verify.email.error.description", "This verification link is invalid or has expired.")}
				</CardDescription>
			</CardHeader>
			<CardContent className="text-center">
				<p>{t("verify.email.error.instruction", "Please request a new verification email or contact support if the problem persists.")}</p>
			</CardContent>
			<CardFooter className="flex flex-col gap-4">
				<Button className="w-full" onClick={handleResend} disabled={state === "resending"}>
					{state === "resending" ? t("verify.email.resending", "Sending...") : t("verify.email.error.resendButton", "Send New Verification Email")}
				</Button>
				<Button variant="outline" className="w-full" onClick={() => router.push("/support")}>
					{t("verify.email.error.contactSupport", "Contact Support")}
				</Button>
			</CardFooter>
		</>
	);

	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<div className="max-w-md mx-auto">
					<Card className="border-[3px] !rounded-none">
						{state === "pending" && renderPending()}
						{state === "success" && renderSuccess()}
						{state === "error" && renderError()}
					</Card>
				</div>
			</div>
		</section>
	);
}
