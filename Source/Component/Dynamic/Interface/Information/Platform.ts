export default interface Interface {
	Id: string;
	Name: string;
	Icon: "Apple" | "Monitor" | "Terminal";
	Description: string;
	Version: string;
	Size: string;
	Checksum?: string;
	Signature?: string;
	Requirements?: string[];
}
