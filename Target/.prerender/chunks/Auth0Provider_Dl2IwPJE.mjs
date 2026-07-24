import { jsx } from "react/jsx-runtime";
import { Auth0Provider } from "@auth0/auth0-react";
//#region Source/Component/Provider/Auth0Provider.tsx
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
*/
var Auth0Provider_default = ({ Children, Domain = "", ClientIdentifier = "", Organization }) => /* @__PURE__ */ jsx(Auth0Provider, {
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
//#endregion
export { Auth0Provider_default as t };
