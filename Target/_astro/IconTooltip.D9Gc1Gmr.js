import { b1 as jsxDevRuntimeExports, ak as Provider, av as Root3, aO as Trigger, ai as Portal, u as Content2, a as Arrow2 } from './Vendor/React.D_hnTAe2.js';
import { c as cn } from './Utility.BriZ7xTM.js';

function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Tooltip.tsx",
      lineNumber: 13,
      columnNumber: 3
    },
    this
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TooltipProvider, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Root3, { "data-slot": "tooltip", ...props }, void 0, false, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Tooltip.tsx",
    lineNumber: 26,
    columnNumber: 4
  }, this) }, void 0, false, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Tooltip.tsx",
    lineNumber: 25,
    columnNumber: 3
  }, this);
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Trigger, { "data-slot": "tooltip-trigger", ...props }, void 0, false, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Tooltip.tsx",
    lineNumber: 34,
    columnNumber: 9
  }, this);
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Portal, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Content2,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin) pointer-events-none z-50 w-fit text-balance rounded-none bg-primary px-3 py-1.5 text-center text-primary-foreground",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Arrow2, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-primary fill-primary" }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Tooltip.tsx",
          lineNumber: 58,
          columnNumber: 5
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Tooltip.tsx",
      lineNumber: 49,
      columnNumber: 4
    },
    this
  ) }, void 0, false, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Tooltip.tsx",
    lineNumber: 44,
    columnNumber: 3
  }, this);
}

const IconTooltip = ({
  Label,
  Icon,
  Color,
  SizeClass = "h-4 w-4",
  ClassName = "",
  DocHref: _DocHref,
  children
}) => {
  const LabelFlat = Array.isArray(Label) ? Label.join(" ") : Label;
  if (!LabelFlat) {
    console.warn("IconTooltip: Label (aria-label) is required");
  }
  const Content = children ?? (Icon ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Icon,
    {
      className: `${SizeClass} ${ClassName}`,
      style: Color ? { color: Color } : void 0,
      "aria-hidden": "true"
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/IconTooltip.tsx",
      lineNumber: 76,
      columnNumber: 4
    },
    void 0
  ) : null);
  if (!Content) return null;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TooltipProvider, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Tooltip, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TooltipTrigger, { asChild: true, tabIndex: -1, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "span",
      {
        className: "inline-flex items-center",
        "aria-label": LabelFlat,
        title: LabelFlat,
        role: "img",
        children: Content
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/IconTooltip.tsx",
        lineNumber: 89,
        columnNumber: 6
      },
      void 0
    ) }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/IconTooltip.tsx",
      lineNumber: 88,
      columnNumber: 5
    }, void 0),
    Array.isArray(Label) ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TooltipContent, { className: "flex flex-col items-center gap-0 bg-transparent p-0 [&>svg]:hidden", children: Label.map((Line, Index) => {
      const Seed = (Math.random() * 2 - 1).toFixed(3);
      const Phase = (Math.random() * 2 - 1).toFixed(3);
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "p",
        {
          className: "StaccatoCard w-fit rounded-none bg-primary px-3 py-1 text-primary-foreground",
          style: {
            "--StaccatoSeed": Seed,
            "--StaccatoSeedPhase": Phase,
            transform: `translate(calc(var(--StaccatoSeed) * 7px), calc(var(--StaccatoSeedPhase) * 5px)) rotate(calc(var(--StaccatoSeed) * 1.5deg)) scale(1)`
          },
          children: Line
        },
        Index,
        false,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/IconTooltip.tsx",
          lineNumber: 103,
          columnNumber: 9
        },
        void 0
      );
    }) }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/IconTooltip.tsx",
      lineNumber: 98,
      columnNumber: 6
    }, void 0) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TooltipContent, { children: Label }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/IconTooltip.tsx",
      lineNumber: 119,
      columnNumber: 6
    }, void 0)
  ] }, void 0, true, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/IconTooltip.tsx",
    lineNumber: 87,
    columnNumber: 4
  }, void 0) }, void 0, false, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/IconTooltip.tsx",
    lineNumber: 86,
    columnNumber: 3
  }, void 0);
};

export { IconTooltip as I };
//# sourceMappingURL=IconTooltip.D9Gc1Gmr.js.map
