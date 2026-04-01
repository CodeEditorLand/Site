import { a as cn, c as createComponent, G as GetI18n, $ as $$Base } from './Base_xEyzTpo4.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './prerender_B86tonbF.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useTranslation } from 'react-i18next';
import { H as Header } from './Header_CX6MMaW-.mjs';
import { D as DynamicPlatformGrid, B as Badge } from './Badge_DHJgxaOk.mjs';
import { useRef, useEffect } from 'react';
import { D as DynamicButton } from './DynamicButton_DsXmBhZu.mjs';
import { Cpu, Monitor, Download, Shield, Fingerprint, Code, Zap, Layers, Server, Lock, EyeOff, Eye } from 'lucide-react';

function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b-[3px]", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 border-b transition-colors data-[state=selected]:bg-muted",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "h-10 whitespace-nowrap px-2 text-left align-middle font-medium text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}

const DynamicTable = ({
  content
}) => {
  const {
    columns: ColumnList,
    data: DataList,
    striped: Striped = false,
    hoverable: Hoverable = false,
    bordered: _Bordered = true,
    compact: _Compact = false,
    onRowClick: OnRowClick,
    className: ClassName
  } = content;
  return /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs(Table, { className: ClassName, children: [
    /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsx(TableRow, { children: ColumnList.map((Column, Index) => /* @__PURE__ */ jsx(TableHead, { className: Column.className, children: Column.header }, Index)) }) }),
    /* @__PURE__ */ jsx(TableBody, { children: DataList.map((Row, RowIndex) => /* @__PURE__ */ jsx(
      TableRow,
      {
        className: ` ${Striped && RowIndex % 2 === 1 ? "bg-muted/50" : ""} ${Hoverable ? "hover:bg-muted/50" : ""} ${OnRowClick ? "cursor-pointer" : ""} `,
        onClick: () => OnRowClick?.(Row),
        children: ColumnList.map((Column, ColumnIndex) => /* @__PURE__ */ jsx(
          TableCell,
          {
            className: Column.className,
            children: Column.render ? Column.render(Row[Column.key], Row) : String(Row[Column.key] ?? "")
          },
          ColumnIndex
        ))
      },
      RowIndex
    )) })
  ] }) });
};

const DynamicPreviousReleases = ({ content, className }) => {
  const { title, description, releases, showChangelog = true } = content;
  const SectionReference = useRef(null);
  useEffect(() => {
    const Section = SectionReference.current;
    if (!Section) return;
    const ReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (ReducedMotion) return;
    const ApplyScatter = async () => {
      const StaccatoModule = await import('./Staccato_Bzck3RTr.mjs');
      const Staccato = await StaccatoModule.default;
      Staccato.SeedElement(Section, 0);
    };
    ApplyScatter();
  }, []);
  const Columns = [
    {
      key: "version",
      header: "Version",
      render: (Value, _Row) => /* @__PURE__ */ jsx("span", { className: "font-semibold text-primary", children: String(Value) })
    },
    {
      key: "publishedAt",
      header: "Published",
      render: (Value) => /* @__PURE__ */ jsx("time", { dateTime: String(Value), children: new Date(String(Value)).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      }) })
    },
    {
      key: "size",
      header: "Size",
      render: (Value) => /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: String(Value) })
    },
    {
      key: "downloads",
      header: "Downloads",
      render: (Value) => /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: Value.toLocaleString() })
    },
    {
      key: "actions",
      header: "",
      render: (_Value, Row) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        Row.assets.map((Asset) => /* @__PURE__ */ jsx(
          DynamicButton,
          {
            content: {
              text: Asset.platform,
              variant: "outline",
              size: "sm",
              icon: Asset.platform === "macOS" ? "Apple" : Asset.platform === "Windows" ? "Monitor" : "Terminal"
            },
            onAction: () => content.onDownload?.(
              Row.version,
              Asset.platform
            )
          },
          Asset.platform
        )),
        showChangelog && Row.changelog && /* @__PURE__ */ jsx(
          DynamicButton,
          {
            content: {
              text: "Changelog",
              variant: "ghost",
              size: "sm"
            },
            onAction: () => content.onViewChangelog?.(Row.version)
          }
        )
      ] })
    }
  ];
  return /* @__PURE__ */ jsx(
    "section",
    {
      ref: SectionReference,
      className: `py-20 ${className || ""}`,
      "aria-label": "Previous releases",
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        (title || description) && /* @__PURE__ */ jsxs("div", { className: "mb-16 text-center", children: [
          title && /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl", children: title }),
          description && /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: description })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "StaccatoCard StaccatoBorderShimmer mx-auto max-w-5xl overflow-hidden rounded-none border border-[var(--Border)] bg-white", children: /* @__PURE__ */ jsx(
          DynamicTable,
          {
            content: {
              columns: Columns,
              data: releases,
              striped: true,
              hoverable: true,
              bordered: false,
              // Table already has outer border
              compact: false
            }
          }
        ) })
      ] })
    }
  );
};

const DynamicSystemRequirements = ({ content, className }) => {
  const { t: T } = useTranslation("download");
  const { title, description, requirements } = content;
  const GridReference = useRef(null);
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
      const Cards = Grid.querySelectorAll(".StaccatoCard");
      Cards.forEach((Card, Index) => {
        Attention.ApplyToElement(Card, Index, 4, 3);
      });
    };
    ApplyScatter();
  }, [requirements]);
  const RequirementList = ({
    items: ItemList,
    variant: Variant = "minimum"
  }) => /* @__PURE__ */ jsx("div", { className: "space-y-3", children: ItemList.map((Requirement) => /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
        Requirement.label,
        ":"
      ] }),
      " ",
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: Requirement.value })
    ] }),
    " ",
    /* @__PURE__ */ jsx("div", { className: "mt-1 shrink-0", children: Variant === "minimum" ? /* @__PURE__ */ jsx(Cpu, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsx(Monitor, { className: "h-4 w-4 text-muted-foreground" }) })
  ] }, Requirement.id)) });
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: `py-20 ${className || ""}`,
      "aria-label": "System requirements",
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-16 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl", children: title }),
          description && /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: description })
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: GridReference,
            className: "mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "StaccatoCard StaccatoBorderShimmer rounded-none border border-[var(--Border)] bg-white p-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "mb-6 text-xl font-semibold", children: T(
                  "systemRequirements.minimum",
                  "Minimum Requirements"
                ) }),
                /* @__PURE__ */ jsx(
                  RequirementList,
                  {
                    items: requirements.minimum,
                    variant: "minimum"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "StaccatoCard StaccatoBorderShimmer rounded-none border border-primary bg-white p-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "mb-6 text-xl font-semibold", children: T("systemRequirements.recommended", "Recommended") }),
                /* @__PURE__ */ jsx(
                  RequirementList,
                  {
                    items: requirements.recommended,
                    variant: "recommended"
                  }
                )
              ] })
            ]
          }
        ),
        content.os && content.os.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-12 text-center", children: [
          /* @__PURE__ */ jsx("h4", { className: "mb-4 text-lg font-semibold", children: T(
            "systemRequirements.supportedOS",
            "Supported Operating Systems"
          ) }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4", children: content.os.map((OperatingSystem, Index) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "border border-[var(--Border)] bg-secondary px-4 py-2 text-sm font-medium",
              children: OperatingSystem
            },
            Index
          )) })
        ] })
      ] })
    }
  );
};

const DynamicVerificationInfo = ({
  content,
  onVerify,
  className
}) => {
  const { t: T } = useTranslation("download");
  const { title, description, downloadVerification, integrityVerification } = content;
  const CopyToClipboard = (Text, Label) => {
    navigator.clipboard.writeText(Text).then(() => {
      alert(
        T("labels.copiedToClipboard", {
          defaultValue: "{{label}} copied to clipboard!",
          label: Label
        })
      );
    }).catch(() => {
      alert(
        T("labels.failedToCopy", {
          defaultValue: "Failed to copy {{label}}",
          label: Label
        })
      );
    });
  };
  const RenderVerificationBlock = (Information, Type) => /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    Information.sha256 && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "SHA-256 Checksum" }),
        " ",
        /* @__PURE__ */ jsx(
          Fingerprint,
          {
            className: "h-4 w-4 shrink-0 text-primary",
            "aria-hidden": "true"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-muted/50 flex items-center gap-2 border border-[var(--Border)] p-3", children: [
        /* @__PURE__ */ jsx("code", { className: "flex-1 truncate font-mono text-sm", children: Information.sha256 }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "border border-[var(--Border)] px-3 py-1 text-xs transition-colors hover:bg-accent",
            "aria-label": "Copy SHA-256 checksum to clipboard",
            onClick: () => CopyToClipboard(
              Information.sha256,
              "SHA-256 checksum"
            ),
            children: "Copy"
          }
        )
      ] })
    ] }),
    Information.pgpSignature && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "PGP Signature" }),
        " ",
        /* @__PURE__ */ jsx(
          Shield,
          {
            className: "h-4 w-4 shrink-0 text-primary",
            "aria-hidden": "true"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-muted/50 flex items-center gap-2 border border-[var(--Border)] p-3", children: [
        /* @__PURE__ */ jsx("code", { className: "flex-1 truncate font-mono text-sm", children: Information.pgpSignature }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "border border-[var(--Border)] px-3 py-1 text-xs transition-colors hover:bg-accent",
            "aria-label": "Copy PGP signature to clipboard",
            onClick: () => CopyToClipboard(
              Information.pgpSignature || "",
              "PGP signature"
            ),
            children: "Copy"
          }
        )
      ] }),
      Information.signingKeyId && /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Signed with key ID: ",
        Information.signingKeyId
      ] })
    ] }),
    Information.verificationInstructions && /* @__PURE__ */ jsxs("div", { className: "border-t border-[var(--Border)] pt-4", children: [
      /* @__PURE__ */ jsx("h5", { className: "mb-2 font-semibold", children: "Verification Instructions" }),
      /* @__PURE__ */ jsx("p", { className: "whitespace-pre-line text-sm text-muted-foreground", children: Information.verificationInstructions })
    ] }),
    Type === "download" && content.downloadButton && /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsx(
      DynamicButton,
      {
        content: { ...content.downloadButton, fullWidth: true }
      }
    ) }),
    Type === "integrity" && content.verifyButton && /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsx(
      DynamicButton,
      {
        content: { ...content.verifyButton, fullWidth: true },
        onAction: () => onVerify?.(integrityVerification.sha256 || "")
      }
    ) })
  ] });
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: `py-20 ${className || ""}`,
      "aria-label": "Download verification",
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl", children: [
        (title || description) && /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
          title && /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl", children: title }),
          description && /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "StaccatoCard StaccatoBorderShimmer rounded-none border border-[var(--Border)] bg-white p-6", children: [
            /* @__PURE__ */ jsxs("h3", { className: "mb-4 flex items-center text-xl font-semibold", children: [
              "Download Verification",
              " ",
              /* @__PURE__ */ jsx(
                Download,
                {
                  className: "h-5 w-5 shrink-0",
                  "aria-hidden": "true"
                }
              )
            ] }),
            RenderVerificationBlock(
              downloadVerification,
              "download"
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "StaccatoCard StaccatoBorderShimmer rounded-none border border-primary bg-white p-6", children: [
            /* @__PURE__ */ jsxs("h3", { className: "mb-4 flex items-center text-xl font-semibold", children: [
              "Integrity Check",
              " ",
              /* @__PURE__ */ jsx(
                Shield,
                {
                  className: "h-5 w-5 shrink-0",
                  "aria-hidden": "true"
                }
              )
            ] }),
            RenderVerificationBlock(
              integrityVerification,
              "integrity"
            )
          ] })
        ] })
      ] }) })
    }
  );
};

const DownloadsPage = ({ content, className }) => {
  const { t: T } = useTranslation(["download", "common"]);
  const ResolvedContent = content || {
    platformGrid: {
      title: T("download:page.title", {
        defaultValue: "Download Land"
      }),
      subtitle: T("download:page.subtitle", {
        defaultValue: "Available for macOS, Windows, and Linux.\nFast, native, and free."
      }),
      platforms: [],
      showVerification: true,
      onDownload: async (Platform) => {
        if (Platform.id) {
          try {
            const { default: DownloadAPI } = await import('./Download_D2DuJLeB.mjs');
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
    systemRequirements: {
      title: T("download:systemRequirements.title", {
        defaultValue: "System Requirements"
      }),
      description: T("download:systemRequirements.subtitle", {
        defaultValue: "Ensure your system meets these requirements before downloading."
      }),
      requirements: {
        minimum: [
          {
            id: "cpu-min",
            label: "Processor",
            value: "Intel Core i5 or AMD Ryzen 5 / Apple Silicon"
          },
          { id: "ram-min", label: "Memory", value: "4 GB RAM" },
          { id: "disk-min", label: "Disk Space", value: "500 MB" }
        ],
        recommended: [
          {
            id: "cpu-rec",
            label: "Processor",
            value: "Intel Core i7 or AMD Ryzen 7"
          },
          { id: "ram-rec", label: "Memory", value: "8 GB RAM" },
          {
            id: "disk-rec",
            label: "Disk Space",
            value: "1 GB SSD"
          }
        ]
      },
      os: [
        "macOS 11+",
        "Windows 10+",
        "Ubuntu 20.04+ / Fedora 35+ / Debian 11+"
      ]
    },
    verificationInfo: {
      title: T("download:verification.title", {
        defaultValue: "Verify Your Download"
      }),
      description: T("download:verification.description", {
        defaultValue: "Land releases will be signed with PGP. Verification checksums and signatures will be available with the first public release."
      }),
      downloadVerification: {
        sha256: "Available at first public release",
        pgpSignature: "Available at first public release",
        signingKeyId: "Available at first public release",
        verificationInstructions: "To verify: shasum -a 256 <filename> and compare output with the published checksum.\nFor PGP: gpg --verify <file>.sig <file>"
      },
      integrityVerification: {
        sha256: "Available at first public release",
        pgpSignature: "Available at first public release",
        verificationInstructions: "Verification instructions will be published alongside the first release. All releases will include SHA-256 checksums and PGP signatures."
      },
      downloadButton: {
        text: T("download:verification.downloadButton", {
          defaultValue: "Download PGP Public Key"
        }),
        variant: "outline",
        size: "default",
        fullWidth: false
      },
      verifyButton: {
        text: T("download:verification.verifyButton", {
          defaultValue: "Verify Download"
        }),
        variant: "default",
        size: "default",
        fullWidth: false
      }
    },
    previousReleases: {
      title: T("download:previousReleases.title", {
        defaultValue: "Previous Releases"
      }),
      description: T("download:previousReleases.description", {
        defaultValue: "No previous releases yet. The first public release is currently in development."
      }),
      releases: [],
      showChangelog: false
    }};
  const {
    platformGrid: PlatformGrid,
    systemRequirements: SystemRequirements,
    verificationInfo: VerificationInformation,
    previousReleases: PreviousReleases,
    header: HeaderContent
  } = ResolvedContent;
  return /* @__PURE__ */ jsxs("div", { className: `flex min-h-screen flex-col ${className || ""}`, children: [
    HeaderContent !== void 0 && /* @__PURE__ */ jsx(Header, { content: HeaderContent }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx(DynamicPlatformGrid, { content: PlatformGrid }),
      /* @__PURE__ */ jsx(DynamicSystemRequirements, { content: SystemRequirements }),
      /* @__PURE__ */ jsx(DynamicVerificationInfo, { content: VerificationInformation }),
      /* @__PURE__ */ jsx(DynamicPreviousReleases, { content: PreviousReleases })
    ] })
  ] });
};

const TransparencyIconRegistry = {
  Shield,
  Eye,
  EyeOff,
  Lock,
  Server,
  Cpu,
  Code,
  Layers,
  Zap
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
const DynamicTransparency = ({ content, className }) => {
  const {
    Title,
    Subtitle,
    Policy,
    Variant,
    Strategy,
    MatrixPermutation,
    SourceURL
  } = content;
  const SectionReference = useRef(null);
  useEffect(() => {
    const Section = SectionReference.current;
    if (!Section) return;
    const ReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (ReducedMotion) return;
    const ApplyNoise = async () => {
      const StaccatoModule = await import('./Staccato_Bzck3RTr.mjs');
      const Engine = await StaccatoModule.default;
      Engine.SeedSelector(".TransparencyCard");
    };
    ApplyNoise();
  }, []);
  const GetIcon = (IconName) => {
    return TransparencyIconRegistry[IconName] || null;
  };
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "Transparency",
      "aria-label": "Build Transparency",
      className: `flex w-full flex-col py-20 ${className || ""}`,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        (Title || Subtitle) && /* @__PURE__ */ jsxs("div", { className: "StaccatoBreath mb-16 text-center", children: [
          Title && /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl", children: Title }),
          Subtitle && /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-3xl text-lg text-muted-foreground", children: Subtitle })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-2 text-2xl tracking-tight", children: "Telemetry Policy" }),
          /* @__PURE__ */ jsx("p", { className: "mb-8 text-muted-foreground", children: "Full disclosure on what Land collects — and what it does not." }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3", children: Policy.map((Item) => {
            const Icon = GetIcon(Item.Icon);
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "TransparencyCard StaccatoCard StaccatoBorderShimmer flex flex-col space-y-4 rounded-none border border-[var(--Border)] bg-white p-6",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
                    /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold", children: Item.Title }),
                    /* @__PURE__ */ jsxs("div", { className: "ml-4 flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxs(
                        Badge,
                        {
                          variant: StatusBadgeVariant[Item.Status],
                          className: "StaccatoBadge",
                          children: [
                            Item.Status,
                            " ",
                            /* @__PURE__ */ jsx(
                              "span",
                              {
                                className: `StaccatoDot StaccatoRhythmDot h-2 w-2 rounded-none ${StatusColor[Item.Status]}`,
                                "aria-hidden": "true"
                              }
                            )
                          ]
                        }
                      ),
                      Icon && /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-[var(--Border)] bg-secondary",
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ jsx(
                            Icon,
                            {
                              className: "StaccatoIcon h-5 w-5 text-primary",
                              "aria-hidden": "true"
                            }
                          )
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "StaccatoBreath text-muted-foreground", children: Item.Description }),
                  Item.Detail && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground/70 text-xs", children: Item.Detail })
                ]
              },
              Item.Identifier
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-2 text-2xl tracking-tight", children: "Build Variants" }),
          /* @__PURE__ */ jsxs("p", { className: "mb-8 text-muted-foreground", children: [
            Variant.length,
            " named profiles across",
            " ",
            MatrixPermutation,
            " test permutations. Every combination verified."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-[var(--Border)]", children: [
              /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-sm font-semibold", children: "Profile" }),
              /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-sm font-semibold", children: "Tier" }),
              /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-sm font-semibold", children: "Workbench" }),
              /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-sm font-semibold", children: "Features" }),
              /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-sm font-semibold", children: "Status" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { children: Variant.map((Item) => /* @__PURE__ */ jsxs(
              "tr",
              {
                className: "border-b border-[var(--Border)] last:border-b-0",
                children: [
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono text-sm", children: Item.Name }),
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm", children: /* @__PURE__ */ jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "StaccatoBadge",
                      children: Item.Tier
                    }
                  ) }),
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm", children: Item.Workbench }),
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: Item.Feature }),
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm", children: /* @__PURE__ */ jsxs(Badge, { className: "StaccatoBadge", children: [
                    Item.Status,
                    " ",
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: `StaccatoDot h-2 w-2 rounded-none ${VariantStatusColor[Item.Status]}`,
                        "aria-hidden": "true"
                      }
                    )
                  ] }) })
                ]
              },
              Item.Identifier
            )) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-16", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-2 text-2xl tracking-tight", children: "Deployment Strategies" }),
          /* @__PURE__ */ jsx("p", { className: "mb-8 text-muted-foreground", children: "Four deployment modes from development to production." }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2", children: Strategy.map((Item) => {
            const Icon = GetIcon(Item.Icon);
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "TransparencyCard StaccatoCard StaccatoBorderShimmer flex flex-col space-y-4 rounded-none border border-[var(--Border)] bg-white p-6",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
                    /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold", children: Item.Name }),
                    Icon && /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-[var(--Border)] bg-secondary",
                        "aria-hidden": "true",
                        children: /* @__PURE__ */ jsx(
                          Icon,
                          {
                            className: "StaccatoIcon h-5 w-5 text-primary",
                            "aria-hidden": "true"
                          }
                        )
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "StaccatoBreath text-muted-foreground", children: Item.Description }),
                  /* @__PURE__ */ jsx("code", { className: "block rounded-none border border-[var(--Border)] bg-secondary px-3 py-2 text-xs", children: Item.Command }),
                  /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: Item.Feature.map(
                    (FeatureName, Index) => /* @__PURE__ */ jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "StaccatoBadge text-xs",
                        children: FeatureName
                      },
                      Index
                    )
                  ) })
                ]
              },
              Item.Identifier
            );
          }) })
        ] }),
        SourceURL && /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxs(
          "a",
          {
            href: SourceURL,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground",
            children: [
              "Verify in source code",
              /* @__PURE__ */ jsx("span", { className: "InlineSeparator", children: /* @__PURE__ */ jsx(Code, { className: "h-4 w-4", "aria-hidden": "true" }) })
            ]
          }
        ) })
      ] })
    }
  );
};

const $$Download = createComponent(async ($$result, $$props, $$slots) => {
  const T = GetI18n();
  const TransparencyContent = {
    Title: T("download.transparency.title", {
      defaultValue: "Build Transparency"
    }),
    Subtitle: T("download.transparency.subtitle", {
      defaultValue: "Full disclosure on telemetry, build variants, and deployment. Verify everything in source."
    }),
    Policy: [
      {
        Identifier: "no-telemetry-default",
        Title: "No Telemetry by Default",
        Description: "Production builds ship with telemetry completely disabled. The Telemetry Cargo feature flag is not in default features — it must be explicitly opted in at compile time.",
        Icon: "EyeOff",
        Status: "Disabled",
        Detail: "Default features: ExtensionHostCocoon, MistNative, AirIntegration. No Telemetry."
      },
      {
        Identifier: "no-crash-reporter",
        Title: "No Crash Reports",
        Description: "No crash reporter IDs, no external error reporting endpoints. Errors stay local. No crashReporterId in product.json.",
        Icon: "Shield",
        Status: "Disabled",
        Detail: "Code-OSS base: CC0 licensed, no Microsoft telemetry endpoints."
      },
      {
        Identifier: "no-phone-home",
        Title: "No Phone Home",
        Description: "No usage data collection, no analytics endpoints, no DO_NOT_TRACK needed — telemetry simply does not exist in the build.",
        Icon: "Lock",
        Status: "Disabled"
      },
      {
        Identifier: "zero-cost-noop",
        Title: "Zero-Cost No-Ops",
        Description: "When telemetry is disabled, all tracing, metrics, and spans compile to zero-cost no-ops. No runtime overhead whatsoever.",
        Icon: "Zap",
        Status: "Active",
        Detail: "Rust #[cfg(feature)] gates eliminate dead code at compile time."
      },
      {
        Identifier: "opt-in-otel",
        Title: "Optional OpenTelemetry",
        Description: "Opt-in compile flag enables local OpenTelemetry tracing, metrics collection, and distributed spans. All data stays on your machine.",
        Icon: "Eye",
        Status: "Optional",
        Detail: "Enable with: cargo build --features Telemetry. Sub-features: MetricsCollection, DistributedTracing."
      },
      {
        Identifier: "effect-ts-local",
        Title: "Local Effect-TS Telemetry",
        Description: "Cocoon extension host uses Effect-TS TelemetryService for internal metrics and spans. No external transmission — used for RPC instrumentation and bootstrap timing.",
        Icon: "Layers",
        Status: "Active",
        Detail: "TelemetryMock layer available for testing (all no-ops)."
      }
    ],
    Variant: [
      {
        Identifier: "debug",
        Name: "debug",
        Tier: "Debug",
        Workbench: "Browser",
        Feature: "70-80%",
        Status: "Available"
      },
      {
        Identifier: "debug-mountain",
        Name: "debug-mountain",
        Tier: "Debug",
        Workbench: "Mountain",
        Feature: "80-90%",
        Status: "Recommended"
      },
      {
        Identifier: "debug-electron",
        Name: "debug-electron",
        Tier: "Debug",
        Workbench: "Electron",
        Feature: "95%+",
        Status: "Legacy"
      },
      {
        Identifier: "production",
        Name: "production",
        Tier: "Release",
        Workbench: "Mountain",
        Feature: "80-90%",
        Status: "Recommended"
      },
      {
        Identifier: "release",
        Name: "release",
        Tier: "Release",
        Workbench: "Mountain",
        Feature: "100%",
        Status: "Available"
      },
      {
        Identifier: "web-browser",
        Name: "web-browser",
        Tier: "Release",
        Workbench: "Browser",
        Feature: "70-80%",
        Status: "Available"
      },
      {
        Identifier: "bundler-preparation",
        Name: "bundler-preparation",
        Tier: "Build",
        Workbench: "—",
        Feature: "—",
        Status: "Available"
      },
      {
        Identifier: "swc-bundle",
        Name: "swc-bundle",
        Tier: "Build",
        Workbench: "—",
        Feature: "—",
        Status: "Experimental"
      },
      {
        Identifier: "oxc-bundle",
        Name: "oxc-bundle",
        Tier: "Build",
        Workbench: "—",
        Feature: "—",
        Status: "Experimental"
      }
    ],
    Strategy: [
      {
        Identifier: "dev-hot-reload",
        Name: "Development (Hot-Reload)",
        Description: "Tauri dev mode with Sky dev server on localhost:9999. Live reload on file changes for rapid iteration.",
        Icon: "Zap",
        Command: "bash Maintain/Dev-Mountain.sh",
        Feature: [
          "Hot-Reload",
          "Sky Dev Server",
          "localhost:9999",
          "No Bundling"
        ]
      },
      {
        Identifier: "debug-build",
        Name: "Debug Build",
        Description: "Three debug profiles with profile-specific bundling. Browser, Mountain, and Electron variants with tauri build --debug.",
        Icon: "Code",
        Command: "bash Maintain/Debug/Build.sh --profile debug-mountain",
        Feature: [
          "3 Profiles",
          "Debug Symbols",
          "Configurable Port",
          "File Watching"
        ]
      },
      {
        Identifier: "production-release",
        Name: "Production Release",
        Description: "Mountain workbench with full bundling, clean build, production NODE_ENV, and RUST_LOG=info. Signed and packaged.",
        Icon: "Server",
        Command: "bash Maintain/Release/Build.sh --profile production",
        Feature: [
          "Full Bundle",
          "Clean Build",
          "PGP Signed",
          "RUST_LOG=info"
        ]
      },
      {
        Identifier: "web-only",
        Name: "Web-Only Deployment",
        Description: "Browser workbench with no Tauri runtime. 70-80% features for web-based deployments without native shell.",
        Icon: "Layers",
        Command: "bash Maintain/Release.sh --profile web-browser",
        Feature: [
          "No Tauri",
          "70-80% Features",
          "Web Deployment",
          "esbuild or OXC"
        ]
      }
    ],
    MatrixPermutation: 16,
    SourceURL: "https://github.com/CodeEditorLand/Land"
  };
  const DownloadContent = {
    platformGrid: {
      title: T("download.page.title", { defaultValue: "Download Land" }),
      subtitle: T("download.page.subtitle", {
        defaultValue: "Available for macOS, Windows, and Linux. Fast, native, and free."
      }),
      platforms: [],
      // Will be fetched by DynamicPlatformGrid
      showVerification: true,
      onDownload: async (Platform) => {
        if (Platform.id) {
          try {
            const { default: DownloadAPI } = await import('./Download_D2DuJLeB.mjs');
            const Information = await DownloadAPI.GetInfo(Platform.id);
            window.open(Information.downloadUrl, "_blank");
            await DownloadAPI.TrackDownload(Platform.id);
          } catch (DownloadError) {
            console.error("Download failed:", DownloadError);
          }
        }
      }
    },
    systemRequirements: {
      title: T("download.systemRequirements.title", {
        defaultValue: "System Requirements"
      }),
      description: T("download.systemRequirements.subtitle", {
        defaultValue: "Ensure your system meets these requirements before downloading."
      }),
      requirements: {
        minimum: [
          {
            id: "cpu-min",
            label: "Processor",
            value: "Intel Core i5 or AMD Ryzen 5 / Apple Silicon"
          },
          { id: "ram-min", label: "Memory", value: "4 GB RAM" },
          { id: "disk-min", label: "Disk Space", value: "500 MB" }
        ],
        recommended: [
          {
            id: "cpu-rec",
            label: "Processor",
            value: "Intel Core i7 or AMD Ryzen 7"
          },
          { id: "ram-rec", label: "Memory", value: "8 GB RAM" },
          { id: "disk-rec", label: "Disk Space", value: "1 GB SSD" }
        ]
      },
      os: [
        "macOS 11+",
        "Windows 10+",
        "Ubuntu 20.04+ / Fedora 35+ / Debian 11+"
      ]
    },
    verificationInfo: {
      title: T("download.verification.title", {
        defaultValue: "Verify Your Download"
      }),
      description: T("download.verification.description", {
        defaultValue: "Land releases will be signed with PGP. Verification checksums and signatures will be available with the first public release."
      }),
      downloadVerification: {
        sha256: "Available at first public release",
        pgpSignature: "Available at first public release",
        signingKeyId: "Available at first public release",
        verificationInstructions: "To verify: shasum -a 256 <filename> and compare output with the published checksum. For PGP: gpg --verify <file>.sig <file>"
      },
      integrityVerification: {
        sha256: "Available at first public release",
        pgpSignature: "Available at first public release",
        verificationInstructions: "Verification instructions will be published alongside the first release. All releases will include SHA-256 checksums and PGP signatures."
      },
      downloadButton: {
        text: T("download.verification.downloadButton", {
          defaultValue: "Download PGP Public Key"
        }),
        variant: "outline",
        size: "default",
        fullWidth: false
      },
      verifyButton: {
        text: T("download.verification.verifyButton", {
          defaultValue: "Verify Download"
        }),
        variant: "default",
        size: "default",
        fullWidth: false
      }
    },
    previousReleases: {
      title: T("download.previousReleases.title", {
        defaultValue: "Previous Releases"
      }),
      description: T("download.previousReleases.description", {
        defaultValue: "No previous releases yet. The first public release is currently in development."
      }),
      releases: [],
      showChangelog: false
    },
    header: void 0,
    footer: {}
  };
  const MetaTitle = T("meta.downloads.title", {
    defaultValue: "Download Land | The Next-Generation Code Editor"
  });
  const MetaDescription = T("meta.downloads.description", {
    defaultValue: "Download Land for macOS, Windows, and Linux. All releases are signed and verified for your security."
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header", "client:component-export": "Header" })} ${maybeRenderHead()}<div class="container mx-auto flex flex-wrap items-center justify-center gap-3 px-4 pt-6 text-xs text-muted-foreground"> <picture> <img alt="Land" src="/Asset/Logo/Glyph/Land.svg" width="24" height="24"> </picture> <span class="inline-flex items-center border border-green-200 bg-green-50 px-2.5 py-0.5 font-medium text-green-700">
No Telemetry&#x2001;<span class="h-1.5 w-1.5 rounded-none bg-green-500" aria-hidden="true"></span> </span> <span class="inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-2.5 py-0.5 font-medium">
CC0 Licensed
</span> <span class="inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-2.5 py-0.5 font-medium">
PGP Signed
</span> <span class="inline-flex items-center border border-blue-200 bg-blue-50 px-2.5 py-0.5 font-medium text-blue-700">
Mountain (Recommended)&#x2001;<span class="h-1.5 w-1.5 rounded-none bg-blue-500" aria-hidden="true"></span> </span> <span class="inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-2.5 py-0.5 font-medium">
9 Profiles
</span> <span class="inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-2.5 py-0.5 font-medium">
16 Test Permutations
</span> </div> ${renderComponent($$result2, "DownloadsPage", DownloadsPage, { "content": DownloadContent, "metaTitle": MetaTitle, "metaDescription": MetaDescription })} ${renderComponent($$result2, "DynamicTransparency", DynamicTransparency, { "content": TransparencyContent, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency", "client:component-export": "DynamicTransparency" })} ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Download.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Download.astro";
const $$url = "/Download";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Download,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
