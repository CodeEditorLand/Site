import React from "react";

import { Label } from "../ui/label";
import type { LabelContent } from "./types";

interface DynamicLabelProps {
	content: LabelContent;
	htmlFor?: string;
}

/**
 * Dynamic Label component that accepts content schema
 * Wraps the base Label with prop-based configuration
 */
export function DynamicLabel({ content, htmlFor }: DynamicLabelProps) {
	const {
		text,
		required = false,
		disabled = false,
		className,
		...props
	} = content;

	return (
		<Label
			htmlFor={htmlFor}
			required={required}
			disabled={disabled}
			className={className}
			{...props}>
			{text}
		</Label>
	);
}

export type { LabelContent };
