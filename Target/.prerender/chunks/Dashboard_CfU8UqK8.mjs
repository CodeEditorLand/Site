import { c as createComponent, G as GetI18n, $ as $$Base } from './Base_Czy5kkbA.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './prerender_SnvtGgzS.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { H as Header } from './Header_y9oh1c8T.mjs';
import { Auth0Provider as Auth0Provider$1, useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import { B as Button } from './Button_CXQgZ_zQ.mjs';

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
      redirect_uri: typeof window !== "undefined" ? window.location.origin : void 0,
      ...Organization ? { organization: Organization } : {}
    },
    children: Children
  }
);

const DynamicAuthStatus = ({
  SignInHref = "/Account/SignIn",
  DashboardHref = "/Dashboard",
  Compact = false
}) => {
  const {
    isLoading: IsLoading,
    isAuthenticated: IsAuthenticated,
    user: User,
    logout: Auth0Logout
  } = useAuth0();
  const { t: T } = useTranslation("header");
  if (IsLoading) {
    return /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "…" });
  }
  if (!IsAuthenticated || !User) {
    return /* @__PURE__ */ jsx(
      Button,
      {
        variant: "ghost",
        size: "default",
        className: "StaccatoButton",
        asChild: true,
        children: /* @__PURE__ */ jsxs("a", { href: SignInHref, children: [
          T("actions.signIn", "Sign In"),
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
        ] })
      }
    );
  }
  const DisplayName = User.name && User.name !== User.email ? User.name : User.nickname || User.email?.split("@")[0] || "User";
  const Logout = () => Auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  if (Compact) {
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      User.picture && /* @__PURE__ */ jsx(
        "img",
        {
          src: User.picture,
          alt: User.name || "User avatar",
          title: User.name || "User avatar",
          width: "24",
          height: "24",
          className: "h-6 w-6 rounded-none border border-[var(--Border)]"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: DashboardHref,
          className: "text-xs font-medium text-foreground hover:underline",
          children: DisplayName
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    User.picture && /* @__PURE__ */ jsx(
      "img",
      {
        src: User.picture,
        alt: User.name || "User avatar",
        title: User.name || "User avatar",
        width: "28",
        height: "28",
        className: "h-7 w-7 rounded-none border border-[var(--Border)]"
      }
    ),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: DashboardHref,
        className: "text-xs font-medium text-foreground hover:underline",
        children: DisplayName
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "ghost",
        size: "sm",
        className: "h-7 px-2 text-xs",
        onClick: Logout,
        children: T("actions.logout", "Logout")
      }
    )
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
    ...Content ? { content: Content } : {},
    AuthSlot: /* @__PURE__ */ jsx(DynamicAuthStatus, {})
  }
);

const DynamicDashboardUser = ({
  Domain,
  ClientIdentifier
}) => /* @__PURE__ */ jsx(
  Auth0Provider,
  {
    Children: /* @__PURE__ */ jsx(DashboardUserInner, {}),
    ...Domain ? { Domain } : {},
    ...ClientIdentifier ? { ClientIdentifier } : {}
  }
);
const DashboardUserInner = () => {
  const {
    isLoading: IsLoading,
    isAuthenticated: IsAuthenticated,
    user: User,
    loginWithRedirect: Login
  } = useAuth0();
  const { t: T } = useTranslation("common");
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
  if (IsLoading) {
    return /* @__PURE__ */ jsx("div", { className: "space-y-3 text-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: T("dashboard.account.emailLabel", {
        defaultValue: "Email"
      }) }),
      /* @__PURE__ */ jsx("span", { className: "animate-pulse text-muted-foreground", children: "…" })
    ] }) });
  }
  if (!IsAuthenticated || !User) {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: T("dashboard.account.notSignedIn", {
        defaultValue: "Sign in to see your account details."
      }) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => Login(),
          className: "StaccatoButton inline-flex items-center justify-center border border-[var(--Border)] bg-[var(--Primary)] px-4 py-1.5 text-sm font-medium text-white transition-all hover:opacity-90",
          children: T("dashboard.account.signInButton", {
            defaultValue: "Sign In"
          })
        }
      )
    ] });
  }
  const DisplayName = User.name && User.name !== User.email ? User.name : User.nickname || User.email?.split("@")[0] || "User";
  const MemberSince = User.updated_at ? new Date(User.updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long"
  }) : "--";
  const ProviderLabel = DetectProviderLabel(User.sub);
  const IsEnterprise = IsEnterpriseUser(User.sub);
  const OrganizationName = User["org_name"];
  const OrganizationIdentifier = User["org_id"];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm", children: [
    User.picture && /* @__PURE__ */ jsx("div", { className: "flex justify-center pb-2", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: User.picture,
        alt: User.name || "User avatar",
        title: User.name || "User avatar",
        width: "48",
        height: "48",
        className: "h-12 w-12 rounded-none border border-[var(--Border)]"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: T("dashboard.account.nameLabel", { defaultValue: "Name" }) }),
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: DisplayName })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: T("dashboard.account.emailLabel", {
        defaultValue: "Email"
      }) }),
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: User.email || "--" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: T("dashboard.account.planLabel", { defaultValue: "Plan" }) }),
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: IsEnterprise ? T("dashboard.account.planEnterprise", {
        defaultValue: "Enterprise"
      }) : T("dashboard.account.planFree", {
        defaultValue: "Free"
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: T("dashboard.account.providerLabel", {
        defaultValue: "Provider"
      }) }),
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: ProviderLabel })
    ] }),
    IsEnterprise && (OrganizationName || OrganizationIdentifier) && /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: T("dashboard.account.organizationLabel", {
        defaultValue: "Organization"
      }) }),
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: OrganizationName || OrganizationIdentifier })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: T("dashboard.account.memberSinceLabel", {
        defaultValue: "Member Since"
      }) }),
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: MemberSince })
    ] }),
    IsEnterprise && /* @__PURE__ */ jsxs("div", { className: "mt-2 border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-700", children: [
      T("dashboard.account.enterpriseSSO", {
        defaultValue: "Enterprise SSO active"
      }),
      " ",
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "inline-block h-1.5 w-1.5 rounded-none bg-green-500",
          "aria-hidden": "true"
        }
      )
    ] }),
    User.email_verified === false && /* @__PURE__ */ jsx("div", { className: "mt-2 border border-yellow-200 bg-yellow-50 px-3 py-2 text-xs text-yellow-700", children: T("dashboard.account.emailNotVerified", {
      defaultValue: "Email not verified. Check your inbox."
    }) })
  ] });
};
const DetectProvider = (Sub) => {
  if (!Sub) return "email";
  if (Sub.startsWith("github|")) return "github";
  if (Sub.startsWith("google-oauth2|")) return "google";
  if (Sub.startsWith("gitlab|")) return "gitlab";
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
const IsEnterpriseUser = (Sub) => {
  if (!Sub) return false;
  return Sub.startsWith("okta|") || Sub.startsWith("samlp|") || Sub.startsWith("waad|");
};

const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const T = GetI18n();
  const Auth0Domain = (await import('./Auth0Domain_BKddKNn2.mjs')).default;
  const Auth0ClientIdentifier = (await import('./Auth0ClientIdentifier_DCXeU6DG.mjs')).default;
  const MetaTitle = T("meta.dashboard.title", {
    defaultValue: "Dashboard | Code Editor Land"
  });
  const MetaDescription = T("meta.dashboard.description", {
    defaultValue: "Your Code Editor Land account dashboard."
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription, "Url": "https://editor.land/Dashboard", "lang": "en" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "DynamicAuthHeader", DynamicAuthHeader, { "client:load": true, "Domain": Auth0Domain, "ClientIdentifier": Auth0ClientIdentifier, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthHeader", "client:component-export": "default" })} ${maybeRenderHead()}<div class="container mx-auto max-w-5xl px-4 py-16"> <!-- Breadcrumbs --> <nav aria-label="Breadcrumb" class="mb-8"> <ol class="flex flex-wrap items-center space-x-2 text-sm text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground">${T("common.breadcrumb.home", {
    defaultValue: "Home"
  })}</a> </li> <li class="mx-2">/</li> <li> <span class="font-medium text-foreground">${T("common.dashboard.breadcrumbLabel", {
    defaultValue: "Dashboard"
  })}</span> </li> </ol> </nav> <!-- Page Header --> <header class="mb-12" aria-label="Dashboard page header"> <div class="mb-4 flex items-center gap-4"> <picture> <img alt="Code Editor Land logo" title="Code Editor Land" src="/Asset/Logo/Glyph/Land.svg" width="40" height="40"> </picture> <div class="flex flex-col"> <h1 class="text-4xl font-bold tracking-tight"> ${T("common.dashboard.pageTitle", {
    defaultValue: "Welcome"
  })} </h1> <p class="text-lg text-muted-foreground"> ${T("common.dashboard.pageSubtitle", {
    defaultValue: "Manage your Code Editor Land account and preferences."
  })} </p> </div> </div> <div class="flex flex-wrap items-center gap-3 text-xs text-muted-foreground"> <span class="inline-flex items-center border border-green-200 bg-green-50 px-2.5 py-0.5 font-medium text-green-700">
No Telemetry${" "}<span class="h-1.5 w-1.5 rounded-none bg-green-500" aria-hidden="true"></span> </span> <span class="inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-2.5 py-0.5 font-medium">
CC0 Licensed
</span> <span class="inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-2.5 py-0.5 font-medium">
PGP Signed
</span> <span class="inline-flex items-center border border-blue-200 bg-blue-50 px-2.5 py-0.5 font-medium text-blue-700">
Mountain Workbench${" "}<span class="h-1.5 w-1.5 rounded-none bg-blue-500" aria-hidden="true"></span> </span> </div> </header> <!-- Dashboard Grid --> <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"> <!-- Account Info Card --> <div class="StaccatoCard StaccatoBorderShimmer border border-[var(--Border)] bg-white p-6"> <h2 class="mb-4 text-lg font-semibold"> ${T("common.dashboard.account.heading", {
    defaultValue: "Account"
  })} </h2> ${renderComponent($$result2, "DynamicDashboardUser", DynamicDashboardUser, { "client:load": true, "Domain": Auth0Domain, "ClientIdentifier": Auth0ClientIdentifier, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser", "client:component-export": "default" })} </div> <!-- Downloads Card --> <div class="StaccatoCard StaccatoBorderShimmer border border-[var(--Border)] bg-white p-6"> <h2 class="mb-4 text-lg font-semibold"> ${T("common.dashboard.downloads.heading", {
    defaultValue: "Downloads"
  })} </h2> <a href="/Download" class="StaccatoButton h- mb-3 inline-flex items-center justify-center border border-[var(--Border)] bg-[var(--Primary)] px-4 text-sm font-medium text-white transition-all hover:opacity-90 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"> ${T("common.dashboard.downloads.goButton", {
    defaultValue: "Go to Downloads"
  })} </a> <p class="text-sm text-muted-foreground"> ${T("common.dashboard.downloads.description", {
    defaultValue: "Download the latest version of Code Editor Land for your platform."
  })} </p> </div> <!-- Quick Links Card --> <div class="StaccatoCard StaccatoBorderShimmer border border-[var(--Border)] bg-white p-6"> <h2 class="mb-4 text-lg font-semibold"> ${T("common.dashboard.quickLinks.heading", {
    defaultValue: "Quick Links"
  })} </h2> <ul class="space-y-2 text-sm"> <li> <a href="/Doc" class="text-[var(--Primary)] hover:underline"> ${T("common.dashboard.quickLinks.docs", {
    defaultValue: "Documentation"
  })} </a> </li> <li> <a href="https://github.com/CodeEditorLand/Land/issues" target="_blank" rel="noopener noreferrer" class="text-[var(--Primary)] hover:underline"> ${T("common.dashboard.quickLinks.reportIssue", {
    defaultValue: "Report an Issue"
  })} </a> </li> <li> <a href="/Contributing" class="text-[var(--Primary)] hover:underline"> ${T("common.dashboard.quickLinks.contribute", {
    defaultValue: "Contribute"
  })} </a> </li> </ul> </div> </div> <!-- Telemetry Status Panel --> <section class="mt-12"> <h2 class="mb-6 text-2xl font-semibold"> ${T("common.dashboard.telemetry.heading", {
    defaultValue: "Telemetry Status"
  })} </h2> <div class="StaccatoCard StaccatoBorderShimmer border border-[var(--Border)] bg-white"> <div class="flex items-center justify-between border-b border-[var(--Border)] p-5"> <div class="flex-1"> <div class="flex items-center gap-3"> <span class="inline-flex items-center border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
Disabled${" "}<span class="h-2 w-2 rounded-none bg-green-500" aria-hidden="true"></span> </span> <span class="inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-3 py-1 text-xs font-medium text-muted-foreground">
No Telemetry
</span> </div> <h3 class="mt-2 font-medium"> ${T(
    "common.dashboard.telemetry.production.title",
    {
      defaultValue: "Production Build Telemetry"
    }
  )} </h3> <p class="mt-1 text-sm text-muted-foreground"> ${T(
    "common.dashboard.telemetry.production.description",
    {
      defaultValue: "Telemetry is disabled by default. The Telemetry Cargo feature is not in default features. All tracing compiles to zero-cost no-ops."
    }
  )} </p> </div> </div> <div class="flex items-center justify-between border-b border-[var(--Border)] p-5"> <div class="flex-1"> <div class="flex items-center gap-3"> <span class="inline-flex items-center border border-yellow-200 bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
Optional${" "}<span class="h-2 w-2 rounded-none bg-yellow-500" aria-hidden="true"></span> </span> </div> <h3 class="mt-2 font-medium"> ${T("common.dashboard.telemetry.otel.title", {
    defaultValue: "OpenTelemetry (Opt-In)"
  })} </h3> <p class="mt-1 text-sm text-muted-foreground"> ${T(
    "common.dashboard.telemetry.otel.description",
    {
      defaultValue: "Enable with cargo build --features Telemetry. Local-only OTEL tracing, metrics, and distributed spans. No external transmission."
    }
  )} </p> </div> </div> <div class="p-5"> <div class="flex items-center gap-3"> <span class="inline-flex items-center border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
Active${" "}<span class="h-2 w-2 rounded-none bg-blue-500" aria-hidden="true"></span> </span> </div> <h3 class="mt-2 font-medium"> ${T("common.dashboard.telemetry.effect.title", {
    defaultValue: "Effect-TS Local Telemetry"
  })} </h3> <p class="mt-1 text-sm text-muted-foreground"> ${T("common.dashboard.telemetry.effect.description", {
    defaultValue: "Cocoon extension host uses TelemetryService for internal RPC instrumentation and bootstrap timing. All data stays local."
  })} </p> </div> </div> </section> <!-- Build Log Panel (Local-First Only) --> <section class="mt-12"> <h2 class="mb-2 text-2xl font-semibold"> ${T("common.dashboard.buildLog.heading", {
    defaultValue: "Build Configuration"
  })} </h2> <p class="mb-6 text-sm text-muted-foreground"> ${T("common.dashboard.buildLog.subtitle", {
    defaultValue: "Active build variant and deployment mode. Available via Local-First Air Daemon connection."
  })} </p> <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"> <!-- Active Profile --> <div class="StaccatoCard StaccatoBorderShimmer border border-[var(--Border)] bg-white p-6"> <div class="flex items-center justify-between"> <h3 class="text-lg font-semibold"> ${T("common.dashboard.buildLog.profile.heading", {
    defaultValue: "Active Profile"
  })} </h3> <span class="inline-flex items-center border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
Recommended${" "}<span class="h-2 w-2 rounded-none bg-blue-500" aria-hidden="true"></span> </span> </div> <div class="mt-4 space-y-2 text-sm"> <div class="flex justify-between"> <span class="text-muted-foreground">Profile</span> <code class="text-xs">production</code> </div> <div class="flex justify-between"> <span class="text-muted-foreground">Workbench</span> <span class="font-medium">Mountain</span> </div> <div class="flex justify-between"> <span class="text-muted-foreground">Features</span> <span>80-90%</span> </div> <div class="flex justify-between"> <span class="text-muted-foreground">Compiler</span> <code class="text-xs">esbuild</code> </div> </div> </div> <!-- Deployment Mode --> <div class="StaccatoCard StaccatoBorderShimmer border border-[var(--Border)] bg-white p-6"> <div class="flex items-center justify-between"> <h3 class="text-lg font-semibold"> ${T(
    "common.dashboard.buildLog.deployment.heading",
    {
      defaultValue: "Deployment Mode"
    }
  )} </h3> <span class="inline-flex items-center border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
Active${" "}<span class="h-2 w-2 rounded-none bg-green-500" aria-hidden="true"></span> </span> </div> <div class="mt-4 space-y-2 text-sm"> <div class="flex justify-between"> <span class="text-muted-foreground">Mode</span> <span class="font-medium">Production Release</span> </div> <div class="flex justify-between"> <span class="text-muted-foreground">NODE_ENV</span> <code class="text-xs">production</code> </div> <div class="flex justify-between"> <span class="text-muted-foreground">RUST_LOG</span> <code class="text-xs">info</code> </div> <div class="flex justify-between"> <span class="text-muted-foreground">Bundle</span> <span>Full</span> </div> </div> </div> <!-- Test Matrix --> <div class="StaccatoCard StaccatoBorderShimmer border border-[var(--Border)] bg-white p-6"> <div class="flex items-center justify-between"> <h3 class="text-lg font-semibold"> ${T("common.dashboard.buildLog.matrix.heading", {
    defaultValue: "Test Matrix"
  })} </h3> <span class="inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-3 py-1 text-xs font-medium text-muted-foreground">
16 Permutations
</span> </div> <div class="mt-4 space-y-2 text-sm"> <div class="flex justify-between"> <span class="text-muted-foreground">Profiles</span> <span>9 named</span> </div> <div class="flex justify-between"> <span class="text-muted-foreground">Workbenches</span> <span>5 variants</span> </div> <div class="flex justify-between"> <span class="text-muted-foreground">Compilers</span> <span>esbuild, OXC</span> </div> <div class="flex justify-between"> <span class="text-muted-foreground">Permutations</span> <span class="font-medium">16 verified</span> </div> </div> </div> </div> </section> <!-- Portal Tier Access --> <section class="mt-12"> <h2 class="mb-2 text-2xl font-semibold"> ${T("common.dashboard.portal.heading", {
    defaultValue: "Authentication Tiers"
  })} </h2> <p class="mb-6 text-sm text-muted-foreground"> ${T("common.dashboard.portal.subtitle", {
    defaultValue: "Your current authentication method and available tiers."
  })} </p> <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"> <a href="/Portal" class="StaccatoCard StaccatoBorderShimmer flex items-center gap-4 border border-[var(--Border)] bg-white p-5 transition-all hover:border-blue-300"> <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-blue-200 bg-blue-50"> <span class="text-lg text-blue-600" aria-hidden="true">&#9729;</span> </div> <div> <h3 class="font-medium">Cloud</h3> <p class="text-xs text-muted-foreground">
Auth0 &middot; HTTPS / TLS 1.3
</p> </div> <span class="ml-auto inline-flex items-center border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
Online${" "}<span class="h-1.5 w-1.5 rounded-none bg-blue-500" aria-hidden="true"></span> </span> </a> <a href="/Portal" class="StaccatoCard StaccatoBorderShimmer flex items-center gap-4 border border-[var(--Border)] bg-white p-5 transition-all hover:border-purple-300"> <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-purple-200 bg-purple-50"> <span class="text-lg text-purple-600" aria-hidden="true">&#9831;</span> </div> <div> <h3 class="font-medium">Provider</h3> <p class="text-xs text-muted-foreground">
OAuth 2.0 &middot; PKCE
</p> </div> <span class="ml-auto inline-flex items-center border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs text-purple-700">
OAuth${" "}<span class="h-1.5 w-1.5 rounded-none bg-purple-500" aria-hidden="true"></span> </span> </a> <a href="/Portal" class="StaccatoCard StaccatoBorderShimmer flex items-center gap-4 border border-[var(--Border)] bg-white p-5 transition-all hover:border-orange-300"> <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-orange-200 bg-orange-50"> <span class="text-lg text-orange-600" aria-hidden="true">&#9881;</span> </div> <div> <h3 class="font-medium">Local-First</h3> <p class="text-xs text-muted-foreground">
mTLS &middot; CRDTs &middot; WebSocket
</p> </div> <span class="ml-auto inline-flex items-center border border-orange-200 bg-orange-50 px-2 py-0.5 text-xs text-orange-700">
Local${" "}<span class="h-1.5 w-1.5 rounded-none bg-orange-500" aria-hidden="true"></span> </span> </a> <a href="/Portal" class="StaccatoCard StaccatoBorderShimmer flex items-center gap-4 border border-[var(--Border)] bg-white p-5 transition-all hover:border-green-300"> <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-green-200 bg-green-50"> <span class="text-lg text-green-600" aria-hidden="true">&#9739;</span> </div> <div> <h3 class="font-medium">Enterprise</h3> <p class="text-xs text-muted-foreground">
OIDC &middot; SAML 2.0 &middot; SCIM
</p> </div> <span class="ml-auto inline-flex items-center border border-green-200 bg-green-50 px-2 py-0.5 text-xs text-green-700">
SSO${" "}<span class="h-1.5 w-1.5 rounded-none bg-green-500" aria-hidden="true"></span> </span> </a> </div> </section> <!-- Editor Connection (Local-First) --> <section class="mt-12"> <h2 class="mb-2 text-2xl font-semibold"> ${T("common.dashboard.editor.heading", {
    defaultValue: "Editor Connection"
  })} </h2> <p class="mb-6 text-sm text-muted-foreground"> ${T("common.dashboard.editor.subtitle", {
    defaultValue: "Connect the website to your running Land editor instance."
  })} </p> <div class="StaccatoCard StaccatoBorderShimmer border border-[var(--Border)] bg-white p-6"> <div class="flex items-center gap-4"> <picture> <img alt="Land" src="/Asset/Logo/Glyph/Land.svg" width="48" height="48"> </picture> <div class="flex-1"> <div class="flex items-center gap-3"> <h3 class="font-medium">Air Daemon</h3> <span class="inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-2.5 py-0.5 text-xs font-medium text-muted-foreground"> ${T("common.dashboard.editor.status", {
    defaultValue: "Not Connected"
  })}${" "}<span class="h-1.5 w-1.5 rounded-none bg-gray-400" aria-hidden="true"></span> </span> </div> <p class="mt-1 text-sm text-muted-foreground"> ${T("common.dashboard.editor.description", {
    defaultValue: "The Air Daemon connects this dashboard to a running Land editor via WebSocket. Launch Land to enable real-time build logs, telemetry, and configuration management."
  })} </p> </div> </div> <div class="mt-6 flex flex-wrap items-center gap-3"> <a href="/Portal" class="StaccatoButton inline-flex items-center justify-center border border-orange-300 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 transition-all hover:bg-orange-100 focus:outline-2 focus:outline-offset-2 focus:outline-orange-400"> ${T("common.dashboard.editor.connect", {
    defaultValue: "Connect via Portal"
  })}<span class="InlineSeparator">→</span> </a> <span class="text-xs text-muted-foreground">
mTLS &middot; CRDTs &middot; WebSocket &middot; Zero
						cloud dependency
</span> </div> </div> </section> <!-- Partners & Attribution --> <section class="mt-12"> <h2 class="mb-6 text-2xl font-semibold"> ${T("common.dashboard.partners.heading", {
    defaultValue: "Partners & Attribution"
  })} </h2> <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"> <a href="https://github.com/CodeEditorLand" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer flex items-center gap-3 border border-[var(--Border)] bg-white p-4 transition-all hover:border-[var(--Primary)]"> <img alt="Code Editor Land" src="/Asset/Logo/Glyph/Land.svg" width="32" height="32" class="h-8 w-8"> <div> <span class="text-sm font-medium">Code Editor Land</span> <p class="text-xs text-muted-foreground">
Organization &middot; GitHub
</p> </div> </a> <a href="https://PlayForm.Cloud" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer flex items-center gap-3 border border-[var(--Border)] bg-white p-4 transition-all hover:border-[var(--Primary)]"> <img alt="PlayForm" src="/Asset/Logo/Glyph/Land.svg" width="32" height="32" class="h-8 w-8"> <div> <span class="text-sm font-medium">PlayForm</span> <p class="text-xs text-muted-foreground">
Platform &middot; PlayForm.Cloud
</p> </div> </a> <a href="https://nlnet.nl/project/Land/" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer flex items-center gap-3 border border-[var(--Border)] bg-white p-4 transition-all hover:border-[var(--Primary)]"> <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-none border border-[var(--Border)] bg-[var(--Mute)] text-xs font-bold">
NL
</div> <div> <span class="text-sm font-medium">NLnet Foundation</span> <p class="text-xs text-muted-foreground">
NGI0 Commons Fund
</p> </div> </a> </div> </section> <!-- Settings Section --> <section class="mt-12"> <h2 class="mb-6 text-2xl font-semibold"> ${T("common.dashboard.settings.heading", {
    defaultValue: "Settings"
  })} </h2> <div class="StaccatoCard StaccatoBorderShimmer border border-[var(--Border)] bg-white"> <div class="flex items-center justify-between border-b border-[var(--Border)] p-5"> <div> <span class="border border-[var(--Border)] bg-[var(--Mute)] px-3 py-1 text-xs font-medium text-muted-foreground"> ${T("common.comingSoon", {
    defaultValue: "Coming Soon"
  })} </span> <h3 class="mt-2 font-medium"> ${T("common.dashboard.settings.sync.title", {
    defaultValue: "Sync Settings"
  })} </h3> <p class="mt-1 text-sm text-muted-foreground"> ${T(
    "common.dashboard.settings.sync.description",
    {
      defaultValue: "Synchronize your editor preferences across devices."
    }
  )} </p> </div> </div> <div class="flex items-center justify-between border-b border-[var(--Border)] p-5"> <div> <span class="border border-[var(--Border)] bg-[var(--Mute)] px-3 py-1 text-xs font-medium text-muted-foreground"> ${T("common.comingSoon", {
    defaultValue: "Coming Soon"
  })} </span> <h3 class="mt-2 font-medium"> ${T(
    "common.dashboard.settings.extensionSync.title",
    { defaultValue: "Extension Sync" }
  )} </h3> <p class="mt-1 text-sm text-muted-foreground"> ${T(
    "common.dashboard.settings.extensionSync.description",
    {
      defaultValue: "Keep your installed extensions in sync across machines."
    }
  )} </p> </div> </div> <div class="p-5"> <a href="/Account/SignIn" class="StaccatoButton h- inline-flex items-center justify-center border border-[var(--Border)] bg-white px-4 text-sm font-medium transition-all hover:bg-[var(--Secondary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"> ${T(
    "common.dashboard.settings.account.manageButton",
    { defaultValue: "Manage" }
  )} </a> <h3 class="mt-2 font-medium"> ${T("common.dashboard.settings.account.title", {
    defaultValue: "Account"
  })} </h3> <p class="mt-1 text-sm text-muted-foreground"> ${T("common.dashboard.settings.account.description", {
    defaultValue: "Update your profile and manage your account."
  })} </p> </div> </div> </section> </div> ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Dashboard.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Dashboard.astro";
const $$url = "/Dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Dashboard,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
