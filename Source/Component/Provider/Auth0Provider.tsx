"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import type { ReactNode } from "react";

/**
 * Auth0 context wrapper for client-side React islands.
 * Uses Auth0 Universal Login (redirect-based) — no custom login forms needed.
 *
 * The Auth0 SPA SDK deduplicates auth state internally, so multiple
 * Auth0Provider instances (across Astro islands) share the same session.
 */
export default ({
	Children,
	Domain = "dev-o5qwc17ra258xn81.eu.auth0.com",
	ClientIdentifier = "YPifTeOpZzlXLYKQ1A5XmRUJxGxwUqRC",
}: {
	Children: ReactNode;
	Domain?: string;
	ClientIdentifier?: string;
}) => (
	<Auth0Provider
		domain={Domain}
		clientId={ClientIdentifier}
		authorizationParams={{
			redirect_uri:
				typeof window !== "undefined"
					? window.location.origin
					: undefined,
		}}
	>
		{Children}
	</Auth0Provider>
);
