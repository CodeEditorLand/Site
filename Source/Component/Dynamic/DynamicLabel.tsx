import { Label } from "../UI/Label";
import type Property from "./Interface/Property/Label.js";

/**
 * Dynamic Label component that accepts content schema
 * Wraps the base Label with prop-based configuration
 */
const DynamicLabel = ({ content, htmlFor }: Property) => {
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
			aria-required={required}
			aria-disabled={disabled}
			className={className}
			{...props}>
			{text}
		</Label>
	);
};

export default DynamicLabel;
