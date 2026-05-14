import { jsx, jsxs } from 'react/jsx-runtime';
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuItem, d as DropdownMenuSeparator, H as Header } from './Header_vAdk6Hlx.mjs';
import { Auth0Provider as Auth0Provider$1, useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import 'react';
import { c as cn } from './Base_IAktlLoN.mjs';
import { S as Skeleton } from './Skeleton_BWnC8cZP.mjs';

const Auth0Provider = ({
  Children,
  Domain = "dev-o5qwc17ra258xn81.eu.auth0.com",
  ClientIdentifier = "YPifTeOpZzlXLYKQ1A5XmRUJxGxwUqRC",
  Organization
}) => /* @__PURE__ */ jsx(
  Auth0Provider$1,
  {
    domain: Domain,
    clientId: ClientIdentifier,
    cacheLocation: "localstorage",
    useRefreshTokens: true,
    ...Organization ? { organization: Organization } : {},
    authorizationParams: {
      redirect_uri: typeof window !== "undefined" ? `${window.location.origin}/OAuth/Success` : void 0,
      ...Organization ? { organization: Organization } : {}
    },
    children: Children
  }
);

function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-none",
        className
      ),
      ...props
    }
  );
}
function AvatarImage({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Image,
    {
      "data-slot": "avatar-image",
      className: cn("aspect-square size-full", className),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "flex size-full items-center justify-center rounded-none bg-muted",
        className
      ),
      ...props
    }
  );
}

const DynamicAuthStatus = ({
  SignInHref = "/Account/SignIn",
  DashboardHref = "/Dashboard",
  AccountHref = "/Account"
}) => {
  const {
    isLoading: IsLoading,
    isAuthenticated: IsAuthenticated,
    user: User,
    logout: Auth0Logout
  } = useAuth0();
  const { t: T } = useTranslation("header");
  if (IsLoading) {
    return /* @__PURE__ */ jsx(
      Skeleton,
      {
        className: "h-7 w-7",
        "aria-label": T("actions.loading", { defaultValue: "Loading…" })
      }
    );
  }
  if (!IsAuthenticated || !User) {
    return /* @__PURE__ */ jsxs(
      "a",
      {
        href: SignInHref,
        className: "inline-flex items-center text-sm font-medium text-foreground hover:underline",
        "aria-label": T("actions.signIn", { defaultValue: "Sign In" }),
        children: [
          T("actions.signIn", { defaultValue: "Sign In" }),
          " ",
          /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "h-4 w-4",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsx("path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" }),
                /* @__PURE__ */ jsx("polyline", { points: "10 17 15 12 10 7" }),
                /* @__PURE__ */ jsx("line", { x1: "15", y1: "12", x2: "3", y2: "12" })
              ]
            }
          )
        ]
      }
    );
  }
  const DisplayName = User.name && User.name !== User.email ? User.name : User.nickname || User.email?.split("@")[0] || "User";
  const Initials = DisplayName.slice(0, 2).toUpperCase();
  const Logout = () => Auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "flex items-center gap-2 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "aria-label": T("user.avatarAlt", {
          defaultValue: "User menu"
        }),
        children: /* @__PURE__ */ jsxs(Avatar, { className: "h-7 w-7", children: [
          /* @__PURE__ */ jsx(
            AvatarImage,
            {
              src: User.picture,
              alt: T("user.avatarAlt", {
                defaultValue: "{{name}} avatar",
                name: DisplayName
              })
            }
          ),
          /* @__PURE__ */ jsx(AvatarFallback, { className: "text-xs", children: Initials })
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", className: "w-40", children: [
      /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(
        "a",
        {
          href: DashboardHref,
          "aria-label": T("user.menu.dashboard", {
            defaultValue: "Go to Dashboard"
          }),
          children: T("user.menu.dashboard", {
            defaultValue: "Dashboard"
          })
        }
      ) }),
      /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(
        "a",
        {
          href: AccountHref,
          "aria-label": T("user.menu.account", {
            defaultValue: "Manage Account"
          }),
          children: T("user.menu.account", { defaultValue: "Account" })
        }
      ) }),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsx(
        DropdownMenuItem,
        {
          variant: "destructive",
          onClick: Logout,
          "aria-label": T("user.menu.signOut", {
            defaultValue: "Sign out"
          }),
          children: T("user.menu.signOut", { defaultValue: "Sign Out" })
        }
      )
    ] })
  ] });
};

const DynamicAuthHeader = ({
  Domain,
  ClientIdentifier,
  Content
}) => /* @__PURE__ */ jsx(
  Auth0Provider,
  {
    Children: /* @__PURE__ */ jsx(HeaderWithAuth, { ...Content ? { Content } : {} }),
    ...Domain ? { Domain } : {},
    ...ClientIdentifier ? { ClientIdentifier } : {}
  }
);
const HeaderWithAuth = ({ Content }) => /* @__PURE__ */ jsx(
  Header,
  {
    ...Content ? { Content } : {},
    AuthSlot: /* @__PURE__ */ jsx(DynamicAuthStatus, {})
  }
);

export { Auth0Provider as A, DynamicAuthHeader as D };
