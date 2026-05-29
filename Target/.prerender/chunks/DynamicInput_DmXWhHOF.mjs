import { jsx, jsxs } from 'react/jsx-runtime';
import React, { useId } from 'react';
import { c as cn } from './Base_Bw3w2cEv.mjs';

const Input = React.forwardRef(
  ({ className, type = "text", ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        ref,
        type,
        className: cn(
          "bg-[var(--Mute)] px-3 py-2 ring-offset-[var(--Background)] file:border-0 file:bg-transparent file:font-medium placeholder:text-[var(--MuteForeground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--Ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
          "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        ),
        ...props
      }
    );
  }
);
Label.displayName = "Label";

const DynamicInput = ({ Content, Id: PropertyIdentifier }) => {
  const {
    Label: LabelText,
    Placeholder,
    Type = "text",
    Value,
    DefaultValue,
    Error,
    Disabled = false,
    Required = false,
    HelperText,
    ClassName,
    OnChange,
    AutoComplete,
    ...props
  } = Content;
  const AutoId = useId();
  const Identifier = PropertyIdentifier || AutoId;
  const ErrorIdentifier = `${Identifier}-error`;
  const HelperIdentifier = `${Identifier}-helper`;
  const DescribedBy = Error ? ErrorIdentifier : HelperText ? HelperIdentifier : void 0;
  return /* @__PURE__ */ jsxs("div", { className: "StaccatoInput flex flex-col gap-2", children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        id: Identifier,
        type: Type,
        placeholder: Placeholder,
        value: Value,
        defaultValue: DefaultValue,
        disabled: Disabled,
        required: Required,
        "aria-invalid": !!Error,
        "aria-describedby": DescribedBy,
        className: Error ? "border-destructive" : ClassName,
        ...AutoComplete ? { autoComplete: AutoComplete } : {},
        onChange: (Event) => {
          if (OnChange) {
            OnChange(Event.target.value);
          }
          if (Content.OnChange) {
            Content.OnChange(Event.target.value);
          }
        },
        ...props
      }
    ),
    LabelText && /* @__PURE__ */ jsx(
      Label,
      {
        htmlFor: Identifier,
        className: "block text-muted-foreground",
        children: LabelText
      }
    ),
    Error && /* @__PURE__ */ jsx(
      "p",
      {
        id: ErrorIdentifier,
        className: "text-destructive",
        role: "alert",
        children: Error
      }
    ),
    !Error && HelperText && /* @__PURE__ */ jsx("p", { id: HelperIdentifier, className: "text-muted-foreground", children: HelperText })
  ] });
};

export { DynamicInput as D, Label as L };
