export default interface Item {
	readonly Identifier: string;
	readonly Name: string;
	readonly Tier: "Debug" | "Release" | "Build";
	readonly Workbench: string;
	readonly Feature: string;
	readonly Status: "Recommended" | "Available" | "Legacy" | "Experimental" | "Development";
}
