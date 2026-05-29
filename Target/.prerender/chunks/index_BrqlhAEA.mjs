import { c as createComponent } from './astro-component_X770d8M8.mjs';
import 'piccolore';
import { w as renderComponent, B as renderTemplate, v as maybeRenderHead, e as Fragment$1, D as unescapeHTML } from './prerender_AmZqEYF9.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useTranslation } from 'react-i18next';
import { I as IconTooltip, E as ErrorBoundary, G as GetI18n, $ as $$Base } from './Base_BgDg_fIU.mjs';
import { H as Header } from './Header_BboC7_kl.mjs';
import { b as SkeletonFeatureCard, c as SkeletonPricingTier, a as SkeletonCard } from './Skeleton_BJEu2kTq.mjs';
import * as lucide from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { R as RichText } from './DynamicDocSidebar_BNJ18hBi.mjs';
import { B as Badge, D as DynamicPlatformGrid } from './Badge_BFQSLuto.mjs';
import { D as DynamicButton } from './DynamicButton_CZKr9cpO.mjs';

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
      const StaccatoModule = await import('./Staccato_BAc0H6Ny.mjs');
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
      className: `flex min-h-[100dvh] w-full flex-col justify-center bg-[var(--Mute)] py-24 sm:py-32 ${ClassName || ""}`,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        (Title || Subtitle) && /* @__PURE__ */ jsxs("div", { className: "StaccatoBreath mx-auto mb-24 max-w-2xl text-center", children: [
          Title && /* @__PURE__ */ jsx(
            "h2",
            {
              id: "FeaturesHeading",
              className: "text-2xl font-semibold tracking-tight sm:text-3xl",
              children: Title
            }
          ),
          Subtitle && /* @__PURE__ */ jsx("div", { className: "mt-3 text-[var(--MuteForeground)]", children: /* @__PURE__ */ jsx(RichText, { Text: Subtitle }) })
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
                  title: Feature.Id === "performance" ? "Mountain and Echo run native Rust services\nthrough Tauri outside the WebView,\ndispatched via ActionEffect." : Feature.Id === "compatibility" ? "Cocoon extension host runs\nunmodified VS Code extensions\nvia Effect-TS across a dual-track architecture." : Feature.Id === "architecture" ? "Effect-TS Layer stacks provide:\n• Typed errors\n• Structured concurrency\n• Compile-time dependency tracking" : Feature.Id === "cross-platform" ? "Tauri compiles one codebase\nto native macOS, Windows, and Linux apps\nvia platform WebViews." : Feature.Id === "tooling" ? "Built on:\n• Rust\n• Tauri\n• Effect-TS\n• Biome\n• OXC\n\nFor modern developer tooling." : Feature.Id === "opensource" ? "CC0 1.0 Universal\npublic domain dedication.\n\nFunded by NLnet NGI0 Commons Fund." : void 0,
                  className: "FeatureCard StaccatoCard flex flex-col space-y-6 rounded-none bg-white p-8",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: Feature.Title }),
                      /* @__PURE__ */ jsx("div", { className: "ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-[var(--Mute)]", children: /* @__PURE__ */ jsx(
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
      const StaccatoModule = await import('./Staccato_BAc0H6Ny.mjs');
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
        /* @__PURE__ */ jsxs("h1", { className: "StaccatoColorShift mx-auto max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl lg:text-8xl", children: [
          Title,
          Title && TitleHighlight ? " " : "",
          TitleHighlight && /* @__PURE__ */ jsx("span", { children: TitleHighlight })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "StaccatoBreath mx-auto mt-3 max-w-2xl text-[var(--MuteForeground)]", children: /* @__PURE__ */ jsx(RichText, { Text: Subtitle }) }),
        /* @__PURE__ */ jsxs("div", { className: "mb-16 mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:[&>button]:w-auto", children: [
          /* @__PURE__ */ jsx(DynamicButton, { Content: PrimaryCTA }),
          SecondaryCTA && /* @__PURE__ */ jsx(DynamicButton, { Content: SecondaryCTA })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 font-semibold uppercase tracking-[0.16em] text-muted-foreground", children: "Tech Stack" }),
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
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "StaccatoCard bg-[var(--Mute)] p-3",
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
                          Color: GetIconColor()
                        }
                      ) }),
                      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsx("div", { className: "font-medium text-foreground", children: Card.Title }),
                        Card.Colors && Card.Colors.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-1.5 flex items-center justify-center gap-1.5", children: Card.Colors.map(
                          (Color, ColorIndex) => /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: "StaccatoRhythmDot h-3 w-3 bg-[var(--Mute)]",
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
                    /* @__PURE__ */ jsx("div", { className: "StaccatoLogo absolute left-1/2 top-1/2 z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden bg-[var(--Mute)]", children: /* @__PURE__ */ jsx(
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
                      return /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: "FloatingCard StaccatoBorderShimmer StaccatoShadowLift absolute z-50 w-36 transform-gpu bg-[var(--Mute)] p-3",
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
                                Color: GetIconColor()
                              }
                            ) }),
                            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                              /* @__PURE__ */ jsx("div", { className: "font-medium text-foreground", children: Card.Title }),
                              Card.Colors && Card.Colors.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-1.5 flex items-center justify-center gap-1.5", children: Card.Colors.map(
                                (Color, ColorIndex) => /* @__PURE__ */ jsx(
                                  "div",
                                  {
                                    className: "StaccatoRhythmDot h-3 w-3 bg-[var(--Mute)]",
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
      className: `flex min-h-[100dvh] w-full flex-col justify-center py-24 sm:py-32 ${ClassName || ""}`,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        (Title || Subtitle) && /* @__PURE__ */ jsxs("div", { className: "StaccatoBreath mx-auto mb-24 max-w-2xl text-center", children: [
          Title && /* @__PURE__ */ jsx(
            "h2",
            {
              id: "PricingHeading",
              className: "text-2xl font-semibold tracking-tight sm:text-3xl",
              children: Title
            }
          ),
          Subtitle && /* @__PURE__ */ jsx("div", { className: "mt-3 text-[var(--MuteForeground)]", children: /* @__PURE__ */ jsx(RichText, { Text: Subtitle }) })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: GridReference,
            className: "mx-auto grid max-w-4xl grid-cols-1 gap-12 md:grid-cols-2",
            children: DisplayTier.map((Tier) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: `PricingCard StaccatoCard flex flex-col rounded-none bg-white ${Tier.Highlighted || Tier.Popular ? "" : ""} ${Tier.Status && Tier.Status !== "Ready" ? "opacity-75" : ""}`,
                "aria-disabled": Tier.Status && Tier.Status !== "Ready" ? true : void 0,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "border-b border-[var(--Border)] p-8", children: [
                    Tier.Popular && /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx("span", { className: "StaccatoBadge StaccatoRhythmBeat font-semibold uppercase tracking-wider text-primary", children: PopularLabel }) }),
                    Tier.Status && Tier.Status !== "Ready" && /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx("span", { className: "StaccatoBadge bg-[var(--Mute)] px-2 py-0.5 font-semibold uppercase tracking-wider text-muted-foreground", children: Tier.Status === "WIP" ? "WIP" : "Coming Soon" }) }),
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
                    Tier.Description && /* @__PURE__ */ jsx("div", { className: "StaccatoBreath text-muted-foreground", children: /* @__PURE__ */ jsx(RichText, { Text: Tier.Description }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col p-8", children: [
                    Tier.Elements && Tier.Elements.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx("p", { className: "mb-3 font-semibold uppercase tracking-wider text-muted-foreground", children: "Elements" }),
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
                                    className: "font-semibold",
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
                                Sub1 && /* @__PURE__ */ jsx("span", { className: "text-foreground", children: /* @__PURE__ */ jsx(
                                  RichText,
                                  {
                                    Text: Sub1,
                                    Terms: true
                                  }
                                ) }),
                                Sub2 && /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: /* @__PURE__ */ jsx(
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
                      Tier.Elements && Tier.Elements.length > 0 && /* @__PURE__ */ jsx("p", { className: "mb-3 font-semibold uppercase tracking-wider text-muted-foreground", children: "Roadmap" }),
                      /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: Tier.Features.map(
                        (Feature, FeatureIndex) => /* @__PURE__ */ jsxs(
                          "li",
                          {
                            className: `flex items-start justify-between gap-2 ${Tier.Status && Tier.Status !== "Ready" ? "opacity-70" : ""}`,
                            children: [
                              /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsx(
                                RichText,
                                {
                                  Text: Feature,
                                  Terms: true
                                }
                              ) }),
                              Tier.Status && Tier.Status !== "Ready" ? /* @__PURE__ */ jsx("span", { className: "StaccatoBadge shrink-0 bg-[var(--Mute)] px-2 py-0.5 font-medium text-muted-foreground", children: Tier.Status === "WIP" ? "WIP" : "Coming Soon" }) : /* @__PURE__ */ jsx(
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
  const GridReference = useRef(null);
  const IsMasonry = Columns === "masonry";
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
      const StaccatoModule = await import('./Staccato_BAc0H6Ny.mjs');
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
  if (IsMasonry) {
    return /* @__PURE__ */ jsx(
      "section",
      {
        id: "testimonials",
        "aria-label": "Architecture",
        className: `flex min-h-[100dvh] w-full flex-col justify-center bg-[var(--Mute)] py-24 sm:py-32 ${ClassName || ""}`,
        children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          (Title || Subtitle) && /* @__PURE__ */ jsxs("div", { className: "StaccatoBreath mx-auto mb-24 max-w-2xl text-center", children: [
            Title && /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold tracking-tight sm:text-3xl", children: Title }),
            Subtitle && /* @__PURE__ */ jsx("div", { className: "mt-3 text-[var(--MuteForeground)]", children: /* @__PURE__ */ jsx(RichText, { Text: Subtitle }) })
          ] }),
          /* @__PURE__ */ jsx(
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
                return /* @__PURE__ */ jsxs(
                  "article",
                  {
                    className: "MasonryCard TestimonialCard StaccatoCard flex flex-col rounded-none bg-white p-6 lg:p-8",
                    style: {
                      borderLeftColor: AccentColor,
                      borderLeftWidth: "2px",
                      "--masonry-col": ColSpan
                    },
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "mb-4", children: RenderStars(Testimonial.Rating) }),
                      /* @__PURE__ */ jsx("blockquote", { className: "StaccatoBreath mb-6 flex-1", children: /* @__PURE__ */ jsxs("div", { className: "text-base leading-relaxed lg:text-lg", children: [
                        (Testimonial.Rating ?? 0) > 0 && /* @__PURE__ */ jsx(
                          "span",
                          {
                            className: "text-muted-foreground/50",
                            "aria-hidden": "true",
                            children: '"'
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          RichText,
                          {
                            Text: Testimonial.Quote
                          }
                        ),
                        (Testimonial.Rating ?? 0) > 0 && /* @__PURE__ */ jsx(
                          "span",
                          {
                            className: "text-muted-foreground/50",
                            "aria-hidden": "true",
                            children: '"'
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
                        (Testimonial.Role || Testimonial.Company) && /* @__PURE__ */ jsxs("p", { className: "StaccatoBreath text-muted-foreground", children: [
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
  }
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "testimonials",
      "aria-label": "Architecture",
      className: `flex min-h-[100dvh] w-full flex-col justify-center bg-[var(--Mute)] py-24 sm:py-32 ${ClassName || ""}`,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        (Title || Subtitle) && /* @__PURE__ */ jsxs("div", { className: "StaccatoBreath mx-auto mb-24 max-w-2xl text-center", children: [
          Title && /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold tracking-tight sm:text-3xl", children: Title }),
          Subtitle && /* @__PURE__ */ jsx("div", { className: "mt-3 text-[var(--MuteForeground)]", children: /* @__PURE__ */ jsx(RichText, { Text: Subtitle }) })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: GridReference,
            className: `StaccatoMorphGap grid ${ColumnClass[Columns] ?? ColumnClass[3]} mx-auto gap-12`,
            children: Testimonials.map((Testimonial) => {
              const AccentColor = TestimonialColorMap[Testimonial.Id] ?? "var(--Primary)";
              return /* @__PURE__ */ jsxs(
                "article",
                {
                  className: "TestimonialCard StaccatoCard flex flex-col rounded-none bg-white p-8",
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
                          children: '"'
                        }
                      ),
                      /* @__PURE__ */ jsx(RichText, { Text: Testimonial.Quote }),
                      (Testimonial.Rating ?? 0) > 0 && /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "text-muted-foreground/50",
                          "aria-hidden": "true",
                          children: '"'
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
                      (Testimonial.Role || Testimonial.Company) && /* @__PURE__ */ jsxs("p", { className: "StaccatoBreath text-muted-foreground", children: [
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
        defaultValue: "A code editor rebuilt on Rust, Tauri, and Effect-TS. VS Code extension API compatibility is the target. Source-build today; installers in progress."
      }),
      PrimaryCta: {
        Text: T("common:button.download", {
          defaultValue: "Download"
        }),
        Variant: "default",
        Size: "lg",
        Icon: "Download",
        Href: "/Download"
      },
      SecondaryCta: {
        Text: T("common:button.learnMore", {
          defaultValue: "Source"
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
        defaultValue: "Built differently"
      }),
      Subtitle: T("home:features.subtitle", {
        defaultValue: "Native services, typed IPC, and a compatibility host you can read in source."
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
              defaultValue: "Mountain handles window management, file I/O, child processes, terminal IPC, and extension communication through Tauri - using the ActionEffect system for declarative, dispatchable operations. Echo provides work-stealing scheduler primitives for bounded background work.\n\nThat gives Land a native path to move heavy editor work out of the WebView without claiming benchmark numbers before a reproducible suite exists."
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
              defaultValue: "Cocoon hosts existing VS Code extensions using Effect-TS through a dual-track architecture: Track A loads unmodified extHost sources for maximum compatibility, Track B routes I/O-heavy operations to Mountain through gRPC. The vscode API shim covers commands, workspace, terminals, webviews, language providers, and diagnostics.\n\nExtensions run unmodified through the active compatibility path. Marketplace-wide coverage still depends on each extension API usage and on services still being filled in."
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
              defaultValue: "Effect-TS gives Cocoon and Wind typed errors, scoped resources, explicit cancellability, and supervised concurrency for extension-host and workbench services. Wind composes services into Layer stacks that target specific runtimes - native, compatibility, or test - with compile-time dependency tracking.\n\nThat does not remove every runtime bug, but it does make failure paths explicit and traceable through the services Land controls."
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
              defaultValue: "Tauri uses the OS WebView on each platform instead of a bundled Chromium instance. Mountain's desktop path has no embedded browser engine. Per-platform binary management keeps cross-compilation paths explicit and reproducible.\n\nThe repository includes macOS, Windows, and Linux build configuration. macOS is the primary path, with Windows and Linux installer coverage still being completed."
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
              defaultValue: "Air provides persistent background services for update downloads and verification, file indexing, cryptographic signing, and health monitoring. Runs as an independent daemon - persists when the main window closes.\n\nThose services are real source today. The public updater flow, signing story, and release distribution path are still being finished."
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
        defaultValue: "What's shipping"
      }),
      Subtitle: T("home:roadmap.subtitle", {
        defaultValue: "Milestones are described as source, integration, or release status. Funded by NLnet NGI0 Commons Fund."
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
        defaultValue: "Under the hood"
      }),
      Subtitle: T("home:architecture.subtitle", {
        defaultValue: "Fifteen elements replace VS Code's Electron stack piece by piece. Each one is described here by what its current source supports."
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
            defaultValue: "Persistent background daemon that offloads heavy operations from Mountain:\n• Update downloads with staged atomic rollback\n• File indexing and symbol extraction\n• Cryptographic signing and authentication\n• Health monitoring with multi-level checks\n\nPrometheus-compatible metrics and distributed tracing with sampling.\n\nRuns independently - persists when the main window closes.\n\nRelease signing and public installer delivery are still being completed"
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
            defaultValue: "Node.js sidecar that hosts and executes VS Code extensions.\n\nDual-track architecture:\n• Track A loads unmodified extHost sources for maximum compatibility\n• Track B routes I/O-heavy operations to Mountain through gRPC\n\nEffect-TS provides typed errors, scoped resources, and supervised concurrency across all services.\n\nCodegen pipeline walks VS Code extHost source to emit type schemas.\n\nCore API surfaces:\n• Commands\n• Workspace\n• Window\n• Terminal\n• Webview\n• Language providers\n• Diagnostics"
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
            defaultValue: "Pure abstract library - defines the contracts that all Rust components implement, not the implementations themselves.\n\nAsync traits for every service domain:\n• FileSystem\n• Terminal\n• Clipboard\n• Window\n• Configuration\n• Storage\n• Search\n• and more\n\nThe ActionEffect system treats every operation as declarative data - commands, events, and queries share a single type hierarchy across all layers.\n\nTransport-agnostic: supports gRPC, IPC, and WASM strategies.\n\nDual-pipe telemetry (PostHog + OTLP)."
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
            defaultValue: "Work-stealing task scheduler with lock-free queues for bounded background execution.\n\nPriority tiers:\n• High\n• Normal\n• Low\n\nEnsures UI responsiveness stays predictable under I/O load.\n\nWorkers consume from local queues and steal from peers when idle.\n\nIntegrates with the ActionEffect system for cancelable, supervised tasks.\n\nGraceful shutdown paths keep resources from leaking when services terminate."
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
            defaultValue: "WebAssembly sandbox for running extensions in capability-isolated environments.\n\nWASMtime provides:\n• Memory limits\n• Resource controls\n• Fine-grained capability gates\n\nExtensions cannot access host APIs unless explicitly granted.\n\nMultiple transport strategies:\n• gRPC\n• IPC\n• Direct WASM host function calls\n\nShares the same VS Code API surface as Cocoon.\n\nComplements Cocoon's Node.js path with a sandboxed execution alternative."
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
            defaultValue: "Build system using an embedded Rhai scripting engine for flexible cross-element orchestration.\n\nManages build profiles across the Land ecosystem:\n• Development\n• Debug\n• Release\n\nType-safe editing of Cargo.toml and project configuration through scriptable resolvers.\n\nDeterministic release claims are held until the public release pipeline is fully published."
          })
        },
        {
          Id: "Mist",
          Emoji: "🌫️",
          Href: "https://github.com/CodeEditorLand/Mist",
          Author: "Mist",
          Role: T("home:architecture.mist.subtitle", {
            defaultValue: "Local DNS Sandbox - *.land.playform.cloud Resolution - Network Boundary"
          }),
          Quote: T("home:architecture.mist.description", {
            defaultValue: "Local DNS server authoritative for the land.playform.cloud zone - all subdomains resolve to loopback, keeping internal services off the network.\n\nForward allowlisting controls which external domains sidecar processes can reach; everything else is blocked at the DNS layer.\n\nSecurity model:\n• ECDSA DNSSEC signing verifies zone integrity\n• Loopback binding only - no external port exposure\n\nProvides network isolation for Cocoon and Air processes so they cannot leak data to arbitrary hosts."
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
            defaultValue: "Primary native backend and Tauri application shell - replaces the Electron main process entirely.\n\nImplements all service traits from Common through the declarative ActionEffect system:\n• Windows\n• Files\n• Terminals\n• Clipboard\n• Dialogs\n• Process control\n• OS keychain\n\nHosts the gRPC server for cross-process communication with Cocoon, Air, and Grove.\n\nOrchestrates sidecar lifecycle and manages application state across all connected processes."
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
            defaultValue: "Build orchestration for VS Code platform source code.\n\nDual-compiler pipeline:\n• Primary ESBuild\n• Optional Rust-native compiler path for faster TypeScript compilation\n\nPlugin-routed transforms handle:\n• Module resolution remapping\n• Define substitution\n• CSS import interception\n• Dead code elimination\n\nEnvironment-variable-driven compiler selection.\n\nPlatform code markers separate platform-specific and cross-platform code at the source level.\n\nConsumed by Cocoon, Sky, and Wind as the shared compilation output."
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
            defaultValue: "Rust-native TypeScript compilation pipeline built on the OXC toolchain - parser, transformer, and codegen in one process.\n\nHandles:\n• Decorator metadata emission\n• Legacy class field semantics\n• JSX\n• Parallel compilation\n\nSelectable as an alternative compiler to reduce reliance on Node-hosted compilation paths.\n\nSource maps and public benchmark claims remain integration work."
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
            defaultValue: "Manages pre-compiled platform-specific Node.js binaries for each target platform.\n\nCompile-time binary selection ensures the right runtime is available without runtime detection or download delays.\n\nIntegrity verification and cache management keep sidecar deployments deterministic and reproducible across build environments."
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
            defaultValue: "Renders the editor interface in the OS WebView using Astro component islands for efficient rendering.\n\nSkyBridge routes Tauri events to VS Code workbench APIs, translating runtime channels into workbench calls.\n\nSupports multiple workbench layouts that adapt the UI layer to different runtimes:\n• Browser proxy\n• Mountain-native\n• Electron\n\nSmart variant selection with conditional imports and tree-shaking keeps the bundle size target-specific."
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
            defaultValue: "Protocol definitions for gRPC communication between Mountain, Cocoon, Air, and Grove.\n\nCurrent proto contracts live in Mountain/Proto/ and Cocoon:\n• Vine.proto - editor-host IPC\n• Spine.proto - extension coordination\n• Grove.proto - WASM extension protocols\n\nCentralized consolidation into the Vine element is planned as the protocol surface stabilizes."
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
            defaultValue: "UI service layer that recreates the VS Code workbench environment inside the Tauri WebView.\n\nEffect-TS services cover:\n• IPC\n• Configuration\n• Editor\n• Terminal\n• Clipboard\n• Dialog\n• FileSystem\n• Window\n• Search\n\nEach with explicit typed error handling and compile-time dependency tracking.\n\nComposed into Layer stacks that target specific runtimes:\n• Tauri (native)\n• Electron (compatibility)\n• Test (isolated)\n\nPreload shim establishes the bridge between VS Code workbench expectations and the Tauri runtime environment."
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
            defaultValue: "Service worker that provides offline caching and dynamic CSS import handling for the web shell.\n\nCaching strategy:\n• Network-first for navigation requests\n• Cache-first for static assets\n\nIntercepts JavaScript imports of CSS files and injects them as <link> tags - handles VS Code's pattern of importing stylesheets as JS modules.\n\nAutomatic update detection with client reload when a new version is available."
          })
        }
      ],
      Columns: "masonry"
    },
    Download: {
      Title: T("download:title", { defaultValue: "Download" }),
      Subtitle: T("download:subtitle", {
        defaultValue: "Source builds today. Public installers, signing, and verification artifacts are being prepared."
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
            const { default: DownloadAPI } = await import('./Download_BT9wzUQ6.mjs');
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
          defaultValue: "Rust and Tauri editor stack. CC0."
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
      /* @__PURE__ */ jsx(
        ErrorBoundary,
        {
          FallbackComponent: () => /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3", children: [1, 2, 3, 4, 5, 6].map((Index) => /* @__PURE__ */ jsx(SkeletonFeatureCard, {}, Index)) }),
          children: /* @__PURE__ */ jsx(DynamicFeatures, { Content: Features })
        }
      ),
      /* @__PURE__ */ jsx(
        ErrorBoundary,
        {
          FallbackComponent: () => /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3", children: [1, 2, 3].map((Index) => /* @__PURE__ */ jsx(SkeletonPricingTier, {}, Index)) }),
          children: /* @__PURE__ */ jsx(DynamicPricing, { Content: Pricing })
        }
      ),
      /* @__PURE__ */ jsx(
        ErrorBoundary,
        {
          FallbackComponent: () => /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3", children: [1, 2, 3].map((Index) => /* @__PURE__ */ jsx(SkeletonCard, {}, Index)) }),
          children: /* @__PURE__ */ jsx(DynamicTestimonials, { Content: Testimonials })
        }
      ),
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
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
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
    "url": Astro2.site?.href ?? "",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "macOS, Windows, Linux",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "license": "https://creativecommons.org/publicdomain/zero/1.0/",
    "softwareVersion": "Pre-release",
    "downloadUrl": `${Astro2.site?.href ?? ""}Download`,
    "screenshot": `${Astro2.site?.href ?? ""}Favicon/og-image.png`,
    "author": [
      {
        "@type": "Person",
        "name": "Nikola R. Hristov",
        "url": "https://github.com/NikolaRHristov"
      },
      {
        "@type": "Organization",
        "name": "Code Editor Land",
        "url": Astro2.site?.href ?? ""
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
      "url": Astro2.site?.href ?? "",
      "logo": {
        "@type": "ImageObject",
        "url": `${Astro2.site?.href ?? ""}Favicon/favicon.svg`
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
  }))) })}`, "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header", "client:component-export": "Header" })} ${renderComponent($$result2, "HomePage", HomePage, { "client:load": true, "MetaTitle": MetaTitle, "MetaDescription": MetaDescription, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage", "client:component-export": "HomePage" })} ${maybeRenderHead()}<div class="container mx-auto flex flex-wrap items-center justify-center gap-4 px-4 py-12 text-muted-foreground"> <picture> <img alt="Code Editor Land logo" title="Code Editor Land" src="/Asset/Logo/Glyph/Land.svg" width="24" height="24"> </picture> <span class="inline-flex items-center border border-green-200 bg-green-50 px-2.5 py-0.5 font-medium text-green-700">
Telemetry Feature Gated&#x2001;<span class="h-1.5 w-1.5 rounded-none bg-green-500" aria-hidden="true"></span> </span> <span class="inline-flex items-center border border-green-200 bg-green-50 px-2.5 py-0.5 align-middle font-medium text-green-700">
CC0 Licensed&#x2001;<img src="/Image/CC0.svg" alt="" width="14" height="14" class="inline-block align-middle opacity-70" aria-hidden="true"> </span> <span class="inline-flex items-center border border-blue-200 bg-blue-50 px-2.5 py-0.5 align-middle font-medium text-blue-700">
Rust&#x2001;<img src="/Image/Rust.svg" alt="" width="14" height="14" class="inline-block align-middle opacity-70" aria-hidden="true">&#x2001;+&#x2001;Tauri&#x2001;<img src="/Image/Tauri.svg" alt="" width="14" height="14" class="inline-block align-middle opacity-70" aria-hidden="true"> </span> <span class="inline-flex items-center bg-[var(--Mute)] px-2.5 py-0.5 font-medium">
VS Code API In Progress
</span> <a href="https://PlayForm.Cloud" target="_blank" rel="noopener noreferrer" class="inline-flex items-center bg-[var(--Mute)] px-2.5 py-0.5 font-medium transition-colors hover:text-foreground">
PlayForm
</a> <a href="/" class="inline-flex items-center bg-[var(--Mute)] px-2.5 py-0.5 font-medium transition-colors hover:text-foreground">
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
