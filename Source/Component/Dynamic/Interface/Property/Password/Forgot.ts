import type ForgotPasswordContent from "../../Content/Password/Forgot.js";

export default interface Interface {
	content: ForgotPasswordContent;
	onSubmit?: (email: string) => void;
	onResend?: () => void;
	onNavigate?: (path: string) => void;
	className?: string;
	isLoading?: boolean;
	errorMessage?: string;
}
