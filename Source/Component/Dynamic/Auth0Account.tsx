"use client";

import Auth0Provider from "../Provider/Auth0Provider";

import Auth0AccountGate from "./Auth0AccountGate";

/**
 * Self-contained Auth0 account island for Astro pages.
 * Wraps Auth0AccountGate with Auth0Provider so it works as
 * an independent React island (no shared context needed).
 *
 * Enterprise SSO (Okta, SAML, Azure AD):
 * - Pass Connection="okta-acme" to route directly to an Okta tenant
 * - Pass Organization="org_abc123" for multi-tenant org login
 * - Or use URL params: /Account/SignIn?connection=okta-acme
 */
export default ({
	Route,
	Header,
	Domain,
	ClientIdentifier,
	Connection,
	Organization,
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

	Domain?: string;

	ClientIdentifier?: string;

	/** Auth0 enterprise connection name (e.g. "okta-acme") */
	Connection?: string;

	/** Auth0 organization ID for multi-tenant enterprise SSO */
	Organization?: string;
}) => (
	<Auth0Provider
		Children={
			<Auth0AccountGate
				Route={Route}
				{...(Header ? { Header } : {})}
				{...(Connection ? { Connection } : {})}
				{...(Organization ? { Organization } : {})}
			/>
		}
		{...(Domain ? { Domain } : {})}
		{...(ClientIdentifier ? { ClientIdentifier } : {})}
	/>
);
