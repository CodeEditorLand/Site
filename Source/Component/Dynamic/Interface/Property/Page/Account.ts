import type Interface from "../../Content/Page/Account.js";

export default interface Property {
	Content: Interface;

	Route: "signin" | "signup" | "forgot-password" | "reset-password";

	ResetToken?: string;

	MetaTitle?: string;

	MetaDescription?: string;

	ClassName?: string;

	OnSignIn?: (Email: string, Password: string) => void;

	OnSignUp?: (
		Email: string,

		Password: string,

		ConfirmPassword: string,

		TermsAccepted: boolean,
	) => void;

	OnForgotPassword?: (Email: string) => void;

	OnResetPassword?: (
		Token: string,

		Password: string,

		ConfirmPassword: string,
	) => void;

	OnOAuth?: (Provider?: string) => void;

	OnNavigate?: (Path: string) => void;
}
