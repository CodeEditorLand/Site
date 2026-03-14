import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { getWorkersClient } from "../../Lib/workers-client";
import { DynamicEmailVerification } from "./DynamicEmailVerification";
import type { VerificationContent } from "./types";

interface VerifyPageContent {
	verification: VerificationContent;
}

type VerifyRoute = "verify" | "success" | "failure";

interface VerifyPageProps {
	content: VerifyPageContent;
	route: VerifyRoute;
	token?: string;
	reason?: string;
	metaTitle?: string;
	metaDescription?: string;
	className?: string;
	onVerify?: (token: string) => Promise<boolean>;
	onResend?: (email: string) => Promise<boolean>;
	onNavigate?: ((path: string) => void) | undefined;
}

export function VerifyPage({
	content,
	route,
	token,
	reason,
	metaTitle = "Verify Email - Land",
	metaDescription = "Verify your email address to activate your account.",
	className,
	onVerify,
	onResend,
	onNavigate,
}: VerifyPageProps) {
	const { verification } = content;
	const workers = getWorkersClient();
	const [userEmail, setUserEmail] = useState<string>("");

	// Extract email from localStorage if available
	useEffect(() => {
		try {
			const userData = localStorage.getItem("current_user");
			if (userData) {
				const user = JSON.parse(userData);
				setUserEmail(user.email || "");
			}
		} catch {
			// Not available during SSR
		}
	}, []);

	const handleVerify = async (verifyToken: string): Promise<boolean> => {
		try {
			const response = await workers.auth.verifyEmail(verifyToken);

			if (response.success) {
				toast.success("Email verified successfully!");
				// Clear any pending verification state
				return true;
			} else {
				toast.error(response.error || "Verification failed");
				return false;
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Verification failed";
			toast.error(errorMessage);
			return false;
		}
	};

	const handleResend = async (email: string): Promise<boolean> => {
		try {
			const response = await workers.auth.resendVerification();

			if (response.success) {
				toast.success("Verification email sent!");
				return true;
			} else {
				toast.error(response.error || "Failed to resend email");
				return false;
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to resend email";
			toast.error(errorMessage);
			return false;
		}
	};

	const getTitle = () => {
		switch (route) {
			case "verify":
				return t("verify.pending.title", {
					defaultValue: "Verify Your Email",
				});
			case "success":
				return t("verify.success.title", {
					defaultValue: "Email Verified",
				});
			case "failure":
				return t("verify.error.title", {
					defaultValue: "Verification Failed",
				});
		}
	};

	return (
		<div className={`flex min-h-screen flex-col ${className || ""}`}>
			<main className="flex-1">
				{route === "verify" && (
					<DynamicEmailVerification
						content={verification}
						token={token}
						userEmail={userEmail}
						onVerify={handleVerify}
						onResend={handleResend}
						onNavigate={onNavigate}
					/>
				)}

				{route === "success" && (
					<section className="py-20">
						<div className="container mx-auto px-4">
							<div className="mx-auto max-w-md text-center">
								<div className="!rounded-none border-[3px] border-green-500 p-8 shadow-lg">
									<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-none bg-green-100 dark:bg-green-900/30">
										<svg
											className="h-10 w-10 text-green-600"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</div>
									<h1 className="mb-2 text-2xl font-bold">
										{"Email Verified Successfully!"}
									</h1>
									<p className="text-muted-foreground mb-6">
										{
											"Your email address has been verified. You can now access all features."
										}
									</p>
									<button
										type="button"
										className="border-border bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center gap-2 border-[3px] px-4 py-2 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50"
										onClick={() => onNavigate?.("/")}>
										{t("verify.success.continueButton", {
											defaultValue:
												"Continue to Homepage",
										})}
									</button>
								</div>
							</div>
						</div>
					</section>
				)}

				{route === "failure" && (
					<section className="py-20">
						<div className="container mx-auto px-4">
							<div className="mx-auto max-w-md text-center">
								<div className="border-destructive !rounded-none border-[3px] p-8 shadow-lg">
									<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-none bg-red-100 dark:bg-red-900/30">
										<svg
											className="h-10 w-10 text-red-600"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</div>
									<h1 className="mb-2 text-2xl font-bold">
										{"Verification Failed"}
									</h1>
									<p className="text-muted-foreground mb-2">
										{reason
											? `${t("verify.error.instruction", { defaultValue: "Error:" })} ${reason}`
											: "This verification link is invalid or has expired."}
									</p>
									<p className="text-muted-foreground mb-6 text-sm">
										{
											"Please request a new verification email or contact support if the problem persists."
										}
									</p>
									<div className="flex justify-center gap-4">
										<button
											type="button"
											className="border-border bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center gap-2 border-[3px] px-4 py-2 text-sm font-medium transition-all"
											onClick={() =>
												onNavigate?.("/verify")
											}>
											{"Send New Verification Email"}
										</button>
										<button
											type="button"
											className="border-border bg-background hover:bg-accent inline-flex h-10 items-center justify-center gap-2 border-[3px] px-4 py-2 text-sm font-medium transition-all"
											onClick={() =>
												onNavigate?.("/account/signin")
											}>
											{"Sign In"}
										</button>
									</div>
								</div>
							</div>
						</div>
					</section>
				)}
			</main>
		</div>
	);
}

export type { VerifyPageContent };
