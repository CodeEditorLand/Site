import type VerificationInformation from "../../Information/Verification.js";
import type ButtonContent from "../Button.js";

export default interface Interface {
	title: string;
	description?: string;
	downloadVerification: VerificationInformation;
	integrityVerification: VerificationInformation;
	downloadButton?: ButtonContent;
	verifyButton?: ButtonContent;
}
