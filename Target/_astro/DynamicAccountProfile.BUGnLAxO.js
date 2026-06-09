import { b1 as jsxDevRuntimeExports, b3 as useAuth0, b4 as useTranslation, b2 as reactExports, a8 as MailCheck, F as EyeOff, z as Eye, aD as ShieldCheck, a5 as Lock } from './Vendor/React.D_hnTAe2.js';
import { T as ThemeIcon } from './Blog.C5m3bFxQ.js';
import { a as Auth0Provider } from './Footer.J6XKs53r.js';
import { S as Skeleton, B as Button } from './Skeleton.Dp5ep6F2.js';

const Pii = ({
  children,
  visible
}) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  "span",
  {
    className: `transition-all duration-200 ${visible ? "" : "select-none blur-sm"}`,
    children
  },
  void 0,
  false,
  {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
    lineNumber: 22,
    columnNumber: 2
  },
  undefined
);
const SourceBadge = ({
  label,
  icon
}) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center gap-1 bg-[var(--Mute)] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground", children: [
  icon && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    ThemeIcon,
    {
      src: icon,
      alt: label,
      width: 10,
      height: 10,
      className: "h-2.5 w-2.5"
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
      lineNumber: 41,
      columnNumber: 4
    },
    undefined
  ),
  label
] }, void 0, true, {
  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
  lineNumber: 39,
  columnNumber: 2
}, undefined);
const FieldRow = ({
  label,
  value,
  source,
  sourceIcon,
  editable,
  editHint,
  editHref
}) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-4", children: [
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start justify-between gap-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-w-0 flex-1", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm font-medium", children: label }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 76,
        columnNumber: 6
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SourceBadge, { label: source, icon: sourceIcon }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 77,
        columnNumber: 6
      }, undefined),
      editable ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center border border-blue-200 bg-blue-50 px-1.5 py-0 font-mono text-[10px] text-blue-600 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300", children: "Editable" }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 79,
        columnNumber: 7
      }, undefined) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center bg-[var(--Mute)] px-1.5 py-0 font-mono text-[10px] text-muted-foreground", children: "Read-only" }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 83,
        columnNumber: 7
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
      lineNumber: 75,
      columnNumber: 5
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-1 text-sm text-muted-foreground", children: value }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
      lineNumber: 88,
      columnNumber: 5
    }, undefined)
  ] }, void 0, true, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
    lineNumber: 74,
    columnNumber: 4
  }, undefined) }, void 0, false, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
    lineNumber: 73,
    columnNumber: 3
  }, undefined),
  editHint && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1.5 text-sm text-muted-foreground", children: [
    editHint,
    editHref && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
      " ",
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "a",
        {
          href: editHref,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-[var(--Primary)] hover:underline",
          children: "Update here →"
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 99,
          columnNumber: 7
        },
        undefined
      )
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
      lineNumber: 97,
      columnNumber: 6
    }, undefined)
  ] }, void 0, true, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
    lineNumber: 94,
    columnNumber: 4
  }, undefined)
] }, void 0, true, {
  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
  lineNumber: 72,
  columnNumber: 2
}, undefined);
const Auth0Badge = () => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  "a",
  {
    href: "https://auth0.com/privacy",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "inline-flex items-center gap-1.5 border border-[#EB5424]/30 bg-[#EB5424]/5 px-2 py-1 text-sm transition-colors hover:bg-[#EB5424]/10",
    children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "svg",
        {
          width: "14",
          height: "14",
          viewBox: "0 0 24 24",
          fill: "none",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "path",
              {
                d: "M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z",
                fill: "#EB5424"
              },
              void 0,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                lineNumber: 127,
                columnNumber: 4
              },
              undefined
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "path",
              {
                d: "M12 6l-5 2.75V12c0 3.25 2.3 6.25 5 6.9 2.7-.65 5-3.65 5-6.9V8.75L12 6z",
                fill: "white",
                fillOpacity: "0.9"
              },
              void 0,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                lineNumber: 131,
                columnNumber: 4
              },
              undefined
            )
          ]
        },
        void 0,
        true,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 121,
          columnNumber: 3
        },
        undefined
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
        "Secured by",
        " ",
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-semibold", style: { color: "#EB5424" }, children: "Auth0" }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 139,
          columnNumber: 4
        }, undefined),
        " ",
        "by Okta"
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 137,
        columnNumber: 3
      }, undefined)
    ]
  },
  void 0,
  true,
  {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
    lineNumber: 116,
    columnNumber: 2
  },
  undefined
);
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
const DetectProviderProfileUrl = (Sub) => {
  if (!Sub) return null;
  if (Sub.startsWith("github|")) return "https://github.com/settings/profile";
  if (Sub.startsWith("google-oauth2|"))
    return "https://myaccount.google.com/personal-info";
  if (Sub.startsWith("gitlab|")) return "https://gitlab.com/-/profile";
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
    Border: "border-blue-200 dark:border-blue-800",
    Background: "bg-blue-50 dark:bg-blue-950",
    Text: "text-blue-700 dark:text-blue-300",
    Dot: "bg-blue-500"
  },
  Provider: {
    Border: "border-purple-200 dark:border-purple-800",
    Background: "bg-purple-50 dark:bg-purple-950",
    Text: "text-purple-700 dark:text-purple-300",
    Dot: "bg-purple-500"
  },
  LocalFirst: {
    Border: "border-orange-200 dark:border-orange-800",
    Background: "bg-orange-50 dark:bg-orange-950",
    Text: "text-orange-700 dark:text-orange-300",
    Dot: "bg-orange-500"
  },
  Enterprise: {
    Border: "border-green-200 dark:border-green-800",
    Background: "bg-green-50 dark:bg-green-950",
    Text: "text-green-700 dark:text-green-300",
    Dot: "bg-green-500"
  }
};
const DynamicAccountProfile = ({
  Domain,
  ClientIdentifier
}) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Auth0Provider,
  {
    Children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      AccountProfileInner,
      {
        Domain,
        ClientIdentifier
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 242,
        columnNumber: 4
      },
      undefined
    ),
    ...Domain ? { Domain } : {},
    ...ClientIdentifier ? { ClientIdentifier } : {}
  },
  void 0,
  false,
  {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
    lineNumber: 240,
    columnNumber: 2
  },
  undefined
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
const AccountProfileInner = ({
  Domain = "",
  ClientIdentifier = ""
}) => {
  const {
    isLoading: IsLoading,
    isAuthenticated: IsAuthenticated,
    user: User,
    error: AuthError,
    loginWithRedirect: Login,
    logout: Auth0Logout
  } = useAuth0();
  const { t: T } = useTranslation("account");
  const [PIIVisible, SetPIIVisible] = reactExports.useState(false);
  const [PasswordResetState, SetPasswordResetState] = reactExports.useState("idle");
  const HandleSignOut = () => {
    ClearAuthFromServiceWorker();
    ClearLegacyTokens();
    Auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  };
  const HandlePasswordReset = async () => {
    if (!User?.email || !Domain || !ClientIdentifier) return;
    SetPasswordResetState("sending");
    try {
      const Response = await fetch(
        `https://${Domain}/dbconnections/change_password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            client_id: ClientIdentifier,
            email: User.email,
            connection: "Username-Password-Authentication"
          })
        }
      );
      SetPasswordResetState(Response.ok ? "sent" : "error");
    } catch {
      SetPasswordResetState("error");
    }
  };
  if (IsLoading) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto max-w-2xl space-y-6 px-4 py-16", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "h-20 w-20 shrink-0" }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 334,
          columnNumber: 6
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 space-y-3", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "h-6 w-48" }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 336,
            columnNumber: 7
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "h-4 w-64" }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 337,
            columnNumber: 7
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "h-4 w-32" }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 338,
            columnNumber: 7
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 335,
          columnNumber: 6
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 333,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "h-48 w-full" }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 341,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "h-32 w-full" }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 342,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "h-24 w-full" }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 343,
        columnNumber: 5
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
      lineNumber: 332,
      columnNumber: 4
    }, undefined);
  }
  if (AuthError) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        className: "mx-auto max-w-2xl space-y-4 px-4 py-16",
        role: "alert",
        "aria-live": "polite",
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-destructive", children: [
            T("error", { defaultValue: "Authentication error" }),
            ":",
            " ",
            AuthError.message
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 354,
            columnNumber: 5
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            Button,
            {
              variant: "outline",
              onClick: () => window.location.reload(),
              children: T("tryAgain", { defaultValue: "Try again" })
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 358,
              columnNumber: 5
            },
            undefined
          )
        ]
      },
      void 0,
      true,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 350,
        columnNumber: 4
      },
      undefined
    );
  }
  if (!IsAuthenticated || !User) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto max-w-2xl space-y-4 px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-muted-foreground", children: T("notSignedIn", {
        defaultValue: "Sign in to manage your account."
      }) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 370,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          type: "button",
          onClick: () => {
            try {
              sessionStorage.setItem(
                "auth0_return_to",
                window.location.pathname
              );
            } catch {
            }
            Login();
          },
          className: "StaccatoButton inline-flex items-center justify-center bg-[var(--Primary)] px-6 py-2 font-medium text-[var(--PrimaryForeground)] transition-all hover:opacity-90",
          children: T("signInButton", { defaultValue: "Sign In" })
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 375,
          columnNumber: 5
        },
        undefined
      )
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
      lineNumber: 369,
      columnNumber: 4
    }, undefined);
  }
  const DisplayName = User.name && User.name !== User.email ? User.name : User.nickname || User.email?.split("@")[0] || "User";
  const MemberSince = User.updated_at ? new Date(User.updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }) : "--";
  const ProviderLabel = DetectProviderLabel(User.sub);
  const ProviderIcon = DetectProviderIcon(User.sub);
  const ProviderProfileUrl = DetectProviderProfileUrl(User.sub);
  const Tier = DetectPortalTier(User.sub);
  const TierColor = TierColorMap[Tier] || TierColorMap["Cloud"];
  const IsEnterprise = IsEnterpriseUser(User.sub);
  const IsSocialUser = User.sub !== void 0 && !User.sub.startsWith("auth0|");
  const IsEmailPasswordUser = User.sub?.startsWith("auth0|") === true;
  const OrganizationName = User["org_name"];
  const OrganizationIdentifier = User["org_id"];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto max-w-2xl space-y-8 px-4 py-16", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start gap-6", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "div",
        {
          className: `shrink-0 transition-all duration-200 ${PIIVisible ? "" : "blur-sm"}`,
          children: User.picture ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "img",
            {
              src: User.picture,
              alt: User.name || "User avatar",
              title: User.name || "User avatar",
              width: "80",
              height: "80",
              className: "h-20 w-20 rounded-none object-cover"
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 431,
              columnNumber: 7
            },
            undefined
          ) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex h-20 w-20 items-center justify-center bg-[var(--Mute)] text-2xl font-bold text-muted-foreground", children: DisplayName.slice(0, 2).toUpperCase() }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 440,
            columnNumber: 7
          }, undefined)
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 426,
          columnNumber: 5
        },
        undefined
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-2xl font-bold", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pii, { visible: PIIVisible, children: DisplayName }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 447,
          columnNumber: 7
        }, undefined) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 446,
          columnNumber: 6
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-1 flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm text-muted-foreground", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pii, { visible: PIIVisible, children: User.email || "--" }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 451,
            columnNumber: 8
          }, undefined) }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 450,
            columnNumber: 7
          }, undefined),
          User.email_verified === true && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center gap-1 border border-green-200 bg-green-50 px-1.5 py-0 text-[10px] font-medium text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              MailCheck,
              {
                className: "h-2.5 w-2.5",
                "aria-hidden": "true"
              },
              void 0,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                lineNumber: 455,
                columnNumber: 9
              },
              undefined
            ),
            "Verified"
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 454,
            columnNumber: 8
          }, undefined),
          User.email_verified === false && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center border border-yellow-200 bg-yellow-50 px-1.5 py-0 text-[10px] font-medium text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300", children: "Not Verified" }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 463,
            columnNumber: 8
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 449,
          columnNumber: 6
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-2 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "span",
            {
              className: `inline-flex items-center border ${TierColor.Border} ${TierColor.Background} px-2 py-0.5 text-sm font-medium ${TierColor.Text}`,
              children: [
                Tier,
                " ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "span",
                  {
                    className: `h-1.5 w-1.5 rounded-none ${TierColor.Dot}`,
                    "aria-hidden": "true"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                    lineNumber: 473,
                    columnNumber: 8
                  },
                  undefined
                )
              ]
            },
            void 0,
            true,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 469,
              columnNumber: 7
            },
            undefined
          ),
          ProviderIcon ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center gap-1 bg-[var(--Mute)] px-2 py-0.5 text-sm font-medium text-muted-foreground", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              ThemeIcon,
              {
                src: ProviderIcon,
                alt: ProviderLabel,
                width: 12,
                height: 12,
                className: "h-3 w-3"
              },
              void 0,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                lineNumber: 480,
                columnNumber: 9
              },
              undefined
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pii, { visible: PIIVisible, children: ProviderLabel }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 487,
              columnNumber: 9
            }, undefined)
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 479,
            columnNumber: 8
          }, undefined) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center bg-[var(--Mute)] px-2 py-0.5 text-sm font-medium text-muted-foreground", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pii, { visible: PIIVisible, children: ProviderLabel }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 491,
            columnNumber: 9
          }, undefined) }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 490,
            columnNumber: 8
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 468,
          columnNumber: 6
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 445,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          type: "button",
          onClick: () => SetPIIVisible((v) => !v),
          "aria-label": PIIVisible ? "Hide personal data" : "Show personal data",
          className: "mt-1 shrink-0 text-muted-foreground transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
          children: PIIVisible ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EyeOff, { className: "h-5 w-5", "aria-hidden": "true" }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 504,
            columnNumber: 7
          }, undefined) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Eye, { className: "h-5 w-5", "aria-hidden": "true" }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 506,
            columnNumber: 7
          }, undefined)
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 496,
          columnNumber: 5
        },
        undefined
      )
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
      lineNumber: 425,
      columnNumber: 4
    }, undefined),
    IsEnterprise && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          ShieldCheck,
          {
            className: "h-4 w-4 shrink-0",
            "aria-hidden": "true"
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 515,
            columnNumber: 7
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
          "Enterprise SSO active",
          (OrganizationName || OrganizationIdentifier) && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
            " - ",
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pii, { visible: PIIVisible, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium", children: OrganizationName || OrganizationIdentifier }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 525,
              columnNumber: 11
            }, undefined) }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 524,
              columnNumber: 10
            }, undefined)
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 522,
            columnNumber: 9
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 519,
          columnNumber: 7
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 514,
        columnNumber: 6
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1 pl-6 text-sm text-green-600 dark:text-green-400", children: "Profile fields are managed by your organization's identity provider. Contact your IT administrator to update them." }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 534,
        columnNumber: 6
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
      lineNumber: 513,
      columnNumber: 5
    }, undefined),
    User.email_verified === false && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300", children: T("emailNotVerified", {
      defaultValue: "Email not verified. Check your inbox."
    }) }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
      lineNumber: 544,
      columnNumber: 5
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start gap-4 border border-[var(--Border)] bg-[var(--Mute)] px-5 py-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Lock,
        {
          className: "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground",
          "aria-hidden": "true"
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 553,
          columnNumber: 5
        },
        undefined
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 space-y-1", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm font-medium", children: "Your account data is stored securely" }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 559,
            columnNumber: 7
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Auth0Badge, {}, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 562,
            columnNumber: 7
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 558,
          columnNumber: 6
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-muted-foreground", children: "Authentication, profile data, and session tokens are managed by Auth0 (by Okta) and stored on their EU infrastructure. Code Editor Land does not store your password. Social login credentials (Google, GitHub, etc.) remain with your identity provider." }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 564,
          columnNumber: 6
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 557,
        columnNumber: 5
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
      lineNumber: 552,
      columnNumber: 4
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "StaccatoCard StaccatoBorderShimmer bg-card", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between border-b border-[var(--Border)] px-6 py-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-semibold", children: T("profileSection", {
          defaultValue: "Profile Fields"
        }) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 577,
          columnNumber: 6
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm text-muted-foreground", children: "All data stored in Auth0" }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 582,
          columnNumber: 6
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 576,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "divide-y divide-[var(--Border)]", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          FieldRow,
          {
            label: "Display Name",
            value: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pii, { visible: PIIVisible, children: DisplayName }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 590,
              columnNumber: 14
            }, undefined),
            source: IsSocialUser ? ProviderLabel : "Auth0",
            sourceIcon: IsSocialUser ? ProviderIcon : null,
            editable: !IsSocialUser,
            editHint: IsSocialUser ? `Set by your ${ProviderLabel} account. To change it, update your profile at ${ProviderLabel}.` : "Contact support to update your display name.",
            editHref: IsSocialUser ? ProviderProfileUrl ?? void 0 : void 0
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 588,
            columnNumber: 6
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          FieldRow,
          {
            label: "Email Address",
            value: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pii, { visible: PIIVisible, children: User.email || "--" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                lineNumber: 611,
                columnNumber: 9
              }, undefined),
              User.email_verified === true && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center gap-1 border border-green-200 bg-green-50 px-1.5 py-0 font-mono text-[10px] text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MailCheck, { className: "h-2.5 w-2.5" }, void 0, false, {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                  lineNumber: 616,
                  columnNumber: 11
                }, undefined),
                "verified"
              ] }, void 0, true, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                lineNumber: 615,
                columnNumber: 10
              }, undefined),
              User.email_verified === false && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center border border-yellow-200 bg-yellow-50 px-1.5 py-0 font-mono text-[10px] text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300", children: "unverified" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                lineNumber: 621,
                columnNumber: 10
              }, undefined)
            ] }, void 0, true, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 610,
              columnNumber: 8
            }, undefined),
            source: IsSocialUser ? ProviderLabel : "Auth0",
            sourceIcon: IsSocialUser ? ProviderIcon : null,
            editable: IsEmailPasswordUser,
            editHint: IsSocialUser ? `Email is tied to your ${ProviderLabel} account and cannot be changed here.` : IsEmailPasswordUser ? "Email changes require re-verification. Contact support to initiate an email update." : void 0,
            editHref: IsSocialUser ? ProviderProfileUrl ?? void 0 : void 0
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 607,
            columnNumber: 6
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          FieldRow,
          {
            label: "Profile Picture",
            value: User.picture ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "span",
                {
                  className: `transition-all duration-200 ${PIIVisible ? "" : "blur-sm"}`,
                  children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "img",
                    {
                      src: User.picture,
                      alt: "Profile picture",
                      width: "32",
                      height: "32",
                      className: "h-8 w-8 rounded-none object-cover"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                      lineNumber: 652,
                      columnNumber: 11
                    },
                    undefined
                  )
                },
                void 0,
                false,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                  lineNumber: 650,
                  columnNumber: 10
                },
                undefined
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pii, { visible: PIIVisible, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-mono text-sm text-muted-foreground", children: [
                User.picture.split("/").pop()?.slice(0, 24),
                "…"
              ] }, void 0, true, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                lineNumber: 661,
                columnNumber: 11
              }, undefined) }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                lineNumber: 660,
                columnNumber: 10
              }, undefined)
            ] }, void 0, true, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 649,
              columnNumber: 9
            }, undefined) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-muted-foreground", children: "Not set" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 671,
              columnNumber: 9
            }, undefined),
            source: IsSocialUser ? ProviderLabel : "Auth0",
            sourceIcon: IsSocialUser ? ProviderIcon : null,
            editable: false,
            editHint: IsSocialUser ? `Avatar is pulled from your ${ProviderLabel} account on each login.` : "Profile picture URL can be updated via the Auth0 Management API. Contact support.",
            editHref: IsSocialUser ? ProviderProfileUrl ?? void 0 : void 0
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 645,
            columnNumber: 6
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          FieldRow,
          {
            label: "Identity Provider",
            value: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-1.5", children: [
              ProviderIcon && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                ThemeIcon,
                {
                  src: ProviderIcon,
                  alt: ProviderLabel,
                  width: 14,
                  height: 14,
                  className: "h-3.5 w-3.5"
                },
                void 0,
                false,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                  lineNumber: 697,
                  columnNumber: 10
                },
                undefined
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pii, { visible: PIIVisible, children: ProviderLabel }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                lineNumber: 705,
                columnNumber: 9
              }, undefined)
            ] }, void 0, true, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 695,
              columnNumber: 8
            }, undefined),
            source: "Auth0",
            editable: false,
            editHint: "To use a different sign-in method, sign out and sign in with another provider. Multiple providers can be linked."
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 692,
            columnNumber: 6
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          FieldRow,
          {
            label: "Portal Tier",
            value: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "span",
              {
                className: `inline-flex items-center border ${TierColor.Border} ${TierColor.Background} px-2 py-0.5 text-sm font-medium ${TierColor.Text}`,
                children: [
                  Tier,
                  " ",
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "span",
                    {
                      className: `h-1 w-1 rounded-none ${TierColor.Dot}`,
                      "aria-hidden": "true"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                      lineNumber: 721,
                      columnNumber: 9
                    },
                    undefined
                  )
                ]
              },
              void 0,
              true,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                lineNumber: 717,
                columnNumber: 8
              },
              undefined
            ),
            source: "Auth0",
            editable: false,
            editHint: "Tier is determined by your sign-in method. Switch to a different provider to change tier."
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 714,
            columnNumber: 6
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          FieldRow,
          {
            label: "User ID",
            value: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("code", { className: "font-mono text-sm", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pii, { visible: PIIVisible, children: User.sub || "--" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 737,
              columnNumber: 9
            }, undefined) }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 736,
              columnNumber: 8
            }, undefined),
            source: "Auth0",
            editable: false,
            editHint: "System identifier assigned by Auth0. Used in GDPR requests and support tickets."
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 733,
            columnNumber: 6
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          FieldRow,
          {
            label: "Last Updated",
            value: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pii, { visible: PIIVisible, children: MemberSince }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 750,
              columnNumber: 14
            }, undefined),
            source: "Auth0",
            editable: false
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 748,
            columnNumber: 6
          },
          undefined
        ),
        IsEnterprise && (OrganizationName || OrganizationIdentifier) && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          FieldRow,
          {
            label: "Organization",
            value: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pii, { visible: PIIVisible, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium", children: OrganizationName || OrganizationIdentifier }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 762,
              columnNumber: 11
            }, undefined) }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 761,
              columnNumber: 10
            }, undefined),
            source: "Auth0 Organizations",
            editable: false,
            editHint: "Managed by your organization administrator."
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 758,
            columnNumber: 8
          },
          undefined
        )
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 586,
        columnNumber: 5
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
      lineNumber: 575,
      columnNumber: 4
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "StaccatoCard StaccatoBorderShimmer bg-card", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-b border-[var(--Border)] px-6 py-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-semibold", children: "Security" }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 779,
        columnNumber: 6
      }, undefined) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 778,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "divide-y divide-[var(--Border)]", children: [
        IsEmailPasswordUser && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 text-sm font-medium", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                Lock,
                {
                  className: "h-3.5 w-3.5 text-muted-foreground",
                  "aria-hidden": "true"
                },
                void 0,
                false,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                  lineNumber: 788,
                  columnNumber: 11
                },
                undefined
              ),
              "Password",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SourceBadge, { label: "Auth0" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                lineNumber: 793,
                columnNumber: 11
              }, undefined),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center border border-blue-200 bg-blue-50 px-1.5 py-0 font-mono text-[10px] text-blue-600 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300", children: "Editable" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                lineNumber: 794,
                columnNumber: 11
              }, undefined)
            ] }, void 0, true, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 787,
              columnNumber: 10
            }, undefined),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1 text-sm text-muted-foreground", children: "A reset link is sent to your email. You will not be signed out until you set a new password." }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 798,
              columnNumber: 10
            }, undefined)
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 786,
            columnNumber: 9
          }, undefined),
          PasswordResetState === "idle" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              type: "button",
              onClick: HandlePasswordReset,
              className: "StaccatoButton shrink-0 bg-card px-3 py-1.5 text-sm font-medium transition-all hover:bg-[var(--Secondary)]",
              children: "Send Reset Email"
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 805,
              columnNumber: 10
            },
            undefined
          ),
          PasswordResetState === "sending" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "shrink-0 text-sm text-muted-foreground", children: "Sending…" }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 813,
            columnNumber: 10
          }, undefined),
          PasswordResetState === "sent" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex shrink-0 items-center gap-1 border border-green-200 bg-green-50 px-2 py-1 text-sm text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MailCheck, { className: "h-3 w-3" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 819,
              columnNumber: 11
            }, undefined),
            "Email sent"
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 818,
            columnNumber: 10
          }, undefined),
          PasswordResetState === "error" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "shrink-0 text-sm text-red-600 dark:text-red-400", children: "Failed. Try again." }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 824,
            columnNumber: 10
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 785,
          columnNumber: 8
        }, undefined) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 784,
          columnNumber: 7
        }, undefined),
        IsSocialUser && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 text-sm font-medium", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              Lock,
              {
                className: "h-3.5 w-3.5 text-muted-foreground",
                "aria-hidden": "true"
              },
              void 0,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                lineNumber: 836,
                columnNumber: 9
              },
              undefined
            ),
            "Password",
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              SourceBadge,
              {
                label: ProviderLabel,
                icon: ProviderIcon
              },
              void 0,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                lineNumber: 841,
                columnNumber: 9
              },
              undefined
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center bg-[var(--Mute)] px-1.5 py-0 font-mono text-[10px] text-muted-foreground", children: "Not applicable" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 845,
              columnNumber: 9
            }, undefined)
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 835,
            columnNumber: 8
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1 text-sm text-muted-foreground", children: [
            "You signed in via ",
            ProviderLabel,
            ". Password management is handled entirely by",
            " ",
            ProviderLabel,
            " - Code Editor Land never receives or stores your password.",
            ProviderProfileUrl && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
              " ",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "a",
                {
                  href: ProviderProfileUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-[var(--Primary)] hover:underline",
                  children: [
                    "Manage at ",
                    ProviderLabel,
                    " →"
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                  lineNumber: 857,
                  columnNumber: 11
                },
                undefined
              )
            ] }, void 0, true, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 855,
              columnNumber: 10
            }, undefined)
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 849,
            columnNumber: 8
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 834,
          columnNumber: 7
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 text-sm font-medium", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              ShieldCheck,
              {
                className: "h-3.5 w-3.5 text-muted-foreground",
                "aria-hidden": "true"
              },
              void 0,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                lineNumber: 873,
                columnNumber: 8
              },
              undefined
            ),
            "Active Session",
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SourceBadge, { label: "Auth0" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 878,
              columnNumber: 8
            }, undefined),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center bg-[var(--Mute)] px-1.5 py-0 font-mono text-[10px] text-muted-foreground", children: "Read-only" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
              lineNumber: 879,
              columnNumber: 8
            }, undefined)
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 872,
            columnNumber: 7
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1 text-sm text-muted-foreground", children: "Session managed by Auth0. Signing out revokes the session token on Auth0's servers and clears local storage. Access token validity: 1 hour." }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 883,
            columnNumber: 7
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
          lineNumber: 871,
          columnNumber: 6
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 781,
        columnNumber: 5
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
      lineNumber: 777,
      columnNumber: 4
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "StaccatoCard StaccatoBorderShimmer bg-card", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-b border-[var(--Border)] px-6 py-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-semibold", children: T("actionsSection", {
        defaultValue: "Account Actions"
      }) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 895,
        columnNumber: 6
      }, undefined) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 894,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3 px-6 py-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "a",
          {
            href: "/Dashboard",
            className: "StaccatoButton inline-flex w-full items-center justify-center bg-card px-4 py-2 font-medium transition-all hover:bg-[var(--Secondary)]",
            children: [
              T("goToDashboard", {
                defaultValue: "Go to Dashboard"
              }),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "InlineSeparator", children: "→" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
                lineNumber: 908,
                columnNumber: 7
              }, undefined)
            ]
          },
          void 0,
          true,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 902,
            columnNumber: 6
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            type: "button",
            onClick: HandleSignOut,
            className: "StaccatoButton inline-flex w-full items-center justify-center border border-red-200 bg-card px-4 py-2 font-medium text-red-600 transition-all hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950",
            children: T("signOut", { defaultValue: "Sign Out" })
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
            lineNumber: 910,
            columnNumber: 6
          },
          undefined
        )
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
        lineNumber: 901,
        columnNumber: 5
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
      lineNumber: 893,
      columnNumber: 4
    }, undefined)
  ] }, void 0, true, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
    lineNumber: 423,
    columnNumber: 3
  }, undefined);
};

export { DynamicAccountProfile as default };
//# sourceMappingURL=DynamicAccountProfile.BUGnLAxO.js.map
