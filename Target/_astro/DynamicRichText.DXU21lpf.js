import { b2 as reactExports, b1 as jsxDevRuntimeExports, C as Check, w as Copy } from './Vendor/React.D_hnTAe2.js';
import { T as ThemeIcon } from './Blog.C5m3bFxQ.js';

const TermDictionary = /* @__PURE__ */ new Map([
  // Architecture elements
  ["Mountain", "Architecture"],
  ["Cocoon", "Architecture"],
  ["Wind", "Architecture"],
  ["Sky", "Architecture"],
  ["Air", "Architecture"],
  ["Echo", "Architecture"],
  ["Vine", "Architecture"],
  ["Common", "Architecture"],
  ["Rest", "Architecture"],
  ["Mist", "Architecture"],
  ["Grove", "Architecture"],
  ["Worker", "Architecture"],
  ["Sidecar", "Architecture"],
  // Feature flags / compile features
  ["ExtensionHostCocoon", "Feature"],
  ["MistNative", "Feature"],
  ["AirIntegration", "Feature"],
  // Telemetry
  ["Telemetry", "Telemetry"],
  ["MetricsCollection", "Telemetry"],
  ["DistributedTracing", "Telemetry"],
  ["CrashReport", "Telemetry"],
  ["TelemetryService", "Telemetry"],
  ["TelemetryMock", "Telemetry"],
  // Protocols
  ["gRPC", "Protocol"],
  ["OTEL", "Protocol"],
  ["OpenTelemetry", "Protocol"],
  ["WebSocket", "Protocol"],
  ["WASM", "Protocol"],
  ["Rhai", "Protocol"],
  // Tools / Frameworks
  ["Rust", "Tool"],
  ["Tauri", "Tool"],
  ["Effect-TS", "Tool"],
  ["Cargo", "Tool"],
  ["OXC", "Tool"],
  ["SWC", "Tool"],
  ["Electron", "Tool"],
  ["TypeScript", "Tool"],
  ["Astro", "Tool"],
  ["Vite", "Tool"],
  ["React", "Tool"],
  ["Tailwind", "Tool"],
  ["Node.js", "Tool"],
  ["Biome", "Tool"],
  ["Cloudflare", "Tool"],
  ["Auth0", "Tool"],
  ["pnpm", "Tool"],
  ["esbuild", "Tool"],
  // License / Funding
  ["CC0", "License"],
  ["PGP", "License"],
  ["NLnet", "License"],
  ["NGI0", "License"]
]);
const CategoryStyle = {
  Architecture: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
  Telemetry: "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
  Protocol: "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300",
  Feature: "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300",
  License: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
  Tool: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-300"
};
const CategoryLabel = {
  Architecture: "Architecture element",
  Telemetry: "Telemetry feature",
  Protocol: "Protocol",
  Feature: "Compile feature flag",
  License: "License / Security",
  Tool: "Build tool / Framework"
};
const TermLogo = {
  Rust: "/Image/Rust.svg",
  Tauri: "/Image/Tauri.svg",
  "Effect-TS": "/Image/EffectTS.svg",
  Cargo: "/Image/Cargo.svg",
  TypeScript: "/Image/TypeScript.svg",
  Astro: "/Image/Astro.svg",
  Vite: "/Image/Vite.svg",
  React: "/Image/React.svg",
  Tailwind: "/Image/Tailwind.svg",
  "Node.js": "/Image/NodeJS.svg",
  WASM: "/Image/WASM.svg",
  gRPC: "/Image/gRPC.svg",
  Biome: "/Image/Biome.svg",
  CC0: "/Image/CC0.svg",
  NLnet: "/Image/NLnet.svg",
  Cloudflare: "/Image/Cloudflare.svg",
  Auth0: "/Image/Auth0.svg",
  OXC: "/Image/OXC.svg",
  SWC: "/Image/SWC.svg",
  Electron: "/Image/Electron.svg",
  Rhai: "/Image/Rhai.svg",
  OpenTelemetry: "/Image/OpenTelemetry.svg",
  OTEL: "/Image/OpenTelemetry.svg",
  pnpm: "/Image/pnpm.svg",
  esbuild: "/Image/esbuild.svg"
};
const BuildTermPattern = () => new RegExp(`\\b(${[...TermDictionary.keys()].join("|")})\\b`, "g");
const ParseInline = (Text, ShowTerms) => {
  const Segments = [];
  const Parts = Text.split(/(`[^`]+`|\*[^*]+\*)/g);
  for (const Part of Parts) {
    if (Part.startsWith("`") && Part.endsWith("`") && Part.length > 2) {
      Segments.push({ Kind: "Code", Value: Part.slice(1, -1) });
      continue;
    }
    if (Part.startsWith("*") && Part.endsWith("*") && Part.length > 2) {
      Segments.push({ Kind: "Em", Value: Part.slice(1, -1) });
      continue;
    }
    if (ShowTerms) {
      const Pattern = BuildTermPattern();
      let LastIndex = 0;
      let Match;
      while ((Match = Pattern.exec(Part)) !== null) {
        const TermName = Match[1];
        if (!TermName) continue;
        if (Match.index > LastIndex) {
          Segments.push({
            Kind: "Text",
            Value: Part.slice(LastIndex, Match.index)
          });
        }
        const Category = TermDictionary.get(TermName);
        Segments.push({ Kind: "Term", Value: TermName, Category });
        LastIndex = Match.index + TermName.length;
      }
      if (LastIndex < Part.length) {
        Segments.push({ Kind: "Text", Value: Part.slice(LastIndex) });
      }
    } else {
      if (Part.length > 0) Segments.push({ Kind: "Text", Value: Part });
    }
  }
  return Segments;
};
const CopyInlineButton = ({ Code }) => {
  const [Copied, SetCopied] = reactExports.useState(false);
  const HandleCopy = async () => {
    try {
      await navigator.clipboard.writeText(Code);
      SetCopied(true);
      setTimeout(() => SetCopied(false), 1800);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "button",
    {
      type: "button",
      onClick: HandleCopy,
      "aria-label": Copied ? "Copied" : "Copy to clipboard",
      title: Copied ? "Copied" : "Copy to clipboard",
      className: "ml-1 inline-flex h-[1.1em] w-[1.1em] shrink-0 items-center justify-center rounded-none bg-[var(--Mute)] opacity-50 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--Ring)]",
      children: Copied ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Check,
        {
          className: "h-[0.65em] w-[0.65em] text-green-600",
          "aria-hidden": "true"
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
          lineNumber: 205,
          columnNumber: 5
        },
        undefined
      ) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Copy,
        {
          className: "h-[0.65em] w-[0.65em]",
          "aria-hidden": "true"
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
          lineNumber: 210,
          columnNumber: 5
        },
        undefined
      )
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
      lineNumber: 198,
      columnNumber: 3
    },
    undefined
  );
};
const SegmentNode = ({ Segment }) => {
  switch (Segment.Kind) {
    case "Code":
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-baseline", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("code", { className: "rounded-none bg-[var(--Mute)] px-1.5 py-0.5 font-mono text-[0.82em]", children: Segment.Value }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
          lineNumber: 226,
          columnNumber: 6
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CopyInlineButton, { Code: Segment.Value }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
          lineNumber: 229,
          columnNumber: 6
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
        lineNumber: 225,
        columnNumber: 5
      }, undefined);
    case "Em":
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("em", { className: "font-medium not-italic text-foreground", children: Segment.Value }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
        lineNumber: 234,
        columnNumber: 5
      }, undefined);
    case "Term": {
      const Logo = TermLogo[Segment.Value];
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "span",
        {
          className: `inline-flex items-center rounded-none border px-1.5 py-0.5 align-middle font-mono text-[0.78em] font-medium leading-normal ${CategoryStyle[Segment.Category]}`,
          title: `${CategoryLabel[Segment.Category]}: ${Segment.Value}`,
          "aria-label": `${CategoryLabel[Segment.Category]} ${Segment.Value}`,
          children: [
            Segment.Value,
            Logo && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
              " ",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                ThemeIcon,
                {
                  src: Logo,
                  alt: "",
                  width: 12,
                  height: 12,
                  className: "inline-block align-middle opacity-60",
                  "aria-hidden": "true"
                },
                void 0,
                false,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
                  lineNumber: 249,
                  columnNumber: 8
                },
                undefined
              )
            ] }, void 0, true, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
              lineNumber: 247,
              columnNumber: 7
            }, undefined)
          ]
        },
        void 0,
        true,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
          lineNumber: 241,
          columnNumber: 5
        },
        undefined
      );
    }
    default:
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: Segment.Value }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
        lineNumber: 263,
        columnNumber: 11
      }, undefined);
  }
};
const CommandPrefixes = [
  "cargo ",
  "bash ",
  "./",
  "sh ",
  "pnpm ",
  "npm run ",
  "npm ",
  "git "
];
const IsCommandString = (Text) => CommandPrefixes.some((Prefix) => Text.trimStart().startsWith(Prefix));
const InlineSegments = ({
  Text,
  ShowTerms
}) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: ParseInline(Text, ShowTerms).map((Segment, Index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SegmentNode, { Segment }, Index, false, {
  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
  lineNumber: 292,
  columnNumber: 4
}, undefined)) }, void 0, false, {
  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
  lineNumber: 290,
  columnNumber: 2
}, undefined);
const LineNode = ({
  Line,
  ShowTerms
}) => {
  const Trimmed = Line.trimStart();
  const EnableMatch = Trimmed.match(
    /^(enable with:\s*)(cargo\s+[^.]+?)(\.\s*(.+))?$/i
  );
  if (EnableMatch) {
    const Command = (EnableMatch[2] ?? "").trim();
    const Remainder = EnableMatch[4]?.trim();
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-muted-foreground/80", children: EnableMatch[1] }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
        lineNumber: 315,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-baseline", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("code", { className: "rounded-none bg-[var(--Mute)] px-1.5 py-0.5 font-mono text-[0.82em]", children: Command }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
          lineNumber: 319,
          columnNumber: 6
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CopyInlineButton, { Code: Command }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
          lineNumber: 322,
          columnNumber: 6
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
        lineNumber: 318,
        columnNumber: 5
      }, undefined),
      Remainder && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
        ".",
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "ml-1", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          InlineSegments,
          {
            Text: Remainder,
            ShowTerms
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
            lineNumber: 328,
            columnNumber: 8
          },
          undefined
        ) }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
          lineNumber: 327,
          columnNumber: 7
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
        lineNumber: 325,
        columnNumber: 6
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
      lineNumber: 314,
      columnNumber: 4
    }, undefined);
  }
  const SubFeaturesMatch = Trimmed.match(/^(sub-features?:\s*)(.+)$/i);
  if (SubFeaturesMatch) {
    const Items = (SubFeaturesMatch[2] ?? "").split(/,\s*/).map((Item) => Item.trim().replace(/\.$/, "")).filter(Boolean);
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-muted-foreground/80", children: SubFeaturesMatch[1] }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
        lineNumber: 348,
        columnNumber: 5
      }, undefined),
      Items.map((Item, Index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center", children: [
        Index > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mx-1 text-muted-foreground", children: "," }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
          lineNumber: 354,
          columnNumber: 8
        }, undefined),
        ShowTerms && TermDictionary.has(Item) ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "span",
          {
            className: `inline-flex items-center rounded-none border px-1.5 py-0.5 align-middle font-mono text-[0.78em] font-medium leading-normal ${CategoryStyle[TermDictionary.get(Item)]}`,
            title: `${CategoryLabel[TermDictionary.get(Item)]}: ${Item}`,
            children: Item
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
            lineNumber: 359,
            columnNumber: 8
          },
          undefined
        ) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("em", { className: "font-medium not-italic text-foreground", children: Item }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
          lineNumber: 365,
          columnNumber: 8
        }, undefined)
      ] }, Item, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
        lineNumber: 352,
        columnNumber: 6
      }, undefined))
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
      lineNumber: 347,
      columnNumber: 4
    }, undefined);
  }
  const DefaultFeaturesMatch = Trimmed.match(
    /^(default features?:\s*)(.+?)(\.\s*(.+))?$/i
  );
  if (DefaultFeaturesMatch) {
    const Items = (DefaultFeaturesMatch[2] ?? "").split(/,\s*/).map((Item) => Item.trim()).filter(Boolean);
    const Remainder = DefaultFeaturesMatch[4]?.trim();
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-muted-foreground/80", children: DefaultFeaturesMatch[1] }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
        lineNumber: 387,
        columnNumber: 5
      }, undefined),
      Items.map((Item, Index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center", children: [
        Index > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mx-1 text-muted-foreground", children: "," }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
          lineNumber: 393,
          columnNumber: 8
        }, undefined),
        ShowTerms && TermDictionary.has(Item) ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "span",
          {
            className: `inline-flex items-center rounded-none border px-1.5 py-0.5 align-middle font-mono text-[0.78em] font-medium leading-normal ${CategoryStyle[TermDictionary.get(Item)]}`,
            title: `${CategoryLabel[TermDictionary.get(Item)]}: ${Item}`,
            children: Item
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
            lineNumber: 398,
            columnNumber: 8
          },
          undefined
        ) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("code", { className: "rounded-none bg-[var(--Mute)] px-1.5 py-0.5 font-mono text-[0.82em]", children: Item }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
          lineNumber: 404,
          columnNumber: 8
        }, undefined)
      ] }, Item, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
        lineNumber: 391,
        columnNumber: 6
      }, undefined)),
      Remainder && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "ml-1", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        InlineSegments,
        {
          Text: Remainder,
          ShowTerms
        },
        void 0,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
          lineNumber: 412,
          columnNumber: 7
        },
        undefined
      ) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
        lineNumber: 411,
        columnNumber: 6
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
      lineNumber: 386,
      columnNumber: 4
    }, undefined);
  }
  if (IsCommandString(Trimmed)) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-baseline", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("code", { className: "rounded-none bg-[var(--Mute)] px-1.5 py-0.5 font-mono text-[0.82em]", children: Trimmed }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
        lineNumber: 426,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CopyInlineButton, { Code: Trimmed }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
        lineNumber: 429,
        columnNumber: 5
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
      lineNumber: 425,
      columnNumber: 4
    }, undefined);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InlineSegments, { Text: Line, ShowTerms }, void 0, false, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
    lineNumber: 435,
    columnNumber: 9
  }, undefined);
};
const ReadStaccatoRaw = () => {
  if (typeof document === "undefined") return 0;
  const Value = getComputedStyle(document.documentElement).getPropertyValue(
    "--StaccatoRaw"
  );
  return parseFloat(Value) || 0;
};
const Lerp = (Current, Target, Alpha) => Current + (Target - Current) * Alpha;
const RichText = ({ Text, Terms = false, ClassName }) => {
  const [Revealed, SetRevealed] = reactExports.useState(Text.length);
  const [IsAnimating, SetIsAnimating] = reactExports.useState(false);
  const PreviousText = reactExports.useRef(Text);
  const ContainerRef = reactExports.useRef(null);
  const AnimRef = reactExports.useRef(0);
  const LerpedDelay = reactExports.useRef(20);
  const LastTime = reactExports.useRef(performance.now());
  reactExports.useEffect(() => {
    if (Text === PreviousText.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      PreviousText.current = Text;
      SetRevealed(Text.length);
      return;
    }
    if (ContainerRef.current) {
      const Rect = ContainerRef.current.getBoundingClientRect();
      if (Rect.width > 0) {
        ContainerRef.current.style.minWidth = `${Rect.width}px`;
        ContainerRef.current.style.minHeight = `${Rect.height}px`;
        ContainerRef.current.style.display = "inline-block";
      }
    }
    PreviousText.current = Text;
    LerpedDelay.current = 20;
    LastTime.current = performance.now();
    cancelAnimationFrame(AnimRef.current);
    SetIsAnimating(true);
    SetRevealed(0);
    let CharCount = 0;
    const Step = (Now) => {
      const NoiseRaw = ReadStaccatoRaw();
      const TargetDelay = 18 + (NoiseRaw + 1) * 0.5 * 18;
      LerpedDelay.current = Lerp(LerpedDelay.current, TargetDelay, 0.12);
      const Elapsed = Now - LastTime.current;
      if (Elapsed >= LerpedDelay.current) {
        CharCount++;
        SetRevealed(CharCount);
        LastTime.current = Now;
        if (CharCount >= Text.length) {
          SetIsAnimating(false);
          if (ContainerRef.current) {
            ContainerRef.current.style.minWidth = "";
            ContainerRef.current.style.minHeight = "";
            ContainerRef.current.style.display = "";
          }
          return;
        }
      }
      AnimRef.current = requestAnimationFrame(Step);
    };
    AnimRef.current = requestAnimationFrame(Step);
    return () => cancelAnimationFrame(AnimRef.current);
  }, [Text]);
  const DisplayText = IsAnimating ? Text.slice(0, Revealed) : Text;
  const Paragraphs = DisplayText.split("\n\n").filter(Boolean);
  const RenderParagraph = (Paragraph, ParagraphIndex, IsLast) => {
    const Lines = Paragraph.split("\n");
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block", children: Lines.map((Line, LineIndex) => {
      const IsLastLine = IsLast && LineIndex === Lines.length - 1;
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
        LineIndex > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("br", {}, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
          lineNumber: 566,
          columnNumber: 26
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LineNode, { Line, ShowTerms: Terms }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
          lineNumber: 567,
          columnNumber: 8
        }, undefined),
        IsAnimating && IsLastLine && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "span",
          {
            className: "StaccatoCursor",
            "aria-hidden": "true"
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
            lineNumber: 570,
            columnNumber: 9
          },
          undefined
        )
      ] }, LineIndex, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
        lineNumber: 565,
        columnNumber: 7
      }, undefined);
    }) }, ParagraphIndex, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
      lineNumber: 561,
      columnNumber: 4
    }, undefined);
  };
  if (Paragraphs.length <= 1) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { ref: ContainerRef, className: ClassName, children: RenderParagraph(DisplayText, 0, true) }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
      lineNumber: 584,
      columnNumber: 4
    }, undefined);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "span",
    {
      ref: ContainerRef,
      className: `block space-y-3 ${ClassName ?? ""}`,
      children: Paragraphs.map(
        (Paragraph, Index) => RenderParagraph(
          Paragraph,
          Index,
          Index === Paragraphs.length - 1
        )
      )
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
      lineNumber: 591,
      columnNumber: 3
    },
    undefined
  );
};

const DynamicRichText = (Props) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RichText, { ...Props }, void 0, false, {
  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicRichText.tsx",
  lineNumber: 13,
  columnNumber: 51
}, undefined);

export { DynamicRichText as D, RichText as R };
//# sourceMappingURL=DynamicRichText.DXU21lpf.js.map
