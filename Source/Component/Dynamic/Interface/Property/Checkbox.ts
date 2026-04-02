import type CheckboxContent from "../Content/Checkbox.js";

export default interface Interface {
	Content: CheckboxContent;
	Name?: string;
	OnCheckedChange?: (Checked: boolean) => void;
}
