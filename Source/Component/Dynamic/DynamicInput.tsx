import { Input } from "../UI/Input";
import { Label } from "../UI/Label";
import type Property from "./Interface/Property/Input.js";

/**
 * Dynamic Input component that accepts content schema
 * Composes Label + Input with proper error/helper text states
 */
export function DynamicInput({ content, id: PropertyIdentifier }: Property) {
	const {
		label,
		placeholder,
		type = "text",
		value,
		defaultValue,
		error,
		disabled = false,
		required = false,
		helperText,
		className,
		onChange,
		...props
	} = content;

	const Identifier = PropertyIdentifier || `input-${Math.random().toString(36).substr(2, 9)}`;
	const ErrorIdentifier = `${Identifier}-error`;
	const HelperIdentifier = `${Identifier}-helper`;
	const DescribedBy = error ? ErrorIdentifier : helperText ? HelperIdentifier : undefined;

	return (
		<div className="space-y-2">
			{label && (
				<Label htmlFor={Identifier} required={required}>
					{label}
				</Label>
			)}
			<Input
				id={Identifier}
				type={type}
				placeholder={placeholder}
				value={value}
				defaultValue={defaultValue}
				disabled={disabled}
				required={required}
				aria-invalid={!!error}
				aria-describedby={DescribedBy}
				className={error ? "border-destructive" : className}
				onChange={(Event) => {
					if (onChange) {
						onChange(Event.target.value);
					}
					if (content.onChange) {
						content.onChange(Event.target.value);
					}
				}}
				{...props}
			/>
			{error && (
				<p
					id={ErrorIdentifier}
					className="text-sm text-destructive"
					role="alert">
					{error}
				</p>
			)}
			{!error && helperText && (
				<p id={HelperIdentifier} className="text-sm text-muted-foreground">
					{helperText}
				</p>
			)}
		</div>
	);
}
