import { c as createComponent } from './astro-component_Dsw0bl44.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './prerender_O3JwF96W.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import { A as Auth0Provider, D as DynamicAuthHeader } from './DynamicAuthHeader_ByBkTF4W.mjs';
import { B as Button } from './Header_vAdk6Hlx.mjs';
import { S as Skeleton } from './Skeleton_BWnC8cZP.mjs';
import { G as GetI18n, $ as $$Base } from './Base_IAktlLoN.mjs';

const DynamicAccountProfile = ({
  Domain,
  ClientIdentifier
}) => /* @__PURE__ */ jsx(
  Auth0Provider,
  {
    Children: /* @__PURE__ */ jsx(AccountProfileInner, {}),
    ...Domain ? { Domain } : {},
    ...ClientIdentifier ? { ClientIdentifier } : {}
  }
);
const ClearAuthFromServiceWorker = () => {
  try {
    if (typeof navigator === "undefined" || !navigator.serviceWorker?.controller)
      return;
    navigator.serviceWorker.controller.postMessage({ Type: "Auth:Clear" });
  } catch {
  }
};
const ClearLegacyTokens = () => {
  try {
    localStorage.removeItem("session_token");
    localStorage.removeItem("current_user");
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  } catch {
  }
};
const DetectProviderLabel = (Sub) => {
  if (!Sub) return "Email";
  if (Sub.startsWith("github|")) return "GitHub";
  if (Sub.startsWith("google-oauth2|")) return "Google";
  if (Sub.startsWith("gitlab|")) return "GitLab";
  if (Sub.startsWith("okta|")) return "Okta SSO";
  if (Sub.startsWith("samlp|")) return "SAML SSO";
  if (Sub.startsWith("waad|")) return "Azure AD";
  return "Auth0";
};
const DetectProviderIcon = (Sub) => {
  if (!Sub) return null;
  if (Sub.startsWith("github|")) return "/Image/GitHub.svg";
  if (Sub.startsWith("google-oauth2|")) return "/Image/Google.svg";
  if (Sub.startsWith("gitlab|")) return "/Image/GitLab.svg";
  if (Sub.startsWith("okta|")) return "/Image/Okta.svg";
  if (Sub.startsWith("waad|")) return "/Image/Microsoft.svg";
  return null;
};
const DetectPortalTier = (Sub) => {
  if (!Sub) return "LocalFirst";
  if (Sub.startsWith("github|")) return "Provider";
  if (Sub.startsWith("google-oauth2|")) return "Provider";
  if (Sub.startsWith("gitlab|")) return "Provider";
  if (Sub.startsWith("okta|")) return "Enterprise";
  if (Sub.startsWith("samlp|")) return "Enterprise";
  if (Sub.startsWith("waad|")) return "Enterprise";
  return "Cloud";
};
const IsEnterpriseUser = (Sub) => {
  if (!Sub) return false;
  return Sub.startsWith("okta|") || Sub.startsWith("samlp|") || Sub.startsWith("waad|");
};
const TierColorMap = {
  Cloud: {
    Border: "border-blue-200",
    Background: "bg-blue-50",
    Text: "text-blue-700",
    Dot: "bg-blue-500"
  },
  Provider: {
    Border: "border-purple-200",
    Background: "bg-purple-50",
    Text: "text-purple-700",
    Dot: "bg-purple-500"
  },
  LocalFirst: {
    Border: "border-orange-200",
    Background: "bg-orange-50",
    Text: "text-orange-700",
    Dot: "bg-orange-500"
  },
  Enterprise: {
    Border: "border-green-200",
    Background: "bg-green-50",
    Text: "text-green-700",
    Dot: "bg-green-500"
  }
};
const AccountProfileInner = () => {
  const {
    isLoading: IsLoading,
    isAuthenticated: IsAuthenticated,
    user: User,
    error: AuthError,
    loginWithRedirect: Login,
    logout: Auth0Logout
  } = useAuth0();
  const { t: T } = useTranslation("account");
  const HandleSignOut = () => {
    ClearAuthFromServiceWorker();
    ClearLegacyTokens();
    Auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  };
  if (IsLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl space-y-6 px-4 py-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-20 w-20 shrink-0" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-3", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-48" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-64" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-32" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-40 w-full" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-32" })
    ] });
  }
  if (AuthError) {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: "mx-auto max-w-2xl space-y-4 px-4 py-16",
        role: "alert",
        "aria-live": "polite",
        children: [
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-destructive", children: [
            T("error", {
              defaultValue: "Authentication error"
            }),
            ": ",
            AuthError.message
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              onClick: () => window.location.reload(),
              children: T("tryAgain", { defaultValue: "Try again" })
            }
          )
        ]
      }
    );
  }
  if (!IsAuthenticated || !User) {
    return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl space-y-4 px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: T("notSignedIn", {
        defaultValue: "Sign in to manage your account."
      }) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => Login(),
          className: "StaccatoButton inline-flex items-center justify-center border border-[var(--Border)] bg-[var(--Primary)] px-6 py-2 text-sm font-medium text-white transition-all hover:opacity-90",
          children: T("signInButton", { defaultValue: "Sign In" })
        }
      )
    ] });
  }
  const DisplayName = User.name && User.name !== User.email ? User.name : User.nickname || User.email?.split("@")[0] || "User";
  const MemberSince = User.updated_at ? new Date(User.updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }) : "--";
  const ProviderLabel = DetectProviderLabel(User.sub);
  const ProviderIcon = DetectProviderIcon(User.sub);
  const Tier = DetectPortalTier(User.sub);
  const TierColor = TierColorMap[Tier] || TierColorMap["Cloud"];
  const IsEnterprise = IsEnterpriseUser(User.sub);
  const OrganizationName = User["org_name"];
  const OrganizationIdentifier = User["org_id"];
  const Auth0Domain = typeof window !== "undefined" ? "dev-o5qwc17ra258xn81.eu.auth0.com" : "";
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl space-y-8 px-4 py-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-6", children: [
      User.picture ? /* @__PURE__ */ jsx(
        "img",
        {
          src: User.picture,
          alt: User.name || "User avatar",
          title: User.name || "User avatar",
          width: "80",
          height: "80",
          className: "h-20 w-20 shrink-0 rounded-none border border-[var(--Border)]"
        }
      ) : /* @__PURE__ */ jsx("div", { className: "flex h-20 w-20 shrink-0 items-center justify-center rounded-none border border-[var(--Border)] bg-[var(--Mute)] text-2xl font-bold text-muted-foreground", children: DisplayName.slice(0, 2).toUpperCase() }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: DisplayName }),
        /* @__PURE__ */ jsxs("div", { className: "mt-1 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: User.email || "--" }),
          User.email_verified === true && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center border border-green-200 bg-green-50 px-1.5 py-0 text-[10px] font-medium text-green-700", children: [
            "Verified",
            " ",
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "inline-block h-1 w-1 rounded-none bg-green-500",
                "aria-hidden": "true"
              }
            )
          ] }),
          User.email_verified === false && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center border border-yellow-200 bg-yellow-50 px-1.5 py-0 text-[10px] font-medium text-yellow-700", children: [
            "Not Verified",
            " ",
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "inline-block h-1 w-1 rounded-none bg-yellow-500",
                "aria-hidden": "true"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxs(
            "span",
            {
              className: `inline-flex items-center border ${TierColor.Border} ${TierColor.Background} px-2 py-0.5 text-xs font-medium ${TierColor.Text}`,
              children: [
                Tier,
                " ",
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `h-1.5 w-1.5 rounded-none ${TierColor.Dot}`,
                    "aria-hidden": "true"
                  }
                )
              ]
            }
          ),
          ProviderIcon && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 border border-[var(--Border)] bg-[var(--Mute)] px-2 py-0.5 text-xs font-medium text-muted-foreground", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: ProviderIcon,
                alt: ProviderLabel,
                width: "12",
                height: "12",
                className: "h-3 w-3"
              }
            ),
            ProviderLabel
          ] }),
          !ProviderIcon && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-2 py-0.5 text-xs font-medium text-muted-foreground", children: ProviderLabel })
        ] })
      ] })
    ] }),
    IsEnterprise && /* @__PURE__ */ jsxs("div", { className: "border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700", children: [
      "Enterprise SSO active",
      " ",
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "inline-block h-1.5 w-1.5 rounded-none bg-green-500",
          "aria-hidden": "true"
        }
      ),
      (OrganizationName || OrganizationIdentifier) && /* @__PURE__ */ jsx("span", { className: "ml-2 font-medium", children: OrganizationName || OrganizationIdentifier })
    ] }),
    User.email_verified === false && /* @__PURE__ */ jsx("div", { className: "border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700", children: T("emailNotVerified", {
      defaultValue: "Your email is not verified. Check your inbox for a verification link."
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "StaccatoCard StaccatoBorderShimmer border border-[var(--Border)] bg-white", children: [
      /* @__PURE__ */ jsx("div", { className: "border-b border-[var(--Border)] px-6 py-4", children: /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: T("profileSection", {
        defaultValue: "Profile Details"
      }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "divide-y divide-[var(--Border)]", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between px-6 py-3 text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Name" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: DisplayName })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between px-6 py-3 text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Email" }),
          /* @__PURE__ */ jsx("span", { children: User.email || "--" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between px-6 py-3 text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Provider" }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            ProviderIcon && /* @__PURE__ */ jsx(
              "img",
              {
                src: ProviderIcon,
                alt: ProviderLabel,
                width: "14",
                height: "14",
                className: "h-3.5 w-3.5"
              }
            ),
            ProviderLabel
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between px-6 py-3 text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Tier" }),
          /* @__PURE__ */ jsxs(
            "span",
            {
              className: `inline-flex items-center border ${TierColor.Border} ${TierColor.Background} px-2 py-0.5 text-xs font-medium ${TierColor.Text}`,
              children: [
                Tier,
                " ",
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `h-1 w-1 rounded-none ${TierColor.Dot}`,
                    "aria-hidden": "true"
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between px-6 py-3 text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "User ID" }),
          /* @__PURE__ */ jsx("code", { className: "text-xs text-muted-foreground", children: User.sub || "--" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between px-6 py-3 text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Member Since" }),
          /* @__PURE__ */ jsx("span", { children: MemberSince })
        ] }),
        IsEnterprise && (OrganizationName || OrganizationIdentifier) && /* @__PURE__ */ jsxs("div", { className: "flex justify-between px-6 py-3 text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Organization" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: OrganizationName || OrganizationIdentifier })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "StaccatoCard StaccatoBorderShimmer border border-[var(--Border)] bg-white", children: [
      /* @__PURE__ */ jsx("div", { className: "border-b border-[var(--Border)] px-6 py-4", children: /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: T("actionsSection", {
        defaultValue: "Account Actions"
      }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 px-6 py-4", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: `https://${Auth0Domain}/u/profile`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "StaccatoButton inline-flex w-full items-center justify-center border border-[var(--Border)] bg-white px-4 py-2 text-sm font-medium transition-all hover:bg-[var(--Secondary)]",
            children: [
              T("manageAuth0", {
                defaultValue: "Manage Account Settings"
              }),
              /* @__PURE__ */ jsx("span", { className: "InlineSeparator", children: "↗" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/Dashboard",
            className: "StaccatoButton inline-flex w-full items-center justify-center border border-[var(--Border)] bg-white px-4 py-2 text-sm font-medium transition-all hover:bg-[var(--Secondary)]",
            children: [
              T("goToDashboard", {
                defaultValue: "Go to Dashboard"
              }),
              /* @__PURE__ */ jsx("span", { className: "InlineSeparator", children: "→" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: HandleSignOut,
            className: "StaccatoButton inline-flex w-full items-center justify-center border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-50",
            children: T("signOut", {
              defaultValue: "Sign Out"
            })
          }
        )
      ] })
    ] })
  ] });
};

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const T = GetI18n();
  const Auth0Domain = (await import('./Auth0Domain_BKddKNn2.mjs')).default;
  const Auth0ClientIdentifier = (await import('./Auth0ClientIdentifier_DCXeU6DG.mjs')).default;
  const MetaTitle = T("meta.account.title", {
    defaultValue: "Account | Code Editor Land"
  });
  const MetaDescription = T("meta.account.description", {
    defaultValue: "Manage your Code Editor Land account and profile."
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription, "Url": "https://editor.land/Account", "lang": "en" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "DynamicAuthHeader", DynamicAuthHeader, { "client:load": true, "Domain": Auth0Domain, "ClientIdentifier": Auth0ClientIdentifier, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthHeader", "client:component-export": "default" })} ${maybeRenderHead()}<main id="main-content"> <div class="container mx-auto max-w-5xl px-4"> <!-- Breadcrumbs --> <nav aria-label="Breadcrumb" class="pt-6"> <ol class="flex flex-wrap items-center space-x-2 text-sm text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground">${T("common.breadcrumb.home", {
    defaultValue: "Home"
  })}</a> </li> <li class="mx-2">/</li> <li> <a href="/Dashboard" class="transition-colors hover:text-foreground">${T("common.breadcrumb.dashboard", {
    defaultValue: "Dashboard"
  })}</a> </li> <li class="mx-2">/</li> <li> <span class="font-medium text-foreground">${T("common.breadcrumb.account", {
    defaultValue: "Account"
  })}</span> </li> </ol> </nav> </div> ${renderComponent($$result2, "DynamicAccountProfile", DynamicAccountProfile, { "client:load": true, "Domain": Auth0Domain, "ClientIdentifier": Auth0ClientIdentifier, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile", "client:component-export": "default" })} </main> ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/index.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/index.astro";
const $$url = "/Account";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
