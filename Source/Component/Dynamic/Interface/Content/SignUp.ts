import type ButtonContent from "./Button.js";

import type CheckboxContent from "./Checkbox.js";

import type InputContent from "./Input.js";

export default interface Interface {
	Title: string;

	Description: string;

	EmailField: InputContent;

	PasswordField: InputContent;

	ConfirmPasswordField: InputContent;

	TermsCheckbox: CheckboxContent;

	SubmitButton: ButtonContent;

	OauthButtons?: ButtonContent[];

	ShowDivider?: boolean;

	FooterLinks?: {
		SignIn?: { Label: string; Href: string };
	};
}
