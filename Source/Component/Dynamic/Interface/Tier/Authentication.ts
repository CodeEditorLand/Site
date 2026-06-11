export default interface Interface {
	Identifier: "Cloud" | "Provider" | "LocalFirst";

	Title: string;

	Subtitle: string;

	Color: string;

	BorderColor: string;

	Icon: string;

	Feature: string[];

	Capability: string[];

	Protocol: string[];

	Certificate: string[];
}
