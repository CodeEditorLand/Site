import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AuthAPI as AuthAPIClass } from "../../Library/API/Authentication";
import type User from "../../Library/Interface/User.js";
import { Header } from "../Layout/Header";
import { DynamicForgotPassword } from "./DynamicForgotPassword";
import { DynamicResetPassword } from "./DynamicResetPassword";
import { DynamicSignIn } from "./DynamicSignIn";
import { DynamicSignUp } from "./DynamicSignUp";
import type Property from "./Interface/Property/Page/Account.js";

const Authentication = new AuthAPIClass();

function SetSessionToken(Token: string): void {
	try {
		document.cookie = `session=${Token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`;
	} catch {
		// Cookie API not available during SSR
	}
	localStorage.setItem("session_token", Token);
}

function _ClearSessionToken(): void {
	try {
		document.cookie = "session=; path=/; max-age=0";
	} catch {
		// Cookie API not available during SSR
	}
	localStorage.removeItem("session_token");
}

function _GetCurrentUser(): User | null {
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
	_onOAuth,
	onNavigate,
}: Property) {
	const {
		signIn: SignIn,
		signUp: SignUp,
		forgotPassword: ForgotPassword,
		resetPassword: ResetPassword,
	} = content;

	const Navigate = onNavigate || NavigateToPath;

	// Loading states
	const [, SetIsSignInLoading] = useState(false);
	const [, SetIsSignUpLoading] = useState(false);
	const [, SetIsForgotPasswordLoading] =
		useState(false);
	const [, SetIsResetPasswordLoading] = useState(false);
	const [, SetIsOAuthLoading] = useState(false);

	// Error states
	const [, SetSignInErrorMessage] = useState<string>("");
	const [, SetSignUpErrorMessage] = useState<string>("");
	const [, SetForgotPasswordErrorMessage] =
		useState<string>("");
	const [, SetResetPasswordErrorMessage] =
		useState<string>("");

	const HandleSignIn = async (
		Email: string,
		Password: string,
	): Promise<void> => {
		SetIsSignInLoading(true);
		SetSignInErrorMessage("");

		try {
			const ResponseData = await Authentication.Login(Email, Password);
			const { session: SessionData, user: UserData } = ResponseData;
			SetSessionToken(SessionData.token);
			SetCurrentUser(UserData);

			toast.success(`Welcome back, ${UserData.username}!`);
			onSignIn?.(Email, Password);

			// Redirect to account dashboard
			setTimeout(() => {
				Navigate("/Dashboard");
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
			const ResponseData = await Authentication.Register(
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
				Navigate("/Verify");
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
			await Authentication.ForgotPassword(Email);
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
			await Authentication.ResetPassword(Token, Password);
			toast.success(
				"Password reset successful! You can now sign in with your new password.",
			);
			onResetPassword?.(Token, Password, ConfirmPassword);

			setTimeout(() => {
				Navigate("/Account/SignIn");
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
			await Authentication.OAuth(AuthProvider);
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

	// OAuth callback handler:extract token from URL when returning from OAuth
	useEffect(() => {
		const UrlParameters = new URLSearchParams(window.location.search);
		const OAuthToken = UrlParameters.get("token");

		if (OAuthToken && route === "signin") {
			SetSessionToken(OAuthToken);
			toast.success("OAuth authentication successful!");

			// Fetch user profile with the new token
			Authentication.GetSession()
				.then((SessionResponse) => {
					SetCurrentUser(SessionResponse.user);
				})
				.catch(() => {
					// Session fetch failed but token is set:user can still proceed
				});

			Navigate("/Dashboard");
		}
	}, [route, Navigate]);

	return (
		<div className={`flex min-h-screen flex-col ${className || ""}`}>
			<Header {...(content.header ? { content: content.header } : {})} />

			<div className="flex-1">
				{route === "signin" && (
					<DynamicSignIn
						content={SignIn}
						onSubmit={HandleSignIn}
						onOAuth={HandleOAuth}
						onNavigate={Navigate}
					/>
				)}

				{route === "signup" && (
					<DynamicSignUp
						content={SignUp}
						onSubmit={HandleSignUp}
						onOAuth={HandleOAuth}
						onNavigate={Navigate}
					/>
				)}

				{route === "forgot-password" && (
					<DynamicForgotPassword
						content={ForgotPassword}
						onSubmit={HandleForgotPassword}
						onResend={() => HandleForgotPassword("")}
						onNavigate={Navigate}
					/>
				)}

				{route === "reset-password" && (
					<DynamicResetPassword
						content={ResetPassword}
						token={resetToken || ""}
						onReset={HandleResetPassword}
						onNavigate={Navigate}
					/>
				)}
			</div>
		</div>
	);
}
