import { jsxs, jsx } from 'react/jsx-runtime';
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { D as DynamicButton } from './DynamicButton_3xfLCI0n.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, e as CardFooter } from './Card_BrIfdrFj.mjs';
import { cva } from 'class-variance-authority';
import { a as cn } from './Base_m0Baad5Q.mjs';

const DynamicCard = ({ sections, className, onClick }) => {
  const {
    header: HeaderSection,
    body: BodySection,
    footer: FooterSection
  } = sections;
  return /* @__PURE__ */ jsxs(
    Card,
    {
      className: `StaccatoCard StaccatoBorderShimmer ${className || ""}`,
      onClick,
      style: { cursor: onClick ? "pointer" : void 0 },
      children: [
        HeaderSection && /* @__PURE__ */ jsxs(CardHeader, { children: [
          HeaderSection.title && /* @__PURE__ */ jsx(CardTitle, { children: HeaderSection.title }),
          HeaderSection.content && /* @__PURE__ */ jsx("div", { className: "mt-2", children: HeaderSection.content }),
          HeaderSection.description && /* @__PURE__ */ jsx(CardDescription, { children: HeaderSection.description })
        ] }),
        BodySection && /* @__PURE__ */ jsxs(CardContent, { children: [
          BodySection.title && /* @__PURE__ */ jsx("h3", { className: "mb-2 font-semibold", children: BodySection.title }),
          BodySection.description && /* @__PURE__ */ jsx("p", { className: "StaccatoBreath mb-4 text-muted-foreground", children: BodySection.description }),
          BodySection.content
        ] }),
        FooterSection && /* @__PURE__ */ jsx(CardFooter, { children: FooterSection.content })
      ]
    }
  );
};

const DynamicPlatformGrid = ({ content, className }) => {
  const { t: T } = useTranslation("download");
  const {
    title,
    subtitle,
    platforms: providedPlatforms,
    showVerification = true,
    onDownload,
    apiPlatform,
    labels = {}
  } = content;
  const {
    version: VersionLabel = T("labels.version", {
      defaultValue: "Version:"
    }),
    size: SizeLabel = T("labels.size", { defaultValue: "Size:" }),
    requirements: RequirementsLabel = T("labels.requirements", {
      defaultValue: "Requirements:"
    }),
    loading: LoadingLabel = T("labels.loading", {
      defaultValue: "Loading downloads..."
    }),
    errorTitle: ErrorTitleLabel = T("labels.errorTitle", {
      defaultValue: "Unable to load downloads"
    }),
    downloadFailed: DownloadFailedLabel = T("labels.downloadFailed", {
      defaultValue: "Download failed. Please try again."
    })
  } = labels;
  const [Platforms, SetPlatforms] = useState(
    providedPlatforms || []
  );
  const [Loading, SetLoading] = useState(!providedPlatforms);
  const [ErrorMessage, SetErrorMessage] = useState(null);
  useEffect(() => {
    if (providedPlatforms) {
      SetPlatforms(providedPlatforms);
      return;
    }
    const FetchPlatforms = async () => {
      try {
        SetLoading(true);
        SetErrorMessage(null);
        const { GetWorkersClient } = await import('./Base_m0Baad5Q.mjs').then(n => n.W);
        const Workers = GetWorkersClient();
        const Response = await Workers.Download.GetLatest(apiPlatform);
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
            id: Latest.id,
            name: "Apple",
            icon: "Apple",
            description: "Universal Binary",
            version: Latest.version,
            size: Latest.fileSize ? FormatBytes(Latest.fileSize) : "45.2 MB",
            checksum: Latest.sha256,
            ...Latest.pgpSignature ? { signature: Latest.pgpSignature } : {},
            requirements: [
              "macOS 11.0 (Big Sur) or later",
              "4 GB RAM",
              "500 MB disk space"
            ]
          });
        } else if (Latest.platform === "windows") {
          CurrentPlatform.push({
            id: Latest.id,
            name: "Windows",
            icon: "Monitor",
            description: "64-bit (x64)",
            version: Latest.version,
            size: Latest.fileSize ? FormatBytes(Latest.fileSize) : "48.7 MB",
            checksum: Latest.sha256,
            ...Latest.pgpSignature ? { signature: Latest.pgpSignature } : {},
            requirements: [
              "Windows 10 or later (64-bit)",
              "4 GB RAM",
              "500 MB disk space"
            ]
          });
        } else if (Latest.platform === "linux") {
          CurrentPlatform.push({
            id: Latest.id,
            name: "Linux",
            icon: "Terminal",
            description: "DEB, RPM, AppImage",
            version: Latest.version,
            size: Latest.fileSize ? FormatBytes(Latest.fileSize) : "41.3 MB",
            checksum: Latest.sha256,
            ...Latest.pgpSignature ? { signature: Latest.pgpSignature } : {},
            requirements: [
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
  }, [providedPlatforms, apiPlatform]);
  const GridReference = useRef(null);
  useEffect(() => {
    const Grid = GridReference.current;
    if (!Grid || Loading) return;
    const ReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (ReducedMotion) return;
    const ApplyScatter = async () => {
      const AttentionModule = await import('./Attention_DKdtZrik.mjs');
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
      const { GetWorkersClient } = await import('./Base_m0Baad5Q.mjs').then(n => n.W);
      const Workers = GetWorkersClient();
      const InfoResponse = await Workers.Download.GetInfo(Platform.id);
      if (!InfoResponse.success || !InfoResponse.data) {
        throw new Error(
          InfoResponse.error || "Failed to get download info"
        );
      }
      window.open(InfoResponse.data.downloadUrl, "_blank");
      await Workers.Download.TrackDownload(Platform.id);
      onDownload?.(Platform);
    } catch (DownloadError) {
      console.error("Download failed:", DownloadError);
      console.warn(DownloadFailedLabel);
    }
  };
  if (Loading) {
    return /* @__PURE__ */ jsx(
      "section",
      {
        className: `py-20 ${className || ""}`,
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
              sections: {},
              className: "flex animate-pulse flex-col"
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
        className: `py-20 ${className || ""}`,
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
      className: `flex min-h-[50dvh] w-full flex-col justify-center py-16 ${className || ""}`,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        (title || subtitle) && /* @__PURE__ */ jsxs("div", { className: "StaccatoBreath mb-16 text-center", children: [
          title && /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl", children: title }),
          subtitle && /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: subtitle })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: GridReference,
            className: "mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3",
            children: Platforms.map((Platform) => {
              const HasVerification = showVerification && (Platform.checksum || Platform.signature);
              const PlatformCardSection = {
                header: {
                  title: Platform.name,
                  description: Platform.description,
                  content: /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsx(
                    DynamicButton,
                    {
                      content: {
                        text: T("labels.downloadFor", {
                          defaultValue: "Download for {{platform}}",
                          platform: Platform.name || "this platform"
                        }),
                        variant: "default",
                        size: "lg",
                        fullWidth: true,
                        icon: "Download"
                      },
                      onAction: () => HandleDownload(Platform)
                    }
                  ) })
                },
                body: {
                  content: /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsx("span", { children: VersionLabel }),
                      /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: FormatVersion(
                        Platform.version
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsx("span", { children: SizeLabel }),
                      /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: FormatFileSize(Platform.size) })
                    ] }),
                    Platform.requirements && Platform.requirements.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-2 border-t border-border pt-2", children: [
                      /* @__PURE__ */ jsx("p", { className: "mb-1 font-medium text-foreground", children: RequirementsLabel }),
                      /* @__PURE__ */ jsx("ul", { className: "list-inside list-disc space-y-1", children: Platform.requirements.map(
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
                  footer: {
                    content: /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
                      Platform.checksum && /* @__PURE__ */ jsxs("p", { children: [
                        "SHA-256:",
                        " ",
                        Platform.checksum.substring(
                          0,
                          16
                        ),
                        "..."
                      ] }),
                      Platform.signature && /* @__PURE__ */ jsx("p", { children: "PGP Signed: ✓" })
                    ] })
                  }
                } : {}
              };
              return /* @__PURE__ */ jsx(
                DynamicCard,
                {
                  sections: PlatformCardSection,
                  className: "PlatformCard flex flex-col"
                },
                Platform.id
              );
            })
          }
        )
      ] })
    }
  );
};

const badgeVariants = cva(
  "inline-flex items-center rounded-none border px-[var(--Spacing2Point5)] py-[var(--Spacing0Point5)] text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
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
        className: cn(badgeVariants({ variant }), className),
        ...props
      }
    );
  }
);
Badge.displayName = "Badge";

export { Badge as B, DynamicPlatformGrid as D };
