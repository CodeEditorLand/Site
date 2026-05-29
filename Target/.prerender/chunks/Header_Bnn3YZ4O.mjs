import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as lucide from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { c as cn, I as IconTooltip } from './Base_Bw3w2cEv.mjs';
import i18n from 'i18next';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

const ButtonVariants = cva(
  "inline-flex items-center justify-center gap-0 whitespace-nowrap rounded-[var(--RadiusButton)] font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[var(--Ring)]/40 focus-visible:ring-[2px] aria-invalid:ring-[var(--Destruct)]/20",
  {
    variants: {
      variant: {
        default: "bg-[var(--Foreground)] text-[var(--Background)] hover:bg-[var(--Foreground)]/85",
        destructive: "bg-[var(--Destruct)] text-white hover:bg-[var(--Destruct)]/85 focus-visible:ring-[var(--Destruct)]/20",
        outline: "bg-[var(--Background)] text-[var(--Foreground)] hover:bg-[var(--Mute)]",
        secondary: "bg-[var(--Secondary)] text-[var(--SecondaryForeground)] hover:bg-[var(--Surface3)]",
        ghost: "text-[var(--Foreground)] hover:bg-[var(--Mute)]",
        link: "text-[var(--Foreground)] underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-[2.1rem] py-2 has-[>svg]:px-[1.8rem]",
        sm: "h-8 gap-0 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-[2.6rem] has-[>svg]:px-[2.2rem]",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        "data-slot": "button",
        ref,
        className: cn(ButtonVariants({ variant, size, className })),
        ...props
      }
    );
  }
);
Button.displayName = "Button";

const SupportedLocaleList = ["en", "bg", "de", "fr", "es"];
const LocaleLabel = {
  en: "English",
  bg: "Bulgarian",
  de: "Deutsch",
  fr: "Francais",
  es: "Espanol"
};
const NamespaceList = [
  "blog",
  "common",
  "doc",
  "home",
  "download",
  "account",
  "verify",
  "header",
  "footer",
  "meta"
];
const CoreNamespaceList = [
  "common",
  "header",
  "footer",
  "meta"
];
function DetectLocale() {
  if (typeof window === "undefined") return "en";
  const Parameter = new URL(window.location.href).searchParams.get("lng");
  if (Parameter && SupportedLocaleList.includes(Parameter))
    return Parameter;
  const Cookie = document.cookie.match(/LOCALE=([^;]+)/);
  if (Cookie?.[1] && SupportedLocaleList.includes(Cookie[1]))
    return Cookie[1];
  return "en";
}
const CoreLocaleLoader = {
  en: async () => ({
    common: (await import('./Common_B5Tpd7O0.mjs')).default,
    header: (await import('./Auth0Domain_r85rfpF4.mjs').then(n => n.H)).default,
    footer: (await import('./Home_BrYq6XuJ.mjs').then(n => n.F)).default,
    meta: (await import('./Verify_CEfXaH2C.mjs').then(n => n.M)).default
  }),
  bg: async () => ({
    common: (await import('./Common_BqcJAYVG.mjs')).default,
    header: (await import('./Home_B0TMctN3.mjs').then(n => n.H)).default,
    footer: (await import('./Blog_9EfSa3bC.mjs').then(n => n.F)).default,
    meta: (await import('./Meta_hHADzK8O.mjs').then(n => n.M)).default
  }),
  de: async () => ({
    common: (await import('./Blog_DDmfSpYP.mjs').then(n => n.C)).default,
    header: (await import('./Doc_DyllAtYo.mjs').then(n => n.H)).default,
    footer: (await import('./Blog_DDmfSpYP.mjs').then(n => n.F)).default,
    meta: (await import('./Verify_D63uTEAh.mjs').then(n => n.M)).default
  }),
  fr: async () => ({
    common: (await import('./Common_BcevmFMg.mjs')).default,
    header: (await import('./Home_BHiSyo6X.mjs').then(n => n.H)).default,
    footer: (await import('./Turbulence_Buu9D-ou.mjs').then(n => n.F)).default,
    meta: (await import('./Verify_SYGfOzvI.mjs').then(n => n.M)).default
  }),
  es: async () => ({
    common: (await import('./Common_vX1rs6M9.mjs')).default,
    header: (await import('./Account_CZLsYgEu.mjs').then(n => n.H)).default,
    footer: (await import('./Account_B0tOjOBv.mjs').then(n => n.F)).default,
    meta: (await import('./Meta_hHADzK8O.mjs').then(n => n.a)).default
  })
};
const FullLocaleLoader = {
  en: async () => ({
    blog: (await import('./OpenGraph_Cps89Swe.mjs').then(n => n.B)).default,
    common: (await import('./Common_B5Tpd7O0.mjs')).default,
    doc: (await import('./Turbulence_Buu9D-ou.mjs').then(n => n.D)).default,
    home: (await import('./Home_D1bEzr6B.mjs')).default,
    download: (await import('./Download_Bei4lrNM.mjs').then(n => n.D)).default,
    account: (await import('./Verify_BBdea_Ty.mjs').then(n => n.A)).default,
    verify: (await import('./Download_DFvhDwcB.mjs').then(n => n.V)).default,
    header: (await import('./Auth0Domain_r85rfpF4.mjs').then(n => n.H)).default,
    footer: (await import('./Home_BrYq6XuJ.mjs').then(n => n.F)).default,
    meta: (await import('./Verify_CEfXaH2C.mjs').then(n => n.M)).default
  }),
  bg: async () => ({
    blog: (await import('./Home_BrYq6XuJ.mjs').then(n => n.B)).default,
    common: (await import('./Common_BqcJAYVG.mjs')).default,
    doc: (await import('./Home_B0TMctN3.mjs').then(n => n.a)).default,
    home: (await import('./Blog_9EfSa3bC.mjs').then(n => n.H)).default,
    download: (await import('./Download_Bei4lrNM.mjs').then(n => n.a)).default,
    account: (await import('./Auth0Domain_r85rfpF4.mjs').then(n => n.A)).default,
    verify: (await import('./Verify_CEfXaH2C.mjs').then(n => n.V)).default,
    header: (await import('./Home_B0TMctN3.mjs').then(n => n.H)).default,
    footer: (await import('./Blog_9EfSa3bC.mjs').then(n => n.F)).default,
    meta: (await import('./Meta_hHADzK8O.mjs').then(n => n.M)).default
  }),
  de: async () => ({
    blog: (await import('./Blog_9EfSa3bC.mjs').then(n => n.b)).default,
    common: (await import('./Blog_DDmfSpYP.mjs').then(n => n.C)).default,
    doc: (await import('./Account_CZLsYgEu.mjs').then(n => n.D)).default,
    home: (await import('./Home_B0TMctN3.mjs').then(n => n.b)).default,
    download: (await import('./Download_Ck1ZgmMa.mjs').then(n => n.a)).default,
    account: (await import('./Doc_DyllAtYo.mjs').then(n => n.A)).default,
    verify: (await import('./Verify_SYGfOzvI.mjs').then(n => n.V)).default,
    header: (await import('./Doc_DyllAtYo.mjs').then(n => n.H)).default,
    footer: (await import('./Blog_DDmfSpYP.mjs').then(n => n.F)).default,
    meta: (await import('./Verify_D63uTEAh.mjs').then(n => n.M)).default
  }),
  fr: async () => ({
    blog: (await import('./Blog_DDmfSpYP.mjs').then(n => n.B)).default,
    common: (await import('./Common_BcevmFMg.mjs')).default,
    doc: (await import('./Doc_DyllAtYo.mjs').then(n => n.b)).default,
    home: (await import('./Home_BrYq6XuJ.mjs').then(n => n.H)).default,
    download: (await import('./Download_DFvhDwcB.mjs').then(n => n.D)).default,
    account: (await import('./Account_CZLsYgEu.mjs').then(n => n.A)).default,
    verify: (await import('./Verify_D63uTEAh.mjs').then(n => n.V)).default,
    header: (await import('./Home_BHiSyo6X.mjs').then(n => n.H)).default,
    footer: (await import('./Turbulence_Buu9D-ou.mjs').then(n => n.F)).default,
    meta: (await import('./Verify_SYGfOzvI.mjs').then(n => n.M)).default
  }),
  es: async () => ({
    blog: (await import('./Account_B0tOjOBv.mjs').then(n => n.B)).default,
    common: (await import('./Common_vX1rs6M9.mjs')).default,
    doc: (await import('./Home_BHiSyo6X.mjs').then(n => n.D)).default,
    home: (await import('./Home_BHiSyo6X.mjs').then(n => n.a)).default,
    download: (await import('./Download_Ck1ZgmMa.mjs').then(n => n.b)).default,
    account: (await import('./Account_B0tOjOBv.mjs').then(n => n.A)).default,
    verify: (await import('./Verify_BBdea_Ty.mjs').then(n => n.V)).default,
    header: (await import('./Account_CZLsYgEu.mjs').then(n => n.H)).default,
    footer: (await import('./Account_B0tOjOBv.mjs').then(n => n.F)).default,
    meta: (await import('./Meta_hHADzK8O.mjs').then(n => n.a)).default
  })
};
function AddResources(Locale, Bundles) {
  for (const NS of NamespaceList) {
    if (Bundles[NS]) {
      i18n.addResourceBundle(Locale, NS, Bundles[NS], true, true);
    }
  }
}
const DetectedLocale = DetectLocale();
i18n.use(initReactI18next).init({
  resources: {},
  lng: "en",
  fallbackLng: "en",
  defaultNS: "common",
  ns: [...CoreNamespaceList],
  partialBundledLanguages: true,
  interpolation: {
    escapeValue: false
  },
  react: {
    useSuspense: false
  }
});
const EnglishCoreBundle = await CoreLocaleLoader.en();
AddResources("en", EnglishCoreBundle);
if (DetectedLocale !== "en") {
  const SwitchAfterHydration = async () => {
    const FullBundle = await FullLocaleLoader[DetectedLocale]();
    AddResources(DetectedLocale, FullBundle);
    await i18n.changeLanguage(DetectedLocale);
  };
  if (typeof requestIdleCallback !== "undefined") {
    requestIdleCallback(() => {
      SwitchAfterHydration();
    });
  } else {
    setTimeout(() => {
      SwitchAfterHydration();
    }, 0);
  }
}
const SwitchLocale = async (Locale) => {
  if (!i18n.hasResourceBundle(Locale, "common")) {
    const Bundle = await FullLocaleLoader[Locale]();
    AddResources(Locale, Bundle);
  }
  await i18n.changeLanguage(Locale);
  document.cookie = `LOCALE=${Locale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
};

function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-h-(--radix-dropdown-menu-content-available-height) origin-(--radix-dropdown-menu-content-transform-origin) z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-none border bg-popover p-1 text-popover-foreground",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:*:[svg]:!text-destructive outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-none px-2 py-1.5 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:text-destructive [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("-mx-1 my-1 h-px bg-border", className),
      ...props
    }
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
    SwitchLocale(Value).then(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.removeEventListener("scroll", Guard);
          window.scrollTo({ top: ScrollY, behavior: "instant" });
          if (MainContent) {
            MainContent.style.minHeight = PreviousMinHeight;
          }
        });
      });
    });
  };
  return /* @__PURE__ */ jsxs(DropdownMenu, { modal: false, children: [
    /* @__PURE__ */ jsxs(
      DropdownMenuTrigger,
      {
        className: "flex h-9 items-center gap-1.5 rounded-md bg-white px-3 font-medium text-[var(--Foreground)] outline-none ring-offset-white hover:bg-[var(--Mute)] focus-visible:ring-2 focus-visible:ring-[var(--Ring)] focus-visible:ring-offset-2 data-[state=open]:bg-[var(--Mute)]",
        "aria-label": "Select language",
        children: [
          /* @__PURE__ */ jsx("span", { children: LocaleLabel[CurrentLocale] }),
          /* @__PURE__ */ jsx(
            ChevronDown,
            {
              size: 14,
              className: "text-[var(--MuteForeground)] transition-transform duration-200 [[data-state=open]_&]:rotate-180"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(DropdownMenuContent, { align: "end", className: "min-w-[8rem]", children: SupportedLocaleList.map((Locale) => /* @__PURE__ */ jsx(
      DropdownMenuItem,
      {
        onClick: () => HandleChange(Locale),
        className: Locale === CurrentLocale ? "font-semibold text-[var(--Foreground)]" : "text-[var(--MuteForeground)]",
        children: LocaleLabel[Locale]
      },
      Locale
    )) })
  ] });
};

const IconRegistry = {
  Sparkles: lucide.Sparkles,
  Download: lucide.Download,
  BookOpen: lucide.BookOpen,
  GitFork: lucide.GitFork,
  ExternalLink: lucide.ExternalLink,
  Newspaper: lucide.Newspaper,
  Users: lucide.Users,
  LayoutDashboard: lucide.LayoutDashboard,
  HelpCircle: lucide.HelpCircle,
  LogIn: lucide.LogIn,
  Monitor: lucide.Monitor
};
const Header = ({ Content, AuthSlot }) => {
  const { t: T } = useTranslation("header");
  const [NavMenuOpen, SetNavMenuOpen] = useState(false);
  const [MobileMenuOpen, SetMobileMenuOpen] = useState(false);
  const HeaderData = Content || {
    Logo: { Text: T("logo", "Land") },
    Navigation: [
      {
        Label: T("nav.features", "Features"),
        Href: "/#features",
        Icon: "Sparkles",
        Tooltip: ["/#features", "Editor feature overview"]
      },
      {
        Label: T("nav.download", "Download"),
        Href: "/Download",
        Icon: "Download",
        Tooltip: ["/Download", "Builds for macOS, Windows, Linux"]
      },
      {
        Label: T("nav.docs", "Documentation"),
        Href: "/Doc",
        Icon: "BookOpen",
        Tooltip: ["/Doc", "Developer documentation"]
      },
      {
        Label: T("nav.blog", "Blog"),
        Href: "/Blog",
        Icon: "Newspaper",
        Tooltip: ["/Blog", "Technical articles and project updates"]
      },
      {
        Label: T("nav.contributing", "Contributing"),
        Href: "/Contributing",
        Icon: "Users",
        Tooltip: [
          "/Contributing",
          "Contribution guide and open issues"
        ]
      },
      {
        Label: T("nav.dashboard", "Dashboard"),
        Href: "/Dashboard",
        Icon: "LayoutDashboard",
        Tooltip: [
          "/Dashboard",
          "Account, downloads, editor connection"
        ]
      },
      {
        Label: T("nav.github", "GitHub"),
        Href: "https://github.com/CodeEditorLand/Land",
        Icon: "GitFork",
        Tooltip: [
          "github.com/CodeEditorLand/Land",
          "Source repository - opens in new tab"
        ]
      }
    ],
    Actions: [
      {
        Text: T("actions.signIn", "Sign In"),
        Variant: "ghost",
        Size: "default",
        Href: "/Account/SignIn",
        Icon: "LogIn",
        Tooltip: ["/Account/SignIn", "Sign in to your Land account"]
      },
      {
        Text: T("actions.editorPortal", "Portal"),
        Variant: "ghost",
        Size: "default",
        Href: "/Portal",
        Icon: "Monitor",
        Tooltip: ["/Portal", "Cloud, Provider, Local-First tiers"]
      },
      {
        Text: T("actions.getStarted", "Get Land"),
        Variant: "default",
        Size: "default",
        Href: "/Download",
        Icon: "Download",
        Tooltip: ["/Download", "Download the latest Land build"]
      }
    ]
  };
  const RenderActionIcon = (IconName, Label, Tooltip) => {
    if (!IconName) return null;
    const Icon = IconRegistry[IconName];
    if (!Icon) return null;
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      " ",
      /* @__PURE__ */ jsx(
        IconTooltip,
        {
          Label: Tooltip || Label || IconName,
          Icon,
          SizeClass: "h-4 w-4"
        }
      )
    ] });
  };
  const NavLinks = ({ OnClick }) => /* @__PURE__ */ jsx(Fragment, { children: HeaderData.Navigation?.map((Link, Index) => {
    const Icon = Link.Icon ? IconRegistry[Link.Icon] : null;
    return /* @__PURE__ */ jsxs(
      "a",
      {
        href: Link.Href,
        className: "StaccatoNavLink HeaderSubLink relative flex items-center px-4 py-3 font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
        onClick: OnClick,
        ...Link.Href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {},
        children: [
          /* @__PURE__ */ jsx("span", { className: "HeaderLinkLabel", children: Link.Label }),
          Icon && /* @__PURE__ */ jsxs(
            "span",
            {
              "aria-hidden": "true",
              className: "inline-flex items-center",
              children: [
                " ",
                /* @__PURE__ */ jsx(
                  IconTooltip,
                  {
                    Label: Link.Tooltip || Link.Label,
                    Icon,
                    SizeClass: "h-4 w-4",
                    ClassName: "StaccatoIcon"
                  }
                )
              ]
            }
          )
        ]
      },
      Index
    );
  }) });
  const ActionButtons = ({
    OnClick,
    FullWidth
  }) => /* @__PURE__ */ jsx(Fragment, { children: AuthSlot ? /* @__PURE__ */ jsxs(Fragment, { children: [
    AuthSlot,
    HeaderData.Actions?.filter(
      (Action) => Action.Href !== "/Account/SignIn"
    ).map((Action, Index) => /* @__PURE__ */ jsx(
      Button,
      {
        variant: Action.Variant || "default",
        size: Action.Size || "default",
        className: FullWidth ? "StaccatoButton w-full justify-start" : "StaccatoButton",
        asChild: true,
        children: /* @__PURE__ */ jsxs("a", { href: Action.Href, onClick: OnClick, children: [
          Action.Text,
          RenderActionIcon(
            Action.Icon,
            Action.Text,
            Action.Tooltip
          )
        ] })
      },
      Index
    ))
  ] }) : HeaderData.Actions?.map((Action, Index) => /* @__PURE__ */ jsx(
    Button,
    {
      variant: Action.Variant || "default",
      size: Action.Size || "default",
      className: FullWidth ? "StaccatoButton w-full justify-start" : "StaccatoButton",
      asChild: true,
      children: /* @__PURE__ */ jsxs("a", { href: Action.Href, onClick: OnClick, children: [
        Action.Text,
        RenderActionIcon(
          Action.Icon,
          Action.Text,
          Action.Tooltip
        )
      ] })
    },
    Index
  )) });
  return /* @__PURE__ */ jsxs("header", { className: "Header sticky top-0 z-50 w-full", role: "banner", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex h-16 items-center justify-between px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/",
            className: "StaccatoLogo HeaderLogo flex items-center space-x-3 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
            "aria-label": `${HeaderData.Logo?.Text || "Land"} - Go to homepage`,
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "LogoBox relative flex h-8 w-8 items-center justify-center overflow-hidden",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: "/Asset/Logo/Glyph/Land.svg",
                      alt: "Code Editor Land",
                      title: "Code Editor Land",
                      width: "32",
                      height: "32",
                      className: "absolute inset-0 h-full w-full"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: HeaderData.Logo?.Text || "Land" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "nav",
          {
            className: "ml-2 hidden items-center lg:flex",
            "aria-label": "Main navigation",
            children: HeaderData.Navigation?.map((Link, Index) => {
              const Icon = Link.Icon ? IconRegistry[Link.Icon] : null;
              return /* @__PURE__ */ jsxs(
                "a",
                {
                  href: Link.Href,
                  className: "StaccatoNavLink HeaderSubLink relative flex items-center px-4 py-2 font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
                  ...Link.Href.startsWith("http") ? {
                    target: "_blank",
                    rel: "noopener noreferrer"
                  } : {},
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "HeaderLinkLabel", children: Link.Label }),
                    Icon && /* @__PURE__ */ jsxs(
                      "span",
                      {
                        "aria-hidden": "true",
                        className: "inline-flex items-center",
                        children: [
                          " ",
                          /* @__PURE__ */ jsx(
                            IconTooltip,
                            {
                              Label: Link.Tooltip || Link.Label,
                              Icon,
                              SizeClass: "h-3.5 w-3.5",
                              ClassName: "StaccatoIcon"
                            }
                          )
                        ]
                      }
                    )
                  ]
                },
                Index
              );
            })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "hidden md:flex lg:hidden",
            onClick: () => SetNavMenuOpen(!NavMenuOpen),
            "aria-label": "Toggle navigation",
            "aria-expanded": NavMenuOpen,
            children: NavMenuOpen ? /* @__PURE__ */ jsx(lucide.X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(lucide.Menu, { className: "h-5 w-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "hidden items-center gap-3 md:flex", children: [
          /* @__PURE__ */ jsx(LocaleSwitcher, {}),
          /* @__PURE__ */ jsx(ActionButtons, {})
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "md:hidden",
            onClick: () => SetMobileMenuOpen(!MobileMenuOpen),
            "aria-label": "Toggle menu",
            "aria-expanded": MobileMenuOpen,
            children: MobileMenuOpen ? /* @__PURE__ */ jsx(lucide.X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(lucide.Menu, { className: "h-5 w-5" })
          }
        )
      ] })
    ] }),
    NavMenuOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: "NavDropdown hidden bg-white md:block lg:hidden",
        role: "dialog",
        "aria-label": "Navigation menu",
        children: /* @__PURE__ */ jsx(
          "nav",
          {
            className: "container mx-auto flex flex-col gap-1 px-4 py-4",
            "aria-label": "Site navigation",
            children: /* @__PURE__ */ jsx(NavLinks, { OnClick: () => SetNavMenuOpen(false) })
          }
        )
      }
    ),
    MobileMenuOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: "bg-white md:hidden",
        role: "dialog",
        "aria-label": "Mobile navigation menu",
        children: /* @__PURE__ */ jsxs(
          "nav",
          {
            className: "container mx-auto flex flex-col gap-1 px-4 py-4",
            "aria-label": "Mobile navigation",
            children: [
              /* @__PURE__ */ jsx(NavLinks, { OnClick: () => SetMobileMenuOpen(false) }),
              /* @__PURE__ */ jsx("div", { className: "my-1.5 border-t border-border" }),
              /* @__PURE__ */ jsx("div", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(LocaleSwitcher, {}) }),
              /* @__PURE__ */ jsx("div", { className: "my-1.5 border-t border-border" }),
              /* @__PURE__ */ jsx(
                ActionButtons,
                {
                  OnClick: () => SetMobileMenuOpen(false),
                  FullWidth: true
                }
              )
            ]
          }
        )
      }
    )
  ] });
};

export { Button as B, DropdownMenu as D, Header as H, DropdownMenuContent as a, DropdownMenuItem as b, DropdownMenuSeparator as c, DropdownMenuTrigger as d };
