"use client";

import { createElement, useState } from "react";

import type { CSSProperties, ReactNode } from "react";

import {
	Groups,
	InGroup,
	type Specimen,
} from "../../Content/Specimen/Field.js";

import { Checkbox } from "../UI/Checkbox";

import { Field, FieldSet } from "../UI/Field";

import type { FieldProps } from "../UI/Field";

import { FormSummary } from "../UI/FormSummary";

import { Input } from "../UI/Input";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "../UI/InputOTP";

import { Label } from "../UI/Label";

import { RadioGroup, RadioGroupItem } from "../UI/RadioGroup";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../UI/Select";

import { Slider } from "../UI/Slider";

import { Switch } from "../UI/Switch";

import { Textarea } from "../UI/Textarea";

/**
 * SpecimenField - the input family, printed live: the conditions, the controls,
 * and the four skins.
 *
 * ─── WHY THE ROWS ARE LIVE ────────────────────────────────────────────────
 * The sheet's own doctrine: a part with states is shown with its states, because
 * a screenshot of a component cannot be composed with. A field is the one part
 * where that is not a preference - a field at rest is not a field. So every row
 * here mounts the real primitive inside the real `<Field>`, and every row is
 * *interactive*: typing in the counter row moves the count, pressing a radio
 * moves the selection, dragging the slider moves the readout. The sheet is a
 * lab surface (`dum Run` only, absent from a production build), and a lab that
 * printed pictures of controls would be a catalogue.
 *
 * ─── ONE ISLAND, NOT THIRTY ───────────────────────────────────────────────
 * Twenty-nine rows mounted as twenty-nine islands would be twenty-nine hydration
 * roots on one page. The page mounts this component once with `client:visible`,
 * and the rows are its children - so the family's whole specimen costs one
 * island and the controls are live the moment the band is on screen.
 *
 * ─── THE RENDERER DECIDES NOTHING ─────────────────────────────────────────
 * `Content/Specimen/Field.ts` states what each row is, which part it exercises,
 * when that state is right, and what props its specimen needs. This file maps a
 * row to a primitive and a skin to a box. A state added to the data appears here
 * with no edit; a decision taken here would be a second source of truth for the
 * matrix the sheet is printing.
 *
 * ─── THE ONE ROW THAT IS HAND-COMPOSED ────────────────────────────────────
 * The `LABEL` row. Its subject is the `Label` primitive itself, so it is bound
 * to a real control by `for` and dressed in the family's anatomy by hand - a
 * `<Field>` would print `Field__Label` and the primitive under test would never
 * appear on its own sheet.
 */

/** The card skin: the five properties every white box on the site passes. */
const CardSkin = {
	"--jelly-fill": "var(--Card)",

	"--jelly-radius": "0",

	"--jelly-card-font-size": "inherit",

	"--jelly-card-padding-block": "var(--space-group)",

	"--jelly-card-padding-inline": "var(--space-group)",
} as CSSProperties;

/**
 * The card skin's box.
 *
 * `createElement` rather than `<jelly-card>`: the custom element is declared in
 * `Source/Type/JellyUI.d.ts` under the legacy global `JSX` namespace, and this
 * file is compiled against React 19's `React.JSX` - so the JSX form is a type
 * error here while the element is still the right element. Creating it by name
 * keeps Jelly as the surface family (a keeper) without a second declaration of
 * the same intrinsic.
 */
const Card = ({ children }: { children: ReactNode }) =>
	createElement("jelly-card", { style: CardSkin }, children);

/** The stage's class, from the row's skin. */
const SkinClass = (Row: Specimen): string => {
	switch (Row.skin) {
		case "narrow":
			return "specimen-field__stage specimen-field__stage--narrow";

		case "wide":
			return "specimen-field__stage specimen-field__stage--wide";

		case "card":
			return "specimen-field__stage specimen-field__stage--card";

		default:
			return "specimen-field__stage";
	}
};

/** The field's own props, copied from the row - never inferred. */
const FieldOf = (Row: Specimen): Omit<FieldProps, "Id" | "children"> => ({
	Label: Row.label,
	...(Row.hint === undefined ? {} : { Hint: Row.hint }),
	...(Row.error === undefined ? {} : { Error: Row.error }),
	...(Row.valid === undefined ? {} : { Valid: Row.valid }),
	...(Row.partial === undefined ? {} : { Partial: Row.partial }),
	...(Row.limit === undefined ? {} : { Limit: Row.limit }),
	...(Row.required === undefined ? {} : { Required: Row.required }),
	...(Row.dense === undefined ? {} : { Dense: Row.dense }),
	...(Row.loading === undefined ? {} : { Loading: Row.loading }),
	...(Row.state === undefined ? {} : { State: Row.state as "focus" }),
	...(Row.skin === "card" ? { OnCard: true } : {}),
});

/**
 * The specimen's stage for one row.
 *
 * The state is the row's, and it is real: an input's value is controlled so the
 * counter is a live count, a group's selection is a live set, a switch's
 * position is a live boolean. Nothing here simulates a state with a class.
 */
const Stage = ({ Row }: { Row: Specimen }) => {
	const Id = `specimen-field-${Row.mark}`;

	const [Value, SetValue] = useState<string>(Row.value ?? "");

	const [Chosen, SetChosen] = useState<string>(Row.chosen ?? "");

	const [Picked, SetPicked] = useState<readonly string[]>(
		(Row.options ?? []).slice(1, 3),
	);

	const [On, SetOn] = useState<boolean>(Row.checked ?? false);

	/** The readout a slider and a code both print: their own value, as a figure. */
	const Readout = Row.kind === "slider" ? Number(Value || Row.min || 0) : 0;

	const Control = (): ReactNode => {
		switch (Row.kind) {
			case "input":
				return (
					<Input
						id={Id}
						type={Row.type ?? "text"}
						value={Value}
						placeholder={Row.placeholder}
						readOnly={Row.readonly ?? false}
						disabled={Row.disabled ?? false}
						onChange={(Event) => SetValue(Event.target.value)}
					/>
				);

			case "textarea":
				return (
					<Textarea
						id={Id}
						value={Value}
						placeholder={Row.placeholder}
						disabled={Row.disabled ?? false}
						onChange={(Event) => SetValue(Event.target.value)}
					/>
				);

			case "select":
				return (
					<Select value={Chosen} onValueChange={SetChosen}>
						<SelectTrigger id={Id}>
							<SelectValue placeholder="Select..." />
						</SelectTrigger>
						<SelectContent>
							{(Row.options ?? []).map((Option) => (
								<SelectItem key={Option} value={Option}>
									{Option}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				);

			case "slider":
				return (
					<Slider
						id={Id}
						min={Row.min ?? 0}
						max={Row.max ?? 100}
						value={[Readout]}
						onValueChange={([Next]) => SetValue(String(Next ?? 0))}
					/>
				);

			case "otp":
				return (
					<InputOTP
						id={Id}
						maxLength={Row.slots ?? 6}
						value={Value}
						onChange={SetValue}
					>
						<InputOTPGroup>
							{Array.from(
								{ length: Row.slots ?? 6 },
								(_, Index) => (
									<InputOTPSlot key={Index} index={Index} />
								),
							)}
						</InputOTPGroup>
					</InputOTP>
				);

			default:
				return null;
		}
	};

	/* ─── THE SETS: a checkbox, a group of checkboxes, a radio group, a switch ── */

	if (Row.kind === "checkbox" && (Row.options ?? []).length > 1) {
		const Options = Row.options ?? [];

		return (
			<FieldSet
				Legend={Row.label}
				Count={{ Selected: Picked.length, Total: Options.length }}
				{...(Row.hint === undefined ? {} : { Hint: Row.hint })}
				{...(Row.required === undefined
					? {}
					: { Required: Row.required })}
			>
				{Options.map((Option) => {
					const OptionId = `${Id}-${Option.replace(/\W/g, "")}`;

					return (
						<div className="Field__Choice" key={Option}>
							<Checkbox
								id={OptionId}
								checked={Picked.includes(Option)}
								onCheckedChange={(Next) =>
									SetPicked((Previous) =>
										Next === true
											? [...Previous, Option]
											: Previous.filter(
													(Entry) => Entry !== Option,
												),
									)
								}
							/>
							<span className="Field__ChoiceBody">
								<label
									className="Field__ChoiceLabel"
									htmlFor={OptionId}
								>
									{Option}
								</label>
							</span>
						</div>
					);
				})}
			</FieldSet>
		);
	}

	if (Row.kind === "checkbox") {
		return (
			<FieldSet
				Legend={Row.label}
				{...(Row.hint === undefined ? {} : { Hint: Row.hint })}
			>
				<div className="Field__Choice">
					<Checkbox
						id={Id}
						checked={On}
						onCheckedChange={(Next) => SetOn(Next === true)}
					/>
					<span className="Field__ChoiceBody">
						<label className="Field__ChoiceLabel" htmlFor={Id}>
							{Row.label}
						</label>
					</span>
				</div>
			</FieldSet>
		);
	}

	if (Row.kind === "radiogroup") {
		return (
			<FieldSet
				Legend={Row.label}
				Count={{
					Selected: Chosen === "" ? 0 : 1,
					Total: (Row.options ?? []).length,
				}}
				{...(Row.hint === undefined ? {} : { Hint: Row.hint })}
				{...(Row.required === undefined
					? {}
					: { Required: Row.required })}
			>
				<RadioGroup value={Chosen} onValueChange={SetChosen}>
					{(Row.options ?? []).map((Option) => {
						const OptionId = `${Id}-${Option.replace(/\W/g, "")}`;

						return (
							<div className="Field__Choice" key={Option}>
								<RadioGroupItem value={Option} id={OptionId} />
								<span className="Field__ChoiceBody">
									<label
										className="Field__ChoiceLabel"
										htmlFor={OptionId}
									>
										{Option}
									</label>
								</span>
							</div>
						);
					})}
				</RadioGroup>
			</FieldSet>
		);
	}

	if (Row.kind === "switch") {
		return (
			<FieldSet
				Legend={Row.label}
				{...(Row.hint === undefined ? {} : { Hint: Row.hint })}
			>
				<div className="Field__Choice">
					<Switch id={Id} checked={On} onCheckedChange={SetOn} />
					<span className="Field__ChoiceBody">
						<label className="Field__ChoiceLabel" htmlFor={Id}>
							{Row.label}
						</label>
						<span className="Field__ChoiceNote">
							{On ? "ON" : "OFF"}
						</span>
					</span>
				</div>
			</FieldSet>
		);
	}

	/* ─── THE SUMMARY: the refusal, as an artifact ───────────────────────────── */

	if (Row.kind === "summary") {
		return (
			<FormSummary
				Rows={(Row.summary ?? []).map((Entry, Index) => ({
					Id: `${Id}-${Index}`,
					Field: Entry.field,
					Message: Entry.message,
				}))}
			/>
		);
	}

	/* ─── THE LABEL: the primitive, bound and dressed by hand ───────────────── */

	if (Row.kind === "label") {
		return (
			<div className="Field" data-state="readonly">
				<div className="Field__Head">
					<Label className="Field__Label" htmlFor={Id}>
						{Row.label}
						<span className="Field__Required" aria-hidden="true">
							{" "}
							*
						</span>
					</Label>
					<p className="Field__Meta">
						<span>READ-ONLY</span>
					</p>
				</div>

				<div className="Field__Row">
					<div className="Field__Control">
						<Input
							id={Id}
							value={Row.value ?? ""}
							readOnly
							aria-required
						/>
					</div>
				</div>

				{Row.hint ? (
					<div className="Field__Foot">
						<p className="Field__Hint">{Row.hint}</p>
					</div>
				) : null}
			</div>
		);
	}

	/* ─── THE FRAMED CONTROLS: one box, one instrument ──────────────────────── */

	return (
		<Field
			Id={Id}
			{...FieldOf(Row)}
			{...(Row.kind === "slider"
				? { Limit: Row.max, Measure: "value" as const }
				: {})}
			{...(Row.kind === "slider" && Row.unit !== undefined
				? { Meta: Row.unit }
				: {})}
			{...(Row.action === undefined
				? {}
				: {
						Action: <button type="button">{Row.action}</button>,
					})}
		>
			{Control()}
		</Field>
	);
};

/** One labelled row: the state, the part, when it is right, and the specimen. */
const Row = ({ Row: Specimen }: { Row: Specimen }) => (
	<article className="specimen-field__row" id={`field-${Specimen.mark}`}>
		<header className="specimen-field__spec">
			<p className="specimen-field__mark">
				<span className="specimen-field__mark-hash" aria-hidden="true">
					#
				</span>
				{Specimen.mark}
			</p>

			<h3 className="specimen-field__state">{Specimen.state}</h3>

			<p className="specimen-field__part">{Specimen.component}</p>

			<p className="specimen-field__when">{Specimen.when}</p>
		</header>

		<div
			className={SkinClass(Specimen)}
			data-skin={Specimen.skin ?? "band"}
		>
			{Specimen.skin === "card" ? (
				<Card>
					<Stage Row={Specimen} />
				</Card>
			) : (
				<Stage Row={Specimen} />
			)}
		</div>
	</article>
);

export const SpecimenField = () => (
	<div className="specimen-field">
		{Groups.map((Group) => (
			<section className="specimen-field__group" key={Group.key}>
				<p className="specimen-field__group-head">
					<span className="specimen-field__group-kicker">
						{Group.label}
					</span>
					<span className="specimen-field__group-count">
						{InGroup(Group.key).length}
					</span>
				</p>

				<p className="specimen-field__group-note">{Group.note}</p>

				<div className="specimen-field__rows">
					{InGroup(Group.key).map((Entry) => (
						<Row Row={Entry} key={Entry.mark} />
					))}
				</div>
			</section>
		))}
	</div>
);

export default SpecimenField;
