import type ContentSchema from "../Schema/Content.js";

export default interface Interface extends ContentSchema {
	Label?: string;
	Description?: string;
	Checked?: boolean;
	DefaultChecked?: boolean;
	Disabled?: boolean;
	Indeterminate?: boolean;
	OnChange?: (Checked: boolean) => void;
}
