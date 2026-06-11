import type ButtonContent from "../../Content/Button.js";

export default interface Interface {
	Title: string;

	Description: string;

	ConnectButton: ButtonContent;

	Feature: string[];

	Setting: string[];

	Protocol: string[];

	Certificate: string[];
}
