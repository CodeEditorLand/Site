"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import type { ReactNode } from "react";

/**
 * Auth0 context wrapper for client-side React islands.
 * Uses Auth0 Universal Login (redirect-based) — no custom login forms needed.
 *
 * The Auth0 SPA SDK deduplicates auth state internally, so multiple
 * Auth0Provider instances (across Astro islands) share the same session.
 *
 * Enterprise SSO support:
 * - Organization: Auth0 org ID for multi-tenant Okta/SAML/Azure AD
 * - The SDK automatically handles OIDC token flows for any connection type
 * - Okta claims are normalized by Auth0 to standard OIDC format
 */
export default ({
	Children,
	Domain = "dev-o5qwc17ra258xn81.eu.auth0.com",
	ClientIdentifier = "YPifTeOpZzlXLYKQ1A5XmRUJxGxwUqRC",
	Organization,
}: {
	Children: ReactNode;
	Domain?: string;
	ClientIdentifier?: string;
	/** Auth0 organization ID for enterprise multi-tenant SSO */
	Organization?: string;
}) => (
	<Auth0Provider
		domain={Domain}
		clientId={ClientIdentifier}
		cacheLocation="localstorage"
		useRefreshTokens={true}
		{...(Organization ? { organization: Organization } : {})}
		authorizationParams={{
			redirect_uri:
				typeof window !== "undefined"
					? window.location.origin
					: undefined,
			...(Organization ? { organization: Organization } : {}),
		}}
	>
		{Children}
	</Auth0Provider>
);
