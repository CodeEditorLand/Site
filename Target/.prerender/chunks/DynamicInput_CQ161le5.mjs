import { jsx, jsxs } from 'react/jsx-runtime';
import React from 'react';
import { a as cn } from './Base_DMf2Ciav.mjs';

const Input = React.forwardRef(
  ({ className, type = "text", ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        ref,
        type,
        className: cn(
          "border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ...props
      }
    );
  }
);
Input.displayName = "Input";

const Label = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "label",
      {
        ref,
        className: cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        ),
        ...props
      }
    );
  }
);
Label.displayName = "Label";

const DynamicInput = ({ content, id: PropertyIdentifier }) => {
  const {
    label,
    placeholder,
    type = "text",
    value,
    defaultValue,
    error,
    disabled = false,
    required = false,
    helperText,
    className,
    onChange,
    ...props
  } = content;
  const Identifier = PropertyIdentifier || `input-${Math.random().toString(36).substr(2, 9)}`;
  const ErrorIdentifier = `${Identifier}-error`;
  const HelperIdentifier = `${Identifier}-helper`;
  const DescribedBy = error ? ErrorIdentifier : helperText ? HelperIdentifier : void 0;
  return /* @__PURE__ */ jsxs("div", { className: "StaccatoInput flex flex-col gap-2", children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        id: Identifier,
        type,
        placeholder,
        value,
        defaultValue,
        disabled,
        required,
        "aria-invalid": !!error,
        "aria-describedby": DescribedBy,
        className: error ? "border-destructive" : className,
        onChange: (Event) => {
          if (onChange) {
            onChange(Event.target.value);
          }
          if (content.onChange) {
            content.onChange(Event.target.value);
          }
        },
        ...props
      }
    ),
    label && /* @__PURE__ */ jsx(
      Label,
      {
        htmlFor: Identifier,
        className: "block text-xs text-muted-foreground",
        children: label
      }
    ),
    error && /* @__PURE__ */ jsx(
      "p",
      {
        id: ErrorIdentifier,
        className: "text-xs text-destructive",
        role: "alert",
        children: error
      }
    ),
    !error && helperText && /* @__PURE__ */ jsx(
      "p",
      {
        id: HelperIdentifier,
        className: "text-xs text-muted-foreground",
        children: helperText
      }
    )
  ] });
};

export { DynamicInput as D, Label as L };
