import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type InputContent from "./Interface/Content/Input.js";

interface DynamicInputProps {
	content: InputContent;
	id?: string;
}

/**
 * Dynamic Input component that accepts content schema
 * Composes Label + Input with proper error/helper text states
 */
export function DynamicInput({ content, id: propId }: DynamicInputProps) {
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

	const id = propId || `input-${Math.random().toString(36).substr(2, 9)}`;
	const errorId = `${id}-error`;
	const helperId = `${id}-helper`;
	const describedBy = error ? errorId : helperText ? helperId : undefined;

	return (
		<div className="space-y-2">
			{label && (
				<Label htmlFor={id} required={required}>
					{label}
				</Label>
			)}
			<Input
				id={id}
				type={type}
				placeholder={placeholder}
				value={value}
				defaultValue={defaultValue}
				disabled={disabled}
				required={required}
				aria-invalid={!!error}
				aria-describedby={describedBy}
				className={error ? "border-destructive" : className}
				onChange={(e) => {
					if (onChange) {
						onChange(e.target.value);
					}
					if (content.onChange) {
						content.onChange(e.target.value);
					}
				}}
				{...props}
			/>
			{error && (
				<p
					id={errorId}
					className="text-sm text-destructive"
					role="alert">
					{error}
				</p>
			)}
			{!error && helperText && (
				<p id={helperId} className="text-sm text-muted-foreground">
					{helperText}
				</p>
			)}
		</div>
	);
}

export type { InputContent };
