import { b1 as jsxDevRuntimeExports, as as Root, W as Image, G as Fallback, b3 as useAuth0, b4 as useTranslation } from './Vendor/React.D_hnTAe2.js';
import { D as DropdownMenu, d as DropdownMenuTrigger, a as DropdownMenuContent, b as DropdownMenuItem, c as DropdownMenuSeparator, H as Header } from './Header.Dqizcpbn.js';
import { a as Auth0Provider } from './Footer.J6XKs53r.js';
import { c as cn } from './Utility.BriZ7xTM.js';
import { S as Skeleton } from './Skeleton.Dp5ep6F2.js';

function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-none",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Avatar.tsx",
      lineNumber: 13,
      columnNumber: 3
    },
    this
  );
}
function AvatarImage({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Image,
    {
      "data-slot": "avatar-image",
      className: cn("aspect-square size-full", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Avatar.tsx",
      lineNumber: 29,
      columnNumber: 3
    },
    this
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "flex size-full items-center justify-center rounded-none bg-muted",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Avatar.tsx",
      lineNumber: 42,
      columnNumber: 3
    },
    this
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
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Skeleton,
      {
        className: "h-7 w-7",
        "aria-label": T("actions.loading", { defaultValue: "Loading…" })
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthStatus.tsx",
        lineNumber: 45,
        columnNumber: 4
      },
      undefined
    );
  }
  if (!IsAuthenticated || !User) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "a",
      {
        href: SignInHref,
        className: "inline-flex items-center font-medium text-foreground hover:underline",
        "aria-label": T("actions.signIn", { defaultValue: "Sign In" }),
        children: [
          T("actions.signIn", { defaultValue: "Sign In" }),
          " ",
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" }, void 0, false, {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthStatus.tsx",
                  lineNumber: 70,
                  columnNumber: 6
                }, undefined),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("polyline", { points: "10 17 15 12 10 7" }, void 0, false, {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthStatus.tsx",
                  lineNumber: 71,
                  columnNumber: 6
                }, undefined),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("line", { x1: "15", y1: "12", x2: "3", y2: "12" }, void 0, false, {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthStatus.tsx",
                  lineNumber: 72,
                  columnNumber: 6
                }, undefined)
              ]
            },
            void 0,
            true,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthStatus.tsx",
              lineNumber: 60,
              columnNumber: 5
            },
            undefined
          )
        ]
      },
      void 0,
      true,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthStatus.tsx",
        lineNumber: 54,
        columnNumber: 4
      },
      undefined
    );
  }
  const DisplayName = User.name && User.name !== User.email ? User.name : User.nickname || User.email?.split("@")[0] || "User";
  const Initials = DisplayName.slice(0, 2).toUpperCase();
  const Logout = () => Auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DropdownMenu, { modal: false, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        type: "button",
        className: "flex items-center gap-2 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "aria-label": T("user.avatarAlt", {
          defaultValue: "User menu"
        }),
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Avatar, { className: "h-7 w-7", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            AvatarImage,
            {
              src: User.picture,
              alt: T("user.avatarAlt", {
                defaultValue: "{{name}} avatar",
                name: DisplayName
              })
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthStatus.tsx",
              lineNumber: 98,
              columnNumber: 7
            },
            undefined
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AvatarFallback, { className: "", children: Initials }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthStatus.tsx",
            lineNumber: 105,
            columnNumber: 7
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthStatus.tsx",
          lineNumber: 97,
          columnNumber: 6
        }, undefined)
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthStatus.tsx",
        lineNumber: 91,
        columnNumber: 5
      },
      undefined
    ) }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthStatus.tsx",
      lineNumber: 90,
      columnNumber: 4
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DropdownMenuContent, { align: "end", className: "w-40", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "a",
        {
          href: DashboardHref,
          "aria-label": T("user.menu.dashboard", {
            defaultValue: "Dashboard"
          }),
          children: T("user.menu.dashboard", {
            defaultValue: "Dashboard"
          })
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthStatus.tsx",
          lineNumber: 111,
          columnNumber: 6
        },
        undefined
      ) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthStatus.tsx",
        lineNumber: 110,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "a",
        {
          href: AccountHref,
          "aria-label": T("user.menu.account", {
            defaultValue: "Account"
          }),
          children: T("user.menu.account", { defaultValue: "Account" })
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthStatus.tsx",
          lineNumber: 122,
          columnNumber: 6
        },
        undefined
      ) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthStatus.tsx",
        lineNumber: 121,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DropdownMenuSeparator, {}, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthStatus.tsx",
        lineNumber: 130,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        DropdownMenuItem,
        {
          variant: "destructive",
          onClick: Logout,
          "aria-label": T("user.menu.signOut", {
            defaultValue: "Sign Out"
          }),
          children: T("user.menu.signOut", { defaultValue: "Sign Out" })
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthStatus.tsx",
          lineNumber: 131,
          columnNumber: 5
        },
        undefined
      )
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthStatus.tsx",
      lineNumber: 109,
      columnNumber: 4
    }, undefined)
  ] }, void 0, true, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthStatus.tsx",
    lineNumber: 89,
    columnNumber: 3
  }, undefined);
};

const DynamicAuthHeader = ({
  Domain,
  ClientIdentifier,
  Content
}) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Auth0Provider,
  {
    Children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(HeaderWithAuth, { ...Content ? { Content } : {} }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthHeader.tsx",
      lineNumber: 27,
      columnNumber: 13
    }, undefined),
    ...Domain ? { Domain } : {},
    ...ClientIdentifier ? { ClientIdentifier } : {}
  },
  void 0,
  false,
  {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthHeader.tsx",
    lineNumber: 26,
    columnNumber: 2
  },
  undefined
);
const HeaderWithAuth = ({ Content }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Header,
  {
    ...Content ? { Content } : {},
    AuthSlot: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DynamicAuthStatus, {}, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthHeader.tsx",
      lineNumber: 36,
      columnNumber: 13
    }, undefined)
  },
  void 0,
  false,
  {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthHeader.tsx",
    lineNumber: 34,
    columnNumber: 2
  },
  undefined
);

export { DynamicAuthHeader as default };
//# sourceMappingURL=DynamicAuthHeader.ruhFSr75.js.map
