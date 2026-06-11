export default interface Item {
	readonly Identifier: string;

	readonly Name: string;

	readonly Description: string;

	readonly Icon: string;

	readonly Command: string;

	readonly Feature: readonly string[];
}
