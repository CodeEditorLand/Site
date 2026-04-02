import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import * as lucide from 'lucide-react';
import { useState } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';
import { B as Button } from './Button_qaejSZ-i.mjs';
import i18n from 'i18next';

const SupportedLocaleList = ["en", "bg", "de", "fr", "es"];
const LocaleLabel = {
  en: "English",
  bg: "Bulgarian",
  de: "Deutsch",
  fr: "Francais",
  es: "Espanol"
};
const NamespaceList = [
  "common",
  "home",
  "download",
  "account",
  "verify",
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
const LocaleLoader = {
  en: async () => ({
    common: (await import('./Common_DyJubsMi.mjs')).default,
    home: (await import('./Home_DB-NDn7-.mjs')).default,
    download: (await import('./Parallax_CxMoNu1O.mjs').then(n => n.D)).default,
    account: (await import('./Account_BOp5uuQd.mjs')).default,
    verify: (await import('./_virtual_astro_server-island-manifest_DfGB_8Yz.mjs').then(n => n.V)).default,
    header: (await import('./Meta_BwDJIdGz.mjs').then(n => n.H)).default,
    footer: (await import('./Parallax_CxMoNu1O.mjs').then(n => n.F)).default,
    meta: (await import('./Meta_BB53_92C.mjs').then(n => n.M)).default
  }),
  bg: async () => ({
    common: (await import('./Common_B4_hZWTk.mjs')).default,
    home: (await import('./Home_DUoeqFBN.mjs')).default,
    download: (await import('./Turbulence_Befh_LQB.mjs').then(n => n.a)).default,
    account: (await import('./Account_BKTiCaZl.mjs')).default,
    verify: (await import('./Verify_DF_my25B.mjs').then(n => n.V)).default,
    header: (await import('./Meta_BwDJIdGz.mjs').then(n => n.d)).default,
    footer: (await import('./Meta_BwDJIdGz.mjs').then(n => n.e)).default,
    meta: (await import('./Meta_BB53_92C.mjs').then(n => n.a)).default
  }),
  de: async () => ({
    common: (await import('./Common_lnR7C97W.mjs')).default,
    home: (await import('./Home_D_pcptG0.mjs')).default,
    download: (await import('./Turbulence_Befh_LQB.mjs').then(n => n.b)).default,
    account: (await import('./Account_6oWojYfO.mjs')).default,
    verify: (await import('./Verify_BEAbsfy7.mjs').then(n => n.V)).default,
    header: (await import('./_virtual_astro_server-island-manifest_DfGB_8Yz.mjs').then(n => n.H)).default,
    footer: (await import('./Meta_BwDJIdGz.mjs').then(n => n.f)).default,
    meta: (await import('./Meta_DTIR1Ufs.mjs').then(n => n.M)).default
  }),
  fr: async () => ({
    common: (await import('./Common_DzRjA1N7.mjs')).default,
    home: (await import('./Home_BF2OpLHC.mjs')).default,
    download: (await import('./_virtual_astro_server-island-manifest_DfGB_8Yz.mjs').then(n => n.b)).default,
    account: (await import('./Account_DMqJZHt_.mjs')).default,
    verify: (await import('./Verify_DF_my25B.mjs').then(n => n.a)).default,
    header: (await import('./Meta_BwDJIdGz.mjs').then(n => n.g)).default,
    footer: (await import('./Meta_BwDJIdGz.mjs').then(n => n.h)).default,
    meta: (await import('./Meta_BwDJIdGz.mjs').then(n => n.M)).default
  }),
  es: async () => ({
    common: (await import('./Common_PvKORRpV.mjs')).default,
    home: (await import('./Home_CJXwYIDN.mjs')).default,
    download: (await import('./Turbulence_Befh_LQB.mjs').then(n => n.c)).default,
    account: (await import('./Account_I3HxFODb.mjs')).default,
    verify: (await import('./Verify_BEAbsfy7.mjs').then(n => n.a)).default,
    header: (await import('./_virtual_astro_server-island-manifest_DfGB_8Yz.mjs').then(n => n.c)).default,
    footer: (await import('./Parallax_CxMoNu1O.mjs').then(n => n.c)).default,
    meta: (await import('./Meta_DTIR1Ufs.mjs').then(n => n.a)).default
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
const EnglishBundle = await LocaleLoader.en();
i18n.use(initReactI18next).init({
  resources: {},
  lng: DetectedLocale,
  fallbackLng: "en",
  defaultNS: "common",
  ns: [...NamespaceList],
  interpolation: {
    escapeValue: false
  },
  react: {
    useSuspense: false
  }
});
AddResources("en", EnglishBundle);
if (DetectedLocale !== "en") {
  const LocaleBundle = await LocaleLoader[DetectedLocale]();
  AddResources(DetectedLocale, LocaleBundle);
}
const SwitchLocale = async (Locale) => {
  if (!i18n.hasResourceBundle(Locale, "common")) {
    const Bundle = await LocaleLoader[Locale]();
    AddResources(Locale, Bundle);
  }
  await i18n.changeLanguage(Locale);
  document.cookie = `LOCALE=${Locale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
};

const LocaleSwitcher = () => {
  const { i18n } = useTranslation();
  const CurrentLocale = i18n.language || "en";
  const HandleChange = (Event) => {
    const NewLocale = Event.target.value;
    SwitchLocale(NewLocale);
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative inline-flex items-center", children: [
    /* @__PURE__ */ jsx(
      "select",
      {
        value: CurrentLocale,
        onChange: HandleChange,
        "aria-label": "Select language",
        className: "h-9 appearance-none border border-[var(--Border)] bg-white bg-none py-1 pl-3 pr-7 text-sm font-medium text-[var(--Foreground)] transition-colors hover:bg-[var(--Secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--Foreground)]",
        style: {
          borderRadius: 0,
          WebkitAppearance: "none",
          MozAppearance: "none",
          backgroundImage: "none"
        },
        children: SupportedLocaleList.map((Locale) => /* @__PURE__ */ jsx("option", { value: Locale, children: LocaleLabel[Locale] }, Locale))
      }
    ),
    /* @__PURE__ */ jsx(
      lucide.Globe,
      {
        className: "pointer-events-none absolute right-2 h-3.5 w-3.5 text-[var(--MuteForeground)]",
        "aria-hidden": "true"
      }
    )
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
const Header = ({ content, AuthSlot }) => {
  const { t: T } = useTranslation("header");
  const [MobileMenuOpen, SetMobileMenuOpen] = useState(false);
  const HeaderData = content || {
    logo: { text: T("logo", "Land") },
    navigation: [
      {
        label: T("nav.features", "Features"),
        href: "/#features",
        icon: "Sparkles"
      },
      {
        label: T("nav.download", "Download"),
        href: "/Download",
        icon: "Download"
      },
      {
        label: T("nav.docs", "Docs"),
        href: "/Doc",
        icon: "BookOpen"
      },
      {
        label: T("nav.blog", "Blog"),
        href: "/Blog",
        icon: "Newspaper"
      },
      {
        label: T("nav.contributing", "Contributing"),
        href: "/Contributing",
        icon: "Users"
      },
      {
        label: T("nav.dashboard", "Dashboard"),
        href: "/Dashboard",
        icon: "LayoutDashboard"
      },
      {
        label: T("nav.github", "GitHub"),
        href: "https://github.com/CodeEditorLand/Land",
        icon: "GitFork"
      }
    ],
    actions: [
      {
        text: T("actions.signIn", "Sign In"),
        variant: "ghost",
        size: "default",
        href: "/Account/SignIn",
        icon: "LogIn"
      },
      {
        text: T("actions.editorPortal", "Editor Portal"),
        variant: "outline",
        size: "default",
        href: "/Portal",
        icon: "Monitor"
      },
      {
        text: T("actions.getStarted", "Get Land"),
        variant: "default",
        size: "default",
        href: "/Download",
        icon: "Download"
      }
    ]
  };
  const RenderIcon = (IconName) => {
    if (!IconName) return null;
    const Icon = IconRegistry[IconName];
    if (!Icon) return null;
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      " ",
      /* @__PURE__ */ jsx(Icon, { className: "StaccatoIcon h-3.5 w-3.5", "aria-hidden": "true" })
    ] });
  };
  const RenderActionIcon = (IconName) => {
    if (!IconName) return null;
    const Icon = IconRegistry[IconName];
    if (!Icon) return null;
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      " ",
      /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4", "aria-hidden": "true" })
    ] });
  };
  return /* @__PURE__ */ jsxs("header", { className: "Header sticky top-0 z-50 w-full", role: "banner", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex h-14 items-center justify-between px-4", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "/",
          className: "StaccatoLogo HeaderLogo flex items-center space-x-3 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
          "aria-label": `${HeaderData.logo?.text || "Land"} - Go to homepage`,
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
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: HeaderData.logo?.text || "Land" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "HeaderSub hidden md:block",
          style: { marginTop: "2px" },
          children: /* @__PURE__ */ jsx(
            "nav",
            {
              className: "flex items-center",
              "aria-label": "Main navigation",
              children: HeaderData.navigation?.map((Link, Index) => /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
                Index > 0 && /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "StaccatoBreath text-muted-foreground/40 mx-0.5 select-none text-[10px]",
                    "aria-hidden": "true",
                    children: "/"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: Link.href,
                    className: "StaccatoNavLink HeaderSubLink relative flex items-center px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
                    ...Link.href.startsWith("http") ? {
                      target: "_blank",
                      rel: "noopener noreferrer"
                    } : {},
                    children: [
                      Link.label,
                      RenderIcon(Link.icon)
                    ]
                  }
                )
              ] }, Index))
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "hidden items-center space-x-2 md:flex", children: [
          /* @__PURE__ */ jsx(LocaleSwitcher, {}),
          AuthSlot ? /* @__PURE__ */ jsxs(Fragment, { children: [
            AuthSlot,
            HeaderData.actions?.filter(
              (Action) => Action.href !== "/Account/SignIn"
            ).map((Action, Index) => /* @__PURE__ */ jsx(
              Button,
              {
                variant: Action.variant || "default",
                size: Action.size || "default",
                className: "StaccatoButton",
                asChild: true,
                children: /* @__PURE__ */ jsxs("a", { href: Action.href, children: [
                  Action.text,
                  RenderActionIcon(Action.icon)
                ] })
              },
              Index
            ))
          ] }) : HeaderData.actions?.map((Action, Index) => /* @__PURE__ */ jsx(
            Button,
            {
              variant: Action.variant || "default",
              size: Action.size || "default",
              className: "StaccatoButton",
              asChild: true,
              children: /* @__PURE__ */ jsxs("a", { href: Action.href, children: [
                Action.text,
                RenderActionIcon(Action.icon)
              ] })
            },
            Index
          ))
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
    MobileMenuOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: "border-t border-[var(--Border)] bg-white md:hidden",
        role: "dialog",
        "aria-label": "Mobile navigation menu",
        children: /* @__PURE__ */ jsxs(
          "nav",
          {
            className: "container mx-auto flex flex-col space-y-0.5 px-4 py-3",
            "aria-label": "Mobile navigation",
            children: [
              HeaderData.navigation?.map((Link, Index) => {
                const Icon = Link.icon ? IconRegistry[Link.icon] : null;
                return /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: Link.href,
                    className: "flex items-center rounded-none px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
                    onClick: () => SetMobileMenuOpen(false),
                    ...Link.href.startsWith("http") ? {
                      target: "_blank",
                      rel: "noopener noreferrer"
                    } : {},
                    children: [
                      Link.label,
                      Icon && /* @__PURE__ */ jsxs(Fragment, { children: [
                        " ",
                        /* @__PURE__ */ jsx(
                          Icon,
                          {
                            className: "text-muted-foreground/70 h-4 w-4",
                            "aria-hidden": "true"
                          }
                        )
                      ] })
                    ]
                  },
                  Index
                );
              }),
              /* @__PURE__ */ jsx("div", { className: "my-1.5 border-t border-border" }),
              /* @__PURE__ */ jsx("div", { className: "px-3 py-1.5", children: /* @__PURE__ */ jsx(LocaleSwitcher, {}) }),
              /* @__PURE__ */ jsx("div", { className: "my-1.5 border-t border-border" }),
              HeaderData.actions?.map((Action, Index) => /* @__PURE__ */ jsx(
                Button,
                {
                  variant: Action.variant || "default",
                  className: "w-full justify-start",
                  asChild: true,
                  children: /* @__PURE__ */ jsxs("a", { href: Action.href, children: [
                    Action.text,
                    RenderActionIcon(Action.icon)
                  ] })
                },
                Index
              ))
            ]
          }
        )
      }
    )
  ] });
};

export { Header as H };
