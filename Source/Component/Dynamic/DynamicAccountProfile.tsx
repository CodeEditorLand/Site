"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";

import Auth0Provider from "../Provider/Auth0Provider";
import { Button } from "../UI/Button";
import { Skeleton } from "../UI/Skeleton";

/**
 * Account profile management component.
 *
 * Shows:
 * - Profile section: avatar, name, email, provider, verified status
 * - Auth0 account management link
 * - Sign out: (1) posts Auth:Clear to SW, (2) clears legacy tokens, (3) Auth0 logout
 *
 * Wrapped in Auth0Provider for standalone Astro island use.
 */
export default ({
	Domain,
	ClientIdentifier,
}: {
	Domain?: string;
	ClientIdentifier?: string;
}) => (
	<Auth0Provider
		Children={<AccountProfileInner />}
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

const TierColorMap: Record<string, { Border: string; Background: string; Text: string; Dot: string }> = {
	Cloud: {
		Border: "border-blue-200",
		Background: "bg-blue-50",
		Text: "text-blue-700",
		Dot: "bg-blue-500",
	},
	Provider: {
		Border: "border-purple-200",
		Background: "bg-purple-50",
		Text: "text-purple-700",
		Dot: "bg-purple-500",
	},
	LocalFirst: {
		Border: "border-orange-200",
		Background: "bg-orange-50",
		Text: "text-orange-700",
		Dot: "bg-orange-500",
	},
	Enterprise: {
		Border: "border-green-200",
		Background: "bg-green-50",
		Text: "text-green-700",
		Dot: "bg-green-500",
	},
};

const AccountProfileInner = () => {
	const {
		isLoading: IsLoading,
		isAuthenticated: IsAuthenticated,
		user: User,
		error: AuthError,
		loginWithRedirect: Login,
		logout: Auth0Logout,
	} = useAuth0();

	const { t: T } = useTranslation("account");

	const HandleSignOut = () => {
		ClearAuthFromServiceWorker();
		ClearLegacyTokens();
		Auth0Logout({ logoutParams: { returnTo: window.location.origin } });
	};

	if (IsLoading) {
		return (
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-16">
				<div className="flex items-center gap-6">
					<Skeleton className="h-20 w-20 shrink-0" />
					<div className="flex-1 space-y-3">
						<Skeleton className="h-6 w-48" />
						<Skeleton className="h-4 w-64" />
						<Skeleton className="h-4 w-32" />
					</div>
				</div>
				<Skeleton className="h-40 w-full" />
				<Skeleton className="h-10 w-32" />
			</div>
		);
	}

	if (AuthError) {
		return (
			<div
				className="mx-auto max-w-2xl space-y-4 px-4 py-16"
				role="alert"
				aria-live="polite">
				<p className="text-sm text-destructive">
					{T("error", {
						defaultValue: "Authentication error",
					})}
					: {AuthError.message}
				</p>
				<Button
					variant="outline"
					onClick={() => window.location.reload()}>
					{T("tryAgain", { defaultValue: "Try again" })}
				</Button>
			</div>
		);
	}

	if (!IsAuthenticated || !User) {
		return (
			<div className="mx-auto max-w-2xl space-y-4 px-4 py-16 text-center">
				<p className="text-muted-foreground">
					{T("notSignedIn", {
						defaultValue:
							"Sign in to manage your account.",
					})}
				</p>
				<button
					type="button"
					onClick={() => Login()}
					className="StaccatoButton inline-flex items-center justify-center border border-[var(--Border)] bg-[var(--Primary)] px-6 py-2 text-sm font-medium text-white transition-all hover:opacity-90">
					{T("signInButton", { defaultValue: "Sign In" })}
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
				day: "numeric",
			})
		: "--";

	const ProviderLabel = DetectProviderLabel(User.sub);
	const ProviderIcon = DetectProviderIcon(User.sub);
	const Tier = DetectPortalTier(User.sub);
	const TierColor = TierColorMap[Tier] || TierColorMap["Cloud"]!;
	const IsEnterprise = IsEnterpriseUser(User.sub);
	const OrganizationName = (User as Record<string, unknown>)["org_name"] as
		| string
		| undefined;
	const OrganizationIdentifier = (User as Record<string, unknown>)[
		"org_id"
	] as string | undefined;

	const Auth0Domain =
		typeof window !== "undefined"
			? "dev-o5qwc17ra258xn81.eu.auth0.com"
			: "";

	return (
		<div className="mx-auto max-w-2xl space-y-8 px-4 py-16">
			{/* Profile Header */}
			<div className="flex items-start gap-6">
				{User.picture ? (
					<img
						src={User.picture}
						alt={User.name || "User avatar"}
						title={User.name || "User avatar"}
						width="80"
						height="80"
						className="h-20 w-20 shrink-0 rounded-none border border-[var(--Border)]"
					/>
				) : (
					<div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-none border border-[var(--Border)] bg-[var(--Mute)] text-2xl font-bold text-muted-foreground">
						{DisplayName.slice(0, 2).toUpperCase()}
					</div>
				)}
				<div className="flex-1">
					<h2 className="text-2xl font-bold">{DisplayName}</h2>
					<div className="mt-1 flex items-center gap-2">
						<span className="text-sm text-muted-foreground">
							{User.email || "--"}
						</span>
						{User.email_verified === true && (
							<span className="inline-flex items-center border border-green-200 bg-green-50 px-1.5 py-0 text-[10px] font-medium text-green-700">
								Verified{"\u2001"}
								<span
									className="inline-block h-1 w-1 rounded-none bg-green-500"
									aria-hidden="true"
								/>
							</span>
						)}
						{User.email_verified === false && (
							<span className="inline-flex items-center border border-yellow-200 bg-yellow-50 px-1.5 py-0 text-[10px] font-medium text-yellow-700">
								Not Verified{"\u2001"}
								<span
									className="inline-block h-1 w-1 rounded-none bg-yellow-500"
									aria-hidden="true"
								/>
							</span>
						)}
					</div>
					<div className="mt-2 flex flex-wrap gap-2">
						<span
							className={`inline-flex items-center border ${TierColor.Border} ${TierColor.Background} px-2 py-0.5 text-xs font-medium ${TierColor.Text}`}>
							{Tier}
							{"\u2001"}
							<span
								className={`h-1.5 w-1.5 rounded-none ${TierColor.Dot}`}
								aria-hidden="true"
							/>
						</span>
						{ProviderIcon && (
							<span className="inline-flex items-center gap-1 border border-[var(--Border)] bg-[var(--Mute)] px-2 py-0.5 text-xs font-medium text-muted-foreground">
								<img
									src={ProviderIcon}
									alt={ProviderLabel}
									width="12"
									height="12"
									className="h-3 w-3"
								/>
								{ProviderLabel}
							</span>
						)}
						{!ProviderIcon && (
							<span className="inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-2 py-0.5 text-xs font-medium text-muted-foreground">
								{ProviderLabel}
							</span>
						)}
					</div>
				</div>
			</div>

			{/* Enterprise SSO Banner */}
			{IsEnterprise && (
				<div className="border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
					Enterprise SSO active
					{"\u2001"}
					<span
						className="inline-block h-1.5 w-1.5 rounded-none bg-green-500"
						aria-hidden="true"
					/>
					{(OrganizationName || OrganizationIdentifier) && (
						<span className="ml-2 font-medium">
							{OrganizationName || OrganizationIdentifier}
						</span>
					)}
				</div>
			)}

			{/* Email Not Verified Warning */}
			{User.email_verified === false && (
				<div className="border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
					{T("emailNotVerified", {
						defaultValue:
							"Your email is not verified. Check your inbox for a verification link.",
					})}
				</div>
			)}

			{/* Profile Details */}
			<div className="StaccatoCard StaccatoBorderShimmer border border-[var(--Border)] bg-white">
				<div className="border-b border-[var(--Border)] px-6 py-4">
					<h3 className="font-semibold">
						{T("profileSection", {
							defaultValue: "Profile Details",
						})}
					</h3>
				</div>
				<div className="divide-y divide-[var(--Border)]">
					<div className="flex justify-between px-6 py-3 text-sm">
						<span className="text-muted-foreground">Name</span>
						<span className="font-medium">{DisplayName}</span>
					</div>
					<div className="flex justify-between px-6 py-3 text-sm">
						<span className="text-muted-foreground">Email</span>
						<span>{User.email || "--"}</span>
					</div>
					<div className="flex justify-between px-6 py-3 text-sm">
						<span className="text-muted-foreground">Provider</span>
						<span className="flex items-center gap-1.5">
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
					<div className="flex justify-between px-6 py-3 text-sm">
						<span className="text-muted-foreground">Tier</span>
						<span
							className={`inline-flex items-center border ${TierColor.Border} ${TierColor.Background} px-2 py-0.5 text-xs font-medium ${TierColor.Text}`}>
							{Tier}
							{"\u2001"}
							<span
								className={`h-1 w-1 rounded-none ${TierColor.Dot}`}
								aria-hidden="true"
							/>
						</span>
					</div>
					<div className="flex justify-between px-6 py-3 text-sm">
						<span className="text-muted-foreground">
							User ID
						</span>
						<code className="text-xs text-muted-foreground">
							{User.sub || "--"}
						</code>
					</div>
					<div className="flex justify-between px-6 py-3 text-sm">
						<span className="text-muted-foreground">
							Member Since
						</span>
						<span>{MemberSince}</span>
					</div>
					{IsEnterprise &&
						(OrganizationName || OrganizationIdentifier) && (
							<div className="flex justify-between px-6 py-3 text-sm">
								<span className="text-muted-foreground">
									Organization
								</span>
								<span className="font-medium">
									{OrganizationName ||
										OrganizationIdentifier}
								</span>
							</div>
						)}
				</div>
			</div>

			{/* Actions */}
			<div className="StaccatoCard StaccatoBorderShimmer border border-[var(--Border)] bg-white">
				<div className="border-b border-[var(--Border)] px-6 py-4">
					<h3 className="font-semibold">
						{T("actionsSection", {
							defaultValue: "Account Actions",
						})}
					</h3>
				</div>
				<div className="space-y-3 px-6 py-4">
					<a
						href={`https://${Auth0Domain}/u/profile`}
						target="_blank"
						rel="noopener noreferrer"
						className="StaccatoButton inline-flex w-full items-center justify-center border border-[var(--Border)] bg-white px-4 py-2 text-sm font-medium transition-all hover:bg-[var(--Secondary)]">
						{T("manageAuth0", {
							defaultValue:
								"Manage Account Settings",
						})}
						<span className="InlineSeparator">&#8599;</span>
					</a>
					<a
						href="/Dashboard"
						className="StaccatoButton inline-flex w-full items-center justify-center border border-[var(--Border)] bg-white px-4 py-2 text-sm font-medium transition-all hover:bg-[var(--Secondary)]">
						{T("goToDashboard", {
							defaultValue: "Go to Dashboard",
						})}
						<span className="InlineSeparator">&rarr;</span>
					</a>
					<button
						type="button"
						onClick={HandleSignOut}
						className="StaccatoButton inline-flex w-full items-center justify-center border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-50">
						{T("signOut", {
							defaultValue: "Sign Out",
						})}
					</button>
				</div>
			</div>
		</div>
	);
};
