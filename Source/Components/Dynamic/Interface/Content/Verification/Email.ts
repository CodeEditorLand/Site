import type ButtonContent from "../Button.js";

export default interface Interface {
	title: string;
	description: string;
	checkingMessage?: string;
	successMessage?: string;
	errorMessage?: string;
	buttonContent?: ButtonContent;
}
