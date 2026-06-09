import { b1 as jsxDevRuntimeExports, b4 as useTranslation, b2 as reactExports } from './Vendor/React.D_hnTAe2.js';

const SCAN_TIMEOUT = 3e3;
const DAEMON_ENDPOINT = [
  { Port: 7979, URL: "ws://localhost:7979" },
  { Port: 7878, URL: "ws://localhost:7878" }
];
const ProbeDaemon = (URL, Port, TimeoutMillisecond) => new Promise((Resolve) => {
  try {
    const Socket = new WebSocket(URL);
    const Timer = setTimeout(() => {
      Socket.close();
      Resolve(null);
    }, TimeoutMillisecond);
    Socket.onopen = () => {
      clearTimeout(Timer);
      Socket.send(JSON.stringify({ Type: "Version" }));
      const VersionTimer = setTimeout(() => {
        Socket.close();
        Resolve({ Port, Version: "unknown" });
      }, 500);
      Socket.onmessage = (Event) => {
        clearTimeout(VersionTimer);
        try {
          const Data = JSON.parse(Event.data);
          Socket.close();
          Resolve({
            Port,
            Version: Data.Version || "unknown"
          });
        } catch {
          Socket.close();
          Resolve({ Port, Version: "unknown" });
        }
      };
    };
    Socket.onerror = () => {
      clearTimeout(Timer);
      Socket.close();
      Resolve(null);
    };
  } catch {
    Resolve(null);
  }
});
const ScanAnimation = () => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3", children: [
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-1", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "span",
      {
        className: "inline-block h-2 w-2 animate-pulse rounded-none bg-orange-400",
        style: { animationDelay: "0ms" }
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
        lineNumber: 90,
        columnNumber: 4
      },
      undefined
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "span",
      {
        className: "inline-block h-2 w-2 animate-pulse rounded-none bg-orange-400",
        style: { animationDelay: "150ms" }
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
        lineNumber: 94,
        columnNumber: 4
      },
      undefined
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "span",
      {
        className: "inline-block h-2 w-2 animate-pulse rounded-none bg-orange-400",
        style: { animationDelay: "300ms" }
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
        lineNumber: 98,
        columnNumber: 4
      },
      undefined
    )
  ] }, void 0, true, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
    lineNumber: 89,
    columnNumber: 3
  }, undefined),
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-muted-foreground", children: "Scanning for Air Daemon..." }, void 0, false, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
    lineNumber: 103,
    columnNumber: 3
  }, undefined)
] }, void 0, true, {
  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
  lineNumber: 88,
  columnNumber: 2
}, undefined);
const DynamicLocalFirstScan = ({
  Domain,
  ClientIdentifier
}) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LocalFirstScanInner, {}, void 0, false, {
  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
  lineNumber: 115,
  columnNumber: 7
}, undefined);
const LocalFirstScanInner = () => {
  const { t: T } = useTranslation("common");
  const [Status, SetStatus] = reactExports.useState("Scanning");
  const [DaemonDetail, SetDaemonDetail] = reactExports.useState(null);
  const [ScanProgress, SetScanProgress] = reactExports.useState(0);
  reactExports.useEffect(() => {
    let Cancelled = false;
    const RunScan = async () => {
      SetStatus("Scanning");
      SetScanProgress(0);
      for (let Index = 0; Index < DAEMON_ENDPOINT.length; Index++) {
        if (Cancelled) return;
        const Endpoint = DAEMON_ENDPOINT[Index];
        if (!Endpoint) continue;
        SetScanProgress(
          Math.round((Index + 1) / DAEMON_ENDPOINT.length * 100)
        );
        const Result = await ProbeDaemon(
          Endpoint.URL,
          Endpoint.Port,
          SCAN_TIMEOUT
        );
        if (Result && !Cancelled) {
          SetDaemonDetail(Result);
          SetStatus("Connected");
          return;
        }
      }
      if (!Cancelled) {
        SetScanProgress(100);
        SetStatus("NotFound");
      }
    };
    RunScan();
    return () => {
      Cancelled = true;
    };
  }, []);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "StaccatoCard StaccatoBorderShimmer bg-card p-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("picture", { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "img",
        {
          alt: "Land",
          src: "/Asset/Logo/Glyph/Land.svg",
          width: "48",
          height: "48",
          className: "dark:hidden"
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
          lineNumber: 171,
          columnNumber: 6
        },
        undefined
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "img",
        {
          alt: "Land",
          src: "/Asset/Dark/Logo/Glyph/Land.svg",
          width: "48",
          height: "48",
          className: "hidden dark:block"
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
          lineNumber: 177,
          columnNumber: 8
        },
        undefined
      )
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
      lineNumber: 170,
      columnNumber: 5
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-medium", children: T("dashboard.localFirst.title", {
          defaultValue: "Air Daemon"
        }) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
          lineNumber: 187,
          columnNumber: 7
        }, undefined),
        Status === "Scanning" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center border border-orange-200 bg-orange-50 px-2.5 py-0.5 font-medium text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300", children: [
          T("dashboard.localFirst.scanning", {
            defaultValue: "Scanning"
          }),
          " ",
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "span",
            {
              className: "h-1.5 w-1.5 animate-pulse rounded-none bg-orange-500",
              "aria-hidden": "true"
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
              lineNumber: 198,
              columnNumber: 9
            },
            undefined
          )
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
          lineNumber: 193,
          columnNumber: 8
        }, undefined),
        Status === "Connected" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center border border-green-200 bg-green-50 px-2.5 py-0.5 font-medium text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300", children: [
          T("dashboard.localFirst.connected", {
            defaultValue: "Connected"
          }),
          " ",
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "span",
            {
              className: "h-1.5 w-1.5 rounded-none bg-green-500",
              "aria-hidden": "true"
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
              lineNumber: 210,
              columnNumber: 9
            },
            undefined
          )
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
          lineNumber: 205,
          columnNumber: 8
        }, undefined),
        Status === "NotFound" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center bg-[var(--Mute)] px-2.5 py-0.5 font-medium text-muted-foreground", children: [
          T("dashboard.localFirst.notFound", {
            defaultValue: "Not Detected"
          }),
          " ",
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "span",
            {
              className: "h-1.5 w-1.5 rounded-none bg-gray-400",
              "aria-hidden": "true"
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
              lineNumber: 222,
              columnNumber: 9
            },
            undefined
          )
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
          lineNumber: 217,
          columnNumber: 8
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
        lineNumber: 186,
        columnNumber: 6
      }, undefined),
      Status === "Scanning" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ScanAnimation, {}, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
          lineNumber: 233,
          columnNumber: 8
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-2 h-1 w-full overflow-hidden bg-gray-100 dark:bg-gray-800", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            className: "h-full bg-orange-400 transition-all duration-500",
            style: { width: `${ScanProgress}%` }
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
            lineNumber: 235,
            columnNumber: 9
          },
          undefined
        ) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
          lineNumber: 234,
          columnNumber: 8
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1 text-muted-foreground", children: T("dashboard.localFirst.scanDescription", {
          defaultValue: "Checking ws://localhost:7979 and ws://localhost:7878"
        }) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
          lineNumber: 240,
          columnNumber: 8
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
        lineNumber: 232,
        columnNumber: 7
      }, undefined),
      Status === "Connected" && DaemonDetail && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-3 space-y-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-green-700 dark:text-green-400", children: T("dashboard.localFirst.connectedMessage", {
          defaultValue: "Connected to Air Daemon"
        }) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
          lineNumber: 252,
          columnNumber: 8
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-3 text-muted-foreground", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium", children: T("dashboard.localFirst.portLabel", {
              defaultValue: "Port"
            }) }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
              lineNumber: 259,
              columnNumber: 10
            }, undefined),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("code", { children: DaemonDetail.Port }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
              lineNumber: 264,
              columnNumber: 10
            }, undefined)
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
            lineNumber: 258,
            columnNumber: 9
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium", children: T(
              "dashboard.localFirst.versionLabel",
              {
                defaultValue: "Version"
              }
            ) }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
              lineNumber: 267,
              columnNumber: 10
            }, undefined),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("code", { children: DaemonDetail.Version }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
              lineNumber: 275,
              columnNumber: 10
            }, undefined)
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
            lineNumber: 266,
            columnNumber: 9
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium", children: T(
              "dashboard.localFirst.protocolLabel",
              {
                defaultValue: "Protocol"
              }
            ) }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
              lineNumber: 278,
              columnNumber: 10
            }, undefined),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("code", { children: "WebSocket" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
              lineNumber: 286,
              columnNumber: 10
            }, undefined)
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
            lineNumber: 277,
            columnNumber: 9
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
          lineNumber: 257,
          columnNumber: 8
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-2 pt-1", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center border border-blue-200 bg-blue-50 px-2 py-0.5 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300", children: [
            "Peer-to-peer design",
            " ",
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "span",
              {
                className: "h-1 w-1 rounded-none bg-blue-500",
                "aria-hidden": "true"
              },
              void 0,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
                lineNumber: 292,
                columnNumber: 10
              },
              undefined
            )
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
            lineNumber: 290,
            columnNumber: 9
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center border border-blue-200 bg-blue-50 px-2 py-0.5 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300", children: [
            "Local-first",
            " ",
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "span",
              {
                className: "h-1 w-1 rounded-none bg-blue-500",
                "aria-hidden": "true"
              },
              void 0,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
                lineNumber: 299,
                columnNumber: 10
              },
              undefined
            )
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
            lineNumber: 297,
            columnNumber: 9
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center border border-blue-200 bg-blue-50 px-2 py-0.5 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300", children: [
            "No cloud required",
            " ",
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "span",
              {
                className: "h-1 w-1 rounded-none bg-blue-500",
                "aria-hidden": "true"
              },
              void 0,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
                lineNumber: 306,
                columnNumber: 10
              },
              undefined
            )
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
            lineNumber: 304,
            columnNumber: 9
          }, undefined)
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
          lineNumber: 289,
          columnNumber: 8
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
        lineNumber: 251,
        columnNumber: 7
      }, undefined),
      Status === "NotFound" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-3 space-y-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-muted-foreground", children: T("dashboard.localFirst.notFoundMessage", {
          defaultValue: "Air Daemon not detected. Launch Code Editor Land to enable local-first features."
        }) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
          lineNumber: 318,
          columnNumber: 8
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "a",
            {
              href: "/Download",
              className: "StaccatoButton inline-flex items-center justify-center border border-orange-300 bg-orange-50 px-4 py-2 font-medium text-orange-700 transition-all hover:bg-orange-100 dark:border-orange-700 dark:bg-orange-950 dark:text-orange-300 dark:hover:bg-orange-900",
              children: [
                T("dashboard.localFirst.downloadButton", {
                  defaultValue: "Download Land"
                }),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "InlineSeparator", children: "↓" }, void 0, false, {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
                  lineNumber: 331,
                  columnNumber: 10
                }, undefined)
              ]
            },
            void 0,
            true,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
              lineNumber: 325,
              columnNumber: 9
            },
            undefined
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => window.location.reload(),
              className: "StaccatoButton inline-flex items-center justify-center bg-card px-4 py-2 font-medium transition-all hover:bg-[var(--Secondary)]",
              children: T("dashboard.localFirst.retryButton", {
                defaultValue: "Retry Scan"
              })
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
              lineNumber: 335,
              columnNumber: 9
            },
            undefined
          )
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
          lineNumber: 324,
          columnNumber: 8
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
        lineNumber: 317,
        columnNumber: 7
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
      lineNumber: 185,
      columnNumber: 5
    }, undefined)
  ] }, void 0, true, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
    lineNumber: 169,
    columnNumber: 4
  }, undefined) }, void 0, false, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
    lineNumber: 168,
    columnNumber: 3
  }, undefined);
};

export { DynamicLocalFirstScan as default };
//# sourceMappingURL=DynamicLocalFirstScan.DnYjQdzj.js.map
