import type ButtonContent from "./Button.js";
import type InputContent from "./Input.js";

export default interface Interface {
	title: string;
	description: string;
	emailField: InputContent;
	passwordField: InputContent;
	submitButton: ButtonContent;
	oauthButton?: ButtonContent;
	showDivider?: boolean;
	footerLinks?: {
		signUp?: { label: string; href: string };
		forgotPassword?: { label: string; href: string };
	};
}
