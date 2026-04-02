import type { HeaderContent } from "../../../../Layout/Header.js";
import type ForgotPasswordContent from "../Password/Forgot.js";
import type ResetPasswordContent from "../Password/Reset.js";
import type SignInContent from "../SignIn.js";
import type SignUpContent from "../SignUp.js";

export default interface Interface {
	SignIn: SignInContent;
	SignUp: SignUpContent;
	ForgotPassword: ForgotPasswordContent;
	ResetPassword: ResetPasswordContent;
	Header?: HeaderContent;
	Footer?: Record<string, unknown>;
}
