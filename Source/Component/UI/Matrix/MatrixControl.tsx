"use client";

import * as React from "react";

import { Chord, Segmented } from "../Slip";

import { CopyReceipt, useCopyReceipt } from "../Copy/Copy";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../Select";

import { DensityItems, DensityKey, MatrixCopy, Pad } from "./Data";

import type { MatrixDensity, MatrixFacet, MatrixRow } from "./Type";

/**
 * MatrixControl - the band above a matrix that narrows it, re-weighs it and
 * takes it away.
 *
 * ─── WHY IT ADOPTS THE TABLE INSTEAD OF RENDERING IT ───────────────────────
 *
 * `RecordMatrix` is a printed table: no script, no hydration, and its cells are
 * values rather than data the block exposes. The alternative to adopting it was
 * a second matrix rendered by this island - which would be two tables in the DOM
 * (one for a reader with JS, one without), two chances for them to disagree, and
 * a block that would have to learn to be a component. So the control reads the
 * table it was given, once, on mount: the row labels and the cells. The columns
 * come from the `Facets` prop, not from the head row. Everything it can do
 * afterwards is `hidden` on a `<tr>`, plus one composed row for the void.
 *
 * The consequence is stated plainly: with JS off the control is still a bar with
 * its own register line and the table is complete - the bar's count reads the
 * total the page handed it, the facet field is inert, and nothing is hidden. A
 * control that removes content when the script fails is not a control.
 *
 * ─── THE FACET IS A (COLUMN, VALUE) PAIR, AND IT IS ONE FIELD ──────────────
 *
 * A matrix has N columns and each holds a handful of values; two selects - one
 * for the column, one for the value - would be two controls for one idea, and
 * the second would be empty until the first was answered. The slip lists the
 * values under the column they came from, in the kit's own groups, and the
 * field's value is the chosen column and the value it carries with `␁` between
 * them, so a reader who has used a menu knows the shape.
 *
 * ─── DENSITY IS A ROOT ATTRIBUTE ──────────────────────────────────────────
 *
 * `compact` is not a modifier on one matrix: a reader who wants tighter rows
 * wants them on every matrix, ledger and archive of the document. The switch
 * writes `data-density` on `<html>`, and `Stylesheet/System/UI/_Matrix.scss`
 * answers it. The type never changes - only the block padding of a row - because
 * density is rhythm and size is the identity's.
 *
 * ─── THE FOUR ADVERSE STATES ARE COMPOSED, NOT APOLOGISED FOR ─────────────
 *
 *   empty   `◎ NO ROW` - the table has no rows at all; says what would be here
 *   void    `◎ NO ROW MATCHES` - the reader's own filter; the table prints the
 *           mark in a row of its own and the bar carries only the two ways out,
 *           the clear and the handoff to the palette with the reader's words
 *   too much a page of 24 with `→ SHOW MORE` and `24 OF 38` in the register,
 *           plus `14 ROWS BEYOND THIS PAGE` in the note line, so a list of two
 *           hundred still reads as a list
 *   denied  `◎ NOT REMEMBERED` - the browser refused storage, so the density
 *           holds for this visit and the bar says so rather than pretending
 *
 * A filter that finds nothing hands off to the global index (`palette:open` with
 * the reader's words), which is the same contract the documentation rail uses.
 */

interface MatrixControlProps {
	/** The id of the matrix shell this control drives. */
	Target: string;

	/** The columns a reader may narrow by, in the matrix's own order. */
	Facets: readonly MatrixFacet[];

	/** The matrix's own name, printed at the register line's end. */
	Name: string;

	/** How many rows the matrix has, counted on the server. */
	Total: number;

	/** How many rows a page holds before the step control appears. */
	PageSize?: number;
}

/** The facet field's sentinel: no column, no value. */
const All = "all";

const ReadRows = (Target: string): MatrixRow[] => {
	const Shell = document.getElementById(Target);

	const Body = Shell?.querySelector("tbody");

	if (!Body) return [];

	return [...Body.querySelectorAll("tr")]
		.filter((Row) => !Row.classList.contains("MatrixControl__Void"))
		.map((Row) => {
			const Label = Row.querySelector("th");

			const Cells = [...Row.querySelectorAll("td")].map(
				(Cell) => Cell.textContent?.trim() ?? "",
			);

			return {
				Element: Row as HTMLTableRowElement,
				Label: Label?.textContent?.trim() ?? "",
				Cells,
			};
		});
};

const MatrixControl = ({
	Target,
	Facets,
	Name,
	Total,
	PageSize = 24,
}: MatrixControlProps) => {
	const [Query, SetQuery] = React.useState("");

	const [Facet, SetFacet] = React.useState<string>(All);

	const [Density, SetDensity] = React.useState<MatrixDensity>("comfortable");

	const [Rows, SetRows] = React.useState<MatrixRow[]>([]);

	const [Page, SetPage] = React.useState(1);

	const [Remembered, SetRemembered] = React.useState(true);

	/** The void row, created once and re-used, so it cannot accumulate. */
	const VoidRef = React.useRef<HTMLTableRowElement | null>(null);

	// ── the table, read once ────────────────────────────────────────────────
	React.useEffect(() => {
		SetRows(ReadRows(Target));
	}, [Target]);

	// ── density, remembered ────────────────────────────────────────────────
	React.useEffect(() => {
		let Stored: string | null = null;

		try {
			Stored = window.localStorage.getItem(DensityKey);
		} catch {
			SetRemembered(false);
		}

		const Next: MatrixDensity =
			Stored === "compact" ? "compact" : "comfortable";

		SetDensity(Next);

		document.documentElement.dataset["density"] = Next;
	}, []);

	const ChooseDensity = React.useCallback((Next: MatrixDensity) => {
		SetDensity(Next);

		document.documentElement.dataset["density"] = Next;

		try {
			window.localStorage.setItem(DensityKey, Next);

			SetRemembered(true);
		} catch {
			SetRemembered(false);
		}
	}, []);

	// ── the facet's own values, from the rows ──────────────────────────────
	const FacetValues = React.useMemo(() => {
		const Groups = new Map<string, Set<string>>();

		for (const FacetColumn of Facets) {
			const Index = Number(FacetColumn.Key);

			const Values = new Set<string>();

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

	// ── matching ───────────────────────────────────────────────────────────
	const Matched = React.useMemo(() => {
		const Needle = Query.trim().toLowerCase();

		const Column = FacetColumn === All ? null : Number(FacetColumn);

		return Rows.filter((Row) => {
			if (Column !== null) {
				const Cell = Row.Cells[Column]?.trim() ?? "";

				const Value = Cell.length > 0 ? Cell : MatrixCopy.Unavailable;

				if (Value !== FacetValue) return false;
			}

			if (Needle.length === 0) return true;

			const Haystack = [Row.Label, ...Row.Cells].join(" ").toLowerCase();

			return Haystack.includes(Needle);
		});
	}, [FacetColumn, FacetValue, Query, Rows]);

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

	// ── apply: hide what is not shown, compose the void row ────────────────
	React.useEffect(() => {
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
			} else if (VoidRef.current?.isConnected) {
				VoidRef.current.remove();
			}
		};

		/*
		 * The rows are hidden imperatively, so the DOM still holds the previous
		 * order when this effect runs - which is exactly what a view transition
		 * needs. `Script/Motion/Sort.ts` wraps this mutation when the browser
		 * supports it and refuses (returning false) when it does not, when the
		 * reader asked for less motion, before the reader's first gesture, past
		 * sixty named rows, or on the mount pass - in every one of those cases
		 * the rows are applied directly, in one frame.
		 *
		 * Read through a local cast rather than an import: the bridge is installed
		 * by `Script/Motion/Index.ts` and a control that shipped its own copy of
		 * the transition module would bundle it twice.
		 */
		const Bridge = (
			window as Window & {
				LandMotion?: {
					Sort: (
						Shell: HTMLElement | null,

						Mutate: () => void,
					) => boolean;
				};
			}
		).LandMotion;

		if (!Bridge?.Sort(Shell, Apply)) Apply();
	}, [Facets.length, Matched, Rows, Shown, Target]);

	// A new question is a new page, and a new payload for the copy control.
	const Narrow = React.useCallback(() => {
		SetPage(1);
	}, []);

	React.useEffect(() => {
		Narrow();
	}, [Facet, Narrow, Query]);

	const { State, Meta, Copy, Reset } = useCopyReceipt(
		React.useCallback(() => {
			if (Matched.length === 0) return null;

			const Head = [
				"",
				...Facets.map((FacetColumn) => FacetColumn.Label),
			];

			const Lines = Matched.slice(0, Shown).map((Row) =>
				[
					Row.Label,
					...Facets.map(
						(FacetColumn) =>
							Row.Cells[Number(FacetColumn.Key)] ?? "",
					),
				].join("	"),
			);

			return {
				Text: [Head.join("\t"), ...Lines].join("\n"),
				Meta: `${Pad(Shown)} ROWS`,
			};
		}, [Facets, Matched, Shown]),
	);

	// A standing receipt describes a payload that no longer exists once the
	// filter moves, so the filter resets it. That is the contact form's lesson
	// applied to a control: a receipt outlives its subject is a receipt that lies.
	React.useEffect(() => {
		Reset();
	}, [Facet, Query, Reset]);

	/** The note line: one state at a time, in the order a reader needs them. */
	const Note = (() => {
		if (Total === 0 || (Rows.length === 0 && Total === 0))
			return {
				Kind: "empty",
				Mark: MatrixCopy.EmptyMark,
				Line: MatrixCopy.EmptyLine,
				Next: MatrixCopy.EmptyNext,
			};

		// The table prints its own void row; the bar carries only the way out, so
		// the same sentence is never printed twice in one band.
		if (Rows.length > 0 && Matched.length === 0)
			return { Kind: "void", Mark: "", Line: "", Next: "" };

		if (Shown < Matched.length)
			return {
				Kind: "more",
				Mark: "",
				Line: `${Pad(Matched.length - Shown)} ROWS BEYOND THIS PAGE`,
				Next: "",
			};

		if (!Remembered)
			return {
				Kind: "storage",
				Mark: MatrixCopy.StorageMark,
				Line: MatrixCopy.StorageLine,
				Next: "",
			};

		return { Kind: "none", Mark: "", Line: "", Next: "" };
	})();

	const Handoff = React.useCallback(() => {
		if (typeof window === "undefined") return;

		window.dispatchEvent(
			new CustomEvent("palette:open", { detail: { query: Query } }),
		);
	}, [Query]);

	return (
		<section className="MatrixControl" aria-label={`${Name} control`}>
			<div className="MatrixControl__Bar">
				<p className="MatrixControl__Register">
					<span className="MatrixControl__Mark" aria-hidden="true">
						#
					</span>
					<span className="MatrixControl__Name">
						{MatrixCopy.Register}
					</span>
					<span className="MatrixControl__Rule" aria-hidden="true">
						/
					</span>
					<span className="MatrixControl__Count" aria-live="polite">
						{Pad(Live ? Shown : Total)}
					</span>
					<span className="MatrixControl__Of">
						{MatrixCopy.CountOf}{" "}
						{Pad(Live ? Matched.length : Total)}
					</span>
					<span className="MatrixControl__RegisterEnd">{Name}</span>
				</p>

				<div className="MatrixControl__Tools">
					<div className="MatrixControl__Facet">
						<Select
							value={Facet}
							onValueChange={SetFacet}
							disabled={Rows.length === 0}
						>
							<SelectTrigger
								className="MatrixControl__Trigger"
								aria-label="Narrow by a column value"
							>
								<span
									className="SlipField__Label"
									aria-hidden="true"
								>
									{MatrixCopy.FacetLabel}
								</span>
								<SelectValue placeholder={MatrixCopy.FacetAll}>
									{Facet === All
										? MatrixCopy.FacetAll
										: `${FacetColumn}\u2001${FacetValue}`}
								</SelectValue>
							</SelectTrigger>

							<SelectContent className="MatrixControl__Slip">
								<SelectItem
									value={All}
									mark="✓"
									meta={`${Facets.length} COL`}
								>
									{MatrixCopy.FacetAll}
								</SelectItem>

								{Facets.map((Column) => (
									<SelectGroup key={Column.Key}>
										<SelectLabel>
											{Column.Label}
										</SelectLabel>

										{[
											...(FacetValues.get(Column.Key) ??
												[]),
										].map((Value) => (
											<SelectItem
												key={`${Column.Key}:${Value}`}
												value={`${Column.Key}:${Value}`}
												mark="/"
												meta={Column.Label}
											>
												{Value}
											</SelectItem>
										))}
									</SelectGroup>
								))}
							</SelectContent>
						</Select>
					</div>

					<label className="MatrixControl__Box">
						<span className="SlipField__Label">
							{MatrixCopy.MatchLabel}
						</span>
						<input
							className="SlipInput"
							type="search"
							value={Query}
							placeholder={MatrixCopy.MatchPlaceholder}
							onChange={(Event) => SetQuery(Event.target.value)}
						/>
					</label>
				</div>

				<div className="MatrixControl__State">
					<span className="MatrixControl__FieldLabel">
						{MatrixCopy.DensityLabel}
					</span>

					<Segmented
						className="MatrixControl__Density"
						Items={DensityItems}
						Value={Density}
						OnChange={ChooseDensity}
						Label="Row density"
					/>

					<CopyReceipt
						State={State}
						Meta={Meta}
						Label={MatrixCopy.CopyLabel}
						OnCopy={Copy}
					/>
				</div>
			</div>

			{Note.Kind !== "none" ? (
				<p className="MatrixControl__Note" data-kind={Note.Kind}>
					{Note.Mark ? (
						<span
							className="MatrixControl__NoteMark"
							aria-hidden="true"
						>
							◎
						</span>
					) : null}

					{Note.Mark ? (
						<span className="MatrixControl__NoteWord">
							{Note.Mark}
						</span>
					) : null}

					{Note.Line ? (
						<span className="MatrixControl__NoteLine">
							{Note.Line}
						</span>
					) : null}

					{Note.Kind === "void" ? (
						<>
							<button
								type="button"
								className="SlipAction"
								onClick={() => {
									SetQuery("");

									SetFacet(All);
								}}
							>
								<span
									className="MarkRelation"
									aria-hidden="true"
								/>
								{MatrixCopy.ClearLabel}
							</button>

							<button
								type="button"
								className="SlipAction"
								onClick={Handoff}
							>
								<span
									className="MarkArrow"
									data-place="lead"
									aria-hidden="true"
								/>{" "}
								{MatrixCopy.HandoffLabel} <Chord>⌘K</Chord>
							</button>
						</>
					) : null}

					{Note.Kind === "more" ? (
						<button
							type="button"
							className="SlipAction"
							onClick={() => SetPage((Page) => Page + 1)}
						>
							<span
								className="MarkArrow"
								data-place="lead"
								aria-hidden="true"
							/>{" "}
							{MatrixCopy.MoreLabel}
						</button>
					) : null}

					{Note.Kind === "empty" ? (
						<span className="MatrixControl__NoteNext">
							{Note.Next}
						</span>
					) : null}
				</p>
			) : null}
		</section>
	);
};

export { MatrixControl };

export default MatrixControl;
