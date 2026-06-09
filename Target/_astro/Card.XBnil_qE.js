import { an as React, b1 as jsxDevRuntimeExports } from './Vendor/React.D_hnTAe2.js';
import { c as cn } from './Utility.BriZ7xTM.js';

const Card = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      ref,
      className: cn(
        "bg-[var(--Card)] text-[var(--CardForeground)]",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Card.tsx",
      lineNumber: 10,
      columnNumber: 3
    },
    undefined
  );
});
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      ref,
      className: cn("flex flex-col space-y-1.5 p-6", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Card.tsx",
      lineNumber: 27,
      columnNumber: 3
    },
    undefined
  );
});
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "h3",
    {
      ref,
      className: cn(
        "font-mono text-sm font-semibold leading-snug tracking-tight",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Card.tsx",
      lineNumber: 41,
      columnNumber: 3
    },
    undefined
  );
});
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "p",
    {
      ref,
      className: cn("text-sm text-muted-foreground", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Card.tsx",
      lineNumber: 58,
      columnNumber: 3
    },
    undefined
  );
});
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { ref, className: cn("p-6 pt-0", className), ...props }, void 0, false, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Card.tsx",
    lineNumber: 71,
    columnNumber: 9
  }, undefined);
});
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      ref,
      className: cn("flex items-center p-6 pt-0", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Card.tsx",
      lineNumber: 80,
      columnNumber: 3
    },
    undefined
  );
});
CardFooter.displayName = "CardFooter";

export { Card as C, CardContent as a, CardDescription as b, CardFooter as c, CardHeader as d, CardTitle as e };
//# sourceMappingURL=Card.XBnil_qE.js.map
