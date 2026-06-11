import type SignInContent from "../Content/SignIn.js";

export default interface Interface {
	Content: SignInContent;

	OnSubmit?: (Email: string, Password: string) => void;

	OnOAuth?: () => void;

	OnNavigate?: (Path: string) => void;

	ClassName?: string;

	IsLoading?: boolean;

	ErrorMessage?: string;
}
