import type VerificationInformation from "../../Information/Verification.js";
import type ButtonContent from "../Button.js";

export default interface Interface {
	Title: string;
	Description?: string;
	DownloadVerification: VerificationInformation;
	IntegrityVerification: VerificationInformation;
	DownloadButton?: ButtonContent;
	VerifyButton?: ButtonContent;
}
