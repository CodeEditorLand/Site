import type CheckboxContent from "../Content/Checkbox.js";

export default interface Interface {
	content: CheckboxContent;
	name?: string;
	onCheckedChange?: (checked: boolean) => void;
}
