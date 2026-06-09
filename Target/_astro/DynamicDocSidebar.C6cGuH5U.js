import { b1 as jsxDevRuntimeExports, ar as Root, s as CollapsibleTrigger$1, r as CollapsibleContent$1, b2 as reactExports } from './Vendor/React.D_hnTAe2.js';

function Collapsible({
  ...props
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Root, { "data-slot": "collapsible", ...props }, void 0, false, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Collapsible.tsx",
    lineNumber: 8,
    columnNumber: 9
  }, this);
}
function CollapsibleTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    CollapsibleTrigger$1,
    {
      "data-slot": "collapsible-trigger",
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Collapsible.tsx",
      lineNumber: 15,
      columnNumber: 3
    },
    this
  );
}
function CollapsibleContent({
  ...props
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    CollapsibleContent$1,
    {
      "data-slot": "collapsible-content",
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Collapsible.tsx",
      lineNumber: 26,
      columnNumber: 3
    },
    this
  );
}

const DynamicDocSidebar = ({
  Sections,
  ActiveId
}) => {
  const [CollapsedSections, SetCollapsedSections] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const ToggleSection = (Id) => {
    SetCollapsedSections((Previous) => {
      const Next = new Set(Previous);
      if (Next.has(Id)) {
        Next.delete(Id);
      } else {
        Next.add(Id);
      }
      return Next;
    });
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("nav", { "aria-label": "Documentation sections", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { role: "list", className: "space-y-1", children: Sections.map((Section) => {
    const HasChildren = Section.Children && Section.Children.length > 0;
    const IsOpen = !CollapsedSections.has(Section.Id);
    if (HasChildren) {
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Collapsible,
        {
          open: IsOpen,
          onOpenChange: () => ToggleSection(Section.Id),
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CollapsibleTrigger, { className: "flex w-full items-center justify-between px-3 py-2 font-medium transition-colors hover:bg-[var(--ColorSecondary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--ColorPrimary)]", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: Section.Label }, void 0, false, {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDocSidebar.tsx",
                lineNumber: 50,
                columnNumber: 11
              }, undefined),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "span",
                {
                  "aria-hidden": "true",
                  className: `transition-transform ${IsOpen ? "rotate-90" : ""}`,
                  children: "›"
                },
                void 0,
                false,
                {
                  fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDocSidebar.tsx",
                  lineNumber: 51,
                  columnNumber: 11
                },
                undefined
              )
            ] }, void 0, true, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDocSidebar.tsx",
              lineNumber: 49,
              columnNumber: 10
            }, undefined),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CollapsibleContent, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "ul",
              {
                role: "list",
                className: "ml-3 mt-1 space-y-1 border-l border-[var(--ColorBorder)] pl-3",
                children: Section.Children.map((Child) => {
                  const IsChildActive = ActiveId === Child.Id;
                  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "a",
                    {
                      href: `/Doc/${Child.Id}`,
                      "aria-current": IsChildActive ? "page" : void 0,
                      className: `block px-2 py-1 transition-colors hover:bg-[var(--ColorSecondary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--ColorPrimary)] ${IsChildActive ? "bg-[var(--ColorSecondary)] font-medium" : "text-muted-foreground"}`,
                      children: Child.Label
                    },
                    void 0,
                    false,
                    {
                      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDocSidebar.tsx",
                      lineNumber: 66,
                      columnNumber: 15
                    },
                    undefined
                  ) }, Child.Id, false, {
                    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDocSidebar.tsx",
                    lineNumber: 65,
                    columnNumber: 14
                  }, undefined);
                })
              },
              void 0,
              false,
              {
                fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDocSidebar.tsx",
                lineNumber: 58,
                columnNumber: 11
              },
              undefined
            ) }, void 0, false, {
              fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDocSidebar.tsx",
              lineNumber: 57,
              columnNumber: 10
            }, undefined)
          ]
        },
        void 0,
        true,
        {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDocSidebar.tsx",
          lineNumber: 44,
          columnNumber: 9
        },
        undefined
      ) }, Section.Id, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDocSidebar.tsx",
        lineNumber: 43,
        columnNumber: 8
      }, undefined);
    }
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "a",
      {
        href: `/Doc/${Section.Id}`,
        className: "block px-3 py-2 text-muted-foreground transition-colors hover:bg-[var(--ColorSecondary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--ColorPrimary)]",
        children: Section.Label
      },
      void 0,
      false,
      {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDocSidebar.tsx",
        lineNumber: 92,
        columnNumber: 8
      },
      undefined
    ) }, Section.Id, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDocSidebar.tsx",
      lineNumber: 91,
      columnNumber: 7
    }, undefined);
  }) }, void 0, false, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDocSidebar.tsx",
    lineNumber: 35,
    columnNumber: 4
  }, undefined) }, void 0, false, {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDocSidebar.tsx",
    lineNumber: 34,
    columnNumber: 3
  }, undefined);
};

export { DynamicDocSidebar, DynamicDocSidebar as default };
//# sourceMappingURL=DynamicDocSidebar.C6cGuH5U.js.map
