import type ButtonContent from "../Button.js";
import type InputContent from "../Input.js";

export default interface Interface {
	Title: string;
	Description: string;
	EmailField: InputContent;
	SubmitButton: ButtonContent;
	ResendButton?: ButtonContent;
	SuccessMessage?: string;
}
