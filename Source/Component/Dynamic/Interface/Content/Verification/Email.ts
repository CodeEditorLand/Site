import type ButtonContent from "../Button.js";

export default interface Interface {
	Pending: {
		Title: string;
		Description: string;
		EmailSentMessage?: string;
		ResendButton: ButtonContent;
		ResendSuccessMessage?: string;
	};
	Verifying?: {
		Title?: string;
		Description?: string;
	};
	Success: {
		Title: string;
		Description: string;
		ContinueButton: ButtonContent;
	};
	Error: {
		Title: string;
		Description: string;
		BackToSignInButton: ButtonContent;
	};
}
