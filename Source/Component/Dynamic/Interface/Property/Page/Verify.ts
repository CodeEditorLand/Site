import type Interface from "../../Content/Page/Verify.js";

export default interface Property {
	content: Interface;
	route: "pending" | "verify" | "success" | "failure";
	token?: string;
	reason?: string;
	metaTitle?: string;
	metaDescription?: string;
	className?: string;
	onVerify?: (Token: string) => Promise<boolean>;
	onResend?: (Email: string) => Promise<boolean>;
	onNavigate?: ((Path: string) => void) | undefined;
}
