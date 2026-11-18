"use client";

import { useAuth0 } from "@auth0/auth0-react";

import { ThemeImage } from "@Library/Theme";

import {
	Building2,
	CircleCheck,
	Eye,
	EyeOff,
	TriangleAlert,
} from "lucide-react";

import { useState, type ReactNode } from "react";

import { useTranslation } from "react-i18next";

import Auth0Provider from "../Provider/Auth0Provider";

import { Button } from "../UI/Button";

import { DynamicStateReport, StateLabel } from "./DynamicStateReport";

const Pii = ({
	children,
	visible,
}: {
	children: ReactNode;

	visible: boolean;
}) => (
	<span
		className={`transition-all duration-200 ${visible ? "" : "select-none blur-sm"}`}
	>
		{children}
	</span>
);

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

	const [PIIVisible, SetPIIVisible] = useState(false);

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
		/* The baseline's panel-sized loading state: a centred avatar block over
		   four bars of descending width, inside the panel the account lands in.
		   The state's sentence and its Reload action stay under the skeleton so
		   the branch still says what it is waiting for. */
		return (
			<>
				<div className="space-y-3" aria-label="Loading account...">
					<div
						className="flat mx-auto h-12 w-12 animate-pulse bg-accent"
						data-slot="skeleton"
					/>

					<div
						className="flat h-4 w-full animate-pulse bg-accent"
						data-slot="skeleton"
					/>

					<div
						className="flat h-4 w-4/5 animate-pulse bg-accent"
						data-slot="skeleton"
					/>

					<div
						className="flat h-4 w-3/5 animate-pulse bg-accent"
						data-slot="skeleton"
					/>

					<div
						className="flat h-4 w-2/5 animate-pulse bg-accent"
						data-slot="skeleton"
					/>
				</div>

				<DynamicStateReport
					Label={StateLabel.Loading}
					Loading
					Sentence={T("account:dashboardPage.surface.state.loading", {
						defaultValue:
							"Reading your session from the identity provider. The account rows appear as soon as it answers.",
					})}
					Action={
						<button
							type="button"
							className="auth-shell__alternate"
							onClick={() => window.location.reload()}
						>
							{T("dashboard.reload", { defaultValue: "Reload" })}
						</button>
					}
				/>
			</>
		);
	}

	if (AuthError) {
		return (
			<DynamicStateReport
				Role="alert"
				Label={StateLabel.Interrupted}
				Sentence={
					<>
						{T("account:dashboardPage.surface.state.error", {
							defaultValue:
								"The identity provider did not answer, so no account rows can be shown. Reloading asks it again.",
						})}{" "}
						{T("dashboard.error", {
							defaultValue:
								"Could not load your account. Please refresh.",
						})}{" "}
						{AuthError.message}
					</>
				}
				Action={
					<Button
						variant="outline"
						size="sm"
						onClick={() => window.location.reload()}
					>
						{T("tryAgain", { defaultValue: "Try again" })}
					</Button>
				}
			/>
		);
	}

	if (!IsAuthenticated || !User) {
		return (
			<DynamicStateReport
				Label={StateLabel.SignInRequired}
				Sentence={T("account:dashboardPage.surface.state.signedOut", {
					defaultValue:
						"You are not signed in. Sign in to see your account.",
				})}
				Action={
					<button
						type="button"
						onClick={() => Login()}
						className="auth-shell__primary emphasis-expressive"
					>
						{T("dashboard.account.signInButton", {
							defaultValue: "Sign In",
						})}
					</button>
				}
			/>
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
		string | undefined;

	const OrganizationIdentifier = (User as Record<string, unknown>)[
		"org_id"
	] as string | undefined;

	// A session with no identifying field is an empty record, not an account
	// row full of dashes: the ledger cannot say who this is, so the band says so
	// and offers the one action that re-requests the profile.
	const HasNoProfile = !User.email && !User.name && !User.nickname;

	return (
		<div className="space-y-3">
			{HasNoProfile ? (
				<DynamicStateReport
					Label={StateLabel.Empty}
					Sentence={T("account:dashboardPage.surface.state.noEmail", {
						defaultValue:
							"No email on this account. The provider did not return one.",
					})}
					Action={
						<button
							type="button"
							className="auth-shell__alternate"
							onClick={HandleSignOut}
						>
							{T("logout", { defaultValue: "Sign Out" })}
						</button>
					}
				/>
			) : null}

			{/* Privacy toggle */}
			<div className="flex justify-end">
				<button
					type="button"
					onClick={() => SetPIIVisible((v) => !v)}
					aria-label={
						PIIVisible ? "Hide personal data" : "Show personal data"
					}
					className="text-card-foreground transition-colors hover:text-card-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"
				>
					{PIIVisible ? (
						<EyeOff className="h-4 w-4" aria-hidden="true" />
					) : (
						<Eye className="h-4 w-4" aria-hidden="true" />
					)}
				</button>
			</div>

			{/* Avatar */}
			<div
				className={`flex justify-center pb-2 transition-all duration-200 ${PIIVisible ? "" : "blur-sm"}`}
			>
				{User.picture ? (
					<img
						src={User.picture}

						alt={`${DisplayName} avatar`}

						title={DisplayName}

						width="48"
						height="48"
						loading="lazy"
						className="flat h-12 w-12"
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
					className={`${User.picture ? "hidden" : "flex"} flat bg-mute h-12 w-12 items-center justify-center text-lg font-medium text-foreground`}
					aria-hidden="true"
				>
					<Pii visible={PIIVisible}>
						{DisplayName.slice(0, 1).toUpperCase()}
					</Pii>
				</div>
			</div>

			{/* The account's own facts: a ledger, not a second list of rows.
			    `record-ledger` is the published key/value surface, so the
			    island reuses it instead of retyping a definition list. */}
			<dl className="record-ledger record-ledger--1">
				<div className="record-ledger__row">
					<dt className="record-ledger__key">
						{T("dashboard.account.nameLabel", {
							defaultValue: "Name",
						})}
					</dt>
					<dd className="record-ledger__value">
						<Pii visible={PIIVisible}>{DisplayName}</Pii>
					</dd>
				</div>

				<div className="record-ledger__row">
					<dt className="record-ledger__key">
						{T("dashboard.account.emailLabel", {
							defaultValue: "Email",
						})}
					</dt>
					<dd className="record-ledger__value">
						<span className="flex flex-wrap items-center gap-1.5">
							{User.email ? (
								<Pii visible={PIIVisible}>{User.email}</Pii>
							) : (
								<span className="surface__state">
									{T(
										"account:dashboardPage.surface.state.noEmail",
										{
											defaultValue:
												"No email on this account. The provider did not return one.",
										},
									)}
								</span>
							)}
							{User.email_verified === true && (
								<span
									className="inline-flex items-center border border-green-200 bg-green-50 px-1.5 py-0 text-sm font-medium text-green-700"
									title={T(
										"dashboard.account.emailVerifiedTitle",
										{
											defaultValue: "Email verified",
										},
									)}
								>
									{T("dashboard.account.emailVerifiedBadge", {
										defaultValue: "Verified",
									})}{" "}
									<CircleCheck
										aria-hidden="true"
										className="text-grpc inline h-4 w-4 align-[-3px]"
									/>
								</span>
							)}
						</span>
					</dd>
				</div>

				<div className="record-ledger__row">
					<dt className="record-ledger__key">
						{T("dashboard.account.planLabel", {
							defaultValue: "Plan",
						})}
					</dt>
					<dd className="record-ledger__value">
						{IsEnterprise
							? T("dashboard.account.planEnterprise", {
									defaultValue: "Enterprise",
								})
							: T("dashboard.account.planFree", {
									defaultValue: "Free",
								})}
					</dd>
				</div>

				<div className="record-ledger__row">
					<dt className="record-ledger__key">
						{T("dashboard.account.providerLabel", {
							defaultValue: "Provider",
						})}
					</dt>
					<dd className="record-ledger__value">
						<span className="flex items-center gap-1.5">
							{ProviderIcon && (
								<ThemeImage
									src={ProviderIcon}
									alt={ProviderLabel}
									width={14}
									height={14}
									className="h-3.5 w-3.5"
								/>
							)}
							<Pii visible={PIIVisible}>{ProviderLabel}</Pii>
						</span>
					</dd>
				</div>

				{IsEnterprise &&
					(OrganizationName || OrganizationIdentifier) && (
						<div className="record-ledger__row">
							<dt className="record-ledger__key">
								{T("dashboard.account.organizationLabel", {
									defaultValue: "Organization",
								})}
							</dt>
							<dd className="record-ledger__value">
								<Pii visible={PIIVisible}>
									{OrganizationName || OrganizationIdentifier}
								</Pii>
							</dd>
						</div>
					)}

				<div className="record-ledger__row">
					<dt className="record-ledger__key">
						{T("dashboard.account.memberSinceLabel", {
							defaultValue: "Member Since",
						})}
					</dt>
					<dd className="record-ledger__value">
						{User.updated_at ? (
							<Pii visible={PIIVisible}>{MemberSince}</Pii>
						) : (
							<span className="surface__state">
								{T(
									"account:dashboardPage.surface.state.noDate",
									{
										defaultValue:
											"Not recorded. The provider returned no update date for this account.",
									},
								)}
							</span>
						)}
					</dd>
				</div>
			</dl>

			{/* Enterprise SSO Banner */}
			{IsEnterprise && (
				<div className="mt-2 border border-green-200 bg-green-50 px-3 py-2 text-green-700">
					{T("dashboard.account.enterpriseSSO", {
						defaultValue: "Enterprise SSO active",
					})}{" "}
					<Building2
						aria-hidden="true"
						className="inline h-4 w-4 align-[-3px]"
					/>
				</div>
			)}

			{/* Email Not Verified Warning */}
			{User.email_verified === false && (
				<div className="mt-2 border border-yellow-200 bg-yellow-50 px-3 py-2 text-yellow-700">
					{T("dashboard.account.emailNotVerified", {
						defaultValue: "Email not verified. Check your inbox.",
					})}{" "}
					<TriangleAlert
						aria-hidden="true"
						className="inline h-4 w-4 align-[-3px]"
					/>
				</div>
			)}

			{/* Sign Out Button */}
			<p className="surface__state mt-3">
				{T("account:dashboardPage.surface.state.actions", {
					defaultValue:
						"Manage opens your account page. Sign Out ends the Auth0 session and clears the local token.",
				})}
			</p>
			<div className="mt-3 flex gap-2">
				<a
					href="/Account"
					className="StaccatoButton inline-flex flex-1 items-center justify-center bg-card px-3 py-1.5 font-medium transition-all hover:bg-secondary"
				>
					{T("dashboard.account.manageButton", {
						defaultValue: "Manage",
					})}
				</a>
				<button
					type="button"
					onClick={HandleSignOut}
					className="StaccatoButton inline-flex flex-1 items-center justify-center bg-card px-3 py-1.5 font-medium text-red-600 transition-all hover:bg-red-50"
				>
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
