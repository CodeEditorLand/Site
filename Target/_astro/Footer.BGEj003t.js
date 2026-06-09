import { b1 as jsxDevRuntimeExports, at as Root, b4 as useTranslation } from './Vendor/React.D_hnTAe2.js';
import { I as IconTooltip } from './IconTooltip.D9Gc1Gmr.js';
import { c as cn } from './Utility.BriZ7xTM.js';

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Root,
    {
      "data-slot": "separator-root",
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Separator.tsx",
      lineNumber: 15,
      columnNumber: 3
    },
    this
  );
}

const Footer = ({ Content }) => {
  const { t: T } = useTranslation("footer");
  const FooterData = Content || {
    Brand: {
      Name: T("brand.name", { defaultValue: "Code Editor Land" }),
      Description: T("brand.description", {
        defaultValue: "No Electron. No Chromium. Every extension runs unchanged.\n\nOpen source and free forever."
      })
    },
    Columns: [
      {
        Title: T("columns.product.title", "Product"),
        Links: [
          {
            Label: T("columns.product.features", "Features"),
            Href: "/#features"
          },
          {
            Label: T("columns.product.downloads", "Downloads"),
            Href: "/Download"
          },
          {
            Label: T("columns.product.docs", "Documentation"),
            Href: "/Doc"
          },
          {
            Label: T("columns.product.blog", "Blog"),
            Href: "/Blog"
          }
        ]
      },
      {
        Title: T("columns.company.title", "Community"),
        Links: [
          {
            Label: T("columns.company.issues", "Issues"),
            Href: "https://github.com/CodeEditorLand/Land/issues"
          },
          {
            Label: T(
              "columns.company.contributing",
              "Contributing"
            ),
            Href: "/Contributing"
          },
          {
            Label: T("columns.company.github", "GitHub"),
            Href: "https://github.com/CodeEditorLand/Land"
          },
          {
            Label: T("columns.company.enterprise", "Enterprise"),
            Href: "/Contact/Sale"
          }
        ]
      },
      {
        Title: T("columns.legal.title", "Legal"),
        Links: [
          {
            Label: T("columns.legal.privacy", "Privacy"),
            Href: "/Legal/Privacy"
          },
          {
            Label: T("columns.legal.terms", "Terms"),
            Href: "/Legal/Term"
          },
          {
            Label: T("columns.legal.license", "License"),
            Href: "/License"
          }
        ]
      }
    ],
    BottomBar: { MadeWith: true }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("footer", { className: "Footer", role: "contentinfo", "aria-label": "Site footer", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "FooterContent container mx-auto px-4 py-16", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "a",
          {
            href: "/",
            className: "mb-4 flex items-center space-x-3 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
            "aria-label": `${FooterData.Brand?.Name || "Land"} - Go to homepage`,
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "img",
                {
                  src: "/Asset/Logo/Glyph/Land.svg",
                  alt: "Code Editor Land",
                  title: "Code Editor Land",
                  width: "32",
                  height: "32",
                  className: "h-8 w-8 dark:hidden",
                  "aria-hidden": "true"
                },
                void 0,
                false,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
                  lineNumber: 118,
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
                  className: "h-8 w-8 hidden dark:block",
                  "aria-hidden": "true"
                },
                void 0,
                false,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
                  lineNumber: 126,
                  columnNumber: 10
                },
                undefined
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-semibold", children: FooterData.Brand?.Name || "Land" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
                lineNumber: 135,
                columnNumber: 8
              }, undefined)
            ]
          },
          void 0,
          true,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
            lineNumber: 114,
            columnNumber: 7
          },
          undefined
        ),
        FooterData.Brand?.Description && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-6 max-w-md whitespace-pre-line text-sm text-muted-foreground", children: FooterData.Brand.Description }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
          lineNumber: 140,
          columnNumber: 8
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
        lineNumber: 113,
        columnNumber: 6
      }, undefined),
      FooterData.Columns?.map((Column, ColumnIndex) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("nav", { "aria-label": Column.Title, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: Column.Title }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
          lineNumber: 148,
          columnNumber: 8
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "space-y-2 text-muted-foreground", children: Column.Links.map((Link, LinkIndex) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "a",
          {
            href: Link.Href,
            className: "StaccatoNavLink transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
            ...Link.Href.startsWith("http") ? {
              target: "_blank",
              rel: "noopener noreferrer"
            } : {},
            children: Link.Label
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
            lineNumber: 154,
            columnNumber: 11
          },
          undefined
        ) }, LinkIndex, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
          lineNumber: 153,
          columnNumber: 10
        }, undefined)) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
          lineNumber: 151,
          columnNumber: 8
        }, undefined)
      ] }, ColumnIndex, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
        lineNumber: 147,
        columnNumber: 7
      }, undefined))
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
      lineNumber: 112,
      columnNumber: 5
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Separator, { className: "StaccatoSeparator my-8" }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
      lineNumber: 172,
      columnNumber: 5
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        className: "mb-6 border-l-2 py-2 pl-4",
        style: { borderLeftColor: "var(--SpinegRPC)" },
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm leading-relaxed text-muted-foreground", children: [
          T(
            "funding.prefix",
            "This project has been funded through the "
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "a",
            {
              href: "https://nlnet.nl/commonsfund",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-[var(--Primary)] hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
              children: T("funding.ngiFund", "NGI0 Commons Fund")
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
              lineNumber: 182,
              columnNumber: 7
            },
            undefined
          ),
          T("funding.nlnetIntro", ", a fund established by "),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "a",
            {
              href: "https://nlnet.nl",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-[var(--Primary)] hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
              children: T("funding.nlnet", "NLnet")
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
              lineNumber: 190,
              columnNumber: 7
            },
            undefined
          ),
          T(
            "funding.euSupport",
            " with financial support from the European Commission’s Next Generation Internet programme, under grant agreement No. 101135429. "
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "a",
            {
              href: "https://nlnet.nl/project/Land/",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-[var(--Primary)] hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
              children: T("funding.projectPage", "View project page")
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
              lineNumber: 201,
              columnNumber: 7
            },
            undefined
          ),
          "."
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
          lineNumber: 177,
          columnNumber: 6
        }, undefined)
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
        lineNumber: 174,
        columnNumber: 5
      },
      undefined
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col items-center justify-between md:flex-row", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4 flex items-center gap-4 md:mb-0", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "a",
          {
            href: "https://github.com/CodeEditorLand",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "StaccatoSocial focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
            "aria-label": "Code Editor Land on GitHub (opens in new tab)",
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(IconTooltip, { Label: "GitHub", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "img",
                {
                  src: "/Image/GitHub.svg",
                  alt: "GitHub",
                  width: "20",
                  height: "20",
                  className: "h-5 w-5 dark:hidden"
                },
                void 0,
                false,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
                  lineNumber: 221,
                  columnNumber: 9
                },
                undefined
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "img",
                {
                  src: "/Dark/Image/GitHub.svg",
                  alt: "GitHub",
                  width: "20",
                  height: "20",
                  className: "hidden h-5 w-5 dark:block"
                },
                void 0,
                false,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
                  lineNumber: 228,
                  columnNumber: 9
                },
                undefined
              )
            ] }, void 0, true, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
              lineNumber: 220,
              columnNumber: 8
            }, undefined)
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
            lineNumber: 214,
            columnNumber: 7
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "InlineSeparator", "aria-hidden": "true" }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
          lineNumber: 237,
          columnNumber: 7
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "a",
          {
            href: "https://x.com/CodeEditorLand",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "StaccatoSocial focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
            "aria-label": "Code Editor Land on X (opens in new tab)",
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(IconTooltip, { Label: "X (Twitter)", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "svg",
              {
                viewBox: "0 0 24 24",
                fill: "currentColor",
                width: "20",
                height: "20",
                className: "h-5 w-5",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" }, void 0, false, {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
                  lineNumber: 252,
                  columnNumber: 10
                }, undefined)
              },
              void 0,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
                lineNumber: 245,
                columnNumber: 9
              },
              undefined
            ) }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
              lineNumber: 244,
              columnNumber: 8
            }, undefined)
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
            lineNumber: 238,
            columnNumber: 7
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "InlineSeparator", "aria-hidden": "true" }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
          lineNumber: 256,
          columnNumber: 7
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-muted-foreground", children: T("bottomBar.copyright", {
          year: (/* @__PURE__ */ new Date()).getFullYear(),
          defaultValue: `© ${(/* @__PURE__ */ new Date()).getFullYear()} Code Editor Land. All rights reserved.`
        }) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
          lineNumber: 257,
          columnNumber: 7
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
        lineNumber: 213,
        columnNumber: 6
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap items-center gap-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "a",
          {
            href: "https://editor.land",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-muted-foreground transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
            "aria-label": "PlayForm (opens in new tab)",
            children: [
              "PlayForm",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "InlineSeparator", children: "→" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
                lineNumber: 272,
                columnNumber: 8
              }, undefined)
            ]
          },
          void 0,
          true,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
            lineNumber: 265,
            columnNumber: 7
          },
          undefined
        ),
        FooterData.BottomBar?.MadeWith && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "a",
          {
            href: "https://tauri.app",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "transition-opacity hover:opacity-80 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
            "aria-label": "Made with Tauri (opens in new tab)",
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "img",
              {
                src: "https://editor.land/Image/GitHub/Made/Tauri.svg",
                alt: "Made with Tauri",
                width: "160",
                height: "32",
                className: "h-8 dark:rounded dark:bg-white/90 dark:px-2",
                loading: "lazy"
              },
              void 0,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
                lineNumber: 281,
                columnNumber: 9
              },
              undefined
            )
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
            lineNumber: 275,
            columnNumber: 8
          },
          undefined
        )
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
        lineNumber: 264,
        columnNumber: 6
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
      lineNumber: 212,
      columnNumber: 5
    }, undefined)
  ] }, void 0, true, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
    lineNumber: 111,
    columnNumber: 4
  }, undefined) }, void 0, false, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
    lineNumber: 110,
    columnNumber: 3
  }, undefined);
};

export { Footer, Footer as default };
//# sourceMappingURL=Footer.BGEj003t.js.map
