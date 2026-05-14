import { c as createComponent } from './astro-component_Dsw0bl44.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead, F as Fragment$1, u as unescapeHTML } from './prerender_O3JwF96W.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useTranslation } from 'react-i18next';
import { I as IconTooltip, E as ErrorBoundary, G as GetI18n, $ as $$Base } from './Base_IAktlLoN.mjs';
import { H as Header } from './Header_vAdk6Hlx.mjs';
import { b as SkeletonFeatureCard, c as SkeletonPricingTier, a as SkeletonCard } from './Skeleton_BWnC8cZP.mjs';
import * as lucide from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { R as RichText } from './DynamicDocSidebar_CoCXJIn0.mjs';
import { B as Badge, D as DynamicPlatformGrid } from './Badge_DNFpVESZ.mjs';
import { D as DynamicButton } from './DynamicButton_Nlx4LMsf.mjs';

const FeatureIconRegistry = {
  Zap: lucide.Zap,
  Box: lucide.Box,
  Cpu: lucide.Cpu,
  Globe: lucide.Globe,
  Wrench: lucide.Wrench,
  Heart: lucide.Heart,
  Sparkles: lucide.Sparkles,
  Code: lucide.Code,
  Layers: lucide.Layers,
  Package: lucide.Package,
  Puzzle: lucide.Puzzle,
  Server: lucide.Server,
  Shield: lucide.Shield,
  Database: lucide.Database
};
const FeatureColorMap = {
  performance: "var(--ExtensionRust)",
  compatibility: "var(--SpineWASM)",
  architecture: "var(--ExtensionEffectTypeScript)",
  "cross-platform": "var(--ExtensionTauri)",
  tooling: "var(--ToolBiome)",
  opensource: "var(--SpinegRPC)"
};
const FeatureIconLabelMap = {
  Zap: "Mountain handles native window, file, and terminal services outside the WebView",
  Box: "Cocoon hosts VS Code extensions with high-fidelity API compatibility",
  Cpu: "Rust services run at native CPU speed without Electron overhead",
  Globe: "Targets macOS, Windows, and Linux from one Tauri source tree",
  Wrench: "Rust, Tauri, Effect-TS, Biome, and OXC form the toolchain",
  Heart: "CC0 public domain - free to use, fork, and ship",
  Layers: "Effect-TS catches type errors at compile time",
  Puzzle: "Installed extensions run unmodified where their APIs are implemented",
  Server: "Vine gRPC route or planned relay",
  Shield: "Verified request path where implemented",
  Sparkles: "Active development across all elements",
  Code: "Rust, TypeScript, and build tooling",
  Package: "Tauri bundles to native packages, no Chromium"
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
  const GridReference = useRef(null);
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
  useEffect(() => {
    const Grid = GridReference.current;
    if (!Grid) return;
    const ReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (ReducedMotion) return;
    const ApplyScatter = async () => {
      const AttentionModule = await import('./Attention_BLLMNjcF.mjs');
      const Attention = await AttentionModule.default;
      const Cards = Grid.querySelectorAll(".FeatureCard");
      Cards.forEach((Card, Index) => {
        Attention.ApplyToElement(Card, Index, 6, 4);
      });
      const StaccatoModule = await import('./Staccato_iGbr3gmS.mjs');
      const Engine = await StaccatoModule.default;
      Engine.SeedSelector(".FeatureCard");
    };
    ApplyScatter();
  }, [Features]);
  const GetIcon = (IconName) => FeatureIconRegistry[IconName] || null;
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "features",
      "aria-labelledby": "FeaturesHeading",
      className: `flex min-h-[100dvh] w-full flex-col justify-center py-20 ${ClassName || ""}`,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        (Title || Subtitle) && /* @__PURE__ */ jsxs("div", { className: "StaccatoBreath mb-20 text-center", children: [
          Title && /* @__PURE__ */ jsx(
            "h2",
            {
              id: "FeaturesHeading",
              className: "mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl",
              children: Title
            }
          ),
          Subtitle && /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: /* @__PURE__ */ jsx(RichText, { Text: Subtitle }) })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: GridReference,
            className: `StaccatoMorphGap grid ${ColumnClass[Columns]} ${GapClass[Gap]} mx-auto max-w-6xl`,
            children: Features.map((Feature) => {
              const Icon = GetIcon(Feature.Icon);
              const IconLabel = FeatureIconLabelMap[Feature.Icon] ?? Feature.Title;
              const FeatureColor = FeatureColorMap[Feature.Id] ?? "var(--Primary)";
              return /* @__PURE__ */ jsxs(
                "article",
                {
                  title: Feature.Id === "performance" ? "Rust backend via Tauri 2.0 with gRPC IPC for native speed without Electron overhead." : Feature.Id === "compatibility" ? "Cocoon extension host runs VS Code extensions via Effect-TS with high-fidelity API compatibility." : Feature.Id === "architecture" ? "Effect-TS provides type-safe services, structured concurrency, and dependency injection in the UI layer." : Feature.Id === "cross-platform" ? "Tauri 2.0 compiles one codebase to native macOS, Windows, and Linux apps via platform WebViews." : Feature.Id === "tooling" ? "Built on Rust, Tauri, Effect-TS, Biome formatter, and the VS Code platform for modern DX." : Feature.Id === "opensource" ? "CC0 1.0 Universal public domain dedication. Funded by NLnet NGI0 Commons Fund." : void 0,
                  className: "FeatureCard StaccatoCard StaccatoBorderShimmer flex flex-col space-y-6 rounded-none border border-[var(--Border)] bg-white p-8",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: Feature.Title }),
                      /* @__PURE__ */ jsx("div", { className: "ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-[var(--Border)] bg-secondary", children: /* @__PURE__ */ jsx(
                        IconTooltip,
                        {
                          Label: IconLabel,
                          Icon: Icon ?? lucide.Sparkles,
                          Color: FeatureColor,
                          SizeClass: "h-5 w-5",
                          ClassName: "StaccatoIcon"
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxs("p", { className: "StaccatoBreath text-muted-foreground", children: [
                      /* @__PURE__ */ jsx(RichText, { Text: Feature.Description }),
                      /* @__PURE__ */ jsx("br", {}),
                      Feature.Icons && Feature.Icons.length > 0 && /* @__PURE__ */ jsx(
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
                              return /* @__PURE__ */ jsxs(
                                "span",
                                {
                                  className: "inline-flex items-center",
                                  children: [
                                    IconIndex === 0 ? " " : /* @__PURE__ */ jsxs(Fragment, { children: [
                                      " ",
                                      " "
                                    ] }),
                                    IsBrandSvg ? /* @__PURE__ */ jsx(
                                      IconTooltip,
                                      {
                                        Label: StackLabel,
                                        children: /* @__PURE__ */ jsx(
                                          "img",
                                          {
                                            src: IconName,
                                            alt: StackLabel,
                                            width: "16",
                                            height: "16",
                                            className: "inline h-4 w-4",
                                            "aria-hidden": "true"
                                          }
                                        )
                                      }
                                    ) : /* @__PURE__ */ jsx(
                                      IconTooltip,
                                      {
                                        Label: StackLabel,
                                        Icon: StackIcon,
                                        Color: StackColor,
                                        SizeClass: "h-4 w-4"
                                      }
                                    )
                                  ]
                                },
                                IconIndex
                              );
                            }
                          )
                        }
                      )
                    ] })
                  ]
                },
                Feature.Id
              );
            })
          }
        )
      ] })
    }
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
  const DotColorMap = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    blue: "bg-blue-500"
  };
  return /* @__PURE__ */ jsxs(
    Badge,
    {
      variant: Variant,
      className: `StaccatoBadge ${ContentClassName || ""} ${ClassName || ""}`,
      ...props,
      children: [
        Text,
        ShowDot && /* @__PURE__ */ jsxs(Fragment, { children: [
          " ",
          /* @__PURE__ */ jsx(
            "span",
            {
              className: `StaccatoDot StaccatoRhythmDot h-2 w-2 rounded-none ${DotColorMap[DotColor]}`,
              "aria-hidden": "true"
            }
          )
        ] })
      ]
    }
  );
};

const DynamicHeroSection = ({ Content, ClassName }) => {
  const SceneReference = useRef(null);
  const SectionReference = useRef(null);
  const {
    Title,
    TitleHighlight,
    Subtitle,
    PrimaryCta: PrimaryCTA,
    SecondaryCta: SecondaryCTA,
    FloatingCards: FloatingCard = [],
    ...HeroConfiguration
  } = Content;
  useEffect(() => {
    const Scene = SceneReference.current;
    if (!Scene || HeroConfiguration.RespectReducedMotion && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const CardElement = Scene.querySelectorAll(".FloatingCard");
    let FrameIdentifier;
    let NoiseFunction = null;
    const CardStates = /* @__PURE__ */ new Map();
    const LoadNoise = async () => {
      const { createNoise2D } = await import('simplex-noise');
      NoiseFunction = createNoise2D();
      const StaccatoModule = await import('./Staccato_iGbr3gmS.mjs');
      const Engine = await StaccatoModule.default;
      CardElement.forEach((Card, Index) => {
        Engine.SeedElement(Card, Index);
        const State = {
          CurrentX: 0,
          CurrentY: 0,
          IsHovered: false
        };
        CardStates.set(Card, State);
        Card.addEventListener("mouseenter", () => {
          State.IsHovered = true;
        });
        Card.addEventListener("mouseleave", () => {
          State.IsHovered = false;
        });
      });
      const AttentionModule = await import('./Attention_BLLMNjcF.mjs');
      const Attention = await AttentionModule.default;
      Attention.ApplyToSelector(".FloatingCard", 6, 4);
    };
    const AnimateCards = (Time) => {
      if (!NoiseFunction) {
        FrameIdentifier = requestAnimationFrame(AnimateCards);
        return;
      }
      const TimeFactor = Time * 7e-5;
      CardElement.forEach((Card, Index) => {
        const State = CardStates.get(Card);
        if (!State) return;
        const Seed = Index * 1.3;
        const TargetX = State.IsHovered ? 0 : NoiseFunction(TimeFactor + Seed, Seed * 0.4) * 5;
        const TargetY = State.IsHovered ? 0 : NoiseFunction(Seed * 0.4, TimeFactor + Seed) * 3.5;
        State.CurrentX += (TargetX - State.CurrentX) * 0.04;
        State.CurrentY += (TargetY - State.CurrentY) * 0.04;
        Card.style.transform = `translate(-50%, -50%) translate3d(${State.CurrentX.toFixed(2)}px, ${State.CurrentY.toFixed(2)}px, 0)`;
      });
      FrameIdentifier = requestAnimationFrame(AnimateCards);
    };
    LoadNoise();
    FrameIdentifier = requestAnimationFrame(AnimateCards);
    return () => {
      cancelAnimationFrame(FrameIdentifier);
      CardElement.forEach((Card) => {
        const Fresh = {
          CurrentX: 0,
          CurrentY: 0,
          IsHovered: false
        };
        CardStates.set(Card, Fresh);
      });
    };
  }, [HeroConfiguration.RespectReducedMotion]);
  const HandleHeroClick = () => {
    if (PrimaryCTA?.Href) {
      window.location.href = PrimaryCTA.Href;
    }
  };
  return /* @__PURE__ */ jsx(
    "section",
    {
      ref: SectionReference,
      id: "hero",
      "aria-label": "Hero",
      className: `StaccatoHeroButton relative flex min-h-0 w-full items-start overflow-hidden pb-12 pt-20 lg:min-h-[200dvh] lg:items-center lg:pb-0 lg:pt-32 ${ClassName || ""}`,
      onClick: HandleHeroClick,
      onKeyDown: (Event) => {
        if (Event.key === "Enter" || Event.key === " ") {
          Event.preventDefault();
          HandleHeroClick();
        }
      },
      role: "button",
      tabIndex: 0,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
        Content.Badge && /* @__PURE__ */ jsx(
          DynamicBadge,
          {
            Content: Content.Badge,
            ClassName: "StaccatoBadge mb-8"
          }
        ),
        /* @__PURE__ */ jsxs("h1", { className: "StaccatoColorShift mx-auto mb-10 max-w-4xl text-4xl tracking-tight md:text-6xl lg:text-7xl", children: [
          Title,
          " ",
          TitleHighlight && /* @__PURE__ */ jsx("span", { className: "text-primary", children: TitleHighlight })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:[&>button]:w-auto", children: [
          /* @__PURE__ */ jsx(DynamicButton, { Content: PrimaryCTA }),
          SecondaryCTA && /* @__PURE__ */ jsx(DynamicButton, { Content: SecondaryCTA })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "StaccatoBreath mx-auto mb-12 max-w-2xl text-lg text-muted-foreground", children: /* @__PURE__ */ jsx(RichText, { Text: Subtitle }) }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground", children: "Tech Stack" }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative mx-auto max-w-5xl px-6 py-12 lg:px-10 lg:py-16",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center justify-center gap-3 lg:hidden", children: FloatingCard.map((Card, Index) => {
                const GetIcon = () => {
                  const Title2 = Card.Title.toLowerCase();
                  if (Title2.includes("rust") || Title2.includes("core"))
                    return lucide.Cpu;
                  if (Title2.includes("tauri") || Title2.includes("ui"))
                    return lucide.Box;
                  if (Title2.includes("effect") || Title2.includes("service"))
                    return lucide.Layers;
                  if (Title2.includes("grpc") || Title2.includes("ipc"))
                    return lucide.Network;
                  if (Title2.includes("extension"))
                    return lucide.Puzzle;
                  if (Title2.includes("cross") || Title2.includes("platform"))
                    return lucide.Globe;
                  if (Title2.includes("vs code") || Title2.includes("api"))
                    return lucide.Server;
                  if (Title2.includes("open") || Title2.includes("source"))
                    return lucide.Zap;
                  return lucide.Cpu;
                };
                const IconComponent = GetIcon();
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "StaccatoCard border border-[var(--Border)] bg-white p-3",
                    style: {
                      transitionDelay: `${Index * 50}ms`
                    },
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "mb-2 flex items-center justify-center", children: /* @__PURE__ */ jsx(
                        IconTooltip,
                        {
                          Label: Card.Tooltip ?? Card.Title,
                          Icon: IconComponent,
                          SizeClass: "h-6 w-6",
                          ClassName: "text-primary"
                        }
                      ) }),
                      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-foreground", children: Card.Title }),
                        Card.Colors && Card.Colors.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-1.5 flex items-center justify-center gap-1.5", children: Card.Colors.map(
                          (Color, ColorIndex) => /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: "StaccatoRhythmDot h-3 w-3 border border-[var(--Border)]",
                              style: {
                                backgroundColor: Color
                              }
                            },
                            ColorIndex
                          )
                        ) })
                      ] })
                    ]
                  },
                  Card.Id
                );
              }) }),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  ref: SceneReference,
                  className: "relative hidden min-h-[80vh] lg:block",
                  style: { perspective: "1000px" },
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "StaccatoLogo absolute left-1/2 top-1/2 z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden border border-[var(--Border)] bg-white", children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: "/Asset/Logo/Glyph/Land.svg",
                        alt: "Code Editor Land",
                        title: "Code Editor Land",
                        width: "80",
                        height: "80",
                        className: "h-20 w-20"
                      }
                    ) }),
                    FloatingCard.map((Card, Index) => {
                      const Total = FloatingCard.length;
                      const Angle = Index / Total * 2 * Math.PI - Math.PI / 2;
                      const RadiusX = 44;
                      const RadiusY = 40;
                      const CenterX = 50 + Math.cos(Angle) * RadiusX;
                      const CenterY = 50 + Math.sin(Angle) * RadiusY;
                      const GetIcon = () => {
                        const Title2 = Card.Title.toLowerCase();
                        if (Title2.includes("rust") || Title2.includes("core"))
                          return lucide.Cpu;
                        if (Title2.includes("tauri") || Title2.includes("ui"))
                          return lucide.Box;
                        if (Title2.includes("effect") || Title2.includes("service"))
                          return lucide.Layers;
                        if (Title2.includes("grpc") || Title2.includes("ipc"))
                          return lucide.Network;
                        if (Title2.includes("extension"))
                          return lucide.Puzzle;
                        if (Title2.includes("cross") || Title2.includes("platform"))
                          return lucide.Globe;
                        if (Title2.includes("vs code") || Title2.includes("api"))
                          return lucide.Server;
                        if (Title2.includes("open") || Title2.includes("source"))
                          return lucide.Zap;
                        return lucide.Cpu;
                      };
                      const IconComponent = GetIcon();
                      return /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: "FloatingCard StaccatoBorderShimmer StaccatoShadowLift absolute z-50 w-36 transform-gpu border border-[var(--Border)] bg-white p-3",
                          style: {
                            top: `${CenterY}%`,
                            left: `${CenterX}%`,
                            transform: "translate(-50%, -50%)"
                          },
                          children: [
                            /* @__PURE__ */ jsx("div", { className: "mb-2 flex items-center justify-center", children: /* @__PURE__ */ jsx(
                              IconTooltip,
                              {
                                Label: Card.Tooltip ?? Card.Title,
                                Icon: IconComponent,
                                SizeClass: "h-8 w-8",
                                ClassName: "text-primary"
                              }
                            ) }),
                            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                              /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-foreground", children: Card.Title }),
                              Card.Colors && Card.Colors.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-1.5 flex items-center justify-center gap-1.5", children: Card.Colors.map(
                                (Color, ColorIndex) => /* @__PURE__ */ jsx(
                                  "div",
                                  {
                                    className: "StaccatoRhythmDot h-3 w-3 border border-[var(--Border)]",
                                    style: {
                                      backgroundColor: Color
                                    }
                                  },
                                  ColorIndex
                                )
                              ) })
                            ] })
                          ]
                        },
                        Card.Id
                      );
                    }),
                    HeroConfiguration.ShowConnectingLines && /* @__PURE__ */ jsx(
                      "svg",
                      {
                        className: "StaccatoBreath pointer-events-none absolute inset-0 h-full w-full",
                        "aria-hidden": "true",
                        role: "presentation",
                        children: FloatingCard.map((Card, Index) => {
                          const Total = FloatingCard.length;
                          const Angle = Index / Total * 2 * Math.PI - Math.PI / 2;
                          const RadiusX = 44;
                          const RadiusY = 40;
                          const CenterX = 50 + Math.cos(Angle) * RadiusX;
                          const CenterY = 50 + Math.sin(Angle) * RadiusY;
                          return /* @__PURE__ */ jsx(
                            "line",
                            {
                              x1: "50%",
                              y1: "50%",
                              x2: `${CenterX}%`,
                              y2: `${CenterY}%`,
                              stroke: "rgba(79, 79, 79, 0.69)",
                              strokeWidth: "0.5",
                              strokeDasharray: "4 10",
                              strokeLinecap: "round",
                              opacity: 0.79 - Index * 0.02
                            },
                            Card.Id
                          );
                        })
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      ] })
    }
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
  const GridReference = useRef(null);
  const {
    Title,
    Subtitle,
    Tiers,
    ShowMonthlyYearlyToggle = false,
    DefaultYearly = false,
    Labels = {}
  } = Content;
  const PopularLabel = Labels.Popular ?? T("pricing.labels.popular", { defaultValue: "Most Popular" });
  const [IsYearly, SetIsYearly] = useState(DefaultYearly);
  useEffect(() => {
    const Grid = GridReference.current;
    if (!Grid) return;
    const ReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (ReducedMotion) return;
    const ApplyScatter = async () => {
      const AttentionModule = await import('./Attention_BLLMNjcF.mjs');
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
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "pricing",
      "aria-labelledby": "PricingHeading",
      className: `flex min-h-[100dvh] w-full flex-col justify-center py-20 ${ClassName || ""}`,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        (Title || Subtitle) && /* @__PURE__ */ jsxs("div", { className: "StaccatoBreath mb-20 text-center", children: [
          Title && /* @__PURE__ */ jsx(
            "h2",
            {
              id: "PricingHeading",
              className: "mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl",
              children: Title
            }
          ),
          Subtitle && /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: /* @__PURE__ */ jsx(RichText, { Text: Subtitle }) })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: GridReference,
            className: "mx-auto grid max-w-4xl grid-cols-1 gap-12 md:grid-cols-2",
            children: DisplayTier.map((Tier) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: `PricingCard StaccatoCard StaccatoBorderShimmer flex flex-col rounded-none border bg-white ${Tier.Highlighted || Tier.Popular ? "border-primary" : "border-[var(--Border)]"} ${Tier.Status && Tier.Status !== "Ready" ? "opacity-75" : ""}`,
                "aria-disabled": Tier.Status && Tier.Status !== "Ready" ? true : void 0,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "border-b border-[var(--Border)] p-8", children: [
                    Tier.Popular && /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx("span", { className: "StaccatoBadge StaccatoRhythmBeat text-xs font-semibold uppercase tracking-wider text-primary", children: PopularLabel }) }),
                    Tier.Status && Tier.Status !== "Ready" && /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx("span", { className: "StaccatoBadge border border-[var(--Border)] bg-[var(--Mute)] px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: Tier.Status === "WIP" ? "WIP" : "Coming Soon" }) }),
                    /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(
                      DynamicButton,
                      {
                        Content: {
                          ...Tier.CTA,
                          FullWidth: true
                        }
                      }
                    ) }),
                    /* @__PURE__ */ jsx("h3", { className: "mb-2 text-2xl font-bold", children: Tier.Name }),
                    Tier.Description && /* @__PURE__ */ jsx("div", { className: "StaccatoBreath text-sm text-muted-foreground", children: /* @__PURE__ */ jsx(RichText, { Text: Tier.Description }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col p-8", children: [
                    Tier.Elements && Tier.Elements.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx("p", { className: "mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Elements" }),
                      /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: Tier.Elements.map(
                        (Element, Index) => {
                          const Parts = Element.split("\n");
                          const NameLine = Parts[0] ?? "";
                          const Sub1 = Parts[1];
                          const Sub2 = Parts[2];
                          const AccentColor = GetElementColor(
                            NameLine
                          );
                          return /* @__PURE__ */ jsxs(
                            "li",
                            {
                              className: `flex flex-col gap-0.5 ${Tier.Status && Tier.Status !== "Ready" ? "opacity-70" : ""}`,
                              children: [
                                /* @__PURE__ */ jsx(
                                  "span",
                                  {
                                    className: "text-sm font-semibold",
                                    style: {
                                      color: AccentColor
                                    },
                                    children: /* @__PURE__ */ jsx(
                                      RichText,
                                      {
                                        Text: NameLine,
                                        Terms: true
                                      }
                                    )
                                  }
                                ),
                                Sub1 && /* @__PURE__ */ jsx("span", { className: "text-xs text-foreground", children: /* @__PURE__ */ jsx(
                                  RichText,
                                  {
                                    Text: Sub1,
                                    Terms: true
                                  }
                                ) }),
                                Sub2 && /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: /* @__PURE__ */ jsx(
                                  RichText,
                                  {
                                    Text: Sub2,
                                    Terms: true
                                  }
                                ) })
                              ]
                            },
                            Index
                          );
                        }
                      ) }),
                      Tier.Features.length > 0 && /* @__PURE__ */ jsx("hr", { className: "my-5 border-[var(--Border)]" })
                    ] }),
                    Tier.Features.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
                      Tier.Elements && Tier.Elements.length > 0 && /* @__PURE__ */ jsx("p", { className: "mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Roadmap" }),
                      /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: Tier.Features.map(
                        (Feature, FeatureIndex) => /* @__PURE__ */ jsxs(
                          "li",
                          {
                            className: `flex items-start justify-between gap-2 ${Tier.Status && Tier.Status !== "Ready" ? "opacity-70" : ""}`,
                            children: [
                              /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 text-sm", children: /* @__PURE__ */ jsx(
                                RichText,
                                {
                                  Text: Feature,
                                  Terms: true
                                }
                              ) }),
                              Tier.Status && Tier.Status !== "Ready" ? /* @__PURE__ */ jsx("span", { className: "StaccatoBadge shrink-0 border border-[var(--Border)] bg-[var(--Mute)] px-2 py-0.5 text-xs font-medium text-muted-foreground", children: Tier.Status === "WIP" ? "WIP" : "Coming Soon" }) : /* @__PURE__ */ jsx(
                                IconTooltip,
                                {
                                  Label: "Included",
                                  Icon: lucide.Check,
                                  SizeClass: "h-4 w-4 shrink-0",
                                  ClassName: "StaccatoCheckmark mt-0.5 text-primary"
                                }
                              )
                            ]
                          },
                          FeatureIndex
                        )
                      ) })
                    ] })
                  ] })
                ]
              },
              Tier.Id
            ))
          }
        )
      ] })
    }
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
const DynamicTestimonials = ({ Content, ClassName }) => {
  const { Title, Subtitle, Testimonials, Columns = 3 } = Content;
  const GridReference = useRef(null);
  const ColumnClass = {
    1: "grid-cols-1 max-w-3xl",
    2: "grid-cols-1 md:grid-cols-2 max-w-5xl",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl",
    5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-7xl",
    6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 max-w-7xl"
  };
  useEffect(() => {
    const Grid = GridReference.current;
    if (!Grid) return;
    const ReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (ReducedMotion) return;
    const ApplyScatter = async () => {
      const AttentionModule = await import('./Attention_BLLMNjcF.mjs');
      const Attention = await AttentionModule.default;
      const Cards = Grid.querySelectorAll(".TestimonialCard");
      Cards.forEach((Card, Index) => {
        Attention.ApplyToElement(Card, Index, 5, 3);
      });
      const StaccatoModule = await import('./Staccato_iGbr3gmS.mjs');
      const Engine = await StaccatoModule.default;
      Engine.SeedSelector(".TestimonialCard");
    };
    ApplyScatter();
  }, [Testimonials]);
  const RenderStars = (Rating = 0) => {
    if (Rating <= 0) return null;
    return /* @__PURE__ */ jsx("div", { role: "img", "aria-label": `Rating: ${Rating} out of 5 stars`, children: Array.from({ length: 5 }).map((_, Index) => /* @__PURE__ */ jsx(
      "span",
      {
        className: "StaccatoStar StarRatingSymbol text-yellow-400",
        "aria-hidden": "true",
        children: Index < Rating ? "★" : "☆"
      },
      Index
    )) });
  };
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "testimonials",
      "aria-label": "Architecture",
      className: `flex min-h-[100dvh] w-full flex-col justify-center py-20 ${ClassName || ""}`,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        (Title || Subtitle) && /* @__PURE__ */ jsxs("div", { className: "StaccatoBreath mb-20 text-center", children: [
          Title && /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl", children: Title }),
          Subtitle && /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: /* @__PURE__ */ jsx(RichText, { Text: Subtitle }) })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: GridReference,
            className: `StaccatoMorphGap grid ${ColumnClass[Columns]} mx-auto gap-12`,
            children: Testimonials.map((Testimonial) => {
              const AccentColor = TestimonialColorMap[Testimonial.Id] ?? "var(--Primary)";
              return /* @__PURE__ */ jsxs(
                "article",
                {
                  className: "TestimonialCard StaccatoCard StaccatoBorderShimmer flex flex-col rounded-none border border-[var(--Border)] bg-white p-8",
                  style: {
                    borderLeftColor: AccentColor,
                    borderLeftWidth: "2px"
                  },
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "mb-4", children: RenderStars(Testimonial.Rating) }),
                    /* @__PURE__ */ jsx("blockquote", { className: "StaccatoBreath mb-6 flex-1", children: /* @__PURE__ */ jsxs("div", { className: "text-lg", children: [
                      (Testimonial.Rating ?? 0) > 0 && /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "text-muted-foreground/50",
                          "aria-hidden": "true",
                          children: "“"
                        }
                      ),
                      /* @__PURE__ */ jsx(RichText, { Text: Testimonial.Quote }),
                      (Testimonial.Rating ?? 0) > 0 && /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "text-muted-foreground/50",
                          "aria-hidden": "true",
                          children: "”"
                        }
                      )
                    ] }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("cite", { className: "font-semibold not-italic", children: [
                        Testimonial.Href ? /* @__PURE__ */ jsx(
                          "a",
                          {
                            href: Testimonial.Href,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "hover:underline",
                            children: Testimonial.Author
                          }
                        ) : Testimonial.Author,
                        Testimonial.Emoji && /* @__PURE__ */ jsxs("span", { "aria-hidden": "true", children: [
                          " ",
                          Testimonial.Emoji
                        ] })
                      ] }),
                      (Testimonial.Role || Testimonial.Company) && /* @__PURE__ */ jsxs("p", { className: "StaccatoBreath text-sm text-muted-foreground", children: [
                        Testimonial.Role,
                        Testimonial.Role && Testimonial.Company && ", ",
                        Testimonial.Company
                      ] })
                    ] })
                  ]
                },
                Testimonial.Id
              );
            })
          }
        )
      ] })
    }
  );
};

const HomePage = ({ Content, ClassName }) => {
  const { t: T } = useTranslation(["home", "common", "download", "footer"]);
  const ResolvedContent = Content || {
    Hero: {
      Badge: {
        Text: T("home:hero.badge", {
          defaultValue: "No Electron   No Chromium   CC0"
        }),
        Variant: "secondary"
      },
      Title: T("home:hero.title", {
        defaultValue: "The Future of Code Editing"
      }),
      TitleHighlight: T("home:hero.titleHighlight", {
        defaultValue: "Land"
      }),
      Subtitle: T("home:hero.subtitle", {
        defaultValue: "VS Code runs on Electron. Land is rebuilding the editor stack around Rust, Tauri, and Effect-TS while keeping the VS Code extension API as the compatibility target.\n\nThe primary path is source-build first today, with public installers and long-tail extension coverage still in progress."
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
        Variant: "outline",
        Size: "lg",
        Icon: "ExternalLink",
        Href: "https://github.com/CodeEditorLand/Land#readme"
      },
      FloatingCards: [
        {
          Id: "1",
          Title: "Rust Core",
          Tooltip: "Mountain implements the Common trait definitions in Rust. Handles windows, files, terminals, IPC, and process control through Tauri.",
          Colors: ["var(--ExtensionRust)", "var(--Mute)"]
        },
        {
          Id: "2",
          Title: "Tauri UI",
          Tooltip: "Sky renders Astro components in the operating system WebView. Wind manages workbench state through Effect-TS layers.",
          Colors: [
            "var(--ExtensionTauri)",
            "var(--Primary)",
            "var(--Secondary)",
            "var(--Mute)"
          ]
        },
        {
          Id: "3",
          Title: "Effect-TS Services",
          Tooltip: "Cocoon and Wind use Effect-TS for typed errors, scoped resources, cancellation, and supervised concurrency.",
          Colors: [
            "var(--ExtensionEffectTypeScript)",
            "var(--ExtensionEffectTypeScriptFore)",
            "var(--ExtensionEffectTypeScriptMute)"
          ]
        },
        {
          Id: "4",
          Title: "gRPC IPC",
          Tooltip: "Vine defines .proto contracts for typed communication between Mountain, Cocoon, Air, and Grove.",
          Colors: ["var(--SpinegRPC)", "var(--SpineIPC)"]
        },
        {
          Id: "5",
          Title: "Extension Host",
          Tooltip: "Cocoon runs unmodified VS Code extensions by providing the vscode API shim and routing calls through Effect-TS to Mountain.",
          Colors: ["var(--TierProvider)"]
        },
        {
          Id: "6",
          Title: "Cross-Platform",
          Tooltip: "Tauri bundles to native macOS, Windows, and Linux packages using the OS WebView. Build configuration targets all three.",
          Colors: [
            "var(--OSMacOS)",
            "var(--OSWindows)",
            "var(--OSLinux)"
          ]
        },
        {
          Id: "7",
          Title: "VS Code API",
          Tooltip: "Cocoon implements the VS Code API surface with Effect-TS fibers: commands, workspace, terminals, webviews, and language features.",
          Colors: ["var(--SpineIPC)"]
        },
        {
          Id: "8",
          Title: "Open Source CC0",
          Tooltip: "All fifteen element repos are under CC0 1.0 Universal. Funded by NLnet NGI0 Commons Fund.",
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
        defaultValue: "The editor pieces are being rebuilt around native services, typed IPC, and a compatibility host that can be checked against real source."
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
              defaultValue: "Mountain runs native Rust and Tauri for window management, file I/O, child processes, terminal IPC, and extension communication. Echo provides work-stealing scheduler primitives for bounded background work.\n\nThat gives Land a native path to move heavy editor work out of the WebView without claiming benchmark numbers before a reproducible suite exists."
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
              defaultValue: "Cocoon hosts existing VS Code extension code and provides the vscode API shim using Effect-TS fibers. Mountain scans installed extensions, reads package.json manifests, handles VSIX install paths, and notifies Cocoon when extensions change.\n\nExtensions run unmodified through the active compatibility path. Marketplace-wide coverage still depends on each extension API usage and on services still being filled in."
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
              defaultValue: "Effect-TS gives Cocoon typed errors, scoped resources, explicit cancellability, and supervised concurrency for extension-host work.\n\nThat does not remove every runtime bug, but it does make failure paths explicit and traceable through the services Land controls."
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
              defaultValue: "Tauri uses the OS WebView on each platform instead of a bundled Chromium instance. Mountain's desktop path has no embedded browser engine.\n\nThe repository includes macOS, Windows, and Linux build configuration. macOS is the primary path, with Windows and Linux installer coverage still being completed."
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
            defaultValue: "Update plumbing in progress."
          }),
          Description: T(
            "home:features.item.cicdIntegration.description",
            {
              defaultValue: "Air contains Rust services for update checks, downloads, authentication, indexing, health, and a Vine gRPC server.\n\nThose services are real source today. The public updater flow, signing story, and release distribution path are still being finished."
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
              defaultValue: "Most open source editors have license clauses that restrict commercial use, require attribution, or forbid forking the UI.\n\nThe entire Land codebase is CC0 public domain. Use it, fork it, ship it, build commercial products on top of it. No attribution required. No compliance headaches."
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
        defaultValue: "Funded by NLnet NGI0 Commons Fund.\n\nEvery milestone is described as source status, integration status, or release work so the website does not outrun the code."
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
              defaultValue: "Mountain ⛰️\nNative Backend\nReplaces Electron main process, no bundled Chromium"
            }),
            T("home:roadmap.tiers.current.elements.cocoon", {
              defaultValue: "Cocoon 🦋\nExtension Host\nUnmodified VS Code extensions through Effect-TS routes"
            }),
            T("home:roadmap.tiers.current.elements.wind", {
              defaultValue: "Wind 🍃\nWorkbench Shell\nEffect-TS layers for native workbench services"
            }),
            T("home:roadmap.tiers.current.elements.sky", {
              defaultValue: "Sky 🌌\nAstro UI Layer\nWorkbench routes and WebView bridge"
            }),
            T("home:roadmap.tiers.current.elements.air", {
              defaultValue: "Air 🪁\nBackground Services\nUpdates, downloads, auth, indexing, and health"
            }),
            T("home:roadmap.tiers.current.elements.echo", {
              defaultValue: "Echo 📣\nScheduler Primitives\nBounded background work for Rust services"
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
              defaultValue: "macOS primary path, Windows and Linux configured"
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
            defaultValue: "Active milestones across the element repos. These items are integration and release goals, not claims that the public build already ships them."
          }),
          Price: { Monthly: 0, Yearly: 0 },
          Elements: [
            T("home:roadmap.tiers.future.elements.vine", {
              defaultValue: "Vine 🌿\nProtocol In Progress\nMountain, Cocoon, Air, and Grove contracts"
            }),
            T("home:roadmap.tiers.future.elements.cocoon", {
              defaultValue: "Cocoon 🦋\nExtension Compatibility Pass\nLong-tail VS Code API coverage"
            }),
            T("home:roadmap.tiers.future.elements.grove", {
              defaultValue: "Grove 🌳\nWASM Host Stabilizing\nCapability-based extension isolation path"
            }),
            T("home:roadmap.tiers.future.elements.rest", {
              defaultValue: "Rest ⛱️\nSource Map Support\nOXC transformer integration in progress"
            }),
            T("home:roadmap.tiers.future.elements.echo", {
              defaultValue: "Echo 📣\nScheduler Optimization\nFaster steal, lower latency"
            }),
            T("home:roadmap.tiers.future.elements.air", {
              defaultValue: "Air 🪁\nRelease Delivery\nSigning and distribution path"
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
        defaultValue: "Land replaces VS Code's Electron stack element by element.\n\nThe element directories are inspectable in source, but each one is described here by what the current code supports or is actively wiring."
      }),
      Testimonials: [
        {
          Id: "Air",
          Emoji: "🪁",
          Href: "https://github.com/CodeEditorLand/Air",
          Author: "Air",
          Role: T("home:architecture.air.subtitle", {
            defaultValue: "Background Services - Downloader - Workspace Indexer"
          }),
          Quote: T("home:architecture.air.description", {
            defaultValue: "Rust services for downloads, updates, authentication, indexing, resilience, health, and Vine IPC\nRelease signing and public installer delivery are still being completed\nDesigned to keep update and indexing work outside the main editor surface"
          })
        },
        {
          Id: "Cocoon",
          Emoji: "🦋",
          Href: "https://github.com/CodeEditorLand/Cocoon",
          Author: "Cocoon",
          Role: T("home:architecture.cocoon.subtitle", {
            defaultValue: "Extension Host - Unmodified VS Code Extensions - Effect-TS Services"
          }),
          Quote: T("home:architecture.cocoon.description", {
            defaultValue: "Node.js sidecar for VS Code extension-host compatibility\nRuns existing extension entry points without rewriting their source\nRoutes implemented API calls through Effect-TS services and the Mountain bridge\nCore commands, workspace, window, terminal, webview, and language-provider surfaces exist in source"
          })
        },
        {
          Id: "Common",
          Emoji: "👨🏻‍🏭",
          Href: "https://github.com/CodeEditorLand/Common",
          Author: "Common",
          Role: T("home:architecture.common.subtitle", {
            defaultValue: "Shared Foundation - Traits - Cross-Element Types"
          }),
          Quote: T("home:architecture.common.description", {
            defaultValue: "Shared Rust crate and TypeScript package for cross-element contracts\nDefines reusable traits, DTOs, utility types, and service boundaries\nNot a standalone runtime process\nKeeps shared interfaces visible instead of scattering them through elements"
          })
        },
        {
          Id: "Echo",
          Emoji: "📣",
          Href: "https://github.com/CodeEditorLand/Echo",
          Author: "Echo",
          Role: T("home:architecture.echo.subtitle", {
            defaultValue: "Work-Stealing Scheduler - crossbeam-deque - Supervised Worker Pool"
          }),
          Quote: T("home:architecture.echo.description", {
            defaultValue: "Scheduler primitives built around supervised Rust worker pools\nUsed by native services that need bounded background execution\nThe source supports cancellation and shutdown paths without promising that every workload already routes through Echo"
          })
        },
        {
          Id: "Grove",
          Emoji: "🌳",
          Href: "https://github.com/CodeEditorLand/Grove",
          Author: "Grove",
          Role: T("home:architecture.grove.subtitle", {
            defaultValue: "WASM Sandbox - Wasmtime Runtime - Capability-Based Isolation"
          }),
          Quote: T("home:architecture.grove.description", {
            defaultValue: "Contains a Wasmtime-backed WebAssembly host path and Grove gRPC protocol definitions\nIncludes transport and capability-oriented modules for extension isolation work\nPrimary VS Code compatibility still runs through Cocoon while Grove integration matures"
          })
        },
        {
          Id: "Maintain",
          Emoji: "💪🏻",
          Href: "https://github.com/CodeEditorLand/Maintain",
          Author: "Maintain",
          Role: T("home:architecture.maintain.subtitle", {
            defaultValue: "Build Orchestrator - Configuration - Release Profiles"
          }),
          Quote: T("home:architecture.maintain.description", {
            defaultValue: "Coordinates development, debug, and release build profiles across Land elements\nKeeps profile names and build scripts visible for contributors\nDeterministic release claims are held until the public release pipeline is fully published"
          })
        },
        {
          Id: "Mist",
          Emoji: "🌫️",
          Href: "https://github.com/CodeEditorLand/Mist",
          Author: "Mist",
          Role: T("home:architecture.mist.subtitle", {
            defaultValue: "Local DNS Sandbox - *.editor.land Resolution - Network Boundary"
          }),
          Quote: T("home:architecture.mist.description", {
            defaultValue: "Provides local DNS, resolver, WebSocket, zone, and forward-security code\nMountain has a native Mist feature path, but not every internal route flows through Mist yet\nThe goal is a clean local service boundary without exposing private service names publicly"
          })
        },
        {
          Id: "Mountain",
          Emoji: "⛰️",
          Href: "https://github.com/CodeEditorLand/Mountain",
          Author: "Mountain",
          Role: T("home:architecture.mountain.subtitle", {
            defaultValue: "Native Rust Backend - Tauri - Replaces Electron Main Process"
          }),
          Quote: T("home:architecture.mountain.description", {
            defaultValue: "Handles windows, file I/O, child processes, terminals, clipboard, and extension IPC through Rust and Tauri\nIncludes Vine and Cocoon bridge code for the primary desktop path\nUses native integrations such as keyring where the feature path requires them"
          })
        },
        {
          Id: "Output",
          Emoji: "⚫",
          Href: "https://github.com/CodeEditorLand/Output",
          Author: "Output",
          Role: T("home:architecture.output.subtitle", {
            defaultValue: "Compilation Pipeline - Plugin-Routed - Deterministic Checksum"
          }),
          Quote: T("home:architecture.output.description", {
            defaultValue: "Processes TypeScript and platform code through plugin-routed transforms\nContains the dynamic import rewrite and bundling support used by the output pipeline\nChecksum and release guarantees should come from the published pipeline, not from marketing copy"
          })
        },
        {
          Id: "Rest",
          Emoji: "⛱️",
          Href: "https://github.com/CodeEditorLand/Rest",
          Author: "Rest",
          Role: T("home:architecture.rest.subtitle", {
            defaultValue: "TypeScript Transform Pipeline - OXC - Rust-Native"
          }),
          Quote: T("home:architecture.rest.description", {
            defaultValue: "OXC-based transform work for TypeScript and VS Code platform code\nMeant to reduce reliance on Node-hosted compilation paths over time\nSource maps and public benchmark claims remain integration work"
          })
        },
        {
          Id: "SideCar",
          Emoji: "🚃",
          Href: "https://github.com/CodeEditorLand/SideCar",
          Author: "SideCar",
          Role: T("home:architecture.sidecar.subtitle", {
            defaultValue: "Binary Distributor - Compile-Time Target Triple Selection - Per-Platform Node.js"
          }),
          Quote: T("home:architecture.sidecar.description", {
            defaultValue: "Packages host-specific sidecar binaries for the Cocoon path\nKeeps target triples and selection logic in source rather than hidden installer scripts\nAdditional platform packaging remains tied to the release pipeline"
          })
        },
        {
          Id: "Sky",
          Emoji: "🌌",
          Href: "https://github.com/CodeEditorLand/Sky",
          Author: "Sky",
          Role: T("home:architecture.sky.subtitle", {
            defaultValue: "Visual UI Layer - Astro Components - Three Workbench Layouts"
          }),
          Quote: T("home:architecture.sky.description", {
            defaultValue: "Astro workbench routes and WebView bridge code for the editor UI\nSupports the visual shell that Mountain loads through Tauri\nPanel and layout coverage should be checked against the current Sky routes"
          })
        },
        {
          Id: "Vine",
          Emoji: "🌿",
          Href: "https://github.com/CodeEditorLand/Vine",
          Author: "Vine",
          Role: T("home:architecture.vine.subtitle", {
            defaultValue: "gRPC Backbone - Contract-First - .proto Definitions"
          }),
          Quote: T("home:architecture.vine.description", {
            defaultValue: "Protocol contracts live in .proto files for Mountain, Cocoon, Air, Grove, and related services\nGenerated stubs give Rust and TypeScript a shared wire shape where the route is implemented\nCoverage is expanding across the IPC surface"
          })
        },
        {
          Id: "Wind",
          Emoji: "🍃",
          Href: "https://github.com/CodeEditorLand/Wind",
          Author: "Wind",
          Role: T("home:architecture.wind.subtitle", {
            defaultValue: "Workbench Services - Effect-TS Layers - Native Bridges"
          }),
          Quote: T("home:architecture.wind.description", {
            defaultValue: "TypeScript workbench services for panels, sidebars, activity bar, configuration, and output channels\nEffect-TS layers keep service dependencies explicit\nNative OS calls use the Tauri bridge where the Mountain path implements them"
          })
        },
        {
          Id: "Worker",
          Emoji: "🍩",
          Href: "https://github.com/CodeEditorLand/Worker",
          Author: "Worker",
          Role: T("home:architecture.worker.subtitle", {
            defaultValue: "Service Worker - Offline Cache - CSS Import Support"
          }),
          Quote: T("home:architecture.worker.description", {
            defaultValue: "Manages browser-worker support for caching and dynamic CSS imports where the web shell needs it\nSecurity-sensitive auth claims are kept out until the active Worker code and release profile prove them end to end"
          })
        }
      ],
      Columns: 3
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
            const { default: DownloadAPI } = await import('./Download_BBLb8-cA.mjs');
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
        Description: T("common:brand.tagline", {
          defaultValue: "Rust and Tauri editor stack. VS Code API compatibility in progress. Free forever."
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
                defaultValue: "Docs"
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
              Href: "https://github.com/CodeEditorLand/Land/blob/Current/CONTRIBUTING.md"
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
  return /* @__PURE__ */ jsxs("div", { className: `flex min-h-screen flex-col ${ClassName || ""}`, children: [
    HeaderContent !== void 0 && /* @__PURE__ */ jsx(Header, { content: HeaderContent }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", role: "region", "aria-label": "Page content", children: [
      /* @__PURE__ */ jsx(
        ErrorBoundary,
        {
          FallbackComponent: () => /* @__PURE__ */ jsx(SkeletonFeatureCard, { className: "min-h-[60dvh]" }),
          children: /* @__PURE__ */ jsx(DynamicHeroSection, { Content: Hero })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "py-20" }),
      /* @__PURE__ */ jsx(
        ErrorBoundary,
        {
          FallbackComponent: () => /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3", children: [1, 2, 3, 4, 5, 6].map((Index) => /* @__PURE__ */ jsx(SkeletonFeatureCard, {}, Index)) }),
          children: /* @__PURE__ */ jsx(DynamicFeatures, { Content: Features })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "py-24" }),
      /* @__PURE__ */ jsx(
        ErrorBoundary,
        {
          FallbackComponent: () => /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3", children: [1, 2, 3].map((Index) => /* @__PURE__ */ jsx(SkeletonPricingTier, {}, Index)) }),
          children: /* @__PURE__ */ jsx(DynamicPricing, { Content: Pricing })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "py-24" }),
      /* @__PURE__ */ jsx(
        ErrorBoundary,
        {
          FallbackComponent: () => /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3", children: [1, 2, 3].map((Index) => /* @__PURE__ */ jsx(SkeletonCard, {}, Index)) }),
          children: /* @__PURE__ */ jsx(DynamicTestimonials, { Content: Testimonials })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "py-24" }),
      /* @__PURE__ */ jsx(
        ErrorBoundary,
        {
          FallbackComponent: () => /* @__PURE__ */ jsx(SkeletonCard, { className: "min-h-[30dvh]" }),
          children: /* @__PURE__ */ jsx(DynamicPlatformGrid, { Content: Download })
        }
      )
    ] })
  ] });
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const T = GetI18n();
  const MetaTitle = T("meta.home.title", {
    defaultValue: "Code Editor Land | Rust and Tauri Editor Stack"
  });
  const MetaDescription = T("meta.home.description", {
    defaultValue: "Code Editor Land is an open-source editor stack built with Rust, Tauri, and a VS Code-compatible extension host. Source builds are active while public installers and full extension coverage are still in progress."
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription, "lang": "en" }, { "Head": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment$1, { "slot": "Head" }, { "default": ($$result3) => renderTemplate(_a || (_a = __template([' <script crossorigin=\"anonymous\" type="application/ld+json">', "<\/script> "])), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Code Editor Land",
    "alternateName": "Land",
    "description": "An open-source editor stack built with Rust, Tauri, and a VS Code-compatible extension host. Source builds are active while public installers and full extension coverage are still in progress.",
    "url": "https://editor.land",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "macOS, Windows, Linux",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "license": "https://creativecommons.org/publicdomain/zero/1.0/",
    "softwareVersion": "Pre-release",
    "downloadUrl": "https://editor.land/Download",
    "screenshot": "https://editor.land/Favicon/og-image.png",
    "author": [
      {
        "@type": "Person",
        "name": "Nikola R. Hristov",
        "url": "https://github.com/NikolaRHristov"
      },
      {
        "@type": "Organization",
        "name": "Code Editor Land",
        "url": "https://editor.land"
      },
      {
        "@type": "Organization",
        "name": "PlayForm",
        "url": "https://PlayForm.Cloud"
      }
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Code Editor Land",
      "url": "https://editor.land",
      "logo": {
        "@type": "ImageObject",
        "url": "https://editor.land/Favicon/favicon.svg"
      }
    },
    "featureList": [
      "Native Rust backend with gRPC IPC",
      "VS Code API compatibility through Cocoon",
      "Effect-TS type-safe UI services",
      "Source build targets for macOS, Windows, and Linux",
      "Open source under CC0 license"
    ],
    "isAccessibleForFree": true
  }))) })}`, "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header", "client:component-export": "Header" })} ${renderComponent($$result2, "HomePage", HomePage, { "client:load": true, "MetaTitle": MetaTitle, "MetaDescription": MetaDescription, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage", "client:component-export": "HomePage" })} ${maybeRenderHead()}<div class="container mx-auto flex flex-wrap items-center justify-center gap-4 px-4 py-12 text-xs text-muted-foreground"> <picture> <img alt="Code Editor Land logo" title="Code Editor Land" src="/Asset/Logo/Glyph/Land.svg" width="24" height="24"> </picture> <span class="inline-flex items-center border border-green-200 bg-green-50 px-2.5 py-0.5 font-medium text-green-700">
Telemetry Feature Gated&#x2001;<span class="h-1.5 w-1.5 rounded-none bg-green-500" aria-hidden="true"></span> </span> <span class="inline-flex items-center border border-green-200 bg-green-50 px-2.5 py-0.5 align-middle font-medium text-green-700">
CC0 Licensed&#x2001;<img src="/Image/CC0.svg" alt="" width="14" height="14" class="inline-block align-middle opacity-70" aria-hidden="true"> </span> <span class="inline-flex items-center border border-blue-200 bg-blue-50 px-2.5 py-0.5 align-middle font-medium text-blue-700">
Rust&#x2001;<img src="/Image/Rust.svg" alt="" width="14" height="14" class="inline-block align-middle opacity-70" aria-hidden="true">&#x2001;+&#x2001;Tauri&#x2001;<img src="/Image/Tauri.svg" alt="" width="14" height="14" class="inline-block align-middle opacity-70" aria-hidden="true"> </span> <span class="inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-2.5 py-0.5 font-medium">
VS Code API In Progress
</span> <a href="https://PlayForm.Cloud" target="_blank" rel="noopener noreferrer" class="inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-2.5 py-0.5 font-medium transition-colors hover:text-foreground">
PlayForm
</a> <a href="https://editor.land" class="inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-2.5 py-0.5 font-medium transition-colors hover:text-foreground">
CodeEditorLand
</a> </div> ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/index.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
