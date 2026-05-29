import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as lucide from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

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
  Architecture: "border-blue-200 bg-blue-50 text-blue-700",
  Telemetry: "border-yellow-200 bg-yellow-50 text-yellow-700",
  Protocol: "border-purple-200 bg-purple-50 text-purple-700",
  Feature: "border-orange-200 bg-orange-50 text-orange-700",
  License: "border-green-200 bg-green-50 text-green-700",
  Tool: "border-sky-200 bg-sky-50 text-sky-700"
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
  const [Copied, SetCopied] = useState(false);
  const HandleCopy = async () => {
    try {
      await navigator.clipboard.writeText(Code);
      SetCopied(true);
      setTimeout(() => SetCopied(false), 1800);
    } catch {
    }
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: HandleCopy,
      "aria-label": Copied ? "Copied" : "Copy to clipboard",
      title: Copied ? "Copied" : "Copy to clipboard",
      className: "ml-1 inline-flex h-[1.1em] w-[1.1em] shrink-0 items-center justify-center rounded-none bg-[var(--Mute)] opacity-50 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--Ring)]",
      children: Copied ? /* @__PURE__ */ jsx(
        lucide.Check,
        {
          className: "h-[0.65em] w-[0.65em] text-green-600",
          "aria-hidden": "true"
        }
      ) : /* @__PURE__ */ jsx(
        lucide.Copy,
        {
          className: "h-[0.65em] w-[0.65em]",
          "aria-hidden": "true"
        }
      )
    }
  );
};
const SegmentNode = ({ Segment }) => {
  switch (Segment.Kind) {
    case "Code":
      return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-baseline", children: [
        /* @__PURE__ */ jsx("code", { className: "rounded-none bg-[var(--Mute)] px-1.5 py-0.5 font-mono text-[0.82em]", children: Segment.Value }),
        /* @__PURE__ */ jsx(CopyInlineButton, { Code: Segment.Value })
      ] });
    case "Em":
      return /* @__PURE__ */ jsx("em", { className: "font-medium not-italic text-foreground", children: Segment.Value });
    case "Term": {
      const Logo = TermLogo[Segment.Value];
      return /* @__PURE__ */ jsxs(
        "span",
        {
          className: `inline-flex items-center rounded-none border px-1.5 py-0.5 align-middle font-mono text-[0.78em] font-medium leading-normal ${CategoryStyle[Segment.Category]}`,
          title: `${CategoryLabel[Segment.Category]}: ${Segment.Value}`,
          "aria-label": `${CategoryLabel[Segment.Category]} ${Segment.Value}`,
          children: [
            Segment.Value,
            Logo && /* @__PURE__ */ jsxs(Fragment, { children: [
              " ",
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: Logo,
                  alt: "",
                  width: 12,
                  height: 12,
                  className: "inline-block align-middle opacity-60",
                  "aria-hidden": "true"
                }
              )
            ] })
          ]
        }
      );
    }
    default:
      return /* @__PURE__ */ jsx(Fragment, { children: Segment.Value });
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
}) => /* @__PURE__ */ jsx(Fragment, { children: ParseInline(Text, ShowTerms).map((Segment, Index) => /* @__PURE__ */ jsx(SegmentNode, { Segment }, Index)) });
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
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/80", children: EnableMatch[1] }),
      /* @__PURE__ */ jsxs("span", { className: "inline-flex items-baseline", children: [
        /* @__PURE__ */ jsx("code", { className: "rounded-none bg-[var(--Mute)] px-1.5 py-0.5 font-mono text-[0.82em]", children: Command }),
        /* @__PURE__ */ jsx(CopyInlineButton, { Code: Command })
      ] }),
      Remainder && /* @__PURE__ */ jsxs(Fragment, { children: [
        ".",
        /* @__PURE__ */ jsx("span", { className: "ml-1", children: /* @__PURE__ */ jsx(
          InlineSegments,
          {
            Text: Remainder,
            ShowTerms
          }
        ) })
      ] })
    ] });
  }
  const SubFeaturesMatch = Trimmed.match(/^(sub-features?:\s*)(.+)$/i);
  if (SubFeaturesMatch) {
    const Items = (SubFeaturesMatch[2] ?? "").split(/,\s*/).map((Item) => Item.trim().replace(/\.$/, "")).filter(Boolean);
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/80", children: SubFeaturesMatch[1] }),
      Items.map((Item, Index) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center", children: [
        Index > 0 && /* @__PURE__ */ jsx("span", { className: "mx-1 text-muted-foreground", children: "," }),
        ShowTerms && TermDictionary.has(Item) ? /* @__PURE__ */ jsx(
          "span",
          {
            className: `inline-flex items-center rounded-none border px-1.5 py-0.5 align-middle font-mono text-[0.78em] font-medium leading-normal ${CategoryStyle[TermDictionary.get(Item)]}`,
            title: `${CategoryLabel[TermDictionary.get(Item)]}: ${Item}`,
            children: Item
          }
        ) : /* @__PURE__ */ jsx("em", { className: "font-medium not-italic text-foreground", children: Item })
      ] }, Item))
    ] });
  }
  const DefaultFeaturesMatch = Trimmed.match(
    /^(default features?:\s*)(.+?)(\.\s*(.+))?$/i
  );
  if (DefaultFeaturesMatch) {
    const Items = (DefaultFeaturesMatch[2] ?? "").split(/,\s*/).map((Item) => Item.trim()).filter(Boolean);
    const Remainder = DefaultFeaturesMatch[4]?.trim();
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/80", children: DefaultFeaturesMatch[1] }),
      Items.map((Item, Index) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center", children: [
        Index > 0 && /* @__PURE__ */ jsx("span", { className: "mx-1 text-muted-foreground", children: "," }),
        ShowTerms && TermDictionary.has(Item) ? /* @__PURE__ */ jsx(
          "span",
          {
            className: `inline-flex items-center rounded-none border px-1.5 py-0.5 align-middle font-mono text-[0.78em] font-medium leading-normal ${CategoryStyle[TermDictionary.get(Item)]}`,
            title: `${CategoryLabel[TermDictionary.get(Item)]}: ${Item}`,
            children: Item
          }
        ) : /* @__PURE__ */ jsx("code", { className: "rounded-none bg-[var(--Mute)] px-1.5 py-0.5 font-mono text-[0.82em]", children: Item })
      ] }, Item)),
      Remainder && /* @__PURE__ */ jsx("span", { className: "ml-1", children: /* @__PURE__ */ jsx(
        InlineSegments,
        {
          Text: Remainder,
          ShowTerms
        }
      ) })
    ] });
  }
  if (IsCommandString(Trimmed)) {
    return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-baseline", children: [
      /* @__PURE__ */ jsx("code", { className: "rounded-none bg-[var(--Mute)] px-1.5 py-0.5 font-mono text-[0.82em]", children: Trimmed }),
      /* @__PURE__ */ jsx(CopyInlineButton, { Code: Trimmed })
    ] });
  }
  return /* @__PURE__ */ jsx(InlineSegments, { Text: Line, ShowTerms });
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
  const [Revealed, SetRevealed] = useState(Text.length);
  const [IsAnimating, SetIsAnimating] = useState(false);
  const PreviousText = useRef(Text);
  const ContainerRef = useRef(null);
  const AnimRef = useRef(0);
  const LerpedDelay = useRef(20);
  const LastTime = useRef(performance.now());
  useEffect(() => {
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
    return /* @__PURE__ */ jsx("span", { className: "block", children: Lines.map((Line, LineIndex) => {
      const IsLastLine = IsLast && LineIndex === Lines.length - 1;
      return /* @__PURE__ */ jsxs("span", { children: [
        LineIndex > 0 && /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx(LineNode, { Line, ShowTerms: Terms }),
        IsAnimating && IsLastLine && /* @__PURE__ */ jsx(
          "span",
          {
            className: "StaccatoCursor",
            "aria-hidden": "true"
          }
        )
      ] }, LineIndex);
    }) }, ParagraphIndex);
  };
  if (Paragraphs.length <= 1) {
    return /* @__PURE__ */ jsx("span", { ref: ContainerRef, className: ClassName, children: RenderParagraph(DisplayText, 0, true) });
  }
  return /* @__PURE__ */ jsx(
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
    }
  );
};

function Collapsible({
  ...props
}) {
  return /* @__PURE__ */ jsx(CollapsiblePrimitive.Root, { "data-slot": "collapsible", ...props });
}
function CollapsibleTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CollapsiblePrimitive.CollapsibleTrigger,
    {
      "data-slot": "collapsible-trigger",
      ...props
    }
  );
}
function CollapsibleContent({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CollapsiblePrimitive.CollapsibleContent,
    {
      "data-slot": "collapsible-content",
      ...props
    }
  );
}

const DynamicDocSidebar = ({
  Sections,
  ActiveId
}) => {
  const [CollapsedSections, SetCollapsedSections] = useState(
    /* @__PURE__ */ new Set()
  );
  const ToggleSection = (Id) => {
    SetCollapsedSections((Previous) => {
      const Next = new Set(Previous);
      if (Next.has(Id)) {
        Next.delete(Id);
      } else {
        Next.add(Id);
      }
      return Next;
    });
  };
  return /* @__PURE__ */ jsx("nav", { "aria-label": "Documentation sections", children: /* @__PURE__ */ jsx("ul", { role: "list", className: "space-y-1", children: Sections.map((Section) => {
    const HasChildren = Section.Children && Section.Children.length > 0;
    const IsOpen = !CollapsedSections.has(Section.Id);
    if (HasChildren) {
      return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        Collapsible,
        {
          open: IsOpen,
          onOpenChange: () => ToggleSection(Section.Id),
          children: [
            /* @__PURE__ */ jsxs(CollapsibleTrigger, { className: "flex w-full items-center justify-between px-3 py-2 font-medium transition-colors hover:bg-[var(--ColorSecondary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--ColorPrimary)]", children: [
              /* @__PURE__ */ jsx("span", { children: Section.Label }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  "aria-hidden": "true",
                  className: `transition-transform ${IsOpen ? "rotate-90" : ""}`,
                  children: "›"
                }
              )
            ] }),
            /* @__PURE__ */ jsx(CollapsibleContent, { children: /* @__PURE__ */ jsx(
              "ul",
              {
                role: "list",
                className: "ml-3 mt-1 space-y-1 border-l border-[var(--ColorBorder)] pl-3",
                children: Section.Children.map((Child) => {
                  const IsChildActive = ActiveId === Child.Id;
                  return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: `/Doc/${Child.Id}`,
                      "aria-current": IsChildActive ? "page" : void 0,
                      className: `block px-2 py-1 transition-colors hover:bg-[var(--ColorSecondary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--ColorPrimary)] ${IsChildActive ? "bg-[var(--ColorSecondary)] font-medium" : "text-muted-foreground"}`,
                      children: Child.Label
                    }
                  ) }, Child.Id);
                })
              }
            ) })
          ]
        }
      ) }, Section.Id);
    }
    return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      "a",
      {
        href: `/Doc/${Section.Id}`,
        className: "block px-3 py-2 text-muted-foreground transition-colors hover:bg-[var(--ColorSecondary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--ColorPrimary)]",
        children: Section.Label
      }
    ) }, Section.Id);
  }) }) });
};

export { DynamicDocSidebar as D, RichText as R };
