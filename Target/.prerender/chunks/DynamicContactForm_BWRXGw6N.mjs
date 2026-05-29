import { jsx, jsxs } from 'react/jsx-runtime';
import { useAuth0 } from '@auth0/auth0-react';
import { Mail, Copy, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { G as GeneratePairId, a as BuildMailtoHref, B as BuildEmailBody } from './Request_D-_ytMwX.mjs';
import { A as Auth0Provider } from './Auth0Provider_CCFoI4IT.mjs';

const DynamicContactForm = ({
  Config,
  Domain,
  ClientIdentifier
}) => /* @__PURE__ */ jsx(
  Auth0Provider,
  {
    Children: /* @__PURE__ */ jsx(ContactFormInner, { Config }),
    ...Domain ? { Domain } : {},
    ...ClientIdentifier ? { ClientIdentifier } : {}
  }
);
const ProviderLabel = (Sub) => {
  if (!Sub) return "Email / Password";
  if (Sub.startsWith("google-oauth2|")) return "Google";
  if (Sub.startsWith("github|")) return "GitHub";
  if (Sub.startsWith("gitlab|")) return "GitLab";
  if (Sub.startsWith("okta|")) return "Okta SSO";
  if (Sub.startsWith("samlp|")) return "SAML SSO";
  if (Sub.startsWith("waad|")) return "Azure AD";
  return "Auth0";
};
const ContactFormInner = ({ Config }) => {
  const { user: User } = useAuth0();
  const Year = (/* @__PURE__ */ new Date()).getFullYear();
  const InitialValues = () => {
    const V = {};
    for (const Field of Config.Fields) {
      if (Field.prefill === "name")
        V[Field.id] = User?.name || User?.nickname || "";
      else if (Field.prefill === "email") V[Field.id] = User?.email || "";
      else if (Field.prefill === "sub") V[Field.id] = User?.sub || "";
      else if (Field.prefill === "provider")
        V[Field.id] = ProviderLabel(User?.sub);
      else if (Field.type === "checkboxes") V[Field.id] = [];
      else V[Field.id] = "";
    }
    return V;
  };
  const [PairId] = useState(GeneratePairId);
  const [Values, SetValues] = useState(InitialValues);
  const [CopyState, SetCopyState] = useState("idle");
  const [Errors, SetErrors] = useState({});
  const HandleChange = (Id, Value) => {
    SetValues((Prev) => ({ ...Prev, [Id]: Value }));
    SetErrors((Prev) => ({ ...Prev, [Id]: "" }));
  };
  const HandleCheckboxGroup = (Id, Option) => {
    const Current = Values[Id] || [];
    const Next = Current.includes(Option) ? Current.filter((V) => V !== Option) : [...Current, Option];
    HandleChange(Id, Next);
  };
  const Validate = () => {
    const NewErrors = {};
    for (const Field of Config.Fields) {
      if (!Field.required) continue;
      const Value = Values[Field.id];
      if (Field.type === "checkbox" && Value !== "true") {
        NewErrors[Field.id] = "This confirmation is required.";
      } else if (Field.type === "checkboxes" && Value.length === 0) {
        NewErrors[Field.id] = "Select at least one option.";
      } else if (Field.type !== "checkbox" && Field.type !== "checkboxes" && (!Value || Value.trim() === "")) {
        NewErrors[Field.id] = "This field is required.";
      }
    }
    SetErrors(NewErrors);
    return Object.keys(NewErrors).length === 0;
  };
  const HandleCopy = async () => {
    if (!Validate()) return;
    const Body = BuildEmailBody(Config, Values, Year, PairId);
    const Subject = `[${Config.Code}-${PairId}] ${Config.Title} Request`;
    const Full = `To: ${Config.To}
Subject: ${Subject}

${Body}`;
    try {
      await navigator.clipboard.writeText(Full);
      SetCopyState("copied");
      setTimeout(() => SetCopyState("idle"), 3e3);
    } catch {
    }
  };
  const MailtoHref = Validate() ? BuildMailtoHref(Config, Values, Year, PairId) : `mailto:${Config.To}`;
  const BadgeColor = Config.Destructive ? "border-red-200 bg-red-50 text-red-700" : Config.Article ? "border-blue-200 bg-blue-50 text-blue-700" : "border-[var(--Border)] bg-[var(--Mute)] text-muted-foreground";
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl space-y-8 px-4 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxs(
          "span",
          {
            className: `inline-flex items-center gap-2 border px-3 py-1 font-mono text-sm font-bold tracking-widest ${BadgeColor}`,
            title: "Pair reference - income code + instance ID. Quote this in all replies.",
            children: [
              Config.Code,
              "-",
              PairId
            ]
          }
        ),
        Config.Article && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-2 py-0.5 font-mono text-xs text-muted-foreground", children: Config.Article }),
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center bg-[var(--Mute)] px-2 py-0.5 font-mono text-xs text-muted-foreground", children: [
          Config.ResponseDays,
          "d SLA"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: Config.Title }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: Config.Subtitle }),
      /* @__PURE__ */ jsxs("p", { className: "font-mono text-xs text-muted-foreground", children: [
        "Sends to:",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-foreground", children: Config.To })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "StaccatoCard space-y-5 bg-white p-6", children: Config.Fields.map((Field) => {
      const Value = Values[Field.id];
      const Error = Errors[Field.id];
      if (Field.type === "checkbox") {
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-start gap-3 text-sm", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                className: "mt-0.5 accent-[var(--Primary)]",
                checked: Value === "true",
                onChange: (E) => HandleChange(
                  Field.id,
                  E.target.checked ? "true" : "false"
                )
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "leading-snug", children: Field.label })
          ] }),
          Error && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-600", children: Error })
        ] }, Field.id);
      }
      if (Field.type === "checkboxes") {
        const Selected = Value || [];
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "mb-2 block text-sm font-medium", children: [
            Field.label,
            Field.required && /* @__PURE__ */ jsx(
              "span",
              {
                className: "ml-1 text-red-500",
                "aria-hidden": "true",
                children: "*"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: (Field.options || []).map((Opt) => /* @__PURE__ */ jsxs(
            "label",
            {
              className: "flex cursor-pointer items-center gap-2.5 text-sm",
              children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    className: "accent-[var(--Primary)]",
                    checked: Selected.includes(Opt),
                    onChange: () => HandleCheckboxGroup(
                      Field.id,
                      Opt
                    )
                  }
                ),
                Opt
              ]
            },
            Opt
          )) }),
          Error && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-600", children: Error })
        ] }, Field.id);
      }
      if (Field.type === "select") {
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(
            "label",
            {
              htmlFor: Field.id,
              className: "mb-1 block text-sm font-medium",
              children: [
                Field.label,
                Field.required && /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "ml-1 text-red-500",
                    "aria-hidden": "true",
                    children: "*"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: Field.id,
              className: "w-full border border-[var(--Border)] bg-white px-3 py-2 text-sm focus:outline-2 focus:outline-[var(--Primary)]",
              value: Value || "",
              onChange: (E) => HandleChange(Field.id, E.target.value),
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select..." }),
                (Field.options || []).map((Opt) => /* @__PURE__ */ jsx("option", { value: Opt, children: Opt }, Opt))
              ]
            }
          ),
          Error && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-600", children: Error })
        ] }, Field.id);
      }
      if (Field.type === "textarea") {
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(
            "label",
            {
              htmlFor: Field.id,
              className: "mb-1 block text-sm font-medium",
              children: [
                Field.label,
                Field.required && /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "ml-1 text-red-500",
                    "aria-hidden": "true",
                    children: "*"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: Field.id,
              rows: 4,
              className: "w-full border border-[var(--Border)] bg-white px-3 py-2 text-sm focus:outline-2 focus:outline-[var(--Primary)]",
              placeholder: Field.placeholder,
              value: Value || "",
              onChange: (E) => HandleChange(Field.id, E.target.value)
            }
          ),
          Field.hint && /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: Field.hint }),
          Error && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-600", children: Error })
        ] }, Field.id);
      }
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(
          "label",
          {
            htmlFor: Field.id,
            className: "mb-1 block text-sm font-medium",
            children: [
              Field.label,
              Field.required && /* @__PURE__ */ jsx(
                "span",
                {
                  className: "ml-1 text-red-500",
                  "aria-hidden": "true",
                  children: "*"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: Field.id,
            type: Field.type,
            className: "w-full border border-[var(--Border)] bg-white px-3 py-2 text-sm focus:outline-2 focus:outline-[var(--Primary)]",
            placeholder: Field.placeholder,
            value: Value || "",
            onChange: (E) => HandleChange(Field.id, E.target.value)
          }
        ),
        Field.hint && /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: Field.hint }),
        Error && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-600", children: Error })
      ] }, Field.id);
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "How would you like to send this?" }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: MailtoHref,
          onClick: Validate,
          className: `StaccatoButton flex w-full items-center gap-3 border px-5 py-3 font-medium transition-all hover:bg-[var(--Secondary)] focus:outline-2 focus:outline-[var(--Primary)] ${Config.Destructive ? "border-red-200 hover:bg-red-50" : "border-[var(--Border)]"}`,
          children: [
            /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4 shrink-0", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 text-left", children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Open in email client" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Opens your default mail app with the form pre-filled as plain text - ready to review and send." })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: HandleCopy,
          className: "StaccatoButton flex w-full items-center gap-3 border border-[var(--Border)] px-5 py-3 font-medium transition-all hover:bg-[var(--Secondary)] focus:outline-2 focus:outline-[var(--Primary)]",
          children: [
            /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4 shrink-0", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 text-left", children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: CopyState === "copied" ? "Copied to clipboard" : "Copy request text" }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
                "Copies a formatted plain-text version with pair reference",
                " ",
                /* @__PURE__ */ jsxs("span", { className: "font-mono", children: [
                  Config.Code,
                  "-",
                  PairId
                ] }),
                " ",
                "- paste into any email, ticket, or chat."
              ] })
            ] })
          ]
        }
      ),
      Config.ConversationHref && /* @__PURE__ */ jsxs(
        "a",
        {
          href: Config.ConversationHref,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "StaccatoButton flex w-full items-center gap-3 border border-[var(--Border)] px-5 py-3 font-medium transition-all hover:bg-[var(--Secondary)] focus:outline-2 focus:outline-[var(--Primary)]",
          children: [
            /* @__PURE__ */ jsx(
              MessageSquare,
              {
                className: "h-4 w-4 shrink-0",
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 text-left", children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Open a conversation" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Start a public or private thread - good for questions that benefit from community input." })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border border-[var(--Border)] bg-[var(--Mute)] px-5 py-4 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxs("span", { className: "font-mono font-semibold text-foreground", children: [
        Config.Code,
        "-",
        PairId
      ] }),
      " ",
      "is your unique pair reference for this submission",
      " ",
      "—",
      " ",
      /* @__PURE__ */ jsx("span", { className: "font-mono", children: Config.Code }),
      " ",
      "identifies the request type,",
      " ",
      /* @__PURE__ */ jsx("span", { className: "font-mono", children: PairId }),
      " ",
      "is the instance ID. Quote",
      " ",
      /* @__PURE__ */ jsxs("span", { className: "font-mono text-foreground", children: [
        Config.Code,
        "-",
        PairId
      ] }),
      " ",
      "in any reply so our team can locate and track your request immediately without searching by email address."
    ] })
  ] });
};

export { DynamicContactForm as D };
