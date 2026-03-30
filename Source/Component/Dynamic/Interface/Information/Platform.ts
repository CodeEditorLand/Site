export default interface Interface {
	id: string;
	name: string;
	icon: "Apple" | "Monitor" | "Terminal";
	description: string;
	version: string;
	size: string;
	checksum?: string;
	signature?: string;
	requirements?: string[];
}
