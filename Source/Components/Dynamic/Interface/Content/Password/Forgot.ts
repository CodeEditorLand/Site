import type ButtonContent from "../Button.js";
import type InputContent from "../Input.js";

export default interface Interface {
	title: string;
	description: string;
	emailField: InputContent;
	submitButton: ButtonContent;
	resendButton?: ButtonContent;
	successMessage?: string;
}
