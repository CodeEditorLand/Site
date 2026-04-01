import { c as createComponent, G as GetI18n, $ as $$Base } from './Base_xEyzTpo4.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './prerender_B86tonbF.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { Zap, Wrench, WifiOff, Wifi, Users, UserPlus, Unplug, Timer, Terminal, Sliders, Shield, Settings, Server, Search, RotateCcw, Rocket, RefreshCw, RefreshCcw, Radio, Puzzle, PackageOpen, Package, Network, Monitor, Lock, Link2, LifeBuoy, Layers, Laptop, KeyRound, Key, Info, Hash, HardDrive, Hammer, Globe, GitPullRequest, GitFork, GitCommit, GitBranch, FolderGit, FlaskConical, Fingerprint, FileText, ExternalLink, Download, Database, Cpu, Code, Cloud, CirclePlay, ChevronRight, CheckCircle, Check, Building2, BrainCircuit, Box, Blocks, AlertTriangle, Activity } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { B as Button } from './Button_C02KTPew.mjs';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from './Card_CQE5NtXL.mjs';
import { I as IconTooltip } from './IconTooltip_Ckyq-lve.mjs';
import { D as DynamicInput } from './DynamicInput_Ap_ZPAJS.mjs';

const TierIconRegistry = {
  Activity,
  AlertTriangle,
  Blocks,
  Box,
  BrainCircuit,
  Building2,
  Check,
  CheckCircle,
  ChevronRight,
  CirclePlay,
  Cloud,
  Code,
  Cpu,
  Database,
  Download,
  ExternalLink,
  FileText,
  Fingerprint,
  FlaskConical,
  FolderGit,
  GitBranch,
  GitCommit,
  GitFork,
  GitPullRequest,
  Globe,
  Hammer,
  HardDrive,
  Hash,
  Info,
  Key,
  KeyRound,
  Laptop,
  Layers,
  LifeBuoy,
  Link2,
  Lock,
  Monitor,
  Network,
  Package,
  PackageOpen,
  Puzzle,
  Radio,
  RefreshCcw,
  RefreshCw,
  Rocket,
  RotateCcw,
  Search,
  Server,
  Settings,
  Shield,
  Sliders,
  Terminal,
  Timer,
  Unplug,
  UserPlus,
  Users,
  Wifi,
  WifiOff,
  Wrench,
  Zap
};
const IconLabelMap = {
  Activity: "Activity",
  AlertTriangle: "Warning",
  Blocks: "Blocks",
  Box: "Package",
  BrainCircuit: "AI",
  Building2: "Enterprise",
  Check: "Check",
  CheckCircle: "Verified",
  ChevronRight: "Navigate",
  CirclePlay: "Pipeline",
  Cloud: "Cloud",
  Code: "Code",
  Cpu: "CPU",
  Database: "Database",
  Download: "Download",
  ExternalLink: "External",
  FileText: "Audit Log",
  Fingerprint: "Identity",
  FlaskConical: "Testing",
  FolderGit: "Repository",
  GitBranch: "Repository",
  GitCommit: "Commit",
  GitFork: "Source Control",
  GitPullRequest: "Pull Request",
  Globe: "Web",
  Hammer: "Build",
  HardDrive: "Storage",
  Hash: "Hash",
  Info: "Info",
  Key: "Authentication",
  KeyRound: "Single Sign-On",
  Laptop: "Desktop App",
  Layers: "Layers",
  LifeBuoy: "Support",
  Link2: "Link",
  Lock: "Encryption",
  Monitor: "Device",
  Network: "Network",
  Package: "Package",
  PackageOpen: "Open Source",
  Puzzle: "Extensions",
  Radio: "Radio",
  RefreshCcw: "Hard Reset",
  RefreshCw: "Sync",
  Rocket: "Deploy",
  RotateCcw: "Undo",
  Search: "Search",
  Server: "Server",
  Settings: "Configuration",
  Shield: "Security",
  Sliders: "Settings",
  Terminal: "Terminal",
  Timer: "Timer",
  Unplug: "Disconnect",
  UserPlus: "Provisioning",
  Users: "Team",
  Wifi: "Connection",
  WifiOff: "Offline",
  Wrench: "Tooling",
  Zap: "Performance"
};
const IconColorMap = {
  // Identity / crypto — indigo
  Lock: "#6366f1",
  Key: "#6366f1",
  Fingerprint: "#6366f1",
  Shield: "#6366f1",
  // Network / connect — sky
  Wifi: "#0ea5e9",
  WifiOff: "#0ea5e9",
  Globe: "#0ea5e9",
  Network: "#0ea5e9",
  Radio: "#0ea5e9",
  Link2: "#0ea5e9",
  // Storage / hardware — slate
  HardDrive: "#64748b",
  Server: "#64748b",
  Database: "#64748b",
  Cpu: "#64748b",
  Terminal: "#64748b",
  // Build / code — emerald
  Code: "#10b981",
  Wrench: "#10b981",
  Hammer: "#10b981",
  FlaskConical: "#10b981",
  Package: "#10b981",
  PackageOpen: "#10b981",
  Box: "#10b981",
  Puzzle: "#10b981",
  // Git / VCS — amber
  GitBranch: "#f59e0b",
  GitFork: "#f59e0b",
  GitCommit: "#f59e0b",
  GitPullRequest: "#f59e0b",
  FolderGit: "#f59e0b",
  // Cloud / sync / deploy — blue
  Cloud: "#3b82f6",
  RefreshCw: "#3b82f6",
  RefreshCcw: "#3b82f6",
  RotateCcw: "#3b82f6",
  Download: "#3b82f6",
  Rocket: "#3b82f6",
  Timer: "#3b82f6",
  Zap: "#3b82f6",
  // Auth / provisioning — violet
  KeyRound: "#7c3aed",
  UserPlus: "#7c3aed",
  Users: "#7c3aed",
  Building2: "#7c3aed",
  Blocks: "#7c3aed",
  // Audit / docs — teal
  FileText: "#14b8a6",
  Activity: "#14b8a6",
  AlertTriangle: "#14b8a6",
  Info: "#14b8a6",
  Search: "#14b8a6",
  // Settings / config — slate-400
  Settings: "#94a3b8",
  Sliders: "#94a3b8",
  CheckCircle: "#94a3b8",
  Check: "#94a3b8",
  ChevronRight: "#94a3b8",
  // Connectivity misc — orange
  Unplug: "#f97316",
  ExternalLink: "#f97316",
  Layers: "#f97316",
  Hash: "#f97316",
  // AI — purple
  BrainCircuit: "#a855f7",
  // Support / lifecycle — pink
  LifeBuoy: "#ec4899",
  CirclePlay: "#ec4899",
  Monitor: "#ec4899",
  Laptop: "#ec4899"
};
const EnterpriseSSOForm = ({ Content }) => {
  const [OrganizationDomain, SetOrganizationDomain] = useState("");
  const { t: T } = useTranslation("account");
  const HandleEnterpriseLogin = (Connection) => {
    const Params = new URLSearchParams();
    Params.set("connection", Connection);
    if (OrganizationDomain.trim()) {
      Params.set("login_hint", OrganizationDomain.trim());
    }
    window.location.href = `/Account/SignIn?${Params.toString()}`;
  };
  const HandleDomainSubmit = (Event) => {
    Event.preventDefault();
    if (!OrganizationDomain.trim()) return;
    window.location.href = `/Account/SignIn?login_hint=${encodeURIComponent(
      OrganizationDomain.trim()
    )}`;
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "space-y-4",
      "aria-label": T("portal.enterprise.ariaLabel", {
        defaultValue: "Enterprise SSO"
      }),
      children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: HandleDomainSubmit, className: "space-y-3", children: [
          /* @__PURE__ */ jsx(
            DynamicInput,
            {
              content: {
                label: T("portal.enterprise.domainLabel", {
                  defaultValue: "Work Email or Domain"
                }),
                placeholder: T("portal.enterprise.domainPlaceholder", {
                  defaultValue: "name@company.com"
                }),
                type: "email",
                required: false,
                onChange: SetOrganizationDomain
              },
              id: "portal-enterprise-domain"
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "submit",
              className: "StaccatoButton w-full",
              style: {
                backgroundColor: Content.Color,
                borderColor: Content.BorderColor,
                color: "#ffffff"
              },
              children: [
                T("portal.enterprise.continueSSO", {
                  defaultValue: "Continue with SSO"
                }),
                " ",
                "+",
                " ",
                /* @__PURE__ */ jsx(Building2, { className: "h-4 w-4", "aria-hidden": "true" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "PortalTierDivider StaccatoSeparator" }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            className: "StaccatoButton w-full",
            variant: "outline",
            style: { borderColor: Content.BorderColor },
            onClick: () => HandleEnterpriseLogin("okta"),
            children: [
              T("portal.enterprise.continueOkta", {
                defaultValue: "Continue with Okta"
              }),
              " ",
              "+",
              " ",
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/Image/Okta.svg",
                  alt: "Okta",
                  title: "Okta",
                  width: "20",
                  height: "20",
                  className: "h-5 w-5"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            className: "StaccatoButton w-full",
            variant: "outline",
            style: { borderColor: Content.BorderColor },
            onClick: () => HandleEnterpriseLogin("waad"),
            children: [
              T("portal.enterprise.continueAzure", {
                defaultValue: "Continue with Azure AD"
              }),
              " ",
              "+",
              " ",
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/Image/Microsoft.svg",
                  alt: "Microsoft",
                  title: "Microsoft Azure AD",
                  width: "20",
                  height: "20",
                  className: "h-5 w-5"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            className: "StaccatoButton w-full",
            variant: "outline",
            style: { borderColor: Content.BorderColor },
            onClick: () => HandleEnterpriseLogin("samlp"),
            children: [
              T("portal.enterprise.continueSAML", {
                defaultValue: "Continue with SAML"
              }),
              " ",
              "+",
              " ",
              /* @__PURE__ */ jsx(Lock, { className: "h-4 w-4", "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "PortalTierDivider StaccatoSeparator" }),
        /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-muted-foreground", children: T("portal.enterprise.note", {
          defaultValue: "OIDC Discovery  +  SAML 2.0  +  SCIM provisioning"
        }) })
      ]
    }
  );
};
const PortalTierRow = ({
  Content,
  Index,
  OnAction,
  Labels
}) => {
  const RowReference = useRef(null);
  const [, SetEmail] = useState("");
  const [, SetPassword] = useState("");
  const IconComponent = Content.Icon ? TierIconRegistry[Content.Icon] || Shield : Shield;
  const TierIconLabel = IconLabelMap[Content.Icon ?? ""] ?? Content.Title;
  useEffect(() => {
    const Row = RowReference.current;
    if (!Row) return;
    const ReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (ReducedMotion) return;
    const ApplyScatter = async () => {
      const AttentionModule = await import('./Attention_DKdtZrik.mjs');
      const Attention = await AttentionModule.default;
      Attention.ApplyToElement(Row, Index, 3, 2);
    };
    ApplyScatter();
  }, [Index]);
  const IsCloud = Content.Identifier === "Cloud";
  const IsProvider = Content.Identifier === "Provider";
  const IsLocalFirst = Content.Identifier === "LocalFirst";
  const IsEnterprise = Content.Identifier === "Enterprise";
  const TierBorderClass = IsCloud ? "PortalTierCloud" : IsProvider ? "PortalTierProvider" : IsEnterprise ? "PortalTierEnterprise" : "PortalTierLocalFirst";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: RowReference,
      className: `PortalTierRow ${TierBorderClass} StaccatoCard StaccatoBorderShimmer`,
      role: "region",
      "aria-label": `${Content.Title} authentication tier`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "PortalTierLogin", children: /* @__PURE__ */ jsxs(Card, { className: "PortalTierCard", children: [
          /* @__PURE__ */ jsx(CardHeader, { className: "PortalTierCardHeader", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: Content.Title }),
            /* @__PURE__ */ jsx("div", { className: "PortalTierIconWrapper", children: /* @__PURE__ */ jsx(
              IconTooltip,
              {
                Label: TierIconLabel,
                Icon: IconComponent,
                Color: Content.Color,
                SizeClass: "h-6 w-6",
                ClassName: "StaccatoIcon"
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { children: [
            IsCloud && /* @__PURE__ */ jsxs(
              "form",
              {
                className: "space-y-4",
                onSubmit: (Event) => {
                  Event.preventDefault();
                  OnAction?.();
                },
                "aria-label": "Cloud sign in form",
                children: [
                  /* @__PURE__ */ jsx(
                    DynamicInput,
                    {
                      content: {
                        label: "Email",
                        placeholder: "name@example.com",
                        type: "email",
                        required: true,
                        onChange: SetEmail
                      },
                      id: "portal-cloud-email"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    DynamicInput,
                    {
                      content: {
                        label: "Password",
                        placeholder: "Enter your password",
                        type: "password",
                        required: true,
                        onChange: SetPassword
                      },
                      id: "portal-cloud-password"
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      type: "submit",
                      className: "StaccatoButton w-full",
                      style: {
                        backgroundColor: Content.Color,
                        borderColor: Content.BorderColor,
                        color: "#ffffff"
                      },
                      children: [
                        "Secure Sign In",
                        " ",
                        "+",
                        " ",
                        /* @__PURE__ */ jsx(
                          Lock,
                          {
                            className: "h-4 w-4",
                            "aria-hidden": "true"
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            ),
            IsProvider && /* @__PURE__ */ jsxs(
              "div",
              {
                className: "space-y-4",
                "aria-label": "Provider authentication options",
                children: [
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      className: "StaccatoButton w-full",
                      variant: "outline",
                      style: { borderColor: Content.BorderColor },
                      onClick: () => OnAction?.(),
                      children: [
                        "Continue with GitHub",
                        " ",
                        "+",
                        " ",
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: "/Image/GitHub.svg",
                            alt: "GitHub",
                            title: "GitHub",
                            width: "20",
                            height: "20",
                            className: "h-5 w-5"
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      className: "StaccatoButton w-full",
                      variant: "outline",
                      style: { borderColor: Content.BorderColor },
                      onClick: () => OnAction?.(),
                      children: [
                        "Continue with Google",
                        " ",
                        "+",
                        " ",
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: "/Image/Google.svg",
                            alt: "Google",
                            title: "Google",
                            width: "20",
                            height: "20",
                            className: "h-5 w-5"
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      className: "StaccatoButton w-full",
                      variant: "outline",
                      style: { borderColor: Content.BorderColor },
                      onClick: () => OnAction?.(),
                      children: [
                        "Continue with GitLab",
                        " ",
                        "+",
                        " ",
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: "/Image/GitLab.svg",
                            alt: "GitLab",
                            title: "GitLab",
                            width: "20",
                            height: "20",
                            className: "h-5 w-5"
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "PortalTierDivider StaccatoSeparator" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
                    "OAuth 2.0",
                    " ",
                    "+",
                    " ",
                    "Linked to your preferences"
                  ] })
                ]
              }
            ),
            IsLocalFirst && /* @__PURE__ */ jsxs(
              "div",
              {
                className: "space-y-4",
                "aria-label": "Local-first connection",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "PortalTierDaemonStatus StaccatoBreath", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-medium", children: "Air Daemon" }),
                    /* @__PURE__ */ jsx("span", { className: "ml-auto text-xs text-muted-foreground", children: "Scanning..." }),
                    " ",
                    /* @__PURE__ */ jsx("div", { className: "PortalTierDaemonDot StaccatoRhythmDot" })
                  ] }),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      className: "StaccatoButton w-full",
                      style: {
                        backgroundColor: Content.Color,
                        borderColor: Content.BorderColor,
                        color: "#ffffff"
                      },
                      onClick: () => OnAction?.(),
                      children: [
                        "Connect to Air Daemon",
                        " ",
                        "+",
                        " ",
                        /* @__PURE__ */ jsx(
                          Wifi,
                          {
                            className: "h-4 w-4",
                            "aria-hidden": "true"
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "PortalTierDivider StaccatoSeparator" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
                    "Zero cloud dependency",
                    " ",
                    "+",
                    " ",
                    "JWT certificates",
                    " ",
                    "+",
                    " ",
                    "mTLS"
                  ] })
                ]
              }
            ),
            IsEnterprise && /* @__PURE__ */ jsx(EnterpriseSSOForm, { Content })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "PortalTierDescription", children: [
          Content.Badge && /* @__PURE__ */ jsx(
            "span",
            {
              className: "StaccatoBadge StaccatoRhythmBeat PortalTierBadge",
              style: {
                color: Content.Color,
                borderColor: Content.BorderColor
              },
              children: Content.Badge
            }
          ),
          /* @__PURE__ */ jsx(
            "h3",
            {
              className: "PortalTierDescriptionTitle",
              style: { color: Content.Color },
              children: Content.Title
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "PortalTierDescriptionSubtitle", children: Content.Subtitle }),
          /* @__PURE__ */ jsxs("div", { className: "PortalTierFeatureList", children: [
            /* @__PURE__ */ jsx("h4", { className: "PortalTierFeatureHeading", children: Labels?.Included ?? "Included" }),
            /* @__PURE__ */ jsx("ul", { className: "PortalTierFeatureItems", children: Content.Feature.map((Feature, FeatureIndex) => /* @__PURE__ */ jsxs(
              "li",
              {
                className: "PortalTierFeatureItem",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: Feature.Heading }),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    Feature.Description,
                    Feature.Icon && Feature.Icon.length > 0 && /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "inline-flex items-center align-middle",
                        role: "img",
                        "aria-label": `${Feature.Heading} technology stack`,
                        children: Feature.Icon.map(
                          (IconName, IconIndex) => {
                            const IconLabel = IconName.startsWith(
                              "/"
                            ) ? IconName.split(
                              "/"
                            ).pop()?.replace(
                              ".svg",
                              ""
                            ) ?? "" : IconLabelMap[IconName] ?? IconName;
                            const LucideColor = IconColorMap[IconName] ?? "#94a3b8";
                            return /* @__PURE__ */ jsxs(
                              "span",
                              {
                                className: "inline-flex items-center",
                                children: [
                                  " ",
                                  "+",
                                  " ",
                                  IconName.startsWith(
                                    "/"
                                  ) ? /* @__PURE__ */ jsx(
                                    IconTooltip,
                                    {
                                      Label: IconLabel,
                                      children: /* @__PURE__ */ jsx(
                                        "img",
                                        {
                                          src: IconName,
                                          alt: IconLabel,
                                          title: IconLabel,
                                          width: "16",
                                          height: "16",
                                          className: "h-4 w-4"
                                        }
                                      )
                                    }
                                  ) : (() => {
                                    const FeatureIcon = TierIconRegistry[IconName];
                                    return FeatureIcon ? /* @__PURE__ */ jsx(
                                      IconTooltip,
                                      {
                                        Label: IconLabel,
                                        Icon: FeatureIcon,
                                        Color: LucideColor,
                                        SizeClass: "h-4 w-4"
                                      }
                                    ) : null;
                                  })()
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
              FeatureIndex
            )) })
          ] }),
          Content.Capability.length > 0 && /* @__PURE__ */ jsxs("div", { className: "PortalTierCapabilityList", children: [
            /* @__PURE__ */ jsx("h4", { className: "PortalTierFeatureHeading", children: Labels?.Capabilities ?? "Capabilities" }),
            /* @__PURE__ */ jsx("div", { className: "PortalTierCapabilityGrid", children: Content.Capability.map(
              (CapabilityText, CapabilityIndex) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "PortalTierCapabilityItem StaccatoBreath",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs", children: CapabilityText }),
                    " ",
                    "+",
                    " ",
                    /* @__PURE__ */ jsx(
                      IconTooltip,
                      {
                        Label: "Security",
                        Icon: Shield,
                        Color: IconColorMap["Shield"],
                        SizeClass: "h-3 w-3 shrink-0"
                      }
                    )
                  ]
                },
                CapabilityIndex
              )
            ) })
          ] }),
          Content.Protocol && /* @__PURE__ */ jsxs("div", { className: "PortalTierProtocol", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-muted-foreground", children: Labels?.Protocol ?? "Protocol:" }),
            /* @__PURE__ */ jsx(
              "code",
              {
                className: "PortalTierProtocolCode",
                style: { color: Content.Color },
                children: Content.Protocol
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "PortalTierSettingsManaged StaccatoBorderShimmer", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium", children: Labels?.SettingsManaged ?? "Settings Managed" }),
            " ",
            "+",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: Labels?.AllTiers ?? "Included in all tiers" }),
            " ",
            "+",
            " ",
            /* @__PURE__ */ jsx(
              IconTooltip,
              {
                Label: "Sync",
                Icon: RefreshCw,
                Color: IconColorMap["RefreshCw"],
                SizeClass: "h-3.5 w-3.5",
                ClassName: "StaccatoIcon"
              }
            )
          ] })
        ] })
      ]
    }
  );
};
const DynamicPortal = ({
  Content,
  OnSignIn,
  OnOAuth,
  OnConnect,
  OnEnterprise
}) => {
  const SectionReference = useRef(null);
  useEffect(() => {
    const ReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (ReducedMotion) return;
    let StopFunction;
    const StartNoise = async () => {
      const StaccatoModule = await import('./Staccato_Bzck3RTr.mjs');
      const Staccato = await StaccatoModule.default;
      Staccato.Start();
      StopFunction = Staccato.Stop;
      Staccato.SeedSelector(".PortalTierRow");
    };
    StartNoise();
    return () => {
      StopFunction?.();
    };
  }, []);
  return /* @__PURE__ */ jsx(
    "section",
    {
      ref: SectionReference,
      id: "portal",
      className: "PortalSection",
      "aria-label": "Authentication Portal",
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "PortalHeader StaccatoBreath", children: [
          /* @__PURE__ */ jsx("h1", { className: "PortalTitle", children: Content.Title }),
          /* @__PURE__ */ jsx("p", { className: "PortalSubtitle", children: Content.Subtitle })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "PortalTierGrid", children: [
          /* @__PURE__ */ jsx(
            PortalTierRow,
            {
              Content: Content.Cloud,
              Index: 0,
              OnAction: () => OnSignIn?.("", ""),
              Labels: Content.Labels
            }
          ),
          /* @__PURE__ */ jsx(
            PortalTierRow,
            {
              Content: Content.Provider,
              Index: 1,
              OnAction: () => OnOAuth?.("github"),
              Labels: Content.Labels
            }
          ),
          /* @__PURE__ */ jsx(
            PortalTierRow,
            {
              Content: Content.LocalFirst,
              Index: 2,
              OnAction: () => OnConnect?.(),
              Labels: Content.Labels
            }
          ),
          Content.Enterprise && /* @__PURE__ */ jsx(
            PortalTierRow,
            {
              Content: Content.Enterprise,
              Index: 3,
              OnAction: () => OnEnterprise?.("okta"),
              Labels: Content.Labels
            }
          )
        ] })
      ] })
    }
  );
};

const $$Portal = createComponent(($$result, $$props, $$slots) => {
  const T = GetI18n();
  const PortalContent = {
    Title: T("account.portal.title", {
      defaultValue: "Choose Your Account Type"
    }),
    Subtitle: T("account.portal.subtitle", {
      defaultValue: "From fully online to completely local-first.\nThree ways to manage your editor.\nNo telemetry in any tier."
    }),
    Cloud: {
      Identifier: "Cloud",
      Title: T("account.portal.cloud.title", {
        defaultValue: "Cloud Account"
      }),
      Subtitle: T("account.portal.cloud.subtitle", {
        defaultValue: "Secure online login with full cloud sync.\nYour settings, extensions, and preferences stored and synced across all devices."
      }),
      Color: "#3b82f6",
      BorderColor: "#3b82f6",
      Icon: "Cloud",
      Badge: "Online",
      Protocol: "HTTPS / TLS 1.3",
      Feature: [
        {
          Heading: "Sync",
          Description: T("account.portal.cloud.feature.sync", {
            defaultValue: "Cross-device settings synchronization"
          }),
          Icon: ["RefreshCw", "Cloud", "Monitor"]
        },
        {
          Heading: "Backup",
          Description: T("account.portal.cloud.feature.backup", {
            defaultValue: "Automatic cloud backup of configurations"
          }),
          Icon: ["Cloud", "HardDrive", "Shield"]
        },
        {
          Heading: "Team",
          Description: T("account.portal.cloud.feature.team", {
            defaultValue: "Team workspace management"
          }),
          Icon: ["Users", "Settings"]
        },
        {
          Heading: "Extensions",
          Description: T("account.portal.cloud.feature.extension", {
            defaultValue: "Extension marketplace with cloud install"
          }),
          Icon: ["Puzzle", "Cloud", "Box"]
        },
        {
          Heading: "Remote",
          Description: T("account.portal.cloud.feature.remote", {
            defaultValue: "Remote development server integration"
          }),
          Icon: ["Server", "Monitor", "Wifi"]
        }
      ],
      Capability: [
        T("account.portal.cloud.capability.jwt", {
          defaultValue: "JWT session tokens"
        }),
        T("account.portal.cloud.capability.okta", {
          defaultValue: "Okta SSO integration"
        }),
        T("account.portal.cloud.capability.mfa", {
          defaultValue: "Multi-factor authentication"
        }),
        T("account.portal.cloud.capability.rbac", {
          defaultValue: "Role-based access control"
        }),
        T("account.portal.cloud.capability.audit", {
          defaultValue: "Audit log trail"
        }),
        T("account.portal.cloud.capability.cert", {
          defaultValue: "Developer certificates"
        })
      ]
    },
    Provider: {
      Identifier: "Provider",
      Title: T("account.portal.provider.title", {
        defaultValue: "Provider Account"
      }),
      Subtitle: T("account.portal.provider.subtitle", {
        defaultValue: "Authenticate through GitHub, Google, or GitLab.\nYour OAuth identity links directly to your editor preferences and team memberships."
      }),
      Color: "#a855f7",
      BorderColor: "#a855f7",
      Icon: "GitFork",
      Badge: "OAuth 2.0",
      Protocol: "OAuth 2.0 / PKCE",
      Feature: [
        {
          Heading: "GitHub",
          Description: T("account.portal.provider.feature.github", {
            defaultValue: "GitHub identity linked to preferences"
          }),
          Icon: ["/Image/GitHub.svg", "KeyRound", "Settings"]
        },
        {
          Heading: "SSO",
          Description: T("account.portal.provider.feature.sso", {
            defaultValue: "Single sign-on across all Land services"
          }),
          Icon: ["KeyRound", "Shield", "Globe"]
        },
        {
          Heading: "Repository",
          Description: T("account.portal.provider.feature.repo", {
            defaultValue: "Repository-aware workspace configuration"
          }),
          Icon: ["GitBranch", "Settings", "HardDrive"]
        },
        {
          Heading: "Team",
          Description: T("account.portal.provider.feature.team", {
            defaultValue: "Organization and team membership sync"
          }),
          Icon: ["Users", "RefreshCw", "Building2"]
        },
        {
          Heading: "CI/CD",
          Description: T("account.portal.provider.feature.ci", {
            defaultValue: "CI/CD pipeline integration with build triggers"
          }),
          Icon: ["CirclePlay", "Rocket", "GitBranch"]
        }
      ],
      Capability: [
        T("account.portal.provider.capability.oauth", {
          defaultValue: "OAuth 2.0 + PKCE flow"
        }),
        T("account.portal.provider.capability.scope", {
          defaultValue: "Granular permission scopes"
        }),
        T("account.portal.provider.capability.token", {
          defaultValue: "Refresh token rotation"
        }),
        T("account.portal.provider.capability.webhook", {
          defaultValue: "Webhook event subscriptions"
        }),
        T("account.portal.provider.capability.org", {
          defaultValue: "Organization-level policies"
        }),
        T("account.portal.provider.capability.cert", {
          defaultValue: "Developer certificates"
        })
      ]
    },
    LocalFirst: {
      Identifier: "LocalFirst",
      Title: T("account.portal.localfirst.title", {
        defaultValue: "Local-First Account"
      }),
      Subtitle: T("account.portal.localfirst.subtitle", {
        defaultValue: "Like a SaaS control panel that runs on your machine.\nZero cloud dependency.\nThe website communicates directly with the Air Daemon inside Land/Element via local-first protocol.\nConfigure, update, rebuild, and deploy your editor entirely from this console."
      }),
      Color: "#f97316",
      BorderColor: "#f97316",
      Icon: "HardDrive",
      Badge: "Local-First",
      Protocol: "mTLS / CRDTs / WebSocket",
      Feature: [
        {
          Heading: "Air Daemon",
          Description: T("account.portal.localfirst.feature.daemon", {
            defaultValue: "Direct Air Daemon connection to Land/Element"
          }),
          Icon: ["Wifi", "Server", "Lock"]
        },
        {
          Heading: "Build",
          Description: T("account.portal.localfirst.feature.build", {
            defaultValue: "Launch builds directly through the website console"
          }),
          Icon: ["Hammer", "Monitor", "Globe"]
        },
        {
          Heading: "Deploy",
          Description: T("account.portal.localfirst.feature.deploy", {
            defaultValue: "Deploy changes directly to the application"
          }),
          Icon: ["Rocket", "HardDrive"]
        },
        {
          Heading: "Configure",
          Description: T("account.portal.localfirst.feature.configure", {
            defaultValue: "Full editor configuration and settings management"
          }),
          Icon: ["Settings", "Monitor"]
        },
        {
          Heading: "VS Code Parity",
          Description: T("account.portal.localfirst.feature.parity", {
            defaultValue: "1:1 parity with VS Code server features and settings"
          }),
          Icon: ["Monitor", "RefreshCw"]
        },
        {
          Heading: "Offline",
          Description: T("account.portal.localfirst.feature.offline", {
            defaultValue: "No cloud login required.\nComplete offline operation."
          }),
          Icon: ["WifiOff", "Shield", "HardDrive"]
        },
        {
          Heading: "Embedded SaaS",
          Description: T("account.portal.localfirst.feature.bake", {
            defaultValue: "Bake the portal directly into the editor as embedded SaaS"
          }),
          Icon: ["Box", "Monitor", "Globe"]
        }
      ],
      Capability: [
        T("account.portal.localfirst.capability.jwt", {
          defaultValue: "JWT developer certificates"
        }),
        T("account.portal.localfirst.capability.mtls", {
          defaultValue: "Mutual TLS authentication"
        }),
        T("account.portal.localfirst.capability.crdt", {
          defaultValue: "CRDT state synchronization"
        }),
        T("account.portal.localfirst.capability.team", {
          defaultValue: "Team management (fully local)"
        }),
        T("account.portal.localfirst.capability.cert", {
          defaultValue: "Certificate authority management"
        }),
        T("account.portal.localfirst.capability.ws", {
          defaultValue: "WebSocket live connection"
        }),
        T("account.portal.localfirst.capability.rbac", {
          defaultValue: "Local RBAC policies"
        }),
        T("account.portal.localfirst.capability.backup", {
          defaultValue: "Encrypted local backup"
        })
      ]
    },
    Enterprise: {
      Identifier: "Enterprise",
      Title: T("account.portal.enterprise.title", {
        defaultValue: "Enterprise Account"
      }),
      Subtitle: T("account.portal.enterprise.subtitle", {
        defaultValue: "OIDC / SAML 2.0 single sign-on through Okta, Azure AD, or any compliant identity provider.\nGroup-to-role mapping, audit logs, and organization CA certificate management."
      }),
      Color: "#10b981",
      BorderColor: "#10b981",
      Icon: "Shield",
      Badge: "OIDC / SAML",
      Protocol: "OIDC / SAML 2.0 / SCIM",
      Feature: [
        {
          Heading: "Okta",
          Description: T("account.portal.enterprise.feature.okta", {
            defaultValue: "Okta SSO integration"
          }),
          Icon: ["/Image/Okta.svg", "KeyRound", "Shield"]
        },
        {
          Heading: "Azure AD",
          Description: T("account.portal.enterprise.feature.azure", {
            defaultValue: "Azure AD / Entra ID support"
          }),
          Icon: ["/Image/Microsoft.svg", "Cloud", "Building2"]
        },
        {
          Heading: "SAML 2.0",
          Description: T("account.portal.enterprise.feature.saml", {
            defaultValue: "SAML 2.0 for legacy enterprise IdPs"
          }),
          Icon: ["Shield", "Lock", "Building2"]
        },
        {
          Heading: "SCIM",
          Description: T("account.portal.enterprise.feature.scim", {
            defaultValue: "SCIM user provisioning"
          }),
          Icon: ["UserPlus", "RefreshCw", "Users"]
        },
        {
          Heading: "Groups",
          Description: T("account.portal.enterprise.feature.group", {
            defaultValue: "Group-to-role mapping"
          }),
          Icon: ["Users", "KeyRound", "Shield"]
        },
        {
          Heading: "Audit",
          Description: T("account.portal.enterprise.feature.audit", {
            defaultValue: "Full audit log trail"
          }),
          Icon: ["FileText", "Shield", "Lock"]
        }
      ],
      Capability: [
        T("account.portal.enterprise.capability.oidc", {
          defaultValue: "OIDC Discovery + PKCE"
        }),
        T("account.portal.enterprise.capability.jit", {
          defaultValue: "Just-in-time provisioning"
        }),
        T("account.portal.enterprise.capability.mfa", {
          defaultValue: "Enforced MFA policies"
        }),
        T("account.portal.enterprise.capability.session", {
          defaultValue: "Session management + revocation"
        }),
        T("account.portal.enterprise.capability.ca", {
          defaultValue: "Organization CA certificates"
        }),
        T("account.portal.enterprise.capability.compliance", {
          defaultValue: "SOC 2 / GDPR compliance"
        })
      ]
    },
    Labels: {
      Included: T("account.portal.labels.included", {
        defaultValue: "Included"
      }),
      Capabilities: T("account.portal.labels.capabilities", {
        defaultValue: "Capabilities"
      }),
      Protocol: T("account.portal.labels.protocol", {
        defaultValue: "Protocol:"
      }),
      SettingsManaged: T("account.portal.labels.settingsManaged", {
        defaultValue: "Settings Managed"
      }),
      AllTiers: T("account.portal.labels.allTiers", {
        defaultValue: "Included in all tiers"
      })
    }
  };
  const MetaTitle = T("meta.portal.title", {
    defaultValue: "Portal - Land"
  });
  const MetaDescription = T("meta.portal.description", {
    defaultValue: "Cloud, Provider, or Local-First. Choose your authentication method."
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto flex flex-wrap items-center justify-center gap-3 px-4 pt-8 text-xs text-muted-foreground"> <picture> <img alt="Land" src="/Asset/Logo/Glyph/Land.svg" width="28" height="28"> </picture> <span class="inline-flex items-center border border-green-200 bg-green-50 px-2.5 py-0.5 font-medium text-green-700">
No Telemetry&#x2001;<span class="h-1.5 w-1.5 rounded-none bg-green-500" aria-hidden="true"></span> </span> <span class="inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-2.5 py-0.5 font-medium">
CC0 Licensed
</span> <span class="inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-2.5 py-0.5 font-medium">
Auth0 + OAuth 2.0 + mTLS
</span> <span class="inline-flex items-center border border-green-200 bg-green-50 px-2.5 py-0.5 font-medium text-green-700">
OIDC / SAML / Okta&#x2001;<span class="h-1.5 w-1.5 rounded-none bg-green-500" aria-hidden="true"></span> </span> <a href="https://PlayForm.Cloud" target="_blank" rel="noopener noreferrer" class="inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-2.5 py-0.5 font-medium transition-colors hover:text-foreground">
PlayForm
</a> </div> ${renderComponent($$result2, "DynamicPortal", DynamicPortal, { "Content": PortalContent, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal", "client:component-export": "DynamicPortal" })} ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Portal.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Portal.astro";
const $$url = "/Portal";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Portal,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
