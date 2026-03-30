import type Interface from "../../Content/Information/Verification.js";

export default interface Property {
	content: Interface;
	onVerify?: (checksum: string) => void;
	onDownloadSignature?: () => void;
	className?: string;
}
