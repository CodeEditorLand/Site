import { CheckCircle, Mail, XCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../UI/Card";
import { DynamicButton } from "./DynamicButton";
import { DynamicInput } from "./DynamicInput";
import type Interface from "./Interface/Content/Verification/Email.js";
import type Property from "./Interface/Property/Verification/Email.js";
import type { default as VerificationState } from "./Type/State/Verification.js";

/**
 * Dynamic EmailVerification component with states: pending, verifying, success, error
 * Auto-verifies if token present in URL, otherwise shows pending state with resend
 */
export function DynamicEmailVerification({
	content,
	token: PropToken,
	userEmail,
	onVerify,
	onResend,
	onNavigate,
	className,
}: Property) {
	const { t: T } = useTranslation("verify");
	const [State, SetState] = useState<VerificationState>("pending");
	const [Token, SetToken] = useState<string>(PropToken || "");
	const [Email, SetEmail] = useState<string>(userEmail || "");
	const [ErrorMessage, SetErrorMessage] = useState("");
	const [ResendSuccess, SetResendSuccess] = useState(false);

	const HandleVerify = useCallback(
		async (VerifyToken: string) => {
			try {
				const Success = onVerify ? await onVerify(VerifyToken) : true; // Mock success for demo
				if (Success) {
					SetState("success");
				} else {
					SetState("error");
					SetErrorMessage(content.error.description);
				}
			} catch {
				SetState("error");
				SetErrorMessage(
					T("errorGeneric", {
						defaultValue:
							"An error occurred during verification. Please try again.",
					}),
				);
			}
		},
		[onVerify, content.error.description],
	);

	// Auto-verify if token in URL
	useEffect(() => {
		const UrlToken =
			PropToken ||
			new URLSearchParams(window.location.search).get("token");
		if (UrlToken) {
			SetToken(UrlToken);
			SetState("verifying");
			HandleVerify(UrlToken);
		}
	}, [PropToken, HandleVerify]);

	const HandleResend = async () => {
		if (!Email) return;
		try {
			(await onResend?.(Email)) || Promise.resolve(true);
			SetResendSuccess(true);
			setTimeout(() => SetResendSuccess(false), 5000);
		} catch {
			SetErrorMessage(
				T("resendFailed", {
					defaultValue: "Failed to resend email. Please try again.",
				}),
			);
		}
	};

	const RenderPending = () => (
		<Card className="StaccatoCard StaccatoBorderShimmer StaccatoShadowLift">
			<CardHeader className="text-center">
				<div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-none">
					<Mail className="h-6 w-6 text-primary" aria-hidden="true" />
				</div>
				<CardTitle className="text-2xl">
					{content.pending.title}
				</CardTitle>
				<CardDescription>{content.pending.description}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-4">
					<DynamicInput
						content={{
							label: T("emailLabel", { defaultValue: "Email" }),
							placeholder: T("emailPlaceholder", {
								defaultValue:
									"Enter your email to resend verification",
							}),
							type: "email",
							value: Email,
							onChange: SetEmail,
						}}
						id="email"
					/>

					<DynamicButton
						content={{
							...content.pending.resendButton,
							fullWidth: true,
							disabled: !Email,
						}}
						onAction={HandleResend}
					/>

					{ResendSuccess && (
						<p
							className="text-center text-xs text-green-600"
							role="status">
							{content.pending.resendSuccessMessage ||
								T("resendSuccess", {
									defaultValue: "Verification email resent!",
								})}
						</p>
					)}

					{content.pending.emailSentMessage && (
						<p className="text-center text-xs text-muted-foreground">
							{content.pending.emailSentMessage}
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	);

	const RenderVerifying = () => (
		<Card className="StaccatoCard StaccatoBorderShimmer StaccatoShadowLift">
			<CardHeader className="text-center">
				<div
					className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-none"
					aria-hidden="true">
					<div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
				</div>
				<CardTitle>
					{content.verifying?.title ||
						T("verifying.title", {
							defaultValue: "Verifying your email",
						})}
				</CardTitle>
				<CardDescription role="status">
					{content.verifying?.description ||
						T("verifying.description", {
							defaultValue:
								"Please wait while we verify your email address...",
						})}
				</CardDescription>
			</CardHeader>
		</Card>
	);

	const RenderSuccess = () => (
		<Card className="StaccatoCard StaccatoBorderShimmer StaccatoShadowLift">
			<CardHeader className="text-center">
				<DynamicButton
					content={{
						...content.success.continueButton,
						fullWidth: true,
					}}
					onAction={() => onNavigate?.("/")}
				/>
				<div className="flex items-center justify-center pt-4">
					<CardTitle className="text-2xl">
						{content.success.title}
					</CardTitle>
					{" "}
					<CheckCircle
						className="h-5 w-5 shrink-0 text-green-600"
						aria-hidden="true"
					/>
				</div>
				<CardDescription className="text-xs">
					{content.success.description}
				</CardDescription>
			</CardHeader>
		</Card>
	);

	const RenderError = () => (
		<Card className="StaccatoCard StaccatoBorderShimmer StaccatoShadowLift">
			<CardHeader className="text-center">
				<DynamicButton
					content={{
						...content.error.backToSignInButton,
						fullWidth: true,
					}}
					onAction={() => onNavigate?.("/account/signin")}
				/>
				<div className="flex items-center justify-center pt-4">
					<CardTitle className="text-2xl">
						{content.error.title}
					</CardTitle>
					{" "}
					<XCircle
						className="h-5 w-5 shrink-0 text-red-600"
						aria-hidden="true"
					/>
				</div>
				<CardDescription className="text-xs">
					{ErrorMessage || content.error.description}
				</CardDescription>
			</CardHeader>
		</Card>
	);

	return (
		<section className="py-20" aria-label="Email verification">
			<div className="container mx-auto px-4">
				<div
					className={`mx-auto max-w-md ${className}`}
					aria-live="polite">
					{State === "pending" && RenderPending()}
					{State === "verifying" && RenderVerifying()}
					{State === "success" && RenderSuccess()}
					{State === "error" && RenderError()}
				</div>
			</div>
		</section>
	);
}
