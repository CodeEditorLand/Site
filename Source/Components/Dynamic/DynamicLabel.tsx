import { Label } from "../ui/label";
import type Property from "./Interface/Property/Label.js";

/**
 * Dynamic Label component that accepts content schema
 * Wraps the base Label with prop-based configuration
 */
export function DynamicLabel({ content, htmlFor }: Property) {
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
