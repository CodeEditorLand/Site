import type ButtonContent from "../Button.js";
import type InputContent from "../Input.js";

export default interface Interface {
	title: string;
	description: string;
	passwordField: InputContent;
	confirmPasswordField: InputContent;
	submitButton: ButtonContent;
	successMessage?: string;
	invalidTokenMessage?: string;
	checkingMessage?: string;
}
