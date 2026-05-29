"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";

import Auth0Provider from "../Provider/Auth0Provider";
import { Button } from "../UI/Button";
import { Skeleton } from "../UI/Skeleton";

/**
 * Auth0-aware dashboard user panel.
 * Reads Auth0 session state and populates the Account card
 * with email, username, member since, avatar, verified badge,
 * provider label, and sign out button.
 *
 * Also bridges Auth0 claims into the legacy localStorage format
 * so any remaining legacy code can read `current_user`.
 *
 * Sign-out clears Auth0 session, posts Auth:Clear to ServiceWorker,
 * and removes legacy localStorage/cookie tokens.
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

const ClearAuthFromServiceWorker = (): void => {
	try {
		if (
			typeof navigator === "undefined" ||
			!navigator.serviceWorker?.controller
		)
			return;

		navigator.serviceWorker.controller.postMessage({ Type: "Auth:Clear" });
	} catch {
		// ServiceWorker not available
	}
};

const ClearLegacyTokens = (): void => {
	try {
		localStorage.removeItem("session_token");
		localStorage.removeItem("current_user");
		document.cookie =
			"session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
	} catch {
		// Storage not available
	}
};

const DashboardUserInner = () => {
	const {
		isLoading: IsLoading,
		isAuthenticated: IsAuthenticated,
		user: User,
		error: AuthError,
		loginWithRedirect: Login,
		logout: Auth0Logout,
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

	const HandleSignOut = () => {
		ClearAuthFromServiceWorker();
		ClearLegacyTokens();
		Auth0Logout({ logoutParams: { returnTo: window.location.origin } });
	};

	if (IsLoading) {
		return (
			<div
				className="space-y-3"
				aria-label={T("dashboard.loading", {
					defaultValue: "Loading account...",
				})}>
				<Skeleton className="mx-auto h-12 w-12" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-4/5" />
				<Skeleton className="h-4 w-3/5" />
				<Skeleton className="h-4 w-2/5" />
			</div>
		);
	}

	if (AuthError) {
		return (
			<div className="space-y-3" role="alert" aria-live="polite">
				<p className="text-destructive">
					{T("dashboard.error", {
						defaultValue: "Failed to load account.",
					})}
				</p>
				<p className="text-muted-foreground">{AuthError.message}</p>
				<Button
					variant="outline"
					size="sm"
					onClick={() => window.location.reload()}>
					{T("tryAgain", { defaultValue: "Try again" })}
				</Button>
			</div>
		);
	}

	if (!IsAuthenticated || !User) {
		return (
			<div className="space-y-3">
				<p className="text-muted-foreground">
					{T("dashboard.account.notSignedIn", {
						defaultValue: "Sign in to see your account details.",
					})}
				</p>
				<button
					type="button"
					onClick={() => Login()}
					className="StaccatoButton inline-flex items-center justify-center bg-[var(--Primary)] px-4 py-1.5 font-medium text-white transition-all hover:opacity-90">
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
	const ProviderIcon = DetectProviderIcon(User.sub);
	const IsEnterprise = IsEnterpriseUser(User.sub);
	const OrganizationName = (User as Record<string, unknown>)["org_name"] as
		| string
		| undefined;
	const OrganizationIdentifier = (User as Record<string, unknown>)[
		"org_id"
	] as string | undefined;

	return (
		<div className="space-y-3">
			{/* Avatar */}
			<div className="flex justify-center pb-2">
				{User.picture ? (
					<img
						src={User.picture}
						alt={`${DisplayName} avatar`}
						title={DisplayName}
						width="48"
						height="48"
						loading="lazy"
						className="h-12 w-12 rounded-none"
						onError={(Event) => {
							(Event.target as HTMLImageElement).style.display =
								"none";
							const Fallback = (Event.target as HTMLImageElement)
								.nextElementSibling as HTMLElement | null;
							if (Fallback) Fallback.style.display = "flex";
						}}
					/>
				) : null}
				<div
					className={`${User.picture ? "hidden" : "flex"} h-12 w-12 items-center justify-center rounded-none bg-[var(--Mute)] text-lg font-bold text-muted-foreground`}
					aria-hidden="true">
					{DisplayName.slice(0, 1).toUpperCase()}
				</div>
			</div>

			{/* Display Name */}
			<div className="flex justify-between">
				<span className="text-muted-foreground">
					{T("dashboard.account.nameLabel", { defaultValue: "Name" })}
				</span>
				<span className="font-medium">{DisplayName}</span>
			</div>

			{/* Email + Verified Badge */}
			<div className="flex justify-between">
				<span className="text-muted-foreground">
					{T("dashboard.account.emailLabel", {
						defaultValue: "Email",
					})}
				</span>
				<span className="flex items-center gap-1.5">
					<span className="text-muted-foreground">
						{User.email || "--"}
					</span>
					{User.email_verified === true && (
						<span
							className="inline-flex items-center border border-green-200 bg-green-50 px-1.5 py-0 text-[10px] font-medium text-green-700"
							title={T("dashboard.account.emailVerifiedTitle", {
								defaultValue: "Email verified",
							})}>
							{T("dashboard.account.emailVerifiedBadge", {
								defaultValue: "Verified",
							})}
							{"\u2001"}✅
						</span>
					)}
				</span>
			</div>

			{/* Plan */}
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

			{/* Auth Provider */}
			<div className="flex justify-between">
				<span className="text-muted-foreground">
					{T("dashboard.account.providerLabel", {
						defaultValue: "Provider",
					})}
				</span>
				<span className="flex items-center gap-1.5 text-muted-foreground">
					{ProviderIcon && (
						<img
							src={ProviderIcon}
							alt={ProviderLabel}
							width="14"
							height="14"
							className="h-3.5 w-3.5"
						/>
					)}
					{ProviderLabel}
				</span>
			</div>

			{/* Organization (Enterprise only) */}
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

			{/* Member Since */}
			<div className="flex justify-between">
				<span className="text-muted-foreground">
					{T("dashboard.account.memberSinceLabel", {
						defaultValue: "Member Since",
					})}
				</span>
				<span className="text-muted-foreground">{MemberSince}</span>
			</div>

			{/* Enterprise SSO Banner */}
			{IsEnterprise && (
				<div className="mt-2 border border-green-200 bg-green-50 px-3 py-2 text-green-700">
					{T("dashboard.account.enterpriseSSO", {
						defaultValue: "Enterprise SSO active",
					})}
					{"\u2001"}🏢
				</div>
			)}

			{/* Email Not Verified Warning */}
			{User.email_verified === false && (
				<div className="mt-2 border border-yellow-200 bg-yellow-50 px-3 py-2 text-yellow-700">
					{T("dashboard.account.emailNotVerified", {
						defaultValue: "Email not verified. Check your inbox.",
					})}
					{"\u2001"}⚠️
				</div>
			)}

			{/* Sign Out Button */}
			<div className="mt-3 flex gap-2">
				<a
					href="/Account"
					className="StaccatoButton inline-flex flex-1 items-center justify-center bg-white px-3 py-1.5 font-medium transition-all hover:bg-[var(--Secondary)]">
					{T("dashboard.account.manageButton", {
						defaultValue: "Manage",
					})}
				</a>
				<button
					type="button"
					onClick={HandleSignOut}
					className="StaccatoButton inline-flex flex-1 items-center justify-center bg-white px-3 py-1.5 font-medium text-red-600 transition-all hover:bg-red-50">
					{T("dashboard.account.signOutButton", {
						defaultValue: "Sign Out",
					})}
				</button>
			</div>
		</div>
	);
};

const DetectProvider = (
	Sub?: string,
): "email" | "github" | "google" | "gitlab" | "okta" => {
	if (!Sub) return "email";
	if (Sub.startsWith("github|")) return "github";
	if (Sub.startsWith("google-oauth2|")) return "google";
	if (Sub.startsWith("gitlab|")) return "gitlab";
	if (Sub.startsWith("okta|")) return "okta";
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

const DetectProviderIcon = (Sub?: string): string | null => {
	if (!Sub) return null;
	if (Sub.startsWith("github|")) return "/Image/GitHub.svg";
	if (Sub.startsWith("google-oauth2|")) return "/Image/Google.svg";
	if (Sub.startsWith("gitlab|")) return "/Image/GitLab.svg";
	if (Sub.startsWith("okta|")) return "/Image/Okta.svg";
	if (Sub.startsWith("waad|")) return "/Image/Microsoft.svg";
	return null;
};

/**
 * Detect the Portal tier based on the Auth0 `sub` claim prefix.
 * - Cloud: direct auth0| database connection
 * - Provider: github|, google-oauth2|, gitlab| OAuth
 * - Enterprise: okta|, samlp|, waad| SSO
 * - LocalFirst: no cloud auth (null sub)
 */
const DetectPortalTier = (
	Sub?: string,
): "Cloud" | "Provider" | "LocalFirst" | "Enterprise" => {
	if (!Sub) return "LocalFirst";
	if (Sub.startsWith("github|")) return "Provider";
	if (Sub.startsWith("google-oauth2|")) return "Provider";
	if (Sub.startsWith("gitlab|")) return "Provider";
	if (Sub.startsWith("okta|")) return "Enterprise";
	if (Sub.startsWith("samlp|")) return "Enterprise";
	if (Sub.startsWith("waad|")) return "Enterprise";
	return "Cloud";
};

const IsEnterpriseUser = (Sub?: string): boolean => {
	if (!Sub) return false;
	return (
		Sub.startsWith("okta|") ||
		Sub.startsWith("samlp|") ||
		Sub.startsWith("waad|")
	);
};
