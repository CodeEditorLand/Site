import type ButtonContent from "../Button.js";
import type InputContent from "../Input.js";

export default interface Interface {
	Title: string;
	Description: string;
	PasswordField: InputContent;
	ConfirmPasswordField: InputContent;
	SubmitButton: ButtonContent;
	SuccessMessage?: string;
	InvalidTokenMessage?: string;
	CheckingMessage?: string;
}
