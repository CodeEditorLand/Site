import { an as React, b1 as jsxDevRuntimeExports, aF as Slot } from './Vendor/React.D_hnTAe2.js';
import { c as cn, a as cva } from './Utility.BriZ7xTM.js';

const ButtonVariants = cva(
  "inline-flex items-center justify-center gap-0 whitespace-nowrap rounded-[var(--RadiusButton)] font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[var(--Ring)]/40 focus-visible:ring-[2px] aria-invalid:ring-[var(--Destruct)]/20",
  {
    variants: {
      variant: {
        default: "bg-[var(--Foreground)] text-[var(--Background)] hover:bg-[var(--Foreground)]/85",
        destructive: "bg-[var(--Destruct)] text-[var(--DestructForeground)] hover:bg-[var(--Destruct)]/85 focus-visible:ring-[var(--Destruct)]/20",
        outline: "bg-[var(--Background)] text-[var(--Foreground)] hover:bg-[var(--Mute)]",
        secondary: "bg-[var(--Secondary)] text-[var(--SecondaryForeground)] hover:bg-[var(--Surface3)]",
        ghost: "text-[var(--Foreground)] hover:bg-[var(--Mute)]",
        link: "text-[var(--Foreground)] underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-[2.1rem] py-2 has-[>svg]:px-[1.8rem]",
        sm: "h-8 gap-0 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-[2.6rem] has-[>svg]:px-[2.2rem]",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Comp,
      {
        "data-slot": "button",
        ref,
        className: cn(ButtonVariants({ variant, size, className })),
        ...props
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Button.tsx",
        lineNumber: 48,
        columnNumber: 4
      },
      undefined
    );
  }
);
Button.displayName = "Button";

function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("animate-pulse rounded-none bg-accent", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Skeleton.tsx",
      lineNumber: 5,
      columnNumber: 3
    },
    this
  );
}
function SkeletonCard({ className }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn("bg-card p-6", className), children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "mb-4 h-6 w-3/4 bg-[var(--Secondary)]" }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Skeleton.tsx",
      lineNumber: 19,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "mb-2 h-4 w-full bg-[var(--Secondary)]" }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Skeleton.tsx",
      lineNumber: 20,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "h-4 w-5/6 bg-[var(--Secondary)]" }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Skeleton.tsx",
      lineNumber: 21,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Skeleton.tsx",
    lineNumber: 18,
    columnNumber: 3
  }, this);
}
function SkeletonFeatureCard({ className }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn("bg-card p-6", className), children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4 flex items-start justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "h-6 w-1/2 bg-[var(--Secondary)]" }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Skeleton.tsx",
        lineNumber: 34,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "h-10 w-10 shrink-0 bg-[var(--Secondary)]" }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Skeleton.tsx",
        lineNumber: 35,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Skeleton.tsx",
      lineNumber: 33,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "mb-2 h-4 w-full bg-[var(--Secondary)]" }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Skeleton.tsx",
      lineNumber: 37,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "mb-2 h-4 w-5/6 bg-[var(--Secondary)]" }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Skeleton.tsx",
      lineNumber: 38,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "h-4 w-4/6 bg-[var(--Secondary)]" }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Skeleton.tsx",
      lineNumber: 39,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Skeleton.tsx",
    lineNumber: 32,
    columnNumber: 3
  }, this);
}
function SkeletonPricingTier({ className }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn("bg-card", className), children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "mb-4 h-9 w-full bg-[var(--Secondary)]" }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Skeleton.tsx",
        lineNumber: 52,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "mb-2 h-6 w-1/3 bg-[var(--Secondary)]" }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Skeleton.tsx",
        lineNumber: 53,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "mb-4 h-4 w-2/3 bg-[var(--Secondary)]" }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Skeleton.tsx",
        lineNumber: 54,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "h-10 w-1/3 bg-[var(--Secondary)]" }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Skeleton.tsx",
        lineNumber: 55,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Skeleton.tsx",
      lineNumber: 51,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6", children: [1, 2, 3, 4].map((Index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Skeleton,
      {
        className: "mb-3 h-4 w-full bg-[var(--Secondary)]"
      },
      Index,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Skeleton.tsx",
        lineNumber: 59,
        columnNumber: 6
      },
      this
    )) }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Skeleton.tsx",
      lineNumber: 57,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Skeleton.tsx",
    lineNumber: 50,
    columnNumber: 3
  }, this);
}

export { Button as B, Skeleton as S, SkeletonCard as a, SkeletonFeatureCard as b, SkeletonPricingTier as c };
//# sourceMappingURL=Skeleton.Dp5ep6F2.js.map
