import type ButtonContent from "../../Content/Button.js";

export default interface Interface {
	Title: string;
	Description: string;
	GitHubButton: ButtonContent;
	GitLabButton: ButtonContent;
	GoogleButton: ButtonContent;
	Feature: string[];
	Setting: string[];
}
