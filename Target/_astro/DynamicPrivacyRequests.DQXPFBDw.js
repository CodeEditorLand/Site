import { b1 as jsxDevRuntimeExports } from './Vendor/React.D_hnTAe2.js';
import { R as Requests } from './Request.Dux_TM63.js';

const DynamicPrivacyRequests = () => {
  const GdprRights = [
    Requests.REACH,
    Requests.AMEND,
    Requests.PAUSE,
    Requests.QUERY,
    Requests.LEAVE,
    Requests.LODGE
  ];
  const SupportChannels = [
    Requests.SCOUT,
    Requests.GUARD,
    Requests.CLAIM,
    Requests.LEGAL
  ];
  const BadgeColor = (Article) => Article ? "border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300" : "bg-[var(--Mute)] text-muted-foreground";
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-12", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "mb-2 font-mono text-sm font-semibold", children: "Your Rights Under GDPR" }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
        lineNumber: 42,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-6 text-muted-foreground", children: "As a resident of the EU/EEA or a user of our service, you hold the following rights. Each link opens a dedicated form page that pre-fills your account details and generates a properly formatted, income-coded request." }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
        lineNumber: 45,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3", children: GdprRights.map((Right) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "a",
        {
          href: `/Contact/${Right.Slug.charAt(0).toUpperCase()}${Right.Slug.slice(1)}`,
          className: "StaccatoCard StaccatoBorderShimmer flex flex-col bg-card p-5 transition-all hover:bg-[var(--Secondary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3 flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-medium leading-snug", children: Right.Title }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
                lineNumber: 58,
                columnNumber: 9
              }, undefined),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex shrink-0 flex-col items-end gap-1", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "span",
                  {
                    className: `px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest ${BadgeColor(Right.Article)}`,
                    children: Right.Code
                  },
                  void 0,
                  false,
                  {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
                    lineNumber: 62,
                    columnNumber: 10
                  },
                  undefined
                ),
                Right.Article && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-mono text-[9px] text-muted-foreground", children: Right.Article }, void 0, false, {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
                  lineNumber: 67,
                  columnNumber: 11
                }, undefined)
              ] }, void 0, true, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
                lineNumber: 61,
                columnNumber: 9
              }, undefined)
            ] }, void 0, true, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
              lineNumber: 57,
              columnNumber: 8
            }, undefined),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-4 flex-1 text-sm leading-relaxed text-muted-foreground", children: Right.Subtitle }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
              lineNumber: 73,
              columnNumber: 8
            }, undefined),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mt-auto inline-flex items-center text-sm font-medium text-[var(--Primary)]", children: [
              "Open form",
              " ",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { "aria-hidden": "true", className: "ml-1", children: "→" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
                lineNumber: 78,
                columnNumber: 9
              }, undefined)
            ] }, void 0, true, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
              lineNumber: 76,
              columnNumber: 8
            }, undefined)
          ]
        },
        Right.Code,
        true,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
          lineNumber: 53,
          columnNumber: 7
        },
        undefined
      )) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
        lineNumber: 51,
        columnNumber: 5
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
      lineNumber: 41,
      columnNumber: 4
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "mb-2 font-mono text-sm font-semibold", children: "Support & Assistance" }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
        lineNumber: 89,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-6 text-muted-foreground", children: "Direct channels for technical issues, security reports, copyright claims, and legal enquiries. Each form pre-fills your details and generates a plain-text, income-coded email." }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
        lineNumber: 92,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4", children: SupportChannels.map((Channel) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "a",
        {
          href: `/Contact/${Channel.Slug.charAt(0).toUpperCase()}${Channel.Slug.slice(1)}`,
          className: "StaccatoCard StaccatoBorderShimmer flex flex-col bg-card p-5 transition-all hover:bg-[var(--Secondary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-2 flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-medium", children: Channel.Title }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
                lineNumber: 104,
                columnNumber: 9
              }, undefined),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "shrink-0 font-mono text-[10px] font-bold tracking-widest text-muted-foreground", children: Channel.Code }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
                lineNumber: 105,
                columnNumber: 9
              }, undefined)
            ] }, void 0, true, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
              lineNumber: 103,
              columnNumber: 8
            }, undefined),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-4 flex-1 text-sm leading-relaxed text-muted-foreground", children: Channel.Subtitle }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
              lineNumber: 109,
              columnNumber: 8
            }, undefined),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mt-auto font-mono text-sm text-muted-foreground", children: Channel.To }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
              lineNumber: 112,
              columnNumber: 8
            }, undefined)
          ]
        },
        Channel.Code,
        true,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
          lineNumber: 99,
          columnNumber: 7
        },
        undefined
      )) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
        lineNumber: 97,
        columnNumber: 5
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
      lineNumber: 88,
      columnNumber: 4
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "mb-2 font-mono text-sm font-semibold", children: "Delete Account" }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
        lineNumber: 122,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-6 text-muted-foreground", children: "Permanently delete your account and all associated personal data under GDPR Article 17. This action is irreversible." }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
        lineNumber: 125,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "a",
        {
          href: "/Contact/Erase",
          className: "StaccatoCard block border border-red-200 bg-card p-6 transition-all hover:bg-red-50 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 dark:border-red-800 dark:hover:bg-red-950",
          children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4 flex items-start gap-4", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center border border-red-200 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { d: "M3 6h18" }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                  }, undefined),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
                    lineNumber: 146,
                    columnNumber: 9
                  }, undefined),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                  }, undefined),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("line", { x1: "10", y1: "11", x2: "10", y2: "17" }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
                    lineNumber: 148,
                    columnNumber: 9
                  }, undefined),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("line", { x1: "14", y1: "11", x2: "14", y2: "17" }, void 0, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
                    lineNumber: 149,
                    columnNumber: 9
                  }, undefined)
                ]
              },
              void 0,
              true,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
                lineNumber: 134,
                columnNumber: 8
              },
              undefined
            ) }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
              lineNumber: 133,
              columnNumber: 7
            }, undefined),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-1 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-semibold text-red-700 dark:text-red-400", children: "Permanent Account Deletion" }, void 0, false, {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
                  lineNumber: 154,
                  columnNumber: 9
                }, undefined),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-mono text-[10px] font-bold tracking-widest text-red-400 dark:text-red-500", children: "ERASE" }, void 0, false, {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
                  lineNumber: 157,
                  columnNumber: 9
                }, undefined)
              ] }, void 0, true, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
                lineNumber: 153,
                columnNumber: 8
              }, undefined),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-muted-foreground", children: "Opens a structured erasure request form. The generated email includes income code [ERASE] and covers Auth0, PostHog, Cloudflare, and all backup copies - citing GDPR Art. 17 with a 30-day response requirement." }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
                lineNumber: 161,
                columnNumber: 8
              }, undefined)
            ] }, void 0, true, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
              lineNumber: 152,
              columnNumber: 7
            }, undefined),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "shrink-0 font-medium text-red-600 dark:text-red-400", children: "→" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
              lineNumber: 169,
              columnNumber: 7
            }, undefined)
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
            lineNumber: 132,
            columnNumber: 6
          }, undefined)
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
          lineNumber: 129,
          columnNumber: 5
        },
        undefined
      )
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
      lineNumber: 121,
      columnNumber: 4
    }, undefined)
  ] }, void 0, true, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
    lineNumber: 39,
    columnNumber: 3
  }, undefined);
};

export { DynamicPrivacyRequests as default };
//# sourceMappingURL=DynamicPrivacyRequests.DQXPFBDw.js.map
