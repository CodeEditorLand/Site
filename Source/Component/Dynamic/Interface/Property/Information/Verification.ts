import type Interface from "../../Content/Information/Verification.js";

export default interface Property {
	Content: Interface;
	OnVerify?: (Checksum: string) => void;
	OnDownloadSignature?: () => void;
	ClassName?: string;
}
