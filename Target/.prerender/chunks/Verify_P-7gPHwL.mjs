// Source/Library/I18n/Locale/En/Verify.json
var auth = {
	"pendingStatus": "STATUS: PREPARING",
	"verifyingStatus": "STATUS: LOADING",
	"verifiedStatus": "STATUS: VERIFIED",
	"failedStatus": "STATUS: INTERRUPTED",
	"expiredStatus": "STATUS: UNAVAILABLE"
};
var error = {
	"title": "Verification Interrupted",
	"description": "The link carried no token the provider recognises, or the token's window has closed. A new link is the only way forward.",
	"instruction": "Request a new link; the old one cannot be revived.",
	"resendButton": "Send A New Link",
	"contactSupport": "Contact Support",
	"backToSignInButton": "SIGN IN"
};
var pending = {
	"description": "A link was sent to the address on the account. It opens for 24 hours and works once.\n\nIf nothing arrives in a few minutes, the spam folder is the next place to look.\n\nThe link is a credential: anyone who opens it verifies the address.",
	"resendButton": "Send A New Link",
	"title": "Check The Inbox"
};
var success = {
	"title": "Email Verified",
	"description": "The address on the account is verified. Signing in is the last step before the workspace opens.",
	"instruction": "You can now sign in to the account and start using Code Editor Land.",
	"continue": "Continue to Sign In",
	"continueButton": "BACK TO LAND"
};
var title = "Verify your email";
var description = "A verification link was sent to";
var instruction = "Open the link in the email to verify the account and start using Code Editor Land.";
var didntReceive = "Didn't receive the email?";
var checkSpam = "Check the spam folder or";
var resendLink = "resend verification email";
var resendButton = "Resend Verification Email";
var backToSignIn = "Back to Sign In";
var resending = "Sending the link.";
var resent = "Verification email sent.";
var verifying = {
	"title": "Verifying your email",
	"description": "Checking the email address with the provider."
};
var errorGeneric = "The check did not complete: the provider returned no answer for this token. Requesting a new link is the next step.";
var resendFailed = "The resend did not go out: the provider rejected the request. The existing link still works until it expires.";
var emailLabel = "Email";
var emailPlaceholder = "Enter your email address";
var resendSuccess = "Verification email resent.";
var resendCooldown = "Resend in {{seconds}}s";
var resend = { "success": "Verification email sent successfully." };
var token = {
	"invalid": "This verification link is invalid.",
	"expired": "This verification link has expired. Request a new one."
};
var Verify_default = {
	auth,
	error,
	pending,
	success,
	title,
	description,
	instruction,
	didntReceive,
	checkSpam,
	resendLink,
	resendButton,
	backToSignIn,
	resending,
	resent,
	verifying,
	errorGeneric,
	resendFailed,
	emailLabel,
	emailPlaceholder,
	resendSuccess,
	resendCooldown,
	resend,
	token
};
export { token as C, title as S, resendLink as _, description as a, resent as b, emailPlaceholder as c, instruction as d, pending as f, resendFailed as g, resendCooldown as h, checkSpam as i, error as l, resendButton as m, auth as n, didntReceive as o, resend as p, backToSignIn as r, emailLabel as s, Verify_default as t, errorGeneric as u, resendSuccess as v, verifying as w, success as x, resending as y };
