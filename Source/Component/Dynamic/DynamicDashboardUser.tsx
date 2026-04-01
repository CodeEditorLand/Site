"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";

import Auth0Provider from "../Provider/Auth0Provider";

/**
 * Auth0-aware dashboard user panel.
 * Reads Auth0 session state and populates the Account card
 * with email, username, member since, and avatar.
 *
 * Also bridges Auth0 claims into the legacy localStorage format
 * so any remaining legacy code can read `current_user`.
 *
 * For Okta enterprise users, Auth0 normalizes claims:
 * - sub = "okta|<okta-user-id>"
 * - org_id (if orgs enabled)
 * - custom claims via Auth0 Actions/Rules
 */
export default ({
	Domain,
	ClientIdentifier,
}: {
	Domain?: string;
	ClientIdentifier?: string;
}) => (
	<Auth0Provider
		Children={<DashboardUserInner />}
		{...(Domain ? { Domain } : {})}
		{...(ClientIdentifier ? { ClientIdentifier } : {})}
	/>
);

const DashboardUserInner = () => {
	const {
		isLoading: IsLoading,
		isAuthenticated: IsAuthenticated,
		user: User,
		loginWithRedirect: Login,
	} = useAuth0();

	const { t: T } = useTranslation("common");

	// Bridge Auth0 user into localStorage for legacy code
	if (IsAuthenticated && User) {
		try {
			const LegacyUser = {
				id: User.sub || "",
				email: User.email || "",
				username: User.nickname || User.email?.split("@")[0] || "",
				displayName: User.name || "",
				avatarUrl: User.picture || "",
				provider: DetectProvider(User.sub),
				emailVerified: User.email_verified || false,
				createdAt: User.updated_at || new Date().toISOString(),
				updatedAt: User.updated_at || new Date().toISOString(),
			};
			localStorage.setItem("current_user", JSON.stringify(LegacyUser));
		} catch {
			// localStorage not available
		}
	}

	if (IsLoading) {
		return (
			<div className="space-y-3 text-sm">
				<div className="flex justify-between">
					<span className="text-muted-foreground">
						{T("dashboard.account.emailLabel", {
							defaultValue: "Email",
						})}
					</span>
					<span className="animate-pulse text-muted-foreground">
						{"\u2026"}
					</span>
				</div>
			</div>
		);
	}

	if (!IsAuthenticated || !User) {
		return (
			<div className="space-y-3 text-sm">
				<p className="text-sm text-muted-foreground">
					{T("dashboard.account.notSignedIn", {
						defaultValue: "Sign in to see your account details.",
					})}
				</p>
				<button
					type="button"
					onClick={() => Login()}
					className="StaccatoButton inline-flex items-center justify-center border border-[var(--Border)] bg-[var(--Primary)] px-4 py-1.5 text-sm font-medium text-white transition-all hover:opacity-90">
					{T("dashboard.account.signInButton", {
						defaultValue: "Sign In",
					})}
				</button>
			</div>
		);
	}

	const DisplayName =
		User.name && User.name !== User.email
			? User.name
			: User.nickname || User.email?.split("@")[0] || "User";

	const MemberSince = User.updated_at
		? new Date(User.updated_at).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
			})
		: "--";

	const ProviderLabel = DetectProviderLabel(User.sub);
	const IsEnterprise = IsEnterpriseUser(User.sub);
	const OrganizationName = (User as Record<string, unknown>)["org_name"] as
		| string
		| undefined;
	const OrganizationIdentifier = (User as Record<string, unknown>)[
		"org_id"
	] as string | undefined;

	return (
		<div className="space-y-3 text-sm">
			{User.picture && (
				<div className="flex justify-center pb-2">
					<img
						src={User.picture}
						alt={User.name || "User avatar"}
						title={User.name || "User avatar"}
						width="48"
						height="48"
						className="h-12 w-12 rounded-none border border-[var(--Border)]"
					/>
				</div>
			)}
			<div className="flex justify-between">
				<span className="text-muted-foreground">
					{T("dashboard.account.nameLabel", { defaultValue: "Name" })}
				</span>
				<span className="font-medium">{DisplayName}</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">
					{T("dashboard.account.emailLabel", {
						defaultValue: "Email",
					})}
				</span>
				<span className="text-muted-foreground">
					{User.email || "--"}
				</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">
					{T("dashboard.account.planLabel", { defaultValue: "Plan" })}
				</span>
				<span className="font-medium">
					{IsEnterprise
						? T("dashboard.account.planEnterprise", {
								defaultValue: "Enterprise",
							})
						: T("dashboard.account.planFree", {
								defaultValue: "Free",
							})}
				</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">
					{T("dashboard.account.providerLabel", {
						defaultValue: "Provider",
					})}
				</span>
				<span className="text-muted-foreground">{ProviderLabel}</span>
			</div>
			{IsEnterprise && (OrganizationName || OrganizationIdentifier) && (
				<div className="flex justify-between">
					<span className="text-muted-foreground">
						{T("dashboard.account.organizationLabel", {
							defaultValue: "Organization",
						})}
					</span>
					<span className="font-medium">
						{OrganizationName || OrganizationIdentifier}
					</span>
				</div>
			)}
			<div className="flex justify-between">
				<span className="text-muted-foreground">
					{T("dashboard.account.memberSinceLabel", {
						defaultValue: "Member Since",
					})}
				</span>
				<span className="text-muted-foreground">{MemberSince}</span>
			</div>
			{IsEnterprise && (
				<div className="mt-2 border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-700">
					{T("dashboard.account.enterpriseSSO", {
						defaultValue: "Enterprise SSO active",
					})}
					{"\u2001"}
					<span
						className="inline-block h-1.5 w-1.5 rounded-none bg-green-500"
						aria-hidden="true"
					/>
				</div>
			)}
			{User.email_verified === false && (
				<div className="mt-2 border border-yellow-200 bg-yellow-50 px-3 py-2 text-xs text-yellow-700">
					{T("dashboard.account.emailNotVerified", {
						defaultValue: "Email not verified. Check your inbox.",
					})}
				</div>
			)}
		</div>
	);
};

const DetectProvider = (
	Sub?: string,
): "email" | "github" | "google" | "gitlab" => {
	if (!Sub) return "email";
	if (Sub.startsWith("github|")) return "github";
	if (Sub.startsWith("google-oauth2|")) return "google";
	if (Sub.startsWith("gitlab|")) return "gitlab";
	return "email";
};

const DetectProviderLabel = (Sub?: string): string => {
	if (!Sub) return "Email";
	if (Sub.startsWith("github|")) return "GitHub";
	if (Sub.startsWith("google-oauth2|")) return "Google";
	if (Sub.startsWith("gitlab|")) return "GitLab";
	if (Sub.startsWith("okta|")) return "Okta SSO";
	if (Sub.startsWith("samlp|")) return "SAML SSO";
	if (Sub.startsWith("waad|")) return "Azure AD";
	return "Auth0";
};

const IsEnterpriseUser = (Sub?: string): boolean => {
	if (!Sub) return false;
	return (
		Sub.startsWith("okta|") ||
		Sub.startsWith("samlp|") ||
		Sub.startsWith("waad|")
	);
};
