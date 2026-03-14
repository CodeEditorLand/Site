import { CheckCircle, Mail, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

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
import type { ButtonContent } from "./types";

interface VerificationContent {
	pending: {
		title: string;
		description: string;
		emailSentMessage?: string;
		resendButton: ButtonContent;
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
	const [state, setState] = useState<VerificationState>("pending");
	const [token, setToken] = useState<string>(propToken || "");
	const [email, setEmail] = useState<string>(userEmail || "");
	const [errorMessage, setErrorMessage] = useState("");

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
	}, [propToken]);

	const handleVerify = async (verifyToken: string) => {
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
				"An error occurred during verification. Please try again.",
			);
		}
	};

	const handleResend = async () => {
		if (!email) return;
		try {
			(await onResend?.(email)) || Promise.resolve(true);
			// Success - could show toast or update state
			alert("Verification email resent!");
		} catch (error) {
			setErrorMessage("Failed to resend email. Please try again.");
		}
	};

	const renderPending = () => (
		<Card>
			<CardHeader className="text-center">
				<div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-none">
					<Mail className="text-primary h-6 w-6" />
				</div>
				<CardTitle className="text-2xl">
					{content.pending.title}
				</CardTitle>
				<CardDescription>{content.pending.description}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				{content.pending.emailSentMessage && (
					<p className="text-muted-foreground text-center">
						{content.pending.emailSentMessage}
					</p>
				)}

				<div className="space-y-4">
					<DynamicInput
						content={{
							label: "Email",
							placeholder:
								"Enter your email to resend verification",
							type: "email",
							value: email,
							onChange: setEmail,
						}}
						id="email"
					/>

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
				<div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-none">
					<div className="border-primary h-6 w-6 animate-spin rounded-none border border-t-transparent"></div>
				</div>
				<CardTitle>Verifying your email</CardTitle>
				<CardDescription>
					Please wait while we verify your email address...
				</CardDescription>
			</CardHeader>
		</Card>
	);

	const renderSuccess = () => (
		<Card>
			<CardHeader className="text-center">
				<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-none bg-green-100 dark:bg-green-900/30">
					<CheckCircle className="h-10 w-10 text-green-600" />
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
				<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-none bg-red-100 dark:bg-red-900/30">
					<XCircle className="h-10 w-10 text-red-600" />
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
		<section className="py-20">
			<div className="container mx-auto px-4">
				<div className={`mx-auto max-w-md ${className}`}>
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
