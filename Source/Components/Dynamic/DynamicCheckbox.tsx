import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import type CheckboxContent from "./Interface/Content/Checkbox.js";

interface DynamicCheckboxProps {
	content: CheckboxContent;
	name?: string;
	onCheckedChange?: (checked: boolean) => void;
}

/**
 * Dynamic Checkbox component that accepts content schema
 * Composes Checkbox with Label and optional description
 */
export function DynamicCheckbox({
	content,
	name,
	onCheckedChange,
}: DynamicCheckboxProps) {
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

	const handleCheckedChange = (newChecked: boolean) => {
		if (onCheckedChange) {
			onCheckedChange(newChecked);
		}
		if (onChange) {
			onChange(newChecked);
		}
	};

	// Build checkbox props, only including defined values to satisfy exactOptionalPropertyTypes
	const checkboxProps: Record<string, unknown> = {
		disabled,
		onCheckedChange: handleCheckedChange,
		className,
		...props,
	};

	if (checked !== undefined) {
		checkboxProps.checked = checked;
	}
	if (defaultChecked !== undefined) {
		checkboxProps.defaultChecked = defaultChecked;
		if (checked === undefined) {
			checkboxProps.checked = defaultChecked;
		}
	}

	return (
		<div className="flex items-start space-x-3">
			<Checkbox
				name={name}
				{...(checkboxProps as Parameters<typeof Checkbox>[0])}>
				{indeterminate && <span className="animate-pulse">?</span>}
			</Checkbox>
			{(label || description) && (
				<div className="space-y-0.5">
					{label && (
						<Label
							className="cursor-pointer font-normal"
							onClick={(e) => {
								e.preventDefault();
								const currentChecked =
									(checked !== undefined
										? checked
										: defaultChecked) || false;
								handleCheckedChange(!currentChecked);
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
}

export type { CheckboxContent };
