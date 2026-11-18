"use client";

import * as React from "react";

import { cn } from "./Utility";

/**
 * Slip - the small parts every control surface shares.
 *
 * A menu, a select, the palette and the rail's filter are one surface with one
 * grammar, so the four things that grammar is made of live here and nowhere else:
 *
 *   SlipRegister  the `# NAME / NN` line a slip opens with
 *   SlipEmpty     the adverse state: `◎` what is not here, `↳` what to do
 *   Chord         `〈⌘K〉` - a literal input in the grammar's containment mark
 *   Segmented     three cells on one track - the scope control
 *
 * They are presentational and they are dumb: no state, no effects, no knowledge
 * of what they sit in. The behaviour belongs to the primitive (Radix or cmdk) and
 * the surface belongs to `Stylesheet/System/UI/`.
 */

/** The register line a slip opens with: `# LOCALE / 05`. */
export interface SlipHead {
	/** The slip's `/` category, uppercase - `LOCALE`, `ACCOUNT`, `FIND`. */
	Name: string;

	/** How many rows the slip holds. Printed in two digits, zero-padded. */
	Count?: number;
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
		<span className="Slip__Rule">/</span>
		<span className="Slip__Count">
			{String(head.Count ?? 0).padStart(2, "0")}
		</span>
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
