"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";

import { Button } from "../UI/Button";

/**
 * Auth0-aware status display for header/nav.
 * Shows user info when authenticated, Sign In button when not.
 *
 * Auth0 user object contains:
 * - name (display name or email fallback)
 * - nickname (username from Auth0, or email prefix)
 * - email
 * - picture (avatar URL)
 * - sub (Auth0 user ID)
 * - email_verified
 * - org_id (if Okta/enterprise org)
 *
 * For Okta enterprise connections, additional claims may include:
 * - org_name, groups, roles (via Auth0 rules/actions)
 */
export default ({
	SignInHref = "/Account/SignIn",
	DashboardHref = "/Dashboard",
	Compact = false,
}: {
	SignInHref?: string;
	DashboardHref?: string;
	Compact?: boolean;
}) => {
	const {
		isLoading: IsLoading,
		isAuthenticated: IsAuthenticated,
		user: User,
		logout: Auth0Logout,
	} = useAuth0();

	const { t: T } = useTranslation("header");

	if (IsLoading) {
		return (
			<span className="text-xs text-muted-foreground">{"\u2026"}</span>
		);
	}

	if (!IsAuthenticated || !User) {
		return (
			<Button
				variant="ghost"
				size="default"
				className="StaccatoButton"
				asChild>
				<a href={SignInHref}>
					{T("actions.signIn", "Sign In")}
					{"\u2001"}
					<svg
						className="h-4 w-4"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true">
						<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
						<polyline points="10 17 15 12 10 7" />
						<line x1="15" y1="12" x2="3" y2="12" />
					</svg>
				</a>
			</Button>
		);
	}

	const DisplayName =
		User.name && User.name !== User.email
			? User.name
			: User.nickname || User.email?.split("@")[0] || "User";

	const Logout = () =>
		Auth0Logout({ logoutParams: { returnTo: window.location.origin } });

	if (Compact) {
		return (
			<div className="flex items-center gap-2">
				{User.picture && (
					<img
						src={User.picture}
						alt=""
						width="24"
						height="24"
						className="h-6 w-6 rounded-none border border-[var(--Border)]"
					/>
				)}
				<a
					href={DashboardHref}
					className="text-xs font-medium text-foreground hover:underline">
					{DisplayName}
				</a>
			</div>
		);
	}

	return (
		<div className="flex items-center gap-2">
			{User.picture && (
				<img
					src={User.picture}
					alt=""
					width="28"
					height="28"
					className="h-7 w-7 rounded-none border border-[var(--Border)]"
				/>
			)}
			<a
				href={DashboardHref}
				className="text-xs font-medium text-foreground hover:underline">
				{DisplayName}
			</a>
			<Button
				variant="ghost"
				size="sm"
				className="h-7 px-2 text-xs"
				onClick={Logout}>
				{T("actions.logout", "Logout")}
			</Button>
		</div>
	);
};
