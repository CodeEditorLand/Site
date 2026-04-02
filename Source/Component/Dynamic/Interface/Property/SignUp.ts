import type SignUpContent from "../Content/SignUp.js";

export default interface Interface {
	Content: SignUpContent;
	OnSubmit?: (
		Email: string,
		Password: string,
		ConfirmPassword: string,
		TermsAccepted: boolean,
	) => void;
	OnOAuth?: (Provider: string) => void;
	OnNavigate?: (Path: string) => void;
	ClassName?: string;
	IsLoading?: boolean;
	ErrorMessage?: string;
}
