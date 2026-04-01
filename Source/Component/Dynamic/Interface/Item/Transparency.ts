export default interface Item {
	readonly Identifier: string;
	readonly Title: string;
	readonly Description: string;
	readonly Icon: string;
	readonly Status: "Active" | "Disabled" | "Optional" | "Recommended";
	readonly Detail?: string;
}
