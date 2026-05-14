import { jsxs, jsx } from 'react/jsx-runtime';
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { R as RichText } from './DynamicDocSidebar_CoCXJIn0.mjs';
import { D as DynamicButton } from './DynamicButton_Nlx4LMsf.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, e as CardFooter } from './Card_B9ZWGpwn.mjs';
import { cva } from 'class-variance-authority';
import { c as cn } from './Base_IAktlLoN.mjs';

const DynamicCard = ({ Sections, ClassName, OnClick }) => {
  const {
    Header: HeaderSection,
    Body: BodySection,
    Footer: FooterSection
  } = Sections;
  return /* @__PURE__ */ jsxs(
    Card,
    {
      className: `StaccatoCard StaccatoBorderShimmer ${ClassName || ""}`,
      onClick: OnClick,
      style: { cursor: OnClick ? "pointer" : void 0 },
      children: [
        HeaderSection && /* @__PURE__ */ jsxs(CardHeader, { children: [
          HeaderSection.title && /* @__PURE__ */ jsx(CardTitle, { children: HeaderSection.title }),
          HeaderSection.content && /* @__PURE__ */ jsx("div", { className: "mt-2", children: HeaderSection.content }),
          HeaderSection.description && /* @__PURE__ */ jsx(CardDescription, { children: HeaderSection.description })
        ] }),
        BodySection && /* @__PURE__ */ jsxs(CardContent, { children: [
          BodySection.title && /* @__PURE__ */ jsx("h3", { className: "mb-2 font-semibold", children: BodySection.title }),
          BodySection.description && /* @__PURE__ */ jsx("div", { className: "StaccatoBreath mb-4 text-muted-foreground", children: /* @__PURE__ */ jsx(RichText, { Text: BodySection.description }) }),
          BodySection.content
        ] }),
        FooterSection && /* @__PURE__ */ jsx(CardFooter, { children: FooterSection.content })
      ]
    }
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
  const [Platforms, SetPlatforms] = useState(
    ProvidedPlatforms || []
  );
  const [Loading, SetLoading] = useState(!ProvidedPlatforms);
  const [ErrorMessage, SetErrorMessage] = useState(null);
  useEffect(() => {
    if (ProvidedPlatforms) {
      SetPlatforms(ProvidedPlatforms);
      return;
    }
    const FetchPlatforms = async () => {
      try {
        SetLoading(true);
        SetErrorMessage(null);
        const { GetWorkersClient } = await import('./Base_IAktlLoN.mjs').then(n => n.W);
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
  const GridReference = useRef(null);
  useEffect(() => {
    const Grid = GridReference.current;
    if (!Grid || Loading) return;
    const ReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (ReducedMotion) return;
    const ApplyScatter = async () => {
      const AttentionModule = await import('./Attention_BLLMNjcF.mjs');
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
      const { GetWorkersClient } = await import('./Base_IAktlLoN.mjs').then(n => n.W);
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
    return /* @__PURE__ */ jsx(
      "section",
      {
        className: `py-20 ${ClassName || ""}`,
        "aria-label": "Downloads",
        "aria-busy": "true",
        children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "mb-16 text-center",
              role: "status",
              "aria-live": "polite",
              children: /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl", children: LoadingLabel })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3", children: [1, 2, 3].map((Index) => /* @__PURE__ */ jsx(
            DynamicCard,
            {
              Sections: {},
              ClassName: "flex animate-pulse flex-col"
            },
            Index
          )) })
        ] })
      }
    );
  }
  if (ErrorMessage) {
    return /* @__PURE__ */ jsx(
      "section",
      {
        className: `py-20 ${ClassName || ""}`,
        "aria-label": "Downloads",
        children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "mb-16 text-center", role: "alert", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl tracking-tight text-red-500 md:text-4xl lg:text-5xl", children: ErrorTitleLabel }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: ErrorMessage })
        ] }) })
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "download",
      "aria-label": "Downloads",
      className: `flex min-h-[100dvh] w-full flex-col justify-center py-20 ${ClassName || ""}`,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        (Title || Subtitle) && /* @__PURE__ */ jsxs("div", { className: "StaccatoBreath mb-16 text-center", children: [
          Title && /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl", children: Title }),
          Subtitle && /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: /* @__PURE__ */ jsx(RichText, { Text: Subtitle }) })
        ] }),
        /* @__PURE__ */ jsx(
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
                  content: /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsx(
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
                    }
                  ) })
                },
                Body: {
                  content: /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsx("span", { children: VersionLabel }),
                      /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: FormatVersion(
                        Platform.Version
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsx("span", { children: SizeLabel }),
                      /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: FormatFileSize(Platform.Size) })
                    ] }),
                    Platform.Requirements && Platform.Requirements.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-2 border-t border-border pt-2", children: [
                      /* @__PURE__ */ jsx("p", { className: "mb-1 font-medium text-foreground", children: RequirementsLabel }),
                      /* @__PURE__ */ jsx("ul", { className: "list-inside list-disc space-y-1", children: Platform.Requirements.map(
                        (Requirement, RequirementIndex) => /* @__PURE__ */ jsx(
                          "li",
                          {
                            className: "text-xs",
                            children: Requirement
                          },
                          RequirementIndex
                        )
                      ) })
                    ] })
                  ] })
                },
                ...HasVerification ? {
                  Footer: {
                    content: /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
                      Platform.Checksum && /* @__PURE__ */ jsxs("p", { children: [
                        "SHA-256:",
                        " ",
                        Platform.Checksum.substring(
                          0,
                          16
                        ),
                        "..."
                      ] }),
                      Platform.Signature && /* @__PURE__ */ jsx("p", { children: "Signature: available" })
                    ] })
                  }
                } : {}
              };
              const PlatformAccentColor = PlatformColorMap[Platform.Name] ?? "var(--PlatformDesktop)";
              return /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    borderTopColor: PlatformAccentColor,
                    borderTopWidth: "2px",
                    borderTopStyle: "solid"
                  },
                  children: /* @__PURE__ */ jsx(
                    DynamicCard,
                    {
                      Sections: PlatformCardSection,
                      ClassName: "PlatformCard flex flex-col"
                    }
                  )
                },
                Platform.Id
              );
            })
          }
        )
      ] })
    }
  );
};

const BadgeVariants = cva(
  "inline-flex items-center rounded-none border px-4 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--Ring)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[var(--Primary)] text-[var(--PrimaryForeground)] hover:opacity-80",
        secondary: "border-transparent bg-[var(--Secondary)] text-[var(--SecondaryForeground)] hover:opacity-80",
        destructive: "border-transparent bg-[var(--Destruct)] text-[var(--DestructForeground)] hover:opacity-80",
        outline: "text-[var(--Foreground)]"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Badge = React.forwardRef(
  ({ className, variant, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "span",
      {
        ref,
        className: cn(BadgeVariants({ variant }), className),
        ...props
      }
    );
  }
);
Badge.displayName = "Badge";

export { Badge as B, DynamicPlatformGrid as D };
