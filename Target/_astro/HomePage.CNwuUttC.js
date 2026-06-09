const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/Attention.CDPaQ1i1.js","_astro/Footer.xysLliKW.js","_astro/Staccato.C01-Mbs-.js","_astro/Download.BGXTwG7G.js","_astro/Vendor/React.D_hnTAe2.js","_astro/Utility.BriZ7xTM.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from './Footer.xysLliKW.js';
import { b2 as reactExports, b1 as jsxDevRuntimeExports, aG as Sparkles, D as Database, aC as Shield, aA as Server, al as Puzzle, ag as Package, a0 as Layers, q as Code, V as Heart, aX as Wrench, Q as Globe, x as Cpu, e as Box, aZ as Zap, a4 as LoaderCircle, ay as Send, ax as Search, a7 as Mail, a6 as LogIn, O as GitFork, E as ExternalLink, y as Download, j as ChevronRight, b as ArrowRight, ae as Network, b4 as useTranslation, C as Check, t as Container, H as FileOutput, p as CloudFog, f as Boxes, T as HardHat, aQ as Umbrella, aH as Sprout, aM as Trees, am as Radio, aW as Wind, o as Cloud, ad as Mountain, aI as Square } from './Vendor/React.D_hnTAe2.js';
import { E as ErrorBoundary } from './Verify.D2u08mPO.js';
import { H as Header } from './Header.Dqizcpbn.js';
import { B as Button, b as SkeletonFeatureCard, c as SkeletonPricingTier, a as SkeletonCard } from './Skeleton.Dp5ep6F2.js';
import { T as ThemeIcon } from './Blog.C5m3bFxQ.js';
import { I as IconTooltip } from './IconTooltip.D9Gc1Gmr.js';
import { R as RichText } from './DynamicRichText.DXU21lpf.js';
import { B as Badge } from './Download.BGXTwG7G.js';
import { C as Card, d as CardHeader, e as CardTitle, b as CardDescription, a as CardContent, c as CardFooter } from './Card.XBnil_qE.js';

const FeatureIconRegistry = {
  Zap: Zap,
  Box: Box,
  Cpu: Cpu,
  Globe: Globe,
  Wrench: Wrench,
  Heart: Heart,
  Sparkles: Sparkles,
  Code: Code,
  Layers: Layers,
  Package: Package,
  Puzzle: Puzzle,
  Server: Server,
  Shield: Shield,
  Database: Database
};
const FeatureColorMap = {
  performance: "var(--ExtensionRust)",
  compatibility: "var(--SpineWASM)",
  architecture: "var(--ExtensionEffectTypeScript)",
  "cross-platform": "var(--ExtensionTauri)",
  tooling: "var(--ToolBiome)",
  opensource: "var(--SpinegRPC)"
};
const FeatureColorMuteMap = {
  performance: "var(--ExtensionRustMute)",
  compatibility: "var(--SpineWASMMute)",
  architecture: "var(--ExtensionEffectTypeScriptMute)",
  "cross-platform": "var(--ExtensionTauriMute)",
  tooling: "var(--ToolBiomeMute)",
  opensource: "var(--SpinegRPCMute)"
};
const FeatureIconLabelMap = {
  Zap: "Mountain runs native services through Tauri outside the WebView, dispatched via the ActionEffect system",
  Box: "Cocoon hosts VS Code extensions with Effect-TS across a dual-track architecture",
  Cpu: "Rust services run at native speed without Electron overhead",
  Globe: "One Tauri source tree compiles to macOS, Windows, and Linux",
  Wrench: "Rust, Tauri, Effect-TS, Biome, and OXC form the toolchain",
  Heart: "CC0 public domain - free to use, fork, and ship",
  Layers: "Effect-TS provides typed errors and dependency injection across Wind and Cocoon service layers",
  Puzzle: "Extensions run unmodified through Cocoon where their APIs are implemented",
  Server: "gRPC connects Mountain, Cocoon, Air, and Grove via typed protocol contracts",
  Shield: "Verified request path where implemented",
  Sparkles: "Active development across all element repos",
  Code: "Rust and TypeScript across native and service layers",
  Package: "Tauri bundles to native platform packages with no Chromium"
};
const IconSemanticColorMap = {
  Zap: "var(--ExtensionRust)",
  Cpu: "var(--LanguageRust)",
  Server: "var(--SpinegRPC)",
  Box: "var(--SpineWASM)",
  Puzzle: "var(--ExtensionEffectTypeScript)",
  Code: "var(--LanguageTypeScript)",
  Layers: "var(--SpineTCP)",
  Shield: "var(--ExtensionTauri)",
  Globe: "var(--ExtensionTauri)",
  Package: "var(--ToolEsBuild)",
  Database: "var(--SpineTCP)",
  Wrench: "var(--ToolBiome)",
  Heart: "var(--ExtensionRust)",
  Sparkles: "var(--ToolOxc)"
};
const DynamicFeatures = ({ Content, ClassName }) => {
  const { Title, Subtitle, Features, Columns = 3, Gap = "lg" } = Content;
  const GridReference = reactExports.useRef(null);
  const GapClass = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-12"
  };
  const ColumnClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
  };
  reactExports.useEffect(() => {
    const Grid = GridReference.current;
    if (!Grid) return;
    const ReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (ReducedMotion) return;
    const ApplyScatter = async () => {
      const AttentionModule = await __vitePreload(() => import('./Attention.CDPaQ1i1.js'),true              ?__vite__mapDeps([0,1]):void 0);
      const Attention = await AttentionModule.default;
      const Cards = Grid.querySelectorAll(".FeatureCard");
      Cards.forEach((Card, Index) => {
        Attention.ApplyToElement(Card, Index, 6, 4);
      });
      const StaccatoModule = await __vitePreload(() => import('./Staccato.C01-Mbs-.js'),true              ?__vite__mapDeps([2,1]):void 0);
      const Engine = await StaccatoModule.default;
      Engine.SeedSelector(".FeatureCard");
    };
    ApplyScatter();
  }, [Features]);
  const GetIcon = (IconName) => FeatureIconRegistry[IconName] || null;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "section",
    {
      id: "features",
      "aria-labelledby": "FeaturesHeading",
      className: `w-full py-16 sm:py-20 ${ClassName || ""}`,
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-4", children: [
        (Title || Subtitle) && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto mb-10 max-w-2xl text-center", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--MuteForeground)]", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[var(--SpinegRPCFore)]", children: "//" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
              lineNumber: 168,
              columnNumber: 8
            }, undefined),
            " ",
            "Features"
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
            lineNumber: 167,
            columnNumber: 7
          }, undefined),
          Title && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "h2",
            {
              id: "FeaturesHeading",
              className: "font-serif text-4xl font-normal tracking-tight sm:text-5xl",
              children: Title
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
              lineNumber: 174,
              columnNumber: 8
            },
            undefined
          ),
          Subtitle && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-3 text-[var(--MuteForeground)]", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RichText, { Text: Subtitle }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
            lineNumber: 182,
            columnNumber: 9
          }, undefined) }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
            lineNumber: 181,
            columnNumber: 8
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
          lineNumber: 166,
          columnNumber: 6
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            ref: GridReference,
            className: `StaccatoMorphGap grid min-h-0 items-start ${ColumnClass[Columns]} ${GapClass[Gap]} mx-auto max-w-6xl`,
            children: Features.map((Feature) => {
              const Icon = GetIcon(Feature.Icon);
              const IconLabel = FeatureIconLabelMap[Feature.Icon] ?? Feature.Title;
              const FeatureColor = FeatureColorMap[Feature.Id] ?? "var(--Primary)";
              const FeatureColorMute = FeatureColorMuteMap[Feature.Id] ?? "var(--Mute)";
              return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "article",
                {
                  title: Feature.Id === "performance" ? "Mountain and Echo run native Rust services\nthrough Tauri outside the WebView,\ndispatched via ActionEffect." : Feature.Id === "compatibility" ? "Cocoon extension host runs\nunmodified VS Code extensions\nvia Effect-TS across a dual-track architecture." : Feature.Id === "architecture" ? "Effect-TS Layer stacks provide:\n• Typed errors\n• Structured concurrency\n• Compile-time dependency tracking" : Feature.Id === "cross-platform" ? "Tauri compiles one codebase\nto native macOS, Windows, and Linux apps\nvia platform WebViews." : Feature.Id === "tooling" ? "Built on:\n• Rust\n• Tauri\n• Effect-TS\n• Biome\n• OXC\n\nFor modern developer tooling." : Feature.Id === "opensource" ? "CC0 1.0 Universal\npublic domain dedication.\n\nFunded by NLnet NGI0 Commons Fund." : void 0,
                  className: "FeatureCard StaccatoCard flex min-h-0 flex-col gap-6 rounded-none bg-card p-8",
                  style: {
                    borderLeftColor: FeatureColor,
                    borderLeftWidth: "2px"
                  },
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start justify-between", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-mono text-sm font-semibold leading-snug", children: Feature.Title }, void 0, false, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
                        lineNumber: 231,
                        columnNumber: 10
                      }, undefined),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                        "div",
                        {
                          className: "ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-none",
                          style: {
                            backgroundColor: FeatureColorMute
                          },
                          children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                            IconTooltip,
                            {
                              Label: IconLabel,
                              Icon: Icon ?? Sparkles,
                              Color: FeatureColor,
                              SizeClass: "h-4 w-4",
                              ClassName: "StaccatoIcon"
                            },
                            void 0,
                            false,
                            {
                              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
                              lineNumber: 239,
                              columnNumber: 11
                            },
                            undefined
                          )
                        },
                        void 0,
                        false,
                        {
                          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
                          lineNumber: 234,
                          columnNumber: 10
                        },
                        undefined
                      )
                    ] }, void 0, true, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
                      lineNumber: 230,
                      columnNumber: 9
                    }, undefined),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "StaccatoBreath text-sm text-muted-foreground", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RichText, { Text: Feature.Description }, void 0, false, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
                        lineNumber: 249,
                        columnNumber: 10
                      }, undefined),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("br", {}, void 0, false, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
                        lineNumber: 250,
                        columnNumber: 10
                      }, undefined),
                      Feature.Icons && Feature.Icons.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                        "span",
                        {
                          className: "inline-flex items-center align-middle",
                          role: "img",
                          "aria-label": `${Feature.Title} technology stack`,
                          children: Feature.Icons.map(
                            (IconName, IconIndex) => {
                              const IsBrandSvg = IconName.startsWith(
                                "/"
                              );
                              const StackIcon = IsBrandSvg ? null : FeatureIconRegistry[IconName];
                              const StackLabel = FeatureIconLabelMap[IconName] ?? IconName.replace(
                                /^\/Image\/|\.svg$/g,
                                ""
                              );
                              const StackColor = IconSemanticColorMap[IconName] ?? FeatureColor;
                              if (!IsBrandSvg && !StackIcon) {
                                return null;
                              }
                              return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                                "span",
                                {
                                  className: "inline-flex items-center",
                                  children: [
                                    IconIndex === 0 ? " " : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                                      " ",
                                      " "
                                    ] }, void 0, true, {
                                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
                                      lineNumber: 300,
                                      columnNumber: 18
                                    }, undefined),
                                    IsBrandSvg ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                                      IconTooltip,
                                      {
                                        Label: StackLabel,
                                        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                                          ThemeIcon,
                                          {
                                            src: IconName,
                                            alt: StackLabel,
                                            width: 16,
                                            height: 16,
                                            className: "inline h-4 w-4",
                                            "aria-hidden": "true"
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
                                            lineNumber: 314,
                                            columnNumber: 19
                                          },
                                          undefined
                                        )
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
                                        lineNumber: 310,
                                        columnNumber: 18
                                      },
                                      undefined
                                    ) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                                      IconTooltip,
                                      {
                                        Label: StackLabel,
                                        Icon: StackIcon,
                                        Color: StackColor,
                                        SizeClass: "h-4 w-4"
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
                                        lineNumber: 332,
                                        columnNumber: 18
                                      },
                                      undefined
                                    )
                                  ]
                                },
                                IconIndex,
                                true,
                                {
                                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
                                  lineNumber: 293,
                                  columnNumber: 16
                                },
                                undefined
                              );
                            }
                          )
                        },
                        void 0,
                        false,
                        {
                          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
                          lineNumber: 253,
                          columnNumber: 12
                        },
                        undefined
                      )
                    ] }, void 0, true, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
                      lineNumber: 248,
                      columnNumber: 9
                    }, undefined)
                  ]
                },
                Feature.Id,
                true,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
                  lineNumber: 206,
                  columnNumber: 8
                },
                undefined
              );
            })
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
            lineNumber: 188,
            columnNumber: 5
          },
          undefined
        )
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
        lineNumber: 164,
        columnNumber: 4
      }, undefined)
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicFeatures.tsx",
      lineNumber: 160,
      columnNumber: 3
    },
    undefined
  );
};

const DynamicBadge = ({ Content, ClassName }) => {
  const {
    Text,
    Variant = "default",
    ShowDot = false,
    DotColor = "green",
    ClassName: ContentClassName,
    ...props
  } = Content;
  const DotColorTokenMap = {
    green: "var(--SpinegRPC)",
    yellow: "var(--SpineTCP)",
    red: "var(--Destruct)",
    blue: "var(--SpineIPC)"
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Badge,
    {
      variant: Variant,
      className: `StaccatoBadge ${ContentClassName || ""} ${ClassName || ""}`,
      ...props,
      children: [
        Text,
        ShowDot && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
          " ",
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "span",
            {
              className: "StaccatoDot StaccatoRhythmDot h-2 w-2 rounded-none",
              style: {
                backgroundColor: DotColorTokenMap[DotColor] ?? "var(--SpinegRPC)"
              },
              "aria-hidden": "true"
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicBadge.tsx",
              lineNumber: 35,
              columnNumber: 6
            },
            undefined
          )
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicBadge.tsx",
          lineNumber: 33,
          columnNumber: 5
        }, undefined)
      ]
    },
    void 0,
    true,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicBadge.tsx",
      lineNumber: 27,
      columnNumber: 3
    },
    undefined
  );
};

const ButtonIconRegistry = {
  ArrowRight: ArrowRight,
  ChevronRight: ChevronRight,
  Download: Download,
  ExternalLink: ExternalLink,
  GitFork: GitFork,
  Globe: Globe,
  Heart: Heart,
  LogIn: LogIn,
  Mail: Mail,
  Search: Search,
  Send: Send,
  Sparkles: Sparkles
};
const DynamicButton = ({ Content, OnAction, IsLoading = false }) => {
  const {
    Text,
    Icon,
    Variant = "ghost",
    Size = "default",
    Type = "button",
    Disabled = false,
    FullWidth = false,
    ClassName,
    Href,
    OnClick,
    ...props
  } = Content;
  const IconComponent = Icon ? ButtonIconRegistry[Icon] || null : null;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Button,
    {
      variant: Variant,
      size: Size,
      type: Type,
      disabled: Disabled || IsLoading,
      className: `StaccatoButton ${FullWidth ? "w-full" : ""} ${ClassName || ""}`,
      "aria-busy": IsLoading || void 0,
      onClick: () => {
        if (IsLoading) return;
        if (OnAction) OnAction();
        if (OnClick) OnClick();
        if (Href) window.location.href = Href;
      },
      ...props,
      children: [
        Text,
        IsLoading ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
          " ",
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            LoaderCircle,
            {
              className: "StaccatoSpinner h-4 w-4 animate-spin",
              "aria-hidden": "true"
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicButton.tsx",
              lineNumber: 68,
              columnNumber: 6
            },
            undefined
          )
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicButton.tsx",
          lineNumber: 66,
          columnNumber: 5
        }, undefined) : IconComponent ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
          " ",
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            IconComponent,
            {
              className: "StaccatoIcon h-4 w-4",
              "aria-hidden": "true"
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicButton.tsx",
              lineNumber: 76,
              columnNumber: 6
            },
            undefined
          )
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicButton.tsx",
          lineNumber: 74,
          columnNumber: 5
        }, undefined) : null
      ]
    },
    void 0,
    true,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicButton.tsx",
      lineNumber: 50,
      columnNumber: 3
    },
    undefined
  );
};

const DynamicHeroSection = ({ Content, ClassName }) => {
  const SceneReference = reactExports.useRef(null);
  const SectionReference = reactExports.useRef(null);
  const {
    Title,
    TitleHighlight,
    Subtitle,
    PrimaryCta: PrimaryCTA,
    SecondaryCta: SecondaryCTA,
    FloatingCards: FloatingCard = [],
    ...HeroConfiguration
  } = Content;
  reactExports.useEffect(() => {
    SceneReference.current;
    {
      return;
    }
  }, [HeroConfiguration.RespectReducedMotion]);
  const HandleHeroClick = () => {
    if (PrimaryCTA?.Href) {
      window.location.href = PrimaryCTA.Href;
    }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "section",
    {
      ref: SectionReference,
      id: "hero",
      "aria-label": "Hero",
      className: `StaccatoHeroButton relative flex min-h-0 w-full items-start overflow-hidden pb-12 pt-20 lg:items-center lg:pb-24 lg:pt-32 ${ClassName || ""}`,
      onClick: HandleHeroClick,
      onKeyDown: (Event) => {
        if (Event.key === "Enter" || Event.key === " ") {
          Event.preventDefault();
          HandleHeroClick();
        }
      },
      role: "button",
      tabIndex: 0,
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            "aria-hidden": "true",
            className: "pointer-events-none absolute inset-0 hidden dark:block",
            style: {
              backgroundImage: "linear-gradient(var(--Border) 1px, transparent 1px), linear-gradient(90deg, var(--Border) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 75%)"
            }
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicHeroSection.tsx",
            lineNumber: 163,
            columnNumber: 4
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container relative mx-auto px-4 text-center", children: [
          Content.Badge && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            DynamicBadge,
            {
              Content: Content.Badge,
              ClassName: "StaccatoBadge mb-8"
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicHeroSection.tsx",
              lineNumber: 179,
              columnNumber: 6
            },
            undefined
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "StaccatoColorShift mx-auto max-w-4xl font-serif text-6xl font-normal leading-[0.95] tracking-[-0.01em] md:text-8xl lg:text-9xl", children: [
            Title,
            Title && TitleHighlight ? " " : "",
            TitleHighlight && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "italic text-[var(--SpineIPCFore)]", children: TitleHighlight }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicHeroSection.tsx",
              lineNumber: 191,
              columnNumber: 7
            }, undefined)
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicHeroSection.tsx",
            lineNumber: 187,
            columnNumber: 5
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "StaccatoBreath mx-auto mt-3 max-w-2xl text-[var(--MuteForeground)]", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RichText, { Text: Subtitle }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicHeroSection.tsx",
            lineNumber: 199,
            columnNumber: 6
          }, undefined) }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicHeroSection.tsx",
            lineNumber: 198,
            columnNumber: 5
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-16 mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:[&>button]:w-auto", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DynamicButton, { Content: PrimaryCTA }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicHeroSection.tsx",
              lineNumber: 204,
              columnNumber: 6
            }, undefined),
            SecondaryCTA && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DynamicButton, { Content: SecondaryCTA }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicHeroSection.tsx",
              lineNumber: 205,
              columnNumber: 23
            }, undefined)
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicHeroSection.tsx",
            lineNumber: 203,
            columnNumber: 5
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-8 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[var(--SpinegRPCFore)]", children: "//" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicHeroSection.tsx",
              lineNumber: 210,
              columnNumber: 6
            }, undefined),
            " Tech Stack"
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicHeroSection.tsx",
            lineNumber: 209,
            columnNumber: 5
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "div",
            {
              className: "mx-auto max-w-5xl px-6 py-10 lg:px-10",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4", children: FloatingCard.map((Card, Index) => {
                const GetIcon = () => {
                  const Title2 = Card.Title.toLowerCase();
                  if (Title2.includes("rust") || Title2.includes("core"))
                    return Cpu;
                  if (Title2.includes("tauri") || Title2.includes("ui"))
                    return Box;
                  if (Title2.includes("effect") || Title2.includes("service"))
                    return Layers;
                  if (Title2.includes("grpc") || Title2.includes("ipc"))
                    return Network;
                  if (Title2.includes("extension"))
                    return Puzzle;
                  if (Title2.includes("cross") || Title2.includes("platform"))
                    return Globe;
                  if (Title2.includes("vs code") || Title2.includes("api"))
                    return Server;
                  if (Title2.includes("open") || Title2.includes("source"))
                    return Zap;
                  return Cpu;
                };
                const IconComponent = GetIcon();
                const GetIconColor = () => {
                  const Title2 = Card.Title.toLowerCase();
                  if (Title2.includes("rust") || Title2.includes("core"))
                    return "var(--SpineTCP)";
                  if (Title2.includes("tauri") || Title2.includes("ui"))
                    return "var(--SpineIPC)";
                  if (Title2.includes("effect") || Title2.includes("service"))
                    return "var(--SpineWASM)";
                  if (Title2.includes("grpc") || Title2.includes("ipc"))
                    return "var(--SpinegRPC)";
                  if (Title2.includes("extension"))
                    return "var(--SpineWASM)";
                  if (Title2.includes("cross") || Title2.includes("platform"))
                    return "var(--SpineIPC)";
                  if (Title2.includes("vs code") || Title2.includes("api"))
                    return "var(--SpinegRPC)";
                  if (Title2.includes("open") || Title2.includes("source"))
                    return "var(--SpineTCP)";
                  return "var(--SpineIPC)";
                };
                return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "div",
                  {
                    className: "group relative flex items-center gap-3 border border-[var(--Border)] bg-[var(--Card)] p-4 transition-colors hover:border-[color-mix(in_srgb,var(--Foreground)_28%,transparent)] dark:hover:border-[color-mix(in_srgb,var(--Ring)_50%,transparent)]",
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                        "span",
                        {
                          "aria-hidden": "true",
                          className: "absolute left-0 top-0 h-full w-0.5",
                          style: {
                            backgroundColor: GetIconColor()
                          }
                        },
                        void 0,
                        false,
                        {
                          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicHeroSection.tsx",
                          lineNumber: 312,
                          columnNumber: 10
                        },
                        undefined
                      ),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                        IconComponent,
                        {
                          className: "h-5 w-5 shrink-0",
                          strokeWidth: 1.5,
                          style: { color: GetIconColor() }
                        },
                        void 0,
                        false,
                        {
                          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicHeroSection.tsx",
                          lineNumber: 319,
                          columnNumber: 10
                        },
                        undefined
                      ),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "truncate font-mono text-xs uppercase tracking-wider text-foreground", children: Card.Title }, void 0, false, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicHeroSection.tsx",
                        lineNumber: 324,
                        columnNumber: 10
                      }, undefined)
                    ]
                  },
                  Card.Id,
                  true,
                  {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicHeroSection.tsx",
                    lineNumber: 308,
                    columnNumber: 9
                  },
                  undefined
                );
              }) }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicHeroSection.tsx",
                lineNumber: 218,
                columnNumber: 6
              }, undefined)
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicHeroSection.tsx",
              lineNumber: 215,
              columnNumber: 5
            },
            undefined
          )
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicHeroSection.tsx",
          lineNumber: 176,
          columnNumber: 4
        }, undefined)
      ]
    },
    void 0,
    true,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicHeroSection.tsx",
      lineNumber: 147,
      columnNumber: 3
    },
    undefined
  );
};

const DynamicCard = ({ Sections, ClassName, OnClick }) => {
  const {
    Header: HeaderSection,
    Body: BodySection,
    Footer: FooterSection
  } = Sections;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Card,
    {
      className: `StaccatoCard StaccatoBorderShimmer ${ClassName || ""}`,
      onClick: OnClick,
      style: { cursor: OnClick ? "pointer" : void 0 },
      children: [
        HeaderSection && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { children: [
          HeaderSection.title && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { children: HeaderSection.title }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicCard.tsx",
            lineNumber: 33,
            columnNumber: 7
          }, undefined),
          HeaderSection.content && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-2", children: HeaderSection.content }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicCard.tsx",
            lineNumber: 36,
            columnNumber: 7
          }, undefined),
          HeaderSection.description && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { children: HeaderSection.description }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicCard.tsx",
            lineNumber: 39,
            columnNumber: 7
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicCard.tsx",
          lineNumber: 31,
          columnNumber: 5
        }, undefined),
        BodySection && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { children: [
          BodySection.title && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "mb-2 font-mono text-sm font-semibold", children: BodySection.title }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicCard.tsx",
            lineNumber: 48,
            columnNumber: 7
          }, undefined),
          BodySection.description && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "StaccatoBreath mb-4 text-muted-foreground", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RichText, { Text: BodySection.description }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicCard.tsx",
            lineNumber: 54,
            columnNumber: 8
          }, undefined) }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicCard.tsx",
            lineNumber: 53,
            columnNumber: 7
          }, undefined),
          BodySection.content
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicCard.tsx",
          lineNumber: 46,
          columnNumber: 5
        }, undefined),
        FooterSection && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardFooter, { children: FooterSection.content }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicCard.tsx",
          lineNumber: 60,
          columnNumber: 22
        }, undefined)
      ]
    },
    void 0,
    true,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicCard.tsx",
      lineNumber: 26,
      columnNumber: 3
    },
    undefined
  );
};

const PlatformColorMap = {
  Apple: "var(--OSMacOS)",
  macOS: "var(--OSMacOS)",
  Windows: "var(--OSWindows)",
  Linux: "var(--OSLinux)"
};
const DynamicPlatformGrid = ({ Content, ClassName }) => {
  const { t: T } = useTranslation("download");
  const {
    Title,
    Subtitle,
    Platforms: ProvidedPlatforms,
    ShowVerification = true,
    OnDownload,
    ApiPlatform,
    Labels = {}
  } = Content;
  const {
    Version: VersionLabel = T("labels.version", {
      defaultValue: "Version:"
    }),
    Size: SizeLabel = T("labels.size", { defaultValue: "Size:" }),
    Requirements: RequirementsLabel = T("labels.requirements", {
      defaultValue: "Requirements:"
    }),
    Loading: LoadingLabel = T("labels.loading", {
      defaultValue: "Loading available downloads..."
    }),
    ErrorTitle: ErrorTitleLabel = T("labels.errorTitle", {
      defaultValue: "Could not load downloads"
    }),
    DownloadFailed: DownloadFailedLabel = T("labels.downloadFailed", {
      defaultValue: "Download failed. Please try again."
    })
  } = Labels;
  const [Platforms, SetPlatforms] = reactExports.useState(
    ProvidedPlatforms || []
  );
  const [Loading, SetLoading] = reactExports.useState(!ProvidedPlatforms);
  const [ErrorMessage, SetErrorMessage] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (ProvidedPlatforms) {
      SetPlatforms(ProvidedPlatforms);
      return;
    }
    const FetchPlatforms = async () => {
      try {
        SetLoading(true);
        SetErrorMessage(null);
        const { GetWorkersClient } = await __vitePreload(async () => { const { GetWorkersClient } = await import('./Download.BGXTwG7G.js').then(n => n.W);return { GetWorkersClient }},true              ?__vite__mapDeps([3,4,5]):void 0);
        const Workers = GetWorkersClient();
        const Response = await Workers.Download.GetLatest(ApiPlatform);
        if (!Response.success || !Response.data) {
          throw new Error(
            Response.error || "Failed to fetch latest download"
          );
        }
        const Latest = Response.data;
        const CurrentPlatform = [];
        const FormatBytes = (Bytes) => {
          const MB = Bytes / (1024 * 1024);
          return `${MB.toFixed(1)} MB`;
        };
        if (Latest.platform === "macos") {
          CurrentPlatform.push({
            Id: Latest.id,
            Name: "Apple",
            Icon: "Apple",
            Description: "Universal Binary",
            Version: Latest.version,
            Size: Latest.fileSize ? FormatBytes(Latest.fileSize) : "45.2 MB",
            Checksum: Latest.sha256,
            ...Latest.pgpSignature ? { Signature: Latest.pgpSignature } : {},
            Requirements: [
              "macOS 11.0 (Big Sur) or later",
              "4 GB RAM",
              "500 MB disk space"
            ]
          });
        } else if (Latest.platform === "windows") {
          CurrentPlatform.push({
            Id: Latest.id,
            Name: "Windows",
            Icon: "Monitor",
            Description: "64-bit (x64)",
            Version: Latest.version,
            Size: Latest.fileSize ? FormatBytes(Latest.fileSize) : "48.7 MB",
            Checksum: Latest.sha256,
            ...Latest.pgpSignature ? { Signature: Latest.pgpSignature } : {},
            Requirements: [
              "Windows 10 or later (64-bit)",
              "4 GB RAM",
              "500 MB disk space"
            ]
          });
        } else if (Latest.platform === "linux") {
          CurrentPlatform.push({
            Id: Latest.id,
            Name: "Linux",
            Icon: "Terminal",
            Description: "DEB, RPM, AppImage",
            Version: Latest.version,
            Size: Latest.fileSize ? FormatBytes(Latest.fileSize) : "41.3 MB",
            Checksum: Latest.sha256,
            ...Latest.pgpSignature ? { Signature: Latest.pgpSignature } : {},
            Requirements: [
              "glibc 2.28+",
              "4 GB RAM",
              "500 MB disk space"
            ]
          });
        }
        SetPlatforms(CurrentPlatform);
      } catch (FetchError) {
        SetErrorMessage(
          FetchError instanceof Error ? FetchError.message : "Failed to load downloads"
        );
        console.error("Failed to fetch platform data:", FetchError);
      } finally {
        SetLoading(false);
      }
    };
    FetchPlatforms();
  }, [ProvidedPlatforms, ApiPlatform]);
  const GridReference = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const Grid = GridReference.current;
    if (!Grid || Loading) return;
    const ReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (ReducedMotion) return;
    const ApplyScatter = async () => {
      const AttentionModule = await __vitePreload(() => import('./Attention.CDPaQ1i1.js'),true              ?__vite__mapDeps([0,1]):void 0);
      const Attention = await AttentionModule.default;
      Attention.ApplyToSelector(".PlatformCard", 5, 3);
    };
    ApplyScatter();
  }, [Platforms, Loading]);
  const FormatFileSize = (SizeString) => {
    return SizeString;
  };
  const FormatVersion = (Version) => {
    return Version.startsWith("v") ? Version : `v${Version}`;
  };
  const HandleDownload = async (Platform) => {
    try {
      const { GetWorkersClient } = await __vitePreload(async () => { const { GetWorkersClient } = await import('./Download.BGXTwG7G.js').then(n => n.W);return { GetWorkersClient }},true              ?__vite__mapDeps([3,4,5]):void 0);
      const Workers = GetWorkersClient();
      const InfoResponse = await Workers.Download.GetInfo(Platform.Id);
      if (!InfoResponse.success || !InfoResponse.data) {
        throw new Error(
          InfoResponse.error || "Failed to get download info"
        );
      }
      window.open(InfoResponse.data.downloadUrl, "_blank");
      await Workers.Download.TrackDownload(Platform.Id);
      OnDownload?.(Platform);
    } catch (DownloadError) {
      console.error("Download failed:", DownloadError);
      console.warn(DownloadFailedLabel);
    }
  };
  if (Loading) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "section",
      {
        className: `py-20 ${ClassName || ""}`,
        "aria-label": "Downloads",
        "aria-busy": "true",
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "div",
            {
              className: "mb-16 text-center",
              role: "status",
              "aria-live": "polite",
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "mb-4 font-serif text-4xl font-normal md:text-5xl lg:text-6xl", children: LoadingLabel }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
                lineNumber: 238,
                columnNumber: 7
              }, undefined)
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
              lineNumber: 234,
              columnNumber: 6
            },
            undefined
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3", children: [1, 2, 3].map((Index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            DynamicCard,
            {
              Sections: {},
              ClassName: "flex animate-pulse flex-col"
            },
            Index,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
              lineNumber: 244,
              columnNumber: 8
            },
            undefined
          )) }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
            lineNumber: 242,
            columnNumber: 6
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
          lineNumber: 233,
          columnNumber: 5
        }, undefined)
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
        lineNumber: 229,
        columnNumber: 4
      },
      undefined
    );
  }
  if (ErrorMessage) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "section",
      {
        className: `py-20 ${ClassName || ""}`,
        "aria-label": "Downloads",
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-16 text-center", role: "alert", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "mb-4 font-serif text-4xl font-normal text-red-500 md:text-5xl lg:text-6xl", children: ErrorTitleLabel }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
            lineNumber: 263,
            columnNumber: 7
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-muted-foreground", children: ErrorMessage }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
            lineNumber: 266,
            columnNumber: 7
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
          lineNumber: 262,
          columnNumber: 6
        }, undefined) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
          lineNumber: 261,
          columnNumber: 5
        }, undefined)
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
        lineNumber: 258,
        columnNumber: 4
      },
      undefined
    );
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "section",
    {
      id: "download",
      "aria-label": "Downloads",
      className: `w-full py-16 sm:py-20 ${ClassName || ""}`,
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-4", children: [
        (Title || Subtitle) && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto mb-10 max-w-2xl text-center", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--MuteForeground)]", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[var(--SpinegRPCFore)]", children: "//" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
              lineNumber: 282,
              columnNumber: 8
            }, undefined),
            " ",
            "Download"
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
            lineNumber: 281,
            columnNumber: 7
          }, undefined),
          Title && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "font-serif text-4xl font-normal tracking-tight sm:text-5xl", children: Title }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
            lineNumber: 288,
            columnNumber: 8
          }, undefined),
          Subtitle && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-3 text-[var(--MuteForeground)]", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RichText, { Text: Subtitle }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
            lineNumber: 294,
            columnNumber: 9
          }, undefined) }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
            lineNumber: 293,
            columnNumber: 8
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
          lineNumber: 280,
          columnNumber: 6
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            ref: GridReference,
            className: "mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3",
            children: Platforms.map((Platform) => {
              const HasVerification = ShowVerification && (Platform.Checksum || Platform.Signature);
              const PlatformCardSection = {
                Header: {
                  title: Platform.Name,
                  description: Platform.Description,
                  content: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    DynamicButton,
                    {
                      Content: {
                        Text: T("labels.downloadFor", {
                          defaultValue: "Download for {{platform}}",
                          platform: Platform.Name || "this platform"
                        }),
                        Variant: "default",
                        Size: "lg",
                        FullWidth: true,
                        Icon: "Download"
                      },
                      OnAction: () => HandleDownload(Platform)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
                      lineNumber: 314,
                      columnNumber: 11
                    },
                    undefined
                  ) }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
                    lineNumber: 313,
                    columnNumber: 10
                  }, undefined)
                },
                Body: {
                  content: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2 font-mono text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: VersionLabel }, void 0, false, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
                        lineNumber: 339,
                        columnNumber: 12
                      }, undefined),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium text-foreground", children: FormatVersion(
                        Platform.Version
                      ) }, void 0, false, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
                        lineNumber: 340,
                        columnNumber: 12
                      }, undefined)
                    ] }, void 0, true, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
                      lineNumber: 338,
                      columnNumber: 11
                    }, undefined),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: SizeLabel }, void 0, false, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
                        lineNumber: 347,
                        columnNumber: 12
                      }, undefined),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium text-foreground", children: FormatFileSize(Platform.Size) }, void 0, false, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
                        lineNumber: 348,
                        columnNumber: 12
                      }, undefined)
                    ] }, void 0, true, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
                      lineNumber: 346,
                      columnNumber: 11
                    }, undefined),
                    Platform.Requirements && Platform.Requirements.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-2 border-t border-border pt-2", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-1 font-medium text-foreground", children: RequirementsLabel }, void 0, false, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
                        lineNumber: 356,
                        columnNumber: 14
                      }, undefined),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "list-inside list-disc space-y-1", children: Platform.Requirements.map(
                        (Requirement, RequirementIndex) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          "li",
                          {
                            className: "",
                            children: Requirement
                          },
                          RequirementIndex,
                          false,
                          {
                            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
                            lineNumber: 365,
                            columnNumber: 17
                          },
                          undefined
                        )
                      ) }, void 0, false, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
                        lineNumber: 359,
                        columnNumber: 14
                      }, undefined)
                    ] }, void 0, true, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
                      lineNumber: 355,
                      columnNumber: 13
                    }, undefined)
                  ] }, void 0, true, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
                    lineNumber: 337,
                    columnNumber: 10
                  }, undefined)
                },
                ...HasVerification ? {
                  Footer: {
                    content: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-mono text-xs text-muted-foreground", children: [
                      Platform.Checksum && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: [
                        "SHA-256:",
                        " ",
                        Platform.Checksum.substring(
                          0,
                          16
                        ),
                        "..."
                      ] }, void 0, true, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
                        lineNumber: 388,
                        columnNumber: 15
                      }, undefined),
                      Platform.Signature && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: "Signature: available" }, void 0, false, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
                        lineNumber: 398,
                        columnNumber: 15
                      }, undefined)
                    ] }, void 0, true, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
                      lineNumber: 386,
                      columnNumber: 13
                    }, undefined)
                  }
                } : {}
              };
              const PlatformAccentColor = PlatformColorMap[Platform.Name] ?? "var(--PlatformDesktop)";
              return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "div",
                {
                  style: {
                    borderTopColor: PlatformAccentColor,
                    borderTopWidth: "2px",
                    borderTopStyle: "solid"
                  },
                  children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    DynamicCard,
                    {
                      Sections: PlatformCardSection,
                      ClassName: "PlatformCard flex flex-col"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
                      lineNumber: 421,
                      columnNumber: 9
                    },
                    undefined
                  )
                },
                Platform.Id,
                false,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
                  lineNumber: 414,
                  columnNumber: 8
                },
                undefined
              );
            })
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
            lineNumber: 300,
            columnNumber: 5
          },
          undefined
        )
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
        lineNumber: 278,
        columnNumber: 4
      }, undefined)
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPlatformGrid.tsx",
      lineNumber: 274,
      columnNumber: 3
    },
    undefined
  );
};

const ElementColorMap = {
  Mountain: "var(--ExtensionRust)",
  Cocoon: "var(--ExtensionEffectTypeScript)",
  Wind: "var(--LanguageTypeScript)",
  Sky: "var(--ExtensionAstro)",
  Air: "var(--ExtensionTauri)",
  Echo: "var(--SpineTCP)",
  Common: "var(--LanguageRust)",
  Vine: "var(--SpinegRPC)",
  Grove: "var(--SpineWASM)",
  Mist: "var(--SpineIPC)",
  Rest: "var(--ToolOxc)",
  Output: "var(--ToolEsBuild)",
  SideCar: "var(--RuntimeNode)",
  Worker: "var(--LanguageJavaScript)",
  Maintain: "var(--ToolBiome)"
};
const GetElementColor = (Line) => {
  const Name = Line.split(/[\s\u2001]/)[0];
  return ElementColorMap[Name] ?? "var(--Primary)";
};
const DynamicPricing = ({ Content, ClassName }) => {
  const { t: T } = useTranslation("home");
  const GridReference = reactExports.useRef(null);
  const {
    Title,
    Subtitle,
    Tiers,
    ShowMonthlyYearlyToggle = false,
    DefaultYearly = false,
    Labels = {}
  } = Content;
  const PopularLabel = Labels.Popular ?? T("pricing.labels.popular", { defaultValue: "Most Popular" });
  const [IsYearly, SetIsYearly] = reactExports.useState(DefaultYearly);
  reactExports.useEffect(() => {
    const Grid = GridReference.current;
    if (!Grid) return;
    const ReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (ReducedMotion) return;
    const ApplyScatter = async () => {
      const AttentionModule = await __vitePreload(() => import('./Attention.CDPaQ1i1.js'),true              ?__vite__mapDeps([0,1]):void 0);
      const Attention = await AttentionModule.default;
      const Cards = Grid.querySelectorAll(".PricingCard");
      Cards.forEach((Card, Index) => {
        Attention.ApplyToElement(Card, Index, 4, 3);
      });
    };
    ApplyScatter();
  }, [Tiers]);
  const DisplayTier = Tiers.map((Tier) => ({
    ...Tier,
    currentPrice: IsYearly ? Tier.Price.Yearly : Tier.Price.Monthly
  }));
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "section",
    {
      id: "pricing",
      "aria-labelledby": "PricingHeading",
      className: `w-full py-16 sm:py-20 ${ClassName || ""}`,
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-4", children: [
        (Title || Subtitle) && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto mb-10 max-w-2xl text-center", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--MuteForeground)]", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[var(--SpinegRPCFore)]", children: "//" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
              lineNumber: 97,
              columnNumber: 8
            }, undefined),
            " ",
            "Roadmap"
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
            lineNumber: 96,
            columnNumber: 7
          }, undefined),
          Title && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "h2",
            {
              id: "PricingHeading",
              className: "font-serif text-4xl font-normal tracking-tight sm:text-5xl",
              children: Title
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
              lineNumber: 103,
              columnNumber: 8
            },
            undefined
          ),
          Subtitle && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-3 text-[var(--MuteForeground)]", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RichText, { Text: Subtitle }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
            lineNumber: 111,
            columnNumber: 9
          }, undefined) }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
            lineNumber: 110,
            columnNumber: 8
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
          lineNumber: 95,
          columnNumber: 6
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            ref: GridReference,
            className: "mx-auto grid max-w-4xl grid-cols-1 gap-12 md:grid-cols-2",
            children: DisplayTier.map((Tier) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "div",
              {
                className: `PricingCard StaccatoCard flex flex-col rounded-none bg-card ${Tier.Highlighted || Tier.Popular ? "" : ""} ${Tier.Status && Tier.Status !== "Ready" ? "opacity-75" : ""}`,
                "aria-disabled": Tier.Status && Tier.Status !== "Ready" ? true : void 0,
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-b border-[var(--Border)] p-8", children: [
                    Tier.Popular && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "span",
                      {
                        className: "StaccatoBadge inline-flex items-center border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest",
                        style: {
                          borderColor: "var(--SpinegRPC)",
                          color: "var(--SpinegRPCFore)",
                          backgroundColor: "var(--SpinegRPCMute)"
                        },
                        children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                            "span",
                            {
                              className: "StaccatoRhythmDot mr-1.5 h-1.5 w-1.5 rounded-none",
                              style: {
                                backgroundColor: "var(--SpinegRPC)"
                              },
                              "aria-hidden": "true"
                            },
                            void 0,
                            false,
                            {
                              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                              lineNumber: 147,
                              columnNumber: 12
                            },
                            undefined
                          ),
                          PopularLabel
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                        lineNumber: 139,
                        columnNumber: 11
                      },
                      undefined
                    ) }, void 0, false, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                      lineNumber: 138,
                      columnNumber: 10
                    }, undefined),
                    Tier.Status && Tier.Status !== "Ready" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "StaccatoBadge bg-[var(--Mute)] px-2 py-0.5 font-semibold uppercase tracking-wider text-muted-foreground", children: Tier.Status === "WIP" ? "WIP" : "Coming Soon" }, void 0, false, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                      lineNumber: 161,
                      columnNumber: 11
                    }, undefined) }, void 0, false, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                      lineNumber: 160,
                      columnNumber: 10
                    }, undefined),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      DynamicButton,
                      {
                        Content: {
                          ...Tier.CTA,
                          FullWidth: true
                        }
                      },
                      void 0,
                      false,
                      {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                        lineNumber: 169,
                        columnNumber: 10
                      },
                      undefined
                    ) }, void 0, false, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                      lineNumber: 168,
                      columnNumber: 9
                    }, undefined),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "mb-2 text-2xl font-bold", children: Tier.Name }, void 0, false, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                      lineNumber: 176,
                      columnNumber: 9
                    }, undefined),
                    Tier.Description && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "StaccatoBreath text-muted-foreground", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RichText, { Text: Tier.Description }, void 0, false, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                      lineNumber: 181,
                      columnNumber: 11
                    }, undefined) }, void 0, false, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                      lineNumber: 180,
                      columnNumber: 10
                    }, undefined)
                  ] }, void 0, true, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                    lineNumber: 136,
                    columnNumber: 8
                  }, undefined),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-1 flex-col p-8", children: [
                    Tier.Elements && Tier.Elements.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Elements" }, void 0, false, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                        lineNumber: 191,
                        columnNumber: 11
                      }, undefined),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "space-y-3", children: Tier.Elements.map(
                        (Element, Index) => {
                          const Parts = Element.split("\n");
                          const NameLine = Parts[0] ?? "";
                          const Sub1 = Parts[1];
                          const Sub2 = Parts[2];
                          const AccentColor = GetElementColor(
                            NameLine
                          );
                          return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                            "li",
                            {
                              className: `flex flex-col gap-0.5 ${Tier.Status && Tier.Status !== "Ready" ? "opacity-70" : ""}`,
                              children: [
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                                  "span",
                                  {
                                    className: "font-mono text-sm font-semibold",
                                    style: {
                                      color: AccentColor
                                    },
                                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                                      RichText,
                                      {
                                        Text: NameLine,
                                        Terms: true
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                                        lineNumber: 222,
                                        columnNumber: 17
                                      },
                                      undefined
                                    )
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                                    lineNumber: 217,
                                    columnNumber: 16
                                  },
                                  undefined
                                ),
                                Sub1 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-mono text-xs text-foreground", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                                  RichText,
                                  {
                                    Text: Sub1,
                                    Terms: true
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                                    lineNumber: 231,
                                    columnNumber: 18
                                  },
                                  undefined
                                ) }, void 0, false, {
                                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                                  lineNumber: 230,
                                  columnNumber: 17
                                }, undefined),
                                Sub2 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-mono text-xs text-muted-foreground", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                                  RichText,
                                  {
                                    Text: Sub2,
                                    Terms: true
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                                    lineNumber: 243,
                                    columnNumber: 18
                                  },
                                  undefined
                                ) }, void 0, false, {
                                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                                  lineNumber: 242,
                                  columnNumber: 17
                                }, undefined)
                              ]
                            },
                            Index,
                            true,
                            {
                              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                              lineNumber: 208,
                              columnNumber: 15
                            },
                            undefined
                          );
                        }
                      ) }, void 0, false, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                        lineNumber: 194,
                        columnNumber: 11
                      }, undefined),
                      Tier.Features.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("hr", { className: "my-5 border-[var(--Border)]" }, void 0, false, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                        lineNumber: 259,
                        columnNumber: 12
                      }, undefined)
                    ] }, void 0, true, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                      lineNumber: 190,
                      columnNumber: 10
                    }, undefined),
                    Tier.Features.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                      Tier.Elements && Tier.Elements.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Roadmap" }, void 0, false, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                        lineNumber: 269,
                        columnNumber: 13
                      }, undefined),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "space-y-3", children: Tier.Features.map(
                        (Feature, FeatureIndex) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          "li",
                          {
                            className: `flex items-start justify-between gap-2 ${Tier.Status && Tier.Status !== "Ready" ? "opacity-70" : ""}`,
                            children: [
                              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                                RichText,
                                {
                                  Text: Feature,
                                  Terms: true
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                                  lineNumber: 286,
                                  columnNumber: 16
                                },
                                undefined
                              ) }, void 0, false, {
                                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                                lineNumber: 285,
                                columnNumber: 15
                              }, undefined),
                              Tier.Status && Tier.Status !== "Ready" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "StaccatoBadge shrink-0 bg-[var(--Mute)] px-2 py-0.5 font-medium text-muted-foreground", children: Tier.Status === "WIP" ? "WIP" : "Coming Soon" }, void 0, false, {
                                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                                lineNumber: 294,
                                columnNumber: 16
                              }, undefined) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                                IconTooltip,
                                {
                                  Label: "Included",
                                  Icon: Check,
                                  SizeClass: "h-4 w-4 shrink-0",
                                  ClassName: "StaccatoCheckmark mt-0.5 text-primary"
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                                  lineNumber: 301,
                                  columnNumber: 16
                                },
                                undefined
                              )
                            ]
                          },
                          FeatureIndex,
                          true,
                          {
                            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                            lineNumber: 276,
                            columnNumber: 14
                          },
                          undefined
                        )
                      ) }, void 0, false, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                        lineNumber: 273,
                        columnNumber: 11
                      }, undefined)
                    ] }, void 0, true, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                      lineNumber: 266,
                      columnNumber: 10
                    }, undefined)
                  ] }, void 0, true, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                    lineNumber: 187,
                    columnNumber: 8
                  }, undefined)
                ]
              },
              Tier.Id,
              true,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
                lineNumber: 121,
                columnNumber: 7
              },
              undefined
            ))
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
            lineNumber: 117,
            columnNumber: 5
          },
          undefined
        )
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
        lineNumber: 93,
        columnNumber: 4
      }, undefined)
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPricing.tsx",
      lineNumber: 89,
      columnNumber: 3
    },
    undefined
  );
};

const ElementGlyph = ({ Name }) => {
  const Key = (Name ?? "").toLowerCase();
  const Map = {
    mountain: Mountain,
    cocoon: Box,
    wind: Wind,
    sky: Cloud,
    air: Wind,
    echo: Radio,
    grove: Trees,
    vine: Sprout,
    rest: Umbrella,
    worker: HardHat,
    common: Boxes,
    maintain: Wrench,
    mist: CloudFog,
    output: FileOutput,
    sidecar: Container
  };
  const Icon = Map[Key] ?? Square;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Icon,
    {
      "aria-hidden": "true",
      strokeWidth: 1.5,
      className: "ml-2 inline h-4 w-4 align-[-3px] text-[var(--MuteForeground)]"
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
      lineNumber: 33,
      columnNumber: 3
    },
    undefined
  );
};
const TestimonialColorMap = {
  Mountain: "var(--ExtensionRust)",
  Cocoon: "var(--ExtensionEffectTypeScript)",
  Wind: "var(--LanguageTypeScript)",
  Sky: "var(--ExtensionAstro)",
  Air: "var(--ExtensionTauri)",
  Echo: "var(--SpineTCP)",
  Common: "var(--LanguageRust)",
  Vine: "var(--SpinegRPC)",
  Grove: "var(--SpineWASM)",
  Mist: "var(--SpineIPC)",
  Rest: "var(--ToolOxc)",
  Output: "var(--ToolEsBuild)",
  SideCar: "var(--RuntimeNode)",
  Worker: "var(--LanguageJavaScript)",
  Maintain: "var(--ToolBiome)"
};
const Halton = (Index) => {
  let F = 1;
  let R = 0;
  let I = Index;
  while (I > 0) {
    F /= 2;
    R += F * (I % 2);
    I = Math.floor(I / 2);
  }
  return R;
};
const GetRowRatio = (RowIndex) => {
  const Noise = Halton(RowIndex + 1);
  const BucketIndex = Math.min(Math.floor(Noise * 5), 4);
  const BUCKETS = [
    [6, 6],
    [7, 5],
    [5, 7],
    [8, 4],
    [4, 8]
  ];
  return BUCKETS[BucketIndex];
};
const DynamicTestimonials = ({ Content, ClassName }) => {
  const { Title, Subtitle, Testimonials, Columns = 3 } = Content;
  const GridReference = reactExports.useRef(null);
  const IsMasonry = Columns === "masonry";
  const ColumnClass = {
    1: "grid-cols-1 max-w-3xl",
    2: "grid-cols-1 md:grid-cols-2 max-w-5xl",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl",
    5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-7xl",
    6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 max-w-7xl"
  };
  reactExports.useEffect(() => {
    const Grid = GridReference.current;
    if (!Grid) return;
    const ReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (ReducedMotion) return;
    const ApplyScatter = async () => {
      const AttentionModule = await __vitePreload(() => import('./Attention.CDPaQ1i1.js'),true              ?__vite__mapDeps([0,1]):void 0);
      const Attention = await AttentionModule.default;
      const Cards = Grid.querySelectorAll(".TestimonialCard");
      Cards.forEach((Card, Index) => {
        Attention.ApplyToElement(Card, Index, 5, 3);
      });
      const StaccatoModule = await __vitePreload(() => import('./Staccato.C01-Mbs-.js'),true              ?__vite__mapDeps([2,1]):void 0);
      const Engine = await StaccatoModule.default;
      Engine.SeedSelector(".TestimonialCard");
    };
    ApplyScatter();
  }, [Testimonials]);
  if (IsMasonry) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "section",
      {
        id: "testimonials",
        "aria-label": "Architecture",
        className: `w-full py-16 sm:py-20 ${ClassName || ""}`,
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-4", children: [
          (Title || Subtitle) && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto mb-10 max-w-2xl text-center", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--MuteForeground)]", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[var(--SpinegRPCFore)]", children: "//" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                lineNumber: 197,
                columnNumber: 9
              }, undefined),
              " ",
              "Architecture"
            ] }, void 0, true, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
              lineNumber: 196,
              columnNumber: 8
            }, undefined),
            Title && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "font-serif text-4xl font-normal tracking-tight sm:text-5xl", children: Title }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
              lineNumber: 203,
              columnNumber: 9
            }, undefined),
            Subtitle && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-3 text-[var(--MuteForeground)]", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RichText, { Text: Subtitle }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
              lineNumber: 209,
              columnNumber: 10
            }, undefined) }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
              lineNumber: 208,
              columnNumber: 9
            }, undefined)
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
            lineNumber: 195,
            columnNumber: 7
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "div",
            {
              ref: GridReference,
              className: "mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12",
              children: Testimonials.map((Testimonial, Index) => {
                const Row = Math.floor(Index / 2);
                const IsLeft = Index % 2 === 0;
                const IsLastOdd = Index === Testimonials.length - 1 && Testimonials.length % 2 === 1;
                const [ColA, ColB] = GetRowRatio(Row);
                const ColSpan = IsLastOdd ? 12 : IsLeft ? ColA : ColB;
                const AccentColor = TestimonialColorMap[Testimonial.Id] ?? "var(--Primary)";
                return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "article",
                  {
                    className: "MasonryCard TestimonialCard StaccatoCard flex flex-col gap-3 rounded-none bg-card p-5",
                    style: {
                      borderLeftColor: AccentColor,
                      borderLeftWidth: "2px",
                      "--masonry-col": ColSpan
                    },
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between gap-2", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                            "span",
                            {
                              className: "font-mono text-sm font-bold",
                              style: { color: AccentColor },
                              children: Testimonial.Href ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                                "a",
                                {
                                  href: Testimonial.Href,
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                  className: "hover:underline",
                                  children: Testimonial.Author
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                                  lineNumber: 254,
                                  columnNumber: 14
                                },
                                undefined
                              ) : Testimonial.Author
                            },
                            void 0,
                            false,
                            {
                              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                              lineNumber: 250,
                              columnNumber: 12
                            },
                            undefined
                          ),
                          Testimonial.Author && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                            ElementGlyph,
                            {
                              Name: Testimonial.Author
                            },
                            void 0,
                            false,
                            {
                              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                              lineNumber: 266,
                              columnNumber: 13
                            },
                            undefined
                          )
                        ] }, void 0, true, {
                          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                          lineNumber: 249,
                          columnNumber: 11
                        }, undefined),
                        Testimonial.Href && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          ExternalLink,
                          {
                            className: "text-muted-foreground/40 h-3 w-3 shrink-0",
                            "aria-hidden": "true"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                            lineNumber: 272,
                            columnNumber: 12
                          },
                          undefined
                        )
                      ] }, void 0, true, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                        lineNumber: 248,
                        columnNumber: 10
                      }, undefined),
                      Testimonial.Role && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-1", children: Testimonial.Role.split(" - ").map(
                        (Tag, TagIndex) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          "span",
                          {
                            className: "bg-[var(--Mute)] px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground",
                            children: Tag
                          },
                          TagIndex,
                          false,
                          {
                            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                            lineNumber: 284,
                            columnNumber: 14
                          },
                          undefined
                        )
                      ) }, void 0, false, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                        lineNumber: 281,
                        columnNumber: 11
                      }, undefined),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm leading-relaxed text-muted-foreground", children: Testimonial.Quote.split("\n")[0] }, void 0, false, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                        lineNumber: 295,
                        columnNumber: 10
                      }, undefined)
                    ]
                  },
                  Testimonial.Id,
                  true,
                  {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                    lineNumber: 237,
                    columnNumber: 9
                  },
                  undefined
                );
              })
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
              lineNumber: 215,
              columnNumber: 6
            },
            undefined
          )
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
          lineNumber: 193,
          columnNumber: 5
        }, undefined)
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
        lineNumber: 189,
        columnNumber: 4
      },
      undefined
    );
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "section",
    {
      id: "testimonials",
      "aria-label": "Architecture",
      className: `w-full py-16 sm:py-20 ${ClassName || ""}`,
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-4", children: [
        (Title || Subtitle) && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto mb-10 max-w-2xl text-center", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--MuteForeground)]", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[var(--SpinegRPCFore)]", children: "//" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
              lineNumber: 316,
              columnNumber: 8
            }, undefined),
            " ",
            "Architecture"
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
            lineNumber: 315,
            columnNumber: 7
          }, undefined),
          Title && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "font-serif text-4xl font-normal tracking-tight sm:text-5xl", children: Title }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
            lineNumber: 322,
            columnNumber: 8
          }, undefined),
          Subtitle && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-3 text-[var(--MuteForeground)]", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RichText, { Text: Subtitle }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
            lineNumber: 328,
            columnNumber: 9
          }, undefined) }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
            lineNumber: 327,
            columnNumber: 8
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
          lineNumber: 314,
          columnNumber: 6
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            ref: GridReference,
            className: `StaccatoMorphGap grid ${ColumnClass[Columns] ?? ColumnClass[3]} mx-auto gap-12`,
            children: Testimonials.map((Testimonial) => {
              const AccentColor = TestimonialColorMap[Testimonial.Id] ?? "var(--Primary)";
              return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "article",
                {
                  className: "TestimonialCard StaccatoCard flex flex-col gap-3 rounded-none bg-card p-5",
                  style: {
                    borderLeftColor: AccentColor,
                    borderLeftWidth: "2px"
                  },
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between gap-2", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          "span",
                          {
                            className: "font-mono text-sm font-bold",
                            style: { color: AccentColor },
                            children: Testimonial.Href ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                              "a",
                              {
                                href: Testimonial.Href,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "hover:underline",
                                children: Testimonial.Author
                              },
                              void 0,
                              false,
                              {
                                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                                lineNumber: 355,
                                columnNumber: 13
                              },
                              undefined
                            ) : Testimonial.Author
                          },
                          void 0,
                          false,
                          {
                            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                            lineNumber: 351,
                            columnNumber: 11
                          },
                          undefined
                        ),
                        Testimonial.Author && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          ElementGlyph,
                          {
                            Name: Testimonial.Author
                          },
                          void 0,
                          false,
                          {
                            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                            lineNumber: 367,
                            columnNumber: 12
                          },
                          undefined
                        )
                      ] }, void 0, true, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                        lineNumber: 350,
                        columnNumber: 10
                      }, undefined),
                      Testimonial.Href && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                        ExternalLink,
                        {
                          className: "text-muted-foreground/40 h-3 w-3 shrink-0",
                          "aria-hidden": "true"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                          lineNumber: 373,
                          columnNumber: 11
                        },
                        undefined
                      )
                    ] }, void 0, true, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                      lineNumber: 349,
                      columnNumber: 9
                    }, undefined),
                    Testimonial.Role && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-1", children: Testimonial.Role.split(" - ").map(
                      (Tag, TagIndex) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                        "span",
                        {
                          className: "bg-[var(--Mute)] px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground",
                          children: Tag
                        },
                        TagIndex,
                        false,
                        {
                          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                          lineNumber: 383,
                          columnNumber: 13
                        },
                        undefined
                      )
                    ) }, void 0, false, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                      lineNumber: 380,
                      columnNumber: 10
                    }, undefined),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm leading-relaxed text-muted-foreground", children: Testimonial.Quote.split("\n")[0] }, void 0, false, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                      lineNumber: 392,
                      columnNumber: 9
                    }, undefined)
                  ]
                },
                Testimonial.Id,
                true,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
                  lineNumber: 342,
                  columnNumber: 8
                },
                undefined
              );
            })
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
            lineNumber: 334,
            columnNumber: 5
          },
          undefined
        )
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
        lineNumber: 312,
        columnNumber: 4
      }, undefined)
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTestimonials.tsx",
      lineNumber: 308,
      columnNumber: 3
    },
    undefined
  );
};

const HomePage = ({ Content, ClassName }) => {
  const { t: T } = useTranslation(["home", "common", "download", "footer"]);
  const TArr = (Key, Fallback) => T(Key, {
    returnObjects: true,
    defaultValue: Fallback
  });
  const ResolvedContent = Content || {
    Hero: {
      Badge: {
        Text: T("home:hero.badge", {
          defaultValue: "No Electron No Chromium CC0"
        }),
        Variant: "secondary"
      },
      Title: T("home:hero.title", {
        defaultValue: ""
      }),
      TitleHighlight: T("home:hero.titleHighlight", {
        defaultValue: "Land"
      }),
      Subtitle: T("home:hero.subtitle", {
        defaultValue: "A native code editor with the soul of VS Code — and none of the browser. Built on Rust and Tauri, compatible with the extensions you already use."
      }),
      PrimaryCta: {
        Text: T("common:button.download", {
          defaultValue: "Download Land Free"
        }),
        Variant: "default",
        Size: "lg",
        Icon: "Download",
        Href: "/Download"
      },
      SecondaryCta: {
        Text: T("common:button.learnMore", {
          defaultValue: "See What Makes Land Different"
        }),
        Variant: "ghost",
        Size: "lg",
        Icon: "ExternalLink",
        Href: "https://github.com/CodeEditorLand/Land#readme"
      },
      FloatingCards: [
        {
          Id: "1",
          Title: T("home:hero.scene.cards.1.title", {
            defaultValue: "Rust Core"
          }),
          Tooltip: TArr("home:hero.scene.cards.1.tooltip", [
            "Mountain implements Common traits in Rust via Tauri.",
            "Handles windows, files, terminals, process control, and gRPC IPC through the Vine protocol.",
            "The ActionEffect system treats every operation as declarative data dispatched across layers."
          ]),
          Colors: ["var(--ExtensionRust)", "var(--Mute)"]
        },
        {
          Id: "2",
          Title: T("home:hero.scene.cards.2.title", {
            defaultValue: "Tauri UI"
          }),
          Tooltip: TArr("home:hero.scene.cards.2.tooltip", [
            "Sky renders the editor interface in the OS WebView via Astro and routes Tauri events through SkyBridge to VS Code workbench APIs.",
            "Multiple workbench layouts adapt the UI layer to different runtimes: browser proxy, Mountain-native, or Electron."
          ]),
          Colors: [
            "var(--ExtensionTauri)",
            "var(--Primary)",
            "var(--Secondary)",
            "var(--Mute)"
          ]
        },
        {
          Id: "3",
          Title: T("home:hero.scene.cards.3.title", {
            defaultValue: "Effect-TS Services"
          }),
          Tooltip: TArr("home:hero.scene.cards.3.tooltip", [
            "Cocoon and Wind use Effect-TS for typed errors, scoped resources, cancellation, and supervised concurrency.",
            "Wind composes workbench services into Layer stacks that make dependency paths traceable at compile time - one stack per runtime target."
          ]),
          Colors: [
            "var(--ExtensionEffectTypeScript)",
            "var(--ExtensionEffectTypeScriptFore)",
            "var(--ExtensionEffectTypeScriptMute)"
          ]
        },
        {
          Id: "4",
          Title: T("home:hero.scene.cards.4.title", {
            defaultValue: "gRPC IPC"
          }),
          Tooltip: TArr("home:hero.scene.cards.4.tooltip", [
            "Vine defines the gRPC protocol layer between Mountain, Cocoon, Air, and Grove.",
            "Proto definitions currently live in Mountain and Cocoon while Vine consolidates.",
            "Every gRPC call is a typed contract - the wire format is the interface."
          ]),
          Colors: ["var(--SpinegRPC)", "var(--SpineIPC)"]
        },
        {
          Id: "5",
          Title: T("home:hero.scene.cards.5.title", {
            defaultValue: "Extension Host"
          }),
          Tooltip: TArr("home:hero.scene.cards.5.tooltip", [
            "Cocoon runs VS Code extensions via dual-track architecture:",
            "Track A loads unmodified extHost sources for maximum compatibility,",
            "Track B routes I/O-heavy operations to Mountain through gRPC.",
            "Effect-TS services implement the vscode API shim across both tracks."
          ]),
          Colors: ["var(--TierProvider)"]
        },
        {
          Id: "6",
          Title: T("home:hero.scene.cards.6.title", {
            defaultValue: "Cross-Platform"
          }),
          Tooltip: TArr("home:hero.scene.cards.6.tooltip", [
            "Tauri bundles to native macOS, Windows, and Linux packages using the OS WebView - no embedded Chromium.",
            "Per-platform build configuration and binary management keep cross-compilation paths explicit rather than hidden in installer scripts."
          ]),
          Colors: [
            "var(--OSMacOS)",
            "var(--OSWindows)",
            "var(--OSLinux)"
          ]
        },
        {
          Id: "7",
          Title: T("home:hero.scene.cards.7.title", {
            defaultValue: "VS Code API"
          }),
          Tooltip: TArr("home:hero.scene.cards.7.tooltip", [
            "Cocoon implements the VS Code API surface through Effect-TS services: commands, workspace, terminals, webviews, language providers, and diagnostics.",
            "The dual-track architecture preserves compatibility with published extension APIs while routing through native services."
          ]),
          Colors: ["var(--SpineIPC)"]
        },
        {
          Id: "8",
          Title: T("home:hero.scene.cards.8.title", {
            defaultValue: "Open Source CC0"
          }),
          Tooltip: TArr("home:hero.scene.cards.8.tooltip", [
            "All 15 element repos are under CC0 1.0 Universal public domain.",
            "No attribution required, no compliance restrictions.",
            "Funded by NLnet NGI0 Commons Fund."
          ]),
          Colors: ["var(--SpinegRPC)", "var(--ExtensionTauri)"]
        }
      ],
      ShowConnectingLines: true,
      ShowParticles: true,
      RespectReducedMotion: true
    },
    Features: {
      Title: T("home:features.title", {
        defaultValue: "VS Code. Without Electron."
      }),
      Subtitle: T("home:features.subtitle", {
        defaultValue: "Native speed. VS Code compatibility. No Chromium, no compromises."
      }),
      Features: [
        {
          Id: "performance",
          Icon: "Zap",
          Icons: ["/Image/Rust.svg", "/Image/Tauri.svg", "Zap"],
          Title: T("home:features.item.designTokens.title", {
            defaultValue: "Native services where they count."
          }),
          Description: T(
            "home:features.item.designTokens.description",
            {
              defaultValue: "Heavy editor work runs natively — not trapped in a web view. Window management, file I/O, and terminal IPC go straight through a Rust + Tauri services layer."
            }
          )
        },
        {
          Id: "compatibility",
          Icon: "Box",
          Icons: ["/Image/EffectTS.svg", "Box", "Puzzle"],
          Title: T("home:features.item.componentLibrary.title", {
            defaultValue: "Unmodified extensions, no fork path."
          }),
          Description: T(
            "home:features.item.componentLibrary.description",
            {
              defaultValue: "Your VS Code extensions run unmodified — no forks, no rewrites. A compatibility host speaks the VS Code extension API directly."
            }
          )
        },
        {
          Id: "architecture",
          Icon: "Cpu",
          Icons: [
            "/Image/EffectTS.svg",
            "/Image/TypeScript.svg",
            "Layers"
          ],
          Title: T("home:features.item.documentation.title", {
            defaultValue: "Fibers, not Promises."
          }),
          Description: T(
            "home:features.item.documentation.description",
            {
              defaultValue: "Failures are typed, traceable, and cancellable — so the editor fails loudly in development instead of silently in production."
            }
          )
        },
        {
          Id: "cross-platform",
          Icon: "Globe",
          Icons: ["/Image/Tauri.svg", "Globe", "Package"],
          Title: T("home:features.item.versionControl.title", {
            defaultValue: "One source tree, configured targets."
          }),
          Description: T(
            "home:features.item.versionControl.description",
            {
              defaultValue: "Tauri uses the OS WebView on each platform — no bundled Chromium. One codebase compiles to native macOS, Windows, and Linux packages."
            }
          )
        },
        {
          Id: "tooling",
          Icon: "Wrench",
          Icons: [
            "/Image/Rust.svg",
            "/Image/Biome.svg",
            "/Image/EffectTS.svg"
          ],
          Title: T("home:features.item.cicdIntegration.title", {
            defaultValue: "Background daemon, always running."
          }),
          Description: T(
            "home:features.item.cicdIntegration.description",
            {
              defaultValue: "Updates, indexing, signing, and health checks run in a persistent daemon — survives when the main window closes."
            }
          )
        },
        {
          Id: "opensource",
          Icon: "Heart",
          Icons: ["/Image/CC0.svg", "/Image/NLnet.svg", "Heart"],
          Title: T("home:features.item.collaboration.title", {
            defaultValue: "CC0. No restrictions."
          }),
          Description: T(
            "home:features.item.collaboration.description",
            {
              defaultValue: "Fork it, ship it, build commercial products on top of it. The entire codebase is CC0 public domain — no attribution required, no compliance headaches."
            }
          )
        }
      ],
      Columns: 3,
      Gap: "lg"
    },
    Pricing: {
      Title: T("home:roadmap.title", {
        defaultValue: "The Architecture Is Built. Here Is What Comes Next."
      }),
      Subtitle: T("home:roadmap.subtitle", {
        defaultValue: "Funded by NLnet NGI0 Commons Fund.\n\nEach milestone is labelled by what it represents: active source, integration work in progress, or release preparation."
      }),
      Tiers: [
        {
          Id: "free",
          Name: T("home:roadmap.tiers.current.name", {
            defaultValue: "Active Now"
          }),
          Description: T("home:roadmap.tiers.current.description", {
            defaultValue: "The fifteen element directories are present in the Land workspace. The active desktop path is Mountain, Cocoon, Sky, Wind, Vine, Common, Echo, Air, Mist, Rest, Output, SideCar, and Maintain. Grove and Worker are present with integration scope that differs by build profile."
          }),
          Price: { Monthly: 0, Yearly: 0 },
          Elements: [
            T("home:roadmap.tiers.current.elements.mountain", {
              defaultValue: "Mountain\nNative Backend\nReplaces Electron main process, no bundled Chromium"
            }),
            T("home:roadmap.tiers.current.elements.cocoon", {
              defaultValue: "Cocoon\nExtension Host\nUnmodified VS Code extensions through Effect-TS routes"
            }),
            T("home:roadmap.tiers.current.elements.wind", {
              defaultValue: "Wind\nWorkbench Shell\nEffect-TS layers for native workbench services"
            }),
            T("home:roadmap.tiers.current.elements.sky", {
              defaultValue: "Sky\nAstro UI Layer\nWorkbench routes and WebView bridge"
            }),
            T("home:roadmap.tiers.current.elements.air", {
              defaultValue: "Air\nBackground Services\nUpdates, downloads, auth, indexing, and health"
            }),
            T("home:roadmap.tiers.current.elements.echo", {
              defaultValue: "Echo\nScheduler Primitives\nBounded background work for Rust services"
            })
          ],
          Features: [
            T("home:roadmap.tiers.current.features.1", {
              defaultValue: "Installed extensions run unmodified through Cocoon"
            }),
            T("home:roadmap.tiers.current.features.2", {
              defaultValue: "Tauri desktop path uses the operating system WebView"
            }),
            T("home:roadmap.tiers.current.features.3", {
              defaultValue: "Effect fibers for cancellable service work"
            }),
            T("home:roadmap.tiers.current.features.4", {
              defaultValue: "Telemetry features are compile-gated in Rust"
            }),
            T("home:roadmap.tiers.current.features.5", {
              defaultValue: "CC0 public domain no restrictions"
            }),
            T("home:roadmap.tiers.current.features.6", {
              defaultValue: "macOS, Windows, and Linux build targets in source"
            })
          ],
          CTA: {
            Text: T("home:roadmap.tiers.current.button", {
              defaultValue: "View on GitHub"
            }),
            Variant: "default",
            Href: "https://github.com/CodeEditorLand/Land"
          },
          Popular: true
        },
        {
          Id: "progress",
          Name: T("home:roadmap.tiers.future.name", {
            defaultValue: "v1.0"
          }),
          Status: "WIP",
          Description: T("home:roadmap.tiers.future.description", {
            defaultValue: "Active milestones across the element repositories - integration work, release preparation, and long-tail API coverage."
          }),
          Price: { Monthly: 0, Yearly: 0 },
          Elements: [
            T("home:roadmap.tiers.future.elements.vine", {
              defaultValue: "Vine\nProtocol In Progress\nMountain, Cocoon, Air, and Grove contracts"
            }),
            T("home:roadmap.tiers.future.elements.cocoon", {
              defaultValue: "Cocoon\nExtension Compatibility Pass\nLong-tail VS Code API coverage"
            }),
            T("home:roadmap.tiers.future.elements.grove", {
              defaultValue: "Grove\nWASM Host Stabilizing\nCapability-based extension isolation path"
            }),
            T("home:roadmap.tiers.future.elements.rest", {
              defaultValue: "Rest\nSource Map Support\nOXC transformer integration in progress"
            }),
            T("home:roadmap.tiers.future.elements.echo", {
              defaultValue: "Echo\nScheduler Optimization\nFaster steal, lower latency"
            }),
            T("home:roadmap.tiers.future.elements.air", {
              defaultValue: "Air\nRelease Delivery\nSigning and distribution path"
            })
          ],
          Features: [
            T("home:roadmap.tiers.future.features.1", {
              defaultValue: "Marketplace installation path under review"
            }),
            T("home:roadmap.tiers.future.features.2", {
              defaultValue: "Grove Wasmtime host integration"
            }),
            T("home:roadmap.tiers.future.features.3", {
              defaultValue: "Vine typed IPC coverage expanding"
            }),
            T("home:roadmap.tiers.future.features.4", {
              defaultValue: "Cross-platform public installers via Tauri"
            }),
            T("home:roadmap.tiers.future.features.5", {
              defaultValue: "Source map generation via OXC"
            }),
            T("home:roadmap.tiers.future.features.6", {
              defaultValue: "Download distribution and verification publishing"
            })
          ],
          CTA: {
            Text: T("home:roadmap.tiers.future.button", {
              defaultValue: "Track Progress"
            }),
            Variant: "outline",
            Href: "https://github.com/CodeEditorLand/Land/milestones"
          },
          Popular: false
        }
      ]
    },
    Testimonials: {
      Title: T("home:architecture.title", {
        defaultValue: "Under the Hood"
      }),
      Subtitle: T("home:architecture.subtitle", {
        defaultValue: "Each element replaces one piece of the Electron stack. All inspectable in source."
      }),
      Testimonials: [
        {
          Id: "Air",
          Emoji: "",
          Href: "https://github.com/CodeEditorLand/Air",
          Author: "Air",
          Role: T("home:architecture.air.subtitle", {
            defaultValue: "Background Services Downloader Workspace Indexer"
          }),
          Quote: T("home:architecture.air.description", {
            defaultValue: "Background daemon that runs independently — updates, indexing, signing, and health checks, all outside the main window.\n• Update downloads with staged atomic rollback\n• File indexing and symbol extraction\n• Cryptographic signing and authentication\n• Health monitoring with multi-level checks\n\nPrometheus-compatible metrics and distributed tracing with sampling."
          })
        },
        {
          Id: "Cocoon",
          Emoji: "",
          Href: "https://github.com/CodeEditorLand/Cocoon",
          Author: "Cocoon",
          Role: T("home:architecture.cocoon.subtitle", {
            defaultValue: "Extension Host Unmodified VS Code Extensions Effect-TS Services"
          }),
          Quote: T("home:architecture.cocoon.description", {
            defaultValue: "Node.js sidecar that hosts and executes VS Code extensions.\n\nDual-track architecture:\n• Track A loads unmodified extHost sources for maximum compatibility\n• Track B routes I/O-heavy operations to Mountain through gRPC\n\nEffect-TS provides typed errors, scoped resources, and supervised concurrency across all services.\n\nCodegen pipeline walks VS Code extHost source to emit type schemas.\n\nCore API surfaces:\n• Commands\n• Workspace\n• Window\n• Terminal\n• Webview\n• Language providers\n• Diagnostics"
          })
        },
        {
          Id: "Common",
          Emoji: "",
          Href: "https://github.com/CodeEditorLand/Common",
          Author: "Common",
          Role: T("home:architecture.common.subtitle", {
            defaultValue: "Shared Foundation Traits Cross-Element Types"
          }),
          Quote: T("home:architecture.common.description", {
            defaultValue: "Pure abstract library - defines the contracts that all Rust components implement, not the implementations themselves.\n\nAsync traits for every service domain:\n• FileSystem\n• Terminal\n• Clipboard\n• Window\n• Configuration\n• Storage\n• Search\n• and more\n\nThe ActionEffect system treats every operation as declarative data - commands, events, and queries share a single type hierarchy across all layers.\n\nTransport-agnostic: supports gRPC, IPC, and WASM strategies.\n\nDual-pipe telemetry (PostHog + OTLP)."
          })
        },
        {
          Id: "Echo",
          Emoji: "",
          Href: "https://github.com/CodeEditorLand/Echo",
          Author: "Echo",
          Role: T("home:architecture.echo.subtitle", {
            defaultValue: "Work-Stealing Scheduler crossbeam-deque Supervised Worker Pool"
          }),
          Quote: T("home:architecture.echo.description", {
            defaultValue: "Work-stealing task scheduler with lock-free queues for bounded background execution.\n\nPriority tiers:\n• High\n• Normal\n• Low\n\nEnsures UI responsiveness stays predictable under I/O load.\n\nWorkers consume from local queues and steal from peers when idle.\n\nIntegrates with the ActionEffect system for cancelable, supervised tasks.\n\nGraceful shutdown paths keep resources from leaking when services terminate."
          })
        },
        {
          Id: "Grove",
          Emoji: "",
          Href: "https://github.com/CodeEditorLand/Grove",
          Author: "Grove",
          Role: T("home:architecture.grove.subtitle", {
            defaultValue: "WASM Sandbox Wasmtime Runtime Capability-Based Isolation"
          }),
          Quote: T("home:architecture.grove.description", {
            defaultValue: "WebAssembly sandbox for running extensions in capability-isolated environments.\n\nWASMtime provides:\n• Memory limits\n• Resource controls\n• Fine-grained capability gates\n\nExtensions cannot access host APIs unless explicitly granted.\n\nMultiple transport strategies:\n• gRPC\n• IPC\n• Direct WASM host function calls\n\nShares the same VS Code API surface as Cocoon.\n\nComplements Cocoon's Node.js path with a sandboxed execution alternative."
          })
        },
        {
          Id: "Maintain",
          Emoji: "",
          Href: "https://github.com/CodeEditorLand/Maintain",
          Author: "Maintain",
          Role: T("home:architecture.maintain.subtitle", {
            defaultValue: "Build Orchestrator Configuration Release Profiles"
          }),
          Quote: T("home:architecture.maintain.description", {
            defaultValue: "Build system using an embedded Rhai scripting engine for flexible cross-element orchestration.\n\nManages build profiles across the Land ecosystem:\n• Development\n• Debug\n• Release\n\nType-safe editing of Cargo.toml and project configuration through scriptable resolvers.\n\nRelease pipeline preparation - signing, artifact publication, and distribution - is in progress."
          })
        },
        {
          Id: "Mist",
          Emoji: "",
          Href: "https://github.com/CodeEditorLand/Mist",
          Author: "Mist",
          Role: T("home:architecture.mist.subtitle", {
            defaultValue: "Local DNS Sandbox *.editor.land Resolution Network Boundary"
          }),
          Quote: T("home:architecture.mist.description", {
            defaultValue: "Local DNS server authoritative for the editor.land zone - all subdomains resolve to loopback, keeping internal services off the network.\n\nForward allowlisting controls which external domains sidecar processes can reach; everything else is blocked at the DNS layer.\n\nSecurity model:\n• ECDSA DNSSEC signing verifies zone integrity\n• Loopback binding only - no external port exposure\n\nProvides network isolation for Cocoon and Air processes so they cannot leak data to arbitrary hosts."
          })
        },
        {
          Id: "Mountain",
          Emoji: "⛰️",
          Href: "https://github.com/CodeEditorLand/Mountain",
          Author: "Mountain",
          Role: T("home:architecture.mountain.subtitle", {
            defaultValue: "Native Rust Backend Tauri Replaces Electron Main Process"
          }),
          Quote: T("home:architecture.mountain.description", {
            defaultValue: "Primary native backend and Tauri application shell - replaces the Electron main process entirely.\n\nImplements all service traits from Common through the declarative ActionEffect system:\n• Windows\n• Files\n• Terminals\n• Clipboard\n• Dialogs\n• Process control\n• OS keychain\n\nHosts the gRPC server for cross-process communication with Cocoon, Air, and Grove.\n\nOrchestrates sidecar lifecycle and manages application state across all connected processes."
          })
        },
        {
          Id: "Output",
          Emoji: "⚫",
          Href: "https://github.com/CodeEditorLand/Output",
          Author: "Output",
          Role: T("home:architecture.output.subtitle", {
            defaultValue: "Compilation Pipeline Plugin-Routed Deterministic Checksum"
          }),
          Quote: T("home:architecture.output.description", {
            defaultValue: "Build orchestration for VS Code platform source code.\n\nDual-compiler pipeline:\n• Primary ESBuild\n• Optional Rust-native compiler path for faster TypeScript compilation\n\nPlugin-routed transforms handle:\n• Module resolution remapping\n• Define substitution\n• CSS import interception\n• Dead code elimination\n\nEnvironment-variable-driven compiler selection.\n\nPlatform code markers separate platform-specific and cross-platform code at the source level.\n\nConsumed by Cocoon, Sky, and Wind as the shared compilation output."
          })
        },
        {
          Id: "Rest",
          Emoji: "⛱️",
          Href: "https://github.com/CodeEditorLand/Rest",
          Author: "Rest",
          Role: T("home:architecture.rest.subtitle", {
            defaultValue: "TypeScript Transform Pipeline OXC Rust-Native"
          }),
          Quote: T("home:architecture.rest.description", {
            defaultValue: "Rust-native TypeScript compilation pipeline built on the OXC toolchain - parser, transformer, and codegen in one process.\n\nHandles:\n• Decorator metadata emission\n• Legacy class field semantics\n• JSX\n• Parallel compilation\n\nSelectable as an alternative compiler to reduce reliance on Node-hosted compilation paths.\n\nSource map output and measured pipeline benchmarks are in active development."
          })
        },
        {
          Id: "SideCar",
          Emoji: "",
          Href: "https://github.com/CodeEditorLand/SideCar",
          Author: "SideCar",
          Role: T("home:architecture.sidecar.subtitle", {
            defaultValue: "Binary Distributor Compile-Time Target Triple Selection Per-Platform Node.js"
          }),
          Quote: T("home:architecture.sidecar.description", {
            defaultValue: "Manages pre-compiled platform-specific Node.js binaries for each target platform.\n\nCompile-time binary selection ensures the right runtime is available without runtime detection or download delays.\n\nIntegrity verification and cache management keep sidecar deployments deterministic and reproducible across build environments."
          })
        },
        {
          Id: "Sky",
          Emoji: "",
          Href: "https://github.com/CodeEditorLand/Sky",
          Author: "Sky",
          Role: T("home:architecture.sky.subtitle", {
            defaultValue: "Visual UI Layer Astro Components Three Workbench Layouts"
          }),
          Quote: T("home:architecture.sky.description", {
            defaultValue: "Renders the editor interface in the OS WebView using Astro component islands for efficient rendering.\n\nSkyBridge routes Tauri events to VS Code workbench APIs, translating runtime channels into workbench calls.\n\nSupports multiple workbench layouts that adapt the UI layer to different runtimes:\n• Browser proxy\n• Mountain-native\n• Electron\n\nSmart variant selection with conditional imports and tree-shaking keeps the bundle size target-specific."
          })
        },
        {
          Id: "Vine",
          Emoji: "",
          Href: "https://github.com/CodeEditorLand/Vine",
          Author: "Vine",
          Role: T("home:architecture.vine.subtitle", {
            defaultValue: "gRPC Backbone Contract-First .proto Definitions"
          }),
          Quote: T("home:architecture.vine.description", {
            defaultValue: "Protocol definitions for gRPC communication between Mountain, Cocoon, Air, and Grove.\n\nCurrent proto contracts live in Mountain/Proto/ and Cocoon:\n• Vine.proto - editor-host IPC\n• Spine.proto - extension coordination\n• Grove.proto - WASM extension protocols\n\nCentralized consolidation into the Vine element is planned as the protocol surface stabilizes."
          })
        },
        {
          Id: "Wind",
          Emoji: "",
          Href: "https://github.com/CodeEditorLand/Wind",
          Author: "Wind",
          Role: T("home:architecture.wind.subtitle", {
            defaultValue: "Workbench Services Effect-TS Layers Native Bridges"
          }),
          Quote: T("home:architecture.wind.description", {
            defaultValue: "UI service layer that recreates the VS Code workbench environment inside the Tauri WebView.\n\nEffect-TS services cover:\n• IPC\n• Configuration\n• Editor\n• Terminal\n• Clipboard\n• Dialog\n• FileSystem\n• Window\n• Search\n\nEach with explicit typed error handling and compile-time dependency tracking.\n\nComposed into Layer stacks that target specific runtimes:\n• Tauri (native)\n• Electron (compatibility)\n• Test (isolated)\n\nPreload shim establishes the bridge between VS Code workbench expectations and the Tauri runtime environment."
          })
        },
        {
          Id: "Worker",
          Emoji: "",
          Href: "https://github.com/CodeEditorLand/Worker",
          Author: "Worker",
          Role: T("home:architecture.worker.subtitle", {
            defaultValue: "Service Worker Offline Cache CSS Import Support"
          }),
          Quote: T("home:architecture.worker.description", {
            defaultValue: "Service worker that provides offline caching and dynamic CSS import handling for the web shell.\n\nCaching strategy:\n• Network-first for navigation requests\n• Cache-first for static assets\n\nIntercepts JavaScript imports of CSS files and injects them as <link> tags - handles VS Code's pattern of importing stylesheets as JS modules.\n\nAutomatic update detection with client reload when a new version is available."
          })
        }
      ],
      Columns: "masonry"
    },
    Download: {
      Title: T("download:title", { defaultValue: "Download Land" }),
      Subtitle: T("download:subtitle", {
        defaultValue: "Source builds are active today. Public installers, signing, and verification artifacts are still being prepared."
      }),
      Platforms: [
        {
          Id: "macos",
          Name: T("download:card.platform.macos.title", {
            defaultValue: "macOS"
          }),
          Icon: "Apple",
          Description: T(
            "download:card.platform.macos.universalBadge",
            {
              defaultValue: "Universal Binary: Apple Silicon and Intel"
            }
          ),
          Version: "Pre-release",
          Size: "Coming Soon"
        },
        {
          Id: "windows",
          Name: T("download:card.platform.windows.title", {
            defaultValue: "Windows"
          }),
          Icon: "Monitor",
          Description: T(
            "download:card.platform.windows.description",
            {
              defaultValue: "64-bit (x64)"
            }
          ),
          Version: "Pre-release",
          Size: "Coming Soon"
        },
        {
          Id: "linux",
          Name: T("download:card.platform.linux.title", {
            defaultValue: "Linux"
          }),
          Icon: "Terminal",
          Description: T("download:card.platform.linux.description", {
            defaultValue: "DEB, RPM, AppImage"
          }),
          Version: "Pre-release",
          Size: "Coming Soon"
        }
      ],
      ShowVerification: true,
      OnDownload: async (Platform) => {
        if (Platform.id) {
          try {
            const { default: DownloadAPI } = await __vitePreload(async () => { const { default: DownloadAPI } = await import('./Download.BGXTwG7G.js').then(n => n.D);return { default: DownloadAPI }},true              ?__vite__mapDeps([3,4,5]):void 0);
            const Information = await DownloadAPI.GetInfo(
              Platform.id
            );
            window.open(Information.downloadUrl, "_blank");
            await DownloadAPI.TrackDownload(Platform.id);
          } catch (DownloadError) {
            console.error("Download failed:", DownloadError);
            alert(
              T("download:labels.downloadFailed", {
                defaultValue: "Download failed. Please try again."
              })
            );
          }
        }
      }
    },
    Footer: {
      Brand: {
        Name: T("common:brand.name", {
          defaultValue: "Code Editor Land"
        }),
        Description: T("footer:brand.description", {
          defaultValue: "No Electron. No Chromium. Every extension runs unchanged.\n\nOpen source and free forever."
        })
      },
      Columns: [
        {
          Title: T("footer:columns.product.title", {
            defaultValue: "Product"
          }),
          Links: [
            {
              Label: T("footer:columns.product.features", {
                defaultValue: "Features"
              }),
              Href: "/#features"
            },
            {
              Label: T("footer:columns.product.downloads", {
                defaultValue: "Downloads"
              }),
              Href: "/Download"
            },
            {
              Label: T("footer:columns.product.docs", {
                defaultValue: "Documentation"
              }),
              Href: "https://github.com/CodeEditorLand/Land#readme"
            }
          ]
        },
        {
          Title: T("footer:columns.company.title", {
            defaultValue: "Community"
          }),
          Links: [
            {
              Label: T("footer:columns.company.github", {
                defaultValue: "GitHub"
              }),
              Href: "https://github.com/CodeEditorLand/Land"
            },
            {
              Label: T("footer:columns.company.issues", {
                defaultValue: "Issues"
              }),
              Href: "https://github.com/CodeEditorLand/Land/issues"
            },
            {
              Label: T("footer:columns.company.contributing", {
                defaultValue: "Contributing"
              }),
              Href: "https://github.com/CodeEditorLand/Land/tree/Current/CONTRIBUTING.md"
            }
          ]
        },
        {
          Title: T("footer:columns.legal.title", {
            defaultValue: "Legal"
          }),
          Links: [
            {
              Label: T("footer:columns.legal.privacy", {
                defaultValue: "Privacy"
              }),
              Href: "/Legal/Privacy"
            },
            {
              Label: T("footer:columns.legal.terms", {
                defaultValue: "Terms"
              }),
              Href: "/Legal/Term"
            },
            {
              Label: T("footer:columns.legal.license", {
                defaultValue: "License"
              }),
              Href: "/License"
            }
          ]
        }
      ]}
  };
  const {
    Hero,
    Features,
    Pricing,
    Testimonials,
    Download,
    Header: HeaderContent
  } = ResolvedContent;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `flex min-h-screen flex-col ${ClassName || ""}`, children: [
    HeaderContent !== void 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Header, { content: HeaderContent }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
      lineNumber: 845,
      columnNumber: 36
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1", role: "region", "aria-label": "Page content", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        ErrorBoundary,
        {
          FallbackComponent: () => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SkeletonFeatureCard, { className: "min-h-[60dvh]" }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
            lineNumber: 850,
            columnNumber: 7
          }, undefined),
          children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DynamicHeroSection, { Content: Hero }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
            lineNumber: 852,
            columnNumber: 6
          }, undefined)
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
          lineNumber: 848,
          columnNumber: 5
        },
        undefined
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        ErrorBoundary,
        {
          FallbackComponent: () => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3", children: [1, 2, 3, 4, 5, 6].map((Index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SkeletonFeatureCard, {}, Index, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
            lineNumber: 858,
            columnNumber: 9
          }, undefined)) }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
            lineNumber: 856,
            columnNumber: 7
          }, undefined),
          children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DynamicFeatures, { Content: Features }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
            lineNumber: 862,
            columnNumber: 6
          }, undefined)
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
          lineNumber: 854,
          columnNumber: 5
        },
        undefined
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        ErrorBoundary,
        {
          FallbackComponent: () => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3", children: [1, 2, 3].map((Index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SkeletonPricingTier, {}, Index, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
            lineNumber: 868,
            columnNumber: 9
          }, undefined)) }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
            lineNumber: 866,
            columnNumber: 7
          }, undefined),
          children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DynamicPricing, { Content: Pricing }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
            lineNumber: 872,
            columnNumber: 6
          }, undefined)
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
          lineNumber: 864,
          columnNumber: 5
        },
        undefined
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        ErrorBoundary,
        {
          FallbackComponent: () => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3", children: [1, 2, 3].map((Index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SkeletonCard, {}, Index, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
            lineNumber: 878,
            columnNumber: 9
          }, undefined)) }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
            lineNumber: 876,
            columnNumber: 7
          }, undefined),
          children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DynamicTestimonials, { Content: Testimonials }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
            lineNumber: 882,
            columnNumber: 6
          }, undefined)
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
          lineNumber: 874,
          columnNumber: 5
        },
        undefined
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        ErrorBoundary,
        {
          FallbackComponent: () => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SkeletonCard, { className: "min-h-[30dvh]" }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
            lineNumber: 886,
            columnNumber: 7
          }, undefined),
          children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DynamicPlatformGrid, { Content: Download }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
            lineNumber: 888,
            columnNumber: 6
          }, undefined)
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
          lineNumber: 884,
          columnNumber: 5
        },
        undefined
      )
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
      lineNumber: 847,
      columnNumber: 4
    }, undefined)
  ] }, void 0, true, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
    lineNumber: 844,
    columnNumber: 3
  }, undefined);
};

export { HomePage, HomePage as default };
//# sourceMappingURL=HomePage.CNwuUttC.js.map
