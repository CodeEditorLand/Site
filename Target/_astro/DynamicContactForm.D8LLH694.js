import { b1 as jsxDevRuntimeExports, b3 as useAuth0, b2 as reactExports, a7 as Mail, w as Copy, aa as MessageSquare } from './Vendor/React.D_hnTAe2.js';
import { G as GeneratePairId, a as BuildMailtoHref, B as BuildEmailBody } from './Request.Dux_TM63.js';
import { a as Auth0Provider } from './Footer.J6XKs53r.js';

const DynamicContactForm = ({
  Config,
  Domain,
  ClientIdentifier
}) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Auth0Provider,
  {
    Children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ContactFormInner, { Config }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
      lineNumber: 27,
      columnNumber: 13
    }, undefined),
    ...Domain ? { Domain } : {},
    ...ClientIdentifier ? { ClientIdentifier } : {}
  },
  void 0,
  false,
  {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
    lineNumber: 26,
    columnNumber: 2
  },
  undefined
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
  const [PairId] = reactExports.useState(GeneratePairId);
  const [Values, SetValues] = reactExports.useState(InitialValues);
  const [CopyState, SetCopyState] = reactExports.useState("idle");
  const [Errors, SetErrors] = reactExports.useState({});
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
  const MailtoHref = BuildMailtoHref(Config, Values, Year, PairId);
  Config.Destructive ? "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300" : Config.Article ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300" : "border-[var(--Border)] bg-[var(--Mute)] text-muted-foreground";
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto max-w-2xl space-y-8 px-4 py-12", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "span",
          {
            className: `inline-flex items-center gap-2 border px-3 py-1 text-foreground`,
            title: "Pair reference - income code + instance ID. Quote this in all replies.",
            children: [
              Config.Code,
              "-",
              PairId
            ]
          },
          void 0,
          true,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
            lineNumber: 145,
            columnNumber: 6
          },
          undefined
        ),
        Config.Article && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center border border-[var(--Border)] bg-[var(--Mute)] px-2 py-0.5 font-mono text-sm text-muted-foreground", children: Config.Article }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
          lineNumber: 151,
          columnNumber: 7
        }, undefined),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center bg-[var(--Mute)] px-2 py-0.5 font-mono text-sm text-muted-foreground", children: [
          Config.ResponseDays,
          "d SLA"
        ] }, void 0, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
          lineNumber: 155,
          columnNumber: 6
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
        lineNumber: 144,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "font-mono text-lg font-semibold tracking-tight", children: Config.Title }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
        lineNumber: 159,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-muted-foreground", children: Config.Subtitle }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
        lineNumber: 162,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "font-mono text-sm text-muted-foreground", children: [
        "Sends to:",
        " ",
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-foreground", children: Config.To }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
          lineNumber: 165,
          columnNumber: 6
        }, undefined)
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
        lineNumber: 163,
        columnNumber: 5
      }, undefined)
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
      lineNumber: 143,
      columnNumber: 4
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "StaccatoCard space-y-5 bg-card p-6", children: Config.Fields.map((Field) => {
      const Value = Values[Field.id];
      const Error = Errors[Field.id];
      if (Field.type === "checkbox") {
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex cursor-pointer items-start gap-3 text-sm", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                type: "checkbox",
                className: "mt-0.5 accent-[var(--Primary)]",
                checked: Value === "true",
                onChange: (E) => HandleChange(
                  Field.id,
                  E.target.checked ? "true" : "false"
                )
              },
              void 0,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
                lineNumber: 179,
                columnNumber: 10
              },
              undefined
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "leading-snug", children: Field.label }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
              lineNumber: 192,
              columnNumber: 10
            }, undefined)
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
            lineNumber: 178,
            columnNumber: 9
          }, undefined),
          Error && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1 text-sm text-red-600", children: Error }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
            lineNumber: 197,
            columnNumber: 10
          }, undefined)
        ] }, Field.id, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
          lineNumber: 177,
          columnNumber: 8
        }, undefined);
      }
      if (Field.type === "checkboxes") {
        const Selected = Value || [];
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mb-2 block text-sm font-medium", children: [
            Field.label,
            Field.required && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "span",
              {
                className: "ml-1 text-red-500",
                "aria-hidden": "true",
                children: "*"
              },
              void 0,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
                lineNumber: 212,
                columnNumber: 11
              },
              undefined
            )
          ] }, void 0, true, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
            lineNumber: 209,
            columnNumber: 9
          }, undefined),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2", children: (Field.options || []).map((Opt) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "label",
            {
              className: "flex cursor-pointer items-center gap-2.5 text-sm",
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "input",
                  {
                    type: "checkbox",
                    className: "accent-[var(--Primary)]",
                    checked: Selected.includes(Opt),
                    onChange: () => HandleCheckboxGroup(
                      Field.id,
                      Opt
                    )
                  },
                  void 0,
                  false,
                  {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
                    lineNumber: 224,
                    columnNumber: 12
                  },
                  undefined
                ),
                Opt
              ]
            },
            Opt,
            true,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
              lineNumber: 221,
              columnNumber: 11
            },
            undefined
          )) }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
            lineNumber: 219,
            columnNumber: 9
          }, undefined),
          Error && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1 text-sm text-red-600", children: Error }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
            lineNumber: 240,
            columnNumber: 10
          }, undefined)
        ] }, Field.id, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
          lineNumber: 208,
          columnNumber: 8
        }, undefined);
      }
      if (Field.type === "select") {
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "label",
            {
              htmlFor: Field.id,
              className: "mb-1 block text-sm font-medium",
              children: [
                Field.label,
                Field.required && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "span",
                  {
                    className: "ml-1 text-red-500",
                    "aria-hidden": "true",
                    children: "*"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
                    lineNumber: 256,
                    columnNumber: 11
                  },
                  undefined
                )
              ]
            },
            void 0,
            true,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
              lineNumber: 251,
              columnNumber: 9
            },
            undefined
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "select",
            {
              id: Field.id,
              className: "w-full border border-[var(--Border)] bg-card px-3 py-2 text-sm focus:outline-2 focus:outline-[var(--Primary)]",
              value: Value || "",
              onChange: (E) => HandleChange(Field.id, E.target.value),
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "", children: "Select..." }, void 0, false, {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
                  lineNumber: 270,
                  columnNumber: 10
                }, undefined),
                (Field.options || []).map((Opt) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: Opt, children: Opt }, Opt, false, {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
                  lineNumber: 272,
                  columnNumber: 11
                }, undefined))
              ]
            },
            void 0,
            true,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
              lineNumber: 263,
              columnNumber: 9
            },
            undefined
          ),
          Error && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1 text-sm text-red-600", children: Error }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
            lineNumber: 278,
            columnNumber: 10
          }, undefined)
        ] }, Field.id, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
          lineNumber: 250,
          columnNumber: 8
        }, undefined);
      }
      if (Field.type === "textarea") {
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "label",
            {
              htmlFor: Field.id,
              className: "mb-1 block text-sm font-medium",
              children: [
                Field.label,
                Field.required && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "span",
                  {
                    className: "ml-1 text-red-500",
                    "aria-hidden": "true",
                    children: "*"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
                    lineNumber: 294,
                    columnNumber: 11
                  },
                  undefined
                )
              ]
            },
            void 0,
            true,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
              lineNumber: 289,
              columnNumber: 9
            },
            undefined
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "textarea",
            {
              id: Field.id,
              rows: 4,
              className: "w-full border border-[var(--Border)] bg-card px-3 py-2 text-sm focus:outline-2 focus:outline-[var(--Primary)]",
              placeholder: Field.placeholder,
              value: Value || "",
              onChange: (E) => HandleChange(Field.id, E.target.value)
            },
            void 0,
            false,
            {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
              lineNumber: 301,
              columnNumber: 9
            },
            undefined
          ),
          Field.hint && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-0.5 text-sm text-muted-foreground", children: Field.hint }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
            lineNumber: 312,
            columnNumber: 10
          }, undefined),
          Error && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1 text-sm text-red-600", children: Error }, void 0, false, {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
            lineNumber: 317,
            columnNumber: 10
          }, undefined)
        ] }, Field.id, true, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
          lineNumber: 288,
          columnNumber: 8
        }, undefined);
      }
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "label",
          {
            htmlFor: Field.id,
            className: "mb-1 block text-sm font-medium",
            children: [
              Field.label,
              Field.required && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "span",
                {
                  className: "ml-1 text-red-500",
                  "aria-hidden": "true",
                  children: "*"
                },
                void 0,
                false,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
                  lineNumber: 333,
                  columnNumber: 10
                },
                undefined
              )
            ]
          },
          void 0,
          true,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
            lineNumber: 328,
            columnNumber: 8
          },
          undefined
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "input",
          {
            id: Field.id,
            type: Field.type,
            className: "w-full border border-[var(--Border)] bg-card px-3 py-2 text-sm focus:outline-2 focus:outline-[var(--Primary)]",
            placeholder: Field.placeholder,
            value: Value || "",
            onChange: (E) => HandleChange(Field.id, E.target.value)
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
            lineNumber: 340,
            columnNumber: 8
          },
          undefined
        ),
        Field.hint && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-0.5 text-sm text-muted-foreground", children: Field.hint }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
          lineNumber: 351,
          columnNumber: 9
        }, undefined),
        Error && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1 text-sm text-red-600", children: Error }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
          lineNumber: 356,
          columnNumber: 9
        }, undefined)
      ] }, Field.id, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
        lineNumber: 327,
        columnNumber: 7
      }, undefined);
    }) }, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
      lineNumber: 170,
      columnNumber: 4
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm font-medium", children: "How would you like to send this?" }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
        lineNumber: 367,
        columnNumber: 5
      }, undefined),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "a",
        {
          href: MailtoHref,
          onClick: Validate,
          className: `StaccatoButton flex w-full items-center gap-3 border px-5 py-3 font-medium transition-all hover:bg-[var(--Secondary)] focus:outline-2 focus:outline-[var(--Primary)] ${Config.Destructive ? "border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950" : "border-[var(--Border)]"}`,
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Mail, { className: "h-4 w-4 shrink-0", "aria-hidden": "true" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
              lineNumber: 376,
              columnNumber: 6
            }, undefined),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 text-left", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-medium", children: "Open in email client" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
                lineNumber: 378,
                columnNumber: 7
              }, undefined),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm text-muted-foreground", children: "Opens your default mail app with the form pre-filled as plain text - ready to review and send." }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
                lineNumber: 379,
                columnNumber: 7
              }, undefined)
            ] }, void 0, true, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
              lineNumber: 377,
              columnNumber: 6
            }, undefined)
          ]
        },
        void 0,
        true,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
          lineNumber: 372,
          columnNumber: 5
        },
        undefined
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          type: "button",
          onClick: HandleCopy,
          className: "StaccatoButton flex w-full items-center gap-3 border border-[var(--Border)] px-5 py-3 font-medium transition-all hover:bg-[var(--Secondary)] focus:outline-2 focus:outline-[var(--Primary)]",
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Copy, { className: "h-4 w-4 shrink-0", "aria-hidden": "true" }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
              lineNumber: 391,
              columnNumber: 6
            }, undefined),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 text-left", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-medium", children: CopyState === "copied" ? "Copied to clipboard" : "Copy request text" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
                lineNumber: 393,
                columnNumber: 7
              }, undefined),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm text-muted-foreground", children: [
                "Copies a formatted plain-text version with pair reference",
                " ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-mono", children: [
                  Config.Code,
                  "-",
                  PairId
                ] }, void 0, true, {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
                  lineNumber: 401,
                  columnNumber: 8
                }, undefined),
                " ",
                "- paste into any email, ticket, or chat."
              ] }, void 0, true, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
                lineNumber: 398,
                columnNumber: 7
              }, undefined)
            ] }, void 0, true, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
              lineNumber: 392,
              columnNumber: 6
            }, undefined)
          ]
        },
        void 0,
        true,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
          lineNumber: 387,
          columnNumber: 5
        },
        undefined
      ),
      Config.ConversationHref && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "a",
        {
          href: Config.ConversationHref,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "StaccatoButton flex w-full items-center gap-3 border border-[var(--Border)] px-5 py-3 font-medium transition-all hover:bg-[var(--Secondary)] focus:outline-2 focus:outline-[var(--Primary)]",
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              MessageSquare,
              {
                className: "h-4 w-4 shrink-0",
                "aria-hidden": "true"
              },
              void 0,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
                lineNumber: 416,
                columnNumber: 7
              },
              undefined
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 text-left", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-medium", children: "Open a conversation" }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
                lineNumber: 421,
                columnNumber: 8
              }, undefined),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm text-muted-foreground", children: "Start a public or private thread - good for questions that benefit from community input." }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
                lineNumber: 424,
                columnNumber: 8
              }, undefined)
            ] }, void 0, true, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
              lineNumber: 420,
              columnNumber: 7
            }, undefined)
          ]
        },
        void 0,
        true,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
          lineNumber: 411,
          columnNumber: 6
        },
        undefined
      )
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
      lineNumber: 366,
      columnNumber: 4
    }, undefined),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border border-[var(--Border)] bg-[var(--Mute)] px-5 py-4 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-mono font-semibold text-foreground", children: [
        Config.Code,
        "-",
        PairId
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
        lineNumber: 435,
        columnNumber: 5
      }, undefined),
      " ",
      "is your unique pair reference for this submission -",
      " ",
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-mono", children: Config.Code }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
        lineNumber: 439,
        columnNumber: 5
      }, undefined),
      " identifies the request type, ",
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-mono", children: PairId }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
        lineNumber: 440,
        columnNumber: 19
      }, undefined),
      " is the instance ID. Quote",
      " ",
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-mono text-foreground", children: [
        Config.Code,
        "-",
        PairId
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
        lineNumber: 442,
        columnNumber: 5
      }, undefined),
      " ",
      "in any reply so our team can locate and track your request immediately without searching by email address."
    ] }, void 0, true, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
      lineNumber: 434,
      columnNumber: 4
    }, undefined)
  ] }, void 0, true, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
    lineNumber: 141,
    columnNumber: 3
  }, undefined);
};

export { DynamicContactForm as default };
//# sourceMappingURL=DynamicContactForm.D8LLH694.js.map
