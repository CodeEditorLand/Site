import { jsx } from 'react/jsx-runtime';
import { Auth0Provider as Auth0Provider$1 } from '@auth0/auth0-react';

const Auth0Provider = ({
  Children,
  Domain = "",
  ClientIdentifier = "",
  Organization
}) => /* @__PURE__ */ jsx(
  Auth0Provider$1,
  {
    domain: Domain,
    clientId: ClientIdentifier,
    cacheLocation: "localstorage",
    ...Organization ? { organization: Organization } : {},
    authorizationParams: {
      redirect_uri: typeof window !== "undefined" ? `${window.location.origin}/OAuth/Success` : void 0,
      ...Organization ? { organization: Organization } : {}
    },
    children: Children
  }
);

export { Auth0Provider as A };
