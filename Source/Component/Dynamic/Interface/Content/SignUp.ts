import type ButtonContent from "./Button.js";
import type CheckboxContent from "./Checkbox.js";
import type InputContent from "./Input.js";

export default interface Interface {
	title: string;
	description: string;
	emailField: InputContent;
	passwordField: InputContent;
	confirmPasswordField: InputContent;
	termsCheckbox: CheckboxContent;
	submitButton: ButtonContent;
	oauthButtons?: ButtonContent[];
	showDivider?: boolean;
	footerLinks?: {
		signIn?: { label: string; href: string };
	};
}
