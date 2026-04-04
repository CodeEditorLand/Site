import type ButtonContent from "../../Content/Button.js";
import type FormField from "../../Content/Field/Form.js";

export default interface Interface {
	Title: string;
	Description: string;
	EmailField: FormField;
	PasswordField: FormField;
	SubmitButton: ButtonContent;
	Feature: string[];
	Setting: string[];
}
