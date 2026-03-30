import type ResetPasswordContent from "../../Content/Password/Reset.js";

export default interface Interface {
	content: ResetPasswordContent;
	token?: string;
	onReset?: (
		token: string,
		password: string,
		confirmPassword: string,
	) => void;
	onNavigate?: (path: string) => void;
	className?: string;
	isLoading?: boolean;
	errorMessage?: string;
}
