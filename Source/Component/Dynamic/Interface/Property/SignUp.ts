import type SignUpContent from "../Content/SignUp.js";

export default interface Interface {
	content: SignUpContent;
	onSubmit?: (
		email: string,
		password: string,
		confirmPassword: string,
		termsAccepted: boolean,
	) => void;
	onOAuth?: (provider: string) => void;
	onNavigate?: (path: string) => void;
	className?: string;
	isLoading?: boolean;
	errorMessage?: string;
}
