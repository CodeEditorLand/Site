import { Fragment, jsx } from "react/jsx-runtime";
import { Auth0Provider } from "@auth0/auth0-react";
// Source/Component/Provider/Auth0Provider.tsx
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
* The SDK's provider cannot mount without a domain and a client identifier: it
* throws, and because this is a context wrapper that takes the whole island down
* with it - so the one surface a reader reaches when they cannot get in would be
* the surface that failed hardest when the environment was incomplete.
*
* A missing value is a state the block expresses: the children render unwrapped,
* the credential surface still prints its frame and its report, and the page can
* state that the provider is unconfigured.
*/
var Auth0Provider_default = ({ Children, Domain = "", ClientIdentifier = "", Organization }) => {
	if (!(Domain.trim().length > 0 && ClientIdentifier.trim().length > 0)) return /* @__PURE__ */ jsx(Fragment, { children: Children });
	return /* @__PURE__ */ jsx(Auth0Provider, {
		domain: Domain,
		clientId: ClientIdentifier,
		cacheLocation: "localstorage",
		...Organization ? { organization: Organization } : {},
		authorizationParams: {
			redirect_uri: typeof window !== "undefined" ? `${window.location.origin}/OAuth/Success` : "https://editor.land/OAuth/Success",
			...Organization ? { organization: Organization } : {}
		},
		children: Children
	});
};
export { Auth0Provider_default as t };
