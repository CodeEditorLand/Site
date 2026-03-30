import type Interface from "../../Content/Verification/Email.js";

export default interface Property {
	content: Interface;
	token?: string;
	userEmail?: string;
	onVerify?: (token: string) => Promise<boolean>;
	onResend?: (email: string) => Promise<boolean>;
	onNavigate?: (path: string) => void;
	className?: string;
}
