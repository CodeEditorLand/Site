import type ResetPasswordContent from "../../Content/Password/Reset.js";

export default interface Interface {
	Content: ResetPasswordContent;
	Token?: string;
	OnReset?: (
		Token: string,
		Password: string,
		ConfirmPassword: string,
	) => void;
	OnNavigate?: (Path: string) => void;
	ClassName?: string;
	IsLoading?: boolean;
	ErrorMessage?: string;
}
