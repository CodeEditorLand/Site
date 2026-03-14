import { useEffect, useState } from "react";
import { toast } from "sonner";

import { authAPI } from "../../Lib/api/auth";
import type { User } from "../../Lib/types";
import { Footer } from "../Layout/Footer";
import { Header } from "../Layout/Header";
import { DynamicForgotPassword } from "./DynamicForgotPassword";
import { DynamicResetPassword } from "./DynamicResetPassword";
import { DynamicSignIn } from "./DynamicSignIn";
import { DynamicSignUp } from "./DynamicSignUp";
import type { ForgotPasswordContent } from "./DynamicForgotPassword";
import type { ResetPasswordContent } from "./DynamicResetPassword";
import type { SignInContent } from "./DynamicSignIn";
import type { SignUpContent } from "./DynamicSignUp";
import type { HeaderContent } from "../Layout/Header";
import type { FooterContent } from "../Layout/Footer";

interface AccountPageContent {
	signIn: SignInContent;
	signUp: SignUpContent;
	forgotPassword: ForgotPasswordContent;
	resetPassword: ResetPasswordContent;
	header?: HeaderContent;
	footer?: FooterContent;
}

type AccountRoute = "signin" | "signup" | "forgot-password" | "reset-password";

interface AccountPageProps {
	content: AccountPageContent;
	route: AccountRoute;
	resetToken?: string;
	className?: string;
	onSignIn?: (email: string, password: string) => void;
	onSignUp?: (email: string, password: string, confirmPassword: string, terms: boolean) => void;
	onForgotPassword?: (email: string) => void;
	onResetPassword?: (token: string, password: string, confirmPassword: string) => void;
	onOAuth?: (provider?: string) => void;
	onNavigate?: (path: string) => void;
}

function setSessionToken(token: string): void {
	try {
		document.cookie = `session=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`;
	} catch {
		// Cookie API not available during SSR
	}
	localStorage.setItem("session_token", token);
}

function clearSessionToken(): void {
	try {
		document.cookie = "session=; path=/; max-age=0";
	} catch {
		// Cookie API not available during SSR
	}
	localStorage.removeItem("session_token");
}

function getCurrentUser(): User | null {
	try {
		const userData = localStorage.getItem("current_user");
		if (userData) {
			return JSON.parse(userData);
		}
	} catch {
		// Not available during SSR
	}
	return null;
}

function setCurrentUser(user: User): void {
	try {
		localStorage.setItem("current_user", JSON.stringify(user));
	} catch {
		// Not available during SSR
	}
}

export function AccountPage({
	content,
	route,
	resetToken,
	className,
	onSignIn,
	onSignUp,
	onForgotPassword,
	onResetPassword,
	onOAuth,
	onNavigate,
}: AccountPageProps) {
	const { signIn, signUp, forgotPassword, resetPassword } = content;

	// Loading states
	const [isSignInLoading, setIsSignInLoading] = useState(false);
	const [isSignUpLoading, setIsSignUpLoading] = useState(false);
	const [isForgotPasswordLoading, setIsForgotPasswordLoading] =
		useState(false);
	const [isResetPasswordLoading, setIsResetPasswordLoading] = useState(false);
	const [isOAuthLoading, setIsOAuthLoading] = useState(false);

	// Error states
	const [signInError, setSignInError] = useState<string>("");
	const [signUpError, setSignUpError] = useState<string>("");
	const [forgotPasswordError, setForgotPasswordError] = useState<string>("");
	const [resetPasswordError, setResetPasswordError] = useState<string>("");

	const handleSignIn = async (email: string, password: string): Promise<void> => {
		setIsSignInLoading(true);
		setSignInError("");

		try {
			const result = await authAPI.login(email, password);
			const { session, user } = result;
			setSessionToken(session.token);
			setCurrentUser(user);

			toast.success(`Welcome back, ${user.username}!`);
			onSignIn?.(email, password);

			// Redirect to intended page or home
			setTimeout(() => {
				(onNavigate || ((p) => { }))("/account");
			}, 1000);
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "An unexpected error occurred";
			setSignInError(errorMessage);
			toast.error(errorMessage);
		} finally {
			setIsSignInLoading(false);
		}
	};

	const handleSignUp = async (
		email: string,
		password: string,
		confirmPassword: string,
		termsAccepted: boolean,
	): Promise<void> => {
		setIsSignUpLoading(true);
		setSignUpError("");

		try {
			const username = email.split("@")[0] || "user";
			const result = await authAPI.register(
				email,
				password,
				username,
				undefined,
			);
			const { session, user } = result;
			setSessionToken(session.token);
			setCurrentUser(user);

			toast.success(
				"Account created successfully! Please verify your email.",
			);
			onSignUp?.(email, password, confirmPassword, termsAccepted);

			// Redirect to verification page
			setTimeout(() => {
				(onNavigate || ((p) => { }))("/verify");
			}, 1000);
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "An unexpected error occurred";
			setSignUpError(errorMessage);
			toast.error(errorMessage);
		} finally {
			setIsSignUpLoading(false);
		}
	};

	const handleForgotPassword = async (email: string): Promise<void> => {
		setIsForgotPasswordLoading(true);
		setForgotPasswordError("");

		try {
			await authAPI.forgotPassword(email);
			toast.success(
				"Password reset email sent. Please check your inbox.",
			);
			onForgotPassword?.(email);
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "An unexpected error occurred";
			setForgotPasswordError(errorMessage);
			toast.error(errorMessage);
		} finally {
			setIsForgotPasswordLoading(false);
		}
	};

	const handleResetPassword = async (
		token: string,
		password: string,
		confirmPassword: string,
	): Promise<void> => {
		setIsResetPasswordLoading(true);
		setResetPasswordError("");

		try {
			await authAPI.resetPassword(token, password);
			toast.success(
				"Password reset successful! You can now sign in with your new password.",
			);
			onResetPassword?.(token, password, confirmPassword);

			setTimeout(() => {
				(onNavigate || ((p) => { }))("/account/signin");
			}, 2000);
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "An unexpected error occurred";
			setResetPasswordError(errorMessage);
			toast.error(errorMessage);
		} finally {
			setIsResetPasswordLoading(false);
		}
	};

	const handleOAuth = async (provider?: string) => {
		setIsOAuthLoading(true);

		try {
			// Default to github if no provider specified
			const authProvider = (provider as "github" | "google" | "gitlab") || "github";
			await authAPI.oauth(authProvider);
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "OAuth initialization failed";
			toast.error(errorMessage);
			setIsOAuthLoading(false);
		}
	};

	// OAuth callback handler (for /oauth/success page)
	useEffect(() => {
		// Check if we're returning from OAuth with a token in URL
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get("token");

		if (token && route === "signin") {
			// Set the session token and redirect
			setSessionToken(token);
			toast.success("OAuth authentication successful!");
			(onNavigate || ((p) => { }))("/account");
		}
	}, [route, onNavigate]);

	return (
		<div className={`flex min-h-screen flex-col ${className || ""}`}>
			<Header
				content={
					content.header || {
						logo: { text: "Land" },
						navigation: [
							{ label: "Product", href: "/#product" },
							{ label: "Docs", href: "/docs" },
							{ label: "Support", href: "/support" },
						],
						actions: [],
					}
				}
			/>

			<main className="flex-1">
				{route === "signin" && (
					<DynamicSignIn
						content={signIn}
						onSubmit={handleSignIn}
						onOAuth={handleOAuth}
						{...(onNavigate ? { onNavigate } : {})}
					/>
				)}

				{route === "signup" && (
					<DynamicSignUp
						content={signUp}
						onSubmit={handleSignUp}
						onOAuth={handleOAuth}
						{...(onNavigate ? { onNavigate } : {})}
					/>
				)}

				{route === "forgot-password" && (
					<DynamicForgotPassword
						content={forgotPassword}
						onSubmit={handleForgotPassword}
						onResend={() => handleForgotPassword("")}
						{...(onNavigate ? { onNavigate } : {})}
					/>
				)}

				{route === "reset-password" && (
					<DynamicResetPassword
						content={resetPassword}
						token={resetToken || ""}
						onReset={handleResetPassword}
						{...(onNavigate ? { onNavigate } : {})}
					/>
				)}
			</main>

			<Footer content={content.footer || {}} />
		</div>
	);
}

export type { AccountPageContent };
export type { AccountRoute };
