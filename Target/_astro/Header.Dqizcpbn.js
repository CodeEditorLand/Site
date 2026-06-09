import { b2 as reactExports, b1 as jsxDevRuntimeExports, aJ as Sun, ac as Moon, au as Root2, aP as Trigger, aj as Portal2, v as Content2, Y as Item2, az as Separator2, b4 as useTranslation, i as ChevronDown, aY as X, a9 as Menu, ab as Monitor, a6 as LogIn, n as CircleQuestionMark, a1 as LayoutDashboard, aT as Users, af as Newspaper, E as ExternalLink, O as GitFork, d as BookOpen, y as Download, aG as Sparkles } from './Vendor/React.D_hnTAe2.js';
import { B as Button } from './Skeleton.Dp5ep6F2.js';
import { I as IconTooltip } from './IconTooltip.D9Gc1Gmr.js';
import { L as LocaleLabel, S as SupportedLocaleList, a as SwitchLocale } from './Base.astro_astro_type_script_index_1_lang.CInZXfel.js';
import { c as cn } from './Utility.BriZ7xTM.js';

const ThemeToggle = ({ ClassName }) => {
  const [IsDark, SetIsDark] = reactExports.useState(false);
  reactExports.useEffect(() => {
    SetIsDark(document.documentElement.classList.contains("dark"));
  }, []);
  const Toggle = () => {
    const Next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", Next);
    try {
      localStorage.setItem("Theme", Next ? "dark" : "light");
    } catch (_) {
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", Next ? "#0a0a0c" : "#ffffff");
    SetIsDark(Next);
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: Toggle,
      "aria-label": IsDark ? "Switch to light theme" : "Switch to dark theme",
      title: IsDark ? "Light" : "Dark",
      className: ClassName,
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Sun, { className: "hidden h-4 w-4 dark:block" }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/ThemeToggle.tsx",
          lineNumber: 47,
          columnNumber: 4
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Moon, { className: "block h-4 w-4 dark:hidden" }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/ThemeToggle.tsx",
          lineNumber: 48,
          columnNumber: 4
        }, undefined)
      ]
    },
    void 0,
    true,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/ThemeToggle.tsx",
      lineNumber: 36,
      columnNumber: 3
    },
    undefined
  );
};

function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Root2, { "data-slot": "dropdown-menu", ...props }, void 0, false, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/DropdownMenu.tsx",
    lineNumber: 12,
    columnNumber: 9
  }, this);
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/DropdownMenu.tsx",
      lineNumber: 30,
      columnNumber: 3
    },
    this
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Portal2, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Content2,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-h-(--radix-dropdown-menu-content-available-height) origin-(--radix-dropdown-menu-content-transform-origin) z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-none border bg-popover p-1 text-popover-foreground",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/DropdownMenu.tsx",
      lineNumber: 44,
      columnNumber: 4
    },
    this
  ) }, void 0, false, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/DropdownMenu.tsx",
    lineNumber: 43,
    columnNumber: 3
  }, this);
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Item2,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:*:[svg]:!text-destructive outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-none px-2 py-1.5 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:text-destructive [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/DropdownMenu.tsx",
      lineNumber: 78,
      columnNumber: 3
    },
    this
  );
}
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Separator2,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("-mx-1 my-1 h-px bg-border", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/DropdownMenu.tsx",
      lineNumber: 175,
      columnNumber: 3
    },
    this
  );
}

const LocaleSwitcher = () => {
  const { i18n } = useTranslation();
  const CurrentLocale = i18n.language || "en";
  const HandleChange = (Value) => {
    const ScrollY = window.scrollY;
    const MainContent = document.getElementById("main-content");
    const PreviousMinHeight = MainContent?.style.minHeight ?? "";
    if (MainContent) {
      MainContent.style.minHeight = `${MainContent.offsetHeight}px`;
    }
    const Guard = () => {
      if (window.scrollY !== ScrollY) {
        window.scrollTo({ top: ScrollY, behavior: "instant" });
      }
    };
    window.addEventListener("scroll", Guard, { passive: true });
    const ReleasePinnedLayout = () => {
      window.removeEventListener("scroll", Guard);
      window.scrollTo({ top: ScrollY, behavior: "instant" });
      if (MainContent) {
        MainContent.style.minHeight = PreviousMinHeight;
      }
    };
    SwitchLocale(Value).then(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(ReleasePinnedLayout);
      });
    }).catch(() => {
      ReleasePinnedLayout();
    });
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DropdownMenu, { modal: false, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      DropdownMenuTrigger,
      {
        className: "flex h-9 items-center gap-1.5 rounded-md bg-card px-3 font-medium text-[var(--Foreground)] outline-none ring-offset-white hover:bg-[var(--Mute)] focus-visible:ring-2 focus-visible:ring-[var(--Ring)] focus-visible:ring-offset-2 data-[state=open]:bg-[var(--Mute)]",
        "aria-label": "Select language",
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: LocaleLabel[CurrentLocale] }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/LocaleSwitcher.tsx",
            lineNumber: 83,
            columnNumber: 5
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            ChevronDown,
            {
              size: 14,
              className: "text-[var(--MuteForeground)] transition-transform duration-200 [[data-state=open]_&]:rotate-180"
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/LocaleSwitcher.tsx",
              lineNumber: 84,
              columnNumber: 5
            },
            undefined
          )
        ]
      },
      void 0,
      true,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/LocaleSwitcher.tsx",
        lineNumber: 80,
        columnNumber: 4
      },
      undefined
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DropdownMenuContent, { align: "end", className: "min-w-[8rem]", children: SupportedLocaleList.map((Locale) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      DropdownMenuItem,
      {
        onClick: () => HandleChange(Locale),
        className: Locale === CurrentLocale ? "font-semibold text-[var(--Foreground)]" : "text-[var(--MuteForeground)]",
        children: LocaleLabel[Locale]
      },
      Locale,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/LocaleSwitcher.tsx",
        lineNumber: 91,
        columnNumber: 6
      },
      undefined
    )) }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/LocaleSwitcher.tsx",
      lineNumber: 89,
      columnNumber: 4
    }, undefined)
  ] }, void 0, true, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/LocaleSwitcher.tsx",
    lineNumber: 79,
    columnNumber: 3
  }, undefined);
};

const IconRegistry = {
  Sparkles: Sparkles,
  Download: Download,
  BookOpen: BookOpen,
  GitFork: GitFork,
  ExternalLink: ExternalLink,
  Newspaper: Newspaper,
  Users: Users,
  LayoutDashboard: LayoutDashboard,
  HelpCircle: CircleQuestionMark,
  LogIn: LogIn,
  Monitor: Monitor
};
const Header = ({ Content, AuthSlot }) => {
  const { t: T } = useTranslation("header");
  const [NavMenuOpen, SetNavMenuOpen] = reactExports.useState(false);
  const [MobileMenuOpen, SetMobileMenuOpen] = reactExports.useState(false);
  const HeaderData = Content || {
    Logo: { Text: T("logo", "Land") },
    Navigation: [
      {
        Label: T("nav.features", "Features"),
        Href: "/#features"
      },
      {
        Label: T("nav.download", "Download"),
        Href: "/Download"
      },
      {
        Label: T("nav.docs", "Documentation"),
        Href: "/Doc"
      },
      {
        Label: T("nav.github", "GitHub"),
        Href: "https://github.com/CodeEditorLand/Land"
      }
    ],
    Actions: [
      {
        Text: T("actions.signIn", "Sign In"),
        Variant: "ghost",
        Size: "default",
        Href: "/Account/SignIn"
      },
      {
        Text: T("actions.editorPortal", "Portal"),
        Variant: "ghost",
        Size: "default",
        Href: "/Portal"
      },
      {
        Text: T("actions.getStarted", "Get Land"),
        Variant: "default",
        Size: "default",
        Href: "/Download",
        Icon: "Download"
      }
    ]
  };
  const RenderActionIcon = (IconName, Label, Tooltip) => {
    if (!IconName) return null;
    const Icon = IconRegistry[IconName];
    if (!Icon) return null;
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
      " ",
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        IconTooltip,
        {
          Label: Tooltip || Label || IconName,
          Icon,
          SizeClass: "h-4 w-4"
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
          lineNumber: 117,
          columnNumber: 5
        },
        undefined
      )
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
      lineNumber: 115,
      columnNumber: 4
    }, undefined);
  };
  const NavLinks = ({ OnClick }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: HeaderData.Navigation?.map((Link, Index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "a",
    {
      href: Link.Href,
      className: "StaccatoNavLink HeaderSubLink relative flex items-center px-4 py-3 text-muted-foreground transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
      onClick: OnClick,
      ...Link.Href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {},
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "HeaderLinkLabel font-mono text-xs font-medium uppercase tracking-widest", children: Link.Label }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
        lineNumber: 137,
        columnNumber: 6
      }, undefined)
    },
    Index,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
      lineNumber: 129,
      columnNumber: 5
    },
    undefined
  )) }, void 0, false, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
    lineNumber: 127,
    columnNumber: 3
  }, undefined);
  const ActionButtons = ({
    OnClick,
    FullWidth
  }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: AuthSlot ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    AuthSlot,
    HeaderData.Actions?.filter(
      (Action) => Action.Href !== "/Account/SignIn"
    ).map((Action, Index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Button,
      {
        variant: Action.Variant || "default",
        size: Action.Size || "default",
        className: FullWidth ? "StaccatoButton w-full justify-start" : "StaccatoButton",
        asChild: true,
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: Action.Href, onClick: OnClick, children: [
          Action.Text,
          RenderActionIcon(
            Action.Icon,
            Action.Text,
            Action.Tooltip
          )
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
          lineNumber: 177,
          columnNumber: 8
        }, undefined)
      },
      Index,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
        lineNumber: 159,
        columnNumber: 7
      },
      undefined
    ))
  ] }, void 0, true, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
    lineNumber: 154,
    columnNumber: 5
  }, undefined) : HeaderData.Actions?.map((Action, Index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Button,
    {
      variant: Action.Variant || "default",
      size: Action.Size || "default",
      className: FullWidth ? "StaccatoButton w-full justify-start" : "StaccatoButton",
      asChild: true,
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: Action.Href, onClick: OnClick, children: [
        Action.Text,
        RenderActionIcon(
          Action.Icon,
          Action.Text,
          Action.Tooltip
        )
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
        lineNumber: 208,
        columnNumber: 7
      }, undefined)
    },
    Index,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
      lineNumber: 190,
      columnNumber: 6
    },
    undefined
  )) }, void 0, false, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
    lineNumber: 152,
    columnNumber: 3
  }, undefined);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("header", { className: "Header sticky top-0 z-50 w-full", role: "banner", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto flex h-16 items-center justify-between px-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "a",
          {
            href: "/",
            className: "StaccatoLogo HeaderLogo flex items-center space-x-3 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
            "aria-label": `${HeaderData.Logo?.Text || "Land"} - Go to homepage`,
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "div",
                {
                  className: "LogoBox relative flex h-8 w-8 items-center justify-center overflow-hidden",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "img",
                      {
                        src: "/Asset/Logo/Glyph/Land.svg",
                        alt: "Code Editor Land",
                        title: "Code Editor Land",
                        width: "32",
                        height: "32",
                        className: "absolute inset-0 h-full w-full dark:hidden"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
                        lineNumber: 235,
                        columnNumber: 8
                      },
                      undefined
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "img",
                      {
                        src: "/Asset/Dark/Logo/Glyph/Land.svg",
                        alt: "Code Editor Land",
                        title: "Code Editor Land",
                        width: "32",
                        height: "32",
                        className: "absolute inset-0 h-full w-full hidden dark:block"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
                        lineNumber: 242,
                        columnNumber: 10
                      },
                      undefined
                    )
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
                  lineNumber: 232,
                  columnNumber: 7
                },
                undefined
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-semibold", children: HeaderData.Logo?.Text || "Land" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
                lineNumber: 251,
                columnNumber: 7
              }, undefined)
            ]
          },
          void 0,
          true,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
            lineNumber: 228,
            columnNumber: 6
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "nav",
          {
            className: "ml-2 hidden items-center lg:flex",
            "aria-label": "Main navigation",
            children: HeaderData.Navigation?.map((Link, Index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "a",
              {
                href: Link.Href,
                className: "StaccatoNavLink HeaderSubLink relative flex items-center px-4 py-2 text-muted-foreground transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
                ...Link.Href.startsWith("http") ? {
                  target: "_blank",
                  rel: "noopener noreferrer"
                } : {},
                children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "HeaderLinkLabel font-mono text-xs font-medium uppercase tracking-widest", children: Link.Label }, void 0, false, {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
                  lineNumber: 271,
                  columnNumber: 9
                }, undefined)
              },
              Index,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
                lineNumber: 261,
                columnNumber: 8
              },
              undefined
            ))
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
            lineNumber: 257,
            columnNumber: 6
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "hidden md:flex lg:hidden",
            onClick: () => SetNavMenuOpen(!NavMenuOpen),
            "aria-label": "Toggle navigation",
            "aria-expanded": NavMenuOpen,
            children: NavMenuOpen ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { className: "h-5 w-5" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
              lineNumber: 287,
              columnNumber: 8
            }, undefined) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Menu, { className: "h-5 w-5" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
              lineNumber: 289,
              columnNumber: 8
            }, undefined)
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
            lineNumber: 279,
            columnNumber: 6
          },
          undefined
        )
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
        lineNumber: 227,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "hidden items-center gap-3 md:flex", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ThemeToggle, {}, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
            lineNumber: 297,
            columnNumber: 7
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LocaleSwitcher, {}, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
            lineNumber: 298,
            columnNumber: 7
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ActionButtons, {}, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
            lineNumber: 299,
            columnNumber: 7
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
          lineNumber: 296,
          columnNumber: 6
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "md:hidden",
            onClick: () => SetMobileMenuOpen(!MobileMenuOpen),
            "aria-label": "Toggle menu",
            "aria-expanded": MobileMenuOpen,
            children: MobileMenuOpen ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { className: "h-5 w-5" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
              lineNumber: 311,
              columnNumber: 8
            }, undefined) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Menu, { className: "h-5 w-5" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
              lineNumber: 313,
              columnNumber: 8
            }, undefined)
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
            lineNumber: 303,
            columnNumber: 6
          },
          undefined
        )
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
        lineNumber: 295,
        columnNumber: 5
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
      lineNumber: 225,
      columnNumber: 4
    }, undefined),
    NavMenuOpen && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        className: "NavDropdown hidden bg-card md:block lg:hidden",
        role: "dialog",
        "aria-label": "Navigation menu",
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "nav",
          {
            className: "container mx-auto flex flex-col gap-1 px-4 py-4",
            "aria-label": "Site navigation",
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(NavLinks, { OnClick: () => SetNavMenuOpen(false) }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
              lineNumber: 328,
              columnNumber: 7
            }, undefined)
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
            lineNumber: 325,
            columnNumber: 6
          },
          undefined
        )
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
        lineNumber: 321,
        columnNumber: 5
      },
      undefined
    ),
    MobileMenuOpen && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        className: "bg-card md:hidden",
        role: "dialog",
        "aria-label": "Mobile navigation menu",
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "nav",
          {
            className: "container mx-auto flex flex-col gap-1 px-4 py-4",
            "aria-label": "Mobile navigation",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(NavLinks, { OnClick: () => SetMobileMenuOpen(false) }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
                lineNumber: 342,
                columnNumber: 7
              }, undefined),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "my-1.5 border-t border-border" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
                lineNumber: 343,
                columnNumber: 7
              }, undefined),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-4 py-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LocaleSwitcher, {}, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
                lineNumber: 345,
                columnNumber: 8
              }, undefined) }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
                lineNumber: 344,
                columnNumber: 7
              }, undefined),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "my-1.5 border-t border-border" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
                lineNumber: 347,
                columnNumber: 7
              }, undefined),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                ActionButtons,
                {
                  OnClick: () => SetMobileMenuOpen(false),
                  FullWidth: true
                },
                void 0,
                false,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
                  lineNumber: 348,
                  columnNumber: 7
                },
                undefined
              )
            ]
          },
          void 0,
          true,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
            lineNumber: 339,
            columnNumber: 6
          },
          undefined
        )
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
        lineNumber: 335,
        columnNumber: 5
      },
      undefined
    )
  ] }, void 0, true, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
    lineNumber: 223,
    columnNumber: 3
  }, undefined);
};

export { DropdownMenu as D, Header as H, DropdownMenuContent as a, DropdownMenuItem as b, DropdownMenuSeparator as c, DropdownMenuTrigger as d };
//# sourceMappingURL=Header.Dqizcpbn.js.map
