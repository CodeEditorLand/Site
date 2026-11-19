import * as React from "react";

import { Slot } from "@radix-ui/react-slot";

import { cn } from "./Utility";

/**
 * Field - one value, as one instrument: the name, the box, the sentences, the
 * figure, and the one thing to do with it.
 *
 * ─── WHY THIS COMPONENT EXISTS ────────────────────────────────────────────
 * One field, once. `Source/Component/UI/` carries the primitives and no field, so
 * every surface that needs a labelled control would rebuild the same six parts by
 * hand - and the surfaces that do (the contact form, the account screens, the
 * specimen plate) disagree about all six: one puts the label under the input, one
 * prints a hint and an error in the same slot, one counts nothing, and none of
 * them can state `READ-ONLY` anywhere a reader would look for it.
 *
 * So the anatomy lives here once. The component owns the name, the register, the
 * box, the sentences, the count and the action; the primitive it wraps owns only
 * its own value and its own behaviour. That split is what makes the ten
 * primitives one family instead of ten controls in a column.
 *
 * ─── THE CONTROL STAYS THE SOURCE OF TRUTH ────────────────────────────────
 * The field does not take `disabled`, `readOnly` and `value` twice. It reads
 * them from the control it is given - a `<Input disabled>`, a `<Checkbox
 * checked>` - and mirrors them onto the box, the label and the register. A prop
 * passed to the field explicitly wins, so a caller can declare a state the
 * control cannot express (the printed `focus` arm) without lying about the
 * control. One fact, one place; the box cannot disagree with the input because
 * it is reading the input.
 *
 * ─── THE COUNTER IS DERIVED, NOT SUPPLIED ─────────────────────────────────
 * `Limit` is the only figure a caller gives. The count is read from the value the
 * control declares - `value` or `defaultValue` - and only from the caller's
 * `Value` when the control declares none, so a field cannot print `12 / 64` over
 * a box holding forty characters. `Measure` decides what the figure is: `length`
 * counts the characters of the value (a text field), `value` counts the value
 * itself (a slider). On a controlled control the count follows the render that
 * carries the new value; on an uncontrolled one it is the declared value's
 * length, which is the honest thing a server-rendered field can know.
 *
 * ─── WHAT THE FIELD ADDS TO THE STATE LAYER ───────────────────────────────
 * `State/_Field.scss` owns rest, hover, focus, invalid, disabled and read-only
 * for the bare primitives. It cannot own four things a form needs:
 *
 *   valid     a value that passed - a mark and a sentence in ink, never green
 *   counter   a limit the reader can see coming, and a count that turns at it
 *   partial   the value arrived and the fact that would confirm it did not
 *   loading   the schema printed and the answer barred, in the record grammar
 *
 * and it cannot own `focus` in a document that has no cursor. The block declares
 * its one state as `data-state` - `valid`, `loading` and `focus` among the seven
 * values - and the counter's turn is its own pair of attributes: `data-over` when
 * the figure is past `Limit`, `data-near` at ninety per cent of it. `partial` is
 * a class on the sentence in the foot, not a block state, because the value did
 * arrive. Together they are the same vocabulary the state layer speaks, and the
 * reason a specimen sheet can print a focus ring.
 *
 * ─── NO WRAPPER, NO SECOND SURFACE ────────────────────────────────────────
 * The field draws one box. A caller that wants a field on a white insert passes
 * `OnCard`, which sets `--field-fill: transparent` - a property, not a repaint -
 * so the hairline is the only thing separating the control from the card it is
 * printed on. A card inside a card is never the answer.
 */

/** The state the block declares. `ResolveState` picks one, first match wins:
 * `loading`, `disabled`, `readonly`, `invalid`, `valid`, `focus`, `rest`. */
export type FieldState =
	| "rest"
	| "focus"
	| "valid"
	| "invalid"
	| "loading"
	| "disabled"
	| "readonly";

export interface FieldProps {
	/** The control's id. The label points at it and the sentences hang off it. */
	Id: string;

	/** The field's name, as printed. Never shortened, never re-cased. */
	Label: string;

	/** The format, before the reader gets it wrong. */
	Hint?: string | undefined;

	/** The refusal. Its presence is what makes the field invalid. */
	Error?: string | undefined;

	/** The confirmation. Its presence is what makes the field valid. */
	Valid?: string | undefined;

	/** The fact that did not arrive, printed under the value that did. */
	Partial?: string | undefined;

	/** The limit the counter counts against. */
	Limit?: number | undefined;

	/**
	 * What the counter counts: the value's LENGTH against a character limit (a
	 * text field), or the VALUE itself against a maximum (a slider). Two modes,
	 * one figure - and the distinction is real, because `170 / 240` counts
	 * characters and `18 / 24` counts the value, and a component that guessed
	 * would print one of them wrong.
	 */
	Measure?: "length" | "value" | undefined;

	/**
	 * The value the counter counts, when the control does not declare one.
	 * A control's own `value`/`defaultValue` is read first.
	 */
	Value?: string | number | undefined;

	/** The required marker and `aria-required`. */
	Required?: boolean | undefined;

	/** The field cannot be edited. Read from the control when not given. */
	Disabled?: boolean | undefined;

	/** The value may be quoted and may not be changed. */
	ReadOnly?: boolean | undefined;

	/** The dense interval: a settings list rather than a form. */
	Dense?: boolean | undefined;

	/** The value has not arrived: the skeleton replaces the control. */
	Loading?: boolean | undefined;

	/**
	 * A declared state the document cannot otherwise produce. `focus` is the one
	 * arm a printed sheet needs; a live field draws its ring from
	 * `:focus-visible` on the control (`:has()`, so a click does not ring it) and
	 * never writes this value itself.
	 */
	State?: "focus" | undefined;

	/** A segment before the value: a currency, a scheme, a country code. */
	Prefix?: React.ReactNode;

	/** A segment after the value: a unit, a domain, a keyboard hint. */
	Suffix?: React.ReactNode;

	/** The one thing to do with the value (`VERIFY`, `COPY`, `RESEND`). */
	Action?: React.ReactNode;

	/** The one link that belongs to the name (`FORGOT?`, `PASTE`). */
	HeadAction?: React.ReactNode;

	/** An extra word in the field's register, beside `READ-ONLY` and the counter. */
	Meta?: string | undefined;

	/** The field on a white insert: the hairline alone, no second fill. */
	OnCard?: boolean | undefined;

	/** Classes from the caller, appended to the block. */
	ClassName?: string | undefined;

	/** Exactly one control. The field wires the id and the descriptions onto it. */
	children: React.ReactNode;
}

/** The props a control element may carry, read without a cast at the call site. */
interface ControlProps {
	readonly value?: unknown;

	readonly defaultValue?: unknown;

	readonly disabled?: unknown;

	readonly readOnly?: unknown;
}

/**
 * The figure the counter counts.
 *
 * The control's declared value first, then the caller's `Value`. A slider's
 * value is an array, so a one-element array is unwrapped rather than ignored -
 * the alternative is a slider that counts its own thumb as nothing.
 *
 * `Measure` decides what the figure means: `length` counts the characters of the
 * value (a text field against its limit), `value` counts the value itself (a
 * slider against its maximum). A number counts its own digits in `length` mode,
 * because a number in a text field is still typed as characters.
 */
const CountedFigure = (
	Child: React.ReactNode,

	Value: string | number | undefined,

	Measure: "length" | "value",
): number => {
	const Declared = React.isValidElement(Child)
		? (Child.props as ControlProps)
		: undefined;

	const Raw = Declared?.value ?? Declared?.defaultValue ?? Value;

	const Single = Array.isArray(Raw) ? Raw[0] : Raw;

	if (Measure === "value") {
		const Figure = Number(Single);

		return Number.isFinite(Figure) ? Figure : 0;
	}

	if (typeof Single === "string") return Single.length;

	if (typeof Single === "number") return String(Single).length;

	return 0;
};

/** The block's declared state, resolved in the order a reader would ask. */
const ResolveState = (State: {
	Loading: boolean;

	Disabled: boolean;

	ReadOnly: boolean;

	Error?: string | undefined;

	Valid?: string | undefined;

	Focus: boolean;
}): FieldState => {
	if (State.Loading) return "loading";

	if (State.Disabled) return "disabled";

	if (State.ReadOnly) return "readonly";

	if (State.Error) return "invalid";

	if (State.Valid) return "valid";

	if (State.Focus) return "focus";

	return "rest";
};

export const Field = ({
	Id,
	Label,
	Hint,
	Error,
	Valid,
	Partial,
	Limit,
	Measure = "length",
	Value,
	Required = false,
	Disabled,
	ReadOnly,
	Dense = false,
	Loading = false,
	State,
	Prefix,
	Suffix,
	Action,
	HeadAction,
	Meta,
	OnCard = false,
	ClassName,
	children: Children,
}: FieldProps) => {
	const Control: ControlProps = React.isValidElement(Children)
		? (Children.props as ControlProps)
		: {};

	const IsDisabled = Disabled ?? Boolean(Control.disabled);

	const IsReadOnly = ReadOnly ?? Boolean(Control.readOnly);

	const Declared = ResolveState({
		Loading,
		Disabled: IsDisabled,
		ReadOnly: IsReadOnly,
		Error,
		Valid,
		Focus: State === "focus",
	});

	const Length = CountedFigure(Children, Value, Measure);

	const Over = Limit !== undefined && Length > Limit;

	const Near = Limit !== undefined && !Over && Length >= Limit * 0.9;

	/**
	 * The sentences the control points at, in reading order: the hint, then the
	 * refusal. A refused field keeps its hint - the refusal is what to fix, and
	 * the format is what stops it being fixed wrong - so both ids are printed.
	 */
	const DescribedBy = [
		Hint ? `${Id}-hint` : null,

		Error ? `${Id}-error` : null,
	]
		.filter(Boolean)
		.join(" ");

	/* The name. A `<label for>` is the association the platform has always had:
	   it focuses the control on a click and it names it to a screen reader, and
	   neither of those needs a second attribute. A set's name is the `FieldSet`'s
	   legend, because a label pointing at a `<div>` is not a name at all. */
	const Name = (
		<label className="Field__Label" htmlFor={Id}>
			{Label}
			{Required ? (
				<span className="Field__Required" aria-hidden="true">
					{" "}
					*
				</span>
			) : null}
		</label>
	);

	return (
		<div
			className={cn(
				"Field",
				Dense && "Field--dense",
				OnCard && "Field--on-card",
				Action && "Field--row",
				ClassName,
			)}
			data-state={Declared}
		>
			<div className="Field__Head">
				{Name}

				{IsReadOnly || Meta || Limit !== undefined ? (
					<p className="Field__Meta">
						{IsReadOnly ? <span>READ-ONLY</span> : null}

						{Meta ? <span>{Meta}</span> : null}

						{Limit !== undefined ? (
							<span
								className="Field__Counter"
								data-over={Over || undefined}

								data-near={Near || undefined}
							>
								{Length} / {Limit}
							</span>
						) : null}
					</p>
				) : null}

				{HeadAction ? (
					<Slot className="Field__HeadAction">{HeadAction}</Slot>
				) : null}
			</div>

			<div className="Field__Row">
				<div className="Field__Control">
					{Loading ? (
						<div className="Field__Skeleton">
							<p className="Field__SkeletonMark">LOADING</p>
							<span className="Field__Bar" />
							<span className="Field__Bar Field__Bar--short" />
						</div>
					) : (
						<>
							{Prefix ? (
								<span className="Field__Addon Field__Addon--prefix">
									{Prefix}
								</span>
							) : null}

							<Slot
								id={Id}

								aria-invalid={Error ? true : undefined}

								aria-describedby={DescribedBy || undefined}

								aria-required={Required || undefined}
							>
								{Children}
							</Slot>

							{Suffix ? (
								<span className="Field__Addon Field__Addon--suffix">
									{Suffix}
								</span>
							) : null}
						</>
					)}
				</div>

				{Action ? (
					<Slot className="Field__Action">{Action}</Slot>
				) : null}
			</div>

			{Hint || Error || Valid || Partial ? (
				<div className="Field__Foot">
					{Error ? (
						<p
							className="Field__Error"
							id={`${Id}-error`}

							role="alert"
						>
							{Error}
						</p>
					) : null}

					{Valid && !Error ? (
						<p className="Field__Valid">{Valid}</p>
					) : null}

					{Partial ? (
						<p className="Field__Partial">{Partial}</p>
					) : null}

					{Hint ? (
						<p
							className={cn(
								"Field__Hint",
								Error ? "Field__Hint--after" : undefined,
							)}

							id={`${Id}-hint`}
						>
							{Error ? `↳${Hint}` : Hint}
						</p>
					) : null}
				</div>
			) : null}
		</div>
	);
};

Field.displayName = "Field";

export interface FieldSetProps {
	/** The set's legend. */
	Legend: string;

	/** How much of the set is chosen, and how large the set is. */
	Count?: { readonly Selected: number; readonly Total: number } | undefined;

	/** The format, or the group's own instruction. */
	Hint?: string | undefined;

	/** The refusal. A set is refused as a set. */
	Error?: string | undefined;

	/** The set must carry a choice. */
	Required?: boolean | undefined;

	/** The set cannot be edited. */
	Disabled?: boolean | undefined;

	/** The dense interval. */
	Dense?: boolean | undefined;

	/** The one thing to do with the set (`SELECT ALL`, `CLEAR`). */
	Action?: React.ReactNode;

	/** The set on a white insert. */
	OnCard?: boolean | undefined;

	/** Classes from the caller. */
	ClassName?: string | undefined;

	/** The choices. */
	children: React.ReactNode;
}

/**
 * FieldSet - a field whose value is a set.
 *
 * A group of checkboxes is not twelve fields: it is one field with twelve
 * members, one name, one hint and one refusal. It therefore prints the same head,
 * the same foot and the same register as a field - and adds the one figure a set
 * has that a single value does not: `3 OF 12 SELECTED`, derived from the group's
 * own state by the caller, who is the only one that knows it.
 */
export const FieldSet = ({
	Legend,
	Count,
	Hint,
	Error,
	Required = false,
	Disabled = false,
	Dense = false,
	Action,
	OnCard = false,
	ClassName,
	children: Children,
}: FieldSetProps) => {
	const Id = React.useId();

	const LabelId = `${Id}-legend`;

	const HintId = `${Id}-hint`;

	const ErrorId = `${Id}-error`;

	return (
		<div
			className={cn(
				"Field",
				Dense && "Field--dense",
				OnCard && "Field--on-card",
				ClassName,
			)}
			data-state={Disabled ? "disabled" : Error ? "invalid" : "rest"}
		>
			<div className="Field__Head">
				<span className="Field__Label" id={LabelId}>
					{Legend}
					{Required ? (
						<span className="Field__Required" aria-hidden="true">
							{" "}
							*
						</span>
					) : null}
				</span>

				<p className="Field__Meta">
					{Count ? (
						<span className="Field__SetCount">
							{Count.Selected} OF {Count.Total} SELECTED
						</span>
					) : null}
					{Action ? <span>{Action}</span> : null}
				</p>
			</div>

			<div
				role="group"
				aria-labelledby={LabelId}
				aria-required={Required || undefined}
				aria-invalid={Error ? true : undefined}
				aria-describedby={
					[Hint ? HintId : null, Error ? ErrorId : null]
						.filter(Boolean)
						.join(" ") || undefined
				}
			>
				{Children}
			</div>

			{Hint || Error ? (
				<div className="Field__Foot">
					{Error ? (
						<p className="Field__Error" id={ErrorId} role="alert">
							{Error}
						</p>
					) : null}

					{Hint ? (
						<p
							className={cn(
								"Field__Hint",
								Error ? "Field__Hint--after" : undefined,
							)}

							id={HintId}
						>
							{Error ? `↳${Hint}` : Hint}
						</p>
					) : null}
				</div>
			) : null}
		</div>
	);
};

FieldSet.displayName = "FieldSet";

export default Field;
