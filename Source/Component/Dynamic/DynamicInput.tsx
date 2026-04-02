import { Input } from "../UI/Input";
import { Label } from "../UI/Label";
import type Property from "./Interface/Property/Input.js";

/**
 * Dynamic Input component that accepts content schema
 * Composes Label + Input with proper error/helper text states
 */
const DynamicInput = ({ Content, Id: PropertyIdentifier }: Property) => {
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
		...props
	} = Content;

	const Identifier =
		PropertyIdentifier ||
		`input-${Math.random().toString(36).substr(2, 9)}`;
	const ErrorIdentifier = `${Identifier}-error`;
	const HelperIdentifier = `${Identifier}-helper`;
	const DescribedBy = Error
		? ErrorIdentifier
		: HelperText
			? HelperIdentifier
			: undefined;

	return (
		<div className="StaccatoInput flex flex-col gap-2">
			<Input
				id={Identifier}
				type={Type}
				placeholder={Placeholder}
				value={Value}
				defaultValue={DefaultValue}
				disabled={Disabled}
				required={Required}
				aria-invalid={!!Error}
				aria-describedby={DescribedBy}
				className={Error ? "border-destructive" : ClassName}
				onChange={(Event) => {
					if (OnChange) {
						OnChange(Event.target.value);
					}
					if (Content.OnChange) {
						Content.OnChange(Event.target.value);
					}
				}}
				{...props}
			/>
			{LabelText && (
				<Label
					htmlFor={Identifier}
					className="block text-xs text-muted-foreground">
					{LabelText}
				</Label>
			)}
			{Error && (
				<p
					id={ErrorIdentifier}
					className="text-xs text-destructive"
					role="alert">
					{Error}
				</p>
			)}
			{!Error && HelperText && (
				<p
					id={HelperIdentifier}
					className="text-xs text-muted-foreground">
					{HelperText}
				</p>
			)}
		</div>
	);
};

export { DynamicInput };

export default DynamicInput;
