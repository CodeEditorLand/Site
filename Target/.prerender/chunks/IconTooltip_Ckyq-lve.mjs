import { jsx, jsxs } from 'react/jsx-runtime';
import 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { a as cn } from './Base_xEyzTpo4.mjs';

function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    TooltipPrimitive.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin) z-50 w-fit text-balance rounded-none bg-primary px-3 py-1.5 text-xs text-primary-foreground",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-primary fill-primary" })
      ]
    }
  ) });
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
  const Content = children ?? (Icon ? /* @__PURE__ */ jsx(
    Icon,
    {
      className: `${SizeClass} ${className}`,
      style: Color ? { color: Color } : void 0,
      "aria-hidden": "true"
    }
  ) : null);
  if (!Content) return null;
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, tabIndex: -1, children: /* @__PURE__ */ jsx(
      "span",
      {
        className: "inline-flex items-center",
        "aria-label": Label,
        title: Label,
        role: "img",
        children: Content
      }
    ) }),
    /* @__PURE__ */ jsx(TooltipContent, { children: Label })
  ] }) });
};

export { IconTooltip as I };
