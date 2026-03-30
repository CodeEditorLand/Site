import type ButtonContent from "../Button.js";

export default interface Interface {
	pending: {
		title: string;
		description: string;
		emailSentMessage?: string;
		resendButton: ButtonContent;
		resendSuccessMessage?: string;
	};
	verifying?: {
		title?: string;
		description?: string;
	};
	success: {
		title: string;
		description: string;
		continueButton: ButtonContent;
	};
	error: {
		title: string;
		description: string;
		backToSignInButton: ButtonContent;
	};
}
