import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import * as lucide from 'lucide-react';
import { B as Button } from './Header_CrTCyJxT.mjs';

const ButtonIconRegistry = {
  ArrowRight: lucide.ArrowRight,
  ChevronRight: lucide.ChevronRight,
  Download: lucide.Download,
  ExternalLink: lucide.ExternalLink,
  GitFork: lucide.GitFork,
  Globe: lucide.Globe,
  Heart: lucide.Heart,
  LogIn: lucide.LogIn,
  Mail: lucide.Mail,
  Search: lucide.Search,
  Send: lucide.Send,
  Sparkles: lucide.Sparkles
};
const DynamicButton = ({ Content, OnAction, IsLoading = false }) => {
  const {
    Text,
    Icon,
    Variant = "ghost",
    Size = "default",
    Type = "button",
    Disabled = false,
    FullWidth = false,
    ClassName,
    Href,
    OnClick,
    ...props
  } = Content;
  const IconComponent = Icon ? ButtonIconRegistry[Icon] || null : null;
  return /* @__PURE__ */ jsxs(
    Button,
    {
      variant: Variant,
      size: Size,
      type: Type,
      disabled: Disabled || IsLoading,
      className: `StaccatoButton ${FullWidth ? "w-full" : ""} ${ClassName || ""}`,
      "aria-busy": IsLoading || void 0,
      onClick: () => {
        if (IsLoading) return;
        if (OnAction) OnAction();
        if (OnClick) OnClick();
        if (Href) window.location.href = Href;
      },
      ...props,
      children: [
        Text,
        IsLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
          " ",
          /* @__PURE__ */ jsx(
            lucide.Loader2,
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
