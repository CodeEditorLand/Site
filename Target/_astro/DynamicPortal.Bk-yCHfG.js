const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/Attention.CDPaQ1i1.js","_astro/Footer.xysLliKW.js","_astro/Staccato.C01-Mbs-.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from './Footer.xysLliKW.js';
import { an as React, b1 as jsxDevRuntimeExports, b2 as reactExports, b4 as useTranslation, aZ as Zap, aX as Wrench, aV as WifiOff, aU as Wifi, aT as Users, aS as UserPlus, aR as Unplug, aL as Timer, aK as Terminal, aE as SlidersVertical, aC as Shield, aB as Settings, aA as Server, ax as Search, aw as RotateCcw, aq as Rocket, ap as RefreshCw, ao as RefreshCcw, am as Radio, al as Puzzle, ah as PackageOpen, ag as Package, ae as Network, ab as Monitor, a5 as Lock, a3 as Link2, a2 as LifeBuoy, a0 as Layers, $ as Laptop, _ as KeyRound, Z as Key, X as Info, U as Hash, S as HardDrive, R as Hammer, Q as Globe, P as GitPullRequest, O as GitFork, N as GitCommitHorizontal, M as GitBranch, L as FolderGit, K as FlaskConical, J as FingerprintPattern, I as FileText, E as ExternalLink, y as Download, D as Database, x as Cpu, q as Code, o as Cloud, m as CirclePlay, j as ChevronRight, l as CircleCheckBig, C as Check, h as Building2, g as BrainCircuit, e as Box, B as Blocks, aN as TriangleAlert, A as Activity } from './Vendor/React.D_hnTAe2.js';
import { T as ThemeIcon } from './Blog.C5m3bFxQ.js';
import { B as Button } from './Skeleton.Dp5ep6F2.js';
import { C as Card, d as CardHeader, e as CardTitle, a as CardContent } from './Card.XBnil_qE.js';
import { I as IconTooltip } from './IconTooltip.D9Gc1Gmr.js';
import { c as cn } from './Utility.BriZ7xTM.js';

const Input = React.forwardRef(
  ({ className, type = "text", ...props }, ref) => {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "input",
      {
        ref,
        type,
        className: cn(
          "bg-[var(--Mute)] px-3 py-2 ring-offset-[var(--Background)] file:border-0 file:bg-transparent file:font-medium placeholder:text-[var(--MuteForeground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--Ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ...props
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Input.tsx",
        lineNumber: 10,
        columnNumber: 4
      },
      undefined
    );
  }
);
Input.displayName = "Input";

const Label = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "label",
      {
        ref,
        className: cn(
          "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        ),
        ...props
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Label.tsx",
        lineNumber: 10,
        columnNumber: 4
      },
      undefined
    );
  }
);
Label.displayName = "Label";

const DynamicInput = ({ Content, Id: PropertyIdentifier }) => {
  const {
    Label: LabelText,
    Placeholder,
    Type = "text",
    Value,
    DefaultValue,
    Error,
    Disabled = false,
    Required = false,
    HelperText,
    ClassName,
    OnChange,
    AutoComplete,
    ...props
  } = Content;
  const AutoId = reactExports.useId();
  const Identifier = PropertyIdentifier || AutoId;
  const ErrorIdentifier = `${Identifier}-error`;
  const HelperIdentifier = `${Identifier}-helper`;
  const DescribedBy = Error ? ErrorIdentifier : HelperText ? HelperIdentifier : void 0;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "StaccatoInput flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Input,
      {
        id: Identifier,
        type: Type,
        placeholder: Placeholder,
        value: Value,
        defaultValue: DefaultValue,
        disabled: Disabled,
        required: Required,
        "aria-invalid": !!Error,
        "aria-describedby": DescribedBy,
        className: Error ? "border-destructive" : ClassName,
        ...AutoComplete ? { autoComplete: AutoComplete } : {},
        onChange: (Event) => {
          if (OnChange) {
            OnChange(Event.target.value);
          }
          if (Content.OnChange) {
            Content.OnChange(Event.target.value);
          }
        },
        ...props
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicInput.tsx",
        lineNumber: 42,
        columnNumber: 4
      },
      undefined
    ),
    LabelText && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Label,
      {
        htmlFor: Identifier,
        className: "block text-muted-foreground",
        children: LabelText
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicInput.tsx",
        lineNumber: 65,
        columnNumber: 5
      },
      undefined
    ),
    Error && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "p",
      {
        id: ErrorIdentifier,
        className: "text-destructive",
        role: "alert",
        children: Error
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicInput.tsx",
        lineNumber: 72,
        columnNumber: 5
      },
      undefined
    ),
    !Error && HelperText && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { id: HelperIdentifier, className: "text-muted-foreground", children: HelperText }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicInput.tsx",
      lineNumber: 80,
      columnNumber: 5
    }, undefined)
  ] }, void 0, true, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicInput.tsx",
    lineNumber: 41,
    columnNumber: 3
  }, undefined);
};

const TierIconRegistry = {
  Activity: Activity,
  AlertTriangle: TriangleAlert,
  Blocks: Blocks,
  Box: Box,
  BrainCircuit: BrainCircuit,
  Building2: Building2,
  Check: Check,
  CheckCircle: CircleCheckBig,
  ChevronRight: ChevronRight,
  CirclePlay: CirclePlay,
  Cloud: Cloud,
  Code: Code,
  Cpu: Cpu,
  Database: Database,
  Download: Download,
  ExternalLink: ExternalLink,
  FileText: FileText,
  Fingerprint: FingerprintPattern,
  FlaskConical: FlaskConical,
  FolderGit: FolderGit,
  GitBranch: GitBranch,
  GitCommit: GitCommitHorizontal,
  GitFork: GitFork,
  GitPullRequest: GitPullRequest,
  Globe: Globe,
  Hammer: Hammer,
  HardDrive: HardDrive,
  Hash: Hash,
  Info: Info,
  Key: Key,
  KeyRound: KeyRound,
  Laptop: Laptop,
  Layers: Layers,
  LifeBuoy: LifeBuoy,
  Link2: Link2,
  Lock: Lock,
  Monitor: Monitor,
  Network: Network,
  Package: Package,
  PackageOpen: PackageOpen,
  Puzzle: Puzzle,
  Radio: Radio,
  RefreshCcw: RefreshCcw,
  RefreshCw: RefreshCw,
  Rocket: Rocket,
  RotateCcw: RotateCcw,
  Search: Search,
  Server: Server,
  Settings: Settings,
  Shield: Shield,
  Sliders: SlidersVertical,
  Terminal: Terminal,
  Timer: Timer,
  Unplug: Unplug,
  UserPlus: UserPlus,
  Users: Users,
  Wifi: Wifi,
  WifiOff: WifiOff,
  Wrench: Wrench,
  Zap: Zap
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
  const [OrganizationDomain, SetOrganizationDomain] = reactExports.useState("");
  const [OktaDomain, SetOktaDomain] = reactExports.useState("");
  const [AzureTenant, SetAzureTenant] = reactExports.useState("");
  const [SamlMetadata, SetSamlMetadata] = reactExports.useState("");
  const [OrganizationId, SetOrganizationId] = reactExports.useState("");
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "space-y-4",
      "aria-label": T("portal.enterprise.ariaLabel", {
        defaultValue: "Enterprise SSO"
      }),
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: HandleDomainSubmit, className: "space-y-3", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
              lineNumber: 326,
              columnNumber: 5
            },
            undefined
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Building2, { className: "h-4 w-4", "aria-hidden": "true" }, void 0, false, {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                  lineNumber: 354,
                  columnNumber: 6
                }, undefined)
              ]
            },
            void 0,
            true,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
              lineNumber: 341,
              columnNumber: 5
            },
            undefined
          )
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
          lineNumber: 325,
          columnNumber: 4
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "PortalTierDivider StaccatoSeparator" }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
          lineNumber: 358,
          columnNumber: 4
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
            lineNumber: 360,
            columnNumber: 4
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
            lineNumber: 375,
            columnNumber: 4
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(IconTooltip, { Label: "Okta", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                ThemeIcon,
                {
                  src: "/Image/Okta.svg",
                  alt: "Okta",
                  width: 20,
                  height: 20,
                  className: "h-5 w-5"
                },
                void 0,
                false,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                  lineNumber: 404,
                  columnNumber: 6
                },
                undefined
              ) }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                lineNumber: 403,
                columnNumber: 5
              }, undefined)
            ]
          },
          void 0,
          true,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
            lineNumber: 389,
            columnNumber: 4
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
            lineNumber: 414,
            columnNumber: 4
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(IconTooltip, { Label: "Microsoft Azure AD", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                ThemeIcon,
                {
                  src: "/Image/Microsoft.svg",
                  alt: "Microsoft",
                  width: 20,
                  height: 20,
                  className: "h-5 w-5"
                },
                void 0,
                false,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                  lineNumber: 443,
                  columnNumber: 6
                },
                undefined
              ) }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                lineNumber: 442,
                columnNumber: 5
              }, undefined)
            ]
          },
          void 0,
          true,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
            lineNumber: 428,
            columnNumber: 4
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
            lineNumber: 453,
            columnNumber: 4
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Lock, { className: "h-4 w-4", "aria-hidden": "true" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                lineNumber: 484,
                columnNumber: 5
              }, undefined)
            ]
          },
          void 0,
          true,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
            lineNumber: 470,
            columnNumber: 4
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "PortalTierDivider StaccatoSeparator" }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
          lineNumber: 487,
          columnNumber: 4
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-center text-muted-foreground", children: T("portal.enterprise.note", {
          defaultValue: "OpenID Connect Discovery  +  SAML 2.0 Assertion  +  SCIM 2.0 User Provisioning"
        }) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
          lineNumber: 488,
          columnNumber: 4
        }, undefined)
      ]
    },
    void 0,
    true,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
      lineNumber: 320,
      columnNumber: 3
    },
    undefined
  );
};
const PortalTierRow = ({
  Content,
  Index,
  Labels
}) => {
  const RowReference = reactExports.useRef(null);
  const [, SetEmail] = reactExports.useState("");
  const [, SetPassword] = reactExports.useState("");
  const { t: T } = useTranslation("account");
  const IconComponent = Content.Icon ? TierIconRegistry[Content.Icon] || Shield : Shield;
  const TierIconLabel = IconLabelMap[Content.Icon ?? ""] ?? Content.Title;
  reactExports.useEffect(() => {
    const Row = RowReference.current;
    if (!Row) return;
    const ReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (ReducedMotion) return;
    const ApplyScatter = async () => {
      const AttentionModule = await __vitePreload(() => import('./Attention.CDPaQ1i1.js'),true              ?__vite__mapDeps([0,1]):void 0);
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      ref: RowReference,
      className: `PortalTierRow ${TierBorderClass} StaccatoCard StaccatoBorderShimmer ${IsUnavailable ? "opacity-70" : ""}`,
      role: "region",
      "aria-disabled": IsUnavailable,
      "aria-label": `${Content.Title} authentication tier`,
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "PortalTierLogin", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "PortalTierCard", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { className: "PortalTierCardHeader", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-xl", children: Content.Title }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
              lineNumber: 576,
              columnNumber: 8
            }, undefined),
            StatusLabel && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "StaccatoBadge bg-[var(--Mute)] px-2 py-0.5 font-medium text-muted-foreground", children: StatusLabel }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
              lineNumber: 580,
              columnNumber: 9
            }, undefined),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "PortalTierIconWrapper", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              IconTooltip,
              {
                Label: TierIconLabel,
                Icon: IconComponent,
                Color: Content.Color,
                SizeClass: "h-6 w-6",
                ClassName: "StaccatoIcon"
              },
              void 0,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                lineNumber: 586,
                columnNumber: 9
              },
              undefined
            ) }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
              lineNumber: 585,
              columnNumber: 8
            }, undefined)
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
            lineNumber: 575,
            columnNumber: 7
          }, undefined) }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
            lineNumber: 574,
            columnNumber: 6
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { children: [
            IsCloud && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
                    },
                    void 0,
                    false,
                    {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                      lineNumber: 608,
                      columnNumber: 9
                    },
                    undefined
                  ),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
                    },
                    void 0,
                    false,
                    {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                      lineNumber: 627,
                      columnNumber: 9
                    },
                    undefined
                  ),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          Lock,
                          {
                            className: "h-4 w-4",
                            "aria-hidden": "true"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                            lineNumber: 659,
                            columnNumber: 10
                          },
                          undefined
                        )
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                      lineNumber: 646,
                      columnNumber: 9
                    },
                    undefined
                  )
                ]
              },
              void 0,
              true,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                lineNumber: 598,
                columnNumber: 8
              },
              undefined
            ),
            IsProvider && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "div",
              {
                className: "space-y-4",
                "aria-label": "Provider authentication options",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(IconTooltip, { Label: "GitHub", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          ThemeIcon,
                          {
                            src: "/Image/GitHub.svg",
                            alt: "GitHub",
                            width: 20,
                            height: 20,
                            className: "h-5 w-5"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                            lineNumber: 685,
                            columnNumber: 11
                          },
                          undefined
                        ) }, void 0, false, {
                          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                          lineNumber: 684,
                          columnNumber: 10
                        }, undefined)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                      lineNumber: 671,
                      columnNumber: 9
                    },
                    undefined
                  ),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(IconTooltip, { Label: "Google", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          ThemeIcon,
                          {
                            src: "/Image/Google.svg",
                            alt: "Google",
                            width: 20,
                            height: 20,
                            className: "h-5 w-5"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                            lineNumber: 708,
                            columnNumber: 11
                          },
                          undefined
                        ) }, void 0, false, {
                          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                          lineNumber: 707,
                          columnNumber: 10
                        }, undefined)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                      lineNumber: 694,
                      columnNumber: 9
                    },
                    undefined
                  ),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(IconTooltip, { Label: "GitLab", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          ThemeIcon,
                          {
                            src: "/Image/GitLab.svg",
                            alt: "GitLab",
                            width: 20,
                            height: 20,
                            className: "h-5 w-5"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                            lineNumber: 731,
                            columnNumber: 11
                          },
                          undefined
                        ) }, void 0, false, {
                          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                          lineNumber: 730,
                          columnNumber: 10
                        }, undefined)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                      lineNumber: 717,
                      columnNumber: 9
                    },
                    undefined
                  ),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "PortalTierDivider StaccatoSeparator" }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                    lineNumber: 740,
                    columnNumber: 9
                  }, undefined),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-center text-muted-foreground", children: T("portal.provider.oauthNote", {
                    defaultValue: "OAuth 2.0   Profile + Email scope   Linked to your preferences"
                  }) }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                    lineNumber: 741,
                    columnNumber: 9
                  }, undefined)
                ]
              },
              void 0,
              true,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                lineNumber: 668,
                columnNumber: 8
              },
              undefined
            ),
            IsLocalFirst && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "div",
              {
                className: "space-y-4",
                "aria-label": "Local-first connection",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "PortalTierDaemonStatus StaccatoBreath", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium", children: T("portal.localfirst.daemonLabel", {
                      defaultValue: "Air Daemon"
                    }) }, void 0, false, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                      lineNumber: 755,
                      columnNumber: 10
                    }, undefined),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "ml-auto text-muted-foreground", children: T("portal.localfirst.daemonStatus", {
                      defaultValue: "Scanning..."
                    }) }, void 0, false, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                      lineNumber: 760,
                      columnNumber: 10
                    }, undefined),
                    " ",
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "PortalTierDaemonDot StaccatoRhythmDot" }, void 0, false, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                      lineNumber: 766,
                      columnNumber: 10
                    }, undefined)
                  ] }, void 0, true, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                    lineNumber: 754,
                    columnNumber: 9
                  }, undefined),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    Button,
                    {
                      className: "StaccatoButton w-full",
                      disabled: IsUnavailable,
                      style: {
                        backgroundColor: Content.Color,
                        borderColor: Content.BorderColor,
                        color: "#ffffff"
                      },
                      onClick: async () => {
                        try {
                          if (typeof navigator !== "undefined" && navigator.serviceWorker?.controller) {
                            await new Promise(
                              (Resolve) => {
                                const Timeout = setTimeout(
                                  Resolve,
                                  2e3
                                );
                                const OnMessage = (Event) => {
                                  if (Event.data?.Type === "Auth:Written") {
                                    clearTimeout(
                                      Timeout
                                    );
                                    navigator.serviceWorker.removeEventListener(
                                      "message",
                                      OnMessage
                                    );
                                    Resolve();
                                  }
                                };
                                navigator.serviceWorker.addEventListener(
                                  "message",
                                  OnMessage
                                );
                                navigator.serviceWorker.controller.postMessage(
                                  {
                                    Type: "Auth:Write",
                                    Token: "local-first",
                                    ExpiresAt: Date.now() + 36e5,
                                    UserId: "local-first"
                                  }
                                );
                              }
                            );
                          }
                        } catch {
                        }
                        window.location.href = "/Dashboard?mode=local";
                      },
                      children: [
                        T("portal.localfirst.connect", {
                          defaultValue: "Connect to Air Daemon"
                        }),
                        " ",
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          Wifi,
                          {
                            className: "h-4 w-4",
                            "aria-hidden": "true"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                            lineNumber: 839,
                            columnNumber: 10
                          },
                          undefined
                        )
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                      lineNumber: 768,
                      columnNumber: 9
                    },
                    undefined
                  ),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "PortalTierDivider StaccatoSeparator" }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                    lineNumber: 844,
                    columnNumber: 9
                  }, undefined),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-center text-muted-foreground", children: T("portal.localfirst.note", {
                    defaultValue: "Zero cloud dependency   JWT certificates   mTLS"
                  }) }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                    lineNumber: 845,
                    columnNumber: 9
                  }, undefined)
                ]
              },
              void 0,
              true,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                lineNumber: 751,
                columnNumber: 8
              },
              undefined
            ),
            IsEnterprise && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              EnterpriseSSOForm,
              {
                Content,
                Disabled: IsUnavailable
              },
              void 0,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                lineNumber: 855,
                columnNumber: 8
              },
              undefined
            )
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
            lineNumber: 596,
            columnNumber: 6
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
          lineNumber: 573,
          columnNumber: 5
        }, undefined) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
          lineNumber: 572,
          columnNumber: 4
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "PortalTierDescription", children: [
          Content.Badge && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "span",
            {
              className: "StaccatoBadge StaccatoRhythmBeat PortalTierBadge",
              style: {
                color: Content.Color,
                borderColor: Content.BorderColor
              },
              children: Content.Badge
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
              lineNumber: 867,
              columnNumber: 6
            },
            undefined
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "h3",
            {
              className: "PortalTierDescriptionTitle",
              style: { color: Content.Color },
              children: Content.Title
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
              lineNumber: 877,
              columnNumber: 5
            },
            undefined
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "PortalTierDescriptionSubtitle", children: Content.Subtitle }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
            lineNumber: 883,
            columnNumber: 5
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "PortalTierFeatureList", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "PortalTierFeatureHeading", children: Labels?.Included ?? T("portal.labels.included", {
              defaultValue: "Included"
            }) }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
              lineNumber: 889,
              columnNumber: 6
            }, undefined),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "PortalTierFeatureItems", children: Content.Feature.map((Feature, FeatureIndex) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "li",
              {
                className: `PortalTierFeatureItem ${(Feature.Status ?? Content.Status) && (Feature.Status ?? Content.Status) !== "Ready" ? "opacity-60" : ""}`,
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex flex-wrap items-center gap-2 font-medium", children: [
                    Feature.Heading,
                    (Feature.Status ?? Content.Status) && (Feature.Status ?? Content.Status) !== "Ready" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "StaccatoBadge bg-[var(--Mute)] px-2 py-0.5 font-medium text-muted-foreground", children: (Feature.Status ?? Content.Status) === "WIP" ? "WIP" : "Coming Soon" }, void 0, false, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                      lineNumber: 911,
                      columnNumber: 12
                    }, undefined)
                  ] }, void 0, true, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                    lineNumber: 906,
                    columnNumber: 9
                  }, undefined),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-muted-foreground", children: [
                    Feature.Description,
                    Feature.Icon && Feature.Icon.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
                            return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                              "span",
                              {
                                className: "inline-flex items-center",
                                children: [
                                  IconIndex === 0 ? " " : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                                    " ",
                                    "+",
                                    " "
                                  ] }, void 0, true, {
                                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                                    lineNumber: 964,
                                    columnNumber: 18
                                  }, undefined),
                                  IconName.startsWith(
                                    "/"
                                  ) ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                                    IconTooltip,
                                    {
                                      Label: IconLabel,
                                      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                                        "img",
                                        {
                                          src: IconName,
                                          alt: IconLabel,
                                          title: IconLabel,
                                          width: "16",
                                          height: "16",
                                          className: "h-4 w-4"
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                                          lineNumber: 981,
                                          columnNumber: 19
                                        },
                                        undefined
                                      )
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                                      lineNumber: 977,
                                      columnNumber: 18
                                    },
                                    undefined
                                  ) : (() => {
                                    const FeatureIcon = TierIconRegistry[IconName];
                                    return FeatureIcon ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                                      IconTooltip,
                                      {
                                        Label: IconLabel,
                                        Icon: FeatureIcon,
                                        Color: LucideColor,
                                        SizeClass: "h-4 w-4"
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                                        lineNumber: 1003,
                                        columnNumber: 20
                                      },
                                      undefined
                                    ) : null;
                                  })()
                                ]
                              },
                              IconIndex,
                              true,
                              {
                                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                                lineNumber: 957,
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
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                        lineNumber: 923,
                        columnNumber: 12
                      },
                      undefined
                    )
                  ] }, void 0, true, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                    lineNumber: 919,
                    columnNumber: 9
                  }, undefined)
                ]
              },
              FeatureIndex,
              true,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                lineNumber: 897,
                columnNumber: 8
              },
              undefined
            )) }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
              lineNumber: 895,
              columnNumber: 6
            }, undefined)
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
            lineNumber: 888,
            columnNumber: 5
          }, undefined),
          Content.Capability.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "PortalTierCapabilityList", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "PortalTierFeatureHeading", children: Labels?.Capabilities ?? T("portal.labels.capabilities", {
              defaultValue: "Capabilities"
            }) }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
              lineNumber: 1033,
              columnNumber: 7
            }, undefined),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "PortalTierCapabilityGrid", children: Content.Capability.map(
              (CapabilityText, CapabilityIndex) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "div",
                {
                  className: `PortalTierCapabilityItem StaccatoBreath ${IsUnavailable ? "opacity-60" : ""}`,
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "", children: CapabilityText }, void 0, false, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                      lineNumber: 1047,
                      columnNumber: 11
                    }, undefined),
                    StatusLabel && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                      " ",
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "StaccatoBadge bg-[var(--Mute)] px-2 py-0.5 font-medium text-muted-foreground", children: StatusLabel }, void 0, false, {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                        lineNumber: 1053,
                        columnNumber: 13
                      }, undefined)
                    ] }, void 0, true, {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                      lineNumber: 1051,
                      columnNumber: 12
                    }, undefined),
                    " ",
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      IconTooltip,
                      {
                        Label: "Verification boundary",
                        Icon: Shield,
                        Color: IconColorMap["Shield"],
                        SizeClass: "h-3 w-3 shrink-0"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                        lineNumber: 1059,
                        columnNumber: 11
                      },
                      undefined
                    )
                  ]
                },
                CapabilityIndex,
                true,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                  lineNumber: 1042,
                  columnNumber: 10
                },
                undefined
              )
            ) }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
              lineNumber: 1039,
              columnNumber: 7
            }, undefined)
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
            lineNumber: 1032,
            columnNumber: 6
          }, undefined),
          Content.Protocol && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "PortalTierProtocol", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium text-muted-foreground", children: Labels?.Protocol ?? "Protocol:" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
              lineNumber: 1077,
              columnNumber: 7
            }, undefined),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "code",
              {
                className: "PortalTierProtocolCode",
                style: { color: Content.Color },
                children: Content.Protocol
              },
              void 0,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                lineNumber: 1080,
                columnNumber: 7
              },
              undefined
            )
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
            lineNumber: 1076,
            columnNumber: 6
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "PortalTierSettingsManaged StaccatoBorderShimmer", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium", children: Labels?.SettingsManaged ?? "Settings Managed" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
              lineNumber: 1089,
              columnNumber: 6
            }, undefined),
            " ",
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-muted-foreground", children: Labels?.AllTiers ?? "Included in all tiers" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
              lineNumber: 1093,
              columnNumber: 6
            }, undefined),
            " ",
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              IconTooltip,
              {
                Label: "Your preferences follow you across devices",
                Icon: RefreshCw,
                Color: IconColorMap["RefreshCw"],
                SizeClass: "h-3.5 w-3.5",
                ClassName: "StaccatoIcon"
              },
              void 0,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                lineNumber: 1097,
                columnNumber: 6
              },
              undefined
            )
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
            lineNumber: 1088,
            columnNumber: 5
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
          lineNumber: 865,
          columnNumber: 4
        }, undefined)
      ]
    },
    void 0,
    true,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
      lineNumber: 563,
      columnNumber: 3
    },
    undefined
  );
};
const DynamicPortal = ({ Content }) => {
  const SectionReference = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const ReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (ReducedMotion) return;
    let StopFunction;
    const StartNoise = async () => {
      const StaccatoModule = await __vitePreload(() => import('./Staccato.C01-Mbs-.js'),true              ?__vite__mapDeps([2,1]):void 0);
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "section",
    {
      ref: SectionReference,
      id: "portal",
      className: "PortalSection",
      "aria-labelledby": "PortalHeading",
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "PortalHeader StaccatoBreath", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { id: "PortalHeading", className: "PortalTitle", children: Content.Title }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
            lineNumber: 1172,
            columnNumber: 6
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "PortalSubtitle", children: Content.Subtitle }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
            lineNumber: 1175,
            columnNumber: 6
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
          lineNumber: 1171,
          columnNumber: 5
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            className: "PortalTierGrid",
            role: "group",
            "aria-label": "Authentication tiers",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                PortalTierRow,
                {
                  Content: Content.Cloud,
                  Index: 0,
                  Labels: Content.Labels
                },
                void 0,
                false,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                  lineNumber: 1182,
                  columnNumber: 6
                },
                undefined
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                PortalTierRow,
                {
                  Content: Content.Provider,
                  Index: 1,
                  Labels: Content.Labels
                },
                void 0,
                false,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                  lineNumber: 1188,
                  columnNumber: 6
                },
                undefined
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                PortalTierRow,
                {
                  Content: Content.LocalFirst,
                  Index: 2,
                  Labels: Content.Labels
                },
                void 0,
                false,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                  lineNumber: 1194,
                  columnNumber: 6
                },
                undefined
              ),
              Content.Enterprise && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                PortalTierRow,
                {
                  Content: Content.Enterprise,
                  Index: 3,
                  Labels: Content.Labels
                },
                void 0,
                false,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
                  lineNumber: 1201,
                  columnNumber: 7
                },
                undefined
              )
            ]
          },
          void 0,
          true,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
            lineNumber: 1178,
            columnNumber: 5
          },
          undefined
        )
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
        lineNumber: 1170,
        columnNumber: 4
      }, undefined)
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx",
      lineNumber: 1165,
      columnNumber: 3
    },
    undefined
  );
};

export { DynamicPortal, DynamicPortal as default };
//# sourceMappingURL=DynamicPortal.Bk-yCHfG.js.map
