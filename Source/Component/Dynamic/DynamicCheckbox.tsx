import { Checkbox } from "../UI/Checkbox";
import { Label } from "../UI/Label";
import type Property from "./Interface/Property/Checkbox.js";

/**
 * Dynamic Checkbox component that accepts content schema
 * Composes Checkbox with Label and optional description
 */
const DynamicCheckbox = ({ content, name, onCheckedChange }: Property) => {
	const {
		label,
		description,
		checked,
		defaultChecked,
		disabled = false,
		indeterminate = false,
		onChange,
		className,
		...props
	} = content;

	const HandleCheckedChange = (NewChecked: boolean) => {
		if (onCheckedChange) {
			onCheckedChange(NewChecked);
		}
		if (onChange) {
			onChange(NewChecked);
		}
	};

	// Build checkbox props, only including defined values to satisfy exactOptionalPropertyTypes
	const CheckboxProperties: Record<string, unknown> = {
		disabled,
		onCheckedChange: HandleCheckedChange,
		className,
		...props,
	};

	if (checked !== undefined) {
		CheckboxProperties["checked"] = checked;
	}
	if (defaultChecked !== undefined) {
		CheckboxProperties["defaultChecked"] = defaultChecked;
		if (checked === undefined) {
			CheckboxProperties["checked"] = defaultChecked;
		}
	}

	return (
		<div className="flex items-start space-x-3">
			<Checkbox
				name={name}
				{...(CheckboxProperties as Parameters<typeof Checkbox>[0])}>
				{indeterminate && <span className="animate-pulse">?</span>}
			</Checkbox>
			{(label || description) && (
				<div className="space-y-1.5">
					{label && (
						<Label
							className="cursor-pointer font-normal"
							onClick={(Event) => {
								Event.preventDefault();
								const CurrentChecked =
									(checked !== undefined
										? checked
										: defaultChecked) || false;
								HandleCheckedChange(!CurrentChecked);
							}}>
							{label}
						</Label>
					)}
					{description && (
						<p className="text-sm text-muted-foreground">
							{description}
						</p>
					)}
				</div>
			)}
		</div>
	);
};

export { DynamicCheckbox };

export default DynamicCheckbox;
