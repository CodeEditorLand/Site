import type ButtonContent from "../Button.js";
import type VerificationInformation from "../../Information/Verification.js";

export default interface Interface {
	title: string;
	description?: string;
	downloadVerification: VerificationInformation;
	integrityVerification: VerificationInformation;
	downloadButton?: ButtonContent;
	verifyButton?: ButtonContent;
}
