import type SignInContent from "../Content/SignIn.js";

export default interface Interface {
	content: SignInContent;
	onSubmit?: (email: string, password: string) => void;
	onOAuth?: () => void;
	onNavigate?: (path: string) => void;
	className?: string;
	isLoading?: boolean;
	errorMessage?: string;
}
