import type Interface from "../../Content/Verification/Email.js";

export default interface Property {
	Content: Interface;

	Token?: string;

	UserEmail?: string;

	OnVerify?: (Token: string) => Promise<boolean>;

	OnResend?: (Email: string) => Promise<boolean>;

	OnNavigate?: (Path: string) => void;

	ClassName?: string;
}
