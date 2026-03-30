import type Interface from "../../Content/Page/Account.js";

export default interface Property {
	content: Interface;
	route: "signin" | "signup" | "forgot-password" | "reset-password";
	resetToken?: string;
	metaTitle?: string;
	metaDescription?: string;
	className?: string;
	onSignIn?: (Email: string, Password: string) => void;
	onSignUp?: (
		Email: string,
		Password: string,
		ConfirmPassword: string,
		TermsAccepted: boolean,
	) => void;
	onForgotPassword?: (Email: string) => void;
	onResetPassword?: (
		Token: string,
		Password: string,
		ConfirmPassword: string,
	) => void;
	onOAuth?: (Provider?: string) => void;
	onNavigate?: (Path: string) => void;
}
