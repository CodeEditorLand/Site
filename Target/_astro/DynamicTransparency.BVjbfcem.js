const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/Staccato.C01-Mbs-.js","_astro/Footer.xysLliKW.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from './Footer.xysLliKW.js';
import { b2 as reactExports, b1 as jsxDevRuntimeExports, w as Copy, q as Code, aZ as Zap, a0 as Layers, x as Cpu, aA as Server, a5 as Lock, F as EyeOff, z as Eye, aC as Shield } from './Vendor/React.D_hnTAe2.js';
import { B as Badge } from './Download.BGXTwG7G.js';
import { R as RichText } from './DynamicRichText.DXU21lpf.js';

const TransparencyIconRegistry = {
  Shield: Shield,
  Eye: Eye,
  EyeOff: EyeOff,
  Lock: Lock,
  Server: Server,
  Cpu: Cpu,
  Code: Code,
  Layers: Layers,
  Zap: Zap
};
const StatusColor = {
  Active: "bg-green-500",
  Disabled: "bg-green-500",
  Optional: "bg-yellow-500",
  Recommended: "bg-blue-500"
};
const StatusBadgeVariant = {
  Active: "default",
  Disabled: "secondary",
  Optional: "outline",
  Recommended: "default"
};
const VariantStatusColor = {
  Recommended: "bg-blue-500",
  Available: "bg-green-500",
  Legacy: "bg-yellow-500",
  Experimental: "bg-purple-500",
  Development: "bg-orange-500"
};
const DynamicTransparency = ({ Content, ClassName }) => {
  const {
    Title,
    Subtitle,
    Policy,
    Variant,
    Strategy,
    MatrixPermutation,
    SourceURL
  } = Content;
  const SectionReference = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const Section = SectionReference.current;
    if (!Section) return;
    const ReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (ReducedMotion) return;
    const ApplyNoise = async () => {
      const StaccatoModule = await __vitePreload(() => import('./Staccato.C01-Mbs-.js'),true              ?__vite__mapDeps([0,1]):void 0);
      const Engine = await StaccatoModule.default;
      Engine.SeedSelector(".TransparencyCard");
    };
    ApplyNoise();
  }, []);
  const GetIcon = (IconName) => {
    return TransparencyIconRegistry[IconName] || null;
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "section",
    {
      id: "Transparency",
      "aria-label": "Build Transparency",
      className: `w-full py-20 ${ClassName || ""}`,
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-4", children: [
        (Title || Subtitle) && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "StaccatoBreath mb-16 text-center", children: [
          Title && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl", children: Title }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
            lineNumber: 95,
            columnNumber: 8
          }, undefined),
          Subtitle && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto max-w-3xl text-lg text-muted-foreground", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RichText, { Text: Subtitle }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
            lineNumber: 101,
            columnNumber: 9
          }, undefined) }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
            lineNumber: 100,
            columnNumber: 8
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
          lineNumber: 93,
          columnNumber: 6
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-16", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "mb-2 text-2xl tracking-tight", children: "Telemetry Policy" }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
            lineNumber: 109,
            columnNumber: 6
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-8 text-muted-foreground", children: "Full disclosure on what Land collects - and what it does not." }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
            lineNumber: 112,
            columnNumber: 6
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3", children: Policy.map((Item) => {
            const Icon = GetIcon(Item.Icon);
            return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "div",
              {
                className: "TransparencyCard StaccatoCard StaccatoBorderShimmer flex flex-col space-y-4 rounded-none bg-card p-6",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start justify-between", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-mono text-sm font-semibold", children: Item.Title }, void 0, false, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                      lineNumber: 124,
                      columnNumber: 11
                    }, undefined),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "ml-4 flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                        Badge,
                        {
                          variant: StatusBadgeVariant[Item.Status],
                          className: "StaccatoBadge",
                          children: [
                            Item.Status,
                            " ",
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                              "span",
                              {
                                className: `StaccatoDot StaccatoRhythmDot h-2 w-2 rounded-none ${StatusColor[Item.Status]}`,
                                "aria-hidden": "true"
                              },
                              void 0,
                              false,
                              {
                                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                              },
                              undefined
                            )
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                          lineNumber: 128,
                          columnNumber: 12
                        },
                        undefined
                      ),
                      Icon && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                        "div",
                        {
                          className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-secondary",
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                            Icon,
                            {
                              className: "StaccatoIcon h-5 w-5 text-primary",
                              "aria-hidden": "true"
                            },
                            void 0,
                            false,
                            {
                              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                              lineNumber: 146,
                              columnNumber: 14
                            },
                            undefined
                          )
                        },
                        void 0,
                        false,
                        {
                          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                          lineNumber: 143,
                          columnNumber: 13
                        },
                        undefined
                      )
                    ] }, void 0, true, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                      lineNumber: 127,
                      columnNumber: 11
                    }, undefined)
                  ] }, void 0, true, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                    lineNumber: 123,
                    columnNumber: 10
                  }, undefined),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "StaccatoBreath text-muted-foreground", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RichText, { Text: Item.Description }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                    lineNumber: 155,
                    columnNumber: 11
                  }, undefined) }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                    lineNumber: 154,
                    columnNumber: 10
                  }, undefined),
                  Item.Detail && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-muted-foreground/70", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    RichText,
                    {
                      Text: Item.Detail,
                      Terms: true
                    },
                    void 0,
                    false,
                    {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                      lineNumber: 159,
                      columnNumber: 12
                    },
                    undefined
                  ) }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                    lineNumber: 158,
                    columnNumber: 11
                  }, undefined)
                ]
              },
              Item.Identifier,
              true,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                lineNumber: 120,
                columnNumber: 9
              },
              undefined
            );
          }) }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
            lineNumber: 116,
            columnNumber: 6
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
          lineNumber: 108,
          columnNumber: 5
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-16", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "mb-2 text-2xl tracking-tight", children: "Build Variants" }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
            lineNumber: 173,
            columnNumber: 6
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-8 text-muted-foreground", children: [
            Variant.length,
            " named profiles across",
            " ",
            MatrixPermutation,
            " test permutations. Every combination verified."
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
            lineNumber: 176,
            columnNumber: 6
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("table", { className: "w-full border-collapse", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("thead", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tr", { className: "border-b border-[var(--Border)]", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "px-4 py-3 text-left font-semibold", children: "Profile" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                lineNumber: 185,
                columnNumber: 10
              }, undefined),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "px-4 py-3 text-left font-semibold", children: "Tier" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                lineNumber: 188,
                columnNumber: 10
              }, undefined),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "px-4 py-3 text-left font-semibold", children: "Workbench" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                lineNumber: 191,
                columnNumber: 10
              }, undefined),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "px-4 py-3 text-left font-semibold", children: "Features" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                lineNumber: 194,
                columnNumber: 10
              }, undefined),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "px-4 py-3 text-left font-semibold", children: "Status" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                lineNumber: 197,
                columnNumber: 10
              }, undefined)
            ] }, void 0, true, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
              lineNumber: 184,
              columnNumber: 9
            }, undefined) }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
              lineNumber: 183,
              columnNumber: 8
            }, undefined),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tbody", { children: Variant.map((Item) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "tr",
              {
                className: "border-b border-[var(--Border)] last:border-b-0",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "px-4 py-3 font-mono", children: Item.Name }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                    lineNumber: 207,
                    columnNumber: 11
                  }, undefined),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    Badge,
                    {
                      variant: "outline",
                      className: "StaccatoBadge",
                      children: Item.Tier
                    },
                    void 0,
                    false,
                    {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                      lineNumber: 211,
                      columnNumber: 12
                    },
                    undefined
                  ) }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                    lineNumber: 210,
                    columnNumber: 11
                  }, undefined),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "px-4 py-3", children: Item.Workbench }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                    lineNumber: 217,
                    columnNumber: 11
                  }, undefined),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "px-4 py-3 text-muted-foreground", children: Item.Feature }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                    lineNumber: 220,
                    columnNumber: 11
                  }, undefined),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { className: "StaccatoBadge", children: [
                    Item.Status,
                    " ",
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "span",
                      {
                        className: `StaccatoDot h-2 w-2 rounded-none ${VariantStatusColor[Item.Status]}`,
                        "aria-hidden": "true"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                        lineNumber: 227,
                        columnNumber: 13
                      },
                      undefined
                    )
                  ] }, void 0, true, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                    lineNumber: 224,
                    columnNumber: 12
                  }, undefined) }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                    lineNumber: 223,
                    columnNumber: 11
                  }, undefined)
                ]
              },
              Item.Identifier,
              true,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                lineNumber: 204,
                columnNumber: 10
              },
              undefined
            )) }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
              lineNumber: 202,
              columnNumber: 8
            }, undefined)
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
            lineNumber: 182,
            columnNumber: 7
          }, undefined) }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
            lineNumber: 181,
            columnNumber: 6
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
          lineNumber: 172,
          columnNumber: 5
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-16", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "mb-2 text-2xl tracking-tight", children: "Deployment Strategies" }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
            lineNumber: 242,
            columnNumber: 6
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-8 text-muted-foreground", children: "Four deployment modes from development to production." }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
            lineNumber: 245,
            columnNumber: 6
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2", children: Strategy.map((Item) => {
            const Icon = GetIcon(Item.Icon);
            return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "div",
              {
                className: "TransparencyCard StaccatoCard StaccatoBorderShimmer flex flex-col space-y-4 rounded-none bg-card p-6",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start justify-between", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-mono text-sm font-semibold", children: Item.Name }, void 0, false, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                      lineNumber: 256,
                      columnNumber: 11
                    }, undefined),
                    Icon && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "div",
                      {
                        className: "ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-secondary",
                        "aria-hidden": "true",
                        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          Icon,
                          {
                            className: "StaccatoIcon h-5 w-5 text-primary",
                            "aria-hidden": "true"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                            lineNumber: 263,
                            columnNumber: 13
                          },
                          undefined
                        )
                      },
                      void 0,
                      false,
                      {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                        lineNumber: 260,
                        columnNumber: 12
                      },
                      undefined
                    )
                  ] }, void 0, true, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                    lineNumber: 255,
                    columnNumber: 10
                  }, undefined),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "StaccatoBreath text-muted-foreground", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RichText, { Text: Item.Description }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                    lineNumber: 271,
                    columnNumber: 11
                  }, undefined) }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                    lineNumber: 270,
                    columnNumber: 10
                  }, undefined),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-baseline rounded-none bg-secondary px-3 py-2", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("code", { className: "font-mono", children: Item.Command }, void 0, false, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                      lineNumber: 274,
                      columnNumber: 11
                    }, undefined),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "button",
                      {
                        type: "button",
                        onClick: async () => {
                          try {
                            await navigator.clipboard.writeText(
                              Item.Command
                            );
                          } catch {
                          }
                        },
                        "aria-label": "Copy command",
                        title: "Copy command",
                        className: "ml-2 inline-flex h-[1.1em] w-[1.1em] shrink-0 items-center justify-center rounded-none bg-[var(--Mute)] opacity-50 transition-opacity hover:opacity-100",
                        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          Copy,
                          {
                            className: "h-[0.65em] w-[0.65em]",
                            "aria-hidden": "true"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                            lineNumber: 291,
                            columnNumber: 12
                          },
                          undefined
                        )
                      },
                      void 0,
                      false,
                      {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                        lineNumber: 277,
                        columnNumber: 11
                      },
                      undefined
                    )
                  ] }, void 0, true, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                    lineNumber: 273,
                    columnNumber: 10
                  }, undefined),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-2", children: Item.Feature.map(
                    (FeatureName, Index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Badge,
                      {
                        variant: "outline",
                        className: "StaccatoBadge",
                        children: FeatureName
                      },
                      Index,
                      false,
                      {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                        lineNumber: 300,
                        columnNumber: 13
                      },
                      undefined
                    )
                  ) }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                    lineNumber: 297,
                    columnNumber: 10
                  }, undefined)
                ]
              },
              Item.Identifier,
              true,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                lineNumber: 252,
                columnNumber: 9
              },
              undefined
            );
          }) }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
            lineNumber: 248,
            columnNumber: 6
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
          lineNumber: 241,
          columnNumber: 5
        }, undefined),
        SourceURL && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "a",
          {
            href: SourceURL,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center text-muted-foreground underline underline-offset-4 hover:text-foreground",
            children: [
              "Verify in source code",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "InlineSeparator", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                Code,
                {
                  className: "h-4 w-4",
                  "aria-hidden": "true"
                },
                void 0,
                false,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                  lineNumber: 325,
                  columnNumber: 9
                },
                undefined
              ) }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
                lineNumber: 324,
                columnNumber: 8
              }, undefined)
            ]
          },
          void 0,
          true,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
            lineNumber: 318,
            columnNumber: 7
          },
          undefined
        ) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
          lineNumber: 317,
          columnNumber: 6
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
        lineNumber: 91,
        columnNumber: 4
      }, undefined)
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
      lineNumber: 87,
      columnNumber: 3
    },
    undefined
  );
};

export { DynamicTransparency, DynamicTransparency as default };
//# sourceMappingURL=DynamicTransparency.BVjbfcem.js.map
