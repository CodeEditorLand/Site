import { c as createComponent } from './astro-component_e9mGl8K_.mjs';
import 'piccolore';
import { w as renderComponent, B as renderTemplate, v as maybeRenderHead } from './prerender_DFdx8cgm.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as lucide from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { B as Button, H as Header } from './Header_C1zvvbym.mjs';
import { C as Card, d as CardHeader, e as CardTitle, a as CardContent } from './Card_BFGqVRFw.mjs';
import { I as IconTooltip, G as GetI18n, $ as $$Base } from './Base_BbbN-lWJ.mjs';
import { D as DynamicInput } from './DynamicInput_DxrkqTts.mjs';

const TierIconRegistry = {
  Activity: lucide.Activity,
  AlertTriangle: lucide.AlertTriangle,
  Blocks: lucide.Blocks,
  Box: lucide.Box,
  BrainCircuit: lucide.BrainCircuit,
  Building2: lucide.Building2,
  Check: lucide.Check,
  CheckCircle: lucide.CheckCircle,
  ChevronRight: lucide.ChevronRight,
  CirclePlay: lucide.CirclePlay,
  Cloud: lucide.Cloud,
  Code: lucide.Code,
  Cpu: lucide.Cpu,
  Database: lucide.Database,
  Download: lucide.Download,
  ExternalLink: lucide.ExternalLink,
  FileText: lucide.FileText,
  Fingerprint: lucide.Fingerprint,
  FlaskConical: lucide.FlaskConical,
  FolderGit: lucide.FolderGit,
  GitBranch: lucide.GitBranch,
  GitCommit: lucide.GitCommit,
  GitFork: lucide.GitFork,
  GitPullRequest: lucide.GitPullRequest,
  Globe: lucide.Globe,
  Hammer: lucide.Hammer,
  HardDrive: lucide.HardDrive,
  Hash: lucide.Hash,
  Info: lucide.Info,
  Key: lucide.Key,
  KeyRound: lucide.KeyRound,
  Laptop: lucide.Laptop,
  Layers: lucide.Layers,
  LifeBuoy: lucide.LifeBuoy,
  Link2: lucide.Link2,
  Lock: lucide.Lock,
  Monitor: lucide.Monitor,
  Network: lucide.Network,
  Package: lucide.Package,
  PackageOpen: lucide.PackageOpen,
  Puzzle: lucide.Puzzle,
  Radio: lucide.Radio,
  RefreshCcw: lucide.RefreshCcw,
  RefreshCw: lucide.RefreshCw,
  Rocket: lucide.Rocket,
  RotateCcw: lucide.RotateCcw,
  Search: lucide.Search,
  Server: lucide.Server,
  Settings: lucide.Settings,
  Shield: lucide.Shield,
  Sliders: lucide.Sliders,
  Terminal: lucide.Terminal,
  Timer: lucide.Timer,
  Unplug: lucide.Unplug,
  UserPlus: lucide.UserPlus,
  Users: lucide.Users,
  Wifi: lucide.Wifi,
  WifiOff: lucide.WifiOff,
  Wrench: lucide.Wrench,
  Zap: lucide.Zap
};
const IconLabelMap = {
  Activity: "Monitor health in real time",
  AlertTriangle: "Catch issues before they reach users",
  Blocks: "Composable access control",
  Box: "Extension installation path",
  BrainCircuit: "AI capability path",
  Building2: "Organization-wide access control",
  Check: "Requirement met",
  CheckCircle: "Your identity is confirmed",
  ChevronRight: "Continue",
  CirclePlay: "Automate your release pipeline",
  Cloud: "Planned workspace sync",
  Code: "Code and build tooling",
  Cpu: "Runs at native CPU speed",
  Database: "Your data stored safely",
  Download: "Download path",
  ExternalLink: "Opens external resource",
  FileText: "Audit record path",
  Fingerprint: "Proves it's really you",
  FlaskConical: "Tested before it ships to you",
  FolderGit: "Your code, version-controlled",
  GitBranch: "Work across branches freely",
  GitCommit: "Changes tracked forever",
  GitFork: "Your code history, always intact",
  GitPullRequest: "Review before it merges",
  Globe: "Network or platform route",
  Hammer: "Build tooling",
  HardDrive: "Lives on your machine, not the cloud",
  Hash: "Cryptographically verified",
  Info: "More detail available",
  Key: "Identity key",
  KeyRound: "Identity provider route",
  Laptop: "Desktop path",
  Layers: "Type errors caught at compile time",
  LifeBuoy: "Help when you need it",
  Link2: "Connections stay live",
  Lock: "Encrypted or permissioned route",
  Monitor: "Workbench surface",
  Network: "Connects over your local network",
  Package: "Shipped as one native bundle",
  PackageOpen: "Inspect every line of code",
  Puzzle: "Unmodified extension path",
  Radio: "Always listening for reconnects",
  RefreshCcw: "Restarts cleanly every time",
  RefreshCw: "Your preferences follow you",
  Rocket: "Release path",
  RotateCcw: "Roll back in seconds",
  Search: "Find anything in your codebase",
  Server: "Service route",
  Settings: "Everything configurable by you",
  Shield: "Verification boundary",
  Sliders: "Fine-tune every detail",
  Terminal: "Full shell access, right here",
  Timer: "Deploys in under 60 s",
  Unplug: "Full functionality when internet is gone",
  UserPlus: "New developers onboard in minutes",
  Users: "Shared across your whole team",
  Wifi: "Stays connected to your local daemon",
  WifiOff: "Full power, no internet required",
  Wrench: "Modern developer toolchain",
  Zap: "Instant response, zero lag"
};
const IconColorMap = {
  // Identity / crypto - TierEnterprise (charcoal → SpineWASM for identity)
  Lock: "var(--SpineWASMFore)",
  Key: "var(--SpineWASMFore)",
  Fingerprint: "var(--SpineWASMFore)",
  Shield: "var(--SpineWASMFore)",
  // Network / connect - TierLocalFirst (TCP orange)
  Wifi: "var(--SpineTCPFore)",
  WifiOff: "var(--SpineTCPFore)",
  Globe: "var(--SpineIPCFore)",
  Network: "var(--SpineIPCFore)",
  Radio: "var(--SpineTCPFore)",
  Link2: "var(--SpineIPCFore)",
  // Storage / hardware - PlatformDesktop slate
  HardDrive: "var(--PlatformDesktopFore)",
  Server: "var(--PlatformDesktopFore)",
  Database: "var(--DatabasePostgresFore)",
  Cpu: "var(--PlatformDesktopFore)",
  Terminal: "var(--PlatformCLIFore)",
  // Build / code - ExtensionRust / LanguageRust emerald
  Code: "var(--SpinegRPCFore)",
  Wrench: "var(--SpinegRPCFore)",
  Hammer: "var(--SpinegRPCFore)",
  FlaskConical: "var(--SpinegRPCFore)",
  Package: "var(--SpinegRPCFore)",
  PackageOpen: "var(--SpinegRPCFore)",
  Box: "var(--SpinegRPCFore)",
  Puzzle: "var(--PlatformExtensionFore)",
  // Git / VCS - LanguageJavaScript amber
  GitBranch: "var(--LanguageJavaScriptFore)",
  GitFork: "var(--LanguageJavaScriptFore)",
  GitCommit: "var(--LanguageJavaScriptFore)",
  GitPullRequest: "var(--LanguageJavaScriptFore)",
  FolderGit: "var(--LanguageJavaScriptFore)",
  // Cloud / sync / deploy - TierCloud (SpineIPC blue)
  Cloud: "var(--TierCloudFore)",
  RefreshCw: "var(--TierCloudFore)",
  RefreshCcw: "var(--TierCloudFore)",
  RotateCcw: "var(--TierCloudFore)",
  Download: "var(--TierCloudFore)",
  Rocket: "var(--TierCloudFore)",
  Timer: "var(--TierCloudFore)",
  Zap: "var(--TierCloudFore)",
  // Auth / provisioning - TierProvider (SpineWASM violet)
  KeyRound: "var(--TierProviderFore)",
  UserPlus: "var(--TierProviderFore)",
  Users: "var(--TierProviderFore)",
  Building2: "var(--TierProviderFore)",
  Blocks: "var(--TierProviderFore)",
  // Audit / docs - DatabaseTurso teal
  FileText: "var(--DatabaseTursoFore)",
  Activity: "var(--DatabaseTursoFore)",
  AlertTriangle: "var(--DatabaseTursoFore)",
  Info: "var(--DatabaseTursoFore)",
  Search: "var(--DatabaseTursoFore)",
  // Settings / config - PlatformDesktop slate
  Settings: "var(--PlatformDesktop)",
  Sliders: "var(--PlatformDesktop)",
  CheckCircle: "var(--PlatformDesktop)",
  Check: "var(--PlatformDesktop)",
  ChevronRight: "var(--PlatformDesktop)",
  // Connectivity misc - TierLocalFirst (SpineTCP orange)
  Unplug: "var(--TierLocalFirstFore)",
  ExternalLink: "var(--TierLocalFirstFore)",
  Layers: "var(--TierLocalFirstFore)",
  Hash: "var(--TierLocalFirstFore)",
  // AI - SpineWASM purple
  BrainCircuit: "var(--SpineWASM)",
  // Support / lifecycle - PlatformMobile pink
  LifeBuoy: "var(--PlatformMobileFore)",
  CirclePlay: "var(--PlatformMobileFore)",
  Monitor: "var(--PlatformMobileFore)",
  Laptop: "var(--PlatformMobileFore)"
};
const EnterpriseSSOForm = ({
  Content,
  Disabled
}) => {
  const [OrganizationDomain, SetOrganizationDomain] = useState("");
  const [OktaDomain, SetOktaDomain] = useState("");
  const [AzureTenant, SetAzureTenant] = useState("");
  const [SamlMetadata, SetSamlMetadata] = useState("");
  const [OrganizationId, SetOrganizationId] = useState("");
  const { t: T } = useTranslation("account");
  const HandleEnterpriseLogin = (Connection, Extra) => {
    if (Disabled) return;
    const Params = new URLSearchParams();
    Params.set("connection", Connection);
    if (OrganizationDomain.trim()) {
      Params.set("login_hint", OrganizationDomain.trim());
    }
    if (OrganizationId.trim()) {
      Params.set("organization", OrganizationId.trim());
    }
    if (Extra) {
      for (const [Key, Value] of Object.entries(Extra)) {
        if (Value.trim()) {
          Params.set(Key, Value.trim());
        }
      }
    }
    window.location.href = `/Account/SignIn?${Params.toString()}`;
  };
  const HandleDomainSubmit = (Event) => {
    Event.preventDefault();
    if (Disabled) return;
    if (!OrganizationDomain.trim()) return;
    const DomainParams = new URLSearchParams();
    DomainParams.set("login_hint", OrganizationDomain.trim());
    if (OrganizationId.trim()) {
      DomainParams.set("organization", OrganizationId.trim());
    }
    window.location.href = `/Account/SignIn?${DomainParams.toString()}`;
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
              Content: {
                Label: T("portal.enterprise.domainLabel", {
                  defaultValue: "Work Email or Domain"
                }),
                Placeholder: T("portal.enterprise.domainPlaceholder", {
                  defaultValue: "name@company.com"
                }),
                Type: "email",
                Required: false,
                AutoComplete: "email",
                OnChange: SetOrganizationDomain
              },
              Id: "portal-enterprise-domain"
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "submit",
              className: "StaccatoButton w-full",
              disabled: Disabled,
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
                /* @__PURE__ */ jsx(lucide.Building2, { className: "h-4 w-4", "aria-hidden": "true" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "PortalTierDivider StaccatoSeparator" }),
        /* @__PURE__ */ jsx(
          DynamicInput,
          {
            Content: {
              Label: T("portal.enterprise.orgIdLabel", {
                defaultValue: "Auth0 Organization ID (optional)"
              }),
              Placeholder: T("portal.enterprise.orgIdPlaceholder", {
                defaultValue: "org_xxxxxxxxxxxxxxxx"
              }),
              Type: "text",
              Required: false,
              OnChange: SetOrganizationId
            },
            Id: "portal-enterprise-org-id"
          }
        ),
        /* @__PURE__ */ jsx(
          DynamicInput,
          {
            Content: {
              Label: T("portal.enterprise.oktaDomainLabel", {
                defaultValue: "Okta Domain"
              }),
              Placeholder: T("portal.enterprise.oktaDomainPlaceholder", {
                defaultValue: "your-org.okta.com"
              }),
              Type: "text",
              Required: false,
              OnChange: SetOktaDomain
            },
            Id: "portal-enterprise-okta-domain"
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            className: "StaccatoButton w-full",
            variant: "outline",
            disabled: Disabled,
            style: { borderColor: Content.BorderColor },
            onClick: () => HandleEnterpriseLogin("okta", {
              okta_domain: OktaDomain
            }),
            children: [
              T("portal.enterprise.continueOkta", {
                defaultValue: "Continue with Okta"
              }),
              " ",
              /* @__PURE__ */ jsx(IconTooltip, { Label: "Okta", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/Image/Okta.svg",
                  alt: "Okta",
                  width: "20",
                  height: "20",
                  className: "h-5 w-5"
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          DynamicInput,
          {
            Content: {
              Label: T("portal.enterprise.azureTenantLabel", {
                defaultValue: "Azure AD Tenant ID"
              }),
              Placeholder: T("portal.enterprise.azureTenantPlaceholder", {
                defaultValue: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              }),
              Type: "text",
              Required: false,
              OnChange: SetAzureTenant
            },
            Id: "portal-enterprise-azure-tenant"
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            className: "StaccatoButton w-full",
            variant: "outline",
            disabled: Disabled,
            style: { borderColor: Content.BorderColor },
            onClick: () => HandleEnterpriseLogin("waad", {
              tenant: AzureTenant
            }),
            children: [
              T("portal.enterprise.continueAzure", {
                defaultValue: "Continue with Azure AD"
              }),
              " ",
              /* @__PURE__ */ jsx(IconTooltip, { Label: "Microsoft Azure AD", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/Image/Microsoft.svg",
                  alt: "Microsoft",
                  width: "20",
                  height: "20",
                  className: "h-5 w-5"
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          DynamicInput,
          {
            Content: {
              Label: T("portal.enterprise.samlMetadataLabel", {
                defaultValue: "SAML Metadata URL"
              }),
              Placeholder: T(
                "portal.enterprise.samlMetadataPlaceholder",
                {
                  defaultValue: "https://your-idp.com/metadata.xml"
                }
              ),
              Type: "url",
              Required: false,
              OnChange: SetSamlMetadata
            },
            Id: "portal-enterprise-saml-metadata"
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            className: "StaccatoButton w-full",
            variant: "outline",
            disabled: Disabled,
            style: { borderColor: Content.BorderColor },
            onClick: () => HandleEnterpriseLogin("samlp", {
              saml_metadata_url: SamlMetadata
            }),
            children: [
              T("portal.enterprise.continueSAML", {
                defaultValue: "Continue with SAML"
              }),
              " ",
              /* @__PURE__ */ jsx(lucide.Lock, { className: "h-4 w-4", "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "PortalTierDivider StaccatoSeparator" }),
        /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground", children: T("portal.enterprise.note", {
          defaultValue: "OpenID Connect Discovery  +  SAML 2.0 Assertion  +  SCIM 2.0 User Provisioning"
        }) })
      ]
    }
  );
};
const PortalTierRow = ({
  Content,
  Index,
  Labels
}) => {
  const RowReference = useRef(null);
  const [, SetEmail] = useState("");
  const [, SetPassword] = useState("");
  const { t: T } = useTranslation("account");
  const IconComponent = Content.Icon ? TierIconRegistry[Content.Icon] || lucide.Shield : lucide.Shield;
  const TierIconLabel = IconLabelMap[Content.Icon ?? ""] ?? Content.Title;
  useEffect(() => {
    const Row = RowReference.current;
    if (!Row) return;
    const ReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (ReducedMotion) return;
    const ApplyScatter = async () => {
      const AttentionModule = await import('./Attention_BLLMNjcF.mjs');
      const Attention = await AttentionModule.default;
      Attention.ApplyToElement(Row, Index, 3, 2);
    };
    ApplyScatter();
  }, [Index]);
  const IsCloud = Content.Identifier === "Cloud";
  const IsProvider = Content.Identifier === "Provider";
  const IsLocalFirst = Content.Identifier === "LocalFirst";
  const IsEnterprise = Content.Identifier === "Enterprise";
  const StatusLabel = Content.Status === "ComingSoon" ? "Coming Soon" : Content.Status === "WIP" ? "WIP" : void 0;
  const IsUnavailable = Content.Status === "ComingSoon" || Content.Status === "WIP";
  const TierBorderClass = IsCloud ? "PortalTierCloud" : IsProvider ? "PortalTierProvider" : IsEnterprise ? "PortalTierEnterprise" : "PortalTierLocalFirst";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: RowReference,
      className: `PortalTierRow ${TierBorderClass} StaccatoCard StaccatoBorderShimmer ${IsUnavailable ? "opacity-70" : ""}`,
      role: "region",
      "aria-disabled": IsUnavailable,
      "aria-label": `${Content.Title} authentication tier`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "PortalTierLogin", children: /* @__PURE__ */ jsxs(Card, { className: "PortalTierCard", children: [
          /* @__PURE__ */ jsx(CardHeader, { className: "PortalTierCardHeader", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: Content.Title }),
            StatusLabel && /* @__PURE__ */ jsx("span", { className: "StaccatoBadge bg-[var(--Mute)] px-2 py-0.5 font-medium text-muted-foreground", children: StatusLabel }),
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
                  if (IsUnavailable) return;
                  window.location.href = "/Account/SignIn";
                },
                "aria-label": "Cloud sign in form",
                children: [
                  /* @__PURE__ */ jsx(
                    DynamicInput,
                    {
                      Content: {
                        Label: T("portal.cloud.emailLabel", {
                          defaultValue: "Email"
                        }),
                        Placeholder: T(
                          "portal.cloud.emailPlaceholder",
                          {
                            defaultValue: "name@example.com"
                          }
                        ),
                        Type: "email",
                        Required: true,
                        AutoComplete: "email",
                        OnChange: SetEmail
                      },
                      Id: "portal-cloud-email"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    DynamicInput,
                    {
                      Content: {
                        Label: T("portal.cloud.passwordLabel", {
                          defaultValue: "Password"
                        }),
                        Placeholder: T(
                          "portal.cloud.passwordPlaceholder",
                          {
                            defaultValue: "Enter your password"
                          }
                        ),
                        Type: "password",
                        Required: true,
                        AutoComplete: "current-password",
                        OnChange: SetPassword
                      },
                      Id: "portal-cloud-password"
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      type: "submit",
                      className: "StaccatoButton w-full",
                      disabled: IsUnavailable,
                      style: {
                        backgroundColor: Content.Color,
                        borderColor: Content.BorderColor,
                        color: "#ffffff"
                      },
                      children: [
                        T("portal.cloud.signIn", {
                          defaultValue: "Secure Sign In"
                        }),
                        " ",
                        /* @__PURE__ */ jsx(
                          lucide.Lock,
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
                      disabled: IsUnavailable,
                      style: { borderColor: Content.BorderColor },
                      onClick: () => {
                        window.location.href = "/Account/SignIn?connection=github";
                      },
                      children: [
                        T("portal.provider.continueGitHub", {
                          defaultValue: "Continue with GitHub"
                        }),
                        " ",
                        /* @__PURE__ */ jsx(IconTooltip, { Label: "GitHub", children: /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: "/Image/GitHub.svg",
                            alt: "GitHub",
                            width: "20",
                            height: "20",
                            className: "h-5 w-5"
                          }
                        ) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      className: "StaccatoButton w-full",
                      variant: "outline",
                      disabled: IsUnavailable,
                      style: { borderColor: Content.BorderColor },
                      onClick: () => {
                        window.location.href = "/Account/SignIn?connection=google-oauth2";
                      },
                      children: [
                        T("portal.provider.continueGoogle", {
                          defaultValue: "Continue with Google"
                        }),
                        " ",
                        /* @__PURE__ */ jsx(IconTooltip, { Label: "Google", children: /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: "/Image/Google.svg",
                            alt: "Google",
                            width: "20",
                            height: "20",
                            className: "h-5 w-5"
                          }
                        ) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      className: "StaccatoButton w-full",
                      variant: "outline",
                      disabled: IsUnavailable,
                      style: { borderColor: Content.BorderColor },
                      onClick: () => {
                        window.location.href = "/Account/SignIn?connection=gitlab";
                      },
                      children: [
                        T("portal.provider.continueGitLab", {
                          defaultValue: "Continue with GitLab"
                        }),
                        " ",
                        /* @__PURE__ */ jsx(IconTooltip, { Label: "GitLab", children: /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: "/Image/GitLab.svg",
                            alt: "GitLab",
                            width: "20",
                            height: "20",
                            className: "h-5 w-5"
                          }
                        ) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "PortalTierDivider StaccatoSeparator" }),
                  /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground", children: T("portal.provider.oauthNote", {
                    defaultValue: "OAuth 2.0   Profile + Email scope   Linked to your preferences"
                  }) })
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
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: T("portal.localfirst.daemonLabel", {
                      defaultValue: "Air Daemon"
                    }) }),
                    /* @__PURE__ */ jsx("span", { className: "ml-auto text-muted-foreground", children: T("portal.localfirst.daemonStatus", {
                      defaultValue: "Scanning..."
                    }) }),
                    " ",
                    /* @__PURE__ */ jsx("div", { className: "PortalTierDaemonDot StaccatoRhythmDot" })
                  ] }),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      className: "StaccatoButton w-full",
                      disabled: IsUnavailable,
                      style: {
                        backgroundColor: Content.Color,
                        borderColor: Content.BorderColor,
                        color: "#ffffff"
                      },
                      onClick: () => {
                        window.location.href = "/Dashboard?mode=local";
                      },
                      children: [
                        T("portal.localfirst.connect", {
                          defaultValue: "Connect to Air Daemon"
                        }),
                        " ",
                        /* @__PURE__ */ jsx(
                          lucide.Wifi,
                          {
                            className: "h-4 w-4",
                            "aria-hidden": "true"
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "PortalTierDivider StaccatoSeparator" }),
                  /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground", children: T("portal.localfirst.note", {
                    defaultValue: "Zero cloud dependency   JWT certificates   mTLS"
                  }) })
                ]
              }
            ),
            IsEnterprise && /* @__PURE__ */ jsx(
              EnterpriseSSOForm,
              {
                Content,
                Disabled: IsUnavailable
              }
            )
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
            /* @__PURE__ */ jsx("h4", { className: "PortalTierFeatureHeading", children: Labels?.Included ?? T("portal.labels.included", {
              defaultValue: "Included"
            }) }),
            /* @__PURE__ */ jsx("ul", { className: "PortalTierFeatureItems", children: Content.Feature.map((Feature, FeatureIndex) => /* @__PURE__ */ jsxs(
              "li",
              {
                className: `PortalTierFeatureItem ${(Feature.Status ?? Content.Status) && (Feature.Status ?? Content.Status) !== "Ready" ? "opacity-60" : ""}`,
                children: [
                  /* @__PURE__ */ jsxs("span", { className: "flex flex-wrap items-center gap-2 font-medium", children: [
                    Feature.Heading,
                    (Feature.Status ?? Content.Status) && (Feature.Status ?? Content.Status) !== "Ready" && /* @__PURE__ */ jsx("span", { className: "StaccatoBadge bg-[var(--Mute)] px-2 py-0.5 font-medium text-muted-foreground", children: (Feature.Status ?? Content.Status) === "WIP" ? "WIP" : "Coming Soon" })
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
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
                            const LucideColor = IconColorMap[IconName] ?? "var(--PlatformDesktop)";
                            return /* @__PURE__ */ jsxs(
                              "span",
                              {
                                className: "inline-flex items-center",
                                children: [
                                  IconIndex === 0 ? " " : /* @__PURE__ */ jsxs(Fragment, { children: [
                                    " ",
                                    "+",
                                    " "
                                  ] }),
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
            /* @__PURE__ */ jsx("h4", { className: "PortalTierFeatureHeading", children: Labels?.Capabilities ?? T("portal.labels.capabilities", {
              defaultValue: "Capabilities"
            }) }),
            /* @__PURE__ */ jsx("div", { className: "PortalTierCapabilityGrid", children: Content.Capability.map(
              (CapabilityText, CapabilityIndex) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `PortalTierCapabilityItem StaccatoBreath ${IsUnavailable ? "opacity-60" : ""}`,
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "", children: CapabilityText }),
                    StatusLabel && /* @__PURE__ */ jsxs(Fragment, { children: [
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "StaccatoBadge bg-[var(--Mute)] px-2 py-0.5 font-medium text-muted-foreground", children: StatusLabel })
                    ] }),
                    " ",
                    /* @__PURE__ */ jsx(
                      IconTooltip,
                      {
                        Label: "Verification boundary",
                        Icon: lucide.Shield,
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
            /* @__PURE__ */ jsx("span", { className: "font-medium text-muted-foreground", children: Labels?.Protocol ?? "Protocol:" }),
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
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: Labels?.SettingsManaged ?? "Settings Managed" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: Labels?.AllTiers ?? "Included in all tiers" }),
            " ",
            /* @__PURE__ */ jsx(
              IconTooltip,
              {
                Label: "Your preferences follow you across devices",
                Icon: lucide.RefreshCw,
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
const DynamicPortal = ({ Content }) => {
  const SectionReference = useRef(null);
  useEffect(() => {
    const ReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (ReducedMotion) return;
    let StopFunction;
    const StartNoise = async () => {
      const StaccatoModule = await import('./Staccato_CXFCM6My.mjs');
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
      "aria-labelledby": "PortalHeading",
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "PortalHeader StaccatoBreath", children: [
          /* @__PURE__ */ jsx("h1", { id: "PortalHeading", className: "PortalTitle", children: Content.Title }),
          /* @__PURE__ */ jsx("p", { className: "PortalSubtitle", children: Content.Subtitle })
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "PortalTierGrid",
            role: "group",
            "aria-label": "Authentication tiers",
            children: [
              /* @__PURE__ */ jsx(
                PortalTierRow,
                {
                  Content: Content.Cloud,
                  Index: 0,
                  Labels: Content.Labels
                }
              ),
              /* @__PURE__ */ jsx(
                PortalTierRow,
                {
                  Content: Content.Provider,
                  Index: 1,
                  Labels: Content.Labels
                }
              ),
              /* @__PURE__ */ jsx(
                PortalTierRow,
                {
                  Content: Content.LocalFirst,
                  Index: 2,
                  Labels: Content.Labels
                }
              ),
              Content.Enterprise && /* @__PURE__ */ jsx(
                PortalTierRow,
                {
                  Content: Content.Enterprise,
                  Index: 3,
                  Labels: Content.Labels
                }
              )
            ]
          }
        )
      ] })
    }
  );
};

const $$Portal = createComponent(($$result, $$props, $$slots) => {
  const T = GetI18n();
  const PortalContent = {
    Title: T("account.portal.title", {
      defaultValue: "CodeEditorLand Portal Roadmap"
    }),
    Subtitle: T("account.portal.subtitle", {
      defaultValue: "Account sign-in exists in WebSite. Cloud sync, provider identity, local-first daemon control, and enterprise SSO are planned portal surfaces, not required for the local editor path."
    }),
    Cloud: {
      Identifier: "Cloud",
      Title: T("account.portal.cloud.title", {
        defaultValue: "Cloud Plan"
      }),
      Subtitle: T("account.portal.cloud.subtitle", {
        defaultValue: "Planned hosted sync for users who want account-backed state.\n\nThe local editor should remain useful without this service."
      }),
      Color: "var(--TierCloud)",
      BorderColor: "var(--TierCloudFore)",
      Icon: "Cloud",
      Badge: "Online",
      Protocol: "HTTPS / TLS 1.3",
      Status: "ComingSoon",
      Feature: [
        {
          Heading: "Sync",
          Description: T("account.portal.cloud.feature.sync", {
            defaultValue: "Planned workspace sync across devices"
          }),
          Icon: ["RefreshCw", "Cloud", "Monitor"]
        },
        {
          Heading: "Backup",
          Description: T("account.portal.cloud.feature.backup", {
            defaultValue: "Planned encrypted backup for selected configuration"
          }),
          Icon: ["Cloud", "HardDrive", "Shield"]
        },
        {
          Heading: "Team",
          Description: T("account.portal.cloud.feature.team", {
            defaultValue: "Planned shared team workspace support"
          }),
          Icon: ["Users", "Settings"]
        },
        {
          Heading: "Extensions",
          Description: T("account.portal.cloud.feature.extension", {
            defaultValue: "Marketplace installation is planned after local extension paths stabilize"
          }),
          Icon: ["Puzzle", "Cloud", "Box"]
        },
        {
          Heading: "Remote",
          Description: T("account.portal.cloud.feature.remote", {
            defaultValue: "Remote development integration is planned"
          }),
          Icon: ["Server", "Monitor", "Wifi"]
        }
      ],
      Capability: [
        T("account.portal.cloud.capability.jwt", {
          defaultValue: "Planned account tokens for hosted services"
        }),
        T("account.portal.cloud.capability.okta", {
          defaultValue: "Okta SSO belongs to the enterprise plan"
        }),
        T("account.portal.cloud.capability.mfa", {
          defaultValue: "MFA support depends on the configured identity provider"
        }),
        T("account.portal.cloud.capability.rbac", {
          defaultValue: "Gateway RBAC is planned"
        }),
        T("account.portal.cloud.capability.audit", {
          defaultValue: "Audit logging is planned"
        }),
        T("account.portal.cloud.capability.cert", {
          defaultValue: "Developer certificate automation is planned"
        })
      ]
    },
    Provider: {
      Identifier: "Provider",
      Title: T("account.portal.provider.title", {
        defaultValue: "Provider Plan"
      }),
      Subtitle: T("account.portal.provider.subtitle", {
        defaultValue: "Use a developer identity provider where the WebSite account flow supports it.\n\nProvider scopes should stay minimal and be documented per provider before launch."
      }),
      Color: "var(--TierProvider)",
      BorderColor: "var(--TierProviderFore)",
      Icon: "GitFork",
      Badge: "OAuth 2.0",
      Protocol: "OAuth 2.0 / PKCE",
      Status: "ComingSoon",
      Feature: [
        {
          Heading: "GitHub",
          Description: T("account.portal.provider.feature.github", {
            defaultValue: "GitHub identity is planned as a low-friction sign-in option"
          }),
          Icon: ["/Image/GitHub.svg", "KeyRound", "Settings"]
        },
        {
          Heading: "SSO",
          Description: T("account.portal.provider.feature.sso", {
            defaultValue: "Single sign-on across Land services is planned"
          }),
          Icon: ["KeyRound", "Shield", "Globe"]
        },
        {
          Heading: "Repository",
          Description: T("account.portal.provider.feature.repo", {
            defaultValue: "Settings sync tied to provider identity is planned"
          }),
          Icon: ["GitBranch", "Settings", "HardDrive"]
        },
        {
          Heading: "Team",
          Description: T("account.portal.provider.feature.team", {
            defaultValue: "Organization and team membership sync is planned"
          }),
          Icon: ["Users", "RefreshCw", "Building2"]
        },
        {
          Heading: "CI/CD",
          Description: T("account.portal.provider.feature.ci", {
            defaultValue: "CI/CD integration belongs to later portal work"
          }),
          Icon: ["CirclePlay", "Rocket", "GitBranch"]
        }
      ],
      Capability: [
        T("account.portal.provider.capability.oauth", {
          defaultValue: "OAuth 2.0 / PKCE support where provider flows are enabled"
        }),
        T("account.portal.provider.capability.scope", {
          defaultValue: "Provider scopes should stay limited and documented"
        }),
        T("account.portal.provider.capability.token", {
          defaultValue: "Refresh token handling depends on provider configuration"
        }),
        T("account.portal.provider.capability.webhook", {
          defaultValue: "Webhook subscriptions are planned"
        }),
        T("account.portal.provider.capability.org", {
          defaultValue: "Organization-level access policies are planned"
        }),
        T("account.portal.provider.capability.cert", {
          defaultValue: "Developer certificate automation is planned"
        })
      ]
    },
    LocalFirst: {
      Identifier: "LocalFirst",
      Title: T("account.portal.localfirst.title", {
        defaultValue: "Local-First"
      }),
      Subtitle: T("account.portal.localfirst.subtitle", {
        defaultValue: "Land's editor direction is local-first. Air contains daemon and service code for updates, downloads, authentication, indexing, and health.\n\nBrowser-to-daemon portal control is planned rather than treated as shipped UI."
      }),
      Color: "var(--TierLocalFirst)",
      BorderColor: "var(--TierLocalFirstFore)",
      Icon: "HardDrive",
      Badge: "Local-First",
      Protocol: "mTLS / WebSocket planned",
      Status: "ComingSoon",
      Feature: [
        {
          Heading: "Air Daemon",
          Description: T("account.portal.localfirst.feature.daemon", {
            defaultValue: "Browser-to-daemon loopback control is planned"
          }),
          Icon: ["Wifi", "Server", "Lock"]
        },
        {
          Heading: "Build",
          Description: T("account.portal.localfirst.feature.build", {
            defaultValue: "Launching builds from the website console is planned"
          }),
          Icon: ["Hammer", "Monitor", "Globe"]
        },
        {
          Heading: "Deploy",
          Description: T("account.portal.localfirst.feature.deploy", {
            defaultValue: "Deploying changes into a running editor is planned"
          }),
          Icon: ["Rocket", "HardDrive"]
        },
        {
          Heading: "Configure",
          Description: T("account.portal.localfirst.feature.configure", {
            defaultValue: "Editor configuration management is planned"
          }),
          Icon: ["Settings", "Monitor"]
        },
        {
          Heading: "Extensions",
          Description: T("account.portal.localfirst.feature.parity", {
            defaultValue: "Installed VS Code extensions run unmodified through the Cocoon path when their APIs are implemented"
          }),
          Icon: ["Monitor", "RefreshCw"]
        },
        {
          Heading: "Offline",
          Description: T("account.portal.localfirst.feature.offline", {
            defaultValue: "Local editor operation should not require a cloud login"
          }),
          Icon: ["WifiOff", "Shield", "HardDrive"]
        },
        {
          Heading: "Embedded SaaS",
          Description: T("account.portal.localfirst.feature.bake", {
            defaultValue: "Embedding portal surfaces into the editor is planned"
          }),
          Icon: ["Box", "Monitor", "Globe"]
        }
      ],
      Capability: [
        T("account.portal.localfirst.capability.jwt", {
          defaultValue: "Short-lived local credentials are planned"
        }),
        T("account.portal.localfirst.capability.mtls", {
          defaultValue: "mTLS mutual authentication is planned for daemon control"
        }),
        T("account.portal.localfirst.capability.crdt", {
          defaultValue: "CRDT state synchronization is a design direction, not shipped editor behavior"
        }),
        T("account.portal.localfirst.capability.team", {
          defaultValue: "Fully local team management is planned"
        }),
        T("account.portal.localfirst.capability.cert", {
          defaultValue: "Local certificate authority code exists in Mountain; portal integration is planned"
        }),
        T("account.portal.localfirst.capability.ws", {
          defaultValue: "WebSocket loopback connection is planned"
        }),
        T("account.portal.localfirst.capability.rbac", {
          defaultValue: "Local RBAC policies are planned"
        }),
        T("account.portal.localfirst.capability.backup", {
          defaultValue: "Encrypted local backup is planned"
        })
      ]
    },
    Enterprise: {
      Identifier: "Enterprise",
      Title: T("account.portal.enterprise.title", {
        defaultValue: "Enterprise Plan"
      }),
      Subtitle: T("account.portal.enterprise.subtitle", {
        defaultValue: "Enterprise identity is a planned portal surface.\n\nOIDC, SAML 2.0, SCIM, and compliance documentation should only be presented as available when a deployment has those integrations configured."
      }),
      Color: "var(--PlatformDesktopFore)",
      BorderColor: "var(--PlatformDesktop)",
      Icon: "Shield",
      Badge: "Planned",
      Protocol: "OIDC / SAML 2.0 / SCIM planned",
      Status: "ComingSoon",
      Feature: [
        {
          Heading: "Okta",
          Description: T("account.portal.enterprise.feature.okta", {
            defaultValue: "Okta SSO integration is planned"
          }),
          Icon: ["/Image/Okta.svg", "KeyRound", "Shield"]
        },
        {
          Heading: "Azure AD",
          Description: T("account.portal.enterprise.feature.azure", {
            defaultValue: "Azure AD / Entra ID integration is planned"
          }),
          Icon: ["/Image/Microsoft.svg", "Cloud", "Building2"]
        },
        {
          Heading: "SAML 2.0",
          Description: T("account.portal.enterprise.feature.saml", {
            defaultValue: "SAML 2.0 support is planned"
          }),
          Icon: ["Shield", "Lock", "Building2"]
        },
        {
          Heading: "SCIM",
          Description: T("account.portal.enterprise.feature.scim", {
            defaultValue: "SCIM provisioning is planned"
          }),
          Icon: ["UserPlus", "RefreshCw", "Users"]
        },
        {
          Heading: "Groups",
          Description: T("account.portal.enterprise.feature.group", {
            defaultValue: "IdP group to Land role mapping is planned"
          }),
          Icon: ["Users", "KeyRound", "Shield"]
        },
        {
          Heading: "Audit",
          Description: T("account.portal.enterprise.feature.audit", {
            defaultValue: "Audit export is planned"
          }),
          Icon: ["FileText", "Shield", "Lock"]
        }
      ],
      Capability: [
        T("account.portal.enterprise.capability.oidc", {
          defaultValue: "OIDC discovery is planned"
        }),
        T("account.portal.enterprise.capability.jit", {
          defaultValue: "Just-in-time provisioning is planned"
        }),
        T("account.portal.enterprise.capability.mfa", {
          defaultValue: "MFA enforcement depends on the configured IdP"
        }),
        T("account.portal.enterprise.capability.session", {
          defaultValue: "Session duration policy is planned"
        }),
        T("account.portal.enterprise.capability.ca", {
          defaultValue: "Organization CA certificate management is planned"
        }),
        T("account.portal.enterprise.capability.compliance", {
          defaultValue: "Compliance documentation is planned"
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
    defaultValue: "Editor Portal | Code Editor Land"
  });
  const MetaDescription = T("meta.portal.description", {
    defaultValue: "CodeEditorLand account sign-in and planned portal modes for cloud, provider, local-first, and enterprise workflows."
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header", "client:component-export": "Header" })} ${maybeRenderHead()}<main id="main-content"> <!-- Breadcrumb --> <nav aria-label="Breadcrumb" class="container mx-auto px-4 pt-6 text-muted-foreground"> <ol class="flex flex-wrap items-center space-x-2"> <li> <a href="/" class="transition-colors hover:text-foreground"> ${T("common.breadcrumb.home", { defaultValue: "Home" })} </a> </li> <li class="mx-2">/</li> <li> <span class="font-medium text-foreground"> ${T("meta.portal.breadcrumb", {
    defaultValue: "Portal"
  })} </span> </li> </ol> </nav> <div class="container mx-auto flex flex-wrap items-center justify-center gap-3 px-4 pt-6 text-muted-foreground"> <picture> <img alt="Land" src="/Asset/Logo/Glyph/Land.svg" width="28" height="28"> </picture> <span class="inline-flex items-center border border-green-200 bg-green-50 px-2.5 py-0.5 font-medium text-green-700">
Telemetry Feature Gated&#x2001;<span class="h-1.5 w-1.5 rounded-none bg-green-500" aria-hidden="true"></span> </span> <span class="inline-flex items-center bg-[var(--Mute)] px-2.5 py-0.5 font-medium">
CC0 Licensed
</span> <span class="inline-flex items-center bg-[var(--Mute)] px-2.5 py-0.5 font-medium">
Auth0 + OAuth 2.0
</span> <span class="inline-flex items-center border border-green-200 bg-green-50 px-2.5 py-0.5 font-medium text-green-700">
OIDC / SAML / Okta Planned&#x2001;<span class="h-1.5 w-1.5 rounded-none bg-green-500" aria-hidden="true"></span> </span> <a href="https://PlayForm.Cloud" target="_blank" rel="noopener noreferrer" class="inline-flex items-center bg-[var(--Mute)] px-2.5 py-0.5 font-medium transition-colors hover:text-foreground">
PlayForm
</a> </div> ${renderComponent($$result2, "DynamicPortal", DynamicPortal, { "Content": PortalContent, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal", "client:component-export": "DynamicPortal" })} </main> ` })}`;
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
