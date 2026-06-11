import type ForgotPasswordContent from "../../Content/Password/Forgot.js";

export default interface Interface {
	Content: ForgotPasswordContent;

	OnSubmit?: (Email: string) => void;

	OnResend?: () => void;

	OnNavigate?: (Path: string) => void;

	ClassName?: string;

	IsLoading?: boolean;

	ErrorMessage?: string;
}
