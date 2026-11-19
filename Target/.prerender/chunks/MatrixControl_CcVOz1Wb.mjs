import { d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { Mt as Segmented, Yt as cn, Zt as createAstro, jt as Chord } from "./Base_BVG1wSoZ.mjs";
import { a as SelectLabel, i as SelectItem, n as SelectContent, o as SelectTrigger, r as SelectGroup, s as SelectValue, t as Select } from "./Select_CxMnqXZx.mjs";
import * as React$1 from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
// Source/Component/UI/Copy/Data.ts
var CopyCopy = {
	idle: {
		Mark: "→",
		Label: "COPY",
		Meta: ""
	},
	copied: {
		Mark: "✓",
		Label: "COPIED",
		Meta: ""
	},
	denied: {
		Mark: "◎",
		Label: "DENIED",
		Meta: "CLIPBOARD UNAVAILABLE"
	},
	error: {
		Mark: "◎",
		Label: "INTERRUPTED",
		Meta: "TRY AGAIN"
	},
	empty: {
		Mark: "◎",
		Label: "NOTHING TO COPY",
		Meta: ""
	}
};
/**
* How long a *copied* receipt stands before it returns to rest.
*
* The site's wired controls use 1800 ms; this one holds 8000, because the
* receipt is a row inside a control the reader is still using and 1800 ms is
* gone before the eye comes back to it. `Reset` is the other half of the rule: a
* payload that changes under a standing receipt clears it immediately. A failure
* receipt is never timed out - a reader who missed it would be left believing
* the copy worked.
*/
var CopiedInterval = 8e3;
// Source/Component/UI/Copy/Copy.tsx
var useCopyReceipt = (Payload) => {
	const [State, SetState] = React$1.useState("idle");
	const [Meta, SetMeta] = React$1.useState("");
	const Timer = React$1.useRef(null);
	const Clear = React$1.useCallback(() => {
		if (Timer.current) clearTimeout(Timer.current);
		Timer.current = null;
	}, []);
	const Reset = React$1.useCallback(() => {
		Clear();
		SetState("idle");
		SetMeta("");
	}, [Clear]);
	React$1.useEffect(() => Clear, [Clear]);
	return {
		State,
		Meta,
		Copy: React$1.useCallback(() => {
			const Next = Payload();
			if (Next === null) {
				SetState("empty");
				SetMeta("");
				return;
			}
			const Clipboard = navigator.clipboard;
			if (!Clipboard || typeof Clipboard.writeText !== "function") {
				SetState("denied");
				SetMeta(CopyCopy.denied.Meta);
				return;
			}
			Clipboard.writeText(Next.Text).then(() => {
				SetState("copied");
				SetMeta(Next.Meta);
				Clear();
				Timer.current = setTimeout(() => {
					SetState("idle");
					SetMeta("");
				}, CopiedInterval);
			}, (Reason) => {
				const Denied = Reason instanceof DOMException && Reason.name === "NotAllowedError";
				SetState(Denied ? "denied" : "error");
				SetMeta(Denied ? CopyCopy.denied.Meta : CopyCopy.error.Meta);
			});
		}, [Clear, Payload]),
		Reset
	};
};
/**
* The receipt itself. Presentational: it renders the state it is handed, so the
* same object can be driven by the hook above or by a test's fixed state.
*/
var CopyReceipt = ({ State, Meta, Label, OnCopy, className }) => {
	const Words = CopyCopy[State];
	const Text = State === "idle" && Label ? Label : Words.Label;
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		className: cn("Copy", className),
		"data-state": State,
		"aria-disabled": State === "empty" || State === "denied" ? true : void 0,
		onClick: State === "empty" || State === "denied" ? void 0 : OnCopy,
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "Copy__Mark",
				"aria-hidden": "true",
				children: Words.Mark
			}),
			/* @__PURE__ */ jsx("span", {
				className: "Copy__Label",
				children: Text
			}),
			Meta || Words.Meta ? /* @__PURE__ */ jsx("span", {
				className: "Copy__Meta",
				children: Meta || Words.Meta
			}) : null
		]
	});
};
// Source/Component/UI/Matrix/Data.ts
/** The two rhythms, in the order the switch prints them. */
var DensityItems = [{
	Value: "comfortable",
	Label: "COMFORTABLE"
}, {
	Value: "compact",
	Label: "COMPACT"
}];
/** The storage key. One key, one preference, every matrix on the site. */
var DensityKey = "land:density";
var MatrixCopy = {
	/** The register line's `/` name. */
	Register: "FILTER",
	FacetLabel: "FACET:",
	/** The value the facet field prints before anything is narrowed. */
	FacetAll: "ALL COLUMNS",
	MatchLabel: "MATCH:",
	MatchPlaceholder: "a value, a label",
	DensityLabel: "ROWS:",
	CopyLabel: "COPY ROWS",
	/** The step control's label, printed with the remaining count. */
	MoreLabel: "SHOW MORE",
	/** The count's unit, printed after the figure: `13 OF 13`. */
	CountOf: "OF",
	/**
	* The empty state: a matrix with no rows at all. It is not the same fact as
	* "no match" - one is a table that has nothing in it yet, the other is a
	* table the reader has narrowed to nothing - and the two say different
	* things about what to do next.
	*/
	EmptyMark: "NO ROW",
	EmptyLine: "This matrix has no rows yet, so there is nothing to narrow.",
	EmptyNext: "READ THE BAND ABOVE IT FOR WHAT WOULD BE HERE",
	/** The void state: rows exist, the reader's own filter matched none. */
	VoidMark: "NO ROW MATCHES",
	/** The cell the void row prints inside the table itself. */
	VoidCell: "THE FILTER ABOVE MATCHED NOTHING",
	VoidLine: "No row in this matrix carries that value or that label.",
	ClearLabel: "CLEAR THE FILTER",
	/** The handoff: the local filter finding nothing opens the global index. */
	HandoffLabel: "FIND ALL RECORDS",
	/**
	* The partial state: a row whose facet cell is empty. The matrix prints an
	* empty cell; the facet names it rather than dropping it, because a value
	* the table does not have is a fact and not an absence to hide.
	*/
	Unavailable: "UNAVAILABLE",
	/** The denied state: the preference cannot be remembered past this visit. */
	StorageMark: "NOT REMEMBERED",
	StorageLine: "This browser refuses local storage, so the density holds for this visit only.",
	/** The keyboard fact the facet list obeys, in the control's voice. */
	FootHint: "ESC CLOSES THE LIST"
};
/** The count as the grammar prints a figure: two digits, zero-padded. */
var Pad = (Value) => String(Value).padStart(2, "0");
// Source/Component/UI/Matrix/MatrixControl.tsx
/** The facet field's sentinel: no column, no value. */
var All = "all";
var ReadRows = (Target) => {
	const Body = document.getElementById(Target)?.querySelector("tbody");
	if (!Body) return [];
	return [...Body.querySelectorAll("tr")].filter((Row) => !Row.classList.contains("MatrixControl__Void")).map((Row) => {
		const Label = Row.querySelector("th");
		const Cells = [...Row.querySelectorAll("td")].map((Cell) => Cell.textContent?.trim() ?? "");
		return {
			Element: Row,
			Label: Label?.textContent?.trim() ?? "",
			Cells
		};
	});
};
var MatrixControl = ({ Target, Facets, Name, Total, PageSize = 24 }) => {
	const [Query, SetQuery] = React$1.useState("");
	const [Facet, SetFacet] = React$1.useState(All);
	const [Density, SetDensity] = React$1.useState("comfortable");
	const [Rows, SetRows] = React$1.useState([]);
	const [Page, SetPage] = React$1.useState(1);
	const [Remembered, SetRemembered] = React$1.useState(true);
	/** The void row, created once and re-used, so it cannot accumulate. */
	const VoidRef = React$1.useRef(null);
	React$1.useEffect(() => {
		SetRows(ReadRows(Target));
	}, [Target]);
	React$1.useEffect(() => {
		let Stored = null;
		try {
			Stored = window.localStorage.getItem(DensityKey);
		} catch {
			SetRemembered(false);
		}
		const Next = Stored === "compact" ? "compact" : "comfortable";
		SetDensity(Next);
		document.documentElement.dataset["density"] = Next;
	}, []);
	const ChooseDensity = React$1.useCallback((Next) => {
		SetDensity(Next);
		document.documentElement.dataset["density"] = Next;
		try {
			window.localStorage.setItem(DensityKey, Next);
			SetRemembered(true);
		} catch {
			SetRemembered(false);
		}
	}, []);
	const FacetValues = React$1.useMemo(() => {
		const Groups = /* @__PURE__ */ new Map();
		for (const FacetColumn of Facets) {
			const Index = Number(FacetColumn.Key);
			const Values = /* @__PURE__ */ new Set();
			for (const Row of Rows) {
				const Value = Row.Cells[Index]?.trim() ?? "";
				Values.add(Value.length > 0 ? Value : MatrixCopy.Unavailable);
			}
			Groups.set(FacetColumn.Key, Values);
		}
		return Groups;
	}, [Facets, Rows]);
	/**
	* The chosen facet, split at its FIRST colon.
	*
	* A cell value may itself contain a colon (`STATUS: ACTIVE`), so the key is
	* `column:value` split once - a plain `split(":")` would read the value's own
	* colon as the separator and narrow to the wrong thing.
	*/
	const At = Facet.indexOf(":");
	const FacetColumn = At === -1 ? All : Facet.slice(0, At);
	const FacetValue = At === -1 ? All : Facet.slice(At + 1);
	const Matched = React$1.useMemo(() => {
		const Needle = Query.trim().toLowerCase();
		const Column = FacetColumn === All ? null : Number(FacetColumn);
		return Rows.filter((Row) => {
			if (Column !== null) {
				const Cell = Row.Cells[Column]?.trim() ?? "";
				if ((Cell.length > 0 ? Cell : MatrixCopy.Unavailable) !== FacetValue) return false;
			}
			if (Needle.length === 0) return true;
			return [Row.Label, ...Row.Cells].join(" ").toLowerCase().includes(Needle);
		});
	}, [
		FacetColumn,
		FacetValue,
		Query,
		Rows
	]);
	const Shown = Math.min(Matched.length, Page * PageSize);
	/**
	* Whether the table has been read yet.
	*
	* Before the island hydrates - and for a reader with JS off - the control has
	* no rows to count, so it prints the figure the page measured. A bar that
	* printed `00 OF 13` until a script ran would be stating a fact it does not
	* have, which is the one thing this site does not do.
	*/
	const Live = Rows.length > 0;
	React$1.useEffect(() => {
		const Shell = document.getElementById(Target);
		const Body = Shell?.querySelector("tbody");
		if (!Body) return;
		const Apply = () => {
			const Visible = new Set(Matched.slice(0, Shown));
			for (const Row of Rows) Row.Element.hidden = !Visible.has(Row);
			if (Matched.length === 0 && Rows.length > 0) {
				if (!VoidRef.current) {
					const Void = document.createElement("tr");
					Void.className = "MatrixControl__Void";
					const Cell = document.createElement("td");
					Cell.colSpan = Facets.length + 1;
					Cell.className = "MatrixControl__VoidCell";
					Cell.textContent = `${MatrixCopy.VoidMark}\u2001${MatrixCopy.VoidCell}`;
					Void.append(Cell);
					VoidRef.current = Void;
				}
				if (!VoidRef.current.isConnected) Body.append(VoidRef.current);
			} else if (VoidRef.current?.isConnected) VoidRef.current.remove();
		};
		if (!window.LandMotion?.Sort(Shell, Apply)) Apply();
	}, [
		Facets.length,
		Matched,
		Rows,
		Shown,
		Target
	]);
	const Narrow = React$1.useCallback(() => {
		SetPage(1);
	}, []);
	React$1.useEffect(() => {
		Narrow();
	}, [
		Facet,
		Narrow,
		Query
	]);
	const { State, Meta, Copy, Reset } = useCopyReceipt(React$1.useCallback(() => {
		if (Matched.length === 0) return null;
		const Head = ["", ...Facets.map((FacetColumn) => FacetColumn.Label)];
		const Lines = Matched.slice(0, Shown).map((Row) => [Row.Label, ...Facets.map((FacetColumn) => Row.Cells[Number(FacetColumn.Key)] ?? "")].join("	"));
		return {
			Text: [Head.join("	"), ...Lines].join("\n"),
			Meta: `${Pad(Shown)} ROWS`
		};
	}, [
		Facets,
		Matched,
		Shown
	]));
	React$1.useEffect(() => {
		Reset();
	}, [
		Facet,
		Query,
		Reset
	]);
	/** The note line: one state at a time, in the order a reader needs them. */
	const Note = (() => {
		if (Total === 0 || Rows.length === 0 && Total === 0) return {
			Kind: "empty",
			Mark: MatrixCopy.EmptyMark,
			Line: MatrixCopy.EmptyLine,
			Next: MatrixCopy.EmptyNext
		};
		if (Rows.length > 0 && Matched.length === 0) return {
			Kind: "void",
			Mark: "",
			Line: "",
			Next: ""
		};
		if (Shown < Matched.length) return {
			Kind: "more",
			Mark: "",
			Line: `${Pad(Matched.length - Shown)} ROWS BEYOND THIS PAGE`,
			Next: ""
		};
		if (!Remembered) return {
			Kind: "storage",
			Mark: MatrixCopy.StorageMark,
			Line: MatrixCopy.StorageLine,
			Next: ""
		};
		return {
			Kind: "none",
			Mark: "",
			Line: "",
			Next: ""
		};
	})();
	const Handoff = React$1.useCallback(() => {
		if (typeof window === "undefined") return;
		window.dispatchEvent(new CustomEvent("palette:open", { detail: { query: Query } }));
	}, [Query]);
	return /* @__PURE__ */ jsxs("section", {
		className: "MatrixControl",
		"aria-label": `${Name} control`,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "MatrixControl__Bar",
			children: [
				/* @__PURE__ */ jsxs("p", {
					className: "MatrixControl__Register",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "MatrixControl__Mark",
							"aria-hidden": "true",
							children: "#"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "MatrixControl__Name",
							children: MatrixCopy.Register
						}),
						/* @__PURE__ */ jsx("span", {
							className: "MatrixControl__Rule",
							"aria-hidden": "true",
							children: "/"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "MatrixControl__Count",
							"aria-live": "polite",
							children: Pad(Live ? Shown : Total)
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "MatrixControl__Of",
							children: [
								MatrixCopy.CountOf,
								" ",
								Pad(Live ? Matched.length : Total)
							]
						}),
						/* @__PURE__ */ jsx("span", {
							className: "MatrixControl__RegisterEnd",
							children: Name
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "MatrixControl__Tools",
					children: [/* @__PURE__ */ jsx("div", {
						className: "MatrixControl__Facet",
						children: /* @__PURE__ */ jsxs(Select, {
							value: Facet,
							onValueChange: SetFacet,
							disabled: Rows.length === 0,
							children: [/* @__PURE__ */ jsxs(SelectTrigger, {
								className: "MatrixControl__Trigger",
								"aria-label": "Narrow by a column value",
								children: [/* @__PURE__ */ jsx("span", {
									className: "SlipField__Label",
									"aria-hidden": "true",
									children: MatrixCopy.FacetLabel
								}), /* @__PURE__ */ jsx(SelectValue, {
									placeholder: MatrixCopy.FacetAll,
									children: Facet === All ? MatrixCopy.FacetAll : `${FacetColumn}\u2001${FacetValue}`
								})]
							}), /* @__PURE__ */ jsxs(SelectContent, {
								className: "MatrixControl__Slip",
								children: [/* @__PURE__ */ jsx(SelectItem, {
									value: All,
									mark: "✓",
									meta: `${Facets.length} COL`,
									children: MatrixCopy.FacetAll
								}), Facets.map((Column) => /* @__PURE__ */ jsxs(SelectGroup, { children: [/* @__PURE__ */ jsx(SelectLabel, { children: Column.Label }), [...FacetValues.get(Column.Key) ?? []].map((Value) => /* @__PURE__ */ jsx(SelectItem, {
									value: `${Column.Key}:${Value}`,
									mark: "/",
									meta: Column.Label,
									children: Value
								}, `${Column.Key}:${Value}`))] }, Column.Key))]
							})]
						})
					}), /* @__PURE__ */ jsxs("label", {
						className: "MatrixControl__Box",
						children: [/* @__PURE__ */ jsx("span", {
							className: "SlipField__Label",
							children: MatrixCopy.MatchLabel
						}), /* @__PURE__ */ jsx("input", {
							className: "SlipInput",
							type: "search",
							value: Query,
							placeholder: MatrixCopy.MatchPlaceholder,
							onChange: (Event) => SetQuery(Event.target.value)
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "MatrixControl__State",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "MatrixControl__FieldLabel",
							children: MatrixCopy.DensityLabel
						}),
						/* @__PURE__ */ jsx(Segmented, {
							className: "MatrixControl__Density",
							Items: DensityItems,
							Value: Density,
							OnChange: ChooseDensity,
							Label: "Row density"
						}),
						/* @__PURE__ */ jsx(CopyReceipt, {
							State,
							Meta,
							Label: MatrixCopy.CopyLabel,
							OnCopy: Copy
						})
					]
				})
			]
		}), Note.Kind !== "none" ? /* @__PURE__ */ jsxs("p", {
			className: "MatrixControl__Note",
			"data-kind": Note.Kind,
			children: [
				Note.Mark ? /* @__PURE__ */ jsx("span", {
					className: "MatrixControl__NoteMark",
					"aria-hidden": "true",
					children: "◎"
				}) : null,
				Note.Mark ? /* @__PURE__ */ jsx("span", {
					className: "MatrixControl__NoteWord",
					children: Note.Mark
				}) : null,
				Note.Line ? /* @__PURE__ */ jsx("span", {
					className: "MatrixControl__NoteLine",
					children: Note.Line
				}) : null,
				Note.Kind === "void" ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("button", {
					type: "button",
					className: "SlipAction",
					onClick: () => {
						SetQuery("");
						SetFacet(All);
					},
					children: [
						/* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							children: "↳"
						}),
						" ",
						MatrixCopy.ClearLabel
					]
				}), /* @__PURE__ */ jsxs("button", {
					type: "button",
					className: "SlipAction",
					onClick: Handoff,
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "MarkArrow",
							"data-place": "lead",
							"aria-hidden": "true"
						}),
						" ",
						MatrixCopy.HandoffLabel,
						" ",
						/* @__PURE__ */ jsx(Chord, { children: "⌘K" })
					]
				})] }) : null,
				Note.Kind === "more" ? /* @__PURE__ */ jsxs("button", {
					type: "button",
					className: "SlipAction",
					onClick: () => SetPage((Page) => Page + 1),
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "MarkArrow",
							"data-place": "lead",
							"aria-hidden": "true"
						}),
						" ",
						MatrixCopy.MoreLabel
					]
				}) : null,
				Note.Kind === "empty" ? /* @__PURE__ */ jsx("span", {
					className: "MatrixControl__NoteNext",
					children: Note.Next
				}) : null
			]
		}) : null]
	});
};
// Source/Component/UI/Matrix/MatrixControl.astro
createAstro("https://editor.land");
var $$MatrixControl = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$MatrixControl;
	const { Target, Facets, Name, Total, PageSize } = Astro.props;
	return renderTemplate`${renderComponent($$result, "MatrixControl", MatrixControl, {
		"client:visible": true,
		"Target": Target,
		"Facets": Facets,
		"Name": Name,
		"Total": Total,
		"PageSize": PageSize,
		"client:component-hydration": "visible",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Matrix/MatrixControl.tsx",
		"client:component-export": "MatrixControl"
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Matrix/MatrixControl.astro", void 0);
export { $$MatrixControl as t };
