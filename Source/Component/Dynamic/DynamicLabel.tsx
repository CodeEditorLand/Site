import { Label } from "../UI/Label";
import type Property from "./Interface/Property/Label.js";

/**
 * Dynamic Label component that accepts content schema
 * Wraps the base Label with prop-based configuration
 */
const DynamicLabel = ({ Content, HTMLFor }: Property) => {
	const {
		Text,
		Required = false,
		Disabled = false,
		ClassName,
		...props
	} = Content;

	return (
		<Label
			htmlFor={HTMLFor}
			aria-required={Required}
			aria-disabled={Disabled}
			className={ClassName}
			{...props}>
			{Text}
		</Label>
	);
};

export default DynamicLabel;
