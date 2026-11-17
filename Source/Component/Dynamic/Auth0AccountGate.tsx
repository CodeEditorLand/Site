"use client";

import { useAuth0 } from "@auth0/auth0-react";

import { useEffect } from "react";

import { useTranslation } from "react-i18next";

import { DynamicButton } from "./DynamicButton";

import { DynamicStateReport, StateLabel } from "./DynamicStateReport";

/**
 * Auth0 redirect-based account gate.
 *
 * - "signin" route: triggers loginWithRedirect()
 * - "signup" route: shows the registration-closed report while registration
 *   is disabled
 * - If already authenticated: shows the signed-in report with the two
 *   destinations that exist (Dashboard, Sign Out)
 *
 * This replaces custom email/password forms - Auth0 Universal Login
 * handles enabled Auth0 UI such as login, password reset, MFA, social, and SSO.
 *
 * Every branch below is a report, not a bare outcome: a status line saying
 * what this state is, one sentence saying what happened, and the one action
 * that is actually available from it. The page frame (header, /KICKER, h1,
 * supporting sentence, alternate action) belongs to the route's AuthShell -
 * this component renders inside that frame and owns no page chrome.
 */
export default ({
	Route,
	Connection,
	Organization,
}: {
	Route: "signin" | "signup";

	/** Auth0 enterprise connection name (e.g. "okta-acme" for Okta SSO) */
	Connection?: string;

	/** Auth0 organization ID (e.g. "org_abc123" for multi-tenant Okta) */
	Organization?: string;
}) => {
	const {
		isLoading: IsLoading,

		isAuthenticated: IsAuthenticated,

		error: Error,

		loginWithRedirect: Login,

		logout: Auth0Logout,

		user: User,

		getAccessTokenSilently: GetToken,
	} = useAuth0();

	const { t: T } = useTranslation("account");

	const RegistrationEnabled = false;

	// Build enterprise SSO params (Okta, SAML, Azure AD, etc.)
	const EnterpriseParams: Record<string, string> = {};

	if (Connection) EnterpriseParams["connection"] = Connection;

	if (Organization) EnterpriseParams["organization"] = Organization;

	// Check URL for enterprise hints: ?connection=okta-acme&organization=org_abc123
	const URLConnection =
		typeof window !== "undefined"
			? new URLSearchParams(window.location.search).get("connection")
			: null;

	const URLOrganization =
		typeof window !== "undefined"
			? new URLSearchParams(window.location.search).get("organization")
			: null;

	if (URLConnection) EnterpriseParams["connection"] = URLConnection;

	if (URLOrganization) EnterpriseParams["organization"] = URLOrganization;

	const LoginWithParams = (Extra?: Record<string, string>) =>
		Login({
			authorizationParams: {
				...EnterpriseParams,
				...Extra,
			},
		});

	const Signup = () => LoginWithParams({ screen_hint: "signup" });

	const Logout = () =>
		Auth0Logout({ logoutParams: { returnTo: window.location.origin } });

	// Auto-redirect when already authenticated.
	// Syncs the Auth0 access token into the SW's CACHE_AUTH first so the
	// SW auth gate on /Dashboard lets the navigation through.
	useEffect(() => {
		if (IsLoading || !IsAuthenticated) return;

		(async () => {
			try {
				const Token = await GetToken();

				if (
					typeof navigator !== "undefined" &&
					navigator.serviceWorker?.controller
				) {
					await new Promise<void>((Resolve) => {
						const Timeout = setTimeout(Resolve, 5000);

						const OnMessage = (Event: MessageEvent) => {
							if (Event.data?.Type === "Auth:Written") {
								clearTimeout(Timeout);

								navigator.serviceWorker.removeEventListener(
									"message",

									OnMessage,
								);

								Resolve();
							}
						};

						navigator.serviceWorker.addEventListener(
							"message",

							OnMessage,
						);

						navigator.serviceWorker.controller!.postMessage({
							Type: "Auth:Write",
							Token,
							ExpiresAt: Date.now() + 3600_000,
							UserId: User?.sub ?? "",
						});
					});
				}
			} catch {
				// proceed even if SW sync fails
			}

			const Next =
				typeof window !== "undefined"
					? new URLSearchParams(window.location.search).get("next")
					: null;

			window.location.replace(Next || "/Dashboard");
		})();
	}, [IsLoading, IsAuthenticated]);

	// Auto-redirect to Auth0 Universal Login if not authenticated
	useEffect(() => {
		if (IsLoading || IsAuthenticated) return;

		if (Route === "signup" && !RegistrationEnabled) return;

		if (Route === "signup") {
			Signup();
		} else {
			LoginWithParams();
		}
	}, [IsLoading, IsAuthenticated, Route]);

	if (Route === "signup" && !RegistrationEnabled) {
		return (
			<DynamicStateReport
				Label={T("auth.signUp.closedStatus", {
					defaultValue: StateLabel.Unavailable,
				})}
				Tone="ink"
				Sentence={T("registrationComingSoon.description", {
					defaultValue:
						"Account creation is disabled while the portal flow is being finished. Existing sign-in remains available for configured accounts.",
				})}
				Action={
					<a className="inline-block" href="/Account/SignIn">
						<jelly-button className="auth-shell__primary">
							{T("registrationComingSoon.signIn", {
								defaultValue: "Sign In",
							})}
						</jelly-button>
					</a>
				}
			/>
		);
	}

	if (IsLoading) {
		return (
			<DynamicStateReport
				Label={T("auth.signIn.checkingStatus", {
					defaultValue: StateLabel.Loading,
				})}
				Tone="ink"
				Loading
				Sentence={T("loading", { defaultValue: "Loading..." })}
				Action={
					<a href="/" className="auth-shell__alternate">
						{T("auth.signIn.leave", {
							defaultValue: "Back to the editor",
						})}
					</a>
				}
			/>
		);
	}

	if (Error) {
		return (
			<DynamicStateReport
				Role="alert"
				Label={T("auth.signIn.failedStatus", {
					defaultValue: StateLabel.Interrupted,
				})}
				Tone="strong"
				Sentence={
					<>
						{T("error", { defaultValue: "Authentication error" })}:{" "}
						{Error.message}
					</>
				}
				Action={
					<DynamicButton
						Content={{
							Text: T("tryAgain", {
								defaultValue: "Try again",
							}),
							Variant: "default",
							ClassName: "auth-shell__primary",
						}}
						OnAction={() => Login()}
					/>
				}
			/>
		);
	}

	if (IsAuthenticated && User) {
		const DisplayName =
			User.name && User.name !== User.email
				? User.name
				: User.nickname || User.email?.split("@")[0] || "User";

		return (
			<DynamicStateReport
				Label={T("auth.signIn.signedInStatus", {
					defaultValue: StateLabel.Active,
				})}
				Tone="specimen"
				Sentence={T("auth.signIn.signedInSentence", {
					defaultValue:
						"You are signed in. This page continues to your dashboard.",
				})}
				Action={
					<>
						<div className="auth-shell__identity">
							{User.picture && (
								<img
									src={User.picture}
									alt={User.name || "User avatar"}
									title={User.name || "User avatar"}
									width="64"
									height="64"
									className="auth-shell__avatar"
								/>
							)}

							<p className="auth-shell__note">{DisplayName}</p>

							<p className="auth-shell__note">{User.email}</p>

							{User.email_verified === false && (
								<p className="auth-shell__note">
									{T("emailNotVerified", {
										defaultValue:
											"Email not verified. Check your inbox.",
									})}
								</p>
							)}
						</div>

						<a className="inline-block" href="/Dashboard">
							<jelly-button className="auth-shell__primary">
								{T("dashboard", {
									defaultValue: "Go to Dashboard",
								})}
							</jelly-button>
						</a>

						<button
							type="button"
							className="auth-shell__alternate"
							onClick={Logout}
						>
							{T("logout", {
								defaultValue: "Sign Out",
							})}
						</button>
					</>
				}
			/>
		);
	}

	// Not authenticated, not loading - redirect is in progress
	return (
		<DynamicStateReport
			Label={T("auth.signIn.redirectingStatus", {
				defaultValue: StateLabel.Loading,
			})}
			Tone="ink"
			Loading
			Sentence={T("redirecting", {
				defaultValue: "Redirecting to sign in...",
			})}
			Action={
				<a href="/" className="auth-shell__alternate">
					{T("auth.signIn.leave", {
						defaultValue: "Back to the editor",
					})}
				</a>
			}
		/>
	);
};
