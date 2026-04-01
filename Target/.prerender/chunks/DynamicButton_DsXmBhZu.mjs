import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Loader2, Sparkles, Send, Search, Mail, LogIn, Heart, Globe, GitFork, ExternalLink, Download, ChevronRight, ArrowRight } from 'lucide-react';
import { B as Button } from './Button_C02KTPew.mjs';

const ButtonIconRegistry = {
  ArrowRight,
  ChevronRight,
  Download,
  ExternalLink,
  GitFork,
  Globe,
  Heart,
  LogIn,
  Mail,
  Search,
  Send,
  Sparkles
};
const DynamicButton = ({ content, onAction, isLoading = false }) => {
  const {
    text,
    icon,
    variant = "default",
    size = "default",
    type = "button",
    disabled = false,
    fullWidth = false,
    className,
    ...props
  } = content;
  const IconComponent = icon ? ButtonIconRegistry[icon] || null : null;
  return /* @__PURE__ */ jsxs(
    Button,
    {
      variant,
      size,
      type,
      disabled: disabled || isLoading,
      className: `StaccatoButton ${fullWidth ? "w-full" : ""} ${className || ""}`,
      "aria-busy": isLoading || void 0,
      onClick: () => {
        if (!isLoading && onAction) {
          onAction();
        }
        if (!isLoading && content.onClick) {
          content.onClick();
        }
      },
      ...props,
      children: [
        text,
        isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
          " ",
          /* @__PURE__ */ jsx(
            Loader2,
            {
              className: "StaccatoSpinner h-4 w-4 animate-spin",
              "aria-hidden": "true"
            }
          )
        ] }) : IconComponent ? /* @__PURE__ */ jsxs(Fragment, { children: [
          " ",
          /* @__PURE__ */ jsx(
            IconComponent,
            {
              className: "StaccatoIcon h-4 w-4",
              "aria-hidden": "true"
            }
          )
        ] }) : null
      ]
    }
  );
};

export { DynamicButton as D };
