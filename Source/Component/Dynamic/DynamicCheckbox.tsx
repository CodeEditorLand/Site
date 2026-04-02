import { Checkbox } from "../UI/Checkbox";
import { Label } from "../UI/Label";
import type Property from "./Interface/Property/Checkbox.js";

/**
 * Dynamic Checkbox component that accepts content schema
 * Composes Checkbox with Label and optional description
 */
const DynamicCheckbox = ({ Content, Name, OnCheckedChange }: Property) => {
	const {
		Label: LabelText,
		Description,
		Checked,
		DefaultChecked,
		Disabled = false,
		Indeterminate = false,
		OnChange,
		ClassName,
		...props
	} = Content;

	const HandleCheckedChange = (NewChecked: boolean) => {
		if (OnCheckedChange) {
			OnCheckedChange(NewChecked);
		}
		if (OnChange) {
			OnChange(NewChecked);
		}
	};

	// Build checkbox props, only including defined values to satisfy exactOptionalPropertyTypes
	const CheckboxProperties: Record<string, unknown> = {
		disabled: Disabled,
		onCheckedChange: HandleCheckedChange,
		className: ClassName,
		...props,
	};

	if (Checked !== undefined) {
		CheckboxProperties["checked"] = Checked;
	}
	if (DefaultChecked !== undefined) {
		CheckboxProperties["defaultChecked"] = DefaultChecked;
		if (Checked === undefined) {
			CheckboxProperties["checked"] = DefaultChecked;
		}
	}

	return (
		<div className="flex items-start space-x-3">
			<Checkbox
				name={Name}
				{...(CheckboxProperties as Parameters<typeof Checkbox>[0])}>
				{Indeterminate && <span className="animate-pulse">?</span>}
			</Checkbox>
			{(LabelText || Description) && (
				<div className="space-y-1.5">
					{LabelText && (
						<Label
							className="cursor-pointer font-normal"
							onClick={(Event) => {
								Event.preventDefault();
								const CurrentChecked =
									(Checked !== undefined
										? Checked
										: DefaultChecked) || false;
								HandleCheckedChange(!CurrentChecked);
							}}>
							{LabelText}
						</Label>
					)}
					{Description && (
						<p className="text-sm text-muted-foreground">
							{Description}
						</p>
					)}
				</div>
			)}
		</div>
	);
};

export { DynamicCheckbox };

export default DynamicCheckbox;
