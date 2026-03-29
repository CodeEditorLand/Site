import { CheckCircle, Mail, XCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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

interface VerificationContent {
	pending: {
		title: string;
		description: string;
		emailSentMessage?: string;
		resendButton: ButtonContent;
		resendSuccessMessage?: string;
	};
	verifying?: {
		title?: string;
		description?: string;
	};
	success: {
		title: string;
		description: string;
		continueButton: ButtonContent;
	};
	error: {
		title: string;
		description: string;
		backToSignInButton: ButtonContent;
	};
}

interface DynamicEmailVerificationProps {
	content: VerificationContent;
	token?: string;
	userEmail?: string;
	onVerify?: (token: string) => Promise<boolean>;
	onResend?: (email: string) => Promise<boolean>;
	onNavigate?: (path: string) => void;
	className?: string;
}

type VerificationState = "pending" | "verifying" | "success" | "error";

/**
 * Dynamic EmailVerification component with states: pending, verifying, success, error
 * Auto-verifies if token present in URL, otherwise shows pending state with resend
 */
export function DynamicEmailVerification({
	content,
	token: propToken,
	userEmail,
	onVerify,
	onResend,
	onNavigate,
	className,
}: DynamicEmailVerificationProps) {
	const { t } = useTranslation("verify");
	const [state, setState] = useState<VerificationState>("pending");
	const [token, setToken] = useState<string>(propToken || "");
	const [email, setEmail] = useState<string>(userEmail || "");
	const [errorMessage, setErrorMessage] = useState("");
	const [resendSuccess, setResendSuccess] = useState(false);

	const handleVerify = useCallback(
		async (verifyToken: string) => {
			try {
				const success = onVerify ? await onVerify(verifyToken) : true; // Mock success for demo
				if (success) {
					setState("success");
				} else {
					setState("error");
					setErrorMessage(content.error.description);
				}
			} catch {
				setState("error");
				setErrorMessage(
					t("errorGeneric", {
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
		const urlToken =
			propToken ||
			new URLSearchParams(window.location.search).get("token");
		if (urlToken) {
			setToken(urlToken);
			setState("verifying");
			handleVerify(urlToken);
		}
	}, [propToken, handleVerify]);

	const handleResend = async () => {
		if (!email) return;
		try {
			(await onResend?.(email)) || Promise.resolve(true);
			setResendSuccess(true);
			setTimeout(() => setResendSuccess(false), 5000);
		} catch {
			setErrorMessage(
				t("resendFailed", {
					defaultValue: "Failed to resend email. Please try again.",
				}),
			);
		}
	};

	const renderPending = () => (
		<Card>
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
				{content.pending.emailSentMessage && (
					<p className="text-center text-muted-foreground">
						{content.pending.emailSentMessage}
					</p>
				)}

				<div className="space-y-4">
					<DynamicInput
						content={{
							label: t("emailLabel", { defaultValue: "Email" }),
							placeholder: t("emailPlaceholder", {
								defaultValue:
									"Enter your email to resend verification",
							}),
							type: "email",
							value: email,
							onChange: setEmail,
						}}
						id="email"
					/>

					{resendSuccess && (
						<p
							className="text-center text-sm text-green-600"
							role="status">
							{content.pending.resendSuccessMessage ||
								t("resendSuccess", {
									defaultValue: "Verification email resent!",
								})}
						</p>
					)}

					<DynamicButton
						content={{
							...content.pending.resendButton,
							fullWidth: true,
							disabled: !email,
						}}
						onAction={handleResend}
					/>
				</div>
			</CardContent>
		</Card>
	);

	const renderVerifying = () => (
		<Card>
			<CardHeader className="text-center">
				<div
					className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-none"
					aria-hidden="true">
					<div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
				</div>
				<CardTitle>
					{content.verifying?.title ||
						t("verifying.title", {
							defaultValue: "Verifying your email",
						})}
				</CardTitle>
				<CardDescription role="status">
					{content.verifying?.description ||
						t("verifying.description", {
							defaultValue:
								"Please wait while we verify your email address...",
						})}
				</CardDescription>
			</CardHeader>
		</Card>
	);

	const renderSuccess = () => (
		<Card>
			<CardHeader className="text-center">
				<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-none bg-green-100">
					<CheckCircle
						className="h-10 w-10 text-green-600"
						aria-hidden="true"
					/>
				</div>
				<CardTitle className="text-2xl">
					{content.success.title}
				</CardTitle>
				<CardDescription>{content.success.description}</CardDescription>
			</CardHeader>
			<CardFooter className="flex justify-center">
				<DynamicButton
					content={{
						...content.success.continueButton,
						fullWidth: true,
					}}
					onAction={() => onNavigate?.("/")}
				/>
			</CardFooter>
		</Card>
	);

	const renderError = () => (
		<Card>
			<CardHeader className="text-center">
				<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-none bg-red-100">
					<XCircle
						className="h-10 w-10 text-red-600"
						aria-hidden="true"
					/>
				</div>
				<CardTitle className="text-2xl">
					{content.error.title}
				</CardTitle>
				<CardDescription>
					{errorMessage || content.error.description}
				</CardDescription>
			</CardHeader>
			<CardFooter className="flex justify-center">
				<DynamicButton
					content={{
						...content.error.backToSignInButton,
						fullWidth: true,
					}}
					onAction={() => onNavigate?.("/account/signin")}
				/>
			</CardFooter>
		</Card>
	);

	return (
		<section className="py-20" aria-label="Email verification">
			<div className="container mx-auto px-4">
				<div
					className={`mx-auto max-w-md ${className}`}
					aria-live="polite">
					{state === "pending" && renderPending()}
					{state === "verifying" && renderVerifying()}
					{state === "success" && renderSuccess()}
					{state === "error" && renderError()}
				</div>
			</div>
		</section>
	);
}

export type { VerificationContent };
