import type Interface from "../../Content/Page/Verify.js";

export default interface Property {
	Content: Interface;

	Route: "pending" | "verify" | "success" | "failure";

	Token?: string;

	Reason?: string;

	MetaTitle?: string;

	MetaDescription?: string;

	ClassName?: string;

	OnVerify?: (Token: string) => Promise<boolean>;

	OnResend?: (Email: string) => Promise<boolean>;

	OnNavigate?: ((Path: string) => void) | undefined;
}
