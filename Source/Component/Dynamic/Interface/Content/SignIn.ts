import type ButtonContent from "./Button.js";
import type InputContent from "./Input.js";

export default interface Interface {
	Title: string;
	Description: string;
	EmailField: InputContent;
	PasswordField: InputContent;
	SubmitButton: ButtonContent;
	OauthButton?: ButtonContent;
	ShowDivider?: boolean;
	FooterLinks?: {
		SignUp?: { Label: string; Href: string };
		ForgotPassword?: { Label: string; Href: string };
	};
}
