"use client";

import { Auth0Provider } from "@auth0/auth0-react";

import type { ReactNode } from "react";

/**
 * Auth0 context wrapper for client-side React islands.
 * Uses Auth0 Universal Login (redirect-based) - no custom login forms needed.
 *
 * The Auth0 SPA SDK deduplicates auth state internally, so multiple
 * Auth0Provider instances (across Astro islands) share the same session.
 *
 * Enterprise SSO support:
 * - Organization: Auth0 org ID for multi-tenant Okta/SAML/Azure AD
 * - The SDK automatically handles OIDC token flows for any connection type
 * - Okta claims are normalized by Auth0 to standard OIDC format
 *
 * ─── THE UNCONFIGURED ARM ─────────────────────────────────────────────────
 * The wrapper used to mount the SDK's provider whatever it was handed. With no
 * domain or no client identifier the SDK throws on mount, and because this is a
 * context wrapper that takes the whole island down with it - so the one surface
 * a reader reaches when they cannot get in was the surface that failed hardest
 * when the environment was incomplete.
 *
 * A missing value is now a state the block can express: the children render
 * unwrapped, the credential surface still prints its frame and its report, and
 * the page can state that the provider is unconfigured. A configured environment
 * renders exactly what it rendered before, byte for byte.
 */
export default ({
	Children,
	Domain = "",
	ClientIdentifier = "",
	Organization,
}: {
	Children: ReactNode;

	Domain?: string;

	ClientIdentifier?: string;

	/** Auth0 organization ID for enterprise multi-tenant SSO */
	Organization?: string;
}) => {
	/** A provider with no tenant is not a provider: it is a page that needs one. */
	const Configured =
		Domain.trim().length > 0 && ClientIdentifier.trim().length > 0;

	if (!Configured) return <>{Children}</>;

	return (
		<Auth0Provider
			domain={Domain}
			clientId={ClientIdentifier}
			cacheLocation="localstorage"
			{...(Organization ? { organization: Organization } : {})}
			authorizationParams={{
				redirect_uri:
					typeof window !== "undefined"
						? `${window.location.origin}/OAuth/Success`
						: "https://editor.land/OAuth/Success",
				...(Organization ? { organization: Organization } : {}),
			}}
		>
			{Children}
		</Auth0Provider>
	);
};
