import { I as IconTooltip, c as createComponent, G as GetI18n, $ as $$Base } from './Base_DGQ8XLTY.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead, F as Fragment$1, u as unescapeHTML } from './prerender_intPnryP.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useTranslation } from 'react-i18next';
import { H as Header } from './Header_B14fNQtY.mjs';
import * as lucide from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { B as Badge, D as DynamicPlatformGrid } from './Badge_B2XwUIyC.mjs';
import { D as DynamicButton } from './DynamicButton_DfMoFOaO.mjs';

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
  compatibility: "var(--SpineIPC)",
  architecture: "var(--ExtensionEffectTypeScript)",
  "cross-platform": "var(--OSMacOS)",
  tooling: "var(--ToolBiome)",
  opensource: "var(--SpinegRPC)"
};
const FeatureIconLabelMap = {
  Zap: "Performance",
  Box: "Compatibility",
  Cpu: "Architecture",
  Globe: "Cross-Platform",
  Wrench: "Tooling",
  Heart: "Open Source",
  Sparkles: "Features",
  Code: "Code",
  Layers: "Layers",
  Package: "Package",
  Puzzle: "Extensions",
  Server: "Server",
  Shield: "Security",
  Database: "Storage"
};
const DynamicFeatures = ({ content, className }) => {
  const { title, subtitle, features, columns = 3, gap = "lg" } = content;
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
      const AttentionModule = await import('./Attention_DKdtZrik.mjs');
      const Attention = await AttentionModule.default;
      const Cards = Grid.querySelectorAll(".FeatureCard");
      Cards.forEach((Card, Index) => {
        Attention.ApplyToElement(Card, Index, 6, 4);
      });
      const StaccatoModule = await import('./Staccato_CnSaGaNM.mjs');
      const Engine = await StaccatoModule.default;
      Engine.SeedSelector(".FeatureCard");
    };
    ApplyScatter();
  }, [features]);
  const GetIcon = (IconName) => FeatureIconRegistry[IconName] || null;
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "features",
      "aria-label": "Features",
      className: `flex min-h-[100dvh] w-full flex-col justify-center py-16 ${className || ""}`,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        (title || subtitle) && /* @__PURE__ */ jsxs("div", { className: "StaccatoBreath mb-16 text-center", children: [
          title && /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl", children: title }),
          subtitle && /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: subtitle })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: GridReference,
            className: `StaccatoMorphGap grid ${ColumnClass[columns]} ${GapClass[gap]} mx-auto max-w-6xl`,
            children: features.map((Feature) => {
              const Icon = GetIcon(Feature.icon);
              const IconLabel = FeatureIconLabelMap[Feature.icon] ?? Feature.title;
              const FeatureColor = FeatureColorMap[Feature.id] ?? "var(--Primary)";
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "FeatureCard StaccatoCard StaccatoBorderShimmer flex flex-col space-y-4 rounded-none border border-[var(--Border)] bg-white p-6",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: Feature.title }),
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
                      Feature.description,
                      Feature.icons && Feature.icons.length > 0 && /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "inline-flex items-center align-middle",
                          role: "img",
                          "aria-label": `${Feature.title} technology stack`,
                          children: Feature.icons.map(
                            (IconName, IconIndex) => {
                              const StackIcon = FeatureIconRegistry[IconName];
                              const StackLabel = FeatureIconLabelMap[IconName] ?? IconName;
                              if (!StackIcon)
                                return null;
                              return /* @__PURE__ */ jsxs(
                                "span",
                                {
                                  className: "inline-flex items-center",
                                  children: [
                                    IconIndex === 0 ? " " : /* @__PURE__ */ jsxs(Fragment, { children: [
                                      " ",
                                      " "
                                    ] }),
                                    /* @__PURE__ */ jsx(
                                      IconTooltip,
                                      {
                                        Label: StackLabel,
                                        Icon: StackIcon,
                                        Color: FeatureColor,
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
                Feature.id
              );
            })
          }
        )
      ] })
    }
  );
};

const DynamicBadge = ({ content, className }) => {
  const {
    text,
    variant = "default",
    showDot = false,
    dotColor = "green",
    className: ContentClassName,
    ...props
  } = content;
  const DotColor = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    blue: "bg-blue-500"
  };
  return /* @__PURE__ */ jsxs(
    Badge,
    {
      variant,
      className: `StaccatoBadge ${ContentClassName || ""} ${className || ""}`,
      ...props,
      children: [
        text,
        showDot && /* @__PURE__ */ jsxs(Fragment, { children: [
          " ",
          /* @__PURE__ */ jsx(
            "span",
            {
              className: `StaccatoDot StaccatoRhythmDot h-2 w-2 rounded-none ${DotColor[dotColor]}`,
              "aria-hidden": "true"
            }
          )
        ] })
      ]
    }
  );
};

const DynamicHeroSection = ({ content, className }) => {
  const SceneReference = useRef(null);
  const SectionReference = useRef(null);
  const {
    title: Title,
    titleHighlight: TitleHighlight,
    subtitle: Subtitle,
    primaryCta: PrimaryCTA,
    secondaryCta: SecondaryCTA,
    floatingCards: FloatingCard = [],
    ...HeroConfiguration
  } = content;
  useEffect(() => {
    const Scene = SceneReference.current;
    if (!Scene || HeroConfiguration.respectReducedMotion && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const CardElement = Scene.querySelectorAll(".FloatingCard");
    let FrameIdentifier;
    let NoiseFunction = null;
    const STEP = 6;
    const Quantize = (Value, Step) => Math.floor(Value * Step) / Step;
    const LoadNoise = async () => {
      const { createNoise2D } = await import('simplex-noise');
      NoiseFunction = createNoise2D();
      const StaccatoModule = await import('./Staccato_CnSaGaNM.mjs');
      const Engine = await StaccatoModule.default;
      CardElement.forEach((Card, Index) => {
        Engine.SeedElement(Card, Index);
      });
      const AttentionModule = await import('./Attention_DKdtZrik.mjs');
      const Attention = await AttentionModule.default;
      Attention.ApplyToSelector(".FloatingCard", 8, 6);
    };
    const AnimateCards = (Time) => {
      if (!NoiseFunction) {
        FrameIdentifier = requestAnimationFrame(AnimateCards);
        return;
      }
      CardElement.forEach((Card, Index) => {
        const Element = Card;
        const Seed = Index * 0.7;
        const TimeFactor = Time * 3e-4;
        const RawX = NoiseFunction(TimeFactor + Seed, 0);
        const RawY = NoiseFunction(0, TimeFactor + Seed);
        const X = Quantize(RawX, STEP) * 18;
        const Y = Quantize(RawY, STEP) * 12;
        Element.style.transform = `translate(-50%, -50%) translate3d(${X}px, ${Y}px, 0)`;
      });
      FrameIdentifier = requestAnimationFrame(AnimateCards);
    };
    LoadNoise();
    FrameIdentifier = requestAnimationFrame(AnimateCards);
    return () => cancelAnimationFrame(FrameIdentifier);
  }, [HeroConfiguration.respectReducedMotion]);
  const HandleHeroClick = () => {
    if (PrimaryCTA?.href) {
      window.location.href = PrimaryCTA.href;
    }
  };
  return /* @__PURE__ */ jsx(
    "section",
    {
      ref: SectionReference,
      id: "hero",
      "aria-label": "Hero",
      className: `StaccatoHeroButton relative flex min-h-[200dvh] w-full items-center overflow-hidden py-16 lg:py-24 ${className || ""}`,
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
        content.badge && /* @__PURE__ */ jsx(
          DynamicBadge,
          {
            content: content.badge,
            className: "StaccatoBadge mb-6"
          }
        ),
        /* @__PURE__ */ jsxs("h1", { className: "StaccatoColorShift mx-auto mb-6 max-w-4xl text-4xl tracking-tight md:text-6xl lg:text-7xl", children: [
          Title,
          " ",
          TitleHighlight && /* @__PURE__ */ jsx("span", { className: "text-primary", children: TitleHighlight })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:[&>button]:w-auto", children: [
          /* @__PURE__ */ jsx(DynamicButton, { content: PrimaryCTA }),
          SecondaryCTA && /* @__PURE__ */ jsx(DynamicButton, { content: SecondaryCTA })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "StaccatoBreath mx-auto mb-12 max-w-2xl text-lg text-muted-foreground", children: Subtitle }),
        /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-5xl", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center justify-center gap-3 lg:hidden", children: FloatingCard.map((Card, Index) => {
            const GetIcon = () => {
              const Title2 = Card.title.toLowerCase();
              if (Title2.includes("rust") || Title2.includes("core")) return lucide.Cpu;
              if (Title2.includes("tauri") || Title2.includes("ui")) return lucide.Box;
              if (Title2.includes("effect") || Title2.includes("service")) return lucide.Layers;
              if (Title2.includes("grpc") || Title2.includes("ipc")) return lucide.Network;
              if (Title2.includes("extension")) return lucide.Puzzle;
              if (Title2.includes("cross") || Title2.includes("platform")) return lucide.Globe;
              if (Title2.includes("vs code") || Title2.includes("api")) return lucide.Server;
              if (Title2.includes("open") || Title2.includes("source")) return lucide.Zap;
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
                      Label: Card.title,
                      Icon: IconComponent,
                      SizeClass: "h-6 w-6",
                      ClassName: "text-primary"
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-foreground", children: Card.title }),
                    Card.colors && Card.colors.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-1.5 flex items-center justify-center gap-1.5", children: Card.colors.map((Color, ColorIndex) => /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `StaccatoRhythmDot h-3 w-3 ${Color} border border-[var(--Border)]`
                      },
                      ColorIndex
                    )) })
                  ] })
                ]
              },
              Card.id
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
                  const RadiusX = 38;
                  const RadiusY = 35;
                  const CenterX = 50 + Math.cos(Angle) * RadiusX;
                  const CenterY = 50 + Math.sin(Angle) * RadiusY;
                  const GetIcon = () => {
                    const Title2 = Card.title.toLowerCase();
                    if (Title2.includes("rust") || Title2.includes("core")) return lucide.Cpu;
                    if (Title2.includes("tauri") || Title2.includes("ui")) return lucide.Box;
                    if (Title2.includes("effect") || Title2.includes("service")) return lucide.Layers;
                    if (Title2.includes("grpc") || Title2.includes("ipc")) return lucide.Network;
                    if (Title2.includes("extension")) return lucide.Puzzle;
                    if (Title2.includes("cross") || Title2.includes("platform")) return lucide.Globe;
                    if (Title2.includes("vs code") || Title2.includes("api")) return lucide.Server;
                    if (Title2.includes("open") || Title2.includes("source")) return lucide.Zap;
                    return lucide.Cpu;
                  };
                  const IconComponent = GetIcon();
                  return /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "FloatingCard StaccatoBorderShimmer StaccatoShadowLift absolute transform-gpu border border-[var(--Border)] bg-white p-3 w-36",
                      style: {
                        top: `${CenterY}%`,
                        left: `${CenterX}%`,
                        transform: "translate(-50%, -50%)"
                      },
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "mb-2 flex items-center justify-center", children: /* @__PURE__ */ jsx(
                          IconTooltip,
                          {
                            Label: Card.title,
                            Icon: IconComponent,
                            SizeClass: "h-8 w-8",
                            ClassName: "text-primary"
                          }
                        ) }),
                        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                          /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-foreground", children: Card.title }),
                          Card.colors && Card.colors.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-1.5 flex items-center justify-center gap-1.5", children: Card.colors.map((Color, ColorIndex) => /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: `StaccatoRhythmDot h-3 w-3 ${Color} border border-[var(--Border)]`
                            },
                            ColorIndex
                          )) })
                        ] })
                      ]
                    },
                    Card.id
                  );
                }),
                HeroConfiguration.showConnectingLines && /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "StaccatoBreath pointer-events-none absolute inset-0 h-full w-full opacity-15",
                    "aria-hidden": "true",
                    role: "presentation",
                    children: FloatingCard.map((Card, Index) => {
                      const Total = FloatingCard.length;
                      const Angle = Index / Total * 2 * Math.PI - Math.PI / 2;
                      const RadiusX = 38;
                      const RadiusY = 35;
                      const CenterX = 50 + Math.cos(Angle) * RadiusX;
                      const CenterY = 50 + Math.sin(Angle) * RadiusY;
                      return /* @__PURE__ */ jsx(
                        "line",
                        {
                          x1: "50%",
                          y1: "50%",
                          x2: `${CenterX}%`,
                          y2: `${CenterY}%`,
                          stroke: "currentColor",
                          strokeWidth: "1"
                        },
                        Card.id
                      );
                    })
                  }
                )
              ]
            }
          )
        ] })
      ] })
    }
  );
};

const DynamicPricing = ({ content, className }) => {
  const { t: T } = useTranslation("home");
  const GridReference = useRef(null);
  const {
    title,
    subtitle,
    tiers,
    showMonthlyYearlyToggle = false,
    defaultYearly = false,
    labels = {}
  } = content;
  const MonthlyLabel = labels.monthly ?? T("pricing.labels.monthly", { defaultValue: "Monthly" });
  const YearlyLabel = labels.yearly ?? T("pricing.labels.yearly", { defaultValue: "Yearly" });
  const SavingsLabel = labels.savings ?? T("pricing.labels.savings", { defaultValue: "(Save up to 20%)" });
  const PopularLabel = labels.popular ?? T("pricing.labels.popular", { defaultValue: "Most Popular" });
  const PerMonthLabel = labels.perMonth ?? T("pricing.labels.perMonth", { defaultValue: "/month" });
  const PerYearLabel = labels.perYear ?? T("pricing.labels.perYear", { defaultValue: "/year" });
  const [IsYearly, SetIsYearly] = useState(defaultYearly);
  useEffect(() => {
    const Grid = GridReference.current;
    if (!Grid) return;
    const ReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (ReducedMotion) return;
    const ApplyScatter = async () => {
      const AttentionModule = await import('./Attention_DKdtZrik.mjs');
      const Attention = await AttentionModule.default;
      const Cards = Grid.querySelectorAll(".PricingCard");
      Cards.forEach((Card, Index) => {
        Attention.ApplyToElement(Card, Index, 4, 3);
      });
    };
    ApplyScatter();
  }, [tiers]);
  const FormatPrice = (Price, Currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: Currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Price);
  };
  const DisplayTier = tiers.map((Tier) => ({
    ...Tier,
    currentPrice: IsYearly ? Tier.price.yearly : Tier.price.monthly
  }));
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "pricing",
      "aria-label": "Roadmap",
      className: `flex min-h-[100dvh] w-full flex-col justify-center py-16 ${className || ""}`,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        (title || subtitle) && /* @__PURE__ */ jsxs("div", { className: "StaccatoBreath mb-16 text-center", children: [
          title && /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl", children: title }),
          subtitle && /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: subtitle })
        ] }),
        showMonthlyYearlyToggle && /* @__PURE__ */ jsxs("div", { className: "mb-12 flex items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: MonthlyLabel }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              role: "switch",
              "aria-checked": IsYearly,
              "aria-label": IsYearly ? T("pricing.toggle.toMonthly", {
                defaultValue: "Switch to {{label}} billing",
                label: MonthlyLabel
              }) : T("pricing.toggle.toYearly", {
                defaultValue: "Switch to {{label}} billing",
                label: YearlyLabel
              }),
              className: `StaccatoToggle relative inline-flex h-6 w-11 items-center rounded-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${IsYearly ? "bg-primary" : "bg-input"}`,
              onClick: () => SetIsYearly(!IsYearly),
              children: /* @__PURE__ */ jsx(
                "span",
                {
                  className: `inline-block h-4 w-4 transform rounded-none bg-white transition-transform ${IsYearly ? "translate-x-6" : "translate-x-1"}`
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: YearlyLabel }),
          IsYearly && /* @__PURE__ */ jsx("span", { className: "StaccatoBadge text-sm text-muted-foreground", children: SavingsLabel })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: GridReference,
            className: "mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",
            children: DisplayTier.map((Tier) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: `PricingCard StaccatoCard StaccatoBorderShimmer flex flex-col rounded-none border bg-white ${Tier.highlighted || Tier.popular ? "border-primary" : "border-[var(--Border)]"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "border-b border-[var(--Border)] p-6", children: [
                    Tier.popular && /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx("span", { className: "StaccatoBadge StaccatoRhythmBeat text-xs font-semibold uppercase tracking-wider text-primary", children: PopularLabel }) }),
                    /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(
                      DynamicButton,
                      {
                        content: {
                          ...Tier.cta,
                          fullWidth: true
                        }
                      }
                    ) }),
                    /* @__PURE__ */ jsx("h3", { className: "mb-2 text-2xl font-bold", children: Tier.name }),
                    Tier.description && /* @__PURE__ */ jsx("p", { className: "StaccatoBreath mb-4 text-sm text-muted-foreground", children: Tier.description }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-baseline", children: [
                      /* @__PURE__ */ jsx("span", { className: "StaccatoPrice text-4xl font-bold", children: Tier.currentPrice === 0 ? T("pricing.labels.free", {
                        defaultValue: "Free"
                      }) : FormatPrice(
                        Tier.currentPrice,
                        Tier.currency
                      ) }),
                      showMonthlyYearlyToggle && Tier.currentPrice > 0 && /* @__PURE__ */ jsx("span", { className: "ml-2 text-muted-foreground", children: IsYearly ? PerYearLabel : PerMonthLabel })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "flex flex-1 flex-col p-6", children: /* @__PURE__ */ jsx("ul", { className: "flex-1 space-y-3", children: Tier.features.map(
                    (Feature, FeatureIndex) => /* @__PURE__ */ jsxs(
                      "li",
                      {
                        className: "flex items-start justify-between gap-2",
                        children: [
                          /* @__PURE__ */ jsx("span", { className: "text-sm", children: Feature }),
                          /* @__PURE__ */ jsx(
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
                  ) }) })
                ]
              },
              Tier.id
            ))
          }
        )
      ] })
    }
  );
};

const TestimonialColorMap = {
  mountain: "var(--ExtensionRust)",
  cocoon: "var(--ExtensionEffectTypeScript)",
  wind: "var(--LanguageTypeScript)",
  sky: "var(--ExtensionTauri)",
  air: "var(--ExtensionRust)",
  echo: "var(--ExtensionRust)"
};
const DynamicTestimonials = ({ content, className }) => {
  const { title, subtitle, testimonials, columns = 3 } = content;
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
      const AttentionModule = await import('./Attention_DKdtZrik.mjs');
      const Attention = await AttentionModule.default;
      const Cards = Grid.querySelectorAll(".TestimonialCard");
      Cards.forEach((Card, Index) => {
        Attention.ApplyToElement(Card, Index, 5, 3);
      });
      const StaccatoModule = await import('./Staccato_CnSaGaNM.mjs');
      const Engine = await StaccatoModule.default;
      Engine.SeedSelector(".TestimonialCard");
    };
    ApplyScatter();
  }, [testimonials]);
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
      className: `flex min-h-[100dvh] w-full flex-col justify-center py-16 ${className || ""}`,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        (title || subtitle) && /* @__PURE__ */ jsxs("div", { className: "StaccatoBreath mb-16 text-center", children: [
          title && /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl", children: title }),
          subtitle && /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: subtitle })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: GridReference,
            className: `StaccatoMorphGap grid ${ColumnClass[columns]} mx-auto gap-8`,
            children: testimonials.map((Testimonial) => {
              const AccentColor = TestimonialColorMap[Testimonial.id] ?? "var(--Primary)";
              return /* @__PURE__ */ jsxs(
                "article",
                {
                  className: "TestimonialCard StaccatoCard StaccatoBorderShimmer flex flex-col rounded-none border border-[var(--Border)] bg-white p-6",
                  style: { borderLeftColor: AccentColor, borderLeftWidth: "2px" },
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "mb-4", children: RenderStars(Testimonial.rating) }),
                    /* @__PURE__ */ jsx("blockquote", { className: "StaccatoBreath mb-6 flex-1", children: /* @__PURE__ */ jsx("p", { className: "text-lg", children: (Testimonial.rating ?? 0) > 0 ? `“${Testimonial.quote}”` : Testimonial.quote }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                      Testimonial.avatar ? /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: Testimonial.avatar,
                          alt: `Photo of ${Testimonial.author}`,
                          width: "48",
                          height: "48",
                          className: "StaccatoAvatar size-12 rounded-none border border-[var(--Border)] object-cover",
                          loading: "lazy"
                        }
                      ) : /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "StaccatoAvatar flex size-12 items-center justify-center rounded-none border border-[var(--Border)] bg-secondary",
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold", children: (Testimonial.author || "?").charAt(
                            0
                          ) })
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("cite", { className: "font-semibold not-italic", children: Testimonial.author }),
                        (Testimonial.role || Testimonial.company) && /* @__PURE__ */ jsxs("p", { className: "StaccatoBreath text-sm text-muted-foreground", children: [
                          Testimonial.role,
                          Testimonial.role && Testimonial.company && ", ",
                          Testimonial.company
                        ] })
                      ] })
                    ] })
                  ]
                },
                Testimonial.id
              );
            })
          }
        )
      ] })
    }
  );
};

const HomePage = ({ content, className }) => {
  const { t: T } = useTranslation(["home", "common", "download", "footer"]);
  const ResolvedContent = content || {
    hero: {
      badge: {
        text: T("home:hero.badge", {
          defaultValue: "New: Effect-TS Architecture 🎉"
        }),
        variant: "secondary"
      },
      title: T("home:hero.title", {
        defaultValue: "The Future of Code Editing"
      }),
      titleHighlight: T("home:hero.titleHighlight", {
        defaultValue: "Land"
      }),
      subtitle: T("home:hero.subtitle", {
        defaultValue: "A lightning-fast, type-safe editor built with Rust, Tauri, and Effect-TS.\nExperience the editor that reimagines VS Code for the modern era."
      }),
      primaryCta: {
        text: T("common:button.download", {
          defaultValue: "Download"
        }),
        variant: "default",
        size: "lg",
        icon: "Download"
      },
      secondaryCta: {
        text: T("common:button.learnMore", {
          defaultValue: "Learn More"
        }),
        variant: "outline",
        size: "lg",
        icon: "ExternalLink"
      },
      floatingCards: [
        {
          id: "1",
          title: "Rust Core",
          colors: [
            "bg-[var(--ExtensionRust)]",
            "bg-[var(--Mute)]"
          ]
        },
        {
          id: "2",
          title: "Tauri UI",
          colors: [
            "bg-[var(--ExtensionTauri)]",
            "bg-[var(--Primary)]",
            "bg-[var(--Secondary)]",
            "bg-[var(--Mute)]"
          ]
        },
        {
          id: "3",
          title: "Effect-TS Services",
          colors: [
            "bg-[var(--ExtensionEffectTypeScript)]",
            "bg-[var(--ExtensionEffectTypeScriptFore)]",
            "bg-[var(--ExtensionEffectTypeScriptMute)]"
          ]
        },
        {
          id: "4",
          title: "gRPC IPC",
          colors: [
            "bg-[var(--SpinegRPC)]",
            "bg-[var(--SpineIPC)]"
          ]
        },
        {
          id: "5",
          title: "Extension Host",
          colors: ["bg-[var(--TierProvider)]"]
        },
        {
          id: "6",
          title: "Cross-Platform",
          colors: [
            "bg-[var(--OSMacOS)]",
            "bg-[var(--OSWindows)]",
            "bg-[var(--OSLinux)]"
          ]
        },
        {
          id: "7",
          title: "VS Code API",
          colors: ["bg-[var(--SpineIPC)]"]
        },
        {
          id: "8",
          title: "Open Source CC0",
          colors: [
            "bg-[var(--SpinegRPC)]",
            "bg-[var(--ExtensionTauri)]"
          ]
        }
      ],
      showConnectingLines: true,
      showParticles: true,
      respectReducedMotion: true
    },
    features: {
      title: T("home:features.title", {
        defaultValue: "Built for Performance, Designed for Developers"
      }),
      subtitle: T("home:features.subtitle", {
        defaultValue: "Discover what makes Code Editor Land the most advanced code editor available."
      }),
      features: [
        {
          id: "performance",
          icon: "Zap",
          icons: ["Zap", "Cpu", "Server"],
          title: T("home:features.item.designTokens.title", {
            defaultValue: "Performance First"
          }),
          description: T(
            "home:features.item.designTokens.description",
            {
              defaultValue: "Native Rust backend with gRPC IPC ensures every operation is fast, responsive, and reliable.\nNo Electron bloat."
            }
          )
        },
        {
          id: "compatibility",
          icon: "Box",
          icons: ["Box", "Puzzle", "Code"],
          title: T("home:features.item.componentLibrary.title", {
            defaultValue: "VS Code Compatibility"
          }),
          description: T(
            "home:features.item.componentLibrary.description",
            {
              defaultValue: "Run your existing VS Code extensions with high fidelity through the Cocoon extension host.\nNo changes needed."
            }
          )
        },
        {
          id: "architecture",
          icon: "Cpu",
          icons: ["Cpu", "Layers", "Shield"],
          title: T("home:features.item.documentation.title", {
            defaultValue: "Effect-TS Architecture"
          }),
          description: T(
            "home:features.item.documentation.description",
            {
              defaultValue: "Effect-TS native UI services provide type safety, structured concurrency, and excellent error handling."
            }
          )
        },
        {
          id: "cross-platform",
          icon: "Globe",
          icons: ["Globe", "Package", "Database"],
          title: T("home:features.item.versionControl.title", {
            defaultValue: "Cross-Platform"
          }),
          description: T(
            "home:features.item.versionControl.description",
            {
              defaultValue: "One codebase, native deployments for macOS, Windows, and Linux with Tauri.\nWrite once, run everywhere."
            }
          )
        },
        {
          id: "tooling",
          icon: "Wrench",
          icons: ["Wrench", "Cpu", "Globe"],
          title: T("home:features.item.cicdIntegration.title", {
            defaultValue: "Modern Tooling"
          }),
          description: T(
            "home:features.item.cicdIntegration.description",
            {
              defaultValue: "Built on proven open-source technologies: Rust, Tauri, Effect-TS, and the VS Code platform.\nFamiliar and powerful."
            }
          )
        },
        {
          id: "opensource",
          icon: "Heart",
          icons: ["Heart", "Globe", "Shield"],
          title: T("home:features.item.collaboration.title", {
            defaultValue: "Open Source"
          }),
          description: T(
            "home:features.item.collaboration.description",
            {
              defaultValue: "Licensed under Creative Commons CC0 - completely free to use, modify, and distribute.\nNo strings attached."
            }
          )
        }
      ],
      columns: 3,
      gap: "lg"
    },
    pricing: {
      title: T("home:roadmap.title", {
        defaultValue: "Roadmap & Expectancy"
      }),
      subtitle: T("home:roadmap.subtitle", {
        defaultValue: "Funded by the NGI0 Commons Fund.\nOpen source, free forever, built in public."
      }),
      tiers: [
        {
          id: "current",
          name: T("home:roadmap.tiers.current.name", {
            defaultValue: "Current Phase"
          }),
          description: T("home:roadmap.tiers.current.description", {
            defaultValue: "Foundation and core editor scaffold.\nActive development."
          }),
          price: { monthly: 0, yearly: 0 },
          features: [
            T("home:roadmap.tiers.current.features.1", {
              defaultValue: "Mountain: Rust/Tauri native backend"
            }),
            T("home:roadmap.tiers.current.features.2", {
              defaultValue: "Cocoon: VS Code extension host via Effect-TS"
            }),
            T("home:roadmap.tiers.current.features.3", {
              defaultValue: "Wind: Workbench re-implementation"
            }),
            T("home:roadmap.tiers.current.features.4", {
              defaultValue: "Sky: Editor interface rendering"
            }),
            T("home:roadmap.tiers.current.features.5", {
              defaultValue: "Air: Update daemon and crypto signing"
            }),
            T("home:roadmap.tiers.current.features.6", {
              defaultValue: "Echo: Work-stealing task scheduler"
            })
          ],
          cta: {
            text: T("home:roadmap.tiers.current.button", {
              defaultValue: "View on GitHub"
            }),
            variant: "default"
          },
          popular: true
        },
        {
          id: "next",
          name: T("home:roadmap.tiers.next.name", {
            defaultValue: "Next Milestone"
          }),
          description: T("home:roadmap.tiers.next.description", {
            defaultValue: "Extension ecosystem and platform stability."
          }),
          price: { monthly: 0, yearly: 0 },
          features: [
            T("home:roadmap.tiers.next.features.1", {
              defaultValue: "High-fidelity VS Code extension compatibility"
            }),
            T("home:roadmap.tiers.next.features.2", {
              defaultValue: "Cross-platform installer and auto-update"
            }),
            T("home:roadmap.tiers.next.features.3", {
              defaultValue: "gRPC IPC protocol finalization"
            }),
            T("home:roadmap.tiers.next.features.4", {
              defaultValue: "Settings sync and cloud-optional portal"
            })
          ],
          cta: {
            text: T("home:roadmap.tiers.next.button", {
              defaultValue: "Track Progress"
            }),
            variant: "outline"
          },
          popular: false
        },
        {
          id: "future",
          name: T("home:roadmap.tiers.future.name", {
            defaultValue: "Long-Term Vision"
          }),
          description: T("home:roadmap.tiers.future.description", {
            defaultValue: "Full-featured editor replacing Electron-based tools."
          }),
          price: { monthly: 0, yearly: 0 },
          features: [
            T("home:roadmap.tiers.future.features.1", {
              defaultValue: "Native mobile editing (iOS, Android)"
            }),
            T("home:roadmap.tiers.future.features.2", {
              defaultValue: "Collaborative real-time editing"
            }),
            T("home:roadmap.tiers.future.features.3", {
              defaultValue: "AI-assisted development tooling"
            }),
            T("home:roadmap.tiers.future.features.4", {
              defaultValue: "Plugin marketplace and ecosystem"
            })
          ],
          cta: {
            text: T("home:roadmap.tiers.future.button", {
              defaultValue: "Learn More"
            }),
            variant: "outline"
          },
          popular: false
        }
      ]
    },
    testimonials: {
      title: T("home:architecture.title", {
        defaultValue: "Architecture"
      }),
      subtitle: T("home:architecture.subtitle", {
        defaultValue: "Land replaces VS Code's Electron stack with a modular, high-performance architecture.\nEach element is a standalone repository."
      }),
      testimonials: [
        {
          id: "mountain",
          quote: T("home:architecture.mountain.description", {
            defaultValue: "Manages Window, File System, and Process lifecycle.\nThe native Rust/Tauri backend that replaces Electron's main process."
          }),
          author: "Mountain",
          role: T("home:architecture.mountain.subtitle", {
            defaultValue: "Rust/Tauri native backend"
          })
        },
        {
          id: "cocoon",
          quote: T("home:architecture.cocoon.description", {
            defaultValue: "Runs VS Code extensions via Effect-TS with high-fidelity API compatibility.\nNo changes needed to existing extensions."
          }),
          author: "Cocoon",
          role: T("home:architecture.cocoon.subtitle", {
            defaultValue: "TypeScript extension host"
          })
        },
        {
          id: "wind",
          quote: T("home:architecture.wind.description", {
            defaultValue: "Re-implementation of the VS Code Workbench.\nProvides the editor shell, panels, sidebars, and activity bar."
          }),
          author: "Wind",
          role: T("home:architecture.wind.subtitle", {
            defaultValue: "TypeScript UI service"
          })
        },
        {
          id: "sky",
          quote: T("home:architecture.sky.description", {
            defaultValue: "Renders the editor interface using Astro components.\nHandles themes, layouts, and the visual presentation layer."
          }),
          author: "Sky",
          role: T("home:architecture.sky.subtitle", {
            defaultValue: "Astro UI component"
          })
        },
        {
          id: "air",
          quote: T("home:architecture.air.description", {
            defaultValue: "Background daemon for automatic updates, downloads, and cryptographic signing.\nKeeps Land up to date silently."
          }),
          author: "Air",
          role: T("home:architecture.air.subtitle", {
            defaultValue: "Rust background daemon"
          })
        },
        {
          id: "echo",
          quote: T("home:architecture.echo.description", {
            defaultValue: "High-performance work-stealing executor.\nSchedules and distributes tasks across cores for maximum throughput."
          }),
          author: "Echo",
          role: T("home:architecture.echo.subtitle", {
            defaultValue: "Rust task scheduler"
          })
        }
      ],
      columns: 3
    },
    download: {
      title: T("download:title", { defaultValue: "Download Land" }),
      subtitle: T("download:subtitle", {
        defaultValue: "Available for macOS, Windows, and Linux.\nBuilt with Tauri, powered by Rust."
      }),
      platforms: [
        {
          id: "macos",
          name: T("download:card.platform.macos.title", {
            defaultValue: "macOS"
          }),
          icon: "Apple",
          description: T(
            "download:card.platform.macos.universalBadge",
            {
              defaultValue: "Universal Binary"
            }
          ),
          version: "Pre-release",
          size: "Coming Soon"
        },
        {
          id: "windows",
          name: T("download:card.platform.windows.title", {
            defaultValue: "Windows"
          }),
          icon: "Monitor",
          description: T(
            "download:card.platform.windows.description",
            {
              defaultValue: "64-bit (x64)"
            }
          ),
          version: "Pre-release",
          size: "Coming Soon"
        },
        {
          id: "linux",
          name: T("download:card.platform.linux.title", {
            defaultValue: "Linux"
          }),
          icon: "Terminal",
          description: T("download:card.platform.linux.description", {
            defaultValue: "DEB, RPM, AppImage"
          }),
          version: "Pre-release",
          size: "Coming Soon"
        }
      ],
      showVerification: true,
      onDownload: async (Platform) => {
        if (Platform.id) {
          try {
            const { default: DownloadAPI } = await import('./Download_CmkN8FL_.mjs');
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
    footer: {
      brand: {
        name: T("common:brand.name", {
          defaultValue: "Land"
        }),
        description: T("common:brand.tagline", {
          defaultValue: "The next-generation code editor.\nOpen source and free forever."
        })
      },
      columns: [
        {
          title: T("footer:columns.product.title", {
            defaultValue: "Product"
          }),
          links: [
            {
              label: T("footer:columns.product.features", {
                defaultValue: "Features"
              }),
              href: "/#features"
            },
            {
              label: T("footer:columns.product.downloads", {
                defaultValue: "Download"
              }),
              href: "/Download"
            },
            {
              label: T("footer:columns.product.docs", {
                defaultValue: "Docs"
              }),
              href: "https://github.com/CodeEditorLand/Land#readme"
            }
          ]
        },
        {
          title: T("footer:columns.company.title", {
            defaultValue: "Community"
          }),
          links: [
            {
              label: T("footer:columns.company.github", {
                defaultValue: "GitHub"
              }),
              href: "https://github.com/CodeEditorLand/Land"
            },
            {
              label: T("footer:columns.company.issues", {
                defaultValue: "Issues"
              }),
              href: "https://github.com/CodeEditorLand/Land/issues"
            },
            {
              label: T("footer:columns.company.contributing", {
                defaultValue: "Contributing"
              }),
              href: "https://github.com/CodeEditorLand/Land/blob/Current/CONTRIBUTING.md"
            }
          ]
        },
        {
          title: T("footer:columns.legal.title", {
            defaultValue: "Legal"
          }),
          links: [
            {
              label: T("footer:columns.legal.privacy", {
                defaultValue: "Privacy"
              }),
              href: "/Legal/Privacy"
            },
            {
              label: T("footer:columns.legal.terms", {
                defaultValue: "Terms"
              }),
              href: "/Legal/Term"
            },
            {
              label: T("footer:columns.legal.license", {
                defaultValue: "License"
              }),
              href: "/License"
            }
          ]
        }
      ]}
  };
  const {
    hero: Hero,
    features: Features,
    pricing: Pricing,
    testimonials: Testimonials,
    download: Download,
    header: HeaderContent
  } = ResolvedContent;
  return /* @__PURE__ */ jsxs("div", { className: `flex min-h-screen flex-col ${className || ""}`, children: [
    HeaderContent !== void 0 && /* @__PURE__ */ jsx(Header, { content: HeaderContent }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", role: "region", "aria-label": "Page content", children: [
      /* @__PURE__ */ jsx(DynamicHeroSection, { content: Hero }),
      /* @__PURE__ */ jsx("div", { className: "py-12" }),
      /* @__PURE__ */ jsx(DynamicFeatures, { content: Features }),
      /* @__PURE__ */ jsx("div", { className: "py-16" }),
      /* @__PURE__ */ jsx(DynamicPricing, { content: Pricing }),
      /* @__PURE__ */ jsx("div", { className: "py-16" }),
      /* @__PURE__ */ jsx(DynamicTestimonials, { content: Testimonials }),
      /* @__PURE__ */ jsx("div", { className: "py-16" }),
      /* @__PURE__ */ jsx(DynamicPlatformGrid, { content: Download })
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
    defaultValue: "Land | The Next-Generation Code Editor"
  });
  const MetaDescription = T("meta.home.description", {
    defaultValue: "Land is a high-performance, resource-efficient code editor built with Rust and Tauri. Experience VS Code's power without the Electron bloat."
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription, "lang": "en" }, { "Head": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment$1, { "slot": "Head" }, { "default": ($$result3) => renderTemplate(_a || (_a = __template([' <script crossorigin=\"anonymous\" type="application/ld+json">', "<\/script> "])), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Code Editor Land",
    "alternateName": "Land",
    "description": "A high-performance, resource-efficient code editor built with Rust and Tauri. Experience VS Code compatibility without the Electron bloat.",
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
    "downloadUrl": "https://editor.land/downloads",
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
      "VS Code extension compatibility",
      "Effect-TS type-safe UI services",
      "Cross-platform (macOS, Windows, Linux)",
      "Open source under CC0 license"
    ],
    "isAccessibleForFree": true
  }))) })}`, "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header", "client:component-export": "Header" })} ${renderComponent($$result2, "HomePage", HomePage, { "client:load": true, "metaTitle": MetaTitle, "metaDescription": MetaDescription, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage", "client:component-export": "HomePage" })} ${maybeRenderHead()}<div class="container mx-auto flex flex-wrap items-center justify-center gap-3 px-4 py-8 text-xs text-muted-foreground"> <picture> <img alt="Code Editor Land logo" title="Code Editor Land" src="/Asset/Logo/Glyph/Land.svg" width="24" height="24"> </picture> <span class="inline-flex items-center border border-green-200 bg-green-50 px-2.5 py-0.5 font-medium text-green-700">
No Telemetry&#x2001;<span class="h-1.5 w-1.5 rounded-none bg-green-500" aria-hidden="true"></span> </span> <span class="inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-2.5 py-0.5 font-medium">
CC0 Licensed
</span> <span class="inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-2.5 py-0.5 font-medium">
Rust + Tauri
</span> <span class="inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-2.5 py-0.5 font-medium">
VS Code Compatible
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
