import React from "react";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { InputContent } from "./types";

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
			{(error || helperText) && (
				<p
					className={`text-sm ${error ? "text-destructive" : "text-muted-foreground"}`}>
					{error || helperText}
				</p>
			)}
		</div>
	);
}

export type { InputContent };
