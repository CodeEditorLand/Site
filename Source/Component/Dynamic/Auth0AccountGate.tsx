"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "../UI/Button";
import { Header } from "../Layout/Header";

/**
 * Auth0 redirect-based account gate.
 *
 * - "signin" route: triggers loginWithRedirect()
 * - "signup" route: triggers loginWithRedirect({ screen_hint: "signup" })
 * - If already authenticated: shows user profile + logout
 *
 * This replaces custom email/password forms — Auth0 Universal Login
 * handles all UI (login, signup, password reset, MFA, social, enterprise SSO).
 */
export default ({
	Route,
	Header: HeaderContent,
}: {
	Route: "signin" | "signup";
	Header?: {
		logo?: { text: string };
		navigation?: Array<{ label: string; href: string; icon?: string }>;
		actions?: Array<{
			type?: string;
			text: string;
			variant?: string;
			size?: string;
			href?: string;
			icon?: string;
		}>;
	};
}) => {
	const {
		isLoading: IsLoading,
		isAuthenticated: IsAuthenticated,
		error: Error,
		loginWithRedirect: Login,
		logout: Auth0Logout,
		user: User,
	} = useAuth0();

	const { t: T } = useTranslation("account");

	const Signup = () =>
		Login({ authorizationParams: { screen_hint: "signup" } });

	const Logout = () =>
		Auth0Logout({ logoutParams: { returnTo: window.location.origin } });

	// Auto-redirect to Auth0 Universal Login if not authenticated
	useEffect(() => {
		if (IsLoading || IsAuthenticated) return;

		if (Route === "signup") {
			Signup();
		} else {
			Login();
		}
	}, [IsLoading, IsAuthenticated, Route]);

	if (IsLoading) {
		return (
			<div className="flex min-h-screen flex-col">
				<Header {...(HeaderContent ? { content: HeaderContent } : {})} />
				<div className="flex flex-1 items-center justify-center">
					<p className="text-muted-foreground text-sm">
						{T("loading", { defaultValue: "Loading..." })}
					</p>
				</div>
			</div>
		);
	}

	if (Error) {
		return (
			<div className="flex min-h-screen flex-col">
				<Header {...(HeaderContent ? { content: HeaderContent } : {})} />
				<div className="flex flex-1 flex-col items-center justify-center gap-4 px-4">
					<p className="text-destructive text-sm">
						{T("error", {
							defaultValue: "Authentication error",
						})}
						: {Error.message}
					</p>
					<Button
						variant="outline"
						onClick={() => Login()}
					>
						{T("tryAgain", {
							defaultValue: "Try again",
						})}
					</Button>
				</div>
			</div>
		);
	}

	if (IsAuthenticated && User) {
		return (
			<div className="flex min-h-screen flex-col">
				<Header {...(HeaderContent ? { content: HeaderContent } : {})} />
				<div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-6 px-4">
					<Button
						variant="outline"
						className="w-full"
						onClick={Logout}
					>
						{T("logout", {
							defaultValue: "Logout",
						})}
					</Button>

					<Button
						variant="ghost"
						className="w-full"
						asChild
					>
						<a href="/Dashboard">
							{T("dashboard", {
								defaultValue: "Account Dashboard",
							})}
						</a>
					</Button>

					<h2 className="text-lg font-semibold">
						{T("profile", {
							defaultValue: "User Profile",
						})}
					</h2>

					<p className="text-muted-foreground text-sm">
						{T("loggedInAs", {
							defaultValue: "Logged in as",
						})}{" "}
						{User.email}
					</p>

					<pre className="w-full overflow-auto rounded-none border border-[var(--Border)] bg-white p-4 text-xs">
						{JSON.stringify(User, null, 2)}
					</pre>
				</div>
			</div>
		);
	}

	// Not authenticated, not loading — redirect is in progress
	return (
		<div className="flex min-h-screen flex-col">
			<Header {...(HeaderContent ? { content: HeaderContent } : {})} />
			<div className="flex flex-1 items-center justify-center">
				<p className="text-muted-foreground text-sm">
					{T("redirecting", {
						defaultValue: "Redirecting to sign in...",
					})}
				</p>
			</div>
		</div>
	);
};
