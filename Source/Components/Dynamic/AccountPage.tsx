import { useEffect, useState } from "react";
import { toast } from "sonner";

import { authAPI } from "../../Lib/api/auth";
import type { User } from "../../Lib/types";
import { Header, type HeaderContent } from "../Layout/Header";
import {
	DynamicForgotPassword,
	type ForgotPasswordContent,
} from "./DynamicForgotPassword";
import {
	DynamicResetPassword,
	type ResetPasswordContent,
} from "./DynamicResetPassword";
import { DynamicSignIn, type SignInContent } from "./DynamicSignIn";
import { DynamicSignUp, type SignUpContent } from "./DynamicSignUp";

interface AccountPageContent {
	signIn: SignInContent;
	signUp: SignUpContent;
	forgotPassword: ForgotPasswordContent;
	resetPassword: ResetPasswordContent;
	header?: HeaderContent;
	footer?: Record<string, unknown>;
}

type AccountRoute = "signin" | "signup" | "forgot-password" | "reset-password";

interface AccountPageProps {
	content: AccountPageContent;
	route: AccountRoute;
	resetToken?: string;
	metaTitle?: string;
	metaDescription?: string;
	className?: string;
	onSignIn?: (Email: string, Password: string) => void;
	onSignUp?: (
		Email: string,
		Password: string,
		ConfirmPassword: string,
		TermsAccepted: boolean,
	) => void;
	onForgotPassword?: (Email: string) => void;
	onResetPassword?: (
		Token: string,
		Password: string,
		ConfirmPassword: string,
	) => void;
	onOAuth?: (Provider?: string) => void;
	onNavigate?: (Path: string) => void;
}

function SetSessionToken(Token: string): void {
	try {
		document.cookie = `session=${Token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`;
	} catch {
		// Cookie API not available during SSR
	}
	localStorage.setItem("session_token", Token);
}

function ClearSessionToken(): void {
	try {
		document.cookie = "session=; path=/; max-age=0";
	} catch {
		// Cookie API not available during SSR
	}
	localStorage.removeItem("session_token");
}

function GetCurrentUser(): User | null {
	try {
		const UserData = localStorage.getItem("current_user");
		if (UserData) {
			return JSON.parse(UserData);
		}
	} catch {
		// Not available during SSR
	}
	return null;
}

function SetCurrentUser(CurrentUser: User): void {
	try {
		localStorage.setItem("current_user", JSON.stringify(CurrentUser));
	} catch {
		// Not available during SSR
	}
}

function NavigateToPath(Path: string): void {
	window.location.href = Path;
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

	const Navigate = onNavigate || NavigateToPath;

	// Loading states
	const [IsSignInLoading, SetIsSignInLoading] = useState(false);
	const [IsSignUpLoading, SetIsSignUpLoading] = useState(false);
	const [IsForgotPasswordLoading, SetIsForgotPasswordLoading] =
		useState(false);
	const [IsResetPasswordLoading, SetIsResetPasswordLoading] = useState(false);
	const [IsOAuthLoading, SetIsOAuthLoading] = useState(false);

	// Error states
	const [SignInErrorMessage, SetSignInErrorMessage] = useState<string>("");
	const [SignUpErrorMessage, SetSignUpErrorMessage] = useState<string>("");
	const [ForgotPasswordErrorMessage, SetForgotPasswordErrorMessage] =
		useState<string>("");
	const [ResetPasswordErrorMessage, SetResetPasswordErrorMessage] =
		useState<string>("");

	const HandleSignIn = async (
		Email: string,
		Password: string,
	): Promise<void> => {
		SetIsSignInLoading(true);
		SetSignInErrorMessage("");

		try {
			const ResponseData = await authAPI.login(Email, Password);
			const { session: SessionData, user: UserData } = ResponseData;
			SetSessionToken(SessionData.token);
			SetCurrentUser(UserData);

			toast.success(`Welcome back, ${UserData.username}!`);
			onSignIn?.(Email, Password);

			// Redirect to account dashboard
			setTimeout(() => {
				Navigate("/account");
			}, 1000);
		} catch (ErrorInstance) {
			const ErrorMessage =
				ErrorInstance instanceof Error
					? ErrorInstance.message
					: "An unexpected error occurred";
			SetSignInErrorMessage(ErrorMessage);
			toast.error(ErrorMessage);
		} finally {
			SetIsSignInLoading(false);
		}
	};

	const HandleSignUp = async (
		Email: string,
		Password: string,
		ConfirmPassword: string,
		TermsAccepted: boolean,
	): Promise<void> => {
		SetIsSignUpLoading(true);
		SetSignUpErrorMessage("");

		try {
			const Username = Email.split("@")[0] || "user";
			const ResponseData = await authAPI.register(
				Email,
				Password,
				Username,
				undefined,
			);
			const { session: SessionData, user: UserData } = ResponseData;
			SetSessionToken(SessionData.token);
			SetCurrentUser(UserData);

			toast.success(
				"Account created successfully! Please verify your email.",
			);
			onSignUp?.(Email, Password, ConfirmPassword, TermsAccepted);

			// Redirect to email verification page
			setTimeout(() => {
				Navigate("/verify");
			}, 1000);
		} catch (ErrorInstance) {
			const ErrorMessage =
				ErrorInstance instanceof Error
					? ErrorInstance.message
					: "An unexpected error occurred";
			SetSignUpErrorMessage(ErrorMessage);
			toast.error(ErrorMessage);
		} finally {
			SetIsSignUpLoading(false);
		}
	};

	const HandleForgotPassword = async (Email: string): Promise<void> => {
		SetIsForgotPasswordLoading(true);
		SetForgotPasswordErrorMessage("");

		try {
			await authAPI.forgotPassword(Email);
			toast.success(
				"Password reset email sent. Please check your inbox.",
			);
			onForgotPassword?.(Email);
		} catch (ErrorInstance) {
			const ErrorMessage =
				ErrorInstance instanceof Error
					? ErrorInstance.message
					: "An unexpected error occurred";
			SetForgotPasswordErrorMessage(ErrorMessage);
			toast.error(ErrorMessage);
		} finally {
			SetIsForgotPasswordLoading(false);
		}
	};

	const HandleResetPassword = async (
		Token: string,
		Password: string,
		ConfirmPassword: string,
	): Promise<void> => {
		SetIsResetPasswordLoading(true);
		SetResetPasswordErrorMessage("");

		try {
			await authAPI.resetPassword(Token, Password);
			toast.success(
				"Password reset successful! You can now sign in with your new password.",
			);
			onResetPassword?.(Token, Password, ConfirmPassword);

			setTimeout(() => {
				Navigate("/account/signin");
			}, 2000);
		} catch (ErrorInstance) {
			const ErrorMessage =
				ErrorInstance instanceof Error
					? ErrorInstance.message
					: "An unexpected error occurred";
			SetResetPasswordErrorMessage(ErrorMessage);
			toast.error(ErrorMessage);
		} finally {
			SetIsResetPasswordLoading(false);
		}
	};

	const HandleOAuth = async (Provider?: string) => {
		SetIsOAuthLoading(true);

		try {
			// Default to github if no provider specified
			const AuthProvider =
				(Provider as "github" | "google" | "gitlab") || "github";
			await authAPI.oauth(AuthProvider);
			// oauth() redirects the browser via window.location.href,
			// so we only reach here if something went wrong
		} catch (ErrorInstance) {
			const ErrorMessage =
				ErrorInstance instanceof Error
					? ErrorInstance.message
					: "OAuth initialization failed";
			toast.error(ErrorMessage);
			SetIsOAuthLoading(false);
		}
	};

	// OAuth callback handler — extract token from URL when returning from OAuth
	useEffect(() => {
		const UrlParameters = new URLSearchParams(window.location.search);
		const OAuthToken = UrlParameters.get("token");

		if (OAuthToken && route === "signin") {
			SetSessionToken(OAuthToken);
			toast.success("OAuth authentication successful!");

			// Fetch user profile with the new token
			authAPI
				.getSession()
				.then((SessionResponse) => {
					SetCurrentUser(SessionResponse.user);
				})
				.catch(() => {
					// Session fetch failed but token is set — user can still proceed
				});

			Navigate("/account");
		}
	}, [route, Navigate]);

	return (
		<div className={`flex min-h-screen flex-col ${className || ""}`}>
			<Header
				content={
					content.header || {
						logo: { text: "Land" },
						navigation: [
							{ label: "Product", href: "/#product" },
							{
								label: "Docs",
								href: "https://github.com/CodeEditorLand/Land#readme",
							},
							{ label: "Support", href: "/support" },
						],
						actions: [],
					}
				}
			/>

			<div className="flex-1">
				{route === "signin" && (
					<DynamicSignIn
						content={signIn}
						onSubmit={HandleSignIn}
						onOAuth={HandleOAuth}
						onNavigate={Navigate}
					/>
				)}

				{route === "signup" && (
					<DynamicSignUp
						content={signUp}
						onSubmit={HandleSignUp}
						onOAuth={HandleOAuth}
						onNavigate={Navigate}
					/>
				)}

				{route === "forgot-password" && (
					<DynamicForgotPassword
						content={forgotPassword}
						onSubmit={HandleForgotPassword}
						onResend={() => HandleForgotPassword("")}
						onNavigate={Navigate}
					/>
				)}

				{route === "reset-password" && (
					<DynamicResetPassword
						content={resetPassword}
						token={resetToken || ""}
						onReset={HandleResetPassword}
						onNavigate={Navigate}
					/>
				)}
			</div>
		</div>
	);
}

export type { AccountPageContent };
export type { AccountRoute };
