import type ContentSchema from "../Schema/Content.js";

export default interface Interface extends ContentSchema {
	label?: string;
	description?: string;
	checked?: boolean;
	defaultChecked?: boolean;
	disabled?: boolean;
	indeterminate?: boolean;
	onChange?: (checked: boolean) => void;
}
