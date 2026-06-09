import { b1 as jsxDevRuntimeExports, b3 as useAuth0, b4 as useTranslation, b2 as reactExports, F as EyeOff, z as Eye, k as CircleCheck, h as Building2, aN as TriangleAlert } from './Vendor/React.D_hnTAe2.js';
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
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
    lineNumber: 26,
    columnNumber: 2
  },
  undefined
);
const DynamicDashboardUser = ({
  Domain,
  ClientIdentifier
}) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Auth0Provider,
  {
    Children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DashboardUserInner, {}, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
      lineNumber: 57,
      columnNumber: 13
    }, undefined),
    ...Domain ? { Domain } : {},
    ...ClientIdentifier ? { ClientIdentifier } : {}
  },
  void 0,
  false,
  {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
    lineNumber: 56,
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
const DashboardUserInner = () => {
  const {
    isLoading: IsLoading,
    isAuthenticated: IsAuthenticated,
    user: User,
    error: AuthError,
    loginWithRedirect: Login,
    logout: Auth0Logout
  } = useAuth0();
  const { t: T } = useTranslation("common");
  const [PIIVisible, SetPIIVisible] = reactExports.useState(false);
  if (IsAuthenticated && User) {
    try {
      const LegacyUser = {
        id: User.sub || "",
        email: User.email || "",
        username: User.nickname || User.email?.split("@")[0] || "",
        displayName: User.name || "",
        avatarUrl: User.picture || "",
        provider: DetectProvider(User.sub),
        emailVerified: User.email_verified || false,
        createdAt: User.updated_at || (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: User.updated_at || (/* @__PURE__ */ new Date()).toISOString()
      };
      localStorage.setItem("current_user", JSON.stringify(LegacyUser));
    } catch {
    }
  }
  const HandleSignOut = () => {
    ClearAuthFromServiceWorker();
    ClearLegacyTokens();
    Auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  };
  if (IsLoading) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        className: "space-y-3",
        "aria-label": T("dashboard.loading", {
          defaultValue: "Loading account..."
        }),
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "mx-auto h-12 w-12" }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
            lineNumber: 134,
            columnNumber: 5
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "h-4 w-full" }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
            lineNumber: 135,
            columnNumber: 5
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "h-4 w-4/5" }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
            lineNumber: 136,
            columnNumber: 5
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "h-4 w-3/5" }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
            lineNumber: 137,
            columnNumber: 5
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "h-4 w-2/5" }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
            lineNumber: 138,
            columnNumber: 5
          }, undefined)
        ]
      },
      void 0,
      true,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 129,
        columnNumber: 4
      },
      undefined
    );
  }
  if (AuthError) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", role: "alert", "aria-live": "polite", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-destructive", children: T("dashboard.error", {
        defaultValue: "Could not load your account. Please refresh."
      }) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 146,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-muted-foreground", children: AuthError.message }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 152,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => window.location.reload(),
          children: T("tryAgain", { defaultValue: "Try again" })
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
          lineNumber: 153,
          columnNumber: 5
        },
        undefined
      )
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
      lineNumber: 145,
      columnNumber: 4
    }, undefined);
  }
  if (!IsAuthenticated || !User) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-muted-foreground", children: T("dashboard.account.notSignedIn", {
        defaultValue: "Sign in to see your account details."
      }) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 166,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          type: "button",
          onClick: () => Login(),
          className: "StaccatoButton inline-flex items-center justify-center bg-[var(--Primary)] px-4 py-1.5 font-medium text-[var(--PrimaryForeground)] transition-all hover:opacity-90",
          children: T("dashboard.account.signInButton", {
            defaultValue: "Sign In"
          })
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
          lineNumber: 171,
          columnNumber: 5
        },
        undefined
      )
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
      lineNumber: 165,
      columnNumber: 4
    }, undefined);
  }
  const DisplayName = User.name && User.name !== User.email ? User.name : User.nickname || User.email?.split("@")[0] || "User";
  const MemberSince = User.updated_at ? new Date(User.updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long"
  }) : "--";
  const ProviderLabel = DetectProviderLabel(User.sub);
  const ProviderIcon = DetectProviderIcon(User.sub);
  const IsEnterprise = IsEnterpriseUser(User.sub);
  const OrganizationName = User["org_name"];
  const OrganizationIdentifier = User["org_id"];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        type: "button",
        onClick: () => SetPIIVisible((v) => !v),
        "aria-label": PIIVisible ? "Hide personal data" : "Show personal data",
        className: "text-muted-foreground transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
        children: PIIVisible ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EyeOff, { className: "h-4 w-4", "aria-hidden": "true" }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
          lineNumber: 217,
          columnNumber: 7
        }, undefined) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Eye, { className: "h-4 w-4", "aria-hidden": "true" }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
          lineNumber: 219,
          columnNumber: 7
        }, undefined)
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 209,
        columnNumber: 5
      },
      undefined
    ) }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
      lineNumber: 208,
      columnNumber: 4
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        className: `flex justify-center pb-2 transition-all duration-200 ${PIIVisible ? "" : "blur-sm"}`,
        children: [
          User.picture ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "img",
            {
              src: User.picture,
              alt: `${DisplayName} avatar`,
              title: DisplayName,
              width: "48",
              height: "48",
              loading: "lazy",
              className: "h-12 w-12 rounded-none",
              onError: (Event) => {
                Event.target.style.display = "none";
                const Fallback = Event.target.nextElementSibling;
                if (Fallback) Fallback.style.display = "flex";
              }
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
              lineNumber: 228,
              columnNumber: 6
            },
            undefined
          ) : null,
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "div",
            {
              className: `${User.picture ? "hidden" : "flex"} h-12 w-12 items-center justify-center rounded-none bg-[var(--Mute)] text-lg font-bold text-muted-foreground`,
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pii, { visible: PIIVisible, children: DisplayName.slice(0, 1).toUpperCase() }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
                lineNumber: 248,
                columnNumber: 6
              }, undefined)
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
              lineNumber: 245,
              columnNumber: 5
            },
            undefined
          )
        ]
      },
      void 0,
      true,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 225,
        columnNumber: 4
      },
      undefined
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-muted-foreground", children: T("dashboard.account.nameLabel", { defaultValue: "Name" }) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 256,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pii, { visible: PIIVisible, children: DisplayName }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 260,
        columnNumber: 6
      }, undefined) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 259,
        columnNumber: 5
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
      lineNumber: 255,
      columnNumber: 4
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-muted-foreground", children: T("dashboard.account.emailLabel", {
        defaultValue: "Email"
      }) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 266,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-muted-foreground", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pii, { visible: PIIVisible, children: User.email || "--" }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
          lineNumber: 273,
          columnNumber: 7
        }, undefined) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
          lineNumber: 272,
          columnNumber: 6
        }, undefined),
        User.email_verified === true && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "span",
          {
            className: "inline-flex items-center border border-green-200 bg-green-50 px-1.5 py-0 text-[10px] font-medium text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
            title: T("dashboard.account.emailVerifiedTitle", {
              defaultValue: "Email verified"
            }),
            children: [
              T("dashboard.account.emailVerifiedBadge", {
                defaultValue: "Verified"
              }),
              " ",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                CircleCheck,
                {
                  "aria-hidden": "true",
                  className: "inline h-4 w-4 align-[-3px] text-[var(--SpinegRPCFore)]"
                },
                void 0,
                false,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
                  lineNumber: 284,
                  columnNumber: 8
                },
                undefined
              )
            ]
          },
          void 0,
          true,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
            lineNumber: 276,
            columnNumber: 7
          },
          undefined
        )
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 271,
        columnNumber: 5
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
      lineNumber: 265,
      columnNumber: 4
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-muted-foreground", children: T("dashboard.account.planLabel", { defaultValue: "Plan" }) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 295,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium", children: IsEnterprise ? T("dashboard.account.planEnterprise", {
        defaultValue: "Enterprise"
      }) : T("dashboard.account.planFree", {
        defaultValue: "Free"
      }) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 298,
        columnNumber: 5
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
      lineNumber: 294,
      columnNumber: 4
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-muted-foreground", children: T("dashboard.account.providerLabel", {
        defaultValue: "Provider"
      }) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 311,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
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
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
            lineNumber: 318,
            columnNumber: 7
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pii, { visible: PIIVisible, children: ProviderLabel }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
          lineNumber: 326,
          columnNumber: 6
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 316,
        columnNumber: 5
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
      lineNumber: 310,
      columnNumber: 4
    }, undefined),
    IsEnterprise && (OrganizationName || OrganizationIdentifier) && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-muted-foreground", children: T("dashboard.account.organizationLabel", {
        defaultValue: "Organization"
      }) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 333,
        columnNumber: 6
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pii, { visible: PIIVisible, children: OrganizationName || OrganizationIdentifier }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 339,
        columnNumber: 7
      }, undefined) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 338,
        columnNumber: 6
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
      lineNumber: 332,
      columnNumber: 5
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-muted-foreground", children: T("dashboard.account.memberSinceLabel", {
        defaultValue: "Member Since"
      }) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 348,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-muted-foreground", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pii, { visible: PIIVisible, children: MemberSince }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 354,
        columnNumber: 6
      }, undefined) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
        lineNumber: 353,
        columnNumber: 5
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
      lineNumber: 347,
      columnNumber: 4
    }, undefined),
    IsEnterprise && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-2 border border-green-200 bg-green-50 px-3 py-2 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300", children: [
      T("dashboard.account.enterpriseSSO", {
        defaultValue: "Enterprise SSO active"
      }),
      " ",
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Building2,
        {
          "aria-hidden": "true",
          className: "inline h-4 w-4 align-[-3px]"
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
          lineNumber: 364,
          columnNumber: 6
        },
        undefined
      )
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
      lineNumber: 360,
      columnNumber: 5
    }, undefined),
    User.email_verified === false && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-2 border border-yellow-200 bg-yellow-50 px-3 py-2 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300", children: [
      T("dashboard.account.emailNotVerified", {
        defaultValue: "Email not verified. Check your inbox."
      }),
      " ",
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        TriangleAlert,
        {
          "aria-hidden": "true",
          className: "inline h-4 w-4 align-[-3px]"
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
          lineNumber: 377,
          columnNumber: 6
        },
        undefined
      )
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
      lineNumber: 373,
      columnNumber: 5
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-3 flex gap-2", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "a",
        {
          href: "/Account",
          className: "StaccatoButton inline-flex flex-1 items-center justify-center bg-card px-3 py-1.5 font-medium transition-all hover:bg-[var(--Secondary)]",
          children: T("dashboard.account.manageButton", {
            defaultValue: "Manage"
          })
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
          lineNumber: 386,
          columnNumber: 5
        },
        undefined
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          type: "button",
          onClick: HandleSignOut,
          className: "StaccatoButton inline-flex flex-1 items-center justify-center bg-card px-3 py-1.5 font-medium text-red-600 transition-all hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950",
          children: T("dashboard.account.signOutButton", {
            defaultValue: "Sign Out"
          })
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
          lineNumber: 393,
          columnNumber: 5
        },
        undefined
      )
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
      lineNumber: 385,
      columnNumber: 4
    }, undefined)
  ] }, void 0, true, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
    lineNumber: 206,
    columnNumber: 3
  }, undefined);
};
const DetectProvider = (Sub) => {
  if (!Sub) return "email";
  if (Sub.startsWith("github|")) return "github";
  if (Sub.startsWith("google-oauth2|")) return "google";
  if (Sub.startsWith("gitlab|")) return "gitlab";
  if (Sub.startsWith("okta|")) return "okta";
  return "email";
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
const IsEnterpriseUser = (Sub) => {
  if (!Sub) return false;
  return Sub.startsWith("okta|") || Sub.startsWith("samlp|") || Sub.startsWith("waad|");
};

export { DynamicDashboardUser as default };
//# sourceMappingURL=DynamicDashboardUser.DIxPFh0S.js.map
