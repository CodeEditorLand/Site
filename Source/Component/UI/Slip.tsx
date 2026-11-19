"use client";

import * as React from "react";

import { cn } from "./Utility";

/**
 * Slip - the small parts every control surface shares.
 *
 * A menu, a select, the palette, a dialog, a sheet, a drawer, a popover and the
 * rail's filter are one surface with one grammar, so the parts that grammar is
 * made of live here and nowhere else:
 *
 *   SlipRegister  the `# NAME / NN` line a slip opens with, and its path
 *   SlipEmpty     the adverse state: `◎` what is not here, `↳` what to do
 *   SlipLoading   the same head, counting `LOADING`, over three ruled rows
 *   SlipError     `STATUS: INTERRUPTED`, the cause, the next step, the retry
 *   SlipNote      the `↳` proposition a panel carries under its head
 *   SlipFoot      the keyboard path, stated once for every slip that has one
 *   SlipAction    the way out of a state, drawn as a row rather than a button
 *   Chord         `〈⌘K〉` - a literal input in the grammar's containment mark
 *   Segmented     three cells on one track - the scope control
 *
 * They are presentational and they are dumb: no state, no effects, no knowledge
 * of what they sit in. The behaviour belongs to the primitive (Radix or cmdk)
 * and the surface belongs to `Stylesheet/System/UI/`.
 *
 * ─── WHY THE ADVERSE ARMS ARE HERE AND NOT IN EACH COMPONENT ────────────────
 *
 * `DESIGN-COMPLETE.md` §4.2 asks a block to render props and nothing else; the
 * brief's §7 asks every surface for its second design. An overlay's second
 * design is what it looks like when the rows have not arrived, when the query
 * found nothing, and when the action it opened for failed. Those three are one
 * composition each, and they are the same composition in a menu, a dialog and
 * the palette - so they are stated once, here, and every slip in the family
 * hands them in. A slip that grew its own error box would be a second grammar
 * for the same sentence.
 */

/**
 * The register line a slip opens with: `# LOCALE / 05`.
 *
 * ─── THE COUNT IS A FIGURE, OR THE WORD THAT STANDS IN FOR ONE ─────────────
 *
 * §4.1 of the brief: a count that cannot be known prints `UNAVAILABLE`, never
 * `0`, never a guess. A slip whose rows are still arriving cannot know its
 * count, and a slip that printed `00` while loading would be telling the reader
 * the set is empty - which is a different, and false, statement. So the cell
 * takes either the figure or the STATUS word that replaces it, and `State` is
 * that replacement.
 */
export interface SlipHead {
	/** The slip's `/` category, uppercase - `LOCALE`, `ACCOUNT`, `FIND`. */
	Name: string;

	/** How many rows the slip holds. Printed in two digits, zero-padded. */
	Count?: number;

	/**
	 * The path this slip sits on, outermost first - the depth a submenu is at.
	 *
	 * A menu three deep is three identical boxes unless something says which
	 * route the reader took to get here. The grammar already has the mark for
	 * it: `↳` is *relation*, and `# RECORD ↳ SOURCE ↳ LINE / 02` is the same
	 * sentence a record's own sub-line prints. Depth is then a fact about the
	 * path rather than a decoration on the box.
	 */
	Trail?: readonly string[];

	/**
	 * The count cannot be a figure yet. `LOADING` while the rows are arriving,
	 * `UNAVAILABLE` when they will never be known. The head prints the word in
	 * the count's cell, so the line stays one line and one register.
	 */
	State?: "LOADING" | "UNAVAILABLE" | "INTERRUPTED";
}

/**
 * The register line. `aria-hidden` on purpose: the same information reaches a
 * screen reader through the surface's own `aria-label`, and a `role="menu"` may
 * not carry loose text children. The count is a fact about the slip, not an
 * announcement to make every time the list changes.
 */
export const SlipRegister = ({
	head,
	className,
	children,
}: {
	head: SlipHead;

	className?: string;

	/** Trailing content in the same line - the palette's scope control. */
	children?: React.ReactNode;
}) => (
	<div className={cn("Slip__Head", className)} aria-hidden="true">
		<span className="Slip__Mark">#</span>
		<span className="Slip__Name">{head.Name}</span>

		{(head.Trail ?? []).map((Step, Index) => (
			<React.Fragment key={`${Step}-${Index}`}>
				<span className="Slip__TrailMark">↳</span>
				<span className="Slip__Trail">{Step}</span>
			</React.Fragment>
		))}

		<span className="Slip__Rule">/</span>

		{head.State === undefined ? (
			<span className="Slip__Count">
				{String(head.Count ?? 0).padStart(2, "0")}
			</span>
		) : (
			<span
				className="Slip__Count Slip__Count--state"
				data-state={head.State}
			>
				{head.State}
			</span>
		)}

		{children}
	</div>
);

/**
 * The empty state. Three lines and no illustration: the mark says *nothing is
 * here* in the grammar's fallback glyph, the second line says what would have
 * been here, and the third says what to do about it - which is the difference
 * between an empty list and a dead end.
 */
export const SlipEmpty = ({
	Mark = "NO RECORD",
	Line,
	children,
	className,
}: {
	/** What is missing, uppercase - `NO RECORD`, `NO PAGE`, `NO MATCH`. */
	Mark?: string;

	Line: string;

	children?: React.ReactNode;

	className?: string;
}) => (
	<div className={cn("Slip__Empty", className)}>
		<p className="Slip__EmptyMark">
			<b aria-hidden="true">◎</b>
			<span>{Mark}</span>
		</p>
		<p className="Slip__EmptyLine">
			<span aria-hidden="true">↳</span>
			<span>{Line}</span>
		</p>
		{children}
	</div>
);

/**
 * The loading state: the slip's own head counting `LOADING`, over ruled rows.
 *
 * ─── NO SPINNER WHERE A SKELETON WOULD DO ──────────────────────────────────
 *
 * The brief is exact: *no spinner where a skeleton would do; the skeleton is
 * drawn in the record grammar.* So the skeleton is not grey pills - it is the
 * row rhythm the loaded slip will have, at the same `2rem` pitch, with the mark
 * column and the meta column reserved and empty. The block that arrives fills
 * exactly the space the skeleton held, which is the whole reason to draw it:
 * the slip does not jump when the rows land.
 *
 * `Rows` is a count of rows to hold open, not a figure the slip claims. It is
 * `aria-hidden` and the surface carries `aria-busy`, so a screen reader is told
 * the one true thing - that this region is working - instead of being read
 * three empty rows.
 */
export const SlipLoading = ({
	Rows = 3,
	Line = "THE ROWS HAVE NOT ARRIVED",
	className,
}: {
	Rows?: number;

	Line?: string;

	className?: string;
}) => (
	<div className={cn("Slip__Loading", className)} aria-hidden="true">
		{Array.from({ length: Math.max(1, Rows) }, (_, Index) => (
			<p className="Slip__Skeleton" key={Index}>
				<span className="Slip__SkeletonMark">#</span>
				<span
					className="Slip__SkeletonBar"
					style={
						{
							inlineSize: `${[92, 74, 84, 61, 88][Index % 5]}%`,
						} as React.CSSProperties
					}
				/>
				<span className="Slip__SkeletonMeta" />
			</p>
		))}

		<p className="Slip__EmptyLine">
			<span aria-hidden="true">↳</span>
			<span>{Line}</span>
		</p>
	</div>
);

/**
 * The error state: `STATUS: INTERRUPTED`, the cause, the next step, the retry.
 *
 * The vocabulary is §1.5's and it is fixed - `INTERRUPTED` is the word for an
 * action that was cut off, and it takes ink. The three field labels are the
 * record's own (`CAUSE:`, `NEXT:`), so a failed action inside a slip reads as a
 * record with a bad line rather than as a browser alert. The retry is a
 * `SlipAction` - the same row the palette's empty state uses for its way out -
 * because an action that arrived with the error must not look like a new kind
 * of object.
 */
export const SlipError = ({
	Mark = "INTERRUPTED",
	Line,
	Cause,
	Next,
	OnRetry,
	Retry = "TRY AGAIN",
	className,
}: {
	/** The STATUS word. `INTERRUPTED` is the default and the honest one. */
	Mark?: "INTERRUPTED" | "UNAVAILABLE";

	/** One line saying what failed, in the document's voice. */
	Line: string;

	/** Why - the cause, as a fact. */
	Cause?: string;

	/** What to do about it. */
	Next?: string;

	OnRetry?: (() => void) | undefined;

	Retry?: string;

	className?: string;
}) => (
	<div className={cn("Slip__Error", className)} role="alert">
		<p className="Slip__EmptyMark">
			<b aria-hidden="true">◎</b>
			<span>STATUS:</span>
			<span className="Slip__ErrorMark">{Mark}</span>
		</p>

		<p className="Slip__EmptyLine">
			<span aria-hidden="true">↳</span>
			<span>{Line}</span>
		</p>

		{Cause === undefined ? null : (
			<p className="Slip__ErrorRow">
				<span className="Slip__ErrorKey">CAUSE:</span>
				<span className="Slip__ErrorValue">{Cause}</span>
			</p>
		)}

		{Next === undefined ? null : (
			<p className="Slip__ErrorRow">
				<span className="Slip__ErrorKey">NEXT:</span>
				<span className="Slip__ErrorValue">{Next}</span>
			</p>
		)}

		{OnRetry === undefined ? null : (
			<SlipAction Mark="→" OnSelect={OnRetry}>
				{Retry}
			</SlipAction>
		)}
	</div>
);

/**
 * The `↳` proposition: the one line a panel says about itself.
 *
 * A popover that holds a figure needs a sentence saying what the figure is, and
 * that sentence is the same mark every record uses for its proposition. It is
 * here rather than in each panel so the indent, the mark's ink and the measure
 * are one decision.
 */
export const SlipNote = ({
	children,
	className,
}: {
	children: React.ReactNode;

	className?: string;
}) => (
	<p className={cn("Slip__Note", className)}>
		<span className="Slip__NoteMark" aria-hidden="true">
			↳
		</span>
		<span className="Slip__NoteBody">{children}</span>
	</p>
);

/** One item of a slip's foot: a chord and what it does. */
export interface SlipFootItem {
	/** The literal key or keys - `↑↓`, `ENTER`, `ESC`. */
	readonly Chord: string;

	/** What it does, uppercase - `MOVE`, `OPEN`, `CLOSE`. */
	readonly Label: string;
}

/**
 * The foot: the slip's keyboard path, stated in the grammar's own caps.
 *
 * It was the palette's private device and it is the family's now, because the
 * claim it makes - *this control can be driven from the keyboard, and here is
 * how* - is either true of every slip or it is true of one. The order is the
 * grammar's: what moves, what opens, what closes.
 */
export const SlipFoot = ({
	Items,
	End,
	className,
}: {
	Items: readonly SlipFootItem[];

	/** The far end of the line - the door's chord, a count, a source. */
	End?: React.ReactNode;

	className?: string;
}) => (
	<div className={cn("Slip__Foot", className)}>
		{Items.map((Item) => (
			<span
				className="Slip__FootItem"
				key={`${Item.Chord}-${Item.Label}`}
			>
				<Chord>{Item.Chord}</Chord>
				<span>{Item.Label}</span>
			</span>
		))}

		{End === undefined ? null : (
			<span className="Slip__FootItem Slip__FootEnd">{End}</span>
		)}
	</div>
);

/**
 * The way out of a state, drawn as a row rather than as a button.
 *
 * A mark and a label, no fill, no frame. Used by the palette's empty state, by
 * a failed slip's retry, and by the matrix band's note line, so a reader who
 * learns the gesture in one control recognises it in the other. It is a real
 * `<button>`; the class is the only thing that makes it a row.
 */
export const SlipAction = ({
	children,
	Mark,
	OnSelect,
	className,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
	/** The leading glyph. `→` acts, `/` navigates. */
	Mark?: string;

	OnSelect?: () => void;
}) => (
	<button
		type="button"
		className={cn("SlipAction", className)}
		onClick={OnSelect}
		{...props}
	>
		{Mark === undefined ? null : <span aria-hidden="true">{Mark}</span>}
		<span>{children}</span>
	</button>
);

/**
 * A key chord in the grammar's containment mark.
 *
 * `〈 〉` is the record grammar's bracket for *a literal* - `〈RUST + TAURI〉`,
 * `〈MACOS / AARCH64〉` - and the characters a reader presses are exactly that. The
 * bracket is not a new mark; using it for a chord is using the mark for the thing
 * it was always for. A chord printed anywhere that does not listen for the key is
 * decoration, and a decoration that claims a key is a lie.
 */
export const Chord = ({
	children,
	Ink = false,
	className,
}: {
	children: React.ReactNode;

	/** Draw the whole cap in ink - for the trigger, where the chord is the control. */
	Ink?: boolean;

	className?: string;
}) => (
	<span className={cn("Chord", Ink && "Chord--ink", className)}>
		<span className="Chord__Bracket" aria-hidden="true">
			〈
		</span>
		<span className="Chord__Key">{children}</span>
		<span className="Chord__Bracket" aria-hidden="true">
			〉
		</span>
	</span>
);

/**
 * The scope control: one true value out of three, so it is a radio group and not
 * a row of buttons. Arrow keys move between cells, which is what a reader who has
 * just tabbed into a radio group expects; the roving tabindex is the group's, not
 * each cell's.
 */
export const Segmented = <Value extends string>({
	Items,
	Value,
	OnChange,
	Label,
	className,
}: {
	Items: readonly { Value: Value; Label: string }[];

	Value: Value;

	OnChange: (Next: Value) => void;

	Label: string;

	className?: string;
}) => {
	const Refs = React.useRef<(HTMLButtonElement | null)[]>([]);

	const Move = (From: number, Delta: number) => {
		const Next = (From + Delta + Items.length) % Items.length;

		const Target = Items[Next];

		if (!Target) return;

		OnChange(Target.Value);

		Refs.current[Next]?.focus();
	};

	return (
		<div
			role="radiogroup"
			aria-label={Label}
			className={cn("Segmented", className)}
			onKeyDown={(Event) => {
				const From = Items.findIndex((Item) => Item.Value === Value);

				if (Event.key === "ArrowRight" || Event.key === "ArrowDown") {
					Event.preventDefault();

					Move(From, 1);
				}

				if (Event.key === "ArrowLeft" || Event.key === "ArrowUp") {
					Event.preventDefault();

					Move(From, -1);
				}
			}}
		>
			{Items.map((Item, Index) => {
				const Checked = Item.Value === Value;

				return (
					<button
						key={Item.Value}
						ref={(Node) => {
							Refs.current[Index] = Node;
						}}
						type="button"
						role="radio"
						aria-checked={Checked}
						tabIndex={Checked ? 0 : -1}
						className="Segmented__Cell"
						onClick={() => OnChange(Item.Value)}
					>
						{Item.Label}
					</button>
				);
			})}
		</div>
	);
};
