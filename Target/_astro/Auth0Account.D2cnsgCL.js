import { b3 as useAuth0, b4 as useTranslation, b2 as reactExports, b1 as jsxDevRuntimeExports } from './Vendor/React.D_hnTAe2.js';
import { a as Auth0Provider } from './Footer.J6XKs53r.js';
import { H as Header } from './Header.Dqizcpbn.js';
import { B as Button } from './Skeleton.Dp5ep6F2.js';

const Auth0AccountGate = ({
  Route,
  Header: HeaderContent,
  Connection,
  Organization
}) => {
  const {
    isLoading: IsLoading,
    isAuthenticated: IsAuthenticated,
    error: Error,
    loginWithRedirect: Login,
    logout: Auth0Logout,
    user: User,
    getAccessTokenSilently: GetToken
  } = useAuth0();
  const { t: T } = useTranslation("account");
  const EnterpriseParams = {};
  if (Connection) EnterpriseParams["connection"] = Connection;
  if (Organization) EnterpriseParams["organization"] = Organization;
  const URLConnection = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("connection") : null;
  const URLOrganization = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("organization") : null;
  if (URLConnection) EnterpriseParams["connection"] = URLConnection;
  if (URLOrganization) EnterpriseParams["organization"] = URLOrganization;
  const LoginWithParams = (Extra) => Login({
    authorizationParams: {
      ...EnterpriseParams,
      ...Extra
    }
  });
  const Signup = () => LoginWithParams({ screen_hint: "signup" });
  const Logout = () => Auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  reactExports.useEffect(() => {
    if (IsLoading || !IsAuthenticated) return;
    (async () => {
      try {
        const Token = await GetToken();
        if (typeof navigator !== "undefined" && navigator.serviceWorker?.controller) {
          await new Promise((Resolve) => {
            const Timeout = setTimeout(Resolve, 5e3);
            const OnMessage = (Event) => {
              if (Event.data?.Type === "Auth:Written") {
                clearTimeout(Timeout);
                navigator.serviceWorker.removeEventListener(
                  "message",
                  OnMessage
                );
                Resolve();
              }
            };
            navigator.serviceWorker.addEventListener(
              "message",
              OnMessage
            );
            navigator.serviceWorker.controller.postMessage({
              Type: "Auth:Write",
              Token,
              ExpiresAt: Date.now() + 36e5,
              UserId: User?.sub ?? ""
            });
          });
        }
      } catch {
      }
      const Next = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("next") : null;
      window.location.replace(Next || "/Dashboard");
    })();
  }, [IsLoading, IsAuthenticated]);
  reactExports.useEffect(() => {
    if (IsLoading || IsAuthenticated) return;
    if (Route === "signup" && true) return;
    if (Route === "signup") {
      Signup();
    } else {
      LoginWithParams();
    }
  }, [IsLoading, IsAuthenticated, Route]);
  if (Route === "signup" && true) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex min-h-screen flex-col", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Header,
        {
          ...HeaderContent ? { content: HeaderContent } : {}
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
          lineNumber: 151,
          columnNumber: 5
        },
        undefined
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-5 px-4 text-center", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "StaccatoBadge bg-[var(--Mute)] px-3 py-1 font-semibold uppercase tracking-wider text-muted-foreground", children: "Coming Soon" }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
          lineNumber: 155,
          columnNumber: 6
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-2xl font-semibold", children: T("registrationComingSoon.title", {
          defaultValue: "Registration is not open yet"
        }) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
          lineNumber: 158,
          columnNumber: 6
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-muted-foreground", children: T("registrationComingSoon.description", {
          defaultValue: "Account creation is disabled while the portal flow is being finished. Existing sign-in remains available for configured accounts."
        }) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
          lineNumber: 163,
          columnNumber: 6
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "/Account/SignIn", children: T("registrationComingSoon.signIn", {
          defaultValue: "Sign In"
        }) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
          lineNumber: 170,
          columnNumber: 7
        }, undefined) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
          lineNumber: 169,
          columnNumber: 6
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
        lineNumber: 154,
        columnNumber: 5
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
      lineNumber: 150,
      columnNumber: 4
    }, undefined);
  }
  if (IsLoading) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex min-h-screen flex-col", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Header,
        {
          ...HeaderContent ? { content: HeaderContent } : {}
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
          lineNumber: 184,
          columnNumber: 5
        },
        undefined
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-1 items-center justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-muted-foreground", children: T("loading", { defaultValue: "Loading..." }) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
        lineNumber: 188,
        columnNumber: 6
      }, undefined) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
        lineNumber: 187,
        columnNumber: 5
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
      lineNumber: 183,
      columnNumber: 4
    }, undefined);
  }
  if (Error) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex min-h-screen flex-col", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Header,
        {
          ...HeaderContent ? { content: HeaderContent } : {}
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
          lineNumber: 199,
          columnNumber: 5
        },
        undefined
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-1 flex-col items-center justify-center gap-4 px-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-destructive", children: [
          T("error", {
            defaultValue: "Authentication error"
          }),
          ": ",
          Error.message
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
          lineNumber: 203,
          columnNumber: 6
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", onClick: () => Login(), children: T("tryAgain", {
          defaultValue: "Try again"
        }) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
          lineNumber: 209,
          columnNumber: 6
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
        lineNumber: 202,
        columnNumber: 5
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
      lineNumber: 198,
      columnNumber: 4
    }, undefined);
  }
  if (IsAuthenticated && User) {
    const DisplayName = User.name && User.name !== User.email ? User.name : User.nickname || User.email?.split("@")[0] || "User";
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex min-h-screen flex-col", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Header,
        {
          ...HeaderContent ? { content: HeaderContent } : {}
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
          lineNumber: 227,
          columnNumber: 5
        },
        undefined
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-6 px-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "default", className: "w-full", asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "/Dashboard", children: T("dashboard", {
          defaultValue: "Go to Dashboard"
        }) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
          lineNumber: 232,
          columnNumber: 7
        }, undefined) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
          lineNumber: 231,
          columnNumber: 6
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Button,
          {
            variant: "outline",
            className: "w-full",
            onClick: Logout,
            children: T("logout", {
              defaultValue: "Sign Out"
            })
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
            lineNumber: 239,
            columnNumber: 6
          },
          undefined
        ),
        User.picture && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "img",
          {
            src: User.picture,
            alt: User.name || "User avatar",
            title: User.name || "User avatar",
            width: "64",
            height: "64",
            className: "h-16 w-16 rounded-none"
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
            lineNumber: 249,
            columnNumber: 7
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-semibold", children: DisplayName }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
          lineNumber: 259,
          columnNumber: 6
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-muted-foreground", children: User.email }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
          lineNumber: 261,
          columnNumber: 6
        }, undefined),
        User.email_verified === false && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "border border-yellow-200 bg-yellow-50 px-3 py-2 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300", children: T("emailNotVerified", {
          defaultValue: "Email not verified. Check your inbox."
        }) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
          lineNumber: 264,
          columnNumber: 7
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
        lineNumber: 230,
        columnNumber: 5
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
      lineNumber: 226,
      columnNumber: 4
    }, undefined);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Header, { ...HeaderContent ? { Content: HeaderContent } : {} }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
      lineNumber: 279,
      columnNumber: 4
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-1 items-center justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-muted-foreground", children: T("redirecting", {
      defaultValue: "Redirecting to sign in..."
    }) }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
      lineNumber: 281,
      columnNumber: 5
    }, undefined) }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
      lineNumber: 280,
      columnNumber: 4
    }, undefined)
  ] }, void 0, true, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0AccountGate.tsx",
    lineNumber: 278,
    columnNumber: 3
  }, undefined);
};

const Auth0Account = ({
  Route,
  Header,
  Domain,
  ClientIdentifier,
  Connection,
  Organization
}) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Auth0Provider,
  {
    Children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Auth0AccountGate,
      {
        Route,
        ...Header ? { Header } : {},
        ...Connection ? { Connection } : {},
        ...Organization ? { Organization } : {}
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0Account.tsx",
        lineNumber: 46,
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
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0Account.tsx",
    lineNumber: 44,
    columnNumber: 2
  },
  undefined
);

export { Auth0Account as default };
//# sourceMappingURL=Auth0Account.D2cnsgCL.js.map
